export const checkMessageValidity = (message) => {
    if (!message.length) return false;
    if (message.split(' ').length - 1 === message.length) return false;
    return true;
};