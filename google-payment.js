!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(t.braintree||(t.braintree={})).googlePayment=e()}}(function(){var e;return function t(e,n,i){function r(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return r(n?n:t)},f,f.exports,t,e,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,t,n){"use strict";var i=e("./is-android"),r=e("./is-chrome"),o=e("./is-ie"),s=e("./is-ie9"),a=e("./is-ie10"),u=e("./is-ie11"),c=e("./is-edge"),f=e("./is-ios"),p=e("./is-ios-firefox"),l=e("./is-ios-safari"),d=e("./is-ios-uiwebview"),E=e("./is-ios-webview"),_=e("./is-ios-wkwebview"),h=e("./is-mobile-firefox"),y=e("./is-samsung"),m=e("./supports-popups");t.exports={isAndroid:i,isChrome:r,isIe:o,isIe9:s,isIe10:a,isIe11:u,isEdge:c,isIos:f,isIosFirefox:p,isIosSafari:l,isIosUIWebview:d,isIosWebview:E,isIosWKWebview:_,isMobileFirefox:h,isSamsungBrowser:y,supportsPopups:m}},{"./is-android":2,"./is-chrome":3,"./is-edge":4,"./is-ie":5,"./is-ie10":6,"./is-ie11":7,"./is-ie9":8,"./is-ios":14,"./is-ios-firefox":9,"./is-ios-safari":10,"./is-ios-uiwebview":11,"./is-ios-webview":12,"./is-ios-wkwebview":13,"./is-mobile-firefox":15,"./is-samsung":16,"./supports-popups":17}],2:[function(e,t,n){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/Android/.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(e,t,n){"use strict";var i=e("./is-edge"),r=e("./is-samsung");t.exports=function(e){return e=e||navigator.userAgent,!(-1===e.indexOf("Chrome")&&-1===e.indexOf("CriOS")||i(e)||r(e))}},{"./is-edge":4,"./is-samsung":16}],4:[function(e,t,n){"use strict";t.exports=function(e){return e=e||navigator.userAgent,-1!==e.indexOf("Edge/")}},{}],5:[function(e,t,n){(function(n){"use strict";var i=e("./is-ie11");t.exports=function(e){return e=e||n.navigator.userAgent,-1!==e.indexOf("MSIE")||i(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ie11":7}],6:[function(e,t,n){"use strict";t.exports=function(e){return e=e||navigator.userAgent,-1!==e.indexOf("MSIE 10")}},{}],7:[function(e,t,n){"use strict";t.exports=function(e){return e=e||navigator.userAgent,-1!==e.indexOf("Trident/7")}},{}],8:[function(e,t,n){"use strict";t.exports=function(e){return e=e||navigator.userAgent,-1!==e.indexOf("MSIE 9")}},{}],9:[function(e,t,n){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/FxiOS/i.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,n){"use strict";function i(e){return e.match(o)}var r=e("./is-ios"),o=/webkit/i;t.exports=function(e){return e=e||navigator.userAgent,r(e)&&i(e)&&-1===e.indexOf("CriOS")}},{"./is-ios":14}],11:[function(e,t,n){(function(n){"use strict";var i=e("./is-ios-webview");t.exports=function(e,t){return t="undefined"!=typeof t?t:n.statusbar.visible,i(e)&&!t}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ios-webview":12}],12:[function(e,t,n){(function(n){"use strict";function i(e){return/\bGSA\b/.test(e)}var r=e("./is-ios");t.exports=function(e){return e=e||n.navigator.userAgent,r(e)?i(e)?!0:/.+AppleWebKit(?!.*Safari)/.test(e):!1}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ios":14}],13:[function(e,t,n){(function(n){"use strict";var i=e("./is-ios-webview");t.exports=function(e,t){return t="undefined"!=typeof t?t:n.statusbar.visible,i(e)&&t}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ios-webview":12}],14:[function(e,t,n){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/iPhone|iPod|iPad/i.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,n){(function(n){"use strict";var i=e("./is-ios-firefox");t.exports=function(e){return e=e||n.navigator.userAgent,i(e)||/iPhone|iPod|iPad|Mobile|Tablet/i.test(e)&&/Firefox/i.test(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ios-firefox":9}],16:[function(e,t,n){(function(e){"use strict";t.exports=function(t){return t=t||e.navigator.userAgent,/SamsungBrowser/i.test(t)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(e,t,n){(function(n){"use strict";function i(e){var t,i;return e=e||n.navigator.userAgent,(t=e.match(/CriOS\/(\d+)\./))?(i=parseInt(t[1],10),a>i):!1}function r(e){return e=e||n.navigator.userAgent,e.indexOf("Opera Mini")>-1}function o(e){var t=/Version\/[\d\.]+/;return e=e||n.navigator.userAgent,u(e)?t.test(e)&&!r(e):!1}function s(e){return!p(e)&&!l(e)&&/samsung/i.test(e)}var a=48,u=e("./is-android"),c=e("./is-ios-firefox"),f=e("./is-ios-webview"),p=e("./is-chrome"),l=e("./is-samsung");t.exports=function(e){return e=e||n.navigator.userAgent,!(f(e)||c(e)||o(e)||r(e)||i(e)||s(e))}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-android":2,"./is-chrome":3,"./is-ios-firefox":9,"./is-ios-webview":12,"./is-samsung":16}],18:[function(e,t,n){"use strict";var i=e("./lib/set-attributes"),r=e("./lib/default-attributes"),o=e("./lib/assign");t.exports=function(e){var t=document.createElement("iframe"),n=o({},r,e);return n.style&&"string"!=typeof n.style&&(o(t.style,n.style),delete n.style),i(t,n),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":19,"./lib/default-attributes":20,"./lib/set-attributes":21}],19:[function(e,t,n){"use strict";t.exports=function(e){var t=Array.prototype.slice.call(arguments,1);return t.forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}},{}],20:[function(e,t,n){"use strict";t.exports={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],21:[function(e,t,n){"use strict";t.exports=function(e,t){var n;for(var i in t)t.hasOwnProperty(i)&&(n=t[i],null==n?e.removeAttribute(i):e.setAttribute(i,n))}},{}],22:[function(e,t,n){"use strict";function i(e){return function(){var t=arguments;setTimeout(function(){e.apply(null,t)},1)}}t.exports=i},{}],23:[function(e,t,n){"use strict";function i(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}t.exports=i},{}],24:[function(e,t,n){"use strict";function i(e,t){return t?void e.then(function(e){t(null,e)})["catch"](function(e){t(e)}):e}t.exports=i},{}],25:[function(e,t,n){"use strict";function i(e){return function(){var t,n=Array.prototype.slice.call(arguments),i=n[n.length-1];return"function"==typeof i&&(t=n.pop(),t=o(r(t))),s(e.apply(this,n),t)}}var r=e("./lib/deferred"),o=e("./lib/once"),s=e("./lib/promise-or-callback");i.wrapPrototype=function(e,t){var n,r,o;return t=t||{},r=t.ignoreMethods||[],o=t.transformPrivateMethods===!0,n=Object.getOwnPropertyNames(e.prototype).filter(function(t){var n,i="constructor"!==t&&"function"==typeof e.prototype[t],s=-1===r.indexOf(t);return n=o?!0:"_"!==t.charAt(0),i&&n&&s}),n.forEach(function(t){var n=e.prototype[t];e.prototype[t]=i(n)}),e},t.exports=i},{"./lib/deferred":22,"./lib/once":23,"./lib/promise-or-callback":24}],26:[function(t,n,i){(function(t){"use strict";!function(r,o){"object"==typeof i&&"undefined"!=typeof n?n.exports=o("undefined"==typeof t?r:t):"function"==typeof e&&e.amd?e([],function(){return o(r)}):r.framebus=o(r)}(this,function(e){function t(e){return null==e?!1:null==e.Window?!1:e.constructor!==e.Window?!1:(A.push(e),!0)}function n(e){var t,n={};for(t in g)g.hasOwnProperty(t)&&(n[t]=g[t]);return n._origin=e||"*",n}function i(e){var t,n,i=s(this);return a(e)?!1:a(i)?!1:(n=Array.prototype.slice.call(arguments,1),t=u(e,n,i),t===!1?!1:(_(T.top||T.self,t,i),!0))}function r(e,t){var n=s(this);return m(e,t,n)?!1:(b[n]=b[n]||{},b[n][e]=b[n][e]||[],b[n][e].push(t),!0)}function o(e,t){var n,i,r=s(this);if(m(e,t,r))return!1;if(i=b[r]&&b[r][e],!i)return!1;for(n=0;n<i.length;n++)if(i[n]===t)return i.splice(n,1),!0;return!1}function s(e){return e&&e._origin||"*"}function a(e){return"string"!=typeof e}function u(e,t,n){var i=!1,r={event:e,origin:n},o=t[t.length-1];"function"==typeof o&&(r.reply=y(o,n),t=t.slice(0,-1)),r.args=t;try{i=N+JSON.stringify(r)}catch(s){throw new Error("Could not stringify event: "+s.message)}return i}function c(e){var t,n,i,r;if(e.data.slice(0,N.length)!==N)return!1;try{t=JSON.parse(e.data.slice(N.length))}catch(o){return!1}return null!=t.reply&&(n=e.origin,i=e.source,r=t.reply,t.reply=function(e){var t=u(r,[e],n);return t===!1?!1:void i.postMessage(t,n)},t.args.push(t.reply)),t}function f(t){T||(T=t||e,T.addEventListener?T.addEventListener("message",l,!1):T.attachEvent?T.attachEvent("onmessage",l):null===T.onmessage?T.onmessage=l:T=null)}function p(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)})}function l(e){var t;a(e.data)||(t=c(e),t&&(d("*",t.event,t.args,e),d(e.origin,t.event,t.args,e),h(e.data,t.origin,e.source)))}function d(e,t,n,i){var r;if(b[e]&&b[e][t])for(r=0;r<b[e][t].length;r++)b[e][t][r].apply(i,n)}function E(e){return e.top!==e?!1:null==e.opener?!1:e.opener===e?!1:e.opener.closed===!0?!1:!0}function _(e,t,n){var i;try{for(e.postMessage(t,n),E(e)&&_(e.opener.top,t,n),i=0;i<e.frames.length;i++)_(e.frames[i],t,n)}catch(r){}}function h(e,t,n){var i,r;for(i=A.length-1;i>=0;i--)r=A[i],r.closed===!0?A=A.slice(i,1):n!==r&&_(r.top,e,t)}function y(e,t){function n(r,o){e(r,o),g.target(t).unsubscribe(i,n)}var i=p();return g.target(t).subscribe(i,n),i}function m(e,t,n){return a(e)?!0:"function"!=typeof t?!0:a(n)?!0:!1}var T,g,A=[],b={},N="/*framebus*/";return f(),g={target:n,include:t,publish:i,pub:i,trigger:i,emit:i,subscribe:r,sub:r,on:r,unsubscribe:o,unsub:o,off:o}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],27:[function(e,t,n){!function(e){function n(){}function i(e,t){return function(){e.apply(t,arguments)}}function r(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function o(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?s:a)(t.promise,e._value);var i;try{i=n(e._value)}catch(r){return void a(t.promise,r)}s(t.promise,i)}))}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void u(e);if("function"==typeof n)return void f(i(n,t),e)}e._state=1,e._value=t,u(e)}catch(o){a(e,o)}}function a(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)o(e,e._deferreds[t]);e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function f(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,a(t,e))})}catch(i){if(n)return;n=!0,a(t,i)}}var p=setTimeout;r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var i=new this.constructor(n);return o(this,new c(e,t,i)),i},r.all=function(e){var t=Array.prototype.slice.call(e);return new r(function(e,n){function i(o,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(e){i(o,e)},n)}t[o]=s,0===--r&&e(t)}catch(u){n(u)}}if(0===t.length)return e([]);for(var r=t.length,o=0;o<t.length;o++)i(o,t[o])})},r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,n){for(var i=0,r=e.length;r>i;i++)e[i].then(t,n)})},r._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){p(e,0)},r._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},r._setImmediateFn=function(e){r._immediateFn=e},r._setUnhandledRejectionFn=function(e){r._unhandledRejectionFn=e},"undefined"!=typeof t&&t.exports?t.exports=r:e.Promise||(e.Promise=r)}(this)},{}],28:[function(e,t,n){"use strict";function i(e){o.call(this,{client:e.client,enabledPaymentMethods:{basicCard:!1,payWithGoogle:!0}}),this._analyticsName="google-payment"}var r=e("../lib/braintree-error"),o=e("../payment-request/external/payment-request"),s=e("../lib/promise"),a=e("@braintree/wrap-promise");i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.createSupportedPaymentMethodsConfiguration=function(e){return o.prototype.createSupportedPaymentMethodsConfiguration.call(this,"payWithGoogle",e)},i.prototype.tokenize=function(e){var t;if(e.supportedPaymentMethods){if("https://google.com/pay"!==e.supportedPaymentMethods.supportedMethods[0])return s.reject(new r({type:r.types.MERCHANT,code:"PAY_WITH_GOOGLE_CAN_ONLY_TOKENIZE_WITH_PAY_WITH_GOOGLE",message:"Only Pay with Google is supported in supportedPaymentMethods."}));t=[e.supportedPaymentMethods]}return o.prototype.tokenize.call(this,{supportedPaymentMethods:t,details:e.details,options:e.options})},t.exports=a.wrapPrototype(i)},{"../lib/braintree-error":34,"../lib/promise":47,"../payment-request/external/payment-request":50,"@braintree/wrap-promise":25}],29:[function(e,t,n){"use strict";function i(e){return o.verify({name:"Pay with Google",client:e.client}).then(function(){var t;return e.client.getConfiguration().gatewayConfiguration.androidPay?(t=new u(e),t.initialize()):c.reject(new s({type:s.types.MERCHANT,code:"PAY_WITH_GOOGLE_NOT_ENABLED",message:"Pay with Google is not enabled for this merchant."}))})}function r(){return Boolean(window.PaymentRequest&&a.isChrome())}var o=e("../lib/basic-component-verification"),s=e("../lib/braintree-error"),a=e("@braintree/browser-detection"),u=e("./google-payment"),c=e("../lib/promise"),f=e("@braintree/wrap-promise"),p="3.24.0";t.exports={create:f(i),isSupported:r,VERSION:p}},{"../lib/basic-component-verification":33,"../lib/braintree-error":34,"../lib/promise":47,"./google-payment":28,"@braintree/browser-detection":1,"@braintree/wrap-promise":25}],30:[function(e,t,n){"use strict";function i(e,t){var n,i=t?o(t):{},a=r(e.authorization).attrs,u=o(e.analyticsMetadata);i.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION;for(n in i._meta)i._meta.hasOwnProperty(n)&&(u[n]=i._meta[n]);return i._meta=u,a.tokenizationKey?i.tokenizationKey=a.tokenizationKey:i.authorizationFingerprint=a.authorizationFingerprint,i}var r=e("./create-authorization-data"),o=e("./json-clone"),s=e("./constants");t.exports=i},{"./constants":38,"./create-authorization-data":40,"./json-clone":44}],31:[function(e,t,n){"use strict";function i(e){return Math.floor(e/1e3)}function r(e,t,n){var r=e.getConfiguration(),a=e._request,u=i(Date.now()),c=r.gatewayConfiguration.analytics.url,f={analytics:[{kind:o.ANALYTICS_PREFIX+t,timestamp:u}]};a({url:c,method:"post",data:s(r,f),timeout:o.ANALYTICS_REQUEST_TIMEOUT_MS},n)}var o=e("./constants"),s=e("./add-metadata");t.exports={sendEvent:r}},{"./add-metadata":30,"./constants":38}],32:[function(e,t,n){"use strict";function i(e){var t,n,i;for(t=1;t<arguments.length;t++){n=arguments[t];for(i in n)n.hasOwnProperty(i)&&(e[i]=n[i])}return e}var r="function"==typeof Object.assign?Object.assign:i;t.exports={assign:r,_assign:i}},{}],33:[function(e,t,n){"use strict";function i(e){var t,n,i;return e?(i=e.name,t=e.client,null==t?o.reject(new r({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+i+"."})):(n=t.getVersion(),n!==a?o.reject(new r({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n+") and "+i+" (version "+a+") components must be from the same SDK version."})):o.resolve())):o.reject(new r({type:s.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:s.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}var r=e("./braintree-error"),o=e("./promise"),s=e("./errors"),a="3.24.0";t.exports={verify:i}},{"./braintree-error":34,"./errors":42,"./promise":47}],34:[function(e,t,n){"use strict";function i(e){if(!i.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}var r=e("./enumerate");i.prototype=Object.create(Error.prototype),i.prototype.constructor=i,i.types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),i.findRootError=function(e){return e instanceof i&&e.details&&e.details.originalError?i.findRootError(e.details.originalError):e},t.exports=i},{"./enumerate":41}],35:[function(e,t,n){"use strict";function i(e,t){var n,i,o=document.createElement("a");return o.href=t,i="https:"===o.protocol?o.host.replace(/:443$/,""):"http:"===o.protocol?o.host.replace(/:80$/,""):o.host,n=o.protocol+"//"+i,n===e?!0:(o.href=e,r(e))}var r=e("../is-whitelisted-domain");t.exports={checkOrigin:i}},{"../is-whitelisted-domain":43}],36:[function(e,t,n){"use strict";var i=e("../enumerate");t.exports=i(["CONFIGURATION_REQUEST"],"bus:")},{"../enumerate":41}],37:[function(e,t,n){"use strict";function i(e){if(e=e||{},this.channel=e.channel,!this.channel)throw new a({type:a.types.INTERNAL,code:"MISSING_CHANNEL_ID",message:"Channel ID must be specified."});this.merchantUrl=e.merchantUrl,this._isDestroyed=!1,this._isVerbose=!1,this._listeners=[],this._log("new bus on channel "+this.channel,[location.href])}var r=e("framebus"),o=e("./events"),s=e("./check-origin").checkOrigin,a=e("../braintree-error");i.prototype.on=function(e,t){var n,i,o=t,a=this;this._isDestroyed||(this.merchantUrl&&(o=function(){s(this.origin,a.merchantUrl)&&t.apply(this,arguments)}),n=this._namespaceEvent(e),i=Array.prototype.slice.call(arguments),i[0]=n,i[1]=o,this._log("on",i),r.on.apply(r,i),this._listeners.push({eventName:e,handler:o,originalHandler:t}))},i.prototype.emit=function(e){var t;this._isDestroyed||(t=Array.prototype.slice.call(arguments),t[0]=this._namespaceEvent(e),this._log("emit",t),r.emit.apply(r,t))},i.prototype._offDirect=function(e){var t=Array.prototype.slice.call(arguments);this._isDestroyed||(t[0]=this._namespaceEvent(e),this._log("off",t),r.off.apply(r,t))},i.prototype.off=function(e,t){var n,i,r=t;if(!this._isDestroyed){if(this.merchantUrl)for(n=0;n<this._listeners.length;n++)i=this._listeners[n],i.originalHandler===t&&(r=i.handler);this._offDirect(e,r)}},i.prototype._namespaceEvent=function(e){return["braintree",this.channel,e].join(":")},i.prototype.teardown=function(){var e,t;for(t=0;t<this._listeners.length;t++)e=this._listeners[t],this._offDirect(e.eventName,e.handler);this._listeners.length=0,this._isDestroyed=!0},i.prototype._log=function(e,t){this._isVerbose&&console.log(e,t)},i.events=o,t.exports=i},{"../braintree-error":34,"./check-origin":35,"./events":36,framebus:26}],38:[function(e,t,n){"use strict";var i="3.24.0",r="web";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,INTEGRATION_TIMEOUT_MS:6e4,VERSION:i,INTEGRATION:"custom",SOURCE:"client",PLATFORM:r,BRAINTREE_LIBRARY_VERSION:"braintree/"+r+"/"+i}},{}],39:[function(e,t,n){"use strict";var i=e("./braintree-error"),r=e("./errors");t.exports=function(e,t){t.forEach(function(t){e[t]=function(){throw new i({type:r.METHOD_CALLED_AFTER_TEARDOWN.type,code:r.METHOD_CALLED_AFTER_TEARDOWN.code,message:t+" cannot be called after teardown."})}})}},{"./braintree-error":34,"./errors":42}],40:[function(e,t,n){"use strict";function i(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}function r(e){var t=e.split("_"),n=t[0],i=t.slice(2).join("_");return{merchantId:i,environment:n}}function o(e){var t,n,o={attrs:{},configUrl:""};return i(e)?(n=r(e),o.attrs.tokenizationKey=e,o.configUrl=a[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(s(e)),o.attrs.authorizationFingerprint=t.authorizationFingerprint,o.configUrl=t.configUrl),o}var s=e("../lib/polyfill").atob,a={production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"};t.exports=o},{"../lib/polyfill":46}],41:[function(e,t,n){"use strict";function i(e,t){return t=null==t?"":t,e.reduce(function(e,n){return e[n]=t+n,e},{})}t.exports=i},{}],42:[function(e,t,n){"use strict";var i=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:i.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},CALLBACK_REQUIRED:{type:i.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:i.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INVALID_OPTION:{type:i.types.MERCHANT,code:"INVALID_OPTION"},INCOMPATIBLE_VERSIONS:{type:i.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:i.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:i.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":34}],43:[function(e,t,n){"use strict";function i(e){return e.split(".").slice(-2).join(".")}function r(e){var t;return e=e.toLowerCase(),/^https:/.test(e)?(o=o||document.createElement("a"),o.href=e,t=i(o.hostname),s.hasOwnProperty(t)):!1}var o,s={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=r},{}],44:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],45:[function(e,t,n){"use strict";t.exports=function(e){return Object.keys(e).filter(function(t){return"function"==typeof e[t]})}},{}],46:[function(e,t,n){(function(e){"use strict";function n(e){var t,n,i,r,o,s,a,u,c=new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p="";if(!c.test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");u=0;do r=f.indexOf(e.charAt(u++)),o=f.indexOf(e.charAt(u++)),s=f.indexOf(e.charAt(u++)),a=f.indexOf(e.charAt(u++)),t=(63&r)<<2|o>>4&3,n=(15&o)<<4|s>>2&15,i=(3&s)<<6|63&a,p+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(i?String.fromCharCode(i):"");while(u<e.length);return p}var i="function"==typeof e.atob?e.atob:n;t.exports={atob:function(t){return i.call(e,t)},_atob:n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],47:[function(e,t,n){(function(n){"use strict";var i=n.Promise||e("promise-polyfill");t.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":27}],48:[function(e,t,n){"use strict";function i(e){return e?"":".min"}t.exports=i},{}],49:[function(e,t,n){"use strict";function i(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)})}t.exports=i},{}],50:[function(e,t,n){"use strict";function i(e,t,n){return e+"/web/"+_+"/html/payment-request-frame"+p(n)+".html#"+t}function r(e){var t=e.enabledPaymentMethods||{};this._componentId=f(),this._client=e.client,this._analyticsName="payment-request",this._enabledPaymentMethods={basicCard:t.basicCard!==!1,payWithGoogle:t.payWithGoogle!==!1},this._supportedPaymentMethods=this._constructDefaultSupportedPaymentMethods(),this._defaultSupportedPaymentMethods=Object.keys(this._supportedPaymentMethods).map(function(e){return this._supportedPaymentMethods[e]}.bind(this)),this._bus=new a({channel:this._componentId})}var o=e("../../lib/analytics"),s=e("../../lib/assign").assign,a=e("../../lib/bus"),u=e("../../lib/convert-methods-to-error"),c=e("@braintree/iframer"),f=e("../../lib/uuid"),p=e("../../lib/use-min"),l=e("../../lib/methods"),d=e("../../lib/promise"),E=e("../../lib/braintree-error"),_="3.24.0",h=e("../shared/constants").events,y=e("../shared/constants").errors,m=e("@braintree/wrap-promise"),T={Visa:"visa",Mastercard:"mastercard","American Express":"amex","Diners Club":"diners",Discover:"discover",JCB:"jcb",UnionPay:"unionpay",Maestro:"maestro"},g="18278000977346790994";r.prototype._constructDefaultSupportedPaymentMethods=function(){var e=this._client.getConfiguration(),t="production"===e.gatewayConfiguration.environment,n=e.analyticsMetadata,i=e.gatewayConfiguration.androidPay,r=e.gatewayConfiguration.creditCards,o={};return this._enabledPaymentMethods.basicCard&&r&&r.supportedCardTypes.length>0&&(o.basicCard={supportedMethods:["basic-card"],data:{supportedNetworks:r.supportedCardTypes.map(function(e){return T[e]})}}),this._enabledPaymentMethods.payWithGoogle&&i&&i.enabled&&(o.payWithGoogle={supportedMethods:["https://google.com/pay"],data:{merchantId:g,apiVersion:1,environment:t?"PRODUCTION":"TEST",allowedPaymentMethods:["CARD","TOKENIZED_CARD"],paymentMethodTokenizationParameters:{tokenizationType:"PAYMENT_GATEWAY",parameters:{gateway:"braintree","braintree:merchantId":e.gatewayConfiguration.merchantId,"braintree:authorizationFingerprint":i.googleAuthorizationFingerprint,"braintree:apiVersion":"v1","braintree:sdkVersion":_,"braintree:metadata":JSON.stringify({source:n.source,integration:n.integration,sessionId:n.sessionId,version:_,platform:n.platform})}},cardRequirements:{allowedCardNetworks:i.supportedNetworks.map(function(e){return e.toUpperCase()})}}},"TOKENIZATION_KEY"===e.authorizationType&&(o.payWithGoogle.data.paymentMethodTokenizationParameters.parameters["braintree:clientKey"]=e.authorization)),o},r.prototype.initialize=function(){var e=this._client.getConfiguration();return this._frame=c({allowPaymentRequest:!0,name:"braintree-payment-request-frame","class":"braintree-payment-request-frame",height:0,width:0,style:{position:"absolute",left:"-9999px"}}),0===this._defaultSupportedPaymentMethods.length?d.reject(new E(y.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS)):new d(function(t){this._bus.on(h.FRAME_READY,function(e){e(this._client)}.bind(this)),this._bus.on(h.FRAME_CAN_MAKE_REQUESTS,function(){o.sendEvent(this._client,this._analyticsName+".initialized"),t(this)}.bind(this)),this._frame.src=i(e.gatewayConfiguration.assetsUrl,this._componentId,e.isDebug),document.body.appendChild(this._frame)}.bind(this))},r.prototype.createSupportedPaymentMethodsConfiguration=function(e,t){var n;if(!e)throw new E(y.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE);if(!this._enabledPaymentMethods[e])throw new E(y.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED);return n=s({},this._supportedPaymentMethods[e]),n.data=s({},n.data,t),n},r.prototype.tokenize=function(e){return new d(function(t,n){this._bus.emit(h.PAYMENT_REQUEST_INITIALIZED,{supportedPaymentMethods:e.supportedPaymentMethods||this._defaultSupportedPaymentMethods,details:e.details,options:e.options}),this._bus.on(h.PAYMENT_REQUEST_SUCCESSFUL,function(e){o.sendEvent(this._client,this._analyticsName+".tokenize.succeeded"),t({nonce:e.nonce,type:e.type,description:e.description,details:{rawPaymentResponse:e.details.rawPaymentResponse,cardType:e.details.cardType,lastTwo:e.details.lastTwo},binData:e.binData})}.bind(this)),this._bus.on(h.PAYMENT_REQUEST_FAILED,function(e){var t;"AbortError"===e.name?(t=new E({type:y.PAYMENT_REQUEST_CANCELED.type,code:y.PAYMENT_REQUEST_CANCELED.code,message:y.PAYMENT_REQUEST_CANCELED.message,details:{originalError:e}}),o.sendEvent(this._client,this._analyticsName+".tokenize.canceled")):"PAYMENT_REQUEST_INITIALIZATION_FAILED"===e.name?t=new E({type:y.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:y.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:y.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}}):"BRAINTREE_GATEWAY_PAY_WITH_GOOGLE_TOKENIZATION_ERROR"===e.name?t=new E({type:y.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.type,code:y.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.code,message:y.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.message,details:{originalError:e}}):"BRAINTREE_GATEWAY_PAY_WITH_GOOGLE_PARSING_ERROR"===e.name?t=new E({type:y.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.type,code:y.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.code,message:y.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.message,details:{originalError:e}}):(t=new E({code:y.PAYMENT_REQUEST_NOT_COMPLETED.code,type:e.type||E.types.CUSTOMER,message:y.PAYMENT_REQUEST_NOT_COMPLETED.message,details:{originalError:e}}),o.sendEvent(this._client,this._analyticsName+".tokenize.failed")),n(t)}.bind(this))}.bind(this))},r.prototype.teardown=function(){return this._bus.teardown(),this._frame.parentNode.removeChild(this._frame),u(this,l(r.prototype)),o.sendEvent(this._client,this._analyticsName+".teardown-completed"),d.resolve()},t.exports=m.wrapPrototype(r)},{"../../lib/analytics":31,"../../lib/assign":32,"../../lib/braintree-error":34,"../../lib/bus":37,"../../lib/convert-methods-to-error":39,"../../lib/methods":45,"../../lib/promise":47,"../../lib/use-min":48,"../../lib/uuid":49,"../shared/constants":51,"@braintree/iframer":18,"@braintree/wrap-promise":25}],51:[function(e,t,n){"use strict";var i=e("../../lib/braintree-error"),r=e("../../lib/enumerate"),o={};o.events=r(["FRAME_READY","FRAME_CAN_MAKE_REQUESTS","PAYMENT_REQUEST_INITIALIZED","PAYMENT_REQUEST_FAILED","PAYMENT_REQUEST_SUCCESSFUL"],"payment-request:"),o.errors={PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS:{type:i.types.MERCHANT,code:"PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS",message:"There are no supported payment methods associated with this account."},PAYMENT_REQUEST_CANCELED:{type:i.types.CUSTOMER,code:"PAYMENT_REQUEST_CANCELED",message:"Payment request was canceled."},PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED:{type:i.types.MERCHANT,code:"PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED",message:"Something went wrong when configuring the payment request."},PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE:{type:i.types.MERCHANT,code:"PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE",message:"Something went wrong when tokenizing the Pay with Google card."},PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR:{type:i.types.UNKNOWN,code:"PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR",message:"Something went wrong when tokenizing the Pay with Google card."},PAYMENT_REQUEST_NOT_COMPLETED:{code:"PAYMENT_REQUEST_NOT_COMPLETED",message:"Payment request could not be completed."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE:{type:i.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE",
message:"createSupportedPaymentMethodsConfiguration must include a type parameter."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED:{type:i.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED",message:"createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled."}},t.exports=o},{"../../lib/braintree-error":34,"../../lib/enumerate":41}]},{},[29])(29)});