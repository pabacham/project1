define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    var Preloader = BaseView.extend({
        templateName: 'preloadTemplate',
        container: "#preloader",
        initialize: function () {

        },

        events: {
        },

        startPreloader: function(){
            this.$el.addClass('open')
        },

        finishPreloader: function() {
            this.$el.removeClass('open')
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return Preloader;

});

