/**
* Return a Waterline model
* @param {String} modelName - the name of the model to return
*/
const findModel = (modelName) => {
    switch (modelName) {
        case 'user':
            return User;
        case 'check':
            return Check;
        default:
            throw new Error(`Model ${modelName} not found`);
    }
};

module.exports = {
    /**
    * Fetches a objects from the database
    * @param {String} itemsType - the model of the items we want to fetch
    * @param {Object} criteria - the criteria items should match
    * @param {Function} callback
    */
    fetch(itemsType, criteria, callback) {
        if (typeof itemsType !== 'string' || typeof criteria !== 'object') {
            throw new Error('[Fetch] Incorret input types');
        }

        findModel(itemsType).find(criteria).exec(callback);
    },

    /**
    * Fetches an object from the database
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {Function} callback
    */
    fetchOne(itemType, itemId, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string') {
            throw new Error('[FetchOne] Incorrect input types');
        }

        findModel(itemType).findOne({ id: itemId }).exec(callback);
    },

    /**
    * Fetches and populate an object from the database
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {String} associationType - the model of the data set we want to populate our item  with
    * @param {Function} callback
    */
    fetchAndPopulate(itemType, itemId, associationType, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string' || typeof associationType !== 'string') {
            throw new Error('[FetchAndPopulate] Incorrect input types');
        }

        findModel(itemType).findOne({ id: itemId }).populate(associationType).exec(callback);
    },

    /**
    * Creates a database object
    * @param {String} itemType - the model of the item we want to create
    * @param {Object} data - the attributes of the item we want to create
    * @param {Function} callback
    */
    create(itemType, data, callback) {
        if (typeof itemType !== 'string' || typeof data !== 'object') {
            throw new Error('[Create] Incorrect input types');
        }

        findModel(itemType).create(data).exec(callback);
    },

    /**
    * Updates a database object
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {Object} data - the attributes to update and their new contents
    * @param {Function} callback
    */
    update(itemType, filterCriteria, newData, callback) {
        if (typeof itemType !== 'string' || typeof filterCriteria !== 'object' || typeof newData !== 'object') {
            throw new Error('[Update] Incorrect input types');
        }

        findModel(itemType).update(filterCriteria, newData).exec(callback);
    },

    /** Destroys a database object
    * @param {String} itemType - the model of the item we want to fetch
    * @param {String} itemId - the id of the item we want to fetch
    * @param {Function} callback
    */
    destroy(itemType, itemId, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string') {
            throw new Error('[Destroy] Incorrect input types');
        }

        findModel(itemType).destroy(itemId).exec(callback);
    },
};
