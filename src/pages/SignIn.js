import React, {useEffect, useState} from 'react';
import {Footer, CoverImage, SmallSpinner, Icon} from '../components/ui/';
import GoogleLogo from '../assets/google-logo.png';

import '../styles/signin.scss';

export const SignIn = (props) => {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [typeClicked, updateTypeClicked] = useState('');
    const [imageVisible, setImageVisible] = useState(window.innerWidth > 1000);

    const {
        error,
        signInWithGoogle,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithFacebook,
        signInWithGithub,
        setError,
        formError,
        setFormError
    } = props;

    useEffect(() => {
        window.addEventListener('resize', () => {
            setImageVisible(window.innerWidth > 1000);
        });
    }, []);
    useEffect(() => {
        updateTypeClicked('');
    }, [formError]);

    useEffect(() => {
        if (error) {
            updateTypeClicked('');
            setFormError(error);
            setError('');
        }
    }, [error]);

    const submitForm = () => {
        updateTypeClicked('signup');
        createUserWithEmailAndPassword(email, password);
    };
    const signIn = () => {
        updateTypeClicked('signin');
        signInWithEmailAndPassword(email, password);
    };
    const googleSignIn = () => {
        updateTypeClicked('google');
        signInWithGoogle();
    };
    const facebookSignIn = () => {
        updateTypeClicked('facebook');
        signInWithFacebook();
    };
    const githubSignIn = () => {
        updateTypeClicked('github');
        signInWithGithub();
    };

    return (
        <div className="sign-form">
            {
                imageVisible ? <CoverImage/> : null
            }
            <div className="form-wrapper">
                <div className="form-header">
                    <div className="form-name big-show">Log In</div>
                    <div className="form-name small-show">WeConnect</div>
                    <div className="form-subheader">
                        {' Don\'t have an account? You can sign up right here.'}
                        <br />
                        It would hardly take a minute.
                    </div>
                </div>
                <div className="form-container">
                    <label className="form-item form-label">EMAIL</label>
                    <input
                        className="form-item form-input"
                        value={email}
                        onChange={(event) => updateEmail(event.target.value)}
                    />
                    <label className="form-item form-label">PASSWORD</label>
                    <input
                        className="form-item form-input"
                        type="password"
                        value={password}
                        onChange={(event) => updatePassword(event.target.value)}
                    />
                    <div className="form-item form-warning">{formError}</div>
                    <div className="email-buttons-wrapper">
                        <button className="form-button form-signup" onClick={submitForm}>
                            {typeClicked === 'signup' ?
                                <span><SmallSpinner size={5} color={'white'} /></span> :
                                <span>Sign up</span>}
                            <div className="signup-right-arrow">
                                <Icon name="angle-double-right"/>
                            </div>
                        </button>
                        {typeClicked === 'signin' ?
                            <div className="form-spinner form-button">
                                <SmallSpinner size={4} color={'blue'}/>
                            </div> :
                            <button className="form-button form-signin" onClick={signIn}>
                                <Icon name="arrow-right"/>
                            </button>
                        }
                    </div>
                    <div className="or-connect-with">
                        <span>{'Or Connect With'}</span>
                    </div>
                    <div className="form-icons-wrapper">
                        <div className="form-icon-wrapper">
                            {typeClicked === 'google' ?
                                <div className="form-icon google-button">
                                    <SmallSpinner size={5} color={'multi'}/>
                                </div> :
                                <button
                                    className="form-icon google-button"
                                    onClick={googleSignIn}
                                >
                                    <img src={GoogleLogo} alt="google-logo"/>
                                </button>}
                            <div>Google</div>
                        </div>
                        <div className="form-icon-wrapper">
                            {typeClicked === 'facebook' ?
                                <div className="form-icon facebook-button">
                                    <SmallSpinner size={5} color={'white'}/>
                                </div> :
                                <button
                                    className="form-icon facebook-button"
                                    onClick={facebookSignIn}
                                >
                                    <Icon name="facebook-f" size={'0.62em'}/>
                                </button>}
                            <div>Facebook</div>
                        </div>
                        <div className="form-icon-wrapper">
                            {typeClicked === 'github' ?
                                <div className="form-icon github-button">
                                    <SmallSpinner size={5} color={'white'}/>
                                </div> :
                                <button
                                    className="form-icon github-button"
                                    onClick={githubSignIn}
                                >
                                    <Icon name="github-alt"/>
                                </button>}
                            <div>Github</div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
