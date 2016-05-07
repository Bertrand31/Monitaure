/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

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

    '/': 'CheckController.show',

    'get /signup': [
        { policy: 'forceDashboard' },
        { view: 'signup' }
    ],

    'post /signup': 'UserController.create',

    'get /login': [
        { policy: 'forceDashboard' },
        { view: 'login' }
    ],
    'post /login': 'AuthController.login',
    'get /account/confirm/:id': 'UserController.confirm',

    '/logout': 'AuthController.logout',

    'get /500': {
        view: '500'
    }

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
    ***************************************************************************/

};
