(function (window, $, _, views) {
    "use strict";

    views.MapView = views.BaseView.extend({
        templateName: "mapTemplate",
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

