!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).venmo=e()}(function(){return function i(s,a,c){function u(t,e){if(!a[t]){if(!s[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(d)return d(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[t]={exports:{}};s[t][0].call(o.exports,function(e){return u(s[t][1][e]||e)},o,o.exports,i,s,a,c)}return a[t].exports}for(var d="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.PromiseGlobal=void 0;var o=n(e("promise-polyfill")),i="undefined"!=typeof Promise?Promise:o.default;r.PromiseGlobal=i},{"promise-polyfill":24}],2:[function(e,t,r){"use strict";var s=e("./lib/promise"),a={};function n(r){var e,t=JSON.stringify(r);if(!r.forceScriptReload&&(e=a[t]))return e;var n=document.createElement("script"),o=r.dataAttributes||{},i=r.container||document.head;return n.src=r.src,n.id=r.id||"",n.async=!0,r.crossorigin&&n.setAttribute("crossorigin",""+r.crossorigin),Object.keys(o).forEach(function(e){n.setAttribute("data-"+e,""+o[e])}),e=new s.PromiseGlobal(function(e,t){n.addEventListener("load",function(){e(n)}),n.addEventListener("error",function(){t(new Error(r.src+" failed to load."))}),n.addEventListener("abort",function(){t(new Error(r.src+" has aborted."))}),i.appendChild(n)}),a[t]=e}n.clearCache=function(){a={}},t.exports=n},{"./lib/promise":1}],3:[function(e,t,r){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,r){"use strict";t.exports=function(e){return e=e||window.navigator.userAgent,/Android/.test(e)}},{}],5:[function(e,t,r){"use strict";var n=e("./is-edge"),o=e("./is-samsung");t.exports=function(e){return!(-1===(e=e||window.navigator.userAgent).indexOf("Chrome")&&-1===e.indexOf("CriOS")||n(e)||o(e))}},{"./is-edge":6,"./is-samsung":12}],6:[function(e,t,r){"use strict";t.exports=function(e){return-1!==(e=e||window.navigator.userAgent).indexOf("Edge/")}},{}],7:[function(e,t,r){"use strict";t.exports=function(e){return e=e||window.navigator.userAgent,/Firefox/i.test(e)}},{}],8:[function(e,t,r){"use strict";t.exports=function(e){return e=e||window.navigator.userAgent,/FxiOS/i.test(e)}},{}],9:[function(e,t,r){"use strict";var n=e("./is-ios"),o=/webkit/i;t.exports=function(e){return e=e||window.navigator.userAgent,n(e)&&(t=e,o.test(t))&&-1===e.indexOf("CriOS");var t}},{"./is-ios":10}],10:[function(e,t,r){"use strict";t.exports=function(e){return e=e||window.navigator.userAgent,/iPhone|iPod|iPad/i.test(e)}},{}],11:[function(e,t,r){"use strict";var n=e("./is-ios-firefox"),o=e("./is-firefox");t.exports=function(e){return e=e||window.navigator.userAgent,n(e)||/iPhone|iPod|iPad|Mobile|Tablet/i.test(e)&&o(e)}},{"./is-firefox":7,"./is-ios-firefox":8}],12:[function(e,t,r){"use strict";t.exports=function(e){return e=e||window.navigator.userAgent,/SamsungBrowser/i.test(e)}},{}],13:[function(e,t,r){t.exports=e("./dist/is-android")},{"./dist/is-android":4}],14:[function(e,t,r){t.exports=e("./dist/is-chrome")},{"./dist/is-chrome":5}],15:[function(e,t,r){t.exports=e("./dist/is-ios-safari")},{"./dist/is-ios-safari":9}],16:[function(e,t,r){t.exports=e("./dist/is-ios")},{"./dist/is-ios":10}],17:[function(e,t,r){t.exports=e("./dist/is-mobile-firefox")},{"./dist/is-mobile-firefox":11}],18:[function(e,t,r){t.exports=e("./dist/is-samsung")},{"./dist/is-samsung":12}],19:[function(e,t,r){"use strict";var n="undefined"!=typeof Promise?Promise:null,o=(i.defaultOnResolve=function(e){return i.Promise.resolve(e)},i.defaultOnReject=function(e){return i.Promise.reject(e)},i.setPromise=function(e){i.Promise=e},i.shouldCatchExceptions=function(e){return e.hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(e.suppressUnhandledPromiseMessage):Boolean(i.suppressUnhandledPromiseMessage)},i.all=function(e){return i.Promise.all(e)},i.allSettled=function(e){return i.Promise.allSettled(e)},i.race=function(e){return i.Promise.race(e)},i.reject=function(e){return i.Promise.reject(e)},i.resolve=function(e){return i.Promise.resolve(e)},i.prototype.then=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=this._promise).then.apply(e,t)},i.prototype.catch=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=this._promise).catch.apply(e,t)},i.prototype.resolve=function(e){var t=this;return this.isFulfilled||(this._setResolved(),i.Promise.resolve().then(function(){return t._onResolve(e)}).then(function(e){t._resolveFunction(e)}).catch(function(e){t._resetState(),t.reject(e)})),this},i.prototype.reject=function(e){var t=this;return this.isFulfilled||(this._setRejected(),i.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(function(e){return t._rejectFunction(e)})),this},i.prototype._resetState=function(){this.isFulfilled=!1,this.isResolved=!1,this.isRejected=!1},i.prototype._setResolved=function(){this.isFulfilled=!0,this.isResolved=!0,this.isRejected=!1},i.prototype._setRejected=function(){this.isFulfilled=!0,this.isResolved=!1,this.isRejected=!0},i.Promise=n,i);function i(e){var r=this;"function"!=typeof e?(this._promise=new i.Promise(function(e,t){r._resolveFunction=e,r._rejectFunction=t}),e=e||{},this._onResolve=e.onResolve||i.defaultOnResolve,this._onReject=e.onReject||i.defaultOnReject,i.shouldCatchExceptions(e)&&this._promise.catch(function(){}),this._resetState()):this._promise=new i.Promise(e)}t.exports=o},{}],20:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.deferred=function(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{r.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],21:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.once=function(r){var n=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];n||(n=!0,r.apply(void 0,e))}}},{}],22:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],23:[function(e,t,r){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),s=e("./lib/promise-or-callback");function n(n){return function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),s.promiseOrCallback(n.apply(this,t),e)}}n.wrapPrototype=function(o,e){void 0===e&&(e={});var i=e.ignoreMethods||[],s=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(o.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof o.prototype[e],r=-1===i.indexOf(e),n=s||"_"!==e.charAt(0);return t&&n&&r}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=n(t)}),o},t.exports=n},{"./lib/deferred":20,"./lib/once":21,"./lib/promise-or-callback":22}],24:[function(e,t,r){"use strict";var n=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function s(r,n){for(;3===r._state;)r=r._value;0!==r._state?(r._handled=!0,i._immediateFn(function(){var e,t=1===r._state?n.onFulfilled:n.onRejected;if(null!==t){try{e=t(r._value)}catch(e){return void u(n.promise,e)}a(n.promise,e)}else(1===r._state?a:u)(n.promise,r._value)})):r._deferreds.push(n)}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof i)return t._state=3,t._value=e,void d(t);if("function"==typeof r)return void f((n=r,o=e,function(){n.apply(o,arguments)}),t)}t._state=1,t._value=e,d(t)}catch(e){u(t,e)}var n,o}function u(e,t){e._state=2,e._value=t,d(e)}function d(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)s(e,e._deferreds[t]);e._deferreds=null}function l(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function f(e,t){var r=!1;try{e(function(e){r||(r=!0,a(t,e))},function(e){r||(r=!0,u(t,e))})}catch(e){if(r)return;r=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(o);return s(this,new l(e,t,r)),r},i.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){return r.reject(e)})})},i.all=function(t){return new i(function(o,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var s=Array.prototype.slice.call(t);if(0===s.length)return o([]);var a=s.length;for(var e=0;e<s.length;e++)!function t(r,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){t(r,e)},i)}s[r]=e,0==--a&&o(s)}catch(e){i(e)}}(e,s[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(r){return new i(function(e,t){t(r)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var r=0,n=o.length;r<n;r++)i.resolve(o[r]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){n(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],25:[function(e,t,r){"use strict";var s=e("./create-authorization-data"),a=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var r,n=t?a(t):{},o=s(e.authorization).attrs,i=a(e.analyticsMetadata);for(r in n.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,n._meta)n._meta.hasOwnProperty(r)&&(i[r]=n._meta[r]);return n._meta=i,o.tokenizationKey?n.tokenizationKey=o.tokenizationKey:n.authorizationFingerprint=o.authorizationFingerprint,n}},{"./constants":30,"./create-authorization-data":33,"./json-clone":37}],26:[function(e,t,r){"use strict";var n=e("./promise"),u=e("./constants"),d=e("./add-metadata");t.exports={sendEvent:function(e,s,a){var c=Date.now();return n.resolve(e).then(function(e){var t=Date.now(),r=e.getConfiguration(),n=e._request,o=r.gatewayConfiguration.analytics.url,i={analytics:[{kind:u.ANALYTICS_PREFIX+s,isAsync:Math.floor(t/1e3)!==Math.floor(c/1e3),timestamp:c}]};n({url:o,method:"post",data:d(r,i),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},a)})}}},{"./add-metadata":25,"./constants":30,"./promise":39}],27:[function(e,t,r){"use strict";var n=e("@braintree/asset-loader/load-script");t.exports={loadScript:n}},{"@braintree/asset-loader/load-script":3}],28:[function(e,t,r){"use strict";var o=e("./braintree-error"),i=e("./promise"),s=e("./errors");t.exports={verify:function(e){var t,r,n;return e?(n=e.name,t=e.client,r=e.authorization,t||r?r||"3.64.0"===t.getVersion()?i.resolve():i.reject(new o({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+n+" (version 3.64.0) components must be from the same SDK version."})):i.reject(new o({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+n+"."}))):i.reject(new o({type:s.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:s.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":29,"./errors":36,"./promise":39}],29:[function(e,t,r){"use strict";var n=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}o.prototype=Object.create(Error.prototype),(o.prototype.constructor=o).types=n(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":35}],30:[function(e,t,r){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.64.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.64.0"}},{}],31:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new n({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":29,"./errors":36}],32:[function(e,t,r){"use strict";var n=e("./constants").ASSETS_URLS;t.exports={create:function(e){return n.production}}},{"./constants":30}],33:[function(e,t,r){"use strict";var s=e("../lib/vendor/polyfill").atob,a=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,r,n,o,i={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(n=e.split("_"),o=n[0],r={merchantId:n.slice(2).join("_"),environment:o},i.environment=r.environment,i.attrs.tokenizationKey=e,i.configUrl=a[r.environment]+"/merchants/"+r.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(s(e)),i.environment=t.environment,i.attrs.authorizationFingerprint=t.authorizationFingerprint,i.configUrl=t.configUrl,i.graphQL=t.graphQL),i}},{"../lib/constants":30,"../lib/vendor/polyfill":41}],34:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./promise"),i=e("./assets"),s=e("./errors"),a="3.64.0";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(window.braintree&&window.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return o.reject(new n({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return window.braintree.client.VERSION!==a?o.reject(new n({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}},{"./assets":27,"./braintree-error":29,"./errors":36,"./promise":39}],35:[function(e,t,r){"use strict";t.exports=function(e,r){return r=null==r?"":r,e.reduce(function(e,t){return e[t]=r+t,e},{})}},{}],36:[function(e,t,r){"use strict";var n=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:n.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:n.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:n.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:n.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:n.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":29}],37:[function(e,t,r){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],38:[function(e,t,r){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],39:[function(e,t,r){"use strict";var n=e("promise-polyfill"),o=e("@braintree/extended-promise"),i="undefined"!=typeof Promise?Promise:n;o.suppressUnhandledPromiseMessage=!0,o.setPromise(i),t.exports=i},{"@braintree/extended-promise":19,"promise-polyfill":24}],40:[function(e,t,r){"use strict";function a(e,t){var r,n,o,i,s=[];for(o in e)e.hasOwnProperty(o)&&(n=e[o],r=t?(i=e)&&"object"==typeof i&&"number"==typeof i.length&&"[object Array]"===Object.prototype.toString.call(i)?t+"[]":t+"["+o+"]":o,"object"==typeof n?s.push(a(n,r)):s.push(encodeURIComponent(r)+"="+encodeURIComponent(n)));return s.join("&")}t.exports={parse:function(e){return e=e||window.location.href,/\?/.test(e)?e.replace(/#.*$/,"").replace(/^.*\?/,"").split("&").reduce(function(e,t){var r=t.split("="),n=decodeURIComponent(r[0]),o=decodeURIComponent(r[1]);return e[n]=o,e},{}):{}},stringify:a,queryify:function(e,t){return e=e||"",null!=t&&"object"==typeof t&&function(e){var t;for(t in e)if(e.hasOwnProperty(t))return 1}(t)&&(e+=-1===e.indexOf("?")?"?":"",e+=-1!==e.indexOf("=")?"&":"",e+=a(t)),e}}},{}],41:[function(e,t,r){"use strict";var n="function"==typeof atob?window.atob:o;function o(e){var t,r,n,o,i,s,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(s=0;t=(63&a.indexOf(e.charAt(s++)))<<2|(o=a.indexOf(e.charAt(s++)))>>4&3,r=(15&o)<<4|(i=a.indexOf(e.charAt(s++)))>>2&15,n=(3&i)<<6|63&a.indexOf(e.charAt(s++)),c+=String.fromCharCode(t)+(r?String.fromCharCode(r):"")+(n?String.fromCharCode(n):""),s<e.length;);return c}t.exports={atob:function(e){return n.call(window,e)},_atob:o}},{}],42:[function(e,t,r){"use strict";var n=e("../lib/analytics"),o=e("../lib/basic-component-verification"),i=e("../lib/create-deferred-client"),s=e("../lib/create-assets-url"),a=e("./shared/errors"),c=e("@braintree/wrap-promise"),u=e("../lib/braintree-error"),d=e("./venmo"),l=e("../lib/promise"),f=e("./shared/supports-venmo");t.exports={create:c(function(r){return o.verify({name:"Venmo",client:r.client,authorization:r.authorization}).then(function(){var e,t;return r.profileId&&"string"!=typeof r.profileId?l.reject(new u(a.VENMO_INVALID_PROFILE_ID)):r.deepLinkReturnUrl&&"string"!=typeof r.deepLinkReturnUrl?l.reject(new u(a.VENMO_INVALID_DEEP_LINK_RETURN_URL)):(e=i.create({authorization:r.authorization,client:r.client,debug:r.debug,assetsUrl:s.create(r.authorization),name:"Venmo"}).then(function(e){var t=e.getConfiguration();return r.client=e,t.gatewayConfiguration.payWithVenmo?e:l.reject(new u(a.VENMO_NOT_ENABLED))}),r.createPromise=e,t=new d(r),n.sendEvent(e,"venmo.initialized"),r.client?e.then(function(){return t}):t)})}),isBrowserSupported:function(e){return f.isBrowserSupported(e)},VERSION:"3.64.0"}},{"../lib/analytics":26,"../lib/basic-component-verification":28,"../lib/braintree-error":29,"../lib/create-assets-url":32,"../lib/create-deferred-client":34,"../lib/promise":39,"./shared/errors":45,"./shared/supports-venmo":46,"./venmo":47,"@braintree/wrap-promise":23}],43:[function(e,t,r){"use strict";var n=e("@braintree/browser-detection/is-android"),o=e("@braintree/browser-detection/is-chrome"),i=e("@braintree/browser-detection/is-ios"),s=e("@braintree/browser-detection/is-ios-safari"),a=e("@braintree/browser-detection/is-samsung"),c=e("@braintree/browser-detection/is-mobile-firefox");t.exports={isAndroid:n,isChrome:o,isIos:i,isIosSafari:s,isSamsungBrowser:a,isMobileFirefox:c}},{"@braintree/browser-detection/is-android":13,"@braintree/browser-detection/is-chrome":14,"@braintree/browser-detection/is-ios":16,"@braintree/browser-detection/is-ios-safari":15,"@braintree/browser-detection/is-mobile-firefox":17,"@braintree/browser-detection/is-samsung":18}],44:[function(e,t,r){"use strict";t.exports={DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY:500,DEFAULT_PROCESS_RESULTS_DELAY:1e3,VENMO_OPEN_URL:"https://venmo.com/braintree/checkout"}},{}],45:[function(e,t,r){"use strict";var n=e("../../lib/braintree-error");t.exports={VENMO_NOT_ENABLED:{type:n.types.MERCHANT,code:"VENMO_NOT_ENABLED",message:"Venmo is not enabled for this merchant."},VENMO_TOKENIZATION_REQUEST_ACTIVE:{type:n.types.MERCHANT,code:"VENMO_TOKENIZATION_REQUEST_ACTIVE",message:"Another tokenization request is active."},VENMO_APP_FAILED:{type:n.types.UNKNOWN,code:"VENMO_APP_FAILED",message:"Venmo app encountered a problem."},VENMO_APP_CANCELED:{type:n.types.CUSTOMER,code:"VENMO_APP_CANCELED",message:"Venmo app authorization was canceled."},VENMO_CANCELED:{type:n.types.CUSTOMER,code:"VENMO_CANCELED",message:"User canceled Venmo authorization, or Venmo app is not available."},VENMO_INVALID_PROFILE_ID:{type:n.types.MERCHANT,code:"VENMO_INVALID_PROFILE_ID",message:"Venmo profile ID is invalid."},VENMO_INVALID_DEEP_LINK_RETURN_URL:{type:n.types.MERCHANT,code:"VENMO_INVALID_DEEP_LINK_RETURN_URL",message:"Venmo deep link return URL is invalid."}}},{"../../lib/braintree-error":29}],46:[function(e,t,r){"use strict";var i=e("./browser-detection");t.exports={isBrowserSupported:function(e){var t=i.isAndroid()&&i.isChrome(),r=i.isIos()&&i.isChrome(),n=i.isIosSafari()||t,o=r||i.isSamsungBrowser()||i.isMobileFirefox();return e=e||{allowNewBrowserTab:!0},n||e.allowNewBrowserTab&&o}}},{"./browser-detection":43}],47:[function(_,m,e){(function(s){"use strict";var a=_("../lib/analytics"),e=_("./shared/supports-venmo"),c=_("./shared/constants"),u=_("./shared/errors"),d=_("../lib/querystring"),t=_("../lib/methods"),r=_("../lib/convert-methods-to-error"),n=_("@braintree/wrap-promise"),l=_("../lib/braintree-error"),f=_("../lib/promise"),p=_("@braintree/extended-promise");function o(e){this._createPromise=e.createPromise,this._allowNewBrowserTab=!1!==e.allowNewBrowserTab,this._profileId=e.profileId,this._deepLinkReturnUrl=e.deepLinkReturnUrl,this._ignoreHistoryChanges=e.ignoreHistoryChanges}function i(e){return(e||window.location.hash.substring(1)).split("&").reduce(function(e,t){var r=t.split("="),n=decodeURIComponent(r[0]).replace(/\W/g,""),o=decodeURIComponent(r[1]);return e[n]=o,e},{})}function h(){var e;return void 0!==window.document.hidden?e="visibilitychange":void 0!==window.document.msHidden?e="msvisibilitychange":void 0!==window.document.webkitHidden&&(e="webkitvisibilitychange"),e}o.prototype.getUrl=function(){return this._url?f.resolve(this._url):this._createPromise.then(function(e){var t=e.getConfiguration(),r={},n=this._deepLinkReturnUrl||window.location.href.replace(window.location.hash,""),o=t.gatewayConfiguration.payWithVenmo,i=t.analyticsMetadata,s={_meta:{version:i.sdkVersion,integration:i.integration,platform:i.platform,sessionId:i.sessionId}};return r["x-success"]=n+"#venmoSuccess=1",r["x-cancel"]=n+"#venmoCancel=1",r["x-error"]=n+"#venmoError=1",r.ua=window.navigator.userAgent,r.braintree_merchant_id=this._profileId||o.merchantId,r.braintree_access_token=o.accessToken,r.braintree_environment=o.environment,r.braintree_sdk_data=btoa(JSON.stringify(s)),this._url=c.VENMO_OPEN_URL+"?"+d.stringify(r),this._url}.bind(this))},o.prototype.isBrowserSupported=function(){return e.isBrowserSupported({allowNewBrowserTab:this._allowNewBrowserTab})},o.prototype.hasTokenizationResult=function(){return this._hasTokenizationResult()},o.prototype._hasTokenizationResult=function(e){var t=i(e);return void 0!==(t.venmoSuccess||t.venmoError||t.venmoCancel)},o.prototype.tokenize=function(t){var r,n,o=this;if(t=t||{},!0===this._tokenizationInProgress)return f.reject(new l(u.VENMO_TOKENIZATION_REQUEST_ACTIVE));if(this.hasTokenizationResult())return this._processResults();function i(e){var t;o._processResults(e).catch(function(e){t=e}).then(function(e){o._ignoreHistoryChanges||window.location.hash===o._previousHash||(window.location.hash=o._previousHash),o._removeVisibilityEventListener(),t?o._tokenizePromise.reject(t):o._tokenizePromise.resolve(e),delete o._tokenizePromise})}return this._tokenizationInProgress=!0,this._tokenizePromise=new p,this._previousHash=window.location.hash,this._onHashChangeListener=function(e){var t=e.newURL.split("#")[1];o._hasTokenizationResult(t)&&(r=!0,clearTimeout(n),o._tokenizationInProgress=!1,i(t))},window.addEventListener("hashchange",this._onHashChangeListener,!1),this._visibilityChangeListener=function(){var e=t.processResultsDelay||c.DEFAULT_PROCESS_RESULTS_DELAY;window.document.hidden||(o._tokenizationInProgress=!1,r||(n=setTimeout(i,e)))},this.getUrl().then(function(e){return o._deepLinkReturnUrl?window.navigator.platform&&/iPhone|iPad|iPod/.test(window.navigator.platform)?(a.sendEvent(o._createPromise,"venmo.appswitch.start.ios-webview"),window.location.href=e):s.popupBridge&&"function"==typeof s.popupBridge.open?(a.sendEvent(o._createPromise,"venmo.appswitch.start.popup-bridge"),window.popupBridge.open(e)):(a.sendEvent(o._createPromise,"venmo.appswitch.start.webview"),window.open(e)):(a.sendEvent(o._createPromise,"venmo.appswitch.start.browser"),window.open(e)),setTimeout(function(){window.document.addEventListener(h(),o._visibilityChangeListener)},c.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY),o._tokenizePromise})},o.prototype.teardown=function(){return this._removeVisibilityEventListener(),r(this,t(o.prototype)),f.resolve()},o.prototype._removeVisibilityEventListener=function(){window.removeEventListener("hashchange",this._onHashChangeListener),window.document.removeEventListener(h(),this._visibilityChangeListener),delete this._visibilityChangeListener,delete this._onHashChangeListener},o.prototype._processResults=function(e){var n=this,o=i(e);return new f(function(e,t){var r;o.venmoSuccess?(a.sendEvent(n._createPromise,"venmo.appswitch.handle.success"),e({nonce:(r=o).paymentMethodNonce,type:"VenmoAccount",details:{username:r.username}})):o.venmoError?(a.sendEvent(n._createPromise,"venmo.appswitch.handle.error"),t(new l({type:u.VENMO_APP_FAILED.type,code:u.VENMO_APP_FAILED.code,message:u.VENMO_APP_FAILED.message,details:{originalError:{message:decodeURIComponent(o.errorMessage),code:o.errorCode}}}))):o.venmoCancel?(a.sendEvent(n._createPromise,"venmo.appswitch.handle.cancel"),t(new l(u.VENMO_APP_CANCELED))):(a.sendEvent(n._createPromise,"venmo.appswitch.cancel-or-unavailable"),t(new l(u.VENMO_CANCELED))),n._clearFragmentParameters()})},o.prototype._clearFragmentParameters=function(){this._ignoreHistoryChanges||"function"==typeof window.history.replaceState&&window.location.hash&&history.pushState({},"",window.location.href.slice(0,window.location.href.indexOf("#")))},m.exports=n.wrapPrototype(o)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/analytics":26,"../lib/braintree-error":29,"../lib/convert-methods-to-error":31,"../lib/methods":38,"../lib/promise":39,"../lib/querystring":40,"./shared/constants":44,"./shared/errors":45,"./shared/supports-venmo":46,"@braintree/extended-promise":19,"@braintree/wrap-promise":23}]},{},[42])(42)});