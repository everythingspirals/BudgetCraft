var liveHandler = Plaid.create({
    clientName: 'SUM',
    env: 'tartan',
    product: 'connect',
    key: 'cca99278d5ff22924a4c21a1281086',
    onSuccess: function (token) {
        var data = JSON.stringify({
            public_key: token
        });
        $.ajax({
            method: "POST",
            url : "/accounts",
            contentType: "application/json",
            data:data
        })
        .done(function() {
            window.location = '/accounts';
        });
    }
   });

$('#liveLinkButton').click(function () {
    liveHandler.open();
});