function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();

    if (day <= 9) {
        day = `0${day}`;
    }

    if (month <= 9) {
        month = `0${month}`;
    }

    return `${day}-${month}-${year}`;
}

module.exports.getMonday = () => {
    const today = new Date();
    const day = today.getDay() || 7;

    if (day !== 1) {
        today.setHours(-24 * (day - 1));
    }

    return formatDate(today);
}
