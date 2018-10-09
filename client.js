!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).client=e()}}(function(){return function i(a,s,u){function c(t,e){if(!s[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(d)return d(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=s[t]={exports:{}};a[t][0].call(o.exports,function(e){return c(a[t][1][e]||e)},o,o.exports,i,a,s,u)}return s[t].exports}for(var d="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,n,t){(function(t){"use strict";var r=e("./is-ie11");n.exports=function(e){return-1!==(e=e||t.navigator.userAgent).indexOf("MSIE")||r(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ie11":2}],2:[function(e,t,r){"use strict";t.exports=function(e){return-1!==(e=e||navigator.userAgent).indexOf("Trident/7")}},{}],3:[function(e,t,r){"use strict";t.exports=function(e){return-1!==(e=e||navigator.userAgent).indexOf("MSIE 9")}},{}],4:[function(e,t,r){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}},{}],5:[function(e,t,r){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],6:[function(e,t,r){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],7:[function(e,t,r){"use strict";var n=e("./lib/deferred"),o=e("./lib/once"),i=e("./lib/promise-or-callback");function s(r){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=o(n(e))),i(r.apply(this,t),e)}}s.wrapPrototype=function(o,e){var i,a;return i=(e=e||{}).ignoreMethods||[],a=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(o.prototype).filter(function(e){var t,r="constructor"!==e&&"function"==typeof o.prototype[e],n=-1===i.indexOf(e);return t=!!a||"_"!==e.charAt(0),r&&t&&n}).forEach(function(e){var t=o.prototype[e];o.prototype[e]=s(t)}),o},t.exports=s},{"./lib/deferred":4,"./lib/once":5,"./lib/promise-or-callback":6}],8:[function(e,t,r){"use strict";var n=setTimeout;function o(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function a(r,n){for(;3===r._state;)r=r._value;0!==r._state?(r._handled=!0,i._immediateFn(function(){var e=1===r._state?n.onFulfilled:n.onRejected;if(null!==e){var t;try{t=e(r._value)}catch(e){return void u(n.promise,e)}s(n.promise,t)}else(1===r._state?s:u)(n.promise,r._value)})):r._deferreds.push(n)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof i)return t._state=3,t._value=e,void c(t);if("function"==typeof r)return void p((n=r,o=e,function(){n.apply(o,arguments)}),t)}t._state=1,t._value=e,c(t)}catch(e){u(t,e)}var n,o}function u(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)a(e,e._deferreds[t]);e._deferreds=null}function d(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function p(e,t){var r=!1;try{e(function(e){r||(r=!0,s(t,e))},function(e){r||(r=!0,u(t,e))})}catch(e){if(r)return;r=!0,u(t,e)}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var r=new this.constructor(o);return a(this,new d(e,t,r)),r},i.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){return r.reject(e)})})},i.all=function(t){return new i(function(n,o){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(t);if(0===i.length)return n([]);var a=i.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){s(t,e)},o)}i[t]=e,0==--a&&n(i)}catch(e){o(e)}}for(var e=0;e<i.length;e++)s(e,i[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(r){return new i(function(e,t){t(r)})},i.race=function(o){return new i(function(e,t){for(var r=0,n=o.length;r<n;r++)o[r].then(e,t)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){n(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=i},{}],9:[function(e,t,r){"use strict";var n=e("@braintree/browser-detection/is-ie"),o=e("@braintree/browser-detection/is-ie9");t.exports={isIe:n,isIe9:o}},{"@braintree/browser-detection/is-ie":1,"@braintree/browser-detection/is-ie9":3}],10:[function(e,t,r){"use strict";var d=e("./constants").BRAINTREE_VERSION,o=e("./request/graphql"),i=e("./request"),a=e("../lib/is-verified-domain"),p=e("../lib/braintree-error"),l=e("../lib/convert-to-braintree-error"),f=e("../lib/create-authorization-data"),n=e("./get-configuration").getConfiguration,h=e("../lib/add-metadata"),s=e("../lib/promise"),u=e("@braintree/wrap-promise"),y=e("../lib/once"),E=e("../lib/deferred"),g=e("../lib/assign").assign,I=e("../lib/analytics"),_=e("./constants"),A=e("./errors"),T=e("../lib/errors"),c=e("../lib/constants").VERSION,m=e("../lib/constants").GRAPHQL_URLS,N=e("../lib/methods"),b=e("../lib/convert-methods-to-error"),R={};function C(e){var t,r,n;if(e=e||{},t=JSON.stringify(e),!(r=e.gatewayConfiguration))throw new p(A.CLIENT_MISSING_GATEWAY_CONFIGURATION);if(["assetsUrl","clientApiUrl","configUrl"].forEach(function(e){if(e in r&&!a(r[e]))throw new p({type:A.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:A.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:e+" property is on an invalid domain."})}),this.getConfiguration=function(){return JSON.parse(t)},this._request=i,this._configuration=this.getConfiguration(),this._clientApiBaseUrl=r.clientApiUrl+"/v1/",(n=r.braintreeApi)&&(this._braintreeApi={baseUrl:n.url+"/",accessToken:n.accessToken},!a(this._braintreeApi.baseUrl)))throw new p({type:A.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:A.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:"braintreeApi URL is on an invalid domain."});r.graphQL&&(this._graphQL=new o({graphQL:r.graphQL}))}C.initialize=function(r){return R[r.authorization]?s.resolve(R[r.authorization]):n(r).then(function(e){var t;return r.debug&&(e.isDebug=!0),t=new C(e),R[r.authorization]=t})},C.clearCache=function(){R={}},C.prototype.request=function(u,r){var c=this,e=new s(function(i,a){var e,s,t,r,n,o;if("graphQLApi"!==u.api&&(u.method?u.endpoint||(e="options.endpoint"):e="options.method"),e)throw new p({type:A.CLIENT_OPTION_REQUIRED.type,code:A.CLIENT_OPTION_REQUIRED.code,message:e+" is required when making a request."});if(s="api"in u?u.api:"clientApi",r={method:u.method,graphQL:c._graphQL,timeout:u.timeout,metadata:c._configuration.analyticsMetadata},"clientApi"===s)t=c._clientApiBaseUrl,r.data=h(c._configuration,u.data);else if("braintreeApi"===s){if(!c._braintreeApi)throw new p(T.BRAINTREE_API_ACCESS_RESTRICTED);t=c._braintreeApi.baseUrl,r.data=u.data,r.headers={"Braintree-Version":_.BRAINTREE_API_VERSION_HEADER,Authorization:"Bearer "+c._braintreeApi.accessToken}}else{if("graphQLApi"!==s)throw new p({type:A.CLIENT_OPTION_INVALID.type,code:A.CLIENT_OPTION_INVALID.code,message:"options.api is invalid."});t=m[c._configuration.gatewayConfiguration.environment],u.endpoint="",r.method="post",r.data=g({clientSdkMetadata:{source:c._configuration.analyticsMetadata.source,integration:c._configuration.analyticsMetadata.integration,sessionId:c._configuration.analyticsMetadata.sessionId}},u.data),r.headers=(n=c._configuration.authorization,{Authorization:"Bearer "+((o=f(n).attrs).authorizationFingerprint||o.tokenizationKey),"Braintree-Version":d})}r.url=t+u.endpoint,r.sendAnalyticsEvent=function(e){I.sendEvent(c,e)},c._request(r,function(e,t,r){var n,o;(o=function(e,t){var r;-1===e?r=new p(A.CLIENT_REQUEST_TIMEOUT):403===e?r=new p(A.CLIENT_AUTHORIZATION_INSUFFICIENT):429===e?r=new p(A.CLIENT_RATE_LIMITED):500<=e?r=new p(A.CLIENT_GATEWAY_NETWORK):(e<200||400<=e)&&(r=l(t,{type:A.CLIENT_REQUEST_ERROR.type,code:A.CLIENT_REQUEST_ERROR.code,message:A.CLIENT_REQUEST_ERROR.message}));if(r)return r.details=r.details||{},r.details.httpStatus=e,r}(r,e))?a(o):"graphQLApi"===s&&t.errors?a(l(t.errors,{type:A.CLIENT_GRAPHQL_REQUEST_ERROR.type,code:A.CLIENT_GRAPHQL_REQUEST_ERROR.code,message:A.CLIENT_GRAPHQL_REQUEST_ERROR.message})):(n=g({_httpStatus:r},t),i(n))})});return"function"==typeof r?(r=y(E(r)),void e.then(function(e){r(null,e,e._httpStatus)}).catch(function(e){var t=e&&e.details&&e.details.httpStatus;r(e,null,t)})):e},C.prototype.toJSON=function(){return this.getConfiguration()},C.prototype.getVersion=function(){return c},C.prototype.teardown=u(function(){return delete R[this.getConfiguration().authorization],b(this,N(C.prototype)),s.resolve()}),t.exports=C},{"../lib/add-metadata":31,"../lib/analytics":32,"../lib/assign":33,"../lib/braintree-error":34,"../lib/constants":35,"../lib/convert-methods-to-error":36,"../lib/convert-to-braintree-error":37,"../lib/create-authorization-data":38,"../lib/deferred":39,"../lib/errors":41,"../lib/is-verified-domain":43,"../lib/methods":45,"../lib/once":46,"../lib/promise":47,"./constants":11,"./errors":12,"./get-configuration":13,"./request":25,"./request/graphql":23,"@braintree/wrap-promise":7}],11:[function(e,t,r){"use strict";t.exports={BRAINTREE_API_VERSION_HEADER:"2017-04-03",BRAINTREE_VERSION:"2018-05-10"}},{}],12:[function(e,t,r){"use strict";var n=e("../lib/braintree-error");t.exports={CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN:{type:n.types.MERCHANT,code:"CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"},CLIENT_OPTION_REQUIRED:{type:n.types.MERCHANT,code:"CLIENT_OPTION_REQUIRED"},CLIENT_OPTION_INVALID:{type:n.types.MERCHANT,code:"CLIENT_OPTION_INVALID"},CLIENT_MISSING_GATEWAY_CONFIGURATION:{type:n.types.INTERNAL,code:"CLIENT_MISSING_GATEWAY_CONFIGURATION",message:"Missing gatewayConfiguration."},CLIENT_INVALID_AUTHORIZATION:{type:n.types.MERCHANT,code:"CLIENT_INVALID_AUTHORIZATION",message:"Authorization is invalid. Make sure your client token or tokenization key is valid."},CLIENT_GATEWAY_NETWORK:{type:n.types.NETWORK,code:"CLIENT_GATEWAY_NETWORK",message:"Cannot contact the gateway at this time."},CLIENT_REQUEST_TIMEOUT:{type:n.types.NETWORK,code:"CLIENT_REQUEST_TIMEOUT",message:"Request timed out waiting for a reply."},CLIENT_REQUEST_ERROR:{type:n.types.NETWORK,code:"CLIENT_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_GRAPHQL_REQUEST_ERROR:{type:n.types.NETWORK,code:"CLIENT_GRAPHQL_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_RATE_LIMITED:{type:n.types.MERCHANT,code:"CLIENT_RATE_LIMITED",message:"You are being rate-limited; please try again in a few minutes."},CLIENT_AUTHORIZATION_INSUFFICIENT:{type:n.types.MERCHANT,code:"CLIENT_AUTHORIZATION_INSUFFICIENT",message:"The authorization used has insufficient privileges."}}},{"../lib/braintree-error":34}],13:[function(r,n,e){(function(d){"use strict";var p=r("../lib/braintree-error"),e=r("../lib/promise"),t=r("@braintree/wrap-promise"),l=r("./request"),f=r("../lib/vendor/uuid"),h=r("../lib/constants"),y=r("../lib/create-authorization-data"),E=r("./errors"),g=r("./request/graphql"),I=r("../lib/is-date-string-before-or-on"),_=r("./constants").BRAINTREE_VERSION;n.exports={getConfiguration:t(function(c){return new e(function(o,i){var a,e,s,t,r,n=f(),u={merchantAppId:d.location.host,platform:h.PLATFORM,sdkVersion:h.VERSION,source:h.SOURCE,integration:h.INTEGRATION,integrationType:h.INTEGRATION,sessionId:n};try{e=y(c.authorization)}catch(e){return void i(new p(E.CLIENT_INVALID_AUTHORIZATION))}s=e.attrs,t=e.configUrl,s._meta=u,s.braintreeLibraryVersion=h.BRAINTREE_LIBRARY_VERSION,s.configVersion="3",r={url:t,method:"GET",data:s},s.authorizationFingerprint&&e.graphQL&&(I(e.graphQL.date,_)&&(r.graphQL=new g({graphQL:{url:e.graphQL.url,features:["configuration"]}})),r.metadata=u),l(r,function(e,t,r){var n;if(e)return n=403===r?E.CLIENT_AUTHORIZATION_INSUFFICIENT:E.CLIENT_GATEWAY_NETWORK,void i(new p({type:n.type,code:n.code,message:n.message,details:{originalError:e}}));a={authorization:c.authorization,authorizationType:s.tokenizationKey?"TOKENIZATION_KEY":"CLIENT_TOKEN",analyticsMetadata:u,gatewayConfiguration:t},o(a)})})})}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/braintree-error":34,"../lib/constants":35,"../lib/create-authorization-data":38,"../lib/is-date-string-before-or-on":42,"../lib/promise":47,"../lib/vendor/uuid":50,"./constants":11,"./errors":12,"./request":25,"./request/graphql":23,"@braintree/wrap-promise":7}],14:[function(e,t,r){"use strict";var n=e("../lib/braintree-error"),o=e("./client"),i=e("../lib/promise"),a=e("@braintree/wrap-promise"),s=e("../lib/errors");t.exports={create:a(function(e){return e.authorization?o.initialize(e):i.reject(new n({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.authorization is required when instantiating a client."}))}),VERSION:"3.38.1"}},{"../lib/braintree-error":34,"../lib/errors":41,"../lib/promise":47,"./client":10,"@braintree/wrap-promise":7}],15:[function(e,t,r){"use strict";var E=e("../../lib/querystring"),g=e("../browser-detection"),I=e("../../lib/assign").assign,_=e("./prep-body"),A=e("./parse-body"),T=e("./xhr"),m=T.isAvailable,N=e("./graphql/request"),b=e("./default-request"),R=1,C=408;function v(n,o,i){var a,s,u,e,t,r,c,d=n.url,p=n.graphQL,l=n.timeout,f=T.getRequestObject(),h=i,y=Boolean(p&&p.isGraphQLRequest(d,n.data));n.headers=I({"Content-Type":"application/json"},n.headers),d=(u=y?new N(n):new b(n)).getUrl(),e=u.getBody(),t=u.getMethod(),r=u.getHeaders(),"GET"===t&&(d=E.queryify(d,e),e=null),m?f.onreadystatechange=function(){if(4===f.readyState){if(0===f.status&&y)return delete n.graphQL,void v(n,o,i);if(c=A(f.responseText),s=u.adaptResponseBody(c),400<=(a=u.determineStatus(f.status,c))||a<200){if(y&&("UNKNOWN"===(r=!(t=c).data&&t.errors&&t.errors[0]&&t.errors[0].extensions&&t.errors[0].extensions.errorClass)||"INTERNAL"===r))return delete n.graphQL,void v(n,o,i);if(o<R&&((!(e=a)||e===C)&&g.isIe()))return void v(n,++o,i);h(s||"error",null,a||500)}else h(null,s,a);var e,t,r}}:(n.headers&&(d=E.queryify(d,r)),f.onload=function(){h(null,A(f.responseText),f.status)},f.onerror=function(){h("error",null,500)},f.onprogress=function(){},f.ontimeout=function(){h("timeout",null,-1)});try{f.open(t,d,!0)}catch(e){if(!y)throw e;return delete n.graphQL,void v(n,o,i)}f.timeout=l,m&&Object.keys(r).forEach(function(e){f.setRequestHeader(e,r[e])});try{f.send(_(t,e))}catch(e){}}t.exports={request:function(e,t){v(e,0,t)}}},{"../../lib/assign":33,"../../lib/querystring":48,"../browser-detection":9,"./default-request":16,"./graphql/request":24,"./parse-body":28,"./prep-body":29,"./xhr":30}],16:[function(e,t,r){"use strict";function n(e){this._url=e.url,this._data=e.data,this._method=e.method,this._headers=e.headers}n.prototype.getUrl=function(){return this._url},n.prototype.getBody=function(){return this._data},n.prototype.getMethod=function(){return this._method},n.prototype.getHeaders=function(){return this._headers},n.prototype.adaptResponseBody=function(e){return e},n.prototype.determineStatus=function(e){return e},t.exports=n},{}],17:[function(e,t,r){(function(e){"use strict";t.exports=function(){return e.navigator.userAgent}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],18:[function(e,t,r){"use strict";var a=e("./error"),s=e("../../../../lib/assign").assign,u={creditCard:{AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",INTERNATIONAL_MAESTRO:"Maestro",JCB:"JCB",MASTERCARD:"MasterCard",SOLO:"Solo",UK_MAESTRO:"UK Maestro",UNION_PAY:"UnionPay",VISA:"Visa"},applePayWeb:{VISA:"visa",MASTERCARD:"mastercard",DISCOVER:"discover",AMERICAN_EXPRESS:"amex"},visaCheckout:{VISA:"Visa",MASTERCARD:"MasterCard",DISCOVER:"Discover",AMERICAN_EXPRESS:"American Express"},googlePay:{VISA:"visa",MASTERCARD:"mastercard",DISCOVER:"discover",AMERICAN_EXPRESS:"amex"},masterpass:{VISA:"visa",MASTERCARD:"master",DISCOVER:"discover",AMERICAN_EXPRESS:"amex",DINERS:"diners",INTERNATIONAL_MAESTRO:"maestro",JCB:"jcb"}};function c(e,r){return e.reduce(function(e,t){return r.hasOwnProperty(t)?e.concat(r[t]):e},[])}t.exports=function(e,t){return e.data&&!e.errors?(r=e,n=t,i=r.data.clientConfiguration,o={environment:i.environment.toLowerCase(),clientApiUrl:i.clientApiUrl,assetsUrl:i.assetsUrl,analytics:{url:i.analyticsUrl},merchantId:i.merchantId,venmo:"off"},i.supportedFeatures&&(o.graphQL={url:n._graphQL._config.url,features:i.supportedFeatures.map(function(e){return e.toLowerCase()})}),i.braintreeApi&&(o.braintreeApi=i.braintreeApi),i.applePayWeb&&(o.applePayWeb=i.applePayWeb,o.applePayWeb.supportedNetworks=c(i.applePayWeb.supportedCardBrands,u.applePayWeb),delete o.applePayWeb.supportedCardBrands),i.ideal&&(o.ideal=i.ideal),i.kount&&(o.kount={kountMerchantId:i.kount.merchantId}),i.creditCard?(o.challenges=i.creditCard.challenges.map(function(e){return e.toLowerCase()}),o.creditCards={supportedCardTypes:c(i.creditCard.supportedCardBrands,u.creditCard)},o.threeDSecureEnabled=i.creditCard.threeDSecureEnabled):(o.challenges=[],o.creditCards={supportedCardTypes:[]},o.threeDSecureEnabled=!1),i.googlePay&&(o.androidPay={displayName:i.googlePay.displayName,enabled:!0,environment:i.googlePay.environment.toLowerCase(),googleAuthorizationFingerprint:i.googlePay.googleAuthorization,supportedNetworks:c(i.googlePay.supportedCardBrands,u.googlePay)}),i.venmo&&(o.payWithVenmo={merchantId:i.venmo.merchantId,accessToken:i.venmo.accessToken,environment:i.venmo.environment.toLowerCase()}),i.paypal?(o.paypalEnabled=!0,o.paypal=s({},i.paypal),o.paypal.currencyIsoCode=o.paypal.currencyCode,o.paypal.environment=o.paypal.environment.toLowerCase(),delete o.paypal.currencyCode):o.paypalEnabled=!1,i.unionPay&&(o.unionPay={enabled:!0,merchantAccountId:i.unionPay.merchantAccountId}),i.visaCheckout&&(o.visaCheckout={apikey:i.visaCheckout.apiKey,externalClientId:i.visaCheckout.externalClientId,supportedCardTypes:c(i.visaCheckout.supportedCardBrands,u.visaCheckout)}),i.masterpass&&(o.masterpass={merchantCheckoutId:i.masterpass.merchantCheckoutId,supportedNetworks:c(i.masterpass.supportedCardBrands,u.masterpass)}),i.usBankAccount&&(o.usBankAccount={routeId:i.usBankAccount.routeId,plaid:{publicKey:i.usBankAccount.plaidPublicKey}}),o):a(e);var r,n,o,i}},{"../../../../lib/assign":33,"./error":20}],19:[function(e,t,r){"use strict";var a=e("./error"),s={AMERICAN_EXPRESS:"American Express",DINERS:"Discover",DISCOVER:"Discover",INTERNATIONAL_MAESTRO:"Maestro",JCB:"JCB",MASTERCARD:"MasterCard",UK_MAESTRO:"Maestro",UNION_PAY:"Union Pay",VISA:"Visa"},u={YES:"Yes",NO:"No",UNKNOWN:"Unknown"};t.exports=function(e){return e.data&&!e.errors?(t=e,r=t.data.tokenizeCreditCard,n=r.creditCard,o=n.last4?n.last4.substr(2,4):"",i=n.binData,i&&(["commercial","debit","durbinRegulated","healthcare","payroll","prepaid"].forEach(function(e){i[e]?i[e]=u[i[e]]:i[e]="Unknown"}),["issuingBank","countryOfIssuance","productId"].forEach(function(e){i[e]||(i[e]="Unknown")})),{creditCards:[{binData:i,consumed:!1,description:o?"ending in "+o:"",nonce:r.token,details:{cardType:s[n.brandCode]||"Unknown",lastFour:n.last4||"",lastTwo:o},type:"CreditCard",threeDSecureInfo:null}]}):a(e);var t,r,n,o,i}},{"./error":20}],20:[function(e,t,r){"use strict";t.exports=function(e){var t,r,n,o,i,a,s=e.errors&&e.errors[0]&&e.errors[0].extensions&&e.errors[0].extensions.errorClass;return"VALIDATION"===s?(n=e.errors,o=[],n.forEach(function(e){!function e(t,r,n){var o,i=r.extensions.legacyCode,a=t[0];1!==t.length?(n.forEach(function(e){e.field===a&&(o=e)}),o||(o={field:a,fieldErrors:[]},n.push(o)),e(t.slice(1),r,o.fieldErrors)):n.push({code:i,field:a,message:r.message})}(e.extensions.inputPath.slice(1),e,o)}),t={error:{message:(i=r=o,a=i[0].field,{creditCard:"Credit card is invalid"}[a])},fieldErrors:r}):t=s?{error:{message:e.errors[0].message},fieldErrors:[]}:{error:{message:"There was a problem serving your request"},fieldErrors:[]},t}},{}],21:[function(e,t,r){"use strict";t.exports=function(){return{query:"query ClientConfiguration {   clientConfiguration {     analyticsUrl     environment     merchantId     assetsUrl     clientApiUrl     creditCard {       supportedCardBrands       challenges       threeDSecureEnabled     }     applePayWeb {       countryCode       currencyCode       merchantIdentifier       supportedCardBrands     }     googlePay {       displayName       supportedCardBrands       environment       googleAuthorization     }     ideal {       routeId       assetsUrl     }     kount {       merchantId     }     masterpass {       merchantCheckoutId       supportedCardBrands     }     paypal {       displayName       clientId       privacyUrl       userAgreementUrl       assetsUrl       environment       environmentNoNetwork       unvettedMerchant       braintreeClientId       billingAgreementsEnabled       merchantAccountId       currencyCode       payeeEmail     }     unionPay {       merchantAccountId     }     usBankAccount {       routeId       plaidPublicKey     }     venmo {       merchantId       accessToken       environment     }     visaCheckout {       apiKey       externalClientId       supportedCardBrands     }     braintreeApi {       accessToken       url     }     supportedFeatures   } }",operationName:"ClientConfiguration"}}},{}],22:[function(e,t,r){"use strict";var s=e("../../../../lib/assign").assign;function n(e){var t=e.creditCard,r=t&&t.billingAddress,n=t&&t.expirationDate,o=t&&(t.expirationMonth||n&&n.split("/")[0].trim()),i=t&&(t.expirationYear||n&&n.split("/")[1].trim()),a={input:{creditCard:{number:t&&t.number,expirationMonth:o,expirationYear:i,cvv:t&&t.cvv,cardholderName:t&&t.cardholderName},options:{}}};return r&&(a.input.creditCard.billingAddress=r),a.input=function(e,t){var r;e.creditCard&&e.creditCard.options&&"boolean"==typeof e.creditCard.options.validate?r=e.creditCard.options.validate:e.authorizationFingerprint&&e.tokenizationKey||e.authorizationFingerprint?r=!0:e.tokenizationKey&&(r=!1);"boolean"==typeof r&&(t.options=s({validate:r},t.options));return t}(e,a.input),a}t.exports=function(e){return{query:"mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) {   tokenizeCreditCard(input: $input) {     token     creditCard {       brandCode       last4       binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     }   } }",variables:n(e),operationName:"TokenizeCreditCard"}}},{"../../../../lib/assign":33}],23:[function(e,t,r){"use strict";var i=e("../../browser-detection"),a={tokenize_credit_cards:"payment_methods/credit_cards",configuration:"configuration"},s=["creditCard.options.unionPayEnrollment"];function n(e){this._config=e.graphQL}n.prototype.getGraphQLEndpoint=function(){return this._config.url},n.prototype.isGraphQLRequest=function(e,t){var r,n,o=this.getClientApiPath(e);return!(!this._isGraphQLEnabled()||!o||i.isIe9())&&(r=this._config.features.some(function(e){return a[e]===o}),n=t,!s.some(function(e){var t=e.split(".").reduce(function(e,t){return e&&e[t]},n);return void 0!==t})&&r)},n.prototype.getClientApiPath=function(e){var t,r=e.split("/client_api/v1/");return 1<r.length&&(t=r[1].split("?")[0]),t},n.prototype._isGraphQLEnabled=function(){return Boolean(this._config)},t.exports=n},{"../../browser-detection":9}],24:[function(e,t,r){"use strict";var n=e("../../constants").BRAINTREE_VERSION,o=e("../../../lib/assign").assign,i=e("./generators/credit-card-tokenization"),a=e("./adapters/credit-card-tokenization"),s=e("./generators/configuration"),u=e("./adapters/configuration"),c={"payment_methods/credit_cards":i,configuration:s},d={"payment_methods/credit_cards":a,configuration:u};function p(e){var t=e.graphQL.getClientApiPath(e.url);this._graphQL=e.graphQL,this._data=e.data,this._method=e.method,this._headers=e.headers,this._clientSdkMetadata={source:e.metadata.source,integration:e.metadata.integration,sessionId:e.metadata.sessionId},this._sendAnalyticsEvent=e.sendAnalyticsEvent||Function.prototype,this._generator=c[t],this._adapter=d[t],this._sendAnalyticsEvent("graphql.init")}p.prototype.getUrl=function(){return this._graphQL.getGraphQLEndpoint()},p.prototype.getBody=function(){var e=function r(n){var o={};Object.keys(n).forEach(function(e){var t=function(e){if(-1===e.indexOf("_"))return e;return e.toLowerCase().replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}(e);"object"==typeof n[e]?o[t]=r(n[e]):"number"==typeof n[e]?o[t]=String(n[e]):o[t]=n[e]});return o}(this._data),t=this._generator(e),r=o({clientSdkMetadata:this._clientSdkMetadata},t);return JSON.stringify(r)},p.prototype.getMethod=function(){return"POST"},p.prototype.getHeaders=function(){var e,t;return this._data.authorizationFingerprint?(this._sendAnalyticsEvent("graphql.authorization-fingerprint"),e=this._data.authorizationFingerprint):(this._sendAnalyticsEvent("graphql.tokenization-key"),e=this._data.tokenizationKey),t={Authorization:"Bearer "+e,"Braintree-Version":n},o({},this._headers,t)},p.prototype.adaptResponseBody=function(e){return this._adapter(e,this)},p.prototype.determineStatus=function(e,t){var r,n,o;return 200===e?(n=t.errors&&t.errors[0]&&t.errors[0].extensions&&t.errors[0].extensions.errorClass,t.data&&!t.errors?r=200:"VALIDATION"===n?r=422:"AUTHORIZATION"===n?r=403:"AUTHENTICATION"===n?r=401:(o=t,r=!n&&o.errors[0].message?403:500)):r=e||500,this._sendAnalyticsEvent("graphql.status."+e),this._sendAnalyticsEvent("graphql.determinedStatus."+r),r},t.exports=p},{"../../../lib/assign":33,"../../constants":11,"./adapters/configuration":18,"./adapters/credit-card-tokenization":19,"./generators/configuration":21,"./generators/credit-card-tokenization":22}],25:[function(e,t,r){"use strict";var n,o=e("../../lib/once"),i=e("./jsonp-driver"),a=e("./ajax-driver"),s=e("./get-user-agent"),u=e("./is-http");t.exports=function(e,t){t=o(t||Function.prototype),e.method=(e.method||"GET").toUpperCase(),e.timeout=null==e.timeout?6e4:e.timeout,e.data=e.data||{},null==n&&(n=!(u()&&/MSIE\s(8|9)/.test(s()))),n?a.request(e,t):i.request(e,t)}},{"../../lib/once":46,"./ajax-driver":15,"./get-user-agent":17,"./is-http":26,"./jsonp-driver":27}],26:[function(e,t,r){(function(e){"use strict";t.exports=function(){return"http:"===e.location.protocol}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],27:[function(e,t,r){(function(g){"use strict";var I,_=e("../../lib/vendor/uuid"),A=e("../../lib/querystring"),T={};function m(t){try{delete g[t]}catch(e){g[t]=null}}t.exports={request:function(e,t){var r,n,o,i,a,s,u,c,d,p,l="callback_json_"+_().replace(/-/g,""),f=e.url,h=e.data,y=e.method,E=e.timeout;f=A.queryify(f,h),f=A.queryify(f,{_method:y,callback:l}),n=f,o=l,i=document.createElement("script"),a=!1,i.src=n,i.async=!0,i.onerror=function(){g[o]({message:"error",status:500})},i.onload=i.onreadystatechange=function(){a||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(a=!0,i.onload=i.onreadystatechange=null)},s=r=i,u=t,g[c=l]=function(e){var t,r=e.status||500,n=null,o=null;delete e.status,400<=r||r<200?n=e:o=e,m(c),(t=s)&&t.parentNode&&t.parentNode.removeChild(t),clearTimeout(T[c]),u(n,o,r)},d=E,T[p=l]=setTimeout(function(){T[p]=null,g[p]({error:"timeout",status:-1}),g[p]=function(){m(p)}},d),I||(I=document.getElementsByTagName("head")[0]),I.appendChild(r)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/querystring":48,"../../lib/vendor/uuid":50}],28:[function(e,t,r){"use strict";t.exports=function(e){try{e=JSON.parse(e)}catch(e){}return e}},{}],29:[function(e,t,r){"use strict";t.exports=function(e,t){if("string"!=typeof e)throw new Error("Method must be a string");return"get"!==e.toLowerCase()&&null!=t&&(t="string"==typeof t?t:JSON.stringify(t)),t}},{}],30:[function(e,r,t){(function(e){"use strict";var t=e.XMLHttpRequest&&"withCredentials"in new e.XMLHttpRequest;r.exports={isAvailable:t,getRequestObject:function(){return t?new XMLHttpRequest:new XDomainRequest}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],31:[function(e,t,r){"use strict";var a=e("./create-authorization-data"),s=e("./json-clone"),u=e("./constants");t.exports=function(e,t){var r,n=t?s(t):{},o=a(e.authorization).attrs,i=s(e.analyticsMetadata);for(r in n.braintreeLibraryVersion=u.BRAINTREE_LIBRARY_VERSION,n._meta)n._meta.hasOwnProperty(r)&&(i[r]=n._meta[r]);return n._meta=i,o.tokenizationKey?n.tokenizationKey=o.tokenizationKey:n.authorizationFingerprint=o.authorizationFingerprint,n}},{"./constants":35,"./create-authorization-data":38,"./json-clone":44}],32:[function(e,t,r){"use strict";var n=e("./promise"),c=e("./constants"),d=e("./add-metadata");function p(e){return Math.floor(e/1e3)}t.exports={sendEvent:function(e,a,s){var u=p(Date.now());return n.resolve(e).then(function(e){var t=p(Date.now()),r=e.getConfiguration(),n=e._request,o=r.gatewayConfiguration.analytics.url,i={analytics:[{kind:c.ANALYTICS_PREFIX+a,isAsync:t!==u,timestamp:u}]};n({url:o,method:"post",data:d(r,i),timeout:c.ANALYTICS_REQUEST_TIMEOUT_MS},s)})}}},{"./add-metadata":31,"./constants":35,"./promise":47}],33:[function(e,t,r){"use strict";var n="function"==typeof Object.assign?Object.assign:o;function o(e){var t,r,n;for(t=1;t<arguments.length;t++)for(n in r=arguments[t])r.hasOwnProperty(n)&&(e[n]=r[n]);return e}t.exports={assign:n,_assign:o}},{}],34:[function(e,t,r){"use strict";var n=e("./enumerate");function o(e){if(!o.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((o.prototype=Object.create(Error.prototype)).constructor=o).types=n(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),o.findRootError=function(e){return e instanceof o&&e.details&&e.details.originalError?o.findRootError(e.details.originalError):e},t.exports=o},{"./enumerate":40}],35:[function(e,t,r){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.38.1",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.38.1"}},{}],36:[function(e,t,r){"use strict";var n=e("./braintree-error"),o=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new n({type:o.METHOD_CALLED_AFTER_TEARDOWN.type,code:o.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":34,"./errors":41}],37:[function(e,t,r){"use strict";var n=e("./braintree-error");t.exports=function(e,t){return e instanceof n?e:new n({type:t.type,code:t.code,message:t.message,details:{originalError:e}})}},{"./braintree-error":34}],38:[function(e,t,r){"use strict";var a=e("../lib/vendor/polyfill").atob,s=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,r,n,o,i={attrs:{},configUrl:""};return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)?(n=e.split("_"),o=n[0],r={merchantId:n.slice(2).join("_"),environment:o},i.environment=r.environment,i.attrs.tokenizationKey=e,i.configUrl=s[r.environment]+"/merchants/"+r.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(a(e)),i.environment=t.environment,i.attrs.authorizationFingerprint=t.authorizationFingerprint,i.configUrl=t.configUrl,i.graphQL=t.graphQL),i}},{"../lib/constants":35,"../lib/vendor/polyfill":49}],39:[function(e,t,r){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}},{}],40:[function(e,t,r){"use strict";t.exports=function(e,r){return r=null==r?"":r,e.reduce(function(e,t){return e[t]=r+t,e},{})}},{}],41:[function(e,t,r){"use strict";var n=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:n.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:n.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:n.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:n.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:n.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":34}],42:[function(e,t,r){"use strict";function n(e){var t=e.split("-");return new Date(t[0],t[1],t[2])}t.exports=function(e,t){return n(e)<=n(t)}},{}],43:[function(e,t,r){"use strict";var n,o={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=function(e){var t;return e=e.toLowerCase(),!!/^https:/.test(e)&&((n=n||document.createElement("a")).href=e,t=n.hostname.split(".").slice(-2).join("."),o.hasOwnProperty(t))}},{}],44:[function(e,t,r){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],45:[function(e,t,r){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],46:[function(e,t,r){arguments[4][5][0].apply(r,arguments)},{dup:5}],47:[function(r,n,e){(function(e){"use strict";var t=e.Promise||r("promise-polyfill");n.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":8}],48:[function(e,r,t){(function(t){"use strict";function s(e,t){var r,n,o,i,a=[];for(o in e)e.hasOwnProperty(o)&&(n=e[o],r=t?(i=e)&&"object"==typeof i&&"number"==typeof i.length&&"[object Array]"===Object.prototype.toString.call(i)?t+"[]":t+"["+o+"]":o,"object"==typeof n?a.push(s(n,r)):a.push(encodeURIComponent(r)+"="+encodeURIComponent(n)));return a.join("&")}r.exports={parse:function(e){return e=e||t.location.href,/\?/.test(e)?e.replace(/#.*$/,"").replace(/^.*\?/,"").split("&").reduce(function(e,t){var r=t.split("="),n=decodeURIComponent(r[0]),o=decodeURIComponent(r[1]);return e[n]=o,e},{}):{}},stringify:s,queryify:function(e,t){return e=e||"",null!=t&&"object"==typeof t&&function(e){var t;for(t in e)if(e.hasOwnProperty(t))return!0;return!1}(t)&&(e+=-1===e.indexOf("?")?"?":"",e+=-1!==e.indexOf("=")?"&":"",e+=s(t)),e}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],49:[function(e,n,t){(function(t){"use strict";var r="function"==typeof t.atob?t.atob:e;function e(e){var t,r,n,o,i,a,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(a=0;t=(63&s.indexOf(e.charAt(a++)))<<2|(o=s.indexOf(e.charAt(a++)))>>4&3,r=(15&o)<<4|(i=s.indexOf(e.charAt(a++)))>>2&15,n=(3&i)<<6|63&s.indexOf(e.charAt(a++)),u+=String.fromCharCode(t)+(r?String.fromCharCode(r):"")+(n?String.fromCharCode(n):""),a<e.length;);return u}n.exports={atob:function(e){return r.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],50:[function(e,t,r){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}]},{},[14])(14)});