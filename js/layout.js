async function loadPart(id,url){try{const r=await fetch(url);if(r.ok)document.getElementById(id).innerHTML=await r.text();}catch(e){}}
loadPart('site-header','/Cedars-of-Wealth/components/header.html');
loadPart('site-footer','/Cedars-of-Wealth/components/footer.html');
a{color:#fff !important}
