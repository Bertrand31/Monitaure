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
    isDomainNameOrIP: (domainNameOrIP) =>
        domainNameRegex.test(domainNameOrIP) || ipAddressRegex.test(domainNameOrIP),

    /**
    * Deletes array records older than a month
    * The array must contain objects with 'date' property
    * Accepts empty arrays
    * @param {Array} array
    * @return {Array}
    */
    garbageCollection: (array) => {
        if (array.length < 1) return [];

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const newArray = array.slice();

        // If the first value of the array is older than a month, we remove it
        // We keep doing that until the oldest value is younger than a month
        while (newArray[0].date.getTime() < oneMonthAgo.getTime()) {
            newArray.shift();
        }

        return newArray;
    },

};
