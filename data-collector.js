!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).dataCollector=e()}}(function(){return function o(s,a,c){function u(t,e){if(!a[t]){if(!s[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(h)return h(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=a[t]={exports:{}};s[t][0].call(i.exports,function(e){return u(s[t][1][e]||e)},i,i.exports,o,s,a,c)}return a[t].exports}for(var h="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(n,r,e){(function(e){"use strict";var t=n("promise-polyfill");r.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":8}],2:[function(e,t,n){"use strict";var s=e("./lib/promise"),a={};function r(n){var t,r,i,e,o=JSON.stringify(n);return!n.forceScriptReload&&(e=a[o])?e:(i=document.createElement("script"),t=n.dataAttributes||{},r=n.container||document.head,i.src=n.src,i.id=n.id,i.async=!0,n.crossorigin&&i.setAttribute("crossorigin",n.crossorigin),Object.keys(t).forEach(function(e){i.setAttribute("data-"+e,t[e])}),e=new s(function(e,t){i.addEventListener("load",function(){e(i)}),i.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),i.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),r.appendChild(i)}),a[o]=e)}r.clearCache=function(){a={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){"use strict";function r(e){var t,n=this;return"function"==typeof e?new r.Promise(e):(this._promise=new r.Promise(function(e,t){n._resolveFunction=e,n._rejectFunction=t}),e=e||{},this._onResolve=e.onResolve||r.defaultOnResolve,this._onReject=e.onReject||r.defaultOnReject,((t=e).hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(t.suppressUnhandledPromiseMessage):Boolean(r.suppressUnhandledPromiseMessage))&&this._promise.catch(function(){}),this._resetState(),this._promise.resolve=this.resolve.bind(this),this._promise.reject=this.reject.bind(this),this._promise)}["all","allSettled","race","reject","resolve"].forEach(function(t){r[t]=function(){var e=Array.prototype.slice.call(arguments);return r.Promise[t].apply(r.Promise,e)}}),r.setPromise=function(e){r.Promise=e},"undefined"!=typeof Promise&&r.setPromise(Promise),r.defaultOnResolve=function(e){return r.Promise.resolve(e)},r.defaultOnReject=function(e){return r.Promise.reject(e)},r.prototype.resolve=function(e){var t=this;return this._promise.isFulfilled||(this._setResolved(),r.Promise.resolve().then(function(){return t._onResolve(e)}).then(this._resolveFunction).catch(function(e){t._resetState(),t._promise.reject(e)})),this._promise},r.prototype.reject=function(e){var t=this;return this._promise.isFulfilled||(this._setRejected(),r.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(this._rejectFunction)),this._promise},r.prototype._resetState=function(){this._promise.isFulfilled=!1,this._promise.isResolved=!1,this._promise.isRejected=!1},r.prototype._setResolved=function(){this._promise.isFulfilled=!0,this._promise.isResolved=!0,this._promise.isRejected=!1},r.prototype._setRejected=function(){this._promise.isFulfilled=!0,this._promise.isResolved=!1,this._promise.isRejected=!0},t.exports=r},{}],4:[function(e,t,n){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){try{t.apply(null,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],5:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],6:[function(e,t,n){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],7:[function(e,t,n){"use strict";var r=e("./lib/deferred"),i=e("./lib/once"),o=e("./lib/promise-or-callback");function a(n){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i(r(e))),o(n.apply(this,t),e)}}a.wrapPrototype=function(i,e){var o,s;return o=(e=e||{}).ignoreMethods||[],s=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(i.prototype).filter(function(e){var t,n="constructor"!==e&&"function"==typeof i.prototype[e],r=-1===o.indexOf(e);return t=s||"_"!==e.charAt(0),n&&t&&r}).forEach(function(e){var t=i.prototype[e];i.prototype[e]=a(t)}),i},t.exports=a},{"./lib/deferred":4,"./lib/once":5,"./lib/promise-or-callback":6}],8:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function i(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function s(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,o._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value)}catch(e){return void u(r.promise,e)}a(r.promise,t)}else(1===n._state?a:u)(r.promise,n._value)})):n._deferreds.push(r)}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof o)return t._state=3,t._value=e,void h(t);if("function"==typeof n)return void f((r=n,i=e,function(){r.apply(i,arguments)}),t)}t._state=1,t._value=e,h(t)}catch(e){u(t,e)}var r,i}function u(e,t){e._state=2,e._value=t,h(e)}function h(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)s(e,e._deferreds[t]);e._deferreds=null}function l(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function f(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){if(n)return;n=!0,u(t,e)}}o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var n=new this.constructor(i);return s(this,new l(e,t,n)),n},o.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},o.all=function(t){return new o(function(r,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var o=Array.prototype.slice.call(t);if(0===o.length)return r([]);var s=o.length;function a(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){a(t,e)},i)}o[t]=e,0==--s&&r(o)}catch(e){i(e)}}for(var e=0;e<o.length;e++)a(e,o[e])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(n){return new o(function(e,t){t(n)})},o.race=function(i){return new o(function(e,t){if(!c(i))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=i.length;n<r;n++)o.resolve(i[n]).then(e,t)})},o._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){r(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=o},{}],9:[function(e,t,n){"use strict";var r=e("../lib/braintree-error");t.exports={DATA_COLLECTOR_KOUNT_NOT_ENABLED:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_NOT_ENABLED",message:"Kount is not enabled for this merchant."},DATA_COLLECTOR_KOUNT_ERROR:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_ERROR"},DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS",message:"Data Collector must be created with Kount and/or PayPal."}}},{"../lib/braintree-error":16}],10:[function(e,t,n){"use strict";var s,a=e("../lib/constants").FRAUDNET_FNCLS,c=e("../lib/constants").FRAUDNET_SOURCE,u=e("../lib/constants").FRAUDNET_URL,h=e("../lib/assets").loadScript,r=e("../lib/promise");function i(){}function o(e){e&&e.parentNode&&e.parentNode.removeChild(e)}i.prototype.initialize=function(){var e,t,n,r,i,o=this;return this.sessionId=s=function(){var e,t="";for(e=0;e<32;e++)t+=Math.floor(16*Math.random()).toString(16);return t}(),this._beaconId=(e=this.sessionId,t=(new Date).getTime()/1e3,"https://b.stats.paypal.com/counter.cgi?i=127.0.0.1&p="+e+"&t="+t+"&a=14"),this._parameterBlock=(n=this.sessionId,r=this._beaconId,(i=document.body.appendChild(document.createElement("script"))).type="application/json",i.setAttribute("fncls",a),i.text=JSON.stringify({f:n,s:c,b:r}),i),h({src:u}).then(function(e){return o._thirdPartyBlock=e,o}).catch(function(){return null})},i.prototype.teardown=function(){o(document.querySelector('iframe[title="ppfniframe"]')),o(document.querySelector('iframe[title="pbf"]')),o(this._parameterBlock),o(this._thirdPartyBlock)},t.exports={setup:function(){var e=new i;return s?(e.sessionId=s,r.resolve(e)):e.initialize()},clearSessionIdCache:function(){s=null}}},{"../lib/assets":14,"../lib/constants":18,"../lib/promise":25}],11:[function(e,t,n){"use strict";var s=e("./kount"),a=e("./fraudnet"),c=e("../lib/braintree-error"),u=e("../lib/basic-component-verification"),h=e("../lib/create-deferred-client"),l=e("../lib/create-assets-url"),f=e("../lib/methods"),d=e("../lib/convert-methods-to-error"),p=e("../lib/promise"),m=e("@braintree/wrap-promise"),v=e("./errors");t.exports={create:m(function(r){var i,n="Data Collector",o={_instances:[]};return u.verify({name:n,client:r.client,authorization:r.authorization}).then(function(){var e,t;return o._instantiatedWithAClient=!r.useDeferredClient,o._createPromise=h.create({authorization:r.authorization,client:r.client,debug:r.debug,assetsUrl:l.create(r.authorization),name:n}).then(function(e){var t,n=e.getConfiguration();if(!0===r.kount&&n.gatewayConfiguration.kount){try{t=s.setup({environment:n.gatewayConfiguration.environment,merchantId:n.gatewayConfiguration.kount.kountMerchantId})}catch(e){return p.reject(new c({type:v.DATA_COLLECTOR_KOUNT_ERROR.type,code:v.DATA_COLLECTOR_KOUNT_ERROR.code,message:e.message}))}i=t.deviceData,o._instances.push(t)}else i={};return p.resolve()}).then(function(){return a.setup().then(function(e){e&&(i.correlation_id=e.sessionId,o._instances.push(e))})}).then(function(){return 0===o._instances.length?p.reject(new c(v.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS)):(o.deviceData=JSON.stringify(i),o.rawDeviceData=i,o)}),o.teardown=(e=o,m(function(){return e._createPromise.then(function(){e._instances.forEach(function(e){e&&e.teardown()}),d(e,f(e))})})),o.getDeviceData=(t=o,m(function(e){return e=e||{},t._createPromise.then(function(){return e.raw?p.resolve(t.rawDeviceData):p.resolve(t.deviceData)})})),o._instantiatedWithAClient?o._createPromise:o})}),VERSION:"3.63.0"}},{"../lib/basic-component-verification":15,"../lib/braintree-error":16,"../lib/convert-methods-to-error":19,"../lib/create-assets-url":20,"../lib/create-deferred-client":21,"../lib/methods":24,"../lib/promise":25,"./errors":9,"./fraudnet":10,"./kount":12,"@braintree/wrap-promise":7}],12:[function(e,t,n){"use strict";var r=e("./vendor/sjcl"),i=e("../lib/camel-case-to-snake-case"),o="https://assets.qa.braintreepayments.com/data",s={development:o,qa:o,sandbox:"https://assets.braintreegateway.com/sandbox/data",production:"https://assets.braintreegateway.com/data"},a={};function c(e){var t=c.getCachedDeviceData(e.merchantId);if(t)return this.deviceData=t,void(this._isCached=!0);this._currentEnvironment=this._initializeEnvironment(e),r.random.startCollectors(),this._deviceSessionId=this._generateDeviceSessionId(),this.deviceData=this._getDeviceData(),c.setCachedDeviceData(e.merchantId,this.deviceData),this._iframe=this._setupIFrame()}c.getCachedDeviceData=function(e){return a[e]},c.setCachedDeviceData=function(e,t){a[e]=t},c.prototype.teardown=function(){this._isCached||(r.random.stopCollectors(),this._removeIframe())},c.prototype._removeIframe=function(){this._iframe.parentNode.removeChild(this._iframe)},c.prototype._getDeviceData=function(){return i({deviceSessionId:this._deviceSessionId,fraudMerchantId:this._currentEnvironment.id})},c.prototype._generateDeviceSessionId=function(){var e;return e=r.random.randomWords(4,0),r.codec.hex.fromBits(e)},c.prototype._setupIFrame=function(){var e,t,n=this;return e="?m="+this._currentEnvironment.id+"&s="+this._deviceSessionId,(t=document.createElement("iframe")).width=1,t.id="braintreeDataFrame-"+this._deviceSessionId,t.height=1,t.frameBorder=0,t.scrolling="no",t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",t.title="Braintree-Kount-iframe",t.setAttribute("aria-hidden","true"),document.body.appendChild(t),setTimeout(function(){t.src=n._currentEnvironment.url+"/logo.htm"+e,t.innerHTML='<img src="'+n._currentEnvironment.url+"/logo.gif"+e+'" alt="" />'},10),t},c.prototype._initializeEnvironment=function(e){var t=s[e.environment];if(null==t)throw new Error(e.environment+" is not a valid environment for kount.environment");return{url:t,name:e.environment,id:e.merchantId}},t.exports={setup:function(e){return new c(null!=e?e:{})},Kount:c,environmentUrls:s}},{"../lib/camel-case-to-snake-case":17,"./vendor/sjcl":13}],13:[function(e,t,n){"use strict";var _={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(e){this.toString=function(){return"CORRUPT: "+this.message},this.message=e},invalid:function(e){this.toString=function(){return"INVALID: "+this.message},this.message=e},bug:function(e){this.toString=function(){return"BUG: "+this.message},this.message=e},notReady:function(e){this.toString=function(){return"NOT READY: "+this.message},this.message=e}}};function r(e,t,n){if(4!==t.length)throw new _.exception.invalid("invalid aes block size");var r=e.b[n],i=t[0]^r[0],o=t[n?3:1]^r[1],s=t[2]^r[2];t=t[n?1:3]^r[3];var a,c,u,h,l=r.length/4-2,f=4,d=[0,0,0,0];e=(a=e.l[n])[0];var p=a[1],m=a[2],v=a[3],y=a[4];for(h=0;h<l;h++)a=e[i>>>24]^p[o>>16&255]^m[s>>8&255]^v[255&t]^r[f],c=e[o>>>24]^p[s>>16&255]^m[t>>8&255]^v[255&i]^r[f+1],u=e[s>>>24]^p[t>>16&255]^m[i>>8&255]^v[255&o]^r[f+2],t=e[t>>>24]^p[i>>16&255]^m[o>>8&255]^v[255&s]^r[f+3],f+=4,i=a,o=c,s=u;for(h=0;h<4;h++)d[n?3&-h:h]=y[i>>>24]<<24^y[o>>16&255]<<16^y[s>>8&255]<<8^y[255&t]^r[f++],a=i,i=o,o=s,s=t,t=a;return d}function o(e,t){var n,r,i,o=e.u,s=e.b,a=o[0],c=o[1],u=o[2],h=o[3],l=o[4],f=o[5],d=o[6],p=o[7];for(n=0;n<64;n++)r=(r=n<16?t[n]:(r=t[n+1&15],i=t[n+14&15],t[15&n]=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(i>>>17^i>>>19^i>>>10^i<<15^i<<13)+t[15&n]+t[n+9&15]|0))+p+(l>>>6^l>>>11^l>>>25^l<<26^l<<21^l<<7)+(d^l&(f^d))+s[n],p=d,d=f,f=l,l=h+r|0,h=u,u=c,a=r+((c=a)&u^h&(c^u))+(c>>>2^c>>>13^c>>>22^c<<30^c<<19^c<<10)|0;o[0]=o[0]+a|0,o[1]=o[1]+c|0,o[2]=o[2]+u|0,o[3]=o[3]+h|0,o[4]=o[4]+l|0,o[5]=o[5]+f|0,o[6]=o[6]+d|0,o[7]=o[7]+p|0}function u(e,t){var n,r=_.random.B[e],i=[];for(n in r)r.hasOwnProperty(n)&&i.push(r[n]);for(n=0;n<i.length;n++)i[n](t)}function i(e,t){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?e.addEntropy(window.performance.now(),t,"loadtime"):e.addEntropy((new Date).valueOf(),t,"loadtime")}function a(e){e.b=c(e).concat(c(e)),e.C=new _.cipher.aes(e.b)}function c(e){for(var t=0;t<4&&(e.g[t]=e.g[t]+1|0,!e.g[t]);t++);return e.C.encrypt(e.g)}function s(e,t){return function(){t.apply(e,arguments)}}_.cipher.aes=function(e){this.l[0][0][0]||this.G();var t,n,r,i,o=this.l[0][4],s=this.l[1],a=1;if(4!==(t=e.length)&&6!==t&&8!==t)throw new _.exception.invalid("invalid aes key size");for(this.b=[r=e.slice(0),i=[]],e=t;e<4*t+28;e++)n=r[e-1],(0==e%t||8===t&&4==e%t)&&(n=o[n>>>24]<<24^o[n>>16&255]<<16^o[n>>8&255]<<8^o[255&n],0==e%t&&(n=n<<8^n>>>24^a<<24,a=a<<1^283*(a>>7))),r[e]=r[e-t]^n;for(t=0;e;t++,e--)n=r[3&t?e:e-4],i[t]=e<=4||t<4?n:s[0][o[n>>>24]]^s[1][o[n>>16&255]]^s[2][o[n>>8&255]]^s[3][o[255&n]]},_.cipher.aes.prototype={encrypt:function(e){return r(this,e,0)},decrypt:function(e){return r(this,e,1)},l:[[[],[],[],[],[]],[[],[],[],[],[]]],G:function(){var e,t,n,r,i,o,s,a=this.l[0],c=this.l[1],u=a[4],h=c[4],l=[],f=[];for(e=0;e<256;e++)f[(l[e]=e<<1^283*(e>>7))^e]=e;for(t=n=0;!u[t];t^=r||1,n=f[n]||1)for(o=(o=n^n<<1^n<<2^n<<3^n<<4)>>8^255&o^99,s=16843009*(i=l[e=l[r=l[h[u[t]=o]=t]]])^65537*e^257*r^16843008*t,i=257*l[o]^16843008*o,e=0;e<4;e++)a[e][t]=i=i<<24^i>>>8,c[e][o]=s=s<<24^s>>>8;for(e=0;e<5;e++)a[e]=a[e].slice(0),c[e]=c[e].slice(0)}},_.bitArray={bitSlice:function(e,t,n){return e=_.bitArray.M(e.slice(t/32),32-(31&t)).slice(1),void 0===n?e:_.bitArray.clamp(e,n-t)},extract:function(e,t,n){var r=Math.floor(-t-n&31);return(-32&(t+n-1^t)?e[t/32|0]<<32-r^e[t/32+1|0]>>>r:e[t/32|0]>>>r)&(1<<n)-1},concat:function(e,t){if(0===e.length||0===t.length)return e.concat(t);var n=e[e.length-1],r=_.bitArray.getPartial(n);return 32===r?e.concat(t):_.bitArray.M(t,r,0|n,e.slice(0,e.length-1))},bitLength:function(e){var t=e.length;return 0===t?0:32*(t-1)+_.bitArray.getPartial(e[t-1])},clamp:function(e,t){if(32*e.length<t)return e;var n=(e=e.slice(0,Math.ceil(t/32))).length;return t&=31,0<n&&t&&(e[n-1]=_.bitArray.partial(t,e[n-1]&2147483648>>t-1,1)),e},partial:function(e,t,n){return 32===e?t:(n?0|t:t<<32-e)+1099511627776*e},getPartial:function(e){return Math.round(e/1099511627776)||32},equal:function(e,t){if(_.bitArray.bitLength(e)!==_.bitArray.bitLength(t))return!1;var n,r=0;for(n=0;n<e.length;n++)r|=e[n]^t[n];return 0===r},M:function(e,t,n,r){var i;for(void(i=0)===r&&(r=[]);32<=t;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(i=0;i<e.length;i++)r.push(n|e[i]>>>t),n=e[i]<<32-t;return i=e.length?e[e.length-1]:0,e=_.bitArray.getPartial(i),r.push(_.bitArray.partial(t+e&31,32<t+e?n:r.pop(),1)),r},Y:function(e,t){return[e[0]^t[0],e[1]^t[1],e[2]^t[2],e[3]^t[3]]},byteswapM:function(e){var t,n;for(t=0;t<e.length;++t)n=e[t],e[t]=n>>>24|n>>>8&65280|(65280&n)<<8|n<<24;return e}},_.codec.utf8String={fromBits:function(e){var t,n,r="",i=_.bitArray.bitLength(e);for(t=0;t<i/8;t++)0==(3&t)&&(n=e[t/4]),r+=String.fromCharCode(n>>>8>>>8>>>8),n<<=8;return decodeURIComponent(escape(r))},toBits:function(e){e=unescape(encodeURIComponent(e));var t,n=[],r=0;for(t=0;t<e.length;t++)r=r<<8|e.charCodeAt(t),3==(3&t)&&(n.push(r),r=0);return 3&t&&n.push(_.bitArray.partial(8*(3&t),r)),n}},_.codec.hex={fromBits:function(e){var t,n="";for(t=0;t<e.length;t++)n+=(0xf00000000000+(0|e[t])).toString(16).substr(4);return n.substr(0,_.bitArray.bitLength(e)/4)},toBits:function(e){var t,n,r=[];for(n=(e=e.replace(/\s|0x/g,"")).length,e+="00000000",t=0;t<e.length;t+=8)r.push(0^parseInt(e.substr(t,8),16));return _.bitArray.clamp(r,4*n)}},_.hash.sha256=function(e){this.b[0]||this.G(),e?(this.u=e.u.slice(0),this.o=e.o.slice(0),this.h=e.h):this.reset()},_.hash.sha256.hash=function(e){return(new _.hash.sha256).update(e).finalize()},_.hash.sha256.prototype={blockSize:512,reset:function(){return this.u=this.K.slice(0),this.o=[],this.h=0,this},update:function(e){"string"==typeof e&&(e=_.codec.utf8String.toBits(e));var t,n=this.o=_.bitArray.concat(this.o,e);if(t=this.h,9007199254740991<(e=this.h=t+_.bitArray.bitLength(e)))throw new _.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!=typeof Uint32Array){var r=new Uint32Array(n),i=0;for(t=512+t-(512+t&511);t<=e;t+=512)o(this,r.subarray(16*i,16*(i+1))),i+=1;n.splice(0,16*i)}else for(t=512+t-(512+t&511);t<=e;t+=512)o(this,n.splice(0,16));return this},finalize:function(){var e,t=this.o,n=this.u;for(e=(t=_.bitArray.concat(t,[_.bitArray.partial(1,1)])).length+2;15&e;e++)t.push(0);for(t.push(Math.floor(this.h/4294967296)),t.push(0|this.h);t.length;)o(this,t.splice(0,16));return this.reset(),n},K:[],b:[],G:function(){function e(e){return 4294967296*(e-Math.floor(e))|0}for(var t,n,r=0,i=2;r<64;i++){for(n=!0,t=2;t*t<=i;t++)if(0==i%t){n=!1;break}n&&(r<8&&(this.K[r]=e(Math.pow(i,.5))),this.b[r]=e(Math.pow(i,1/3)),r++)}}},_.prng=function(e){this.c=[new _.hash.sha256],this.i=[0],this.H=0,this.v={},this.F=0,this.J={},this.L=this.f=this.j=this.T=0,this.b=[0,0,0,0,0,0,0,0],this.g=[0,0,0,0],this.C=void 0,this.D=e,this.s=!1,this.B={progress:{},seeded:{}},this.m=this.S=0,this.w=1,this.A=2,this.O=65536,this.I=[0,48,64,96,128,192,256,384,512,768,1024],this.P=3e4,this.N=80},_.prng.prototype={randomWords:function(e,t){var n,r,i=[];if((n=this.isReady(t))===this.m)throw new _.exception.notReady("generator isn't seeded");if(n&this.A){n=!(n&this.w),r=[];var o,s=0;for(this.L=r[0]=(new Date).valueOf()+this.P,o=0;o<16;o++)r.push(4294967296*Math.random()|0);for(o=0;o<this.c.length&&(r=r.concat(this.c[o].finalize()),s+=this.i[o],this.i[o]=0,n||!(this.H&1<<o));o++);for(this.H>=1<<this.c.length&&(this.c.push(new _.hash.sha256),this.i.push(0)),this.f-=s,s>this.j&&(this.j=s),this.H++,this.b=_.hash.sha256.hash(this.b.concat(r)),this.C=new _.cipher.aes(this.b),n=0;n<4&&(this.g[n]=this.g[n]+1|0,!this.g[n]);n++);}for(n=0;n<e;n+=4)0==(n+1)%this.O&&a(this),r=c(this),i.push(r[0],r[1],r[2],r[3]);return a(this),i.slice(0,e)},setDefaultParanoia:function(e,t){if(0===e&&"Setting paranoia=0 will ruin your security; use it only for testing"!==t)throw new _.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.D=e},addEntropy:function(e,t,n){n=n||"user";var r,i,o=(new Date).valueOf(),s=this.v[n],a=this.isReady(),c=0;switch(void 0===(r=this.J[n])&&(r=this.J[n]=this.T++),void 0===s&&(s=this.v[n]=0),this.v[n]=(this.v[n]+1)%this.c.length,typeof e){case"number":void 0===t&&(t=1),this.c[s].update([r,this.F++,1,t,o,1,0|e]);break;case"object":if("[object Uint32Array]"===(n=Object.prototype.toString.call(e))){for(i=[],n=0;n<e.length;n++)i.push(e[n]);e=i}else for("[object Array]"!==n&&(c=1),n=0;n<e.length&&!c;n++)"number"!=typeof e[n]&&(c=1);if(!c){if(void 0===t)for(n=t=0;n<e.length;n++)for(i=e[n];0<i;)t++,i>>>=1;this.c[s].update([r,this.F++,2,t,o,e.length].concat(e))}break;case"string":void 0===t&&(t=e.length),this.c[s].update([r,this.F++,3,t,o,e.length]),this.c[s].update(e);break;default:c=1}if(c)throw new _.exception.bug("random: addEntropy only supports number, array of numbers or string");this.i[s]+=t,this.f+=t,a===this.m&&(this.isReady()!==this.m&&u("seeded",Math.max(this.j,this.f)),u("progress",this.getProgress()))},isReady:function(e){return e=this.I[void 0!==e?e:this.D],this.j&&this.j>=e?this.i[0]>this.N&&(new Date).valueOf()>this.L?this.A|this.w:this.w:this.f>=e?this.A|this.m:this.m},getProgress:function(e){return e=this.I[e||this.D],this.j>=e||this.f>e?1:this.f/e},startCollectors:function(){if(!this.s){if(this.a={loadTimeCollector:s(this,this.V),mouseCollector:s(this,this.W),keyboardCollector:s(this,this.U),accelerometerCollector:s(this,this.R),touchCollector:s(this,this.X)},window.addEventListener)window.addEventListener("load",this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else{if(!document.attachEvent)throw new _.exception.bug("can't attach event");document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)}this.s=!0}},stopCollectors:function(){this.s&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.s=!1)},addEventListener:function(e,t){this.B[e][this.S++]=t},removeEventListener:function(e,t){var n,r,i=this.B[e],o=[];for(r in i)i.hasOwnProperty(r)&&i[r]===t&&o.push(r);for(n=0;n<o.length;n++)delete i[r=o[n]]},U:function(){i(this,1)},W:function(e){var t,n;try{t=e.x||e.clientX||e.offsetX||0,n=e.y||e.clientY||e.offsetY||0}catch(e){n=t=0}0!=t&&0!=n&&this.addEntropy([t,n],2,"mouse"),i(this,0)},X:function(e){e=e.touches[0]||e.changedTouches[0],this.addEntropy([e.pageX||e.clientX,e.pageY||e.clientY],1,"touch"),i(this,0)},V:function(){i(this,2)},R:function(e){if(e=e.accelerationIncludingGravity.x||e.accelerationIncludingGravity.y||e.accelerationIncludingGravity.z,window.orientation){var t=window.orientation;"number"==typeof t&&this.addEntropy(t,1,"accelerometer")}e&&this.addEntropy(e,2,"accelerometer"),i(this,0)}},_.random=new _.prng(6);e:try{var h,l,f,d;if(d=void 0!==t&&t.exports){var p;try{p=e("crypto")}catch(e){p=null}d=l=p}if(d&&l.randomBytes)h=l.randomBytes(128),h=new Uint32Array(new Uint8Array(h).buffer),_.random.addEntropy(h,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(f=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(f);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break e;window.msCrypto.getRandomValues(f)}_.random.addEntropy(f,1024,"crypto['getRandomValues']")}}catch(e){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(e))}void 0!==t&&t.exports&&(t.exports=_)},{crypto:void 0}],14:[function(e,t,n){"use strict";var r=e("@braintree/asset-loader/load-script");t.exports={loadScript:r}},{"@braintree/asset-loader/load-script":2}],15:[function(e,t,n){"use strict";var i=e("./braintree-error"),o=e("./promise"),s=e("./errors");t.exports={verify:function(e){var t,n,r;return e?(r=e.name,t=e.client,n=e.authorization,t||n?n||"3.63.0"===t.getVersion()?o.resolve():o.reject(new i({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.63.0) components must be from the same SDK version."})):o.reject(new i({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."}))):o.reject(new i({type:s.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:s.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":16,"./errors":23,"./promise":25}],16:[function(e,t,n){"use strict";var r=e("./enumerate");function i(e){if(!i.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}i.prototype=Object.create(Error.prototype),(i.prototype.constructor=i).types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),i.findRootError=function(e){return e instanceof i&&e.details&&e.details.originalError?i.findRootError(e.details.originalError):e},t.exports=i},{"./enumerate":22}],17:[function(e,t,n){"use strict";t.exports=function(n){return Object.keys(n).reduce(function(e,t){return e[t.replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g,"$1_$2").toLowerCase()]=n[t],e},{})}},{}],18:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.63.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.63.0"}},{}],19:[function(e,t,n){"use strict";var r=e("./braintree-error"),i=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:i.METHOD_CALLED_AFTER_TEARDOWN.type,code:i.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":16,"./errors":23}],20:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":18}],21:[function(e,t,n){"use strict";var r=e("./braintree-error"),i=e("./promise"),o=e("./assets"),s=e("./errors"),a="3.63.0";t.exports={create:function(e){var t=i.resolve();return e.client?i.resolve(e.client):(window.braintree&&window.braintree.client||(t=o.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return i.reject(new r({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return window.braintree.client.VERSION!==a?i.reject(new r({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}},{"./assets":14,"./braintree-error":16,"./errors":23,"./promise":25}],22:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],23:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:r.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":16}],24:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],25:[function(e,t,n){"use strict";var r=e("promise-polyfill"),i=e("@braintree/extended-promise"),o="undefined"!=typeof Promise?Promise:r;i.suppressUnhandledPromiseMessage=!0,i.setPromise(o),t.exports=o},{"@braintree/extended-promise":3,"promise-polyfill":8}]},{},[11])(11)});