(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.braintree || (g.braintree = {})).usBankAccount = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./lib/error');

module.exports = {
  CALLBACK_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CALLBACK_REQUIRED'
  },
  INSTANTIATION_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'INSTANTIATION_OPTION_REQUIRED'
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

},{"./lib/error":5}],2:[function(_dereq_,module,exports){
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

},{}],3:[function(_dereq_,module,exports){
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

},{}],4:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;
    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],5:[function(_dereq_,module,exports){
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

module.exports = BraintreeError;

},{"./enumerate":4}],6:[function(_dereq_,module,exports){
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

},{}],7:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./error');
var sharedErrors = _dereq_('../errors');

module.exports = function (callback, functionName) {
  if (typeof callback !== 'function') {
    throw new BraintreeError({
      type: sharedErrors.CALLBACK_REQUIRED.type,
      code: sharedErrors.CALLBACK_REQUIRED.code,
      message: functionName + ' must include a callback function.'
    });
  }
};

},{"../errors":1,"./error":5}],8:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  REQUIRED_BANK_DETAILS: ['routingNumber', 'accountNumber', 'accountType', 'accountHolderName', 'billingAddress'],
  PLAID_LINK_JS: 'https://cdn.plaid.com/link/stable/link-initialize.js'
};

},{}],9:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/error');

module.exports = {
  US_BANK_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'US_BANK_OPTION_REQUIRED'
  },
  US_BANK_MUTUALLY_EXCLUSIVE_OPTIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'US_BANK_MUTUALLY_EXCLUSIVE_OPTIONS'
  },
  US_BANK_LOGIN_LOAD_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'US_BANK_LOGIN_LOAD_FAILED',
    message: 'Bank login flow failed to load.'
  }
};

},{"../lib/error":5}],10:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/us-bank-account
 * @description This module is for accepting payments of US bank accounts.
 */

var BraintreeError = _dereq_('../lib/error');
var USBankAccount = _dereq_('./us-bank-account');
var deferred = _dereq_('../lib/deferred');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var VERSION = "3.5.0";
var sharedErrors = _dereq_('../errors');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} callback The second argument, `data`, is the {@link USBankAccount} instance.
 * @returns {void}
 */
function create(options, callback) {
  var clientVersion, braintreeApi;

  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  if (options.client == null) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating US Bank Account.'
    }));
    return;
  }

  clientVersion = options.client.getConfiguration().analyticsMetadata.sdkVersion;
  if (clientVersion !== VERSION) {
    callback(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and US Bank Account (version ' + VERSION + ') components must be from the same SDK version.'
    }));
    return;
  }

  braintreeApi = options.client.getConfiguration().gatewayConfiguration.braintreeApi;
  if (!braintreeApi) {
    callback(new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED));
    return;
  }

  callback(null, new USBankAccount(options));
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../errors":1,"../lib/deferred":3,"../lib/error":5,"../lib/throw-if-no-callback":7,"./us-bank-account":11}],11:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('../lib/error');
var constants = _dereq_('./constants');
var errors = _dereq_('./errors');
var deferred = _dereq_('../lib/deferred');
var once = _dereq_('../lib/once');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var camelCaseToSnakeCase = _dereq_('../lib/camel-case-to-snake-case');

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/us-bank-account.create|braintree.us-bank-account.create} instead.</strong>
 * @classdesc This class represents a US Bank Account component.
 */
function USBankAccount(options) {
  this._client = options.client;
}

USBankAccount.prototype.tokenize = function (options, callback) {
  throwIfNoCallback(callback, 'tokenize');

  options = options || {};
  callback = deferred(callback);

  if (!options.mandateText) {
    callback(new BraintreeError({
      type: errors.US_BANK_OPTION_REQUIRED.type,
      code: errors.US_BANK_OPTION_REQUIRED.code,
      message: 'mandateText property is required.'
    }));
    return;
  }

  if (options.bankDetails && options.bankLogin) {
    callback(new BraintreeError({
      type: errors.US_BANK_MUTUALLY_EXCLUSIVE_OPTIONS.type,
      code: errors.US_BANK_MUTUALLY_EXCLUSIVE_OPTIONS.code,
      message: 'tokenize must be called with bankDetails or bankLogin, not both.'
    }));
  } else if (options.bankDetails) {
    this._tokenizeBankDetails(options, callback);
  } else if (options.bankLogin) {
    this._tokenizeBankLogin(options, callback);
  } else {
    callback(new BraintreeError({
      type: errors.US_BANK_OPTION_REQUIRED.type,
      code: errors.US_BANK_OPTION_REQUIRED.code,
      message: 'tokenize must be called with bankDetails or bankLogin.'
    }));
  }
};

USBankAccount.prototype._tokenizeBankDetails = function (options, callback) {
  var i, key;
  var bankDetails = options.bankDetails;
  var apiConfig = this._client.getConfiguration().gatewayConfiguration.braintreeApi;

  for (i = 0; i < constants.REQUIRED_BANK_DETAILS.length; i++) {
    key = constants.REQUIRED_BANK_DETAILS[i];
    if (!bankDetails[key]) {
      callback(new BraintreeError({
        type: errors.US_BANK_OPTION_REQUIRED.type,
        code: errors.US_BANK_OPTION_REQUIRED.code,
        message: 'bankDetails.' + key + ' property is required.'
      }));
      return;
    }
  }

  this._client._request({
    method: 'POST',
    url: apiConfig.url + '/tokens',
    headers: {
      Authorization: 'Bearer ' + apiConfig.accessToken,
      'Braintree-Version': '2016-08-25'
    },
    data: {
      type: 'us_bank_account',
      /* eslint-disable camelcase */
      routing_number: bankDetails.routingNumber,
      account_number: bankDetails.accountNumber,
      account_holder_name: bankDetails.accountHolderName,
      account_type: bankDetails.accountType,
      billing_address: camelCaseToSnakeCase(bankDetails.billingAddress),
      ach_mandate: {
        text: options.mandateText
      }
      /* eslint-enable camelcase */
    }
  }, function (err, response) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, formatTokenizeResponse(response));
  });
};

USBankAccount.prototype._tokenizeBankLogin = function (options, callback) {
  var client = this._client;
  var apiConfig = this._client.getConfiguration().gatewayConfiguration.braintreeApi;

  if (!options.bankLogin.displayName) {
    callback(new BraintreeError({
      type: errors.US_BANK_OPTION_REQUIRED.type,
      code: errors.US_BANK_OPTION_REQUIRED.code,
      message: 'displayName property is required when using bankLogin.'
    }));
    return;
  }

  this._loadPlaid(function (plaidLoadErr, plaid) {
    if (plaidLoadErr) {
      callback(plaidLoadErr);
      return;
    }

    plaid.create({
      env: 'tartan',
      clientName: options.bankLogin.displayName,
      key: 'test_key',
      product: 'auth',
      selectAccount: true,
      onExit: function () {
        callback(new Error('Customer closed bank login flow.'));
      },
      onSuccess: function (publicToken, metadata) {
        client._request({
          method: 'POST',
          url: apiConfig.url + '/tokens',
          headers: {
            Authorization: 'Bearer ' + apiConfig.accessToken,
            'Braintree-Version': '2016-08-25'
          },
          data: {
            type: 'plaid_public_token',
            /* eslint-disable camelcase */
            public_token: publicToken,
            account_id: metadata.account_id,
            ach_mandate: {
              text: options.mandateText
            }
            /* eslint-enable camelcase */
          }
        }, function (tokenizeErr, response) {
          if (tokenizeErr) {
            callback(tokenizeErr);
            return;
          }

          callback(null, formatTokenizeResponse(response));
        });
      }
    }).open();
  });
};

function formatTokenizeResponse(response) {
  return {
    nonce: response.data.id,
    details: {},
    description: response.data.description,
    type: response.data.type
  };
}

USBankAccount.prototype._loadPlaid = function (callback) {
  var script;

  callback = once(callback);

  if (global.Plaid) {
    callback(null, global.Plaid);
    return;
  }

  script = document.createElement('script');

  script.src = constants.PLAID_LINK_JS;
  script.async = true;
  script.onerror = function () {
    removeLoadListeners(script);
    callback(new BraintreeError(errors.US_BANK_LOGIN_LOAD_FAILED));
  };

  script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      removeLoadListeners(script);
      callback(null, global.Plaid);
    }
  };

  document.body.appendChild(script);

  this._plaidScript = script;
};

function removeLoadListeners(script) {
  script.onerror = script.onload = script.onreadystatechange = null;
}

USBankAccount.prototype.teardown = function () {
  if (this._plaidScript) {
    document.body.removeChild(this._plaidScript);
  }
};

module.exports = USBankAccount;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/camel-case-to-snake-case":2,"../lib/deferred":3,"../lib/error":5,"../lib/once":6,"../lib/throw-if-no-callback":7,"./constants":8,"./errors":9}]},{},[10])(10)
});