var Object = require('api/models/object').Object;

module.exports =  {
    create: function(data, callback) {
        Object.createObject(data, function(err, model) {
            if (err) return callback(err);

            callback(null, model);
        });
    },

    read: function(data, callback) {
        Object.getObjects(data, function(data) {
            callback(null, data);
        });
    },

    update: function(data, callback) {
        var _id = data._id;
        delete data._id;

        Object.updateObject({_id: _id, model: data}, function(model) {
            callback(null, model);
        });
    },

    delete: function(data, callback) {
        var _id = data._id;

        Object.deleteObject(_id, function(model) {
            callback(null, model);
        });
    }
}