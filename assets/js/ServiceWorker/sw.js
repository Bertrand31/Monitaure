((global) => {
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
            name: 'asset-cache-v1.6',
            maxEntries: 30,
        },
    });
    global.toolbox.router.get('/Check/getuserandchecks/', global.toolbox.networkOnly);
    global.toolbox.router.get('/isLoggedIn/', global.toolbox.networkOnly);
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
            name: 'static-vendor-cache-v1.6',
            maxEntries: 1,
        },
    });
    global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        origin: /fonts\.gstatic\.com/,
        cache: {
            name: 'static-vendor-cache-v1.6',
            maxEntries: 10,
        },
    });
    global.toolbox.router.get('/css', global.toolbox.fastest, {
        origin: /fonts\.googleapis\.com/,
        cache: {
            name: 'dynamic-vendor-cache-v1.6',
            maxEntries: 5,
        },
    });
    // END VENDOR GET

    // GCM PUSH
    global.addEventListener('push', (event) => {
        // console.log('Received a push message', event);
        // console.log(event.data.text());

        const title = 'Monitaure notification';
        const body = event.data.text();
        const icon = '/images/android-chrome-96x96.png';
        const tag = `monitaure-alert-${Date.now()}`;

        console.log(tag);

        event.waitUntil(
            global.registration.showNotification(title, {
                body,
                icon,
                tag,
            })
        );
    });
    global.addEventListener('notificationclick', (event) => {
        console.log('On notification click: ', event.notification.tag);
        // Android doesn’t close the notification when you click on it
        // See: http://crbug.com/463146
        event.notification.close();

        // This looks to see if the current is already open and
        // focuses if it is
        event.waitUntil(clients.matchAll({
            type: 'window',
        }).then((clientList) => {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
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
