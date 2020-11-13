import React, {useState} from 'react';
import {ReadOnly} from '../profileDetails/ReadOnly';
import {Modal, Icon} from '../../ui';

export const OtherUser = (props) => {
    const [modalFlag, setModalFlag] = useState(false);

    const showModal = () => setModalFlag(true);
    const hideModal = () => setModalFlag(false);

    const {
        eachUser,
        mutualFriendsString,
        sendRequest,
        receivers
    } = props;
    const {
        photoURL,
        displayName,
        email,
        id
    } = eachUser;

    return (
        <div className="wc-request-contact wc-contact">
            <div className="wc-contact-wrapper">
                <div className="contact-image wc-image">
                    {photoURL ? (
                        <img
                            src={photoURL}
                            alt={''}
                            className="wc-thumbnail"
                        />
                    ) : null}
                </div>
                <div className="wc-contact-details">
                    <div className="wc-contact-name">
                        {displayName || email}
                    </div>
                    <div className="wc-contact-info">{mutualFriendsString}</div>
                </div>
                <div>
                    {receivers.includes(id) ? (
                        <button
                            className="wc-button wc-negate"
                            onClick={showModal}
                        >
                            <Icon name={'info'} size={5}/>
                        </button>
                    ) : (
                        <button
                            className="wc-button"
                            onClick={() => sendRequest(eachUser)}
                        >
                            <Icon name="plus-pro"/>
                        </button>
                    )}
                </div>
                <Modal
                    title={displayName || email}
                    modalFlag={modalFlag}
                    closeModal={hideModal}
                >
                    <ReadOnly user={eachUser}/>
                </Modal>
            </div>
        </div>
    );
};