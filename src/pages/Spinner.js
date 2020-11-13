import React, {useEffect, useState, useContext} from 'react';
import {StateContext} from '../context';
import {StairSpinner} from '../components/ui';

import '../styles/spinner.scss';
import '../styles/dark-theme.scss';

export const Spinner = (props) => {
    const {actions, history, state} = useContext(StateContext);
    const {user} = props;
    const {saveUser} = actions;
    const [buttonActive, setButtonActive] = useState(false);

    const {user: stateUser, darkTheme} = state;

    useEffect(() => {
        if (user === null) history.push('/signin');
        else if (user && !user.emailVerified) history.push('/verify');
        else if (stateUser) history.push('/home');
    }, [stateUser, user]);

    useEffect(() => {
        const timer = setTimeout(() => setButtonActive(true), 30000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (user && user.emailVerified) {
            const {uid, displayName, email, photoURL} = user;
            const data = {
                id: uid,
                displayName,
                email,
                photoURL
            };
            saveUser(data);
        }
    }, [user]);

    return (
        <div className={`loading-wrapper ${darkTheme ? 'dark-spinner' : 'light-spinner'}`}>
            <StairSpinner />
            <div className="loading-text">....zzZ....</div>
            <button
                className={buttonActive ? 'reload-button' : 'reload-button hidden'}
                onClick={() => window.location.reload()}
            >
        Reload
            </button>
        </div>
    );
};
