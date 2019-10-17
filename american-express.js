!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).americanExpress=e()}}(function(){return function i(s,c,a){function u(t,e){if(!c[t]){if(!s[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=c[t]={exports:{}};s[t][0].call(o.exports,function(e){return u(s[t][1][e]||e)},o,o.exports,i,s,c,a)}return c[t].exports}for(var f="function"==typeof require&&require,e=0;e<a.length;e++)u(a[e]);return u}({1:[function(r,n,e){(function(e){"use strict";var t=r("promise-polyfill");n.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],2:[function(e,t,r){"use strict";var s=e("./lib/promise"),c={};function n(r){var t,n,o,e,i=JSON.stringify(r);return!r.forceScriptReload&&(e=c[i])?e:(o=document.createElement("script"),t=r.dataAttributes||{},n=r.container||document.head,o.src=r.src,o.id=r.id,o.async=!0,r.crossorigin&&o.setAttribute("crossorigin",r.crossorigin),Object.keys(t).forEach(function(e){o.setAttribute("data-"+e,t[e])}),e=new s(function(e,t){o.addEventListener("load",function(){e(o)}),o.addEventListener("error",function(){t(new Error(r.src+" failed to load."))}),o.addEventListener("abort",function(){t(new Error(r.src+" has aborted."))}),n.appendChild(o)}),c[i]=e)}n.clearCache=function(){c={}},t.exports=n},{"./lib/promise":1}],3:[function(e,t,r){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){try{t.apply(null,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],4:[function(e,t,r){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],5:[function(e,t,r){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],6:[function(e,t,r){"use strict";var n=e("./lib/deferred"),o=e("./lib/once"),i=e("./lib/promise-or-callback");function c(r){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o(n(e))),i(r.apply(this,t),e)}}c.wrapPrototype=function(o,e){var i,s;return i=(e=e||{}).ignoreMethods||[],s=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(o.prototype).filter(function(e){var t,r="constructor"!==e&&"function"==typeof o.prototype[e],n=-1===i.indexOf(e);return t=s||"_"!==e.charAt(0),r&&t&&n}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=c(t)}),o},t.exports=c},{"./lib/deferred":3,"./lib/once":4,"./lib/promise-or-callback":5}],7:[function(e,t,r){"use strict";var n=setTimeout;function a(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function s(r,n){for(;3===r._state;)r=r._value;0!==r._state?(r._handled=!0,i._immediateFn(function(){var e=1===r._state?n.onFulfilled:n.onRejected;if(null!==e){var t;try{t=e(r._value)}catch(e){return void u(n.promise,e)}c(n.promise,t)}else(1===r._state?c:u)(n.promise,r._value)})):r._deferreds.push(n)}function c(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof i)return t._state=3,t._value=e,void f(t);if("function"==typeof r)return void p(function(e,t){return function(){e.apply(t,arguments)}}(r,e),t)}t._state=1,t._value=e,f(t)}catch(e){u(t,e)}}function u(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)s(e,e._deferreds[t]);e._deferreds=null}function l(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function p(e,t){var r=!1;try{e(function(e){r||(r=!0,c(t,e))},function(e){r||(r=!0,u(t,e))})}catch(e){if(r)return;r=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(o);return s(this,new l(e,t,r)),r},i.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){return r.reject(e)})})},i.all=function(t){return new i(function(n,o){if(!a(t))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(t);if(0===i.length)return n([]);var s=i.length;function c(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){c(t,e)},o)}i[t]=e,0==--s&&n(i)}catch(e){o(e)}}for(var e=0;e<i.length;e++)c(e,i[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(r){return new i(function(e,t){t(r)})},i.race=function(o){return new i(function(e,t){if(!a(o))return t(new TypeError("Promise.race accepts an array"));for(var r=0,n=o.length;r<n;r++)i.resolve(o[r]).then(e,t)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){n(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],8:[function(e,t,r){"use strict";var n=e("../lib/braintree-error"),o=e("./errors"),i=e("../lib/assign").assign,s=e("../lib/promise"),c=e("../lib/methods"),a=e("../lib/convert-methods-to-error"),u=e("@braintree/wrap-promise");function f(e){this._client=e.client}f.prototype.getRewardsBalance=function(e){var t,r=e.nonce;return r?(delete(t=i({_meta:{source:"american-express"},paymentMethodNonce:r},e)).nonce,this._client.request({method:"get",endpoint:"payment_methods/amex_rewards_balance",data:t}).catch(function(e){return s.reject(new n({type:o.AMEX_NETWORK_ERROR.type,code:o.AMEX_NETWORK_ERROR.code,message:"A network error occurred when getting the American Express rewards balance.",details:{originalError:e}}))})):s.reject(new n({type:o.AMEX_NONCE_REQUIRED.type,code:o.AMEX_NONCE_REQUIRED.code,message:"getRewardsBalance must be called with a nonce."}))},f.prototype.getExpressCheckoutProfile=function(e){return e.nonce?this._client.request({method:"get",endpoint:"payment_methods/amex_express_checkout_cards/"+e.nonce,data:{_meta:{source:"american-express"},paymentMethodNonce:e.nonce}}).catch(function(e){return s.reject(new n({type:o.AMEX_NETWORK_ERROR.type,code:o.AMEX_NETWORK_ERROR.code,message:"A network error occurred when getting the American Express Checkout nonce profile.",details:{originalError:e}}))}):s.reject(new n({type:o.AMEX_NONCE_REQUIRED.type,code:o.AMEX_NONCE_REQUIRED.code,message:"getExpressCheckoutProfile must be called with a nonce."}))},f.prototype.teardown=function(){return a(this,c(f.prototype)),s.resolve()},t.exports=u.wrapPrototype(f)},{"../lib/assign":12,"../lib/braintree-error":14,"../lib/convert-methods-to-error":16,"../lib/methods":21,"../lib/promise":22,"./errors":9,"@braintree/wrap-promise":6}],9:[function(e,t,r){"use strict";var n=e("../lib/braintree-error");t.exports={AMEX_NONCE_REQUIRED:{type:n.types.MERCHANT,code:"AMEX_NONCE_REQUIRED"},AMEX_NETWORK_ERROR:{type:n.types.NETWORK,code:"AMEX_NETWORK_ERROR"}}},{"../lib/braintree-error":14}],10:[function(e,t,r){"use strict";var n=e("./american-express"),o=e("../lib/basic-component-verification"),i=e("../lib/create-deferred-client"),s=e("../lib/create-assets-url"),c=e("@braintree/wrap-promise");t.exports={create:c(function(t){var e="American Express";return o.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return i.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:s.create(t.authorization),name:e})}).then(function(e){return t.client=e,new n(t)})}),VERSION:"3.54.2"}},{"../lib/basic-component-verification":13,"../lib/create-assets-url":17,"../lib/create-deferred-client":18,"./american-express":8,"@braintree/wrap-promise":6}],11:[function(e,t,r){"use strict";var n=e("@braintree/asset-loader/load-script");t.exports={loadScript:n}},{"@braintree/asset-loader/load-script":2}],12:[function(e,t,r){"use strict";var n="function"==typeof Object.assign?Object.assign:o;function o(e){var t,r,n;for(t=1;t<arguments.length;t++)for(n in r=arguments[t])r.hasOwnProperty(n)&&(e[n]=r[n]);return e}t.exports={assign:n,_assign:o}},{}],13:[function(e,t,r){"use strict";var o=e("./braintree-error"),i=e("./promise"),s=e("./errors");t.exports={verify:function(e){var t,r,n;return e?(n=e.name,t=e.client,r=e.authorization,null==t&&null==r?i.reject(new o({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+n+"."})):r||"3.54.2"===t.getVersion()?i.resolve():i.reject(new o({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+n+" (version 3.54.2) components must be from the same SDK version."}))):i.reject(new o({type:s.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:s.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":14,"./errors":20,"./promise":22}],14:[function(e,t,r){"use strict";var n=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((o.prototype=Object.create(Error.prototype)).constructor=o).types=n(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":19}],15:[function(e,t,r){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.54.2",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.54.2"}},{}],16:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new n({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":14,"./errors":20}],17:[function(e,t,r){"use strict";var n=e("./constants").ASSETS_URLS;t.exports={create:function(e){return n.production}}},{"./constants":15}],18:[function(e,t,r){(function(r){"use strict";var n=e("./braintree-error"),o=e("./promise"),i=e("./assets"),s=e("./errors"),c="3.54.2";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(r.braintree&&r.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+c+"/js/client.min.js"}).catch(function(e){return o.reject(new n({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return r.braintree.client.VERSION!==c?o.reject(new n({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+r.braintree.client.VERSION+") and "+e.name+" (version "+c+") components must be from the same SDK version."})):r.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets":11,"./braintree-error":14,"./errors":20,"./promise":22}],19:[function(e,t,r){"use strict";t.exports=function(e,r){return r=null==r?"":r,e.reduce(function(e,t){return e[t]=r+t,e},{})}},{}],20:[function(e,t,r){"use strict";var n=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:n.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:n.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:n.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:n.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:n.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":14}],21:[function(e,t,r){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],22:[function(r,n,e){(function(e){"use strict";var t=e.Promise||r("promise-polyfill");n.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}]},{},[10])(10)});