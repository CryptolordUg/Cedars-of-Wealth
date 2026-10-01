// FINAL FIX 360° — USD ONLY — NO SYSTEM CHANGE — COMMANDS 100%
if(!localStorage.getItem('cedars_ref')){localStorage.setItem('cedars_ref','CRD-'+Math.random().toString(36).substr(2,6).toUpperCase());}
if(!localStorage.getItem('cedars_usd_bal')) localStorage.setItem('cedars_usd_bal','0');
if(!localStorage.getItem('cedars_tx')) localStorage.setItem('cedars_tx','[]');
window.CedarsRegister=function(n,e,w){localStorage.setItem('cedars_investor_name',n);localStorage.setItem('cedars_investor_email',e);if(w) localStorage.setItem('cedars_wallet',w);localStorage.setItem('cedars_logged_in','true');return true;};
window.CedarsSignIn=function(e){localStorage.setItem('cedars_investor_email',e);localStorage.setItem('cedars_logged_in','true');location.href='investor-dashboard.html';};
window.CedarsSignOut=function(){localStorage.setItem('cedars_logged_in','false');location.href='index.html';};
window.CedarsBalance=function(){return parseFloat(localStorage.getItem('cedars_usd_bal')||'0').toFixed(2);};
window.CedarsSupportAlarm=function(){let name=localStorage.getItem('cedars_investor_name')||localStorage.getItem('cedars_investor_email')||'Investor';let a=new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');a.volume=1;a.play().catch(()=>{});if('speechSynthesis' in window){speechSynthesis.speak(new SpeechSynthesisUtterance('Customer online '+name+' dashboard'));}};
