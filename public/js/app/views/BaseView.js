define([
    'jquery',
    'underscore',
    'backbone',
    'config'

], function($, _, Backbone, config){

    var BaseView = Backbone.View.extend({
        bindValidation: false,

        getTemplate: function () {
            var template = "<h1>No Template</h1>";
            if(_.isString(this.templateName) && this.templateName.length > 0){
                var templateSelector = $('#' + this.templateName);

                if(_.has(config.templates, this.templateName)){
                    template = config.templates[this.templateName];
                }
                else if(templateSelector.length === 1){
                    template = config.templates[this.templateName] = templateSelector.html();
                }
            }

            return template;
        }
    });

    return BaseView;

});