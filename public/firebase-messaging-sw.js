importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '1021693966695'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const {data} = payload;
    const {
        message,
        title
    } = data;
    const notificationOptions = {
        body: message,
		actions: [{
			action: 'dismiss',
			title: 'Dismiss'
		}],
		icon: './dove.png',
		requireInteraction: true,
		renotify: true,
		tag: 'we-connect-notify'
    };
	self.addEventListener('notificationclick', function(event) {
		if (event.action === 'dismiss') {
			event.notification.close();
		}
	}, false);
    const promiseChain = clients
        .matchAll({
            type: 'window',
            includeUncontrolled: true
        })
        .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification(title, notificationOptions);
        });
    return promiseChain;
});