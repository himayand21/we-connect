import {isUri} from 'valid-url';
import * as firebase from 'firebase/app';

import {
    SAVE_USER,
    RESET_USER,
    SHOW_SPINNER,
    HIDE_SPINNER,
    ADD_NEW_RECEIVER,
    USER_DATA,
    MESSAGES,
    SET_ACTIVE,
    LATEST,
    OPEN_MODAL,
    CLOSE_MODAL,
    UPDATE_CHANGED_RECEIVER,
    UPDATE_LATEST,
    SET_USER_DETAILS,
    CHANGE_THEME,
    SET_THEME,
    TOKEN,
    UNREAD_COUNT,
    serverKey,
    fcmURL,
    adminId,
    introMessages
} from '../constants';

import dog1 from '../assets/dp/dog1.jpg';
import dog2 from '../assets/dp/dog2.jpg';
import dog3 from '../assets/dp/dog3.jpg';
import dog4 from '../assets/dp/dog4.jpg';
import dog5 from '../assets/dp/dog5.jpg';
import dog6 from '../assets/dp/dog6.jpg';

import {checkMessageValidity, getNotification} from '../util';

const imageArray = [dog1, dog2, dog3, dog4, dog5, dog6];

export const useActions = (state, dispatch, ref) => {
    const saveUser = async (data) => {
        const {id, displayName, email, photoURL} = data;
        let existingUser = null;
        await ref
            .child(USER_DATA)
            .child(id)
            .once('value', (snapshot) => {
                existingUser = snapshot.val();
            });
        if (!existingUser) {
            let userData = {
                email,
                id,
                photoURL: photoURL || imageArray[Math.floor(Math.random() * imageArray.length)]
            };
            if (displayName) userData = {...userData, displayName};
            await ref
                .child(USER_DATA)
                .child(id)
                .update({
                    ...userData,
                    friends: [adminId]
                });
            // eslint-disable-next-line require-atomic-updates
            existingUser = userData;
            introMessages.forEach((introMessage, index) => {
                const messageDetails = {
                    from: adminId,
                    to: id,
                    seen: false,
                    message: introMessage,
                    uniqid: Math.random().toString().slice(2),
                    date: firebase.database.ServerValue.TIMESTAMP
                };
                ref
                    .child(MESSAGES)
                    .child(id)
                    .child(adminId)
                    .push({...messageDetails});
                ref
                    .child(MESSAGES)
                    .child(adminId)
                    .child(id)
                    .push({...messageDetails});

                if (index === introMessages.length - 1) {
                    ref.child(LATEST).child(id).update({
                        [adminId]: {
                            from: adminId,
                            to: id,
                            message: introMessage,
                            seen: false,
                            uniqid: Math.random().toString().slice(2),
                            date: firebase.database.ServerValue.TIMESTAMP
                        }
                    });
                    ref.child(LATEST).child(adminId).update({
                        [id]: {
                            from: id,
                            to: adminId,
                            message: introMessage,
                            seen: false,
                            uniqid: Math.random().toString().slice(2),
                            date: firebase.database.ServerValue.TIMESTAMP
                        }
                    });
                }
            });
            ref
                .child(USER_DATA)
                .child(adminId)
                .child('friends')
                .push(id);
        }
        await dispatch({
            type: SAVE_USER,
            user: existingUser
        });
    };

    const userLogOut = async () => {
        await dispatch({
            type: RESET_USER
        });
        hideSpinner();
    };

    const showSpinner = () => {
        dispatch({
            type: SHOW_SPINNER
        });
    };
    const hideSpinner = () => {
        dispatch({
            type: HIDE_SPINNER
        });
    };

    const setActive = (navLink) => {
        dispatch({
            type: SET_ACTIVE,
            active: navLink
        });
    };

    const sendMessage = ({
        message,
        receiverId,
        attachment = {},
        reply = {}
    }) => {
        if (checkMessageValidity(message)) {
            const {user} = state;
            const {id: userId} = user;

            const messageStringArray = message.replace(/\n/g, ' ').split(' ');
            const linkArray = messageStringArray.reduce((arr, elem) => {
                if (isUri(elem)) arr.push(elem);
                return arr;
            }, []);

            const messageDetails = {
                date: firebase.database.ServerValue.TIMESTAMP,
                message,
                from: userId,
                to: receiverId,
                seen: false,
                attachment,
                reply,
                link: linkArray,
                uniqid: Math.random().toString().slice(2)
            };

            ref.child(TOKEN).child(receiverId).once('value', (snapshot) => {
                const token = snapshot.val();
                ref.child(UNREAD_COUNT).child(receiverId).once('value', (snapshot) => {
                    const unreadObject = snapshot.val();
                    const data = getNotification(unreadObject, ({message, user}));
                    fetch(fcmURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'key=' + serverKey
                        },
                        body: JSON.stringify({
                            data,
                            to: token
                        })
                    });
                });
            });

            ref
                .child(LATEST)
                .child(userId)
                .child(receiverId)
                .update({...messageDetails});
            ref
                .child(LATEST)
                .child(receiverId)
                .child(userId)
                .update({...messageDetails});
            ref
                .child(MESSAGES)
                .child(userId)
                .child(receiverId)
                .push({...messageDetails});
            ref
                .child(MESSAGES)
                .child(receiverId)
                .child(userId)
                .push({...messageDetails});
        }
    };

    const updateChangedReceiver = (receiver) => {
        dispatch({
            type: UPDATE_CHANGED_RECEIVER,
            receiver
        });
    };

    const addNewReceiver = ({receiverId, messageDetails}) => {
        const {user} = state;
        if (user.id !== receiverId) {
            ref
                .child(USER_DATA)
                .child(receiverId)
                .once('value', function(snapshot) {
                    dispatch({
                        type: ADD_NEW_RECEIVER,
                        receiver: snapshot.val(),
                        messageDetails
                    });
                });
        }
    };

    const updateReceivers = (receiverObjects) => {
        const {latest} = state;
        const receiverIds = Object.keys(receiverObjects);

        if (latest.length === 0) {
            receiverIds.forEach((receiverId) => {
                ref
                    .child(USER_DATA)
                    .child(receiverId)
                    .once('value', function(snapshot) {
                        dispatch({
                            type: ADD_NEW_RECEIVER,
                            receiver: snapshot.val(),
                            messageDetails: receiverObjects[receiverId]
                        });
                    });
            });
        } else if (latest.length === receiverIds.length) {
            const changedIds = receiverIds.filter((receiverId) => {
                return (
                    latest.some((contact) => {
                        return (
                            contact.receiver.id === receiverId &&
                            contact.messageDetails.uniqid !== receiverObjects[receiverId].uniqid
                        );
                    })
                );
            });

            const otherContacts = latest.filter((contact) => !changedIds.includes(contact.receiver.id));
            const updatedContacts = changedIds.map((changedId) => {
                const contact = latest.find((contact) => contact.receiver.id === changedId);
                const {receiver} = contact;
                return ({
                    receiver,
                    messageDetails: receiverObjects[changedId]
                });
            });

            const localLatest = [
                ...updatedContacts,
                ...otherContacts
            ];
            // const sortedLatest = localLatest.sort((first, second) => second.messageDetails.date - first.messageDetails.date);
            dispatch({
                type: UPDATE_LATEST,
                latest: localLatest
            });

        } else if (receiverIds.length > latest.length) {
            const contactIds = latest.map((contact) => contact.receiver.id);
            const newId = receiverIds.find((receiverId) => !contactIds.includes(receiverId));
            ref
                .child(USER_DATA)
                .child(newId)
                .once('value', function(snapshot) {
                    dispatch({
                        type: ADD_NEW_RECEIVER,
                        receiver: snapshot.val(),
                        messageDetails: receiverObjects[newId]
                    });
                });
        }
    };

    const openModal = () => {
        dispatch({
            type: OPEN_MODAL
        });
    };

    const closeModal = () => {
        dispatch({
            type: CLOSE_MODAL
        });
    };

    const setUserDetails = (userDetails) => {
        dispatch({
            type: SET_USER_DETAILS,
            userDetails
        });
    };
    const changeTheme = () => {
        dispatch({
            type: CHANGE_THEME
        });
    };
    const setTheme = (darkTheme) => {
        dispatch({
            type: SET_THEME,
            darkTheme
        });
    };

    return ({
        saveUser,
        userLogOut,
        showSpinner,
        hideSpinner,
        sendMessage,
        addNewReceiver,
        setActive,
        openModal,
        updateChangedReceiver,
        closeModal,
        updateReceivers,
        setUserDetails,
        changeTheme,
        setTheme
    });
};
