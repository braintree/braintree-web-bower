(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).threeDSecure = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

var PromisePolyfill = _dereq_('promise-polyfill');

module.exports = global.Promise || PromisePolyfill;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":12}],2:[function(_dereq_,module,exports){
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

  if (options.crossorigin) {
    script.setAttribute('crossorigin', options.crossorigin);
  }

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

},{"./lib/assign":4,"./lib/default-attributes":5,"./lib/set-attributes":6}],4:[function(_dereq_,module,exports){
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

},{}],5:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};

},{}],6:[function(_dereq_,module,exports){
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

},{}],7:[function(_dereq_,module,exports){
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

},{}],8:[function(_dereq_,module,exports){
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

},{}],9:[function(_dereq_,module,exports){
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

},{}],10:[function(_dereq_,module,exports){
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

},{"./lib/deferred":7,"./lib/once":8,"./lib/promise-or-callback":9}],11:[function(_dereq_,module,exports){
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
},{}],12:[function(_dereq_,module,exports){
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

},{}],13:[function(_dereq_,module,exports){
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

},{"./constants":22,"./create-authorization-data":26,"./json-clone":33}],14:[function(_dereq_,module,exports){
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

},{"./add-metadata":13,"./constants":22,"./promise":35}],15:[function(_dereq_,module,exports){
'use strict';

var loadScript = _dereq_('@braintree/asset-loader/load-script');

module.exports = {
  loadScript: loadScript
};

},{"@braintree/asset-loader/load-script":2}],16:[function(_dereq_,module,exports){
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

},{}],17:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var sharedErrors = _dereq_('./errors');
var VERSION = "3.48.0";

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

},{"./braintree-error":18,"./errors":30,"./promise":35}],18:[function(_dereq_,module,exports){
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

},{"./enumerate":29}],19:[function(_dereq_,module,exports){
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

},{"../is-verified-domain":32}],20:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../enumerate');

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');

},{"../enumerate":29}],21:[function(_dereq_,module,exports){
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

},{"../braintree-error":18,"./check-origin":19,"./events":20,"framebus":11}],22:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.48.0";
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

},{}],23:[function(_dereq_,module,exports){
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

},{"./braintree-error":18,"./errors":30}],24:[function(_dereq_,module,exports){
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

},{"./braintree-error":18}],25:[function(_dereq_,module,exports){
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

},{"./constants":22}],26:[function(_dereq_,module,exports){
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

},{"../lib/constants":22,"../lib/vendor/polyfill":37}],27:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var assets = _dereq_('./assets');
var sharedErrors = _dereq_('./errors');

var VERSION = "3.48.0";

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
},{"./assets":15,"./braintree-error":18,"./errors":30,"./promise":35}],28:[function(_dereq_,module,exports){
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

},{}],29:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],30:[function(_dereq_,module,exports){
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
  }
};

},{"./braintree-error":18}],31:[function(_dereq_,module,exports){
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
},{}],32:[function(_dereq_,module,exports){
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
},{"promise-polyfill":12}],36:[function(_dereq_,module,exports){
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
(function (global){
'use strict';

var BraintreeError = _dereq_('../../lib/braintree-error');
var convertToBraintreeError = _dereq_('../../lib/convert-to-braintree-error');
var analytics = _dereq_('../../lib/analytics');
var assign = _dereq_('../../lib/assign').assign;
var assets = _dereq_('../../lib/assets');
var methods = _dereq_('../../lib/methods');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var constants = _dereq_('../shared/constants');
var useMin = _dereq_('../../lib/use-min');
var Bus = _dereq_('../../lib/bus');
var uuid = _dereq_('../../lib/vendor/uuid');
var deferred = _dereq_('../../lib/deferred');
var errors = _dereq_('../shared/errors');
var events = _dereq_('../shared/events');
var iFramer = _dereq_('@braintree/iframer');
var Promise = _dereq_('../../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');
var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;

var PLATFORM = _dereq_('../../lib/constants').PLATFORM;
var VERSION = "3.48.0";

var IFRAME_HEIGHT = 400;
var IFRAME_WIDTH = 400;

/**
 * @deprecated
 * @callback ThreeDSecure~addFrameCallback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {HTMLIFrameElement} iframe An iframe element containing the bank's authentication page that you must put on your page.
 * @description **Deprecated** The callback used for options.addFrame in 3DS 1.0's {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @deprecated
 * @callback ThreeDSecure~removeFrameCallback
 * @description **Deprecated** The callback used for options.removeFrame in 3DS 1.0's {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @deprecated
 * @typedef {object} ThreeDSecure~verifyCardCustomerObject
 * @property {string} [customer.mobilePhoneNumber] The mobile phone number used for verification. Only numbers; remove dashes, paranthesis and other characters.
 * @property {string} [customer.email] The email used for verification.
 * @property {string} [customer.shippingMethod] The 2-digit string indicating the shipping method chosen for the transaction.
 * @property {string} [customer.billingAddress.firstName] The first name associated with the address.
 * @property {string} [customer.billingAddress.lastName] The last name associated with the address.
 * @property {string} [customer.billingAddress.streetAddress] Line 1 of the Address (eg. number, street, etc).
 * @property {string} [customer.billingAddress.extendedAddress] Line 2 of the Address (eg. suite, apt #, etc.).
 * @property {string} [customer.billingAddress.locality] The locality (city) name associated with the address.
 * @property {string} [customer.billingAddress.region] The 2 letter code for US states, and the equivalent for other countries.
 * @property {string} [customer.billingAddress.postalCode] The zip code or equivalent for countries that have them.
 * @property {string} [customer.billingAddress.countryCodeAlpha2] The 2 character country code.
 * @property {string} [customer.billingAddress.phoneNumber] The phone number associated with the address. Only numbers; remove dashes, paranthesis and other characters.
 * @description **Deprecated** Optional customer information to be passed to 3DS 1.0 for verification.
 */

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
 * @typedef {string} ThreeDSecure~prepareLookupPayload The client data to pass on when doing a server side lookup call.
 */

/**
 * @typedef {object} ThreeDSecure~verificationData
 * @property {object} threeDSecureInfo Contains liability shift details.
 * @property {boolean} threeDSecureInfo.liabilityShiftPossible Indicates whether the card was eligible for 3D Secure.
 * @property {boolean} threeDSecureInfo.liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 * @property {object} paymentMethod A {@link ThreeDSecure~verifyPayload|verifyPayload} object.
 * @property {object} lookup Details about the 3D Secure lookup.
 * @property {string} lookup.threeDSecureVersion The version of 3D Secure that will be used for the 3D Secure challenge.
*/

/**
 * @typedef {object} ThreeDSecure~billingAddress
 * @property {string} [givenName] The first name associated with the billing address.
 * @property {string} [surname] The last name associated with the billing address.
 * @property {number} [phoneNumber] The phone number associated with the billing address. Only numbers; remove dashes, paranthesis and other characters.
 * @property {string} [streetAddress] Line 1 of the billing address (eg. number, street, etc).
 * @property {string} [extendedAddress] Line 2 of the billing address (eg. suite, apt #, etc.).
 * @property {string} [line3] Line 3 of the billing address if needed (eg. suite, apt #, etc).
 * @property {string} [locality] The locality (city) name associated with the billing address.
 * @property {string} [region] The 2 letter code for US states, and the equivalent for other countries.
 * @property {string} [postalCode] The zip code or equivalent for countries that have them.
 * @property {string} [countryCodeAlpha2] The 2 character country code.
*/

/**
 * @typedef {object} ThreeDSecure~additionalInformation
 * @property {number} [workPhoneNumber] The work phone number used for verification. Only numbers; remove dashes, parenthesis and other characters.
 * @property {string} [shippingGivenName] The first name associated with the shipping address.
 * @property {string} [shippingSurname] The last name associated with the shipping address.
 * @property {object} [shippingAddress]
 * @property {string} [shippingAddress.streetAddress] The first name associated with the shipping address.
 * @property {string} [shippingAddress.extendedAddress] The last name associated with the shipping address.
 * @property {string} [shippingAddress.line3] Line 3 of the shipping address if needed (eg. suite, apt #, etc).
 * @property {string} [shippingAddress.locality] The locality (city) name associated with the shipping address.
 * @property {string} [shippingAddress.region] The 2 letter code for US states, and the equivalent for other countries.
 * @property {string} [shippingAddress.postalCode] The zip code or equivalent for countries that have them.
 * @property {string} [shippingAddress.countryCodeAlpha2] The 2 character country code.
 * @property {number} [shippingPhone] The phone number associated with the shipping address. Only numbers; remove dashes, parenthesis and other characters.
 * @property {string} [shippingMethod] The 2-digit string indicating the name of the shipping method chosen for the transaction. Possible values:
 * - `01` Same Day
 * - `02` Overnight / Expedited
 * - `03` Priority (2-3 Days)
 * - `04` Ground
 * - `05` Electronic Delivery
 * - `06` Ship to Store
 * @property {number} [shippingMethodIndicator] The 2-digit string indicating the shipping method chosen for the transaction Possible values.
 * - `01` Ship to cardholder billing address
 * - `02` Ship to another verified address on file with merchant
 * - `03` Ship to address that is different than billing address
 * - `04` Ship to store (store address should be populated on request)
 * - `05` Digital goods
 * - `06` Travel and event tickets, not shipped
 * - `07` Other
 * @property {string} [productCode] The 3-letter string representing the merchant product code. Possible values:
 * - `AIR` Airline
 * - `GEN` General Retail
 * - `DIG` Digital Goods
 * - `SVC` Services
 * - `RES` Restaurant
 * - `TRA` Travel
 * - `DSP` Cash Dispensing
 * - `REN` Car Rental
 * - `GAS` Fueld
 * - `LUX` Luxury Retail
 * - `ACC` Accommodation Retail
 * - `TBD` Other
 * @property {number} [deliveryTimeframe] The 2-digit number indicating the delivery timeframe. Possible values:
 * - `01` Electronic delivery
 * - `02` Same day shipping
 * - `03` Overnight shipping
 * - `04` Two or more day shipping
 * @property {string} [deliveryEmail] For electronic delivery, email address to which the merchandise was delivered.
 * @property {number} [reorderindicator] The 2-digit number indicating whether the cardholder is reordering previously purchased merchandise. possible values:
 * - `01` First time ordered
 * - `02` Reordered
 * @property {number} [preorderIndicator] The 2-digit number indicating whether cardholder is placing an order with a future availability or release date. possible values:
 * - `01` Merchandise available
 * - `02` Future availability
 * @property {number} [preorderDate] The 8-digit number (format: YYYYMMDD) indicating expected date that a pre-ordered purchase will be available.
 * @property {number} [giftCardAmount] The purchase amount total for prepaid gift cards in major units.
 * @property {number} [giftCardCurrencyCode] ISO 4217 currency code for the gift card purchased.
 * @property {number} [giftCardCount] Total count of individual prepaid gift cards purchased.
 * @property {number} [accountAgeIndicator] The 2-digit value representing the length of time cardholder has had account. Possible values:
 * - `01` No Account
 * - `02` Created during transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {number} [accountCreateDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder opened the account.
 * @property {number} [accountChangeIndicator] The 2-digit value representing the length of time since the last change to the cardholder account. This includes shipping address, new payment account or new user added. Possible values:
 * - `01` Changed during transaction
 * - `02` Less than 30 days
 * - `03` 30-60 days
 * - `04` More than 60 days
 * @property {number} [accountChangeDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder's account was last changed. This includes changes to the billing or shipping address, new payment accounts or new users added.
 * @property {number} [accountPwdChangeIndicator] The 2-digit value representing the length of time since the cardholder changed or reset the password on the account. Possible values:
 * - `01` No change
 * - `02` Changed during transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {number} [accountPwdChangeDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder last changed or reset password on account.
 * @property {number} [shippingAddressUsageIndicator] The 2-digit value indicating when the shipping address used for transaction was first used. Possible values:
 * - `01` This transaction
 * - `02` Less than 30 days
 * - `03` 30-60 days
 * - `04` More than 60 days
 * @property {number} [shippingAddressUsageDate] The 8-digit number (format: YYYYMMDD) indicating the date when the shipping address used for this transaction was first used.
 * @property {number} [transactionCountDay] Number of transactions (successful or abandoned) for this cardholder account within the last 24 hours.
 * @property {number} [transactionCountYear] Number of transactions (successful or abandoned) for this cardholder account within the last year.
 * @property {number} [addCardAttempts] Number of add card attempts in the last 24 hours.
 * @property {number} [accountPurchases] Number of purchases with this cardholder account during the previous six months.
 * @property {number} [fraudActivity] The 2-digit value indicating whether the merchant experienced suspicious activity (including previous fraud) on the account. Possible values:
 * - `01` No suspicious activity
 * - `02` Suspicious activity observed
 * @property {number} [shippingNameIndicator] The 2-digit value indicating if the cardholder name on the account is identical to the shipping name used for the transaction. Possible values:
 * - `01` Account and shipping name identical
 * - `02` Account and shipping name differ
 * @property {number} [paymentAccountIndicator] The 2-digit value indicating the length of time that the payment account was enrolled in the merchant account. Possible values:
 * - `01` No account (guest checkout)
 * - `02` During the transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {number} [paymentAccountAge] The 8-digit number (format: YYYYMMDD) indicating the date the payment account was added to the cardholder account.
 * @property {number} [acsWindowSize] The 2-digit number to set the challenge window size to display to the end cardholder.  The ACS will reply with content that is formatted appropriately to this window size to allow for the best user experience.  The sizes are width x height in pixels of the window displayed in the cardholder browser window. Possible values:
 * - `01` 250x400
 * - `02` 390x400
 * - `03` 500x600
 * - `04` 600x400
 * - `05` Full page
 * @property {number} [sdkMaxTimeout] The 2-digit number of minutes (minimum 05) to set the maximum amount of time for all 3DS 2.0 messages to be communicated between all components.
 * @property {number} [addressMatch] The 1-character value (Y/N) indicating whether cardholder billing and shipping addresses match.
 * @property {string} [accountId] Additional cardholder account information.
 * @property {string} [ipAddress] The IP address of the consumer. IPv4 and IPv6 are supported.
 * @property {string} [orderDescription] Brief description of items purchased.
 * @property {number} [taxAmount] Unformatted tax amount without any decimalization (ie. $123.67 = 12367).
 * @property {string} [userAgent] The exact content of the HTTP user agent header.
 * @property {number} [authenticationIndicator] The 2-digit number indicating the type of authentication request. This field is required if a recurring or installment transaction request. Possible values:
 *  - `02` Recurring
 *  - `03` Installment
 * @property {number} [installment] An integer value greater than 1 indicating the maximum number of permitted authorizations for installment payments. Required for recurring and installement transaction requests.
 * @property {number} [purchaseDate] The 14-digit number (format: YYYYMMDDHHMMSS) indicating the date in UTC of original purchase. Required for recurring and installement transaction requests.
 * @property {number} [recurringEnd] The 8-digit number (format: YYYYMMDD) indicating the date after which no further recurring authorizations should be performed. Required for recurring and installement transaction requests.
 * @property {number} [recurringFrequency] Integer value indicating the minimum number of days between recurring authorizations. A frequency of monthly is indicated by the value 28. Multiple of 28 days will be used to indicate months (ex. 6 months = 168). Required for recurring and installement transaction requests.
 */

/**
 * @class
 * @param {object} options 3D Secure {@link module:braintree-web/three-d-secure.create create} options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create} instead.</strong>
 * @classdesc This class represents a ThreeDSecure component produced by {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create}. Instances of this class have a method for launching a 3D Secure authentication flow.
 *
 * **Note**: 3D Secure 2.0 is documented below and will become the default integration method in a future version of Braintree-web. Until then, version 1.0 will continue to be supported. To view 3D Secure 1.0 documentation, look at Braintree-web documentation from version [3.40.0](https://braintree.github.io/braintree-web/3.40.0/ThreeDSecure.html) and earlier, or upgrade your integration by referring to the [3D Secure 2.0 adoption guide](https://developers.braintreepayments.com/guides/3d-secure/migration/javascript/v3).
 */
function ThreeDSecure(options) {
  this._options = options;
  this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.assetsUrl + '/web/' + VERSION;
  this._isDebug = options.client.getConfiguration().isDebug;
  this._client = options.client;
  this._clientMetadata = {
    sdkVersion: PLATFORM + '/' + VERSION,
    requestedThreeDSecureVersion: this._usesSongbirdFlow() ? '2' : '1'
  };
}

/**
 * Launch the 3D Secure login flow, returning a nonce payload.
 *
 * @public
 * @param {object} options Options for card verification.
 * @param {string} options.nonce The nonce representing the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.nonce`.
 * @param {string} options.bin The numeric Bank Identification Number (bin) of the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.details.bin`.
 * @param {number} options.amount The amount of the transaction in the current merchant account's currency. For example, if you are running a transaction of $123.45 US dollars, `amount` would be 123.45.
 * @param {boolean} [options.challengeRequested] If set to true, an authentication challenge will be forced if possible.
 * @param {boolean} [options.exemptionRequested] If set to true, an exemption to the authentication challenge will be requested.
 * @param {function} options.onLookupComplete Function to execute when lookup completes. The first argument, `data`, is a {@link ThreeDSecure~verificationData|verificationData} object, and the second argument, `next`, is a callback. `next` must be called to continue.
 * @param {string} [options.email] The email used for verification.
 * @param {string} [options.mobilePhoneNumber] The mobile phone number used for verification. Only numbers; remove dashes, paranthesis and other characters.
 * @param {object} [options.billingAddress] An {@link ThreeDSecure~billingAddress|billingAddress} object for verification.
 * @param {object} [options.additionalInformation] An {@link ThreeDSecure~additionalInformation|additionalInformation} object for verification.
 * @param {object} [options.customer] **Deprecated** Customer information for use in 3DS 1.0 verifications. Can contain any subset of a {@link ThreeDSecure~verifyCardCustomerObject|verifyCardCustomerObject}. Only to be used for 3DS 1.0 integrations.
 * @param {callback} options.addFrame **Deprecated** This {@link ThreeDSecure~addFrameCallback|addFrameCallback} will be called when the bank frame needs to be added to your page. Only to be used for 3DS 1.0 integrations.
 * @param {callback} options.removeFrame **Deprecated** For use in 3DS 1.0 Flows. This {@link ThreeDSecure~removeFrameCallback|removeFrameCallback} will be called when the bank frame needs to be removed from your page. Only to be used in 3DS 1.0 integrations.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~verifyPayload|verifyPayload}.

 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * <caption>Verifying a payment method nonce with 3DS 2.0</caption>
 * var my3DSContainer;
 *
 * threeDSecure.verifyCard({
 *   amount: '123.45',
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin,
 *   email: 'test@example.com'
 *   billingAddress: {
 *     givenName: 'Jill',
 *     surname: 'Doe',
 *     phoneNumber: '8101234567',
 *     streetAddress: '555 Smith St.',
 *     extendedAddress: '#5',
 *     locality: 'Oakland',
 *     region: 'CA',
 *     postalCode: '12345',
 *     countryCodeAlpha2: 'US'
 *   },
 *   additionalInformation: {
 *     workPhoneNumber: '5555555555',
 *     shippingGivenName: 'Jill',
 *     shippingSurname: 'Doe',
 *     shippingAddress: {
 *       streetAddress: '555 Smith st',
 *       extendedAddress: '#5',
 *       locality: 'Oakland',
 *       region: 'CA',
 *       postalCode: '12345',
 *       countryCodeAlpha2: 'US'
 *     }
 *     shippingPhone: '8101234567'
 *   },
 *   onLookupComplete: function (data, next) {
 *     // use `data` here, then call `next()`
 *     next();
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
 * @example
 * <caption>Deprecated: Verifying an existing nonce with 3DS 1.0</caption>
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
  var data,
    showLoader,
    addFrame,
    removeFrame,
    onLookupComplete,
    error,
    nonce;
  var promise = Promise.resolve();
  var additionalInformation = options.additionalInformation || {};
  var self = this;

  options = assign({}, options);

  error = this._checkForVerifyCardError(options);

  if (error) {
    return Promise.reject(error);
  }

  showLoader = options.showLoader !== false;

  this._verifyCardInProgress = true;

  data = {
    amount: options.amount
  };

  nonce = options.nonce;

  if (this._usesSongbirdFlow()) {
    onLookupComplete = deferred(options.onLookupComplete);
    additionalInformation = this._transformBillingAddress(additionalInformation, options.billingAddress);
    additionalInformation = this._transformShippingAddress(additionalInformation);
    if (options.email) {
      additionalInformation.email = options.email;
    }
    if (options.mobilePhoneNumber) {
      additionalInformation.mobilePhoneNumber = options.mobilePhoneNumber;
    }

    data.additionalInfo = additionalInformation;

    if (options.challengeRequested) {
      data.challengeRequested = options.challengeRequested;
    }
    if (options.exemptionRequested) {
      data.exemptionRequested = options.exemptionRequested;
    }

    promise = this._prepareRawLookup(data).then(function (transformedData) {
      data = transformedData;
    });
  } else {
    addFrame = deferred(options.addFrame);
    removeFrame = deferred(options.removeFrame);
    if (options.customer && options.customer.billingAddress) {
      options.customer = this._transformV1CustomerBillingAddress(options.customer);
      data.customer = options.customer;
    }
  }

  analytics.sendEvent(this._options.client, 'three-d-secure.verification-flow.started');

  return promise.then(function () {
    var url = 'payment_methods/' + nonce + '/three_d_secure/lookup';

    return self._client.request({
      endpoint: url,
      method: 'post',
      data: data
    });
  }).then(function (response) {
    analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.3ds-version.' + response.lookup.threeDSecureVersion);

    return self._initializeChallengeWithLookupResponse(response, {
      showLoader: showLoader,
      addFrame: addFrame,
      removeFrame: removeFrame,
      onLookupComplete: onLookupComplete
    });
  }).then(function (payload) {
    analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.completed');

    return payload;
  }).catch(function (err) {
    self._verifyCardInProgress = false;

    analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.failed');

    return Promise.reject(err);
  });
};

ThreeDSecure.prototype._checkForVerifyCardError = function (options) {
  var errorOption;

  if (this._verifyCardBlockingError) {
    return this._verifyCardBlockingError;
  } else if (this._verifyCardInProgress === true) {
    return new BraintreeError(errors.THREEDS_AUTHENTICATION_IN_PROGRESS);
  } else if (!options.nonce) {
    errorOption = 'a nonce';
  } else if (!options.amount) {
    errorOption = 'an amount';
  }

  if (!errorOption) {
    if (this._usesSongbirdFlow()) {
      if (typeof options.onLookupComplete !== 'function') {
        errorOption = 'an onLookupComplete function';
      }
    } else if (typeof options.addFrame !== 'function') {
      errorOption = 'an addFrame function';
    } else if (typeof options.removeFrame !== 'function') {
      errorOption = 'a removeFrame function';
    }
  }

  if (errorOption) {
    return new BraintreeError({
      type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
      code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
      message: 'verifyCard options must include ' + errorOption + '.'
    });
  }

  return null;
};

/* eslint-disable-next-line valid-jsdoc */
/**
 * Launch the iframe challenge using a 3D Secure lookup response from a server side lookup.
 *
 * @public
 * @param {object} lookupResponse The lookup response from the server side call to lookup the 3D Secure information.
 * @returns {Promise} Returns a promise.
 * @example
 * var my3DSContainer;
 *
 * threeDSecure.initializeChallengeWithLookupResponse(lookupResponseFromServer).then(function (payload) {
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
ThreeDSecure.prototype.initializeChallengeWithLookupResponse = function (lookupResponse) {
  return this._initializeChallengeWithLookupResponse(lookupResponse);
};

// private version of the public method that allows additional options to be passed
ThreeDSecure.prototype._initializeChallengeWithLookupResponse = function (lookupResponse, options) {
  var self = this;

  options = options || {};

  this._lookupPaymentMethod = lookupResponse.paymentMethod;

  return new Promise(function (resolve, reject) {
    self._verifyCardCallback = function (verifyErr, payload) {
      self._verifyCardInProgress = false;

      if (verifyErr) {
        reject(verifyErr);
      } else {
        analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.liability-shifted.' + String(payload.liabilityShifted));
        analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.liability-shift-possible.' + String(payload.liabilityShiftPossible));

        resolve(payload);
      }
    };
    self._handleLookupResponse({
      showLoader: options.showLoader,
      lookupResponse: lookupResponse,
      addFrame: options.addFrame,
      removeFrame: options.removeFrame,
      onLookupComplete: options.onLookupComplete
    });
  });
};

/**
 * Gather the data needed for a 3D Secure lookup call.
 *
 * @public
 * @param {object} options Options for 3D Secure lookup.
 * @param {string} options.nonce The nonce representing the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.nonce`.
 * @param {string} [options.bin] The numeric Bank Identification Number (bin) of the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.details.bin`. Though not required to start the verification, it is required to receive a 3DS 2.0 lookup response.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~prepareLookupPayload|prepareLookupPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~prepareLookupPayload|prepareLookupPayload}.

 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * <caption>Preparing data for a 3D Secure lookup</caption>
 * threeDSecure.prepareLookup({
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   // send payload to server to do server side lookup
 * });
 */
ThreeDSecure.prototype.prepareLookup = function (options) {
  return this._prepareRawLookup(options).then(function (result) {
    return JSON.stringify(result);
  });
};

ThreeDSecure.prototype._prepareRawLookup = function (options) {
  var data = assign({}, options);
  var self = this;

  return this._getDfReferenceId().then(function (id) {
    data.dfReferenceId = id;
  }).then(function () {
    return self._triggerCardinalBinProcess(options.bin);
  }).catch(function () {
    // catch and ignore errors from looking up
    // df reference and Cardinal bin process
  }).then(function () {
    data.clientMetadata = self._clientMetadata;
    data.authorizationFingerprint = self._client.getConfiguration().authorizationFingerprint;
    data.braintreeLibraryVersion = 'braintree/web/' + VERSION;

    return data;
  });
};

ThreeDSecure.prototype._triggerCardinalBinProcess = function (bin) {
  var self = this;
  var issuerStartTime = Date.now();

  if (!bin) {
    // skip bin lookup because bin wasn't passed in
    return Promise.resolve();
  }

  return global.Cardinal.trigger('bin.process', bin).then(function (binResults) {
    self._clientMetadata.issuerDeviceDataCollectionTimeElapsed = Date.now() - issuerStartTime;
    self._clientMetadata.issuerDeviceDataCollectionResult = binResults && binResults.Status;
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

  if (this._usesSongbirdFlow()) {
    return Promise.reject(new BraintreeError({
      type: errors.THREEDS_METHOD_DEPRECATED.type,
      code: errors.THREEDS_METHOD_DEPRECATED.code,
      message: 'cancelVerifyCard can not be used with 3D Secure v2.'
    }));
  }
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
  var self = this;
  var lookupResponse = options.lookupResponse;

  options.onLookupComplete = options.onLookupComplete || function (data, next) {
    next();
  };

  options.onLookupComplete(lookupResponse, function () {
    var challengePresented = Boolean(lookupResponse.lookup && lookupResponse.lookup.acsUrl);

    analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.challenge-presented.' + String(challengePresented));

    if (challengePresented) {
      if (self._usesSongbirdFlow()) {
        // set up listener for ref id to call out to bt before calling verify callback
        global.Cardinal.continue('cca',
          {
            AcsUrl: lookupResponse.lookup.acsUrl,
            Payload: lookupResponse.lookup.pareq
          },
          {
            OrderDetails: {TransactionId: lookupResponse.lookup.transactionId}
          }
        );
      } else {
        // fallback to old iframe flow:
        options.addFrame(null, self._createIframe({
          showLoader: options.showLoader,
          response: lookupResponse.lookup,
          removeFrame: options.removeFrame
        }));
      }
    } else {
      details = self._formatAuthResponse(lookupResponse.paymentMethod, lookupResponse.threeDSecureInfo);
      details.verificationDetails = lookupResponse.threeDSecureInfo;

      self._verifyCardCallback(null, details);
    }
  });
};

ThreeDSecure.prototype._transformV1CustomerBillingAddress = function (customer) {
  customer.billingAddress.line1 = customer.billingAddress.streetAddress;
  customer.billingAddress.line2 = customer.billingAddress.extendedAddress;
  customer.billingAddress.city = customer.billingAddress.locality;
  customer.billingAddress.state = customer.billingAddress.region;
  customer.billingAddress.countryCode = customer.billingAddress.countryCodeAlpha2;
  delete customer.billingAddress.streetAddress;
  delete customer.billingAddress.extendedAddress;
  delete customer.billingAddress.locality;
  delete customer.billingAddress.region;
  delete customer.billingAddress.countryCodeAlpha2;

  return customer;
};

ThreeDSecure.prototype._transformBillingAddress = function (additionalInformation, billingAddress) {
  if (billingAddress) {
    // map from public API to the API that the Gateway expects
    additionalInformation.billingLine1 = billingAddress.streetAddress;
    additionalInformation.billingLine2 = billingAddress.extendedAddress;
    additionalInformation.billingLine3 = billingAddress.line3;
    additionalInformation.billingCity = billingAddress.locality;
    additionalInformation.billingState = billingAddress.region;
    additionalInformation.billingPostalCode = billingAddress.postalCode;
    additionalInformation.billingCountryCode = billingAddress.countryCodeAlpha2;
    additionalInformation.billingPhoneNumber = billingAddress.phoneNumber;
    additionalInformation.billingGivenName = billingAddress.givenName;
    additionalInformation.billingSurname = billingAddress.surname;
  }

  return additionalInformation;
};

ThreeDSecure.prototype._transformShippingAddress = function (additionalInformation) {
  var shippingAddress = additionalInformation.shippingAddress;

  if (shippingAddress) {
    // map from public API to the API that the Gateway expects
    additionalInformation.shippingLine1 = shippingAddress.streetAddress;
    additionalInformation.shippingLine2 = shippingAddress.extendedAddress;
    additionalInformation.shippingLine3 = shippingAddress.line3;
    additionalInformation.shippingCity = shippingAddress.locality;
    additionalInformation.shippingState = shippingAddress.region;
    additionalInformation.shippingPostalCode = shippingAddress.postalCode;
    additionalInformation.shippingCountryCode = shippingAddress.countryCodeAlpha2;

    delete additionalInformation.shippingAddress;
  }

  return additionalInformation;
};

ThreeDSecure.prototype._createIframe = function (options) {
  var url,
    authenticationCompleteBaseUrl;
  var parentURL = window.location.href;
  var response = options.response;

  this._bus = new Bus({
    channel: uuid(),
    merchantUrl: location.href
  });

  authenticationCompleteBaseUrl = this._assetsUrl + '/html/three-d-secure-authentication-complete-frame.html?channel=' + encodeURIComponent(this._bus.channel) + '&';

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

  url = this._assetsUrl + '/html/three-d-secure-bank-frame' + useMin(this._isDebug) + '.html?showLoader=' + options.showLoader;

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
    liabilityShifted: threeDSecureInfo && threeDSecureInfo.liabilityShifted,
    liabilityShiftPossible: threeDSecureInfo && threeDSecureInfo.liabilityShiftPossible
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
  convertMethodsToError(this, methods(ThreeDSecure.prototype));

  analytics.sendEvent(this._options.client, 'three-d-secure.teardown-completed');

  if (this._bus) {
    this._bus.teardown();
  }

  if (this._bankIframe && this._bankIframe.parentNode) {
    this._bankIframe.parentNode.removeChild(this._bankIframe);
  }

  if (global.Cardinal) {
    global.Cardinal.off('payments.setupComplete');
    global.Cardinal.off('payments.validated');
  }

  return Promise.resolve();
};

ThreeDSecure.prototype._usesSongbirdFlow = function () {
  return this._options.version === 2;
};

ThreeDSecure.prototype._createPaymentsSetupCompleteCallback = function (resolve, timeoutReference) {
  var self = this;

  return function (data) {
    if (self._getDfReferenceIdPromise) {
      self._getDfReferenceIdResolveFunction(data.sessionId);
    } else {
      self._getDfReferenceIdPromise = Promise.resolve(data.sessionId);
    }

    global.clearTimeout(timeoutReference);
    analytics.sendEvent(self._client, 'three-d-secure.cardinal-sdk.init.setup-completed');
    resolve();
  };
};

ThreeDSecure.prototype._createPaymentsValidatedCallback = function () {
  var self = this;

  /**
   * @param {object} data Response Data
   * @see {@link https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/98315/Response+Objects#ResponseObjects-ObjectDefinition}
   * @param {string} data.ActionCode The resulting state of the transaction.
   * @param {boolean} data.Validated Represents whether transaction was successfully or not.
   * @param {number} data.ErrorNumber A non-zero value represents the error encountered while attempting the process the message request.
   * @param {string} data.ErrorDescription Application error description for the associated error number.
   * @param {string} validatedJwt Response JWT
   * @returns {void}
   * */
  return function (data, validatedJwt) {
    var formattedError = '';

    analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.cardinal-sdk.action-code.' + data.ActionCode.toLowerCase());

    switch (data.ActionCode) {
      // Handle these scenarios based on liability shift information in the response.
      case 'SUCCESS':
      case 'NOACTION':
      case 'FAILURE':
        self._performJWTValidation(validatedJwt).then(function (payload) {
          self._verifyCardCallback(null, payload);
        }).catch(function (err) {
          self._verifyCardCallback(err);
        });
        break;

      case 'ERROR':
        switch (data.ErrorNumber) {
          case 10001:
          case 10002:
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT);
            break;
          case 10003:
          case 10007:
          case 10009:
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT);
            break;
          case 10005:
          case 10006:
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_BAD_CONFIG);
            break;
          case 10008:
          case 10010:
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_BAD_JWT);
            break;
          case 10011:
            analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.canceled');
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_CANCELED);
            break;
          case 10004:
          case 10012:
          default:
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_ERROR);
        }

        formattedError.details = {
          originalError: {
            code: data.ErrorNumber,
            description: data.ErrorDescription
          }
        };

        if (self._verifyCardCallback) {
          self._verifyCardCallback(formattedError, null);
        } else {
          self._verifyCardBlockingError = formattedError;
        }
        break;

      default:
    }
  };
};

ThreeDSecure.prototype._setupSongbird = function (setupOptions) {
  var self = this;
  var scriptSource = constants.CARDINAL_SCRIPT_SOURCE.sandbox;
  var jwt = this._client.getConfiguration().gatewayConfiguration.threeDSecure.cardinalAuthenticationJWT;
  var startTime = Date.now();

  setupOptions = setupOptions || {};

  return new Promise(function (resolve, reject) {
    var timeoutReference = global.setTimeout(function () {
      analytics.sendEvent(self._client, 'three-d-secure.cardinal-sdk.init.setup-timeout');
      reject(new BraintreeError(errors.THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT));
    }, setupOptions.timeout || INTEGRATION_TIMEOUT_MS);

    if (setupOptions.isProduction) {
      scriptSource = constants.CARDINAL_SCRIPT_SOURCE.production;
    }
    assets.loadScript({src: scriptSource}).catch(function (err) {
      return Promise.reject(convertToBraintreeError(err, errors.THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED));
    }).then(function (script) {
      self._cardinalScript = script;
      global.Cardinal.on('payments.setupComplete', self._createPaymentsSetupCompleteCallback(resolve, timeoutReference));

      if (setupOptions.loggingEnabled) {
        global.Cardinal.configure({
          logging: {
            level: 'verbose'
          }
        });
      }

      global.Cardinal.setup('init', {
        jwt: jwt
      });

      self._clientMetadata.cardinalDeviceDataCollectionTimeElapsed = Date.now() - startTime;

      global.Cardinal.on('payments.validated', self._createPaymentsValidatedCallback());
    }).catch(function (err) {
      var error = convertToBraintreeError(err, {
        type: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.type,
        code: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.code,
        message: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.message
      });

      if (self._getDfReferenceIdPromise) {
        self._getDfReferenceIdRejectFunction(error);
      } else {
        self._getDfReferenceIdError = error;
      }

      global.clearTimeout(timeoutReference);
      analytics.sendEvent(self._client, 'three-d-secure.cardinal-sdk.init.setup-failed');
      reject(error);
    });
  });
};

ThreeDSecure.prototype._getDfReferenceId = function () {
  if (this._getDfReferenceIdError) {
    return Promise.reject(this._getDfReferenceIdError);
  }

  if (!this._getDfReferenceIdPromise) {
    this._getDfReferenceIdPromise = new Promise(function (resolve, reject) {
      this._getDfReferenceIdResolveFunction = resolve;
      this._getDfReferenceIdRejectFunction = reject;
    }.bind(this));
  }

  return this._getDfReferenceIdPromise;
};

ThreeDSecure.prototype._performJWTValidation = function (jwt) {
  var nonce = this._lookupPaymentMethod.nonce;
  var url = 'payment_methods/' + nonce + '/three_d_secure/authenticate_from_jwt';
  var self = this;

  analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.upgrade-payment-method.started');

  return this._client.request({
    method: 'post',
    endpoint: url,
    data: {
      jwt: jwt,
      paymentMethodNonce: nonce
    }
  }).then(function (response) {
    var paymentMethod = response.paymentMethod || self._lookupPaymentMethod;
    var formattedResponse = self._formatAuthResponse(paymentMethod, response.threeDSecureInfo);

    analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.upgrade-payment-method.succeeded');

    return Promise.resolve(formattedResponse);
  }).catch(function (err) {
    var error = new BraintreeError({
      type: errors.THREEDS_JWT_AUTHENTICATION_FAILED.type,
      code: errors.THREEDS_JWT_AUTHENTICATION_FAILED.code,
      message: errors.THREEDS_JWT_AUTHENTICATION_FAILED.message,
      details: {
        originalError: err
      }
    });

    analytics.sendEvent(self._options.client, 'three-d-secure.verification-flow.upgrade-payment-method.errored');

    return Promise.reject(error);
  });
};

module.exports = wrapPromise.wrapPrototype(ThreeDSecure);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/analytics":14,"../../lib/assets":15,"../../lib/assign":16,"../../lib/braintree-error":18,"../../lib/bus":21,"../../lib/constants":22,"../../lib/convert-methods-to-error":23,"../../lib/convert-to-braintree-error":24,"../../lib/deferred":28,"../../lib/methods":34,"../../lib/promise":35,"../../lib/use-min":36,"../../lib/vendor/uuid":38,"../shared/constants":41,"../shared/errors":42,"../shared/events":43,"@braintree/iframer":3,"@braintree/wrap-promise":10}],40:[function(_dereq_,module,exports){
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
var VERSION = "3.48.0";
var Promise = _dereq_('../lib/promise');
var wrapPromise = _dereq_('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {number} [options.version=1] The version of 3DS to use. Pass in 2 to use 3DS 2.0.
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
    var error, isProduction, instance;
    var config = client.getConfiguration();
    var gwConfig = config.gatewayConfiguration;

    options.client = client;

    if (!gwConfig.threeDSecureEnabled) {
      error = errors.THREEDS_NOT_ENABLED;
    }

    if (config.authorizationType === 'TOKENIZATION_KEY') {
      error = errors.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY;
    }

    isProduction = gwConfig.environment === 'production';

    if (isProduction && !isHTTPS()) {
      error = errors.THREEDS_HTTPS_REQUIRED;
    }

    if (options.version === 2 && !gwConfig.threeDSecure.cardinalAuthenticationJWT) {
      error = errors.THREEDS_NOT_ENABLED_FOR_V2;
    }

    if (error) {
      return Promise.reject(new BraintreeError(error));
    }

    analytics.sendEvent(options.client, 'three-d-secure.initialized');

    instance = new ThreeDSecure(options);

    if (options.version === 2) {
      instance._setupSongbird({isProduction: isProduction, loggingEnabled: options.loggingEnabled});
    }

    return instance;
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

},{"../lib/analytics":14,"../lib/basic-component-verification":17,"../lib/braintree-error":18,"../lib/create-assets-url":25,"../lib/create-deferred-client":27,"../lib/is-https":31,"../lib/promise":35,"./external/three-d-secure":39,"./shared/errors":42,"@braintree/wrap-promise":10}],41:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  LANDING_FRAME_NAME: 'braintreethreedsecurelanding',
  CARDINAL_SCRIPT_SOURCE: {
    production: 'https://songbird.cardinalcommerce.com/cardinalcruise/v1/songbird.js',
    sandbox: 'https://songbirdstag.cardinalcommerce.com/cardinalcruise/v1/songbird.js'
  }
};

},{}],42:[function(_dereq_,module,exports){
'use strict';

/**
 * @name BraintreeError.3D Secure - Creation Error Codes
 * @description Errors that occur when [creating the 3D Secure component](/current/module-braintree-web_three-d-secure.html#.create).
 * @property {MERCHANT} THREEDS_NOT_ENABLED Occurs when 3D Secure is not enabled in the Braintree control panel.
 * @property {MERCHANT} THREEDS_CAN_NOT_USE_TOKENIZATION_KEY Occurs when 3D Secure component is created without a Client Token.
 * @property {MERCHANT} THREEDS_HTTPS_REQUIRED Occurs when 3D Secure component is created in production over HTTPS.
 * @property {MERCHANT} THREEDS_NOT_ENABLED_FOR_V2 Occurs when 3D Secure component is created with version 2 parameter, but merchant is not enabled to use version 2.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_SETUP_FAILED Occurs when Cardinal's Songbird.js library fails to setup for an unknown reason.
 * @property {NETWORK} THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED Occurs when using version 2 and Cardinal's Songbird.js script could not be loaded.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT Occurs when Cardinal's Songbird.js library takes longer than 60 seconds to set up.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT Occurs when Cardinal sends a response indicating a timeout on /Validate, /Confirm, or /Continue.
 * @property {MERCHANT} THREEDS_CARDINAL_SDK_BAD_CONFIG Occurs when there is no JWT in the request. Also when there's some other malformed aspect of config.
 * @property {MERCHANT} THREEDS_CARDINAL_SDK_BAD_JWT Occus when a malformed config causes a either a missing response JWT or a malformed Cardinal response.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_ERROR Occurs when a "general error" or a Cardinal hosted fields error happens. Description contains more details.
 * @property {CUSTOMER} THREEDS_CARDINAL_SDK_CANCELED Occurs when customer cancels the transaction mid-flow, usually with alt-pays that have their own cancel buttons.
 */

/**
 * @name BraintreeError.3D Secure - verifyCard Error Codes
 * @description Errors that occur when using the [`verifyCard` method](/current/ThreeDSecure.html#verifyCard).
 * @property {MERCHANT} THREEDS_AUTHENTICATION_IN_PROGRESS Occurs when another verification is already in progress.
 * @property {MERCHANT} THREEDS_MISSING_VERIFY_CARD_OPTION Occurs when a required option is missing.
 * @property {UNKNOWN} THREEDS_JWT_AUTHENTICATION_FAILED Occurs when something went wrong authenticating the JWT from the Cardinal SDK.
 */

/**
 * @name BraintreeError.3D Secure - cancelVerifyCard Error Codes
 * @description Errors that occur when using the [`cancelVerifyCard` method](/current/ThreeDSecure.html#cancelVerifyCard).
 * @property {MERCHANT} THREEDS_NO_VERIFICATION_PAYLOAD Occurs when the 3D Secure flow is canceled, but there is no 3D Secure information available.
 * @property {MERCHANT} THREEDS_NO_METHOD_DEPRECATED Occurs when `cancelVerifyCard` is called when using 3D Secure version 2.
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
  THREEDS_NOT_ENABLED_FOR_V2: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NOT_ENABLED_FOR_V2',
    message: '3D Secure version 2 is not enabled for this merchant.'
  },
  THREEDS_CARDINAL_SDK_SETUP_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_SETUP_FAILED',
    message: 'Something went wrong setting up Cardinal\'s Songbird.js library.'
  },
  THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED',
    message: 'Cardinal\'s Songbird.js library could not be loaded.'
  },
  THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT',
    message: 'Cardinal\'s Songbird.js took too long to setup.'
  },
  THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT',
    message: 'Cardinal\'s API took too long to respond.'
  },
  THREEDS_CARDINAL_SDK_BAD_CONFIG: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_CARDINAL_SDK_BAD_CONFIG',
    message: 'JWT or other required field missing. Please check your setup configuration.'
  },
  THREEDS_CARDINAL_SDK_BAD_JWT: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_CARDINAL_SDK_BAD_JWT',
    message: 'Cardinal JWT missing or malformed. Please check your setup configuration.'
  },
  THREEDS_CARDINAL_SDK_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_ERROR',
    message: 'A general error has occurred with Cardinal. See description for more information.'
  },
  THREEDS_CARDINAL_SDK_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'THREEDS_CARDINAL_SDK_CANCELED',
    message: 'Canceled by user.'
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
  THREEDS_JWT_AUTHENTICATION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_JWT_AUTHENTICATION_FAILED',
    message: 'Something went wrong authenticating the JWT from Cardinal'
  },
  THREEDS_NO_VERIFICATION_PAYLOAD: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NO_VERIFICATION_PAYLOAD',
    message: 'No verification payload available.'
  },
  THREEDS_METHOD_DEPRECATED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_METHOD_DEPRECATED'
  },
  THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
    type: BraintreeError.types.INTERNAL,
    code: 'THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN',
    message: 'Term Url must be on a Braintree domain.'
  }
};

},{"../../lib/braintree-error":18}],43:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');

module.exports = enumerate([
  'AUTHENTICATION_COMPLETE'
], 'threedsecure:');

},{"../../lib/enumerate":29}]},{},[40])(40)
});
