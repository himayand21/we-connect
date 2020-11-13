import React from 'react';

export const ReplyMessage = (props) => {
    const {
        reply,
        user,
        currentReceiver
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
    } = reply;

    const getName = () => {
        if (from === receiverId) return (receiverName || receiverEmail);
        if (from === userId) return 'You';
    };

    const name = getName();
    return (
        <div className="reply-box">
            <div className="reply-box-wrapper">
                <div className="reply-name">{name}</div>
                {attachment ? null : <div className="reply-details">{message}</div>}
            </div>
            {attachment ?
                <div className="reply-image">
                    <img src={attachment.attachmentLink} />
                </div> : null}
        </div>
    );
};