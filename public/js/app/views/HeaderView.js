define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    "use strict";
    var HeaderView = BaseView.extend({
        templateName: "headerTemplate",
        container: "header.header",
        initialize: function () {

        },

        events: {

        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return HeaderView;

});



