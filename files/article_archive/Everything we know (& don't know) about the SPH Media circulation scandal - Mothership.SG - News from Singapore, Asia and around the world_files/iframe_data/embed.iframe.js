var VAuth=function(e){"use strict";var t;function n(){}function r(e){return e()}function i(e,...t){if(null==e)return n;const r=e.subscribe(...t);return r.unsubscribe?()=>r.unsubscribe():r}function o(e){let t;return i(e,(e=>t=e))(),t}!function(e){e.INIT="init",e.LOGIN="login",e.LOGOUT="logout",e.LOADED="loaded",e.UPDATE="update"}(t||(t={}));const s=[];function u(e,t=n){let r;const i=[];function o(t){if(o=t,((n=e)!=n?o==o:n!==o||n&&"object"==typeof n||"function"==typeof n)&&(e=t,r)){const t=!s.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),s.push(n,e)}if(t){for(let e=0;e<s.length;e+=2)s[e][0](s[e+1]);s.length=0}}var n,o}return{set:o,update:function(t){o(t(e))},subscribe:function(s,u=n){const a=[s,u];return i.push(a),1===i.length&&(r=t(o)||n),s(e),()=>{const e=i.indexOf(a);-1!==e&&i.splice(e,1),0===i.length&&(r(),r=null)}}}}function a(e,t,o){const s=!Array.isArray(e),a=s?[e]:e,c=t.length<2;return f=e=>{let o=!1;const u=[];let f=0,l=n;const h=()=>{if(f)return;l();const r=t(s?u[0]:u,e);c?e(r):l="function"==typeof r?r:n},d=a.map(((e,t)=>i(e,(e=>{u[t]=e,f&=~(1<<t),o&&h()}),(()=>{f|=1<<t}))));return o=!0,h(),function(){d.forEach(r),l()}},{subscribe:u(o,f).subscribe};var f}function c(e){const t=localStorage.getItem(e);try{return JSON.parse(t||"false")}catch(e){return t||!1}}function f(e,t){localStorage.setItem(e,JSON.stringify(t))}var l,h,d="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};l=function(e){!function(t){var n,r=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,i=Math.ceil,o=Math.floor,s="[BigNumber Error] ",u=s+"Number primitive has more than 15 significant digits: ",a=1e14,c=14,f=9007199254740991,l=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],h=1e7,d=1e9;function p(e){var t=0|e;return e>0||e===t?t:t-1}function g(e){for(var t,n,r=1,i=e.length,o=e[0]+"";r<i;){for(t=e[r++]+"",n=c-t.length;n--;t="0"+t);o+=t}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function m(e,t){var n,r,i=e.c,o=t.c,s=e.s,u=t.s,a=e.e,c=t.e;if(!s||!u)return null;if(n=i&&!i[0],r=o&&!o[0],n||r)return n?r?0:-u:s;if(s!=u)return s;if(n=s<0,r=a==c,!i||!o)return r?0:!i^n?1:-1;if(!r)return a>c^n?1:-1;for(u=(a=i.length)<(c=o.length)?a:c,s=0;s<u;s++)if(i[s]!=o[s])return i[s]>o[s]^n?1:-1;return a==c?0:a>c^n?1:-1}function w(e,t,n,r){if(e<t||e>n||e!==o(e))throw Error(s+(r||"Argument")+("number"==typeof e?e<t||e>n?" out of range: ":" not an integer: ":" not a primitive number: ")+String(e))}function b(e){var t=e.c.length-1;return p(e.e/c)==t&&e.c[t]%2!=0}function v(e,t){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(t<0?"e":"e+")+t}function O(e,t,n){var r,i;if(t<0){for(i=n+".";++t;i+=n);e=i+e}else if(++t>(r=e.length)){for(i=n,t-=r;--t;i+=n);e+=i}else t<r&&(e=e.slice(0,t)+"."+e.slice(t));return e}n=function e(t){var n,y,N,E,A,_,L,T,x,I,P=q.prototype={constructor:q,toString:null,valueOf:null},S=new q(1),D=20,k=4,U=-7,R=21,M=-1e7,B=1e7,C=!1,G=1,j=0,F={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},$="0123456789abcdefghijklmnopqrstuvwxyz";function q(e,t){var n,i,s,a,l,h,d,p,g=this;if(!(g instanceof q))return new q(e,t);if(null==t){if(e&&!0===e._isBigNumber)return g.s=e.s,void(!e.c||e.e>B?g.c=g.e=null:e.e<M?g.c=[g.e=0]:(g.e=e.e,g.c=e.c.slice()));if((h="number"==typeof e)&&0*e==0){if(g.s=1/e<0?(e=-e,-1):1,e===~~e){for(a=0,l=e;l>=10;l/=10,a++);return void(a>B?g.c=g.e=null:(g.e=a,g.c=[e]))}p=String(e)}else{if(!r.test(p=String(e)))return N(g,p,h);g.s=45==p.charCodeAt(0)?(p=p.slice(1),-1):1}(a=p.indexOf("."))>-1&&(p=p.replace(".","")),(l=p.search(/e/i))>0?(a<0&&(a=l),a+=+p.slice(l+1),p=p.substring(0,l)):a<0&&(a=p.length)}else{if(w(t,2,$.length,"Base"),10==t)return J(g=new q(e),D+g.e+1,k);if(p=String(e),h="number"==typeof e){if(0*e!=0)return N(g,p,h,t);if(g.s=1/e<0?(p=p.slice(1),-1):1,q.DEBUG&&p.replace(/^0\.0*|\./,"").length>15)throw Error(u+e)}else g.s=45===p.charCodeAt(0)?(p=p.slice(1),-1):1;for(n=$.slice(0,t),a=l=0,d=p.length;l<d;l++)if(n.indexOf(i=p.charAt(l))<0){if("."==i){if(l>a){a=d;continue}}else if(!s&&(p==p.toUpperCase()&&(p=p.toLowerCase())||p==p.toLowerCase()&&(p=p.toUpperCase()))){s=!0,l=-1,a=0;continue}return N(g,String(e),h,t)}h=!1,(a=(p=y(p,t,10,g.s)).indexOf("."))>-1?p=p.replace(".",""):a=p.length}for(l=0;48===p.charCodeAt(l);l++);for(d=p.length;48===p.charCodeAt(--d););if(p=p.slice(l,++d)){if(d-=l,h&&q.DEBUG&&d>15&&(e>f||e!==o(e)))throw Error(u+g.s*e);if((a=a-l-1)>B)g.c=g.e=null;else if(a<M)g.c=[g.e=0];else{if(g.e=a,g.c=[],l=(a+1)%c,a<0&&(l+=c),l<d){for(l&&g.c.push(+p.slice(0,l)),d-=c;l<d;)g.c.push(+p.slice(l,l+=c));l=c-(p=p.slice(l)).length}else l-=d;for(;l--;p+="0");g.c.push(+p)}}else g.c=[g.e=0]}function H(e,t,n,r){var i,o,s,u,a;if(null==n?n=k:w(n,0,8),!e.c)return e.toString();if(i=e.c[0],s=e.e,null==t)a=g(e.c),a=1==r||2==r&&(s<=U||s>=R)?v(a,s):O(a,s,"0");else if(o=(e=J(new q(e),t,n)).e,u=(a=g(e.c)).length,1==r||2==r&&(t<=o||o<=U)){for(;u<t;a+="0",u++);a=v(a,o)}else if(t-=s,a=O(a,o,"0"),o+1>u){if(--t>0)for(a+=".";t--;a+="0");}else if((t+=o-u)>0)for(o+1==u&&(a+=".");t--;a+="0");return e.s<0&&i?"-"+a:a}function z(e,t){for(var n,r=1,i=new q(e[0]);r<e.length;r++){if(!(n=new q(e[r])).s){i=n;break}t.call(i,n)&&(i=n)}return i}function V(e,t,n){for(var r=1,i=t.length;!t[--i];t.pop());for(i=t[0];i>=10;i/=10,r++);return(n=r+n*c-1)>B?e.c=e.e=null:n<M?e.c=[e.e=0]:(e.e=n,e.c=t),e}function J(e,t,n,r){var s,u,f,h,d,p,g,m=e.c,w=l;if(m){e:{for(s=1,h=m[0];h>=10;h/=10,s++);if((u=t-s)<0)u+=c,f=t,g=(d=m[p=0])/w[s-f-1]%10|0;else if((p=i((u+1)/c))>=m.length){if(!r)break e;for(;m.length<=p;m.push(0));d=g=0,s=1,f=(u%=c)-c+1}else{for(d=h=m[p],s=1;h>=10;h/=10,s++);g=(f=(u%=c)-c+s)<0?0:d/w[s-f-1]%10|0}if(r=r||t<0||null!=m[p+1]||(f<0?d:d%w[s-f-1]),r=n<4?(g||r)&&(0==n||n==(e.s<0?3:2)):g>5||5==g&&(4==n||r||6==n&&(u>0?f>0?d/w[s-f]:0:m[p-1])%10&1||n==(e.s<0?8:7)),t<1||!m[0])return m.length=0,r?(t-=e.e+1,m[0]=w[(c-t%c)%c],e.e=-t||0):m[0]=e.e=0,e;if(0==u?(m.length=p,h=1,p--):(m.length=p+1,h=w[c-u],m[p]=f>0?o(d/w[s-f]%w[f])*h:0),r)for(;;){if(0==p){for(u=1,f=m[0];f>=10;f/=10,u++);for(f=m[0]+=h,h=1;f>=10;f/=10,h++);u!=h&&(e.e++,m[0]==a&&(m[0]=1));break}if(m[p]+=h,m[p]!=a)break;m[p--]=0,h=1}for(u=m.length;0===m[--u];m.pop());}e.e>B?e.c=e.e=null:e.e<M&&(e.c=[e.e=0])}return e}function W(e){var t,n=e.e;return null===n?e.toString():(t=g(e.c),t=n<=U||n>=R?v(t,n):O(t,n,"0"),e.s<0?"-"+t:t)}return q.clone=e,q.ROUND_UP=0,q.ROUND_DOWN=1,q.ROUND_CEIL=2,q.ROUND_FLOOR=3,q.ROUND_HALF_UP=4,q.ROUND_HALF_DOWN=5,q.ROUND_HALF_EVEN=6,q.ROUND_HALF_CEIL=7,q.ROUND_HALF_FLOOR=8,q.EUCLID=9,q.config=q.set=function(e){var t,n;if(null!=e){if("object"!=typeof e)throw Error(s+"Object expected: "+e);if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(w(n=e[t],0,d,t),D=n),e.hasOwnProperty(t="ROUNDING_MODE")&&(w(n=e[t],0,8,t),k=n),e.hasOwnProperty(t="EXPONENTIAL_AT")&&((n=e[t])&&n.pop?(w(n[0],-d,0,t),w(n[1],0,d,t),U=n[0],R=n[1]):(w(n,-d,d,t),U=-(R=n<0?-n:n))),e.hasOwnProperty(t="RANGE"))if((n=e[t])&&n.pop)w(n[0],-d,-1,t),w(n[1],1,d,t),M=n[0],B=n[1];else{if(w(n,-d,d,t),!n)throw Error(s+t+" cannot be zero: "+n);M=-(B=n<0?-n:n)}if(e.hasOwnProperty(t="CRYPTO")){if((n=e[t])!==!!n)throw Error(s+t+" not true or false: "+n);if(n){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw C=!n,Error(s+"crypto unavailable");C=n}else C=n}if(e.hasOwnProperty(t="MODULO_MODE")&&(w(n=e[t],0,9,t),G=n),e.hasOwnProperty(t="POW_PRECISION")&&(w(n=e[t],0,d,t),j=n),e.hasOwnProperty(t="FORMAT")){if("object"!=typeof(n=e[t]))throw Error(s+t+" not an object: "+n);F=n}if(e.hasOwnProperty(t="ALPHABET")){if("string"!=typeof(n=e[t])||/^.?$|[+\-.\s]|(.).*\1/.test(n))throw Error(s+t+" invalid: "+n);$=n}}return{DECIMAL_PLACES:D,ROUNDING_MODE:k,EXPONENTIAL_AT:[U,R],RANGE:[M,B],CRYPTO:C,MODULO_MODE:G,POW_PRECISION:j,FORMAT:F,ALPHABET:$}},q.isBigNumber=function(e){if(!e||!0!==e._isBigNumber)return!1;if(!q.DEBUG)return!0;var t,n,r=e.c,i=e.e,u=e.s;e:if("[object Array]"=={}.toString.call(r)){if((1===u||-1===u)&&i>=-d&&i<=d&&i===o(i)){if(0===r[0]){if(0===i&&1===r.length)return!0;break e}if((t=(i+1)%c)<1&&(t+=c),String(r[0]).length==t){for(t=0;t<r.length;t++)if((n=r[t])<0||n>=a||n!==o(n))break e;if(0!==n)return!0}}}else if(null===r&&null===i&&(null===u||1===u||-1===u))return!0;throw Error(s+"Invalid BigNumber: "+e)},q.maximum=q.max=function(){return z(arguments,P.lt)},q.minimum=q.min=function(){return z(arguments,P.gt)},q.random=(E=9007199254740992,A=Math.random()*E&2097151?function(){return o(Math.random()*E)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(e){var t,n,r,u,a,f=0,h=[],p=new q(S);if(null==e?e=D:w(e,0,d),u=i(e/c),C)if(crypto.getRandomValues){for(t=crypto.getRandomValues(new Uint32Array(u*=2));f<u;)(a=131072*t[f]+(t[f+1]>>>11))>=9e15?(n=crypto.getRandomValues(new Uint32Array(2)),t[f]=n[0],t[f+1]=n[1]):(h.push(a%1e14),f+=2);f=u/2}else{if(!crypto.randomBytes)throw C=!1,Error(s+"crypto unavailable");for(t=crypto.randomBytes(u*=7);f<u;)(a=281474976710656*(31&t[f])+1099511627776*t[f+1]+4294967296*t[f+2]+16777216*t[f+3]+(t[f+4]<<16)+(t[f+5]<<8)+t[f+6])>=9e15?crypto.randomBytes(7).copy(t,f):(h.push(a%1e14),f+=7);f=u/7}if(!C)for(;f<u;)(a=A())<9e15&&(h[f++]=a%1e14);for(u=h[--f],e%=c,u&&e&&(a=l[c-e],h[f]=o(u/a)*a);0===h[f];h.pop(),f--);if(f<0)h=[r=0];else{for(r=-1;0===h[0];h.splice(0,1),r-=c);for(f=1,a=h[0];a>=10;a/=10,f++);f<c&&(r-=c-f)}return p.e=r,p.c=h,p}),q.sum=function(){for(var e=1,t=arguments,n=new q(t[0]);e<t.length;)n=n.plus(t[e++]);return n},y=function(){var e="0123456789";function t(e,t,n,r){for(var i,o,s=[0],u=0,a=e.length;u<a;){for(o=s.length;o--;s[o]*=t);for(s[0]+=r.indexOf(e.charAt(u++)),i=0;i<s.length;i++)s[i]>n-1&&(null==s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/n|0,s[i]%=n)}return s.reverse()}return function(r,i,o,s,u){var a,c,f,l,h,d,p,m,w=r.indexOf("."),b=D,v=k;for(w>=0&&(l=j,j=0,r=r.replace(".",""),d=(m=new q(i)).pow(r.length-w),j=l,m.c=t(O(g(d.c),d.e,"0"),10,o,e),m.e=m.c.length),f=l=(p=t(r,i,o,u?(a=$,e):(a=e,$))).length;0==p[--l];p.pop());if(!p[0])return a.charAt(0);if(w<0?--f:(d.c=p,d.e=f,d.s=s,p=(d=n(d,m,b,v,o)).c,h=d.r,f=d.e),w=p[c=f+b+1],l=o/2,h=h||c<0||null!=p[c+1],h=v<4?(null!=w||h)&&(0==v||v==(d.s<0?3:2)):w>l||w==l&&(4==v||h||6==v&&1&p[c-1]||v==(d.s<0?8:7)),c<1||!p[0])r=h?O(a.charAt(1),-b,a.charAt(0)):a.charAt(0);else{if(p.length=c,h)for(--o;++p[--c]>o;)p[c]=0,c||(++f,p=[1].concat(p));for(l=p.length;!p[--l];);for(w=0,r="";w<=l;r+=a.charAt(p[w++]));r=O(r,f,a.charAt(0))}return r}}(),n=function(){function e(e,t,n){var r,i,o,s,u=0,a=e.length,c=t%h,f=t/h|0;for(e=e.slice();a--;)u=((i=c*(o=e[a]%h)+(r=f*o+(s=e[a]/h|0)*c)%h*h+u)/n|0)+(r/h|0)+f*s,e[a]=i%n;return u&&(e=[u].concat(e)),e}function t(e,t,n,r){var i,o;if(n!=r)o=n>r?1:-1;else for(i=o=0;i<n;i++)if(e[i]!=t[i]){o=e[i]>t[i]?1:-1;break}return o}function n(e,t,n,r){for(var i=0;n--;)e[n]-=i,i=e[n]<t[n]?1:0,e[n]=i*r+e[n]-t[n];for(;!e[0]&&e.length>1;e.splice(0,1));}return function(r,i,s,u,f){var l,h,d,g,m,w,b,v,O,y,N,E,A,_,L,T,x,I=r.s==i.s?1:-1,P=r.c,S=i.c;if(!(P&&P[0]&&S&&S[0]))return new q(r.s&&i.s&&(P?!S||P[0]!=S[0]:S)?P&&0==P[0]||!S?0*I:I/0:NaN);for(O=(v=new q(I)).c=[],I=s+(h=r.e-i.e)+1,f||(f=a,h=p(r.e/c)-p(i.e/c),I=I/c|0),d=0;S[d]==(P[d]||0);d++);if(S[d]>(P[d]||0)&&h--,I<0)O.push(1),g=!0;else{for(_=P.length,T=S.length,d=0,I+=2,(m=o(f/(S[0]+1)))>1&&(S=e(S,m,f),P=e(P,m,f),T=S.length,_=P.length),A=T,N=(y=P.slice(0,T)).length;N<T;y[N++]=0);x=S.slice(),x=[0].concat(x),L=S[0],S[1]>=f/2&&L++;do{if(m=0,(l=t(S,y,T,N))<0){if(E=y[0],T!=N&&(E=E*f+(y[1]||0)),(m=o(E/L))>1)for(m>=f&&(m=f-1),b=(w=e(S,m,f)).length,N=y.length;1==t(w,y,b,N);)m--,n(w,T<b?x:S,b,f),b=w.length,l=1;else 0==m&&(l=m=1),b=(w=S.slice()).length;if(b<N&&(w=[0].concat(w)),n(y,w,N,f),N=y.length,-1==l)for(;t(S,y,T,N)<1;)m++,n(y,T<N?x:S,N,f),N=y.length}else 0===l&&(m++,y=[0]);O[d++]=m,y[0]?y[N++]=P[A]||0:(y=[P[A]],N=1)}while((A++<_||null!=y[0])&&I--);g=null!=y[0],O[0]||O.splice(0,1)}if(f==a){for(d=1,I=O[0];I>=10;I/=10,d++);J(v,s+(v.e=d+h*c-1)+1,u,g)}else v.e=h,v.r=+g;return v}}(),_=/^(-?)0([xbo])(?=\w[\w.]*$)/i,L=/^([^.]+)\.$/,T=/^\.([^.]+)$/,x=/^-?(Infinity|NaN)$/,I=/^\s*\+(?=[\w.])|^\s+|\s+$/g,N=function(e,t,n,r){var i,o=n?t:t.replace(I,"");if(x.test(o))e.s=isNaN(o)?null:o<0?-1:1;else{if(!n&&(o=o.replace(_,(function(e,t,n){return i="x"==(n=n.toLowerCase())?16:"b"==n?2:8,r&&r!=i?e:t})),r&&(i=r,o=o.replace(L,"$1").replace(T,"0.$1")),t!=o))return new q(o,i);if(q.DEBUG)throw Error(s+"Not a"+(r?" base "+r:"")+" number: "+t);e.s=null}e.c=e.e=null},P.absoluteValue=P.abs=function(){var e=new q(this);return e.s<0&&(e.s=1),e},P.comparedTo=function(e,t){return m(this,new q(e,t))},P.decimalPlaces=P.dp=function(e,t){var n,r,i,o=this;if(null!=e)return w(e,0,d),null==t?t=k:w(t,0,8),J(new q(o),e+o.e+1,t);if(!(n=o.c))return null;if(r=((i=n.length-1)-p(this.e/c))*c,i=n[i])for(;i%10==0;i/=10,r--);return r<0&&(r=0),r},P.dividedBy=P.div=function(e,t){return n(this,new q(e,t),D,k)},P.dividedToIntegerBy=P.idiv=function(e,t){return n(this,new q(e,t),0,1)},P.exponentiatedBy=P.pow=function(e,t){var n,r,u,a,f,l,h,d,p=this;if((e=new q(e)).c&&!e.isInteger())throw Error(s+"Exponent not an integer: "+W(e));if(null!=t&&(t=new q(t)),f=e.e>14,!p.c||!p.c[0]||1==p.c[0]&&!p.e&&1==p.c.length||!e.c||!e.c[0])return d=new q(Math.pow(+W(p),f?2-b(e):+W(e))),t?d.mod(t):d;if(l=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new q(NaN);(r=!l&&p.isInteger()&&t.isInteger())&&(p=p.mod(t))}else{if(e.e>9&&(p.e>0||p.e<-1||(0==p.e?p.c[0]>1||f&&p.c[1]>=24e7:p.c[0]<8e13||f&&p.c[0]<=9999975e7)))return a=p.s<0&&b(e)?-0:0,p.e>-1&&(a=1/a),new q(l?1/a:a);j&&(a=i(j/c+2))}for(f?(n=new q(.5),l&&(e.s=1),h=b(e)):h=(u=Math.abs(+W(e)))%2,d=new q(S);;){if(h){if(!(d=d.times(p)).c)break;a?d.c.length>a&&(d.c.length=a):r&&(d=d.mod(t))}if(u){if(0===(u=o(u/2)))break;h=u%2}else if(J(e=e.times(n),e.e+1,1),e.e>14)h=b(e);else{if(0==(u=+W(e)))break;h=u%2}p=p.times(p),a?p.c&&p.c.length>a&&(p.c.length=a):r&&(p=p.mod(t))}return r?d:(l&&(d=S.div(d)),t?d.mod(t):a?J(d,j,k,void 0):d)},P.integerValue=function(e){var t=new q(this);return null==e?e=k:w(e,0,8),J(t,t.e+1,e)},P.isEqualTo=P.eq=function(e,t){return 0===m(this,new q(e,t))},P.isFinite=function(){return!!this.c},P.isGreaterThan=P.gt=function(e,t){return m(this,new q(e,t))>0},P.isGreaterThanOrEqualTo=P.gte=function(e,t){return 1===(t=m(this,new q(e,t)))||0===t},P.isInteger=function(){return!!this.c&&p(this.e/c)>this.c.length-2},P.isLessThan=P.lt=function(e,t){return m(this,new q(e,t))<0},P.isLessThanOrEqualTo=P.lte=function(e,t){return-1===(t=m(this,new q(e,t)))||0===t},P.isNaN=function(){return!this.s},P.isNegative=function(){return this.s<0},P.isPositive=function(){return this.s>0},P.isZero=function(){return!!this.c&&0==this.c[0]},P.minus=function(e,t){var n,r,i,o,s=this,u=s.s;if(t=(e=new q(e,t)).s,!u||!t)return new q(NaN);if(u!=t)return e.s=-t,s.plus(e);var f=s.e/c,l=e.e/c,h=s.c,d=e.c;if(!f||!l){if(!h||!d)return h?(e.s=-t,e):new q(d?s:NaN);if(!h[0]||!d[0])return d[0]?(e.s=-t,e):new q(h[0]?s:3==k?-0:0)}if(f=p(f),l=p(l),h=h.slice(),u=f-l){for((o=u<0)?(u=-u,i=h):(l=f,i=d),i.reverse(),t=u;t--;i.push(0));i.reverse()}else for(r=(o=(u=h.length)<(t=d.length))?u:t,u=t=0;t<r;t++)if(h[t]!=d[t]){o=h[t]<d[t];break}if(o&&(i=h,h=d,d=i,e.s=-e.s),(t=(r=d.length)-(n=h.length))>0)for(;t--;h[n++]=0);for(t=a-1;r>u;){if(h[--r]<d[r]){for(n=r;n&&!h[--n];h[n]=t);--h[n],h[r]+=a}h[r]-=d[r]}for(;0==h[0];h.splice(0,1),--l);return h[0]?V(e,h,l):(e.s=3==k?-1:1,e.c=[e.e=0],e)},P.modulo=P.mod=function(e,t){var r,i,o=this;return e=new q(e,t),!o.c||!e.s||e.c&&!e.c[0]?new q(NaN):!e.c||o.c&&!o.c[0]?new q(o):(9==G?(i=e.s,e.s=1,r=n(o,e,0,3),e.s=i,r.s*=i):r=n(o,e,0,G),(e=o.minus(r.times(e))).c[0]||1!=G||(e.s=o.s),e)},P.multipliedBy=P.times=function(e,t){var n,r,i,o,s,u,f,l,d,g,m,w,b,v,O,y=this,N=y.c,E=(e=new q(e,t)).c;if(!(N&&E&&N[0]&&E[0]))return!y.s||!e.s||N&&!N[0]&&!E||E&&!E[0]&&!N?e.c=e.e=e.s=null:(e.s*=y.s,N&&E?(e.c=[0],e.e=0):e.c=e.e=null),e;for(r=p(y.e/c)+p(e.e/c),e.s*=y.s,(f=N.length)<(g=E.length)&&(b=N,N=E,E=b,i=f,f=g,g=i),i=f+g,b=[];i--;b.push(0));for(v=a,O=h,i=g;--i>=0;){for(n=0,m=E[i]%O,w=E[i]/O|0,o=i+(s=f);o>i;)n=((l=m*(l=N[--s]%O)+(u=w*l+(d=N[s]/O|0)*m)%O*O+b[o]+n)/v|0)+(u/O|0)+w*d,b[o--]=l%v;b[o]=n}return n?++r:b.splice(0,1),V(e,b,r)},P.negated=function(){var e=new q(this);return e.s=-e.s||null,e},P.plus=function(e,t){var n,r=this,i=r.s;if(t=(e=new q(e,t)).s,!i||!t)return new q(NaN);if(i!=t)return e.s=-t,r.minus(e);var o=r.e/c,s=e.e/c,u=r.c,f=e.c;if(!o||!s){if(!u||!f)return new q(i/0);if(!u[0]||!f[0])return f[0]?e:new q(u[0]?r:0*i)}if(o=p(o),s=p(s),u=u.slice(),i=o-s){for(i>0?(s=o,n=f):(i=-i,n=u),n.reverse();i--;n.push(0));n.reverse()}for((i=u.length)-(t=f.length)<0&&(n=f,f=u,u=n,t=i),i=0;t;)i=(u[--t]=u[t]+f[t]+i)/a|0,u[t]=a===u[t]?0:u[t]%a;return i&&(u=[i].concat(u),++s),V(e,u,s)},P.precision=P.sd=function(e,t){var n,r,i,o=this;if(null!=e&&e!==!!e)return w(e,1,d),null==t?t=k:w(t,0,8),J(new q(o),e,t);if(!(n=o.c))return null;if(r=(i=n.length-1)*c+1,i=n[i]){for(;i%10==0;i/=10,r--);for(i=n[0];i>=10;i/=10,r++);}return e&&o.e+1>r&&(r=o.e+1),r},P.shiftedBy=function(e){return w(e,-9007199254740991,f),this.times("1e"+e)},P.squareRoot=P.sqrt=function(){var e,t,r,i,o,s=this,u=s.c,a=s.s,c=s.e,f=D+4,l=new q("0.5");if(1!==a||!u||!u[0])return new q(!a||a<0&&(!u||u[0])?NaN:u?s:1/0);if(0==(a=Math.sqrt(+W(s)))||a==1/0?(((t=g(u)).length+c)%2==0&&(t+="0"),a=Math.sqrt(+t),c=p((c+1)/2)-(c<0||c%2),r=new q(t=a==1/0?"5e"+c:(t=a.toExponential()).slice(0,t.indexOf("e")+1)+c)):r=new q(a+""),r.c[0])for((a=(c=r.e)+f)<3&&(a=0);;)if(o=r,r=l.times(o.plus(n(s,o,f,1))),g(o.c).slice(0,a)===(t=g(r.c)).slice(0,a)){if(r.e<c&&--a,"9999"!=(t=t.slice(a-3,a+1))&&(i||"4999"!=t)){+t&&(+t.slice(1)||"5"!=t.charAt(0))||(J(r,r.e+D+2,1),e=!r.times(r).eq(s));break}if(!i&&(J(o,o.e+D+2,0),o.times(o).eq(s))){r=o;break}f+=4,a+=4,i=1}return J(r,r.e+D+1,k,e)},P.toExponential=function(e,t){return null!=e&&(w(e,0,d),e++),H(this,e,t,1)},P.toFixed=function(e,t){return null!=e&&(w(e,0,d),e=e+this.e+1),H(this,e,t)},P.toFormat=function(e,t,n){var r,i=this;if(null==n)null!=e&&t&&"object"==typeof t?(n=t,t=null):e&&"object"==typeof e?(n=e,e=t=null):n=F;else if("object"!=typeof n)throw Error(s+"Argument not an object: "+n);if(r=i.toFixed(e,t),i.c){var o,u=r.split("."),a=+n.groupSize,c=+n.secondaryGroupSize,f=n.groupSeparator||"",l=u[0],h=u[1],d=i.s<0,p=d?l.slice(1):l,g=p.length;if(c&&(o=a,a=c,c=o,g-=o),a>0&&g>0){for(o=g%a||a,l=p.substr(0,o);o<g;o+=a)l+=f+p.substr(o,a);c>0&&(l+=f+p.slice(o)),d&&(l="-"+l)}r=h?l+(n.decimalSeparator||"")+((c=+n.fractionGroupSize)?h.replace(new RegExp("\\d{"+c+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):h):l}return(n.prefix||"")+r+(n.suffix||"")},P.toFraction=function(e){var t,r,i,o,u,a,f,h,d,p,m,w,b=this,v=b.c;if(null!=e&&(!(f=new q(e)).isInteger()&&(f.c||1!==f.s)||f.lt(S)))throw Error(s+"Argument "+(f.isInteger()?"out of range: ":"not an integer: ")+W(f));if(!v)return new q(b);for(t=new q(S),d=r=new q(S),i=h=new q(S),w=g(v),u=t.e=w.length-b.e-1,t.c[0]=l[(a=u%c)<0?c+a:a],e=!e||f.comparedTo(t)>0?u>0?t:d:f,a=B,B=1/0,f=new q(w),h.c[0]=0;p=n(f,t,0,1),1!=(o=r.plus(p.times(i))).comparedTo(e);)r=i,i=o,d=h.plus(p.times(o=d)),h=o,t=f.minus(p.times(o=t)),f=o;return o=n(e.minus(r),i,0,1),h=h.plus(o.times(d)),r=r.plus(o.times(i)),h.s=d.s=b.s,m=n(d,i,u*=2,k).minus(b).abs().comparedTo(n(h,r,u,k).minus(b).abs())<1?[d,i]:[h,r],B=a,m},P.toNumber=function(){return+W(this)},P.toPrecision=function(e,t){return null!=e&&w(e,1,d),H(this,e,t,2)},P.toString=function(e){var t,n=this,r=n.s,i=n.e;return null===i?r?(t="Infinity",r<0&&(t="-"+t)):t="NaN":(null==e?t=i<=U||i>=R?v(g(n.c),i):O(g(n.c),i,"0"):10===e?t=O(g((n=J(new q(n),D+i+1,k)).c),n.e,"0"):(w(e,2,$.length,"Base"),t=y(O(g(n.c),i,"0"),10,e,r,!0)),r<0&&n.c[0]&&(t="-"+t)),t},P.valueOf=P.toJSON=function(){return W(this)},P._isBigNumber=!0,null!=t&&q.set(t),q}(),n.default=n.BigNumber=n,e.exports?e.exports=n:(t||(t="undefined"!=typeof self&&self?self:window),t.BigNumber=n)}(d)},l(h={exports:{}},h.exports);const p=document,g=navigator.userAgent;0===navigator.platform.indexOf("iP")||"MacIntel"===navigator.platform&&navigator.maxTouchPoints;g.indexOf("Trident"),g.indexOf("Firefox");/android/i.test(g);/Mobile/i.test(g),/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(g),/electron/i.test(g),"not all"!==window.matchMedia("(prefers-color-scheme)").media&&window.matchMedia("(prefers-color-scheme: dark)").matches,/safari|chrome/i.test(g);function m(){var e;return(null===(e=window.__vidylens__)||void 0===e?void 0:e.injected)||!1}function w(){return Math.random().toString(36).substring(4)}p.implementation&&p.implementation.hasFeature&&!0!==p.implementation.hasFeature("","")&&p.implementation.hasFeature("Events.wheel","3.0");const b="vidy:sdk:uid";function v(){return c(b)||[w(),w()].join(".")}function O(e){f(b,e)}const y=u(c(b)||"");y.subscribe(O);const N="vidy:sdk:token";function E(){return c(N)||""}function A(e){f(N,e)}const _=u(E());_.subscribe(A);const L="vidy:sdk:user";function T(){return c(L)||!1}function x(e){f(L,e)}function I(e,t){t.headers=e.headers||{},t.statusMessage=e.statusText,t.statusCode=e.status,t.data=e.response}function P(e,t,n,r={}){r.headers=r.headers||{};const i=o(_),s=o(y);return i&&(r.headers.authorization=`Bearer ${i}`),n&&(r.body=n),s&&!/get/i.test(e)&&(t+=(~t.indexOf("?")?"&":"?")+`uid=${encodeURIComponent(s)}`),function(e,t,n){return new Promise((function(r,i){n=n||{};var o,s,u,a=new XMLHttpRequest,c=n.body,f=n.headers||{};for(o in n.timeout&&(a.timeout=n.timeout),a.ontimeout=a.onerror=function(e){e.timeout="timeout"==e.type,i(e)},a.open(e,t.href||t),a.onload=function(){for(u=a.getAllResponseHeaders().trim().split(/[\r\n]+/),I(a,a);s=u.shift();)s=s.split(": "),a.headers[s.shift().toLowerCase()]=s.join(": ");if((s=a.headers["content-type"])&&~s.indexOf("application/json"))try{a.data=JSON.parse(a.data,n.reviver)}catch(e){return I(a,e),i(e)}(a.status>=400?i:r)(a)},typeof FormData<"u"&&c instanceof FormData||c&&"object"==typeof c&&(f["content-type"]="application/json",c=JSON.stringify(c)),a.withCredentials=!!n.withCredentials,f)a.setRequestHeader(o,f[o]);a.send(c)}))}(e,`https://api.vidy.com/${t}`,r)}u(T()).subscribe(x);const S=u(""),D=u(""),k=u("");a(k,(e=>function(e){return"https://dashboard.vidy.com"===e||"vidy://"===e}(e)),!1),a(k,(e=>function(e){return"https://dash.vidy.com"===e}(e)),!1);const U={enable_profile:!1,enable_reactions:!1,enable_coinpill:!1,dfp_tag:"",encourage_audio:!0},R=u(!1),M=a(S,((e,t)=>{e?function(e){return P("GET",`apps/${e}/settings`).then((e=>{var t;return Object.assign(Object.assign({disabled:e.data.data.disabled,content_field:e.data.data.content_field,maint:!1,enable_profile:m()||e.data.data.sdk_profile,enable_reactions:e.data.data.sdk_reactions,enable_coinpill:e.data.data.sdk_coin_pill,dfp_tag:e.data.data.dfp_tag,orgid:e.data.data.orgid},e.data.data.features),{min_account_func:!0,prebid:Object.assign({},null===(t=e.data.data.features)||void 0===t?void 0:t.prebid)})}))}(e).then((e=>{t(e),D.set(e.orgid),R.set(!0)})):t(U)}),U),B="vidy:sdk:theme",C="dark",G=u(j());function j(){return c(B)||C}function F(e="dark"){f(B,e),G.set(e)}a([M,G],(([e,t])=>e.themeable?t:C));let $="";function q(e,t=null){window.parent.postMessage({name:e,data:t},$)}function H(){const e=location.search.substring(1).split("=");return decodeURIComponent(e[1]||"")}function z(e){const n=e.data,r=n.data||{},i=T(),o=E(),s=v();switch(n.name){case t.INIT:o?q(t.LOGIN,{token:o,user:i,uid:s}):q(t.LOGOUT);break;case t.LOGIN:r.token&&(O(r.uid),A(r.token),x(r.user),q(t.LOGIN,{user:T(),token:E(),uid:v()}));break;case t.LOGOUT:{O(""),x(!1),A(""),F();const e=v();O(e),q(t.LOGOUT,{uid:e});break}case t.UPDATE:r.user&&(x(r.user),q(t.UPDATE,{user:T()})),r.theme&&F(r.theme)}}return addEventListener("message",z,!1),window.onload=()=>{$=H();const e=v();O(e);const n=T(),r=E(),i=j();q(t.LOADED,{uid:e,theme:i,user:n,token:r})},e.receiveMessage=z,e.toOrigin=H,Object.defineProperty(e,"__esModule",{value:!0}),e}({});