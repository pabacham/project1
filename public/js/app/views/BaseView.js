define([
    'jquery',
    'underscore',
    'backbone'

], function($, _, Backbone){

    var BaseView = Backbone.View.extend({
        bindValidation: false,

        showErrors: function(errors) {
            var _this = this;
            window.App.errorView.errorMessages = {};

            _.each(errors, function(value, key) {
                if(typeof value == 'object') {
                    window.App.errorView.errorMessages[key] = value.message;
                } else {
                    window.App.errorView.errorMessages[key] = value;
                }
                _this.$el.find('input[name="'+ key +'"]').addClass('error');
            });

            window.App.errorView.showContainer();
        },

        hideErrors: function() {
            window.App.errorView &&
            window.App.errorView.closeContainer();
        },

        getTemplate: function () {
            var template = "<h1>No Template</h1>";
            if(_.isString(this.templateName) && this.templateName.length > 0){
                var templateSelector = $('#' + this.templateName);

                if(_.has(window.App.templates, this.templateName)){
                    template = window.App.templates[this.templateName];
                }
                else if(templateSelector.length === 1){
                    template = window.App.templates[this.templateName] = templateSelector.html();
                }
            }

            return template;
        }
    });

    return BaseView;

});