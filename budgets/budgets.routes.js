module.exports = function (app, pg, conn) {
        
    app.get('/budget-groups', function(req,res){
        var userId = req.session.user.userId;
        
        //connect to db
        //run get budget groups by user with user id
        //assign some variable to the result
       res.send({
           budgetGroups: [] //put the result here
       }) 
    });
}