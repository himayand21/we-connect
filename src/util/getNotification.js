const getOtherString = (newSenderCount) => {
    const noOfUnreadSenders = newSenderCount.length - 1;
    if (noOfUnreadSenders <= 0) {
        return '';
    } else if (noOfUnreadSenders === 1) {
        return ' and 1 other';
    }
    return ` and ${noOfUnreadSenders} others`;
};

export const getNotification = (unreadObject, messageDetails) => {
    const newSenderCount = Object.values(unreadObject).filter((unread) => unread);
    const noOfUnreadMessages = newSenderCount.reduce((acc, curr) => acc + curr);
    const newSenders = Object.keys(unreadObject).filter((unreadKey) => unreadObject[unreadKey]);

    const {message, user} = messageDetails;
    const {displayName, email, id} = user;
    const title = displayName || email;

    if (noOfUnreadMessages === 1 && newSenders.includes(id)) {
        return ({
            message,
            title
        });
    }

    const otherString = getOtherString(newSenderCount);

    return ({
        title: `${noOfUnreadMessages} unread messages`,
        message: `from ${title}${otherString}`
    });
};