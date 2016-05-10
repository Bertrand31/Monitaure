/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function (req, res) {
        UserManagement.createUser(req.body, function(err, createdUser) {
            if (err) return res.json(err.status, err);

            return res.json(200, createdUser);
        });
    },

    confirm: function (req, res) {
        User.update({ confirmationToken: req.param('id') }, { confirmedAccount: true }).exec(function(err, updated) {
            if (err) {
                //TODO
                //Retourner page d'erreur: token invalide
            } else {
                //TODO
                //Retourner page de succès avec lien pour se connecter
                return res.render('confirmed');
            }
        });
    }
};
