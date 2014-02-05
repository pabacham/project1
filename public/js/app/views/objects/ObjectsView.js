define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/objects/ObjectSliderView',
    'collections/objects/ObjectCollection'
], function($, _, BaseView, ObjectSliderView, ObjectCollection){

    var ObjectsView = BaseView.extend({
        templateName: "objectsTemplate",
        container: ".map-block",
        router: null,
        formSlider: null,

        initialize: function () {
            this.objectCollection = new ObjectCollection();
        },

        events: {
            'click #add-new-object' : 'openFormSlider',
            'click .add-new-object' : 'openFormSlider'
        },

        openFormSlider: function(){
            this.formSlider.$el.find('#add-object').addClass('open');
        },

        render: function (router) {
            this.objectCollection.fetch();
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.formSlider = router.showView(new ObjectSliderView({
                objectCollection: this.objectCollection
            }));

            return this;
        }
    });

    return ObjectsView;

});