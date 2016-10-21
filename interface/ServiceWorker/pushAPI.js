import { POSTer } from '../serverIO/ajaxMethods';
import { setGCMCredentials } from '../serverIO/dataHandling';

const sendSubscriptionToServer = (subscription) => {
    setGCMCredentials(POSTer, { subscription: JSON.stringify(subscription) }, (err) => {
        // console.warn(err);
    });
};

export const subscribe = () => {
    // First, we check whether the browser supports the notifications
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        return;
    }

    // Check the current Notification permission.
    // If its denied, it's a permanent block until the
    // user changes the permission
    // if (Notification.permission === 'denied') {
    //    return;
    // }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        return;
    }

    navigator.serviceWorker.ready
        .then((serviceWorkerRegistration) => {
            serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
                .then(subscription => sendSubscriptionToServer(subscription))
                .catch((err) => {
                    if (Notification.permission === 'denied') {
                        console.log('Permission for Notifications was denied');
                    } else {
                        console.log('Unable to subscribe to push.', err);
                    }
                })
            ;
        })
    ;
};
