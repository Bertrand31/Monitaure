import 'isomorphic-fetch';

(global => {
    importScripts('/sw-toolbox.js');

    global.toolbox.options.debug = true;
    global.toolbox.router.default = global.toolbox.fastest;

    const filesToCache = [
        '/',
        '/app.js',
        '/images/logo.svg',
    ];

    // LOCAL GET
    global.toolbox.precache(filesToCache);
    global.toolbox.router.get('/images/*', global.toolbox.cacheFirst, {
        cache: {
            name: 'asset-cache-v1',
            maxEntries: 20,
        },
    });
    global.toolbox.router.get('/Check/*', global.toolbox.networkFirst, {
        cache: {
            name: 'dynamic-checksdata-cache-v1',
            maxEntries: 10,
            maxAgeSeconds: 600,
        },
    });
    global.toolbox.router.get('/isLoggedIn/', global.toolbox.fastest, {
        cache: {
            name: 'auth-cache-v1',
            maxEntries: 1,
            maxAgeSeconds: 4 * 24 * 60 * 60,
        },
    });
    // END LOCAL GET


    // LOCAL POST
    global.toolbox.router.post('/Check/*', global.toolbox.networkOnly);
    global.toolbox.router.post([
        '/User/*',
        '/login/',
        '/logout/',
    ], global.toolbox.networkOnly);
    // END LOCAL POST


    // VENDOR GET
    global.toolbox.router.get('/avatar/*', global.toolbox.cacheFirst, {
        origin: /gravatar\.com/,
        cache: {
            name: 'static-vendor-cache-v1',
            maxEntries: 1,
        },
    });
    global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        origin: /fonts\.gstatic\.com/,
        cache: {
            name: 'static-vendor-cache-v1',
            maxEntries: 10,
        },
    });
    global.toolbox.router.get('/css', global.toolbox.fastest, {
        origin: /fonts\.googleapis\.com/,
        cache: {
            name: 'dynamic-vendor-cache-v1',
            maxEntries: 5,
        },
    });
    // END VENDOR GET


    // Boilerplate to ensure our service worker takes control of the page as soon
    // as possible.
    global.addEventListener('install',
        event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate',
        event => event.waitUntil(global.clients.claim()));
})(self);
