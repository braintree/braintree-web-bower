(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).ideal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isAndroid(ua) {
  ua = ua || global.navigator.userAgent;
  return /Android/.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';

var isEdge = _dereq_('./is-edge');
var isSamsung = _dereq_('./is-samsung');

module.exports = function isChrome(ua) {
  ua = ua || navigator.userAgent;
  return (ua.indexOf('Chrome') !== -1 || ua.indexOf('CriOS') !== -1) && !isEdge(ua) && !isSamsung(ua);
};

},{"./is-edge":3,"./is-samsung":8}],3:[function(_dereq_,module,exports){
'use strict';

module.exports = function isEdge(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Edge/') !== -1;
};

},{}],4:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isIosFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return /FxiOS/i.test(ua);
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(_dereq_,module,exports){
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
},{"./is-ios":7}],6:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIosWebview = _dereq_('./is-ios-webview');

module.exports = function isIosWKWebview(ua, statusBarVisible) {
  statusBarVisible = typeof statusBarVisible !== 'undefined' ? statusBarVisible : global.statusbar.visible;
  return isIosWebview(ua) && statusBarVisible;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios-webview":5}],7:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(_dereq_,module,exports){
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
},{"./is-android":1,"./is-chrome":2,"./is-ios-firefox":4,"./is-ios-webview":5,"./is-samsung":8}],10:[function(_dereq_,module,exports){
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

},{"./lib/assign":11,"./lib/default-attributes":12,"./lib/set-attributes":13}],11:[function(_dereq_,module,exports){
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

},{}],12:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};

},{}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
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

},{}],15:[function(_dereq_,module,exports){
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

},{}],16:[function(_dereq_,module,exports){
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

},{}],17:[function(_dereq_,module,exports){
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

},{"./lib/deferred":14,"./lib/once":15,"./lib/promise-or-callback":16}],18:[function(_dereq_,module,exports){
(function (global){
'use strict';
(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory(typeof global === 'undefined' ? root : global);
  } else if (typeof define === 'function' && define.amd) {
    define([], function () { return factory(root); });
  } else {
    root.framebus = factory(root);
  }
})(this, function (root) { // eslint-disable-line no-invalid-this
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
        var replyPayload = _packagePayload(replyEvent, [data], replyOrigin);

        if (replyPayload === false) { return false; }

        replySource.postMessage(replyPayload, replyOrigin);
      };

      payload.args.push(payload.reply);
    }

    return payload;
  }

  function _attach(w) {
    if (win) { return; }
    win = w || root;

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
    var i;

    try {
      frame.postMessage(payload, origin);

      if (_hasOpener(frame)) {
        _broadcast(frame.opener.top, payload, origin);
      }

      for (i = 0; i < frame.frames.length; i++) {
        _broadcast(frame.frames[i], payload, origin);
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

  return framebus;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],19:[function(_dereq_,module,exports){
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

},{}],20:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  MAX_TRANSACTION_STATUS_POLLING_RETRIES: 5,
  POLL_RETRY_TIME: 10000,
  REQUIRED_OPTIONS_FOR_START_PAYMENT: ['orderId', 'amount', 'currency']
};

},{}],21:[function(_dereq_,module,exports){
'use strict';

var Promise = _dereq_('../../lib/promise');
var frameService = _dereq_('../../lib/frame-service/external');
var BraintreeError = _dereq_('../../lib/braintree-error');
var convertToBraintreeError = _dereq_('../../lib/convert-to-braintree-error');
var errors = _dereq_('../shared/errors');
var VERSION = "3.22.2";
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
      } else if (err.code === 'FRAME_SERVICE_FRAME_OPEN_FAILED') {
        reject(new BraintreeError(errors.IDEAL_WINDOW_OPEN_FAILED));
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

},{"../../lib/analytics":27,"../../lib/braintree-error":29,"../../lib/constants":33,"../../lib/convert-methods-to-error":34,"../../lib/convert-to-braintree-error":35,"../../lib/deferred":37,"../../lib/frame-service/external":41,"../../lib/methods":53,"../../lib/once":54,"../../lib/promise":56,"../../lib/use-min":57,"../shared/errors":24,"../shared/events":25,"./constants":20,"@braintree/wrap-promise":17}],22:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/ideal */

var BraintreeError = _dereq_('../lib/braintree-error');
var browserDetection = _dereq_('./shared/browser-detection');
var Ideal = _dereq_('./external/ideal');
var VERSION = "3.22.2";
var errors = _dereq_('./shared/errors');
var sharedErrors = _dereq_('../lib/errors');
var analytics = _dereq_('../lib/analytics');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
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
  var idealInstance, clientVersion, configuration;

  if (options.client == null) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating iDEAL.'
    }));
  }

  clientVersion = options.client.getVersion();
  if (clientVersion !== VERSION) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and iDEAL (version ' + VERSION + ') components must be from the same SDK version.'
    }));
  }

  if (!browserDetection.supportsPopups()) {
    return Promise.reject(new BraintreeError(errors.IDEAL_BROWSER_NOT_SUPPORTED));
  }

  configuration = options.client.getConfiguration().gatewayConfiguration;
  if (!configuration.braintreeApi) {
    return Promise.reject(new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED));
  } else if (!configuration.ideal) {
    return Promise.reject(new BraintreeError(errors.IDEAL_NOT_ENABLED));
  }

  analytics.sendEvent(options.client, 'ideal.initialization');
  idealInstance = new Ideal(options);

  return idealInstance._initialize();
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":27,"../lib/braintree-error":29,"../lib/errors":39,"../lib/promise":56,"./external/ideal":21,"./shared/browser-detection":23,"./shared/errors":24,"@braintree/wrap-promise":17}],23:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  supportsPopups: _dereq_('@braintree/browser-detection/supports-popups')
};

},{"@braintree/browser-detection/supports-popups":9}],24:[function(_dereq_,module,exports){
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


},{"../../lib/braintree-error":29}],25:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');

module.exports = enumerate([
  'BANK_CHOSEN',
  'REDIRECT_PAGE_REACHED'
], 'ideal:');

},{"../../lib/enumerate":38}],26:[function(_dereq_,module,exports){
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

},{"./constants":33,"./create-authorization-data":36,"./json-clone":52}],27:[function(_dereq_,module,exports){
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

},{"./add-metadata":26,"./constants":33}],28:[function(_dereq_,module,exports){
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

},{}],29:[function(_dereq_,module,exports){
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

},{"./enumerate":38}],30:[function(_dereq_,module,exports){
'use strict';

var isWhitelistedDomain = _dereq_('../is-whitelisted-domain');

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

  return isWhitelistedDomain(postMessageOrigin);
}

module.exports = {
  checkOrigin: checkOrigin
};

},{"../is-whitelisted-domain":51}],31:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../enumerate');

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');

},{"../enumerate":38}],32:[function(_dereq_,module,exports){
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

},{"../braintree-error":29,"./check-origin":30,"./events":31,"framebus":18}],33:[function(_dereq_,module,exports){
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

},{}],34:[function(_dereq_,module,exports){
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

},{"./braintree-error":29,"./errors":39}],35:[function(_dereq_,module,exports){
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

},{"./braintree-error":29}],36:[function(_dereq_,module,exports){
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

},{"../lib/polyfill":55}],37:[function(_dereq_,module,exports){
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

},{}],38:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;
    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],39:[function(_dereq_,module,exports){
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

},{"./braintree-error":29}],40:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Popup = _dereq_('./strategies/popup');
var PopupBridge = _dereq_('./strategies/popup-bridge');
var Modal = _dereq_('./strategies/modal');
var Bus = _dereq_('../../bus');
var events = _dereq_('../shared/events');
var errors = _dereq_('../shared/errors');
var constants = _dereq_('../shared/constants');
var uuid = _dereq_('../../uuid');
var iFramer = _dereq_('@braintree/iframer');
var BraintreeError = _dereq_('../../braintree-error');
var browserDetection = _dereq_('../shared/browser-detection');
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

  if (usePopup) {
    return new Popup(initOptions);
  } else if (popupBridgeExists) {
    return new PopupBridge(initOptions);
  }

  return new Modal(initOptions);
};

module.exports = FrameService;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../braintree-error":29,"../../bus":32,"../../uuid":58,"../shared/browser-detection":47,"../shared/constants":48,"../shared/errors":49,"../shared/events":50,"./../../assign":28,"./strategies/modal":42,"./strategies/popup":45,"./strategies/popup-bridge":43,"@braintree/iframer":10}],41:[function(_dereq_,module,exports){
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

},{"./frame-service":40}],42:[function(_dereq_,module,exports){
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
    style: assign({}, ELEMENT_STYLES)
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
},{"../../../assign":28,"../../shared/browser-detection":47,"@braintree/iframer":10}],43:[function(_dereq_,module,exports){
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
},{"../../../braintree-error":29,"../../shared/errors":49}],44:[function(_dereq_,module,exports){
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

},{"../../../shared/constants":48,"./position":46}],45:[function(_dereq_,module,exports){
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
  return this._frame && Boolean(this._frame.closed);
};

Popup.prototype.redirect = function (redirectUrl) {
  this._frame.location.href = redirectUrl;
};

module.exports = Popup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./compose-options":44}],46:[function(_dereq_,module,exports){
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
  return (windowMetric - popupMetric) / 2 + offset;
}

module.exports = {
  top: top,
  left: left,
  center: center
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],47:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  isIos: _dereq_('@braintree/browser-detection/is-ios'),
  isIosWKWebview: _dereq_('@braintree/browser-detection/is-ios-wkwebview'),
  supportsPopups: _dereq_('@braintree/browser-detection/supports-popups')
};


},{"@braintree/browser-detection/is-ios":7,"@braintree/browser-detection/is-ios-wkwebview":6,"@braintree/browser-detection/supports-popups":9}],48:[function(_dereq_,module,exports){
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

},{}],49:[function(_dereq_,module,exports){
'use strict';

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
  }
};

},{"../../braintree-error":29}],50:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../enumerate');

module.exports = enumerate([
  'DISPATCH_FRAME_READY',
  'DISPATCH_FRAME_REPORT'
], 'frameService:');

},{"../../enumerate":38}],51:[function(_dereq_,module,exports){
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

function isWhitelistedDomain(url) {
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

module.exports = isWhitelistedDomain;

},{}],52:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],53:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],54:[function(_dereq_,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15}],55:[function(_dereq_,module,exports){
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
},{}],56:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":19}],57:[function(_dereq_,module,exports){
'use strict';

function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;

},{}],58:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}]},{},[22])(22)
});