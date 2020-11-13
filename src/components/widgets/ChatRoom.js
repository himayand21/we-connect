import React, {
    useState,
    useContext,
    Fragment,
    useEffect
} from 'react';

import {StateContext} from '../../context';
import {MESSAGES, TYPING, UNREAD_COUNT} from '../../constants';

import {ChatSend, CurrentReceiver, ChatMessage} from '../chatRoom';
import {Icon} from '../ui';
import {ForwardModal} from '../chatRoom/chatModal';

import '../../styles/chat-room.scss';

export const ChatRoom = (props) => {
    const {state, ref} = useContext(StateContext);
    const {user, active} = state;
    const {currentReceiver, setCurrentReceiver, handleTyping} = props;

    const [currentMessages, setCurrentMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [unseenReceivedMessages, setUnseenReceivedMessages] = useState([]);
    const [seenSentMessages, setSeenSentMessages] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [loadMoreFlag, setLoadMoreFlag] = useState(0);
    const [typing, setTyping] = useState(false);
    const [lastSelectedMessage, setLastSelectedMessage] = useState({});
    const [show, setShow] = useState(false);
    const [forwardImageModal, setForwardImageModal] = useState({});
    const [replyMessage, setReplyMessage] = useState({});

    const wrapperElement = document.getElementById('chat-wrapper');

    useEffect(() => {
        if (currentReceiver.id) handleTyping(false);
    }, [currentMessages]);

    useEffect(() => {
        ref.child(`${UNREAD_COUNT}/${user.id}`).update({[currentReceiver.id]: 0});
        setSelectedMessages([]);
        setCurrentMessages([]);
        return () => setLoadMoreFlag(0);
    }, [currentReceiver]);

    useEffect(() => {
        if (document.hasFocus()) {
            unseenReceivedMessages.forEach((unseenReceivedMessage) => {
                ref
                    .child(
                        `${MESSAGES}/${currentReceiver.id}/${user.id}/${
                            unseenReceivedMessage.messageId
                        }`
                    )
                    .update({seen: true});
            });
        }
    }, [unseenReceivedMessages]);

    useEffect(() => {
        window.addEventListener('beforeunload', () =>  handleTyping(false));
        return (() => window.removeEventListener('beforeunload', () => {}));
    }, []);

    useEffect(() => {
        if (user && user.id && currentReceiver.id) {
            ref.child(`${TYPING}/${currentReceiver.id}`).update({[user.id]: false});
            ref
                .child(`${MESSAGES}/${user.id}/${currentReceiver.id}`)
                .orderByChild('date')
                .limitToLast((loadMoreFlag + 1) * 30)
                .on('value', function(snapshot) {
                    let currentMessageLocal = [];
                    let unreadMessagesLocal = [];
                    let seenSentMessagesLocal = [];

                    snapshot.forEach((element) => {
                        const messageDetails = element.val();
                        const messageKey = element.key;
                        currentMessageLocal = [
                            ...currentMessageLocal,
                            {
                                ...messageDetails,
                                messageId: messageKey
                            }
                        ];
                        if (!messageDetails.seen && messageDetails.to === user.id) {
                            unreadMessagesLocal = [
                                ...unreadMessagesLocal,
                                {...messageDetails, messageId: messageKey}
                            ];
                        }
                        if (messageDetails.seen && messageDetails.from === user.id) {
                            seenSentMessagesLocal = [
                                ...seenSentMessagesLocal,
                                {...messageDetails, messageId: messageKey}
                            ];
                        }
                    });
                    setSeenSentMessages(seenSentMessagesLocal);
                    setCurrentMessages(currentMessageLocal);
                    setUnreadMessages(unreadMessagesLocal);
                });
            ref
                .child(`${MESSAGES}/${currentReceiver.id}/${user.id}`)
                .orderByChild('date')
                .limitToLast(30)
                .on('value', function(snapshot) {
                    let unseenReceivedMessagesLocal = [];
                    snapshot.forEach((element) => {
                        const messageDetails = element.val();
                        const messageKey = element.key;
                        if (!messageDetails.seen && messageDetails.to === user.id) {
                            unseenReceivedMessagesLocal = [
                                ...unseenReceivedMessagesLocal,
                                {...messageDetails, messageId: messageKey}
                            ];
                        }
                    });
                    setUnseenReceivedMessages(unseenReceivedMessagesLocal);
                });
        }
        return () => {
            ref.child(`${MESSAGES}/${user.id}/${currentReceiver.id}`).off();
            ref.child(`${MESSAGES}/${currentReceiver.id}/${user.id}`).off();
        };
    }, [currentReceiver, loadMoreFlag]);

    const checkShow = () => {
        if (((wrapperElement.scrollHeight - wrapperElement.scrollTop) > (2 * wrapperElement.offsetHeight))) setShow(true);
        else setShow(false);
    };

    const addSelectedMessage = (messageDetails) => {
        const {messageId, date} = messageDetails;
        setReplyMessage({});
        setSelectedMessages([
            ...selectedMessages,
            {messageId, date, ...messageDetails}
        ].sort((message1, message2) => message1.date - message2.date));

        setLastSelectedMessage(messageId);
    };

    const removeSelectedMessage = (messageDetails) => {
        setSelectedMessages(
            selectedMessages.filter(
                (selectedMessage) =>
                    selectedMessage.messageId !== messageDetails.messageId
            )
        );
        if (lastSelectedMessage === messageDetails.messageId) {
            if (selectedMessages.length) {
                setLastSelectedMessage(selectedMessages[selectedMessages.length - 1].messageId);
            } else setLastSelectedMessage({});
        }
    };

    const updateUnreadCount = (count, receiverId) => {
        ref
            .child(`${UNREAD_COUNT}/${receiverId}/${user.id}`)
            .once('value', (snapshot) => {
                const unreadCount = snapshot.val();
                ref
                    .child(`${UNREAD_COUNT}/${receiverId}`)
                    .update({[user.id]: (unreadCount + count)});
            });
    };

    const handleForwardImageClick = (imageDetails) => {
        setForwardImageModal(imageDetails);
        setSelectedMessages([]);
    };

    const replyTo = (messageDetails) => {
        setReplyMessage(messageDetails);
        setSelectedMessages([]);
        document.getElementById('chat-send-input').focus();
    };

    const {modalFlag, ...attachmentDetails} = forwardImageModal;
    return (
        <div
            className={
                active === 'Profile'
                    ? 'chat-screen chat-screen-profile-hidden chat-screen-hidden'
                    : currentReceiver.id
                        ? 'chat-screen'
                        : 'chat-screen chat-screen-hidden'
            }
        >
            <CurrentReceiver
                setCurrentMessages={setCurrentMessages}
                setCurrentReceiver={setCurrentReceiver}
                typing={typing}
                currentReceiver={currentReceiver}
                selectedMessages={selectedMessages}
                setSelectedMessages={setSelectedMessages}
                lastSelectedMessage={lastSelectedMessage}
                setLastSelectedMessage={setLastSelectedMessage}
                updateUnreadCount={updateUnreadCount}
                replyTo={replyTo}
                replyMessage={replyMessage}
                setReplyMessage={setReplyMessage}
            />
            <div className="chat-messages-wrapper" id="chat-wrapper" onScroll={checkShow}>
                <div className="chat-messages">
                    <Fragment>
                        {currentMessages.length < 30 ? null : (
                            <div className="load-more-wrapper">
                                <div className="chat-load-more">
                                    {currentMessages.length % 30 ? null : <button
                                        className="wc-label"
                                        onClick={() => setLoadMoreFlag(loadMoreFlag + 1)}
                                    >
                                        {'Load Older Messages'}
                                    </button>}
                                </div>
                            </div>
                        )}
                        <div className={show ? 'chat-go-down' : 'chat-go-down visible-hidden'}>
                            {unreadMessages.length ? (
                                <span>{unreadMessages.length}</span>
                            ) : null}
                            <div onClick={() => (wrapperElement.scrollTop = wrapperElement.scrollHeight)}>
                                <Icon name="chevron-down"/>
                            </div>
                        </div>
                        {currentMessages.map((messageDetails, messageIndex) => {
                            return (
                                <ChatMessage
                                    key={user.id + messageIndex}
                                    messageDetails={messageDetails}
                                    seenSentMessages={seenSentMessages}
                                    prevMessageDate={
                                        currentMessages[messageIndex - 1]
                                            ? currentMessages[messageIndex - 1].date
                                            : null
                                    }
                                    unreadMessages={unreadMessages}
                                    user={user}
                                    selectedMessages={selectedMessages}
                                    addSelectedMessage={addSelectedMessage}
                                    removeSelectedMessage={removeSelectedMessage}
                                    setSelectedMessages={setSelectedMessages}
                                    loadMoreFlag={loadMoreFlag}
                                    handleForwardImageClick={handleForwardImageClick}
                                    currentReceiver={currentReceiver}
                                />
                            );
                        })}
                    </Fragment>
                </div>
            </div>
            <ChatSend
                currentReceiver={currentReceiver}
                handleTyping={handleTyping}
                setLoadMoreFlag={setLoadMoreFlag}
                unreadMessages={unreadMessages}
                setTyping={setTyping}
                setSelectedMessages={setSelectedMessages}
                updateUnreadCount={updateUnreadCount}
                replyMessage={replyMessage}
                setReplyMessage={setReplyMessage}
            />
            <ForwardModal
                closeModal={() => setForwardImageModal({})}
                currentReceiver={currentReceiver}
                user={user}
                updateUnreadCount={updateUnreadCount}
                attachmentDetails={attachmentDetails}
                modalFlag={modalFlag}
            />
        </div>
    );
};
