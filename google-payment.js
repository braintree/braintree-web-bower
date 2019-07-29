!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).googlePayment=e()}}(function(){return function i(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=s[t]={exports:{}};a[t][0].call(o.exports,function(e){return u(a[t][1][e]||e)},o,o.exports,i,a,s,c)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(n,r,e){(function(e){"use strict";var t=n("promise-polyfill");r.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],2:[function(e,t,n){"use strict";var a=e("./lib/promise"),s={};function r(n){var t,r,o,e,i=JSON.stringify(n);return!n.forceScriptReload&&(e=s[i])?e:(o=document.createElement("script"),t=n.dataAttributes||{},r=n.container||document.head,o.src=n.src,o.id=n.id,o.async=!0,n.crossorigin&&o.setAttribute("crossorigin",n.crossorigin),Object.keys(t).forEach(function(e){o.setAttribute("data-"+e,t[e])}),e=new a(function(e,t){o.addEventListener("load",function(){e(o)}),o.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),o.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),r.appendChild(o)}),s[i]=e)}r.clearCache=function(){s={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){try{t.apply(null,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],4:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],5:[function(e,t,n){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],6:[function(e,t,n){"use strict";var r=e("./lib/deferred"),o=e("./lib/once"),i=e("./lib/promise-or-callback");function s(n){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o(r(e))),i(n.apply(this,t),e)}}s.wrapPrototype=function(o,e){var i,a;return i=(e=e||{}).ignoreMethods||[],a=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(o.prototype).filter(function(e){var t,n="constructor"!==e&&"function"==typeof o.prototype[e],r=-1===i.indexOf(e);return t=a||"_"!==e.charAt(0),n&&t&&r}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=s(t)}),o},t.exports=s},{"./lib/deferred":3,"./lib/once":4,"./lib/promise-or-callback":5}],7:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,i._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value)}catch(e){return void u(r.promise,e)}s(r.promise,t)}else(1===n._state?s:u)(r.promise,n._value)})):n._deferreds.push(r)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(function(e,t){return function(){e.apply(t,arguments)}}(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){u(t,e)}}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function p(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function f(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){if(n)return;n=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return a(this,new p(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(r,o){if(!c(t))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(t);if(0===i.length)return r([]);var a=i.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){s(t,e)},o)}i[t]=e,0==--a&&r(i)}catch(e){o(e)}}for(var e=0;e<i.length;e++)s(e,i[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=o.length;n<r;n++)i.resolve(o[n]).then(e,t)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],8:[function(e,t,n){"use strict";var r=e("../lib/braintree-error");t.exports={GOOGLE_PAYMENT_NOT_ENABLED:{type:r.types.MERCHANT,code:"GOOGLE_PAYMENT_NOT_ENABLED",message:"Google Pay is not enabled for this merchant."},GOOGLE_PAYMENT_GATEWAY_ERROR:{code:"GOOGLE_PAYMENT_GATEWAY_ERROR",message:"There was an error when tokenizing the Google Pay payment method.",type:r.types.UNKNOWN},GOOGLE_PAYMENT_UNSUPPORTED_VERSION:{code:"GOOGLE_PAYMENT_UNSUPPORTED_VERSION",type:r.types.MERCHANT}}},{"../lib/braintree-error":16}],9:[function(e,t,n){"use strict";var a=e("../lib/analytics"),i=e("../lib/assign").assign,r=e("../lib/convert-methods-to-error"),o=e("../lib/find"),s=e("../lib/generate-google-pay-configuration"),c=e("../lib/braintree-error"),u=e("./errors"),l=e("../lib/methods"),p=e("../lib/promise"),f=e("@braintree/wrap-promise"),d={1:"_createV1PaymentDataRequest",2:"_createV2PaymentDataRequest"};function y(e){this._client=e.client,this._googlePayVersion=e.googlePayVersion||1,this._googleMerchantId=e.googleMerchantId}y.prototype._initialize=function(){return this._isUnsupportedGooglePayAPIVersion()?p.reject(new c({code:u.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.code,message:"The Braintree SDK does not support Google Pay version "+this._googlePayVersion+". Please upgrade the version of your Braintree SDK and contact support if this error persists.",type:u.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.type})):p.resolve(this)},y.prototype._isUnsupportedGooglePayAPIVersion=function(){return!(this._googlePayVersion in d)},y.prototype._getDefaultConfig=function(){return this._defaultConfig||(this._defaultConfig=s(this._client.getConfiguration(),this._googlePayVersion,this._googleMerchantId)),this._defaultConfig},y.prototype._createV1PaymentDataRequest=function(e){var t=this._getDefaultConfig(),n=e.cardRequirements&&e.cardRequirements.allowedCardNetworks,r=t.cardRequirements.allowedCardNetworks,o=n||r;return(e=i({},t,e)).cardRequirements.allowedCardNetworks=o,e},y.prototype._createV2PaymentDataRequest=function(e){var n=this._getDefaultConfig();return e.allowedPaymentMethods&&e.allowedPaymentMethods.forEach(function(e){var t=o(n.allowedPaymentMethods,"type",e.type);t&&function(t,n){Object.keys(n).forEach(function(e){"object"==typeof n[e]?t[e]=i({},n[e],t[e]):t[e]=t[e]||n[e]})}(e,t)}),e=i({},n,e)},y.prototype.createPaymentDataRequest=function(e){var t=i({},e),n=this._googlePayVersion,r=d[n];return a.sendEvent(this._client,"google-payment.v"+n+".createPaymentDataRequest"),this[r](t)},y.prototype.parseResponse=function(o){var i=this._client;return p.resolve().then(function(){var e,t=2===o.apiVersion?o.paymentMethodData.tokenizationData.token:o.paymentMethodToken.token,n=JSON.parse(t),r=n.error;return r?p.reject(r):(a.sendEvent(i,"google-payment.parseResponse.succeeded"),n.paypalAccounts?(e=n.paypalAccounts[0],a.sendEvent(i,"google-payment.parseResponse.succeeded.paypal"),p.resolve({nonce:e.nonce,type:e.type,description:e.description})):(e=n.androidPayCards[0],a.sendEvent(i,"google-payment.parseResponse.succeeded.google-payment"),p.resolve({nonce:e.nonce,type:e.type,description:e.description,details:{cardType:e.details.cardType,lastFour:e.details.lastFour,lastTwo:e.details.lastTwo},binData:e.binData})))}).catch(function(e){return a.sendEvent(i,"google-payment.parseResponse.failed"),p.reject(new c({code:u.GOOGLE_PAYMENT_GATEWAY_ERROR.code,message:u.GOOGLE_PAYMENT_GATEWAY_ERROR.message,type:u.GOOGLE_PAYMENT_GATEWAY_ERROR.type,details:{originalError:e}}))})},y.prototype.teardown=function(){return r(this,l(y.prototype)),p.resolve()},t.exports=f.wrapPrototype(y)},{"../lib/analytics":12,"../lib/assign":14,"../lib/braintree-error":16,"../lib/convert-methods-to-error":18,"../lib/find":24,"../lib/generate-google-pay-configuration":25,"../lib/methods":27,"../lib/promise":28,"./errors":8,"@braintree/wrap-promise":6}],10:[function(e,t,n){"use strict";var r=e("../lib/basic-component-verification"),o=e("../lib/braintree-error"),i=e("./errors"),a=e("./google-payment"),s=e("../lib/create-deferred-client"),c=e("../lib/create-assets-url"),u=e("../lib/promise"),l=e("@braintree/wrap-promise");t.exports={create:l(function(t){var e="Google Pay";return r.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return s.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:c.create(t.authorization),name:e})}).then(function(e){return t.client=e,t.client.getConfiguration().gatewayConfiguration.androidPay?new a(t)._initialize():u.reject(new o(i.GOOGLE_PAYMENT_NOT_ENABLED))})}),VERSION:"3.50.0"}},{"../lib/basic-component-verification":15,"../lib/braintree-error":16,"../lib/create-assets-url":19,"../lib/create-deferred-client":21,"../lib/promise":28,"./errors":8,"./google-payment":9,"@braintree/wrap-promise":6}],11:[function(e,t,n){"use strict";var a=e("./create-authorization-data"),s=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},o=a(e.authorization).attrs,i=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(i[n]=r._meta[n]);return r._meta=i,o.tokenizationKey?r.tokenizationKey=o.tokenizationKey:r.authorizationFingerprint=o.authorizationFingerprint,r}},{"./constants":17,"./create-authorization-data":20,"./json-clone":26}],12:[function(e,t,n){"use strict";var r=e("./promise"),u=e("./constants"),l=e("./add-metadata");t.exports={sendEvent:function(e,a,s){var c=Date.now();return r.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),r=e._request,o=n.gatewayConfiguration.analytics.url,i={analytics:[{kind:u.ANALYTICS_PREFIX+a,isAsync:Math.floor(t/1e3)!==Math.floor(c/1e3),timestamp:c}]};r({url:o,method:"post",data:l(n,i),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},s)})}}},{"./add-metadata":11,"./constants":17,"./promise":28}],13:[function(e,t,n){"use strict";var r=e("@braintree/asset-loader/load-script");t.exports={loadScript:r}},{"@braintree/asset-loader/load-script":2}],14:[function(e,t,n){"use strict";var r="function"==typeof Object.assign?Object.assign:o;function o(e){var t,n,r;for(t=1;t<arguments.length;t++)for(r in n=arguments[t])n.hasOwnProperty(r)&&(e[r]=n[r]);return e}t.exports={assign:r,_assign:o}},{}],15:[function(e,t,n){"use strict";var o=e("./braintree-error"),i=e("./promise"),a=e("./errors");t.exports={verify:function(e){var t,n,r;return e?(r=e.name,t=e.client,n=e.authorization,null==t&&null==n?i.reject(new o({type:a.INSTANTIATION_OPTION_REQUIRED.type,code:a.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."})):n||"3.50.0"===t.getVersion()?i.resolve():i.reject(new o({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.50.0) components must be from the same SDK version."}))):i.reject(new o({type:a.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:a.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":16,"./errors":23,"./promise":28}],16:[function(e,t,n){"use strict";var r=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((o.prototype=Object.create(Error.prototype)).constructor=o).types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":22}],17:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.50.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.50.0"}},{}],18:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":16,"./errors":23}],19:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":17}],20:[function(e,t,n){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return!function(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}(e)?(t=JSON.parse(o(e)),r.environment=t.environment,r.attrs.authorizationFingerprint=t.authorizationFingerprint,r.configUrl=t.configUrl,r.graphQL=t.graphQL):(n=function(e){var t=e.split("_"),n=t[0];return{merchantId:t.slice(2).join("_"),environment:n}}(e),r.environment=n.environment,r.attrs.tokenizationKey=e,r.configUrl=i[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"),r}},{"../lib/constants":17,"../lib/vendor/polyfill":29}],21:[function(e,t,n){(function(n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),a=e("./errors"),s="3.50.0";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(n.braintree&&n.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+s+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:a.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:a.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:a.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return n.braintree.client.VERSION!==s?o.reject(new r({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n.braintree.client.VERSION+") and "+e.name+" (version "+s+") components must be from the same SDK version."})):n.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets":13,"./braintree-error":16,"./errors":23,"./promise":28}],22:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],23:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:r.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":16}],24:[function(e,t,n){"use strict";t.exports=function(e,t,n){var r;for(r=0;r<e.length;r++)if(e[r].hasOwnProperty(t)&&e[r][t]===n)return e[r];return null}},{}],25:[function(e,t,n){"use strict";var o=e("./assign").assign;function c(e,t){var n=e.analyticsMetadata,r={gateway:"braintree","braintree:merchantId":e.gatewayConfiguration.merchantId,"braintree:apiVersion":"v1","braintree:sdkVersion":"3.50.0","braintree:metadata":JSON.stringify({source:n.source,integration:n.integration,sessionId:n.sessionId,version:"3.50.0",platform:n.platform})};return o({},r,t)}t.exports=function(e,t,n){var r,o,i,a=e.gatewayConfiguration.androidPay,s="production"===e.gatewayConfiguration.environment?"PRODUCTION":"TEST";return 2===t?(r={apiVersion:2,apiVersionMinor:0,environment:s,allowedPaymentMethods:[{type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:a.supportedNetworks.map(function(e){return e.toUpperCase()})},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:c(e,{"braintree:authorizationFingerprint":a.googleAuthorizationFingerprint})}}]},n&&(r.merchantInfo={merchantId:n}),"TOKENIZATION_KEY"===e.authorizationType&&(o=find(r.allowedPaymentMethods,"type","CARD"))&&(o.tokenizationSpecification.parameters["braintree:clientKey"]=e.authorization),a.paypalClientId&&(i={type:"PAYPAL",parameters:{purchase_context:{purchase_units:[{payee:{client_id:a.paypalClientId},recurring_payment:!0}]}},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:c(e,{"braintree:paypalClientId":a.paypalClientId})}},r.allowedPaymentMethods.push(i))):(r={environment:s,allowedPaymentMethods:["CARD","TOKENIZED_CARD"],paymentMethodTokenizationParameters:{tokenizationType:"PAYMENT_GATEWAY",parameters:c(e,{"braintree:authorizationFingerprint":a.googleAuthorizationFingerprint})},cardRequirements:{allowedCardNetworks:a.supportedNetworks.map(function(e){return e.toUpperCase()})}},"TOKENIZATION_KEY"===e.authorizationType&&(r.paymentMethodTokenizationParameters.parameters["braintree:clientKey"]=e.authorization),n&&(r.merchantId=n),t&&(r.apiVersion=t)),r}},{"./assign":14}],26:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],27:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],28:[function(n,r,e){(function(e){"use strict";var t=e.Promise||n("promise-polyfill");r.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],29:[function(e,r,t){(function(t){"use strict";var n="function"==typeof t.atob?t.atob:e;function e(e){var t,n,r,o,i,a,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(a=0;t=(63&s.indexOf(e.charAt(a++)))<<2|(o=s.indexOf(e.charAt(a++)))>>4&3,n=(15&o)<<4|(i=s.indexOf(e.charAt(a++)))>>2&15,r=(3&i)<<6|63&s.indexOf(e.charAt(a++)),c+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):""),a<e.length;);return c}r.exports={atob:function(e){return n.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});