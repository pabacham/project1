var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema,
    async = require('async'),
    crypto = require('crypto');

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'User is required!'
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
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
                    callback({errorMessage: 'Incorrect password'});
                }
            } else {
                callback({errorMessage: 'User not found'});
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

    user.save(callback);
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });

exports.User = mongoose.model('User', schema);