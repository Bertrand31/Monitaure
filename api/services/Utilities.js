module.exports = {
    customFloor: function(number, places) {
        return Math.floor(number * Math.pow(10, places)) / Math.pow(10, places);
    }
};
