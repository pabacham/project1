define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    var ObjectsView = BaseView.extend({
        templateName: "objectsTemplate",
        container: ".map-block",
        initialize: function () {
            this.slider = $('#add-object');
        },

        events: {
            'click #add-new-object' : 'openSlider',
            'click .add-new-object' : 'openSlider'
        },

        openSlider: function(){
            console.log(this.slider)
            this.slider.toggleClass('open');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return ObjectsView;

});