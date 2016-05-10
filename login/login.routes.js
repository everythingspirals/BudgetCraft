//Models
var User = require("./user.model");

module.exports = function (app, pg, conn) {
    //Login
    app.get('/login', function (req, res, next) {
        res.render('login');
    });

    app.post('/login', function (req, res, next) {
        var googleId = req.body.googleId,
            name = req.body.name,
            avatar = req.body.avatar,
            userId = null;
            
        user = new User(googleId, name, avatar);
        req.session.user = user;
        
        pg.connect(conn, function (err, client, done) {
            if (err) {
                done();
                return res.status(500).json({ success: false, data: err });
            }

            //Get User By Google Id
            client.query("SELECT * FROM users_get_by_google_id($1)",
                [googleId],
                function (err, result) {
                    if (result.rowCount) {
                        userId = result.rows[0].id;
                        user.login(userId);
                        res.status(200).send('Login successful');
                    } else {
                        //Create User
                        client.query("SELECT * FROM users_create($1)",
                            [googleId],
                            function (err, result) {
                                console.log(result);
                                userId = result.rows[0].user_id;
                                user.login(userId);
                                res.status(200).send('Login successful');
                            });
                    }
                });
        });
    });

    app.get('/user', function (req, res, next) {
        console.log(req.session.user);
        res.render('user', {
            user: req.session.user
        });
    });
};