/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal, drupalSettings) {

  'use strict';

  // Article SPH Login.
  $('body').on('click', '.mysph_login', function( e ) {
    e.preventDefault();
    _mySPHObj.openLogin();
  });

  Drupal.behaviors.straitstimes = {
    attach: function (context, settings) {
      var position = $(window).scrollTop();
      $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
          $('body').addClass("scrolled");
        }
        else {
          $('body').removeClass("scrolled");
        }
        var scroll = $(window).scrollTop();
        if (scroll > position) {
          $('body').addClass("scrolldown");
          $('body').removeClass("scrollup");
        } else {
          $('body').addClass("scrollup");
          $('body').removeClass("scrolldown");
        }
        position = scroll;
      });

      $(document).ready(function () {
        var $active_page_url = $('header a.active').attr('href');
        var $page_url = '';
        $('.block-footer-menu-links a').each(function(){
          $page_url = $(this).attr('href');
          if ($page_url == $active_page_url) {
            $(this).addClass('is-active');
          }
        });

        $('.navbar-desktop .block-menu-primary .no-dropdown > a').click(function () {
          window.location.href = $(this).attr('href');
        });

        $('.btn--user-dropdown').on('click', function() {
          $(this).parent().find('ul.menu-user').toggleClass('menu-open');
        });

        // Podcasts custom
        if (window.location.href.indexOf('.com/st-podcasts') > 0) {
          $('<div class="dynamic-section-menu"></div>').insertAfter(".top-leaderboard");
          $('<h2 class="web-category-name"><a href="/st-podcasts">Podcasts</a></h2>').appendTo(".dynamic-section-menu");
        }

        // Article page
        if ($('.node--type-article').length > 0) {
          // Append node id to subscribe buttons.
          if (_data.articleid != '') {
            var $subscribe_href;
            $subscribe_href = $('.block-subscribe a').attr('href');
            $subscribe_href = $subscribe_href + '&utm_term=' + _data.articleid;
            $('.block-subscribe a').attr('href', $subscribe_href);

            $('.nav-subscribe a').each(function() {
              $subscribe_href = $(this).attr('href');
              $subscribe_href = $subscribe_href + '&utm_term=' + _data.articleid;
              $(this).attr('href', $subscribe_href);
            });
          }
        }
      });

      Drupal.behaviors.straitstimes.showRewardsMenu();
    },
    showRewardsMenu: function() {
      if (typeof token_data.service_type_value == 'undefined') {
        window.setTimeout(Drupal.behaviors.straitstimes.showRewardsMenu, 1000);
        return;
      }

      var read_win = '';
      if(typeof rewards_optimise !== 'undefined') {
        read_win = '<li id="my_rewards_li" class="rewards_li"><a class="my_rewards" href="/rewards">ST Read & Win</a></li>';
      }

      if(token_data.service_type_value == 9 || token_data.service_type_value == 10 ){
        read_win = '<li id="my_rewards_moe_li" class="rewards_li"><a class="my_rewards" href="/rewards-polyite">ST Read & Win</a></li>';

        $('.block-menu-rewards .nav-rewards a').attr('href', '/rewards-polyite');
      }

      if(read_win !== '') {
        $('.mysph-dropdown-menu li.rewards_li').remove();
        $('.mysph-dropdown-menu > div.mysph-line').before(read_win)
      }

      if(typeof(rewards_optimise) !== 'undefined'){
        $(".block-menu-rewards").removeClass('hidden');

        if(token_data.usertype == "anoy"){
         $(".navbar-toggler,.navbar-toggle").addClass("rewards_dot");
        }
      }
    }
  };

  Drupal.behaviors.discover_scroll = {
    attach: function (context, settings) {
      // Scroll
      $(".bundle-discover-articles .view-content").addClass("scroll");
      // Pagination
      $(".bundle-discover-articles .view-content").after("<div id='discover-pagination'></div>");
      var items = $('.bundle-discover-articles .view-content').children('div');
      var num_items = items.length;

      for (let i = 0; i < num_items; i++) {
        var dot = '<a class="dot dot-'+ (i+1) +'" href="#scroll-'+(i+1)+'">'+'</a>';
        $("#discover-pagination").append(dot);

        var item = items.eq(i);
        item.attr("id","scroll-"+(i+1));
        item.addClass("item");
      }

      var dots = $("#discover-pagination a:visible");
      //var items_per_slide = (num_items/dots.length);
      var items_per_slide = 1;
      var discover_scroll = $(".bundle-discover-articles .scroll");

      var display_arrow = false;
      if ((num_items > 0) && (dots.length < num_items) ) {
        display_arrow = true;
        var ctrl_prev = 0; // default
        var ctrl_next = 1;

        $(".bundle-discover-articles").append(
          '<div id ="discover-control">'+
            '<a href="'+dots.eq(ctrl_prev).attr('href')+'" class="prev-ctrl"></a>'+
            '<a href="'+dots.eq(ctrl_next).attr('href')+'" class="next-ctrl"></a>'+
          '</div>'
        );
        $("#discover-control .prev-ctrl").hide(); // hide first
      }

      if (dots.length > 0) {
        dots.eq(0).addClass("selected"); // default to first dot
      }

      discover_scroll.scroll(function() {
        items.each(function( index ) {
          var x = Math.floor($(this).position().left/items.outerWidth(true));
          var y = Math.ceil((index+1)/items_per_slide);
          var i = y - 1;

          if (items_per_slide == 1) {
            i = index;
          }
          if (x == 0) {
            dots.eq(index).addClass("selected").siblings().removeClass("selected");
            //console.log("index="+index+",x="+x+",y="+y);
            ctrl_prev = index - 1;
            ctrl_next = index + 1;
            $("#discover-control .prev-ctrl").attr("href", dots.eq(ctrl_prev).attr('href'));
            $("#discover-control .next-ctrl").attr("href", dots.eq(ctrl_next).attr('href'));
            //return false; // break
          }
        });

        // default
        //if (display_arrow) {
          $("#discover-control .next-ctrl").show();
          $("#discover-control .prev-ctrl").show();

          if (ctrl_prev > 0) {

          }

          // next
          if (ctrl_next >= dots.length) {
            $("#discover-control .next-ctrl").hide();
          }

          // prev
          if (ctrl_prev < 0) {
            $("#discover-control .prev-ctrl").hide();
          }
        //}

      });

      $("#discover-pagination a").on("click", function(e) {
        //$(this).addClass("selected").siblings().removeClass("selected");
        var scroll = e.target.hash;
        var left_offset = $(scroll).offset().left - discover_scroll.offset().left + discover_scroll.scrollLeft();
        $('.bundle-discover-articles .scroll').animate({ scrollLeft: left_offset }, 600, 'linear');
        return false;
      });

      $("#discover-control a").on("click", function(e) {
        //$(this).addClass("selected").siblings().removeClass("selected");
        var scroll = e.target.hash;
        var left_offset = $(scroll).offset().left - discover_scroll.offset().left + discover_scroll.scrollLeft();
        $('.bundle-discover-articles .scroll').animate({ scrollLeft: left_offset }, 600, 'linear');
        return false;
      });

    }
  }

  // Article
  Drupal.behaviors.article_image_rotator = {
    attach: function (context, settings) {
      $(document).ready(function () {
        $('.media-group').each(function (i) {
          if ($(this).children().length > 1) {
            var maxheight = 0;
            $('.media-entity').css("display","block");
            $(this).find('.media-entity .group_image_caption').each(function (ind, elem) {
              var childheight = $(elem).height();
              maxheight = childheight > maxheight ? childheight : maxheight;
            });
            maxheight += ($(this).width() * 0.6665) + 10;
            if ($(this).children('.rotatorNav').length === 0) {
              $(this).prepend('<div class="rotatorNav"><div class="rotatorButtons"><span class="rotatorCount"></span><button class="rotatorPrev crp' + i + '"><span>Previous</span></button><button class="rotatorNext crn' + i + '"><span>Next</span></button></div><div class="slide-pager slide-pager-' + i + '"></div></div>');
            }
            $('.media-entity').css("display","none");
            var article_image_rotator = $(this).cycle({
              slideExpr: '.media-entity',
              containerResize: 1,
              timeout: 0, pause: true,
              width: '100%', fit: 1,
              pager: '.slide-pager-' + i,
              slideResize: 0,
              prev: '.rotatorPrev.crp' + i, next: '.rotatorNext.crn' + i,
              before: function (curr, next, opts) {
                $(this).parent().find('div.media-current-slide').removeClass('media-current-slide');
              },
              after: function (curr, next, opts) {
                $(this).addClass('media-current-slide');
                if (opts.slideCount != 1) {
                  $('.media-group .group_image_caption').addClass("multiple-slides");
                  $(this).parent().children('.rotatorNav').show();
                  var rotatorCountElem = $(this).parent().find('.rotatorCount');
                  rotatorCountElem.html('<span class="currSlide">' + (opts.currSlide + 1) + '</span> of ' + opts.slideCount);
                  var slideIndex = opts.currSlide;
                  var nextIndex = slideIndex + 1;
                  var prevIndex = slideIndex - 1;
                  if (slideIndex == opts.slideCount - 1) nextIndex = 0;
                  if (slideIndex == 0) prevIndex = opts.slideCount - 1;

                  var imgresponsive = $(this).find('.img-responsive');
                  var imgiframe = $(this).find('.file-video');
                  var computeTop = 10;
                  if (imgresponsive.length > 0) {
                    computeTop = imgresponsive.height() + 10;
                    rotatorCountElem.css('top', computeTop);
                  } else {
                    rotatorCountElem.css('top', $(this).parent('.media-group').width() * 0.6665 + 10);
                  }
                }
              }
            });
            var countPadding = $('.rotatorCount').outerWidth(true);
            countPadding += 20;
            $('.group-image-caption').css('padding-left', countPadding);
            $(this).css("height",maxheight);
            if (maxheight < 250) {
              if (typeof window.ga == "function") {
                window.ga('ST.send', 'event', 'Design', 'Small height', 'Height test');
              }
            }
            $('.rotatorPrev').click(function () {
              var x4 = _data.pagination;
              if (x4 > 1) {
                _data.pagination = x4 - 1;
              } else {
                _data.pagination = $(".media-entity").length;
              }
            });
            $('.rotatorNext').click(function () {
              var x4 = _data.pagination;
              if (x4 > 0 && x4 != $(".media-entity").length) {
                _data.pagination = x4 + 1;
              } else {
                _data.pagination = 1;
              }
            });
          }
        });

      });

      $(window).resize(function () {
        $('.media-group').each(function (i) {
          if ($(this).children().length) {
            var maxheight = 0;
            $(this).find('.rotatorCount').css('top', $(this).width() * 0.6665 + 10);
            $('.media-entity').css("display","block");
            $(this).find('.media-entity .group_image_caption').each(function (ind, elem) {
              var childheight = $(elem).height();
              maxheight = childheight > maxheight ? childheight : maxheight;
            });
            maxheight += ($(this).width() * 0.6665) + 10;
            $(this).css("height",maxheight);
          }
        });
      });
    }
  };
  Drupal.behaviors.postdate = {
    attach: function (context, settings) {
      if($('.story-changeddate').length == 0) {
        $('.group-story-changedate').empty();
      }
      if ($('.story-changeddate').length > 0) { //if there is updated date, hide the publish date
        $('.group-story-postdate').hide();
      }
      // when arrow at updated date is clicked, show the publish date
      $('.story-changeddate').on('click',function(){
        $('.group-story-postdate').toggle();
      });
    }
  };
  /* AI2HTML Iframe Resizer js call using Iframe Id */
   Drupal.behaviors.ai2html_height = {
    attach: function (context, settings) {
     $(document).ready(function () {
      $("iframe").each(function () {
        var source = $(this).attr("src");
        $(this).append("<script>iFrameResize({ log: false }, '#"+$(this).attr('id')+"')</script>");
      });
    });
  }
 };

  /* ST Newsletter signup widget */
  Drupal.behaviors.newsletter_signup = {
    attach: function (context, settings) {
      $('#stsph-cta-inputarea-topper .stsph-cta-submit').click(function () {
        var editionArr = drupalSettings.newsletter_editions;//AM+PM
        var emailsrc = "cta-topstories";
        var widgetId = "stsph-cta-inputarea-topper";
        clickNewsletterSignup(editionArr,emailsrc,widgetId);
      });
      $('footer .signup-newsletter .stsph-cta-submit').click(function () {
        var editionArr = drupalSettings.newsletter_editions;//AM+PM
        var emailsrc = "cta-footer";
        var widgetId = "stsph-cta-inputarea-footer";
        clickNewsletterSignup(editionArr,emailsrc,widgetId);
      });

      function clickNewsletterSignup(editionArr,emailsrc,widgetId) {
        var thisEmail = $('#'+widgetId+' input[name=stsph-cta-email]').val();
        var thisSignupArea = $("#"+widgetId+".stsph-cta-inputarea");
        var thisEdition = editionArr;

        if (!isValidEmail(thisEmail)) {
          thisSignupArea.removeClass("ok pending success").addClass("fail");
        } else {
          thisSignupArea.removeClass("ok success fail").addClass("pending");
          var params = {
            nl_email: thisEmail,
            nl_edition: thisEdition,
            nl_emailsrc: emailsrc
          };
          var post_url = drupalSettings.newsletter_signup_url;
          $.post(post_url, params, function(data) {
            var response = JSON.parse(data);
            if (response.status == 'SUCCESS') {
              thisSignupArea.removeClass("pending fail").addClass("success");
              thisSignupArea.children(".stsph-cta-messagearea").val("Thank you!");
            } else {
              thisSignupArea.removeClass("pending success").addClass("fail");
              thisSignupArea.children("a.stsph-cta-submit").val("Try Again");
              thisSignupArea.children("input[name=stsph-cta-email]").attr("title", response.message);
            }
          });
        }
      }

      function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }
    }
  };

  /* Long form components */
  Drupal.behaviors.parallax = {
    attach: function (context, settings) {

      if ( jQuery(".article-type-longform .longform-chaplinks").length == 1 ) {
        jQuery(".article-type-longform .longform-chaplinks").appendTo("#navbar nav[role=navigation]");
        jQuery(".article-type-longform .st-profile-menu").addClass( "chaplinks" );
        jQuery(".article-type-longform .longform-chaplinks .visbutton").on("click", function() {
          jQuery(this).parent().toggleClass('active');
        });
      }

      if ( jQuery(".live-coverage-page .longform-chaplinks").length == 1 ) {
        jQuery(".live-coverage-page .longform-chaplinks").appendTo("#navbar nav[role=navigation]");
        jQuery(".live-coverage-page .st-profile-menu").addClass( "chaplinks" );
        jQuery(".live-coverage-page .longform-chaplinks .visbutton").on("click", function() {
          jQuery(this).parent().toggleClass('active');
        });
      }
    }
  };

  Drupal.behaviors.longform_render = {
    attach: function (context, settings) {

    // polyfill fn
    function polyfill() {
      if ("classList" in SVGElement.prototype) return;
      Object.defineProperty(SVGElement.prototype, "classList", {
        get: function get() {
          var el = this;
          return {
            add: function add() {
              var classArr = el.getAttribute("class").split(" ");

              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
                ) {
                args[_key] = arguments[_key];
              }

              args.forEach(function(arg) {
                if (!classArr.includes(arg)) classArr.push(arg);
              });
              el.setAttribute("class", classArr.join(" "));
            },
            remove: function remove() {
              for (
                var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
                _key2 < _len2;
                _key2++
                ) {
                args[_key2] = arguments[_key2];
              }

              var classArr = el
              .getAttribute("class")
              .split(" ")
              .filter(function(cls) {
                return !args.includes(cls);
              });
              el.setAttribute("class", classArr.join(" "));
            }
          };
        }
      });
    }


    if (document.querySelector('body.article-type-longform')) {
      polyfill();
      var maxWidth = '739px';

      // Hero banner color
      if(document.querySelector('body.article-type-longform .banner-bg-color') &&
        !document.querySelector('body.article-type-longform .section .layout--onecol .hero-banner-wrapper')) {
        document.querySelector('body.article-type-longform .section .layout--onecol').classList.add('banner-color');
        if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.bg) {
          document.querySelector('body.article-type-longform .banner-bg-color').style.background = document.querySelector('body.article-type-longform .banner-bg-color').dataset.bg;
        }
        if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.reverse === 'true') {
          document.querySelector('body.article-type-longform .section .layout--onecol').classList.add('header-reverse');
          if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.tc) {
            if(document.querySelector('body.article-type-longform .paid-premium')) {
              document.querySelector('body.article-type-longform .paid-premium').style.color = document.querySelector('body.article-type-longform .banner-bg-color').dataset.tc;
            }
            document.querySelector('body.article-type-longform .headline').style.color = document.querySelector('body.article-type-longform .banner-bg-color').dataset.tc;
            document.querySelector('body.article-type-longform .group-story-timestamp').style.color = document.querySelector('body.article-type-longform .banner-bg-color').dataset.tc;
            document.querySelectorAll('.author-name a').forEach(function(e) {
              var textColor = document.querySelector('body.article-type-longform .banner-bg-color').dataset.tc;
              var bgColor = document.querySelector('body.article-type-longform .banner-bg-color').dataset.bg;
              e.style.color = textColor;
              e.addEventListener("mouseenter", (event) => { event.target.style.borderBottom = "1px solid "+ textColor });
              e.addEventListener("mouseleave", (event) => { event.target.style.borderBottom = bgColor });
              e.addEventListener("touchstart", (event) => { event.target.style.borderBottom = "1px solid "+ textColor });
              e.addEventListener("touchend", (event) => { event.target.style.borderBottom = bgColor });
            });
          }
        }
        getBannerColorHeight();
      }

      if (!document.querySelector('body.article-type-longform #navbar [role="navigation"] .st-profile-menu') &&
        document.querySelector('body.article-type-longform #navbar [role="navigation"]')) {
        var profile = document.createElement("div");
        profile.classList.add('st-profile-menu');
        profile.classList.add('hide-mobile');

        var menuUser = document.createElement("ul");
        menuUser.classList.add('menu-user');

        var avatar = document.createElement("label");
        avatar.classList.add('fa');
        avatar.classList.add('fa-avatar');
        avatar.setAttribute('for',"menu-user-input");

        var menuInput = document.createElement("input");
        menuInput.type = "checkbox";
        menuInput.id = "menu-user-input";

        document.querySelector('body.article-type-longform #navbar [role="navigation"]').appendChild(profile);
        document.querySelector('body.article-type-longform #navbar [role="navigation"] .st-profile-menu').appendChild(avatar);
        document.querySelector('body.article-type-longform #navbar [role="navigation"] .st-profile-menu').appendChild(menuInput);
        document.querySelector('body.article-type-longform #navbar [role="navigation"] .st-profile-menu').appendChild(menuUser);
      }

      window.addEventListener('load', function(event) {
        // Adjust the banner bg height
        if(document.querySelector('body.article-type-longform .banner-bg-color') &&
          !document.querySelector('body.article-type-longform .section .layout--onecol .hero-banner-wrapper')) {
          getBannerColorHeight();
        }
        // Arrange the hero banner image
        if(document.querySelector('body.article-type-longform .hero-banner-wrapper')) {
          if (window.matchMedia("(max-width: "+ maxWidth +")").matches) {
            if (document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items .mobile-image')) {
              document.querySelector('body.article-type-longform .hero-banner-wrapper').style.backgroundImage = 'url(' + document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items .mobile-image').src + ')';
            } else if (document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items .desktop-image')) {
              document.querySelector('body.article-type-longform .hero-banner-wrapper').style.backgroundImage = 'url(' + document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items .desktop-image').src + ')';
            }
            document.querySelector('body.article-type-longform .hero-banner-wrapper').classList.add('herobanner');
            if (document.querySelector('body.article-type-longform .banner-bg-color')) {
              document.querySelector('body.article-type-longform .banner-bg-color').style.display = 'none';
            }
          } else {
            if (document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items .desktop-image')) {
              document.querySelector('body.article-type-longform .hero-banner-wrapper').style.backgroundImage = 'url(' + document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items .desktop-image').src + ')';
            }
            document.querySelector('body.article-type-longform .hero-banner-wrapper').classList.add('herobanner');
          }
          document.querySelector('body.article-type-longform .row .section .layout--onecol').prepend(document.querySelector('body.article-type-longform .hero-banner-wrapper'));
          setTimeout(function () {
            if ($('.article-type-longform .hero-banner-wrapper .hero-banner-items img').length > 0) {

              //Desktop hero banner image height
              var mainImg = $('.hero-banner-items img').first();
              var parallaxBlock = $('.article-type-longform .hero-banner-wrapper');
              var hghtadj = 0;
              if ( $(".node-subheadline").length > 0 ) {
                hghtadj = $(".node-subheadline").offset().top - $(window).height();
              } else {
                hghtadj = $(".group-story-timestamp").offset().top - $(window).height();
              }

              var currhght = parallaxBlock.height();
              parallaxBlock.css('height', Number(currhght - hghtadj));

              //Set min height above 739px screen sizes
              if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.height && window.matchMedia("(min-width: 740px)").matches) {
                document.querySelector('body.article-type-longform .hero-banner-wrapper').style.minHeight = document.querySelector('body.article-type-longform .banner-bg-color').dataset.height + 'px';
              }
              //Set max width for large screen
              if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.width == 1 && window.matchMedia("(min-width: 2173px)").matches) {
                document.querySelector('body.article-type-longform .hero-banner-wrapper').style.maxWidth = "1440px";
              }
              // Hero banner bg for large screen
              if(document.querySelector('body.article-type-longform .banner-bg-color') && document.querySelector('body.article-type-longform .banner-bg-color').dataset.bg) {
                document.querySelector('body.article-type-longform .banner-bg-color').style.background = document.querySelector('body.article-type-longform .banner-bg-color').dataset.bg;
                document.querySelector('body.article-type-longform .banner-bg-color').style.height = document.querySelector('body.article-type-longform .hero-banner-wrapper').style.height;
                document.querySelector('body.article-type-longform .banner-bg-color').style.boxSizing = 'border-box';
                if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.height) {
                  document.querySelector('body.article-type-longform .banner-bg-color').style.minHeight = document.querySelector('body.article-type-longform .banner-bg-color').dataset.height + 'px';
                }
              }
            }
          }, 1);
        }
        // Navbar overlap for mobile
        if (!document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items .desktop-image') &&
          document.querySelector('body.article-type-longform header#navbar') &&
          !document.querySelector('body.article-type-longform .herobanner-video')) {
          document.querySelector('body.article-type-longform header#navbar').classList.add('navbar-blue');
          document.querySelector('body.article-type-longform #main-wrapper').classList.add('navbar-blue');
        }
        // Arrange for mobile version
        if (window.matchMedia("(max-width: "+ maxWidth +")").matches &&
          document.querySelector('body.article-type-longform .longform-chaplinks') ) {
          // Arrange the social icons
          if(document.querySelector('body.article-type-longform header#navbar nav[role=navigation] > .longform-social-button') &&
            !document.querySelector('body.article-type-longform header#navbar nav[role=navigation] .chaplinks-list .longform-social-button')) {
            document.querySelector('body.article-type-longform header#navbar nav[role=navigation] .chaplinks-list').appendChild(document.querySelector('body.article-type-longform header#navbar .longform-social-button'));
            if(!window.canRunAds && document.querySelector('body.article-type-longform .chaplinks-list')) {
              document.querySelector('body.article-type-longform .chaplinks-list').style.height = '100%';
              document.querySelector('body.article-type-longform .chaplinks-list').style.top = '0';
            }
          }

          // Arrange the login
          if(document.querySelector('body.article-type-longform #navbar nav[role=navigation] > .st-profile-menu') &&
            !document.querySelector('body.article-type-longform header#navbar .chaplinks-list .st-profile-menu')) {
            document.querySelector('body.article-type-longform header#navbar .chaplinks-list').appendChild(document.querySelector('body.article-type-longform #navbar nav[role="navigation"] .st-profile-menu'));
          }

          // Arrange the mobile nav
          document.querySelector('body.article-type-longform .longform-chaplinks .visbutton ').onclick = function() {
            if(document.querySelector('body.article-type-longform header#navbar nav[role=navigation] .longform-chaplinks.active')) {
              document.querySelector('body').classList.add('fixed');
            } else {
              document.querySelector('body').classList.remove('fixed');
            }
          };

          // Adjust mobile slide out height
          if (document.querySelector('.highlighted')) {
            document.querySelector('.longform-chaplinks .chaplinks-list').style.height =  window.innerHeight - document.querySelector('.highlighted').clientHeight + 'px';
          }
        }

        // Remove padding gap if Ads is not running
        if (!window.canRunAds &&
          window.matchMedia("(min-width: 740px)").matches &&
          document.querySelector('.highlighted.sticky-nav-padding')) {
          document.querySelector('.highlighted.sticky-nav-padding').style.paddingTop = 0;
        }
        if (!window.canRunAds && document.querySelector('body.article-type-longform .ads.leaderboard')) {
          document.querySelector('body.article-type-longform .ads.leaderboard').style.padding = 0;
        }

        // Arrange the nav menu overlap
        if (document.querySelector('body.article-type-longform .longform-chaplinks')) {
          if((document.querySelector('body.article-type-longform #navbar nav').clientWidth - (document.querySelector('body.article-type-longform .longform-chaplinks').offsetWidth + document.querySelector('body.article-type-longform .nav-home a').offsetWidth + document.querySelector('body.article-type-longform .longform-social-button').offsetWidth)) <= 50 ) {
            document.querySelector('body.article-type-longform #navbar nav .longform-chaplinks').classList.add('nav-dropdown');
            document.querySelector('body.article-type-longform #navbar nav .longform-chaplinks.nav-dropdown .chaplinks-list').addEventListener('click', function() {
              if(document.querySelector('body.article-type-longform #navbar nav .nav-dropdown.active')) {
                document.querySelector('body.article-type-longform #navbar nav .nav-dropdown').classList.remove('active');
              } else {
                document.querySelector('body.article-type-longform #navbar nav .nav-dropdown').classList.add('active');
              }
            });
          }
        }

        // video hero banner
        if (document.querySelector('body.article-type-longform .herobanner-video')) {
          document.querySelector('body.article-type-longform header#navbar').classList.remove('navbar-blue');
          if(document.querySelector('body.article-type-longform .hero-banner-wrapper .hero-banner-items')) {
            document.querySelector('body.article-type-longform .hero-banner-wrapper').style.display = 'none';
          }
          document.querySelector('body.article-type-longform .section .layout--onecol').prepend(document.querySelector('body.article-type-longform .herobanner-video'));
          setTimeout(function () {
            if ($('.article-type-longform .herobanner-video').length > 0) {
              //Hero banner video height
              var parallaxBlock = $('.article-type-longform .herobanner-video');
              var hghtadj = 0;
              if ( $(".node-subheadline").length > 0 ) {
                hghtadj = $(".node-subheadline").offset().top - $(window).height();
              } else {
                hghtadj = $(".group-story-timestamp").offset().top - $(window).height();
              }
              var currhght = parallaxBlock.height();
              parallaxBlock.css('height', Number(currhght - hghtadj));
              // Hero banner video bg for large screen
              if(document.querySelector('body.article-type-longform .banner-bg-color') && document.querySelector('body.article-type-longform .banner-bg-color').dataset.bg) {
                document.querySelector('body.article-type-longform .banner-bg-color').style.background = document.querySelector('body.article-type-longform .banner-bg-color').dataset.bg;
              }
              if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.width == 1 && window.matchMedia("(min-width: 2173px)").matches) {
                document.querySelector('body.article-type-longform .herobanner-video').style.maxWidth = "1440px";
              }
              document.querySelector('body.article-type-longform .banner-bg-color').style.height = document.querySelector('body.article-type-longform .herobanner-video').style.height;
              //Set min height above 739px screen sizes
              if(document.querySelector('body.article-type-longform .banner-bg-color').dataset.height && window.matchMedia("(min-width: 740px)").matches) {
                document.querySelector('body.article-type-longform .banner-bg-color').style.minHeight = document.querySelector('body.article-type-longform .banner-bg-color').dataset.height + 'px';
                document.querySelector('body.article-type-longform .herobanner-video').style.minHeight = document.querySelector('body.article-type-longform .banner-bg-color').dataset.height + 'px';
              }
            }
          }, 1);

        }

        (function () {
          window._IMPORTS_CACHE_ = {}

          // polyfill Promise
          var Promise = window.Promise || (function () {
            function PromiseLike (init) {
              var state = 'pending'
              var resolved, error
              var pendingResolve = []
              var pendingReject = []
              function resolve (value) {
                state = 'resolved'
                resolved = value
                pendingResolve.forEach(function (fn) { fn(value) })
              }
              function reject (err) {
                state = 'rejected'
                error = err
                pendingReject.forEach(function (fn) { fn(err) })
              }

              init(resolve, reject)

              return {
                then: function (onResolve) {
                  if (state === 'rejected') return this
                    return PromiseLike(function (resolve, reject) {
                      var wrappedOnResolve = wrapPending(onResolve, resolve, reject)
                      if (state === 'resolved') wrappedOnResolve(resolved)
                        else pendingResolve.push(wrappedOnResolve)
                      })
                },
                catch: function (onReject) {
                  if (state === 'resolved') return this
                    return PromiseLike(function (resolve, reject) {
                      var wrappedOnReject = wrapPending(onReject, resolve, reject)
                      if (state === 'rejected') wrappedOnReject(error)
                        else pendingReject.push(wrappedOnReject)
                      })
                }
              }
            }

            function wrapPending (pending, onResolve, onReject) {
              return function (value) {
                try {
                  var pendingResolved = pending(value)
                  if (pendingResolved && pendingResolved.then) {
                    pendingResolved
                    .then(function (value) { onResolve(value) })
                    .catch(function (err) { onReject(err) })
                  } else {
                    onResolve(pendingResolved)
                  }
                } catch (err) {
                  onReject(err)
                }
              }
            }

            PromiseLike.resolve = function (value) {
              return PromiseLike(function (resolve) { resolve(value) })
            }
            PromiseLike.reject = function (err) {
              return PromiseLike(function (resolve, reject) { reject(err) })
            }
            return PromiseLike
          })()

          // polyfill fetch
          var fetch = window.fetch || function (url, options) {
            console.log('Fetching', url)
            options = options || {}
            options.method = options.method || 'GET'
            options.headers = options.headers || {}
            return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest()
              xhr.open(options.method, url)
              Object.keys(options.headers).forEach(function (key) {
                xhr.setRequestHeader(key, options.headers[key])
              })
              xhr.withCredentials = options.credentials === 'include'
              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                  try {
                    var response = Object.create({
                      text: function text () {
                        return xhr.responseText
                      },
                      json: function json () {
                        return JSON.parse(xhr.responseText)
                      }
                    })
                    response.ok = xhr.status === 200
                    response.status = xhr.status
                    response.statusText = xhr.statusText
                    response.url = xhr.responseURL
                    response.headers = xhr.getAllResponseHeaders()
                    resolve(response)
                  } catch (err) {
                    reject(err)
                  }
                }
              }
              xhr.onerror = function () { reject(new Error('Network error')) }
              xhr.onabort = function () { reject(new Error('Aborted')) }
              xhr.ontimeout = function () { reject(new Error('Timed out')) }
              xhr.send(options.body)
            })
          }

          var vueComponents = document.querySelectorAll('[data-vue-component]')
          if (vueComponents.length === 0) return
            loadVue().then(function () {
              window.vm = []
              Array.prototype.forEach.call(vueComponents, function ($el, i) {
                var componentUrl = $el.getAttribute('data-component-url')
                var propsUrl = $el.getAttribute('data-props-url')
                var $container = document.createElement('div')
                $el.appendChild($container)
                loadProps(propsUrl).then(function (props) {
                  if (!window._IMPORTS_CACHE_[componentUrl]) {
                    var $link = document.createElement('link')
                    $link.href = componentUrl.replace(/js$/, 'css')
                    $link.rel = 'stylesheet'
                    document.head.appendChild($link)
                  }

                  window.vm[i] = new window.Vue({
                    el: $container,
                    components: {CustomElement: asyncModule(componentUrl)},
                    render: function (h) { return h('custom-element', { props: props }) }
                  })
                }).catch(console.error)
              })
            }).catch(console.error)

            function asyncModule (url) {
              return function (resolve, reject) {
                window._IMPORTS_CACHE_[url] = window._IMPORTS_CACHE_[url] ||
                fetch(url)
                .then(function (res) { return res.text() })
                .then(function (code) {
                  var module = {}
                  var exports = {}
                  module.exports = exports
                    new Function('module', 'exports', code)(module, exports) // eslint-disable-line
                    return module.exports
                  })
                window._IMPORTS_CACHE_[url].then(resolve).catch(reject)
              }
            }

            function loadVue () {
              return new Promise(function (resolve, reject) {
                var $script = document.createElement('script')
                $script.src = 'https://cdn.jsdelivr.net/npm/vue@2.6.14'
                $script.onload = function () { resolve(null) }
                $script.onerror = function () { reject(arguments[4]) }
                document.head.appendChild($script)
              })
            }

            function loadProps (url) {
              if (!url) return Promise.resolve(null)
                return fetch(url).then(function (res) { return res.json() })
            }
          })() // end of vue component
        }); // end of window.onload fn

        window.addEventListener('resize', function(event) {
          if(document.querySelector('body.article-type-longform .banner-bg-color') &&
            !document.querySelector('body.article-type-longform .hero-banner-wrapper') && !document.querySelector('body.article-type-longform .herobanner-video')) {
            getBannerColorHeight();
          }
        });  // end of window.onresize fn

        // Calculate for banner bg height
        function getBannerColorHeight() {
          document.querySelector('body.article-type-longform .banner-bg-color').style.height = document.querySelector('body.article-type-longform .section .layout--onecol.banner-color .node-header').clientHeight + document.querySelector('body.article-type-longform .section .layout--onecol.banner-color .group-story-timestamp').clientHeight + parseInt(window.getComputedStyle(document.querySelector('body.article-type-longform .section .layout--onecol.banner-color .group-longform-content'), null).getPropertyValue('padding-top')) + 'px';
        }

        if (document.querySelector('body.article-type-longform')) {
          // table
          var tables = document.querySelectorAll('body.article-type-longform .field--name-field-paragraph-text table');
          for (var i = 0; i < tables.length; i++) {
            var header = tables[i].querySelectorAll('thead tr th');
            var rows = tables[i].querySelectorAll('tbody tr');
            for (var x = 0; x < rows.length; x++) {
              var items = rows[x].querySelectorAll('td');
              for (var z = 0; z < items.length; z++) {
                items[z].innerHTML = '<span>'+ header[z].innerHTML +'</span><span>'+ items[z].innerHTML +'</span>';
              }
            }
          }
        }
      }
    }
  };

  Drupal.behaviors.live_coverage_render = {
    attach: function (context, settings) {
      // polyfill fn
      function polyfill() {
        if ("classList" in SVGElement.prototype) return;
        Object.defineProperty(SVGElement.prototype, "classList", {
          get: function get() {
            var el = this;
            return {
              add: function add() {
                var classArr = el.getAttribute("class").split(" ");

                for (
                  var _len = arguments.length, args = new Array(_len), _key = 0;
                  _key < _len;
                  _key++
                  ) {
                  args[_key] = arguments[_key];
                }

                args.forEach(function(arg) {
                  if (!classArr.includes(arg)) classArr.push(arg);
                });
                el.setAttribute("class", classArr.join(" "));
              },
              remove: function remove() {
                for (
                  var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
                  _key2 < _len2;
                  _key2++
                  ) {
                  args[_key2] = arguments[_key2];
                }

                var classArr = el
                .getAttribute("class")
                .split(" ")
                .filter(function(cls) {
                  return !args.includes(cls);
                });
                el.setAttribute("class", classArr.join(" "));
              }
            };
          }
        });
      }
      // Live Coverage Page Start
      if (document.querySelector('body.live-coverage-page')) {
          polyfill();
          var maxWidth = '739px';

          if (!document.querySelector('body.live-coverage-page #navbar [role="navigation"] .st-profile-menu') &&
              document.querySelector('body.live-coverage-page #navbar [role="navigation"]')) {
              var profile = document.createElement("div");
              profile.classList.add('st-profile-menu');
              profile.classList.add('hide-mobile');

              var menuUser = document.createElement("ul");
              menuUser.classList.add('menu-user');

              var avatar = document.createElement("label");
              avatar.classList.add('fa');
              avatar.classList.add('fa-avatar');
              avatar.setAttribute('for', "menu-user-input");

              var menuInput = document.createElement("input");
              menuInput.type = "checkbox";
              menuInput.id = "menu-user-input";

              document.querySelector('body.live-coverage-page #navbar [role="navigation"]').appendChild(profile);
              document.querySelector('body.live-coverage-page #navbar [role="navigation"] .st-profile-menu').appendChild(avatar);
              document.querySelector('body.live-coverage-page #navbar [role="navigation"] .st-profile-menu').appendChild(menuInput);
              document.querySelector('body.live-coverage-page #navbar [role="navigation"] .st-profile-menu').appendChild(menuUser);
          }



          window.addEventListener('load', function(event) {
              // Arrange for mobile version
              if (window.matchMedia("(max-width: " + maxWidth + ")").matches &&
                  document.querySelector('body.live-coverage-page .longform-chaplinks')) {
                  // Arrange the social icons
                  if (document.querySelector('body.live-coverage-page header#navbar nav[role=navigation] > .longform-social-button') &&
                      !document.querySelector('body.live-coverage-page header#navbar nav[role=navigation] .chaplinks-list .longform-social-button')) {
                      document.querySelector('body.live-coverage-page header#navbar nav[role=navigation] .chaplinks-list').appendChild(document.querySelector('body.live-coverage-page header#navbar .longform-social-button'));
                      if (!window.canRunAds && document.querySelector('body.live-coverage-page .chaplinks-list')) {
                          document.querySelector('body.live-coverage-page .chaplinks-list').style.height = '100%';
                          document.querySelector('body.live-coverage-page .chaplinks-list').style.top = '0';
                      }
                  }

                  // Arrange the login
                  if (document.querySelector('body.live-coverage-page #navbar nav[role=navigation] > .st-profile-menu') &&
                      !document.querySelector('body.live-coverage-page header#navbar .chaplinks-list .st-profile-menu')) {
                      document.querySelector('body.live-coverage-page header#navbar .chaplinks-list').appendChild(document.querySelector('body.live-coverage-page #navbar nav[role="navigation"] .st-profile-menu'));
                  }

                  // Arrange the mobile nav
                  document.querySelector('body.live-coverage-page .longform-chaplinks .visbutton ').onclick = function() {
                      if (document.querySelector('body.live-coverage-page header#navbar nav[role=navigation] .longform-chaplinks.active')) {
                          document.querySelector('body').classList.add('fixed');
                      } else {
                          document.querySelector('body').classList.remove('fixed');
                      }
                  };

                  // Adjust mobile slide out height
                  if (document.querySelector('.highlighted')) {
                      var totalHeight = document.querySelector('.highlighted').clientHeight + 13;
                      document.querySelector('.longform-chaplinks .chaplinks-list').style.height = window.innerHeight - totalHeight + 'px';
                  }
              }

              // Remove padding gap if Ads is not running
              /*if (!window.canRunAds &&
                  window.matchMedia("(min-width: 740px)").matches &&
                  document.querySelector('.highlighted.sticky-nav-padding')) {
                  document.querySelector('.highlighted.sticky-nav-padding').style.paddingTop = 0;
              }
              if (!window.canRunAds && document.querySelector('body.live-coverage-page .ads.leaderboard')) {
                  document.querySelector('body.live-coverage-page .ads.leaderboard').style.padding = 0;
              }*/

              // Arrange the nav menu overlap
              if (document.querySelector('body.live-coverage-page .longform-chaplinks')) {
                  if ((document.querySelector('body.live-coverage-page #navbar nav').clientWidth - (document.querySelector('body.live-coverage-page .longform-chaplinks').offsetWidth + document.querySelector('body.live-coverage-page .nav-home a').offsetWidth + document.querySelector('body.live-coverage-page .longform-social-button').offsetWidth)) <= 50) {
                      document.querySelector('body.live-coverage-page #navbar nav .longform-chaplinks').classList.add('nav-dropdown');
                      document.querySelector('body.live-coverage-page #navbar nav .longform-chaplinks.nav-dropdown .chaplinks-list').addEventListener('click', function() {
                          if (document.querySelector('body.live-coverage-page #navbar nav .nav-dropdown.active')) {
                              document.querySelector('body.live-coverage-page #navbar nav .nav-dropdown').classList.remove('active');
                          } else {
                              document.querySelector('body.live-coverage-page #navbar nav .nav-dropdown').classList.add('active');
                          }
                      });
                  }
              }

              (function() {
                  window._IMPORTS_CACHE_ = {}

                  // polyfill Promise
                  var Promise = window.Promise || (function() {
                      function PromiseLike(init) {
                          var state = 'pending'
                          var resolved, error
                          var pendingResolve = []
                          var pendingReject = []

                          function resolve(value) {
                              state = 'resolved'
                              resolved = value
                              pendingResolve.forEach(function(fn) {
                                  fn(value)
                              })
                          }

                          function reject(err) {
                              state = 'rejected'
                              error = err
                              pendingReject.forEach(function(fn) {
                                  fn(err)
                              })
                          }

                          init(resolve, reject)

                          return {
                              then: function(onResolve) {
                                  if (state === 'rejected') return this
                                  return PromiseLike(function(resolve, reject) {
                                      var wrappedOnResolve = wrapPending(onResolve, resolve, reject)
                                      if (state === 'resolved') wrappedOnResolve(resolved)
                                      else pendingResolve.push(wrappedOnResolve)
                                  })
                              },
                              catch: function(onReject) {
                                  if (state === 'resolved') return this
                                  return PromiseLike(function(resolve, reject) {
                                      var wrappedOnReject = wrapPending(onReject, resolve, reject)
                                      if (state === 'rejected') wrappedOnReject(error)
                                      else pendingReject.push(wrappedOnReject)
                                  })
                              }
                          }
                      }

                      function wrapPending(pending, onResolve, onReject) {
                          return function(value) {
                              try {
                                  var pendingResolved = pending(value)
                                  if (pendingResolved && pendingResolved.then) {
                                      pendingResolved
                                          .then(function(value) {
                                              onResolve(value)
                                          })
                                          .catch(function(err) {
                                              onReject(err)
                                          })
                                  } else {
                                      onResolve(pendingResolved)
                                  }
                              } catch (err) {
                                  onReject(err)
                              }
                          }
                      }

                      PromiseLike.resolve = function(value) {
                          return PromiseLike(function(resolve) {
                              resolve(value)
                          })
                      }
                      PromiseLike.reject = function(err) {
                          return PromiseLike(function(resolve, reject) {
                              reject(err)
                          })
                      }
                      return PromiseLike
                  })()

                  // polyfill fetch
                  var fetch = window.fetch || function(url, options) {
                      console.log('Fetching', url)
                      options = options || {}
                      options.method = options.method || 'GET'
                      options.headers = options.headers || {}
                      return new Promise(function(resolve, reject) {
                          var xhr = new XMLHttpRequest()
                          xhr.open(options.method, url)
                          Object.keys(options.headers).forEach(function(key) {
                              xhr.setRequestHeader(key, options.headers[key])
                          })
                          xhr.withCredentials = options.credentials === 'include'
                          xhr.onreadystatechange = function() {
                              if (xhr.readyState === 4) {
                                  try {
                                      var response = Object.create({
                                          text: function text() {
                                              return xhr.responseText
                                          },
                                          json: function json() {
                                              return JSON.parse(xhr.responseText)
                                          }
                                      })
                                      response.ok = xhr.status === 200
                                      response.status = xhr.status
                                      response.statusText = xhr.statusText
                                      response.url = xhr.responseURL
                                      response.headers = xhr.getAllResponseHeaders()
                                      resolve(response)
                                  } catch (err) {
                                      reject(err)
                                  }
                              }
                          }
                          xhr.onerror = function() {
                              reject(new Error('Network error'))
                          }
                          xhr.onabort = function() {
                              reject(new Error('Aborted'))
                          }
                          xhr.ontimeout = function() {
                              reject(new Error('Timed out'))
                          }
                          xhr.send(options.body)
                      })
                  }

                  var vueComponents = document.querySelectorAll('[data-vue-component]')
                  if (vueComponents.length === 0) return
                  loadVue().then(function() {
                      window.vm = []
                      Array.prototype.forEach.call(vueComponents, function($el, i) {
                          var componentUrl = $el.getAttribute('data-component-url')
                          var propsUrl = $el.getAttribute('data-props-url')
                          var $container = document.createElement('div')
                          $el.appendChild($container)
                          loadProps(propsUrl).then(function(props) {
                              if (!window._IMPORTS_CACHE_[componentUrl]) {
                                  var $link = document.createElement('link')
                                  $link.href = componentUrl.replace(/js$/, 'css')
                                  $link.rel = 'stylesheet'
                                  document.head.appendChild($link)
                              }

                              window.vm[i] = new window.Vue({
                                  el: $container,
                                  components: {
                                      CustomElement: asyncModule(componentUrl)
                                  },
                                  render: function(h) {
                                      return h('custom-element', {
                                          props: props
                                      })
                                  }
                              })
                          }).catch(console.error)
                      })
                  }).catch(console.error)

                  function asyncModule(url) {
                      return function(resolve, reject) {
                          window._IMPORTS_CACHE_[url] = window._IMPORTS_CACHE_[url] ||
                              fetch(url)
                              .then(function(res) {
                                  return res.text()
                              })
                              .then(function(code) {
                                  var module = {}
                                  var exports = {}
                                  module.exports = exports
                                  new Function('module', 'exports', code)(module, exports) // eslint-disable-line
                                  return module.exports
                              })
                          window._IMPORTS_CACHE_[url].then(resolve).catch(reject)
                      }
                  }

                  function loadVue() {
                      return new Promise(function(resolve, reject) {
                          var $script = document.createElement('script')
                          $script.src = 'https://cdn.jsdelivr.net/npm/vue@2.6.14'
                          $script.onload = function() {
                              resolve(null)
                          }
                          $script.onerror = function() {
                              reject(arguments[4])
                          }
                          document.head.appendChild($script)
                      })
                  }

                  function loadProps(url) {
                      if (!url) return Promise.resolve(null)
                      return fetch(url).then(function(res) {
                          return res.json()
                      })
                  }
              })() // end of vue component
          }); // end of window.onload fn
      }
      // Live Coverage Page END
    }
  };

  // Fadeshower
  Drupal.behaviors.fadeshower = {
    attach: function (context, settings) {
      $(document).ready(function () {
        $('.card-media').each(function (ind, elem) {
          var fadecount = $(elem).children('ul').children('li').length;
          if (fadecount > 6) {
            $(elem).children('ul').children('li').each(function (inder, elemer) {
              if (inder >= 6) {
                $(elemer).css('display', 'none');
              }
            });
            $(elem).addClass('fadecount6');
          } else if (fadecount <= 6 && fadecount > 1) {
            $(elem).addClass('fadecount' + fadecount);
          }
        });
      });
    }
  };

  // SPH Login remove subscribe.
  Drupal.behaviors.mysph_login = {
    attach: function (context, settings) {

      function addObserverIfDesiredNodeAvailable() {
        var targetNode = $('.user-signup-section')[1];
        if (!targetNode) {
          window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
          return;
        }
        const config = { attributes: true, childList: true, subtree: true };

        const callback = function (mutationsList, observer) {
          if (_data.visitorcat > 1 && !$('li.nav-subscribe').hasClass('hidden')) {
            $('li.nav-subscribe').addClass('hidden');
          }
          if ($('.user-login-dd').length) {
            $('.block-user-menu').addClass('logged-in');
          }
          else {
            $('.block-user-menu').removeClass('logged-in');
          }
        };

        const observer = new MutationObserver(callback);

        observer.observe(targetNode, config);
      }
      addObserverIfDesiredNodeAvailable();
    }
  };

  // Timestamp to Date
  Drupal.behaviors.timestamp_to_date = {
    attach: function (context, settings) {
      function convertTimeStampToDate(st_timestamp) {
        var today = new Date();
        var tweleveHoursAgo = new Date(today.getTime() - (1000*60*60*12));
        var tweleveHoursAgoTimeStamp = Math.round((tweleveHoursAgo).getTime() / 1000);
        var dateFormat = {
            timeZone: 'Asia/Singapore',
            day:   'numeric',
            month: 'short',
            year:  'numeric',
            hour:   'numeric',
            minute: '2-digit',
            hour12: true,
        };

        var fieldDate = new Date((st_timestamp * 1000));
        if(st_timestamp > tweleveHoursAgoTimeStamp) {
            var microSecondsDiff = Math.abs(fieldDate.getTime() - today.getTime());
            var hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
            var minsDiff = Math.floor(microSecondsDiff / (1000 * 60));
            var secsDiff = Math.floor(microSecondsDiff / 1000);
            if(hoursDiff == 1) {
                 return hoursDiff + ' hour ago';
            } else if(hoursDiff > 1) {
                return hoursDiff + ' hours ago';
            } else if(minsDiff == 1) {
                return minsDiff + ' min ago';
            } else if(minsDiff > 1) {
                return minsDiff + ' mins ago';
            } else {
                return secsDiff + ' secs ago';
            }
        } else {
            return fieldDate.toLocaleString(undefined, dateFormat);
        }
      }

      $(document).ready(function () {
        // Article Latest Block
        $('.card-time time').each(function (i) {
          var cardtimestamp = $(this).attr('data-created-timestamp');
          if (typeof cardtimestamp != 'undefined') {
            var dateValue = convertTimeStampToDate(cardtimestamp);
            $(this).html(dateValue);
          }
        });
        // Videos Latest Block
        $('.card-video-with-time .card-time').each(function (i) {
          var cardtimestamp = $(this).attr('data-created-timestamp');
          if (typeof cardtimestamp != 'undefined') {
            var dateValue = convertTimeStampToDate(cardtimestamp);
            $(this).children().html(dateValue);
          }
        });
      });
    }
  };

  Drupal.behaviors.edition_cookies = {
    attach: function (context, settings) {
      if($(".sinlink-ed").length) {
        $(".sinlink-ed").click(function(){
          $.cookie("edition", "singapore", { expires: 7, path: '/' });
        });
      }
      if($(".globallink-ed").length) {
        $(".globallink-ed").click(function(){
          $.cookie("edition", "global", { expires: 7, path: '/' });
        });
      }
    }
  };

})(jQuery, Drupal, drupalSettings);

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var isArticlePage = false;
if (typeof _data != 'undefined' && typeof _data.articleid != 'undefined' && _data.articleid != "") {
isArticlePage = true;
}

/** Get cookie by name */
window.getCookieByName = function (name) {
    match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) { return match[1];
    }
}

var emptyBICount = 0;
googletag.pubads().addEventListener('slotRenderEnded', function(event) {
    if (event.isEmpty && googletag.slots["midarticlespecial"] == event.slot) {
        if (document.getElementById("dfp-ad-midarticlespecial-wrapper")) {
            document.getElementById("dfp-ad-midarticlespecial-wrapper").style.display = "none";
        }
    }
    if (event.isEmpty && googletag.slots["midarticlespecial2"] == event.slot) {
        if (document.getElementById("dfp-ad-midarticlespecial2-wrapper")) {
            document.getElementById("dfp-ad-midarticlespecial2-wrapper").style.display = "none";
        }
    }
    //Hide BI container if not filled
    if (event.isEmpty && (googletag.slots["bi1"] == event.slot || googletag.slots["bi2"] == event.slot || googletag.slots["bi3"] == event.slot || googletag.slots["bi4"] == event.slot || googletag.slots["bi5"] == event.slot || googletag.slots["bi6"] == event.slot)) {
        emptyBICount++;
        if (emptyBICount == 6) {
            jQuery("#dfp-ad-bi1").parents('.layout--threecol').hide();
        }
    }
    //Remove unfilled impressions for prestitial and postitial
    if (event.isEmpty && (googletag.slots["prestitial"] == event.slot || googletag.slots["postitial"] == event.slot)) {
      if (window.getCookieByName("topOverlayImpressionsServed") != undefined) {
        topOverlayImpressionsServed = parseInt(window.getCookieByName("topOverlayImpressionsServed"));
        if (topOverlayImpressionsServed > 0) {
          topOverlayImpressionsServed = topOverlayImpressionsServed - 1;
        }
        else {
          topOverlayImpressionsServed = topOverlayImpressions - 1;
        }
        var expiry = new Date();
        expiry.setTime(expiry.getTime() + (overlay_validity*60*60*1000));
        document.cookie = "topOverlayImpressionsServed=" + topOverlayImpressionsServed +";expires=" + expiry + ";path=/";
        if (window.getCookieByName("topoverlayDisplayed") != undefined) {
          var d = new Date();
          d.setTime(d.getTime() - (24 * 60 * 60));
          var expires = "expires=" + d.toUTCString();
          document.cookie = "topoverlayDisplayed=no;" + expires + ";path=/";
        }
      }
    }
});


document.addEventListener('ldapLoginDetailsReceived', function(e) {
  // Hide the login for corplan users
  if(typeof token_data !== 'undefined' && token_data.service_type_value == 4){
    jQuery(".block-user-menu").attr("style", "display:none !important");
  }
  // Hide logout and manage account links for seamless login users
  if(typeof token_data !== 'undefined' && token_data.seamless_login_from_app == 'yes'){
    jQuery(".user-signup-section .dropdown-menu").attr("style", "display:none !important");
  }
},false);
