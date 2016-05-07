module.exports = function(){
    
    var PlaidHelper = {
        exchangeToken: function (public_token, callback) {
            plaidClient.exchangeToken(public_token, function (err, tokenResponse) {
                if (err != null) {
                    res.json({ error: 'Unable to exchange public_token' });
                } else {
                    var access_token = tokenResponse.access_token;
                    callback(access_token);
                }
            });
        },

        getConnectedUser(access_token) {
            plaidClient.getConnectUser(access_token, function (err, connectResponse) {
                if (err != null) {
                    res.json({ error: 'Unable to pull accounts from the Plaid API' });
                } else {
                    res.json({ accounts: connectResponse.accounts });
                }
            });
        }
    }
}
