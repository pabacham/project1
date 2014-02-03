define(
    [
        'models/objects/ObjectModel',
        'collections/BaseCollection'
    ],
    function(ObjectModel, BaseCollection) {
        return BaseCollection.extend({
            model:  ObjectModel,
            url: 'object'
        });
    }
);