const cacheName = "static_v2";
const files = [
    "./",
    "./game.html",
    "./pictures/game_icons/apple-touch-icon-57x57.png",
    "./pictures/game_icons/apple-touch-icon-60x60.png",
    "./pictures/game_icons/apple-touch-icon-72x72.png",
    "./pictures/game_icons/apple-touch-icon-114x114.png",
    "./pictures/game_icons/apple-touch-icon-120x120.png",
    "./pictures/game_icons/apple-touch-icon-144x144.png",
    "./pictures/game_icons/apple-touch-icon-152x152.png",
    "./pictures/game_icons/favicon.ico",
    "./pictures/game_icons/favicon-16x16.png",
    "./pictures/game_icons/favicon-32x32.png",
    "./pictures/game_icons/favicon-96x96.png",
    "./pictures/game_icons/favicon-512x512.png",
    "./pictures/game_icons/favicon-128.png",
    "./pictures/game_icons/favicon-196x196.png",
    "./pictures/game_icons/mstile-70x70.png",
    "./pictures/game_icons/mstile-144x144.png",
    "./pictures/game_icons/mstile-150x150.png",
    "./pictures/game_icons/mstile-310x310.png",
    "./pictures/game_icons/mstile-310x150.png",
    "./pictures/photogalery/back.png",
    "./pictures/photogalery/Bia.jpg",
    "./pictures/photogalery/Bia2.jpg",
    "./pictures/photogalery/bia3.jpg",
    "./pictures/photogalery/riso.jpg",
    "./pictures/photogalery/riso2.jpg",
    "./pictures/photogalery/riso3.jpg",
    "./pictures/photogalery/risobia.jpg",
    "./pictures/photogalery/risobia2.jpg",
    "./pictures/photogalery/pexeso (1).jpg",
    "./pictures/photogalery/pexeso (2).jpg",
    "./pictures/photogalery/pexeso (3).jpg",
    "./pictures/photogalery/pexeso (4).jpg",
    "./pictures/photogalery/pexeso (5).jpg",
    "./pexeso.json",
    "./serviceWorker.js",
    "./manifest.json",
    "./css/base.css",
    "./css/form.css",
    "./css/fotogaleria.css",
    "./css/fullpage.css",
    "./css/game.css",
    "./css/graph.css",
    "./css/hover.css",
    "./css/map.css",
    "./css/nav.css",
    "./css/style.css",
    "./css/table.css",
    "https://raw.githack.com/SortableJS/Sortable/master/Sortable.js"



];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName)
    await cache.addAll(files)
})

self.addEventListener('activate',e=>{
    self.clients.claim()
})

self.addEventListener('fetch',async e=>{
    const req = e.request
    const url = new URL(req.url)

    if (url.origin === location.origin){
        e.respondWith(cacheFirst(req))
    }else{
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req){
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached || fetch(req)
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName)
    try{
        const fresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return fresh
    }catch (e) {
        const cached = await cache.match(req)
        return cached
    }
}