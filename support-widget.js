// V42 SUPPORT WIDGET — TAWK.TO LIVE + WHATSAPP FLOATING BOTTOM RIGHT — ALARM READS NAME — NO SETTINGS CHANGE
(function(){
if(document.getElementById('cedars-wa-float')) return;
// CSS
let css=`<style>
#cedars-wa-float{position:fixed;bottom:75px;right:14px;z-index:9999999;width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,0.5);cursor:pointer;border:2px solid #fff;animation:waPulse 2s infinite}
@keyframes waPulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,0.7)}70%{box-shadow:0 0 0 12px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
#cedars-wa-float span{font-size:28px}
</style>`;
document.head.insertAdjacentHTML('beforeend',css);
// WhatsApp Floating — Investor name in message
let inv = localStorage.getItem('cedars_investor_name')||localStorage.getItem('cedars_investor_email')||'Investor';
let wa = `<a id="cedars-wa-float" href="https://wa.me/256700000000?text=Hello%20Cedars%20Support%20-%20Investor:%20${encodeURIComponent(inv)}" target="_blank" title="WhatsApp Live Support">💬</a>`;
document.body.insertAdjacentHTML('beforeend',wa);
// Tawk.to Live — Replace ID with yours if you have
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/684a0a0a0a0a0a0a0a0a0a0a/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
// Alarm — Reads investor name loud
window.CedarsSupportAlarm=function(){
 let name=localStorage.getItem('cedars_investor_name')||localStorage.getItem('cedars_investor_email')||'Investor';
 try{ let a=new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'); a.volume=1; a.play(); }catch(e){}
 if('speechSynthesis' in window){ speechSynthesis.cancel(); let u=new SpeechSynthesisUtterance('Customer online '+name+' dashboard'); u.volume=1; speechSynthesis.speak(u); }
 if(window.Tawk_API && Tawk_API.maximize){ Tawk_API.maximize(); }
 console.log('🔔 Cedars Alarm — Investor:',name,'— WhatsApp + Tawk.to live');
};
console.log('✅ Support Widget V42 Loaded — WhatsApp floating + Tawk.to');
})();
