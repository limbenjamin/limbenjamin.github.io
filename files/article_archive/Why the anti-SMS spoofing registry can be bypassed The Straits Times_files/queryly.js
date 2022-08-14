var queryly = {};
(function (window) {
    queryly = {
        QuerylyKey: '',
        searchtimer: null,
        searchredirect: '',
        extendedDataFields: '',
        groups: null,
        searchapi: '//api.queryly.com/v4',
        redirecturl: '',
        redirectonreturn: true,
        initialized: 0,
        currentItemIndex: 0,
        urlOverwrite: '',
        pageurl: '',
        querylydemo: '',

        searchoutercontainer: null,
        searchcontainer: null,
        searchfiltercontainer: null,
        searchsidebar: null,
        maincontent: null,

        querybox: null,
        querysuggestbox: null,
        headertoggle: null,
        querylyoverlay: null,

        language: 0,
        noresultmessage: 'No results found. Please search a different keyword.',

        closesearch: function () {
            document.body.style["overflow-y"] = "auto";
            queryly.search.resetsearch();
        },

        opensearch: function () {
            queryly.headertoggle.checked = true;
            var event = document.createEvent("HTMLEvents");
            event.initEvent('change', true, false);
            queryly.headertoggle.dispatchEvent(event);
            window.scrollTo(0, 0);
            queryly.querybox.focus();
            //if (typeof keyword != "undefined" && keyword.trim() != "") {
            //    queryly.querybox.value = keyword;
            //    queryly.search.doAdvancedSearch(0);
            //}
        },

        init: function (querylykey, maincontent, config) {

            try {
                queryly.QuerylyKey = querylykey;
                queryly.config = config;
                queryly.layout.init();

                queryly.maincontent = maincontent;
                queryly.searchoutercontainer = document.getElementById('queryly_searchoutercontainer');
                queryly.searchcontainer = document.getElementById('queryly_resultscontainer');
                queryly.searchsidebar = document.getElementById('queryly_searchsidebar');
                queryly.searchfiltercontainer = document.getElementById('queryly_searchfiltercontainer');

                queryly.querybox = document.getElementById('queryly_query');
                queryly.querysuggestbox = document.getElementById('queryly_suggest');
                queryly.headertoggle = document.getElementById('queryly_toggle');
                queryly.querylyoverlay = document.querySelector('.queryly_overlay');

                queryly.pageurl = document.URL.toLowerCase();
                if (queryly.urlOverwrite != '') {
                    queryly.pageurl = queryly.urlOverwrite.toLowerCase();
                }

                queryly.querylydemo = queryly.util.getUrlParameter('querylydemo');




                if ((typeof queryly.config != 'undefined' && queryly.config.pageservice) || queryly.querylydemo == 'related' || queryly.querylydemo == 'native' || queryly.querylydemo == 'hyperlink' || querylykey == '58971d435c9a4cef' || querylykey == '8bceb0a641b542b1') {
                    try {
                        var url = queryly.searchapi + "/search.aspx?queryly_key=" + queryly.QuerylyKey + "&pageservice=1&pageurl=" + encodeURIComponent(queryly.pageurl.replace(/&amp;/g, "&"));
                        if (queryly.querylydemo != null && queryly.querylydemo != '' & queryly.querylydemo != 'null') {
                            url = url + '&querylydemo=' + queryly.querylydemo;
                        }
                        queryly.util.loadScript(url, function () {
                        });
                    }
                    catch (e) { }
                }



                queryly.headertoggle.addEventListener('change', function () {
                    if (this.checked) {
                        //queryly.headertoggle.blur();               
                        queryly.search.dopresearch();
                        queryly.querybox.focus();
                        window.scrollTo(0, 0);
                        //alert(1);
                    } else {
                        queryly.searchoutercontainer.style['display'] = 'none';
                        queryly.querylyoverlay.style['display'] = 'none';
                        //queryly.maincontent.style['display'] = 'block';
                        for (var i = 0; i < queryly.maincontent.length; i++) {
                            queryly.maincontent[i].classList.remove("queryly_hidden_element");
                        }

                        queryly.search.resetsearch();
                        window.scrollTo(0, 0);
                        //alert(0);
                    }

                    if (typeof queryly.callback.toggle != 'undefined') {
                        try {
                            queryly.callback.toggle(this);
                        }
                        catch (e) { }
                    }
                });

                document.addEventListener("scroll", function (event) {
                    queryly.search.onscroll();
                });

                document.addEventListener("keydown", function (event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 27) {
                        if (queryly.headertoggle.checked) {
                            var cevent = new Event('change', { bubbles: true });
                            queryly.headertoggle.checked = false;
                            queryly.headertoggle.dispatchEvent(cevent);
                        }

                    }
                });

                queryly.querybox.addEventListener("search", function (event) {
                    queryly.search.resetsearch();
                    queryly.search.dopresearch();
                });

                queryly.querybox.addEventListener("keyup", function (event) {
                    switch (event.keyCode) {
                        case 37: return;
                        case 38: return;
                        case 39: return;
                        case 40: return;
                        case 27: return;
                    }

                    clearTimeout(queryly.searchtimer);
                    queryly.search.waitForReturn = false;
                    //generate the full query string based on keyword predication.

                    var current_query = queryly.querybox.value;
                    if (current_query == '') {
                        queryly.search.resetsearch();
                        queryly.search.dopresearch();
                        event.preventDefault();
                        return;
                    }

                    var full_suggest = queryly.search.getFullSuggestion();
                    if ((full_suggest == '') || (full_suggest.indexOf(current_query.toLowerCase()) != 0)) {
                        queryly.util.showAnimation(true);
                        queryly.searchfiltercontainer.innerHTML = '';
                        queryly.redirecturl = '';
                        queryly.searchtimer = setTimeout("queryly.search.doAdvancedSearch(0);", 300);

                    }
                });

                //handle tab key and space key on search box
                queryly.querybox.addEventListener("keydown", function (event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 9) {
                        if (queryly.util.autoFillSuggestion()) {
                            event.preventDefault();
                        }
                    }
                    else if (keyCode == 32) {
                        queryly.search.current_suggestion = "";
                    }
                    else if (keyCode == 13) {
                        queryly.search.redirect();
                    }
                });

                //handle copy-and-paste words into search box
                queryly.querybox.addEventListener("input propertychange paste", function () {
                    clearTimeout(queryly.searchtimer);
                    queryly.search.waitForReturn = false;

                    if (queryly.querybox.value.trim() == '') {
                        queryly.search.resetsearch();
                        return;
                    }
                    else {
                        queryly.util.showAnimation(true);
                        queryly.searchtimer = setTimeout("queryly.search.doAdvancedSearch(0);", 300);
                    }
                });

                queryly.querybox.addEventListener("click", function (event) {
                    var result = queryly.search.getFullSuggestion();
                    if (result != '') {
                        queryly.querybox.value = result;
                    }
                });

                document.querySelector('#advanced_closebutton').addEventListener("keydown", function (event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 13) {
                        var cevent = new Event('change', { bubbles: true });
                        queryly.headertoggle.checked = false;
                        queryly.headertoggle.dispatchEvent(cevent);
                    }


                });

                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0].toLowerCase() == 'groups') {
                        queryly.groups = decodeURI(sParameterName[1]);
                        return;
                    }
                }


                if (queryly.urlOverwrite != '' && queryly.urlOverwrite != null) {
                    queryly.pageurl = queryly.urlOverwrite.toLowerCase();
                }

            }
            catch (e) { }
        }
    };

    queryly.callback = {
        initialScript: function () { },
        perRequestScript: function () { },
        perItemScript: function () { }
    };

    queryly.search = {
        totalpage: 0,
        endindex: 0,
        current_suggestion: '',
        current_query: '',
        total: 0,
        batchSize: 20,
        preBatchSize: 10,
        waitForReturn: false,
        sortby: '',
        facetedkey: [],
        facetedvalue: [],
        current_tickers: [],

        redirect: function () {
            if (queryly.redirecturl != "" && queryly.redirectonreturn) {
                window.location.href = queryly.redirecturl; //+ "?query=" + encodeURIComponent(fullsuggest);
            }
        },

        resetsearch: function () {

            window.scrollTo(0, 0);
            queryly.util.showAnimation(false);
            //queryly.instantSearch = false;
            queryly.currentItemIndex = 0;
            queryly.search.current_suggestion = '';
            queryly.search.current_query = '';
            queryly.search.total = 0;


            queryly.querybox.value = '';
            queryly.querysuggestbox.value = '';
            //queryly.searchsidebar.innerHTML = '';
            var elem = document.getElementById('searchwaitmessage');
            if (elem != null) { elem.parentNode.removeChild(elem); }
            window.scrollTo(0, 0);

        },

        dorelated: function (related) {
            var keyword = related.innerText + " ";
            queryly.querybox.value = keyword;
            queryly.querybox.focus();
            queryly.search.doAdvancedSearch(0);
        },

        onscroll: function () {
            if (queryly.querybox.value.trim() == '' || queryly.search.total <= queryly.search.endindex || queryly.searchoutercontainer.style['display'] == 'none') {
                return;
            }

            var x = ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop) + window.innerHeight;
            var y = queryly.searchcontainer.offsetHeight;

            var totalheight = queryly.searchcontainer.offsetHeight;
            var off = queryly.searchcontainer.getBoundingClientRect().top;
            var innercontainerheight = window.innerHeight;
            var delta = totalheight + off - innercontainerheight;
            if (delta < 200) {
                if (!queryly.search.waitForReturn) {
                    try {
                        queryly.search.waitForReturn = true;
                        queryly.search.doAdvancedSearch(queryly.search.endindex);
                    }
                    catch (ex) { queryly.search.waitForReturn = false; }
                }
            }
        },

        dopresearch: function () {
            //return; 
            if (typeof queryly.presearch != 'undefined' && typeof queryly.presearch.items != 'undefined' && queryly.presearch.items.length > 0) {
                queryly.search.renderPreSearch();
                queryly.searchoutercontainer.style['display'] = 'block';
                queryly.querylyoverlay.style['display'] = 'block';
                for (var i = 0; i < queryly.maincontent.length; i++) {
                    queryly.maincontent[i].classList.add("queryly_hidden_element");
                }
                queryly.querybox.focus();
                try {
                    if (typeof queryly.callback.searchComplete != 'undefined') {
                        queryly.callback.searchComplete(queryly.presearch);
                    }
                }
                catch (ex) { }
            }
            else {
                var url = queryly.searchapi + "/search.aspx?queryly_key=" + queryly.QuerylyKey + "&presearch=1&initialized=" + queryly.initialized;
                if (queryly.querylydemo != null && queryly.querylydemo != '' & queryly.querylydemo != 'null') {
                    url = url + '&querylydemo=' + queryly.querylydemo;
                }

                if (typeof queryly.config != "undefined" && typeof queryly.config.uiversion != "undefined") {
                    url = url + "&uiversion=" + queryly.config.uiversion;
                }

                queryly.util.loadScript(url, function () {
                    queryly.searchoutercontainer.style['display'] = 'block';
                    queryly.querylyoverlay.style['display'] = 'block';
                    for (var i = 0; i < queryly.maincontent.length; i++) {
                        queryly.maincontent[i].classList.add("queryly_hidden_element");
                    }
                    queryly.querybox.focus();
                });
            }

            document.querySelector('.queryly_search_header').style.top = "0px";

        },

        doAdvancedSearch: function (endindex) {

            if (typeof queryly.callback.searchStart != 'undefined') {
                queryly.callback.searchStart();
            }

            queryly.search.endindex = endindex;
            if (endindex == 0) {
                queryly.currentItemIndex = 0;
            }

            var query = queryly.querybox.value;
            //var timeoffset = new Date().getTimezoneOffset();
            var url = queryly.searchapi + "/search.aspx?queryly_key=" + queryly.QuerylyKey + "&initialized=" + queryly.initialized + "&&query=" + query.replace('&', '%26') + "&endindex=" + endindex + "&batchsize=" + queryly.search.batchSize + "&callback=&extendeddatafields=" + queryly.extendedDataFields;
            url = url + '&timezoneoffset=' + (new Date(0)).getTimezoneOffset();
            var keys = '';
            var values = ''


            for (var i = 0; i < queryly.search.facetedkey.length; i++) {
                keys = keys + queryly.search.facetedkey[i] + "|";
                values = values + queryly.search.facetedvalue[i] + "|";
            }

            if (queryly.search.facetedkey.length > 0) {
                url = url + "&facetedkey=" + encodeURIComponent(keys) + "&facetedvalue=" + encodeURIComponent(values);
            }

            if (queryly.search.sortby != '') {
                url = url + '&sort=' + queryly.search.sortby;
            }

            if (queryly.groups != null) {
                url = url + '&groups=' + queryly.groups;
            }

            //making the search call to Queryly server
            if (document.getElementById('searchcontainer') != null) {
                document.getElementById('searchcontainer').style['display'] = 'block';
            }

            if (queryly.querylydemo != null && queryly.querylydemo != '' & queryly.querylydemo != 'null') {
                url = url + '&querylydemo=' + queryly.querylydemo;
            }

            if (typeof queryly.config != "undefined" && typeof queryly.config.uiversion != "undefined") {
                url = url + "&uiversion=" + queryly.config.uiversion;
            }

            if (typeof queryly.extension != 'undefined' && queryly.extension != '' && endindex == 0) {
                url = url + "&extension=" + queryly.extension;
            }

            if (queryly.search.videosearch) {
                url = url + "&videosearch=1";
            }

            //queryly.util.callAjax(url, queryly.search.renderAdvancedResults);
            queryly.util.loadScript(url, function () {
            });
        },

        //generate a auto-completed keyword based on the search suggestion
        getFullSuggestion: function () {
            var result = '';
            if (queryly.search.current_suggestion != '') {
                var q = queryly.querybox.value;
                if (q.length > 0) {
                    var lastchar = q.charAt(q.length - 1);
                    var lastword = queryly.util.getLastWord(q);
                    var partialword = queryly.search.current_suggestion.substring(lastword.length);
                    if (lastchar != ' ' && queryly.search.current_suggestion.substring(0, lastword.length) == lastword.toLowerCase()) {
                        result = q + partialword;
                    }
                }
            }
            return result;
        },

        renderPreSearch: function (results) {
            try {
                queryly.callback.perRequestScript();
                queryly.searchcontainer.innerHTML = '';
                queryly.searchfiltercontainer.innerHTML = '';
                queryly.currentItemIndex = 0;
                if (typeof queryly.presearch != 'undefined' && typeof queryly.presearch.items != 'undefined' && queryly.presearch.items.length > 0) {
                    var splashhtml = '';
                    for (var querylyitemcount = 0; querylyitemcount < Math.min(queryly.presearch.items.length, queryly.search.preBatchSize); querylyitemcount++) {
                        queryly.data = queryly.presearch.items[querylyitemcount];
                        queryly.callback.perItemScript();
                        splashhtml = splashhtml + queryly.util.tmpl('queryly_template', new Object());
                    }

                    var itemhtml = queryly.util.tmpl('queryly_splashheader_template', new Object());
                    splashhtml = itemhtml + splashhtml;
                    var elem = document.createElement("div");
                    elem.innerHTML = splashhtml;
                    queryly.searchcontainer.appendChild(elem);
                }

            }
            catch (e) { }

            if (document.getElementById('queryly_searchoutercontainer') != null) {
                document.getElementById('queryly_searchoutercontainer').style['display'] = 'block';
            }
            //queryly.util.trackClick(document.getElementById('a.externallink'), queryly.util.getVisitorID());
            queryly.util.hookEvent(document.getElementsByClassName('resultlink'), "");
            queryly.search.waitForReturn = false;



        },


        getPopular: function (results, field, keyword) {
            var array = [];
            try {
                if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
                    return array;
                }

                for (var i = 0; i < results.items.length; i++) {
                    if (results.items[i][field] != 'undefined' && results.items[i][field] != '') {
                        //var vals = results.items[i][field].split('|');
                        var vals = results.items[i][field].split(/[\,|]+/);
                        vals.forEach(function (val) {
                            var score = 1;
                            if (val.toLowerCase().indexOf(keyword) >= 0) {
                                score = 2;
                            }
                            //var obj = array.find(x => x.name.toLowerCase() === val.toLowerCase());
                            var obj = array.find(function (a) { return a.name.toLowerCase() === val.toLowerCase(); });
                            if (typeof obj == 'undefined') {
                                var newobj = new Object();
                                newobj["name"] = val;
                                newobj["count"] = score;
                                array.push(newobj);
                            }
                            else {
                                obj["count"] = obj["count"] + score;
                            }
                        });
                    }
                }
                //array.sort((a, b) => -(a["count"] - b["count"]));
                array.sort(function (a, b) { return -(a["count"] - b["count"]); });
            }
            catch (e) { }
            return array;
        },

        renderSearchContainer: function (results) {

            var fullsuggest = '';
            try {
                fullsuggest = queryly.search.getFullSuggestion().trim();
                if (fullsuggest == '') {
                    fullsuggest = queryly.querybox.value.trim();
                }
            }
            catch (e) { }

            var html = '';
            var elem = '';
            if (typeof results.topics != 'undefined' && results.topics.length > 0) {
                for (var i = 0; i < results.topics.length; i++) {
                    queryly.data = results.topics[i];
                    try { queryly.callback.perItemScript(); } catch (e) { }

                    try {
                        html = queryly.util.tmpl('queryly_template', new Object());
                        elem = document.createElement("span");
                        elem.innerHTML = html;
                        queryly.searchcontainer.appendChild(elem);
                        //queryly.currentItemIndex = queryly.currentItemIndex + 1;
                    }
                    catch (e) { }
                }
            }

            if (typeof queryly.ads != 'undefined' && typeof queryly.ads.items != 'undefined') {
                try {
                    for (var adcount = 0; adcount < queryly.ads.items.length; adcount++) {
                        if (queryly.ads.items[adcount].index == queryly.currentItemIndex) {
                            queryly.data = queryly.ads.items[adcount];
                            try { queryly.callback.perItemScript(); } catch (e) { }

                            //var aditemhtml = queryly.render.tmpl('queryly_template', new Object());
                            //var aduiitem = queryly.render.addBlock(aditemhtml, 1, queryly.data._id);

                            try {
                                html = queryly.util.tmpl('queryly_template', new Object());
                                elem = document.createElement("span");
                                elem.innerHTML = html;
                                queryly.searchcontainer.appendChild(elem);
                                queryly.currentItemIndex = queryly.currentItemIndex + 1;
                                queryly.util.hookAdEvent(elem.querySelectorAll('a.resultlink'), queryly.data._id);
                            }
                            catch (e) { }
                        }

                    }
                }
                catch (e) { }
            }

            for (var i = 0; i < results.items.length; i++) {
                //add partner results at a spcific positioin if available.
                queryly.data = results.items[i];
                try { queryly.callback.perItemScript(queryly); } catch (e) { }

                try {
                    html = queryly.util.tmpl('queryly_template', new Object());
                    elem = document.createElement("span");
                    elem.innerHTML = html;
                    queryly.searchcontainer.appendChild(elem);
                    queryly.currentItemIndex = queryly.currentItemIndex + 1;
                }
                catch (e) { }
            }
        },

        renderAdvancedResults: function (results) {

            queryly.search.current_query = (typeof results.metadata != 'undefined') ? results.metadata.query : '';
            queryly.search.current_suggestion = (typeof results.metadata != 'undefined') ? results.metadata.suggest : '';
            queryly.search.total = (typeof results.metadata != 'undefined') ? results.metadata.total : 0;


            queryly.querysuggestbox.value = queryly.search.getFullSuggestion();

            try {

                if (typeof results.items == 'undefined' || results.items.length == 0) {
                    //queryly.noresultmessage = 'No results found. Please search a different keyword.';
                    if (queryly.language == 1) {
                        queryly.noresultmessage = 'Es wurden keine Ergebnisse gefunden. Bitte versuche es mit einem anderen Stichwort.';
                    }
                    else if (queryly.language == 2) {
                        queryly.noresultmessage = 'Aucun résultat trouvé. Veuillez rechercher un mot-clé différent.';
                    }
                    else if (queryly.language == 3) {
                        queryly.noresultmessage = 'No se han encontrado resultados.Por favor, busque una palabra clave diferente.';
                    }
                    else if (queryly.language == 4) {
                        queryly.noresultmessage = 'Nenhum resultado encontrado. Por favor, procure uma palavra-chave diferente.';
                    }
                    queryly.searchcontainer.innerHTML = '<div style="margin: 50px;text-align: center;font-size: 30px;color: #444;">' + queryly.noresultmessage + '</div>';
                    queryly.searchoutercontainer.style['display'] = 'block';
                    queryly.util.trackSearch(queryly.search.current_query, queryly.search.current_suggestion, 0);
                    return;
                }

                if (queryly.search.endindex == 0) {
                    queryly.searchcontainer.innerHTML = "";
                    window.scrollTo(0, 0);
                    queryly.callback.perRequestScript(results);
                }

                //loop through the search results.
                queryly.search.renderSearchContainer(results);
            }
            catch (e) { }
            queryly.search.waitForReturn = false;
            queryly.search.endindex = results.metadata.endindex;

            queryly.searchoutercontainer.style['display'] = 'block';
            queryly.util.hookEvent(document.getElementsByClassName('resultlink'), queryly.search.current_query);
            queryly.util.trackSearch(queryly.search.current_query, queryly.search.current_suggestion, 1);
        }
    };

    queryly.related = {
        feednames: '',
        batchSize: 6,
        decay: 1,

        hookRelatedEvent: function (selectors) {
            Array.prototype.forEach.call(document.querySelectorAll(selectors), function (elem) {
                elem.addEventListener("mousedown", function (event) {
                    try {
                        var pageurl = document.URL.toLowerCase();
                        if (queryly.urlOverwrite != '' && queryly.urlOverwrite != null) {
                            pageurl = queryly.urlOverwrite.toLowerCase();
                        }
                        var isad = 0;
                        var adtype = 0;
                        var ads = "";
                        try {
                            if (elem.getAttribute("isad") == '1') {
                                isad = 1;
                                adtype = elem.getAttribute("adtype");
                                ads = elem.getAttribute("adid");
                            }
                        }
                        catch (e) { }

                        var trackurl = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&tracktype=related&visitorid=" + queryly.util.getVisitorID() + "&pageurl=" + encodeURIComponent(pageurl.replace(/&amp;/g, "&")) + "&relatedurl=" + encodeURIComponent(elem.href.replace(/&amp;/g, "&"));
                        if (isad == 1) {
                            trackurl = trackurl + "&isad=1&adtype=" + adtype + "&ads=" + ads;
                        }
                        new Image().src = trackurl;

                        if (typeof queryly.callback.relatedClicked != 'undefined') {
                            queryly.callback.relatedClicked(this);
                        }
                    }
                    catch (e) { }
                });
            });
        }
    };

    queryly.campaign = {
        hookCampaignEvent: function (selectors, allocationid, agencyid, adtype, adid) {
            Array.prototype.forEach.call(document.querySelectorAll(selectors), function (elem) {
                elem.addEventListener("mousedown", function (event) {
                    try {
                        new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&tracktype=campaign&visitorid=" + queryly.util.getVisitorID() + "&ad=1&clicked=1&allocationid=" + allocationid + "&agencyid=" + agencyid + "&adtype=" + adtype + "&adid=" + adid + "&pageurl=" + encodeURIComponent(document.URL.replace(/&amp;/g, "&"));
                    }
                    catch (e) { }
                });
            });
        }
    };

    queryly.layout = {
        basestyle: '.queryly_hidden_element {display:none!important;} #advanced_searchbutton {display:none;} .queryly_overlay{height:0px;display:none;} .queryly_search_header{background:black;color:#FFF;box-shadow:0px 1px 10px #888;position:fixed;top:-1000px;left:0;width:100%;height:130px;padding:40px;transition:top 500ms cubic-bezier(0.17, 0.04, 0.03, 0.94);overflow:hidden;box-sizing:border-box;z-index:-1;} #queryly_toggle{position:relative;cursor:pointer;left:-100%;top:-100%;} #queryly_toggle:checked ~ .queryly_search_header{z-index:999999;top:0px;} #queryly_searchcontainer{width:100%;} #queryly_resultscontainer{width:60%;} @media (max-width:1200px){#queryly_searchsidebar{display:none;} #queryly_searchcontainer {width:auto;margin-left:0px;padding:20px;} } ',
        basehtml: '<input type="checkbox" style="display:none;" autocomplete="off" name="queryly_toggle" id="queryly_toggle" /> <div id="queryly_search_header" class="queryly_search_header"><a tabindex=-1 id="poweredbyqueryly" href="https://www.queryly.com/" target="_blank" rel="noopener noreferrer" style="position:absolute;right: 122px;bottom: 20px;color: #eee;font-size: 12px;color:white;">search by queryly </a><input tabindex=-1 id="queryly_suggest" type="text" style="margin:auto;padding:8px;font-size:20px;width:calc(100% - 170px);position:absolute;z-index:-1;color:black;" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" /> <input tabindex=0 id="queryly_query" type="text" placeholder="Search news..." style="opacity:0.7;z-index:9999;color:black;margin:auto;padding:8px;font-size:20px;width:calc(100% - 90px);" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" /> <a tabindex=0 id="advanced_searchbutton" href="#" style="position: absolute;z-index: 999;">Advanced Search</a><label for="queryly_toggle"><img tabindex=0 id="advanced_closebutton" alt="close" style="width:40px;float:right;margin-left:20px;cursor:pointer;" src="https://www.queryly.com/images/whitecloseicon.png" /></label> </div><div id="queryly_searchoutercontainer" style="display:none;"> <div id="queryly_searchfiltercontainer"></div><div id="queryly_searchcontainer"><div style="margin-top:0px;" id="queryly_searchsidebar"></div><div id="queryly_resultscontainer"></div></div></div>',
        init: function () {
            if (typeof queryly.config != 'undefined' && queryly.config.appendTop) {

                var elem = document.createElement("div");
                elem.setAttribute("class", "queryly_overlay");
                elem.innerHTML = queryly.layout.basehtml;
                document.body.insertBefore(elem, document.body.children[0]);

                elem = document.createElement("style");
                elem.innerHTML = queryly.layout.basestyle;
                document.body.insertBefore(elem, document.body.children[0]);
            }
            else {
                var elem = document.createElement("style");
                elem.innerHTML = queryly.layout.basestyle;
                document.body.appendChild(elem);

                elem = document.createElement("div");
                elem.setAttribute("class", "queryly_overlay");
                elem.innerHTML = queryly.layout.basehtml;
                document.body.appendChild(elem);
            }

        }
    };

    queryly.hyperlink = {
        drawLinks: function (data) {
            for (var i = 0; i < data.keywords.length; i++) {

                var where = data.keywords[i].where;
                var html = data.keywords[i].html;
                var words = data.keywords[i].keyword;
                var exclusion = (typeof data.keywords[i].exclusion != 'undefined') ? data.keywords[i].exclusion.toLowerCase().trim() : '';

                if (exclusion != '') {
                    var excluded = false;
                    var exclusions = exclusion.split(',').forEach(function (item, index, arr) {
                        if (document.URL.toLowerCase().indexOf(arr[index]) >= 0) {
                            excluded = true;
                            return;
                        }
                    });
                    if (excluded) { return; }
                }
                var divs = document.querySelectorAll(where);
                try {

                    var rgx = new RegExp('\\b(' + words.join('|') + ')\\b(?![^<]*>|[^<>]*</(a|b|strong))', 'i');
                    for (k = 0; k < divs.length; k++) {
                        if (divs[k].innerHTML.match(rgx) != null) {
                            divs[k].innerHTML = divs[k].innerHTML.replace(rgx, html);

                            break;
                        }
                    }
                }
                catch (e) { }
            }
        }
    };

    queryly.util = {
        cache: {},
        //used by JavaScript Micro-Templating 
        tmpl: function (str, data) {
            var fn = !/\W/.test(str) ?
                this.cache[str] = this.cache[str] ||
                this.tmpl(document.getElementById(str).innerHTML) :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +
                    str.replace(/[\r\t\n]/g, " ")
                        .replace(/'(?=[^%]*%>)/g, "\t")
                        .split("'").join("\\'")
                        .split("\t").join("'")
                        .replace(/<%=(.+?)%>/g, "',$1,'")
                        .split("<%").join("');")
                        .split("%>").join("p.push('")
                    + "');}return p.join('');");

            // Provide some basic currying to the user
            return data ? fn(data) : fn;
        },

        callAjax: function (url, callback) {
            var xmlhttp;
            // compatible with IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    callback(JSON.parse(xmlhttp.responseText));
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },

        loadScript: function (src, callback) {
            var script = document.createElement('script');
            document.head.appendChild(script);
            var loaded = false;
            if (callback) {
                script.onreadystatechange = script.onload = function () {
                    if (!loaded) {
                        callback();
                    }
                    loaded = true;
                };
            }
            script.setAttribute('src', src);

        },
        //center the image vertically for tall images.
        imageShift: function (img) {
            if (img.naturalHeight > img.naturalWidth * 1.2) {
                var shift = -(img.naturalHeight - img.naturalWidth) / 2;
                (img).style.marginTop = shift + 'px';
            }
        },

        imageLoad: function (img, w, h) {
            if (img.naturalWidth < 20) {
                queryly.util.removeNode(img.parentNode);
            }
        },

        removeNode: function (node) {
            if (node != null && node.parentNode != null) {
                try {
                    node.parentNode.removeChild(node);
                }
                catch (e) { }
            }
        },

        imageError: function (img) {
            img.src = '//www.queryly.com/images/blank.png';
        },

        getUrlParameter: function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        },

        getCookie: function (name) {
            try {
                name = name + "=";
                var carray = document.cookie.split(';');

                for (var i = 0; i < carray.length; i++) {
                    var c = carray[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
            }
            catch (ex) {
                return null;
            }
            return null;
        },

        setCookie: function (name, value, days) {
            if (days == undefined) {
                days = 90;
            }
            if (value == 0) {
                document.cookie = name + '=' + value + '; path=/';
            }
            else {
                document.cookie = name + '=' + value + ';expires=' + new Date((new Date().getTime() + 1000 * 24 * 3600 * days)) + '; path=/';
            }
        },

        getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        //generate an anonymous random id
        getVisitorID: function () {
            var id = queryly.util.getCookie("querylyvid");
            if (id == null) {
                id = queryly.util.getRandomInt(1, 2147483647);
                queryly.util.setCookie("querylyvid", id);
            }
            return id;
        },

        //display autocompleted keyword
        showSuggestion: function (guess) {
            if (queryly.currentQuery.length > 0) {
                var lastchar = queryly.currentQuery.charAt(queryly.currentQuery.length - 1);
                var lastword = queryly.util.getLastWord(queryly.currentQuery);
                var partialword = guess.substring(lastword.length);
                if (lastchar != ' ' && queryly.guess.substring(0, lastword.length) == lastword.toLowerCase()) {
                    queryly.suggestbox.value = (queryly.currentQuery + partialword);
                }
                else {
                    queryly.suggestbox.value = (queryly.currentQuery);
                }
            }

        },

        showAnimation: function (show) {
            if (document.getElementsByClassName("bars-loading").length > 0) {
                if (show) {
                    //document.getElementsByClassName("bars-loading")[0].style['display'] = 'block';
                    var i = 0;
                    queryly.util.fadeIn(document.getElementById('searchcontainer'), i);
                }
                else {
                    document.getElementsByClassName("bars-loading")[0].style['display'] = 'none';
                }

            }
        },

        fadeIn: function (el, i) {
            i = i + 0.05;
            queryly.util.seto(el, i);
            if (i < 1) { setTimeout(function () { queryly.util.fadeIn(el, i); }, 10); }
        },

        seto: function (el, i) {
            el.style.opacity = i;
        },

        getLocalDate: function (dt) {
            var lt = dt;
            var offset = new Date().getTimezoneOffset();
            lt.setMinutes(lt.getMinutes() + offset);
            return lt;
        },

        getLocalDateTimeLabel: function (dt) {
            if (dt == '') {
                return dt;
            }
            var jan = new Date(2018, 0, 1);
            var jul = new Date(2018, 6, 1);
            var offset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
            if (offset == 300) {
                return dt + " ET";
            }
            else if (offset == 480) {
                return dt + " PST";
            }
            else {
                return dt;
            }
        },


        getLastWord: function (o) {
            return ("" + o).replace(/[\s]+$/, '').split(/[\s]/).pop();
        },

        highlight: function (text, tokens) {
            var ht = text;
            var existing = [];
            try {

                for (var i = tokens.length - 1; i >= 0; i--) {
                    if (tokens[i].length < 3) {
                        continue;
                    }
                    var found = false;
                    for (var j = 0; j < existing.length; j++) {
                        if (existing[j].indexOf(tokens[i]) >= 0) {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        continue;
                    }
                    existing.push(tokens[i]);
                    var regex = new RegExp(tokens[i], 'gi');
                    ht = ht.replace(regex, function (str) {
                        return "<span class='queryly_keywords_highlight'>" + str + "</span>"
                    })
                }
            }
            catch (e) { }
            return ht;
        },

        autoFillSuggestion: function () {
            var result = queryly.search.getFullSuggestion();
            if (result != '' && result != queryly.querybox.value) {
                queryly.querybox.value = (result);
                return true;
            }
            else {
                return false;
            }
        },

        trackClick: function (url, q, suggest) {
            new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + q + "&suggest=" + ((typeof suggest == "undefined") ? q : suggest) + "&total=1&target=" + encodeURIComponent(url);
        },

        trackSearch: function (q, suggest, found) {
            new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + q + "&suggest=" + suggest + "&target=&total=" + found;
        },

        hookEvent: function (links) {
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("mousedown", function () {
                    try {
                        queryly.util.trackClick(this.href.replace(/&amp;/g, "&"), queryly.search.current_query, queryly.search.current_suggestion);

                        if (typeof queryly.callback.clickComplete != 'undefined') {
                            queryly.callback.clickComplete(this, queryly.search.current_query, queryly.search.current_suggestion);
                        }
                    }
                    catch (e) { }
                });
            }
        },

        hookAdEvent: function (links, allocationid) {
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("mousedown", function () {
                    try {
                        new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&tracktype=campaign&visitorid=" + queryly.util.getVisitorID() + "&clicked=1&allocationid=" + allocationid + "&pageurl=";
                    }
                    catch (e) { }
                });
            }
        }
    };

})(window);