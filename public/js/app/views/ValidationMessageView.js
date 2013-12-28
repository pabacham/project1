define([
    'jquery',
    'underscore',
    'views/BaseView'

], function($, _, BaseView){

    var ValidationMessageView = BaseView.extend({
        templateName: "validationMessage",
        container: "#message-error",
        errorMessages: {},
        isOpened: false,

        events: {
            'click .close-message': 'closeContainer'
        },

        initialize: function () {

        },

        showContainer: function () {
            if(Object.keys(this.errorMessages).length) {
                this.$el.html(_.template(this.getTemplate(), { errors: this.errorMessages }));
                $(this.container).html(this.$el).addClass('open');
                this.delegateEvents();
                this.isOpened = true;
            }

            return this;
        },

        closeContainer: function() {
            if($(this.container).hasClass('open')) {
                this.$el.find('ul').html('');
                $(this.container).removeClass('open').html(this.$el);
                this.isOpened = false;
            }

            return this;
        }
    });

    return ValidationMessageView;

});