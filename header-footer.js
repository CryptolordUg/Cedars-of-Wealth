// CEDARS HEADER FOOTER LOCKED 100% — LOGO 100% BIGGER — ALL PAGES — NO SETTINGS CHANGE
(function(){
if(document.getElementById('cedars-locked-header')) return;
let css=`<style>
#cedars-locked-header{position:fixed;top:0;left:0;right:0;z-index:999999;background:rgba(11,16,32,0.98);backdrop-filter:blur(12px);border-bottom:2px solid #1e2d55;padding:10px 14px;display:flex;justify-content:space-between;align-items:center}
#cedars-logo{font-size:28px!important;font-weight:900!important;transform:scale(1);display:flex;align-items:center;gap:8px;color:#fff;letter-spacing:0.5px}
#cedars-logo span{font-size:30px}
#cedars-top-menu{display:flex;gap:6px;overflow-x:auto;white-space:nowrap;scrollbar-width:none}
#cedars-top-menu::-webkit-scrollbar{display:none}
#cedars-top-menu a{color:#8a9cc7;text-decoration:none;font-size:11px;font-weight:700;padding:7px 12px;border-radius:20px;border:1px solid #1e2d55;background:#162040;flex-shrink:0;transition:0.2s}
#cedars-top-menu a:hover{background:#fff;color:#000}
#cedars-top-menu a.active{background:#00e676;color:#000;border-color:#00e676}
#cedars-locked-footer{position:fixed;bottom:0;left:0;right:0;z-index:999999;background:rgba(11,16,32,0.99);border-top:2px solid #1e2d55;padding:8px 8px;display:flex;gap:6px;overflow-x:auto;white-space:nowrap;justify-content:center}
#cedars-locked-footer a{color:#8a9cc7;text-decoration:none;font-size:10px;font-weight:700;padding:6px 10px;border-radius:20px;border:1px solid #1e2d55;background:#162040;flex-shrink:0}
body{padding-top:58px!important;padding-bottom:56px!important}
</style>`;
document.head.insertAdjacentHTML('beforeend',css);
let logged=localStorage.getItem('cedars_logged_in')==='true';
let email=localStorage.getItem('cedars_investor_email')||'';
let signText=logged && email? 'Sign out ('+email.split('@')[0]+')' : 'Sign in / Sign out';
let signLink=logged? 'login.html?logout=1' : 'login.html';
let base=document.location.pathname.includes('/dashboard/')?'../':'';
let header=`<div id="cedars-locked-header"><div id="cedars-logo"><span>🌲</span> Cedars of Wealth</div><div id="cedars-top-menu">
<a href="${base}index.html">Home</a>
<a href="${base}index.html#about">About us</a>
<a href="${base}calendar.html">Calendar</a>
<a href="${base}register.html">Register</a>
<a href="${base}index.html#plans">Plans</a>
<a href="${base}deposit.html">Deposit</a>
<a href="${base}withdraw.html">Withdraw</a>
<a href="${base}referral.html">Referral</a>
<a href="${base}${signLink}" id="cedarsSignTop">${signText}</a>
</div></div>`;
let footer=`<div id="cedars-locked-footer">
<a href="${base}index.html">Home</a><a href="${base}index.html#about">About us</a><a href="${base}calendar.html">Calendar</a><a href="${base}register.html">Register</a><a href="${base}index.html#plans">Plans</a><a href="${base}deposit.html">Deposit</a><a href="${base}withdraw.html">Withdraw</a><a href="${base}referral.html">Referral</a><a href="${base}login.html">Sign in/out</a><a href="${base}support.html" style="background:#25D366;color:#fff;border-color:#25D366">💬 Support</a>
</div>`;
document.body.insertAdjacentHTML('afterbegin',header);
document.body.insertAdjacentHTML('beforeend',footer);
// Sign out handler
let sBtn=document.getElementById('cedarsSignTop');
if(logged){ sBtn.addEventListener('click',function(e){ e.preventDefault(); localStorage.setItem('cedars_logged_in','false'); location.href=base+'login.html'; }); }
// Remove old duplicate headers if any
document.querySelectorAll('.top,.cedars-top-nav,.nav,.cedars-bottom-nav,.footer').forEach(el=>{ if(el.id!=='cedars-locked-header' && el.id!=='cedars-locked-footer'){ /* keep content but hide duplicate nav */ if(el.classList.contains('top')||el.classList.contains('cedars-top-nav')) el.style.display='none'; }});
console.log('✅ Header Footer Locked — Logo 100% bigger — All pages');
})();
