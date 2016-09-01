module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
    ***************************************************************************/

    // '/': 'CheckController.show',
    'get /': [
        { policy: 'homepageToggle' },
    ],

    'get /signup': [
        { policy: 'forceDashboard' },
        { view: 'signup' },
    ],

    'post /signup': 'UserController.create',

    'get /login': [
        { policy: 'forceDashboard' },
        { view: 'login' },
    ],
    'post /login': 'AuthController.login',
    'get /account/confirm/:id': 'UserController.confirm',

    '/logout': 'AuthController.logout',

    'get /403': {
        view: '403',
    },
    'get /500': {
        view: '500',
    }

};
