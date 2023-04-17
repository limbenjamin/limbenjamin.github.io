/**
 * @file
 * Contains \Drupal\mc_outbrain\js file.
 */

(function ($) {

  Drupal.behaviors.outbrain = {
    attach: function (context) {
        $('.OUTBRAIN').attr('data-src', window.location.href);
        OBR.extern.researchWidget();
    }
  };
})(jQuery);
;
