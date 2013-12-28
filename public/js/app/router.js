// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/HeaderView',
    'views/ValidationMessageView',
    'views/SubMenuView',
    'views/map/MapView', 'views/map/MapHeaderView', 'views/map/MapSliderView', 'views/map/MapTabsView',
    'views/objects/ObjectSliderView',
    'views/objects/ObjectsView',
    'views/geozones/GeoZonesView',
    'views/trackers/TrackersView'
], function($, _, Backbone,
            HeaderView, ValidationMessage,
            SubMenuView,
            MapView, MapHeaderView, MapSliderView, MapTabsView,
            ObjectSliderView, ObjectsView,
            GeoZonesView, TrackersView) {

    window.App = {
        views: {},
        models: {},
        templates: {},
        socket: null,
        errorView: null,
        config: {
            serviceUrl: window.location.origin+ "/api/",
            socketOptions: {
                reconnect: true
            }
        }
    };

    var Router = Backbone.Router.extend({

        initialize: function() {
            this.views = {};
            window.App.errorView = new ValidationMessage();
            this.showView(new HeaderView());
            this.showView(new SubMenuView());
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
            this.showView(new MapView(), function() {
                _this.showView(new MapTabsView());
            });
            this.showView(new MapHeaderView());
            this.showView(new MapSliderView());
        },

        objects: function() {
            this.makeActive('objects');

            this.showView(new ObjectSliderView());
            this.showView(new ObjectsView());
        },

        geozones: function() {
            this.makeActive('geozones');

            this.showView(new GeoZonesView());
        },

        trackers: function() {
            this.makeActive('trackers');

            this.showView(new TrackersView());
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

    var initialize = function(){

        var app = new Router;
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});