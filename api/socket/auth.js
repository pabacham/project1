module.exports = function(io) {

    var sessionStore = require('libs/sessionStore'),
        config = require('config'),
        async = require('async'),
        cookie = require('cookie'),
        connect = require('connect'),
        HttpError = require('error').HttpError,
        log = require('libs/log')(module),
        User = require('api/models/user').User,
        loadSession = function(sid, callback) {
            // sessionStore callback is not quite async-style!
            sessionStore.load(sid, function(err, session) {
                if (arguments.length == 0) {
                    // no arguments => no session
                    return callback(null, null);
                } else {
                    return callback(null, session);
                }
            });
        },
        loadUser = function(session, callback) {
            if (session && !session.user) {
                log.debug("Session %s is anonymous", session.id);
                return callback(null, null);
            }

            log.debug("retrieving user ", session.user._id);

            User.findById(session.user._id, function(err, user) {
                if (err) return callback(err);

                if (!user) {
                    return callback(null, null);
                }
                log.debug("user findbyId result: " + user);
                callback(null, user);
            });
        }


    io.set('authorization', function(handshake, callback) {
        async.waterfall([
            function(callback) {
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                var sidCookie = handshake.cookies[config.get('session:key')];
                var sid = connect.utils.parseSignedCookie(sidCookie, config.get('session:secret'));

                loadSession(sid, callback);
            },
            function(session, callback) {

                if (!session) {
                    callback(new HttpError(401, "No session"));
                }

                handshake.session = session;
                loadUser(session, callback);
            },
            function(user, callback) {
                if (!user) {
                    callback(new HttpError(403, "Anonymous session may not connect"));
                }

                handshake.user = user;
                callback(null);
            }

        ], function(err) {
            if (!err) {
                return callback(null, true);
            }

            if (err instanceof HttpError) {
                return callback(null, false);
            }

            callback(err);
        });

    });

    io.sockets.on('session:reload', function(sid) {
        var clients = io.sockets.clients();

        clients.forEach(function(client) {
            if (client.handshake.session.id != sid) return;

            loadSession(sid, function(err, session) {
                if (err) {
                    client.emit("error", "server error");
                    client.disconnect();
                    return;
                }

                if (!session) {
                    client.emit("logout");
                    client.disconnect();
                    return;
                }

                client.handshake.session = session;
            });

        });

    });

    return io;
};