const C = 'elif-shell-v1';
self.addEventListener('install', ()=>self.skipWaiting());
self.addEventListener('activate', e=>e.waitUntil(self.clients.claim()));
// Sadece sayfanın kendisi: önce internetten (hep güncel), olmazsa son kaydedilen
self.addEventListener('fetch', e=>{
  if(e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).then(r=>{ const c = r.clone(); caches.open(C).then(x=>x.put('./index.html', c)); return r; }).catch(()=>caches.match('./index.html')));
});
