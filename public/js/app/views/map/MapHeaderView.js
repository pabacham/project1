define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/map/MapSliderView'
], function($, _, BaseView, MapSliderView){

    MapHeaderView = BaseView.extend({
        templateName: "mapHeaderTemplate",
        container: "#map-header",
        mapSlider: null,
        initialize: function () {
        },

        events: {
            'click #map_slider_open': 'openSlider'
        },

        openSlider: function() {
            this.mapSlider.$el.find('#add-tracker').toggleClass('open');
        },

        render: function (router) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.mapSlider = router.showView(new MapSliderView())
            return this;
        }
    });

    return MapHeaderView;

});