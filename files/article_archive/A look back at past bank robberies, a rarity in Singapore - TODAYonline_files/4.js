webpackJsonp([4],{"7vCS":function(e,t,a){var d=a("wJWs");"string"==typeof d&&(d=[[e.i,d,""]]),d.locals&&(e.exports=d.locals);a("rjj0")("29a22c88",d,!0,{})},Eldd:function(e,t,a){a("7vCS");var d=a("VU/8")(a("HdHo"),a("JCFB"),null,null);e.exports=d.exports},HdHo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var d=a("90m7");t.default={name:"today-ad-leaderboard",props:{index:{type:Number,required:!0}},data:function(){return{}},mounted:function(){this.centerLeaderboard()},methods:{centerLeaderboard:function(){if(void 0!==window.googletag){window.googletag.pubads().addEventListener("slotRenderEnded",function(t){if("div-gpt-ad-leaderboard2"===t.slot.getSlotElementId()){var a=e("#div-gpt-ad-leaderboard2 iframe").contents().find("#google_image_div");e(a).css({position:"relative",display:"flex","justify-content":"center"})}})}}},mixins:[d.a],computed:{placeholderAdLeaderboard:function(){return this.$store.state.w>=this.$store.state.breakpoints.lg?"http://via.placeholder.com/970x250":this.$store.state.w>=this.$store.state.breakpoints.md?"http://via.placeholder.com/728x90":"http://via.placeholder.com/320x50"}}}}.call(t,a("7t+N"))},JCFB:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"today-ad-leaderboard ad-leaderboard ad-bg",class:"ad-leaderboard"+e.index},[2==e.index?a("h6",[e._v("Advertisement")]):e._e(),a("div",{attrs:{id:"div-gpt-ad-leaderboard"+e.index}},["kilo"===e.$store.state.env?a("img",{attrs:{src:e.placeholderAdLeaderboard}}):e._e()])])},staticRenderFns:[]}},wJWs:function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"TodayAdLeaderboard.vue",sourceRoot:""}])}});
//# sourceMappingURL=4.74d88af7709cfe2347e1.js.map