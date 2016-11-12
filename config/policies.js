module.exports.policies = {

    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions (`true` allows public     *
     * access)                                                                  *
     *                                                                          *
     ***************************************************************************/

    '*': [
        ['isAuthenticated', 'wantsJSON'],
    ],

    'UserController': {
        'find': 'wantsJSON',
        'create': 'wantsJSON',
        'confirm': 'wantsJSON',
    },

    'AuthController': {
        'login': 'wantsJSON',
    },
};
