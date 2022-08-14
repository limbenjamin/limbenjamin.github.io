window.addEventListener('load', function() {
    var head = document.head;
    var scrptHandlerFn = document.createElement("script");
    scrptHandlerFn.type = 'text/javascript';
    scrptHandlerFn.innerHTML="function handleGoogleOneTapCallback(response){  _mySPHObj.googleOneTap(response);}";
    head.appendChild(scrptHandlerFn);

    var scrptHandlerFnForOneTap = document.createElement("script");
    scrptHandlerFnForOneTap.type = 'text/javascript';
    scrptHandlerFnForOneTap.innerHTML = 'function handleGoogleOneTapNotification(notificationObj){console.log("notification"); notificationObj.isDisplayed()&&(window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"mysphCustomPageView",pageName:"mySPH Google One-Tap",url:"/virtual/mysph-google-onetap/",socialSource:"GoogleOneTap"}));notificationObj.isSkippedMoment()&&(window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"mysphCustomEvent",eventCategory:"GoogleOneTap",eventAction:"Close",eventLabel:"-",pageName:"mySPH Google One-Tap",url:"/virtual/mysph-google-onetap/",socialSource:"GoogleOneTap"}));}';
    head.appendChild(scrptHandlerFnForOneTap);

    window.setTimeout(function() {
        if (null!=window._mySPHObj) {
            window._mySPHObj.showGoogleOneTap();
        }
     }, 10000);
});
