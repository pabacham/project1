define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    var GeoZonesView = BaseView.extend({
        templateName: "geoZonesTemplate",
        container: ".map-block",
        initialize: function () {
        },
        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return GeoZonesView;

});

