!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).unionpay=e()}}(function(){return function o(s,a,c){function u(t,e){if(!a[t]){if(!s[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=a[t]={exports:{}};s[t][0].call(i.exports,function(e){return u(s[t][1][e]||e)},i,i.exports,o,s,a,c)}return a[t].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(n,r,e){(function(e){"use strict";var t=n("promise-polyfill");r.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":13}],2:[function(e,t,n){"use strict";var s=e("./lib/promise"),a={};function r(n){var t,r,i,e,o=JSON.stringify(n);return!n.forceScriptReload&&(e=a[o])?e:(i=document.createElement("script"),t=n.dataAttributes||{},r=n.container||document.head,i.src=n.src,i.id=n.id,i.async=!0,n.crossorigin&&i.setAttribute("crossorigin",n.crossorigin),Object.keys(t).forEach(function(e){i.setAttribute("data-"+e,t[e])}),e=new s(function(e,t){i.addEventListener("load",function(){e(i)}),i.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),i.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),r.appendChild(i)}),a[o]=e)}r.clearCache=function(){a={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){(function(e){"use strict";function r(e){var t,n=this;return"function"==typeof e?new r.Promise(e):(this._promise=new r.Promise(function(e,t){n._resolveFunction=e,n._rejectFunction=t}),e=e||{},this._onResolve=e.onResolve||r.defaultOnResolve,this._onReject=e.onReject||r.defaultOnReject,((t=e).hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(t.suppressUnhandledPromiseMessage):Boolean(r.suppressUnhandledPromiseMessage))&&this._promise.catch(function(){}),this._resetState(),this._promise.resolve=this.resolve.bind(this),this._promise.reject=this.reject.bind(this),this._promise)}["all","allSettled","race","reject","resolve"].forEach(function(t){r[t]=function(){var e=Array.prototype.slice.call(arguments);return r.Promise[t].apply(r.Promise,e)}}),(r.setPromise=function(e){r.Promise=e})(e.Promise),r.defaultOnResolve=function(e){return r.Promise.resolve(e)},r.defaultOnReject=function(e){return r.Promise.reject(e)},r.prototype.resolve=function(e){var t=this;return this._promise.isFulfilled||(this._setResolved(),r.Promise.resolve().then(function(){return t._onResolve(e)}).then(this._resolveFunction).catch(function(e){t._resetState(),t._promise.reject(e)})),this._promise},r.prototype.reject=function(e){var t=this;return this._promise.isFulfilled||(this._setRejected(),r.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(this._rejectFunction)),this._promise},r.prototype._resetState=function(){this._promise.isFulfilled=!1,this._promise.isResolved=!1,this._promise.isRejected=!1},r.prototype._setResolved=function(){this._promise.isFulfilled=!0,this._promise.isResolved=!0,this._promise.isRejected=!1},r.prototype._setRejected=function(){this._promise.isFulfilled=!0,this._promise.isResolved=!1,this._promise.isRejected=!0},t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(e,t,n){"use strict";var r=e("./lib/set-attributes"),i=e("./lib/default-attributes"),o=e("./lib/assign");t.exports=function(e){var t=document.createElement("iframe"),n=o({},i,e);return n.style&&"string"!=typeof n.style&&(o(t.style,n.style),delete n.style),r(t,n),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":5,"./lib/default-attributes":6,"./lib/set-attributes":7}],5:[function(e,t,n){"use strict";t.exports=function(n){return Array.prototype.slice.call(arguments,1).forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(e){n[e]=t[e]})}),n}},{}],6:[function(e,t,n){"use strict";t.exports={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],7:[function(e,t,n){"use strict";t.exports=function(e,t){var n;for(var r in t)t.hasOwnProperty(r)&&(null==(n=t[r])?e.removeAttribute(r):e.setAttribute(r,n))}},{}],8:[function(e,t,n){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){try{t.apply(null,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],9:[function(e,t,n){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],10:[function(e,t,n){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],11:[function(e,t,n){"use strict";var r=e("./lib/deferred"),i=e("./lib/once"),o=e("./lib/promise-or-callback");function a(n){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i(r(e))),o(n.apply(this,t),e)}}a.wrapPrototype=function(i,e){var o,s;return o=(e=e||{}).ignoreMethods||[],s=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(i.prototype).filter(function(e){var t,n="constructor"!==e&&"function"==typeof i.prototype[e],r=-1===o.indexOf(e);return t=s||"_"!==e.charAt(0),n&&t&&r}).forEach(function(e){var t=i.prototype[e];i.prototype[e]=a(t)}),i},t.exports=a},{"./lib/deferred":8,"./lib/once":9,"./lib/promise-or-callback":10}],12:[function(e,I,t){(function(t){"use strict";var r,s,o=[],a={},c="/*framebus*/";function e(e){var t,n=u(this);return!l(e)&&(!l(n)&&(!1!==(t=d(e,Array.prototype.slice.call(arguments,1),n))&&(N(r.top||r.self,t,n),!0)))}function n(e,t){var n=u(this);return!y(e,t,n)&&(a[n]=a[n]||{},a[n][e]=a[n][e]||[],a[n][e].push(t),!0)}function i(e,t){var n,r,i=u(this);if(y(e,t,i))return!1;if(!(r=a[i]&&a[i][e]))return!1;for(n=0;n<r.length;n++)if(r[n]===t)return r.splice(n,1),!0;return!1}function u(e){return e&&e._origin||"*"}function l(e){return"string"!=typeof e}function d(e,t,n){var r=!1,i={event:e,origin:n},o=t[t.length-1];"function"==typeof o&&(i.reply=m(o,n),t=t.slice(0,-1)),i.args=t;try{r=c+JSON.stringify(i)}catch(e){throw new Error("Could not stringify event: "+e.message)}return r}function p(e){var t,n,r,i;if(e.data.slice(0,c.length)!==c)return!1;try{t=JSON.parse(e.data.slice(c.length))}catch(e){return!1}return null!=t.reply&&(n=e.origin,r=e.source,i=t.reply,t.reply=function(e){var t;return!!r&&(!1!==(t=d(i,[e],n))&&void r.postMessage(t,n))},t.args.push(t.reply)),t}function f(e){r||((r=e||t).addEventListener?r.addEventListener("message",E,!1):r.attachEvent?r.attachEvent("onmessage",E):null===r.onmessage?r.onmessage=E:r=null)}function _(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function E(e){var t;l(e.data)||(t=p(e))&&(h("*",t.event,t.args,e),h(e.origin,t.event,t.args,e),function(e,t,n){var r,i;for(r=o.length-1;0<=r;r--)!0===(i=o[r]).closed?o=o.slice(r,1):n!==i&&N(i.top,e,t)}(e.data,t.origin,e.source))}function h(e,t,n,r){var i;if(a[e]&&a[e][t])for(i=0;i<a[e][t].length;i++)a[e][t][i].apply(r,n)}function N(e,t,n){var r,i,o=0;try{for(e.postMessage(t,n),(i=e).top===i&&null!=i.opener&&i.opener!==i&&!0!==i.opener.closed&&N(e.opener.top,t,n);r=e.frames[o];)N(r,t,n),o++}catch(e){}}function m(r,i){var o=_();return s.target(i).subscribe(o,function e(t,n){r(t,n),s.target(i).unsubscribe(o,e)}),o}function y(e,t,n){return!!l(e)||("function"!=typeof t||!!l(n))}f(),s={target:function(e){var t,n={};for(t in s)s.hasOwnProperty(t)&&(n[t]=s[t]);return n._origin=e||"*",n},_packagePayload:d,_unpackPayload:p,_attach:f,_detach:function(){null!=r&&(r.removeEventListener?r.removeEventListener("message",E,!1):r.detachEvent?r.detachEvent("onmessage",E):r.onmessage===E&&(r.onmessage=null),r=null,o=[],a={})},_dispatch:h,_broadcast:N,_subscribeReplier:m,_subscriptionArgsInvalid:y,_onmessage:E,_uuid:_,_getSubscribers:function(){return a},_win:function(){return r},include:function(e){return null!=e&&(null!=e.Window&&(e.constructor===e.Window&&(o.push(e),!0)))},publish:e,pub:e,trigger:e,emit:e,subscribe:n,sub:n,on:n,unsubscribe:i,unsub:i,off:i},I.exports=s}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],13:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function i(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function s(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,o._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value)}catch(e){return void u(r.promise,e)}a(r.promise,t)}else(1===n._state?a:u)(r.promise,n._value)})):n._deferreds.push(r)}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof o)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void p((r=n,i=e,function(){r.apply(i,arguments)}),t)}t._state=1,t._value=e,l(t)}catch(e){u(t,e)}var r,i}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)s(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function p(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){if(n)return;n=!0,u(t,e)}}o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var n=new this.constructor(i);return s(this,new d(e,t,n)),n},o.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},o.all=function(t){return new o(function(r,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var o=Array.prototype.slice.call(t);if(0===o.length)return r([]);var s=o.length;function a(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){a(t,e)},i)}o[t]=e,0==--s&&r(o)}catch(e){i(e)}}for(var e=0;e<o.length;e++)a(e,o[e])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(n){return new o(function(e,t){t(n)})},o.race=function(i){return new o(function(e,t){if(!c(i))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=i.length;n<r;n++)o.resolve(i[n]).then(e,t)})},o._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){r(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=o},{}],14:[function(e,t,n){"use strict";var s=e("./create-authorization-data"),a=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var n,r=t?a(t):{},i=s(e.authorization).attrs,o=a(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(o[n]=r._meta[n]);return r._meta=o,i.tokenizationKey?r.tokenizationKey=i.tokenizationKey:r.authorizationFingerprint=i.authorizationFingerprint,r}},{"./constants":22,"./create-authorization-data":25,"./json-clone":30}],15:[function(e,t,n){"use strict";var r=e("./promise"),u=e("./constants"),l=e("./add-metadata");t.exports={sendEvent:function(e,s,a){var c=Date.now();return r.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),r=e._request,i=n.gatewayConfiguration.analytics.url,o={analytics:[{kind:u.ANALYTICS_PREFIX+s,isAsync:Math.floor(t/1e3)!==Math.floor(c/1e3),timestamp:c}]};r({url:i,method:"post",data:l(n,o),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},a)})}}},{"./add-metadata":14,"./constants":22,"./promise":32}],16:[function(e,t,n){"use strict";var r=e("@braintree/asset-loader/load-script");t.exports={loadScript:r}},{"@braintree/asset-loader/load-script":2}],17:[function(e,t,n){"use strict";var i=e("./braintree-error"),o=e("./promise"),s=e("./errors");t.exports={verify:function(e){var t,n,r;return e?(r=e.name,t=e.client,n=e.authorization,t||n?n||"3.58.0"===t.getVersion()?o.resolve():o.reject(new i({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+r+" (version 3.58.0) components must be from the same SDK version."})):o.reject(new i({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+r+"."}))):o.reject(new i({type:s.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:s.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":18,"./errors":28,"./promise":32}],18:[function(e,t,n){"use strict";var r=e("./enumerate");function i(e){if(!i.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((i.prototype=Object.create(Error.prototype)).constructor=i).types=r(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),i.findRootError=function(e){return e instanceof i&&e.details&&e.details.originalError?i.findRootError(e.details.originalError):e},t.exports=i},{"./enumerate":27}],19:[function(e,t,n){"use strict";var i=e("../is-verified-domain");t.exports={checkOrigin:function(e,t){var n,r=document.createElement("a");return r.href=t,n="https:"===r.protocol?r.host.replace(/:443$/,""):"http:"===r.protocol?r.host.replace(/:80$/,""):r.host,r.protocol+"//"+n===e||(r.href=e,i(e))}}},{"../is-verified-domain":29}],20:[function(e,t,n){"use strict";var r=e("../enumerate");t.exports=r(["CONFIGURATION_REQUEST"],"bus:")},{"../enumerate":27}],21:[function(e,t,n){"use strict";var s=e("framebus"),r=e("./events"),a=e("./check-origin").checkOrigin,i=e("../braintree-error");function o(e){if(e=e||{},this.channel=e.channel,!this.channel)throw new i({type:i.types.INTERNAL,code:"MISSING_CHANNEL_ID",message:"Channel ID must be specified."});this.merchantUrl=e.merchantUrl,this._isDestroyed=!1,this._isVerbose=!1,this._listeners=[],this._log("new bus on channel "+this.channel,[location.href])}o.prototype.on=function(e,t){var n,r,i=t,o=this;this._isDestroyed||(this.merchantUrl&&(i=function(){a(this.origin,o.merchantUrl)&&t.apply(this,arguments)}),n=this._namespaceEvent(e),(r=Array.prototype.slice.call(arguments))[0]=n,r[1]=i,this._log("on",r),s.on.apply(s,r),this._listeners.push({eventName:e,handler:i,originalHandler:t}))},o.prototype.emit=function(e){var t;this._isDestroyed||((t=Array.prototype.slice.call(arguments))[0]=this._namespaceEvent(e),this._log("emit",t),s.emit.apply(s,t))},o.prototype._offDirect=function(e){var t=Array.prototype.slice.call(arguments);this._isDestroyed||(t[0]=this._namespaceEvent(e),this._log("off",t),s.off.apply(s,t))},o.prototype.off=function(e,t){var n,r,i=t;if(!this._isDestroyed){if(this.merchantUrl)for(n=0;n<this._listeners.length;n++)(r=this._listeners[n]).originalHandler===t&&(i=r.handler);this._offDirect(e,i)}},o.prototype._namespaceEvent=function(e){return["braintree",this.channel,e].join(":")},o.prototype.teardown=function(){var e,t;for(t=0;t<this._listeners.length;t++)e=this._listeners[t],this._offDirect(e.eventName,e.handler);this._listeners.length=0,this._isDestroyed=!0},o.prototype._log=function(e,t){this._isVerbose&&console.log(e,t)},o.events=r,t.exports=o},{"../braintree-error":18,"./check-origin":19,"./events":20,framebus:12}],22:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.58.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.58.0"}},{}],23:[function(e,t,n){"use strict";var r=e("./braintree-error"),i=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:i.METHOD_CALLED_AFTER_TEARDOWN.type,code:i.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":18,"./errors":28}],24:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":22}],25:[function(e,t,n){"use strict";var s=e("../lib/vendor/polyfill").atob,a=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r,i,o={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(r=e.split("_"),i=r[0],n={merchantId:r.slice(2).join("_"),environment:i},o.environment=n.environment,o.attrs.tokenizationKey=e,o.configUrl=a[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(s(e)),o.environment=t.environment,o.attrs.authorizationFingerprint=t.authorizationFingerprint,o.configUrl=t.configUrl,o.graphQL=t.graphQL),o}},{"../lib/constants":22,"../lib/vendor/polyfill":34}],26:[function(e,t,n){(function(n){"use strict";var r=e("./braintree-error"),i=e("./promise"),o=e("./assets"),s=e("./errors"),a="3.58.0";t.exports={create:function(e){var t=i.resolve();return e.client?i.resolve(e.client):(n.braintree&&n.braintree.client||(t=o.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return i.reject(new r({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})),t.then(function(){return n.braintree.client.VERSION!==a?i.reject(new r({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+n.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):n.braintree.client.create({authorization:e.authorization,debug:e.debug})}))}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./assets":16,"./braintree-error":18,"./errors":28,"./promise":32}],27:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],28:[function(e,t,n){"use strict";var r=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:r.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:r.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":18}],29:[function(e,t,n){"use strict";var r,i={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=function(e){var t;return e=e.toLowerCase(),!!/^https:/.test(e)&&((r=r||document.createElement("a")).href=e,t=r.hostname.split(".").slice(-2).join("."),i.hasOwnProperty(t))}},{}],30:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],31:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],32:[function(r,i,e){(function(e){"use strict";var t=e.Promise||r("promise-polyfill"),n=r("@braintree/extended-promise");n.suppressUnhandledPromiseMessage=!0,n.setPromise(t),i.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"@braintree/extended-promise":3,"promise-polyfill":13}],33:[function(e,t,n){"use strict";t.exports=function(e){return e?"":".min"}},{}],34:[function(e,r,t){(function(t){"use strict";var n="function"==typeof t.atob?t.atob:e;function e(e){var t,n,r,i,o,s,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(s=0;t=(63&a.indexOf(e.charAt(s++)))<<2|(i=a.indexOf(e.charAt(s++)))>>4&3,n=(15&i)<<4|(o=a.indexOf(e.charAt(s++)))>>2&15,r=(3&o)<<6|63&a.indexOf(e.charAt(s++)),c+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):""),s<e.length;);return c}r.exports={atob:function(e){return n.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],35:[function(e,t,n){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}],36:[function(e,t,n){"use strict";var r=e("./shared/unionpay"),i=e("../lib/basic-component-verification"),o=e("../lib/braintree-error"),s=e("../lib/create-deferred-client"),a=e("../lib/create-assets-url"),c=e("../lib/analytics"),u=e("./shared/errors"),l=e("../lib/promise"),d=e("@braintree/wrap-promise");t.exports={create:d(function(n){var e="UnionPay";return i.verify({name:e,client:n.client,authorization:n.authorization}).then(function(){return s.create({authorization:n.authorization,client:n.client,debug:n.debug,assetsUrl:a.create(n.authorization),name:e})}).then(function(e){var t=e.getConfiguration();return n.client=e,t.gatewayConfiguration.unionPay&&!0===t.gatewayConfiguration.unionPay.enabled?(c.sendEvent(n.client,"unionpay.initialized"),new r(n)):l.reject(new o(u.UNIONPAY_NOT_ENABLED))})}),VERSION:"3.58.0"}},{"../lib/analytics":15,"../lib/basic-component-verification":17,"../lib/braintree-error":18,"../lib/create-assets-url":24,"../lib/create-deferred-client":26,"../lib/promise":32,"./shared/errors":38,"./shared/unionpay":39,"@braintree/wrap-promise":11}],37:[function(e,t,n){"use strict";var r=e("../../lib/enumerate");t.exports={events:r(["HOSTED_FIELDS_FETCH_CAPABILITIES","HOSTED_FIELDS_ENROLL","HOSTED_FIELDS_TOKENIZE"],"union-pay:"),HOSTED_FIELDS_FRAME_NAME:"braintreeunionpayhostedfields"}},{"../../lib/enumerate":27}],38:[function(e,t,n){"use strict";var r=e("../../lib/braintree-error");t.exports={UNIONPAY_NOT_ENABLED:{type:r.types.MERCHANT,code:"UNIONPAY_NOT_ENABLED",message:"UnionPay is not enabled for this merchant."},UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID:{type:r.types.MERCHANT,code:"UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID",message:"Found an invalid Hosted Fields instance. Please use a valid Hosted Fields instance."},UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED:{type:r.types.MERCHANT,code:"UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED",message:"Could not find the Hosted Fields instance."},UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED:{type:r.types.MERCHANT,code:"UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED",message:"A card or a Hosted Fields instance is required. Please supply a card or a Hosted Fields instance."},UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES:{type:r.types.MERCHANT,code:"UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES",message:"Please supply either a card or a Hosted Fields instance, not both."},UNIONPAY_EXPIRATION_DATE_INCOMPLETE:{type:r.types.MERCHANT,code:"UNIONPAY_EXPIRATION_DATE_INCOMPLETE",message:"You must supply expiration month and year or neither."},UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID:{type:r.types.CUSTOMER,code:"UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID",message:"Enrollment failed due to user input error."},UNIONPAY_ENROLLMENT_NETWORK_ERROR:{type:r.types.NETWORK,code:"UNIONPAY_ENROLLMENT_NETWORK_ERROR",message:"Could not enroll UnionPay card."},UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR:{type:r.types.NETWORK,code:"UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR",message:"Could not fetch card capabilities."},UNIONPAY_TOKENIZATION_NETWORK_ERROR:{type:r.types.NETWORK,code:"UNIONPAY_TOKENIZATION_NETWORK_ERROR",message:"A tokenization network error occurred."},UNIONPAY_MISSING_MOBILE_PHONE_DATA:{type:r.types.MERCHANT,code:"UNIONPAY_MISSING_MOBILE_PHONE_DATA",message:"A `mobile` with `countryCode` and `number` is required."},UNIONPAY_FAILED_TOKENIZATION:{type:r.types.CUSTOMER,code:"UNIONPAY_FAILED_TOKENIZATION",message:"The supplied card data failed tokenization."}}},{"../../lib/braintree-error":18}],39:[function(e,t,n){"use strict";var a=e("../../lib/analytics"),c=e("../../lib/braintree-error"),o=e("../../lib/bus"),s=e("./constants"),u=e("../../lib/use-min"),r=e("../../lib/convert-methods-to-error"),l=e("./errors"),d=s.events,p=e("@braintree/iframer"),i=e("../../lib/methods"),f=e("../../lib/vendor/uuid"),_=e("../../lib/promise"),E=e("@braintree/wrap-promise");function h(e){this._options=e}h.prototype.fetchCapabilities=function(e){var r=this,n=this._options.client,t=e.card?e.card.number:null,i=e.hostedFields;return t&&i?_.reject(new c(l.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)):t?n.request({method:"get",endpoint:"payment_methods/credit_cards/capabilities",data:{_meta:{source:"unionpay"},creditCard:{number:t}}}).then(function(e){return a.sendEvent(n,"unionpay.capabilities-received"),e}).catch(function(e){var t=e.details&&e.details.httpStatus;return a.sendEvent(n,"unionpay.capabilities-failed"),403===t?_.reject(e):_.reject(new c({type:l.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.type,code:l.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.code,message:l.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.message,details:{originalError:e}}))}):i?i._bus?r._initializeHostedFields().then(function(){return new _(function(t,n){r._bus.emit(d.HOSTED_FIELDS_FETCH_CAPABILITIES,{hostedFields:i},function(e){e.err?n(new c(e.err)):t(e.payload)})})}):_.reject(new c(l.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)):_.reject(new c(l.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))},h.prototype.enroll=function(e){var t,r=this,i=this._options.client,n=e.card,o=e.mobile,s=e.hostedFields;if(!o)return _.reject(new c(l.UNIONPAY_MISSING_MOBILE_PHONE_DATA));if(s)return s._bus?n?_.reject(new c(l.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)):new _(function(t,n){r._initializeHostedFields().then(function(){r._bus.emit(d.HOSTED_FIELDS_ENROLL,{hostedFields:s,mobile:o},function(e){e.err?n(new c(e.err)):t(e.payload)})})}):_.reject(new c(l.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));if(n&&n.number){if(t={_meta:{source:"unionpay"},unionPayEnrollment:{number:n.number,mobileCountryCode:o.countryCode,mobileNumber:o.number}},n.expirationDate)t.unionPayEnrollment.expirationDate=n.expirationDate;else if(n.expirationMonth||n.expirationYear){if(!n.expirationMonth||!n.expirationYear)return _.reject(new c(l.UNIONPAY_EXPIRATION_DATE_INCOMPLETE));t.unionPayEnrollment.expirationYear=n.expirationYear,t.unionPayEnrollment.expirationMonth=n.expirationMonth}return i.request({method:"post",endpoint:"union_pay_enrollments",data:t}).then(function(e){return a.sendEvent(i,"unionpay.enrollment-succeeded"),{enrollmentId:e.unionPayEnrollmentId,smsCodeRequired:e.smsCodeRequired}}).catch(function(e){var t,n=e.details&&e.details.httpStatus;return 403===n?t=e:n<500?(t=new c(l.UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID)).details={originalError:e}:(t=new c(l.UNIONPAY_ENROLLMENT_NETWORK_ERROR)).details={originalError:e},a.sendEvent(i,"unionpay.enrollment-failed"),_.reject(t)})}return _.reject(new c(l.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))},h.prototype.tokenize=function(e){var t,r=this,i=this._options.client,n=e.card,o=e.hostedFields;return n&&o?_.reject(new c(l.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)):n?(t={_meta:{source:"unionpay"},creditCard:{number:e.card.number,options:{unionPayEnrollment:{id:e.enrollmentId}}}},e.smsCode&&(t.creditCard.options.unionPayEnrollment.smsCode=e.smsCode),n.expirationDate?t.creditCard.expirationDate=n.expirationDate:n.expirationMonth&&n.expirationYear&&(t.creditCard.expirationYear=n.expirationYear,t.creditCard.expirationMonth=n.expirationMonth),e.card.cvv&&(t.creditCard.cvv=e.card.cvv),i.request({method:"post",endpoint:"payment_methods/credit_cards",data:t}).then(function(e){var t=e.creditCards[0];return delete t.consumed,delete t.threeDSecureInfo,a.sendEvent(i,"unionpay.nonce-received"),t}).catch(function(e){var t,n=e.details&&e.details.httpStatus;return a.sendEvent(i,"unionpay.nonce-failed"),403===n?t=e:n<500?(t=new c(l.UNIONPAY_FAILED_TOKENIZATION)).details={originalError:e}:(t=new c(l.UNIONPAY_TOKENIZATION_NETWORK_ERROR)).details={originalError:e},_.reject(t)})):o?o._bus?new _(function(t,n){r._initializeHostedFields().then(function(){r._bus.emit(d.HOSTED_FIELDS_TOKENIZE,e,function(e){e.err?n(new c(e.err)):t(e.payload)})})}):_.reject(new c(l.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)):_.reject(new c(l.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))},h.prototype.teardown=function(){return this._bus&&(this._hostedFieldsFrame.parentNode.removeChild(this._hostedFieldsFrame),this._bus.teardown()),r(this,i(h.prototype)),_.resolve()},h.prototype._initializeHostedFields=function(){var e,n,r=f(),i=this;return this._hostedFieldsInitializePromise||(this._hostedFieldsInitializePromise=new _(function(t){e=i._options.client.getConfiguration().gatewayConfiguration.assetsUrl,n=i._options.client.getConfiguration().isDebug,i._bus=new o({channel:r,merchantUrl:location.href}),i._hostedFieldsFrame=p({name:s.HOSTED_FIELDS_FRAME_NAME+"_"+r,src:e+"/web/3.58.0/html/unionpay-hosted-fields-frame"+u(n)+".html",height:0,width:0}),i._bus.on(o.events.CONFIGURATION_REQUEST,function(e){e(i._options.client),t()}),document.body.appendChild(i._hostedFieldsFrame)})),this._hostedFieldsInitializePromise},t.exports=E.wrapPrototype(h)},{"../../lib/analytics":15,"../../lib/braintree-error":18,"../../lib/bus":21,"../../lib/convert-methods-to-error":23,"../../lib/methods":31,"../../lib/promise":32,"../../lib/use-min":33,"../../lib/vendor/uuid":35,"./constants":37,"./errors":38,"@braintree/iframer":4,"@braintree/wrap-promise":11}]},{},[36])(36)});