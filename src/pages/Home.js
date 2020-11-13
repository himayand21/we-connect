import React, {useEffect, useContext, useState} from 'react';

import {NavBar, Widgets, Footer} from '../components/home';
import {StateContext} from '../context';
import {LATEST, USER_DATA, TOKEN} from '../constants';

import '../styles/light-theme.scss';

export const Home = (props) => {
    const [receiverObjects, setReceiverObjects] = useState();
    const [currentReceiver, setCurrentReceiver] = useState({});
    const [token, setToken] = useState('');
    const {ref, state, history, actions, messaging} = useContext(StateContext);
    const {
        updateChangedReceiver,
        updateReceivers,
        setUserDetails
    } = actions;
    const {user, darkTheme} = state;

    const checkIfUserPresent = async () => {
        const {user: stateUser} = state;
        if (!stateUser) history.push('/loading');
    };

    useEffect(() => {
        if (messaging) {
            messaging.requestPermission()
                .then(async function() {
                    const token = await messaging.getToken();
                    setToken(token);
                })
                .catch(function(err) {
                    console.log('Unable to get permission to notify.', err);
                });
            // navigator.serviceWorker.addEventListener('message', (message) => console.log(message));
            messaging.onTokenRefresh(() => {
                messaging.getToken().then((refreshedToken) => {
                    setToken(refreshedToken);
                }).catch((err) => {
                    console.log('Unable to retrieve refreshed token ', err);
                });
            });
        }
        return (() => {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                // eslint-disable-next-line no-unused-vars
                for (const registration of registrations) {
                    registration.unregister();
                }
            }).catch(function(err) {
                console.log('Service Worker registration failed: ', err);
            });
        });
    }, []);

    useEffect(() => {
        if (receiverObjects) updateReceivers(receiverObjects);
    }, [receiverObjects]);

    useEffect(() => {
        if (user) {
            ref.child(TOKEN).update({[user.id]: token});
        }
    }, [user, token]);

    useEffect(() => {
        checkIfUserPresent();
        if (user) {
            ref.child(USER_DATA).on('child_changed', function(snapshot) {
                updateChangedReceiver(snapshot.val());
            });
            ref
                .child(USER_DATA)
                .child(user.id)
                .on('value', function(snapshot) {
                    setUserDetails(snapshot.val());
                });
            ref.child(`${LATEST}/${user.id}`).on('value', (snapshot) => {
                const receiverObjects = snapshot.val();
                setReceiverObjects(receiverObjects);
            });
        }
        return (() => {
            if (user) {
                ref.child(`${LATEST}/${user.id}`).off();
                ref.child(USER_DATA).off();
            }
        });
    }, []);

    if (!user) return null;

    return (
        <div className={`app-container ${darkTheme ? 'wc-dark' : 'wc-light'}`}>
            <NavBar
                {...props}
                currentReceiver={currentReceiver}
            />
            <Widgets
                currentReceiver={currentReceiver}
                setCurrentReceiver={setCurrentReceiver}
            />
            <Footer />
        </div>
    );
};