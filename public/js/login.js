function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var userId = profile.getId(); // Do not send to your backend! Use an ID token instead.
  var name = profile.getName();
  var avatar = profile.getImageUrl();
  var email = profile.getEmail();
  $.post('/login',{
     userId:userId,
     name:name,
     avatar:avatar,
     email:email 
  }, 
  function(){
      window.location.href = "/user";
  });
}