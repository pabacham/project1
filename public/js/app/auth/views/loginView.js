(function (window, $, _, views) {
    "use strict";

    views.LoginView = views.BaseView.extend({
        templateName: "loginTemplate",
        container: "#main-section",
        isAlreadyRendered: false,
        bindValidation: true,
        formContainer: '#login-form',

        initialize: function (model, isAlreadyRendered) {
            this.model = model;
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
            this.model.set({
                email: $('input[name="email"]').val(),
                password: $('input[name="password"]').val()
            });

            if(this.model.isValid(true)) {
                $.ajax({
                    url: this.model.url,
                    type:'POST',
                    dataType:"json",
                    data: this.model.attributes,
                    success:function (data) {
                        data.isRegistered && (window.location.href = 'app');
                    }
                });
            }
        },
        render: function () {
            var _this = this;

            this.$el.html(_.template(this.getTemplate()));

            if(this.isAlreadyRendered) {
                $(this.container).html(this.$el);
                this.$el.find('input[name="email"]').focus();
            } else {
                $(this.container).hide().html(this.$el).delay(150).fadeIn(600, function() {
                    _this.$el.find('input[name="email"]').focus();
                });
            }

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

