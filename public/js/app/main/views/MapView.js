(function (window, $, _, views) {
    "use strict";

    views.MapView = views.BaseView.extend({
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

        render: function (callback) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.googleMapInitialize(callback);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

