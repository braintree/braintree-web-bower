(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).localPayment = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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
var VERSION = "3.95.0";

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

var VERSION = "3.95.0";
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

var VERSION = "3.95.0";

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

module.exports = {
  REQUIRED_OPTIONS_FOR_START_PAYMENT: [
    "givenName",
    "surname",
    "currencyCode",
    "onPaymentStart",
    "paymentType",
    "amount",
    "fallback",
  ],
  REQUIRED_OPTIONS_FOR_DEFERRED_PAYMENT_TYPE: [
    "givenName",
    "surname",
    "currencyCode",
    "onPaymentStart",
    "paymentType",
    "amount",
    "address",
    "billingAddress",
    "birthDate",
    "email",
    "locale",
    "customerServiceInstructions",
    "correlationId",
    "phone",
    "phoneCountryCode",
    "lineItems",
  ],
  REQUIRED_OPTIONS_FOR_ADDRESS: [
    "streetAddress",
    "locality",
    "postalCode",
    "countryCode",
  ],
  REQUIRED_OPTIONS_FOR_LINE_ITEMS: [
    "category",
    "name",
    "quantity",
    "unitAmount",
    "unitTaxAmount",
  ],
  DEFERRED_PAYMENT_TYPES: ["pay_upon_invoice"],
};

},{}],77:[function(_dereq_,module,exports){
"use strict";

var frameService = _dereq_("../../lib/frame-service/external");
var BraintreeError = _dereq_("../../lib/braintree-error");
var useMin = _dereq_("../../lib/use-min");
var VERSION = "3.95.0";
var INTEGRATION_TIMEOUT_MS =
  _dereq_("../../lib/constants").INTEGRATION_TIMEOUT_MS;
var analytics = _dereq_("../../lib/analytics");
var methods = _dereq_("../../lib/methods");
var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
var convertToBraintreeError = _dereq_("../../lib/convert-to-braintree-error");
var ExtendedPromise = _dereq_("@braintree/extended-promise");
var querystring = _dereq_("../../lib/querystring");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var constants = _dereq_("./constants");
var errors = _dereq_("../shared/errors");

var DEFAULT_WINDOW_WIDTH = 1282;
var DEFAULT_WINDOW_HEIGHT = 720;

ExtendedPromise.suppressUnhandledPromiseMessage = true;

/**
 * @class
 * @param {object} options see {@link module:braintree-web/local-payment.create|local-payment.create}
 * @classdesc This class represents a LocalPayment component. Instances of this class can open a LocalPayment window for paying with alternate payments local to a specific country. Any additional UI, such as disabling the page while authentication is taking place, is up to the developer.
 *
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/local-payment.create|braintree-web.local-payment.create} instead.</strong>
 */
function LocalPayment(options) {
  this._client = options.client;
  this._assetsUrl =
    options.client.getConfiguration().gatewayConfiguration.assetsUrl +
    "/web/" +
    VERSION;
  this._isDebug = options.client.getConfiguration().isDebug;
  this._loadingFrameUrl =
    this._assetsUrl +
    "/html/local-payment-landing-frame" +
    useMin(this._isDebug) +
    ".html";
  this._authorizationInProgress = false;
  this._paymentType = "unknown";
  this._merchantAccountId = options.merchantAccountId;
}

LocalPayment.prototype._initialize = function () {
  var self = this;
  var client = this._client;
  var failureTimeout = setTimeout(function () {
    analytics.sendEvent(client, "local-payment.load.timed-out");
  }, INTEGRATION_TIMEOUT_MS);

  return new Promise(function (resolve) {
    frameService.create(
      {
        name: "localpaymentlandingpage",
        dispatchFrameUrl:
          self._assetsUrl +
          "/html/dispatch-frame" +
          useMin(self._isDebug) +
          ".html",
        openFrameUrl: self._loadingFrameUrl,
      },
      function (service) {
        self._frameService = service;
        clearTimeout(failureTimeout);
        analytics.sendEvent(client, "local-payment.load.succeeded");
        resolve(self);
      }
    );
  });
};

/**
 * Options used for most local payment types.
 * @typedef {object} LocalPayment~StartPaymentOptions
 * @property {object} fallback Configuration for what to do when app switching back from a Bank app on a mobile device.
 * @property {string} fallback.buttonText The text to display in a button to redirect back to the merchant page.
 * @property {string} fallback.url The url to redirect to when the redirect button is pressed. Query params will be added to the url to process the data returned from the bank.
 * @property {string} fallback.cancelButtonText The text to display in a button to redirect back to the merchant page when the customer cancels. If no `cancelButtonText` is provided, `buttonText` will be used.
 * @property {string} fallback.cancelUrl The url to redirect to when the redirect button is pressed when the customer cancels. Query params will be added to the url to check the state of the payment. If no `cancelUrl` is provided, `url` will be used.
 * @property {object} [windowOptions] The options for configuring the window that is opened when starting the payment.
 * @property {number} [windowOptions.width=1282] The width in pixels of the window opened when starting the payment. The default width size is this large to allow various banking partner landing pages to display the QR Code to be scanned by the bank's mobile app. Many will not display the QR code when the window size is smaller than a standard desktop screen.
 * @property {number} [windowOptions.height=720] The height in pixels of the window opened when starting the payment.
 * @property {string} amount The amount to authorize for the transaction.
 * @property {string} currencyCode The currency to process the payment.
 * @property {string} [displayName] The merchant name displayed inside of the window that is opened when starting the payment.
 * @property {string} paymentType The type of local payment.
 * @property {string} paymentTypeCountryCode The country code of the local payment. This value must be one of the supported country codes for a given local payment type listed {@link https://developer.paypal.com/braintree/docs/guides/local-payment-methods/client-side-custom/javascript/v3#render-local-payment-method-buttons|here}. For local payments supported in multiple countries, this value may determine which banks are presented to the customer.
 * @property {string} email Payer email of the customer.
 * @property {string} givenName First name of the customer.
 * @property {string} surname Last name of the customer.
 * @property {string} phone Phone number of the customer.
 * @property {string} bic Bank Identification Code of the customer (specific to iDEAL transactions).
 * @property {boolean} shippingAddressRequired Indicates whether or not the payment needs to be shipped. For digital goods, this should be false. Defaults to false.
 * @property {object} address The shipping address.
 * @property {string} address.streetAddress Line 1 of the Address (eg. number, street, etc). An error will occur if this address is not valid.
 * @property {string} address.extendedAddress Line 2 of the Address (eg. suite, apt #, etc.). An error will occur if this address is not valid.
 * @property {string} address.locality Customer's city.
 * @property {string} address.region Customer's region or state.
 * @property {string} address.postalCode Customer's postal code.
 * @property {string} address.countryCode Customer's country code.
 * @property {function} onPaymentStart A function that will be called with two parameters: an object containing the  `paymentId` and a `continueCallback` that must be called to launch the flow. You can use method to do any preprocessing on your server before the flow begins..
 */

/**
 * Options used for the Pay Upon Invoice local payment type.
 * @typedef {object} LocalPayment~StartPaymentPayUponInvoiceOptions
 * @property {string} amount The amount to authorize for the transaction.
 * @property {string} currencyCode The currency to process the payment.
 * @property {string} [displayName] The merchant name displayed inside of the window that is opened when starting the payment.
 * @property {string} paymentType The type of local payment. Must be `pay_upon_invoice`.
 * @property {string} [paymentTypeCountryCode] The country code of the local payment. This value must be one of the supported country codes for a given local payment type listed {@link https://developer.paypal.com/braintree/docs/guides/local-payment-methods/client-side-custom/javascript/v3#render-local-payment-method-buttons|here}. For local payments supported in multiple countries, this value may determine which banks are presented to the customer.
 * @property {string} email Payer email of the customer.
 * @property {string} givenName First name of the customer.
 * @property {string} surname Last name of the customer.
 * @property {string} phone Phone number of the customer.
 * @property {string} phoneCountryCode The country calling code.
 * @property {string} birthDate The birth date of the customer in `YYYY-MM-DD` format.
 * @property {object} address The shipping address.
 * @property {string} address.streetAddress Line 1 of the Address (eg. number, street, etc). An error will occur if this address is not valid.
 * @property {string} [address.extendedAddress] Line 2 of the Address (eg. suite, apt #, etc.). An error will occur if this address is not valid.
 * @property {string} address.locality Customer's city.
 * @property {string} [address.region] Customer's region or state.
 * @property {string} address.postalCode Customer's postal code.
 * @property {string} address.countryCode Customer's country code.
 * @property {string} [shippingAmount] The shipping fee for all items. This value can not be a negative number.
 * @property {string} [discountAmount] The discount for all items. This value can not be a negative number.
 * @property {object} billingAddress The billing address.
 * @property {string} billingAddress.streetAddress Line 1 of the Address (eg. number, street, etc). An error will occur if this address is not valid.
 * @property {string} [billingAddress.extendedAddress] Line 2 of the Address (eg. suite, apt #, etc.). An error will occur if this address is not valid.
 * @property {string} billingAddress.locality Customer's city.
 * @property {string} [billingAddress.region] Customer's region or state.
 * @property {string} billingAddress.postalCode Customer's postal code.
 * @property {string} billingAddress.countryCode Customer's country code.
 * @property {object[]} lineItems List of line items.
 * @property {string} lineItems.category The item category type: `'DIGITAL_GOODS'`, `'PHYSICAL_GOODS'`, or `'DONATION'`.
 * @property {string} lineItems.name Item name. Maximum 127 characters.
 * @property {string} lineItems.quantity Number of units of the item purchased. This value must be a whole number and can't be negative or zero.
 * @property {string} lineItems.unitAmount Per-unit price of the item. Can include up to 2 decimal places. This value can't be negative or zero.
 * @property {string} lineItems.unitTaxAmount Per-unit tax price of the item. Can include up to 2 decimal places. This value can't be negative.
 * @property {string} locale The BCP 47-formatted locale. PayPal supports a five-character code. For example, `en-DE`, `da-DK`, `he-IL`, `id-ID`, `ja-JP`, `no-NO`, `pt-BR`, `ru-RU`, `sv-SE`, `th-TH`, `zh-CN`, `zh-HK`, or `zh-TW`.
 * @property {string} customerServiceInstructions Instructions for how to contact the merchant's customer service. Maximum 4,000 characters.
 * @property {string} correlationId Used to correlate user sessions with server transactions.
 * @property {function} onPaymentStart A function that will be called with an object containing the `paymentId`. The `continueCallback` is not provided as it is not needed for this use case.
 */

/**
 * Launches the local payment flow and returns a nonce payload. Only one local payment flow should be active at a time. One way to achieve this is to disable your local payment button while the flow is open.
 * @public
 * @function
 * @param {LocalPayment~StartPaymentOptions|LocalPayment~StartPaymentPayUponInvoiceOptions} options Options for initiating the local payment payment flow.
 * @param {callback} callback The second argument, <code>data</code>, is a {@link LocalPayment~startPaymentPayload|startPaymentPayload}. If no callback is provided, the method will return a Promise that resolves with a {@link LocalPayment~startPaymentPayload|startPaymentPayload}.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * localPaymentInstance.startPayment({
 *   paymentType: 'ideal',
 *   paymentTypeCountryCode: 'NL',
 *   fallback: {
 *     buttonText: 'Return to Merchant',
 *     url: 'https://example.com/my-checkout-page'
 *   },
 *   amount: '10.00',
 *   currencyCode: 'EUR',
 *   givenName: 'Joe',
 *   surname: 'Doe',
 *   address: {
 *     countryCode: 'NL'
 *   },
 *   onPaymentStart: function (data, continueCallback) {
 *     // Do any preprocessing before starting the flow
 *     // data.paymentId is the ID of the localPayment
 *     continueCallback();
 *   }
 * }).then(function (payload) {
 *   // Submit payload.nonce to your server
 * }).catch(function (startPaymentError) {
 *   // Handle flow errors or premature flow closure
 *   console.error('Error!', startPaymentError);
 * });
 * @example <caption>Pay Upon Invoice</caption>
 * localPaymentInstance.startPayment({
 *   paymentType: 'pay_upon_invoice',
 *   amount: '100.00',
 *   currencyCode: 'EUR',
 *   givenName: 'Max',
 *   surname: 'Mustermann',
 *   address: { // This is used as the shipping address.
 *     streetAddress: 'Taunusanlage 12',
 *     locality: 'Frankfurt',
 *     postalCode: '60325',
 *     countryCode: 'DE',
 *   },
 *   billingAddress: {
 *     streetAddress: 'Schönhauser Allee 84',
 *     locality: 'Berlin',
 *     postalCode: '10439',
 *     countryCode: 'DE'
 *   },
 *   birthDate: '1990-01-01',
 *   email: 'buyer@example.com',
 *   locale: 'en-DE',
 *   customerServiceInstructions: 'Customer service phone is +49 6912345678.',
 *   lineItems: [{
 *     category: 'PHYSICAL_GOODS',
 *     name: 'Basketball Shoes',
 *     quantity: '1',
 *     unitAmount: '81.00',
 *     unitTaxAmount: '19.00',
 *   }],
 *   phone: '6912345678',
 *   phoneCountryCode: '49',
 *   correlationId: correlationId,
 *   onPaymentStart: function (data) {
 *     // NOTE: It is critical here to store data.paymentId on your server
 *     //       so it can be mapped to a webhook sent by Braintree once the
 *     //       buyer completes their payment.
 *     console.log('Payment ID:', data.paymentId);
 *   },
 * }).catch(function (err) {
 *   // Handle any error calling startPayment.
 *   console.error(err);
 * });
 */
LocalPayment.prototype.startPayment = function (options) {
  var missingOption,
    missingError,
    address,
    fallback,
    params,
    promise,
    billingAddress,
    windowOptions;
  var self = this; // eslint-disable-line no-invalid-this
  var serviceId = this._frameService._serviceId; // eslint-disable-line no-invalid-this

  // In order to provide the merchant with appropriate error messaging,
  // more robust validation is being done on the client-side, since some
  // option names are mapped to legacy names for the sake of the API.
  // For example, if `billingAddress.streetAddress` was missing, then
  // the API error response would say that `billing_address.line1` was
  // missing. This client-side validation will correctly tell the
  // merchant that `billingAddress.streetAddress` was missing.
  missingOption = hasMissingOption(options);
  if (missingOption) {
    missingError = new BraintreeError(
      errors.LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION
    );
    if (typeof missingOption === "string") {
      missingError.details = "Missing required '" + missingOption + "' option.";
    }

    return Promise.reject(missingError);
  }
  windowOptions = options.windowOptions || {};
  address = options.address || {};
  fallback = options.fallback || {};
  billingAddress = options.billingAddress || {};
  params = {
    intent: "sale",
    returnUrl: querystring.queryify(
      self._assetsUrl +
        "/html/local-payment-redirect-frame" +
        useMin(self._isDebug) +
        ".html",
      {
        channel: serviceId,
        r: fallback.url,
        t: fallback.buttonText,
      }
    ),
    cancelUrl: querystring.queryify(
      self._assetsUrl +
        "/html/local-payment-redirect-frame" +
        useMin(self._isDebug) +
        ".html",
      {
        channel: serviceId,
        r: fallback.cancelUrl || fallback.url,
        t: fallback.cancelButtonText || fallback.buttonText,
        c: 1, // indicating we went through the cancel flow
      }
    ),
    experienceProfile: {
      brandName: options.displayName,
      noShipping: !options.shippingAddressRequired,
      locale: options.locale,
      customerServiceInstructions: options.customerServiceInstructions,
    },
    fundingSource: options.paymentType,
    paymentTypeCountryCode: options.paymentTypeCountryCode,
    amount: options.amount,
    currencyIsoCode: options.currencyCode,
    firstName: options.givenName,
    lastName: options.surname,
    payerEmail: options.email,
    phone: options.phone,
    line1: address.streetAddress,
    line2: address.extendedAddress,
    city: address.locality,
    state: address.region,
    postalCode: address.postalCode,
    countryCode: address.countryCode,
    merchantAccountId: self._merchantAccountId,
    bic: options.bic,
    billingAddress: {
      line1: billingAddress.streetAddress,
      line2: billingAddress.extendedAddress,
      city: billingAddress.locality,
      state: billingAddress.region,
      postalCode: billingAddress.postalCode,
      countryCode: billingAddress.countryCode,
    },
    birthDate: options.birthDate,
    correlationId: options.correlationId,
    discountAmount: options.discountAmount,
    phoneCountryCode: options.phoneCountryCode,
    shippingAmount: options.shippingAmount,
    lineItems: options.lineItems,
  };

  self._paymentType = options.paymentType.toLowerCase();
  if (self._authorizationInProgress) {
    analytics.sendEvent(
      self._client,
      self._paymentType + ".local-payment.start-payment.error.already-opened"
    );

    return Promise.reject(
      new BraintreeError(errors.LOCAL_PAYMENT_ALREADY_IN_PROGRESS)
    );
  }

  self._authorizationInProgress = true;

  promise = new ExtendedPromise();

  // For deferred payment types, the popup window should not be opened,
  // since the actual payment will be done outside of this session.
  if (!isDeferredPaymentType(options.paymentType)) {
    self._startPaymentCallback = self._createStartPaymentCallback(
      function (val) {
        promise.resolve(val);
      },
      function (err) {
        promise.reject(err);
      }
    );

    self._frameService.open(
      {
        width: windowOptions.width || DEFAULT_WINDOW_WIDTH,
        height: windowOptions.height || DEFAULT_WINDOW_HEIGHT,
      },
      self._startPaymentCallback
    );
  }

  self._client
    .request({
      method: "post",
      endpoint: "local_payments/create",
      data: params,
    })
    .then(function (response) {
      analytics.sendEvent(
        self._client,
        self._paymentType + ".local-payment.start-payment.opened"
      );
      self._startPaymentOptions = options;
      if (isDeferredPaymentType(options.paymentType)) {
        options.onPaymentStart({
          paymentId: response.paymentResource.paymentToken,
        });
        self._authorizationInProgress = false;
        promise.resolve();
      } else {
        options.onPaymentStart(
          { paymentId: response.paymentResource.paymentToken },
          function () {
            self._frameService.redirect(response.paymentResource.redirectUrl);
          }
        );
      }
    })
    .catch(function (err) {
      var status = err.details && err.details.httpStatus;

      self._frameService.close();
      self._authorizationInProgress = false;

      if (status === 422) {
        promise.reject(
          new BraintreeError({
            type: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.type,
            code: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.code,
            message: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.message,
            details: {
              originalError: err,
            },
          })
        );

        return;
      }

      promise.reject(
        convertToBraintreeError(err, {
          type: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.type,
          code: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.code,
          message: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.message,
        })
      );
    });

  return promise;
};

/**
 * Manually tokenizes params for a local payment received from PayPal.When app switching back from a mobile application (such as a bank application for an iDEAL payment), the window may lose context with the parent page. In that case, a fallback url is used, and this method can be used to finish the flow.
 * @public
 * @function
 * @param {object} [params] All options for tokenizing local payment parameters. If no params are passed in, the params will be pulled off of the query string of the page.
 * @param {string} params.btLpToken The token representing the local payment. Aliased to `token` if `btLpToken` is not present.
 * @param {string} params.btLpPaymentId The payment id for the local payment. Aliased to `paymentId` if `btLpPaymentId` is not present.
 * @param {string} params.btLpPayerId The payer id for the local payment. Aliased to `PayerID` if `btLpPayerId` is not present.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link LocalPayment~startPaymentPayload|startPaymentPayload}. If no callback is provided, the method will return a Promise that resolves with a {@link LocalPayment~startPaymentPayload|startPaymentPayload}.
 * @example
 * localPaymentInstance.tokenize().then(function (payload) {
 *   // send payload.nonce to your server
 * }).catch(function (err) {
 *   // handle tokenization error
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
LocalPayment.prototype.tokenize = function (params) {
  var self = this;
  var client = this._client;

  params = params || querystring.parse();

  // iOS Safari parses query params by adding the params inside an object called: queryItems
  if (params.queryItems) {
    params = params.queryItems;
  }

  if (params.c || params.wasCanceled) {
    return Promise.reject(
      new BraintreeError({
        type: errors.LOCAL_PAYMENT_CANCELED.type,
        code: errors.LOCAL_PAYMENT_CANCELED.code,
        message: errors.LOCAL_PAYMENT_CANCELED.message,
        details: {
          originalError: {
            errorcode: params.errorcode,
            token: params.btLpToken,
          },
        },
      })
    );
  } else if (params.errorcode) {
    return Promise.reject(
      new BraintreeError({
        type: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.type,
        code: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.code,
        message: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.message,
        details: {
          originalError: {
            errorcode: params.errorcode,
            token: params.btLpToken,
          },
        },
      })
    );
  }

  return client
    .request({
      endpoint: "payment_methods/paypal_accounts",
      method: "post",
      data: this._formatTokenizeData(params),
    })
    .then(function (response) {
      var payload = self._formatTokenizePayload(response);

      if (window.popupBridge) {
        analytics.sendEvent(
          client,
          self._paymentType + ".local-payment.tokenization.success-popupbridge"
        );
      } else {
        analytics.sendEvent(
          client,
          self._paymentType + ".local-payment.tokenization.success"
        );
      }

      return payload;
    })
    .catch(function (err) {
      analytics.sendEvent(
        client,
        self._paymentType + ".local-payment.tokenization.failed"
      );

      return Promise.reject(
        convertToBraintreeError(err, {
          type: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.type,
          code: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.code,
          message: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.message,
        })
      );
    });
};

/**
 * Closes the LocalPayment window if it is open.
 * @public
 * @example
 * localPaymentInstance.closeWindow();
 * @returns {void}
 */
LocalPayment.prototype.closeWindow = function () {
  if (this._authoriztionInProgress) {
    analytics.sendEvent(
      this._client,
      this._paymentType + ".local-payment.start-payment.closed.by-merchant"
    );
  }
  this._frameService.close();
};

/**
 * Focuses the LocalPayment window if it is open.
 * @public
 * @example
 * localPaymentInstance.focusWindow();
 * @returns {void}
 */
LocalPayment.prototype.focusWindow = function () {
  this._frameService.focus();
};

LocalPayment.prototype._createStartPaymentCallback = function (
  resolve,
  reject
) {
  var self = this;
  var client = this._client;

  return function (err, params) {
    self._authorizationInProgress = false;
    if (err) {
      if (err.code === "FRAME_SERVICE_FRAME_CLOSED") {
        if (params && params.errorcode === "processing_error") {
          // something failed within the payment window (rather than when
          // tokenizing with Braintree)
          analytics.sendEvent(
            client,
            self._paymentType + ".local-payment.failed-in-window"
          );
          reject(new BraintreeError(errors.LOCAL_PAYMENT_START_PAYMENT_FAILED));

          return;
        }

        // its possible to have a query param with errorcode=payment_error, which
        // indicates that the customer cancelled the flow from within the UI,
        // but as there's no meaningful difference to the merchant whether the
        // customer closes via the UI or by manually closing the window, we
        // don't differentiate these
        analytics.sendEvent(
          client,
          self._paymentType + ".local-payment.tokenization.closed.by-user"
        );
        reject(new BraintreeError(errors.LOCAL_PAYMENT_WINDOW_CLOSED));
      } else if (
        err.code &&
        err.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1
      ) {
        reject(
          new BraintreeError({
            code: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.code,
            type: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.type,
            message: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.message,
            details: {
              originalError: err,
            },
          })
        );
      }
    } else if (params) {
      if (!window.popupBridge) {
        self._frameService.redirect(self._loadingFrameUrl);
      }

      self
        .tokenize(params)
        .then(resolve)
        .catch(reject)
        .then(function () {
          self._frameService.close();
        });
    }
  };
};

LocalPayment.prototype._formatTokenizePayload = function (response) {
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

  if (account.details) {
    if (account.details.payerInfo) {
      payload.details = account.details.payerInfo;
    }
    if (account.details.correlationId) {
      payload.correlationId = account.details.correlationId;
    }
  }

  return payload;
};

/**
 * Checks if required tokenization parameters are available in querystring for manual tokenization requests.
 * @public
 * @function
 * @example
 * // if query string contains
 * // ?btLpToken=token&btLpPaymentId=payment-id&btLpPayerId=payer-id
 * localPaymentInstance.hasTokenizationParams(); // true
 *
 * // if query string is missing required params
 * localPaymentInstance.hasTokenizationParams(); // false
 *
 * if (localPaymentInstance.hasTokenizationParams()) {
 *   localPaymentInstance.tokenize();
 * }
 * @returns {Boolean} Returns a Boolean value for the state of the query string.
 */
LocalPayment.prototype.hasTokenizationParams = function () {
  var params = querystring.parse();

  if (params.errorcode) {
    return true;
  }

  return Boolean(
    params.btLpToken && params.btLpPaymentId && params.btLpPayerId
  );
};

LocalPayment.prototype._formatTokenizeData = function (params) {
  var clientConfiguration = this._client.getConfiguration();
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var data = {
    merchantAccountId: this._merchantAccountId,
    paypalAccount: {
      correlationId: params.btLpToken || params.token,
      paymentToken: params.btLpPaymentId || params.paymentId,
      payerId: params.btLpPayerId || params.PayerID,
      unilateral: gatewayConfiguration.paypal.unvettedMerchant,
      intent: "sale",
    },
  };

  return data;
};

// Some payment types are deferred. Meaning, the actual payment will
// occur at a later time outside of this session. For example, with
// Pay Upon Invoice, the customer will later receive an email that will
// be used to make the actual payment through RatePay. This function
// will return `true` if the given `paymentType` is a deferred payment
// type. Otherwise, it will return `false`.
function isDeferredPaymentType(paymentType) {
  return constants.DEFERRED_PAYMENT_TYPES.indexOf(paymentType) >= 0;
}

function hasMissingAddressOption(options) {
  var i, option;

  for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_ADDRESS.length; i++) {
    option = constants.REQUIRED_OPTIONS_FOR_ADDRESS[i];
    if (!options.hasOwnProperty(option)) {
      return option;
    }
  }

  return false;
}

function hasMissingLineItemsOption(items) {
  var i, j, item, option;

  for (j = 0; j < items.length; j++) {
    item = items[j];
    for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_LINE_ITEMS.length; i++) {
      option = constants.REQUIRED_OPTIONS_FOR_LINE_ITEMS[i];
      if (!item.hasOwnProperty(option)) {
        return option;
      }
    }
  }

  return false;
}

// This will return the name of the first missing required option that
// is found or `true` if `options` itself is not defined. Otherwise, it
// will return `false`.
function hasMissingOption(options) {
  var i, option, missingAddressOption, missingLineItemOption;

  if (!options) {
    return true;
  }

  if (isDeferredPaymentType(options.paymentType)) {
    for (
      i = 0;
      i < constants.REQUIRED_OPTIONS_FOR_DEFERRED_PAYMENT_TYPE.length;
      i++
    ) {
      option = constants.REQUIRED_OPTIONS_FOR_DEFERRED_PAYMENT_TYPE[i];
      if (!options.hasOwnProperty(option)) {
        return option;
      }
      if (option === "address" || option === "billingAddress") {
        missingAddressOption = hasMissingAddressOption(options[option]);
        if (missingAddressOption) {
          return option + "." + missingAddressOption;
        }
      } else if (option === "lineItems") {
        missingLineItemOption = hasMissingLineItemsOption(options[option]);
        if (missingLineItemOption) {
          return option + "." + missingLineItemOption;
        }
      }
    }
  } else {
    for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_START_PAYMENT.length; i++) {
      option = constants.REQUIRED_OPTIONS_FOR_START_PAYMENT[i];

      if (!options.hasOwnProperty(option)) {
        return option;
      }
    }

    if (!options.fallback.url) {
      return "fallback.url";
    }
    if (!options.fallback.buttonText) {
      return "fallback.buttonText";
    }
  }

  return false;
}

/**
 * Cleanly remove anything set up by {@link module:braintree-web/local-payment.create|create}.
 * @public
 * @param {callback} [callback] Called on completion.
 * @example
 * localPaymentInstance.teardown();
 * @example <caption>With callback</caption>
 * localPaymentInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
LocalPayment.prototype.teardown = function () {
  var self = this; // eslint-disable-line no-invalid-this

  self._frameService.teardown();

  convertMethodsToError(self, methods(LocalPayment.prototype));

  analytics.sendEvent(self._client, "local-payment.teardown-completed");

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(LocalPayment);

},{"../../lib/analytics":47,"../../lib/braintree-error":51,"../../lib/constants":52,"../../lib/convert-methods-to-error":53,"../../lib/convert-to-braintree-error":54,"../../lib/frame-service/external":61,"../../lib/methods":72,"../../lib/querystring":73,"../../lib/use-min":74,"../shared/errors":79,"./constants":76,"@braintree/extended-promise":20,"@braintree/wrap-promise":29}],78:[function(_dereq_,module,exports){
"use strict";
/**
 * @module braintree-web/local-payment
 * @description A component to integrate with local payment methods. *This component is currently in beta and is subject to change.*
 */

var analytics = _dereq_("../lib/analytics");
var basicComponentVerification = _dereq_("../lib/basic-component-verification");
var createDeferredClient = _dereq_("../lib/create-deferred-client");
var createAssetsUrl = _dereq_("../lib/create-assets-url");
var LocalPayment = _dereq_("./external/local-payment");
var VERSION = "3.95.0";
var wrapPromise = _dereq_("@braintree/wrap-promise");
var BraintreeError = _dereq_("../lib/braintree-error");
var errors = _dereq_("./shared/errors");

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {string} [options.merchantAccountId] A non-default merchant account ID to use for tokenization and creation of the authorizing transaction. Braintree strongly recommends specifying this parameter.
 * @param {callback} callback The second argument, `data`, is the {@link LocalPayment} instance.
 * @example <caption>Using the local payment component to set up an iDEAL button</caption>
 * var idealButton = document.querySelector('.ideal-button');
 *
 * braintree.client.create({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (clientErr, clientInstance) {
 *   if (clientErr) {
 *     console.error('Error creating client:', clientErr);
 *     return;
 *   }
 *
 *   braintree.localPayment.create({
 *     client: clientInstance,
 *     merchantAccountId: 'merchantAccountEUR',
 *   }, function (localPaymentErr, localPaymentInstance) {
 *     if (localPaymentErr) {
 *       console.error('Error creating local payment component:', localPaymentErr);
 *       return;
 *     }
 *
 *     idealButton.removeAttribute('disabled');
 *
 *     // When the button is clicked, attempt to start the payment flow.
 *     idealButton.addEventListener('click', function (event) {
 *       // Because this opens a popup, this has to be called as a result of
 *       // customer action, like clicking a button. You cannot call this at any time.
 *       localPaymentInstance.startPayment({
 *         paymentType: 'ideal',
 *         amount: '10.67',
 *         city: 'Den Haag',
 *         countryCode: 'NL',
 *         firstName: 'Test',
 *         lastName: 'McTester',
 *         line1: '123 of 456 Fake Lane',
 *         line2: 'Apartment 789',
 *         payerEmail: 'payer@example.com',
 *         phone: '123456789',
 *         postalCode: '1234 AA',
 *         currencyCode: 'EUR',
 *         onPaymentStart: function (data, continueCallback) {
 *           // Do any preprocessing to store the ID and setup webhook
 *           // Call start to initiate the popup
 *           continueCallback();
 *         }
 **       }, function (startPaymentErr, payload) {
 *         if (startPaymentErr) {
 *           if (startPaymentErr.type !== 'CUSTOMER') {
 *             console.error('Error starting payment:', startPaymentErr);
 *           }
 *           return;
 *         }
 *
 *         idealButton.setAttribute('disabled', true);
 *
 *         console.log(payload.paymentId);
 *       });
 *     }, false);
 *   });
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = "Local Payment";

  return basicComponentVerification
    .verify({
      name: name,
      client: options.client,
      authorization: options.authorization,
    })
    .then(function () {
      return createDeferredClient.create({
        authorization: options.authorization,
        client: options.client,
        debug: options.debug,
        assetsUrl: createAssetsUrl.create(options.authorization),
        name: name,
      });
    })
    .then(function (client) {
      var localPaymentInstance;
      var config = client.getConfiguration();

      options.client = client;

      if (config.gatewayConfiguration.paypalEnabled !== true) {
        return Promise.reject(
          new BraintreeError(errors.LOCAL_PAYMENT_NOT_ENABLED)
        );
      }

      analytics.sendEvent(client, "local-payment.initialized");

      localPaymentInstance = new LocalPayment(options);

      return localPaymentInstance._initialize();
    });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION,
};

},{"../lib/analytics":47,"../lib/basic-component-verification":50,"../lib/braintree-error":51,"../lib/create-assets-url":55,"../lib/create-deferred-client":57,"./external/local-payment":77,"./shared/errors":79,"@braintree/wrap-promise":29}],79:[function(_dereq_,module,exports){
"use strict";

/**
 * @name BraintreeError.LocalPayment - Creation Error Codes
 * @description Errors that occur when [creating the Local Payment component](./module-braintree-web_local-payment.html#.create).
 * @property {MERCHANT} LOCAL_PAYMENT_NOT_ENABLED Occurs when Local Payment is not enabled on the Braintree control panel.
 */

/**
 * @name BraintreeError.LocalPayment - startPayment Error Codes
 * @description Errors that occur when using the [`startPayment` method](./LocalPayment.html#startPayment).
 * @property {MERCHANT} LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION Occurs when a startPayment is missing a required option.
 * @property {MERCHANT} LOCAL_PAYMENT_ALREADY_IN_PROGRESS Occurs when a startPayment call is already in progress.
 * @property {MERCHANT} LOCAL_PAYMENT_INVALID_PAYMENT_OPTION Occurs when a startPayment call has an invalid option.
 * @property {NETWORK} LOCAL_PAYMENT_START_PAYMENT_FAILED Occurs when a startPayment call fails.
 * @property {NETWORK} LOCAL_PAYMENT_TOKENIZATION_FAILED Occurs when a startPayment call fails to tokenize the result from authorization.
 * @property {CUSTOMER} LOCAL_PAYMENT_CANCELED Occurs when the customer cancels the Local Payment.
 * @property {CUSTOMER} LOCAL_PAYMENT_WINDOW_CLOSED Occurs when the customer closes the Local Payment window.
 * @property {MERCHANT} LOCAL_PAYMENT_WINDOW_OPEN_FAILED Occurs when the Local Payment window fails to open. Usually because `startPayment` was not called as a direct result of a user action.
 */

var BraintreeError = _dereq_("../../lib/braintree-error");

module.exports = {
  LOCAL_PAYMENT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: "LOCAL_PAYMENT_NOT_ENABLED",
    message: "LocalPayment is not enabled for this merchant.",
  },
  LOCAL_PAYMENT_ALREADY_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: "LOCAL_PAYMENT_ALREADY_IN_PROGRESS",
    message: "LocalPayment payment is already in progress.",
  },
  LOCAL_PAYMENT_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "LOCAL_PAYMENT_CANCELED",
    message: "Customer canceled the LocalPayment before authorizing.",
  },
  LOCAL_PAYMENT_WINDOW_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: "LOCAL_PAYMENT_WINDOW_CLOSED",
    message: "Customer closed LocalPayment window before authorizing.",
  },
  LOCAL_PAYMENT_WINDOW_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: "LOCAL_PAYMENT_WINDOW_OPEN_FAILED",
    message:
      "LocalPayment window failed to open; make sure startPayment was called in response to a user action.",
  },
  LOCAL_PAYMENT_START_PAYMENT_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: "LOCAL_PAYMENT_START_PAYMENT_FAILED",
    message: "LocalPayment startPayment failed.",
  },
  LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: "LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION",
    message: "Missing required option for startPayment.",
  },
  LOCAL_PAYMENT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: "LOCAL_PAYMENT_TOKENIZATION_FAILED",
    message: "Could not tokenize user's local payment method.",
  },
  LOCAL_PAYMENT_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: "LOCAL_PAYMENT_INVALID_PAYMENT_OPTION",
    message: "Local payment options are invalid.",
  },
};

},{"../../lib/braintree-error":51}]},{},[78])(78)
});
