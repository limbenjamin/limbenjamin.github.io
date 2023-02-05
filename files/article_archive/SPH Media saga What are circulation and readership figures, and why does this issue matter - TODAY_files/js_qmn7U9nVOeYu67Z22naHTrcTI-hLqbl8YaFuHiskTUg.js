/**
 * @file
 * JS for video form.
 */

(function ($) {
  Drupal.behaviors.brightcoveChosen = {
    attach: function () {
      let submitButtons = $('input[type="submit"]');
      let isFileField = false;

      $('input[type="file"]').mousedown(function () {
        isFileField = true;
      });

      // Disable buttons while the uploading is running.
      $(document).ajaxStart(function (event) {
        if (isFileField) {
          submitButtons.prop('disabled', true);
        }
      });

      // Enable buttons after the upload is finished.
      $(document).ajaxStop(function () {
        if (isFileField) {
          submitButtons.prop('disabled', false);
          isFileField = false;
        }
      });
    }
  }
})(jQuery);
;
(function ($, Drupal, document) {

  /**
   *
   * Define namespace with common method to use for Adaobe analytics workflow.
   * @type {{isAuthenticate: (function(id, url, type): boolean)}}
   */

  window._adobeUtility = {
    adobeAnalyticsTrack: function(event, data) {
      data = this.buildParam(event, data);
      console.log(`track ${event}`, data);
      _satellite.track(event, data);
    },
    buildParam: function (event, data) {
      const loginsource = {
        mediacorpidp: 'Mediacorp',
        google: 'Google',
        facebook: 'Facebook',
        apple: 'Apple'
      };
      let defaultParams = {
        'ssoid': 'NA',
        'noadflag': false,
        'loginstatus': false,
        'loginsource': 'NA',
        'usertype': 'NA',
      };

      if (ssoMeConnect.isAuthenticate()) {
        defaultParams = Object.assign(defaultParams, {
          'ssoid': ssoMeConnect.getCookie('sso_id'),
          'loginstatus': true,
          'loginsource': ssoMeConnect.getCookie('sso_source') ? loginsource[ssoMeConnect.getCookie('sso_source')] : 'Mediacorp',
          'usertype': 'Free'
        });
      }

      return $.extend({}, defaultParams, data);
    },
    // adobeAudioTrack: function (nid, url, parent = document) {
    //   if (window.playerjs !== undefined) {
    //     $('iframe[identity="omny"]', parent).once('audio-track').each(function () {
    //       let player;
    //       let playerMediaId = $(this).attr('media-id');
    //       player = new playerjs.Player(this);
    //       player.on('ready', function () {
    //           _adobeUtility.adobeAnalyticsTrack('omniload', {
    //             content_id: nid ? nid : 'NA',
    //             id: playerMediaId,
    //             type: 'Audio',
    //             path: url,
    //             obj: player,
    //             player: 'PC'
    //           });
    //         }
    //       );
    //     });
    //   }
    // },
    adobeMediaPlayerTrack: function(nid, url, parent = document) {
      if (window.MediaElementPlayer != undefined) {
        $('#audio-player-mediaelement', parent).once('radio-track').each(function () {
          if ($(this).find("audio") && $(this).find("audio")[0] && $(this).find("audio")[0].player) {
            let player = $(this).find("audio")[0].player;
            let playerMediaId = $(this).find("audio").attr('media-id');
            _adobeUtility.adobeAnalyticsTrack('omniload', {
              content_id: nid ? nid : 'NA',
              id: playerMediaId,
              type: 'Audio',
              path: url,
              obj: player,
              player: 'PC'
            });
          }
        });
      }
    },
    adobeBrightcoveVideoTrack: function(nid, url, parent = document) {
      // Video media event analytics track.
      _adobeUtility.trackVideo(nid, url, parent);
    },
    adobeBrightcoveVideoTrackDelayed: function(nid, url, parent = document) {
      // Video media event analytics track.
      setTimeout(function(){
        _adobeUtility.trackVideo(nid, url, parent);
      }, 3000);
    },
    trackVideo: function(nid, url, parent) {
      if (window.videojs !== undefined) {
        // let players = videojs.getPlayers();
        // if (!players || !Object.keys(players).length) {
        //   return;
        // }
        let videoEle = $(parent).find('.brightcove-player video-js');
        videoEle.each(function () {
          // Handle multiple load, when video is in carousel.
          if ($(this).parents('.slick-cloned').length) {
            return;
          }
          const videoMediaId = $(this).attr('media-id');
          const id = $(this).attr('id');
          if (id && id.length) {
            const player = window.videojs.getPlayer(id);
            player.on("play", function() {console.log(id, 'playing')});
            player.on("pause", function() {console.log(id, 'paused')});
            player.on("ended", function() {console.log(id, 'ended')});
            player.on("seeking",function() {console.log(id, 'seeking')});
            player.on("seeked", function() {console.log(id, 'seekid')});
            player.on("dispose", function() {console.log(id, 'destroy')});
            player.on('ads-before-request', (e) => {
              const {adsRequest} = e;
              adsRequest.omidAccessModeRules = {};
              adsRequest.omidAccessModeRules[google.ima.OmidVerificationVendor.GOOGLE] = google.ima.OmidAccessMode.FULL;
              adsRequest.omidAccessModeRules[google.ima.OmidVerificationVendor.MOAT] = google.ima.OmidAccessMode.FULL;
              adsRequest.omidAccessModeRules[google.ima.OmidVerificationVendor.OTHER] = google.ima.OmidAccessMode.FULL;
            });
            if(videoMediaId && player) {
              _adobeUtility.adobeAnalyticsTrack('omniload', {
                content_id: nid ? nid : 'NA',
                id: videoMediaId,
                type: 'Video',
                path: url,
                obj: player,
                player: 'BC6'
              });
            }
          }
        });
      }
    },
    /**
     * Replace the ids for ads to avoid repeated ads markup.
     *
     * @param adsHtml
     * @param adEntity
     * @param pSource
     * @param pDest
     * @param parseData
     * @returns {*}
     */
    replaceAdsIds: function (adsHtml, adEntity, pSource, pDest, parseData= true) {
      if (typeof adsHtml !== 'undefined' && adsHtml) {
        adsHtml = adsHtml.replace(`ad-desktop-${adEntity}-${pSource}`, `ad-desktop-${adEntity}-${pDest}`);
        adsHtml = adsHtml.replace(`ad-mobile-${adEntity}-${pSource}`, `ad-mobile-${adEntity}-${pDest}`);
        adsHtml = adsHtml.replace(`ad-tablet-${adEntity}-${pSource}`, `ad-tablet-${adEntity}-${pDest}`);
        adsHtml = adsHtml.replace(`ad-mobile_android-${adEntity}-${pSource}`, `ad-mobile_android-${adEntity}-${pDest}`);
        adsHtml = adsHtml.replace(`ad-mobile_ios-${adEntity}-${pSource}`, `ad-mobile_ios-${adEntity}-${pDest}`);
        adsHtml = adsHtml.replace(`ad-tablet_android-${adEntity}-${pSource}`, `ad-tablet_android-${adEntity}-${pDest}`);
        adsHtml = adsHtml.replace(`ad-tablet_ios-${adEntity}-${pSource}`, `ad-tablet_ios-${adEntity}-${pDest}`);
        return parseData ? $.parseHTML(adsHtml) : adsHtml;
      }
      return false;
    }
  };
})(jQuery, Drupal, window.document);
;
/**
 * @file
 */
(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Analytics should only trigger once, so not using behaviours here.
   */
  if(drupalSettings.mc_adobe_advertisement_provider !== undefined) {
    let nid = drupalSettings.mc_adobe_advertisement_provider.id;
    let url = drupalSettings.path.isFront ? '/' : drupalSettings.mc_adobe_advertisement_provider.url;
    let type = drupalSettings.mc_adobe_advertisement_provider.type;
    // @todo Move these hardcoded type values to mc global configuration.
    const types = {
      article: 'Article',
      audio: 'Audio',
      video: 'Video',
      author: 'Author',
      standard: 'Standard',
      minute: 'Minute',
      poem: 'Poem',
      word: 'Word',
    };

    // Page view event analytics.
    let urlPath = $(location).attr('pathname');
    if (!urlPath.match(/^\/search$/)) {
      // Search result comes via Algolia js so need to send on widnow.load
      _adobeUtility.adobeAnalyticsTrack('pageview', { id:nid, type:types[type], path: url, searchresultcount: 'NA', searchterm:'NA'});
    }
    $(document).ready(function() {
      // Media Video event analytics track.
      _adobeUtility.adobeBrightcoveVideoTrack(nid, url);
      // Track Mediaelement audio players;.
      _adobeUtility.adobeMediaPlayerTrack(nid, url);
    });
    // Omnymedia event analytics track.
    //_adobeUtility.adobeAudioTrack(nid, url);
  }
  //Destroy player when navigating away from page.
  Drupal.behaviors.destroybcplayer = {
    attach: function (context, settings) {
      window.onbeforeunload = function() {
        $('.video-js').each(function() {
          videojs.getPlayer(this.id).ready(function () {
            let myPlayer = this;
            myPlayer.dispose();
            console.log(this.id + " disposed");
          });
        });
      };
    }
  };
})(jQuery, Drupal, drupalSettings);
;
//layout configration block -- media edit block box height issue
jQuery(document).ajaxComplete(function(){
  jQuery(".ui-dialog .ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix").siblings(".ui-front.ui-dialog-content.ui-widget-content").addClass("edit-ui-widget");
});
;
"use strict";(function(a){Drupal.behaviors.text={attach:function attach(b){a(b).find(".text-long .align-left").wrap("<div class=\"align-left\"></div>"),a(b).find(".text-long .align-center").wrap("<div class=\"align-center\"></div>"),a(b).find(".text-long .align-right").wrap("<div class=\"align-right\"></div>")}}})(jQuery);;
/**
 * Attaches the list bullet behavior to hide bullet before image.
 *
 * @type {Drupal~behavior}
 */
 (function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.ListBullet = {
    attach: function (context, drupalSettings) {
      $("li").each(function() {
        if($(this).has('img').length>0){
          $(this).addClass('nobullet');
        }
      });
    }
  }
})(jQuery, Drupal, drupalSettings);
;
"use strict";(function(a){if(Drupal.behaviors.stickyHeader={attach:function attach(b){var c=a(window).width(),d=0,e=a(".main-menu__item--with-sub",b);a(window).scroll(function(){90<a(this).scrollTop()?(a("header").addClass("header--sticky"),a(".main").addClass("main--gutter")):(a("header").removeClass("header--sticky"),a(".main").removeClass("main--gutter"))}),0<e.length&&a(".header__secondary").scrollLeft(function(){e.hover(function(b){b.preventDefault();var e=a(this).offset(),f=a(this).children(".main-menu--sub").outerWidth();d=e.left+f,d>c?a(this).children(".main-menu--sub").css("left",e.left-(d-c)):a(this).children(".main-menu--sub").css("left",e.left)})})}},768>window.innerWidth&&"ontouchstart"in document.documentElement){var b=document.createElement("meta");b.name="viewport",b.content="width=device-width,height="+window.innerHeight+", initial-scale=1.0",document.getElementsByTagName("head")[0].appendChild(b)}var c=a("#algolia-search-input"),d=a("#algolia-autocomplete-reset");d.css({visibility:"hidden"}),c.on("input",function(){""==c.val()?d.css({visibility:"hidden"}):d.css({visibility:"visible"})}),a(".logged-in-user.inline-menu__link").on("click",function(b){b.preventDefault(),a(document.body).addClass("is-popup")}),a(document.body).on("dialogclose",".ui-dialog",function(){a(document.body).removeClass("is-popup")})})(jQuery);;
/**
 * @file
 * Parse inline JSON and initialize the breakpointSettings global object.
 */

(function (drupalSettings, window) {

  'use strict';

  /**
   * Variable generated by Breakpoint settings.
   *
   * @global
   *
   * @type {object}
   */
  window.themeBreakpoints = {};

  if (typeof drupalSettings['theme_breakpoints'] !== 'undefined') {

    window.themeBreakpoints = new function () {
      this.Breakpoints = JSON.parse(drupalSettings['theme_breakpoints']);
      this.currentBreakpoint = false;

      this.getCurrentBreakpoint = function () {
        return this.currentBreakpoint;
      };

      var triggerBreakpointChange = function () {
        // This is deprecated but needed for IE compatibility.
        var breakpoint_changed_event = document.createEvent('CustomEvent');
        breakpoint_changed_event.initCustomEvent('themeBreakpoint:changed', true, true, this.currentBreakpoint);
        window.dispatchEvent(breakpoint_changed_event);
      }.bind(this);

      this.breakpointChangeHandler = function () {
        var mqls = this.mediaQueryListeners;
        var breakpointCandidate = false;
        for (var i = 0; i < mqls.length; i++) {
          if (mqls[i].matches) {
            breakpointCandidate = this.Breakpoints[i];
          }
        }
        if (breakpointCandidate && breakpointCandidate !== this.currentBreakpoint) {
          this.currentBreakpoint = breakpointCandidate;
          triggerBreakpointChange();
        }
      }.bind(this);

      this.mediaQueryListeners = function () {
        var breakpoints = this.Breakpoints;
        if (!Array.isArray(breakpoints) || breakpoints.length === 0) {
          return [];
        }
        var currentBreakpoint = false;
        var mqls = [];
        for (var i = 0; i < breakpoints.length; i++) {
          if (breakpoints[i].mediaQuery === '') {
            breakpoints[i].mediaQuery = '(min-width: 0em)';
          }
          var mql = window.matchMedia(breakpoints[i].mediaQuery);
          mql.addListener(this.breakpointChangeHandler);
          mqls.push(mql);
          if (mql.matches) {
            currentBreakpoint = breakpoints[i];
          }
        }

        this.currentBreakpoint = currentBreakpoint;

        return mqls;
      }.call(this);
    }();
  }

})(drupalSettings, window);
;
"use strict";(function(a,b){'use strict';b.behaviors.backToTopButton={attach:function attach(b){function c(){var b=document.documentElement,c=b.scrollHeight-b.clientHeight,d=b.scrollTop;0===d&&a("#back-to-top").css("visibility","revert");.65<d/c&&"hidden"!==a("#back-to-top").css("visibility")?"none"===a("#back-to-top").css("display")&&a("#back-to-top").fadeIn(300):"block"===a("#back-to-top").css("display")&&a("#back-to-top").fadeOut(300)}var d=a("#back-to-top",b);d.on("click",function(c){c.preventDefault(),a("html, body",b).animate({scrollTop:0},"300"),"block"===a("#back-to-top").css("display")&&a("#back-to-top").css("visibility","hidden")}),window.onscroll=function(){c()}}}})(jQuery,Drupal);;
