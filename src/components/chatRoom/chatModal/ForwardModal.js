import React, {useContext, useState} from 'react';

import {StateContext} from '../../../context';
import {Modal, SearchBox, Icon} from '../../ui';

import '../../../styles/forward-message.scss';

const formatDate = (date) => {
    if (date < 10) return `0${date}`;
    return date;
};

const getSender = (messageObject, user, receiver) => {
    const {
        id: userId,
        displayName: userName,
        email: userEmail
    } = user;

    const {
        id: receiverId,
        displayName: receiverName,
        email: receiverEmail
    } = receiver;
    if (messageObject.from === userId) return (userName || userEmail);
    if (messageObject.from === receiverId) return (receiverName || receiverEmail);
    return '';
};

const getMessageString = (messageArray, user, receiver) => {
    if (!messageArray) return '';

    const sortedMessages = messageArray.sort((first, second) => first.date - second.date);
    return sortedMessages.map((messageObject) => {
        const {message, date} = messageObject;
        const messageString = messageObject.attachment ? messageObject.attachment.attachmentLink : message;
        const messageDate = new Date(date);
        const dateString = `${formatDate(messageDate.getDate())}/${formatDate(messageDate.getMonth() + 1)}/${messageDate.getFullYear()} ${formatDate(messageDate.getHours())}:${formatDate(messageDate.getMinutes())}`;
        const sender = getSender(messageObject, user, receiver);

        return (`[${dateString}] ${sender} - ${messageString}`);
    }).join('\n');
};

export const ForwardModal = (props) => {
    const {actions, state} = useContext(StateContext);
    const {latest} = state;
    const {sendMessage} = actions;

    const [selectedContacts, setSelectedContacts] = useState([]);
    const [searchText, setSearchText] = useState('');

    const contacts = latest.map((each) => each.receiver);

    const filterContacts = (contacts) => {
        return contacts.filter((contact) => {
            if (!searchText) return true;
            if (contact.displayName) {
                return contact.displayName
                    .toUpperCase()
                    .includes(searchText.toUpperCase());
            }
            return contact.email.toUpperCase().includes(searchText.toUpperCase());
        });
    };

    const {
        closeModal,
        modalFlag,
        selectedMessages,
        user,
        currentReceiver,
        updateUnreadCount,
        setSelectedMessages,
        attachmentDetails = {}
    } = props;

    const {
        imgWidth,
        imgHeight,
        ...attachment
    } = attachmentDetails;

    const {
        attachmentLink,
        attachmentType
    } = attachment;

    const updateSelectedContacts = (contactId) => {
        if (selectedContacts.includes(contactId)) setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
        else setSelectedContacts([...selectedContacts, contactId]);
    };

    const forwardMessage = (message) => {
        selectedContacts.forEach(async (id) => {
            await updateUnreadCount(1, id);
            sendMessage({message, receiverId: id});
        });
        setSelectedMessages([]);
        setSelectedContacts([]);
        closeModal();
    };

    const forwardImage = () => {
        selectedContacts.forEach(async (id) => {
            await updateUnreadCount(1, id);
            sendMessage({
                message: 'Attachment',
                receiverId: id,
                attachment
            });
        });
        setSelectedContacts([]);
        closeModal();
    };

    const messageString = getMessageString(selectedMessages, user, currentReceiver);

    const searchedContacts = filterContacts(contacts);
    const formatName = (displayName) => {
        if (displayName) {
            const firstName = displayName.split(' ')[0];
            return firstName;
        }
        return '';
    };

    return (
        <Modal
            title={'Forward Message'}
            closeModal={closeModal}
            modalFlag={modalFlag}
        >
            <div className="modal-body-container">
                {attachmentLink ?
                    <div
                        className="forward-box forward-attachment"
                        style={{
                            width: Math.floor(imgWidth),
                            height: Math.floor(imgHeight),
                            maxWidth: '100%'
                        }}
                    >
                        <img
                            src={attachmentLink}
                            alt={attachmentType}
                        />
                    </div> :
                    <div className="forward-box forward-message">
                        {messageString}
                    </div>}
                <SearchBox
                    placeholder={'Forward to...'}
                    value={searchText}
                    handleChange={(text) => setSearchText(text)}
                />
                <div className="contact-heads">
                    {searchedContacts.length ? searchedContacts.map((contact) => {
                        const {id: contactId, photoURL, displayName, email} = contact;
                        const contactIncluded = selectedContacts.includes(contactId);
                        return (
                            <div className="contact-head" key={contact.id}>
                                <div className="wc-image" onClick={() => updateSelectedContacts(contactId)}>
                                    <img className="wc-thumbnail" src={photoURL} alt=""/>
                                    {contactIncluded ?
                                        <div className="tick-image">
                                            <Icon name="check-regular"/>
                                        </div> : null}
                                </div>
                                <div className="wc-image-caption" title={email}>{formatName(displayName) || email}</div>
                            </div>
                        );
                    }) :
                        <div className="contact-not-found">
                            <div>No contacts found.</div>
                        </div>}
                </div>
                <div className="modal-footer">
                    <div className="modal-button-wrapper">
                        <button
                            className="wc-button size-lg forward-button"
                            disabled={!selectedContacts.length}
                            onClick={() => attachmentLink ? forwardImage() : forwardMessage(messageString)}
                        >
                            <Icon name="paper-plane-pro" />
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};