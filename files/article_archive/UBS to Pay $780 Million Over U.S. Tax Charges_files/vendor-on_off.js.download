var location_for_vendor_purposes = new String(document.location);
// START: SPHERE
// SPHERE ON
var SPHERE_ON = true ;
if( (location_for_vendor_purposes).indexOf('SPHERE_OFF') != -1 )
	SPHERE_ON = false;
// SPHERE Action
if (! SPHERE_ON )
	document.write('<style>.sphere-on_off {display:none;}</style>');
// END: SPHERE
// START: OUTBRAIN
var OUTBRAIN_ON = false;
if( (location_for_vendor_purposes).indexOf('OUTBRAIN_ON') != -1 )
	OUTBRAIN_ON = true;
// END: OUTBRAIN
// START: OUTBRAIN2
var OUTBRAIN2_ON = false;
if( (location_for_vendor_purposes).indexOf('OUTBRAIN2_ON') != -1 )
	OUTBRAIN2_ON = true;
// END: OUTBRAIN
// START: DIGGTHIS
var DIGGTHIS_ON = false ;
if( (location_for_vendor_purposes).indexOf('DIGGTHIS_ON') != -1 )
	DIGGTHIS_ON = true;
// END: DIGGTHIS
var TWEETMEME_ON = false ;
if( (location_for_vendor_purposes).indexOf('TWEETMEME_ON') != -1 )
	TWEETMEME_ON = true;
var FORMATDYNAMICS_ON = true ;
if( (location_for_vendor_purposes).indexOf('FORMATDYNAMICS_OFF') != -1 )
	FORMATDYNAMICS_ON = false;
var GOOGLEBUZZ_ON = true ;
if( (location_for_vendor_purposes).indexOf('GOOGLEBUZZ_OFF') != -1 )
	GOOGLEBUZZ_ON = false;
var LINKEDIN_ON = true ;
if( (location_for_vendor_purposes).indexOf('LINKEDIN_OFF') != -1 )
	LINKEDIN_ON = false;
var FBSHARE_ON = true ;
if( (location_for_vendor_purposes).indexOf('FBSHARE_OFF') != -1 )
	FBSHARE_ON = false;
var NETWORK_NEWS_ON = true ;
if( (location_for_vendor_purposes).indexOf('NETWORK_NEWS_OFF') != -1 )
	NETWORK_NEWS_ON = false;
var WAPOLABS_PARTNERS_ON = true ;
if( (location_for_vendor_purposes).indexOf('WAPOLABS_PARTNERS_OFF') != -1 )
	WAPOLABS_PARTNERS_ON = false;
var QUANTCAST_ON = true ;
if( (location_for_vendor_purposes).indexOf('QUANTCAST_OFF') != -1 )
	QUANTCAST_ON = false;

if (typeof jQuery != 'undefined' && typeof $ != 'undefined') {
jQuery(function(){
(function($){
	$.fn.imageLazyLoader = function(options){
		var settings = {
            container: $(window),
			imageClass: 'unloaded',
			urlAttribute: 'data-src',
			threshold: 200,
			delay: 50,
			speed: 300
		},
		o = $.extend(settings, options);
		
		var images = [],
			loadEvent = 'loadimage',
			timer;
			
		var debug = function(msg){
			//window.console && console.log && console.log(msg); 
		}
		
		o.container.bind('scroll resize', function(e){
			if (timer){
				clearTimeout(timer);
			}
			timer = setTimeout(function(){
				var top = o.container.scrollTop();
					height = o.container.height(),
					topLimit = top - o.threshold;
					bottomLimit = top + height + o.threshold;
                    debug('Top: ' + topLimit + '\n' + 'Bottom: ' + bottomLimit);
				for (var i=0; i<images.length; i++){
					var el = images[i];
					if (!el.loaded){
						if (el.offset().top <= bottomLimit && el.offset().top >= topLimit){
							el.trigger(loadEvent);
						}
					}
		        }
			}, o.delay);
		});
		
		this.each(function(){
			var el = $(this);
			el.loaded = false;
			el.bind(loadEvent, function(){
				if (el.attr(o.urlAttribute)){
					el
						.hide()
						.attr('src', el.attr(o.urlAttribute))
						.removeClass(o.imageClass)
						.removeAttr(o.urlAttribute)
                    if ($.browser.msie){
                        el.show();
                    } else {
                        el.fadeIn(o.speed);
                    }
					el.loaded = true;
					debug(el.attr('src') + ' loaded');
				}
			});
			images.push(el);
		});
		
		o.container.trigger('resize');
		
		return this;
	}
})(jQuery);
	var options = {
		imageClass: 'unloaded'
	}
	jQuery('.unloaded').imageLazyLoader(options);
});	
}	