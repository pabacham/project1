define([
    'backbone',
    'socket/socket',
    'validation'
], function(Backbone, socket){

    var BaseModel = Backbone.Model.extend({
        idAttribute: '_id',
        socket: socket
    });

    return BaseModel;

});
