!function(e){var t;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).client=e()}(function(){return function n(o,i,a){function s(t,e){if(!i[t]){if(!o[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=i[t]={exports:{}},o[t][0].call(r.exports,function(e){return s(o[t][1][e]||e)},r,r.exports,n,o,i,a)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},n=(Object.defineProperty(r,"__esModule",{value:!0}),r.PromiseGlobal=void 0,n(e("promise-polyfill"))),e="undefined"!=typeof Promise?Promise:n.default;r.PromiseGlobal=e},{"promise-polyfill":9}],2:[function(e,t,r){"use strict";var a=e("./lib/promise"),s={};function n(r){var e,n,t,o,i=JSON.stringify(r);return!r.forceScriptReload&&(e=s[i])||(n=document.createElement("script"),t=r.dataAttributes||{},o=r.container||document.head,n.src=r.src,n.id=r.id||"",n.async=!0,r.crossorigin&&n.setAttribute("crossorigin",""+r.crossorigin),Object.keys(t).forEach(function(e){n.setAttribute("data-"+e,""+t[e])}),e=new a.PromiseGlobal(function(e,t){n.addEventListener("load",function(){e(n)}),n.addEventListener("error",function(){t(new Error(r.src+" failed to load."))}),n.addEventListener("abort",function(){t(new Error(r.src+" has aborted."))}),o.appendChild(n)}),s[i]=e),e}n.clearCache=function(){s={}},t.exports=n},{"./lib/promise":1}],3:[function(e,t,r){t.exports=e("./dist/load-script")},{"./dist/load-script":2}],4:[function(e,t,r){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.deferred=function(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];setTimeout(function(){try{r.apply(void 0,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.once=function(r){var n=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];n||(n=!0,r.apply(void 0,e))}}},{}],7:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.promiseOrCallback=function(e,t){if(!t)return e;e.then(function(e){return t(null,e)}).catch(function(e){return t(e)})}},{}],8:[function(e,t,r){"use strict";var o=e("./lib/deferred"),i=e("./lib/once"),a=e("./lib/promise-or-callback");function s(n){return function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i.once(o.deferred(e))),a.promiseOrCallback(n.apply(this,t),e)}}s.wrapPrototype=function(n,e){var o=(e=void 0===e?{}:e).ignoreMethods||[],i=!0===e.transformPrivateMethods;return Object.getOwnPropertyNames(n.prototype).filter(function(e){var t="constructor"!==e&&"function"==typeof n.prototype[e],r=-1===o.indexOf(e),e=i||"_"!==e.charAt(0);return t&&e&&r}).forEach(function(e){var t=n.prototype[e];n.prototype[e]=s(t)}),n},t.exports=s},{"./lib/deferred":5,"./lib/once":6,"./lib/promise-or-callback":7}],9:[function(e,t,r){"use strict";var n=setTimeout;function c(e){return Boolean(e&&void 0!==e.length)}function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function a(r,n){for(;3===r._state;)r=r._value;0===r._state?r._deferreds.push(n):(r._handled=!0,i._immediateFn(function(){var e,t=1===r._state?n.onFulfilled:n.onRejected;if(null===t)(1===r._state?s:u)(n.promise,r._value);else{try{e=t(r._value)}catch(e){return void u(n.promise,e)}s(n.promise,e)}}))}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof i)return t._state=3,t._value=e,void d(t);if("function"==typeof r)return void l((n=r,o=e,function(){n.apply(o,arguments)}),t)}t._state=1,t._value=e,d(t)}catch(e){u(t,e)}var n,o}function u(e,t){e._state=2,e._value=t,d(e)}function d(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)a(e,e._deferreds[t]);e._deferreds=null}function p(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function l(e,t){var r=!1;try{e(function(e){r||(r=!0,s(t,e))},function(e){r||(r=!0,u(t,e))})}catch(e){r||(r=!0,u(t,e))}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(o);return a(this,new p(e,t,r)),r},i.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){return r.reject(e)})})},i.all=function(t){return new i(function(o,i){if(!c(t))return i(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(t);if(0===a.length)return o([]);var s=a.length;for(var e=0;e<a.length;e++)!function t(r,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){t(r,e)},i)}a[r]=e,0==--s&&o(a)}catch(e){i(e)}}(e,a[e])})},i.allSettled=function(r){return new this(function(o,e){if(!r||void 0===r.length)return e(new TypeError(typeof r+" "+r+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(r);if(0===i.length)return o([]);var a=i.length;for(var t=0;t<i.length;t++)!function t(r,e){if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){t(r,e)},function(e){i[r]={status:"rejected",reason:e},0==--a&&o(i)})}i[r]={status:"fulfilled",value:e},0==--a&&o(i)}(t,i[t])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(r){return new i(function(e,t){t(r)})},i.race=function(o){return new i(function(e,t){if(!c(o))return t(new TypeError("Promise.race accepts an array"));for(var r=0,n=o.length;r<n;r++)i.resolve(o[r]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){n(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],10:[function(e,t,r){"use strict";var u=e("./constants").BRAINTREE_VERSION,n=e("./request/graphql"),o=e("./request"),i=e("../lib/is-verified-domain"),d=e("../lib/braintree-error"),p=e("../lib/convert-to-braintree-error"),a=e("./get-configuration").getConfiguration,s=e("../lib/create-authorization-data"),l=e("../lib/add-metadata"),c=e("@braintree/wrap-promise"),f=e("../lib/once"),h=e("../lib/deferred"),E=e("../lib/assign").assign,I=e("../lib/analytics"),y=e("./errors"),g=e("../lib/constants").VERSION,_=e("../lib/constants").GRAPHQL_URLS,m=e("../lib/methods"),A=e("../lib/convert-methods-to-error"),N=e("../lib/assets"),T=e("../lib/constants").FRAUDNET_FNCLS,R=e("../lib/constants").FRAUDNET_SOURCE,C=e("../lib/constants").FRAUDNET_URL,b={};function O(e){var t,r;if(e=e||{},t=JSON.stringify(e),!(r=e.gatewayConfiguration))throw new d(y.CLIENT_MISSING_GATEWAY_CONFIGURATION);if(["assetsUrl","clientApiUrl","configUrl"].forEach(function(e){if(e in r&&!i(r[e]))throw new d({type:y.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:y.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:e+" property is on an invalid domain."})}),this.getConfiguration=function(){return JSON.parse(t)},this._request=o,this._configuration=this.getConfiguration(),this._clientApiBaseUrl=r.clientApiUrl+"/v1/",r.graphQL){if(!i(r.graphQL.url))throw new d({type:y.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:y.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:"graphQL.url property is on an invalid domain."});this._graphQL=new n({graphQL:r.graphQL})}}O.initialize=function(t){var r,e,n=b[t.authorization];if(n)return I.sendEvent(n,"custom.client.load.cached"),n;try{e=s(t.authorization)}catch(e){return Promise.reject(new d(y.CLIENT_INVALID_AUTHORIZATION))}return n=a(e).then(function(e){return t.debug&&(e.isDebug=!0),e.authorization=t.authorization,r=new O(e)}),b[t.authorization]=n,I.sendEvent(n,"custom.client.load.initialized"),n.then(function(e){return I.sendEvent(r,"custom.client.load.succeeded"),e}).catch(function(e){return delete b[t.authorization],Promise.reject(e)})},O.clearCache=function(){b={}},O.prototype._findOrCreateFraudnetJSON=function(e){var t,r,n=document.querySelector('script[fncls="'+T+'"]');n||((n=document.body.appendChild(document.createElement("script"))).type="application/json",n.setAttribute("fncls",T)),r=this.getConfiguration(),t={rda_tenant:"bt_card",mid:r.gatewayConfiguration.merchantId},(r=r.authorizationFingerprint)&&r.split("&").forEach(function(e){e=e.split("=");"customer_id"===e[0]&&1<e.length&&(t.cid=e[1])}),r={f:e.substr(0,32),fp:t,bu:!1,s:R},n.text=JSON.stringify(r)},O.prototype.request=function(s,r){var c=this,e=new Promise(function(n,o){var i,e,t,r,a=Boolean("payment_methods/credit_cards"===s.endpoint&&c.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData);if("graphQLApi"!==s.api&&(s.method?s.endpoint||(t="options.endpoint"):t="options.method"),t)throw new d({type:y.CLIENT_OPTION_REQUIRED.type,code:y.CLIENT_OPTION_REQUIRED.code,message:t+" is required when making a request."});if(i="api"in s?s.api:"clientApi",t={method:s.method,graphQL:c._graphQL,timeout:s.timeout,metadata:c._configuration.analyticsMetadata},"clientApi"===i)e=c._clientApiBaseUrl,t.data=l(c._configuration,s.data);else{if("graphQLApi"!==i)throw new d({type:y.CLIENT_OPTION_INVALID.type,code:y.CLIENT_OPTION_INVALID.code,message:"options.api is invalid."});e=_[c._configuration.gatewayConfiguration.environment],s.endpoint="",t.method="post",t.data=E({clientSdkMetadata:{platform:c._configuration.analyticsMetadata.platform,source:c._configuration.analyticsMetadata.source,integration:c._configuration.analyticsMetadata.integration,sessionId:c._configuration.analyticsMetadata.sessionId,version:g}},s.data),t.headers={Authorization:"Bearer "+((r=c._configuration).authorizationFingerprint||r.authorization),"Braintree-Version":u}}t.url=e+s.endpoint,t.sendAnalyticsEvent=function(e){I.sendEvent(c,e)},c._request(t,function(e,t,r){var e=function(e,t){var r;-1===e?r=new d(y.CLIENT_REQUEST_TIMEOUT):401===e?r=new d(y.CLIENT_AUTHORIZATION_INVALID):403===e?r=new d(y.CLIENT_AUTHORIZATION_INSUFFICIENT):429===e?r=new d(y.CLIENT_RATE_LIMITED):500<=e?r=new d(y.CLIENT_GATEWAY_NETWORK):(e<200||400<=e)&&(r=p(t,{type:y.CLIENT_REQUEST_ERROR.type,code:y.CLIENT_REQUEST_ERROR.code,message:y.CLIENT_REQUEST_ERROR.message}));if(r)return r.details=r.details||{},r.details.httpStatus=e,r}(r,e);e?o(e):"graphQLApi"===i&&t.errors?o(p(t.errors,{type:y.CLIENT_GRAPHQL_REQUEST_ERROR.type,code:y.CLIENT_GRAPHQL_REQUEST_ERROR.code,message:y.CLIENT_GRAPHQL_REQUEST_ERROR.message})):(e=E({_httpStatus:r},t),a&&e.creditCards&&0<e.creditCards.length&&(c._findOrCreateFraudnetJSON(e.creditCards[0].nonce),N.loadScript({src:C,forceScriptReload:!0})),n(e))})});if("function"!=typeof r)return e;r=f(h(r)),e.then(function(e){r(null,e,e._httpStatus)}).catch(function(e){var t=e&&e.details&&e.details.httpStatus;r(e,null,t)})},O.prototype.toJSON=function(){return this.getConfiguration()},O.prototype.getVersion=function(){return g},O.prototype.teardown=c(function(){return delete b[this.getConfiguration().authorization],A(this,m(O.prototype)),Promise.resolve()}),t.exports=O},{"../lib/add-metadata":28,"../lib/analytics":29,"../lib/assets":30,"../lib/assign":31,"../lib/braintree-error":32,"../lib/constants":33,"../lib/convert-methods-to-error":34,"../lib/convert-to-braintree-error":35,"../lib/create-authorization-data":36,"../lib/deferred":37,"../lib/is-verified-domain":41,"../lib/methods":43,"../lib/once":44,"./constants":11,"./errors":12,"./get-configuration":13,"./request":24,"./request/graphql":22,"@braintree/wrap-promise":8}],11:[function(e,t,r){"use strict";t.exports={BRAINTREE_VERSION:"2018-05-10"}},{}],12:[function(e,t,r){"use strict";e=e("../lib/braintree-error");t.exports={CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN:{type:e.types.MERCHANT,code:"CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"},CLIENT_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"CLIENT_OPTION_REQUIRED"},CLIENT_OPTION_INVALID:{type:e.types.MERCHANT,code:"CLIENT_OPTION_INVALID"},CLIENT_MISSING_GATEWAY_CONFIGURATION:{type:e.types.INTERNAL,code:"CLIENT_MISSING_GATEWAY_CONFIGURATION",message:"Missing gatewayConfiguration."},CLIENT_INVALID_AUTHORIZATION:{type:e.types.MERCHANT,code:"CLIENT_INVALID_AUTHORIZATION",message:"Authorization is invalid. Make sure your client token or tokenization key is valid."},CLIENT_GATEWAY_NETWORK:{type:e.types.NETWORK,code:"CLIENT_GATEWAY_NETWORK",message:"Cannot contact the gateway at this time."},CLIENT_REQUEST_TIMEOUT:{type:e.types.NETWORK,code:"CLIENT_REQUEST_TIMEOUT",message:"Request timed out waiting for a reply."},CLIENT_REQUEST_ERROR:{type:e.types.NETWORK,code:"CLIENT_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_GRAPHQL_REQUEST_ERROR:{type:e.types.NETWORK,code:"CLIENT_GRAPHQL_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_RATE_LIMITED:{type:e.types.MERCHANT,code:"CLIENT_RATE_LIMITED",message:"You are being rate-limited; please try again in a few minutes."},CLIENT_AUTHORIZATION_INSUFFICIENT:{type:e.types.MERCHANT,code:"CLIENT_AUTHORIZATION_INSUFFICIENT",message:"The authorization used has insufficient privileges."},CLIENT_AUTHORIZATION_INVALID:{type:e.types.MERCHANT,code:"CLIENT_AUTHORIZATION_INVALID",message:"Either the client token has expired and a new one should be generated or the tokenization key has been deactivated or deleted."}}},{"../lib/braintree-error":32}],13:[function(e,t,r){"use strict";var c=e("../lib/braintree-error"),n=e("@braintree/wrap-promise"),u=e("./request"),d=e("@braintree/uuid"),p=e("../lib/constants"),l=e("./errors"),f=e("./request/graphql"),h=e("../lib/constants").GRAPHQL_URLS,E=e("../lib/is-date-string-before-or-on"),I=e("./constants").BRAINTREE_VERSION;t.exports={getConfiguration:n(function(t){return new Promise(function(n,o){var i,e=d(),a={merchantAppId:window.location.host,platform:p.PLATFORM,sdkVersion:p.VERSION,source:p.SOURCE,integration:p.INTEGRATION,integrationType:p.INTEGRATION,sessionId:e},s=t.attrs,e=t.configUrl;s._meta=a,s.braintreeLibraryVersion=p.BRAINTREE_LIBRARY_VERSION,s.configVersion="3",e={url:e,method:"GET",data:s},s.authorizationFingerprint&&t.graphQL?(E(t.graphQL.date,I)&&(e.graphQL=new f({graphQL:{url:t.graphQL.url,features:["configuration"]}})),e.metadata=a):s.tokenizationKey&&(e.graphQL=new f({graphQL:{url:h[t.environment],features:["configuration"]}}),e.metadata=a),u(e,function(e,t,r){e?(r=403===r?l.CLIENT_AUTHORIZATION_INSUFFICIENT:401===r?l.CLIENT_AUTHORIZATION_INVALID:l.CLIENT_GATEWAY_NETWORK,o(new c({type:r.type,code:r.code,message:r.message,details:{originalError:e}}))):(i={authorizationType:s.tokenizationKey?"TOKENIZATION_KEY":"CLIENT_TOKEN",authorizationFingerprint:s.authorizationFingerprint,analyticsMetadata:a,gatewayConfiguration:t},n(i))})})})}},{"../lib/braintree-error":32,"../lib/constants":33,"../lib/is-date-string-before-or-on":40,"./constants":11,"./errors":12,"./request":24,"./request/graphql":22,"@braintree/uuid":4,"@braintree/wrap-promise":8}],14:[function(e,t,r){"use strict";var n=e("../lib/braintree-error"),o=e("./client"),i=e("@braintree/wrap-promise"),a=e("../lib/errors");t.exports={create:i(function(e){return e.authorization?o.initialize(e):Promise.reject(new n({type:a.INSTANTIATION_OPTION_REQUIRED.type,code:a.INSTANTIATION_OPTION_REQUIRED.code,message:"options.authorization is required when instantiating a client."}))}),VERSION:"3.95.0"}},{"../lib/braintree-error":32,"../lib/errors":39,"./client":10,"@braintree/wrap-promise":8}],15:[function(e,t,r){"use strict";var E=e("../../lib/querystring"),I=e("../../lib/assign").assign,y=e("./prep-body"),g=e("./parse-body"),_=e("./xhr"),m=_.isAvailable,A=e("./graphql/request"),N=e("./default-request"),T=1,R=408;function C(t,r,n){var o,i,a,e,s,c,u=t.url,d=t.graphQL,p=t.timeout,l=_.getRequestObject(),f=n,h=Boolean(d&&d.isGraphQLRequest(u,t.data));t.headers=I({"Content-Type":"application/json"},t.headers),u=(a=new(h?A:N)(t)).getUrl(),d=a.getBody(),e=a.getMethod(),s=a.getHeaders(),"GET"===e&&(u=E.queryify(u,d),d=null),m?l.onreadystatechange=function(){var e;4===l.readyState&&(0===l.status&&h?(delete t.graphQL,C(t,r,n)):(c=g(l.responseText),i=a.adaptResponseBody(c),400<=(o=a.determineStatus(l.status,c))||o<200?!h||"UNKNOWN"!==(e=!(e=c).data&&e.errors&&e.errors[0]&&e.errors[0].extensions&&e.errors[0].extensions.errorClass)&&"INTERNAL"!==e?r<T&&(!(e=o)||e===R)?C(t,++r,n):f(i||"error",null,o||500):(delete t.graphQL,C(t,r,n)):f(null,i,o)))}:(t.headers&&(u=E.queryify(u,s)),l.onload=function(){f(null,g(l.responseText),l.status)},l.onerror=function(){f("error",null,500)},l.onprogress=function(){},l.ontimeout=function(){f("timeout",null,-1)});try{l.open(e,u,!0)}catch(e){if(h)return delete t.graphQL,void C(t,r,n);throw e}l.timeout=p,m&&Object.keys(s).forEach(function(e){l.setRequestHeader(e,s[e])});try{l.send(y(e,d))}catch(e){}}t.exports={request:function(e,t){C(e,0,t)}}},{"../../lib/assign":31,"../../lib/querystring":45,"./default-request":16,"./graphql/request":23,"./parse-body":25,"./prep-body":26,"./xhr":27}],16:[function(e,t,r){"use strict";function n(e){this._url=e.url,this._data=e.data,this._method=e.method,this._headers=e.headers}n.prototype.getUrl=function(){return this._url},n.prototype.getBody=function(){return this._data},n.prototype.getMethod=function(){return this._method},n.prototype.getHeaders=function(){return this._headers},n.prototype.adaptResponseBody=function(e){return e},n.prototype.determineStatus=function(e){return e},t.exports=n},{}],17:[function(e,t,r){"use strict";var n=e("./error"),o=e("../../../../lib/assign").assign,i={creditCard:{AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",INTERNATIONAL_MAESTRO:"Maestro",JCB:"JCB",MASTERCARD:"MasterCard",SOLO:"Solo",UK_MAESTRO:"UK Maestro",UNION_PAY:"UnionPay",VISA:"Visa",ELO:"Elo",HIPER:"Hiper",HIPERCARD:"Hipercard"},applePayWeb:{VISA:"visa",MASTERCARD:"mastercard",DISCOVER:"discover",AMERICAN_EXPRESS:"amex",INTERNATIONAL_MAESTRO:"maestro",ELO:"elo"},visaCheckout:{VISA:"Visa",MASTERCARD:"MasterCard",DISCOVER:"Discover",AMERICAN_EXPRESS:"American Express"},googlePay:{VISA:"visa",MASTERCARD:"mastercard",DISCOVER:"discover",AMERICAN_EXPRESS:"amex",INTERNATIONAL_MAESTRO:"maestro",ELO:"elo"},masterpass:{VISA:"visa",MASTERCARD:"master",DISCOVER:"discover",AMERICAN_EXPRESS:"amex",DINERS:"diners",INTERNATIONAL_MAESTRO:"maestro",JCB:"jcb"}};function a(e,r){return e.reduce(function(e,t){return r.hasOwnProperty(t)?e.concat(r[t]):e},[])}t.exports=function(e,t){return t=e.data&&!e.errors?function(e,t){var r,e=e.data.clientConfiguration;r={environment:e.environment.toLowerCase(),clientApiUrl:e.clientApiUrl,assetsUrl:e.assetsUrl,analytics:{url:e.analyticsUrl},merchantId:e.merchantId,venmo:"off"},e.supportedFeatures&&(r.graphQL={url:t._graphQL._config.url,features:e.supportedFeatures.map(function(e){return e.toLowerCase()})});e.braintreeApi&&(r.braintreeApi=e.braintreeApi);e.applePayWeb&&(r.applePayWeb=e.applePayWeb,r.applePayWeb.supportedNetworks=a(e.applePayWeb.supportedCardBrands,i.applePayWeb),delete r.applePayWeb.supportedCardBrands);e.ideal&&(r.ideal=e.ideal);e.kount&&(r.kount={kountMerchantId:e.kount.merchantId});e.creditCard?(r.challenges=e.creditCard.challenges.map(function(e){return e.toLowerCase()}),r.creditCards={supportedCardTypes:a(e.creditCard.supportedCardBrands,i.creditCard)},r.threeDSecureEnabled=e.creditCard.threeDSecureEnabled,r.threeDSecure=e.creditCard.threeDSecure):(r.challenges=[],r.creditCards={supportedCardTypes:[]},r.threeDSecureEnabled=!1);e.googlePay&&(r.androidPay={displayName:e.googlePay.displayName,enabled:!0,environment:e.googlePay.environment.toLowerCase(),googleAuthorizationFingerprint:e.googlePay.googleAuthorization,paypalClientId:e.googlePay.paypalClientId,supportedNetworks:a(e.googlePay.supportedCardBrands,i.googlePay)});e.venmo&&(r.payWithVenmo={merchantId:e.venmo.merchantId,accessToken:e.venmo.accessToken,environment:e.venmo.environment.toLowerCase()});e.paypal?(r.paypalEnabled=!0,r.paypal=o({},e.paypal),r.paypal.currencyIsoCode=r.paypal.currencyCode,r.paypal.environment=r.paypal.environment.toLowerCase(),delete r.paypal.currencyCode):r.paypalEnabled=!1;e.unionPay&&(r.unionPay={enabled:!0,merchantAccountId:e.unionPay.merchantAccountId});e.visaCheckout&&(r.visaCheckout={apikey:e.visaCheckout.apiKey,encryptionKey:e.visaCheckout.encryptionKey,externalClientId:e.visaCheckout.externalClientId,supportedCardTypes:a(e.visaCheckout.supportedCardBrands,i.visaCheckout)});e.masterpass&&(r.masterpass={merchantCheckoutId:e.masterpass.merchantCheckoutId,supportedNetworks:a(e.masterpass.supportedCardBrands,i.masterpass)});e.usBankAccount&&(r.usBankAccount={routeId:e.usBankAccount.routeId,plaid:{publicKey:e.usBankAccount.plaidPublicKey}});return r}(e,t):n(e)}},{"../../../../lib/assign":31,"./error":19}],18:[function(e,t,r){"use strict";var n=e("./error"),o={AMERICAN_EXPRESS:"American Express",DINERS:"Discover",DISCOVER:"Discover",ELO:"Elo",HIPER:"Hiper",HIPERCARD:"Hipercard",INTERNATIONAL_MAESTRO:"Maestro",JCB:"JCB",MASTERCARD:"MasterCard",UK_MAESTRO:"Maestro",UNION_PAY:"UnionPay",VISA:"Visa"},i={YES:"Yes",NO:"No",UNKNOWN:"Unknown"},a={PSDTWO:"psd2"};t.exports=function(e){return e=(e.data&&!e.errors?function(e){var e=e.data.tokenizeCreditCard,t=e.creditCard,r=t.last4?t.last4.substr(2,4):"",n=t.binData;n&&(["commercial","debit","durbinRegulated","healthcare","payroll","prepaid"].forEach(function(e){n[e]?n[e]=i[n[e]]:n[e]="Unknown"}),["issuingBank","countryOfIssuance","productId"].forEach(function(e){n[e]||(n[e]="Unknown")}));t={creditCards:[{binData:n,consumed:!1,description:r?"ending in "+r:"",nonce:e.token,details:{cardholderName:t.cardholderName,expirationMonth:t.expirationMonth,expirationYear:t.expirationYear,bin:t.bin||"",cardType:o[t.brandCode]||"Unknown",lastFour:t.last4||"",lastTwo:r},type:"CreditCard",threeDSecureInfo:null}]},e.authenticationInsight&&(r=e.authenticationInsight.customerAuthenticationRegulationEnvironment,t.creditCards[0].authenticationInsight={regulationEnvironment:a[r]||r.toLowerCase()});return t}:n)(e)}},{"./error":19}],19:[function(e,t,r){"use strict";t.exports=function(e){var t,r=e.errors&&e.errors[0]&&e.errors[0].extensions&&e.errors[0].extensions.errorClass,n="VALIDATION"===r?0!==(n=function(e){var t=[];return e.forEach(function(e){e.extensions&&e.extensions.inputPath&&!function e(t,r,n){var o;var i=r.extensions.legacyCode;var a=t[0];if(1===t.length)return void n.push({code:i,field:a,message:r.message});n.forEach(function(e){e.field===a&&(o=e)});o||(o={field:a,fieldErrors:[]},n.push(o));e(t.slice(1),r,o.fieldErrors)}(e.extensions.inputPath.slice(1),e,t)}),t}((t=e).errors)).length?{error:{message:function(e){e=e[0].field;return{creditCard:"Credit card is invalid"}[e]}(n)},fieldErrors:n}:{error:{message:t.errors[0].message}}:r?{error:{message:e.errors[0].message},fieldErrors:[]}:{error:{message:"There was a problem serving your request"},fieldErrors:[]};return n}},{}],20:[function(e,t,r){"use strict";t.exports=function(){return{query:"query ClientConfiguration {   clientConfiguration {     analyticsUrl     environment     merchantId     assetsUrl     clientApiUrl     creditCard {       supportedCardBrands       challenges       threeDSecureEnabled       threeDSecure {         cardinalAuthenticationJWT       }     }     applePayWeb {       countryCode       currencyCode       merchantIdentifier       supportedCardBrands     }     googlePay {       displayName       supportedCardBrands       environment       googleAuthorization       paypalClientId     }     ideal {       routeId       assetsUrl     }     kount {       merchantId     }     masterpass {       merchantCheckoutId       supportedCardBrands     }     paypal {       displayName       clientId       privacyUrl       userAgreementUrl       assetsUrl       environment       environmentNoNetwork       unvettedMerchant       braintreeClientId       billingAgreementsEnabled       merchantAccountId       currencyCode       payeeEmail     }     unionPay {       merchantAccountId     }     usBankAccount {       routeId       plaidPublicKey     }     venmo {       merchantId       accessToken       environment       enrichedCustomerDataEnabled    }     visaCheckout {       apiKey       externalClientId       supportedCardBrands     }     braintreeApi {       accessToken       url     }     supportedFeatures   } }",operationName:"ClientConfiguration"}}},{}],21:[function(e,t,r){"use strict";var a=e("../../../../lib/assign").assign;function o(e,t){var r=e.creditCard,n=r&&r.billingAddress,o=r&&r.expirationDate,i=r&&(r.expirationMonth||o&&o.split("/")[0].trim()),o=r&&(r.expirationYear||o&&o.split("/")[1].trim()),i={input:{creditCard:{number:r&&r.number,expirationMonth:i,expirationYear:o,cvv:r&&r.cvv,cardholderName:r&&r.cardholderName},options:{}}};return t.hasAuthenticationInsight&&(i.authenticationInsightInput={merchantAccountId:e.merchantAccountId}),n&&(i.input.creditCard.billingAddress=n),i.input=function(e,t){var r;e.creditCard&&e.creditCard.options&&"boolean"==typeof e.creditCard.options.validate?r=e.creditCard.options.validate:e.authorizationFingerprint&&e.tokenizationKey||e.authorizationFingerprint?r=!0:e.tokenizationKey&&(r=!1);"boolean"==typeof r&&(t.options=a({validate:r},t.options));return t}(e,i.input),i}t.exports=function(e){var t,r,n={hasAuthenticationInsight:Boolean(e.authenticationInsight&&e.merchantAccountId)};return{query:(t=(t=n).hasAuthenticationInsight,r="mutation TokenizeCreditCard($input: TokenizeCreditCardInput!",t&&(r+=", $authenticationInsightInput: AuthenticationInsightInput!"),r+=") {   tokenizeCreditCard(input: $input) {     token     creditCard {       bin       brandCode       last4       cardholderName       expirationMonth      expirationYear      binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     } ",t&&(r+="    authenticationInsight(input: $authenticationInsightInput) {      customerAuthenticationRegulationEnvironment    }"),r+="  } }"),variables:o(e,n),operationName:"TokenizeCreditCard"}}},{"../../../../lib/assign":31}],22:[function(e,t,r){"use strict";var o={tokenize_credit_cards:"payment_methods/credit_cards",configuration:"configuration"},i=["creditCard.options.unionPayEnrollment"];function n(e){this._config=e.graphQL}n.prototype.getGraphQLEndpoint=function(){return this._config.url},n.prototype.isGraphQLRequest=function(e,t){var r,n=this.getClientApiPath(e);return!(!this._isGraphQLEnabled()||!n)&&(e=this._config.features.some(function(e){return o[e]===n}),r=t,!i.some(function(e){return void 0!==e.split(".").reduce(function(e,t){return e&&e[t]},r)})&&e)},n.prototype.getClientApiPath=function(e){var t,e=e.split("/client_api/v1/");return t=1<e.length?e[1].split("?")[0]:t},n.prototype._isGraphQLEnabled=function(){return Boolean(this._config)},t.exports=n},{}],23:[function(e,t,r){"use strict";var n=e("../../constants").BRAINTREE_VERSION,o=e("../../../lib/assign").assign,i=e("../../../lib/snake-case-to-camel-case"),a=e("./generators/credit-card-tokenization"),s=e("./adapters/credit-card-tokenization"),c=e("./generators/configuration"),e=e("./adapters/configuration"),u={"payment_methods/credit_cards":a,configuration:c},d={"payment_methods/credit_cards":s,configuration:e};function p(e){var t=e.graphQL.getClientApiPath(e.url);this._graphQL=e.graphQL,this._data=e.data,this._method=e.method,this._headers=e.headers,this._clientSdkMetadata={source:e.metadata.source,integration:e.metadata.integration,sessionId:e.metadata.sessionId},this._sendAnalyticsEvent=e.sendAnalyticsEvent||Function.prototype,this._generator=u[t],this._adapter=d[t],this._sendAnalyticsEvent("graphql.init")}p.prototype.getUrl=function(){return this._graphQL.getGraphQLEndpoint()},p.prototype.getBody=function(){var e=function r(n){var o={};Object.keys(n).forEach(function(e){var t=i(e);"object"==typeof n[e]?o[t]=r(n[e]):"number"==typeof n[e]?o[t]=String(n[e]):o[t]=n[e]});return o}(this._data),e=this._generator(e),e=o({clientSdkMetadata:this._clientSdkMetadata},e);return JSON.stringify(e)},p.prototype.getMethod=function(){return"POST"},p.prototype.getHeaders=function(){var e=this._data.authorizationFingerprint?(this._sendAnalyticsEvent("graphql.authorization-fingerprint"),this._data.authorizationFingerprint):(this._sendAnalyticsEvent("graphql.tokenization-key"),this._data.tokenizationKey);return o({},this._headers,{Authorization:"Bearer "+e,"Braintree-Version":n})},p.prototype.adaptResponseBody=function(e){return this._adapter(e,this)},p.prototype.determineStatus=function(e,t){var r=200===e?(r=t.errors&&t.errors[0]&&t.errors[0].extensions&&t.errors[0].extensions.errorClass,t.data&&!t.errors?200:"VALIDATION"===r?422:"AUTHORIZATION"===r?403:"AUTHENTICATION"===r?401:(t=t,!r&&t.errors[0].message?403:500)):e||500;return this._sendAnalyticsEvent("graphql.status."+e),this._sendAnalyticsEvent("graphql.determinedStatus."+r),r},t.exports=p},{"../../../lib/assign":31,"../../../lib/snake-case-to-camel-case":46,"../../constants":11,"./adapters/configuration":17,"./adapters/credit-card-tokenization":18,"./generators/configuration":20,"./generators/credit-card-tokenization":21}],24:[function(e,t,r){"use strict";var n=e("../../lib/once"),o=e("./ajax-driver");t.exports=function(e,t){t=n(t||Function.prototype),e.method=(e.method||"GET").toUpperCase(),e.timeout=null==e.timeout?6e4:e.timeout,e.data=e.data||{},o.request(e,t)}},{"../../lib/once":44,"./ajax-driver":15}],25:[function(e,t,r){"use strict";t.exports=function(e){try{e=JSON.parse(e)}catch(e){}return e}},{}],26:[function(e,t,r){"use strict";t.exports=function(e,t){if("string"!=typeof e)throw new Error("Method must be a string");return t="get"!==e.toLowerCase()&&null!=t?"string"==typeof t?t:JSON.stringify(t):t}},{}],27:[function(e,t,r){"use strict";var n="undefined"!=typeof window&&window.XMLHttpRequest&&"withCredentials"in new window.XMLHttpRequest;t.exports={isAvailable:n,getRequestObject:function(){return new(n?window.XMLHttpRequest:window.XDomainRequest)}}},{}],28:[function(e,t,r){"use strict";var i=e("./create-authorization-data"),a=e("./json-clone"),s=e("./constants");t.exports=function(e,t){var r,n=t?a(t):{},t=i(e.authorization).attrs,o=a(e.analyticsMetadata);for(r in n.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION,n._meta)n._meta.hasOwnProperty(r)&&(o[r]=n._meta[r]);return n._meta=o,t.tokenizationKey?n.tokenizationKey=t.tokenizationKey:n.authorizationFingerprint=t.authorizationFingerprint,n}},{"./constants":33,"./create-authorization-data":36,"./json-clone":42}],29:[function(e,t,r){"use strict";var s=e("./constants"),c=e("./add-metadata");t.exports={sendEvent:function(e,o,i){var a=Date.now();return Promise.resolve(e).then(function(e){var t=Date.now(),r=e.getConfiguration(),e=e._request,n=r.gatewayConfiguration.analytics.url,t={analytics:[{kind:s.ANALYTICS_PREFIX+o,isAsync:Math.floor(t/1e3)!==Math.floor(a/1e3),timestamp:a}]};e({url:n,method:"post",data:c(r,t),timeout:s.ANALYTICS_REQUEST_TIMEOUT_MS},i)}).catch(function(e){i&&i(e)})}}},{"./add-metadata":28,"./constants":33}],30:[function(e,t,r){"use strict";e=e("@braintree/asset-loader/load-script");t.exports={loadScript:e}},{"@braintree/asset-loader/load-script":3}],31:[function(e,t,r){"use strict";var n="function"==typeof Object.assign?Object.assign:o;function o(e){for(var t,r,n=1;n<arguments.length;n++)for(r in t=arguments[n])t.hasOwnProperty(r)&&(e[r]=t[r]);return e}t.exports={assign:n,_assign:o}},{}],32:[function(e,t,r){"use strict";e=e("./enumerate");function n(e){if(!n.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((n.prototype=Object.create(Error.prototype)).constructor=n).types=e(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),n.findRootError=function(e){return e instanceof n&&e.details&&e.details.originalError?n.findRootError(e.details.originalError):e},t.exports=n},{"./enumerate":38}],33:[function(e,t,r){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",BUS_CONFIGURATION_REQUEST_EVENT:"BUS_CONFIGURATION_REQUEST",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.95.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.95.0"}},{}],34:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new n({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":32,"./errors":39}],35:[function(e,t,r){"use strict";var n=e("./braintree-error");t.exports=function(e,t){return e instanceof n?e:new n({type:t.type,code:t.code,message:t.message,details:{originalError:e}})}},{"./braintree-error":32}],36:[function(e,t,r){"use strict";var o=e("../lib/vendor/polyfill").atob,i=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,r,n={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(r=(t=(t=e).split("_"))[0],t={merchantId:t.slice(2).join("_"),environment:r},n.environment=t.environment,n.attrs.tokenizationKey=e,n.configUrl=i[t.environment]+"/merchants/"+t.merchantId+"/client_api/v1/configuration"):(r=JSON.parse(o(e)),n.environment=r.environment,n.attrs.authorizationFingerprint=r.authorizationFingerprint,n.configUrl=r.configUrl,n.graphQL=r.graphQL),n}},{"../lib/constants":33,"../lib/vendor/polyfill":47}],37:[function(e,t,r){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}},{}],38:[function(e,t,r){"use strict";t.exports=function(e,r){return r=null==r?"":r,e.reduce(function(e,t){return e[t]=r+t,e},{})}},{}],39:[function(e,t,r){"use strict";e=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:e.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:e.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:e.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:e.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:e.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./braintree-error":32}],40:[function(e,t,r){"use strict";function n(e){e=e.split("-");return new Date(e[0],e[1],e[2])}t.exports=function(e,t){return n(e)<=n(t)}},{}],41:[function(e,t,r){"use strict";var n,o={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=function(e){return e=e.toLowerCase(),!!/^https:/.test(e)&&((n=n||document.createElement("a")).href=e,e=n.hostname.split(".").slice(-2).join("."),o.hasOwnProperty(e))}},{}],42:[function(e,t,r){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],43:[function(e,t,r){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],44:[function(e,t,r){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],45:[function(e,t,r){"use strict";function n(e){return e=e||window.location.href,/\?/.test(e)}function a(e,t){var r,n,o,i=[];for(n in e)e.hasOwnProperty(n)&&(r=e[n],o=t?(o=e)&&"object"==typeof o&&"number"==typeof o.length&&"[object Array]"===Object.prototype.toString.call(o)?t+"[]":t+"["+n+"]":n,i.push("object"==typeof r?a(r,o):encodeURIComponent(o)+"="+encodeURIComponent(r)));return i.join("&")}t.exports={parse:function(e){return n(e=e||window.location.href)?(e.split("?")[1]||"").replace(/#.*$/,"").split("&").reduce(function(e,t){var t=t.split("="),r=decodeURIComponent(t[0]),t=decodeURIComponent(t[1]);return e[r]=t,e},{}):{}},stringify:a,queryify:function(e,t){return e=e||"",e=null!=t&&"object"==typeof t&&function(e){for(var t in e)if(e.hasOwnProperty(t))return 1}(t)?(e=(e+=-1===e.indexOf("?")?"?":"")+(-1!==e.indexOf("=")?"&":""))+a(t):e},hasQueryParams:n}},{}],46:[function(e,t,r){"use strict";t.exports=function(e){return-1===e.indexOf("_")?e:e.toLowerCase().replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}},{}],47:[function(e,t,r){"use strict";var n="function"==typeof atob?atob:o;function o(e){var t,r,n,o,i,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(i=0;r=a.indexOf(e.charAt(i++)),t=(15&(n=a.indexOf(e.charAt(i++))))<<4|(o=a.indexOf(e.charAt(i++)))>>2&15,o=(3&o)<<6|63&a.indexOf(e.charAt(i++)),s+=String.fromCharCode((63&r)<<2|n>>4&3)+(t?String.fromCharCode(t):"")+(o?String.fromCharCode(o):""),i<e.length;);return s}t.exports={atob:function(e){return n.call(window,e)},_atob:o}},{}]},{},[14])(14)});