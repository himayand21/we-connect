import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Route} from 'react-router-dom';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import {StateContext} from './context';
import {SignIn, Spinner, Verify, Home} from './pages';
import {firebaseConfig} from './constants';
// import {asyncComponent} from './util';

const firebaseApp = firebase.initializeApp(firebaseConfig, 'authentication');
const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider(),
    githubProvider: new firebase.auth.GithubAuthProvider()
};

// const AsyncHome = asyncComponent((() => import('./pages/Home')));

const Main = (props) => {
    // const {onLine} = navigator;
    const {signOut} = props;
    const {actions, history} = useContext(StateContext);
    const {setTheme} = actions;
    const [currentUser, setCurrentUser] = useState();
    const [formError, setFormError] = useState();
    useEffect(() => {
        const darkTheme = localStorage.getItem('darkTheme');
        setTheme(darkTheme);
        firebaseAppAuth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            history.push('/loading');
            setFormError('');
        });
    }, []);

    // useMemo(() => {
    //     // eslint-disable-next-line no-console
    //     console.log(onLine);
    // }, [onLine]);

    return (
        <Fragment>
            <Route exact path="/" render={() => <Spinner user={currentUser} />} />
            <Route path="/loading" render={() => <Spinner user={currentUser} />} />
            <Route path="/home" render={() => <Home signOut={signOut}/>} />
            <Route path="/signin" render={() =>
                (<SignIn
                    {...props}
                    formError={formError}
                    setFormError={setFormError}
                />)} />
            <Route path="/verify" render={() => <Verify {...props} />} />
        </Fragment>
    );
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
})(Main);
