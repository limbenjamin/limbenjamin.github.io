var outbrain_enable = 1;
var overlay_validity = 4;
var catfish_validity = 4;
var postitial_validity = 4;
var prestitial_enabled = 1; // this value will get override in prebid.js
var postitial_enabled = 1; // this value will get override in prebid.js
var catfish_enabled = 1; // this value will get override in prebid.js
var key = 'dfp_preview';
var keycode = querystring(key);
var topOverlayImpressions = 1;
var topOverlayImpressionsServed = 0;
var dfp_preview_ids = querystring("dfp_preview");


/** Get cookie by name */
window.getCookieByName = function (name) {
    match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) { return match[1];
    }
}

if (window.getCookieByName("topOverlayImpressionsServed") != undefined) {
    topOverlayImpressionsServed = parseInt(window.getCookieByName("topOverlayImpressionsServed"));
}


function getCookieValue(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function setCookieValue(cname, cvalue, expdays) {
    var d = new Date();
    expdays = expdays || 1;
    d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function querystring(key) {
    var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    var r = [],
        m;
    while ((m = re.exec(document.location.search)) != null) { r[r.length] = m[1];
    }
    return r;
}
// Remove the catfish and prestitial ads for mobile & Tablet.
if (typeof loaded_dfp_tags !== 'undefined') {
    var dfpObj = JSON.parse(loaded_dfp_tags);
    if(window.canRunAds !== undefined) {
        if(screen.width > 767 && dfpObj.hasOwnProperty('catfish')) {
            delete dfpObj.catfish;
        }
        if(screen.width <= 767 && dfpObj.hasOwnProperty('prestitial')) {
            delete dfpObj.prestitial;
        }
        var loaded_dfp_tags = JSON.stringify(dfpObj);
    }
}

function reloadScrollBars() {
    document.documentElement.style.overflowY = 'auto'; // firefox, chrome.
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        document.body.scroll = "yes";
    } // ie only
}

function continueToSite() {
    document.getElementById("MyPageOverlay").className = "";
    reloadScrollBars();
}

function unloadScrollBars() {
    prestitial_timer = window.setTimeout(continueToSite, 15000);
    document.documentElement.style.overflowY = 'hidden'; // firefox, chrome.
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        document.body.scroll = "no";
    } // ie only
}

function parse_query_string(key) {
    var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    var r = [],
        m;
    while ((m = re.exec(document.location.search)) != null) { r[r.length] = m[1];
    }
    return r;
}

function kill_postitial() {
    window.location.href = postitial_redirecturl;
}

function closetopoverlay(evt) {
    if (evt.data == 'close' || evt.data == 'bz-interstitial-close') {
        console.log("close event called");
        if (postitial_redirecturl) {
            window.location.href = postitial_redirecturl;
        } else {
            document.getElementById("MyPageOverlay").className = "";
            document.getElementById("dfp-ad-prestitial").style.height = "0";
            reloadScrollBars();
        }
    }
}
