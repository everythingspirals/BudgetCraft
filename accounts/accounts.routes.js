var bluebird = require('bluebird');

module.exports = function (app, pg, conn, plaidClient) {
    var exchangeToken = bluebird.promisify(plaidClient.exchangeToken, {context: plaidClient});  
    var getConnectUser = bluebird.promisify(plaidClient.getConnectUser, {context: plaidClient});  
    
    //Get Accounts
    app.get('/accounts', function (req, res, next) {

        if (!req.session.user) {
            return res.status(401);
        }

        var userId = req.session.user.userId,
        results, accounts, access__tokens;

        pg.connect(conn, function (err, client, done) {
            if (err) {
                done();
                console.log(err);
                return res.status(500);
            }

            client.query("SELECT * FROM user_keys_get($1)", [userId], function (err, result) {
                    results = result.rows,
                    access_tokens = results.map(function (row) {
                        return exchangeToken(row.public_key);
                    });

             Promise.all(access_tokens)
                    .then(function (results) {
                        var date = new Date(),
                            day = date.getDate();

                        accounts = results.map(function(row){
                            return getConnectUser(row.access_token, {
                                    gte: day + ' days ago',
                                   });
                        });
                        
                         Promise.all(accounts)
                            .then(function (results) {
                                res.render('accounts', {
                                    model:  {
                                        banks : results
                                    }
                                });
                            })
                            .catch(function(err){
                                  console.log(err);
                            });;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });

            done();
    });
});

//Add Account
app.post('/accounts', function (req, res, next) {
    var public_key = req.body.public_key,
        userId = req.session.user.userId;

    pg.connect(conn, function (err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }

        //Run createUserKey function and pass in public_key, and test_user
        client.query("SELECT user_keys_create($1, $2)", [userId, public_key]);
        done();

        res.send('200', 'Account added.');
    });
});
}