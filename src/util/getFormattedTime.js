export const getFormattedTime = (date) => {
    const timeString = date.toTimeString().slice(0, 5);
    const hourString = timeString.slice(0, 2);
    let hourInt = parseInt(hourString, 10);
    let meredian = 'am';
    if (hourInt > 12) {
        hourInt = hourInt - 12;
        meredian = 'pm';
    } else if (hourInt === 0) hourInt = 12;
    else if (hourInt === 12) meredian = 'pm';
    return `${hourInt}${timeString.slice(2, 5)} ${meredian}`;
};