export const getFormattedDate = (givenDate) => {
    const dateObject = new Date(givenDate);
    return dateObject.getDate() + dateObject.getMonth() + dateObject.getFullYear();
};