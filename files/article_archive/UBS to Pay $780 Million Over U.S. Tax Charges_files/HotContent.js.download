HotContent = Class.create({
	initialize:function(section,init_data){

		this.section = section ;
		init_data = init_data ? init_data : {} ;

		this.content = init_data.content ? init_data.content : HotContent.DEFAULT_CONTENT ;
		this.maximum = (!isNaN(init_data.maximum) && init_data.maximum >= 0) ? init_data.maximum : HotContent.DEFAULT_MAXIMUM_TO_SHOW ;
		this.placeholder = init_data.placeholder ? init_data.placeholder : HotContent.DEFAULT_PLACEHOLDER ;
		this.domain = init_data.domain ? init_data.domain : HotContent.DEFAULT_DOMAIN ;

		// Data URL
		this.urlTemplate = new Template('http:\/\/#{domain}/wp-srv/javascript/contentorbiting/hotcontent/#{section}/#{content}/index.js');
		this.url = this.urlTemplate.evaluate({domain:this.domain,section:this.section,content:this.content});
		// Most Viewed Index Page
		this.mpUrlTemplate = new Template('http:\/\/#{domain}/wp-srv/most-popular.html');
		this.mpUrl = this.mpUrlTemplate.evaluate({domain:this.domain,section:this.section,content:this.content});
		// Most Viewed URL for this section
		if ( this.section == "all" && this.content == "galleries" ) {
			this.mvUrlTemplate = new Template('http:\/\/#{domain}/wp-srv/media/media-mv.html');
		} else if ( this.section == "all" && this.content == "articles" ) {
			this.mvUrlTemplate = this.mpUrlTemplate ;
		} else {
			this.mvUrlTemplate = new Template('http:\/\/#{domain}/wp-srv/#{section}/#{section}-mv.html');
		}
		this.mvUrl = this.mvUrlTemplate.evaluate({domain:this.domain,section:this.section,content:this.content});

		this.json = null;

		// contains the ajax call;
		this.getData();
	},
	getData:function(){
		var options = {
			name:'Ajax.Request',
			method:'get',
			// requestHeaders: {Accept:'application/x-javascript'},
			onCreate:this._onCreate.bind(this),
			onSuccess:this._onSuccess.bind(this),
			onFailure:this._onFailure.bind(this),
			onException:this._onException.bind(this)
		};
	    new Ajax.Request(this.url,options);
	},
	_onCreate:function(transport){
	},
	_onSuccess:function(transport,json){
		this.json = this.toJSON(transport.responseText).evalJSON(true);
		document.fire("hotcontent:loaded");
		if ($(this.placeholder)) {
			$(this.placeholder).show().innerHTML = this.getRelatedBoxOutput();
		}
	},
	_onFailure:function(transport){
		// if ($(this.placeholder))
			// $(this.placeholder).hide();
		document.fire("hotcontent:failed");
	},
	_onException:function(transport){
		// if ($(this.placeholder))
			// $(this.placeholder).hide();
		document.fire("hotcontent:failed");
	},
	toJSON:function(json){
		json = json.replace(/\n/g,'');
		json = json.replace(/"\s*,\s*/g,'",');
		json = json.replace(/{\s*/g,'{');
		while ( json.match(/([{,])(\w+):/) ) {
			json = json.replace(/[{,]\w+:/,RegExp.$1+'"'+RegExp.$2+'":');
		}
		json = json.replace(/\\'/g,'&#39;');
		json = json.replace(/\\"/g,'&#34;');
		json = json.replace(/\s*;$\s*/g,'');
		return json;
	},
	getRelatedBoxOutput:function(){
		var output = "" ;
		output += this.getContentAsDlLinks();
		output += this.getMostViewedLinksForRelatedBox();
		return output;
	},
	getContentAsDlLinks:function(){
		var output = "" ;
		if ( this.json ) {
			output += '<dl id="hotcontent-results" style="display:block;">' ;
			if ( this.json.type.match(/Galleries/) )
				output += '<dt style="font:bold 12px arial; color:#333;">Most Viewed Galleries</dt>' ;
			else if ( this.json.name.match(/Live Discussions/) )
				output += '<dt style="font:bold 12px arial; color:#333;">Most Viewed '+this.json.name.replace(/Live /,'')+'</dt>' ;
			else
				output += '<dt style="font:bold 12px arial; color:#333;">Most Viewed '+this.json.name.replace(/Site/,'')+' Articles</dt>' ;
			for (i=0; i < this.json.content.length && i < this.maximum; i++)
			{
				var linkText = this.json.content[i].linkText ;
				var description = this.json.content[i].description ;
				linkText += (linkText.match(/DAY IN PHOTOS/i) && description && !description.match(linkText) ) ? ': '+this.json.content[i].description : '' ;
				output += '<dd class="article">' ;
				output += '<a href="'+this.json.content[i].url+'tmv" target="_top">'+linkText+'</a>' ;
				output += '</dd>' ;
			}
			output += '</dl>' ;
		}
		return output;
	},
	getMostViewedLinksForRelatedBox:function(){
		var output = "" ;
		if ( this.json ) {
			output += '<div style="padding-top:5px;">';
			output += '<span class="raquo" style="font-weight:bold;color:#C00;">&raquo;</span>&nbsp;';
			if ( this.json.name.match(/Live Discussions/) )
				output += '<a href="'+this.mvUrl+'?nav=tmv" target="_top"><strong>Top 35 '+ this.json.name.replace(/Live /,'')+'</strong></a>';
			else
				output += '<a href="'+this.mvUrl+'?nav=tmv" target="_top"><strong>Top 35 '+ this.json.name.replace(/Site/,'') + this.json.type.replace(/Most Clicked/,'')+'</strong></a>';
			output += '<br/>';
			output += '<span class="raquo" style="font-weight:bold;color:#C00;">&raquo;</span>&nbsp;<a href="'+this.mpUrl+'?nav=tmv"><strong>Most Popular on washingtonpost.com</strong></a>';
			output += '</div>';
		}
		return output;
	}
});
// STATIC variables;
HotContent.DEFAULT_CONTENT = "articles" ;
HotContent.DEFAULT_MAXIMUM_TO_SHOW = 4 ;
HotContent.DEFAULT_PLACEHOLDER = "hotcontent-box-bottom_strip" ;
HotContent.DEFAULT_DOMAIN = "www.washingtonpost.com";