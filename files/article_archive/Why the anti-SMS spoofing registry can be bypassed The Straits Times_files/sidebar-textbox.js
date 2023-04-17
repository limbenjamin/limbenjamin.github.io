/**
 * Expandable Sidebar Textbox custom js.
 */
(function ($) {

  // Expandable/collapsible sidebar textbox for all articles types
  $(document).ready(function () {
    $('.sidebar-textbox.expandable-sidebar-textbox').each(function () {
      if ($(this).height() <= 180) {
        if($(this).hasClass('expandable')) {
          $(this).removeClass('expandable');
        }
        if ($(this).find('.btn-expand')) {
          $(this).remove('btn-expand');
        }
      } else {
        $(this).append("<div class='btn-expand'></div>")
        if(!$(this).hasClass('expandable')) {
          $(this).addClass('expandable');
        }
        if (typeof $(this).find('.btn-expand') !== 'undefined') {
          $(this).find('.btn-expand').click(function() {
            if($(this).parent().hasClass("expand")) {
              $(this).parent().removeClass('expand');
            } else {
              $(this).parent().addClass('expand');
            }
          });
        }
      }
    });
  });
})(jQuery);
