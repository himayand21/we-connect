import React from 'react';
import {Icon} from '../../ui';

export const ReplyModal = (props) => {
    const {
        replyMessage,
        currentReceiver,
        user,
        setReplyMessage
    } = props;
    const {
        id: receiverId,
        displayName: receiverName,
        email: receiverEmail
    } = currentReceiver;
    const {
        id: userId
    } = user;
    const {
        message,
        from,
        attachment
    } = replyMessage;

    const getName = () => {
        if (from === receiverId) return (receiverName || receiverEmail);
        if (from === userId) return 'You';
    };

    const name = getName();
    return (
        <div className="reply-wrapper">
            {attachment && attachment.attachmentLink ?
                <div className="reply-image">
                    <img src={attachment.attachmentLink} />
                </div> : null}
            <div className="reply-details-wrapper">
                <div className="reply-header">Replying to</div>
                <div className="reply-name">{name}</div>
                {attachment && attachment.attachmentLink ? null : <div className="reply-details">{message}</div>}
            </div>
            <div className="reply-close-icon" onClick={() => setReplyMessage({})}>
                <Icon name={'times-close-light'}/>
            </div>
        </div>
    );
};