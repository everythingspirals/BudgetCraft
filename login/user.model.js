var User = function(googleId, avatar, name){
    this.googleId = googleId;
    this.name = name;
    this.avatar = avatar; 
}

User.prototype = {
    login : function(){
        
    }    
}

module.exports = User;