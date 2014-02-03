var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema,
    async = require('async'),
    crypto = require('crypto'),
    validate = require('mongoose-validator').validate,
    User;

var schema = new Schema({
    username: {
        type: String,
        required: 'Please enter username',
        validate: [
            validate({message: 'Username should be more than 4 and less than 16 characters long'}, 'len', 4, 16)
        ]
    },
    email: {
        type: String,
        unique: true,
        required: 'Please enter email',
        validate: [
            validate({message: 'Please enter a correct email'}, 'isEmail')
        ]
    },
    hashedPassword: {
        type: String,
        required: 'Please enter password',
        validate: [
            {
                validator: function() {
                    return (this.get('password').length >= 4) ? true : false;
                },
                msg: 'Password should be more than 4 characters long'
            }
        ]
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

/**
 * User authorization
 * @param email
 * @param password
 * @param callback
 */
schema.statics.authorize = function(email, password, callback) {
    var User = this;
    async.waterfall([
        function(callback) {
            User.findOne({email: email}, callback);
        },
        function(user, callback) {
            if(user) {
                if(user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback({errorMessage: 'Incorrect password or email'});
                }
            } else {
                callback({errorMessage: 'Incorrect password or email'});
            }
        }
    ], callback);
};

/**
 *
 * @param args (username, email, password, confirmPassword)
 * @param callback
 */
schema.statics.createUser = function(args, callback) {
    var User = this
        user = new User({username: args.username, email: args.email, password: args.password});

    schema.path('hashedPassword').validate(function(value, respond) {
        args.password === args.confirmPassword ? respond(true) : respond(false);
    }, 'Passwords are not equal');

    user.save(callback);
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });

exports.User = User = mongoose.model('User', schema);

/**
 * Validation
 */
schema.path('email').validate(function(value, respond) {
    User.findOne({email: value}, function(err, user) {
        if(err) return respond(err);

        if(user) return respond(false);

        respond(true);
    });
}, 'User exists');