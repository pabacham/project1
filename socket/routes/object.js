

module.exports = function(socket) {

    this.create = function(data) {

        console.log(data);
        socket.emit('object:create:result', {})
    }

    return this;
};