!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).paypalCheckout=e()}}(function(){return function i(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(p)return p(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=s[t]={exports:{}};a[t][0].call(o.exports,function(e){return u(a[t][1][e]||e)},o,o.exports,i,a,s,c)}return s[t].exports}for(var p="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(n,r,e){(function(e){"use strict";var t=n("promise-polyfill");r.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],2:[function(e,t,n){"use strict";var a=e("./lib/promise"),s={};function r(n){var t,r,o,e,i=JSON.stringify(n);return!n.forceScriptReload&&(e=s[i])?e:(o=document.createElement("script"),t=n.dataAttributes||{},r=n.container||document.head,o.src=n.src,o.id=n.id,o.async=!0,Object.keys(t).forEach(function(e){o.setAttribute("data-"+e,t[e])}),e=new a(function(e,t){o.addEventListener("load",function(){e(o)}),o.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),o.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),r.appendChild(o)}),s[i]=e)}r.clearCache=function(){s={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}},{}],4:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],5:[function(e,t,n){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],6:[function(e,t,n){"use strict";var r=e("./lib/deferred"),o=e("./lib/once"),i=e("./lib/promise-or-callback");function s(n){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o(r(e))),i(n.apply(this,t),e)}}s.wrapPrototype=function(o,e){var i,a;return i=(e=e||{}).ignoreMethods||[],a=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(o.prototype).filter(function(e){var t,n="constructor"!==e&&"function"==typeof o.prototype[e],r=-1===i.indexOf(e);return t=!!a||"_"!==e.charAt(0),n&&t&&r}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=s(t)}),o},t.exports=s},{"./lib/deferred":3,"./lib/once":4,"./lib/promise-or-callback":5}],7:[function(e,t,n){"use strict";var r=setTimeout;function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,i._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value)}catch(e){return void c(r.promise,e)}s(r.promise,t)}else(1===n._state?s:c)(r.promise,n._value)})):n._deferreds.push(r)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void u(t);if("function"==typeof n)return void l((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,u(t)}catch(e){c(t,e)}var r,o}function c(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function p(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return a(this,new p(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(r,o){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(t);if(0===i.length)return r([]);var a=i.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){s(t,e)},o)}i[t]=e,0==--a&&r(i)}catch(e){o(e)}}for(var e=0;e<i.length;e++)s(e,i[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){for(var n=0,r=o.length;n<r;n++)o[n].then(e,t)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],8:[function(e,t,n){"use strict";var a=e("./create-authorization-data"),s=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},o=a(e.authorization).attrs,i=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(i[n]=r._meta[n]);return r._meta=i,o.tokenizationKey?r.tokenizationKey=o.tokenizationKey:r.authorizationFingerprint=o.authorizationFingerprint,r}},{"./constants":13,"./create-authorization-data":17,"./json-clone":21}],9:[function(e,t,n){"use strict";var r=e("./promise"),u=e("./constants"),p=e("./add-metadata");function l(e){return Math.floor(e/1e3)}t.exports={sendEvent:function(e,a,s){var c=l(Date.now());return r.resolve(e).then(function(e){var t=l(Date.now()),n=e.getConfiguration(),r=e._request,o=n.gatewayConfiguration.analytics.url,i={analytics:[{kind:u.ANALYTICS_PREFIX+a,isAsync:t!==c,timestamp:c}]};r({url:o,method:"post",data:p(n,i),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},s)})}}},{"./add-metadata":8,"./constants":13,"./promise":23}],10:[function(e,t,n){"use strict";var r=e("@braintree/asset-loader/load-script");t.exports={loadScript:r}},{"@braintree/asset-loader/load-script":2}],11:[function(e,t,n){"use strict";var o=e("./braintree-error"),i=e("./promise"),a=e("./errors");t.exports={verify:function(e){var t,n,r;return e?(r=e.name,t=e.client,n=e.authorization,null==t&&null==n?i.reject(new o({type:a.INSTANTIATION_OPTION_REQUIRED.type,code:a.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."})):n||"3.44.1"===t.getVersion()?i.resolve():i.reject(new o({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.44.1) components must be from the same SDK version."}))):i.reject(new o({type:a.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:a.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":12,"./errors":20,"./promise":23}],12:[function(e,t,n){"use strict";var r=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((o.prototype=Object.create(Error.prototype)).constructor=o).types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":19}],13:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.44.1",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.44.1"}},{}],14:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":12,"./errors":20}],15:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports=function(e,t){return e instanceof r?e:new r({type:t.type,code:t.code,message:t.message,details:{originalError:e}})}},{"./braintree-error":12}],16:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":13}],17:[function(e,t,n){"use strict";var a=e("../lib/vendor/polyfill").atob,s=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r,o,i={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(r=e.split("_"),o=r[0],n={merchantId:r.slice(2).join("_"),environment:o},i.environment=n.environment,i.attrs.tokenizationKey=e,i.configUrl=s[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(a(e)),i.environment=t.environment,i.attrs.authorizationFingerprint=t.authorizationFingerprint,i.configUrl=t.configUrl,i.graphQL=t.graphQL),i}},{"../lib/constants":13,"../lib/vendor/polyfill":24}],18:[function(e,t,n){(function(n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),a=e("./errors"),s="3.44.1";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(n.braintree&&n.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+s+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:a.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:a.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:a.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return n.braintree.client.VERSION!==s?o.reject(new r({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n.braintree.client.VERSION+") and "+e.name+" (version "+s+") components must be from the same SDK version."})):n.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets":10,"./braintree-error":12,"./errors":20,"./promise":23}],19:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],20:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:r.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:r.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":12}],21:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],22:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],23:[function(n,r,e){(function(e){"use strict";var t=e.Promise||n("promise-polyfill");r.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],24:[function(e,r,t){(function(t){"use strict";var n="function"==typeof t.atob?t.atob:e;function e(e){var t,n,r,o,i,a,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(a=0;t=(63&s.indexOf(e.charAt(a++)))<<2|(o=s.indexOf(e.charAt(a++)))>>4&3,n=(15&o)<<4|(i=s.indexOf(e.charAt(a++)))>>2&15,r=(3&i)<<6|63&s.indexOf(e.charAt(a++)),c+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):""),a<e.length;);return c}r.exports={atob:function(e){return n.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],25:[function(e,t,n){"use strict";var r=e("../lib/braintree-error");t.exports={PAYPAL_NOT_ENABLED:{type:r.types.MERCHANT,code:"PAYPAL_NOT_ENABLED",message:"PayPal is not enabled for this merchant."},PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED:{type:r.types.MERCHANT,code:"PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED",message:"A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing for details on linking your PayPal sandbox with Braintree."},PAYPAL_ACCOUNT_TOKENIZATION_FAILED:{type:r.types.NETWORK,code:"PAYPAL_ACCOUNT_TOKENIZATION_FAILED",message:"Could not tokenize user's PayPal account."},PAYPAL_FLOW_FAILED:{type:r.types.NETWORK,code:"PAYPAL_FLOW_FAILED",message:"Could not initialize PayPal flow."},PAYPAL_FLOW_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"PAYPAL_FLOW_OPTION_REQUIRED",message:"PayPal flow property is invalid or missing."},PAYPAL_INVALID_PAYMENT_OPTION:{type:r.types.MERCHANT,code:"PAYPAL_INVALID_PAYMENT_OPTION",message:"PayPal payment options are invalid."}}},{"../lib/braintree-error":12}],26:[function(e,t,n){"use strict";var r=e("../lib/basic-component-verification"),o=e("@braintree/wrap-promise"),i=e("./paypal-checkout");t.exports={create:o(function(e){return r.verify({name:"PayPal Checkout",client:e.client,authorization:e.authorization}).then(function(){return new i(e)._initialize(e)})}),isSupported:function(){return!0},VERSION:"3.44.1"}},{"../lib/basic-component-verification":11,"./paypal-checkout":27,"@braintree/wrap-promise":6}],27:[function(e,t,n){"use strict";var i=e("../lib/analytics"),r=e("../lib/create-deferred-client"),o=e("../lib/create-assets-url"),a=e("../lib/promise"),s=e("@braintree/wrap-promise"),c=e("../lib/braintree-error"),u=e("../lib/convert-to-braintree-error"),p=e("./errors"),l=e("../paypal/shared/constants"),f=e("../lib/methods"),d=e("../lib/convert-methods-to-error");function _(e){this._merchantAccountId=e.merchantAccountId}_.prototype._initialize=function(e){return this._clientPromise=r.create({authorization:e.authorization,client:e.client,debug:e.debug,assetsUrl:o.create(e.authorization),name:"PayPal Checkout"}).then(function(e){return this._configuration=e.getConfiguration(),this._merchantAccountId||(this._configuration.gatewayConfiguration.paypalEnabled?!0===this._configuration.gatewayConfiguration.paypal.environmentNoNetwork&&(this._setupError=new c(p.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED)):this._setupError=new c(p.PAYPAL_NOT_ENABLED)),this._setupError?a.reject(this._setupError):(i.sendEvent(e,"paypal-checkout.initialized"),e)}.bind(this)),e.client?this._clientPromise.then(function(){return this}.bind(this)):a.resolve(this)},_.prototype.createPayment=function(t){var n,r=this;return t&&l.FLOW_ENDPOINTS.hasOwnProperty(t.flow)?(n="paypal_hermes/"+l.FLOW_ENDPOINTS[t.flow],i.sendEvent(this._clientPromise,"paypal-checkout.createPayment"),!0===t.offerCredit&&i.sendEvent(this._clientPromise,"paypal-checkout.credit.offered"),this._clientPromise.then(function(e){return e.request({endpoint:n,method:"post",data:r._formatPaymentResourceData(t)})}).then(function(e){return"checkout"===t.flow?e.paymentResource.redirectUrl.match(/EC-\w+/)[0]:e.agreementSetup.tokenId}).catch(function(e){return r._setupError?a.reject(r._setupError):422===(e.details&&e.details.httpStatus)?a.reject(new c({type:p.PAYPAL_INVALID_PAYMENT_OPTION.type,code:p.PAYPAL_INVALID_PAYMENT_OPTION.code,message:p.PAYPAL_INVALID_PAYMENT_OPTION.message,details:{originalError:e}})):a.reject(u(e,{type:p.PAYPAL_FLOW_FAILED.type,code:p.PAYPAL_FLOW_FAILED.code,message:p.PAYPAL_FLOW_FAILED.message}))})):a.reject(new c(p.PAYPAL_FLOW_OPTION_REQUIRED))},_.prototype.tokenizePayment=function(e){var t,n=this,r={flow:e.billingToken?"vault":"checkout",intent:e.intent},o={ecToken:e.paymentToken,billingToken:e.billingToken,payerId:e.payerID,paymentId:e.paymentID};return i.sendEvent(this._clientPromise,"paypal-checkout.tokenization.started"),this._clientPromise.then(function(e){return e.request({endpoint:"payment_methods/paypal_accounts",method:"post",data:n._formatTokenizeData(r,o)})}).then(function(e){return t=n._formatTokenizePayload(e),i.sendEvent(n._clientPromise,"paypal-checkout.tokenization.success"),t.creditFinancingOffered&&i.sendEvent(n._clientPromise,"paypal-checkout.credit.accepted"),t}).catch(function(e){return n._setupError?a.reject(n._setupError):(i.sendEvent(n._clientPromise,"paypal-checkout.tokenization.failed"),a.reject(u(e,{type:p.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,code:p.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,message:p.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message})))})},_.prototype._formatPaymentResourceData=function(e){var t,n=this._configuration.gatewayConfiguration,r=e.intent,o={returnUrl:"https://www.paypal.com/checkoutnow/error",cancelUrl:"https://www.paypal.com/checkoutnow/error",offerPaypalCredit:!0===e.offerCredit,merchantAccountId:this._merchantAccountId,experienceProfile:{brandName:e.displayName||n.paypal.displayName,localeCode:e.locale,noShipping:(!e.enableShippingAddress).toString(),addressOverride:!1===e.shippingAddressEditable,landingPageType:e.landingPageType}};if("checkout"===e.flow)for(t in o.amount=e.amount,o.currencyIsoCode=e.currency,r&&("capture"===r&&(r="sale"),o.intent=r),e.hasOwnProperty("lineItems")&&(o.lineItems=e.lineItems),e.shippingAddressOverride)e.shippingAddressOverride.hasOwnProperty(t)&&(o[t]=e.shippingAddressOverride[t]);else o.shippingAddress=e.shippingAddressOverride,e.billingAgreementDescription&&(o.description=e.billingAgreementDescription);return o},_.prototype._formatTokenizeData=function(e,t){var n=this._configuration,r=n.gatewayConfiguration,o="TOKENIZATION_KEY"===n.authorizationType,i={paypalAccount:{correlationId:t.billingToken||t.ecToken,options:{validate:"vault"===e.flow&&!o}}};return t.billingToken?i.paypalAccount.billingAgreementToken=t.billingToken:(i.paypalAccount.paymentToken=t.paymentId,i.paypalAccount.payerId=t.payerId,i.paypalAccount.unilateral=r.paypal.unvettedMerchant,e.intent&&(i.paypalAccount.intent=e.intent),this._merchantAccountId&&(i.merchantAccountId=this._merchantAccountId)),i},_.prototype._formatTokenizePayload=function(e){var t,n={};return e.paypalAccounts&&(n=e.paypalAccounts[0]),t={nonce:n.nonce,details:{},type:n.type},n.details&&n.details.payerInfo&&(t.details=n.details.payerInfo),n.details&&n.details.creditFinancingOffered&&(t.creditFinancingOffered=n.details.creditFinancingOffered),t},_.prototype.teardown=function(){return d(this,f(_.prototype)),a.resolve()},t.exports=s.wrapPrototype(_)},{"../lib/analytics":9,"../lib/braintree-error":12,"../lib/convert-methods-to-error":14,"../lib/convert-to-braintree-error":15,"../lib/create-assets-url":16,"../lib/create-deferred-client":18,"../lib/methods":22,"../lib/promise":23,"../paypal/shared/constants":28,"./errors":25,"@braintree/wrap-promise":6}],28:[function(e,t,n){"use strict";t.exports={LANDING_FRAME_NAME:"braintreepaypallanding",FLOW_ENDPOINTS:{checkout:"create_payment_resource",vault:"setup_billing_agreement"}}},{}]},{},[26])(26)});