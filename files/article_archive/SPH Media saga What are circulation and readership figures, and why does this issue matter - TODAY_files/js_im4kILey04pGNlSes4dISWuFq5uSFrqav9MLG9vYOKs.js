"use strict";(function(a){Drupal.behaviors.copyToClipboard={attach:function attach(){a(".copy-link__btn").once().click(function(){var b=new ClipboardJS(".copy-link__btn");b.on("success",function(b){a(b.trigger).find(".copy-link__text").text("LINK COPIED"),b.clearSelection(),setTimeout(function(){a(b.trigger).find(".copy-link__text").text("COPY")},5e3)});var c=a(this).attr("data-clipboard-text"),d=c?c.split(".com")[1]:"";_adobeUtility.adobeAnalyticsTrack("click",{clickname:"Click on Copy",path:d})})}}})(jQuery);;
"use strict";(function(a){Drupal.behaviors.popup={attach:function attach(b){function c(a){var b=a.category,c=a.category_url,d=a.link,e=a.heading,f=a.link_absolute,g=a.cidCode;return"<div class=\"share-link\">\n          <div class=\"share-link__content\">\n            <p class=\"list-object__category category\">\n            ".concat(c&&b?"<a class=\"link link--\" href=\"".concat(c,"\">\n                ").concat(b,"\n              </a>"):"".concat(b?b:""),"\n            </p>\n            <h5 class=\"h5 list-object__heading\">\n              ").concat(d&&e?"<a class=\"h5__link list-object__heading-link\" href=\"".concat(d,"\">\n                  ").concat(e,"\n                </a>"):"".concat(e?e:""),"\n            </h5>\n          </div>\n          <h6 class=\"h6 h6--share-heading\">\n            Share this via\n          </h6>\n          <div class=\"share-link__items\">\n            <div class=\"a2a-share-link a2a_kit\" data-a2a-url=\"").concat(f,"\" data-a2a-title=\"").concat(e,"\" style=\"line-height: 16px;\">\n              <a class=\"link\" target=\"_blank\" rel=\"nofollow noopener\" href=\"https://api.whatsapp.com/send?text=").concat(e," ").concat(f,"&cid=").concat(g,"\">\n                <svg class=\"link__icon\">\n                  <use xlink:href=\"/profiles/custom/mediacorp/themes/mc_core_theme/dist/icons.svg#icon-social-filled-whatsapp\"></use>\n                </svg>\n                <span class=\"link__text a2a_label\">\n                WhatsApp\n                </span>\n              </a>\n              <a class=\"link\" target=\"_blank\" rel=\"nofollow noopener\" href=\"https://telegram.me/share/url?url=").concat(f,"&text=").concat(e,"&cid=").concat(g,"\">\n                <svg class=\"link__icon\">\n                  <use xlink:href=\"/profiles/custom/mediacorp/themes/mc_core_theme/dist/icons.svg#icon-social-filled-telegram\"></use>\n                </svg>\n                <span class=\"link__text a2a_label\">\n                Telegram\n                </span>\n              </a>\n              <a class=\"link\" target=\"_blank\" rel=\"nofollow noopener\" href=\"https://www.facebook.com/sharer/sharer.php?u=").concat(f,"&t=").concat(e,"&cid=").concat(g,"\">\n                <svg class=\"link__icon\">\n                  <use xlink:href=\"/profiles/custom/mediacorp/themes/mc_core_theme/dist/icons.svg#icon-social-filled-facebook\"></use>\n                </svg>\n                <span class=\"link__text a2a_label\">\n                Facebook\n                </span>\n              </a>\n              <a class=\"link\" target=\"_blank\" rel=\"nofollow noopener\" href=\"https://twitter.com/intent/tweet?text=").concat(e," ").concat(f,"&cid=").concat(g,"\">\n                <svg class=\"link__icon\">\n                  <use xlink:href=\"/profiles/custom/mediacorp/themes/mc_core_theme/dist/icons.svg#icon-social-filled-twitter\"></use>\n                </svg>\n                <span class=\"link__text a2a_label\">\n                Twitter\n                </span>\n              </a>\n              <a class=\"link\" target=\"_blank\" rel=\"nofollow noopener\" href=\"mailto:?subject=").concat(e,"&body=").concat(f,"&cid=").concat(g,"\">\n                <svg class=\"link__icon\">\n                  <use xlink:href=\"/profiles/custom/mediacorp/themes/mc_core_theme/dist/icons.svg#icon-social-filled-mail\"></use>\n                </svg>\n                <span class=\"link__text a2a_label\">\n                Email\n                </span>\n              </a>\n              <a class=\"link\" target=\"_blank\" rel=\"nofollow noopener\" href=\"https://www.linkedin.com/shareArticle?url=").concat(f,"&title=").concat(e,"&cid=").concat(g,"\">\n                <svg class=\"link__icon\">\n                  <use xlink:href=\"/profiles/custom/mediacorp/themes/mc_core_theme/dist/icons.svg#icon-social-filled-linked-in\"></use>\n                </svg>\n                <span class=\"link__text a2a_label\">\n                LinkedIn\n                </span>\n              </a>\n            </div>\n          </div>\n          <h6 class=\"h6 h6--share-heading copy-text \">\n            Copy the link\n          </h6>\n          ").concat(f?"\n            <div class=\"copy-link\">\n              <input class=\"copy-link__input\" readonly=\"readonly\" type=\"text\" value=\"".concat(f,"\"/>\n              <button class=\"copy-link__btn\" data-clipboard-text=\"").concat(f,"\">\n                <span class=\"copy-link__text\">\n                  COPY\n                </span>\n              </button>\n          </div>\n          "):"","\n        </div>")}setTimeout(function(){a(".trigger-popup").once("popup").click(function(){var e=a(this).parents(".js-popup-content"),f=a(".js-popup");if(a(this).hasClass("trigger-popup--share")){var g=new Date,d=g.getMonth()+1,h=g.getDate(),i=g.getFullYear(),j=(2>(""+h).length?"0":"")+h+(2>(""+d).length?"0":"")+d+i,k={category:a(this).attr("data-category"),category_url:a(this).attr("data-category_url"),link:a(this).attr("data-link"),heading:a(this).attr("data-heading"),link_absolute:a(this).attr("data-link_absolute"),cidCode:"internal_sharetool_web_".concat(j,"_tdy")};f.find(".popup__content").html(c(k))}else{var l=e.find(".popup-content");if(f.find(".popup__content").html(l.html()),a(this).hasClass("trigger-popup--search")){f.addClass("js-popup-search");var m=a(this).parents(".search-result.media-object");if(0<m.length){var n="<div class=\"search-result-popup\" data-origin=\"".concat(m.data("origin"),"\" data-item-link=\"").concat(m.data("item-link"),"\" data-origin-id=\"").concat(m.data("origin-id"),"\"></div>");f.find(".popup__content").wrapInner(n)}}}f.addClass("is-open-popup"),a("body").addClass("is-popup"),a2a&&a2a.init("page"),Drupal.behaviors.bookmarkSocialShare.attach(b),Drupal.behaviors.copyToClipboard.attach(b)})},2e3),a(".popup__close, .popup__overlay").click(function(){var b=a(window).scrollTop(),c=a(this).parents(".js-popup");c.find(".popup__content").html(""),c.removeClass("is-open-popup"),a("body").removeClass("is-popup"),a(window).scrollTop(b)}),a(".bookmark-link-anonymous").on("click",function(){a(document.body).addClass("is-popup")}),a(document.body).on("dialogclose",".ui-dialog",function(){a(document.body).removeClass("is-popup")})}}})(jQuery);;
(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.liveBlogLp = {
    attach: function (context, settings) {
      $(document).on('click', '#LB24 .lb24-default-list-keypoint .lb24-keypoint-timeline-item a', function() {
        let news_id = $(this).attr('href');
        let news_parent = $(news_id).parents('.lb24-default-list-item');
        $('html, body').animate({
          scrollTop: news_parent.offset().top - (($('.toolbar-tray-horizontal') && $('.toolbar-tray-horizontal').length) ? 165 : 85)
        },50);
      });
    }
  }
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.AlgoliaSearchModal = {
    attach: function (context, settings) {
      var searchMenu = $('nav li span.search-menu-link');
      var allSectionMenu = $('nav#main-nav span.all-section-menu');
      var searchModel = $('#algolia-search-modal');
      var applicationId = drupalSettings.mc_algolia_creds.applicationId;
      var apiKey = drupalSettings.mc_algolia_creds.apiKey;
      var searchIndex = drupalSettings.mc_algolia_creds.searchQsIndex;
      var searchActualIndex = drupalSettings.mc_algolia_creds.searchIndex;

      var initialised = false;

      searchModel.click(function() {
        if ((!$(event.target).closest('.algolia-search-modal__center').length) && (!$(event.target).closest('.algolia-search-modal__right').length)) {
          algoliaSearchModal.hide();
          $("#algolia-search-input").val('');
          $('html').removeClass('algolia-search-modal-active');
        }
      });

      if (allSectionMenu.length > 0) {
        var menuModal = $('.all-section-menu-modal-wrapper');
        allSectionMenu.once('onClick').click(function () {
          menuModal.addClass('modal--open');
          if (!initialised) {
            algoliaSearchWidget.autocompleteSearch(applicationId, apiKey, searchIndex, searchActualIndex);
            initialised = true;
          }
        });
      }

      if (searchMenu.length > 0) {
        var algoliaSearchModal = $('#algolia-search-modal');
        var recentSearch = $('#recent-search');
        searchMenu.once('search-overlay').click(function () {
          algoliaSearchModal.show();
          if (!initialised) {
            algoliaSearchWidget.autocompleteSearch(applicationId, apiKey, searchIndex, searchActualIndex);
            initialised = true;
          }
          $('html').addClass('algolia-search-modal-active');
        });
        // Close popup.
        algoliaSearchModal.find('span.close').once('onClick').click(function () {
          algoliaSearchModal.hide();
          $("#algolia-search-input").val('');
          $('html').removeClass('algolia-search-modal-active');
        });
        // Make recent search items searchable.
        recentSearch.on('click', '.recent-link', function () {
          algoliaSearchWidget.searchRedirect(searchActualIndex, $(this).text());
        });
        $(document).keyup(function(e) {
          if (e.key === "Escape") {
            algoliaSearchModal.hide();
            $("#algolia-search-input").val('');
            $('html').removeClass('algolia-search-modal-active');
          }
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.AlgoliaAutocompleteSearch = {
    attach: function (context, settings) {
      let filters = {};
      var searchIndex = drupalSettings.mc_algolia_creds.searchQsIndex;
      var searchActualIndex = drupalSettings.mc_algolia_creds.searchIndex;
      var applicationId = drupalSettings.mc_algolia_creds.applicationId;
      var apiKey = drupalSettings.mc_algolia_creds.apiKey;
      var all_video_page = $("#all-video-search-view-page");
      var all_vod_page = $("#all-vod-search-view-page");
      var all_podcast_page = $("#all-podcast-search-view-page");
      var all_programs_page = $("#all-programs-search-view-page");
      var all_cna938_page = $("#all-cna938-search-view-page");
      if (all_video_page && all_video_page.length) {
        all_video_page.find(".all-video--search #algolia-search-input").attr('placeholder', "Search for shows and episodes");
        filters = {type: ['video']};
        algoliaSearchWidget.autocompleteSearch(applicationId, apiKey, searchIndex, searchActualIndex, '/watch/search', filters);
      }
      if (all_vod_page && all_vod_page.length) {
        all_vod_page.find(".all-video--search #algolia-search-input").attr('placeholder', "Search for shows and episodes");
        filters = {term_vid: ['watch_program']};
        algoliaSearchWidget.autocompleteSearch(applicationId, apiKey, searchIndex, searchActualIndex, '/watch/search', filters);
      }
      if (all_podcast_page && all_podcast_page.length) {
        all_podcast_page.find(".all-podcast #algolia-search-input").attr('placeholder', "Search for podcasts and episodes");
        filters = {type: ['audio']};
        algoliaSearchWidget.autocompleteSearch(applicationId, apiKey, searchIndex, searchActualIndex, '/listen/search', filters);
      }
      if (all_programs_page && all_programs_page.length) {
        all_programs_page.find(".all-podcast-program #algolia-search-input").attr('placeholder', "Search for podcasts and episodes");
        filters = {term_vid: ['omnystudio_programs'], exclude_radio_station: ['cna938']};
        algoliaSearchWidget.autocompleteSearch(applicationId, apiKey, searchIndex, searchActualIndex, '/listen/programmes/search', filters);
      }
      if (all_cna938_page && all_cna938_page.length) {
        all_cna938_page.find(".all-podcast-program #algolia-search-input").attr('placeholder', "Search for podcasts and episodes");
        filters = {term_vid: ['omnystudio_programs'], radio_station: ['cna938']};
        algoliaSearchWidget.autocompleteSearch(applicationId, apiKey, searchIndex, searchActualIndex, '/listen/cna938/search', filters);
      }

      $(".block-algolia-autocomplete-search-box #algolia-search-input").keyup(function(event) {
        if (event.keyCode === 13) {
          if ($(this).parents('.all-video--vod').length) {
            filters = {term_vid: ['watch_program']};
            algoliaSearchWidget.searchRedirect(searchActualIndex, event.target.value, '/watch/search', filters);
          }
          else if ($(this).parents('.all-video--video').length) {
            filters = {type: ['video']};
            algoliaSearchWidget.searchRedirect(searchActualIndex, event.target.value, '/watch/search', filters);
          }
          else if ($(this).parents('.all-podcast').length) {
            filters = {type: ['audio']};
            algoliaSearchWidget.searchRedirect(searchActualIndex, event.target.value, '/listen/search', filters);
          }
          else if ($(this).parents('.all-podcast-program').length && $('body#all-cna938-search-view-page').length) {
            filters = {term_vid: ['omnystudio_programs'], radio_station: ['cna938']};
            algoliaSearchWidget.searchRedirect(searchActualIndex, event.target.value, '/listen/cna938/search', filters);
          }
          else if ($(this).parents('.all-podcast-program').length) {
            filters = {term_vid: ['omnystudio_programs']};
            algoliaSearchWidget.searchRedirect(searchActualIndex, event.target.value, '/listen/programmes/search', filters);
          }
          else {
            algoliaSearchWidget.searchRedirect(searchActualIndex, event.target.value);
          }
        }
      });
      $('button#algolia-autocomplete-submit').once('onClick').click(function (e) {
        var queryParam = $(this).parent().closest('div').find("#algolia-search-input").val();
        algoliaSearchWidget.searchRedirect(searchActualIndex, queryParam);
      });
      $('button#algolia-autocomplete-reset').once('onClick').click(function () {
        $(this).parent().closest('div').find("#algolia-search-input").val('');
      });
    }
  };
})(jQuery, Drupal, drupalSettings);

/**
 * Define namespace with common method to use for MeConnect login workflow.
 * @type {{isAuthenticate: (function(): boolean)}}
 */
window.algoliaSearchWidget = {
  autocompleteSearch: function(applicationId, apiKey, searchIndex, searchActualIndex, redirect_url, filters) {
    const algoliaScripts = [
      'https://cdn.jsdelivr.net/npm/algoliasearch@3/dist/algoliasearchLite.min.js',
      'https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js'
    ];
    let filesloaded = 0;

    for (let i = 0; i < algoliaScripts.length; i++) {
      var script = document.createElement('script');
      script.src = algoliaScripts[i];
      script.onload = function () {
          filesloaded++;
          finishLoad();
      };
      document.body.appendChild(script);
    }

    function finishLoad() {
      if (filesloaded === algoliaScripts.length) {
        const searchClient = algoliasearch(
          applicationId,
          apiKey // search only API key, not admin API key
        );

        const dataSource = searchClient.initIndex(searchIndex);
        autocomplete('.block-algolia-autocomplete-search-box #algolia-search-input', { minLength: 3 }, [
          {
            source: autocomplete.sources.hits(dataSource, { hitsPerPage: 10 }),
            displayKey: 'query',
            templates: {
              suggestion({ _highlightResult }) {
                return `<span>${_highlightResult ? _highlightResult.query.value : ''}</span>`;
              },
            },
            empty: `
            <div class="content-list content-list--no-result">
            <span>Sorry, we can't find any results for <b>'{{query}}'</b>. </span>
            <span>Please try again by refining your keyword(s).</span>
            </div>`,
          }
        ]).on('autocomplete:selected', function(event, suggestion, dataset) {
          algoliaSearchWidget.searchRedirect(searchActualIndex, event.target.value, redirect_url, filters);
        });
      }
    }
  },
  searchRedirect: function(searchActualIndex, query, redirect_url, filters) {
    var params = '';
    if (filters && filters.type && filters.type.length) {
      filters.type.map((type, index) => {
        params += '&'+encodeURIComponent(`type[${index}]`) + `=${type}`
      });
    }
    if (filters && filters.categories && filters.categories.length) {
      filters.categories.map((category, index) => {
        params += '&'+encodeURIComponent(`categories[${index}]`) + `=${category}`
      });
    }
    if (filters && filters.term_vid && filters.term_vid.length) {
      filters.term_vid.map((term_vid, index) => {
        params += '&'+encodeURIComponent(`term_vid[${index}]`) + `=${term_vid}`
      });
    }
    if (filters && filters.radio_station && filters.radio_station.length) {
      filters.radio_station.map((radioStation, index) => {
        params += '&'+encodeURIComponent(`radio_station[${index}]`) + `=${radioStation}`
      });
    }
    if (!redirect_url) {
      redirect_url = '/search'
    }
    if (query) {
      Drupal.behaviors.AlgoliaRecentSearch.updateLocalstorage(query);
      if (params) {
        window.location.href = `${redirect_url}?q=${encodeURIComponent(query)}${params}`;
      }
      else {
        window.location.href = `${redirect_url}?q=${encodeURIComponent(query)}`;
      }
    }
  },
};
;
(function ($, Drupal, drupalSettings) {
    "use strict";
    Drupal.behaviors.AlgoliaRecentSearch = {
      attach: function (context, settings) {
        const self = this;
        let input = $(".ais-SearchBox-input");
        let inputSearch = $("#algolia-search-input");
        let clear = $(".clear-button");
        let recentData = $(".recent-data");
        let recentSearch = $("#recent-search");
        let clearBtn = `Clear All`;
        let searchTerms = localStorage.getItem("recent_search_items")
          ? JSON.parse(localStorage.getItem("recent_search_items"))
          : [];
  
        updateMarkupList(searchTerms);

        // changed as per todayonline.
        input.on("keypress", function (event) {
          let code = event.keyCode || event.which;
          if (code == 13) {
            submitHandler(input.val());
          }
        });
  
        inputSearch.on("keypress", function (event) {
          let code = event.keyCode || event.which;
          if (code == 13) {
            submitHandler(event.target.value);
          }
        });
  
        clear.click(function () {
          localStorage.removeItem("recent_search_items");
          updateMarkupList([]);
        });
  
        function submitHandler(value) {
          if (!value) {
            return;
          }
          var terms = self.updateLocalstorage(value);
          updateMarkupList(terms);
        }
  
        function updateMarkupList(searchTerms) {
          let html = `<div class="recent-search-tag">`;
          if (searchTerms && searchTerms.length) {
            searchTerms.reverse();
            $.each(searchTerms, function (index, value) {
              html += `<a class="recent-link"><span>` + value + `</span></a>`;
            });
            html += `</div>`;
            recentSearch.html(html);
            clear.html(clearBtn);
            recentData.removeClass("hidden");
          } else {
            recentSearch.html("");
            recentData.addClass("hidden");
            clear.html("");
          }
        }
      },
  
      updateLocalstorage: function (newTerm) {
        const LENGTH_STORAGE = 5;
        let existingTerms = localStorage.getItem("recent_search_items") ? JSON.parse(localStorage.getItem("recent_search_items")) : [];
        if (existingTerms.includes(newTerm)) {
          existingTerms.splice($.inArray(newTerm, existingTerms), 1);
        }
  
        existingTerms.push(newTerm);
        // Removing element after defined count.
        if (existingTerms && existingTerms.length > LENGTH_STORAGE) {
          existingTerms.shift();
        }
        localStorage.setItem("recent_search_items",JSON.stringify(existingTerms));
        return existingTerms;
      },
    };
  })(jQuery, Drupal, drupalSettings);
  ;
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(r){"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),r(t),t}:r(jQuery)}(function(q){"use strict";var m=/\r?\n/g,S={};S.fileapi=void 0!==q('<input type="file">').get(0).files,S.formdata=void 0!==window.FormData;var _=!!q.fn.prop;function o(e){var t=e.data;e.isDefaultPrevented()||(e.preventDefault(),q(e.target).closest("form").ajaxSubmit(t))}function i(e){var t=e.target,r=q(t);if(!r.is("[type=submit],[type=image]")){var a=r.closest("[type=submit]");if(0===a.length)return;t=a[0]}var n,o=t.form;"image"===(o.clk=t).type&&(void 0!==e.offsetX?(o.clk_x=e.offsetX,o.clk_y=e.offsetY):"function"==typeof q.fn.offset?(n=r.offset(),o.clk_x=e.pageX-n.left,o.clk_y=e.pageY-n.top):(o.clk_x=e.pageX-t.offsetLeft,o.clk_y=e.pageY-t.offsetTop)),setTimeout(function(){o.clk=o.clk_x=o.clk_y=null},100)}function N(){var e;q.fn.ajaxSubmit.debug&&(e="[jquery.form] "+Array.prototype.join.call(arguments,""),window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e))}q.fn.attr2=function(){if(!_)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},q.fn.ajaxSubmit=function(M,e,t,r){if(!this.length)return N("ajaxSubmit: skipping submit process - no element selected"),this;var O,a,n,o,X=this;"function"==typeof M?M={success:M}:"string"==typeof M||!1===M&&0<arguments.length?(M={url:M,data:e,dataType:t},"function"==typeof r&&(M.success=r)):void 0===M&&(M={}),O=M.method||M.type||this.attr2("method"),n=(n=(n="string"==typeof(a=M.url||this.attr2("action"))?q.trim(a):"")||window.location.href||"")&&(n.match(/^([^#]+)/)||[])[1],o=/(MSIE|Trident)/.test(navigator.userAgent||"")&&/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",M=q.extend(!0,{url:n,success:q.ajaxSettings.success,type:O||q.ajaxSettings.type,iframeSrc:o},M);var i={};if(this.trigger("form-pre-serialize",[this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(M.beforeSerialize&&!1===M.beforeSerialize(this,M))return N("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var s=M.traditional;void 0===s&&(s=q.ajaxSettings.traditional);var u,c,C=[],l=this.formToArray(M.semantic,C,M.filtering);if(M.data&&(c=q.isFunction(M.data)?M.data(l):M.data,M.extraData=c,u=q.param(c,s)),M.beforeSubmit&&!1===M.beforeSubmit(l,this,M))return N("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[l,this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var f=q.param(l,s);u&&(f=f?f+"&"+u:u),"GET"===M.type.toUpperCase()?(M.url+=(0<=M.url.indexOf("?")?"&":"?")+f,M.data=null):M.data=f;var d,m,p,h=[];M.resetForm&&h.push(function(){X.resetForm()}),M.clearForm&&h.push(function(){X.clearForm(M.includeHidden)}),!M.dataType&&M.target?(d=M.success||function(){},h.push(function(e,t,r){var a=arguments,n=M.replaceTarget?"replaceWith":"html";q(M.target)[n](e).each(function(){d.apply(this,a)})})):M.success&&(q.isArray(M.success)?q.merge(h,M.success):h.push(M.success)),M.success=function(e,t,r){for(var a=M.context||this,n=0,o=h.length;n<o;n++)h[n].apply(a,[e,t,r||X,X])},M.error&&(m=M.error,M.error=function(e,t,r){var a=M.context||this;m.apply(a,[e,t,r,X])}),M.complete&&(p=M.complete,M.complete=function(e,t){var r=M.context||this;p.apply(r,[e,t,X])});var v=0<q("input[type=file]:enabled",this).filter(function(){return""!==q(this).val()}).length,g="multipart/form-data",x=X.attr("enctype")===g||X.attr("encoding")===g,y=S.fileapi&&S.formdata;N("fileAPI :"+y);var b,T=(v||x)&&!y;!1!==M.iframe&&(M.iframe||T)?M.closeKeepAlive?q.get(M.closeKeepAlive,function(){b=w(l)}):b=w(l):b=(v||x)&&y?function(e){for(var r=new FormData,t=0;t<e.length;t++)r.append(e[t].name,e[t].value);if(M.extraData){var a=function(e){var t,r,a=q.param(e,M.traditional).split("&"),n=a.length,o=[];for(t=0;t<n;t++)a[t]=a[t].replace(/\+/g," "),r=a[t].split("="),o.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);return o}(M.extraData);for(t=0;t<a.length;t++)a[t]&&r.append(a[t][0],a[t][1])}M.data=null;var n=q.extend(!0,{},q.ajaxSettings,M,{contentType:!1,processData:!1,cache:!1,type:O||"POST"});M.uploadProgress&&(n.xhr=function(){var e=q.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var t=0,r=e.loaded||e.position,a=e.total;e.lengthComputable&&(t=Math.ceil(r/a*100)),M.uploadProgress(e,r,a,t)},!1),e});n.data=null;var o=n.beforeSend;return n.beforeSend=function(e,t){M.formData?t.data=M.formData:t.data=r,o&&o.call(this,e,t)},q.ajax(n)}(l):q.ajax(M),X.removeData("jqxhr").data("jqxhr",b);for(var j=0;j<C.length;j++)C[j]=null;return this.trigger("form-submit-notify",[this,M]),this;function w(e){var t,r,l,f,o,d,m,p,a,n,h,v,i=X[0],g=q.Deferred();if(g.abort=function(e){p.abort(e)},e)for(r=0;r<C.length;r++)t=q(C[r]),_?t.prop("disabled",!1):t.removeAttr("disabled");(l=q.extend(!0,{},q.ajaxSettings,M)).context=l.context||l,o="jqFormIO"+(new Date).getTime();var s=i.ownerDocument,u=X.closest("body");if(l.iframeTarget?(n=(d=q(l.iframeTarget,s)).attr2("name"))?o=n:d.attr2("name",o):(d=q('<iframe name="'+o+'" src="'+l.iframeSrc+'" />',s)).css({position:"absolute",top:"-1000px",left:"-1000px"}),m=d[0],p={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var t="timeout"===e?"timeout":"aborted";N("aborting upload... "+t),this.aborted=1;try{m.contentWindow.document.execCommand&&m.contentWindow.document.execCommand("Stop")}catch(e){}d.attr("src",l.iframeSrc),p.error=t,l.error&&l.error.call(l.context,p,t,e),f&&q.event.trigger("ajaxError",[p,l,t]),l.complete&&l.complete.call(l.context,p,t)}},(f=l.global)&&0==q.active++&&q.event.trigger("ajaxStart"),f&&q.event.trigger("ajaxSend",[p,l]),l.beforeSend&&!1===l.beforeSend.call(l.context,p,l))return l.global&&q.active--,g.reject(),g;if(p.aborted)return g.reject(),g;(a=i.clk)&&(n=a.name)&&!a.disabled&&(l.extraData=l.extraData||{},l.extraData[n]=a.value,"image"===a.type&&(l.extraData[n+".x"]=i.clk_x,l.extraData[n+".y"]=i.clk_y));var x=1,y=2;function b(t){var r=null;try{t.contentWindow&&(r=t.contentWindow.document)}catch(e){N("cannot get iframe.contentWindow document: "+e)}if(r)return r;try{r=t.contentDocument?t.contentDocument:t.document}catch(e){N("cannot get iframe.contentDocument: "+e),r=t.document}return r}var c=q("meta[name=csrf-token]").attr("content"),T=q("meta[name=csrf-param]").attr("content");function j(){var e=X.attr2("target"),t=X.attr2("action"),r=X.attr("enctype")||X.attr("encoding")||"multipart/form-data";i.setAttribute("target",o),O&&!/post/i.test(O)||i.setAttribute("method","POST"),t!==l.url&&i.setAttribute("action",l.url),l.skipEncodingOverride||O&&!/post/i.test(O)||X.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),l.timeout&&(v=setTimeout(function(){h=!0,A(x)},l.timeout));var a=[];try{if(l.extraData)for(var n in l.extraData)l.extraData.hasOwnProperty(n)&&(q.isPlainObject(l.extraData[n])&&l.extraData[n].hasOwnProperty("name")&&l.extraData[n].hasOwnProperty("value")?a.push(q('<input type="hidden" name="'+l.extraData[n].name+'">',s).val(l.extraData[n].value).appendTo(i)[0]):a.push(q('<input type="hidden" name="'+n+'">',s).val(l.extraData[n]).appendTo(i)[0]));l.iframeTarget||d.appendTo(u),m.attachEvent?m.attachEvent("onload",A):m.addEventListener("load",A,!1),setTimeout(function e(){try{var t=b(m).readyState;N("state = "+t),t&&"uninitialized"===t.toLowerCase()&&setTimeout(e,50)}catch(e){N("Server abort: ",e," (",e.name,")"),A(y),v&&clearTimeout(v),v=void 0}},15);try{i.submit()}catch(e){document.createElement("form").submit.apply(i)}}finally{i.setAttribute("action",t),i.setAttribute("enctype",r),e?i.setAttribute("target",e):X.removeAttr("target"),q(a).remove()}}T&&c&&(l.extraData=l.extraData||{},l.extraData[T]=c),l.forceSync?j():setTimeout(j,10);var w,S,k,D=50;function A(e){if(!p.aborted&&!k){if((S=b(m))||(N("cannot access response document"),e=y),e===x&&p)return p.abort("timeout"),void g.reject(p,"timeout");if(e===y&&p)return p.abort("server abort"),void g.reject(p,"error","server abort");if(S&&S.location.href!==l.iframeSrc||h){m.detachEvent?m.detachEvent("onload",A):m.removeEventListener("load",A,!1);var t,r="success";try{if(h)throw"timeout";var a="xml"===l.dataType||S.XMLDocument||q.isXMLDoc(S);if(N("isXml="+a),!a&&window.opera&&(null===S.body||!S.body.innerHTML)&&--D)return N("requeing onLoad callback, DOM not available"),void setTimeout(A,250);var n=S.body?S.body:S.documentElement;p.responseText=n?n.innerHTML:null,p.responseXML=S.XMLDocument?S.XMLDocument:S,a&&(l.dataType="xml"),p.getResponseHeader=function(e){return{"content-type":l.dataType}[e.toLowerCase()]},n&&(p.status=Number(n.getAttribute("status"))||p.status,p.statusText=n.getAttribute("statusText")||p.statusText);var o,i,s,u=(l.dataType||"").toLowerCase(),c=/(json|script|text)/.test(u);c||l.textarea?(o=S.getElementsByTagName("textarea")[0])?(p.responseText=o.value,p.status=Number(o.getAttribute("status"))||p.status,p.statusText=o.getAttribute("statusText")||p.statusText):c&&(i=S.getElementsByTagName("pre")[0],s=S.getElementsByTagName("body")[0],i?p.responseText=i.textContent?i.textContent:i.innerText:s&&(p.responseText=s.textContent?s.textContent:s.innerText)):"xml"===u&&!p.responseXML&&p.responseText&&(p.responseXML=F(p.responseText));try{w=E(p,u,l)}catch(e){r="parsererror",p.error=t=e||r}}catch(e){N("error caught: ",e),r="error",p.error=t=e||r}p.aborted&&(N("upload aborted"),r=null),p.status&&(r=200<=p.status&&p.status<300||304===p.status?"success":"error"),"success"===r?(l.success&&l.success.call(l.context,w,"success",p),g.resolve(p.responseText,"success",p),f&&q.event.trigger("ajaxSuccess",[p,l])):r&&(void 0===t&&(t=p.statusText),l.error&&l.error.call(l.context,p,r,t),g.reject(p,"error",t),f&&q.event.trigger("ajaxError",[p,l,t])),f&&q.event.trigger("ajaxComplete",[p,l]),f&&!--q.active&&q.event.trigger("ajaxStop"),l.complete&&l.complete.call(l.context,p,r),k=!0,l.timeout&&clearTimeout(v),setTimeout(function(){l.iframeTarget?d.attr("src",l.iframeSrc):d.remove(),p.responseXML=null},100)}}}var F=q.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},L=q.parseJSON||function(e){return window.eval("("+e+")")},E=function(e,t,r){var a=e.getResponseHeader("content-type")||"",n=("xml"===t||!t)&&0<=a.indexOf("xml"),o=n?e.responseXML:e.responseText;return n&&"parsererror"===o.documentElement.nodeName&&q.error&&q.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,t)),"string"==typeof o&&(("json"===t||!t)&&0<=a.indexOf("json")?o=L(o):("script"===t||!t)&&0<=a.indexOf("javascript")&&q.globalEval(o)),o};return g}},q.fn.ajaxForm=function(e,t,r,a){if(("string"==typeof e||!1===e&&0<arguments.length)&&(e={url:e,data:t,dataType:r},"function"==typeof a&&(e.success=a)),(e=e||{}).delegation=e.delegation&&q.isFunction(q.fn.on),e.delegation||0!==this.length)return e.delegation?(q(document).off("submit.form-plugin",this.selector,o).off("click.form-plugin",this.selector,i).on("submit.form-plugin",this.selector,e,o).on("click.form-plugin",this.selector,e,i),this):(e.beforeFormUnbind&&e.beforeFormUnbind(this,e),this.ajaxFormUnbind().on("submit.form-plugin",e,o).on("click.form-plugin",e,i));var n={s:this.selector,c:this.context};return!q.isReady&&n.s?(N("DOM not ready, queuing ajaxForm"),q(function(){q(n.s,n.c).ajaxForm(e)})):N("terminating; zero elements found by selector"+(q.isReady?"":" (DOM not ready)")),this},q.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},q.fn.formToArray=function(e,t,r){var a=[];if(0===this.length)return a;var n,o,i,s,u,c,l,f,d,m,p=this[0],h=this.attr("id"),v=(v=e||void 0===p.elements?p.getElementsByTagName("*"):p.elements)&&q.makeArray(v);if(h&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(n=q(':input[form="'+h+'"]').get()).length&&(v=(v||[]).concat(n)),!v||!v.length)return a;for(q.isFunction(r)&&(v=q.map(v,r)),o=0,c=v.length;o<c;o++)if((m=(u=v[o]).name)&&!u.disabled)if(e&&p.clk&&"image"===u.type)p.clk===u&&(a.push({name:m,value:q(u).val(),type:u.type}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y}));else if((s=q.fieldValue(u,!0))&&s.constructor===Array)for(t&&t.push(u),i=0,l=s.length;i<l;i++)a.push({name:m,value:s[i]});else if(S.fileapi&&"file"===u.type){t&&t.push(u);var g=u.files;if(g.length)for(i=0;i<g.length;i++)a.push({name:m,value:g[i],type:u.type});else a.push({name:m,value:"",type:u.type})}else null!=s&&(t&&t.push(u),a.push({name:m,value:s,type:u.type,required:u.required}));return e||!p.clk||(m=(d=(f=q(p.clk))[0]).name)&&!d.disabled&&"image"===d.type&&(a.push({name:m,value:f.val()}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y})),a},q.fn.formSerialize=function(e){return q.param(this.formToArray(e))},q.fn.fieldSerialize=function(n){var o=[];return this.each(function(){var e=this.name;if(e){var t=q.fieldValue(this,n);if(t&&t.constructor===Array)for(var r=0,a=t.length;r<a;r++)o.push({name:e,value:t[r]});else null!=t&&o.push({name:this.name,value:t})}}),q.param(o)},q.fn.fieldValue=function(e){for(var t=[],r=0,a=this.length;r<a;r++){var n=this[r],o=q.fieldValue(n,e);null==o||o.constructor===Array&&!o.length||(o.constructor===Array?q.merge(t,o):t.push(o))}return t},q.fieldValue=function(e,t){var r=e.name,a=e.type,n=e.tagName.toLowerCase();if(void 0===t&&(t=!0),t&&(!r||e.disabled||"reset"===a||"button"===a||("checkbox"===a||"radio"===a)&&!e.checked||("submit"===a||"image"===a)&&e.form&&e.form.clk!==e||"select"===n&&-1===e.selectedIndex))return null;if("select"!==n)return q(e).val().replace(m,"\r\n");var o=e.selectedIndex;if(o<0)return null;for(var i=[],s=e.options,u="select-one"===a,c=u?o+1:s.length,l=u?o:0;l<c;l++){var f=s[l];if(f.selected&&!f.disabled){var d=(d=f.value)||(f.attributes&&f.attributes.value&&!f.attributes.value.specified?f.text:f.value);if(u)return d;i.push(d)}}return i},q.fn.clearForm=function(e){return this.each(function(){q("input,select,textarea",this).clearFields(e)})},q.fn.clearFields=q.fn.clearInputs=function(r){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var e=this.type,t=this.tagName.toLowerCase();a.test(e)||"textarea"===t?this.value="":"checkbox"===e||"radio"===e?this.checked=!1:"select"===t?this.selectedIndex=-1:"file"===e?/MSIE/.test(navigator.userAgent)?q(this).replaceWith(q(this).clone(!0)):q(this).val(""):r&&(!0===r&&/hidden/.test(e)||"string"==typeof r&&q(this).is(r))&&(this.value="")})},q.fn.resetForm=function(){return this.each(function(){var t=q(this),e=this.tagName.toLowerCase();switch(e){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=t.parents("select");return r.length&&r[0].multiple?"option"===e?this.selected=this.defaultSelected:t.find("option").resetForm():r.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var a=q(t.attr("for")),n=t.find("input,select,textarea");return a[0]&&n.unshift(a[0]),n.resetForm(),!0;case"form":return"function"!=typeof this.reset&&("object"!=typeof this.reset||this.reset.nodeType)||this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},q.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},q.fn.selected=function(r){return void 0===r&&(r=!0),this.each(function(){var e,t=this.type;"checkbox"===t||"radio"===t?this.checked=r:"option"===this.tagName.toLowerCase()&&(e=q(this).parent("select"),r&&e[0]&&"select-one"===e[0].type&&e.find("option").selected(!1),this.selected=r)})},q.fn.ajaxSubmit.debug=!1});

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.theme.progressBar = function (id) {
    return "<div id=\"".concat(id, "\" class=\"progress\" aria-live=\"polite\">") + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>';
  };

  Drupal.ProgressBar = function (id, updateCallback, method, errorCallback) {
    this.id = id;
    this.method = method || 'GET';
    this.updateCallback = updateCallback;
    this.errorCallback = errorCallback;
    this.element = $(Drupal.theme('progressBar', id));
  };

  $.extend(Drupal.ProgressBar.prototype, {
    setProgress: function setProgress(percentage, message, label) {
      if (percentage >= 0 && percentage <= 100) {
        $(this.element).find('div.progress__bar').css('width', "".concat(percentage, "%"));
        $(this.element).find('div.progress__percentage').html("".concat(percentage, "%"));
      }

      $('div.progress__description', this.element).html(message);
      $('div.progress__label', this.element).html(label);

      if (this.updateCallback) {
        this.updateCallback(percentage, message, this);
      }
    },
    startMonitoring: function startMonitoring(uri, delay) {
      this.delay = delay;
      this.uri = uri;
      this.sendPing();
    },
    stopMonitoring: function stopMonitoring() {
      clearTimeout(this.timer);
      this.uri = null;
    },
    sendPing: function sendPing() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.uri) {
        var pb = this;
        var uri = this.uri;

        if (uri.indexOf('?') === -1) {
          uri += '?';
        } else {
          uri += '&';
        }

        uri += '_format=json';
        $.ajax({
          type: this.method,
          url: uri,
          data: '',
          dataType: 'json',
          success: function success(progress) {
            if (progress.status === 0) {
              pb.displayError(progress.data);
              return;
            }

            pb.setProgress(progress.percentage, progress.message, progress.label);
            pb.timer = setTimeout(function () {
              pb.sendPing();
            }, pb.delay);
          },
          error: function error(xmlhttp) {
            var e = new Drupal.AjaxError(xmlhttp, pb.uri);
            pb.displayError("<pre>".concat(e.message, "</pre>"));
          }
        });
      }
    },
    displayError: function displayError(string) {
      var error = $('<div class="messages messages--error"></div>').html(string);
      $(this.element).before(error).hide();

      if (this.errorCallback) {
        this.errorCallback(this);
      }
    }
  });
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  Drupal.behaviors.responsiveImageAJAX = {
    attach: function attach() {
      if (window.picturefill) {
        window.picturefill();
      }
    }
  };
})(Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function ($, window, Drupal, drupalSettings, _ref) {
  var isFocusable = _ref.isFocusable,
      tabbable = _ref.tabbable;
  Drupal.behaviors.AJAX = {
    attach: function attach(context, settings) {
      function loadAjaxBehavior(base) {
        var elementSettings = settings.ajax[base];

        if (typeof elementSettings.selector === 'undefined') {
          elementSettings.selector = "#".concat(base);
        }

        once('drupal-ajax', $(elementSettings.selector)).forEach(function (el) {
          elementSettings.element = el;
          elementSettings.base = base;
          Drupal.ajax(elementSettings);
        });
      }

      Object.keys(settings.ajax || {}).forEach(function (base) {
        return loadAjaxBehavior(base);
      });
      Drupal.ajax.bindAjaxLinks(document.body);
      once('ajax', '.use-ajax-submit').forEach(function (el) {
        var elementSettings = {};
        elementSettings.url = $(el.form).attr('action');
        elementSettings.setClick = true;
        elementSettings.event = 'click';
        elementSettings.progress = {
          type: 'throbber'
        };
        elementSettings.base = el.id;
        elementSettings.element = el;
        Drupal.ajax(elementSettings);
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        Drupal.ajax.expired().forEach(function (instance) {
          Drupal.ajax.instances[instance.instanceIndex] = null;
        });
      }
    }
  };

  Drupal.AjaxError = function (xmlhttp, uri, customMessage) {
    var statusCode;
    var statusText;
    var responseText;

    if (xmlhttp.status) {
      statusCode = "\n".concat(Drupal.t('An AJAX HTTP error occurred.'), "\n").concat(Drupal.t('HTTP Result Code: !status', {
        '!status': xmlhttp.status
      }));
    } else {
      statusCode = "\n".concat(Drupal.t('An AJAX HTTP request terminated abnormally.'));
    }

    statusCode += "\n".concat(Drupal.t('Debugging information follows.'));
    var pathText = "\n".concat(Drupal.t('Path: !uri', {
      '!uri': uri
    }));
    statusText = '';

    try {
      statusText = "\n".concat(Drupal.t('StatusText: !statusText', {
        '!statusText': xmlhttp.statusText.trim()
      }));
    } catch (e) {}

    responseText = '';

    try {
      responseText = "\n".concat(Drupal.t('ResponseText: !responseText', {
        '!responseText': xmlhttp.responseText.trim()
      }));
    } catch (e) {}

    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
    responseText = responseText.replace(/[\n]+\s+/g, '\n');
    var readyStateText = xmlhttp.status === 0 ? "\n".concat(Drupal.t('ReadyState: !readyState', {
      '!readyState': xmlhttp.readyState
    })) : '';
    customMessage = customMessage ? "\n".concat(Drupal.t('CustomMessage: !customMessage', {
      '!customMessage': customMessage
    })) : '';
    this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
    this.name = 'AjaxError';
  };

  Drupal.AjaxError.prototype = new Error();
  Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;

  Drupal.ajax = function (settings) {
    if (arguments.length !== 1) {
      throw new Error('Drupal.ajax() function must be called with one configuration object only');
    }

    var base = settings.base || false;
    var element = settings.element || false;
    delete settings.base;
    delete settings.element;

    if (!settings.progress && !element) {
      settings.progress = false;
    }

    var ajax = new Drupal.Ajax(base, element, settings);
    ajax.instanceIndex = Drupal.ajax.instances.length;
    Drupal.ajax.instances.push(ajax);
    return ajax;
  };

  Drupal.ajax.instances = [];

  Drupal.ajax.expired = function () {
    return Drupal.ajax.instances.filter(function (instance) {
      return instance && instance.element !== false && !document.body.contains(instance.element);
    });
  };

  Drupal.ajax.bindAjaxLinks = function (element) {
    once('ajax', '.use-ajax', element).forEach(function (ajaxLink) {
      var $linkElement = $(ajaxLink);
      var elementSettings = {
        progress: {
          type: 'throbber'
        },
        dialogType: $linkElement.data('dialog-type'),
        dialog: $linkElement.data('dialog-options'),
        dialogRenderer: $linkElement.data('dialog-renderer'),
        base: $linkElement.attr('id'),
        element: ajaxLink
      };
      var href = $linkElement.attr('href');

      if (href) {
        elementSettings.url = href;
        elementSettings.event = 'click';
      }

      Drupal.ajax(elementSettings);
    });
  };

  Drupal.Ajax = function (base, element, elementSettings) {
    var defaults = {
      event: element ? 'mousedown' : null,
      keypress: true,
      selector: base ? "#".concat(base) : null,
      effect: 'none',
      speed: 'none',
      method: 'replaceWith',
      progress: {
        type: 'throbber',
        message: Drupal.t('Please wait...')
      },
      submit: {
        js: true
      }
    };
    $.extend(this, defaults, elementSettings);
    this.commands = new Drupal.AjaxCommands();
    this.instanceIndex = false;

    if (this.wrapper) {
      this.wrapper = "#".concat(this.wrapper);
    }

    this.element = element;
    this.element_settings = elementSettings;
    this.elementSettings = elementSettings;

    if (this.element && this.element.form) {
      this.$form = $(this.element.form);
    }

    if (!this.url) {
      var $element = $(this.element);

      if ($element.is('a')) {
        this.url = $element.attr('href');
      } else if (this.element && element.form) {
        this.url = this.$form.attr('action');
      }
    }

    var originalUrl = this.url;
    this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');

    if (drupalSettings.ajaxTrustedUrl[originalUrl]) {
      drupalSettings.ajaxTrustedUrl[this.url] = true;
    }

    var ajax = this;
    ajax.options = {
      url: ajax.url,
      data: ajax.submit,
      beforeSerialize: function beforeSerialize(elementSettings, options) {
        return ajax.beforeSerialize(elementSettings, options);
      },
      beforeSubmit: function beforeSubmit(formValues, elementSettings, options) {
        ajax.ajaxing = true;
        return ajax.beforeSubmit(formValues, elementSettings, options);
      },
      beforeSend: function beforeSend(xmlhttprequest, options) {
        ajax.ajaxing = true;
        return ajax.beforeSend(xmlhttprequest, options);
      },
      success: function success(response, status, xmlhttprequest) {
        if (typeof response === 'string') {
          response = $.parseJSON(response);
        }

        if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url]) {
          if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
            var customMessage = Drupal.t('The response failed verification so will not be processed.');
            return ajax.error(xmlhttprequest, ajax.url, customMessage);
          }
        }

        return ajax.success(response, status);
      },
      complete: function complete(xmlhttprequest, status) {
        ajax.ajaxing = false;

        if (status === 'error' || status === 'parsererror') {
          return ajax.error(xmlhttprequest, ajax.url);
        }
      },
      dataType: 'json',
      jsonp: false,
      type: 'POST'
    };

    if (elementSettings.dialog) {
      ajax.options.data.dialogOptions = elementSettings.dialog;
    }

    if (ajax.options.url.indexOf('?') === -1) {
      ajax.options.url += '?';
    } else {
      ajax.options.url += '&';
    }

    var wrapper = "drupal_".concat(elementSettings.dialogType || 'ajax');

    if (elementSettings.dialogRenderer) {
      wrapper += ".".concat(elementSettings.dialogRenderer);
    }

    ajax.options.url += "".concat(Drupal.ajax.WRAPPER_FORMAT, "=").concat(wrapper);
    $(ajax.element).on(elementSettings.event, function (event) {
      if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) {
        throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
          '!url': ajax.url
        }));
      }

      return ajax.eventResponse(this, event);
    });

    if (elementSettings.keypress) {
      $(ajax.element).on('keypress', function (event) {
        return ajax.keypressResponse(this, event);
      });
    }

    if (elementSettings.prevent) {
      $(ajax.element).on(elementSettings.prevent, false);
    }
  };

  Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';
  Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';

  Drupal.Ajax.prototype.execute = function () {
    if (this.ajaxing) {
      return;
    }

    try {
      this.beforeSerialize(this.element, this.options);
      return $.ajax(this.options);
    } catch (e) {
      this.ajaxing = false;
      window.alert("An error occurred while attempting to process ".concat(this.options.url, ": ").concat(e.message));
      return $.Deferred().reject();
    }
  };

  Drupal.Ajax.prototype.keypressResponse = function (element, event) {
    var ajax = this;

    if (event.which === 13 || event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number') {
      event.preventDefault();
      event.stopPropagation();
      $(element).trigger(ajax.elementSettings.event);
    }
  };

  Drupal.Ajax.prototype.eventResponse = function (element, event) {
    event.preventDefault();
    event.stopPropagation();
    var ajax = this;

    if (ajax.ajaxing) {
      return;
    }

    try {
      if (ajax.$form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }

        ajax.$form.ajaxSubmit(ajax.options);
      } else {
        ajax.beforeSerialize(ajax.element, ajax.options);
        $.ajax(ajax.options);
      }
    } catch (e) {
      ajax.ajaxing = false;
      window.alert("An error occurred while attempting to process ".concat(ajax.options.url, ": ").concat(e.message));
    }
  };

  Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
    }

    options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
    var pageState = drupalSettings.ajaxPageState;
    options.data['ajax_page_state[theme]'] = pageState.theme;
    options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
    options.data['ajax_page_state[libraries]'] = pageState.libraries;
  };

  Drupal.Ajax.prototype.beforeSubmit = function (formValues, element, options) {};

  Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
    if (this.$form) {
      options.extraData = options.extraData || {};
      options.extraData.ajax_iframe_upload = '1';
      var v = $.fieldValue(this.element);

      if (v !== null) {
        options.extraData[this.element.name] = v;
      }
    }

    $(this.element).prop('disabled', true);

    if (!this.progress || !this.progress.type) {
      return;
    }

    var progressIndicatorMethod = "setProgressIndicator".concat(this.progress.type.slice(0, 1).toUpperCase()).concat(this.progress.type.slice(1).toLowerCase());

    if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function') {
      this[progressIndicatorMethod].call(this);
    }
  };

  Drupal.theme.ajaxProgressThrobber = function (message) {
    var messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
    var throbber = '<div class="throbber">&nbsp;</div>';
    return "<div class=\"ajax-progress ajax-progress-throbber\">".concat(throbber).concat(messageMarkup, "</div>");
  };

  Drupal.theme.ajaxProgressIndicatorFullscreen = function () {
    return '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
  };

  Drupal.theme.ajaxProgressMessage = function (message) {
    return "<div class=\"message\">".concat(message, "</div>");
  };

  Drupal.theme.ajaxProgressBar = function ($element) {
    return $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorBar = function () {
    var progressBar = new Drupal.ProgressBar("ajax-progress-".concat(this.element.id), $.noop, this.progress.method, $.noop);

    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }

    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }

    this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
    $('body').append(this.progress.element);
  };

  Drupal.Ajax.prototype.success = function (response, status) {
    var _this = this;

    if (this.progress.element) {
      $(this.progress.element).remove();
    }

    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.element).prop('disabled', false);
    var elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();
    var focusChanged = false;
    Object.keys(response || {}).forEach(function (i) {
      if (response[i].command && _this.commands[response[i].command]) {
        _this.commands[response[i].command](_this, response[i], status);

        if (response[i].command === 'invoke' && response[i].method === 'focus' || response[i].command === 'focusFirst') {
          focusChanged = true;
        }
      }
    });

    if (!focusChanged && this.element && !$(this.element).data('disable-refocus')) {
      var target = false;

      for (var n = elementParents.length - 1; !target && n >= 0; n--) {
        target = document.querySelector("[data-drupal-selector=\"".concat(elementParents[n].getAttribute('data-drupal-selector'), "\"]"));
      }

      if (target) {
        $(target).trigger('focus');
      }
    }

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }

    this.settings = null;
  };

  Drupal.Ajax.prototype.getEffect = function (response) {
    var type = response.effect || this.effect;
    var speed = response.speed || this.speed;
    var effect = {};

    if (type === 'none') {
      effect.showEffect = 'show';
      effect.hideEffect = 'hide';
      effect.showSpeed = '';
    } else if (type === 'fade') {
      effect.showEffect = 'fadeIn';
      effect.hideEffect = 'fadeOut';
      effect.showSpeed = speed;
    } else {
      effect.showEffect = "".concat(type, "Toggle");
      effect.hideEffect = "".concat(type, "Toggle");
      effect.showSpeed = speed;
    }

    return effect;
  };

  Drupal.Ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
    if (this.progress.element) {
      $(this.progress.element).remove();
    }

    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.wrapper).show();
    $(this.element).prop('disabled', false);

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }

    throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
  };

  Drupal.theme.ajaxWrapperNewContent = function ($newContent, ajax, response) {
    return (response.effect || ajax.effect) !== 'none' && $newContent.filter(function (i) {
      return !($newContent[i].nodeName === '#comment' || $newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent));
    }).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
  };

  Drupal.theme.ajaxWrapperMultipleRootElements = function ($elements) {
    return $('<div></div>').append($elements);
  };

  Drupal.AjaxCommands = function () {};

  Drupal.AjaxCommands.prototype = {
    insert: function insert(ajax, response) {
      var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
      var method = response.method || ajax.method;
      var effect = ajax.getEffect(response);
      var settings = response.settings || ajax.settings || drupalSettings;
      var $newContent = $($.parseHTML(response.data, document, true));
      $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);

      switch (method) {
        case 'html':
        case 'replaceWith':
        case 'replaceAll':
        case 'empty':
        case 'remove':
          Drupal.detachBehaviors($wrapper.get(0), settings);
          break;

        default:
          break;
      }

      $wrapper[method]($newContent);

      if (effect.showEffect !== 'show') {
        $newContent.hide();
      }

      var $ajaxNewContent = $newContent.find('.ajax-new-content');

      if ($ajaxNewContent.length) {
        $ajaxNewContent.hide();
        $newContent.show();
        $ajaxNewContent[effect.showEffect](effect.showSpeed);
      } else if (effect.showEffect !== 'show') {
        $newContent[effect.showEffect](effect.showSpeed);
      }

      if ($newContent.parents('html').length) {
        $newContent.each(function (index, element) {
          if (element.nodeType === Node.ELEMENT_NODE) {
            Drupal.attachBehaviors(element, settings);
          }
        });
      }
    },
    remove: function remove(ajax, response, status) {
      var settings = response.settings || ajax.settings || drupalSettings;
      $(response.selector).each(function () {
        Drupal.detachBehaviors(this, settings);
      }).remove();
    },
    changed: function changed(ajax, response, status) {
      var $element = $(response.selector);

      if (!$element.hasClass('ajax-changed')) {
        $element.addClass('ajax-changed');

        if (response.asterisk) {
          $element.find(response.asterisk).append(" <abbr class=\"ajax-changed\" title=\"".concat(Drupal.t('Changed'), "\">*</abbr> "));
        }
      }
    },
    alert: function alert(ajax, response, status) {
      window.alert(response.text);
    },
    announce: function announce(ajax, response) {
      if (response.priority) {
        Drupal.announce(response.text, response.priority);
      } else {
        Drupal.announce(response.text);
      }
    },
    redirect: function redirect(ajax, response, status) {
      window.location = response.url;
    },
    css: function css(ajax, response, status) {
      $(response.selector).css(response.argument);
    },
    settings: function settings(ajax, response, status) {
      var ajaxSettings = drupalSettings.ajax;

      if (ajaxSettings) {
        Drupal.ajax.expired().forEach(function (instance) {
          if (instance.selector) {
            var selector = instance.selector.replace('#', '');

            if (selector in ajaxSettings) {
              delete ajaxSettings[selector];
            }
          }
        });
      }

      if (response.merge) {
        $.extend(true, drupalSettings, response.settings);
      } else {
        ajax.settings = response.settings;
      }
    },
    data: function data(ajax, response, status) {
      $(response.selector).data(response.name, response.value);
    },
    focusFirst: function focusFirst(ajax, response, status) {
      var focusChanged = false;
      var container = document.querySelector(response.selector);

      if (container) {
        var tabbableElements = tabbable(container);

        if (tabbableElements.length) {
          tabbableElements[0].focus();
          focusChanged = true;
        } else if (isFocusable(container)) {
          container.focus();
          focusChanged = true;
        }
      }

      if (ajax.hasOwnProperty('element') && !focusChanged) {
        ajax.element.focus();
      }
    },
    invoke: function invoke(ajax, response, status) {
      var $element = $(response.selector);
      $element[response.method].apply($element, _toConsumableArray(response.args));
    },
    restripe: function restripe(ajax, response, status) {
      $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
    },
    update_build_id: function update_build_id(ajax, response, status) {
      $("input[name=\"form_build_id\"][value=\"".concat(response.old, "\"]")).val(response.new);
    },
    add_css: function add_css(ajax, response, status) {
      $('head').prepend(response.data);
    },
    message: function message(ajax, response) {
      var messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));

      if (response.clearPrevious) {
        messages.clear();
      }

      messages.add(response.message, response.messageOptions);
    }
  };
})(jQuery, window, Drupal, drupalSettings, window.tabbable);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  Drupal.theme.ajaxProgressBar = function ($element) {
    return $element.addClass('ajax-progress ajax-progress-bar');
  };
})(Drupal);;
/**
 * @file
 * Initially builds the base for the adEntity object, including settings.
 */

(function (window, document) {

  var settingsElement = document.getElementById('ad-entity-settings');

  if (!(typeof window.adEntity === 'object')) {
    window.adEntity = {settings: {}, helpers: {}, queue: []};
  }
  else {
    window.adEntity.settings = {};
    window.adEntity.helpers = window.adEntity.helpers || {};
    window.adEntity.queue = window.adEntity.queue || [];
  }

  if (settingsElement !== null) {
    window.adEntity.settings = JSON.parse(settingsElement.textContent);
  }

  window.adEntity.usePersonalization = function () {
    var settings = window.adEntity.settings;
    if (!settings.hasOwnProperty('p13n') || (settings.p13n !== true)) {
      return false;
    }
    if (!settings.hasOwnProperty('consent')) {
      return false;
    }
    if (settings.consent.method === 'disabled') {
      return true;
    }
    if (settings.consent.method === 'unbiased') {
      return null;
    }
    return false;
  };

}(window, window.document));
;
/**
 * @file
 * Consent awareness for Advertising entities.
 */

(function (adEntity, document) {

  adEntity.helpers.getCookie = function (name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    var i;
    var c;
    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  adEntity.usePersonalization = function () {
    var settings = adEntity.settings;
    var consent;
    var cookie;
    var current_value;
    var matched = false;
    var length;
    var i;
    if (!settings.hasOwnProperty('p13n') || (settings.p13n !== true)) {
      return false;
    }
    if (!settings.hasOwnProperty('consent')) {
      return false;
    }
    consent = settings.consent;
    if (typeof consent.method !== 'string') {
      return false;
    }
    if (consent.method === 'disabled') {
      return true;
    }
    if (consent.method === 'unbiased') {
      return null;
    }
    if (!(typeof consent.cookie === 'object')) {
      return false;
    }
    cookie = consent.cookie;
    if (!cookie.hasOwnProperty('name') || !cookie.hasOwnProperty('operator') || !cookie.hasOwnProperty('value')) {
      return false;
    }
    if (typeof cookie.value === 'string') {
      cookie.value = [cookie.value];
    }
    length = cookie.value.length;

    current_value = adEntity.helpers.getCookie(cookie.name);
    if (typeof current_value !== 'string') {
      matched = false;
    }
    else if (cookie.operator === 'e') {
      matched = true;
    }
    else {
      for (i = 0; i < length; i++) {
        switch (cookie.operator) {
          case '==':
            /* eslint eqeqeq: [0, "always"] */
            if (current_value == cookie.value[i]) {
              matched = true;
            }
            break;
          case '>':
            if (current_value > cookie.value[i]) {
              matched = true;
            }
            break;
          case '<':
            if (current_value < cookie.value[i]) {
              matched = true;
            }
            break;
          case 'c':
            if (!(current_value.indexOf(cookie.value[i]) < 0)) {
              matched = true;
            }
            break;
        }
        if (matched) {
          break;
        }
      }
    }
    switch (consent.method) {
      case 'opt_in':
        return matched;
      case 'opt_out':
        return !matched;
      default:
        return false;
    }
  };

}(window.adEntity, window.document));
;
/**
 * @file
 * Provides various helper functions for ad_entity components.
 */

(function (adEntity, window) {

  /**
   * Triggers a custom event at the given target.
   *
   * @param {EventTarget} target
   *   The event target.
   * @param {string} type
   *   Is a DOMString containing the name of the event.
   * @param {boolean} canBubble
   *   Indicating whether the event bubbles up through the DOM or not.
   * @param {boolean} cancelable
   *   Indicating whether the event is cancelable.
   * @param {(object|number|string|boolean)} detail
   *   The data passed in when initializing the event.
   */
  adEntity.helpers.trigger = function (target, type, canBubble, cancelable, detail) {
    // This is deprecated but needed for IE compatibility.
    var event = window.document.createEvent('CustomEvent');
    if (typeof detail === 'undefined') {
      detail = null;
    }
    event.initCustomEvent(type, canBubble, cancelable, detail);
    target.dispatchEvent(event);
  };

  /**
   * Whether the given object is empty or not.
   *
   * @param {object} obj
   *   The object to check.
   *
   * @return {boolean}
   *   Returns true if the object is empty, false otherwise.
   */
  adEntity.helpers.isEmptyObject = function (obj) {
    var k;
    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        return false;
      }
    }
    return true;
  };

  /**
   * Adds a class name to the given DOM element.
   *
   * @param {Element} el
   *   The DOM element.
   * @param {string} className
   *   The class name to add.
   */
  adEntity.helpers.addClass = function (el, className) {
    if (el.classList) {
      el.classList.add(className);
    }
    else {
      el.className += ' ' + className;
    }
  };

  /**
   * Removes a class name to the given DOM element.
   *
   * @param {Element} el
   *   The DOM element.
   * @param {string} className
   *   The class name to remove.
   */
  adEntity.helpers.removeClass = function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    }
    else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  /**
   * Checks whether the element has the given class name.
   *
   * @param {Element} el
   *   The DOM element to check for.
   * @param {string} className
   *   The class name to check.
   *
   * @return {boolean}
   *   Returns true in case the element has the class name, false otherwise.
   */
  adEntity.helpers.hasClass = function (el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }
    else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  };

  /**
   * Get or set arbitrary metadata to the given source and target.
   *
   * This method replaces the usage of jQuery's .data()
   * function inside all ad_entity components. Note that this
   * function is not converting data attributes to camel case.
   *
   * @param {object} source
   *   The source object to get metadata for. This is usually a DOM element.
   * @param {object} target
   *   The target object where to store the retrieved metadata.
   * @param {string} key
   *   (Optional) A string naming the piece of data to get or set.
   * @param {(object|number|string|boolean|function)} value
   *   (Optional) The new data value; this can be any Javascript type except undefined.
   *
   * @return {(object|number|string|boolean|function|undefined)}
   *   Returns the value if the key is given, or the whole metadata object if not.
   */
  adEntity.helpers.metadata = function (source, target, key, value) {
    var metadata;
    var length;
    var i;
    var attribute;
    var attribute_value;

    // Initialize metadata at first time access.
    if (typeof target.__ad_entity_metadata === 'undefined') {
      metadata = {};
      if ((typeof source.attributes === 'object') && (typeof source.getAttribute === 'function')) {
        length = source.attributes.length;
        for (i = 0; i < length; i++) {
          attribute = source.attributes[i];
          try {
            attribute_value = JSON.parse(attribute.value);
          }
          catch (e) {
            attribute_value = attribute.value;
          }
          metadata[attribute.name] = attribute_value;
        }
      }
      target.__ad_entity_metadata = metadata;
    }

    metadata = target.__ad_entity_metadata;
    if (typeof key === 'undefined') {
      return metadata;
    }

    if (typeof value !== 'undefined') {
      metadata[key] = value;
    }

    if (metadata.hasOwnProperty(key)) {
      return metadata[key];
    }
  };

}(window.adEntity, window));
;
/**
 * @file
 * Initial JS for viewing Advertising entities.
 */

(function (ad_entity, Drupal, window) {

  // At this point, the global adEntity object is fully
  // initialized and available as Drupal component.
  Drupal.ad_entity = ad_entity;

  ad_entity.adContainers = ad_entity.adContainers || {};
  ad_entity.context = ad_entity.context || {};
  ad_entity.viewHandlers = ad_entity.viewHandlers || {};

  /**
   * Collects all not yet initialized Advertising containers from the given context.
   *
   * @param {object} context
   *   The part of the DOM being processed.
   * @param {object} settings
   *   The Drupal settings.
   *
   * @return {object}
   *   The newly added containers (newcomers).
   */
  ad_entity.collectAdContainers = function (context, settings) {
    var newcomers = {};
    var collected = ad_entity.adContainers;
    var queues = [ad_entity.queue];
    var queue;
    var length;
    var el;
    var i;
    var container;
    var event_detail;
    ad_entity.queue = [];
    if (!ad_entity.settings.inline) {
      queues.push(context.querySelectorAll('.ad-entity-container'));
    }
    while (queues.length > 0) {
      queue = queues.shift();
      length = queue.length;
      for (i = 0; i < length; i++) {
        el = queue[i];
        if (typeof el.id !== 'string' || !(el.id.length > 0)) {
          continue;
        }
        if (collected.hasOwnProperty(el.id)) {
          continue;
        }
        container = {
          el: el,
          data: function (key, value) {
            return ad_entity.helpers.metadata(this.el, this, key, value);
          }
        };
        collected[el.id] = container;
        newcomers[el.id] = container;
      }
    }
    event_detail = {
      collected: collected,
      newcomers: newcomers,
      context: context,
      settings: settings
    };
    ad_entity.helpers.trigger(window, 'adEntity:collected', false, true, event_detail);
    return newcomers;
  };

  /**
   * Restricts the given list of Advertising containers
   * to the scope of the current breakpoint.
   *
   * @param {object} containers
   *   The list of Advertising containers to restrict.
   *
   * @return {object}
   *   The containers which are in the scope of the current breakpoint.
   */
  ad_entity.restrictAdsToScope = function (containers) {
    var helpers = ad_entity.helpers;
    var scope = ['any'];
    var in_scope;
    var breakpoint;
    var container;
    var container_id;
    var variant;
    var variant_length;
    var el;
    var i;

    if (typeof window.themeBreakpoints === 'object') {
      if (typeof window.themeBreakpoints.getCurrentBreakpoint === 'function') {
        breakpoint = window.themeBreakpoints.getCurrentBreakpoint();
        if (breakpoint) {
          scope.push(breakpoint.name);
        }
      }
    }

    in_scope = {};
    for (container_id in containers) {
      if (containers.hasOwnProperty(container_id)) {
        container = containers[container_id];
        el = container.el;
        variant = container.data('data-ad-entity-variant');
        variant_length = variant.length;
        for (i = 0; i < variant_length; i++) {
          if (!(scope.indexOf(variant[i]) < 0)) {
            in_scope[container_id] = container;
            if (container.data('inScope') !== true) {
              helpers.addClass(el, 'in-scope');
              helpers.removeClass(el, 'out-of-scope');
              el.style.display = null;
              container.data('inScope', true);
            }
            break;
          }
        }
        if (!in_scope.hasOwnProperty(container_id) && (container.data('inScope') !== false)) {
          helpers.removeClass(el, 'in-scope');
          helpers.addClass(el, 'out-of-scope');
          el.style.display = 'none';
          container.data('inScope', false);
        }
      }
    }

    return in_scope;
  };

  /**
   * Correlates the Advertising containers with their view handlers.
   *
   * @param {object} containers
   *   The list of Advertising containers to correlate.
   *
   * @return {object}
   *   The correlation.
   */
  ad_entity.correlate = function (containers) {
    var view_handlers = ad_entity.viewHandlers;
    var view_handler;
    var correlation = {};
    var handler_id = '';
    var container;
    var container_id;

    for (container_id in containers) {
      if (containers.hasOwnProperty(container_id)) {
        container = containers[container_id];
        handler_id = container.data('data-ad-entity-view');

        if (view_handlers.hasOwnProperty(handler_id)) {
          view_handler = view_handlers[handler_id];
          correlation[handler_id] = correlation[handler_id] || {handler: view_handler, containers: {}};
          correlation[handler_id].containers[container_id] = container;
        }
      }
    }
    return correlation;
  };

  /**
   * Applies scope restriction and proper initialization
   * on given Advertisement containers.
   *
   * @param {object} containers
   *   The list of Advertising containers to restrict and initialize.
   * @param {object} context
   *   The DOM context.
   * @param {object} settings
   *   The Drupal settings.
   */
  ad_entity.restrictAndInitialize = function (containers, context, settings) {
    var view_handlers = ad_entity.viewHandlers;
    var helpers = ad_entity.helpers;
    var to_initialize = ad_entity.restrictAdsToScope(containers);
    var container;
    var container_id;
    var initialized;
    var disabled;
    var correlation;
    var handler_id;

    for (container_id in to_initialize) {
      if (to_initialize.hasOwnProperty(container_id)) {
        container = to_initialize[container_id];
        initialized = container.data('initialized');
        if (typeof initialized !== 'boolean') {
          initialized = !helpers.hasClass(container.el, 'not-initialized');
          container.data('initialized', initialized);
        }
        // Prevent re-initialization of already initialized Advertisement.
        if (initialized === true) {
          delete to_initialize[container_id];
        }
        else {
          // Do not initialize disabled containers.
          // As per documentation since beta status,
          // the primary flag for disabling initialization
          // is the class name.
          disabled = helpers.hasClass(container.el, 'initialization-disabled');
          container.data('disabled', disabled);
          if (disabled) {
            delete to_initialize[container_id];
          }
        }
      }
    }

    // Let the view handlers initialize their ads.
    correlation = ad_entity.correlate(to_initialize);
    for (handler_id in view_handlers) {
      if (view_handlers.hasOwnProperty(handler_id)) {
        if (correlation.hasOwnProperty(handler_id)) {
          correlation[handler_id].handler.initialize(correlation[handler_id].containers, context, settings);
        }
      }
    }
  };

  /**
   * Drupal behavior for viewing Advertising entities.
   */
  Drupal.behaviors.adEntityView = {
    attach: function (context, settings) {
      var containers = ad_entity.collectAdContainers(context, settings);
      var isEmptyObject = ad_entity.helpers.isEmptyObject;

      // No need to proceed in case no new containers have been found.
      if (isEmptyObject(containers)) {
        return;
      }

      // Apply Advertising contexts, if available.
      if (!(isEmptyObject(ad_entity.context))) {
        ad_entity.context.addFrom(context);
        ad_entity.context.applyOn(containers);
      }

      // Apply initial scope restriction and initialization on given Advertisement.
      ad_entity.restrictAndInitialize(containers, context, settings);

      // When responsive behavior is enabled,
      // re-apply scope restriction with initialization on breakpoint changes.
      if (ad_entity.hasOwnProperty('settings') && ad_entity.settings.hasOwnProperty('responsive')) {
        if (ad_entity.settings.responsive === true) {
          window.addEventListener('themeBreakpoint:changed', function () {
            ad_entity.restrictAndInitialize(containers, context, settings);
          });
        }
      }
    },
    detach: function (context, settings) {
      var containers = {};
      var collected = ad_entity.adContainers;
      var correlation;
      var handler_id;

      // Remove the detached container from the collection,
      // but keep them in mind for other view handlers to act on.
      var container_items = context.querySelectorAll('.ad-entity-container');
      var length = container_items.length;
      var i;
      var el;

      for (i = 0; i < length; i++) {
        el = container_items[i];
        if (typeof el.id !== 'string' || !(el.id.length > 0)) {
          continue;
        }
        if (!collected.hasOwnProperty(el.id)) {
          continue;
        }

        containers[el.id] = collected[el.id];
        delete collected[el.id];
      }

      // Let the view handlers act on detachment of their ads.
      correlation = ad_entity.correlate(containers);
      for (handler_id in ad_entity.viewHandlers) {
        if (ad_entity.viewHandlers.hasOwnProperty(handler_id)) {
          if (correlation.hasOwnProperty(handler_id)) {
            correlation[handler_id].handler.detach(correlation[handler_id].containers, context, settings);
          }
        }
      }
    }
  };

}(window.adEntity, Drupal, window));
;
/**
 * @file
 * Tasks to run right after View handler building is complete.
 */

(function (ad_entity, behavior, document, settings) {

  // Run attachment on first page load,
  // without waiting for other Drupal behaviors.
  if (!(ad_entity.helpers.isEmptyObject(ad_entity.viewHandlers))) {
    behavior.attach(document, settings);
  }

}(Drupal.ad_entity, Drupal.behaviors.adEntityView, window.document, drupalSettings));
;
