var postitial_redirecturl;
var prestitial_timer;
var show_overlay;

if (window.canRunAds !== undefined && (show_overlay === 1 || (dfp_preview_ids != undefined &&
    dfp_preview_ids.length != 0 && dfp_preview_ids != "")) && screen.width > 767 && prestitial_enabled === 1) {
    document.getElementById("MyPageOverlay").className = "overlayWhite"; unloadScrollBars();
}

if (window.canRunAds !== undefined && screen.width <= 767 && postitial_enabled === 1) {
    bindPostitial();
}

googletag.pubads().addEventListener('slotRenderEnded', function (event) {

    if (googletag.slots["prestitial"] == event.slot) {
        console.log("prestitial listener");
        if (event.isEmpty) {
            console.log("empty prestitial");
            if (document.getElementById("MyPageOverlay") != null) {
              document.getElementById("MyPageOverlay").className = "";
            }
            reloadScrollBars();
        } else {
            //Kill the prestitial_timer
            window.clearTimeout(prestitial_timer);
        }
    }
});

var val_test_adid = '';
var val_test_plid = '';

if (window.location.search.indexOf("test_adid") !== -1) {
    val_test_adid = parse_query_string('test_adid');
}
if (window.location.search.indexOf("test_plid") !== -1) {
    val_test_plid = parse_query_string('test_plid');
}
if (val_test_adid !== "") {
    googletag.pubads().setTargeting("test_adid", val_test_adid);
}
if (val_test_plid !== "") {
    googletag.pubads().setTargeting("test_plid", val_test_plid);
}

var key = "dfp_preview";
if (Object.entries(dfp_preview_ids).length !== 0 && dfp_preview_ids != "") {
    googletag.cmd.push(function () {
         googletag.pubads().setTargeting(key, dfp_preview_ids);
    });
}

window.addEventListener('message', closetopoverlay, false);
googletag.enableServices();

function bindPostitial() {
    console.log("bindPostitial");
    //googletag.destroySlots([googletag.slots["topoverlay"]])
    document.addEventListener('click', function (event) {
    console.log("click event called");

      var anchor = event.target.closest("a");     // Find closest Anchor (or self)
     var currentdomain = window.location.href.split('/')[2];

      if(anchor !== null)
      {

        var anchorHref = anchor.getAttribute('href');
        //console.log(anchorHref);
        if(anchorHref.indexOf(currentdomain) !== -1 || anchorHref.charAt(0) == "/" || anchorHref.match(/http(s)*\:\/\/traffic.outbrain.com\//) != null) {
          event.preventDefault();// Don't navigate!
          postitial_redirecturl = anchorHref;
          console.log(postitial_redirecturl);
          var dfpadunits = JSON.parse(loaded_dfp_tags);
          var dynamic_postitial_template_unit = 'lb1';
          if(!dfpadunits[dynamic_postitial_template_unit]) { dynamic_postitial_template_unit = 'lb2'; }
          var dynamic_postitial = dfpadunits [dynamic_postitial_template_unit]['adunit'];
          if ( typeof dynamic_postitial !== "undefined" )
              {
              console.log("dynamic_postitial");
                dynamic_postitial = dynamic_postitial.replace( "/"+dynamic_postitial_template_unit+"/" , "/postitial/" );

                if( (topOverlayImpressionsServed < topOverlayImpressions && document.cookie.indexOf("postitialDisplayed=") == -1) || (dfp_preview_ids != undefined && dfp_preview_ids.length != 0) ) {
                  document.getElementById("MyPageOverlay").className = "overlayWhite";
                  googletag.cmd.push(function () {
                    var slot_topoverlay = googletag.defineSlot( dynamic_postitial , [1,1], 'postitial_holder' ).addService(googletag.pubads()).setTargeting("pos", "postitial");
                    googletag.pubads().addEventListener('slotRenderEnded',function (eventtopoverlay) {
                      if(slot_topoverlay == eventtopoverlay.slot) {
                        if (eventtopoverlay.isEmpty) {
                          console.log("empty postitial");
                          window.location.href = postitial_redirecturl;
                        } else {
                          unloadScrollBars();
                          var expiry = new Date();expiry.setTime(expiry.getTime() + (postitial_validity * 60 * 60 * 1000));
                          topOverlayImpressionsServed = topOverlayImpressionsServed + 1;
                          if(topOverlayImpressionsServed == topOverlayImpressions) {
                            document.cookie = "postitialDisplayed=yes;path=/; expires=" + expiry.toGMTString();
                            document.cookie = "topOverlayImpressionsServed=0;path=/; expires=" + expiry.toGMTString();
                          } else {
                            document.cookie = "topOverlayImpressionsServed=" + topOverlayImpressionsServed + ";path=/; expires=" + expiry.toGMTString();
                          }
                          window.clearTimeout(postitial_timer);
                        }
                      }
                    });
                    googletag.cmd.push( function () {
                      googletag.display( 'postitial_holder' );
                      googletag.pubads().refresh([slot_topoverlay], { changeCorrelator: false });
                    });
                  });
                } else {
                  console.log("Postitial frequency cap from cookie");
                  window.location.href = postitial_redirecturl;
                }
                 var postitial_timer = window.setTimeout(kill_postitial, 15000);
              }
        }
      }

    }, true);
  }
