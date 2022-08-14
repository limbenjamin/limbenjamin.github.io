var token_data = {};
(function ($, Drupal) {
    Drupal.behaviors.mySPH = {
        attach: function (context, settings) {
          if($('span.user-signup-section').length > 0)  {
                // Apply the mySubscriberLogin effect to the elements only once.

                var post_data = {};
                if (typeof _data !== 'undefined') {
                  if (_data.articleid !== "") {
                    post_data.article_id = _data.articleid;
                  }
                }

                var gift_token = getTokenUrlParameter('token');
                if (gift_token !== "") {
                    post_data.token = gift_token;
                }

                $.ajax({
                    type: "POST",
                    url: "/login_details.php?"+Date.now(),
                    data: post_data,
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.loginid) {
                            windowDataLayer();
                            registerUser(data);
                            var inter = window.setInterval(function() {
                                if (null!=window._mySPHObj) {
                                    window.clearInterval(inter);
                                    window._mySPHObj.postSessionInformation(data.mySPHSessionId);
                                }
                            }, 300);
                        } else {
                            windowDataLayer();
                            trySingleSignOnLogin();
                        }

                        if (typeof _data !== 'undefined') {
                            _data.visitorcat = data.service_type_value;
                            if (typeof data.mysphw !== 'undefined') {
                              _data.at = data.mysphw;
                            }
                        }
                        token_data = data;
                        // Dispatch the event
                        var event = document.createEvent('Event');
                        event.initEvent('ldapLoginDetailsReceived', true, true);
                        document.dispatchEvent(event);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('Mysph Login page: ' + errorThrown);
                        windowDataLayer();
                    }
                });
            }
        }
    };

    //MYSPH singleSignon Integration
    function trySingleSignOnLogin() {
        var f = document.createElement('iframe');
        f.src = drupalSettings.mysph.protected_path + "login.php";
        f.style.width = "0px";
        f.style.height = "0px";
        f.style.border = "none";
        f.style.display = "none";
        $('body').append(f);
    }
    //Post MySPHSession
    function postMySPHSession(data) {
        var inter = window.setInterval(function() {
        if (null!=window._mySPHObj) {
            window.clearInterval(inter);
            window._mySPHObj.postSessionInformation(data.mySPHSessionId);
        }
        }, 300);
    }

    //dispatch event in sso login
    function ssoDispatchEvent(data) {
        token_data = data;
        var event = document.createEvent('Event');
        event.initEvent('ldapLoginDetailsReceived', true, true);
        document.dispatchEvent(event);
    }

    window.loadSubscriberContent = function() {
      console.log("SubscriberContent SSO");
      if (typeof _data !== 'undefined') {
          if (_data.articleid !== "") {
            $.ajax({
              type: "POST",
              url: drupalSettings.mysph.protected_path + "details?article_id=" + _data.articleid,
              dataType: "json",
              cache: true,
              success: function (data) {
                console.log(data);
                if (data.loginid) {
                  postMySPHSession(data);
                  registerUser(data);
                  ssoDispatchEvent(data);
                  if (data.full_body) {
                    jQuery("body .article-content-rawhtml").html(data.full_body);
                  }

                }
              }
            });
          } else {
            $.ajax({
                type: "POST",
                url: "/login_details.php?"+Date.now(),
                dataType: "json",
                cache: true,
                success: function (data) {
                    console.log(data);
                    if (data.loginid) {
                        postMySPHSession(data);
                        registerUser(data);
                        ssoDispatchEvent(data);
                    }
                }
            });
           }
        } 
    }

    //adding visitor information to tm datalayer
    function windowDataLayer() {

        var userType= $.cookie('mySPHUserType');

        //Commenting as already declared in page.
        //var googletag = googletag || {};
        //googletag.cmd = googletag.cmd || [];

        // Set Targeting based on userType
        googletag.cmd.push(function() {
            var user_status = 'N';
            if(userType != undefined) {
                if(userType == 'y-sub' ) {
                    user_status = 'Y';
                } else if (userType == 'y-reg' ) {
                    user_status = 'R';
                }
                googletag.pubads().setTargeting('subscriber', user_status);
            }
            else {
                //adding visitor information to tm datalayer
                googletag.pubads().setTargeting('subscriber', user_status);
            }
        });

        var visitorcat = $.cookie('visitorcat');
        var mysphw = $.cookie('mysphw');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'visitorcat': visitorcat,
            'at': mysphw,
        });
    }

    function registerUser(data) {
      //Subscriber Link Registration
      var subscribe_link_for_reg = '';
      if ((data.usertype == 'sub' || data.usertype == 'reg') && data.login_id != "") {
        if (drupalSettings.mysph.subscribe_link_for_reg != '') {
          var subscribe_link_reg = drupalSettings.mysph.subscribe_link_for_reg;

          if (typeof _data !== 'undefined') {
            if (isArticlePage) {
              subscribe_link_reg = subscribe_link_reg+"&utm_term="+_data.articleid;
            }
          }
          if(data.usertype == 'reg') {
            subscribe_link_for_reg = '<li><a class="subscribe-link" target="_blank" href="'+subscribe_link_reg+'">Subscribe</a></li>';
          }
        }
      }

      //Manage account
      var manage_account = '';
      if (drupalSettings.mysph.manage_account_link) {
         manage_account = '<li><a class="manage_account" target="_blank" href="'+drupalSettings.mysph.manage_account_link + encodeURIComponent(window.location.origin + window.location.pathname)+'">' + drupalSettings.mysph.manage_account_text + '</a></li>';
      }

        // Render User action dropdown
        var sph_username = data.loginid;
        if (typeof data.display_name  !== 'undefined' && data.display_name != "") {
          sph_username = data.display_name;
        }

        var login_user =
            '<span class="welcome">' + drupalSettings.mysph.welcome_text + ',&nbsp;</span>' +
            '<div class="dropdown d-inline">' +
            '<a href="javascript:;" class="dropdown-toggle p-0 user-login-dd dropdown-toggle-down" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span id="sph_user_name" class=""hidden style="display:none">'+ data.loginid +'</span><span class="sph_user_name">' + sph_username + '</span><span class="caret"></span></a>' +
            '<ul class="dropdown-menu mysph-dropdown-menu text-center px-2 py-0 text-nowrap">'
            + manage_account + subscribe_link_for_reg+'<li><a class="mysph_user_name" href="javascript:;" onclick="_mySPHObj.openUpdatePassword()">' +
            drupalSettings.mysph.change_pwd + '</a></li><div class="mysph-line"></div><li><a class="mysph_logout" href="javascript:;" onclick="_mySPHObj.openLogout()" id="logout_link">' + drupalSettings.mysph.logout + '</a></li>' +
            '</ul> </div>';
        var meta = document.createElement('meta');
        meta.id = 'mysphw';
        meta.name = 'mysphw';
        meta.content = data.mysphw ? data.mysphw : '';
        document.getElementsByTagName('head')[0].appendChild(meta);
        $(".user-signup-section").html(login_user);
        $(".sph_user_name").css("textTransform","none");
        // Added for mySph menu icon toggle dropdown.
        $('.user-login-dd').on("click", function () {
            if($(this).hasClass('dropdown-toggle-down')) {
                $(this).removeClass('dropdown-toggle-down').addClass('dropdown-toggle-up');
            }
            else {
                $(this).removeClass('dropdown-toggle-up').addClass('dropdown-toggle-down');
            }
        });

    }


    function getTokenUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

})(jQuery, Drupal);
