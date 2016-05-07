//Models
User = require("./user.model");
    
module.exports = function(app){
    //Login
    app.get('/login', function(req, res, next) {
        res.render('login')    
    });
     
    app.post('/login', function(req, res, next) {
        var userId = req.body.userId,
            name = req.body.name,
            avatar = req.body.avatar,
            user = new User(userId,name,avatar);
            
        req.session.user = "HIII!!!";
        console.log(req.session.user);
    });
    
   app.get('/user', function(req, res, next) {
       console.log(req.session.user);
        res.render('user',{
            user: req.session.user
        });    
    });
}
