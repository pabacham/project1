(function (window, $, _, views) {
    "use strict";

    views.ValidationMessage = views.BaseView.extend({
        templateName: "validationMessage",
        container: "#message-error",
        initialize: function () {

        },
        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

