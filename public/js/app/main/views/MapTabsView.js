(function (window, $, _, views) {
    "use strict";

    views.MapTabsView = views.BaseView.extend({
        templateName: "mapTabsTemplate",
        container: "#map-tabs",
        initialize: function () {

        },

        events: {
            'click #object-detail li': 'openTabs',
            'click .hide-tab': 'closeTabs'
        },

        openTabs: function() {
            this.$el.find('.tab-on-map').addClass('open');
        },

        closeTabs: function() {
            this.$el.find('.tab-on-map').removeClass('open');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

