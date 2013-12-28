define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    var MapTabsView = BaseView.extend({
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

    return MapTabsView;

});
