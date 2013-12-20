var log = require('libs/log')(module);

module.exports = function(server) {
    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*');
    io.set('logger', log);

    io.sockets.on('connection', function(socket) {

        socket.on('user:logout', function(text, callback) {
            socket.emit('user:logout', 'logout has been done');
            callback && callback();
        });

    });
};