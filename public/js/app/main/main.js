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
            this.showView(new views.HeaderView());
            this.showView(new views.SubMenuView());
        },

        routes: {
            "": "main",
            "map": "main",
            "objects": "objects",
            "geozones": "geozones",
            "trackers": "trackers"
        },

        main: function() {
            this.showView(new views.MapView());
        },

        objects: function() {
            this.showView(new views.ObjectsView());
        },

        geozones: function() {
            this.showView(new views.GeoZonesView());
        },

        trackers: function() {
            this.showView(new views.TrackersView());
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
