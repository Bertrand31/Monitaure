module.exports.policies = {

    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions (`true` allows public     *
     * access)                                                                  *
     *                                                                          *
     ***************************************************************************/

    '*': [
        'isAuthenticated',
    ],

    'UserController': {
        'create': true,
        'confirm': true,
    },

    'AuthController': {
        'login': true,
    },
};
