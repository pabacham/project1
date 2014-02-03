define(
    [
        'backbone',
        'socket/socket'
    ],
    function(Backbone, socket) {
        return Backbone.Collection.extend({
            socket: socket
        });
    }
);