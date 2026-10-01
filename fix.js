// CEDARS FINAL FIX 360° — DASHBOARD 100% FUNCTIONAL — USD ONLY $ — NO SETTINGS CHANGE
(function(){
if(!localStorage.getItem('cedars_ref')) localStorage.setItem('cedars_ref','CRD-'+Math.random().toString(36).substr(2,6).toUpperCase());
if(!localStorage.getItem('cedars_usd_bal')) localStorage.setItem('cedars_usd_bal','0');
if(!localStorage.getItem('cedars_tx')) localStorage.setItem('cedars_tx','[]');
if(!localStorage.getItem('cedars_legs')) localStorage.setItem('cedars_legs',JSON.stringify({A:0,B:0}));
window.CedarsRegister=function(n,e,w){ if(!n||!e){alert('Name+Email required $ USD');return false;} localStorage.setItem('cedars_investor_name',n); localStorage.setItem('cedars_investor_email',e); if(w) localStorage.setItem('cedars_wallet',w); localStorage.setItem('cedars_logged_in','true'); return true; };
window.CedarsSignIn=function(e,p){ localStorage.setItem('cedars_investor_email',e); localStorage.setItem('cedars_logged_in','true'); location.href='investor-dashboard.html'; };
window.CedarsSignOut=function(){ localStorage.setItem('cedars_logged_in','false'); location.href='index.html'; };
window.CedarsBalance=function(){ let b=parseFloat(localStorage.getItem('cedars_usd_bal')||'0'); let el=document.getElementById('usdBal'); if(el) el.innerText='$'+b.toFixed(2)+' USD'; return b.toFixed(2); };
window.CedarsAddBalance=function(amt,type,hash){ let bal=parseFloat(localStorage.getItem('cedars_usd_bal')||'0')+parseFloat(amt); localStorage.setItem('cedars_usd_bal',bal.toString()); let tx=JSON.parse(localStorage.getItem('cedars_tx')||'[]'); tx.push({type:type||'Deposit',amt:parseFloat(amt),hash:hash||'TX-'+Date.now(),date:new Date().toLocaleString()}); localStorage.setItem('cedars_tx',JSON.stringify(tx)); CedarsBalance(); if(window.CedarsSupportAlarm) CedarsSupportAlarm(); return bal; };
window.CedarsSupportAlarm=function(){ let name=localStorage.getItem('cedars_investor_name')||localStorage.getItem('cedars_investor_email')||'Investor'; try{ let a=new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'); a.volume=1; a.play(); }catch(e){} if('speechSynthesis' in window){ speechSynthesis.cancel(); let u=new SpeechSynthesisUtterance('Customer online '+name+' dashboard'); u.volume=1; speechSynthesis.speak(u); } };
// Auto update balance every 2 sec
setInterval(()=>{ if(document.getElementById('usdBal')) CedarsBalance(); },2000);
console.log('✅ Fix.js 360° loaded — Balance:',CedarsBalance(),'$ USD — Ref:',localStorage.getItem('cedars_ref'));
})();
