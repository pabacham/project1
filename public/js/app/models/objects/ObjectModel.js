define([
    'models/BaseModel'
], function(BaseModel){

    var ObjectModel = BaseModel.extend({
        defaults: {
            objectName: ''
        },
        urlRoot: 'object'
    });

    return ObjectModel;

});
