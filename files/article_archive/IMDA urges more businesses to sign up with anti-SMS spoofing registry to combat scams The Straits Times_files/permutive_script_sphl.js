/**
 * @file
 *  permutive_script_sphl.
 *
 */
var permutive_keys = {
  articleid: "",
  chapter1: "",
  chapter2: "",
  chapter3: "",
  contentcat: "",
  contenttype: "",
  gsKeywords: [],
  keywords: [],
  printcat: "",
  sph_bs_list: [],
  sph_iab_list: [],
  sph_seg: [],
  story_threads: "",
  title: "",
  visitorcat: ""
};

per_userid = "";


if (typeof _data != 'undefined') {
  if (typeof _data.at != 'undefined' && _data.at != "") {per_userid=_data.at;}
  if (typeof _data.articleid != 'undefined' && _data.articleid != "") {permutive_keys.articleid=_data.articleid;}
  if (typeof _data.chapter1 != 'undefined' && _data.chapter1 != "") {permutive_keys.chapter1=_data.chapter1;}
  if (typeof _data.chapter2 != 'undefined' && _data.chapter2 != "") {permutive_keys.chapter2=_data.chapter2;}
  if (typeof _data.chapter3 != 'undefined' && _data.chapter3 != "") {permutive_keys.chapter3=_data.chapter3;}
  if (typeof _data.keyword != 'undefined' && _data.keyword != "") { permutive_keys.keywords=_data.keyword.toLowerCase().split(',');}
  if (typeof _data.pagination != 'undefined' && _data.pagination != "") {permutive_keys.pagination=parseInt(_data.pagination);}
  if (typeof _data.printcat != 'undefined' && _data.printcat != "") {permutive_keys.printcat=_data.printcat;}
  if (typeof _data.sph_bs != 'undefined' && _data.sph_bs != "") { permutive_keys.sph_bs_list=_data.sph_bs.toLowerCase().split(',');}
  if (typeof _data.sph_iab != 'undefined' && _data.sph_iab != "") { permutive_keys.sph_iab_list=_data.sph_iab.toLowerCase().split(',');}
  if (typeof _data.story_threads != 'undefined' && _data.story_threads != "") {permutive_keys.story_threads=_data.story_threads;}
  if (typeof _data.title != 'undefined' && _data.title != "") {permutive_keys.title=_data.title;}
  if (typeof _data.visitorcat != 'undefined' && _data.visitorcat != "") {
    switch (_data.visitorcat) {
      case '1':
        permutive_keys.visitorcat='anonymous';break;
      case '2':
        permutive_keys.visitorcat='subscriber';break;
      case   '3':
        permutive_keys.visitorcat='registered';break;
      case '4':
        permutive_keys.visitorcat='sphanonymous';break;
      case   '5':
        permutive_keys.visitorcat='lite';break;
      case '6':
        permutive_keys.visitorcat='freetrial';break;
      case   '7':
        permutive_keys.visitorcat='inapppurchase';break;
      case '8':
        permutive_keys.visitorcat='corpmoejc';break;
      case   '9':
        permutive_keys.visitorcat='corpmoepoly';break;
      case '10':
        permutive_keys.visitorcat='corpmoeite';break;
      case '12':
        permutive_keys.visitorcat='verifiedreg';break;
      case   '13':
        permutive_keys.visitorcat='nonverifiedreg';break;
      default:
        permutive_keys.visitorcat='anonymous';
    }
  }

  if (typeof _data.contenttype != 'undefined' && _data.contenttype != "") {
    //For ST only article, photo and video is available.
    switch (_data.contenttype) {
      case '1':
        permutive_keys.contenttype = 'article'; break;
      case '2':
        permutive_keys.contenttype = 'photo'; break;
      case '3':
        permutive_keys.contenttype = 'video'; break;
      case '4':
        permutive_keys.contenttype = 'audio'; break;
      case '5':
        permutive_keys.contenttype = 'AR'; break;
      default:
        permutive_keys.contenttype = 'article';
    }
  }

  if (typeof _data.contentcat != 'undefined' && _data.contentcat != "") {
    switch (_data.contentcat) {
      case '1':
        permutive_keys.contentcat = 'free'; break;
      case '2':
        permutive_keys.contentcat = 'premium'; break;
      default:
        permutive_keys.contentcat = 'free';
    }
  }

}


if (typeof gs_channels != 'undefined' && gs_channels != "") {permutive_keys.gsKeywords=gs_channels.join('|').toLowerCase().split('|');}

function per_getcookie(cname){
  if(document.cookie.length>0){
    c_start=document.cookie.indexOf(cname+"=");
    if(c_start!=-1){
      c_start=c_start+cname.length+1;
      c_end=document.cookie.indexOf(";",c_start);
      if(c_end==-1){c_end=document.cookie.length}
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
}

var per_suid=per_getcookie('suid');
var sph_seg=per_getcookie('sph_seg');
if (typeof sph_seg != 'undefined' && sph_seg != "") {permutive_keys.sph_seg=sph_seg.toLowerCase().split(',');}

!function (e, o, n, i) { if (!e) { e = e || {}, window.permutive = e, e.q = []; var t = function () { return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (e) { return (e ^ (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16) }) }; e.config = i || {}, e.config.apiKey = o, e.config.workspaceId = n, e.config.environment = e.config.environment || "production", (window.crypto || window.msCrypto) && (e.config.viewId = t()); for (var g = ["addon", "identify", "track", "trigger", "query", "segment", "segments", "ready", "on", "once", "user", "consent"], r = 0; r < g.length; r++) { var w = g[r]; e[w] = function (o) { return function () { var n = Array.prototype.slice.call(arguments, 0); e.q.push({ functionName: o, arguments: n }) } }(w) } } }(window.permutive, "ab403253-b305-47fa-a31b-3efb2473166f", "5f876161-9740-4cc8-9b64-4585990b2690", {});
window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.cmd.push(function () { if (0 === window.googletag.pubads().getTargeting("permutive").length) { console.log("load permutive"); var e = window.localStorage.getItem("_pdfps"); window.googletag.pubads().setTargeting("permutive", e ? JSON.parse(e) : []); var o = window.localStorage.getItem("permutive-id"); window.googletag.pubads().setTargeting("puid", o ? o : ""); window.googletag.pubads().setTargeting("ptime", Date.now().toString()); window.permutive.config.viewId && window.googletag.pubads().setTargeting("prmtvvid", window.permutive.config.viewId); window.permutive.config.workspaceId && window.googletag.pubads().setTargeting("prmtvwid", window.permutive.config.workspaceId); } });

  permutive.identify([
  {
    "id": per_userid,
    "tag": "userid",
    "priority": 0
  },
  {
    "id": per_suid,
    "tag": "suid",
    "priority": 1
  }
  ])

  permutive.addon('web', {
    page: permutive_keys
  });

// Permutive Ready check with Timeout function definition
window.permutive.readyWithTimeout = function (e, i, t) { var u = !1, n = function () { u || (e(), u = !0) }; (t = t || 1 / 0) !== 1 / 0 && window.setTimeout(n, t), permutive.ready(n, i) };
