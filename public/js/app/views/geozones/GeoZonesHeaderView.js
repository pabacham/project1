define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/geozones/GeoZonesSliderView'
], function($, _, BaseView, GeoZonesSliderView){

    GeoZonesHeaderView = BaseView.extend({
        templateName: "geoZonesHeaderTemplate",
        container: "#geo-header",
        initialize: function () {
        },

        events: {
            'click #geo_slider_open' : 'openSlider'
        },

        openSlider: function () {
            this.formSlider.$el.find('#add-geo-zone').addClass('open');
        },

        render: function (router) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.formSlider = router.showView(new GeoZonesSliderView());
            return this;
        }
    });

    return GeoZonesHeaderView;

});