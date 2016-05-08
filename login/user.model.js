var User = function(googleId, name, avatar){
    this.googleId = googleId;
    this.name = name;
    this.avatar = avatar; 
}

User.prototype = {
    login : function(){
        
    }    
}

module.exports = User;