!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).americanExpress=e()}(function(){return function n(o,i,s){function c(t,e){if(!i[t]){if(!o[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(a)return a(t,!0);throw(r=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",r}r=i[t]={exports:{}},o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,n,o,i,s)}return i[t].exports}for(var a="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.PromiseGlobal=void 0;e=n(e("promise-polyfill")),e="undefined"!=typeof Promise?Promise:e.default;r.PromiseGlobal=e},{"promise-polyfill":9}],2:[function(e,t,r){"use strict";var s=e("./lib/promise"),c={};function n(r){var e,t=JSON.stringify(r);if(!r.forceScriptReload&&(e=c[t]))return e;var n=document.createElement("script"),o=r.dataAttributes||{},i=r.container||document.head;return n.src=r.src,n.id=r.id||"",n.async=!0,r.crossorigin&&n.setAttribute("crossorigin",""+r.crossorigin),Object.keys(o).forEach(function(e){n.setAttribute("data-"+e,""+o[e])}),e=new s.PromiseGlobal(function(e,t){n.addEventListener("load",function(){e(n)}),n.addEventListener("error",function(){t(new Error(r.src+" failed to load."))}),n.addEventListener("abort",function(){t(new Error(r.src+" has aborted."))}),i.appendChild(n)}),c[t]=e}n.clearCache=function(){c={}},t.exports=n},{"./lib/promise":1}],3:[function(e,t,r){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,r){"use strict";var n="undefined"!=typeof Promise?Promise:null,n=(o.defaultOnResolve=function(e){return o.Promise.resolve(e)},o.defaultOnReject=function(e){return o.Promise.reject(e)},o.setPromise=function(e){o.Promise=e},o.shouldCatchExceptions=function(e){return e.hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(e.suppressUnhandledPromiseMessage):Boolean(o.suppressUnhandledPromiseMessage)},o.all=function(e){return o.Promise.all(e)},o.allSettled=function(e){return o.Promise.allSettled(e)},o.race=function(e){return o.Promise.race(e)},o.reject=function(e){return o.Promise.reject(e)},o.resolve=function(e){return o.Promise.resolve(e)},o.prototype.then=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=this._promise).then.apply(e,t)},o.prototype.catch=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=this._promise).catch.apply(e,t)},o.prototype.resolve=function(e){var t=this;return this.isFulfilled||(this._setResolved(),o.Promise.resolve().then(function(){return t._onResolve(e)}).then(function(e){t._resolveFunction(e)}).catch(function(e){t._resetState(),t.reject(e)})),this},o.prototype.reject=function(e){var t=this;return this.isFulfilled||(this._setRejected(),o.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(function(e){return t._rejectFunction(e)})),this},o.prototype._resetState=function(){this.isFulfilled=!1,this.isResolved=!1,this.isRejected=!1},o.prototype._setResolved=function(){this.isFulfilled=!0,this.isResolved=!0,this.isRejected=!1},o.prototype._setRejected=function(){this.isFulfilled=!0,this.isResolved=!1,this.isRejected=!0},o.Promise=n,o);function o(e){var r=this;"function"!=typeof e?(this._promise=new o.Promise(function(e,t){r._resolveFunction=e,r._rejectFunction=t}),e=e||{},this._onResolve=e.onResolve||o.defaultOnResolve,this._onReject=e.onReject||o.defaultOnReject,o.shouldCatchExceptions(e)&&this._promise.catch(function(){}),this._resetState()):this._promise=new o.Promise(e)}t.exports=n},{}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.deferred=function(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{r.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.once=function(r){var n=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];n||(n=!0,r.apply(void 0,e))}}},{}],7:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],8:[function(e,t,r){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),s=e("./lib/promise-or-callback");function c(n){return function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),s.promiseOrCallback(n.apply(this,t),e)}}c.wrapPrototype=function(n,e){void 0===e&&(e={});var o=e.ignoreMethods||[],i=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(n.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof n.prototype[e],r=-1===o.indexOf(e),e=i||"_"!==e.charAt(0);return t&&e&&r}).forEach(function(e){var t=n.prototype[e];n.prototype[e]=c(t)}),n},t.exports=c},{"./lib/deferred":5,"./lib/once":6,"./lib/promise-or-callback":7}],9:[function(e,t,r){"use strict";var n=setTimeout;function a(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function s(r,n){for(;3===r._state;)r=r._value;0!==r._state?(r._handled=!0,i._immediateFn(function(){var e,t=1===r._state?n.onFulfilled:n.onRejected;if(null!==t){try{e=t(r._value)}catch(e){return void u(n.promise,e)}c(n.promise,e)}else(1===r._state?c:u)(n.promise,r._value)})):r._deferreds.push(n)}function c(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof r)return void p((n=r,o=e,function(){n.apply(o,arguments)}),t)}t._state=1,t._value=e,l(t)}catch(e){u(t,e)}var n,o}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)s(e,e._deferreds[t]);e._deferreds=null}function f(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function p(e,t){var r=!1;try{e(function(e){r||(r=!0,c(t,e))},function(e){r||(r=!0,u(t,e))})}catch(e){if(r)return;r=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(o);return s(this,new f(e,t,r)),r},i.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){return r.reject(e)})})},i.all=function(t){return new i(function(o,i){if(!a(t))return i(new TypeError("Promise.all accepts an array"));var s=Array.prototype.slice.call(t);if(0===s.length)return o([]);var c=s.length;for(var e=0;e<s.length;e++)!function t(r,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){t(r,e)},i)}s[r]=e,0==--c&&o(s)}catch(e){i(e)}}(e,s[e])})},i.allSettled=function(r){return new this(function(o,e){if(!r||void 0===r.length)return e(new TypeError(typeof r+" "+r+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(r);if(0===i.length)return o([]);var s=i.length;for(var t=0;t<i.length;t++)!function t(r,e){if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){t(r,e)},function(e){i[r]={status:"rejected",reason:e},0==--s&&o(i)})}i[r]={status:"fulfilled",value:e},0==--s&&o(i)}(t,i[t])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(r){return new i(function(e,t){t(r)})},i.race=function(o){return new i(function(e,t){if(!a(o))return t(new TypeError("Promise.race accepts an array"));for(var r=0,n=o.length;r<n;r++)i.resolve(o[r]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){n(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],10:[function(e,t,r){"use strict";var n=e("../lib/braintree-error"),o=e("./errors"),i=e("../lib/assign").assign,s=e("../lib/promise"),c=e("../lib/methods"),a=e("../lib/convert-methods-to-error"),e=e("@braintree/wrap-promise");function u(e){this._client=e.client}u.prototype.getRewardsBalance=function(e){var t=e.nonce;return t?(delete(e=i({_meta:{source:"american-express"},paymentMethodNonce:t},e)).nonce,this._client.request({method:"get",endpoint:"payment_methods/amex_rewards_balance",data:e}).catch(function(e){return s.reject(new n({type:o.AMEX_NETWORK_ERROR.type,code:o.AMEX_NETWORK_ERROR.code,message:"A network error occurred when getting the American Express rewards balance.",details:{originalError:e}}))})):s.reject(new n({type:o.AMEX_NONCE_REQUIRED.type,code:o.AMEX_NONCE_REQUIRED.code,message:"getRewardsBalance must be called with a nonce."}))},u.prototype.getExpressCheckoutProfile=function(e){return e.nonce?this._client.request({method:"get",endpoint:"payment_methods/amex_express_checkout_cards/"+e.nonce,data:{_meta:{source:"american-express"},paymentMethodNonce:e.nonce}}).catch(function(e){return s.reject(new n({type:o.AMEX_NETWORK_ERROR.type,code:o.AMEX_NETWORK_ERROR.code,message:"A network error occurred when getting the American Express Checkout nonce profile.",details:{originalError:e}}))}):s.reject(new n({type:o.AMEX_NONCE_REQUIRED.type,code:o.AMEX_NONCE_REQUIRED.code,message:"getExpressCheckoutProfile must be called with a nonce."}))},u.prototype.teardown=function(){return a(this,c(u.prototype)),s.resolve()},t.exports=e.wrapPrototype(u)},{"../lib/assign":14,"../lib/braintree-error":16,"../lib/convert-methods-to-error":18,"../lib/methods":23,"../lib/promise":24,"./errors":11,"@braintree/wrap-promise":8}],11:[function(e,t,r){"use strict";e=e("../lib/braintree-error");t.exports={AMEX_NONCE_REQUIRED:{type:e.types.MERCHANT,code:"AMEX_NONCE_REQUIRED"},AMEX_NETWORK_ERROR:{type:e.types.NETWORK,code:"AMEX_NETWORK_ERROR"}}},{"../lib/braintree-error":16}],12:[function(e,t,r){"use strict";var n=e("./american-express"),o=e("../lib/basic-component-verification"),i=e("../lib/create-deferred-client"),s=e("../lib/create-assets-url"),e=e("@braintree/wrap-promise");t.exports={create:e(function(t){var e="American Express";return o.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return i.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:s.create(t.authorization),name:e})}).then(function(e){return t.client=e,new n(t)})}),VERSION:"3.74.0"}},{"../lib/basic-component-verification":15,"../lib/create-assets-url":19,"../lib/create-deferred-client":20,"./american-express":10,"@braintree/wrap-promise":8}],13:[function(e,t,r){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],14:[function(e,t,r){"use strict";var n="function"==typeof Object.assign?Object.assign:o;function o(e){for(var t,r,n=1;n<arguments.length;n++)for(r in t=arguments[n])t.hasOwnProperty(r)&&(e[r]=t[r]);return e}t.exports={assign:n,_assign:o}},{}],15:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./promise"),i=e("./errors");t.exports={verify:function(e){var t,r;return e?(r=e.name,t=e.client,e=e.authorization,t||e?e||"3.74.0"===t.getVersion()?o.resolve():o.reject(new n({type:i.INCOMPATIBLE_VERSIONS.type,code:i.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.74.0) components must be from the same SDK version."})):o.reject(new n({type:i.INSTANTIATION_OPTION_REQUIRED.type,code:i.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."}))):o.reject(new n({type:i.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:i.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":16,"./errors":22,"./promise":24}],16:[function(e,t,r){"use strict";e=e("./enumerate");function n(e){if(!n.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}n.prototype=Object.create(Error.prototype),(n.prototype.constructor=n).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),n.findRootError=function(e){return e instanceof n&&e.details&&e.details.originalError?n.findRootError(e.details.originalError):e},t.exports=n},{"./enumerate":21}],17:[function(e,t,r){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.74.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.74.0"}},{}],18:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new n({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":16,"./errors":22}],19:[function(e,t,r){"use strict";var n=e("./constants").ASSETS_URLS;t.exports={create:function(e){return n.production}}},{"./constants":17}],20:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./promise"),i=e("./assets"),s=e("./errors"),c="3.74.0";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(window.braintree&&window.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+c+"/js/client.min.js"}).catch(function(e){return o.reject(new n({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return window.braintree.client.VERSION!==c?o.reject(new n({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+c+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}},{"./assets":13,"./braintree-error":16,"./errors":22,"./promise":24}],21:[function(e,t,r){"use strict";t.exports=function(e,r){return r=null==r?"":r,e.reduce(function(e,t){return e[t]=r+t,e},{})}},{}],22:[function(e,t,r){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":16}],23:[function(e,t,r){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],24:[function(e,t,r){"use strict";var n=e("promise-polyfill"),e=e("@braintree/extended-promise"),n="undefined"!=typeof Promise?Promise:n;e.suppressUnhandledPromiseMessage=!0,e.setPromise(n),t.exports=n},{"@braintree/extended-promise":4,"promise-polyfill":9}]},{},[12])(12)});