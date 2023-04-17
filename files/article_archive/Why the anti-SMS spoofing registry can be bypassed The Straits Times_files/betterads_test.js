// For Testing Purpose only
//prestitial_enabled = 1; // this value will get override in prebid.js
//postitial_enabled = 1; // this value will get override in prebid.js
//catfish_enabled = 1; // this value will get override in prebid.js';


if ((window.getCookieByName('mySPHUserType') === 'y-sub') && (dfp_preview_ids != undefined && dfp_preview_ids.length == 0)) {
    postitial_enabled = 0;
    prestitial_enabled = 0;
}