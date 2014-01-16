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
            'click .hide-tab': 'closeTabs',
            'click ul#object-detail li a': 'chooseTab'
        },

        openTabs: function(e) {
            this.$el.find('.tab-on-map').addClass('open');
        },

        closeTabs: function() {
            this.$el.find('.tab-on-map').removeClass('open');
        },

        chooseTab: function(e) {
            e.preventDefault();
            var tab = this.$el.find(e.currentTarget);

            this.$el.find('ul#object-detail li.selected').removeClass('selected');
            this.$el.find('.tab-for-detail').hide();

            tab.parent('li').addClass('selected');
            this.$el.find(tab.data('linked')).show();
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return MapTabsView;

});
