var log = require('libs/log')(module),
    fs = require('fs'),
    _ = require('lodash');

module.exports = function(server) {
    var socketRouting = [];

    fs.readdirSync(__dirname + '/routes').forEach(function(controllerName) {
        var actionList = require('./routes/' + controllerName);

        _.each(actionList, function(action, actionName) {
            if(typeof action == 'function') {
                socketRouting.push({
                    name: controllerName.toLowerCase().replace('.js', '') + ':' + actionName,
                    callback: action
                });
            }
        });
    });

    var io = require('socket.io').listen(server);
    io.set('origins', '*:*');
    io.set('logger', log);

    require('api/socket/auth')(io);

    io.sockets.on('connection', function(socket) {
        _.each(socketRouting, function(item) {
            socket.on(item.name, item.callback);
        });
    });

    return io;
};