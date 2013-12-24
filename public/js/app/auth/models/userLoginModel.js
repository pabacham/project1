(function(app, Backbone) {
    "use strict";

    app.models.UserLoginModel = Backbone.Model.extend({
        defaults: {
            email: '',
            password: ''
        },

        validation: {
            email: [
                { required: true, msg: 'Please enter email' }

                //TODO: temporary disabled for development
                //{ pattern: 'email', msg: 'Please enter a correct email' }
            ],
            password: [
                { required: true, msg: 'Please enter password' },
                {
                    minLength: 4,
                    msg: 'Password should be more than 4 characters long'
                }
            ]
        },

        url: app.config.serviceUrl + 'auth/login'
    });
})(window.App, window.Backbone);
