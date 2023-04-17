var COLLECTOR_DOMAIN = "https://scores.sphdigital.com/";
var scoresClientid = "";

document.addEventListener("DOMContentLoaded", function(event) { 
    //device detector, credits to https://github.com/PoeHaH/devicedetector
});

var hsstExcludeElem = document.querySelectorAll('.cxactive-area div > div:not(.cx-curated) .pane-content .view-articles .view-content .story-headline a, .cxactive-area div > div:not(.cx-curated) .pane-content .view-articles .view-content .media-related a, .cxactive-area div > div.cx-curated.topfold .pane-content .view-articles .view-content .story-headline a, .cxactive-area div > div.cx-curated.topfold .pane-content .view-articles .view-content .media-related a, .cxactive-area div > div.cx-curated.botfold .pane-content .view-articles .view-content .story-headline a, .cxactive-area div > div.cx-curated.botfold .pane-content .view-articles .view-content .media-related a');
var hsstExcludeLinks = [];
var hsstExcludeId = "";
var docid = "";

for (var i = 0; i < hsstExcludeElem.length; i++) {
    hsstExcludeLinks.push("https://www.straitstimes.com" + hsstExcludeElem[i].getAttribute('href'));
    hsstExcludeLinks.push("http://www.straitstimes.com" + hsstExcludeElem[i].getAttribute('href'));
    docid = hsstExcludeElem[i].parentNode.parentNode.parentNode.parentNode.parentNode.className.split("article-");

    if(docid[1]!=undefined)
    {
        docid = docid[1].split(" ");
        if(hsstExcludeId == "")
        {
            hsstExcludeId = "st_" + docid[0];
        }
        else
        {
            hsstExcludeId += ",st_" + docid[0];
        }
    }
}

/*
var trackClick = function(category,label) {
	  gtag('event', 'Click', {
	    'event_category': category,
        'event_label': label,
        'event_action': 'Click'
	    });
	}
*/
function trackClick(category, label){
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		'event':'custom_event', //DO NOT CHANGE
		'eventCategory':category,
		'eventAction':'Click',
		'eventLabel':label
	});
}

function generate_recommendations() {
    var articleId = _data.articleid;
    var gaId = getCookie("_ga");
    var sessionId = getCookie("sessionId");
    
    //if (articleId === null || articleId === "") {
        //console.log("article is is empty");
    //} else {
        // getting recommendations from rec api
        
       // console.log("publication is::"+document.getElementById('article-recommendations').getAttribute('pub'));
        var pub="",n="",thumb="",rec="",html="";
        var len=document.getElementsByClassName('article-recommendations').length;
        
        if(len>=1)
        	{
        		for(var l=0;l<len;l++)
        			{
        				var obj=document.getElementsByClassName('article-recommendations')[l];
        				//console.log("hidden name::"+'hidRecDatas'+l);
        				var hidObjForFeedback=document.getElementById('hidRecDatas'+l);
        				//console.log("hidden obj::"+hidObjForFeedback);
        				//....commenting following line so that widget will not appear on cached ST pages......
	    		      createWidegt(COLLECTOR_DOMAIN,obj,articleId,gaId,hidObjForFeedback)
        			}
        	}
      
    //}
    track_recommendation_click();
}
function createWidegt(COLLECTOR_DOMAIN,obj,articleId,gaId,hidObjForFeedback)
{
	 var domainName = document.domain;
	 var pub="",n=4,thumb=0,rec="",engine=0,print=0;
	 var html = "";
	 var article_title = _data.title;
	 n=obj.getAttribute('n');
	 //console.log(obj);
	 
	 //available tweaking params
	 var dtmin = new Date();
	 dtmin.setDate(dtmin.getDate() - 1);
	 dtmin = dtmin.toISOString().substr(0, 10); //YYYY-MM-DD
	 
	 var dtmax="", prem="", pagelevel="", includeid="", excludeid="";
     var fullvisitorid=scoresClientid; //ga clientId
     var device=getUserDevice(); //ga client device
     var currtime = new Date().getTime(); //current timestamp
     
     engine=obj.getAttribute('engine');
     var widgetno = engine;		    
			
     //API call to SPH Recommendation widget
	 pub=obj.getAttribute('pub');
	   
	if(engine!="6" && engine!="7") //homepage thumbnail filter alteration - forced to 0 instead of using widget's setting
	{
		thumb=obj.getAttribute('thumb');
	}
    
    rec=obj.getAttribute('rec');
	    
	 //console.log("Called  create widget ::calling  engine::"+engine);
     //console.log("hidden::"+hidObjForFeedback)
     /*if(domainName.search("tnp")!=-1)
        pub="tnp";
        */
    var recommendationList={};
    //........reading json for category...........
    var catUrl=COLLECTOR_DOMAIN+"json/categories.json";
    var catJson={};
    var parent1={};
    var parent2={};
    var chapter1 = _data.chapter1;
    var chapter2 = _data.chapter2;
    var chapter3 = _data.chapter3;
	pagelevel= chapter1; //grab article's pagelevel    
	   
	    
	//console.log("Cat Url::"+catUrl);
	jQuery.getJSON(catUrl, function(data) {
	
		if(chapter1!="" && chapter2=="" && chapter3=="") //Maine category where only chapter1 present
	    {
	    		catJson=data[0]["categories"][0].filter(p => p.name == chapter1);
	    		
	    }
	    if(chapter1!="" && chapter2!="" && chapter3=="") //Chapter1 and Chapter2 present
		{
			catJson=data[0]["categories"][0].filter(p => (p.name == chapter2 && p.parent==chapter1));
			parent1=data[0]["categories"][0].filter(p => p.name == chapter1);
		}
	    if(chapter1!="" && chapter2!="" && chapter3!="") // Chapter1 , Chapter2 and Chapter3 present
		{
			catJson=data[0]["categories"][0].filter(p =>(p.name == chapter3 && p.parent==chapter2));
			parent1=data[0]["categories"][0].filter(p => (p.name == chapter2 && p.parent==chapter1));
			parent2=data[0]["categories"][0].filter(p => p.name == chapter1);
		}
	    
	    var str="";
	    if(parent2[0]!=null && parent2[0].name!=null)
		{
	    	var level=0;
	    	level=parseInt(parent2[0].level)+1;
			str=parent2[0].name+"_"+parent2[0].tid+"_level"+level;
		}
	    if(parent1[0]!=null && parent1[0].name!=null)
		{
	    	var level=0;
	    	level=parseInt(parent1[0].level)+1;
			if(str!="")
				str +="-"+parent1[0].name+"_"+parent1[0].tid+"_level"+level;
			else
				str=parent1[0].name+"_"+parent1[0].tid+"_level"+level;
		}
	    if(catJson[0]!=null && catJson[0].name!=null)
	    {
            var level=0;

	    	level=parseInt(catJson[0].level)+1;
	    		if(str!="")
	    			str +="-"+catJson[0].name+"_"+catJson[0].tid+"_level"+level;
	    		else
                    str=catJson[0].name+"_"+catJson[0].tid+"_level"+level;
        }
        
		
		var recommendationUrl = COLLECTOR_DOMAIN + "article/"+pub+"_"+articleId+"?userId="+gaId+"&pub="+pub+"&n="+n+"&thumb="+thumb+"&rec="+rec+"&section="+str+"&fullvisitorid="+fullvisitorid+"&currtime="+currtime;
		recommendationUrl = recommendationUrl + "&includeid="+includeid+"&prem="+prem+"&dtmax="+dtmax+"&device="+device;	
	    
		var articleTmpl = COLLECTOR_DOMAIN + "js/rec-st-template.html?s23wewert";
		
		switch(engine){
            case "5": //More From ST widget - HSRandom
            	excludeid = pub+"_"+articleId;
				articleTmpl = COLLECTOR_DOMAIN + "js/rec-hsrandom-st-template.html?s23wewert";
				recommendationUrl = recommendationUrl + "&engine=4&rand=1&dtmin=&pagelevel="+pagelevel+"&excludeid="+excludeid+"&print="+print; //random articles
				break;
            case "6": //ST Homepage
                excludeid = hsstExcludeId;
                print = -1; //not print
                recommendationUrl = recommendationUrl + "&engine=4&rand=&dtmin="+dtmin+"&pagelevel=Index&excludeid="+excludeid+"&print="+print; //freshness of >48 hours
                break;
            case "7": //Global Homepage
                excludeid = hsstExcludeId;
                print = -1; //not print
                recommendationUrl = recommendationUrl + "&engine=4&rand=&dtmin="+dtmin+"&pagelevel=Global_Index&excludeid="+excludeid+"&print="+print; //freshness of >48 hours
				break;
			default:
				excludeid = pub+"_"+articleId;
				recommendationUrl = recommendationUrl + "&engine=4&rand=&dtmin=&pagelevel="+pagelevel+"&excludeid="+excludeid+"&print="+print;
				break;
		}
	
		// calling recommender 2 times if fails first time
	    jQuery.getJSON(recommendationUrl, function(data) {
	         if (data.statusCodeValue === 200) {
	             jQuery.get(articleTmpl, function(template, textStatus, jqXhr) {
	             	if(hidObjForFeedback!=null)
	             	{
	             		hidObjForFeedback.value=JSON.stringify(data);
	             		recommendationList=JSON.stringify(data);
	             		
	             		//console.log("response string::"+recommendationList);
	             		//console.log("recommends::"+data.body.recommends.length);
	             	}
	             	//console.log(data.body);
	             	if(data.body.recommends != null ) {
                        if(widgetno=="6") 
                        {
                            html = renderHSSTHome(data, 'CxvCurateHome-HS');
                        }
                        else if(widgetno=="7") 
                        {
                            html = renderHSSTHome(data, 'CxvCurateGlobal-HS');
                        }
                        else
                        {
                            html = Mustache.to_html(template, data);
                        }
                        
             		}
	             	else{
	             		html = "";
	             	}
	                
	                jQuery(obj).prepend(html);
	                 
	             });
	         }
	     });
     
     
    });
    
    return html;
		     
}
function track_recommendation_click() {
	//var pub=obj.getAttribute('pub');
	var site_Id=document.domain;
    jQuery(document).on("click", ".story-card-d", function() {
        var document_id = jQuery(this).find("input").val();
        var category_value = _data.chapter1;
        //console.log("Document id :" + document_id);
        //console.log(category_value);
        add_impression(getCookie("userId"), "widget_click", document_id, getCookie("sessionId"), site_Id, category_value); });
}

function add_impression(user_id, event_type, content_id, UUID, site_Id, category) {
   // console.log("user id generated is : " + user_id);
    var ga_id = getCookie("_ga");
   // console.log("GA id is : " + ga_id);
    var lotame_id = getData();
    var device = getMobileInfo();
    var browser = getBrowserInfo();
    //console.log("Running on " + browser + " " + device);
    var json = {
        "event": event_type,
        "userId": user_id,
        "gaId": ga_id,
        "lotameId": lotame_id,
        "documentId": content_id,
        "sessionId": UUID,
        "siteId": site_Id,
        "category": category,
        "deviceType":device,
        "browser":browser
    };
  /*  jQuery.ajax({
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        mimeType: "json",
        url: COLLECTOR_DOMAIN + "log/",
        data: JSON.stringify(json),
        async: true,
        fail: function() {
            console.log("log failed(" + event_type + ")");
        }
    });*/

}

function get_user_status() {
    var fingerprint = new Fingerprint({screen_resolution: true}).get();
    var articleId = _data.articleid;
    var category_type = _data.chapter1;
    //console.log("Article Id is : " + articleId);

    var scripts = document.getElementsByTagName("script");
    var len = scripts.length;
    var absoluteAddress;
    for (i = 0; i < len; i++) {
        if (scripts[i].src.search("recommendations.js") > 0 && scripts[i].src.lastIndexOf("/") >= 0) {
            absoluteAddress = scripts[i].src.substring(0);
            break;
        }
    }
    //console.log("Absolute address is : " + absoluteAddress);
    if (absoluteAddress) {
        var params = getQueryParameters(absoluteAddress.replace(/^.*\?/, ""));
    }
    var siteId = document.domain;//obj.getAttribute('pub');
    
    //console.log("Site Id is : " + siteId);

    var UUID;
    var userId= getCookie("userId");
    //console.log("User id : " + userId);
    if(userId !== ""){

    } else {
        setCookie('userId', fingerprint, 30);
    }

    if (getCookie('sessionId') !== "") {

    } else {
        UUID = generateUUID();
        //console.log(UUID);
        setNonPersistentCookie("sessionId", UUID);
    }

    //console.log(userId);
    //console.log(getCookie("sessionId"));
    add_impression(getCookie('userId'), "read_article", articleId, getCookie("sessionId"), siteId, category_type);
    active = true;

    generate_recommendations();
}

function load_script(url, callback) {
    var jq = document.createElement("script");
    jq.src = url;
    if (callback) jq.onload = callback;
    document.getElementsByTagName("head")[0].appendChild(jq);
}

function getQueryParameters(query) {
    var args = query.split("&");
    var params = {};
    var pair;
    var key;
    var value;

    function decode(string) {
        return decodeURIComponent(string || "").replace("+", " ");
    }

    for (var i = 0; i < args.length; i++) {
        pair = args[i].split("=");
        key = decode(pair[0]);
        value = decode(pair[1]);
        params[key] = value;
    }
    return params;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    //console.log("Setting cookie : " + cname);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setNonPersistentCookie(cname, cvalue) {
    var expires = "expires=" + 0;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function render_recommendations(clientid="") {
	scoresClientid = clientid;
    //console.log("Starting recommendations");
    jQuery(document).ready(function() {
        load_script(COLLECTOR_DOMAIN + "js/mustache.min.js");
        //console.log("calling finger js");
        load_script(COLLECTOR_DOMAIN + "js/fingerprint.js", get_user_status);

    });
}

function getData() {
    if(typeof(ccauds) !== "undefined"){
        var user_id = ccauds.Profile.pid;
        return user_id;
    }
    jQuery.getScript( "https://ad.crwdcntrl.net/5/c=4343/pe=y/var=ccauds2", function( data, textStatus, jqxhr ) {
        user_id = ccauds2.Profile.pid;
        //console.log("User id is :" + user_id);
    });
    return user_id;
}

function getBrowserInfo(){
    return navigator.sayswho= (function(){
        var ua= navigator.userAgent, tem,
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();
}

function getMobileInfo() {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if(isMobile.any()) {
        return "mobile";
    } else {
        return "desktop";
    }
}

function getUserDevice()
{
    //source: https://raw.githubusercontent.com/PoeHaH/devicedetector/master/devicedetector-min.js
    var deviceDetector=function(){var b=navigator.userAgent.toLowerCase(),a=function(a){void 0!==a&&(b=a.toLowerCase());return/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(b)?"tablet":/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(b)?"phone":"desktop"};return{device:a(),detect:a,isMobile:"desktop"!=a()?!0:!1,userAgent:b}}();
    var userDevice = deviceDetector.device;

    if(userDevice == 'desktop' || userDevice == 'tablet')
    {
        return userDevice;
    }
    else if(userDevice == 'phone')
    {
        userDevice = "mobile";
    }

    return userDevice;
}

function renderHSSTHome(data,hometype)
{
    var widgetStr = "";
    var strBigBlock = "";
    var strSmallBlock = "";
    var strPremium = '<div class="paid-premium st-flag-1"><a href="//str.sg/whatispremium" title="What' + "'s" + ' Premium? Click to find out.">premium</a></div>';
    var idx = 0;
    var counterItem = 1;
    var formattedHeader = "";
    var singlequote = "'";

    while(data.body.recommends[idx]!=undefined && counterItem <= 9)
    {
        if(!hsstDuplicateTop(data.body.recommends[idx].url))
        {
            formattedHeader = data.body.recommends[idx].headlineesp.replace(/"/g,"&quot;");
            formattedHeader = data.body.recommends[idx].headlineesp.replace(/'/g,"&apos;");
            
            if(idx <=5 )
            {
                //big block
                strBigBlock = strBigBlock + '<div class="panel-pane pane-views-panes pane-articles-topstory-nodequeue col-lg-3 col-md-3 col-sm-3 col-xs-12 image-full background-whiten small-headline classy-panel-styles-pane ';

                if(idx==0)
                {
                    strBigBlock = strBigBlock + "firstOfRow no-border ";
                }
                
                strBigBlock = strBigBlock + 'hsst-curref"><div class="pane-content"><div class="view view-articles view-id-articles"><div class="view-content"><div class="views-row-odd views-row-first views-row-last media " style="height: 330px;"><div class="pull-left"><div class="media-single"><ul><li><div id="" class="file file-image file-image-jpeg"><div class="content"><div class="borealis image-style-retina_large borealis-js borealis-wrapper loaded"><img class="borealis image-style-retina_large borealis-js img-responsive" typeof="foaf:Image" src="' + data.body.recommends[idx].image_url;
                strBigBlock = strBigBlock + '" data-locked="1" width="280" height="186.6666666666676"></div></div></div></li></ul></div></div><div class="media-body ">';

                if(data.body.recommends[idx].paid == "\"2\"" || data.body.recommends[idx].paid == "2")
                {
                    strBigBlock = strBigBlock + strPremium;
                }

                strBigBlock = strBigBlock + '<div class="media-heading "><h3 class="story-title"><span class="story-headline"><a href="' + data.body.recommends[idx].url;
                strBigBlock = strBigBlock + '" onclick="trackClick(' + singlequote + hometype + singlequote + ',' + singlequote + formattedHeader + singlequote + '); return true;">' + formattedHeader + '</a></span></h3></div></div><div class="media-footer has_media"><div class="story-assets"></div></div><a class="block-link" href="';
                strBigBlock = strBigBlock + data.body.recommends[idx].url + '" title="' + formattedHeader + '" onclick="trackClick(' + singlequote + hometype + singlequote + ',' + singlequote + formattedHeader + singlequote + '); return true;" ></a></div></div></div></div></div>';
            }
            else{
                //small block
                strSmallBlock = strSmallBlock + '<div class="';

                if((idx + 1) % 2 == 0)
                {
                    strSmallBlock = strSmallBlock + "views-row-even ";
                }
                else
                {
                    strSmallBlock = strSmallBlock + "views-row-odd ";
                }

                if(idx == 6)
                {
                    strSmallBlock = strSmallBlock + "views-row-first ";
                }
                else if(idx == 8)
                {
                    strSmallBlock = strSmallBlock + "views-row-last ";
                }
                
                strSmallBlock = strSmallBlock + 'media "><div class="media-body ">';

                if(data.body.recommends[idx].paid == "\"2\"" || data.body.recommends[idx].paid == "2")
                {
                    strSmallBlock = strSmallBlock + strPremium;
                }
                
                strSmallBlock = strSmallBlock + '<div class="media-heading "><h3 class="story-title"><span class="story-headline"><a href="' + data.body.recommends[idx].url + '" onclick="trackClick(' + singlequote + hometype + singlequote + ',' + singlequote + formattedHeader + singlequote + '); return true;">' + formattedHeader;
                strSmallBlock = strSmallBlock + '</a></span></h3></div></div><div class="media-footer has_media"><div class="story-assets"></div></div><a class="block-link" href="' + data.body.recommends[idx].url;
                strSmallBlock = strSmallBlock + '" title="' + formattedHeader + '" onclick="trackClick(' + singlequote + hometype + singlequote + ',' + singlequote + formattedHeader + singlequote + '); return true;"></a></div>';
            }
            counterItem = counterItem + 1;
        }

        idx = idx + 1;
    }

    if(strBigBlock!="" && strSmallBlock!="")
    {
        widgetStr = strBigBlock + '<div class="OUTBRAIN" data-src="http://www.straitstimes.com" data-widget-id="MB_1" data-ob-template="StraitsTimes"></div><script type="text/javascript" async="async" src="https://widgets.outbrain.com/outbrain.js"></script><div class="panel-pane pane-views-panes pane-articles-topstory-nodequeue col-lg-3 col-md-3 col-sm-3 col-xs-12 image-full background-whiten smaller-headline classy-panel-styles-pane hsst-curref"><div class="pane-content"><div class="view view-articles view-id-articles"><div class="view-content">';
        widgetStr = widgetStr + strSmallBlock + '</div></div></div></div>';
    }

    return widgetStr;
}

function hsstDuplicateTop(item)
{ 
    if(hsstExcludeLinks.length > 0)
    {
        if(hsstExcludeLinks.indexOf(item) == -1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        return false;
    }
}

ga(function(tracker) {
    render_recommendations(tracker.get('clientId'));
});

