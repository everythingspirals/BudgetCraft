function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var googleId = profile.getId(); // Do not send to your backend! Use an ID token instead.
  var name = profile.getName();
  var avatar = profile.getImageUrl();
  var email = profile.getEmail();
  var data = JSON.stringify({
        googleId : googleId,
        name : name,
        avatar : avatar,
        email : email 
     });
  $.ajax({
     method: "POST",
     url : "/login",
     contentType: "application/json",
     data:data
  });
  
  /*  
  function(){
      window.location.href = "/user";
  });*/
}