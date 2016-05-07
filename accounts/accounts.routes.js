module.exports = function(app){
    
    //Get Accounts
    app.get('/accounts', function(req, res, next) {
        //var userId = req.query.userId;
        //get public key from UserKeys
        //var public_token;
        //PlaidHelper.getAccounts(public_token);
        res.render('accounts',{
            accounts:[]
        })    
    });

    //Add Account
    app.post('/accounts', function(req, res, next) {
        res.send(req.body.publictoken);
        //add public key to UserKeys
    });

}