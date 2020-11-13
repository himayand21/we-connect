import React, {Fragment, useEffect} from 'react';
import {getFormattedTime, getFormattedDate} from '../../util';
import {Icon} from '../ui';
import {MessageImage, ReplyMessage} from './message';

import '../../styles/chat-message.scss';

export const ChatMessage = (props) => {
    const {
        messageDetails,
        seenSentMessages,
        prevMessageDate,
        unreadMessages,
        user,
        addSelectedMessage,
        removeSelectedMessage,
        selectedMessages,
        setSelectedMessages,
        loadMoreFlag,
        handleForwardImageClick,
        currentReceiver
    } = props;

    const {id: userId} = user;

    const {
        from: messageFrom,
        message,
        reply,
        date: messageDate,
        attachment,
        link: linkArray
    } = messageDetails;

    const messageDateObject = new Date(messageDate);
    const unreadMessageCount = unreadMessages.length;
    const formattedMessageDate = getFormattedDate(messageDate);
    const seenSentMessagesCount = seenSentMessages.length - 1;
    let seenString = '';
    let dateString = '';
    let unreadString = '';
    if (
        seenSentMessages[seenSentMessagesCount] &&
        messageDetails.messageId === seenSentMessages[seenSentMessagesCount].messageId
    ) {
        seenString = 'Seen';
    }
    if (
        unreadMessages[0] &&
        messageDetails.messageId === unreadMessages[0].messageId
    ) {
        unreadString = 'New Messages';
    }

    if (prevMessageDate) {
        const formattedPreviousDate = getFormattedDate(prevMessageDate);
        if (formattedMessageDate !== formattedPreviousDate) {
            dateString = messageDateObject.toDateString();
        } else dateString = '';
    } else dateString = messageDateObject.toDateString();

    const wrapperElement = document.getElementById('chat-wrapper');

    useEffect(() => {
        if (seenString || unreadString || dateString) {
            if (!(loadMoreFlag && ((wrapperElement.scrollHeight - wrapperElement.scrollTop) > (2 * wrapperElement.offsetHeight)))) {
                wrapperElement.scrollTop = wrapperElement.scrollHeight;
            }
        }
    }, [seenString, unreadString, dateString]);

    useEffect(() => {
        if (!(loadMoreFlag && ((wrapperElement.scrollHeight - wrapperElement.scrollTop) > (2 * wrapperElement.offsetHeight)))) {
            setTimeout(() => {
                wrapperElement.scrollTop = wrapperElement.scrollHeight;
            }, 10);
        }
    }, []);

    const isSelected = selectedMessages.some((selectedMessage) => selectedMessage.messageId === messageDetails.messageId);
    const opacity = isSelected ? 0.7 : 1;

    const handleClick = () => {
        if (isSelected) removeSelectedMessage(messageDetails);
        else addSelectedMessage(messageDetails);
    };

    const isAttachment = attachment && attachment.attachmentType;
    const cursor = isAttachment ? 'default' : 'pointer';

    const openLink = (event, url) => {
        window.open(url, '_tab');
        event.stopPropagation();
    };

    const renderMessage = () => {
        const newLineArray = message.split('\n');
        return newLineArray.map((line) => {
            const messageArray = line.split(' ');
            return (
                <Fragment key={line}>
                    {messageArray.map((word) => {
                        if (linkArray.includes(word)) {
                            return (
                                <span
                                    className="message-link"
                                    onClick={(event) => openLink(event, word)}
                                >
                                    {word}
                                </span>
                            );
                        }
                        return `${word} `;
                    }
                    )}
                    <br />
                </Fragment>
            );
        }
        );
    };

    return (
        <Fragment>
            {dateString ? (
                <div className="chat-message-date">
                    {dateString}
                </div>
            ) : null}
            {unreadString ? (
                <div className="chat-message-unread">
                    <span>{unreadString}</span>
                </div>
            ) : null}
            <div className={`${isAttachment ? 'chat-message-image' : ''} ${messageFrom === userId ? 'message-from-wrapper' : 'message-to-wrapper'}`}>
                <div
                    className="chat-message"
                    id={messageDetails.messageId}
                    style={{opacity, cursor}}
                    onClick={isAttachment ? null : handleClick}
                >
                    {reply ?
                        <ReplyMessage
                            reply={reply}
                            user={user}
                            currentReceiver={currentReceiver}
                        /> : null}
                    <span className={`${isAttachment ? 'date-image-wrapper' : 'date-message-wrapper'}`}>
                        {isAttachment ?
                            <MessageImage
                                attachment={attachment}
                                handleClick={handleClick}
                                setSelectedMessages={setSelectedMessages}
                                handleForwardImageClick={handleForwardImageClick}
                            /> : linkArray ? renderMessage()
                                : message
                        }
                        <span className="message-date">
                            {getFormattedTime(messageDateObject)}
                        </span>
                    </span>
                </div>
                {isSelected ? <div className="tick-wrapper"><Icon name={'circle'} /></div> : null}
            </div>
            {seenString && !unreadMessageCount ? (
                <div className="chat-message-seen">
                    {seenString}
                </div>
            ) : null}
        </Fragment>
    );
};