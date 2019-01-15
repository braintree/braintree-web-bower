(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).visaCheckout = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

var PromisePolyfill = _dereq_('promise-polyfill');

module.exports = global.Promise || PromisePolyfill;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":7}],2:[function(_dereq_,module,exports){
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

},{}],4:[function(_dereq_,module,exports){
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

},{}],5:[function(_dereq_,module,exports){
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

},{}],6:[function(_dereq_,module,exports){
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

},{"./lib/deferred":3,"./lib/once":4,"./lib/promise-or-callback":5}],7:[function(_dereq_,module,exports){
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

},{}],8:[function(_dereq_,module,exports){
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

},{"./constants":13,"./create-authorization-data":16,"./json-clone":20}],9:[function(_dereq_,module,exports){
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

},{"./add-metadata":8,"./constants":13,"./promise":22}],10:[function(_dereq_,module,exports){
'use strict';

var loadScript = _dereq_('@braintree/asset-loader/load-script');

module.exports = {
  loadScript: loadScript
};

},{"@braintree/asset-loader/load-script":2}],11:[function(_dereq_,module,exports){
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

},{"./braintree-error":12,"./errors":19,"./promise":22}],12:[function(_dereq_,module,exports){
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

},{"./enumerate":18}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
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

},{"./braintree-error":12,"./errors":19}],15:[function(_dereq_,module,exports){
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

},{"./constants":13}],16:[function(_dereq_,module,exports){
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

},{"../lib/constants":13,"../lib/vendor/polyfill":23}],17:[function(_dereq_,module,exports){
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
},{"./assets":10,"./braintree-error":12,"./errors":19,"./promise":22}],18:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],19:[function(_dereq_,module,exports){
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

},{"./braintree-error":12}],20:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],21:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],22:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":7}],23:[function(_dereq_,module,exports){
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
},{}],24:[function(_dereq_,module,exports){
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

},{"../lib/braintree-error":12}],25:[function(_dereq_,module,exports){
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

},{"../lib/analytics":9,"../lib/basic-component-verification":11,"../lib/braintree-error":12,"../lib/create-assets-url":15,"../lib/create-deferred-client":17,"../lib/promise":22,"./errors":24,"./visa-checkout":26,"@braintree/wrap-promise":6}],26:[function(_dereq_,module,exports){
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

},{"../lib/analytics":9,"../lib/braintree-error":12,"../lib/convert-methods-to-error":14,"../lib/json-clone":20,"../lib/methods":21,"../lib/promise":22,"./errors":24,"@braintree/wrap-promise":6}]},{},[25])(25)
});
