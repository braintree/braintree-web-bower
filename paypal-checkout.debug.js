(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).paypalCheckout = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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

},{"promise-polyfill":45}],2:[function(_dereq_,module,exports){
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
module.exports = function isAndroid(ua) {
    ua = ua || window.navigator.userAgent;
    return /Android/i.test(ua);
};

},{}],5:[function(_dereq_,module,exports){
"use strict";
var isEdge = _dereq_("./is-edge");
var isSamsung = _dereq_("./is-samsung");
var isDuckDuckGo = _dereq_("./is-duckduckgo");
var isOpera = _dereq_("./is-opera");
var isSilk = _dereq_("./is-silk");
module.exports = function isChrome(ua) {
    ua = ua || window.navigator.userAgent;
    return ((ua.indexOf("Chrome") !== -1 || ua.indexOf("CriOS") !== -1) &&
        !isEdge(ua) &&
        !isSamsung(ua) &&
        !isDuckDuckGo(ua) &&
        !isOpera(ua) &&
        !isSilk(ua));
};

},{"./is-duckduckgo":6,"./is-edge":7,"./is-opera":13,"./is-samsung":14,"./is-silk":15}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function isDuckDuckGo(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("DuckDuckGo/") !== -1;
};

},{}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function isEdge(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Edge/") !== -1;
};

},{}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function isIosFirefox(ua) {
    ua = ua || window.navigator.userAgent;
    return /FxiOS/i.test(ua);
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
var isIos = _dereq_("./is-ios");
function isGoogleSearchApp(ua) {
    return /\bGSA\b/.test(ua);
}
module.exports = function isIosGoogleSearchApp(ua) {
    ua = ua || window.navigator.userAgent;
    return isIos(ua) && isGoogleSearchApp(ua);
};

},{"./is-ios":12}],10:[function(_dereq_,module,exports){
"use strict";
var isIos = _dereq_("./is-ios");
var isIosGoogleSearchApp = _dereq_("./is-ios-google-search-app");
module.exports = function isIosWebview(ua) {
    ua = ua || window.navigator.userAgent;
    if (isIos(ua)) {
        // The Google Search iOS app is technically a webview and doesn't support popups.
        if (isIosGoogleSearchApp(ua)) {
            return true;
        }
        // Historically, a webview could be identified by the presence of AppleWebKit and _no_ presence of Safari after.
        return /.+AppleWebKit(?!.*Safari)/i.test(ua);
    }
    return false;
};

},{"./is-ios":12,"./is-ios-google-search-app":9}],11:[function(_dereq_,module,exports){
"use strict";
var isIosWebview = _dereq_("./is-ios-webview");
module.exports = function isIosWKWebview(ua, statusBarVisible) {
    statusBarVisible =
        typeof statusBarVisible !== "undefined"
            ? statusBarVisible
            : window.statusbar.visible;
    return isIosWebview(ua) && statusBarVisible;
};

},{"./is-ios-webview":10}],12:[function(_dereq_,module,exports){
"use strict";
module.exports = function isIos(ua) {
    ua = ua || window.navigator.userAgent;
    return /iPhone|iPod|iPad/i.test(ua);
};

},{}],13:[function(_dereq_,module,exports){
"use strict";
module.exports = function isOpera(ua) {
    ua = ua || window.navigator.userAgent;
    return (ua.indexOf("OPR/") !== -1 ||
        ua.indexOf("Opera/") !== -1 ||
        ua.indexOf("OPT/") !== -1);
};

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function isSamsungBrowser(ua) {
    ua = ua || window.navigator.userAgent;
    return /SamsungBrowser/i.test(ua);
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function isSilk(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Silk/") !== -1;
};

},{}],16:[function(_dereq_,module,exports){
"use strict";
var MINIMUM_SUPPORTED_CHROME_IOS_VERSION = 48;
var isAndroid = _dereq_("./is-android");
var isIosFirefox = _dereq_("./is-ios-firefox");
var isIosWebview = _dereq_("./is-ios-webview");
var isChrome = _dereq_("./is-chrome");
var isSamsungBrowser = _dereq_("./is-samsung");
var isDuckDuckGo = _dereq_("./is-duckduckgo");
function isUnsupportedIosChrome(ua) {
    ua = ua || window.navigator.userAgent;
    var match = ua.match(/CriOS\/(\d+)\./);
    if (!match) {
        return false;
    }
    var version = parseInt(match[1], 10);
    return version < MINIMUM_SUPPORTED_CHROME_IOS_VERSION;
}
function isOperaMini(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Opera Mini") > -1;
}
function isAndroidWebview(ua) {
    var androidWebviewRegExp = /Version\/[\d.]+/i;
    ua = ua || window.navigator.userAgent;
    if (isAndroid(ua)) {
        return (androidWebviewRegExp.test(ua) && !isOperaMini(ua) && !isDuckDuckGo(ua));
    }
    return false;
}
function isOldSamsungBrowserOrSamsungWebview(ua) {
    return !isChrome(ua) && !isSamsungBrowser(ua) && /samsung/i.test(ua);
}
module.exports = function supportsPopups(ua) {
    ua = ua || window.navigator.userAgent;
    return !(isIosWebview(ua) ||
        isIosFirefox(ua) ||
        isAndroidWebview(ua) ||
        isOperaMini(ua) ||
        isUnsupportedIosChrome(ua) ||
        isOldSamsungBrowserOrSamsungWebview(ua));
};

},{"./is-android":4,"./is-chrome":5,"./is-duckduckgo":6,"./is-ios-firefox":8,"./is-ios-webview":10,"./is-samsung":14}],17:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios-wkwebview");

},{"./dist/is-ios-wkwebview":11}],18:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios");

},{"./dist/is-ios":12}],19:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/supports-popups");

},{"./dist/supports-popups":16}],20:[function(_dereq_,module,exports){
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

},{}],21:[function(_dereq_,module,exports){
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

},{"./lib/assign":22,"./lib/default-attributes":23,"./lib/set-attributes":24}],22:[function(_dereq_,module,exports){
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

},{}],23:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAttributes = void 0;
exports.defaultAttributes = {
    src: "about:blank",
    frameBorder: 0,
    allowtransparency: true,
    scrolling: "no",
};

},{}],24:[function(_dereq_,module,exports){
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

},{}],25:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],26:[function(_dereq_,module,exports){
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

},{}],27:[function(_dereq_,module,exports){
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

},{}],28:[function(_dereq_,module,exports){
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

},{}],29:[function(_dereq_,module,exports){
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

},{"./lib/deferred":26,"./lib/once":27,"./lib/promise-or-callback":28}],30:[function(_dereq_,module,exports){
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

},{"./lib/broadcast":34,"./lib/constants":35,"./lib/is-not-string":38,"./lib/package-payload":40,"./lib/send-message":41,"./lib/subscription-args-invalid":43}],31:[function(_dereq_,module,exports){
"use strict";
var attach_1 = _dereq_("./lib/attach");
var framebus_1 = _dereq_("./framebus");
(0, attach_1.attach)();
module.exports = framebus_1.Framebus;

},{"./framebus":30,"./lib/attach":32}],32:[function(_dereq_,module,exports){
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

},{"./message":39}],33:[function(_dereq_,module,exports){
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

},{"./broadcast":34,"./constants":35}],34:[function(_dereq_,module,exports){
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

},{"./has-opener":37}],35:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribers = exports.childWindows = exports.prefix = void 0;
exports.prefix = "/*framebus*/";
exports.childWindows = [];
exports.subscribers = {};

},{}],36:[function(_dereq_,module,exports){
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

},{"./constants":35}],37:[function(_dereq_,module,exports){
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

},{}],38:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isntString = void 0;
function isntString(str) {
    return typeof str !== "string";
}
exports.isntString = isntString;

},{}],39:[function(_dereq_,module,exports){
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

},{"./broadcast-to-child-windows":33,"./dispatch":36,"./is-not-string":38,"./unpack-payload":44}],40:[function(_dereq_,module,exports){
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

},{"./constants":35,"./subscribe-replier":42}],41:[function(_dereq_,module,exports){
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

},{}],42:[function(_dereq_,module,exports){
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

},{"../framebus":30,"@braintree/uuid":25}],43:[function(_dereq_,module,exports){
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

},{"./is-not-string":38}],44:[function(_dereq_,module,exports){
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

},{"./constants":35,"./package-payload":40}],45:[function(_dereq_,module,exports){
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

},{}],46:[function(_dereq_,module,exports){
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

},{"./constants":52,"./create-authorization-data":56,"./json-clone":71}],47:[function(_dereq_,module,exports){
"use strict";

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

},{"./add-metadata":46,"./constants":52}],48:[function(_dereq_,module,exports){
"use strict";

var loadScript = _dereq_("@braintree/asset-loader/load-script");

module.exports = {
  loadScript: loadScript,
};

},{"@braintree/asset-loader/load-script":3}],49:[function(_dereq_,module,exports){
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

},{}],50:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");
var sharedErrors = _dereq_("./errors");
var VERSION = "3.92.2";

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

},{"./braintree-error":51,"./errors":59}],51:[function(_dereq_,module,exports){
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

},{"./enumerate":58}],52:[function(_dereq_,module,exports){
"use strict";

var VERSION = "3.92.2";
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

},{}],53:[function(_dereq_,module,exports){
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

},{"./braintree-error":51,"./errors":59}],54:[function(_dereq_,module,exports){
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

},{"./braintree-error":51}],55:[function(_dereq_,module,exports){
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

},{"./constants":52}],56:[function(_dereq_,module,exports){
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

},{"../lib/constants":52,"../lib/vendor/polyfill":75}],57:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");
var assets = _dereq_("./assets");
var sharedErrors = _dereq_("./errors");

var VERSION = "3.92.2";

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

},{"./assets":48,"./braintree-error":51,"./errors":59}],58:[function(_dereq_,module,exports){
"use strict";

function enumerate(values, prefix) {
  prefix = prefix == null ? "" : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],59:[function(_dereq_,module,exports){
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

},{"./braintree-error":51}],60:[function(_dereq_,module,exports){
"use strict";

var Popup = _dereq_("./strategies/popup");
var PopupBridge = _dereq_("./strategies/popup-bridge");
var Modal = _dereq_("./strategies/modal");
var Bus = _dereq_("framebus");
var events = _dereq_("../shared/events");
var errors = _dereq_("../shared/errors");
var constants = _dereq_("../shared/constants");
var uuid = _dereq_("@braintree/uuid");
var iFramer = _dereq_("@braintree/iframer");
var BraintreeError = _dereq_("../../braintree-error");
var browserDetection = _dereq_("../shared/browser-detection");
var assign = _dereq_("./../../assign").assign;
var BUS_CONFIGURATION_REQUEST_EVENT =
  _dereq_("../../constants").BUS_CONFIGURATION_REQUEST_EVENT;

var REQUIRED_CONFIG_KEYS = ["name", "dispatchFrameUrl", "openFrameUrl"];

function noop() {}

function _validateFrameConfiguration(options) {
  if (!options) {
    throw new Error("Valid configuration is required");
  }

  REQUIRED_CONFIG_KEYS.forEach(function (key) {
    if (!options.hasOwnProperty(key)) {
      throw new Error("A valid frame " + key + " must be provided");
    }
  });

  if (!/^[\w_]+$/.test(options.name)) {
    throw new Error("A valid frame name must be provided");
  }
}

function FrameService(options) {
  _validateFrameConfiguration(options);

  this._serviceId = uuid().replace(/-/g, "");

  this._options = {
    name: options.name + "_" + this._serviceId,
    dispatchFrameUrl: options.dispatchFrameUrl,
    openFrameUrl: options.openFrameUrl,
    height: options.height,
    width: options.width,
    top: options.top,
    left: options.left,
  };
  this.state = options.state || {};

  this._bus = new Bus({ channel: this._serviceId });
  this._setBusEvents();
}

FrameService.prototype.initialize = function (callback) {
  var dispatchFrameReadyHandler = function () {
    callback();
    this._bus.off(events.DISPATCH_FRAME_READY, dispatchFrameReadyHandler);
  }.bind(this);

  this._bus.on(events.DISPATCH_FRAME_READY, dispatchFrameReadyHandler);
  this._writeDispatchFrame();
};

FrameService.prototype._writeDispatchFrame = function () {
  var frameName = constants.DISPATCH_FRAME_NAME + "_" + this._serviceId;
  var frameSrc = this._options.dispatchFrameUrl;

  this._dispatchFrame = iFramer({
    "aria-hidden": true,
    name: frameName,
    title: frameName,
    src: frameSrc,
    class: constants.DISPATCH_FRAME_CLASS,
    height: 0,
    width: 0,
    style: {
      position: "absolute",
      left: "-9999px",
    },
  });

  document.body.appendChild(this._dispatchFrame);
};

FrameService.prototype._setBusEvents = function () {
  this._bus.on(
    events.DISPATCH_FRAME_REPORT,
    function (res, reply) {
      if (this._onCompleteCallback) {
        this._onCompleteCallback.call(null, res.err, res.payload);
      }
      this._frame.close();

      this._onCompleteCallback = null;

      if (reply) {
        reply();
      }
    }.bind(this)
  );

  this._bus.on(
    BUS_CONFIGURATION_REQUEST_EVENT,
    function (reply) {
      reply(this.state);
    }.bind(this)
  );
};

FrameService.prototype.open = function (options, callback) {
  options = options || {};
  this._frame = this._getFrameForEnvironment(options);

  this._frame.initialize(callback);

  if (this._frame instanceof PopupBridge) {
    // Frameservice loads a spinner then redirects to the final destination url.
    // For Popupbridge it doesn't have the same rules around popups since it's deferred to the mobile side
    // therefore, skips the regular open path and instead uses `#redirect` to handle things
    return;
  }

  assign(this.state, options.state);

  this._onCompleteCallback = callback;
  this._frame.open();

  if (this.isFrameClosed()) {
    this._cleanupFrame();

    if (callback) {
      callback(new BraintreeError(errors.FRAME_SERVICE_FRAME_OPEN_FAILED));
    }

    return;
  }
  this._pollForPopupClose();
};

FrameService.prototype.redirect = function (url) {
  if (this._frame && !this.isFrameClosed()) {
    this._frame.redirect(url);
  }
};

FrameService.prototype.close = function () {
  if (!this.isFrameClosed()) {
    this._frame.close();
  }
};

FrameService.prototype.focus = function () {
  if (!this.isFrameClosed()) {
    this._frame.focus();
  }
};

FrameService.prototype.createHandler = function (options) {
  options = options || {};

  return {
    close: function () {
      if (options.beforeClose) {
        options.beforeClose();
      }

      this.close();
    }.bind(this),
    focus: function () {
      if (options.beforeFocus) {
        options.beforeFocus();
      }

      this.focus();
    }.bind(this),
  };
};

FrameService.prototype.createNoopHandler = function () {
  return {
    close: noop,
    focus: noop,
  };
};

FrameService.prototype.teardown = function () {
  this.close();
  this._dispatchFrame.parentNode.removeChild(this._dispatchFrame);
  this._dispatchFrame = null;
  this._cleanupFrame();
};

FrameService.prototype.isFrameClosed = function () {
  return this._frame == null || this._frame.isClosed();
};

FrameService.prototype._cleanupFrame = function () {
  this._frame = null;
  clearInterval(this._popupInterval);
  this._popupInterval = null;
};

FrameService.prototype._pollForPopupClose = function () {
  this._popupInterval = setInterval(
    function () {
      if (this.isFrameClosed()) {
        this._cleanupFrame();
        if (this._onCompleteCallback) {
          this._onCompleteCallback(
            new BraintreeError(errors.FRAME_SERVICE_FRAME_CLOSED)
          );
        }
      }
    }.bind(this),
    constants.POPUP_POLL_INTERVAL
  );

  return this._popupInterval;
};

FrameService.prototype._getFrameForEnvironment = function (options) {
  var usePopup = browserDetection.supportsPopups();
  var popupBridgeExists = Boolean(window.popupBridge);

  var initOptions = assign({}, this._options, options);

  if (popupBridgeExists) {
    return new PopupBridge(initOptions);
  } else if (usePopup) {
    return new Popup(initOptions);
  }

  return new Modal(initOptions);
};

module.exports = FrameService;

},{"../../braintree-error":51,"../../constants":52,"../shared/browser-detection":67,"../shared/constants":68,"../shared/errors":69,"../shared/events":70,"./../../assign":49,"./strategies/modal":62,"./strategies/popup":65,"./strategies/popup-bridge":63,"@braintree/iframer":21,"@braintree/uuid":25,"framebus":31}],61:[function(_dereq_,module,exports){
"use strict";

var FrameService = _dereq_("./frame-service");

/**
 * @ignore
 * @function create
 * Initializing FrameService should be done at the point when the component is created, so it is ready whenever a component needs to open a popup window.
 * Browsers have varying rules around what constitutes and async action worth blocking a popup for, but the likes of Safari
 * will block the popup if `frameService#create` is invoked during any asynchronous process (such as an API request to tokenize payment details).
 *
 * The process of setting up the dispatch frame and subsequent framebus communications via event listeners are considered async by Safari's standards.
 *
 * @param {object} options The options provided to frameservice
 * @param {string} options.name The name to use for identifying the various pieces associated with frameservice.
 * @param {string} options.dispatchFrameUrl The static asset to load for use as the dispatch frame. This allows for secure communication between the iframe and the popup, since they are on the same asset domain (usually checkout.paypal.com or assets.braintreegateway.com)
 * @param {string} options.openFrameUrl The url to load in the popup. Sometimes it is the case that you'll need info that comes _after_ the popup loads in which case we load the `landing-frame` that's a loading spinner then redirect to the proper/final destination. See the PayPal component for an example.
 * Otherwise if all the info needed is ready up-front, then you can forego a landing frame and go straight to the final destination.
 * @param {string} [options.height] The desired popup height.
 * @param {string} [options.width] The desired popup width.
 * @param {string} [options.top] The desired top value of the popup for positioning.
 * @param {string} [options.left] The desired left value of the popup for positioning.
 * @param {object} [options.state] Seems to be dead code, but allows for injecting data in to popup. NEXT_MAJOR_VERSION remove this param if no usage exists.
 * @param {function} callback The function to invoke once the frameservice is created and ready to use. FrameService instance is returned.
 */
module.exports = {
  create: function createFrameService(options, callback) {
    var frameService = new FrameService(options);

    frameService.initialize(function () {
      callback(frameService);
    });
  },
};

},{"./frame-service":60}],62:[function(_dereq_,module,exports){
"use strict";

var iFramer = _dereq_("@braintree/iframer");
var assign = _dereq_("../../../assign").assign;
var browserDetection = _dereq_("../../shared/browser-detection");

var ELEMENT_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  padding: 0,
  margin: 0,
  border: 0,
  outline: "none",
  zIndex: 20001,
  background: "#FFFFFF",
};

function noop() {}

/**
 *
 * We should not ever really use the Modal. Modals are _like_  popups, but the key difference is that the customer can't actually verify it's app domain and thus secure/valid. Old PP sdk (./src/paypal) uses this
 * to get info from webviews (e.g. facebook).
 */

function Modal(options) {
  this._closed = null;
  this._frame = null;
  this._options = options || {};
  this._container = this._options.container || document.body;
}

Modal.prototype.initialize = noop;

Modal.prototype.open = function () {
  var iframerConfig = {
    src: this._options.openFrameUrl,
    name: this._options.name,
    scrolling: "yes",
    height: "100%",
    width: "100%",
    style: assign({}, ELEMENT_STYLES),
    title: "Lightbox Frame",
  };

  if (browserDetection.isIos()) {
    // WKWebView has buggy behavior when scrolling a fixed position modal. The workaround is to lock scrolling in
    // the background. When modal is closed, we restore scrolling and return to the previous scroll position.
    if (browserDetection.isIosWKWebview()) {
      this._lockScrolling();
      // Allows WKWebView to scroll all the way down to bottom
      iframerConfig.style = {};
    }

    this._el = document.createElement("div");

    assign(this._el.style, ELEMENT_STYLES, {
      height: "100%",
      width: "100%",
      overflow: "auto",
      "-webkit-overflow-scrolling": "touch",
    });

    this._frame = iFramer(iframerConfig);
    this._el.appendChild(this._frame);
  } else {
    this._el = this._frame = iFramer(iframerConfig);
  }
  this._closed = false;

  this._container.appendChild(this._el);
};

Modal.prototype.focus = noop;

Modal.prototype.close = function () {
  this._container.removeChild(this._el);
  this._frame = null;
  this._closed = true;
  if (browserDetection.isIosWKWebview()) {
    this._unlockScrolling();
  }
};

Modal.prototype.isClosed = function () {
  return Boolean(this._closed);
};

Modal.prototype.redirect = function (redirectUrl) {
  this._frame.src = redirectUrl;
};

Modal.prototype._unlockScrolling = function () {
  document.body.style.overflow = this._savedBodyProperties.overflowStyle;
  document.body.style.position = this._savedBodyProperties.positionStyle;
  window.scrollTo(
    this._savedBodyProperties.left,
    this._savedBodyProperties.top
  );
  delete this._savedBodyProperties;
};

Modal.prototype._lockScrolling = function () {
  var doc = document.documentElement;

  // From https://stackoverflow.com/questions/9538868/prevent-body-from-scrolling-when-a-modal-is-opened#comment65626743_24727206
  this._savedBodyProperties = {
    left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
    top: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
    overflowStyle: document.body.style.overflow,
    positionStyle: document.body.style.position,
  };
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  window.scrollTo(0, 0);
};

module.exports = Modal;

},{"../../../assign":49,"../../shared/browser-detection":67,"@braintree/iframer":21}],63:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("../../../braintree-error");
var errors = _dereq_("../../shared/errors");

function noop() {}

function PopupBridge(options) {
  this._closed = null;
  this._options = options;
}

PopupBridge.prototype.initialize = function (callback) {
  var self = this;

  window.popupBridge.onComplete = function (err, payload) {
    var popupDismissed = !payload && !err;

    self._closed = true;

    if (err || popupDismissed) {
      // User clicked "Done" button of browser view
      callback(new BraintreeError(errors.FRAME_SERVICE_FRAME_CLOSED));

      return;
    }
    // User completed popup flow (includes success and cancel cases)
    callback(null, payload);
  };
};

PopupBridge.prototype.open = function (options) {
  var url;

  options = options || {};
  url = options.openFrameUrl || this._options.openFrameUrl;

  this._closed = false;
  window.popupBridge.open(url);
};

PopupBridge.prototype.focus = noop;

PopupBridge.prototype.close = noop;

PopupBridge.prototype.isClosed = function () {
  return Boolean(this._closed);
};

PopupBridge.prototype.redirect = function (redirectUrl) {
  this.open({ openFrameUrl: redirectUrl });
};

module.exports = PopupBridge;

},{"../../../braintree-error":51,"../../shared/errors":69}],64:[function(_dereq_,module,exports){
"use strict";

var constants = _dereq_("../../../shared/constants");
var position = _dereq_("./position");

function calculatePosition(type, userDefinedPosition, size) {
  if (typeof userDefinedPosition !== "undefined") {
    return userDefinedPosition;
  }

  return position[type](size);
}

module.exports = function composePopupOptions(options) {
  var height = options.height || constants.DEFAULT_POPUP_HEIGHT;
  var width = options.width || constants.DEFAULT_POPUP_WIDTH;
  var top = calculatePosition("top", options.top, height);
  var left = calculatePosition("left", options.left, width);

  return [
    constants.POPUP_BASE_OPTIONS,
    "height=" + height,
    "width=" + width,
    "top=" + top,
    "left=" + left,
  ].join(",");
};

},{"../../../shared/constants":68,"./position":66}],65:[function(_dereq_,module,exports){
"use strict";

var composeOptions = _dereq_("./compose-options");

function noop() {}

function Popup(options) {
  this._frame = null;
  this._options = options || {};
}

Popup.prototype.initialize = noop;

Popup.prototype.open = function () {
  this._frame = window.open(
    this._options.openFrameUrl,
    this._options.name,
    composeOptions(this._options)
  );
};

Popup.prototype.focus = function () {
  this._frame.focus();
};

Popup.prototype.close = function () {
  if (this._frame.closed) {
    return;
  }
  this._frame.close();
};

Popup.prototype.isClosed = function () {
  return !this._frame || Boolean(this._frame.closed);
};

Popup.prototype.redirect = function (redirectUrl) {
  this._frame.location.href = redirectUrl;
};

module.exports = Popup;

},{"./compose-options":64}],66:[function(_dereq_,module,exports){
"use strict";

function top(height) {
  var windowHeight =
    window.outerHeight || document.documentElement.clientHeight;
  var windowTop = window.screenY == null ? window.screenTop : window.screenY;

  return center(windowHeight, height, windowTop);
}

function left(width) {
  var windowWidth = window.outerWidth || document.documentElement.clientWidth;
  var windowLeft = window.screenX == null ? window.screenLeft : window.screenX;

  return center(windowWidth, width, windowLeft);
}

function center(windowMetric, popupMetric, offset) {
  return (windowMetric - popupMetric) / 2 + offset;
}

module.exports = {
  top: top,
  left: left,
  center: center,
};

},{}],67:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  isIos: _dereq_("@braintree/browser-detection/is-ios"),
  isIosWKWebview: _dereq_("@braintree/browser-detection/is-ios-wkwebview"),
  supportsPopups: _dereq_("@braintree/browser-detection/supports-popups"),
};

},{"@braintree/browser-detection/is-ios":18,"@braintree/browser-detection/is-ios-wkwebview":17,"@braintree/browser-detection/supports-popups":19}],68:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  DISPATCH_FRAME_NAME: "dispatch",
  DISPATCH_FRAME_CLASS: "braintree-dispatch-frame",
  POPUP_BASE_OPTIONS: "resizable,scrollbars",
  DEFAULT_POPUP_WIDTH: 450,
  DEFAULT_POPUP_HEIGHT: 535,
  POPUP_POLL_INTERVAL: 100,
  POPUP_CLOSE_TIMEOUT: 100,
};

},{}],69:[function(_dereq_,module,exports){
"use strict";

/**
 * @name BraintreeError.Popup Related Error Codes
 * @ignore
 * @description Errors that occur when using a component that opens a popup window.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_CLOSED - Occurs when the frame is closed before tokenization can occur.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_OPEN_FAILED - Occurs when the popup could not be opened.
 */

var BraintreeError = _dereq_("../../braintree-error");

module.exports = {
  FRAME_SERVICE_FRAME_CLOSED: {
    type: BraintreeError.types.INTERNAL,
    code: "FRAME_SERVICE_FRAME_CLOSED",
    message: "Frame closed before tokenization could occur.",
  },
  FRAME_SERVICE_FRAME_OPEN_FAILED: {
    type: BraintreeError.types.INTERNAL,
    code: "FRAME_SERVICE_FRAME_OPEN_FAILED",
    message: "Frame failed to open.",
  },
};

},{"../../braintree-error":51}],70:[function(_dereq_,module,exports){
"use strict";

var enumerate = _dereq_("../../enumerate");

module.exports = enumerate(
  ["DISPATCH_FRAME_READY", "DISPATCH_FRAME_REPORT"],
  "frameService:"
);

},{"../../enumerate":58}],71:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],72:[function(_dereq_,module,exports){
"use strict";

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === "function";
  });
};

},{}],73:[function(_dereq_,module,exports){
"use strict";

function _notEmpty(obj) {
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
}

/* eslint-disable no-mixed-operators */
function _isArray(value) {
  return (
    (value &&
      typeof value === "object" &&
      typeof value.length === "number" &&
      Object.prototype.toString.call(value) === "[object Array]") ||
    false
  );
}
/* eslint-enable no-mixed-operators */

function hasQueryParams(url) {
  url = url || window.location.href;

  return /\?/.test(url);
}

function parse(url) {
  var query, params;

  url = url || window.location.href;

  if (!hasQueryParams(url)) {
    return {};
  }

  query = url.split("?")[1] || "";
  query = query.replace(/#.*$/, "").split("&");

  params = query.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split("=");
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;

    return toReturn;
  }, {});

  return params;
}

function stringify(params, namespace) {
  var k, v, p;
  var query = [];

  for (p in params) {
    if (!params.hasOwnProperty(p)) {
      continue;
    }

    v = params[p];

    if (namespace) {
      if (_isArray(params)) {
        k = namespace + "[]";
      } else {
        k = namespace + "[" + p + "]";
      }
    } else {
      k = p;
    }
    if (typeof v === "object") {
      query.push(stringify(v, k));
    } else {
      query.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }

  return query.join("&");
}

function queryify(url, params) {
  url = url || "";

  if (params != null && typeof params === "object" && _notEmpty(params)) {
    url += url.indexOf("?") === -1 ? "?" : "";
    url += url.indexOf("=") !== -1 ? "&" : "";
    url += stringify(params);
  }

  return url;
}

module.exports = {
  parse: parse,
  stringify: stringify,
  queryify: queryify,
  hasQueryParams: hasQueryParams,
};

},{}],74:[function(_dereq_,module,exports){
"use strict";

function useMin(isDebug) {
  return isDebug ? "" : ".min";
}

module.exports = useMin;

},{}],75:[function(_dereq_,module,exports){
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

},{}],76:[function(_dereq_,module,exports){
"use strict";

/**
 * @name BraintreeError.PayPal Checkout - Creation Error Codes
 * @description Errors that occur when [creating the PayPal Checkout component](./module-braintree-web_paypal-checkout.html#.create).
 * @property {MERCHANT} PAYPAL_NOT_ENABLED Occurs when PayPal is not enabled on the Braintree control panel.
 * @property {MERCHANT} PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED Occurs only when testing in Sandbox, when a PayPal sandbox account is not linked to the merchant account in the Braintree control panel.
 */

/**
 * @name BraintreeError.PayPal Checkout - createPayment Error Codes
 * @description Errors that occur when using the [`createPayment` method](./PayPalCheckout.html#createPayment).
 * @property {MERCHANT} PAYPAL_FLOW_OPTION_REQUIRED Occurs when a required option is missing.
 * @property {MERCHANT} PAYPAL_INVALID_PAYMENT_OPTION Occurs when an option contains an invalid value.
 * @property {NETWORK} PAYPAL_FLOW_FAILED Occurs when something goes wrong when initializing the flow.
 */

/**
 * @name BraintreeError.PayPal Checkout - startVaultInitiatedCheckout Error Codes
 * @description Errors that occur when using the [`startVaultInitiatedCheckout` method](./PayPalCheckout.html#startVaultInitiatedCheckout).
 * @property {MERCHANT} PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED Occurs when a required param is missing when calling the method.
 * @property {MERCHANT} PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED Occurs when PayPal window could not be opened. This often occurs because the call to start the vault initiated flow was not triggered from a click event.
 * @property {CUSTOMER} PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED Occurs when a customer closes the PayPal flow before completion.
 * @property {MERCHANT} PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS Occurs when the flow is initialized while an authorization is already in progress.
 * @property {NETWORK} PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED Occurs when something went wrong setting up the flow.
 */

/**
 * @name BraintreeError.PayPal Checkout - tokenizePayment Error Codes
 * @description Errors that occur when using the [`tokenizePayment` method](./PayPalCheckout.html#tokenizePayment).
 * @property {NETWORK} PAYPAL_ACCOUNT_TOKENIZATION_FAILED Occurs when PayPal account could not be tokenized.
 */

/**
 * @name BraintreeError.Paypal Checkout - updatePayment Error Codes
 * @description Errors that occur when using the [`updatePayment` method](./PayPalCheckout.html#updatePayment).
 * @property {MERCHANT} PAYPAL_INVALID_PAYMENT_OPTION Occurs when an option contains an invalid value.
 * @property {MERCHANT} PAYPAL_MISSING_REQUIRED_OPTION Occurs when a required option is missing.
 * @property {NETWORK} PAYPAL_FLOW_FAILED Occurs when something goes wrong when initializing the flow or communicating with the server.
 */
var BraintreeError = _dereq_("../lib/braintree-error");

module.exports = {
  PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_NOT_ENABLED",
    message: "PayPal is not enabled for this merchant.",
  },
  PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED",
    message:
      "A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developer.paypal.com/braintree/docs/guides/paypal/testing-go-live#linked-paypal-testing for details on linking your PayPal sandbox with Braintree.",
  },
  PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: "PAYPAL_ACCOUNT_TOKENIZATION_FAILED",
    message: "Could not tokenize user's PayPal account.",
  },
  PAYPAL_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: "PAYPAL_FLOW_FAILED",
    message: "Could not initialize PayPal flow.",
  },
  PAYPAL_FLOW_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_FLOW_OPTION_REQUIRED",
    message: "PayPal flow property is invalid or missing.",
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED",
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED",
    message: "Something went wrong when setting up the checkout workflow.",
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED",
    message:
      "PayPal popup failed to open, make sure to initiate the vault checkout in response to a user action.",
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED",
    message: "Customer closed PayPal popup before authorizing.",
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS",
    message: "Vault initiated checkout already in progress.",
  },
  PAYPAL_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_INVALID_PAYMENT_OPTION",
    message: "PayPal payment options are invalid.",
  },
  PAYPAL_MISSING_REQUIRED_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: "PAYPAL_MISSING_REQUIRED_OPTION",
    message: "Missing required option.",
  },
};

},{"../lib/braintree-error":51}],77:[function(_dereq_,module,exports){
"use strict";
/**
 * @module braintree-web/paypal-checkout
 * @description A component to integrate with the [PayPal JS SDK](https://github.com/paypal/paypal-checkout-components).
 */

var basicComponentVerification = _dereq_("../lib/basic-component-verification");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var PayPalCheckout = _dereq_("./paypal-checkout");
var VERSION = "3.92.2";

/**
 * @static
 * @function create
 * @description There are two ways to integrate the PayPal Checkout component. See the [PayPal Checkout constructor documentation](PayPalCheckout.html#PayPalCheckout) for more information and examples.
 *
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {string} [options.merchantAccountId] A non-default merchant account ID to use for tokenization.
 * @param {boolean} [options.autoSetDataUserIdToken=false] Whether or not to render the PayPal SDK button with a customer's vaulted PayPal account. Must be used in conjunction with a Client Token generated with a customer id.
 * @param {callback} [callback] The second argument, `data`, is the {@link PayPalCheckout} instance.
 * @example
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   // set up the PayPal JS SDK
 * }).catch(function (err) {
 *   console.error('Error!', err);
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = "PayPal Checkout";

  return basicComponentVerification
    .verify({
      name: name,
      client: options.client,
      authorization: options.authorization,
    })
    .then(function () {
      var instance = new PayPalCheckout(options);

      return instance._initialize(options);
    });
}

/**
 * @static
 * @function isSupported
 * @description Returns true if PayPal Checkout [supports this browser](index.html#browser-support-webviews).
 * @deprecated Previously, this method checked for Popup support in the browser. The PayPal JS SDK now falls back to a modal if popups are not supported.
 * @returns {Boolean} Returns true if PayPal Checkout supports this browser.
 */
function isSupported() {
  return true;
}

module.exports = {
  create: wrapPromise(create),
  isSupported: isSupported,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION,
};

},{"../lib/basic-component-verification":50,"./paypal-checkout":78,"@braintree/wrap-promise":29}],78:[function(_dereq_,module,exports){
"use strict";

var analytics = _dereq_("../lib/analytics");
var assign = _dereq_("../lib/assign").assign;
var createDeferredClient = _dereq_("../lib/create-deferred-client");
var createAssetsUrl = _dereq_("../lib/create-assets-url");
var ExtendedPromise = _dereq_("@braintree/extended-promise");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var BraintreeError = _dereq_("../lib/braintree-error");
var convertToBraintreeError = _dereq_("../lib/convert-to-braintree-error");
var errors = _dereq_("./errors");
var constants = _dereq_("../paypal/shared/constants");
var frameService = _dereq_("../lib/frame-service/external");
var createAuthorizationData = _dereq_("../lib/create-authorization-data");
var methods = _dereq_("../lib/methods");
var useMin = _dereq_("../lib/use-min");
var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
var querystring = _dereq_("../lib/querystring");
var VERSION = "3.92.2";
var INTEGRATION_TIMEOUT_MS = _dereq_("../lib/constants").INTEGRATION_TIMEOUT_MS;

var REQUIRED_PARAMS_FOR_START_VAULT_INITIATED_CHECKOUT = [
  "amount",
  "currency",
  "vaultInitiatedCheckoutPaymentMethodToken",
];

var PAYPAL_SDK_PRELOAD_URL =
  "https://www.{ENV}paypal.com/smart/buttons/preload";

ExtendedPromise.suppressUnhandledPromiseMessage = true;

/**
 * PayPal Checkout tokenized payload. Returned in {@link PayPalCheckout#tokenizePayment}'s callback as the second argument, `data`.
 * @typedef {object} PayPalCheckout~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `PayPalAccount`.
 * @property {object} details Additional PayPal account details.
 * @property {string} details.email User's email address.
 * @property {string} details.payerId User's payer ID, the unique identifier for each PayPal account.
 * @property {string} details.firstName User's given name.
 * @property {string} details.lastName User's surname.
 * @property {?string} details.countryCode User's 2 character country code.
 * @property {?string} details.phone User's phone number (e.g. 555-867-5309).
 * @property {?object} details.shippingAddress User's shipping address details, only available if shipping address is enabled.
 * @property {string} details.shippingAddress.recipientName Recipient of postage.
 * @property {string} details.shippingAddress.line1 Street number and name.
 * @property {string} details.shippingAddress.line2 Extended address.
 * @property {string} details.shippingAddress.city City or locality.
 * @property {string} details.shippingAddress.state State or region.
 * @property {string} details.shippingAddress.postalCode Postal code.
 * @property {string} details.shippingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} details.billingAddress User's billing address details.
 * Not available to all merchants; [contact support](https://developer.paypal.com/braintree/help) for details on eligibility and enabling this feature.
 * Alternatively, see `shippingAddress` above as an available client option.
 * @property {string} details.billingAddress.line1 Street number and name.
 * @property {string} details.billingAddress.line2 Extended address.
 * @property {string} details.billingAddress.city City or locality.
 * @property {string} details.billingAddress.state State or region.
 * @property {string} details.billingAddress.postalCode Postal code.
 * @property {string} details.billingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} creditFinancingOffered This property will only be present when the customer pays with PayPal Credit.
 * @property {object} creditFinancingOffered.totalCost This is the estimated total payment amount including interest and fees the user will pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalCost.value An amount defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalCost.currency 3 letter currency code as defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {number} creditFinancingOffered.term Length of financing terms in months.
 * @property {object} creditFinancingOffered.monthlyPayment This is the estimated amount per month that the customer will need to pay including fees and interest.
 * @property {string} creditFinancingOffered.monthlyPayment.value An amount defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.monthlyPayment.currency 3 letter currency code as defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {object} creditFinancingOffered.totalInterest Estimated interest or fees amount the payer will have to pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalInterest.value An amount defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalInterest.currency 3 letter currency code as defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {boolean} creditFinancingOffered.payerAcceptance Status of whether the customer ultimately was approved for and chose to make the payment using the approved installment credit.
 * @property {boolean} creditFinancingOffered.cartAmountImmutable Indicates whether the cart amount is editable after payer's acceptance on PayPal side.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/paypal-checkout.create|paypal-checkout.create}
 * @classdesc This class represents a PayPal Checkout component that coordinates with the {@link https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page|PayPal SDK}. Instances of this class can generate payment data and tokenize authorized payments.
 *
 * All UI (such as preventing actions on the parent page while authentication is in progress) is managed by the {@link https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page|PayPal SDK}. You must provide your PayPal `client-id` as a query parameter. You can [retrieve this value from the PayPal Dashboard](https://developer.paypal.com/docs/checkout/integrate/#1-get-paypal-rest-api-credentials).
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/paypal-checkout.create|braintree-web.paypal-checkout.create} instead.</strong>
 *
 * #### Integrate Checkout Flow with PayPal SDK
 *
 * You must have [PayPal's script, configured with various query parameters](https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page), loaded on your page:
 *
 * ```html
 * <script src="https://www.paypal.com/sdk/js?client-id=your-sandbox-or-prod-client-id"></script>
 * <div id="paypal-button"></div>
 * ```
 *
 * When passing values in the `createPayment` method, make sure they match the [corresponding parameters in the query parameters for the PayPal SDK script](https://developer.paypal.com/docs/checkout/reference/customize-sdk/).
 *
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Buttons({
 *     createOrder: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         flow: 'checkout',
 *         currency: 'USD',
 *         amount: '10.00',
 *         intent: 'capture' // this value must either be `capture` or match the intent passed into the PayPal SDK intent query parameter
 *         // your other createPayment options here
 *       });
 *     },
 *
 *     onApprove: function (data, actions) {
 *       // some logic here before tokenization happens below
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     },
 *
 *     onCancel: function () {
 *       // handle case where user cancels
 *     },
 *
 *     onError: function (err) {
 *       // handle case where error occurs
 *     }
 *   }).render('#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 *
 * #### Integrate Vault Flow with PayPal SDK
 *
 * You must have [PayPal's script, configured with various query parameters](https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page), loaded on your page:
 *
 * ```html
 * <script src="https://www.paypal.com/sdk/js?client-id=your-sandbox-or-prod-client-id&vault=true"></script>
 * <div id="paypal-button"></div>
 * ```
 *
 * When passing values in the `createPayment` method, make sure they match the [corresponding parameters in the query parameters for the PayPal SDK script](https://developer.paypal.com/docs/checkout/reference/customize-sdk/).
 *
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Buttons({
 *     createBillingAgreement: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         flow: 'vault'
 *         // your other createPayment options here
 *       });
 *     },
 *
 *     onApprove: function (data, actions) {
 *       // some logic here before tokenization happens below
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     },
 *
 *     onCancel: function () {
 *       // handle case where user cancels
 *     },
 *
 *     onError: function (err) {
 *       // handle case where error occurs
 *     }
 *   }).render('#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 *
 * #### Integrate with Checkout.js (deprecated PayPal SDK)
 *
 * If you are creating a new PayPal integration, please follow the previous integration guide to use the current version of the PayPal SDK. Use this integration guide only as a reference if you are already integrated with Checkout.js.
 *
 * You must have PayPal's Checkout.js script loaded on your page.
 *
 * ```html
 * <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4 log-level="warn"></script>
 * ```
 *
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Button.render({
 *     env: 'production', // or 'sandbox'
 *
 *     payment: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         // your createPayment options here
 *       });
 *     },
 *
 *     onAuthorize: function (data, actions) {
 *       // some logic here before tokenization happens below
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     }
 *   }, '#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 */
function PayPalCheckout(options) {
  this._merchantAccountId = options.merchantAccountId;
  // TODO remove this requirement for it to be opt in.
  // This feature is not yet GA, so we're intentionally making
  // it opt in and not publicly documenting it yet. Once it's
  // GA, we can remove the requirement to opt in to it
  this._autoSetDataUserIdToken = Boolean(options.autoSetDataUserIdToken);
}

PayPalCheckout.prototype._initialize = function (options) {
  var config;

  if (options.client) {
    config = options.client.getConfiguration();
    this._authorizationInformation = {
      fingerprint: config.authorizationFingerprint,
      environment: config.gatewayConfiguration.environment,
    };
  } else {
    config = createAuthorizationData(options.authorization);
    this._authorizationInformation = {
      fingerprint: config.attrs.authorizationFingerprint,
      environment: config.environment,
    };
  }

  this._clientPromise = createDeferredClient
    .create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: "PayPal Checkout",
    })
    .then(
      function (client) {
        this._configuration = client.getConfiguration();

        // we skip these checks if a merchant account id is
        // passed in, because the default merchant account
        // may not have paypal enabled
        if (!this._merchantAccountId) {
          if (!this._configuration.gatewayConfiguration.paypalEnabled) {
            this._setupError = new BraintreeError(errors.PAYPAL_NOT_ENABLED);
          } else if (
            this._configuration.gatewayConfiguration.paypal
              .environmentNoNetwork === true
          ) {
            this._setupError = new BraintreeError(
              errors.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED
            );
          }
        }

        if (this._setupError) {
          return Promise.reject(this._setupError);
        }

        analytics.sendEvent(client, "paypal-checkout.initialized");
        this._frameServicePromise = this._setupFrameService(client);

        return client;
      }.bind(this)
    );

  // if client was passed in, let config checks happen before
  // resolving the instance. Otherwise, just resolve the instance
  if (options.client) {
    return this._clientPromise.then(
      function () {
        return this;
      }.bind(this)
    );
  }

  return Promise.resolve(this);
};

PayPalCheckout.prototype._setupFrameService = function (client) {
  var frameServicePromise = new ExtendedPromise();
  var config = client.getConfiguration();
  var timeoutRef = setTimeout(function () {
    analytics.sendEvent(client, "paypal-checkout.frame-service.timed-out");
    frameServicePromise.reject(
      new BraintreeError(
        errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED
      )
    );
  }, INTEGRATION_TIMEOUT_MS);

  this._assetsUrl =
    config.gatewayConfiguration.paypal.assetsUrl + "/web/" + VERSION;
  this._isDebug = config.isDebug;
  // Note: this is using the static landing frame that the deprecated PayPal component builds and uses
  this._loadingFrameUrl =
    this._assetsUrl +
    "/html/paypal-landing-frame" +
    useMin(this._isDebug) +
    ".html";

  frameService.create(
    {
      name: "braintreepaypallanding",
      dispatchFrameUrl:
        this._assetsUrl +
        "/html/dispatch-frame" +
        useMin(this._isDebug) +
        ".html",
      openFrameUrl: this._loadingFrameUrl,
    },
    function (service) {
      this._frameService = service;
      clearTimeout(timeoutRef);

      frameServicePromise.resolve();
    }.bind(this)
  );

  return frameServicePromise;
};

/**
 * @typedef {object} PayPalCheckout~lineItem
 * @property {string} quantity Number of units of the item purchased. This value must be a whole number and can't be negative or zero.
 * @property {string} unitAmount Per-unit price of the item. Can include up to 2 decimal places. This value can't be negative or zero.
 * @property {string} name Item name. Maximum 127 characters.
 * @property {string} kind Indicates whether the line item is a debit (sale) or credit (refund) to the customer. Accepted values: `debit` and `credit`.
 * @property {?string} unitTaxAmount Per-unit tax price of the item. Can include up to 2 decimal places. This value can't be negative or zero.
 * @property {?string} description Item description. Maximum 127 characters.
 * @property {?string} productCode Product or UPC code for the item. Maximum 127 characters.
 * @property {?string} url The URL to product information.
 */

/**
 * @typedef {object} PayPalCheckout~shippingOption
 * @property {string} id A unique ID that identifies a payer-selected shipping option.
 * @property {string} label A description that the payer sees, which helps them choose an appropriate shipping option. For example, `Free Shipping`, `USPS Priority Shipping`, `Expédition prioritaire USPS`, or `USPS yōuxiān fā huò`. Localize this description to the payer's locale.
 * @property {boolean} selected If `selected = true` is specified as part of the API request it represents the shipping option that the payee/merchant expects to be pre-selected for the payer when they first view the shipping options within the PayPal checkout experience. As part of the response if a shipping option has `selected = true` it represents the shipping option that the payer selected during the course of checkout with PayPal. Only 1 `shippingOption` can be set to `selected = true`.
 * @property {string} type The method by which the payer wants to get their items. The possible values are:
 * * `SHIPPING` - The payer intends to receive the items at a specified address.
 * * `PICKUP` - The payer intends to pick up the items at a specified address. For example, a store address.
 * @property {object} amount The shipping cost for the selected option.
 * @property {string} amount.currency The three-character ISO-4217 currency code. PayPal does not support all currencies.
 * @property {string} amount.value The amount the shipping option will cost. Includes the specified number of digits after decimal separator for the ISO-4217 currency code.
 */

/**
 * Creates a PayPal payment ID or billing token using the given options. This is meant to be passed to the PayPal JS SDK.
 * When a {@link callback} is defined, the function returns undefined and invokes the callback with the id to be used with the PayPal JS SDK. Otherwise, it returns a Promise that resolves with the id.
 * @public
 * @param {object} options All options for the PayPalCheckout component.
 * @param {string} options.flow Set to 'checkout' for one-time payment flow, or 'vault' for Vault flow. If 'vault' is used with a client token generated with a customer ID, the PayPal account will be added to that customer as a saved payment method.
 * @param {string} [options.intent=authorize]
 * * `authorize` - Submits the transaction for authorization but not settlement.
 * * `order` - Validates the transaction without an authorization (i.e. without holding funds). Useful for authorizing and capturing funds up to 90 days after the order has been placed. Only available for Checkout flow.
 * * `capture` - Payment will be immediately submitted for settlement upon creating a transaction. `sale` can be used as an alias for this value.
 * @param {boolean} [options.offerCredit=false] Offers PayPal Credit as the default funding instrument for the transaction. If the customer isn't pre-approved for PayPal Credit, they will be prompted to apply for it.
 * @param {(string|number)} [options.amount] The amount of the transaction. Required when using the Checkout flow. Should not include shipping cost.
 * * Supports up to 2 digits after the decimal point
 * @param {string} [options.currency] The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {string} [options.displayName] The merchant name displayed inside of the PayPal lightbox; defaults to the company name on your Braintree account
 * @param {boolean} [options.requestBillingAgreement] If `true` and `flow = checkout`, the customer will be prompted to consent to a billing agreement during the checkout flow. This value is ignored when `flow = vault`.
 * @param {object} [options.billingAgreementDetails] When `requestBillingAgreement = true`, allows for details to be set for the billing agreement portion of the flow.
 * @param {string} [options.billingAgreementDetails.description] Description of the billing agreement to display to the customer.
 * @param {string} [options.vaultInitiatedCheckoutPaymentMethodToken] Use the payment method nonce representing a PayPal account with a Billing Agreement ID to create the payment and redirect the customer to select a new financial instrument. This option is only applicable to the `checkout` flow.
 * @param {shippingOption[]} [options.shippingOptions] List of shipping options offered by the payee or merchant to the payer to ship or pick up their items.
 * @param {boolean} [options.enableShippingAddress=false] Returns a shipping address object in {@link PayPal#tokenize}.
 * @param {object} [options.shippingAddressOverride] Allows you to pass a shipping address you have already collected into the PayPal payment flow.
 * @param {string} options.shippingAddressOverride.line1 Street address.
 * @param {string} [options.shippingAddressOverride.line2] Street address (extended).
 * @param {string} options.shippingAddressOverride.city City.
 * @param {string} options.shippingAddressOverride.state State.
 * @param {string} options.shippingAddressOverride.postalCode Postal code.
 * @param {string} options.shippingAddressOverride.countryCode Country.
 * @param {string} [options.shippingAddressOverride.phone] Phone number.
 * @param {string} [options.shippingAddressOverride.recipientName] Recipient's name.
 * @param {boolean} [options.shippingAddressEditable=true] Set to false to disable user editing of the shipping address.
 * @param {string} [options.billingAgreementDescription] Use this option to set the description of the preapproved payment agreement visible to customers in their PayPal profile during Vault flows. Max 255 characters.
 * @param {string} [options.landingPageType] Use this option to specify the PayPal page to display when a user lands on the PayPal site to complete the payment.
 * * `login` - A PayPal account login page is used.
 * * `billing` - A non-PayPal account landing page is used.
 * @param {lineItem[]} [options.lineItems] The {@link PayPalCheckout~lineItem|line items} for this transaction. It can include up to 249 line items.
 * @param {callback} [callback] The second argument is a PayPal `paymentId` or `billingToken` string, depending on whether `options.flow` is `checkout` or `vault`. This is also what is resolved by the promise if no callback is provided.
 * @example
 * // this paypal object is created by the PayPal JS SDK
 * // see https://github.com/paypal/paypal-checkout-components
 * paypal.Buttons({
 *   createOrder: function () {
 *     // when createPayment resolves, it is automatically passed to the PayPal JS SDK
 *     return paypalCheckoutInstance.createPayment({
 *       flow: 'checkout',
 *       amount: '10.00',
 *       currency: 'USD',
 *       intent: 'capture' // this value must either be `capture` or match the intent passed into the PayPal SDK intent query parameter
 *     });
 *   },
 *   // Add other options, e.g. onApproved, onCancel, onError
 * }).render('#paypal-button');
 *
 * @example
 * // shippingOptions are passed to createPayment. You can review the result from onAuthorize to determine which shipping option id was selected.
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Button.render({
 *     env: 'production'
 *
 *     payment: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         flow: 'checkout',
 *         amount: '10.00',
 *         currency: 'USD',
 *         shippingOptions: [
 *           {
 *             id: 'UUID-9',
 *             type: 'PICKUP',
 *             label: 'Store Location Five',
 *             selected: true,
 *             amount: {
 *               value: '1.00',
 *               currency: 'USD'
 *             }
 *           },
 *           {
 *             id: 'shipping-speed-fast',
 *             type: 'SHIPPING',
 *             label: 'Fast Shipping',
 *             selected: false,
 *             amount: {
 *               value: '1.00',
 *               currency: 'USD'
 *             }
 *           },
 *           {
 *             id: 'shipping-speed-slow',
 *             type: 'SHIPPING',
 *             label: 'Slow Shipping',
 *             selected: false,
 *             amount: {
 *               value: '1.00',
 *               currency: 'USD'
 *             }
 *           }
 *         ]
 *       });
 *     },
 *
 *     onAuthorize: function (data, actions) {
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     }
 *   }, '#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.createPayment = function (options) {
  if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
    return Promise.reject(
      new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED)
    );
  }

  analytics.sendEvent(this._clientPromise, "paypal-checkout.createPayment");

  return this._createPaymentResource(options).then(function (response) {
    var flowToken;

    if (options.flow === "checkout") {
      flowToken = response.paymentResource.redirectUrl.match(/EC-\w+/)[0];
    } else {
      flowToken = response.agreementSetup.tokenId;
    }

    return flowToken;
  });
};

PayPalCheckout.prototype._createPaymentResource = function (options, config) {
  var self = this;
  var endpoint = "paypal_hermes/" + constants.FLOW_ENDPOINTS[options.flow];

  delete this.intentFromCreatePayment;

  config = config || {};

  if (options.offerCredit === true) {
    analytics.sendEvent(this._clientPromise, "paypal-checkout.credit.offered");
  }

  return this._clientPromise
    .then(function (client) {
      return client
        .request({
          endpoint: endpoint,
          method: "post",
          data: self._formatPaymentResourceData(options, config),
        })
        .then(function (data) {
          self.intentFromCreatePayment = options.intent;

          return data;
        });
    })
    .catch(function (err) {
      var status;

      if (self._setupError) {
        return Promise.reject(self._setupError);
      }

      status = err.details && err.details.httpStatus;

      if (status === 422) {
        return Promise.reject(
          new BraintreeError({
            type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
            code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
            message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
            details: {
              originalError: err,
            },
          })
        );
      }

      return Promise.reject(
        convertToBraintreeError(err, {
          type: errors.PAYPAL_FLOW_FAILED.type,
          code: errors.PAYPAL_FLOW_FAILED.code,
          message: errors.PAYPAL_FLOW_FAILED.message,
        })
      );
    });
};

/**
 * Use this function to update {@link PayPalCheckout~lineItem|line items} and/or {@link PayPalCheckout~shippingOption|shipping options} associated with a PayPalCheckout flow (`paymentId`).
 * When a {@link callback} is defined, this function returns undefined and invokes the callback. The second callback argument, <code>data</code>, is the returned server data. If no callback is provided, `updatePayment` returns a promise that resolves with the server data.
 * @public
 * @param {object} options All options for the PayPalCheckout component.
 * @param {string} options.paymentId This should be PayPal `paymentId`.
 * @param {(string|number)} [options.amount] The amount of the transaction, including the amount of the selected shipping option.
 * * Supports up to 2 decimal digits.
 * @param {string} options.currency The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {shippingOption[]} [options.shippingOptions] List of {@link PayPalCheckout~shippingOption|shipping options} offered by the payee or merchant to the payer to ship or pick up their items.
 * @param {lineItem[]} [options.lineItems] The {@link PayPalCheckout~lineItem|line items} for this transaction. It can include up to 249 line items.
 * @param {callback} [callback] The second argument is a PayPal `paymentId` or `billingToken` string, depending on whether `options.flow` is `checkout` or `vault`. This is also what is resolved by the promise if no callback is provided.
 * @example
 * // this paypal object is created by the PayPal JS SDK
 * // see https://github.com/paypal/paypal-checkout-components
 * paypal.Buttons({
 *   createOrder: function () {
 *     // when createPayment resolves, it is automatically passed to the PayPal JS SDK
 *     return paypalCheckoutInstance.createPayment({
 *       //
 *     });
 *   },
 *   onShippingChange: function (data) {
 *     // Examine data and determine if the payment needs to be updated.
 *     // when updatePayment resolves, it is automatically passed to the PayPal JS SDK
 *     return paypalCheckoutInstance.updatePayment({
 *         paymentId: data.paymentId,
 *         amount: '15.00',
 *         currency: 'USD',
 *         shippingOptions: [
 *           {
 *             id: 'shipping-speed-fast',
 *             type: 'SHIPPING',
 *             label: 'Fast Shipping',
 *             selected: true,
 *             amount: {
 *               value: '5.00',
 *               currency: 'USD'
 *             }
 *           },
 *           {
 *             id: 'shipping-speed-slow',
 *             type: 'SHIPPING',
 *             label: 'Slow Shipping',
 *             selected: false,
 *             amount: {
 *               value: '1.00',
 *               currency: 'USD'
 *             }
 *           }
 *         ]
 *     });
 *   }
 *   // Add other options, e.g. onApproved, onCancel, onError
 * }).render('#paypal-button');
 *
 * ```
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.updatePayment = function (options) {
  var self = this;
  var endpoint = "paypal_hermes/patch_payment_resource";

  if (!options || this._hasMissingOption(options, constants.REQUIRED_OPTIONS)) {
    analytics.sendEvent(
      self._clientPromise,
      "paypal-checkout.updatePayment.missing-options"
    );

    return Promise.reject(
      new BraintreeError(errors.PAYPAL_MISSING_REQUIRED_OPTION)
    );
  }

  if (!this._verifyConsistentCurrency(options)) {
    analytics.sendEvent(
      self._clientPromise,
      "paypal-checkout.updatePayment.inconsistent-currencies"
    );

    return Promise.reject(
      new BraintreeError({
        type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
        code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
        message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
        details: {
          originalError: new Error(
            "One or more shipping option currencies differ from checkout currency."
          ),
        },
      })
    );
  }

  analytics.sendEvent(this._clientPromise, "paypal-checkout.updatePayment");

  return this._clientPromise
    .then(function (client) {
      return client.request({
        endpoint: endpoint,
        method: "post",
        data: self._formatUpdatePaymentData(options),
      });
    })
    .catch(function (err) {
      var status = err.details && err.details.httpStatus;

      if (status === 422) {
        analytics.sendEvent(
          self._clientPromise,
          "paypal-checkout.updatePayment.invalid"
        );

        return Promise.reject(
          new BraintreeError({
            type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
            code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
            message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
            details: {
              originalError: err,
            },
          })
        );
      }

      analytics.sendEvent(
        self._clientPromise,
        "paypal-checkout.updatePayment." + errors.PAYPAL_FLOW_FAILED.code
      );

      return Promise.reject(
        convertToBraintreeError(err, {
          type: errors.PAYPAL_FLOW_FAILED.type,
          code: errors.PAYPAL_FLOW_FAILED.code,
          message: errors.PAYPAL_FLOW_FAILED.message,
        })
      );
    });
};

/**
 * Initializes the PayPal checkout flow with a payment method nonce that represents a vaulted PayPal account.
 * When a {@link callback} is defined, the function returns undefined and invokes the callback with the id to be used with the PayPal JS SDK. Otherwise, it returns a Promise that resolves with the id.
 * @public
 * @ignore
 * @param {object} options These options are identical to the {@link PayPalCheckout#createPayment|options for creating a payment resource}, except for the following:
 * * `flow` cannot be set (will always be `'checkout'`)
 * * `amount`, `currency`, and `vaultInitiatedCheckoutPaymentMethodToken` are required instead of optional
 * * Additional configuration is available (listed below)
 * @param {boolean} [options.optOutOfModalBackdrop=false] By default, the webpage will darken and become unusable while the PayPal window is open. For full control of the UI, pass `true` for this option.
 * @param {callback} [callback] The second argument, <code>payload</code>, is a {@link PayPalCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, the promise resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @example
 * paypalCheckoutInstance.startVaultInitiatedCheckout({
 *   vaultInitiatedCheckoutPaymentMethodToken: 'nonce-that-represents-a-vaulted-paypal-account',
 *   amount: '10.00',
 *   currency: 'USD'
 * }).then(function (payload) {
 *   // send payload.nonce to your server
 * }).catch(function (err) {
 *   if (err.code === 'PAYPAL_POPUP_CLOSED') {
 *     // indicates that customer canceled by
 *     // manually closing the PayPal popup
 *   }
 *
 *   // handle other errors
 * });
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.startVaultInitiatedCheckout = function (options) {
  var missingRequiredParam;
  var self = this;

  if (this._vaultInitiatedCheckoutInProgress) {
    analytics.sendEvent(
      this._clientPromise,
      "paypal-checkout.startVaultInitiatedCheckout.error.already-in-progress"
    );

    return Promise.reject(
      new BraintreeError(
        errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS
      )
    );
  }

  REQUIRED_PARAMS_FOR_START_VAULT_INITIATED_CHECKOUT.forEach(function (param) {
    if (!options.hasOwnProperty(param)) {
      missingRequiredParam = param;
    }
  });

  if (missingRequiredParam) {
    return Promise.reject(
      new BraintreeError({
        type: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.type,
        code: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.code,
        message: "Required param " + missingRequiredParam + " is missing.",
      })
    );
  }

  this._vaultInitiatedCheckoutInProgress = true;
  this._addModalBackdrop(options);

  options = assign({}, options, {
    flow: "checkout",
  });

  analytics.sendEvent(
    this._clientPromise,
    "paypal-checkout.startVaultInitiatedCheckout.started"
  );

  return this._waitForVaultInitiatedCheckoutDependencies()
    .then(function () {
      var frameCommunicationPromise = new ExtendedPromise();
      var startVaultInitiatedCheckoutPromise = self
        ._createPaymentResource(options, {
          returnUrl: self._constructVaultCheckutUrl("redirect-frame"),
          cancelUrl: self._constructVaultCheckutUrl("cancel-frame"),
        })
        .then(function (response) {
          var redirectUrl = response.paymentResource.redirectUrl;

          self._frameService.redirect(redirectUrl);

          return frameCommunicationPromise;
        });

      self._frameService.open(
        {},
        self._createFrameServiceCallback(frameCommunicationPromise)
      );

      return startVaultInitiatedCheckoutPromise;
    })
    .catch(function (err) {
      self._vaultInitiatedCheckoutInProgress = false;
      self._removeModalBackdrop();

      if (err.code === "FRAME_SERVICE_FRAME_CLOSED") {
        analytics.sendEvent(
          self._clientPromise,
          "paypal-checkout.startVaultInitiatedCheckout.canceled.by-customer"
        );

        return Promise.reject(
          new BraintreeError(
            errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED
          )
        );
      }

      if (self._frameService) {
        self._frameService.close();
      }

      if (
        err.code &&
        err.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1
      ) {
        analytics.sendEvent(
          self._clientPromise,
          "paypal-checkout.startVaultInitiatedCheckout.failed.popup-not-opened"
        );

        return Promise.reject(
          new BraintreeError({
            code: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED
              .code,
            type: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED
              .type,
            message:
              errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED
                .message,
            details: {
              originalError: err,
            },
          })
        );
      }

      return Promise.reject(err);
    })
    .then(function (response) {
      self._frameService.close();
      self._vaultInitiatedCheckoutInProgress = false;
      self._removeModalBackdrop();
      analytics.sendEvent(
        self._clientPromise,
        "paypal-checkout.startVaultInitiatedCheckout.succeeded"
      );

      return Promise.resolve(response);
    });
};

PayPalCheckout.prototype._addModalBackdrop = function (options) {
  if (options.optOutOfModalBackdrop) {
    return;
  }

  if (!this._modalBackdrop) {
    this._modalBackdrop = document.createElement("div");
    this._modalBackdrop.setAttribute(
      "data-braintree-paypal-vault-initiated-checkout-modal",
      true
    );
    this._modalBackdrop.style.position = "fixed";
    this._modalBackdrop.style.top = 0;
    this._modalBackdrop.style.bottom = 0;
    this._modalBackdrop.style.left = 0;
    this._modalBackdrop.style.right = 0;
    this._modalBackdrop.style.zIndex = 9999;
    this._modalBackdrop.style.background = "black";
    this._modalBackdrop.style.opacity = "0.7";
    this._modalBackdrop.addEventListener(
      "click",
      function () {
        this.focusVaultInitiatedCheckoutWindow();
      }.bind(this)
    );
  }

  document.body.appendChild(this._modalBackdrop);
};

PayPalCheckout.prototype._removeModalBackdrop = function () {
  if (!(this._modalBackdrop && this._modalBackdrop.parentNode)) {
    return;
  }

  this._modalBackdrop.parentNode.removeChild(this._modalBackdrop);
};

/**
 * Closes the PayPal window if it is opened via `startVaultInitiatedCheckout`.
 * @public
 * @ignore
 * @param {callback} [callback] Gets called when window is closed.
 * @example
 * paypalCheckoutInstance.closeVaultInitiatedCheckoutWindow();
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.closeVaultInitiatedCheckoutWindow = function () {
  if (this._vaultInitiatedCheckoutInProgress) {
    analytics.sendEvent(
      this._clientPromise,
      "paypal-checkout.startVaultInitiatedCheckout.canceled.by-merchant"
    );
  }

  return this._waitForVaultInitiatedCheckoutDependencies().then(
    function () {
      this._frameService.close();
    }.bind(this)
  );
};

/**
 * Focuses the PayPal window if it is opened via `startVaultInitiatedCheckout`.
 * @public
 * @ignore
 * @param {callback} [callback] Gets called when window is focused.
 * @example
 * paypalCheckoutInstance.focusVaultInitiatedCheckoutWindow();
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.focusVaultInitiatedCheckoutWindow = function () {
  return this._waitForVaultInitiatedCheckoutDependencies().then(
    function () {
      this._frameService.focus();
    }.bind(this)
  );
};

PayPalCheckout.prototype._createFrameServiceCallback = function (
  frameCommunicationPromise
) {
  var self = this;

  // TODO when a merchant integrates an iOS or Android integration
  // with a webview using the web SDK, we will have to add popupbridge
  // support
  return function (err, payload) {
    if (err) {
      frameCommunicationPromise.reject(err);
    } else if (payload) {
      self._frameService.redirect(self._loadingFrameUrl);
      self
        .tokenizePayment({
          paymentToken: payload.token,
          payerID: payload.PayerID,
          paymentID: payload.paymentId,
        })
        .then(function (res) {
          frameCommunicationPromise.resolve(res);
        })
        .catch(function (tokenizationError) {
          frameCommunicationPromise.reject(tokenizationError);
        });
    }
  };
};

PayPalCheckout.prototype._waitForVaultInitiatedCheckoutDependencies =
  function () {
    var self = this;

    return this._clientPromise.then(function () {
      return self._frameServicePromise;
    });
  };

PayPalCheckout.prototype._constructVaultCheckutUrl = function (frameName) {
  var serviceId = this._frameService._serviceId;

  return (
    this._assetsUrl +
    "/html/" +
    frameName +
    useMin(this._isDebug) +
    ".html?channel=" +
    serviceId
  );
};

/**
 * Tokenizes the authorize data from the PayPal JS SDK when completing a buyer approval flow.
 * When a {@link callback} is defined, invokes the callback with {@link PayPalCheckout~tokenizePayload|tokenizePayload} and returns undefined. Otherwise, returns a Promise that resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @public
 * @param {object} tokenizeOptions Tokens and IDs required to tokenize the payment.
 * @param {string} tokenizeOptions.payerId Payer ID returned by PayPal `onApproved` callback.
 * @param {string} [tokenizeOptions.paymentId] Payment ID returned by PayPal `onApproved` callback.
 * @param {string} [tokenizeOptions.billingToken] Billing Token returned by PayPal `onApproved` callback.
 * @param {boolean} [tokenizeOptions.vault=true] Whether or not to vault the resulting PayPal account (if using a client token generated with a customer id and the vault flow).
 * @param {callback} [callback] The second argument, <code>payload</code>, is a {@link PayPalCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, the promise resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @example <caption>Opt out of auto-vaulting behavior</caption>
 * // create the paypalCheckoutInstance with a client token generated with a customer id
 * paypal.Buttons({
 *   createBillingAgreement: function () {
 *     return paypalCheckoutInstance.createPayment({
 *       flow: 'vault'
 *       // your other createPayment options here
 *     });
 *   },
 *   onApproved: function (data) {
 *     data.vault = false;
 *
 *     return paypalCheckoutInstance.tokenizePayment(data);
 *   },
 *   // Add other options, e.g. onCancel, onError
 * }).render('#paypal-button');
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.tokenizePayment = function (tokenizeOptions) {
  var self = this;
  var shouldVault = true;
  var payload;
  var options = {
    flow:
      tokenizeOptions.billingToken && !tokenizeOptions.paymentID
        ? "vault"
        : "checkout",
    intent: tokenizeOptions.intent || this.intentFromCreatePayment,
  };
  var params = {
    // The paymentToken provided by the PayPal JS SDK is the EC Token
    ecToken: tokenizeOptions.paymentToken,
    billingToken: tokenizeOptions.billingToken,
    payerId: tokenizeOptions.payerID,
    paymentId: tokenizeOptions.paymentID,
    shippingOptionsId: tokenizeOptions.shippingOptionsId,
  };

  if (tokenizeOptions.hasOwnProperty("vault")) {
    shouldVault = tokenizeOptions.vault;
  }

  options.vault = shouldVault;

  analytics.sendEvent(
    this._clientPromise,
    "paypal-checkout.tokenization.started"
  );

  return this._clientPromise
    .then(function (client) {
      return client.request({
        endpoint: "payment_methods/paypal_accounts",
        method: "post",
        data: self._formatTokenizeData(options, params),
      });
    })
    .then(function (response) {
      payload = self._formatTokenizePayload(response);

      analytics.sendEvent(
        self._clientPromise,
        "paypal-checkout.tokenization.success"
      );
      if (payload.creditFinancingOffered) {
        analytics.sendEvent(
          self._clientPromise,
          "paypal-checkout.credit.accepted"
        );
      }

      return payload;
    })
    .catch(function (err) {
      if (self._setupError) {
        return Promise.reject(self._setupError);
      }

      analytics.sendEvent(
        self._clientPromise,
        "paypal-checkout.tokenization.failed"
      );

      return Promise.reject(
        convertToBraintreeError(err, {
          type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
          code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
          message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message,
        })
      );
    });
};

/**
 * Resolves with the PayPal client id to be used when loading the PayPal SDK.
 * @public
 * @param {callback} [callback] The second argument, <code>id</code>, is a the PayPal client id. If no callback is provided, the promise resolves with the PayPal client id.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * paypalCheckoutInstance.getClientId().then(function (id) {
 *  var script = document.createElement('script');
 *
 *  script.src = 'https://www.paypal.com/sdk/js?client-id=' + id;
 *  script.onload = function () {
 *    // setup the PayPal SDK
 *  };
 *
 *  document.body.appendChild(script);
 * });
 */
PayPalCheckout.prototype.getClientId = function () {
  return this._clientPromise.then(function (client) {
    return client.getConfiguration().gatewayConfiguration.paypal.clientId;
  });
};

/**
 * Resolves when the PayPal SDK has been successfully loaded onto the page.
 * @public
 * @param {object} [options] A configuration object to modify the query params and data-attributes on the PayPal SDK. A subset of the parameters are listed below. For a full list of query params, see the [PayPal docs](https://developer.paypal.com/docs/checkout/reference/customize-sdk/?mark=query#query-parameters).
 * @param {string} [options.client-id] By default, this will be the client id associated with the authorization used to create the Braintree component. When used in conjunction with passing `authorization` when creating the PayPal Checkout component, you can speed up the loading of the PayPal SDK.
 * @param {string} [options.intent="authorize"] By default, the PayPal SDK defaults to an intent of `capture`. Since the default intent when calling {@link PayPalCheckout#createPayment|`createPayment`} is `authorize`, the PayPal SDK will be loaded with `intent=authorize`. If you wish to use a different intent when calling {@link PayPalCheckout#createPayment|`createPayment`}, make sure it matches here. If `sale` is used, it will be converted to `capture` for the PayPal SDK. If the `vault: true` param is used, `tokenize` will be passed as the default intent.
 * @param {string} [options.locale=en_US] Use this option to change the language, links, and terminology used in the PayPal flow. This locale will be used unless the buyer has set a preferred locale for their account. If an unsupported locale is supplied, a fallback locale (determined by buyer preference or browser data) will be used and no error will be thrown.
 *
 * Supported locales are:
 * `da_DK`,
 * `de_DE`,
 * `en_AU`,
 * `en_GB`,
 * `en_US`,
 * `es_ES`,
 * `fr_CA`,
 * `fr_FR`,
 * `id_ID`,
 * `it_IT`,
 * `ja_JP`,
 * `ko_KR`,
 * `nl_NL`,
 * `no_NO`,
 * `pl_PL`,
 * `pt_BR`,
 * `pt_PT`,
 * `ru_RU`,
 * `sv_SE`,
 * `th_TH`,
 * `zh_CN`,
 * `zh_HK`,
 * and `zh_TW`.
 *
 * @param {string} [options.currency="USD"] If a currency is passed in {@link PayPalCheckout#createPayment|`createPayment`}, it must match the currency passed here.
 * @param {boolean} [options.vault] Must be `true` when using `flow: vault` in {@link PayPalCheckout#createPayment|`createPayment`}.
 * @param {string} [options.components=buttons] By default, the Braintree SDK will only load the PayPal smart buttons component. If you would like to load just the [messages component](https://developer.paypal.com/docs/business/checkout/add-capabilities/credit-messaging/), pass `messages`. If you would like to load both, pass `buttons,messages`
 * @param {object} [options.dataAttributes] The data attributes to apply to the script. Any data attribute can be passed. A subset of the parameters are listed below. For a full list of data attributes, see the [PayPal docs](https://developer.paypal.com/docs/checkout/reference/customize-sdk/#script-parameters).
 * @param {string} [options.dataAttributes.client-token] The client token to use in the script. (usually not needed)
 * @param {string} [options.dataAttributes.csp-nonce] See the [PayPal docs about content security nonces](https://developer.paypal.com/docs/checkout/reference/customize-sdk/#csp-nonce).
 * @param {callback} [callback] Called when the PayPal SDK has been loaded onto the page. The second argument is the PayPal Checkout instance. If no callback is provided, the promise resolves with the PayPal Checkout instance when the PayPal SDK has been loaded onto the page.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example <caption>Without options</caption>
 * paypalCheckoutInstance.loadPayPalSDK().then(function () {
 *   // window.paypal.Buttons is now available to use
 * });
 * @example <caption>With options</caption>
 * paypalCheckoutInstance.loadPayPalSDK({
 *   'client-id': 'PayPal Client Id', // Can speed up rendering time to hardcode this value
 *
 *   intent: 'capture', // Make sure this value matches the value in createPayment
 *   currency: 'USD', // Make sure this value matches the value in createPayment
 * }).then(function () {
 *   // window.paypal.Buttons is now available to use
 * });
 * @example <caption>With Vaulting</caption>
 * paypalCheckoutInstance.loadPayPalSDK({
 *   vault: true
 * }).then(function () {
 *   // window.paypal.Buttons is now available to use
 * });
 */
PayPalCheckout.prototype.loadPayPalSDK = function (options) {
  var idPromise, src;
  var loadPromise = new ExtendedPromise();
  var dataAttributes = (options && options.dataAttributes) || {};
  var userIdToken =
    dataAttributes["user-id-token"] || dataAttributes["data-user-id-token"];

  if (!userIdToken) {
    userIdToken =
      this._authorizationInformation.fingerprint &&
      this._authorizationInformation.fingerprint.split("?")[0];
  }

  this._paypalScript = document.createElement("script");

  // NEXT_MAJOR_VERSION
  // this options object should have 2 properties:
  // * queryParams
  // * dataAttributes
  // should make organizing this better than squashing
  // all the query params at the top level and extracting
  // the data attributes
  options = assign(
    {},
    {
      components: "buttons",
    },
    options
  );
  delete options.dataAttributes;

  // NEXT_MAJOR_VERSION if merchant passes an explicit intent,
  // currency, amount, etc, save those for use in createPayment
  // if no explicit param of that type is passed in when calling
  // createPayment to reduce the number of items that need to be
  // duplicated here and in createPayment
  if (options.vault) {
    options.intent = options.intent || "tokenize";
  } else {
    options.intent = options.intent || "authorize";
    options.currency = options.currency || "USD";
  }

  src = "https://www.paypal.com/sdk/js?";
  this._paypalScript.onload = function () {
    loadPromise.resolve();
  };

  Object.keys(dataAttributes).forEach(
    function (attribute) {
      this._paypalScript.setAttribute(
        "data-" + attribute.replace(/^data\-/, ""),
        dataAttributes[attribute]
      );
    }.bind(this)
  );

  if (options["client-id"]) {
    idPromise = Promise.resolve(options["client-id"]);
  } else {
    idPromise = this.getClientId();
  }

  idPromise.then(
    function (id) {
      options["client-id"] = id;

      if (this._autoSetDataUserIdToken && userIdToken) {
        this._paypalScript.setAttribute("data-user-id-token", userIdToken);

        // preloading improves the rendering time of the PayPal button
        this._attachPreloadPixel({
          id: id,
          userIdToken: userIdToken,
          amount: dataAttributes.amount,
          currency: options.currency,
          merchantId: options["merchant-id"],
        });
      }

      this._paypalScript.src = querystring.queryify(src, options);
      document.head.insertBefore(
        this._paypalScript,
        document.head.firstElementChild
      );
    }.bind(this)
  );

  return loadPromise.then(
    function () {
      return this;
    }.bind(this)
  );
};

PayPalCheckout.prototype._attachPreloadPixel = function (options) {
  var request;
  var id = options.id;
  var userIdToken = options.userIdToken;
  var env = this._authorizationInformation.environment;
  var subdomain = env === "production" ? "" : "sandbox.";
  var url = PAYPAL_SDK_PRELOAD_URL.replace("{ENV}", subdomain);
  var preloadOptions = {
    "client-id": id,
    "user-id-token": userIdToken,
  };

  if (options.amount) {
    preloadOptions.amount = options.amount;
  }
  if (options.currency) {
    preloadOptions.currency = options.currency;
  }
  if (options.merchantId) {
    preloadOptions["merchant-id"] = options.merchantId;
  }

  request = new XMLHttpRequest();
  request.open("GET", querystring.queryify(url, preloadOptions));
  request.send();
};

PayPalCheckout.prototype._formatPaymentResourceData = function (
  options,
  config
) {
  var key;
  var gatewayConfiguration = this._configuration.gatewayConfiguration;
  // NEXT_MAJOR_VERSION default value for intent in PayPal SDK is capture
  // but our integrations default value is authorize. Default this to capture
  // in the next major version.
  var intent = options.intent;
  var paymentResource = {
    // returnUrl and cancelUrl are required in hermes create_payment_resource route
    // but are not used by the PayPal sdk, except to redirect to an error page
    returnUrl: config.returnUrl || "https://www.paypal.com/checkoutnow/error",
    cancelUrl: config.cancelUrl || "https://www.paypal.com/checkoutnow/error",
    offerPaypalCredit: options.offerCredit === true,
    merchantAccountId: this._merchantAccountId,
    experienceProfile: {
      brandName: options.displayName || gatewayConfiguration.paypal.displayName,
      localeCode: options.locale,
      noShipping: (!options.enableShippingAddress).toString(),
      addressOverride: options.shippingAddressEditable === false,
      landingPageType: options.landingPageType,
    },
    shippingOptions: options.shippingOptions,
  };

  if (options.flow === "checkout") {
    paymentResource.amount = options.amount;
    paymentResource.currencyIsoCode = options.currency;
    paymentResource.requestBillingAgreement = options.requestBillingAgreement;

    if (intent) {
      // 'sale' has been changed to 'capture' in PayPal's backend, but
      // we use an old version with 'sale'. We provide capture as an alias
      // to match the PayPal SDK
      if (intent === "capture") {
        intent = "sale";
      }
      paymentResource.intent = intent;
    }

    if (options.hasOwnProperty("lineItems")) {
      paymentResource.lineItems = options.lineItems;
    }

    if (options.hasOwnProperty("vaultInitiatedCheckoutPaymentMethodToken")) {
      paymentResource.vaultInitiatedCheckoutPaymentMethodToken =
        options.vaultInitiatedCheckoutPaymentMethodToken;
    }

    if (options.hasOwnProperty("shippingOptions")) {
      paymentResource.shippingOptions = options.shippingOptions;
    }

    for (key in options.shippingAddressOverride) {
      if (options.shippingAddressOverride.hasOwnProperty(key)) {
        paymentResource[key] = options.shippingAddressOverride[key];
      }
    }

    if (options.hasOwnProperty("billingAgreementDetails")) {
      paymentResource.billingAgreementDetails = options.billingAgreementDetails;
    }
  } else {
    paymentResource.shippingAddress = options.shippingAddressOverride;

    if (options.billingAgreementDescription) {
      paymentResource.description = options.billingAgreementDescription;
    }
  }

  // this needs to be set outside of the block where add it to the
  // payment request so that a follow up tokenization call can use it,
  // but if a second create payment resource call is made without
  // the correlation id, we want to reset it to undefined so that the
  // tokenization call does not use a stale correlation id
  this._riskCorrelationId = options.riskCorrelationId;
  if (options.riskCorrelationId) {
    paymentResource.correlationId = this._riskCorrelationId;
  }

  return paymentResource;
};

/**
 * @ignore
 * @static
 * @function _verifyConsistentCurrency
 * Verifies that `options.currency` and the currencies for each `shippingOption` the same.
 * @param {object} options `options` provided for `updatePayment`.
 * @returns {boolean} true is currencies match (or no shipping options); false if currencies do not match.
 */

PayPalCheckout.prototype._verifyConsistentCurrency = function (options) {
  if (
    options.currency &&
    options.hasOwnProperty("shippingOptions") &&
    Array.isArray(options.shippingOptions)
  ) {
    return options.shippingOptions.every(function (item) {
      return (
        item.amount &&
        item.amount.currency &&
        options.currency.toLowerCase() === item.amount.currency.toLowerCase()
      );
    });
  }

  return true;
};

/**
 * @ignore
 * @static
 * @function _hasMissingOption
 * @param {object} options All options provided for intiating the PayPal flow.
 * @param {array} required A list of required inputs that must be include as part of the options.
 * @returns {boolean} Returns a boolean.
 */

PayPalCheckout.prototype._hasMissingOption = function (options, required) {
  var i, option;

  required = required || [];

  if (
    !options.hasOwnProperty("amount") &&
    !options.hasOwnProperty("lineItems")
  ) {
    return true;
  }

  for (i = 0; i < required.length; i++) {
    option = required[i];

    if (!options.hasOwnProperty(option)) {
      return true;
    }
  }

  return false;
};

PayPalCheckout.prototype._formatUpdatePaymentData = function (options) {
  var self = this;
  var paymentResource = {
    merchantAccountId: this._merchantAccountId,
    paymentId: options.paymentId,
    currencyIsoCode: options.currency,
  };

  if (options.hasOwnProperty("amount")) {
    paymentResource.amount = options.amount;
  }

  if (options.hasOwnProperty("lineItems")) {
    paymentResource.lineItems = options.lineItems;
  }

  if (options.hasOwnProperty("shippingOptions")) {
    paymentResource.shippingOptions = options.shippingOptions;
  }

  /* shippingAddress not supported yet */
  if (options.hasOwnProperty("shippingAddress")) {
    analytics.sendEvent(
      self._clientPromise,
      "paypal-checkout.updatePayment.shippingAddress.provided.by-the-merchant"
    );

    paymentResource.line1 = options.shippingAddress.line1;

    if (options.shippingAddress.hasOwnProperty("line2")) {
      paymentResource.line2 = options.shippingAddress.line2;
    }

    paymentResource.city = options.shippingAddress.city;
    paymentResource.state = options.shippingAddress.state;
    paymentResource.postalCode = options.shippingAddress.postalCode;
    paymentResource.countryCode = options.shippingAddress.countryCode;

    if (options.shippingAddress.hasOwnProperty("phone")) {
      paymentResource.phone = options.shippingAddress.phone;
    }

    if (options.shippingAddress.hasOwnProperty("recipientName")) {
      paymentResource.recipientName = options.shippingAddress.recipientName;
    }
  }

  return paymentResource;
};

PayPalCheckout.prototype._formatTokenizeData = function (options, params) {
  var clientConfiguration = this._configuration;
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var isTokenizationKey =
    clientConfiguration.authorizationType === "TOKENIZATION_KEY";
  var isVaultFlow = options.flow === "vault";
  var correlationId =
    this._riskCorrelationId || params.billingToken || params.ecToken;
  var data = {
    paypalAccount: {
      correlationId: correlationId,
      options: {
        validate: isVaultFlow && !isTokenizationKey && options.vault,
      },
    },
  };

  if (isVaultFlow) {
    data.paypalAccount.billingAgreementToken = params.billingToken;
  } else {
    data.paypalAccount.paymentToken = params.paymentId;
    data.paypalAccount.payerId = params.payerId;
    data.paypalAccount.unilateral =
      gatewayConfiguration.paypal.unvettedMerchant;

    if (options.intent) {
      data.paypalAccount.intent = options.intent;
    }
  }

  if (this._merchantAccountId) {
    data.merchantAccountId = this._merchantAccountId;
  }

  return data;
};

PayPalCheckout.prototype._formatTokenizePayload = function (response) {
  var payload;
  var account = {};

  if (response.paypalAccounts) {
    account = response.paypalAccounts[0];
  }

  payload = {
    nonce: account.nonce,
    details: {},
    type: account.type,
  };

  if (account.details && account.details.payerInfo) {
    payload.details = account.details.payerInfo;
  }

  if (account.details && account.details.creditFinancingOffered) {
    payload.creditFinancingOffered = account.details.creditFinancingOffered;
  }

  if (account.details && account.details.shippingOptionId) {
    payload.shippingOptionId = account.details.shippingOptionId;
  }

  if (account.details && account.details.cobrandedCardLabel) {
    payload.cobrandedCardLabel = account.details.cobrandedCardLabel;
  }

  return payload;
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/paypal-checkout.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * paypalCheckoutInstance.teardown();
 * @example <caption>With callback</caption>
 * paypalCheckoutInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.teardown = function () {
  var self = this;

  convertMethodsToError(this, methods(PayPalCheckout.prototype));

  if (this._paypalScript && this._paypalScript.parentNode) {
    this._paypalScript.parentNode.removeChild(this._paypalScript);
  }

  return this._frameServicePromise
    .catch(function () {
      // no need to error in teardown for an error setting up the frame service
    })
    .then(function () {
      if (!self._frameService) {
        return Promise.resolve();
      }

      return self._frameService.teardown();
    });
};

module.exports = wrapPromise.wrapPrototype(PayPalCheckout);

},{"../lib/analytics":47,"../lib/assign":49,"../lib/braintree-error":51,"../lib/constants":52,"../lib/convert-methods-to-error":53,"../lib/convert-to-braintree-error":54,"../lib/create-assets-url":55,"../lib/create-authorization-data":56,"../lib/create-deferred-client":57,"../lib/frame-service/external":61,"../lib/methods":72,"../lib/querystring":73,"../lib/use-min":74,"../paypal/shared/constants":79,"./errors":76,"@braintree/extended-promise":20,"@braintree/wrap-promise":29}],79:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  LANDING_FRAME_NAME: "braintreepaypallanding",
  FLOW_ENDPOINTS: {
    checkout: "create_payment_resource",
    vault: "setup_billing_agreement",
  },
  REQUIRED_OPTIONS: ["paymentId", "currency"],
};

},{}]},{},[77])(77)
});
