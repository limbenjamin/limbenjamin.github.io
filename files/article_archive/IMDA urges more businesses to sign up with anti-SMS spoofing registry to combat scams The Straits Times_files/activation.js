/**
Summary.     Customer Data Platform Plugin for showing campaign in SPH products
Description. Customer Data Platform(CDP) is a platform that provides the campaign for various publication for ST,BT ,ZB
Copyright : Singapore Press Holdings Limited
@author Anurup Borah <anuborah@sph.com.sg>
@version 1.0.0
*/

(function ($) {
    var CDP_PLUGIN = 'CDP.plugin';
    var CDP_DEFAULTS = {
        cd_url: '',
        propensity_score: '-1',
        site_id: null,
        access_flag: null, //it's content type :{ 0:free, 1: Premium}
        visitor_category: 1,
        url: window.location.href,
        keyword: [],
        plugin_config: {
            gaClickEvenTracking: false,
            gaPageViewTracking: false,
            xmlHttpConfig: {
                method_type: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            },
            gaParams: {
                trackingId: "UA-122397506-3",
                campaignMedium: "web",
                eventAction: "clicked",
                eventCategory: "campaign",
                bannerClickCount: 1
            }
        }
    }

    function CDP(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend(true, {}, CDP_DEFAULTS, options);
    }

    CDP.prototype._getHostInfoFromPath = function (url) {
        var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        var slugIndex = match[5].lastIndexOf('/');
        return match && {
            href: url,
            protocol: match[1],
            host: match[2],
            hostname: match[3],
            port: match[4],
            pathname: match[5],
            search: match[6],
            hash: match[7],
            slug: match[5].substring(0, slugIndex),
            filename: match[5].substring(slugIndex + 1)
        }
    }

    CDP.prototype._getSiteId = function (siteInfo) {
        let site_id = "1";
        if(siteInfo == "bt_sg"){
            site_id = "2"
        }else if(siteInfo == "zb_sg"){
            site_id = "3";
        }else if(siteInfo == "zb_cn"){
            site_id = "4";
        }else if(siteInfo == "tm_sg"){
            site_id = "5";
        }else if(siteInfo == "bh_sg"){
             site_id = "6";
        }
        return site_id;
    }

    CDP.prototype._gaInvoke = function (elem, _gaObjAttr) {
        var that = this;
        var get_tags = this._setGACustomParameter(_gaObjAttr);
        //GA Tracking
        if (this.options.plugin_config.gaClickEvenTracking) {
            elem.onclick = (function (_gaObj, _gaTags) {
                return function () {
                    that._gaClickEventTracking(_gaObj, _gaTags);
                }
            })(this.options.plugin_config.gaParams, get_tags);
        }
        //GA Page View
        if (this.options.plugin_config.gaPageViewTracking) {
            this._gaPageViewTracking(get_tags);
        }
    }

    CDP.prototype._createLinkElem = function (_linkObj) {
        var linkElement = document.createElement('a');
        linkElement.setAttribute('target', '_blank');
        linkElement.href = (_linkObj.campaign_link) ? _linkObj.campaign_link : "";
        this._gaInvoke(linkElement, _linkObj);
        return linkElement;
    }

    CDP.prototype._setGACustomParameter = function (_gaObj) {
        var bannerPathInfo = this._getHostInfoFromPath(_gaObj.campaign_link);
        //let siteInfo = this.options.site_id.split("_");
        let siteInfo = this._getSiteId(this.options.site_id);
        return {
            'trackingId':  this.options.plugin_config.gaParams.trackingId,
            'clientId': ga.getAll()[0].get('clientId'),
            'hostname': bannerPathInfo.hostname,
            'page': bannerPathInfo.slug,
            'title': bannerPathInfo.filename,
            //'campaignSource': siteInfo[0],
            'campaignSource': siteInfo,
            'campaignMedium': this.options.plugin_config.gaParams.campaignMedium,
            'campaignName': _gaObj.campaign_id,
            'dimension6': ga.getAll()[0].get('clientId'),
            'dimension15': window.location.href,
            'referrer': window.location.hostname,
            'dimension93': _gaObj.campaign_id

        }
    }

    CDP.prototype._gaClickEventTracking = function (_gaObj, _gaTags) {
        if(_gaObj !=undefined && _gaObj !=null){
            if(_gaObj.eventAction !== undefined && _gaObj.eventCategory !== undefined ){
                var eventObJs = {
                     'hitType': 'event',
                     'metric1': _gaObj.bannerClickCount,
                     'eventCategory': _gaObj.eventCategory,
                     'eventAction': _gaObj.eventAction,
                     'eventLabel': _gaTags.campaignName
                 };
                const _gaEventObj = {...eventObJs, ..._gaTags }
                ga('send', 'event', _gaEventObj);
            }
          }
    }

    CDP.prototype._gaPageViewTracking = function (_gaTags) {
        if(_gaTags.campaignName != undefined && _gaTags.page != undefined ){
            ga('send','pageview',_gaTags);
         }
    }

    CDP.prototype._addImageCampaign = function (_imageObj) {
        var $element = this.$element;
        var linkElement = this._createLinkElem(_imageObj);
        var elem = document.createElement("img");
        elem.setAttribute("src", _imageObj.campaign_link);
        linkElement.appendChild(elem);
        document.getElementById($element[0].id).appendChild(linkElement);
    }

     CDP.prototype._generateRandom = function (length) {
           var result           = '';
           var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
           var charactersLength = characters.length;
           for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
           }
           return result;
     }

    CDP.prototype._addHTMLCampaign = function (_htmlObj) {
        var that = this;
        this.options.plugin_config.xmlHttpConfig.method_type = "GET";
        var objUrl = _htmlObj.campaign_link;
        //objUrl+="?" + this._generateRandom(10);
        if(objUrl != null) {
            this.call(objUrl, this.options, function (request_data) {
                $(that.element).append(request_data);
                that._gaInvoke(that.element, _htmlObj);
            });
        }
    }

    CDP.prototype._isEmpty = function (_obj) {
        return Object.keys(_obj).length === 0;
    }

    CDP.prototype._filterParams = function (params, filter_keys) {
        for (var key in params) {
            if (filter_keys.includes(key)) {
                delete params[key];
            }
        }
        return params;
    }


    CDP.prototype.run = function () {
        //Your ajax function will go here
        var that = this;
        var params = Object.assign({}, this.options);
        params = this._filterParams(params, ["plugin_config", "cd_url"]);
        this.call(this.options.cd_url, params, function (request_param) {
            obj = JSON.parse(request_param);
            that._addHTMLCampaign(obj);
        })
    }

    CDP.prototype.call = function (url, params, callback) {
        //Your ajax function will go here
        var that = this;
        var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange = function () {
            (this.readyState == 4 && this.status == 200) ? callback(this.responseText) : {};
        };
        xmlhttp.open(this.options.plugin_config.xmlHttpConfig.method_type, url, true);
        let headers = this.options.plugin_config.xmlHttpConfig.headers;
        headers['x-api-key'] = params.api_key;
        delete params.api_key;
        if (!that._isEmpty(headers)) {
            for (let key in headers) {
                xmlhttp.setRequestHeader(key, headers[key])
            }
        }
        var postParams = JSON.stringify(params);
        xmlhttp.send(postParams);
    }

    $.fn.cdp = function (options) {
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$(this).data(CDP_PLUGIN)) {
                    $(this).data(CDP_PLUGIN, new CDP(this, options));
                }
            })
        } else if (typeof options === 'string' && options[0] !== '_') {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var plugin = $(this).data(CDP_PLUGIN);
                if (plugin instanceof CDP && typeof plugin[options] === 'function') {
                    plugin[options].apply(plugin, args);
                }
                return $(this);
            });
        }
    }
}(jQuery));

var SPHWave_Wrap = function () {
    try {
        var paramsObj = {};
        var isEmpty = function (obj) {
            for (var key in obj) {
                return false;
            }
            return true;
        }

        this.init = function (module_id, server_url, api_key) {
            paramsObj = {
                module_id,
                server_url,
                api_key
            }
            return this;
        };


        this.run = function () {
            if (!isEmpty(paramsObj)) {

                //get chapter data
                var get_section_data = function () {
                    let sectionArr = [];
                    let section_to_includes = "";
                    if (window._data.chapter1) {
                        section_to_includes = window._data.chapter1;
                        sectionArr.push(section_to_includes.toLowerCase());
                    }
                    if (window._data.chapter2) {
                        section_to_includes+="/" + window._data.chapter2
                        sectionArr.push(section_to_includes.toLowerCase());
                    }
                    if (window._data.chapter3) {
                        section_to_includes+="/" + window._data.chapter3
                        sectionArr.push(section_to_includes.toLowerCase());
                    }
                    return sectionArr;
                }

                var get_site_id = function (hostname) {
                    let site_id = "st_sg";
                    if(hostname.indexOf('businesstimes.com.sg') !== -1){
                        site_id = "bt_sg";
                    }else if(hostname.indexOf('zaobao.com.sg') !== -1){
                        site_id = "zb_sg";
                    }else if(hostname.indexOf('zaobao.com') !== -1){
                        site_id = "zb_cn";
                    }else if(hostname.indexOf('tamilmurasu.com.sg') !== -1){
                        site_id = "tm_sg";
                    }else if(hostname.indexOf('beritaharian.sg') !== -1){
                        site_id = "bh_sg";
                    }
                    return site_id;
                }

                //Get Cookie
                var get_cookie_value = function(name) {
                    match = document.cookie.match(new RegExp(name + '=([^;]+)'));
                    if (match) return match[1];
                }

                // Get Device Tyoe
                var getDevice =  function getDeviceType () {
                    const ua = navigator.userAgent;
                    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                        return "tablet";
                    }
                    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                        return "mobile";
                    }
                    return "desktop";
                }

                var getGeography =  function getUserGeography () {
                    var geography = get_cookie_value("sph_user_country") || null;

                    if(geography == null) {
                        return null;
                    }

                    if(geography == 'SG'){
                        geography = "Singapore";
                    }else if(geography == 'MY'){
                        geography = "Malaysia";
                    }else  if(geography == 'ID'){
                        geography = "Indonesia";
                    }else  if(geography == 'PH'){
                        geography = "Philippines";
                    }else  if(geography == 'CN'){
                        geography = "China";
                    }else  if(geography == 'AU'){
                        geography = "Australia";
                    }else  if(geography == 'US'){
                        geography = "USA";
                    }

                    return geography;
                }

                //SiteId
                let site_id = get_site_id(window.location.hostname);

                var cdp_params = {
                    suid: get_cookie_value("suid") || "00000000000000000000000000000000",
                    module_id: paramsObj.module_id,
                    propensity_score: (window.propenmo1 !== 'undefined') ? window.propenmo1 :  "-1",
                    cd_url: `${paramsObj.server_url}/api/activation`,
                    api_key: paramsObj.api_key,
                    site_id: site_id,
                    section: get_section_data(),
                    access_flag: parseInt(window._data.contentcat) || 1,
                    keyword: window._data.keyword.toUpperCase().split(",") || [],
                    visitor_category: parseInt(window._data.visitorcat) || 1,
                    url: window.location.href.split('?')[0],
                    device: getDevice(),
                    geography: getGeography(),
                    plugin_config: {
                        gaClickEvenTracking: true,
                        gaPageViewTracking: true
                    }
                };
                jQuery("#sph_cdp_" + paramsObj.module_id).cdp(cdp_params).cdp('run');
            } else {
                jQuery.error("SPHWave Initialization Error");
            }
        };
    } catch (e) {
        jQuery.error("Error occurred when calling SPHWave");
    }
}

var SPH_CDP = function () {
    // wrapper around the `new` syntax
    return new SPHWave_Wrap();
};

var SPHWave = function () {
    // wrapper around the `new` syntax
    return new SPHWave_Wrap();
};

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-122397506-3', 'auto');