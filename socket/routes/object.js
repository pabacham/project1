

module.exports = function(socket) {

    this.create = function() {
        socket.emit('object:create:result', {})
    }

    return this;
};