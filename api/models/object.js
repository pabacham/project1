var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    validate = require('mongoose-validator').validate,
    Object;

var schema = new Schema({
    objectName: {
        type: String
    },
    application: {
        type: {}
    },
    objectType: {
        type: {}
    },
    color: {
        type: String
    },
    photo: {
        type: {}
    },
    pug: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(autoIncrement.plugin, 'Object');

schema.statics.createObject = function(args, callback) {
    var Object = this,
        object = new Object(args);

    object.save(callback);
};

schema.statics.getObjects = function(args, callback) {
    var Object = this;

    Object.find({}, function(err, objects) {
        if(err) return callback(err);

        callback(objects);
    });
};

schema.statics.updateObject = function(args, callback) {
    var Object = this;

    Object.findByIdAndUpdate(args._id, args.model, function(err, object) {
        if(err) return callback(err);

        callback(object);
    });
};

schema.statics.deleteObject = function(_id, callback) {
    var Object = this;

    Object.findByIdAndRemove(_id, function(err, object) {
        if(err) return callback(err);

        callback(object);
    });
};

exports.Object = Object = mongoose.model('Object', schema);
