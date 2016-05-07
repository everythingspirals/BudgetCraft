module.exports = function(app, pg){
    
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

        var public_key = req.body.public_key;
        var test_user = '35075a4c-0d42-40f3-bb7f-361e72699154'
        var conString = "postgres://postgres:redpanda@159.203.223.194/budgetcraft"
       
        //Connect to Postgresql server  
        pg.connect(conString, function(err, client, done){
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success:false, data:err});
            }
            
            
            //Run createUserKey function and pass in public_key, and test_user
            var query = client.query("SELECT user_keys_create($1, $2)", [test_user, public_key] );
                  
            // After all data is returned, close connection  and res.send result of insert
            query.on('end', function(){
                done();
            });
        });
       
    });

}