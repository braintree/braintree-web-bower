!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).usBankAccount=e()}}(function(){return function i(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=s[t]={exports:{}};a[t][0].call(o.exports,function(e){return u(a[t][1][e]||e)},o,o.exports,i,a,s,c)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(n,r,e){(function(e){"use strict";var t=n("promise-polyfill");r.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],2:[function(e,t,n){"use strict";var a=e("./lib/promise"),s={};function r(n){var t,r,o,e,i=JSON.stringify(n);return!n.forceScriptReload&&(e=s[i])?e:(o=document.createElement("script"),t=n.dataAttributes||{},r=n.container||document.head,o.src=n.src,o.id=n.id,o.async=!0,Object.keys(t).forEach(function(e){o.setAttribute("data-"+e,t[e])}),e=new a(function(e,t){o.addEventListener("load",function(){e(o)}),o.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),o.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),r.appendChild(o)}),s[i]=e)}r.clearCache=function(){s={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){try{t.apply(null,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],4:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],5:[function(e,t,n){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],6:[function(e,t,n){"use strict";var r=e("./lib/deferred"),o=e("./lib/once"),i=e("./lib/promise-or-callback");function s(n){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o(r(e))),i(n.apply(this,t),e)}}s.wrapPrototype=function(o,e){var i,a;return i=(e=e||{}).ignoreMethods||[],a=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(o.prototype).filter(function(e){var t,n="constructor"!==e&&"function"==typeof o.prototype[e],r=-1===i.indexOf(e);return t=a||"_"!==e.charAt(0),n&&t&&r}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=s(t)}),o},t.exports=s},{"./lib/deferred":3,"./lib/once":4,"./lib/promise-or-callback":5}],7:[function(e,t,n){"use strict";var r=setTimeout;function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],d(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,i._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value)}catch(e){return void c(r.promise,e)}s(r.promise,t)}else(1===n._state?s:c)(r.promise,n._value)})):n._deferreds.push(r)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void u(t);if("function"==typeof n)return void d(function(e,t){return function(){e.apply(t,arguments)}}(n,e),t)}t._state=1,t._value=e,u(t)}catch(e){c(t,e)}}function c(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function l(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function d(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return a(this,new l(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(r,o){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(t);if(0===i.length)return r([]);var a=i.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){s(t,e)},o)}i[t]=e,0==--a&&r(i)}catch(e){o(e)}}for(var e=0;e<i.length;e++)s(e,i[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){for(var n=0,r=o.length;n<r;n++)o[n].then(e,t)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],8:[function(e,t,n){"use strict";var a=e("./create-authorization-data"),s=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},o=a(e.authorization).attrs,i=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(i[n]=r._meta[n]);return r._meta=i,o.tokenizationKey?r.tokenizationKey=o.tokenizationKey:r.authorizationFingerprint=o.authorizationFingerprint,r}},{"./constants":14,"./create-authorization-data":17,"./json-clone":21}],9:[function(e,t,n){"use strict";var r=e("./promise"),u=e("./constants"),l=e("./add-metadata");function d(e){return Math.floor(e/1e3)}t.exports={sendEvent:function(e,a,s){var c=d(Date.now());return r.resolve(e).then(function(e){var t=d(Date.now()),n=e.getConfiguration(),r=e._request,o=n.gatewayConfiguration.analytics.url,i={analytics:[{kind:u.ANALYTICS_PREFIX+a,isAsync:t!==c,timestamp:c}]};r({url:o,method:"post",data:l(n,i),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},s)})}}},{"./add-metadata":8,"./constants":14,"./promise":24}],10:[function(e,t,n){"use strict";var r=e("@braintree/asset-loader/load-script");t.exports={loadScript:r}},{"@braintree/asset-loader/load-script":2}],11:[function(e,t,n){"use strict";var o=e("./braintree-error"),i=e("./promise"),a=e("./errors");t.exports={verify:function(e){var t,n,r;return e?(r=e.name,t=e.client,n=e.authorization,null==t&&null==n?i.reject(new o({type:a.INSTANTIATION_OPTION_REQUIRED.type,code:a.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."})):n||"3.46.0"===t.getVersion()?i.resolve():i.reject(new o({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.46.0) components must be from the same SDK version."}))):i.reject(new o({type:a.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:a.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":12,"./errors":20,"./promise":24}],12:[function(e,t,n){"use strict";var r=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((o.prototype=Object.create(Error.prototype)).constructor=o).types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":19}],13:[function(e,t,n){"use strict";t.exports=function(n){return Object.keys(n).reduce(function(e,t){return e[function(e){return e.replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g,"$1_$2").toLowerCase()}(t)]=n[t],e},{})}},{}],14:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.46.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.46.0"}},{}],15:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":12,"./errors":20}],16:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":14}],17:[function(e,t,n){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return!function(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}(e)?(t=JSON.parse(o(e)),r.environment=t.environment,r.attrs.authorizationFingerprint=t.authorizationFingerprint,r.configUrl=t.configUrl,r.graphQL=t.graphQL):(n=function(e){var t=e.split("_"),n=t[0];return{merchantId:t.slice(2).join("_"),environment:n}}(e),r.environment=n.environment,r.attrs.tokenizationKey=e,r.configUrl=i[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"),r}},{"../lib/constants":14,"../lib/vendor/polyfill":25}],18:[function(e,t,n){(function(n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),a=e("./errors"),s="3.46.0";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(n.braintree&&n.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+s+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:a.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:a.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:a.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return n.braintree.client.VERSION!==s?o.reject(new r({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n.braintree.client.VERSION+") and "+e.name+" (version "+s+") components must be from the same SDK version."})):n.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets":10,"./braintree-error":12,"./errors":20,"./promise":24}],19:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],20:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:r.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:r.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":12}],21:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],22:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],23:[function(e,t,n){arguments[4][4][0].apply(n,arguments)},{dup:4}],24:[function(n,r,e){(function(e){"use strict";var t=e.Promise||n("promise-polyfill");r.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],25:[function(e,r,t){(function(t){"use strict";var n="function"==typeof t.atob?t.atob:e;function e(e){var t,n,r,o,i,a,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(a=0;t=(63&s.indexOf(e.charAt(a++)))<<2|(o=s.indexOf(e.charAt(a++)))>>4&3,n=(15&o)<<4|(i=s.indexOf(e.charAt(a++)))>>2&15,r=(3&i)<<6|63&s.indexOf(e.charAt(a++)),c+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):""),a<e.length;);return c}r.exports={atob:function(e){return n.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],26:[function(e,t,n){"use strict";t.exports={PLAID_LINK_JS:"https://cdn.plaid.com/link/v2/stable/link-initialize.js"}},{}],27:[function(e,t,n){"use strict";var r=e("../lib/braintree-error");t.exports={US_BANK_ACCOUNT_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_OPTION_REQUIRED"},US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS"},US_BANK_ACCOUNT_LOGIN_LOAD_FAILED:{type:r.types.NETWORK,code:"US_BANK_ACCOUNT_LOGIN_LOAD_FAILED",message:"Bank login flow failed to load."},US_BANK_ACCOUNT_LOGIN_CLOSED:{type:r.types.CUSTOMER,code:"US_BANK_ACCOUNT_LOGIN_CLOSED",message:"Customer closed bank login flow before authorizing."},US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE",message:"Another bank login tokenization request is active."},US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR:{type:r.types.NETWORK,code:"US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR",message:"A tokenization network error occurred."},US_BANK_ACCOUNT_FAILED_TOKENIZATION:{type:r.types.CUSTOMER,code:"US_BANK_ACCOUNT_FAILED_TOKENIZATION",message:"The supplied data failed tokenization."},US_BANK_ACCOUNT_NOT_ENABLED:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_NOT_ENABLED",message:"US bank account is not enabled."},US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED",message:"Bank login is not enabled."}}},{"../lib/braintree-error":12}],28:[function(e,t,n){"use strict";var r=e("../lib/basic-component-verification"),o=e("../lib/braintree-error"),i=e("../lib/create-deferred-client"),a=e("../lib/create-assets-url"),s=e("./errors"),c=e("./us-bank-account"),u=e("../lib/errors"),l=e("../lib/promise"),d=e("@braintree/wrap-promise");t.exports={create:d(function(n){var e="US Bank Account";return r.verify({name:e,client:n.client,authorization:n.authorization}).then(function(){return i.create({authorization:n.authorization,client:n.client,debug:n.debug,assetsUrl:a.create(n.authorization),name:e})}).then(function(e){var t=e.getConfiguration().gatewayConfiguration.braintreeApi;return n.client=e,t?n.client.getConfiguration().gatewayConfiguration.usBankAccount?new c(n):l.reject(new o(s.US_BANK_ACCOUNT_NOT_ENABLED)):l.reject(new o(u.BRAINTREE_API_ACCESS_RESTRICTED))})}),VERSION:"3.46.0"}},{"../lib/basic-component-verification":11,"../lib/braintree-error":12,"../lib/create-assets-url":16,"../lib/create-deferred-client":18,"../lib/errors":20,"../lib/promise":24,"./errors":27,"./us-bank-account":29,"@braintree/wrap-promise":6}],29:[function(E,A,e){(function(i){"use strict";var u=E("../lib/braintree-error"),r=E("./constants"),l=E("./errors"),o=E("../lib/errors"),d=E("../lib/analytics"),a=E("../lib/once"),e=E("../lib/convert-methods-to-error"),t=E("../lib/methods"),f=E("../lib/camel-case-to-snake-case"),p=E("../lib/promise"),n=E("@braintree/wrap-promise");function s(e){this._client=e.client,this._isTokenizingBankLogin=!1,d.sendEvent(this._client,"usbankaccount.initialized")}function _(e){var t,n=e.details&&e.details.httpStatus;return(t=new u(401===n?o.BRAINTREE_API_ACCESS_RESTRICTED:n<500?l.US_BANK_ACCOUNT_FAILED_TOKENIZATION:l.US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR)).details={originalError:e},t}function N(e){return{nonce:e.data.id,details:{},description:e.data.description,type:e.data.type}}function c(t,n){function r(){var e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(t.removeEventListener("error",o),t.removeEventListener("load",r),t.removeEventListener("readystatechange",r),n(null,i.Plaid))}function o(){t.parentNode.removeChild(t),n(new u(l.US_BANK_ACCOUNT_LOGIN_LOAD_FAILED))}t.addEventListener("error",o),t.addEventListener("load",r),t.addEventListener("readystatechange",r)}s.prototype.tokenize=function(e){return(e=e||{}).mandateText?e.bankDetails&&e.bankLogin?p.reject(new u({type:l.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.type,code:l.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.code,message:"tokenize must be called with bankDetails or bankLogin, not both."})):e.bankDetails?this._tokenizeBankDetails(e):e.bankLogin?this._tokenizeBankLogin(e):p.reject(new u({type:l.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:l.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"tokenize must be called with bankDetails or bankLogin."})):p.reject(new u({type:l.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:l.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"mandateText property is required."}))},s.prototype._tokenizeBankDetails=function(e){var n=this._client,t=e.bankDetails;return n.request({method:"POST",endpoint:"tokens",api:"braintreeApi",data:f({type:"us_bank_account",routingNumber:t.routingNumber,accountNumber:t.accountNumber,firstName:t.firstName,lastName:t.lastName,businessName:t.businessName,accountType:t.accountType,ownershipType:t.ownershipType,billingAddress:f(t.billingAddress||{}),achMandate:{text:e.mandateText}})}).then(function(e){return d.sendEvent(n,"usbankaccount.bankdetails.tokenization.succeeded"),p.resolve(N(e))}).catch(function(e){var t=_(e);return d.sendEvent(n,"usbankaccount.bankdetails.tokenization.failed"),p.reject(t)})},s.prototype._tokenizeBankLogin=function(o){var i=this,a=this._client,e=a.getConfiguration().gatewayConfiguration,s="production"===e.environment,c=e.usBankAccount.plaid;return o.bankLogin.displayName?c?this._isTokenizingBankLogin?p.reject(new u(l.US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE)):(this._isTokenizingBankLogin=!0,new p(function(n,r){i._loadPlaid(function(e,t){e?r(e):(t.create({clientName:o.bankLogin.displayName,apiVersion:"v2",env:s?"production":"sandbox",key:c.publicKey,product:"auth",selectAccount:!0,onExit:function(){i._isTokenizingBankLogin=!1,d.sendEvent(a,"usbankaccount.banklogin.tokenization.closed.by-user"),r(new u(l.US_BANK_ACCOUNT_LOGIN_CLOSED))},onSuccess:function(e,t){a.request({method:"POST",endpoint:"tokens",api:"braintreeApi",data:f({type:"plaid_public_token",publicToken:e,accountId:s?t.account_id:"plaid_account_id",achMandate:{text:o.mandateText},ownershipType:o.bankLogin.ownershipType,firstName:o.bankLogin.firstName,lastName:o.bankLogin.lastName,businessName:o.bankLogin.businessName,billingAddress:f(o.bankLogin.billingAddress||{})})}).then(function(e){i._isTokenizingBankLogin=!1,d.sendEvent(a,"usbankaccount.banklogin.tokenization.succeeded"),n(N(e))}).catch(function(e){var t;i._isTokenizingBankLogin=!1,t=_(e),d.sendEvent(a,"usbankaccount.banklogin.tokenization.failed"),r(t)})}}).open(),d.sendEvent(a,"usbankaccount.banklogin.tokenization.started"))})})):p.reject(new u(l.US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED)):p.reject(new u({type:l.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:l.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"displayName property is required when using bankLogin."}))},s.prototype._loadPlaid=function(e){var t,n;e=a(e),i.Plaid?e(null,i.Plaid):(t=document.querySelector('script[src="'+r.PLAID_LINK_JS+'"]'))?c(t,e):((n=document.createElement("script")).src=r.PLAID_LINK_JS,n.async=!0,c(n,e),document.body.appendChild(n),this._plaidScript=n)},s.prototype.teardown=function(){return this._plaidScript&&document.body.removeChild(this._plaidScript),e(this,t(s.prototype)),p.resolve()},A.exports=n.wrapPrototype(s)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/analytics":9,"../lib/braintree-error":12,"../lib/camel-case-to-snake-case":13,"../lib/convert-methods-to-error":15,"../lib/errors":20,"../lib/methods":22,"../lib/once":23,"../lib/promise":24,"./constants":26,"./errors":27,"@braintree/wrap-promise":6}]},{},[28])(28)});