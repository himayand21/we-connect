import React, {useState, useEffect, useContext} from 'react';
import {getFormattedTime, getLastSeenRelativeDate} from '../../util';
import {StateContext} from '../../context';
import {LAST_SEEN} from '../../constants';
import {Icon} from '../ui';
import {ActionButtons} from './actionButtons';
import {ReplyModal} from './chatModal';

import '../../styles/current-receiver.scss';

export const CurrentReceiver = (props) => {
    const {ref, state} = useContext(StateContext);
    const {user} = state;
    const {
        setCurrentMessages,
        setCurrentReceiver,
        typing,
        currentReceiver,
        selectedMessages,
        setSelectedMessages,
        setLastSelectedMessage,
        lastSelectedMessage,
        updateUnreadCount,
        replyTo,
        replyMessage,
        setReplyMessage
    } = props;
    const {photoURL, displayName, email} = currentReceiver;
    const [lastSeen, setLastSeen] = useState(0);
    const [lastSeenString, setLastSeenString] = useState('');

    useEffect(() => {
        setReplyMessage({});
        ref.child(`${LAST_SEEN}/${currentReceiver.id}/lastSeen`).on('value', (snapshot) => {
            setLastSeen(snapshot.val());
        });
        return (() => ref.child(`${LAST_SEEN}/${currentReceiver.id}/lastSeen`).off());
    }, [currentReceiver]);

    useEffect(() => {
        const lastSeenDate = new Date(lastSeen);
        const lastSeenRelativeDate = getLastSeenRelativeDate(lastSeenDate);
        const lastSeenTime = getFormattedTime(lastSeenDate);

        const clock = Date.now();

        const clockDate = new Date(clock);
        const clockRelativeDate = getLastSeenRelativeDate(clockDate);
        const clockTime = getFormattedTime(clockDate);

        if (!lastSeen) setLastSeenString('');
        else if ((`${clockRelativeDate}${clockTime}` === `${lastSeenRelativeDate}${lastSeenTime}`) && (clock - lastSeen < 20000)) setLastSeenString('online');
        else setLastSeenString(`last seen ${lastSeenRelativeDate} at ${lastSeenTime}`);
    }, [lastSeen]);

    const resetCurrentUser = () => {
        setCurrentMessages([]);
        setCurrentReceiver({});
    };

    return (
        <div className="wc-current-contact">
            <div className="wc-back-button" onClick={resetCurrentUser}>
                <Icon name="angle-left-pro"/>
            </div>
            <div className="wc-current-contact-switch">
                <div className={selectedMessages.length ? 'message-options message-options-show' : 'message-options message-options-hide'}>
                    <ActionButtons
                        setSelectedMessages={setSelectedMessages}
                        selectedMessages={selectedMessages}
                        currentReceiver={currentReceiver}
                        user={user}
                        lastSelectedMessage={lastSelectedMessage}
                        setLastSelectedMessage={setLastSelectedMessage}
                        updateUnreadCount={updateUnreadCount}
                        replyTo={replyTo}
                    />
                </div>
                {replyMessage.uniqid ?
                    <div className="reply-message">
                        <ReplyModal
                            replyMessage={replyMessage}
                            user={user}
                            currentReceiver={currentReceiver}
                            setReplyMessage={setReplyMessage}
                        />
                    </div> : null}
                <div className="wc-contact wc-request-contact">
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
                            <div className="wc-contact-name">{displayName || email}</div>
                            <div className="wc-contact-info">
                                {typing ? 'typing...' : lastSeenString}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
