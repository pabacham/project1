(function (window, $, _, views) {
    "use strict";

    views.ValidationMessage = views.BaseView.extend({
        templateName: "validationMessage",
        container: "#message-error",
        errorMessages: {},
        initialize: function () {

        },

        showContainer: function () {
            console.log({ errors: this.errorMessages })
            this.$el.html(_.template(this.getTemplate(), { errors: this.errorMessages }));
            $(this.container).html(this.$el).addClass('open');

            return this;
        },

        closeContainer: function() {
            this.$el.html('');
            $(this.container).removeClass('open').html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

