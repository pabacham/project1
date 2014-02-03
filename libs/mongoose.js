var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    config = require('config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
autoIncrement.initialize(mongoose);

module.exports = mongoose;