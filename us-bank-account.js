!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).usBankAccount=e()}(function(){return function r(o,i,a){function s(t,e){if(!i[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},o[t][0].call(n.exports,function(e){return s(o[t][1][e]||e)},n,n.exports,r,o,i,a)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},r=(Object.defineProperty(n,"__esModule",{value:!0}),n.PromiseGlobal=void 0,r(e("promise-polyfill"))),e="undefined"!=typeof Promise?Promise:r.default;n.PromiseGlobal=e},{"promise-polyfill":9}],2:[function(e,t,n){"use strict";var a=e("./lib/promise"),s={};function r(n){var e,r,t,o,i=JSON.stringify(n);return!n.forceScriptReload&&(e=s[i])||(r=document.createElement("script"),t=n.dataAttributes||{},o=n.container||document.head,r.src=n.src,r.id=n.id||"",r.async=!0,n.crossorigin&&r.setAttribute("crossorigin",""+n.crossorigin),Object.keys(t).forEach(function(e){r.setAttribute("data-"+e,""+t[e])}),e=new a.PromiseGlobal(function(e,t){r.addEventListener("load",function(){e(r)}),r.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),r.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),o.appendChild(r)}),s[i]=e),e}r.clearCache=function(){s={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,n){"use strict";var r="undefined"!=typeof Promise?Promise:null,r=(o.defaultOnResolve=function(e){return o.Promise.resolve(e)},o.defaultOnReject=function(e){return o.Promise.reject(e)},o.setPromise=function(e){o.Promise=e},o.shouldCatchExceptions=function(e){return e.hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(e.suppressUnhandledPromiseMessage):Boolean(o.suppressUnhandledPromiseMessage)},o.all=function(e){return o.Promise.all(e)},o.allSettled=function(e){return o.Promise.allSettled(e)},o.race=function(e){return o.Promise.race(e)},o.reject=function(e){return o.Promise.reject(e)},o.resolve=function(e){return o.Promise.resolve(e)},o.prototype.then=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).then.apply(e,t)},o.prototype.catch=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).catch.apply(e,t)},o.prototype.resolve=function(e){var t=this;return this.isFulfilled||(this._setResolved(),o.Promise.resolve().then(function(){return t._onResolve(e)}).then(function(e){t._resolveFunction(e)}).catch(function(e){t._resetState(),t.reject(e)})),this},o.prototype.reject=function(e){var t=this;return this.isFulfilled||(this._setRejected(),o.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(function(e){return t._rejectFunction(e)})),this},o.prototype._resetState=function(){this.isFulfilled=!1,this.isResolved=!1,this.isRejected=!1},o.prototype._setResolved=function(){this.isFulfilled=!0,this.isResolved=!0,this.isRejected=!1},o.prototype._setRejected=function(){this.isFulfilled=!0,this.isResolved=!1,this.isRejected=!0},o.Promise=r,o);function o(e){var n=this;"function"==typeof e?this._promise=new o.Promise(e):(this._promise=new o.Promise(function(e,t){n._resolveFunction=e,n._rejectFunction=t}),this._onResolve=(e=e||{}).onResolve||o.defaultOnResolve,this._onReject=e.onReject||o.defaultOnReject,o.shouldCatchExceptions(e)&&this._promise.catch(function(){}),this._resetState())}t.exports=r},{}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.deferred=function(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{n.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.once=function(n){var r=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r||(r=!0,n.apply(void 0,e))}}},{}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],8:[function(e,t,n){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),a=e("./lib/promise-or-callback");function s(r){return function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),a.promiseOrCallback(r.apply(this,t),e)}}s.wrapPrototype=function(r,e){var o=(e=void 0===e?{}:e).ignoreMethods||[],i=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(r.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof r.prototype[e],n=-1===o.indexOf(e),e=i||"_"!==e.charAt(0);return t&&e&&n}).forEach(function(e){var t=r.prototype[e];r.prototype[e]=s(t)}),r},t.exports=s},{"./lib/deferred":5,"./lib/once":6,"./lib/promise-or-callback":7}],9:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0===n._state?n._deferreds.push(r):(n._handled=!0,i._immediateFn(function(){var e,t=1===n._state?r.onFulfilled:r.onRejected;if(null===t)(1===n._state?s:u)(r.promise,n._value);else{try{e=t(n._value)}catch(e){return void u(r.promise,e)}s(r.promise,e)}}))}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void p((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,l(t)}catch(e){u(t,e)}var r,o}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function p(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){if(n)return;n=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return a(this,new d(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(o,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(t);if(0===a.length)return o([]);var s=a.length;for(var e=0;e<a.length;e++)!function t(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},i)}a[n]=e,0==--s&&o(a)}catch(e){i(e)}}(e,a[e])})},i.allSettled=function(n){return new this(function(o,e){if(!n||void 0===n.length)return e(new TypeError(typeof n+" "+n+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(n);if(0===i.length)return o([]);var a=i.length;for(var t=0;t<i.length;t++)!function t(n,e){if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},function(e){i[n]={status:"rejected",reason:e},0==--a&&o(i)})}i[n]={status:"fulfilled",value:e},0==--a&&o(i)}(t,i[t])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=o.length;n<r;n++)i.resolve(o[n]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],10:[function(e,t,n){"use strict";var i=e("./create-authorization-data"),a=e("./json-clone"),s=e("./constants");t.exports=function(e,t){var n,r=t?a(t):{},t=i(e.authorization).attrs,o=a(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(o[n]=r._meta[n]);return r._meta=o,t.tokenizationKey?r.tokenizationKey=t.tokenizationKey:r.authorizationFingerprint=t.authorizationFingerprint,r}},{"./constants":15,"./create-authorization-data":18,"./json-clone":22}],11:[function(e,t,n){"use strict";var r=e("./promise"),s=e("./constants"),c=e("./add-metadata");t.exports={sendEvent:function(e,o,i){var a=Date.now();return r.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),e=e._request,r=n.gatewayConfiguration.analytics.url,t={analytics:[{kind:s.ANALYTICS_PREFIX+o,isAsync:Math.floor(t/1e3)!==Math.floor(a/1e3),timestamp:a}]};e({url:r,method:"post",data:c(n,t),timeout:s.ANALYTICS_REQUEST_TIMEOUT_MS},i)}).catch(function(e){i&&i(e)})}}},{"./add-metadata":10,"./constants":15,"./promise":25}],12:[function(e,t,n){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],13:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./errors");t.exports={verify:function(e){var t,n;return e?(n=e.name,t=e.client,e=e.authorization,t||e?e||"3.87.0"===t.getVersion()?o.resolve():o.reject(new r({type:i.INCOMPATIBLE_VERSIONS.type,code:i.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+n+" (version 3.87.0) components must be from the same SDK version."})):o.reject(new r({type:i.INSTANTIATION_OPTION_REQUIRED.type,code:i.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+n+"."}))):o.reject(new r({type:i.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:i.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":14,"./errors":21,"./promise":25}],14:[function(e,t,n){"use strict";e=e("./enumerate");function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((r.prototype=Object.create(Error.prototype)).constructor=r).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(e){return e instanceof r&&e.details&&e.details.originalError?r.findRootError(e.details.originalError):e},t.exports=r},{"./enumerate":20}],15:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.87.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.87.0"}},{}],16:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":14,"./errors":21}],17:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":15}],18:[function(e,t,n){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(n=(t=(t=e).split("_"))[0],t={merchantId:t.slice(2).join("_"),environment:n},r.environment=t.environment,r.attrs.tokenizationKey=e,r.configUrl=i[t.environment]+"/merchants/"+t.merchantId+"/client_api/v1/configuration"):(n=JSON.parse(o(e)),r.environment=n.environment,r.attrs.authorizationFingerprint=n.authorizationFingerprint,r.configUrl=n.configUrl,r.graphQL=n.graphQL),r}},{"../lib/constants":15,"../lib/vendor/polyfill":26}],19:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),a=e("./errors"),s="3.87.0";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(t=window.braintree&&window.braintree.client?t:i.loadScript({src:e.assetsUrl+"/web/"+s+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:a.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:a.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:a.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})).then(function(){return window.braintree.client.VERSION!==s?o.reject(new r({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+s+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})})}}},{"./assets":12,"./braintree-error":14,"./errors":21,"./promise":25}],20:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],21:[function(e,t,n){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":14}],22:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],23:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],24:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],25:[function(e,t,n){"use strict";var r=e("promise-polyfill"),e=e("@braintree/extended-promise"),r="undefined"!=typeof Promise?Promise:r;e.suppressUnhandledPromiseMessage=!0,e.setPromise(r),t.exports=r},{"@braintree/extended-promise":4,"promise-polyfill":9}],26:[function(e,t,n){"use strict";var r="function"==typeof atob?atob:o;function o(e){var t,n,r,o,i,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(i=0;n=a.indexOf(e.charAt(i++)),t=(15&(r=a.indexOf(e.charAt(i++))))<<4|(o=a.indexOf(e.charAt(i++)))>>2&15,o=(3&o)<<6|63&a.indexOf(e.charAt(i++)),s+=String.fromCharCode((63&n)<<2|r>>4&3)+(t?String.fromCharCode(t):"")+(o?String.fromCharCode(o):""),i<e.length;);return s}t.exports={atob:function(e){return r.call(window,e)},_atob:o}},{}],27:[function(e,t,n){"use strict";t.exports={PLAID_LINK_JS:"https://cdn.plaid.com/link/v2/stable/link-initialize.js"}},{}],28:[function(e,t,n){"use strict";e=e("../lib/braintree-error");t.exports={US_BANK_ACCOUNT_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"US_BANK_ACCOUNT_OPTION_REQUIRED"},US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS:{type:e.types.MERCHANT,code:"US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS"},US_BANK_ACCOUNT_LOGIN_LOAD_FAILED:{type:e.types.NETWORK,code:"US_BANK_ACCOUNT_LOGIN_LOAD_FAILED",message:"Bank login flow failed to load."},US_BANK_ACCOUNT_LOGIN_CLOSED:{type:e.types.CUSTOMER,code:"US_BANK_ACCOUNT_LOGIN_CLOSED",message:"Customer closed bank login flow before authorizing."},US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE:{type:e.types.MERCHANT,code:"US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE",message:"Another bank login tokenization request is active."},US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR:{type:e.types.NETWORK,code:"US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR",message:"A tokenization network error occurred."},US_BANK_ACCOUNT_FAILED_TOKENIZATION:{type:e.types.CUSTOMER,code:"US_BANK_ACCOUNT_FAILED_TOKENIZATION",message:"The supplied data failed tokenization."},US_BANK_ACCOUNT_NOT_ENABLED:{type:e.types.MERCHANT,code:"US_BANK_ACCOUNT_NOT_ENABLED",message:"US bank account is not enabled."},US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED:{type:e.types.MERCHANT,code:"US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED",message:"Bank login is not enabled."}}},{"../lib/braintree-error":14}],29:[function(e,t,n){"use strict";var r=e("../lib/basic-component-verification"),o=e("../lib/braintree-error"),i=e("../lib/create-deferred-client"),a=e("../lib/create-assets-url"),s=e("./errors"),c=e("./us-bank-account"),u=e("../lib/promise"),e=e("@braintree/wrap-promise");t.exports={create:e(function(t){var e="US Bank Account";return r.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return i.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:a.create(t.authorization),name:e})}).then(function(e){return t.client=e,t.client.getConfiguration().gatewayConfiguration.usBankAccount?new c(t):u.reject(new o(s.US_BANK_ACCOUNT_NOT_ENABLED))})}),VERSION:"3.87.0"}},{"../lib/basic-component-verification":13,"../lib/braintree-error":14,"../lib/create-assets-url":17,"../lib/create-deferred-client":19,"../lib/promise":25,"./errors":28,"./us-bank-account":30,"@braintree/wrap-promise":8}],30:[function(e,t,n){"use strict";var u=e("../lib/braintree-error"),r=e("./constants"),l=e("./errors"),o=e("../lib/errors"),d=e("../lib/analytics"),i=e("../lib/once"),a=e("../lib/convert-methods-to-error"),s=e("../lib/methods"),p=e("../lib/promise"),e=e("@braintree/wrap-promise");A("UsBankAccount"),A("UsBankLogin");function c(e){this._client=e.client,this._isTokenizingBankLogin=!1,d.sendEvent(this._client,"usbankaccount.initialized")}function f(e){var t=e.details&&e.details.httpStatus,t=new u(401===t?o.BRAINTREE_API_ACCESS_RESTRICTED:t<500?l.US_BANK_ACCOUNT_FAILED_TOKENIZATION:l.US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR);return t.details={originalError:e},t}function _(e,t){e=e.data[t].paymentMethod,t=e.details.last4;return{nonce:e.id,details:{},description:"US bank account ending in - "+t,type:"us_bank_account"}}function N(t,n){function r(){var e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(t.removeEventListener("error",o),t.removeEventListener("load",r),t.removeEventListener("readystatechange",r),n(null,window.Plaid))}function o(){t.parentNode.removeChild(t),n(new u(l.US_BANK_ACCOUNT_LOGIN_LOAD_FAILED))}t.addEventListener("error",o),t.addEventListener("load",r),t.addEventListener("readystatechange",r)}function E(e){return{streetAddress:e.streetAddress,extendedAddress:e.extendedAddress,city:e.locality,state:e.region,zipCode:e.postalCode}}function h(e,t){"personal"===t.ownershipType?e.individualOwner={firstName:t.firstName,lastName:t.lastName}:"business"===t.ownershipType&&(e.businessOwner={businessName:t.businessName})}function A(e){return"mutation Tokenize"+e+"($input: Tokenize"+e+"Input!) {  tokenize"+e+"(input: $input) {    paymentMethod {      id      details {        ... on UsBankAccountDetails {          last4        }      }    }  }}"}c.prototype.tokenize=function(e){return(e=e||{}).mandateText?e.bankDetails&&e.bankLogin?p.reject(new u({type:l.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.type,code:l.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.code,message:"tokenize must be called with bankDetails or bankLogin, not both."})):e.bankDetails?this._tokenizeBankDetails(e):e.bankLogin?this._tokenizeBankLogin(e):p.reject(new u({type:l.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:l.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"tokenize must be called with bankDetails or bankLogin."})):p.reject(new u({type:l.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:l.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"mandateText property is required."}))},c.prototype._tokenizeBankDetails=function(e){var t=this._client,n=e.bankDetails,e={achMandate:e.mandateText,routingNumber:n.routingNumber,accountNumber:n.accountNumber,accountType:n.accountType.toUpperCase(),billingAddress:E(n.billingAddress||{})};return h(e,n),t.request({api:"graphQLApi",data:{query:"mutation TokenizeUsBankAccount($input: TokenizeUsBankAccountInput!) {  tokenizeUsBankAccount(input: $input) {    paymentMethod {      id      details {        ... on UsBankAccountDetails {          last4        }      }    }  }}",variables:{input:{usBankAccount:e}}}}).then(function(e){return d.sendEvent(t,"usbankaccount.bankdetails.tokenization.succeeded"),p.resolve(_(e,"tokenizeUsBankAccount"))}).catch(function(e){e=f(e);return d.sendEvent(t,"usbankaccount.bankdetails.tokenization.failed"),p.reject(e)})},c.prototype._tokenizeBankLogin=function(i){var a=this,s=this._client,e=s.getConfiguration().gatewayConfiguration,c="production"===e.environment,n=e.usBankAccount.plaid;return i.bankLogin.displayName?n?this._isTokenizingBankLogin?p.reject(new u(l.US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE)):(this._isTokenizingBankLogin=!0,new p(function(r,o){a._loadPlaid(function(e,t){e?o(e):(t.create({clientName:i.bankLogin.displayName,apiVersion:"v2",env:c?"production":"sandbox",key:n.publicKey,product:"auth",selectAccount:!0,onExit:function(){a._isTokenizingBankLogin=!1,d.sendEvent(s,"usbankaccount.banklogin.tokenization.closed.by-user"),o(new u(l.US_BANK_ACCOUNT_LOGIN_CLOSED))},onSuccess:function(e,t){var n=i.bankLogin,e={publicToken:e,accountId:c?t.account_id:"plaid_account_id",accountType:t.account.subtype.toUpperCase(),achMandate:i.mandateText,billingAddress:E(n.billingAddress||{})};h(e,n),s.request({api:"graphQLApi",data:{query:"mutation TokenizeUsBankLogin($input: TokenizeUsBankLoginInput!) {  tokenizeUsBankLogin(input: $input) {    paymentMethod {      id      details {        ... on UsBankAccountDetails {          last4        }      }    }  }}",variables:{input:{usBankLogin:e}}}}).then(function(e){a._isTokenizingBankLogin=!1,d.sendEvent(s,"usbankaccount.banklogin.tokenization.succeeded"),r(_(e,"tokenizeUsBankLogin"))}).catch(function(e){a._isTokenizingBankLogin=!1,e=f(e),d.sendEvent(s,"usbankaccount.banklogin.tokenization.failed"),o(e)})}}).open(),d.sendEvent(s,"usbankaccount.banklogin.tokenization.started"))})})):p.reject(new u(l.US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED)):p.reject(new u({type:l.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:l.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"displayName property is required when using bankLogin."}))},c.prototype._loadPlaid=function(e){var t;e=i(e),window.Plaid?e(null,window.Plaid):(t=document.querySelector('script[src="'+r.PLAID_LINK_JS+'"]'))?N(t,e):((t=document.createElement("script")).src=r.PLAID_LINK_JS,t.async=!0,N(t,e),document.body.appendChild(t),this._plaidScript=t)},c.prototype.teardown=function(){return this._plaidScript&&document.body.removeChild(this._plaidScript),a(this,s(c.prototype)),p.resolve()},t.exports=e.wrapPrototype(c)},{"../lib/analytics":11,"../lib/braintree-error":14,"../lib/convert-methods-to-error":16,"../lib/errors":21,"../lib/methods":23,"../lib/once":24,"../lib/promise":25,"./constants":27,"./errors":28,"@braintree/wrap-promise":8}]},{},[29])(29)});