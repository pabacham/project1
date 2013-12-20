
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('routes/routes'),
    http = require('http'),
    config = require('config'),
    log = require('libs/log')(module),
    HttpError = require('error').HttpError,
    mongoose = require('libs/mongoose'),
    path = require('path');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded())
app.use(express.json())
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));

var MongoStore = require('connect-mongo')(express);

app.use(express.session({
    secret: config.get('session:secret'), // ABCDE242342342314123421.SHA256
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongoose_connection: mongoose.connection})
}));

app.use(require('middleware/sendHttpError'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    }
    //for node-validator
    else if(err.name && err.name == 'ValidatorError') {
        res.send({error: true, name: err.name, message: err.message, success: false});
    }
    //for Mongoose Validation
    else if(err.name && err.name == 'ValidationError') {
        res.send({errors: err.errors, success: false});
    } else {
        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

//routes mapping
routes(app);

var server = http.createServer(app);
server.listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});

require('./socket')(server);