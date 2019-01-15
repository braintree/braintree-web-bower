(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.braintree = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

var PromisePolyfill = _dereq_('promise-polyfill');

module.exports = global.Promise || PromisePolyfill;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":28}],2:[function(_dereq_,module,exports){
'use strict';

var Promise = _dereq_('./lib/promise');
var scriptPromiseCache = {};

function loadScript(options) {
  var attrs, container, script, scriptLoadPromise;
  var stringifiedOptions = JSON.stringify(options);

  if (!options.forceScriptReload) {
    scriptLoadPromise = scriptPromiseCache[stringifiedOptions];

    if (scriptLoadPromise) {
      return scriptLoadPromise;
    }
  }

  script = document.createElement('script');
  attrs = options.dataAttributes || {};
  container = options.container || document.head;

  script.src = options.src;
  script.id = options.id;
  script.async = true;

  Object.keys(attrs).forEach(function (key) {
    script.setAttribute('data-' + key, attrs[key]);
  });

  scriptLoadPromise = new Promise(function (resolve, reject) {
    script.addEventListener('load', function () {
      resolve(script);
    });
    script.addEventListener('error', function () {
      reject(new Error(options.src + ' failed to load.'));
    });
    script.addEventListener('abort', function () {
      reject(new Error(options.src + ' has aborted.'));
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
(function (global){
'use strict';

module.exports = function isAndroid(ua) {
  ua = ua || global.navigator.userAgent;
  return /Android/.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(_dereq_,module,exports){
'use strict';

var isEdge = _dereq_('./is-edge');
var isSamsung = _dereq_('./is-samsung');

module.exports = function isChrome(ua) {
  ua = ua || navigator.userAgent;
  return (ua.indexOf('Chrome') !== -1 || ua.indexOf('CriOS') !== -1) && !isEdge(ua) && !isSamsung(ua);
};

},{"./is-edge":5,"./is-samsung":15}],5:[function(_dereq_,module,exports){
'use strict';

module.exports = function isEdge(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Edge/') !== -1;
};

},{}],6:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIE11 = _dereq_('./is-ie11');

module.exports = function isIE(ua) {
  ua = ua || global.navigator.userAgent;
  return ua.indexOf('MSIE') !== -1 || isIE11(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ie11":7}],7:[function(_dereq_,module,exports){
'use strict';

module.exports = function isIe11(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Trident/7') !== -1;
};

},{}],8:[function(_dereq_,module,exports){
'use strict';

module.exports = function isIe9(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('MSIE 9') !== -1;
};

},{}],9:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isIosFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return /FxiOS/i.test(ua);
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(_dereq_,module,exports){
'use strict';

var isIos = _dereq_('./is-ios');
var webkitRegexp = /webkit/i;

function isWebkit(ua) {
  return ua.match(webkitRegexp);
}

module.exports = function isIosSafari(ua) {
  ua = ua || navigator.userAgent;

  return isIos(ua) && isWebkit(ua) && ua.indexOf('CriOS') === -1;
};

},{"./is-ios":13}],11:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIos = _dereq_('./is-ios');

// The Google Search iOS app is technically a webview and doesn't support popups.
function isGoogleSearchApp(ua) {
  return /\bGSA\b/.test(ua);
}

module.exports = function isIosWebview(ua) {
  ua = ua || global.navigator.userAgent;
  if (isIos(ua)) {
    if (isGoogleSearchApp(ua)) {
      return true;
    }
    return /.+AppleWebKit(?!.*Safari)/.test(ua);
  }
  return false;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios":13}],12:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIosWebview = _dereq_('./is-ios-webview');

module.exports = function isIosWKWebview(ua, statusBarVisible) {
  statusBarVisible = typeof statusBarVisible !== 'undefined' ? statusBarVisible : global.statusbar.visible;
  return isIosWebview(ua) && statusBarVisible;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios-webview":11}],13:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIosFirefox = _dereq_('./is-ios-firefox');

module.exports = function isMobileFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return isIosFirefox(ua) || /iPhone|iPod|iPad|Mobile|Tablet/i.test(ua) && /Firefox/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios-firefox":9}],15:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(_dereq_,module,exports){
(function (global){
'use strict';

var MINIMUM_SUPPORTED_CHROME_IOS_VERSION = 48;

var isAndroid = _dereq_('./is-android');
var isIosFirefox = _dereq_('./is-ios-firefox');
var isIosWebview = _dereq_('./is-ios-webview');
var isChrome = _dereq_('./is-chrome');
var isSamsungBrowser = _dereq_('./is-samsung');

function isUnsupportedIosChrome(ua) {
  var match, version;

  ua = ua || global.navigator.userAgent;
  match = ua.match(/CriOS\/(\d+)\./);

  if (!match) {
    return false;
  }

  version = parseInt(match[1], 10);

  return version < MINIMUM_SUPPORTED_CHROME_IOS_VERSION;
}

function isOperaMini(ua) {
  ua = ua || global.navigator.userAgent;
  return ua.indexOf('Opera Mini') > -1;
}

function isAndroidWebview(ua) {
  var androidWebviewRegExp = /Version\/[\d\.]+/;

  ua = ua || global.navigator.userAgent;
  if (isAndroid(ua)) {
    return androidWebviewRegExp.test(ua) && !isOperaMini(ua);
  }
  return false;
}

function isOldSamsungBrowserOrSamsungWebview(ua) {
  return !isChrome(ua) && !isSamsungBrowser(ua) && /samsung/i.test(ua);
}

module.exports = function supportsPopups(ua) {
  ua = ua || global.navigator.userAgent;
  return !(isIosWebview(ua) || isIosFirefox(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isUnsupportedIosChrome(ua) || isOldSamsungBrowserOrSamsungWebview(ua));
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-android":3,"./is-chrome":4,"./is-ios-firefox":9,"./is-ios-webview":11,"./is-samsung":15}],17:[function(_dereq_,module,exports){
'use strict';

function _classesOf(element) {
  return element.className.trim().split(/\s+/);
}

function add(element) {
  var toAdd = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toAdd.indexOf(classname) === -1;
  }).concat(toAdd).join(' ');

  element.className = className;
}

function remove(element) {
  var toRemove = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toRemove.indexOf(classname) === -1;
  }).join(' ');

  element.className = className;
}

function toggle(element, classname, adding) {
  if (adding) {
    add(element, classname);
  } else {
    remove(element, classname);
  }
}

module.exports = {
  add: add,
  remove: remove,
  toggle: toggle
};

},{}],18:[function(_dereq_,module,exports){
'use strict';

var setAttributes = _dereq_('./lib/set-attributes');
var defaultAttributes = _dereq_('./lib/default-attributes');
var assign = _dereq_('./lib/assign');

module.exports = function createFrame(options) {
  var iframe = document.createElement('iframe');
  var config = assign({}, defaultAttributes, options);

  if (config.style && typeof config.style !== 'string') {
    assign(iframe.style, config.style);
    delete config.style;
  }

  setAttributes(iframe, config);

  if (!iframe.getAttribute('id')) {
    iframe.id = iframe.name;
  }

  return iframe;
};

},{"./lib/assign":19,"./lib/default-attributes":20,"./lib/set-attributes":21}],19:[function(_dereq_,module,exports){
'use strict';

module.exports = function assign(target) {
  var objs = Array.prototype.slice.call(arguments, 1);

  objs.forEach(function (obj) {
    if (typeof obj !== 'object') { return; }

    Object.keys(obj).forEach(function (key) {
      target[key] = obj[key];
    });
  });

  return target;
}

},{}],20:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};

},{}],21:[function(_dereq_,module,exports){
'use strict';

module.exports = function setAttributes(element, attributes) {
  var value;

  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      value = attributes[key];

      if (value == null) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, value);
      }
    }
  }
};

},{}],22:[function(_dereq_,module,exports){
'use strict';

function deferred(fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
}

module.exports = deferred;

},{}],23:[function(_dereq_,module,exports){
'use strict';

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

},{}],24:[function(_dereq_,module,exports){
'use strict';

function promiseOrCallback(promise, callback) { // eslint-disable-line consistent-return
  if (callback) {
    promise
      .then(function (data) {
        callback(null, data);
      })
      .catch(function (err) {
        callback(err);
      });
  } else {
    return promise;
  }
}

module.exports = promiseOrCallback;

},{}],25:[function(_dereq_,module,exports){
'use strict';

var deferred = _dereq_('./lib/deferred');
var once = _dereq_('./lib/once');
var promiseOrCallback = _dereq_('./lib/promise-or-callback');

function wrapPromise(fn) {
  return function () {
    var callback;
    var args = Array.prototype.slice.call(arguments);
    var lastArg = args[args.length - 1];

    if (typeof lastArg === 'function') {
      callback = args.pop();
      callback = once(deferred(callback));
    }
    return promiseOrCallback(fn.apply(this, args), callback); // eslint-disable-line no-invalid-this
  };
}

wrapPromise.wrapPrototype = function (target, options) {
  var methods, ignoreMethods, includePrivateMethods;

  options = options || {};
  ignoreMethods = options.ignoreMethods || [];
  includePrivateMethods = options.transformPrivateMethods === true;

  methods = Object.getOwnPropertyNames(target.prototype).filter(function (method) {
    var isNotPrivateMethod;
    var isNonConstructorFunction = method !== 'constructor' &&
      typeof target.prototype[method] === 'function';
    var isNotAnIgnoredMethod = ignoreMethods.indexOf(method) === -1;

    if (includePrivateMethods) {
      isNotPrivateMethod = true;
    } else {
      isNotPrivateMethod = method.charAt(0) !== '_';
    }

    return isNonConstructorFunction &&
      isNotPrivateMethod &&
      isNotAnIgnoredMethod;
  });

  methods.forEach(function (method) {
    var original = target.prototype[method];

    target.prototype[method] = wrapPromise(original);
  });

  return target;
};

module.exports = wrapPromise;

},{"./lib/deferred":22,"./lib/once":23,"./lib/promise-or-callback":24}],26:[function(_dereq_,module,exports){
'use strict';

var testOrder;
var types = {};
var customCards = {};
var VISA = 'visa';
var MASTERCARD = 'mastercard';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var ELO = 'elo';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var MIR = 'mir';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var CVP2 = 'CVP2';
var CVE = 'CVE';
var ORIGINAL_TEST_ORDER = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO,
  ELO,
  MIR
];

function clone(originalObject) {
  var dupe;

  if (!originalObject) { return null; }

  dupe = JSON.parse(JSON.stringify(originalObject));

  return dupe;
}

testOrder = clone(ORIGINAL_TEST_ORDER);

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  patterns: [
    4
  ],
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'Mastercard',
  type: MASTERCARD,
  patterns: [
    [51, 55],
    [2221, 2229],
    [223, 229],
    [23, 26],
    [270, 271],
    2720
  ],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVC,
    size: 3
  }
};

types[AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: AMERICAN_EXPRESS,
  patterns: [
    34,
    37
  ],
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: CID,
    size: 4
  }
};

types[DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: DINERS_CLUB,
  patterns: [
    [300, 305],
    36,
    38,
    39
  ],
  gaps: [4, 10],
  lengths: [14, 16, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  patterns: [
    6011,
    [644, 649],
    65
  ],
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: CID,
    size: 3
  }
};

types[JCB] = {
  niceType: 'JCB',
  type: JCB,
  patterns: [
    2131,
    1800,
    [3528, 3589]
  ],
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
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
    6292
  ],
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVN,
    size: 3
  }
};

types[MAESTRO] = {
  niceType: 'Maestro',
  type: MAESTRO,
  patterns: [
    493698,
    [500000, 506698],
    [506779, 508999],
    [56, 59],
    63,
    67,
    6
  ],
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

types[ELO] = {
  niceType: 'Elo',
  type: ELO,
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
    [655021, 655058]
  ],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVE,
    size: 3
  }
};

types[MIR] = {
  niceType: 'Mir',
  type: MIR,
  patterns: [
    [2200, 2204]
  ],
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVP2,
    size: 3
  }
};

function findType(type) {
  return customCards[type] || types[type];
}

function isValidInputType(cardNumber) {
  return typeof cardNumber === 'string' || cardNumber instanceof String;
}

function hasEnoughResultsToDetermineBestMatch(results) {
  var numberOfResultsWithMaxStrengthProperty = results.filter(function (result) {
    return result.matchStrength;
  }).length;

  // if all possible results have a maxStrength property
  // that means the card number is sufficiently long
  // enough to determine conclusively what the type is
  return numberOfResultsWithMaxStrengthProperty > 0 &&
    numberOfResultsWithMaxStrengthProperty === results.length;
}

function findBestMatch(results) {
  if (!hasEnoughResultsToDetermineBestMatch(results)) {
    return;
  }

  return results.reduce(function (bestMatch, result) { // eslint-disable-line consistent-return
    if (!bestMatch) {
      return result;
    }

    // if the current best match pattern is less specific
    // than this result, set the result as the new best match
    if (bestMatch.matchStrength < result.matchStrength) {
      return result;
    }

    return bestMatch;
  });
}

function getAllCardTypes() {
  return testOrder.map(function (type) {
    return clone(findType(type));
  });
}

function creditCardType(cardNumber) {
  var bestMatch;
  var results = [];

  if (!isValidInputType(cardNumber)) {
    return [];
  }

  if (cardNumber.length === 0) {
    return getAllCardTypes();
  }

  testOrder.forEach(function (type) {
    var cardConfiguration = findType(type);

    loopOverCardPatterns(cardNumber, cardConfiguration, results);
  });

  bestMatch = findBestMatch(results);

  if (bestMatch) {
    return [bestMatch];
  }

  return results;
}

function loopOverCardPatterns(cardNumber, cardConfiguration, results) {
  var i, pattern, patternLength, clonedCardConfiguration;

  for (i = 0; i < cardConfiguration.patterns.length; i++) {
    pattern = cardConfiguration.patterns[i];

    if (!matches(cardNumber, pattern)) {
      continue;
    }

    clonedCardConfiguration = clone(cardConfiguration);

    if (Array.isArray(pattern)) {
      patternLength = String(pattern[0]).length;
    } else {
      patternLength = String(pattern).length;
    }

    if (cardNumber.length >= patternLength) {
      clonedCardConfiguration.matchStrength = patternLength;
    }

    results.push(clonedCardConfiguration);
    break;
  }
}

function matches(cardNumber, pattern) {
  if (Array.isArray(pattern)) {
    return matchesRange(cardNumber, pattern[0], pattern[1]);
  }

  return matchesPattern(cardNumber, pattern);
}

function matchesPattern(cardNumber, pattern) {
  pattern = String(pattern);

  return pattern.substring(0, cardNumber.length) === cardNumber.substring(0, pattern.length);
}

// Adapted from https://github.com/polvo-labs/card-type/blob/aaab11f80fa1939bccc8f24905a06ae3cd864356/src/cardType.js#L37-L42
function matchesRange(cardNumber, min, max) {
  var maxLengthToCheck = String(min).length;
  var substr = cardNumber.substr(0, maxLengthToCheck);
  var integerRepresentationOfCardNumber = parseInt(substr, 10);

  min = parseInt(String(min).substr(0, substr.length), 10);
  max = parseInt(String(max).substr(0, substr.length), 10);

  return integerRepresentationOfCardNumber >= min && integerRepresentationOfCardNumber <= max;
}

creditCardType.getTypeInfo = function (type) {
  return clone(findType(type));
};

function getCardPosition(name, ignoreErrorForNotExisting) {
  var position = testOrder.indexOf(name);

  if (!ignoreErrorForNotExisting && position === -1) {
    throw new Error('"' + name + '" is not a supported card type.');
  }

  return position;
}

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
  var clonedCard;
  var originalObject = customCards[cardType] || types[cardType];

  if (!originalObject) {
    throw new Error('"' + cardType + '" is not a recognized type. Use `addCard` instead.');
  }

  if (updates.type && originalObject.type !== updates.type) {
    throw new Error('Cannot overwrite type parameter.');
  }

  clonedCard = clone(originalObject, true);

  Object.keys(clonedCard).forEach(function (key) {
    if (updates[key]) {
      clonedCard[key] = updates[key];
    }
  });

  customCards[clonedCard.type] = clonedCard;
};

creditCardType.changeOrder = function (name, position) {
  var currentPosition = getCardPosition(name);

  testOrder.splice(currentPosition, 1);
  testOrder.splice(position, 0, name);
};

creditCardType.resetModifications = function () {
  testOrder = clone(ORIGINAL_TEST_ORDER);
  customCards = {};
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO,
  ELO: ELO,
  MIR: MIR
};

module.exports = creditCardType;

},{}],27:[function(_dereq_,module,exports){
(function (global){
'use strict';

var win, framebus;
var popups = [];
var subscribers = {};
var prefix = '/*framebus*/';

function include(popup) {
  if (popup == null) { return false; }
  if (popup.Window == null) { return false; }
  if (popup.constructor !== popup.Window) { return false; }

  popups.push(popup);
  return true;
}

function target(origin) {
  var key;
  var targetedFramebus = {};

  for (key in framebus) {
    if (!framebus.hasOwnProperty(key)) { continue; }

    targetedFramebus[key] = framebus[key];
  }

  targetedFramebus._origin = origin || '*';

  return targetedFramebus;
}

function publish(event) {
  var payload, args;
  var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

  if (_isntString(event)) { return false; }
  if (_isntString(origin)) { return false; }

  args = Array.prototype.slice.call(arguments, 1);

  payload = _packagePayload(event, args, origin);
  if (payload === false) { return false; }

  _broadcast(win.top || win.self, payload, origin);

  return true;
}

function subscribe(event, fn) {
  var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

  if (_subscriptionArgsInvalid(event, fn, origin)) { return false; }

  subscribers[origin] = subscribers[origin] || {};
  subscribers[origin][event] = subscribers[origin][event] || [];
  subscribers[origin][event].push(fn);

  return true;
}

function unsubscribe(event, fn) {
  var i, subscriberList;
  var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

  if (_subscriptionArgsInvalid(event, fn, origin)) { return false; }

  subscriberList = subscribers[origin] && subscribers[origin][event];
  if (!subscriberList) { return false; }

  for (i = 0; i < subscriberList.length; i++) {
    if (subscriberList[i] === fn) {
      subscriberList.splice(i, 1);
      return true;
    }
  }

  return false;
}

function _getOrigin(scope) {
  return scope && scope._origin || '*';
}

function _isntString(string) {
  return typeof string !== 'string';
}

function _packagePayload(event, args, origin) {
  var packaged = false;
  var payload = {
    event: event,
    origin: origin
  };
  var reply = args[args.length - 1];

  if (typeof reply === 'function') {
    payload.reply = _subscribeReplier(reply, origin);
    args = args.slice(0, -1);
  }

  payload.args = args;

  try {
    packaged = prefix + JSON.stringify(payload);
  } catch (e) {
    throw new Error('Could not stringify event: ' + e.message);
  }
  return packaged;
}

function _unpackPayload(e) {
  var payload, replyOrigin, replySource, replyEvent;

  if (e.data.slice(0, prefix.length) !== prefix) { return false; }

  try {
    payload = JSON.parse(e.data.slice(prefix.length));
  } catch (err) {
    return false;
  }

  if (payload.reply != null) {
    replyOrigin = e.origin;
    replySource = e.source;
    replyEvent = payload.reply;

    payload.reply = function reply(data) { // eslint-disable-line consistent-return
      var replyPayload;

      if (!replySource) { return false; }

      replyPayload = _packagePayload(replyEvent, [data], replyOrigin);

      if (replyPayload === false) { return false; }

      replySource.postMessage(replyPayload, replyOrigin);
    };

    payload.args.push(payload.reply);
  }

  return payload;
}

function _attach(w) {
  if (win) { return; }
  win = w || global;

  if (win.addEventListener) {
    win.addEventListener('message', _onmessage, false);
  } else if (win.attachEvent) {
    win.attachEvent('onmessage', _onmessage);
  } else if (win.onmessage === null) {
    win.onmessage = _onmessage;
  } else {
    win = null;
  }
}

// removeIf(production)
function _detach() {
  if (win == null) { return; }

  if (win.removeEventListener) {
    win.removeEventListener('message', _onmessage, false);
  } else if (win.detachEvent) {
    win.detachEvent('onmessage', _onmessage);
  } else if (win.onmessage === _onmessage) {
    win.onmessage = null;
  }

  win = null;
  popups = [];
  subscribers = {};
}
// endRemoveIf(production)

function _uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

function _onmessage(e) {
  var payload;

  if (_isntString(e.data)) { return; }

  payload = _unpackPayload(e);
  if (!payload) { return; }

  _dispatch('*', payload.event, payload.args, e);
  _dispatch(e.origin, payload.event, payload.args, e);
  _broadcastPopups(e.data, payload.origin, e.source);
}

function _dispatch(origin, event, args, e) {
  var i;

  if (!subscribers[origin]) { return; }
  if (!subscribers[origin][event]) { return; }

  for (i = 0; i < subscribers[origin][event].length; i++) {
    subscribers[origin][event][i].apply(e, args);
  }
}

function _hasOpener(frame) {
  if (frame.top !== frame) { return false; }
  if (frame.opener == null) { return false; }
  if (frame.opener === frame) { return false; }
  if (frame.opener.closed === true) { return false; }

  return true;
}

function _broadcast(frame, payload, origin) {
  var i = 0;
  var frameToBroadcastTo;

  try {
    frame.postMessage(payload, origin);

    if (_hasOpener(frame)) {
      _broadcast(frame.opener.top, payload, origin);
    }

    // previously, our max value was frame.frames.length
    // but frames.length inherits from window.length
    // which can be overwritten if a developer does
    // `var length = value;` outside of a function
    // scope, it'll prevent us from looping through
    // all the frames. With this, we loop through
    // until there are no longer any frames
    while (frameToBroadcastTo = frame.frames[i]) { // eslint-disable-line no-cond-assign
      _broadcast(frameToBroadcastTo, payload, origin);
      i++;
    }
  } catch (_) { /* ignored */ }
}

function _broadcastPopups(payload, origin, source) {
  var i, popup;

  for (i = popups.length - 1; i >= 0; i--) {
    popup = popups[i];

    if (popup.closed === true) {
      popups = popups.slice(i, 1);
    } else if (source !== popup) {
      _broadcast(popup.top, payload, origin);
    }
  }
}

function _subscribeReplier(fn, origin) {
  var uuid = _uuid();

  function replier(d, o) {
    fn(d, o);
    framebus.target(origin).unsubscribe(uuid, replier);
  }

  framebus.target(origin).subscribe(uuid, replier);
  return uuid;
}

function _subscriptionArgsInvalid(event, fn, origin) {
  if (_isntString(event)) { return true; }
  if (typeof fn !== 'function') { return true; }
  if (_isntString(origin)) { return true; }

  return false;
}

_attach();

framebus = {
  target: target,
  // removeIf(production)
  _packagePayload: _packagePayload,
  _unpackPayload: _unpackPayload,
  _attach: _attach,
  _detach: _detach,
  _dispatch: _dispatch,
  _broadcast: _broadcast,
  _subscribeReplier: _subscribeReplier,
  _subscriptionArgsInvalid: _subscriptionArgsInvalid,
  _onmessage: _onmessage,
  _uuid: _uuid,
  _getSubscribers: function () { return subscribers; },
  _win: function () { return win; },
  // endRemoveIf(production)
  include: include,
  publish: publish,
  pub: publish,
  trigger: publish,
  emit: publish,
  subscribe: subscribe,
  sub: subscribe,
  on: subscribe,
  unsubscribe: unsubscribe,
  unsub: unsubscribe,
  off: unsubscribe
};

module.exports = framebus;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],28:[function(_dereq_,module,exports){
'use strict';

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

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
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
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

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
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

},{}],29:[function(_dereq_,module,exports){
(function (global){
'use strict';

var UA = global.navigator && global.navigator.userAgent;

var isAndroid = _dereq_('@braintree/browser-detection/is-android');
var isChrome = _dereq_('@braintree/browser-detection/is-chrome');
var isIos = _dereq_('@braintree/browser-detection/is-ios');
var isIE9 = _dereq_('@braintree/browser-detection/is-ie9');

// Old Android Webviews used specific versions of Chrome with 0.0.0 as their version suffix
// https://developer.chrome.com/multidevice/user-agent#webview_user_agent
var KITKAT_WEBVIEW_REGEX = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;

function _isOldSamsungBrowserOrSamsungWebview(ua) {
  return !isChrome(ua) && ua.indexOf('Samsung') > -1;
}

function isKitKatWebview(uaArg) {
  var ua = uaArg || UA;

  return isAndroid(ua) && KITKAT_WEBVIEW_REGEX.test(ua);
}

function isAndroidChrome(uaArg) {
  var ua = uaArg || UA;

  return isAndroid(ua) && isChrome(ua);
}

function isSamsungBrowser(ua) {
  ua = ua || UA;
  return /SamsungBrowser/.test(ua) || _isOldSamsungBrowserOrSamsungWebview(ua);
}

module.exports = {
  isIE9: isIE9,
  isAndroidChrome: isAndroidChrome,
  isIos: isIos,
  isKitKatWebview: isKitKatWebview,
  isSamsungBrowser: isSamsungBrowser
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"@braintree/browser-detection/is-android":3,"@braintree/browser-detection/is-chrome":4,"@braintree/browser-detection/is-ie9":8,"@braintree/browser-detection/is-ios":13}],30:[function(_dereq_,module,exports){
'use strict';

var device = _dereq_('./lib/device');

module.exports = function () {
  // Digits get dropped in samsung browser
  return !device.isSamsungBrowser();
};

},{"./lib/device":29}],31:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/braintree-error');
var errors = _dereq_('./errors');
var assign = _dereq_('../lib/assign').assign;
var Promise = _dereq_('../lib/promise');
var methods = _dereq_('../lib/methods');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/american-express.create|braintree.american-express.create} instead.</strong>
 * @classdesc This class allows you use a nonce to interact with American Express Checkout. To accept American Express cards, use Hosted Fields.
 */
function AmericanExpress(options) {
  this._client = options.client;
}

/**
 * Gets the rewards balance associated with a Braintree nonce.
 * @public
 * @param {object} options Request options
 * @param {string} options.nonce An existing Braintree nonce.
 * @param {callback} [callback] The second argument, <code>data</code>, is the returned server data. If no callback is provided, `getRewardsBalance` returns a promise that resolves with the server data.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var americanExpress = require('braintree-web/american-express');
 *
 * americanExpress.create({client: clientInstance}, function (createErr, americanExpressInstance) {
 *   var options = {nonce: existingBraintreeNonce};
 *   americanExpressInstance.getRewardsBalance(options, function (getErr, payload) {
 *     if (getErr || payload.error) {
 *       // Handle error
 *       return;
 *     }
 *
 *     console.log('Rewards amount: ' + payload.rewardsAmount);
 *   });
 * });
 */
AmericanExpress.prototype.getRewardsBalance = function (options) {
  var nonce = options.nonce;
  var data;

  if (!nonce) {
    return Promise.reject(new BraintreeError({
      type: errors.AMEX_NONCE_REQUIRED.type,
      code: errors.AMEX_NONCE_REQUIRED.code,
      message: 'getRewardsBalance must be called with a nonce.'
    }));
  }

  data = assign({
    _meta: {source: 'american-express'},
    paymentMethodNonce: nonce
  }, options);

  delete data.nonce;

  return this._client.request({
    method: 'get',
    endpoint: 'payment_methods/amex_rewards_balance',
    data: data
  }).catch(function (err) {
    return Promise.reject(new BraintreeError({
      type: errors.AMEX_NETWORK_ERROR.type,
      code: errors.AMEX_NETWORK_ERROR.code,
      message: 'A network error occurred when getting the American Express rewards balance.',
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Gets the Express Checkout nonce profile given a nonce from American Express.
 * @public
 * @param {object} options Request options
 * @param {string} options.nonce An existing nonce from American Express (note that this is <em>not</em> a nonce from Braintree).
 * @param {callback} [callback] The second argument, <code>data</code>, is the returned server data. If no callback is provided, `getExpressCheckoutProfile` returns a promise that resolves with the server data.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var americanExpress = require('braintree-web/american-express');
 *
 * americanExpress.create({client: clientInstance}, function (createErr, americanExpressInstance) {
 *   var options = {nonce: existingAmericanExpressNonce};
 *   americanExpressInstance.getExpressCheckoutProfile(options, function (getErr, payload) {
 *     if (getErr) {
 *       // Handle error
 *       return;
 *     }
 *
 *     console.log('Number of cards: ' + payload.amexExpressCheckoutCards.length);
 *   });
 * });
 */
AmericanExpress.prototype.getExpressCheckoutProfile = function (options) {
  if (!options.nonce) {
    return Promise.reject(new BraintreeError({
      type: errors.AMEX_NONCE_REQUIRED.type,
      code: errors.AMEX_NONCE_REQUIRED.code,
      message: 'getExpressCheckoutProfile must be called with a nonce.'
    }));
  }

  return this._client.request({
    method: 'get',
    endpoint: 'payment_methods/amex_express_checkout_cards/' + options.nonce,
    data: {
      _meta: {source: 'american-express'},
      paymentMethodNonce: options.nonce
    }
  }).catch(function (err) {
    return Promise.reject(new BraintreeError({
      type: errors.AMEX_NETWORK_ERROR.type,
      code: errors.AMEX_NETWORK_ERROR.code,
      message: 'A network error occurred when getting the American Express Checkout nonce profile.',
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/american-express.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * americanExpressInstance.teardown();
 * @example <caption>With callback</caption>
 * americanExpressInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
AmericanExpress.prototype.teardown = function () {
  convertMethodsToError(this, methods(AmericanExpress.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(AmericanExpress);

},{"../lib/assign":88,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/methods":124,"../lib/promise":126,"./errors":32,"@braintree/wrap-promise":25}],32:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.American Express - getRewardsBalance Error Codes
 * @description Errors that occur when creating components.
 * @property {MERCHANT} AMEX_NONCE_REQUIRED Occurs when a nonce is not provided to method.
 * @property {NETWORK} AMEX_NETWORK_ERROR Occurs when there is an error communicating with the Braintree gateway.
 */

/**
 * @name BraintreeError.American Express - getExpressCheckoutProfile Error Codes
 * @description Errors that occur when creating components.
 * @property {MERCHANT} AMEX_NONCE_REQUIRED Occurs when a nonce is not provided to method.
 * @property {NETWORK} AMEX_NETWORK_ERROR Occurs when there is an error communicating with the Braintree gateway.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  AMEX_NONCE_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'AMEX_NONCE_REQUIRED'
  },
  AMEX_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'AMEX_NETWORK_ERROR'
  }
};

},{"../lib/braintree-error":91}],33:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/american-express
 * @description This module is for use with Amex Express Checkout. To accept American Express cards, use Hosted Fields.
 */

var AmericanExpress = _dereq_('./american-express');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var VERSION = "3.42.0";
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} [callback] The second argument, `data`, is the {@link AmericanExpress} instance. If no callback is provided, `create` returns a promise that resolves with the {@link AmericanExpress} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'American Express';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    options.client = client;

    return new AmericanExpress(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"./american-express":31,"@braintree/wrap-promise":25}],34:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('../lib/braintree-error');
var analytics = _dereq_('../lib/analytics');
var errors = _dereq_('./errors');
var Promise = _dereq_('../lib/promise');
var methods = _dereq_('../lib/methods');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @typedef {object} ApplePay~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.cardHolderName The name of the card holder.
 * @property {string} details.dpanLastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `ApplePayCard`.
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
 * An Apple Pay Payment Authorization Event object.
 * @typedef {object} ApplePayPaymentAuthorizedEvent
 * @external ApplePayPaymentAuthorizedEvent
 * @see {@link https://developer.apple.com/reference/applepayjs/applepaypaymentauthorizedevent ApplePayPaymentAuthorizedEvent}
 */

/**
 * An Apple Pay Payment Request object.
 * @typedef {object} ApplePayPaymentRequest
 * @external ApplePayPaymentRequest
 * @see {@link https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest PaymentRequest}
 */

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/apple-pay.create|braintree.applePay.create} instead.</strong>
 * @classdesc This class represents an Apple Pay component. Instances of this class have methods for validating the merchant server and tokenizing payments.
 */
function ApplePay(options) {
  this._client = options.client;
  /**
   * @name ApplePay#merchantIdentifier
   * @description A special merchant ID which represents the merchant association with Braintree. Required when using `ApplePaySession.canMakePaymentsWithActiveCard`.
   * @example
   * var promise = ApplePaySession.canMakePaymentsWithActiveCard(applePayInstance.merchantIdentifier);
   * promise.then(function (canMakePaymentsWithActiveCard) {
   *   if (canMakePaymentsWithActiveCard) {
   *     // Set up Apple Pay buttons
   *   }
   * });
   */
  Object.defineProperty(this, 'merchantIdentifier', {
    value: this._client.getConfiguration().gatewayConfiguration.applePayWeb.merchantIdentifier,
    configurable: false,
    writable: false
  });
}

/**
 * Merges a payment request with Braintree defaults to return an {external:ApplePayPaymentRequest}.
 *
 * The following properties are assigned to `paymentRequest` if not already defined. Their default values come from the Braintree gateway.
 * - `countryCode`
 * - `currencyCode`
 * - `merchantCapabilities`
 * - `supportedNetworks`
 * @public
 * @param {external:ApplePayPaymentRequest} paymentRequest The payment request details to apply on top of those from Braintree.
 * @returns {external:ApplePayPaymentRequest} The decorated `paymentRequest` object.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *
 *   var session = new ApplePaySession(2, paymentRequest);
 *
 *   // ...
 */
ApplePay.prototype.createPaymentRequest = function (paymentRequest) {
  var applePay = this._client.getConfiguration().gatewayConfiguration.applePayWeb;
  var defaults = {
    countryCode: applePay.countryCode,
    currencyCode: applePay.currencyCode,
    merchantCapabilities: applePay.merchantCapabilities || ['supports3DS'],
    supportedNetworks: applePay.supportedNetworks.map(function (network) {
      return network === 'mastercard' ? 'masterCard' : network;
    })
  };

  return Object.assign({}, defaults, paymentRequest);
};

/**
 * Validates your merchant website, as required by `ApplePaySession` before payment can be authorized.
 * @public
 * @param {object} options Options
 * @param {string} options.validationURL The validationURL fram an `ApplePayValidateMerchantEvent`.
 * @param {string} options.displayName The canonical name for your store. Use a non-localized name. This parameter should be a UTF-8 string that is a maximum of 128 characters. The system may display this name to the user.
 * @param {callback} [callback] The second argument, <code>data</code>, is the Apple Pay merchant session object. If no callback is provided, `performValidation` returns a promise.
 * Pass the merchant session to your Apple Pay session's `completeMerchantValidation` method.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(2, paymentRequest);
 *
 *   session.onvalidatemerchant = function (event) {
 *     applePayInstance.performValidation({
 *       validationURL: event.validationURL,
 *       displayName: 'My Great Store'
 *     }, function (validationErr, validationData) {
 *       if (validationErr) {
 *         console.error(validationErr);
 *         session.abort();
 *         return;
 *       }
 *
 *       session.completeMerchantValidation(validationData);
 *     });
 *   };
 * });
 */
ApplePay.prototype.performValidation = function (options) {
  var applePayWebSession;
  var self = this;

  if (!options || !options.validationURL) {
    return Promise.reject(new BraintreeError(errors.APPLE_PAY_VALIDATION_URL_REQUIRED));
  }

  applePayWebSession = {
    validationUrl: options.validationURL,
    domainName: options.domainName || global.location.hostname,
    merchantIdentifier: options.merchantIdentifier || this.merchantIdentifier
  };

  if (options.displayName != null) {
    applePayWebSession.displayName = options.displayName;
  }

  return this._client.request({
    method: 'post',
    endpoint: 'apple_pay_web/sessions',
    data: {
      _meta: {source: 'apple-pay'},
      applePayWebSession: applePayWebSession
    }
  }).then(function (response) {
    analytics.sendEvent(self._client, 'applepay.performValidation.succeeded');

    return Promise.resolve(response);
  }).catch(function (err) {
    analytics.sendEvent(self._client, 'applepay.performValidation.failed');

    if (err.code === 'CLIENT_REQUEST_ERROR') {
      return Promise.reject(new BraintreeError({
        type: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,
        code: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,
        message: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,
        details: {
          originalError: err.details.originalError
        }
      }));
    }

    return Promise.reject(new BraintreeError({
      type: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,
      code: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,
      message: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Tokenizes an Apple Pay payment. This will likely be called in your `ApplePaySession`'s `onpaymentauthorized` callback.
 * @public
 * @param {object} options Options
 * @param {object} options.token The `payment.token` property of an {@link external:ApplePayPaymentAuthorizedEvent}.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ApplePay~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a promise that resolves with a {@link ApplePay~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(2, paymentRequest);
 *
 *   session.onpaymentauthorized = function (event) {
 *     applePayInstance.tokenize({
 *       token: event.payment.token
 *     }, function (tokenizeErr, tokenizedPayload) {
 *       if (tokenizeErr) {
 *         session.completePayment(ApplePaySession.STATUS_FAILURE);
 *         return;
 *       }
 *       session.completePayment(ApplePaySession.STATUS_SUCCESS);
 *
 *       // Send the tokenizedPayload to your server here!
 *     });
 *   };
 *
 *   // ...
 * });
 */
ApplePay.prototype.tokenize = function (options) {
  var self = this;

  if (!options.token) {
    return Promise.reject(new BraintreeError(errors.APPLE_PAY_PAYMENT_TOKEN_REQUIRED));
  }

  return this._client.request({
    method: 'post',
    endpoint: 'payment_methods/apple_payment_tokens',
    data: {
      _meta: {
        source: 'apple-pay'
      },
      applePaymentToken: Object.assign({}, options.token, {
        // The gateway requires this key to be base64-encoded.
        paymentData: btoa(JSON.stringify(options.token.paymentData))
      })
    }
  }).then(function (response) {
    analytics.sendEvent(self._client, 'applepay.tokenize.succeeded');

    return Promise.resolve(response.applePayCards[0]);
  }).catch(function (err) {
    analytics.sendEvent(self._client, 'applepay.tokenize.failed');

    return Promise.reject(new BraintreeError({
      type: errors.APPLE_PAY_TOKENIZATION.type,
      code: errors.APPLE_PAY_TOKENIZATION.code,
      message: errors.APPLE_PAY_TOKENIZATION.message,
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/apple-pay.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * applePayInstance.teardown();
 * @example <caption>With callback</caption>
 * applePayInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
ApplePay.prototype.teardown = function () {
  convertMethodsToError(this, methods(ApplePay.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(ApplePay);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/analytics":86,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/methods":124,"../lib/promise":126,"./errors":35,"@braintree/wrap-promise":25}],35:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Apple Pay - Creation Error Codes
 * @description Errors that occur when [creating the Apple Pay component](/current/module-braintree-web_apple-pay.html#.create).
 * @property {MERCHANT} APPLE_PAY_NOT_ENABLED Occurs when the authorization used is not authorized to process Apple Pay.
 */

/**
 * @name BraintreeError.Apple Pay - performValidation Error Codes
 * @description Errors that occur when [validating](/current/ApplePay.html#performValidation).
 * @property {MERCHANT} APPLE_PAY_VALIDATION_URL_REQUIRED Occurs when the `validationURL` option is not passed in.
 * @property {MERCHANT} APPLE_PAY_MERCHANT_VALIDATION_FAILED Occurs when the website domain has not been registered in the Braintree control panel.
 * @property {NETWORK} APPLE_PAY_MERCHANT_VALIDATION_NETWORK Occurs when an unknown network error occurs.
 */

/**
 * @name BraintreeError.Apple Pay - tokenize Error Codes
 * @description Errors that occur when [tokenizing](/current/ApplePay.html#tokenize).
 * @property {MERCHANT} APPLE_PAY_PAYMENT_TOKEN_REQUIRED Occurs when the `token` option is not passed in.
 * @property {NETWORK} APPLE_PAY_TOKENIZATION Occurs when an unknown network error occurs.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  APPLE_PAY_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_NOT_ENABLED',
    message: 'Apple Pay is not enabled for this merchant.'
  },
  APPLE_PAY_VALIDATION_URL_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_VALIDATION_URL_REQUIRED',
    message: 'performValidation must be called with a validationURL.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_NETWORK',
    message: 'A network error occurred when validating the Apple Pay merchant.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_FAILED',
    message: 'Make sure you have registered your domain name in the Braintree Control Panel.'
  },
  APPLE_PAY_PAYMENT_TOKEN_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_PAYMENT_TOKEN_REQUIRED',
    message: 'tokenize must be called with a payment token.'
  },
  APPLE_PAY_TOKENIZATION: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_TOKENIZATION',
    message: 'A network error occurred when processing the Apple Pay payment.'
  }
};

},{"../lib/braintree-error":91}],36:[function(_dereq_,module,exports){
'use strict';

/**
 * @module braintree-web/apple-pay
 * @description Accept Apple Pay on the Web. *This component is currently in beta and is subject to change.*
 */

var BraintreeError = _dereq_('../lib/braintree-error');
var ApplePay = _dereq_('./apple-pay');
var analytics = _dereq_('../lib/analytics');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var errors = _dereq_('./errors');
var VERSION = "3.42.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} [callback] The second argument, `data`, is the {@link ApplePay} instance. If no callback is provided, `create` returns a promise that resolves with the {@link ApplePay} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'Apple Pay';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    options.client = client;

    if (!options.client.getConfiguration().gatewayConfiguration.applePayWeb) {
      return Promise.reject(new BraintreeError(errors.APPLE_PAY_NOT_ENABLED));
    }

    analytics.sendEvent(options.client, 'applepay.initialized');

    return new ApplePay(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./apple-pay":34,"./errors":35,"@braintree/wrap-promise":25}],37:[function(_dereq_,module,exports){
'use strict';

var isIe = _dereq_('@braintree/browser-detection/is-ie');
var isIe9 = _dereq_('@braintree/browser-detection/is-ie9');

module.exports = {
  isIe: isIe,
  isIe9: isIe9
};

},{"@braintree/browser-detection/is-ie":6,"@braintree/browser-detection/is-ie9":8}],38:[function(_dereq_,module,exports){
'use strict';

var BRAINTREE_VERSION = _dereq_('./constants').BRAINTREE_VERSION;

var GraphQL = _dereq_('./request/graphql');
var request = _dereq_('./request');
var isVerifiedDomain = _dereq_('../lib/is-verified-domain');
var BraintreeError = _dereq_('../lib/braintree-error');
var convertToBraintreeError = _dereq_('../lib/convert-to-braintree-error');
var createAuthorizationData = _dereq_('../lib/create-authorization-data');
var getGatewayConfiguration = _dereq_('./get-configuration').getConfiguration;
var addMetadata = _dereq_('../lib/add-metadata');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var once = _dereq_('../lib/once');
var deferred = _dereq_('../lib/deferred');
var assign = _dereq_('../lib/assign').assign;
var analytics = _dereq_('../lib/analytics');
var constants = _dereq_('./constants');
var errors = _dereq_('./errors');
var sharedErrors = _dereq_('../lib/errors');
var VERSION = _dereq_('../lib/constants').VERSION;
var GRAPHQL_URLS = _dereq_('../lib/constants').GRAPHQL_URLS;
var methods = _dereq_('../lib/methods');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var assets = _dereq_('../lib/assets');
var FRAUDNET_FNCLS = _dereq_('../lib/constants').FRAUDNET_FNCLS;
var FRAUDNET_SOURCE = _dereq_('../lib/constants').FRAUDNET_SOURCE;
var FRAUDNET_URL = _dereq_('../lib/constants').FRAUDNET_URL;

var cachedClients = {};

/**
 * This object is returned by {@link Client#getConfiguration|getConfiguration}. This information is used extensively by other Braintree modules to properly configure themselves.
 * @typedef {object} Client~configuration
 * @property {object} client The braintree-web/client parameters.
 * @property {string} client.authorization A tokenizationKey or clientToken.
 * @property {object} gatewayConfiguration Gateway-supplied configuration.
 * @property {object} analyticsMetadata Analytics-specific data.
 * @property {string} analyticsMetadata.sessionId Uniquely identifies a browsing session.
 * @property {string} analyticsMetadata.sdkVersion The braintree.js version.
 * @property {string} analyticsMetadata.merchantAppId Identifies the merchant's web app.
 */

/**
 * @class
 * @param {Client~configuration} configuration Options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/client.create|braintree.client.create} instead.</strong>
 * @classdesc This class is required by many other Braintree components. It serves as the base API layer that communicates with our servers. It is also capable of being used to formulate direct calls to our servers, such as direct credit card tokenization. See {@link Client#request}.
 */
function Client(configuration) {
  var configurationJSON, gatewayConfiguration, braintreeApiConfiguration;

  configuration = configuration || {};

  configurationJSON = JSON.stringify(configuration);
  gatewayConfiguration = configuration.gatewayConfiguration;

  if (!gatewayConfiguration) {
    throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
  }

  [
    'assetsUrl',
    'clientApiUrl',
    'configUrl'
  ].forEach(function (property) {
    if (property in gatewayConfiguration && !isVerifiedDomain(gatewayConfiguration[property])) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: property + ' property is on an invalid domain.'
      });
    }
  });

  /**
   * Returns a copy of the configuration values.
   * @public
   * @returns {Client~configuration} configuration
   */
  this.getConfiguration = function () {
    return JSON.parse(configurationJSON);
  };

  this._request = request;
  this._configuration = this.getConfiguration();

  this._clientApiBaseUrl = gatewayConfiguration.clientApiUrl + '/v1/';

  braintreeApiConfiguration = gatewayConfiguration.braintreeApi;
  if (braintreeApiConfiguration) {
    this._braintreeApi = {
      baseUrl: braintreeApiConfiguration.url + '/',
      accessToken: braintreeApiConfiguration.accessToken
    };

    if (!isVerifiedDomain(this._braintreeApi.baseUrl)) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: 'braintreeApi URL is on an invalid domain.'
      });
    }
  }

  if (gatewayConfiguration.graphQL) {
    this._graphQL = new GraphQL({
      graphQL: gatewayConfiguration.graphQL
    });
  }
}

Client.initialize = function (options) {
  var clientInstance;
  var promise = cachedClients[options.authorization];

  if (promise) {
    analytics.sendEvent(promise, 'custom.client.load.cached');

    return promise;
  }

  promise = getGatewayConfiguration(options).then(function (configuration) {
    if (options.debug) {
      configuration.isDebug = true;
    }

    clientInstance = new Client(configuration);

    return clientInstance;
  });

  cachedClients[options.authorization] = promise;

  analytics.sendEvent(promise, 'custom.client.load.initialized');

  return promise.then(function (client) {
    analytics.sendEvent(clientInstance, 'custom.client.load.succeeded');

    return client;
  }).catch(function (err) {
    delete cachedClients[options.authorization];

    return Promise.reject(err);
  });
};

// Primarily used for testing the client initalization call
Client.clearCache = function () {
  cachedClients = {};
};

Client.prototype._findOrCreateFraudnetJSON = function (clientMetadataId) {
  var el = document.querySelector('script[fncls="' + FRAUDNET_FNCLS + '"]');
  var config, additionalData, authorizationFingerprint, parameters;

  if (!el) {
    el = document.body.appendChild(document.createElement('script'));
    el.type = 'application/json';
    el.setAttribute('fncls', FRAUDNET_FNCLS);
  }

  config = this.getConfiguration();
  additionalData = {
    rda_tenant: 'bt_card', // eslint-disable-line camelcase
    mid: config.gatewayConfiguration.merchantId
  };
  authorizationFingerprint = createAuthorizationData(config.authorization).attrs.authorizationFingerprint;

  if (authorizationFingerprint) {
    authorizationFingerprint.split('&').forEach(function (pieces) {
      var component = pieces.split('=');

      if (component[0] === 'customer_id' && component.length > 1) {
        additionalData.cid = component[1];
      }
    });
  }

  parameters = {
    f: clientMetadataId.substr(0, 32),
    fp: additionalData,
    bu: false,
    s: FRAUDNET_SOURCE
  };
  el.text = JSON.stringify(parameters);
};

/**
 * Used by other modules to formulate all network requests to the Braintree gateway. It is also capable of being used directly from your own form to tokenize credit card information. However, be sure to satisfy PCI compliance if you use direct card tokenization.
 * @public
 * @param {object} options Request options:
 * @param {string} options.method HTTP method, e.g. "get" or "post".
 * @param {string} options.endpoint Endpoint path, e.g. "payment_methods".
 * @param {object} options.data Data to send with the request.
 * @param {number} [options.timeout=60000] Set a timeout (in milliseconds) for the request.
 * @param {callback} [callback] The second argument, <code>data</code>, is the returned server data.
 * @example
 * <caption>Direct Credit Card Tokenization</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-expiration-date'].value,
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @example
 * <caption>Tokenizing Fields for AVS Checks</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-date'].value,
 *       // The billing address can be checked with AVS rules.
 *       // See: https://articles.braintreepayments.com/support/guides/fraud-tools/basic/avs-cvv-rules
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value,
 *         streetAddress: form['cc-street-address'].value,
 *         countryName: form['cc-country-name'].value,
 *         countryCodeAlpha2: form['cc-country-alpha2'].value,
 *         countryCodeAlpha3: form['cc-country-alpha3'].value,
 *         countryCodeNumeric: form['cc-country-numeric'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Client.prototype.request = function (options, callback) {
  var self = this; // eslint-disable-line no-invalid-this
  var requestPromise = new Promise(function (resolve, reject) {
    var optionName, api, baseUrl, requestOptions;
    var shouldCollectData = Boolean(options.endpoint === 'payment_methods/credit_cards' && self.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData);

    if (options.api !== 'graphQLApi') {
      if (!options.method) {
        optionName = 'options.method';
      } else if (!options.endpoint) {
        optionName = 'options.endpoint';
      }
    }

    if (optionName) {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_REQUIRED.type,
        code: errors.CLIENT_OPTION_REQUIRED.code,
        message: optionName + ' is required when making a request.'
      });
    }

    if ('api' in options) {
      api = options.api;
    } else {
      api = 'clientApi';
    }

    requestOptions = {
      method: options.method,
      graphQL: self._graphQL,
      timeout: options.timeout,
      metadata: self._configuration.analyticsMetadata
    };

    if (api === 'clientApi') {
      baseUrl = self._clientApiBaseUrl;

      requestOptions.data = addMetadata(self._configuration, options.data);
    } else if (api === 'braintreeApi') {
      if (!self._braintreeApi) {
        throw new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED);
      }

      baseUrl = self._braintreeApi.baseUrl;

      requestOptions.data = options.data;

      requestOptions.headers = {
        'Braintree-Version': constants.BRAINTREE_API_VERSION_HEADER,
        Authorization: 'Bearer ' + self._braintreeApi.accessToken
      };
    } else if (api === 'graphQLApi') {
      baseUrl = GRAPHQL_URLS[self._configuration.gatewayConfiguration.environment];
      options.endpoint = '';
      requestOptions.method = 'post';
      requestOptions.data = assign({
        clientSdkMetadata: {
          source: self._configuration.analyticsMetadata.source,
          integration: self._configuration.analyticsMetadata.integration,
          sessionId: self._configuration.analyticsMetadata.sessionId
        }
      }, options.data);

      requestOptions.headers = getAuthorizationHeadersForGraphQL(self._configuration.authorization);
    } else {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_INVALID.type,
        code: errors.CLIENT_OPTION_INVALID.code,
        message: 'options.api is invalid.'
      });
    }

    requestOptions.url = baseUrl + options.endpoint;
    requestOptions.sendAnalyticsEvent = function (kind) {
      analytics.sendEvent(self, kind);
    };

    self._request(requestOptions, function (err, data, status) {
      var resolvedData, requestError;

      requestError = formatRequestError(status, err);

      if (requestError) {
        reject(requestError);

        return;
      }

      if (api === 'graphQLApi' && data.errors) {
        reject(convertToBraintreeError(data.errors, {
          type: errors.CLIENT_GRAPHQL_REQUEST_ERROR.type,
          code: errors.CLIENT_GRAPHQL_REQUEST_ERROR.code,
          message: errors.CLIENT_GRAPHQL_REQUEST_ERROR.message
        }));

        return;
      }

      resolvedData = assign({_httpStatus: status}, data);

      if (shouldCollectData && resolvedData.creditCards && resolvedData.creditCards.length > 0) {
        self._findOrCreateFraudnetJSON(resolvedData.creditCards[0].nonce);

        assets.loadScript({
          src: FRAUDNET_URL,
          forceScriptReload: true
        });
      }
      resolve(resolvedData);
    });
  });

  if (typeof callback === 'function') {
    callback = once(deferred(callback));

    requestPromise.then(function (response) {
      callback(null, response, response._httpStatus);
    }).catch(function (err) {
      var status = err && err.details && err.details.httpStatus;

      callback(err, null, status);
    });

    return;
  }

  return requestPromise; // eslint-disable-line consistent-return
};

function formatRequestError(status, err) { // eslint-disable-line consistent-return
  var requestError;

  if (status === -1) {
    requestError = new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
  } else if (status === 403) {
    requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
  } else if (status === 429) {
    requestError = new BraintreeError(errors.CLIENT_RATE_LIMITED);
  } else if (status >= 500) {
    requestError = new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
  } else if (status < 200 || status >= 400) {
    requestError = convertToBraintreeError(err, {
      type: errors.CLIENT_REQUEST_ERROR.type,
      code: errors.CLIENT_REQUEST_ERROR.code,
      message: errors.CLIENT_REQUEST_ERROR.message
    });
  }

  if (requestError) {
    requestError.details = requestError.details || {};
    requestError.details.httpStatus = status;

    return requestError;
  }
}

Client.prototype.toJSON = function () {
  return this.getConfiguration();
};

/**
 * Returns the Client version.
 * @public
 * @returns {String} The created client's version.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   console.log(clientInstance.getVersion()); // Ex: 1.0.0
 * });
 * @returns {void}
 */
Client.prototype.getVersion = function () {
  return VERSION;
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/client.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * clientInstance.teardown();
 * @example <caption>With callback</caption>
 * clientInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Client.prototype.teardown = wrapPromise(function () {
  var self = this; // eslint-disable-line no-invalid-this

  delete cachedClients[self.getConfiguration().authorization];
  convertMethodsToError(self, methods(Client.prototype));

  return Promise.resolve();
});

function getAuthorizationHeadersForGraphQL(authorization) {
  var authAttrs = createAuthorizationData(authorization).attrs;
  var token = authAttrs.authorizationFingerprint || authAttrs.tokenizationKey;

  return {
    Authorization: 'Bearer ' + token,
    'Braintree-Version': BRAINTREE_VERSION
  };
}

module.exports = Client;

},{"../lib/add-metadata":85,"../lib/analytics":86,"../lib/assets":87,"../lib/assign":88,"../lib/braintree-error":91,"../lib/constants":96,"../lib/convert-methods-to-error":97,"../lib/convert-to-braintree-error":98,"../lib/create-authorization-data":100,"../lib/deferred":102,"../lib/errors":105,"../lib/is-verified-domain":122,"../lib/methods":124,"../lib/once":125,"../lib/promise":126,"./constants":39,"./errors":40,"./get-configuration":41,"./request":53,"./request/graphql":51,"@braintree/wrap-promise":25}],39:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  BRAINTREE_API_VERSION_HEADER: '2017-04-03',
  BRAINTREE_VERSION: '2018-05-10'
};

},{}],40:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Client - Interal Error Codes
 * @ignore
 * @description These codes should never be experienced by the mechant directly.
 * @property {MERCHANT} CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN An error to prevent client creation for domains that are not allowed in the JS.
 * @property {INTERNAL} CLIENT_MISSING_GATEWAY_CONFIGURATION Occurs when the client is created without a gateway configuration. Should never happen.
 */

/**
 * @name BraintreeError.Client - Create Error Codes
 * @description Errors that may occur when [creating the client](/current/module-braintree-web_client.html#.create)
 * @property {MERCHANT} CLIENT_INVALID_AUTHORIZATION Occurs when client token cannot be parsed.
 */

/**
 * @name BraintreeError.Client - Request Error Codes
 * @description Errors that may occur when [using the request method](/current/Client.html#request)
 * @property {MERCHANT} CLIENT_OPTION_REQUIRED An option required in the request method was not provided. Usually `options.method` or `options.endpoint`
 * @property {MERCHANT} CLIENT_OPTION_INVALID The request option provided is invalid.
 * @property {MERCHANT} CLIENT_GATEWAY_NETWORK The Braintree gateway could not be contacted.
 * @property {NETWORK} CLIENT_REQUEST_TIMEOUT The request took too long to complete and timed out.
 * @property {NETWORK} CLIENT_REQUEST_ERROR The response from a request had status 400 or greater.
 * @property {NETWORK} CLIENT_GRAPHQL_REQUEST_ERROR The response from a request to GraphQL contained an error.
 * @property {MERCHANT} CLIENT_RATE_LIMITED The response from a request had a status of 429, indicating rate limiting.
 * @property {MERCHANT} CLIENT_AUTHORIZATION_INSUFFICIENT The user assocaited with the client token or tokenization key does not have permissions to make the request.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN'
  },
  CLIENT_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_REQUIRED'
  },
  CLIENT_OPTION_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_INVALID'
  },
  CLIENT_MISSING_GATEWAY_CONFIGURATION: {
    type: BraintreeError.types.INTERNAL,
    code: 'CLIENT_MISSING_GATEWAY_CONFIGURATION',
    message: 'Missing gatewayConfiguration.'
  },
  CLIENT_INVALID_AUTHORIZATION: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_INVALID_AUTHORIZATION',
    message: 'Authorization is invalid. Make sure your client token or tokenization key is valid.'
  },
  CLIENT_GATEWAY_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_GATEWAY_NETWORK',
    message: 'Cannot contact the gateway at this time.'
  },
  CLIENT_REQUEST_TIMEOUT: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_TIMEOUT',
    message: 'Request timed out waiting for a reply.'
  },
  CLIENT_REQUEST_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_ERROR',
    message: 'There was a problem with your request.'
  },
  CLIENT_GRAPHQL_REQUEST_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_GRAPHQL_REQUEST_ERROR',
    message: 'There was a problem with your request.'
  },
  CLIENT_RATE_LIMITED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_RATE_LIMITED',
    message: 'You are being rate-limited; please try again in a few minutes.'
  },
  CLIENT_AUTHORIZATION_INSUFFICIENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_AUTHORIZATION_INSUFFICIENT',
    message: 'The authorization used has insufficient privileges.'
  }
};

},{"../lib/braintree-error":91}],41:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('../lib/braintree-error');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var request = _dereq_('./request');
var uuid = _dereq_('../lib/vendor/uuid');
var constants = _dereq_('../lib/constants');
var createAuthorizationData = _dereq_('../lib/create-authorization-data');
var errors = _dereq_('./errors');
var GraphQL = _dereq_('./request/graphql');
var isDateStringBeforeOrOn = _dereq_('../lib/is-date-string-before-or-on');

var BRAINTREE_VERSION = _dereq_('./constants').BRAINTREE_VERSION;

function getConfiguration(options) {
  return new Promise(function (resolve, reject) {
    var configuration, authData, attrs, configUrl, reqOptions;
    var sessionId = uuid();
    var analyticsMetadata = {
      merchantAppId: global.location.host,
      platform: constants.PLATFORM,
      sdkVersion: constants.VERSION,
      source: constants.SOURCE,
      integration: constants.INTEGRATION,
      integrationType: constants.INTEGRATION,
      sessionId: sessionId
    };

    try {
      authData = createAuthorizationData(options.authorization);
    } catch (err) {
      reject(new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION));

      return;
    }
    attrs = authData.attrs;
    configUrl = authData.configUrl;

    attrs._meta = analyticsMetadata;
    attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
    attrs.configVersion = '3';

    reqOptions = {
      url: configUrl,
      method: 'GET',
      data: attrs
    };

    if (attrs.authorizationFingerprint && authData.graphQL) {
      if (isDateStringBeforeOrOn(authData.graphQL.date, BRAINTREE_VERSION)) {
        reqOptions.graphQL = new GraphQL({
          graphQL: {
            url: authData.graphQL.url,
            features: ['configuration']
          }
        });
      }

      reqOptions.metadata = analyticsMetadata;
    }

    request(reqOptions, function (err, response, status) {
      var errorTemplate;

      if (err) {
        if (status === 403) {
          errorTemplate = errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
        } else {
          errorTemplate = errors.CLIENT_GATEWAY_NETWORK;
        }

        reject(new BraintreeError({
          type: errorTemplate.type,
          code: errorTemplate.code,
          message: errorTemplate.message,
          details: {
            originalError: err
          }
        }));

        return;
      }

      configuration = {
        authorization: options.authorization,
        authorizationType: attrs.tokenizationKey ? 'TOKENIZATION_KEY' : 'CLIENT_TOKEN',
        analyticsMetadata: analyticsMetadata,
        gatewayConfiguration: response
      };

      resolve(configuration);
    });
  });
}

module.exports = {
  getConfiguration: wrapPromise(getConfiguration)
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/braintree-error":91,"../lib/constants":96,"../lib/create-authorization-data":100,"../lib/is-date-string-before-or-on":120,"../lib/promise":126,"../lib/vendor/uuid":130,"./constants":39,"./errors":40,"./request":53,"./request/graphql":51,"@braintree/wrap-promise":25}],42:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/braintree-error');
var Client = _dereq_('./client');
var VERSION = "3.42.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var sharedErrors = _dereq_('../lib/errors');

/** @module braintree-web/client */

/**
 * @function create
 * @description This function is the entry point for the <code>braintree.client</code> module. It is used for creating {@link Client} instances that service communication to Braintree servers.
 * @param {object} options Object containing all {@link Client} options:
 * @param {string} options.authorization A tokenizationKey or clientToken.
 * @param {callback} [callback] The second argument, <code>data</code>, is the {@link Client} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   // ...
 * });
 * @static
 */
function create(options) {
  if (!options.authorization) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.authorization is required when instantiating a client.'
    }));
  }

  return Client.initialize(options);
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/braintree-error":91,"../lib/errors":105,"../lib/promise":126,"./client":38,"@braintree/wrap-promise":25}],43:[function(_dereq_,module,exports){
'use strict';

var querystring = _dereq_('../../lib/querystring');
var browserDetection = _dereq_('../browser-detection');
var assign = _dereq_('../../lib/assign').assign;
var prepBody = _dereq_('./prep-body');
var parseBody = _dereq_('./parse-body');
var xhr = _dereq_('./xhr');
var isXHRAvailable = xhr.isAvailable;
var GraphQLRequest = _dereq_('./graphql/request');
var DefaultRequest = _dereq_('./default-request');

var MAX_TCP_RETRYCOUNT = 1;
var TCP_PRECONNECT_BUG_STATUS_CODE = 408;

function requestShouldRetry(status) {
  return (!status || status === TCP_PRECONNECT_BUG_STATUS_CODE) && browserDetection.isIe();
}

function graphQLRequestShouldRetryWithClientApi(body) {
  var errorClass = !body.data && body.errors &&
      body.errors[0] &&
      body.errors[0].extensions &&
      body.errors[0].extensions.errorClass;

  return errorClass === 'UNKNOWN' || errorClass === 'INTERNAL';
}

function _requestWithRetry(options, tcpRetryCount, cb) {
  var status, resBody, ajaxRequest, body, method, headers, parsedBody;
  var url = options.url;
  var graphQL = options.graphQL;
  var timeout = options.timeout;
  var req = xhr.getRequestObject();
  var callback = cb;
  var isGraphQLRequest = Boolean(graphQL && graphQL.isGraphQLRequest(url, options.data));

  options.headers = assign({'Content-Type': 'application/json'}, options.headers);

  if (isGraphQLRequest) {
    ajaxRequest = new GraphQLRequest(options);
  } else {
    ajaxRequest = new DefaultRequest(options);
  }

  url = ajaxRequest.getUrl();
  body = ajaxRequest.getBody();
  method = ajaxRequest.getMethod();
  headers = ajaxRequest.getHeaders();

  if (method === 'GET') {
    url = querystring.queryify(url, body);
    body = null;
  }

  if (isXHRAvailable) {
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return; }

      if (req.status === 0 && isGraphQLRequest) {
        // If a merchant experiences a connection
        // issue to the GraphQL endpoint (possibly
        // due to a Content Security Policy), retry
        // the request against the old client API.
        delete options.graphQL;
        _requestWithRetry(options, tcpRetryCount, cb);

        return;
      }

      parsedBody = parseBody(req.responseText);
      resBody = ajaxRequest.adaptResponseBody(parsedBody);
      status = ajaxRequest.determineStatus(req.status, parsedBody);

      if (status >= 400 || status < 200) {
        if (isGraphQLRequest && graphQLRequestShouldRetryWithClientApi(parsedBody)) {
          delete options.graphQL;
          _requestWithRetry(options, tcpRetryCount, cb);

          return;
        }

        if (tcpRetryCount < MAX_TCP_RETRYCOUNT && requestShouldRetry(status)) {
          tcpRetryCount++;
          _requestWithRetry(options, tcpRetryCount, cb);

          return;
        }
        callback(resBody || 'error', null, status || 500);
      } else {
        callback(null, resBody, status);
      }
    };
  } else {
    if (options.headers) {
      url = querystring.queryify(url, headers);
    }

    req.onload = function () {
      callback(null, parseBody(req.responseText), req.status);
    };

    req.onerror = function () {
      // XDomainRequest does not report a body or status for errors, so
      // hardcode to 'error' and 500, respectively
      callback('error', null, 500);
    };

    // This must remain for IE9 to work
    req.onprogress = function () {};

    req.ontimeout = function () {
      callback('timeout', null, -1);
    };
  }

  try {
    req.open(method, url, true);
  } catch (requestOpenError) {
    // If a merchant has a Content Security Policy and they have
    // not allowed our endpoints, some browsers may
    // synchronously throw an error. If it is not a GraphQL
    // request, we throw the error. If it is a GraphQL request
    // we remove the GraphQL option and try the request against
    // the old client API.
    if (!isGraphQLRequest) {
      throw requestOpenError;
    }

    delete options.graphQL;

    _requestWithRetry(options, tcpRetryCount, cb);

    return;
  }

  req.timeout = timeout;

  if (isXHRAvailable) {
    Object.keys(headers).forEach(function (headerKey) {
      req.setRequestHeader(headerKey, headers[headerKey]);
    });
  }

  try {
    req.send(prepBody(method, body));
  } catch (e) { /* ignored */ }
}

function request(options, cb) {
  _requestWithRetry(options, 0, cb);
}

module.exports = {
  request: request
};

},{"../../lib/assign":88,"../../lib/querystring":127,"../browser-detection":37,"./default-request":44,"./graphql/request":52,"./parse-body":56,"./prep-body":57,"./xhr":58}],44:[function(_dereq_,module,exports){
'use strict';

function DefaultRequest(options) {
  this._url = options.url;
  this._data = options.data;
  this._method = options.method;
  this._headers = options.headers;
}

DefaultRequest.prototype.getUrl = function () {
  return this._url;
};

DefaultRequest.prototype.getBody = function () {
  return this._data;
};

DefaultRequest.prototype.getMethod = function () {
  return this._method;
};

DefaultRequest.prototype.getHeaders = function () {
  return this._headers;
};

DefaultRequest.prototype.adaptResponseBody = function (parsedBody) {
  return parsedBody;
};

DefaultRequest.prototype.determineStatus = function (status) {
  return status;
};

module.exports = DefaultRequest;

},{}],45:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function getUserAgent() {
  return global.navigator.userAgent;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],46:[function(_dereq_,module,exports){
'use strict';

var errorResponseAdapter = _dereq_('./error');
var assign = _dereq_('../../../../lib/assign').assign;

/* eslint-disable camelcase */
var cardTypeTransforms = {
  creditCard: {
    AMERICAN_EXPRESS: 'American Express',
    DISCOVER: 'Discover',
    INTERNATIONAL_MAESTRO: 'Maestro',
    JCB: 'JCB',
    MASTERCARD: 'MasterCard',
    SOLO: 'Solo',
    UK_MAESTRO: 'UK Maestro',
    UNION_PAY: 'UnionPay',
    VISA: 'Visa'
  },
  applePayWeb: {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    DISCOVER: 'discover',
    AMERICAN_EXPRESS: 'amex'
  },
  visaCheckout: {
    VISA: 'Visa',
    MASTERCARD: 'MasterCard',
    DISCOVER: 'Discover',
    AMERICAN_EXPRESS: 'American Express'
  },
  googlePay: {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    DISCOVER: 'discover',
    AMERICAN_EXPRESS: 'amex'
  },
  masterpass: {
    VISA: 'visa',
    MASTERCARD: 'master',
    DISCOVER: 'discover',
    AMERICAN_EXPRESS: 'amex',
    DINERS: 'diners',
    INTERNATIONAL_MAESTRO: 'maestro',
    JCB: 'jcb'
  }
};
/* eslint-enable camelcase */

function configurationResponseAdapter(responseBody, ctx) {
  var adaptedResponse;

  if (responseBody.data && !responseBody.errors) {
    adaptedResponse = adaptConfigurationResponseBody(responseBody, ctx);
  } else {
    adaptedResponse = errorResponseAdapter(responseBody);
  }

  return adaptedResponse;
}

function adaptConfigurationResponseBody(body, ctx) {
  var configuration = body.data.clientConfiguration;
  var response;

  response = {
    environment: configuration.environment.toLowerCase(),
    clientApiUrl: configuration.clientApiUrl,
    assetsUrl: configuration.assetsUrl,
    analytics: {
      url: configuration.analyticsUrl
    },
    merchantId: configuration.merchantId,
    venmo: 'off'
  };

  if (configuration.supportedFeatures) {
    response.graphQL = {
      url: ctx._graphQL._config.url,
      features: configuration.supportedFeatures.map(function (feature) {
        return feature.toLowerCase();
      })
    };
  }

  if (configuration.braintreeApi) {
    response.braintreeApi = configuration.braintreeApi;
  }

  if (configuration.applePayWeb) {
    response.applePayWeb = configuration.applePayWeb;
    response.applePayWeb.supportedNetworks = mapCardTypes(configuration.applePayWeb.supportedCardBrands, cardTypeTransforms.applePayWeb);

    delete response.applePayWeb.supportedCardBrands;
  }

  if (configuration.ideal) {
    response.ideal = configuration.ideal;
  }

  if (configuration.kount) {
    response.kount = {
      kountMerchantId: configuration.kount.merchantId
    };
  }

  if (configuration.creditCard) {
    response.challenges = configuration.creditCard.challenges.map(function (challenge) {
      return challenge.toLowerCase();
    });

    response.creditCards = {
      supportedCardTypes: mapCardTypes(configuration.creditCard.supportedCardBrands, cardTypeTransforms.creditCard)
    };
    response.threeDSecureEnabled = configuration.creditCard.threeDSecureEnabled;
  } else {
    response.challenges = [];
    response.creditCards = {
      supportedCardTypes: []
    };
    response.threeDSecureEnabled = false;
  }

  if (configuration.googlePay) {
    response.androidPay = {
      displayName: configuration.googlePay.displayName,
      enabled: true,
      environment: configuration.googlePay.environment.toLowerCase(),
      googleAuthorizationFingerprint: configuration.googlePay.googleAuthorization,
      supportedNetworks: mapCardTypes(configuration.googlePay.supportedCardBrands, cardTypeTransforms.googlePay)
    };
  }

  if (configuration.venmo) {
    response.payWithVenmo = {
      merchantId: configuration.venmo.merchantId,
      accessToken: configuration.venmo.accessToken,
      environment: configuration.venmo.environment.toLowerCase()
    };
  }

  if (configuration.paypal) {
    response.paypalEnabled = true;
    response.paypal = assign({}, configuration.paypal);
    response.paypal.currencyIsoCode = response.paypal.currencyCode;
    response.paypal.environment = response.paypal.environment.toLowerCase();

    delete response.paypal.currencyCode;
  } else {
    response.paypalEnabled = false;
  }

  if (configuration.unionPay) {
    response.unionPay = {
      enabled: true,
      merchantAccountId: configuration.unionPay.merchantAccountId
    };
  }

  if (configuration.visaCheckout) {
    response.visaCheckout = {
      apikey: configuration.visaCheckout.apiKey,
      externalClientId: configuration.visaCheckout.externalClientId,
      supportedCardTypes: mapCardTypes(configuration.visaCheckout.supportedCardBrands, cardTypeTransforms.visaCheckout)
    };
  }

  if (configuration.masterpass) {
    response.masterpass = {
      merchantCheckoutId: configuration.masterpass.merchantCheckoutId,
      supportedNetworks: mapCardTypes(configuration.masterpass.supportedCardBrands, cardTypeTransforms.masterpass)
    };
  }

  if (configuration.usBankAccount) {
    response.usBankAccount = {
      routeId: configuration.usBankAccount.routeId,
      plaid: {
        publicKey: configuration.usBankAccount.plaidPublicKey
      }
    };
  }

  return response;
}

function mapCardTypes(cardTypes, cardTypeTransformMap) {
  return cardTypes.reduce(function (acc, type) {
    if (cardTypeTransformMap.hasOwnProperty(type)) {
      return acc.concat(cardTypeTransformMap[type]);
    }

    return acc;
  }, []);
}

module.exports = configurationResponseAdapter;

},{"../../../../lib/assign":88,"./error":48}],47:[function(_dereq_,module,exports){
'use strict';

var errorResponseAdapter = _dereq_('./error');

var CARD_BRAND_MAP = {
  /* eslint-disable camelcase */
  AMERICAN_EXPRESS: 'American Express',
  DINERS: 'Discover',
  DISCOVER: 'Discover',
  INTERNATIONAL_MAESTRO: 'Maestro',
  JCB: 'JCB',
  MASTERCARD: 'MasterCard',
  UK_MAESTRO: 'Maestro',
  UNION_PAY: 'Union Pay',
  VISA: 'Visa'
  /* eslint-enable camelcase */
};

var BIN_DATA_MAP = {
  YES: 'Yes',
  NO: 'No',
  UNKNOWN: 'Unknown'
};

function creditCardTokenizationResponseAdapter(responseBody) {
  var adaptedResponse;

  if (responseBody.data && !responseBody.errors) {
    adaptedResponse = adaptTokenizeCreditCardResponseBody(responseBody);
  } else {
    adaptedResponse = errorResponseAdapter(responseBody);
  }

  return adaptedResponse;
}

function adaptTokenizeCreditCardResponseBody(body) {
  var data = body.data.tokenizeCreditCard;
  var creditCard = data.creditCard;
  var lastTwo = creditCard.last4 ? creditCard.last4.substr(2, 4) : '';
  var binData = creditCard.binData;
  var response;

  if (binData) {
    ['commercial', 'debit', 'durbinRegulated', 'healthcare', 'payroll', 'prepaid'].forEach(function (key) {
      if (binData[key]) {
        binData[key] = BIN_DATA_MAP[binData[key]];
      } else {
        binData[key] = 'Unknown';
      }
    });

    ['issuingBank', 'countryOfIssuance', 'productId'].forEach(function (key) {
      if (!binData[key]) { binData[key] = 'Unknown'; }
    });
  }

  response = {
    creditCards: [
      {
        binData: binData,
        consumed: false,
        description: lastTwo ? 'ending in ' + lastTwo : '',
        nonce: data.token,
        details: {
          cardType: CARD_BRAND_MAP[creditCard.brandCode] || 'Unknown',
          lastFour: creditCard.last4 || '',
          lastTwo: lastTwo
        },
        type: 'CreditCard',
        threeDSecureInfo: null
      }
    ]
  };

  return response;
}

module.exports = creditCardTokenizationResponseAdapter;

},{"./error":48}],48:[function(_dereq_,module,exports){
'use strict';

function errorResponseAdapter(responseBody) {
  var response;
  var errorClass = responseBody.errors &&
    responseBody.errors[0] &&
    responseBody.errors[0].extensions &&
    responseBody.errors[0].extensions.errorClass;

  if (errorClass === 'VALIDATION') {
    response = userErrorResponseAdapter(responseBody);
  } else if (errorClass) {
    response = errorWithClassResponseAdapter(responseBody);
  } else {
    response = {error: {message: 'There was a problem serving your request'}, fieldErrors: []};
  }

  return response;
}

function errorWithClassResponseAdapter(responseBody) {
  return {error: {message: responseBody.errors[0].message}, fieldErrors: []};
}

function userErrorResponseAdapter(responseBody) {
  var fieldErrors = buildFieldErrors(responseBody.errors);

  return {error: {message: getLegacyMessage(fieldErrors)}, fieldErrors: fieldErrors};
}

function buildFieldErrors(errors) {
  var fieldErrors = [];

  errors.forEach(function (error) {
    addFieldError(error.extensions.inputPath.slice(1), error, fieldErrors);
  });

  return fieldErrors;
}

function addFieldError(inputPath, errorDetail, fieldErrors) {
  var fieldError;
  var legacyCode = errorDetail.extensions.legacyCode;
  var inputField = inputPath[0];

  if (inputPath.length === 1) {
    fieldErrors.push({
      code: legacyCode,
      field: inputField,
      message: errorDetail.message
    });

    return;
  }

  fieldErrors.forEach(function (candidate) {
    if (candidate.field === inputField) {
      fieldError = candidate;
    }
  });

  if (!fieldError) {
    fieldError = {field: inputField, fieldErrors: []};
    fieldErrors.push(fieldError);
  }

  addFieldError(inputPath.slice(1), errorDetail, fieldError.fieldErrors);
}

function getLegacyMessage(errors) {
  var legacyMessages = {
    creditCard: 'Credit card is invalid'
  };

  var field = errors[0].field;

  return legacyMessages[field];
}

module.exports = errorResponseAdapter;

},{}],49:[function(_dereq_,module,exports){
'use strict';

var CONFIGURATION_QUERY = 'query ClientConfiguration { ' +
'  clientConfiguration { ' +
'    analyticsUrl ' +
'    environment ' +
'    merchantId ' +
'    assetsUrl ' +
'    clientApiUrl ' +
'    creditCard { ' +
'      supportedCardBrands ' +
'      challenges ' +
'      threeDSecureEnabled ' +
'    } ' +
'    applePayWeb { ' +
'      countryCode ' +
'      currencyCode ' +
'      merchantIdentifier ' +
'      supportedCardBrands ' +
'    } ' +
'    googlePay { ' +
'      displayName ' +
'      supportedCardBrands ' +
'      environment ' +
'      googleAuthorization ' +
'    } ' +
'    ideal { ' +
'      routeId ' +
'      assetsUrl ' +
'    } ' +
'    kount { ' +
'      merchantId ' +
'    } ' +
'    masterpass { ' +
'      merchantCheckoutId ' +
'      supportedCardBrands ' +
'    } ' +
'    paypal { ' +
'      displayName ' +
'      clientId ' +
'      privacyUrl ' +
'      userAgreementUrl ' +
'      assetsUrl ' +
'      environment ' +
'      environmentNoNetwork ' +
'      unvettedMerchant ' +
'      braintreeClientId ' +
'      billingAgreementsEnabled ' +
'      merchantAccountId ' +
'      currencyCode ' +
'      payeeEmail ' +
'    } ' +
'    unionPay { ' +
'      merchantAccountId ' +
'    } ' +
'    usBankAccount { ' +
'      routeId ' +
'      plaidPublicKey ' +
'    } ' +
'    venmo { ' +
'      merchantId ' +
'      accessToken ' +
'      environment ' +
'    } ' +
'    visaCheckout { ' +
'      apiKey ' +
'      externalClientId ' +
'      supportedCardBrands ' +
'    } ' +
'    braintreeApi { ' +
'      accessToken ' +
'      url ' +
'    } ' +
'    supportedFeatures ' +
'  } ' +
'}';

function configuration() {
  return {
    query: CONFIGURATION_QUERY,
    operationName: 'ClientConfiguration'
  };
}

module.exports = configuration;

},{}],50:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../../../../lib/assign').assign;

var CREDIT_CARD_TOKENIZATION_MUTATION = 'mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) { ' +
'  tokenizeCreditCard(input: $input) { ' +
'    token ' +
'    creditCard { ' +
'      brandCode ' +
'      last4 ' +
'      binData { ' +
'        prepaid ' +
'        healthcare ' +
'        debit ' +
'        durbinRegulated ' +
'        commercial ' +
'        payroll ' +
'        issuingBank ' +
'        countryOfIssuance ' +
'        productId ' +
'      } ' +
'    } ' +
'  } ' +
'}';

function createCreditCardTokenizationBody(body) {
  var cc = body.creditCard;
  var billingAddress = cc && cc.billingAddress;
  var expDate = cc && cc.expirationDate;
  var expirationMonth = cc && (cc.expirationMonth || (expDate && expDate.split('/')[0].trim()));
  var expirationYear = cc && (cc.expirationYear || (expDate && expDate.split('/')[1].trim()));
  var variables = {
    input: {
      creditCard: {
        number: cc && cc.number,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        cvv: cc && cc.cvv,
        cardholderName: cc && cc.cardholderName
      },
      options: {}
    }
  };

  if (billingAddress) {
    variables.input.creditCard.billingAddress = billingAddress;
  }

  variables.input = addValidationRule(body, variables.input);

  return variables;
}

function addValidationRule(body, input) {
  var validate;

  if (body.creditCard && body.creditCard.options && typeof body.creditCard.options.validate === 'boolean') {
    validate = body.creditCard.options.validate;
  } else if ((body.authorizationFingerprint && body.tokenizationKey) || body.authorizationFingerprint) {
    validate = true;
  } else if (body.tokenizationKey) {
    validate = false;
  }

  if (typeof validate === 'boolean') {
    input.options = assign({
      validate: validate
    }, input.options);
  }

  return input;
}

function creditCardTokenization(body) {
  return {
    query: CREDIT_CARD_TOKENIZATION_MUTATION,
    variables: createCreditCardTokenizationBody(body),
    operationName: 'TokenizeCreditCard'
  };
}

module.exports = creditCardTokenization;

},{"../../../../lib/assign":88}],51:[function(_dereq_,module,exports){
'use strict';

var browserDetection = _dereq_('../../browser-detection');

var features = {
  tokenize_credit_cards: 'payment_methods/credit_cards', // eslint-disable-line camelcase
  configuration: 'configuration'
};

var disallowedInputPaths = [
  'creditCard.options.unionPayEnrollment'
];

function GraphQL(config) {
  this._config = config.graphQL;
}

GraphQL.prototype.getGraphQLEndpoint = function () {
  return this._config.url;
};

GraphQL.prototype.isGraphQLRequest = function (url, body) {
  var featureEnabled;
  var path = this.getClientApiPath(url);

  if (!this._isGraphQLEnabled() || !path || browserDetection.isIe9()) {
    return false;
  }

  featureEnabled = this._config.features.some(function (feature) {
    return features[feature] === path;
  });

  if (containsDisallowedlistedKeys(body)) {
    return false;
  }

  return featureEnabled;
};

GraphQL.prototype.getClientApiPath = function (url) {
  var path;
  var clientApiPrefix = '/client_api/v1/';
  var pathParts = url.split(clientApiPrefix);

  if (pathParts.length > 1) {
    path = pathParts[1].split('?')[0];
  }

  return path;
};

GraphQL.prototype._isGraphQLEnabled = function () {
  return Boolean(this._config);
};

function containsDisallowedlistedKeys(body) {
  return disallowedInputPaths.some(function (keys) {
    var value = keys.split('.').reduce(function (accumulator, key) {
      return accumulator && accumulator[key];
    }, body);

    return value !== undefined; // eslint-disable-line no-undefined
  });
}

module.exports = GraphQL;

},{"../../browser-detection":37}],52:[function(_dereq_,module,exports){
'use strict';

var BRAINTREE_VERSION = _dereq_('../../constants').BRAINTREE_VERSION;

var assign = _dereq_('../../../lib/assign').assign;

var creditCardTokenizationBodyGenerator = _dereq_('./generators/credit-card-tokenization');
var creditCardTokenizationResponseAdapter = _dereq_('./adapters/credit-card-tokenization');

var configurationBodyGenerator = _dereq_('./generators/configuration');
var configurationResponseAdapter = _dereq_('./adapters/configuration');

var generators = {
  'payment_methods/credit_cards': creditCardTokenizationBodyGenerator,
  configuration: configurationBodyGenerator
};
var adapters = {
  'payment_methods/credit_cards': creditCardTokenizationResponseAdapter,
  configuration: configurationResponseAdapter
};

function GraphQLRequest(options) {
  var clientApiPath = options.graphQL.getClientApiPath(options.url);

  this._graphQL = options.graphQL;
  this._data = options.data;
  this._method = options.method;
  this._headers = options.headers;
  this._clientSdkMetadata = {
    source: options.metadata.source,
    integration: options.metadata.integration,
    sessionId: options.metadata.sessionId
  };
  this._sendAnalyticsEvent = options.sendAnalyticsEvent || Function.prototype;

  this._generator = generators[clientApiPath];
  this._adapter = adapters[clientApiPath];

  this._sendAnalyticsEvent('graphql.init');
}

GraphQLRequest.prototype.getUrl = function () {
  return this._graphQL.getGraphQLEndpoint();
};

GraphQLRequest.prototype.getBody = function () {
  var formattedBody = formatBodyKeys(this._data);
  var generatedBody = this._generator(formattedBody);
  var body = assign({clientSdkMetadata: this._clientSdkMetadata}, generatedBody);

  return JSON.stringify(body);
};

GraphQLRequest.prototype.getMethod = function () {
  return 'POST';
};

GraphQLRequest.prototype.getHeaders = function () {
  var authorization, headers;

  if (this._data.authorizationFingerprint) {
    this._sendAnalyticsEvent('graphql.authorization-fingerprint');
    authorization = this._data.authorizationFingerprint;
  } else {
    this._sendAnalyticsEvent('graphql.tokenization-key');
    authorization = this._data.tokenizationKey;
  }

  headers = {
    Authorization: 'Bearer ' + authorization,
    'Braintree-Version': BRAINTREE_VERSION
  };

  return assign({}, this._headers, headers);
};

GraphQLRequest.prototype.adaptResponseBody = function (parsedBody) {
  return this._adapter(parsedBody, this);
};

GraphQLRequest.prototype.determineStatus = function (httpStatus, parsedResponse) {
  var status, errorClass;

  if (httpStatus === 200) {
    errorClass = parsedResponse.errors &&
      parsedResponse.errors[0] &&
      parsedResponse.errors[0].extensions &&
      parsedResponse.errors[0].extensions.errorClass;

    if (parsedResponse.data && !parsedResponse.errors) {
      status = 200;
    } else if (errorClass === 'VALIDATION') {
      status = 422;
    } else if (errorClass === 'AUTHORIZATION') {
      status = 403;
    } else if (errorClass === 'AUTHENTICATION') {
      status = 401;
    } else if (isGraphQLError(errorClass, parsedResponse)) {
      status = 403;
    } else {
      status = 500;
    }
  } else if (!httpStatus) {
    status = 500;
  } else {
    status = httpStatus;
  }

  this._sendAnalyticsEvent('graphql.status.' + httpStatus);
  this._sendAnalyticsEvent('graphql.determinedStatus.' + status);

  return status;
};

function isGraphQLError(errorClass, parsedResponse) {
  return !errorClass && parsedResponse.errors[0].message;
}

function snakeCaseToCamelCase(snakeString) {
  if (snakeString.indexOf('_') === -1) {
    return snakeString;
  }

  return snakeString.toLowerCase().replace(/(\_\w)/g, function (match) {
    return match[1].toUpperCase();
  });
}

function formatBodyKeys(originalBody) {
  var body = {};

  Object.keys(originalBody).forEach(function (key) {
    var camelCaseKey = snakeCaseToCamelCase(key);

    if (typeof originalBody[key] === 'object') {
      body[camelCaseKey] = formatBodyKeys(originalBody[key]);
    } else if (typeof originalBody[key] === 'number') {
      body[camelCaseKey] = String(originalBody[key]);
    } else {
      body[camelCaseKey] = originalBody[key];
    }
  });

  return body;
}

module.exports = GraphQLRequest;

},{"../../../lib/assign":88,"../../constants":39,"./adapters/configuration":46,"./adapters/credit-card-tokenization":47,"./generators/configuration":49,"./generators/credit-card-tokenization":50}],53:[function(_dereq_,module,exports){
'use strict';

var ajaxIsAvaliable;
var once = _dereq_('../../lib/once');
var JSONPDriver = _dereq_('./jsonp-driver');
var AJAXDriver = _dereq_('./ajax-driver');
var getUserAgent = _dereq_('./get-user-agent');
var isHTTP = _dereq_('./is-http');

function isAjaxAvailable() {
  if (ajaxIsAvaliable == null) {
    ajaxIsAvaliable = !(isHTTP() && /MSIE\s(8|9)/.test(getUserAgent()));
  }

  return ajaxIsAvaliable;
}

module.exports = function (options, cb) {
  cb = once(cb || Function.prototype);
  options.method = (options.method || 'GET').toUpperCase();
  options.timeout = options.timeout == null ? 60000 : options.timeout;
  options.data = options.data || {};

  if (isAjaxAvailable()) {
    AJAXDriver.request(options, cb);
  } else {
    JSONPDriver.request(options, cb);
  }
};

},{"../../lib/once":125,"./ajax-driver":43,"./get-user-agent":45,"./is-http":54,"./jsonp-driver":55}],54:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function () {
  return global.location.protocol === 'http:';
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],55:[function(_dereq_,module,exports){
(function (global){
'use strict';

var head;
var uuid = _dereq_('../../lib/vendor/uuid');
var querystring = _dereq_('../../lib/querystring');
var timeouts = {};

function _removeScript(script) {
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

function _createScriptTag(url, callbackName) {
  var script = document.createElement('script');
  var done = false;

  script.src = url;
  script.async = true;
  script.onerror = function () {
    global[callbackName]({message: 'error', status: 500});
  };

  script.onload = script.onreadystatechange = function () {
    if (done) { return; }

    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      done = true;
      script.onload = script.onreadystatechange = null;
    }
  };

  return script;
}

function _cleanupGlobal(callbackName) {
  try {
    delete global[callbackName];
  } catch (_) {
    global[callbackName] = null;
  }
}

function _setupTimeout(timeout, callbackName) {
  timeouts[callbackName] = setTimeout(function () {
    timeouts[callbackName] = null;

    global[callbackName]({
      error: 'timeout',
      status: -1
    });

    global[callbackName] = function () {
      _cleanupGlobal(callbackName);
    };
  }, timeout);
}

function _setupGlobalCallback(script, callback, callbackName) {
  global[callbackName] = function (response) {
    var status = response.status || 500;
    var err = null;
    var data = null;

    delete response.status;

    if (status >= 400 || status < 200) {
      err = response;
    } else {
      data = response;
    }

    _cleanupGlobal(callbackName);
    _removeScript(script);

    clearTimeout(timeouts[callbackName]);
    callback(err, data, status);
  };
}

function request(options, callback) {
  var script;
  var callbackName = 'callback_json_' + uuid().replace(/-/g, '');
  var url = options.url;
  var attrs = options.data;
  var method = options.method;
  var timeout = options.timeout;

  url = querystring.queryify(url, attrs);
  url = querystring.queryify(url, {
    _method: method,
    callback: callbackName
  });

  script = _createScriptTag(url, callbackName);
  _setupGlobalCallback(script, callback, callbackName);
  _setupTimeout(timeout, callbackName);

  if (!head) {
    head = document.getElementsByTagName('head')[0];
  }

  head.appendChild(script);
}

module.exports = {
  request: request
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/querystring":127,"../../lib/vendor/uuid":130}],56:[function(_dereq_,module,exports){
'use strict';

module.exports = function (body) {
  try {
    body = JSON.parse(body);
  } catch (e) { /* ignored */ }

  return body;
};

},{}],57:[function(_dereq_,module,exports){
'use strict';

module.exports = function (method, body) {
  if (typeof method !== 'string') {
    throw new Error('Method must be a string');
  }

  if (method.toLowerCase() !== 'get' && body != null) {
    body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return body;
};

},{}],58:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isXHRAvailable = global.XMLHttpRequest && 'withCredentials' in new global.XMLHttpRequest();

function getRequestObject() {
  return isXHRAvailable ? new XMLHttpRequest() : new XDomainRequest();
}

module.exports = {
  isAvailable: isXHRAvailable,
  getRequestObject: getRequestObject
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],59:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Data Collector - Creation Error Codes
 * @description Errors that occur when [creating the Data Collector component](/current/module-braintree-web_data-collector.html#.create).
 * @property {MERCHANT} DATA_COLLECTOR_KOUNT_NOT_ENABLED Occurs when Kount is enabled in creation options but is not enabled on the Braintree control panel.
 * @property {MERCHANT} DATA_COLLECTOR_KOUNT_ERROR Occurs when Kount errors while setting up.
 * @property {MERCHANT} DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS Occurs when Kount or PayPal Fraudnet could not be enabled.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  DATA_COLLECTOR_KOUNT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'DATA_COLLECTOR_KOUNT_NOT_ENABLED',
    message: 'Kount is not enabled for this merchant.'
  },
  DATA_COLLECTOR_KOUNT_ERROR: {
    type: BraintreeError.types.MERCHANT,
    code: 'DATA_COLLECTOR_KOUNT_ERROR'
  },
  DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS',
    message: 'Data Collector must be created with Kount and/or PayPal.'
  }
};

},{"../lib/braintree-error":91}],60:[function(_dereq_,module,exports){
'use strict';

var FRAUDNET_FNCLS = _dereq_('../lib/constants').FRAUDNET_FNCLS;
var FRAUDNET_SOURCE = _dereq_('../lib/constants').FRAUDNET_SOURCE;
var FRAUDNET_URL = _dereq_('../lib/constants').FRAUDNET_URL;
var loadScript = _dereq_('../lib/assets').loadScript;

function setup() {
  var fraudNet = new Fraudnet();

  return fraudNet.initialize();
}

function Fraudnet() {
  this.sessionId = _generateSessionId();
  this._beaconId = _generateBeaconId(this.sessionId);
}

Fraudnet.prototype.initialize = function () {
  var self = this;

  this._parameterBlock = _createParameterBlock(this.sessionId, this._beaconId);

  return loadScript({
    src: FRAUDNET_URL
  }).then(function (block) {
    self._thirdPartyBlock = block;

    return self;
  }).catch(function () {
    // if the fraudnet script fails to load
    // we just resolve with nothing
    // and data collector ignores it
    return null;
  });
};

Fraudnet.prototype.teardown = function () {
  var iframe = document.querySelector('iframe[title="ppfniframe"]');

  if (iframe) {
    iframe.parentNode.removeChild(iframe);
  }

  iframe = document.querySelector('iframe[title="pbf"]');
  if (iframe) {
    iframe.parentNode.removeChild(iframe);
  }

  if (this._parameterBlock) {
    this._parameterBlock.parentNode.removeChild(this._parameterBlock);
  }

  if (this._thirdPartyBlock) {
    this._thirdPartyBlock.parentNode.removeChild(this._thirdPartyBlock);
  }
};

function _generateSessionId() {
  var i;
  var id = '';

  for (i = 0; i < 32; i++) {
    id += Math.floor(Math.random() * 16).toString(16);
  }

  return id;
}

function _generateBeaconId(sessionId) {
  var timestamp = new Date().getTime() / 1000;

  return 'https://b.stats.paypal.com/counter.cgi' +
    '?i=127.0.0.1' +
    '&p=' + sessionId +
    '&t=' + timestamp +
    '&a=14';
}

function _createParameterBlock(sessionId, beaconId) {
  var el = document.body.appendChild(document.createElement('script'));

  el.type = 'application/json';
  el.setAttribute('fncls', FRAUDNET_FNCLS);
  el.text = JSON.stringify({
    f: sessionId,
    s: FRAUDNET_SOURCE,
    b: beaconId
  });

  return el;
}

module.exports = {
  setup: setup
};

},{"../lib/assets":87,"../lib/constants":96}],61:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/data-collector */

var kount = _dereq_('./kount');
var fraudnet = _dereq_('./fraudnet');
var BraintreeError = _dereq_('../lib/braintree-error');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var methods = _dereq_('../lib/methods');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var VERSION = "3.42.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var errors = _dereq_('./errors');

/**
 * @class
 * @global
 * @name DataCollector
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/data-collector.create|braintree-web.data-collector.create} instead.</strong>
 * @classdesc This class is used for advanced fraud integration with PayPal and Kount. Instances of this class have {@link DataCollector#deviceData|deviceData} which is used to correlate user sessions with server transactions. Before using DataCollector, make sure you have enabled advanced fraud protection in the Braintree gateway. To use your own Kount ID, contact our support team ([support@braintreepayments.com](mailto:support@braintreepayments.com) or [877.434.2894](tel:877.434.2894)).
 */

/**
 * @memberof DataCollector
 * @name deviceData
 * @type string
 * @description JSON string to pass with server transactions.
 * @instance
 */

/**
 * @memberof DataCollector
 * @name rawDeviceData
 * @type object
 * @description The device data as an object instead of a string.
 * @instance
 */

/**
 * @memberof DataCollector
 * @name teardown
 * @function
 * @description Cleanly remove anything set up by {@link module:braintree-web/data-collector.create|create}.
 * @param {callback} [callback] Called on completion. If no callback is provided, `teardown` returns a promise.
 * @instance
 * @example
 * dataCollectorInstance.teardown();
 * @example <caption>With callback</caption>
 * dataCollectorInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */

/**
 * @static
 * @function create
 * @description Creates a DataCollector instance. Requires advanced fraud protection to be enabled in the Braintree gateway. Contact our [support team](mailto:support@braintreepayments.com) to configure your Kount ID.
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {boolean} [options.kount] If true, Kount fraud data collection is enabled.
 *
 * **Note:** the data sent to Kount is asynchronous and may not have completed by the time the data collector create call is complete. In most cases, this will not matter, but if you create the data collector instance and immediately navigate away from the page, the device information may fail to be sent to Kount.
 * @param {boolean} [options.paypal] If true, PayPal fraud data collection is enabled.
 * @param {callback} [callback] The second argument, `data`, is the {@link DataCollector} instance.
 * @returns {Promise|void} Returns a promise that resolves the {@link DataCollector} instance if no callback is provided.
 */
function create(options) {
  var name = 'Data Collector';
  var result = {};
  var instances = [];
  var data;

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var kountInstance;
    var config = client.getConfiguration();

    if (options.kount === true) {
      if (!config.gatewayConfiguration.kount) {
        return Promise.reject(new BraintreeError(errors.DATA_COLLECTOR_KOUNT_NOT_ENABLED));
      }

      try {
        kountInstance = kount.setup({
          environment: config.gatewayConfiguration.environment,
          merchantId: config.gatewayConfiguration.kount.kountMerchantId
        });
      } catch (err) {
        return Promise.reject(new BraintreeError({
          type: errors.DATA_COLLECTOR_KOUNT_ERROR.type,
          code: errors.DATA_COLLECTOR_KOUNT_ERROR.code,
          message: err.message
        }));
      }

      data = kountInstance.deviceData;
      instances.push(kountInstance);
    } else {
      data = {};
    }

    return Promise.resolve();
  }).then(function () {
    if (options.paypal !== true) {
      return Promise.resolve();
    }

    return fraudnet.setup().then(function (fraudnetInstance) {
      if (fraudnetInstance) {
        data.correlation_id = fraudnetInstance.sessionId; // eslint-disable-line camelcase
        instances.push(fraudnetInstance);
      }
    });
  }).then(function () {
    if (instances.length === 0) {
      return Promise.reject(new BraintreeError(errors.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS));
    }

    result.deviceData = JSON.stringify(data);
    result.rawDeviceData = data;
    result.teardown = createTeardownMethod(result, instances);

    return result;
  });
}

function createTeardownMethod(result, instances) {
  return wrapPromise(function teardown() {
    return new Promise(function (resolve) {
      instances.forEach(function (instance) {
        if (instance) {
          instance.teardown();
        }
      });

      convertMethodsToError(result, methods(result));

      resolve();
    });
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/methods":124,"../lib/promise":126,"./errors":59,"./fraudnet":60,"./kount":62,"@braintree/wrap-promise":25}],62:[function(_dereq_,module,exports){
'use strict';

var sjcl = _dereq_('./vendor/sjcl');
var camelCaseToSnakeCase = _dereq_('../lib/camel-case-to-snake-case');

var QA_URL = 'https://assets.qa.braintreepayments.com/data';
var IFRAME_ID_PREFIX = 'braintreeDataFrame-';
var environmentUrls = {
  development: QA_URL,
  qa: QA_URL,
  sandbox: 'https://assets.braintreegateway.com/sandbox/data',
  production: 'https://assets.braintreegateway.com/data'
};
var cachedDeviceData = {};

function setup(o) {
  var options = o != null ? o : {};

  return new Kount(options);
}

function Kount(options) {
  var previouslyInitializedDeviceData = Kount.getCachedDeviceData(options.merchantId);

  if (previouslyInitializedDeviceData) {
    this.deviceData = previouslyInitializedDeviceData;
    this._isCached = true;

    return;
  }

  this._currentEnvironment = this._initializeEnvironment(options);

  sjcl.random.startCollectors();

  this._deviceSessionId = this._generateDeviceSessionId();
  this.deviceData = this._getDeviceData();

  Kount.setCachedDeviceData(options.merchantId, this.deviceData);

  this._iframe = this._setupIFrame();
}

Kount.getCachedDeviceData = function (merchantId) {
  return cachedDeviceData[merchantId];
};

Kount.setCachedDeviceData = function (merchantId, data) {
  cachedDeviceData[merchantId] = data;
};

Kount.prototype.teardown = function () {
  if (!this._isCached) {
    sjcl.random.stopCollectors();

    this._removeIframe();
  }
};

Kount.prototype._removeIframe = function () {
  this._iframe.parentNode.removeChild(this._iframe);
};

Kount.prototype._getDeviceData = function () {
  return camelCaseToSnakeCase({
    deviceSessionId: this._deviceSessionId,
    fraudMerchantId: this._currentEnvironment.id
  });
};

Kount.prototype._generateDeviceSessionId = function () {
  var bits, hexString;

  bits = sjcl.random.randomWords(4, 0);
  hexString = sjcl.codec.hex.fromBits(bits);

  return hexString;
};

Kount.prototype._setupIFrame = function () {
  var params, iframe;
  var self = this;

  params = '?m=' + this._currentEnvironment.id + '&s=' + this._deviceSessionId;

  iframe = document.createElement('iframe');
  iframe.width = 1;
  iframe.id = IFRAME_ID_PREFIX + this._deviceSessionId;
  iframe.height = 1;
  iframe.frameBorder = 0;
  iframe.scrolling = 'no';
  iframe.style.position = 'fixed';
  iframe.style.left = '-999999px';
  iframe.style.top = '-999999px';

  document.body.appendChild(iframe);
  setTimeout(function () {
    iframe.src = self._currentEnvironment.url + '/logo.htm' + params;
    iframe.innerHTML = '<img src="' + self._currentEnvironment.url + '/logo.gif' + params + '" />';
  }, 10);

  return iframe;
};

Kount.prototype._initializeEnvironment = function (options) {
  var url = environmentUrls[options.environment];

  if (url == null) {
    throw new Error(options.environment + ' is not a valid environment for kount.environment');
  }

  return {
    url: url,
    name: options.environment,
    id: options.merchantId
  };
};

module.exports = {
  setup: setup,
  Kount: Kount,
  environmentUrls: environmentUrls
};

},{"../lib/camel-case-to-snake-case":95,"./vendor/sjcl":63}],63:[function(_dereq_,module,exports){
"use strict";var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
sjcl.cipher.aes=function(a){this.l[0][0][0]||this.G();var b,c,d,e,f=this.l[0][4],g=this.l[1];b=a.length;var k=1;if(4!==b&&6!==b&&8!==b)throw new sjcl.exception.invalid("invalid aes key size");this.b=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255],0===a%b&&(c=c<<8^c>>>24^k<<24,k=k<<1^283*(k>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--)c=d[b&3?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[c&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return t(this,a,0)},decrypt:function(a){return t(this,a,1)},l:[[[],[],[],[],[]],[[],[],[],[],[]]],G:function(){var a=this.l[0],b=this.l[1],c=a[4],d=b[4],e,f,g,k=[],l=[],p,n,h,m;for(e=0;0x100>e;e++)l[(k[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!c[f];f^=p||1,g=l[g]||1)for(h=g^g<<1^g<<2^g<<3^g<<4,h=h>>8^h&255^99,c[f]=h,d[h]=f,n=k[e=k[p=k[f]]],m=0x1010101*n^0x10001*e^0x101*p^0x1010100*f,n=0x101*k[h]^0x1010100*h,e=0;4>e;e++)a[e][f]=n=n<<24^n>>>8,b[e][h]=m=m<<24^m>>>8;for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function t(a,b,c){if(4!==b.length)throw new sjcl.exception.invalid("invalid aes block size");var d=a.b[c],e=b[0]^d[0],f=b[c?3:1]^d[1],g=b[2]^d[2];b=b[c?1:3]^d[3];var k,l,p,n=d.length/4-2,h,m=4,q=[0,0,0,0];k=a.l[c];a=k[0];var r=k[1],v=k[2],w=k[3],x=k[4];for(h=0;h<n;h++)k=a[e>>>24]^r[f>>16&255]^v[g>>8&255]^w[b&255]^d[m],l=a[f>>>24]^r[g>>16&255]^v[b>>8&255]^w[e&255]^d[m+1],p=a[g>>>24]^r[b>>16&255]^v[e>>8&255]^w[f&255]^d[m+2],b=a[b>>>24]^r[e>>16&255]^v[f>>8&255]^w[g&255]^d[m+3],m+=4,e=k,f=l,g=p;for(h=
0;4>h;h++)q[c?3&-h:h]=x[e>>>24]<<24^x[f>>16&255]<<16^x[g>>8&255]<<8^x[b&255]^d[m++],k=e,e=f,f=g,g=b,b=k;return q}
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.M(a.slice(b/32),32-(b&31)).slice(1);return void 0===c?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.M(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b=b&31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},M:function(a,b,c,d){var e;e=0;for(void 0===d&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},Y:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]},byteswapM:function(a){var b,c;for(b=0;b<a.length;++b)c=a[b],a[b]=c>>>24|c>>>8&0xff00|(c&0xff00)<<8|c<<24;return a}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>8>>>8>>>8),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a=a+"00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,4*d)}};sjcl.hash.sha256=function(a){this.b[0]||this.G();a?(this.u=a.u.slice(0),this.o=a.o.slice(0),this.h=a.h):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.u=this.K.slice(0);this.o=[];this.h=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.o=sjcl.bitArray.concat(this.o,a);b=this.h;a=this.h=b+sjcl.bitArray.bitLength(a);if(0x1fffffffffffff<a)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!==typeof Uint32Array){var d=new Uint32Array(c),e=0;for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,d.subarray(16*e,
16*(e+1))),e+=1;c.splice(0,16*e)}else for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,c.splice(0,16));return this},finalize:function(){var a,b=this.o,c=this.u,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.h/0x100000000));for(b.push(this.h|0);b.length;)u(this,b.splice(0,16));this.reset();return c},K:[],b:[],G:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}for(var b=0,c=2,d,e;64>b;c++){e=!0;for(d=2;d*d<=c;d++)if(0===c%d){e=
!1;break}e&&(8>b&&(this.K[b]=a(Math.pow(c,.5))),this.b[b]=a(Math.pow(c,1/3)),b++)}}};
function u(a,b){var c,d,e,f=a.u,g=a.b,k=f[0],l=f[1],p=f[2],n=f[3],h=f[4],m=f[5],q=f[6],r=f[7];for(c=0;64>c;c++)16>c?d=b[c]:(d=b[c+1&15],e=b[c+14&15],d=b[c&15]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+b[c&15]+b[c+9&15]|0),d=d+r+(h>>>6^h>>>11^h>>>25^h<<26^h<<21^h<<7)+(q^h&(m^q))+g[c],r=q,q=m,m=h,h=n+d|0,n=p,p=l,l=k,k=d+(l&p^n&(l^p))+(l>>>2^l>>>13^l>>>22^l<<30^l<<19^l<<10)|0;f[0]=f[0]+k|0;f[1]=f[1]+l|0;f[2]=f[2]+p|0;f[3]=f[3]+n|0;f[4]=f[4]+h|0;f[5]=f[5]+m|0;f[6]=f[6]+q|0;f[7]=
f[7]+r|0}sjcl.prng=function(a){this.c=[new sjcl.hash.sha256];this.i=[0];this.H=0;this.v={};this.F=0;this.J={};this.L=this.f=this.j=this.T=0;this.b=[0,0,0,0,0,0,0,0];this.g=[0,0,0,0];this.C=void 0;this.D=a;this.s=!1;this.B={progress:{},seeded:{}};this.m=this.S=0;this.w=1;this.A=2;this.O=0x10000;this.I=[0,48,64,96,128,192,0x100,384,512,768,1024];this.P=3E4;this.N=80};
sjcl.prng.prototype={randomWords:function(a,b){var c=[],d;d=this.isReady(b);var e;if(d===this.m)throw new sjcl.exception.notReady("generator isn't seeded");if(d&this.A){d=!(d&this.w);e=[];var f=0,g;this.L=e[0]=(new Date).valueOf()+this.P;for(g=0;16>g;g++)e.push(0x100000000*Math.random()|0);for(g=0;g<this.c.length&&(e=e.concat(this.c[g].finalize()),f+=this.i[g],this.i[g]=0,d||!(this.H&1<<g));g++);this.H>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.i.push(0));this.f-=f;f>this.j&&(this.j=
f);this.H++;this.b=sjcl.hash.sha256.hash(this.b.concat(e));this.C=new sjcl.cipher.aes(this.b);for(d=0;4>d&&(this.g[d]=this.g[d]+1|0,!this.g[d]);d++);}for(d=0;d<a;d+=4)0===(d+1)%this.O&&y(this),e=z(this),c.push(e[0],e[1],e[2],e[3]);y(this);return c.slice(0,a)},setDefaultParanoia:function(a,b){if(0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.D=a},addEntropy:function(a,
b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.v[c],k=this.isReady(),l=0;d=this.J[c];void 0===d&&(d=this.J[c]=this.T++);void 0===g&&(g=this.v[c]=0);this.v[c]=(this.v[c]+1)%this.c.length;switch(typeof a){case "number":void 0===b&&(b=1);this.c[g].update([d,this.F++,1,b,f,1,a|0]);break;case "object":c=Object.prototype.toString.call(a);if("[object Uint32Array]"===c){e=[];for(c=0;c<a.length;c++)e.push(a[c]);a=e}else for("[object Array]"!==c&&(l=1),c=0;c<a.length&&!l;c++)"number"!==typeof a[c]&&
(l=1);if(!l){if(void 0===b)for(c=b=0;c<a.length;c++)for(e=a[c];0<e;)b++,e=e>>>1;this.c[g].update([d,this.F++,2,b,f,a.length].concat(a))}break;case "string":void 0===b&&(b=a.length);this.c[g].update([d,this.F++,3,b,f,a.length]);this.c[g].update(a);break;default:l=1}if(l)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.i[g]+=b;this.f+=b;k===this.m&&(this.isReady()!==this.m&&A("seeded",Math.max(this.j,this.f)),A("progress",this.getProgress()))},
isReady:function(a){a=this.I[void 0!==a?a:this.D];return this.j&&this.j>=a?this.i[0]>this.N&&(new Date).valueOf()>this.L?this.A|this.w:this.w:this.f>=a?this.A|this.m:this.m},getProgress:function(a){a=this.I[a?a:this.D];return this.j>=a?1:this.f>a?1:this.f/a},startCollectors:function(){if(!this.s){this.a={loadTimeCollector:B(this,this.V),mouseCollector:B(this,this.W),keyboardCollector:B(this,this.U),accelerometerCollector:B(this,this.R),touchCollector:B(this,this.X)};if(window.addEventListener)window.addEventListener("load",
this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else if(document.attachEvent)document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector);else throw new sjcl.exception.bug("can't attach event");
this.s=!0}},stopCollectors:function(){this.s&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",
this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.s=!1)},addEventListener:function(a,b){this.B[a][this.S++]=b},removeEventListener:function(a,b){var c,d,e=this.B[a],f=[];for(d in e)e.hasOwnProperty(d)&&e[d]===b&&f.push(d);for(c=0;c<f.length;c++)d=f[c],delete e[d]},U:function(){C(this,1)},W:function(a){var b,c;try{b=a.x||a.clientX||a.offsetX||0,c=a.y||a.clientY||a.offsetY||0}catch(d){c=b=0}0!=b&&0!=c&&this.addEntropy([b,c],2,"mouse");C(this,0)},X:function(a){a=
a.touches[0]||a.changedTouches[0];this.addEntropy([a.pageX||a.clientX,a.pageY||a.clientY],1,"touch");C(this,0)},V:function(){C(this,2)},R:function(a){a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z;if(window.orientation){var b=window.orientation;"number"===typeof b&&this.addEntropy(b,1,"accelerometer")}a&&this.addEntropy(a,2,"accelerometer");C(this,0)}};
function A(a,b){var c,d=sjcl.random.B[a],e=[];for(c in d)d.hasOwnProperty(c)&&e.push(d[c]);for(c=0;c<e.length;c++)e[c](b)}function C(a,b){"undefined"!==typeof window&&window.performance&&"function"===typeof window.performance.now?a.addEntropy(window.performance.now(),b,"loadtime"):a.addEntropy((new Date).valueOf(),b,"loadtime")}function y(a){a.b=z(a).concat(z(a));a.C=new sjcl.cipher.aes(a.b)}function z(a){for(var b=0;4>b&&(a.g[b]=a.g[b]+1|0,!a.g[b]);b++);return a.C.encrypt(a.g)}
function B(a,b){return function(){b.apply(a,arguments)}}sjcl.random=new sjcl.prng(6);
a:try{var D,E,F,G;if(G="undefined"!==typeof module&&module.exports){var H;try{H=_dereq_("crypto")}catch(a){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array((new Uint8Array(D)).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']");else if("undefined"!==typeof window&&"undefined"!==typeof Uint32Array){F=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F);else if(window.msCrypto&&window.msCrypto.getRandomValues)window.msCrypto.getRandomValues(F);
else break a;sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(a){"undefined"!==typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(a))}"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);"function"===typeof define&&define([],function(){return sjcl});

},{"crypto":undefined}],64:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Google Payment - Creation Error Codes
 * @description Errors that occur when [creating the Google Payment component](/current/module-braintree-web_google-payment.html#.create).
 * @property {MERCHANT} GOOGLE_PAYMENT_NOT_ENABLED Occurs when Google Pay is not enabled on the Braintree control panel.
 */

/**
 * @name BraintreeError.Google Payment - parseResponse Error Codes
 * @description Errors that occur when [parsing the response from Google](/current/GooglePayment.html#parseResponse).
 * @property {UNKNOWN} GOOGLE_PAYMENT_GATEWAY_ERROR Occurs when Google Pay could not be tokenized.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  GOOGLE_PAYMENT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'GOOGLE_PAYMENT_NOT_ENABLED',
    message: 'Google Pay is not enabled for this merchant.'
  },
  GOOGLE_PAYMENT_GATEWAY_ERROR: {
    code: 'GOOGLE_PAYMENT_GATEWAY_ERROR',
    message: 'There was an error when tokenizing the Google Pay payment method.',
    type: BraintreeError.types.UNKNOWN
  }
};

},{"../lib/braintree-error":91}],65:[function(_dereq_,module,exports){
'use strict';

var analytics = _dereq_('../lib/analytics');
var assign = _dereq_('../lib/assign').assign;
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var find = _dereq_('../lib/find');
var generateGooglePayConfiguration = _dereq_('../lib/generate-google-pay-configuration');
var BraintreeError = _dereq_('../lib/braintree-error');
var errors = _dereq_('./errors');
var methods = _dereq_('../lib/methods');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

var DEFAULT_CARD_NETWORKS = ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'];

/**
 * @typedef {object} GooglePayment~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, `CreditCard` or `AndroidPayCard`.
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
 * @class GooglePayment
 * @param {object} options Google Payment {@link module:braintree-web/google-payment.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/google-payment.create|braintree-web.google-payment.create} instead.</strong>
 * @classdesc This class represents a Google Payment component produced by {@link module:braintree-web/google-payment.create|braintree-web/google-payment.create}. Instances of this class have methods for initializing the Google Pay flow.
 */
function GooglePayment(options) {
  this._client = options.client;
  this._googlePayVersion = options.googlePayVersion || 1;
  this._googleMerchantId = options.googleMerchantId;
}

GooglePayment.prototype._createV1PaymentDataRequest = function (defaultConfig, paymentDataRequest) {
  var overrideCardNetworks = paymentDataRequest.cardRequirements && paymentDataRequest.cardRequirements.allowedCardNetworks;
  var defaultConfigCardNetworks = defaultConfig.cardRequirements.allowedCardNetworks;
  var allowedCardNetworks = overrideCardNetworks || defaultConfigCardNetworks;

  paymentDataRequest = assign({}, defaultConfig, paymentDataRequest);

  // this way we can preserve allowedCardNetworks from default integration
  // if merchant did not pass any in `cardRequirements`
  paymentDataRequest.cardRequirements.allowedCardNetworks = allowedCardNetworks;

  return paymentDataRequest;
};

GooglePayment.prototype._createV2PaymentDataRequest = function (defaultConfig, paymentDataRequest) {
  var newCardPaymentMethod, defaultConfigCardPaymentMethod, parameters;
  var defaultConfigPaymentMethods = defaultConfig.allowedPaymentMethods;

  // For the CARD allowed payment method, ensure allowedCardNetworks is set.
  if (paymentDataRequest.allowedPaymentMethods) {
    newCardPaymentMethod = find(paymentDataRequest.allowedPaymentMethods, 'type', 'CARD');
    defaultConfigCardPaymentMethod = find(defaultConfigPaymentMethods, 'type', 'CARD');

    if (newCardPaymentMethod) {
      newCardPaymentMethod.parameters = assign({}, newCardPaymentMethod.parameters);
      parameters = newCardPaymentMethod.parameters;
      if (!parameters.allowedCardNetworks || (parameters.allowedCardNetworks && parameters.allowedCardNetworks.length === 0)) {
        if (defaultConfigCardPaymentMethod &&
          defaultConfigCardPaymentMethod.parameters &&
          defaultConfigCardPaymentMethod.parameters.allowedCardNetworks
        ) {
          parameters.allowedCardNetworks = defaultConfigCardPaymentMethod.parameters.allowedCardNetworks;
        } else {
          parameters.allowedCardNetworks = DEFAULT_CARD_NETWORKS;
        }
      }
    }
  }
  paymentDataRequest = assign({}, defaultConfig, paymentDataRequest);

  return paymentDataRequest;
};

/**
 * Create a configuration object for use in the `loadPaymentData` method.
 *
 * **Note**: Version 1 of the Google Pay Api is deprecated and will become unsupported in a future version. Until then, version 1 will continue to be used by default, and version 1 schema parameters and overrides will remain functional on existing integrations. However, new integrations and all following examples will be presented in the GooglePay version 2 schema. See [Google Pay's upgrade guide](https://developers.google.com/pay/api/web/guides/resources/update-to-latest-version) to see how to update your integration.
 *
 * If `options.googlePayVersion === 2` was set during the initial {@link module:braintree-web/google-payment.create|create} call, overrides must match the Google Pay v2 schema to be valid.
 *
 * @public
 * @param {object} overrides The supplied parameters for creating the PaymentDataRequest object. Required parameters are:
 *  @param {object} overrides.transactionInfo Object according to the [Google Pay Transaction Info](https://developers.google.com/pay/api/web/reference/object#TransactionInfo) spec.
 *  Optionally, any of the parameters in the [PaymentDataRequest](https://developers.google.com/pay/api/web/reference/object#PaymentDataRequest) parameters can be overridden, but note that it is recommended only to override top level parameters to avoid squashing deeply nested configuration objects. An example can be found below showing how to safely edit these deeply nested objects.
 * @example
 * var paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *   merchantInfo: {
 *     merchantId: 'my-merchant-id-from-google'
 *   },
 *   transactionInfo: {
 *     currencyCode: 'USD',
 *     totalPriceStatus: 'FINAL',
 *     totalPrice: '100.00'
 *   }
 * });
 *
 * // Update card payment methods to require billing address
 * var cardPaymentMethod = paymentDataRequest.allowedPaymentMethods;
 * cardPaymentMethod.parameters.billingAddressRequired = true;
 * cardPaymentMethod.parameters.billingAddressParameters = {
 *   format: 'FULL',
 *   phoneNumberRequired: true
 * };
 *
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequest).then(function (response) {
 *   // handle response with googlePaymentInstance.parseResponse
 *   // (see below)
 * });
 * @returns {object} Returns a configuration object for Google PaymentDataRequest.
 */
GooglePayment.prototype.createPaymentDataRequest = function (overrides) {
  var paymentDataRequest = assign({}, overrides);
  var defaultConfig = generateGooglePayConfiguration(this._client.getConfiguration(), this._googlePayVersion, this._googleMerchantId);

  // Default to using v1 config. If apiVersion is specifically set to 2, use v2 config.
  if (this._googlePayVersion === 2) {
    paymentDataRequest = this._createV2PaymentDataRequest(defaultConfig, paymentDataRequest);
    analytics.sendEvent(this._client, 'google-payment.v2.createPaymentDataRequest');
  } else {
    paymentDataRequest = this._createV1PaymentDataRequest(defaultConfig, paymentDataRequest);
    analytics.sendEvent(this._client, 'google-payment.v1.createPaymentDataRequest');
  }

  return paymentDataRequest;
};

/**
 * Parse the response from the tokenization.
 * @public
 * @param {object} response The response back from the Google Pay tokenization.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link GooglePay~tokenizePayload|tokenizePayload}. If no callback is provided, `parseResponse` returns a promise that resolves with a {@link GooglePayment~tokenizePayload|tokenizePayload}.
 * @example with callback
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequestFromCreatePaymentDataRequest).then(function (response) {
 *   googlePaymentInstance.parseResponse(response, function (err, data) {
 *     if (err) {
 *       // handle errors
 *     }
 *     // send parsedResponse.nonce to your server
 *   });
 * });
 * @example with promise
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequestFromCreatePaymentDataRequest).then(function (response) {
 *   return googlePaymentInstance.parseResponse(response);
 * }).then(function (parsedResponse) {
 *   // send parsedResponse.nonce to your server
 * }).catch(function (err) {
 *   // handle errors
 * });
 * @returns {Promise|void} Returns a promise that resolves the parsed response if no callback is provided.
 */
GooglePayment.prototype.parseResponse = function (response) {
  var client = this._client;

  return Promise.resolve().then(function () {
    var payload;
    var rawResponse = response.apiVersion === 2 ?
      response.paymentMethodData.tokenizationData.token :
      response.paymentMethodToken.token;
    var parsedResponse = JSON.parse(rawResponse);
    var error = parsedResponse.error;

    if (error) {
      return Promise.reject(error);
    }

    analytics.sendEvent(client, 'google-payment.parseResponse.succeeded');

    if (parsedResponse.paypalAccounts) {
      payload = parsedResponse.paypalAccounts[0];
      analytics.sendEvent(client, 'google-payment.parseResponse.succeeded.paypal');

      return Promise.resolve({
        nonce: payload.nonce,
        type: payload.type,
        description: payload.description
      });
    }
    payload = parsedResponse.androidPayCards[0];
    analytics.sendEvent(client, 'google-payment.parseResponse.succeeded.google-payment');

    return Promise.resolve({
      nonce: payload.nonce,
      type: payload.type,
      description: payload.description,
      details: {
        cardType: payload.details.cardType,
        lastFour: payload.details.lastFour,
        lastTwo: payload.details.lastTwo
      },
      binData: payload.binData
    });
  }).catch(function (error) {
    analytics.sendEvent(client, 'google-payment.parseResponse.failed');

    return Promise.reject(new BraintreeError({
      code: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.code,
      message: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.message,
      type: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.type,
      details: {
        originalError: error
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/google-payment.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * googlePaymentInstance.teardown();
 * @example <caption>With callback</caption>
 * googlePaymentInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
GooglePayment.prototype.teardown = function () {
  convertMethodsToError(this, methods(GooglePayment.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(GooglePayment);

},{"../lib/analytics":86,"../lib/assign":88,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/find":107,"../lib/generate-google-pay-configuration":119,"../lib/methods":124,"../lib/promise":126,"./errors":64,"@braintree/wrap-promise":25}],66:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/google-payment
 * @description A component to integrate with Google Pay. The majority of the integration uses [Google's pay.js JavaScript file](https://pay.google.com/gp/p/js/pay.js). The Braintree component generates the configuration object necessary for Google Pay to initiate the Payment Request and parse the returned data to retrieve the payment method nonce which is used to process the transaction on the server.
 */

var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var BraintreeError = _dereq_('../lib/braintree-error');
var errors = _dereq_('./errors');
var GooglePayment = _dereq_('./google-payment');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var VERSION = "3.42.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {Number} [options.googlePayVersion] The version of the Google Pay API to use. Value of 2 is required to accept parameters documented [by Google](https://developers.google.com/pay/api/web/reference/object). Omit this parameter to use the deprecated Google Pay Version 1.
 * @param {String} [options.googleMerchantId] A Google merchant identifier issued after your website is approved by Google. Required when PaymentsClient is initialized with an environment property of PRODUCTION, but may be omitted in TEST environment.
 * @param {callback} [callback] The second argument, `data`, is the {@link GooglePayment} instance. If no callback is provided, `create` returns a promise that resolves with the {@link GooglePayment} instance.
 * @example <caption>Simple Example</caption>
 * // include https://pay.google.com/gp/p/js/pay.js in a script tag
 * // on your page to load the `google.payments.api.PaymentsClient` global object.
 *
 * var paymentButton = document.querySelector('#google-pay-button');
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * });
 *
 * braintree.client.create({
 *   authorization: 'tokenization-key-or-client-token'
 * }).then(function (clientInstance) {
 *   return braintree.googlePayment.create({
 *     client: clientInstance,
*      googlePayVersion: 2,
*      googleMerchantId: 'your-merchant-id-from-google'
 *   });
 * }).then(function (googlePaymentInstance) {
 *   paymentButton.addEventListener('click', function (event) {
 *     var paymentDataRequest;
 *
 *     event.preventDefault();
 *
 *     paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *       transactionInfo: {
 *         currencyCode: 'USD',
 *         totalPriceStatus: 'FINAL',
 *         totalPrice: '100.00'
 *       }
 *     });
 *
 *     paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
 *       return googlePaymentInstance.parseResponse(paymentData);
 *     }).then(function (result) {
 *       // send result.nonce to your server
 *     }).catch(function (err) {
 *       // handle err
 *     });
 *   });
 * });
 * @example <caption>Check Browser and Customer Compatibility</caption>
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * });
 *
 * function setupGooglePayButton(googlePaymentInstance) {
 *   var button = document.createElement('button');
 *
 *   button.id = 'google-pay';
 *   button.appendChild(document.createTextNode('Google Pay'));
 *   button.addEventListener('click', function (event) {
 *     var paymentRequestData;
 *
 *     event.preventDefault();
 *
 *     paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *       transactionInfo: {
 *         currencyCode: 'USD',
 *         totalPriceStatus: 'FINAL',
 *         totalPrice: '100.00' // your amount
 *       }
 *     });
 *
 *     paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
 *       return googlePaymentInstance.parseResponse(paymentData);
*       }).then(function (result) {
 *       // send result.nonce to your server
 *     }).catch(function (err) {
 *       // handle errors
 *     });
 *   });
 *
 *   document.getElementById('container').appendChild(button);
 * }
 *
 * braintree.client.create({
 *   authorization: 'tokenization-key-or-client-token'
 * }).then(function (clientInstance) {
 *   return braintree.googlePayment.create({
 *     client: clientInstance,
 *     googlePayVersion: 2,
 *     googleMerchantId: 'your-merchant-id-from-google'
 *   });
 * }).then(function (googlePaymentInstance) {
 *
 *   return paymentsClient.isReadyToPay({
 *     apiVersion: 2,
 *     apiVersionMinor: 0,
 *     allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods
 *   });
 * }).then(function (response) {
 *   if (response.result) {
 *     setupGooglePayButton(googlePaymentInstance);
 *   }
 * }).catch(function (err) {
 *   // handle setup errors
 * });
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'Google Pay';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    options.client = client;

    if (!options.client.getConfiguration().gatewayConfiguration.androidPay) {
      return Promise.reject(new BraintreeError(errors.GOOGLE_PAYMENT_NOT_ENABLED));
    }

    return new GooglePayment(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./errors":64,"./google-payment":65,"@braintree/wrap-promise":25}],67:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/braintree-error');
var errors = _dereq_('../shared/errors');
var allowedAttributes = _dereq_('../shared/constants').allowedAttributes;

function attributeValidationError(attribute, value) {
  var err;

  if (!allowedAttributes.hasOwnProperty(attribute)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
      message: 'The "' + attribute + '" attribute is not supported in Hosted Fields.'
    });
  } else if (value != null && !_isValid(attribute, value)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
      message: 'Value "' + value + '" is not allowed for "' + attribute + '" attribute.'
    });
  }

  return err;
}

function _isValid(attribute, value) {
  if (allowedAttributes[attribute] === 'string') {
    return typeof value === 'string' || typeof value === 'number';
  } else if (allowedAttributes[attribute] === 'boolean') {
    return String(value) === 'true' || String(value) === 'false';
  }

  return false;
}

module.exports = attributeValidationError;

},{"../../lib/braintree-error":91,"../shared/constants":74,"../shared/errors":75}],68:[function(_dereq_,module,exports){
'use strict';

var constants = _dereq_('../shared/constants');
var useMin = _dereq_('../../lib/use-min');

module.exports = function composeUrl(assetsUrl, componentId, isDebug) {
  return assetsUrl +
    '/web/' +
    constants.VERSION +
    '/html/hosted-fields-frame' + useMin(isDebug) + '.html#' +
    componentId;
};

},{"../../lib/use-min":128,"../shared/constants":74}],69:[function(_dereq_,module,exports){
(function (global){
'use strict';

var allowedStyles = _dereq_('../shared/constants').allowedStyles;

module.exports = function getStylesFromClass(cssClass) {
  var element = document.createElement('input');
  var styles = {};
  var computedStyles;

  if (cssClass[0] === '.') {
    cssClass = cssClass.substring(1);
  }

  element.className = cssClass;
  element.style.display = 'none !important';
  element.style.position = 'fixed !important';
  element.style.left = '-99999px !important';
  element.style.top = '-99999px !important';
  global.document.body.appendChild(element);

  computedStyles = global.getComputedStyle(element);

  allowedStyles.forEach(function (style) {
    var value = computedStyles[style];

    if (value) {
      styles[style] = value;
    }
  });

  global.document.body.removeChild(element);

  return styles;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../shared/constants":74}],70:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../../lib/assign').assign;
var createAssetsUrl = _dereq_('../../lib/create-assets-url');
var Destructor = _dereq_('../../lib/destructor');
var classList = _dereq_('@braintree/class-list');
var iFramer = _dereq_('@braintree/iframer');
var Bus = _dereq_('../../lib/bus');
var createDeferredClient = _dereq_('../../lib/create-deferred-client');
var BraintreeError = _dereq_('../../lib/braintree-error');
var composeUrl = _dereq_('./compose-url');
var getStylesFromClass = _dereq_('./get-styles-from-class');
var constants = _dereq_('../shared/constants');
var errors = _dereq_('../shared/errors');
var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;
var uuid = _dereq_('../../lib/vendor/uuid');
var findParentTags = _dereq_('../shared/find-parent-tags');
var browserDetection = _dereq_('../shared/browser-detection');
var events = constants.events;
var EventEmitter = _dereq_('../../lib/event-emitter');
var injectFrame = _dereq_('./inject-frame');
var analytics = _dereq_('../../lib/analytics');
var allowedFields = constants.allowedFields;
var methods = _dereq_('../../lib/methods');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var sharedErrors = _dereq_('../../lib/errors');
var getCardTypes = _dereq_('../shared/get-card-types');
var attributeValidationError = _dereq_('./attribute-validation-error');
var Promise = _dereq_('../../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @typedef {object} HostedFields~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
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
 * @property {object} fields
 * @property {?HostedFields~hostedFieldsFieldData} fields.number {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the number field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.cvv {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the CVV field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationDate {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration date field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationMonth {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration month field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationYear {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration year field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.postalCode {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the postal code field, if it is present.
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
 * @description Subscribes a handler function to a named event. `event` should be {@link HostedFields#event:blur|blur}, {@link HostedFields#event:focus|focus}, {@link HostedFields#event:empty|empty}, {@link HostedFields#event:notEmpty|notEmpty}, {@link HostedFields#event:cardTypeChange|cardTypeChange}, or {@link HostedFields#event:validityChange|validityChange}. Events will emit a {@link HostedFields~stateObject|stateObject}.
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

    if (eventData.type === 'blur') {
      performBlurFixForIos(container);
    }

    classList.toggle(container, constants.externalClasses.FOCUSED, field.isFocused);
    classList.toggle(container, constants.externalClasses.VALID, field.isValid);
    classList.toggle(container, constants.externalClasses.INVALID, !field.isPotentiallyValid);

    this._state = { // eslint-disable-line no-invalid-this
      cards: merchantPayload.cards,
      fields: merchantPayload.fields
    };

    this._emit(eventData.type, merchantPayload); // eslint-disable-line no-invalid-this
  };
}

// iOS Safari has a bug where inputs in iframes
// will not dismiss the keyboard when they lose
// focus. We create a hidden button input that we
// can focus on and blur to force the keyboard to
// dismiss. See #229
function performBlurFixForIos(container) {
  var hiddenInput;

  if (!browserDetection.isIos()) {
    return;
  }

  if (document.activeElement === document.body) {
    hiddenInput = container.querySelector('input');

    if (!hiddenInput) {
      hiddenInput = document.createElement('input');

      hiddenInput.type = 'button';
      hiddenInput.style.height = '0px';
      hiddenInput.style.width = '0px';
      hiddenInput.style.opacity = '0';
      hiddenInput.style.padding = '0';
      hiddenInput.style.position = 'absolute';
      hiddenInput.style.left = '-200%';
      hiddenInput.style.top = '0px';

      container.insertBefore(hiddenInput, container.firstChild);
    }

    hiddenInput.focus();
    hiddenInput.blur();
  }
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
  var busOptions = assign({}, options);
  var frameReadyPromiseResolveFunctions = {};
  var frameReadyPromises = [];
  var componentId = uuid();

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
    name: 'Hosted Fields'
  });

  hostedFieldsUrl = composeUrl(assetsUrl, componentId, isDebug);

  if (!options.fields || Object.keys(options.fields).length === 0) {
    throw new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.fields is required when instantiating Hosted Fields.'
    });
  }

  EventEmitter.call(this);

  this._injectedNodes = [];
  this._destructor = new Destructor();
  this._fields = fields;
  this._state = {
    fields: {},
    cards: getCardTypes('')
  };

  this._bus = new Bus({
    channel: componentId,
    merchantUrl: location.href
  });

  this._destructor.registerFunctionForTeardown(function () {
    self._bus.teardown();
  });

  analytics.sendEvent(this._clientPromise, 'custom.hosted-fields.initialized');

  Object.keys(options.fields).forEach(function (key) {
    var field, container, frame, frameReadyPromise;

    if (!constants.allowedFields.hasOwnProperty(key)) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
        message: '"' + key + '" is not a valid field.'
      });
    }

    field = options.fields[key];

    container = document.querySelector(field.selector);

    if (!container) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
        message: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
        details: {
          fieldSelector: field.selector,
          fieldKey: key
        }
      });
    } else if (container.querySelector('iframe[name^="braintree-"]')) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
        code: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
        message: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
        details: {
          fieldSelector: field.selector,
          fieldKey: key
        }
      });
    }

    if (field.maxlength && typeof field.maxlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for maxlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    if (field.minlength && typeof field.minlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for minlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    frame = iFramer({
      type: key,
      name: 'braintree-hosted-field-' + key,
      style: constants.defaultIFrameStyle,
      title: 'Secure Credit Card Frame - ' + constants.allowedFields[key].label
    });

    this._injectedNodes.push.apply(this._injectedNodes, injectFrame(frame, container));
    this._setupLabelFocus(key, container);
    fields[key] = {
      frameElement: frame,
      containerElement: container
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
      container: container
    };

    setTimeout(function () {
      // Edge has an intermittent issue where
      // the iframes load, but the JavaScript
      // can't message out to the parent page.
      // We can fix this by setting the src
      // to about:blank first followed by
      // the actual source. Both instances
      // of setting the src need to be in a
      // setTimeout to work.
      if (browserDetection.isIE() || browserDetection.isEdge()) {
        frame.src = 'about:blank';
        setTimeout(function () {
          frame.src = hostedFieldsUrl;
        }, 0);
      } else {
        frame.src = hostedFieldsUrl;
      }
    }, 0);
  }.bind(this));

  if (busOptions.styles) {
    Object.keys(busOptions.styles).forEach(function (selector) {
      var className = busOptions.styles[selector];

      if (typeof className === 'string') {
        busOptions.styles[selector] = getStylesFromClass(className);
      }
    });
  }

  this._bus.on(events.READY_FOR_CLIENT, function (reply) {
    self._clientPromise.then(function (client) {
      reply(client);
    });
  });

  failureTimeout = setTimeout(function () {
    analytics.sendEvent(self._clientPromise, 'custom.hosted-fields.load.timed-out');
    self._emit('timeout');
  }, INTEGRATION_TIMEOUT_MS);

  Promise.all(frameReadyPromises).then(function (results) {
    var reply = results[0];

    clearTimeout(failureTimeout);
    reply(busOptions);
    self._emit('ready');
  });

  this._bus.on(events.FRAME_READY, function (data, reply) {
    frameReadyPromiseResolveFunctions[data.field](reply);
  });

  this._bus.on(
    events.INPUT_EVENT,
    createInputEventHandler(fields).bind(this)
  );

  this._destructor.registerFunctionForTeardown(function () {
    var j, node, parent;

    for (j = 0; j < self._injectedNodes.length; j++) {
      node = self._injectedNodes[j];
      parent = node.parentNode;

      parent.removeChild(node);

      classList.remove(
        parent,
        constants.externalClasses.FOCUSED,
        constants.externalClasses.INVALID,
        constants.externalClasses.VALID
      );
    }
  });

  this._destructor.registerFunctionForTeardown(function () {
    var methodNames = methods(HostedFields.prototype).concat(methods(EventEmitter.prototype));

    convertMethodsToError(self, methodNames);
  });
}

HostedFields.prototype = Object.create(EventEmitter.prototype, {
  constructor: HostedFields
});

HostedFields.prototype._setupLabelFocus = function (type, container) {
  var labels, i;
  var shouldSkipLabelFocus = browserDetection.isIos();
  var bus = this._bus;

  if (shouldSkipLabelFocus) { return; }
  if (container.id == null) { return; }

  function triggerFocus() {
    bus.emit(events.TRIGGER_INPUT_FOCUS, type);
  }

  labels = Array.prototype.slice.call(document.querySelectorAll('label[for="' + container.id + '"]'));
  labels = labels.concat(findParentTags(container, 'label'));

  for (i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', triggerFocus, false);
  }

  this._destructor.registerFunctionForTeardown(function () {
    for (i = 0; i < labels.length; i++) {
      labels[i].removeEventListener('click', triggerFocus, false);
    }
  });
};

HostedFields.prototype._attachInvalidFieldContainersToError = function (err) {
  if (!(err.details && err.details.invalidFieldKeys && err.details.invalidFieldKeys.length > 0)) {
    return;
  }
  err.details.invalidFields = {};
  err.details.invalidFieldKeys.forEach(function (field) {
    err.details.invalidFields[field] = this._fields[field].containerElement;
  }.bind(this));
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.teardown = function () {
  var self = this;

  return new Promise(function (resolve, reject) {
    self._destructor.teardown(function (err) {
      analytics.sendEvent(self._clientPromise, 'custom.hosted-fields.teardown-completed');

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
 * @param {boolean} [options.vault=false] When true, will vault the tokenized card. Cards will only be vaulted when using a client created with a client token that includes a customer ID.
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
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link HostedFields~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a function that resolves with a {@link HostedFields~tokenizePayload|tokenizePayload}.
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
 *         // you can also programtically access the field containers for the invalid fields
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
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.fail_on_duplicate_payment_method
 *         console.error('This payment method already exists in your vault.');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the verify card option is set to true
 *         //     and you have credit card verification turned on in the Braintree
 *         //     control panel
 *         //   * the cvv does not pass verfication (https://developers.braintreepayments.com/reference/general/testing/#avs-and-cvv/cid-responses)
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.verify_card
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
 * @example <caption>Tokenize a card with cardholder name</caption>
 * hostedFieldsInstance.tokenize({
 *   cardholderName: 'First Last'
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with the postal code option</caption>
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
 *     // https://developers.braintreepayments.com/reference/general/countries/ruby#list-of-countries
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.addClass = function (field, classname) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when adding a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot add class to "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.ADD_CLASS, field, classname);
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeClass = function (field, classname) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when removing a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove class from "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.REMOVE_CLASS, field, classname);
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setAttribute = function (options) {
  var attributeErr, err;

  if (!allowedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when setting an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot set attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute, options.value);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.SET_ATTRIBUTE, options.field, options.attribute, options.value);
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets a visually hidden message (for screenreaders) on a {@link module:braintree-web/hosted-fields~field field}.
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
  this._bus.emit(events.SET_MESSAGE, options.field, options.message);
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeAttribute = function (options) {
  var attributeErr, err;

  if (!allowedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when removing an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.REMOVE_ATTRIBUTE, options.field, options.attribute);
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setPlaceholder = function (field, placeholder) {
  return this.setAttribute({
    field: field,
    attribute: 'placeholder',
    value: placeholder
  });
};

/**
 * Clear the value of a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you wish to clear. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field cleared successfully.
 * @returns {Promise|void} Returns a promise if no callback is provided.
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
      message: '"' + field + '" is not a valid field. You must use a valid field option when clearing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot clear "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.CLEAR_FIELD, field);
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
 *   // In Mobile Safari, the focus method is unable to
 *   //   programatically open the keyboard, as only
 *   //   touch events are allowed to do so.
 *   e.preventDefault();
 *   hostedFieldsInstance.focus('number');
 * });
 */
HostedFields.prototype.focus = function (field) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when focusing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot focus "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.TRIGGER_INPUT_FOCUS, field);
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

module.exports = wrapPromise.wrapPrototype(HostedFields);

},{"../../lib/analytics":86,"../../lib/assign":88,"../../lib/braintree-error":91,"../../lib/bus":94,"../../lib/constants":96,"../../lib/convert-methods-to-error":97,"../../lib/create-assets-url":99,"../../lib/create-deferred-client":101,"../../lib/destructor":103,"../../lib/errors":105,"../../lib/event-emitter":106,"../../lib/methods":124,"../../lib/promise":126,"../../lib/vendor/uuid":130,"../shared/browser-detection":73,"../shared/constants":74,"../shared/errors":75,"../shared/find-parent-tags":76,"../shared/get-card-types":77,"./attribute-validation-error":67,"./compose-url":68,"./get-styles-from-class":69,"./inject-frame":71,"@braintree/class-list":17,"@braintree/iframer":18,"@braintree/wrap-promise":25}],71:[function(_dereq_,module,exports){
'use strict';

module.exports = function injectFrame(frame, container) {
  var clearboth = document.createElement('div');
  var fragment = document.createDocumentFragment();

  clearboth.style.clear = 'both';

  fragment.appendChild(frame);
  fragment.appendChild(clearboth);

  container.appendChild(fragment);

  return [frame, clearboth];
};

},{}],72:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/hosted-fields */

var HostedFields = _dereq_('./external/hosted-fields');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var errors = _dereq_('./shared/errors');
var supportsInputFormatting = _dereq_('restricted-input/supports-input-formatting');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var BraintreeError = _dereq_('../lib/braintree-error');
var Promise = _dereq_('../lib/promise');
var VERSION = "3.42.0";

/**
 * Fields used in {@link module:braintree-web/hosted-fields~fieldOptions fields options}
 * @typedef {object} field
 * @property {string} selector A CSS selector to find the container where the hosted field will be inserted.
 * @property {string} [placeholder] Will be used as the `placeholder` attribute of the input. If `placeholder` is not natively supported by the browser, it will be polyfilled.
 * @property {string} [type] Will be used as the `type` attribute of the input. To mask `cvv` input, for instance, `type: "password"` can be used.
 * @property {boolean} [formatInput=true] Enable or disable automatic formatting on this field.
 * @property {object|boolean} [maskInput=false] Enable or disable input masking when input is not focused. If set to `true` instead of an object, the defaults for the `maskInput` parameters will be used.
 * @property {string} [maskInput.character=•] The character to use when masking the input. The default character ('•') uses a unicode symbol, so the webpage must support UTF-8 characters when using the default.
 * @property {Boolean} [maskInput.showLastFour=false] Only applicable for the credit card field. Whether or not to show the last 4 digits of the card when masking.
 * @property {object|boolean} [select] If truthy, this field becomes a `<select>` dropdown list. This can only be used for `expirationMonth` and `expirationYear` fields. If you do not use a `placeholder` property for the field, the current month/year will be the default selected value.
 * @property {string[]} [select.options] An array of 12 strings, one per month. This can only be used for the `expirationMonth` field. For example, the array can look like `['01 - January', '02 - February', ...]`.
 * @property {number} [maxCardLength] This option applies only to the number field. Allows a limit to the length of the card number, even if the card brand may support numbers of a greater length. If the value passed is greater than the max length for a card brand, the smaller number of the 2 values will be used. For example, is `maxCardLength` is set to 16, but an American Express card is entered (which has a max card length of 15), a max card length of 15 will be used.
 * @property {number} [maxlength] This option applies only to the CVV and postal code fields. Will be used as the `maxlength` attribute of the input if it is less than the default. The primary use cases for the `maxlength` option are: limiting the length of the CVV input for CVV-only verifications when the card type is known and limiting the length of the postal code input when cards are coming from a known region.
 * @property {number} [minlength=3] This option applies only to the cvv and postal code fields. Will be used as the `minlength` attribute of the input.
 * For postal code fields, the default value is 3, representing the Icelandic postal code length. This option's primary use case is to increase the `minlength`, e.g. for US customers, the postal code `minlength` can be set to 5.
 * For cvv fields, the default value is 3. The `minlength` attribute only applies to integrations capturing a cvv without a number field.
 * @property {string} [prefill] A value to prefill the field with. For example, when creating an update card form, you can prefill the expiration date fields with the old expiration date data.
 * @property {boolean} [rejectUnsupportedCards=false] Only allow card types that your merchant account is able to process. Unsupported card types will invalidate the card form. e.g. if you only process Visa cards, a customer entering a American Express card would get an invalid card field. This can only be used for the `number` field.
 */

/**
 * An object that has {@link module:braintree-web/hosted-fields~field field objects} for each field. Used in {@link module:braintree-web/hosted-fields~create create}.
 * @typedef {object} fieldOptions
 * @property {field} [number] A field for card number.
 * @property {field} [expirationDate] A field for expiration date in `MM/YYYY` format. This should not be used with the `expirationMonth` and `expirationYear` properties.
 * @property {field} [expirationMonth] A field for expiration month in `MM` format. This should be used with the `expirationYear` property.
 * @property {field} [expirationYear] A field for expiration year in `YYYY` format. This should be used with the `expirationMonth` property.
 * @property {field} [cvv] A field for 3 or 4 digit card verification code (like CVV or CID). If you wish to create a CVV-only payment method nonce to verify a card already stored in your Vault, omit all other fields to only collect CVV.
 * @property {field} [postalCode] A field for postal or region code.
 */

/**
 * An object that represents CSS that will be applied in each hosted field. This object looks similar to CSS. Typically, these styles involve fonts (such as `font-family` or `color`).
 *
 * You may also pass the name of a class on your site that contains the styles you would like to apply. The style properties will be automatically pulled off the class and applied to the Hosted Fields inputs. Note: this is recomended for `input` elements only. If using a `select` for the expiration date, unexpected styling may occur.
 *
 * These are the CSS properties that Hosted Fields supports. Any other CSS should be specified on your page and outside of any Braintree configuration. Trying to set unsupported properties will fail and put a warning in the console.
 *
 * Supported CSS properties are:
 * `appearance`
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
 * `padding`
 * `text-shadow`
 * `transition`
 * `-moz-appearance`
 * `-moz-osx-font-smoothing`
 * `-moz-tap-highlight-color`
 * `-moz-transition`
 * `-webkit-appearance`
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
 *       selector: '#card-number'
 *     },
 *     cvv: {
 *       selector: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       selector: '#expiration-date',
 *       type: 'month'
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
 *       selector: '#card-number'
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
 *       selector: '#card-number',
 *       // Credit card formatting is not currently supported
 *       // with RTL languages, so we need to turn it off for the number input
 *       formatInput: false
 *     },
 *     cvv: {
 *       selector: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       selector: '#expiration-date',
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
 *       selector: '#cvv',
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
 *       selector: '#expiration-month',
 *       prefill: storedCreditCardInformation.month
 *     },
 *     expirationYear: {
 *       selector: '#expiration-year',
 *       prefill: storedCreditCardInformation.year
 *     }
 *   }
 * }, callback);
 * @example <caption>Validate the card form for supported card types</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     number: {
 *       selector: '#card-number',
 *       rejectUnsupportedCards: true
 *     },
 *     cvv: {
 *       selector: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       selector: '#expiration-date',
 *       type: 'month'
 *     }
 *   },
 * }, callback);
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'Hosted Fields',
    authorization: options.authorization,
    client: options.client
  }).then(function () {
    var integration = new HostedFields(options);

    return new Promise(function (resolve, reject) {
      integration.on('ready', function () {
        resolve(integration);
      });
      integration.on('timeout', function () {
        reject(new BraintreeError(errors.HOSTED_FIELDS_TIMEOUT));
      });
    });
  });
}

module.exports = {
  /**
   * @static
   * @function supportsInputFormatting
   * @description Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true. For a list of unsupported browsers, [go here](https://github.com/braintree/restricted-input/blob/master/README.md#browsers-where-formatting-is-turned-off-automatically).
   * @returns {Boolean} Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true.
   * @example
   * <caption>Conditionally choosing split expiration date inputs if formatting is unavailable</caption>
   * var canFormat = braintree.hostedFields.supportsInputFormatting();
   * var fields = {
   *   number: {
   *     selector: '#card-number'
   *   },
   *   cvv: {
   *     selector: '#cvv'
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
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/promise":126,"./external/hosted-fields":70,"./shared/errors":75,"@braintree/wrap-promise":25,"restricted-input/supports-input-formatting":30}],73:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  isIE: _dereq_('@braintree/browser-detection/is-ie'),
  isEdge: _dereq_('@braintree/browser-detection/is-edge'),
  isIe9: _dereq_('@braintree/browser-detection/is-ie9'),
  isIos: _dereq_('@braintree/browser-detection/is-ios'),
  isIosWebview: _dereq_('@braintree/browser-detection/is-ios-webview')
};

},{"@braintree/browser-detection/is-edge":5,"@braintree/browser-detection/is-ie":6,"@braintree/browser-detection/is-ie9":8,"@braintree/browser-detection/is-ios":13,"@braintree/browser-detection/is-ios-webview":11}],74:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable no-reserved-keys */

var enumerate = _dereq_('../../lib/enumerate');
var errors = _dereq_('./errors');
var VERSION = "3.42.0";

var constants = {
  VERSION: VERSION,
  maxExpirationYearAge: 19,
  externalEvents: {
    FOCUS: 'focus',
    BLUR: 'blur',
    EMPTY: 'empty',
    NOT_EMPTY: 'notEmpty',
    VALIDITY_CHANGE: 'validityChange',
    CARD_TYPE_CHANGE: 'cardTypeChange'
  },
  defaultMaxLengths: {
    number: 19,
    postalCode: 8,
    expirationDate: 7,
    expirationMonth: 2,
    expirationYear: 4,
    cvv: 3
  },
  externalClasses: {
    FOCUSED: 'braintree-hosted-fields-focused',
    INVALID: 'braintree-hosted-fields-invalid',
    VALID: 'braintree-hosted-fields-valid'
  },
  defaultIFrameStyle: {
    border: 'none',
    width: '100%',
    height: '100%',
    'float': 'left'
  },
  tokenizationErrorCodes: {
    81724: errors.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
    81736: errors.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED
  },
  allowedStyles: [
    '-moz-appearance',
    '-moz-osx-font-smoothing',
    '-moz-tap-highlight-color',
    '-moz-transition',
    '-webkit-appearance',
    '-webkit-font-smoothing',
    '-webkit-tap-highlight-color',
    '-webkit-transition',
    'appearance',
    'color',
    'direction',
    'font',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-variant-alternates',
    'font-variant-caps',
    'font-variant-east-asian',
    'font-variant-ligatures',
    'font-variant-numeric',
    'font-weight',
    'letter-spacing',
    'line-height',
    'padding',
    'opacity',
    'outline',
    'text-shadow',
    'transition'
  ],
  allowedFields: {
    number: {
      name: 'credit-card-number',
      label: 'Credit Card Number'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV'
    },
    expirationDate: {
      name: 'expiration',
      label: 'Expiration Date'
    },
    expirationMonth: {
      name: 'expiration-month',
      label: 'Expiration Month'
    },
    expirationYear: {
      name: 'expiration-year',
      label: 'Expiration Year'
    },
    postalCode: {
      name: 'postal-code',
      label: 'Postal Code'
    }
  },
  allowedAttributes: {
    'aria-invalid': 'boolean',
    'aria-required': 'boolean',
    disabled: 'boolean',
    placeholder: 'string'
  },
  autocompleteMappings: {
    'credit-card-number': 'cc-number',
    expiration: 'cc-exp',
    'expiration-month': 'cc-exp-month',
    'expiration-year': 'cc-exp-year',
    cvv: 'cc-csc',
    'postal-code': 'billing postal-code'
  }
};

constants.events = enumerate([
  'READY_FOR_CLIENT',
  'FRAME_READY',
  'VALIDATE_STRICT',
  'CONFIGURATION',
  'TOKENIZATION_REQUEST',
  'INPUT_EVENT',
  'TRIGGER_INPUT_FOCUS',
  'ADD_CLASS',
  'REMOVE_CLASS',
  'SET_ATTRIBUTE',
  'REMOVE_ATTRIBUTE',
  'CLEAR_FIELD',
  'AUTOFILL_EXPIRATION_DATE',
  'SET_MESSAGE'
], 'hosted-fields:');

module.exports = constants;

},{"../../lib/enumerate":104,"./errors":75}],75:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Hosted Fields - Creation Error Codes
 * @description Errors that occur when [creating the Hosted Fields component](/current/module-braintree-web_hosted-fields.html#.create).
 * @property {UNKNOWN} HOSTED_FIELDS_TIMEOUT Occurs when Hosted Fields does not finish setting up within 60 seconds.
 * @property {MERCHANT} HOSTED_FIELDS_INVALID_FIELD_KEY Occurs when Hosted Fields is instantated with an invalid Field option.
 * @property {MERCHANT} HOSTED_FIELDS_INVALID_FIELD_SELECTOR Occurs when Hosted Fields given a field selector that is not valid.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME Occurs when Hosted Fields given a field selector that already contains an iframe.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_PROPERTY_INVALID Occurs when a field configuration option is not valid.
 */

/**
 * @name BraintreeError.Hosted Fields - Field Manipulation Error Codes
 * @description Errors that occur when modifying fields through [`addClass`](/current/HostedFields.html#addClass), [`removeClass`](/current/HostedFields.html#removeClass), [`setAttribute`](/current/HostedFields.html#setAttribute), [`removeAttribute`](/current/HostedFields.html#removeAttribute), [`clear`](/current/HostedFields.html#clear), and [`focus`](/current/HostedFields.html#focus).
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_INVALID Occurs when attempting to modify a field that is not a valid Hosted Fields option.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_NOT_PRESENT Occurs when attempting to modify a field that is not configured with Hosted Fields.
 */

/**
 * @name BraintreeError.Hosted Fields - Set Attribtue Error Codes
 * @description Errors that occur when using the [`setAttribtue` method](/current/HostedFields.html#setAttribute)
 * @property {MERCHANT} HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED Occurs when trying to set an attribtue that is not supported to be set.
 * @property {MERCHANT} HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED Occurs when the type of value for an attribue is not allowed to be set.
 */

/**
 * @name BraintreeError.Hosted Fields - Tokenize Error Codes
 * @description Errors that occur when [tokenizing the card details with Hosted Fields](/current/HostedFields.html#tokenize).
 * @property {NETWORK} HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR Occurs when the Braintree gateway cannot be contacted.
 * @property {CUSTOMER} HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE Occurs when attempting to vault a card, but the client token being used is configured to fail if the card already exists in the vault.
 * @property {CUSTOMER} HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED Occurs when cvv verification is turned on in the Braintree control panel.
 * @property {CUSTOMER} HOSTED_FIELDS_FAILED_TOKENIZATION Occurs when the credit card details were sent to Braintree, but failed to tokenize.
 * @property {CUSTOMER} HOSTED_FIELDS_FIELDS_EMPTY Occurs when all the Hosted Fields inputs are empty.
 * @property {CUSTOMER} HOSTED_FIELDS_FIELDS_INVALID Occurs when one ore more fields are invalid.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  HOSTED_FIELDS_TIMEOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'HOSTED_FIELDS_TIMEOUT',
    message: 'Hosted Fields timed out when attempting to set up.'
  },
  HOSTED_FIELDS_INVALID_FIELD_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_KEY'
  },
  HOSTED_FIELDS_INVALID_FIELD_SELECTOR: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_SELECTOR',
    message: 'Selector does not reference a valid DOM node.'
  },
  HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME',
    message: 'Element already contains a Braintree iframe.'
  },
  HOSTED_FIELDS_FIELD_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_INVALID'
  },
  HOSTED_FIELDS_FIELD_NOT_PRESENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_NOT_PRESENT'
  },
  HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR',
    message: 'A tokenization network error occurred.'
  },
  HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE',
    message: 'This credit card already exists in the merchant\'s vault.'
  },
  HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED',
    message: 'CVV verification failed during tokenization.'
  },
  HOSTED_FIELDS_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FAILED_TOKENIZATION',
    message: 'The supplied card data failed tokenization.'
  },
  HOSTED_FIELDS_FIELDS_EMPTY: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_EMPTY',
    message: 'All fields are empty. Cannot tokenize empty card fields.'
  },
  HOSTED_FIELDS_FIELDS_INVALID: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_INVALID',
    message: 'Some payment input fields are invalid. Cannot tokenize invalid card fields.'
  },
  HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED'
  },
  HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED'
  },
  HOSTED_FIELDS_FIELD_PROPERTY_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_PROPERTY_INVALID'
  }
};

},{"../../lib/braintree-error":91}],76:[function(_dereq_,module,exports){
'use strict';

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

},{}],77:[function(_dereq_,module,exports){
'use strict';

var creditCardType = _dereq_('credit-card-type');

module.exports = function (number) {
  var results = creditCardType(number);

  results.forEach(function (card) {
    // NEXT_MAJOR_VERSION credit-card-type fixed the mastercard enum
    // but we still pass master-card in the braintree API
    // in a major version bump, we can remove this and
    // this will be mastercard instead of master-card
    if (card.type === 'mastercard') {
      card.type = 'master-card';
    }
  });

  return results;
};

},{"credit-card-type":26}],78:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  MAX_TRANSACTION_STATUS_POLLING_RETRIES: 5,
  POLL_RETRY_TIME: 10000,
  REQUIRED_OPTIONS_FOR_START_PAYMENT: ['orderId', 'amount', 'currency']
};

},{}],79:[function(_dereq_,module,exports){
'use strict';

var Promise = _dereq_('../../lib/promise');
var frameService = _dereq_('../../lib/frame-service/external');
var BraintreeError = _dereq_('../../lib/braintree-error');
var convertToBraintreeError = _dereq_('../../lib/convert-to-braintree-error');
var errors = _dereq_('../shared/errors');
var VERSION = "3.42.0";
var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;
var methods = _dereq_('../../lib/methods');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var analytics = _dereq_('../../lib/analytics');
var useMin = _dereq_('../../lib/use-min');
var once = _dereq_('../../lib/once');
var deferred = _dereq_('../../lib/deferred');
var constants = _dereq_('./constants');
var events = _dereq_('../shared/events');

/**
 * @typedef {object} iDEAL~startPaymentPayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional iDEAL payment details.
 * @property {string} details.id The identifier for the iDEAL Payment.
 * @property {string} details.status The status of the iDEAL Payment.
 * @property {string} type The payment method type, always `IdealPayment`.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/ideal.create|ideal.create}
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/ideal.create|braintree.ideal.create} instead.</strong>
 * @classdesc This class represents an iDEAL component. Instances of this class have methods for launching a new window to process a transaction with iDEAL.
 */
function Ideal(options) {
  var configuration = options.client.getConfiguration();

  this._client = options.client;
  this._assetsUrl = configuration.gatewayConfiguration.ideal.assetsUrl + '/web/' + VERSION;
  this._isDebug = configuration.isDebug;
  this._idealPaymentStatus = {
    authInProgress: false,
    id: '',
    status: ''
  };
}

Ideal.prototype._initialize = function () {
  var self = this;

  var failureTimeout = setTimeout(function () {
    analytics.sendEvent(self._client, 'ideal.load.timed-out');
  }, INTEGRATION_TIMEOUT_MS);

  return this._client.request({
    api: 'braintreeApi',
    method: 'get',
    endpoint: 'issuers/ideal'
  }).then(function (response) {
    return new Promise(function (resolve) {
      frameService.create({
        name: 'braintreeideallanding',
        height: 550,
        width: 960,
        dispatchFrameUrl: self._assetsUrl + '/html/dispatch-frame' + useMin(self._isDebug) + '.html',
        openFrameUrl: self._assetsUrl + '/html/ideal-issuers-frame' + useMin(self._isDebug) + '.html',
        state: {bankData: response.data}
      }, function (service) {
        self._frameService = service;
        clearTimeout(failureTimeout);
        analytics.sendEvent(self._client, 'ideal.load.succeeded');

        self._frameService._bus.on(events.BANK_CHOSEN, self._createBankChosenHandler());
        self._frameService._bus.on(events.REDIRECT_PAGE_REACHED, self._createRedirectPageReachedHandler());

        resolve(self);
      });
    });
  });
};

/**
 * Launches the iDEAL flow and returns a nonce payload. Only one iDEAL flow should be active at a time. One way to achieve this is to disable your iDEAL button while the flow is open.
 * @public
 * @function
 * @param {object} options All options for initiating the iDEAL payment flow.
 * @param {string} options.orderId An ID supplied by the merchant for creating the iDEAL transaction.
 * @param {string} options.amount The amount to authorize for the transaction.
 * @param {string} options.currency The currency to process the payment.
 * @param {string} [options.locale=nl] An optional string to specify the locale of the bank selection window. Possible values: `nl`, `en`.
 * @param {string} [options.descriptor] An optional string that will appear on the customer's bank statement.
 * @param {function} options.onPaymentStart A function that will be called with an object containing the iDEAL Payment `id` and `status` when the customer chooses an issuing bank. You can use this hook to update your payment page.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link iDEAL~startPaymentPayload|startPaymentPayload}. If no callback is provided, the method will return a Promise that resolves with a {@link iDEAL~startPaymentPayload|startPaymentPayload}.
 * @example
 * button.addEventListener('click', function () {
 *   // Disable the button when iDEAL payment is in progress
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because startPayment opens a new window, this must be called
 *   // as a result of a user action, such as a button click.
 *   idealInstance.startPayment({
 *     orderId: 'some id',
 *     amount: '10.00',
 *     currency: 'EUR',
 *     descriptor: 'Merchant Name',
 *     onPaymentStart: function (data) {
 *       // disable payment form on the page
 *     }
 *   }).then(function (payload) {
 *     button.removeAttribute('disabled');
 *     // Submit payload.nonce to your server
 *   }).catch(function (startPaymentError) {
 *     button.removeAttribute('disabled');
 *     // Handle flow errors or premature flow closure
 *
 *     switch (startPaymentError.code) {
 *       case 'IDEAL_WINDOW_CLOSED':
 *         console.error('Customer closed iDEAL window.');
 *         break;
 *       case 'IDEAL_START_PAYMENT_FAILED':
 *         console.error('iDEAL startPayment failed. See details:', startPaymentError.details);
 *         break;
 *       default:
 *         console.error('Error!', startPaymentError);
 *     }
 *   });
 * });
 * @returns {Promise|void}
 */
Ideal.prototype.startPayment = wrapPromise(function (options) {
  var self = this; // eslint-disable-line no-invalid-this

  return new Promise(function (resolve, reject) {
    if (!options || hasMissingOption(options)) {
      reject(new BraintreeError(errors.IDEAL_START_PAYMENT_MISSING_REQUIRED_OPTION));

      return;
    }

    if (self._idealPaymentStatus.authInProgress) {
      analytics.sendEvent(self._client, 'ideal.start-payment.error.already-opened');
      reject(new BraintreeError(errors.IDEAL_PAYMENT_ALREADY_IN_PROGRESS));

      return;
    }

    self._idealPaymentStatus.authInProgress = true;
    analytics.sendEvent(self._client, 'ideal.start-payment.opened');

    self._startPaymentCallback = self._createStartPaymentCallback(resolve, reject);
    self._startPaymentOptions = options;

    self._frameService.open({
      state: {
        locale: options.locale
      }
    }, self._startPaymentCallback);
  });
});

/**
 * Closes the iDEAL window if it is open.
 * @public
 * @example
 * idealInstance.closeWindow();
 * @returns {void}
 */
Ideal.prototype.closeWindow = function () {
  if (this._idealPaymentStatus.authInProgress) {
    analytics.sendEvent(this._client, 'ideal.start-payment.closed.by-merchant');
  }
  this._frameService.close();
};

/**
 * Focuses the iDEAL window if it is open.
 * @public
 * @example
 * idealInstance.focusWindow();
 * @returns {void}
 */
Ideal.prototype.focusWindow = function () {
  this._frameService.focus();
};

Ideal.prototype._createRedirectPageReachedHandler = function () {
  var self = this;

  return function () {
    self._pollForCompleteTransactionStatus(0);
  };
};

Ideal.prototype._createStartPaymentCallback = function (resolve, reject) {
  var self = this;

  return function (err) {
    var idealPaymentId = self._idealPaymentStatus.id;
    var idealPaymentStatus = self._idealPaymentStatus.status;

    self._idealPaymentStatus.authInProgress = false;
    delete self._idealPaymentStatus.id;
    delete self._idealPaymentStatus.status;

    self._frameService.close();

    if (shouldResolveWithSuccess(err, idealPaymentStatus)) {
      analytics.sendEvent(self._client, 'ideal.start-payment.success-' + idealPaymentStatus.toLowerCase());
      resolve({
        nonce: idealPaymentId,
        type: 'IdealPayment',
        details: {
          id: idealPaymentId,
          status: idealPaymentStatus
        }
      });

      return;
    }

    if (err) {
      if (err.code === 'FRAME_SERVICE_FRAME_CLOSED') {
        analytics.sendEvent(self._client, 'ideal.start-payment.closed.by-user');
        reject(new BraintreeError(errors.IDEAL_WINDOW_CLOSED));

        return;
      } else if (err.code && err.code.indexOf('FRAME_SERVICE_FRAME_OPEN_FAILED') > -1) {
        reject(new BraintreeError({
          code: errors.IDEAL_WINDOW_OPEN_FAILED.code,
          type: errors.IDEAL_WINDOW_OPEN_FAILED.type,
          message: errors.IDEAL_WINDOW_OPEN_FAILED.message,
          details: {
            originalError: err
          }
        }));

        return;
      }

      analytics.sendEvent(self._client, 'ideal.start-payment.failed');

      reject(convertToBraintreeError(err, errors.IDEAL_START_PAYMENT_FAILED));
    } else {
      reject(new BraintreeError(errors.IDEAL_START_PAYMENT_UNEXPECTED_STATUS));
    }
  };
};

function shouldResolveWithSuccess(err, status) {
  if (err && err.code !== 'FRAME_SERVICE_FRAME_CLOSED') {
    return false;
  }

  return status === 'COMPLETE' || status === 'PENDING';
}

Ideal.prototype._createBankChosenHandler = function () {
  var self = this;

  return function (config) {
    var options = self._startPaymentOptions;
    var onPaymentStart;

    if (typeof options.onPaymentStart === 'function') {
      onPaymentStart = once(deferred(options.onPaymentStart));
    } else {
      onPaymentStart = function noop() {};
    }

    self._client.request({
      api: 'braintreeApi',
      method: 'post',
      data: {
        route_id: self._client.getConfiguration().gatewayConfiguration.ideal.routeId, // eslint-disable-line camelcase
        issuer: config.issuingBankId,
        order_id: options.orderId, // eslint-disable-line camelcase
        amount: options.amount,
        currency: options.currency,
        descriptor: options.descriptor,
        redirect_url: self._assetsUrl + '/html/ideal-redirect-frame.html' // eslint-disable-line camelcase
      },
      endpoint: 'ideal-payments'
    }).then(function (response) {
      onPaymentStart({
        id: response.data.id,
        status: response.data.status
      });

      self._idealPaymentStatus.id = response.data.id;
      self._idealPaymentStatus.status = response.data.status;
      self._frameService.redirect(response.data.approval_url);
    }).catch(function (err) {
      self._idealPaymentStatus.authInProgress = false;
      self._startPaymentCallback(err);
    });
  };
};

Ideal.prototype._pollForCompleteTransactionStatus = function (retryCount) {
  var self = this;

  if (!this._idealPaymentStatus.id) {
    this._startPaymentCallback(errors.IDEAL_PAYMENT_ALREADY_IN_PROGRESS);

    return;
  }

  this._client.request({
    api: 'braintreeApi',
    method: 'get',
    endpoint: 'ideal-payments/' + this._idealPaymentStatus.id + '/status'
  }).then(function (response) {
    self._idealPaymentStatus.status = response.data.status;

    if (response.data.status === 'PENDING' && retryCount < constants.MAX_TRANSACTION_STATUS_POLLING_RETRIES) {
      setTimeout(function () {
        self._pollForCompleteTransactionStatus(retryCount + 1);
      }, constants.POLL_RETRY_TIME);
    } else if (response.data.status === 'COMPLETE' || response.data.status === 'PENDING') {
      self._startPaymentCallback();
    } else {
      self._startPaymentCallback(new BraintreeError({
        code: errors.IDEAL_PAYMENT_NOT_COMPLETE_OR_PENDING.code,
        type: errors.IDEAL_PAYMENT_NOT_COMPLETE_OR_PENDING.type,
        message: 'Transaction is not complete. It has a status of: ' + response.data.status
      }));
    }
  }).catch(self._startPaymentCallback);
};

function hasMissingOption(options) {
  var i, option;

  for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_START_PAYMENT.length; i++) {
    option = constants.REQUIRED_OPTIONS_FOR_START_PAYMENT[i];

    if (!options.hasOwnProperty(option)) {
      return true;
    }
  }

  return false;
}

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/ideal.create|create}.
 * @public
 * @function
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @returns {Promise|void} If no callback is provided, returns a promise.
 */
Ideal.prototype.teardown = wrapPromise(function () {
  var self = this; // eslint-disable-line no-invalid-this

  self._frameService.teardown();

  convertMethodsToError(self, methods(Ideal.prototype));

  analytics.sendEvent(self._client, 'ideal.teardown-completed');

  return Promise.resolve();
});

module.exports = Ideal;

},{"../../lib/analytics":86,"../../lib/braintree-error":91,"../../lib/constants":96,"../../lib/convert-methods-to-error":97,"../../lib/convert-to-braintree-error":98,"../../lib/deferred":102,"../../lib/frame-service/external":109,"../../lib/methods":124,"../../lib/once":125,"../../lib/promise":126,"../../lib/use-min":128,"../shared/errors":82,"../shared/events":83,"./constants":78,"@braintree/wrap-promise":25}],80:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/ideal */

var BraintreeError = _dereq_('../lib/braintree-error');
var browserDetection = _dereq_('./shared/browser-detection');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var Ideal = _dereq_('./external/ideal');
var VERSION = "3.42.0";
var errors = _dereq_('./shared/errors');
var sharedErrors = _dereq_('../lib/errors');
var analytics = _dereq_('../lib/analytics');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} [callback] The second argument, `data`, is the {@link Ideal} instance. If no callback is passed in, the create function returns a promise that resolves the {@link Ideal} instance.
 * @example
 * braintree.ideal.create({
 *   client: clientInstance
 * }, function (createErr, idealInstance) {
 *   if (createErr) {
 *     if (createErr.code === 'IDEAL_BROWSER_NOT_SUPPORTED') {
 *       console.error('This browser is not supported.');
 *     } else {
 *       console.error('Error!', createErr);
 *     }
 *     return;
 *   }
 * });
 * @returns {Promise|void} Resolves with the iDEAL Payment instance.
 */
function create(options) {
  var name = 'iDEAL';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var idealInstance, configuration;

    if (!browserDetection.supportsPopups()) {
      return Promise.reject(new BraintreeError(errors.IDEAL_BROWSER_NOT_SUPPORTED));
    }

    options.client = client;
    configuration = options.client.getConfiguration().gatewayConfiguration;
    if (!configuration.braintreeApi) {
      return Promise.reject(new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED));
    } else if (!configuration.ideal) {
      return Promise.reject(new BraintreeError(errors.IDEAL_NOT_ENABLED));
    }

    analytics.sendEvent(options.client, 'ideal.initialization');
    idealInstance = new Ideal(options);

    return idealInstance._initialize();
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/errors":105,"../lib/promise":126,"./external/ideal":79,"./shared/browser-detection":81,"./shared/errors":82,"@braintree/wrap-promise":25}],81:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  supportsPopups: _dereq_('@braintree/browser-detection/supports-popups')
};

},{"@braintree/browser-detection/supports-popups":16}],82:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  IDEAL_BROWSER_NOT_SUPPORTED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'IDEAL_BROWSER_NOT_SUPPORTED',
    message: 'Browser is not supported.'
  },
  IDEAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'IDEAL_NOT_ENABLED',
    message: 'iDEAL is not enabled for this merchant.'
  },
  IDEAL_PAYMENT_ALREADY_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'IDEAL_PAYMENT_ALREADY_IN_PROGRESS',
    message: 'iDEAL payment is already in progress.'
  },
  IDEAL_PAYMENT_NOT_COMPLETE_OR_PENDING: {
    code: 'IDEAL_PAYMENT_NOT_COMPLETE_OR_PENDING',
    type: BraintreeError.types.CUSTOMER
  },
  IDEAL_WINDOW_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'IDEAL_WINDOW_CLOSED',
    message: 'Customer closed iDEAL window before authorizing.'
  },
  IDEAL_WINDOW_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'IDEAL_WINDOW_OPEN_FAILED',
    message: 'iDEAL window failed to open; make sure startPayment was called in response to a user action.'
  },
  IDEAL_START_PAYMENT_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'IDEAL_START_PAYMENT_FAILED',
    message: 'iDEAL startPayment failed.'
  },
  IDEAL_START_PAYMENT_UNEXPECTED_STATUS: {
    type: BraintreeError.types.INTERNAL,
    code: 'IDEAL_START_PAYMENT_UNEXPECTED_STATUS',
    message: 'iDEAL startPayment returned an unexpected status without an error.'
  },
  IDEAL_START_PAYMENT_MISSING_REQUIRED_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'IDEAL_START_PAYMENT_MISSING_REQUIRED_OPTION',
    message: 'Missing required option for startPayment.'
  }
};


},{"../../lib/braintree-error":91}],83:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');

module.exports = enumerate([
  'BANK_CHOSEN',
  'REDIRECT_PAGE_REACHED'
], 'ideal:');

},{"../../lib/enumerate":104}],84:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web
 * @description This is the top-level module exported by the Braintree JavaScript SDK. In a browser environment, this will be the global <code>braintree</code> object. In a CommonJS environment (like Browserify or Webpack), it will be the default export of the <code>braintree-web</code> package. In AMD environments (like RequireJS), it can be `require`d like other modules.
 * @example
 * <caption>CommonJS</caption>
 * var braintree = require('braintree-web');
 *
 * braintree.client.create(...);
 * @example
 * <caption>In the browser</caption>
 * <script src="https://js.braintreegateway.com/web/{@pkg version}/js/client.min.js"></script>
 * <script>
 *   window.braintree.client.create(...);
 * </script>
 * @example
 * <caption>AMD</caption>
 * // main.js
 * require.config({
 *   paths: {
 *     braintreeClient: 'https://js.braintreegateway.com/web/{@pkg version}/js/client.min'
 *   }
 * });
 *
 * require(['braintreeClient'], function (braintreeClient) {
 *   braintreeClient.create(...);
 * });
 */

/**
 * @global
 * @callback callback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {?any} [data] The successful result of the asynchronous function call (if data exists).
 * @description The Node.js-style callback pattern used throughout the SDK.
 * @returns {void}
 */

var americanExpress = _dereq_('./american-express');
var applePay = _dereq_('./apple-pay');
var client = _dereq_('./client');
var dataCollector = _dereq_('./data-collector');
var hostedFields = _dereq_('./hosted-fields');
var ideal = _dereq_('./ideal');
var localPayment = _dereq_('./local-payment');
var masterpass = _dereq_('./masterpass');
var paymentRequest = _dereq_('./payment-request');
var paypal = _dereq_('./paypal');
var paypalCheckout = _dereq_('./paypal-checkout');
var googlePayment = _dereq_('./google-payment');
var threeDSecure = _dereq_('./three-d-secure');
var unionpay = _dereq_('./unionpay');
var usBankAccount = _dereq_('./us-bank-account');
var vaultManager = _dereq_('./vault-manager');
var venmo = _dereq_('./venmo');
var visaCheckout = _dereq_('./visa-checkout');
var VERSION = "3.42.0";

module.exports = {
  /** @type {module:braintree-web/american-express} */
  americanExpress: americanExpress,
  /** @type {module:braintree-web/apple-pay} */
  applePay: applePay,
  /** @type {module:braintree-web/client} */
  client: client,
  /** @type {module:braintree-web/data-collector} */
  dataCollector: dataCollector,
  /** @type {module:braintree-web/hosted-fields} */
  hostedFields: hostedFields,
  /** @type {module:braintree-web/ideal} */
  ideal: ideal,
  /** @type {module:braintree-web/local-payment} */
  localPayment: localPayment,
  /** @type {module:braintree-web/masterpass} */
  masterpass: masterpass,
  /** @type {module:braintree-web/google-payment} */
  googlePayment: googlePayment,
  /** @type {module:braintree-web/payment-request} */
  paymentRequest: paymentRequest,
  /** @type {module:braintree-web/paypal} */
  paypal: paypal,
  /** @type {module:braintree-web/paypal-checkout} */
  paypalCheckout: paypalCheckout,
  /** @type {module:braintree-web/three-d-secure} */
  threeDSecure: threeDSecure,
  /** @type {module:braintree-web/unionpay} */
  unionpay: unionpay,
  /** @type {module:braintree-web/us-bank-account} */
  usBankAccount: usBankAccount,
  /** @type {module:braintree-web/vault-manager} */
  vaultManager: vaultManager,
  /** @type {module:braintree-web/venmo} */
  venmo: venmo,
  /** @type {module:braintree-web/visa-checkout} */
  visaCheckout: visaCheckout,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"./american-express":33,"./apple-pay":36,"./client":42,"./data-collector":61,"./google-payment":66,"./hosted-fields":72,"./ideal":80,"./local-payment":133,"./masterpass":136,"./payment-request":141,"./paypal":148,"./paypal-checkout":145,"./three-d-secure":152,"./unionpay":156,"./us-bank-account":162,"./vault-manager":165,"./venmo":167,"./visa-checkout":174}],85:[function(_dereq_,module,exports){
'use strict';

var createAuthorizationData = _dereq_('./create-authorization-data');
var jsonClone = _dereq_('./json-clone');
var constants = _dereq_('./constants');

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

},{"./constants":96,"./create-authorization-data":100,"./json-clone":123}],86:[function(_dereq_,module,exports){
'use strict';

var Promise = _dereq_('./promise');
var constants = _dereq_('./constants');
var addMetadata = _dereq_('./add-metadata');

function _millisToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function sendAnalyticsEvent(clientInstanceOrPromise, kind, callback) {
  var timestamp = _millisToSeconds(Date.now());

  return Promise.resolve(clientInstanceOrPromise).then(function (client) {
    var timestampInPromise = _millisToSeconds(Date.now());
    var configuration = client.getConfiguration();
    var request = client._request;
    var url = configuration.gatewayConfiguration.analytics.url;
    var data = {
      analytics: [{
        kind: constants.ANALYTICS_PREFIX + kind,
        isAsync: timestampInPromise !== timestamp,
        timestamp: timestamp
      }]
    };

    request({
      url: url,
      method: 'post',
      data: addMetadata(configuration, data),
      timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
    }, callback);
  });
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};

},{"./add-metadata":85,"./constants":96,"./promise":126}],87:[function(_dereq_,module,exports){
'use strict';

var loadScript = _dereq_('@braintree/asset-loader/load-script');

module.exports = {
  loadScript: loadScript
};

},{"@braintree/asset-loader/load-script":2}],88:[function(_dereq_,module,exports){
'use strict';

var assignNormalized = typeof Object.assign === 'function' ? Object.assign : assignPolyfill;

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
  _assign: assignPolyfill
};

},{}],89:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var sharedErrors = _dereq_('./errors');
var VERSION = "3.42.0";

function basicComponentVerification(options) {
  var client, authorization, name;

  if (!options) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.type,
      code: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.code,
      message: 'Options must be passed to basicComponentVerification function.'
    }));
  }

  name = options.name;
  client = options.client;
  authorization = options.authorization;

  if (client == null && authorization == null) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      // NEXT_MAJOR_VERSION in major version, we expose passing in authorization for all components
      // instead of passing in a client instance. Leave this a silent feature for now.
      message: 'options.client is required when instantiating ' + name + '.'
    }));
  }

  if (!authorization && client.getVersion() !== VERSION) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + client.getVersion() + ') and ' + name + ' (version ' + VERSION + ') components must be from the same SDK version.'
    }));
  }

  return Promise.resolve();
}

module.exports = {
  verify: basicComponentVerification
};

},{"./braintree-error":91,"./errors":105,"./promise":126}],90:[function(_dereq_,module,exports){
'use strict';

var once = _dereq_('./once');

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

},{"./once":125}],91:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('./enumerate');

/**
 * @class
 * @global
 * @param {object} options Construction options
 * @classdesc This class is used to report error conditions, frequently as the first parameter to callbacks throughout the Braintree SDK.
 * @description <strong>You cannot use this constructor directly. Interact with instances of this class through {@link callback callbacks}.</strong>
 */
function BraintreeError(options) {
  if (!BraintreeError.types.hasOwnProperty(options.type)) {
    throw new Error(options.type + ' is not a valid type.');
  }

  if (!options.code) {
    throw new Error('Error code required.');
  }

  if (!options.message) {
    throw new Error('Error message required.');
  }

  this.name = 'BraintreeError';

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
  'CUSTOMER',
  'MERCHANT',
  'NETWORK',
  'INTERNAL',
  'UNKNOWN'
]);

BraintreeError.findRootError = function (err) {
  if (err instanceof BraintreeError && err.details && err.details.originalError) {
    return BraintreeError.findRootError(err.details.originalError);
  }

  return err;
};

module.exports = BraintreeError;

},{"./enumerate":104}],92:[function(_dereq_,module,exports){
'use strict';

var isVerifiedDomain = _dereq_('../is-verified-domain');

function checkOrigin(postMessageOrigin, merchantUrl) {
  var merchantOrigin, merchantHost;
  var a = document.createElement('a');

  a.href = merchantUrl;

  if (a.protocol === 'https:') {
    merchantHost = a.host.replace(/:443$/, '');
  } else if (a.protocol === 'http:') {
    merchantHost = a.host.replace(/:80$/, '');
  } else {
    merchantHost = a.host;
  }

  merchantOrigin = a.protocol + '//' + merchantHost;

  if (merchantOrigin === postMessageOrigin) { return true; }

  a.href = postMessageOrigin;

  return isVerifiedDomain(postMessageOrigin);
}

module.exports = {
  checkOrigin: checkOrigin
};

},{"../is-verified-domain":122}],93:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../enumerate');

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');

},{"../enumerate":104}],94:[function(_dereq_,module,exports){
'use strict';

var bus = _dereq_('framebus');
var events = _dereq_('./events');
var checkOrigin = _dereq_('./check-origin').checkOrigin;
var BraintreeError = _dereq_('../braintree-error');

function BraintreeBus(options) {
  options = options || {};

  this.channel = options.channel;
  if (!this.channel) {
    throw new BraintreeError({
      type: BraintreeError.types.INTERNAL,
      code: 'MISSING_CHANNEL_ID',
      message: 'Channel ID must be specified.'
    });
  }

  this.merchantUrl = options.merchantUrl;

  this._isDestroyed = false;
  this._isVerbose = false;

  this._listeners = [];

  this._log('new bus on channel ' + this.channel, [location.href]);
}

BraintreeBus.prototype.on = function (eventName, originalHandler) {
  var namespacedEvent, args;
  var handler = originalHandler;
  var self = this;

  if (this._isDestroyed) { return; }

  if (this.merchantUrl) {
    handler = function () {
      /* eslint-disable no-invalid-this */
      if (checkOrigin(this.origin, self.merchantUrl)) {
        originalHandler.apply(this, arguments);
      }
      /* eslint-enable no-invalid-this */
    };
  }

  namespacedEvent = this._namespaceEvent(eventName);
  args = Array.prototype.slice.call(arguments);
  args[0] = namespacedEvent;
  args[1] = handler;

  this._log('on', args);
  bus.on.apply(bus, args);

  this._listeners.push({
    eventName: eventName,
    handler: handler,
    originalHandler: originalHandler
  });
};

BraintreeBus.prototype.emit = function (eventName) {
  var args;

  if (this._isDestroyed) { return; }

  args = Array.prototype.slice.call(arguments);
  args[0] = this._namespaceEvent(eventName);

  this._log('emit', args);
  bus.emit.apply(bus, args);
};

BraintreeBus.prototype._offDirect = function (eventName) {
  var args = Array.prototype.slice.call(arguments);

  if (this._isDestroyed) { return; }

  args[0] = this._namespaceEvent(eventName);

  this._log('off', args);
  bus.off.apply(bus, args);
};

BraintreeBus.prototype.off = function (eventName, originalHandler) {
  var i, listener;
  var handler = originalHandler;

  if (this._isDestroyed) { return; }

  if (this.merchantUrl) {
    for (i = 0; i < this._listeners.length; i++) {
      listener = this._listeners[i];

      if (listener.originalHandler === originalHandler) {
        handler = listener.handler;
      }
    }
  }

  this._offDirect(eventName, handler);
};

BraintreeBus.prototype._namespaceEvent = function (eventName) {
  return ['braintree', this.channel, eventName].join(':');
};

BraintreeBus.prototype.teardown = function () {
  var listener, i;

  for (i = 0; i < this._listeners.length; i++) {
    listener = this._listeners[i];
    this._offDirect(listener.eventName, listener.handler);
  }

  this._listeners.length = 0;

  this._isDestroyed = true;
};

BraintreeBus.prototype._log = function (functionName, args) {
  if (this._isVerbose) {
    console.log(functionName, args); // eslint-disable-line no-console
  }
};

BraintreeBus.events = events;

module.exports = BraintreeBus;

},{"../braintree-error":91,"./check-origin":92,"./events":93,"framebus":27}],95:[function(_dereq_,module,exports){
'use strict';

// Taken from https://github.com/sindresorhus/decamelize/blob/95980ab6fb44c40eaca7792bdf93aff7c210c805/index.js
function transformKey(key) {
  return key.replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1_$2')
    .toLowerCase();
}

module.exports = function (obj) {
  return Object.keys(obj).reduce(function (newObj, key) {
    var transformedKey = transformKey(key);

    newObj[transformedKey] = obj[key];

    return newObj;
  }, {});
};

},{}],96:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.42.0";
var PLATFORM = 'web';

var CLIENT_API_URLS = {
  production: 'https://api.braintreegateway.com:443',
  sandbox: 'https://api.sandbox.braintreegateway.com:443'
};

var ASSETS_URLS = {
  production: 'https://assets.braintreegateway.com',
  sandbox: 'https://assets.braintreegateway.com'
};

var GRAPHQL_URLS = {
  production: 'https://payments.braintree-api.com/graphql',
  sandbox: 'https://payments.sandbox.braintree-api.com/graphql'
};

// endRemoveIf(production)

module.exports = {
  ANALYTICS_PREFIX: PLATFORM + '.',
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  ASSETS_URLS: ASSETS_URLS,
  CLIENT_API_URLS: CLIENT_API_URLS,
  FRAUDNET_SOURCE: 'BRAINTREE_SIGNIN',
  FRAUDNET_FNCLS: 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99',
  FRAUDNET_URL: 'https://c.paypal.com/da/r/fb.js',
  GRAPHQL_URLS: GRAPHQL_URLS,
  INTEGRATION_TIMEOUT_MS: 60000,
  VERSION: VERSION,
  INTEGRATION: 'custom',
  SOURCE: 'client',
  PLATFORM: PLATFORM,
  BRAINTREE_LIBRARY_VERSION: 'braintree/' + PLATFORM + '/' + VERSION
};

},{}],97:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var sharedErrors = _dereq_('./errors');

module.exports = function (instance, methodNames) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = function () {
      throw new BraintreeError({
        type: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
        code: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
        message: methodName + ' cannot be called after teardown.'
      });
    };
  });
};

},{"./braintree-error":91,"./errors":105}],98:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');

function convertToBraintreeError(originalErr, btErrorObject) {
  if (originalErr instanceof BraintreeError) {
    return originalErr;
  }

  return new BraintreeError({
    type: btErrorObject.type,
    code: btErrorObject.code,
    message: btErrorObject.message,
    details: {
      originalError: originalErr
    }
  });
}

module.exports = convertToBraintreeError;

},{"./braintree-error":91}],99:[function(_dereq_,module,exports){
'use strict';

// endRemoveIf(production)
var ASSETS_URLS = _dereq_('./constants').ASSETS_URLS;

function createAssetsUrl(authorization) {
  // endRemoveIf(production)

  return ASSETS_URLS.production;
}
/* eslint-enable */

module.exports = {
  create: createAssetsUrl
};

},{"./constants":96}],100:[function(_dereq_,module,exports){
'use strict';

var atob = _dereq_('../lib/vendor/polyfill').atob;
var CLIENT_API_URLS = _dereq_('../lib/constants').CLIENT_API_URLS;

function _isTokenizationKey(str) {
  return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
}

function _parseTokenizationKey(tokenizationKey) {
  var tokens = tokenizationKey.split('_');
  var environment = tokens[0];
  var merchantId = tokens.slice(2).join('_');

  return {
    merchantId: merchantId,
    environment: environment
  };
}

function createAuthorizationData(authorization) {
  var parsedClientToken, parsedTokenizationKey;
  var data = {
    attrs: {},
    configUrl: ''
  };

  if (_isTokenizationKey(authorization)) {
    parsedTokenizationKey = _parseTokenizationKey(authorization);
    data.environment = parsedTokenizationKey.environment;
    data.attrs.tokenizationKey = authorization;
    data.configUrl = CLIENT_API_URLS[parsedTokenizationKey.environment] + '/merchants/' + parsedTokenizationKey.merchantId + '/client_api/v1/configuration';
  } else {
    parsedClientToken = JSON.parse(atob(authorization));
    data.environment = parsedClientToken.environment;
    data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
    data.configUrl = parsedClientToken.configUrl;
    data.graphQL = parsedClientToken.graphQL;
  }

  return data;
}

module.exports = createAuthorizationData;

},{"../lib/constants":96,"../lib/vendor/polyfill":129}],101:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var assets = _dereq_('./assets');
var sharedErrors = _dereq_('./errors');

var VERSION = "3.42.0";

function createDeferredClient(options) {
  var promise = Promise.resolve();

  if (options.client) {
    return Promise.resolve(options.client);
  }

  if (!(global.braintree && global.braintree.client)) {
    promise = assets.loadScript({
      src: options.assetsUrl + '/web/' + VERSION + '/js/client.min.js'
    }).catch(function (err) {
      return Promise.reject(new BraintreeError({
        type: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.type,
        code: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.code,
        message: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.message,
        details: {
          originalError: err
        }
      }));
    });
  }

  return promise.then(function () {
    if (global.braintree.client.VERSION !== VERSION) {
      return Promise.reject(new BraintreeError({
        type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
        code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
        message: 'Client (version ' + global.braintree.client.VERSION + ') and ' + options.name + ' (version ' + VERSION + ') components must be from the same SDK version.'
      }));
    }

    return global.braintree.client.create({
      authorization: options.authorization,
      debug: options.debug
    });
  });
}

module.exports = {
  create: createDeferredClient
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./assets":87,"./braintree-error":91,"./errors":105,"./promise":126}],102:[function(_dereq_,module,exports){
'use strict';

module.exports = function (fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
};

},{}],103:[function(_dereq_,module,exports){
'use strict';

var batchExecuteFunctions = _dereq_('./batch-execute-functions');

function Destructor() {
  this._teardownRegistry = [];

  this._isTearingDown = false;
}

Destructor.prototype.registerFunctionForTeardown = function (fn) {
  if (typeof fn === 'function') {
    this._teardownRegistry.push(fn);
  }
};

Destructor.prototype.teardown = function (callback) {
  if (this._isTearingDown) {
    callback(new Error('Destructor is already tearing down'));

    return;
  }

  this._isTearingDown = true;

  batchExecuteFunctions(this._teardownRegistry, function (err) {
    this._teardownRegistry = [];
    this._isTearingDown = false;

    if (typeof callback === 'function') {
      callback(err);
    }
  }.bind(this));
};

module.exports = Destructor;

},{"./batch-execute-functions":90}],104:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],105:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Shared Interal Error Codes
 * @ignore
 * @description These codes should never be experienced by the mechant directly.
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
 * @property {MERCHANT} BRAINTREE_API_ACCESS_RESTRICTED Occurs when the client token or tokenization key does not have the correct permissions.
 */

var BraintreeError = _dereq_('./braintree-error');

module.exports = {
  INVALID_USE_OF_INTERNAL_FUNCTION: {
    type: BraintreeError.types.INTERNAL,
    code: 'INVALID_USE_OF_INTERNAL_FUNCTION'
  },
  INSTANTIATION_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'INSTANTIATION_OPTION_REQUIRED'
  },
  INCOMPATIBLE_VERSIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'INCOMPATIBLE_VERSIONS'
  },
  CLIENT_SCRIPT_FAILED_TO_LOAD: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_SCRIPT_FAILED_TO_LOAD',
    message: 'Braintree client script could not be loaded.'
  },
  METHOD_CALLED_AFTER_TEARDOWN: {
    type: BraintreeError.types.MERCHANT,
    code: 'METHOD_CALLED_AFTER_TEARDOWN'
  },
  BRAINTREE_API_ACCESS_RESTRICTED: {
    type: BraintreeError.types.MERCHANT,
    code: 'BRAINTREE_API_ACCESS_RESTRICTED',
    message: 'Your access is restricted and cannot use this part of the Braintree API.'
  }
};

},{"./braintree-error":91}],106:[function(_dereq_,module,exports){
'use strict';

function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (event, callback) {
  if (this._events[event]) {
    this._events[event].push(callback);
  } else {
    this._events[event] = [callback];
  }
};

EventEmitter.prototype._emit = function (event) {
  var i, args;
  var callbacks = this._events[event];

  if (!callbacks) { return; }

  args = Array.prototype.slice.call(arguments, 1);

  for (i = 0; i < callbacks.length; i++) {
    callbacks[i].apply(null, args);
  }
};

module.exports = EventEmitter;

},{}],107:[function(_dereq_,module,exports){
'use strict';

module.exports = function (array, key, value) {
  var i;

  for (i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty(key) && array[i][key] === value) {
      return array[i];
    }
  }

  return null;
};

},{}],108:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Popup = _dereq_('./strategies/popup');
var PopupBridge = _dereq_('./strategies/popup-bridge');
var Modal = _dereq_('./strategies/modal');
var Bus = _dereq_('../../bus');
var events = _dereq_('../shared/events');
var errors = _dereq_('../shared/errors');
var constants = _dereq_('../shared/constants');
var uuid = _dereq_('../../vendor/uuid');
var iFramer = _dereq_('@braintree/iframer');
var BraintreeError = _dereq_('../../braintree-error');
var browserDetection = _dereq_('../shared/browser-detection');
var isHTTPS = _dereq_('../../is-https');
var assign = _dereq_('./../../assign').assign;

var REQUIRED_CONFIG_KEYS = [
  'name',
  'dispatchFrameUrl',
  'openFrameUrl'
];

function noop() {}

function _validateFrameConfiguration(options) {
  if (!options) {
    throw new Error('Valid configuration is required');
  }

  REQUIRED_CONFIG_KEYS.forEach(function (key) {
    if (!options.hasOwnProperty(key)) {
      throw new Error('A valid frame ' + key + ' must be provided');
    }
  });

  if (!/^[\w_]+$/.test(options.name)) {
    throw new Error('A valid frame name must be provided');
  }
}

function FrameService(options) {
  _validateFrameConfiguration(options);

  this._serviceId = uuid().replace(/-/g, '');

  this._options = {
    name: options.name + '_' + this._serviceId,
    dispatchFrameUrl: options.dispatchFrameUrl,
    openFrameUrl: options.openFrameUrl,
    height: options.height,
    width: options.width,
    top: options.top,
    left: options.left
  };
  this.state = options.state || {};

  this._bus = new Bus({channel: this._serviceId});
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
  var frameName = constants.DISPATCH_FRAME_NAME + '_' + this._serviceId;
  var frameSrc = this._options.dispatchFrameUrl;

  this._dispatchFrame = iFramer({
    name: frameName,
    src: frameSrc,
    'class': constants.DISPATCH_FRAME_CLASS,
    height: 0,
    width: 0,
    style: {
      position: 'absolute',
      left: '-9999px'
    }
  });

  document.body.appendChild(this._dispatchFrame);
};

FrameService.prototype._setBusEvents = function () {
  this._bus.on(events.DISPATCH_FRAME_REPORT, function (res, reply) {
    if (this._onCompleteCallback) {
      this._onCompleteCallback.call(null, res.err, res.payload);
    }
    this._frame.close();

    this._onCompleteCallback = null;

    if (reply) {
      reply();
    }
  }.bind(this));

  this._bus.on(Bus.events.CONFIGURATION_REQUEST, function (reply) {
    reply(this.state);
  }.bind(this));
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
        error = new BraintreeError(errors.FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG);
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
    }.bind(this)
  };
};

FrameService.prototype.createNoopHandler = function () {
  return {
    close: noop,
    focus: noop
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
  this._popupInterval = setInterval(function () {
    if (this.isFrameClosed()) {
      this._cleanupFrame();
      if (this._onCompleteCallback) {
        this._onCompleteCallback(new BraintreeError(errors.FRAME_SERVICE_FRAME_CLOSED));
      }
    }
  }.bind(this), constants.POPUP_POLL_INTERVAL);

  return this._popupInterval;
};

FrameService.prototype._getFrameForEnvironment = function (options) {
  var usePopup = browserDetection.supportsPopups();
  var popupBridgeExists = Boolean(global.popupBridge);

  var initOptions = assign({}, this._options, options);

  if (popupBridgeExists) {
    return new PopupBridge(initOptions);
  } else if (usePopup) {
    return new Popup(initOptions);
  }

  return new Modal(initOptions);
};

module.exports = FrameService;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../braintree-error":91,"../../bus":94,"../../is-https":121,"../../vendor/uuid":130,"../shared/browser-detection":115,"../shared/constants":116,"../shared/errors":117,"../shared/events":118,"./../../assign":88,"./strategies/modal":110,"./strategies/popup":113,"./strategies/popup-bridge":111,"@braintree/iframer":18}],109:[function(_dereq_,module,exports){
'use strict';

var FrameService = _dereq_('./frame-service');

module.exports = {
  create: function createFrameService(options, callback) {
    var frameService = new FrameService(options);

    frameService.initialize(function () {
      callback(frameService);
    });
  }
};

},{"./frame-service":108}],110:[function(_dereq_,module,exports){
(function (global){
'use strict';

var iFramer = _dereq_('@braintree/iframer');
var assign = _dereq_('../../../assign').assign;
var browserDetection = _dereq_('../../shared/browser-detection');

var ELEMENT_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  padding: 0,
  margin: 0,
  border: 0,
  outline: 'none',
  zIndex: 20001,
  background: '#FFFFFF'
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
    scrolling: 'yes',
    height: '100%',
    width: '100%',
    style: assign({}, ELEMENT_STYLES),
    title: 'Lightbox Frame'
  };

  if (browserDetection.isIos()) {
    // WKWebView has buggy behavior when scrolling a fixed position modal. The workaround is to lock scrolling in
    // the background. When modal is closed, we restore scrolling and return to the previous scroll position.
    if (browserDetection.isIosWKWebview()) {
      this._lockScrolling();
      // Allows WKWebView to scroll all the way down to bottom
      iframerConfig.style = {};
    }

    this._el = document.createElement('div');

    assign(this._el.style, ELEMENT_STYLES, {
      height: '100%',
      width: '100%',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
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
  global.scrollTo(this._savedBodyProperties.left, this._savedBodyProperties.top);
  delete this._savedBodyProperties;
};

Modal.prototype._lockScrolling = function () {
  var doc = document.documentElement;

  // From http://stackoverflow.com/questions/9538868/prevent-body-from-scrolling-when-a-modal-is-opened#comment65626743_24727206
  this._savedBodyProperties = {
    left: (global.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
    top: (global.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
    overflowStyle: document.body.style.overflow,
    positionStyle: document.body.style.position
  };
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  global.scrollTo(0, 0);
};

module.exports = Modal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../assign":88,"../../shared/browser-detection":115,"@braintree/iframer":18}],111:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('../../../braintree-error');
var errors = _dereq_('../../shared/errors');

function noop() {}

function PopupBridge(options) {
  this._closed = null;
  this._options = options;
}

PopupBridge.prototype.initialize = function (callback) {
  var self = this;

  global.popupBridge.onComplete = function (err, payload) {
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
  global.popupBridge.open(url);
};

PopupBridge.prototype.focus = noop;

PopupBridge.prototype.close = noop;

PopupBridge.prototype.isClosed = function () {
  return Boolean(this._closed);
};

PopupBridge.prototype.redirect = function (redirectUrl) {
  this.open({openFrameUrl: redirectUrl});
};

module.exports = PopupBridge;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../../braintree-error":91,"../../shared/errors":117}],112:[function(_dereq_,module,exports){
'use strict';

var constants = _dereq_('../../../shared/constants');
var position = _dereq_('./position');

function calculatePosition(type, userDefinedPosition, size) {
  if (typeof userDefinedPosition !== 'undefined') {
    return userDefinedPosition;
  }

  return position[type](size);
}

module.exports = function composePopupOptions(options) {
  var height = options.height || constants.DEFAULT_POPUP_HEIGHT;
  var width = options.width || constants.DEFAULT_POPUP_WIDTH;
  var top = calculatePosition('top', options.top, height);
  var left = calculatePosition('left', options.left, width);

  return [
    constants.POPUP_BASE_OPTIONS,
    'height=' + height,
    'width=' + width,
    'top=' + top,
    'left=' + left
  ].join(',');
};

},{"../../../shared/constants":116,"./position":114}],113:[function(_dereq_,module,exports){
(function (global){
'use strict';

var composeOptions = _dereq_('./compose-options');

function noop() {}

function Popup(options) {
  this._frame = null;
  this._options = options || {};

  this.open();
}

Popup.prototype.initialize = noop;

Popup.prototype.open = function () {
  this._frame = global.open(
    this._options.openFrameUrl,
    this._options.name,
    composeOptions(this._options)
  );
};

Popup.prototype.focus = function () {
  this._frame.focus();
};

Popup.prototype.close = function () {
  this._frame.close();
};

Popup.prototype.isClosed = function () {
  return !this._frame || Boolean(this._frame.closed);
};

Popup.prototype.redirect = function (redirectUrl) {
  this._frame.location.href = redirectUrl;
};

module.exports = Popup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./compose-options":112}],114:[function(_dereq_,module,exports){
(function (global){
'use strict';

function top(height) {
  var windowHeight = global.outerHeight || document.documentElement.clientHeight;
  var windowTop = global.screenY == null ? global.screenTop : global.screenY;

  return center(windowHeight, height, windowTop);
}

function left(width) {
  var windowWidth = global.outerWidth || document.documentElement.clientWidth;
  var windowLeft = global.screenX == null ? global.screenLeft : global.screenX;

  return center(windowWidth, width, windowLeft);
}

function center(windowMetric, popupMetric, offset) {
  return ((windowMetric - popupMetric) / 2) + offset;
}

module.exports = {
  top: top,
  left: left,
  center: center
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],115:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  isIos: _dereq_('@braintree/browser-detection/is-ios'),
  isIosWKWebview: _dereq_('@braintree/browser-detection/is-ios-wkwebview'),
  isIE: _dereq_('@braintree/browser-detection/is-ie'),
  supportsPopups: _dereq_('@braintree/browser-detection/supports-popups')
};


},{"@braintree/browser-detection/is-ie":6,"@braintree/browser-detection/is-ios":13,"@braintree/browser-detection/is-ios-wkwebview":12,"@braintree/browser-detection/supports-popups":16}],116:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  DISPATCH_FRAME_NAME: 'dispatch',
  DISPATCH_FRAME_CLASS: 'braintree-dispatch-frame',
  POPUP_BASE_OPTIONS: 'resizable,scrollbars',
  DEFAULT_POPUP_WIDTH: 450,
  DEFAULT_POPUP_HEIGHT: 535,
  POPUP_POLL_INTERVAL: 100,
  POPUP_CLOSE_TIMEOUT: 100
};

},{}],117:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Popup Related Error Codes
 * @ignore
 * @description Errors that occur when using a component that opens a popup window.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_CLOSED - Occurs when the frame is closed before tokenization can occur.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_OPEN_FAILED - Occurs when the popup could not be opened.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG - Occurs when the frame could not be opened because of a specific bug in Internet Explorer - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11324352/.
 */

var BraintreeError = _dereq_('../../braintree-error');

module.exports = {
  FRAME_SERVICE_FRAME_CLOSED: {
    type: BraintreeError.types.INTERNAL,
    code: 'FRAME_SERVICE_FRAME_CLOSED',
    message: 'Frame closed before tokenization could occur.'
  },
  FRAME_SERVICE_FRAME_OPEN_FAILED: {
    type: BraintreeError.types.INTERNAL,
    code: 'FRAME_SERVICE_FRAME_OPEN_FAILED',
    message: 'Frame failed to open.'
  },
  FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG: {
    type: BraintreeError.types.INTERNAL,
    code: 'FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG',
    message: 'Could not open frame. This may be due to a bug in IE browsers when attempting to open an HTTPS page from a HTTP page. https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11324352/'
  }
};

},{"../../braintree-error":91}],118:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../enumerate');

module.exports = enumerate([
  'DISPATCH_FRAME_READY',
  'DISPATCH_FRAME_REPORT'
], 'frameService:');

},{"../../enumerate":104}],119:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.42.0";
var assign = _dereq_('./assign').assign;

function generateTokenizationParameters(configuration, overrides) {
  var metadata = configuration.analyticsMetadata;
  var basicTokenizationParameters = {
    gateway: 'braintree',
    'braintree:merchantId': configuration.gatewayConfiguration.merchantId,
    'braintree:apiVersion': 'v1',
    'braintree:sdkVersion': VERSION,
    'braintree:metadata': JSON.stringify({
      source: metadata.source,
      integration: metadata.integration,
      sessionId: metadata.sessionId,
      version: VERSION,
      platform: metadata.platform
    })
  };

  return assign({}, basicTokenizationParameters, overrides);
}

module.exports = function (configuration, googlePayVersion, googleMerchantId) {
  var data, allowedPaymentMethod, paypalPaymentMethod;
  var androidPayConfiguration = configuration.gatewayConfiguration.androidPay;
  var environment = configuration.gatewayConfiguration.environment === 'production' ? 'PRODUCTION' : 'TEST';

  if (googlePayVersion === 2) {
    data = {
      apiVersion: 2,
      apiVersionMinor: 0,
      environment: environment,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: [
            'PAN_ONLY',
            'CRYPTOGRAM_3DS'
          ],
          allowedCardNetworks:
            androidPayConfiguration.supportedNetworks.map(function (card) { return card.toUpperCase(); })
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: generateTokenizationParameters(configuration, {
            'braintree:authorizationFingerprint': androidPayConfiguration.googleAuthorizationFingerprint
          })
        }
      }]
    };

    if (googleMerchantId) {
      data.merchantInfo = {
        merchantId: googleMerchantId
      };
    }

    if (configuration.authorizationType === 'TOKENIZATION_KEY') {
      allowedPaymentMethod = find(data.allowedPaymentMethods, 'type', 'CARD');

      if (allowedPaymentMethod) {
        allowedPaymentMethod.tokenizationSpecification.parameters['braintree:clientKey'] = configuration.authorization;
      }
    }

    if (configuration.gatewayConfiguration.paypal &&
      configuration.gatewayConfiguration.paypal.clientId &&
      configuration.gatewayConfiguration.paypal.environmentNoNetwork === false
    ) {
      paypalPaymentMethod = {
        type: 'PAYPAL',
        parameters: {
          purchase_context: { // eslint-disable-line camelcase
            purchase_units: [ // eslint-disable-line camelcase
              {
                payee: {
                  client_id: configuration.gatewayConfiguration.paypal.clientId // eslint-disable-line camelcase
                },
                recurring_payment: true // eslint-disable-line camelcase
              }
            ]
          }
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: generateTokenizationParameters(configuration, {
            'braintree:paypalClientId': configuration.gatewayConfiguration.paypal.clientId
          })
        }
      };

      data.allowedPaymentMethods.push(paypalPaymentMethod);
    }
  } else {
    data = {
      environment: environment,
      allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
      paymentMethodTokenizationParameters: {
        tokenizationType: 'PAYMENT_GATEWAY',
        parameters: generateTokenizationParameters(configuration, {
          'braintree:authorizationFingerprint': androidPayConfiguration.googleAuthorizationFingerprint
        })
      },
      cardRequirements: {
        allowedCardNetworks: androidPayConfiguration.supportedNetworks.map(function (card) { return card.toUpperCase(); })
      }
    };

    if (configuration.authorizationType === 'TOKENIZATION_KEY') {
      data.paymentMethodTokenizationParameters.parameters['braintree:clientKey'] = configuration.authorization;
    }

    if (googleMerchantId) {
      data.merchantId = googleMerchantId;
    }

    if (googlePayVersion) {
      data.apiVersion = googlePayVersion;
    }
  }

  return data;
};

},{"./assign":88}],120:[function(_dereq_,module,exports){
'use strict';

function convertDateStringToDate(dateString) {
  var splitDate = dateString.split('-');

  return new Date(splitDate[0], splitDate[1], splitDate[2]);
}

function isDateStringBeforeOrOn(firstDate, secondDate) {
  return convertDateStringToDate(firstDate) <= convertDateStringToDate(secondDate);
}

module.exports = isDateStringBeforeOrOn;

},{}],121:[function(_dereq_,module,exports){
(function (global){
'use strict';

function isHTTPS(protocol) {
  protocol = protocol || global.location.protocol;

  return protocol === 'https:';
}

module.exports = {
  isHTTPS: isHTTPS
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],122:[function(_dereq_,module,exports){
'use strict';

var parser;
var legalHosts = {
  'paypal.com': 1,
  'braintreepayments.com': 1,
  'braintreegateway.com': 1,
  'braintree-api.com': 1
};

// endRemoveIf(production)

function stripSubdomains(domain) {
  return domain.split('.').slice(-2).join('.');
}

function isVerifiedDomain(url) {
  var mainDomain;

  url = url.toLowerCase();

  if (!/^https:/.test(url)) {
    return false;
  }

  parser = parser || document.createElement('a');
  parser.href = url;
  mainDomain = stripSubdomains(parser.hostname);

  return legalHosts.hasOwnProperty(mainDomain);
}

module.exports = isVerifiedDomain;

},{}],123:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],124:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],125:[function(_dereq_,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],126:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":28}],127:[function(_dereq_,module,exports){
(function (global){
'use strict';

function _notEmpty(obj) {
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) { return true; }
  }

  return false;
}

/* eslint-disable no-mixed-operators */
function _isArray(value) {
  return value && typeof value === 'object' && typeof value.length === 'number' &&
    Object.prototype.toString.call(value) === '[object Array]' || false;
}
/* eslint-enable no-mixed-operators */

function parse(url) {
  var query, params;

  url = url || global.location.href;

  if (!/\?/.test(url)) {
    return {};
  }

  query = url.replace(/#.*$/, '').replace(/^.*\?/, '').split('&');

  params = query.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split('=');
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
        k = namespace + '[]';
      } else {
        k = namespace + '[' + p + ']';
      }
    } else {
      k = p;
    }
    if (typeof v === 'object') {
      query.push(stringify(v, k));
    } else {
      query.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }

  return query.join('&');
}

function queryify(url, params) {
  url = url || '';

  if (params != null && typeof params === 'object' && _notEmpty(params)) {
    url += url.indexOf('?') === -1 ? '?' : '';
    url += url.indexOf('=') !== -1 ? '&' : '';
    url += stringify(params);
  }

  return url;
}

module.exports = {
  parse: parse,
  stringify: stringify,
  queryify: queryify
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],128:[function(_dereq_,module,exports){
'use strict';

function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;

},{}],129:[function(_dereq_,module,exports){
(function (global){
'use strict';

var atobNormalized = typeof global.atob === 'function' ? global.atob : atob;

function atob(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var result = '';

  if (!base64Matcher.test(base64String)) {
    throw new Error('Non base64 encoded input passed to window.atob polyfill');
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
    b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
    c = (b3 & 0x3) << 6 | b4 & 0x3F;

    result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: function (base64String) {
    return atobNormalized.call(global, base64String);
  },
  _atob: atob
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],130:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],131:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  REQUIRED_OPTIONS_FOR_START_PAYMENT: ['onPaymentStart', 'paymentType', 'amount', 'fallback']
};

},{}],132:[function(_dereq_,module,exports){
(function (global){
'use strict';

var frameService = _dereq_('../../lib/frame-service/external');
var BraintreeError = _dereq_('../../lib/braintree-error');
var useMin = _dereq_('../../lib/use-min');
var VERSION = "3.42.0";
var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;
var analytics = _dereq_('../../lib/analytics');
var methods = _dereq_('../../lib/methods');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var convertToBraintreeError = _dereq_('../../lib/convert-to-braintree-error');
var Promise = _dereq_('../../lib/promise');
var querystring = _dereq_('../../lib/querystring');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var constants = _dereq_('./constants');
var errors = _dereq_('../shared/errors');

/**
 * @class
 * @param {object} options see {@link module:braintree-web/local-payment.create|local-payment.create}
 * @classdesc This class represents a LocalPayment component. Instances of this class can open a LocalPayment window for paying with alternate payments local to a specific country. Any additional UI, such as disabling the page while authentication is taking place, is up to the developer.
 *
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/local-payment.create|braintree-web.local-payment.create} instead.</strong>
 */
function LocalPayment(options) {
  this._client = options.client;
  this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.assetsUrl + '/web/' + VERSION;
  this._isDebug = options.client.getConfiguration().isDebug;
  this._loadingFrameUrl = this._assetsUrl + '/html/local-payment-landing-frame' + useMin(this._isDebug) + '.html';
  this._authorizationInProgress = false;
  this._paymentType = 'unknown';
  this._merchantAccountId = options.merchantAccountId;
}

LocalPayment.prototype._initialize = function () {
  var self = this;
  var client = this._client;
  var failureTimeout = setTimeout(function () {
    analytics.sendEvent(client, 'local-payment.load.timed-out');
  }, INTEGRATION_TIMEOUT_MS);

  return new Promise(function (resolve) {
    frameService.create({
      name: 'localpaymentlandingpage',
      dispatchFrameUrl: self._assetsUrl + '/html/dispatch-frame' + useMin(self._isDebug) + '.html',
      openFrameUrl: self._loadingFrameUrl
    }, function (service) {
      self._frameService = service;
      clearTimeout(failureTimeout);
      analytics.sendEvent(client, 'local-payment.load.succeeded');
      resolve(self);
    });
  });
};

/**
 * Launches the local payment flow and returns a nonce payload. Only one local payment flow should be active at a time. One way to achieve this is to disable your local payment button while the flow is open.
 * @public
 * @function
 * @param {object} options All options for initiating the local payment payment flow.
 * @param {object} options.fallback Configuration for what to do when app switching back from a Bank app on a mobile device.
 * @param {string} options.fallback.buttonText The text to insert into a button to redirect back to the merchant page.
 * @param {string} options.fallback.url The url to redirect to when the redirect button is activated. Query params will be added to the url to process the data returned from the bank.
 * @param {string} options.amount The amount to authorize for the transaction.
 * @param {string} options.currencyCode The currency to process the payment.
 * @param {string} options.paymentType The type of local payment.
 * @param {string} options.email Payer email of the customer.
 * @param {string} options.givenName First name of the customer.
 * @param {string} options.surname Last name of the customer.
 * @param {string} options.phone Phone number of the customer.
 * @param {boolean} options.shippingAddressRequired Indicates whether or not the payment needs to be shipped. For digital goods, this should be false. Defaults to false.
 * @param {string} options.address.streetAddress Line 1 of the Address (eg. number, street, etc). An error will occur if this address is not valid.
 * @param {string} options.address.extendedAddress Line 2 of the Address (eg. suite, apt #, etc.). An error will occur if this address is not valid.
 * @param {string} options.address.locality Customer's city.
 * @param {string} options.address.region Customer's region or state.
 * @param {string} options.address.postalCode Customer's postal code.
 * @param {string} options.address.countryCode Customer's country code.
 * @param {function} options.onPaymentStart A function that will be called with two parameters: an object containing the  `paymentId` and a `continueCallback` that must be called to launch the flow. You can use method to do any preprocessing on your server before the flow begins..
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link LocalPayment~startPaymentPayload|startPaymentPayload}. If no callback is provided, the method will return a Promise that resolves with a {@link LocalPayment~startPaymentPayload|startPaymentPayload}.
 * @example
 * button.addEventListener('click', function () {
 *   // Disable the button when local payment is in progress
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because startPayment opens a new window, this must be called
 *   // as a result of a user action, such as a button click.
 *   localPaymentInstance.startPayment({
 *     paymentType: 'ideal',
 *     fallback: {
 *       buttonText: 'Return to Merchant',
 *       url: 'https://example.com/my-checkout-page'
 *     },
 *     amount: '10.00',
 *     currency: 'EUR',
 *     onPaymentStart: function (data, continueCallback) {
 *       // Do any preprocessing before starting the flow
 *       // data.paymentId is the ID of the localPayment
 *       continueCallback();
 *     }
 *   }).then(function (payload) {
 *     button.removeAttribute('disabled');
 *     // Submit payload.nonce to your server
 *   }).catch(function (startPaymentError) {
 *     button.removeAttribute('disabled');
 *     // Handle flow errors or premature flow closure
 *     console.error('Error!', startPaymentError);
 *   });
 * });
 * @returns {Promise|void}
 */
LocalPayment.prototype.startPayment = wrapPromise(function (options) {
  var address, params;
  var self = this; // eslint-disable-line no-invalid-this
  var serviceId = this._frameService._serviceId; // eslint-disable-line no-invalid-this

  if (hasMissingOption(options)) {
    return Promise.reject(new BraintreeError(errors.LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION));
  }

  address = options.address || {};
  params = {
    intent: 'sale',
    returnUrl: querystring.queryify(self._assetsUrl + '/html/local-payment-redirect-frame' + useMin(self._isDebug) + '.html', {
      channel: serviceId,
      r: options.fallback.url,
      t: options.fallback.buttonText
    }),
    cancelUrl: querystring.queryify(self._assetsUrl + '/html/local-payment-cancel-frame' + useMin(self._isDebug) + '.html', {
      channel: serviceId
    }),
    experienceProfile: {
      noShipping: !options.shippingAddressRequired
    },
    fundingSource: options.paymentType,
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
    merchantAccountId: self._merchantAccountId
  };

  self._paymentType = options.paymentType.toLowerCase();
  if (self._authorizationInProgress) {
    analytics.sendEvent(self._client, self._paymentType + '.local-payment.start-payment.error.already-opened');

    return Promise.reject(new BraintreeError(errors.LOCAL_PAYMENT_ALREADY_IN_PROGRESS));
  }

  self._authorizationInProgress = true;

  return new Promise(function (resolve, reject) {
    self._startPaymentCallback = self._createStartPaymentCallback(resolve, reject);

    self._frameService.open({}, self._startPaymentCallback);

    self._client.request({
      method: 'post',
      endpoint: 'paypal_hermes/create_payment_resource',
      data: params
    }).then(function (response) {
      analytics.sendEvent(self._client, self._paymentType + '.local-payment.start-payment.opened');
      self._startPaymentOptions = options;
      options.onPaymentStart({paymentId: response.paymentResource.paymentToken}, function () {
        self._frameService.redirect(response.paymentResource.redirectUrl);
      });
    }).catch(function (err) {
      var status = err.details && err.details.httpStatus;

      self._frameService.close();
      self._authorizationInProgress = false;

      if (status === 422) {
        reject(new BraintreeError({
          type: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.type,
          code: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.code,
          message: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.message,
          details: {
            originalError: err
          }
        }));

        return;
      }

      reject(convertToBraintreeError(err, {
        type: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.type,
        code: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.code,
        message: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.message
      }));
    });
  });
});

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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
LocalPayment.prototype.tokenize = function (params) {
  var self = this;
  var client = this._client;

  params = params || querystring.parse();

  return client.request({
    endpoint: 'payment_methods/paypal_accounts',
    method: 'post',
    data: this._formatTokenizeData(params)
  }).then(function (response) {
    var payload = self._formatTokenizePayload(response);

    if (global.popupBridge) {
      analytics.sendEvent(client, self._paymentType + '.local-payment.tokenization.success-popupbridge');
    } else {
      analytics.sendEvent(client, self._paymentType + '.local-payment.tokenization.success');
    }

    return payload;
  }).catch(function (err) {
    analytics.sendEvent(client, self._paymentType + '.local-payment.tokenization.failed');

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.type,
      code: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.code,
      message: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.message
    }));
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
    analytics.sendEvent(this._client, this._paymentType + '.local-payment.start-payment.closed.by-merchant');
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

LocalPayment.prototype._createStartPaymentCallback = function (resolve, reject) {
  var self = this;
  var client = this._client;

  return function (err, params) {
    self._authorizationInProgress = false;
    if (err) {
      if (err.code === 'FRAME_SERVICE_FRAME_CLOSED') {
        analytics.sendEvent(client, self._paymentType + '.local-payment.tokenization.closed.by-user');
        reject(new BraintreeError(errors.LOCAL_PAYMENT_WINDOW_CLOSED));
      } else if (err.code && err.code.indexOf('FRAME_SERVICE_FRAME_OPEN_FAILED') > -1) {
        reject(new BraintreeError({
          code: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.code,
          type: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.type,
          message: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.message,
          details: {
            originalError: err
          }
        }));
      }
    } else if (params) {
      if (!global.popupBridge) {
        self._frameService.redirect(self._loadingFrameUrl);
      }

      self.tokenize(params).then(resolve).catch(reject).then(function () {
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
    type: account.type
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
 * Checks if required tokenizaiton parameters are available in querystring for manual toenization requests.
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

  return Boolean(params.btLpToken && params.btLpPaymentId && params.btLpPayerId);
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
      intent: 'sale'
    }
  };

  return data;
};

function hasMissingOption(options) {
  var i, option;

  if (!options) {
    return true;
  }

  for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_START_PAYMENT.length; i++) {
    option = constants.REQUIRED_OPTIONS_FOR_START_PAYMENT[i];

    if (!options.hasOwnProperty(option)) {
      return true;
    }
  }

  if (!(options.fallback.url && options.fallback.buttonText)) {
    return true;
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
LocalPayment.prototype.teardown = wrapPromise(function () {
  var self = this; // eslint-disable-line no-invalid-this

  self._frameService.teardown();

  convertMethodsToError(self, methods(LocalPayment.prototype));

  analytics.sendEvent(self._client, 'local-payment.teardown-completed');

  return Promise.resolve();
});

module.exports = LocalPayment;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/analytics":86,"../../lib/braintree-error":91,"../../lib/constants":96,"../../lib/convert-methods-to-error":97,"../../lib/convert-to-braintree-error":98,"../../lib/frame-service/external":109,"../../lib/methods":124,"../../lib/promise":126,"../../lib/querystring":127,"../../lib/use-min":128,"../shared/errors":134,"./constants":131,"@braintree/wrap-promise":25}],133:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/local-payment
 * @description A component to integrate with local payment methods. *This component is currently in beta and is subject to change.*
 */

var analytics = _dereq_('../lib/analytics');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var LocalPayment = _dereq_('./external/local-payment');
var VERSION = "3.42.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var BraintreeError = _dereq_('../lib/braintree-error');
var errors = _dereq_('./shared/errors');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {string} [options.merchantAccountId] A non-default merchant account ID to use for tokenization.
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
 *     client: clientInstance
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
 *         currency: 'EUR',
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'Local Payment';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var localPaymentInstance;
    var config = client.getConfiguration();

    options.client = client;

    if (config.gatewayConfiguration.paypalEnabled !== true) {
      return Promise.reject(new BraintreeError(errors.LOCAL_PAYMENT_NOT_ENABLED));
    }

    analytics.sendEvent(client, 'local-payment.initialized');

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
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./external/local-payment":132,"./shared/errors":134,"@braintree/wrap-promise":25}],134:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.LocalPayment - Creation Error Codes
 * @description Errors that occur when [creating the Local Payment component](/current/module-braintree-web_local-payment.html#.create).
 * @property {MERCHANT} LOCAL_PAYMENT_NOT_ENABLED Occurs when Local Payment is not enabled on the Braintree control panel.
 */

/**
 * @name BraintreeError.LocalPayment - startPayment Error Codes
 * @description Errors that occur when using the [`startPayment` method](/current/LocalPayment.html#startPayment).
 * @property {MERCHANT} LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION Occurs when a startPayment is missing a required option.
 * @property {MERCHANT} LOCAL_PAYMENT_ALREADY_IN_PROGRESS Occurs when a startPayment call is already in progress.
 * @property {MERCHANT} LOCAL_PAYMENT_INVALID_PAYMENT_OPTION Occurs when a startPayment call has an invalid option.
 * @property {NETWORK} LOCAL_PAYMENT_START_PAYMENT_FAILED Occurs when a startPayment call fails.
 * @property {NETWORK} LOCAL_PAYMENT_TOKENIZATION_FAILED Occurs when a startPayment call fails to tokenize the result from authorization.
 * @property {CUSTOMER} LOCAL_PAYMENT_WINDOW_CLOSED Occurs when the customer closes the Local Payment window.
 * @property {MERCHANT} LOCAL_PAYMENT_WINDOW_OPEN_FAILED Occurs when the Local Payment window fails to open. Usualy because `startPayment` was not called as a direct result of a user action.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  LOCAL_PAYMENT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'LOCAL_PAYMENT_NOT_ENABLED',
    message: 'LocalPayment is not enabled for this merchant.'
  },
  LOCAL_PAYMENT_ALREADY_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'LOCAL_PAYMENT_ALREADY_IN_PROGRESS',
    message: 'LocalPayment payment is already in progress.'
  },
  LOCAL_PAYMENT_WINDOW_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'LOCAL_PAYMENT_WINDOW_CLOSED',
    message: 'Customer closed LocalPayment window before authorizing.'
  },
  LOCAL_PAYMENT_WINDOW_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'LOCAL_PAYMENT_WINDOW_OPEN_FAILED',
    message: 'LocalPayment window failed to open; make sure startPayment was called in response to a user action.'
  },
  LOCAL_PAYMENT_START_PAYMENT_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'LOCAL_PAYMENT_START_PAYMENT_FAILED',
    message: 'LocalPayment startPayment failed.'
  },
  LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION',
    message: 'Missing required option for startPayment.'
  },
  LOCAL_PAYMENT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'LOCAL_PAYMENT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s local payment method.'
  },
  LOCAL_PAYMENT_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'LOCAL_PAYMENT_INVALID_PAYMENT_OPTION',
    message: 'Local payment options are invalid.'
  }
};

},{"../../lib/braintree-error":91}],135:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = _dereq_('../../lib/promise');
var frameService = _dereq_('../../lib/frame-service/external');
var BraintreeError = _dereq_('../../lib/braintree-error');
var errors = _dereq_('../shared/errors');
var VERSION = "3.42.0";
var methods = _dereq_('../../lib/methods');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var analytics = _dereq_('../../lib/analytics');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var convertToBraintreeError = _dereq_('../../lib/convert-to-braintree-error');
var constants = _dereq_('../shared/constants');

var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;

/**
 * Masterpass Address object.
 * @typedef {object} Masterpass~Address
 * @property {string} countryCodeAlpha2 The customer's country code.
 * @property {string} extendedAddress The customer's extended address.
 * @property {string} locality The customer's locality.
 * @property {string} postalCode The customer's postal code.
 * @property {string} region The customer's region.
 * @property {string} streetAddress The customer's street address.
 */

/**
 * @typedef {object} Masterpass~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} description The human readable description.
 * @property {string} type The payment method type, always `MasterpassCard`.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {object} contact The customer's contact information.
 * @property {string} contact.firstName The customer's first name.
 * @property {string} contact.lastName The customer's last name.
 * @property {string} contact.phoneNumber The customer's phone number.
 * @property {string} contact.emailAddress The customer's email address.
 * @property {Masterpass~Address} billingAddress The customer's billing address.
 * @property {Masterpass~Address} shippingAddress The customer's shipping address.
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
 * @class
 * @param {object} options see {@link module:braintree-web/masterpass.create|masterpass.create}
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/masterpass.create|braintree.masterpass.create} instead.</strong>
 * @classdesc This class represents an Masterpass component. Instances of this class have methods for launching a new window to process a transaction with Masterpass.
 */
function Masterpass(options) {
  var configuration = options.client.getConfiguration();

  this._client = options.client;
  this._assetsUrl = configuration.gatewayConfiguration.assetsUrl + '/web/' + VERSION;
  this._isDebug = configuration.isDebug;
  this._authInProgress = false;
  if (global.popupBridge && typeof global.popupBridge.getReturnUrlPrefix === 'function') {
    this._callbackUrl = global.popupBridge.getReturnUrlPrefix() + 'return';
  } else {
    this._callbackUrl = this._assetsUrl + '/html/masterpass-redirect-frame' + (this._isDebug ? '' : '.min') + '.html';
  }
}

Masterpass.prototype._initialize = function () {
  var self = this;

  return new Promise(function (resolve) {
    var failureTimeout = setTimeout(function () {
      analytics.sendEvent(self._client, 'masterpass.load.timed-out');
    }, INTEGRATION_TIMEOUT_MS);

    frameService.create({
      name: constants.LANDING_FRAME_NAME,
      height: constants.POPUP_HEIGHT,
      width: constants.POPUP_WIDTH,
      dispatchFrameUrl: self._assetsUrl + '/html/dispatch-frame' + (self._isDebug ? '' : '.min') + '.html',
      openFrameUrl: self._assetsUrl + '/html/masterpass-landing-frame' + (self._isDebug ? '' : '.min') + '.html'
    }, function (service) {
      self._frameService = service;
      clearTimeout(failureTimeout);
      analytics.sendEvent(self._client, 'masterpass.load.succeeded');
      resolve(self);
    });
  });
};

/**
 * Launches the Masterpass flow and returns a nonce payload. Only one Masterpass flow should be active at a time. One way to achieve this is to disable your Masterpass button while the flow is open.
 *
 * Braintree will apply these properties in `options.config`. Merchants should not override these values, except for advanced usage.
 *  - `environment`
 *  - `requestToken`
 *  - `callbackUrl`
 *  - `merchantCheckoutId`
 *  - `allowedCardTypes`
 *  - `version`
 *
 * @public
 * @param {object} options All options for initiating the Masterpass payment flow.
 * @param {string} options.currencyCode The currency code to process the payment.
 * @param {string} options.subtotal The amount to authorize for the transaction.
 * @param {object} [options.config] All configuration parameters accepted by Masterpass lightbox, except `function` data type. These options will override the values set by Braintree server. Please see {@link Masterpass Lightbox Parameters|https://developer.mastercard.com/page/masterpass-lightbox-parameters} for more information.
 * @param {object} [options.frameOptions] Used to configure the window that contains the Masterpass login.
 * @param {number} [options.frameOptions.width] Popup width to be used instead of default value (450px).
 * @param {number} [options.frameOptions.height] Popup height to be used instead of default value (660px).
 * @param {number} [options.frameOptions.top] The top position of the popup window to be used instead of default value, that is calculated based on provided height, and parent window size.
 * @param {number} [options.frameOptions.left] The left position to the popup window to be used instead of default value, that is calculated baed on provided width, and parent window size.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link Masterpass~tokenizePayload|tokenizePayload}. If no callback is provided, the method will return a Promise that resolves with a {@link Masterpass~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * button.addEventListener('click', function () {
 *   // Disable the button so that we don't attempt to open multiple popups.
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because tokenize opens a new window, this must be called
 *   // as a result of a user action, such as a button click.
 *   masterpassInstance.tokenize({
 *     currencyCode: 'USD',
 *     subtotal: '10.00'
 *   }).then(function (payload) {
 *     button.removeAttribute('disabled');
 *     // Submit payload.nonce to your server
 *   }).catch(function (tokenizeError) {
 *     button.removeAttribute('disabled');
 *     // Handle flow errors or premature flow closure
 *
 *     switch (tokenizeErr.code) {
 *       case 'MASTERPASS_POPUP_CLOSED':
 *         console.error('Customer closed Masterpass popup.');
 *         break;
 *       case 'MASTERPASS_ACCOUNT_TOKENIZATION_FAILED':
 *         console.error('Masterpass tokenization failed. See details:', tokenizeErr.details);
 *         break;
 *       case 'MASTERPASS_FLOW_FAILED':
 *         console.error('Unable to initialize Masterpass flow. Are your options correct?', tokenizeErr.details);
 *         break;
 *       default:
 *         console.error('Error!', tokenizeErr);
 *     }
 *   });
 * });
 */
Masterpass.prototype.tokenize = function (options) {
  var self = this;

  if (!options || hasMissingOption(options)) {
    return Promise.reject(new BraintreeError(errors.MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION));
  }

  if (self._authInProgress) {
    return Promise.reject(new BraintreeError(errors.MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS));
  }

  return new Promise(function (resolve, reject) {
    self._navigateFrameToLoadingPage(options).catch(reject);
    // This MUST happen after _navigateFrameToLoadingPage for Metro browsers to work.
    self._frameService.open(options.frameOptions, self._createFrameOpenHandler(resolve, reject));
  });
};

Masterpass.prototype._navigateFrameToLoadingPage = function (options) {
  var self = this;

  this._authInProgress = true;

  return this._client.request({
    method: 'post',
    endpoint: 'masterpass/request_token',
    data: {
      requestToken: {
        originUrl: global.location.protocol + '//' + global.location.hostname,
        subtotal: options.subtotal,
        currencyCode: options.currencyCode,
        callbackUrl: this._callbackUrl
      }
    }
  }).then(function (response) {
    var redirectUrl = self._assetsUrl + '/html/masterpass-loading-frame' + (self._isDebug ? '' : '.min') + '.html?';
    var gatewayConfiguration = self._client.getConfiguration().gatewayConfiguration;
    var config = options.config || {};
    var queryParams;

    queryParams = {
      environment: gatewayConfiguration.environment,
      requestToken: response.requestToken,
      callbackUrl: self._callbackUrl,
      merchantCheckoutId: gatewayConfiguration.masterpass.merchantCheckoutId,
      allowedCardTypes: gatewayConfiguration.masterpass.supportedNetworks,
      version: constants.MASTERPASS_VERSION
    };

    Object.keys(config).forEach(function (key) {
      if (typeof config[key] !== 'function') {
        queryParams[key] = config[key];
      }
    });

    redirectUrl += Object.keys(queryParams).map(function (key) {
      return key + '=' + queryParams[key];
    }).join('&');

    self._frameService.redirect(redirectUrl);
  }).catch(function (err) {
    var status = err.details && err.details.httpStatus;

    self._closeWindow();

    if (status === 422) {
      return Promise.reject(convertToBraintreeError(err, errors.MASTERPASS_INVALID_PAYMENT_OPTION));
    }

    return Promise.reject(convertToBraintreeError(err, errors.MASTERPASS_FLOW_FAILED));
  });
};

Masterpass.prototype._createFrameOpenHandler = function (resolve, reject) {
  var self = this;

  if (global.popupBridge) {
    return function (popupBridgeErr, payload) {
      self._authInProgress = false;

      if (popupBridgeErr) {
        analytics.sendEvent(self._client, 'masterpass.tokenization.closed-popupbridge.by-user');
        reject(convertToBraintreeError(popupBridgeErr, errors.MASTERPASS_POPUP_CLOSED));

        return;
      } else if (!payload.queryItems) {
        analytics.sendEvent(self._client, 'masterpass.tokenization.failed-popupbridge');
        reject(new BraintreeError(errors.MASTERPASS_FLOW_FAILED));

        return;
      }

      self._tokenizeMasterpass(payload.queryItems).then(resolve).catch(reject);
    };
  }

  return function (frameServiceErr, payload) {
    if (frameServiceErr) {
      self._authInProgress = false;

      if (frameServiceErr.code === 'FRAME_SERVICE_FRAME_CLOSED') {
        analytics.sendEvent(self._client, 'masterpass.tokenization.closed.by-user');
        reject(new BraintreeError(errors.MASTERPASS_POPUP_CLOSED));

        return;
      }

      if (frameServiceErr.code && frameServiceErr.code.indexOf('FRAME_SERVICE_FRAME_OPEN_FAILED') > -1) {
        analytics.sendEvent(self._client, 'masterpass.tokenization.failed.to-open');
        reject(new BraintreeError({
          code: errors.MASTERPASS_POPUP_OPEN_FAILED.code,
          type: errors.MASTERPASS_POPUP_OPEN_FAILED.type,
          message: errors.MASTERPASS_POPUP_OPEN_FAILED.message,
          details: {
            originalError: frameServiceErr
          }
        }));

        return;
      }

      analytics.sendEvent(self._client, 'masterpass.tokenization.failed');
      self._closeWindow();
      reject(convertToBraintreeError(frameServiceErr, errors.MASTERPASS_FLOW_FAILED));

      return;
    }

    self._tokenizeMasterpass(payload).then(resolve).catch(reject);
  };
};

Masterpass.prototype._tokenizeMasterpass = function (payload) {
  var self = this;

  if (payload.mpstatus !== 'success') {
    analytics.sendEvent(self._client, 'masterpass.tokenization.closed.by-user');
    self._closeWindow();

    return Promise.reject(new BraintreeError(errors.MASTERPASS_POPUP_CLOSED));
  }

  if (isMissingRequiredPayload(payload)) {
    analytics.sendEvent(self._client, 'masterpass.tokenization.closed.missing-payload');
    self._closeWindow();

    return Promise.reject(new BraintreeError(errors.MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS));
  }

  return self._client.request({
    endpoint: 'payment_methods/masterpass_cards',
    method: 'post',
    data: {
      masterpassCard: {
        checkoutResourceUrl: payload.checkout_resource_url,
        requestToken: payload.oauth_token,
        verifierToken: payload.oauth_verifier
      }
    }
  }).then(function (response) {
    self._closeWindow();
    if (global.popupBridge) {
      analytics.sendEvent(self._client, 'masterpass.tokenization.success-popupbridge');
    } else {
      analytics.sendEvent(self._client, 'masterpass.tokenization.success');
    }

    return response.masterpassCards[0];
  }).catch(function (tokenizeErr) {
    self._closeWindow();
    if (global.popupBridge) {
      analytics.sendEvent(self._client, 'masterpass.tokenization.failed-popupbridge');
    } else {
      analytics.sendEvent(self._client, 'masterpass.tokenization.failed');
    }

    return Promise.reject(convertToBraintreeError(tokenizeErr, errors.MASTERPASS_ACCOUNT_TOKENIZATION_FAILED));
  });
};

function isMissingRequiredPayload(payload) {
  return [
    payload.oauth_verifier,
    payload.oauth_token,
    payload.checkout_resource_url
  ].some(function (element) {
    return element == null || element === 'null';
  });
}

Masterpass.prototype._closeWindow = function () {
  this._authInProgress = false;
  this._frameService.close();
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/masterpass.create|create}.
 * @public
 * @param {callback} [callback] Called on completion. If no callback is provided, `teardown` returns a promise.
 * @example
 * masterpassInstance.teardown();
 * @example <caption>With callback</caption>
 * masterpassInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Masterpass.prototype.teardown = function () {
  var self = this;

  return new Promise(function (resolve) {
    self._frameService.teardown();

    convertMethodsToError(self, methods(Masterpass.prototype));

    analytics.sendEvent(self._client, 'masterpass.teardown-completed');

    resolve();
  });
};

function hasMissingOption(options) {
  var i, option;

  for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_TOKENIZE.length; i++) {
    option = constants.REQUIRED_OPTIONS_FOR_TOKENIZE[i];

    if (!options.hasOwnProperty(option)) {
      return true;
    }
  }

  return false;
}

module.exports = wrapPromise.wrapPrototype(Masterpass);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/analytics":86,"../../lib/braintree-error":91,"../../lib/constants":96,"../../lib/convert-methods-to-error":97,"../../lib/convert-to-braintree-error":98,"../../lib/frame-service/external":109,"../../lib/methods":124,"../../lib/promise":126,"../shared/constants":138,"../shared/errors":139,"@braintree/wrap-promise":25}],136:[function(_dereq_,module,exports){
(function (global){
'use strict';
/** @module braintree-web/masterpass
 * @description Processes Masterpass. *This component is currently in beta and is subject to change.*
 */

var BraintreeError = _dereq_('../lib/braintree-error');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var browserDetection = _dereq_('./shared/browser-detection');
var Masterpass = _dereq_('./external/masterpass');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var VERSION = "3.42.0";
var errors = _dereq_('./shared/errors');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} [callback] The second argument, `data`, is the {@link Masterpass} instance. If no callback is passed in, the create function returns a promise that resolves the {@link Masterpass} instance.
 * @example
 * braintree.masterpass.create({
 *   client: clientInstance
 * }, function (createErr, masterpassInstance) {
 *   if (createErr) {
 *     if (createErr.code === 'MASTERPASS_BROWSER_NOT_SUPPORTED') {
 *       console.error('This browser is not supported.');
 *     } else {
 *       console.error('Error!', createErr);
 *     }
 *     return;
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'Masterpass';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    if (!isSupported()) {
      return Promise.reject(new BraintreeError(errors.MASTERPASS_BROWSER_NOT_SUPPORTED));
    }

    return Promise.resolve();
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var masterpassInstance, configuration;

    options.client = client;
    configuration = options.client.getConfiguration().gatewayConfiguration;

    if (!configuration.masterpass) {
      return Promise.reject(new BraintreeError(errors.MASTERPASS_NOT_ENABLED));
    }

    masterpassInstance = new Masterpass(options);

    return masterpassInstance._initialize();
  });
}

/**
 * @static
 * @function isSupported
 * @description Returns true if Masterpass supports this browser.
 * @example
 * if (braintree.masterpass.isSupported()) {
 *   // Add Masterpass button to the page
 * } else {
 *   // Hide Masterpass payment option
 * }
 * @returns {Boolean} Returns true if Masterpass supports this browser.
 */
function isSupported() {
  return Boolean(global.popupBridge || browserDetection.supportsPopups());
}

module.exports = {
  create: wrapPromise(create),
  isSupported: isSupported,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./external/masterpass":135,"./shared/browser-detection":137,"./shared/errors":139,"@braintree/wrap-promise":25}],137:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  supportsPopups: _dereq_('@braintree/browser-detection/supports-popups')
};


},{"@braintree/browser-detection/supports-popups":16}],138:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  LANDING_FRAME_NAME: 'braintreemasterpasslanding',
  POPUP_WIDTH: 450,
  POPUP_HEIGHT: 660,
  MASTERPASS_VERSION: 'v6',
  REQUIRED_OPTIONS_FOR_TOKENIZE: [
    'subtotal',
    'currencyCode'
  ]
};

},{}],139:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Masterpass - Creation Error Codes
 * @description Errors that occur when [creating the Masterpass component](/current/module-braintree-web_masterpass#.create).
 * @property {CUSTOMER} MASTERPASS_BROWSER_NOT_SUPPORTED Occurs when browser is not a supported browser for Masterpass.
 * @property {MERCHANT} MASTERPASS_NOT_ENABLED Occurs when Masterpass is not enabled in the Braintree contorl panel.
 */

/**
 * @name BraintreeError.Masterpass - Tokenize Error Codes
 * @description Errors that occur when [tokenizing](/current/Masterpass.html#tokenize).
 * @property {MERCHANT} MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION Occurs when tokenize is called without a required option.
 * @property {MERCHANT} MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS Occurs if tokenization flow is intialized while another flow is already in progress.
 * @property {NETWORK} MASTERPASS_ACCOUNT_TOKENIZATION_FAILED Occurs when tokenization of Masterpass details fails.
 * @property {MERCHANT} MASTERPASS_POPUP_OPEN_FAILED Occurs when the popup fails to open.
 * @property {MERCHANT} MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS Occurs when Masterpass is missing required parameters for tokenization.
 * @property {CUSTOMER} MASTERPASS_POPUP_CLOSED Occurs when the popup is closed by the customer.
 * @property {MERCHANT} MASTERPASS_INVALID_PAYMENT_OPTION Occurs when an invalid payment option is used to tokenize Masterpass.
 * @property {NETWORK} MASTERPASS_FLOW_FAILED Occurs when an error is returned from request to tokenize.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  MASTERPASS_BROWSER_NOT_SUPPORTED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'MASTERPASS_BROWSER_NOT_SUPPORTED',
    message: 'Browser is not supported.'
  },
  MASTERPASS_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'MASTERPASS_NOT_ENABLED',
    message: 'Masterpass is not enabled for this merchant.'
  },
  MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION',
    message: 'Missing required option for tokenize.'
  },
  MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS',
    message: 'Masterpass tokenization is already in progress.'
  },
  MASTERPASS_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'MASTERPASS_ACCOUNT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s Masterpass account.'
  },
  MASTERPASS_POPUP_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'MASTERPASS_POPUP_OPEN_FAILED',
    message: 'Masterpass popup failed to open. Make sure to tokenize in response to a user action, such as a click.'
  },
  MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS: {
    type: BraintreeError.types.MERCHANT,
    code: 'MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS',
    message: 'Masterpass popup failed to return all required parameters needed to continue tokenization.'
  },
  MASTERPASS_POPUP_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'MASTERPASS_POPUP_CLOSED',
    message: 'Customer closed Masterpass popup before authorizing.'
  },
  MASTERPASS_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'MASTERPASS_INVALID_PAYMENT_OPTION',
    message: 'Masterpass payment options are invalid.'
  },
  MASTERPASS_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'MASTERPASS_FLOW_FAILED',
    message: 'Could not initialize Masterpass flow.'
  }
};


},{"../../lib/braintree-error":91}],140:[function(_dereq_,module,exports){
(function (global){
'use strict';

var analytics = _dereq_('../../lib/analytics');
var assign = _dereq_('../../lib/assign').assign;
var Bus = _dereq_('../../lib/bus');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var generateGooglePayConfiguration = _dereq_('../../lib/generate-google-pay-configuration');
var iFramer = _dereq_('@braintree/iframer');
var uuid = _dereq_('../../lib/vendor/uuid');
var useMin = _dereq_('../../lib/use-min');
var methods = _dereq_('../../lib/methods');
var Promise = _dereq_('../../lib/promise');
var EventEmitter = _dereq_('../../lib/event-emitter');
var BraintreeError = _dereq_('../../lib/braintree-error');
var VERSION = "3.42.0";
var constants = _dereq_('../shared/constants');
var events = constants.events;
var errors = constants.errors;
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @typedef {object} PaymentRequestComponent~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {object} details.rawPaymentResponse The raw payment response from the payment request, with sensitive card details removed.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, `CreditCard` or `AndroidPayCard`.
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
 * @typedef {object} PaymentRequestComponent~paymentRequestConfiguration
 * @property {object} configuration.details The payment details. For details on this object, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_payment_details).
 * @property {array} [configuration.supportedPaymentMethods] The supported payment methods. If not passed in, the supported payment methods from the merchant account that generated the authorization for the client will be used. For details on this array, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_supported_payment_methods).
 * @property {object} [configuration.options] Additional payment request options. For details on this object, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_options_optional).
 */

/**
 * @typedef {object} PaymentRequestComponent~shippingEventObject
 * @description The event payload sent from {@link PaymentRequestComponent#on|on}.
 * @property {object} target An object which contains data about the event.
 * @property {function} updateWith A method to call with the updated Payment Request details.
 */

/**
 * @name PaymentRequestComponent#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. `event` should be {@link PaymentRequestComponent#event:shippingAddressChange|shippingAddressChange} or {@link PaymentRequestComponent#event:shippingOptionChange|shippingOptionChange}. For convenience, you can also listen on `shippingaddresschange` or `shippingoptionchange` to match the event listeners in the [Payment Request API documentation](https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request#shipping_in_payment_request_api). Events will emit a {@link PaymentRequestComponent~shippingEventObject|shippingEventObject}.
 * @example
 * <caption>Listening to a Payment Request event, in this case 'shippingAddressChange'</caption>
 * braintree.paymentRequest.create({ ... }, function (createErr, paymentRequestInstance) {
 *   paymentRequestInstance.on('shippingAddressChange', function (event) {
 *     console.log(event.target.shippingAddress);
 *   });
 * });
 * @returns {void}
 */

/**
 * This event is emitted when the customer selects a shipping address.
 * @event PaymentRequestComponent#shippingAddressChange
 * @type {PaymentRequestComponent~shippingEventObject}
 * @example
 * <caption>Listening to a shipping address change event</caption>
 * braintree.paymentRequest.create({ ... }, function (createErr, paymentRequestInstance) {
 *   paymentRequestInstance.on('shippingAddressChange', function (event) {
 *     // validate event.target.shippingAddress if needed
 *
 *     event.updateWith(paymentRequestDetails);
 *   });
 * });
 */

/**
 * This event is emitted when the customer selects a shipping option.
 * @event PaymentRequestComponent#shippingOptionChange
 * @type {PaymentRequestComponent~shippingEventObject}
 * @example
 * <caption>Listening to a shipping option change event</caption>
 * braintree.paymentRequest.create({ ... }, function (createErr, paymentRequestInstance) {
 *   paymentRequestInstance.on('shippingOptionChange', function (event) {
 *     // validate event.target.shippingOption if needed
 *
 *     paymentRequestDetails.shippingOptions.forEach(function (option) {
 *       option.selected = option.id === event.target.shippingOption;
 *     });
 *
 *     event.updateWith(paymentRequestDetails);
 *   });
 * });
 */

var CARD_TYPE_MAPPINGS = {
  Visa: 'visa',
  MasterCard: 'mastercard',
  'American Express': 'amex',
  'Diners Club': 'diners',
  Discover: 'discover',
  JCB: 'jcb',
  UnionPay: 'unionpay',
  Maestro: 'maestro'
};

var BRAINTREE_GOOGLE_PAY_MERCHANT_ID = '18278000977346790994';

function composeUrl(assetsUrl, componentId, isDebug) {
  var baseUrl = assetsUrl;

  // endRemoveIf(production)

  return baseUrl + '/web/' + VERSION + '/html/payment-request-frame' + useMin(isDebug) + '.html#' + componentId;
}

/**
 * @class PaymentRequestComponent
 * @param {object} options The Payment Request Component {@link module:braintree-web/payment-request.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/payment-request.create|braintree-web.payment-request.create} instead.</strong>
 *
 * @classdesc This class represents a Payment Request component produced by {@link module:braintree-web/payment-request.create|braintree-web/payment-request.create}. Instances of this class have methods for initializing a Payment Request.
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 */
function PaymentRequestComponent(options) {
  var enabledPaymentMethods = options.enabledPaymentMethods || {};

  EventEmitter.call(this);

  this._componentId = uuid();
  this._client = options.client;
  this._enabledPaymentMethods = {
    basicCard: enabledPaymentMethods.basicCard !== false,
    googlePay: enabledPaymentMethods.googlePay !== false
  };
  this._googlePayVersion = options.googlePayVersion === 2 ? 2 : 1;
  this._googleMerchantId = BRAINTREE_GOOGLE_PAY_MERCHANT_ID;
  this._supportedPaymentMethods = this._constructDefaultSupportedPaymentMethods();
  this._defaultSupportedPaymentMethods = Object.keys(this._supportedPaymentMethods).map(function (key) {
    return this._supportedPaymentMethods[key];
  }.bind(this));
  this._bus = new Bus({channel: this._componentId});
}

PaymentRequestComponent.prototype = Object.create(EventEmitter.prototype, {
  constructor: PaymentRequestComponent
});

PaymentRequestComponent.prototype._constructDefaultSupportedPaymentMethods = function () {
  var configuration = this._client.getConfiguration();
  var androidPayConfiguration = configuration.gatewayConfiguration.androidPay;
  var cardConfiguration = configuration.gatewayConfiguration.creditCards;
  var supportedPaymentMethods = {};

  if (this._enabledPaymentMethods.basicCard && cardConfiguration && cardConfiguration.supportedCardTypes.length > 0) {
    supportedPaymentMethods.basicCard = {
      supportedMethods: 'basic-card',
      data: {
        supportedNetworks: cardConfiguration.supportedCardTypes.reduce(function (types, cardType) {
          if (cardType in CARD_TYPE_MAPPINGS) {
            types.push(CARD_TYPE_MAPPINGS[cardType]);
          }

          return types;
        }, [])
      }
    };
  }

  if (this._enabledPaymentMethods.googlePay && androidPayConfiguration && androidPayConfiguration.enabled) {
    supportedPaymentMethods.googlePay = {
      supportedMethods: 'https://google.com/pay',
      data: generateGooglePayConfiguration(
        configuration, this._googlePayVersion, this._googleMerchantId
      )
    };
  }

  return supportedPaymentMethods;
};

PaymentRequestComponent.prototype.initialize = function () {
  var clientConfiguration = this._client.getConfiguration();
  var self = this;

  this._frame = iFramer({
    allowPaymentRequest: true,
    name: 'braintree-payment-request-frame',
    'class': 'braintree-payment-request-frame',
    height: 0,
    width: 0,
    style: {
      position: 'absolute',
      left: '-9999px'
    },
    title: 'Secure Payment Frame'
  });

  if (this._defaultSupportedPaymentMethods.length === 0) {
    return Promise.reject(new BraintreeError(errors.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS));
  }

  return new Promise(function (resolve) {
    self._bus.on(events.FRAME_READY, function (reply) {
      reply(self._client);
    });
    self._bus.on(events.FRAME_CAN_MAKE_REQUESTS, function () {
      analytics.sendEvent(self._client, 'payment-request.initialized');
      self._bus.on(events.SHIPPING_ADDRESS_CHANGE, function (shippingAddress) {
        var shippingAddressChangeEvent = {
          target: {
            shippingAddress: shippingAddress
          },
          updateWith: function (paymentDetails) {
            self._bus.emit(events.UPDATE_SHIPPING_ADDRESS, paymentDetails);
          }
        };

        self._emit('shippingAddressChange', shippingAddressChangeEvent);
        self._emit('shippingaddresschange', shippingAddressChangeEvent);
      });
      self._bus.on(events.SHIPPING_OPTION_CHANGE, function (shippingOption) {
        var shippingOptionChangeEvent = {
          target: {
            shippingOption: shippingOption
          },
          updateWith: function (paymentDetails) {
            self._bus.emit(events.UPDATE_SHIPPING_OPTION, paymentDetails);
          }
        };

        self._emit('shippingOptionChange', shippingOptionChangeEvent);
        self._emit('shippingoptionchange', shippingOptionChangeEvent);
      });
      resolve(self);
    });

    // TODO - We may need to apply the same setTimeout hack that Hosted Fields
    // uses for iframes to load correctly in Edge. See:
    // https://github.com/braintree/braintree-web/blob/0c951e5f9859c606652485de14188b6bd6656677/src/hosted-fields/external/hosted-fields.js#L449-L469
    self._frame.src = composeUrl(clientConfiguration.gatewayConfiguration.assetsUrl, self._componentId, clientConfiguration.isDebug);
    document.body.appendChild(self._frame);
  });
};

/**
 * Create an object to pass into tokenize to specify a custom configuration. If no overrides are provided, the default configuration will be provided.
 * @public
 * @param {string} type The supported payment method type. Possible values are `basicCard` and `googlePay`.
 * If no type is provided, the function will throw an error. If the type provided is not an enabled payemnt method for the merchant account , the function will throw an error.
 * @param {object} [overrides] The configuration overrides for the [data property on the supported payment methods objects](https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request). If not passed in, the default configuration for the specified type will be provided. If a property is not provided, the value from the default configruation will be used.
 * @example <caption>Getting the default configuration for a specified type</caption>
 * var configuration = paymentRequestInstance.createSupportedPaymentMethodsConfiguration('basicCard');
 *
 * configuration.supportedMethods; // 'basic-card'
 * configuration.data.supportedNetworks; // ['visa', 'mastercard', 'amex'] <- whatever the supported card networks for the merchant account are
 * @example <caption>Specifying overrides</caption>
 * var configuration = paymentRequestInstance.createSupportedPaymentMethodsConfiguration('basicCard', {
 *   supportedNetworks: ['visa'],
 *   supportedTypes: ['credit', 'debit']
 * });
 *
 * configuration.supportedMethods; // 'basic-card'
 * configuration.data.supportedNetworks; // ['visa']
 * configuration.data.supportedTypes; // ['credit', 'debit']
 * @returns {object} Returns a configuration object for use in the tokenize function.
 */
PaymentRequestComponent.prototype.createSupportedPaymentMethodsConfiguration = function (type, overrides) {
  var configuration;

  if (!type) {
    throw new BraintreeError(errors.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE);
  }

  if (!this._enabledPaymentMethods[type]) {
    throw new BraintreeError(errors.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED);
  }

  configuration = assign({}, this._supportedPaymentMethods[type]);
  configuration.data = assign({}, configuration.data, overrides);

  return configuration;
};

/**
 * Tokenizes a Payment Request
 * @public
 * @param {object} configuration A {@link PaymentRequestComponent~paymentRequestConfiguration|paymentRequestConfiguration}.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link PaymentRequest~paymentPayload|paymentPayload}. If no callback is provided, `tokenize` returns a function that resolves with a {@link PaymentRequestComponent~tokenizePayload|tokenizePayload}.
 * @example
 * paymentRequestInstance.tokenize({
 *   details: {
 *     total: {
 *       label: 'Price',
 *       amount: {
 *         currency: 'USD',
 *         value: '100.00'
 *       }
 *     }
 *   }
 * }).then(function (payload) {
 *   // send payload.nonce to server
 *
 *   // examine the raw response (with card details removed for security) from the payment request
 *   console.log(payload.details.rawPaymentResponse);
 * }).catch(function (err) {
 *   if (err.code === 'PAYMENT_REQUEST_CANCELED') {
 *     // payment request was canceled by user
 *   } else {
 *     // an error occurred while processing
 *   }
 * });
 * @example <caption>Tokenize only Visa cards</caption>
 * var basicCardConfiguration = paymentRequestInstance.createSupportedPaymentMethodsConfiguration('basicCard', {
 *   supportedNetworks: ['visa']
 * };
 *
 * paymentRequestInstance.tokenize({
 *   supportedPaymentMethods: [basicCardConfiguration],
 *   details: {
 *     total: {
 *       label: 'Price',
 *       amount: {
 *         currency: 'USD',
 *         value: '100.00'
 *       }
 *     }
 *   }
 * }).then(function (payload) {
 *   // send payload.nonce to your server
 * });
 * @example <caption>Include payment request options</caption>
 * paymentRequestInstance.tokenize({
 *   details: {
 *     total: {
 *       label: 'Price',
 *       amount: {
 *         currency: 'USD',
 *         value: '100.00'
 *       }
 *     }
 *   },
 *   options: {
 *     requestPayerName: true,
 *     requestPayerPhone: true,
 *     requestPayerEmail: true
 *   }
 * }).then(function (payload) {
 *   // send payload.nonce to your server
 *   // collect additional info from the raw response
 *   console.log(payload.details.rawPaymentResponse);
 * });
 * @example <caption>Request Shipping Information</caption>
 * var shippingOptions = [
 *   {
 *     id: 'economy',
 *     label: 'Economy Shipping (5-7 Days)',
 *     amount: {
 *       currency: 'USD',
 *       value: '0',
 *     },
 *   }, {
 *     id: 'express',
 *     label: 'Express Shipping (2-3 Days)',
 *     amount: {
 *       currency: 'USD',
 *       value: '5',
 *     },
 *   }, {
 *     id: 'next-day',
 *     label: 'Next Day Delivery',
 *     amount: {
 *       currency: 'USD',
 *       value: '12',
 *     },
 *   },
 * ];
 * var paymentDetails = {
 * 	 total: {
 *     label: 'Total',
 *     amount: {
 *       currency: 'USD',
 *       value: '10.00',
 *     }
 *   },
 *   shippingOptions: shippingOptions
 * };
 *
 * paymentRequestInstance.on('shippingAddressChange', function (event) {
 *   // validate shipping address on event.target.shippingAddress
 *   // make changes to the paymentDetails or shippingOptions if necessary
 *
 *   event.updateWith(paymentDetails)
 * });
 *
 * paymentRequestInstance.on('shippingOptionChange', function (event) {
 *   shippingOptions.forEach(function (option) {
 *     option.selected = option.id === event.target.shippingOption;
 *   });
 *
 *   event.updateWith(paymentDetails)
 * });
 *
 * paymentRequestInstance.tokenize({
 *   details: paymentDetails,
 *   options: {
 *     requestShipping: true
 *   }
 * }).then(function (payload) {
 *   // send payload.nonce to your server
 *   // collect shipping information from payload
 *   console.log(payload.details.rawPaymentResponse.shippingAddress);
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PaymentRequestComponent.prototype.tokenize = function (configuration) {
  var self = this;

  // NEXT_MAJOR_VERSION fail early if a payment method is passed in
  // that the component does not support
  return new Promise(function (resolve, reject) {
    self._bus.emit(events.PAYMENT_REQUEST_INITIALIZED, {
      supportedPaymentMethods: configuration.supportedPaymentMethods || self._defaultSupportedPaymentMethods,
      details: configuration.details,
      options: configuration.options
    }, function (response) {
      var rawError = response[0];
      var payload = response[1];

      if (rawError) {
        reject(self._formatTokenizationError(rawError));

        return;
      }

      analytics.sendEvent(self._client, 'payment-request.tokenize.succeeded');
      resolve({
        nonce: payload.nonce,
        type: payload.type,
        description: payload.description,
        details: {
          rawPaymentResponse: payload.details.rawPaymentResponse,
          cardType: payload.details.cardType,
          lastFour: payload.details.lastFour,
          lastTwo: payload.details.lastTwo
        },
        binData: payload.binData
      });
    });
  });
};

/**
 * Check if the customer can make payments.
 * @public
 * @param {object} configuration A {@link PaymentRequestComponent~paymentRequestConfiguration|paymentRequestConfiguration}.
 * @param {callback} [callback] Called on completion.
 * @example
 * var paymentDetails = {
 * 	 total: {
 *     label: 'Total',
 *     amount: {
 *       currency: 'USD',
 *       value: '10.00',
 *     }
 *   }
 * };
 *
 * paymentRequestInstance.canMakePayment({
 *   details: paymentDetails
 * }).then(function (result) {
 *   if (result) {
 *     // set up payment request button
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PaymentRequestComponent.prototype.canMakePayment = function (configuration) {
  var self = this;
  var unsupportedPaymentMethod;

  // NEXT_MAJOR_VERSION Move this check to component creation
  if (!global.PaymentRequest) {
    analytics.sendEvent(self._client, 'payment-request.can-make-payment.not-available');

    return Promise.resolve(false);
  }

  if (configuration.supportedPaymentMethods) {
    configuration.supportedPaymentMethods.forEach(function (config) {
      var supportedMethods = config.supportedMethods;

      if (!(supportedMethods in constants.SUPPORTED_METHODS)) {
        unsupportedPaymentMethod = supportedMethods;
      }
    });

    if (unsupportedPaymentMethod) {
      return Promise.reject(new BraintreeError({
        type: errors.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.type,
        code: errors.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.code,
        message: unsupportedPaymentMethod + ' is not a supported payment method.'
      }));
    }
  }

  return new Promise(function (resolve, reject) {
    self._bus.emit(events.CAN_MAKE_PAYMENT, {
      supportedPaymentMethods: configuration.supportedPaymentMethods || self._defaultSupportedPaymentMethods,
      details: configuration.details,
      options: configuration.options
    }, function (response) {
      var error = response[0];
      var payload = response[1];

      if (error) {
        reject(self._formatCanMakePaymentError(error));

        return;
      }

      analytics.sendEvent(self._client, 'payment-request.can-make-payment.' + payload);

      resolve(payload);
    });
  });
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/payment-request.create|create}.
 * @public
 * @param {callback} [callback] Called on completion.
 * @example
 * paymentRequestInstance.teardown();
 * @example <caption>With callback</caption>
 * paymentRequestInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PaymentRequestComponent.prototype.teardown = function () {
  this._bus.teardown();
  this._frame.parentNode.removeChild(this._frame);

  convertMethodsToError(this, methods(PaymentRequestComponent.prototype));

  analytics.sendEvent(this._client, 'payment-request.teardown-completed');

  return Promise.resolve();
};

PaymentRequestComponent.prototype._formatTokenizationError = function (error) {
  var formattedError;

  switch (error.name) {
    case 'AbortError':
      formattedError = new BraintreeError({
        type: errors.PAYMENT_REQUEST_CANCELED.type,
        code: errors.PAYMENT_REQUEST_CANCELED.code,
        message: errors.PAYMENT_REQUEST_CANCELED.message,
        details: {
          originalError: error
        }
      });

      analytics.sendEvent(this._client, 'payment-request.tokenize.canceled');

      return formattedError;
    case 'PAYMENT_REQUEST_INITIALIZATION_FAILED':
      formattedError = new BraintreeError({
        type: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,
        code: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,
        message: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,
        details: {
          originalError: error
        }
      });
      break;
    case 'BRAINTREE_GATEWAY_GOOGLE_PAYMENT_TOKENIZATION_ERROR':
      formattedError = new BraintreeError({
        type: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.type,
        code: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.code,
        message: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.message,
        details: {
          originalError: error
        }
      });
      break;
    case 'BRAINTREE_GATEWAY_GOOGLE_PAYMENT_PARSING_ERROR':
      formattedError = new BraintreeError({
        type: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.type,
        code: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.code,
        message: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.message,
        details: {
          originalError: error
        }
      });
      break;
    default:
      formattedError = new BraintreeError({
        code: errors.PAYMENT_REQUEST_NOT_COMPLETED.code,
        type: error.type || BraintreeError.types.CUSTOMER,
        message: errors.PAYMENT_REQUEST_NOT_COMPLETED.message,
        details: {
          originalError: error
        }
      });
  }

  analytics.sendEvent(this._client, 'payment-request.tokenize.failed');

  return formattedError;
};

PaymentRequestComponent.prototype._formatCanMakePaymentError = function (error) {
  var formattedError;

  switch (error.name) {
    case 'PAYMENT_REQUEST_INITIALIZATION_FAILED':
      formattedError = new BraintreeError({
        type: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,
        code: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,
        message: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,
        details: {
          originalError: error
        }
      });
      break;
    case 'NotAllowedError':
      formattedError = new BraintreeError({
        type: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.type,
        code: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.code,
        message: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.message,
        details: {
          originalError: error
        }
      });
      break;
    default:
      formattedError = new BraintreeError({
        code: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.code,
        type: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.type,
        message: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.message,
        details: {
          originalError: error
        }
      });
  }

  analytics.sendEvent(this._client, 'payment-request.can-make-payment.failed');

  return formattedError;
};

module.exports = wrapPromise.wrapPrototype(PaymentRequestComponent);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/analytics":86,"../../lib/assign":88,"../../lib/braintree-error":91,"../../lib/bus":94,"../../lib/convert-methods-to-error":97,"../../lib/event-emitter":106,"../../lib/generate-google-pay-configuration":119,"../../lib/methods":124,"../../lib/promise":126,"../../lib/use-min":128,"../../lib/vendor/uuid":130,"../shared/constants":142,"@braintree/iframer":18,"@braintree/wrap-promise":25}],141:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/payment-request
 * @description A component to integrate with the Payment Request API.
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 * */

var PaymentRequestComponent = _dereq_('./external/payment-request');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var VERSION = "3.42.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {object} [options.enabledPaymentMethods] An object representing which payment methods to display.
 * @param {boolean} [options.enabledPaymentMethods.basicCard=true] Whether or not to display credit card as an option in the Payment Request dialog. If left blank or set to true, credit cards will be displayed in the dialog if the merchant account is set up to process credit cards.
 * @param {boolean} [options.enabledPaymentMethods.googlePay=true] Whether or not to display Google Pay as an option in the Payment Request dialog. If left blank or set to true, Google Pay will be displayed in the dialog if the merchant account is set up to process Google Pay.
 * @param {Number} [options.googlePayVersion=1] Ignored if `options.enabledPaymentMethods.googlePay = false`. If `true`, this option specifies the version of Google Pay to use. Choose either 1 (default) or 2.
 * @param {callback} [callback] The second argument, `data`, is the {@link PaymentRequestComponent} instance. If no callback is provided, `create` returns a promise that resolves with the {@link PaymentRequestComponent} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * if (window.PaymentRequest) {
 *   braintree.paymentRequest.create({
 *     client: clientInstance
 *   }, cb);
 * } else {
 *   // fall back to Hosted Fields if browser does not support Payment Request API
 *   braintree.hostedFields.create(hostedFieldsOptions, cb);
 * }
 * @example <caption>Explicitly turning off credit cards from Payment Request API dialog</caption>
 * braintree.paymentRequest.create({
 *   client: clientInstance,
 *   enabledPaymentMethods: {
 *     googlePay: true,
 *     basicCard: false
 *   }
 * }, cb);
 * @example <caption>Using Google Pay v2 or basic card</caption>
 * braintree.paymentRequest.create({
 *   client: clientInstance,
 *   enabledPaymentMethods: {
 *     basicCard: true,
 *     googlePay: true
 *   },
 *   googlePayVersion: 2
 * }, cb);
 *
 */
function create(options) {
  var name = 'Payment Request';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var paymentRequestInstance;

    options.client = client;
    paymentRequestInstance = new PaymentRequestComponent(options);

    return paymentRequestInstance.initialize();
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"./external/payment-request":140,"@braintree/wrap-promise":25}],142:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');
var errors = _dereq_('./errors');

var constants = {};

constants.events = enumerate([
  'CAN_MAKE_PAYMENT',
  'FRAME_READY',
  'FRAME_CAN_MAKE_REQUESTS',
  'PAYMENT_REQUEST_INITIALIZED',
  'SHIPPING_ADDRESS_CHANGE',
  'UPDATE_SHIPPING_ADDRESS',
  'SHIPPING_OPTION_CHANGE',
  'UPDATE_SHIPPING_OPTION'
], 'payment-request:');

constants.errors = errors;

constants.SUPPORTED_METHODS = {
  'basic-card': true,
  'https://google.com/pay': true
};

module.exports = constants;

},{"../../lib/enumerate":104,"./errors":143}],143:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Payment Request - Creation Error Codes
 * @description Errors that occur when [creating the Payment Request component](/current/module-braintree-web_payment-request.html#.create).
 * @property {MERCHANT} PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS Occurs when there are no valid payment methods configured.
 */

/**
 * @name BraintreeError.Payment Request - createSupportedPaymentMethodsConfiguration  Error Codes
 * @description Errors that occur when using the [`createSupportedPaymentMethodsConfiguration` method](/current/PaymentRequestComponent.html#createSupportedPaymentMethodsConfiguration)
 * @property {MERCHANT} PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE Occurs when no type is supplied for method.
 * @property {MERCHANT} PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED Occurs when configured type is not enabled.
 */

/**
 * @name BraintreeError.Payment Request - tokenize  Error Codes
 * @description Errors that occur when using the [`tokenize` method](/current/PaymentRequestComponent.html#tokenize)
 * @property {CUSTOMER} PAYMENT_REQUEST_CANCELED Occurs when customer cancels the Payment Request.
 * @property {MERCHANT} PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED Occurs when the Payment Request is closed do to the options being misconfigured.
 * @property {MERCHANT} PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE Occurs when a Google Payment payment method is unable to be tokenized.
 * @property {UNKNOWN} PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR Occurs when the result of tokenizing a Google Payment payment method could not be parsed.
 * @property {CUSTOMER} PAYMENT_REQUEST_NOT_COMPLETED Occurs when an error prevented the Payment Request from being completed.
 */

/**
 * @name BraintreeError.Payment Request - canMakePayment  Error Codes
 * @description Errors that occur when using the [`canMakePayment` method](/current/PaymentRequestComponent.html#canMakePayment)
 * @property {MERCHANT} PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED Occurs when the Payment Request is intatiated with misconfigured options.
 * @property {MERCHANT} PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED Occurs when `canMakePayment` results in a `DomException` with a `NotAllowedError`. This usually occurs when `canMakePayment` is called multiple times with different supported payment options.
 * @property {MERCHANT} PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD Occurs when `canMakePayment` is called with a `supportedPaymentMethods` array that contains a payment method that is not supported by the Braintree SDK.
 * @property {UNKNOWN} PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED Occurs when `canMakePayment` fails for any reason other than a misconfigured Payment Request object.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS',
    message: 'There are no supported payment methods associated with this account.'
  },
  PAYMENT_REQUEST_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'PAYMENT_REQUEST_CANCELED',
    message: 'Payment request was canceled.'
  },
  PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED',
    message: 'Something went wrong when configuring the payment request.'
  },
  PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED',
    message: 'Something went wrong when calling `canMakePayment`'
  },
  PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED',
    message: 'Something went wrong when calling `canMakePayment`. Most likely, `canMakePayment` was called multiple times with different supportedMethods configurations.'
  },
  PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD'
  },
  PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE',
    message: 'Something went wrong when tokenizing the Google Pay card.'
  },
  PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR',
    message: 'Something went wrong when tokenizing the Google Pay card.'
  },
  PAYMENT_REQUEST_NOT_COMPLETED: {
    code: 'PAYMENT_REQUEST_NOT_COMPLETED',
    message: 'Payment request could not be completed.'
  },
  PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE',
    message: 'createSupportedPaymentMethodsConfiguration must include a type parameter.'
  },
  PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED',
    message: 'createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled.'
  }
};

},{"../../lib/braintree-error":91}],144:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.PayPal Checkout - Creation Error Codes
 * @description Errors that occur when [creating the PayPal Checkout component](/current/module-braintree-web_paypal-checkout.html#.create).
 * @property {MERCHANT} PAYPAL_NOT_ENABLED Occurs when PayPal is not enabled on the Braintree control panel.
 * @property {MERCHANT} PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED Occurs only when testing in Sandbox, when a PayPal sandbox account is not linked to the merchant account in the Braintree control panel.
 */

/**
 * @name BraintreeError.PayPal Checkout - createPayment Error Codes
 * @description Errors that occur when using the [`createPayment` method](/current/PayPalCheckout.html#createPayment).
 * @property {MERCHANT} PAYPAL_FLOW_OPTION_REQUIRED Occurs when a required option is missing.
 * @property {MERCHANT} PAYPAL_INVALID_PAYMENT_OPTION Occurs when an option contains an invalid value.
 * @property {NETWORK} PAYPAL_FLOW_FAILED Occurs when something goes wrong when initializing the flow.
 */

/**
 * @name BraintreeError.PayPal Checkout - tokenizePayment Error Codes
 * @description Errors that occur when using the [`tokenizePayment` method](/current/PayPalCheckout.html#tokenizePayment).
 * @property {NETWORK} PAYPAL_ACCOUNT_TOKENIZATION_FAILED Occurs when PayPal account could not be tokenized.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_NOT_ENABLED',
    message: 'PayPal is not enabled for this merchant.'
  },
  PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED',
    message: 'A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing for details on linking your PayPal sandbox with Braintree.'
  },
  PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s PayPal account.'
  },
  PAYPAL_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_FLOW_FAILED',
    message: 'Could not initialize PayPal flow.'
  },
  PAYPAL_FLOW_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_FLOW_OPTION_REQUIRED',
    message: 'PayPal flow property is invalid or missing.'
  },
  PAYPAL_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_INVALID_PAYMENT_OPTION',
    message: 'PayPal payment options are invalid.'
  }
};

},{"../lib/braintree-error":91}],145:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/paypal-checkout
 * @description A component to integrate with the [PayPal Checkout.js library](https://github.com/paypal/paypal-checkout).
 */

var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var PayPalCheckout = _dereq_('./paypal-checkout');
var VERSION = "3.42.0";

/**
 * @static
 * @function create
 * @description There are two ways to integrate the PayPal Checkout component. See the [PayPal Checkout constructor documentation](PayPalCheckout.html#PayPalCheckout) for more information and examples.
 *
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {string} [options.merchantAccountId] A non-default merchant account ID to use for tokenization.
 * @param {callback} [callback] The second argument, `data`, is the {@link PayPalCheckout} instance.
 * @example
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   // set up checkout.js
 * }).catch(function (err) {
 *   console.error('Error!', err);
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'PayPal Checkout';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    var instance = new PayPalCheckout(options);

    return instance._initialize(options);
  });
}

/**
 * @static
 * @function isSupported
 * @description Returns true if PayPal Checkout [supports this browser](index.html#browser-support-webviews).
 * @deprecated Previously, this method checked for Popup support in the browser. Checkout.js now falls back to a modal if popups are not supported.
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
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"./paypal-checkout":146,"@braintree/wrap-promise":25}],146:[function(_dereq_,module,exports){
'use strict';

var analytics = _dereq_('../lib/analytics');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var BraintreeError = _dereq_('../lib/braintree-error');
var convertToBraintreeError = _dereq_('../lib/convert-to-braintree-error');
var errors = _dereq_('./errors');
var constants = _dereq_('../paypal/shared/constants');
var methods = _dereq_('../lib/methods');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');

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
 * Not available to all merchants; [contact PayPal](https://developers.braintreepayments.com/support/guides/paypal/setup-guide#contacting-paypal-support) for details on eligibility and enabling this feature.
 * Alternatively, see `shippingAddress` above as an available client option.
 * @property {string} details.billingAddress.line1 Street number and name.
 * @property {string} details.billingAddress.line2 Extended address.
 * @property {string} details.billingAddress.city City or locality.
 * @property {string} details.billingAddress.state State or region.
 * @property {string} details.billingAddress.postalCode Postal code.
 * @property {string} details.billingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} creditFinancingOffered This property will only be present when the customer pays with PayPal Credit.
 * @property {object} creditFinancingOffered.totalCost This is the estimated total payment amount including interest and fees the user will pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalCost.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalCost.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {number} creditFinancingOffered.term Length of financing terms in months.
 * @property {object} creditFinancingOffered.monthlyPayment This is the estimated amount per month that the customer will need to pay including fees and interest.
 * @property {string} creditFinancingOffered.monthlyPayment.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.monthlyPayment.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {object} creditFinancingOffered.totalInterest Estimated interest or fees amount the payer will have to pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalInterest.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalInterest.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {boolean} creditFinancingOffered.payerAcceptance Status of whether the customer ultimately was approved for and chose to make the payment using the approved installment credit.
 * @property {boolean} creditFinancingOffered.cartAmountImmutable Indicates whether the cart amount is editable after payer's acceptance on PayPal side.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/paypal-checkout.create|paypal-checkout.create}
 * @classdesc This class represents a PayPal Checkout component that coordinates with the {@link https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4|PayPal checkout.js} library. Instances of this class can generate payment data and tokenize authorized payments.
 *
 * All UI (such as preventing actions on the parent page while authentication is in progress) is managed by {@link https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4|checkout.js}.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/paypal-checkout.create|braintree-web.paypal-checkout.create} instead.</strong>
 *
 * You must have PayPal's checkout.js script loaded on your page to use PayPal Checkout. You can either use the [paypal-checkout package on npm](https://www.npmjs.com/package/paypal-checkout) with a build tool or use a script hosted by PayPal:
 *
 * ```html
 * <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4 log-level="warn"></script>
 * ```
 *
 * Once you have the script loaded, there are two ways to integrate with the checkout.js library.
 *
 * #### Pass a Braintree object into checkout.js
 *
 * You can pass a `braintree` object into PayPal's checkout.js library. This will create the necessary Braintree {@link moudle:braintree-web/client.create|client} and {@link moudle:braintree-web/paypal-checkout.create|PayPal Checkout} components and automatically tokenize the authorized PayPal account. Use this integration option if you are not integrating with any other Braintree components.
 *
 * ```javascript
 * paypal.Button.render({
 *   braintree: braintree, // this object is available on the window by including the client and paypal-checkout component scripts on the page
 *   client: {
 *     production: 'production_authorization',
 *     sandbox: 'sandbox_authorization'
 *   },
 *
 *   env: 'production', // or 'sandbox'
 *
 *   payment: function (data, actions) {
 *     return actions.braintree.create({
 *       // your createPayment options here
 *     });
 *   },
 *
 *   onAuthorize: function (payload, actions) {
 *     // send payload.nonce to your server
 *
 *     // for more data about the user's PayPal account:
 *     // return actions.payment.get().then(function(data) { console.log(data); });
 *   }
 * }, '#paypal-button'); // the PayPal button will be rendered in an html element with the id `paypal-button`
 * ```
 *
 * If you are using `npm` to load braintree, simply pass in the invidual components:
 *
 * ```javascript
 * var btClient = require('braintree-web/client');
 * var btPayPal = require('braintree-web/paypal-checkout');
 *
 * paypal.Button.render({
 *   braintree: {
 *     client: btClient,
 *     paypalCheckout: btPayPal
 *   },
 *   client: {
 *     production: 'production_authorization',
 *     sandbox: 'sandbox_authorization'
 *   },
 *   // rest of checkout.js config
 * ```
 *
 * #### Create the Braintree components manually
 *
 * Alternatively, you can create the Braintree {@link moudle:braintree-web/client.create|client} and {@link moudle:braintree-web/paypal-checkout.create|PayPal Checkout} components manually. Use this integration style if you prefer to have some logic between receiving the authorized PayPal account and tokenizing it.
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
}

PayPalCheckout.prototype._initialize = function (options) {
  this._clientPromise = createDeferredClient.create({
    authorization: options.authorization,
    client: options.client,
    debug: options.debug,
    assetsUrl: createAssetsUrl.create(options.authorization),
    name: 'PayPal Checkout'
  }).then(function (client) {
    this._configuration = client.getConfiguration();

    // we skip these checks if a merchant account id is
    // passed in, because the default merchant account
    // may not have paypal enabled
    if (!this._merchantAccountId) {
      if (!this._configuration.gatewayConfiguration.paypalEnabled) {
        this._setupError = new BraintreeError(errors.PAYPAL_NOT_ENABLED);
      } else if (this._configuration.gatewayConfiguration.paypal.environmentNoNetwork === true) {
        this._setupError = new BraintreeError(errors.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED);
      }
    }

    if (this._setupError) {
      return Promise.reject(this._setupError);
    }

    analytics.sendEvent(client, 'paypal-checkout.initialized');

    return client;
  }.bind(this));

  // if client was passed in, let config checks happen before
  // resolving the instance. Otherwise, just resolve the instance
  if (options.client) {
    return this._clientPromise.then(function () {
      return this;
    }.bind(this));
  }

  return Promise.resolve(this);
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
 * Creates a PayPal payment ID or billing token using the given options. This is meant to be passed to PayPal's checkout.js library.
 * When a {@link callback} is defined, the function returns undefined and invokes the callback with the id to be used with the checkout.js library. Otherwise, it returns a Promise that resolves with the id.
 * @public
 * @param {object} options All options for the PayPalCheckout component.
 * @param {string} options.flow Set to 'checkout' for one-time payment flow, or 'vault' for Vault flow. If 'vault' is used with a client token generated with a customer ID, the PayPal account will be added to that customer as a saved payment method.
 * @param {string} [options.intent=authorize]
 * * `authorize` - Submits the transaction for authorization but not settlement.
 * * `order` - Validates the transaction without an authorization (i.e. without holding funds). Useful for authorizing and capturing funds up to 90 days after the order has been placed. Only available for Checkout flow.
 * * `sale` - Payment will be immediately submitted for settlement upon creating a transaction.
 * @param {boolean} [options.offerCredit=false] Offers PayPal Credit as the default funding instrument for the transaction. If the customer isn't pre-approved for PayPal Credit, they will be prompted to apply for it.
 * @param {string|number} [options.amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [options.currency] The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {string} [options.displayName] The merchant name displayed inside of the PayPal lightbox; defaults to the company name on your Braintree account
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
* @property {lineItem[]} [options.lineItems] The line items for this transaction. It can include up to 249 line items.
 * @param {callback} [callback] The second argument is a PayPal `paymentId` or `billingToken` string, depending on whether `options.flow` is `checkout` or `vault`. This is also what is resolved by the promise if no callback is provided.
 * @example
 * // this paypal object is created by checkout.js
 * // see https://github.com/paypal/paypal-checkout
 * paypal.Button.render({
 *   // when createPayment resolves, it is automatically passed to checkout.js
 *   payment: function () {
 *    return paypalCheckoutInstance.createPayment({
 *       flow: 'checkout',
 *       amount: '10.00',
 *       currency: 'USD',
 *       intent: 'sale'
 *     });
 *   },
 *   // Add other options, e.g. onAuthorize, env, locale
 * }, '#paypal-button');
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.createPayment = function (options) {
  var self = this;
  var endpoint;

  if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
    return Promise.reject(new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED));
  }

  endpoint = 'paypal_hermes/' + constants.FLOW_ENDPOINTS[options.flow];

  analytics.sendEvent(this._clientPromise, 'paypal-checkout.createPayment');
  if (options.offerCredit === true) {
    analytics.sendEvent(this._clientPromise, 'paypal-checkout.credit.offered');
  }

  return this._clientPromise.then(function (client) {
    return client.request({
      endpoint: endpoint,
      method: 'post',
      data: self._formatPaymentResourceData(options)
    });
  }).then(function (response) {
    var flowToken;

    if (options.flow === 'checkout') {
      flowToken = response.paymentResource.paymentToken;
    } else {
      flowToken = response.agreementSetup.tokenId;
    }

    return flowToken;
  }).catch(function (err) {
    var status;

    if (self._setupError) {
      return Promise.reject(self._setupError);
    }

    status = err.details && err.details.httpStatus;

    if (status === 422) {
      return Promise.reject(new BraintreeError({
        type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
        code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
        message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
        details: {
          originalError: err
        }
      }));
    }

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_FLOW_FAILED.type,
      code: errors.PAYPAL_FLOW_FAILED.code,
      message: errors.PAYPAL_FLOW_FAILED.message
    }));
  });
};

/**
 * Tokenizes the authorize data from PayPal's checkout.js library when completing a buyer approval flow.
 * When a {@link callback} is defined, invokes the callback with {@link PayPalCheckout~tokenizePayload|tokenizePayload} and returns undefined. Otherwise, returns a Promise that resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @public
 * @param {object} tokenizeOptions Tokens and IDs required to tokenize the payment.
 * @param {string} tokenizeOptions.payerId Payer ID returned by PayPal `onAuthorize` callback.
 * @param {string} [tokenizeOptions.paymentId] Payment ID returned by PayPal `onAuthorize` callback.
 * @param {string} [tokenizeOptions.billingToken] Billing Token returned by PayPal `onAuthorize` callback.
 * @param {callback} [callback] The second argument, <code>payload</code>, is a {@link PayPalCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, the promise resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.tokenizePayment = function (tokenizeOptions) {
  var self = this;
  var payload;
  var options = {
    flow: tokenizeOptions.billingToken ? 'vault' : 'checkout',
    intent: tokenizeOptions.intent
  };
  var params = {
    // The paymentToken provided by Checkout.js v4 is the ECToken
    ecToken: tokenizeOptions.paymentToken,
    billingToken: tokenizeOptions.billingToken,
    payerId: tokenizeOptions.payerID,
    paymentId: tokenizeOptions.paymentID
  };

  analytics.sendEvent(this._clientPromise, 'paypal-checkout.tokenization.started');

  return this._clientPromise.then(function (client) {
    return client.request({
      endpoint: 'payment_methods/paypal_accounts',
      method: 'post',
      data: self._formatTokenizeData(options, params)
    });
  }).then(function (response) {
    payload = self._formatTokenizePayload(response);

    analytics.sendEvent(self._clientPromise, 'paypal-checkout.tokenization.success');
    if (payload.creditFinancingOffered) {
      analytics.sendEvent(self._clientPromise, 'paypal-checkout.credit.accepted');
    }

    return payload;
  }).catch(function (err) {
    if (self._setupError) {
      return Promise.reject(self._setupError);
    }

    analytics.sendEvent(self._clientPromise, 'paypal-checkout.tokenization.failed');

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
      code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
      message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
    }));
  });
};

PayPalCheckout.prototype._formatPaymentResourceData = function (options) {
  var key;
  var gatewayConfiguration = this._configuration.gatewayConfiguration;
  var paymentResource = {
    // returnUrl and cancelUrl are required in hermes create_payment_resource route
    // but are not validated and are not actually used with checkout.js
    returnUrl: 'x',
    cancelUrl: 'x',
    offerPaypalCredit: options.offerCredit === true,
    merchantAccountId: this._merchantAccountId,
    experienceProfile: {
      brandName: options.displayName || gatewayConfiguration.paypal.displayName,
      localeCode: options.locale,
      noShipping: (!options.enableShippingAddress).toString(),
      addressOverride: options.shippingAddressEditable === false,
      landingPageType: options.landingPageType
    }
  };

  if (options.flow === 'checkout') {
    paymentResource.amount = options.amount;
    paymentResource.currencyIsoCode = options.currency;

    if (options.hasOwnProperty('intent')) {
      paymentResource.intent = options.intent;
    }

    if (options.hasOwnProperty('lineItems')) {
      paymentResource.lineItems = options.lineItems;
    }

    for (key in options.shippingAddressOverride) {
      if (options.shippingAddressOverride.hasOwnProperty(key)) {
        paymentResource[key] = options.shippingAddressOverride[key];
      }
    }
  } else {
    paymentResource.shippingAddress = options.shippingAddressOverride;

    if (options.billingAgreementDescription) {
      paymentResource.description = options.billingAgreementDescription;
    }
  }

  return paymentResource;
};

PayPalCheckout.prototype._formatTokenizeData = function (options, params) {
  var clientConfiguration = this._configuration;
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var isTokenizationKey = clientConfiguration.authorizationType === 'TOKENIZATION_KEY';
  var data = {
    paypalAccount: {
      correlationId: params.billingToken || params.ecToken,
      options: {
        validate: options.flow === 'vault' && !isTokenizationKey
      }
    }
  };

  if (params.billingToken) {
    data.paypalAccount.billingAgreementToken = params.billingToken;
  } else {
    data.paypalAccount.paymentToken = params.paymentId;
    data.paypalAccount.payerId = params.payerId;
    data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;

    if (options.intent) {
      data.paypalAccount.intent = options.intent;
    }
    if (this._merchantAccountId) {
      data.merchantAccountId = this._merchantAccountId;
    }
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
    type: account.type
  };

  if (account.details && account.details.payerInfo) {
    payload.details = account.details.payerInfo;
  }

  if (account.details && account.details.creditFinancingOffered) {
    payload.creditFinancingOffered = account.details.creditFinancingOffered;
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.teardown = function () {
  convertMethodsToError(this, methods(PayPalCheckout.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(PayPalCheckout);

},{"../lib/analytics":86,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/convert-to-braintree-error":98,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/methods":124,"../lib/promise":126,"../paypal/shared/constants":149,"./errors":144,"@braintree/wrap-promise":25}],147:[function(_dereq_,module,exports){
(function (global){
'use strict';

var frameService = _dereq_('../../lib/frame-service/external');
var BraintreeError = _dereq_('../../lib/braintree-error');
var convertToBraintreeError = _dereq_('../../lib/convert-to-braintree-error');
var useMin = _dereq_('../../lib/use-min');
var once = _dereq_('../../lib/once');
var VERSION = "3.42.0";
var constants = _dereq_('../shared/constants');
var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;
var analytics = _dereq_('../../lib/analytics');
var methods = _dereq_('../../lib/methods');
var deferred = _dereq_('../../lib/deferred');
var errors = _dereq_('../shared/errors');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var querystring = _dereq_('../../lib/querystring');
var Promise = _dereq_('../../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @typedef {object} PayPal~tokenizePayload
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
 * Not available to all merchants; [contact PayPal](https://developers.braintreepayments.com/support/guides/paypal/setup-guide#contacting-paypal-support) for details on eligibility and enabling this feature.
 * Alternatively, see `shippingAddress` above as an available client option.
 * @property {string} details.billingAddress.line1 Street number and name.
 * @property {string} details.billingAddress.line2 Extended address.
 * @property {string} details.billingAddress.city City or locality.
 * @property {string} details.billingAddress.state State or region.
 * @property {string} details.billingAddress.postalCode Postal code.
 * @property {string} details.billingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} creditFinancingOffered This property will only be present when the customer pays with PayPal Credit.
 * @property {object} creditFinancingOffered.totalCost This is the estimated total payment amount including interest and fees the user will pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalCost.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalCost.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {number} creditFinancingOffered.term Length of financing terms in months.
 * @property {object} creditFinancingOffered.monthlyPayment This is the estimated amount per month that the customer will need to pay including fees and interest.
 * @property {string} creditFinancingOffered.monthlyPayment.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.monthlyPayment.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {object} creditFinancingOffered.totalInterest Estimated interest or fees amount the payer will have to pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalInterest.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalInterest.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {boolean} creditFinancingOffered.payerAcceptance Status of whether the customer ultimately was approved for and chose to make the payment using the approved installment credit.
 * @property {boolean} creditFinancingOffered.cartAmountImmutable Indicates whether the cart amount is editable after payer's acceptance on PayPal side.
 *
 */

/**
 * @typedef {object} PayPal~tokenizeReturn
 * @property {Function} close A handle to close the PayPal checkout flow.
 * @property {Function} focus A handle to focus the PayPal checkout flow. Note that some browsers (notably iOS Safari) do not support focusing popups. Firefox requires the focus call to occur as the result of a user interaction, such as a button click.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/paypal.create|paypal.create}
 * @classdesc This class represents a PayPal component. Instances of this class can open a PayPal window for authenticating a PayPal account. Any additional UI, such as disabling the page while authentication is taking place, is up to the developer.
 *
 * This component has been deprecated in favor of the {@link PayPalCheckout|PayPal Checkout component}, which provides a fully managed UI. New features will not be added to this component.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/paypal.create|braintree-web.paypal.create} instead.</strong>
 */
function PayPal(options) {
  this._client = options.client;
  this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.paypal.assetsUrl + '/web/' + VERSION;
  this._isDebug = options.client.getConfiguration().isDebug;
  this._loadingFrameUrl = this._assetsUrl + '/html/paypal-landing-frame' + useMin(this._isDebug) + '.html';
  this._authorizationInProgress = false;
}

PayPal.prototype._initialize = function () {
  var self = this;
  var client = this._client;
  var failureTimeout = setTimeout(function () {
    analytics.sendEvent(client, 'paypal.load.timed-out');
  }, INTEGRATION_TIMEOUT_MS);

  return new Promise(function (resolve) {
    frameService.create({
      name: constants.LANDING_FRAME_NAME,
      dispatchFrameUrl: self._assetsUrl + '/html/dispatch-frame' + useMin(self._isDebug) + '.html',
      openFrameUrl: self._loadingFrameUrl
    }, function (service) {
      self._frameService = service;
      clearTimeout(failureTimeout);
      analytics.sendEvent(client, 'paypal.load.succeeded');
      resolve(self);
    });
  });
};

/**
 * Launches the PayPal login flow and returns a nonce payload. Only one PayPal login flow should be active at a time. One way to achieve this is to disable your PayPal button while the flow is open.
 * @public
 * @param {object} options All tokenization options for the PayPal component.
 * @param {string} options.flow Set to 'checkout' for one-time payment flow, or 'vault' for Vault flow. If 'vault' is used with a client token generated with a customer id, the PayPal account will be added to that customer as a saved payment method.
 * @param {string} [options.intent=authorize]
 * * `authorize` - Submits the transaction for authorization but not settlement.
 * * `order` - Validates the transaction without an authorization (i.e. without holding funds). Useful for authorizing and capturing funds up to 90 days after the order has been placed. Only available for Checkout flow.
 * * `sale` - Payment will be immediately submitted for settlement upon creating a transaction.
 * @param {boolean} [options.offerCredit=false] Offers PayPal Credit as the default funding instrument for the transaction. If the customer isn't pre-approved for PayPal Credit, they will be prompted to apply for it.
 * @param {string} [options.useraction]
 * Changes the call-to-action in the PayPal flow. By default the final button will show the localized
 * word for "Continue" and implies that the final amount billed is not yet known.
 *
 * Setting this option to `commit` changes the button text to "Pay Now" and page text will convey to
 * the user that billing will take place immediately.
 * @param {string|number} [options.amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [options.currency] The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {string} [options.displayName] The merchant name displayed inside of the PayPal lightbox; defaults to the company name on your Braintree account
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
 * @param {callback} callback The second argument, <code>data</code>, is a {@link PayPal~tokenizePayload|tokenizePayload}.
 * @example
 * <caption>Tokenizing with the vault flow</caption>
 * button.addEventListener('click', function () {
 *   // Disable the button so that we don't attempt to open multiple popups.
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // if there is any other part of the page that must be disabled
 *   // while authentication is in progress, do so now
 *
 *   // Because PayPal tokenization opens a popup, this must be called
 *   // as a result of a user action, such as a button click.
 *   paypalInstance.tokenize({
 *     flow: 'vault' // Required
 *     // Any other tokenization options
 *   }, function (tokenizeErr, payload) {
 *     button.removeAttribute('disabled');
 *
 *     // if any other part of the page was disabled, re-enable now
 *
 *     if (tokenizeErr) {
 *       // Handle tokenization errors or premature flow closure
 *
 *       switch (tokenizeErr.code) {
 *         case 'PAYPAL_POPUP_CLOSED':
 *           console.error('Customer closed PayPal popup.');
 *           break;
 *         case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
 *           console.error('PayPal tokenization failed. See details:', tokenizeErr.details);
 *           break;
 *         case 'PAYPAL_FLOW_FAILED':
 *           console.error('Unable to initialize PayPal flow. Are your options correct?', tokenizeErr.details);
 *           break;
 *         default:
 *           console.error('Error!', tokenizeErr);
 *       }
 *     } else {
 *       // Submit payload.nonce to your server
 *     }
 *   });
 * });

 * @example
 * <caption>Tokenizing with the checkout flow</caption>
 * button.addEventListener('click', function () {
 *   // Disable the button so that we don't attempt to open multiple popups.
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because PayPal tokenization opens a popup, this must be called
 *   // as a result of a user action, such as a button click.
 *   paypalInstance.tokenize({
 *     flow: 'checkout', // Required
 *     amount: '10.00', // Required
 *     currency: 'USD' // Required
 *     // Any other tokenization options
 *   }, function (tokenizeErr, payload) {
 *     button.removeAttribute('disabled');
 *
 *     if (tokenizeErr) {
 *       // Handle tokenization errors or premature flow closure
 *
 *       switch (tokenizeErr.code) {
 *         case 'PAYPAL_POPUP_CLOSED':
 *           console.error('Customer closed PayPal popup.');
 *           break;
 *         case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
 *           console.error('PayPal tokenization failed. See details:', tokenizeErr.details);
 *           break;
 *         case 'PAYPAL_FLOW_FAILED':
 *           console.error('Unable to initialize PayPal flow. Are your options correct?', tokenizeErr.details);
 *           break;
 *         default:
 *           console.error('Error!', tokenizeErr);
 *       }
 *     } else {
 *       // Submit payload.nonce to your server
 *     }
 *   });
 * });
 * @returns {Promise|PayPal~tokenizeReturn} A handle to manage the PayPal checkout frame. If no callback is provided, returns a promise.
 */
PayPal.prototype.tokenize = function (options, callback) {
  var self = this;
  var client = this._client;
  var tokenizePromise, optionError;

  if (callback) {
    callback = once(deferred(callback));
  }

  if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
    optionError = new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED);

    if (callback) {
      callback(optionError);

      return this._frameService.createNoopHandler();
    }

    return Promise.reject(optionError);
  }

  tokenizePromise = new Promise(function (resolve, reject) {
    if (self._authorizationInProgress) {
      analytics.sendEvent(client, 'paypal.tokenization.error.already-opened');

      reject(new BraintreeError(errors.PAYPAL_TOKENIZATION_REQUEST_ACTIVE));
    } else {
      self._authorizationInProgress = true;

      if (!global.popupBridge) {
        analytics.sendEvent(client, 'paypal.tokenization.opened');
      }

      if (options.offerCredit === true) {
        analytics.sendEvent(client, 'paypal.credit.offered');
      }

      self._navigateFrameToAuth(options).catch(reject);
      // self MUST happen after _navigateFrameToAuth for Metro browsers to work.
      self._frameService.open({}, self._createFrameServiceCallback(options, resolve, reject));
    }
  });

  if (callback) {
    tokenizePromise.then(function (res) {
      callback(null, res);
    }).catch(callback);

    return this._frameService.createHandler({
      beforeClose: function () {
        analytics.sendEvent(client, 'paypal.tokenization.closed.by-merchant');
      }
    });
  }

  return tokenizePromise;
};

PayPal.prototype._createFrameServiceCallback = function (options, resolve, reject) {
  var self = this;
  var client = this._client;

  if (global.popupBridge) {
    return function (err, payload) {
      var cancelled = payload && payload.path && payload.path.substring(0, 7) === '/cancel';

      self._authorizationInProgress = false;

      // `err` exists when the user clicks "Done" button of browser view
      if (err || cancelled) {
        analytics.sendEvent(client, 'paypal.tokenization.closed-popupbridge.by-user');
        // Call merchant's tokenize callback with an error
        reject(new BraintreeError(errors.PAYPAL_POPUP_CLOSED));
      } else if (payload) {
        self._tokenizePayPal(options, payload.queryItems).then(resolve).catch(reject);
      }
    };
  }

  return function (err, params) {
    self._authorizationInProgress = false;

    if (err) {
      if (err.code === 'FRAME_SERVICE_FRAME_CLOSED') {
        analytics.sendEvent(client, 'paypal.tokenization.closed.by-user');
        reject(new BraintreeError(errors.PAYPAL_POPUP_CLOSED));
      } else if (err.code && err.code.indexOf('FRAME_SERVICE_FRAME_OPEN_FAILED') > -1) {
        reject(new BraintreeError({
          code: errors.PAYPAL_POPUP_OPEN_FAILED.code,
          type: errors.PAYPAL_POPUP_OPEN_FAILED.type,
          message: errors.PAYPAL_POPUP_OPEN_FAILED.message,
          details: {
            originalError: err
          }
        }));
      }
    } else if (params) {
      self._tokenizePayPal(options, params).then(resolve).catch(reject);
    }
  };
};

PayPal.prototype._tokenizePayPal = function (options, params) {
  var self = this;
  var client = this._client;

  if (!global.popupBridge) {
    this._frameService.redirect(this._loadingFrameUrl);
  }

  return client.request({
    endpoint: 'payment_methods/paypal_accounts',
    method: 'post',
    data: this._formatTokenizeData(options, params)
  }).then(function (response) {
    var payload = self._formatTokenizePayload(response);

    if (global.popupBridge) {
      analytics.sendEvent(client, 'paypal.tokenization.success-popupbridge');
    } else {
      analytics.sendEvent(client, 'paypal.tokenization.success');
    }

    if (payload.creditFinancingOffered) {
      analytics.sendEvent(client, 'paypal.credit.accepted');
    }

    self._frameService.close();

    return payload;
  }).catch(function (err) {
    if (global.popupBridge) {
      analytics.sendEvent(client, 'paypal.tokenization.failed-popupbridge');
    } else {
      analytics.sendEvent(client, 'paypal.tokenization.failed');
    }

    self._frameService.close();

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
      code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
      message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
    }));
  });
};

PayPal.prototype._formatTokenizePayload = function (response) {
  var payload;
  var account = {};

  if (response.paypalAccounts) {
    account = response.paypalAccounts[0];
  }

  payload = {
    nonce: account.nonce,
    details: {},
    type: account.type
  };

  if (account.details && account.details.payerInfo) {
    payload.details = account.details.payerInfo;
  }

  if (account.details && account.details.creditFinancingOffered) {
    payload.creditFinancingOffered = account.details.creditFinancingOffered;
  }

  return payload;
};

PayPal.prototype._formatTokenizeData = function (options, params) {
  var clientConfiguration = this._client.getConfiguration();
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var isTokenizationKey = clientConfiguration.authorizationType === 'TOKENIZATION_KEY';
  var data = {
    paypalAccount: {
      correlationId: params.ba_token || params.token,
      options: {
        validate: options.flow === 'vault' && !isTokenizationKey
      }
    }
  };

  if (params.ba_token) {
    data.paypalAccount.billingAgreementToken = params.ba_token;
  } else {
    data.paypalAccount.paymentToken = params.paymentId;
    data.paypalAccount.payerId = params.PayerID;
    data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;

    if (options.hasOwnProperty('intent')) {
      data.paypalAccount.intent = options.intent;
    }
  }

  return data;
};

PayPal.prototype._navigateFrameToAuth = function (options) {
  var self = this;
  var client = this._client;
  var endpoint = 'paypal_hermes/' + constants.FLOW_ENDPOINTS[options.flow];

  return client.request({
    endpoint: endpoint,
    method: 'post',
    data: this._formatPaymentResourceData(options)
  }).then(function (response) {
    var redirectUrl;

    if (options.flow === 'checkout') {
      redirectUrl = response.paymentResource.redirectUrl;
    } else {
      redirectUrl = response.agreementSetup.approvalUrl;
    }

    if (options.useraction === 'commit') {
      redirectUrl = querystring.queryify(redirectUrl, {useraction: 'commit'});
    }

    if (global.popupBridge) {
      analytics.sendEvent(client, 'paypal.tokenization.opened-popupbridge');
    }

    self._frameService.redirect(redirectUrl);
  }).catch(function (err) {
    var status = err.details && err.details.httpStatus;

    self._frameService.close();
    self._authorizationInProgress = false;

    if (status === 422) {
      return Promise.reject(new BraintreeError({
        type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
        code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
        message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
        details: {
          originalError: err
        }
      }));
    }

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_FLOW_FAILED.type,
      code: errors.PAYPAL_FLOW_FAILED.code,
      message: errors.PAYPAL_FLOW_FAILED.message
    }));
  });
};

PayPal.prototype._formatPaymentResourceData = function (options) {
  var key;
  var gatewayConfiguration = this._client.getConfiguration().gatewayConfiguration;
  var serviceId = this._frameService._serviceId;
  var paymentResource = {
    returnUrl: gatewayConfiguration.paypal.assetsUrl + '/web/' + VERSION + '/html/paypal-redirect-frame' + useMin(this._isDebug) + '.html?channel=' + serviceId,
    cancelUrl: gatewayConfiguration.paypal.assetsUrl + '/web/' + VERSION + '/html/paypal-cancel-frame' + useMin(this._isDebug) + '.html?channel=' + serviceId,
    offerPaypalCredit: options.offerCredit === true,
    experienceProfile: {
      brandName: options.displayName || gatewayConfiguration.paypal.displayName,
      localeCode: options.locale,
      noShipping: (!options.enableShippingAddress).toString(),
      addressOverride: options.shippingAddressEditable === false,
      landingPageType: options.landingPageType
    }
  };

  if (global.popupBridge && typeof global.popupBridge.getReturnUrlPrefix === 'function') {
    paymentResource.returnUrl = global.popupBridge.getReturnUrlPrefix() + 'return';
    paymentResource.cancelUrl = global.popupBridge.getReturnUrlPrefix() + 'cancel';
  }

  if (options.flow === 'checkout') {
    paymentResource.amount = options.amount;
    paymentResource.currencyIsoCode = options.currency;

    if (options.hasOwnProperty('intent')) {
      paymentResource.intent = options.intent;
    }

    for (key in options.shippingAddressOverride) {
      if (options.shippingAddressOverride.hasOwnProperty(key)) {
        paymentResource[key] = options.shippingAddressOverride[key];
      }
    }
  } else {
    paymentResource.shippingAddress = options.shippingAddressOverride;

    if (options.billingAgreementDescription) {
      paymentResource.description = options.billingAgreementDescription;
    }
  }

  return paymentResource;
};

/**
 * Closes the PayPal window if it is open.
 * @public
 * @example
 * paypalInstance.closeWindow();
 * @returns {void}
 */
PayPal.prototype.closeWindow = function () {
  if (this._authorizationInProgress) {
    analytics.sendEvent(this._client, 'paypal.tokenize.closed.by-merchant');
  }
  this._frameService.close();
};

/**
 * Focuses the PayPal window if it is open.
 * @public
 * @example
 * paypalInstance.focusWindow();
 * @returns {void}
 */
PayPal.prototype.focusWindow = function () {
  this._frameService.focus();
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/paypal.create|create}.
 * @public
 * @param {callback} [callback] Called on completion.
 * @example
 * paypalInstance.teardown();
 * @example <caption>With callback</caption>
 * paypalInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPal.prototype.teardown = wrapPromise(function () {
  var self = this; // eslint-disable-line no-invalid-this

  self._frameService.teardown();

  convertMethodsToError(self, methods(PayPal.prototype));

  analytics.sendEvent(self._client, 'paypal.teardown-completed');

  return Promise.resolve();
});

module.exports = PayPal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/analytics":86,"../../lib/braintree-error":91,"../../lib/constants":96,"../../lib/convert-methods-to-error":97,"../../lib/convert-to-braintree-error":98,"../../lib/deferred":102,"../../lib/frame-service/external":109,"../../lib/methods":124,"../../lib/once":125,"../../lib/promise":126,"../../lib/querystring":127,"../../lib/use-min":128,"../shared/constants":149,"../shared/errors":150,"@braintree/wrap-promise":25}],148:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/paypal
 * @description A component to integrate with PayPal.
 * @deprecated Use the {@link PayPalCheckout|PayPal Checkout component} instead.
 */

var analytics = _dereq_('../lib/analytics');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var BraintreeError = _dereq_('../lib/braintree-error');
var errors = _dereq_('./shared/errors');
var PayPal = _dereq_('./external/paypal');
var VERSION = "3.42.0";
var wrapPromise = _dereq_('@braintree/wrap-promise');
var Promise = _dereq_('../lib/promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} callback The second argument, `data`, is the {@link PayPal} instance.
 * @example
 * // We recomend creating your PayPal button with button.js
 * // For an example, see http://codepen.io/braintree/pen/LNKJWa
 * var paypalButton = document.querySelector('.paypal-button');
 *
 * braintree.client.create({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (clientErr, clientInstance) {
 *   if (clientErr) {
 *     console.error('Error creating client:', clientErr);
 *     return;
 *   }
 *
 *   braintree.paypal.create({
 *     client: clientInstance
 *   }, function (paypalErr, paypalInstance) {
 *     if (paypalErr) {
 *       console.error('Error creating PayPal:', paypalErr);
 *       return;
 *     }
 *
 *     paypalButton.removeAttribute('disabled');
 *
 *     // When the button is clicked, attempt to tokenize.
 *     paypalButton.addEventListener('click', function (event) {
 *       // Because tokenization opens a popup, this has to be called as a result of
 *       // customer action, like clicking a button. You cannot call this at any time.
 *       paypalInstance.tokenize({
 *         flow: 'vault'
 *         // For more tokenization options, see the full PayPal tokenization documentation
 *         // http://braintree.github.io/braintree-web/current/PayPal.html#tokenize
 *       }, function (tokenizeErr, payload) {
 *         if (tokenizeErr) {
 *           if (tokenizeErr.type !== 'CUSTOMER') {
 *             console.error('Error tokenizing:', tokenizeErr);
 *           }
 *           return;
 *         }
 *
 *         // Tokenization succeeded
 *         paypalButton.setAttribute('disabled', true);
 *         console.log('Got a nonce! You should submit this to your server.');
 *         console.log(payload.nonce);
 *       });
 *     }, false);
 *   });
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'PayPal';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var pp;
    var config = client.getConfiguration();

    options.client = client;

    if (config.gatewayConfiguration.paypalEnabled !== true) {
      return Promise.reject(new BraintreeError(errors.PAYPAL_NOT_ENABLED));
    }

    analytics.sendEvent(options.client, 'paypal.initialized');

    pp = new PayPal(options);

    return pp._initialize();
  });
}

/**
 * @static
 * @function isSupported
 * @description Returns true if PayPal [supports this browser](index.html#browser-support-webviews).
 * @example
 * if (braintree.paypal.isSupported()) {
 *   // Add PayPal button to the page
 * } else {
 *   // Hide PayPal payment option
 * }
 * @returns {Boolean} Returns true if PayPal supports this browser.
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
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./external/paypal":147,"./shared/errors":150,"@braintree/wrap-promise":25}],149:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  LANDING_FRAME_NAME: 'braintreepaypallanding',
  FLOW_ENDPOINTS: {
    checkout: 'create_payment_resource',
    vault: 'setup_billing_agreement'
  }
};

},{}],150:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.PayPal - Creation Error Codes
 * @description Errors that occur when [creating the PayPal component](/current/module-braintree-web_paypal.html#.create).
 * @property {MERCHANT} PAYPAL_NOT_ENABLED Occurs when PayPal is not enabled on the Braintree control panel.
 */

/**
 * @name BraintreeError.PayPal - tokenize Error Codes
 * @description Errors that occur when using the [`tokenize` method](/current/PayPal.html#tokenize).
 * @property {MERCHANT} PAYPAL_TOKENIZATION_REQUEST_ACTIVE Occurs when a tokenization request is already in progress.
 * @property {MERCHANT} PAYPAL_FLOW_OPTION_REQUIRED Occurs when flow option is not provdided.
 * @property {NETWORK} PAYPAL_ACCOUNT_TOKENIZATION_FAILED Occurs when PayPal account could not be tokenized.
 * @property {NETWORK} PAYPAL_FLOW_FAILED Occurs when PayPal flow could not be initiated.
 * @property {MERCHANT} PAYPAL_POPUP_OPEN_FAILED Occurs when PayPal window could not be opened.
 * @property {CUSTOMER} PAYPAL_POPUP_CLOSED Occurs when customer closes the PayPal window before completing the flow.
 * @property {MERCHANT} PAYPAL_INVALID_PAYMENT_OPTION Occurs when an invalid payment option is passed.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_NOT_ENABLED',
    message: 'PayPal is not enabled for this merchant.'
  },
  PAYPAL_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_TOKENIZATION_REQUEST_ACTIVE',
    message: 'Another tokenization request is active.'
  },
  PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s PayPal account.'
  },
  PAYPAL_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_FLOW_FAILED',
    message: 'Could not initialize PayPal flow.'
  },
  PAYPAL_FLOW_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_FLOW_OPTION_REQUIRED',
    message: 'PayPal flow property is invalid or missing.'
  },
  PAYPAL_POPUP_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_POPUP_OPEN_FAILED',
    message: 'PayPal popup failed to open, make sure to tokenize in response to a user action.'
  },
  PAYPAL_POPUP_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'PAYPAL_POPUP_CLOSED',
    message: 'Customer closed PayPal popup before authorizing.'
  },
  PAYPAL_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_INVALID_PAYMENT_OPTION',
    message: 'PayPal payment options are invalid.'
  }
};

},{"../../lib/braintree-error":91}],151:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/braintree-error');
var analytics = _dereq_('../../lib/analytics');
var assign = _dereq_('../../lib/assign').assign;
var methods = _dereq_('../../lib/methods');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var constants = _dereq_('../shared/constants');
var useMin = _dereq_('../../lib/use-min');
var Bus = _dereq_('../../lib/bus');
var uuid = _dereq_('../../lib/vendor/uuid');
var deferred = _dereq_('../../lib/deferred');
var errors = _dereq_('../shared/errors');
var events = _dereq_('../shared/events');
var VERSION = "3.42.0";
var iFramer = _dereq_('@braintree/iframer');
var Promise = _dereq_('../../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

var IFRAME_HEIGHT = 400;
var IFRAME_WIDTH = 400;

/**
 * @typedef {object} ThreeDSecure~verifyPayload
 * @property {string} nonce The new payment method nonce produced by the 3D Secure lookup. The original nonce passed into {@link ThreeDSecure#verifyCard|verifyCard} was consumed. This new nonce should be used to transact on your server.
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
 * @property {boolean} liabilityShiftPossible Indicates whether the card was eligible for 3D Secure.
 * @property {boolean} liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 */

/**
 * @class
 * @param {object} options 3D Secure {@link module:braintree-web/three-d-secure.create create} options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create} instead.</strong>
 * @classdesc This class represents a ThreeDSecure component produced by {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create}. Instances of this class have a method for launching a 3D Secure authentication flow.
 */
function ThreeDSecure(options) {
  this._options = options;
  this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.assetsUrl;
  this._isDebug = options.client.getConfiguration().isDebug;
  this._client = options.client;
}

/**
 * @callback ThreeDSecure~addFrameCallback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {HTMLIFrameElement} iframe An iframe element containing the bank's authentication page that you must put on your page.
 * @description The callback used for options.addFrame in {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @callback ThreeDSecure~removeFrameCallback
 * @description The callback used for options.removeFrame in {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * Launch the 3D Secure login flow, returning a nonce payload.
 * @public
 * @param {object} options Options for card verification.
 * @param {string} options.nonce A nonce referencing the card to be verified. For example, this can be a nonce that was returned by Hosted Fields.
 * @param {number} options.amount The amount of the transaction in the current merchant account's currency. For example, if you are running a transaction of $123.45 US dollars, `amount` would be 123.45.
 * @param {callback} options.addFrame This {@link ThreeDSecure~addFrameCallback|addFrameCallback} will be called when the bank frame needs to be added to your page.
 * @param {callback} options.removeFrame This {@link ThreeDSecure~removeFrameCallback|removeFrameCallback} will be called when the bank frame needs to be removed from your page.
 * @param {string} [options.customer.mobilePhoneNumber] The mobile phone number used for verification. Only numbers; remove dashes, paranthesis and other characters.
 * @param {string} [options.customer.email] The email used for verification.
 * @param {string} [options.customer.shippingMethod] The 2-digit string indicating the shipping method chosen for the transaction.
 * @param {string} [options.customer.billingAddress.firstName] The first name associated with the address.
 * @param {string} [options.customer.billingAddress.lastName] The last name associated with the address.
 * @param {string} [options.customer.billingAddress.streetAddress] Line 1 of the Address (eg. number, street, etc).
 * @param {string} [options.customer.billingAddress.extendedAddress] Line 2 of the Address (eg. suite, apt #, etc.).
 * @param {string} [options.customer.billingAddress.locality] The locality (city) name associated with the address.
 * @param {string} [options.customer.billingAddress.region] The 2 letter code for US states, and the equivalent for other countries.
 * @param {string} [options.customer.billingAddress.postalCode] The zip code or equivalent for countries that have them.
 * @param {string} [options.customer.billingAddress.countryCodeAlpha2] The 2 character country code.
 * @param {string} [options.customer.billingAddress.phoneNumber] The phone number associated with the address. Only numbers; remove dashes, paranthesis and other characters.
 * @param {boolean} [options.showLoader=true] Whether to show the loader icon while the bank frame is loading.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~verifyPayload|verifyPayload}.

 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * <caption>Verifying an existing nonce with 3DS</caption>
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
 *     // Liablity has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liablity may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liablity has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 */
ThreeDSecure.prototype.verifyCard = function (options) {
  var url, showLoader, addFrame, removeFrame, error, errorOption;
  var self = this;

  options = assign({}, options);

  if (options.customer && options.customer.billingAddress) {
    // map from public API to the API that the Gateway expects
    options.customer.billingAddress.line1 = options.customer.billingAddress.streetAddress;
    options.customer.billingAddress.line2 = options.customer.billingAddress.extendedAddress;
    options.customer.billingAddress.city = options.customer.billingAddress.locality;
    options.customer.billingAddress.state = options.customer.billingAddress.region;
    options.customer.billingAddress.countryCode = options.customer.billingAddress.countryCodeAlpha2;
    delete options.customer.billingAddress.streetAddress;
    delete options.customer.billingAddress.extendedAddress;
    delete options.customer.billingAddress.locality;
    delete options.customer.billingAddress.region;
    delete options.customer.billingAddress.countryCodeAlpha2;
  }

  if (this._verifyCardInProgress === true) {
    error = errors.THREEDS_AUTHENTICATION_IN_PROGRESS;
  } else if (!options.nonce) {
    errorOption = 'a nonce';
  } else if (!options.amount) {
    errorOption = 'an amount';
  } else if (typeof options.addFrame !== 'function') {
    errorOption = 'an addFrame function';
  } else if (typeof options.removeFrame !== 'function') {
    errorOption = 'a removeFrame function';
  }

  if (errorOption) {
    error = {
      type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
      code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
      message: 'verifyCard options must include ' + errorOption + '.'
    };
  }

  if (error) {
    return Promise.reject(new BraintreeError(error));
  }

  showLoader = options.showLoader !== false;

  this._verifyCardInProgress = true;

  addFrame = deferred(options.addFrame);
  removeFrame = deferred(options.removeFrame);

  url = 'payment_methods/' + options.nonce + '/three_d_secure/lookup';

  return this._client.request({
    endpoint: url,
    method: 'post',
    data: {amount: options.amount, customer: options.customer}
  }).then(function (response) {
    self._lookupPaymentMethod = response.paymentMethod;

    return new Promise(function (resolve, reject) {
      self._verifyCardCallback = function (verifyErr, payload) {
        self._verifyCardInProgress = false;

        if (verifyErr) {
          reject(verifyErr);
        } else {
          resolve(payload);
        }
      };

      self._handleLookupResponse({
        showLoader: showLoader,
        lookupResponse: response,
        addFrame: addFrame,
        removeFrame: removeFrame
      });
    });
  }).catch(function (err) {
    self._verifyCardInProgress = false;

    return Promise.reject(err);
  });
};

/**
 * Cancel the 3DS flow and return the verification payload if available.
 * @public
 * @param {callback} [callback] The second argument is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If there is no verifyPayload (the initial lookup did not complete), an error will be returned. If no callback is passed, `cancelVerifyCard` will return a promise.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
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
  var response;

  this._verifyCardInProgress = false;

  if (!this._lookupPaymentMethod) {
    return Promise.reject(new BraintreeError(errors.THREEDS_NO_VERIFICATION_PAYLOAD));
  }

  response = assign({}, this._lookupPaymentMethod, {
    liabilityShiftPossible: this._lookupPaymentMethod.threeDSecureInfo.liabilityShiftPossible,
    liabilityShifted: this._lookupPaymentMethod.threeDSecureInfo.liabilityShifted,
    verificationDetails: this._lookupPaymentMethod.threeDSecureInfo.verificationDetails
  });

  return Promise.resolve(response);
};

ThreeDSecure.prototype._handleLookupResponse = function (options) {
  var details;
  var lookupResponse = options.lookupResponse;

  if (lookupResponse.lookup && lookupResponse.lookup.acsUrl && lookupResponse.lookup.acsUrl.length > 0) {
    options.addFrame(null, this._createIframe({
      showLoader: options.showLoader,
      response: lookupResponse.lookup,
      removeFrame: options.removeFrame
    }));
  } else {
    details = this._formatAuthResponse(lookupResponse.paymentMethod, lookupResponse.threeDSecureInfo);
    details.verificationDetails = lookupResponse.threeDSecureInfo;

    this._verifyCardCallback(null, details);
  }
};

ThreeDSecure.prototype._createIframe = function (options) {
  var url, authenticationCompleteBaseUrl;
  var parentURL = window.location.href;
  var response = options.response;

  this._bus = new Bus({
    channel: uuid(),
    merchantUrl: location.href
  });

  authenticationCompleteBaseUrl = this._assetsUrl + '/web/' + VERSION + '/html/three-d-secure-authentication-complete-frame.html?channel=' + encodeURIComponent(this._bus.channel) + '&';

  if (parentURL.indexOf('#') > -1) {
    parentURL = parentURL.split('#')[0];
  }

  this._bus.on(Bus.events.CONFIGURATION_REQUEST, function (reply) {
    reply({
      acsUrl: response.acsUrl,
      pareq: response.pareq,
      termUrl: response.termUrl + '&three_d_secure_version=' + VERSION + '&authentication_complete_base_url=' + encodeURIComponent(authenticationCompleteBaseUrl),
      md: response.md,
      parentUrl: parentURL
    });
  });

  this._bus.on(events.AUTHENTICATION_COMPLETE, function (data) {
    this._handleAuthResponse(data, options);
  }.bind(this));

  url = this._assetsUrl + '/web/' + VERSION + '/html/three-d-secure-bank-frame' + useMin(this._isDebug) + '.html?showLoader=' + options.showLoader;

  this._bankIframe = iFramer({
    src: url,
    height: IFRAME_HEIGHT,
    width: IFRAME_WIDTH,
    name: constants.LANDING_FRAME_NAME + '_' + this._bus.channel,
    title: '3D Secure Authorization Frame'
  });

  return this._bankIframe;
};

ThreeDSecure.prototype._handleAuthResponse = function (data, options) {
  var authResponse = JSON.parse(data.auth_response);

  this._bus.teardown();

  options.removeFrame();

  // This also has to be in a setTimeout so it executes after the `removeFrame`.
  deferred(function () {
    if (authResponse.success) {
      this._verifyCardCallback(null, this._formatAuthResponse(authResponse.paymentMethod, authResponse.threeDSecureInfo));
    } else if (authResponse.threeDSecureInfo && authResponse.threeDSecureInfo.liabilityShiftPossible) {
      this._verifyCardCallback(null, this._formatAuthResponse(this._lookupPaymentMethod, authResponse.threeDSecureInfo));
    } else {
      this._verifyCardCallback(new BraintreeError({
        type: BraintreeError.types.UNKNOWN,
        code: 'UNKNOWN_AUTH_RESPONSE',
        message: authResponse.error.message
      }));
    }
  }.bind(this))();
};

ThreeDSecure.prototype._formatAuthResponse = function (paymentMethod, threeDSecureInfo) {
  return {
    nonce: paymentMethod.nonce,
    binData: paymentMethod.binData,
    details: paymentMethod.details,
    description: paymentMethod.description && paymentMethod.description.replace(/\+/g, ' '),
    liabilityShifted: threeDSecureInfo.liabilityShifted,
    liabilityShiftPossible: threeDSecureInfo.liabilityShiftPossible
  };
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/three-d-secure.create|create}.
 * @public
 * @param {callback} [callback] Called on completion. If no callback is passed, `teardown` will return a promise.
 * @example
 * threeDSecure.teardown();
 * @example <caption>With callback</caption>
 * threeDSecure.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
ThreeDSecure.prototype.teardown = function () {
  var iframeParent;

  convertMethodsToError(this, methods(ThreeDSecure.prototype));

  analytics.sendEvent(this._options.client, 'threedsecure.teardown-completed');

  if (this._bus) {
    this._bus.teardown();
  }

  if (this._bankIframe) {
    iframeParent = this._bankIframe.parentNode;

    if (iframeParent) {
      iframeParent.removeChild(this._bankIframe);
    }
  }

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(ThreeDSecure);

},{"../../lib/analytics":86,"../../lib/assign":88,"../../lib/braintree-error":91,"../../lib/bus":94,"../../lib/convert-methods-to-error":97,"../../lib/deferred":102,"../../lib/methods":124,"../../lib/promise":126,"../../lib/use-min":128,"../../lib/vendor/uuid":130,"../shared/constants":153,"../shared/errors":154,"../shared/events":155,"@braintree/iframer":18,"@braintree/wrap-promise":25}],152:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/three-d-secure */

var ThreeDSecure = _dereq_('./external/three-d-secure');
var isHTTPS = _dereq_('../lib/is-https').isHTTPS;
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var BraintreeError = _dereq_('../lib/braintree-error');
var analytics = _dereq_('../lib/analytics');
var errors = _dereq_('./shared/errors');
var VERSION = "3.42.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} [callback] The second argument, `data`, is the {@link ThreeDSecure} instance. If no callback is provided, it returns a promise that resolves the {@link ThreeDSecure} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = '3D Secure';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var error, isProduction;
    var config = client.getConfiguration();

    options.client = client;

    if (!config.gatewayConfiguration.threeDSecureEnabled) {
      error = errors.THREEDS_NOT_ENABLED;
    }

    if (config.authorizationType === 'TOKENIZATION_KEY') {
      error = errors.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY;
    }

    isProduction = config.gatewayConfiguration.environment === 'production';

    if (isProduction && !isHTTPS()) {
      error = errors.THREEDS_HTTPS_REQUIRED;
    }

    if (error) {
      return Promise.reject(new BraintreeError(error));
    }

    analytics.sendEvent(options.client, 'threedsecure.initialized');

    return new ThreeDSecure(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/is-https":121,"../lib/promise":126,"./external/three-d-secure":151,"./shared/errors":154,"@braintree/wrap-promise":25}],153:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  LANDING_FRAME_NAME: 'braintreethreedsecurelanding'
};

},{}],154:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.3D Secure - Creation Error Codes
 * @description Errors that occur when [creating the 3D Secure component](/current/module-braintree-web_three-d-secure.html#.create).
 * @property {MERCHANT} THREEDS_NOT_ENABLED Occurs when 3D Secure is not enabled in the Braintree control panel.
 * @property {MERCHANT} THREEDS_CAN_NOT_USE_TOKENIZATION_KEY Occurs when 3D Secure component is created without a Client Token.
 * @property {MERCHANT} THREEDS_HTTPS_REQUIRED Occurs when 3D Secure component is created in production over HTTPS.
 */

/**
 * @name BraintreeError.3D Secure - verifyCard Error Codes
 * @description Errors that occur when using the [`verifyCard` method](/current/ThreeDSecure.html#verifyCard).
 * @property {MERCHANT} THREEDS_AUTHENTICATION_IN_PROGRESS Occurs when another verification is already in progress.
 * @property {MERCHANT} THREEDS_MISSING_VERIFY_CARD_OPTION Occurs when a required option is missing.
 */

/**
 * @name BraintreeError.3D Secure - cancelVerifyCard Error Codes
 * @description Errors that occur when using the [`cancelVerifyCard` method](/current/ThreeDSecure.html#cancelVerifyCard).
 * @property {MERCHANT} THREEDS_NO_VERIFICATION_PAYLOAD Occurs when the 3D Secure flow is cancelled, but there is no 3D Secure information available.
 */

/**
 * @name BraintreeError.3D Secure - Internal Error Codes
 * @ignore
 * @description Errors that occur internally
 * @property {INTERNAL} THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN Occurs when iframe is initialized on a non-verified domain.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  THREEDS_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NOT_ENABLED',
    message: '3D Secure is not enabled for this merchant.'
  },
  THREEDS_CAN_NOT_USE_TOKENIZATION_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_CAN_NOT_USE_TOKENIZATION_KEY',
    message: '3D Secure can not use a tokenization key for authorization.'
  },
  THREEDS_HTTPS_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_HTTPS_REQUIRED',
    message: '3D Secure requires HTTPS.'
  },
  THREEDS_AUTHENTICATION_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_AUTHENTICATION_IN_PROGRESS',
    message: 'Cannot call verifyCard while existing authentication is in progress.'
  },
  THREEDS_MISSING_VERIFY_CARD_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_MISSING_VERIFY_CARD_OPTION'
  },
  THREEDS_NO_VERIFICATION_PAYLOAD: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NO_VERIFICATION_PAYLOAD',
    message: 'No verification payload available.'
  },
  THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
    type: BraintreeError.types.INTERNAL,
    code: 'THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN',
    message: 'Term Url must be on a Braintree domain.'
  }
};

},{"../../lib/braintree-error":91}],155:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');

module.exports = enumerate([
  'AUTHENTICATION_COMPLETE'
], 'threedsecure:');

},{"../../lib/enumerate":104}],156:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/unionpay
 * @description This module allows you to accept UnionPay payments. *It is currently in beta and is subject to change.*
 */

var UnionPay = _dereq_('./shared/unionpay');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var BraintreeError = _dereq_('../lib/braintree-error');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var analytics = _dereq_('../lib/analytics');
var errors = _dereq_('./shared/errors');
var VERSION = "3.42.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
* @static
* @function create
* @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
* @param {callback} [callback] The second argument, `data`, is the {@link UnionPay} instance. If no callback is provided, `create` returns a promise that resolves with the {@link UnionPay} instance.
* @returns {Promise|void} Returns a promise if no callback is provided.
* @example
* braintree.unionpay.create({ client: clientInstance }, function (createErr, unionpayInstance) {
*   if (createErr) {
*     console.error(createErr);
*     return;
*   }
*   // ...
* });
*/
function create(options) {
  var name = 'UnionPay';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var config = client.getConfiguration();

    options.client = client;

    if (!config.gatewayConfiguration.unionPay || config.gatewayConfiguration.unionPay.enabled !== true) {
      return Promise.reject(new BraintreeError(errors.UNIONPAY_NOT_ENABLED));
    }

    analytics.sendEvent(options.client, 'unionpay.initialized');

    return new UnionPay(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./shared/errors":158,"./shared/unionpay":159,"@braintree/wrap-promise":25}],157:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');

module.exports = {
  events: enumerate([
    'HOSTED_FIELDS_FETCH_CAPABILITIES',
    'HOSTED_FIELDS_ENROLL',
    'HOSTED_FIELDS_TOKENIZE'
  ], 'union-pay:'),
  HOSTED_FIELDS_FRAME_NAME: 'braintreeunionpayhostedfields'
};

},{"../../lib/enumerate":104}],158:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Union Pay - Creation Error Codes
 * @description Errors that occur when [creating the Union Pay component](/current/module-braintree-web_union-pay.html#.create).
 * @property {MERCHANT} UNIONPAY_NOT_ENABLED Occurs when Union Pay is not enabled on the Braintree control panel.
 */

/**
 * @name BraintreeError.Union Pay - Shared Error Codes
 * @description Errors that occur when starting the Union Pay Flow
 * @property {MERCHANT} UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES Occurs when a method is used with both card details and a Hosted Fields instance.
 * @property {MERCHANT} UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID Occurs when Hosted Fields instance used is not a valid Hosted Fields instance.
 * @property {MERCHANT} UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED Occurs when neither card detals or Hosted Fields are used.
 * @property {MERCHANT} UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED Occurs when Hosted Fields cannot be found on the page.
 */

/**
 * @name BraintreeError.Union Pay - fetchCapabilities Error Codes
 * @description Errors that occur when using the [`fetchCapabilities` method](/current/UnionPay.html#fetchCapabilities).
 * @property {NETWORK} UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR Occurs when there is an error looking up the Union Pay capabilities.
 */

/**
 * @name BraintreeError.Union Pay - enroll Error Codes
 * @description Errors that occur when using the [`enroll` method](/current/UnionPay.html#enroll).
 * @property {MERCHANT} UNIONPAY_MISSING_MOBILE_PHONE_DATA Occurs when no mobile phone data is provided.
 * @property {MERCHANT} UNIONPAY_EXPIRATION_DATE_INCOMPLETE Occurs when expiration date is incomplete.
 * @property {CUSTOMER} UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID Occurs when customer enrollment input is invalid.
 * @property {NETWORK} UNIONPAY_ENROLLMENT_NETWORK_ERROR Occurs when there is an error during enrollment.
 */

/**
 * @name BraintreeError.Union Pay - tokenize Error Codes
 * @description Errors that occur when using the [`tokenize` method](/current/UnionPay.html#tokenize).
 * @property {CUSTOMER} UNIONPAY_FAILED_TOKENIZATION Occurs when data cannot be tokenized.
 * @property {NETWORK} UNIONPAY_TOKENIZATION_NETWORK_ERROR Occurs when the Braintree gateway cannot be reached.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  UNIONPAY_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_NOT_ENABLED',
    message: 'UnionPay is not enabled for this merchant.'
  },
  UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID',
    message: 'Found an invalid Hosted Fields instance. Please use a valid Hosted Fields instance.'
  },
  UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED',
    message: 'Could not find the Hosted Fields instance.'
  },
  UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED',
    message: 'A card or a Hosted Fields instance is required. Please supply a card or a Hosted Fields instance.'
  },
  UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES',
    message: 'Please supply either a card or a Hosted Fields instance, not both.'
  },
  UNIONPAY_EXPIRATION_DATE_INCOMPLETE: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_EXPIRATION_DATE_INCOMPLETE',
    message: 'You must supply expiration month and year or neither.'
  },
  UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID: {
    type: BraintreeError.types.CUSTOMER,
    code: 'UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID',
    message: 'Enrollment failed due to user input error.'
  },
  UNIONPAY_ENROLLMENT_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'UNIONPAY_ENROLLMENT_NETWORK_ERROR',
    message: 'Could not enroll UnionPay card.'
  },
  UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR',
    message: 'Could not fetch card capabilities.'
  },
  UNIONPAY_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'UNIONPAY_TOKENIZATION_NETWORK_ERROR',
    message: 'A tokenization network error occurred.'
  },
  UNIONPAY_MISSING_MOBILE_PHONE_DATA: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_MISSING_MOBILE_PHONE_DATA',
    message: 'A `mobile` with `countryCode` and `number` is required.'
  },
  UNIONPAY_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: 'UNIONPAY_FAILED_TOKENIZATION',
    message: 'The supplied card data failed tokenization.'
  }
};

},{"../../lib/braintree-error":91}],159:[function(_dereq_,module,exports){
'use strict';

var analytics = _dereq_('../../lib/analytics');
var BraintreeError = _dereq_('../../lib/braintree-error');
var Bus = _dereq_('../../lib/bus');
var constants = _dereq_('./constants');
var useMin = _dereq_('../../lib/use-min');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var errors = _dereq_('./errors');
var events = constants.events;
var iFramer = _dereq_('@braintree/iframer');
var methods = _dereq_('../../lib/methods');
var VERSION = "3.42.0";
var uuid = _dereq_('../../lib/vendor/uuid');
var Promise = _dereq_('../../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @class
 * @param {object} options See {@link module:braintree-web/unionpay.create|unionpay.create}.
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/unionpay.create|braintree-web.unionpay.create} instead.</strong>
 * @classdesc This class represents a UnionPay component. Instances of this class have methods for {@link UnionPay#fetchCapabilities fetching capabilities} of UnionPay cards, {@link UnionPay#enroll enrolling} a UnionPay card, and {@link UnionPay#tokenize tokenizing} a UnionPay card.
 */
function UnionPay(options) {
  this._options = options;
}

/**
 * @typedef {object} UnionPay~fetchCapabilitiesPayload
 * @property {boolean} isUnionPay Determines if this card is a UnionPay card.
 * @property {boolean} isDebit Determines if this card is a debit card. This property is only present if `isUnionPay` is `true`.
 * @property {object} unionPay UnionPay specific properties. This property is only present if `isUnionPay` is `true`.
 * @property {boolean} unionPay.supportsTwoStepAuthAndCapture Determines if the card allows for an authorization, but settling the transaction later.
 * @property {boolean} unionPay.isSupported Determines if Braintree can process this UnionPay card. When false, Braintree cannot process this card and the user should use a different card.
 */

/**
 * Fetches the capabilities of a card, including whether or not the SMS enrollment process is required.
 * @public
 * @param {object} options UnionPay {@link UnionPay#fetchCapabilities fetchCapabilities} options
 * @param {object} [options.card] The card from which to fetch capabilities. Note that this will only have one property, `number`. Required if you are not using the `hostedFields` option.
 * @param {string} options.card.number Card number.
 * @param {HostedFields} [options.hostedFields] The Hosted Fields instance used to collect card data. Required if you are not using the `card` option.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link UnionPay#fetchCapabilitiesPayload fetchCapabilitiesPayload}. If no callback is provided, `fetchCapabilities` returns a promise that resolves with a {@link UnionPay#fetchCapabilitiesPayload fetchCapabilitiesPayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
UnionPay.prototype.fetchCapabilities = function (options) {
  var self = this;
  var client = this._options.client;
  var cardNumber = options.card ? options.card.number : null;
  var hostedFields = options.hostedFields;

  if (cardNumber && hostedFields) {
    return Promise.reject(new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES));
  } else if (cardNumber) {
    return client.request({
      method: 'get',
      endpoint: 'payment_methods/credit_cards/capabilities',
      data: {
        _meta: {source: 'unionpay'},
        creditCard: {
          number: cardNumber
        }
      }
    }).then(function (response) {
      analytics.sendEvent(client, 'unionpay.capabilities-received');

      return response;
    }).catch(function (err) {
      var status = err.details && err.details.httpStatus;

      analytics.sendEvent(client, 'unionpay.capabilities-failed');

      if (status === 403) {
        return Promise.reject(err);
      }

      return Promise.reject(new BraintreeError({
        type: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.type,
        code: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.code,
        message: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.message,
        details: {
          originalError: err
        }
      }));
    });
  } else if (hostedFields) {
    if (!hostedFields._bus) {
      return Promise.reject(new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));
    }

    return new Promise(function (resolve, reject) {
      self._initializeHostedFields(function () {
        self._bus.emit(events.HOSTED_FIELDS_FETCH_CAPABILITIES, {hostedFields: hostedFields}, function (response) {
          if (response.err) {
            reject(new BraintreeError(response.err));

            return;
          }

          resolve(response.payload);
        });
      });
    });
  }

  return Promise.reject(new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED));
};

/**
 * @typedef {object} UnionPay~enrollPayload
 * @property {string} enrollmentId UnionPay enrollment ID. This value should be passed to `tokenize`.
 * @property {boolean} smsCodeRequired UnionPay `smsCodeRequired` flag.
 * </p><b>true</b> - the user will receive an SMS code that needs to be supplied for tokenization.
 * </p><b>false</b> - the card can be immediately tokenized.
 */

/**
 * Enrolls a UnionPay card. Use {@link UnionPay#fetchCapabilities|fetchCapabilities} to determine if the SMS enrollment process is required.
 * @public
 * @param {object} options UnionPay enrollment options:
 * @param {object} [options.card] The card to enroll. Required if you are not using the `hostedFields` option.
 * @param {string} options.card.number The card number.
 * @param {string} [options.card.expirationDate] The card's expiration date. May be in the form `MM/YY` or `MM/YYYY`. When defined `expirationMonth` and `expirationYear` are ignored.
 * @param {string} [options.card.expirationMonth] The card's expiration month. This should be used with the `expirationYear` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {string} [options.card.expirationYear] The card's expiration year. This should be used with the `expirationMonth` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {HostedFields} [options.hostedFields] The Hosted Fields instance used to collect card data. Required if you are not using the `card` option.
 * @param {object} options.mobile The mobile information collected from the customer.
 * @param {string} options.mobile.countryCode The country code of the customer's mobile phone number.
 * @param {string} options.mobile.number The customer's mobile phone number.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link UnionPay~enrollPayload|enrollPayload}. If no callback is provided, `enroll` returns a promise that resolves with {@link UnionPay~enrollPayload|enrollPayload}.
 * @returns {void}
 */
UnionPay.prototype.enroll = function (options) {
  var self = this;
  var client = this._options.client;
  var card = options.card;
  var mobile = options.mobile;
  var hostedFields = options.hostedFields;
  var data;

  if (!mobile) {
    return Promise.reject(new BraintreeError(errors.UNIONPAY_MISSING_MOBILE_PHONE_DATA));
  }

  if (hostedFields) {
    if (!hostedFields._bus) {
      return Promise.reject(new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));
    } else if (card) {
      return Promise.reject(new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES));
    }

    return new Promise(function (resolve, reject) {
      self._initializeHostedFields(function () {
        self._bus.emit(events.HOSTED_FIELDS_ENROLL, {hostedFields: hostedFields, mobile: mobile}, function (response) {
          if (response.err) {
            reject(new BraintreeError(response.err));

            return;
          }

          resolve(response.payload);
        });
      });
    });
  } else if (card && card.number) {
    data = {
      _meta: {source: 'unionpay'},
      unionPayEnrollment: {
        number: card.number,
        mobileCountryCode: mobile.countryCode,
        mobileNumber: mobile.number
      }
    };

    if (card.expirationDate) {
      data.unionPayEnrollment.expirationDate = card.expirationDate;
    } else if (card.expirationMonth || card.expirationYear) {
      if (card.expirationMonth && card.expirationYear) {
        data.unionPayEnrollment.expirationYear = card.expirationYear;
        data.unionPayEnrollment.expirationMonth = card.expirationMonth;
      } else {
        return Promise.reject(new BraintreeError(errors.UNIONPAY_EXPIRATION_DATE_INCOMPLETE));
      }
    }

    return client.request({
      method: 'post',
      endpoint: 'union_pay_enrollments',
      data: data
    }).then(function (response) {
      analytics.sendEvent(client, 'unionpay.enrollment-succeeded');

      return {
        enrollmentId: response.unionPayEnrollmentId,
        smsCodeRequired: response.smsCodeRequired
      };
    }).catch(function (err) {
      var error;
      var status = err.details && err.details.httpStatus;

      if (status === 403) {
        error = err;
      } else if (status < 500) {
        error = new BraintreeError(errors.UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID);
        error.details = {originalError: err};
      } else {
        error = new BraintreeError(errors.UNIONPAY_ENROLLMENT_NETWORK_ERROR);
        error.details = {originalError: err};
      }

      analytics.sendEvent(client, 'unionpay.enrollment-failed');

      return Promise.reject(error);
    });
  }

  return Promise.reject(new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED));
};

/**
 * @typedef {object} UnionPay~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type Always <code>CreditCard</code>.
 * @property {object} details Additional account details:
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 */

/**
 * Tokenizes a UnionPay card and returns a nonce payload.
 * @public
 * @param {object} options UnionPay tokenization options:
 * @param {object} [options.card] The card to enroll. Required if you are not using the `hostedFields` option.
 * @param {string} options.card.number The card number.
 * @param {string} [options.card.expirationDate] The card's expiration date. May be in the form `MM/YY` or `MM/YYYY`. When defined `expirationMonth` and `expirationYear` are ignored.
 * @param {string} [options.card.expirationMonth] The card's expiration month. This should be used with the `expirationYear` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {string} [options.card.expirationYear] The card's expiration year. This should be used with the `expirationMonth` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {string} [options.card.cvv] The card's security number.
 * @param {HostedFields} [options.hostedFields] The Hosted Fields instance used to collect card data. Required if you are not using the `card` option.
 * @param {string} options.enrollmentId The enrollment ID from {@link UnionPay#enroll}.
 * @param {string} [options.smsCode] The SMS code received from the user if {@link UnionPay#enroll} payload have `smsCodeRequired`. if `smsCodeRequired` is false, smsCode should not be passed.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link UnionPay~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a promise that resolves with a {@link UnionPay~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
UnionPay.prototype.tokenize = function (options) {
  var data;
  var self = this;
  var client = this._options.client;
  var card = options.card;
  var hostedFields = options.hostedFields;

  if (card && hostedFields) {
    return Promise.reject(new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES));
  } else if (card) {
    data = {
      _meta: {source: 'unionpay'},
      creditCard: {
        number: options.card.number,
        options: {
          unionPayEnrollment: {
            id: options.enrollmentId
          }
        }
      }
    };

    if (options.smsCode) {
      data.creditCard.options.unionPayEnrollment.smsCode = options.smsCode;
    }

    if (card.expirationDate) {
      data.creditCard.expirationDate = card.expirationDate;
    } else if (card.expirationMonth && card.expirationYear) {
      data.creditCard.expirationYear = card.expirationYear;
      data.creditCard.expirationMonth = card.expirationMonth;
    }

    if (options.card.cvv) {
      data.creditCard.cvv = options.card.cvv;
    }

    return client.request({
      method: 'post',
      endpoint: 'payment_methods/credit_cards',
      data: data
    }).then(function (response) {
      var tokenizedCard = response.creditCards[0];

      delete tokenizedCard.consumed;
      delete tokenizedCard.threeDSecureInfo;

      analytics.sendEvent(client, 'unionpay.nonce-received');

      return tokenizedCard;
    }).catch(function (err) {
      var error;
      var status = err.details && err.details.httpStatus;

      analytics.sendEvent(client, 'unionpay.nonce-failed');

      if (status === 403) {
        error = err;
      } else if (status < 500) {
        error = new BraintreeError(errors.UNIONPAY_FAILED_TOKENIZATION);
        error.details = {originalError: err};
      } else {
        error = new BraintreeError(errors.UNIONPAY_TOKENIZATION_NETWORK_ERROR);
        error.details = {originalError: err};
      }

      return Promise.reject(error);
    });
  } else if (hostedFields) {
    if (!hostedFields._bus) {
      return Promise.reject(new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));
    }

    return new Promise(function (resolve, reject) {
      self._initializeHostedFields(function () {
        self._bus.emit(events.HOSTED_FIELDS_TOKENIZE, options, function (response) {
          if (response.err) {
            reject(new BraintreeError(response.err));

            return;
          }

          resolve(response.payload);
        });
      });
    });
  }

  return Promise.reject(new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED));
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/unionpay.create|create}. This only needs to be called when using UnionPay with Hosted Fields.
 * @public
 * @param {callback} [callback] Called on completion. If no callback is provided, returns a promise.
 * @example
 * unionpayInstance.teardown();
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
UnionPay.prototype.teardown = function () {
  if (this._bus) {
    this._hostedFieldsFrame.parentNode.removeChild(this._hostedFieldsFrame);
    this._bus.teardown();
  }

  convertMethodsToError(this, methods(UnionPay.prototype));

  return Promise.resolve();
};

UnionPay.prototype._initializeHostedFields = function (callback) {
  var assetsUrl, isDebug;
  var componentId = uuid();

  if (this._bus) {
    callback();

    return;
  }

  assetsUrl = this._options.client.getConfiguration().gatewayConfiguration.assetsUrl;
  isDebug = this._options.client.getConfiguration().isDebug;

  this._bus = new Bus({
    channel: componentId,
    merchantUrl: location.href
  });
  this._hostedFieldsFrame = iFramer({
    name: constants.HOSTED_FIELDS_FRAME_NAME + '_' + componentId,
    src: assetsUrl + '/web/' + VERSION + '/html/unionpay-hosted-fields-frame' + useMin(isDebug) + '.html',
    height: 0,
    width: 0
  });

  this._bus.on(Bus.events.CONFIGURATION_REQUEST, function (reply) {
    reply(this._options.client);

    callback();
  }.bind(this));

  document.body.appendChild(this._hostedFieldsFrame);
};

module.exports = wrapPromise.wrapPrototype(UnionPay);

},{"../../lib/analytics":86,"../../lib/braintree-error":91,"../../lib/bus":94,"../../lib/convert-methods-to-error":97,"../../lib/methods":124,"../../lib/promise":126,"../../lib/use-min":128,"../../lib/vendor/uuid":130,"./constants":157,"./errors":158,"@braintree/iframer":18,"@braintree/wrap-promise":25}],160:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  PLAID_LINK_JS: 'https://cdn.plaid.com/link/v2/stable/link-initialize.js'
};

},{}],161:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Us Bank Account - Creation Error Codes
 * @description Errors that occur when [creating the Us Bank Account component](/current/module-braintree-web_us-bank-account.html#.create).
 * @property {MERCHANT} US_BANK_ACCOUNT_NOT_ENABLED Occurs when US Bank Account is not enabled in the Braintree control panel.
 */

/**
 * @name BraintreeError.Us Bank Account - tokenize Error Codes
 * @description Errors that occur when using the [`tokenize` method](/current/UsBankAccount.html#tokenize).
 * @property {MERCHANT} US_BANK_ACCOUNT_OPTION_REQUIRED Occurs when a required option is not passed.
 * @property {MERCHANT} US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS Occurs when 1 or more incompatible options are passsed.
 * @property {NETWORK} US_BANK_ACCOUNT_LOGIN_LOAD_FAILED Occurs when bank login flow fails.
 * @property {CUSTOMER} US_BANK_ACCOUNT_LOGIN_CLOSED Occurs when bank login window is closed.
 * @property {MERCHANT} US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE Occurs when a bank login flow is already active.
 * @property {NETWORK} US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR Occurs when payment details could not be tokenized.
 * @property {CUSTOMER} US_BANK_ACCOUNT_FAILED_TOKENIZATION Occurs when payment details failed to be tokenized.
 * @property {MERCHANT} US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED Occurs when bank login flow is not enabled in the Braintree control panel.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  US_BANK_ACCOUNT_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'US_BANK_ACCOUNT_OPTION_REQUIRED'
  },
  US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS'
  },
  US_BANK_ACCOUNT_LOGIN_LOAD_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'US_BANK_ACCOUNT_LOGIN_LOAD_FAILED',
    message: 'Bank login flow failed to load.'
  },
  US_BANK_ACCOUNT_LOGIN_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'US_BANK_ACCOUNT_LOGIN_CLOSED',
    message: 'Customer closed bank login flow before authorizing.'
  },
  US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE',
    message: 'Another bank login tokenization request is active.'
  },
  US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR',
    message: 'A tokenization network error occurred.'
  },
  US_BANK_ACCOUNT_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: 'US_BANK_ACCOUNT_FAILED_TOKENIZATION',
    message: 'The supplied data failed tokenization.'
  },
  US_BANK_ACCOUNT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'US_BANK_ACCOUNT_NOT_ENABLED',
    message: 'US bank account is not enabled.'
  },
  US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED',
    message: 'Bank login is not enabled.'
  }
};

},{"../lib/braintree-error":91}],162:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/us-bank-account
 * @description This module is for accepting payments of US bank accounts.
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 */

var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var BraintreeError = _dereq_('../lib/braintree-error');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var errors = _dereq_('./errors');
var USBankAccount = _dereq_('./us-bank-account');
var VERSION = "3.42.0";
var sharedErrors = _dereq_('../lib/errors');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} [callback] The second argument, `data`, is the {@link USBankAccount} instance. If no callback is provided, `create` returns a promise that resolves with the {@link USBankAccount} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'US Bank Account';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var usBankAccount;
    var braintreeApi = client.getConfiguration().gatewayConfiguration.braintreeApi;

    options.client = client;

    if (!braintreeApi) {
      return Promise.reject(new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED));
    }

    usBankAccount = options.client.getConfiguration().gatewayConfiguration.usBankAccount;
    if (!usBankAccount) {
      return Promise.reject(new BraintreeError(errors.US_BANK_ACCOUNT_NOT_ENABLED));
    }

    return new USBankAccount(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/errors":105,"../lib/promise":126,"./errors":161,"./us-bank-account":163,"@braintree/wrap-promise":25}],163:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('../lib/braintree-error');
var constants = _dereq_('./constants');
var errors = _dereq_('./errors');
var sharedErrors = _dereq_('../lib/errors');
var analytics = _dereq_('../lib/analytics');
var once = _dereq_('../lib/once');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var methods = _dereq_('../lib/methods');
var camelCaseToSnakeCase = _dereq_('../lib/camel-case-to-snake-case');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @typedef {object} USBankAccount~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `us_bank_account`.
 * @property {object} details Additional account details. Currently empty.
 */

/**
 * @class
 * @param {object} options See {@link module:braintree-web/us-bank-account.create|us-bank-account.create}.
 * @classdesc This class represents a US Bank Account component. Instances of this class can tokenize raw bank details or present a bank login. <strong>You cannot use this constructor directly. Use {@link module:braintree-web/us-bank-account.create|braintree.us-bank-account.create} instead.</strong>
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 */
function USBankAccount(options) {
  this._client = options.client;

  this._isTokenizingBankLogin = false;

  analytics.sendEvent(this._client, 'usbankaccount.initialized');
}

/**
 * Tokenizes bank information to return a payment method nonce. You can tokenize bank details by providing information like account and routing numbers. You can also tokenize with a bank login UI that prompts the customer to log into their bank account.
 * @public
 * @param {object} options All tokenization options for the US Bank Account component.
 * @param {string} options.mandateText A string for proof of customer authorization. For example, `'I authorize Braintree to debit my bank account on behalf of My Online Store.'`.
 * @param {object} [options.bankDetails] Bank detail information (such as account and routing numbers). `bankDetails` or `bankLogin` option must be provided.
 * @param {string} options.bankDetails.routingNumber The customer's bank routing number, such as `'307075259'`.
 * @param {string} options.bankDetails.accountNumber The customer's bank account number, such as `'999999999'`.
 * @param {string} options.bankDetails.accountType The customer's bank account type. Must be `'checking'` or `'savings'`.
 * @param {string} options.bankDetails.ownershipType The customer's bank account ownership type. Must be `'personal'` or `'business'`.
 * @param {string} [options.bankDetails.firstName] The customer's first name. Required when account ownership type is `personal`.
 * @param {string} [options.bankDetails.lastName] The customer's last name. Required when account ownership type is `personal`.
 * @param {string} [options.bankDetails.businessName] The customer's business name. Required when account ownership type is `business`.
 * @param {object} options.bankDetails.billingAddress The customer's billing address.
 * @param {string} options.bankDetails.billingAddress.streetAddress The street address for the customer's billing address, such as `'123 Fake St'`.
 * @param {string} [options.bankDetails.billingAddress.extendedAddress] The extended street address for the customer's billing address, such as `'Apartment B'`.
 * @param {string} options.bankDetails.billingAddress.locality The locality for the customer's billing address. This is typically a city, such as `'San Francisco'`.
 * @param {string} options.bankDetails.billingAddress.region The region for the customer's billing address. This is typically a state, such as `'CA'`.
 * @param {string} options.bankDetails.billingAddress.postalCode The postal code for the customer's billing address. This is typically a ZIP code, such as `'94119'`.
 * @param {object} [options.bankLogin] Bank login information. `bankLogin` or `bankDetails` option must be provided.
 * @param {string} options.bankLogin.displayName Display name for the bank login UI, such as `'My Store'`.
 * @param {string} options.bankLogin.ownershipType The customer's bank account ownership type. Must be `'personal'` or `'business'`.
 * @param {string} [options.bankLogin.firstName] The customer's first name. Required when account ownership type is `personal`.
 * @param {string} [options.bankLogin.lastName] The customer's last name. Required when account ownership type is `personal`.
 * @param {string} [options.bankLogin.businessName] The customer's business name. Required when account ownership type is `business`.
 * @param {object} options.bankLogin.billingAddress The customer's billing address.
 * @param {string} options.bankLogin.billingAddress.streetAddress The street address for the customer's billing address, such as `'123 Fake St'`.
 * @param {string} [options.bankLogin.billingAddress.extendedAddress] The extended street address for the customer's billing address, such as `'Apartment B'`.
 * @param {string} options.bankLogin.billingAddress.locality The locality for the customer's billing address. This is typically a city, such as `'San Francisco'`.
 * @param {string} options.bankLogin.billingAddress.region The region for the customer's billing address. This is typically a state, such as `'CA'`.
 * @param {string} options.bankLogin.billingAddress.postalCode The postal code for the customer's billing address. This is typically a ZIP code, such as `'94119'`.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link USBankAccount~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a promise that resolves with {@link USBankAccount~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * <caption>Tokenizing raw bank details</caption>
 * var routingNumberInput = document.querySelector('input[name="routing-number"]');
 * var accountNumberInput = document.querySelector('input[name="account-number"]');
 * var accountTypeInput = document.querySelector('input[name="account-type"]:checked');
 * var ownershipTypeInput = document.querySelector('input[name="ownership-type"]:checked');
 * var firstNameInput = document.querySelector('input[name="first-name"]');
 * var lastNameInput = document.querySelector('input[name="last-name"]');
 * var businessNameInput = document.querySelector('input[name="business-name"]');
 * var billingAddressStreetInput = document.querySelector('input[name="street-address"]');
 * var billingAddressExtendedInput = document.querySelector('input[name="extended-address"]');
 * var billingAddressLocalityInput = document.querySelector('input[name="locality"]');
 * var billingAddressRegionSelect = document.querySelector('select[name="region"]');
 * var billingAddressPostalInput = document.querySelector('input[name="postal-code"]');
 *
 * submitButton.addEventListener('click', function (event) {
 *   var bankDetails = {
 *     routingNumber: routingNumberInput.value,
 *     accountNumber: accountNumberInput.value,
 *     accountType: accountTypeInput.value,
 *     ownershipType: ownershipTypeInput.value,
 *     billingAddress: {
 *       streetAddress: billingAddressStreetInput.value,
 *       extendedAddress: billingAddressExtendedInput.value,
 *       locality: billingAddressLocalityInput.value,
 *       region: billingAddressRegionSelect.value,
 *       postalCode: billingAddressPostalInput.value
 *     }
 *   };
 *
 *   if (bankDetails.ownershipType === 'personal') {
 *     bankDetails.firstName = firstNameInput.value;
 *     bankDetails.lastName = lastNameInput.value;
 *   } else {
 *     bankDetails.businessName = businessNameInput.value;
 *   }
 *
 *   event.preventDefault();
 *
 *   usBankAccountInstance.tokenize({
 *     bankDetails: bankDetails,
 *     mandateText: 'I authorize Braintree to debit my bank account on behalf of My Online Store.'
 *   }, function (tokenizeErr, tokenizedPayload) {
 *     if (tokenizeErr) {
 *       console.error('There was an error tokenizing the bank details.');
 *       return;
 *     }
 *
 *     // Send tokenizePayload.nonce to your server here!
 *   });
 * });
 * @example
 * <caption>Tokenizing with bank login UI</caption>
 * var ownershipTypeInput = document.querySelector('input[name="ownership-type"]:checked');
 * var firstNameInput = document.querySelector('input[name="first-name"]');
 * var lastNameInput = document.querySelector('input[name="last-name"]');
 * var businessNameInput = document.querySelector('input[name="business-name"]');
 * var billingAddressStreetInput = document.querySelector('input[name="street-address"]');
 * var billingAddressExtendedInput = document.querySelector('input[name="extended-address"]');
 * var billingAddressLocalityInput = document.querySelector('input[name="locality"]');
 * var billingAddressRegionSelect = document.querySelector('select[name="region"]');
 * var billingAddressPostalInput = document.querySelector('input[name="postal-code"]');
 *
 * bankLoginButton.addEventListener('click', function (event) {
 *   var bankLogin = {
 *     displayName: 'My Online Store',
 *     ownershipType: ownershipTypeInput.value,
 *     billingAddress: {
 *       streetAddress: billingAddressStreetInput.value,
 *       extendedAddress: billingAddressExtendedInput.value,
 *       locality: billingAddressLocalityInput.value,
 *       region: billingAddressRegionSelect.value,
 *       postalCode: billingAddressPostalInput.value
 *     }
 *   }
 *   event.preventDefault();
 *
 *   if (bankLogin.ownershipType === 'personal') {
 *     bankLogin.firstName = firstNameInput.value;
 *     bankLogin.lastName = lastNameInput.value;
 *   } else {
 *     bankLogin.businessName = businessNameInput.value;
 *   }
 *
 *   usBankAccountInstance.tokenize({
 *     bankLogin: bankLogin,
 *     mandateText: 'I authorize Braintree to debit my bank account on behalf of My Online Store.'
 *   }, function (tokenizeErr, tokenizedPayload) {
 *     if (tokenizeErr) {
 *       console.error('There was an error tokenizing the bank details.');
 *       return;
 *     }
 *
 *     // Send tokenizePayload.nonce to your server here!
 *   });
 * });
 */
USBankAccount.prototype.tokenize = function (options) {
  options = options || {};

  if (!options.mandateText) {
    return Promise.reject(new BraintreeError({
      type: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
      code: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
      message: 'mandateText property is required.'
    }));
  }

  if (options.bankDetails && options.bankLogin) {
    return Promise.reject(new BraintreeError({
      type: errors.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.type,
      code: errors.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.code,
      message: 'tokenize must be called with bankDetails or bankLogin, not both.'
    }));
  } else if (options.bankDetails) {
    return this._tokenizeBankDetails(options);
  } else if (options.bankLogin) {
    return this._tokenizeBankLogin(options);
  }

  return Promise.reject(new BraintreeError({
    type: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
    code: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
    message: 'tokenize must be called with bankDetails or bankLogin.'
  }));
};

USBankAccount.prototype._tokenizeBankDetails = function (options) {
  var client = this._client;
  var bankDetails = options.bankDetails;

  return client.request({
    method: 'POST',
    endpoint: 'tokens',
    api: 'braintreeApi',
    data: camelCaseToSnakeCase({
      type: 'us_bank_account',
      routingNumber: bankDetails.routingNumber,
      accountNumber: bankDetails.accountNumber,
      firstName: bankDetails.firstName,
      lastName: bankDetails.lastName,
      businessName: bankDetails.businessName,
      accountType: bankDetails.accountType,
      ownershipType: bankDetails.ownershipType,
      billingAddress: camelCaseToSnakeCase(bankDetails.billingAddress || {}),
      achMandate: {
        text: options.mandateText
      }
    })
  }).then(function (response) {
    analytics.sendEvent(client, 'usbankaccount.bankdetails.tokenization.succeeded');

    return Promise.resolve(formatTokenizeResponse(response));
  }).catch(function (err) {
    var error = errorFrom(err);

    analytics.sendEvent(client, 'usbankaccount.bankdetails.tokenization.failed');

    return Promise.reject(error);
  });
};

USBankAccount.prototype._tokenizeBankLogin = function (options) {
  var self = this;
  var client = this._client;
  var gatewayConfiguration = client.getConfiguration().gatewayConfiguration;
  var isProduction = gatewayConfiguration.environment === 'production';
  var plaidConfig = gatewayConfiguration.usBankAccount.plaid;

  if (!options.bankLogin.displayName) {
    return Promise.reject(new BraintreeError({
      type: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
      code: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
      message: 'displayName property is required when using bankLogin.'
    }));
  }

  if (!plaidConfig) {
    return Promise.reject(new BraintreeError(errors.US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED));
  }

  if (this._isTokenizingBankLogin) {
    return Promise.reject(new BraintreeError(errors.US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE));
  }
  this._isTokenizingBankLogin = true;

  return new Promise(function (resolve, reject) {
    self._loadPlaid(function (plaidLoadErr, plaid) {
      if (plaidLoadErr) {
        reject(plaidLoadErr);

        return;
      }

      plaid.create({
        clientName: options.bankLogin.displayName,
        apiVersion: 'v2',
        env: isProduction ? 'production' : 'sandbox',
        key: plaidConfig.publicKey,
        product: 'auth',
        selectAccount: true,
        onExit: function () {
          self._isTokenizingBankLogin = false;

          analytics.sendEvent(client, 'usbankaccount.banklogin.tokenization.closed.by-user');

          reject(new BraintreeError(errors.US_BANK_ACCOUNT_LOGIN_CLOSED));
        },
        onSuccess: function (publicToken, metadata) {
          client.request({
            method: 'POST',
            endpoint: 'tokens',
            api: 'braintreeApi',
            data: camelCaseToSnakeCase({
              type: 'plaid_public_token',
              publicToken: publicToken,
              accountId: isProduction ? metadata.account_id : 'plaid_account_id',
              achMandate: {
                text: options.mandateText
              },
              ownershipType: options.bankLogin.ownershipType,
              firstName: options.bankLogin.firstName,
              lastName: options.bankLogin.lastName,
              businessName: options.bankLogin.businessName,
              billingAddress: camelCaseToSnakeCase(options.bankLogin.billingAddress || {})
            })
          }).then(function (response) {
            self._isTokenizingBankLogin = false;

            analytics.sendEvent(client, 'usbankaccount.banklogin.tokenization.succeeded');

            resolve(formatTokenizeResponse(response));
          }).catch(function (tokenizeErr) {
            var error;

            self._isTokenizingBankLogin = false;
            error = errorFrom(tokenizeErr);

            analytics.sendEvent(client, 'usbankaccount.banklogin.tokenization.failed');

            reject(error);
          });
        }
      }).open();

      analytics.sendEvent(client, 'usbankaccount.banklogin.tokenization.started');
    });
  });
};

function errorFrom(err) {
  var error;
  var status = err.details && err.details.httpStatus;

  if (status === 401) {
    error = new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED);
  } else if (status < 500) {
    error = new BraintreeError(errors.US_BANK_ACCOUNT_FAILED_TOKENIZATION);
  } else {
    error = new BraintreeError(errors.US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR);
  }
  error.details = {originalError: err};

  return error;
}

function formatTokenizeResponse(response) {
  return {
    nonce: response.data.id,
    details: {},
    description: response.data.description,
    type: response.data.type
  };
}

USBankAccount.prototype._loadPlaid = function (callback) {
  var existingScript, script;

  callback = once(callback);

  if (global.Plaid) {
    callback(null, global.Plaid);

    return;
  }

  existingScript = document.querySelector('script[src="' + constants.PLAID_LINK_JS + '"]');

  if (existingScript) {
    addLoadListeners(existingScript, callback);
  } else {
    script = document.createElement('script');

    script.src = constants.PLAID_LINK_JS;
    script.async = true;

    addLoadListeners(script, callback);

    document.body.appendChild(script);

    this._plaidScript = script;
  }
};

function addLoadListeners(script, callback) {
  function loadHandler() {
    var readyState = this.readyState; // eslint-disable-line no-invalid-this

    if (!readyState || readyState === 'loaded' || readyState === 'complete') {
      removeLoadListeners();
      callback(null, global.Plaid);
    }
  }

  function errorHandler() {
    script.parentNode.removeChild(script);

    callback(new BraintreeError(errors.US_BANK_ACCOUNT_LOGIN_LOAD_FAILED));
  }

  function removeLoadListeners() {
    script.removeEventListener('error', errorHandler);
    script.removeEventListener('load', loadHandler);
    script.removeEventListener('readystatechange', loadHandler);
  }

  script.addEventListener('error', errorHandler);
  script.addEventListener('load', loadHandler);
  script.addEventListener('readystatechange', loadHandler);
}

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/us-bank-account.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * usBankAccountInstance.teardown();
 * @example <caption>With callback</caption>
 * usBankAccountInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
USBankAccount.prototype.teardown = function () {
  if (this._plaidScript) {
    document.body.removeChild(this._plaidScript);
  }

  convertMethodsToError(this, methods(USBankAccount.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(USBankAccount);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/analytics":86,"../lib/braintree-error":91,"../lib/camel-case-to-snake-case":95,"../lib/convert-methods-to-error":97,"../lib/errors":105,"../lib/methods":124,"../lib/once":125,"../lib/promise":126,"./constants":160,"./errors":161,"@braintree/wrap-promise":25}],164:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Vault Manager - deletePaymentMethod Error Codes
 * @description Errors that occur when using the [`deletePaymentMethod` method](/current/VaultManager.html#deletePaymentMethod).
 * @property {MERCHANT} VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN Occurs when vault manager is initalized with a tokenization key instead of a Client Token.
 * @property {MERCHANT} VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND Occurs when the specified payment method can not be found.
 * @property {UNKNOWN} VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR Occurs when there is an error attempting to delete the payment method.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN: {
    type: BraintreeError.types.MERCHANT,
    code: 'VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN',
    message: 'A client token with a customer id must be used to delete a payment method nonce.'
  },
  VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND: {
    type: BraintreeError.types.MERCHANT,
    code: 'VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND'
  },
  VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR'
  }
};

},{"../lib/braintree-error":91}],165:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/vault-manager
 * @description Manages customer's payment methods.
 */

var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var VaultManager = _dereq_('./vault-manager');
var VERSION = "3.42.0";
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} callback The second argument, `data`, is the {@link VaultManager} instance.
 * @returns {void}
 */
function create(options) {
  var name = 'Vault Manager';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    options.client = client;

    return new VaultManager(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":89,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"./vault-manager":166,"@braintree/wrap-promise":25}],166:[function(_dereq_,module,exports){
'use strict';

var analytics = _dereq_('../lib/analytics');
var BraintreeError = _dereq_('../lib/braintree-error');
var errors = _dereq_('./errors');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var methods = _dereq_('../lib/methods');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

var DELETE_PAYMENT_METHOD_MUTATION = 'mutation DeletePaymentMethodFromSingleUseToken($input: DeletePaymentMethodFromSingleUseTokenInput!) {' +
'  deletePaymentMethodFromSingleUseToken(input: $input) {' +
'    clientMutationId' +
'  }' +
'}';

/**
 * @typedef {array} VaultManager~fetchPaymentMethodsPayload The customer's payment methods.
 * @property {object} paymentMethod The payment method object.
 * @property {string} paymentMethod.nonce A nonce that can be sent to your server to transact on the payment method.
 * @property {boolean} paymentMethod.default Whether or not this is the default payment method for the customer.
 * @property {object} paymentMethod.details Any additional details about the payment method. Varies depending on the type of payment method.
 * @property {string} paymentMethod.type A constant indicating the type of payment method.
 * @property {?string} paymentMethod.description Additional description about the payment method.
 * @property {?object} paymentMethod.binData Bin data about the payment method.
 *
 */

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/vault-manager.create|braintree.vault-manager.create} instead.</strong>
 * @classdesc This class allows you to manage a customer's payment methods on the client.
 */
function VaultManager(options) {
  this._client = options.client;
}

/**
 * Fetches payment methods owned by the customer whose id was used to generate the client token used to create the {@link module:braintree-web/client|client}.
 * @public
 * @param {object} [options] Options for fetching payment methods.
 * @param {boolean} [options.defaultFirst = false] If `true`, the payment methods will be returned with the default payment method for the customer first. Otherwise, the payment methods will be returned with the most recently used payment method first.
 * @param {callback} [callback] The second argument is a {@link VaultManager~fetchPaymentMethodsPayload|fetchPaymentMehodsPayload}. This is also what is resolved by the promise if no callback is provided.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * vaultManagerInstance.fetchPaymentMethods(function (err, paymentMethods) {
 *   paymentMethods.forEach(function (paymentMethod) {
 *     // add payment method to UI
 *     // paymentMethod.nonce <- transactable nonce associated with payment method
 *     // paymentMethod.details <- object with additional information about payment method
 *     // paymentMethod.type <- a constant signifying the type
 *   });
 * });
 */
VaultManager.prototype.fetchPaymentMethods = function (options) {
  var defaultFirst;

  options = options || {};

  defaultFirst = options.defaultFirst === true ? 1 : 0;

  return this._client.request({
    endpoint: 'payment_methods',
    method: 'get',
    data: {
      defaultFirst: defaultFirst
    }
  }).then(function (paymentMethodsPayload) {
    analytics.sendEvent(this._client, 'vault-manager.fetch-payment-methods.succeeded');

    return paymentMethodsPayload.paymentMethods.map(formatPaymentMethodPayload);
  }.bind(this));
};

// TODO hide from jsdoc for now until the GraphQL API is on for all merchants by default
/**
 * Deletes a payment method owned by the customer whose id was used to generate the client token used to create the {@link module:braintree-web/client|client}.
 * @public
 * @ignore
 * @param {string} paymentMethodNonce The payment method nonce that references a vaulted payment method.
 * @param {callback} [callback] No data is returned if the operation is successful.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * vaultManagerInstance.deletePaymentMethod('nonce-to-delete', function (err) {
 *   // handle err if it exists
 * });
 */
VaultManager.prototype.deletePaymentMethod = function (paymentMethodNonce) {
  var client = this._client;
  var usesClientToken = this._client.getConfiguration().authorizationType === 'CLIENT_TOKEN';

  if (!usesClientToken) {
    return Promise.reject(new BraintreeError(errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN));
  }

  return this._client.request({
    api: 'graphQLApi',
    data: {
      query: DELETE_PAYMENT_METHOD_MUTATION,
      variables: {
        input: {
          singleUseTokenId: paymentMethodNonce
        }
      },
      operationName: 'DeletePaymentMethodFromSingleUseToken'
    }
  }).then(function () {
    analytics.sendEvent(client, 'vault-manager.delete-payment-method.succeeded');

    // noop to prevent sending back the raw graphql data
  }).catch(function (error) {
    var originalError = error.details.originalError;
    var formattedError;

    analytics.sendEvent(client, 'vault-manager.delete-payment-method.failed');

    if (originalError[0] && originalError[0].extensions.errorClass === 'NOT_FOUND') {
      formattedError = new BraintreeError({
        type: errors.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.type,
        code: errors.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.code,
        message: 'A payment method for payment method nonce `' + paymentMethodNonce + '` could not be found.',
        details: {
          originalError: originalError
        }
      });
    }

    if (!formattedError) {
      formattedError = new BraintreeError({
        type: errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.type,
        code: errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.code,
        message: 'An unknown error occured when attempting to delete the payment method assocaited with the payment method nonce `' + paymentMethodNonce + '`.',
        details: {
          originalError: originalError
        }
      });
    }

    return Promise.reject(formattedError);
  });
};

function formatPaymentMethodPayload(paymentMethod) {
  var formattedPaymentMethod = {
    nonce: paymentMethod.nonce,
    'default': paymentMethod.default,
    details: paymentMethod.details,
    hasSubscription: paymentMethod.hasSubscription,
    type: paymentMethod.type
  };

  if (paymentMethod.description) {
    formattedPaymentMethod.description = paymentMethod.description;
  }

  if (paymentMethod.binData) {
    formattedPaymentMethod.binData = paymentMethod.binData;
  }

  return formattedPaymentMethod;
}

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/vault-manager.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * vaultManagerInstance.teardown();
 * @example <caption>With callback</caption>
 * vaultManagerInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
VaultManager.prototype.teardown = function () {
  convertMethodsToError(this, methods(VaultManager.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(VaultManager);

},{"../lib/analytics":86,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/methods":124,"../lib/promise":126,"./errors":164,"@braintree/wrap-promise":25}],167:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/venmo */

var analytics = _dereq_('../lib/analytics');
var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var errors = _dereq_('./shared/errors');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var BraintreeError = _dereq_('../lib/braintree-error');
var Venmo = _dereq_('./venmo');
var Promise = _dereq_('../lib/promise');
var supportsVenmo = _dereq_('./shared/supports-venmo');
var VERSION = "3.42.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications. Doing so causes {@link Venmo#isBrowserSupported|isBrowserSupported} to return true only for mobile web browsers that support returning from the Venmo app to the same tab.
 * @param {string} [options.profileId] The Venmo profile ID to be used during payment authorization. Customers will see the business name and logo associated with this Venmo profile, and it will show up in the Venmo app as a "Connected Merchant". Venmo profile IDs can be found in the Braintree Control Panel. Omitting this value will use the default Venmo profile.
 * @param {string} [options.deepLinkReturnUrl] An override for the URL that the Venmo iOS app opens to return from an app switch.
 * @param {callback} [callback] The second argument, `data`, is the {@link Venmo} instance. If no callback is provided, `create` returns a promise that resolves with the {@link Venmo} instance.
 * @example
 * braintree.venmo.create({
 *   client: clientInstance
 * }).then(function (venmoInstance) {
 *   // venmoInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating Venmo instance', createErr);
 * });
 * @returns {Promise|void} Returns the Venmo instance.
 */
function create(options) {
  var name = 'Venmo';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    var instance;
    var configuration = client.getConfiguration();

    options.client = client;

    if (!configuration.gatewayConfiguration.payWithVenmo) {
      return Promise.reject(new BraintreeError(errors.VENMO_NOT_ENABLED));
    }

    if (options.profileId && typeof options.profileId !== 'string') {
      return Promise.reject(new BraintreeError(errors.VENMO_INVALID_PROFILE_ID));
    }

    if (options.deepLinkReturnUrl && typeof options.deepLinkReturnUrl !== 'string') {
      return Promise.reject(new BraintreeError(errors.VENMO_INVALID_DEEP_LINK_RETURN_URL));
    }

    instance = new Venmo(options);

    analytics.sendEvent(options.client, 'venmo.initialized');

    return instance._initialize();
  });
}

/**
 * @static
 * @function isBrowserSupported
 * @param {object} [options] browser support options:
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications.
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
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./shared/errors":170,"./shared/supports-venmo":171,"./venmo":172,"@braintree/wrap-promise":25}],168:[function(_dereq_,module,exports){
'use strict';

var isAndroid = _dereq_('@braintree/browser-detection/is-android');
var isChrome = _dereq_('@braintree/browser-detection/is-chrome');
var isIos = _dereq_('@braintree/browser-detection/is-ios');
var isIosSafari = _dereq_('@braintree/browser-detection/is-ios-safari');
var isSamsungBrowser = _dereq_('@braintree/browser-detection/is-samsung');
var isMobileFirefox = _dereq_('@braintree/browser-detection/is-mobile-firefox');

module.exports = {
  isAndroid: isAndroid,
  isChrome: isChrome,
  isIos: isIos,
  isIosSafari: isIosSafari,
  isSamsungBrowser: isSamsungBrowser,
  isMobileFirefox: isMobileFirefox
};

},{"@braintree/browser-detection/is-android":3,"@braintree/browser-detection/is-chrome":4,"@braintree/browser-detection/is-ios":13,"@braintree/browser-detection/is-ios-safari":10,"@braintree/browser-detection/is-mobile-firefox":14,"@braintree/browser-detection/is-samsung":15}],169:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY: 500,
  PROCESS_RESULTS_DELAY: 1000,
  VENMO_OPEN_URL: 'https://venmo.com/braintree/checkout'
};

},{}],170:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Venmo - Creation Error Codes
 * @description Errors that occur when [creating the Venmo component](/current/module-braintree-web_venmo.html#.create).
 * @property {MERCHANT} VENMO_NOT_ENABLED Occurs when Venmo is not enabled on the Braintree control panel.
 * @property {MERCHANT} VENMO_INVALID_PROFILE_ID Occurs when Venmo is intilaized with a profile id, but it is invalid.
 */

/**
 * @name BraintreeError.Venmo - tokenize Error Codes
 * @description Errors that occur when using the [`tokenize` method](/current/Venmo.html#tokenize).
 * @property {MERCHANT} VENMO_TOKENIZATION_REQUEST_ACTIVE Occurs when `tokenize` is called when the flow is already in progress.
 * @property {UNKNOWN} VENMO_APP_FAILED Occurs when tokenization fails.
 * @property {CUSTOMER} VENMO_APP_CANCELED Occurs when customer cancels flow from the Venmo app.
 * @property {CUSTOMER} VENMO_CANCELED Occurs when customer cancels the flow or Venmo app is not available.
 */

var BraintreeError = _dereq_('../../lib/braintree-error');

module.exports = {
  VENMO_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_NOT_ENABLED',
    message: 'Venmo is not enabled for this merchant.'
  },
  VENMO_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_TOKENIZATION_REQUEST_ACTIVE',
    message: 'Another tokenization request is active.'
  },
  VENMO_APP_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VENMO_APP_FAILED',
    message: 'Venmo app encountered a problem.'
  },
  VENMO_APP_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_APP_CANCELED',
    message: 'Venmo app authorization was canceled.'
  },
  VENMO_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_CANCELED',
    message: 'User canceled Venmo authorization, or Venmo app is not available.'
  },
  VENMO_INVALID_PROFILE_ID: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_INVALID_PROFILE_ID',
    message: 'Venmo profile ID is invalid.'
  },
  VENMO_INVALID_DEEP_LINK_RETURN_URL: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_INVALID_DEEP_LINK_RETURN_URL',
    message: 'Venmo deep link return URL is invalid.'
  }
};

},{"../../lib/braintree-error":91}],171:[function(_dereq_,module,exports){
'use strict';

var browserDetection = _dereq_('./browser-detection');

function isBrowserSupported(options) {
  var isAndroidChrome = browserDetection.isAndroid() && browserDetection.isChrome();
  var isIosChrome = browserDetection.isIos() && browserDetection.isChrome();
  var supportsReturnToSameTab = browserDetection.isIosSafari() || isAndroidChrome;
  var supportsReturnToNewTab = isIosChrome || browserDetection.isSamsungBrowser() || browserDetection.isMobileFirefox();

  options = options || {
    allowNewBrowserTab: true
  };

  return supportsReturnToSameTab || (options.allowNewBrowserTab && supportsReturnToNewTab);
}

module.exports = {
  isBrowserSupported: isBrowserSupported
};

},{"./browser-detection":168}],172:[function(_dereq_,module,exports){
(function (global){
'use strict';

var analytics = _dereq_('../lib/analytics');
var isBrowserSupported = _dereq_('./shared/supports-venmo');
var constants = _dereq_('./shared/constants');
var errors = _dereq_('./shared/errors');
var querystring = _dereq_('../lib/querystring');
var methods = _dereq_('../lib/methods');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var BraintreeError = _dereq_('../lib/braintree-error');
var Promise = _dereq_('../lib/promise');
var VERSION = "3.42.0";

/**
 * Venmo tokenize payload.
 * @typedef {object} Venmo~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `VenmoAccount`.
 * @property {object} details Additional Venmo account details.
 * @property {string} details.username Username of the Venmo account.
 */

/**
 * @class
 * @param {object} options The Venmo {@link module:braintree-web/venmo.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/venmo.create|braintree-web.venmo.create} instead.</strong>
 * @classdesc This class represents a Venmo component produced by {@link module:braintree-web/venmo.create|braintree-web/venmo.create}. Instances of this class have methods for tokenizing Venmo payments.
 */
function Venmo(options) {
  var configuration;

  this._client = options.client;
  configuration = this._client.getConfiguration();
  this._isDebug = configuration.isDebug;
  this._assetsUrl = configuration.gatewayConfiguration.assetsUrl + '/web/' + VERSION;
  this._allowNewBrowserTab = options.allowNewBrowserTab !== false;
  this._profileId = options.profileId;
  this._deepLinkReturnUrl = options.deepLinkReturnUrl;
}

Venmo.prototype._initialize = function () {
  var params = {};
  var currentUrl = this._deepLinkReturnUrl || global.location.href.replace(global.location.hash, '');
  var configuration = this._client.getConfiguration();
  var venmoConfiguration = configuration.gatewayConfiguration.payWithVenmo;
  var analyticsMetadata = this._client.getConfiguration().analyticsMetadata;
  var braintreeData = {
    _meta: {
      version: analyticsMetadata.sdkVersion,
      integration: analyticsMetadata.integration,
      platform: analyticsMetadata.platform,
      sessionId: analyticsMetadata.sessionId
    }
  };

  params['x-success'] = currentUrl + '#venmoSuccess=1';
  params['x-cancel'] = currentUrl + '#venmoCancel=1';
  params['x-error'] = currentUrl + '#venmoError=1';
  params.ua = global.navigator.userAgent;
  /* eslint-disable camelcase */
  params.braintree_merchant_id = this._profileId || venmoConfiguration.merchantId;
  params.braintree_access_token = venmoConfiguration.accessToken;
  params.braintree_environment = venmoConfiguration.environment;
  params.braintree_sdk_data = btoa(JSON.stringify(braintreeData));
  /* eslint-enable camelcase */

  this._url = constants.VENMO_OPEN_URL + '?' + querystring.stringify(params);

  return Promise.resolve(this);
};

/**
 * Returns a boolean indicating whether the current browser supports Venmo as a payment method.
 *
 * If `options.allowNewBrowserTab` is false when calling {@link module:braintree-web/venmo.create|venmo.create}, this method will return true only for browsers known to support returning from the Venmo app to the same browser tab. Currently, this is limited to iOS Safari and Android Chrome.
 * @public
 * @returns {boolean} True if the current browser is supported, false if not.
 */
Venmo.prototype.isBrowserSupported = function () {
  return isBrowserSupported.isBrowserSupported({
    allowNewBrowserTab: this._allowNewBrowserTab
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
  var params = getFragmentParameters();

  return typeof (params.venmoSuccess || params.venmoError || params.venmoCancel) !== 'undefined';
};

/**
 * Launches the Venmo flow and returns a nonce payload.
 *
 * If {@link Venmo#hasTokenizationResult|hasTokenizationResult} returns true, calling tokenize will immediately process and return the results without initiating the Venmo payment authorization flow.
 *
 * Only one Venmo flow can be active at a time. One way to achieve this is to disable your Venmo button while the flow is open.
 * @public
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link Venmo~tokenizePayload|tokenizePayload}. If no callback is provided, the method will return a Promise that resolves with a {@link Venmo~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
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
Venmo.prototype.tokenize = function () {
  var self = this;

  if (this._tokenizationInProgress === true) {
    return Promise.reject(new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_ACTIVE));
  }

  if (this.hasTokenizationResult()) {
    return this._processResults();
  }

  return new Promise(function (resolve, reject) {
    self._tokenizationInProgress = true;
    self._previousHash = global.location.hash;

    // Deep link URLs do not launch iOS apps from a webview when using window.open or PopupBridge.open.
    if (self._deepLinkReturnUrl) {
      global.location = self._url;
    } else {
      global.open(self._url);
    }

    // Subscribe to document visibility change events to detect when app switch
    // has returned.
    self._visibilityChangeListener = function () {
      if (!global.document.hidden) {
        self._tokenizationInProgress = false;

        setTimeout(function () {
          self._processResults().then(resolve).catch(reject).then(function () {
            global.location.hash = self._previousHash;
            self._removeVisibilityEventListener();
            delete self._visibilityChangeListener;
          });
        }, constants.PROCESS_RESULTS_DELAY);
      }
    };

    // Add a brief delay to ignore visibility change events that occur right before app switch
    setTimeout(function () {
      global.document.addEventListener(documentVisibilityChangeEventName(), self._visibilityChangeListener);
    }, constants.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY);
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
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Venmo.prototype.teardown = function () {
  this._removeVisibilityEventListener();
  convertMethodsToError(this, methods(Venmo.prototype));

  return Promise.resolve();
};

Venmo.prototype._removeVisibilityEventListener = function () {
  global.document.removeEventListener(documentVisibilityChangeEventName(), this._visibilityChangeListener);
};

Venmo.prototype._processResults = function () {
  var self = this;
  var params = getFragmentParameters();

  return new Promise(function (resolve, reject) {
    if (params.venmoSuccess) {
      analytics.sendEvent(self._client, 'venmo.appswitch.handle.success');
      resolve(formatTokenizePayload(params));
    } else if (params.venmoError) {
      analytics.sendEvent(self._client, 'venmo.appswitch.handle.error');
      reject(new BraintreeError({
        type: errors.VENMO_APP_FAILED.type,
        code: errors.VENMO_APP_FAILED.code,
        message: errors.VENMO_APP_FAILED.message,
        details: {
          originalError: {
            message: decodeURIComponent(params.errorMessage),
            code: params.errorCode
          }
        }
      }));
    } else if (params.venmoCancel) {
      analytics.sendEvent(self._client, 'venmo.appswitch.handle.cancel');
      reject(new BraintreeError(errors.VENMO_APP_CANCELED));
    } else {
      // User has either manually switched back to browser, or app is not available for app switch
      analytics.sendEvent(self._client, 'venmo.appswitch.cancel-or-unavailable');
      reject(new BraintreeError(errors.VENMO_CANCELED));
    }

    clearFragmentParameters();
  });
};

function getFragmentParameters() {
  var keyValuesArray = global.location.hash.substring(1).split('&');

  return keyValuesArray.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;

    return toReturn;
  }, {});
}

function clearFragmentParameters() {
  if (typeof global.history.replaceState === 'function' && global.location.hash) {
    history.pushState({}, '', global.location.href.slice(0, global.location.href.indexOf('#')));
  }
}

function formatTokenizePayload(fragmentParams) {
  return {
    nonce: fragmentParams.paymentMethodNonce,
    type: 'VenmoAccount',
    details: {
      username: fragmentParams.username
    }
  };
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function documentVisibilityChangeEventName() {
  var visibilityChange;

  if (typeof global.document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    visibilityChange = 'visibilitychange';
  } else if (typeof global.document.msHidden !== 'undefined') {
    visibilityChange = 'msvisibilitychange';
  } else if (typeof global.document.webkitHidden !== 'undefined') {
    visibilityChange = 'webkitvisibilitychange';
  }

  return visibilityChange;
}

module.exports = wrapPromise.wrapPrototype(Venmo);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/analytics":86,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/methods":124,"../lib/promise":126,"../lib/querystring":127,"./shared/constants":169,"./shared/errors":170,"./shared/supports-venmo":171,"@braintree/wrap-promise":25}],173:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.Visa Checkout - Creation Error Codes
 * @description Errors that occur when [creating the Visa Checkout component](/current/module-braintree-web_venmo.html#.create).
 * @property {MERCHANT} VISA_CHECKOUT_NOT_ENABLED Occurs when Visa Checkout is not enabled in the Braintree control panel.
 */

/**
 * @name BraintreeError.Visa Checkout - createInitOptions Error Codes
 * @description Errors that occur when using the [`createInitOptions` method](/current/VisaCheckout.html#createInitOptions).
 * @property {MERCHANT} VISA_CHECKOUT_INIT_OPTIONS_REQUIRED Occurs when no options are provided to method.
 */

/**
 * @name BraintreeError.Visa Checkout - tokenize Error Codes
 * @description Errors that occur when using the [`tokenize` method](/current/VisaCheckout.html#tokenize).
 * @property {MERCHANT} VISA_CHECKOUT_PAYMENT_REQUIRED Occurs when no payment data is not provided.
 * @property {NETWORK} VISA_CHECKOUT_TOKENIZATION Occurs when tokenization fails.
 */

var BraintreeError = _dereq_('../lib/braintree-error');

module.exports = {
  VISA_CHECKOUT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'VISA_CHECKOUT_NOT_ENABLED',
    message: 'Visa Checkout is not enabled for this merchant.'
  },
  VISA_CHECKOUT_INIT_OPTIONS_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'VISA_CHECKOUT_INIT_OPTIONS_REQUIRED',
    message: 'initOptions requires an object.'
  },
  VISA_CHECKOUT_PAYMENT_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'VISA_CHECKOUT_PAYMENT_REQUIRED',
    message: 'tokenize requires callid, encKey, and encPaymentData.'
  },
  VISA_CHECKOUT_TOKENIZATION: {
    type: BraintreeError.types.NETWORK,
    code: 'VISA_CHECKOUT_TOKENIZATION',
    message: 'A network error occurred when processing the Visa Checkout payment.'
  }
};

},{"../lib/braintree-error":91}],174:[function(_dereq_,module,exports){
'use strict';

/**
 * @module braintree-web/visa-checkout
 * @description Processes Visa Checkout. *This component is currently in beta and is subject to change.*
 */

var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var BraintreeError = _dereq_('../lib/braintree-error');
var createDeferredClient = _dereq_('../lib/create-deferred-client');
var createAssetsUrl = _dereq_('../lib/create-assets-url');
var VisaCheckout = _dereq_('./visa-checkout');
var analytics = _dereq_('../lib/analytics');
var errors = _dereq_('./errors');
var VERSION = "3.42.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} [callback] The second argument, `data`, is the {@link VisaCheckout} instance. If no callback is provided, `create` returns a promise that resolves with the {@link VisaCheckout} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'Visa Checkout';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    });
  }).then(function (client) {
    options.client = client;

    if (!options.client.getConfiguration().gatewayConfiguration.visaCheckout) {
      return Promise.reject(new BraintreeError(errors.VISA_CHECKOUT_NOT_ENABLED));
    }

    analytics.sendEvent(options.client, 'visacheckout.initialized');

    return new VisaCheckout(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":86,"../lib/basic-component-verification":89,"../lib/braintree-error":91,"../lib/create-assets-url":99,"../lib/create-deferred-client":101,"../lib/promise":126,"./errors":173,"./visa-checkout":175,"@braintree/wrap-promise":25}],175:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/braintree-error');
var analytics = _dereq_('../lib/analytics');
var errors = _dereq_('./errors');
var jsonClone = _dereq_('../lib/json-clone');
var methods = _dereq_('../lib/methods');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var cardTypeTransformMap = {
  Visa: 'VISA',
  MasterCard: 'MASTERCARD',
  Discover: 'DISCOVER',
  'American Express': 'AMEX'
};

/**
 * Visa Checkout Address object.
 * @typedef {object} VisaCheckout~Address
 * @property {string} countryCode The customer's country code.
 * @property {string} extendedAddress The customer's extended address.
 * @property {string} firstName The customer's first name.
 * @property {string} lastName The customer's last name.
 * @property {string} locality The customer's locality.
 * @property {string} postalCode The customer's postal code.
 * @property {string} region The customer's region.
 * @property {string} streetAddress The customer's street address.
 * @property {string} phoneNumber The customer's phone number.
 */

/**
 * Visa Checkout UserData object.
 * @typedef {object} VisaCheckout~UserData
 * @property {string} userEmail The customer's email address.
 * @property {string} userFirstName The customer's first name.
 * @property {string} userLastName The customer's last name.
 * @property {string} userFullName The customer's full name.
 * @property {string} userName The customer's username.
 */

/**
 * Visa Checkout tokenize payload.
 * @typedef {object} VisaCheckout~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `VisaCheckoutCard`.
 * @property {VisaCheckout~Address} billingAddress The customer's billing address.
 * @property {VisaCheckout~Address} shippingAddress The customer's shipping address.
 * @property {VisaCheckout~UserData} userData Information about the customer.
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
 * @class
 * @param {object} options The Visa Checkout {@link module:braintree-web/visa-checkout.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/visa-checkout.create|braintree-web.visa-checkout.create} instead.</strong>
 * @classdesc This class represents a Visa Checkout component produced by {@link module:braintree-web/visa-checkout.create|braintree-web/visa-checkout.create}. Instances of this class have methods for interacting with Visa Checkout's JavaScript library.
 */
function VisaCheckout(options) {
  this._client = options.client;
}

function transformCardTypes(cardTypes) {
  return cardTypes.reduce(function (acc, type) {
    if (cardTypeTransformMap.hasOwnProperty(type)) {
      return acc.concat(cardTypeTransformMap[type]);
    }

    return acc;
  }, []);
}

/**
 * Creates an `initOptions` object from the passed `options`, applying properties that Braintree needs to transact Visa Checkout.
 *
 * Braintree will apply these properties if they do not exist on the given `options`:
 *  - `apikey`
 *  - `externalClientId`
 *  - `settings.payment.cardBrands`
 *
 * Braintree will overwrite `settings.dataLevel = 'FULL'` to access the full payment method.
 * @public
 * @param {object} options The base `initOptions` that will be used to init Visa Checkout.
 * @param {string} [options.apikey] The API key used to initialize Visa Checkout. When not supplied, Braintree will set this property.
 * @param {string} [options.externalClientId] The external client ID key used to initialize Visa Checkout. When not supplied, Braintree will set this property.
 * @param {object} [options.settings] The settings object used to initialize Visa Checkout.
 * @param {string} [options.settings.dataLevel] The data level used to initialize Visa Checkout. Braintree will overwrite this property to 'FULL'.
 * @param {object} [options.settings.payment] The payment object used to initialize Visa Checkout.
 * @param {string[]} [options.settings.payment.cardBrands] The card brands that Visa Checkout will allow the customer to pay with. When not supplied, Braintree will set this property.
 * @returns {object} `initOptions` The `initOptions` that Visa Checkout should be initialized with.
 */
VisaCheckout.prototype.createInitOptions = function (options) {
  var initOptions;
  var gatewayConfiguration = this._client.getConfiguration().gatewayConfiguration;
  var visaCheckoutConfiguration = gatewayConfiguration.visaCheckout;

  if (!options) {
    throw new BraintreeError(errors.VISA_CHECKOUT_INIT_OPTIONS_REQUIRED);
  }

  initOptions = jsonClone(options);
  initOptions.apikey = initOptions.apikey || visaCheckoutConfiguration.apikey;
  initOptions.externalClientId = initOptions.externalClientId || visaCheckoutConfiguration.externalClientId;
  initOptions.settings = initOptions.settings || {};
  initOptions.settings.dataLevel = 'FULL';
  initOptions.settings.payment = initOptions.settings.payment || {};

  if (!initOptions.settings.payment.cardBrands) {
    initOptions.settings.payment.cardBrands = transformCardTypes(gatewayConfiguration.visaCheckout.supportedCardTypes);
  }

  return initOptions;
};

/**
 * Tokenizes the Visa Checkout payload, returning a payment method nonce.
 * @public
 * @param {object} payment The object that Visa Checkout supplies on `payment.success`.
 * @param {string} payment.callid Visa Checkout transaction ID associated with this payment.
 * @param {string} payment.encKey The encrypted key used to decrypt the payment data.
 * @param {string} payment.encPaymentData The encrypted payment data.
 * @param {callback} [callback] The second argument, <code>tokenizePayload</code> is a {@link VisaCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a promise that resolves with the {@link VisaCheckout~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
VisaCheckout.prototype.tokenize = function (payment) {
  var self = this;

  if (!payment.callid || !payment.encKey || !payment.encPaymentData) {
    return Promise.reject(new BraintreeError(errors.VISA_CHECKOUT_PAYMENT_REQUIRED));
  }

  return this._client.request({
    method: 'post',
    endpoint: 'payment_methods/visa_checkout_cards',
    data: {
      _meta: {
        source: 'visa-checkout'
      },
      visaCheckoutCard: {
        callId: payment.callid,
        encryptedPaymentData: payment.encPaymentData,
        encryptedKey: payment.encKey
      }
    }
  }).then(function (response) {
    analytics.sendEvent(self._client, 'visacheckout.tokenize.succeeded');

    return response.visaCheckoutCards[0];
  }).catch(function (err) {
    analytics.sendEvent(self._client, 'visacheckout.tokenize.failed');

    return Promise.reject(new BraintreeError({
      type: errors.VISA_CHECKOUT_TOKENIZATION.type,
      code: errors.VISA_CHECKOUT_TOKENIZATION.code,
      message: errors.VISA_CHECKOUT_TOKENIZATION.message,
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/visa-checkout.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * visaCheckoutInstance.teardown();
 * @example <caption>With callback</caption>
 * visaCheckoutInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
VisaCheckout.prototype.teardown = function () {
  convertMethodsToError(this, methods(VisaCheckout.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(VisaCheckout);

},{"../lib/analytics":86,"../lib/braintree-error":91,"../lib/convert-methods-to-error":97,"../lib/json-clone":123,"../lib/methods":124,"../lib/promise":126,"./errors":173,"@braintree/wrap-promise":25}]},{},[84])(84)
});
