(function (window, $, _, views) {
    "use strict";

    views.RegisterView = views.BaseView.extend({
        templateName: "registerTemplate",
        container: "#main-section",
        initialize: function (model, router) {
            this.model = model;
            this.listenTo(this.model, 'sync', function(e) {
                router.navigate('/');
                router.login();
            });
        },
        events: {
            "click #register-btn": "registerUser"
        },
        registerUser: function () {
            var user = {
                username: $('input[name="reg-name"]').val(),
                email: $('input[name="reg-email"]').val(),
                password: $('input[name="reg-first-pswd"]').val(),
                confirmPassword: $('input[name="reg-sec-pswd"]').val()
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
