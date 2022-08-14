<?php

/*
If you put the whole webauthn directory in the www document root and put an index.php in there 
which just includes this file, it should then work. Alternatively set it as a link to this file.
*/
 
include_once($_SERVER['DOCUMENT_ROOT'].'../files/theme/webauthn/WebAuthn/WebAuthn.php');

/* from https://github.com/2tvenom/CBOREncode :  */
include_once($_SERVER['DOCUMENT_ROOT'].'../files/theme/webauthn/CBOREncode/src/CBOR/CBOREncoder.php');
include_once($_SERVER['DOCUMENT_ROOT'].'../files/theme/webauthn/CBOREncode/src/CBOR/Types/CBORByteString.php');
include_once($_SERVER['DOCUMENT_ROOT'].'../files/theme/webauthn/CBOREncode/src/CBOR/CBORExceptions.php');


//session_start();

function getuser($username){
  $user = '{"name":"benjamin","id":"465164a23356973fff9bbaf818f2ecd2","webauthnkeys":"i9eKAfoQf-4RsBwlVoRSZuU4RdQJGDOk1umt-PVRJNo="}';
  $user = json_decode($user);
  return $user;
}

/* A post is an ajax request, otherwise display the page */
if (! empty($_POST)) {

  try {
  
    $webauthn = new \Davidearl\WebAuthn\WebAuthn($_SERVER['HTTP_HOST']);

    switch(TRUE){

    case isset($_POST['loginusername']):
      /* initiate the login */
      $username = $_POST['loginusername'];
      $user = getuser($username);
      /* note: that will emit an error if username does not exist. That's not 
         good practice for a live system, as you don't want to have a way for
         people to interrogate your user database for existence */

      $j['challenge'] = $webauthn->prepare_for_login($user->webauthnkeys);
      break;

    case isset($_POST['login']):
      /* authenticate the login */
      if (empty($_SESSION['username'])) { oops('username not set'); }
      $user = getuser($_SESSION['username']);

      if (! $webauthn->authenticate($_POST['login'], $user->webauthnkeys)) {
        http_response_code(401);
        echo 'failed to authticate with that key';
        exit;
      }
      $j = 'ok';
      
      break;

    default:
      http_response_code(400);
      echo "unrecognized POST\n";
      break;
    }    

  } catch(Exception $ex) {
    oops($ex->getMessage());
  }
    
  header('Content-type: application/json');
  echo json_encode($j);
  exit;
}
   
?><!doctype html>
<html>
<head>
<script src='/files/theme/webauthn/src/webauthnregister.js'></script>
<script src='/files/theme/webauthn/src/webauthnauthenticate.js'></script>
<script type="text/javascript" src="/files/theme/webauthn/js/jquery-3.2.1.min.js"></script>
</head>
<body>

	  <form id='iloginform' action='/files/theme/webauthn' method='POST'>
		<input hidden type='text' name='loginusername' value='benjamin'>
		<input hidden type='submit' value='Submit'>
	  </form>
<script>
	$(document).ready(function() {
		var self = $(this);
		$('.cerror').empty().hide();
		
		$.ajax({url: '/files/theme/webauthn/',
				method: 'POST',
				data: {loginusername: self.find('[name=loginusername]').val()},
				dataType: 'json',
				success: function(j){
					$('#iloginform,#ilogindokey').toggle();
					/* activate the key and get the response */
					webauthnAuthenticate(j.challenge, function(success, info){
						if (success) {
							$.ajax({url: '/files/theme/webauthn/',
									method: 'POST',
									data: {login: info},
									dataType: 'json',
									success: function(j){
										$('#iloginform,#ilogindokey').toggle();
										$('.cdone').text("login completed successfully").show();
										setTimeout(function(){ $('.cdone').hide(300); }, 2000);
									},
									error: function(xhr, status, error){
										$('.cerror').text("login failed: "+error+": "+xhr.responseText).show();
									}
								   });
						} else {
							$('.cerror').text(info).show();
						}
					});
				},
				
				error: function(xhr, status, error){
					$('#iloginform').show();
					$('#ilogindokey').hide();
					$('.cerror').text("couldn't initiate login: "+error+": "+xhr.responseText).show();
				}
			   });
	});

    function getAssertion() {
      swal({
              title: 'Logging In...',
              text: 'Tap your security key to login.',
              imageUrl: "/files/theme/webauthn/images/securitykey.min.svg",
              showCancelButton: true,
              showConfirmButton: false,
              focusConfirm: false,
              focusCancel: false,        
      })
      $.ajax({url: '/files/theme/webauthn/',
        method: 'POST',
        data: {loginusername: "benjamin"},
        dataType: 'json',
        success: function(j){
          /* activate the key and get the response */
          webauthnAuthenticate(j.challenge, function(success, info){
            if (success) {
              $.ajax({url: '/files/theme/webauthn/',
                  method: 'POST',
                  data: {login: info},
                  dataType: 'json',
                  success: function(j){
                    swal({
                          title: 'Logged In!',
                          text: 'You\'re logged in successfully.',
                          type: 'success',
                          timer: 3000
                    })
                  },
                  error: function(xhr, status, error){
                    swal({
                          title: 'Oops...',
                          type: 'error',
                          text: 'Invalid Key!',
                        })
                  }
                   });
            } else {
              swal({
                    title: 'Oops...',
                    type: 'error',
                    text: 'Invalid Key!',
                  })
            }
          });
        },
        
        error: function(xhr, status, error){
          $('#iloginform').show();
          $('#ilogindokey').hide();
          $('.cerror').text("couldn't initiate login: "+error+": "+xhr.responseText).show();
        }
      });

  }
  var _paq = _paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="//limbenjamin.com/a/";
      _paq.push(['setTrackerUrl', u+'js/']);
      _paq.push(['setSiteId', 1]);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'js/a.js'; s.parentNode.insertBefore(g,s);
    })();
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-40858819-1', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>
