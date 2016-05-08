module.exports = function(app, pg, conn){
    
    //Get Accounts
    app.get('/accounts', function(req, res, next) {
        //var userId = req.query.userId;
        //get public key from UserKeys
        //var public_token;
        //PlaidHelper.getAccounts(public_token);
        res.render('accounts', {
            model:{
                accounts: [{
                    name:"Bank of America",
                    balance:1000000
        
                }]
            }
        });    
    });

    //Add Account
    app.post('/accounts', function(req, res, next) {
        var public_key = req.body.public_key,
            userId = req.session.user.userId;
            
       console.log(req.public_key);

        //Connect to Postgresql server  
        pg.connect(conn, function(err, client, done){
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success:false, data:err});
            }
                        
            //Run createUserKey function and pass in public_key, and test_user
            client.query("SELECT user_keys_create($1, $2)", [userId, public_key] );
            
            done();
                  
            return res.send();
        });
      
    });
}