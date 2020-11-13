import React, {useState, useEffect} from 'react';
import {getFormattedTime} from '../../util';
import {SmallSpinner, Icon} from '../ui';

import '../../styles/contact-details.scss';

export const ContactDetails = (props) => {
    const [ready, setReady] = useState(false);

    const {
        buddy,
        setCurrentReceiver,
        currentReceiver,
        typing,
        unreadCount
    } = props;
    const {receiver, messageDetails} = buddy;
    const {photoURL, displayName, email, id: receiverId} = receiver;

    const receiverTyping = typing[receiverId];
    const receiverUnreadCount = unreadCount[receiverId];

    useEffect(() => {
        const buffer = new Image();
        buffer.onload = () => setReady(true);
        buffer.src = photoURL;
    }, []);

    const renderAttachmentType = (attachment) => {
        if (attachment) {
            switch (attachment.attachmentType) {
                case 'camera':
                    return <span className="attachment-message"><Icon name="image-camera"/>{'Photo'}</span>;
                case 'location':
                    return <span className="attachment-message"><Icon name="map-marker" className ="attachment-info-other"/>{'Location'}</span>;
                case 'file':
                    return <span className="attachment-message"><Icon name="doc-file" className ="attachment-info-other"/>{'File'}</span>;
                default: return null;
            }
        }
    };
    return (
        <div
            className={
                currentReceiver.id === receiverId
                    ? 'wc-contact wc-selected-contact'
                    : 'wc-contact'
            }
            onClick={() => setCurrentReceiver(receiver)}
        >
            <div className="wc-contact-wrapper">
                <div className="contact-image wc-image">
                    {ready ? (
                        <img src={photoURL} alt={''} className="wc-thumbnail" />
                    ) : photoURL ?
                        <div className="image-spinner">
                            <SmallSpinner size={6} color="blue" />
                        </div>
                        : null}
                </div>
                <div className="wc-contact-details">
                    <div className="wc-contact-name ">{displayName || email}</div>
                    {receiverTyping ? (
                        <div className="wc-contact-typing wc-contact-info">typing...</div>
                    ) : (
                        <div className="wc-contact-info">
                            {messageDetails.to === receiverId ? (
                                <span className="message-prefix">You: </span>
                            ) : null}
                            {messageDetails.message === 'Attachment' ?
                                renderAttachmentType(messageDetails.attachment) :
                                messageDetails.message}
                        </div>
                    )}
                </div>
                <div className="buddy-date-wrapper">
                    <div className="buddy-date">
                        {getFormattedTime(new Date(messageDetails.date))}
                    </div>
                    <div className={receiverUnreadCount ? 'buddy-unread' : 'hidden'}>
                        <div>{receiverUnreadCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};