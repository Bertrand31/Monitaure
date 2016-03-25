/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function (req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return res.json(400, 'passwords-mismatch');
        }
        delete req.body.confirmPassword;
        User.create(req.body).exec(function (err, user) {
            if (err) {
                return res.json(err.status, err);
            }

            // If user created successfuly we return user
            if (user) {
                res.json(200, {user: user});
            }
        });
    }
};
