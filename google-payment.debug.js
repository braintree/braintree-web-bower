(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).googlePayment = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

},{"./is-edge":3,"./is-samsung":4}],3:[function(_dereq_,module,exports){
'use strict';

module.exports = function isEdge(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Edge/') !== -1;
};

},{}],4:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isChrome = _dereq_('./is-chrome');

var MINIMUM_SUPPORTED_CHROME_VERSION = 61;

function isSupportedChromeVersion(ua) {
  var version;
  var match = ua.match(/Chrome\/(\d+)\./);

  if (!match) {
    return false;
  }

  version = parseInt(match[1], 10);

  return version >= MINIMUM_SUPPORTED_CHROME_VERSION;
}

module.exports = function supportsPaymentRequestApi(ua) {
  ua = ua || global.navigator.userAgent;

  if (!global.PaymentRequest) {
    return false;
  }

  if (!isChrome(ua)) {
    // if browser is not chrome based, but has Payment Request API
    // this means that it implimented the API after it was finalized
    return true;
  }

  // Chrome introduce the Payment Request API in some versions of
  // Android Chrome as early as Chrome v53, but it was not
  // finalized until v61
  return isSupportedChromeVersion(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-chrome":2}],6:[function(_dereq_,module,exports){
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

},{"./lib/assign":7,"./lib/default-attributes":8,"./lib/set-attributes":9}],7:[function(_dereq_,module,exports){
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

},{}],8:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};

},{}],9:[function(_dereq_,module,exports){
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

},{}],10:[function(_dereq_,module,exports){
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

},{}],11:[function(_dereq_,module,exports){
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

},{}],12:[function(_dereq_,module,exports){
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

},{}],13:[function(_dereq_,module,exports){
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

},{"./lib/deferred":10,"./lib/once":11,"./lib/promise-or-callback":12}],14:[function(_dereq_,module,exports){
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
},{}],15:[function(_dereq_,module,exports){
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

},{}],16:[function(_dereq_,module,exports){
'use strict';

var supportsPaymentRequestApi = _dereq_('@braintree/browser-detection/supports-payment-request-api');
var isAndroid = _dereq_('@braintree/browser-detection/is-android');

module.exports = {
  isAndroid: isAndroid,
  supportsPaymentRequestApi: supportsPaymentRequestApi
};

},{"@braintree/browser-detection/is-android":1,"@braintree/browser-detection/supports-payment-request-api":5}],17:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/braintree-error');
var PaymentRequestComponent = _dereq_('../payment-request/external/payment-request');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @class GooglePayment
 * @param {object} options Google Payment {@link module:braintree-web/google-payment.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/google-payment.create|braintree-web.google-payment.create} instead.</strong>
 * @classdesc This class represents a Google Payment component produced by {@link module:braintree-web/google-payment.create|braintree-web/google-payment.create}. Instances of this class have methods for initializing the Pay with Google flow.
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 */
function GooglePayment(options) {
  PaymentRequestComponent.call(this, {
    client: options.client,
    enabledPaymentMethods: {
      basicCard: false,
      payWithGoogle: true
    }
  });

  this._analyticsName = 'google-payment';
}

GooglePayment.prototype = Object.create(PaymentRequestComponent.prototype);
GooglePayment.prototype.constructor = GooglePayment;

/**
 * Create an object to pass into the `tokenize` method to specify a custom configuration. If no overrides are provided, the default configuration will be used in `tokenize`.
 * @public
 * @param {object} [overrides] The configuration overrides for the [data property on the supported payment methods objects](https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request). This object will be merged with the default configuration object based on the settings in the Braintree Gateway. If no object is passed in, the default configuration object will be returned.
 * @example <caption>Getting the default configuration for a specified type</caption>
 * var configuration = googlePaymentInstance.createSupportedPaymentMethodsConfiguration();
 *
 * configuration.supportedMethods; // ['https://google.com/pay']
 *
 * configuration.data.allowedCardNetworks; // ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'] <- whatever the supported card networks for the merchant account are
 * @example <caption>Specifying overrides</caption>
 * var configuration = googlePaymentInstance.createSupportedPaymentMethodsConfiguration({
 *   merchantName: 'My Custom Merchant Account Name',
 *   allowedCardNetworks: ['VISA']
 * });
 *
 * configuration.data.merchantName; // 'My Custom Merchant Account Name'
 * configuration.data.allowedCardNetworks; // ['VISA']
 * @returns {object} Returns a configuration object for use in the tokenize function.
 */
GooglePayment.prototype.createSupportedPaymentMethodsConfiguration = function (overrides) {
  return PaymentRequestComponent.prototype.createSupportedPaymentMethodsConfiguration.call(this, 'payWithGoogle', overrides);
};

/**
 * Initializes a Pay with Google flow and provides a nonce payload.
 * @public
 * @param {object} configuration The payment details.
 * @param {object} configuration.details The payment details. For details on this object, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_payment_details).
 * @param {object} [configuration.options] Additional Pay with Google options. For details on this object, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_options_optional).
 *
 * **Note:** `requestShipping` is not supported by Braintree at this time.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link PaymentRequest~paymentPayload|paymentPayload}. If no callback is provided, `tokenize` returns a function that resolves with a {@link PaymentRequest~paymentPayload|paymentPayload}.
 * @example
 * googlePaymentInstance.tokenize({
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
 * }).catch(function (err) {
 *   if (err.code === 'PAYMENT_REQUEST_CANCELED') {
 *     // Pay with Google payment request was canceled by user
 *   } else {
 *     // an error occurred while processing
 *   }
 * });
 * @example <caption>Include additional payment request options</caption>
 * googlePaymentInstance.tokenize({
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
 *   // Send payload.nonce to your server
 *
 *   // Examine additional info in the raw payment response
 *   console.log(payload.details.rawPaymentResponse);
 * });
 * @example <caption>Include custom supported payment method object</caption>
 * googlePaymentInstance.tokenize({
 *   supportedPaymentMethods: googlePaymentInstance.createSupportedPaymentMethodsConfiguration({merchantName: 'Custom Name'}),
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
 *   // Send payload.nonce to your server
 *
 *   // Examine additional info in the raw payment response
 *   console.log(payload.details.rawPaymentResponse);
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
GooglePayment.prototype.tokenize = function (configuration) {
  var supportedPaymentMethods;

  if (configuration.supportedPaymentMethods) {
    if (configuration.supportedPaymentMethods.supportedMethods[0] === 'https://google.com/pay') {
      supportedPaymentMethods = [configuration.supportedPaymentMethods];
    } else {
      return Promise.reject(new BraintreeError({
        type: BraintreeError.types.MERCHANT,
        code: 'PAY_WITH_GOOGLE_CAN_ONLY_TOKENIZE_WITH_PAY_WITH_GOOGLE',
        message: 'Only Pay with Google is supported in supportedPaymentMethods.'
      }));
    }
  }

  return PaymentRequestComponent.prototype.tokenize.call(this, {
    supportedPaymentMethods: supportedPaymentMethods,
    details: configuration.details,
    options: configuration.options
  });
};

module.exports = wrapPromise.wrapPrototype(GooglePayment);

},{"../lib/braintree-error":23,"../lib/promise":35,"../payment-request/external/payment-request":39,"@braintree/wrap-promise":13}],18:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/google-payment
 * @description A component to integrate with Pay with Google.
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 * */

var basicComponentVerification = _dereq_('../lib/basic-component-verification');
var BraintreeError = _dereq_('../lib/braintree-error');
var browserDetection = _dereq_('./browser-detection');
var GooglePayment = _dereq_('./google-payment');
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var VERSION = "3.26.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} [callback] The second argument, `data`, is the {@link GooglePayment} instance. If no callback is provided, `create` returns a promise that resolves with the {@link GooglePayment} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'Pay with Google',
    client: options.client
  }).then(function () {
    var googlePayment;

    if (!options.client.getConfiguration().gatewayConfiguration.androidPay) {
      return Promise.reject(new BraintreeError({
        type: BraintreeError.types.MERCHANT,
        code: 'PAY_WITH_GOOGLE_NOT_ENABLED',
        message: 'Pay with Google is not enabled for this merchant.'
      }));
    }

    googlePayment = new GooglePayment(options);

    return googlePayment.initialize();
  });
}

/**
 * @static
 * @function isSupported
 * @description Returns true if Pay with Google is supported in this browser.
 * @example
 * if (braintree.googlePayment.isSupported()) {
 *    // Add Pay with Google button to page and
 *    // initialize Pay with Google component
 * } else {
 *    // Do not initialize Pay with Google component
 * }
 * @returns {Boolean} Returns true if Pay with Google supports this browser.
 */
function isSupported() {
  // TODO - We limit this to android chrome for now
  // Once it works in Desktop Chrome, we can just check that it's Chrome
  return Boolean(browserDetection.supportsPaymentRequestApi() && browserDetection.isAndroid());
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

},{"../lib/basic-component-verification":22,"../lib/braintree-error":23,"../lib/promise":35,"./browser-detection":16,"./google-payment":17,"@braintree/wrap-promise":13}],19:[function(_dereq_,module,exports){
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

},{"./constants":27,"./create-authorization-data":29,"./json-clone":33}],20:[function(_dereq_,module,exports){
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

},{"./add-metadata":19,"./constants":27}],21:[function(_dereq_,module,exports){
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

},{}],22:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var sharedErrors = _dereq_('./errors');
var VERSION = "3.26.0";

function basicComponentVerification(options) {
  var client, clientVersion, name;

  if (!options) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.type,
      code: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.code,
      message: 'Options must be passed to basicComponentVerification function.'
    }));
  }

  name = options.name;
  client = options.client;

  if (client == null) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating ' + name + '.'
    }));
  }

  clientVersion = client.getVersion();

  if (clientVersion !== VERSION) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and ' + name + ' (version ' + VERSION + ') components must be from the same SDK version.'
    }));
  }

  return Promise.resolve();
}

module.exports = {
  verify: basicComponentVerification
};

},{"./braintree-error":23,"./errors":31,"./promise":35}],23:[function(_dereq_,module,exports){
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

},{"./enumerate":30}],24:[function(_dereq_,module,exports){
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

},{"../is-whitelisted-domain":32}],25:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../enumerate');

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');

},{"../enumerate":30}],26:[function(_dereq_,module,exports){
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

},{"../braintree-error":23,"./check-origin":24,"./events":25,"framebus":14}],27:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.26.0";
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

},{}],28:[function(_dereq_,module,exports){
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

},{"./braintree-error":23,"./errors":31}],29:[function(_dereq_,module,exports){
'use strict';

var atob = _dereq_('../lib/vendor/polyfill').atob;

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

},{"../lib/vendor/polyfill":37}],30:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],31:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');

module.exports = {
  INVALID_USE_OF_INTERNAL_FUNCTION: {
    type: BraintreeError.types.INTERNAL,
    code: 'INVALID_USE_OF_INTERNAL_FUNCTION'
  },
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

},{"./braintree-error":23}],32:[function(_dereq_,module,exports){
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

},{}],33:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],34:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],35:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":15}],36:[function(_dereq_,module,exports){
'use strict';

function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;

},{}],37:[function(_dereq_,module,exports){
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
},{}],38:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],39:[function(_dereq_,module,exports){
'use strict';

var analytics = _dereq_('../../lib/analytics');
var assign = _dereq_('../../lib/assign').assign;
var Bus = _dereq_('../../lib/bus');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var iFramer = _dereq_('@braintree/iframer');
var uuid = _dereq_('../../lib/vendor/uuid');
var useMin = _dereq_('../../lib/use-min');
var methods = _dereq_('../../lib/methods');
var Promise = _dereq_('../../lib/promise');
var BraintreeError = _dereq_('../../lib/braintree-error');
var VERSION = "3.26.0";
var events = _dereq_('../shared/constants').events;
var errors = _dereq_('../shared/constants').errors;
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

var CARD_TYPE_MAPPINGS = {
  Visa: 'visa',
  Mastercard: 'mastercard',
  'American Express': 'amex',
  'Diners Club': 'diners',
  Discover: 'discover',
  JCB: 'jcb',
  UnionPay: 'unionpay',
  Maestro: 'maestro'
};

var BRAINTREE_PAY_WITH_GOOGLE_MERCHANT_ID = '18278000977346790994';

function composeUrl(assetsUrl, componentId, isDebug) {
  return assetsUrl + '/web/' + VERSION + '/html/payment-request-frame' + useMin(isDebug) + '.html#' + componentId;
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

  this._componentId = uuid();
  this._client = options.client;
  this._analyticsName = 'payment-request';
  this._enabledPaymentMethods = {
    basicCard: enabledPaymentMethods.basicCard !== false,
    payWithGoogle: enabledPaymentMethods.payWithGoogle !== false
  };
  this._supportedPaymentMethods = this._constructDefaultSupportedPaymentMethods();
  this._defaultSupportedPaymentMethods = Object.keys(this._supportedPaymentMethods).map(function (key) {
    return this._supportedPaymentMethods[key];
  }.bind(this));
  this._bus = new Bus({channel: this._componentId});
}

PaymentRequestComponent.prototype._constructDefaultSupportedPaymentMethods = function () {
  var configuration = this._client.getConfiguration();
  var isProduction = configuration.gatewayConfiguration.environment === 'production';
  var metadata = configuration.analyticsMetadata;
  var androidPayConfiguration = configuration.gatewayConfiguration.androidPay;
  var cardConfiguration = configuration.gatewayConfiguration.creditCards;
  var supportedPaymentMethods = {};

  if (this._enabledPaymentMethods.basicCard && cardConfiguration && cardConfiguration.supportedCardTypes.length > 0) {
    supportedPaymentMethods.basicCard = {
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: cardConfiguration.supportedCardTypes.map(function (cardType) {
          return CARD_TYPE_MAPPINGS[cardType];
        })
      }
    };
  }

  if (this._enabledPaymentMethods.payWithGoogle && androidPayConfiguration && androidPayConfiguration.enabled) {
    supportedPaymentMethods.payWithGoogle = {
      supportedMethods: ['https://google.com/pay'],
      data: {
        merchantId: BRAINTREE_PAY_WITH_GOOGLE_MERCHANT_ID,
        apiVersion: 1,
        environment: isProduction ? 'PRODUCTION' : 'TEST',
        allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
        paymentMethodTokenizationParameters: {
          tokenizationType: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'braintree',
            'braintree:merchantId': configuration.gatewayConfiguration.merchantId,
            'braintree:authorizationFingerprint': androidPayConfiguration.googleAuthorizationFingerprint,
            'braintree:apiVersion': 'v1',
            'braintree:sdkVersion': VERSION,
            'braintree:metadata': JSON.stringify({
              source: metadata.source,
              integration: metadata.integration,
              sessionId: metadata.sessionId,
              version: VERSION,
              platform: metadata.platform
            })
          }
        },
        cardRequirements: {
          allowedCardNetworks: androidPayConfiguration.supportedNetworks.map(function (card) { return card.toUpperCase(); })
        }
      }
    };

    if (configuration.authorizationType === 'TOKENIZATION_KEY') {
      supportedPaymentMethods.payWithGoogle.data.paymentMethodTokenizationParameters.parameters['braintree:clientKey'] = configuration.authorization;
    }
  }

  return supportedPaymentMethods;
};

PaymentRequestComponent.prototype.initialize = function () {
  var clientConfiguration = this._client.getConfiguration();

  this._frame = iFramer({
    allowPaymentRequest: true,
    name: 'braintree-payment-request-frame',
    'class': 'braintree-payment-request-frame',
    height: 0,
    width: 0,
    style: {
      position: 'absolute',
      left: '-9999px'
    }
  });

  if (this._defaultSupportedPaymentMethods.length === 0) {
    return Promise.reject(new BraintreeError(errors.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS));
  }

  return new Promise(function (resolve) {
    this._bus.on(events.FRAME_READY, function (reply) {
      reply(this._client);
    }.bind(this));
    this._bus.on(events.FRAME_CAN_MAKE_REQUESTS, function () {
      analytics.sendEvent(this._client, this._analyticsName + '.initialized');
      resolve(this);
    }.bind(this));

    // TODO - We may need to apply the same setTimeout hack that Hosted Fields
    // uses for iframes to load correctly in Edge. See:
    // https://github.com/braintree/braintree-web/blob/0c951e5f9859c606652485de14188b6bd6656677/src/hosted-fields/external/hosted-fields.js#L449-L469
    this._frame.src = composeUrl(clientConfiguration.gatewayConfiguration.assetsUrl, this._componentId, clientConfiguration.isDebug);
    document.body.appendChild(this._frame);
  }.bind(this));
};

/**
 * Create an object to pass into tokenize to specify a custom configuration. If no overrides are provided, the default configuration will be provided.
 * @public
 * @param {string} type The supported payment method type. Possible values are `basicCard` and `payWithGoogle`.
 * If no type is provided, the function will throw an error. If the type provided is not an enabled payemnt method for the merchant account , the function will throw an error.
 * @param {object} [overrides] The configuration overrides for the [data property on the supported payment methods objects](https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request). If not passed in, the default configuration for the specified type will be provided. If a property is not provided, the value from the default configruation will be used.
 * @example <caption>Getting the default configuration for a specified type</caption>
 * var configuration = paymentRequestInstance.createSupportedPaymentMethodsConfiguration('basicCard');
 *
 * configuration.supportedMethods; // ['basic-card']
 * configuration.data.supportedNetworks; // ['visa', 'mastercard', 'amex'] <- whatever the supported card networks for the merchant account are
 * @example <caption>Specifying overrides</caption>
 * var configuration = paymentRequestInstance.createSupportedPaymentMethodsConfiguration('basicCard', {
 *   supportedNetworks: ['visa'],
 *   supportedTypes: ['credit', 'debit']
 * });
 *
 * configuration.supportedMethods; // ['basic-card']
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
 * @param {object} configuration The payment details.
 * @param {object} configuration.details The payment details. For details on this object, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_payment_details).
 * @param {array} [configuration.supportedPaymentMethods] The supported payment methods. If not passed in, the supported payment methods from the merchant account that generated the authorization for the client will be used. For details on this array, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_supported_payment_methods).
 * @param {object} [configuration.options] Additional payment request options. For details on this object, see [Google's PaymentRequest API documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/deep-dive-into-payment-request#defining_options_optional).
 *
 * **Note:** `requestShipping` is not supported by Braintree at this time.
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
 *   // collect shipping information from payload
 *   console.log(payload.details.rawPaymentResponse.shippingAddress);
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PaymentRequestComponent.prototype.tokenize = function (configuration) {
  return new Promise(function (resolve, reject) {
    this._bus.emit(events.PAYMENT_REQUEST_INITIALIZED, {
      supportedPaymentMethods: configuration.supportedPaymentMethods || this._defaultSupportedPaymentMethods,
      details: configuration.details,
      options: configuration.options
    });

    this._bus.on(events.PAYMENT_REQUEST_SUCCESSFUL, function (payload) {
      analytics.sendEvent(this._client, this._analyticsName + '.tokenize.succeeded');
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
    }.bind(this));

    this._bus.on(events.PAYMENT_REQUEST_FAILED, function (error) {
      var formattedError;

      if (error.name === 'AbortError') {
        formattedError = new BraintreeError({
          type: errors.PAYMENT_REQUEST_CANCELED.type,
          code: errors.PAYMENT_REQUEST_CANCELED.code,
          message: errors.PAYMENT_REQUEST_CANCELED.message,
          details: {
            originalError: error
          }
        });
        analytics.sendEvent(this._client, this._analyticsName + '.tokenize.canceled');
      } else if (error.name === 'PAYMENT_REQUEST_INITIALIZATION_FAILED') {
        formattedError = new BraintreeError({
          type: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,
          code: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,
          message: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,
          details: {
            originalError: error
          }
        });
      } else if (error.name === 'BRAINTREE_GATEWAY_PAY_WITH_GOOGLE_TOKENIZATION_ERROR') {
        formattedError = new BraintreeError({
          type: errors.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.type,
          code: errors.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.code,
          message: errors.PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE.message,
          details: {
            originalError: error
          }
        });
      } else if (error.name === 'BRAINTREE_GATEWAY_PAY_WITH_GOOGLE_PARSING_ERROR') {
        formattedError = new BraintreeError({
          type: errors.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.type,
          code: errors.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.code,
          message: errors.PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR.message,
          details: {
            originalError: error
          }
        });
      } else {
        formattedError = new BraintreeError({
          code: errors.PAYMENT_REQUEST_NOT_COMPLETED.code,
          type: error.type || BraintreeError.types.CUSTOMER,
          message: errors.PAYMENT_REQUEST_NOT_COMPLETED.message,
          details: {
            originalError: error
          }
        });
        analytics.sendEvent(this._client, this._analyticsName + '.tokenize.failed');
      }
      reject(formattedError);
    }.bind(this));
  }.bind(this));
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

  analytics.sendEvent(this._client, this._analyticsName + '.teardown-completed');

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(PaymentRequestComponent);

},{"../../lib/analytics":20,"../../lib/assign":21,"../../lib/braintree-error":23,"../../lib/bus":26,"../../lib/convert-methods-to-error":28,"../../lib/methods":34,"../../lib/promise":35,"../../lib/use-min":36,"../../lib/vendor/uuid":38,"../shared/constants":40,"@braintree/iframer":6,"@braintree/wrap-promise":13}],40:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/braintree-error');
var enumerate = _dereq_('../../lib/enumerate');

var constants = {};

constants.events = enumerate([
  'FRAME_READY',
  'FRAME_CAN_MAKE_REQUESTS',
  'PAYMENT_REQUEST_INITIALIZED',
  'PAYMENT_REQUEST_FAILED',
  'PAYMENT_REQUEST_SUCCESSFUL'
], 'payment-request:');

constants.errors = {
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
  PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYMENT_REQUEST_PAY_WITH_GOOGLE_FAILED_TO_TOKENIZE',
    message: 'Something went wrong when tokenizing the Pay with Google card.'
  },
  PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'PAYMENT_REQUEST_PAY_WITH_GOOGLE_PARSING_ERROR',
    message: 'Something went wrong when tokenizing the Pay with Google card.'
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

module.exports = constants;

},{"../../lib/braintree-error":23,"../../lib/enumerate":30}]},{},[18])(18)
});