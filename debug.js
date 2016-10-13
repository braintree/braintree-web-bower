(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.braintree = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var types = {};
var VISA = 'visa';
var MASTERCARD = 'master-card';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var testOrder = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO
];

function clone(x) {
  var prefixPattern, exactPattern, dupe;

  if (!x) { return null; }

  prefixPattern = x.prefixPattern.source;
  exactPattern = x.exactPattern.source;
  dupe = JSON.parse(JSON.stringify(x));
  dupe.prefixPattern = prefixPattern;
  dupe.exactPattern = exactPattern;

  return dupe;
}

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  prefixPattern: /^4$/,
  exactPattern: /^4\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'MasterCard',
  type: MASTERCARD,
  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27[0-1]|2720)$/,
  exactPattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
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
  prefixPattern: /^(3|34|37)$/,
  exactPattern: /^3[47]\d*$/,
  isAmex: true,
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
  prefixPattern: /^(3|3[0689]|30[0-5])$/,
  exactPattern: /^3(0[0-5]|[689])\d*$/,
  gaps: [4, 10],
  lengths: [14],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
  exactPattern: /^(6011|65|64[4-9])\d*$/,
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
  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
  exactPattern: /^(2131|1800|35)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
  prefixPattern: /^(6|62)$/,
  exactPattern: /^62\d*$/,
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
  prefixPattern: /^(5|5[06-9]|6\d*)$/,
  exactPattern: /^5[06-9]\d*$/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

function creditCardType(cardNumber) {
  var type, value, i;
  var prefixResults = [];
  var exactResults = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = types[type];

    if (cardNumber.length === 0) {
      prefixResults.push(clone(value));
      continue;
    }

    if (value.exactPattern.test(cardNumber)) {
      exactResults.push(clone(value));
    } else if (value.prefixPattern.test(cardNumber)) {
      prefixResults.push(clone(value));
    }
  }

  return exactResults.length ? exactResults : prefixResults;
}

creditCardType.getTypeInfo = function (type) {
  return clone(types[type]);
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO
};

module.exports = creditCardType;

},{}],2:[function(_dereq_,module,exports){
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

    _broadcast(win.top, payload, origin);

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
},{}],3:[function(_dereq_,module,exports){
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
module.exports={
  "src": "about:blank",
  "frameBorder": 0,
  "allowtransparency": true,
  "scrolling": "no"
}

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

var BraintreeError = _dereq_('../lib/error');
var deferred = _dereq_('../lib/deferred');
var errors = _dereq_('./errors');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/american-express.create|braintree.american-express.create} instead.</strong>
 * @classdesc This class allows you use a nonce to interact with American Express Checkout. To accept American Express cards, use Hosted Fields.
 */
function AmericanExpress(options) {
  this._client = options.client;
}

/**
 * Gets the rewards balance associated with a Braintree nonce.
 * @public
 * @param {object} options Request options
 * @param {string} options.nonce An existing Braintree nonce.
 * @param {callback} callback The second argument, <code>data</code>, is the returned server data.
 * @returns {void}
 * @example
 * var americanExpress = require('braintree-web/american-express');
 *
 * americanExpress.create({client: clientInstance}, function (createErr, americanExpressInstance) {
 *   var options = {nonce: existingBraintreeNonce};
 *   americanExpressInstance.getRewardsBalance(options, function (getErr, payload) {
 *     if (getErr || payload.error) {
 *       // Handle error
 *       return;
 *     }
 *
 *     console.log('Rewards amount: ' + payload.rewardsAmount);
 *   });
 * });
 */
AmericanExpress.prototype.getRewardsBalance = function (options, callback) {
  throwIfNoCallback(callback, 'getRewardsBalance');

  callback = deferred(callback);

  if (!options.nonce) {
    callback(new BraintreeError({
      type: errors.AMEX_NONCE_REQUIRED.type,
      code: errors.AMEX_NONCE_REQUIRED.code,
      message: 'getRewardsBalance must be called with a nonce.'
    }));
    return;
  }

  this._client.request({
    method: 'get',
    endpoint: 'payment_methods/amex_rewards_balance',
    data: {
      _meta: {source: 'american-express'},
      paymentMethodNonce: options.nonce
    }
  }, function (err, response) {
    if (err) {
      callback(new BraintreeError({
        type: errors.AMEX_NETWORK_ERROR.type,
        code: errors.AMEX_NETWORK_ERROR.code,
        message: 'A network error occurred when getting the American Express rewards balance.',
        details: {
          originalError: err
        }
      }));
    } else {
      callback(null, response);
    }
  });
};

/**
 * Gets the Express Checkout nonce profile given a nonce from American Express.
 * @public
 * @param {object} options Request options
 * @param {string} options.nonce An existing nonce from American Express (note that this is <em>not</em> a nonce from Braintree).
 * @param {callback} callback The second argument, <code>data</code>, is the returned server data.
 * @returns {void}
 * @example
 * var americanExpress = require('braintree-web/american-express');
 *
 * americanExpress.create({client: clientInstance}, function (createErr, americanExpressInstance) {
 *   var options = {nonce: existingAmericanExpressNonce};
 *   americanExpressInstance.getExpressCheckoutProfile(options, function (getErr, payload) {
 *     if (getErr) {
 *       // Handle error
 *       return;
 *     }
 *
 *     console.log('Number of cards: ' + payload.amexExpressCheckoutCards.length);
 *   });
 * });
 */
AmericanExpress.prototype.getExpressCheckoutProfile = function (options, callback) {
  throwIfNoCallback(callback, 'getExpressCheckoutProfile');

  callback = deferred(callback);

  if (!options.nonce) {
    callback(new BraintreeError({
      type: errors.AMEX_NONCE_REQUIRED.type,
      code: errors.AMEX_NONCE_REQUIRED.code,
      message: 'getExpressCheckoutProfile must be called with a nonce.'
    }));
    return;
  }

  this._client.request({
    method: 'get',
    endpoint: 'payment_methods/amex_express_checkout_cards/' + options.nonce,
    data: {
      _meta: {source: 'american-express'},
      paymentMethodNonce: options.nonce
    }
  }, function (err, response) {
    if (err) {
      callback(new BraintreeError({
        type: errors.AMEX_NETWORK_ERROR.type,
        code: errors.AMEX_NETWORK_ERROR.code,
        message: 'A network error occurred when getting the American Express Checkout nonce profile.',
        details: {
          originalError: err
        }
      }));
    } else {
      callback(null, response);
    }
  });
};

module.exports = AmericanExpress;

},{"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./errors":8}],8:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/error');

module.exports = {
  AMEX_NONCE_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'AMEX_NONCE_REQUIRED'
  },
  AMEX_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'AMEX_NETWORK_ERROR'
  }
};

},{"../lib/error":53}],9:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/american-express
 * @description This module is for use with Amex Express Checkout. To accept American Express cards, use Hosted Fields.
 */

var BraintreeError = _dereq_('../lib/error');
var AmericanExpress = _dereq_('./american-express');
var deferred = _dereq_('../lib/deferred');
var sharedErrors = _dereq_('../errors');
var VERSION = "3.5.0";
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} callback The second argument, `data`, is the {@link AmericanExpress} instance.
 * @returns {void}
 */
function create(options, callback) {
  var clientVersion;

  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  if (options.client == null) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating American Express.'
    }));
    return;
  }

  clientVersion = options.client.getConfiguration().analyticsMetadata.sdkVersion;
  if (clientVersion !== VERSION) {
    callback(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and American Express (version ' + VERSION + ') components must be from the same SDK version.'
    }));
    return;
  }

  callback(null, new AmericanExpress(options));
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../errors":29,"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./american-express":7}],10:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('../lib/error');
var analytics = _dereq_('../lib/analytics');
var deferred = _dereq_('../lib/deferred');
var sharedErrors = _dereq_('../errors');
var errors = _dereq_('./errors');

/**
 * An Apple Pay Payment Authorization Event object.
 * @typedef {object} ApplePayPaymentAuthorizedEvent
 * @external ApplePayPaymentAuthorizedEvent
 * @see {@link https://developer.apple.com/reference/applepayjs/applepaypaymentauthorizedevent ApplePayPaymentAuthorizedEvent}
 */

/**
 * An Apple Pay Payment Request object.
 * @typedef {object} ApplePayPaymentRequest
 * @external ApplePayPaymentRequest
 * @see {@link https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest PaymentRequest}
 */

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/apple-pay.create|braintree.applePay.create} instead.</strong>
 * @classdesc This class represents an Apple Pay component. Instances of this class have methods for validating the merchant server and tokenizing payments.
 */
function ApplePay(options) {
  this._client = options.client;
  Object.defineProperty(this, 'merchantIdentifier', {
    value: this._client.getConfiguration().gatewayConfiguration.applePayWeb.merchantIdentifier,
    configurable: false,
    writable: false
  });
}

/**
 * Merges a payment request with Braintree defaults to return an {external:ApplePayPaymentRequest}.
 *
 * The following properties are assigned to `paymentRequest` if not already defined. Their default values come from the Braintree gateway.
 * - `countryCode`
 * - `currencyCode`
 * - `merchantCapabilities`
 * - `supportedNetworks`
 * @public
 * @param {external:ApplePayPaymentRequest} paymentRequest The payment request details to apply on top of those from Braintree.
 * @returns {external:ApplePayPaymentRequest} The decorated `paymentRequest` object.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *
 *   var session = new ApplePaySession(1, paymentRequest);
 *
 *   // ...
 */
ApplePay.prototype.createPaymentRequest = function (paymentRequest) {
  var applePay = this._client.getConfiguration().gatewayConfiguration.applePayWeb;
  var defaults = {
    countryCode: applePay.countryCode,
    currencyCode: applePay.currencyCode,
    merchantCapabilities: applePay.merchantCapabilities || ['supports3DS'],
    supportedNetworks: applePay.supportedNetworks.map(function (network) {
      return network === 'mastercard' ? 'masterCard' : network;
    })
  };

  return Object.assign({}, defaults, paymentRequest);
};

/**
 * Validates your merchant website, as required by `ApplePaySession` before payment can be authorized.
 * @public
 * @param {object} options Options
 * @param {string} options.validationURL The validationURL fram an `ApplePayValidateMerchantEvent`.
 * @param {string} options.displayName The canonical name for your store. Use a non-localized name. This parameter should be a UTF-8 string that is a maximum of 128 characters. The system may display this name to the user.
 * @param {callback} callback The second argument, <code>data</code>, is the Apple Pay merchant session object.
 * Pass the merchant session to your Apple Pay session's `completeMerchantValidation` method.
 * @returns {void}
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(1, paymentRequest);
 *
 *   session.onvalidatemerchant = function (event) {
 *     applePayInstance.performValidation({
 *       validationURL: event.validationURL,
 *       displayName: 'My Great Store'
 *     }, function (validationErr, validationData) {
 *       if (validationErr) {
 *         console.error(validationErr);
 *         session.abort();
 *         return;
 *       }
 *
 *       session.completeMerchantValidation(validationData);
 *     });
 *   };
 * });
 */
ApplePay.prototype.performValidation = function (options, callback) {
  var applePayWebSession;

  if (typeof callback !== 'function') {
    throw new BraintreeError({
      type: sharedErrors.CALLBACK_REQUIRED.type,
      code: sharedErrors.CALLBACK_REQUIRED.code,
      message: 'performValidation requires a callback.'
    });
  }

  callback = deferred(callback);

  if (!options || !options.validationURL) {
    callback(new BraintreeError(errors.APPLE_PAY_VALIDATION_URL_REQUIRED));
    return;
  }

  applePayWebSession = {
    validationUrl: options.validationURL,
    domainName: options.domainName || global.location.hostname,
    merchantIdentifier: options.merchantIdentifier || this.merchantIdentifier
  };

  if (options.displayName != null) {
    applePayWebSession.displayName = options.displayName;
  }

  this._client.request({
    method: 'post',
    endpoint: 'apple_pay_web/sessions',
    data: {
      _meta: {source: 'apple-pay'},
      applePayWebSession: applePayWebSession
    }
  }, function (err, response) {
    if (err) {
      if (err.code === 'CLIENT_REQUEST_ERROR') {
        callback(new BraintreeError({
          type: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,
          code: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,
          message: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,
          details: {
            originalError: err.details.originalError
          }
        }));
      } else {
        callback(new BraintreeError({
          type: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,
          code: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,
          message: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,
          details: {
            originalError: err
          }
        }));
      }
      analytics.sendEvent(this._client, 'web.applepay.performValidation.failed');
    } else {
      callback(null, response);
      analytics.sendEvent(this._client, 'web.applepay.performValidation.succeeded');
    }
  }.bind(this));
};

/**
 * Tokenizes an Apple Pay payment. This will likely be called in your `ApplePaySession`'s `onpaymentauthorized` callback.
 * @public
 * @param {object} options Options
 * @param {object} options.token The `payment.token` property of an {@link external:ApplePayPaymentAuthorizedEvent}.
 * @param {callback} callback The second argument, <code>data</code>, is the tokenized payload.
 * @returns {void}
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(1, paymentRequest);
 *
 *   session.onpaymentauthorized = function (event) {
 *     applePayInstance.tokenize({
 *       token: event.payment.token
 *     }, function (tokenizeErr, tokenizedPayload) {
 *       if (tokenizeErr) {
 *         session.completePayment(ApplePaySession.STATUS_FAILURE);
 *         return;
 *       }
 *       session.completePayment(ApplePaySession.STATUS_SUCCESS);
 *
 *       // Send the tokenizedPayload to your server here!
 *     });
 *   };
 *
 *   // ...
 * });
 */
ApplePay.prototype.tokenize = function (options, callback) {
  if (typeof callback !== 'function') {
    throw new BraintreeError({
      type: sharedErrors.CALLBACK_REQUIRED.type,
      code: sharedErrors.CALLBACK_REQUIRED.code,
      message: 'tokenize requires a callback.'
    });
  }

  callback = deferred(callback);

  if (!options.token) {
    callback(new BraintreeError(errors.APPLE_PAY_PAYMENT_TOKEN_REQUIRED));
    return;
  }

  this._client.request({
    method: 'post',
    endpoint: 'payment_methods/apple_payment_tokens',
    data: {
      _meta: {
        source: 'apple-pay'
      },
      applePaymentToken: Object.assign({}, options.token, {
        // The gateway requires this key to be base64-encoded.
        paymentData: btoa(JSON.stringify(options.token.paymentData))
      })
    }
  }, function (err, response) {
    if (err) {
      callback(new BraintreeError({
        type: errors.APPLE_PAY_TOKENIZATION.type,
        code: errors.APPLE_PAY_TOKENIZATION.code,
        message: errors.APPLE_PAY_TOKENIZATION.message,
        details: {
          originalError: err
        }
      }));
      analytics.sendEvent(this._client, 'web.applepay.tokenize.failed');
    } else {
      callback(null, response.applePayCards[0]);
      analytics.sendEvent(this._client, 'web.applepay.tokenize.succeeded');
    }
  }.bind(this));
};

module.exports = ApplePay;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":29,"../lib/analytics":39,"../lib/deferred":50,"../lib/error":53,"./errors":11}],11:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/error');

module.exports = {
  APPLE_PAY_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_NOT_ENABLED',
    message: 'Apple Pay is not enabled for this merchant.'
  },
  APPLE_PAY_VALIDATION_URL_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_VALIDATION_URL_REQUIRED',
    message: 'performValidation must be called with a validationURL.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_NETWORK',
    message: 'A network error occurred when validating the Apple Pay merchant.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_FAILED',
    message: 'Make sure you have registered your domain name in the Braintree Control Panel.'
  },
  APPLE_PAY_PAYMENT_TOKEN_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_PAYMENT_TOKEN_REQUIRED',
    message: 'tokenize must be called with a payment token.'
  },
  APPLE_PAY_TOKENIZATION: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_TOKENIZATION',
    message: 'A network error occurred when processing the Apple Pay payment.'
  }
};

},{"../lib/error":53}],12:[function(_dereq_,module,exports){
'use strict';

/**
 * @module braintree-web/apple-pay
 * @description Accept Apple Pay on the Web. *This component is currently in beta and is subject to change.*
 */

var BraintreeError = _dereq_('../lib/error');
var ApplePay = _dereq_('./apple-pay');
var analytics = _dereq_('../lib/analytics');
var deferred = _dereq_('../lib/deferred');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var sharedErrors = _dereq_('../errors');
var errors = _dereq_('./errors');
var VERSION = "3.5.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} callback The second argument, `data`, is the {@link ApplePay} instance.
 * @returns {void}
 */
function create(options, callback) {
  var clientVersion;

  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  if (options.client == null) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating Apple Pay.'
    }));
    return;
  }

  clientVersion = options.client.getConfiguration().analyticsMetadata.sdkVersion;
  if (clientVersion !== VERSION) {
    callback(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and Apple Pay (version ' + VERSION + ') components must be from the same SDK version.'
    }));
    return;
  }

  if (!options.client.getConfiguration().gatewayConfiguration.applePayWeb) {
    callback(new BraintreeError(errors.APPLE_PAY_NOT_ENABLED));
    return;
  }

  analytics.sendEvent(options.client, 'web.applepay.initialized');

  callback(null, new ApplePay(options));
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../errors":29,"../lib/analytics":39,"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./apple-pay":10,"./errors":11}],13:[function(_dereq_,module,exports){
'use strict';

var request = _dereq_('./request');
var isWhitelistedDomain = _dereq_('../lib/is-whitelisted-domain');
var BraintreeError = _dereq_('../lib/error');
var addMetadata = _dereq_('../lib/add-metadata');
var deferred = _dereq_('../lib/deferred');
var errors = _dereq_('./errors');

/**
 * This object is returned by {@link Client#getConfiguration|getConfiguration}. This information is used extensively by other Braintree modules to properly configure themselves.
 * @typedef {object} Client~configuration
 * @property {object} client The braintree-web/client parameters.
 * @property {string} client.authorization A tokenizationKey or clientToken.
 * @property {object} gatewayConfiguration Gateway-supplied configuration.
 * @property {object} analyticsMetadata Analytics-specific data.
 * @property {string} analyticsMetadata.sessionId Uniquely identifies a browsing session.
 * @property {string} analyticsMetadata.sdkVersion The braintree.js version.
 * @property {string} analyticsMetadata.merchantAppId Identifies the merchant's web app.
 */

/**
 * @class
 * @param {Client~configuration} configuration Options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/client.create|braintree.client.create} instead.</strong>
 * @classdesc This class is required by many other Braintree components. It serves as the base API layer that communicates with our servers. It is also capable of being used to formulate direct calls to our servers, such as direct credit card tokenization. See {@link Client#request}.
 */
function Client(configuration) {
  var configurationJSON, gatewayConfiguration;

  configuration = configuration || {};

  configurationJSON = JSON.stringify(configuration);
  gatewayConfiguration = configuration.gatewayConfiguration;

  if (!gatewayConfiguration) {
    throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
  }

  [
    'assetsUrl',
    'clientApiUrl',
    'configUrl'
  ].forEach(function (property) {
    if (property in gatewayConfiguration && !isWhitelistedDomain(gatewayConfiguration[property])) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: property + ' property is on an invalid domain.'
      });
    }
  });

  /**
   * Returns a copy of the configuration values.
   * @public
   * @returns {Client~configuration} configuration
   */
  this.getConfiguration = function () {
    return JSON.parse(configurationJSON);
  };

  this._request = request;
  this._baseUrl = configuration.gatewayConfiguration.clientApiUrl + '/v1/';
  this._configuration = this.getConfiguration();

  this.toJSON = this.getConfiguration;
}

/**
 * Used by other modules to formulate all network requests to the Braintree gateway. It is also capable of being used directly from your own form to tokenize credit card information. However, be sure to satisfy PCI compliance if you use direct card tokenization.
 * @public
 * @param {object} options Request options:
 * @param {string} options.method HTTP method. i.e. "get" or "post"
 * @param {string} options.endpoint Enpoint path. i.e. "payment_methods"
 * @param {object} options.data Data to send with the request
 * @param {string} [options.timeout=60000] Timeout limit
 * @param {callback} callback The second argument, <code>data</code>, is the returned server data.
 * @example
 * <caption>Direct Credit Card Tokenization</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-date'].value,
 *       billingAddress: {
 *         postalCode: form['cc-postal'].value
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @returns {void}
 */
Client.prototype.request = function (options, callback) {
  var optionName;

  if (!options.method) {
    optionName = 'options.method';
  } else if (!options.endpoint) {
    optionName = 'options.endpoint';
  }

  if (optionName) {
    callback = deferred(callback);
    callback(new BraintreeError({
      type: errors.CLIENT_OPTION_REQUIRED.type,
      code: errors.CLIENT_OPTION_REQUIRED.code,
      message: optionName + ' is required when making a request.'
    }));
    return;
  }

  this._request({
    url: this._baseUrl + options.endpoint,
    method: options.method,
    data: addMetadata(this._configuration, options.data),
    // TODO: change this to options.headers and document it
    // when features that require headers are out of beta
    headers: options._headers,
    timeout: options.timeout
  }, this._bindRequestCallback(callback));
};

Client.prototype._bindRequestCallback = function (callback) {
  return function (err, data, status) {
    if (status === -1) {
      callback(new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT), null, status);
    } else if (status === 403) {
      callback(new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT), null, status);
    } else if (status === 429) {
      callback(new BraintreeError(errors.CLIENT_RATE_LIMITED), null, status);
    } else if (status >= 500) {
      callback(new BraintreeError(errors.CLIENT_GATEWAY_NETWORK), null, status);
    } else if (status < 200 || status >= 400) {
      callback(new BraintreeError({
        type: errors.CLIENT_REQUEST_ERROR.type,
        code: errors.CLIENT_REQUEST_ERROR.code,
        message: errors.CLIENT_REQUEST_ERROR.message,
        details: {originalError: err}
      }), null, status);
    } else {
      callback(null, data, status);
    }
  };
};

module.exports = Client;

},{"../lib/add-metadata":38,"../lib/deferred":50,"../lib/error":53,"../lib/is-whitelisted-domain":65,"./errors":14,"./request":19}],14:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/error');

module.exports = {
  CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN'
  },
  CLIENT_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_REQUIRED'
  },
  CLIENT_MISSING_GATEWAY_CONFIGURATION: {
    type: BraintreeError.types.INTERNAL,
    code: 'CLIENT_MISSING_GATEWAY_CONFIGURATION',
    message: 'Missing gatewayConfiguration.'
  },
  CLIENT_INVALID_AUTHORIZATION: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_INVALID_AUTHORIZATION',
    message: 'Authorization is invalid. Make sure your client token or tokenization key is valid.'
  },
  CLIENT_GATEWAY_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_GATEWAY_NETWORK',
    message: 'Cannot contact the gateway at this time.'
  },
  CLIENT_REQUEST_TIMEOUT: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_TIMEOUT',
    message: 'Request timed out waiting for a reply.'
  },
  CLIENT_REQUEST_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_ERROR',
    message: 'There was a problem with your request.'
  },
  CLIENT_RATE_LIMITED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_RATE_LIMITED',
    message: 'You are being rate-limited; please try again in a few minutes.'
  },
  CLIENT_AUTHORIZATION_INSUFFICIENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_AUTHORIZATION_INSUFFICIENT',
    message: 'The authorization used has insufficient privileges.'
  }
};

},{"../lib/error":53}],15:[function(_dereq_,module,exports){
(function (global){
'use strict';

var BraintreeError = _dereq_('../lib/error');
var request = _dereq_('./request');
var uuid = _dereq_('../lib/uuid');
var constants = _dereq_('../lib/constants');
var createAuthorizationData = _dereq_('../lib/create-authorization-data');
var errors = _dereq_('./errors');

function getConfiguration(options, callback) {
  var configuration, authData, attrs, configUrl;
  var sessionId = uuid();
  var analyticsMetadata = {
    merchantAppId: global.location.host,
    platform: constants.PLATFORM,
    sdkVersion: constants.VERSION,
    source: constants.SOURCE,
    integration: constants.INTEGRATION,
    integrationType: constants.INTEGRATION,
    sessionId: sessionId
  };

  try {
    authData = createAuthorizationData(options.authorization);
  } catch (err) {
    callback(new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION));
    return;
  }
  attrs = authData.attrs;
  configUrl = authData.configUrl;

  attrs._meta = analyticsMetadata;
  attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
  attrs.configVersion = '3';

  request({
    url: configUrl,
    method: 'GET',
    data: attrs
  }, function (err, response, status) {
    var errorTemplate;

    if (err) {
      if (status === 403) {
        errorTemplate = errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
      } else {
        errorTemplate = errors.CLIENT_GATEWAY_NETWORK;
      }

      callback(new BraintreeError({
        type: errorTemplate.type,
        code: errorTemplate.code,
        message: errorTemplate.message,
        details: {
          originalError: err
        }
      }));
      return;
    }

    configuration = {
      authorization: options.authorization,
      authorizationType: attrs.tokenizationKey ? 'TOKENIZATION_KEY' : 'CLIENT_TOKEN',
      analyticsMetadata: analyticsMetadata,
      gatewayConfiguration: response
    };

    callback(null, configuration);
  });
}

module.exports = {
  getConfiguration: getConfiguration
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/constants":47,"../lib/create-authorization-data":49,"../lib/error":53,"../lib/uuid":72,"./errors":14,"./request":19}],16:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/error');
var Client = _dereq_('./client');
var getConfiguration = _dereq_('./get-configuration').getConfiguration;
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var packageVersion = "3.5.0";
var deferred = _dereq_('../lib/deferred');
var sharedErrors = _dereq_('../errors');

/** @module braintree-web/client */

/**
 * @function
 * @description This function is the entry point for the <code>braintree.client</code> module. It is used for creating {@link Client} instances that service communication to Braintree servers.
 * @param {object} options Object containing all {@link Client} options:
 * @param {string} options.authorization A tokenizationKey or clientToken.
 * @param {callback} callback The second argument, <code>data</code>, is the {@link Client} instance.
 * @returns {void}
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   ...
 * });
 * @static
 */
function create(options, callback) {
  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  if (!options.authorization) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.authorization is required when instantiating a client.'
    }));
    return;
  }

  getConfiguration(options, function (err, configuration) {
    var client;

    if (err) {
      callback(err);
      return;
    }

    try {
      client = new Client(configuration);
    } catch (clientCreationError) {
      callback(clientCreationError);
      return;
    }

    callback(null, client);
  });
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: packageVersion
};

},{"../errors":29,"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./client":13,"./get-configuration":15}],17:[function(_dereq_,module,exports){
(function (global){
'use strict';

var querystring = _dereq_('../../lib/querystring');
var prepBody = _dereq_('./prep-body');
var parseBody = _dereq_('./parse-body');
var isXHRAvailable = global.XMLHttpRequest && 'withCredentials' in new global.XMLHttpRequest();

function getRequestObject() {
  return isXHRAvailable ? new XMLHttpRequest() : new XDomainRequest();
}

function request(options, cb) {
  var status, resBody;
  var method = options.method;
  var url = options.url;
  var body = options.data;
  var timeout = options.timeout;
  var headers = options.headers || {};
  var req = getRequestObject();
  var callback = cb;

  if (method === 'GET') {
    url = querystring.queryify(url, body);
    body = null;
  }

  if (isXHRAvailable) {
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return; }

      status = req.status;
      resBody = parseBody(req.responseText);

      if (status >= 400 || status < 200) {
        callback(resBody || 'error', null, status || 500);
      } else {
        callback(null, resBody, status);
      }
    };
  } else {
    req.onload = function () {
      callback(null, parseBody(req.responseText), req.status);
    };

    req.onerror = function () {
      // XDomainRequest does not report a body or status for errors, so
      // hardcode to 'error' and 500, respectively
      callback('error', null, 500);
    };

    // This must remain for IE9 to work
    req.onprogress = function () {};

    req.ontimeout = function () {
      callback('timeout', null, -1);
    };
  }

  req.open(method, url, true);
  req.timeout = timeout;

  if (isXHRAvailable && method === 'POST') {
    req.setRequestHeader('Content-Type', 'application/json');

    // TODO: Make this work in IE9.
    //
    // To do this, we'll change these URL and headers...
    // /my/endpoint
    // Content-Type: text/plain
    // Authorization: Bearer abc123
    //
    // ...to this URL:
    // /my/endpoint?content_type=text%2Fplain&authorization:Bearer+abc123
    Object.keys(headers).forEach(function (headerKey) {
      req.setRequestHeader(headerKey, headers[headerKey]);
    });
  }

  try {
    req.send(prepBody(method, body));
  } catch (e) { /* ignored */ }
}

module.exports = {
  request: request
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/querystring":70,"./parse-body":22,"./prep-body":23}],18:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function getUserAgent() {
  return global.navigator.userAgent;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],19:[function(_dereq_,module,exports){
'use strict';

var ajaxIsAvaliable;
var once = _dereq_('../../lib/once');
var JSONPDriver = _dereq_('./jsonp-driver');
var AJAXDriver = _dereq_('./ajax-driver');
var getUserAgent = _dereq_('./get-user-agent');
var isHTTP = _dereq_('./is-http');

function isAjaxAvailable() {
  if (ajaxIsAvaliable == null) {
    ajaxIsAvaliable = !(isHTTP() && /MSIE\s(8|9)/.test(getUserAgent()));
  }

  return ajaxIsAvaliable;
}

module.exports = function (options, cb) {
  cb = once(cb || Function.prototype);
  options.method = (options.method || 'GET').toUpperCase();
  options.timeout = options.timeout == null ? 60000 : options.timeout;
  options.data = options.data || {};

  if (isAjaxAvailable()) {
    AJAXDriver.request(options, cb);
  } else {
    JSONPDriver.request(options, cb);
  }
};

},{"../../lib/once":68,"./ajax-driver":17,"./get-user-agent":18,"./is-http":20,"./jsonp-driver":21}],20:[function(_dereq_,module,exports){
(function (global){
'use strict';

module.exports = function () {
  return global.location.protocol === 'http:';
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],21:[function(_dereq_,module,exports){
(function (global){
'use strict';

var head;
var uuid = _dereq_('../../lib/uuid');
var querystring = _dereq_('../../lib/querystring');
var timeouts = {};

function _removeScript(script) {
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

function _createScriptTag(url, callbackName) {
  var script = document.createElement('script');
  var done = false;

  script.src = url;
  script.async = true;
  script.onerror = function () {
    global[callbackName]({message: 'error', status: 500});
  };

  script.onload = script.onreadystatechange = function () {
    if (done) { return; }

    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      done = true;
      script.onload = script.onreadystatechange = null;
    }
  };

  return script;
}

function _cleanupGlobal(callbackName) {
  try {
    delete global[callbackName];
  } catch (_) {
    global[callbackName] = null;
  }
}

function _setupTimeout(timeout, callbackName) {
  timeouts[callbackName] = setTimeout(function () {
    timeouts[callbackName] = null;

    global[callbackName]({
      error: 'timeout',
      status: -1
    });

    global[callbackName] = function () {
      _cleanupGlobal(callbackName);
    };
  }, timeout);
}

function _setupGlobalCallback(script, callback, callbackName) {
  global[callbackName] = function (response) {
    var status = response.status || 500;
    var err = null;
    var data = null;

    delete response.status;

    if (status >= 400 || status < 200) {
      err = response;
    } else {
      data = response;
    }

    _cleanupGlobal(callbackName);
    _removeScript(script);

    clearTimeout(timeouts[callbackName]);
    callback(err, data, status);
  };
}

function request(options, callback) {
  var script;
  var callbackName = 'callback_json_' + uuid().replace(/-/g, '');
  var url = options.url;
  var attrs = options.data;
  var method = options.method;
  var timeout = options.timeout;

  url = querystring.queryify(url, attrs);
  url = querystring.queryify(url, {
    _method: method,
    callback: callbackName
  });

  script = _createScriptTag(url, callbackName);
  _setupGlobalCallback(script, callback, callbackName);
  _setupTimeout(timeout, callbackName);

  if (!head) {
    head = document.getElementsByTagName('head')[0];
  }

  head.appendChild(script);
}

module.exports = {
  request: request
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../lib/querystring":70,"../../lib/uuid":72}],22:[function(_dereq_,module,exports){
'use strict';

module.exports = function (body) {
  try {
    body = JSON.parse(body);
  } catch (e) { /* ignored */ }

  return body;
};

},{}],23:[function(_dereq_,module,exports){
'use strict';

module.exports = function (method, body) {
  if (typeof method !== 'string') {
    throw new Error('Method must be a string');
  }

  if (method.toLowerCase() !== 'get' && body != null) {
    body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return body;
};

},{}],24:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../lib/error');

module.exports = {
  DATA_COLLECTOR_KOUNT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'DATA_COLLECTOR_KOUNT_NOT_ENABLED',
    message: 'Kount is not enabled for this merchant.'
  },
  DATA_COLLECTOR_KOUNT_ERROR: {
    type: BraintreeError.types.MERCHANT,
    code: 'DATA_COLLECTOR_KOUNT_ERROR'
  },
  DATA_COLLECTOR_PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'DATA_COLLECTOR_PAYPAL_NOT_ENABLED',
    message: 'PayPal is not enabled for this merchant.'
  },
  DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS',
    message: 'Data Collector must be created with Kount and/or PayPal.'
  }
};

},{"../lib/error":53}],25:[function(_dereq_,module,exports){
'use strict';

function setup() {
  return new Fraudnet();
}

function Fraudnet() {
  this.sessionId = _generateSessionId();
  this._beaconId = _generateBeaconId(this.sessionId);

  this._parameterBlock = _createParameterBlock(this.sessionId, this._beaconId);
  this._thirdPartyBlock = _createThirdPartyBlock();
}

Fraudnet.prototype.teardown = function () {
  this._thirdPartyBlock.parentNode.removeChild(this._thirdPartyBlock);
};

function _generateSessionId() {
  var i;
  var id = '';

  for (i = 0; i < 32; i++) {
    id += Math.floor(Math.random() * 16).toString(16);
  }

  return id;
}

function _generateBeaconId(sessionId) {
  var timestamp = new Date().getTime() / 1000;

  return 'https://b.stats.paypal.com/counter.cgi' +
    '?i=127.0.0.1' +
    '&p=' + sessionId +
    '&t=' + timestamp +
    '&a=14';
}

function _createParameterBlock(sessionId, beaconId) {
  var el = document.body.appendChild(document.createElement('script'));

  el.type = 'application/json';
  el.setAttribute('fncls', 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99');
  el.text = JSON.stringify({
    f: sessionId,
    s: 'BRAINTREE_SIGNIN',
    b: beaconId
  });

  return el;
}

function _createThirdPartyBlock() {
  var dom, doc;
  var scriptBaseURL = 'https://www.paypalobjects.com/webstatic/r/fb/';
  var iframe = document.createElement('iframe');

  iframe.src = 'about:blank';
  iframe.title = '';
  iframe.role = 'presentation'; // a11y
  (iframe.frameElement || iframe).style.cssText = 'width: 0; height: 0; border: 0';
  document.body.appendChild(iframe);

  try {
    doc = iframe.contentWindow.document;
  } catch (e) {
    dom = document.domain;
    iframe.src = 'javascript:var d=document.open();d.domain="' + dom + '";void(0);'; // eslint-disable-line
    doc = iframe.contentWindow.document;
  }

  doc.open()._l = function () {
    var js = this.createElement('script');

    if (dom) {
      this.domain = dom;
    }
    js.id = 'js-iframe-async';
    js.src = scriptBaseURL + 'fb-all-prod.pp.min.js';
    this.body.appendChild(js);
  };

  function listener() { doc._l(); }

  if (iframe.addEventListener) {
    iframe.addEventListener('load', listener, false);
  } else if (iframe.attachEvent) {
    iframe.attachEvent('onload', listener);
  } else {
    doc.write('<body onload="document._l();">');
  }

  doc.close();

  return iframe;
}

module.exports = {
  setup: setup
};

},{}],26:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable camelcase */
/** @module braintree-web/data-collector */

var kount = _dereq_('./kount');
var fraudnet = _dereq_('./fraudnet');
var BraintreeError = _dereq_('../lib/error');
var methods = _dereq_('../lib/methods');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var convertMethodsToError = _dereq_('../lib/convert-methods-to-error');
var deferred = _dereq_('../lib/deferred');
var VERSION = "3.5.0";
var sharedErrors = _dereq_('../errors');
var errors = _dereq_('./errors');

/**
 * @class
 * @global
 * @name DataCollector
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/data-collector.create|braintree-web.data-collector.create} instead.</strong>
 * @classdesc This class is used for advanced fraud integration with PayPal and Kount. Instances of this class have {@link DataCollector#deviceData|deviceData} which is used to correlate user sessions with server transactions.
 */

/**
 * @memberof DataCollector
 * @name deviceData
 * @type string
 * @description JSON string to pass with server transactions.
 * @instance
 */

/**
 * @memberof DataCollector
 * @name teardown
 * @function
 * @description Cleanly remove all event handlers and DOM nodes that were added.
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @instance
 * @returns {void}
 */

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {boolean} [options.kount] If true, Kount fraud data collection is enabled.
 * @param {boolean} [options.paypal] If true, PayPal fraud data collection is enabled.
 * @param {callback} callback The second argument, `data`, is the {@link DataCollector} instance.
 * @returns {void}
 */
function create(options, callback) {
  var data, kountInstance, fraudnetInstance, result, config, clientVersion;
  var instances = [];

  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  function teardown(cb) {
    var i;

    for (i = 0; i < instances.length; i++) {
      instances[i].teardown();
    }

    convertMethodsToError(result, methods(result));

    if (cb) {
      cb = deferred(cb);
      cb();
    }
  }

  if (options.client == null) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating Data Collector.'
    }));
    return;
  }

  config = options.client.getConfiguration();
  clientVersion = config.analyticsMetadata.sdkVersion;

  if (clientVersion !== VERSION) {
    callback(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and Data Collector (version ' + VERSION + ') components must be from the same SDK version.'
    }));
    return;
  }

  if (options.kount === true) {
    if (!config.gatewayConfiguration.kount) {
      callback(new BraintreeError(errors.DATA_COLLECTOR_KOUNT_NOT_ENABLED));
      return;
    }

    try {
      kountInstance = kount.setup({
        environment: config.gatewayConfiguration.environment,
        merchantId: config.gatewayConfiguration.kount.kountMerchantId
      });
    } catch (err) {
      callback(new BraintreeError({
        type: errors.DATA_COLLECTOR_KOUNT_ERROR.type,
        code: errors.DATA_COLLECTOR_KOUNT_ERROR.code,
        message: err.message
      }));
      return;
    }

    data = kountInstance.deviceData;
    instances.push(kountInstance);
  } else {
    data = {};
  }

  if (options.paypal === true) {
    if (config.gatewayConfiguration.paypalEnabled !== true) {
      callback(new BraintreeError(errors.DATA_COLLECTOR_PAYPAL_NOT_ENABLED));
      return;
    }

    fraudnetInstance = fraudnet.setup();
    data.correlation_id = fraudnetInstance.sessionId;
    instances.push(fraudnetInstance);
  }

  if (instances.length === 0) {
    callback(new BraintreeError(errors.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS));
    return;
  }

  result = {
    deviceData: JSON.stringify(data),
    teardown: teardown
  };

  callback(null, result);
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../errors":29,"../lib/convert-methods-to-error":48,"../lib/deferred":50,"../lib/error":53,"../lib/methods":67,"../lib/throw-if-no-callback":71,"./errors":24,"./fraudnet":25,"./kount":27}],27:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable camelcase */

var sjcl = _dereq_('./vendor/sjcl');

var QA_URL = 'https://assets.qa.braintreepayments.com/data';
var IFRAME_ID = 'braintreeDataFrame';
var environmentUrls = {
  development: QA_URL,
  qa: QA_URL,
  sandbox: 'https://assets.braintreegateway.com/sandbox/data',
  production: 'https://assets.braintreegateway.com/data'
};

function setup(o) {
  var options = o != null ? o : {};

  return new Kount(options);
}

function Kount(options) {
  sjcl.random.startCollectors();

  this._currentEnvironment = this._initializeEnvironment(options);
  this._deviceSessionId = this._generateDeviceSessionId();
  this.deviceData = this._getDeviceData();

  this._iframe = this._setupIFrame();
}

Kount.prototype.teardown = function () {
  sjcl.random.stopCollectors();
  this._removeIframe();
};

Kount.prototype._removeIframe = function () {
  this._iframe.parentNode.removeChild(this._iframe);
};

Kount.prototype._getDeviceData = function () {
  return {
    device_session_id: this._deviceSessionId,
    fraud_merchant_id: this._currentEnvironment.id
  };
};

Kount.prototype._generateDeviceSessionId = function () {
  var bits, hexString;

  bits = sjcl.random.randomWords(4, 0);
  hexString = sjcl.codec.hex.fromBits(bits);

  return hexString;
};

Kount.prototype._setupIFrame = function () {
  var params;
  var self = this;
  var iframe = document.getElementById(IFRAME_ID);

  if (iframe != null) {
    return iframe;
  }

  params = '?m=' + this._currentEnvironment.id + '&s=' + this._deviceSessionId;

  iframe = document.createElement('iframe');
  iframe.width = 1;
  iframe.id = IFRAME_ID;
  iframe.height = 1;
  iframe.frameBorder = 0;
  iframe.scrolling = 'no';

  document.body.appendChild(iframe);
  setTimeout(function () {
    iframe.src = self._currentEnvironment.url + '/logo.htm' + params;
    iframe.innerHTML = '<img src="' + self._currentEnvironment.url + '/logo.gif' + params + '" />';
  }, 10);

  return iframe;
};

Kount.prototype._initializeEnvironment = function (options) {
  var url = environmentUrls[options.environment];

  if (url == null) {
    throw new Error(options.environment + ' is not a valid environment for kount.environment');
  }

  return {
    url: url,
    name: options.environment,
    id: options.merchantId
  };
};

module.exports = {
  setup: setup,
  Kount: Kount,
  environmentUrls: environmentUrls
};

},{"./vendor/sjcl":28}],28:[function(_dereq_,module,exports){
"use strict";var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
sjcl.cipher.aes=function(a){this.l[0][0][0]||this.G();var b,c,d,e,f=this.l[0][4],g=this.l[1];b=a.length;var k=1;if(4!==b&&6!==b&&8!==b)throw new sjcl.exception.invalid("invalid aes key size");this.b=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255],0===a%b&&(c=c<<8^c>>>24^k<<24,k=k<<1^283*(k>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--)c=d[b&3?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[c&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return t(this,a,0)},decrypt:function(a){return t(this,a,1)},l:[[[],[],[],[],[]],[[],[],[],[],[]]],G:function(){var a=this.l[0],b=this.l[1],c=a[4],d=b[4],e,f,g,k=[],l=[],p,n,h,m;for(e=0;0x100>e;e++)l[(k[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!c[f];f^=p||1,g=l[g]||1)for(h=g^g<<1^g<<2^g<<3^g<<4,h=h>>8^h&255^99,c[f]=h,d[h]=f,n=k[e=k[p=k[f]]],m=0x1010101*n^0x10001*e^0x101*p^0x1010100*f,n=0x101*k[h]^0x1010100*h,e=0;4>e;e++)a[e][f]=n=n<<24^n>>>8,b[e][h]=m=m<<24^m>>>8;for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function t(a,b,c){if(4!==b.length)throw new sjcl.exception.invalid("invalid aes block size");var d=a.b[c],e=b[0]^d[0],f=b[c?3:1]^d[1],g=b[2]^d[2];b=b[c?1:3]^d[3];var k,l,p,n=d.length/4-2,h,m=4,q=[0,0,0,0];k=a.l[c];a=k[0];var r=k[1],v=k[2],w=k[3],x=k[4];for(h=0;h<n;h++)k=a[e>>>24]^r[f>>16&255]^v[g>>8&255]^w[b&255]^d[m],l=a[f>>>24]^r[g>>16&255]^v[b>>8&255]^w[e&255]^d[m+1],p=a[g>>>24]^r[b>>16&255]^v[e>>8&255]^w[f&255]^d[m+2],b=a[b>>>24]^r[e>>16&255]^v[f>>8&255]^w[g&255]^d[m+3],m+=4,e=k,f=l,g=p;for(h=
0;4>h;h++)q[c?3&-h:h]=x[e>>>24]<<24^x[f>>16&255]<<16^x[g>>8&255]<<8^x[b&255]^d[m++],k=e,e=f,f=g,g=b,b=k;return q}
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.M(a.slice(b/32),32-(b&31)).slice(1);return void 0===c?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.M(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b=b&31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},M:function(a,b,c,d){var e;e=0;for(void 0===d&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},Y:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]},byteswapM:function(a){var b,c;for(b=0;b<a.length;++b)c=a[b],a[b]=c>>>24|c>>>8&0xff00|(c&0xff00)<<8|c<<24;return a}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>24),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a=a+"00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,4*d)}};sjcl.hash.sha256=function(a){this.b[0]||this.G();a?(this.u=a.u.slice(0),this.o=a.o.slice(0),this.h=a.h):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.u=this.K.slice(0);this.o=[];this.h=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.o=sjcl.bitArray.concat(this.o,a);b=this.h;a=this.h=b+sjcl.bitArray.bitLength(a);if(0x1fffffffffffff<a)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!==typeof Uint32Array){var d=new Uint32Array(c),e=0;for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,d.subarray(16*e,
16*(e+1))),e+=1;c.splice(0,16*e)}else for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,c.splice(0,16));return this},finalize:function(){var a,b=this.o,c=this.u,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.h/0x100000000));for(b.push(this.h|0);b.length;)u(this,b.splice(0,16));this.reset();return c},K:[],b:[],G:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}for(var b=0,c=2,d,e;64>b;c++){e=!0;for(d=2;d*d<=c;d++)if(0===c%d){e=
!1;break}e&&(8>b&&(this.K[b]=a(Math.pow(c,.5))),this.b[b]=a(Math.pow(c,1/3)),b++)}}};
function u(a,b){var c,d,e,f=a.u,g=a.b,k=f[0],l=f[1],p=f[2],n=f[3],h=f[4],m=f[5],q=f[6],r=f[7];for(c=0;64>c;c++)16>c?d=b[c]:(d=b[c+1&15],e=b[c+14&15],d=b[c&15]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+b[c&15]+b[c+9&15]|0),d=d+r+(h>>>6^h>>>11^h>>>25^h<<26^h<<21^h<<7)+(q^h&(m^q))+g[c],r=q,q=m,m=h,h=n+d|0,n=p,p=l,l=k,k=d+(l&p^n&(l^p))+(l>>>2^l>>>13^l>>>22^l<<30^l<<19^l<<10)|0;f[0]=f[0]+k|0;f[1]=f[1]+l|0;f[2]=f[2]+p|0;f[3]=f[3]+n|0;f[4]=f[4]+h|0;f[5]=f[5]+m|0;f[6]=f[6]+q|0;f[7]=
f[7]+r|0}sjcl.prng=function(a){this.c=[new sjcl.hash.sha256];this.i=[0];this.H=0;this.v={};this.F=0;this.J={};this.L=this.f=this.j=this.T=0;this.b=[0,0,0,0,0,0,0,0];this.g=[0,0,0,0];this.C=void 0;this.D=a;this.s=!1;this.B={progress:{},seeded:{}};this.m=this.S=0;this.w=1;this.A=2;this.O=0x10000;this.I=[0,48,64,96,128,192,0x100,384,512,768,1024];this.P=3E4;this.N=80};
sjcl.prng.prototype={randomWords:function(a,b){var c=[],d;d=this.isReady(b);var e;if(d===this.m)throw new sjcl.exception.notReady("generator isn't seeded");if(d&this.A){d=!(d&this.w);e=[];var f=0,g;this.L=e[0]=(new Date).valueOf()+this.P;for(g=0;16>g;g++)e.push(0x100000000*Math.random()|0);for(g=0;g<this.c.length&&(e=e.concat(this.c[g].finalize()),f+=this.i[g],this.i[g]=0,d||!(this.H&1<<g));g++);this.H>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.i.push(0));this.f-=f;f>this.j&&(this.j=
f);this.H++;this.b=sjcl.hash.sha256.hash(this.b.concat(e));this.C=new sjcl.cipher.aes(this.b);for(d=0;4>d&&(this.g[d]=this.g[d]+1|0,!this.g[d]);d++);}for(d=0;d<a;d+=4)0===(d+1)%this.O&&y(this),e=z(this),c.push(e[0],e[1],e[2],e[3]);y(this);return c.slice(0,a)},setDefaultParanoia:function(a,b){if(0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.D=a},addEntropy:function(a,
b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.v[c],k=this.isReady(),l=0;d=this.J[c];void 0===d&&(d=this.J[c]=this.T++);void 0===g&&(g=this.v[c]=0);this.v[c]=(this.v[c]+1)%this.c.length;switch(typeof a){case "number":void 0===b&&(b=1);this.c[g].update([d,this.F++,1,b,f,1,a|0]);break;case "object":c=Object.prototype.toString.call(a);if("[object Uint32Array]"===c){e=[];for(c=0;c<a.length;c++)e.push(a[c]);a=e}else for("[object Array]"!==c&&(l=1),c=0;c<a.length&&!l;c++)"number"!==typeof a[c]&&
(l=1);if(!l){if(void 0===b)for(c=b=0;c<a.length;c++)for(e=a[c];0<e;)b++,e=e>>>1;this.c[g].update([d,this.F++,2,b,f,a.length].concat(a))}break;case "string":void 0===b&&(b=a.length);this.c[g].update([d,this.F++,3,b,f,a.length]);this.c[g].update(a);break;default:l=1}if(l)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.i[g]+=b;this.f+=b;k===this.m&&(this.isReady()!==this.m&&A("seeded",Math.max(this.j,this.f)),A("progress",this.getProgress()))},
isReady:function(a){a=this.I[void 0!==a?a:this.D];return this.j&&this.j>=a?this.i[0]>this.N&&(new Date).valueOf()>this.L?this.A|this.w:this.w:this.f>=a?this.A|this.m:this.m},getProgress:function(a){a=this.I[a?a:this.D];return this.j>=a?1:this.f>a?1:this.f/a},startCollectors:function(){if(!this.s){this.a={loadTimeCollector:B(this,this.V),mouseCollector:B(this,this.W),keyboardCollector:B(this,this.U),accelerometerCollector:B(this,this.R),touchCollector:B(this,this.X)};if(window.addEventListener)window.addEventListener("load",
this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else if(document.attachEvent)document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector);else throw new sjcl.exception.bug("can't attach event");
this.s=!0}},stopCollectors:function(){this.s&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",
this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.s=!1)},addEventListener:function(a,b){this.B[a][this.S++]=b},removeEventListener:function(a,b){var c,d,e=this.B[a],f=[];for(d in e)e.hasOwnProperty(d)&&e[d]===b&&f.push(d);for(c=0;c<f.length;c++)d=f[c],delete e[d]},U:function(){C(this,1)},W:function(a){var b,c;try{b=a.x||a.clientX||a.offsetX||0,c=a.y||a.clientY||a.offsetY||0}catch(d){c=b=0}0!=b&&0!=c&&this.addEntropy([b,c],2,"mouse");C(this,0)},X:function(a){a=
a.touches[0]||a.changedTouches[0];this.addEntropy([a.pageX||a.clientX,a.pageY||a.clientY],1,"touch");C(this,0)},V:function(){C(this,2)},R:function(a){a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z;if(window.orientation){var b=window.orientation;"number"===typeof b&&this.addEntropy(b,1,"accelerometer")}a&&this.addEntropy(a,2,"accelerometer");C(this,0)}};
function A(a,b){var c,d=sjcl.random.B[a],e=[];for(c in d)d.hasOwnProperty(c)&&e.push(d[c]);for(c=0;c<e.length;c++)e[c](b)}function C(a,b){"undefined"!==typeof window&&window.performance&&"function"===typeof window.performance.now?a.addEntropy(window.performance.now(),b,"loadtime"):a.addEntropy((new Date).valueOf(),b,"loadtime")}function y(a){a.b=z(a).concat(z(a));a.C=new sjcl.cipher.aes(a.b)}function z(a){for(var b=0;4>b&&(a.g[b]=a.g[b]+1|0,!a.g[b]);b++);return a.C.encrypt(a.g)}
function B(a,b){return function(){b.apply(a,arguments)}}sjcl.random=new sjcl.prng(6);
a:try{var D,E,F,G;if(G="undefined"!==typeof module&&module.exports){var H;try{H=_dereq_("crypto")}catch(a){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array((new Uint8Array(D)).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']");else if("undefined"!==typeof window&&"undefined"!==typeof Uint32Array){F=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F);else if(window.msCrypto&&window.msCrypto.getRandomValues)window.msCrypto.getRandomValues(F);
else break a;sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(a){"undefined"!==typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(a))}"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);"function"===typeof define&&define([],function(){return sjcl});

},{"crypto":undefined}],29:[function(_dereq_,module,exports){
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

},{"./lib/error":53}],30:[function(_dereq_,module,exports){
'use strict';

var constants = _dereq_('../shared/constants');

module.exports = function composeUrl(assetsUrl, componentId) {
  return assetsUrl +
    '/web/' +
    constants.VERSION +
    '/html/hosted-fields-frame.html#' +
    componentId;
};

},{"../shared/constants":34}],31:[function(_dereq_,module,exports){
'use strict';

var Destructor = _dereq_('../../lib/destructor');
var classlist = _dereq_('../../lib/classlist');
var iFramer = _dereq_('iframer');
var Bus = _dereq_('../../lib/bus');
var BraintreeError = _dereq_('../../lib/error');
var composeUrl = _dereq_('./compose-url');
var constants = _dereq_('../shared/constants');
var errors = _dereq_('../shared/errors');
var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;
var uuid = _dereq_('../../lib/uuid');
var findParentTags = _dereq_('../shared/find-parent-tags');
var throwIfNoCallback = _dereq_('../../lib/throw-if-no-callback');
var isIos = _dereq_('../../lib/is-ios');
var events = constants.events;
var EventEmitter = _dereq_('../../lib/event-emitter');
var injectFrame = _dereq_('./inject-frame');
var analytics = _dereq_('../../lib/analytics');
var whitelistedFields = constants.whitelistedFields;
var VERSION = "3.5.0";
var methods = _dereq_('../../lib/methods');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var deferred = _dereq_('../../lib/deferred');
var sharedErrors = _dereq_('../../errors');
var getCardTypes = _dereq_('credit-card-type');

/**
 * @typedef {object} HostedFields~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard`.
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

    classlist.toggle(container, constants.externalClasses.FOCUSED, field.isFocused);
    classlist.toggle(container, constants.externalClasses.VALID, field.isValid);
    classlist.toggle(container, constants.externalClasses.INVALID, !field.isPotentiallyValid);

    this._state = { // eslint-disable-line no-invalid-this
      cards: merchantPayload.cards,
      fields: merchantPayload.fields
    };

    this._emit(eventData.type, merchantPayload); // eslint-disable-line no-invalid-this
  };
}

/**
 * @class HostedFields
 * @param {object} options The Hosted Fields {@link module:braintree-web/hosted-fields.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/hosted-fields.create|braintree-web.hosted-fields.create} instead.</strong>
 * @classdesc This class represents a Hosted Fields component produced by {@link module:braintree-web/hosted-fields.create|braintree-web/hosted-fields.create}. Instances of this class have methods for interacting with the input fields within Hosted Fields' iframes.
 */
function HostedFields(options) {
  var failureTimeout, clientVersion;
  var self = this;
  var fields = {};
  var fieldCount = 0;
  var componentId = uuid();

  if (!options.client) {
    throw new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating Hosted Fields.'
    });
  }

  clientVersion = options.client.getConfiguration().analyticsMetadata.sdkVersion;
  if (clientVersion !== VERSION) {
    throw new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and Hosted Fields (version ' + VERSION + ') components must be from the same SDK version.'
    });
  }

  if (!options.fields) {
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

  this._client = options.client;

  analytics.sendEvent(this._client, 'web.custom.hosted-fields.initialized');

  Object.keys(options.fields).forEach(function (key) {
    var field, container, frame;

    if (!constants.whitelistedFields.hasOwnProperty(key)) {
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

    frame = iFramer({
      type: key,
      name: 'braintree-hosted-field-' + key,
      style: constants.defaultIFrameStyle
    });

    this._injectedNodes = this._injectedNodes.concat(injectFrame(frame, container));
    this._setupLabelFocus(key, container);
    fields[key] = {
      frameElement: frame,
      containerElement: container
    };
    fieldCount++;

    this._state.fields[key] = {
      isEmpty: true,
      isValid: false,
      isPotentiallyValid: true,
      isFocused: false,
      container: container
    };

    setTimeout(function () {
      frame.src = composeUrl(self._client.getConfiguration().gatewayConfiguration.assetsUrl, componentId);
    }, 0);
  }.bind(this));

  failureTimeout = setTimeout(function () {
    analytics.sendEvent(self._client, 'web.custom.hosted-fields.load.timed-out');
  }, INTEGRATION_TIMEOUT_MS);

  this._bus.on(events.FRAME_READY, function (reply) {
    fieldCount--;
    if (fieldCount === 0) {
      clearTimeout(failureTimeout);
      reply(options);
      self._emit('ready');
    }
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

      classlist.remove(
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
  var shouldSkipLabelFocus = isIos();
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

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/hosted-fields.create|create}
 * @public
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if teardown completes successfully.
 * @example
 * hostedFieldsInstance.teardown(function (teardownErr) {
 *   if (teardownErr) {
 *     console.error('Could not tear down Hosted Fields!');
 *   } else {
 *     console.info('Hosted Fields has been torn down!');
 *   }
 * });
 * @returns {void}
 */
HostedFields.prototype.teardown = function (callback) {
  var client = this._client;

  this._destructor.teardown(function (err) {
    analytics.sendEvent(client, 'web.custom.hosted-fields.teardown-completed');

    if (typeof callback === 'function') {
      callback = deferred(callback);
      callback(err);
    }
  });
};

/**
 * Tokenizes fields and returns a nonce payload.
 * @public
 * @param {object} [options] All tokenization options for the Hosted Fields component.
 * @param {boolean} [options.vault=false] When true, will vault the tokenized card. Cards will only be vaulted when using a client created with a client token that includes a customer ID.
 * @param {callback} callback The second argument, <code>data</code>, is a {@link HostedFields~tokenizePayload|tokenizePayload}
 * @example <caption>Tokenize a card</caption>
 * hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     switch (tokenizeErr.code) {
 *       case 'HOSTED_FIELDS_FIELDS_EMPTY':
 *         console.error('All fields are empty! Please fill out the form.');
 *         break;
 *       case 'HOSTED_FIELDS_FIELDS_INVALID':
 *         console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
 *         break;
 *       case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
 *         console.error('Tokenization failed server side. Is the card valid?');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
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
 * @returns {void}
 */
HostedFields.prototype.tokenize = function (options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  throwIfNoCallback(callback, 'tokenize');

  this._bus.emit(events.TOKENIZATION_REQUEST, options, function (response) {
    callback.apply(null, response);
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
 * @returns {void}
 */
HostedFields.prototype.addClass = function (field, classname, callback) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
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

  if (typeof callback === 'function') {
    callback = deferred(callback);
    callback(err);
  }
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
 * @returns {void}
 */
HostedFields.prototype.removeClass = function (field, classname, callback) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
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

  if (typeof callback === 'function') {
    callback = deferred(callback);
    callback(err);
  }
};

/**
 * Sets the placeholder of a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field whose placeholder you wish to change. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} placeholder Will be used as the `placeholder` attribute of the input.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the placeholder updated successfully.
 *
 * @example
 * hostedFieldsInstance.setPlaceholder('number', '4111 1111 1111 1111', function (placeholderErr) {
 *   if (placeholderErr) {
 *     console.error(placeholderErr);
 *   }
 * });
 *
 * @example <caption>Update CVV field on card type change</caption>
 * hostedFieldsInstance.on('cardTypeChange', function (event) {
 *   // Update the placeholder value if there is only one possible card type
 *   if (event.cards.length === 1) {
 *     hostedFields.setPlaceholder('cvv', event.cards[0].code.name, function (placeholderErr) {
 *       if (placeholderErr) {
 *         // Handle errors, such as invalid field name
 *         console.error(placeholderErr);
 *       }
 *     });
 *   }
 * });
 * @returns {void}
 */
HostedFields.prototype.setPlaceholder = function (field, placeholder, callback) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when setting a placeholder.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot set placeholder for "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.SET_PLACEHOLDER, field, placeholder);
  }

  if (typeof callback === 'function') {
    callback = deferred(callback);
    callback(err);
  }
};

/**
 * Clear the value of a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field whose placeholder you wish to clear. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field cleared successfully.
 * @returns {void}
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
HostedFields.prototype.clear = function (field, callback) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
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

  if (typeof callback === 'function') {
    callback = deferred(callback);
    callback(err);
  }
};

/**
 * Returns an {@link HostedFields~stateObject|object} that includes the state of all fields and possible card types.
 * @public
 * @returns {object} {@link HostedFields~stateObject|stateObject}
 * @example <caption>Check if all fields are valid</caption>
 * var state = hostedFields.getState();
 *
 * var formValid = Object.keys(state.fields).every(function (key) {
 *   return state.fields[key].isValid;
 * });
 */
HostedFields.prototype.getState = function () {
  return this._state;
};

module.exports = HostedFields;

},{"../../errors":29,"../../lib/analytics":39,"../../lib/bus":44,"../../lib/classlist":46,"../../lib/constants":47,"../../lib/convert-methods-to-error":48,"../../lib/deferred":50,"../../lib/destructor":51,"../../lib/error":53,"../../lib/event-emitter":54,"../../lib/is-ios":64,"../../lib/methods":67,"../../lib/throw-if-no-callback":71,"../../lib/uuid":72,"../shared/constants":34,"../shared/errors":35,"../shared/find-parent-tags":36,"./compose-url":30,"./inject-frame":32,"credit-card-type":1,"iframer":3}],32:[function(_dereq_,module,exports){
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

},{}],33:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/hosted-fields */

var HostedFields = _dereq_('./external/hosted-fields');
var deferred = _dereq_('../lib/deferred');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var VERSION = "3.5.0";

/**
 * Fields used in {@link module:braintree-web/hosted-fields~fieldOptions fields options}
 * @typedef {object} field
 * @property {string} selector A CSS selector to find the container where the hosted field will be inserted.
 * @property {string} [placeholder] Will be used as the `placeholder` attribute of the input. If `placeholder` is not natively supported by the browser, it will be polyfilled.
 * @property {string} [type] Will be used as the `type` attribute of the input. To mask `cvv` input, for instance, `type: "password"` can be used.
 * @property {boolean} [formatInput=true] Enable or disable automatic formatting on this field.
 * @property {object|boolean} [select] If truthy, this field becomes a `<select>` dropdown list. This can only be used for `expirationMonth` and `expirationYear` fields.
 * @property {string[]} [select.options] An array of 12 strings, one per month. This can only be used for the `expirationMonth` field. For example, the array can look like `['01 - January', '02 - February', ...]`.
 */

/**
 * An object that has {@link module:braintree-web/hosted-fields~field field objects} for each field. Used in {@link module:braintree-web/hosted-fields~create create}.
 * @typedef {object} fieldOptions
 * @property {field} [number] A field for card number.
 * @property {field} [expirationDate] A field for expiration date in `MM/YYYY` format. This should not be used with the `expirationMonth` and `expirationYear` properties.
 * @property {field} [expirationMonth] A field for expiration month in `MM` format. This should be used with the `expirationYear` property.
 * @property {field} [expirationYear] A field for expiration year in `YYYY` format. This should be used with the `expirationMonth` property.
 * @property {field} [cvv] A field for 3 or 4 digit CVV or CID.
 * @property {field} [postalCode] A field for postal or region code.
 */

/**
 * An object that represents CSS that will be applied in each hosted field. This object looks similar to CSS. Typically, these styles involve fonts (such as `font-family` or `color`).
 *
 * These are the CSS properties that Hosted Fields supports. Any other CSS should be specified on your page and outside of any Braintree configuration. Trying to set unsupported properties will fail and put a warning in the console.
 *
 * `color` `font-family` `font-size-adjust` `font-size` `font-stretch` `font-style` `font-variant-alternates` `font-variant-caps` `font-variant-east-asian` `font-variant-ligatures` `font-variant-numeric` `font-variant` `font-weight` `font` `line-height` `opacity` `outline` `text-shadow` `transition` `-moz-osx-font-smoothing` `-moz-tap-highlight-color` `-moz-transition` `-webkit-font-smoothing` `-webkit-tap-highlight-color` `-webkit-transition`
 * @typedef {object} styleOptions
 */

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {fieldOptions} options.fields A {@link module:braintree-web/hosted-fields~fieldOptions set of options for each field}.
 * @param {styleOptions} options.styles {@link module:braintree-web/hosted-fields~styleOptions Styles} applied to each field.
 * @param {callback} callback The second argument, `data`, is the {@link HostedFields} instance.
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
 */
function create(options, callback) {
  var integration;

  throwIfNoCallback(callback, 'create');

  try {
    integration = new HostedFields(options);
  } catch (err) {
    callback = deferred(callback);
    callback(err);
    return;
  }

  integration.on('ready', function () {
    callback(null, integration);
  });
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/deferred":50,"../lib/throw-if-no-callback":71,"./external/hosted-fields":31}],34:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable no-reserved-keys */

var enumerate = _dereq_('../../lib/enumerate');
var VERSION = "3.5.0";

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
  whitelistedStyles: [
    '-moz-osx-font-smoothing',
    '-moz-tap-highlight-color',
    '-moz-transition',
    '-webkit-font-smoothing',
    '-webkit-tap-highlight-color',
    '-webkit-transition',
    'color',
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
    'line-height',
    'opacity',
    'outline',
    'text-shadow',
    'transition'
  ],
  whitelistedFields: {
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
  }
};

constants.events = enumerate([
  'FRAME_READY',
  'VALIDATE_STRICT',
  'CONFIGURATION',
  'TOKENIZATION_REQUEST',
  'INPUT_EVENT',
  'TRIGGER_INPUT_FOCUS',
  'ADD_CLASS',
  'REMOVE_CLASS',
  'SET_PLACEHOLDER',
  'CLEAR_FIELD'
], 'hosted-fields:');

module.exports = constants;

},{"../../lib/enumerate":52}],35:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/error');

module.exports = {
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
  }
};

},{"../../lib/error":53}],36:[function(_dereq_,module,exports){
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

},{}],37:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web
 * @description This is the top-level module exported by the Braintree JavaScript SDK. In a browser environment, this will be the global <code>braintree</code> object. In a CommonJS environment (like Browserify or Webpack), it will be the default export of the <code>braintree-web</code> package. In AMD environments (like RequireJS), it can be `require`d like other modules.
 * @example
 * <caption>CommonJS</caption>
 * var braintree = require('braintree-web');
 *
 * braintree.client.create(...);
 * @example
 * <caption>In the browser</caption>
 * <script src="https://js.braintreegateway.com/web/{@pkg version}/js/client.min.js"></script>
 * <script>
 *   window.braintree.client.create(...);
 * </script>
 * @example
 * <caption>AMD</caption>
 * // main.js
 * require.config({
 *   paths: {
 *     braintreeClient: 'https://js.braintreegateway.com/web/{@pkg version}/js/client.min'
 *   }
 * });
 *
 * require(['braintreeClient'], function (braintreeClient) {
 *   braintreeClient.create(...);
 * });
 */

/**
 * @global
 * @callback callback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {?any} [data] The successful result of the asynchronous function call (if data exists).
 * @description The Node.js-style callback pattern used throughout the SDK.
 * @returns {void}
 */

var client = _dereq_('./client');
var paypal = _dereq_('./paypal');
var hostedFields = _dereq_('./hosted-fields');
var dataCollector = _dereq_('./data-collector');
var americanExpress = _dereq_('./american-express');
var unionpay = _dereq_('./unionpay');
var applePay = _dereq_('./apple-pay');
var threeDSecure = _dereq_('./three-d-secure');
var usBankAccount = _dereq_('./us-bank-account');
var VERSION = "3.5.0";

module.exports = {
  /** @type {module:braintree-web/client} */
  client: client,
  /** @type {module:braintree-web/paypal} */
  paypal: paypal,
  /** @type {module:braintree-web/hosted-fields} */
  hostedFields: hostedFields,
  /** @type {module:braintree-web/three-d-secure} */
  threeDSecure: threeDSecure,
  /** @type {module:braintree-web/data-collector} */
  dataCollector: dataCollector,
  /** @type {module:braintree-web/american-express} */
  americanExpress: americanExpress,
  /** @type {module:braintree-web/unionpay} */
  unionpay: unionpay,
  /** @type {module:braintree-web/apple-pay} */
  applePay: applePay,
  /** @type {module:braintree-web/us-bank-account} */
  usBankAccount: usBankAccount,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"./american-express":9,"./apple-pay":12,"./client":16,"./data-collector":26,"./hosted-fields":33,"./paypal":74,"./three-d-secure":78,"./unionpay":82,"./us-bank-account":88}],38:[function(_dereq_,module,exports){
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

},{"./constants":47,"./create-authorization-data":49,"./json-clone":66}],39:[function(_dereq_,module,exports){
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
    analytics: [{kind: kind, timestamp: timestamp}]
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

},{"./add-metadata":38,"./constants":47}],40:[function(_dereq_,module,exports){
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

},{"./once":68}],41:[function(_dereq_,module,exports){
(function (global){
'use strict';

function isOperaMini(ua) {
  ua = ua || global.navigator.userAgent;
  return ua.indexOf('Opera Mini') > -1;
}

function isAndroidFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return isAndroid(ua) && ua.indexOf('Firefox') > -1;
}

function getIEVersion(ua) {
  ua = ua || global.navigator.userAgent;

  if (ua.indexOf('MSIE') !== -1) {
    return parseInt(ua.replace(/.*MSIE ([0-9]+)\..*/, '$1'), 10);
  } else if (/Trident.*rv:11/.test(ua)) {
    return 11;
  }

  return null;
}

function isHTTPS(protocol) {
  protocol = protocol || global.location.protocol;
  return protocol === 'https:';
}

function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/.test(ua);
}

function isAndroid(ua) {
  ua = ua || global.navigator.userAgent;
  return /Android/.test(ua);
}

function supportsPopups(ua) {
  ua = ua || global.navigator.userAgent;
  return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua));
}

// The Google Search iOS app is technically a webview and doesn't support popups.
function isGoogleSearchApp(ua) {
  return /\bGSA\b/.test(ua);
}

function isIosWebview(ua) {
  ua = ua || global.navigator.userAgent;
  if (isIos(ua)) {
    if (isGoogleSearchApp(ua)) {
      return true;
    }
    return /.+AppleWebKit(?!.*Safari)/.test(ua);
  }
  return false;
}

function isAndroidWebview(ua) {
  var androidWebviewRegExp = /Version\/[\d\.]+/;

  ua = ua || global.navigator.userAgent;
  if (isAndroid(ua)) {
    return androidWebviewRegExp.test(ua) && !isOperaMini(ua);
  }
  return false;
}

module.exports = {
  isOperaMini: isOperaMini,
  isAndroidFirefox: isAndroidFirefox,
  getIEVersion: getIEVersion,
  isHTTPS: isHTTPS,
  isIos: isIos,
  isAndroid: isAndroid,
  supportsPopups: supportsPopups
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],42:[function(_dereq_,module,exports){
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

},{"../is-whitelisted-domain":65}],43:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../enumerate');

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');

},{"../enumerate":52}],44:[function(_dereq_,module,exports){
'use strict';

var bus = _dereq_('framebus');
var events = _dereq_('./events');
var checkOrigin = _dereq_('./check-origin').checkOrigin;
var BraintreeError = _dereq_('../error');

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

},{"../error":53,"./check-origin":42,"./events":43,"framebus":2}],45:[function(_dereq_,module,exports){
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

},{}],46:[function(_dereq_,module,exports){
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

},{}],47:[function(_dereq_,module,exports){
'use strict';

var VERSION = "3.5.0";
var PLATFORM = 'web';

module.exports = {
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  INTEGRATION_TIMEOUT_MS: 60000,
  VERSION: VERSION,
  INTEGRATION: 'custom',
  SOURCE: 'client',
  PLATFORM: PLATFORM,
  BRAINTREE_LIBRARY_VERSION: 'braintree/' + PLATFORM + '/' + VERSION
};

},{}],48:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('./error');
var sharedErrors = _dereq_('../errors');

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

},{"../errors":29,"./error":53}],49:[function(_dereq_,module,exports){
'use strict';

var atob = _dereq_('../lib/polyfill').atob;

var apiUrls = {
  production: 'https://api.braintreegateway.com:443',
  sandbox: 'https://api.sandbox.braintreegateway.com:443'
};

/* eslint-enable no-undef,block-scoped-var */

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

},{"../lib/polyfill":69}],50:[function(_dereq_,module,exports){
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

},{}],51:[function(_dereq_,module,exports){
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

},{"./batch-execute-functions":40}],52:[function(_dereq_,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;
    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],53:[function(_dereq_,module,exports){
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

},{"./enumerate":52}],54:[function(_dereq_,module,exports){
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

},{}],55:[function(_dereq_,module,exports){
'use strict';

var popup = _dereq_('./popup');
var Bus = _dereq_('../../bus');
var events = _dereq_('../shared/events');
var errors = _dereq_('../shared/errors');
var constants = _dereq_('../shared/constants');
var uuid = _dereq_('../../uuid');
var iFramer = _dereq_('iframer');
var BraintreeError = _dereq_('../../error');

var REQUIRED_CONFIG_KEYS = [
  'name',
  'dispatchFrameUrl',
  'openFrameUrl'
];

function _validateFrameConfiguration(options) {
  if (!options) {
    throw new Error('Valid configuration is required');
  }

  REQUIRED_CONFIG_KEYS.forEach(function (key) {
    if (!options.hasOwnProperty(key)) {
      throw new Error('A valid frame ' + key + ' must be provided');
    }
  });

  if (!(/^[\w_]+$/.test(options.name))) { // eslint-disable-line
    throw new Error('A valid frame name must be provided');
  }
}

function FrameService(options) {
  _validateFrameConfiguration(options);

  this._serviceId = uuid().replace(/-/g, '');

  this._options = {
    name: options.name + '_' + this._serviceId,
    dispatchFrameUrl: options.dispatchFrameUrl,
    openFrameUrl: options.openFrameUrl
  };
  this._state = options.state;

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
  this._bus.on(events.DISPATCH_FRAME_REPORT, function (res) {
    this.close();

    if (this._onCompleteCallback) {
      this._onCompleteCallback.call(null, res.err, res.payload);
    }

    this._onCompleteCallback = null;
  }.bind(this));

  this._bus.on(Bus.events.CONFIGURATION_REQUEST, function (reply) {
    reply(this._state);
  }.bind(this));
};

FrameService.prototype.open = function (callback) {
  this._onCompleteCallback = callback;

  this._frame = popup.open(this._options);
  this._pollForPopupClose();
};

FrameService.prototype.redirect = function (url) {
  if (this._frame && !this.isFrameClosed()) {
    this._frame.location.href = url;
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

FrameService.prototype.teardown = function () {
  this.close();
  this._dispatchFrame.parentNode.removeChild(this._dispatchFrame);
  this._dispatchFrame = null;
  this._cleanupFrame();
};

FrameService.prototype.isFrameClosed = function () {
  return this._frame == null || this._frame.closed;
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

module.exports = FrameService;

},{"../../bus":44,"../../error":53,"../../uuid":72,"../shared/constants":61,"../shared/errors":62,"../shared/events":63,"./popup":58,"iframer":3}],56:[function(_dereq_,module,exports){
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

},{"./frame-service":55}],57:[function(_dereq_,module,exports){
'use strict';

var constants = _dereq_('../../shared/constants');
var position = _dereq_('./position');

module.exports = function composePopupOptions() {
  return [
    constants.POPUP_BASE_OPTIONS,
    'top=' + position.top(),
    'left=' + position.left()
  ].join(',');
};

},{"../../shared/constants":61,"./position":60}],58:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  open: _dereq_('./open')
};

},{"./open":59}],59:[function(_dereq_,module,exports){
(function (global){
'use strict';

var composeOptions = _dereq_('./compose-options');

module.exports = function openPopup(options) {
  return global.open(
    options.openFrameUrl,
    options.name,
    composeOptions()
  );
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./compose-options":57}],60:[function(_dereq_,module,exports){
(function (global){
'use strict';

var constants = _dereq_('../../shared/constants');

function top() {
  var windowHeight = global.outerHeight || document.documentElement.clientHeight;
  var windowTop = global.screenY == null ? global.screenTop : global.screenY;

  return center(windowHeight, constants.POPUP_HEIGHT, windowTop);
}

function left() {
  var windowWidth = global.outerWidth || document.documentElement.clientWidth;
  var windowLeft = global.screenX == null ? global.screenLeft : global.screenX;

  return center(windowWidth, constants.POPUP_WIDTH, windowLeft);
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
},{"../../shared/constants":61}],61:[function(_dereq_,module,exports){
'use strict';

var POPUP_HEIGHT = 535;
var POPUP_WIDTH = 450;

module.exports = {
  DISPATCH_FRAME_NAME: 'dispatch',
  DISPATCH_FRAME_CLASS: 'braintree-dispatch-frame',
  POPUP_BASE_OPTIONS: 'resizable,scrollbars,height=' + POPUP_HEIGHT + ',width=' + POPUP_WIDTH,
  POPUP_WIDTH: POPUP_WIDTH,
  POPUP_HEIGHT: POPUP_HEIGHT,
  POPUP_POLL_INTERVAL: 100,
  POPUP_CLOSE_TIMEOUT: 100
};

},{}],62:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../error');

module.exports = {
  FRAME_SERVICE_FRAME_CLOSED: {
    type: BraintreeError.types.INTERNAL,
    code: 'FRAME_SERVICE_FRAME_CLOSED',
    message: 'Frame closed before tokenization could occur.'
  }
};

},{"../../error":53}],63:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../enumerate');

module.exports = enumerate([
  'DISPATCH_FRAME_READY',
  'DISPATCH_FRAME_REPORT'
], 'frameService:');

},{"../../enumerate":52}],64:[function(_dereq_,module,exports){
'use strict';

module.exports = function isIos(userAgent) {
  userAgent = userAgent || navigator.userAgent;
  return /(iPad|iPhone|iPod)/i.test(userAgent);
};

},{}],65:[function(_dereq_,module,exports){
'use strict';

var parser;
var legalHosts = {
  'paypal.com': 1,
  'braintreepayments.com': 1,
  'braintreegateway.com': 1
};

/* eslint-enable no-undef,block-scoped-var */

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

},{}],66:[function(_dereq_,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],67:[function(_dereq_,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],68:[function(_dereq_,module,exports){
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

},{}],69:[function(_dereq_,module,exports){
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
  atob: atobNormalized,
  _atob: atob
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],70:[function(_dereq_,module,exports){
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
},{}],71:[function(_dereq_,module,exports){
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

},{"../errors":29,"./error":53}],72:[function(_dereq_,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],73:[function(_dereq_,module,exports){
'use strict';

var frameService = _dereq_('../../lib/frame-service/external');
var BraintreeError = _dereq_('../../lib/error');
var once = _dereq_('../../lib/once');
var VERSION = "3.5.0";
var constants = _dereq_('../shared/constants');
var INTEGRATION_TIMEOUT_MS = _dereq_('../../lib/constants').INTEGRATION_TIMEOUT_MS;
var analytics = _dereq_('../../lib/analytics');
var throwIfNoCallback = _dereq_('../../lib/throw-if-no-callback');
var methods = _dereq_('../../lib/methods');
var deferred = _dereq_('../../lib/deferred');
var errors = _dereq_('../shared/errors');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var querystring = _dereq_('../../lib/querystring');

/**
 * @typedef {object} PayPal~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `PayPalAccount`.
 * @property {object} details Additional PayPal account details.
 * @property {string} details.email User's email address.
 * @property {string} details.payerId User's payer ID, the unique identifier for each PayPal account.
 * @property {string} details.firstName User's given name.
 * @property {string} details.lastName User's surname.
 * @property {?string} details.countryCode User's 2 character country code.
 * @property {?string} details.phone User's phone number (e.g. 555-867-5309).
 * @property {?object} details.shippingAddress User's shipping address details, only available if shipping address is enabled.
 * @property {string} details.shippingAddress.recipientName Recipient of postage.
 * @property {string} details.shippingAddress.line1 Street number and name.
 * @property {string} details.shippingAddress.line2 Extended address.
 * @property {string} details.shippingAddress.city City or locality.
 * @property {string} details.shippingAddress.state State or region.
 * @property {string} details.shippingAddress.postalCode Postal code.
 * @property {string} details.shippingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} details.billingAddress User's billing address details.
 * You will also need to enable the PayPal Billing Address Request feature in your PayPal account.
 * To enable this feature, [contact PayPal](https://developers.braintreepayments.com/support/guides/paypal/setup-guide#contacting-paypal-support).
 * @property {string} details.billingAddress.line1 Street number and name.
 * @property {string} details.billingAddress.line2 Extended address.
 * @property {string} details.billingAddress.city City or locality.
 * @property {string} details.billingAddress.state State or region.
 * @property {string} details.billingAddress.postalCode Postal code.
 * @property {string} details.billingAddress.countryCode 2 character country code (e.g. US).
 */

/**
 * @typedef {object} PayPal~tokenizeReturn
 * @property {Function} close A handle to close the PayPal checkout flow.
 * @property {Function} focus A handle to focus the PayPal checkout flow. Note that some browsers (notably iOS Safari) do not support focusing popups. Firefox requires the focus call to occur as the result of a user interaction, such as a button click.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/paypal.create|paypal.create}
 * @classdesc This class represents a PayPal component. Instances of this class have methods for launching auth dialogs and other programmatic interactions with the PayPal component.
 */
function PayPal(options) {
  this._client = options.client;
  this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.paypal.assetsUrl + '/web/' + VERSION;
  this._authorizationInProgress = false;
}

PayPal.prototype._initialize = function (callback) {
  var client = this._client;
  var failureTimeout = setTimeout(function () {
    analytics.sendEvent(client, 'web.paypal.load.timed-out');
  }, INTEGRATION_TIMEOUT_MS);

  frameService.create({
    name: constants.LANDING_FRAME_NAME,
    dispatchFrameUrl: this._assetsUrl + '/html/dispatch-frame.html',
    openFrameUrl: this._assetsUrl + '/html/paypal-landing-frame.html'
  }, function (service) {
    this._frameService = service;
    clearTimeout(failureTimeout);
    analytics.sendEvent(client, 'web.paypal.load.succeeded');
    callback();
  }.bind(this));
};

/**
 * Launches the PayPal login flow and returns a nonce payload. Only one PayPal login flow should be active at a time. One way to achieve this is to disable your PayPal button while the flow is open.
 * @public
 * @param {object} options All tokenization options for the PayPal component.
 * @param {string} options.flow Set to 'checkout' for one-time payment flow, or 'vault' for Vault flow. If 'vault' is used with a client token generated with a customer id, the PayPal account will be added to that customer as a saved payment method.
 * @param {string} [options.intent=authorize]
 * Checkout flows only.
 * * `authorize` - Submits the transaction for authorization but not settlement.
 * * `sale` - Payment will be immediately submitted for settlement upon creating a transaction.
 * @param {boolean} [options.offerCredit=false] Offers the customer PayPal Credit if they qualify. Checkout flows only.
 * @param {string} [options.useraction]
 * This option only applies to the "checkout" flow and will have no effect on the "vault" flow.
 *
 * Changes the call-to-action in the PayPal flow. By default the final button will show the localized
 * word for "Continue" and implies that the final amount billed is not yet known.
 *
 * Setting this option to `commit` changes the button text to "Pay Now" and page text will convey to
 * the user that billing will take place immediately.
 * @param {string|number} [options.amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [options.currency] The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {string} [options.displayName] The merchant name displayed inside of the PayPal lightbox; defaults to the company name on your Braintree account
 * @param {string} [options.locale=en_US] Use this option to change the language, links, and terminology used in the PayPal flow to suit the country and language of your customer.
 * @param {boolean} [options.enableShippingAddress=false] Returns a shipping address object in {@link PayPal#tokenize}.
 * @param {object} [options.shippingAddressOverride] Allows you to pass a shipping address you have already collected into the PayPal payment flow.
 * @param {string} options.shippingAddressOverride.line1 Street address.
 * @param {string} [options.shippingAddressOverride.line2] Street address (extended).
 * @param {string} options.shippingAddressOverride.city City.
 * @param {string} options.shippingAddressOverride.state State.
 * @param {string} options.shippingAddressOverride.postalCode Postal code.
 * @param {string} options.shippingAddressOverride.countryCode Country.
 * @param {string} [options.shippingAddressOverride.phone] Phone number.
 * @param {string} [options.shippingAddressOverride.recipientName] Recipient's name.
 * @param {boolean} [options.shippingAddressEditable=true] Set to false to disable user editing of the shipping address.
 * @param {string} [options.billingAgreementDescription] Use this option to set the description of the preapproved payment agreement visible to customers in their PayPal profile during Vault flows. Max 255 characters.
 * @param {callback} callback The second argument, <code>data</code>, is a {@link PayPal~tokenizePayload|tokenizePayload}.
 * @example
 * button.addEventListener('click', function () {
 *   // Disable the button so that we don't attempt to open multiple popups.
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because PayPal tokenization opens a popup, this must be called
 *   // as a result of a user action, such as a button click.
 *   paypalInstance.tokenize({
 *     flow: 'vault' // Required
 *     // Any other tokenization options
 *   }, function (tokenizeErr, payload) {
 *     button.removeAttribute('disabled');
 *
 *     if (tokenizeErr) {
 *       // Handle tokenization errors or premature flow closure
 *
 *       switch (tokenizeErr.code) {
 *         case 'PAYPAL_POPUP_CLOSED':
 *           console.error('Customer closed PayPal popup.');
 *           break;
 *         case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
 *           console.error('PayPal tokenization failed. See details:', tokenizeErr.details);
 *           break;
 *         case 'PAYPAL_FLOW_FAILED':
 *           console.error('Unable to initialize PayPal flow. Are your options correct?', tokenizeErr.details);
 *           break;
 *         default:
 *           console.error('Error!', tokenizeErr);
 *       }
 *     } else {
 *       // Submit payload.nonce to your server
 *     }
 *   });
 * });
 * @returns {PayPal~tokenizeReturn} A handle to manage the PayPal checkout frame.
 */
PayPal.prototype.tokenize = function (options, callback) {
  var client = this._client;

  throwIfNoCallback(callback, 'tokenize');

  callback = once(deferred(callback));

  if (this._authorizationInProgress) {
    analytics.sendEvent(client, 'web.paypal.tokenization.error.already-opened');

    callback(new BraintreeError(errors.PAYPAL_TOKENIZATION_REQUEST_ACTIVE));
  } else {
    this._authorizationInProgress = true;

    analytics.sendEvent(client, 'web.paypal.tokenization.opened');
    this._navigateFrameToAuth(options, callback);
    // This MUST happen after _navigateFrameToAuth for Metro browsers to work.
    this._frameService.open(this._createFrameServiceCallback(options, callback));
  }

  return {
    close: function () {
      analytics.sendEvent(client, 'web.paypal.tokenization.closed.by-merchant');
      this._frameService.close();
    }.bind(this),
    focus: function () {
      this._frameService.focus();
    }.bind(this)
  };
};

PayPal.prototype._createFrameServiceCallback = function (options, callback) {
  var client = this._client;

  return function (err, params) {
    this._authorizationInProgress = false;

    if (err) {
      if (err.code === 'FRAME_SERVICE_FRAME_CLOSED') {
        analytics.sendEvent(client, 'web.paypal.tokenization.closed.by-user');
      }

      callback(new BraintreeError(errors.PAYPAL_POPUP_CLOSED));
    } else {
      this._tokenizePayPal(options, params, callback);
    }
  }.bind(this);
};

PayPal.prototype._tokenizePayPal = function (options, params, callback) {
  var client = this._client;

  client.request({
    endpoint: 'payment_methods/paypal_accounts',
    method: 'post',
    data: this._formatTokenizeData(options, params)
  }, function (err, response) {
    if (err) {
      analytics.sendEvent(client, 'web.paypal.tokenization.failed');
      callback(err instanceof BraintreeError ? err : new BraintreeError({
        type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
        code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
        message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message,
        details: {
          originalError: err
        }
      }));
    } else {
      analytics.sendEvent(client, 'web.paypal.tokenization.success');
      callback(null, this._formatTokenizePayload(response));
    }
  }.bind(this));
};

PayPal.prototype._formatTokenizePayload = function (response) {
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

  if (account.details && account.details.payerInfo) {
    payload.details = account.details.payerInfo;
  }

  return payload;
};

PayPal.prototype._formatTokenizeData = function (options, params) {
  var clientConfiguration = this._client.getConfiguration();
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var isTokenizationKey = clientConfiguration.authorizationType === 'TOKENIZATION_KEY';
  var data = {
    paypalAccount: {
      correlationId: this._frameService._serviceId,
      options: {
        validate: options.flow === 'vault' && !isTokenizationKey
      }
    }
  };

  if (params.ba_token) {
    data.paypalAccount.billingAgreementToken = params.ba_token;
  } else {
    data.paypalAccount.paymentToken = params.paymentId;
    data.paypalAccount.payerId = params.PayerID;
    data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;

    if (options.hasOwnProperty('intent')) {
      data.paypalAccount.intent = options.intent;
    }
  }

  return data;
};

PayPal.prototype._navigateFrameToAuth = function (options, callback) {
  var client = this._client;
  var endpoint = 'paypal_hermes/';

  if (options.flow === 'checkout') {
    endpoint += 'create_payment_resource';
  } else if (options.flow === 'vault') {
    endpoint += 'setup_billing_agreement';
  } else {
    callback(new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED));
    return;
  }

  client.request({
    endpoint: endpoint,
    method: 'post',
    data: this._formatPaymentResourceData(options)
  }, function (err, response, status) {
    var redirectUrl;

    if (err) {
      if (status === 422) {
        callback(new BraintreeError({
          type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
          code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
          message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
          details: {
            originalError: err
          }
        }));
      } else {
        callback(err instanceof BraintreeError ? err : new BraintreeError({
          type: errors.PAYPAL_FLOW_FAILED.type,
          code: errors.PAYPAL_FLOW_FAILED.code,
          message: errors.PAYPAL_FLOW_FAILED.message,
          details: {
            originalError: err
          }
        }));
      }
      this._frameService.close();
    } else {
      if (options.flow === 'checkout') {
        redirectUrl = response.paymentResource.redirectUrl;
      } else {
        redirectUrl = response.agreementSetup.approvalUrl;
      }

      if (options.useraction === 'commit') {
        redirectUrl = querystring.queryify(redirectUrl, {useraction: 'commit'});
      }

      this._frameService.redirect(redirectUrl);
    }
  }.bind(this));
};

PayPal.prototype._formatPaymentResourceData = function (options) {
  var key;
  var gatewayConfiguration = this._client.getConfiguration().gatewayConfiguration;
  var serviceId = this._frameService._serviceId;
  var paymentResource = {
    returnUrl: gatewayConfiguration.paypal.assetsUrl + '/web/' + VERSION + '/html/paypal-redirect-frame.html?channel=' + serviceId,
    cancelUrl: gatewayConfiguration.paypal.assetsUrl + '/web/' + VERSION + '/html/paypal-cancel-frame.html?channel=' + serviceId,
    correlationId: serviceId,
    experienceProfile: {
      brandName: options.displayName || gatewayConfiguration.paypal.displayName,
      localeCode: options.locale,
      noShipping: (!options.enableShippingAddress).toString(),
      addressOverride: options.shippingAddressEditable === false
    }
  };

  if (options.flow === 'checkout') {
    paymentResource.amount = options.amount;
    paymentResource.currencyIsoCode = options.currency;
    paymentResource.offerPaypalCredit = options.offerCredit === true;

    if (options.hasOwnProperty('intent')) {
      paymentResource.intent = options.intent;
    }

    for (key in options.shippingAddressOverride) {
      if (options.shippingAddressOverride.hasOwnProperty(key)) {
        paymentResource[key] = options.shippingAddressOverride[key];
      }
    }
  } else {
    paymentResource.shippingAddress = options.shippingAddressOverride;

    if (options.billingAgreementDescription) {
      paymentResource.description = options.billingAgreementDescription;
    }
  }

  return paymentResource;
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/paypal.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @returns {void}
 */
PayPal.prototype.teardown = function (callback) {
  this._frameService.teardown();

  convertMethodsToError(this, methods(PayPal.prototype));

  analytics.sendEvent(this._client, 'web.paypal.teardown-completed');

  if (typeof callback === 'function') {
    callback = deferred(callback);
    callback();
  }
};

module.exports = PayPal;

},{"../../lib/analytics":39,"../../lib/constants":47,"../../lib/convert-methods-to-error":48,"../../lib/deferred":50,"../../lib/error":53,"../../lib/frame-service/external":56,"../../lib/methods":67,"../../lib/once":68,"../../lib/querystring":70,"../../lib/throw-if-no-callback":71,"../shared/constants":75,"../shared/errors":76}],74:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/paypal */

var analytics = _dereq_('../lib/analytics');
var BraintreeError = _dereq_('../lib/error');
var browserDetection = _dereq_('../lib/browser-detection');
var deferred = _dereq_('../lib/deferred');
var errors = _dereq_('./shared/errors');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var PayPal = _dereq_('./external/paypal');
var sharedErrors = _dereq_('../errors');
var VERSION = "3.5.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} callback The second argument, `data`, is the {@link PayPal} instance.
 * @example
 * braintree.paypal.create(
 *   client: clientInstance
 * }, function (createErr, paypalInstance) {
 *   if (createErr) {
 *     if (createErr.code === 'PAYPAL_BROWSER_NOT_SUPPORTED') {
 *       console.error('This browser is not supported.');
 *     } else {
 *       console.error('Error!', createErr);
 *     }
 *   }
 * }
 * @returns {void}
 */
function create(options, callback) {
  var config, pp, clientVersion;

  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  if (options.client == null) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating PayPal.'
    }));
    return;
  }

  config = options.client.getConfiguration();
  clientVersion = config.analyticsMetadata.sdkVersion;

  if (clientVersion !== VERSION) {
    callback(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and PayPal (version ' + VERSION + ') components must be from the same SDK version.'
    }));
    return;
  }

  if (config.gatewayConfiguration.paypalEnabled !== true) {
    callback(new BraintreeError(errors.PAYPAL_NOT_ENABLED));
    return;
  }

  if (!browserDetection.supportsPopups()) {
    callback(new BraintreeError(errors.PAYPAL_BROWSER_NOT_SUPPORTED));
    return;
  }

  analytics.sendEvent(options.client, 'web.paypal.initialized');

  pp = new PayPal(options);
  pp._initialize(function () {
    callback(null, pp);
  });
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../errors":29,"../lib/analytics":39,"../lib/browser-detection":41,"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./external/paypal":73,"./shared/errors":76}],75:[function(_dereq_,module,exports){
'use strict';

var POPUP_HEIGHT = 535;
var POPUP_WIDTH = 450;

module.exports = {
  AUTH_INIT_ERROR_MESSAGE: 'Could not initialize PayPal flow.',
  LANDING_FRAME_NAME: 'braintreepaypallanding',
  POPUP_BASE_OPTIONS: 'resizable,scrollbars,height=' + POPUP_HEIGHT + ',width=' + POPUP_WIDTH,
  POPUP_WIDTH: POPUP_WIDTH,
  POPUP_HEIGHT: POPUP_HEIGHT,
  POPUP_POLL_INTERVAL: 100
};

},{}],76:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/error');

module.exports = {
  PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_NOT_ENABLED',
    message: 'PayPal is not enabled for this merchant.'
  },
  PAYPAL_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_TOKENIZATION_REQUEST_ACTIVE',
    message: 'Another tokenization request is active.'
  },
  PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s PayPal account.'
  },
  PAYPAL_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_FLOW_FAILED',
    message: 'Could not initialize PayPal flow.'
  },
  PAYPAL_FLOW_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_FLOW_OPTION_REQUIRED',
    message: 'PayPal flow property is invalid or missing.'
  },
  PAYPAL_BROWSER_NOT_SUPPORTED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'PAYPAL_BROWSER_NOT_SUPPORTED',
    message: 'Browser is not supported.'
  },
  PAYPAL_POPUP_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'PAYPAL_POPUP_CLOSED',
    message: 'Customer closed PayPal popup before authorizing.'
  },
  PAYPAL_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_INVALID_PAYMENT_OPTION',
    message: 'PayPal payment options are invalid.'
  }
};

},{"../../lib/error":53}],77:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/error');
var analytics = _dereq_('../../lib/analytics');
var methods = _dereq_('../../lib/methods');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var constants = _dereq_('../shared/constants');
var Bus = _dereq_('../../lib/bus');
var uuid = _dereq_('../../lib/uuid');
var deferred = _dereq_('../../lib/deferred');
var errors = _dereq_('../shared/errors');
var throwIfNoCallback = _dereq_('../../lib/throw-if-no-callback');
var events = _dereq_('../shared/events');
var version = "3.5.0";
var iFramer = _dereq_('iframer');

var IFRAME_HEIGHT = 400;
var IFRAME_WIDTH = 400;

/**
 * @typedef {object} ThreeDSecure~verifyPayload
 * @property {string} nonce The new payment method nonce produced by the 3D Secure lookup. The original nonce passed into {@link ThreeDSecure#verifyCard|verifyCard} was consumed. This new nonce should be used to transact on your server.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {boolean} liabilityShiftPossible Indicates whether the card was eligible for 3D Secure.
 * @property {boolean} liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 */

/**
 * @class
 * @param {object} options 3D Secure {@link module:braintree-web/three-d-secure.create create} options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create} instead.</strong>
 * @classdesc This class represents a ThreeDSecure component produced by {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create}. Instances of this class have a method for launching a 3D Secure authentication flow.
 */
function ThreeDSecure(options) {
  this._options = options;
  this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.assetsUrl;
  this._client = options.client;
}

/**
 * @callback ThreeDSecure~addFrameCallback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {HTMLIFrameElement} iframe An iframe element containing the bank's authentication page that you must put on your page.
 * @description The callback used for options.addFrame in {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @callback ThreeDSecure~removeFrameCallback
 * @description The callback used for options.removeFrame in {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * Launch the 3D Secure login flow, returning a nonce payload.
 * @public
 * @param {object} options Options for card verification.
 * @param {string} options.nonce A nonce referencing the card to be verified. For example, this can be a nonce that was returned by Hosted Fields.
 * @param {number} options.amount The amount of the transaction in the current merchant account's currency. For example, if you are running a transaction of $123.45 US dollars, `amount` would be 123.45.
 * @param {errback} options.addFrame This {@link ThreeDSecure~addFrameCallback|addFrameCallback} will be called when the bank frame needs to be added to your page.
 * @param {callback} options.removeFrame This {@link ThreeDSecure~removeFrameCallback|removeFrameCallback} will be called when the bank frame needs to be removed from your page.
 * @param {errback} callback The second argument, <code>data</code>, is a {@link ThreeDSecure~verifyPayload|verifyPayload}
 * @returns {void}
 * @example
 * <caption>Verifying an existing nonce with 3DS</caption>
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
ThreeDSecure.prototype.verifyCard = function (options, callback) {
  var url, addFrame, removeFrame, error, errorOption;

  throwIfNoCallback(callback, 'verifyCard');

  options = options || {};
  callback = deferred(callback);

  if (this._verifyCardInProgress === true) {
    error = errors.THREEDS_AUTHENTICATION_IN_PROGRESS;
  } else if (!options.nonce) {
    errorOption = 'a nonce';
  } else if (!options.amount) {
    errorOption = 'an amount';
  } else if (typeof options.addFrame !== 'function') {
    errorOption = 'an addFrame function';
  } else if (typeof options.removeFrame !== 'function') {
    errorOption = 'a removeFrame function';
  }

  if (errorOption) {
    error = {
      type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
      code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
      message: 'verifyCard options must include ' + errorOption + '.'
    };
  }

  if (error) {
    callback(new BraintreeError(error));
    return;
  }

  this._verifyCardInProgress = true;

  addFrame = deferred(options.addFrame);
  removeFrame = deferred(options.removeFrame);

  url = 'payment_methods/' + options.nonce + '/three_d_secure/lookup';

  this._client.request({
    endpoint: url,
    method: 'post',
    data: {amount: options.amount}
  }, function (err, response) {
    if (err) {
      callback(err);
      return;
    }

    this._lookupPaymentMethod = response.paymentMethod;
    this._verifyCardCallback = function () {
      this._verifyCardInProgress = false;

      callback.apply(null, arguments);
    }.bind(this);

    this._handleLookupResponse({
      lookupResponse: response,
      addFrame: addFrame,
      removeFrame: removeFrame
    });
  }.bind(this));
};

/**
 * Cancel the 3DS flow and return the verification payload if available.
 * @public
 * @param {errback} callback The second argument is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If there is no verifyPayload (the initial lookup did not complete), an error will be returned.
 * @returns {void}
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
ThreeDSecure.prototype.cancelVerifyCard = function (callback) {
  var error;

  this._verifyCardInProgress = false;

  if (typeof callback === 'function') {
    if (!this._lookupPaymentMethod) {
      error = new BraintreeError(errors.THREEDS_NO_VERIFICATION_PAYLOAD);
    }

    callback(error, this._lookupPaymentMethod);
  }
};

ThreeDSecure.prototype._handleLookupResponse = function (options) {
  var lookupResponse = options.lookupResponse;

  if (lookupResponse.lookup && lookupResponse.lookup.acsUrl && lookupResponse.lookup.acsUrl.length > 0) {
    options.addFrame(null, this._createIframe({
      response: lookupResponse.lookup,
      removeFrame: options.removeFrame
    }));
  } else {
    this._verifyCardCallback(null, {
      nonce: lookupResponse.paymentMethod.nonce,
      verificationDetails: lookupResponse.threeDSecureInfo
    });
  }
};

ThreeDSecure.prototype._createIframe = function (options) {
  var url, authenticationCompleteBaseUrl;
  var parentURL = window.location.href;
  var response = options.response;

  this._bus = new Bus({
    channel: uuid(),
    merchantUrl: location.href
  });

  authenticationCompleteBaseUrl = this._assetsUrl + '/web/' + version + '/html/three-d-secure-authentication-complete-frame.html?channel=' + encodeURIComponent(this._bus.channel) + '&';

  if (parentURL.indexOf('#') > -1) {
    parentURL = parentURL.split('#')[0];
  }

  this._bus.on(Bus.events.CONFIGURATION_REQUEST, function (reply) {
    reply({
      acsUrl: response.acsUrl,
      pareq: response.pareq,
      termUrl: response.termUrl + '&three_d_secure_version=' + version + '&authentication_complete_base_url=' + encodeURIComponent(authenticationCompleteBaseUrl),
      md: response.md,
      parentUrl: parentURL
    });
  });

  this._bus.on(events.AUTHENTICATION_COMPLETE, function (data) {
    this._handleAuthResponse(data, options);
  }.bind(this));

  url = this._assetsUrl + '/web/' + version + '/html/three-d-secure-bank-frame.html';

  this._bankIframe = iFramer({
    src: url,
    height: IFRAME_HEIGHT,
    width: IFRAME_WIDTH,
    name: constants.LANDING_FRAME_NAME + '_' + this._bus.channel
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
    details: paymentMethod.details,
    description: paymentMethod.description,
    liabilityShifted: threeDSecureInfo.liabilityShifted,
    liabilityShiftPossible: threeDSecureInfo.liabilityShiftPossible
  };
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/three-d-secure.create|create}
 * @public
 * @param {errback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @returns {void}
 */
ThreeDSecure.prototype.teardown = function (callback) {
  var iframeParent;

  convertMethodsToError(this, methods(ThreeDSecure.prototype));

  analytics.sendEvent(this._options.client, 'web.threedsecure.teardown-completed');

  if (this._bus) {
    this._bus.teardown();
  }

  if (this._bankIframe) {
    iframeParent = this._bankIframe.parentNode;

    if (iframeParent) {
      iframeParent.removeChild(this._bankIframe);
    }
  }

  if (typeof callback === 'function') {
    callback = deferred(callback);
    callback();
  }
};

module.exports = ThreeDSecure;

},{"../../lib/analytics":39,"../../lib/bus":44,"../../lib/convert-methods-to-error":48,"../../lib/deferred":50,"../../lib/error":53,"../../lib/methods":67,"../../lib/throw-if-no-callback":71,"../../lib/uuid":72,"../shared/constants":79,"../shared/errors":80,"../shared/events":81,"iframer":3}],78:[function(_dereq_,module,exports){
'use strict';
/** @module braintree-web/three-d-secure */

var ThreeDSecure = _dereq_('./external/three-d-secure');
var browserDetection = _dereq_('../lib/browser-detection');
var BraintreeError = _dereq_('../lib/error');
var analytics = _dereq_('../lib/analytics');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var deferred = _dereq_('../lib/deferred');
var errors = _dereq_('./shared/errors');
var sharedErrors = _dereq_('../errors');
var VERSION = "3.5.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} callback The second argument, `data`, is the {@link ThreeDSecure} instance.
 * @returns {void}
 * @example
 * braintree.threeDSecure.create({
 *   client: client
 * }, callback);
 */
function create(options, callback) {
  var config, threeDSecure, error, clientVersion;

  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  if (options.client == null) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating 3D Secure.'
    }));
    return;
  }

  config = options.client.getConfiguration();
  clientVersion = config.analyticsMetadata.sdkVersion;

  if (!config.gatewayConfiguration.threeDSecureEnabled) {
    error = errors.THREEDS_NOT_ENABLED;
  } else if (config.analyticsMetadata.sdkVersion !== VERSION) {
    error = {
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and 3D Secure (version ' + VERSION + ') components must be from the same SDK version.'
    };
  } else if (!browserDetection.isHTTPS()) {
    error = errors.THREEDS_HTTPS_REQUIRED;
  }

  if (error) {
    callback(new BraintreeError(error));
    return;
  }

  analytics.sendEvent(options.client, 'web.threedsecure.initialized');

  try {
    threeDSecure = new ThreeDSecure(options);
  } catch (err) {
    callback(err);
    return;
  }

  callback(null, threeDSecure);
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../errors":29,"../lib/analytics":39,"../lib/browser-detection":41,"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./external/three-d-secure":77,"./shared/errors":80}],79:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  LANDING_FRAME_NAME: 'braintreethreedsecurelanding'
};

},{}],80:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/error');

module.exports = {
  THREEDS_AUTHENTICATION_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_AUTHENTICATION_IN_PROGRESS',
    message: 'Cannot call verifyCard while existing authentication is in progress.'
  },
  THREEDS_MISSING_VERIFY_CARD_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_MISSING_VERIFY_CARD_OPTION'
  },
  THREEDS_NO_VERIFICATION_PAYLOAD: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NO_VERIFICATION_PAYLOAD',
    message: 'No verification payload available.'
  },
  THREEDS_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NOT_ENABLED',
    message: '3D Secure is not enabled for this merchant.'
  },
  THREEDS_HTTPS_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_HTTPS_REQUIRED',
    message: '3D Secure requires HTTPS.'
  },
  THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
    type: BraintreeError.types.INTERNAL,
    code: 'THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN',
    message: 'Term Url must be on a Braintree domain.'
  }
};

},{"../../lib/error":53}],81:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');

module.exports = enumerate([
  'AUTHENTICATION_COMPLETE'
], 'threedsecure:');

},{"../../lib/enumerate":52}],82:[function(_dereq_,module,exports){
'use strict';
/**
 * @module braintree-web/unionpay
 * @description This module allows you to accept UnionPay payments. *It is currently in beta and is subject to change.*
 */

var UnionPay = _dereq_('./shared/unionpay');
var BraintreeError = _dereq_('../lib/error');
var analytics = _dereq_('../lib/analytics');
var deferred = _dereq_('../lib/deferred');
var throwIfNoCallback = _dereq_('../lib/throw-if-no-callback');
var errors = _dereq_('./shared/errors');
var sharedErrors = _dereq_('../errors');
var VERSION = "3.5.0";

/**
* @static
* @function create
* @param {object} options Creation options:
* @param {Client} options.client A {@link Client} instance.
* @param {callback} callback The second argument, `data`, is the {@link UnionPay} instance.
* @returns {void}
* @example
* braintree.unionpay.create({ client: clientInstance }, function (createErr, unionpayInstance) {
*   if (createErr) {
*     console.error(createErr);
*     return;
*   }
*   // ...
* });
*/
function create(options, callback) {
  var config, clientVersion;

  throwIfNoCallback(callback, 'create');

  callback = deferred(callback);

  if (options.client == null) {
    callback(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating UnionPay.'
    }));
    return;
  }

  config = options.client.getConfiguration();
  clientVersion = config.analyticsMetadata.sdkVersion;

  if (clientVersion !== VERSION) {
    callback(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and UnionPay (version ' + VERSION + ') components must be from the same SDK version.'
    }));
    return;
  }

  if (!config.gatewayConfiguration.unionPay || config.gatewayConfiguration.unionPay.enabled !== true) {
    callback(new BraintreeError(errors.UNIONPAY_NOT_ENABLED));
    return;
  }

  analytics.sendEvent(options.client, 'web.unionpay.initialized');

  callback(null, new UnionPay(options));
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../errors":29,"../lib/analytics":39,"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./shared/errors":84,"./shared/unionpay":85}],83:[function(_dereq_,module,exports){
'use strict';

var enumerate = _dereq_('../../lib/enumerate');

module.exports = {
  events: enumerate([
    'HOSTED_FIELDS_FETCH_CAPABILITIES',
    'HOSTED_FIELDS_ENROLL',
    'HOSTED_FIELDS_TOKENIZE'
  ], 'union-pay:'),
  HOSTED_FIELDS_FRAME_NAME: 'braintreeunionpayhostedfields'
};

},{"../../lib/enumerate":52}],84:[function(_dereq_,module,exports){
'use strict';

var BraintreeError = _dereq_('../../lib/error');

module.exports = {
  UNIONPAY_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_NOT_ENABLED',
    message: 'UnionPay is not enabled for this merchant.'
  },
  UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID',
    message: 'Found an invalid Hosted Fields instance. Please use a valid Hosted Fields instance.'
  },
  UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED',
    message: 'Could not find the Hosted Fields instance.'
  },
  UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED',
    message: 'A card or a Hosted Fields instance is required. Please supply a card or a Hosted Fields instance.'
  },
  UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES',
    message: 'Please supply either a card or a Hosted Fields instance, not both.'
  },
  UNIONPAY_EXPIRATION_DATE_INCOMPLETE: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_EXPIRATION_DATE_INCOMPLETE',
    message: 'You must supply expiration month and year or neither.'
  },
  UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID: {
    type: BraintreeError.types.CUSTOMER,
    code: 'UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID',
    message: 'Enrollment failed due to user input error.'
  },
  UNIONPAY_ENROLLMENT_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'UNIONPAY_ENROLLMENT_NETWORK_ERROR',
    message: 'Could not enroll UnionPay card.'
  },
  UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR',
    message: 'Could not fetch card capabilities.'
  },
  UNIONPAY_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'UNIONPAY_TOKENIZATION_NETWORK_ERROR',
    message: 'A tokenization network error occurred.'
  },
  UNIONPAY_MISSING_MOBILE_PHONE_DATA: {
    type: BraintreeError.types.MERCHANT,
    code: 'UNIONPAY_MISSING_MOBILE_PHONE_DATA',
    message: 'A `mobile` with `countryCode` and `number` is required.'
  },
  UNIONPAY_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: 'UNIONPAY_FAILED_TOKENIZATION',
    message: 'The supplied card data failed tokenization.'
  }
};

},{"../../lib/error":53}],85:[function(_dereq_,module,exports){
'use strict';

var analytics = _dereq_('../../lib/analytics');
var BraintreeError = _dereq_('../../lib/error');
var Bus = _dereq_('../../lib/bus');
var constants = _dereq_('./constants');
var convertMethodsToError = _dereq_('../../lib/convert-methods-to-error');
var deferred = _dereq_('../../lib/deferred');
var errors = _dereq_('./errors');
var events = constants.events;
var iFramer = _dereq_('iframer');
var methods = _dereq_('../../lib/methods');
var VERSION = "3.5.0";
var uuid = _dereq_('../../lib/uuid');
var throwIfNoCallback = _dereq_('../../lib/throw-if-no-callback');

/**
 * @class
 * @param {object} options See {@link module:braintree-web/unionpay.create|unionpay.create}.
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/unionpay.create|braintree-web.unionpay.create} instead.</strong>
 * @classdesc This class represents a UnionPay component. Instances of this class have methods for {@link UnionPay#fetchCapabilities fetching capabilities} of UnionPay cards, {@link UnionPay#enroll enrolling} a UnionPay card, and {@link UnionPay#tokenize tokenizing} a UnionPay card.
 */
function UnionPay(options) {
  this._options = options;
}

/**
 * @typedef {object} UnionPay~fetchCapabilitiesPayload
 * @property {boolean} isUnionPay Determines if this card is a UnionPay card.
 * @property {boolean} isDebit Determines if this card is a debit card. This property is only present if `isUnionPay` is `true`.
 * @property {object} unionPay UnionPay specific properties. This property is only present if `isUnionPay` is `true`.
 * @property {boolean} unionPay.supportsTwoStepAuthAndCapture Determines if the card allows for an authorization, but settling the transaction later.
 * @property {boolean} unionPay.isSupported Determines if Braintree can process this UnionPay card. When false, Braintree cannot process this card and the user should use a different card.
 */

/**
 * Fetches the capabilities of a card, including whether or not the SMS enrollment process is required.
 * @public
 * @param {object} options UnionPay {@link UnionPay#fetchCapabilities fetchCapabilities} options
 * @param {object} [options.card] The card from which to fetch capabilities. Note that this will only have one property, `number`. Required if you are not using the `hostedFields` option.
 * @param {string} options.card.number Card number.
 * @param {HostedFields} [options.hostedFields] The Hosted Fields instance used to collect card data. Required if you are not using the `card` option.
 * @param {callback} callback The second argument, <code>data</code>, is a {@link UnionPay#fetchCapabilitiesPayload fetchCapabilitiesPayload}.
 * @example <caption>With raw card data</caption>
 * unionpayInstance.fetchCapabilities({
 *   card: {
 *     number: '4111111111111111'
 *   }
 * }, function (fetchErr, cardCapabilities) {
 *   if (fetchErr) {
 *     console.error(fetchErr);
 *     return;
 *   }
 *
 *   if (cardCapabilities.isUnionPay) {
 *     if (cardCapabilities.unionPay && !cardCapabilities.unionPay.isSupported) {
 *       // Braintree cannot process this UnionPay card.
 *       // Ask the user for a different card.
 *       return;
 *     }
 *
 *     if (cardCapabilities.isDebit) {
 *       // CVV and expiration date are not required
 *     } else {
 *       // CVV and expiration date are required
 *     }
 *
 *     // Show mobile phone number field for enrollment
 *   }
 * });
 * @example <caption>With Hosted Fields</caption>
 * // Fetch capabilities on `validityChange` inside of the Hosted Fields `create` callback
 * hostedFieldsInstance.on('validityChange', function (event) {
 *   // Only attempt to fetch capabilities when a valid card number has been entered
 *   if (event.emittedBy === 'number' && event.fields.number.isValid) {
 *     unionpayInstance.fetchCapabilities({
 *       hostedFields: hostedFieldsInstance
 *     }, function (fetchErr, cardCapabilities) {
 *       if (fetchErr) {
 *         console.error(fetchErr);
 *         return;
 *       }
 *
 *       if (cardCapabilities.isUnionPay) {
 *         if (cardCapabilities.unionPay && !cardCapabilities.unionPay.isSupported) {
 *           // Braintree cannot process this UnionPay card.
 *           // Ask the user for a different card.
 *           return;
 *         }
 *         if (cardCapabilities.isDebit) {
 *           // CVV and expiration date are not required
 *           // Hide the containers with your `cvv` and `expirationDate` fields
 *         } else {
 *           // CVV and expiration date are required
 *         }
 *       } else {
 *         // Not a UnionPay card
 *         // When form is complete, tokenize using your Hosted Fields instance
 *       }
 *
 *       // Show your own mobile country code and phone number inputs for enrollment
 *     });
 *   });
 * });
 * @returns {void}
 */
UnionPay.prototype.fetchCapabilities = function (options, callback) {
  var client = this._options.client;
  var cardNumber = options.card ? options.card.number : null;
  var hostedFields = options.hostedFields;

  throwIfNoCallback(callback, 'fetchCapabilities');

  callback = deferred(callback);

  if (cardNumber && hostedFields) {
    callback(new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES));
    return;
  } else if (cardNumber) {
    client.request({
      method: 'get',
      endpoint: 'payment_methods/credit_cards/capabilities',
      data: {
        _meta: {source: 'unionpay'},
        creditCard: {
          number: cardNumber
        }
      }
    }, function (err, response, status) {
      if (err) {
        if (status === 403) {
          callback(err);
        } else {
          callback(new BraintreeError({
            type: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.type,
            code: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.code,
            message: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.message,
            details: {
              originalError: err
            }
          }));
        }

        analytics.sendEvent(client, 'web.unionpay.capabilities-failed');
        return;
      }

      analytics.sendEvent(client, 'web.unionpay.capabilities-received');
      callback(null, response);
    });
  } else if (hostedFields) {
    if (!hostedFields._bus) {
      callback(new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));
      return;
    }

    this._initializeHostedFields(function () {
      this._bus.emit(events.HOSTED_FIELDS_FETCH_CAPABILITIES, {hostedFields: hostedFields}, function (response) {
        if (response.err) {
          callback(new BraintreeError(response.err));
          return;
        }

        callback(null, response.payload);
      });
    }.bind(this));
  } else {
    callback(new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED));
    return;
  }
};

/**
 * @typedef {object} UnionPay~enrollPayload
 * @property {string} enrollmentId UnionPay enrollment ID. This value should be passed to `tokenize`.
 * @property {boolean} smsCodeRequired UnionPay `smsCodeRequired` flag.
 * </p><b>true</b> - the user will receive an SMS code that needs to be supplied for tokenization.
 * </p><b>false</b> - the card can be immediately tokenized.
 */

/**
 * Enrolls a UnionPay card. Use {@link UnionPay#fetchCapabilities|fetchCapabilities} to determine if the SMS enrollment process is required.
 * @public
 * @param {object} options UnionPay enrollment options:
 * @param {object} [options.card] The card to enroll. Required if you are not using the `hostedFields` option.
 * @param {string} options.card.number The card number.
 * @param {string} [options.card.expirationDate] The card's expiration date. May be in the form `MM/YY` or `MM/YYYY`. When defined `expirationMonth` and `expirationYear` are ignored.
 * @param {string} [options.card.expirationMonth] The card's expiration month. This should be used with the `expirationYear` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {string} [options.card.expirationYear] The card's expiration year. This should be used with the `expirationMonth` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {HostedFields} [options.hostedFields] The Hosted Fields instance used to collect card data. Required if you are not using the `card` option.
 * @param {object} options.mobile The mobile information collected from the customer.
 * @param {string} options.mobile.countryCode The country code of the customer's mobile phone number.
 * @param {string} options.mobile.number The customer's mobile phone number.
 * @param {callback} callback The second argument, <code>data</code>, is a {@link UnionPay~enrollPayload|enrollPayload}.
 * @example <caption>With raw card data</caption>
 * unionpayInstance.enroll({
 *   card: {
 *     number: '4111111111111111',
 *     expirationMonth: '12',
 *     expirationYear: '2038'
 *   },
 *   mobile: {
 *     countryCode: '62',
 *     number: '111111111111'
 *   }
 * }, function (enrollErr, response) {
 *   if (enrollErr) {
 *      console.error(enrollErr);
 *      return;
 *   }
 *
 *   if (response.smsCodeRequired) {
 *     // If smsCodeRequired, wait for SMS auth code from customer
 *     // Then use response.enrollmentId during {@link UnionPay#tokenize}
 *   } else {
 *     // SMS code is not required from the user.
 *     // {@link UnionPay#tokenize} can be called immediately
 * });
 * @example <caption>With Hosted Fields</caption>
 * unionpayInstance.enroll({
 *   hostedFields: hostedFields,
 *   mobile: {
 *     countryCode: '62',
 *     number: '111111111111'
 *   }
 * }, function (enrollErr, response) {
 *   if (enrollErr) {
 *     console.error(enrollErr);
 *     return;
 *   }
 *
 *   if (response.smsCodeRequired) {
 *     // If smsCodeRequired, wait for SMS auth code from customer
 *     // Then use response.enrollmentId during {@link UnionPay#tokenize}
 *   } else {
 *     // SMS code is not required from the user.
 *     // {@link UnionPay#tokenize} can be called immediately
 *   }
 * });
 * @returns {void}
 */
UnionPay.prototype.enroll = function (options, callback) {
  var client = this._options.client;
  var card = options.card;
  var mobile = options.mobile;
  var hostedFields = options.hostedFields;
  var data;

  throwIfNoCallback(callback, 'enroll');

  callback = deferred(callback);

  if (!mobile) {
    callback(new BraintreeError(errors.UNIONPAY_MISSING_MOBILE_PHONE_DATA));
    return;
  }

  if (hostedFields) {
    if (!hostedFields._bus) {
      callback(new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));
      return;
    } else if (card) {
      callback(new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES));
      return;
    }

    this._initializeHostedFields(function () {
      this._bus.emit(events.HOSTED_FIELDS_ENROLL, {hostedFields: hostedFields, mobile: mobile}, function (response) {
        if (response.err) {
          callback(new BraintreeError(response.err));
          return;
        }

        callback(null, response.payload);
      });
    }.bind(this));
  } else if (card && card.number) {
    data = {
      _meta: {source: 'unionpay'},
      unionPayEnrollment: {
        number: card.number,
        mobileCountryCode: mobile.countryCode,
        mobileNumber: mobile.number
      }
    };

    if (card.expirationDate) {
      data.unionPayEnrollment.expirationDate = card.expirationDate;
    } else if (card.expirationMonth || card.expirationYear) {
      if (card.expirationMonth && card.expirationYear) {
        data.unionPayEnrollment.expirationYear = card.expirationYear;
        data.unionPayEnrollment.expirationMonth = card.expirationMonth;
      } else {
        callback(new BraintreeError(errors.UNIONPAY_EXPIRATION_DATE_INCOMPLETE));
        return;
      }
    }

    client.request({
      method: 'post',
      endpoint: 'union_pay_enrollments',
      data: data
    }, function (err, response, status) {
      var error;

      if (err) {
        if (status === 403) {
          error = err;
        } else if (status < 500) {
          error = new BraintreeError(errors.UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID);
          error.details = {originalError: err};
        } else {
          error = new BraintreeError(errors.UNIONPAY_ENROLLMENT_NETWORK_ERROR);
          error.details = {originalError: err};
        }

        analytics.sendEvent(client, 'web.unionpay.enrollment-failed');
        callback(error);
        return;
      }

      analytics.sendEvent(client, 'web.unionpay.enrollment-succeeded');
      callback(null, {
        enrollmentId: response.unionPayEnrollmentId,
        smsCodeRequired: response.smsCodeRequired
      });
    });
  } else {
    callback(new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED));
    return;
  }
};

/**
 * @typedef {object} UnionPay~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type Always <code>CreditCard</code>.
 * @property {object} details Additional account details:
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 */

/**
 * Tokenizes a UnionPay card and returns a nonce payload.
 * @public
 * @param {object} options UnionPay tokenization options:
 * @param {object} [options.card] The card to enroll. Required if you are not using the `hostedFields` option.
 * @param {string} options.card.number The card number.
 * @param {string} [options.card.expirationDate] The card's expiration date. May be in the form `MM/YY` or `MM/YYYY`. When defined `expirationMonth` and `expirationYear` are ignored.
 * @param {string} [options.card.expirationMonth] The card's expiration month. This should be used with the `expirationYear` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {string} [options.card.expirationYear] The card's expiration year. This should be used with the `expirationMonth` parameter. When `expirationDate` is defined this parameter is ignored.
 * @param {string} [options.card.cvv] The card's security number.
 * @param {HostedFields} [options.hostedFields] The Hosted Fields instance used to collect card data. Required if you are not using the `card` option.
 * @param {string} options.enrollmentId The enrollment ID from {@link UnionPay#enroll}.
 * @param {string} [options.smsCode] The SMS code received from the user if {@link UnionPay#enroll} payload have `smsCodeRequired`. if `smsCodeRequired` is false, smsCode should not be passed.
 * @param {callback} callback The second argument, <code>data</code>, is a {@link UnionPay~tokenizePayload|tokenizePayload}.
 * @example <caption>With raw card data</caption>
 * unionpayInstance.tokenize({
 *   card: {
 *     number: '4111111111111111',
 *     expirationMonth: '12',
 *     expirationYear: '2038',
 *     cvv: '123'
 *   },
 *   enrollmentId: enrollResponse.enrollmentId, // Returned from enroll
 *   smsCode: '11111' // Received by customer's phone, if SMS enrollment was required. Otherwise it should be omitted
 * }, function (tokenizeErr, response) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *     return;
 *   }
 *
 *   // Send response.nonce to your server
 * });
 * @example <caption>With Hosted Fields</caption>
 * unionpayInstance.tokenize({
 *   hostedFields: hostedFieldsInstance,
 *   enrollmentId: enrollResponse.enrollmentId, // Returned from enroll
 *   smsCode: '11111' // Received by customer's phone, if SMS enrollment was required. Otherwise it should be omitted
 * }, function (tokenizeErr, response) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *     return;
 *   }
 *
 *   // Send response.nonce to your server
 * });
 * @returns {void}
 */
UnionPay.prototype.tokenize = function (options, callback) {
  var data, tokenizedCard, error;
  var client = this._options.client;
  var card = options.card;
  var hostedFields = options.hostedFields;

  throwIfNoCallback(callback, 'tokenize');

  callback = deferred(callback);

  if (card && hostedFields) {
    callback(new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES));
    return;
  } else if (card) {
    data = {
      _meta: {source: 'unionpay'},
      creditCard: {
        number: options.card.number,
        options: {
          unionPayEnrollment: {
            id: options.enrollmentId
          }
        }
      }
    };

    if (options.smsCode) {
      data.creditCard.options.unionPayEnrollment.smsCode = options.smsCode;
    }

    if (card.expirationDate) {
      data.creditCard.expirationDate = card.expirationDate;
    } else if (card.expirationMonth && card.expirationYear) {
      data.creditCard.expirationYear = card.expirationYear;
      data.creditCard.expirationMonth = card.expirationMonth;
    }

    if (options.card.cvv) {
      data.creditCard.cvv = options.card.cvv;
    }

    client.request({
      method: 'post',
      endpoint: 'payment_methods/credit_cards',
      data: data
    }, function (err, response, status) {
      if (err) {
        analytics.sendEvent(client, 'web.unionpay.nonce-failed');

        if (status === 403) {
          error = err;
        } else if (status < 500) {
          error = new BraintreeError(errors.UNIONPAY_FAILED_TOKENIZATION);
          error.details = {originalError: err};
        } else {
          error = new BraintreeError(errors.UNIONPAY_TOKENIZATION_NETWORK_ERROR);
          error.details = {originalError: err};
        }

        callback(error);
        return;
      }

      tokenizedCard = response.creditCards[0];
      delete tokenizedCard.consumed;
      delete tokenizedCard.threeDSecureInfo;

      analytics.sendEvent(client, 'web.unionpay.nonce-received');
      callback(null, tokenizedCard);
    });
  } else if (hostedFields) {
    if (!hostedFields._bus) {
      callback(new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));
      return;
    }

    this._initializeHostedFields(function () {
      this._bus.emit(events.HOSTED_FIELDS_TOKENIZE, options, function (response) {
        if (response.err) {
          callback(new BraintreeError(response.err));
          return;
        }

        callback(null, response.payload);
      });
    }.bind(this));
  } else {
    callback(new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED));
    return;
  }
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/unionpay.create|create}. This only needs to be called when using UnionPay with Hosted Fields.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * unionpayInstance.teardown(function (teardownErr) {
 *   if (teardownErr) {
 *     console.error('Could not tear down UnionPay.');
 *   } else {
 *     console.log('UnionPay has been torn down.');
 *   }
 * });
 * @returns {void}
 */
UnionPay.prototype.teardown = function (callback) {
  if (this._bus) {
    this._hostedFieldsFrame.parentNode.removeChild(this._hostedFieldsFrame);
    this._bus.teardown();
  }

  convertMethodsToError(this, methods(UnionPay.prototype));

  if (typeof callback === 'function') {
    callback = deferred(callback);
    callback();
  }
};

UnionPay.prototype._initializeHostedFields = function (callback) {
  var componentId = uuid();

  if (this._bus) {
    callback();
    return;
  }

  this._bus = new Bus({
    channel: componentId,
    merchantUrl: location.href
  });
  this._hostedFieldsFrame = iFramer({
    name: constants.HOSTED_FIELDS_FRAME_NAME + '_' + componentId,
    src: this._options.client.getConfiguration().gatewayConfiguration.assetsUrl + '/web/' + VERSION + '/html/unionpay-hosted-fields-frame.html',
    height: 0,
    width: 0
  });

  this._bus.on(Bus.events.CONFIGURATION_REQUEST, function (reply) {
    reply(this._options.client);

    callback();
  }.bind(this));

  document.body.appendChild(this._hostedFieldsFrame);
};

module.exports = UnionPay;

},{"../../lib/analytics":39,"../../lib/bus":44,"../../lib/convert-methods-to-error":48,"../../lib/deferred":50,"../../lib/error":53,"../../lib/methods":67,"../../lib/throw-if-no-callback":71,"../../lib/uuid":72,"./constants":83,"./errors":84,"iframer":3}],86:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  REQUIRED_BANK_DETAILS: ['routingNumber', 'accountNumber', 'accountType', 'accountHolderName', 'billingAddress'],
  PLAID_LINK_JS: 'https://cdn.plaid.com/link/stable/link-initialize.js'
};

},{}],87:[function(_dereq_,module,exports){
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

},{"../lib/error":53}],88:[function(_dereq_,module,exports){
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

},{"../errors":29,"../lib/deferred":50,"../lib/error":53,"../lib/throw-if-no-callback":71,"./us-bank-account":89}],89:[function(_dereq_,module,exports){
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
},{"../lib/camel-case-to-snake-case":45,"../lib/deferred":50,"../lib/error":53,"../lib/once":68,"../lib/throw-if-no-callback":71,"./constants":86,"./errors":87}]},{},[37])(37)
});