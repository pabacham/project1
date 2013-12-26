(function (window, $, _, views) {
    "use strict";

    views.MapHeaderView = views.BaseView.extend({
        templateName: "mapHeaderTemplate",
        container: "#map-header",
        initialize: function () {
            this.slider = $('.slider-body');
        },

        events: {
            'click #map_slider_open': 'openSlider'
        },

        openSlider: function() {
            this.slider.toggleClass('open');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

