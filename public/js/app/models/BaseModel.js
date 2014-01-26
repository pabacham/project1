define([
    'backbone',
    'socket/socket'
], function(Backbone, socket){

    var BaseModel = Backbone.Model.extend({
        socket: socket
    });

    return BaseModel;

});
