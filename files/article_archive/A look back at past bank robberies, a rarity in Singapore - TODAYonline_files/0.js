webpackJsonp([0],{"8sXf":function(n,e,t){var a=t("xS3y");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("74a9a2e8",a,!0,{})},EuFD:function(n,e,t){n.exports={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("div",{staticClass:"today-preloader"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[n.isReady?n._e():a("img",{staticClass:"img-fluid preloader-logo",attrs:{src:t("eck2"),height:"auto"}}),a("div",{staticClass:"preloader-loading-text"},[a("h4",[n._v("Loading ")]),a("pulse-loader",{attrs:{color:n.color,size:n.size}})],1)])])])])},staticRenderFns:[]}},JnHM:function(n,e,t){var a=t("ZRJ/");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("1b21efaa",a,!0,{})},SMeA:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{directives:[{name:"show",rawName:"v-show",value:n.loading,expression:"loading"}],staticClass:"v-spinner"},[t("div",{staticClass:"v-pulse v-pulse1",style:[n.spinnerStyle,n.spinnerDelay1]}),t("div",{staticClass:"v-pulse v-pulse2",style:[n.spinnerStyle,n.spinnerDelay2]}),t("div",{staticClass:"v-pulse v-pulse3",style:[n.spinnerStyle,n.spinnerDelay3]})])},staticRenderFns:[]}},YzIw:function(n,e,t){t("JnHM");var a=t("VU/8")(t("i/iG"),t("SMeA"),null,null);n.exports=a.exports},"ZRJ/":function(n,e,t){e=n.exports=t("FZ+f")(!0),e.push([n.i,"@-webkit-keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}@keyframes v-pulseStretchDelay{0%,80%{-webkit-transform:scale(1);transform:scale(1);-webkit-opacity:1;opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);-webkit-opacity:.7;opacity:.7}}","",{version:3,sources:["D:/MediaCorp/frontend/todayonline_revamp/node_modules/vue-spinner/src/PulseLoader.vue"],names:[],mappings:"AAyEA,uCAEA,OAGQ,2BAA4B,AACpB,mBAAoB,AAC5B,kBAAmB,AACX,SAAW,CAC1B,AACD,IAEQ,4BAA8B,AACtB,oBAAsB,AAC9B,mBAAqB,AACb,UAAa,CAC5B,CACA,AACD,+BAEA,OAGQ,2BAA4B,AACpB,mBAAoB,AAC5B,kBAAmB,AACX,SAAW,CAC1B,AACD,IAEQ,4BAA8B,AACtB,oBAAsB,AAC9B,mBAAqB,AACb,UAAa,CAC5B,CACA",file:"PulseLoader.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*.v-spinner\n{\n    margin: 100px auto;\n    text-align: center;\n}\n*/\n@-webkit-keyframes v-pulseStretchDelay\n{\n0%,\n    80%\n    {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n        -webkit-opacity: 1;             \n                opacity: 1;\n}\n45%\n    {\n        -webkit-transform: scale(0.1);\n                transform: scale(0.1);\n        -webkit-opacity: 0.7;             \n                opacity: 0.7;\n}\n}\n@keyframes v-pulseStretchDelay\n{\n0%,\n    80%\n    {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n        -webkit-opacity: 1;             \n                opacity: 1;\n}\n45%\n    {\n        -webkit-transform: scale(0.1);\n                transform: scale(0.1);\n        -webkit-opacity: 0.7;             \n                opacity: 0.7;\n}\n}\n"],sourceRoot:""}])},eck2:function(n,e,t){n.exports=t.p+"static/img/logo@2x-668x210.25b8aa9.png"},"i/iG":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"PulseLoader",props:{loading:{type:Boolean,default:!0},color:{type:String,default:"#5dc596"},size:{type:String,default:"15px"},margin:{type:String,default:"2px"},radius:{type:String,default:"100%"}},data:function(){return{spinnerStyle:{backgroundColor:this.color,width:this.size,height:this.size,margin:this.margin,borderRadius:this.radius,display:"inline-block",animationName:"v-pulseStretchDelay",animationDuration:"0.75s",animationIterationCount:"infinite",animationTimingFunction:"cubic-bezier(.2,.68,.18,1.08)",animationFillMode:"both"},spinnerDelay1:{animationDelay:"0.12s"},spinnerDelay2:{animationDelay:"0.24s"},spinnerDelay3:{animationDelay:"0.36s"}}}}},wZfY:function(n,e,t){t("8sXf");var a=t("VU/8")(t("x8HT"),t("EuFD"),null,null);n.exports=a.exports},x8HT:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("Dd8w"),s=t.n(a),i=t("90m7"),o=t("NYxO"),r=t("YzIw"),l=t.n(r),c=t("8J2n");e.default={name:"today-preloader",components:{PulseLoader:l.a},data:function(){return{color:c.a.color.grey,size:"4px"}},mixins:[i.a],computed:s()({},t.i(o.b)({isReady:"isReady"}))}},xS3y:function(n,e,t){e=n.exports=t("FZ+f")(!0),e.push([n.i,"","",{version:3,sources:[],names:[],mappings:"",file:"TodayPreloader.vue",sourceRoot:""}])}});
//# sourceMappingURL=0.d5fd099b7686878d48dd.js.map