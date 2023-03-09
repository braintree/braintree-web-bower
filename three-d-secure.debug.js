(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).threeDSecure = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseGlobal = void 0;
var promise_polyfill_1 = __importDefault(_dereq_("promise-polyfill"));
var PromiseGlobal = 
// eslint-disable-next-line no-undef
typeof Promise !== "undefined" ? Promise : promise_polyfill_1.default;
exports.PromiseGlobal = PromiseGlobal;

},{"promise-polyfill":30}],2:[function(_dereq_,module,exports){
"use strict";
var promise_1 = _dereq_("./lib/promise");
var scriptPromiseCache = {};
function loadScript(options) {
    var scriptLoadPromise;
    var stringifiedOptions = JSON.stringify(options);
    if (!options.forceScriptReload) {
        scriptLoadPromise = scriptPromiseCache[stringifiedOptions];
        if (scriptLoadPromise) {
            return scriptLoadPromise;
        }
    }
    var script = document.createElement("script");
    var attrs = options.dataAttributes || {};
    var container = options.container || document.head;
    script.src = options.src;
    script.id = options.id || "";
    script.async = true;
    if (options.crossorigin) {
        script.setAttribute("crossorigin", "" + options.crossorigin);
    }
    Object.keys(attrs).forEach(function (key) {
        script.setAttribute("data-" + key, "" + attrs[key]);
    });
    scriptLoadPromise = new promise_1.PromiseGlobal(function (resolve, reject) {
        script.addEventListener("load", function () {
            resolve(script);
        });
        script.addEventListener("error", function () {
            reject(new Error(options.src + " failed to load."));
        });
        script.addEventListener("abort", function () {
            reject(new Error(options.src + " has aborted."));
        });
        container.appendChild(script);
    });
    scriptPromiseCache[stringifiedOptions] = scriptLoadPromise;
    return scriptLoadPromise;
}
loadScript.clearCache = function () {
    scriptPromiseCache = {};
};
module.exports = loadScript;

},{"./lib/promise":1}],3:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/load-script");

},{"./dist/load-script":2}],4:[function(_dereq_,module,exports){
"use strict";
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = {};
    }
    EventEmitter.prototype.on = function (event, callback) {
        if (this._events[event]) {
            this._events[event].push(callback);
        }
        else {
            this._events[event] = [callback];
        }
    };
    EventEmitter.prototype.off = function (event, callback) {
        var eventCallbacks = this._events[event];
        if (!eventCallbacks) {
            return;
        }
        var indexOfCallback = eventCallbacks.indexOf(callback);
        eventCallbacks.splice(indexOfCallback, 1);
    };
    EventEmitter.prototype._emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var eventCallbacks = this._events[event];
        if (!eventCallbacks) {
            return;
        }
        eventCallbacks.forEach(function (callback) {
            callback.apply(void 0, args);
        });
    };
    EventEmitter.prototype.hasListener = function (event) {
        var eventCallbacks = this._events[event];
        if (!eventCallbacks) {
            return false;
        }
        return eventCallbacks.length > 0;
    };
    EventEmitter.createChild = function (ChildObject) {
        ChildObject.prototype = Object.create(EventEmitter.prototype, {
            constructor: ChildObject,
        });
    };
    return EventEmitter;
}());
module.exports = EventEmitter;

},{}],5:[function(_dereq_,module,exports){
"use strict";
var GlobalPromise = (typeof Promise !== "undefined"
    ? Promise // eslint-disable-line no-undef
    : null);
var ExtendedPromise = /** @class */ (function () {
    function ExtendedPromise(options) {
        var _this = this;
        if (typeof options === "function") {
            this._promise = new ExtendedPromise.Promise(options);
            return;
        }
        this._promise = new ExtendedPromise.Promise(function (resolve, reject) {
            _this._resolveFunction = resolve;
            _this._rejectFunction = reject;
        });
        options = options || {};
        this._onResolve = options.onResolve || ExtendedPromise.defaultOnResolve;
        this._onReject = options.onReject || ExtendedPromise.defaultOnReject;
        if (ExtendedPromise.shouldCatchExceptions(options)) {
            this._promise.catch(function () {
                // prevents unhandled promise rejection warning
                // in the console for extended promises that
                // that catch the error in an asynchronous manner
            });
        }
        this._resetState();
    }
    ExtendedPromise.defaultOnResolve = function (result) {
        return ExtendedPromise.Promise.resolve(result);
    };
    ExtendedPromise.defaultOnReject = function (err) {
        return ExtendedPromise.Promise.reject(err);
    };
    ExtendedPromise.setPromise = function (PromiseClass) {
        ExtendedPromise.Promise = PromiseClass;
    };
    ExtendedPromise.shouldCatchExceptions = function (options) {
        if (options.hasOwnProperty("suppressUnhandledPromiseMessage")) {
            return Boolean(options.suppressUnhandledPromiseMessage);
        }
        return Boolean(ExtendedPromise.suppressUnhandledPromiseMessage);
    };
    // start Promise methods documented in:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Methods
    ExtendedPromise.all = function (args) {
        return ExtendedPromise.Promise.all(args);
    };
    ExtendedPromise.allSettled = function (args) {
        return ExtendedPromise.Promise.allSettled(args);
    };
    ExtendedPromise.race = function (args) {
        return ExtendedPromise.Promise.race(args);
    };
    ExtendedPromise.reject = function (arg) {
        return ExtendedPromise.Promise.reject(arg);
    };
    ExtendedPromise.resolve = function (arg) {
        return ExtendedPromise.Promise.resolve(arg);
    };
    ExtendedPromise.prototype.then = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).then.apply(_a, args);
    };
    ExtendedPromise.prototype.catch = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).catch.apply(_a, args);
    };
    ExtendedPromise.prototype.resolve = function (arg) {
        var _this = this;
        if (this.isFulfilled) {
            return this;
        }
        this._setResolved();
        ExtendedPromise.Promise.resolve()
            .then(function () {
            return _this._onResolve(arg);
        })
            .then(function (argForResolveFunction) {
            _this._resolveFunction(argForResolveFunction);
        })
            .catch(function (err) {
            _this._resetState();
            _this.reject(err);
        });
        return this;
    };
    ExtendedPromise.prototype.reject = function (arg) {
        var _this = this;
        if (this.isFulfilled) {
            return this;
        }
        this._setRejected();
        ExtendedPromise.Promise.resolve()
            .then(function () {
            return _this._onReject(arg);
        })
            .then(function (result) {
            _this._setResolved();
            _this._resolveFunction(result);
        })
            .catch(function (err) {
            return _this._rejectFunction(err);
        });
        return this;
    };
    ExtendedPromise.prototype._resetState = function () {
        this.isFulfilled = false;
        this.isResolved = false;
        this.isRejected = false;
    };
    ExtendedPromise.prototype._setResolved = function () {
        this.isFulfilled = true;
        this.isResolved = true;
        this.isRejected = false;
    };
    ExtendedPromise.prototype._setRejected = function () {
        this.isFulfilled = true;
        this.isResolved = false;
        this.isRejected = true;
    };
    ExtendedPromise.Promise = GlobalPromise;
    return ExtendedPromise;
}());
module.exports = ExtendedPromise;

},{}],6:[function(_dereq_,module,exports){
"use strict";
var set_attributes_1 = _dereq_("./lib/set-attributes");
var default_attributes_1 = _dereq_("./lib/default-attributes");
var assign_1 = _dereq_("./lib/assign");
module.exports = function createFrame(options) {
    if (options === void 0) { options = {}; }
    var iframe = document.createElement("iframe");
    var config = assign_1.assign({}, default_attributes_1.defaultAttributes, options);
    if (config.style && typeof config.style !== "string") {
        assign_1.assign(iframe.style, config.style);
        delete config.style;
    }
    set_attributes_1.setAttributes(iframe, config);
    if (!iframe.getAttribute("id")) {
        iframe.id = iframe.name;
    }
    return iframe;
};

},{"./lib/assign":7,"./lib/default-attributes":8,"./lib/set-attributes":9}],7:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = void 0;
function assign(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
target) {
    var objs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objs[_i - 1] = arguments[_i];
    }
    objs.forEach(function (obj) {
        if (typeof obj !== "object") {
            return;
        }
        Object.keys(obj).forEach(function (key) {
            target[key] = obj[key];
        });
    });
    return target;
}
exports.assign = assign;

},{}],8:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAttributes = void 0;
exports.defaultAttributes = {
    src: "about:blank",
    frameBorder: 0,
    allowtransparency: true,
    scrolling: "no",
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAttributes = void 0;
function setAttributes(element, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
attributes) {
    for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            var value = attributes[key];
            if (value == null) {
                element.removeAttribute(key);
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
}
exports.setAttributes = setAttributes;

},{}],10:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],11:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deferred(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        setTimeout(function () {
            try {
                fn.apply(void 0, args);
            }
            catch (err) {
                /* eslint-disable no-console */
                console.log("Error in callback function");
                console.log(err);
                /* eslint-enable no-console */
            }
        }, 1);
    };
}
exports.deferred = deferred;

},{}],12:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function once(fn) {
    var called = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!called) {
            called = true;
            fn.apply(void 0, args);
        }
    };
}
exports.once = once;

},{}],13:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable consistent-return */
function promiseOrCallback(promise, callback) {
    if (!callback) {
        return promise;
    }
    promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
}
exports.promiseOrCallback = promiseOrCallback;

},{}],14:[function(_dereq_,module,exports){
"use strict";
var deferred_1 = _dereq_("./lib/deferred");
var once_1 = _dereq_("./lib/once");
var promise_or_callback_1 = _dereq_("./lib/promise-or-callback");
function wrapPromise(fn) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var callback;
        var lastArg = args[args.length - 1];
        if (typeof lastArg === "function") {
            callback = args.pop();
            callback = once_1.once(deferred_1.deferred(callback));
        }
        // I know, I know, this looks bad. But it's a quirk of the library that
        // we need to allow passing the this context to the original function
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: this has an implicit any
        return promise_or_callback_1.promiseOrCallback(fn.apply(this, args), callback); // eslint-disable-line no-invalid-this
    };
}
wrapPromise.wrapPrototype = function (target, options) {
    if (options === void 0) { options = {}; }
    var ignoreMethods = options.ignoreMethods || [];
    var includePrivateMethods = options.transformPrivateMethods === true;
    var methods = Object.getOwnPropertyNames(target.prototype).filter(function (method) {
        var isNotPrivateMethod;
        var isNonConstructorFunction = method !== "constructor" &&
            typeof target.prototype[method] === "function";
        var isNotAnIgnoredMethod = ignoreMethods.indexOf(method) === -1;
        if (includePrivateMethods) {
            isNotPrivateMethod = true;
        }
        else {
            isNotPrivateMethod = method.charAt(0) !== "_";
        }
        return (isNonConstructorFunction && isNotPrivateMethod && isNotAnIgnoredMethod);
    });
    methods.forEach(function (method) {
        var original = target.prototype[method];
        target.prototype[method] = wrapPromise(original);
    });
    return target;
};
module.exports = wrapPromise;

},{"./lib/deferred":11,"./lib/once":12,"./lib/promise-or-callback":13}],15:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framebus = void 0;
var is_not_string_1 = _dereq_("./lib/is-not-string");
var subscription_args_invalid_1 = _dereq_("./lib/subscription-args-invalid");
var broadcast_1 = _dereq_("./lib/broadcast");
var package_payload_1 = _dereq_("./lib/package-payload");
var send_message_1 = _dereq_("./lib/send-message");
var constants_1 = _dereq_("./lib/constants");
var DefaultPromise = (typeof window !== "undefined" &&
    window.Promise);
var Framebus = /** @class */ (function () {
    function Framebus(options) {
        if (options === void 0) { options = {}; }
        this.origin = options.origin || "*";
        this.channel = options.channel || "";
        this.verifyDomain = options.verifyDomain;
        // if a targetFrames configuration is not passed in,
        // the default behavior is to broadcast the payload
        // to the top level window or to the frame itself.
        // By default, the broadcast function will loop through
        // all the known siblings and children of the window.
        // If a targetFrames array is passed, it will instead
        // only broadcast to those specified targetFrames
        this.targetFrames = options.targetFrames || [];
        this.limitBroadcastToFramesArray = Boolean(options.targetFrames);
        this.isDestroyed = false;
        this.listeners = [];
        this.hasAdditionalChecksForOnListeners = Boolean(this.verifyDomain || this.limitBroadcastToFramesArray);
    }
    Framebus.setPromise = function (PromiseGlobal) {
        Framebus.Promise = PromiseGlobal;
    };
    Framebus.target = function (options) {
        return new Framebus(options);
    };
    Framebus.prototype.addTargetFrame = function (frame) {
        if (!this.limitBroadcastToFramesArray) {
            return;
        }
        this.targetFrames.push(frame);
    };
    Framebus.prototype.include = function (childWindow) {
        if (childWindow == null) {
            return false;
        }
        if (childWindow.Window == null) {
            return false;
        }
        if (childWindow.constructor !== childWindow.Window) {
            return false;
        }
        constants_1.childWindows.push(childWindow);
        return true;
    };
    Framebus.prototype.target = function (options) {
        return Framebus.target(options);
    };
    Framebus.prototype.emit = function (eventName, data, reply) {
        if (this.isDestroyed) {
            return false;
        }
        var origin = this.origin;
        eventName = this.namespaceEvent(eventName);
        if ((0, is_not_string_1.isntString)(eventName)) {
            return false;
        }
        if ((0, is_not_string_1.isntString)(origin)) {
            return false;
        }
        if (typeof data === "function") {
            reply = data;
            data = undefined; // eslint-disable-line no-undefined
        }
        var payload = (0, package_payload_1.packagePayload)(eventName, origin, data, reply);
        if (!payload) {
            return false;
        }
        if (this.limitBroadcastToFramesArray) {
            this.targetFramesAsWindows().forEach(function (frame) {
                (0, send_message_1.sendMessage)(frame, payload, origin);
            });
        }
        else {
            (0, broadcast_1.broadcast)(payload, {
                origin: origin,
                frame: window.top || window.self,
            });
        }
        return true;
    };
    Framebus.prototype.emitAsPromise = function (eventName, data) {
        var _this = this;
        return new Framebus.Promise(function (resolve, reject) {
            var didAttachListener = _this.emit(eventName, data, function (payload) {
                resolve(payload);
            });
            if (!didAttachListener) {
                reject(new Error("Listener not added for \"".concat(eventName, "\"")));
            }
        });
    };
    Framebus.prototype.on = function (eventName, originalHandler) {
        if (this.isDestroyed) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        var origin = this.origin;
        var handler = originalHandler;
        eventName = this.namespaceEvent(eventName);
        if ((0, subscription_args_invalid_1.subscriptionArgsInvalid)(eventName, handler, origin)) {
            return false;
        }
        if (this.hasAdditionalChecksForOnListeners) {
            /* eslint-disable no-invalid-this, @typescript-eslint/ban-ts-comment */
            handler = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // @ts-ignore
                if (!self.passesVerifyDomainCheck(this && this.origin)) {
                    return;
                }
                // @ts-ignore
                if (!self.hasMatchingTargetFrame(this && this.source)) {
                    return;
                }
                originalHandler.apply(void 0, args);
            };
            /* eslint-enable no-invalid-this, @typescript-eslint/ban-ts-comment */
        }
        this.listeners.push({
            eventName: eventName,
            handler: handler,
            originalHandler: originalHandler,
        });
        constants_1.subscribers[origin] = constants_1.subscribers[origin] || {};
        constants_1.subscribers[origin][eventName] = constants_1.subscribers[origin][eventName] || [];
        constants_1.subscribers[origin][eventName].push(handler);
        return true;
    };
    Framebus.prototype.off = function (eventName, originalHandler) {
        var handler = originalHandler;
        if (this.isDestroyed) {
            return false;
        }
        if (this.verifyDomain) {
            for (var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];
                if (listener.originalHandler === originalHandler) {
                    handler = listener.handler;
                }
            }
        }
        eventName = this.namespaceEvent(eventName);
        var origin = this.origin;
        if ((0, subscription_args_invalid_1.subscriptionArgsInvalid)(eventName, handler, origin)) {
            return false;
        }
        var subscriberList = constants_1.subscribers[origin] && constants_1.subscribers[origin][eventName];
        if (!subscriberList) {
            return false;
        }
        for (var i = 0; i < subscriberList.length; i++) {
            if (subscriberList[i] === handler) {
                subscriberList.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Framebus.prototype.teardown = function () {
        if (this.isDestroyed) {
            return;
        }
        this.isDestroyed = true;
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            this.off(listener.eventName, listener.handler);
        }
        this.listeners.length = 0;
    };
    Framebus.prototype.passesVerifyDomainCheck = function (origin) {
        if (!this.verifyDomain) {
            // always pass this check if no verifyDomain option was set
            return true;
        }
        return this.checkOrigin(origin);
    };
    Framebus.prototype.targetFramesAsWindows = function () {
        if (!this.limitBroadcastToFramesArray) {
            return [];
        }
        return this.targetFrames
            .map(function (frame) {
            // we can't pull off the contentWindow
            // when the iframe is originally added
            // to the array, because if it is not
            // in the DOM at that time, it will have
            // a contentWindow of `null`
            if (frame instanceof HTMLIFrameElement) {
                return frame.contentWindow;
            }
            return frame;
        })
            .filter(function (win) {
            // just in case an iframe element
            // was removed from the DOM
            // and the contentWindow property
            // is null
            return win;
        });
    };
    Framebus.prototype.hasMatchingTargetFrame = function (source) {
        if (!this.limitBroadcastToFramesArray) {
            // always pass this check if we aren't limiting to the target frames
            return true;
        }
        var matchingFrame = this.targetFramesAsWindows().find(function (frame) {
            return frame === source;
        });
        return Boolean(matchingFrame);
    };
    Framebus.prototype.checkOrigin = function (postMessageOrigin) {
        var merchantHost;
        var a = document.createElement("a");
        a.href = location.href;
        if (a.protocol === "https:") {
            merchantHost = a.host.replace(/:443$/, "");
        }
        else if (a.protocol === "http:") {
            merchantHost = a.host.replace(/:80$/, "");
        }
        else {
            merchantHost = a.host;
        }
        var merchantOrigin = a.protocol + "//" + merchantHost;
        if (merchantOrigin === postMessageOrigin) {
            return true;
        }
        if (this.verifyDomain) {
            return this.verifyDomain(postMessageOrigin);
        }
        return true;
    };
    Framebus.prototype.namespaceEvent = function (eventName) {
        if (!this.channel) {
            return eventName;
        }
        return "".concat(this.channel, ":").concat(eventName);
    };
    Framebus.Promise = DefaultPromise;
    return Framebus;
}());
exports.Framebus = Framebus;

},{"./lib/broadcast":19,"./lib/constants":20,"./lib/is-not-string":23,"./lib/package-payload":25,"./lib/send-message":26,"./lib/subscription-args-invalid":28}],16:[function(_dereq_,module,exports){
"use strict";
var attach_1 = _dereq_("./lib/attach");
var framebus_1 = _dereq_("./framebus");
(0, attach_1.attach)();
module.exports = framebus_1.Framebus;

},{"./framebus":15,"./lib/attach":17}],17:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detach = exports.attach = void 0;
var message_1 = _dereq_("./message");
var isAttached = false;
function attach() {
    if (isAttached || typeof window === "undefined") {
        return;
    }
    isAttached = true;
    window.addEventListener("message", message_1.onmessage, false);
}
exports.attach = attach;
// removeIf(production)
function detach() {
    isAttached = false;
    window.removeEventListener("message", message_1.onmessage, false);
}
exports.detach = detach;
// endRemoveIf(production)

},{"./message":24}],18:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastToChildWindows = void 0;
var broadcast_1 = _dereq_("./broadcast");
var constants_1 = _dereq_("./constants");
function broadcastToChildWindows(payload, origin, source) {
    for (var i = constants_1.childWindows.length - 1; i >= 0; i--) {
        var childWindow = constants_1.childWindows[i];
        if (childWindow.closed) {
            constants_1.childWindows.splice(i, 1);
        }
        else if (source !== childWindow) {
            (0, broadcast_1.broadcast)(payload, {
                origin: origin,
                frame: childWindow.top,
            });
        }
    }
}
exports.broadcastToChildWindows = broadcastToChildWindows;

},{"./broadcast":19,"./constants":20}],19:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = void 0;
var has_opener_1 = _dereq_("./has-opener");
function broadcast(payload, options) {
    var i = 0;
    var frameToBroadcastTo;
    var origin = options.origin, frame = options.frame;
    try {
        frame.postMessage(payload, origin);
        if ((0, has_opener_1.hasOpener)(frame) && frame.opener.top !== window.top) {
            broadcast(payload, {
                origin: origin,
                frame: frame.opener.top,
            });
        }
        // previously, our max value was frame.frames.length
        // but frames.length inherits from window.length
        // which can be overwritten if a developer does
        // `var length = value;` outside of a function
        // scope, it'll prevent us from looping through
        // all the frames. With this, we loop through
        // until there are no longer any frames
        // eslint-disable-next-line no-cond-assign
        while ((frameToBroadcastTo = frame.frames[i])) {
            broadcast(payload, {
                origin: origin,
                frame: frameToBroadcastTo,
            });
            i++;
        }
    }
    catch (_) {
        /* ignored */
    }
}
exports.broadcast = broadcast;

},{"./has-opener":22}],20:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribers = exports.childWindows = exports.prefix = void 0;
exports.prefix = "/*framebus*/";
exports.childWindows = [];
exports.subscribers = {};

},{}],21:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = void 0;
var constants_1 = _dereq_("./constants");
function dispatch(origin, event, data, reply, e) {
    if (!constants_1.subscribers[origin]) {
        return;
    }
    if (!constants_1.subscribers[origin][event]) {
        return;
    }
    var args = [];
    if (data) {
        args.push(data);
    }
    if (reply) {
        args.push(reply);
    }
    for (var i = 0; i < constants_1.subscribers[origin][event].length; i++) {
        constants_1.subscribers[origin][event][i].apply(e, args);
    }
}
exports.dispatch = dispatch;

},{"./constants":20}],22:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOpener = void 0;
function hasOpener(frame) {
    if (frame.top !== frame) {
        return false;
    }
    if (frame.opener == null) {
        return false;
    }
    if (frame.opener === frame) {
        return false;
    }
    if (frame.opener.closed === true) {
        return false;
    }
    return true;
}
exports.hasOpener = hasOpener;

},{}],23:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isntString = void 0;
function isntString(str) {
    return typeof str !== "string";
}
exports.isntString = isntString;

},{}],24:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onmessage = void 0;
var is_not_string_1 = _dereq_("./is-not-string");
var unpack_payload_1 = _dereq_("./unpack-payload");
var dispatch_1 = _dereq_("./dispatch");
var broadcast_to_child_windows_1 = _dereq_("./broadcast-to-child-windows");
function onmessage(e) {
    if ((0, is_not_string_1.isntString)(e.data)) {
        return;
    }
    var payload = (0, unpack_payload_1.unpackPayload)(e);
    if (!payload) {
        return;
    }
    var data = payload.eventData;
    var reply = payload.reply;
    (0, dispatch_1.dispatch)("*", payload.event, data, reply, e);
    (0, dispatch_1.dispatch)(e.origin, payload.event, data, reply, e);
    (0, broadcast_to_child_windows_1.broadcastToChildWindows)(e.data, payload.origin, e.source);
}
exports.onmessage = onmessage;

},{"./broadcast-to-child-windows":18,"./dispatch":21,"./is-not-string":23,"./unpack-payload":29}],25:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packagePayload = void 0;
var subscribe_replier_1 = _dereq_("./subscribe-replier");
var constants_1 = _dereq_("./constants");
function packagePayload(event, origin, data, reply) {
    var packaged;
    var payload = {
        event: event,
        origin: origin,
    };
    if (typeof reply === "function") {
        payload.reply = (0, subscribe_replier_1.subscribeReplier)(reply, origin);
    }
    payload.eventData = data;
    try {
        packaged = constants_1.prefix + JSON.stringify(payload);
    }
    catch (e) {
        throw new Error("Could not stringify event: ".concat(e.message));
    }
    return packaged;
}
exports.packagePayload = packagePayload;

},{"./constants":20,"./subscribe-replier":27}],26:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
/**
 * A basic function for wrapping the sending of postMessages to frames.
 */
function sendMessage(frame, payload, origin) {
    try {
        frame.postMessage(payload, origin);
    }
    catch (error) {
        /* ignored */
    }
}
exports.sendMessage = sendMessage;

},{}],27:[function(_dereq_,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeReplier = void 0;
var framebus_1 = _dereq_("../framebus");
var uuid_1 = __importDefault(_dereq_("@braintree/uuid"));
function subscribeReplier(fn, origin) {
    var uuid = (0, uuid_1.default)();
    function replier(data, replyOriginHandler) {
        fn(data, replyOriginHandler);
        framebus_1.Framebus.target({
            origin: origin,
        }).off(uuid, replier);
    }
    framebus_1.Framebus.target({
        origin: origin,
    }).on(uuid, replier);
    return uuid;
}
exports.subscribeReplier = subscribeReplier;

},{"../framebus":15,"@braintree/uuid":10}],28:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionArgsInvalid = void 0;
var is_not_string_1 = _dereq_("./is-not-string");
function subscriptionArgsInvalid(event, fn, origin) {
    if ((0, is_not_string_1.isntString)(event)) {
        return true;
    }
    if (typeof fn !== "function") {
        return true;
    }
    return (0, is_not_string_1.isntString)(origin);
}
exports.subscriptionArgsInvalid = subscriptionArgsInvalid;

},{"./is-not-string":23}],29:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackPayload = void 0;
var constants_1 = _dereq_("./constants");
var package_payload_1 = _dereq_("./package-payload");
function unpackPayload(e) {
    var payload;
    if (e.data.slice(0, constants_1.prefix.length) !== constants_1.prefix) {
        return false;
    }
    try {
        payload = JSON.parse(e.data.slice(constants_1.prefix.length));
    }
    catch (err) {
        return false;
    }
    if (payload.reply) {
        var replyOrigin_1 = e.origin;
        var replySource_1 = e.source;
        var replyEvent_1 = payload.reply;
        payload.reply = function reply(replyData) {
            if (!replySource_1) {
                return;
            }
            var replyPayload = (0, package_payload_1.packagePayload)(replyEvent_1, replyOrigin_1, replyData);
            if (!replyPayload) {
                return;
            }
            replySource_1.postMessage(replyPayload, replyOrigin_1);
        };
    }
    return payload;
}
exports.unpackPayload = unpackPayload;

},{"./constants":20,"./package-payload":25}],30:[function(_dereq_,module,exports){
'use strict';

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

function allSettled(arr) {
  var P = this;
  return new P(function(resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(
        new TypeError(
          typeof arr +
            ' ' +
            arr +
            ' is not iterable(cannot read property Symbol(Symbol.iterator))'
        )
      );
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        var then = val.then;
        if (typeof then === 'function') {
          then.call(
            val,
            function(val) {
              res(i, val);
            },
            function(e) {
              args[i] = { status: 'rejected', reason: e };
              if (--remaining === 0) {
                resolve(args);
              }
            }
          );
          return;
        }
      }
      args[i] = { status: 'fulfilled', value: val };
      if (--remaining === 0) {
        resolve(args);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.allSettled = allSettled;

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

},{}],31:[function(_dereq_,module,exports){
"use strict";

var createAuthorizationData = _dereq_("./create-authorization-data");
var jsonClone = _dereq_("./json-clone");
var constants = _dereq_("./constants");

function addMetadata(configuration, data) {
  var key;
  var attrs = data ? jsonClone(data) : {};
  var authAttrs = createAuthorizationData(configuration.authorization).attrs;
  var _meta = jsonClone(configuration.analyticsMetadata);

  attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;

  for (key in attrs._meta) {
    if (attrs._meta.hasOwnProperty(key)) {
      _meta[key] = attrs._meta[key];
    }
  }

  attrs._meta = _meta;

  if (authAttrs.tokenizationKey) {
    attrs.tokenizationKey = authAttrs.tokenizationKey;
  } else {
    attrs.authorizationFingerprint = authAttrs.authorizationFingerprint;
  }

  return attrs;
}

module.exports = addMetadata;

},{"./constants":37,"./create-authorization-data":41,"./json-clone":48}],32:[function(_dereq_,module,exports){
"use strict";

var Promise = _dereq_("./promise");
var constants = _dereq_("./constants");
var addMetadata = _dereq_("./add-metadata");

function sendAnalyticsEvent(clientInstanceOrPromise, kind, callback) {
  var timestamp = Date.now(); // milliseconds

  return Promise.resolve(clientInstanceOrPromise)
    .then(function (client) {
      var timestampInPromise = Date.now();
      var configuration = client.getConfiguration();
      var request = client._request;
      var url = configuration.gatewayConfiguration.analytics.url;
      var data = {
        analytics: [
          {
            kind: constants.ANALYTICS_PREFIX + kind,
            isAsync:
              Math.floor(timestampInPromise / 1000) !==
              Math.floor(timestamp / 1000),
            timestamp: timestamp,
          },
        ],
      };

      request(
        {
          url: url,
          method: "post",
          data: addMetadata(configuration, data),
          timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS,
        },
        callback
      );
    })
    .catch(function (err) {
      // for all non-test cases, we don't provide a callback,
      // so this error will always be swallowed. In this case,
      // that's fine, it should only error when the deferred
      // client fails to set up, in which case we don't want
      // that error to report over and over again via these
      // deferred analytics events
      if (callback) {
        callback(err);
      }
    });
}

module.exports = {
  sendEvent: sendAnalyticsEvent,
};

},{"./add-metadata":31,"./constants":37,"./promise":50}],33:[function(_dereq_,module,exports){
"use strict";

var loadScript = _dereq_("@braintree/asset-loader/load-script");

module.exports = {
  loadScript: loadScript,
};

},{"@braintree/asset-loader/load-script":3}],34:[function(_dereq_,module,exports){
"use strict";

var assignNormalized =
  typeof Object.assign === "function" ? Object.assign : assignPolyfill;

function assignPolyfill(destination) {
  var i, source, key;

  for (i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }
  }

  return destination;
}

module.exports = {
  assign: assignNormalized,
  _assign: assignPolyfill,
};

},{}],35:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");
var Promise = _dereq_("./promise");
var sharedErrors = _dereq_("./errors");
var VERSION = "3.92.0";

function basicComponentVerification(options) {
  var client, authorization, name;

  if (!options) {
    return Promise.reject(
      new BraintreeError({
        type: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.type,
        code: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.code,
        message:
          "Options must be passed to basicComponentVerification function.",
      })
    );
  }

  name = options.name;
  client = options.client;
  authorization = options.authorization;

  if (!client && !authorization) {
    return Promise.reject(
      new BraintreeError({
        type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
        code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
        // NEXT_MAJOR_VERSION in major version, we expose passing in authorization for all components
        // instead of passing in a client instance. Leave this a silent feature for now.
        message: "options.client is required when instantiating " + name + ".",
      })
    );
  }

  if (!authorization && client.getVersion() !== VERSION) {
    return Promise.reject(
      new BraintreeError({
        type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
        code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
        message:
          "Client (version " +
          client.getVersion() +
          ") and " +
          name +
          " (version " +
          VERSION +
          ") components must be from the same SDK version.",
      })
    );
  }

  return Promise.resolve();
}

module.exports = {
  verify: basicComponentVerification,
};

},{"./braintree-error":36,"./errors":45,"./promise":50}],36:[function(_dereq_,module,exports){
"use strict";

var enumerate = _dereq_("./enumerate");

/**
 * @class
 * @global
 * @param {object} options Construction options
 * @classdesc This class is used to report error conditions, frequently as the first parameter to callbacks throughout the Braintree SDK.
 * @description <strong>You cannot use this constructor directly. Interact with instances of this class through {@link callback callbacks}.</strong>
 */
function BraintreeError(options) {
  if (!BraintreeError.types.hasOwnProperty(options.type)) {
    throw new Error(options.type + " is not a valid type.");
  }

  if (!options.code) {
    throw new Error("Error code required.");
  }

  if (!options.message) {
    throw new Error("Error message required.");
  }

  this.name = "BraintreeError";

  /**
   * @type {string}
   * @description A code that corresponds to specific errors.
   */
  this.code = options.code;

  /**
   * @type {string}
   * @description A short description of the error.
   */
  this.message = options.message;

  /**
   * @type {BraintreeError.types}
   * @description The type of error.
   */
  this.type = options.type;

  /**
   * @type {object=}
   * @description Additional information about the error, such as an underlying network error response.
   */
  this.details = options.details;
}

BraintreeError.prototype = Object.create(Error.prototype);
BraintreeError.prototype.constructor = BraintreeError;

/**
 * Enum for {@link BraintreeError} types.
 * @name BraintreeError.types
 * @enum
 * @readonly
 * @memberof BraintreeError
 * @property {string} CUSTOMER An error caused by the customer.
 * @property {string} MERCHANT An error that is actionable by the merchant.
 * @property {string} NETWORK An error due to a network problem.
 * @property {string} INTERNAL An error caused by Braintree code.
 * @property {string} UNKNOWN An error where the origin is unknown.
 */
BraintreeError.types = enumerate([
  "CUSTOMER",
  "MERCHANT",
  "NETWORK",
  "INTERNAL",
  "UNKNOWN",
]);

BraintreeError.findRootError = function (err) {
  if (
    err instanceof BraintreeError &&
    err.details &&
    err.details.originalError
  ) {
    return BraintreeError.findRootError(err.details.originalError);
  }

  return err;
};

module.exports = BraintreeError;

},{"./enumerate":44}],37:[function(_dereq_,module,exports){
"use strict";

var VERSION = "3.92.0";
var PLATFORM = "web";

var CLIENT_API_URLS = {
  production: "https://api.braintreegateway.com:443",
  sandbox: "https://api.sandbox.braintreegateway.com:443",
};

var ASSETS_URLS = {
  production: "https://assets.braintreegateway.com",
  sandbox: "https://assets.braintreegateway.com",
};

var GRAPHQL_URLS = {
  production: "https://payments.braintree-api.com/graphql",
  sandbox: "https://payments.sandbox.braintree-api.com/graphql",
};

// endRemoveIf(production)

module.exports = {
  ANALYTICS_PREFIX: PLATFORM + ".",
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  ASSETS_URLS: ASSETS_URLS,
  CLIENT_API_URLS: CLIENT_API_URLS,
  FRAUDNET_SOURCE: "BRAINTREE_SIGNIN",
  FRAUDNET_FNCLS: "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",
  FRAUDNET_URL: "https://c.paypal.com/da/r/fb.js",
  BUS_CONFIGURATION_REQUEST_EVENT: "BUS_CONFIGURATION_REQUEST",
  GRAPHQL_URLS: GRAPHQL_URLS,
  INTEGRATION_TIMEOUT_MS: 60000,
  VERSION: VERSION,
  INTEGRATION: "custom",
  SOURCE: "client",
  PLATFORM: PLATFORM,
  BRAINTREE_LIBRARY_VERSION: "braintree/" + PLATFORM + "/" + VERSION,
};

},{}],38:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");
var sharedErrors = _dereq_("./errors");

module.exports = function (instance, methodNames) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = function () {
      throw new BraintreeError({
        type: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
        code: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
        message: methodName + " cannot be called after teardown.",
      });
    };
  });
};

},{"./braintree-error":36,"./errors":45}],39:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");

function convertToBraintreeError(originalErr, btErrorObject) {
  if (originalErr instanceof BraintreeError) {
    return originalErr;
  }

  return new BraintreeError({
    type: btErrorObject.type,
    code: btErrorObject.code,
    message: btErrorObject.message,
    details: {
      originalError: originalErr,
    },
  });
}

module.exports = convertToBraintreeError;

},{"./braintree-error":36}],40:[function(_dereq_,module,exports){
"use strict";

// endRemoveIf(production)
var ASSETS_URLS = _dereq_("./constants").ASSETS_URLS;

function createAssetsUrl(authorization) {
  // endRemoveIf(production)

  return ASSETS_URLS.production;
}
/* eslint-enable */

module.exports = {
  create: createAssetsUrl,
};

},{"./constants":37}],41:[function(_dereq_,module,exports){
"use strict";

var atob = _dereq_("../lib/vendor/polyfill").atob;
var CLIENT_API_URLS = _dereq_("../lib/constants").CLIENT_API_URLS;

function _isTokenizationKey(str) {
  return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
}

function _parseTokenizationKey(tokenizationKey) {
  var tokens = tokenizationKey.split("_");
  var environment = tokens[0];
  var merchantId = tokens.slice(2).join("_");

  return {
    merchantId: merchantId,
    environment: environment,
  };
}

function createAuthorizationData(authorization) {
  var parsedClientToken, parsedTokenizationKey;
  var data = {
    attrs: {},
    configUrl: "",
  };

  if (_isTokenizationKey(authorization)) {
    parsedTokenizationKey = _parseTokenizationKey(authorization);
    data.environment = parsedTokenizationKey.environment;
    data.attrs.tokenizationKey = authorization;
    data.configUrl =
      CLIENT_API_URLS[parsedTokenizationKey.environment] +
      "/merchants/" +
      parsedTokenizationKey.merchantId +
      "/client_api/v1/configuration";
  } else {
    parsedClientToken = JSON.parse(atob(authorization));
    data.environment = parsedClientToken.environment;
    data.attrs.authorizationFingerprint =
      parsedClientToken.authorizationFingerprint;
    data.configUrl = parsedClientToken.configUrl;
    data.graphQL = parsedClientToken.graphQL;
  }

  return data;
}

module.exports = createAuthorizationData;

},{"../lib/constants":37,"../lib/vendor/polyfill":52}],42:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");
var Promise = _dereq_("./promise");
var assets = _dereq_("./assets");
var sharedErrors = _dereq_("./errors");

var VERSION = "3.92.0";

function createDeferredClient(options) {
  var promise = Promise.resolve();

  if (options.client) {
    return Promise.resolve(options.client);
  }

  if (!(window.braintree && window.braintree.client)) {
    promise = assets
      .loadScript({
        src: options.assetsUrl + "/web/" + VERSION + "/js/client.min.js",
      })
      .catch(function (err) {
        return Promise.reject(
          new BraintreeError({
            type: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.type,
            code: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.code,
            message: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.message,
            details: {
              originalError: err,
            },
          })
        );
      });
  }

  return promise.then(function () {
    if (window.braintree.client.VERSION !== VERSION) {
      return Promise.reject(
        new BraintreeError({
          type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
          code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
          message:
            "Client (version " +
            window.braintree.client.VERSION +
            ") and " +
            options.name +
            " (version " +
            VERSION +
            ") components must be from the same SDK version.",
        })
      );
    }

    return window.braintree.client.create({
      authorization: options.authorization,
      debug: options.debug,
    });
  });
}

module.exports = {
  create: createDeferredClient,
};

},{"./assets":33,"./braintree-error":36,"./errors":45,"./promise":50}],43:[function(_dereq_,module,exports){
"use strict";

module.exports = function (fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
};

},{}],44:[function(_dereq_,module,exports){
"use strict";

function enumerate(values, prefix) {
  prefix = prefix == null ? "" : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],45:[function(_dereq_,module,exports){
"use strict";

/**
 * @name BraintreeError.Shared Internal Error Codes
 * @ignore
 * @description These codes should never be experienced by the merchant directly.
 * @property {INTERNAL} INVALID_USE_OF_INTERNAL_FUNCTION Occurs when the client is created without a gateway configuration. Should never happen.
 */

/**
 * @name BraintreeError.Shared Errors - Component Creation Error Codes
 * @description Errors that occur when creating components.
 * @property {MERCHANT} INSTANTIATION_OPTION_REQUIRED Occurs when a component is created that is missing a required option.
 * @property {MERCHANT} INCOMPATIBLE_VERSIONS Occurs when a component is created with a client with a different version than the component.
 * @property {NETWORK} CLIENT_SCRIPT_FAILED_TO_LOAD Occurs when a component attempts to load the Braintree client script, but the request fails.
 */

/**
 * @name BraintreeError.Shared Errors - Component Instance Error Codes
 * @description Errors that occur when using instances of components.
 * @property {MERCHANT} METHOD_CALLED_AFTER_TEARDOWN Occurs when a method is called on a component instance after it has been torn down.
 */

var BraintreeError = _dereq_("./braintree-error");

module.exports = {
  INVALID_USE_OF_INTERNAL_FUNCTION: {
    type: BraintreeError.types.INTERNAL,
    code: "INVALID_USE_OF_INTERNAL_FUNCTION",
  },
  INSTANTIATION_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: "INSTANTIATION_OPTION_REQUIRED",
  },
  INCOMPATIBLE_VERSIONS: {
    type: BraintreeError.types.MERCHANT,
    code: "INCOMPATIBLE_VERSIONS",
  },
  CLIENT_SCRIPT_FAILED_TO_LOAD: {
    type: BraintreeError.types.NETWORK,
    code: "CLIENT_SCRIPT_FAILED_TO_LOAD",
    message: "Braintree client script could not be loaded.",
  },
  METHOD_CALLED_AFTER_TEARDOWN: {
    type: BraintreeError.types.MERCHANT,
    code: "METHOD_CALLED_AFTER_TEARDOWN",
  },
};

},{"./braintree-error":36}],46:[function(_dereq_,module,exports){
"use strict";

function isHTTPS(protocol) {
  protocol = protocol || window.location.protocol;

  return protocol === "https:";
}

module.exports = {
  isHTTPS: isHTTPS,
};

},{}],47:[function(_dereq_,module,exports){
"use strict";

var parser;
var legalHosts = {
  "paypal.com": 1,
  "braintreepayments.com": 1,
  "braintreegateway.com": 1,
  "braintree-api.com": 1,
};

// endRemoveIf(production)

function stripSubdomains(domain) {
  return domain.split(".").slice(-2).join(".");
}

function isVerifiedDomain(url) {
  var mainDomain;

  url = url.toLowerCase();

  if (!/^https:/.test(url)) {
    return false;
  }

  parser = parser || document.createElement("a");
  parser.href = url;
  mainDomain = stripSubdomains(parser.hostname);

  return legalHosts.hasOwnProperty(mainDomain);
}

module.exports = isVerifiedDomain;

},{}],48:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],49:[function(_dereq_,module,exports){
"use strict";

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === "function";
  });
};

},{}],50:[function(_dereq_,module,exports){
"use strict";

var PromisePolyfill = _dereq_("promise-polyfill");
var ExtendedPromise = _dereq_("@braintree/extended-promise");

// eslint-disable-next-line no-undef
var PromiseGlobal = typeof Promise !== "undefined" ? Promise : PromisePolyfill;

ExtendedPromise.suppressUnhandledPromiseMessage = true;
ExtendedPromise.setPromise(PromiseGlobal);

module.exports = PromiseGlobal;

},{"@braintree/extended-promise":5,"promise-polyfill":30}],51:[function(_dereq_,module,exports){
"use strict";

function useMin(isDebug) {
  return isDebug ? "" : ".min";
}

module.exports = useMin;

},{}],52:[function(_dereq_,module,exports){
"use strict";

// NEXT_MAJOR_VERSION old versions of IE don't have atob, in the
// next major version, we're dropping support for those versions
// so we can eliminate the need to have this atob polyfill
var atobNormalized = typeof atob === "function" ? atob : atobPolyfill;

function atobPolyfill(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp(
    "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"
  );
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var result = "";

  if (!base64Matcher.test(base64String)) {
    throw new Error("Non base64 encoded input passed to window.atob polyfill");
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = ((b1 & 0x3f) << 2) | ((b2 >> 4) & 0x3);
    b = ((b2 & 0xf) << 4) | ((b3 >> 2) & 0xf);
    c = ((b3 & 0x3) << 6) | (b4 & 0x3f);

    result +=
      String.fromCharCode(a) +
      (b ? String.fromCharCode(b) : "") +
      (c ? String.fromCharCode(c) : "");
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: function (base64String) {
    return atobNormalized.call(window, base64String);
  },
  _atob: atobPolyfill,
};

},{}],53:[function(_dereq_,module,exports){
"use strict";

var assign = _dereq_("../../../lib/assign").assign;
var analytics = _dereq_("../../../lib/analytics");
var BraintreeError = _dereq_("../../../lib/braintree-error");
var Promise = _dereq_("../../../lib/promise");
var isVerifiedDomain = _dereq_("../../../lib/is-verified-domain");
var ExtendedPromise = _dereq_("@braintree/extended-promise");
var EventEmitter = _dereq_("@braintree/event-emitter");
var errors = _dereq_("../../shared/errors");
var iFramer = _dereq_("@braintree/iframer");
var Bus = _dereq_("framebus");
var constants = _dereq_("../../shared/constants");
var uuid = _dereq_("@braintree/uuid");
var events = _dereq_("../../shared/events");
var useMin = _dereq_("../../../lib/use-min");
var BUS_CONFIGURATION_REQUEST_EVENT =
  _dereq_("../../../lib/constants").BUS_CONFIGURATION_REQUEST_EVENT;

var VERSION = "3.92.0";
var IFRAME_HEIGHT = 400;
var IFRAME_WIDTH = 400;

function BaseFramework(options) {
  EventEmitter.call(this);

  this._client = options.client;
  this._createPromise = options.createPromise;
  this._createOptions = options;

  if (this._client) {
    this._isDebug = this._client.getConfiguration().isDebug;
    this._assetsUrl =
      this._client.getConfiguration().gatewayConfiguration.assetsUrl;
  } else {
    this._isDebug = Boolean(options.isDebug);
    this._assetsUrl = options.assetsUrl;
  }
  this._assetsUrl = this._assetsUrl + "/web/" + VERSION;
}

EventEmitter.createChild(BaseFramework);

BaseFramework.prototype._waitForClient = function () {
  if (this._client) {
    return Promise.resolve();
  }

  return this._createPromise.then(
    function (client) {
      this._client = client;
    }.bind(this)
  );
};

BaseFramework.prototype.setUpEventListeners = function () {
  throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
};

BaseFramework.prototype.verifyCard = function (options, privateOptions) {
  var formattedOptions, error;
  var self = this;

  privateOptions = privateOptions || {};

  error = this._checkForVerifyCardError(options, privateOptions);

  if (error) {
    return Promise.reject(error);
  }

  this._verifyCardInProgress = true;

  formattedOptions = this._formatVerifyCardOptions(options);

  return this._formatLookupData(formattedOptions)
    .then(function (data) {
      analytics.sendEvent(
        self._createPromise,
        "three-d-secure.verification-flow.started"
      );

      return self._performLookup(formattedOptions.nonce, data);
    })
    .then(function (response) {
      analytics.sendEvent(
        self._createPromise,
        "three-d-secure.verification-flow.3ds-version." +
          response.lookup.threeDSecureVersion
      );

      return self._onLookupComplete(response, formattedOptions);
    })
    .then(function (response) {
      return self.initializeChallengeWithLookupResponse(
        response,
        formattedOptions
      );
    })
    .then(function (payload) {
      self._resetVerificationState();

      analytics.sendEvent(
        self._createPromise,
        "three-d-secure.verification-flow.completed"
      );

      return payload;
    })
    .catch(function (err) {
      self._resetVerificationState();

      analytics.sendEvent(
        self._createPromise,
        "three-d-secure.verification-flow.failed"
      );

      return Promise.reject(err);
    });
};

BaseFramework.prototype._checkForFrameworkSpecificVerifyCardErrors =
  function () {
    throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
  };

BaseFramework.prototype._presentChallenge = function () {
  throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
};

BaseFramework.prototype.prepareLookup = function () {
  throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
};

BaseFramework.prototype._resetVerificationState = function () {
  this._verifyCardInProgress = false;
  this._verifyCardPromisePlus = null;
};

BaseFramework.prototype._performLookup = function (nonce, data) {
  var self = this;
  var url = "payment_methods/" + nonce + "/three_d_secure/lookup";

  return this._waitForClient().then(function () {
    return self._client
      .request({
        endpoint: url,
        method: "post",
        data: data,
      })
      .catch(function (err) {
        var status = err && err.details && err.details.httpStatus;
        var analyticsMessage = "three-d-secure.verification-flow.lookup-failed";
        var lookupError;

        if (status === 404) {
          lookupError = errors.THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR;
          analyticsMessage += ".404";
        } else if (status === 422) {
          lookupError = errors.THREEDS_LOOKUP_VALIDATION_ERROR;
          analyticsMessage += ".422";
        } else {
          lookupError = errors.THREEDS_LOOKUP_ERROR;
        }

        analytics.sendEvent(self._createPromise, analyticsMessage);

        return Promise.reject(
          new BraintreeError({
            type: lookupError.type,
            code: lookupError.code,
            message: lookupError.message,
            details: {
              originalError: err,
            },
          })
        );
      });
  });
};

BaseFramework.prototype._checkForVerifyCardError = function (
  options,
  privateOptions
) {
  var errorOption;

  if (this._verifyCardInProgress === true) {
    return new BraintreeError(errors.THREEDS_AUTHENTICATION_IN_PROGRESS);
  } else if (!options.nonce) {
    errorOption = "a nonce";
  } else if (!options.amount) {
    errorOption = "an amount";
  }

  if (!errorOption) {
    errorOption = this._checkForFrameworkSpecificVerifyCardErrors(
      options,
      privateOptions
    );
  }

  if (errorOption) {
    return new BraintreeError({
      type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
      code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
      message: "verifyCard options must include " + errorOption + ".",
    });
  }

  return null;
};

BaseFramework.prototype.initializeChallengeWithLookupResponse = function (
  lookupResponse,
  options
) {
  var self = this;

  options = options || {};

  this._lookupPaymentMethod = lookupResponse.paymentMethod;

  // sets this in the case that initializeChallengeWithLookupResponse is
  // called as a standalone method from a server side lookup. In a normal
  // verifyCard flow, this promise will already exist
  self._verifyCardPromisePlus =
    self._verifyCardPromisePlus || new ExtendedPromise();
  self._handleLookupResponse(lookupResponse, options);

  return self._verifyCardPromisePlus.then(function (payload) {
    analytics.sendEvent(
      self._createPromise,
      "three-d-secure.verification-flow.liability-shifted." +
        String(payload.liabilityShifted)
    );
    analytics.sendEvent(
      self._createPromise,
      "three-d-secure.verification-flow.liability-shift-possible." +
        String(payload.liabilityShiftPossible)
    );

    return payload;
  });
};

BaseFramework.prototype._handleLookupResponse = function (
  lookupResponse,
  options
) {
  var challengeShouldBePresented = Boolean(
    lookupResponse.lookup && lookupResponse.lookup.acsUrl
  );
  var details;

  analytics.sendEvent(
    this._createPromise,
    "three-d-secure.verification-flow.challenge-presented." +
      String(challengeShouldBePresented)
  );

  if (challengeShouldBePresented) {
    this._presentChallenge(lookupResponse, options);
  } else {
    details = this._formatAuthResponse(
      lookupResponse.paymentMethod,
      lookupResponse.threeDSecureInfo
    );
    details.verificationDetails = lookupResponse.threeDSecureInfo;

    this._verifyCardPromisePlus.resolve(details);
  }
};

BaseFramework.prototype._onLookupComplete = function (response) {
  this._lookupPaymentMethod = response.paymentMethod;
  this._verifyCardPromisePlus = new ExtendedPromise();

  return Promise.resolve(response);
};

BaseFramework.prototype._formatAuthResponse = function (
  paymentMethod,
  threeDSecureInfo
) {
  return {
    nonce: paymentMethod.nonce,
    type: paymentMethod.type,
    binData: paymentMethod.binData,
    details: paymentMethod.details,
    description:
      paymentMethod.description &&
      paymentMethod.description.replace(/\+/g, " "),
    liabilityShifted: threeDSecureInfo && threeDSecureInfo.liabilityShifted,
    liabilityShiftPossible:
      threeDSecureInfo && threeDSecureInfo.liabilityShiftPossible,
    threeDSecureInfo: paymentMethod.threeDSecureInfo,
  };
};

BaseFramework.prototype._formatVerifyCardOptions = function (options) {
  return assign({}, options);
};

BaseFramework.prototype._formatLookupData = function (options) {
  var data = {
    amount: options.amount,
  };

  return Promise.resolve(data);
};

BaseFramework.prototype._handleV1AuthResponse = function (data) {
  var authResponse = JSON.parse(data.auth_response);

  if (authResponse.success) {
    this._verifyCardPromisePlus.resolve(
      this._formatAuthResponse(
        authResponse.paymentMethod,
        authResponse.threeDSecureInfo
      )
    );
  } else if (
    authResponse.threeDSecureInfo &&
    authResponse.threeDSecureInfo.liabilityShiftPossible
  ) {
    this._verifyCardPromisePlus.resolve(
      this._formatAuthResponse(
        this._lookupPaymentMethod,
        authResponse.threeDSecureInfo
      )
    );
  } else {
    this._verifyCardPromisePlus.reject(
      new BraintreeError({
        type: BraintreeError.types.UNKNOWN,
        code: "UNKNOWN_AUTH_RESPONSE",
        message: authResponse.error.message,
      })
    );
  }
};

BaseFramework.prototype.cancelVerifyCard = function () {
  var response, threeDSecureInfo;

  this._verifyCardInProgress = false;

  if (!this._lookupPaymentMethod) {
    return Promise.reject(
      new BraintreeError(errors.THREEDS_NO_VERIFICATION_PAYLOAD)
    );
  }

  threeDSecureInfo = this._lookupPaymentMethod.threeDSecureInfo;

  response = assign({}, this._lookupPaymentMethod, {
    liabilityShiftPossible:
      threeDSecureInfo && threeDSecureInfo.liabilityShiftPossible,
    liabilityShifted: threeDSecureInfo && threeDSecureInfo.liabilityShifted,
    verificationDetails:
      threeDSecureInfo && threeDSecureInfo.verificationDetails,
  });

  return Promise.resolve(response);
};

BaseFramework.prototype._setupV1Bus = function (options) {
  var clientConfiguration = this._client.getConfiguration();
  var parentURL = window.location.href.split("#")[0];
  var lookupResponse = options.lookupResponse;
  var channel = uuid();
  var bus = new Bus({
    channel: channel,
    verifyDomain: isVerifiedDomain,
  });
  var authenticationCompleteBaseUrl =
    this._assetsUrl +
    "/html/three-d-secure-authentication-complete-frame.html?channel=" +
    encodeURIComponent(channel) +
    "&";

  bus.on(BUS_CONFIGURATION_REQUEST_EVENT, function (reply) {
    reply({
      clientConfiguration: clientConfiguration,
      nonce: options.nonce,
      acsUrl: lookupResponse.acsUrl,
      pareq: lookupResponse.pareq,
      termUrl:
        lookupResponse.termUrl +
        "&three_d_secure_version=" +
        VERSION +
        "&authentication_complete_base_url=" +
        encodeURIComponent(authenticationCompleteBaseUrl),
      md: lookupResponse.md,
      parentUrl: parentURL,
    });
  });

  bus.on(events.AUTHENTICATION_COMPLETE, options.handleAuthResponse);

  return bus;
};

BaseFramework.prototype._setupV1Iframe = function (options) {
  var url =
    this._assetsUrl +
    "/html/three-d-secure-bank-frame" +
    useMin(this._isDebug) +
    ".html?showLoader=" +
    options.showLoader;
  var bankIframe = iFramer({
    src: url,
    height: IFRAME_HEIGHT,
    width: IFRAME_WIDTH,
    name: constants.LANDING_FRAME_NAME + "_" + this._v1Bus.channel,
    title: "3D Secure Authorization Frame",
  });

  return bankIframe;
};

BaseFramework.prototype._setupV1Elements = function (options) {
  this._v1Bus = this._setupV1Bus(options);
  this._v1Iframe = this._setupV1Iframe(options);
};

BaseFramework.prototype._teardownV1Elements = function () {
  if (this._v1Bus) {
    this._v1Bus.teardown();
    this._v1Bus = null;
  }

  if (this._v1Iframe && this._v1Iframe.parentNode) {
    this._v1Iframe.parentNode.removeChild(this._v1Iframe);
    this._v1Iframe = null;
  }

  if (this._onV1Keyup) {
    document.removeEventListener("keyup", this._onV1Keyup);
    this._onV1Keyup = null;
  }
};

BaseFramework.prototype.teardown = function () {
  analytics.sendEvent(this._createPromise, "three-d-secure.teardown-completed");

  this._teardownV1Elements();

  return Promise.resolve();
};

module.exports = BaseFramework;

},{"../../../lib/analytics":32,"../../../lib/assign":34,"../../../lib/braintree-error":36,"../../../lib/constants":37,"../../../lib/is-verified-domain":47,"../../../lib/promise":50,"../../../lib/use-min":51,"../../shared/constants":62,"../../shared/errors":63,"../../shared/events":64,"@braintree/event-emitter":4,"@braintree/extended-promise":5,"@braintree/iframer":6,"@braintree/uuid":10,"framebus":16}],54:[function(_dereq_,module,exports){
"use strict";
// NEXT_MAJOR_VERSION drop support for Bootstrap framework,
// recomend using inline frame version and putting it in
// the merchant's own bootstrap modal

var SongbirdFramework = _dereq_("./songbird");

function Bootstrap3ModalFramework(options) {
  SongbirdFramework.call(this, options);
}

Bootstrap3ModalFramework.prototype = Object.create(
  SongbirdFramework.prototype,
  {
    constructor: SongbirdFramework,
  }
);

Bootstrap3ModalFramework.prototype._createV1IframeModalElement = function (
  iframe
) {
  var modal = document.createElement("div");

  modal.innerHTML =
    '<div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="CCAFrameModal-label" aria-hidden="true" style="display: block;">' +
    '<div class="modal-dialog" style="width:440px;z-index:999999;">' +
    '<div class="modal-content">' +
    '<div class="modal-body" data-braintree-v1-fallback-iframe-container>' +
    '<button type="button" data-braintree-v1-fallback-close-button class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div data-braintree-v1-fallback-backdrop style="' +
    "position: fixed;" +
    "cursor: pointer;" +
    "z-index: 999998;" +
    "top: 0;" +
    "left: 0;" +
    "width: 100%;" +
    "height: 100%;" +
    '"></div>' +
    "</div>";

  modal
    .querySelector("[data-braintree-v1-fallback-iframe-container]")
    .appendChild(iframe);

  return modal;
};

Bootstrap3ModalFramework.prototype._createCardinalConfigurationOptions =
  function (setupOptions) {
    var options =
      SongbirdFramework.prototype._createCardinalConfigurationOptions.call(
        this,
        setupOptions
      );

    options.payment.framework = "bootstrap3";

    return options;
  };

module.exports = Bootstrap3ModalFramework;

},{"./songbird":59}],55:[function(_dereq_,module,exports){
"use strict";

var SongbirdFramework = _dereq_("./songbird");

function CardinalModalFramework(options) {
  SongbirdFramework.call(this, options);
}

CardinalModalFramework.prototype = Object.create(SongbirdFramework.prototype, {
  constructor: SongbirdFramework,
});

CardinalModalFramework.prototype._createV1IframeModalElement = function (
  iframe
) {
  var modal = document.createElement("div");
  var addCloseButton = Boolean(
    this._createOptions &&
      this._createOptions.cardinalSDKConfig &&
      this._createOptions.cardinalSDKConfig.payment &&
      this._createOptions.cardinalSDKConfig.payment.displayExitButton
  );

  modal.innerHTML =
    '<div style="' +
    "position: fixed;" +
    "z-index: 999999;" +
    "top: 50%;" +
    "left: 50%;" +
    "padding: 24px 20px;" +
    "transform: translate(-50%,-50%);" +
    "border-radius: 2px;" +
    "background: #fff;" +
    "max-width: 100%;" +
    "overflow: auto;" +
    '">' +
    "<div>" +
    "<button data-braintree-v1-fallback-close-button " +
    'style="' +
    "font-family: Helvetica,Arial,sans-serif;" +
    "font-size: 25px;" +
    "line-height: 12px;" +
    "position: absolute;" +
    "top: 2px;" +
    "right: 0px;" +
    "cursor: pointer;" +
    "color: #999;" +
    "border: 0;" +
    "outline: none;" +
    "background: none;" +
    '" ' +
    "onMouseOver=\"this.style.color='#000'\" " +
    "onMouseOut=\"this.style.color='#999'\"" +
    ">×</button>" +
    "</div>" +
    // iframe container
    '<div data-braintree-v1-fallback-iframe-container style="' +
    "height: 400px;" +
    '"></div>' +
    "</div>" +
    // modal backdrop
    '<div data-braintree-v1-fallback-backdrop style="' +
    "position: fixed;" +
    "z-index: 999998;" +
    "cursor: pointer;" +
    "top: 0;" +
    "left: 0;" +
    "width: 100%;" +
    "height: 100%;" +
    "transition: opacity 1ms ease;" +
    "background: rgba(0,0,0,.6);" +
    '"></div>';

  if (!addCloseButton) {
    modal.querySelector(
      "[data-braintree-v1-fallback-close-button]"
    ).style.display = "none";
  }
  modal
    .querySelector("[data-braintree-v1-fallback-iframe-container]")
    .appendChild(iframe);

  return modal;
};

module.exports = CardinalModalFramework;

},{"./songbird":59}],56:[function(_dereq_,module,exports){
"use strict";

var LegacyFramework = _dereq_("./legacy");
var CardinalModalFramework = _dereq_("./cardinal-modal");
var Bootstrap3ModalFramework = _dereq_("./bootstrap3-modal");
var InlineIframeFramework = _dereq_("./inline-iframe");

module.exports = {
  legacy: LegacyFramework,
  "cardinal-modal": CardinalModalFramework,
  "bootstrap3-modal": Bootstrap3ModalFramework,
  "inline-iframe": InlineIframeFramework,
};

},{"./bootstrap3-modal":54,"./cardinal-modal":55,"./inline-iframe":57,"./legacy":58}],57:[function(_dereq_,module,exports){
"use strict";

var SongbirdFramework = _dereq_("./songbird");
var BraintreeError = _dereq_("../../../lib/braintree-error");
var errors = _dereq_("../../shared/errors");
var enumerate = _dereq_("../../../lib/enumerate");

function InlineIframeFramework(options) {
  SongbirdFramework.call(this, options);
}

InlineIframeFramework.prototype = Object.create(SongbirdFramework.prototype, {
  constructor: SongbirdFramework,
});

InlineIframeFramework.events = enumerate(
  ["AUTHENTICATION_IFRAME_AVAILABLE"],
  "inline-iframe-framework:"
);

InlineIframeFramework.prototype.setUpEventListeners = function (reply) {
  SongbirdFramework.prototype.setUpEventListeners.call(this, reply);

  this.on(
    InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE,
    function (payload, next) {
      reply("authentication-iframe-available", payload, next);
    }
  );
};

InlineIframeFramework.prototype._createCardinalConfigurationOptions = function (
  setupOptions
) {
  var options =
    SongbirdFramework.prototype._createCardinalConfigurationOptions.call(
      this,
      setupOptions
    );

  options.payment.framework = "inline";

  return options;
};

InlineIframeFramework.prototype._addV1IframeToPage = function () {
  this._emit(
    InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE,
    {
      element: this._v1Modal,
    },
    function () {
      // NOOP
    }
  );
};

InlineIframeFramework.prototype._setupFrameworkSpecificListeners = function () {
  this.setCardinalListener("ui.inline.setup", this._onInlineSetup.bind(this));
};

InlineIframeFramework.prototype._onInlineSetup = function (
  htmlTemplate,
  details,
  resolve,
  reject
) {
  var container, hasError;

  if (!htmlTemplate || !details) {
    hasError = true;
  } else if (details.paymentType !== "CCA") {
    hasError = true;
  } else if (
    !(details.data.mode === "suppress" || details.data.mode === "static")
  ) {
    hasError = true;
  }

  if (hasError) {
    reject(new BraintreeError(errors.THREEDS_INLINE_IFRAME_DETAILS_INCORRECT));

    return;
  }

  container = document.createElement("div");
  container.innerHTML = htmlTemplate;

  if (details.data.mode === "suppress") {
    container.style.display = "none";
    document.body.appendChild(container);
    resolve();
  } else if (details.data.mode === "static") {
    this._emit(
      InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE,
      {
        element: container,
      },
      function () {
        resolve();
      }
    );
  }
};

module.exports = InlineIframeFramework;

},{"../../../lib/braintree-error":36,"../../../lib/enumerate":44,"../../shared/errors":63,"./songbird":59}],58:[function(_dereq_,module,exports){
"use strict";

var BaseFramework = _dereq_("./base");
var deferred = _dereq_("../../../lib/deferred");

function LegacyFramework(options) {
  BaseFramework.call(this, options);
}

LegacyFramework.prototype = Object.create(BaseFramework.prototype, {
  constructor: LegacyFramework,
});

LegacyFramework.prototype.setUpEventListeners = function () {
  // noop
};

LegacyFramework.prototype.transformV1CustomerBillingAddress = function (
  customer
) {
  customer.billingAddress.line1 = customer.billingAddress.streetAddress;
  customer.billingAddress.line2 = customer.billingAddress.extendedAddress;
  customer.billingAddress.city = customer.billingAddress.locality;
  customer.billingAddress.state = customer.billingAddress.region;
  customer.billingAddress.countryCode =
    customer.billingAddress.countryCodeAlpha2;
  delete customer.billingAddress.streetAddress;
  delete customer.billingAddress.extendedAddress;
  delete customer.billingAddress.locality;
  delete customer.billingAddress.region;
  delete customer.billingAddress.countryCodeAlpha2;

  return customer;
};

LegacyFramework.prototype._createIframe = function (options) {
  var self = this;

  this._setupV1Elements({
    nonce: options.nonce,
    lookupResponse: options.lookupResponse,
    showLoader: options.showLoader,
    handleAuthResponse: function (data) {
      self._handleAuthResponse(data, options);
    },
  });

  return this._v1Iframe;
};

LegacyFramework.prototype._handleAuthResponse = function (data, options) {
  this._v1Bus.teardown();

  options.removeFrame();

  // This also has to be in a setTimeout so it executes after the `removeFrame`.
  deferred(
    function () {
      this._handleV1AuthResponse(data);
    }.bind(this)
  )();
};

LegacyFramework.prototype._checkForFrameworkSpecificVerifyCardErrors =
  function (options) {
    var errorOption;

    if (typeof options.addFrame !== "function") {
      errorOption = "an addFrame function";
    } else if (typeof options.removeFrame !== "function") {
      errorOption = "a removeFrame function";
    }

    return errorOption;
  };

LegacyFramework.prototype._formatVerifyCardOptions = function (options) {
  var modifiedOptions = BaseFramework.prototype._formatVerifyCardOptions.call(
    this,
    options
  );

  modifiedOptions.addFrame = deferred(options.addFrame);
  modifiedOptions.removeFrame = deferred(options.removeFrame);
  modifiedOptions.showLoader = options.showLoader !== false;

  return modifiedOptions;
};

LegacyFramework.prototype._formatLookupData = function (options) {
  var self = this;

  return BaseFramework.prototype._formatLookupData
    .call(this, options)
    .then(function (data) {
      if (options.customer && options.customer.billingAddress) {
        data.customer = self.transformV1CustomerBillingAddress(
          options.customer
        );
      }

      return data;
    });
};

LegacyFramework.prototype._presentChallenge = function (
  lookupResponse,
  options
) {
  options.addFrame(
    null,
    this._createIframe({
      showLoader: options.showLoader,
      lookupResponse: lookupResponse.lookup,
      nonce: lookupResponse.paymentMethod.nonce,
      removeFrame: options.removeFrame,
    })
  );
};

module.exports = LegacyFramework;

},{"../../../lib/deferred":43,"./base":53}],59:[function(_dereq_,module,exports){
"use strict";

var BaseFramework = _dereq_("./base");
var assign = _dereq_("../../../lib/assign").assign;
var deferred = _dereq_("../../../lib/deferred");
var BraintreeError = _dereq_("../../../lib/braintree-error");
var convertToBraintreeError = _dereq_("../../../lib/convert-to-braintree-error");
var analytics = _dereq_("../../../lib/analytics");
var assets = _dereq_("../../../lib/assets");
var errors = _dereq_("../../shared/errors");
var enumerate = _dereq_("../../../lib/enumerate");
var constants = _dereq_("../../shared/constants");
var Promise = _dereq_("../../../lib/promise");
var ExtendedPromise = _dereq_("@braintree/extended-promise");

var INTEGRATION_TIMEOUT_MS =
  _dereq_("../../../lib/constants").INTEGRATION_TIMEOUT_MS;
var PLATFORM = _dereq_("../../../lib/constants").PLATFORM;
var VERSION = "3.92.0";
var CUSTOMER_CANCELED_SONGBIRD_MODAL = "01";
var SONGBIRD_UI_EVENTS = [
  "ui.close",
  "ui.render",

  // TODO these events are not documented in the
  // client reference because so far we have
  // not been able to trigger them in our testing
  "ui.renderHidden",
  "ui.loading.close",
  "ui.loading.render",
];

var SCA_EXEMPTION_TYPES = ["low_value", "transaction_risk_analysis"];

function SongbirdFramework(options) {
  BaseFramework.call(this, options);

  this._useV1Fallback = false;
  this._clientMetadata = {
    requestedThreeDSecureVersion: "2",
    sdkVersion: PLATFORM + "/" + VERSION,
  };
  this._getDfReferenceIdPromisePlus = new ExtendedPromise();
  this.setupSongbird(options);
  this._cardinalEvents = [];
}

SongbirdFramework.prototype = Object.create(BaseFramework.prototype, {
  constructor: SongbirdFramework,
});

SongbirdFramework.events = enumerate(
  [
    "LOOKUP_COMPLETE",
    "CUSTOMER_CANCELED",
    "UI.CLOSE",
    "UI.RENDER",
    "UI.RENDERHIDDEN",
    "UI.LOADING.CLOSE",
    "UI.LOADING.RENDER",
  ],
  "songbird-framework:"
);

SongbirdFramework.prototype.setUpEventListeners = function (reply) {
  this.on(SongbirdFramework.events.LOOKUP_COMPLETE, function (data, next) {
    reply("lookup-complete", data, next);
  });
  this.on(SongbirdFramework.events.CUSTOMER_CANCELED, function () {
    reply("customer-canceled");
  });
  this.on(SongbirdFramework.events["UI.CLOSE"], function () {
    reply("authentication-modal-close");
  });
  this.on(SongbirdFramework.events["UI.RENDER"], function () {
    reply("authentication-modal-render");
  });
  this.on(SongbirdFramework.events["UI.RENDERHIDDEN"], function () {
    reply("authentication-modal-render-hidden");
  });
  this.on(SongbirdFramework.events["UI.LOADING.CLOSE"], function () {
    reply("authentication-modal-loader-close");
  });
  this.on(SongbirdFramework.events["UI.LOADING.RENDER"], function () {
    reply("authentication-modal-loader-render");
  });
};

SongbirdFramework.prototype.prepareLookup = function (options) {
  var data = assign({}, options);
  var self = this;

  return this.getDfReferenceId()
    .then(function (id) {
      data.dfReferenceId = id;
    })
    .then(function () {
      return self._triggerCardinalBinProcess(options.bin);
    })
    .catch(function () {
      // catch and ignore errors from looking up
      // df reference and Cardinal bin process
    })
    .then(function () {
      return self._waitForClient();
    })
    .then(function () {
      data.clientMetadata = self._clientMetadata;
      data.authorizationFingerprint =
        self._client.getConfiguration().authorizationFingerprint;
      data.braintreeLibraryVersion = "braintree/web/" + VERSION;

      return data;
    });
};

SongbirdFramework.prototype.initializeChallengeWithLookupResponse = function (
  lookupResponse,
  options
) {
  return this.setupSongbird().then(
    function () {
      return BaseFramework.prototype.initializeChallengeWithLookupResponse.call(
        this,
        lookupResponse,
        options
      );
    }.bind(this)
  );
};

SongbirdFramework.prototype.initiateV1Fallback = function (errorType) {
  this._useV1Fallback = true;
  this._removeSongbirdListeners();
  analytics.sendEvent(
    this._createPromise,
    "three-d-secure.v1-fallback." + errorType
  );

  if (this._songbirdPromise) {
    this._songbirdPromise.resolve();
  }
};

SongbirdFramework.prototype._triggerCardinalBinProcess = function (bin) {
  var self = this;
  var issuerStartTime = Date.now();

  return window.Cardinal.trigger("bin.process", bin).then(function (
    binResults
  ) {
    self._clientMetadata.issuerDeviceDataCollectionTimeElapsed =
      Date.now() - issuerStartTime;
    self._clientMetadata.issuerDeviceDataCollectionResult =
      binResults && binResults.Status;
  });
};

SongbirdFramework.prototype.transformBillingAddress = function (
  additionalInformation,
  billingAddress
) {
  if (billingAddress) {
    // map from public API to the API that the Gateway expects
    extractAddressData(billingAddress, additionalInformation, "billing");
    additionalInformation.billingPhoneNumber = billingAddress.phoneNumber;
    additionalInformation.billingGivenName = billingAddress.givenName;
    additionalInformation.billingSurname = billingAddress.surname;
  }

  return additionalInformation;
};

SongbirdFramework.prototype.transformShippingAddress = function (
  additionalInformation
) {
  var shippingAddress = additionalInformation.shippingAddress;

  if (shippingAddress) {
    // map from public API to the API that the Gateway expects
    extractAddressData(shippingAddress, additionalInformation, "shipping");

    delete additionalInformation.shippingAddress;
  }

  return additionalInformation;
};

SongbirdFramework.prototype._createV1IframeModalElement = function (iframe) {
  var modal = document.createElement("div");

  modal.innerHTML =
    '<div data-braintree-v1-fallback-iframe-container="true" style="' +
    "height: 400px;" +
    '"></div>';
  modal
    .querySelector('[data-braintree-v1-fallback-iframe-container="true"]')
    .appendChild(iframe);

  return modal;
};

SongbirdFramework.prototype._createV1IframeModal = function (iframe) {
  var modal = this._createV1IframeModalElement(iframe);
  var btn = modal.querySelector("[data-braintree-v1-fallback-close-button]");
  var backdrop = modal.querySelector("[data-braintree-v1-fallback-backdrop]");
  var self = this;

  function closeHandler() {
    modal.parentNode.removeChild(modal);
    self.cancelVerifyCard(errors.THREEDS_CARDINAL_SDK_CANCELED);
    document.removeEventListener("keyup", self._onV1Keyup);
    self._onV1Keyup = null;
  }

  this._onV1Keyup = function (e) {
    if (e.key !== "Escape") {
      return;
    }

    if (!modal.parentNode) {
      // modal not on page
      return;
    }

    closeHandler();
  };

  if (btn) {
    btn.addEventListener("click", closeHandler);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeHandler);
  }

  document.addEventListener("keyup", this._onV1Keyup);

  return modal;
};

SongbirdFramework.prototype._addV1IframeToPage = function () {
  document.body.appendChild(this._v1Modal);
};

SongbirdFramework.prototype._handleAuthResponseFromV1Fallback = function (
  data
) {
  this._teardownV1Elements();
  this._v1Modal.parentNode.removeChild(this._v1Modal);
  this._handleV1AuthResponse(data);
};

SongbirdFramework.prototype._presentChallengeWithV1Fallback = function (
  lookupResponse
) {
  var self = this;

  this._setupV1Elements({
    lookupResponse: lookupResponse,
    showLoader: true,
    handleAuthResponse: function (data) {
      self._handleAuthResponseFromV1Fallback(data);
    },
  });
  this._v1Modal = this._createV1IframeModal(this._v1Iframe);
  this._addV1IframeToPage();
};

SongbirdFramework.prototype.setupSongbird = function (setupOptions) {
  var self = this;
  var startTime = Date.now();

  if (this._songbirdPromise) {
    return this._songbirdPromise;
  }

  setupOptions = setupOptions || {};

  this._songbirdPromise = new ExtendedPromise();
  this._v2SetupFailureReason = "reason-unknown";

  self
    ._loadCardinalScript(setupOptions)
    .then(function () {
      if (!window.Cardinal) {
        self._v2SetupFailureReason = "cardinal-global-unavailable";

        return Promise.reject(
          new BraintreeError(errors.THREEDS_CARDINAL_SDK_SETUP_FAILED)
        );
      }

      return self._configureCardinalSdk({
        setupOptions: setupOptions,
        setupStartTime: startTime,
      });
    })
    .catch(function (err) {
      var error = convertToBraintreeError(err, {
        type: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.type,
        code: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.code,
        message: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.message,
      });

      self._getDfReferenceIdPromisePlus.reject(error);

      window.clearTimeout(self._songbirdSetupTimeoutReference);
      analytics.sendEvent(
        self._client,
        "three-d-secure.cardinal-sdk.init.setup-failed"
      );
      self.initiateV1Fallback(
        "cardinal-sdk-setup-failed." + self._v2SetupFailureReason
      );
    });

  return this._songbirdPromise;
};

SongbirdFramework.prototype._configureCardinalSdk = function (config) {
  var self = this;

  return this._waitForClient()
    .then(function () {
      var threeDSConfig =
        self._client.getConfiguration().gatewayConfiguration.threeDSecure;

      return threeDSConfig;
    })
    .then(function (threeDSConfig) {
      var jwt = threeDSConfig.cardinalAuthenticationJWT;
      var setupOptions = config.setupOptions;
      var setupStartTime = config.setupStartTime;
      var cardinalConfiguration =
        self._createCardinalConfigurationOptions(setupOptions);

      SONGBIRD_UI_EVENTS.forEach(function (eventName) {
        self.setCardinalListener(eventName, function () {
          self._emit(SongbirdFramework.events[eventName.toUpperCase()]);
        });
      });
      self.setCardinalListener(
        "payments.setupComplete",
        self._createPaymentsSetupCompleteCallback()
      );

      self._setupFrameworkSpecificListeners();

      window.Cardinal.configure(cardinalConfiguration);

      window.Cardinal.setup("init", {
        jwt: jwt,
      });

      self._clientMetadata.cardinalDeviceDataCollectionTimeElapsed =
        Date.now() - setupStartTime;

      self.setCardinalListener(
        "payments.validated",
        self._createPaymentsValidatedCallback()
      );
    })
    .catch(function (err) {
      self._v2SetupFailureReason = "cardinal-configuration-threw-error";

      return Promise.reject(err);
    });
};

SongbirdFramework.prototype.setCardinalListener = function (eventName, cb) {
  this._cardinalEvents.push(eventName);
  window.Cardinal.on(eventName, cb);
};

SongbirdFramework.prototype._setupFrameworkSpecificListeners = function () {
  // noop
};

SongbirdFramework.prototype._createCardinalConfigurationOptions = function (
  setupOptions
) {
  var cardinalConfiguration = setupOptions.cardinalSDKConfig || {};
  var paymentSettings = cardinalConfiguration.payment || {};

  if (!cardinalConfiguration.logging && setupOptions.loggingEnabled) {
    cardinalConfiguration.logging = {
      level: "verbose",
    };
  }

  cardinalConfiguration.payment = {};

  if (paymentSettings.hasOwnProperty("displayLoading")) {
    cardinalConfiguration.payment.displayLoading =
      paymentSettings.displayLoading;
  }
  if (paymentSettings.hasOwnProperty("displayExitButton")) {
    cardinalConfiguration.payment.displayExitButton =
      paymentSettings.displayExitButton;
  }

  return cardinalConfiguration;
};

SongbirdFramework.prototype._loadCardinalScript = function (setupOptions) {
  var self = this;
  var scriptSource = constants.CARDINAL_SCRIPT_SOURCE.sandbox;

  return this._waitForClient()
    .then(function () {
      var isProduction =
        self._client.getConfiguration().gatewayConfiguration.environment ===
        "production";

      self._songbirdSetupTimeoutReference = window.setTimeout(function () {
        analytics.sendEvent(
          self._client,
          "three-d-secure.cardinal-sdk.init.setup-timeout"
        );
        self.initiateV1Fallback("cardinal-sdk-setup-timeout");
      }, setupOptions.timeout || INTEGRATION_TIMEOUT_MS);

      if (isProduction) {
        scriptSource = constants.CARDINAL_SCRIPT_SOURCE.production;
      }

      return assets.loadScript({ src: scriptSource });
    })
    .catch(function (err) {
      self._v2SetupFailureReason = "songbird-js-failed-to-load";

      return Promise.reject(
        convertToBraintreeError(
          err,
          errors.THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED
        )
      );
    });
};

SongbirdFramework.prototype._createPaymentsSetupCompleteCallback = function () {
  var self = this;

  return function (data) {
    self._getDfReferenceIdPromisePlus.resolve(data.sessionId);

    window.clearTimeout(self._songbirdSetupTimeoutReference);
    analytics.sendEvent(
      self._createPromise,
      "three-d-secure.cardinal-sdk.init.setup-completed"
    );

    self._songbirdPromise.resolve();
  };
};

SongbirdFramework.prototype.getDfReferenceId = function () {
  return this._getDfReferenceIdPromisePlus;
};

SongbirdFramework.prototype._performJWTValidation = function (
  rawCardinalSDKVerificationData,
  jwt
) {
  var self = this;
  var nonce = this._lookupPaymentMethod.nonce;
  var url =
    "payment_methods/" + nonce + "/three_d_secure/authenticate_from_jwt";
  var cancelCode =
    rawCardinalSDKVerificationData &&
    rawCardinalSDKVerificationData.Payment &&
    rawCardinalSDKVerificationData.Payment.ExtendedData &&
    rawCardinalSDKVerificationData.Payment.ExtendedData.ChallengeCancel;

  if (cancelCode) {
    // see ChallengeCancel docs here for different values:
    // https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/98315/Response+Objects
    analytics.sendEvent(
      this._createPromise,
      "three-d-secure.verification-flow.cardinal-sdk.cancel-code." + cancelCode
    );

    if (cancelCode === CUSTOMER_CANCELED_SONGBIRD_MODAL) {
      this._emit(SongbirdFramework.events.CUSTOMER_CANCELED);
    }
  }

  analytics.sendEvent(
    this._createPromise,
    "three-d-secure.verification-flow.upgrade-payment-method.started"
  );

  return this._waitForClient()
    .then(function () {
      return self._client.request({
        method: "post",
        endpoint: url,
        data: {
          jwt: jwt,
          paymentMethodNonce: nonce,
        },
      });
    })
    .then(function (response) {
      var paymentMethod = response.paymentMethod || self._lookupPaymentMethod;
      var formattedResponse = self._formatAuthResponse(
        paymentMethod,
        response.threeDSecureInfo
      );

      formattedResponse.rawCardinalSDKVerificationData =
        rawCardinalSDKVerificationData;
      analytics.sendEvent(
        self._client,
        "three-d-secure.verification-flow.upgrade-payment-method.succeeded"
      );

      return Promise.resolve(formattedResponse);
    })
    .catch(function (err) {
      var error = new BraintreeError({
        type: errors.THREEDS_JWT_AUTHENTICATION_FAILED.type,
        code: errors.THREEDS_JWT_AUTHENTICATION_FAILED.code,
        message: errors.THREEDS_JWT_AUTHENTICATION_FAILED.message,
        details: {
          originalError: err,
        },
      });

      analytics.sendEvent(
        self._client,
        "three-d-secure.verification-flow.upgrade-payment-method.errored"
      );

      return Promise.reject(error);
    });
};

SongbirdFramework.prototype._createPaymentsValidatedCallback = function () {
  var self = this;

  /**
   * @param {object} data Response Data
   * @see {@link https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/98315/Response+Objects#ResponseObjects-ObjectDefinition}
   * @param {string} data.ActionCode The resulting state of the transaction.
   * @param {boolean} data.Validated Represents whether transaction was successfully or not.
   * @param {object} data.Payment Represents additional information about the verification.
   * @param {number} data.ErrorNumber A non-zero value represents the error encountered while attempting the process the message request.
   * @param {string} data.ErrorDescription Application error description for the associated error number.
   * @param {string} validatedJwt Response JWT
   * @returns {void}
   * */
  return function (data, validatedJwt) {
    var formattedError;

    if (self._useV1Fallback) {
      // TODO since we've removed the listeners for the payments validated callback when initiating the v1 fallback,
      // we should never get to this point. Leave this analtyics event in for now and review if that is indeed the
      // case before removing this block.
      analytics.sendEvent(
        self._createPromise,
        "three-d-secure.verification-flow.cardinal-sdk.payments-validated-callback-called-in-v1-fallback-flow"
      );

      return;
    }

    analytics.sendEvent(
      self._createPromise,
      "three-d-secure.verification-flow.cardinal-sdk.action-code." +
        data.ActionCode.toLowerCase()
    );

    if (!self._verifyCardPromisePlus) {
      self.initiateV1Fallback(
        "cardinal-sdk-setup-error.number-" + data.ErrorNumber
      );

      return;
    }

    switch (data.ActionCode) {
      // Handle these scenarios based on liability shift information in the response.
      case "SUCCESS":
      case "NOACTION":
      case "FAILURE":
        self
          ._performJWTValidation(data, validatedJwt)
          .then(function (result) {
            self._verifyCardPromisePlus.resolve(result);
          })
          .catch(function (err) {
            self._verifyCardPromisePlus.reject(err);
          });
        break;

      case "ERROR":
        analytics.sendEvent(
          self._createPromise,
          "three-d-secure.verification-flow.cardinal-sdk-error." +
            data.ErrorNumber
        );

        switch (data.ErrorNumber) {
          case 10001: // Cardinal Docs: Timeout when sending an /Init message
          case 10002: // Cardinal Docs: Timeout when sending an /Start message
            formattedError = new BraintreeError(
              errors.THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT
            );
            break;
          case 10003: // Cardinal Docs: Timeout when sending an /Validate message. Although this code exists we do not yet have a flow where a validate message is sent to Midas. This error should not yet be triggered
          case 10007: // Cardinal Docs: Timeout when sending an /Confirm message
          case 10009: // Cardinal Docs: Timeout when sending an /Continue message
            formattedError = new BraintreeError(
              errors.THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT
            );
            break;
          case 10005: // Cardinal Docs: Songbird was started without a request jwt.
          case 10006: // Cardinal Docs: This is a general configuration error. The description is populated by the specific configuration error that caused the error.
            formattedError = new BraintreeError(
              errors.THREEDS_CARDINAL_SDK_BAD_CONFIG
            );
            break;
          case 10008: // Cardinal Docs: Songbird was initialized without a merchant JWT.
          case 10010: // Cardinal Docs: The response JWT was
            formattedError = new BraintreeError(
              errors.THREEDS_CARDINAL_SDK_BAD_JWT
            );
            break;
          case 10011:
            // This may never get called, according to the Cardinal docs:
            // The user has canceled the transaction. This is generally found in alternative
            // payments that supply a cancel button on the payment brand side.
            analytics.sendEvent(
              self._createPromise,
              "three-d-secure.verification-flow.canceled"
            );
            formattedError = new BraintreeError(
              errors.THREEDS_CARDINAL_SDK_CANCELED
            );
            break;
          default:
            formattedError = new BraintreeError(
              errors.THREEDS_CARDINAL_SDK_ERROR
            );
        }

        formattedError.details = {
          originalError: {
            code: data.ErrorNumber,
            description: data.ErrorDescription,
          },
        };

        self._verifyCardPromisePlus.reject(formattedError);
        break;

      default:
    }
  };
};

SongbirdFramework.prototype._checkForVerifyCardError = function (
  options,
  privateOptions
) {
  if (!options.bin) {
    return new BraintreeError({
      type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
      code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
      message: "verifyCard options must include a BIN.",
    });
  }

  return BaseFramework.prototype._checkForVerifyCardError.call(
    this,
    options,
    privateOptions
  );
};

SongbirdFramework.prototype._checkForFrameworkSpecificVerifyCardErrors =
  function (options, privateOptions) {
    var errorOption;

    if (
      typeof options.onLookupComplete !== "function" &&
      !privateOptions.ignoreOnLookupCompleteRequirement
    ) {
      errorOption = "an onLookupComplete function";
    }

    return errorOption;
  };

SongbirdFramework.prototype._formatVerifyCardOptions = function (options) {
  var modifiedOptions = BaseFramework.prototype._formatVerifyCardOptions.call(
    this,
    options
  );
  var additionalInformation = modifiedOptions.additionalInformation || {};

  additionalInformation = this.transformBillingAddress(
    additionalInformation,
    options.billingAddress
  );
  additionalInformation = this.transformShippingAddress(additionalInformation);

  if (options.onLookupComplete) {
    modifiedOptions.onLookupComplete = deferred(options.onLookupComplete);
  }
  if (options.email) {
    additionalInformation.email = options.email;
  }
  if (options.mobilePhoneNumber) {
    additionalInformation.mobilePhoneNumber = options.mobilePhoneNumber;
  }

  modifiedOptions.additionalInformation = additionalInformation;

  return modifiedOptions;
};

SongbirdFramework.prototype._onLookupComplete = function (
  lookupResponse,
  options
) {
  var self = this;

  return BaseFramework.prototype._onLookupComplete
    .call(this, lookupResponse)
    .then(function (response) {
      return new Promise(function (resolve, reject) {
        // NEXT_MAJOR_VERSION format this response object to look like the mobile sdk response
        // which is basically the lookup param at the top level with some additional accessors
        response.requiresUserAuthentication = Boolean(
          response.lookup && response.lookup.acsUrl
        );

        function next() {
          resolve(response);
        }

        self._verifyCardPromisePlus.catch(reject);

        // If both event and callback are mistakenly used together,
        // prefer the callback when it is passed into the verifyCard options
        if (options.onLookupComplete) {
          options.onLookupComplete(response, next);
        } else {
          self._emit(SongbirdFramework.events.LOOKUP_COMPLETE, response, next);
        }
      });
    });
};

SongbirdFramework.prototype._presentChallenge = function (lookupResponse) {
  // transactionId is required for the Songbird flow, so if it
  // does not exist, we fallback to the 3ds v1 flow
  if (this._useV1Fallback || !lookupResponse.lookup.transactionId) {
    this._presentChallengeWithV1Fallback(lookupResponse.lookup);

    return;
  }

  // set up listener for ref id to call out to bt before calling verify callback
  window.Cardinal.continue(
    "cca",
    {
      AcsUrl: lookupResponse.lookup.acsUrl,
      Payload: lookupResponse.lookup.pareq,
    },
    {
      OrderDetails: { TransactionId: lookupResponse.lookup.transactionId },
    }
  );
};

SongbirdFramework.prototype._formatLookupData = function (options) {
  var self = this;

  return BaseFramework.prototype._formatLookupData
    .call(this, options)
    .then(function (data) {
      data.additionalInfo = options.additionalInformation;

      if (options.accountType) {
        data.accountType = options.accountType;
      }
      if (options.challengeRequested) {
        data.challengeRequested = options.challengeRequested;
      }
      if (options.requestedExemptionType) {
        if (!SCA_EXEMPTION_TYPES.includes(options.requestedExemptionType)) {
          throw new BraintreeError({
            code: errors.THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID.code,
            type: errors.THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID.type,
            message:
              "requestedExemptionType `" +
              options.requestedExemptionType +
              "` is not a valid exemption. The accepted values are: `" +
              SCA_EXEMPTION_TYPES.join("`, `") +
              "`",
          });
        }
        data.requestedExemptionType = options.requestedExemptionType;
      }
      if (options.dataOnlyRequested) {
        data.dataOnlyRequested = options.dataOnlyRequested;
      }
      if (options.exemptionRequested) {
        data.exemptionRequested = options.exemptionRequested;
      }
      if (options.bin) {
        data.bin = options.bin;
      }
      // NEXT_MAJOR_VERSION remove cardAdd in favor of cardAddChallengeRequested
      if (options.cardAdd != null) {
        data.cardAdd = options.cardAdd;
      }
      if (options.cardAddChallengeRequested != null) {
        data.cardAdd = options.cardAddChallengeRequested;
      }

      return self.prepareLookup(data);
    });
};

SongbirdFramework.prototype.cancelVerifyCard = function (verifyCardError) {
  var self = this;

  return BaseFramework.prototype.cancelVerifyCard
    .call(this)
    .then(function (response) {
      if (self._verifyCardPromisePlus) {
        verifyCardError =
          verifyCardError ||
          new BraintreeError(errors.THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT);

        self._verifyCardPromisePlus.reject(verifyCardError);
      }

      return response;
    });
};

SongbirdFramework.prototype._removeSongbirdListeners = function () {
  this._cardinalEvents.forEach(function (eventName) {
    window.Cardinal.off(eventName);
  });

  this._cardinalEvents = [];
};

SongbirdFramework.prototype.teardown = function () {
  if (window.Cardinal) {
    this._removeSongbirdListeners();
  }

  // we intentionally do not remove the Cardinal SDK
  // from the page when tearing down. Subsequent
  // component creations will be faster because
  // the asset is already on the page

  return BaseFramework.prototype.teardown.call(this);
};

function extractAddressData(source, target, prefix) {
  target[prefix + "Line1"] = source.streetAddress;
  target[prefix + "Line2"] = source.extendedAddress;
  target[prefix + "Line3"] = source.line3;
  target[prefix + "City"] = source.locality;
  target[prefix + "State"] = source.region;
  target[prefix + "PostalCode"] = source.postalCode;
  target[prefix + "CountryCode"] = source.countryCodeAlpha2;
}

module.exports = SongbirdFramework;

},{"../../../lib/analytics":32,"../../../lib/assets":33,"../../../lib/assign":34,"../../../lib/braintree-error":36,"../../../lib/constants":37,"../../../lib/convert-to-braintree-error":39,"../../../lib/deferred":43,"../../../lib/enumerate":44,"../../../lib/promise":50,"../../shared/constants":62,"../../shared/errors":63,"./base":53,"@braintree/extended-promise":5}],60:[function(_dereq_,module,exports){
"use strict";

var wrapPromise = _dereq_("@braintree/wrap-promise");
var methods = _dereq_("../../lib/methods");
var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
var EventEmitter = _dereq_("@braintree/event-emitter");
var FRAMEWORKS = _dereq_("./frameworks");

/**
 * @deprecated
 * @callback ThreeDSecure~addFrameCallback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {HTMLIFrameElement} iframe An iframe element containing the bank's authentication page that you must put on your page.
 * @description **Deprecated** The callback used for options.addFrame in 3DS 1.0's {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @deprecated
 * @callback ThreeDSecure~removeFrameCallback
 * @description **Deprecated** The callback used for options.removeFrame in 3DS 1.0's {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @deprecated
 * @typedef {object} ThreeDSecure~verifyCardCustomerObject
 * @property {string} [customer.mobilePhoneNumber] The mobile phone number used for verification. Only numbers; remove dashes, parenthesis and other characters.
 * @property {string} [customer.email] The email used for verification.
 * @property {string} [customer.shippingMethod] The 2-digit string indicating the shipping method chosen for the transaction.
 * @property {string} [customer.billingAddress.firstName] The first name associated with the address.
 * @property {string} [customer.billingAddress.lastName] The last name associated with the address.
 * @property {string} [customer.billingAddress.streetAddress] Line 1 of the Address (eg. number, street, etc).
 * @property {string} [customer.billingAddress.extendedAddress] Line 2 of the Address (eg. suite, apt #, etc.).
 * @property {string} [customer.billingAddress.locality] The locality (city) name associated with the address.
 * @property {string} [customer.billingAddress.region] The 2 letter code for US states or an ISO-3166-2 country subdivision code of up to three letters.
 * @property {string} [customer.billingAddress.postalCode] The zip code or equivalent for countries that have them.
 * @property {string} [customer.billingAddress.countryCodeAlpha2] The 2 character country code.
 * @property {string} [customer.billingAddress.phoneNumber] The phone number associated with the address. Only numbers; remove dashes, parenthesis and other characters.
 * @description **Deprecated** Optional customer information to be passed to 3DS 1.0 for verification.
 */

/**
 * @typedef {object} ThreeDSecure~verifyPayload
 * @property {string} nonce The new payment method nonce produced by the 3D Secure lookup. The original nonce passed into {@link ThreeDSecure#verifyCard|verifyCard} was consumed. This new nonce should be used to transact on your server.
 * @property {string} type The payment method type.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 * @property {boolean} liabilityShiftPossible *Deprecated:* Use `threeDSecureInfo.liabilityShiftPossible` instead.
 * @property {boolean} liabilityShifted *Deprecated:* Use `threeDSecureInfo.liabilityShifted` instead.
 * @property {object} threeDSecureInfo 3DS information about the card. Note: This information should be verified on the server by using the [payment method nonce find method](https://developer.paypal.com/braintree/docs/reference/request/payment-method-nonce/find). The values provided here are merely for convenience. Only values looked up on the server should determine the logic about how to process a transaction.
 * @property {string} threeDSecureInfo.acsTransactionId The transaction identifier from the issuing bank.
 * @property {string} threeDSecureInfo.cavv Cardholder authentication verification value or CAVV. The main encrypted message issuers and card networks use to verify authentication has occurred. Mastercard uses an AVV message and American Express uses an AEVV message, each of which should also be passed in the cavv parameter.
 * @property {string} threeDSecureInfo.dsTransactionId Transaction identifier resulting from 3D Secure 2 authentication.
 * @property {string} threeDSecureInfo.eciFlag The value of the electronic commerce indicator (ECI) flag, which indicates the outcome of the 3DS authentication. This will be a two-digit value.
 * @property {boolean} threeDSecureInfo.enrolled Indicates the status of 3D Secure authentication eligibility with the card issuer.
 * @property {boolean} threeDSecureInfo.liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 * @property {boolean} threeDSecureInfo.liabilityShiftPossible Indicates whether liability shift is still possible on a retry.
 * @property {string} threeDSecureInfo.paresStatus Transaction status result identifier.
 * @property {string} threeDSecureInfo.status Indicates the outcome of the 3D Secure event.
 * @property {string} threeDSecureInfo.threeDSecureAuthenticationId ID of the 3D Secure authentication performed for this transaction. Do not provide this field as a transaction sale parameter if you are using the returned payment method nonce from the payload.
 * @property {string} threeDSecureInfo.threeDSecureServerTransactionId Transaction identifier provided by the issuing bank who recieved the 3D Secure event.
 * @property {string} threeDSecureInfo.threeDSecureVersion The version of 3D Secure authentication used for the transaction.
 * @property {string} threeDSecureInfo.xid Transaction identifier resulting from 3D Secure authentication. Uniquely identifies the transaction and sometimes required in the authorization message. This is a base64-encoded value. This field will no longer be used in 3D Secure 2 authentications for Visa and Mastercard, however it will be supported by American Express.
 * @property {string} threeDSecureInfo.lookup.transStatus Error code returned from the 3D Secure MPI provider.
 * @property {string} threeDSecureInfo.lookup.transStatusReason Description correlating to the transStatus error code.
 * @property {string} threeDSecureInfo.authentication.transStatus Error code returned from the 3D Secure MPI provider.
 * @property {string} threeDSecureInfo.authentication.transStatusReason Description correlating to the transStatus error code.
 * @property {object} rawCardinalSDKVerificationData The response back from the Cardinal SDK after verification has completed. See [Cardinal's Documentation](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/98315/Response+Objects) for more information. If the customer was not required to do a 3D Secure challenge, this object will not be available.
 */

/**
 * @typedef {string} ThreeDSecure~prepareLookupPayload The client data to pass on when doing a server side lookup call.
 */

/**
 * @typedef {object} ThreeDSecure~verificationData
 * @property {boolean} requiresUserAuthentication When `true`, the user will be presented with a 3D Secure challenge when calling `next` in the {@link ThreeDSecure#event:lookup-complete|`lookup-complete` event}.
 * @property {object} threeDSecureInfo Contains liability shift details.
 * @property {boolean} threeDSecureInfo.liabilityShiftPossible Indicates whether the card was eligible for 3D Secure.
 * @property {boolean} threeDSecureInfo.liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 * @property {object} paymentMethod A {@link ThreeDSecure~verifyPayload|verifyPayload} object.
 * @property {object} lookup Details about the 3D Secure lookup.
 * @property {string} lookup.threeDSecureVersion The version of 3D Secure that will be used for the 3D Secure challenge.
 */

/**
 * @typedef {object} ThreeDSecure~billingAddress
 * @property {string} [givenName] The first name associated with the billing address. (maximum length 50)
 * @property {string} [surname] The last name associated with the billing address. (maximum length 50)
 * @property {string} [phoneNumber] The phone number associated with the billing address. Only numbers; remove dashes, parenthesis and other characters.
 * @property {string} [streetAddress] Line 1 of the billing address (eg. number, street, etc). (maximum length 50)
 * @property {string} [extendedAddress] Line 2 of the billing address (eg. suite, apt #, etc.). (maximum length 50)
 * @property {string} [line3] Line 3 of the billing address if needed (eg. suite, apt #, etc). (maximum length 50)
 * @property {string} [locality] The locality (city) name associated with the billing address.
 * @property {string} [region] This field expects an ISO3166-2 subdivision code. The subdivision code is what follows the hyphen separator in the full ISO 3166-2 code. For example, the state of Ohio in the United States we expect "OH" as opposed to the full ISO 3166-2 code "US-OH".
 * @property {string} [postalCode] The zip code or equivalent for countries that have them.
 * @property {string} [countryCodeAlpha2] The 2 character country code.
 */

/**
 * @typedef {object} ThreeDSecure~additionalInformation
 * @property {string} [workPhoneNumber] The work phone number used for verification. Only numbers; remove dashes, parenthesis and other characters. (maximum length 25)
 * @property {string} [shippingGivenName] The first name associated with the shipping address. (maximum length 50)
 * @property {string} [shippingSurname] The last name associated with the shipping address. (maximum length 50)
 * @property {object} [shippingAddress]
 * @property {string} [shippingAddress.streetAddress] Line 1 of the shipping address (eg. number, street, etc). (maximum length 50)
 * @property {string} [shippingAddress.extendedAddress] Line 2 of the shipping address (eg. suite, apt #, etc.). (maximum length 50)
 * @property {string} [shippingAddress.line3] Line 3 of the shipping address if needed (eg. suite, apt #, etc). (maximum length 50)
 * @property {string} [shippingAddress.locality] The locality (city) name associated with the shipping address. (maximum length 50)
 * @property {string} [shippingAddress.region] This field expects an ISO3166-2 subdivision code. The subdivision code is what follows the hyphen separator in the full ISO 3166-2 code. For example, the state of Ohio in the United States we expect "OH" as opposed to the full ISO 3166-2 code "US-OH".
 * @property {string} [shippingAddress.postalCode] The zip code or equivalent for countries that have them. (maximum length 10)
 * @property {string} [shippingAddress.countryCodeAlpha2] The 2 character country code. (maximum length 2)
 * @property {string} [shippingPhone] The phone number associated with the shipping address. Only numbers; remove dashes, parenthesis and other characters. (maximum length 20)
 * @property {string} [shippingMethod] The 2-digit string indicating the name of the shipping method chosen for the transaction. (maximum length 50) Possible values:
 * - `01` Same Day
 * - `02` Overnight / Expedited
 * - `03` Priority (2-3 Days)
 * - `04` Ground
 * - `05` Electronic Delivery
 * - `06` Ship to Store
 * @property {string} [shippingMethodIndicator] The 2-digit string indicating the shipping method chosen for the transaction Possible values.
 * - `01` Ship to cardholder billing address
 * - `02` Ship to another verified address on file with merchant
 * - `03` Ship to address that is different from billing address
 * - `04` Ship to store (store address should be populated on request)
 * - `05` Digital goods
 * - `06` Travel and event tickets, not shipped
 * - `07` Other
 * @property {string} [productCode] The 3-letter string representing the merchant product code. Possible values:
 * - `AIR` Airline
 * - `GEN` General Retail
 * - `DIG` Digital Goods
 * - `SVC` Services
 * - `RES` Restaurant
 * - `TRA` Travel
 * - `DSP` Cash Dispensing
 * - `REN` Car Rental
 * - `GAS` Fuel
 * - `LUX` Luxury Retail
 * - `ACC` Accommodation Retail
 * - `TBD` Other
 * @property {string} [deliveryTimeframe] The 2-digit number indicating the delivery time frame. Possible values:
 * - `01` Electronic delivery
 * - `02` Same day shipping
 * - `03` Overnight shipping
 * - `04` Two or more day shipping
 * @property {string} [deliveryEmail] For electronic delivery, email address to which the merchandise was delivered. (maximum length 254)
 * @property {string} [reorderindicator] The 2-digit number indicating whether the cardholder is reordering previously purchased merchandise. possible values:
 * - `01` First time ordered
 * - `02` Reordered
 * @property {string} [preorderIndicator] The 2-digit number indicating whether cardholder is placing an order with a future availability or release date. possible values:
 * - `01` Merchandise available
 * - `02` Future availability
 * @property {string} [preorderDate] The 8-digit number (format: YYYYMMDD) indicating expected date that a pre-ordered purchase will be available.
 * @property {string} [giftCardAmount] The purchase amount total for prepaid gift cards in major units. (maximum length 15)
 * @property {string} [giftCardCurrencyCode] ISO 4217 currency code for the gift card purchased. (maximum length 3)
 * @property {string} [giftCardCount] Total count of individual prepaid gift cards purchased. (maximum length 2)
 * @property {string} [accountAgeIndicator] The 2-digit value representing the length of time cardholder has had account. Possible values:
 * - `01` No Account
 * - `02` Created during transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {string} [accountCreateDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder opened the account.
 * @property {string} [accountChangeIndicator] The 2-digit value representing the length of time since the last change to the cardholder account. This includes shipping address, new payment account or new user added. Possible values:
 * - `01` Changed during transaction
 * - `02` Less than 30 days
 * - `03` 30-60 days
 * - `04` More than 60 days
 * @property {string} [accountChangeDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder's account was last changed. This includes changes to the billing or shipping address, new payment accounts or new users added.
 * @property {string} [accountPwdChangeIndicator] The 2-digit value representing the length of time since the cardholder changed or reset the password on the account. Possible values:
 * - `01` No change
 * - `02` Changed during transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {string} [accountPwdChangeDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder last changed or reset password on account.
 * @property {string} [shippingAddressUsageIndicator] The 2-digit value indicating when the shipping address used for transaction was first used. Possible values:
 * - `01` This transaction
 * - `02` Less than 30 days
 * - `03` 30-60 days
 * - `04` More than 60 days
 * @property {string} [shippingAddressUsageDate] The 8-digit number (format: YYYYMMDD) indicating the date when the shipping address used for this transaction was first used.
 * @property {string} [transactionCountDay] Number of transactions (successful or abandoned) for this cardholder account within the last 24 hours. (maximum length 3)
 * @property {string} [transactionCountYear] Number of transactions (successful or abandoned) for this cardholder account within the last year. (maximum length 3)
 * @property {string} [addCardAttempts] Number of add card attempts in the last 24 hours. (maximum length 3)
 * @property {string} [accountPurchases] Number of purchases with this cardholder account during the previous six months.
 * @property {string} [fraudActivity] The 2-digit value indicating whether the merchant experienced suspicious activity (including previous fraud) on the account. Possible values:
 * - `01` No suspicious activity
 * - `02` Suspicious activity observed
 * @property {string} [shippingNameIndicator] The 2-digit value indicating if the cardholder name on the account is identical to the shipping name used for the transaction. Possible values:
 * - `01` Account and shipping name identical
 * - `02` Account and shipping name differ
 * @property {string} [paymentAccountIndicator] The 2-digit value indicating the length of time that the payment account was enrolled in the merchant account. Possible values:
 * - `01` No account (guest checkout)
 * - `02` During the transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {string} [paymentAccountAge] The 8-digit number (format: YYYYMMDD) indicating the date the payment account was added to the cardholder account.
 * @property {string} [acsWindowSize] The 2-digit number to set the challenge window size to display to the end cardholder.  The ACS will reply with content that is formatted appropriately to this window size to allow for the best user experience.  The sizes are width x height in pixels of the window displayed in the cardholder browser window. Possible values:
 * - `01` 250x400
 * - `02` 390x400
 * - `03` 500x600
 * - `04` 600x400
 * - `05` Full page
 * @property {string} [sdkMaxTimeout] The 2-digit number of minutes (minimum 05) to set the maximum amount of time for all 3DS 2.0 messages to be communicated between all components.
 * @property {string} [addressMatch] The 1-character value (Y/N) indicating whether cardholder billing and shipping addresses match.
 * @property {string} [accountId] Additional cardholder account information. (maximum length 64)
 * @property {string} [ipAddress] The IP address of the consumer. IPv4 and IPv6 are supported.
 * - only one IP address supported
 * - only numbers, letters, period '.' chars, or colons ':' are acceptable
 * @property {string} [orderDescription] Brief description of items purchased. (maximum length 256)
 * @property {string} [taxAmount] Unformatted tax amount without any decimalization (ie. $123.67 = 12367). (maximum length 20)
 * @property {string} [userAgent] The exact content of the HTTP user agent header. (maximum length 500)
 * @property {string} [authenticationIndicator] The 2-digit number indicating the type of authentication request. Possible values:
 *  - `01` Payment
 *  - `02` Recurring transaction
 *  - `03` Installment
 *  - `04` Add card
 *  - `05` Maintain card
 *  - `06` Cardholder verification as part of EMV token ID&V
 * @property {string} [installment] An integer value greater than 1 indicating the maximum number of permitted authorizations for installment payments. (maximum length 3)
 * @property {string} [purchaseDate] The 14-digit number (format: YYYYMMDDHHMMSS) indicating the date in UTC of original purchase.
 * @property {string} [recurringEnd] The 8-digit number (format: YYYYMMDD) indicating the date after which no further recurring authorizations should be performed.
 * @property {string} [recurringFrequency] Integer value indicating the minimum number of days between recurring authorizations. A frequency of monthly is indicated by the value 28. Multiple of 28 days will be used to indicate months (ex. 6 months = 168). (maximum length 3)
 */

/**
 * @name ThreeDSecure#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. The following events are available:
 *   * {@link ThreeDSecure#event:lookup-complete|lookup-complete}
 *   * {@link ThreeDSecure#event:customer-canceled|customer-canceled}
 *   * {@link ThreeDSecure#event:authentication-iframe-available|authentication-iframe-available}
 *   * {@link ThreeDSecure#event:authentication-modal-render|authentication-modal-render}
 *   * {@link ThreeDSecure#event:authentication-modal-close|authentication-modal-close}
 * @example
 * <caption>Listening to a 3D Secure event</caption>
 * braintree.threeDSecure.create({ ... }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('lookup-complete', function (data, next) {
 *     console.log('data from the lookup', data);
 *     next();
 *   });
 *   threeDSecureInstance.on('customer-canceled', function () {
 *     console.log('log that the customer canceled');
 *   });
 * });
 * @returns {void}
 */

/**
 * @name ThreeDSecure#off
 * @function
 * @param {string} event The name of the event to which you are unsubscribing.
 * @param {function} handler The callback for the event you are unsubscribing from.
 * @description Unsubscribes the handler function to a named event.
 * @example
 * <caption>Subscribing and then unsubscribing from a 3D Secure eld event</caption>
 * braintree.threeDSecure.create({ ... }, function (createErr, threeDSecureInstance) {
 *   var lookupCallback = function (data, next) {
 *     console.log(data);
 *     next();
 *   };
 *   var cancelCallback = function () {
 *     // log the cancelation
 *     // or update UI
 *   };
 *
 *   threeDSecureInstance.on('lookup-complete', lookupCallback);
 *   threeDSecureInstance.on('customer-canceled', cancelCallback);
 *
 *   // later on
 *   threeDSecureInstance.off('lookup-complete', lookupCallback);
 *   threeDSecureInstance.off('customer-canceled', cancelCallback);
 * });
 * @returns {void}
 */

/**
 * This event is emitted when the `2-inline-iframe` version is specified when creating the 3D Secure instance and the authentication iframe becomes available.
 * @event ThreeDSecure#authentication-iframe-available
 * @example
 * <caption>Listening for the authentication iframe to be available</caption>
 *   threeDSecureInstance.on('authentication-iframe-available', function (event, next) {
 *     document.body.appendChild(event.element); // add iframe element to page
 *
 *     next(); // let the SDK know the iframe is ready
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the initial lookup request completes. If this is not used, a `onLookupComplete` callback must be passed into the `verifyCard` method.
 * @event ThreeDSecure#lookup-complete
 * @example
 * <caption>Listening for when the lookup request is complete</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('lookup-complete', function (data, next) {
 *     // inspect the data
 *
 *     // call next when ready to proceed with the challenge
 *     next();
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the customer cancels the 3D Secure challenge.
 * @event ThreeDSecure#customer-canceled
 * @example
 * <caption>Listening for when the customer cancels the 3D Secure challenge</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('customer-canceled', function () {
 *     // the customer canceled the 3D Secure challenge
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the authentication modal closes, either because the authentication was completed or because the customer canceled the process.
 * @event ThreeDSecure#authentication-modal-close
 * @example
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('authentication-modal-close', function () {
 *     // the modal was closed
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the authentication modal is rendered.
 * @event ThreeDSecure#authentication-modal-render
 * @example
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('authentication-modal-render', function () {
 *     // the modal was rendered, presenting the authentication form to the customer
 *   });
 * });
 */

/**
 * @class
 * @param {object} options 3D Secure {@link module:braintree-web/three-d-secure.create create} options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create} instead.</strong>
 * @classdesc This class represents a ThreeDSecure component produced by {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create}. Instances of this class have a method for launching a 3D Secure authentication flow.
 *
 * If you use the Braintree SDK from within an iframe, you must not use the `sandbox` attribute on your iframe or the 3D Secure modal will not function correctly.
 *
 * **Note**: 3D Secure 2.0 is documented below and will become the default integration method in a future version of Braintree-web. Until then, version 1.0 will continue to be supported. To view 3D Secure 1.0 documentation, look at Braintree-web documentation from version [3.40.0](https://braintree.github.io/braintree-web/3.40.0/ThreeDSecure.html) and earlier, or upgrade your integration by referring to the [3D Secure 2.0 adoption guide](https://developer.paypal.com/braintree/docs/guides/3d-secure/migration/javascript/v3).
 */
function ThreeDSecure(options) {
  var self = this;
  var Framework = FRAMEWORKS[options.framework];

  EventEmitter.call(this);

  this._framework = new Framework(options);
  this._framework.setUpEventListeners(function () {
    self._emit.apply(self, arguments);
  });
}

EventEmitter.createChild(ThreeDSecure);
// NEXT_MAJOR_VERSION remove exemptionRequested entirely in favor of `requestedExemptionType`
/**
 * Launch the 3D Secure login flow, returning a nonce payload.
 *
 * @public
 * @param {object} options Options for card verification.
 * @param {string} options.nonce The nonce representing the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.nonce`.
 * @param {string} options.bin The numeric Bank Identification Number (bin) of the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.details.bin`.
 * @param {string} options.amount The amount of the transaction in the current merchant account's currency. This must be expressed in numbers with an optional decimal (using `.`) and precision up to the hundredths place. For example, if you're processing a transaction for 1.234,56 € then `amount` should be `1234.56`.
 * @param {string} [options.accountType] The account type for the card (if known). Accepted values: `credit` or `debit`.
 * @param {boolean} [options.cardAddChallengeRequested] If set to `true`, a card-add challenge will be requested from the issuer. If set to `false`, a card-add challenge will not be requested. If the param is missing, a card-add challenge will only be requested for $0 amount. An authentication created using this flag should only be used for vaulting operations (creation of customers' credit cards or payment methods) and not for creating transactions.
 * @param {boolean} [options.cardAdd] *Deprecated:* Use `cardAddChallengeRequested` instead.
 * @param {boolean} [options.challengeRequested] If set to true, an authentication challenge will be forced if possible.
 * @param {boolean} [options.dataOnlyRequested] Indicates whether to use the data only flow. In this flow, frictionless 3DS is ensured for Mastercard cardholders as the card scheme provides a risk score for the issuer to determine whether to approve. If data only is not supported by the processor, a validation error will be raised. Non-Mastercard cardholders will fallback to a normal 3DS flow.
 * @param {boolean} [options.exemptionRequested] *Deprecated:* Use `requestedExemptionType` instead.
 * @param {string} [options.requestedExemptionType] If an exemption is requested and the exemption's conditions are satisfied, then it will be applied. The following supported exemptions are defined as per PSD2 regulation: `low_value`, `transaction_risk_analysis`
 * @param {function} [options.onLookupComplete] *Deprecated:* Use {@link ThreeDSecure#event:lookup-complete|`threeDSecureInstance.on('lookup-complete')`} instead. Function to execute when lookup completes. The first argument, `data`, is a {@link ThreeDSecure~verificationData|verificationData} object, and the second argument, `next`, is a callback. `next` must be called to continue.
 * @param {string} [options.email] The email used for verification. (maximum length 255)
 * @param {string} [options.mobilePhoneNumber] The mobile phone number used for verification. Only numbers; remove dashes, parenthesis and other characters. (maximum length 25)
 * @param {object} [options.billingAddress] An {@link ThreeDSecure~billingAddress|billingAddress} object for verification.
 * @param {object} [options.additionalInformation] An {@link ThreeDSecure~additionalInformation|additionalInformation} object for verification.
 * @param {object} [options.customer] **Deprecated** Customer information for use in 3DS 1.0 verifications. Can contain any subset of a {@link ThreeDSecure~verifyCardCustomerObject|verifyCardCustomerObject}. Only to be used for 3DS 1.0 integrations.
 * @param {callback} options.addFrame **Deprecated** This {@link ThreeDSecure~addFrameCallback|addFrameCallback} will be called when the bank frame needs to be added to your page. Only to be used for 3DS 1.0 integrations.
 * @param {callback} options.removeFrame **Deprecated** For use in 3DS 1.0 Flows. This {@link ThreeDSecure~removeFrameCallback|removeFrameCallback} will be called when the bank frame needs to be removed from your page. Only to be used in 3DS 1.0 integrations.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~verifyPayload|verifyPayload}.

 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * <caption>Verifying a payment method nonce with 3DS 2.0</caption>
 * var my3DSContainer;
 *
 * // set up listener after initialization
 * threeDSecure.on(('lookup-complete', function (data, next) {
 *   // use `data` here, then call `next()`
 *   next();
 * });
 *
 * // call verifyCard after tokenizing a card
 * threeDSecure.verifyCard({
 *   amount: '123.45',
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin,
 *   email: 'test@example.com'
 *   billingAddress: {
 *     givenName: 'Jill',
 *     surname: 'Doe',
 *     phoneNumber: '8101234567',
 *     streetAddress: '555 Smith St.',
 *     extendedAddress: '#5',
 *     locality: 'Oakland',
 *     region: 'CA',
 *     postalCode: '12345',
 *     countryCodeAlpha2: 'US'
 *   },
 *   additionalInformation: {
 *     workPhoneNumber: '5555555555',
 *     shippingGivenName: 'Jill',
 *     shippingSurname: 'Doe',
 *     shippingAddress: {
 *       streetAddress: '555 Smith st',
 *       extendedAddress: '#5',
 *       locality: 'Oakland',
 *       region: 'CA',
 *       postalCode: '12345',
 *       countryCodeAlpha2: 'US'
 *     }
 *     shippingPhone: '8101234567'
 *   }
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 * <caption>Verifying a payment method nonce with 3DS 2.0 with onLookupComplete callback</caption>
 * var my3DSContainer;
 *
 * threeDSecure.verifyCard({
 *   amount: '123.45',
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin,
 *   email: 'test@example.com'
 *   billingAddress: {
 *     givenName: 'Jill',
 *     surname: 'Doe',
 *     phoneNumber: '8101234567',
 *     streetAddress: '555 Smith St.',
 *     extendedAddress: '#5',
 *     locality: 'Oakland',
 *     region: 'CA',
 *     postalCode: '12345',
 *     countryCodeAlpha2: 'US'
 *   },
 *   additionalInformation: {
 *     workPhoneNumber: '5555555555',
 *     shippingGivenName: 'Jill',
 *     shippingSurname: 'Doe',
 *     shippingAddress: {
 *       streetAddress: '555 Smith st',
 *       extendedAddress: '#5',
 *       locality: 'Oakland',
 *       region: 'CA',
 *       postalCode: '12345',
 *       countryCodeAlpha2: 'US'
 *     }
 *     shippingPhone: '8101234567'
 *   },
 *   onLookupComplete: function (data, next) {
 *     // use `data` here, then call `next()`
 *     next();
 *   }
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 * @example
 * <caption>Handling 3DS lookup errors</caption>
 * var my3DSContainer;
 *
 * // set up listener after initialization
 * threeDSecure.on(('lookup-complete', function (data, next) {
 *   // use `data` here, then call `next()`
 *   next();
 * });
 *
 * // call verifyCard after tokenizing a card
 * threeDSecure.verifyCard({
 *   amount: '123.45',
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin,
 *   email: 'test@example.com',
 *   billingAddress: billingAddressFromCustomer,
 *   additionalInformation: additionalInfoFromCustomer
 * }, function (err, payload) {
 *   if (err) {
 *     if (err.code.indexOf('THREEDS_LOOKUP') === 0) {
 *       // an error occurred during the initial lookup request
 *
 *       if (err.code === 'THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR') {
 *         // either the passed payment method nonce does not exist
 *         // or it was already consumed before the lookup call was made
 *       } else if (err.code.indexOf('THREEDS_LOOKUP_VALIDATION') === 0) {
 *         // a validation error occurred
 *         // likely some non-ascii characters were included in the billing
 *         // address given name or surname fields, or the cardholdername field
 *
 *         // Instruct your user to check their data and try again
 *       } else {
 *         // an unknown lookup error occurred
 *       }
 *     } else {
 *       // some other kind of error
 *     }
 *     return;
 *   }
 *
 *   // handle success
 * });
 * @example
 * <caption>Deprecated: Verifying an existing nonce with 3DS 1.0</caption>
 * var my3DSContainer;
 *
 * threeDSecure.verifyCard({
 *   nonce: existingNonce,
 *   amount: 123.45,
 *   addFrame: function (err, iframe) {
 *     // Set up your UI and add the iframe.
 *     my3DSContainer = document.createElement('div');
 *     my3DSContainer.appendChild(iframe);
 *     document.body.appendChild(my3DSContainer);
 *   },
 *   removeFrame: function () {
 *     // Remove UI that you added in addFrame.
 *     document.body.removeChild(my3DSContainer);
 *   }
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 */
ThreeDSecure.prototype.verifyCard = function (options) {
  var privateOptions;

  if (this.hasListener("lookup-complete")) {
    privateOptions = {
      ignoreOnLookupCompleteRequirement: true,
    };
  }

  return this._framework.verifyCard(options, privateOptions);
};

/* eslint-disable-next-line valid-jsdoc */
/**
 * Launch the iframe challenge using a 3D Secure lookup response from a server side lookup.
 *
 * @public
 * @param {(object|string)} lookupResponse The lookup response from the server side call to lookup the 3D Secure information. The raw string or a parsed object can be passed.
 * @returns {Promise} Returns a promise.
 * @example
 * var my3DSContainer;
 *
 * threeDSecure.initializeChallengeWithLookupResponse(lookupResponseFromServer).then(function (payload) {
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 */
ThreeDSecure.prototype.initializeChallengeWithLookupResponse = function (
  lookupResponse
) {
  if (typeof lookupResponse === "string") {
    lookupResponse = JSON.parse(lookupResponse);
  }

  return this._framework.initializeChallengeWithLookupResponse(lookupResponse);
};

/**
 * Gather the data needed for a 3D Secure lookup call.
 *
 * @public
 * @param {object} options Options for 3D Secure lookup.
 * @param {string} options.nonce The nonce representing the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.nonce`.
 * @param {string} options.bin The numeric Bank Identification Number (bin) of the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.details.bin`.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~prepareLookupPayload|prepareLookupPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~prepareLookupPayload|prepareLookupPayload}.

 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * <caption>Preparing data for a 3D Secure lookup</caption>
 * threeDSecure.prepareLookup({
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   // send payload to server to do server side lookup
 * });
 */
ThreeDSecure.prototype.prepareLookup = function (options) {
  return this._framework.prepareLookup(options).then(function (data) {
    return JSON.stringify(data);
  });
};

/**
 * Cancel the 3DS flow and return the verification payload if available. If using 3D Secure version 2, this will not close the UI of the authentication modal. It is recommended that this method only be used in the {@link ThreeDSecure#event:lookup-complete|`lookup-complete`} event or the `onLookupComplete` callback.
 * @public
 * @param {callback} [callback] The second argument is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If there is no verifyPayload (the initial lookup did not complete), an error will be returned. If no callback is passed, `cancelVerifyCard` will return a promise.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example <caption>Cancel the verification in `lookup-complete` event</caption>
 * // set up listener after instantiation
 * threeDSecure.on('lookup-complete', function (data, next) {
 *   // determine if you want to call next to start the challenge,
 *   // if not, call cancelVerifyCard
 *   threeDSecure.cancelVerifyCard(function (err, verifyPayload) {
 *     if (err) {
 *       // Handle error
 *       console.log(err.message); // No verification payload available
 *       return;
 *     }
 *
 *     verifyPayload.nonce; // The nonce returned from the 3ds lookup call
 *     verifyPayload.liabilityShifted; // boolean
 *     verifyPayload.liabilityShiftPossible; // boolean
 *   });
 * });
 *
 * // after tokenizing a credit card
 * threeDSecure.verifyCard({
 *   amount: '100.00',
 *   nonce: nonceFromTokenizationPayload,
 *   bin: binFromTokenizationPayload
 *   // other fields such as billing address
 * }, function (verifyError, payload) {
 *   if (verifyError) {
 *     if (verifyError.code === 'THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT ') {
 *       // flow was canceled by merchant, 3ds info can be found in the payload
 *       // for cancelVerifyCard
 *     }
 *   }
 * });
 * @example <caption>Cancel the verification in onLookupComplete callback</caption>
 * threeDSecure.verifyCard({
 *   amount: '100.00',
 *   nonce: nonceFromTokenizationPayload,
 *   bin: binFromTokenizationPayload,
 *   // other fields such as billing address
 *   onLookupComplete: function (data, next) {
 *     // determine if you want to call next to start the challenge,
 *     // if not, call cancelVerifyCard
 *     threeDSecure.cancelVerifyCard(function (err, verifyPayload) {
 *       if (err) {
 *         // Handle error
 *         console.log(err.message); // No verification payload available
 *         return;
 *       }
 *
 *       verifyPayload.nonce; // The nonce returned from the 3ds lookup call
 *       verifyPayload.liabilityShifted; // boolean
 *       verifyPayload.liabilityShiftPossible; // boolean
 *     });
 *   }
 * }, function (verifyError, payload) {
 *   if (verifyError) {
 *     if (verifyError.code === 'THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT ') {
 *       // flow was canceled by merchant, 3ds info can be found in the payload
 *       // for cancelVerifyCard
 *     }
 *   }
 * });
 * @example <caption>Cancel the verification in 3D Secure version 1</caption>
 * // unlike with v2, this will not cause `verifyCard` to error, it will simply
 * // never call the callback
 * threeDSecure.cancelVerifyCard(function (err, verifyPayload) {
 *   if (err) {
 *     // Handle error
 *     console.log(err.message); // No verification payload available
 *     return;
 *   }
 *
 *   verifyPayload.nonce; // The nonce returned from the 3ds lookup call
 *   verifyPayload.liabilityShifted; // boolean
 *   verifyPayload.liabilityShiftPossible; // boolean
 * });
 */
ThreeDSecure.prototype.cancelVerifyCard = function () {
  return this._framework.cancelVerifyCard();
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/three-d-secure.create|create}, with the exception that the Cardinal SDK, on window.Cardinal, will remain.
 * @public
 * @param {callback} [callback] Called on completion. If no callback is passed, `teardown` will return a promise.
 * @example
 * threeDSecure.teardown();
 * @example <caption>With callback</caption>
 * threeDSecure.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
ThreeDSecure.prototype.teardown = function () {
  var methodNames = methods(ThreeDSecure.prototype).concat(
    methods(EventEmitter.prototype)
  );

  convertMethodsToError(this, methodNames);

  return this._framework.teardown();
};

module.exports = wrapPromise.wrapPrototype(ThreeDSecure);

},{"../../lib/convert-methods-to-error":38,"../../lib/methods":49,"./frameworks":56,"@braintree/event-emitter":4,"@braintree/wrap-promise":14}],61:[function(_dereq_,module,exports){
"use strict";
/** @module braintree-web/three-d-secure */

var ThreeDSecure = _dereq_("./external/three-d-secure");
var isHTTPS = _dereq_("../lib/is-https").isHTTPS;
var basicComponentVerification = _dereq_("../lib/basic-component-verification");
var createDeferredClient = _dereq_("../lib/create-deferred-client");
var createAssetsUrl = _dereq_("../lib/create-assets-url");
var BraintreeError = _dereq_("../lib/braintree-error");
var analytics = _dereq_("../lib/analytics");
var errors = _dereq_("./shared/errors");
var VERSION = "3.92.0";
var Promise = _dereq_("../lib/promise");
var wrapPromise = _dereq_("@braintree/wrap-promise");

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {object} [options.cardinalSDKConfig] A config for the underlying Cardinal SDK.
 * @param {object} [options.cardinalSDKConfig.logging] The logging configuration for the Cardinal SDK. See [Cardinal's documentation for the logging object](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-Logging) for more information.
 * @param {number} [options.cardinalSDKConfig.timeout] The time in milliseconds to wait before a request to Cardinal's API times out. See [Cardinal's documentation for root level configuration](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-RootLevelConfiguration) for more information.
 * @param {number} [options.cardinalSDKConfig.maxRequestRetries] How many times a request should be re-attempted to Cardinal's API before giving up as a failure. See [Cardinal's documentation for root level configuration](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-RootLevelConfiguration) for more information.
 * @param {object} [options.cardinalSDKConfig.payment] An object to describe how you want the user interactions to behave. Only a subset of the [Cardinal SDK payment configuration object](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-Payment) are supported: `displayLoading` and `displayExitButton`.
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {(number|string)} [options.version=1] The version of 3D Secure to use. Possible options:
 * * 1 - The legacy 3D Secure v1.0 integration.
 * * 2 - A 3D Secure v2.0 integration that uses a modal to host the 3D Secure iframe.
 * * 2-bootstrap3-modal - A 3D Secure v2.0 integration that uses a modal styled with Bootstrap 3 styles to host the 3D Secure iframe. Requires having the Bootstrap 3 script files and stylesheets on your page.
 * * 2-inline-iframe - A 3D Secure v2.0 integration that provides the authentication iframe directly to the merchant.
 * @param {callback} [callback] The second argument, `data`, is the {@link ThreeDSecure} instance. If no callback is provided, it returns a promise that resolves the {@link ThreeDSecure} instance.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
@example
 * <caption>Creating a v2 3D Secure component using 2 version (Cardinal modal)</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createError, threeDSecure) {
 *   // set up lookup-complete listener
 *   threeDSecure.on('lookup-complete', function (data, next) {
 *     // check lookup data
 *
 *     next();
 *   });
 *
 *   // using Hosted Fields, use `tokenize` to get back a credit card nonce
 *
 *   threeDSecure.verifyCard({
 *     nonce: nonceFromTokenizationPayload,,
 *     bin: binFromTokenizationPayload,
 *     amount: '100.00'
 *   }, function (verifyError, payload) {
 *     // inspect payload
 *     // send payload.nonce to your server
 *   });
 * });
 * @example
 * <caption>Creating a v2 3D Secure component using 2-bootstrap3-modal version</caption>
 * // must have the boostrap js, css and jquery files on your page
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2-bootstrap3-modal'
 * }, function (createError, threeDSecure) {
 *   // set up lookup-complete listener
 *   threeDSecure.on('lookup-complete', function (data, next) {
 *     // check lookup data
 *
 *     next();
 *   });
 *
 *   // using Hosted Fields, use `tokenize` to get back a credit card nonce
 *
 *   // challenge will be presented in a bootstrap 3 modal
 *   threeDSecure.verifyCard({
 *     nonce: nonceFromTokenizationPayload,
 *     bin: binFromTokenizationPayload,
 *     amount: '100.00'
 *   }, function (verifyError, payload) {
 *     // inspect payload
 *     // send payload.nonce to your server
 *   });
 * });
 * @example
 * <caption>Creating a v2 3D Secure component using 2-inline-iframe version</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2-inline-iframe'
 * }, function (createError, threeDSecure) {
 *   // set up lookup-complete listener
 *   threeDSecure.on('lookup-complete', function (data, next) {
 *     // check lookup data
 *
 *     next();
 *   });
 *   // set up iframe listener
 *   threeDSecure.on('authentication-iframe-available', function (event, next) {
 *     var element = event.element; // an html element that contains the iframe
 *
 *     document.body.appendChild(element); // put it on your page
 *
 *     next(); // let the sdk know the element has been added to the page
 *   });
 *
 *   // using Hosted Fields, use `tokenize` to get back a credit card nonce
 *
 *   threeDSecure.verifyCard({
 *     nonce: nonceFromTokenizationPayload,,
 *     bin: binFromTokenizationPayload,
 *     amount: '100.00'
 *   }, function (verifyError, payload) {
 *     // inspect payload
 *     // send payload.nonce to your server
 *   });
 * });
 */
function create(options) {
  var name = "3D Secure";
  var framework = getFramework(options);

  return basicComponentVerification
    .verify({
      name: name,
      client: options.client,
      authorization: options.authorization,
    })
    .then(function () {
      var assetsUrl = createAssetsUrl.create(options.authorization);
      var createPromise = createDeferredClient
        .create({
          authorization: options.authorization,
          client: options.client,
          debug: options.debug,
          assetsUrl: assetsUrl,
          name: name,
        })
        .then(function (client) {
          var error, isProduction;
          var config = client.getConfiguration();
          var gwConfig = config.gatewayConfiguration;

          options.client = client;

          if (!gwConfig.threeDSecureEnabled) {
            error = errors.THREEDS_NOT_ENABLED;
          }

          if (config.authorizationType === "TOKENIZATION_KEY") {
            error = errors.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY;
          }

          isProduction = gwConfig.environment === "production";

          if (isProduction && !isHTTPS()) {
            error = errors.THREEDS_HTTPS_REQUIRED;
          }

          if (
            framework !== "legacy" &&
            !(
              gwConfig.threeDSecure &&
              gwConfig.threeDSecure.cardinalAuthenticationJWT
            )
          ) {
            analytics.sendEvent(
              options.client,
              "three-d-secure.initialization.failed.missing-cardinalAuthenticationJWT"
            );
            error = errors.THREEDS_NOT_ENABLED_FOR_V2;
          }

          if (error) {
            return Promise.reject(new BraintreeError(error));
          }

          analytics.sendEvent(options.client, "three-d-secure.initialized");

          return client;
        });
      var instance = new ThreeDSecure({
        client: options.client,
        assetsUrl: assetsUrl,
        createPromise: createPromise,
        loggingEnabled: options.loggingEnabled,
        cardinalSDKConfig: options.cardinalSDKConfig,
        framework: framework,
      });

      if (options.client) {
        return createPromise.then(function () {
          return instance;
        });
      }

      return instance;
    });
}

function getFramework(options) {
  var version = String(options.version || "");

  if (!version || version === "1") {
    throw new BraintreeError({
      code: errors.THREEDS_UNSUPPORTED_VERSION.code,
      type: errors.THREEDS_UNSUPPORTED_VERSION.type,
      message: errors.THREEDS_UNSUPPORTED_VERSION.message,
    });
  }

  switch (version) {
    case "2":
    case "2-cardinal-modal":
      return "cardinal-modal";
    case "2-bootstrap3-modal":
      return "bootstrap3-modal";
    case "2-inline-iframe":
      return "inline-iframe";
    default:
      throw new BraintreeError({
        code: errors.THREEDS_UNRECOGNIZED_VERSION.code,
        type: errors.THREEDS_UNRECOGNIZED_VERSION.type,
        message:
          "Version `" +
          options.version +
          "` is not a recognized version. You may need to update the version of your Braintree SDK to support this version.",
      });
  }
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION,
};

},{"../lib/analytics":32,"../lib/basic-component-verification":35,"../lib/braintree-error":36,"../lib/create-assets-url":40,"../lib/create-deferred-client":42,"../lib/is-https":46,"../lib/promise":50,"./external/three-d-secure":60,"./shared/errors":63,"@braintree/wrap-promise":14}],62:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  LANDING_FRAME_NAME: "braintreethreedsecurelanding",
  CARDINAL_SCRIPT_SOURCE: {
    production: "https://songbird.cardinalcommerce.com/edge/v1/songbird.js",
    sandbox: "https://songbirdstag.cardinalcommerce.com/edge/v1/songbird.js",
  },
};

},{}],63:[function(_dereq_,module,exports){
"use strict";

/**
 * @name BraintreeError.3D Secure - Creation Error Codes
 * @description Errors that occur when [creating the 3D Secure component](./module-braintree-web_three-d-secure.html#.create).
 * @property {MERCHANT} THREEDS_NOT_ENABLED Occurs when 3D Secure is not enabled in the Braintree control panel.
 * @property {MERCHANT} THREEDS_CAN_NOT_USE_TOKENIZATION_KEY Occurs when 3D Secure component is created without a Client Token.
 * @property {MERCHANT} THREEDS_HTTPS_REQUIRED Occurs when 3D Secure component is created in production over HTTPS.
 * @property {MERCHANT} THREEDS_NOT_ENABLED_FOR_V2 Occurs when 3D Secure component is created with version 2 parameter, but merchant is not enabled to use version 2.
 * @property {MERCHANT} THREEDS_UNRECOGNIZED_VERSION Occurs when unrecognized version enum is passed into the create call.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_SETUP_FAILED Occurs when Cardinal's Songbird.js library fails to setup for an unknown reason.
 * @property {NETWORK} THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED Occurs when using version 2 and Cardinal's Songbird.js script could not be loaded.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT Occurs when Cardinal's Songbird.js library takes longer than 60 seconds to set up.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT Occurs when Cardinal sends a response indicating a timeout on /Validate, /Confirm, or /Continue.
 * @property {MERCHANT} THREEDS_CARDINAL_SDK_BAD_CONFIG Occurs when there is no JWT in the request. Also when there's some other malformed aspect of config.
 * @property {MERCHANT} THREEDS_CARDINAL_SDK_BAD_JWT Occurs when a malformed config causes a either a missing response JWT or a malformed Cardinal response.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_ERROR Occurs when a "general error" or a Cardinal hosted fields error happens. Description contains more details.
 * @property {CUSTOMER} THREEDS_CARDINAL_SDK_CANCELED Occurs when customer cancels the transaction mid-flow, usually with alt-pays that have their own cancel buttons.
 * @property {MERCHANT} THREEDS_UNSUPPORTED_VERSION Occurs when 3D Secure component is created with version 1 (or default version) parameter.
 */

/**
 * @name BraintreeError.3D Secure - verifyCard Error Codes
 * @description Errors that occur when using the [`verifyCard` method](./ThreeDSecure.html#verifyCard).
 * @property {MERCHANT} THREEDS_AUTHENTICATION_IN_PROGRESS Occurs when another verification is already in progress.
 * @property {MERCHANT} THREEDS_MISSING_VERIFY_CARD_OPTION Occurs when a required option is missing.
 * @property {UNKNOWN} THREEDS_JWT_AUTHENTICATION_FAILED Occurs when something went wrong authenticating the JWT from the Cardinal SDK.
 * @property {MERCHANT} THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR Occurs when the supplied payment method nonce does not exist or the payment method nonce has already been consumed.
 * @property {CUSTOMER} THREEDS_LOOKUP_VALIDATION_ERROR Occurs when a validation error occurs during the 3D Secure lookup.
 * @property {UNKNOWN} THREEDS_LOOKUP_ERROR An unknown error occurred while attempting the 3D Secure lookup.
 * @property {MERCHANT} THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT Occurs when the 3D Secure flow is canceled by the merchant using `cancelVerifyCard` (3D Secure v2 flows only).
 * @property {UNKNOWN} THREEDS_INLINE_IFRAME_DETAILS_INCORRECT An unknown error occurred while attempting to use the inline iframe framework.
 * @property {MERCHANT} THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID Occurs when unrecognized exemption enum value is passed into verifyCard.
 */

/**
 * @name BraintreeError.3D Secure - cancelVerifyCard Error Codes
 * @description Errors that occur when using the [`cancelVerifyCard` method](./ThreeDSecure.html#cancelVerifyCard).
 * @property {MERCHANT} THREEDS_NO_VERIFICATION_PAYLOAD Occurs when the 3D Secure flow is canceled, but there is no 3D Secure information available.
 */

/**
 * @name BraintreeError.3D Secure - Internal Error Codes
 * @ignore
 * @description Errors that occur internally
 * @property {INTERNAL} THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN Occurs when iframe is initialized on a non-verified domain.
 * @property {INTERNAL} THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED Occurs when a 3D Secure framework method is not implemented.
 */

var BraintreeError = _dereq_("../../lib/braintree-error");

module.exports = {
  THREEDS_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_NOT_ENABLED",
    message: "3D Secure is not enabled for this merchant.",
  },
  THREEDS_CAN_NOT_USE_TOKENIZATION_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_CAN_NOT_USE_TOKENIZATION_KEY",
    message: "3D Secure can not use a tokenization key for authorization.",
  },
  THREEDS_HTTPS_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_HTTPS_REQUIRED",
    message: "3D Secure requires HTTPS.",
  },
  THREEDS_NOT_ENABLED_FOR_V2: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_NOT_ENABLED_FOR_V2",
    message:
      "3D Secure version 2 is not enabled for this merchant. Contact Braintree Support for assistance at https://help.braintreepayments.com/",
  },
  THREEDS_UNRECOGNIZED_VERSION: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_UNRECOGNIZED_VERSION",
  },
  THREEDS_CARDINAL_SDK_SETUP_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: "THREEDS_CARDINAL_SDK_SETUP_FAILED",
    message: "Something went wrong setting up Cardinal's Songbird.js library.",
  },
  THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: "THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED",
    message: "Cardinal's Songbird.js library could not be loaded.",
  },
  THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: "THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT",
    message: "Cardinal's Songbird.js took too long to setup.",
  },
  THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: "THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT",
    message: "Cardinal's API took too long to respond.",
  },
  THREEDS_CARDINAL_SDK_BAD_CONFIG: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_CARDINAL_SDK_BAD_CONFIG",
    message:
      "JWT or other required field missing. Please check your setup configuration.",
  },
  THREEDS_CARDINAL_SDK_BAD_JWT: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_CARDINAL_SDK_BAD_JWT",
    message:
      "Cardinal JWT missing or malformed. Please check your setup configuration.",
  },
  THREEDS_CARDINAL_SDK_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: "THREEDS_CARDINAL_SDK_ERROR",
    message:
      "A general error has occurred with Cardinal. See description for more information.",
  },
  THREEDS_CARDINAL_SDK_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "THREEDS_CARDINAL_SDK_CANCELED",
    message: "Canceled by user.",
  },
  THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT",
    message: "3D Secure verfication canceled by merchant.",
  },
  THREEDS_AUTHENTICATION_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_AUTHENTICATION_IN_PROGRESS",
    message:
      "Cannot call verifyCard while existing authentication is in progress.",
  },
  THREEDS_MISSING_VERIFY_CARD_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_MISSING_VERIFY_CARD_OPTION",
  },
  THREEDS_JWT_AUTHENTICATION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: "THREEDS_JWT_AUTHENTICATION_FAILED",
    message: "Something went wrong authenticating the JWT from Cardinal",
  },
  THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR",
    message:
      "Either the payment method nonce passed to `verifyCard` does not exist, or it was already consumed",
  },
  THREEDS_LOOKUP_VALIDATION_ERROR: {
    type: BraintreeError.types.CUSTOMER,
    code: "THREEDS_LOOKUP_VALIDATION_ERROR",
    message:
      "The data passed in `verifyCard` did not pass validation checks. See details for more info",
  },
  THREEDS_LOOKUP_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: "THREEDS_LOOKUP_ERROR",
    message: "Something went wrong during the 3D Secure lookup",
  },
  THREEDS_INLINE_IFRAME_DETAILS_INCORRECT: {
    type: BraintreeError.types.UNKNOWN,
    code: "THREEDS_INLINE_IFRAME_DETAILS_INCORRECT",
    message:
      "Something went wrong when attempting to add the authentication iframe to the page.",
  },
  THREEDS_NO_VERIFICATION_PAYLOAD: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_NO_VERIFICATION_PAYLOAD",
    message: "No verification payload available.",
  },
  THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
    type: BraintreeError.types.INTERNAL,
    code: "THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN",
    message: "Term Url must be on a Braintree domain.",
  },
  THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED: {
    type: BraintreeError.types.INTERNAL,
    code: "THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED",
    message: "Method not implemented for this framework.",
  },
  THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID",
    message: "Requested Exemption Type is invalid.",
  },
  THREEDS_UNSUPPORTED_VERSION: {
    type: BraintreeError.types.MERCHANT,
    code: "THREEDS_UNSUPPORTED_VERSION",
    message:
      "3D Secure `1` is deprecated and no longer supported. See available versions at https://braintree.github.io/braintree-web/current/module-braintree-web_three-d-secure.html#.create",
  },
};

},{"../../lib/braintree-error":36}],64:[function(_dereq_,module,exports){
"use strict";

var enumerate = _dereq_("../../lib/enumerate");

module.exports = enumerate(["AUTHENTICATION_COMPLETE"], "threedsecure:");

},{"../../lib/enumerate":44}]},{},[61])(61)
});
