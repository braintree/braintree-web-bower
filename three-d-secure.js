!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(t.braintree||(t.braintree={})).threeDSecure=e()}}(function(){var e;return function t(e,n,r){function o(s,a){if(!n[s]){if(!e[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[s]={exports:{}};e[s][0].call(l.exports,function(t){var n=e[s][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){"use strict";var r=e("./lib/set-attributes"),o=e("./lib/default-attributes"),i=e("./lib/assign");t.exports=function(e){var t=document.createElement("iframe"),n=i({},o,e);return n.style&&"string"!=typeof n.style&&(i(t.style,n.style),delete n.style),r(t,n),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":2,"./lib/default-attributes":3,"./lib/set-attributes":4}],2:[function(e,t,n){"use strict";t.exports=function(e){var t=Array.prototype.slice.call(arguments,1);return t.forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}},{}],3:[function(e,t,n){"use strict";t.exports={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],4:[function(e,t,n){"use strict";t.exports=function(e,t){var n;for(var r in t)t.hasOwnProperty(r)&&(n=t[r],null==n?e.removeAttribute(r):e.setAttribute(r,n))}},{}],5:[function(e,t,n){"use strict";function r(e){return function(){var t=arguments;setTimeout(function(){e.apply(null,t)},1)}}t.exports=r},{}],6:[function(e,t,n){"use strict";function r(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}t.exports=r},{}],7:[function(e,t,n){"use strict";function r(e,t){return t?void e.then(function(e){t(null,e)})["catch"](function(e){t(e)}):e}t.exports=r},{}],8:[function(e,t,n){"use strict";function r(e){return function(){var t,n=Array.prototype.slice.call(arguments),r=n[n.length-1];return"function"==typeof r&&(t=n.pop(),t=i(o(t))),s(e.apply(this,n),t)}}var o=e("./lib/deferred"),i=e("./lib/once"),s=e("./lib/promise-or-callback");r.wrapPrototype=function(e,t){var n,o,i;return t=t||{},o=t.ignoreMethods||[],i=t.transformPrivateMethods===!0,n=Object.getOwnPropertyNames(e.prototype).filter(function(t){var n,r="constructor"!==t&&"function"==typeof e.prototype[t],s=-1===o.indexOf(t);return n=i?!0:"_"!==t.charAt(0),r&&n&&s}),n.forEach(function(t){var n=e.prototype[t];e.prototype[t]=r(n)}),e},t.exports=r},{"./lib/deferred":5,"./lib/once":6,"./lib/promise-or-callback":7}],9:[function(t,n,r){(function(t){"use strict";!function(o,i){"object"==typeof r&&"undefined"!=typeof n?n.exports=i("undefined"==typeof t?o:t):"function"==typeof e&&e.amd?e([],function(){return i(o)}):o.framebus=i(o)}(this,function(e){function t(e){return null==e?!1:null==e.Window?!1:e.constructor!==e.Window?!1:(g.push(e),!0)}function n(e){var t,n={};for(t in v)v.hasOwnProperty(t)&&(n[t]=v[t]);return n._origin=e||"*",n}function r(e){var t,n,r=s(this);return a(e)?!1:a(r)?!1:(n=Array.prototype.slice.call(arguments,1),t=c(e,n,r),t===!1?!1:(_(b.top||b.self,t,r),!0))}function o(e,t){var n=s(this);return E(e,t,n)?!1:(I[n]=I[n]||{},I[n][e]=I[n][e]||[],I[n][e].push(t),!0)}function i(e,t){var n,r,o=s(this);if(E(e,t,o))return!1;if(r=I[o]&&I[o][e],!r)return!1;for(n=0;n<r.length;n++)if(r[n]===t)return r.splice(n,1),!0;return!1}function s(e){return e&&e._origin||"*"}function a(e){return"string"!=typeof e}function c(e,t,n){var r=!1,o={event:e,origin:n},i=t[t.length-1];"function"==typeof i&&(o.reply=m(i,n),t=t.slice(0,-1)),o.args=t;try{r=R+JSON.stringify(o)}catch(s){throw new Error("Could not stringify event: "+s.message)}return r}function u(e){var t,n,r,o;if(e.data.slice(0,R.length)!==R)return!1;try{t=JSON.parse(e.data.slice(R.length))}catch(i){return!1}return null!=t.reply&&(n=e.origin,r=e.source,o=t.reply,t.reply=function(e){var t=c(o,[e],n);return t===!1?!1:void r.postMessage(t,n)},t.args.push(t.reply)),t}function l(t){b||(b=t||e,b.addEventListener?b.addEventListener("message",p,!1):b.attachEvent?b.attachEvent("onmessage",p):null===b.onmessage?b.onmessage=p:b=null)}function f(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)})}function p(e){var t;a(e.data)||(t=u(e),t&&(d("*",t.event,t.args,e),d(e.origin,t.event,t.args,e),y(e.data,t.origin,e.source)))}function d(e,t,n,r){var o;if(I[e]&&I[e][t])for(o=0;o<I[e][t].length;o++)I[e][t][o].apply(r,n)}function h(e){return e.top!==e?!1:null==e.opener?!1:e.opener===e?!1:e.opener.closed===!0?!1:!0}function _(e,t,n){var r;try{for(e.postMessage(t,n),h(e)&&_(e.opener.top,t,n),r=0;r<e.frames.length;r++)_(e.frames[r],t,n)}catch(o){}}function y(e,t,n){var r,o;for(r=g.length-1;r>=0;r--)o=g[r],o.closed===!0?g=g.slice(r,1):n!==o&&_(o.top,e,t)}function m(e,t){function n(o,i){e(o,i),v.target(t).unsubscribe(r,n)}var r=f();return v.target(t).subscribe(r,n),r}function E(e,t,n){return a(e)?!0:"function"!=typeof t?!0:a(n)?!0:!1}var b,v,g=[],I={},R="/*framebus*/";return l(),v={target:n,include:t,publish:r,pub:r,trigger:r,emit:r,subscribe:o,sub:o,on:o,unsubscribe:i,unsub:i,off:i}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,n){!function(e){function n(){}function r(e,t){return function(){e.apply(t,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function i(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void o._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?s:a)(t.promise,e._value);var r;try{r=n(e._value)}catch(o){return void a(t.promise,o)}s(t.promise,r)}))}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof o)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void l(r(n,t),e)}e._state=1,e._value=t,c(e)}catch(i){a(e,i)}}function a(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)i(e,e._deferreds[t]);e._deferreds=null}function u(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,a(t,e))})}catch(r){if(n)return;n=!0,a(t,r)}}var f=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var r=new this.constructor(n);return i(this,new u(e,t,r)),r},o.all=function(e){var t=Array.prototype.slice.call(e);return new o(function(e,n){function r(i,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(e){r(i,e)},n)}t[i]=s,0===--o&&e(t)}catch(c){n(c)}}if(0===t.length)return e([]);for(var o=t.length,i=0;i<t.length;i++)r(i,t[i])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(t){t(e)})},o.reject=function(e){return new o(function(t,n){n(e)})},o.race=function(e){return new o(function(t,n){for(var r=0,o=e.length;o>r;r++)e[r].then(t,n)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){f(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof t&&t.exports?t.exports=o:e.Promise||(e.Promise=o)}(this)},{}],11:[function(e,t,n){"use strict";function r(e,t){var n,r=t?i(t):{},a=o(e.authorization).attrs,c=i(e.analyticsMetadata);r.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION;for(n in r._meta)r._meta.hasOwnProperty(n)&&(c[n]=r._meta[n]);return r._meta=c,a.tokenizationKey?r.tokenizationKey=a.tokenizationKey:r.authorizationFingerprint=a.authorizationFingerprint,r}var o=e("./create-authorization-data"),i=e("./json-clone"),s=e("./constants");t.exports=r},{"./constants":17,"./create-authorization-data":19,"./json-clone":25}],12:[function(e,t,n){"use strict";function r(e){return Math.floor(e/1e3)}function o(e,t,n){var o=e.getConfiguration(),a=e._request,c=r(Date.now()),u=o.gatewayConfiguration.analytics.url,l={analytics:[{kind:i.ANALYTICS_PREFIX+t,timestamp:c}]};a({url:u,method:"post",data:s(o,l),timeout:i.ANALYTICS_REQUEST_TIMEOUT_MS},n)}var i=e("./constants"),s=e("./add-metadata");t.exports={sendEvent:o}},{"./add-metadata":11,"./constants":17}],13:[function(e,t,n){"use strict";function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}var o=e("./enumerate");r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.types=o(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(e){return e instanceof r&&e.details&&e.details.originalError?r.findRootError(e.details.originalError):e},t.exports=r},{"./enumerate":21}],14:[function(e,t,n){"use strict";function r(e,t){var n,r,i=document.createElement("a");return i.href=t,r="https:"===i.protocol?i.host.replace(/:443$/,""):"http:"===i.protocol?i.host.replace(/:80$/,""):i.host,n=i.protocol+"//"+r,n===e?!0:(i.href=e,o(e))}var o=e("../is-whitelisted-domain");t.exports={checkOrigin:r}},{"../is-whitelisted-domain":24}],15:[function(e,t,n){"use strict";var r=e("../enumerate");t.exports=r(["CONFIGURATION_REQUEST"],"bus:")},{"../enumerate":21}],16:[function(e,t,n){"use strict";function r(e){if(e=e||{},this.channel=e.channel,!this.channel)throw new a({type:a.types.INTERNAL,code:"MISSING_CHANNEL_ID",message:"Channel ID must be specified."});this.merchantUrl=e.merchantUrl,this._isDestroyed=!1,this._isVerbose=!1,this._listeners=[],this._log("new bus on channel "+this.channel,[location.href])}var o=e("framebus"),i=e("./events"),s=e("./check-origin").checkOrigin,a=e("../braintree-error");r.prototype.on=function(e,t){var n,r,i=t,a=this;this._isDestroyed||(this.merchantUrl&&(i=function(){s(this.origin,a.merchantUrl)&&t.apply(this,arguments)}),n=this._namespaceEvent(e),r=Array.prototype.slice.call(arguments),r[0]=n,r[1]=i,this._log("on",r),o.on.apply(o,r),this._listeners.push({eventName:e,handler:i,originalHandler:t}))},r.prototype.emit=function(e){var t;this._isDestroyed||(t=Array.prototype.slice.call(arguments),t[0]=this._namespaceEvent(e),this._log("emit",t),o.emit.apply(o,t))},r.prototype._offDirect=function(e){var t=Array.prototype.slice.call(arguments);this._isDestroyed||(t[0]=this._namespaceEvent(e),this._log("off",t),o.off.apply(o,t))},r.prototype.off=function(e,t){var n,r,o=t;if(!this._isDestroyed){if(this.merchantUrl)for(n=0;n<this._listeners.length;n++)r=this._listeners[n],r.originalHandler===t&&(o=r.handler);this._offDirect(e,o)}},r.prototype._namespaceEvent=function(e){return["braintree",this.channel,e].join(":")},r.prototype.teardown=function(){var e,t;for(t=0;t<this._listeners.length;t++)e=this._listeners[t],this._offDirect(e.eventName,e.handler);this._listeners.length=0,this._isDestroyed=!0},r.prototype._log=function(e,t){this._isVerbose&&console.log(e,t)},r.events=i,t.exports=r},{"../braintree-error":13,"./check-origin":14,"./events":15,framebus:9}],17:[function(e,t,n){"use strict";var r="3.22.1",o="web";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,INTEGRATION_TIMEOUT_MS:6e4,VERSION:r,INTEGRATION:"custom",SOURCE:"client",PLATFORM:o,BRAINTREE_LIBRARY_VERSION:"braintree/"+o+"/"+r}},{}],18:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(e,t){t.forEach(function(t){e[t]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:t+" cannot be called after teardown."})}})}},{"./braintree-error":13,"./errors":22}],19:[function(e,t,n){"use strict";function r(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}function o(e){var t=e.split("_"),n=t[0],r=t.slice(2).join("_");return{merchantId:r,environment:n}}function i(e){var t,n,i={attrs:{},configUrl:""};return r(e)?(n=o(e),i.attrs.tokenizationKey=e,i.configUrl=a[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(s(e)),i.attrs.authorizationFingerprint=t.authorizationFingerprint,i.configUrl=t.configUrl),i}var s=e("../lib/polyfill").atob,a={production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"};t.exports=i},{"../lib/polyfill":27}],20:[function(e,t,n){"use strict";t.exports=function(e){return function(){var t=arguments;setTimeout(function(){e.apply(null,t)},1)}}},{}],21:[function(e,t,n){"use strict";function r(e,t){return t=null==t?"":t,e.reduce(function(e,n){return e[n]=t+n,e},{})}t.exports=r},{}],22:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={CALLBACK_REQUIRED:{type:r.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INVALID_OPTION:{type:r.types.MERCHANT,code:"INVALID_OPTION"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:r.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":13}],23:[function(e,t,n){(function(e){"use strict";function n(t){return t=t||e.location.protocol,"https:"===t}t.exports={isHTTPS:n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],24:[function(e,t,n){"use strict";function r(e){return e.split(".").slice(-2).join(".")}function o(e){var t;return e=e.toLowerCase(),/^https:/.test(e)?(i=i||document.createElement("a"),i.href=e,t=r(i.hostname),s.hasOwnProperty(t)):!1}var i,s={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=o},{}],25:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],26:[function(e,t,n){"use strict";t.exports=function(e){return Object.keys(e).filter(function(t){return"function"==typeof e[t]})}},{}],27:[function(e,t,n){(function(e){"use strict";function n(e){var t,n,r,o,i,s,a,c,u=new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",f="";if(!u.test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");c=0;do o=l.indexOf(e.charAt(c++)),i=l.indexOf(e.charAt(c++)),s=l.indexOf(e.charAt(c++)),a=l.indexOf(e.charAt(c++)),t=(63&o)<<2|i>>4&3,n=(15&i)<<4|s>>2&15,r=(3&s)<<6|63&a,f+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):"");while(c<e.length);return f}var r="function"==typeof e.atob?e.atob:n;t.exports={atob:function(t){return r.call(e,t)},_atob:n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],28:[function(e,t,n){(function(n){"use strict";var r=n.Promise||e("promise-polyfill");t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":10}],29:[function(e,t,n){"use strict";function r(e){return e?"":".min"}t.exports=r},{}],30:[function(e,t,n){"use strict";function r(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)})}t.exports=r},{}],31:[function(e,t,n){"use strict";function r(e){this._options=e,this._assetsUrl=e.client.getConfiguration().gatewayConfiguration.assetsUrl,this._isDebug=e.client.getConfiguration().isDebug,this._client=e.client}var o=e("../../lib/braintree-error"),i=e("../../lib/analytics"),s=e("../../lib/methods"),a=e("../../lib/convert-methods-to-error"),c=e("../shared/constants"),u=e("../../lib/use-min"),l=e("../../lib/bus"),f=e("../../lib/uuid"),p=e("../../lib/deferred"),d=e("../shared/errors"),h=e("../shared/events"),_="3.22.1",y=e("@braintree/iframer"),m=e("../../lib/promise"),E=e("@braintree/wrap-promise"),b=400,v=400;r.prototype.verifyCard=function(e){var t,n,r,i,s,a=this;return e=e||{},this._verifyCardInProgress===!0?i=d.THREEDS_AUTHENTICATION_IN_PROGRESS:e.nonce?e.amount?"function"!=typeof e.addFrame?s="an addFrame function":"function"!=typeof e.removeFrame&&(s="a removeFrame function"):s="an amount":s="a nonce",s&&(i={type:d.THREEDS_MISSING_VERIFY_CARD_OPTION.type,code:d.THREEDS_MISSING_VERIFY_CARD_OPTION.code,message:"verifyCard options must include "+s+"."}),i?m.reject(new o(i)):(this._verifyCardInProgress=!0,n=p(e.addFrame),r=p(e.removeFrame),t="payment_methods/"+e.nonce+"/three_d_secure/lookup",this._client.request({endpoint:t,method:"post",data:{amount:e.amount}}).then(function(e){return a._lookupPaymentMethod=e.paymentMethod,new m(function(t,o){a._verifyCardCallback=function(e,n){a._verifyCardInProgress=!1,e?o(e):t(n)},a._handleLookupResponse({lookupResponse:e,addFrame:n,removeFrame:r})})})["catch"](function(e){return a._verifyCardInProgress=!1,m.reject(e)}))},r.prototype.cancelVerifyCard=function(){return this._verifyCardInProgress=!1,this._lookupPaymentMethod?m.resolve(this._lookupPaymentMethod):m.reject(new o(d.THREEDS_NO_VERIFICATION_PAYLOAD))},r.prototype._handleLookupResponse=function(e){var t=e.lookupResponse;t.lookup&&t.lookup.acsUrl&&t.lookup.acsUrl.length>0?e.addFrame(null,this._createIframe({response:t.lookup,removeFrame:e.removeFrame})):this._verifyCardCallback(null,{nonce:t.paymentMethod.nonce,verificationDetails:t.threeDSecureInfo})},r.prototype._createIframe=function(e){var t,n,r=window.location.href,o=e.response;return this._bus=new l({channel:f(),merchantUrl:location.href}),n=this._assetsUrl+"/web/"+_+"/html/three-d-secure-authentication-complete-frame.html?channel="+encodeURIComponent(this._bus.channel)+"&",r.indexOf("#")>-1&&(r=r.split("#")[0]),this._bus.on(l.events.CONFIGURATION_REQUEST,function(e){e({acsUrl:o.acsUrl,pareq:o.pareq,termUrl:o.termUrl+"&three_d_secure_version="+_+"&authentication_complete_base_url="+encodeURIComponent(n),md:o.md,parentUrl:r})}),this._bus.on(h.AUTHENTICATION_COMPLETE,function(t){this._handleAuthResponse(t,e)}.bind(this)),t=this._assetsUrl+"/web/"+_+"/html/three-d-secure-bank-frame"+u(this._isDebug)+".html",this._bankIframe=y({src:t,height:b,width:v,name:c.LANDING_FRAME_NAME+"_"+this._bus.channel}),this._bankIframe},r.prototype._handleAuthResponse=function(e,t){var n=JSON.parse(e.auth_response);this._bus.teardown(),t.removeFrame(),p(function(){n.success?this._verifyCardCallback(null,this._formatAuthResponse(n.paymentMethod,n.threeDSecureInfo)):n.threeDSecureInfo&&n.threeDSecureInfo.liabilityShiftPossible?this._verifyCardCallback(null,this._formatAuthResponse(this._lookupPaymentMethod,n.threeDSecureInfo)):this._verifyCardCallback(new o({type:o.types.UNKNOWN,code:"UNKNOWN_AUTH_RESPONSE",message:n.error.message}))}.bind(this))()},r.prototype._formatAuthResponse=function(e,t){return{nonce:e.nonce,details:e.details,description:e.description,liabilityShifted:t.liabilityShifted,liabilityShiftPossible:t.liabilityShiftPossible}},r.prototype.teardown=function(){var e;return a(this,s(r.prototype)),i.sendEvent(this._options.client,"threedsecure.teardown-completed"),this._bus&&this._bus.teardown(),this._bankIframe&&(e=this._bankIframe.parentNode,e&&e.removeChild(this._bankIframe)),m.resolve()},t.exports=E.wrapPrototype(r)},{"../../lib/analytics":12,"../../lib/braintree-error":13,"../../lib/bus":16,"../../lib/convert-methods-to-error":18,"../../lib/deferred":20,"../../lib/methods":26,"../../lib/promise":28,"../../lib/use-min":29,"../../lib/uuid":30,"../shared/constants":33,"../shared/errors":34,"../shared/events":35,"@braintree/iframer":1,"@braintree/wrap-promise":8}],32:[function(e,t,n){"use strict";function r(e){var t,n,r,p;return null==e.client?f.reject(new s({type:u.INSTANTIATION_OPTION_REQUIRED.type,code:u.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating 3D Secure."})):(t=e.client.getConfiguration(),r=e.client.getVersion(),t.gatewayConfiguration.threeDSecureEnabled?r!==l&&(n={type:u.INCOMPATIBLE_VERSIONS.type,code:u.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+r+") and 3D Secure (version "+l+") components must be from the same SDK version."}):n=c.THREEDS_NOT_ENABLED,p="production"===t.gatewayConfiguration.environment,p&&!i()&&(n=c.THREEDS_HTTPS_REQUIRED),n?f.reject(new s(n)):(a.sendEvent(e.client,"threedsecure.initialized"),f.resolve(new o(e))))}var o=e("./external/three-d-secure"),i=e("../lib/is-https").isHTTPS,s=e("../lib/braintree-error"),a=e("../lib/analytics"),c=e("./shared/errors"),u=e("../lib/errors"),l="3.22.1",f=e("../lib/promise"),p=e("@braintree/wrap-promise");t.exports={create:p(r),VERSION:l}},{"../lib/analytics":12,"../lib/braintree-error":13,"../lib/errors":22,"../lib/is-https":23,"../lib/promise":28,"./external/three-d-secure":31,"./shared/errors":34,"@braintree/wrap-promise":8}],33:[function(e,t,n){"use strict";t.exports={LANDING_FRAME_NAME:"braintreethreedsecurelanding"}},{}],34:[function(e,t,n){"use strict";var r=e("../../lib/braintree-error");t.exports={THREEDS_AUTHENTICATION_IN_PROGRESS:{type:r.types.MERCHANT,code:"THREEDS_AUTHENTICATION_IN_PROGRESS",message:"Cannot call verifyCard while existing authentication is in progress."},THREEDS_MISSING_VERIFY_CARD_OPTION:{type:r.types.MERCHANT,code:"THREEDS_MISSING_VERIFY_CARD_OPTION"},THREEDS_NO_VERIFICATION_PAYLOAD:{type:r.types.MERCHANT,code:"THREEDS_NO_VERIFICATION_PAYLOAD",message:"No verification payload available."},THREEDS_NOT_ENABLED:{type:r.types.MERCHANT,code:"THREEDS_NOT_ENABLED",message:"3D Secure is not enabled for this merchant."},THREEDS_HTTPS_REQUIRED:{type:r.types.MERCHANT,code:"THREEDS_HTTPS_REQUIRED",message:"3D Secure requires HTTPS."},THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN:{type:r.types.INTERNAL,code:"THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN",message:"Term Url must be on a Braintree domain."}}},{"../../lib/braintree-error":13}],35:[function(e,t,n){"use strict";var r=e("../../lib/enumerate");t.exports=r(["AUTHENTICATION_COMPLETE"],"threedsecure:")},{"../../lib/enumerate":21}]},{},[32])(32)});