(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).googlePayment = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
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

},{"../lib/braintree-error":16}],9:[function(_dereq_,module,exports){
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
  if (paymentDataRequest.allowedPaymentMethods) {
    paymentDataRequest.allowedPaymentMethods.forEach(function (paymentMethod) {
      var defaultPaymentMethod = find(defaultConfig.allowedPaymentMethods, 'type', paymentMethod.type);

      if (defaultPaymentMethod) {
        applyDefaultsToPaymentMethodConfiguration(paymentMethod, defaultPaymentMethod);
      }
    });
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

function applyDefaultsToPaymentMethodConfiguration(merchantSubmittedPaymentMethod, defaultPaymentMethod) {
  Object.keys(defaultPaymentMethod).forEach(function (parameter) {
    if (typeof defaultPaymentMethod[parameter] === 'object') {
      merchantSubmittedPaymentMethod[parameter] = assign(
        {},
        defaultPaymentMethod[parameter],
        merchantSubmittedPaymentMethod[parameter]
      );
    } else {
      merchantSubmittedPaymentMethod[parameter] = merchantSubmittedPaymentMethod[parameter] || defaultPaymentMethod[parameter];
    }
  });
}

module.exports = wrapPromise.wrapPrototype(GooglePayment);

},{"../lib/analytics":12,"../lib/assign":14,"../lib/braintree-error":16,"../lib/convert-methods-to-error":18,"../lib/find":24,"../lib/generate-google-pay-configuration":25,"../lib/methods":27,"../lib/promise":28,"./errors":8,"@braintree/wrap-promise":6}],10:[function(_dereq_,module,exports){
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
var VERSION = "3.44.2";

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
 *     // see https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest for all options
 *     apiVersion: 2,
 *     apiVersionMinor: 0,
 *     allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
 *     existingPaymentMethodRequired: true
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

},{"../lib/basic-component-verification":15,"../lib/braintree-error":16,"../lib/create-assets-url":19,"../lib/create-deferred-client":21,"../lib/promise":28,"./errors":8,"./google-payment":9,"@braintree/wrap-promise":6}],11:[function(_dereq_,module,exports){
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

},{"./constants":17,"./create-authorization-data":20,"./json-clone":26}],12:[function(_dereq_,module,exports){
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

},{"./add-metadata":11,"./constants":17,"./promise":28}],13:[function(_dereq_,module,exports){
'use strict';

var loadScript = _dereq_('@braintree/asset-loader/load-script');

module.exports = {
  loadScript: loadScript
};

},{"@braintree/asset-loader/load-script":2}],14:[function(_dereq_,module,exports){
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

},{}],15:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var sharedErrors = _dereq_('./errors');
var VERSION = "3.44.2";

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

},{"./braintree-error":16,"./errors":23,"./promise":28}],16:[function(_dereq_,module,exports){
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

},{"./enumerate":22}],17:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.44.2";
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

},{}],18:[function(_dereq_,module,exports){
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

},{"./braintree-error":16,"./errors":23}],19:[function(_dereq_,module,exports){
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

},{"./constants":17}],20:[function(_dereq_,module,exports){
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

},{"../lib/constants":17,"../lib/vendor/polyfill":29}],21:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('./braintree-error');
var Promise = _dereq_('./promise');
var assets = _dereq_('./assets');
var sharedErrors = _dereq_('./errors');

var VERSION = "3.44.2";

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
},{"./assets":13,"./braintree-error":16,"./errors":23,"./promise":28}],22:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],23:[function(_dereq_,module,exports){
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

},{"./braintree-error":16}],24:[function(_dereq_,module,exports){
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

},{}],25:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.44.2";
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

},{"./assign":14}],26:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],27:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],28:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Promise = global.Promise || _dereq_('promise-polyfill');

module.exports = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":7}],29:[function(_dereq_,module,exports){
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
},{}]},{},[10])(10)
});
