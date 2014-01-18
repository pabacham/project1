// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
requirejs.config({
    baseUrl: 'js/app',
    paths: {
        async: 'libs/require/async',
        jquery: 'libs/jquery/jquery',
        'jquery-select2': 'libs/others/select2.min',
        'jcrop': 'libs/others/jquery.Jcrop.min',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        socketio: '../../socket.io/socket.io'
    },
    shim: {
        'jquery-select2': {
            deps: ['jquery'],
            exports: 'select2'
        },
        'jcrop': {
            deps: ['jquery'],
            exports: 'jcrop'
        },
        'socketio': {
            exports: 'io'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }

});

requirejs([

    // Load our app module and pass it to our definition function
    'app'
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});
