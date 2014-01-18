define([
    'jquery',
    'underscore',
    'views/BaseView',
    'jquery-select2'
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

        select2Init: function() {
            this.$el.find('.select').select2();
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.select2Init();
            return this;
        }
    });

    return MapSliderView;

});

