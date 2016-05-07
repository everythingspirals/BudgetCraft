var liveHandler = Plaid.create({
    clientName: 'SUM',
    env: 'tartan',
    product: 'auth',
    key: 'cca99278d5ff22924a4c21a1281086',
    onSuccess: function (token) {
        $.post('/accounts',
            {
                public_key: token
            }, function () {
                window.location = '/accounts';
            });
    },
});

$('#liveLinkButton').click(function () {
    liveHandler.open();
});