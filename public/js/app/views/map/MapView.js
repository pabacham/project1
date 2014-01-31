define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/map/MapTabsView',
    'views/map/MapHeaderView',
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDsf4WcN4BV1sBD806SLf05zddqcMISZno&sensor=false'
], function($, _, BaseView, MapTabsView, MapHeaderView){

    var MapView = BaseView.extend({
        templateName: "mapTemplate",
        container: ".map-block",
        router: null,
        mapTabsView: null,
        mapHeaderView: null,

        initialize: function () {

        },

        events: {
        },

        mapOptions: {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8
        },

        googleMapInitialize: function() {
            var mapCanvas = this.$el.find('#map-canvas'),
                _this = this;

            this.map = new google.maps.Map(mapCanvas.get(0), this.mapOptions);
            google.maps.event.addListenerOnce(this.map, 'tilesloaded', function(){
               this.mapTabsView =  _this.router.showView(new MapTabsView());
            });
        },

        render: function (router) {
            this.router = router;
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.mapTabsView =  router.showView(new MapHeaderView());
            this.googleMapInitialize();

            return this;
        }
    });

    return MapView;

});