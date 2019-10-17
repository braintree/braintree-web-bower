!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).usBankAccount=e()}}(function(){return function i(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=s[t]={exports:{}};a[t][0].call(o.exports,function(e){return u(a[t][1][e]||e)},o,o.exports,i,a,s,c)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(n,r,e){(function(e){"use strict";var t=n("promise-polyfill");r.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],2:[function(e,t,n){"use strict";var a=e("./lib/promise"),s={};function r(n){var t,r,o,e,i=JSON.stringify(n);return!n.forceScriptReload&&(e=s[i])?e:(o=document.createElement("script"),t=n.dataAttributes||{},r=n.container||document.head,o.src=n.src,o.id=n.id,o.async=!0,n.crossorigin&&o.setAttribute("crossorigin",n.crossorigin),Object.keys(t).forEach(function(e){o.setAttribute("data-"+e,t[e])}),e=new a(function(e,t){o.addEventListener("load",function(){e(o)}),o.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),o.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),r.appendChild(o)}),s[i]=e)}r.clearCache=function(){s={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){try{t.apply(null,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],4:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],5:[function(e,t,n){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],6:[function(e,t,n){"use strict";var r=e("./lib/deferred"),o=e("./lib/once"),i=e("./lib/promise-or-callback");function s(n){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o(r(e))),i(n.apply(this,t),e)}}s.wrapPrototype=function(o,e){var i,a;return i=(e=e||{}).ignoreMethods||[],a=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(o.prototype).filter(function(e){var t,n="constructor"!==e&&"function"==typeof o.prototype[e],r=-1===i.indexOf(e);return t=a||"_"!==e.charAt(0),n&&t&&r}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=s(t)}),o},t.exports=s},{"./lib/deferred":3,"./lib/once":4,"./lib/promise-or-callback":5}],7:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,i._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value)}catch(e){return void u(r.promise,e)}s(r.promise,t)}else(1===n._state?s:u)(r.promise,n._value)})):n._deferreds.push(r)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void p(function(e,t){return function(){e.apply(t,arguments)}}(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){u(t,e)}}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function p(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){if(n)return;n=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return a(this,new d(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(r,o){if(!c(t))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(t);if(0===i.length)return r([]);var a=i.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){s(t,e)},o)}i[t]=e,0==--a&&r(i)}catch(e){o(e)}}for(var e=0;e<i.length;e++)s(e,i[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=o.length;n<r;n++)i.resolve(o[n]).then(e,t)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],8:[function(e,t,n){"use strict";var a=e("./create-authorization-data"),s=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},o=a(e.authorization).attrs,i=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(i[n]=r._meta[n]);return r._meta=i,o.tokenizationKey?r.tokenizationKey=o.tokenizationKey:r.authorizationFingerprint=o.authorizationFingerprint,r}},{"./constants":13,"./create-authorization-data":16,"./json-clone":20}],9:[function(e,t,n){"use strict";var r=e("./promise"),u=e("./constants"),l=e("./add-metadata");t.exports={sendEvent:function(e,a,s){var c=Date.now();return r.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),r=e._request,o=n.gatewayConfiguration.analytics.url,i={analytics:[{kind:u.ANALYTICS_PREFIX+a,isAsync:Math.floor(t/1e3)!==Math.floor(c/1e3),timestamp:c}]};r({url:o,method:"post",data:l(n,i),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},s)})}}},{"./add-metadata":8,"./constants":13,"./promise":23}],10:[function(e,t,n){"use strict";var r=e("@braintree/asset-loader/load-script");t.exports={loadScript:r}},{"@braintree/asset-loader/load-script":2}],11:[function(e,t,n){"use strict";var o=e("./braintree-error"),i=e("./promise"),a=e("./errors");t.exports={verify:function(e){var t,n,r;return e?(r=e.name,t=e.client,n=e.authorization,null==t&&null==n?i.reject(new o({type:a.INSTANTIATION_OPTION_REQUIRED.type,code:a.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."})):n||"3.54.2"===t.getVersion()?i.resolve():i.reject(new o({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.54.2) components must be from the same SDK version."}))):i.reject(new o({type:a.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:a.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":12,"./errors":19,"./promise":23}],12:[function(e,t,n){"use strict";var r=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((o.prototype=Object.create(Error.prototype)).constructor=o).types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":18}],13:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.54.2",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.54.2"}},{}],14:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":12,"./errors":19}],15:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":13}],16:[function(e,t,n){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return!function(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}(e)?(t=JSON.parse(o(e)),r.environment=t.environment,r.attrs.authorizationFingerprint=t.authorizationFingerprint,r.configUrl=t.configUrl,r.graphQL=t.graphQL):(n=function(e){var t=e.split("_"),n=t[0];return{merchantId:t.slice(2).join("_"),environment:n}}(e),r.environment=n.environment,r.attrs.tokenizationKey=e,r.configUrl=i[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"),r}},{"../lib/constants":13,"../lib/vendor/polyfill":24}],17:[function(e,t,n){(function(n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),a=e("./errors"),s="3.54.2";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(n.braintree&&n.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+s+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:a.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:a.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:a.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return n.braintree.client.VERSION!==s?o.reject(new r({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n.braintree.client.VERSION+") and "+e.name+" (version "+s+") components must be from the same SDK version."})):n.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets":10,"./braintree-error":12,"./errors":19,"./promise":23}],18:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],19:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:r.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":12}],20:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],21:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],22:[function(e,t,n){arguments[4][4][0].apply(n,arguments)},{dup:4}],23:[function(n,r,e){(function(e){"use strict";var t=e.Promise||n("promise-polyfill");r.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":7}],24:[function(e,r,t){(function(t){"use strict";var n="function"==typeof t.atob?t.atob:e;function e(e){var t,n,r,o,i,a,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(a=0;t=(63&s.indexOf(e.charAt(a++)))<<2|(o=s.indexOf(e.charAt(a++)))>>4&3,n=(15&o)<<4|(i=s.indexOf(e.charAt(a++)))>>2&15,r=(3&i)<<6|63&s.indexOf(e.charAt(a++)),c+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):""),a<e.length;);return c}r.exports={atob:function(e){return n.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],25:[function(e,t,n){"use strict";t.exports={PLAID_LINK_JS:"https://cdn.plaid.com/link/v2/stable/link-initialize.js"}},{}],26:[function(e,t,n){"use strict";var r=e("../lib/braintree-error");t.exports={US_BANK_ACCOUNT_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_OPTION_REQUIRED"},US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS"},US_BANK_ACCOUNT_LOGIN_LOAD_FAILED:{type:r.types.NETWORK,code:"US_BANK_ACCOUNT_LOGIN_LOAD_FAILED",message:"Bank login flow failed to load."},US_BANK_ACCOUNT_LOGIN_CLOSED:{type:r.types.CUSTOMER,code:"US_BANK_ACCOUNT_LOGIN_CLOSED",message:"Customer closed bank login flow before authorizing."},US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE",message:"Another bank login tokenization request is active."},US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR:{type:r.types.NETWORK,code:"US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR",message:"A tokenization network error occurred."},US_BANK_ACCOUNT_FAILED_TOKENIZATION:{type:r.types.CUSTOMER,code:"US_BANK_ACCOUNT_FAILED_TOKENIZATION",message:"The supplied data failed tokenization."},US_BANK_ACCOUNT_NOT_ENABLED:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_NOT_ENABLED",message:"US bank account is not enabled."},US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED:{type:r.types.MERCHANT,code:"US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED",message:"Bank login is not enabled."}}},{"../lib/braintree-error":12}],27:[function(e,t,n){"use strict";var r=e("../lib/basic-component-verification"),o=e("../lib/braintree-error"),i=e("../lib/create-deferred-client"),a=e("../lib/create-assets-url"),s=e("./errors"),c=e("./us-bank-account"),u=e("../lib/promise"),l=e("@braintree/wrap-promise");t.exports={create:l(function(t){var e="US Bank Account";return r.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return i.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:a.create(t.authorization),name:e})}).then(function(e){return t.client=e,t.client.getConfiguration().gatewayConfiguration.usBankAccount?new c(t):u.reject(new o(s.US_BANK_ACCOUNT_NOT_ENABLED))})}),VERSION:"3.54.2"}},{"../lib/basic-component-verification":11,"../lib/braintree-error":12,"../lib/create-assets-url":15,"../lib/create-deferred-client":17,"../lib/promise":23,"./errors":26,"./us-bank-account":28,"@braintree/wrap-promise":6}],28:[function(b,O,e){(function(i){"use strict";var l=b("../lib/braintree-error"),r=b("./constants"),d=b("./errors"),o=b("../lib/errors"),p=b("../lib/analytics"),a=b("../lib/once"),e=b("../lib/convert-methods-to-error"),t=b("../lib/methods"),f=b("../lib/promise"),n=b("@braintree/wrap-promise"),s=y("UsBankAccount"),_=y("UsBankLogin");function c(e){this._client=e.client,this._isTokenizingBankLogin=!1,p.sendEvent(this._client,"usbankaccount.initialized")}function N(e){var t,n=e.details&&e.details.httpStatus;return(t=new l(401===n?o.BRAINTREE_API_ACCESS_RESTRICTED:n<500?d.US_BANK_ACCOUNT_FAILED_TOKENIZATION:d.US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR)).details={originalError:e},t}function E(e,t){var n=e.data[t].paymentMethod,r="US bank account ending in - "+n.details.last4;return{nonce:n.id,details:{},description:r,type:"us_bank_account"}}function u(t,n){function r(){var e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(t.removeEventListener("error",o),t.removeEventListener("load",r),t.removeEventListener("readystatechange",r),n(null,i.Plaid))}function o(){t.parentNode.removeChild(t),n(new l(d.US_BANK_ACCOUNT_LOGIN_LOAD_FAILED))}t.addEventListener("error",o),t.addEventListener("load",r),t.addEventListener("readystatechange",r)}function A(e){return{streetAddress:e.streetAddress,extendedAddress:e.extendedAddress,city:e.locality,state:e.region,zipCode:e.postalCode}}function T(e,t){"personal"===t.ownershipType?e.individualOwner={firstName:t.firstName,lastName:t.lastName}:"business"===t.ownershipType&&(e.businessOwner={businessName:t.businessName})}function y(e){return"mutation Tokenize"+e+"($input: Tokenize"+e+"Input!) {  tokenize"+e+"(input: $input) {    paymentMethod {      id      details {        ... on UsBankAccountDetails {          last4        }      }    }  }}"}c.prototype.tokenize=function(e){return(e=e||{}).mandateText?e.bankDetails&&e.bankLogin?f.reject(new l({type:d.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.type,code:d.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.code,message:"tokenize must be called with bankDetails or bankLogin, not both."})):e.bankDetails?this._tokenizeBankDetails(e):e.bankLogin?this._tokenizeBankLogin(e):f.reject(new l({type:d.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:d.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"tokenize must be called with bankDetails or bankLogin."})):f.reject(new l({type:d.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:d.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"mandateText property is required."}))},c.prototype._tokenizeBankDetails=function(e){var n=this._client,t=e.bankDetails,r={achMandate:e.mandateText,routingNumber:t.routingNumber,accountNumber:t.accountNumber,accountType:t.accountType.toUpperCase(),billingAddress:A(t.billingAddress||{})};return T(r,t),n.request({api:"graphQLApi",data:{query:s,variables:{input:{usBankAccount:r}}}}).then(function(e){return p.sendEvent(n,"usbankaccount.bankdetails.tokenization.succeeded"),f.resolve(E(e,"tokenizeUsBankAccount"))}).catch(function(e){var t=N(e);return p.sendEvent(n,"usbankaccount.bankdetails.tokenization.failed"),f.reject(t)})},c.prototype._tokenizeBankLogin=function(a){var s=this,c=this._client,e=c.getConfiguration().gatewayConfiguration,u="production"===e.environment,n=e.usBankAccount.plaid;return a.bankLogin.displayName?n?this._isTokenizingBankLogin?f.reject(new l(d.US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE)):(this._isTokenizingBankLogin=!0,new f(function(o,i){s._loadPlaid(function(e,t){e?i(e):(t.create({clientName:a.bankLogin.displayName,apiVersion:"v2",env:u?"production":"sandbox",key:n.publicKey,product:"auth",selectAccount:!0,onExit:function(){s._isTokenizingBankLogin=!1,p.sendEvent(c,"usbankaccount.banklogin.tokenization.closed.by-user"),i(new l(d.US_BANK_ACCOUNT_LOGIN_CLOSED))},onSuccess:function(e,t){var n=a.bankLogin,r={publicToken:e,accountId:u?t.account_id:"plaid_account_id",accountType:t.account.subtype.toUpperCase(),achMandate:a.mandateText,billingAddress:A(n.billingAddress||{})};T(r,n),c.request({api:"graphQLApi",data:{query:_,variables:{input:{usBankLogin:r}}}}).then(function(e){s._isTokenizingBankLogin=!1,p.sendEvent(c,"usbankaccount.banklogin.tokenization.succeeded"),o(E(e,"tokenizeUsBankLogin"))}).catch(function(e){var t;s._isTokenizingBankLogin=!1,t=N(e),p.sendEvent(c,"usbankaccount.banklogin.tokenization.failed"),i(t)})}}).open(),p.sendEvent(c,"usbankaccount.banklogin.tokenization.started"))})})):f.reject(new l(d.US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED)):f.reject(new l({type:d.US_BANK_ACCOUNT_OPTION_REQUIRED.type,code:d.US_BANK_ACCOUNT_OPTION_REQUIRED.code,message:"displayName property is required when using bankLogin."}))},c.prototype._loadPlaid=function(e){var t,n;e=a(e),i.Plaid?e(null,i.Plaid):(t=document.querySelector('script[src="'+r.PLAID_LINK_JS+'"]'))?u(t,e):((n=document.createElement("script")).src=r.PLAID_LINK_JS,n.async=!0,u(n,e),document.body.appendChild(n),this._plaidScript=n)},c.prototype.teardown=function(){return this._plaidScript&&document.body.removeChild(this._plaidScript),e(this,t(c.prototype)),f.resolve()},O.exports=n.wrapPrototype(c)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/analytics":9,"../lib/braintree-error":12,"../lib/convert-methods-to-error":14,"../lib/errors":19,"../lib/methods":21,"../lib/once":22,"../lib/promise":23,"./constants":25,"./errors":26,"@braintree/wrap-promise":6}]},{},[27])(27)});