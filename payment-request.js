!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).paymentRequest=e()}(function(){return function r(o,i,a){function s(t,e){if(!i[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},o[t][0].call(n.exports,function(e){return s(o[t][1][e]||e)},n,n.exports,r,o,i,a)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},r=(Object.defineProperty(n,"__esModule",{value:!0}),n.PromiseGlobal=void 0,r(e("promise-polyfill"))),e="undefined"!=typeof Promise?Promise:r.default;n.PromiseGlobal=e},{"promise-polyfill":29}],2:[function(e,t,n){"use strict";var a=e("./lib/promise"),s={};function r(n){var e,r,t,o,i=JSON.stringify(n);return!n.forceScriptReload&&(e=s[i])||(r=document.createElement("script"),t=n.dataAttributes||{},o=n.container||document.head,r.src=n.src,r.id=n.id||"",r.async=!0,n.crossorigin&&r.setAttribute("crossorigin",""+n.crossorigin),Object.keys(t).forEach(function(e){r.setAttribute("data-"+e,""+t[e])}),e=new a.PromiseGlobal(function(e,t){r.addEventListener("load",function(){e(r)}),r.addEventListener("error",function(){t(new Error(n.src+" failed to load."))}),r.addEventListener("abort",function(){t(new Error(n.src+" has aborted."))}),o.appendChild(r)}),s[i]=e),e}r.clearCache=function(){s={}},t.exports=r},{"./lib/promise":1}],3:[function(e,t,n){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,n){"use strict";function r(){this._events={}}r.prototype.on=function(e,t){this._events[e]?this._events[e].push(t):this._events[e]=[t]},r.prototype.off=function(e,t){e=this._events[e];e&&(t=e.indexOf(t),e.splice(t,1))},r.prototype._emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e=this._events[e];e&&e.forEach(function(e){e.apply(void 0,t)})},r.prototype.hasListener=function(e){e=this._events[e];return!!e&&0<e.length},r.createChild=function(e){e.prototype=Object.create(r.prototype,{constructor:e})},t.exports=r},{}],5:[function(e,t,n){"use strict";var r=e("./lib/set-attributes"),o=e("./lib/default-attributes"),i=e("./lib/assign");t.exports=function(e){void 0===e&&(e={});var t=document.createElement("iframe"),e=i.assign({},o.defaultAttributes,e);return e.style&&"string"!=typeof e.style&&(i.assign(t.style,e.style),delete e.style),r.setAttributes(t,e),t.getAttribute("id")||(t.id=t.name),t}},{"./lib/assign":6,"./lib/default-attributes":7,"./lib/set-attributes":8}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.assign=void 0,n.assign=function(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];return e.forEach(function(t){"object"==typeof t&&Object.keys(t).forEach(function(e){n[e]=t[e]})}),n}},{}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.defaultAttributes=void 0,n.defaultAttributes={src:"about:blank",frameBorder:0,allowtransparency:!0,scrolling:"no"}},{}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.setAttributes=void 0,n.setAttributes=function(e,t){for(var n in t){var r;t.hasOwnProperty(n)&&(null==(r=t[n])?e.removeAttribute(n):e.setAttribute(n,r))}}},{}],9:[function(e,t,n){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.deferred=function(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{n.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.once=function(n){var r=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r||(r=!0,n.apply(void 0,e))}}},{}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],13:[function(e,t,n){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),a=e("./lib/promise-or-callback");function s(r){return function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),a.promiseOrCallback(r.apply(this,t),e)}}s.wrapPrototype=function(r,e){var o=(e=void 0===e?{}:e).ignoreMethods||[],i=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(r.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof r.prototype[e],n=-1===o.indexOf(e),e=i||"_"!==e.charAt(0);return t&&e&&n}).forEach(function(e){var t=r.prototype[e];r.prototype[e]=s(t)}),r},t.exports=s},{"./lib/deferred":10,"./lib/once":11,"./lib/promise-or-callback":12}],14:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Framebus=void 0;var i=e("./lib/is-not-string"),s=e("./lib/subscription-args-invalid"),a=e("./lib/broadcast"),c=e("./lib/package-payload"),u=e("./lib/send-message"),d=e("./lib/constants"),e="undefined"!=typeof window&&window.Promise;function p(e){this.origin=(e=void 0===e?{}:e).origin||"*",this.channel=e.channel||"",this.verifyDomain=e.verifyDomain,this.targetFrames=e.targetFrames||[],this.limitBroadcastToFramesArray=Boolean(e.targetFrames),this.isDestroyed=!1,this.listeners=[],this.hasAdditionalChecksForOnListeners=Boolean(this.verifyDomain||this.limitBroadcastToFramesArray)}p.setPromise=function(e){p.Promise=e},p.target=function(e){return new p(e)},p.prototype.addTargetFrame=function(e){this.limitBroadcastToFramesArray&&this.targetFrames.push(e)},p.prototype.include=function(e){return null!=e&&(null!=e.Window&&(e.constructor===e.Window&&(d.childWindows.push(e),!0)))},p.prototype.target=function(e){return p.target(e)},p.prototype.emit=function(e,t,n){if(this.isDestroyed)return!1;var r=this.origin;if(e=this.namespaceEvent(e),(0,i.isntString)(e))return!1;if((0,i.isntString)(r))return!1;"function"==typeof t&&(n=t,t=void 0);var o=(0,c.packagePayload)(e,r,t,n);return!!o&&(this.limitBroadcastToFramesArray?this.targetFramesAsWindows().forEach(function(e){(0,u.sendMessage)(e,o,r)}):(0,a.broadcast)(o,{origin:r,frame:window.top||window.self}),!0)},p.prototype.emitAsPromise=function(n,r){var o=this;return new p.Promise(function(t,e){o.emit(n,r,function(e){t(e)})||e(new Error('Listener not added for "'.concat(n,'"')))})},p.prototype.on=function(e,n){var r,t,o;return!this.isDestroyed&&(t=(r=this).origin,o=n,e=this.namespaceEvent(e),!(0,s.subscriptionArgsInvalid)(e,o,t)&&(this.hasAdditionalChecksForOnListeners&&(o=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r.passesVerifyDomainCheck(this&&this.origin)&&r.hasMatchingTargetFrame(this&&this.source)&&n.apply(void 0,e)}),this.listeners.push({eventName:e,handler:o,originalHandler:n}),d.subscribers[t]=d.subscribers[t]||{},d.subscribers[t][e]=d.subscribers[t][e]||[],d.subscribers[t][e].push(o),!0))},p.prototype.off=function(e,t){var n=t;if(!this.isDestroyed){if(this.verifyDomain)for(var r=0;r<this.listeners.length;r++){var o=this.listeners[r];o.originalHandler===t&&(n=o.handler)}e=this.namespaceEvent(e);var i=this.origin;if(!(0,s.subscriptionArgsInvalid)(e,n,i)){var a=d.subscribers[i]&&d.subscribers[i][e];if(a)for(r=0;r<a.length;r++)if(a[r]===n)return a.splice(r,1),!0}}return!1},p.prototype.teardown=function(){if(!this.isDestroyed){this.isDestroyed=!0;for(var e=0;e<this.listeners.length;e++){var t=this.listeners[e];this.off(t.eventName,t.handler)}this.listeners.length=0}},p.prototype.passesVerifyDomainCheck=function(e){return!this.verifyDomain||this.checkOrigin(e)},p.prototype.targetFramesAsWindows=function(){return this.limitBroadcastToFramesArray?this.targetFrames.map(function(e){return e instanceof HTMLIFrameElement?e.contentWindow:e}).filter(function(e){return e}):[]},p.prototype.hasMatchingTargetFrame=function(t){var e;return!this.limitBroadcastToFramesArray||(e=this.targetFramesAsWindows().find(function(e){return e===t}),Boolean(e))},p.prototype.checkOrigin=function(e){var t,n=document.createElement("a");return n.href=location.href,t="https:"===n.protocol?n.host.replace(/:443$/,""):"http:"===n.protocol?n.host.replace(/:80$/,""):n.host,n.protocol+"//"+t===e||(!this.verifyDomain||this.verifyDomain(e))},p.prototype.namespaceEvent=function(e){return this.channel?"".concat(this.channel,":").concat(e):e},p.Promise=e,n.Framebus=p},{"./lib/broadcast":18,"./lib/constants":19,"./lib/is-not-string":22,"./lib/package-payload":24,"./lib/send-message":25,"./lib/subscription-args-invalid":27}],15:[function(e,t,n){"use strict";var r=e("./lib/attach"),e=e("./framebus");(0,r.attach)(),t.exports=e.Framebus},{"./framebus":14,"./lib/attach":16}],16:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.detach=n.attach=void 0;var r=e("./message"),o=!1;n.attach=function(){o||"undefined"==typeof window||(o=!0,window.addEventListener("message",r.onmessage,!1))},n.detach=function(){o=!1,window.removeEventListener("message",r.onmessage,!1)}},{"./message":23}],17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.broadcastToChildWindows=void 0;var i=e("./broadcast"),a=e("./constants");n.broadcastToChildWindows=function(e,t,n){for(var r=a.childWindows.length-1;0<=r;r--){var o=a.childWindows[r];o.closed?a.childWindows.splice(r,1):n!==o&&(0,i.broadcast)(e,{origin:t,frame:o.top})}}},{"./broadcast":18,"./constants":19}],18:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.broadcast=void 0;var s=e("./has-opener");n.broadcast=function e(t,n){var r,o=0,i=n.origin,a=n.frame;try{for(a.postMessage(t,i),(0,s.hasOpener)(a)&&a.opener.top!==window.top&&e(t,{origin:i,frame:a.opener.top});r=a.frames[o];)e(t,{origin:i,frame:r}),o++}catch(e){}}},{"./has-opener":21}],19:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.subscribers=n.childWindows=n.prefix=void 0,n.prefix="/*framebus*/",n.childWindows=[],n.subscribers={}},{}],20:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.dispatch=void 0;var s=e("./constants");n.dispatch=function(e,t,n,r,o){if(s.subscribers[e]&&s.subscribers[e][t]){var i=[];n&&i.push(n),r&&i.push(r);for(var a=0;a<s.subscribers[e][t].length;a++)s.subscribers[e][t][a].apply(o,i)}}},{"./constants":19}],21:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.hasOpener=void 0,n.hasOpener=function(e){return e.top===e&&(null!=e.opener&&(e.opener!==e&&!0!==e.opener.closed))}},{}],22:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.isntString=void 0,n.isntString=function(e){return"string"!=typeof e}},{}],23:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.onmessage=void 0;var o=e("./is-not-string"),i=e("./unpack-payload"),a=e("./dispatch"),s=e("./broadcast-to-child-windows");n.onmessage=function(e){var t,n,r;(0,o.isntString)(e.data)||(t=(0,i.unpackPayload)(e))&&(n=t.eventData,r=t.reply,(0,a.dispatch)("*",t.event,n,r,e),(0,a.dispatch)(e.origin,t.event,n,r,e),(0,s.broadcastToChildWindows)(e.data,t.origin,e.source))}},{"./broadcast-to-child-windows":17,"./dispatch":20,"./is-not-string":22,"./unpack-payload":28}],24:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.packagePayload=void 0;var i=e("./subscribe-replier"),a=e("./constants");n.packagePayload=function(e,t,n,r){var o,e={event:e,origin:t};"function"==typeof r&&(e.reply=(0,i.subscribeReplier)(r,t)),e.eventData=n;try{o=a.prefix+JSON.stringify(e)}catch(e){throw new Error("Could not stringify event: ".concat(e.message))}return o}},{"./constants":19,"./subscribe-replier":26}],25:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.sendMessage=void 0,n.sendMessage=function(e,t,n){try{e.postMessage(t,n)}catch(e){}}},{}],26:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},a=(Object.defineProperty(n,"__esModule",{value:!0}),n.subscribeReplier=void 0,e("../framebus")),s=r(e("@braintree/uuid"));n.subscribeReplier=function(r,o){var i=(0,s.default)();return a.Framebus.target({origin:o}).on(i,function e(t,n){r(t,n),a.Framebus.target({origin:o}).off(i,e)}),i}},{"../framebus":14,"@braintree/uuid":9}],27:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.subscriptionArgsInvalid=void 0;var r=e("./is-not-string");n.subscriptionArgsInvalid=function(e,t,n){return!!(0,r.isntString)(e)||("function"!=typeof t||(0,r.isntString)(n))}},{"./is-not-string":22}],28:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.unpackPayload=void 0;var i=e("./constants"),a=e("./package-payload");n.unpackPayload=function(e){var t,n,r,o;if(e.data.slice(0,i.prefix.length)!==i.prefix)return!1;try{t=JSON.parse(e.data.slice(i.prefix.length))}catch(e){return!1}return t.reply&&(n=e.origin,r=e.source,o=t.reply,t.reply=function(e){!r||(e=(0,a.packagePayload)(o,n,e))&&r.postMessage(e,n)}),t}},{"./constants":19,"./package-payload":24}],29:[function(e,t,n){"use strict";var r=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function a(n,r){for(;3===n._state;)n=n._value;0===n._state?n._deferreds.push(r):(n._handled=!0,i._immediateFn(function(){var e,t=1===n._state?r.onFulfilled:r.onRejected;if(null===t)(1===n._state?s:u)(r.promise,n._value);else{try{e=t(n._value)}catch(e){return void u(r.promise,e)}s(r.promise,e)}}))}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void d(t);if("function"==typeof n)return void l((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,d(t)}catch(e){u(t,e)}var r,o}function u(e,t){e._state=2,e._value=t,d(e)}function d(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null}function p(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){n||(n=!0,u(t,e))}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(o);return a(this,new p(e,t,n)),n},i.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},i.all=function(t){return new i(function(o,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(t);if(0===a.length)return o([]);var s=a.length;for(var e=0;e<a.length;e++)!function t(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},i)}a[n]=e,0==--s&&o(a)}catch(e){i(e)}}(e,a[e])})},i.allSettled=function(n){return new this(function(o,e){if(!n||void 0===n.length)return e(new TypeError(typeof n+" "+n+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(n);if(0===i.length)return o([]);var a=i.length;for(var t=0;t<i.length;t++)!function t(n,e){if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){t(n,e)},function(e){i[n]={status:"rejected",reason:e},0==--a&&o(i)})}i[n]={status:"fulfilled",value:e},0==--a&&o(i)}(t,i[t])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var n=0,r=o.length;n<r;n++)i.resolve(o[n]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){r(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],30:[function(e,t,n){"use strict";var i=e("./create-authorization-data"),a=e("./json-clone"),s=e("./constants");t.exports=function(e,t){var n,r=t?a(t):{},t=i(e.authorization).attrs,o=a(e.analyticsMetadata);for(n in r.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION,r._meta)r._meta.hasOwnProperty(n)&&(o[n]=r._meta[n]);return r._meta=o,t.tokenizationKey?r.tokenizationKey=t.tokenizationKey:r.authorizationFingerprint=t.authorizationFingerprint,r}},{"./constants":36,"./create-authorization-data":39,"./json-clone":44}],31:[function(e,t,n){"use strict";var s=e("./constants"),c=e("./add-metadata");t.exports={sendEvent:function(e,o,i){var a=Date.now();return Promise.resolve(e).then(function(e){var t=Date.now(),n=e.getConfiguration(),e=e._request,r=n.gatewayConfiguration.analytics.url,t={analytics:[{kind:s.ANALYTICS_PREFIX+o,isAsync:Math.floor(t/1e3)!==Math.floor(a/1e3),timestamp:a}]};e({url:r,method:"post",data:c(n,t),timeout:s.ANALYTICS_REQUEST_TIMEOUT_MS},i)}).catch(function(e){i&&i(e)})}}},{"./add-metadata":30,"./constants":36}],32:[function(e,t,n){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],33:[function(e,t,n){"use strict";var r="function"==typeof Object.assign?Object.assign:o;function o(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])t.hasOwnProperty(n)&&(e[n]=t[n]);return e}t.exports={assign:r,_assign:o}},{}],34:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports={verify:function(e){var t,n;return e?(n=e.name,t=e.client,e=e.authorization,t||e?e||"3.95.0"===t.getVersion()?Promise.resolve():Promise.reject(new r({type:o.INCOMPATIBLE_VERSIONS.type,code:o.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+t.getVersion()+") and "+n+" (version 3.95.0) components must be from the same SDK version."})):Promise.reject(new r({type:o.INSTANTIATION_OPTION_REQUIRED.type,code:o.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating "+n+"."}))):Promise.reject(new r({type:o.INVALID_USE_OF_INTERNAL_FUNCTION.type,code:o.INVALID_USE_OF_INTERNAL_FUNCTION.code,message:"Options must be passed to basicComponentVerification function."}))}}},{"./braintree-error":35,"./errors":42}],35:[function(e,t,n){"use strict";e=e("./enumerate");function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((r.prototype=Object.create(Error.prototype)).constructor=r).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),r.findRootError=function(e){return e instanceof r&&e.details&&e.details.originalError?r.findRootError(e.details.originalError):e},t.exports=r},{"./enumerate":41}],36:[function(e,t,n){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.95.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.95.0"}},{}],37:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":35,"./errors":42}],38:[function(e,t,n){"use strict";var r=e("./constants").ASSETS_URLS;t.exports={create:function(e){return r.production}}},{"./constants":36}],39:[function(e,t,n){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,n,r={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(n=(t=(t=e).split("_"))[0],t={merchantId:t.slice(2).join("_"),environment:n},r.environment=t.environment,r.attrs.tokenizationKey=e,r.configUrl=i[t.environment]+"/merchants/"+t.merchantId+"/client_api/v1/configuration"):(n=JSON.parse(o(e)),r.environment=n.environment,r.attrs.authorizationFingerprint=n.authorizationFingerprint,r.configUrl=n.configUrl,r.graphQL=n.graphQL),r}},{"../lib/constants":36,"../lib/vendor/polyfill":47}],40:[function(e,t,n){"use strict";var r=e("./braintree-error"),o=e("./assets"),i=e("./errors"),a="3.95.0";t.exports={create:function(e){var t=Promise.resolve();return e.client?Promise.resolve(e.client):(t=window.braintree&&window.braintree.client?t:o.loadScript({src:e.assetsUrl+"/web/"+a+"/js/client.min.js"}).catch(function(e){return Promise.reject(new r({type:i.CLIENT_SCRIPT_FAILED_TO_LOAD.type,code:i.CLIENT_SCRIPT_FAILED_TO_LOAD.code,message:i.CLIENT_SCRIPT_FAILED_TO_LOAD.message,details:{originalError:e}}))})).then(function(){return window.braintree.client.VERSION!==a?Promise.reject(new r({type:i.INCOMPATIBLE_VERSIONS.type,code:i.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+window.braintree.client.VERSION+") and "+e.name+" (version "+a+") components must be from the same SDK version."})):window.braintree.client.create({authorization:e.authorization,debug:e.debug})})}}},{"./assets":32,"./braintree-error":35,"./errors":42}],41:[function(e,t,n){"use strict";t.exports=function(e,n){return n=null==n?"":n,e.reduce(function(e,t){return e[t]=n+t,e},{})}},{}],42:[function(e,t,n){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":35}],43:[function(e,t,n){"use strict";var r=e("./assign").assign;function s(e,t){var n=e.analyticsMetadata,e={gateway:"braintree","braintree:merchantId":e.gatewayConfiguration.merchantId,"braintree:apiVersion":"v1","braintree:sdkVersion":"3.95.0","braintree:metadata":JSON.stringify({source:n.source,integration:n.integration,sessionId:n.sessionId,version:"3.95.0",platform:n.platform})};return r({},e,t)}t.exports=function(e,t,n){var r,o,i=e.gatewayConfiguration.androidPay,a="production"===e.gatewayConfiguration.environment?"PRODUCTION":"TEST";return 2===t?(r={apiVersion:2,apiVersionMinor:0,environment:a,allowedPaymentMethods:[{type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:i.supportedNetworks.map(function(e){return e.toUpperCase()})},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:s(e,{"braintree:authorizationFingerprint":i.googleAuthorizationFingerprint})}}]},n&&(r.merchantInfo={merchantId:n}),i.paypalClientId&&(o={type:"PAYPAL",parameters:{purchase_context:{purchase_units:[{payee:{client_id:i.paypalClientId},recurring_payment:!0}]}},tokenizationSpecification:{type:"PAYMENT_GATEWAY",parameters:s(e,{"braintree:paypalClientId":i.paypalClientId})}},r.allowedPaymentMethods.push(o))):(r={environment:a,allowedPaymentMethods:["CARD","TOKENIZED_CARD"],paymentMethodTokenizationParameters:{tokenizationType:"PAYMENT_GATEWAY",parameters:s(e,{"braintree:authorizationFingerprint":i.googleAuthorizationFingerprint})},cardRequirements:{allowedCardNetworks:i.supportedNetworks.map(function(e){return e.toUpperCase()})}},"TOKENIZATION_KEY"===e.authorizationType&&(r.paymentMethodTokenizationParameters.parameters["braintree:clientKey"]=e.authorization),n&&(r.merchantId=n),t&&(r.apiVersion=t)),r}},{"./assign":33}],44:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],45:[function(e,t,n){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],46:[function(e,t,n){"use strict";t.exports=function(e){return e?"":".min"}},{}],47:[function(e,t,n){"use strict";var r="function"==typeof atob?atob:o;function o(e){var t,n,r,o,i,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(i=0;n=a.indexOf(e.charAt(i++)),t=(15&(r=a.indexOf(e.charAt(i++))))<<4|(o=a.indexOf(e.charAt(i++)))>>2&15,o=(3&o)<<6|63&a.indexOf(e.charAt(i++)),s+=String.fromCharCode((63&n)<<2|r>>4&3)+(t?String.fromCharCode(t):"")+(o?String.fromCharCode(o):""),i<e.length;);return s}t.exports={atob:function(e){return r.call(window,e)},_atob:o}},{}],48:[function(e,t,n){"use strict";var a=e("../../lib/analytics"),r=e("../../lib/assign").assign,o=e("framebus"),i=e("../../lib/convert-methods-to-error"),s=e("../../lib/generate-google-pay-configuration"),c=e("@braintree/iframer"),u=e("@braintree/uuid"),d=e("../../lib/use-min"),p=e("../../lib/methods"),l=e("@braintree/event-emitter"),E=e("../../lib/braintree-error"),f=e("../shared/constants"),_=f.events,h=f.errors,e=e("@braintree/wrap-promise"),T={Visa:"visa",MasterCard:"mastercard","American Express":"amex","Diners Club":"diners",Discover:"discover",JCB:"jcb",UnionPay:"unionpay",Maestro:"maestro"};function m(e){var t=e.enabledPaymentMethods||{};l.call(this),this._componentId=u(),this._client=e.client,this._enabledPaymentMethods={basicCard:!1!==t.basicCard,googlePay:!1!==t.googlePay},this._googlePayVersion=2===e.googlePayVersion?2:1,this._googleMerchantId="18278000977346790994",this._supportedPaymentMethods=this._constructDefaultSupportedPaymentMethods(),this._defaultSupportedPaymentMethods=Object.keys(this._supportedPaymentMethods).map(function(e){return this._supportedPaymentMethods[e]}.bind(this)),this._bus=new o({channel:this._componentId})}l.createChild(m),m.prototype._constructDefaultSupportedPaymentMethods=function(){var e=this._client.getConfiguration(),t=e.gatewayConfiguration.androidPay,n=e.gatewayConfiguration.creditCards,r={};return this._enabledPaymentMethods.basicCard&&n&&0<n.supportedCardTypes.length&&(r.basicCard={supportedMethods:"basic-card",data:{supportedNetworks:n.supportedCardTypes.reduce(function(e,t){return t in T&&e.push(T[t]),e},[])}}),this._enabledPaymentMethods.googlePay&&t&&t.enabled&&(r.googlePay={supportedMethods:"https://google.com/pay",data:s(e,this._googlePayVersion,this._googleMerchantId)}),r},m.prototype.initialize=function(){var o=this._client.getConfiguration(),i=this;return this._frame=c({allowPaymentRequest:!0,name:"braintree-payment-request-frame",class:"braintree-payment-request-frame",height:0,width:0,style:{position:"absolute",left:"-9999px"},title:"Secure Payment Frame"}),0===this._defaultSupportedPaymentMethods.length?Promise.reject(new E(h.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS)):new Promise(function(e){var t,n,r;i._bus.on(_.FRAME_READY,function(e){e(i._client)}),i._bus.on(_.FRAME_CAN_MAKE_REQUESTS,function(){a.sendEvent(i._client,"payment-request.initialized"),i._bus.on(_.SHIPPING_ADDRESS_CHANGE,function(e){e={target:{shippingAddress:e},updateWith:function(e){i._bus.emit(_.UPDATE_SHIPPING_ADDRESS,e)}};i._emit("shippingAddressChange",e),i._emit("shippingaddresschange",e)}),i._bus.on(_.SHIPPING_OPTION_CHANGE,function(e){e={target:{shippingOption:e},updateWith:function(e){i._bus.emit(_.UPDATE_SHIPPING_OPTION,e)}};i._emit("shippingOptionChange",e),i._emit("shippingoptionchange",e)}),e(i)}),i._frame.src=(t=o.gatewayConfiguration.assetsUrl,n=i._componentId,r=o.isDebug,t+"/web/3.95.0/html/payment-request-frame"+d(r)+".html#"+n),document.body.appendChild(i._frame)})},m.prototype.createSupportedPaymentMethodsConfiguration=function(e,t){if(!e)throw new E(h.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE);if(this._enabledPaymentMethods[e])return(e=r({},this._supportedPaymentMethods[e])).data=r({},e.data,t),e;throw new E(h.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED)},m.prototype.tokenize=function(e){var o=this;return new Promise(function(n,r){o._bus.emit(_.PAYMENT_REQUEST_INITIALIZED,{supportedPaymentMethods:e.supportedPaymentMethods||o._defaultSupportedPaymentMethods,details:e.details,options:e.options},function(e){var t=e[0],e=e[1];t?r(o._formatTokenizationError(t)):(a.sendEvent(o._client,"payment-request.tokenize.succeeded"),n({nonce:e.nonce,type:e.type,description:e.description,details:{rawPaymentResponse:e.details.rawPaymentResponse,cardType:e.details.cardType,lastFour:e.details.lastFour,lastTwo:e.details.lastTwo},binData:e.binData}))})})},m.prototype.canMakePayment=function(e){var t,o=this;return window.PaymentRequest?e.supportedPaymentMethods&&(e.supportedPaymentMethods.forEach(function(e){e=e.supportedMethods;e in f.SUPPORTED_METHODS||(t=e)}),t)?Promise.reject(new E({type:h.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.type,code:h.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.code,message:t+" is not a supported payment method."})):new Promise(function(n,r){o._bus.emit(_.CAN_MAKE_PAYMENT,{supportedPaymentMethods:e.supportedPaymentMethods||o._defaultSupportedPaymentMethods,details:e.details,options:e.options},function(e){var t=e[0],e=e[1];t?r(o._formatCanMakePaymentError(t)):(a.sendEvent(o._client,"payment-request.can-make-payment."+e),n(e))})}):(a.sendEvent(o._client,"payment-request.can-make-payment.not-available"),Promise.resolve(!1))},m.prototype.teardown=function(){return this._bus.teardown(),this._frame.parentNode.removeChild(this._frame),i(this,p(m.prototype)),a.sendEvent(this._client,"payment-request.teardown-completed"),Promise.resolve()},m.prototype._formatTokenizationError=function(e){var t;switch(e.name){case"AbortError":return t=new E({type:h.PAYMENT_REQUEST_CANCELED.type,code:h.PAYMENT_REQUEST_CANCELED.code,message:h.PAYMENT_REQUEST_CANCELED.message,details:{originalError:e}}),a.sendEvent(this._client,"payment-request.tokenize.canceled"),t;case"PAYMENT_REQUEST_INITIALIZATION_FAILED":t=new E({type:h.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:h.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:h.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}});break;case"BRAINTREE_GATEWAY_GOOGLE_PAYMENT_TOKENIZATION_ERROR":t=new E({type:h.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.type,code:h.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.code,message:h.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.message,details:{originalError:e}});break;case"BRAINTREE_GATEWAY_GOOGLE_PAYMENT_PARSING_ERROR":t=new E({type:h.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.type,code:h.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.code,message:h.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.message,details:{originalError:e}});break;default:t=new E({code:h.PAYMENT_REQUEST_NOT_COMPLETED.code,type:e.type||E.types.CUSTOMER,message:h.PAYMENT_REQUEST_NOT_COMPLETED.message,details:{originalError:e}})}return a.sendEvent(this._client,"payment-request.tokenize.failed"),t},m.prototype._formatCanMakePaymentError=function(e){var t;switch(e.name){case"PAYMENT_REQUEST_INITIALIZATION_FAILED":t=new E({type:h.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,code:h.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,message:h.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,details:{originalError:e}});break;case"NotAllowedError":t=new E({type:h.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.type,code:h.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.code,message:h.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.message,details:{originalError:e}});break;default:t=new E({code:h.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.code,type:h.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.type,message:h.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.message,details:{originalError:e}})}return a.sendEvent(this._client,"payment-request.can-make-payment.failed"),t},t.exports=e.wrapPrototype(m)},{"../../lib/analytics":31,"../../lib/assign":33,"../../lib/braintree-error":35,"../../lib/convert-methods-to-error":37,"../../lib/generate-google-pay-configuration":43,"../../lib/methods":45,"../../lib/use-min":46,"../shared/constants":50,"@braintree/event-emitter":4,"@braintree/iframer":5,"@braintree/uuid":9,"@braintree/wrap-promise":13,framebus:15}],49:[function(e,t,n){"use strict";var r=e("./external/payment-request"),o=e("../lib/basic-component-verification"),i=e("../lib/create-deferred-client"),a=e("../lib/create-assets-url"),e=e("@braintree/wrap-promise");t.exports={create:e(function(t){var e="Payment Request";return o.verify({name:e,client:t.client,authorization:t.authorization}).then(function(){return i.create({authorization:t.authorization,client:t.client,debug:t.debug,assetsUrl:a.create(t.authorization),name:e})}).then(function(e){return t.client=e,new r(t).initialize()})}),VERSION:"3.95.0"}},{"../lib/basic-component-verification":34,"../lib/create-assets-url":38,"../lib/create-deferred-client":40,"./external/payment-request":48,"@braintree/wrap-promise":13}],50:[function(e,t,n){"use strict";var r=e("../../lib/enumerate"),e=e("./errors"),o={};o.events=r(["CAN_MAKE_PAYMENT","FRAME_READY","FRAME_CAN_MAKE_REQUESTS","PAYMENT_REQUEST_INITIALIZED","SHIPPING_ADDRESS_CHANGE","UPDATE_SHIPPING_ADDRESS","SHIPPING_OPTION_CHANGE","UPDATE_SHIPPING_OPTION"],"payment-request:"),o.errors=e,o.SUPPORTED_METHODS={"basic-card":!0,"https://google.com/pay":!0},t.exports=o},{"../../lib/enumerate":41,"./errors":51}],51:[function(e,t,n){"use strict";e=e("../../lib/braintree-error");t.exports={PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS",message:"There are no supported payment methods associated with this account."},PAYMENT_REQUEST_CANCELED:{type:e.types.CUSTOMER,code:"PAYMENT_REQUEST_CANCELED",message:"Payment request was canceled."},PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED",message:"Something went wrong when configuring the payment request."},PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED:{type:e.types.UNKNOWN,code:"PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED",message:"Something went wrong when calling `canMakePayment`"},PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED",message:"Something went wrong when calling `canMakePayment`. Most likely, `canMakePayment` was called multiple times with different supportedMethods configurations."},PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD"},PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE",message:"Something went wrong when tokenizing the Google Pay card."},PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR:{type:e.types.UNKNOWN,code:"PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR",message:"Something went wrong when tokenizing the Google Pay card."},PAYMENT_REQUEST_NOT_COMPLETED:{code:"PAYMENT_REQUEST_NOT_COMPLETED",message:"Payment request could not be completed."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE",message:"createSupportedPaymentMethodsConfiguration must include a type parameter."},PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED:{type:e.types.MERCHANT,code:"PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED",message:"createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled."}}},{"../../lib/braintree-error":35}]},{},[49])(49)});