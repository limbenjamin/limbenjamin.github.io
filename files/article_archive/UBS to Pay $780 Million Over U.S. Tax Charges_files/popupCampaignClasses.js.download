/*
 * Popup Campaign Manager provides the objects and methods needed to control multiple popup campaigns
 * It is controlled by popupCampaigns.js; by itself it does nothing that you'll see on a page.
 * It needs one preset variable: thisNode must be set to the node to which the page belongs before importing this javascript source.
 * TO CHANGE THE DOUBLECLICK CAP OR DOUBLECLICK TIMEFRAME, EDIT DClickCap and DClickTimeFrame IN THIS FILE
 */

if ( typeof thisNode == 'undefined' ) thisNode = 'news';

// CONSTANTS
// REGISTERED|NOT_REGISTERED identify whether the user is defined (based on the WPATC cookie).
// To define both user groups, use addition (REGISTERED + NOT_REGISTERED == all users)
var REGISTERED = 1;
var NOT_REGISTERED = 2;

// ARTICLE|FRONT|IMPLICIT|EXPLICIT define the types of pages to which a mapping applies.
// To combine several page types, use addition 
// (FRONT + ARTICLE + IMPLICIT == all section front and articles in this node and all its children)
var ARTICLE = 1;
var FRONT = 2;
var IMPLICIT = 4;
var EXPLICIT = 0;

// These constants make the time conversion to milliseconds easier. Take a number and multiply it by the appropriate constant
var pcm_DAYS = 24 * 60 * 60 * 1000;
var pcm_HOURS = 60 * 60 * 1000;
var pcm_MINUTES = 60 * 1000;
var TWELVE_HOURS = 12 * pcm_HOURS;
var ONE_DAY = 1 * pcm_DAYS;
var ONE_WEEK = 7 * pcm_DAYS;
var ONE_MONTH = 30 * pcm_DAYS;
var pcm_now = new Date();

// The following constants are for internal use
var nopops = false;
var NA = '';
var SESSION = 0;
var CAMPAIGN_MANAGER = 1;
var INTENSITY = 2;
var SUBSCRIBED = 3;
var DCLICK = 4;
var DCLICK_SESSION_CAP = 5; // new code for v4
var POPUP_WIDTH = 300;
var POPUP_HEIGHT = 400;

var COOKIE_NAME = new Array();
var COOKIE_VALUE = new Array();

COOKIE_NAME[SESSION] = 'wpni_session';
COOKIE_NAME[CAMPAIGN_MANAGER] = 'wpni_campaignmanager';
COOKIE_NAME[INTENSITY] = 'wpni_campaignintensity';
COOKIE_NAME[SUBSCRIBED] = 'WPATC';
COOKIE_NAME[DCLICK] = 'dcCount';
COOKIE_NAME[DCLICK_SESSION_CAP] = 'dcSessionLimit'; // new code for v4

// DClickCap and DClickTimeFrame apply to DoubleClick popup and popunder campaigns
var DClickCap = 5; // Maximum number of DoubleClick popups allowed in timeframe
var DClickTimeFrame = TWELVE_HOURS; // Timeframe applied to DClickCap
var DClickSessionCap = 2; // New variable to control popups per session
var DClickMinTimeBetweenPopups = 60000;
var FORCED_SESSION_EXPIRATON = TWELVE_HOURS; // Must match value in cookie_code.html

var popupUrl = NA;
var pcm_node = thisNode; // thisNode must be defined in the file calling this js file
var isArticle = (location.href.indexOf("/articles/") != -1) ? true : false ;
var popupHasBeenDelivered = false;
var interstitialIsAllowed = true;


// TO DETERMINE IF USER CAME FROM GOOGLE:
var docUrl = document.location.href;
var key = docUrl.indexOf('?');

if (key != -1) // make sure there are parameters
{
  // get the parameter
  var temp = docUrl.substring(key + 1, docUrl.length);
  
  // if just "g" was passed in, set the interstitial to false
  if (temp.length == 1 && (temp == "g" || temp == "G" || temp == "local") )
  {
    interstitialIsAllowed = false;
	nopops = true;
  } 
}
// END GOOGLE LOGIC


// Extract cookies that are not campaign specific 
for (var count = 0; count < COOKIE_NAME.length; count++)
{
  var startAt = 0;
  if ( (startAt = document.cookie.indexOf(COOKIE_NAME[count])) != -1)
  {
    startAt += COOKIE_NAME[count].length + 1;
    var endAt = (document.cookie.indexOf(";", startAt) == -1) ? document.cookie.length : document.cookie.indexOf(";", startAt);
    COOKIE_VALUE[count] = document.cookie.substring(startAt, endAt);
  }
  else
  {
    COOKIE_VALUE[count] = NA;
  }
  //alert ( COOKIE_NAME[count]+'='+COOKIE_VALUE[count] );
}

// New logic to prevent back-to-back interstitials
if ( COOKIE_VALUE[DCLICK_SESSION_CAP].indexOf ("X") != -1 )
{
  interstitialIsAllowed = false; 
  var newCookie = COOKIE_VALUE[DCLICK_SESSION_CAP].substring(0,COOKIE_VALUE[DCLICK_SESSION_CAP].length - 1);
  document.cookie = "dcSessionLimit=" + newCookie + ";path=/;domain=.washingtonpost.com";
}

// New logic to allow for internal timing of DCLICK_SESSION_CAP (v5)
//var dclickTimeBetweenPopups = new Date();
//dclickTimeBetweenPopups.setTime ( dclickTimeBetweenPopups.getTime() + DClickMinTimeBetweenPopups );

if ( COOKIE_VALUE[DCLICK_SESSION_CAP].indexOf ("|") != -1 )
{
  dclickSessionExpiration = COOKIE_VALUE[DCLICK_SESSION_CAP].substring(COOKIE_VALUE[DCLICK_SESSION_CAP].indexOf("|") + 1);
  COOKIE_VALUE[DCLICK_SESSION_CAP] = COOKIE_VALUE[DCLICK_SESSION_CAP].substring(0, COOKIE_VALUE[DCLICK_SESSION_CAP].indexOf("|"));
  var currentDate = new Date();
  var cookieExpiresDate = new Date();
  cookieExpiresDate.setTime( parseInt(dclickSessionExpiration) );

  var cookieSetDate = new Date();
  cookieSetDate.setTime( parseInt(dclickSessionExpiration) - FORCED_SESSION_EXPIRATON );
  
  // If cookie was written in past 15 mins, don't allow interstitial
  if ( currentDate.getTime() - cookieExpiresDate.getTime() < 0 ) // If the cookie was set to expire in the past 15 minutes
  {
    if ( currentDate.getTime() - cookieSetDate.getTime() < DClickMinTimeBetweenPopups )
    {
      interstitialIsAllowed = false;
//      alert ("No ad because it's been less than a minute ("+(currentDate.getTime() - cookieSetDate.getTime())+" < "+DClickMinTimeBetweenPopups+")" );
    }
    if ( COOKIE_VALUE[DCLICK_SESSION_CAP] >= DClickSessionCap )
    {
      interstitialIsAllowed = false;
    }

    //alert ( "Last popup occurred too recently ( "+( currentDate.getTime() - cookieSetDate.getTime() )+"<"+DClickMinTimeBetweenPopups+")" );
  }
// If cookie is older than 15 mins, expire it
  else
  {
    dclickSessionExpiration = new Date();
    dclickSessionExpiration.setTime ( dclickSessionExpiration.getTime() - 100000 );
    document.cookie = COOKIE_NAME[DCLICK_SESSION_CAP] + "=1;expires="+dclickSessionExpiration.toGMTString()+";path=/;domain=.washingtonpost.com"; // new code for v4
    //alert ( "Deleting old cookie" );
  }
}

// if ( COOKIE_VALUE[DCLICK_SESSION_CAP] >= DClickSessionCap ) interstitialIsAllowed=false; // new code for v4
if ( COOKIE_VALUE[DCLICK] >= DClickCap ) interstitialIsAllowed = false;