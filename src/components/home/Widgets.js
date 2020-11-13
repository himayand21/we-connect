import React, {useContext, useEffect} from 'react';
import * as firebase from 'firebase/app';
import {StateContext} from '../../context';
import {Contacts, ChatRoom, Profile, Welcome} from '../widgets';

import {
    TYPING,
    LAST_SEEN
} from '../../constants';

export const Widgets = (props) => {
    const {ref, state} = useContext(StateContext);
    const {user, active} = state;
    const {currentReceiver, setCurrentReceiver} = props;

    const handleTyping = (typing) => {
        const {id} = currentReceiver;
        ref.child(`${TYPING}/${id}`).update({[user.id]: typing});
    };

    let lastAction = Date.now();
    const reset = () => (lastAction = Date.now());

    const check = () => {
        const now = Date.now();
        if (lastAction - now < 10000 && user && document.hasFocus()) {
            ref
                .child(LAST_SEEN)
                .child(user.id)
                .update({lastSeen: firebase.database.ServerValue.TIMESTAMP});
        }
    };

    const initListener = () => {
        document.body.addEventListener('mousemove', () => reset());
        document.body.addEventListener('keydown', () => reset());
        document.body.addEventListener('touchmove', () => reset());
    };

    const clearListeners = () => {
        document.body.removeEventListener('mousemove', () => reset());
        document.body.removeEventListener('keydown', () => reset());
        document.body.removeEventListener('touchmove', () => reset());
    };

    useEffect(() => {
        check();
        initListener();
        const timer = setInterval(() => {
            check();
        }, 1000);
        return (() => {
            clearInterval(timer);
            clearListeners();
        });
    }, []);

    return (
        <div className={currentReceiver.id ? 'chat-screen-wrapper no-footer' : 'chat-screen-wrapper'}>
            <Contacts
                active={active}
                currentReceiver={currentReceiver}
                setCurrentReceiver={setCurrentReceiver}
            />
            {currentReceiver.id ? (
                <ChatRoom
                    handleTyping={handleTyping}
                    currentReceiver={currentReceiver}
                    setCurrentReceiver={setCurrentReceiver}
                />
            ) : (
                <Welcome
                    currentReceiver={currentReceiver}
                    setCurrentReceiver={setCurrentReceiver}
                />
            )}
            <Profile />
        </div>
    );
};
