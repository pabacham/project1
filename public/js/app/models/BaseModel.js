define([
    'backbone',
    'socket/socket',
    'validation'
], function(Backbone, socket){

    var BaseModel = Backbone.Model.extend({
        socket: socket
    });

    return BaseModel;

});
