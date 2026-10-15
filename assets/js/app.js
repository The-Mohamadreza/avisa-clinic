/* ===== CONFIG: the only place to edit clinic data ===== */
const CFG={founded:1392,updated:"۱۶ مهر ۱۴۰۵",
 hours:{6:[8,21],0:[8,21],1:[8,21],2:[8,21],3:[8,21],4:[8,18],5:[9,14]}, /* getDay(): 0=Sun … 6=Sat */
 chatEndpoint:"api/chat.php", /* پروکسی PHP؛ کلیدها فقط روی سرور هستند */
 endpoint:null /* "/api/appointments" → real POST. null = demo only. Slot availability must also come from your server */};
const D=[
{n:"قلب و عروق",d:"تشخیص و پیگیری بیماری‌های قلبی با دستگاه‌های اکو و نوار قلب دیجیتال.",i:'<path d="M20.8 4.6a5.5 5.5 0 00-7.3 0L12 5.9l-1.5-1.3a5.5 5.5 0 00-7.3 7.3L12 20.6l8.8-8.7a5.5 5.5 0 000-7.3z"/><path d="M3.5 12h4l2-4 3 8 2-5h6"/>'},
{n:"دندان‌پزشکی",d:"خدمات ترمیمی، ارتودنسی و ایمپلنت.",i:'<path d="M7 3c0 5-2 6-2 10a5 5 0 0010 0c0-2-1-3-1-5 3 1 4 4 4 7a7 7 0 01-14 0c0-5 3-8 3-12z"/>'},
{n:"پوست و مو",d:"مشاوره تخصصی، لیزر و درمان‌های زیبایی پوست.",i:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8 15c1 1.3 2.5 2 4 2s3-.7 4-2"/>'},
{n:"اطفال",d:"مراقبت و درمان کودکان از بدو تولد تا نوجوانی.",i:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'},
{n:"ارتوپدی",d:"درمان آسیب‌های استخوان و مفاصل و توانبخشی.",i:'<path d="M6 4l3 3-2 5 5-2 3 3M14 20l-3-3 2-5-5 2-3-3"/>'},
{n:"زنان و زایمان",d:"مراقبت‌های بارداری و خدمات تخصصی زنان.",i:'<path d="M12 2c2 3 4 5 4 8a4 4 0 01-8 0c0-3 2-5 4-8z"/><path d="M12 14v8M8 22h8"/>'}];
const P=[
{n:"دکتر نیلوفر احمدی",s:"متخصص قلب و عروق",d:0},{n:"دکتر آرش محمودی",s:"دندان‌پزشک",d:1},{n:"دکتر شیرین کریمی",s:"متخصص پوست و مو",d:2},
{n:"دکتر بهنام رستمی",s:"متخصص اطفال",d:3},{n:"دکتر پریسا نجفی",s:"متخصص ارتوپدی",d:4},{n:"دکتر مینا عباسی",s:"متخصص زنان و زایمان",d:5}];
const FAQ=[["چطور نوبت آنلاین بگیرم؟","در بخش رزرو، بخش، پزشک، روز و ساعت را انتخاب کنید و نام و موبایل خود را وارد کنید."],["آیا می‌توانم نوبت را لغو یا جابه‌جا کنم؟","بله. تا ۲۴ ساعت قبل از نوبت با پشتیبانی تماس بگیرید."],["کلینیک با کدام بیمه‌ها قرارداد دارد؟","فهرست بیمه‌ها را از واحد پذیرش بپرسید؛ پذیرش بیمه ممکن است بسته به بخش متفاوت باشد."],["ساعت کاری کلینیک چیست؟","شنبه تا چهارشنبه ۸ تا ۲۱، پنجشنبه ۸ تا ۱۸ و جمعه ۹ تا ۱۴. وضعیت لحظه‌ای بالای صفحه نمایش داده می‌شود."]];
/* نمونه‌متن‌ها؛ قبل از انتشار با نظرات واقعی بیماران جایگزین شوند */
const R=[
{n:"مریم رضایی",d:0,t:"رزرو آنلاین واقعاً وقتم را نجات داد. ساعت نوبت دقیق رعایت شد و اصلاً منتظر نماندم.",g:["نوبت‌دهی دقیق","بدون انتظار"]},
{n:"علی کریمی",d:4,t:"برخورد پزشک و پرسنل محترمانه بود و فضای کلینیک آرام و تمیز بود.",g:["برخورد محترمانه","فضای آرام"]},
{n:"نگار صادقی",d:3,t:"دکتر با فرزندم صبورانه رفتار کرد. برای ویزیت بعدی هم همین‌جا می‌آییم.",g:["صبر و دقت","کودک‌دوست"]},
{n:"رضا حیدری",d:1,t:"مراحل درمان کامل و شفاف توضیح داده شد و قبل از شروع، همه‌چیز را متوجه شدم.",g:["توضیح شفاف"]},
{n:"سحر مرادی",d:2,t:"از انتخاب روز و ساعت تا گرفتن کد پیگیری، همه‌چیز در چند دقیقه تمام شد.",g:["رزرو سریع","کد پیگیری"]},
{n:"لیلا نادری",d:5,t:"پیگیری‌های دوران بارداری در محیطی آرام و با پاسخ‌گویی خوب انجام شد.",g:["محیط آرام","پاسخ‌گویی"]}];

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fa=n=>String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]),en=s=>s.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d));
const pf=(d,o)=>new Intl.DateTimeFormat("fa-IR-u-ca-persian",{timeZone:"Asia/Tehran",...o}).format(d);
const WD=["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],DW=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const dowOf=d=>DW.indexOf(new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Tehran",weekday:"short"}).format(d));
const tnow=()=>{const p=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Tehran",hour12:false,hour:"2-digit",minute:"2-digit"}).formatToParts(new Date()).map(x=>[x.type,x.value]));return{h:(+p.hour%24)+ +p.minute/60,hh:String(+p.hour%24).padStart(2,"0"),mm:p.minute}};
const tf=t=>fa(String(Math.floor(t)).padStart(2,"0"))+":"+(t%1?"۳۰":"۰۰");
const hrTxt=h=>h?tf(h[0])+" تا "+tf(h[1]):"تعطیل";
const ini=n=>n.replace("دکتر ","").split(" ").map(w=>w[0]).join("");
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),3400)};
const okPhone=v=>/^09\d{9}$/.test(en(v).replace(/[\s-]/g,""));
const ic=i=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`;
const portrait=i=>{const photos=["images/cardiology.webp","images/dentistry.webp","images/dermatology.webp","images/pediatrics.webp","images/orthopedics.webp","images/gynecology.webp"];return `<img class="doctor-photo" src="${photos[i%photos.length]}" alt="${P[i%P.length].n}" loading="lazy" decoding="async">`};

/* ===== days & slots ===== */
const days=[...Array(10)].map((_,i)=>{const d=new Date(Date.now()+i*864e5),dow=dowOf(d);return{i,dow,ymd:new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tehran"}).format(d),day:pf(d,{day:"numeric"}),mon:pf(d,{month:"long"}),
 lbl:i===0?"امروز":i===1?"فردا":WD[dow]+" "+pf(d,{day:"numeric"}),full:pf(d,{weekday:"long",day:"numeric",month:"long"})}});
const taken=(p,di,t)=>(p*7+di*13+Math.round(t*2)*5)%4===0;
function slots(p,di){const hr=CFG.hours[days[di].dow];if(!hr)return[];const n=tnow().h,o=[];for(let t=hr[0];t<hr[1];t+=.5){if(di===0&&t<=n+.5)continue;if(!taken(p,di,t))o.push(t)}return o}
function nextSlots(p,k){const o=[];for(let di=0;di<10&&o.length<k;di++)for(const t of slots(p,di)){if(o.length<k)o.push({di,t});else break}return o}
const nxt=p=>{const n=nextSlots(p,1)[0];return n?days[n.di].lbl+" "+tf(n.t):"—"};
const firstDoc=d=>P.findIndex(p=>p.d===d);

/* ===== live data ===== */
function live(){
  const now=new Date(),dow=dowOf(now),{h}=tnow(),hr=CFG.hours[dow],open=hr&&h>=hr[0]&&h<hr[1];
  $("#dot").className="dot"+(open?" open":"");
  $("#openTxt").textContent=open?"اکنون باز است":(hr&&h<hr[0]?"امروز از "+tf(hr[0])+" باز می‌شود":"اکنون بسته است");
  $("#today").textContent=pf(now,{weekday:"long",day:"numeric",month:"long"});
  const y=+en(pf(now,{year:"numeric"})),yr=fa(y-CFG.founded)+"+";
  $("#s1").textContent=yr;$("#s2").textContent=fa(P.length);
  $("#copy").textContent="© "+fa(y)+" کلینیک تخصصی آویسا";$("#upd").textContent="آخرین به‌روزرسانی اطلاعات: "+CFG.updated;
  $("#hrs").innerHTML=[["شنبه تا چهارشنبه",[6,0,1,2,3]],["پنجشنبه",[4]],["جمعه",[5]]].map(([l,k])=>`<div class="${k.includes(dow)?"today":""}"><b>${l}</b><span>${hrTxt(CFG.hours[k[0]])}</span></div>`).join("");
}
live();setInterval(live,30000);
$("#core").innerHTML=portrait(0);

/* ===== departments / doctors / faq ===== */
$("#dg").innerHTML=D.map((x,i)=>`<article class="dc" data-d="${i}"><div class="ic">${ic(x.i)}</div><h3>${x.n}</h3><p>${x.d}</p><div class="nx"><span>نزدیک‌ترین نوبت<br><b>${nxt(firstDoc(i))}</b></span><button data-dep="${i}">رزرو</button></div></article>`).join("");
$("#trk").innerHTML=P.map((p,i)=>`<article class="doc" data-d="${p.d}"><div class="ph">${portrait(i)}</div><div class="bd"><h3>${p.n}</h3><small>${p.s}</small><div class="nxs"><i></i>${nxt(i)}</div><button class="btn b2 sm" style="width:100%" data-doc="${i}">رزرو با این پزشک</button></div></article>`).join("");
$("#nxB").onclick=()=>$("#trk").scrollBy({left:310,behavior:"smooth"});$("#pvB").onclick=()=>$("#trk").scrollBy({left:-310,behavior:"smooth"});
$("#fD").innerHTML=D.slice(0,5).map(x=>`<li><a href="#departments">${x.n}</a></li>`).join("");
$("#faqL").innerHTML=FAQ.map(([q,a])=>`<details><summary>${q}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></summary><p>${a}</p></details>`).join("");

/* ===== journey (scroll-driven) ===== */
const jl=$("#jl"),jis=$$("#jl>li");
function jy(){const r=jl.getBoundingClientRect(),mk=innerHeight*.62;jl.style.setProperty("--p",Math.min(1,Math.max(0,(mk-r.top)/r.height)).toFixed(3));jis.forEach(li=>{const n=li.querySelector(".nd").getBoundingClientRect();li.classList.toggle("on",n.top+n.height/2<mk)})}
addEventListener("scroll",jy,{passive:true});addEventListener("resize",jy);jy();

/* ===== booking studio ===== */
const S={d:null,p:null,day:null,t:null,v:"اولین مراجعه",step:1,code:""};
const canGo=n=>n===1||(n===2&&S.d!==null)||(n===3&&S.p!==null)||(n===4&&S.p!==null&&S.day!==null&&S.t!==null);
const LB=["بخش","پزشک","زمان","اطلاعات"];
$("#sn").innerHTML=LB.map((l,i)=>`<button data-n="${i+1}"><span><i>${fa(i+1)}</i>${l}</span></button>`).join("");
function render(){
  const st=S.step;
  $$(".pane").forEach(p=>p.classList.toggle("on",+p.dataset.n===st));
  $$("#sn button").forEach((b,i)=>{const n=i+1;b.classList.toggle("cur",n===st);b.classList.toggle("done",n<st||st===5);b.disabled=st===5||!canGo(n)})
  if(st===1)$("#dT").innerHTML=D.map((x,i)=>`<button class="dt" data-d="${i}" data-pick="${i}" aria-pressed="${S.d===i}"><span class="ic">${ic(x.i)}</span><b>${x.n}</b><small>نوبت: ${nxt(firstDoc(i))}</small></button>`).join("");
  if(st===2){$("#p2s").textContent="پزشکان بخش «"+D[S.d].n+"»";$("#dL").innerHTML=P.map((p,i)=>[p,i]).filter(([p])=>p.d===S.d).map(([p,i])=>`<button class="dd" data-d="${p.d}" data-pdoc="${i}" aria-pressed="${S.p===i}"><span class="av2">${portrait(i)}</span><span><b>${p.n}</b><small>${p.s}</small></span><em>${nxt(i)}</em></button>`).join("")}
  if(st===3){
    $("#cal").innerHTML=days.map(d=>{const c=slots(S.p,d.i).length,hh=CFG.hours[d.dow]||[0,0],w=Math.round(c/Math.max(1,(hh[1]-hh[0])*2)*100);return `<button class="day" data-di="${d.i}" aria-pressed="${S.day===d.i}" ${c?"":"disabled"}><small>${WD[d.dow]}</small><b>${d.day}</b><small>${d.mon}</small><u class="avb"><i style="width:${w}%"></i></u></button>`}).join("");
    $("#tms").innerHTML=S.day!==null?(()=>{const hr=CFG.hours[days[S.day].dow],n=tnow().h;return [["صبح",0,12],["عصر",12,17],["شب",17,24]].map(([l,lo,hi])=>{let o="";for(let t=hr[0];t<hr[1];t+=.5){if(t<lo||t>=hi)continue;const off=taken(S.p,S.day,t)||(S.day===0&&t<=n+.5);o+=`<button class="tm" data-t="${t}" aria-pressed="${S.t===t}" ${off?"disabled":""}>${tf(t)}</button>`}return o?`<div class="tg2"><h4>${l}</h4><div class="tms2">${o}</div></div>`:""}).join("")})():"";
  }
  const when=S.day!==null&&S.t!==null?days[S.day].full+"، "+tf(S.t):"";
  $("#tD").textContent=S.d!==null?D[S.d].n:"—";$("#tP").textContent=S.p!==null?P[S.p].n:"—";$("#tT").textContent=when||"—";$("#tV").textContent=S.v;$("#tN").textContent=$("#fN").value.trim()||"—";
  $("#sumbar").innerHTML=[S.d!==null&&D[S.d].n,S.p!==null&&P[S.p].n,when].filter(Boolean).map(x=>`<span>${x}</span>`).join("");
  const done=[S.d!==null,S.p!==null,!!when].filter(Boolean).length;
  $("#ringF").style.strokeDashoffset=188.5*(1-done/3);$("#ringT").textContent=fa(done)+"/۳";
  $("#hint").textContent=["برای شروع، یک بخش را انتخاب کنید.","پزشک را انتخاب کنید.","روز و ساعت را انتخاب کنید.","اطلاعات تماس را وارد کنید و نوبت را ثبت کنید."][Math.min(done,3)];
  $("#tk").dataset.d=S.d??"";
  $("#studio").classList.toggle("sent",st===5);$("#studio").classList.toggle("show",st===4);
  $("#nav2").hidden=st===5;$("#bkB").hidden=st===1;$("#nxtB").textContent=st===4?"ثبت نوبت":"ادامه";
}
function setStep(n,scroll){S.step=n;render();const r=$("#studio").getBoundingClientRect();if(scroll||r.top<60)$("#studio").scrollIntoView({behavior:"smooth",block:"start"})}
const later=(fn,ms)=>setTimeout(fn,ms);
document.addEventListener("click",e=>{
  let b;
  if(b=e.target.closest("[data-pick]")){const d=+b.dataset.pick;if(S.d!==d){S.p=null;S.day=null;S.t=null}S.d=d;render();later(()=>setStep(2),260)}
  else if(b=e.target.closest("[data-pdoc]")){const p=+b.dataset.pdoc;if(S.p!==p){S.day=null;S.t=null}S.p=p;render();later(()=>setStep(3),260)}
  else if(b=e.target.closest(".day")){if(b.disabled)return;S.day=+b.dataset.di;S.t=null;render();$("#tms").scrollIntoView({behavior:"smooth",block:"nearest"})}
  else if(b=e.target.closest(".tm")){if(b.disabled)return;S.t=+b.dataset.t;render();later(()=>setStep(4),380)}
  else if(b=e.target.closest("#sn button")){if(!b.disabled)setStep(+b.dataset.n)}
  else if(b=e.target.closest("[data-dep]")){S.d=+b.dataset.dep;S.p=null;S.day=null;S.t=null;setStep(2,1)}
  else if(b=e.target.closest("[data-doc]")){S.p=+b.dataset.doc;S.d=P[S.p].d;S.day=null;S.t=null;setStep(3,1)}
});
$("#bkB").onclick=()=>setStep(S.step-1);
$("#nxtB").onclick=()=>{const s=S.step;
  if(s===1)return S.d===null?toast("یک بخش را انتخاب کنید"):setStep(2);
  if(s===2)return S.p===null?toast("یک پزشک را انتخاب کنید"):setStep(3);
  if(s===3)return(S.day===null||S.t===null)?toast("روز و ساعت را انتخاب کنید"):setStep(4);
  submit()};
$("#seg").onclick=e=>{const b=e.target.closest("button");if(!b)return;S.v=b.dataset.v;$$("#seg button").forEach(x=>x.setAttribute("aria-pressed",x===b));$("#tV").textContent=S.v};
$("#fN").oninput=()=>$("#tN").textContent=$("#fN").value.trim()||"—";
const qr=c=>{let h=0;for(const ch of c)h=(h*31+ch.charCodeAt(0))>>>0;let o="";for(let y=0;y<9;y++)for(let x=0;x<9;x++){const f=(x<3&&y<3)||(x>5&&y<3)||(x<3&&y>5);h=(h*1103515245+12345)>>>0;if(f||(h>>>16)&1)o+=`<rect x="${x}" y="${y}" width="1" height="1" fill="currentColor"/>`}return o};
function burst(){const c=$("#cfx");c.innerHTML="";for(let i=0;i<30;i++){const x=document.createElement("span"),a=Math.random()*6.283,d=90+Math.random()*140;x.style.cssText=`--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d-40}px;--r:${Math.random()*540}deg;--c:${["#1f4fe0","#ffb547","#12a36f","#ff8da1","#9b8cff"][i%5]}`;c.appendChild(x)}setTimeout(()=>c.innerHTML="",1600)}
async function submit(){
  const n=$("#fN").value.trim(),ph=$("#fP").value.trim(),e=$("#err");
  if(n.length<3)return e.textContent="نام و نام خانوادگی را کامل وارد کنید.";
  if(!okPhone(ph))return e.textContent="شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.";
  e.textContent="";$("#nxtB").disabled=true;
  const body={dept:D[S.d].n,doctor:P[S.p].n,when:days[S.day].full+" "+tf(S.t),name:n,phone:en(ph),note:$("#fT").value,visit:S.v};
  if(CFG.endpoint){try{const r=await fetch(CFG.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});if(!r.ok)throw 0}catch{$("#nxtB").disabled=false;return e.textContent="ثبت نوبت انجام نشد. دوباره تلاش کنید یا تماس بگیرید."}}
  S.code="AVS-"+Math.floor(100000+Math.random()*899999);$("#code").textContent=S.code;$("#qr").innerHTML=qr(S.code);
  $("#okMsg").textContent=(CFG.endpoint?"پیامک تأیید برای شما ارسال می‌شود. ":"نسخهٔ نمایشی: این درخواست به سرور ارسال نشد. ")+"کارت نوبت را ذخیره کنید.";
  $("#nxtB").disabled=false;setStep(5,1);burst()}
$("#ics").onclick=()=>{const d=days[S.day],h=String(Math.floor(S.t)).padStart(2,"0"),m=S.t%1?"30":"00",st=new Date(`${d.ymd}T${h}:${m}:00+03:30`),e2=new Date(st.getTime()+18e5),z=x=>x.toISOString().replace(/[-:]/g,"").replace(/\.\d+/,"");
 const txt=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Avisa Clinic//FA","BEGIN:VEVENT","UID:"+S.code+"@avisa","DTSTAMP:"+z(new Date()),"DTSTART:"+z(st),"DTEND:"+z(e2),"SUMMARY:نوبت "+P[S.p].n+" - کلینیک آویسا","DESCRIPTION:کد پیگیری "+S.code,"LOCATION:تهران، خیابان ولیعصر","END:VEVENT","END:VCALENDAR"].join("\r\n");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"text/calendar"}));a.download="avisa-appointment.ics";a.click();toast("فایل تقویم ساخته شد")};
$("#cpy").onclick=async()=>{try{await navigator.clipboard.writeText(S.code);toast("کد کپی شد")}catch{toast(S.code)}};
$("#again").onclick=()=>{Object.assign(S,{d:null,p:null,day:null,t:null,code:""});["#fN","#fP","#fT"].forEach(s=>$(s).value="");setStep(1,1)};
if(matchMedia("(hover:hover) and (pointer:fine)").matches){const tk=$("#tk");tk.addEventListener("pointermove",e=>{const b=tk.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;tk.style.transform=`perspective(900px) rotateY(${x*-9}deg) rotateX(${y*7}deg)`});tk.addEventListener("pointerleave",()=>tk.style.transform="")}
$("#cform").onsubmit=e=>{e.preventDefault();if(!okPhone($("#cP").value))return toast("شماره موبایل معتبر نیست");toast("پیام شما ارسال شد");e.target.reset()};
render();

/* ===== reviews ===== */
let rc=-1,rt;
$("#tl").innerHTML=R.map((x,i)=>`<button class="tb" role="tab" data-d="${x.d}" data-i="${i}" aria-selected="false"><i>${ini(x.n)}</i><span><b>${x.n}</b><small>${D[x.d].n}</small></span></button>`).join("");
function showR(i){
  i=(i+R.length)%R.length;const x=R[i],q=$("#tq");rc=i;
  $$(".tb").forEach((b,k)=>{b.setAttribute("aria-selected",k===i);if(k===i){b.style.animation="none";b.offsetWidth;b.style.animation=""}});
  q.dataset.d=x.d;q.classList.remove("sw");void q.offsetWidth;q.classList.add("sw");
  q.innerHTML=`<svg class="qm" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d="M10 30c0-9 4-15 12-18l1.6 3C18.5 17.5 17 20 17 23h5v13H10V30zm18 0c0-9 4-15 12-18l1.6 3c-5.100 2.500-6.600 5-6.600 8h5v13H28V30z"/></svg><p>${x.t}</p><div class="tags">${x.g.map(g=>`<span>${g}</span>`).join("")}</div><div class="ft"><div class="who"><i>${ini(x.n)}</i><div><b>${x.n}</b><small>بیمار بخش ${D[x.d].n}</small></div></div><div class="ctl"><button id="rP" aria-label="قبلی"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg></button><button id="rN" aria-label="بعدی"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg></button></div></div>`;
  $("#rP").onclick=()=>showR(rc-1);$("#rN").onclick=()=>showR(rc+1);
  clearTimeout(rt);rt=setTimeout(()=>showR(rc+1),8000)}
$("#tl").onclick=e=>{const b=e.target.closest(".tb");if(b)showR(+b.dataset.i)};
const tgW=$("#tgW");tgW.addEventListener("mouseenter",()=>{clearTimeout(rt);tgW.classList.add("paused")});tgW.addEventListener("mouseleave",()=>{tgW.classList.remove("paused");showR(rc)});
showR(0);

/* ===== AI assistant (استریم از طریق api/chat.php) ===== */
let busy=false,hist=[];
const cbM=$("#cbM"),esc=s=>s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const AV='<span class="av"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2.5-6 4 12 2.5-6H22"/></svg></span>';
const stamp=()=>{const t=tnow();return fa(t.hh)+":"+fa(t.mm)};
const fmt=t=>esc(t.replace(/\[\[BOOK(?::\d+)?\]\]/g,"").replace(/\[\[[^\]]*$/,"")).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").trim();
const scrollEnd=()=>{cbM.scrollTop=cbM.scrollHeight};
function addRow(c,html){const r=document.createElement("div");r.className="rowm "+c;r.innerHTML=(c==="b"?AV:"")+`<div class="msg">${html}</div>`;cbM.appendChild(r);scrollEnd();return r.querySelector(".msg")}
function welcome(){
  cbM.innerHTML=`<div class="cb-w"><div class="big"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2.5-6 4 12 2.5-6H22"/></svg></div><h3>سلام! دستیار آویسا هستم</h3><p>دربارهٔ نوبت، پزشکان و ساعت کاری کمکتان می‌کنم.</p>
  <div class="qa">${[["نزدیک‌ترین نوبت خالی کی است؟","نوبت خالی",'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/>',1],["برای مشکل من کدام بخش مناسب است؟","پیدا کردن بخش مناسب",'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.500-4.500"/>',4],["ساعت کاری کلینیک چیست؟","ساعت کاری",'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',3],["آدرس و تلفن کلینیک را بگو","آدرس و تماس",'<path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',2]].map(([q,l,i,d])=>`<button type="button" data-q="${q}" data-d="${d}"><i>${ic(i)}</i>${l}</button>`).join("")}</div></div>`;
  $("#qk").classList.remove("on");hist=[]}
const sysPrompt=()=>{const now=new Date(),dow=dowOf(now),t=tnow();
 return `تو «دستیار آویسا» هستی، دستیار کلینیک تخصصی آویسا در تهران. فقط فارسی، گرم و کوتاه (حداکثر چهار جمله) جواب بده و فقط از اطلاعات زیر استفاده کن. اگر چیزی در اطلاعات نیست، بگو با تلفن ۰۲۱۸۸۰۰۱۲۳۴ تماس بگیرند یا از واحد پذیرش بپرسند. هرگز بیماری تشخیص نده و دارو یا دوز تجویز نکن؛ فقط می‌توانی بر اساس توضیح کاربر بخش مناسب را پیشنهاد بدهی. در شرایط اورژانسی بگو فوراً با ۱۱۵ تماس بگیرند. اگر کاربر نوبت خواست، در انتهای پاسخ دقیقاً یک برچسب بگذار: [[BOOK:شماره پزشک]] اگر پزشک مشخص است، وگرنه [[BOOK]].
اکنون: ${pf(now,{weekday:"long",day:"numeric",month:"long",year:"numeric"})} ساعت ${fa(t.hh)}:${fa(t.mm)} به وقت تهران. ساعت کاری امروز: ${hrTxt(CFG.hours[dow])}.
ساعت کاری: شنبه تا چهارشنبه ۸ تا ۲۱، پنجشنبه ۸ تا ۱۸، جمعه ۹ تا ۱۴. آدرس: تهران، خیابان ولیعصر. ایمیل: info@avisaclinic.ir. فعال از سال ۱۳۹۲. بیمه: برای فهرست بیمه‌ها باید از پذیرش پرسید.
پزشکان:
${P.map((p,i)=>`${i}) ${p.n}، ${p.s}، بخش ${D[p.d].n}، نزدیک‌ترین نوبت: ${nxt(i)}`).join("\n")}`};
async function groq(msgs,on){let full="";
 try{const r=await fetch(CFG.chatEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:msgs})});
 if(!r.ok||!r.body)return null;
 const rd=r.body.getReader(),dec=new TextDecoder();let buf="";
 for(;;){const {done,value}=await rd.read();if(done)break;buf+=dec.decode(value,{stream:true});const ls=buf.split("\n");buf=ls.pop();
  for(const l of ls){if(!l.startsWith("data:"))continue;const d=l.slice(5).trim();if(d==="[DONE]")continue;try{const t=JSON.parse(d).choices[0].delta.content;if(t){full+=t;on(full)}}catch{}}}
 return full||null}catch{return full||null}}
function local(q){q=en(q);const has=(...w)=>w.some(x=>q.includes(x));
 if(has("ساعت کاری","باز","تعطیل","کاری"))return "شنبه تا چهارشنبه ۸ تا ۲۱، پنجشنبه ۸ تا ۱۸ و جمعه ۹ تا ۱۴ پذیرش داریم.";
 if(has("آدرس","نشانی","مسیر","تلفن","شماره","تماس"))return "آدرس: تهران، خیابان ولیعصر.\nتلفن: ۰۲۱۸۸۰۰۱۲۳۴\nایمیل: info@avisaclinic.ir";
 if(has("بیمه"))return "برای فهرست بیمه‌های طرف قرارداد، لطفاً از واحد پذیرش بپرسید.";
 if(has("کدام بخش","مشکل","درد","علائم","بخش مناسب"))return "مشکلتان را کوتاه بنویسید تا بخش مناسب را پیشنهاد بدهم. بخش‌های ما: "+D.map(x=>x.n).join("، ")+". برای تشخیص حتماً با پزشک مشورت کنید.";
 const pi=P.findIndex(p=>p.s.split(" ").some(w=>w.length>3&&q.includes(w))||q.includes(p.n.replace("دکتر ","")));
 if(pi>=0)return `**${P[pi].n}** (${P[pi].s}) نزدیک‌ترین نوبت خالی را ${nxt(pi)} دارد.[[BOOK:${pi}]]`;
 if(has("نوبت","رزرو","خالی"))return "نزدیک‌ترین نوبت‌ها:\n"+[0,1,3].map(i=>"• "+P[i].n+": "+nxt(i)).join("\n")+"[[BOOK]]";
 if(has("پزشک","دکتر","متخصص"))return "پزشکان ما: "+P.map(p=>p.n+" ("+p.s+")").join("، ")+".";
 return "برای این سؤال بهتر است با واحد پذیرش تماس بگیرید: ۰۲۱۸۸۰۰۱۲۳۴. اگر نوبت می‌خواهید، همین‌جا کمک می‌کنم.[[BOOK]]"}
function actions(msg,txt){const m=txt.match(/\[\[BOOK(?::(\d+))?\]\]/);if(!m)return;const b=document.createElement("button");b.className="act";b.textContent=m[1]?"رزرو با "+P[+m[1]].n:"رفتن به رزرو نوبت";
 b.onclick=()=>{closeChat();if(m[1]){S.p=+m[1];S.d=P[S.p].d;S.day=null;S.t=null;setStep(3,1)}else{S.step=Math.min(S.step,S.d===null?1:S.step);render();$("#booking").scrollIntoView({behavior:"smooth"})}};msg.appendChild(b)}
async function send(text){text=text.trim();if(!text||busy)return;busy=true;$("#cbS").disabled=true;$("#cbI").value="";
 const w=cbM.querySelector(".cb-w");if(w)w.remove();$("#qk").classList.add("on");
 addRow("u",esc(text)+`<span class="tm2">${stamp()}</span>`);hist.push({role:"user",content:text});
 const msg=addRow("b",'<span class="typing"><i></i><i></i><i></i></span>');msg.parentNode.classList.add("typingrow");
 let ans=null,shown=false;const on=t=>{shown=true;msg.innerHTML=fmt(t);scrollEnd()};
 ans=await groq([{role:"system",content:sysPrompt()},...hist.slice(-8)],on);
 if(!ans){await new Promise(r=>setTimeout(r,600));ans=local(text);const c=ans.replace(/\[\[BOOK(?::\d+)?\]\]/g,"");for(let i=0;i<=c.length;i+=3){msg.innerHTML=fmt(c.slice(0,i));scrollEnd();await new Promise(r=>setTimeout(r,14))}}
 msg.innerHTML=fmt(ans)+`<span class="tm2">${stamp()}</span>`;actions(msg,ans);scrollEnd();
 hist.push({role:"assistant",content:ans.replace(/\[\[BOOK(?::\d+)?\]\]/g,"").trim()});busy=false;$("#cbS").disabled=false;if(matchMedia("(hover:hover)").matches)$("#cbI").focus()}
$("#qk").innerHTML=["نوبت خالی","ساعت کاری","آدرس","پزشک قلب","بیمه"].map(x=>`<button type="button">${x}</button>`).join("");
$("#qk").onclick=e=>{const b=e.target.closest("button");if(b)send(b.textContent)};
cbM.onclick=e=>{const b=e.target.closest("[data-q]");if(b)send(b.dataset.q)};
$("#cbForm").onsubmit=e=>{e.preventDefault();send($("#cbI").value)};
$("#cbR").onclick=()=>{if(busy)return;welcome()};
let opened=false;const mob=()=>matchMedia("(max-width:640px)").matches;
function openChat(){$("#cb").classList.add("on");$("#cb").setAttribute("aria-hidden","false");$("#cbF").classList.add("open");$("#cbF").setAttribute("aria-expanded","true");$("#cbh").classList.remove("on");if(mob())document.body.classList.add("lock");
 if(!opened){opened=true;welcome()}if(!mob())setTimeout(()=>$("#cbI").focus({preventScroll:true}),500)}
function closeChat(){$("#cb").classList.remove("on");$("#cb").setAttribute("aria-hidden","true");$("#cbF").classList.remove("open");$("#cbF").setAttribute("aria-expanded","false");document.body.classList.remove("lock")}
$("#cbF").onclick=()=>{$("#cbF").classList.add("seen");$("#cb").classList.contains("on")?closeChat():openChat()};$("#cbX").onclick=closeChat;
addEventListener("keydown",e=>e.key==="Escape"&&closeChat());
setTimeout(()=>{if(!opened){$("#cbh").classList.add("on");setTimeout(()=>$("#cbh").classList.remove("on"),6000)}},7000);

/* ===== chrome ===== */
addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-innerHeight;$("#bar").style.width=(m>0?scrollY/m*100:0)+"%"},{passive:true});
const bg=$("#burger"),mm=$("#mm");
const shut=()=>{mm.classList.remove("on");bg.classList.remove("x");bg.setAttribute("aria-expanded","false");document.body.classList.remove("lock")};
bg.onclick=()=>{const o=mm.classList.toggle("on");bg.classList.toggle("x",o);bg.setAttribute("aria-expanded",o);document.body.classList.toggle("lock",o)};
$$("#mm a").forEach(a=>a.onclick=shut);addEventListener("keydown",e=>e.key==="Escape"&&shut());
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$(".links a").forEach(a=>a.classList.toggle("cur",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
$$(".links a").forEach(a=>{const s=$(a.getAttribute("href"));s&&io.observe(s)});
$$(".head,.dc,.doc,.faq details,.cg>*,.tg>*,.studio,.strip ul").forEach(e=>{e.classList.add("rv-on");e.style.setProperty("--s",[...e.parentNode.children].indexOf(e))});
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");ro.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px -4% 0px"});
$$(".rv-on").forEach(e=>ro.observe(e));
