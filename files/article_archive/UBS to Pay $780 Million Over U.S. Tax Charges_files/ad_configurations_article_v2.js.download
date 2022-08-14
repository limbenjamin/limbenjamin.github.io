if (typeof commercialNode == 'undefined' || commercialNode == 'one') commercialNode = (typeof thisNode != 'undefined' && thisNode != 'one')?thisNode:'technology';

function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}


var adOpsLocalFlag = (getCookie('WPATC') && getCookie('WPATC').match('C=1:'))?true:false;


function flashChecker() {
plugIn = false;
plugInVersion = 0;
if(typeof ActiveXObject != 'undefined')
{
	for(var i=0;i<12;i++)
	{try{var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);plugInVersion = i;plugIn = 'You Are Running Explorer Flash '  + plugInVersion}catch(e){}
	}
}
else if(navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){var y = navigator.plugins["Shockwave Flash"].description;plugInVersion = y.charAt(y.indexOf('.')-1); plugIn = "You Are Running Mozilla Flash " + plugInVersion}
else {plugIn = 'Not Sure--There is No ActiveXObject, nor is there a Mozilla Flash'};
return plugIn;
}

function activeXChecker () {
	return(typeof ActiveXObject != 'undefined')?true:false
}

function contentCategories(_commercialNode,_targSec)
{
	if(_commercialNode.charAt(_commercialNode.length-1) != '/')
	{
		_commercialNode += '/';
	}
	
	var contCatArray = new Array();


	contCatArray['lifestyle'] = new Array(
'^wpni.onfaith.blog/','^jobs/','^jobsarticle/','^admin/','^adminarticle/','^artsandliving/','^artsandlivingarticle/','^cityguide/','^entertainment/','^fantasy.fleaflicker/','^foodarticle/','^health/','^healtharticle/','^home/','^homearticle/','^jezebelstomb/','^kidspost/','^kidspostarticle/','^loudounextra/','^photo/','^photoarticle/','^print/','^printarticle/','^science/','^shoplocal/','^shopping/','^smartliving/','^sports/','^style/','^stylearticle/','^television/','^travel/','^traveldirectory/','^travel.sidestep/','^travelarticle/','^weather/','^weatherarticle/','^religion/','^cars/','^food/','^pets/','^sportsarticle/');
	contCatArray['execnews'] = new Array('^postglobal.blog/','^smallbiz/','^mypost/','^mypost.discussions/','^mywashpost/','^allbusiness/','^business/','^businessarticle/','^digest/','^digestarticle/','^washingtonpost.com/','^nation/','^nationarticle/','^news/','^newsarticle/','^opinion/','^opinionarticle/','^politics/','^politicsarticle/','^reviewed.com/','^technology/','^world/','^worldarticle/','liveonline/world','liveonlinearticle/world','liveonline/business','liveonlinearticle/business','liveonline/nation','liveonlinearticle/nation','liveonline/politics','liveonlinearticle/politics','liveonline/jobs/lifeatwork','liveonlinearticle/jobs/lifeatwork','liveonline/jobs/onthejoblive','liveonlinearticle/jobs/onthejoblive');
	contCatArray['style'] = ['^liveonline/books','^liveonline/food','^liveonline/postmag','^liveonline/style','^liveonlinearticle/style/tv','^liveonlinearticle/style/tellmeaboutit','^liveonlinearticle/style/funnyyoushouldask','^liveonlinearticle/style/reliablesource','^liveonlinearticle/style/stationbreak','^market/shopping/books','^market/weddings411','^market/weddings','^market/magazines','^market/garden','^market/books','^market/appliances','^market/apparel','^market/shopping/apparel','^market/shopping/appliances','^market/shopping/holiday','^market/shopping/weddings','^market/shopping/magazines','^nation/columns/kurtzhoward','^photo/style','^print/style','^printarticle/style']
  
	var resultsArray = true;
	
	for(var a = 0; a < contCatArray[_targSec.toLowerCase()].length; a++)
	{
		var re = RegExp(contCatArray[_targSec][a],'gi');
		if (_commercialNode.match(re))
		{
			return true;
		}
	}
	
	return false;
}

var adOpsLocalUser = getCookie && ( !getCookie('WPATC') || getCookie('WPATC').match('C=1:') );



function dateToString(date) {
var yyyy = date.getYear();
var mm = date.getMonth() + 1;
var dd = date.getDate();
var hour = date.getHours();
var min = date.getMinutes();

if (mm < 10) mm = "0"+mm;
if (dd < 10) dd = "0"+dd;
if (hour < 10) hour = "0"+hour;
if (min < 10) min = "0"+min;
return ''+mm+dd+hour+min;
}

function estOffset(dateObj)
{
	var mo = dateObj.getMonth()+1;
	if (mo < 3 || mo > 10) return 300;
	if (mo > 3 && mo < 10) return 240;
	var last_sunday_index =   ( ( dateObj.getDate() - dateObj.getDay() - 1 ) / 7) + 1;
	if(mo==3)
	{
	  return ( last_sunday_index > 2 || (last_sunday_index == 2 && dateObj.getHours() >= 2))?300:240;
	}
	else
	{
	 return ( last_sunday_index > 1 || (last_sunday_index == 1 && dateObj.getHours() >= 2))?240:300;
	}
}

if(typeof estNow == 'undefined' || typeof estNowWithYear == 'undefined')
{
	var estNow = new Date();
	var estNowInMillis = estNow.getTime();
	var millisFromEST = (estNow.getTimezoneOffset() - estOffset(estNow)) * 60000;
	var estNow = new Date( estNowInMillis + millisFromEST )
	var estNowWithYear = estNow.getYear();
	var estNowWithYear = (estNowWithYear < 1900 )?estNowWithYear + 1900:estNowWithYear;
	estNowWithYear = estNowWithYear.toString() + dateToString(estNow).toString() ;
}

function getDay(today) {return today.getDay()}
var today = new Date();
var now = dateToString(today);


var v2 = true;
//var adTemplate = 255 ;

// Define all possible ad positions
var BANNER_FLEX_TOP = 1 << 0;
var BANNER_FLEX_BOTTOM = 1 << 1;
var SKY_LEFT = 1 << 2;
var SKY_RIGHT = 1 << 3;
var BIGBOX_FLEX = 1 << 4;
var BIG_FLEX_RIGHT = 1 << 5;
var AD_LINKS_RIGHT = 1 << 6; //Overture Links Right (Not in DART)
var AD_LINKS_BOTTOM = 1 << 7; //Overture Links Bottom (Not in DART)
var TEXTLINKS = 1 << 8; // WP.com hosted links (Not in DART)
var VM = 1 << 9; // Not in DART
var SPONSORSHIP = 1 << 10;
var TILE_LEFT = 1 << 11; // Not in DART
var TILE_RIGHT = 1 << 12; // Not in DART
var TILE_RIGHT_TOP = 1 << 13; // 125x125 on Travel
var TOP_JOBS = 1 << 14;
var TOOLBOX_LEFT = 1 << 15;
var TOOLBOX_RIGHT = 1 << 16;
var TOOLBOX_BOTTOM = 1 << 17;
var TILE_RIGHT_TOP2 = 1 << 18; // 125x125 on Travel on right
var BLOG_FEATUREBAR = 1 << 19; // 446x45 blog bar
var INLINE_ARTICLE_AD = 1 << 20;
var TOOLBOX_LEFT_180X31 = 1 << 21;
var PORTAL_FEATUREBAR = 1 << 22; // 336x60 portal featurebar
var TILE_228X60 = 1 << 23; //228x60 on cooking
var GOOGLE_LINKS = AD_LINKS_BOTTOM;
var BIGBOX_RIGHT = 1 << 24;
var BLOG_INLINE_AD = 1 << 25;
var BLOG_INLINE_AD2 = 1 << 26;


// Define all possible ad templates
var NO_ADS = 0;
var NEWS = 1;
var NEWS_VM = 2;
var NEWS_TRAVEL = 3;
var NEWS_TECHNOLOGY = 4;
var PRINTER_FRIENDLY = 5;
var ENLARGED_PHOTO = 6;
var PRINTER_FRIENDLY_FLEX = 7;
var NEWS_OVERTURE_RIGHT = 8;
var NEWS_OVERTURE_RIGHT_VM = 9;
var NEWS_NO_OVERTURE = 10;
var SIMPLE = 11;
var BOTTOM_ONLY = 12;
var DEFAULT_TEMPLATE = NEWS;
var NEWS_LEFT_SKY = 13;
var TRAVEL_BY_TOPIC = 14;
var NEWS_BUSINESS = 15;
var LOCAL_PORTAL = 16;
var NEWS_TRAVEL_NO_TRT = 17;
var NEWS_TEST = 18;
var WEATHER = 19;
var SIMPLE_NO_LB = 20;


if (typeof thisNode == 'undefined') thisNode = 'news';

// Define contents of ad templates
var templateConfigs = new Array();

templateConfigs[ NEWS ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM + AD_LINKS_RIGHT + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS + TILE_LEFT ;

templateConfigs[ NEWS_TEST ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM + AD_LINKS_RIGHT  + TOOLBOX_LEFT + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS + TILE_LEFT ;

templateConfigs[ NEWS_BUSINESS ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM + AD_LINKS_RIGHT + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS ;

templateConfigs[ NEWS_LEFT_SKY ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM + AD_LINKS_RIGHT + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS ;

templateConfigs[ NEWS_NO_OVERTURE ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS ;

templateConfigs[ NEWS_VM ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM + VM + AD_LINKS_RIGHT + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS ;

templateConfigs[ NEWS_TRAVEL ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM + VM + TILE_RIGHT_TOP + TILE_LEFT  + TILE_RIGHT + TEXTLINKS ;

templateConfigs[ NEWS_TRAVEL_NO_TRT ] =  templateConfigs[ NEWS_TRAVEL ] - TILE_RIGHT_TOP

templateConfigs[ TRAVEL_BY_TOPIC ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM +  TILE_LEFT  + TILE_RIGHT + TEXTLINKS ;

templateConfigs[ NEWS_TECHNOLOGY ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_BOTTOM + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS ;

templateConfigs[ PRINTER_FRIENDLY ]  = SKY_RIGHT + TOOLBOX_RIGHT + AD_LINKS_BOTTOM ;

templateConfigs[ PRINTER_FRIENDLY_FLEX ]  = BIGBOX_FLEX + TOOLBOX_RIGHT + AD_LINKS_BOTTOM ;

templateConfigs[ NEWS_OVERTURE_RIGHT ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT + AD_LINKS_RIGHT + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS ;

templateConfigs[ NEWS_OVERTURE_RIGHT_VM ]  = BANNER_FLEX_TOP + BANNER_FLEX_TOP + + AD_LINKS_RIGHT + VM + TOOLBOX_LEFT  + TOOLBOX_RIGHT + TOOLBOX_BOTTOM + TEXTLINKS ;

templateConfigs[ ENLARGED_PHOTO ]  = SKY_RIGHT;

templateConfigs[ SIMPLE ]  = BANNER_FLEX_TOP + BIG_FLEX_RIGHT;

templateConfigs[ SIMPLE_NO_LB ]  = BIG_FLEX_RIGHT;

templateConfigs[ BOTTOM_ONLY ]  = BANNER_FLEX_BOTTOM;

templateConfigs[ LOCAL_PORTAL ]  = BANNER_FLEX_TOP + BANNER_FLEX_BOTTOM ;

templateConfigs[ WEATHER ] = BANNER_FLEX_TOP +  BIG_FLEX_RIGHT;

templateConfigs[ NO_ADS ] = 0;

// Make node-to-template assignments
var nodeConfigs = new AdConfigurations();
nodeConfigs.addConfiguration( 'metro/blackmen')
			.addTemplateAssignment ( new TemplateAssignment( BOTTOM_ONLY,1 ) );
nodeConfigs.addConfiguration( 'education')
			.addTemplateAssignment ( new TemplateAssignment( NEWS_VM,1 ) );
nodeConfigs.addConfiguration( 'travel' )
			.addTemplateAssignment ( new TemplateAssignment( NEWS_TRAVEL,1) );
nodeConfigs.addConfiguration( 'travel/jerseyshore' )
			.addTemplateAssignment ( new TemplateAssignment( NEWS_TRAVEL_NO_TRT,1) );
nodeConfigs.addConfiguration( 'artsandliving/travel/travelbytopic' )
			.addTemplateAssignment ( new TemplateAssignment( TRAVEL_BY_TOPIC,1) );
nodeConfigs.addConfiguration( 'health')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'print')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'weather')
			.addTemplateAssignment ( new TemplateAssignment( WEATHER,1 ) );
nodeConfigs.addConfiguration( 'realestate')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'artsandliving')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'artsandliving/foodanddining')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'business')
			.addTemplateAssignment ( new TemplateAssignment( NEWS_BUSINESS,1 ) );
nodeConfigs.addConfiguration( 'technology')
			.addTemplateAssignment ( new TemplateAssignment( NEWS_TECHNOLOGY,1 ) );
nodeConfigs.addConfiguration( 'metro')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'admin/classifieds/publicnotices')
			.addTemplateAssignment ( new TemplateAssignment( SIMPLE,1 ) );
nodeConfigs.addConfiguration( 'sports')
			.addTemplateAssignment ( new TemplateAssignment( NEWS_VM,1 ) );
nodeConfigs.addConfiguration( 'print/style')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'artsandliving')
			.addTemplateAssignment ( new TemplateAssignment( NEWS_VM,1 ) );
nodeConfigs.addConfiguration( 'politics/special/7')
			.addTemplateAssignment ( new TemplateAssignment( NEWS_NO_OVERTURE,1 ) );
nodeConfigs.addConfiguration( 'kidspost')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'opinion')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'world')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'politics')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'nation')
			.addTemplateAssignment ( new TemplateAssignment( NEWS,1 ) );
nodeConfigs.addConfiguration( 'localportal')
			.addTemplateAssignment ( new TemplateAssignment( LOCAL_PORTAL,1 ) );
nodeConfigs.addConfiguration( 'news/test')
			.addTemplateAssignment ( new TemplateAssignment( NEWS_TEST,1 ) );
			
if(thisNode=='media/politics' && commercialNode=='supertuesday/buyout')
{
	nodeConfigs.addConfiguration( 'media/politics')
			.addTemplateAssignment ( new TemplateAssignment( SIMPLE_NO_LB,1 ) );
}

// start of adTemplate assignments
if (!location.href.match('demoAds'))
{


// For this node, select a template
adTemplate = nodeConfigs.getTemplate( thisNode );






if(thisNode == 'mypost')
{
	adTemplate -= BANNER_FLEX_TOP
}

//
if(typeof commercialNode != 'undefined' && !commercialNode.match('artsandliving/foodanddining') )
{
	adTemplate += INLINE_ARTICLE_AD;
}



var pTechVideos = ['VI2008051401294','VI2008051302369','VI2008051302370']
for(var p=0;p<pTechVideos.length;p++)
{
	if(document.location.href.match(pTechVideos[p]))
	{
		adTemplate -= BANNER_FLEX_TOP;
	}
}



if ((location.href.match('channelthis') && commercialNode == 'artsandliving/blogs') && (now <= '11302359')){
commercialNode += '/channelthis';
}

// 'Faster Forward' blog fix
if (location.href.match('fasterforward') && commercialNode == 'technology/blogs'){
commercialNode = 'technology/blogs/fasterforward';
}

// 'Going Out Guru's' blog fix
if (location.href.match('goingoutgurus') && commercialNode == 'artsandliving/cityguide/blogs') { commercialNode = 'cityguide/blogs' }

// Post Tech Fix-RZ
if(typeof commercialNode != 'undefined' && commercialNode == 'blog/posttech')
{
	commercialNode = 'technology/blog/posttech';
}


if(commercialNode.match('politics/convention/chevron') && location.href.match('postpoliticstv'))
{
	adTemplate -= BIG_FLEX_RIGHT;
}

//11199,11102-DG,11876-RZ-rev#6
/*var revSciVal=(getCookie('rsi_segs'))?getCookie('rsi_segs'):'';
if(location.href.match('feignGov')){revSciVal+='J05531_10483;J05531_10173;J05531_10145'};
if(!(adTemplate & BANNER_FLEX_BOTTOM) && (estNowWithYear<='200912312359') && (revSciVal.match('J05531_10483')||revSciVal.match('J05531_10173')))
{
	adTemplate+=BANNER_FLEX_BOTTOM;	
}
//11371-DG,11876-RZ-rev#6
if((!(adTemplate & BANNER_FLEX_BOTTOM) && estNowWithYear <= '200912312359') && adOpsLocalFlag)
{
	adTemplate += BANNER_FLEX_BOTTOM;	
}*/

//14727-DG
if(!(adTemplate & BANNER_FLEX_BOTTOM) && estNowWithYear <= '201009302359')
{
	adTemplate += BANNER_FLEX_BOTTOM;	
}


//9949-HS-215690153,215651928,215651931,215651932,215651934,215651937,215651939 
if((estNowWithYear >= '200906170000' &&  estNowWithYear <= '200912312359') || (estNowWithYear >= '201001040000' &&  estNowWithYear <= '201012312359'))
{
	adTemplate += TOOLBOX_LEFT_180X31
}

}

//10946-MM
if(commercialNode=='education'){
	adTemplate += PORTAL_FEATUREBAR;
}


//11422-MB-218787198
if((commercialNode == 'cityguide/gogblog') && (estNowWithYear >= '200910260000' && estNowWithYear <= '200911012359')){
	adTemplate += SKY_LEFT;
}

//11/12/2009-ML
if(commercialNode.match('timespace') && (adTemplate & BANNER_FLEX_BOTTOM)) {
	adTemplate -= BANNER_FLEX_BOTTOM;
}

if(typeof urlCheck=='function' && urlCheck('noRightRail'))
{
	adTemplate -= TEXTLINKS;

	if((adTemplate & TILE_RIGHT_TOP)==TILE_RIGHT_TOP){
		adTemplate -= TILE_RIGHT_TOP;
	}
	if((adTemplate & TILE_RIGHT_TOP2)==TILE_RIGHT_TOP2){
		adTemplate -= TILE_RIGHT_TOP2;
	}
	if((adTemplate & TOP_JOBS)==TOP_JOBS){
		adTemplate -= TOP_JOBS;
	}
	if((adTemplate & VM)==VM){
		adTemplate -= VM;
	}
}

//14600-DG-rev#3
if(!(adTemplate & BIGBOX_RIGHT) && !(adTemplate & BLOG_INLINE_AD) && !(adTemplate & BLOG_INLINE_AD2) && (estNowWithYear <= '201012312359'))
{
adTemplate += BIGBOX_RIGHT + BLOG_INLINE_AD + BLOG_INLINE_AD2;	
}

//14838-DG,rev#3
if(typeof commercialNode != 'undefined' && !(adTemplate & BANNER_FLEX_BOTTOM) && estNowWithYear<='201011302359' && (typeof adOpsLocalFlag != 'undefined' && adOpsLocalFlag))
{
	adTemplate += BANNER_FLEX_BOTTOM;
}

if((typeof commercialNode != 'undefined' && commercialNode=='artsandliving/blogs/artspost') && !(adTemplate & SKY_LEFT) && (estNowWithYear >= '201011010000' && estNowWithYear <= '201011072359')){
	adTemplate += SKY_LEFT;
}

//15291-CR-226715344
if((typeof commercialNode != 'undefined' && commercialNode=='artsandliving/blogs/artspost') && !(adTemplate & SKY_LEFT) && (estNowWithYear >= '201101070000' && estNowWithYear <= '201101222359'))
{
	adTemplate += SKY_LEFT;
}


//12081-ST
/*if(typeof commercialNode != 'undefined' && commercialNode.match('newsmakers') && estNowWithYear<='200912312359' && (adTemplate & INLINE_ARTICLE_AD))
{
	adTemplate -= INLINE_ARTICLE_AD;
}*/

/*function bottomLBLever(commercialNode)
{
	var comm_exclusions = ['artsandliving','cityguide','jobs','cars','realestate','rentals','timespace'];
	var i = comm_exclusions.length;
	while(i--)
	{
		if(commercialNode.match(comm_exclusions[i]))
		{
			return false
		}
	}
	return true;

}

//11876-RZ
if(typeof commercialNode != 'undefined' && !(adTemplate & BANNER_FLEX_BOTTOM) && estNowWithYear<='200912312359' && bottomLBLever(commercialNode))
{
	adTemplate += BANNER_FLEX_BOTTOM;
}*/


//bottom leaderboard overrides
//11675-MB
if((commercialNode=='politics/fedpage' || commercialNode.match('holidayguide2009') || commercialNode.match('timespace') || commercialNode.match('newsmakers')) && (adTemplate & BANNER_FLEX_BOTTOM))  {
	adTemplate -= BANNER_FLEX_BOTTOM;
}

/*else
{
	adTemplate = 0;
}*/


if( location.href.match('allAds') )
{
	var adTemplate = 0;
	for(var a = 0; a < 24; a++)
	{
		adTemplate += 1 << a;
	}
}


if (document.location.href.indexOf("debugAdCode") != -1)
{
	document.writeln("<p>")
	document.writeln("Ad Template: " + adTemplate + '<br/>');
	document.writeln("Local User: " + adOpsLocalUser + '<br/>');
	//document.writeln("Content Category: " + contentCategories(commercialNode) + '<br/>');
	document.writeln("Flash Version: " + flashChecker() + '<br/>');
	document.writeln("ActiveXObject: " + activeXChecker() + '<br/>');
	document.writeln("<p>")
}

// Define objects
// TemplateAssignment associates a template with a frequency ( 0 <= frq <= 1 )
function TemplateAssignment( tmpl, frq )
{
  this.template = tmpl;
  this.frequency = ( ( frq >= 0 ) && ( frq <= 1 ) ) ? frq : 0 ;
}

// NodeTemplateAssignment collects TemplateAssignment objects for a specific node
function NodeTemplateAssignment ( node )
{
  this.node = node;
  this.templates = new Array();
  this.templateCount = 0;
  
  this.addTemplateAssignment = _addAdTemplateAssignment;
  this.selectTemplate = _adSelectTemplate;
}

// AdConfigurations collects NodeTemplateAssignments for the site
function AdConfigurations ()
{
  this.configs = new Array();
  this.length = 0;
  
  this.addConfiguration = _addAdConfiguration;
  this.getTemplate = _adGetTemplate;
}

function _adSelectTemplate()
{
  var base = 0;
  var rNum = Math.random();
  var rTemplate = 0;
  
  for (var count = 0; count < this.templates.length; count++)
  {
    if ( rNum < this.templates[count].frequency + base ) 
    {
      rTemplate = this.templates[count].template;
      break;
      //return this.templates[count].template;
    }
    else
    {
      base += this.templates[count].frequency;
    }
  }
  return rTemplate;
}

function _adGetTemplate ( node )
{
  adTemplate = DEFAULT_TEMPLATE;
  var base = 0;
  var bestMatch = 0;
  for ( var count = 0; count < this.length; count++ )
  {
    if ( this.configs[count].node == node )
    {
      adTemplate = this.configs[count].selectTemplate();
      break;
    }
    else if (( node.indexOf(this.configs[count].node) == 0 ) && ( this.configs[count].node.length > bestMatch ))
    {
      adTemplate = this.configs[count].selectTemplate();
      bestMatch = this.configs[count].node.length;
    }
  }
  return templateConfigs[adTemplate];
}

function _addAdTemplateAssignment( templateAssignment )
{
  this.templates[this.templateCount++] = templateAssignment;
  return this;
}

function _addAdConfiguration ( n )
{
  this.configs[this.length++] = new NodeTemplateAssignment (n);
  return this.configs[this.length - 1];
}

// JavaScript Document