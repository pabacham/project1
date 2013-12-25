(function(global, $, _, Backbone) {
    "use strict";

    global.App = {
        views: {},
        models: {},
        templates: {},
        errorView: null,
        config: {
            serviceUrl: global.location.origin+ "/api/"
        }
    };

    var views = global.App.views,
        models = global.App.models;

    var Router = Backbone.Router.extend({

        initialize: function() {
            this.views = {};
            this.isLoginAlreadyRendered = false;
            global.App.errorView = new views.ValidationMessage();
        },

        routes: {
            "": "login",
            "login": "login",
            "register": "register"
        },

        login: function() {
            this.showView(new views.LoginView(new models.UserLoginModel(), this.isLoginAlreadyRendered));
            this.isLoginAlreadyRendered = true;
        },

        register: function() {
            this.showView(new views.RegisterView(new models.UserModel()));
        },

        showView: function(view){
            if(_.has(this.views, view.container)){
                this.views[view.container].remove();
            }

            //if there is need to validate view model
            if(view.bindValidation) {
                Backbone.Validation.bind(view, {
                    valid: function(view, attr) {
                        view.$el.find('input[name="'+ attr +'"]').removeClass('error');
                    }
                });

                //on validation event
                view.model &&
                    view.model.bind('validated', function(isValid, model, errors) {
                        if(!isValid) {
                            view.showErrors(errors);
                        }
                    });
            }

            view.hideErrors();
            view.render();

            this.views[view.container] = view;
        }
    });

    $(function() {
        global.app = new Router();
        Backbone.history.start();
    });
})(window, window.$, window._, window.Backbone);
