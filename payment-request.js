!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).paymentRequest=e()}(function(){return function r(o,i,s){function a(t,e){if(!i[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},o[t][0].call(n.exports,function(e){return a(o[t][1][e]||e)},n,n.exports,r,o,i,s)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<s.length;e++)a(s[e]);return a}({1:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},r=(Object.defineProperty(n,"__esModule",{value:!0}),n.PromiseGlobal=void 0,r(e("promise-polyfill"))),e="undefined"!=typeof Promise?Promise:r.default;n.PromiseGlobal=e},{"promise-polyfill":29}],2:[function(e,t,n){"use strict";var s=e("./lib/promise"),a={};function r(n){var e,r,t,o,i=JSON.stringify(n);return!n.forceScriptReload&&(e=a[i])||(r=document.createElement("script"),t=n.dataAttributes||{},o=n.container||document.head,r.src=n.src,r.id=n.id||"",r.async=!0,n.crossorigin&&r.setAttribute("crossorigin",""+n.crossorigin),Object.keys(t).forEach(function(e){r.setAttribute("data-"+e,""+t[e])}),e=new s.PromiseGlobal(function(e,t){r.addEventListener("load",function(){e(r)}),r.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),r.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),o.appendChild(r)}),a[i]=e),e}r.clearCache=function(){a={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,n){"use strict";function r(){this._events={}}r.prototype.on=function(e,t){this._events[e]?this._events[e].push(t):this._events[e]=[t]},r.prototype.off=function(e,t){e=this._events[e];e&&(t=e.indexOf(t),e.splice(t,1))},r.prototype._emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e=this._events[e];e&&e.forEach(function(e){e.apply(void 0,t)})},r.prototype.hasListener=function(e){e=this._events[e];return!!e&&0<e.length},r.createChild=function(e){e.prototype=Object.create(r.prototype,{constructor:e})},t.exports=r},{}],5:[function(e,t,n){"use strict";var r="undefined"!=typeof Promise?Promise:null,r=(o.defaultOnResolve=function(e){return o.Promise.resolve(e)},o.defaultOnReject=function(e){return o.Promise.reject(e)},o.setPromise=function(e){o.Promise=e},o.shouldCatchExceptions=function(e){return e.hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(e.suppressUnhandledPromiseMessage):Boolean(o.suppressUnhandledPromiseMessage)},o.all=function(e){return o.Promise.all(e)},o.allSettled=function(e){return o.Promise.allSettled(e)},o.race=function(e){return o.Promise.race(e)},o.reject=function(e){return o.Promise.reject(e)},o.resolve=function(e){return o.Promise.resolve(e)},o.prototype.then=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).then.apply(e,t)},o.prototype.catch=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).catch.apply(e,t)},o.prototype.resolve=function(e){var t=this;return this.isFulfilled||(this._setResolved(),o.Promise.resolve().then(function(){return t._onResolve(e)}).then(function(e){t._resolveFunction(e)}).catch(function(e){t._resetState(),t.reject(e)})),this},o.prototype.reject=function(e){var t=this;return this.isFulfilled||(this._setRejected(),o.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(function(e){return t._rejectFunction(e)})),this},o.prototype._resetState=function(){this.isFulfilled=!1,this.isResolved=!1,this.isRejected=!1},o.prototype._setResolved=function(){this.isFulfilled=!0,this.isResolved=!0,this.isRejected=!1},o.prototype._setRejected=function(){this.isFulfilled=!0,this.isResolved=!1,this.isRejected=!0},o.Promise=r,o);function o(e){var n=this;"function"==typeof e?this._promise=new o.Promise(e):(this._promise=new o.Promise(function(e,t){n._resolveFunction=e,n._rejectFunction=t}),this._onResolve=(e=e||{}).onResolve||o.defaultOnResolve,this._onReject=e.onReject||o.defaultOnReject,o.shouldCatchExceptions(e)&&this._promise.catch(function(){}),this._resetState())}t.exports=r},{}],6:[function(e,t,n){"use strict";var r=e("./lib/set-attributes"),o=e("./lib/default-attributes"),i=e("./lib/assign");t.exports=function(e){void 0===e&&(e={});var t=document.createElement("iframe"),e=i.assign({},o.defaultAttributes,e);return e.style&&"string"!=typeof e.style&&(i.assign(t.style,e.style),delete e.style),r.setAttributes(t,e),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":7,"./lib/default-attributes":8,"./lib/set-attributes":9}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.assign=void 0,n.assign=function(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];return e.forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(e){n[e]=t[e]})}),n}},{}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.defaultAttributes=void 0,n.defaultAttributes={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],9:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.setAttributes=void 0,n.setAttributes=function(e,t){for(var n in t){var r;t.hasOwnProperty(n)&&(null==(r=t[n])?e.removeAttribute(n):e.setAttribute(n,r))}}},{}],10:[function(e,t,n){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.deferred=function(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{n.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.once=function(n){var r=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r||(r=!0,n.apply(void 0,e))}}},{}],13:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],14:[function(e,t,n){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),s=e("./lib/promise-or-callback");function a(r){return function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),s.promiseOrCallback(r.apply(this,t),e)}}a.wrapPrototype=function(r,e){var o=(e=void 0===e?{}:e).ignoreMethods||[],i=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(r.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof r.prototype[e],n=-1===o.indexOf(e),e=i||"_"!==e.charAt(0);return t&&e&&n}).forEach(function(e){var t=r.prototype[e];r.prototype[e]=a(t)}),r},t.exports=a},{"./lib/deferred":11,"./lib/once":12,"./lib/promise-or-callback":13}],15:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Framebus=void 0;var o=e("./lib/is-not-string"),a=e("./lib/subscription-args-invalid"),i=e("./lib/broadcast"),s=e("./lib/package-payload"),c=e("./lib/constants"),e="undefined"!=typeof window&&window.Promise;function u(e){this.origin=(e=void 0===e?{}:e).origin||"*",this.channel=e.channel||"",this.verifyDomain=e.verifyDomain,this.isDestroyed=!1,this.listeners=[]}u.setPromise=function(e){u.Promise=e},u.target=function(e){return new u(e)},u.prototype.include=function(e){return null!=e&&(null!=e.Window&&(e.constructor===e.Window&&(c.childWindows.push(e),!0)))},u.prototype.target=function(e){return u.target(e)},u.prototype.emit=function(e,t,n){if(this.isDestroyed)return!1;var r=this.origin;if(e=this.namespaceEvent(e),o.isntString(e))return!1;if(o.isntString(r))return!1;"function"==typeof t&&(n=t,t=void 0);e=s.packagePayload(e,r,t,n);return!!e&&(i.broadcast(window.top||window.self,e,r),!0)},u.prototype.emitAsPromise=function(n,r){var o=this;return new u.Promise(function(t,e){o.emit(n,r,function(e){t(e)})||e(new Error('Listener not added for "'+n+'"'))})},u.prototype.on=function(e,n){if(this.isDestroyed)return!1;var r=this,t=this.origin,o=n;return e=this.namespaceEvent(e),!a.subscriptionArgsInvalid(e,o,t)&&(this.verifyDomain&&(o=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r.checkOrigin(this&&this.origin)&&n.apply(void 0,e)}),this.listeners.push({eventName:e,handler:o,originalHandler:n}),c.subscribers[t]=c.subscribers[t]||{},c.subscribers[t][e]=c.subscribers[t][e]||[],c.subscribers[t][e].push(o),!0)},u.prototype.off=function(e,t){var n=t;if(!this.isDestroyed){if(this.verifyDomain)for(var r=0;r<this.listeners.length;r++){var o=this.listeners[r];o.originalHandler===t&&(n=o.handler)}e=this.namespaceEvent(e);var i=this.origin;if(!a.subscriptionArgsInvalid(e,n,i)){var s=c.subscribers[i]&&c.subscribers[i][e];if(s)for(r=0;r<s.length;r++)if(s[r]===n)return s.splice(r,1),!0}}return!1},u.prototype.teardown=function(){if(!this.isDestroyed){this.isDestroyed=!0;for(var e=0;e<this.listeners.length;e++){var t=this.listeners[e];this.off(t.eventName,t.handler)}this.listeners.length=0}},u.prototype.checkOrigin=function(e){var t,n=document.createElement("a");return n.href=location.href,t="https:"===n.protocol?n.host.replace(/:443$/,""):"http:"===n.protocol?n.host.replace(/:80$/,""):n.host,n.protocol+"//"+t===e||(!this.verifyDomain||this.verifyDomain(e))},u.prototype.namespaceEvent=function(e){return this.channel?this.channel+":"+e:e},u.Promise=e,n.Framebus=u},{"./lib/broadcast":19,"./lib/constants":20,"./lib/is-not-string":23,"./lib/package-payload":25,"./lib/subscription-args-invalid":27}],16:[function(e,t,n){"use strict";var r=e("./lib/attach"),e=e("./framebus");r.attach(),t.exports=e.Framebus},{"./framebus":15,"./lib/attach":17}],17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.detach=n.attach=void 0;var r=e("./message"),o=!1;n.attach=function(){o||"undefined"==typeof window||(o=!0,window.addEventListener("message",r.onmessage,!1))},n.detach=function(){o=!1,window.removeEventListener("message",r.onmessage,!1)}},{"./message":24}],18:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.broadcastToChildWindows=void 0;var i=e("./broadcast"),s=e("./constants");n.broadcastToChildWindows=function(e,t,n){for(var r=s.childWindows.length-1;0<=r;r--){var o=s.childWindows[r];o.closed?s.childWindows.splice(r,1):n!==o&&i.broadcast(o.top,e,t)}}},{"./broadcast":19,"./constants":20}],19:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.broadcast=void 0;var s=e("./has-opener");n.broadcast=function e(t,n,r){var o,i=0;try{for(t.postMessage(n,r),s.hasOpener(t)&&t.opener.top!==window.top&&e(t.opener.top,n,r);o=t.frames[i];)e(o,n,r),i++}catch(e){}}},{"./has-opener":22}],20:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.subscribers=n.childWindows=n.prefix=void 0,n.prefix="/*framebus*/",n.childWindows=[],n.subscribers={}},{}],21:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.dispatch=void 0;var a=e("./constants");n.dispatch=function(e,t,n,r,o){if(a.subscribers[e]&&a.subscribers[e][t]){var i=[];n&&i.push(n),r&&i.push(r);for(var s=0;s<a.subscribers[e][t].length;s++)a.subscribers[e][t][s].apply(o,i)}}},{"./constants":20}],22:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.hasOpener=void 0,n.hasOpener=function(e){return e.top===e&&(null!=e.opener&&(e.opener!==e&&!0!==e.opener.closed))}},{}],23:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.isntString=void 0,n.isntString=function(e){return"string"!=typeof e}},{}],24:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.onmessage=void 0;var o=e("./is-not-string"),i=e("./unpack-payload"),s=e("./dispatch"),a=e("./broadcast-to-child-windows");n.onmessage=function(e){var t,n,r;o.isntString(e.data)||(t=i.unpackPayload(e))&&(n=t.eventData,r=t.reply,s.dispatch("*",t.event,n,r,e),s.dispatch(e.origin,t.event,n,r,e),a.broadcastToChildWindows(e.data,t.origin,e.source))}},{"./broadcast-to-child-windows":18,"./dispatch":21,"./is-not-string":23,"./unpack-payload":28}],25:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.packagePayload=void 0;var i=e("./subscribe-replier"),s=e("./constants");n.packagePayload=function(e,t,n,r){var o,e={event:e,origin:t};"function"==typeof r&&(e.reply=i.subscribeReplier(r,t)),e.eventData=n;try{o=s.prefix+JSON.stringify(e)}catch(e){throw new Error("Could not stringify event: "+e.message)}return o}},{"./constants":20,"./subscribe-replier":26}],26:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},s=(Object.defineProperty(n,"__esModule",{value:!0}),n.subscribeReplier=void 0,e("../framebus")),a=r(e("@braintree/uuid"));n.subscribeReplier=function(r,o){var i=a.default();return s.Framebus.target({origin:o}).on(i,function e(t,n){r(t,n),s.Framebus.target({origin:o}).off(i,e)}),i}},{"../framebus":15,"@braintree/uuid":10}],27:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.subscriptionArgsInvalid=void 0;var r=e("./is-not-string");n.subscriptionArgsInvalid=function(e,t,n){return!!r.isntString(e)||("function"!=typeof t||r.isntString(n))}},{"./is-not-string":23}],28:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.unpackPayload=void 0;var i=e("./constants"),s=e("./package-payload");n.unpackPayload=function(e){var t,n,r,o;if(e.data.slice(0,i.prefix.length)!==i.prefix)return!1;try{t=JSON.parse(e.data.slice(i.prefix.length))}catch(e){return!1}return t.reply&&(n=e.origin,r=e.source,o=t.reply,t.reply=function(e){!r||(e=s.packagePayload(o,n,e))&&r.postMessage(e,n)}),t}},{"./constants":20,"./package-payload":25}],29:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function s(n,r){for(;3===n._state;)n=n._value;0===n._state?n._deferreds.push(r):(n._handled=!0,i._immediateFn(function(){var e,t=1===n._state?r.onFulfilled:r.onRejected;if(null===t)(1===n._state?a:u)(r.promise,n._value);else{try{e=t(n._value)}catch(e){return void u(r.promise,e)}a(r.promise,e)}}))}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void p(t);if("function"==typeof n)return void l((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,p(t)}catch(e){u(t,e)}var r,o}function u(e,t){e._state=2,e._value=t,p(e)}function p(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)s(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){if(n)return;n=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return s(this,new d(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(o,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var s=Array.prototype.slice.call(t);if(0===s.length)return o([]);var a=s.length;for(var e=0;e<s.length;e++)!function t(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},i)}s[n]=e,0==--a&&o(s)}catch(e){i(e)}}(e,s[e])})},i.allSettled=function(n){return new this(function(o,e){if(!n||void 0===n.length)return e(new TypeError(typeof n+" "+n+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(n);if(0===i.length)return o([]);var s=i.length;for(var t=0;t<i.length;t++)!function t(n,e){if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},function(e){i[n]={status:"rejected",reason:e},0==--s&&o(i)})}i[n]={status:"fulfilled",value:e},0==--s&&o(i)}(t,i[t])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=o.length;n<r;n++)i.resolve(o[n]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],30:[function(e,t,n){"use strict";var i=e("./create-authorization-data"),s=e("./json-clone"),a=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},t=i(e.authorization).attrs,o=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=a.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(o[n]=r._meta[n]);return r._meta=o,t.tokenizationKey?r.tokenizationKey=t.tokenizationKey:r.authorizationFingerprint=t.authorizationFingerprint,r}},{"./constants":36,"./create-authorization-data":39,"./json-clone":44}],31:[function(e,t,n){"use strict";var r=e("./promise"),a=e("./constants"),c=e("./add-metadata");t.exports={sendEvent:function(e,o,i){var s=Date.now();return r.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),e=e._request,r=n.gatewayConfiguration.analytics.url,t={analytics:[{kind:a.ANALYTICS_PREFIX+o,isAsync:Math.floor(t/1e3)!==Math.floor(s/1e3),timestamp:s}]};e({url:r,method:"post",data:c(n,t),timeout:a.ANALYTICS_REQUEST_TIMEOUT_MS},i)}).catch(function(e){i&&i(e)})}}},{"./add-metadata":30,"./constants":36,"./promise":46}],32:[function(e,t,n){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],33:[function(e,t,n){"use strict";var r="function"==typeof Object.assign?Object.assign:o;function o(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])t.hasOwnProperty(n)&&(e[n]=t[n]);return e}t.exports={assign:r,_assign:o}},{}],34:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./errors");t.exports={verify:function(e){var t,n;return e?(n=e.name,t=e.client,e=e.authorization,t||e?e||"3.88.0"===t.getVersion()?o.resolve():o.reject(new r({type:i.INCOMPATIBLE_VERSIONS.type,code:i.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+n+" (version 3.88.0) components must be from the same SDK version."})):o.reject(new r({type:i.INSTANTIATION_OPTION_REQUIRED.type,code:i.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+n+"."}))):o.reject(new r({type:i.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:i.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":35,"./errors":42,"./promise":46}],35:[function(e,t,n){"use strict";e=e("./enumerate");function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((r.prototype=Object.create(Error.prototype)).constructor=r).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(e){return e instanceof r&&e.details&&e.details.originalError?r.findRootError(e.details.originalError):e},t.exports=r},{"./enumerate":41}],36:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.88.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.88.0"}},{}],37:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":35,"./errors":42}],38:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":36}],39:[function(e,t,n){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(n=(t=(t=e).split("_"))[0],t={merchantId:t.slice(2).join("_"),environment:n},r.environment=t.environment,r.attrs.tokenizationKey=e,r.configUrl=i[t.environment]+"/merchants/"+t.merchantId+"/client_api/v1/configuration"):(n=JSON.parse(o(e)),r.environment=n.environment,r.attrs.authorizationFingerprint=n.authorizationFingerprint,r.configUrl=n.configUrl,r.graphQL=n.graphQL),r}},{"../lib/constants":36,"../lib/vendor/polyfill":48}],40:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./promise"),i=e("./assets"),s=e("./errors"),a="3.88.0";t.exports={create:function(e){var t=o.resolve();return e.client?o.resolve(e.client):(t=window.braintree&&window.braintree.client?t:i.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return o.reject(new r({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})).then(function(){return window.braintree.client.VERSION!==a?o.reject(new r({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})})}}},{"./assets":32,"./braintree-error":35,"./errors":42,"./promise":46}],41:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],42:[function(e,t,n){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":35}],43:[function(e,t,n){"use strict";var r=e("./assign").assign;function a(e,t){var n=e.analyticsMetadata,e={gateway:"braintree","braintree:merchantId":e.gatewayConfiguration.merchantId,"braintree:apiVersion":"v1","braintree:sdkVersion":"3.88.0","braintree:metadata":JSON.stringify({source:n.source,integration:n.integration,sessionId:n.sessionId,version:"3.88.0",platform:n.platform})};return r({},e,t)}t.exports=function(e,t,n){var r,o,i=e.gatewayConfiguration.androidPay,s="production"===e.gatewayConfiguration.environment?"PRODUCTION":"TEST";return 2===t?(r={apiVersion:2,apiVersionMinor:0,environment:s,allowedPaymentMethods:[{type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:i.supportedNetworks.map(function(e){return e.toUpperCase()})},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:a(e,{"braintree:authorizationFingerprint":i.googleAuthorizationFingerprint})}}]},n&&(r.merchantInfo={merchantId:n}),i.paypalClientId&&(o={type:"PAYPAL",parameters:{purchase_context:{purchase_units:[{payee:{client_id:i.paypalClientId},recurring_payment:!0}]}},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:a(e,{"braintree:paypalClientId":i.paypalClientId})}},r.allowedPaymentMethods.push(o))):(r={environment:s,allowedPaymentMethods:["CARD","TOKENIZED_CARD"],paymentMethodTokenizationParameters:{tokenizationType:"PAYMENT_GATEWAY",parameters:a(e,{"braintree:authorizationFingerprint":i.googleAuthorizationFingerprint})},cardRequirements:{allowedCardNetworks:i.supportedNetworks.map(function(e){return e.toUpperCase()})}},"TOKENIZATION_KEY"===e.authorizationType&&(r.paymentMethodTokenizationParameters.parameters["braintree:clientKey"]=e.authorization),n&&(r.merchantId=n),t&&(r.apiVersion=t)),r}},{"./assign":33}],44:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],45:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],46:[function(e,t,n){"use strict";var r=e("promise-polyfill"),e=e("@braintree/extended-promise"),r="undefined"!=typeof Promise?Promise:r;e.suppressUnhandledPromiseMessage=!0,e.setPromise(r),t.exports=r},{"@braintree/extended-promise":5,"promise-polyfill":29}],47:[function(e,t,n){"use strict";t.exports=function(e){return e?"":".min"}},{}],48:[function(e,t,n){"use strict";var r="function"==typeof atob?atob:o;function o(e){var t,n,r,o,i,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(i=0;n=s.indexOf(e.charAt(i++)),t=(15&(r=s.indexOf(e.charAt(i++))))<<4|(o=s.indexOf(e.charAt(i++)))>>2&15,o=(3&o)<<6|63&s.indexOf(e.charAt(i++)),a+=String.fromCharCode((63&n)<<2|r>>4&3)+(t?String.fromCharCode(t):"")+(o?String.fromCharCode(o):""),i<e.length;);return a}t.exports={atob:function(e){return r.call(window,e)},_atob:o}},{}],49:[function(e,t,n){"use strict";var s=e("../../lib/analytics"),r=e("../../lib/assign").assign,o=e("framebus"),i=e("../../lib/convert-methods-to-error"),a=e("../../lib/generate-google-pay-configuration"),c=e("@braintree/iframer"),u=e("@braintree/uuid"),p=e("../../lib/use-min"),d=e("../../lib/methods"),l=e("../../lib/promise"),f=e("@braintree/event-emitter"),_=e("../../lib/braintree-error"),E=e("../shared/constants"),h=E.events,T=E.errors,e=e("@braintree/wrap-promise"),y={Visa:"visa",MasterCard:"mastercard","American Express":"amex","Diners Club":"diners",Discover:"discover",JCB:"jcb",UnionPay:"unionpay",Maestro:"maestro"};function m(e){var t=e.enabledPaymentMethods||{};f.call(this),this._componentId=u(),this._client=e.client,this._enabledPaymentMethods={basicCard:!1!==t.basicCard,googlePay:!1!==t.googlePay},this._googlePayVersion=2===e.googlePayVersion?2:1,this._googleMerchantId="18278000977346790994",this._supportedPaymentMethods=this._constructDefaultSupportedPaymentMethods(),this._defaultSupportedPaymentMethods=Object.keys(this._supportedPaymentMethods).map(function(e){return this._supportedPaymentMethods[e]}.bind(this)),this._bus=new o({channel:this._componentId})}f.createChild(m),m.prototype._constructDefaultSupportedPaymentMethods=function(){var e=this._client.getConfiguration(),t=e.gatewayConfiguration.androidPay,n=e.gatewayConfiguration.creditCards,r={};return this._enabledPaymentMethods.basicCard&&n&&0<n.supportedCardTypes.length&&(r.basicCard={supportedMethods:"basic-card",data:{supportedNetworks:n.supportedCardTypes.reduce(function(e,t){return t in y&&e.push(y[t]),e},[])}}),this._enabledPaymentMethods.googlePay&&t&&t.enabled&&(r.googlePay={supportedMethods:"https://google.com/pay",data:a(e,this._googlePayVersion,this._googleMerchantId)}),r},m.prototype.initialize=function(){var o=this._client.getConfiguration(),i=this;return this._frame=c({allowPaymentRequest:!0,name:"braintree-payment-request-frame",class:"braintree-payment-request-frame",height:0,width:0,style:{position:"absolute",left:"-9999px"},title:"Secure Payment Frame"}),0===this._defaultSupportedPaymentMethods.length?l.reject(new _(T.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS)):new l(function(e){var t,n,r;i._bus.on(h.FRAME_READY,function(e){e(i._client)}),i._bus.on(h.FRAME_CAN_MAKE_REQUESTS,function(){s.sendEvent(i._client,"payment-request.initialized"),i._bus.on(h.SHIPPING_ADDRESS_CHANGE,function(e){e={target:{shippingAddress:e},updateWith:function(e){i._bus.emit(h.UPDATE_SHIPPING_ADDRESS,e)}};i._emit("shippingAddressChange",e),i._emit("shippingaddresschange",e)}),i._bus.on(h.SHIPPING_OPTION_CHANGE,function(e){e={target:{shippingOption:e},updateWith:function(e){i._bus.emit(h.UPDATE_SHIPPING_OPTION,e)}};i._emit("shippingOptionChange",e),i._emit("shippingoptionchange",e)}),e(i)}),i._frame.src=(t=o.gatewayConfiguration.assetsUrl,n=i._componentId,r=o.isDebug,t+"/web/3.88.0/html/payment-request-frame"+p(r)+".html#"+n),document.body.appendChild(i._frame)})},m.prototype.createSupportedPaymentMethodsConfiguration=function(e,t){if(!e)throw new _(T.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE);if(this._enabledPaymentMethods[e])return(e=r({},this._supportedPaymentMethods[e])).data=r({},e.data,t),e;throw new _(T.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED)},m.prototype.tokenize=function(e){var o=this;return new l(function(n,r){o._bus.emit(h.PAYMENT_REQUEST_INITIALIZED,{supportedPaymentMethods:e.supportedPaymentMethods||o._defaultSupportedPaymentMethods,details:e.details,options:e.options},function(e){var t=e[0],e=e[1];t?r(o._formatTokenizationError(t)):(s.sendEvent(o._client,"payment-request.tokenize.succeeded"),n({nonce:e.nonce,type:e.type,description:e.description,details:{rawPaymentResponse:e.details.rawPaymentResponse,cardType:e.details.cardType,lastFour:e.details.lastFour,lastTwo:e.details.lastTwo},binData:e.binData}))})})},m.prototype.canMakePayment=function(e){var t,o=this;return window.PaymentRequest?e.supportedPaymentMethods&&(e.supportedPaymentMethods.forEach(function(e){e=e.supportedMethods;e in E.SUPPORTED_METHODS||(t=e)}),t)?l.reject(new _({type:T.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.type,code:T.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.code,message:t+" is not a supported payment method."})):new l(function(n,r){o._bus.emit(h.CAN_MAKE_PAYMENT,{supportedPaymentMethods:e.supportedPaymentMethods||o._defaultSupportedPaymentMethods,details:e.details,options:e.options},function(e){var t=e[0],e=e[1];t?r(o._formatCanMakePaymentError(t)):(s.sendEvent(o._client,"payment-request.can-make-payment."+e),n(e))})}):(s.sendEvent(o._client,"payment-request.can-make-payment.not-available"),l.resolve(!1))},m.prototype.teardown=function(){return this._bus.teardown(),this._frame.parentNode.removeChild(this._frame),i(this,d(m.prototype)),s.sendEvent(this._client,"payment-request.teardown-completed"),l.resolve()},m.prototype._formatTokenizationError=function(e){var t;switch(e.name){case"AbortError":return t=new _({type:T.PAYMENT_REQUEST_CANCELED.type,code:T.PAYMENT_REQUEST_CANCELED.code,message:T.PAYMENT_REQUEST_CANCELED.message,details:{originalError:e}}),s.sendEvent(this._client,"payment-request.tokenize.canceled"),t;case"PAYMENT_REQUEST_INITIALIZATION_FAILED":t=new _({type:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}});break;case"BRAINTREE_GATEWAY_GOOGLE_PAYMENT_TOKENIZATION_ERROR":t=new _({type:T.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.type,code:T.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.code,message:T.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.message,details:{originalError:e}});break;case"BRAINTREE_GATEWAY_GOOGLE_PAYMENT_PARSING_ERROR":t=new _({type:T.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.type,code:T.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.code,message:T.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.message,details:{originalError:e}});break;default:t=new _({code:T.PAYMENT_REQUEST_NOT_COMPLETED.code,type:e.type||_.types.CUSTOMER,message:T.PAYMENT_REQUEST_NOT_COMPLETED.message,details:{originalError:e}})}return s.sendEvent(this._client,"payment-request.tokenize.failed"),t},m.prototype._formatCanMakePaymentError=function(e){var t;switch(e.name){case"PAYMENT_REQUEST_INITIALIZATION_FAILED":t=new _({type:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:T.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}});break;case"NotAllowedError":t=new _({type:T.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.type,code:T.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.code,message:T.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.message,details:{originalError:e}});break;default:t=new _({code:T.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.code,type:T.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.type,message:T.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.message,details:{originalError:e}})}return s.sendEvent(this._client,"payment-request.can-make-payment.failed"),t},t.exports=e.wrapPrototype(m)},{"../../lib/analytics":31,"../../lib/assign":33,"../../lib/braintree-error":35,"../../lib/convert-methods-to-error":37,"../../lib/generate-google-pay-configuration":43,"../../lib/methods":45,"../../lib/promise":46,"../../lib/use-min":47,"../shared/constants":51,"@braintree/event-emitter":4,"@braintree/iframer":6,"@braintree/uuid":10,"@braintree/wrap-promise":14,framebus:16}],50:[function(e,t,n){"use strict";var r=e("./external/payment-request"),o=e("../lib/basic-component-verification"),i=e("../lib/create-deferred-client"),s=e("../lib/create-assets-url"),e=e("@braintree/wrap-promise");t.exports={create:e(function(t){var e="Payment Request";return o.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return i.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:s.create(t.authorization),name:e})}).then(function(e){return t.client=e,new r(t).initialize()})}),VERSION:"3.88.0"}},{"../lib/basic-component-verification":34,"../lib/create-assets-url":38,"../lib/create-deferred-client":40,"./external/payment-request":49,"@braintree/wrap-promise":14}],51:[function(e,t,n){"use strict";var r=e("../../lib/enumerate"),e=e("./errors"),o={};o.events=r(["CAN_MAKE_PAYMENT","FRAME_READY","FRAME_CAN_MAKE_REQUESTS","PAYMENT_REQUEST_INITIALIZED","SHIPPING_ADDRESS_CHANGE","UPDATE_SHIPPING_ADDRESS","SHIPPING_OPTION_CHANGE","UPDATE_SHIPPING_OPTION"],"payment-request:"),o.errors=e,o.SUPPORTED_METHODS={"basic-card":!0,"https://google.com/pay":!0},t.exports=o},{"../../lib/enumerate":41,"./errors":52}],52:[function(e,t,n){"use strict";e=e("../../lib/braintree-error");t.exports={PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS",message:"There are no supported payment methods associated with this account."},PAYMENT_REQUEST_CANCELED:{type:e.types.CUSTOMER,code:"PAYMENT_REQUEST_CANCELED",message:"Payment request was canceled."},PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED",message:"Something went wrong when configuring the payment request."},PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED:{type:e.types.UNKNOWN,code:"PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED",message:"Something went wrong when calling `canMakePayment`"},PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED",message:"Something went wrong when calling `canMakePayment`. Most likely, `canMakePayment` was called multiple times with different supportedMethods configurations."},PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD"},PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE",message:"Something went wrong when tokenizing the Google Pay card."},PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR:{type:e.types.UNKNOWN,code:"PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR",message:"Something went wrong when tokenizing the Google Pay card."},PAYMENT_REQUEST_NOT_COMPLETED:{code:"PAYMENT_REQUEST_NOT_COMPLETED",message:"Payment request could not be completed."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE",message:"createSupportedPaymentMethodsConfiguration must include a type parameter."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED",message:"createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled."}}},{"../../lib/braintree-error":35}]},{},[50])(50)});