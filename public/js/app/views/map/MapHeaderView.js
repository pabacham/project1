define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    MapHeaderView = BaseView.extend({
        templateName: "mapHeaderTemplate",
        container: "#map-header",
        initialize: function () {
            this.slider = $('.slider-body');
        },

        events: {
            'click #map_slider_open': 'openSlider'
        },

        openSlider: function() {
            this.slider.toggleClass('open');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return MapHeaderView;

});