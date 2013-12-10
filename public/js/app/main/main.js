(function(global, $, _, Backbone) {
    "use strict";

    global.App = {
        views: {},
        models: {},
        templates: {},
        config: {
            serviceUrl: global.location.origin+ "/api/"
        }
    };

    var views = global.App.views,
        models = global.App.models;


    var Router = Backbone.Router.extend({

        initialize: function() {
            this.views = {};
        },

        routes: {
            "": "main"
        },

        main: function() {
            this.showView(new views.HeaderView());
        },

        showView: function(view){
            if(_.has(this.views, view.container)){
                this.views[view.container].remove();
            }

            view.render();

            this.views[view.container] = view;
        }
    });

    $(function() {
        global.app = new Router();
        Backbone.history.start();
    });
})(window, window.$, window._, window.Backbone);
