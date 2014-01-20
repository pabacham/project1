define([
    'jquery',
    'underscore',
    'views/BaseView',
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDsf4WcN4BV1sBD806SLf05zddqcMISZno&sensor=false'
], function($, _, BaseView){

    var MapView = BaseView.extend({
        templateName: "mapTemplate",
        container: ".map-block",
        mapOptions: {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8
        },

        googleMapInitialize: function(callback) {
            var mapCanvas = this.$el.find('#map-canvas');

            this.map = new google.maps.Map(mapCanvas.get(0), this.mapOptions);
            google.maps.event.addListenerOnce(this.map, 'tilesloaded', function(){
                callback && callback();
            });
        },

        initialize: function () {

        },

        events: {

        },

        render: function (router, callback) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.googleMapInitialize(callback);

            return this;
        }
    });

    return MapView;

});