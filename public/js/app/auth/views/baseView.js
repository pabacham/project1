(function (app, $, _, Backbone) {
	"use strict";

	app.views.BaseView = Backbone.View.extend({
        bindValidation: false,

        showErrors: function(errors) {
            var _this = this;
            app.errorView.errorMessages = {};

            _.each(errors, function(value, key) {
                if(typeof value == 'object') {
                    app.errorView.errorMessages[key] = value.message;
                } else {
                    app.errorView.errorMessages[key] = value;
                }
                _this.$el.find('input[name="'+ key +'"]').addClass('error');
            });

            app.errorView.showContainer();
        },

        hideErrors: function() {
            app.errorView.closeContainer();
        },

		getTemplate: function () {
			var template = "<h1>No Template</h1>";

			if(_.isString(this.templateName) && this.templateName.length > 0){
				var templateSelector = $('#' + this.templateName);

				if(_.has(app.templates, this.templateName)){
					template = app.templates[this.templateName];
				}
				else if(templateSelector.length === 1){
					template = app.templates[this.templateName] = templateSelector.html();
				}
			}

			return template;
		}
	});
})(window.App, window.$, window._, window.Backbone);
