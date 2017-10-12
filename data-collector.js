!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(e.braintree||(e.braintree={})).dataCollector=t()}}(function(){var t;return function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var h=n[s]={exports:{}};t[s][0].call(h.exports,function(e){var n=t[s][1][e];return i(n?n:e)},h,h.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(t,e,n){"use strict";function r(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}e.exports=r},{}],2:[function(t,e,n){"use strict";function r(t){var e=!1;return function(){e||(e=!0,t.apply(null,arguments))}}e.exports=r},{}],3:[function(t,e,n){"use strict";function r(t,e){return e?void t.then(function(t){e(null,t)})["catch"](function(t){e(t)}):t}e.exports=r},{}],4:[function(t,e,n){"use strict";function r(t){return function(){var e,n=Array.prototype.slice.call(arguments),r=n[n.length-1];return"function"==typeof r&&(e=n.pop(),e=o(i(e))),s(t.apply(this,n),e)}}var i=t("./lib/deferred"),o=t("./lib/once"),s=t("./lib/promise-or-callback");r.wrapPrototype=function(t,e){var n,i,o;return e=e||{},i=e.ignoreMethods||[],o=e.transformPrivateMethods===!0,n=Object.getOwnPropertyNames(t.prototype).filter(function(e){var n,r="constructor"!==e&&"function"==typeof t.prototype[e],s=-1===i.indexOf(e);return n=o?!0:"_"!==e.charAt(0),r&&n&&s}),n.forEach(function(e){var n=t.prototype[e];t.prototype[e]=r(n)}),t},e.exports=r},{"./lib/deferred":1,"./lib/once":2,"./lib/promise-or-callback":3}],5:[function(t,e,n){!function(t){function n(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],h(t,this)}function o(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:a)(e.promise,t._value);var r;try{r=n(t._value)}catch(i){return void a(e.promise,i)}s(e.promise,r)}))}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void c(t);if("function"==typeof n)return void h(r(n,e),t)}t._state=1,t._value=e,c(t)}catch(o){a(t,o)}}function a(t,e){t._state=2,t._value=e,c(t)}function c(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;n>e;e++)o(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function h(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,a(e,t))})}catch(r){if(n)return;n=!0,a(e,r)}}var f=setTimeout;i.prototype["catch"]=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var r=new this.constructor(n);return o(this,new u(t,e,r)),r},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function r(o,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){r(o,t)},n)}e[o]=s,0===--i&&t(e)}catch(c){n(c)}}if(0===e.length)return t([]);for(var i=e.length,o=0;o<e.length;o++)r(o,e[o])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var r=0,i=t.length;i>r;r++)t[r].then(e,n)})},i._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){f(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},"undefined"!=typeof e&&e.exports?e.exports=i:t.Promise||(t.Promise=i)}(this)},{}],6:[function(t,e,n){"use strict";var r=t("../lib/braintree-error");e.exports={DATA_COLLECTOR_KOUNT_NOT_ENABLED:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_NOT_ENABLED",message:"Kount is not enabled for this merchant."},DATA_COLLECTOR_KOUNT_ERROR:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_ERROR"},DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS",message:"Data Collector must be created with Kount and/or PayPal."}}},{"../lib/braintree-error":12}],7:[function(t,e,n){"use strict";function r(){return new i}function i(){this.sessionId=o(),this._beaconId=s(this.sessionId),this._parameterBlock=a(this.sessionId,this._beaconId),this._thirdPartyBlock=c()}function o(){var t,e="";for(t=0;32>t;t++)e+=Math.floor(16*Math.random()).toString(16);return e}function s(t){var e=(new Date).getTime()/1e3;return"https://b.stats.paypal.com/counter.cgi?i=127.0.0.1&p="+t+"&t="+e+"&a=14"}function a(t,e){var n=document.body.appendChild(document.createElement("script"));return n.type="application/json",n.setAttribute("fncls","fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99"),n.text=JSON.stringify({f:t,s:"BRAINTREE_SIGNIN",b:e}),n}function c(){function t(){n._l()}var e,n,r="https://www.paypalobjects.com/webstatic/r/fb/",i=document.createElement("iframe");i.src="about:blank",i.title="",i.role="presentation",(i.frameElement||i).style.cssText="width: 0; height: 0; border: 0; position: absolute; z-index: -999",document.body.appendChild(i);try{n=i.contentWindow.document}catch(o){e=document.domain,i.src='javascript:var d=document.open();d.domain="'+e+'";void(0);',n=i.contentWindow.document}return n.open()._l=function(){var t=this.createElement("script");e&&(this.domain=e),t.id="js-iframe-async",t.src=r+"fb-all-prod.pp.min.js",this.body.appendChild(t)},i.addEventListener?i.addEventListener("load",t,!1):i.attachEvent?i.attachEvent("onload",t):n.write('<body onload="document._l();">'),n.close(),i}i.prototype.teardown=function(){this._thirdPartyBlock.parentNode.removeChild(this._thirdPartyBlock)},e.exports={setup:r}},{}],8:[function(t,e,n){"use strict";function r(t){var e={},n=[],r=i(e,n);return c.verify({name:"Data Collector",client:t.client}).then(function(){var i,c,u,h=t.client.getConfiguration();if(t.kount===!0){if(!h.gatewayConfiguration.kount)return d.reject(new a(p.DATA_COLLECTOR_KOUNT_NOT_ENABLED));try{c=o.setup({environment:h.gatewayConfiguration.environment,merchantId:h.gatewayConfiguration.kount.kountMerchantId})}catch(f){return d.reject(new a({type:p.DATA_COLLECTOR_KOUNT_ERROR.type,code:p.DATA_COLLECTOR_KOUNT_ERROR.code,message:f.message}))}i=c.deviceData,n.push(c)}else i={};return t.paypal===!0&&(u=s.setup(),i.correlation_id=u.sessionId,n.push(u)),0===n.length?d.reject(new a(p.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS)):(e.deviceData=JSON.stringify(i),e.rawDeviceData=i,e.teardown=r,e)})}function i(t,e){return l(function(){return new d(function(n){var r;for(r=0;r<e.length;r++)e[r].teardown();h(t,u(t)),n()})})}var o=t("./kount"),s=t("./fraudnet"),a=t("../lib/braintree-error"),c=t("../lib/basic-component-verification"),u=t("../lib/methods"),h=t("../lib/convert-methods-to-error"),f="3.24.0",d=t("../lib/promise"),l=t("@braintree/wrap-promise"),p=t("./errors");e.exports={create:l(r),VERSION:f}},{"../lib/basic-component-verification":11,"../lib/braintree-error":12,"../lib/convert-methods-to-error":14,"../lib/methods":17,"../lib/promise":18,"./errors":6,"./fraudnet":7,"./kount":9,"@braintree/wrap-promise":4}],9:[function(t,e,n){"use strict";function r(t){var e=null!=t?t:{};return new i(e)}function i(t){var e=i.getCachedDeviceData(t.merchantId);return e?(this.deviceData=e,void(this._isCached=!0)):(this._currentEnvironment=this._initializeEnvironment(t),o.random.startCollectors(),this._deviceSessionId=this._generateDeviceSessionId(),this.deviceData=this._getDeviceData(),i.setCachedDeviceData(t.merchantId,this.deviceData),void(this._iframe=this._setupIFrame()))}var o=t("./vendor/sjcl"),s=t("../lib/camel-case-to-snake-case"),a="https://assets.qa.braintreepayments.com/data",c="braintreeDataFrame-",u={development:a,qa:a,sandbox:"https://assets.braintreegateway.com/sandbox/data",production:"https://assets.braintreegateway.com/data"},h={};i.getCachedDeviceData=function(t){return h[t]},i.setCachedDeviceData=function(t,e){h[t]=e},i.prototype.teardown=function(){this._isCached||(o.random.stopCollectors(),this._removeIframe())},i.prototype._removeIframe=function(){this._iframe.parentNode.removeChild(this._iframe)},i.prototype._getDeviceData=function(){return s({deviceSessionId:this._deviceSessionId,fraudMerchantId:this._currentEnvironment.id})},i.prototype._generateDeviceSessionId=function(){var t,e;return t=o.random.randomWords(4,0),e=o.codec.hex.fromBits(t)},i.prototype._setupIFrame=function(){var t,e,n=this;return t="?m="+this._currentEnvironment.id+"&s="+this._deviceSessionId,e=document.createElement("iframe"),e.width=1,e.id=c+this._deviceSessionId,e.height=1,e.frameBorder=0,e.scrolling="no",document.body.appendChild(e),setTimeout(function(){e.src=n._currentEnvironment.url+"/logo.htm"+t,e.innerHTML='<img src="'+n._currentEnvironment.url+"/logo.gif"+t+'" />'},10),e},i.prototype._initializeEnvironment=function(t){var e=u[t.environment];if(null==e)throw new Error(t.environment+" is not a valid environment for kount.environment");return{url:e,name:t.environment,id:t.merchantId}},e.exports={setup:r,Kount:i,environmentUrls:u}},{"../lib/camel-case-to-snake-case":13,"./vendor/sjcl":10}],10:[function(e,n,r){"use strict";function i(t,e,n){if(4!==e.length)throw new f.exception.invalid("invalid aes block size");var r=t.b[n],i=e[0]^r[0],o=e[n?3:1]^r[1],s=e[2]^r[2];e=e[n?1:3]^r[3];var a,c,u,h,d=r.length/4-2,l=4,p=[0,0,0,0];a=t.l[n],t=a[0];var m=a[1],y=a[2],v=a[3],g=a[4];for(h=0;d>h;h++)a=t[i>>>24]^m[o>>16&255]^y[s>>8&255]^v[255&e]^r[l],c=t[o>>>24]^m[s>>16&255]^y[e>>8&255]^v[255&i]^r[l+1],u=t[s>>>24]^m[e>>16&255]^y[i>>8&255]^v[255&o]^r[l+2],e=t[e>>>24]^m[i>>16&255]^y[o>>8&255]^v[255&s]^r[l+3],l+=4,i=a,o=c,s=u;for(h=0;4>h;h++)p[n?3&-h:h]=g[i>>>24]<<24^g[o>>16&255]<<16^g[s>>8&255]<<8^g[255&e]^r[l++],a=i,i=o,o=s,s=e,e=a;return p}function o(t,e){var n,r,i,o=t.u,s=t.b,a=o[0],c=o[1],u=o[2],h=o[3],f=o[4],d=o[5],l=o[6],p=o[7];for(n=0;64>n;n++)16>n?r=e[n]:(r=e[n+1&15],i=e[n+14&15],r=e[15&n]=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(i>>>17^i>>>19^i>>>10^i<<15^i<<13)+e[15&n]+e[n+9&15]|0),r=r+p+(f>>>6^f>>>11^f>>>25^f<<26^f<<21^f<<7)+(l^f&(d^l))+s[n],p=l,l=d,d=f,f=h+r|0,h=u,u=c,c=a,a=r+(c&u^h&(c^u))+(c>>>2^c>>>13^c>>>22^c<<30^c<<19^c<<10)|0;o[0]=o[0]+a|0,o[1]=o[1]+c|0,o[2]=o[2]+u|0,o[3]=o[3]+h|0,o[4]=o[4]+f|0,o[5]=o[5]+d|0,o[6]=o[6]+l|0,o[7]=o[7]+p|0}function s(t,e){var n,r=f.random.B[t],i=[];for(n in r)r.hasOwnProperty(n)&&i.push(r[n]);for(n=0;n<i.length;n++)i[n](e)}function a(t,e){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?t.addEntropy(window.performance.now(),e,"loadtime"):t.addEntropy((new Date).valueOf(),e,"loadtime")}function c(t){t.b=u(t).concat(u(t)),t.C=new f.cipher.aes(t.b)}function u(t){for(var e=0;4>e&&(t.g[e]=t.g[e]+1|0,!t.g[e]);e++);return t.C.encrypt(t.g)}function h(t,e){return function(){e.apply(t,arguments)}}var f={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};f.cipher.aes=function(t){this.l[0][0][0]||this.G();var e,n,r,i,o=this.l[0][4],s=this.l[1];e=t.length;var a=1;if(4!==e&&6!==e&&8!==e)throw new f.exception.invalid("invalid aes key size");for(this.b=[r=t.slice(0),i=[]],t=e;4*e+28>t;t++)n=r[t-1],(0===t%e||8===e&&4===t%e)&&(n=o[n>>>24]<<24^o[n>>16&255]<<16^o[n>>8&255]<<8^o[255&n],0===t%e&&(n=n<<8^n>>>24^a<<24,a=a<<1^283*(a>>7))),r[t]=r[t-e]^n;for(e=0;t;e++,t--)n=r[3&e?t:t-4],i[e]=4>=t||4>e?n:s[0][o[n>>>24]]^s[1][o[n>>16&255]]^s[2][o[n>>8&255]]^s[3][o[255&n]]},f.cipher.aes.prototype={encrypt:function(t){return i(this,t,0)},decrypt:function(t){return i(this,t,1)},l:[[[],[],[],[],[]],[[],[],[],[],[]]],G:function(){var t,e,n,r,i,o,s,a=this.l[0],c=this.l[1],u=a[4],h=c[4],f=[],d=[];for(t=0;256>t;t++)d[(f[t]=t<<1^283*(t>>7))^t]=t;for(e=n=0;!u[e];e^=r||1,n=d[n]||1)for(o=n^n<<1^n<<2^n<<3^n<<4,o=o>>8^255&o^99,u[e]=o,h[o]=e,i=f[t=f[r=f[e]]],s=16843009*i^65537*t^257*r^16843008*e,i=257*f[o]^16843008*o,t=0;4>t;t++)a[t][e]=i=i<<24^i>>>8,c[t][o]=s=s<<24^s>>>8;for(t=0;5>t;t++)a[t]=a[t].slice(0),c[t]=c[t].slice(0)}},f.bitArray={bitSlice:function(t,e,n){return t=f.bitArray.M(t.slice(e/32),32-(31&e)).slice(1),void 0===n?t:f.bitArray.clamp(t,n-e)},extract:function(t,e,n){var r=Math.floor(-e-n&31);return(-32&(e+n-1^e)?t[e/32|0]<<32-r^t[e/32+1|0]>>>r:t[e/32|0]>>>r)&(1<<n)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e);var n=t[t.length-1],r=f.bitArray.getPartial(n);return 32===r?t.concat(e):f.bitArray.M(e,r,0|n,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length;return 0===e?0:32*(e-1)+f.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t;t=t.slice(0,Math.ceil(e/32));var n=t.length;return e=31&e,n>0&&e&&(t[n-1]=f.bitArray.partial(e,t[n-1]&2147483648>>e-1,1)),t},partial:function(t,e,n){return 32===t?e:(n?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(f.bitArray.bitLength(t)!==f.bitArray.bitLength(e))return!1;var n,r=0;for(n=0;n<t.length;n++)r|=t[n]^e[n];return 0===r},M:function(t,e,n,r){var i;for(i=0,void 0===r&&(r=[]);e>=32;e-=32)r.push(n),n=0;if(0===e)return r.concat(t);for(i=0;i<t.length;i++)r.push(n|t[i]>>>e),n=t[i]<<32-e;return i=t.length?t[t.length-1]:0,t=f.bitArray.getPartial(i),r.push(f.bitArray.partial(e+t&31,e+t>32?n:r.pop(),1)),r},Y:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,n;for(e=0;e<t.length;++e)n=t[e],t[e]=n>>>24|n>>>8&65280|(65280&n)<<8|n<<24;return t}},f.codec.utf8String={fromBits:function(t){var e,n,r="",i=f.bitArray.bitLength(t);for(e=0;i/8>e;e++)0===(3&e)&&(n=t[e/4]),r+=String.fromCharCode(n>>>8>>>8>>>8),n<<=8;return decodeURIComponent(escape(r))},toBits:function(t){t=unescape(encodeURIComponent(t));var e,n=[],r=0;for(e=0;e<t.length;e++)r=r<<8|t.charCodeAt(e),3===(3&e)&&(n.push(r),r=0);return 3&e&&n.push(f.bitArray.partial(8*(3&e),r)),n}},f.codec.hex={fromBits:function(t){var e,n="";for(e=0;e<t.length;e++)n+=((0|t[e])+0xf00000000000).toString(16).substr(4);return n.substr(0,f.bitArray.bitLength(t)/4)},toBits:function(t){var e,n,r=[];for(t=t.replace(/\s|0x/g,""),n=t.length,t+="00000000",e=0;e<t.length;e+=8)r.push(0^parseInt(t.substr(e,8),16));return f.bitArray.clamp(r,4*n)}},f.hash.sha256=function(t){this.b[0]||this.G(),t?(this.u=t.u.slice(0),this.o=t.o.slice(0),this.h=t.h):this.reset()},f.hash.sha256.hash=function(t){return(new f.hash.sha256).update(t).finalize()},f.hash.sha256.prototype={blockSize:512,reset:function(){return this.u=this.K.slice(0),this.o=[],this.h=0,this},update:function(t){"string"==typeof t&&(t=f.codec.utf8String.toBits(t));var e,n=this.o=f.bitArray.concat(this.o,t);if(e=this.h,t=this.h=e+f.bitArray.bitLength(t),t>9007199254740991)throw new f.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!=typeof Uint32Array){var r=new Uint32Array(n),i=0;for(e=512+e-(512+e&511);t>=e;e+=512)o(this,r.subarray(16*i,16*(i+1))),i+=1;n.splice(0,16*i)}else for(e=512+e-(512+e&511);t>=e;e+=512)o(this,n.splice(0,16));return this},finalize:function(){var t,e=this.o,n=this.u,e=f.bitArray.concat(e,[f.bitArray.partial(1,1)]);for(t=e.length+2;15&t;t++)e.push(0);for(e.push(Math.floor(this.h/4294967296)),e.push(0|this.h);e.length;)o(this,e.splice(0,16));return this.reset(),n},K:[],b:[],G:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}for(var e,n,r=0,i=2;64>r;i++){for(n=!0,e=2;i>=e*e;e++)if(0===i%e){n=!1;break}n&&(8>r&&(this.K[r]=t(Math.pow(i,.5))),this.b[r]=t(Math.pow(i,1/3)),r++)}}},f.prng=function(t){this.c=[new f.hash.sha256],this.i=[0],this.H=0,this.v={},this.F=0,this.J={},this.L=this.f=this.j=this.T=0,this.b=[0,0,0,0,0,0,0,0],this.g=[0,0,0,0],this.C=void 0,this.D=t,this.s=!1,this.B={progress:{},seeded:{}},this.m=this.S=0,this.w=1,this.A=2,this.O=65536,this.I=[0,48,64,96,128,192,256,384,512,768,1024],this.P=3e4,this.N=80},f.prng.prototype={randomWords:function(t,e){var n,r=[];n=this.isReady(e);var i;if(n===this.m)throw new f.exception.notReady("generator isn't seeded");if(n&this.A){n=!(n&this.w),i=[];var o,s=0;for(this.L=i[0]=(new Date).valueOf()+this.P,o=0;16>o;o++)i.push(4294967296*Math.random()|0);for(o=0;o<this.c.length&&(i=i.concat(this.c[o].finalize()),s+=this.i[o],this.i[o]=0,n||!(this.H&1<<o));o++);for(this.H>=1<<this.c.length&&(this.c.push(new f.hash.sha256),this.i.push(0)),this.f-=s,s>this.j&&(this.j=s),this.H++,this.b=f.hash.sha256.hash(this.b.concat(i)),this.C=new f.cipher.aes(this.b),n=0;4>n&&(this.g[n]=this.g[n]+1|0,!this.g[n]);n++);}for(n=0;t>n;n+=4)0===(n+1)%this.O&&c(this),i=u(this),r.push(i[0],i[1],i[2],i[3]);return c(this),r.slice(0,t)},setDefaultParanoia:function(t,e){if(0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e)throw new f.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.D=t},addEntropy:function(t,e,n){n=n||"user";var r,i,o=(new Date).valueOf(),a=this.v[n],c=this.isReady(),u=0;switch(r=this.J[n],void 0===r&&(r=this.J[n]=this.T++),void 0===a&&(a=this.v[n]=0),this.v[n]=(this.v[n]+1)%this.c.length,typeof t){case"number":void 0===e&&(e=1),this.c[a].update([r,this.F++,1,e,o,1,0|t]);break;case"object":if(n=Object.prototype.toString.call(t),"[object Uint32Array]"===n){for(i=[],n=0;n<t.length;n++)i.push(t[n]);t=i}else for("[object Array]"!==n&&(u=1),n=0;n<t.length&&!u;n++)"number"!=typeof t[n]&&(u=1);if(!u){if(void 0===e)for(n=e=0;n<t.length;n++)for(i=t[n];i>0;)e++,i>>>=1;this.c[a].update([r,this.F++,2,e,o,t.length].concat(t))}break;case"string":void 0===e&&(e=t.length),this.c[a].update([r,this.F++,3,e,o,t.length]),this.c[a].update(t);break;default:u=1}if(u)throw new f.exception.bug("random: addEntropy only supports number, array of numbers or string");this.i[a]+=e,this.f+=e,c===this.m&&(this.isReady()!==this.m&&s("seeded",Math.max(this.j,this.f)),s("progress",this.getProgress()))},isReady:function(t){return t=this.I[void 0!==t?t:this.D],this.j&&this.j>=t?this.i[0]>this.N&&(new Date).valueOf()>this.L?this.A|this.w:this.w:this.f>=t?this.A|this.m:this.m},getProgress:function(t){return t=this.I[t?t:this.D],this.j>=t?1:this.f>t?1:this.f/t},startCollectors:function(){if(!this.s){if(this.a={loadTimeCollector:h(this,this.V),mouseCollector:h(this,this.W),keyboardCollector:h(this,this.U),accelerometerCollector:h(this,this.R),touchCollector:h(this,this.X)},window.addEventListener)window.addEventListener("load",this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else{if(!document.attachEvent)throw new f.exception.bug("can't attach event");document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)}this.s=!0}},stopCollectors:function(){this.s&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.s=!1)},addEventListener:function(t,e){this.B[t][this.S++]=e},removeEventListener:function(t,e){var n,r,i=this.B[t],o=[];for(r in i)i.hasOwnProperty(r)&&i[r]===e&&o.push(r);for(n=0;n<o.length;n++)r=o[n],delete i[r]},U:function(){a(this,1)},W:function(t){var e,n;try{e=t.x||t.clientX||t.offsetX||0,n=t.y||t.clientY||t.offsetY||0}catch(r){n=e=0}0!=e&&0!=n&&this.addEntropy([e,n],2,"mouse"),a(this,0)},X:function(t){t=t.touches[0]||t.changedTouches[0],this.addEntropy([t.pageX||t.clientX,t.pageY||t.clientY],1,"touch"),a(this,0)},V:function(){a(this,2)},R:function(t){if(t=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z,window.orientation){var e=window.orientation;"number"==typeof e&&this.addEntropy(e,1,"accelerometer")}t&&this.addEntropy(t,2,"accelerometer"),a(this,0)}},f.random=new f.prng(6);t:try{var d,l,p,m;if(m="undefined"!=typeof n&&n.exports){var y;try{y=e("crypto")}catch(v){y=null}m=l=y}if(m&&l.randomBytes)d=l.randomBytes(128),d=new Uint32Array(new Uint8Array(d).buffer),f.random.addEntropy(d,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(p=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(p);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break t;window.msCrypto.getRandomValues(p)}f.random.addEntropy(p,1024,"crypto['getRandomValues']")}}catch(v){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(v))}"undefined"!=typeof n&&n.exports&&(n.exports=f),"function"==typeof t&&t([],function(){return f})},{crypto:void 0}],11:[function(t,e,n){"use strict";function r(t){var e,n,r;return t?(r=t.name,e=t.client,null==e?o.reject(new i({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."})):(n=e.getVersion(),n!==a?o.reject(new i({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n+") and "+r+" (version "+a+") components must be from the same SDK version."})):o.resolve())):o.reject(new i({type:s.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:s.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}var i=t("./braintree-error"),o=t("./promise"),s=t("./errors"),a="3.24.0";e.exports={verify:r}},{"./braintree-error":12,"./errors":16,"./promise":18}],12:[function(t,e,n){"use strict";function r(t){if(!r.types.hasOwnProperty(t.type))throw new Error(t.type+" is not a valid type.");if(!t.code)throw new Error("Error code required.");if(!t.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=t.code,this.message=t.message,this.type=t.type,this.details=t.details}var i=t("./enumerate");r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.types=i(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(t){return t instanceof r&&t.details&&t.details.originalError?r.findRootError(t.details.originalError):t},e.exports=r},{"./enumerate":15}],13:[function(t,e,n){"use strict";function r(t){return t.replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g,"$1_$2").toLowerCase()}e.exports=function(t){return Object.keys(t).reduce(function(e,n){var i=r(n);return e[i]=t[n],e},{})}},{}],14:[function(t,e,n){"use strict";var r=t("./braintree-error"),i=t("./errors");e.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:i.METHOD_CALLED_AFTER_TEARDOWN.type,code:i.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":12,"./errors":16}],15:[function(t,e,n){"use strict";function r(t,e){return e=null==e?"":e,t.reduce(function(t,n){return t[n]=e+n,t},{})}e.exports=r},{}],16:[function(t,e,n){"use strict";var r=t("./braintree-error");e.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},CALLBACK_REQUIRED:{type:r.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INVALID_OPTION:{type:r.types.MERCHANT,code:"INVALID_OPTION"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:r.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":12}],17:[function(t,e,n){"use strict";e.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],18:[function(t,e,n){(function(n){"use strict";var r=n.Promise||t("promise-polyfill");e.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":5}]},{},[8])(8)});