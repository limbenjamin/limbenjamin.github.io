// duplicate of /wp-srv/javascript/article/init.js
// some pages call one of these, some both
// so making sure the code only gets executed once
if ( typeof INIT_BLOCK_CALLED == "undefined" || !INIT_BLOCK_CALLED ) {
	var INIT_BLOCK_CALLED = true ;

	var axel = Math.random() + "";
	var ord = axel * 1000000000000000000;
	
	var doLocal = false;
	var startAt = 0;
	if ( ( startAt = document.cookie.indexOf( "WPATC" ) ) != -1 )
	{
	  endAt = document.cookie.indexOf( ";", startAt ) == -1
	        ? document.cookie.length
	        : document.cookie.indexOf( ";", startAt );
	  var tempWPATC = document.cookie.substring( startAt + 6, endAt );
	  doLocal = ( tempWPATC.indexOf("C=1") != -1 ); 
	} 
	// Following line for debug only
	if ( location.href.indexOf("doLocal=1") != -1 ) doLocal = true;
}
// non duplicative code should go here.