(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).usBankAccount = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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

},{"./constants":14,"./create-authorization-data":17,"./json-clone":21}],9:[function(_dereq_,module,exports){
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

},{"./add-metadata":8,"./constants":14,"./promise":24}],10:[function(_dereq_,module,exports){
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

},{"./braintree-error":12,"./errors":20,"./promise":24}],12:[function(_dereq_,module,exports){
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

},{"./enumerate":19}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
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

},{}],15:[function(_dereq_,module,exports){
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

},{"./braintree-error":12,"./errors":20}],16:[function(_dereq_,module,exports){
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

},{"./constants":14}],17:[function(_dereq_,module,exports){
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

},{"../lib/constants":14,"../lib/vendor/polyfill":25}],18:[function(_dereq_,module,exports){
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
},{"./assets":10,"./braintree-error":12,"./errors":20,"./promise":24}],19:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],20:[function(_dereq_,module,exports){
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

},{"./braintree-error":12}],21:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],22:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],23:[function(_dereq_,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],24:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":7}],25:[function(_dereq_,module,exports){
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
},{}],26:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  PLAID_LINK_JS: 'https://cdn.plaid.com/link/v2/stable/link-initialize.js'
};

},{}],27:[function(_dereq_,module,exports){
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

},{"../lib/braintree-error":12}],28:[function(_dereq_,module,exports){
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

},{"../lib/basic-component-verification":11,"../lib/braintree-error":12,"../lib/create-assets-url":16,"../lib/create-deferred-client":18,"../lib/errors":20,"../lib/promise":24,"./errors":27,"./us-bank-account":29,"@braintree/wrap-promise":6}],29:[function(_dereq_,module,exports){
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
},{"../lib/analytics":9,"../lib/braintree-error":12,"../lib/camel-case-to-snake-case":13,"../lib/convert-methods-to-error":15,"../lib/errors":20,"../lib/methods":22,"../lib/once":23,"../lib/promise":24,"./constants":26,"./errors":27,"@braintree/wrap-promise":6}]},{},[28])(28)
});
