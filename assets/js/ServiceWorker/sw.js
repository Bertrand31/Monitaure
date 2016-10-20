((global) => {
    importScripts('/sw-toolbox.js');

    // global.toolbox.options.debug = true;
    global.toolbox.router.default = global.toolbox.fastest;

    const filesToCache = [
        '/app',
        '/app.js',
        '/images/logo.svg',
    ];

    // APP GETs
    global.toolbox.precache(filesToCache);
    global.toolbox.router.get('/images/*', global.toolbox.cacheFirst, {
        cache: {
            name: 'asset-cache-v1.9',
            maxEntries: 30,
        },
    });
    global.toolbox.router.get('/User/getdata/', global.toolbox.fastest, {
        cache: {
            name: 'data-cache-v1.9',
            maxEntries: 1,
        },
    });
    global.toolbox.router.get('/User/getchecks/', global.toolbox.networkOnly);
    global.toolbox.router.get('/Auth/*', global.toolbox.networkOnly);
    // END APP GETs


    // APP POSTs
    global.toolbox.router.post('/Check/*', global.toolbox.networkOnly);
    global.toolbox.router.post('/User/*', global.toolbox.networkOnly);
    global.toolbox.router.post('/Auth/*', global.toolbox.networkOnly);
    // END APP POSTs


    // VENDOR GET
    global.toolbox.router.get('/avatar/*', global.toolbox.fastest, {
        origin: /gravatar\.com/,
        cache: {
            name: 'static-vendor-cache-v1.9',
            maxEntries: 1,
        },
    });
    global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        origin: /fonts\.gstatic\.com/,
        cache: {
            name: 'static-vendor-cache-v1.9',
            maxEntries: 10,
        },
    });
    global.toolbox.router.get('/css', global.toolbox.fastest, {
        origin: /fonts\.googleapis\.com/,
        cache: {
            name: 'dynamic-vendor-cache-v1.9',
            maxEntries: 5,
        },
    });
    // END VENDOR GET

    // GCM PUSH
    global.addEventListener('push', (event) => {
        const title = 'Monitaure notification';
        const body = event.data.text();
        const icon = '/images/android-chrome-96x96.png';
        const tag = `monitaure-alert-${Date.now()}`;

        event.waitUntil(
            global.registration.showNotification(title, {
                body,
                icon,
                tag,
            })
        );
    });
    global.addEventListener('notificationclick', (event) => {
        // console.log('On notification click: ', event.notification.tag);
        // Android doesn’t close the notification when you click on it
        event.notification.close();

        // If the app is already open, we put focus on it
        // Otherwise, we open in
        event.waitUntil(clients.matchAll({
            type: 'window',
        }).then((clientList) => {
            clientList.forEach((client) => {
                if (client.url === '/app' && 'focus' in client) {
                    return client.focus();
                }
            });
            if (clients.openWindow) {
                return clients.openWindow('/app');
            }
        }));
    });
    // END GCM PUSH

    // Boilerplate to ensure our service worker takes control of the page ASAP
    global.addEventListener('install',
        event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate',
        event => event.waitUntil(global.clients.claim()));
})(self);
