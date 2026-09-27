document.getElementById('site-header').innerHTML = `
<header style="background:#0a0f1e;border-bottom:1px solid #1e2a4a;padding:18px 0;position:sticky;top:0;z-index:100">
<div style="max-width:1280px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center">
<a href="/Cedars-of-Wealth/" style="color:#fff;text-decoration:none;font-weight:800;font-size:22px;display:flex;align-items:center;gap:10px"><span style="width:38px;height:38px;background:linear-gradient(135deg,#2dd4a7,#4f7cff);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-size:22px">🌲</span> CEDARS OF WEALTH <span style="font-size:12px;font-weight:400;color:#8a9bb5;margin-left:6px">NZ</span></a>
<nav style="display:flex;gap:20px;align-items:center">
<a href="/Cedars-of-Wealth/" style="color:#a0b0cc;text-decoration:none;font-size:18px">Home</a>
<a href="/Cedars-of-Wealth/about.html" style="color:#a0b0cc;text-decoration:none;font-size:18px">About</a>
<a href="/Cedars-of-Wealth/register.html" style="color:#fff;text-decoration:none;font-size:18px;background:linear-gradient(135deg,#4f7cff,#2dd4a7);padding:12px 24px;border-radius:8px">Start</a>
</nav>
</div>
</header>`;

document.getElementById('site-footer').innerHTML = `
<footer style="background:#080c18;border-top:1px solid #1e2a4a;padding:40px 20px;margin-top:60px;text-align:center;color:#8a9bb5;font-size:17px">
<div>© 2026 Cedars of Wealth | Headquarters: Auckland, New Zealand<br>Grow like a cedar.</div>
<div style="margin-top:12px">Earn 2% Daily</div>
<div style="margin-top:12px"><a href="https://t.me/+qXjnwt0SX0BkODQ8" target="_blank" style="color:#229ED9;text-decoration:none">Join us on Telegram</a></div>
</footer>`;

var tg = document.createElement('a');
tg.href = 'https://t.me/+qXjnwt0SX0BkODQ8';
tg.target = '_blank';
tg.innerHTML = '✈️';
tg.style.cssText = 'position:fixed;bottom:24px;right:24px;width:64px;height:64px;background:#229ED9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:30px;text-decoration:none;z-index:1000;box-shadow:0 4px 12px rgba(0,0,0,0.3)';
document.body.appendChild(tg);
