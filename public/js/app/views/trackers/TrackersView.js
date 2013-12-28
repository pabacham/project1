define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    var TrackersView = BaseView.extend({
        templateName: "trackersTemplate",
        container: ".map-block",
        initialize: function () {
        },
        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return TrackersView;

});