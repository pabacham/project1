define([
    'models/BaseModel'
], function(BaseModel){

    var ObjectModel = BaseModel.extend({
        defaults: {
            _id: null,
            objectName: null,
            application: null,
            objectType: null,
            color: null,
            photo: null,
            pug: null
        },

        validation: {
            objectName: [
                { required: true, msg: 'Please enter object name' }
            ],
            color: [
                { required: true, msg: 'Please choose color' }
            ]
        },

        urlRoot: 'object'
    });

    return ObjectModel;

});
