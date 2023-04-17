/**
 * queryly search custom js.
 */

(function ($) {
  if (typeof queryly !== "undefined") {
    $('.navbar-toggle-search').click(function () {
      // To make sure outbrain div are hidden in article pages
      if ($('body').hasClass('node-type-article')) {
        queryly.init('a7dbcffb18bb41eb', document.querySelectorAll('.OUTBRAIN, .top-leaderboard, #main-wrapper, #main_container_reference, #skinning_reference,header,footer, .dynamic-section-menu, .slicknav_menu, #smartbanner, #skip-link'), { "uiversion": 1 });
      }
      $('body').toggleClass('queryly-search-opened');
      if (document.getElementById('smartbanner') && $('#smartbanner').is(":visible")) {
        $('.queryly_overlay').addClass('queryly-margin');
      } else {
        $('.queryly_overlay').removeClass('queryly-margin');
      }
    });
    //queryly.init('a7dbcffb18bb41eb', queryly.jquery('.navbar-toggle-search'));
    queryly.init('a7dbcffb18bb41eb', document.querySelectorAll('.OUTBRAIN, .top-leaderboard, #main-wrapper, #main_container_reference, #skinning_reference,header,footer, .dynamic-section-menu, .slicknav_menu, #smartbanner, #skip-link'), { "uiversion": 1 });
  }
})(jQuery);
