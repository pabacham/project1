function Auth () {
    "use strict";
    var User = require('models/user').User,
        async = require('async'),
        check = require('validator').check,
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
        var username = check(req.body.username, {
                            notEmpty: 'Please enter username',
                            len: 'Username should be more than %1 and less than %2 characters long'
                       }).notEmpty().len(4, 16),
            email = check(req.body.email, {
                        notEmpty: 'Please enter email'
                    }).notEmpty().isEmail(),
            password = check(req.body.password, {
                            notEmpty: 'Please enter password',
                            len: 'Password should be more than %1 characters long'
                       }).notEmpty().len(4),
            confirmPassword = check(req.body.confirmPassword, {
                                    notEmpty: 'Please enter confirmation password',
                                    equals: 'Passwords are not equals'
                              }).notEmpty().equals(password);

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
