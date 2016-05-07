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
            } else if (user) {
                Messages.sendConfirmationEmail(user, function(err) {
                    if (err) {
                        sails.log.error(err);
                    } else {
                        res.json(200, {user});
                    }
                });
            }
        });
    },

    confirm: function (req, res) {
        User.update({ confirmationToken: req.param('id') }, {confirmedAccount: true}).exec(function(err, updated) {
            if (err) {
                //TODO
                //Retourner page d'erreur: token invalide
            } else {
                //TODO
                //Retourner page de succès avec lien pour se connecter
                return res.json(200, {updated});
            }
        });
    }
};
