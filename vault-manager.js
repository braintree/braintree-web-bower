!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).vaultManager=e()}(function(){return function r(o,i,s){function a(t,e){if(!i[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(n=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",n}n=i[t]={exports:{}},o[t][0].call(n.exports,function(e){return a(o[t][1][e]||e)},n,n.exports,r,o,i,s)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<s.length;e++)a(s[e]);return a}({1:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.PromiseGlobal=void 0;e=r(e("promise-polyfill")),e="undefined"!=typeof Promise?Promise:e.default;n.PromiseGlobal=e},{"promise-polyfill":9}],2:[function(e,t,n){"use strict";var s=e("./lib/promise"),a={};function r(n){var e,t=JSON.stringify(n);if(!n.forceScriptReload&&(e=a[t]))return e;var r=document.createElement("script"),o=n.dataAttributes||{},i=n.container||document.head;return r.src=n.src,r.id=n.id||"",r.async=!0,n.crossorigin&&r.setAttribute("crossorigin",""+n.crossorigin),Object.keys(o).forEach(function(e){r.setAttribute("data-"+e,""+o[e])}),e=new s.PromiseGlobal(function(e,t){r.addEventListener("load",function(){e(r)}),r.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),r.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),i.appendChild(r)}),a[t]=e}r.clearCache=function(){a={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,n){"use strict";var r="undefined"!=typeof Promise?Promise:null,r=(o.defaultOnResolve=function(e){return o.Promise.resolve(e)},o.defaultOnReject=function(e){return o.Promise.reject(e)},o.setPromise=function(e){o.Promise=e},o.shouldCatchExceptions=function(e){return e.hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(e.suppressUnhandledPromiseMessage):Boolean(o.suppressUnhandledPromiseMessage)},o.all=function(e){return o.Promise.all(e)},o.allSettled=function(e){return o.Promise.allSettled(e)},o.race=function(e){return o.Promise.race(e)},o.reject=function(e){return o.Promise.reject(e)},o.resolve=function(e){return o.Promise.resolve(e)},o.prototype.then=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).then.apply(e,t)},o.prototype.catch=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).catch.apply(e,t)},o.prototype.resolve=function(e){var t=this;return this.isFulfilled||(this._setResolved(),o.Promise.resolve().then(function(){return t._onResolve(e)}).then(function(e){t._resolveFunction(e)}).catch(function(e){t._resetState(),t.reject(e)})),this},o.prototype.reject=function(e){var t=this;return this.isFulfilled||(this._setRejected(),o.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(function(e){return t._rejectFunction(e)})),this},o.prototype._resetState=function(){this.isFulfilled=!1,this.isResolved=!1,this.isRejected=!1},o.prototype._setResolved=function(){this.isFulfilled=!0,this.isResolved=!0,this.isRejected=!1},o.prototype._setRejected=function(){this.isFulfilled=!0,this.isResolved=!1,this.isRejected=!0},o.Promise=r,o);function o(e){var n=this;"function"!=typeof e?(this._promise=new o.Promise(function(e,t){n._resolveFunction=e,n._rejectFunction=t}),this._onResolve=(e=e||{}).onResolve||o.defaultOnResolve,this._onReject=e.onReject||o.defaultOnReject,o.shouldCatchExceptions(e)&&this._promise.catch(function(){}),this._resetState()):this._promise=new o.Promise(e)}t.exports=r},{}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.deferred=function(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{n.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.once=function(n){var r=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r||(r=!0,n.apply(void 0,e))}}},{}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],8:[function(e,t,n){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),s=e("./lib/promise-or-callback");function a(r){return function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),s.promiseOrCallback(r.apply(this,t),e)}}a.wrapPrototype=function(r,e){var o=(e=void 0===e?{}:e).ignoreMethods||[],i=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(r.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof r.prototype[e],n=-1===o.indexOf(e),e=i||"_"!==e.charAt(0);return t&&e&&n}).forEach(function(e){var t=r.prototype[e];r.prototype[e]=a(t)}),r},t.exports=a},{"./lib/deferred":5,"./lib/once":6,"./lib/promise-or-callback":7}],9:[function(e,t,n){"use strict";var r=setTimeout,o="undefined"!=typeof setImmediate?setImmediate:null;function c(e){return Boolean(e&&void 0!==e.length)}function i(){}function s(e){if(!(this instanceof s))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,s._immediateFn(function(){var e,t=1===n._state?r.onFulfilled:r.onRejected;if(null!==t){try{e=t(n._value)}catch(e){return void l(r.promise,e)}u(r.promise,e)}else(1===n._state?u:l)(r.promise,n._value)})):n._deferreds.push(r)}function u(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof s)return t._state=3,t._value=e,void f(t);if("function"==typeof n)return void p((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,f(t)}catch(e){l(t,e)}var r,o}function l(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&s._immediateFn(function(){e._handled||s._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function p(e,t){var n=!1;try{e(function(e){n||(n=!0,u(t,e))},function(e){n||(n=!0,l(t,e))})}catch(e){if(n)return;n=!0,l(t,e)}}s.prototype.catch=function(e){return this.then(null,e)},s.prototype.then=function(e,t){var n=new this.constructor(i);return a(this,new d(e,t,n)),n},s.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},s.all=function(t){return new s(function(o,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var s=Array.prototype.slice.call(t);if(0===s.length)return o([]);var a=s.length;for(var e=0;e<s.length;e++)!function t(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},i)}s[n]=e,0==--a&&o(s)}catch(e){i(e)}}(e,s[e])})},s.allSettled=function(n){return new this(function(o,e){if(!n||void 0===n.length)return e(new TypeError(typeof n+" "+n+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(n);if(0===i.length)return o([]);var s=i.length;for(var t=0;t<i.length;t++)!function t(n,e){if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},function(e){i[n]={status:"rejected",reason:e},0==--s&&o(i)})}i[n]={status:"fulfilled",value:e},0==--s&&o(i)}(t,i[t])})},s.resolve=function(t){return t&&"object"==typeof t&&t.constructor===s?t:new s(function(e){e(t)})},s.reject=function(n){return new s(function(e,t){t(n)})},s.race=function(o){return new s(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=o.length;n<r;n++)s.resolve(o[n]).then(e,t)})},s._immediateFn="function"==typeof o?function(e){o(e)}:function(e){r(e,0)},s._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=s},{}],10:[function(e,t,n){"use strict";var i=e("./create-authorization-data"),s=e("./json-clone"),a=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},t=i(e.authorization).attrs,o=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=a.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(o[n]=r._meta[n]);return r._meta=o,t.tokenizationKey?r.tokenizationKey=t.tokenizationKey:r.authorizationFingerprint=t.authorizationFingerprint,r}},{"./constants":15,"./create-authorization-data":18,"./json-clone":22}],11:[function(e,t,n){"use strict";var r=e("./promise"),a=e("./constants"),c=e("./add-metadata");t.exports={sendEvent:function(e,o,i){var s=Date.now();return r.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),r=e._request,e=n.gatewayConfiguration.analytics.url,t={analytics:[{kind:a.ANALYTICS_PREFIX+o,isAsync:Math.floor(t/1e3)!==Math.floor(s/1e3),timestamp:s}]};r({url:e,method:"post",data:c(n,t),timeout:a.ANALYTICS_REQUEST_TIMEOUT_MS},i)}).catch(function(e){i&&i(e)})}}},{"./add-metadata":10,"./constants":15,"./promise":24}],12:[function(e,t,n){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],13:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./errors");t.exports={verify:function(e){var t,n;return e?(n=e.name,t=e.client,e=e.authorization,t||e?e||"3.85.2"===t.getVersion()?o.resolve():o.reject(new r({type:i.INCOMPATIBLE_VERSIONS.type,code:i.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+n+" (version 3.85.2) components must be from the same SDK version."})):o.reject(new r({type:i.INSTANTIATION_OPTION_REQUIRED.type,code:i.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+n+"."}))):o.reject(new r({type:i.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:i.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":14,"./errors":21,"./promise":24}],14:[function(e,t,n){"use strict";e=e("./enumerate");function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((r.prototype=Object.create(Error.prototype)).constructor=r).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(e){return e instanceof r&&e.details&&e.details.originalError?r.findRootError(e.details.originalError):e},t.exports=r},{"./enumerate":20}],15:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.85.2",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.85.2"}},{}],16:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":14,"./errors":21}],17:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":15}],18:[function(e,t,n){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(t=(n=(t=e).split("_"))[0],t={merchantId:n.slice(2).join("_"),environment:t},r.environment=t.environment,r.attrs.tokenizationKey=e,r.configUrl=i[t.environment]+"/merchants/"+t.merchantId+"/client_api/v1/configuration"):(e=JSON.parse(o(e)),r.environment=e.environment,r.attrs.authorizationFingerprint=e.authorizationFingerprint,r.configUrl=e.configUrl,r.graphQL=e.graphQL),r}},{"../lib/constants":15,"../lib/vendor/polyfill":25}],19:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),s=e("./errors"),a="3.85.2";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(t=!window.braintree||!window.braintree.client?i.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))}):t).then(function(){return window.braintree.client.VERSION!==a?o.reject(new r({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})})}}},{"./assets":12,"./braintree-error":14,"./errors":21,"./promise":24}],20:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],21:[function(e,t,n){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":14}],22:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],23:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],24:[function(e,t,n){"use strict";var r=e("promise-polyfill"),e=e("@braintree/extended-promise"),r="undefined"!=typeof Promise?Promise:r;e.suppressUnhandledPromiseMessage=!0,e.setPromise(r),t.exports=r},{"@braintree/extended-promise":4,"promise-polyfill":9}],25:[function(e,t,n){"use strict";var r="function"==typeof atob?atob:o;function o(e){var t,n,r,o,i,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(i=0;n=s.indexOf(e.charAt(i++)),t=(15&(r=s.indexOf(e.charAt(i++))))<<4|(o=s.indexOf(e.charAt(i++)))>>2&15,o=(3&o)<<6|63&s.indexOf(e.charAt(i++)),a+=String.fromCharCode((63&n)<<2|r>>4&3)+(t?String.fromCharCode(t):"")+(o?String.fromCharCode(o):""),i<e.length;);return a}t.exports={atob:function(e){return r.call(window,e)},_atob:o}},{}],26:[function(e,t,n){"use strict";e=e("../lib/braintree-error");t.exports={VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN:{type:e.types.MERCHANT,code:"VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN",message:"A client token with a customer id must be used to delete a payment method nonce."},VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND:{type:e.types.MERCHANT,code:"VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND"},VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR:{type:e.types.UNKNOWN,code:"VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR"}}},{"../lib/braintree-error":14}],27:[function(e,t,n){"use strict";var r=e("../lib/basic-component-verification"),o=e("../lib/create-deferred-client"),i=e("../lib/create-assets-url"),s=e("./vault-manager"),e=e("@braintree/wrap-promise");t.exports={create:e(function(e){var t="Vault Manager";return r.verify({name:t,client:e.client,authorization:e.authorization}).then(function(){return new s({createPromise:o.create({authorization:e.authorization,client:e.client,debug:e.debug,assetsUrl:i.create(e.authorization),name:t})})})}),VERSION:"3.85.2"}},{"../lib/basic-component-verification":13,"../lib/create-assets-url":17,"../lib/create-deferred-client":19,"./vault-manager":28,"@braintree/wrap-promise":8}],28:[function(e,t,n){"use strict";var o=e("../lib/analytics"),i=e("../lib/braintree-error"),s=e("./errors"),r=e("../lib/convert-methods-to-error"),a=e("../lib/methods"),c=e("../lib/promise"),e=e("@braintree/wrap-promise");function u(e){this._createPromise=e.createPromise}function l(e){var t={nonce:e.nonce,default:e.default,details:e.details,hasSubscription:e.hasSubscription,type:e.type};return e.description&&(t.description=e.description),e.binData&&(t.binData=e.binData),t}u.prototype.fetchPaymentMethods=function(e){var t=!0===(e=e||{}).defaultFirst?1:0;return this._createPromise.then(function(e){return e.request({endpoint:"payment_methods",method:"get",data:{defaultFirst:t}})}).then(function(e){return o.sendEvent(this._createPromise,"vault-manager.fetch-payment-methods.succeeded"),e.paymentMethods.map(l)}.bind(this))},u.prototype.deletePaymentMethod=function(r){return this._createPromise.then(function(n){return"CLIENT_TOKEN"===n.getConfiguration().authorizationType?n.request({api:"graphQLApi",data:{query:"mutation DeletePaymentMethodFromSingleUseToken($input: DeletePaymentMethodFromSingleUseTokenInput!) {  deletePaymentMethodFromSingleUseToken(input: $input) {    clientMutationId  }}",variables:{input:{singleUseTokenId:r}},operationName:"DeletePaymentMethodFromSingleUseToken"}}).then(function(){o.sendEvent(n,"vault-manager.delete-payment-method.succeeded")}).catch(function(e){var t,e=e.details.originalError;return o.sendEvent(n,"vault-manager.delete-payment-method.failed"),t=(t=e[0]&&"NOT_FOUND"===e[0].extensions.errorClass?new i({type:s.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.type,code:s.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.code,message:"A payment method for payment method nonce `"+r+"` could not be found.",details:{originalError:e}}):t)||new i({type:s.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.type,code:s.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.code,message:"An unknown error occured when attempting to delete the payment method assocaited with the payment method nonce `"+r+"`.",details:{originalError:e}}),c.reject(t)}):c.reject(new i(s.VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN))})},u.prototype.teardown=function(){return r(this,a(u.prototype)),c.resolve()},t.exports=e.wrapPrototype(u)},{"../lib/analytics":11,"../lib/braintree-error":14,"../lib/convert-methods-to-error":16,"../lib/methods":23,"../lib/promise":24,"./errors":26,"@braintree/wrap-promise":8}]},{},[27])(27)});