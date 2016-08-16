'use strict';
var client = require('./client');
var paypal = require('./paypal');
var hostedFields = require('./hosted-fields');
var dataCollector = require('./data-collector');
var americanExpress = require('./american-express');
var unionpay = require('./unionpay');
var applePay = require('./apple-pay');
var threeDSecure = require('./three-d-secure');

module.exports = {
    client: client,
    paypal: paypal,
    hostedFields: hostedFields,
    threeDSecure: threeDSecure,
    dataCollector: dataCollector,
    americanExpress: americanExpress,
    unionpay: unionpay,
    applePay: applePay,
    VERSION: '3.0.1'
};
