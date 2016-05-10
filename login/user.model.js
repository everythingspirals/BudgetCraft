var User = function(googleId, name, avatar){
    this.googleId = googleId;
    this.name = name;
    this.avatar = avatar; 
}

User.prototype = {
    googleId:null,
    name:null,
    avatar:null,
    userId:null,
    
    login : function(userId){
        this.userId = userId;
    }    
}

module.exports = User;