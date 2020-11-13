import React, {useContext, useEffect} from 'react';
import {StateContext} from '../../context';

export const Welcome = (props) => {
    const {state} = useContext(StateContext);
    const {active, latest} = state;
    const {currentReceiver, setCurrentReceiver} = props;

    useEffect(() => {
        if (latest.length) {
            if (window.innerWidth > 1100) {
                setCurrentReceiver(latest[0].receiver);
            }
        }
    }, [latest.length]);

    return (
        <div
            className={
                active === 'Profile'
                    ? 'chat-screen chat-screen-profile-hidden'
                    : !currentReceiver.id
                        ? 'chat-screen chat-screen-hidden'
                        : 'chat-screen'
            }
        />
    );
};
