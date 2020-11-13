export const getLastSeenRelativeDate = (dateObject) => {
    const today = new Date();
    const lastSeenFormattedDate = dateObject.getDate() + dateObject.getMonth() + dateObject.getFullYear();
    const todayFormattedDate = today.getDate() + today.getMonth() + today.getFullYear();

    const lastSeenFormattedMonth = dateObject.getMonth() + dateObject.getFullYear();
    const todayFormattedMonth = today.getMonth() + today.getFullYear();
    if (lastSeenFormattedDate === todayFormattedDate) return 'today';
    if (lastSeenFormattedMonth === todayFormattedMonth && today.getDate() === dateObject.getDate() + 1) return 'yesterday';
    return dateObject.toDateString().slice(4);
};