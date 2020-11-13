import React, {useContext, useEffect, useState} from 'react';
import {StateContext} from '../context';
import {Footer, CoverImage, SmallSpinner, Modal, Icon} from '../components/ui';

import '../styles/signin.scss';

export const Verify = (props) => {
    const [emailSent, setEmailSent] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const [imageVisible, setImageVisible] = useState(window.innerWidth > 1000);

    const {history} = useContext(StateContext);
    const {signOut, user} = props;
    const verifyUser = () => {
        setButtonClicked(true);
        user.sendEmailVerification().then(() => {
            setEmailSent(true);
            setButtonClicked(false);
        }).catch((error) => {
            if (error) {
                setErrorFlag(true);
                setButtonClicked(false);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            setImageVisible(window.innerWidth > 1000);
        });
    }, []);

    useEffect(() => {
        if (user === null || (user && user.emailVerified)) history.push('/loading');
    }, [user]);

    const tryAnother = () => {
        signOut().then(() => user.delete());
    };

    return (
        <div className="sign-form">
            <Modal modalFlag={errorFlag} closeModal={() => setErrorFlag(false)} title={'Oops !'}>
                <div className="alert-message">
                    <div>It seems like there has been too many requests from this account.</div>
                    <div>No worries. Just wait for some time and try again.</div>
                </div>
            </Modal>
            {
                imageVisible ? <CoverImage/> : null
            }
            <div className="form-wrapper verify-wrapper">
                <div className="form-header">
                    <div className="form-name">{emailSent ? 'Invite Sent !' : 'Almost there...'}</div>
                    <div className="form-subheader">
                        {emailSent ?
                            <div>
                    Click on the link sent to your email to accept our invitation.
                                <br/>
                    Once you are done, click{' '}
                                <a href="/loading">
                                    <span className="created-by">
                                        here
                                    </span>
                                </a> and we will sign you in.
                                <br/>
                                <br/>
                                {'Didn\'t receive the invite? We will send you again. All you need to do is ask.'}
                            </div> :
                            <div>
                                {'We need to know it\'s really YOU.'}
                                <br/>
                                Click on the{' '}
                                <span className="created-by">
                                    Send Invite
                                </span>
                                {' '}button below and we will send you an invitation link.
                            </div>}
                        <br />
                        <br />
                    If you are not sure about this email address -
                        <br />
                        <div className="form-email-address">
                            {user ? user.email : ''}
                        </div>
                    Click on <span className="created-by">Try Different Email</span> button.
                    </div>
                    <div className="email-buttons-wrapper">
                        <button className="form-button form-signup try-another" onClick={tryAnother}>
                            <div className="signup-right-arrow">
                                <Icon name="angle-double-left"/>
                            </div>
                            <span>Try Different Email</span>
                        </button>
                        {buttonClicked ?
                            <div className="form-button form-spinner">
                                <SmallSpinner size={5} color={'blue'}/>
                            </div> :
                            <button className="form-button form-signin" onClick={verifyUser}>
                                <span>{emailSent ? 'Resend Invite' : 'Send Invite'}</span>
                            </button>}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};
