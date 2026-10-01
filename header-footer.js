// V42.1 CLEAN — SINGLE HEADER FOOTER ONLY — LOGO BIGGER CLICKABLE — AUTO DELETE OLD — NO DIRT
(function(){
if(document.getElementById('cedars-v42-header')) document.getElementById('cedars-v42-header').remove();
if(document.getElementById('cedars-disco-footer')) document.getElementById('cedars-disco-footer').remove();
// DELETE OLD DIRTY HEADERS/FOOTERS FROM INDEX.HTML
document.querySelectorAll('.top,.cedars-top-nav,.footer,.cedars-bottom-nav,.nav').forEach(el=>el.remove());
let base=location.pathname.includes('/dashboard/')?'../':'';
let css=`<style>
#cedars-v42-header{position:fixed;top:0;left:0;right:0;z-index:999999;background:#0b1020;border-bottom:1px solid #1e2d55;padding:10px 14px;display:flex;justify-content:space-between;align-items:center}
#cedars-v42-logo{font-size:28px!important;font-weight:900;color:#fff;text-decoration:none;display:flex;align-items:center;gap:8px;cursor:pointer}
#cedars-v42-logo span{font-size:32px}
#cedars-v42-menu{display:flex;gap:6px;overflow-x:auto;white-space:nowrap;scrollbar-width:none}
#cedars-v42-menu a{color:#8a9cc7;text-decoration:none;font-size:11px;font-weight:700;padding:7px 12px;border-radius:20px;border:1px solid #1e2d55;background:#162040;flex-shrink:0}
#cedars-v42-menu a:hover{background:#fff;color:#000}
#cedars-disco-footer{position:fixed;bottom:0;left:0;right:0;z-index:999998;background:#0b1020;border-top:1px solid #1e2d55;height:36px;display:flex;align-items:center;overflow:hidden}
#cedars-disco-track{display:flex;gap:28px;white-space:nowrap;animation:cedarsDisco 70s linear infinite}
@keyframes cedarsDisco{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}
#cedars-disco-track span{font-size:11px;font-weight:700;padding:4px 10px;border-radius:12px;border:1px solid}
body{padding-top:62px!important;padding-bottom:70px!important}
</style>`;
document.head.insertAdjacentHTML('beforeend',css);
let logged=localStorage.getItem('cedars_logged_in')==='true';
let email=localStorage.getItem('cedars_investor_email')||'';
let signTxt=logged&&email?'Sign out ('+email.split('@')[0]+')':'Sign in / Sign out';
let header=`<div id="cedars-v42-header">
<a id="cedars-v42-logo" href="${base}index.html"><span>🌲</span> Cedars of Wealth</a>
<div id="cedars-v42-menu">
<a href="${base}index.html">Home</a><a href="${base}index.html#about">About us</a><a href="${base}calendar.html">Calendar</a><a href="${base}register.html">Register</a><a href="${base}index.html#plans">Plans</a><a href="${base}deposit.html">Deposit</a><a href="${base}withdraw.html">Withdraw</a><a href="${base}referral.html">Referral</a><a href="${base}login.html" id="v42sign">${signTxt}</a>
</div></div>`;
let footer=`<div id="cedars-disco-footer"><div id="cedars-disco-track">
<span style="color:#00e676;border-color:rgba(0,230,118,0.3)">🌲 Cedars of Wealth — 10-Year Education</span>
<span style="color:#2a5bd7;border-color:rgba(42,91,215,0.3)">💰 Plans $50 $150 $500 USD</span>
<span style="color:#ffab00;border-color:rgba(255,171,0,0.3)">🔗 Binary 2 Lines — 10% / 5% / 1%</span>
<span style="color:#ff4081;border-color:rgba(255,64,129,0.3)">💬 Live Support 24/7</span>
</div></div>`;
document.body.insertAdjacentHTML('afterbegin',header);
document.body.insertAdjacentHTML('beforeend',footer);
let s=document.getElementById('v42sign'); if(logged){ s.addEventListener('click',e=>{e.preventDefault(); localStorage.setItem('cedars_logged_in','false'); location.href=base+'login.html';}); }
})();
