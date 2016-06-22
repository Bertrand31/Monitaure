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
    isDomainNameOrIP(domainNameOrIP) {
        const domainNameRegex = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i,
            ipAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i;

        return domainNameRegex.test(domainNameOrIP) || ipAddressRegex.test(domainNameOrIP);
    }

};
