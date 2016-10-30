const domainNameRegex = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
const ipAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i;

module.exports = {
    /**
     * Rounding number to the passed number of decimals
     * @param {Number} number - number to round
     * @param {Number} places - number of decimals to keep
     * @returns {Number}
     */
    customFloor: (number, places) => Math.floor(number * Math.pow(10, places)) / Math.pow(10, places),

    /**
    * Returns true if the input string is either a domain name or an IP adress
    * @param {String} domainNameOrIP
    * @returns {Boolean}
    */
    isDomainNameOrIP: domainNameOrIP =>
        domainNameRegex.test(domainNameOrIP) || ipAddressRegex.test(domainNameOrIP),

    /**
    * Deletes array records older than a month
    * The array must contain objects with 'date' property
    * Accepts empty arrays
    * @param {Array} array
    * @return {Array}
    */
    garbageCollection: (array, date = new Date()) => {
        if (!Array.isArray(array) || array.length < 1) return [];

        const oneMonthAgoTimestamp = date.setMonth(date.getMonth() - 1);

        // We return an array with only the values younger than a month
        return array.filter(el => el.date.getTime() > oneMonthAgoTimestamp);
    },

    /**
    * Calculates a check's various stats by analyzing its history
    *  @param {Object} historyArray - a check's history array
    *  @param {Number} historyLength - the number of history entries to return
    *  @returns {Object}
    */
    calcCheckStats: (historyArray) => {
        if (historyArray.length < 1) return null;

        const checkInterval = sails.config.checkInterval;
        let sum = 0;
        let min = historyArray[0].duration;
        let max = historyArray[0].duration;
        let totalOutage = 0;
        let lastOutage = null;
        let numberOfOutages = 0;

        historyArray.forEach((ping, i) => {
            if (ping.duration !== null) {
                sum += ping.duration;
                min = ping.duration < min ? ping.duration : min;
                max = ping.duration > max ? ping.duration : max;
            } else {
                totalOutage += checkInterval;
                lastOutage = ping.date;
                if (typeof historyArray[i - 1] !== 'undefined' && historyArray[i - 1].duration !== null) {
                    numberOfOutages++;
                }
            }
        });

        const percent = 100 - (totalOutage * 100) / (historyArray.length * checkInterval);

        return {
            min,
            max,
            avg: Math.round(sum / historyArray.length),
            availability: Utilities.customFloor(percent, 2),
            totalOutage,
            lastOutage,
            numberOfOutages,
        };
    },
};
