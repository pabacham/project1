

module.exports = {
    talk: function(socket) {
        socket.emit('talk', {
            message: 'io event from an io route on the server'
        })
    }
};