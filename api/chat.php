<?php
declare(strict_types=1);

/**
 * پروکسی امن چت‌بات آویسا
 * - کلیدهای Groq فقط روی سرور می‌مانند و هیچ‌وقت به مرورگر نمی‌رسند.
 * - استریم (SSE) را مستقیم به مرورگر برمی‌گرداند.
 * - اگر یک کلید خطا داد/تمام شد، خودکار سراغ کلید بعدی می‌رود.
 */

$cfg = require __DIR__ . '/config.php';

function fail(int $code, string $msg) {
    if (!headers_sent()) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
    }
    echo json_encode(['error' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

header('X-Content-Type-Options: nosniff');

// ---------- ۱) فقط POST ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'method_not_allowed');
}

// ---------- ۲) بررسی مبدأ درخواست (Origin / Referer) ----------
$allowed = array_map('strtolower', $cfg['allowed_hosts']);
if (!empty($_SERVER['HTTP_HOST'])) {
    $allowed[] = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST']));
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$host = strtolower((string)parse_url($origin, PHP_URL_HOST));
if ($host === '' || !in_array($host, $allowed, true)) {
    fail(403, 'forbidden_origin');
}

// ---------- ۳) محدودیت تعداد درخواست (Rate limit) ----------
function rate_limited(array $cfg): bool {
    $ip   = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $dir  = sys_get_temp_dir() . '/avisa_rl';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now  = time();
    $fp   = @fopen($file, 'c+');
    if (!$fp) return false;               // اگر ذخیره ممکن نبود، سایت از کار نیفتد
    flock($fp, LOCK_EX);
    $raw  = stream_get_contents($fp);
    $hits = $raw ? (json_decode($raw, true) ?: []) : [];
    $hits = array_values(array_filter($hits, fn($t) => $t > $now - 3600));
    $lastMin = count(array_filter($hits, fn($t) => $t > $now - 60));
    $blocked = $lastMin >= $cfg['rate_limit_per_min'] || count($hits) >= $cfg['rate_limit_per_hour'];
    if (!$blocked) $hits[] = $now;
    ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($hits));
    flock($fp, LOCK_UN); fclose($fp);
    return $blocked;
}
if (rate_limited($cfg)) {
    header('Retry-After: 60');
    fail(429, 'too_many_requests');
}

// ---------- ۴) خواندن و اعتبارسنجی ورودی ----------
$raw = file_get_contents('php://input', false, null, 0, 200000);
$in  = json_decode($raw ?: '', true);
if (!is_array($in) || !isset($in['messages']) || !is_array($in['messages'])) {
    fail(400, 'bad_request');
}
$msgs = $in['messages'];
if (count($msgs) < 1 || count($msgs) > $cfg['max_messages'] + 1) {
    fail(400, 'bad_messages_count');
}
$clean = [];
$total = 0;
foreach (array_values($msgs) as $i => $m) {
    $role = $m['role'] ?? '';
    $text = $m['content'] ?? null;
    if (!is_string($text) || $text === '') fail(400, 'bad_message');
    // پرامپت سیستمی فقط به‌عنوان پیام اول پذیرفته می‌شود
    if (!in_array($role, ['system', 'user', 'assistant'], true) || ($role === 'system' && $i !== 0)) {
        fail(400, 'bad_role');
    }
    if (mb_strlen($text) > $cfg['max_msg_chars']) fail(413, 'message_too_long');
    $total += mb_strlen($text);
    $clean[] = ['role' => $role, 'content' => $text];
}
if ($total > $cfg['max_total_chars']) fail(413, 'payload_too_large');
if (end($clean)['role'] !== 'user') fail(400, 'last_must_be_user');

// ---------- ۵) ارسال به Groq با جایگزینی خودکار کلید ----------
$keys = $cfg['groq_keys'];
if (!$keys) fail(500, 'server_not_configured');

$payload = json_encode([
    'model'       => $cfg['model'],          // مدل را سرور تعیین می‌کند، نه کاربر
    'messages'    => $clean,
    'temperature' => $cfg['temperature'],
    'max_tokens'  => $cfg['max_tokens'],
    'stream'      => true,
], JSON_UNESCAPED_UNICODE);

// بدون بافر تا استریم لحظه‌ای برسد
@ini_set('zlib.output_compression', '0');
@ini_set('output_buffering', '0');
while (ob_get_level() > 0) @ob_end_flush();
ignore_user_abort(false);
set_time_limit(90);

// کلید شروع را تصادفی انتخاب می‌کنیم تا بار بین کلیدها پخش شود
$start = random_int(0, count($keys) - 1);
$retryable = [401, 403, 429, 500, 502, 503, 504];
$sent = false;

for ($n = 0; $n < count($keys); $n++) {
    $key    = $keys[($start + $n) % count($keys)];
    $status = 0;

    $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $key,
        ],
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT        => 75,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_RETURNTRANSFER => false,
        CURLOPT_HEADERFUNCTION => function ($ch, $line) use (&$status) {
            if (preg_match('#^HTTP/\S+\s+(\d{3})#', $line, $mm)) $status = (int)$mm[1];
            return strlen($line);
        },
        CURLOPT_WRITEFUNCTION  => function ($ch, $chunk) use (&$status, &$sent) {
            if ($status !== 200) return strlen($chunk);   // بدنهٔ خطا را دور بریز
            if (!$sent) {
                $sent = true;
                http_response_code(200);
                header('Content-Type: text/event-stream; charset=utf-8');
                header('Cache-Control: no-store, no-transform');
                header('X-Accel-Buffering: no');          // برای Nginx
            }
            echo $chunk;
            flush();
            return strlen($chunk);
        },
    ]);
    curl_exec($ch);
    curl_close($ch);

    if ($sent) exit;                                      // جواب کامل شد
    if (!in_array($status, $retryable, true) && $status !== 0) break; // خطای غیرقابل‌تکرار (مثلاً 400)
    // وگرنه کلید بعدی
}

fail(503, 'upstream_unavailable');
