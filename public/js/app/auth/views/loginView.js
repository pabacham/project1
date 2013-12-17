(function (window, $, _, views) {
    "use strict";

    views.LoginView = views.BaseView.extend({
        templateName: "loginTemplate",
        container: "#main-section",
        isAlreadyRendered: false,
        initialize: function (model, isAlreadyRendered) {
            this.isAlreadyRendered = isAlreadyRendered;
        },
        events: {
            'click #login-btn': 'login',
            'keypress .form': 'processKey'
        },

        processKey: function(e) {
            if(e.which === 13){ // enter key
                this.login();
            }
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
            var _this = this;

            this.$el.html(_.template(this.getTemplate()));

            if(this.isAlreadyRendered) {
                $(this.container).html(this.$el);
                this.$el.find('input[name="login-email"]').focus();
            } else {
                $(this.container).hide().html(this.$el).delay(150).fadeIn(600, function() {
                    _this.$el.find('input[name="login-email"]').focus();
                });
            }

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

