import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then(function(registration) {
            console.log('Service worker registered on:', registration.scope);
        })
        .catch(function(err) {
            console.log('Service worker registration failed, error:', err);
        });
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
