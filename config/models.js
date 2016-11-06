/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

    connection: 'mongoDB',

    /***************************************************************************
    *                                                                          *
    * How and whether Sails will attempt to automatically rebuild the          *
    * tables/collections/etc. in your schema.                                  *
    *                                                                          *
    * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
    *                                                                          *
    ***************************************************************************/
    migrate: 'alter',

};
