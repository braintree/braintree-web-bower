(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).hostedFields = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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

},{"promise-polyfill":56}],2:[function(_dereq_,module,exports){
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
module.exports = function isChromeOS(ua) {
    ua = ua || window.navigator.userAgent;
    return /CrOS/i.test(ua);
};

},{}],6:[function(_dereq_,module,exports){
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

},{"./is-duckduckgo":7,"./is-edge":8,"./is-opera":14,"./is-samsung":15,"./is-silk":16}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function isDuckDuckGo(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("DuckDuckGo/") !== -1;
};

},{}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function isEdge(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Edge/") !== -1;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function isFirefox(ua) {
    ua = ua || window.navigator.userAgent;
    return /Firefox/i.test(ua);
};

},{}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function isIe9(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("MSIE 9") !== -1;
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

},{"./is-ios":13}],12:[function(_dereq_,module,exports){
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

},{"./is-ios":13,"./is-ios-google-search-app":11}],13:[function(_dereq_,module,exports){
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
module.exports = _dereq_("./dist/is-android");

},{"./dist/is-android":4}],18:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-chrome-os");

},{"./dist/is-chrome-os":5}],19:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-chrome");

},{"./dist/is-chrome":6}],20:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-firefox");

},{"./dist/is-firefox":9}],21:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ie9");

},{"./dist/is-ie9":10}],22:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios-webview");

},{"./dist/is-ios-webview":12}],23:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/is-ios");

},{"./dist/is-ios":13}],24:[function(_dereq_,module,exports){
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

},{}],25:[function(_dereq_,module,exports){
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

},{"./lib/assign":26,"./lib/default-attributes":27,"./lib/set-attributes":28}],26:[function(_dereq_,module,exports){
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

},{}],27:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAttributes = void 0;
exports.defaultAttributes = {
    src: "about:blank",
    frameBorder: 0,
    allowtransparency: true,
    scrolling: "no",
};

},{}],28:[function(_dereq_,module,exports){
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

},{}],29:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],30:[function(_dereq_,module,exports){
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

},{}],31:[function(_dereq_,module,exports){
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

},{}],32:[function(_dereq_,module,exports){
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

},{}],33:[function(_dereq_,module,exports){
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

},{"./lib/deferred":30,"./lib/once":31,"./lib/promise-or-callback":32}],34:[function(_dereq_,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var cardTypes = _dereq_("./lib/card-types");
var add_matching_cards_to_results_1 = _dereq_("./lib/add-matching-cards-to-results");
var is_valid_input_type_1 = _dereq_("./lib/is-valid-input-type");
var find_best_match_1 = _dereq_("./lib/find-best-match");
var clone_1 = _dereq_("./lib/clone");
var customCards = {};
var cardNames = {
    VISA: "visa",
    MASTERCARD: "mastercard",
    AMERICAN_EXPRESS: "american-express",
    DINERS_CLUB: "diners-club",
    DISCOVER: "discover",
    JCB: "jcb",
    UNIONPAY: "unionpay",
    MAESTRO: "maestro",
    ELO: "elo",
    MIR: "mir",
    HIPER: "hiper",
    HIPERCARD: "hipercard",
};
var ORIGINAL_TEST_ORDER = [
    cardNames.VISA,
    cardNames.MASTERCARD,
    cardNames.AMERICAN_EXPRESS,
    cardNames.DINERS_CLUB,
    cardNames.DISCOVER,
    cardNames.JCB,
    cardNames.UNIONPAY,
    cardNames.MAESTRO,
    cardNames.ELO,
    cardNames.MIR,
    cardNames.HIPER,
    cardNames.HIPERCARD,
];
var testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
function findType(cardType) {
    return customCards[cardType] || cardTypes[cardType];
}
function getAllCardTypes() {
    return testOrder.map(function (cardType) { return clone_1.clone(findType(cardType)); });
}
function getCardPosition(name, ignoreErrorForNotExisting) {
    if (ignoreErrorForNotExisting === void 0) { ignoreErrorForNotExisting = false; }
    var position = testOrder.indexOf(name);
    if (!ignoreErrorForNotExisting && position === -1) {
        throw new Error('"' + name + '" is not a supported card type.');
    }
    return position;
}
function creditCardType(cardNumber) {
    var results = [];
    if (!is_valid_input_type_1.isValidInputType(cardNumber)) {
        return results;
    }
    if (cardNumber.length === 0) {
        return getAllCardTypes();
    }
    testOrder.forEach(function (cardType) {
        var cardConfiguration = findType(cardType);
        add_matching_cards_to_results_1.addMatchingCardsToResults(cardNumber, cardConfiguration, results);
    });
    var bestMatch = find_best_match_1.findBestMatch(results);
    if (bestMatch) {
        return [bestMatch];
    }
    return results;
}
creditCardType.getTypeInfo = function (cardType) {
    return clone_1.clone(findType(cardType));
};
creditCardType.removeCard = function (name) {
    var position = getCardPosition(name);
    testOrder.splice(position, 1);
};
creditCardType.addCard = function (config) {
    var existingCardPosition = getCardPosition(config.type, true);
    customCards[config.type] = config;
    if (existingCardPosition === -1) {
        testOrder.push(config.type);
    }
};
creditCardType.updateCard = function (cardType, updates) {
    var originalObject = customCards[cardType] || cardTypes[cardType];
    if (!originalObject) {
        throw new Error("\"" + cardType + "\" is not a recognized type. Use `addCard` instead.'");
    }
    if (updates.type && originalObject.type !== updates.type) {
        throw new Error("Cannot overwrite type parameter.");
    }
    var clonedCard = clone_1.clone(originalObject);
    clonedCard = __assign(__assign({}, clonedCard), updates);
    customCards[clonedCard.type] = clonedCard;
};
creditCardType.changeOrder = function (name, position) {
    var currentPosition = getCardPosition(name);
    testOrder.splice(currentPosition, 1);
    testOrder.splice(position, 0, name);
};
creditCardType.resetModifications = function () {
    testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
    customCards = {};
};
creditCardType.types = cardNames;
module.exports = creditCardType;

},{"./lib/add-matching-cards-to-results":35,"./lib/card-types":36,"./lib/clone":37,"./lib/find-best-match":38,"./lib/is-valid-input-type":39}],35:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMatchingCardsToResults = void 0;
var clone_1 = _dereq_("./clone");
var matches_1 = _dereq_("./matches");
function addMatchingCardsToResults(cardNumber, cardConfiguration, results) {
    var i, patternLength;
    for (i = 0; i < cardConfiguration.patterns.length; i++) {
        var pattern = cardConfiguration.patterns[i];
        if (!matches_1.matches(cardNumber, pattern)) {
            continue;
        }
        var clonedCardConfiguration = clone_1.clone(cardConfiguration);
        if (Array.isArray(pattern)) {
            patternLength = String(pattern[0]).length;
        }
        else {
            patternLength = String(pattern).length;
        }
        if (cardNumber.length >= patternLength) {
            clonedCardConfiguration.matchStrength = patternLength;
        }
        results.push(clonedCardConfiguration);
        break;
    }
}
exports.addMatchingCardsToResults = addMatchingCardsToResults;

},{"./clone":37,"./matches":40}],36:[function(_dereq_,module,exports){
"use strict";
var cardTypes = {
    visa: {
        niceType: "Visa",
        type: "visa",
        patterns: [4],
        gaps: [4, 8, 12],
        lengths: [16, 18, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    mastercard: {
        niceType: "Mastercard",
        type: "mastercard",
        patterns: [[51, 55], [2221, 2229], [223, 229], [23, 26], [270, 271], 2720],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    "american-express": {
        niceType: "American Express",
        type: "american-express",
        patterns: [34, 37],
        gaps: [4, 10],
        lengths: [15],
        code: {
            name: "CID",
            size: 4,
        },
    },
    "diners-club": {
        niceType: "Diners Club",
        type: "diners-club",
        patterns: [[300, 305], 36, 38, 39],
        gaps: [4, 10],
        lengths: [14, 16, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    discover: {
        niceType: "Discover",
        type: "discover",
        patterns: [6011, [644, 649], 65],
        gaps: [4, 8, 12],
        lengths: [16, 19],
        code: {
            name: "CID",
            size: 3,
        },
    },
    jcb: {
        niceType: "JCB",
        type: "jcb",
        patterns: [2131, 1800, [3528, 3589]],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    unionpay: {
        niceType: "UnionPay",
        type: "unionpay",
        patterns: [
            620,
            [624, 626],
            [62100, 62182],
            [62184, 62187],
            [62185, 62197],
            [62200, 62205],
            [622010, 622999],
            622018,
            [622019, 622999],
            [62207, 62209],
            [622126, 622925],
            [623, 626],
            6270,
            6272,
            6276,
            [627700, 627779],
            [627781, 627799],
            [6282, 6289],
            6291,
            6292,
            810,
            [8110, 8131],
            [8132, 8151],
            [8152, 8163],
            [8164, 8171],
        ],
        gaps: [4, 8, 12],
        lengths: [14, 15, 16, 17, 18, 19],
        code: {
            name: "CVN",
            size: 3,
        },
    },
    maestro: {
        niceType: "Maestro",
        type: "maestro",
        patterns: [
            493698,
            [500000, 504174],
            [504176, 506698],
            [506779, 508999],
            [56, 59],
            63,
            67,
            6,
        ],
        gaps: [4, 8, 12],
        lengths: [12, 13, 14, 15, 16, 17, 18, 19],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    elo: {
        niceType: "Elo",
        type: "elo",
        patterns: [
            401178,
            401179,
            438935,
            457631,
            457632,
            431274,
            451416,
            457393,
            504175,
            [506699, 506778],
            [509000, 509999],
            627780,
            636297,
            636368,
            [650031, 650033],
            [650035, 650051],
            [650405, 650439],
            [650485, 650538],
            [650541, 650598],
            [650700, 650718],
            [650720, 650727],
            [650901, 650978],
            [651652, 651679],
            [655000, 655019],
            [655021, 655058],
        ],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVE",
            size: 3,
        },
    },
    mir: {
        niceType: "Mir",
        type: "mir",
        patterns: [[2200, 2204]],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: "CVP2",
            size: 3,
        },
    },
    hiper: {
        niceType: "Hiper",
        type: "hiper",
        patterns: [637095, 63737423, 63743358, 637568, 637599, 637609, 637612],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    hipercard: {
        niceType: "Hipercard",
        type: "hipercard",
        patterns: [606282],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
};
module.exports = cardTypes;

},{}],37:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
function clone(originalObject) {
    if (!originalObject) {
        return null;
    }
    return JSON.parse(JSON.stringify(originalObject));
}
exports.clone = clone;

},{}],38:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBestMatch = void 0;
function hasEnoughResultsToDetermineBestMatch(results) {
    var numberOfResultsWithMaxStrengthProperty = results.filter(function (result) { return result.matchStrength; }).length;
    /*
     * if all possible results have a maxStrength property that means the card
     * number is sufficiently long enough to determine conclusively what the card
     * type is
     * */
    return (numberOfResultsWithMaxStrengthProperty > 0 &&
        numberOfResultsWithMaxStrengthProperty === results.length);
}
function findBestMatch(results) {
    if (!hasEnoughResultsToDetermineBestMatch(results)) {
        return null;
    }
    return results.reduce(function (bestMatch, result) {
        if (!bestMatch) {
            return result;
        }
        /*
         * If the current best match pattern is less specific than this result, set
         * the result as the new best match
         * */
        if (Number(bestMatch.matchStrength) < Number(result.matchStrength)) {
            return result;
        }
        return bestMatch;
    });
}
exports.findBestMatch = findBestMatch;

},{}],39:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidInputType = void 0;
function isValidInputType(cardNumber) {
    return typeof cardNumber === "string" || cardNumber instanceof String;
}
exports.isValidInputType = isValidInputType;

},{}],40:[function(_dereq_,module,exports){
"use strict";
/*
 * Adapted from https://github.com/polvo-labs/card-type/blob/aaab11f80fa1939bccc8f24905a06ae3cd864356/src/cardType.js#L37-L42
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
function matchesRange(cardNumber, min, max) {
    var maxLengthToCheck = String(min).length;
    var substr = cardNumber.substr(0, maxLengthToCheck);
    var integerRepresentationOfCardNumber = parseInt(substr, 10);
    min = parseInt(String(min).substr(0, substr.length), 10);
    max = parseInt(String(max).substr(0, substr.length), 10);
    return (integerRepresentationOfCardNumber >= min &&
        integerRepresentationOfCardNumber <= max);
}
function matchesPattern(cardNumber, pattern) {
    pattern = String(pattern);
    return (pattern.substring(0, cardNumber.length) ===
        cardNumber.substring(0, pattern.length));
}
function matches(cardNumber, pattern) {
    if (Array.isArray(pattern)) {
        return matchesRange(cardNumber, pattern[0], pattern[1]);
    }
    return matchesPattern(cardNumber, pattern);
}
exports.matches = matches;

},{}],41:[function(_dereq_,module,exports){
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

},{"./lib/broadcast":45,"./lib/constants":46,"./lib/is-not-string":49,"./lib/package-payload":51,"./lib/send-message":52,"./lib/subscription-args-invalid":54}],42:[function(_dereq_,module,exports){
"use strict";
var attach_1 = _dereq_("./lib/attach");
var framebus_1 = _dereq_("./framebus");
(0, attach_1.attach)();
module.exports = framebus_1.Framebus;

},{"./framebus":41,"./lib/attach":43}],43:[function(_dereq_,module,exports){
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

},{"./message":50}],44:[function(_dereq_,module,exports){
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

},{"./broadcast":45,"./constants":46}],45:[function(_dereq_,module,exports){
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

},{"./has-opener":48}],46:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribers = exports.childWindows = exports.prefix = void 0;
exports.prefix = "/*framebus*/";
exports.childWindows = [];
exports.subscribers = {};

},{}],47:[function(_dereq_,module,exports){
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

},{"./constants":46}],48:[function(_dereq_,module,exports){
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

},{}],49:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isntString = void 0;
function isntString(str) {
    return typeof str !== "string";
}
exports.isntString = isntString;

},{}],50:[function(_dereq_,module,exports){
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

},{"./broadcast-to-child-windows":44,"./dispatch":47,"./is-not-string":49,"./unpack-payload":55}],51:[function(_dereq_,module,exports){
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

},{"./constants":46,"./subscribe-replier":53}],52:[function(_dereq_,module,exports){
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

},{}],53:[function(_dereq_,module,exports){
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

},{"../framebus":41,"@braintree/uuid":29}],54:[function(_dereq_,module,exports){
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

},{"./is-not-string":49}],55:[function(_dereq_,module,exports){
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

},{"./constants":46,"./package-payload":51}],56:[function(_dereq_,module,exports){
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

},{}],57:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIos = exports.isIE9 = exports.isSamsungBrowser = exports.isAndroidChrome = exports.isKitKatWebview = void 0;
// server side rendering check
var UA = (typeof window !== "undefined" &&
    window.navigator &&
    window.navigator.userAgent);
// TODO remove this when browser detection is converted to typescript
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
var isAndroid = _dereq_("@braintree/browser-detection/is-android");
// @ts-ignore
var isChromeOs = _dereq_("@braintree/browser-detection/is-chrome-os");
// @ts-ignore
var isChrome = _dereq_("@braintree/browser-detection/is-chrome");
// @ts-ignore
var isIos = _dereq_("@braintree/browser-detection/is-ios");
exports.isIos = isIos;
// @ts-ignore
var isIE9 = _dereq_("@braintree/browser-detection/is-ie9");
exports.isIE9 = isIE9;
/* eslint-enable @typescript-eslint/ban-ts-comment */
// Old Android Webviews used specific versions of Chrome with 0.0.0 as their version suffix
// https://developer.chrome.com/multidevice/user-agent#webview_user_agent
var KITKAT_WEBVIEW_REGEX = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;
function isOldSamsungBrowserOrSamsungWebview(ua) {
    return !isChrome(ua) && ua.indexOf("Samsung") > -1;
}
function isKitKatWebview(ua) {
    if (ua === void 0) { ua = UA; }
    return isAndroid(ua) && KITKAT_WEBVIEW_REGEX.test(ua);
}
exports.isKitKatWebview = isKitKatWebview;
function isAndroidChrome(ua) {
    if (ua === void 0) { ua = UA; }
    return (isAndroid(ua) || isChromeOs(ua)) && isChrome(ua);
}
exports.isAndroidChrome = isAndroidChrome;
function isSamsungBrowser(ua) {
    if (ua === void 0) { ua = UA; }
    return /SamsungBrowser/.test(ua) || isOldSamsungBrowserOrSamsungWebview(ua);
}
exports.isSamsungBrowser = isSamsungBrowser;

},{"@braintree/browser-detection/is-android":17,"@braintree/browser-detection/is-chrome":19,"@braintree/browser-detection/is-chrome-os":18,"@braintree/browser-detection/is-ie9":21,"@braintree/browser-detection/is-ios":23}],58:[function(_dereq_,module,exports){
"use strict";
var device_1 = _dereq_("./lib/device");
module.exports = function supportsInputFormatting() {
    // Digits get dropped in samsung browser
    return !(0, device_1.isSamsungBrowser)();
};

},{"./lib/device":57}],59:[function(_dereq_,module,exports){
module.exports = _dereq_("./dist/supports-input-formatting");

},{"./dist/supports-input-formatting":58}],60:[function(_dereq_,module,exports){
"use strict";

var BraintreeError = _dereq_("../../lib/braintree-error");
var errors = _dereq_("../shared/errors");
var allowedAttributes = _dereq_("../shared/constants").allowedAttributes;

function attributeValidationError(attribute, value) {
  var err;

  if (!allowedAttributes.hasOwnProperty(attribute)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
      message:
        'The "' + attribute + '" attribute is not supported in Hosted Fields.',
    });
  } else if (value != null && !_isValid(attribute, value)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
      message:
        'Value "' +
        value +
        '" is not allowed for "' +
        attribute +
        '" attribute.',
    });
  }

  return err;
}

function _isValid(attribute, value) {
  if (allowedAttributes[attribute] === "string") {
    return typeof value === "string" || typeof value === "number";
  } else if (allowedAttributes[attribute] === "boolean") {
    return String(value) === "true" || String(value) === "false";
  }

  return false;
}

module.exports = attributeValidationError;

},{"../../lib/braintree-error":79,"../shared/constants":68,"../shared/errors":69}],61:[function(_dereq_,module,exports){
"use strict";

var constants = _dereq_("../shared/constants");
var useMin = _dereq_("../../lib/use-min");

module.exports = function composeUrl(assetsUrl, componentId, isDebug) {
  return (
    assetsUrl +
    "/web/" +
    constants.VERSION +
    "/html/hosted-fields-frame" +
    useMin(isDebug) +
    ".html#" +
    componentId
  );
};

},{"../../lib/use-min":94,"../shared/constants":68}],62:[function(_dereq_,module,exports){
"use strict";

var directions = _dereq_("../shared/constants").navigationDirections;
var browserDetection = _dereq_("../shared/browser-detection");
var focusIntercept = _dereq_("../shared/focus-intercept");
var findParentTags = _dereq_("../shared/find-parent-tags");
var userFocusableTagNames = ["INPUT", "SELECT", "TEXTAREA"];
// Devices with software keyboards do not or cannot focus on input types
// that do not require keyboard-based interaction.
var unfocusedInputTypes = [
  "hidden",
  "button",
  "reset",
  "submit",
  "checkbox",
  "radio",
  "file",
];

function _isUserFocusableElement(element) {
  if (!browserDetection.hasSoftwareKeyboard()) {
    // on desktop browsers, the only input type that isn't focusable
    // is the hidden input
    return element.type !== "hidden";
  }

  return (
    userFocusableTagNames.indexOf(element.tagName) > -1 &&
    unfocusedInputTypes.indexOf(element.type) < 0
  );
}

function _createNavigationHelper(direction, numberOfElementsInForm) {
  switch (direction) {
    case directions.BACK:
      return {
        checkIndexBounds: function (index) {
          return index < 0;
        },
        indexChange: -1,
      };
    case directions.FORWARD:
      return {
        checkIndexBounds: function (index) {
          return index > numberOfElementsInForm - 1;
        },
        indexChange: 1,
      };
    default:
  }

  return {};
}

function _findFirstFocusableElement(elementsInForm) {
  var elementsIndex, element;

  for (
    elementsIndex = 0;
    elementsIndex < elementsInForm.length;
    elementsIndex++
  ) {
    element = elementsInForm[elementsIndex];

    if (_isUserFocusableElement(element)) {
      return element;
    }
  }

  return null;
}

module.exports = {
  removeExtraFocusElements: function (checkoutForm, onRemoveFocusIntercepts) {
    var elements = Array.prototype.slice.call(checkoutForm.elements);
    var firstFocusableInput = _findFirstFocusableElement(elements);
    var lastFocusableInput = _findFirstFocusableElement(elements.reverse());

    // these should never be identical, because there will at least be the
    // before and the after input
    [firstFocusableInput, lastFocusableInput].forEach(function (input) {
      if (!input) {
        return;
      }

      if (focusIntercept.matchFocusElement(input.getAttribute("id"))) {
        onRemoveFocusIntercepts(input.getAttribute("id"));
      }
    });
  },

  createFocusChangeHandler: function (hostedFieldsId, callbacks) {
    return function (data) {
      var currentIndex, targetElement, checkoutForm, navHelper;
      var sourceElement = document.getElementById(
        "bt-" + data.field + "-" + data.direction + "-" + hostedFieldsId
      );

      if (!sourceElement) {
        return;
      }

      checkoutForm = findParentTags(sourceElement, "form")[0];

      if (document.forms.length < 1 || !checkoutForm) {
        callbacks.onRemoveFocusIntercepts();

        return;
      }

      checkoutForm = [].slice.call(checkoutForm.elements);
      currentIndex = checkoutForm.indexOf(sourceElement);
      navHelper = _createNavigationHelper(data.direction, checkoutForm.length);

      do {
        currentIndex += navHelper.indexChange;
        if (navHelper.checkIndexBounds(currentIndex)) {
          return;
        }
        targetElement = checkoutForm[currentIndex];
      } while (!_isUserFocusableElement(targetElement));

      if (focusIntercept.matchFocusElement(targetElement.getAttribute("id"))) {
        callbacks.onTriggerInputFocus(
          targetElement.getAttribute("data-braintree-type")
        );
      } else {
        targetElement.focus();
      }
    };
  },
};

},{"../shared/browser-detection":67,"../shared/constants":68,"../shared/find-parent-tags":70,"../shared/focus-intercept":71}],63:[function(_dereq_,module,exports){
"use strict";

var allowedStyles = _dereq_("../shared/constants").allowedStyles;

module.exports = function getStylesFromClass(cssClass) {
  var element = document.createElement("input");
  var styles = {};
  var computedStyles;

  if (cssClass[0] === ".") {
    cssClass = cssClass.substring(1);
  }

  element.className = cssClass;
  element.style.display = "none !important";
  element.style.position = "fixed !important";
  element.style.left = "-99999px !important";
  element.style.top = "-99999px !important";
  document.body.appendChild(element);

  computedStyles = window.getComputedStyle(element);

  allowedStyles.forEach(function (style) {
    var value = computedStyles[style];

    if (value) {
      styles[style] = value;
    }
  });

  document.body.removeChild(element);

  return styles;
};

},{"../shared/constants":68}],64:[function(_dereq_,module,exports){
"use strict";

var assign = _dereq_("../../lib/assign").assign;
var createAssetsUrl = _dereq_("../../lib/create-assets-url");
var isVerifiedDomain = _dereq_("../../lib/is-verified-domain");
var Destructor = _dereq_("../../lib/destructor");
var iFramer = _dereq_("@braintree/iframer");
var Bus = _dereq_("framebus");
var createDeferredClient = _dereq_("../../lib/create-deferred-client");
var BraintreeError = _dereq_("../../lib/braintree-error");
var composeUrl = _dereq_("./compose-url");
var getStylesFromClass = _dereq_("./get-styles-from-class");
var constants = _dereq_("../shared/constants");
var errors = _dereq_("../shared/errors");
var INTEGRATION_TIMEOUT_MS =
  _dereq_("../../lib/constants").INTEGRATION_TIMEOUT_MS;
var uuid = _dereq_("@braintree/uuid");
var findParentTags = _dereq_("../shared/find-parent-tags");
var browserDetection = _dereq_("../shared/browser-detection");
var events = constants.events;
var EventEmitter = _dereq_("@braintree/event-emitter");
var injectFrame = _dereq_("./inject-frame");
var analytics = _dereq_("../../lib/analytics");
var allowedFields = constants.allowedFields;
var methods = _dereq_("../../lib/methods");
var shadow = _dereq_("../../lib/shadow");
var findRootNode = _dereq_("../../lib/find-root-node");
var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
var sharedErrors = _dereq_("../../lib/errors");
var getCardTypes = _dereq_("../shared/get-card-types");
var attributeValidationError = _dereq_("./attribute-validation-error");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var focusChange = _dereq_("./focus-change");
var destroyFocusIntercept = _dereq_("../shared/focus-intercept").destroy;

var SAFARI_FOCUS_TIMEOUT = 5;

/**
 * @typedef {object} HostedFields~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} authenticationInsight Info about the [regulatory environment](https://developer.paypal.com/braintree/docs/guides/3d-secure/advanced-options/javascript/v3#authentication-insight) of the tokenized card. Only available if `authenticationInsight.merchantAccountId` is passed in the `tokenize` method options.
 * @property {string} authenticationInsight.regulationEnvironment The [regulation environment](https://developer.paypal.com/braintree/docs/guides/3d-secure/advanced-options/javascript/v3#authentication-insight) for the tokenized card.
 * @property {object} details Additional account details.
 * @property {string} details.bin The BIN number of the card.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.expirationMonth The expiration month of the card.
 * @property {string} details.expirationYear The expiration year of the card.
 * @property {string} details.cardholderName The cardholder name tokenized with the card.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard`.
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
 */

/**
 * @typedef {object} HostedFields~stateObject
 * @description The event payload sent from {@link HostedFields#on|on} or {@link HostedFields#getState|getState}.
 * @property {HostedFields~hostedFieldsCard[]} cards
 * This will return an array of potential {@link HostedFields~hostedFieldsCard|cards}. If the card type has been determined, the array will contain only one card.
 * Internally, Hosted Fields uses <a href="https://github.com/braintree/credit-card-type">credit-card-type</a>,
 * an open-source card detection library.
 * @property {string} emittedBy
 * The name of the field associated with an event. This will not be included if returned by {@link HostedFields#getState|getState}. It will be one of the following strings:<br>
 * - `"number"`
 * - `"cvv"`
 * - `"expirationDate"`
 * - `"expirationMonth"`
 * - `"expirationYear"`
 * - `"postalCode"`
 * - `"cardholderName"`
 * @property {object} fields
 * @property {?HostedFields~hostedFieldsFieldData} fields.number {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the number field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.cvv {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the CVV field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationDate {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration date field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationMonth {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration month field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationYear {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration year field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.postalCode {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the postal code field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.cardholderName {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the cardholder name field, if it is present.
 */

/**
 * @typedef {object} HostedFields~binPayload
 * @description The event payload sent from {@link HostedFields#on|on} when the {@link HostedFields#event:binAvailable|binAvailable} event is emitted.
 * @property {string} bin The first 6 digits of the card number.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsFieldData
 * @description Data about Hosted Fields fields, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {HTMLElement} container Reference to the container DOM element on your page associated with the current event.
 * @property {boolean} isFocused Whether or not the input is currently focused.
 * @property {boolean} isEmpty Whether or not the user has entered a value in the input.
 * @property {boolean} isPotentiallyValid
 * A determination based on the future validity of the input value.
 * This is helpful when a user is entering a card number and types <code>"41"</code>.
 * While that value is not valid for submission, it is still possible for
 * it to become a fully qualified entry. However, if the user enters <code>"4x"</code>
 * it is clear that the card number can never become valid and isPotentiallyValid will
 * return false.
 * @property {boolean} isValid Whether or not the value of the associated input is <i>fully</i> qualified for submission.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsCard
 * @description Information about the card type, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {string} type The code-friendly representation of the card type. It will be one of the following strings:
 * - `american-express`
 * - `diners-club`
 * - `discover`
 * - `jcb`
 * - `maestro`
 * - `master-card`
 * - `unionpay`
 * - `visa`
 * @property {string} niceType The pretty-printed card type. It will be one of the following strings:
 * - `American Express`
 * - `Diners Club`
 * - `Discover`
 * - `JCB`
 * - `Maestro`
 * - `MasterCard`
 * - `UnionPay`
 * - `Visa`
 * @property {object} code
 * This object contains data relevant to the security code requirements of the card brand.
 * For example, on a Visa card there will be a <code>CVV</code> of 3 digits, whereas an
 * American Express card requires a 4-digit <code>CID</code>.
 * @property {string} code.name <code>"CVV"</code> <code>"CID"</code> <code>"CVC"</code>
 * @property {number} code.size The expected length of the security code. Typically, this is 3 or 4.
 */

/**
 * @name HostedFields#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event.
 *
 * **Events that emit a {@link HostedFields~stateObject|stateObject}.**
 * * {@link HostedFields#event:blur|blur}
 * * {@link HostedFields#event:focus|focus}
 * * {@link HostedFields#event:empty|empty}
 * * {@link HostedFields#event:notEmpty|notEmpty}
 * * {@link HostedFields#event:cardTypeChange|cardTypeChange}
 * * {@link HostedFields#event:validityChange|validityChange}
 * * {@link HostedFields#event:inputSubmitRequest|inputSubmitRequest}
 *
 * **Other Events**
 * * {@link HostedFields#event:binAvailable|binAvailable} - emits a {@link HostedFields~binPayload|bin payload}. Note: If you are using a [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) header that prevents the origin from being sent, this event will not fire.
 * @example
 * <caption>Listening to a Hosted Field event, in this case 'focus'</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'has been focused');
 *   });
 * });
 * @returns {void}
 */

/**
 * @name HostedFields#off
 * @function
 * @param {string} event The name of the event to which you are unsubscribing.
 * @param {function} handler The callback for the event you are unsubscribing from.
 * @description Unsubscribes the handler function to a named event.
 * @example
 * <caption>Subscribing and then unsubscribing from a Hosted Field event, in this case 'focus'</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   var callback = function (event) {
 *     console.log(event.emittedBy, 'has been focused');
 *   };
 *   hostedFieldsInstance.on('focus', callback);
 *
 *   // later on
 *   hostedFieldsInstance.off('focus', callback);
 * });
 * @returns {void}
 */

/**
 * This event is emitted when the user requests submission of an input field, such as by pressing the Enter or Return key on their keyboard, or mobile equivalent.
 * @event HostedFields#inputSubmitRequest
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Clicking a submit button upon hitting Enter (or equivalent) within a Hosted Field</caption>
 * var hostedFields = require('braintree-web/hosted-fields');
 * var submitButton = document.querySelector('input[type="submit"]');
 *
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('inputSubmitRequest', function () {
 *     // User requested submission, e.g. by pressing Enter or equivalent
 *     submitButton.click();
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from having data to being empty.
 * @event HostedFields#empty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an empty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('empty', function (event) {
 *     console.log(event.emittedBy, 'is now empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from being empty to having data.
 * @event HostedFields#notEmpty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an notEmpty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('notEmpty', function (event) {
 *     console.log(event.emittedBy, 'is now not empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field loses focus.
 * @event HostedFields#blur
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a blur event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('blur', function (event) {
 *     console.log(event.emittedBy, 'lost focus');
 *   });
 * });
 */

/**
 * This event is emitted when a field gains focus.
 * @event HostedFields#focus
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a focus event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'gained focus');
 *   });
 * });
 */

/**
 * This event is emitted when activity within the number field has changed such that the possible card type has changed.
 * @event HostedFields#cardTypeChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a cardTypeChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('cardTypeChange', function (event) {
 *     if (event.cards.length === 1) {
 *       console.log(event.cards[0].type);
 *     } else {
 *       console.log('Type of card not yet known');
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the validity of a field has changed. Validity is represented in the {@link HostedFields~stateObject|stateObject} as two booleans: `isValid` and `isPotentiallyValid`.
 * @event HostedFields#validityChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a validityChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('validityChange', function (event) {
 *     var field = event.fields[event.emittedBy];
 *
 *     if (field.isValid) {
 *       console.log(event.emittedBy, 'is fully valid');
 *     } else if (field.isPotentiallyValid) {
 *       console.log(event.emittedBy, 'is potentially valid');
 *     } else {
 *       console.log(event.emittedBy, 'is not valid');
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the first 6 digits of the card number have been entered by the customer.
 * @event HostedFields#binAvailable
 * @type {string}
 * @example
 * <caption>Listening to a `binAvailable` event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('binAvailable', function (event) {
 *     event.bin // send bin to 3rd party bin service
 *   });
 * });
 */

function createInputEventHandler(fields) {
  return function (eventData) {
    var field;
    var merchantPayload = eventData.merchantPayload;
    var emittedBy = merchantPayload.emittedBy;
    var container = fields[emittedBy].containerElement;

    Object.keys(merchantPayload.fields).forEach(function (key) {
      merchantPayload.fields[key].container = fields[key].containerElement;
    });

    field = merchantPayload.fields[emittedBy];

    container.classList.toggle(
      constants.externalClasses.FOCUSED,
      field.isFocused
    );
    container.classList.toggle(constants.externalClasses.VALID, field.isValid);

    container.classList.toggle(
      constants.externalClasses.INVALID,
      !field.isPotentiallyValid
    );

    // eslint-disable-next-line no-invalid-this
    this._state = {
      cards: merchantPayload.cards,
      fields: merchantPayload.fields,
    };

    this._emit(eventData.type, merchantPayload); // eslint-disable-line no-invalid-this
  };
}

function isVisibleEnough(node) {
  var boundingBox = node.getBoundingClientRect();
  var verticalMidpoint = Math.floor(boundingBox.height / 2);
  var horizontalMidpoint = Math.floor(boundingBox.width / 2);

  return (
    boundingBox.top <
      (window.innerHeight - verticalMidpoint ||
        document.documentElement.clientHeight - verticalMidpoint) &&
    boundingBox.right > horizontalMidpoint &&
    boundingBox.bottom > verticalMidpoint &&
    boundingBox.left <
      (window.innerWidth - horizontalMidpoint ||
        document.documentElement.clientWidth - horizontalMidpoint)
  );
}

/**
 * @class HostedFields
 * @param {object} options The Hosted Fields {@link module:braintree-web/hosted-fields.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/hosted-fields.create|braintree-web.hosted-fields.create} instead.</strong>
 * @classdesc This class represents a Hosted Fields component produced by {@link module:braintree-web/hosted-fields.create|braintree-web/hosted-fields.create}. Instances of this class have methods for interacting with the input fields within Hosted Fields' iframes.
 */
function HostedFields(options) {
  var failureTimeout, clientConfig, assetsUrl, isDebug, hostedFieldsUrl;
  var self = this;
  var fields = {};
  var frameReadyPromiseResolveFunctions = {};
  var frameReadyPromises = [];
  var componentId = uuid();

  this._merchantConfigurationOptions = assign({}, options);

  if (options.client) {
    clientConfig = options.client.getConfiguration();
    assetsUrl = clientConfig.gatewayConfiguration.assetsUrl;
    isDebug = clientConfig.isDebug;
  } else {
    assetsUrl = createAssetsUrl.create(options.authorization);
    isDebug = Boolean(options.isDebug);
  }

  this._clientPromise = createDeferredClient.create({
    client: options.client,
    authorization: options.authorization,
    debug: isDebug,
    assetsUrl: assetsUrl,
    name: "Hosted Fields",
  });

  hostedFieldsUrl = composeUrl(assetsUrl, componentId, isDebug);

  if (!options.fields || Object.keys(options.fields).length === 0) {
    throw new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: "options.fields is required when instantiating Hosted Fields.",
    });
  }

  EventEmitter.call(this);

  this._injectedNodes = [];
  this._destructor = new Destructor();
  this._fields = fields;
  this._state = {
    fields: {},
    cards: getCardTypes(""),
  };

  this._bus = new Bus({
    channel: componentId,
    verifyDomain: isVerifiedDomain,
    targetFrames: [],
  });

  this._destructor.registerFunctionForTeardown(function () {
    self._bus.teardown();
  });

  // NEXT_MAJOR_VERSION analytics events should have present tense verbs
  if (!options.client) {
    analytics.sendEvent(
      this._clientPromise,
      "custom.hosted-fields.initialized.deferred-client"
    );
  } else {
    analytics.sendEvent(
      this._clientPromise,
      "custom.hosted-fields.initialized"
    );
  }

  Object.keys(options.fields).forEach(
    function (key) {
      var field, externalContainer, internalContainer, frame, frameReadyPromise;

      if (!constants.allowedFields.hasOwnProperty(key)) {
        throw new BraintreeError({
          type: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
          code: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
          message: '"' + key + '" is not a valid field.',
        });
      }

      field = options.fields[key];
      // NEXT_MAJOR_VERSION remove selector as an option
      // and simply make the API take a container
      externalContainer = field.container || field.selector;

      if (typeof externalContainer === "string") {
        externalContainer = document.querySelector(externalContainer);
      }

      if (!externalContainer || externalContainer.nodeType !== 1) {
        throw new BraintreeError({
          type: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
          code: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
          message: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
          details: {
            fieldSelector: field.selector,
            fieldContainer: field.container,
            fieldKey: key,
          },
        });
      } else if (
        externalContainer.querySelector('iframe[name^="braintree-"]')
      ) {
        throw new BraintreeError({
          type: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
          code: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
          message: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
          details: {
            fieldSelector: field.selector,
            fieldContainer: field.container,
            fieldKey: key,
          },
        });
      }

      internalContainer = externalContainer;

      if (shadow.isShadowElement(internalContainer)) {
        internalContainer = shadow.transformToSlot(
          internalContainer,
          "height: 100%"
        );
      }

      if (field.maxlength && typeof field.maxlength !== "number") {
        throw new BraintreeError({
          type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
          code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
          message: "The value for maxlength must be a number.",
          details: {
            fieldKey: key,
          },
        });
      }

      if (field.minlength && typeof field.minlength !== "number") {
        throw new BraintreeError({
          type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
          code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
          message: "The value for minlength must be a number.",
          details: {
            fieldKey: key,
          },
        });
      }

      frame = iFramer({
        type: key,
        name: "braintree-hosted-field-" + key,
        style: constants.defaultIFrameStyle,
        title:
          field.iframeTitle ||
          "Secure Credit Card Frame - " + constants.allowedFields[key].label,
      });
      this._bus.addTargetFrame(frame);

      this._injectedNodes.push.apply(
        this._injectedNodes,
        injectFrame(componentId, frame, internalContainer, function () {
          self.focus(key);
        })
      );

      this._setupLabelFocus(key, externalContainer);
      fields[key] = {
        frameElement: frame,
        containerElement: externalContainer,
      };
      frameReadyPromise = new Promise(function (resolve) {
        frameReadyPromiseResolveFunctions[key] = resolve;
      });
      frameReadyPromises.push(frameReadyPromise);

      this._state.fields[key] = {
        isEmpty: true,
        isValid: false,
        isPotentiallyValid: true,
        isFocused: false,
        container: externalContainer,
      };

      // prevents loading the iframe from blocking the code
      setTimeout(function () {
        frame.src = hostedFieldsUrl;
      }, 0);
    }.bind(this)
  );

  if (this._merchantConfigurationOptions.styles) {
    Object.keys(this._merchantConfigurationOptions.styles).forEach(function (
      selector
    ) {
      var className = self._merchantConfigurationOptions.styles[selector];

      if (typeof className === "string") {
        self._merchantConfigurationOptions.styles[selector] =
          getStylesFromClass(className);
      }
    });
  }

  this._bus.on(events.REMOVE_FOCUS_INTERCEPTS, function (data) {
    destroyFocusIntercept(data && data.id);
  });

  this._bus.on(
    events.TRIGGER_FOCUS_CHANGE,
    focusChange.createFocusChangeHandler(componentId, {
      onRemoveFocusIntercepts: function (element) {
        self._bus.emit(events.REMOVE_FOCUS_INTERCEPTS, {
          id: element,
        });
      },
      onTriggerInputFocus: function (targetType) {
        self.focus(targetType);
      },
    })
  );

  this._bus.on(events.READY_FOR_CLIENT, function (reply) {
    self._clientPromise.then(function (client) {
      reply(client);
    });
  });

  this._bus.on(events.CARD_FORM_ENTRY_HAS_BEGUN, function () {
    analytics.sendEvent(self._clientPromise, "hosted-fields.input.started");
  });

  this._bus.on(events.BIN_AVAILABLE, function (bin) {
    self._emit("binAvailable", {
      bin: bin,
    });
  });

  failureTimeout = setTimeout(function () {
    analytics.sendEvent(
      self._clientPromise,
      "custom.hosted-fields.load.timed-out"
    );
    self._emit("timeout");
  }, INTEGRATION_TIMEOUT_MS);

  Promise.all(frameReadyPromises).then(function (results) {
    var reply = results[0];

    clearTimeout(failureTimeout);
    reply(
      formatMerchantConfigurationForIframes(self._merchantConfigurationOptions)
    );

    self._cleanUpFocusIntercepts();

    self._emit("ready");
  });

  this._bus.on(events.FRAME_READY, function (data, reply) {
    frameReadyPromiseResolveFunctions[data.field](reply);
  });

  this._bus.on(events.INPUT_EVENT, createInputEventHandler(fields).bind(this));

  this._destructor.registerFunctionForTeardown(function () {
    var j, node, parent;

    for (j = 0; j < self._injectedNodes.length; j++) {
      node = self._injectedNodes[j];
      parent = node.parentNode;

      parent.removeChild(node);

      parent.classList.remove(
        constants.externalClasses.FOCUSED,
        constants.externalClasses.INVALID,
        constants.externalClasses.VALID
      );
    }
  });

  this._destructor.registerFunctionForTeardown(function () {
    destroyFocusIntercept();
  });

  this._destructor.registerFunctionForTeardown(function () {
    var methodNames = methods(HostedFields.prototype).concat(
      methods(EventEmitter.prototype)
    );

    convertMethodsToError(self, methodNames);
  });
}

EventEmitter.createChild(HostedFields);

HostedFields.prototype._setupLabelFocus = function (type, container) {
  var labels, i;
  var self = this;
  var rootNode = findRootNode(container);

  if (container.id == null) {
    return;
  }

  function triggerFocus() {
    self.focus(type);
  }

  // find any labels in the normal DOM
  labels = Array.prototype.slice.call(
    document.querySelectorAll('label[for="' + container.id + '"]')
  );
  if (rootNode !== document) {
    // find any labels within the shadow dom
    labels = labels.concat(
      Array.prototype.slice.call(
        rootNode.querySelectorAll('label[for="' + container.id + '"]')
      )
    );
  }
  // find any labels surrounding the container that don't also have the `for` attribute
  labels = labels.concat(findParentTags(container, "label"));
  // filter out any accidental duplicates
  labels = labels.filter(function (label, index, arr) {
    return arr.indexOf(label) === index;
  });

  for (i = 0; i < labels.length; i++) {
    labels[i].addEventListener("click", triggerFocus, false);
  }

  this._destructor.registerFunctionForTeardown(function () {
    for (i = 0; i < labels.length; i++) {
      labels[i].removeEventListener("click", triggerFocus, false);
    }
  });
};

HostedFields.prototype._getAnyFieldContainer = function () {
  var self = this;

  return Object.keys(this._fields).reduce(function (found, field) {
    return found || self._fields[field].containerElement;
  }, null);
};

HostedFields.prototype._cleanUpFocusIntercepts = function () {
  var iframeContainer, checkoutForm;

  if (document.forms.length < 1) {
    this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS);
  } else {
    iframeContainer = this._getAnyFieldContainer();
    checkoutForm = findParentTags(iframeContainer, "form")[0];

    if (checkoutForm) {
      focusChange.removeExtraFocusElements(
        checkoutForm,
        function (id) {
          this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS, {
            id: id,
          });
        }.bind(this)
      );
    } else {
      this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS);
    }
  }
};

HostedFields.prototype._attachInvalidFieldContainersToError = function (err) {
  if (
    !(
      err.details &&
      err.details.invalidFieldKeys &&
      err.details.invalidFieldKeys.length > 0
    )
  ) {
    return;
  }
  err.details.invalidFields = {};
  err.details.invalidFieldKeys.forEach(
    function (field) {
      err.details.invalidFields[field] = this._fields[field].containerElement;
    }.bind(this)
  );
};

/**
 * Get card verification challenges, such as requirements for cvv and postal code.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. If no callback is provided, `getChallenges` returns a promise.
 * @example
 * hostedFieldsInstance.getChallenges().then(function (challenges) {
 *   challenges // ['cvv', 'postal_code']
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.getChallenges = function () {
  return this._clientPromise.then(function (client) {
    return client.getConfiguration().gatewayConfiguration.challenges;
  });
};

/**
 * Get supported card types configured in the Braintree Control Panel
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. If no callback is provided, `getSupportedCardTypes` returns a promise.
 * @example
 * hostedFieldsInstance.getSupportedCardTypes().then(function (cardTypes) {
 *   cardTypes // ['Visa', 'American Express', 'Mastercard']
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.getSupportedCardTypes = function () {
  return this._clientPromise.then(function (client) {
    var cards = client
      .getConfiguration()
      .gatewayConfiguration.creditCards.supportedCardTypes.map(function (
        cardType
      ) {
        if (cardType === "MasterCard") {
          // Mastercard changed their branding. We can't update our
          // config without creating a breaking change, so we just
          // hard code the change here
          return "Mastercard";
        }

        return cardType;
      });

    return cards;
  });
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/hosted-fields.create|create}.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. No data is returned if teardown completes successfully. If no callback is provided, `teardown` returns a promise.
 * @example
 * hostedFieldsInstance.teardown(function (teardownErr) {
 *   if (teardownErr) {
 *     console.error('Could not tear down Hosted Fields!');
 *   } else {
 *     console.info('Hosted Fields has been torn down!');
 *   }
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.teardown = function () {
  var self = this;

  return new Promise(function (resolve, reject) {
    self._destructor.teardown(function (err) {
      analytics.sendEvent(
        self._clientPromise,
        "custom.hosted-fields.teardown-completed"
      );

      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Tokenizes fields and returns a nonce payload.
 * @public
 * @param {object} [options] All tokenization options for the Hosted Fields component.
 * @param {boolean} [options.vault=false] When true, will vault the tokenized card. Cards will only be vaulted when using a client created with a client token that includes a customer ID. Note: merchants using Advanced Fraud Tools should not use this option, as device data will not be included.
 * @param {object} [options.authenticationInsight] Options for checking authentication insight - the [regulatory environment](https://developer.paypal.com/braintree/docs/guides/3d-secure/advanced-options/javascript/v3#authentication-insight) of the tokenized card.
 * @param {string} options.authenticationInsight.merchantAccountId The Braintree merchant account id to use to look up the authentication insight information.
 * @param {array} [options.fieldsToTokenize] By default, all fields will be tokenized. You may specify which fields specifically you wish to tokenize with this property. Valid options are `'number'`, `'cvv'`, `'expirationDate'`, `'expirationMonth'`, `'expirationYear'`, `'postalCode'`, `'cardholderName'`.
 * @param {string} [options.cardholderName] When supplied, the cardholder name to be tokenized with the contents of the fields.
 * @param {string} [options.billingAddress.postalCode] When supplied, this postal code will be tokenized along with the contents of the fields. If a postal code is provided as part of the Hosted Fields configuration, the value of the field will be tokenized and this value will be ignored.
 * @param {string} [options.billingAddress.firstName] When supplied, this customer first name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.lastName] When supplied, this customer last name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.company] When supplied, this company name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.streetAddress] When supplied, this street address will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.extendedAddress] When supplied, this extended address will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.locality] When supplied, this locality (the city) will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.region] When supplied, this region (the state) will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeNumeric] When supplied, this numeric country code will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha2] When supplied, this alpha 2 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha3] When supplied, this alpha 3 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryName] When supplied, this country name will be tokenized along with the contents of the fields.
 *
 * @param {callback} [callback] May be used as the only parameter of the function if no options are passed in. The second argument, <code>data</code>, is a {@link HostedFields~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a function that resolves with a {@link HostedFields~tokenizePayload|tokenizePayload}.
 * @example <caption>Tokenize a card</caption>
 * hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     switch (tokenizeErr.code) {
 *       case 'HOSTED_FIELDS_FIELDS_EMPTY':
 *         // occurs when none of the fields are filled in
 *         console.error('All fields are empty! Please fill out the form.');
 *         break;
 *       case 'HOSTED_FIELDS_FIELDS_INVALID':
 *         // occurs when certain fields do not pass client side validation
 *         console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
 *
 *         // you can also programmatically access the field containers for the invalid fields
 *         tokenizeErr.details.invalidFields.forEach(function (fieldContainer) {
 *           fieldContainer.className = 'invalid';
 *         });
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the fail on duplicate payment method
 *         //     option is set to true
 *         //   * the card being tokenized has previously been vaulted (with any customer)
 *         // See: https://developer.paypal.com/braintree/docs/reference/request/client-token/generate#options.fail_on_duplicate_payment_method
 *         console.error('This payment method already exists in your vault.');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the verify card option is set to true
 *         //     and you have credit card verification turned on in the Braintree
 *         //     control panel
 *         //   * the cvv does not pass verification (https://developer.paypal.com/braintree/docs/reference/general/testing#avs-and-cvv/cid-responses)
 *         // See: https://developer.paypal.com/braintree/docs/reference/request/client-token/generate#options.verify_card
 *         console.error('CVV did not pass verification');
 *         break;
 *       case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
 *         // occurs for any other tokenization error on the server
 *         console.error('Tokenization failed server side. Is the card valid?');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
 *         // occurs when the Braintree gateway cannot be contacted
 *         console.error('Network error occurred when tokenizing.');
 *         break;
 *       default:
 *         console.error('Something bad happened!', tokenizeErr);
 *     }
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize and vault a card</caption>
 * hostedFieldsInstance.tokenize({
 *   vault: true
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with non-Hosted Fields cardholder name</caption>
 * hostedFieldsInstance.tokenize({
 *   cardholderName: 'First Last'
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with non-Hosted Fields postal code option</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     postalCode: '11111'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with additional billing address options</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     firstName: 'First',
 *     lastName: 'Last',
 *     company: 'Company',
 *     streetAddress: '123 Street',
 *     extendedAddress: 'Unit 1',
 *     // passing just one of the country options is sufficient to
 *     // associate the card details with a particular country
 *     // valid country names and codes can be found here:
 *     // https://developer.paypal.com/braintree/docs/reference/general/countries/ruby#list-of-countries
 *     countryName: 'United States',
 *     countryCodeAlpha2: 'US',
 *     countryCodeAlpha3: 'USA',
 *     countryCodeNumeric: '840'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Allow tokenization with empty cardholder name field</caption>
 * var state = hostedFieldsInstance.getState();
 * var fields = Object.keys(state.fields);
 *
 * // normally, if you tried to tokenize an empty cardholder name field
 * // you would get an error, to allow making this field optional,
 * // tokenize all the fields except for the cardholder name field
 * // when the cardholder name field is empty. Otherwise, tokenize
 * // all the fields
 * if (state.fields.cardholderName.isEmpty) {
 *  fields = fields.filter(function (field) {
 *    return field !== 'cardholderName';
 *  });
 * }
 *
 * hostedFieldsInstance.tokenize({
 *  fieldsToTokenize: fields
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.tokenize = function (options) {
  var self = this;

  if (!options) {
    options = {};
  }

  return new Promise(function (resolve, reject) {
    self._bus.emit(events.TOKENIZATION_REQUEST, options, function (response) {
      var err = response[0];
      var payload = response[1];

      if (err) {
        self._attachInvalidFieldContainersToError(err);
        reject(new BraintreeError(err));
      } else {
        resolve(payload);
      }
    });
  });
};

/**
 * Add a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to add a class to. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be added.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is added successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *   }
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.addClass = function (field, classname) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message:
        '"' +
        field +
        '" is not a valid field. You must use a valid field option when adding a class.',
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message:
        'Cannot add class to "' +
        field +
        '" field because it is not part of the current Hosted Fields options.',
    });
  } else {
    this._bus.emit(events.ADD_CLASS, {
      field: field,
      classname: classname,
    });
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Removes a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to remove a class from. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be removed.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is removed successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *     return;
 *   }
 *
 *   // some time later...
 *   hostedFieldsInstance.removeClass('number', 'custom-class');
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeClass = function (field, classname) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message:
        '"' +
        field +
        '" is not a valid field. You must use a valid field option when removing a class.',
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message:
        'Cannot remove class from "' +
        field +
        '" field because it is not part of the current Hosted Fields options.',
    });
  } else {
    this._bus.emit(events.REMOVE_CLASS, {
      field: field,
      classname: classname,
    });
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets an attribute of a {@link module:braintree-web/hosted-fields~field field}.
 * Supported attributes are `aria-invalid`, `aria-required`, `disabled`, and `placeholder`.
 *
 * @public
 * @param {object} options The options for the attribute you wish to set.
 * @param {string} options.field The field to which you wish to add an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to add to the field.
 * @param {string} options.value The value for the attribute.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is set successfully.
 *
 * @example <caption>Set the placeholder attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'placeholder',
 *   value: '1111 1111 1111 1111'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @example <caption>Set the aria-required attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'aria-required',
 *   value: true
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setAttribute = function (options) {
  var attributeErr, err;

  if (!allowedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message:
        '"' +
        options.field +
        '" is not a valid field. You must use a valid field option when setting an attribute.',
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message:
        'Cannot set attribute for "' +
        options.field +
        '" field because it is not part of the current Hosted Fields options.',
    });
  } else {
    attributeErr = attributeValidationError(options.attribute, options.value);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.SET_ATTRIBUTE, {
        field: options.field,
        attribute: options.attribute,
        value: options.value,
      });
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets the month options for the expiration month field when presented as a select element.
 *
 * @public
 * @param {array} options An array of 12 entries corresponding to the 12 months.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the options are updated successfully. Errors if expirationMonth is not configured on the Hosted Fields instance or if the expirationMonth field is not configured to be a select input.
 *
 * @example <caption>Update the month options to spanish</caption>
 * hostedFieldsInstance.setMonthOptions([
 *   '01 - enero',
 *   '02 - febrero',
 *   '03 - marzo',
 *   '04 - abril',
 *   '05 - mayo',
 *   '06 - junio',
 *   '07 - julio',
 *   '08 - agosto',
 *   '09 - septiembre',
 *   '10 - octubre',
 *   '11 - noviembre',
 *   '12 - diciembre'
 * ]);
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setMonthOptions = function (options) {
  var self = this;
  var merchantOptions = this._merchantConfigurationOptions.fields;
  var errorMessage;

  if (!merchantOptions.expirationMonth) {
    errorMessage = "Expiration month field must exist to use setMonthOptions.";
  } else if (!merchantOptions.expirationMonth.select) {
    errorMessage = "Expiration month field must be a select element.";
  }

  if (errorMessage) {
    return Promise.reject(
      new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: errorMessage,
      })
    );
  }

  return new Promise(function (resolve) {
    self._bus.emit(events.SET_MONTH_OPTIONS, options, resolve);
  });
};

/**
 * Sets a visually hidden message (for screen readers) on a {@link module:braintree-web/hosted-fields~field field}.
 *
 * @public
 * @param {object} options The options for the attribute you wish to set.
 * @param {string} options.field The field to which you wish to add an attribute. Must be a valid {@link module:braintree-web/hosted-fields~field field}.
 * @param {string} options.message The message to set.
 *
 * @example <caption>Set an error message on a field</caption>
 * hostedFieldsInstance.setMessage({
 *   field: 'number',
 *   message: 'Invalid card number'
 * });
 *
 * @example <caption>Remove the message on a field</caption>
 * hostedFieldsInstance.setMessage({
 *   field: 'number',
 *   message: ''
 * });
 *
 * @returns {void}
 */
HostedFields.prototype.setMessage = function (options) {
  this._bus.emit(events.SET_MESSAGE, {
    field: options.field,
    message: options.message,
  });
};

/**
 * Removes a supported attribute from a {@link module:braintree-web/hosted-fields~field field}.
 *
 * @public
 * @param {object} options The options for the attribute you wish to remove.
 * @param {string} options.field The field from which you wish to remove an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to remove from the field.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is removed successfully.
 *
 * @example <caption>Remove the placeholder attribute of a field</caption>
 * hostedFieldsInstance.removeAttribute({
 *   field: 'number',
 *   attribute: 'placeholder'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeAttribute = function (options) {
  var attributeErr, err;

  if (!allowedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message:
        '"' +
        options.field +
        '" is not a valid field. You must use a valid field option when removing an attribute.',
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message:
        'Cannot remove attribute for "' +
        options.field +
        '" field because it is not part of the current Hosted Fields options.',
    });
  } else {
    attributeErr = attributeValidationError(options.attribute);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.REMOVE_ATTRIBUTE, {
        field: options.field,
        attribute: options.attribute,
      });
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * @deprecated since version 3.8.0. Use {@link HostedFields#setAttribute|setAttribute} instead.
 *
 * @public
 * @param {string} field The field whose placeholder you wish to change. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} placeholder Will be used as the `placeholder` attribute of the input.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the placeholder updated successfully.
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setPlaceholder = function (field, placeholder) {
  return this.setAttribute({
    field: field,
    attribute: "placeholder",
    value: placeholder,
  });
};

/**
 * Clear the value of a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you wish to clear. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field cleared successfully.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * hostedFieldsInstance.clear('number', function (clearErr) {
 *   if (clearErr) {
 *     console.error(clearErr);
 *   }
 * });
 *
 * @example <caption>Clear several fields</caption>
 * hostedFieldsInstance.clear('number');
 * hostedFieldsInstance.clear('cvv');
 * hostedFieldsInstance.clear('expirationDate');
 */
HostedFields.prototype.clear = function (field) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message:
        '"' +
        field +
        '" is not a valid field. You must use a valid field option when clearing a field.',
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message:
        'Cannot clear "' +
        field +
        '" field because it is not part of the current Hosted Fields options.',
    });
  } else {
    this._bus.emit(events.CLEAR_FIELD, {
      field: field,
    });
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Programmatically focus a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you want to focus. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field focused successfully.
 * @returns {void}
 * @example
 * hostedFieldsInstance.focus('number', function (focusErr) {
 *   if (focusErr) {
 *     console.error(focusErr);
 *   }
 * });
 * @example <caption>Using an event listener</caption>
 * myElement.addEventListener('click', function (e) {
 *   // In Firefox, the focus method can be suppressed
 *   //   if the element has a tabindex property or the element
 *   //   is an anchor link with an href property.
 *   e.preventDefault();
 *   hostedFieldsInstance.focus('number');
 * });
 */
HostedFields.prototype.focus = function (field) {
  var err;
  var fieldConfig = this._fields[field];

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message:
        '"' +
        field +
        '" is not a valid field. You must use a valid field option when focusing a field.',
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message:
        'Cannot focus "' +
        field +
        '" field because it is not part of the current Hosted Fields options.',
    });
  } else {
    fieldConfig.frameElement.focus();

    this._bus.emit(events.TRIGGER_INPUT_FOCUS, {
      field: field,
    });

    if (browserDetection.isIos()) {
      // Inputs outside of the viewport don't always scroll into view on
      // focus in iOS Safari. 5ms timeout gives the browser a chance to
      // do the right thing and prevents stuttering.
      setTimeout(function () {
        if (!isVisibleEnough(fieldConfig.containerElement)) {
          fieldConfig.containerElement.scrollIntoView();
        }
      }, SAFARI_FOCUS_TIMEOUT);
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Returns an {@link HostedFields~stateObject|object} that includes the state of all fields and possible card types.
 * @public
 * @returns {object} {@link HostedFields~stateObject|stateObject}
 * @example <caption>Check if all fields are valid</caption>
 * var state = hostedFieldsInstance.getState();
 *
 * var formValid = Object.keys(state.fields).every(function (key) {
 *   return state.fields[key].isValid;
 * });
 */
HostedFields.prototype.getState = function () {
  return this._state;
};

// React adds decorations to DOM nodes that cause
// circular dependencies, so we remove them from the
// config before sending it to the iframes. However,
// we don't want to mutate the original object that
// was passed in, so we create fresh objects via assign
function formatMerchantConfigurationForIframes(config) {
  var formattedConfig = assign({}, config);

  formattedConfig.fields = assign({}, formattedConfig.fields);
  Object.keys(formattedConfig.fields).forEach(function (field) {
    formattedConfig.fields[field] = assign({}, formattedConfig.fields[field]);
    delete formattedConfig.fields[field].container;
  });

  return formattedConfig;
}

module.exports = wrapPromise.wrapPrototype(HostedFields);

},{"../../lib/analytics":74,"../../lib/assign":76,"../../lib/braintree-error":79,"../../lib/constants":80,"../../lib/convert-methods-to-error":81,"../../lib/create-assets-url":82,"../../lib/create-deferred-client":84,"../../lib/destructor":85,"../../lib/errors":87,"../../lib/find-root-node":88,"../../lib/is-verified-domain":89,"../../lib/methods":91,"../../lib/shadow":93,"../shared/browser-detection":67,"../shared/constants":68,"../shared/errors":69,"../shared/find-parent-tags":70,"../shared/focus-intercept":71,"../shared/get-card-types":72,"./attribute-validation-error":60,"./compose-url":61,"./focus-change":62,"./get-styles-from-class":63,"./inject-frame":65,"@braintree/event-emitter":24,"@braintree/iframer":25,"@braintree/uuid":29,"@braintree/wrap-promise":33,"framebus":42}],65:[function(_dereq_,module,exports){
"use strict";

var focusIntercept = _dereq_("../shared/focus-intercept");
var directions = _dereq_("../shared/constants").navigationDirections;

module.exports = function injectFrame(id, frame, container, focusHandler) {
  var frameType = frame.getAttribute("type");
  var clearboth = document.createElement("div");
  var fragment = document.createDocumentFragment();
  var focusInterceptBefore = focusIntercept.generate(
    id,
    frameType,
    directions.BACK,
    focusHandler
  );
  var focusInterceptAfter = focusIntercept.generate(
    id,
    frameType,
    directions.FORWARD,
    focusHandler
  );

  clearboth.style.clear = "both";

  fragment.appendChild(focusInterceptBefore);
  fragment.appendChild(frame);
  fragment.appendChild(focusInterceptAfter);
  fragment.appendChild(clearboth);

  container.appendChild(fragment);

  return [frame, clearboth];
};

},{"../shared/constants":68,"../shared/focus-intercept":71}],66:[function(_dereq_,module,exports){
"use strict";
/** @module braintree-web/hosted-fields */

var HostedFields = _dereq_("./external/hosted-fields");
var basicComponentVerification = _dereq_("../lib/basic-component-verification");
var errors = _dereq_("./shared/errors");
var supportsInputFormatting = _dereq_("restricted-input/supports-input-formatting");
var wrapPromise = _dereq_("@braintree/wrap-promise");
var BraintreeError = _dereq_("../lib/braintree-error");
var VERSION = "3.92.2";

/**
 * Fields used in {@link module:braintree-web/hosted-fields~fieldOptions fields options}
 * @typedef {object} field
 * @property {string} selector Deprecated: Now an alias for `options.container`.
 * @property {(string|HTMLElement)} container A DOM node or CSS selector to find the container where the hosted field will be inserted.
 * @property {string} [placeholder] Will be used as the `placeholder` attribute of the input. If `placeholder` is not natively supported by the browser, it will be polyfilled.
 * @property {string} [type] Will be used as the `type` attribute of the input. To mask `cvv` input, for instance, `type: "password"` can be used.
 * @property {string} [iframeTitle] The title used for the iframe containing the credit card input. By default, this will be `Secure Credit Card Frame - <the name of the specific field>`.
 * @property {string} [internalLabel] Each Hosted Field iframe has a hidden label that is used by screen readers to identify the input. The `internalLabel` property can be used to customize the field for localization purposes. The default values are:
 * * number: Credit Card Number
 * * cvv: CVV
 * * expirationDate: Expiration Date
 * * expirationMonth: Expiration Month
 * * expirationYear: Expiration Year
 * * postalCode: Postal Code
 * * cardholderName: Cardholder Name
 * @property {boolean} [formatInput=true] Enable or disable automatic formatting on this field.
 * @property {(object|boolean)} [maskInput=false] Enable or disable input masking when input is not focused. If set to `true` instead of an object, the defaults for the `maskInput` parameters will be used.
 * @property {string} [maskInput.character=•] The character to use when masking the input. The default character ('•') uses a unicode symbol, so the webpage must support UTF-8 characters when using the default.
 * @property {Boolean} [maskInput.showLastFour=false] Only applicable for the credit card field. Whether or not to show the last 4 digits of the card when masking.
 * @property {(object|boolean)} [select] If truthy, this field becomes a `<select>` dropdown list. This can only be used for `expirationMonth` and `expirationYear` fields. If you do not use a `placeholder` property for the field, the current month/year will be the default selected value.
 * @property {string[]} [select.options] An array of 12 strings, one per month. This can only be used for the `expirationMonth` field. For example, the array can look like `['01 - January', '02 - February', ...]`.
 * @property {number} [maxCardLength] This option applies only to the number field. Allows a limit to the length of the card number, even if the card brand may support numbers of a greater length. If the value passed is greater than the max length for a card brand, the smaller number of the 2 values will be used. For example, is `maxCardLength` is set to 16, but an American Express card is entered (which has a max card length of 15), a max card length of 15 will be used.
 * @property {number} [maxlength] This option applies only to the CVV and postal code fields. Will be used as the `maxlength` attribute of the input. The primary use cases for the `maxlength` option are: limiting the length of the CVV input for CVV-only verifications when the card type is known and setting the length of the postal code input when cards are coming from a known region. The default `maxlength` for the postal code input is `10`.
 * @property {number} [minlength=3] This option applies only to the cvv and postal code fields. Will be used as the `minlength` attribute of the input.
 * For postal code fields, the default value is 3, representing the Icelandic postal code length. This option's primary use case is to increase the `minlength`, e.g. for US customers, the postal code `minlength` can be set to 5.
 * For cvv fields, the default value is 3. The `minlength` attribute only applies to integrations capturing a cvv without a number field.
 * @property {string} [prefill] A value to prefill the field with. For example, when creating an update card form, you can prefill the expiration date fields with the old expiration date data.
 * @property {boolean} [rejectUnsupportedCards=false] Deprecated since version 3.46.0, use `supportedCardBrands` instead. Only allow card types that your merchant account is able to process. Unsupported card types will invalidate the card form. e.g. if you only process Visa cards, a customer entering a American Express card would get an invalid card field. This can only be used for the `number` field.
 * @property {object} [supportedCardBrands] Override card brands that are supported by the card form. Pass `'card-brand-id': true` to override the default in the merchant configuration and enable a card brand. Pass `'card-brand-id': false` to disable a card brand. Unsupported card types will invalidate the card form. e.g. if you only process Visa cards, a customer entering an American Express card would get an invalid card field. This can only be used for the  `number` field. (Note: only allow card types that your merchant account is actually able to process.)
 *
 * Valid card brand ids are:
 * * visa
 * * mastercard
 * * american-express
 * * diners-club
 * * discover
 * * jcb
 * * union-pay
 * * maestro
 * * elo
 * * mir
 * * hiper
 * * hipercard
 */

/**
 * An object that has {@link module:braintree-web/hosted-fields~field field objects} for each field. Used in {@link module:braintree-web/hosted-fields~create create}.
 * @typedef {object} fieldOptions
 * @property {field} [number] A field for card number.
 * @property {field} [expirationDate] A field for expiration date in `MM/YYYY` or `MM/YY` format. This should not be used with the `expirationMonth` and `expirationYear` properties.
 * @property {field} [expirationMonth] A field for expiration month in `MM` format. This should be used with the `expirationYear` property.
 * @property {field} [expirationYear] A field for expiration year in `YYYY` or `YY` format. This should be used with the `expirationMonth` property.
 * @property {field} [cvv] A field for 3 or 4 digit card verification code (like CVV or CID). If you wish to create a CVV-only payment method nonce to verify a card already stored in your Vault, omit all other fields to only collect CVV.
 * @property {field} [postalCode] A field for postal or region code.
 * @property {field} [cardholderName] A field for the cardholder name on the customer's credit card.
 */

/**
 * An object that represents CSS that will be applied in each hosted field. This object looks similar to CSS. Typically, these styles involve fonts (such as `font-family` or `color`).
 *
 * You may also pass the name of a class on your site that contains the styles you would like to apply. The style properties will be automatically pulled off the class and applied to the Hosted Fields inputs. Note: this is recommended for `input` elements only. If using a `select` for the expiration date, unexpected styling may occur.
 *
 * These are the CSS properties that Hosted Fields supports. Any other CSS should be specified on your page and outside of any Braintree configuration. Trying to set unsupported properties will fail and put a warning in the console.
 *
 * Supported CSS properties are:
 * `appearance`
 * `box-shadow`
 * `color`
 * `direction`
 * `font-family`
 * `font-size-adjust`
 * `font-size`
 * `font-stretch`
 * `font-style`
 * `font-variant-alternates`
 * `font-variant-caps`
 * `font-variant-east-asian`
 * `font-variant-ligatures`
 * `font-variant-numeric`
 * `font-variant`
 * `font-weight`
 * `font`
 * `letter-spacing`
 * `line-height`
 * `opacity`
 * `outline`
 * `margin`
 * `margin-top`
 * `margin-right`
 * `margin-bottom`
 * `margin-left`
 * `padding`
 * `padding-top`
 * `padding-right`
 * `padding-bottom`
 * `padding-left`
 * `text-align`
 * `text-shadow`
 * `transition`
 * `-moz-appearance`
 * `-moz-box-shadow`
 * `-moz-osx-font-smoothing`
 * `-moz-tap-highlight-color`
 * `-moz-transition`
 * `-webkit-appearance`
 * `-webkit-box-shadow`
 * `-webkit-font-smoothing`
 * `-webkit-tap-highlight-color`
 * `-webkit-transition`
 * @typedef {object} styleOptions
 */

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {fieldOptions} options.fields A {@link module:braintree-web/hosted-fields~fieldOptions set of options for each field}.
 * @param {styleOptions} [options.styles] {@link module:braintree-web/hosted-fields~styleOptions Styles} applied to each field.
 * @param {boolean} [options.preventAutofill=false] When true, browsers will not try to prompt the customer to autofill their credit card information.
 * @param {callback} [callback] The second argument, `data`, is the {@link HostedFields} instance. If no callback is provided, `create` returns a promise that resolves with the {@link HostedFields} instance.
 * @returns {void}
 * @example
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       'font-size': '16pt',
 *       'color': '#3A3A3A'
 *     },
 *     '.number': {
 *       'font-family': 'monospace'
 *     },
 *     '.valid': {
 *       'color': 'green'
 *     }
 *   },
 *   fields: {
 *     number: {
 *       container: '#card-number'
 *     },
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       container: '#expiration-date'
 *     }
 *   }
 * }, callback);
 * @example <caption>With cardholder name</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     number: {
 *       container: '#card-number'
 *     },
 *     cardholderName: {
 *       container: '#cardholder-name'
 *     },
 *     cvv: {
 *       container: '#cvv',
 *     },
 *     expirationDate: {
 *       container: '#expiration-date'
 *     }
 *   }
 * }, callback);
 * @example <caption>Applying styles with a class name</caption>
 * // in document head
 * <style>
 *   .braintree-input-class {
 *     color: black;
 *   }
 *   .braintree-valid-class {
 *     color: green;
 *   }
 *   .braintree-invalid-class {
 *     color: red;
 *   }
 * </style>
 * // in a script tag
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': 'braintree-input-class',
 *     '.invalid': 'braintree-invalid-class',
 *     '.valid': {
 *       // you can also use the object syntax alongside
 *       // the class name syntax
 *       color: green;
 *     }
 *   },
 *   fields: {
 *     number: {
 *       container: '#card-number'
 *     },
 *     // etc...
 *   }
 * }, callback);
 * @example <caption>Right to Left Language Support</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       // other styles
 *       direction: 'rtl'
 *     },
 *   },
 *   fields: {
 *     number: {
 *       container: '#card-number',
 *       // Credit card formatting is not currently supported
 *       // with RTL languages, so we need to turn it off for the number input
 *       formatInput: false
 *     },
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       container: '#expiration-date',
 *       type: 'month'
 *     }
 *   }
 * }, callback);
 * @example <caption>Setting up Hosted Fields to tokenize CVV only</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     // Only add the `cvv` option.
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     }
 *   }
 * }, callback);
 * @example <caption>Creating an expiration date update form with prefilled data</caption>
 * var storedCreditCardInformation = {
 *   // get this info from your server
 *   // with a payment method lookup
 *   month: '09',
 *   year: '2017'
 * };
 *
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     expirationMonth: {
 *       container: '#expiration-month',
 *       prefill: storedCreditCardInformation.month
 *     },
 *     expirationYear: {
 *       container: '#expiration-year',
 *       prefill: storedCreditCardInformation.year
 *     }
 *   }
 * }, callback);
 * @example <caption>Validate the card form for supported card types</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     number: {
 *       container: '#card-number',
 *       supportedCardBrands: {
 *         visa: false, // prevents Visas from showing up as valid even when the Braintree control panel is configured to allow them
 *         'diners-club': true // allow Diners Club cards to be valid (processed as Discover cards on the Braintree backend)
 *       }
 *     },
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       container: '#expiration-date',
 *       type: 'month'
 *     }
 *   },
 * }, callback);
 */
function create(options) {
  return basicComponentVerification
    .verify({
      name: "Hosted Fields",
      authorization: options.authorization,
      client: options.client,
    })
    .then(function () {
      var integration = new HostedFields(options);

      return new Promise(function (resolve, reject) {
        integration.on("ready", function () {
          resolve(integration);
        });
        integration.on("timeout", function () {
          reject(new BraintreeError(errors.HOSTED_FIELDS_TIMEOUT));
        });
      });
    });
}

module.exports = {
  /**
   * @static
   * @function supportsInputFormatting
   * @description Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true. For a list of unsupported browsers, [go here](https://github.com/braintree/restricted-input/blob/main/README.md#browsers-where-formatting-is-turned-off-automatically).
   * @returns {Boolean} Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true.
   * @example
   * <caption>Conditionally choosing split expiration date inputs if formatting is unavailable</caption>
   * var canFormat = braintree.hostedFields.supportsInputFormatting();
   * var fields = {
   *   number: {
   *     container: '#card-number'
   *   },
   *   cvv: {
   *     container: '#cvv'
   *   }
   * };
   *
   * if (canFormat) {
   *   fields.expirationDate = {
   *     selection: '#expiration-date'
   *   };
   *   functionToCreateAndInsertExpirationDateDivToForm();
   * } else {
   *   fields.expirationMonth = {
   *     selection: '#expiration-month'
   *   };
   *   fields.expirationYear = {
   *     selection: '#expiration-year'
   *   };
   *   functionToCreateAndInsertExpirationMonthAndYearDivsToForm();
   * }
   *
   * braintree.hostedFields.create({
   *   client: clientInstance,
   *   styles: {
   *     // Styles
   *   },
   *   fields: fields
   * }, callback);
   */
  supportsInputFormatting: supportsInputFormatting,
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION,
};

},{"../lib/basic-component-verification":77,"../lib/braintree-error":79,"./external/hosted-fields":64,"./shared/errors":69,"@braintree/wrap-promise":33,"restricted-input/supports-input-formatting":59}],67:[function(_dereq_,module,exports){
"use strict";

var isAndroid = _dereq_("@braintree/browser-detection/is-android");
var isChromeOS = _dereq_("@braintree/browser-detection/is-chrome-os");
var isIos = _dereq_("@braintree/browser-detection/is-ios");
var isChrome = _dereq_("@braintree/browser-detection/is-chrome");

function hasSoftwareKeyboard() {
  return isAndroid() || isChromeOS() || isIos();
}

function isChromeIos() {
  return isChrome() && isIos();
}

module.exports = {
  isAndroid: isAndroid,
  isChromeOS: isChromeOS,
  isChromeIos: isChromeIos,
  isFirefox: _dereq_("@braintree/browser-detection/is-firefox"),
  isIos: isIos,
  isIosWebview: _dereq_("@braintree/browser-detection/is-ios-webview"),
  hasSoftwareKeyboard: hasSoftwareKeyboard,
};

},{"@braintree/browser-detection/is-android":17,"@braintree/browser-detection/is-chrome":19,"@braintree/browser-detection/is-chrome-os":18,"@braintree/browser-detection/is-firefox":20,"@braintree/browser-detection/is-ios":23,"@braintree/browser-detection/is-ios-webview":22}],68:[function(_dereq_,module,exports){
"use strict";

var enumerate = _dereq_("../../lib/enumerate");
var errors = _dereq_("./errors");
var VERSION = "3.92.2";

var constants = {
  VERSION: VERSION,
  maxExpirationYearAge: 19,
  externalEvents: {
    FOCUS: "focus",
    BLUR: "blur",
    EMPTY: "empty",
    NOT_EMPTY: "notEmpty",
    VALIDITY_CHANGE: "validityChange",
    CARD_TYPE_CHANGE: "cardTypeChange",
  },
  defaultMaxLengths: {
    number: 19,
    postalCode: 8,
    expirationDate: 7,
    expirationMonth: 2,
    expirationYear: 4,
    cvv: 3,
  },
  externalClasses: {
    FOCUSED: "braintree-hosted-fields-focused",
    INVALID: "braintree-hosted-fields-invalid",
    VALID: "braintree-hosted-fields-valid",
  },
  navigationDirections: {
    BACK: "before",
    FORWARD: "after",
  },
  defaultIFrameStyle: {
    border: "none",
    width: "100%",
    height: "100%",
    float: "left",
  },
  tokenizationErrorCodes: {
    81724: errors.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
    // NEXT_MAJOR_VERSION this error triggers for both AVS and CVV errors
    // but the code name implies that it would only trigger for CVV verification
    // failures
    81736: errors.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED,
  },
  allowedStyles: [
    "-moz-appearance",
    "-moz-box-shadow",
    "-moz-osx-font-smoothing",
    "-moz-tap-highlight-color",
    "-moz-transition",
    "-webkit-appearance",
    "-webkit-box-shadow",
    "-webkit-font-smoothing",
    "-webkit-tap-highlight-color",
    "-webkit-transition",
    "appearance",
    "box-shadow",
    "color",
    "direction",
    "font",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-variant-alternates",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-weight",
    "letter-spacing",
    "line-height",
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "opacity",
    "outline",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "text-align",
    "text-shadow",
    "transition",
  ],
  allowedFields: {
    cardholderName: {
      name: "cardholder-name",
      label: "Cardholder Name",
    },
    number: {
      name: "credit-card-number",
      label: "Credit Card Number",
    },
    cvv: {
      name: "cvv",
      label: "CVV",
    },
    expirationDate: {
      name: "expiration",
      label: "Expiration Date",
    },
    expirationMonth: {
      name: "expiration-month",
      label: "Expiration Month",
    },
    expirationYear: {
      name: "expiration-year",
      label: "Expiration Year",
    },
    postalCode: {
      name: "postal-code",
      label: "Postal Code",
    },
  },
  allowedAttributes: {
    "aria-invalid": "boolean",
    "aria-required": "boolean",
    disabled: "boolean",
    placeholder: "string",
  },
  autocompleteMappings: {
    "cardholder-name": "cc-name",
    "credit-card-number": "cc-number",
    expiration: "cc-exp",
    "expiration-month": "cc-exp-month",
    "expiration-year": "cc-exp-year",
    cvv: "cc-csc",
    "postal-code": "billing postal-code",
  },
};

constants.events = enumerate(
  [
    "ADD_CLASS",
    "AUTOFILL_DATA_AVAILABLE",
    "BIN_AVAILABLE",
    "CARD_FORM_ENTRY_HAS_BEGUN",
    "CLEAR_FIELD",
    "CONFIGURATION",
    "FRAME_READY",
    "INPUT_EVENT",
    "READY_FOR_CLIENT",
    "REMOVE_ATTRIBUTE",
    "REMOVE_CLASS",
    "REMOVE_FOCUS_INTERCEPTS",
    "SET_ATTRIBUTE",
    "SET_MESSAGE",
    "SET_MONTH_OPTIONS",
    "TOKENIZATION_REQUEST",
    "TRIGGER_FOCUS_CHANGE",
    "TRIGGER_INPUT_FOCUS",
    "VALIDATE_STRICT",
  ],
  "hosted-fields:"
);

module.exports = constants;

},{"../../lib/enumerate":86,"./errors":69}],69:[function(_dereq_,module,exports){
"use strict";

/**
 * @name BraintreeError.Hosted Fields - Creation Error Codes
 * @description Errors that occur when [creating the Hosted Fields component](./module-braintree-web_hosted-fields.html#.create).
 * @property {UNKNOWN} HOSTED_FIELDS_TIMEOUT Occurs when Hosted Fields does not finish setting up within 60 seconds.
 * @property {MERCHANT} HOSTED_FIELDS_INVALID_FIELD_KEY Occurs when Hosted Fields is instantiated with an invalid Field option.
 * @property {MERCHANT} HOSTED_FIELDS_INVALID_FIELD_SELECTOR Occurs when Hosted Fields given a field selector that is not valid.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME Occurs when Hosted Fields given a field selector that already contains an iframe.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_PROPERTY_INVALID Occurs when a field configuration option is not valid.
 */

/**
 * @name BraintreeError.Hosted Fields - Field Manipulation Error Codes
 * @description Errors that occur when modifying fields through [`addClass`](./HostedFields.html#addClass), [`removeClass`](./HostedFields.html#removeClass), [`setAttribute`](./HostedFields.html#setAttribute), [`removeAttribute`](./HostedFields.html#removeAttribute), [`clear`](./HostedFields.html#clear), [`focus`](./HostedFields.html#focus), and [`setMonthOptions`](./HostedFields.html#setMonthOptions).
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_INVALID Occurs when attempting to modify a field that is not a valid Hosted Fields option.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_NOT_PRESENT Occurs when attempting to modify a field that is not configured with Hosted Fields.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_PROPERTY_INVALID Occurs when a field configuration option is not valid.
 */

/**
 * @name BraintreeError.Hosted Fields - Set Attribute Error Codes
 * @description Errors that occur when using the [`setAttribute` method](./HostedFields.html#setAttribute)
 * @property {MERCHANT} HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED Occurs when trying to set an attribute that is not supported to be set.
 * @property {MERCHANT} HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED Occurs when the type of value for an attribute is not allowed to be set.
 */

/**
 * @name BraintreeError.Hosted Fields - Tokenize Error Codes
 * @description Errors that occur when [tokenizing the card details with Hosted Fields](./HostedFields.html#tokenize).
 * @property {NETWORK} HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR Occurs when the Braintree gateway cannot be contacted.
 * @property {CUSTOMER} HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE Occurs when attempting to vault a card, but the client token being used is configured to fail if the card already exists in the vault.
 * @property {CUSTOMER} HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED Occurs when cvv verification is turned on in the Braintree control panel.
 * @property {CUSTOMER} HOSTED_FIELDS_FAILED_TOKENIZATION Occurs when the credit card details were sent to Braintree, but failed to tokenize.
 * @property {CUSTOMER} HOSTED_FIELDS_FIELDS_EMPTY Occurs when all the Hosted Fields inputs are empty.
 * @property {CUSTOMER} HOSTED_FIELDS_FIELDS_INVALID Occurs when one ore more fields are invalid.
 */

var BraintreeError = _dereq_("../../lib/braintree-error");

module.exports = {
  HOSTED_FIELDS_TIMEOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: "HOSTED_FIELDS_TIMEOUT",
    message: "Hosted Fields timed out when attempting to set up.",
  },
  HOSTED_FIELDS_INVALID_FIELD_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_INVALID_FIELD_KEY",
  },
  HOSTED_FIELDS_INVALID_FIELD_SELECTOR: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_INVALID_FIELD_SELECTOR",
    message: "Selector does not reference a valid DOM node.",
  },
  HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME",
    message: "Element already contains a Braintree iframe.",
  },
  HOSTED_FIELDS_FIELD_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_FIELD_INVALID",
  },
  HOSTED_FIELDS_FIELD_NOT_PRESENT: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_FIELD_NOT_PRESENT",
  },
  HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: "HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR",
    message: "A tokenization network error occurred.",
  },
  HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE: {
    type: BraintreeError.types.CUSTOMER,
    code: "HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE",
    message: "This credit card already exists in the merchant's vault.",
  },
  HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED: {
    type: BraintreeError.types.CUSTOMER,
    code: "HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED",
    message: "CVV verification failed during tokenization.",
  },
  HOSTED_FIELDS_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: "HOSTED_FIELDS_FAILED_TOKENIZATION",
    message: "The supplied card data failed tokenization.",
  },
  HOSTED_FIELDS_FIELDS_EMPTY: {
    type: BraintreeError.types.CUSTOMER,
    code: "HOSTED_FIELDS_FIELDS_EMPTY",
    message: "All fields are empty. Cannot tokenize empty card fields.",
  },
  HOSTED_FIELDS_FIELDS_INVALID: {
    type: BraintreeError.types.CUSTOMER,
    code: "HOSTED_FIELDS_FIELDS_INVALID",
    message:
      "Some payment input fields are invalid. Cannot tokenize invalid card fields.",
  },
  HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED",
  },
  HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED",
  },
  HOSTED_FIELDS_FIELD_PROPERTY_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: "HOSTED_FIELDS_FIELD_PROPERTY_INVALID",
  },
};

},{"../../lib/braintree-error":79}],70:[function(_dereq_,module,exports){
"use strict";

function findParentTags(element, tag) {
  var parent = element.parentNode;
  var parents = [];

  while (parent != null) {
    if (parent.tagName != null && parent.tagName.toLowerCase() === tag) {
      parents.push(parent);
    }

    parent = parent.parentNode;
  }

  return parents;
}

module.exports = findParentTags;

},{}],71:[function(_dereq_,module,exports){
"use strict";

var browserDetection = _dereq_("./browser-detection");
var constants = _dereq_("./constants");
var allowedFields = Object.keys(constants.allowedFields);
var directions = constants.navigationDirections;

var focusIntercept = {
  generate: function (hostedFieldsId, type, direction, handler) {
    var input = document.createElement("input");
    var focusInterceptStyles = {
      border: "none !important",
      display: "block !important",
      height: "1px !important",
      left: "-1px !important",
      opacity: "0 !important",
      position: "absolute !important",
      top: "-1px !important",
      width: "1px !important",
    };
    var shouldCreateFocusIntercept =
      browserDetection.hasSoftwareKeyboard() || browserDetection.isFirefox();

    if (!shouldCreateFocusIntercept) {
      return document.createDocumentFragment();
    }

    input.setAttribute("aria-hidden", "true");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("data-braintree-direction", direction);
    input.setAttribute("data-braintree-type", type);
    input.setAttribute(
      "id",
      "bt-" + type + "-" + direction + "-" + hostedFieldsId
    );
    input.setAttribute(
      "style",
      JSON.stringify(focusInterceptStyles)
        .replace(/[{}"]/g, "")
        .replace(/,/g, ";")
    );

    input.classList.add("focus-intercept");

    input.addEventListener("focus", function (event) {
      handler(event);

      /*
        Certain browsers without software keyboards (Firefox, Internet
        Explorer) need the focus intercept inputs that get inserted
        around the actual input to blur themselves, otherwise the
        browser gets confused about what should have focus. Can't
        apply this to browsers with software keyboards however,
        because it blurs everything, and focus on the actual input is
        also lost.
      */
      if (!browserDetection.hasSoftwareKeyboard()) {
        input.blur();
      }
    });

    return input;
  },
  destroy: function (idString) {
    var focusInputs;

    if (!idString) {
      focusInputs = document.querySelectorAll("[data-braintree-direction]");
      focusInputs = [].slice.call(focusInputs);
    } else {
      focusInputs = [document.getElementById(idString)];
    }

    focusInputs.forEach(function (node) {
      if (
        node &&
        node.nodeType === 1 &&
        focusIntercept.matchFocusElement(node.getAttribute("id"))
      ) {
        node.parentNode.removeChild(node);
      }
    });
  },
  matchFocusElement: function (idString) {
    var idComponents, hasBTPrefix, isAllowedType, isValidDirection;

    if (!idString) {
      return false;
    }

    idComponents = idString.split("-");

    if (idComponents.length < 4) {
      return false;
    }

    hasBTPrefix = idComponents[0] === "bt";
    isAllowedType = allowedFields.indexOf(idComponents[1]) > -1;
    isValidDirection =
      idComponents[2] === directions.BACK ||
      idComponents[2] === directions.FORWARD;

    return Boolean(hasBTPrefix && isAllowedType && isValidDirection);
  },
};

module.exports = focusIntercept;

},{"./browser-detection":67,"./constants":68}],72:[function(_dereq_,module,exports){
"use strict";

var creditCardType = _dereq_("credit-card-type");

module.exports = function (number) {
  var results = creditCardType(number);

  results.forEach(function (card) {
    // NEXT_MAJOR_VERSION credit-card-type fixed the mastercard enum
    // but we still pass master-card in the braintree API
    // in a major version bump, we can remove this and
    // this will be mastercard instead of master-card
    if (card.type === "mastercard") {
      card.type = "master-card";
    }
  });

  return results;
};

},{"credit-card-type":34}],73:[function(_dereq_,module,exports){
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

},{"./constants":80,"./create-authorization-data":83,"./json-clone":90}],74:[function(_dereq_,module,exports){
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

},{"./add-metadata":73,"./constants":80}],75:[function(_dereq_,module,exports){
"use strict";

var loadScript = _dereq_("@braintree/asset-loader/load-script");

module.exports = {
  loadScript: loadScript,
};

},{"@braintree/asset-loader/load-script":3}],76:[function(_dereq_,module,exports){
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

},{}],77:[function(_dereq_,module,exports){
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

},{"./braintree-error":79,"./errors":87}],78:[function(_dereq_,module,exports){
"use strict";

var once = _dereq_("./once");

function call(fn, callback) {
  var isSync = fn.length === 0;

  if (isSync) {
    fn();
    callback(null);
  } else {
    fn(callback);
  }
}

module.exports = function (functions, cb) {
  var i;
  var length = functions.length;
  var remaining = length;
  var callback = once(cb);

  if (length === 0) {
    callback(null);

    return;
  }

  function finish(err) {
    if (err) {
      callback(err);

      return;
    }

    remaining -= 1;
    if (remaining === 0) {
      callback(null);
    }
  }

  for (i = 0; i < length; i++) {
    call(functions[i], finish);
  }
};

},{"./once":92}],79:[function(_dereq_,module,exports){
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

},{"./enumerate":86}],80:[function(_dereq_,module,exports){
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

},{}],81:[function(_dereq_,module,exports){
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

},{"./braintree-error":79,"./errors":87}],82:[function(_dereq_,module,exports){
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

},{"./constants":80}],83:[function(_dereq_,module,exports){
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

},{"../lib/constants":80,"../lib/vendor/polyfill":95}],84:[function(_dereq_,module,exports){
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

},{"./assets":75,"./braintree-error":79,"./errors":87}],85:[function(_dereq_,module,exports){
"use strict";

var batchExecuteFunctions = _dereq_("./batch-execute-functions");

function Destructor() {
  this._teardownRegistry = [];

  this._isTearingDown = false;
}

Destructor.prototype.registerFunctionForTeardown = function (fn) {
  if (typeof fn === "function") {
    this._teardownRegistry.push(fn);
  }
};

Destructor.prototype.teardown = function (callback) {
  if (this._isTearingDown) {
    callback(new Error("Destructor is already tearing down"));

    return;
  }

  this._isTearingDown = true;

  batchExecuteFunctions(
    this._teardownRegistry,
    function (err) {
      this._teardownRegistry = [];
      this._isTearingDown = false;

      if (typeof callback === "function") {
        callback(err);
      }
    }.bind(this)
  );
};

module.exports = Destructor;

},{"./batch-execute-functions":78}],86:[function(_dereq_,module,exports){
"use strict";

function enumerate(values, prefix) {
  prefix = prefix == null ? "" : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],87:[function(_dereq_,module,exports){
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

},{"./braintree-error":79}],88:[function(_dereq_,module,exports){
"use strict";

module.exports = function findRootNode(element) {
  while (element.parentNode) {
    element = element.parentNode;
  }

  return element;
};

},{}],89:[function(_dereq_,module,exports){
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

},{}],90:[function(_dereq_,module,exports){
"use strict";

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],91:[function(_dereq_,module,exports){
"use strict";

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === "function";
  });
};

},{}],92:[function(_dereq_,module,exports){
"use strict";

function once(fn) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      fn.apply(null, arguments);
    }
  };
}

module.exports = once;

},{}],93:[function(_dereq_,module,exports){
"use strict";

var uuid = _dereq_("@braintree/uuid");
var findRootNode = _dereq_("./find-root-node");

// based on https://github.com/krakenjs/belter/blob/cdddc4f8ddb172d29db9e7e1ad1eeeacfb93e215/src/dom.js#L981-L1031
// thanks @bluepnume

function isShadowElement(element) {
  element = findRootNode(element);

  return element.toString() === "[object ShadowRoot]";
}

function getShadowHost(element) {
  element = findRootNode(element);

  if (!isShadowElement(element)) {
    return null;
  }

  return element.host;
}

function transformToSlot(element, styles) {
  var styleNode = findRootNode(element).querySelector("style");
  var shadowHost = getShadowHost(element);
  var slotName = "shadow-slot-" + uuid();
  var slot = document.createElement("slot");
  var slotProvider = document.createElement("div");

  slot.setAttribute("name", slotName);
  element.appendChild(slot);

  slotProvider.setAttribute("slot", slotName);
  shadowHost.appendChild(slotProvider);

  if (styles) {
    if (!styleNode) {
      styleNode = document.createElement("style");
      element.appendChild(styleNode);
    }

    styleNode.sheet.insertRule(
      '::slotted([slot="' + slotName + '"]) { ' + styles + " }"
    );
  }

  if (isShadowElement(shadowHost)) {
    return transformToSlot(slotProvider, styles);
  }

  return slotProvider;
}

module.exports = {
  isShadowElement: isShadowElement,
  getShadowHost: getShadowHost,
  transformToSlot: transformToSlot,
};

},{"./find-root-node":88,"@braintree/uuid":29}],94:[function(_dereq_,module,exports){
"use strict";

function useMin(isDebug) {
  return isDebug ? "" : ".min";
}

module.exports = useMin;

},{}],95:[function(_dereq_,module,exports){
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

},{}]},{},[66])(66)
});
