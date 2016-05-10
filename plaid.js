module.exports = function(plaidClient){
    var PlaidHelper = {
        exchangeToken: function (public_token) {
            plaidClient.exchangeToken(public_token, function (err, tokenResponse) {
                 console.log("public key ", public_token);
                if (err != null) {
                    console.log("error: ", err);
                } else {
                    return tokenResponse.access_token;
                }
            });
        },
        getConnectUser(access_token) {
            plaidClient.getConnectUser(access_token, function (err, connectResponse) {
                if (err != null) {
                    console.log(err);
                } else {
                    console.log(connectResponse);
                    return connectResponse.accounts;
                }
            });
        }
    };
    
    return PlaidHelper;
}

