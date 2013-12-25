(function (window, $, _, views) {
    "use strict";

    views.ObjectsView = views.BaseView.extend({
        templateName: "objectsTemplate",
        container: ".map-block",
        initialize: function () {
            this.slider = $('.slider-body');
        },

        events: {
            'click #add-new-object' : 'openSlider',
            'click .add-new-object' : 'openSlider'
        },

        openSlider: function(){
            this.slider.toggleClass('open');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });
})(window, window.$, window._, window.App.views);

