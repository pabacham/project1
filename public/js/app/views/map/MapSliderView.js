define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    MapSliderView = BaseView.extend({
        templateName: "mapSliderTemplate",
        container: "#slider-block",
        initialize: function () {
        },

        events: {
            'click .slider-close' : "closeSlider"
        },

        closeSlider: function() {
            this.$el.find('.slider-body').toggleClass('open');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return MapSliderView;

});

