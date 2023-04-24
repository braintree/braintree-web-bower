(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).venmo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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

},{"promise-polyfill":51}],2:[function(_dereq_,module,exports){
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

},{"./is-duckduckgo":6,"./is-edge":7,"./is-opera":14,"./is-samsung":15,"./is-silk":16}],6:[function(_dereq_,module,exports){
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

},{"./is-ios":13}],10:[function(_dereq_,module,exports){
"use strict";
var isIos = _dereq_("./is-ios");
var isIosFirefox = _dereq_("./is-ios-firefox");
var webkitRegexp = /webkit/i;
function isWebkit(ua) {
    return webkitRegexp.test(ua);
}
function isIosChrome(ua) {
    return ua.indexOf("CriOS") > -1;
}
function isFacebook(ua) {
    return ua.indexOf("FBAN") > -1;
}
module.exports = function isIosSafari(ua) {
    ua = ua || window.navigator.userAgent;
    return (isIos(ua) &&
        isWebkit(ua) &&
        !isIosChrome(ua) &&
        !isIosFirefox(ua) &&
        !isFacebook(ua));
};

},{"./is-ios":13,"./is-ios-firefox":8}],11:[function(_dereq_,module,exports){
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

},{"./is-ios":13,"./is-ios-google-search-app":9}],12:[function(_dereq_,module,exports){
"use strict";
var isIosWebview = _dereq_("./is-ios-webview");
module.exports = function isIosWKWebview(ua, statusBarVisible) {
    statusBarVisible =
        typeof statusBarVisible !== "undefined"
            ? statusBarVisible
            : window.statusbar.visible;
    return isIosWebview(ua) && statusBarVisible;
};

},{"./is-ios-webview":11}],13:[function(_dereq_,module,exports){
"use strict";
module.exports = function isIos(ua) {
    ua = ua || window.navigator.userAgent;
    return /iPhone|iPod|iPad/i.test(ua);
};

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function isOpera(ua) {
    ua = ua || window.navigator.userAgent;
    return (ua.indexOf("OPR/") !== -1 ||
        ua.indexOf("Opera/") !== -1 ||
        ua.indexOf("OPT/") !== -1);
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function isSamsungBrowser(ua) {
    ua = ua || window.navigator.userAgent;
    return /SamsungBrowser/i.test(ua);
};

},{}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function isSilk(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Silk/") !== -1;
};

},{}],17:[function(_dereq_,module,exports){
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

},{"./is-android":4,"./is-chrome":5,"./is-duckduckgo":6,"./is-ios-firefox":8,"./is-ios-webview":11,"./is-samsung":15}],18:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-android");

},{"./dist/is-android":4}],19:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-chrome");

},{"./dist/is-chrome":5}],20:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios-safari");

},{"./dist/is-ios-safari":10}],21:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios-webview");

},{"./dist/is-ios-webview":11}],22:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios-wkwebview");

},{"./dist/is-ios-wkwebview":12}],23:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios");

},{"./dist/is-ios":13}],24:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-samsung");

},{"./dist/is-samsung":15}],25:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/supports-popups");

},{"./dist/supports-popups":17}],26:[function(_dereq_,module,exports){
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

},{}],27:[function(_dereq_,module,exports){
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

},{"./lib/assign":28,"./lib/default-attributes":29,"./lib/set-attributes":30}],28:[function(_dereq_,module,exports){
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

},{}],29:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAttributes = void 0;
exports.defaultAttributes = {
    src: "about:blank",
    frameBorder: 0,
    allowtransparency: true,
    scrolling: "no",
};

},{}],30:[function(_dereq_,module,exports){
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

},{}],31:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],32:[function(_dereq_,module,exports){
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

},{}],33:[function(_dereq_,module,exports){
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

},{}],34:[function(_dereq_,module,exports){
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

},{}],35:[function(_dereq_,module,exports){
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

},{"./lib/deferred":32,"./lib/once":33,"./lib/promise-or-callback":34}],36:[function(_dereq_,module,exports){
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

},{"./lib/broadcast":40,"./lib/constants":41,"./lib/is-not-string":44,"./lib/package-payload":46,"./lib/send-message":47,"./lib/subscription-args-invalid":49}],37:[function(_dereq_,module,exports){
"use strict";
var attach_1 = _dereq_("./lib/attach");
var framebus_1 = _dereq_("./framebus");
(0, attach_1.attach)();
module.exports = framebus_1.Framebus;

},{"./framebus":36,"./lib/attach":38}],38:[function(_dereq_,module,exports){
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

},{"./message":45}],39:[function(_dereq_,module,exports){
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

},{"./broadcast":40,"./constants":41}],40:[function(_dereq_,module,exports){
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

},{"./has-opener":43}],41:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribers = exports.childWindows = exports.prefix = void 0;
exports.prefix = "/*framebus*/";
exports.childWindows = [];
exports.subscribers = {};

},{}],42:[function(_dereq_,module,exports){
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

},{"./constants":41}],43:[function(_dereq_,module,exports){
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

},{}],44:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isntString = void 0;
function isntString(str) {
    return typeof str !== "string";
}
exports.isntString = isntString;

},{}],45:[function(_dereq_,module,exports){
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

},{"./broadcast-to-child-windows":39,"./dispatch":42,"./is-not-string":44,"./unpack-payload":50}],46:[function(_dereq_,module,exports){
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

},{"./constants":41,"./subscribe-replier":48}],47:[function(_dereq_,module,exports){
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

},{}],48:[function(_dereq_,module,exports){
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

},{"../framebus":36,"@braintree/uuid":31}],49:[function(_dereq_,module,exports){
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

},{"./is-not-string":44}],50:[function(_dereq_,module,exports){
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

},{"./constants":41,"./package-payload":46}],51:[function(_dereq_,module,exports){
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

},{}],52:[function(_dereq_,module,exports){
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

},{"./constants":58,"./create-authorization-data":61,"./json-clone":78}],53:[function(_dereq_,module,exports){
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

},{"./add-metadata":52,"./constants":58}],54:[function(_dereq_,module,exports){
"use strict";

var loadScript = _dereq_("@braintree/asset-loader/load-script");

module.exports = {
  loadScript: loadScript,
};

},{"@braintree/asset-loader/load-script":3}],55:[function(_dereq_,module,exports){
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

},{}],56:[function(_dereq_,module,exports){
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

},{"./braintree-error":57,"./errors":64}],57:[function(_dereq_,module,exports){
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

},{"./enumerate":63}],58:[function(_dereq_,module,exports){
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

},{}],59:[function(_dereq_,module,exports){
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

},{"./braintree-error":57,"./errors":64}],60:[function(_dereq_,module,exports){
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

},{"./constants":58}],61:[function(_dereq_,module,exports){
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

},{"../lib/constants":58,"../lib/vendor/polyfill":83}],62:[function(_dereq_,module,exports){
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

},{"./assets":54,"./braintree-error":57,"./errors":64}],63:[function(_dereq_,module,exports){
"use strict";

function enumerate(values, prefix) {
  prefix = prefix == null ? "" : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],64:[function(_dereq_,module,exports){
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

},{"./braintree-error":57}],65:[function(_dereq_,module,exports){
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

},{"../../braintree-error":57,"../../constants":58,"../shared/browser-detection":72,"../shared/constants":73,"../shared/errors":74,"../shared/events":75,"./../../assign":55,"./strategies/modal":67,"./strategies/popup":70,"./strategies/popup-bridge":68,"@braintree/iframer":27,"@braintree/uuid":31,"framebus":37}],66:[function(_dereq_,module,exports){
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

},{"./frame-service":65}],67:[function(_dereq_,module,exports){
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

},{"../../../assign":55,"../../shared/browser-detection":72,"@braintree/iframer":27}],68:[function(_dereq_,module,exports){
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

},{"../../../braintree-error":57,"../../shared/errors":74}],69:[function(_dereq_,module,exports){
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

},{"../../../shared/constants":73,"./position":71}],70:[function(_dereq_,module,exports){
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

},{"./compose-options":69}],71:[function(_dereq_,module,exports){
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

},{}],72:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  isIos: _dereq_("@braintree/browser-detection/is-ios"),
  isIosWKWebview: _dereq_("@braintree/browser-detection/is-ios-wkwebview"),
  supportsPopups: _dereq_("@braintree/browser-detection/supports-popups"),
};

},{"@braintree/browser-detection/is-ios":23,"@braintree/browser-detection/is-ios-wkwebview":22,"@braintree/browser-detection/supports-popups":25}],73:[function(_dereq_,module,exports){
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

},{}],74:[function(_dereq_,module,exports){
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

},{"../../braintree-error":57}],75:[function(_dereq_,module,exports){
"use strict";

var enumerate = _dereq_("../../enumerate");

module.exports = enumerate(
  ["DISPATCH_FRAME_READY", "DISPATCH_FRAME_REPORT"],
  "frameService:"
);

},{"../../enumerate":63}],76:[function(_dereq_,module,exports){
"use strict";

module.exports = function inIframe(win) {
  win = win || window;

  try {
    return win.self !== win.top;
  } catch (e) {
    return true;
  }
};

},{}],77:[function(_dereq_,module,exports){
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

},{}],78:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],79:[function(_dereq_,module,exports){
"use strict";

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === "function";
  });
};

},{}],80:[function(_dereq_,module,exports){
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

},{}],81:[function(_dereq_,module,exports){
"use strict";

module.exports = function (snakeString) {
  if (snakeString.indexOf("_") === -1) {
    return snakeString;
  }

  return snakeString.toLowerCase().replace(/(\_\w)/g, function (match) {
    return match[1].toUpperCase();
  });
};

},{}],82:[function(_dereq_,module,exports){
"use strict";

function useMin(isDebug) {
  return isDebug ? "" : ".min";
}

module.exports = useMin;

},{}],83:[function(_dereq_,module,exports){
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

},{}],84:[function(_dereq_,module,exports){
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var venmo_desktop_1 = __importDefault(_dereq_("./venmo-desktop"));
module.exports = function createVenmoDesktop(options) {
  var instance = new venmo_desktop_1.default(options);
  return instance.initialize();
};

},{"./venmo-desktop":86}],85:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENMO_PAYMENT_CONTEXT_STATUS_QUERY =
  exports.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY =
  exports.UPDATE_PAYMENT_CONTEXT_QUERY =
  exports.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY =
  exports.CREATE_PAYMENT_CONTEXT_QUERY =
  exports.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY =
    void 0;
exports.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY =
  "mutation CreateVenmoQRCodePaymentContext($input: CreateVenmoQRCodePaymentContextInput!) {\n  createVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n    venmoQRCodePaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}";
exports.CREATE_PAYMENT_CONTEXT_QUERY =
  "mutation CreateVenmoPaymentContext($input: CreateVenmoPaymentContextInput!) {\n  createVenmoPaymentContext(input: $input) {\n    clientMutationId\n    venmoPaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}";
exports.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY =
  "mutation UpdateVenmoQRCodePaymentContext($input: UpdateVenmoQRCodePaymentContextInput!) {\n  updateVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n  }\n}";
exports.UPDATE_PAYMENT_CONTEXT_QUERY =
  "mutation UpdateVenmoPaymentContextStatus($input: UpdateVenmoPaymentContextStatusInput!) {\n  updateVenmoPaymentContextStatus(input: $input) {\n    clientMutationId\n  }\n}";
exports.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY =
  "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoQRCodePaymentContext {\n      status\n      paymentMethodId\n      userName\n    }\n  }\n}";
exports.VENMO_PAYMENT_CONTEXT_STATUS_QUERY =
  "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoPaymentContext {\n      status\n      paymentMethodId\n      userName\n      payerInfo {\n        firstName\n        lastName\n        phoneNumber\n        email\n        externalId\n        userName\n      }\n    }\n  }\n}";

},{}],86:[function(_dereq_,module,exports){
"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var framebus_1 = __importDefault(_dereq_("framebus"));
var iframer_1 = __importDefault(_dereq_("@braintree/iframer"));
var uuid_1 = __importDefault(_dereq_("@braintree/uuid"));
var events_1 = _dereq_("../shared/events");
var queries_1 = _dereq_("./queries");
var VENMO_DESKTOP_POLLING_INTERVAL = 1000; // 1 second
var VISUAL_DELAY_BEFORE_SIGNALLING_COMPLETION = 2000; // 2 seconds
var VenmoDesktop = /** @class */ (function () {
  function VenmoDesktop(options) {
    this.isHidden = true;
    this.env = options.environment;
    this.id = uuid_1.default();
    this.profileId = options.profileId;
    this.displayName = options.displayName;
    this.paymentMethodUsage = options.paymentMethodUsage;
    this.shouldUseLegacyQRCodeMutation = !this.paymentMethodUsage;
    var frameUrl = options.url + "#" + this.env + "_" + this.id;
    this.bus = new framebus_1.default({
      channel: this.id,
      verifyDomain: options.verifyDomain,
      targetFrames: [],
    });
    this.apiRequest = options.apiRequest;
    this.sendEvent = options.sendEvent;
    this.Promise = options.Promise;
    this.alertBox = document.createElement("div");
    this.alertBox.setAttribute("data-venmo-desktop-id", this.id);
    this.alertBox.setAttribute("role", "alert");
    this.alertBox.style.position = "fixed";
    this.alertBox.style.display = "none";
    this.alertBox.style.height = "1px";
    this.alertBox.style.width = "1px";
    this.alertBox.style.overflow = "hidden";
    this.alertBox.style.zIndex = "0";
    this.iframe = iframer_1.default({
      src: frameUrl,
      name: "venmo-desktop-iframe",
      style: {
        display: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        height: "100%",
        width: "100%",
        zIndex: "9999999",
      },
      title: "Venmo Desktop",
    });
    this.bus.addTargetFrame(this.iframe);
  }
  VenmoDesktop.prototype.initialize = function () {
    var _this = this;
    return new this.Promise(function (resolve) {
      _this.bus.on(events_1.VENMO_DESKTOP_IFRAME_READY, function () {
        resolve(_this);
      });
      _this.bus.on(events_1.VENMO_DESKTOP_REQUEST_NEW_QR_CODE, function () {
        _this.sendEvent("venmo.tokenize.desktop.restarted-from-error-view");
        _this.startPolling();
      });
      document.body.appendChild(_this.iframe);
      document.body.appendChild(_this.alertBox);
    });
  };
  VenmoDesktop.prototype.launchDesktopFlow = function () {
    var _this = this;
    this.isHidden = false;
    var promise = new this.Promise(function (resolve, reject) {
      _this.launchDesktopPromiseRejectFunction = reject;
      var removeListeners = function () {
        /* eslint-disable @typescript-eslint/no-use-before-define */
        _this.bus.off(
          events_1.VENMO_DESKTOP_CUSTOMER_CANCELED,
          customerCancelledHandler
        );
        _this.bus.off(
          events_1.VENMO_DESKTOP_UNKNOWN_ERROR,
          unknownErrorHandler
        );
        /* eslint-enable @typescript-eslint/no-use-before-define */
      };
      var unknownErrorHandler = function (err) {
        removeListeners();
        _this.sendEvent("venmo.tokenize.desktop.unknown-error");
        reject({
          allowUIToHandleError: false,
          reason: "UNKNOWN_ERROR",
          err: err,
        });
      };
      var customerCancelledHandler = function () {
        removeListeners();
        _this.updateVenmoDesktopPaymentContext("CANCELED");
        _this.sendEvent(
          "venmo.tokenize.desktop.status-change.canceled-from-modal"
        );
        reject({
          allowUIToHandleError: false,
          reason: "CUSTOMER_CANCELED",
        });
      };
      _this.completedHandler = function (payload) {
        removeListeners();
        resolve(payload);
      };
      _this.bus.on(
        events_1.VENMO_DESKTOP_CUSTOMER_CANCELED,
        customerCancelledHandler
      );
      _this.bus.on(events_1.VENMO_DESKTOP_UNKNOWN_ERROR, unknownErrorHandler);
    });
    this.iframe.style.display = "block";
    this.setAlert("Generating a QR code, get your Venmo app ready");
    this.iframe.focus();
    this.startPolling();
    return promise
      .then(function (result) {
        delete _this.venmoContextId;
        delete _this.launchDesktopPromiseRejectFunction;
        return result;
      })
      .catch(function (err) {
        delete _this.venmoContextId;
        delete _this.launchDesktopPromiseRejectFunction;
        return _this.Promise.reject(err);
      });
  };
  VenmoDesktop.prototype.triggerCompleted = function (result) {
    var _this = this;
    if (this.isHidden) {
      return;
    }
    setTimeout(function () {
      if (_this.completedHandler) {
        _this.completedHandler(result);
      }
      delete _this.completedHandler;
    }, VISUAL_DELAY_BEFORE_SIGNALLING_COMPLETION);
  };
  VenmoDesktop.prototype.triggerRejected = function (err) {
    if (this.launchDesktopPromiseRejectFunction) {
      this.launchDesktopPromiseRejectFunction(err);
    }
  };
  VenmoDesktop.prototype.hideDesktopFlow = function () {
    this.setAlert("");
    this.iframe.style.display = "none";
    this.bus.emit(events_1.VENMO_DESKTOP_CLOSED_FROM_PARENT);
    this.isHidden = true;
  };
  VenmoDesktop.prototype.displayError = function (message) {
    if (this.isHidden) {
      return;
    }
    this.bus.emit(events_1.VENMO_DESKTOP_DISPLAY_ERROR, {
      message: message,
    });
    this.setAlert(message);
  };
  VenmoDesktop.prototype.displayQRCode = function (id, merchantId) {
    if (this.isHidden) {
      return;
    }
    this.bus.emit(events_1.VENMO_DESKTOP_DISPLAY_QR_CODE, {
      id: id,
      merchantId: merchantId,
    });
    this.setAlert("To scan the QR code, open your Venmo app");
  };
  VenmoDesktop.prototype.authorize = function () {
    if (this.isHidden) {
      return;
    }
    this.bus.emit(events_1.VENMO_DESKTOP_AUTHORIZE);
    this.setAlert("Venmo account authorized");
  };
  VenmoDesktop.prototype.authorizing = function () {
    if (this.isHidden) {
      return;
    }
    this.bus.emit(events_1.VENMO_DESKTOP_AUTHORIZING);
    this.setAlert("Authorize on your Venmo app");
  };
  VenmoDesktop.prototype.startPolling = function () {
    var _this = this;
    return this.createVenmoDesktopPaymentContext()
      .then(function (result) {
        var expiresIn =
          new Date(result.expiresAt).getTime() -
          new Date(result.createdAt).getTime();
        var expiredTime = Date.now() + expiresIn;
        _this.displayQRCode(result.id, result.merchantId);
        return _this.pollForStatusChange(result.status, expiredTime);
      })
      .then(function (result) {
        if (!result) {
          return;
        }
        // since we are manually adding a prepended @ sign
        // we want to make sure that the username does not
        // start giving us the @ sign up front in the future
        var username = result.userName || "";
        username = "@" + username.replace("@", "");
        _this.triggerCompleted({
          paymentMethodNonce: result.paymentMethodId,
          username: username,
          payerInfo: result.payerInfo,
          id: _this.venmoContextId || "",
        });
      })
      .catch(function (err) {
        if (err.allowUIToHandleError) {
          // noop here and let the UI handle the customer error
          return;
        }
        _this.sendEvent("venmo.tokenize.desktop.unhandled-error");
        _this.triggerRejected(err);
      });
  };
  VenmoDesktop.prototype.pollForStatusChange = function (status, expiredTime) {
    var _this = this;
    if (!this.venmoContextId) {
      return this.Promise.resolve();
    }
    if (Date.now() > expiredTime) {
      return this.updateVenmoDesktopPaymentContext("EXPIRED").then(function () {
        _this.displayError("Something went wrong");
        _this.sendEvent("venmo.tokenize.desktop.status-change.sdk-timeout");
        return _this.Promise.reject({
          allowUIToHandleError: true,
          reason: "TIMEOUT",
        });
      });
    }
    return this.lookupVenmoDesktopPaymentContext().then(function (response) {
      if (!_this.venmoContextId || !response) {
        return _this.Promise.resolve();
      }
      var newStatus = response.status;
      if (newStatus !== status) {
        status = newStatus;
        _this.sendEvent(
          "venmo.tokenize.desktop.status-change." + status.toLowerCase()
        );
        switch (status) {
          case "CREATED":
            // noop, no need to do anything here
            // should never be able to get to this point
            // but we'll keep it in to enumerate the statuses
            break;
          case "EXPIRED":
          case "FAILED":
          case "CANCELED":
            var message =
              status === "CANCELED"
                ? "The authorization was canceled"
                : "Something went wrong";
            _this.displayError(message);
            // these are all terminal states, so we end it here
            return _this.Promise.reject({
              allowUIToHandleError: true,
              reason: status,
            });
          case "SCANNED":
            _this.authorizing();
            break;
          case "APPROVED":
            _this.authorize();
            return _this.Promise.resolve(response);
          default:
          // any other statuses are irrelevant to the polling
          // and can just be ignored
        }
      }
      return new _this.Promise(function (resolve, reject) {
        setTimeout(function () {
          _this
            .pollForStatusChange(status, expiredTime)
            .then(resolve)
            .catch(reject);
        }, VENMO_DESKTOP_POLLING_INTERVAL);
      });
    });
  };
  VenmoDesktop.prototype.teardown = function () {
    this.bus.teardown();
    if (this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe);
    }
    if (this.alertBox.parentNode) {
      this.alertBox.parentNode.removeChild(this.alertBox);
    }
  };
  VenmoDesktop.prototype.setAlert = function (message) {
    this.alertBox.style.display = message ? "block" : "none";
    this.alertBox.textContent = message;
  };
  VenmoDesktop.prototype.createPaymentContextFromGraphqlLegacyQRCodeMutation =
    function (intent) {
      return this.apiRequest(queries_1.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY, {
        input: {
          environment: this.env,
          intent: intent,
        },
      }).then(function (response) {
        return response
          .createVenmoQRCodePaymentContext.venmoQRCodePaymentContext;
      });
    };
  VenmoDesktop.prototype.createPaymentContextFromGraphQL = function (intent) {
    var input = {
      intent: intent,
      paymentMethodUsage: this.paymentMethodUsage,
      customerClient: "DESKTOP",
    };
    if (this.profileId) {
      input.merchantProfileId = this.profileId;
    }
    if (this.displayName) {
      input.displayName = this.displayName;
    }
    return this.apiRequest(queries_1.CREATE_PAYMENT_CONTEXT_QUERY, {
      input: input,
    }).then(function (response) {
      return response.createVenmoPaymentContext.venmoPaymentContext;
    });
  };
  VenmoDesktop.prototype.createVenmoDesktopPaymentContext = function () {
    var _this = this;
    var contextPromise = this.shouldUseLegacyQRCodeMutation
      ? this.createPaymentContextFromGraphqlLegacyQRCodeMutation("PAY_FROM_APP")
      : this.createPaymentContextFromGraphQL("PAY_FROM_APP");
    return contextPromise.then(function (context) {
      _this.venmoContextId = context.id;
      var merchantId = _this.profileId || context.merchantId;
      return {
        id: context.id,
        status: context.status,
        merchantId: merchantId,
        createdAt: context.createdAt,
        expiresAt: context.expiresAt,
      };
    });
  };
  VenmoDesktop.prototype.updateVenmoDesktopPaymentContext = function (
    status,
    additionalOptions
  ) {
    if (additionalOptions === void 0) {
      additionalOptions = {};
    }
    if (!this.venmoContextId) {
      return this.Promise.resolve();
    }
    var data = {
      input: __assign(
        { id: this.venmoContextId, status: status },
        additionalOptions
      ),
    };
    var query = this.shouldUseLegacyQRCodeMutation
      ? queries_1.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY
      : queries_1.UPDATE_PAYMENT_CONTEXT_QUERY;
    return this.apiRequest(query, data).then(function () {
      // noop so we can resolve without any data to match the type
    });
  };
  VenmoDesktop.prototype.lookupVenmoDesktopPaymentContext = function () {
    if (!this.venmoContextId) {
      return this.Promise.resolve();
    }
    var query = this.shouldUseLegacyQRCodeMutation
      ? queries_1.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY
      : queries_1.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;
    return this.apiRequest(query, {
      id: this.venmoContextId,
    }).then(function (response) {
      return response.node;
    });
  };
  return VenmoDesktop;
})();
exports.default = VenmoDesktop;

},{"../shared/events":91,"./queries":85,"@braintree/iframer":27,"@braintree/uuid":31,"framebus":37}],87:[function(_dereq_,module,exports){
"use strict";
/** @module braintree-web/venmo */

var analytics = _dereq_("../lib/analytics");
var basicComponentVerification = _dereq_("../lib/basic-component-verification");
var createDeferredClient = _dereq_("../lib/create-deferred-client");
var createAssetsUrl = _dereq_("../lib/create-assets-url");
var errors = _dereq_("./shared/errors");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var BraintreeError = _dereq_("../lib/braintree-error");
var Venmo = _dereq_("./venmo");
var supportsVenmo = _dereq_("./shared/supports-venmo");
var VERSION = "3.92.2";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications. Doing so causes {@link Venmo#isBrowserSupported|isBrowserSupported} to return true only for mobile web browsers that support returning from the Venmo app to the same tab.
 * @param {boolean} [options.allowWebviews=true] This should be set to false if your payment flow does not occur from within a webview that you control. Doing so causes {@link Venmo#isBrowserSupported|isBrowserSupported} to return true only for mobile web browsers that are not webviews.
 * @param {boolean} [options.ignoreHistoryChanges=false] When the Venmo app returns to the website, it will modify the hash of the url to include data about the tokenization. By default, the SDK will put the state of the hash back to where it was before the change was made. Pass `true` to handle the hash change instead of the SDK.
 * @param {string} [options.profileId] The Venmo profile ID to be used during payment authorization. Customers will see the business name and logo associated with this Venmo profile, and it will show up in the Venmo app as a "Connected Merchant". Venmo profile IDs can be found in the Braintree Control Panel. Omitting this value will use the default Venmo profile.
 * @param {string} [options.deepLinkReturnUrl] An override for the URL that the Venmo iOS app opens to return from an app switch.
 * @param {boolean} [options.requireManualReturn=false] When `true`, the customer will have to manually switch back to the browser/webview that is presenting Venmo to complete the payment.
 * @param {boolean} [options.useRedirectForIOS=false] Normally, the Venmo flow is launched using `window.open` and the Venmo app intercepts that call and opens the Venmo app instead. If the customer does not have the Venmo app installed, it opens the Venmo website in a new window and instructs the customer to install the app.
 
 * In iOS webviews and Safari View Controllers (a webview-like environment which is indistinguishable from Safari for JavaScript environments), this call to `window.open` will always fail to app switch to Venmo, resulting instead in a white screen. Because of this, an alternate approach is required to launch the Venmo flow.
 *
 * When `useRedirectForIOS` is `true` and the Venmo flow is started in an iOS environment, the Venmo flow will be started by setting `window.location.href` to the Venmo website (which will still be intercepted by the Venmo app and should be the same behavior as if `window.open` was called). However, if the customer does not have the Venmo app installed, the merchant page will instead be replaced with the Venmo website and the customer will need to use the browser's back button to return to the merchant's website. Ensure that your customer's checkout information will not be lost if they are navigated away from the website and return using the browser back button.
 *
 * Due to a bug in iOS's implementation of `window.open` in iOS webviews and Safari View Controllers, if `useRedirectForIOS` is not set to `true` and the flow is launched from an iOS webview or Safari View Controller, the customer will be presented with a blank screen, halting the flow and leaving the customer unable to return to the merchant's website. Setting `useRedirectForIOS` to `true` will allow the flow to continue, but the Venmo app will be unable to return back to the webview/Safari View Controller. It will instead open the merchant's site in a new window in the customer's browser, which means the merchant site must be able to process the Venmo payment. If the SDK is configured with `allowNewBrowserTab = false`, it is unlikely that the website is set up to process the Venmo payment from a new window.
 *
 * If processing the payment from a new window is not possible, use this flag in conjunction with `requireManualReturn` so that the customer may start the flow from a webview/Safari View Controller or their Safari browser and manually return to the place that originated the flow once the Venmo app has authorized the payment and instructed them to do so.
 * @param {string} [options.paymentMethodUsage] The intended usage for the Venmo payment method nonce. Possible options are:
 * * single_use - intended as a one time transaction
 * * multi_use - intended to be vaulted and used for multiple transactions
 * @param {string} [options.displayName] The business name that will be displayed in the Venmo app payment approval screen. Only applicable when used with `paymentMethodUsage` and used by merchants onboarded as PayFast channel partners.
 * @param {boolean} [options.allowDesktop] Used to support desktop users. When enabled, the default mode is to render a scannable QR-code customers scan with their phone's to approve via the mobile app.
 * @param {boolean} [options.allowDesktopWebLogin=false] When `true`, the customer will authorize payment via a window popup that allows them to sign in to their Venmo account. This is used explicitly for customers operating from desktop browsers wanting to avoid the QR Code flow.
 * @param {boolean} [options.mobileWebFallBack] Use this option when you want to use a web-login experience, such as if on mobile and the Venmo app isn't installed.
 * @param {boolean} [options.allowAndroidRecreation=true] This flag is for when your integration uses the [Android PopupBridge](https://github.com/braintree/popup-bridge-android). Setting this flag to false will avoid a page refresh when returning to your page after payment authorization. If not specified, it defaults to true and the Android activity will be recreated, resulting in a page refresh.
 *
 * Note: This flow currently requires a full page redirect, which means to utilize this flow your page will need to be able to handle the checkout session across different pages.
 * @param {callback} [callback] The second argument, `data`, is the {@link Venmo} instance. If no callback is provided, `create` returns a promise that resolves with the {@link Venmo} instance.
 * @example
 * braintree.venmo.create({
 *   client: clientInstance
 * }).then(function (venmoInstance) {
 *   // venmoInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating Venmo instance', createErr);
 * });
 * @example <caption>Allow desktop flow to be used</caption>
 * braintree.venmo.create({
 *   client: clientInstance,
 *   allowDesktop: true
 * }).then(function (venmoInstance) {
 *   // venmoInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating Venmo instance', createErr);
 * });
 * @returns {(Promise|void)} Returns the Venmo instance.
 */
function create(options) {
  var name = "Venmo";

  return basicComponentVerification
    .verify({
      name: name,
      client: options.client,
      authorization: options.authorization,
    })
    .then(function () {
      var createPromise, instance;

      if (options.profileId && typeof options.profileId !== "string") {
        return Promise.reject(
          new BraintreeError(errors.VENMO_INVALID_PROFILE_ID)
        );
      }

      if (
        options.deepLinkReturnUrl &&
        typeof options.deepLinkReturnUrl !== "string"
      ) {
        return Promise.reject(
          new BraintreeError(errors.VENMO_INVALID_DEEP_LINK_RETURN_URL)
        );
      }

      createPromise = createDeferredClient
        .create({
          authorization: options.authorization,
          client: options.client,
          debug: options.debug,
          assetsUrl: createAssetsUrl.create(options.authorization),
          name: name,
        })
        .then(function (client) {
          var configuration = client.getConfiguration();

          options.client = client;

          if (!configuration.gatewayConfiguration.payWithVenmo) {
            return Promise.reject(new BraintreeError(errors.VENMO_NOT_ENABLED));
          }

          return client;
        });

      options.createPromise = createPromise;
      instance = new Venmo(options);

      analytics.sendEvent(createPromise, "venmo.initialized");

      return createPromise.then(function () {
        return instance;
      });
    });
}

/**
 * @static
 * @function isBrowserSupported
 * @param {object} [options] browser support options:
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications.
 * @param {boolean} [options.allowWebviews=true] This should be set to false if your payment flow does not occur from within a webview that you control.
 * @example
 * if (braintree.venmo.isBrowserSupported()) {
 *   // set up Venmo
 * }
 * @example <caption>Explicitly require browser support returning to the same tab</caption>
 * if (braintree.venmo.isBrowserSupported({
 *   allowNewBrowserTab: false
 * })) {
 *   // set up Venmo
 * }
 * @example <caption>Explicitly set webviews as disallowed browsers</caption>
 * if (braintree.venmo.isBrowserSupported({
 *   allowWebviews: false
 * })) {
 *   // set up Venmo
 * }
 * @returns {boolean} Whether or not the browser supports Venmo.
 */
function isBrowserSupported(options) {
  return supportsVenmo.isBrowserSupported(options);
}

module.exports = {
  create: wrapPromise(create),
  isBrowserSupported: isBrowserSupported,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION,
};

},{"../lib/analytics":53,"../lib/basic-component-verification":56,"../lib/braintree-error":57,"../lib/create-assets-url":60,"../lib/create-deferred-client":62,"./shared/errors":90,"./shared/supports-venmo":93,"./venmo":95,"@braintree/wrap-promise":35}],88:[function(_dereq_,module,exports){
"use strict";

var isAndroid = _dereq_("@braintree/browser-detection/is-android");
var isChrome = _dereq_("@braintree/browser-detection/is-chrome");
var isIos = _dereq_("@braintree/browser-detection/is-ios");
var isIosSafari = _dereq_("@braintree/browser-detection/is-ios-safari");
var isIosWebview = _dereq_("@braintree/browser-detection/is-ios-webview");
var isSamsung = _dereq_("@braintree/browser-detection/is-samsung");

function isAndroidWebview() {
  return (
    isAndroid() && window.navigator.userAgent.toLowerCase().indexOf("wv") > -1
  );
}

function doesNotSupportWindowOpenInIos() {
  if (!isIos()) {
    return false;
  }

  return isIosWebview() || !isIosSafari();
}

function isFacebookOwnedBrowserOnAndroid() {
  var ua = window.navigator.userAgent.toLowerCase();

  // Huawei's Facebook useragent does not include Android
  if (ua.indexOf("huawei") > -1 && ua.indexOf("fban") > -1) {
    return true;
  }

  if (!isAndroid()) {
    return false;
  }

  return ua.indexOf("fb_iab") > -1 || ua.indexOf("instagram") > -1;
}

// iOS chrome used to work with Venmo, but now it does not
// we are unsure if something changed in the iOS Chrome app
// itself, or if something about iOS webviews has changed
// until we find out more info, we've created a helper to
// easilly turn off iOS Chrome as a supported browser in
// the isBrowserSupported helper function
function isIosChrome() {
  return isIos() && isChrome();
}

module.exports = {
  isAndroid: isAndroid,
  isAndroidWebview: isAndroidWebview,
  isChrome: isChrome,
  isIos: isIos,
  isIosChrome: isIosChrome,
  isSamsung: isSamsung,
  isIosSafari: isIosSafari,
  isIosWebview: isIosWebview,
  isFacebookOwnedBrowserOnAndroid: isFacebookOwnedBrowserOnAndroid,
  doesNotSupportWindowOpenInIos: doesNotSupportWindowOpenInIos,
};

},{"@braintree/browser-detection/is-android":18,"@braintree/browser-detection/is-chrome":19,"@braintree/browser-detection/is-ios":23,"@braintree/browser-detection/is-ios-safari":20,"@braintree/browser-detection/is-ios-webview":21,"@braintree/browser-detection/is-samsung":24}],89:[function(_dereq_,module,exports){
"use strict";

/**
 * Venmo shared constants
 * @typedef {object} Venmo~venmoConstants
 * @ignore
 * @property {string} VENMO_APP_OR_MOBILE_AUTH_URL A deep-linked url that will open the Venmo app if installed, or navigate to a Venmo web-login experience if the Venmo app is not present.
 * @property {string} VENMO_MOBILE_APP_AUTH_ONLY_URL A deep-linked url that leads to a Venmo dead-end page if the Venmo app is not installed (page asks customer to download the app).
 * @property {string} VENMO_WEB_LOGIN_URL A non-deeplinked url that leads to a Venmo login page. For use when explicitly wanting to avoid using the Venmo mobile app via a deep-linked url.
 */
module.exports = {
  DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY: 500,
  DEFAULT_PROCESS_RESULTS_DELAY: 1000,
  VENMO_APP_OR_MOBILE_AUTH_URL: "https://venmo.com/go/checkout",
  VENMO_MOBILE_APP_AUTH_ONLY_URL: "https://venmo.com/braintree/checkout",
  VENMO_WEB_LOGIN_URL: "https://account.venmo.com/go/web",
};

},{}],90:[function(_dereq_,module,exports){
"use strict";

/**
 * @name BraintreeError.Venmo - Creation Error Codes
 * @description Errors that occur when [creating the Venmo component](./module-braintree-web_venmo.html#.create).
 * @property {MERCHANT} VENMO_NOT_ENABLED Occurs when Venmo is not enabled on the Braintree control panel.
 * @property {MERCHANT} VENMO_INVALID_PROFILE_ID Occurs when Venmo is initialized with a profile id, but it is invalid.
 * @property {UNKNOWN} VENMO_MOBILE_POLLING_SETUP_FAILED __Deprecated__ No longer returned. Use `VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED` instead.
 * @property {UNKNOWN} VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED Occurs when the request to set up a Venmo Payment Context object fails.
 */

/**
 * @name BraintreeError.Venmo - tokenize Error Codes
 * @description Errors that occur when using the [`tokenize` method](./Venmo.html#tokenize).
 * @property {CUSTOMER} VENMO_APP_CANCELED Occurs when customer cancels flow from the Venmo app.
 * @property {UNKNOWN} VENMO_APP_FAILED Occurs when tokenization fails.
 * @property {CUSTOMER} VENMO_CANCELED Occurs when customer cancels the flow or Venmo app is not available.
 * @property {CUSTOMER} VENMO_CUSTOMER_CANCELED Occurs when customer cancels the flow.
 * @property {CUSTOMER} VENMO_DESKTOP_CANCELED Occurs when customer cancels the Venmo Desktop flow by closing the modal.
 * @property {UNKNOWN} VENMO_DESKTOP_UNKNOWN_ERROR Occurs when an unknown error causes the Venmo Desktop flow to fail.
 * @property {UNKNOWN} VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR Occurs when an unknown network error causes the mobile polling process to fail.
 * @property {CUSTOMER} VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED Occurs when the polling has expired and the payment cannot be completed.
 * @property {CUSTOMER} VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED Occurs when the polling operation is canceled by the customer.
 * @property {CUSTOMER} VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT Occurs when customer takes too long to complete payment.
 * @property {UNKNOWN} VENMO_MOBILE_POLLING_TOKENIZATION_FAILED Occurs if there is an unknown error during the mobile polling process.
 * @property {NETWORK} VENMO_NETWORK_ERROR Occurs when a network error causes a request to fail.
 * @property {MERCHANT} VENMO_TOKENIZATION_CANCELED_BY_MERCHANT Occurs when `cancelTokenization` is called while tokenization is in progress.
 * @property {UNKNOWN} VENMO_TOKENIZATION_FAILED Occurs when there is an unknown error during the web login experience.
 * @property {MERCHANT} VENMO_TOKENIZATION_REQUEST_ACTIVE Occurs when `tokenize` is called when the flow is already in progress.
 * @property {MERCHANT} VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE Occurs when `cancelTokenization` is called when the flow is not in progress.
 */

var BraintreeError = _dereq_("../../lib/braintree-error");

module.exports = {
  VENMO_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: "VENMO_NOT_ENABLED",
    message: "Venmo is not enabled for this merchant.",
  },
  VENMO_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: "VENMO_TOKENIZATION_REQUEST_ACTIVE",
    message: "Another tokenization request is active.",
  },
  VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: "VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE",
    message: "No tokenization in progress.",
  },
  VENMO_APP_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: "VENMO_APP_FAILED",
    message: "Venmo app encountered a problem.",
  },
  VENMO_APP_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "VENMO_APP_CANCELED",
    message: "Venmo app authorization was canceled.",
  },
  VENMO_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "VENMO_CANCELED",
    message:
      "User canceled Venmo authorization, or Venmo app is not available.",
  },
  VENMO_CUSTOMER_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "VENMO_CUSTOMER_CANCELED",
    message: "User canceled Venmo authorization.",
  },
  VENMO_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: "VENMO_NETWORK_ERROR",
    message: "Something went wrong making the request",
  },
  VENMO_DESKTOP_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "VENMO_DESKTOP_CANCELED",
    message:
      "User canceled Venmo authorization by closing the Venmo Desktop modal.",
  },
  VENMO_TOKENIZATION_CANCELED_BY_MERCHANT: {
    type: BraintreeError.types.MERCHANT,
    code: "VENMO_TOKENIZATION_CANCELED_BY_MERCHANT",
    message: "The Venmo tokenization was canceled by the merchant.",
  },
  VENMO_DESKTOP_UNKNOWN_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: "VENMO_DESKTOP_UNKNOWN_ERROR",
    message: "Something went wrong with the Venmo Desktop flow.",
  },
  VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: "VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED",
    message: "Something went wrong creating the Venmo Payment Context.",
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: "VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR",
    message: "Something went wrong during mobile polling.",
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED: {
    type: BraintreeError.types.CUSTOMER,
    code: "VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED",
    message: "The Venmo authorization request is expired.",
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: "VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED",
    message: "The Venmo authorization was canceled",
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT: {
    type: BraintreeError.types.CUSTOMER,
    code: "VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT",
    message: "Customer took too long to authorize Venmo payment.",
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: "VENMO_MOBILE_POLLING_TOKENIZATION_FAILED",
    message: "The Venmo authorization failed.",
  },
  VENMO_INVALID_PROFILE_ID: {
    type: BraintreeError.types.MERCHANT,
    code: "VENMO_INVALID_PROFILE_ID",
    message: "Venmo profile ID is invalid.",
  },
  VENMO_INVALID_DEEP_LINK_RETURN_URL: {
    type: BraintreeError.types.MERCHANT,
    code: "VENMO_INVALID_DEEP_LINK_RETURN_URL",
    message: "Venmo deep link return URL is invalid.",
  },
  VENMO_TOKENIZATION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: "VENMO_TOKENIZATION_FAILED",
    message: "Venmo encountered a problem",
  },
};

},{"../../lib/braintree-error":57}],91:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENMO_DESKTOP_UNKNOWN_ERROR =
  exports.VENMO_DESKTOP_REQUEST_NEW_QR_CODE =
  exports.VENMO_DESKTOP_CLOSED_FROM_PARENT =
  exports.VENMO_DESKTOP_IFRAME_READY =
  exports.VENMO_DESKTOP_DISPLAY_QR_CODE =
  exports.VENMO_DESKTOP_DISPLAY_ERROR =
  exports.VENMO_DESKTOP_CUSTOMER_CANCELED =
  exports.VENMO_DESKTOP_AUTHORIZING =
  exports.VENMO_DESKTOP_AUTHORIZE =
  exports.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT =
    void 0;
exports.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT =
  "VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT";
exports.VENMO_DESKTOP_AUTHORIZE = "VENMO_DESKTOP_AUTHORIZE";
exports.VENMO_DESKTOP_AUTHORIZING = "VENMO_DESKTOP_AUTHORIZING";
exports.VENMO_DESKTOP_CUSTOMER_CANCELED = "VENMO_DESKTOP_CUSTOMER_CANCELED";
exports.VENMO_DESKTOP_DISPLAY_ERROR = "VENMO_DESKTOP_DISPLAY_ERROR";
exports.VENMO_DESKTOP_DISPLAY_QR_CODE = "VENMO_DESKTOP_DISPLAY_QR_CODE";
exports.VENMO_DESKTOP_IFRAME_READY = "VENMO_DESKTOP_IFRAME_READY";
exports.VENMO_DESKTOP_CLOSED_FROM_PARENT = "VENMO_DESKTOP_CLOSED_FROM_PARENT";
exports.VENMO_DESKTOP_REQUEST_NEW_QR_CODE = "VENMO_DESKTOP_REQUEST_NEW_QR_CODE";
exports.VENMO_DESKTOP_UNKNOWN_ERROR = "VENMO_DESKTOP_UNKNOWN_ERROR";

},{}],92:[function(_dereq_,module,exports){
"use strict";
var venmoConstants = _dereq_("./constants");

function getVenmoUrl(options) {
  if (options.useAllowDesktopWebLogin)
    return venmoConstants.VENMO_WEB_LOGIN_URL;

  if (options.mobileWebFallBack)
    return venmoConstants.VENMO_APP_OR_MOBILE_AUTH_URL;

  return venmoConstants.VENMO_MOBILE_APP_AUTH_ONLY_URL;
}

module.exports = getVenmoUrl;

},{"./constants":89}],93:[function(_dereq_,module,exports){
"use strict";

var browserDetection = _dereq_("./browser-detection");

function isBrowserSupported(options) {
  var merchantAllowsReturningToNewBrowserTab,
    merchantAllowsWebviews,
    merchantAllowsDesktopBrowsers;
  var isAndroid = browserDetection.isAndroid();
  var isMobileDevice = isAndroid || browserDetection.isIos();
  var isAndroidChrome = isAndroid && browserDetection.isChrome();
  var isMobileDeviceThatSupportsReturnToSameTab =
    browserDetection.isIosSafari() || isAndroidChrome;
  var isKnownUnsupportedMobileBrowser =
    browserDetection.isIosChrome() ||
    browserDetection.isFacebookOwnedBrowserOnAndroid() ||
    browserDetection.isSamsung();

  options = options || {};
  // NEXT_MAJOR_VERSION allowDesktop will default to true, but can be opted out
  merchantAllowsDesktopBrowsers = options.allowDesktop === true;
  merchantAllowsReturningToNewBrowserTab = options.hasOwnProperty(
    "allowNewBrowserTab"
  )
    ? options.allowNewBrowserTab
    : true;
  // NEXT_MAJOR_VERSION webviews are not supported, except for the case where
  // the merchant themselves is presenting venmo in a webview using the deep
  // link url to get back to their app. For the next major version, we should
  // just not have this option and instead require the merchant to determine
  // if the venmo button should be displayed when presenting it in the
  // merchant's app via a webview.
  merchantAllowsWebviews = options.hasOwnProperty("allowWebviews")
    ? options.allowWebviews
    : true;

  if (isKnownUnsupportedMobileBrowser) {
    return false;
  }

  if (
    !merchantAllowsWebviews &&
    (browserDetection.isAndroidWebview() || browserDetection.isIosWebview())
  ) {
    return false;
  }

  if (!isMobileDevice) {
    return merchantAllowsDesktopBrowsers;
  }

  if (!merchantAllowsReturningToNewBrowserTab) {
    return isMobileDeviceThatSupportsReturnToSameTab;
  }

  return isMobileDevice;
}

module.exports = {
  isBrowserSupported: isBrowserSupported,
};

},{"./browser-detection":88}],94:[function(_dereq_,module,exports){
"use strict";

var frameService = _dereq_("../../lib/frame-service/external");
var useMin = _dereq_("../../lib/use-min");
var ExtendedPromise = _dereq_("@braintree/extended-promise");

var VERSION = "3.92.2";
var VENMO_LOGO_SVG =
  '<svg width="198" height="58" viewBox="0 0 198 58" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0702 13.6572C44.1935 15.4585 44.6999 17.3139 44.6999 19.6576C44.6999 27.1328 38.1277 36.8436 32.7935 43.6625H20.6099L15.7236 15.2939L26.3917 14.3105L28.9751 34.4966C31.389 30.6783 34.3678 24.6779 34.3678 20.587C34.3678 18.3477 33.9727 16.8225 33.3553 15.5666L43.0702 13.6572Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M56.8965 26.1491C58.8596 26.1491 63.8018 25.2772 63.8018 22.5499C63.8018 21.2402 62.8481 20.587 61.7242 20.587C59.7579 20.587 57.1776 22.8763 56.8965 26.1491ZM56.6715 31.5506C56.6715 34.8807 58.5787 36.1873 61.107 36.1873C63.8603 36.1873 66.4966 35.534 69.923 33.8433L68.6324 42.3523C66.2183 43.4976 62.4559 44.2617 58.8039 44.2617C49.5403 44.2617 46.2249 38.8071 46.2249 31.9879C46.2249 23.1496 51.6179 13.765 62.7365 13.765C68.858 13.765 72.2809 17.0949 72.2809 21.7317C72.2815 29.2066 62.4005 31.4965 56.6715 31.5506Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M103.067 20.3142C103.067 21.4052 102.897 22.9875 102.727 24.0216L99.5262 43.6622H89.1385L92.0585 25.658C92.1139 25.1696 92.284 24.1865 92.284 23.6411C92.284 22.3314 91.4414 22.0047 90.4282 22.0047C89.0826 22.0047 87.7337 22.6042 86.8354 23.0418L83.5234 43.6625H73.0772L77.8495 14.257H86.8908L87.0052 16.6041C89.1382 15.2404 91.9469 13.7656 95.932 13.7656C101.212 13.765 103.067 16.3845 103.067 20.3142Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M133.906 16.9841C136.881 14.9131 139.69 13.765 143.563 13.765C148.897 13.765 150.753 16.3845 150.753 20.3142C150.753 21.4052 150.583 22.9875 150.413 24.0216L147.216 43.6622H136.825L139.801 25.2774C139.855 24.786 139.971 24.1865 139.971 23.8063C139.971 22.3317 139.128 22.0047 138.115 22.0047C136.824 22.0047 135.535 22.5501 134.577 23.0418L131.266 43.6625H120.878L123.854 25.2777C123.908 24.7863 124.02 24.1868 124.02 23.8065C124.02 22.332 123.177 22.0049 122.167 22.0049C120.819 22.0049 119.473 22.6045 118.574 23.0421L115.26 43.6628H104.817L109.589 14.2573H118.52L118.8 16.7122C120.878 15.241 123.684 13.7662 127.446 13.7662C130.704 13.765 132.837 15.129 133.906 16.9841Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M171.426 25.5502C171.426 23.1496 170.808 21.513 168.956 21.513C164.857 21.513 164.015 28.55 164.015 32.1498C164.015 34.8807 164.802 36.5709 166.653 36.5709C170.528 36.5709 171.426 29.1497 171.426 25.5502ZM153.458 31.7152C153.458 22.442 158.511 13.765 170.136 13.765C178.896 13.765 182.098 18.7854 182.098 25.7148C182.098 34.8805 177.099 44.3723 165.194 44.3723C156.378 44.3723 153.458 38.7525 153.458 31.7152Z" fill="white"/>\n</svg>';
var CONTINUE_OR_CANCEL_INSTRUCTIONS =
  "Tap cancel payment to cancel and return to the business. Continue payment will relaunch the payment window.";

var POPUP_WIDTH = 400;
var POPUP_HEIGHT = 570;
var ELEMENT_IDS = {
  backdrop: "venmo-desktop-web-backdrop",
  backdropHidden: "venmo-desktop-web-backdrop.hidden",
  backdropContainer: "venmo-backdrop-container",
  cancelButton: "venmo-popup-cancel-button",
  continueButton: "venmo-popup-continue-button",
  message: "venmo-message",
  instructions: "venmo-instructions",
  venmoLogo: "venmo-full-logo",
};

ExtendedPromise.suppressUnhandledPromiseMessage = true;

function openPopup(options) {
  var frameServiceInstance = options.frameServiceInstance;
  var venmoUrl = options.venmoUrl;
  var checkForStatusChange = options.checkForStatusChange;
  var cancelTokenization = options.cancelTokenization;
  var extendedPromise = new ExtendedPromise();

  document
    .getElementById(ELEMENT_IDS.continueButton)
    .addEventListener("click", function () {
      frameServiceInstance.focus();
    });
  document
    .getElementById(ELEMENT_IDS.cancelButton)
    .addEventListener("click", function () {
      frameServiceInstance.close();
      cancelTokenization();
      closeBackdrop();
    });

  frameServiceInstance.open({}, function (frameServiceErr) {
    var retryStartingCount = 1;

    if (frameServiceErr) {
      extendedPromise.reject(frameServiceErr);
    } else {
      checkForStatusChange(retryStartingCount)
        .then(function (data) {
          extendedPromise.resolve(data);
        })
        .catch(function (statusCheckError) {
          extendedPromise.reject(statusCheckError);
        });
    }
    frameServiceInstance.close();
    closeBackdrop();
  });
  frameServiceInstance.redirect(venmoUrl);

  return extendedPromise;
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

function closeBackdrop() {
  document.getElementById("venmo-desktop-web-backdrop").classList.add("hidden");
}

function getElementStyles() {
  var backdropStyles = [
    "#" + ELEMENT_IDS.backdropHidden + " {",
    "display: none;",
    "}",
    "#" + ELEMENT_IDS.backdrop + " {",
    "cursor: pointer;",
    "position: absolute;",
    "top: 0;",
    "left: 0;",
    "bottom: 0;",
    "width: 100%;",
    "background: rgba(0, 0, 0, 0.4);",
    "}",
  ];
  var backdropContainerStyles = [
    "#" + ELEMENT_IDS.backdropContainer + " {",
    "display: flex;",
    "align-content: center;",
    "justify-content: center;",
    "align-items: center;",
    "width: 100%;",
    "height: 100%;",
    "flex-direction: column;",
    "}",
  ];

  var cancelButtonStyles = [
    "#" + ELEMENT_IDS.cancelButton + " {",
    "height: 24px;",
    "width: 380px;",
    "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    "font-style: normal;",
    "font-weight: 700;",
    "font-size: 18px;",
    "line-height: 24px;",
    "text-align: center;",
    "background-color: transparent;",
    "border: none;",
    "color: #FFFFFF;",
    "margin-top: 28px;",
    "}",
  ];

  var continueButtonStyles = [
    "#" + ELEMENT_IDS.continueButton + " {",
    "width: 400px;",
    "height: 50px;",
    "background: #0074DE;",
    "border-radius: 24px;",
    "border: none;",
    "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    "font-style: normal;",
    "font-weight: 700;",
    "font-size: 18px;",
    "color: #FFFFFF;",
    "margin-top: 44px;",
    "}",
  ];

  var messageStyles = [
    "#" + ELEMENT_IDS.message + " {",
    "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    "font-style: normal;",
    "font-weight: 500;",
    "font-size: 24px;",
    "line-height: 32px;",
    "text-align: center;",
    "color: #FFFFFF;",
    "margin-top: 32px;",
    "}",
  ];

  var instructionStyles = [
    "#" + ELEMENT_IDS.instructions + " {",
    "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    "font-style: normal;",
    "font-weight: 400;",
    "font-size: 16px;",
    "line-height: 20px;",
    "text-align: center;",
    "color: #FFFFFF;",
    "margin-top: 16px;",
    "width: 400px;",
    "}",
  ];

  var allStyles = backdropStyles.concat(
    backdropContainerStyles,
    cancelButtonStyles,
    continueButtonStyles,
    messageStyles,
    instructionStyles
  );

  return allStyles.join("\n");
}

function buildAndStyleElements() {
  var alreadyRenderedBackdrop = document.getElementById(ELEMENT_IDS.backdrop);
  var backdropStylesElement,
    backdropDiv,
    backDropContentContainer,
    venmoLogoDiv,
    venmoMessageDiv,
    instructionsDiv,
    continueButton,
    cancelButton;

  if (alreadyRenderedBackdrop) {
    alreadyRenderedBackdrop.classList.remove("hidden");

    return;
  }
  backdropStylesElement = document.createElement("style");
  backdropDiv = document.createElement("div");
  backDropContentContainer = document.createElement("div");
  venmoLogoDiv = document.createElement("div");
  venmoMessageDiv = document.createElement("div");
  instructionsDiv = document.createElement("div");
  continueButton = document.createElement("button");
  cancelButton = document.createElement("button");

  backdropStylesElement.id = "venmo-desktop-web__injected-styles";
  backdropStylesElement.innerHTML = getElementStyles();

  backdropDiv.id = ELEMENT_IDS.backdrop;

  backDropContentContainer.id = ELEMENT_IDS.backdropContainer;

  venmoLogoDiv.id = ELEMENT_IDS.venmoLogo;
  venmoLogoDiv.innerHTML = VENMO_LOGO_SVG;

  venmoMessageDiv.id = ELEMENT_IDS.message;
  venmoMessageDiv.innerText = "What would you like to do?";

  instructionsDiv.id = ELEMENT_IDS.instructions;
  instructionsDiv.innerText = CONTINUE_OR_CANCEL_INSTRUCTIONS;

  continueButton.id = ELEMENT_IDS.continueButton;
  continueButton.innerText = "Continue payment";

  cancelButton.id = ELEMENT_IDS.cancelButton;
  cancelButton.innerText = "Cancel payment";

  document.head.appendChild(backdropStylesElement);
  backDropContentContainer.appendChild(venmoLogoDiv);
  backDropContentContainer.appendChild(venmoMessageDiv);
  backDropContentContainer.appendChild(instructionsDiv);
  backDropContentContainer.appendChild(continueButton);
  backDropContentContainer.appendChild(cancelButton);
  backdropDiv.appendChild(backDropContentContainer);
  document.body.appendChild(backdropDiv);
}

/**
 * Applies a backdrop over the page, and opens a popup to the supplied url. Uses supplied status and cancel functions to handle the flow.
 * @function runWebLogin
 * @ignore
 * @param {object} options Options for running the web login flow.
 * @param {string} options.venmoUrl Venmo url that is to be used for logging in.
 * @param {Venmo~checkPaymentContextStatusAndProcessResult} options.checkForStatusChange {@link Venmo~checkPaymentContextStatusAndProcessResult} to be invoked in order to check for a payment context status update.
 * @param {Venmo~cancelTokenization} options.cancelTokenization {@link Venmo~cancelTokenization} to be invoked when the appropriate payment context status is retrieved.
 * @param {boolean} options.debug A flag to control whether to use minified assets or not.
 * @returns {Promise} Returns a promise
 */
function runWebLogin(options) {
  buildAndStyleElements();

  return openPopup(options);
}

/**
 * When using frameservice, it needs to be created separately from the action of opening. The setup process includes
 * steps that browsers may consider async or too disconnected from the user action required to open a popup.
 *
 * This function enables us to do that setup at an appropriate time.
 * @function setupDesktopWebLogin
 * @ignore
 * @param {object} options Options use for setting up the Desktop Web Login flow.
 * @param {string} options.assetsUrl Url that points to the hosted Braintree assets.
 * @param {boolean} options.debug A flag to control whether to use minified assets or not.

 * @returns {Promise} Returns a promise
 */
function setupDesktopWebLogin(options) {
  var extendedPromise = new ExtendedPromise();
  var popupName = "venmoDesktopWebLogin";
  var assetsUrl = options.assetsUrl;
  var debug = options.debug || false;
  var popupLocation = centeredPopupDimensions();
  var assetsBaseUrl = assetsUrl + "/web/" + VERSION + "/html";

  frameService.create(
    {
      name: popupName,
      dispatchFrameUrl:
        assetsBaseUrl + "/dispatch-frame" + useMin(debug) + ".html",
      openFrameUrl:
        assetsBaseUrl + "/venmo-landing-frame" + useMin(debug) + ".html",
      top: popupLocation.top,
      left: popupLocation.left,
      height: POPUP_HEIGHT,
      width: POPUP_WIDTH,
    },
    function (frameServiceInstance) {
      extendedPromise.resolve(frameServiceInstance);
    }
  );

  return extendedPromise;
}

module.exports = {
  runWebLogin: runWebLogin,
  openPopup: openPopup,
  setupDesktopWebLogin: setupDesktopWebLogin,
  POPUP_WIDTH: POPUP_WIDTH,
  POPUP_HEIGHT: POPUP_HEIGHT,
};

},{"../../lib/frame-service/external":66,"../../lib/use-min":82,"@braintree/extended-promise":26}],95:[function(_dereq_,module,exports){
"use strict";

var analytics = _dereq_("../lib/analytics");
var isBrowserSupported = _dereq_("./shared/supports-venmo");
var browserDetection = _dereq_("./shared/browser-detection");
var constants = _dereq_("./shared/constants");
var errors = _dereq_("./shared/errors");
var querystring = _dereq_("../lib/querystring");
var isVerifiedDomain = _dereq_("../lib/is-verified-domain");
var methods = _dereq_("../lib/methods");
var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var BraintreeError = _dereq_("../lib/braintree-error");
var inIframe = _dereq_("../lib/in-iframe");
var ExtendedPromise = _dereq_("@braintree/extended-promise");
var getVenmoUrl = _dereq_("./shared/get-venmo-url");
var desktopWebLogin = _dereq_("./shared/web-login-backdrop");
var snakeCaseToCamelCase = _dereq_("../lib/snake-case-to-camel-case");

// NEXT_MAJOR_VERSION the source code for this is actually in a
// typescript repo called venmo-desktop, once the SDK is migrated
// to typescript, we can move the TS files out of that separate
// repo and into the web SDK properly
var createVenmoDesktop = _dereq_("./external/");
var graphqlQueries = _dereq_("./external/queries");

var VERSION = "3.92.2";
var DEFAULT_MOBILE_POLLING_INTERVAL = 250; // 1/4 second
var DEFAULT_MOBILE_EXPIRING_THRESHOLD = 300000; // 5 minutes

ExtendedPromise.suppressUnhandledPromiseMessage = true;

/**
 * Venmo tokenize payload.
 * @typedef {object} Venmo~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `VenmoAccount`.
 * @property {object} details Additional Venmo account details.
 * @property {string} details.username The username of the Venmo account.
 * @property {string} details.paymentContextId The context ID of the Venmo payment. Only available when used with {@link https://braintree.github.io/braintree-web/current/module-braintree-web_venmo.html#.create|`paymentMethodUsage`}.
 */

/**
 * @class
 * @param {object} options The Venmo {@link module:braintree-web/venmo.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/venmo.create|braintree-web.venmo.create} instead.</strong>
 * @classdesc This class represents a Venmo component produced by {@link module:braintree-web/venmo.create|braintree-web/venmo.create}. Instances of this class have methods for tokenizing Venmo payments.
 */
function Venmo(options) {
  var self = this;

  this._allowDesktopWebLogin = options.allowDesktopWebLogin || false;
  this._mobileWebFallBack = options.mobileWebFallBack || false;
  this._createPromise = options.createPromise;
  this._allowNewBrowserTab = options.allowNewBrowserTab !== false;
  this._allowWebviews = options.allowWebviews !== false;
  this._allowDesktop = options.allowDesktop === true;
  this._useRedirectForIOS = options.useRedirectForIOS === true;
  this._profileId = options.profileId;
  this._displayName = options.displayName;
  this._deepLinkReturnUrl = options.deepLinkReturnUrl;
  this._ignoreHistoryChanges = options.ignoreHistoryChanges;
  this._paymentMethodUsage = (options.paymentMethodUsage || "").toUpperCase();
  this._shouldUseLegacyFlow = !this._paymentMethodUsage;
  this._requireManualReturn = options.requireManualReturn === true;
  this._useDesktopQRFlow =
    this._allowDesktop && this._isDesktop() && !this._allowDesktopWebLogin;
  this._useAllowDesktopWebLogin =
    this._allowDesktopWebLogin && this._isDesktop();
  this._cannotHaveReturnUrls = inIframe() || this._requireManualReturn;
  this._allowAndroidRecreation = options.allowAndroidRecreation !== false;
  this._maxRetryCount = 3;

  this._shouldCreateVenmoPaymentContext =
    this._cannotHaveReturnUrls || !this._shouldUseLegacyFlow;

  analytics.sendEvent(
    this._createPromise,
    "venmo.desktop-flow.configured." + String(Boolean(this._allowDesktop))
  );

  // if the url has a tokenization result, that indicates
  // that it cannot be the desktop flow or the manual return
  // flow. If it's the hash change with paymentMethodUsage
  // flow, we want to skip creating a new payment context, since
  // there is already a pending payment context waiting to be
  // processed. For the hash change flow without paymentMethodUsage,
  // no further actions are needed.
  if (this.hasTokenizationResult()) {
    analytics.sendEvent(
      this._createPromise,
      "venmo.appswitch.return-in-new-tab"
    );
  } else if (this._useDesktopQRFlow) {
    this._createPromise = this._createPromise.then(function (client) {
      var config = client.getConfiguration().gatewayConfiguration;

      return createVenmoDesktop({
        url:
          config.assetsUrl +
          "/web/" +
          VERSION +
          "/html/venmo-desktop-frame.html",
        environment:
          config.environment === "production" ? "PRODUCTION" : "SANDBOX",
        profileId: self._profileId || config.payWithVenmo.merchantId,
        paymentMethodUsage: self._paymentMethodUsage,
        displayName: self._displayName,
        Promise: Promise,
        apiRequest: function (query, data) {
          return client
            .request({
              api: "graphQLApi",
              data: {
                query: query,
                variables: data,
              },
            })
            .then(function (response) {
              return response.data;
            });
        },
        sendEvent: function (eventName) {
          analytics.sendEvent(self._createPromise, eventName);
        },
        verifyDomain: isVerifiedDomain,
      })
        .then(function (venmoDesktopInstance) {
          self._venmoDesktopInstance = venmoDesktopInstance;
          analytics.sendEvent(
            self._createPromise,
            "venmo.desktop-flow.presented"
          );

          return client;
        })
        .catch(function () {
          analytics.sendEvent(
            self._createPromise,
            "venmo.desktop-flow.setup-failed"
          );
          self._useDesktopQRFlow = false;

          return client;
        });
    });
  } else if (this._shouldCreateVenmoPaymentContext) {
    // these variables are only relevant for the manual return flow
    // and they are only set to make testing easier (so they can
    // be overwritten with smaller values in the tests)
    this._mobilePollingInterval = DEFAULT_MOBILE_POLLING_INTERVAL;
    this._mobilePollingExpiresThreshold = DEFAULT_MOBILE_EXPIRING_THRESHOLD;

    this._createPromise = this._createPromise.then(function (client) {
      var paymentContextPromise, webLoginPromise;
      var analyticsCategory = self._cannotHaveReturnUrls
        ? "manual-return"
        : "mobile-payment-context";
      var config = client.getConfiguration();

      webLoginPromise = desktopWebLogin
        .setupDesktopWebLogin({
          assetsUrl: config.gatewayConfiguration.assetsUrl,
          debug: config.isDebug,
        })
        .then(function (frameServiceInstance) {
          self._frameServiceInstance = frameServiceInstance;
        })
        .catch(function (desktopWebErr) {
          return desktopWebErr;
        });

      self._mobilePollingContextEnvironment =
        config.gatewayConfiguration.environment.toUpperCase();

      paymentContextPromise = self
        ._createVenmoPaymentContext(client)
        .then(function () {
          analytics.sendEvent(
            self._createPromise,
            "venmo." + analyticsCategory + ".presented"
          );

          return client;
        })
        .catch(function (err) {
          analytics.sendEvent(
            self._createPromise,
            "venmo." + analyticsCategory + ".setup-failed"
          );

          return Promise.reject(
            new BraintreeError({
              type: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.type,
              code: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.code,
              message: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.message,
              details: {
                originalError: err,
              },
            })
          );
        });

      return ExtendedPromise.all([webLoginPromise, paymentContextPromise])
        .then(function (results) {
          var paymentContextResult = results[1]; // We only care about the returned value of the paymentContextPromise

          return Promise.resolve(paymentContextResult);
        })
        .catch(function (promiseErr) {
          // ExtendedPromise.all returns just one error and it's either which fails first/at all.
          return Promise.reject(promiseErr);
        });
    });
  }
}

Venmo.prototype._createVenmoPaymentContext = function (
  client,
  cancelIfTokenizationInProgress
) {
  var self = this;
  var promise;

  if (!this._shouldCreateVenmoPaymentContext) {
    return Promise.resolve();
  }

  if (this._shouldUseLegacyFlow) {
    promise = client
      .request({
        api: "graphQLApi",
        data: {
          query: graphqlQueries.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY,
          variables: {
            input: {
              environment: this._mobilePollingContextEnvironment,
              intent: "PAY_FROM_APP",
            },
          },
        },
      })
      .then(function (response) {
        return response
          .data.createVenmoQRCodePaymentContext.venmoQRCodePaymentContext;
      });
  } else {
    promise = client
      .request({
        api: "graphQLApi",
        data: {
          query: graphqlQueries.CREATE_PAYMENT_CONTEXT_QUERY,
          variables: {
            input: {
              paymentMethodUsage: this._paymentMethodUsage,
              intent: "CONTINUE",
              customerClient: "MOBILE_WEB",
              displayName: this._displayName,
            },
          },
        },
      })
      .then(function (response) {
        return response.data.createVenmoPaymentContext.venmoPaymentContext;
      });
  }

  return promise.then(function (context) {
    var expiredTime = new Date(context.expiresAt) - new Date(context.createdAt);
    var refreshIn = expiredTime * 0.6666;

    // prevents multiple setTimeouts from firing from separate calls
    // to create a payment context by canceling the previous one
    // if there is a pending call
    clearTimeout(self._refreshPaymentContextTimeout);
    self._refreshPaymentContextTimeout = setTimeout(function () {
      if (self._tokenizationInProgress) {
        return;
      }
      self._createVenmoPaymentContext(client, true);
    }, refreshIn);

    if (cancelIfTokenizationInProgress && self._tokenizationInProgress) {
      return;
    }

    self._venmoPaymentContextStatus = context.status;
    self._venmoPaymentContextId = context.id;
  });
};

Venmo.prototype.appSwitch = function (url) {
  if (this._deepLinkReturnUrl) {
    if (isIosWebviewInDeepLinkReturnUrlFlow()) {
      analytics.sendEvent(
        this._createPromise,
        "venmo.appswitch.start.ios-webview"
      );
      // Deep link URLs do not launch iOS apps from a webview when using window.open or PopupBridge.open.
      window.location.href = url;
    } else if (
      window.popupBridge &&
      typeof window.popupBridge.open === "function"
    ) {
      analytics.sendEvent(
        this._createPromise,
        "venmo.appswitch.start.popup-bridge"
      );
      window.popupBridge.open(url);
    } else {
      analytics.sendEvent(this._createPromise, "venmo.appswitch.start.webview");
      window.open(url);
    }
  } else {
    analytics.sendEvent(this._createPromise, "venmo.appswitch.start.browser");

    if (
      browserDetection.doesNotSupportWindowOpenInIos() ||
      this._shouldUseRedirectStrategy()
    ) {
      window.location.href = url;
    } else {
      window.open(url);
    }
  }
};

Venmo.prototype.getUrl = function () {
  return this._createPromise.then(
    function (client) {
      var configuration = client.getConfiguration();
      var params = {};
      var currentUrl =
        this._deepLinkReturnUrl ||
        window.location.href.replace(window.location.hash, "");
      var venmoConfiguration = configuration.gatewayConfiguration.payWithVenmo;
      var analyticsMetadata = configuration.analyticsMetadata;
      var accessToken = venmoConfiguration.accessToken;
      var braintreeData = {
        _meta: {
          version: analyticsMetadata.sdkVersion,
          integration: analyticsMetadata.integration,
          platform: analyticsMetadata.platform,
          sessionId: analyticsMetadata.sessionId,
        },
      };

      this._isDebug = configuration.isDebug;
      this._assetsUrl = configuration.gatewayConfiguration.assetsUrl;

      currentUrl = currentUrl.replace(/#*$/, "");

      /* eslint-disable camelcase */
      if (this._venmoPaymentContextId) {
        if (this._shouldUseLegacyFlow) {
          // NEXT_MAJOR_VERSION stop adding the context id to the access token.
          // the context id is placed here for backwards compatiblity
          // with versions of the venmo app that did not support
          // pulling the resource id off of the query params
          accessToken += "|pcid:" + this._venmoPaymentContextId;
        } else {
          params.resource_id = this._venmoPaymentContextId;
        }
      }

      if (this._shouldIncludeReturnUrls() || this._useAllowDesktopWebLogin) {
        if (this._useAllowDesktopWebLogin) {
          currentUrl =
            this._assetsUrl + "/web/" + VERSION + "/html/redirect-frame.html";
        }
        params["x-success"] = currentUrl + "#venmoSuccess=1";
        params["x-cancel"] = currentUrl + "#venmoCancel=1";
        params["x-error"] = currentUrl + "#venmoError=1";
      } else {
        params["x-success"] = "NOOP";
        params["x-cancel"] = "NOOP";
        params["x-error"] = "NOOP";
      }

      if (!this._allowAndroidRecreation) {
        params.allowAndroidRecreation = 0;
      } else {
        params.allowAndroidRecreation = 1;
      }

      params.ua = window.navigator.userAgent;
      params.braintree_merchant_id =
        this._profileId || venmoConfiguration.merchantId;
      params.braintree_access_token = accessToken;
      params.braintree_environment = venmoConfiguration.environment;
      params.braintree_sdk_data = btoa(JSON.stringify(braintreeData));

      return (
        getVenmoUrl({
          useAllowDesktopWebLogin: this._useAllowDesktopWebLogin,
          mobileWebFallBack: this._mobileWebFallBack,
        }) +
        "?" +
        querystring.stringify(params)
      );
    }.bind(this)
  );
};

/**
 * Returns a boolean indicating whether the current browser supports Venmo as a payment method.
 *
 * If `options.allowNewBrowserTab` is false when calling {@link module:braintree-web/venmo.create|venmo.create}, this method will return true only for browsers known to support returning from the Venmo app to the same browser tab. Currently, this is limited to iOS Safari and Android Chrome.
 * If `options.allowWebviews` is false when calling {@link module:braintree-web/venmo.create|venmo.create}, this method will return true only for mobile browsers that are not webviews.
 * @public
 * @returns {boolean} True if the current browser is supported, false if not.
 */
Venmo.prototype.isBrowserSupported = function () {
  return isBrowserSupported.isBrowserSupported({
    allowNewBrowserTab: this._allowNewBrowserTab,
    allowWebviews: this._allowWebviews,
    allowDesktop: this._allowDesktop,
  });
};

/**
 * Returns a boolean indicating whether a Venmo tokenization result is ready to be processed immediately.
 *
 * This method should be called after initialization to see if the result of Venmo authorization is available. If it returns true, call {@link Venmo#tokenize|tokenize} immediately to process the results.
 *
 * @public
 * @returns {boolean} True if the results of Venmo payment authorization are available and ready to process.
 */
Venmo.prototype.hasTokenizationResult = function () {
  return this._hasTokenizationResult();
};

// a private version that lets us pass in a custom hash
// when listening on a hashchange event
Venmo.prototype._hasTokenizationResult = function (hash) {
  var params = getFragmentParameters(hash);

  return (
    typeof (params.venmoSuccess || params.venmoError || params.venmoCancel) !==
    "undefined"
  );
};

Venmo.prototype._shouldIncludeReturnUrls = function () {
  // when a deep link return url is passed, we should always
  // respect it and include the return urls so the venmo app
  // can app switch back to it
  if (this._deepLinkReturnUrl) {
    return true;
  }

  // when the sdk is initialized within an iframe, it's
  // impossible to return back to the correct place automatically
  // without also setting a deepLinkReturnUrl. When the return
  // urls are omitted, the Venmo app prompts the user to return
  // manually.
  return !this._cannotHaveReturnUrls;
};

Venmo.prototype._isDesktop = function () {
  return !(browserDetection.isIos() || browserDetection.isAndroid());
};

/**
 * Launches the Venmo flow and returns a nonce payload.
 *
 * If {@link Venmo#hasTokenizationResult|hasTokenizationResult} returns true, calling tokenize will immediately process and return the results without initiating the Venmo payment authorization flow.
 *
 * Only one Venmo flow can be active at a time. One way to achieve this is to disable your Venmo button while the flow is open.
 * @public
 * @param {object} [options] Options for tokenization.
 * @param {number} [options.processResultsDelay=500] The amount of time in milliseconds to delay processing the results. In most cases, this value should be left as the default.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link Venmo~tokenizePayload|tokenizePayload}. If no callback is provided, the method will return a Promise that resolves with a {@link Venmo~tokenizePayload|tokenizePayload}.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * button.addEventListener('click', function () {
 *   // Disable the button so that we don't attempt to open multiple popups.
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because tokenize opens a new window, this must be called
 *   // as a result of a user action, such as a button click.
 *   venmoInstance.tokenize().then(function (payload) {
 *     // Submit payload.nonce to your server
 *     // Use payload.username to get the Venmo username and display any UI
 *   }).catch(function (tokenizeError) {
 *     // Handle flow errors or premature flow closure
 *     switch (tokenizeErr.code) {
 *       case 'VENMO_APP_CANCELED':
 *         console.log('User canceled Venmo flow.');
 *         break;
 *       case 'VENMO_CANCELED':
 *         console.log('User canceled Venmo, or Venmo app is not available.');
 *         break;
 *       default:
 *         console.error('Error!', tokenizeErr);
 *     }
 *   }).then(function () {
 *     button.removeAttribute('disabled');
 *   });
 * });
 */
Venmo.prototype.tokenize = function (options) {
  var self = this;
  var tokenizationPromise;

  options = options || {};

  if (this._tokenizationInProgress === true) {
    return Promise.reject(
      new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_ACTIVE)
    );
  }

  this._tokenizationInProgress = true;
  if (this._useDesktopQRFlow) {
    // for the desktop flow, we create a venmo payment
    // context and then present a qr code modal to the
    // customer and they will open up their venmo app
    // and scan it and approve the purchase on their
    // mobile device. The sdk will start polling
    // in order to determine when the status of the
    // payment context has updated and then pass the
    // resulting nonce back to the merchant.
    tokenizationPromise = this._tokenizeForDesktopQRFlow(options);
  } else if (this._useAllowDesktopWebLogin) {
    /**
     * For Desktop Web Login, we open a browser popup to allow for authorization. Once authorized, the redirect urls are used by Venmo, and we query the API for a payment context status update.
     *
     * - Payment context is created on initialization
     * - Popup is opened to Venmo login url.
     *  - The payment is authorized or canceled, and the popup is closed
     * - Once the popup is closed, we query the API for a payment context status update
     *
     * This is an alternate, opt-in flow to be used the Desktop QR Flow is not desired for Pay with Venmo desktop experiences.
     */
    tokenizationPromise = this._tokenizeWebLoginWithRedirect();
  } else if (this._cannotHaveReturnUrls) {
    // in the manual return strategy, we create the payment
    // context on initialization, then continually poll once
    // the app switch begins until we get a response indiciating
    // the payment context was approved by the customer on the
    // Venmo app. The payment context response also includes a
    // nonce. There are 2 cases where we use the manual return
    // strategy:
    // 1. the sdk is instantiated in an iframe, because
    //    the venmo app is unable to redirect automatically
    //    when that is the case so we rely on the customer
    //    to do a manual redirect and continunally poll for
    //    updates on the payment context to get the nonce
    // 2. same deal for when `requireManualReturn` is configured
    tokenizationPromise = this._tokenizeForMobileWithManualReturn();
  } else {
    // the default mobile flow is to app switch to the
    // venmo app, and then have the venmo app switch
    // back to the page with the venmo nonce details
    // encoded into the hash portion of the url. If
    // `paymentMethodUsage` is provided when instantiating
    // the sdk, we also create a payment context and pass
    // the resource id to the Venmo app during the app switch.
    // Once we get a succesful return, we ping the payment
    // context query to get any additional data needed
    // to send back to the merchant.
    tokenizationPromise =
      this._tokenizeForMobileWithHashChangeListeners(options);
  }

  return tokenizationPromise
    .then(function (payload) {
      return self._createPromise
        .then(function (client) {
          return self._createVenmoPaymentContext(client);
        })
        .then(function () {
          self._tokenizationInProgress = false;

          return formatTokenizePayload(payload);
        });
    })
    .catch(function (err) {
      return self._createPromise
        .then(function (client) {
          // We create a new Payment Context because if the last one failed, then presumably we don't want to use it again. 
          // On the first pass, we create the payment context at initialization, and since we used that first one we now need to create a new one
          // for the next time someone tries to tokenize. 
          return self._createVenmoPaymentContext(client);
        })
        .then(function () {
          self._tokenizationInProgress = false;

          return Promise.reject(err);
        });
    });
};

/**
 * Cancels the venmo tokenization process
 *
 * @public
 * @function Venmo~cancelTokenization
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * venmoTokenizeButton.addEventListener('click', function () {
 *   venmoInstance.tokenize().then(function (payload) {
 *     // handle payload
 *   }).catch(function (err) {
 *     if (err.code === 'VENMO_TOKENIZATION_CANCELED_BY_MERCHANT') {
 *       // tokenization was canceled by calling cancelTokenization
 *     }
 *   });
 * });
 *
 * venmoCancelButton.addEventListener('click', function () {
 *   // Hide the button when the venmo flow is not in progress
 *   venmoCancelButton.style.display = "none";
 *
 *   venmoInstance.cancelTokenization().then(function () {
 *     // done canceling the flow
 *   }).catch(function (err) {
 *     // should only get here if there is no tokenization in progress
 *   });
 * });
 */
Venmo.prototype.cancelTokenization = function () {
  if (!this._tokenizationInProgress) {
    return Promise.reject(
      new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE)
    );
  }

  this._removeVisibilityEventListener();

  // important to reject the tokenization promise first
  // so the tokenize method rejects with this error
  // rather than a customer canceled error in the mobile
  // polling and desktop flows
  if (this._tokenizePromise) {
    this._tokenizePromise.reject(
      new BraintreeError(errors.VENMO_TOKENIZATION_CANCELED_BY_MERCHANT)
    );
  }

  return Promise.all([
    this._cancelMobilePaymentContext(),
    this._cancelVenmoDesktopContext(),
  ]);
};

Venmo.prototype._tokenizeWebLoginWithRedirect = function () {
  var self = this;

  analytics.sendEvent(self._createPromise, "venmo.tokenize.web-login.start");
  this._tokenizePromise = new ExtendedPromise();

  return this.getUrl().then(function (url) {
    desktopWebLogin
      .runWebLogin({
        checkForStatusChange:
          self._checkPaymentContextStatusAndProcessResult.bind(self),
        cancelTokenization: self.cancelTokenization.bind(self),
        frameServiceInstance: self._frameServiceInstance,
        venmoUrl: url,
        debug: self._isDebug,
      })
      .then(function (payload) {
        analytics.sendEvent(
          self._createPromise,
          "venmo.tokenize.web-login.success"
        );

        self._tokenizePromise.resolve({
          paymentMethodNonce: payload.paymentMethodId,
          username: payload.userName,
          payerInfo: payload.payerInfo,
          id: self._venmoPaymentContextId,
        });
      })
      .catch(function (err) {
        analytics.sendEvent(
          self._createPromise,
          "venmo.tokenize.web-login.failure"
        );

        self._tokenizePromise.reject(err);
      });

    return self._tokenizePromise;
  });
};

Venmo.prototype._queryPaymentContextStatus = function (id) {
  var self = this;

  return this._createPromise
    .then(function (client) {
      var query = self._shouldUseLegacyFlow
        ? graphqlQueries.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY
        : graphqlQueries.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;

      return client.request({
        api: "graphQLApi",
        data: {
          query: query,
          variables: {
            id: id,
          },
        },
      });
    })
    .then(function (response) {
      return response.data.node;
    });
};

/**
 * Queries the GraphQL API to get the payment context and process the status. Retries until there is an update to the payment context status.
 * @name Venmo~checkPaymentContextStatusAndProcessResult
 * @ignore
 * @param {number} retryCount The counter for tracking number of retries made against the API.
 * @returns {Promise} Returns a promise
 */
Venmo.prototype._checkPaymentContextStatusAndProcessResult = function (
  retryCount
) {
  var self = this;

  return self
    ._queryPaymentContextStatus(self._venmoPaymentContextId)
    .catch(function (networkError) {
      return Promise.reject(
        new BraintreeError({
          type: errors.VENMO_NETWORK_ERROR.type,
          code: errors.VENMO_NETWORK_ERROR.code,
          message: errors.VENMO_NETWORK_ERROR.message,
          details: networkError,
        })
      );
    })
    .then(function (node) {
      var resultStatus = node.status;

      if (resultStatus !== self._venmoPaymentContextStatus) {
        self._venmoPaymentContextStatus = resultStatus;

        analytics.sendEvent(
          self._createPromise,
          "venmo.tokenize.web-login.status-change"
        );

        switch (resultStatus) {
          case "APPROVED":
            return Promise.resolve(node);
          case "CANCELED":
            return Promise.reject(
              new BraintreeError(errors.VENMO_CUSTOMER_CANCELED)
            );
          case "FAILED":
            return Promise.reject(
              new BraintreeError(errors.VENMO_TOKENIZATION_FAILED)
            );
          default:
        }
      }

      return new Promise(function (resolve, reject) {
        if (retryCount < self._maxRetryCount) {
          retryCount++;

          return self
            ._checkPaymentContextStatusAndProcessResult(retryCount)
            .then(resolve)
            .catch(reject);
        }

        return reject(new BraintreeError(errors.VENMO_TOKENIZATION_FAILED));
      });
    });
};

Venmo.prototype._pollForStatusChange = function () {
  var self = this;

  if (Date.now() > self._mobilePollingContextExpiresIn) {
    return Promise.reject(
      new BraintreeError(errors.VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT)
    );
  }

  return this._queryPaymentContextStatus(this._venmoPaymentContextId)
    .catch(function (networkError) {
      return Promise.reject(
        new BraintreeError({
          type: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.type,
          code: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.code,
          message:
            errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.message,
          details: {
            originalError: networkError,
          },
        })
      );
    })
    .then(function (node) {
      var newStatus = node.status;

      if (newStatus !== self._venmoPaymentContextStatus) {
        self._venmoPaymentContextStatus = newStatus;

        analytics.sendEvent(
          self._createPromise,
          "venmo.tokenize.manual-return.status-change." +
            newStatus.toLowerCase()
        );

        switch (newStatus) {
          case "EXPIRED":
          case "FAILED":
          case "CANCELED":
            return Promise.reject(
              new BraintreeError(
                errors["VENMO_MOBILE_POLLING_TOKENIZATION_" + newStatus]
              )
            );
          case "APPROVED":
            return Promise.resolve(node);
          case "CREATED":
          case "SCANNED":
          default:
          // any other statuses are irrelevant to the polling
          // and can just be ignored
        }
      }

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          self._pollForStatusChange().then(resolve).catch(reject);
        }, self._mobilePollingInterval);
      });
    });
};

Venmo.prototype._tokenizeForMobileWithManualReturn = function () {
  var self = this;

  analytics.sendEvent(
    this._createPromise,
    "venmo.tokenize.manual-return.start"
  );

  this._mobilePollingContextExpiresIn =
    Date.now() + this._mobilePollingExpiresThreshold;
  this._tokenizePromise = new ExtendedPromise();

  this._pollForStatusChange()
    .then(function (payload) {
      analytics.sendEvent(
        self._createPromise,
        "venmo.tokenize.manual-return.success"
      );

      self._tokenizePromise.resolve({
        paymentMethodNonce: payload.paymentMethodId,
        username: payload.userName,
        payerInfo: payload.payerInfo,
        id: self._venmoPaymentContextId,
      });
    })
    .catch(function (err) {
      analytics.sendEvent(
        self._createPromise,
        "venmo.tokenize.manual-return.failure"
      );

      self._tokenizePromise.reject(err);
    });

  return this.getUrl().then(function (url) {
    self.appSwitch(url);

    return self._tokenizePromise;
  });
};

Venmo.prototype._shouldUseRedirectStrategy = function () {
  if (!browserDetection.isIos()) {
    return false;
  }

  if (this._mobileWebFallBack === true) {
    return true;
  }

  return this._useRedirectForIOS;
};

Venmo.prototype._tokenizeForMobileWithHashChangeListeners = function (options) {
  var self = this;
  var resultProcessingInProgress, visibilityChangeListenerTimeout;

  if (this.hasTokenizationResult()) {
    return this.processHashChangeFlowResults();
  }

  analytics.sendEvent(this._createPromise, "venmo.tokenize.mobile.start");
  this._tokenizePromise = new ExtendedPromise();

  this._previousHash = window.location.hash;

  function completeFlow(hash) {
    var error;

    self
      .processHashChangeFlowResults(hash)
      .catch(function (err) {
        error = err;
      })
      .then(function (res) {
        if (
          !self._ignoreHistoryChanges &&
          window.location.hash !== self._previousHash
        ) {
          window.location.hash = self._previousHash;
        }
        self._removeVisibilityEventListener();

        if (error) {
          self._tokenizePromise.reject(error);
        } else {
          self._tokenizePromise.resolve(res);
        }
        delete self._tokenizePromise;
      });
  }

  // The Venmo SDK app switches back with the results of the
  // tokenization encoded in the hash
  this._onHashChangeListener = function (e) {
    var hash = e.newURL.split("#")[1];

    if (!self._hasTokenizationResult(hash)) {
      return;
    }

    resultProcessingInProgress = true;
    clearTimeout(visibilityChangeListenerTimeout);
    completeFlow(hash);
  };

  window.addEventListener("hashchange", this._onHashChangeListener, false);

  // Subscribe to document visibility change events to detect when app switch
  // has returned. Acts as a fallback for the hashchange listener and catches
  // the cancel case via manual app switch back
  this._visibilityChangeListener = function () {
    var delay =
      options.processResultsDelay || constants.DEFAULT_PROCESS_RESULTS_DELAY;

    if (!window.document.hidden) {
      if (!resultProcessingInProgress) {
        visibilityChangeListenerTimeout = setTimeout(completeFlow, delay);
      }
    }
  };

  return this.getUrl().then(function (url) {
    self.appSwitch(url);

    // Add a brief delay to ignore visibility change events that occur right before app switch
    setTimeout(function () {
      window.document.addEventListener(
        documentVisibilityChangeEventName(),
        self._visibilityChangeListener
      );
    }, constants.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY);

    return self._tokenizePromise;
  });
};

Venmo.prototype._tokenizeForDesktopQRFlow = function () {
  var self = this;

  analytics.sendEvent(this._createPromise, "venmo.tokenize.desktop.start");

  this._tokenizePromise = new ExtendedPromise();

  this._createPromise
    .then(function () {
      return self._venmoDesktopInstance.launchDesktopFlow();
    })
    .then(function (payload) {
      self._venmoDesktopInstance.hideDesktopFlow();

      analytics.sendEvent(
        self._createPromise,
        "venmo.tokenize.desktop.success"
      );

      self._tokenizePromise.resolve(payload);
    })
    .catch(function (err) {
      analytics.sendEvent(
        self._createPromise,
        "venmo.tokenize.desktop.failure"
      );

      if (self._venmoDesktopInstance) {
        self._venmoDesktopInstance.hideDesktopFlow();
      }

      if (err && err.reason === "CUSTOMER_CANCELED") {
        self._tokenizePromise.reject(
          new BraintreeError(errors.VENMO_DESKTOP_CANCELED)
        );

        return;
      }

      self._tokenizePromise.reject(
        new BraintreeError({
          type: errors.VENMO_DESKTOP_UNKNOWN_ERROR.type,
          code: errors.VENMO_DESKTOP_UNKNOWN_ERROR.code,
          message: errors.VENMO_DESKTOP_UNKNOWN_ERROR.message,
          details: {
            originalError: err,
          },
        })
      );
    });

  return this._tokenizePromise;
};

Venmo.prototype._cancelMobilePaymentContext = function () {
  var self = this;

  return this._createPromise.then(function (client) {
    var query;

    if (self._venmoPaymentContextId) {
      query = self._shouldUseLegacyFlow
        ? graphqlQueries.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY
        : graphqlQueries.UPDATE_PAYMENT_CONTEXT_QUERY;

      return client.request({
        api: "graphQLApi",
        data: {
          query: query,
          variables: {
            input: {
              id: self._venmoPaymentContextId,
              status: "CANCELED",
            },
          },
        },
      });
    }

    return Promise.resolve();
  });
};

Venmo.prototype._cancelVenmoDesktopContext = function () {
  var self = this;

  return this._createPromise.then(function () {
    if (self._venmoDesktopInstance) {
      self._venmoDesktopInstance.updateVenmoDesktopPaymentContext("CANCELED");
    }

    return Promise.resolve();
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/venmo.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * venmoInstance.teardown();
 * @example <caption>With callback</caption>
 * venmoInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
Venmo.prototype.teardown = function () {
  var self = this;

  this._removeVisibilityEventListener();

  return this._createPromise.then(
    function () {
      if (self._venmoDesktopInstance) {
        self._venmoDesktopInstance.teardown();
      }

      clearTimeout(self._refreshPaymentContextTimeout);
      self._cancelMobilePaymentContext();

      convertMethodsToError(this, methods(Venmo.prototype));
    }.bind(this)
  );
};

Venmo.prototype._removeVisibilityEventListener = function () {
  window.removeEventListener("hashchange", this._onHashChangeListener);
  window.document.removeEventListener(
    documentVisibilityChangeEventName(),
    this._visibilityChangeListener
  );

  delete this._visibilityChangeListener;
  delete this._onHashChangeListener;
};

/**
 * The hash parameter in this function is optional. If no hash parameter is passed, the `getFragmentParameters` function will default to the hash present in the website's URL instead.
 *
 * There are two scenarios where this method is called:
 *
 * 1. When called within a browser that is capable of returning to the same tab that started the Venmo flow, we set up a listener to detect hash changes in the url. Part of the return to the merchant's website from the Venmo app includes encoding the details of the purchase in the hash of the url. The callback is invoked and the hash is pulled off from the event payload. The reason we pull the hash off of the event payload instead of pulling it directly from the URL is because sometimes a single page app will use the hash parameter for it's routing system, and it's possible to hit a race condition where the routing code has already removed the Venmo specific attributes from the hash before we are able to pull it off the url. Grabbing the hash from the event handler instead ensures we get the Venmo details, no matter what the url is converted to.
 * 2. The other scenario is for browsers that cannot return to the same tab, and instead the Venmo app must open a new tab. Since there is no hash listener to pull the hash from, we pull the hash details directly from the url using the `getFragmentParameters` method.
 *
 * @ignore
 * @param {string} [hash] Optionally provided browser url hash.
 * @returns {Promise} Returns a promise
 */
Venmo.prototype.processHashChangeFlowResults = function (hash) {
  var self = this;
  var params = getFragmentParameters(hash);

  // NEXT_MAJOR_VERSION only rely on payment context status call and stop relying on the
  // content of the hash

  return new Promise(function (resolve, reject) {
    if (!self._shouldUseLegacyFlow) {
      self
        ._pollForStatusChange()
        .then(function (payload) {
          analytics.sendEvent(
            self._createPromise,
            "venmo.appswitch.handle.payment-context-status-query.success"
          );

          return resolve({
            paymentMethodNonce: payload.paymentMethodId,
            username: payload.userName,
            payerInfo: payload.payerInfo,
            id: self._venmoPaymentContextId,
          });
        })
        .catch(function (err) {
          if (
            err.type === errors.VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED.type
          ) {
            // We want to reject in this case because if it the process was canceled, we don't want to take the happy path
            reject(err);
          }

          analytics.sendEvent(
            self._createPromise,
            "venmo.process-results.payment-context-status-query-failed"
          );
          // If the polling request fails, but not because of cancelization, we will rely on the params provided from the hash
          resolve(params);
        });
    } else if (params.venmoSuccess) {
      analytics.sendEvent(
        self._createPromise,
        "venmo.appswitch.handle.success"
      );

      resolve(params);
    } else if (params.venmoError) {
      analytics.sendEvent(self._createPromise, "venmo.appswitch.handle.error");
      reject(
        new BraintreeError({
          type: errors.VENMO_APP_FAILED.type,
          code: errors.VENMO_APP_FAILED.code,
          message: errors.VENMO_APP_FAILED.message,
          details: {
            originalError: {
              message: decodeURIComponent(params.errorMessage),
              code: params.errorCode,
            },
          },
        })
      );
    } else if (params.venmoCancel) {
      analytics.sendEvent(self._createPromise, "venmo.appswitch.handle.cancel");
      reject(new BraintreeError(errors.VENMO_APP_CANCELED));
    } else {
      // User has either manually switched back to browser, or app is not available for app switch
      analytics.sendEvent(
        self._createPromise,
        "venmo.appswitch.cancel-or-unavailable"
      );
      reject(new BraintreeError(errors.VENMO_CANCELED));
    }

    self._clearFragmentParameters();
  });
};

Venmo.prototype._clearFragmentParameters = function () {
  if (this._ignoreHistoryChanges) {
    return;
  }

  if (
    typeof window.history.replaceState === "function" &&
    window.location.hash
  ) {
    history.pushState(
      {},
      "",
      window.location.href.slice(0, window.location.href.indexOf("#"))
    );
  }
};

function getFragmentParameters(hash) {
  var keyValuesArray = (hash || window.location.hash.substring(1)).split("&");

  var parsedParams = keyValuesArray.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split("=");
    // some Single Page Apps may pre-pend a / to the first value
    // in the hash, assuming it's a route in their app
    // instead of information from Venmo, this removes all
    // non-alphanumeric characters from the keys in the params
    var decodedKey = decodeURIComponent(parts[0]).replace(/\W/g, "");
    var key = snakeCaseToCamelCase(decodedKey);
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;

    return toReturn;
  }, {});

  if (parsedParams.resourceId) {
    parsedParams.id = parsedParams.resourceId;
  }

  return parsedParams;
}

function formatUserName(username) {
  username = username || "";

  // NEXT_MAJOR_VERSION the web sdks have a prepended @ sign
  // but the ios and android ones do not. This should be standardized
  return "@" + username.replace("@", "");
}

function formatTokenizePayload(payload) {
  var formattedPayload = {
    nonce: payload.paymentMethodNonce,
    type: "VenmoAccount",
    details: {
      username: formatUserName(payload.username),
      paymentContextId: payload.id,
    },
  };

  if (payload.payerInfo) {
    formattedPayload.details.payerInfo = payload.payerInfo;
    formattedPayload.details.payerInfo.userName = formatUserName(
      payload.payerInfo.userName
    );
  }

  return formattedPayload;
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function documentVisibilityChangeEventName() {
  var visibilityChange;

  if (typeof window.document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    visibilityChange = "visibilitychange";
  } else if (typeof window.document.msHidden !== "undefined") {
    visibilityChange = "msvisibilitychange";
  } else if (typeof window.document.webkitHidden !== "undefined") {
    visibilityChange = "webkitvisibilitychange";
  }

  return visibilityChange;
}

function isIosWebviewInDeepLinkReturnUrlFlow() {
  // we know it's a webview because this flow only gets
  // used when checking the deep link flow
  // test the platform here to get around custom useragents
  return (
    window.navigator.platform &&
    /iPhone|iPad|iPod/.test(window.navigator.platform)
  );
}

module.exports = wrapPromise.wrapPrototype(Venmo);

},{"../lib/analytics":53,"../lib/braintree-error":57,"../lib/convert-methods-to-error":59,"../lib/in-iframe":76,"../lib/is-verified-domain":77,"../lib/methods":79,"../lib/querystring":80,"../lib/snake-case-to-camel-case":81,"./external/":84,"./external/queries":85,"./shared/browser-detection":88,"./shared/constants":89,"./shared/errors":90,"./shared/get-venmo-url":92,"./shared/supports-venmo":93,"./shared/web-login-backdrop":94,"@braintree/extended-promise":26,"@braintree/wrap-promise":35}]},{},[87])(87)
});
