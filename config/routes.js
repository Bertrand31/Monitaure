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

    'post /signup': 'UserController.create',
    'post /login': 'AuthController.login',
    'post /logout': 'AuthController.logout',

    'get /account/confirm/:id': 'UserController.confirm',

    'get /403': {
        view: '403',
    },
    'get /500': {
        view: '500',
    },

    'get /': {
        view: 'homepage',
    },
    'get /app': {
        view: 'homepage',
    },

};
