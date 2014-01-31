define([
    'jquery',
    'underscore',
    'views/BaseView',

    'views/geozones/GeoZonesHeaderView'
], function($, _, BaseView,  GeoZonesHeaderView){

    var GeoZonesView = BaseView.extend({
        templateName: "geoZonesTemplate",
        container: ".map-block",
        router: null,
        formSlider: null,
        geoHeader: null,

        initialize: function () {
        },

        events: {
        },

        render: function (router) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.geoHeader = router.showView(new GeoZonesHeaderView());

            return this;
        }
    });

    return GeoZonesView;

});

