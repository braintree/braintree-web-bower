!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(t.braintree||(t.braintree={})).googlePayment=e()}}(function(){var e;return function t(e,n,r){function o(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var p=n[s]={exports:{}};e[s][0].call(p.exports,function(t){var n=e[s][1][t];return o(n?n:t)},p,p.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/Android/.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){"use strict";var r=e("./is-edge"),o=e("./is-samsung");t.exports=function(e){return e=e||navigator.userAgent,!(-1===e.indexOf("Chrome")&&-1===e.indexOf("CriOS")||r(e)||o(e))}},{"./is-edge":3,"./is-samsung":4}],3:[function(e,t,n){"use strict";t.exports=function(e){return e=e||navigator.userAgent,-1!==e.indexOf("Edge/")}},{}],4:[function(e,t,n){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/SamsungBrowser/i.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(e,t,n){(function(n){"use strict";function r(e){var t,n=e.match(/Chrome\/(\d+)\./);return n?(t=parseInt(n[1],10),t>=i):!1}var o=e("./is-chrome"),i=61;t.exports=function(e){return e=e||n.navigator.userAgent,n.PaymentRequest?o(e)?r(e):!0:!1}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-chrome":2}],6:[function(e,t,n){"use strict";var r=e("./lib/set-attributes"),o=e("./lib/default-attributes"),i=e("./lib/assign");t.exports=function(e){var t=document.createElement("iframe"),n=i({},o,e);return n.style&&"string"!=typeof n.style&&(i(t.style,n.style),delete n.style),r(t,n),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":7,"./lib/default-attributes":8,"./lib/set-attributes":9}],7:[function(e,t,n){"use strict";t.exports=function(e){var t=Array.prototype.slice.call(arguments,1);return t.forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}},{}],8:[function(e,t,n){"use strict";t.exports={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],9:[function(e,t,n){"use strict";t.exports=function(e,t){var n;for(var r in t)t.hasOwnProperty(r)&&(n=t[r],null==n?e.removeAttribute(r):e.setAttribute(r,n))}},{}],10:[function(e,t,n){"use strict";function r(e){return function(){var t=arguments;setTimeout(function(){e.apply(null,t)},1)}}t.exports=r},{}],11:[function(e,t,n){"use strict";function r(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}t.exports=r},{}],12:[function(e,t,n){"use strict";function r(e,t){return t?void e.then(function(e){t(null,e)})["catch"](function(e){t(e)}):e}t.exports=r},{}],13:[function(e,t,n){"use strict";function r(e){return function(){var t,n=Array.prototype.slice.call(arguments),r=n[n.length-1];return"function"==typeof r&&(t=n.pop(),t=i(o(t))),s(e.apply(this,n),t)}}var o=e("./lib/deferred"),i=e("./lib/once"),s=e("./lib/promise-or-callback");r.wrapPrototype=function(e,t){var n,o,i;return t=t||{},o=t.ignoreMethods||[],i=t.transformPrivateMethods===!0,n=Object.getOwnPropertyNames(e.prototype).filter(function(t){var n,r="constructor"!==t&&"function"==typeof e.prototype[t],s=-1===o.indexOf(t);return n=i?!0:"_"!==t.charAt(0),r&&n&&s}),n.forEach(function(t){var n=e.prototype[t];e.prototype[t]=r(n)}),e},t.exports=r},{"./lib/deferred":10,"./lib/once":11,"./lib/promise-or-callback":12}],14:[function(t,n,r){(function(t){"use strict";!function(o,i){"object"==typeof r&&"undefined"!=typeof n?n.exports=i("undefined"==typeof t?o:t):"function"==typeof e&&e.amd?e([],function(){return i(o)}):o.framebus=i(o)}(this,function(e){function t(e){return null==e?!1:null==e.Window?!1:e.constructor!==e.Window?!1:(N.push(e),!0)}function n(e){var t,n={};for(t in A)A.hasOwnProperty(t)&&(n[t]=A[t]);return n._origin=e||"*",n}function r(e){var t,n,r=s(this);return a(e)?!1:a(r)?!1:(n=Array.prototype.slice.call(arguments,1),t=u(e,n,r),t===!1?!1:(E(m.top||m.self,t,r),!0))}function o(e,t){var n=s(this);return T(e,t,n)?!1:(g[n]=g[n]||{},g[n][e]=g[n][e]||[],g[n][e].push(t),!0)}function i(e,t){var n,r,o=s(this);if(T(e,t,o))return!1;if(r=g[o]&&g[o][e],!r)return!1;for(n=0;n<r.length;n++)if(r[n]===t)return r.splice(n,1),!0;return!1}function s(e){return e&&e._origin||"*"}function a(e){return"string"!=typeof e}function u(e,t,n){var r=!1,o={event:e,origin:n},i=t[t.length-1];"function"==typeof i&&(o.reply=y(i,n),t=t.slice(0,-1)),o.args=t;try{r=I+JSON.stringify(o)}catch(s){throw new Error("Could not stringify event: "+s.message)}return r}function c(e){var t,n,r,o;if(e.data.slice(0,I.length)!==I)return!1;try{t=JSON.parse(e.data.slice(I.length))}catch(i){return!1}return null!=t.reply&&(n=e.origin,r=e.source,o=t.reply,t.reply=function(e){var t=u(o,[e],n);return t===!1?!1:void r.postMessage(t,n)},t.args.push(t.reply)),t}function p(t){m||(m=t||e,m.addEventListener?m.addEventListener("message",f,!1):m.attachEvent?m.attachEvent("onmessage",f):null===m.onmessage?m.onmessage=f:m=null)}function l(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)})}function f(e){var t;a(e.data)||(t=c(e),t&&(d("*",t.event,t.args,e),d(e.origin,t.event,t.args,e),h(e.data,t.origin,e.source)))}function d(e,t,n,r){var o;if(g[e]&&g[e][t])for(o=0;o<g[e][t].length;o++)g[e][t][o].apply(r,n)}function _(e){return e.top!==e?!1:null==e.opener?!1:e.opener===e?!1:e.opener.closed===!0?!1:!0}function E(e,t,n){var r;try{for(e.postMessage(t,n),_(e)&&E(e.opener.top,t,n),r=0;r<e.frames.length;r++)E(e.frames[r],t,n)}catch(o){}}function h(e,t,n){var r,o;for(r=N.length-1;r>=0;r--)o=N[r],o.closed===!0?N=N.slice(r,1):n!==o&&E(o.top,e,t)}function y(e,t){function n(o,i){e(o,i),A.target(t).unsubscribe(r,n)}var r=l();return A.target(t).subscribe(r,n),r}function T(e,t,n){return a(e)?!0:"function"!=typeof t?!0:a(n)?!0:!1}var m,A,N=[],g={},I="/*framebus*/";return p(),A={target:n,include:t,publish:r,pub:r,trigger:r,emit:r,subscribe:o,sub:o,on:o,unsubscribe:i,unsub:i,off:i}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,n){!function(e){function n(){}function r(e,t){return function(){e.apply(t,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function i(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void o._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?s:a)(t.promise,e._value);var r;try{r=n(e._value)}catch(o){return void a(t.promise,o)}s(t.promise,r)}))}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof o)return e._state=3,e._value=t,void u(e);if("function"==typeof n)return void p(r(n,t),e)}e._state=1,e._value=t,u(e)}catch(i){a(e,i)}}function a(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)i(e,e._deferreds[t]);e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function p(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,a(t,e))})}catch(r){if(n)return;n=!0,a(t,r)}}var l=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var r=new this.constructor(n);return i(this,new c(e,t,r)),r},o.all=function(e){var t=Array.prototype.slice.call(e);return new o(function(e,n){function r(i,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(e){r(i,e)},n)}t[i]=s,0===--o&&e(t)}catch(u){n(u)}}if(0===t.length)return e([]);for(var o=t.length,i=0;i<t.length;i++)r(i,t[i])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(t){t(e)})},o.reject=function(e){return new o(function(t,n){n(e)})},o.race=function(e){return new o(function(t,n){for(var r=0,o=e.length;o>r;r++)e[r].then(t,n)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){l(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof t&&t.exports?t.exports=o:e.Promise||(e.Promise=o)}(this)},{}],16:[function(e,t,n){"use strict";var r=e("@braintree/browser-detection/supports-payment-request-api"),o=e("@braintree/browser-detection/is-android");t.exports={isAndroid:o,supportsPaymentRequestApi:r}},{"@braintree/browser-detection/is-android":1,"@braintree/browser-detection/supports-payment-request-api":5}],17:[function(e,t,n){"use strict";function r(e){i.call(this,{client:e.client,enabledPaymentMethods:{basicCard:!1,payWithGoogle:!0}}),this._analyticsName="google-payment"}var o=e("../lib/braintree-error"),i=e("../payment-request/external/payment-request"),s=e("../lib/promise"),a=e("@braintree/wrap-promise");r.prototype=Object.create(i.prototype,{constructor:r}),r.prototype.createSupportedPaymentMethodsConfiguration=function(e){return i.prototype.createSupportedPaymentMethodsConfiguration.call(this,"payWithGoogle",e)},r.prototype.tokenize=function(e){var t;if(e.supportedPaymentMethods){if("https://google.com/pay"!==e.supportedPaymentMethods.supportedMethods[0])return s.reject(new o({type:o.types.MERCHANT,code:"PAY_WITH_GOOGLE_CAN_ONLY_TOKENIZE_WITH_PAY_WITH_GOOGLE",message:"Only Pay with Google is supported in supportedPaymentMethods."}));t=[e.supportedPaymentMethods]}return i.prototype.tokenize.call(this,{supportedPaymentMethods:t,details:e.details,options:e.options})},t.exports=a.wrapPrototype(r)},{"../lib/braintree-error":23,"../lib/promise":36,"../payment-request/external/payment-request":40,"@braintree/wrap-promise":13}],18:[function(e,t,n){"use strict";function r(e){return i.verify({name:"Pay with Google",client:e.client}).then(function(){var t;return e.client.getConfiguration().gatewayConfiguration.androidPay?(t=new u(e),t.initialize()):c.reject(new s({type:s.types.MERCHANT,code:"PAY_WITH_GOOGLE_NOT_ENABLED",message:"Pay with Google is not enabled for this merchant."}))})}function o(){return Boolean(a.supportsPaymentRequestApi()&&a.isAndroid())}var i=e("../lib/basic-component-verification"),s=e("../lib/braintree-error"),a=e("./browser-detection"),u=e("./google-payment"),c=e("../lib/promise"),p=e("@braintree/wrap-promise"),l="3.27.0";t.exports={create:p(r),isSupported:o,VERSION:l}},{"../lib/basic-component-verification":22,"../lib/braintree-error":23,"../lib/promise":36,"./browser-detection":16,"./google-payment":17,"@braintree/wrap-promise":13}],19:[function(e,t,n){"use strict";function r(e,t){var n,r=t?i(t):{},a=o(e.authorization).attrs,u=i(e.analyticsMetadata);r.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION;for(n in r._meta)r._meta.hasOwnProperty(n)&&(u[n]=r._meta[n]);return r._meta=u,a.tokenizationKey?r.tokenizationKey=a.tokenizationKey:r.authorizationFingerprint=a.authorizationFingerprint,r}var o=e("./create-authorization-data"),i=e("./json-clone"),s=e("./constants");t.exports=r},{"./constants":27,"./create-authorization-data":29,"./json-clone":34}],20:[function(e,t,n){"use strict";function r(e){return Math.floor(e/1e3)}function o(e,t,n){var o=e.getConfiguration(),a=e._request,u=r(Date.now()),c=o.gatewayConfiguration.analytics.url,p={analytics:[{kind:i.ANALYTICS_PREFIX+t,timestamp:u}]};a({url:c,method:"post",data:s(o,p),timeout:i.ANALYTICS_REQUEST_TIMEOUT_MS},n)}var i=e("./constants"),s=e("./add-metadata");t.exports={sendEvent:o}},{"./add-metadata":19,"./constants":27}],21:[function(e,t,n){"use strict";function r(e){var t,n,r;for(t=1;t<arguments.length;t++){n=arguments[t];for(r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e}var o="function"==typeof Object.assign?Object.assign:r;t.exports={assign:o,_assign:r}},{}],22:[function(e,t,n){"use strict";function r(e){var t,n,r;return e?(r=e.name,t=e.client,null==t?i.reject(new o({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."})):(n=t.getVersion(),n!==a?i.reject(new o({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n+") and "+r+" (version "+a+") components must be from the same SDK version."})):i.resolve())):i.reject(new o({type:s.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:s.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}var o=e("./braintree-error"),i=e("./promise"),s=e("./errors"),a="3.27.0";t.exports={verify:r}},{"./braintree-error":23,"./errors":31,"./promise":36}],23:[function(e,t,n){"use strict";function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}var o=e("./enumerate");r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.types=o(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(e){return e instanceof r&&e.details&&e.details.originalError?r.findRootError(e.details.originalError):e},t.exports=r},{"./enumerate":30}],24:[function(e,t,n){"use strict";function r(e,t){var n,r,i=document.createElement("a");return i.href=t,r="https:"===i.protocol?i.host.replace(/:443$/,""):"http:"===i.protocol?i.host.replace(/:80$/,""):i.host,n=i.protocol+"//"+r,n===e?!0:(i.href=e,o(e))}var o=e("../is-whitelisted-domain");t.exports={checkOrigin:r}},{"../is-whitelisted-domain":33}],25:[function(e,t,n){"use strict";var r=e("../enumerate");t.exports=r(["CONFIGURATION_REQUEST"],"bus:")},{"../enumerate":30}],26:[function(e,t,n){"use strict";function r(e){if(e=e||{},this.channel=e.channel,!this.channel)throw new a({type:a.types.INTERNAL,code:"MISSING_CHANNEL_ID",message:"Channel ID must be specified."});this.merchantUrl=e.merchantUrl,this._isDestroyed=!1,this._isVerbose=!1,this._listeners=[],this._log("new bus on channel "+this.channel,[location.href])}var o=e("framebus"),i=e("./events"),s=e("./check-origin").checkOrigin,a=e("../braintree-error");r.prototype.on=function(e,t){var n,r,i=t,a=this;this._isDestroyed||(this.merchantUrl&&(i=function(){s(this.origin,a.merchantUrl)&&t.apply(this,arguments)}),n=this._namespaceEvent(e),r=Array.prototype.slice.call(arguments),r[0]=n,r[1]=i,this._log("on",r),o.on.apply(o,r),this._listeners.push({eventName:e,handler:i,originalHandler:t}))},r.prototype.emit=function(e){var t;this._isDestroyed||(t=Array.prototype.slice.call(arguments),t[0]=this._namespaceEvent(e),this._log("emit",t),o.emit.apply(o,t))},r.prototype._offDirect=function(e){var t=Array.prototype.slice.call(arguments);this._isDestroyed||(t[0]=this._namespaceEvent(e),this._log("off",t),o.off.apply(o,t))},r.prototype.off=function(e,t){var n,r,o=t;if(!this._isDestroyed){if(this.merchantUrl)for(n=0;n<this._listeners.length;n++)r=this._listeners[n],r.originalHandler===t&&(o=r.handler);this._offDirect(e,o)}},r.prototype._namespaceEvent=function(e){return["braintree",this.channel,e].join(":")},r.prototype.teardown=function(){var e,t;for(t=0;t<this._listeners.length;t++)e=this._listeners[t],this._offDirect(e.eventName,e.handler);this._listeners.length=0,this._isDestroyed=!0},r.prototype._log=function(e,t){this._isVerbose&&console.log(e,t)},r.events=i,t.exports=r},{"../braintree-error":23,"./check-origin":24,"./events":25,framebus:14}],27:[function(e,t,n){"use strict";var r="3.27.0",o="web";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,INTEGRATION_TIMEOUT_MS:6e4,VERSION:r,INTEGRATION:"custom",SOURCE:"client",PLATFORM:o,BRAINTREE_LIBRARY_VERSION:"braintree/"+o+"/"+r}},{}],28:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(e,t){t.forEach(function(t){e[t]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:t+" cannot be called after teardown."})}})}},{"./braintree-error":23,"./errors":31}],29:[function(e,t,n){"use strict";function r(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}function o(e){var t=e.split("_"),n=t[0],r=t.slice(2).join("_");return{merchantId:r,environment:n}}function i(e){var t,n,i={attrs:{},configUrl:""};return r(e)?(n=o(e),i.attrs.tokenizationKey=e,i.configUrl=a[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(s(e)),i.attrs.authorizationFingerprint=t.authorizationFingerprint,i.configUrl=t.configUrl),i}var s=e("../lib/vendor/polyfill").atob,a={production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"};t.exports=i},{"../lib/vendor/polyfill":38}],30:[function(e,t,n){"use strict";function r(e,t){return t=null==t?"":t,e.reduce(function(e,n){return e[n]=t+n,e},{})}t.exports=r},{}],31:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},CALLBACK_REQUIRED:{type:r.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INVALID_OPTION:{type:r.types.MERCHANT,code:"INVALID_OPTION"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:r.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":23}],32:[function(e,t,n){"use strict";function r(){this._events={}}r.prototype.on=function(e,t){this._events[e]?this._events[e].push(t):this._events[e]=[t]},r.prototype._emit=function(e){var t,n,r=this._events[e];if(r)for(n=Array.prototype.slice.call(arguments,1),t=0;t<r.length;t++)r[t].apply(null,n)},t.exports=r},{}],33:[function(e,t,n){"use strict";function r(e){return e.split(".").slice(-2).join(".")}function o(e){var t;return e=e.toLowerCase(),/^https:/.test(e)?(i=i||document.createElement("a"),i.href=e,t=r(i.hostname),s.hasOwnProperty(t)):!1}var i,s={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=o},{}],34:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],35:[function(e,t,n){"use strict";t.exports=function(e){return Object.keys(e).filter(function(t){return"function"==typeof e[t]})}},{}],36:[function(e,t,n){(function(n){"use strict";var r=n.Promise||e("promise-polyfill");t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":15}],37:[function(e,t,n){"use strict";function r(e){return e?"":".min"}t.exports=r},{}],38:[function(e,t,n){(function(e){"use strict";function n(e){var t,n,r,o,i,s,a,u,c=new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l="";if(!c.test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");u=0;do o=p.indexOf(e.charAt(u++)),i=p.indexOf(e.charAt(u++)),s=p.indexOf(e.charAt(u++)),a=p.indexOf(e.charAt(u++)),t=(63&o)<<2|i>>4&3,n=(15&i)<<4|s>>2&15,r=(3&s)<<6|63&a,l+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):"");while(u<e.length);return l}var r="function"==typeof e.atob?e.atob:n;t.exports={atob:function(t){return r.call(e,t)},_atob:n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],39:[function(e,t,n){"use strict";function r(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)})}t.exports=r},{}],40:[function(e,t,n){"use strict";function r(e,t,n){var r=e;return r+"/web/"+h+"/html/payment-request-frame"+l(n)+".html#"+t}function o(e){var t=e.enabledPaymentMethods||{};_.call(this),this._componentId=p(),this._client=e.client,this._analyticsName="payment-request",this._enabledPaymentMethods={basicCard:t.basicCard!==!1,payWithGoogle:t.payWithGoogle!==!1},this._supportedPaymentMethods=this._constructDefaultSupportedPaymentMethods(),this._defaultSupportedPaymentMethods=Object.keys(this._supportedPaymentMethods).map(function(e){return this._supportedPaymentMethods[e]}.bind(this)),this._bus=new a({channel:this._componentId})}var i=e("../../lib/analytics"),s=e("../../lib/assign").assign,a=e("../../lib/bus"),u=e("../../lib/convert-methods-to-error"),c=e("@braintree/iframer"),p=e("../../lib/vendor/uuid"),l=e("../../lib/use-min"),f=e("../../lib/methods"),d=e("../../lib/promise"),_=e("../../lib/event-emitter"),E=e("../../lib/braintree-error"),h="3.27.0",y=e("../shared/constants").events,T=e("../shared/constants").errors,m=e("@braintree/wrap-promise"),A={Visa:"visa",Mastercard:"mastercard","American Express":"amex","Diners Club":"diners",Discover:"discover",JCB:"jcb",UnionPay:"unionpay",Maestro:"maestro"},N="18278000977346790994";o.prototype=Object.create(_.prototype,{constructor:o}),o.prototype._constructDefaultSupportedPaymentMethods=function(){var e=this._client.getConfiguration(),t="production"===e.gatewayConfiguration.environment,n=e.analyticsMetadata,r=e.gatewayConfiguration.androidPay,o=e.gatewayConfiguration.creditCards,i={};return this._enabledPaymentMethods.basicCard&&o&&o.supportedCardTypes.length>0&&(i.basicCard={supportedMethods:["basic-card"],data:{supportedNetworks:o.supportedCardTypes.map(function(e){return A[e]})}}),this._enabledPaymentMethods.payWithGoogle&&r&&r.enabled&&(i.payWithGoogle={supportedMethods:["https://google.com/pay"],data:{merchantId:N,apiVersion:1,environment:t?"PRODUCTION":"TEST",allowedPaymentMethods:["CARD","TOKENIZED_CARD"],paymentMethodTokenizationParameters:{tokenizationType:"PAYMENT_GATEWAY",parameters:{gateway:"braintree","braintree:merchantId":e.gatewayConfiguration.merchantId,"braintree:authorizationFingerprint":r.googleAuthorizationFingerprint,"braintree:apiVersion":"v1","braintree:sdkVersion":h,"braintree:metadata":JSON.stringify({source:n.source,integration:n.integration,sessionId:n.sessionId,version:h,platform:n.platform})}},cardRequirements:{allowedCardNetworks:r.supportedNetworks.map(function(e){return e.toUpperCase()})}}},"TOKENIZATION_KEY"===e.authorizationType&&(i.payWithGoogle.data.paymentMethodTokenizationParameters.parameters["braintree:clientKey"]=e.authorization)),i},o.prototype.initialize=function(){var e=this._client.getConfiguration(),t=this;return this._frame=c({allowPaymentRequest:!0,name:"braintree-payment-request-frame","class":"braintree-payment-request-frame",height:0,width:0,style:{position:"absolute",left:"-9999px"}}),0===this._defaultSupportedPaymentMethods.length?d.reject(new E(T.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS)):new d(function(n){t._bus.on(y.FRAME_READY,function(e){e(t._client)}),t._bus.on(y.FRAME_CAN_MAKE_REQUESTS,function(){i.sendEvent(t._client,t._analyticsName+".initialized"),t._bus.on(y.SHIPPING_ADDRESS_CHANGE,function(e){var n={target:{shippingAddress:e},updateWith:function(e){t._bus.emit(y.UPDATE_SHIPPING_ADDRESS,e)}};t._emit("shippingAddressChange",n),t._emit("shippingaddresschange",n)}),t._bus.on(y.SHIPPING_OPTION_CHANGE,function(e){var n={target:{shippingOption:e},updateWith:function(e){t._bus.emit(y.UPDATE_SHIPPING_OPTION,e)}};t._emit("shippingOptionChange",n),t._emit("shippingoptionchange",n)}),n(t)}),t._frame.src=r(e.gatewayConfiguration.assetsUrl,t._componentId,e.isDebug),document.body.appendChild(t._frame)})},o.prototype.createSupportedPaymentMethodsConfiguration=function(e,t){var n;if(!e)throw new E(T.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE);if(!this._enabledPaymentMethods[e])throw new E(T.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED);return n=s({},this._supportedPaymentMethods[e]),n.data=s({},n.data,t),n},o.prototype.tokenize=function(e){return new d(function(t,n){this._bus.emit(y.PAYMENT_REQUEST_INITIALIZED,{supportedPaymentMethods:e.supportedPaymentMethods||this._defaultSupportedPaymentMethods,details:e.details,options:e.options}),this._bus.on(y.PAYMENT_REQUEST_SUCCESSFUL,function(e){i.sendEvent(this._client,this._analyticsName+".tokenize.succeeded"),t({nonce:e.nonce,type:e.type,description:e.description,details:{rawPaymentResponse:e.details.rawPaymentResponse,cardType:e.details.cardType,lastFour:e.details.lastFour,lastTwo:e.details.lastTwo},binData:e.binData})}.bind(this)),this._bus.on(y.PAYMENT_REQUEST_FAILED,function(e){var t;"AbortError"===e.name?(t=new E({type:T.PAYMENT_REQUEST_CANCELED.type,code:T.PAYMENT_REQUEST_CANCELED.code,message:T.PAYMENT_REQUEST_CANCELED.message,details:{originalError:e}}),i.sendEvent(this._client,this._analyticsName+".tokenize.canceled")):"PAYMENT_REQUEST_INITIALIZATION_FAILED"===e.name?t=new E({type:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}}):"BRAINTREE_GATEWAY_PAY_WITH_GOOGLE_TOKENIZATION_ERROR"===e.name?t=new E({type:T.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.type,code:T.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.code,message:T.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.message,details:{originalError:e}}):"BRAINTREE_GATEWAY_PAY_WITH_GOOGLE_PARSING_ERROR"===e.name?t=new E({type:T.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.type,code:T.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.code,message:T.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.message,details:{originalError:e}}):(t=new E({code:T.PAYMENT_REQUEST_NOT_COMPLETED.code,type:e.type||E.types.CUSTOMER,message:T.PAYMENT_REQUEST_NOT_COMPLETED.message,details:{originalError:e}}),i.sendEvent(this._client,this._analyticsName+".tokenize.failed")),n(t)}.bind(this))}.bind(this))},o.prototype.teardown=function(){return this._bus.teardown(),this._frame.parentNode.removeChild(this._frame),u(this,f(o.prototype)),i.sendEvent(this._client,this._analyticsName+".teardown-completed"),d.resolve()},t.exports=m.wrapPrototype(o)},{"../../lib/analytics":20,"../../lib/assign":21,"../../lib/braintree-error":23,"../../lib/bus":26,"../../lib/convert-methods-to-error":28,"../../lib/event-emitter":32,"../../lib/methods":35,"../../lib/promise":36,"../../lib/use-min":37,"../../lib/vendor/uuid":39,"../shared/constants":41,"@braintree/iframer":6,"@braintree/wrap-promise":13}],41:[function(e,t,n){"use strict";var r=e("../../lib/braintree-error"),o=e("../../lib/enumerate"),i={};i.events=o(["FRAME_READY","FRAME_CAN_MAKE_REQUESTS","PAYMENT_REQUEST_INITIALIZED","SHIPPING_ADDRESS_CHANGE","UPDATE_SHIPPING_ADDRESS","SHIPPING_OPTION_CHANGE","UPDATE_SHIPPING_OPTION","PAYMENT_REQUEST_FAILED","PAYMENT_REQUEST_SUCCESSFUL"],"payment-request:"),i.errors={PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS",message:"There are no supported payment methods associated with this account."},PAYMENT_REQUEST_INVALID_UPDATE_WITH_EVENT:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_INVALID_UPDATE_WITH_EVENT"},PAYMENT_REQUEST_CANCELED:{type:r.types.CUSTOMER,code:"PAYMENT_REQUEST_CANCELED",message:"Payment request was canceled."},PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED",message:"Something went wrong when configuring the payment request."},PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE",message:"Something went wrong when tokenizing the Pay with Google card."},PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR:{type:r.types.UNKNOWN,code:"PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR",message:"Something went wrong when tokenizing the Pay with Google card."},PAYMENT_REQUEST_NOT_COMPLETED:{code:"PAYMENT_REQUEST_NOT_COMPLETED",message:"Payment request could not be completed."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE",message:"createSupportedPaymentMethodsConfiguration must include a type parameter."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED",message:"createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled."}},t.exports=i},{"../../lib/braintree-error":23,"../../lib/enumerate":30}]},{},[18])(18)});