//Models
var User = require("./user.model");

module.exports = function(app, pg, conn){  
    //Login
    app.get('/login', function(req, res, next) {
        res.render('login');    
    });
        
    app.post('/login', function(req, res, next) {
        console.log(req.body);
        var googleId = req.body.googleId,
            name = req.body.name,
            avatar = req.body.avatar,
            user = new User(googleId,name,avatar);
            
        req.session.user = user;
        res.send('200','Login successful');
    });

    app.get('/user', function(req, res, next) {
        console.log(req.session.user);
        res.render('user',{
            user: req.session.user
        });    
    });
};