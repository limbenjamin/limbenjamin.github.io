/**
 * @file
 * JavaScript for ajax_example.
 */


 (function ($, Drupal) {

  if( /Android|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('.giftbox_mail').addClass("d-none");
  }
  var gift_token = getUrlParameter('token');
  
  $("body").on("click", ".mysph_signup", function(e){
    gaeventtrack_variant('signup','LetSubshare');
    var userObj={firstname:"",lastname:"",email:"",password:"",phone:""};
    _mySPHObj.openSignUp(userObj);
  });

  $("body").on("click", ".giftContents .mysph_login", function(e){
    _mySPHObj.openLogin();
  });

  if( gift_token != "" && typeof _data !== 'undefined') {
      _data.abVariant = "LetSubshare";
  }

  $("body").on("click", ".verifybtn", function(e){
    gaeventtrack('resend verification email');
    _mySPHObj.openResendVerificationMail();
  });

  $("body").on("click", ".onboarding_text .button-close", function(e){
      $('.onboarding_text').addClass("d-none");
  });


  document.addEventListener('ldapLoginDetailsReceived', function(e) {
    if(token_data.service_type_value == 2){
      if(window.getCookieByName('giftOnboardDisplayedv1') != "yes") {
        $('.onboarding_text').removeClass("d-none");
          giftOnboardCookie();
      }
      $('.st-icon-gift').removeClass("d-none");
    }
  },false);

  function giftOnboardCookie(){
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + (30*24*60*60*1000));
    document.cookie = "giftOnboardDisplayedv1=yes;path=/; expires=" + expiry.toGMTString();
  }


  var openDialog = function(uri, name, options, closeCallback) {
    var res = window.open(uri, name, options);
    var interval = window.setInterval(function() {
      try {
        if (res == null || res.closed) {
          window.clearInterval(interval);
          closeCallback(res);
        }
      } catch (e) {
      }
    }, 0);
    
    return res;
  }


  //giftbox icon
  $("body").on('st_gift_event', function() {
    gaeventtrack('gift icon');
  });

  $("body").on("click", ".giftcopybtn", function(e){
    var $temp = $("<input id='tmp_copybox' readonly style='opacity:0.01'>");
    $("body").append($temp);
    gaeventtrack('Copy link');
    $temp.val(document.getElementById("gift_tokenurl").value).select();
    document.execCommand("copy");
    $('.gifbtn_container .copy-link-tooltip').css({"visibility" : "visible"});
    setTimeout(function(){
      $('.gifbtn_container .copy-link-tooltip').css({"visibility" : "hidden"});
    },1000);
     $("#tmp_copybox").remove();
  });

  // generated link copy
  $("body").on("click", ".generated_copylink", function(e){
    var $temp = $("<input id='tmp_copybox' readonly style='opacity:0.01'>");
    $("body").append($temp);
    gaeventtrack('Copy link');
    $temp.val(document.getElementById("gift_tokenurl").value).select();
    document.execCommand("copy");
    $('.gift-url-container .copy-link-tooltip').css({"visibility" : "visible"});
    setTimeout(function(){
      $('.gift-url-container .copy-link-tooltip').css({"visibility" : "hidden"});
    },1000);
    $("#tmp_copybox").remove();

  });

  function tokenUrl(){
    return document.getElementById("gift_tokenurl").value;
  }
  
  var story_title = "";
  if(typeof _data !== 'undefined') {
    story_title = _data.title;
  }
  

  //facebook
  $("body").on("click", ".giftbox_facebook", function(e){
    e.preventDefault();
     a2a_config.thanks = {
       postShare: false
    };
    gaeventtrack('Facebook');
    var gift_tokenurl = tokenUrl();
    var fb_url = "http://www.facebook.com/sharer/sharer.php?u="+gift_tokenurl;
    openDialog(fb_url,'Facebook','width=640,height=580', function(){
    });
  });

  //twitter start
  $("body").on("click", ".giftbox_twitter", function(e){
    gaeventtrack('Twitter');
    var gift_tokenurl = tokenUrl();
    var twitter_url = "http://twitter.com/intent/tweet?url="+gift_tokenurl+"&title="+story_title;
    openDialog(twitter_url,'Twitter','width=640,height=580', function(){
    });
  });

  //whatsapp
  $("body").on("click", ".giftbox_whatsapp", function(e){
    gaeventtrack('Whatsapp');
    var gift_tokenurl = tokenUrl();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      window.location.href = "whatsapp://send?text="+gift_tokenurl;
    }else{
      openDialog("https://web.whatsapp.com/send?text="+gift_tokenurl,'Whatsapp','width=640,height=580', function(){
          /*$('#giftModal').modal('hide');
          $('#giftSuccessModal').modal('show');*/
      });
    }
  });

  //email
  $("body").on("click", ".giftbox_mail", function(e){
      gaeventtrack('Mailbox');
      var gift_tokenurl = tokenUrl();
      $token_mailto = "mailto:?subject=Here's a subscriber-only ST article for you&body="+gift_tokenurl;
      window.location.href = $token_mailto;

  });

  if( gift_token!= "" ) {
    console.log("handle gift token");
    //$('#tokenModal').modal('show');
    window.dataLayer = window.dataLayer || [];

    document.addEventListener('ldapLoginDetailsReceived', function(e) {
      var eventLabel = "";
      if(token_data.usertype == "reg"){
        if(token_data.service_type_value == 13){
          $('#tokenVerifyModal').modal('show');
          eventLabel = "non-verified";
        }else if(token_data.valid_token=="yes" && (token_data.service_type_value == 12 || token_data.service_type_value == 3) && token_data.premium_quota != undefined  && token_data.premium_quota == "valid"){
          $('#tokenModal').modal('show');
          eventLabel = "valid";
        }else if((token_data.service_type_value == 12 || token_data.service_type_value == 3) && token_data.premium_quota != undefined && token_data.premium_quota == "invalid"){
          $('#exceedQuotaModal').modal('show');
          eventLabel = "invalid";
        }else if(token_data.valid_token == "no"){
          $('#expiredModal').modal("show");
          eventLabel = "expired";
        }
      }else if(token_data.usertype == "anoy"){
        setTimeout(function(){ $('#tokenanoyModal').modal("show"); }, 3000);
        eventLabel = "anon";
      }
      window.dataLayer.push({'event':'custom_event','eventCategory':'fremium','eventAction':'lightbox','eventLabel':eventLabel});
    }, false);

    //$('#tokenModal .giftreadbtn').on('click', function( e ) {
    $("body").on("click", "#tokenModal .giftreadbtn", function(e){
      $('#tokenModal').modal("hide");
      getArticleContentBasedToken();
      window.dataLayer.push({'event':'custom_event','eventCategory':'fremium','eventAction':'click','eventLabel':"read now"});
    });

  }

  function gaeventtrack_variant(event_label,variant_val) {
    window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event':'custom_event',
        'eventCategory':'subshare',
        'eventAction':'click',
        'eventLabel':event_label,
        'abVariant':variant_val,              
      });
  }

  function gaeventtrack(event_label) {
    window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event':'custom_event',
        'eventCategory':'subshare',
        'eventAction':'click',
        'eventLabel':event_label             
      });
  }

  function getArticleContentBasedToken() {
    var post_data = {};
    var gift_token = getUrlParameter('token');
    if (gift_token !== "") {
        post_data.token = gift_token;
    }
    
    $.ajax({
      type: "POST",
      url:  "/p/details?article_id=" + drupalSettings.articleDetails.nid,
      data: post_data,
      dataType: "json",
      cache: true,
      success: function (data) {
        if (data.loginid) {
          if (data.full_body) {
            console.log(data);
            jQuery("body .article-content-rawhtml").html(data.full_body);
          }

        }
        var inter = window.setInterval(function () {
          if (null != window._mySPHObj) {
            window.clearInterval(inter);
            window._mySPHObj.postSessionInformation(data.mySPHSessionId);
          }
        }, 300);
      }
    });

  }

})(jQuery, Drupal);
