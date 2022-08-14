function Utils(){
	this.href = window.location.href;
	this.enterKeyCode = 13;

	this.removeListener = function(element, command, event) {
		if ( typeof(element) != "object" ) {
			if (window.removeEventListener)
				element.removeEventListener(event, command, true);
			else if (window.detachEvent)
				element.detachEvent("on" + event, command);
		}
	}
	
	this.addListener = function(element, command, event) {
		if ( typeof(element) != "object" ) {
			if (window.addEventListener)
				element.addEventListener(event, command, true);
			else if (window.attachEvent)
				element.attachEvent("on" + event, command);
		}
	}
	
	this.triggerEvent = function(element, eventType, canBubble) {
		if ( typeof(element) != "object" ) {
			canBubble = (typeof(canBubble) == undefined) ? true : canBubble;
			if (element.fireEvent) {
				element.fireEvent('on' + eventType);
			}
			else {
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent(eventType, canBubble, true);
				element.dispatchEvent(evt);
			}
		}
	}

	this.addDOMLoadEvent = function(func) {
		if (!window.__load_events) {
			var init = function () {
				// quit if this function has already been called
				if (arguments.callee.done) return;
	
				// flag this function so we don't do the same thing twice
				arguments.callee.done = true;
	
				// kill the timer
				if (window.__load_timer) {
					 clearInterval(window.__load_timer);
					 window.__load_timer = null;
				}
				
				// execute each function in the stack in the order they were added
				for (var i=0;i < window.__load_events.length;i++) {
					 window.__load_events[i]();
				}
				window.__load_events = null;
			};
	
			// for Mozilla/Opera9
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", init, false);
			}
	
			// for Internet Explorer
			/*@cc_on @*/
			/*@if (@_win32)
				document.write("<scr"+"ipt id=__ie_onload defer src=//0><\/scr"+"ipt>");
				var script = document.getElementById("__ie_onload");
				script.onreadystatechange = function() {
					 if (this.readyState == "complete") {
							init(); // call the onload handler
					 }
				};
			/*@end @*/
	
			// for Safari
			if (/WebKit/i.test(navigator.userAgent)) { // sniff
				window.__load_timer = setInterval(function() {
					 if (/loaded|complete/.test(document.readyState)) {
							init(); // call the onload handler
					 }
				}, 10);
			}
	
			// for other browsers
			window.onload = init;
			
			// create event function stack
			window.__load_events = [];
		}
	
		// add function to event stack
		window.__load_events.push(func);
	}

	this.triggerKeyEvent = function(element, eventType, keycode, canBubble) {
		if ( typeof(element) != "object" ) {
			canBubble = (typeof(canBubble) == undefined) ? true : canBubble;
			if (element.fireEvent) {
				keyEvent = document.createEventObject();
				keyEvent.keyCode=keycode;
				element.fireEvent('on' + eventType, keyEvent);
			}
			else {
				var evt = document.createEvent('KeyEvents');
				evt.initKeyEvent(eventType, true, true, window, false, false, false, false, keycode, keycode);
				element.dispatchEvent(evt);
			}
		}
	}
	
	this.getKeyCode = function(evt) {
		var keyCode;
		if (!evt) {evt=window.event;}
		if (evt.keyCode)
			keyCode=evt.keyCode
		else
			keyCode=evt.which;
		return keyCode;
	}
	
	this.getURLParam = function(paramName){
	  	var paramValue = "";
		if(paramName == null || paramName == undefined || paramName == "") return paramValue;
		paramName = paramName.toLowerCase();
	  	if (this.href.indexOf("?") > -1 ){
			var queryString = this.href.substring(this.href.indexOf("?"));
			var paramArray = queryString.split("&");
			for ( var i = 0; i < paramArray.length; i++ ){
		  		if (paramArray[i].toLowerCase().indexOf(paramName + "=") > -1 ){
					var param = paramArray[i].split("=");
					paramValue = param[1];					
					break;
		  		}
			}
	  	}
	  	return this.decodeURL(paramValue);
	} 
	
	this.decodeURL = function(url) 
	{
	  var regExp = /\+/g;
	  return unescape(String(url).replace(regExp, " ")); 
	}

	this.getElementsByClass = function(searchClass,node,tag) {
		var classElements = new Array();
		if (node == null)
			node = document;
		if (tag == null)
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
 			if (pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	} // end getElementsByClass

	this.getValue = function(name) {
		var re = new RegExp("[&\?]"+name+"=([^&]+)&?","g") ;
		if (location.search.match(re)) return RegExp.$1 ;
		else return "" ;
	}

}
