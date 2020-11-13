import React, {useState, useContext, useEffect} from 'react';
import {StateContext} from '../../context';
import {MESSAGES, TYPING, UNREAD_COUNT} from '../../constants';
import {Icon} from '../ui';
import {EmojiModal, AttachmentModal} from './chatModal';

import '../../styles/icons-wrapper.scss';
import '../../styles/popup-modal.scss';
import '../../styles/chat-send.scss';

export const ChatSend = (props) => {
    const {actions, state, ref} = useContext(StateContext);
    const {user} = state;
    const {
        currentReceiver,
        handleTyping,
        unreadMessages,
        setTyping,
        setSelectedMessages,
        updateUnreadCount,
        setReplyMessage,
        replyMessage
    } = props;
    const {sendMessage} = actions;

    const [inputMessage, setInputMessage] = useState('');
    const [emojiFlag, setEmojiFlag] = useState(false);
    const [attachmentFlag, setAttachmentFlag] = useState(false);

    useEffect(() => {
        ref
            .child(`${TYPING}/${user.id}/${currentReceiver.id}`)
            .on('value', (snapshot) => {
                const typing = snapshot.val();
                setTyping(typing);
            });

        return () => {
            ref.child(`${TYPING}/${user.id}/${currentReceiver.id}`).off();
            ref.child(`${UNREAD_COUNT}/${currentReceiver.id}/${user.id}`).off();
        };
    }, [currentReceiver]);

    const onEnterPress = (e) => {
        const {key} = e;
        if (key === 'Enter') handleSend();
    };

    const onMessageChange = (e) => {
        const messageLocal = e.target.value;
        setInputMessage(messageLocal);
        if (messageLocal) handleSeen();
    };

    const handleSend = async () => {
        handleTyping(false);
        await updateUnreadCount(1, currentReceiver.id);
        sendMessage({
            message: inputMessage,
            receiverId: currentReceiver.id,
            reply: replyMessage
        });
        setInputMessage('');
        setReplyMessage({});
        setSelectedMessages([]);
    };

    const handleAttachment = async (files, attachmentType) => {
        handleSeen();
        handleTyping(false);
        await updateUnreadCount(files.length, currentReceiver.id);

        files.forEach((file) => {
            const {
                photoURL: attachmentLink,
                aspectRatio,
                imgHeight: height
            } = file;
            sendMessage({
                message: 'Attachment',
                receiverId: currentReceiver.id,
                attachment: {
                    attachmentLink,
                    aspectRatio,
                    height,
                    attachmentType
                },
                reply: replyMessage
            });
        });
        setReplyMessage({});
    };

    const handleSeen = () => {
        unreadMessages.forEach((unreadMessage) => {
            ref
                .child(
                    `${MESSAGES}/${user.id}/${currentReceiver.id}/${
                        unreadMessage.messageId
                    }`
                )
                .update({seen: true});
        });
        ref.child(`${UNREAD_COUNT}/${user.id}`).update({[currentReceiver.id]: 0});
    };

    const checkMessageValidity = () => {
        if (!inputMessage.length) return false;
        if (inputMessage.split(' ').length - 1 === inputMessage.length) return false;
        return true;
    };

    return (
        <div className="chat-send">
            <div
                className={
                    checkMessageValidity()
                        ? 'chat-send-button-wrapper'
                        : 'chat-send-button-wrapper hidden-chat-send-button'
                }
            >
                <button className="wc-button size-lg" onClick={handleSend}>
                    <Icon name="paper-plane-pro" />
                </button>
            </div>
            <div className="wc-input-wrapper">
                <div className="emoji-icon">
                    <Icon
                        name="smile-beam-duotone"
                        className={`${emojiFlag ? 'active-emoji' : ''}`}
                        action={() => setEmojiFlag(true)}
                    />
                </div>
                {emojiFlag ? (
                    <EmojiModal
                        message={inputMessage}
                        setMessage={setInputMessage}
                        handleTyping={handleTyping}
                        closeEmojiModal={() => setEmojiFlag(false)}
                    />
                ) : null}
                <input
                    id={'chat-send-input'}
                    placeholder={'Type a message...'}
                    onKeyPress={onEnterPress}
                    onKeyDown={() => handleTyping(true)}
                    onBlur={() => handleTyping(false)}
                    onFocus={() => handleSeen()}
                    onChange={onMessageChange}
                    value={inputMessage}
                    className="chat-input"
                    autoComplete="off"
                />
                <div className="paperclip-icon">
                    <Icon
                        name="paperclip-pro"
                        className={`${attachmentFlag ? 'active-emoji' : ''}`}
                        action={() => setAttachmentFlag(true)}
                    />
                </div>
                {attachmentFlag ? (
                    <AttachmentModal
                        handleAttachment={handleAttachment}
                        setSelectedMessages={setSelectedMessages}
                        closeAttachment={() => setAttachmentFlag(false)}
                    />
                ) : null}
            </div>
        </div>
    );
};
