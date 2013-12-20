(function (window, $, _, views) {
    "use strict";

    views.HeaderView = views.BaseView.extend({
        templateName: "headerTemplate",
        container: "header.header",
        initialize: function () {
            window.App.socket.on('user:logout', function(res) {
                console.log(res);
            });
        },

        events: {
            'click a#user-logout': 'logout'
        },

        logout: function() {
            window.App.socket.emit('user:logout');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

