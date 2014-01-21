define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/objects/ObjectSliderView'
], function($, _, BaseView, ObjectSliderView){

    var ObjectsView = BaseView.extend({
        templateName: "objectsTemplate",
        container: ".map-block",
        router: null,
        formSlider: null,

        initialize: function () {

        },

        events: {
            'click #add-new-object' : 'openFormSlider',
            'click .add-new-object' : 'openFormSlider'
        },

        openFormSlider: function(){
            if(this.formSlider) {
                this.formSlider.$el.find('#add-object').addClass('open');
            } else {
                this.formSlider = this.router.showView(new ObjectSliderView());
                this.formSlider.$el.find('#add-object').addClass('open');
            }
        },

        render: function (router) {
            this.router = router;
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return ObjectsView;

});