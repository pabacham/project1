(function (window, $, _, views) {
    "use strict";

    views.MapView = views.BaseView.extend({
        templateName: "mapTemplate",
        container: ".map-block",
        initialize: function () {
            this.slider = $('.slider-body');

        },

        events: {
            'click #map_slider_open': 'openSlider',
            'click #object-detail li': 'openTabs',
            'click .hide-tab': 'closeTabs'
        },

        openSlider: function() {
            this.slider.toggleClass('open');
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

