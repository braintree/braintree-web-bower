(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).sepa = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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

},{"promise-polyfill":47}],2:[function(_dereq_,module,exports){
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

},{"./is-duckduckgo":6,"./is-edge":7,"./is-opera":15,"./is-samsung":16,"./is-silk":17}],6:[function(_dereq_,module,exports){
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
var isIE11 = _dereq_("./is-ie11");
module.exports = function isIE(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("MSIE") !== -1 || isIE11(ua);
};

},{"./is-ie11":9}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function isIe11(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Trident/7") !== -1;
};

},{}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function isIosFirefox(ua) {
    ua = ua || window.navigator.userAgent;
    return /FxiOS/i.test(ua);
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
var isIos = _dereq_("./is-ios");
function isGoogleSearchApp(ua) {
    return /\bGSA\b/.test(ua);
}
module.exports = function isIosGoogleSearchApp(ua) {
    ua = ua || window.navigator.userAgent;
    return isIos(ua) && isGoogleSearchApp(ua);
};

},{"./is-ios":14}],12:[function(_dereq_,module,exports){
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

},{"./is-ios":14,"./is-ios-google-search-app":11}],13:[function(_dereq_,module,exports){
"use strict";
var isIosWebview = _dereq_("./is-ios-webview");
module.exports = function isIosWKWebview(ua, statusBarVisible) {
    statusBarVisible =
        typeof statusBarVisible !== "undefined"
            ? statusBarVisible
            : window.statusbar.visible;
    return isIosWebview(ua) && statusBarVisible;
};

},{"./is-ios-webview":12}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function isIos(ua) {
    ua = ua || window.navigator.userAgent;
    return /iPhone|iPod|iPad/i.test(ua);
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function isOpera(ua) {
    ua = ua || window.navigator.userAgent;
    return (ua.indexOf("OPR/") !== -1 ||
        ua.indexOf("Opera/") !== -1 ||
        ua.indexOf("OPT/") !== -1);
};

},{}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function isSamsungBrowser(ua) {
    ua = ua || window.navigator.userAgent;
    return /SamsungBrowser/i.test(ua);
};

},{}],17:[function(_dereq_,module,exports){
"use strict";
module.exports = function isSilk(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Silk/") !== -1;
};

},{}],18:[function(_dereq_,module,exports){
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

},{"./is-android":4,"./is-chrome":5,"./is-duckduckgo":6,"./is-ios-firefox":10,"./is-ios-webview":12,"./is-samsung":16}],19:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ie");

},{"./dist/is-ie":8}],20:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios-wkwebview");

},{"./dist/is-ios-wkwebview":13}],21:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios");

},{"./dist/is-ios":14}],22:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/supports-popups");

},{"./dist/supports-popups":18}],23:[function(_dereq_,module,exports){
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

},{}],24:[function(_dereq_,module,exports){
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

},{"./lib/assign":25,"./lib/default-attributes":26,"./lib/set-attributes":27}],25:[function(_dereq_,module,exports){
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

},{}],26:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAttributes = void 0;
exports.defaultAttributes = {
    src: "about:blank",
    frameBorder: 0,
    allowtransparency: true,
    scrolling: "no",
};

},{}],27:[function(_dereq_,module,exports){
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

},{}],28:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],29:[function(_dereq_,module,exports){
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

},{}],30:[function(_dereq_,module,exports){
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

},{}],31:[function(_dereq_,module,exports){
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

},{}],32:[function(_dereq_,module,exports){
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

},{"./lib/deferred":29,"./lib/once":30,"./lib/promise-or-callback":31}],33:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framebus = void 0;
var is_not_string_1 = _dereq_("./lib/is-not-string");
var subscription_args_invalid_1 = _dereq_("./lib/subscription-args-invalid");
var broadcast_1 = _dereq_("./lib/broadcast");
var package_payload_1 = _dereq_("./lib/package-payload");
var constants_1 = _dereq_("./lib/constants");
var DefaultPromise = (typeof window !== "undefined" &&
    window.Promise);
var Framebus = /** @class */ (function () {
    function Framebus(options) {
        if (options === void 0) { options = {}; }
        this.origin = options.origin || "*";
        this.channel = options.channel || "";
        this.verifyDomain = options.verifyDomain;
        this.isDestroyed = false;
        this.listeners = [];
    }
    Framebus.setPromise = function (PromiseGlobal) {
        Framebus.Promise = PromiseGlobal;
    };
    Framebus.target = function (options) {
        return new Framebus(options);
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
        if (is_not_string_1.isntString(eventName)) {
            return false;
        }
        if (is_not_string_1.isntString(origin)) {
            return false;
        }
        if (typeof data === "function") {
            reply = data;
            data = undefined; // eslint-disable-line no-undefined
        }
        var payload = package_payload_1.packagePayload(eventName, origin, data, reply);
        if (!payload) {
            return false;
        }
        broadcast_1.broadcast(window.top || window.self, payload, origin);
        return true;
    };
    Framebus.prototype.emitAsPromise = function (eventName, data) {
        var _this = this;
        return new Framebus.Promise(function (resolve, reject) {
            var didAttachListener = _this.emit(eventName, data, function (payload) {
                resolve(payload);
            });
            if (!didAttachListener) {
                reject(new Error("Listener not added for \"" + eventName + "\""));
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
        if (subscription_args_invalid_1.subscriptionArgsInvalid(eventName, handler, origin)) {
            return false;
        }
        if (this.verifyDomain) {
            /* eslint-disable no-invalid-this, @typescript-eslint/ban-ts-comment */
            handler = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // @ts-ignore
                if (self.checkOrigin(this && this.origin)) {
                    originalHandler.apply(void 0, args);
                }
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
        if (subscription_args_invalid_1.subscriptionArgsInvalid(eventName, handler, origin)) {
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
        return this.channel + ":" + eventName;
    };
    Framebus.Promise = DefaultPromise;
    return Framebus;
}());
exports.Framebus = Framebus;

},{"./lib/broadcast":37,"./lib/constants":38,"./lib/is-not-string":41,"./lib/package-payload":43,"./lib/subscription-args-invalid":45}],34:[function(_dereq_,module,exports){
"use strict";
var attach_1 = _dereq_("./lib/attach");
var framebus_1 = _dereq_("./framebus");
attach_1.attach();
module.exports = framebus_1.Framebus;

},{"./framebus":33,"./lib/attach":35}],35:[function(_dereq_,module,exports){
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

},{"./message":42}],36:[function(_dereq_,module,exports){
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
            broadcast_1.broadcast(childWindow.top, payload, origin);
        }
    }
}
exports.broadcastToChildWindows = broadcastToChildWindows;

},{"./broadcast":37,"./constants":38}],37:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = void 0;
var has_opener_1 = _dereq_("./has-opener");
function broadcast(frame, payload, origin) {
    var i = 0;
    var frameToBroadcastTo;
    try {
        frame.postMessage(payload, origin);
        if (has_opener_1.hasOpener(frame) && frame.opener.top !== window.top) {
            broadcast(frame.opener.top, payload, origin);
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
            broadcast(frameToBroadcastTo, payload, origin);
            i++;
        }
    }
    catch (_) {
        /* ignored */
    }
}
exports.broadcast = broadcast;

},{"./has-opener":40}],38:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribers = exports.childWindows = exports.prefix = void 0;
exports.prefix = "/*framebus*/";
exports.childWindows = [];
exports.subscribers = {};

},{}],39:[function(_dereq_,module,exports){
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

},{"./constants":38}],40:[function(_dereq_,module,exports){
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

},{}],41:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isntString = void 0;
function isntString(str) {
    return typeof str !== "string";
}
exports.isntString = isntString;

},{}],42:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onmessage = void 0;
var is_not_string_1 = _dereq_("./is-not-string");
var unpack_payload_1 = _dereq_("./unpack-payload");
var dispatch_1 = _dereq_("./dispatch");
var broadcast_to_child_windows_1 = _dereq_("./broadcast-to-child-windows");
function onmessage(e) {
    if (is_not_string_1.isntString(e.data)) {
        return;
    }
    var payload = unpack_payload_1.unpackPayload(e);
    if (!payload) {
        return;
    }
    var data = payload.eventData;
    var reply = payload.reply;
    dispatch_1.dispatch("*", payload.event, data, reply, e);
    dispatch_1.dispatch(e.origin, payload.event, data, reply, e);
    broadcast_to_child_windows_1.broadcastToChildWindows(e.data, payload.origin, e.source);
}
exports.onmessage = onmessage;

},{"./broadcast-to-child-windows":36,"./dispatch":39,"./is-not-string":41,"./unpack-payload":46}],43:[function(_dereq_,module,exports){
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
        payload.reply = subscribe_replier_1.subscribeReplier(reply, origin);
    }
    payload.eventData = data;
    try {
        packaged = constants_1.prefix + JSON.stringify(payload);
    }
    catch (e) {
        throw new Error("Could not stringify event: " + e.message);
    }
    return packaged;
}
exports.packagePayload = packagePayload;

},{"./constants":38,"./subscribe-replier":44}],44:[function(_dereq_,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeReplier = void 0;
var framebus_1 = _dereq_("../framebus");
var uuid_1 = __importDefault(_dereq_("@braintree/uuid"));
function subscribeReplier(fn, origin) {
    var uuid = uuid_1.default();
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

},{"../framebus":33,"@braintree/uuid":28}],45:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionArgsInvalid = void 0;
var is_not_string_1 = _dereq_("./is-not-string");
function subscriptionArgsInvalid(event, fn, origin) {
    if (is_not_string_1.isntString(event)) {
        return true;
    }
    if (typeof fn !== "function") {
        return true;
    }
    return is_not_string_1.isntString(origin);
}
exports.subscriptionArgsInvalid = subscriptionArgsInvalid;

},{"./is-not-string":41}],46:[function(_dereq_,module,exports){
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
            var replyPayload = package_payload_1.packagePayload(replyEvent_1, replyOrigin_1, replyData);
            if (!replyPayload) {
                return;
            }
            replySource_1.postMessage(replyPayload, replyOrigin_1);
        };
    }
    return payload;
}
exports.unpackPayload = unpackPayload;

},{"./constants":38,"./package-payload":43}],47:[function(_dereq_,module,exports){
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

},{}],48:[function(_dereq_,module,exports){
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

},{"./constants":54,"./create-authorization-data":56,"./json-clone":72}],49:[function(_dereq_,module,exports){
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

},{"./add-metadata":48,"./constants":54,"./promise":73}],50:[function(_dereq_,module,exports){
"use strict";

var loadScript = _dereq_("@braintree/asset-loader/load-script");

module.exports = {
  loadScript: loadScript,
};

},{"@braintree/asset-loader/load-script":3}],51:[function(_dereq_,module,exports){
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

},{}],52:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");
var Promise = _dereq_("./promise");
var sharedErrors = _dereq_("./errors");
var VERSION = "3.87.0";

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

},{"./braintree-error":53,"./errors":59,"./promise":73}],53:[function(_dereq_,module,exports){
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

},{"./enumerate":58}],54:[function(_dereq_,module,exports){
"use strict";

var VERSION = "3.87.0";
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

},{}],55:[function(_dereq_,module,exports){
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

},{"./constants":54}],56:[function(_dereq_,module,exports){
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

},{"../lib/constants":54,"../lib/vendor/polyfill":75}],57:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("./braintree-error");
var Promise = _dereq_("./promise");
var assets = _dereq_("./assets");
var sharedErrors = _dereq_("./errors");

var VERSION = "3.87.0";

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

},{"./assets":50,"./braintree-error":53,"./errors":59,"./promise":73}],58:[function(_dereq_,module,exports){
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

},{"./braintree-error":53}],60:[function(_dereq_,module,exports){
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
var isHTTPS = _dereq_("../../is-https");
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
  var error;

  options = options || {};
  this._frame = this._getFrameForEnvironment(options);

  this._frame.initialize(callback);

  if (this._frame instanceof PopupBridge) {
    return;
  }

  assign(this.state, options.state);

  this._onCompleteCallback = callback;
  this._frame.open();

  if (this.isFrameClosed()) {
    this._cleanupFrame();
    if (callback) {
      if (browserDetection.isIE() && !isHTTPS.isHTTPS()) {
        error = new BraintreeError(
          errors.FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG
        );
      } else {
        error = new BraintreeError(errors.FRAME_SERVICE_FRAME_OPEN_FAILED);
      }
      callback(error);
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

},{"../../braintree-error":53,"../../constants":54,"../../is-https":71,"../shared/browser-detection":67,"../shared/constants":68,"../shared/errors":69,"../shared/events":70,"./../../assign":51,"./strategies/modal":62,"./strategies/popup":65,"./strategies/popup-bridge":63,"@braintree/iframer":24,"@braintree/uuid":28,"framebus":34}],61:[function(_dereq_,module,exports){
"use strict";

var FrameService = _dereq_("./frame-service");

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

},{"../../../assign":51,"../../shared/browser-detection":67,"@braintree/iframer":24}],63:[function(_dereq_,module,exports){
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

},{"../../../braintree-error":53,"../../shared/errors":69}],64:[function(_dereq_,module,exports){
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

  this.open();
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
  isIE: _dereq_("@braintree/browser-detection/is-ie"),
  supportsPopups: _dereq_("@braintree/browser-detection/supports-popups"),
};

},{"@braintree/browser-detection/is-ie":19,"@braintree/browser-detection/is-ios":21,"@braintree/browser-detection/is-ios-wkwebview":20,"@braintree/browser-detection/supports-popups":22}],68:[function(_dereq_,module,exports){
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
 * @property {INTERNAL} FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG - Occurs when the frame could not be opened because of a specific bug in Internet Explorer - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11324352/.
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
  FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG: {
    type: BraintreeError.types.INTERNAL,
    code: "FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG",
    message:
      "Could not open frame. This may be due to a bug in IE browsers when attempting to open an HTTPS page from a HTTP page. https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11324352/",
  },
};

},{"../../braintree-error":53}],70:[function(_dereq_,module,exports){
"use strict";

var enumerate = _dereq_("../../enumerate");

module.exports = enumerate(
  ["DISPATCH_FRAME_READY", "DISPATCH_FRAME_REPORT"],
  "frameService:"
);

},{"../../enumerate":58}],71:[function(_dereq_,module,exports){
"use strict";

function isHTTPS(protocol) {
  protocol = protocol || window.location.protocol;

  return protocol === "https:";
}

module.exports = {
  isHTTPS: isHTTPS,
};

},{}],72:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],73:[function(_dereq_,module,exports){
"use strict";

var PromisePolyfill = _dereq_("promise-polyfill");
var ExtendedPromise = _dereq_("@braintree/extended-promise");

// eslint-disable-next-line no-undef
var PromiseGlobal = typeof Promise !== "undefined" ? Promise : PromisePolyfill;

ExtendedPromise.suppressUnhandledPromiseMessage = true;
ExtendedPromise.setPromise(PromiseGlobal);

module.exports = PromiseGlobal;

},{"@braintree/extended-promise":23,"promise-polyfill":47}],74:[function(_dereq_,module,exports){
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

var BraintreeError = _dereq_("../../lib/braintree-error");
var sepaErrors = _dereq_("../shared/errors");
var Promise = _dereq_("../../lib/promise");
var frameService = _dereq_("../../lib/frame-service/external");
var analytics = _dereq_("../../lib/analytics");
var useMin = _dereq_("../../lib/use-min");

var POPUP_WIDTH = 400;
var POPUP_HEIGHT = 570;

/**
 * @ignore
 * @typedef CreateMandateResponse
 * @property {string} approvalUrl The URL to present to the customer for payment approval.
 * @property {string} last4 The last four digits of the iban.
 * @property {string} bankReferenceToken The tokenized payment source to fun the payment.
 */

/**
 *
 * A function that creates a mandate so that we can present the mandate to the customer via a popup.
 *
 * @ignore
 * @static
 * @function createMandate
 * @param {object} client The Braintree client.
 * @param {object} options All options for intiating the SEPA payment flow.
 * @param {string} [options.accountHolderName] The account holder name.
 * @param {string} [options.cancelUrl] The URL to redirect to if authorization is cancelled.
 * @param {string} [options.countryCode] The customer's country code.
 * @param {string} [options.customerId] The customer's id.
 * @param {string} [options.iban] The customer's International Bank Account Number.
 * @param {string} [options.mandateType] Specify ONE_OFF or RECURRENT payment.
 * @param {string} [options.merchantAccountId] The merchant's account id.
 * @param {string} [options.merchantId] The merchant id.
 * @param {string} [options.returnUrl] The URL to redirect to if authorization is successful.
 * @returns {Promise<CreateMandateResponse|Error>} Returns a promise with the mandate response or an error.
 */

function createMandate(client, options) {
  // Disabling eslint because api is expecting snake_case format for the keys
  /* eslint-disable */
  var data = {
    sepa_debit: {
      account_holder_name: options.accountHolderName,
      merchant_or_partner_customer_id: options.customerId,
      iban: options.iban,
      mandate_type: options.mandateType,
      billing_address: {
        country_code: options.countryCode,
      },
    },
    cancel_url: options.cancelUrl,
    return_url: options.returnUrl,
    merchant_account_id: options.merchantAccountId,
  };
  /* eslint-enable */

  return client
    .request({
      api: "clientApi",
      method: "post",
      endpoint: "sepa_debit",
      data: data,
    })
    .then(function (response) {
      var sepaDebitAccount = response.message.body.sepaDebitAccount;

      if (!sepaDebitAccount) {
        throw new BraintreeError(sepaErrors.SEPA_CREATE_MANDATE_FAILED);
      }

      return {
        approvalUrl: sepaDebitAccount.approvalUrl,
        last4: sepaDebitAccount.last4,
        bankReferenceToken: sepaDebitAccount.bankReferenceToken,
      };
    })
    .catch(function () {
      throw new BraintreeError(sepaErrors.SEPA_CREATE_MANDATE_FAILED);
    });
}

/**
 *
 * A function for opening and managing the popup used for authorization.
 *
 * @ignore
 * @param {string} client The Braintree client.
 * @param {string} options The input options needed to manage the popup portion of the flow.
 * @param {string} [options.assetsUrl] The url to the Braintree asset to be used in frameservice.
 * @param {string} [options.approvalUrl] The url to open for SEPA authorization. It is `approvalUrl` coming back from the mandate creation, but commonly refered to as the mandate link.
 * @param {string} [options.debug] Whether to use debugging modes or not.
 * @returns {Promise<void|Error>} Returns a promise.
 */
function openPopup(client, options) {
  var popupName = "sepadirectdebit";
  var assetsBaseUrl = options.assetsUrl + "/html";
  var debug = options.debug || false;

  return new Promise(function (resolve, reject) {
    var popupLocation = centeredPopupDimensions();

    frameService.create(
      {
        name: popupName,
        dispatchFrameUrl:
          assetsBaseUrl + "/dispatch-frame" + useMin(debug) + ".html",
        openFrameUrl:
          assetsBaseUrl + "/sepa-landing-frame" + useMin(debug) + ".html",
        top: popupLocation.top,
        left: popupLocation.left,
        height: POPUP_HEIGHT,
        width: POPUP_WIDTH,
      },
      function (frameServiceInstance) {
        analytics.sendEvent(client, "sepa.popup.initialized");
        frameServiceInstance.open({}, function (err, params) {
          if (mandateApproved(params)) {
            frameServiceInstance.close();

            return resolve();
          }

          if (customerCanceled(params, err)) {
            frameServiceInstance.close();

            return reject(
              new BraintreeError(sepaErrors.SEPA_CUSTOMER_CANCELED)
            );
          }

          frameServiceInstance.close();

          return reject(
            new BraintreeError(sepaErrors.SEPA_TOKENIZATION_FAILED)
          );
        });

        frameServiceInstance.redirect(options.approvalUrl);
      }
    );
  });
}

function mandateApproved(params) {
  return params && params.success;
}

function customerCanceled(params, error) {
  return (
    (params && params.cancel) ||
    (error && error.code === "FRAME_SERVICE_FRAME_CLOSED")
  );
}

function centeredPopupDimensions() {
  var popupTop =
    Math.round((window.outerHeight - POPUP_HEIGHT) / 2) + window.screenTop;
  var popupLeft =
    Math.round((window.outerWidth - POPUP_WIDTH) / 2) + window.screenLeft;

  return {
    top: popupTop,
    left: popupLeft,
  };
}

/**
 *
 * A function that creates a mandate so that we can present the mandate to the customer via a popup.
 *
 * @ignore
 * @static
 * @function handleApproval
 * @param {object} client The Braintree client.
 * @param {object} options All options for intiating the SEPA payment flow.
 * @param {string} [options.bankReferenceToken] The tokenized payment source to fun the payment.
 * @param {string} [options.customerId] The customer's id.
 * @param {string} [options.last4] The last four digits of iban.
 * @param {string} [options.mandateType] The mandate type being used. Specify ONE_OFF or RECURRENT payment.
 * @param {string} [options.merchantAccountId] The merchant's account id.
 * @param {string} [options.merchantId] The merchant id.
 * @returns {Promise<tokenizePayload|Error>} Returns a promise with the approval response or an error.
 */

function handleApproval(client, options) {
  // Disabling eslint because api is expecting snake_case format for the keys
  /* eslint-disable */
  var data = {
    sepa_debit_account: {
      last_4: options.last4,
      merchant_or_partner_customer_id: options.customerId,
      bank_reference_token: options.bankReferenceToken,
      mandate_type: options.mandateType,
    },
    merchant_account_id: options.merchantAccountId,
  };

  /* eslint-enable */
  return client
    .request({
      api: "clientApi",
      method: "post",
      endpoint: "payment_methods/sepa_debit_accounts",
      data: data,
    })
    .then(function (response) {
      if (!response.nonce) {
        throw new BraintreeError(sepaErrors.SEPA_TRANSACTION_FAILED);
      }

      return {
        nonce: response.nonce,
        ibanLastFour: options.last4,
        customerId: options.customerId,
        mandateType: options.mandateType,
      };
    })
    .catch(function () {
      throw new BraintreeError(sepaErrors.SEPA_TRANSACTION_FAILED);
    });
}

module.exports = {
  createMandate: createMandate,
  openPopup: openPopup,
  handleApproval: handleApproval,
  POPUP_WIDTH: POPUP_WIDTH,
  POPUP_HEIGHT: POPUP_HEIGHT,
};

},{"../../lib/analytics":49,"../../lib/braintree-error":53,"../../lib/frame-service/external":61,"../../lib/promise":73,"../../lib/use-min":74,"../shared/errors":80}],77:[function(_dereq_,module,exports){
"use strict";

var wrapPromise = _dereq_("@braintree/wrap-promise");
var BraintreeError = _dereq_("../../lib/braintree-error");
var sepaErrors = _dereq_("../shared/errors");
var Promise = _dereq_("../../lib/promise");
var constants = _dereq_("../shared/constants");
var mandates = _dereq_("./mandate");
var hasMissingOption = _dereq_("../shared/has-missing-option");
var analytics = _dereq_("../../lib/analytics");
var VERSION = "3.87.0";

/**
 * @class
 * @param {object} options see {@link module:braintree-web/sepa.create|sepa.create}
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/sepa.create|braintree-web.sepa.create} instead.</strong>
 * @classdesc This class represents a SEPA component produced by {@link module:braintree-web/sepa.create|braintree-web.sepa.create}. Instances provide methods for tokenizing SEPA payments.
 */
function SEPA(options) {
  var getConfiguration = options.client.getConfiguration();

  this._client = options.client;
  this._assetsUrl =
    getConfiguration.gatewayConfiguration.assetsUrl + "/web/" + VERSION;
  this._isDebug = getConfiguration.isDebug;
  this._returnUrl = this._assetsUrl + "/html/redirect-frame.html?success=1";
  this._cancelUrl = this._assetsUrl + "/html/redirect-frame.html?cancel=1";

  analytics.sendEvent(this._client, "sepa.component.initialized");
}

/**
 * SEPA tokenize payload.
 * @typedef SEPA~tokenizePayload
 * @property {string} nonce The payment nonce.
 * @property {string} ibanLastFour The last four digits of the customer's IBAN.
 * @property {string} mandateType The specified mandateType used.
 * @property {string} customerId The provided customer id.
 */

/**
 * @static
 * @public
 * @function tokenize
 * @param {object} options All options for intiating the SEPA payment flow.
 * @param {string} [options.accountHolderName] The account holder name.
 * @param {string} [options.customerId] The customer's id.
 * @param {string} [options.iban] The customer's International Bank Account Number.
 * @param {string} [options.mandateType] Specify ONE_OFF or RECURRENT payment.
 * @param {string} [options.countryCode] The customer's country code.
 * @param {string} [options.merchantAccountId] The merchant's account id.
 * @param {callback} [callback] The first argument is an error object, where the second is a {@link SEPA~tokenizePayload|tokenizePayload}
 * @returns {(Promise<tokenizePayload|error>)} Returns a promise if no callback is provided.
 *
 * @example
 * button.addEventListener('click', function () {
 *   var tokenizeInputs = {
 *     accountHolderName: "some-accnt-holder-name",
 *     customerId: "a-customer-id",
 *     iban: "a-full-iban",
 *     mandateType: "ONE_OFF",
 *     countryCode: "LI",
 *     merchantAccountId: "a-merchant-account-id"
 *   }
 *   sepaInstance.tokenize(tokenizeInputs).then(function (payload) {
 *      // Submit payload.nonce to your server
 *   }).catch(function(tokenizationErr) {
 *     // Handle errors in the flow
 *   })
 * })
 */

SEPA.prototype.tokenize = function (options) {
  var self = this;

  if (!options || hasMissingOption(options, constants.REQUIRED_OPTIONS)) {
    analytics.sendEvent(self._client, "sepa.input-validation.missing-options");

    return Promise.reject(
      new BraintreeError(sepaErrors.SEPA_TOKENIZE_MISSING_REQUIRED_OPTION)
    );
  }

  if (!constants.MANDATE_TYPE_ENUM.includes(options.mandateType)) {
    analytics.sendEvent(self._client, "sepa.input-validation.invalid-mandate");

    return Promise.reject(
      new BraintreeError(sepaErrors.SEPA_INVALID_MANDATE_TYPE)
    );
  }

  return mandates
    .createMandate(self._client, {
      accountHolderName: options.accountHolderName,
      customerId: options.customerId,
      iban: options.iban,
      mandateType: options.mandateType,
      countryCode: options.countryCode,
      merchantAccountId: options.merchantAccountId,
      cancelUrl: self._cancelUrl,
      returnUrl: self._returnUrl,
    })
    .then(function (mandateResponse) {
      analytics.sendEvent(self._client, "sepa.create-mandate.success");
      options.last4 = mandateResponse.last4;
      options.bankReferenceToken = mandateResponse.bankReferenceToken;

      return mandates.openPopup(self._client, {
        approvalUrl: mandateResponse.approvalUrl,
        assetsUrl: self._assetsUrl,
      });
    })
    .then(function () {
      analytics.sendEvent(self._client, "sepa.mandate.approved");

      return mandates.handleApproval(self._client, {
        bankReferenceToken: options.bankReferenceToken,
        last4: options.last4,
        customerId: options.customerId,
        mandateType: options.mandateType,
        merchantAccountId: options.merchantAccountId,
      });
    })
    .then(function (approval) {
      analytics.sendEvent(self._client, "sepa.tokenization.success");

      return Promise.resolve(approval);
    })
    .catch(function (err) {
      analytics.sendEvent(self._client, "sepa." + err.details + ".failed");

      return Promise.reject(err);
    });
};

module.exports = wrapPromise.wrapPrototype(SEPA);

},{"../../lib/analytics":49,"../../lib/braintree-error":53,"../../lib/promise":73,"../shared/constants":79,"../shared/errors":80,"../shared/has-missing-option":81,"./mandate":76,"@braintree/wrap-promise":32}],78:[function(_dereq_,module,exports){
"use strict";
/** @module braintree-web/sepa */

var analytics = _dereq_("../lib/analytics");
var SEPA = _dereq_("./external/sepa");
var createAssetsUrl = _dereq_("../lib/create-assets-url");
var createDeferredClient = _dereq_("../lib/create-deferred-client");
var basicComponentVerification = _dereq_("../lib/basic-component-verification");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var VERSION = "3.87.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {boolean} [options.debug] A debug flag.
 * @param {callback} [callback] When provided, will be used instead of a promise. First argument is an error object, where the second is an instance of {@link SEPA|SEPA}.
 * @returns {Promise<void|error>} Returns the SEPA instance.
 * @example
 * braintree.sepa.create({
 *   client: clientInstance
 * }).then(function (sepaInstance) {
 *   // sepaInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating SEPA instance', createErr);
 * });
 * @example <caption>Creating a SEPA component</caption>
 * braintree.sepa.create({
 *   client: clientInstance,
 * }).then(function (sepaInstance) {
 *   // sepaInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating SEPA instance', createErr);
 * });
 */

function create(options) {
  var name = "SEPA";

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
      options.client = client;

      analytics.sendEvent(options.client, "sepa.client.initialized");

      return new SEPA(options);
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

},{"../lib/analytics":49,"../lib/basic-component-verification":52,"../lib/create-assets-url":55,"../lib/create-deferred-client":57,"./external/sepa":77,"@braintree/wrap-promise":32}],79:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  REQUIRED_OPTIONS: [
    "iban",
    "merchantAccountId",
    "mandateType",
    "customerId",
    "accountHolderName",
    "countryCode",
  ],
  MANDATE_TYPE_ENUM: ["ONE_OFF", "RECURRENT"],
};

},{}],80:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("../../lib/braintree-error");

/**
 * @name BraintreeError.SEPA - tokenize Error Codes
 * @description Errors that occur when using the {@link module:braintree-web/sepa.tokenize|sepa.tokenize} method.
 * @property {MERCHANT} SEPA_CREATE_MANDATE_FAILED Occurs when there was an issue creating a mandate. This can occur if the request fails, or if the merchant does not have SEPA enabled.
 * @property {CUSTOMER} SEPA_CUSTOMER_CANCELED Occurs when the customer has canceled the SEPA authorization process. This can be within the mandate approval popup, or by canceling the popup itself.
 * @property {MERCHANT} SEPA_INVALID_MANDATE_TYPE Occurs when an invalid mandate type is provided.
 * @property {UNKNOWN} SEPA_TOKENIZATION_FAILED Occurs when tokenization fails during the mandate approval process for unknown reasons.
 * @property {MERCHANT} SEPA_TOKENIZE_MISSING_REQUIRED_OPTION Occurs when there are required input options not provided.
 * @property {UNKNOWN} SEPA_TRANSACTION_FAILED Occurs when final tokenization fails.
 */

// Those with a "details" property are used in specific locations and this prop serves to identify where in the imlpementation the error originates.
module.exports = {
  SEPA_CREATE_MANDATE_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: "SEPA_CREATE_MANDATE_FAILED",
    message: "SEPA create mandate failed.",
    details: "create-mandate",
  },
  SEPA_CUSTOMER_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "SEPA_CUSTOMER_CANCELED",
    message: "User canceled SEPA authorization",
    details: "customer-canceled",
  },
  SEPA_INVALID_MANDATE_TYPE: {
    type: BraintreeError.types.MERCHANT,
    code: "SEPA_INVALID_MANDATE_TYPE",
    message: "SEPA mandate type is invalid",
  },
  SEPA_TOKENIZATION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: "SEPA_TOKENIZATION_FAILED",
    message: "SEPA encountered a problem",
    details: "open-popup",
  },
  SEPA_TOKENIZE_MISSING_REQUIRED_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: "SEPA_TOKENIZE_MISSING_REQUIRED_OPTION",
    message: "Missing required option for tokenize.",
  },
  SEPA_TRANSACTION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: "SEPA_TRANSACTION_FAILED",
    message: "SEPA transaction failed",
    details: "handle-approval",
  },
};

},{"../../lib/braintree-error":53}],81:[function(_dereq_,module,exports){
"use strict";

/**
 * @ignore
 * @static
 * @function hasMissingOption
 * @param {object} options All options provided for intiating the SEPA payment flow.
 * @param {array} required A list of required inputs that must be include as part of the options.
 * @returns {boolean} Returns a boolean.
 */
function hasMissingOption(options, required) {
  var i, option;

  required = required || [];

  for (i = 0; i < required.length; i++) {
    option = required[i];

    if (!options.hasOwnProperty(option)) {
      return true;
    }
  }

  return false;
}

module.exports = hasMissingOption;

},{}]},{},[78])(78)
});
