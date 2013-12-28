(function(global, $, _, Backbone) {
    "use strict";

    global.App = {
        views: {},
        models: {},
        templates: {},
        socket: null,
        errorView: null,
        config: {
            serviceUrl: global.location.origin+ "/api/",
            socketOptions: {
                reconnect: true
            }
        }
    };

    var views = global.App.views,
        models = global.App.models;


    global.App.socket = io.connect('', global.App.config.socketOptions);

    global.App.socket
        .on('connect', function() {
            console.log('socket connected');
        })
        .on('disconnect', function() {
            console.log('socket disconnected');
        })
        .on('logout', function() {
            location.href = "/";
        })
        .on('talk', function(data) {
            console.debug(data.message);
        })
        .on('error', function(reason) {
            if (reason == "handshake unauthorized") {
                console.log('you are logged out');
            } else {
                setTimeout(function() {
                    global.App.socket.socket.connect();
                }, 500);
            }
        });


    var Router = Backbone.Router.extend({

        initialize: function() {
            this.views = {};
            global.App.errorView = new views.ValidationMessage();
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
            var _this = this;

            this.makeActive('map');
            this.showView(new views.MapView(), function() {
                _this.showView(new views.MapTabsView());
            });

            this.showViews([
                { view: views.MapHeaderView },
                { view: views.MapSliderView }
            ]);
        },

        objects: function() {
            this.showView(new views.ObjectSliderView());
            this.showView(new views.ObjectsView());
            this.makeActive('objects');
            global.App.socket.emit('test');
        },

        geozones: function() {
            this.showView(new views.GeoZonesView());
            this.makeActive('geozones');
        },

        trackers: function() {
            this.showView(new views.TrackersView());
            this.makeActive('trackers');
        },

        makeActive: function(pageName) {
            this.views['ul.sub-menu'].$el.find('a[href="#'+ pageName +'"]').parent('li').addClass('active');
        },

        showView: function(view, callback){
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
            view.render(callback);

            this.views[view.container] = view;
        },

        showViews: function(views) {
            var _this = this;

            if(typeof views == 'object') {
                _.each(views, function(item) {
                    if(item.model) {
                        _this.showView(new item.view(new item.model()));
                    } else {
                        _this.showView(new item.view());
                    }
                });
            }
        }
    });

    $(function() {
        global.app = new Router();
        Backbone.history.start();
    });

})(window, window.$, window._, window.Backbone);
