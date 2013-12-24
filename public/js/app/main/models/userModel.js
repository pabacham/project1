(function(app, Backbone) {
	"use strict";

	app.models.UserModel = Backbone.Model.extend({
		defaults: {
			username: '',
            email: '',
            password: '',
            confirmPassword: ''
		},

        validation: {
            username: {
                required: true,
                msg: 'Please enter an username'
            }
        },

        url: app.config.serviceUrl + 'auth/register'
	});
})(window.App, window.Backbone);
