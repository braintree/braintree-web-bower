!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;((t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).braintree||(t.braintree={})).client=e()}}(function(){return function o(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(d)return d(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=s[t]={exports:{}};a[t][0].call(i.exports,function(e){return u(a[t][1][e]||e)},i,i.exports,o,a,s,c)}return s[t].exports}for(var d="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(r,n,e){(function(e){"use strict";var t=r("promise-polyfill");n.exports=e.Promise||t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":10}],2:[function(e,t,r){"use strict";var a=e("./lib/promise"),s={};function n(r){var t,n,i,e,o=JSON.stringify(r);return!r.forceScriptReload&&(e=s[o])?e:(i=document.createElement("script"),t=r.dataAttributes||{},n=r.container||document.head,i.src=r.src,i.id=r.id,i.async=!0,Object.keys(t).forEach(function(e){i.setAttribute("data-"+e,t[e])}),e=new a(function(e,t){i.addEventListener("load",function(){e(i)}),i.addEventListener("error",function(){t(new Error(r.src+" failed to load."))}),i.addEventListener("abort",function(){t(new Error(r.src+" has aborted."))}),n.appendChild(i)}),s[o]=e)}n.clearCache=function(){s={}},t.exports=n},{"./lib/promise":1}],3:[function(e,n,t){(function(t){"use strict";var r=e("./is-ie11");n.exports=function(e){return-1!==(e=e||t.navigator.userAgent).indexOf("MSIE")||r(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-ie11":4}],4:[function(e,t,r){"use strict";t.exports=function(e){return-1!==(e=e||navigator.userAgent).indexOf("Trident/7")}},{}],5:[function(e,t,r){"use strict";t.exports=function(e){return-1!==(e=e||navigator.userAgent).indexOf("MSIE 9")}},{}],6:[function(e,t,r){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){try{t.apply(null,e)}catch(e){console.log("Error in callback function"),console.log(e)}},1)}}},{}],7:[function(e,t,r){"use strict";t.exports=function(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}},{}],8:[function(e,t,r){"use strict";t.exports=function(e,t){if(!t)return e;e.then(function(e){t(null,e)}).catch(function(e){t(e)})}},{}],9:[function(e,t,r){"use strict";var n=e("./lib/deferred"),i=e("./lib/once"),o=e("./lib/promise-or-callback");function s(r){return function(){var e,t=Array.prototype.slice.call(arguments);return"function"==typeof t[t.length-1]&&(e=t.pop(),e=i(n(e))),o(r.apply(this,t),e)}}s.wrapPrototype=function(i,e){var o,a;return o=(e=e||{}).ignoreMethods||[],a=!0===e.transformPrivateMethods,Object.getOwnPropertyNames(i.prototype).filter(function(e){var t,r="constructor"!==e&&"function"==typeof i.prototype[e],n=-1===o.indexOf(e);return t=a||"_"!==e.charAt(0),r&&t&&n}).forEach(function(e){var t=i.prototype[e];i.prototype[e]=s(t)}),i},t.exports=s},{"./lib/deferred":6,"./lib/once":7,"./lib/promise-or-callback":8}],10:[function(e,t,r){"use strict";var n=setTimeout;function i(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function a(r,n){for(;3===r._state;)r=r._value;0!==r._state?(r._handled=!0,o._immediateFn(function(){var e=1===r._state?n.onFulfilled:n.onRejected;if(null!==e){var t;try{t=e(r._value)}catch(e){return void c(n.promise,e)}s(n.promise,t)}else(1===r._state?s:c)(n.promise,r._value)})):r._deferreds.push(n)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof o)return t._state=3,t._value=e,void u(t);if("function"==typeof r)return void p(function(e,t){return function(){e.apply(t,arguments)}}(r,e),t)}t._state=1,t._value=e,u(t)}catch(e){c(t,e)}}function c(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)a(e,e._deferreds[t]);e._deferreds=null}function d(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function p(e,t){var r=!1;try{e(function(e){r||(r=!0,s(t,e))},function(e){r||(r=!0,c(t,e))})}catch(e){if(r)return;r=!0,c(t,e)}}o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var r=new this.constructor(i);return a(this,new d(e,t,r)),r},o.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){return r.reject(e)})})},o.all=function(t){return new o(function(n,i){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(t);if(0===o.length)return n([]);var a=o.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if("function"==typeof r)return void r.call(e,function(e){s(t,e)},i)}o[t]=e,0==--a&&n(o)}catch(e){i(e)}}for(var e=0;e<o.length;e++)s(e,o[e])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(r){return new o(function(e,t){t(r)})},o.race=function(i){return new o(function(e,t){for(var r=0,n=i.length;r<n;r++)i[r].then(e,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){n(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.exports=o},{}],11:[function(e,t,r){"use strict";var n=e("@braintree/browser-detection/is-ie"),i=e("@braintree/browser-detection/is-ie9");t.exports={isIe:n,isIe9:i}},{"@braintree/browser-detection/is-ie":3,"@braintree/browser-detection/is-ie9":5}],12:[function(e,t,r){"use strict";var i=e("./constants").BRAINTREE_VERSION,o=e("./request/graphql"),a=e("./request"),s=e("../lib/is-verified-domain"),d=e("../lib/braintree-error"),p=e("../lib/convert-to-braintree-error"),l=e("../lib/create-authorization-data"),n=e("./get-configuration").getConfiguration,f=e("../lib/add-metadata"),c=e("../lib/promise"),u=e("@braintree/wrap-promise"),h=e("../lib/once"),y=e("../lib/deferred"),E=e("../lib/assign").assign,g=e("../lib/analytics"),I=e("./constants"),_=e("./errors"),A=e("../lib/errors"),m=e("../lib/constants").VERSION,T=e("../lib/constants").GRAPHQL_URLS,N=e("../lib/methods"),b=e("../lib/convert-methods-to-error"),R=e("../lib/assets"),C=e("../lib/constants").FRAUDNET_FNCLS,v=e("../lib/constants").FRAUDNET_SOURCE,O=e("../lib/constants").FRAUDNET_URL,w={};function S(e){var t,r,n;if(e=e||{},t=JSON.stringify(e),!(r=e.gatewayConfiguration))throw new d(_.CLIENT_MISSING_GATEWAY_CONFIGURATION);if(["assetsUrl","clientApiUrl","configUrl"].forEach(function(e){if(e in r&&!s(r[e]))throw new d({type:_.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:_.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:e+" property is on an invalid domain."})}),this.getConfiguration=function(){return JSON.parse(t)},this._request=a,this._configuration=this.getConfiguration(),this._clientApiBaseUrl=r.clientApiUrl+"/v1/",(n=r.braintreeApi)&&(this._braintreeApi={baseUrl:n.url+"/",accessToken:n.accessToken},!s(this._braintreeApi.baseUrl)))throw new d({type:_.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:_.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:"braintreeApi URL is on an invalid domain."});r.graphQL&&(this._graphQL=new o({graphQL:r.graphQL}))}S.initialize=function(t){var r,e=w[t.authorization];return e?(g.sendEvent(e,"custom.client.load.cached"),e):(e=n(t).then(function(e){return t.debug&&(e.isDebug=!0),r=new S(e)}),w[t.authorization]=e,g.sendEvent(e,"custom.client.load.initialized"),e.then(function(e){return g.sendEvent(r,"custom.client.load.succeeded"),e}).catch(function(e){return delete w[t.authorization],c.reject(e)}))},S.clearCache=function(){w={}},S.prototype._findOrCreateFraudnetJSON=function(e){var t,r,n,i,o=document.querySelector('script[fncls="'+C+'"]');o||((o=document.body.appendChild(document.createElement("script"))).type="application/json",o.setAttribute("fncls",C)),t=this.getConfiguration(),r={rda_tenant:"bt_card",mid:t.gatewayConfiguration.merchantId},(n=l(t.authorization).attrs.authorizationFingerprint)&&n.split("&").forEach(function(e){var t=e.split("=");"customer_id"===t[0]&&1<t.length&&(r.cid=t[1])}),i={f:e.substr(0,32),fp:r,bu:!1,s:v},o.text=JSON.stringify(i)},S.prototype.request=function(n,r){var u=this,e=new c(function(o,a){var e,s,t,r,c=Boolean("payment_methods/credit_cards"===n.endpoint&&u.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData);if("graphQLApi"!==n.api&&(n.method?n.endpoint||(e="options.endpoint"):e="options.method"),e)throw new d({type:_.CLIENT_OPTION_REQUIRED.type,code:_.CLIENT_OPTION_REQUIRED.code,message:e+" is required when making a request."});if(s="api"in n?n.api:"clientApi",r={method:n.method,graphQL:u._graphQL,timeout:n.timeout,metadata:u._configuration.analyticsMetadata},"clientApi"===s)t=u._clientApiBaseUrl,r.data=f(u._configuration,n.data);else if("braintreeApi"===s){if(!u._braintreeApi)throw new d(A.BRAINTREE_API_ACCESS_RESTRICTED);t=u._braintreeApi.baseUrl,r.data=n.data,r.headers={"Braintree-Version":I.BRAINTREE_API_VERSION_HEADER,Authorization:"Bearer "+u._braintreeApi.accessToken}}else{if("graphQLApi"!==s)throw new d({type:_.CLIENT_OPTION_INVALID.type,code:_.CLIENT_OPTION_INVALID.code,message:"options.api is invalid."});t=T[u._configuration.gatewayConfiguration.environment],n.endpoint="",r.method="post",r.data=E({clientSdkMetadata:{source:u._configuration.analyticsMetadata.source,integration:u._configuration.analyticsMetadata.integration,sessionId:u._configuration.analyticsMetadata.sessionId}},n.data),r.headers=function(e){var t=l(e).attrs;return{Authorization:"Bearer "+(t.authorizationFingerprint||t.tokenizationKey),"Braintree-Version":i}}(u._configuration.authorization)}r.url=t+n.endpoint,r.sendAnalyticsEvent=function(e){g.sendEvent(u,e)},u._request(r,function(e,t,r){var n,i;(i=function(e,t){var r;-1===e?r=new d(_.CLIENT_REQUEST_TIMEOUT):403===e?r=new d(_.CLIENT_AUTHORIZATION_INSUFFICIENT):429===e?r=new d(_.CLIENT_RATE_LIMITED):500<=e?r=new d(_.CLIENT_GATEWAY_NETWORK):(e<200||400<=e)&&(r=p(t,{type:_.CLIENT_REQUEST_ERROR.type,code:_.CLIENT_REQUEST_ERROR.code,message:_.CLIENT_REQUEST_ERROR.message}));if(r)return r.details=r.details||{},r.details.httpStatus=e,r}(r,e))?a(i):"graphQLApi"===s&&t.errors?a(p(t.errors,{type:_.CLIENT_GRAPHQL_REQUEST_ERROR.type,code:_.CLIENT_GRAPHQL_REQUEST_ERROR.code,message:_.CLIENT_GRAPHQL_REQUEST_ERROR.message})):(n=E({_httpStatus:r},t),c&&n.creditCards&&0<n.creditCards.length&&(u._findOrCreateFraudnetJSON(n.creditCards[0].nonce),R.loadScript({src:O,forceScriptReload:!0})),o(n))})});return"function"==typeof r?(r=h(y(r)),void e.then(function(e){r(null,e,e._httpStatus)}).catch(function(e){var t=e&&e.details&&e.details.httpStatus;r(e,null,t)})):e},S.prototype.toJSON=function(){return this.getConfiguration()},S.prototype.getVersion=function(){return m},S.prototype.teardown=u(function(){return delete w[this.getConfiguration().authorization],b(this,N(S.prototype)),c.resolve()}),t.exports=S},{"../lib/add-metadata":33,"../lib/analytics":34,"../lib/assets":35,"../lib/assign":36,"../lib/braintree-error":37,"../lib/constants":38,"../lib/convert-methods-to-error":39,"../lib/convert-to-braintree-error":40,"../lib/create-authorization-data":41,"../lib/deferred":42,"../lib/errors":44,"../lib/is-verified-domain":46,"../lib/methods":48,"../lib/once":49,"../lib/promise":50,"./constants":13,"./errors":14,"./get-configuration":15,"./request":27,"./request/graphql":25,"@braintree/wrap-promise":9}],13:[function(e,t,r){"use strict";t.exports={BRAINTREE_API_VERSION_HEADER:"2017-04-03",BRAINTREE_VERSION:"2018-05-10"}},{}],14:[function(e,t,r){"use strict";var n=e("../lib/braintree-error");t.exports={CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN:{type:n.types.MERCHANT,code:"CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"},CLIENT_OPTION_REQUIRED:{type:n.types.MERCHANT,code:"CLIENT_OPTION_REQUIRED"},CLIENT_OPTION_INVALID:{type:n.types.MERCHANT,code:"CLIENT_OPTION_INVALID"},CLIENT_MISSING_GATEWAY_CONFIGURATION:{type:n.types.INTERNAL,code:"CLIENT_MISSING_GATEWAY_CONFIGURATION",message:"Missing gatewayConfiguration."},CLIENT_INVALID_AUTHORIZATION:{type:n.types.MERCHANT,code:"CLIENT_INVALID_AUTHORIZATION",message:"Authorization is invalid. Make sure your client token or tokenization key is valid."},CLIENT_GATEWAY_NETWORK:{type:n.types.NETWORK,code:"CLIENT_GATEWAY_NETWORK",message:"Cannot contact the gateway at this time."},CLIENT_REQUEST_TIMEOUT:{type:n.types.NETWORK,code:"CLIENT_REQUEST_TIMEOUT",message:"Request timed out waiting for a reply."},CLIENT_REQUEST_ERROR:{type:n.types.NETWORK,code:"CLIENT_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_GRAPHQL_REQUEST_ERROR:{type:n.types.NETWORK,code:"CLIENT_GRAPHQL_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_RATE_LIMITED:{type:n.types.MERCHANT,code:"CLIENT_RATE_LIMITED",message:"You are being rate-limited; please try again in a few minutes."},CLIENT_AUTHORIZATION_INSUFFICIENT:{type:n.types.MERCHANT,code:"CLIENT_AUTHORIZATION_INSUFFICIENT",message:"The authorization used has insufficient privileges."}}},{"../lib/braintree-error":37}],15:[function(r,n,e){(function(d){"use strict";var p=r("../lib/braintree-error"),e=r("../lib/promise"),t=r("@braintree/wrap-promise"),l=r("./request"),f=r("../lib/vendor/uuid"),h=r("../lib/constants"),y=r("../lib/create-authorization-data"),E=r("./errors"),g=r("./request/graphql"),I=r("../lib/is-date-string-before-or-on"),_=r("./constants").BRAINTREE_VERSION;n.exports={getConfiguration:t(function(u){return new e(function(i,o){var a,e,s,t,r,n=f(),c={merchantAppId:d.location.host,platform:h.PLATFORM,sdkVersion:h.VERSION,source:h.SOURCE,integration:h.INTEGRATION,integrationType:h.INTEGRATION,sessionId:n};try{e=y(u.authorization)}catch(e){return void o(new p(E.CLIENT_INVALID_AUTHORIZATION))}s=e.attrs,t=e.configUrl,s._meta=c,s.braintreeLibraryVersion=h.BRAINTREE_LIBRARY_VERSION,s.configVersion="3",r={url:t,method:"GET",data:s},s.authorizationFingerprint&&e.graphQL&&(I(e.graphQL.date,_)&&(r.graphQL=new g({graphQL:{url:e.graphQL.url,features:["configuration"]}})),r.metadata=c),l(r,function(e,t,r){var n;if(e)return n=403===r?E.CLIENT_AUTHORIZATION_INSUFFICIENT:E.CLIENT_GATEWAY_NETWORK,void o(new p({type:n.type,code:n.code,message:n.message,details:{originalError:e}}));a={authorization:u.authorization,authorizationType:s.tokenizationKey?"TOKENIZATION_KEY":"CLIENT_TOKEN",analyticsMetadata:c,gatewayConfiguration:t},i(a)})})})}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/braintree-error":37,"../lib/constants":38,"../lib/create-authorization-data":41,"../lib/is-date-string-before-or-on":45,"../lib/promise":50,"../lib/vendor/uuid":53,"./constants":13,"./errors":14,"./request":27,"./request/graphql":25,"@braintree/wrap-promise":9}],16:[function(e,t,r){"use strict";var n=e("../lib/braintree-error"),i=e("./client"),o=e("../lib/promise"),a=e("@braintree/wrap-promise"),s=e("../lib/errors");t.exports={create:a(function(e){return e.authorization?i.initialize(e):o.reject(new n({type:s.INSTANTIATION_OPTION_REQUIRED.type,code:s.INSTANTIATION_OPTION_REQUIRED.code,message:"options.authorization is required when instantiating a client."}))}),VERSION:"3.46.0"}},{"../lib/braintree-error":37,"../lib/errors":44,"../lib/promise":50,"./client":12,"@braintree/wrap-promise":9}],17:[function(e,t,r){"use strict";var E=e("../../lib/querystring"),g=e("../browser-detection"),I=e("../../lib/assign").assign,_=e("./prep-body"),A=e("./parse-body"),m=e("./xhr"),T=m.isAvailable,N=e("./graphql/request"),b=e("./default-request"),R=1,C=408;function v(t,r,n){var e,i,o,a,s,c,u,d=t.url,p=t.graphQL,l=t.timeout,f=m.getRequestObject(),h=n,y=Boolean(p&&p.isGraphQLRequest(d,t.data));t.headers=I({"Content-Type":"application/json"},t.headers),d=(o=y?new N(t):new b(t)).getUrl(),a=o.getBody(),s=o.getMethod(),c=o.getHeaders(),"GET"===s&&(d=E.queryify(d,a),a=null),T?f.onreadystatechange=function(){if(4===f.readyState){if(0===f.status&&y)return delete t.graphQL,void v(t,r,n);if(u=A(f.responseText),i=o.adaptResponseBody(u),400<=(e=o.determineStatus(f.status,u))||e<200){if(y&&function(e){var t=!e.data&&e.errors&&e.errors[0]&&e.errors[0].extensions&&e.errors[0].extensions.errorClass;return"UNKNOWN"===t||"INTERNAL"===t}(u))return delete t.graphQL,void v(t,r,n);if(r<R&&function(e){return(!e||e===C)&&g.isIe()}(e))return void v(t,++r,n);h(i||"error",null,e||500)}else h(null,i,e)}}:(t.headers&&(d=E.queryify(d,c)),f.onload=function(){h(null,A(f.responseText),f.status)},f.onerror=function(){h("error",null,500)},f.onprogress=function(){},f.ontimeout=function(){h("timeout",null,-1)});try{f.open(s,d,!0)}catch(e){if(!y)throw e;return delete t.graphQL,void v(t,r,n)}f.timeout=l,T&&Object.keys(c).forEach(function(e){f.setRequestHeader(e,c[e])});try{f.send(_(s,a))}catch(e){}}t.exports={request:function(e,t){v(e,0,t)}}},{"../../lib/assign":36,"../../lib/querystring":51,"../browser-detection":11,"./default-request":18,"./graphql/request":26,"./parse-body":30,"./prep-body":31,"./xhr":32}],18:[function(e,t,r){"use strict";function n(e){this._url=e.url,this._data=e.data,this._method=e.method,this._headers=e.headers}n.prototype.getUrl=function(){return this._url},n.prototype.getBody=function(){return this._data},n.prototype.getMethod=function(){return this._method},n.prototype.getHeaders=function(){return this._headers},n.prototype.adaptResponseBody=function(e){return e},n.prototype.determineStatus=function(e){return e},t.exports=n},{}],19:[function(e,t,r){(function(e){"use strict";t.exports=function(){return e.navigator.userAgent}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],20:[function(e,t,r){"use strict";var n=e("./error"),i=e("../../../../lib/assign").assign,o={creditCard:{AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",INTERNATIONAL_MAESTRO:"Maestro",JCB:"JCB",MASTERCARD:"MasterCard",SOLO:"Solo",UK_MAESTRO:"UK Maestro",UNION_PAY:"UnionPay",VISA:"Visa"},applePayWeb:{VISA:"visa",MASTERCARD:"mastercard",DISCOVER:"discover",AMERICAN_EXPRESS:"amex"},visaCheckout:{VISA:"Visa",MASTERCARD:"MasterCard",DISCOVER:"Discover",AMERICAN_EXPRESS:"American Express"},googlePay:{VISA:"visa",MASTERCARD:"mastercard",DISCOVER:"discover",AMERICAN_EXPRESS:"amex"},masterpass:{VISA:"visa",MASTERCARD:"master",DISCOVER:"discover",AMERICAN_EXPRESS:"amex",DINERS:"diners",INTERNATIONAL_MAESTRO:"maestro",JCB:"jcb"}};function a(e,r){return e.reduce(function(e,t){return r.hasOwnProperty(t)?e.concat(r[t]):e},[])}t.exports=function(e,t){return e.data&&!e.errors?function(e,t){var r,n=e.data.clientConfiguration;r={environment:n.environment.toLowerCase(),clientApiUrl:n.clientApiUrl,assetsUrl:n.assetsUrl,analytics:{url:n.analyticsUrl},merchantId:n.merchantId,venmo:"off"},n.supportedFeatures&&(r.graphQL={url:t._graphQL._config.url,features:n.supportedFeatures.map(function(e){return e.toLowerCase()})});n.braintreeApi&&(r.braintreeApi=n.braintreeApi);n.applePayWeb&&(r.applePayWeb=n.applePayWeb,r.applePayWeb.supportedNetworks=a(n.applePayWeb.supportedCardBrands,o.applePayWeb),delete r.applePayWeb.supportedCardBrands);n.ideal&&(r.ideal=n.ideal);n.kount&&(r.kount={kountMerchantId:n.kount.merchantId});n.creditCard?(r.challenges=n.creditCard.challenges.map(function(e){return e.toLowerCase()}),r.creditCards={supportedCardTypes:a(n.creditCard.supportedCardBrands,o.creditCard)},r.threeDSecureEnabled=n.creditCard.threeDSecureEnabled):(r.challenges=[],r.creditCards={supportedCardTypes:[]},r.threeDSecureEnabled=!1);n.googlePay&&(r.androidPay={displayName:n.googlePay.displayName,enabled:!0,environment:n.googlePay.environment.toLowerCase(),googleAuthorizationFingerprint:n.googlePay.googleAuthorization,supportedNetworks:a(n.googlePay.supportedCardBrands,o.googlePay)});n.venmo&&(r.payWithVenmo={merchantId:n.venmo.merchantId,accessToken:n.venmo.accessToken,environment:n.venmo.environment.toLowerCase()});n.paypal?(r.paypalEnabled=!0,r.paypal=i({},n.paypal),r.paypal.currencyIsoCode=r.paypal.currencyCode,r.paypal.environment=r.paypal.environment.toLowerCase(),delete r.paypal.currencyCode):r.paypalEnabled=!1;n.unionPay&&(r.unionPay={enabled:!0,merchantAccountId:n.unionPay.merchantAccountId});n.visaCheckout&&(r.visaCheckout={apikey:n.visaCheckout.apiKey,externalClientId:n.visaCheckout.externalClientId,supportedCardTypes:a(n.visaCheckout.supportedCardBrands,o.visaCheckout)});n.masterpass&&(r.masterpass={merchantCheckoutId:n.masterpass.merchantCheckoutId,supportedNetworks:a(n.masterpass.supportedCardBrands,o.masterpass)});n.usBankAccount&&(r.usBankAccount={routeId:n.usBankAccount.routeId,plaid:{publicKey:n.usBankAccount.plaidPublicKey}});return r}(e,t):n(e)}},{"../../../../lib/assign":36,"./error":22}],21:[function(e,t,r){"use strict";var n=e("./error"),o={AMERICAN_EXPRESS:"American Express",DINERS:"Discover",DISCOVER:"Discover",INTERNATIONAL_MAESTRO:"Maestro",JCB:"JCB",MASTERCARD:"MasterCard",UK_MAESTRO:"Maestro",UNION_PAY:"Union Pay",VISA:"Visa"},a={YES:"Yes",NO:"No",UNKNOWN:"Unknown"};t.exports=function(e){return e.data&&!e.errors?function(e){var t=e.data.tokenizeCreditCard,r=t.creditCard,n=r.last4?r.last4.substr(2,4):"",i=r.binData;i&&(["commercial","debit","durbinRegulated","healthcare","payroll","prepaid"].forEach(function(e){i[e]?i[e]=a[i[e]]:i[e]="Unknown"}),["issuingBank","countryOfIssuance","productId"].forEach(function(e){i[e]||(i[e]="Unknown")}));return{creditCards:[{binData:i,consumed:!1,description:n?"ending in "+n:"",nonce:t.token,details:{bin:r.bin||"",cardType:o[r.brandCode]||"Unknown",lastFour:r.last4||"",lastTwo:n},type:"CreditCard",threeDSecureInfo:null}]}}(e):n(e)}},{"./error":22}],22:[function(e,t,r){"use strict";t.exports=function(e){var t=e.errors&&e.errors[0]&&e.errors[0].extensions&&e.errors[0].extensions.errorClass;return"VALIDATION"===t?function(e){var t=function(e){var t=[];return e.forEach(function(e){!function e(t,r,n){var i;var o=r.extensions.legacyCode;var a=t[0];if(1===t.length)return void n.push({code:o,field:a,message:r.message});n.forEach(function(e){e.field===a&&(i=e)});i||(i={field:a,fieldErrors:[]},n.push(i));e(t.slice(1),r,i.fieldErrors)}(e.extensions.inputPath.slice(1),e,t)}),t}(e.errors);return{error:{message:function(e){var t=e[0].field;return{creditCard:"Credit card is invalid"}[t]}(t)},fieldErrors:t}}(e):t?function(e){return{error:{message:e.errors[0].message},fieldErrors:[]}}(e):{error:{message:"There was a problem serving your request"},fieldErrors:[]}}},{}],23:[function(e,t,r){"use strict";t.exports=function(){return{query:"query ClientConfiguration {   clientConfiguration {     analyticsUrl     environment     merchantId     assetsUrl     clientApiUrl     creditCard {       supportedCardBrands       challenges       threeDSecureEnabled     }     applePayWeb {       countryCode       currencyCode       merchantIdentifier       supportedCardBrands     }     googlePay {       displayName       supportedCardBrands       environment       googleAuthorization     }     ideal {       routeId       assetsUrl     }     kount {       merchantId     }     masterpass {       merchantCheckoutId       supportedCardBrands     }     paypal {       displayName       clientId       privacyUrl       userAgreementUrl       assetsUrl       environment       environmentNoNetwork       unvettedMerchant       braintreeClientId       billingAgreementsEnabled       merchantAccountId       currencyCode       payeeEmail     }     unionPay {       merchantAccountId     }     usBankAccount {       routeId       plaidPublicKey     }     venmo {       merchantId       accessToken       environment     }     visaCheckout {       apiKey       externalClientId       supportedCardBrands     }     braintreeApi {       accessToken       url     }     supportedFeatures   } }",operationName:"ClientConfiguration"}}},{}],24:[function(e,t,r){"use strict";var s=e("../../../../lib/assign").assign;function n(e){var t=e.creditCard,r=t&&t.billingAddress,n=t&&t.expirationDate,i=t&&(t.expirationMonth||n&&n.split("/")[0].trim()),o=t&&(t.expirationYear||n&&n.split("/")[1].trim()),a={input:{creditCard:{number:t&&t.number,expirationMonth:i,expirationYear:o,cvv:t&&t.cvv,cardholderName:t&&t.cardholderName},options:{}}};return r&&(a.input.creditCard.billingAddress=r),a.input=function(e,t){var r;e.creditCard&&e.creditCard.options&&"boolean"==typeof e.creditCard.options.validate?r=e.creditCard.options.validate:e.authorizationFingerprint&&e.tokenizationKey||e.authorizationFingerprint?r=!0:e.tokenizationKey&&(r=!1);"boolean"==typeof r&&(t.options=s({validate:r},t.options));return t}(e,a.input),a}t.exports=function(e){return{query:"mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) {   tokenizeCreditCard(input: $input) {     token     creditCard {       bin       brandCode       last4       binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     }   } }",variables:n(e),operationName:"TokenizeCreditCard"}}},{"../../../../lib/assign":36}],25:[function(e,t,r){"use strict";var i=e("../../browser-detection"),o={tokenize_credit_cards:"payment_methods/credit_cards",configuration:"configuration"},a=["creditCard.options.unionPayEnrollment"];function n(e){this._config=e.graphQL}n.prototype.getGraphQLEndpoint=function(){return this._config.url},n.prototype.isGraphQLRequest=function(e,t){var r,n=this.getClientApiPath(e);return!(!this._isGraphQLEnabled()||!n||i.isIe9())&&(r=this._config.features.some(function(e){return o[e]===n}),!function(t){return a.some(function(e){return void 0!==e.split(".").reduce(function(e,t){return e&&e[t]},t)})}(t)&&r)},n.prototype.getClientApiPath=function(e){var t,r=e.split("/client_api/v1/");return 1<r.length&&(t=r[1].split("?")[0]),t},n.prototype._isGraphQLEnabled=function(){return Boolean(this._config)},t.exports=n},{"../../browser-detection":11}],26:[function(e,t,r){"use strict";var n=e("../../constants").BRAINTREE_VERSION,i=e("../../../lib/assign").assign,o=e("./generators/credit-card-tokenization"),a=e("./adapters/credit-card-tokenization"),s=e("./generators/configuration"),c=e("./adapters/configuration"),u={"payment_methods/credit_cards":o,configuration:s},d={"payment_methods/credit_cards":a,configuration:c};function p(e){var t=e.graphQL.getClientApiPath(e.url);this._graphQL=e.graphQL,this._data=e.data,this._method=e.method,this._headers=e.headers,this._clientSdkMetadata={source:e.metadata.source,integration:e.metadata.integration,sessionId:e.metadata.sessionId},this._sendAnalyticsEvent=e.sendAnalyticsEvent||Function.prototype,this._generator=u[t],this._adapter=d[t],this._sendAnalyticsEvent("graphql.init")}function l(e){return-1===e.indexOf("_")?e:e.toLowerCase().replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}p.prototype.getUrl=function(){return this._graphQL.getGraphQLEndpoint()},p.prototype.getBody=function(){var e=function r(n){var i={};Object.keys(n).forEach(function(e){var t=l(e);"object"==typeof n[e]?i[t]=r(n[e]):"number"==typeof n[e]?i[t]=String(n[e]):i[t]=n[e]});return i}(this._data),t=this._generator(e),r=i({clientSdkMetadata:this._clientSdkMetadata},t);return JSON.stringify(r)},p.prototype.getMethod=function(){return"POST"},p.prototype.getHeaders=function(){var e;return e={Authorization:"Bearer "+(this._data.authorizationFingerprint?(this._sendAnalyticsEvent("graphql.authorization-fingerprint"),this._data.authorizationFingerprint):(this._sendAnalyticsEvent("graphql.tokenization-key"),this._data.tokenizationKey)),"Braintree-Version":n},i({},this._headers,e)},p.prototype.adaptResponseBody=function(e){return this._adapter(e,this)},p.prototype.determineStatus=function(e,t){var r,n;return r=200===e?(n=t.errors&&t.errors[0]&&t.errors[0].extensions&&t.errors[0].extensions.errorClass,t.data&&!t.errors?200:"VALIDATION"===n?422:"AUTHORIZATION"===n?403:"AUTHENTICATION"===n?401:function(e,t){return!e&&t.errors[0].message}(n,t)?403:500):e||500,this._sendAnalyticsEvent("graphql.status."+e),this._sendAnalyticsEvent("graphql.determinedStatus."+r),r},t.exports=p},{"../../../lib/assign":36,"../../constants":13,"./adapters/configuration":20,"./adapters/credit-card-tokenization":21,"./generators/configuration":23,"./generators/credit-card-tokenization":24}],27:[function(e,t,r){"use strict";var n,i=e("../../lib/once"),o=e("./jsonp-driver"),a=e("./ajax-driver"),s=e("./get-user-agent"),c=e("./is-http");t.exports=function(e,t){t=i(t||Function.prototype),e.method=(e.method||"GET").toUpperCase(),e.timeout=null==e.timeout?6e4:e.timeout,e.data=e.data||{},null==n&&(n=!(c()&&/MSIE\s(8|9)/.test(s()))),n?a.request(e,t):o.request(e,t)}},{"../../lib/once":49,"./ajax-driver":17,"./get-user-agent":19,"./is-http":28,"./jsonp-driver":29}],28:[function(e,t,r){(function(e){"use strict";t.exports=function(){return"http:"===e.location.protocol}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],29:[function(e,t,r){(function(c){"use strict";var u,d=e("../../lib/vendor/uuid"),p=e("../../lib/querystring"),l={};function f(t){try{delete c[t]}catch(e){c[t]=null}}t.exports={request:function(e,t){var r,n="callback_json_"+d().replace(/-/g,""),i=e.url,o=e.data,a=e.method,s=e.timeout;i=p.queryify(i,o),function(i,o,a){c[a]=function(e){var t=e.status||500,r=null,n=null;delete e.status,400<=t||t<200?r=e:n=e,f(a),function(e){e&&e.parentNode&&e.parentNode.removeChild(e)}(i),clearTimeout(l[a]),o(r,n,t)}}(r=function(e,t){var r=document.createElement("script"),n=!1;return r.src=e,r.async=!0,r.onerror=function(){c[t]({message:"error",status:500})},r.onload=r.onreadystatechange=function(){n||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(n=!0,r.onload=r.onreadystatechange=null)},r}(i=p.queryify(i,{_method:a,callback:n}),n),t,n),function(e,t){l[t]=setTimeout(function(){l[t]=null,c[t]({error:"timeout",status:-1}),c[t]=function(){f(t)}},e)}(s,n),(u=u||document.getElementsByTagName("head")[0]).appendChild(r)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/querystring":51,"../../lib/vendor/uuid":53}],30:[function(e,t,r){"use strict";t.exports=function(e){try{e=JSON.parse(e)}catch(e){}return e}},{}],31:[function(e,t,r){"use strict";t.exports=function(e,t){if("string"!=typeof e)throw new Error("Method must be a string");return"get"!==e.toLowerCase()&&null!=t&&(t="string"==typeof t?t:JSON.stringify(t)),t}},{}],32:[function(e,r,t){(function(e){"use strict";var t=e.XMLHttpRequest&&"withCredentials"in new e.XMLHttpRequest;r.exports={isAvailable:t,getRequestObject:function(){return t?new e.XMLHttpRequest:new e.XDomainRequest}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],33:[function(e,t,r){"use strict";var a=e("./create-authorization-data"),s=e("./json-clone"),c=e("./constants");t.exports=function(e,t){var r,n=t?s(t):{},i=a(e.authorization).attrs,o=s(e.analyticsMetadata);for(r in n.braintreeLibraryVersion=c.BRAINTREE_LIBRARY_VERSION,n._meta)n._meta.hasOwnProperty(r)&&(o[r]=n._meta[r]);return n._meta=o,i.tokenizationKey?n.tokenizationKey=i.tokenizationKey:n.authorizationFingerprint=i.authorizationFingerprint,n}},{"./constants":38,"./create-authorization-data":41,"./json-clone":47}],34:[function(e,t,r){"use strict";var n=e("./promise"),u=e("./constants"),d=e("./add-metadata");function p(e){return Math.floor(e/1e3)}t.exports={sendEvent:function(e,a,s){var c=p(Date.now());return n.resolve(e).then(function(e){var t=p(Date.now()),r=e.getConfiguration(),n=e._request,i=r.gatewayConfiguration.analytics.url,o={analytics:[{kind:u.ANALYTICS_PREFIX+a,isAsync:t!==c,timestamp:c}]};n({url:i,method:"post",data:d(r,o),timeout:u.ANALYTICS_REQUEST_TIMEOUT_MS},s)})}}},{"./add-metadata":33,"./constants":38,"./promise":50}],35:[function(e,t,r){"use strict";var n=e("@braintree/asset-loader/load-script");t.exports={loadScript:n}},{"@braintree/asset-loader/load-script":2}],36:[function(e,t,r){"use strict";var n="function"==typeof Object.assign?Object.assign:i;function i(e){var t,r,n;for(t=1;t<arguments.length;t++)for(n in r=arguments[t])r.hasOwnProperty(n)&&(e[n]=r[n]);return e}t.exports={assign:n,_assign:i}},{}],37:[function(e,t,r){"use strict";var n=e("./enumerate");function i(e){if(!i.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}((i.prototype=Object.create(Error.prototype)).constructor=i).types=n(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),i.findRootError=function(e){return e instanceof i&&e.details&&e.details.originalError?i.findRootError(e.details.originalError):e},t.exports=i},{"./enumerate":43}],38:[function(e,t,r){"use strict";t.exports={ANALYTICS_PREFIX:"web.",ANALYTICS_REQUEST_TIMEOUT_MS:2e3,ASSETS_URLS:{production:"https://assets.braintreegateway.com",sandbox:"https://assets.braintreegateway.com"},CLIENT_API_URLS:{production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"},FRAUDNET_SOURCE:"BRAINTREE_SIGNIN",FRAUDNET_FNCLS:"fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",FRAUDNET_URL:"https://c.paypal.com/da/r/fb.js",GRAPHQL_URLS:{production:"https://payments.braintree-api.com/graphql",sandbox:"https://payments.sandbox.braintree-api.com/graphql"},INTEGRATION_TIMEOUT_MS:6e4,VERSION:"3.46.0",INTEGRATION:"custom",SOURCE:"client",PLATFORM:"web",BRAINTREE_LIBRARY_VERSION:"braintree/web/3.46.0"}},{}],39:[function(e,t,r){"use strict";var n=e("./braintree-error"),i=e("./errors");t.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new n({type:i.METHOD_CALLED_AFTER_TEARDOWN.type,code:i.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"./braintree-error":37,"./errors":44}],40:[function(e,t,r){"use strict";var n=e("./braintree-error");t.exports=function(e,t){return e instanceof n?e:new n({type:t.type,code:t.code,message:t.message,details:{originalError:e}})}},{"./braintree-error":37}],41:[function(e,t,r){"use strict";var i=e("../lib/vendor/polyfill").atob,o=e("../lib/constants").CLIENT_API_URLS;t.exports=function(e){var t,r,n={attrs:{},configUrl:""};return!function(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}(e)?(t=JSON.parse(i(e)),n.environment=t.environment,n.attrs.authorizationFingerprint=t.authorizationFingerprint,n.configUrl=t.configUrl,n.graphQL=t.graphQL):(r=function(e){var t=e.split("_"),r=t[0];return{merchantId:t.slice(2).join("_"),environment:r}}(e),n.environment=r.environment,n.attrs.tokenizationKey=e,n.configUrl=o[r.environment]+"/merchants/"+r.merchantId+"/client_api/v1/configuration"),n}},{"../lib/constants":38,"../lib/vendor/polyfill":52}],42:[function(e,t,r){"use strict";t.exports=function(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}},{}],43:[function(e,t,r){"use strict";t.exports=function(e,r){return r=null==r?"":r,e.reduce(function(e,t){return e[t]=r+t,e},{})}},{}],44:[function(e,t,r){"use strict";var n=e("./braintree-error");t.exports={INVALID_USE_OF_INTERNAL_FUNCTION:{type:n.types.INTERNAL,code:"INVALID_USE_OF_INTERNAL_FUNCTION"},INSTANTIATION_OPTION_REQUIRED:{type:n.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:n.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},CLIENT_SCRIPT_FAILED_TO_LOAD:{type:n.types.NETWORK,code:"CLIENT_SCRIPT_FAILED_TO_LOAD",message:"Braintree client script could not be loaded."},METHOD_CALLED_AFTER_TEARDOWN:{type:n.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"},BRAINTREE_API_ACCESS_RESTRICTED:{type:n.types.MERCHANT,code:"BRAINTREE_API_ACCESS_RESTRICTED",message:"Your access is restricted and cannot use this part of the Braintree API."}}},{"./braintree-error":37}],45:[function(e,t,r){"use strict";function n(e){var t=e.split("-");return new Date(t[0],t[1],t[2])}t.exports=function(e,t){return n(e)<=n(t)}},{}],46:[function(e,t,r){"use strict";var n,i={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1,"braintree-api.com":1};t.exports=function(e){var t;return e=e.toLowerCase(),!!/^https:/.test(e)&&((n=n||document.createElement("a")).href=e,t=function(e){return e.split(".").slice(-2).join(".")}(n.hostname),i.hasOwnProperty(t))}},{}],47:[function(e,t,r){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],48:[function(e,t,r){"use strict";t.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}],49:[function(e,t,r){arguments[4][7][0].apply(r,arguments)},{dup:7}],50:[function(r,n,e){(function(e){"use strict";var t=e.Promise||r("promise-polyfill");n.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"promise-polyfill":10}],51:[function(e,r,t){(function(t){"use strict";function s(e,t){var r,n,i,o,a=[];for(i in e)e.hasOwnProperty(i)&&(n=e[i],r=t?(o=e)&&"object"==typeof o&&"number"==typeof o.length&&"[object Array]"===Object.prototype.toString.call(o)?t+"[]":t+"["+i+"]":i,"object"==typeof n?a.push(s(n,r)):a.push(encodeURIComponent(r)+"="+encodeURIComponent(n)));return a.join("&")}r.exports={parse:function(e){return e=e||t.location.href,/\?/.test(e)?e.replace(/#.*$/,"").replace(/^.*\?/,"").split("&").reduce(function(e,t){var r=t.split("="),n=decodeURIComponent(r[0]),i=decodeURIComponent(r[1]);return e[n]=i,e},{}):{}},stringify:s,queryify:function(e,t){return e=e||"",null!=t&&"object"==typeof t&&function(e){var t;for(t in e)if(e.hasOwnProperty(t))return!0;return!1}(t)&&(e+=-1===e.indexOf("?")?"?":"",e+=-1!==e.indexOf("=")?"&":"",e+=s(t)),e}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],52:[function(e,n,t){(function(t){"use strict";var r="function"==typeof t.atob?t.atob:e;function e(e){var t,r,n,i,o,a,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="";if(!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");for(a=0;t=(63&s.indexOf(e.charAt(a++)))<<2|(i=s.indexOf(e.charAt(a++)))>>4&3,r=(15&i)<<4|(o=s.indexOf(e.charAt(a++)))>>2&15,n=(3&o)<<6|63&s.indexOf(e.charAt(a++)),c+=String.fromCharCode(t)+(r?String.fromCharCode(r):"")+(n?String.fromCharCode(n):""),a<e.length;);return c}n.exports={atob:function(e){return r.call(t,e)},_atob:e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],53:[function(e,t,r){"use strict";t.exports=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}},{}]},{},[16])(16)});