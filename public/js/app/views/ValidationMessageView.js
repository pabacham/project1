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

        showErrors: function(errors, view) {
            var _this = this;
            this.errorMessages = {}

            _.each(errors, function(value, key) {
                if(typeof value == 'object') {
                    _this.errorMessages[key] = value.message;
                } else {
                    _this.errorMessages[key] = value;
                }
                view.$el.find('input[name="'+ key +'"]').addClass('error');
            });

            this.showContainer();
        },

        hideErrors: function() {
            this.errorView &&
            this.errorView.closeContainer();
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

    return new ValidationMessageView();

});