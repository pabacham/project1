(function (window, $, _, views) {
    "use strict";

    views.TrackersView = views.BaseView.extend({
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
})(window, window.$, window._, window.App.views);

