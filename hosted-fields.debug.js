(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).hostedFields = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

var PromisePolyfill = _dereq_('promise-polyfill');

module.exports = global.Promise || PromisePolyfill;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":23}],2:[function(_dereq_,module,exports){
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

},{"./is-edge":5,"./is-samsung":11}],5:[function(_dereq_,module,exports){
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
},{"./is-ios":10}],10:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(_dereq_,module,exports){
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

},{}],13:[function(_dereq_,module,exports){
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

},{"./lib/assign":14,"./lib/default-attributes":15,"./lib/set-attributes":16}],14:[function(_dereq_,module,exports){
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

},{}],15:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};

},{}],16:[function(_dereq_,module,exports){
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

},{}],17:[function(_dereq_,module,exports){
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

},{}],18:[function(_dereq_,module,exports){
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

},{}],19:[function(_dereq_,module,exports){
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

},{}],20:[function(_dereq_,module,exports){
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

},{"./lib/deferred":17,"./lib/once":18,"./lib/promise-or-callback":19}],21:[function(_dereq_,module,exports){
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

},{}],22:[function(_dereq_,module,exports){
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
},{}],23:[function(_dereq_,module,exports){
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

},{}],24:[function(_dereq_,module,exports){
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
},{"@braintree/browser-detection/is-android":3,"@braintree/browser-detection/is-chrome":4,"@braintree/browser-detection/is-ie9":8,"@braintree/browser-detection/is-ios":10}],25:[function(_dereq_,module,exports){
'use strict';

var device = _dereq_('./lib/device');

module.exports = function () {
  // Digits get dropped in samsung browser
  return !device.isSamsungBrowser();
};

},{"./lib/device":24}],26:[function(_dereq_,module,exports){
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

},{"../../lib/braintree-error":43,"../shared/constants":33,"../shared/errors":34}],27:[function(_dereq_,module,exports){
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

},{"../../lib/use-min":61,"../shared/constants":33}],28:[function(_dereq_,module,exports){
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
},{"../shared/constants":33}],29:[function(_dereq_,module,exports){
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

},{"../../lib/analytics":38,"../../lib/assign":40,"../../lib/braintree-error":43,"../../lib/bus":46,"../../lib/constants":47,"../../lib/convert-methods-to-error":48,"../../lib/create-assets-url":49,"../../lib/create-deferred-client":51,"../../lib/destructor":52,"../../lib/errors":54,"../../lib/event-emitter":55,"../../lib/methods":58,"../../lib/promise":60,"../../lib/vendor/uuid":63,"../shared/browser-detection":32,"../shared/constants":33,"../shared/errors":34,"../shared/find-parent-tags":35,"../shared/get-card-types":36,"./attribute-validation-error":26,"./compose-url":27,"./get-styles-from-class":28,"./inject-frame":30,"@braintree/class-list":12,"@braintree/iframer":13,"@braintree/wrap-promise":20}],30:[function(_dereq_,module,exports){
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

},{}],31:[function(_dereq_,module,exports){
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

},{"../lib/basic-component-verification":41,"../lib/braintree-error":43,"../lib/promise":60,"./external/hosted-fields":29,"./shared/errors":34,"@braintree/wrap-promise":20,"restricted-input/supports-input-formatting":25}],32:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  isIE: _dereq_('@braintree/browser-detection/is-ie'),
  isEdge: _dereq_('@braintree/browser-detection/is-edge'),
  isIe9: _dereq_('@braintree/browser-detection/is-ie9'),
  isIos: _dereq_('@braintree/browser-detection/is-ios'),
  isIosWebview: _dereq_('@braintree/browser-detection/is-ios-webview')
};

},{"@braintree/browser-detection/is-edge":5,"@braintree/browser-detection/is-ie":6,"@braintree/browser-detection/is-ie9":8,"@braintree/browser-detection/is-ios":10,"@braintree/browser-detection/is-ios-webview":9}],33:[function(_dereq_,module,exports){
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

},{"../../lib/enumerate":53,"./errors":34}],34:[function(_dereq_,module,exports){
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

},{"../../lib/braintree-error":43}],35:[function(_dereq_,module,exports){
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

},{}],36:[function(_dereq_,module,exports){
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

},{"credit-card-type":21}],37:[function(_dereq_,module,exports){
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

},{"./constants":47,"./create-authorization-data":50,"./json-clone":57}],38:[function(_dereq_,module,exports){
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

},{"./add-metadata":37,"./constants":47,"./promise":60}],39:[function(_dereq_,module,exports){
'use strict';

var loadScript = _dereq_('@braintree/asset-loader/load-script');

module.exports = {
  loadScript: loadScript
};

},{"@braintree/asset-loader/load-script":2}],40:[function(_dereq_,module,exports){
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

},{}],41:[function(_dereq_,module,exports){
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

},{"./braintree-error":43,"./errors":54,"./promise":60}],42:[function(_dereq_,module,exports){
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

},{"./once":59}],43:[function(_dereq_,module,exports){
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

},{"./enumerate":53}],44:[function(_dereq_,module,exports){
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

},{"../is-verified-domain":56}],45:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../enumerate');

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');

},{"../enumerate":53}],46:[function(_dereq_,module,exports){
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

},{"../braintree-error":43,"./check-origin":44,"./events":45,"framebus":22}],47:[function(_dereq_,module,exports){
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

},{}],48:[function(_dereq_,module,exports){
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

},{"./braintree-error":43,"./errors":54}],49:[function(_dereq_,module,exports){
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

},{"./constants":47}],50:[function(_dereq_,module,exports){
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

},{"../lib/constants":47,"../lib/vendor/polyfill":62}],51:[function(_dereq_,module,exports){
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
},{"./assets":39,"./braintree-error":43,"./errors":54,"./promise":60}],52:[function(_dereq_,module,exports){
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

},{"./batch-execute-functions":42}],53:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],54:[function(_dereq_,module,exports){
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

},{"./braintree-error":43}],55:[function(_dereq_,module,exports){
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

},{}],56:[function(_dereq_,module,exports){
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

},{}],57:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],58:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],59:[function(_dereq_,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],60:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":23}],61:[function(_dereq_,module,exports){
'use strict';

function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;

},{}],62:[function(_dereq_,module,exports){
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
},{}],63:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}]},{},[31])(31)
});
