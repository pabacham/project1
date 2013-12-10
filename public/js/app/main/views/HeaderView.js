(function (window, $, _, views) {
    "use strict";

    views.HeaderView = views.BaseView.extend({
        templateName: "headerTemplate",
        container: "header.header",
        initialize: function () {
        },
        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

