const FirstDay = new Date("Tue Mar 05 2019");
let today;
let timeDiff;
let diffDays;

function getCurrentDay() {
    today = new Date()
    timeDiff = Math.abs(FirstDay.getTime() - today.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays
}

module.exports = {
    getCurrentDay:getCurrentDay,
}