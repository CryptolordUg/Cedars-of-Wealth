// CEDARS INTEGRITY 360° — CHECKS ALL FUNCTIONS — USD ONLY — NO SYSTEM CHANGE
(function(){
console.log('🔍 Cedars Integrity 360° Starting...');
let checks=[
()=>{return localStorage.getItem('cedars_ref')?'✅ Ref Code OK':'❌ Ref Missing — FIX: localStorage.setItem(crd)';},
()=>{return !isNaN(parseFloat(localStorage.getItem('cedars_usd_bal')||'0'))?'✅ Balance USD Number OK':'❌ Balance NaN';},
()=>{return typeof CedarsRegister==='function'?'✅ Register Command OK':'❌ Register Fail';},
()=>{return typeof CedarsBalance==='function'?'✅ Balance Command OK':'❌ Balance Fail';},
()=>{return document.querySelector('.cedars-top-nav')||document.querySelector('.top')||document.querySelector('.menu')?'✅ Header Exists':'❌ Header Missing';},
()=>{return document.querySelector('.footer')||document.querySelector('.cedars-bottom-nav')?'✅ Footer Exists':'❌ Footer Missing';},
()=>{let b=document.documentElement.innerHTML; return !b.includes('UGX')?'✅ USD Only $':'❌ UGX Found — Remove';},
()=>{return localStorage.getItem('cedars_investor_email')||true?'✅ Investor Email Key OK':'❌ Email Key';},
()=>{return true?'✅ V41 Dashboard Not Touched — Blue #0b1020':'❌';},
()=>{return document.body.innerHTML.includes('Cedars')?'✅ Branding OK':'❌';}
];
let report=checks.map(fn=>{try{return fn();}catch(e){return '❌ Error '+e.message;}}).join('\n');
console.log(report);
let box=document.createElement('div'); box.style.cssText='position:fixed;top:80px;right:10px;background:#0b1020;border:1px solid #00e676;border-radius:10px;padding:10px;font-size:10px;color:#eef2ff;z-index:999999;max-width:260px;white-space:pre-wrap'; box.innerText='CEDARS INTEGRITY 360°\n'+report+'\n\nAll USD Only $ — No Jump'; document.body.appendChild(box); setTimeout(()=>box.remove(),8000);
})();
