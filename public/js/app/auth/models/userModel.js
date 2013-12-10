(function(app, Backbone) {
	"use strict";

	app.models.UserModel = Backbone.Model.extend({
		defaults: {
			username: '',
            email: '',
            password: '',
            confirmPassword: ''
		},
        url: app.config.serviceUrl + 'auth/register'
	});
})(window.App, window.Backbone);
