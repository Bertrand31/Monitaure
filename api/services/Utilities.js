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
    calcCheckStats: (customFloor, historyArray = [], checkInterval = 5000) => {
        if (historyArray.length < 1) return null;

        let sum = 0;
        const firstNonNullPing = historyArray.find(ping => ping.duration !== null);
        let min = typeof firstNonNullPing !== 'undefined' ? firstNonNullPing.duration : null;
        let max = historyArray[0].duration;
        let totalOutages = 0;
        let lastOutage = null;
        let numberOfOutages = 0;

        historyArray.forEach((ping, i, array) => {
            if (ping.duration !== null) {
                sum += ping.duration;
                min = ping.duration < min ? ping.duration : min;
                max = ping.duration > max ? ping.duration : max;
            } else {
                totalOutages++;
                lastOutage = ping.date;
                if (typeof array[i - 1] !== 'undefined' && array[i - 1].duration !== null) {
                    numberOfOutages++;
                }
            }
        });

        const totalOutage = totalOutages * checkInterval;
        const percent = 100 - (totalOutage * 100) / (historyArray.length * checkInterval);

        return {
            min,
            max,
            avg: sum !== 0 ? Math.round(sum / (historyArray.length - totalOutages)) : null,
            availability: customFloor(percent, 2),
            totalOutage,
            lastOutage,
            numberOfOutages,
        };
    },

    /**
     * Turns an amount of milliseconds into decomposed object with hours, minutes and seconds
     * @param {Number} milliseconds - an amout of miliseconds
     * @returns {Object} { hours, minutes, seconds }h:mm:ss
     */
    decomposeDuration: (milliseconds) => {
        if (typeof milliseconds !== 'number' || milliseconds < 0) {
            throw new Error('Incorrect milliseconds value');
        }
        const initialSeconds = milliseconds / 1000;
        return {
            hours: Math.floor(initialSeconds / 3600),
            minutes: Math.floor((initialSeconds % 3600) / 60),
            seconds: Math.floor((initialSeconds % 3600) % 60),
        };
    },
};
