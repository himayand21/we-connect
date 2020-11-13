import React, {useState} from 'react';
import {ReadOnly} from '../profileDetails/ReadOnly';
import {Modal, Icon} from '../../ui';

export const Request = (props) => {
    const {
        request,
        approveRequest,
        rejectRequest
    } = props;

    const {id, email, displayName, photoURL} = request;

    const [modalFlag, setModalFlag] = useState(false);
    const showModal = () => setModalFlag(true);
    const hideModal = () => setModalFlag(false);

    return (
        <div
            className="wc-request-contact wc-contact"
            key={id}
        >
            <div className="wc-contact-wrapper">
                <div className="contact-image wc-image">
                    {photoURL ? (
                        <img src={photoURL} alt={''} className="wc-thumbnail" />
                    ) : null}
                </div>
                <div className="wc-contact-details">
                    <div className="wc-contact-name">{displayName || email}</div>
                    <div className="wc-contact-info wc-label">
                        <span onClick={() => showModal()}>View Profile</span>
                    </div>
                </div>
                <button
                    className="wc-button"
                    onClick={() => approveRequest(id)}
                >
                    <Icon name="check" />
                </button>
                <button
                    className="wc-button wc-negate"
                    onClick={() => rejectRequest(id)}
                >
                    <Icon name="times-close-light" size={8}/>
                </button>
                <Modal
                    title={displayName || email}
                    modalFlag={modalFlag}
                    closeModal={hideModal}
                >
                    <ReadOnly user={request} />
                    <div className="wc-button-group">
                        <button
                            className="wc-button size-lg"
                            onClick={() => approveRequest(id)}
                        >
                            <Icon name="check" />
                        </button>
                        <button
                            className="wc-button size-lg wc-negate"
                            onClick={() => rejectRequest(id)}
                        >
                            <Icon name="times-close-light" size={10}/>
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};