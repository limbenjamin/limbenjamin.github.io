/* START: /wp-srv/js/utilsStatic.js */
function showContentDown(pid,cid,tweak) {
	showContentOuterBottomLeft(pid,cid,tweak);
}
function showContentUp(pid,cid,tweak) {
	showContentOuterTopLeft(pid,cid,tweak);
}
function showContentLeft(pid,cid,tweak) {
	showContentLeftTop(pid,cid,tweak);
}
function showContentRight(pid,cid,tweak) {
	showContentRightTop(pid,cid,tweak);
}
function showContentDownButOver(pid,cid,tweak) {
	showContentInnerTopLeft(pid,cid,tweak);
}
function showContentThisWay(pid,cid,tweak,position) {
	if ( document.getElementById(pid) && document.getElementById(cid) ) {
		if (!tweak) tweak = {x:0,y:0} ;
		var parent = document.getElementById(pid);
		var child = document.getElementById(cid);
		child.style.position = 'absolute';
		child.className = 'show';

		switch(position) {
			case 'InnerTopLeft': {
				child.style.left = findPosition(pid).x + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + tweak.y + 'px' ;
				break;
			}	 
			case 'InnerTopRight': {
				child.style.left = findPosition(pid).x + (parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + tweak.y + 'px' ;
				break;
			}
			case 'InnerTopCenter': {
				child.style.left = findPosition(pid).x + 0.5*(parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + tweak.y + 'px' ;
				break;
			}
			case 'InnerBottomLeft': {
				child.style.left = findPosition(pid).x + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + ( parent.offsetHeight - child.offsetHeight ) + tweak.y + 'px' ;
				break;
			}
			case 'InnerBottomCenter': {
				child.style.left = findPosition(pid).x + 0.5*(parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + ( parent.offsetHeight - child.offsetHeight ) + tweak.y + 'px' ;
				break;
			}
			case 'InnerBottomRight': {
				child.style.left = findPosition(pid).x + (parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + ( parent.offsetHeight - child.offsetHeight ) + tweak.y + 'px' ;
				break;
			}
			case 'OnTop': {
				child.style.left = findPosition(pid).x + 0.5*(parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + 0.5*( parent.offsetHeight - child.offsetHeight ) + tweak.y + 'px' ;
				break;
			}
			case 'OuterTopLeft': {
				child.style.left = findPosition(pid).x + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y-child.offsetHeight + tweak.y + 'px' ;
				break;
			}
			case 'OuterTopCenter': {
				child.style.left = findPosition(pid).x+ 0.5*(parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y-child.offsetHeight + tweak.y + 'px' ;
				break;
			}
			case 'OuterTopRight': {
				child.style.left = findPosition(pid).x+ (parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y-child.offsetHeight + tweak.y + 'px' ;
				break;
			}
			case 'OuterBottomLeft': {
				child.style.left = findPosition(pid).x + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y+parent.offsetHeight + tweak.y + 'px' ;
				break;
			}
			case 'OuterBottomCenter': {
				child.style.left = findPosition(pid).x + 0.5*(parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y+parent.offsetHeight + tweak.y + 'px' ;
				break;
			}
			case 'OuterBottomRight': {
				child.style.left = findPosition(pid).x + (parent.offsetWidth - child.offsetWidth) + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y+parent.offsetHeight + tweak.y + 'px' ;
				break;
			}
			case 'LeftTop': {
				child.style.left = findPosition(pid).x-child.offsetWidth + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + tweak.y + 'px' ;
				break;
			}
			case 'LeftMiddle': {
				child.style.left = findPosition(pid).x-child.offsetWidth + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + 0.5*(parent.offsetHeight - child.offsetHeight) + tweak.y + 'px' ;
				break;
			}
			case 'LeftBottom': {
				child.style.left = findPosition(pid).x-child.offsetWidth + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + (parent.offsetHeight - child.offsetHeight) + tweak.y + 'px' ;
				break;
			}
			case 'RightTop': {
				child.style.left = findPosition(pid).x+parent.offsetWidth + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + tweak.y + 'px' ;
				break;
			}
			case 'RightMiddle': {
				child.style.left = findPosition(pid).x+parent.offsetWidth + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + 0.5*(parent.offsetHeight - child.offsetHeight) + tweak.y + 'px' ;
				break;
			}
			case 'RightBottom': {
				child.style.left = findPosition(pid).x+parent.offsetWidth + tweak.x + 'px' ;
				child.style.top = findPosition(pid).y + (parent.offsetHeight - child.offsetHeight) + tweak.y + 'px' ;
				break;
			}
			default: {
				// do nothing
			}
		}

		child.style.zIndex = '10000';
	}
}
function showContentInnerTopLeft(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'InnerTopLeft');
}
function showContentInnerTopRight(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'InnerTopRight');
}
function showContentInnerTopCenter(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'InnerTopCenter');
}
function showContentInnerBottomLeft(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'InnerBottomLeft');
}
function showContentInnerBottomCenter(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'InnerBottomCenter');
}
function showContentInnerBottomRight(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'InnerBottomRight');
}
function showContentOnTop(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'OnTop');
}
function showContentOuterTopLeft(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'OuterTopLeft');
}
function showContentOuterTopCenter(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'OuterTopCenter');
}
function showContentOuterTopRight(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'OuterTopRight');
}
function showContentOuterBottomLeft(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'OuterBottomLeft');
}
function showContentOuterBottomCenter(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'OuterBottomCenter');
}
function showContentOuterBottomRight(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'OuterBottomRight');
}
function showContentLeftTop(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'LeftTop');
}
function showContentLeftMiddle(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'LeftMiddle');
}
function showContentLeftBottom(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'LeftBottom');
}
function showContentRightTop(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'RightTop');
}
function showContentRightMiddle(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'RightMiddle');
}
function showContentRightBottom(pid,cid,tweak) {
	showContentThisWay(pid,cid,tweak,'RightBottom');
}
function showContent(id) {
	if ( document.getElementById(id) ) {
		var element = document.getElementById(id);
		element.className = 'show';
	}
}
function getValue(name) {
	var re = new RegExp("[&\?]"+name+"=([^&]+)&?","g") ;
	if (location.search.match(re)) return RegExp.$1 ;
	else return "" ;
}
function getUrlParam(id, defaultValue) {
	var x = decodeURIComponent(getValue(id));
	if (x == '') {
		return defaultValue;
	}
	return x;
}
function replaceTheLastCharacter(id,character) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		e.innerHTML = e.innerHTML.replace(/.$/,character)
	}
}
function replaceTheFirstCharacter(id,character) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		e.innerHTML = e.innerHTML.replace(/^./,character)
	}
}
function replaceLastInstanceOf(id,search,replace) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		var temp = "" + e.innerHTML;
		if (temp.lastIndexOf(search)>-1) {
			var pos = temp.indexOf(search) ;
			temp = "" + (temp.substring(0, pos) + replace +
			temp.substring((pos + search.length), temp.length)) ;
		}
		e.innerHTML = temp ;
	}
}
function findPosition(id) {
	var pos = {x:0,y:0} ;
	if ( document.getElementById(id) ) {
		pos = findPositionByElement( document.getElementById(id) ) ;
	}
	return pos ;
}
function findPositionByElement(e) {
	var left = 0 ;
	var top = 0 ;
	if (e.offsetParent) {
		left = e.offsetLeft ;
		top = e.offsetTop ;
		while ( e = e.offsetParent ) {
			left += e.offsetLeft ;
			top += e.offsetTop ;
		}
	}
	return {x:left,y:top} ;
}
function moveContentBelow(pid,cid) {
	if ( document.getElementById(pid) && document.getElementById(cid) ) {
		var parent = document.getElementById(pid);
		var child = document.getElementById(cid);
		child.style.position = 'absolute';
		child.style.top = findPosition(pid).y+parent.offsetHeight + 'px';
		child.style.left = findPosition(pid).x + 'px';
		child.style.zIndex = '10000';
	}
}
function moveContentAbove(pid,cid) {
	if ( document.getElementById(pid) && document.getElementById(cid) ) {
		var parent = document.getElementById(pid);
		var child = document.getElementById(cid);
		child.style.position = 'absolute';
		child.style.top = findPosition(pid).y-child.offsetHeight + 'px';
		child.style.left = findPosition(pid).x + 'px';
		child.style.zIndex = '10000';
	}
}
function moveContentToTheRight(pid,cid) {
	if ( document.getElementById(pid) && document.getElementById(cid) ) {
		var parent = document.getElementById(pid);
		var child = document.getElementById(cid);
		child.style.position = 'absolute';
		child.style.top = findPosition(pid).y + 'px';
		child.style.left = findPosition(pid).x+parent.offsetWidth + 'px';
		child.style.zIndex = '10000';
	}
}
function moveContentToTheLeft(pid,cid) {
	if ( document.getElementById(pid) && document.getElementById(cid) ) {
		var parent = document.getElementById(pid);
		var child = document.getElementById(cid);
		child.style.position = 'absolute';
		child.style.top = findPosition(pid).y + 'px';
		child.style.left = findPosition(pid).x-child.offsetWidth + 'px';
		child.style.zIndex = '10000';
	}
}
function moveContentOnTopOf(pid,cid) {
	if ( document.getElementById(pid) && document.getElementById(cid) ) {
		var parent = document.getElementById(pid);
		var child = document.getElementById(cid);
		child.style.position = 'absolute';
		child.style.top = findPosition(pid).y + 'px';
		child.style.left = findPosition(pid).x + 'px';
		child.style.zIndex = '10000';
	}
}
function shiftDown(id,tweak) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		var top = e.style.top.replace('px','')/1 ;
		e.style.top = (top + tweak)/1 + 'px' ;
	}
}
function shiftUp(id,tweak) {
	shiftDown(id,-1*tweak) ;
}
function shiftLeft(id,tweak) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		var left = e.style.left.replace('px','')/1 ;
		e.style.left = (left - tweak)/1 + 'px' ;
	}
}
function shiftRight(id,tweak) {
	shiftLeft(id,-1*tweak) ;
}
function on(e) {
	e.className = 'on' ;
}
function off(e) {
	e.className = 'off' ;
}
function showContent(id) {
	if ( document.getElementById(id) ) {
		var element = document.getElementById(id);
		replaceClassName(id,'hide','show');
	}
}
function hideContent(id) {
	if ( document.getElementById(id) ) {
		var element = document.getElementById(id);
		replaceClassName(id,'show','hide');
	}
}
function toggleDisplay(id) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id);
		var className = e.className
		if ( className.match(/\bhide\b/) ) {
			replaceClassName(id,'hide','show');
		} else if ( className.match(/\bshow\b/) ) {
			replaceClassName(id,'show','hide');
		}
	}
}
function setClassName(id,name) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		e.className = name;
	}
}
var tags_visibility = new Array(); // global because showTags needs it, too
function hideTags(tag,parent_id) {
	tags_visibility = new Array();
	var parent = document ;
	if ( parent_id && document.getElementById( parent_id ) ) {
		parent = document.getElementById( parent_id ) ;
	}

	var tags = parent.getElementsByTagName(tag) ;
	for (var i=0; i<tags.length; i++) {
		var tag = tags[i];
		tags_visibility[i] = tag.style.visibility ;
		tag.style.visibility = 'hidden' ;
	}
}
function showTags(tag,parent_id) {
/*
	var parent = document ;
	if ( parent_id && document.getElementById( parent_id ) ) {
		parent = document.getElementById( parent_id ) ;
	}

	var tags = parent.getElementsByTagName(tag) ;
	for (var i=0; i<tags.length; i++) {
		var tag = tags[i];
		tag.style.visibility = tags_visibility[i] ;
	}

*/
}
function replaceClassName(id,search,replace) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		var classes = e.className.split(/\s+/);
		var new_classes = '';
		var found_it = false ;
		for (var i=0; i<classes.length; i++) {
			if ( classes[i] == search ) {
				classes[i] = replace ;
				found_it = true ;
			}
			new_classes += classes[i] ;
			if ( i != classes.length -1 ) new_classes += ' ' ;
		}
		if ( !found_it ) {
			if ( new_classes )
				new_classes += ' ' ;
			new_classes += replace ;
		}
		e.className = new_classes ;
	}
}
function setHref(id,href) {
	if ( document.getElementById(id) ) {
		var e = document.getElementById(id) ;
		e.href = href ;
	}
}
function getUrlFromId(id,page,ext) {
	var url = '' ;
	page = ( page ) ? '_'+page : '' ;
	ext  = ( ext  ) ? ext : 'html' ;

	if ( id.match(/^[A-Z]{2,2}\d{4,4}\d{2,2}\d{2,2}\d+$/) ) {
		var m = id.match(/^([A-Z]{2,2})(\d{4,4})(\d{2,2})(\d{2,2})\d+$/) ;
		var type = getTypeFromStub(m[1]).toLowerCase();
		url = '/wp-dyn/content/'+type+'/'+m[2]+'/'+m[3]+'/'+m[4]+'/'+id+page+'.'+ext ;
	}
	return url ;
}
function getUrlStubFromId(id,page,ext) {
	var url = getUrlFromId(id,page,ext);
	if ( url.indexOf('/wp-dyn/content/') == 0 ) {
		url = url.substring(15);
	}
	return url ;
}
function getTypeFromStub(stub) {
	switch ( stub ) {
		case 'AR': return 'Article' ;
		case 'BL': return 'Blog' ;
		case 'DI': return 'Discussion' ;
		case 'AU': return 'Audio' ;
		case 'GA': return 'Gallery' ;
		case 'GR': return 'Graphic' ;
		case 'PA': return 'Panorama' ;
		case 'PH': return 'Photo' ;
		case 'VI': return 'Video' ;
	}
}
// start: document enhancement
document.getElementsByClassName = function(target_class) {
	var target_elements = new Array();
	var elements = document.getElementsByTagName("*");
	for (var i = 0;i < elements.length;i++) {
		// className of SVG objects on page from Evri are objects, not strings
		// so check for string before calling indexOf
		if (typeof elements[i].className === "string") {
			if (elements[i].className.indexOf(" ") >= 0) {
				var classes = elements[i].className.split(" ");
				for (var j = 0;j < classes.length;j++) {
					if (classes[j] == target_class) {
						target_elements.push(elements[i]);
					}
				}
			} else if (elements[i].className == target_class) {
				target_elements.push(elements[i]);
			}
		}
	}
	return target_elements;
}
// end: document enhancement
function getTallest(ids) {
	var tallest = 0 ;
	for ( var i=0; i < ids.length; i++ ) {
		var id = ids[i] ;
		if ( document.getElementById(id) ) {
			var h = document.getElementById(id).offsetHeight ;
			if ( h > tallest ) tallest = h ;
		}
	}
	return tallest ;
}
function setHeightsToTallest(ids) {
	var h = getTallest( ids ) + 'px' ;
	for ( var i=0; i < ids.length; i++ ) {
		var id = ids[i] ;
		if ( document.getElementById(id) ) {
			document.getElementById(id).style.height = h ;
		}
	}
}
function getElementsFromIds(ids) {
	var elements = new Array();
	for ( var i=0; i<ids.length; i++ ) {
		var id = ids[i] ;
		if ( document.getElementById(id) ) {
			elements[elements.length] = ( document.getElementById(id) ) ? document.getElementById(id) : null ;
		}
	}
	return elements ;
}	
function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}
function Layout(parent_id,main_id,id_list) {

	this.parent_id = parent_id ;
	this.parent = ( document.getElementById(this.parent_id) ) ? document.getElementById(this.parent_id) : null ;

	this.main_id = main_id ;
	this.main = ( document.getElementById(this.main_id) ) ? document.getElementById(this.main_id) : null ;

	this.id_list = id_list ;
	this.list = getElementsFromIds(this.id_list) ;

	this.arrangeContent = function() {
		if ( this.parent && this.main ) {
			var node = this.main ;
			var before_main = true ;
			for ( var i=0; i<this.list.length; i++) {
				var sibling = this.list[i] ;
				if ( sibling && sibling != this.main ) {
					if ( sibling ) {
						if ( before_main ) {
							(this.parent).insertBefore( sibling,node ) ;
						} else {
							insertAfter( this.parent,sibling,node ) ;
							node = node.nextSibling;
						}
					}
				} else {
					before_main = false ;
				}
			}
		}
	}
}
function getDiscussionKicker(pubtime) {
	var output = '' ;

	var months = new Array('Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.') ;
	var days = new Array('Sun.','Mon.','Tues.','Wed.','Thur.','Fri.','Sat.') ;
	var one_minute = 60*1000 ;
	var one_hour = 60*one_minute ;
	var one_day = 24*one_hour ;

	var now = ( typeof getWPServerTimeAsDate == 'function' ) ? getWPServerTimeAsDate() : new Date() ;
	var pubtime = new Date(pubtime);
	var month = months[pubtime.getMonth()];
	var day = days[pubtime.getDay()];
	var date = pubtime.getDate();
	var hour = pubtime.getHours() ;
	hour = ( hour <= 12 ) ? ((hour==0) ? 12 : hour) : hour-12 ;
	var minute = pubtime.getMinutes() ;
	hour += ( minute > 0 ) ? ( (minute<10) ? ':0'+minute : ':'+minute ) : '' ;
	var ampm = ( pubtime.getHours() <= 11 ) ? 'a.m.' : 'p.m.' ;

	var hhour = (pubtime.getTime()-now.getTime())/one_hour ;
	var dday = (pubtime.getTime()-now.getTime())/one_day ;

	if ( dday >= 7 ) {
		output += 'Q&amp;A, '+day+', '+month+' '+date+', '+hour+' '+ampm ;
	} else if ( dday >= 1 ) {
		output += 'Q&amp;A, '+day+', '+hour+' '+ampm ;
	} else if ( dday >= 0 && hhour >= 0 ) {
		output += 'Q&amp;A, '+hour+' '+ampm ;
	} else if ( dday >= -1 && hhour >= -1 ) {
		output += '<span class="live">Q&amp;A, Live</span>' ;
	} else if ( hhour < -1 ) {
		output += 'Q&amp;A, Transcript' ;
	} else {
		output += 'Q&amp;A' ;
	}

	document.write(output);
}
/* START: opacity */
var hasOpacityMethodsLoaded = true ;
var oOPAQUE = 1.00 ;
var oTRANSPARENT = 0.00 ;
var oFADE	= {"target":0.40,"increment":0.10,"interval":40};
var oRIPEN1	= {"target":0.90,"increment":0.05,"interval":40};
var oRIPEN2	= {"target":1.00,"increment":0.01,"interval":40};
var oSLIDESHOW = {"target":1.00,"increment":0.10,"interval":40};
// underscores don't work in Fire Fox!
var _OPAQUE = 1.00 ;
var _TRANSPARENT = 0.00 ;
var _FADE	= {"target":0.40,"increment":0.10,"interval":40};
var _RIPEN1	= {"target":0.90,"increment":0.05,"interval":40};
var _RIPEN2	= {"target":1.00,"increment":0.01,"interval":40};
var _SLIDESHOW = {"target":1.00,"increment":0.10,"interval":40};

function pulseOpacity(e,fade,ripen) {
	var i = 0 ;
	var j = 0 ;
	if ( typeof e.style.opacity != "undefined" ) {

		i += fadeOpacity(e,fade);

		setTimeout( function() {
			j += ripenOpacity(e,ripen);
		},++i*fade.interval) ;
	}
}
function fadeOpacity(e,fade) {
	var i = 0 ;
	if ( typeof e.style.opacity != "undefined" ) {
		var opacity = Math.round(100*e.style.opacity)/100 ;

		var target = fade.target ;
		var inc = -fade.increment ;
		var interval = fade.interval ; // | inc*interval | is proportional to total time of fadeOpacity

		for ( i ; opacity > target; opacity = (Math.round(100*opacity)/100)+inc ) {
			i++;
			setTimeout( function() {
				nudgeOpacity(e,inc)
			},i*interval ) ;
		}
	}
	return i ;
}
function ripenOpacity(e,ripen) {
	var i = 0 ;
	if ( typeof e.style.opacity != "undefined" ) {
		var opacity = Math.round(100*e.style.opacity)/100 ;

		var target = ripen.target ;
		var inc = ripen.increment ;
		var interval = ripen.interval ; // | inc*interval | is proportional to total time of fadeOpacity

		for ( i ; opacity < target; opacity = (Math.round(100*opacity)/100)+inc ) {
			i++;
			setTimeout( function() {
				nudgeOpacity(e,inc)
			},i*interval ) ;
		}
	}
	return i ;
}
function nudgeOpacity(e,inc) {
	if ( typeof e.style.MozOpacity != "undefined" ) {
		var mo = e.style.MozOpacity/1 ;
		mo = mo + inc ;
		mo = (mo < 0) ? 0 : ( mo > 1.00 ) ? 1.00 : mo ;
		mo = Math.round(100*mo)/100 ;
		e.style.MozOpacity = mo;
	} else {
		if ( typeof e.style.filter != "undefined" ) {
			var filter = e.style.filter ;
			if ( filter.match(/alpha\(opacity=([\.\d]+)\)/) ) {
				var fo = (RegExp.$1)/1 + (100 * inc) ;
				fo = (fo < 0) ? 0 : ( fo > 100 ) ? 100 : fo ;
				fo = Math.round(100*fo)/100;
				e.style.filter = "alpha(opacity="+fo+")" ;
			}
		}
		if ( typeof e.style.opacity != "undefined" ) {
			var o = e.style.opacity/1 ;
			o = o + inc ;
			o = (o < 0) ? 0 : ( o > 1.00 ) ? 1.00 : o ;
			o = Math.round(100*o)/100 ;
			e.style.opacity = o;
		}
	}
}
function setOpacity(e,opacity) {
	opacity = (opacity < 0) ? 0 : ( opacity > 1.00 ) ? 1.00 : opacity ;
	var fo = Math.round(100*opacity) ;
	var mo = Math.round(100*opacity)/100;
	var o = Math.round(100*opacity)/100 ;

	if ( navigator.appName.indexOf("Netscape")!=-1 && parseInt(navigator.appVersion)>=5 ) {
		e.style.MozOpacity = mo;
	} else {
		e.style.opacity = o;
		e.style.filter = "alpha(opacity="+fo+")" ;
	}
}
/* END opacity */
/* START Image exists */
function showOrHideElementDependingOnImage(id,display,src) {
/*
	I) If image exists and 
		i) element already displayed, do nothing
		ii) element hidden, show element
	II) If image doesn't exist and 
		i) element displayed, hide it
		ii) element hidden, do nothing
*/
	if ( document.getElementById(id) ) {

		var e = document.getElementById(id) ;

		var img = new Image();
		var timestamp = (new Date()).getTime() ;
		img.src = src+'?'+timestamp ;
		img.onload = function() {
			if ( display != 'none' ) {
				e.style.display = display;
			}
		}
		img.onerror = function() {
			if ( display == 'none' ) {
				e.style.display = display;
			}
		}
	}
}
function showElementIfImageExists(id,display,src) {
	showOrHideElementDependingOnImage(id,display,src) ;
}
function showInlineElementIfImageExists(id,src) {
	showOrHideElementDependingOnImage(id,'inline',src) ;
}
function showBlockElementIfImageExists(id,src) {
	showOrHideElementDependingOnImage(id,'block',src) ;
}
function showElementIfImageExists(id,src) {
	showBlockElementIfImageExists(id,src) ;
}
function hideElementIfImageDoesntExist(id,src) {
	showOrHideElementDependingOnImage(id,'none',src) ;
}
/* END Image exists */

// fixes the flicker in IE 6
try {
	document.execCommand('BackgroundImageCache',false,true);
} catch(e) {
}
/**
 * Takes a string and escapes in HTML code
 * @param string
 * @return escaped string
 */
function escapeHTML(string) {
	string = string.replace(/\x26/ig, "&amp;"); // &
	string = string.replace(/\x22/ig, "&quot;"); // "
	string = string.replace(/\x27/ig, "&#39;"); // '
	string = string.replace(/\x3C/ig, "&lt;"); // <
	string = string.replace(/\x3E/ig, "&gt;"); // >
	string = string.replace(/\x60/ig, "&#96;"); // grave accent
	string = string.replace(/\xB4/ig, "&acute;"); // acute accent - spacing acute
	string = string.replace(/\x2018/ig, "&#8216;"); // left single quot mark
	string = string.replace(/\x2019/ig, "&#8217;"); // right single quot mark
	string = string.replace(/\x201A/ig, "&#8218;"); // single low-9 quote mark
	string = string.replace(/\x201C/ig, "&#8220;"); // left double quot mark
	string = string.replace(/\x201D/ig, "&#8221;"); // right double quot mark
	string = string.replace(/\x201E/ig, "&#8222;"); // double low-9 quot mark
	return string;
}
function getAvailableTagInContainer(tag,container_id,obstacle_id,clearance) {
	if ( document.getElementById(obstacle_id) && document.getElementById(container_id) ) {
		if ( typeof clearance == "undefined" ) {
			clearance = 200 ;
		}
		var obstacle = document.getElementById(obstacle_id);
		var bottom_of_obstacle = findPosition(obstacle_id).y+obstacle.offsetHeight ;

		var container = document.getElementById(container_id);
		var bottom_of_container = findPosition(container_id).y+container.offsetHeight ;

		var grafs = container.getElementsByTagName(tag);
		for( var i=0; i<grafs.length; i++ ) {
			var graf = grafs[i] ;
			if ( (findPositionByElement(graf).y > bottom_of_obstacle + clearance) ) {
				return graf ;
			}
		}
	}
	return false;
}
function insertContentAfterSibling(parent,content,sibling) {
	if ( parent && content && sibling )
		parent.insertBefore( content, sibling ) ;
}
// Get children elements
function getChildren(parent, name){
	var nodes = [];
	for(var r=0;r<parent.childNodes.length;r++){
		if(parent.childNodes[r].nodeType === 1 && parent.childNodes[r].nodeName === name.toUpperCase()){
			nodes.push(parent.childNodes[r]);
		}
	}
	return nodes;
} // end: getChildren
function addEvent(el, evt, callback, cap){
	if(el && evt){
		if(el.addEventListener){
			el.addEventListener(evt, callback, cap);
		} else {
			evt = (evt == 'mouseover') ? 'mouseenter' : evt;
			evt = (evt == 'mouseout') ? 'mouseleave' : evt;
			el.attachEvent('on' + evt, callback);
		}
	}
} // end: addEvent
function removeEvent(el,evt,callback,cap){
	if(el && evt){
		if(el.removeEventListener){
			el.removeEventListener(evt,callback,cap);
		} else {
			evt = (evt == 'mouseover') ? 'mouseenter' : evt;
			evt = (evt == 'mouseout') ? 'mouseleave' : evt;
			el.detachEvent('on' + evt, callback);
		}
	}
} // end: removeEvent
/* END: /wp-srv/js/utilsStatic.js */
