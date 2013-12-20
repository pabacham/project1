(function(global, $, _, Backbone) {
    "use strict";

    global.App = {
        views: {},
        models: {},
        templates: {},
        socket: null,
        config: {
            serviceUrl: global.location.origin+ "/api/"
        }
    };

    var views = global.App.views,
        models = global.App.models;

    global.App.socket = io.connect('', {
        reconnect: false
    });

    global.App.socket
        .on('connect', function() {
            console.log('socket connected');
        })
        .on('disconnect', function() {
            console.log('socket disconnected');
            setTimeout(reconnect, 500);
        });


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

    function reconnect() {
        global.App.socket.once('error', function() {
            setTimeout(reconnect, 500);
        });
        global.App.socket.socket.connect();
    }

})(window, window.$, window._, window.Backbone);
