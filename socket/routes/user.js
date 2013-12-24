

module.exports = function(socket) {

    this.talk = function() {
        socket.emit('talk', {
            message: 'io event from an io route on the server'
        })
    }

    return this;
};