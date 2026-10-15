<?php
// فایل تنظیمات سرور — این فایل هرگز نباید به مرورگر برسد.
// بهتر است کلیدها را در متغیر محیطی (Environment Variable) بگذارید؛
// اگر نشد، همین‌جا جایگزین کنید.
return [
    'groq_keys' => array_values(array_filter([
        getenv('GROQ_KEY_1') ?: '',
        getenv('GROQ_KEY_2') ?: '',
        getenv('GROQ_KEY_3') ?: '',
    ], fn($k) => $k && strpos($k, 'PUT_YOUR_') !== 0)),

    'model'       => 'llama-3.3-70b-versatile',
    'max_tokens'  => 420,
    'temperature' => 0.4,

    // دامنه‌هایی که اجازهٔ استفاده از چت‌بات را دارند (بدون http و بدون /)
    // دامنهٔ خود سایت به‌صورت خودکار مجاز است.
    'allowed_hosts' => ['mmd-ai.com', 'www.mmd-ai.com', 'localhost', '127.0.0.1'],

    // محدودیت درخواست برای هر IP
    'rate_limit_per_min'  => 15,
    'rate_limit_per_hour' => 120,

    // محدودیت اندازهٔ ورودی
    'max_messages'     => 12,
    'max_msg_chars'    => 6000,
    'max_total_chars'  => 16000,
];
