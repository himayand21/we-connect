import React, {Fragment, useContext, useState} from 'react';

import {Icon} from '../../ui';
import {ForwardModal} from '../chatModal';

import {
    MESSAGES,
    LATEST
} from '../../../constants';
import {StateContext} from '../../../context';

export const ActionButtons = (props) => {
    const {ref, state} = useContext(StateContext);
    const [modalFlag, setModalFlag] = useState(false);

    const {
        selectedMessages,
        setSelectedMessages,
        currentReceiver,
        user,
        lastSelectedMessage,
        setLastSelectedMessage,
        updateUnreadCount,
        replyTo
    } = props;

    const {id: userId} = user;
    const {id: currentReceiverId} = currentReceiver;

    const forwardMessages = () => setModalFlag(true);
    const reply = () => replyTo(selectedMessages[0]);

    const deleteMessages = () => {
        const {latest} = state;
        const latestMessage = latest.find((eachReceiver) =>
            selectedMessages.includes(eachReceiver.messageDetails)
        );

        selectedMessages.forEach((selectedMessage) => {
            ref
                .child(
                    `${MESSAGES}/${userId}/${currentReceiverId}/${
                        selectedMessage.messageId
                    }`
                )
                .remove();
        });

        ref
            .child(`${MESSAGES}/${userId}/${currentReceiverId}`)
            .limitToLast(1)
            .once('value', (snapshot) => {
                const latestTextObject = snapshot.val();
                if (latestTextObject) {
                    const latestText = Object.values(latestTextObject)[0];
                    if (latestMessage !== -1) {
                        ref
                            .child(`${LATEST}/${userId}/${currentReceiverId}`)
                            .update({...latestText});
                    }
                } else {
                    ref.child(`${LATEST}/${userId}/${currentReceiverId}`).update({
                        ...latestMessage,
                        message: 'No messages',
                        to: userId,
                        from: currentReceiverId,
                        date: 0
                    });
                }
            });
        setSelectedMessages([]);
    };

    const wrapperElement = document.getElementById('chat-wrapper');

    const moveUp = () => {
        const index = selectedMessages.findIndex((message) => message.messageId === lastSelectedMessage);
        let lastMessageId;
        if (index > 0) {
            lastMessageId = selectedMessages[index - 1].messageId;
        } else {
            lastMessageId = selectedMessages[0].messageId;
        }
        const element = document.getElementById(lastMessageId);
        const offsetTop = element.offsetParent.offsetTop;
        wrapperElement.scrollTop = offsetTop - 100;
        setLastSelectedMessage(lastMessageId);
    };

    const moveDown = () => {
        const index = selectedMessages.findIndex((message) => message.messageId === lastSelectedMessage);
        let lastMessageId;
        if (index < (selectedMessages.length - 1)) {
            lastMessageId = selectedMessages[index + 1].messageId;
        } else {
            lastMessageId = selectedMessages[selectedMessages.length - 1].messageId;
        }
        const element = document.getElementById(lastMessageId);
        const offsetTop = element.offsetParent.offsetTop;
        wrapperElement.scrollTop = offsetTop - 100;
        setLastSelectedMessage(lastMessageId);
    };

    return (
        <div className="wc-icons-wrapper">
            {selectedMessages.length === 1 && (
                <div className="wc-icon wc-action-icon" onClick={reply}>
                    <Icon name="reply"/>
                </div>
            )}
            {selectedMessages.length > 1 && (
                <Fragment>
                    <div className="wc-icon wc-action-icon" onClick={moveUp}>
                        <Icon name="chevron-up"/>
                    </div>
                    <div className="wc-icon wc-action-icon" onClick={moveDown}>
                        <Icon name="chevron-down"/>
                    </div>
                </Fragment>
            )}
            <div className="wc-icon wc-action-icon" onClick={forwardMessages}>
                <Icon name="share-send"/>
            </div>
            <div className="wc-icon wc-action-icon" onClick={deleteMessages}>
                <Icon name="trash-pro"/>
            </div>
            {selectedMessages.length === 1 &&
      selectedMessages[0].attachment &&
      selectedMessages[0].attachment.attachmentType === 'camera' ? (
                    <div className="wc-icon wc-action-icon" onClick={() => setSelectedMessages([])}>
                        <a
                            href={selectedMessages[0].attachment.attachmentLink}
                            download="image"
                            rel="noopener noreferrer"
                            target="_tab"
                        >
                            <Icon name="link-pro"/>
                        </a>
                    </div>
                ) : null}
            <span className="wc-close-icon" onClick={() => setSelectedMessages([])}>
                <Icon name={'times-close-light'}/>
            </span>
            <ForwardModal
                selectedMessages={selectedMessages}
                closeModal={() => setModalFlag(false)}
                modalFlag={modalFlag}
                currentReceiver={currentReceiver}
                user={user}
                updateUnreadCount={updateUnreadCount}
                setSelectedMessages={setSelectedMessages}
            />
        </div>
    );
};
