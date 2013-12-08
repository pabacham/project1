var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', {
            title: 'NodeJS'
        });
    });

    app.get('/app', checkAuth, function(req, res) {
       res.send(req.session);
    });

    app.post('/api/auth/login', require('./API/Auth').login);
    app.post('/api/auth/register', require('./API/Auth').register);
}
