// CEDARS FIX - UNIFY ALL COMMANDS - USD ONLY - NO SYSTEM CHANGE
if(!localStorage.getItem('cedars_ref')){localStorage.setItem('cedars_ref','CRD-'+Math.random().toString(36).substr(2,6).toUpperCase());}
if(!localStorage.getItem('cedars_usd_bal')){localStorage.setItem('cedars_usd_bal','0');}
if(!localStorage.getItem('cedars_tx')){localStorage.setItem('cedars_tx','[]');}
// REGISTER command fix
window.CedarsRegister=function(name,email,wallet){
 localStorage.setItem('cedars_investor_name',name);
 localStorage.setItem('cedars_investor_email',email);
 if(wallet) localStorage.setItem('cedars_wallet',wallet);
 localStorage.setItem('cedars_logged_in','true');
 return true;
};
// SIGN IN / SIGN OUT fix
window.CedarsSignIn=function(email){
 localStorage.setItem('cedars_investor_email',email);
 localStorage.setItem('cedars_logged_in','true');
 location.href='investor-dashboard.html';
};
window.CedarsSignOut=function(){
 localStorage.setItem('cedars_logged_in','false');
 location.href='index.html';
};
// BALANCE command fix - reads USD only
window.CedarsBalance=function(){
 return parseFloat(localStorage.getItem('cedars_usd_bal')||'0').toFixed(2);
};
// LIVE SUPPORT - loud alarm + read investor name - floating only
window.CedarsSupportAlarm=function(){
 let name=localStorage.getItem('cedars_investor_name')||localStorage.getItem('cedars_investor_email')||'Investor';
 let a=new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'); a.volume=1.0; a.play().catch(()=>{});
 if('speechSynthesis' in window){ let m=new SpeechSynthesisUtterance('Customer online '+name); m.volume=1; speechSynthesis.speak(m); }
};
