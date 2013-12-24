(function (window, $, _, views) {
    "use strict";

    views.RegisterView = views.BaseView.extend({
        templateName: "registerTemplate",
        container: "#main-section",
        bindValidation: true,
        initialize: function (model) {
            this.model = model;
            this.listenTo(this.model, 'sync', function(e) {
                window.location.hash = '#';
            });
        },
        events: {
            "click #register-btn": "registerUser",
            'keypress .form': 'processKey'
        },

        processKey: function(e) {
            if(e.which === 13){ // enter key
                this.registerUser();
            }
        },

        registerUser: function () {

            var user = {
                username: $('input[name="username"]').val(),
                email: $('input[name="email"]').val(),
                password: $('input[name="password"]').val(),
                confirmPassword: $('input[name="confirmPassword"]').val()
            };
            this.model.save(user);
        },
        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);
