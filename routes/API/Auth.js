function Auth () {
    "use strict";
    var User = require('models/user').User,
        async = require('async'),
        _ = require('lodash');

    this.login = function(req, res, next) {
        var email = req.body.email,
            password = req.body.password,
            userClone;

        User.authorize(email, password, function(err, user) {
            if(err) {
                if(err.errorMessage) {
                    return res.send(err);
                } else {
                    return next(err)
                }
            }
            userClone = user.toObject();

            async.each(Object.keys(userClone), function (item, callback){
                if(_.contains(['hashedPassword', 'salt'], item)) {
                    delete userClone[item];
                }
                callback();
            }, function(err) {
                if(err) return next();

                req.session.user = userClone;
                res.send({isRegistered: true});
            });
        });
    };

    this.logout = function(req, res) {
        req.session.destroy();
        res.send({result: true});
    };

    this.register = function(req, res, next) {
        var username = req.body.username,
            email = req.body.email,
            password = req.body.password,
            confirmPassword = req.body.confirmPassword;

        User.createUser({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }, function(err) {
            if (err) return next(err);

            res.send({result: true});
        });
    };
}

module.exports = new Auth();
