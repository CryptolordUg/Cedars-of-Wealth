const CACHE='cedars-v1';
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll([
  '/Cedars-of-Wealth/',
  '/Cedars-of-Wealth/login.html',
  '/Cedars-of-Wealth/register.html',
  '/Cedars-of-Wealth/forgot.html',
  '/Cedars-of-Wealth/password.html',
  '/Cedars-of-Wealth/dashboard/rubonai-trader.html'
 ])))
});
self.addEventListener('fetch',e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))
});
