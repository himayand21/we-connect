import React, {useState, Fragment} from 'react';
import {Modal} from '../../ui';
import {Edit} from './EditProfile';

import '../../../styles/requests.scss';

export const ProfileDetails = (props) => {
    const {user} = props;
    const [modalFlag, setModalFlag] = useState(false);

    const showModal = () => setModalFlag(true);
    const hideModal = () => setModalFlag(false);

    if (!user) return null;

    const {photoURL, displayName, email} = user;
    return (
        <Fragment>
            <div className="wc-request-contact wc-contact profile-details">
                <div className="wc-contact-wrapper">
                    <div className="contact-image wc-image">
                        {photoURL ? (
                            <img src={photoURL} alt={''} className="wc-thumbnail" />
                        ) : null}
                    </div>
                    <div className="wc-contact-details">
                        <div className="wc-contact-name">{displayName || email}</div>
                        <div className="wc-contact-info">
                            <span className="wc-label" onClick={() => showModal()}>
                                Edit Profile
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title={'Edit Profile'}
                closeModal={hideModal}
                modalFlag={modalFlag}
            >
                <Edit
                    user={user}
                    closeModal={hideModal}
                />
            </Modal>
        </Fragment>
    );
};