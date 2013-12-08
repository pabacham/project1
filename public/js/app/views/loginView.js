(function (window, $, _, views) {
    "use strict";

    views.LoginView = views.BaseView.extend({
        templateName: "loginTemplate",
        container: "#main-section",
        initialize: function () {
        },
        events: {
            "click #login-btn": "login"
        },
        login: function () {
            var formValues = {
                email: $('input[name="login-email"]').val(),
                password: $('input[name="login-password"]').val()
            };
            $.ajax({
                url: window.App.config.serviceUrl + 'auth/login',
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {
                    data.isRegistered && (window.location.href = 'app');
                }
            });
        },
        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

