/**
 * @file
 * sph waves.
*/
var sphwaveData = drupalSettings.sphwaveDetails;
var isPropensityScoreReceived = false;
var isLdapLoginDetailsReceived = false;
var sphWavePaywallInitiated = false;
console.log(sphwaveData);

function swClickedNewsletterSignup(Optin_field_ids,Email_source) {
  $ = jQuery;
  var editionArr = Optin_field_ids.split(",");
  var thisEmail = $('input[name=cxsph-cta-email]').val();
  var thisSignupArea = $(".cxsph-cta-inputarea");
  var thisEdition = editionArr;

  if (!checkValidEmail(thisEmail)) {
    thisSignupArea.removeClass("ok pending success").addClass("fail");
    thisSignupArea.children("a.cxsph-cta-submit").val("Try Again");
    thisSignupArea.children("input[name=cxsph-cta-email]").attr("title", "Please enter valid e-mail");
  } else {
    thisSignupArea.removeClass("ok success fail").addClass("pending");
    var params = {
      nl_email: thisEmail,
      nl_edition: thisEdition,
      nl_emailsrc: Email_source
    };
    $.post('/st_newsletter/ajax/subscribe', params, function(data) {
      var response = JSON.parse(data);
      if (response.status == 'SUCCESS') {
        thisSignupArea.removeClass("pending fail").addClass("success");
      } else {
        thisSignupArea.removeClass("pending success").addClass("fail");
        thisSignupArea.children("a.cxsph-cta-submit").val("Try Again");
        thisSignupArea.children("input[name=cxsph-cta-email]").attr("title", response.message);
      }
    });
  }
}

function checkValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// ### Document Ready - START ###
jQuery(document).ready(function () {
    
    //var payall_header_default_subscribe_link = "https://subscribe.sph.com.sg/promotions/st-3-months-99-cents?utm_campaign=stad3099&utm_medium=sph-publication&utm_source=paywall-st&utm_content=subscribelink-pay-endofarticle";
   
    function activateCDP() {
      if (jQuery(".cx_paywall_placeholder").length == 0) {
        //jQuery('<div class="cx_paywall_placeholder" id="cx_paywall_placeholder"></div>').appendTo(".node-article .field-name-body");
        jQuery('<div class="cx_paywall_placeholder" id="cx_paywall_placeholder"></div>').appendTo(".ds-wrapper");
      }
      if(document.getElementById("cx_paywall_placeholder")) {
        document.getElementById("cx_paywall_placeholder").id = "sph_cdp_"+sphwaveData.cdp_campaign_id;
      }
      
      console.log("isLdapLoginDetailsReceived "+isLdapLoginDetailsReceived);
      insertNewsletterSignupCampaign();
      if(isLdapLoginDetailsReceived == true && sphWavePaywallInitiated==false) {
        console.log("login received => activating CDP");
        sphWavePaywallInitiated = true;
        SPH_CDP().init(sphwaveData.cdp_campaign_id,sphwaveData.cdp_url, sphwaveData.cdp_key).run();     
      }
    }

    document.addEventListener('ldapLoginDetailsReceived', function(e) {
      console.log("ldapLoginDetailsReceived => activating CDP");
      isLdapLoginDetailsReceived = true;
      if(window.location.hostname.toLowerCase().indexOf("staff") === -1){
        activateCDP();
      }
    },false);

    document.addEventListener('ldapLoginDetailsReceived', function(e) {
      window.ldapLoginDetailsReceived = true;
    }, false);
        
    function insertNewsletterSignupCampaign() {
      var newsletter_signup_campaign_id = sphwaveData.cdp_newsletter_campaign_id;
      if(document.getElementById("sph_cdp_"+newsletter_signup_campaign_id) == null) {
        if(document.getElementById("sw_seventh_para_placeholder")) {
          document.getElementById("sw_seventh_para_placeholder").id = "sph_cdp_"+newsletter_signup_campaign_id;
        }
        SPH_CDP().init(newsletter_signup_campaign_id,sphwaveData.cdp_url, sphwaveData.cdp_key).run();
      }
    }
});
// ### Document Ready - END ###