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
            username: [
                { required: true, msg: 'Please enter username' },
                {
                    range: [4, 16],
                    msg: 'Username should be more than 4 and less than 16 characters long'
                }
            ],
            email: [
                { required: true, msg: 'Please enter email' },
                { pattern: 'email', msg: 'Please enter a correct email' }
            ],
            password: [
                { required: true, msg: 'Please enter password' },
                {
                    minLength: 4,
                    msg: 'Password should be more than 4 characters long'
                }
            ],
            confirmPassword: [
                { required: true, msg: 'Please enter confirmation password' },
                { equalTo: 'password', msg: 'Passwords are not equal' }
            ]
        },

        url: app.config.serviceUrl + 'auth/register'
	});
})(window.App, window.Backbone);
