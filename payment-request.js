!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).paymentRequest=e()}}(function(){return function i(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(p)return p(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=s[t]={exports:{}};a[t][0].call(o.exports,function(e){return u(a[t][1][e]||e)},o,o.exports,i,a,s,c)}return s[t].exports}for(var p="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(n,r,e){(function(e){"use strict";var t=n("promise-polyfill");r.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":12}],2:[function(e,t,n){"use strict";var a=e("./lib/promise"),s={};function r(n){var t,r,o,e,i=JSON.stringify(n);return!n.forceScriptReload&&(e=s[i])?e:(o=document.createElement("script"),t=n.dataAttributes||{},r=n.container||document.head,o.src=n.src,o.id=n.id,o.async=!0,Object.keys(t).forEach(function(e){o.setAttribute("data-"+e,t[e])}),e=new a(function(e,t){o.addEventListener("load",function(){e(o)}),o.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),o.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),r.appendChild(o)}),s[i]=e)}r.clearCache=function(){s={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){"use strict";var r=e("./lib/set-attributes"),o=e("./lib/default-attributes"),i=e("./lib/assign");t.exports=function(e){var t=document.createElement("iframe"),n=i({},o,e);return n.style&&"string"!=typeof n.style&&(i(t.style,n.style),delete n.style),r(t,n),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":4,"./lib/default-attributes":5,"./lib/set-attributes":6}],4:[function(e,t,n){"use strict";t.exports=function(n){return Array.prototype.slice.call(arguments,1).forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(e){n[e]=t[e]})}),n}},{}],5:[function(e,t,n){"use strict";t.exports={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],6:[function(e,t,n){"use strict";t.exports=function(e,t){var n;for(var r in t)t.hasOwnProperty(r)&&(null==(n=t[r])?e.removeAttribute(r):e.setAttribute(r,n))}},{}],7:[function(e,t,n){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}},{}],8:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],9:[function(e,t,n){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],10:[function(e,t,n){"use strict";var r=e("./lib/deferred"),o=e("./lib/once"),i=e("./lib/promise-or-callback");function s(n){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o(r(e))),i(n.apply(this,t),e)}}s.wrapPrototype=function(o,e){var i,a;return i=(e=e||{}).ignoreMethods||[],a=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(o.prototype).filter(function(e){var t,n="constructor"!==e&&"function"==typeof o.prototype[e],r=-1===i.indexOf(e);return t=!!a||"_"!==e.charAt(0),n&&t&&r}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=s(t)}),o},t.exports=s},{"./lib/deferred":7,"./lib/once":8,"./lib/promise-or-callback":9}],11:[function(e,A,t){(function(t){"use strict";var r,a,i=[],s={},c="/*framebus*/";function e(e){var t,n=u(this);return!p(e)&&(!p(n)&&(!1!==(t=l(e,Array.prototype.slice.call(arguments,1),n))&&(y(r.top||r.self,t,n),!0)))}function n(e,t){var n=u(this);return!m(e,t,n)&&(s[n]=s[n]||{},s[n][e]=s[n][e]||[],s[n][e].push(t),!0)}function o(e,t){var n,r,o=u(this);if(m(e,t,o))return!1;if(!(r=s[o]&&s[o][e]))return!1;for(n=0;n<r.length;n++)if(r[n]===t)return r.splice(n,1),!0;return!1}function u(e){return e&&e._origin||"*"}function p(e){return"string"!=typeof e}function l(e,t,n){var r=!1,o={event:e,origin:n},i=t[t.length-1];"function"==typeof i&&(o.reply=h(i,n),t=t.slice(0,-1)),o.args=t;try{r=c+JSON.stringify(o)}catch(e){throw new Error("Could not stringify event: "+e.message)}return r}function E(e){var t,n,r,o;if(e.data.slice(0,c.length)!==c)return!1;try{t=JSON.parse(e.data.slice(c.length))}catch(e){return!1}return null!=t.reply&&(n=e.origin,r=e.source,o=t.reply,t.reply=function(e){var t;return!!r&&(!1!==(t=l(o,[e],n))&&void r.postMessage(t,n))},t.args.push(t.reply)),t}function _(e){r||((r=e||t).addEventListener?r.addEventListener("message",f,!1):r.attachEvent?r.attachEvent("onmessage",f):null===r.onmessage?r.onmessage=f:r=null)}function d(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function f(e){var t;p(e.data)||(t=E(e))&&(T("*",t.event,t.args,e),T(e.origin,t.event,t.args,e),function(e,t,n){var r,o;for(r=i.length-1;0<=r;r--)!0===(o=i[r]).closed?i=i.slice(r,1):n!==o&&y(o.top,e,t)}(e.data,t.origin,e.source))}function T(e,t,n,r){var o;if(s[e]&&s[e][t])for(o=0;o<s[e][t].length;o++)s[e][t][o].apply(r,n)}function y(e,t,n){var r,o,i=0;try{for(e.postMessage(t,n),(o=e).top===o&&null!=o.opener&&o.opener!==o&&!0!==o.opener.closed&&y(e.opener.top,t,n);r=e.frames[i];)y(r,t,n),i++}catch(e){}}function h(r,o){var i=d();return a.target(o).subscribe(i,function e(t,n){r(t,n),a.target(o).unsubscribe(i,e)}),i}function m(e,t,n){return!!p(e)||("function"!=typeof t||!!p(n))}_(),a={target:function(e){var t,n={};for(t in a)a.hasOwnProperty(t)&&(n[t]=a[t]);return n._origin=e||"*",n},_packagePayload:l,_unpackPayload:E,_attach:_,_detach:function(){null!=r&&(r.removeEventListener?r.removeEventListener("message",f,!1):r.detachEvent?r.detachEvent("onmessage",f):r.onmessage===f&&(r.onmessage=null),r=null,i=[],s={})},_dispatch:T,_broadcast:y,_subscribeReplier:h,_subscriptionArgsInvalid:m,_onmessage:f,_uuid:d,_getSubscribers:function(){return s},_win:function(){return r},include:function(e){return null!=e&&null!=e.Window&&e.constructor===e.Window&&(i.push(e),!0)},publish:e,pub:e,trigger:e,emit:e,subscribe:n,sub:n,on:n,unsubscribe:o,unsub:o,off:o},A.exports=a}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],12:[function(e,t,n){"use strict";var r=setTimeout;function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,i._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value)}catch(e){return void c(r.promise,e)}s(r.promise,t)}else(1===n._state?s:c)(r.promise,n._value)})):n._deferreds.push(r)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void u(t);if("function"==typeof n)return void l((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,u(t)}catch(e){c(t,e)}var r,o}function c(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function p(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return a(this,new p(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(r,o){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(t);if(0===i.length)return r([]);var a=i.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){s(t,e)},o)}i[t]=e,0==--a&&r(i)}catch(e){o(e)}}for(var e=0;e<i.length;e++)s(e,i[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){for(var n=0,r=o.length;n<r;n++)o[n].then(e,t)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],13:[function(e,t,n){"use strict";var a=e("./create-authorization-data"),s=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},o=a(e.authorization).attrs,i=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(i[n]=r._meta[n]);return r._meta=i,o.tokenizationKey?r.tokenizationKey=o.tokenizationKey:r.authorizationFingerprint=o.authorizationFingerprint,r}},{"./constants":22,"./create-authorization-data":25,"./json-clone":32}],14:[function(e,t,n){"use strict";var r=e("./promise"),u=e("./constants"),p=e("./add-metadata");function l(e){return Math.floor(e/1e3)}t.exports={sendEvent:function(e,a,s){var c=l(Date.now());return r.resolve(e).then(function(e){var t=l(Date.now()),n=e.getConfiguration(),r=e._request,o=n.gatewayConfiguration.analytics.url,i={analytics:[{kind:u.ANALYTICS_PREFIX+a,isAsync:t!==c,timestamp:c}]};r({url:o,method:"post",data:p(n,i),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},s)})}}},{"./add-metadata":13,"./constants":22,"./promise":34}],15:[function(e,t,n){"use strict";var r=e("@braintree/asset-loader/load-script");t.exports={loadScript:r}},{"@braintree/asset-loader/load-script":2}],16:[function(e,t,n){"use strict";var r="function"==typeof Object.assign?Object.assign:o;function o(e){var t,n,r;for(t=1;t<arguments.length;t++)for(r in n=arguments[t])n.hasOwnProperty(r)&&(e[r]=n[r]);return e}t.exports={assign:r,_assign:o}},{}],17:[function(e,t,n){"use strict";var o=e("./braintree-error"),i=e("./promise"),a=e("./errors");t.exports={verify:function(e){var t,n,r;return e?(r=e.name,t=e.client,n=e.authorization,null==t&&null==n?i.reject(new o({type:a.INSTANTIATION_OPTION_REQUIRED.type,code:a.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."})):n||"3.44.0"===t.getVersion()?i.resolve():i.reject(new o({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.44.0) components must be from the same SDK version."}))):i.reject(new o({type:a.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:a.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":18,"./errors":28,"./promise":34}],18:[function(e,t,n){"use strict";var r=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((o.prototype=Object.create(Error.prototype)).constructor=o).types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":27}],19:[function(e,t,n){"use strict";var o=e("../is-verified-domain");t.exports={checkOrigin:function(e,t){var n,r=document.createElement("a");return r.href=t,n="https:"===r.protocol?r.host.replace(/:443$/,""):"http:"===r.protocol?r.host.replace(/:80$/,""):r.host,r.protocol+"//"+n===e||(r.href=e,o(e))}}},{"../is-verified-domain":31}],20:[function(e,t,n){"use strict";var r=e("../enumerate");t.exports=r(["CONFIGURATION_REQUEST"],"bus:")},{"../enumerate":27}],21:[function(e,t,n){"use strict";var a=e("framebus"),r=e("./events"),s=e("./check-origin").checkOrigin,o=e("../braintree-error");function i(e){if(e=e||{},this.channel=e.channel,!this.channel)throw new o({type:o.types.INTERNAL,code:"MISSING_CHANNEL_ID",message:"Channel ID must be specified."});this.merchantUrl=e.merchantUrl,this._isDestroyed=!1,this._isVerbose=!1,this._listeners=[],this._log("new bus on channel "+this.channel,[location.href])}i.prototype.on=function(e,t){var n,r,o=t,i=this;this._isDestroyed||(this.merchantUrl&&(o=function(){s(this.origin,i.merchantUrl)&&t.apply(this,arguments)}),n=this._namespaceEvent(e),(r=Array.prototype.slice.call(arguments))[0]=n,r[1]=o,this._log("on",r),a.on.apply(a,r),this._listeners.push({eventName:e,handler:o,originalHandler:t}))},i.prototype.emit=function(e){var t;this._isDestroyed||((t=Array.prototype.slice.call(arguments))[0]=this._namespaceEvent(e),this._log("emit",t),a.emit.apply(a,t))},i.prototype._offDirect=function(e){var t=Array.prototype.slice.call(arguments);this._isDestroyed||(t[0]=this._namespaceEvent(e),this._log("off",t),a.off.apply(a,t))},i.prototype.off=function(e,t){var n,r,o=t;if(!this._isDestroyed){if(this.merchantUrl)for(n=0;n<this._listeners.length;n++)(r=this._listeners[n]).originalHandler===t&&(o=r.handler);this._offDirect(e,o)}},i.prototype._namespaceEvent=function(e){return["braintree",this.channel,e].join(":")},i.prototype.teardown=function(){var e,t;for(t=0;t<this._listeners.length;t++)e=this._listeners[t],this._offDirect(e.eventName,e.handler);this._listeners.length=0,this._isDestroyed=!0},i.prototype._log=function(e,t){this._isVerbose&&console.log(e,t)},i.events=r,t.exports=i},{"../braintree-error":18,"./check-origin":19,"./events":20,framebus:11}],22:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.44.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.44.0"}},{}],23:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":18,"./errors":28}],24:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":22}],25:[function(e,t,n){"use strict";var a=e("../lib/vendor/polyfill").atob,s=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r,o,i={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(r=e.split("_"),o=r[0],n={merchantId:r.slice(2).join("_"),environment:o},i.environment=n.environment,i.attrs.tokenizationKey=e,i.configUrl=s[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(a(e)),i.environment=t.environment,i.attrs.authorizationFingerprint=t.authorizationFingerprint,i.configUrl=t.configUrl,i.graphQL=t.graphQL),i}},{"../lib/constants":22,"../lib/vendor/polyfill":36}],26:[function(e,t,n){(function(n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),a=e("./errors"),s="3.44.0";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(n.braintree&&n.braintree.client||(t=i.loadScript({src:e.assetsUrl+"/web/"+s+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:a.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:a.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:a.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return n.braintree.client.VERSION!==s?o.reject(new r({type:a.INCOMPATIBLE_VERSIONS.type,code:a.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n.braintree.client.VERSION+") and "+e.name+" (version "+s+") components must be from the same SDK version."})):n.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets":15,"./braintree-error":18,"./errors":28,"./promise":34}],27:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],28:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:r.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:r.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":18}],29:[function(e,t,n){"use strict";function r(){this._events={}}r.prototype.on=function(e,t){this._events[e]?this._events[e].push(t):this._events[e]=[t]},r.prototype._emit=function(e){var t,n,r=this._events[e];if(r)for(n=Array.prototype.slice.call(arguments,1),t=0;t<r.length;t++)r[t].apply(null,n)},t.exports=r},{}],30:[function(e,t,n){"use strict";var o=e("./assign").assign;function c(e,t){var n=e.analyticsMetadata,r={gateway:"braintree","braintree:merchantId":e.gatewayConfiguration.merchantId,"braintree:apiVersion":"v1","braintree:sdkVersion":"3.44.0","braintree:metadata":JSON.stringify({source:n.source,integration:n.integration,sessionId:n.sessionId,version:"3.44.0",platform:n.platform})};return o({},r,t)}t.exports=function(e,t,n){var r,o,i,a=e.gatewayConfiguration.androidPay,s="production"===e.gatewayConfiguration.environment?"PRODUCTION":"TEST";return 2===t?(r={apiVersion:2,apiVersionMinor:0,environment:s,allowedPaymentMethods:[{type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:a.supportedNetworks.map(function(e){return e.toUpperCase()})},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:c(e,{"braintree:authorizationFingerprint":a.googleAuthorizationFingerprint})}}]},n&&(r.merchantInfo={merchantId:n}),"TOKENIZATION_KEY"===e.authorizationType&&(o=find(r.allowedPaymentMethods,"type","CARD"))&&(o.tokenizationSpecification.parameters["braintree:clientKey"]=e.authorization),e.gatewayConfiguration.paypal&&e.gatewayConfiguration.paypal.clientId&&!1===e.gatewayConfiguration.paypal.environmentNoNetwork&&(i={type:"PAYPAL",parameters:{purchase_context:{purchase_units:[{payee:{client_id:e.gatewayConfiguration.paypal.clientId},recurring_payment:!0}]}},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:c(e,{"braintree:paypalClientId":e.gatewayConfiguration.paypal.clientId})}},r.allowedPaymentMethods.push(i))):(r={environment:s,allowedPaymentMethods:["CARD","TOKENIZED_CARD"],paymentMethodTokenizationParameters:{tokenizationType:"PAYMENT_GATEWAY",parameters:c(e,{"braintree:authorizationFingerprint":a.googleAuthorizationFingerprint})},cardRequirements:{allowedCardNetworks:a.supportedNetworks.map(function(e){return e.toUpperCase()})}},"TOKENIZATION_KEY"===e.authorizationType&&(r.paymentMethodTokenizationParameters.parameters["braintree:clientKey"]=e.authorization),n&&(r.merchantId=n),t&&(r.apiVersion=t)),r}},{"./assign":16}],31:[function(e,t,n){"use strict";var r,o={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=function(e){var t;return e=e.toLowerCase(),!!/^https:/.test(e)&&((r=r||document.createElement("a")).href=e,t=r.hostname.split(".").slice(-2).join("."),o.hasOwnProperty(t))}},{}],32:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],33:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],34:[function(n,r,e){(function(e){"use strict";var t=e.Promise||n("promise-polyfill");r.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":12}],35:[function(e,t,n){"use strict";t.exports=function(e){return e?"":".min"}},{}],36:[function(e,r,t){(function(t){"use strict";var n="function"==typeof t.atob?t.atob:e;function e(e){var t,n,r,o,i,a,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(a=0;t=(63&s.indexOf(e.charAt(a++)))<<2|(o=s.indexOf(e.charAt(a++)))>>4&3,n=(15&o)<<4|(i=s.indexOf(e.charAt(a++)))>>2&15,r=(3&i)<<6|63&s.indexOf(e.charAt(a++)),c+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):""),a<e.length;);return c}r.exports={atob:function(e){return n.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,n){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}],38:[function(m,A,e){(function(t){"use strict";var a=m("../../lib/analytics"),r=m("../../lib/assign").assign,n=m("../../lib/bus"),e=m("../../lib/convert-methods-to-error"),o=m("../../lib/generate-google-pay-configuration"),s=m("@braintree/iframer"),i=m("../../lib/vendor/uuid"),c=m("../../lib/use-min"),u=m("../../lib/methods"),p=m("../../lib/promise"),l=m("../../lib/event-emitter"),E=m("../../lib/braintree-error"),_=m("../shared/constants"),d=_.events,f=_.errors,T=m("@braintree/wrap-promise"),y={Visa:"visa",MasterCard:"mastercard","American Express":"amex","Diners Club":"diners",Discover:"discover",JCB:"jcb",UnionPay:"unionpay",Maestro:"maestro"};function h(e){var t=e.enabledPaymentMethods||{};l.call(this),this._componentId=i(),this._client=e.client,this._enabledPaymentMethods={basicCard:!1!==t.basicCard,googlePay:!1!==t.googlePay},this._googlePayVersion=2===e.googlePayVersion?2:1,this._googleMerchantId="18278000977346790994",this._supportedPaymentMethods=this._constructDefaultSupportedPaymentMethods(),this._defaultSupportedPaymentMethods=Object.keys(this._supportedPaymentMethods).map(function(e){return this._supportedPaymentMethods[e]}.bind(this)),this._bus=new n({channel:this._componentId})}(h.prototype=Object.create(l.prototype,{constructor:h}))._constructDefaultSupportedPaymentMethods=function(){var e=this._client.getConfiguration(),t=e.gatewayConfiguration.androidPay,n=e.gatewayConfiguration.creditCards,r={};return this._enabledPaymentMethods.basicCard&&n&&0<n.supportedCardTypes.length&&(r.basicCard={supportedMethods:"basic-card",data:{supportedNetworks:n.supportedCardTypes.reduce(function(e,t){return t in y&&e.push(y[t]),e},[])}}),this._enabledPaymentMethods.googlePay&&t&&t.enabled&&(r.googlePay={supportedMethods:"https://google.com/pay",data:o(e,this._googlePayVersion,this._googleMerchantId)}),r},h.prototype.initialize=function(){var o=this._client.getConfiguration(),i=this;return this._frame=s({allowPaymentRequest:!0,name:"braintree-payment-request-frame",class:"braintree-payment-request-frame",height:0,width:0,style:{position:"absolute",left:"-9999px"},title:"Secure Payment Frame"}),0===this._defaultSupportedPaymentMethods.length?p.reject(new E(f.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS)):new p(function(e){var t,n,r;i._bus.on(d.FRAME_READY,function(e){e(i._client)}),i._bus.on(d.FRAME_CAN_MAKE_REQUESTS,function(){a.sendEvent(i._client,"payment-request.initialized"),i._bus.on(d.SHIPPING_ADDRESS_CHANGE,function(e){var t={target:{shippingAddress:e},updateWith:function(e){i._bus.emit(d.UPDATE_SHIPPING_ADDRESS,e)}};i._emit("shippingAddressChange",t),i._emit("shippingaddresschange",t)}),i._bus.on(d.SHIPPING_OPTION_CHANGE,function(e){var t={target:{shippingOption:e},updateWith:function(e){i._bus.emit(d.UPDATE_SHIPPING_OPTION,e)}};i._emit("shippingOptionChange",t),i._emit("shippingoptionchange",t)}),e(i)}),i._frame.src=(t=o.gatewayConfiguration.assetsUrl,n=i._componentId,r=o.isDebug,t+"/web/3.44.0/html/payment-request-frame"+c(r)+".html#"+n),document.body.appendChild(i._frame)})},h.prototype.createSupportedPaymentMethodsConfiguration=function(e,t){var n;if(!e)throw new E(f.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE);if(!this._enabledPaymentMethods[e])throw new E(f.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED);return(n=r({},this._supportedPaymentMethods[e])).data=r({},n.data,t),n},h.prototype.tokenize=function(e){var i=this;return new p(function(r,o){i._bus.emit(d.PAYMENT_REQUEST_INITIALIZED,{supportedPaymentMethods:e.supportedPaymentMethods||i._defaultSupportedPaymentMethods,details:e.details,options:e.options},function(e){var t=e[0],n=e[1];t?o(i._formatTokenizationError(t)):(a.sendEvent(i._client,"payment-request.tokenize.succeeded"),r({nonce:n.nonce,type:n.type,description:n.description,details:{rawPaymentResponse:n.details.rawPaymentResponse,cardType:n.details.cardType,lastFour:n.details.lastFour,lastTwo:n.details.lastTwo},binData:n.binData}))})})},h.prototype.canMakePayment=function(e){var n,i=this;return t.PaymentRequest?e.supportedPaymentMethods&&(e.supportedPaymentMethods.forEach(function(e){var t=e.supportedMethods;t in _.SUPPORTED_METHODS||(n=t)}),n)?p.reject(new E({type:f.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.type,code:f.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.code,message:n+" is not a supported payment method."})):new p(function(r,o){i._bus.emit(d.CAN_MAKE_PAYMENT,{supportedPaymentMethods:e.supportedPaymentMethods||i._defaultSupportedPaymentMethods,details:e.details,options:e.options},function(e){var t=e[0],n=e[1];t?o(i._formatCanMakePaymentError(t)):(a.sendEvent(i._client,"payment-request.can-make-payment."+n),r(n))})}):(a.sendEvent(i._client,"payment-request.can-make-payment.not-available"),p.resolve(!1))},h.prototype.teardown=function(){return this._bus.teardown(),this._frame.parentNode.removeChild(this._frame),e(this,u(h.prototype)),a.sendEvent(this._client,"payment-request.teardown-completed"),p.resolve()},h.prototype._formatTokenizationError=function(e){var t;switch(e.name){case"AbortError":return t=new E({type:f.PAYMENT_REQUEST_CANCELED.type,code:f.PAYMENT_REQUEST_CANCELED.code,message:f.PAYMENT_REQUEST_CANCELED.message,details:{originalError:e}}),a.sendEvent(this._client,"payment-request.tokenize.canceled"),t;case"PAYMENT_REQUEST_INITIALIZATION_FAILED":t=new E({type:f.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:f.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:f.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}});break;case"BRAINTREE_GATEWAY_GOOGLE_PAYMENT_TOKENIZATION_ERROR":t=new E({type:f.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.type,code:f.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.code,message:f.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.message,details:{originalError:e}});break;case"BRAINTREE_GATEWAY_GOOGLE_PAYMENT_PARSING_ERROR":t=new E({type:f.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.type,code:f.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.code,message:f.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.message,details:{originalError:e}});break;default:t=new E({code:f.PAYMENT_REQUEST_NOT_COMPLETED.code,type:e.type||E.types.CUSTOMER,message:f.PAYMENT_REQUEST_NOT_COMPLETED.message,details:{originalError:e}})}return a.sendEvent(this._client,"payment-request.tokenize.failed"),t},h.prototype._formatCanMakePaymentError=function(e){var t;switch(e.name){case"PAYMENT_REQUEST_INITIALIZATION_FAILED":t=new E({type:f.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:f.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:f.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}});break;case"NotAllowedError":t=new E({type:f.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.type,code:f.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.code,message:f.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.message,details:{originalError:e}});break;default:t=new E({code:f.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.code,type:f.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.type,message:f.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.message,details:{originalError:e}})}return a.sendEvent(this._client,"payment-request.can-make-payment.failed"),t},A.exports=T.wrapPrototype(h)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/analytics":14,"../../lib/assign":16,"../../lib/braintree-error":18,"../../lib/bus":21,"../../lib/convert-methods-to-error":23,"../../lib/event-emitter":29,"../../lib/generate-google-pay-configuration":30,"../../lib/methods":33,"../../lib/promise":34,"../../lib/use-min":35,"../../lib/vendor/uuid":37,"../shared/constants":40,"@braintree/iframer":3,"@braintree/wrap-promise":10}],39:[function(e,t,n){"use strict";var r=e("./external/payment-request"),o=e("../lib/basic-component-verification"),i=e("../lib/create-deferred-client"),a=e("../lib/create-assets-url"),s=e("@braintree/wrap-promise");t.exports={create:s(function(t){var e="Payment Request";return o.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return i.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:a.create(t.authorization),name:e})}).then(function(e){return t.client=e,new r(t).initialize()})}),VERSION:"3.44.0"}},{"../lib/basic-component-verification":17,"../lib/create-assets-url":24,"../lib/create-deferred-client":26,"./external/payment-request":38,"@braintree/wrap-promise":10}],40:[function(e,t,n){"use strict";var r=e("../../lib/enumerate"),o=e("./errors"),i={};i.events=r(["CAN_MAKE_PAYMENT","FRAME_READY","FRAME_CAN_MAKE_REQUESTS","PAYMENT_REQUEST_INITIALIZED","SHIPPING_ADDRESS_CHANGE","UPDATE_SHIPPING_ADDRESS","SHIPPING_OPTION_CHANGE","UPDATE_SHIPPING_OPTION"],"payment-request:"),i.errors=o,i.SUPPORTED_METHODS={"basic-card":!0,"https://google.com/pay":!0},t.exports=i},{"../../lib/enumerate":27,"./errors":41}],41:[function(e,t,n){"use strict";var r=e("../../lib/braintree-error");t.exports={PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS",message:"There are no supported payment methods associated with this account."},PAYMENT_REQUEST_CANCELED:{type:r.types.CUSTOMER,code:"PAYMENT_REQUEST_CANCELED",message:"Payment request was canceled."},PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED",message:"Something went wrong when configuring the payment request."},PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED:{type:r.types.UNKNOWN,code:"PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED",message:"Something went wrong when calling `canMakePayment`"},PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED",message:"Something went wrong when calling `canMakePayment`. Most likely, `canMakePayment` was called multiple times with different supportedMethods configurations."},PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD"},PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE",message:"Something went wrong when tokenizing the Google Pay card."},PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR:{type:r.types.UNKNOWN,code:"PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR",message:"Something went wrong when tokenizing the Google Pay card."},PAYMENT_REQUEST_NOT_COMPLETED:{code:"PAYMENT_REQUEST_NOT_COMPLETED",message:"Payment request could not be completed."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE",message:"createSupportedPaymentMethodsConfiguration must include a type parameter."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED:{type:r.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED",message:"createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled."}}},{"../../lib/braintree-error":18}]},{},[39])(39)});