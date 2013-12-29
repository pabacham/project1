// Filename: app.js
define([
    'socketio'
], function(io){

    var socket = io.connect('', {
        reconnect: true
    });

    socket
        .on('connect', function() {
            console.log('socket connected');
        })
        .on('disconnect', function() {
            console.log('socket disconnected');
        })
        .on('logout', function() {
            location.href = "/";
        })
        .on('talk', function(data) {
            console.debug(data.message);
        })
        .on('error', function(reason) {
            if (reason == "handshake unauthorized") {
                console.log('you are logged out');
            } else {
                setTimeout(function() {
                    socket.socket.connect();
                }, 500);
            }
        });

    return socket;
});


