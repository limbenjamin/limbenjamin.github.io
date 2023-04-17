var searchPage = {
    batchSize: 20,
    endIndex: 0,
    query: null,
    //arrays to keep track the facet selection
    facetedkey: [],
    facetedvalue: [],


    init: function () {
        queryly.QuerylyKey = 'a7dbcffb18bb41eb';

        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0].toLowerCase() == 'searchkey') {
                searchPage.query = sParameterName[1] + ' ';
            }
            else if (sParameterName[0].toLowerCase() == 'groups') {
                queryly.groups = sParameterName[1].split(",");
            }
        }
        if (searchPage.query != '' && searchPage.query != null) {
            searchPage.dofacetedsearch(0, '', '');


        }
    },

    atiTrack: function (link) {
        var title = link.text();
        var href = link.attr('href');
        var completedquery = searchPage.query.trim().replace(/&/g, '_').replace(/\s+/g, '_');
        title = title.replace(/&/g, '_').replace(/\s+/g, '_');

        try {
            var atclickurl = '//logw348.ati-host.net/hit.xiti?s=538291&mc=' + completedquery + '&np=1&mcrg=1&click=IS';
            new Image().src = atclickurl + '&_=' + Math.random();
        }
        catch (e) { }

    },

    //This render the faceted object into html. In the current rss feed, creator and pubdate are used in the facet.
    renderFaceted: function (faceted) {
        var html = '<div style="margin-top:10px;" ><a style="cursor:pointer" onclick="searchPage.dofacetedsearch(0,\'\',\'\');return false;">Clear All</a></div><div style="margin-top:10px;margin-bottom:10px;background:black;color:white;padding:6px;" >Filter by Author</div>';

        //build the filters for creator field
        var creators = faceted.creator;
        for (var i = 0; i < creators.length; i++) {
            html = html + '<div><a style="cursor:pointer" onclick="searchPage.dofacetedsearch(0,\'creator\',\'' + creators[i].key.replace(/'/g, "\\'") + '\')";return false;">' + creators[i].key + '(' + creators[i].value + ')</a></div>';
        }



        html = html + '<div style="margin-top:10px;margin-bottom:10px;background:black;color:white;padding:6px;" >Filter by Date</div>';
        //build the filters for publication date, data are grouped into buckets. for example, 168 means "published in the past 168 hours"
        var dates = faceted.pubDate;
        for (var i = 0; i < dates.length; i++) {
            var datename = '';
            if (dates[i].key == '24') {
                datename = "within 24 hours";
            }
            else if (dates[i].key == '168') {
                datename = "within one week";
            }
            else if (dates[i].key == '720') {
                datename = "within 30 days";
            }
            else if (dates[i].key == '8760') {
                datename = "within a year";
            }
            else if (dates[i].key == '26280') {
                datename = "within three years";
            }
            if (datename != '') {
                html = html + '<div><a style="cursor:pointer;" onclick="searchPage.dofacetedsearch(0,\'pubDate\',\'' + encodeURIComponent(dates[i].key) + '\')";return false;">' + datename + '(' + dates[i].value + ')</a></div>';
            }
        }

        queryly.jquery('#faceteddata').html(html);
    },

    resultcallback: function (results) {
        //retrieve metadata
        var total = results.metadata.total;
        searchPage.endIndex = results.metadata.endindex;


        var completedquery = searchPage.query.trim().replace(/&/g, '_').replace(/\s+/g, '_');
        var np = Math.ceil(searchPage.endIndex / searchPage.batchSize);
        var hiturl = '//logw348.ati-host.net/hit.xiti?s=538291&p=internal_search_engine_page&s2=5&mc=' + completedquery + '&np=' + np;
        new Image().src = hiturl + '&_=' + Math.random();


        //if there is faceted data in results object, render it.
        if (results.faceted != null && results.faceted != undefined) {
            this.renderFaceted(results.faceted);
        }

        queryly.jquery('#resultdata').append("<div style='margin-bottom: 12px; border-bottom: 1px solid #ccc;padding-bottom:10px;'><span style='font-size:28px;font-family:Roboto Condensed,Open Sans,sans-serif;color:#777'>Search results for <b style='color:black'>" + results.metadata.query + "</b></div>");
        //loop through each result.
        for (var i = 0; i < results.items.length; i++) {
            //display search native ad if available
            if (results.ads != null && results.ads.length > 0) {
                for (var j = 0; j < results.ads.length; j++) {
                    if (results.ads[j].index == i) {
                        queryly.jquery('#resultdata').append(searchPage.renderitem(results.ads[j]));
                        break;
                    }
                }
            }

            var item = results.items[i];

            if (queryly.groups.length > 0 && queryly.lastgroup != item._group) {
                if (item._group != '' && typeof item._group != 'undefined') {
                    queryly.jquery('#resultdata').append("<center><div style='border-top: 1px solid #ddd;margin: 30px;width: 50%;margin-bottom: 10px;'><div style='display: inline-block;padding-left: 16px;padding-right: 16px;background: white;position: relative;top: -12px;font-weight: bold;color: #444;font-size: 18px;color:#428bca;text-transform:uppercase'>Results from " + item._group.replace(/\//g, ' ') + " section</div></div></center>");
                }
                else {
                    queryly.jquery('#resultdata').append("<center><div style='border-top: 1px solid #ddd;margin: 30px;width: 50%;margin-bottom: 10px;'><div style='display: inline-block;padding-left: 16px;padding-right: 16px;background: white;position: relative;top: -12px;font-weight: bold;color: #444;font-size: 18px;color:#999;text-transform:uppercase'>Results from other sections</div></div></center>");
                }
                queryly.lastgroup = item._group;
            }

            var html = searchPage.renderitem(item);

            queryly.jquery('#resultdata').append(html);
        }

        var pagerhtml = '';
        if (total > searchPage.endIndex) {
            pagerhtml = pagerhtml + '<a style="float:right;text-decoration:none;" onclick="searchPage.turnpage(' + searchPage.endIndex + ');return false;" href="#"><h2 style="color:#012b51;font-family:Roboto Condensed,Open Sans,sans-serif">Next Page</h2></a>';
        }
        if (searchPage.endIndex > searchPage.batchSize) {
            var prev = Math.max(0, searchPage.endIndex - 2 * searchPage.batchSize);
            pagerhtml = pagerhtml + '<a style="float:left;text-decoration:none;" onclick="searchPage.turnpage(' + prev + ');return false;" href="#" ><h2 style="color:#012b51;font-family:Roboto Condensed,Open Sans,sans-serif">Previous Page</h2></a>';
        }
        queryly.jquery('#resultdata').append(pagerhtml);
        queryly.jquery(document).scrollTop();
    },
    renderitem: function (item) {
        item.image = item.image.replace("http://", "//");
        item.link = item.link.replace("http://", "//");

        var trackcall = 'onmousedown = "queryly.util.trackClick(\'' + item.link + '\',\'' + searchPage.query + '\');searchPage.atiTrack(queryly.jquery(this));"';
        if (item.isad == 1) {
            trackcall = 'onmousedown = "queryly.util.trackAdClick(' + item._id + ')"';
        }

        var html = '<div class="queryly_item_row" style="position:relative;overflow:hidden;width:100%;margin-bottom:10px;font-size:10px;border-bottom:1px solid #eee;padding-bottom:12px;"><a ' + trackcall + ' href="' + item.link + '" style="text-decoration:none;color:#111">';
        
        if (item.image != '') {

            html = html + '<img style="padding:6px;padding-right:12px;float:left" onerror="this.parentNode.removeChild(this);" src="' + item.image + '" />';
        }
        html = html + '<div style="margin-top:0px;"><div class="queryly_item_title" style="margin-top:6px;color:#012b51;font-family:Roboto Condensed,Open Sans,sans-serif">';

        if (item.isad == 1) {
            html = html + "<div style='background: #98a9d5;padding:3px;font-size:12px;color: white;margin-left:10px;'>SPONSORED CONTENT</div>" + item.title + "</div></div>";
        }
        else {
            html = html + item.title + '</div></div>';
        }

        var publishdate = item.pubdate + "... ";
        if (item.isad == 1) {
            publishdate = '';
        }

        html = html + '<div  class="queryly_item_description" style="font-size:15px;line-height:18px;margin-top:8px;">' + publishdate + item.description.replace("\"", "").replace("'", "").replace(/(([^\s]+\s\s*){24})(.*)/, "$1...") + '</div>';
        html = html + '</a></div>';
        return html;
    },

    turnpage: function (index) {
        queryly.jquery('#resultdata').html('');

        var keys = '';
        var values = ''
        for (var i = 0; i < searchPage.facetedkey.length; i++) {
            keys = keys + searchPage.facetedkey[i] + "|";
            values = values + searchPage.facetedvalue[i] + "|";
        }
        var url = queryly.protocol + "api.queryly.com/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + searchPage.query + "&endindex=" + index + "&batchsize=" + searchPage.batchSize + "&callback=searchPage.resultcallback&showfaceted=true&timezoneoffset=" + (new Date(0)).getTimezoneOffset();

        if (searchPage.facetedkey.length > 0) {
            url = url + "&facetedkey=" + encodeURIComponent(keys) + "&facetedvalue=" + encodeURIComponent(values);
        }

        if (queryly.groups.length > 0) {
            url = url + "&groups=" + queryly.groups.join();
        }

        //making the search call to Queryly server
        queryly.jquery.getScript(url, function (data, textStatus, jqxhr) {
            window.scrollTo(0, 0);
        });
    },


    //similar with dosearch method, but with faceted turned on. It passes in the current facet selection if any.
    dofacetedsearch: function (index, key, value) {
        queryly.jquery('#resultdata').html('');

        //assemble the rest api.
        var url = queryly.protocol + "api.queryly.com/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + searchPage.query + "&endindex=" + index + "&batchsize=" + searchPage.batchSize + "&callback=searchPage.resultcallback&showfaceted=true&groupstimezoneoffset=" + (new Date(0)).getTimezoneOffset();
        queryly.lastgroup = '';
        if (queryly.groups.length > 0) {
            url = url + "&groups=" + queryly.groups.join();
        }

        if (key != '') {
            if (searchPage.facetedkey.indexOf(key) >= 0) {
                var i = searchPage.facetedkey.indexOf(key);
                searchPage.facetedvalue[i] = value;
            }
            else {
                searchPage.facetedkey.push(key);
                searchPage.facetedvalue.push(value);
            }

            var keys = '';
            var values = ''
            for (var i = 0; i < searchPage.facetedkey.length; i++) {
                keys = keys + searchPage.facetedkey[i] + "|";
                values = values + searchPage.facetedvalue[i] + "|";
            }

            url = url + "&facetedkey=" + encodeURIComponent(keys) + "&facetedvalue=" + encodeURIComponent(values);
        }
        else {
            searchPage.facetedkey = [];
            searchPage.facetedvalue = [];
        }

        //making the search call to Queryly server
        queryly.jquery.getScript(url, function (data, textStatus, jqxhr) {
            window.scrollTo(0, 0);
        });
    }
}
searchPage.init();
