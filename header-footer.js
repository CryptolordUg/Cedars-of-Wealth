// V42 HEADER FOOTER LOCKED — LOGO 100% BIGGER + CLICK TO LANDING — DISCO FOOTER V41 — NO SETTINGS CHANGE
(function(){
if(document.getElementById('cedars-v42-header')) return;
let base = location.pathname.includes('/dashboard/')? '../' : '';
let css = `<style>
#cedars-v42-header{position:fixed;top:0;left:0;right:0;z-index:999999;background:rgba(11,16,32,0.98);border-bottom:2px solid #1e2d55;padding:8px 14px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px)}
#cedars-v42-logo{font-size:28px!important;font-weight:900;color:#fff;cursor:pointer;display:flex;align-items:center;gap:8px;text-decoration:none}
#cedars-v42-logo span{font-size:32px;filter:drop-shadow(0 0 6px #00e676)}
#cedars-v42-menu{display:flex;gap:6px;overflow-x:auto;white-space:nowrap;scrollbar-width:none}
#cedars-v42-menu a{color:#8a9cc7;text-decoration:none;font-size:11px;font-weight:700;padding:7px 12px;border-radius:20px;border:1px solid #1e2d55;background:#162040;flex-shrink:0}
#cedars-v42-menu a:hover{background:#fff;color:#000}
#cedars-disco-footer{position:fixed;bottom:0;left:0;right:0;z-index:999998;background:#0b1020;border-top:2px solid #1e2d55;padding:0;overflow:hidden;height:38px;display:flex;align-items:center}
#cedars-disco-track{display:flex;gap:30px;white-space:nowrap;animation:cedarsDisco 60s linear infinite}
@keyframes cedarsDisco{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}
#cedars-disco-track span{font-size:11px;font-weight:800;padding:4px 10px;border-radius:10px}
.c-d1{color:#00e676;background:rgba(0,230,118,0.12);border:1px solid rgba(0,230,118,0.3)}
.c-d2{color:#2a5bd7;background:rgba(42,91,215,0.12);border:1px solid rgba(42,91,215,0.3)}
.c-d3{color:#ffab00;background:rgba(255,171,0,0.12);border:1px solid rgba(255,171,0,0.3)}
.c-d4{color:#ff4081;background:rgba(255,64,129,0.12);border:1px solid rgba(255,64,129,0.3)}
.c-d5{color:#8a9cc7;background:rgba(138,156,199,0.12);border:1px solid rgba(138,156,199,0.3)}
body{padding-top:60px!important;padding-bottom:70px!important}
</style>`;
document.head.insertAdjacentHTML('beforeend',css);
let logged = localStorage.getItem('cedars_logged_in')==='true';
let email = localStorage.getItem('cedars_investor_email')||'';
let signTxt = logged && email? 'Sign out ('+email.split('@')[0]+')' : 'Sign in / Sign out';
let header = `<div id="cedars-v42-header">
<a id="cedars-v42-logo" href="${base}index.html" onclick="location.href='${base}index.html'"><span>🌲</span> Cedars of Wealth</a>
<div id="cedars-v42-menu">
<a href="${base}index.html">Home</a><a href="${base}index.html#about">About us</a><a href="${base}calendar.html">Calendar</a><a href="${base}register.html">Register</a><a href="${base}index.html#plans">Plans</a><a href="${base}deposit.html">Deposit</a><a href="${base}withdraw.html">Withdraw</a><a href="${base}referral.html">Referral</a>
<a href="${base}login.html" id="v42sign">${signTxt}</a>
</div></div>`;
let footer = `<div id="cedars-disco-footer"><div id="cedars-disco-track">
<span class="c-d1">🌲 Cedars of Wealth — 10 Year Education — USD Only $</span>
<span class="c-d2">💰 Mighty Cedar $500 — Growth $150 — Starter $50 — All USD</span>
<span class="c-d3">🔗 Binary 2 Lines Only — 10% Direct — 5% 2nd — 1% Infinite</span>
<span class="c-d4">📈 Live Rates — Education + Trading — Investor Owned 100% 360°</span>
<span class="c-d5">💬 Live Support 24/7 — WhatsApp + Telegram — Solscan Verified</span>
<span class="c-d1">🌲 Investor Dashboard Fully Owned — Logo Click → Landing — No Settings Change</span>
</div></div>`;
document.body.insertAdjacentHTML('afterbegin',header);
document.body.insertAdjacentHTML('beforeend',footer);
let s=document.getElementById('v42sign'); if(logged){ s.addEventListener('click',e=>{e.preventDefault(); localStorage.setItem('cedars_logged_in','false'); location.href=base+'login.html';}); }
})();
