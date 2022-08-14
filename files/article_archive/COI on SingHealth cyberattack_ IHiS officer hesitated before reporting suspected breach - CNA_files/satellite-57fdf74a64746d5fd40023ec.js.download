_satellite.pushAsyncScript(function(event, target, $variables){
  /*function loadScript(url, id, callback){
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    if(head.innerHTML.indexOf(url) > -1) return;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.id = id;
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;
    // Fire the loading
    head.appendChild(script);
}

//loadScript('//ad.crwdcntrl.net/5/c=5225/pe=y/var=lotauds','')
//loadScript('https://ad.crwdcntrl.net/5/c=5225/pe=y/var=lotauds','')
//loadScript('//tags.crwdcntrl.net/c/5226/cc.js?ns=_cc5226','LOTCC_5226')
//loadScript('http://tags.crwdcntrl.net/c/5226/cc.js?ns=_cc5226','LOTCC_5226')*/

/*
* Plugin: DFP Lotame Plugin
*/
  window.dfpLotameKey = "lotameid";
  window.dfpLotame = "";
  if (typeof(lotauds) != 'undefined') {
    for (var cci = 0; cci < lotauds.Profile.Audiences.Audience.length; cci++) {
      if (cci > 0) dfpLotame += ",";
      window.dfpLotame += lotauds.Profile.Audiences.Audience[cci].abbr;
    }
  }


});
