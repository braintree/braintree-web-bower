!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).unionpay=e()}(function(){return function r(i,o,s){function a(t,e){if(!o[t]){if(!i[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=o[t]={exports:{}},i[t][0].call(n.exports,function(e){return a(i[t][1][e]||e)},n,n.exports,r,i,o,s)}return o[t].exports}for(var c="function"==typeof require&&require,e=0;e<s.length;e++)a(s[e]);return a}({1:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},r=(Object.defineProperty(n,"__esModule",{value:!0}),n.PromiseGlobal=void 0,r(e("promise-polyfill"))),e="undefined"!=typeof Promise?Promise:r.default;n.PromiseGlobal=e},{"promise-polyfill":29}],2:[function(e,t,n){"use strict";var s=e("./lib/promise"),a={};function r(n){var e,r,t,i,o=JSON.stringify(n);return!n.forceScriptReload&&(e=a[o])||(r=document.createElement("script"),t=n.dataAttributes||{},i=n.container||document.head,r.src=n.src,r.id=n.id||"",r.async=!0,n.crossorigin&&r.setAttribute("crossorigin",""+n.crossorigin),Object.keys(t).forEach(function(e){r.setAttribute("data-"+e,""+t[e])}),e=new s.PromiseGlobal(function(e,t){r.addEventListener("load",function(){e(r)}),r.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),r.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),i.appendChild(r)}),a[o]=e),e}r.clearCache=function(){a={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,n){"use strict";var r="undefined"!=typeof Promise?Promise:null,r=(i.defaultOnResolve=function(e){return i.Promise.resolve(e)},i.defaultOnReject=function(e){return i.Promise.reject(e)},i.setPromise=function(e){i.Promise=e},i.shouldCatchExceptions=function(e){return e.hasOwnProperty("suppressUnhandledPromiseMessage")?Boolean(e.suppressUnhandledPromiseMessage):Boolean(i.suppressUnhandledPromiseMessage)},i.all=function(e){return i.Promise.all(e)},i.allSettled=function(e){return i.Promise.allSettled(e)},i.race=function(e){return i.Promise.race(e)},i.reject=function(e){return i.Promise.reject(e)},i.resolve=function(e){return i.Promise.resolve(e)},i.prototype.then=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).then.apply(e,t)},i.prototype.catch=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return(e=this._promise).catch.apply(e,t)},i.prototype.resolve=function(e){var t=this;return this.isFulfilled||(this._setResolved(),i.Promise.resolve().then(function(){return t._onResolve(e)}).then(function(e){t._resolveFunction(e)}).catch(function(e){t._resetState(),t.reject(e)})),this},i.prototype.reject=function(e){var t=this;return this.isFulfilled||(this._setRejected(),i.Promise.resolve().then(function(){return t._onReject(e)}).then(function(e){t._setResolved(),t._resolveFunction(e)}).catch(function(e){return t._rejectFunction(e)})),this},i.prototype._resetState=function(){this.isFulfilled=!1,this.isResolved=!1,this.isRejected=!1},i.prototype._setResolved=function(){this.isFulfilled=!0,this.isResolved=!0,this.isRejected=!1},i.prototype._setRejected=function(){this.isFulfilled=!0,this.isResolved=!1,this.isRejected=!0},i.Promise=r,i);function i(e){var n=this;"function"==typeof e?this._promise=new i.Promise(e):(this._promise=new i.Promise(function(e,t){n._resolveFunction=e,n._rejectFunction=t}),this._onResolve=(e=e||{}).onResolve||i.defaultOnResolve,this._onReject=e.onReject||i.defaultOnReject,i.shouldCatchExceptions(e)&&this._promise.catch(function(){}),this._resetState())}t.exports=r},{}],5:[function(e,t,n){"use strict";var r=e("./lib/set-attributes"),i=e("./lib/default-attributes"),o=e("./lib/assign");t.exports=function(e){void 0===e&&(e={});var t=document.createElement("iframe"),e=o.assign({},i.defaultAttributes,e);return e.style&&"string"!=typeof e.style&&(o.assign(t.style,e.style),delete e.style),r.setAttributes(t,e),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":6,"./lib/default-attributes":7,"./lib/set-attributes":8}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.assign=void 0,n.assign=function(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];return e.forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(e){n[e]=t[e]})}),n}},{}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.defaultAttributes=void 0,n.defaultAttributes={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.setAttributes=void 0,n.setAttributes=function(e,t){for(var n in t){var r;t.hasOwnProperty(n)&&(null==(r=t[n])?e.removeAttribute(n):e.setAttribute(n,r))}}},{}],9:[function(e,t,n){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.deferred=function(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{n.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.once=function(n){var r=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r||(r=!0,n.apply(void 0,e))}}},{}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],13:[function(e,t,n){"use strict";var i=e("./lib/deferred"),o=e("./lib/once"),s=e("./lib/promise-or-callback");function a(r){return function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o.once(i.deferred(e))),s.promiseOrCallback(r.apply(this,t),e)}}a.wrapPrototype=function(r,e){var i=(e=void 0===e?{}:e).ignoreMethods||[],o=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(r.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof r.prototype[e],n=-1===i.indexOf(e),e=o||"_"!==e.charAt(0);return t&&e&&n}).forEach(function(e){var t=r.prototype[e];r.prototype[e]=a(t)}),r},t.exports=a},{"./lib/deferred":10,"./lib/once":11,"./lib/promise-or-callback":12}],14:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Framebus=void 0;var o=e("./lib/is-not-string"),a=e("./lib/subscription-args-invalid"),s=e("./lib/broadcast"),c=e("./lib/package-payload"),u=e("./lib/send-message"),l=e("./lib/constants"),e="undefined"!=typeof window&&window.Promise;function d(e){this.origin=(e=void 0===e?{}:e).origin||"*",this.channel=e.channel||"",this.verifyDomain=e.verifyDomain,this.targetFrames=e.targetFrames||[],this.limitBroadcastToFramesArray=Boolean(e.targetFrames),this.isDestroyed=!1,this.listeners=[],this.hasAdditionalChecksForOnListeners=Boolean(this.verifyDomain||this.limitBroadcastToFramesArray)}d.setPromise=function(e){d.Promise=e},d.target=function(e){return new d(e)},d.prototype.addTargetFrame=function(e){this.limitBroadcastToFramesArray&&this.targetFrames.push(e)},d.prototype.include=function(e){return null!=e&&(null!=e.Window&&(e.constructor===e.Window&&(l.childWindows.push(e),!0)))},d.prototype.target=function(e){return d.target(e)},d.prototype.emit=function(e,t,n){if(this.isDestroyed)return!1;var r=this.origin;if(e=this.namespaceEvent(e),(0,o.isntString)(e))return!1;if((0,o.isntString)(r))return!1;"function"==typeof t&&(n=t,t=void 0);var i=(0,c.packagePayload)(e,r,t,n);return!!i&&(this.limitBroadcastToFramesArray?this.targetFramesAsWindows().forEach(function(e){(0,u.sendMessage)(e,i,r)}):(0,s.broadcast)(i,{origin:r,frame:window.top||window.self}),!0)},d.prototype.emitAsPromise=function(n,r){var i=this;return new d.Promise(function(t,e){i.emit(n,r,function(e){t(e)})||e(new Error('Listener not added for "'.concat(n,'"')))})},d.prototype.on=function(e,n){var r,t,i;return!this.isDestroyed&&(t=(r=this).origin,i=n,e=this.namespaceEvent(e),!(0,a.subscriptionArgsInvalid)(e,i,t)&&(this.hasAdditionalChecksForOnListeners&&(i=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r.passesVerifyDomainCheck(this&&this.origin)&&r.hasMatchingTargetFrame(this&&this.source)&&n.apply(void 0,e)}),this.listeners.push({eventName:e,handler:i,originalHandler:n}),l.subscribers[t]=l.subscribers[t]||{},l.subscribers[t][e]=l.subscribers[t][e]||[],l.subscribers[t][e].push(i),!0))},d.prototype.off=function(e,t){var n=t;if(!this.isDestroyed){if(this.verifyDomain)for(var r=0;r<this.listeners.length;r++){var i=this.listeners[r];i.originalHandler===t&&(n=i.handler)}e=this.namespaceEvent(e);var o=this.origin;if(!(0,a.subscriptionArgsInvalid)(e,n,o)){var s=l.subscribers[o]&&l.subscribers[o][e];if(s)for(r=0;r<s.length;r++)if(s[r]===n)return s.splice(r,1),!0}}return!1},d.prototype.teardown=function(){if(!this.isDestroyed){this.isDestroyed=!0;for(var e=0;e<this.listeners.length;e++){var t=this.listeners[e];this.off(t.eventName,t.handler)}this.listeners.length=0}},d.prototype.passesVerifyDomainCheck=function(e){return!this.verifyDomain||this.checkOrigin(e)},d.prototype.targetFramesAsWindows=function(){return this.limitBroadcastToFramesArray?this.targetFrames.map(function(e){return e instanceof HTMLIFrameElement?e.contentWindow:e}).filter(function(e){return e}):[]},d.prototype.hasMatchingTargetFrame=function(t){var e;return!this.limitBroadcastToFramesArray||(e=this.targetFramesAsWindows().find(function(e){return e===t}),Boolean(e))},d.prototype.checkOrigin=function(e){var t,n=document.createElement("a");return n.href=location.href,t="https:"===n.protocol?n.host.replace(/:443$/,""):"http:"===n.protocol?n.host.replace(/:80$/,""):n.host,n.protocol+"//"+t===e||(!this.verifyDomain||this.verifyDomain(e))},d.prototype.namespaceEvent=function(e){return this.channel?"".concat(this.channel,":").concat(e):e},d.Promise=e,n.Framebus=d},{"./lib/broadcast":18,"./lib/constants":19,"./lib/is-not-string":22,"./lib/package-payload":24,"./lib/send-message":25,"./lib/subscription-args-invalid":27}],15:[function(e,t,n){"use strict";var r=e("./lib/attach"),e=e("./framebus");(0,r.attach)(),t.exports=e.Framebus},{"./framebus":14,"./lib/attach":16}],16:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.detach=n.attach=void 0;var r=e("./message"),i=!1;n.attach=function(){i||"undefined"==typeof window||(i=!0,window.addEventListener("message",r.onmessage,!1))},n.detach=function(){i=!1,window.removeEventListener("message",r.onmessage,!1)}},{"./message":23}],17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.broadcastToChildWindows=void 0;var o=e("./broadcast"),s=e("./constants");n.broadcastToChildWindows=function(e,t,n){for(var r=s.childWindows.length-1;0<=r;r--){var i=s.childWindows[r];i.closed?s.childWindows.splice(r,1):n!==i&&(0,o.broadcast)(e,{origin:t,frame:i.top})}}},{"./broadcast":18,"./constants":19}],18:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.broadcast=void 0;var a=e("./has-opener");n.broadcast=function e(t,n){var r,i=0,o=n.origin,s=n.frame;try{for(s.postMessage(t,o),(0,a.hasOpener)(s)&&s.opener.top!==window.top&&e(t,{origin:o,frame:s.opener.top});r=s.frames[i];)e(t,{origin:o,frame:r}),i++}catch(e){}}},{"./has-opener":21}],19:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.subscribers=n.childWindows=n.prefix=void 0,n.prefix="/*framebus*/",n.childWindows=[],n.subscribers={}},{}],20:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.dispatch=void 0;var a=e("./constants");n.dispatch=function(e,t,n,r,i){if(a.subscribers[e]&&a.subscribers[e][t]){var o=[];n&&o.push(n),r&&o.push(r);for(var s=0;s<a.subscribers[e][t].length;s++)a.subscribers[e][t][s].apply(i,o)}}},{"./constants":19}],21:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.hasOpener=void 0,n.hasOpener=function(e){return e.top===e&&(null!=e.opener&&(e.opener!==e&&!0!==e.opener.closed))}},{}],22:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.isntString=void 0,n.isntString=function(e){return"string"!=typeof e}},{}],23:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.onmessage=void 0;var i=e("./is-not-string"),o=e("./unpack-payload"),s=e("./dispatch"),a=e("./broadcast-to-child-windows");n.onmessage=function(e){var t,n,r;(0,i.isntString)(e.data)||(t=(0,o.unpackPayload)(e))&&(n=t.eventData,r=t.reply,(0,s.dispatch)("*",t.event,n,r,e),(0,s.dispatch)(e.origin,t.event,n,r,e),(0,a.broadcastToChildWindows)(e.data,t.origin,e.source))}},{"./broadcast-to-child-windows":17,"./dispatch":20,"./is-not-string":22,"./unpack-payload":28}],24:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.packagePayload=void 0;var o=e("./subscribe-replier"),s=e("./constants");n.packagePayload=function(e,t,n,r){var i,e={event:e,origin:t};"function"==typeof r&&(e.reply=(0,o.subscribeReplier)(r,t)),e.eventData=n;try{i=s.prefix+JSON.stringify(e)}catch(e){throw new Error("Could not stringify event: ".concat(e.message))}return i}},{"./constants":19,"./subscribe-replier":26}],25:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sendMessage=void 0,n.sendMessage=function(e,t,n){try{e.postMessage(t,n)}catch(e){}}},{}],26:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},s=(Object.defineProperty(n,"__esModule",{value:!0}),n.subscribeReplier=void 0,e("../framebus")),a=r(e("@braintree/uuid"));n.subscribeReplier=function(r,i){var o=(0,a.default)();return s.Framebus.target({origin:i}).on(o,function e(t,n){r(t,n),s.Framebus.target({origin:i}).off(o,e)}),o}},{"../framebus":14,"@braintree/uuid":9}],27:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.subscriptionArgsInvalid=void 0;var r=e("./is-not-string");n.subscriptionArgsInvalid=function(e,t,n){return!!(0,r.isntString)(e)||("function"!=typeof t||(0,r.isntString)(n))}},{"./is-not-string":22}],28:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.unpackPayload=void 0;var o=e("./constants"),s=e("./package-payload");n.unpackPayload=function(e){var t,n,r,i;if(e.data.slice(0,o.prefix.length)!==o.prefix)return!1;try{t=JSON.parse(e.data.slice(o.prefix.length))}catch(e){return!1}return t.reply&&(n=e.origin,r=e.source,i=t.reply,t.reply=function(e){!r||(e=(0,s.packagePayload)(i,n,e))&&r.postMessage(e,n)}),t}},{"./constants":19,"./package-payload":24}],29:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function i(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function s(n,r){for(;3===n._state;)n=n._value;0===n._state?n._deferreds.push(r):(n._handled=!0,o._immediateFn(function(){var e,t=1===n._state?r.onFulfilled:r.onRejected;if(null===t)(1===n._state?a:u)(r.promise,n._value);else{try{e=t(n._value)}catch(e){return void u(r.promise,e)}a(r.promise,e)}}))}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof o)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f((r=n,i=e,function(){r.apply(i,arguments)}),t)}t._state=1,t._value=e,l(t)}catch(e){u(t,e)}var r,i}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)s(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function f(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){n||(n=!0,u(t,e))}}o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var n=new this.constructor(i);return s(this,new d(e,t,n)),n},o.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},o.all=function(t){return new o(function(i,o){if(!c(t))return o(new TypeError("Promise.all accepts an array"));var s=Array.prototype.slice.call(t);if(0===s.length)return i([]);var a=s.length;for(var e=0;e<s.length;e++)!function t(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},o)}s[n]=e,0==--a&&i(s)}catch(e){o(e)}}(e,s[e])})},o.allSettled=function(n){return new this(function(i,e){if(!n||void 0===n.length)return e(new TypeError(typeof n+" "+n+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var o=Array.prototype.slice.call(n);if(0===o.length)return i([]);var s=o.length;for(var t=0;t<o.length;t++)!function t(n,e){if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},function(e){o[n]={status:"rejected",reason:e},0==--s&&i(o)})}o[n]={status:"fulfilled",value:e},0==--s&&i(o)}(t,o[t])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(n){return new o(function(e,t){t(n)})},o.race=function(i){return new o(function(e,t){if(!c(i))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=i.length;n<r;n++)o.resolve(i[n]).then(e,t)})},o._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){r(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=o},{}],30:[function(e,t,n){"use strict";var o=e("./create-authorization-data"),s=e("./json-clone"),a=e("./constants");t.exports=function(e,t){var n,r=t?s(t):{},t=o(e.authorization).attrs,i=s(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=a.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(i[n]=r._meta[n]);return r._meta=i,t.tokenizationKey?r.tokenizationKey=t.tokenizationKey:r.authorizationFingerprint=t.authorizationFingerprint,r}},{"./constants":35,"./create-authorization-data":38,"./json-clone":43}],31:[function(e,t,n){"use strict";var r=e("./promise"),a=e("./constants"),c=e("./add-metadata");t.exports={sendEvent:function(e,i,o){var s=Date.now();return r.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),e=e._request,r=n.gatewayConfiguration.analytics.url,t={analytics:[{kind:a.ANALYTICS_PREFIX+i,isAsync:Math.floor(t/1e3)!==Math.floor(s/1e3),timestamp:s}]};e({url:r,method:"post",data:c(n,t),timeout:a.ANALYTICS_REQUEST_TIMEOUT_MS},o)}).catch(function(e){o&&o(e)})}}},{"./add-metadata":30,"./constants":35,"./promise":45}],32:[function(e,t,n){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],33:[function(e,t,n){"use strict";var r=e("./braintree-error"),i=e("./promise"),o=e("./errors");t.exports={verify:function(e){var t,n;return e?(n=e.name,t=e.client,e=e.authorization,t||e?e||"3.91.0"===t.getVersion()?i.resolve():i.reject(new r({type:o.INCOMPATIBLE_VERSIONS.type,code:o.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+n+" (version 3.91.0) components must be from the same SDK version."})):i.reject(new r({type:o.INSTANTIATION_OPTION_REQUIRED.type,code:o.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+n+"."}))):i.reject(new r({type:o.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:o.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":34,"./errors":41,"./promise":45}],34:[function(e,t,n){"use strict";e=e("./enumerate");function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((r.prototype=Object.create(Error.prototype)).constructor=r).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(e){return e instanceof r&&e.details&&e.details.originalError?r.findRootError(e.details.originalError):e},t.exports=r},{"./enumerate":40}],35:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.91.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.91.0"}},{}],36:[function(e,t,n){"use strict";var r=e("./braintree-error"),i=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:i.METHOD_CALLED_AFTER_TEARDOWN.type,code:i.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":34,"./errors":41}],37:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":35}],38:[function(e,t,n){"use strict";var i=e("../lib/vendor/polyfill").atob,o=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(n=(t=(t=e).split("_"))[0],t={merchantId:t.slice(2).join("_"),environment:n},r.environment=t.environment,r.attrs.tokenizationKey=e,r.configUrl=o[t.environment]+"/merchants/"+t.merchantId+"/client_api/v1/configuration"):(n=JSON.parse(i(e)),r.environment=n.environment,r.attrs.authorizationFingerprint=n.authorizationFingerprint,r.configUrl=n.configUrl,r.graphQL=n.graphQL),r}},{"../lib/constants":35,"../lib/vendor/polyfill":47}],39:[function(e,t,n){"use strict";var r=e("./braintree-error"),i=e("./promise"),o=e("./assets"),s=e("./errors"),a="3.91.0";t.exports={create:function(e){var t=i.resolve();return e.client?i.resolve(e.client):(t=window.braintree&&window.braintree.client?t:o.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return i.reject(new r({type:s.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:s.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:s.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})).then(function(){return window.braintree.client.VERSION!==a?i.reject(new r({type:s.INCOMPATIBLE_VERSIONS.type,code:s.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})})}}},{"./assets":32,"./braintree-error":34,"./errors":41,"./promise":45}],40:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],41:[function(e,t,n){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":34}],42:[function(e,t,n){"use strict";var r,i={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=function(e){return e=e.toLowerCase(),!!/^https:/.test(e)&&((r=r||document.createElement("a")).href=e,e=r.hostname.split(".").slice(-2).join("."),i.hasOwnProperty(e))}},{}],43:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],44:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],45:[function(e,t,n){"use strict";var r=e("promise-polyfill"),e=e("@braintree/extended-promise"),r="undefined"!=typeof Promise?Promise:r;e.suppressUnhandledPromiseMessage=!0,e.setPromise(r),t.exports=r},{"@braintree/extended-promise":4,"promise-polyfill":29}],46:[function(e,t,n){"use strict";t.exports=function(e){return e?"":".min"}},{}],47:[function(e,t,n){"use strict";var r="function"==typeof atob?atob:i;function i(e){var t,n,r,i,o,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(o=0;n=s.indexOf(e.charAt(o++)),t=(15&(r=s.indexOf(e.charAt(o++))))<<4|(i=s.indexOf(e.charAt(o++)))>>2&15,i=(3&i)<<6|63&s.indexOf(e.charAt(o++)),a+=String.fromCharCode((63&n)<<2|r>>4&3)+(t?String.fromCharCode(t):"")+(i?String.fromCharCode(i):""),o<e.length;);return a}t.exports={atob:function(e){return r.call(window,e)},_atob:i}},{}],48:[function(e,t,n){"use strict";var r=e("./shared/unionpay"),i=e("../lib/basic-component-verification"),o=e("../lib/braintree-error"),s=e("../lib/create-deferred-client"),a=e("../lib/create-assets-url"),c=e("../lib/analytics"),u=e("./shared/errors"),l=e("../lib/promise"),e=e("@braintree/wrap-promise");t.exports={create:e(function(n){var e="UnionPay";return i.verify({name:e,client:n.client,authorization:n.authorization}).then(function(){return s.create({authorization:n.authorization,client:n.client,debug:n.debug,assetsUrl:a.create(n.authorization),name:e})}).then(function(e){var t=e.getConfiguration();return n.client=e,t.gatewayConfiguration.unionPay&&!0===t.gatewayConfiguration.unionPay.enabled?(c.sendEvent(n.client,"unionpay.initialized"),new r(n)):l.reject(new o(u.UNIONPAY_NOT_ENABLED))})}),VERSION:"3.91.0"}},{"../lib/analytics":31,"../lib/basic-component-verification":33,"../lib/braintree-error":34,"../lib/create-assets-url":37,"../lib/create-deferred-client":39,"../lib/promise":45,"./shared/errors":50,"./shared/unionpay":51,"@braintree/wrap-promise":13}],49:[function(e,t,n){"use strict";e=e("../../lib/enumerate");t.exports={events:e(["HOSTED_FIELDS_FETCH_CAPABILITIES","HOSTED_FIELDS_ENROLL","HOSTED_FIELDS_TOKENIZE"],"union-pay:"),HOSTED_FIELDS_FRAME_NAME:"braintreeunionpayhostedfields"}},{"../../lib/enumerate":40}],50:[function(e,t,n){"use strict";e=e("../../lib/braintree-error");t.exports={UNIONPAY_NOT_ENABLED:{type:e.types.MERCHANT,code:"UNIONPAY_NOT_ENABLED",message:"UnionPay is not enabled for this merchant."},UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID:{type:e.types.MERCHANT,code:"UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID",message:"Found an invalid Hosted Fields instance. Please use a valid Hosted Fields instance."},UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED:{type:e.types.MERCHANT,code:"UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED",message:"Could not find the Hosted Fields instance."},UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED:{type:e.types.MERCHANT,code:"UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED",message:"A card or a Hosted Fields instance is required. Please supply a card or a Hosted Fields instance."},UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES:{type:e.types.MERCHANT,code:"UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES",message:"Please supply either a card or a Hosted Fields instance, not both."},UNIONPAY_EXPIRATION_DATE_INCOMPLETE:{type:e.types.MERCHANT,code:"UNIONPAY_EXPIRATION_DATE_INCOMPLETE",message:"You must supply expiration month and year or neither."},UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID:{type:e.types.CUSTOMER,code:"UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID",message:"Enrollment failed due to user input error."},UNIONPAY_ENROLLMENT_NETWORK_ERROR:{type:e.types.NETWORK,code:"UNIONPAY_ENROLLMENT_NETWORK_ERROR",message:"Could not enroll UnionPay card."},UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR:{type:e.types.NETWORK,code:"UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR",message:"Could not fetch card capabilities."},UNIONPAY_TOKENIZATION_NETWORK_ERROR:{type:e.types.NETWORK,code:"UNIONPAY_TOKENIZATION_NETWORK_ERROR",message:"A tokenization network error occurred."},UNIONPAY_MISSING_MOBILE_PHONE_DATA:{type:e.types.MERCHANT,code:"UNIONPAY_MISSING_MOBILE_PHONE_DATA",message:"A `mobile` with `countryCode` and `number` is required."},UNIONPAY_FAILED_TOKENIZATION:{type:e.types.CUSTOMER,code:"UNIONPAY_FAILED_TOKENIZATION",message:"The supplied card data failed tokenization."}}},{"../../lib/braintree-error":34}],51:[function(e,t,n){"use strict";var a=e("../../lib/analytics"),c=e("../../lib/braintree-error"),o=e("framebus"),s=e("./constants"),u=e("../../lib/is-verified-domain"),l=e("../../lib/use-min"),r=e("../../lib/convert-methods-to-error"),d=e("./errors"),f=s.events,p=e("@braintree/iframer"),i=e("../../lib/methods"),_=e("@braintree/uuid"),h=e("../../lib/promise"),E=e("@braintree/wrap-promise"),m=e("../../lib/constants").BUS_CONFIGURATION_REQUEST_EVENT;function y(e){this._options=e}y.prototype.fetchCapabilities=function(e){var r=this,n=this._options.client,t=e.card?e.card.number:null,i=e.hostedFields;return t&&i?h.reject(new c(d.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)):t?n.request({method:"get",endpoint:"payment_methods/credit_cards/capabilities",data:{_meta:{source:"unionpay"},creditCard:{number:t}}}).then(function(e){return a.sendEvent(n,"unionpay.capabilities-received"),e}).catch(function(e){var t=e.details&&e.details.httpStatus;return a.sendEvent(n,"unionpay.capabilities-failed"),403===t?h.reject(e):h.reject(new c({type:d.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.type,code:d.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.code,message:d.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.message,details:{originalError:e}}))}):i?i._bus?r._initializeHostedFields().then(function(){return new h(function(t,n){r._bus.emit(f.HOSTED_FIELDS_FETCH_CAPABILITIES,{hostedFields:i},function(e){e.err?n(new c(e.err)):t(e.payload)})})}):h.reject(new c(d.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)):h.reject(new c(d.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))},y.prototype.enroll=function(e){var r=this,i=this._options.client,t=e.card,o=e.mobile,s=e.hostedFields;if(!o)return h.reject(new c(d.UNIONPAY_MISSING_MOBILE_PHONE_DATA));if(s)return s._bus?t?h.reject(new c(d.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)):new h(function(t,n){r._initializeHostedFields().then(function(){r._bus.emit(f.HOSTED_FIELDS_ENROLL,{hostedFields:s,mobile:o},function(e){e.err?n(new c(e.err)):t(e.payload)})})}):h.reject(new c(d.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));if(t&&t.number){if(e={_meta:{source:"unionpay"},unionPayEnrollment:{number:t.number,mobileCountryCode:o.countryCode,mobileNumber:o.number}},t.expirationDate)e.unionPayEnrollment.expirationDate=t.expirationDate;else if(t.expirationMonth||t.expirationYear){if(!t.expirationMonth||!t.expirationYear)return h.reject(new c(d.UNIONPAY_EXPIRATION_DATE_INCOMPLETE));e.unionPayEnrollment.expirationYear=t.expirationYear,e.unionPayEnrollment.expirationMonth=t.expirationMonth}return i.request({method:"post",endpoint:"union_pay_enrollments",data:e}).then(function(e){return a.sendEvent(i,"unionpay.enrollment-succeeded"),{enrollmentId:e.unionPayEnrollmentId,smsCodeRequired:e.smsCodeRequired}}).catch(function(e){var t,n=e.details&&e.details.httpStatus;return 403===n?t=e:n<500?(t=new c(d.UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID)).details={originalError:e}:(t=new c(d.UNIONPAY_ENROLLMENT_NETWORK_ERROR)).details={originalError:e},a.sendEvent(i,"unionpay.enrollment-failed"),h.reject(t)})}return h.reject(new c(d.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))},y.prototype.tokenize=function(e){var t,r=this,i=this._options.client,n=e.card,o=e.hostedFields;return n&&o?h.reject(new c(d.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)):n?(t={_meta:{source:"unionpay"},creditCard:{number:e.card.number,options:{unionPayEnrollment:{id:e.enrollmentId}}}},e.smsCode&&(t.creditCard.options.unionPayEnrollment.smsCode=e.smsCode),n.expirationDate?t.creditCard.expirationDate=n.expirationDate:n.expirationMonth&&n.expirationYear&&(t.creditCard.expirationYear=n.expirationYear,t.creditCard.expirationMonth=n.expirationMonth),e.card.cvv&&(t.creditCard.cvv=e.card.cvv),i.request({method:"post",endpoint:"payment_methods/credit_cards",data:t}).then(function(e){e=e.creditCards[0];return delete e.consumed,delete e.threeDSecureInfo,a.sendEvent(i,"unionpay.nonce-received"),e}).catch(function(e){var t,n=e.details&&e.details.httpStatus;return a.sendEvent(i,"unionpay.nonce-failed"),403===n?t=e:n<500?(t=new c(d.UNIONPAY_FAILED_TOKENIZATION)).details={originalError:e}:(t=new c(d.UNIONPAY_TOKENIZATION_NETWORK_ERROR)).details={originalError:e},h.reject(t)})):o?o._bus?new h(function(t,n){r._initializeHostedFields().then(function(){r._bus.emit(f.HOSTED_FIELDS_TOKENIZE,e,function(e){e.err?n(new c(e.err)):t(e.payload)})})}):h.reject(new c(d.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)):h.reject(new c(d.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))},y.prototype.teardown=function(){return this._bus&&(this._hostedFieldsFrame.parentNode.removeChild(this._hostedFieldsFrame),this._bus.teardown()),r(this,i(y.prototype)),h.resolve()},y.prototype._initializeHostedFields=function(){var e,n,r=_(),i=this;return this._hostedFieldsInitializePromise||(this._hostedFieldsInitializePromise=new h(function(t){e=i._options.client.getConfiguration().gatewayConfiguration.assetsUrl,n=i._options.client.getConfiguration().isDebug,i._bus=new o({channel:r,verifyDomain:u}),i._hostedFieldsFrame=p({name:s.HOSTED_FIELDS_FRAME_NAME+"_"+r,src:e+"/web/3.91.0/html/unionpay-hosted-fields-frame"+l(n)+".html",height:0,width:0}),i._bus.on(m,function(e){e(i._options.client),t()}),document.body.appendChild(i._hostedFieldsFrame)})),this._hostedFieldsInitializePromise},t.exports=E.wrapPrototype(y)},{"../../lib/analytics":31,"../../lib/braintree-error":34,"../../lib/constants":35,"../../lib/convert-methods-to-error":36,"../../lib/is-verified-domain":42,"../../lib/methods":44,"../../lib/promise":45,"../../lib/use-min":46,"./constants":49,"./errors":50,"@braintree/iframer":5,"@braintree/uuid":9,"@braintree/wrap-promise":13,framebus:15}]},{},[48])(48)});