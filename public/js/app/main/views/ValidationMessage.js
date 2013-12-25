(function (window, $, _, views) {
    "use strict";

    views.ValidationMessage = views.BaseView.extend({
        templateName: "validationMessage",
        container: "#message-error",
        errorMessages: {},

        events: {
            'click .close-message': 'closeContainer'
        },

        initialize: function () {

        },

        showContainer: function () {
            if(Object.keys(this.errorMessages).length) {
                this.$el.html(_.template(this.getTemplate(), { errors: this.errorMessages }));
                $(this.container).html(this.$el).addClass('open');
                this.delegateEvents();
            }

            return this;
        },

        closeContainer: function() {
            if($(this.container).hasClass('open')) {
                this.$el.find('ul').html('');
                $(this.container).removeClass('open').html(this.$el);
            }

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

