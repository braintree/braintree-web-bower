!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).applePay=e()}(function(){return function n(o,i,a){function s(t,e){if(!i[t]){if(!o[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=i[t]={exports:{}},o[t][0].call(r.exports,function(e){return s(o[t][1][e]||e)},r,r.exports,n,o,i,a)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},n=(Object.defineProperty(r,"__esModule",{value:!0}),r.PromiseGlobal=void 0,n(e("promise-polyfill"))),e="undefined"!=typeof Promise?Promise:n.default;r.PromiseGlobal=e},{"promise-polyfill":8}],2:[function(e,t,r){"use strict";var a=e("./lib/promise"),s={};function n(r){var e,n,t,o,i=JSON.stringify(r);return!r.forceScriptReload&&(e=s[i])||(n=document.createElement("script"),t=r.dataAttributes||{},o=r.container||document.head,n.src=r.src,n.id=r.id||"",n.async=!0,r.crossorigin&&n.setAttribute("crossorigin",""+r.crossorigin),Object.keys(t).forEach(function(e){n.setAttribute("data-"+e,""+t[e])}),e=new a.PromiseGlobal(function(e,t){n.addEventListener("load",function(){e(n)}),n.addEventListener("error",function(){t(new Error(r.src+" failed to load."))}),n.addEventListener("abort",function(){t(new Error(r.src+" has aborted."))}),o.appendChild(n)}),s[i]=e),e}n.clearCache=function(){s={}},t.exports=n},{"./lib/promise":1}],3:[function(e,t,r){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.deferred=function(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{r.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.once=function(r){var n=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];n||(n=!0,r.apply(void 0,e))}}},{}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],7:[function(e,t,r){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),a=e("./lib/promise-or-callback");function s(n){return function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),a.promiseOrCallback(n.apply(this,t),e)}}s.wrapPrototype=function(n,e){var o=(e=void 0===e?{}:e).ignoreMethods||[],i=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(n.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof n.prototype[e],r=-1===o.indexOf(e),e=i||"_"!==e.charAt(0);return t&&e&&r}).forEach(function(e){var t=n.prototype[e];n.prototype[e]=s(t)}),n},t.exports=s},{"./lib/deferred":4,"./lib/once":5,"./lib/promise-or-callback":6}],8:[function(e,t,r){"use strict";var n=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function a(r,n){for(;3===r._state;)r=r._value;0===r._state?r._deferreds.push(n):(r._handled=!0,i._immediateFn(function(){var e,t=1===r._state?n.onFulfilled:n.onRejected;if(null===t)(1===r._state?s:u)(n.promise,r._value);else{try{e=t(r._value)}catch(e){return void u(n.promise,e)}s(n.promise,e)}}))}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof r)return void f((n=r,o=e,function(){n.apply(o,arguments)}),t)}t._state=1,t._value=e,l(t)}catch(e){u(t,e)}var n,o}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)a(e,e._deferreds[t]);e._deferreds=null}function p(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function f(e,t){var r=!1;try{e(function(e){r||(r=!0,s(t,e))},function(e){r||(r=!0,u(t,e))})}catch(e){r||(r=!0,u(t,e))}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(o);return a(this,new p(e,t,r)),r},i.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){return r.reject(e)})})},i.all=function(t){return new i(function(o,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(t);if(0===a.length)return o([]);var s=a.length;for(var e=0;e<a.length;e++)!function t(r,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){t(r,e)},i)}a[r]=e,0==--s&&o(a)}catch(e){i(e)}}(e,a[e])})},i.allSettled=function(r){return new this(function(o,e){if(!r||void 0===r.length)return e(new TypeError(typeof r+" "+r+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(r);if(0===i.length)return o([]);var a=i.length;for(var t=0;t<i.length;t++)!function t(r,e){if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){t(r,e)},function(e){i[r]={status:"rejected",reason:e},0==--a&&o(i)})}i[r]={status:"fulfilled",value:e},0==--a&&o(i)}(t,i[t])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(r){return new i(function(e,t){t(r)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var r=0,n=o.length;r<n;r++)i.resolve(o[r]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){n(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],9:[function(e,t,r){"use strict";var n=e("../lib/braintree-error"),o=e("../lib/analytics"),i=e("./errors"),a=e("../lib/methods"),s=e("../lib/convert-methods-to-error"),e=e("@braintree/wrap-promise");function c(e){this._instantiatedWithClient=Boolean(!e.useDeferredClient),this._client=e.client,this._createPromise=e.createPromise,this._client&&this._setMerchantIdentifier()}c.prototype._waitForClient=function(){return this._client?Promise.resolve():this._createPromise.then(function(e){this._client=e,this._setMerchantIdentifier()}.bind(this))},c.prototype._setMerchantIdentifier=function(){var e=this._client.getConfiguration().gatewayConfiguration.applePayWeb;e&&Object.defineProperty(this,"merchantIdentifier",{value:e.merchantIdentifier,configurable:!1,writable:!1})},c.prototype.createPaymentRequest=function(e){return this._instantiatedWithClient?this._createPaymentRequestSynchronously(e):this._waitForClient().then(function(){return this._createPaymentRequestSynchronously(e)}.bind(this))},c.prototype._createPaymentRequestSynchronously=function(e){var t=this._client.getConfiguration().gatewayConfiguration.applePayWeb,t={countryCode:t.countryCode,currencyCode:t.currencyCode,merchantCapabilities:t.merchantCapabilities||["supports3DS"],supportedNetworks:t.supportedNetworks.map(function(e){return"mastercard"===e?"masterCard":e})};return Object.assign({},t,e)},c.prototype.performValidation=function(t){var r=this;return t&&t.validationURL?this._waitForClient().then(function(){var e={validationUrl:t.validationURL,domainName:t.domainName||window.location.hostname,merchantIdentifier:t.merchantIdentifier||r.merchantIdentifier};return null!=t.displayName&&(e.displayName=t.displayName),r._client.request({method:"post",endpoint:"apple_pay_web/sessions",data:{_meta:{source:"apple-pay"},applePayWebSession:e}})}).then(function(e){return o.sendEvent(r._client,"applepay.performValidation.succeeded"),Promise.resolve(e)}).catch(function(e){return o.sendEvent(r._client,"applepay.performValidation.failed"),"CLIENT_REQUEST_ERROR"===e.code?Promise.reject(new n({type:i.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,code:i.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,message:i.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,details:{originalError:e.details.originalError}})):Promise.reject(new n({type:i.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,code:i.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,message:i.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,details:{originalError:e}}))}):Promise.reject(new n(i.APPLE_PAY_VALIDATION_URL_REQUIRED))},c.prototype.tokenize=function(e){var t=this;return e.token?this._waitForClient().then(function(){return t._client.request({method:"post",endpoint:"payment_methods/apple_payment_tokens",data:{_meta:{source:"apple-pay"},applePaymentToken:Object.assign({},e.token,{paymentData:btoa(JSON.stringify(e.token.paymentData))})}})}).then(function(e){return o.sendEvent(t._client,"applepay.tokenize.succeeded"),Promise.resolve(e.applePayCards[0])}).catch(function(e){return o.sendEvent(t._client,"applepay.tokenize.failed"),Promise.reject(new n({type:i.APPLE_PAY_TOKENIZATION.type,code:i.APPLE_PAY_TOKENIZATION.code,message:i.APPLE_PAY_TOKENIZATION.message,details:{originalError:e}}))}):Promise.reject(new n(i.APPLE_PAY_PAYMENT_TOKEN_REQUIRED))},c.prototype.teardown=function(){return s(this,a(c.prototype)),Promise.resolve()},t.exports=e.wrapPrototype(c)},{"../lib/analytics":13,"../lib/braintree-error":16,"../lib/convert-methods-to-error":18,"../lib/methods":25,"./errors":10,"@braintree/wrap-promise":7}],10:[function(e,t,r){"use strict";e=e("../lib/braintree-error");t.exports={APPLE_PAY_NOT_ENABLED:{type:e.types.MERCHANT,code:"APPLE_PAY_NOT_ENABLED",message:"Apple Pay is not enabled for this merchant."},APPLE_PAY_VALIDATION_URL_REQUIRED:{type:e.types.MERCHANT,code:"APPLE_PAY_VALIDATION_URL_REQUIRED",message:"performValidation must be called with a validationURL."},APPLE_PAY_MERCHANT_VALIDATION_NETWORK:{type:e.types.NETWORK,code:"APPLE_PAY_MERCHANT_VALIDATION_NETWORK",message:"A network error occurred when validating the Apple Pay merchant."},APPLE_PAY_MERCHANT_VALIDATION_FAILED:{type:e.types.MERCHANT,code:"APPLE_PAY_MERCHANT_VALIDATION_FAILED",message:"Make sure you have registered your domain name in the Braintree Control Panel."},APPLE_PAY_PAYMENT_TOKEN_REQUIRED:{type:e.types.MERCHANT,code:"APPLE_PAY_PAYMENT_TOKEN_REQUIRED",message:"tokenize must be called with a payment token."},APPLE_PAY_TOKENIZATION:{type:e.types.NETWORK,code:"APPLE_PAY_TOKENIZATION",message:"A network error occurred when processing the Apple Pay payment."}}},{"../lib/braintree-error":16}],11:[function(e,t,r){"use strict";var o=e("./apple-pay"),i=e("../lib/analytics"),a=e("../lib/braintree-error"),s=e("../lib/basic-component-verification"),c=e("../lib/create-assets-url"),u=e("../lib/create-deferred-client"),l=e("./errors"),e=e("@braintree/wrap-promise");t.exports={create:e(function(r){var n="Apple Pay";return s.verify({name:n,client:r.client,authorization:r.authorization}).then(function(){var t,e=u.create({authorization:r.authorization,client:r.client,debug:r.debug,assetsUrl:c.create(r.authorization),name:n}).then(function(e){return e.getConfiguration().gatewayConfiguration.applePayWeb?(i.sendEvent(e,"applepay.initialized"),e):Promise.reject(new a(l.APPLE_PAY_NOT_ENABLED))});return r.createPromise=e,t=new o(r),r.useDeferredClient?t:e.then(function(e){return t._client=e,t})})}),VERSION:"3.95.0"}},{"../lib/analytics":13,"../lib/basic-component-verification":15,"../lib/braintree-error":16,"../lib/create-assets-url":19,"../lib/create-deferred-client":21,"./apple-pay":9,"./errors":10,"@braintree/wrap-promise":7}],12:[function(e,t,r){"use strict";var i=e("./create-authorization-data"),a=e("./json-clone"),s=e("./constants");t.exports=function(e,t){var r,n=t?a(t):{},t=i(e.authorization).attrs,o=a(e.analyticsMetadata);for(r in n.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION,n._meta)n._meta.hasOwnProperty(r)&&(o[r]=n._meta[r]);return n._meta=o,t.tokenizationKey?n.tokenizationKey=t.tokenizationKey:n.authorizationFingerprint=t.authorizationFingerprint,n}},{"./constants":17,"./create-authorization-data":20,"./json-clone":24}],13:[function(e,t,r){"use strict";var s=e("./constants"),c=e("./add-metadata");t.exports={sendEvent:function(e,o,i){var a=Date.now();return Promise.resolve(e).then(function(e){var t=Date.now(),r=e.getConfiguration(),e=e._request,n=r.gatewayConfiguration.analytics.url,t={analytics:[{kind:s.ANALYTICS_PREFIX+o,isAsync:Math.floor(t/1e3)!==Math.floor(a/1e3),timestamp:a}]};e({url:n,method:"post",data:c(r,t),timeout:s.ANALYTICS_REQUEST_TIMEOUT_MS},i)}).catch(function(e){i&&i(e)})}}},{"./add-metadata":12,"./constants":17}],14:[function(e,t,r){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],15:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./errors");t.exports={verify:function(e){var t,r;return e?(r=e.name,t=e.client,e=e.authorization,t||e?e||"3.95.0"===t.getVersion()?Promise.resolve():Promise.reject(new n({type:o.INCOMPATIBLE_VERSIONS.type,code:o.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.95.0) components must be from the same SDK version."})):Promise.reject(new n({type:o.INSTANTIATION_OPTION_REQUIRED.type,code:o.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."}))):Promise.reject(new n({type:o.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:o.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":16,"./errors":23}],16:[function(e,t,r){"use strict";e=e("./enumerate");function n(e){if(!n.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((n.prototype=Object.create(Error.prototype)).constructor=n).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),n.findRootError=function(e){return e instanceof n&&e.details&&e.details.originalError?n.findRootError(e.details.originalError):e},t.exports=n},{"./enumerate":22}],17:[function(e,t,r){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.95.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.95.0"}},{}],18:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new n({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":16,"./errors":23}],19:[function(e,t,r){"use strict";var n=e("./constants").ASSETS_URLS;t.exports={create:function(e){return n.production}}},{"./constants":17}],20:[function(e,t,r){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,r,n={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(r=(t=(t=e).split("_"))[0],t={merchantId:t.slice(2).join("_"),environment:r},n.environment=t.environment,n.attrs.tokenizationKey=e,n.configUrl=i[t.environment]+"/merchants/"+t.merchantId+"/client_api/v1/configuration"):(r=JSON.parse(o(e)),n.environment=r.environment,n.attrs.authorizationFingerprint=r.authorizationFingerprint,n.configUrl=r.configUrl,n.graphQL=r.graphQL),n}},{"../lib/constants":17,"../lib/vendor/polyfill":26}],21:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./assets"),i=e("./errors"),a="3.95.0";t.exports={create:function(e){var t=Promise.resolve();return e.client?Promise.resolve(e.client):(t=window.braintree&&window.braintree.client?t:o.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return Promise.reject(new n({type:i.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:i.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:i.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})).then(function(){return window.braintree.client.VERSION!==a?Promise.reject(new n({type:i.INCOMPATIBLE_VERSIONS.type,code:i.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})})}}},{"./assets":14,"./braintree-error":16,"./errors":23}],22:[function(e,t,r){"use strict";t.exports=function(e,r){return r=null==r?"":r,e.reduce(function(e,t){return e[t]=r+t,e},{})}},{}],23:[function(e,t,r){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":16}],24:[function(e,t,r){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],25:[function(e,t,r){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],26:[function(e,t,r){"use strict";var n="function"==typeof atob?atob:o;function o(e){var t,r,n,o,i,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(i=0;r=a.indexOf(e.charAt(i++)),t=(15&(n=a.indexOf(e.charAt(i++))))<<4|(o=a.indexOf(e.charAt(i++)))>>2&15,o=(3&o)<<6|63&a.indexOf(e.charAt(i++)),s+=String.fromCharCode((63&r)<<2|n>>4&3)+(t?String.fromCharCode(t):"")+(o?String.fromCharCode(o):""),i<e.length;);return s}t.exports={atob:function(e){return n.call(window,e)},_atob:o}},{}]},{},[11])(11)});