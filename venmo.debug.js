(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).venmo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var isAndroid = _dereq_('./is-android');
var isChrome = _dereq_('./is-chrome');
var isIe = _dereq_('./is-ie');
var isIe9 = _dereq_('./is-ie9');
var isIe10 = _dereq_('./is-ie10');
var isIe11 = _dereq_('./is-ie11');
var isEdge = _dereq_('./is-edge');
var isIos = _dereq_('./is-ios');
var isIosFirefox = _dereq_('./is-ios-firefox');
var isIosSafari = _dereq_('./is-ios-safari');
var isIosUIWebview = _dereq_('./is-ios-uiwebview');
var isIosWebview = _dereq_('./is-ios-webview');
var isIosWKWebview = _dereq_('./is-ios-wkwebview');
var isMobileFirefox = _dereq_('./is-mobile-firefox');
var isSamsungBrowser = _dereq_('./is-samsung');
var supportsPopups = _dereq_('./supports-popups');

module.exports = {
  isAndroid: isAndroid,
  isChrome: isChrome,
  isIe: isIe,
  isIe9: isIe9,
  isIe10: isIe10,
  isIe11: isIe11,
  isEdge: isEdge,
  isIos: isIos,
  isIosFirefox: isIosFirefox,
  isIosSafari: isIosSafari,
  isIosUIWebview: isIosUIWebview,
  isIosWebview: isIosWebview,
  isIosWKWebview: isIosWKWebview,
  isMobileFirefox: isMobileFirefox,
  isSamsungBrowser: isSamsungBrowser,
  supportsPopups: supportsPopups
};

},{"./is-android":2,"./is-chrome":3,"./is-edge":4,"./is-ie":5,"./is-ie10":6,"./is-ie11":7,"./is-ie9":8,"./is-ios":14,"./is-ios-firefox":9,"./is-ios-safari":10,"./is-ios-uiwebview":11,"./is-ios-webview":12,"./is-ios-wkwebview":13,"./is-mobile-firefox":15,"./is-samsung":16,"./supports-popups":17}],2:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isAndroid(ua) {
  ua = ua || global.navigator.userAgent;
  return /Android/.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){
'use strict';

var isEdge = _dereq_('./is-edge');
var isSamsung = _dereq_('./is-samsung');

module.exports = function isChrome(ua) {
  ua = ua || navigator.userAgent;
  return (ua.indexOf('Chrome') !== -1 || ua.indexOf('CriOS') !== -1) && !isEdge(ua) && !isSamsung(ua);
};

},{"./is-edge":4,"./is-samsung":16}],4:[function(_dereq_,module,exports){
'use strict';

module.exports = function isEdge(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Edge/') !== -1;
};

},{}],5:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIE11 = _dereq_('./is-ie11');

module.exports = function isIE(ua) {
  ua = ua || global.navigator.userAgent;
  return ua.indexOf('MSIE') !== -1 || isIE11(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ie11":7}],6:[function(_dereq_,module,exports){
'use strict';

module.exports = function isIe10(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('MSIE 10') !== -1;
};

},{}],7:[function(_dereq_,module,exports){
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

},{"./is-ios":14}],11:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIosWebview = _dereq_('./is-ios-webview');

module.exports = function isIosUIWebview(ua, statusBarVisible) {
  statusBarVisible = typeof statusBarVisible !== 'undefined' ? statusBarVisible : global.statusbar.visible;
  return isIosWebview(ua) && !statusBarVisible;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios-webview":12}],12:[function(_dereq_,module,exports){
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
},{"./is-ios":14}],13:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIosWebview = _dereq_('./is-ios-webview');

module.exports = function isIosWKWebview(ua, statusBarVisible) {
  statusBarVisible = typeof statusBarVisible !== 'undefined' ? statusBarVisible : global.statusbar.visible;
  return isIosWebview(ua) && statusBarVisible;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios-webview":12}],14:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIosFirefox = _dereq_('./is-ios-firefox');

module.exports = function isMobileFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return isIosFirefox(ua) || /iPhone|iPod|iPad|Mobile|Tablet/i.test(ua) && /Firefox/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios-firefox":9}],16:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(_dereq_,module,exports){
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
},{"./is-android":2,"./is-chrome":3,"./is-ios-firefox":9,"./is-ios-webview":12,"./is-samsung":16}],18:[function(_dereq_,module,exports){
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

},{}],19:[function(_dereq_,module,exports){
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

},{}],20:[function(_dereq_,module,exports){
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

},{}],21:[function(_dereq_,module,exports){
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

},{"./lib/deferred":18,"./lib/once":19,"./lib/promise-or-callback":20}],22:[function(_dereq_,module,exports){
(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
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
    Promise._immediateFn(function () {
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
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
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
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
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

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

},{}],23:[function(_dereq_,module,exports){
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

},{"./constants":26,"./create-authorization-data":27,"./json-clone":30}],24:[function(_dereq_,module,exports){
'use strict';

var constants = _dereq_('./constants');
var addMetadata = _dereq_('./add-metadata');

function _millisToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function sendAnalyticsEvent(client, kind, callback) {
  var configuration = client.getConfiguration();
  var request = client._request;
  var timestamp = _millisToSeconds(Date.now());
  var url = configuration.gatewayConfiguration.analytics.url;
  var data = {
    analytics: [{
      kind: constants.ANALYTICS_PREFIX + kind,
      timestamp: timestamp
    }]
  };

  request({
    url: url,
    method: 'post',
    data: addMetadata(configuration, data),
    timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
  }, callback);
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};

},{"./add-metadata":23,"./constants":26}],25:[function(_dereq_,module,exports){
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

},{"./enumerate":28}],26:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.22.2";
var PLATFORM = 'web';

module.exports = {
  ANALYTICS_PREFIX: 'web.',
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  INTEGRATION_TIMEOUT_MS: 60000,
  VERSION: VERSION,
  INTEGRATION: 'custom',
  SOURCE: 'client',
  PLATFORM: PLATFORM,
  BRAINTREE_LIBRARY_VERSION: 'braintree/' + PLATFORM + '/' + VERSION
};

},{}],27:[function(_dereq_,module,exports){
'use strict';

var atob = _dereq_('../lib/polyfill').atob;

var apiUrls = {
  production: 'https://api.braintreegateway.com:443',
  sandbox: 'https://api.sandbox.braintreegateway.com:443'
};

// endRemoveIf(production)

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
    data.attrs.tokenizationKey = authorization;
    data.configUrl = apiUrls[parsedTokenizationKey.environment] + '/merchants/' + parsedTokenizationKey.merchantId + '/client_api/v1/configuration';
  } else {
    parsedClientToken = JSON.parse(atob(authorization));
    data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
    data.configUrl = parsedClientToken.configUrl;
  }

  return data;
}

module.exports = createAuthorizationData;

},{"../lib/polyfill":31}],28:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;
    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],29:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');

module.exports = {
  CALLBACK_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CALLBACK_REQUIRED'
  },
  INSTANTIATION_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'INSTANTIATION_OPTION_REQUIRED'
  },
  INVALID_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'INVALID_OPTION'
  },
  INCOMPATIBLE_VERSIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'INCOMPATIBLE_VERSIONS'
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

},{"./braintree-error":25}],30:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],31:[function(_dereq_,module,exports){
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
},{}],32:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":22}],33:[function(_dereq_,module,exports){
(function (global){
'use strict';

function _notEmpty(obj) {
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) { return true; }
  }

  return false;
}

function _isArray(value) {
  return value && typeof value === 'object' && typeof value.length === 'number' &&
    Object.prototype.toString.call(value) === '[object Array]' || false;
}

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
},{}],34:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/venmo */

var analytics = _dereq_('../lib/analytics');
var errors = _dereq_('./shared/errors');
var sharedErrors = _dereq_('../lib/errors');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var BraintreeError = _dereq_('../lib/braintree-error');
var Venmo = _dereq_('./venmo');
var Promise = _dereq_('../lib/promise');
var VERSION = "3.22.2";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications. Doing so causes {@link Venmo#isBrowserSupported|isBrowserSupported} to return true only for mobile web browsers that support returning from the Venmo app to the same tab.
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
  var configuration, clientVersion, instance;

  if (options.client == null) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating Venmo.'
    }));
  }

  configuration = options.client.getConfiguration();
  clientVersion = options.client.getVersion();

  if (clientVersion !== VERSION) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and Venmo (version ' + VERSION + ') components must be from the same SDK version.'
    }));
  }

  if (!configuration.gatewayConfiguration.payWithVenmo) {
    return Promise.reject(new BraintreeError(errors.VENMO_NOT_ENABLED));
  }

  instance = new Venmo(options);

  analytics.sendEvent(options.client, 'venmo.initialized');

  return instance._initialize();
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":24,"../lib/braintree-error":25,"../lib/errors":29,"../lib/promise":32,"./shared/errors":36,"./venmo":37,"@braintree/wrap-promise":21}],35:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY: 500,
  PROCESS_RESULTS_DELAY: 1000,
  VENMO_OPEN_URL: 'https://venmo.com/braintree/checkout'
};

},{}],36:[function(_dereq_,module,exports){
'use strict';

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
  }
};

},{"../../lib/braintree-error":25}],37:[function(_dereq_,module,exports){
(function (global){
'use strict';

var analytics = _dereq_('../lib/analytics');
var browserDetection = _dereq_('@braintree/browser-detection');
var constants = _dereq_('./shared/constants');
var errors = _dereq_('./shared/errors');
var querystring = _dereq_('../lib/querystring');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var BraintreeError = _dereq_('../lib/braintree-error');
var Promise = _dereq_('../lib/promise');
var VERSION = "3.22.2";

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
}

Venmo.prototype._initialize = function () {
  var currentUrl = global.location.href.replace(global.location.hash, '');
  var params = querystring.parse(global.location.href);
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
  params.braintree_merchant_id = venmoConfiguration.merchantId;
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
  var isAndroidChrome = browserDetection.isAndroid() && browserDetection.isChrome();
  var isIosChrome = browserDetection.isIos() && browserDetection.isChrome();
  var supportsReturnToSameTab = browserDetection.isIosSafari() || isAndroidChrome;
  var supportsReturnToNewTab = isIosChrome || browserDetection.isSamsungBrowser() || browserDetection.isMobileFirefox();

  return supportsReturnToSameTab || this._allowNewBrowserTab && supportsReturnToNewTab;
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

    global.open(self._url);

    // Subscribe to document visibility change events to detect when app switch
    // has returned.
    self._visibilityChangeListener = function () {
      if (!document.hidden) {
        self._tokenizationInProgress = false;

        setTimeout(function () {
          self._processResults().then(resolve).catch(reject).then(function () {
            global.location.hash = self._previousHash;
            document.removeEventListener(documentVisibilityChangeEventName(), self._visibilityChangeListener);
            delete self._visibilityChangeListener;
          });
        }, constants.PROCESS_RESULTS_DELAY);
      }
    };

    // Add a brief delay to ignore visibility change events that occur right before app switch
    setTimeout(function () {
      document.addEventListener(documentVisibilityChangeEventName(), self._visibilityChangeListener);
    }, constants.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY);
  });
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
  if (typeof global.history.replaceState === 'function') {
    history.pushState({}, '', global.location.href.slice(0, global.location.href.indexOf('#')));
  }
}

function formatTokenizePayload(fragmentParams, venmoAccountData) {
  return {
    nonce: venmoAccountData ? venmoAccountData.nonce : fragmentParams.paymentMethodNonce,
    type: 'VenmoAccount',
    details: {
      username: fragmentParams.username
    }
  };
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function documentVisibilityChangeEventName() {
  var visibilityChange;

  if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    visibilityChange = 'webkitvisibilitychange';
  }

  return visibilityChange;
}

module.exports = wrapPromise.wrapPrototype(Venmo);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/analytics":24,"../lib/braintree-error":25,"../lib/promise":32,"../lib/querystring":33,"./shared/constants":35,"./shared/errors":36,"@braintree/browser-detection":1,"@braintree/wrap-promise":21}]},{},[34])(34)
});