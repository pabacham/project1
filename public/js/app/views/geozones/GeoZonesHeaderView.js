define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    MapHeaderView = BaseView.extend({
        templateName: "geoZonesHeaderTemplate",
        container: "#geo-header",
        initialize: function () {
            this.slider = $('#add-geo-zone');
        },

        events: {
            'click #geo_slider_open': 'openSlider'
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