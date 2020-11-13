import React, {createContext, useReducer} from 'react';
import {withRouter} from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

import {databaseConfig, storageConfig, firebaseConfig, publicVapidKey} from '../constants';
import {rootReducer} from './reducer';
import {useActions} from './actions';

const initialState = {
    spinnerFlag: false,
    modalFlag: false,
    online: true,
    latest: [],
    darkTheme: false,
    userDetails: {}
};
const StateContext = createContext();

const checkSupport = () => {
    if (firebase.messaging.isSupported()) {
        const messaging = firebaseApp.messaging();
        messaging.usePublicVapidKey(publicVapidKey);
        return messaging;
    }
};

const databaseApp = firebase.initializeApp(databaseConfig, 'database');
const storageApp = firebase.initializeApp(storageConfig, 'storage');
const firebaseApp = firebase.initializeApp(firebaseConfig, 'messaging');

const messaging = checkSupport();

const StateProviderComponent = ({children, history}) => {
    const db = databaseApp.database();
    const ref = db.ref();

    const storage = storageApp.storage();
    const storageRef = storage.ref();
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const actions = useActions(state, dispatch, ref, history);
    return (
        <StateContext.Provider
            value={{
                state,
                actions,
                ref,
                history,
                storageRef,
                messaging
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
const StateProvider = withRouter(StateProviderComponent);
export {StateContext, StateProvider};
