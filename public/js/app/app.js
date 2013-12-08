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
            "": "login",
            "login": "login",
            "register": "register"
        },

        login: function() {
            this.showView(new views.LoginView());
        },

        register: function() {
            this.showView(new views.RegisterView(new models.UserModel()));
        },
        /*note: function(id) {
            this.noteList.invoke("active", false);
            this.showView(new views.NoteView(this.noteList.get(id), id));
        },
        addNote: function() {
            this.noteList.invoke("active", false);
            this.showView(new views.AddNoteView(this.noteList));
        },
        editNote: function(id) {
            this.noteList.invoke("active", false);
            this.showView(new views.EditNoteView(this.noteList.get(id), id));
        },*/

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
