(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).localPayment = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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

},{"./is-edge":5,"./is-samsung":12}],5:[function(_dereq_,module,exports){
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
(function (global){
'use strict';

module.exports = function isIosFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return /FxiOS/i.test(ua);
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
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
},{"./is-ios":11}],10:[function(_dereq_,module,exports){
(function (global){
'use strict';

var isIosWebview = _dereq_('./is-ios-webview');

module.exports = function isIosWKWebview(ua, statusBarVisible) {
  statusBarVisible = typeof statusBarVisible !== 'undefined' ? statusBarVisible : global.statusbar.visible;
  return isIosWebview(ua) && statusBarVisible;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-ios-webview":9}],11:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(_dereq_,module,exports){
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
},{"./is-android":3,"./is-chrome":4,"./is-ios-firefox":8,"./is-ios-webview":9,"./is-samsung":12}],14:[function(_dereq_,module,exports){
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

},{"./lib/assign":15,"./lib/default-attributes":16,"./lib/set-attributes":17}],15:[function(_dereq_,module,exports){
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

},{}],16:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};

},{}],17:[function(_dereq_,module,exports){
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

},{}],18:[function(_dereq_,module,exports){
'use strict';

function deferred(fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      try {
        fn.apply(null, args);
      } catch (err) {
        /* eslint-disable no-console */
        console.log('Error in callback function');
        console.log(err);
        /* eslint-enable no-console */
      }
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

},{"./constants":33,"./create-authorization-data":37,"./json-clone":54}],25:[function(_dereq_,module,exports){
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

},{"./add-metadata":24,"./constants":33,"./promise":56}],26:[function(_dereq_,module,exports){
'use strict';

var loadScript = _dereq_('@braintree/asset-loader/load-script');

module.exports = {
  loadScript: loadScript
};

},{"@braintree/asset-loader/load-script":2}],27:[function(_dereq_,module,exports){
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

},{}],28:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var sharedErrors = _dereq_('./errors');
var VERSION = "3.45.0";

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

},{"./braintree-error":29,"./errors":40,"./promise":56}],29:[function(_dereq_,module,exports){
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

},{"./enumerate":39}],30:[function(_dereq_,module,exports){
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

},{"../is-verified-domain":53}],31:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../enumerate');

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');

},{"../enumerate":39}],32:[function(_dereq_,module,exports){
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

},{"../braintree-error":29,"./check-origin":30,"./events":31,"framebus":22}],33:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.45.0";
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

},{"./braintree-error":29,"./errors":40}],35:[function(_dereq_,module,exports){
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

},{"./constants":33}],37:[function(_dereq_,module,exports){
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

},{"../lib/constants":33,"../lib/vendor/polyfill":59}],38:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var assets = _dereq_('./assets');
var sharedErrors = _dereq_('./errors');

var VERSION = "3.45.0";

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
},{"./assets":26,"./braintree-error":29,"./errors":40,"./promise":56}],39:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],40:[function(_dereq_,module,exports){
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

},{"./braintree-error":29}],41:[function(_dereq_,module,exports){
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
},{"../../braintree-error":29,"../../bus":32,"../../is-https":52,"../../vendor/uuid":60,"../shared/browser-detection":48,"../shared/constants":49,"../shared/errors":50,"../shared/events":51,"./../../assign":27,"./strategies/modal":43,"./strategies/popup":46,"./strategies/popup-bridge":44,"@braintree/iframer":14}],42:[function(_dereq_,module,exports){
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

},{"./frame-service":41}],43:[function(_dereq_,module,exports){
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
},{"../../../assign":27,"../../shared/browser-detection":48,"@braintree/iframer":14}],44:[function(_dereq_,module,exports){
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
},{"../../../braintree-error":29,"../../shared/errors":50}],45:[function(_dereq_,module,exports){
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

},{"../../../shared/constants":49,"./position":47}],46:[function(_dereq_,module,exports){
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
},{"./compose-options":45}],47:[function(_dereq_,module,exports){
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
},{}],48:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  isIos: _dereq_('@braintree/browser-detection/is-ios'),
  isIosWKWebview: _dereq_('@braintree/browser-detection/is-ios-wkwebview'),
  isIE: _dereq_('@braintree/browser-detection/is-ie'),
  supportsPopups: _dereq_('@braintree/browser-detection/supports-popups')
};


},{"@braintree/browser-detection/is-ie":6,"@braintree/browser-detection/is-ios":11,"@braintree/browser-detection/is-ios-wkwebview":10,"@braintree/browser-detection/supports-popups":13}],49:[function(_dereq_,module,exports){
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

},{}],50:[function(_dereq_,module,exports){
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

},{"../../braintree-error":29}],51:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../enumerate');

module.exports = enumerate([
  'DISPATCH_FRAME_READY',
  'DISPATCH_FRAME_REPORT'
], 'frameService:');

},{"../../enumerate":39}],52:[function(_dereq_,module,exports){
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
},{}],53:[function(_dereq_,module,exports){
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

},{}],54:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],55:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],56:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":23}],57:[function(_dereq_,module,exports){
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
},{}],58:[function(_dereq_,module,exports){
'use strict';

function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;

},{}],59:[function(_dereq_,module,exports){
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
},{}],60:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],61:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  REQUIRED_OPTIONS_FOR_START_PAYMENT: ['onPaymentStart', 'paymentType', 'amount', 'fallback']
};

},{}],62:[function(_dereq_,module,exports){
(function (global){
'use strict';

var frameService = _dereq_('../../lib/frame-service/external');
var BraintreeError = _dereq_('../../lib/braintree-error');
var useMin = _dereq_('../../lib/use-min');
var VERSION = "3.45.0";
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
 *     currencyCode: 'EUR',
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
      endpoint: 'local_payments/create',
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
},{"../../lib/analytics":25,"../../lib/braintree-error":29,"../../lib/constants":33,"../../lib/convert-methods-to-error":34,"../../lib/convert-to-braintree-error":35,"../../lib/frame-service/external":42,"../../lib/methods":55,"../../lib/promise":56,"../../lib/querystring":57,"../../lib/use-min":58,"../shared/errors":64,"./constants":61,"@braintree/wrap-promise":21}],63:[function(_dereq_,module,exports){
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
var VERSION = "3.45.0";
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

},{"../lib/analytics":25,"../lib/basic-component-verification":28,"../lib/braintree-error":29,"../lib/create-assets-url":36,"../lib/create-deferred-client":38,"../lib/promise":56,"./external/local-payment":62,"./shared/errors":64,"@braintree/wrap-promise":21}],64:[function(_dereq_,module,exports){
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

},{"../../lib/braintree-error":29}]},{},[63])(63)
});
