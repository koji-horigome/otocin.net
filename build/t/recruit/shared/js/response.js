// Response 0.6.1 | responsejs.com | MIT License
(function(f){this.Response=f()})(function(f){function w(){return k.clientWidth}function x(){return k.clientHeight}function n(a){throw new TypeError(a||o);}function y(a){return"string"===typeof a?a.split(ma):J(a)?a:[]}function $(a){return a.replace(K,"$1").replace(na,function(a,c){return c.toUpperCase()})}function z(a){return"data-"+(a?a.replace(K,"$1").replace(oa,"$1-$2").toLowerCase():a)}function A(a){return!a?!1:1===a.nodeType?a:a[0]&&1===a[0].nodeType?a[0]:!1}function L(a,b,c){for(var d=[],e=-1,
f=a.length;e++<f;)e in a&&(d[e]=b.call(c,a[e]));return d}function j(a,b){var c,d=a.length;for(c=0;c<d;c++)c in a&&b(a[c],c,a);return a}function M(a,b,c){for(var d=[],e=a.length,b=b||"",c=c||"";e&&e--;)e in a&&(d[e]=b+a[e]+c);return d}function l(a,b,c){var d=-1,e=[],f=a.length;if(b)for(c=!!c;d++<f;)c===!b(a[d],d)&&e.push(a[d]);else for(;d++<f;)a[d]&&e.push(a[d]);return e}function aa(a){var b;return!a||"string"!==typeof a?a:"true"===a?!0:"false"===a?!1:"undefined"===a?b:"null"===a?null:(b=parseFloat(a))===
+b?b:a}function N(a,b,c){if(a&&b){var d,e=b.length;if(!isFinite(e)||"function"===typeof b)for(d in e=!!b.hasOwnProperty,b){if((!e||b.hasOwnProperty(d))&&(c||b[d]))a[d]=b[d]}else for(d=0;d<e;d++)if(d in b&&(c||b[d]))a[d]=b[d]}return a}function B(a,b){return a&&"object"===typeof a&&"number"===typeof a.length?j(a,b):b(a)}function C(a){return function(b,c){var d=a(),b=d>=(b||0);return!c?b:b&&d<=c}}function p(a,b){var c=arguments.length,d=A(this),e={},f=!1,h;if(c){J(a)&&(f=!0,a=a[0]);if("string"===typeof a){a=
z(a);if(1===c)return e=d.getAttribute(a),f?aa(e):e;if(this===d||2>(h=this.length||1))d.setAttribute(a,b);else for(;h--;)h in this&&p.apply(this[h],arguments)}else if(a instanceof Object)for(h in a)a.hasOwnProperty(h)&&p.call(this,h,a[h]);return this}if(d.dataset&&DOMStringMap)return d.dataset;j(d.attributes,function(a){if(a&&(h=String(a.name).match(K)))e[$(h[1])]=a.value});return e}function ba(a){this&&"string"===typeof a&&(a=y(a),B(this,function(b){j(a,function(a){a&&b.removeAttribute(z(a))})}));
return this}function D(a,b,c){return p.apply(a,pa.call(arguments,1))}function O(a,b){var c=a.getBoundingClientRect?a.getBoundingClientRect():{},b="number"===typeof b?b:0;return{top:(c.top||0)-b,left:(c.left||0)-b,bottom:(c.bottom||0)+b,right:(c.right||0)+b}}function P(a,b){var c=O(A(a),b);return!!c&&0<=c.bottom&&c.top<=x()&&0<=c.right&&c.left<=w()}function q(a){var b=m.devicePixelRatio;if(!arguments.length)return b||(q(2)?2:q(1.5)?1.5:q(1)?1:0);if(!isFinite(a))return!1;if(b)return b>=a;a="only all and (min--moz-device-pixel-ratio:"+
a+")";return!E?!1:E(a).matches||E(a.replace("-moz-","")).matches}function ca(a){var b={img:1,input:1,source:3,embed:3,track:3,iframe:5,audio:5,video:5,script:5}[a.tagName.toLowerCase()]||-1;return 4>b?b:"string"===typeof a.getAttribute("src")?5:-5}function da(a,b,c){a&&b||n("store");var d,e=a.length,c=!!c;if(e)for(;e--;)if(e in a&&(d=a[e],c||!D(d,b)))D(d,b,0<ca(d)?d.getAttribute("src"):f(d).html()||"");return g}function Q(a){for(var b=[],c=a.length;c&&c--;)a[c]&&(b[c]="["+z(a[c].replace(R,"").replace(".",
"\\."))+"]");return b.join()}function S(a,b){return a&&b&&b.length?L(y(b),p,a):[]}function T(a){r.on("resize",a);return g}function ea(a){B(a,function(a){a===Object(a)||n("create @args");var c=U(fa).configure(a),d,e=c.verge,a=c.breakpoints,f=F("scroll"),h=F("resize");a.length&&(d=a[0]||a[1]||!1,G(function(){function a(){c.reset();j(c.$e,function(a,b){c[b].decideValue().updateDOM()}).trigger(g)}function b(){j(c.$e,function(a,b){P(c[b].$e,e)&&c[b].updateDOM()})}var g=V.allLoaded,i=!!c.lazy;j(c.target().$e,
function(a,b){c[b]=U(c).prepareData(a);(!i||P(c[b].$e,e))&&c[b].updateDOM()});c.dynamic&&(c.custom||d<s)&&T(a,h);i&&(r.on(f,b),c.$e.one(g,function(){r.off(f,b)}))}))});return g}function W(a,b){if("function"===typeof a&&a.fn||!arguments.length&&(a=f)){if(b||!a.fn.dataset)a.fn.dataset=p;if(b||!a.fn.deletes)a.fn.deletes=ba;var c=a,d=a.fn;j(["inX","inY","inViewport"],function(a){(b||!d[a])&&(d[a]=function(b,d){return c(l(this,function(c){return c&&!d===g[a](c,b)}))})})}return g}var f=f||this.jQuery||
this.Zepto||this.ender,X=this,g,o="Response",qa=X[o],ga="i"+o,m=window,ha=document,k=ha.documentElement,G=f.domReady||f,r=f(m),pa=[].slice,t=m.screen,J=Array.isArray||function(a){return a instanceof Array},fa,Y,u={},i={},ia={},v={all:[]},H=t.width,I=t.height,s=H>I?H:I,ra=H+I-s,ja=function(){return H},ka=function(){return I},sa=/[^a-z0-9_\-\.]/gi,oa=/([a-z])([A-Z])/g,na=/-(.)/g,K=/^data-(.+)$/,ma=/\s+/,R=/^[\W\s]+|[\W\s]+$|/g,E=m.matchMedia||m.msMatchMedia||Object,U=Object.create||function(a){function b(){}
b.prototype=a;return new b},F=function(a,b){b=b||o;return a.replace(R,"")+"."+b.replace(R,"")},V={allLoaded:F("allLoaded"),crossover:F("crossover")},t=C(w);Y=C(x);u.band=C(ja);u.wave=C(ka);var ta=function(a){return"string"===typeof a?a.toLowerCase().replace(sa,""):""},la=V.crossover,Z=[],ua=Math.min;fa={e:0,$e:0,mode:0,breakpoints:0,prefix:0,prop:"width",keys:[],dynamic:0,custom:0,values:[],fn:0,verge:null,newValue:0,currValue:1,aka:0,lazy:0,i:0,selector:0,valid8:function(){var a,b,c;J(a=this.breakpoints)?
(a=(b=a.length===l(a,isFinite).length)?a.sort(function(a,b){return a-b}):l(a,function(a){return!!a||0===a}),a.length||n("create @breakpoints")):(c={width:[0,320,481,641,961,1025,1281],height:[0,481],ratio:[1,1.5,2]},a=this.prop,a=c[a]||c[a.split("-").pop()]||n("create @prop"));this.breakpoints=b?l(a,function(a){return a<=s}):a},reset:function(){var a=this.breakpoints,b=a.length,c=0;for(Z=[!0];!c&&b--;)this.memoize(a[b])&&(c=b);c!==this.i&&(r.trigger(la).trigger(this.prop+la),this.i=c||0);return this},
memoize:function(a){var b=Z[a];b!==!!b&&(Z[a]=b=!!this.fn(a));return b},configure:function(a){var b,c;N(this,a,!0);this.verge=isFinite(this.verge)?this.verge:ua(s,500);this.fn=i[this.prop]||n("create @fn");0===this.dynamic&&(this.dynamic="device"!==this.prop.substring(0,6));this.custom=ia[this.prop];b=this.prefix?l(L(y(this.prefix),ta)):["min-"+this.prop+"-"];a=1<b.length?b.slice(1):0;this.prefix=b[0];this.valid8();this.keys=M(this.breakpoints,this.prefix);this.aka=!1;if(a){c=[];for(b=a.length;b--;)c.push(M(this.breakpoints,
a[b]));this.aka=c}v[this.prop]=a=[].concat.apply(this.keys,this.aka||[]);v.all=v.all.concat(a);this.selector=Q(a);return this},target:function(){this.$e=f(this.selector);da(this.$e,ga);this.keys.push(ga);return this},decideValue:function(){for(var a=null,b=this.breakpoints,c=b.length,d=c;null==a&&d--;)this.memoize(b[d])&&(a=this.values[d]);this.newValue="string"===typeof a?a:this.values[c];return this},prepareData:function(a){this.e=a;this.$e=f(a);this.mode=ca(this.e);this.values=S(this.$e,this.keys);
if(this.aka)for(a=this.aka.length;a--;)this.values=N(this.values,S(this.$e,this.aka[a]));return this.decideValue()},updateDOM:function(){if(this.currValue===this.newValue)return this;this.currValue=this.newValue;0<this.mode?this.e.setAttribute("src",this.newValue):this.$e.html(this.newValue);return this}};i.width=t;i.height=Y;i["device-width"]=u.band;i["device-height"]=u.wave;i["device-pixel-ratio"]=q;g={deviceMin:function(){return ra},deviceMax:function(){return s},sets:function(a){return f(Q(v[a]||
v.all))},noConflict:function(a){X[o]=qa;"function"===typeof a&&a.call(X,g);return g},chain:W,bridge:W,create:ea,addTest:function(a,b){"string"===typeof a&&"function"===typeof b&&(i[a]=b,ia[a]=1);return g},datatize:z,camelize:$,render:aa,store:da,access:S,target:function(a){return f(Q(y(a)))},object:U,crossover:function(a,b){var c=V.crossover;r.on(b?b+c:c,a);return g},action:function(a){B(a,function(a){G(a);T(a)});return g},resize:T,ready:G,affix:M,sift:l,dpr:q,deletes:function(a,b){return ba.call(a,
b)},scrollX:function(){return window.pageXOffset||k.scrollLeft},scrollY:function(){return window.pageYOffset||k.scrollTop},deviceW:ja,deviceH:ka,device:u,inX:function(a,b){var c=O(A(a),b);return!!c&&0<=c.right&&c.left<=w()},inY:function(a,b){var c=O(A(a),b);return!!c&&0<=c.bottom&&c.top<=x()},route:B,merge:N,media:E,wave:Y,band:t,map:L,each:j,inViewport:P,dataset:D,viewportH:x,viewportW:w};G(function(a){if(a=D(ha.body,"responsejs"))a=m.JSON&&JSON.parse?JSON.parse(a):f.parseJSON?f.parseJSON(a):{},
a.create&&ea(a.create);k.className=k.className.replace(/(^|\s)(no-)?responsejs(\s|$)/,"$1$3")+" responsejs "});return W(f)});