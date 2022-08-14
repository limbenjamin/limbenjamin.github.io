var rewards_timer = [];
var d = new Date();
var n = d.getTime();
rewards_timer.push(n);
var lbshown = 0;

(function($) {
    document.addEventListener('ldapLoginDetailsReceived', function(e) {
        if ((token_data.usertype == 'sub' || token_data.usertype == 'reg') && token_data.loginid != "") {
            var count = 0;
            var sph_subscriber = '';
            var article_id = '';
            if( typeof articleData !== 'undefined') {
                article_id = articleData.nid;
            }

            sph_subscriber = token_data.service_type_value;
            var tag_selector = drupalSettings.sph_reward_points.tag_selector;
            var valid_eligible_time_in_sec = drupalSettings.sph_reward_points.eligible_second;
            var readmeter = 1;
            if((typeof _data !== 'undefined' && _data.contentcat == 2) && token_data.usertype == 'reg'){
                readmeter = 0;
            }
            if(readmeter == 1) {
                $(tag_selector).appear();
                $(document.body).on('appear', tag_selector, function(e, $affected) {
                    // This code is executed for each appeared element.
                    $affected.each(function() {
                        if(count == 0) {
                            var d = new Date();
                            var end_time = d.getTime();
                            var diff= end_time-rewards_timer[0];
                            var sec = diff/1000;
                            if(sec >= valid_eligible_time_in_sec) {
                                if(sph_subscriber == 9 || sph_subscriber == 10){
                                    var min_threshold = 3;
                                }else{
                                    var min_threshold = 5;
                                }
                                // Push READ Data.
                                $.post( "/strewards/read_article.php?article_id="+article_id+"&min_threshold="+min_threshold, function( data ) {
                                    data = JSON.parse(data);
                                    console.log(data);
                                    
                                    //trigger LB
                                    if((window.getCookieByName('articleRead3Displayed') == undefined || window.getCookieByName('articleRead3Displayed') == "")) {
                                        
                                        if(sph_subscriber == 9 || sph_subscriber == 10){
                                            if(data.response.count >=3){
                                                $("#modal-article-read3 .prize-imgholder").css("background-image",'url(/themes/custom/straitstimes/images/rewards/placeholders/samsung-tablet-wifi.jpg)');
                                                $('.read_cnt_lightbox').text(3);
                                                $('#modal-article-read3').modal('show');
                                                $('.rewards-go-read3').attr('data-rewardsread3','moe');
                                                var currentDate = new Date();
                                                expiryDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
                                                document.cookie = "articleRead3Displayed=yes;path=/; expires=" + expiryDate.toGMTString();
                                                window.dataLayer.push({'event':'custom_event','eventCategory':'moe gamification','eventAction':'lightbox','eventLabel':"Display complete 3 articles lightbox"});
                                            }
                                        }else if(typeof rewards_optimise !== 'undefined'){
                                            if(typeof read_count_optimize !== 'undefined' && read_count_optimize == 5 && data.response.count >=5){
                                                $('.read_cnt_lightbox').text(5);
                                                $('#modal-article-read3').modal('show');
                                                var currentDate = new Date();
                                                expiryDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
                                                document.cookie = "articleRead3Displayed=yes;path=/; expires=" + expiryDate.toGMTString();
                                                if(typeof rewards_variant !== 'undefined' && rewards_variant==4){
                                                    window.dataLayer.push({'event':'custom_event','eventCategory':'strewards','eventAction':'lightbox','eventLabel':"strewards - read non-expensive rewards article"});
                                                }else{
                                                    window.dataLayer.push({'event':'custom_event','eventCategory':'strewards','eventAction':'lightbox','eventLabel':"strewards - read 5 article"});
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        count++;
                    });
                });
            }
        }

        //trigger only after login response
        setTimeout(function(){ 
            if(typeof(read_count_optimize) !== 'undefined'){
            rewards_lb(5);
            }else{
            rewards_lb();
            }
        }, 2000);
        
    });

    //rewards go
    $(".rewards-go").click(function () {
        var letsgo_btn = $(this).attr("data-rewardsgo");
        var readnow_url = window.location.href.replace(window.location.origin, "");
        document.cookie = "readnow_url="+readnow_url+";path=/; expires=0";
        if(letsgo_btn == 'moe'){
            window.dataLayer.push({'event':'custom_event','eventCategory':'moe gamification','eventAction':'click','eventLabel':'strewards - Click Let’s go in the initial lightbox','nonInteraction': false});
            window.location.href="/rewards-polyite"; 
        }else{
            window.dataLayer.push({'event':'custom_event','eventCategory':'strewards','eventAction':'click','eventLabel':'strewards - Click Let’s go in the initial lightbox','nonInteraction': false});
            window.location.href="/rewards";
        }
      });
  
     $(".rewards-go-read3").click(function () {
        var read3_btn = $(this).attr("data-rewardsread3");
        var readnow_url = window.location.href.replace(window.location.origin, "");
        document.cookie = "readnow_url="+readnow_url+";path=/; expires=0";
        if(read3_btn == 'moe'){
            window.dataLayer.push({'event':'custom_event','eventCategory':'moe gamification','eventAction':'click','eventLabel':'strewards - Click Let’s go in the complete reading lightbox','nonInteraction': false});
            window.location.href="/rewards-polyite"; 
        }else{
            window.dataLayer.push({'event':'custom_event','eventCategory':'strewards','eventAction':'click','eventLabel':'strewards - Click Let’s go in the complete reading lightbox','nonInteraction': false});
            window.location.href="/rewards";
        } 
     });


function rewards_lb(reward_val=5,variant_val=0){
    if(lbshown==0){
      console.log("token_data.service_type_value=>"+token_data.service_type_value);
      var event_lbl = "strewards - initial lightbox";
      if(typeof(read_count_optimize) !== 'undefined' && (token_data.service_type_value != 9 && token_data.service_type_value != 10)){
          if($(".read_cnt_lightbox")[0]){
            $('.read_cnt_lightbox').text(reward_val);
          }
          rewards_lbhtml(event_lbl);
      }else if(token_data.service_type_value == 9 || token_data.service_type_value == 10){
          console.log("token_data.service_type_value_moe=>"+token_data.service_type_value);
          $("#modal-article .prize-imgholder").css("background-image",'url(/themes/custom/straitstimes/images/rewards/placeholders/samsung-tablet-wifi.jpg)');
          $("#modal-article .subtext").html("Simply read 3 articles and stand to win prizes <br> including the Samsung Galaxy Tab S5e, Viu subscription, and Secretlab gaming chair!");
          $('.st-gamification .tnc .txt').attr("href","/polyite-tnc");
          $('.st-gamification .faq .txt').attr("href","/polyite-faq");
          $('.rewards-go').attr("data-rewardsgo","moe");
          var event_lbl = "moe gamification - initial lightbox";
          rewards_lbhtml(event_lbl);
      }
      lbshown=1;
    }
  }
  
  function rewards_lbhtml(event_lbl){
      var token_exist = getUrlParameter('token');
      var xnumber = 1;
      var ydays   = 1;
      var rewardsOnboard_validity = (ydays*24) / xnumber;
  
      var expiry = new Date();
      expiry.setTime(expiry.getTime() + (ydays*24*60*60*1000));
  
      var validity_expiry = new Date();
      validity_expiry.setTime(validity_expiry.getTime() + (rewardsOnboard_validity*60*60*1000));
      if(token_exist == ""){
        if(window.getCookieByName('rewardsOnboardDisplayed') == undefined || window.getCookieByName('rewardsOnboardDisplayed') == "") {
          $('#modal-article').modal("show");
          document.cookie = "rewardsOnboardDisplayed=yes;path=/; expires=" + expiry.toGMTString();
          document.cookie = "rewardsOnboard_validity=1;path=/; expires=" + validity_expiry.toGMTString();
        }else if(window.getCookieByName('rewardsOnboardDisplayed') == "yes" && window.getCookieByName('rewardsOnboard_validity') == undefined ){
          $('#modal-article').modal("show");
          document.cookie = "rewardsOnboard_validity=1;path=/; expires=" + validity_expiry.toGMTString();
        }
         window.dataLayer.push({'event':'custom_event','eventCategory':'strewards','eventAction':'lightbox','eventLabel': event_lbl });
      }
  }

})(jQuery);


