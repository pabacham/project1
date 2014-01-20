define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/objects/ObjectSliderView'
], function($, _, BaseView, ObjectSliderView){

    var ObjectsView = BaseView.extend({
        templateName: "objectsTemplate",
        container: ".map-block",
        initialize: function () {

        },

        events: {
            'click #add-new-object' : 'openFormSlider',
            'click .add-new-object' : 'openFormSlider'
        },

        openFormSlider: function(){
            this.formSlider.$el.find('#add-object').addClass('open');
        },

        render: function (router) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.formSlider = router.showView(new ObjectSliderView());

            return this;
        }
    });

    return ObjectsView;

});