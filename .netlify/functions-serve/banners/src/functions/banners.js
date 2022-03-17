var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/contentful/dist/contentful.node.js
var require_contentful_node = __commonJS({
  "node_modules/contentful/dist/contentful.node.js"(exports, module2) {
    module2.exports = function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module3 = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module3.exports, module3, module3.exports, __webpack_require__);
        module3.l = true;
        return module3.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, { enumerable: true, get: getter });
        }
      };
      __webpack_require__.r = function(exports2) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports2, "__esModule", { value: true });
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1)
          value = __webpack_require__(value);
        if (mode & 8)
          return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
          return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", { enumerable: true, value });
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module3) {
        var getter = module3 && module3.__esModule ? function getDefault() {
          return module3["default"];
        } : function getModuleExports() {
          return module3;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = 0);
    }({
      "../node_modules/axios/index.js": function(module3, exports2, __webpack_require__) {
        module3.exports = __webpack_require__("../node_modules/axios/lib/axios.js");
      },
      "../node_modules/axios/lib/adapters/http.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        var settle = __webpack_require__("../node_modules/axios/lib/core/settle.js");
        var buildFullPath = __webpack_require__("../node_modules/axios/lib/core/buildFullPath.js");
        var buildURL = __webpack_require__("../node_modules/axios/lib/helpers/buildURL.js");
        var http = __webpack_require__("http");
        var https = __webpack_require__("https");
        var httpFollow = __webpack_require__("../node_modules/follow-redirects/index.js").http;
        var httpsFollow = __webpack_require__("../node_modules/follow-redirects/index.js").https;
        var url = __webpack_require__("url");
        var zlib = __webpack_require__("zlib");
        var pkg = __webpack_require__("../node_modules/axios/package.json");
        var createError = __webpack_require__("../node_modules/axios/lib/core/createError.js");
        var enhanceError = __webpack_require__("../node_modules/axios/lib/core/enhanceError.js");
        var isHttps = /https:?/;
        function setProxy(options, proxy, location) {
          options.hostname = proxy.host;
          options.host = proxy.host;
          options.port = proxy.port;
          options.path = location;
          if (proxy.auth) {
            var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
            options.headers["Proxy-Authorization"] = "Basic " + base64;
          }
          options.beforeRedirect = function beforeRedirect(redirection) {
            redirection.headers.host = redirection.host;
            setProxy(redirection, proxy, redirection.href);
          };
        }
        module3.exports = function httpAdapter(config) {
          return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
            var resolve = function resolve2(value) {
              resolvePromise(value);
            };
            var reject = function reject2(value) {
              rejectPromise(value);
            };
            var data = config.data;
            var headers = config.headers;
            if (!headers["User-Agent"] && !headers["user-agent"]) {
              headers["User-Agent"] = "axios/" + pkg.version;
            }
            if (data && !utils.isStream(data)) {
              if (Buffer.isBuffer(data)) {
              } else if (utils.isArrayBuffer(data)) {
                data = Buffer.from(new Uint8Array(data));
              } else if (utils.isString(data)) {
                data = Buffer.from(data, "utf-8");
              } else {
                return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
              }
              headers["Content-Length"] = data.length;
            }
            var auth = void 0;
            if (config.auth) {
              var username = config.auth.username || "";
              var password = config.auth.password || "";
              auth = username + ":" + password;
            }
            var fullPath = buildFullPath(config.baseURL, config.url);
            var parsed = url.parse(fullPath);
            var protocol = parsed.protocol || "http:";
            if (!auth && parsed.auth) {
              var urlAuth = parsed.auth.split(":");
              var urlUsername = urlAuth[0] || "";
              var urlPassword = urlAuth[1] || "";
              auth = urlUsername + ":" + urlPassword;
            }
            if (auth) {
              delete headers.Authorization;
            }
            var isHttpsRequest = isHttps.test(protocol);
            var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
            var options = {
              path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
              method: config.method.toUpperCase(),
              headers,
              agent,
              agents: { http: config.httpAgent, https: config.httpsAgent },
              auth
            };
            if (config.socketPath) {
              options.socketPath = config.socketPath;
            } else {
              options.hostname = parsed.hostname;
              options.port = parsed.port;
            }
            var proxy = config.proxy;
            if (!proxy && proxy !== false) {
              var proxyEnv = protocol.slice(0, -1) + "_proxy";
              var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
              if (proxyUrl) {
                var parsedProxyUrl = url.parse(proxyUrl);
                var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
                var shouldProxy = true;
                if (noProxyEnv) {
                  var noProxy = noProxyEnv.split(",").map(function trim(s) {
                    return s.trim();
                  });
                  shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                    if (!proxyElement) {
                      return false;
                    }
                    if (proxyElement === "*") {
                      return true;
                    }
                    if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                      return true;
                    }
                    return parsed.hostname === proxyElement;
                  });
                }
                if (shouldProxy) {
                  proxy = {
                    host: parsedProxyUrl.hostname,
                    port: parsedProxyUrl.port,
                    protocol: parsedProxyUrl.protocol
                  };
                  if (parsedProxyUrl.auth) {
                    var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                    proxy.auth = {
                      username: proxyUrlAuth[0],
                      password: proxyUrlAuth[1]
                    };
                  }
                }
              }
            }
            if (proxy) {
              options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
              setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
            }
            var transport;
            var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
            if (config.transport) {
              transport = config.transport;
            } else if (config.maxRedirects === 0) {
              transport = isHttpsProxy ? https : http;
            } else {
              if (config.maxRedirects) {
                options.maxRedirects = config.maxRedirects;
              }
              transport = isHttpsProxy ? httpsFollow : httpFollow;
            }
            if (config.maxBodyLength > -1) {
              options.maxBodyLength = config.maxBodyLength;
            }
            var req = transport.request(options, function handleResponse(res) {
              if (req.aborted)
                return;
              var stream = res;
              var lastRequest = res.req || req;
              if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
                switch (res.headers["content-encoding"]) {
                  case "gzip":
                  case "compress":
                  case "deflate":
                    stream = stream.pipe(zlib.createUnzip());
                    delete res.headers["content-encoding"];
                    break;
                }
              }
              var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
                config,
                request: lastRequest
              };
              if (config.responseType === "stream") {
                response.data = stream;
                settle(resolve, reject, response);
              } else {
                var responseBuffer = [];
                stream.on("data", function handleStreamData(chunk) {
                  responseBuffer.push(chunk);
                  if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
                    stream.destroy();
                    reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
                  }
                });
                stream.on("error", function handleStreamError(err) {
                  if (req.aborted)
                    return;
                  reject(enhanceError(err, config, null, lastRequest));
                });
                stream.on("end", function handleStreamEnd() {
                  var responseData = Buffer.concat(responseBuffer);
                  if (config.responseType !== "arraybuffer") {
                    responseData = responseData.toString(config.responseEncoding);
                    if (!config.responseEncoding || config.responseEncoding === "utf8") {
                      responseData = utils.stripBOM(responseData);
                    }
                  }
                  response.data = responseData;
                  settle(resolve, reject, response);
                });
              }
            });
            req.on("error", function handleRequestError(err) {
              if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
                return;
              reject(enhanceError(err, config, null, req));
            });
            if (config.timeout) {
              req.setTimeout(config.timeout, function handleRequestTimeout() {
                req.abort();
                reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", req));
              });
            }
            if (config.cancelToken) {
              config.cancelToken.promise.then(function onCanceled(cancel) {
                if (req.aborted)
                  return;
                req.abort();
                reject(cancel);
              });
            }
            if (utils.isStream(data)) {
              data.on("error", function handleStreamError(err) {
                reject(enhanceError(err, config, null, req));
              }).pipe(req);
            } else {
              req.end(data);
            }
          });
        };
      },
      "../node_modules/axios/lib/adapters/xhr.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        var settle = __webpack_require__("../node_modules/axios/lib/core/settle.js");
        var cookies = __webpack_require__("../node_modules/axios/lib/helpers/cookies.js");
        var buildURL = __webpack_require__("../node_modules/axios/lib/helpers/buildURL.js");
        var buildFullPath = __webpack_require__("../node_modules/axios/lib/core/buildFullPath.js");
        var parseHeaders = __webpack_require__("../node_modules/axios/lib/helpers/parseHeaders.js");
        var isURLSameOrigin = __webpack_require__("../node_modules/axios/lib/helpers/isURLSameOrigin.js");
        var createError = __webpack_require__("../node_modules/axios/lib/core/createError.js");
        module3.exports = function xhrAdapter(config) {
          return new Promise(function dispatchXhrRequest(resolve, reject) {
            var requestData = config.data;
            var requestHeaders = config.headers;
            if (utils.isFormData(requestData)) {
              delete requestHeaders["Content-Type"];
            }
            var request = new XMLHttpRequest();
            if (config.auth) {
              var username = config.auth.username || "";
              var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
              requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
            }
            var fullPath = buildFullPath(config.baseURL, config.url);
            request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
            request.timeout = config.timeout;
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }
              if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                return;
              }
              var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
              var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
              var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
              };
              settle(resolve, reject, response);
              request = null;
            };
            request.onabort = function handleAbort() {
              if (!request) {
                return;
              }
              reject(createError("Request aborted", config, "ECONNABORTED", request));
              request = null;
            };
            request.onerror = function handleError() {
              reject(createError("Network Error", config, null, request));
              request = null;
            };
            request.ontimeout = function handleTimeout() {
              var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
              if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
              }
              reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));
              request = null;
            };
            if (utils.isStandardBrowserEnv()) {
              var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
              if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
              }
            }
            if ("setRequestHeader" in request) {
              utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
                  delete requestHeaders[key];
                } else {
                  request.setRequestHeader(key, val);
                }
              });
            }
            if (!utils.isUndefined(config.withCredentials)) {
              request.withCredentials = !!config.withCredentials;
            }
            if (config.responseType) {
              try {
                request.responseType = config.responseType;
              } catch (e) {
                if (config.responseType !== "json") {
                  throw e;
                }
              }
            }
            if (typeof config.onDownloadProgress === "function") {
              request.addEventListener("progress", config.onDownloadProgress);
            }
            if (typeof config.onUploadProgress === "function" && request.upload) {
              request.upload.addEventListener("progress", config.onUploadProgress);
            }
            if (config.cancelToken) {
              config.cancelToken.promise.then(function onCanceled(cancel) {
                if (!request) {
                  return;
                }
                request.abort();
                reject(cancel);
                request = null;
              });
            }
            if (!requestData) {
              requestData = null;
            }
            request.send(requestData);
          });
        };
      },
      "../node_modules/axios/lib/axios.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        var bind = __webpack_require__("../node_modules/axios/lib/helpers/bind.js");
        var Axios = __webpack_require__("../node_modules/axios/lib/core/Axios.js");
        var mergeConfig = __webpack_require__("../node_modules/axios/lib/core/mergeConfig.js");
        var defaults = __webpack_require__("../node_modules/axios/lib/defaults.js");
        function createInstance(defaultConfig) {
          var context = new Axios(defaultConfig);
          var instance = bind(Axios.prototype.request, context);
          utils.extend(instance, Axios.prototype, context);
          utils.extend(instance, context);
          return instance;
        }
        var axios = createInstance(defaults);
        axios.Axios = Axios;
        axios.create = function create(instanceConfig) {
          return createInstance(mergeConfig(axios.defaults, instanceConfig));
        };
        axios.Cancel = __webpack_require__("../node_modules/axios/lib/cancel/Cancel.js");
        axios.CancelToken = __webpack_require__("../node_modules/axios/lib/cancel/CancelToken.js");
        axios.isCancel = __webpack_require__("../node_modules/axios/lib/cancel/isCancel.js");
        axios.all = function all(promises) {
          return Promise.all(promises);
        };
        axios.spread = __webpack_require__("../node_modules/axios/lib/helpers/spread.js");
        axios.isAxiosError = __webpack_require__("../node_modules/axios/lib/helpers/isAxiosError.js");
        module3.exports = axios;
        module3.exports.default = axios;
      },
      "../node_modules/axios/lib/cancel/Cancel.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        function Cancel(message) {
          this.message = message;
        }
        Cancel.prototype.toString = function toString() {
          return "Cancel" + (this.message ? ": " + this.message : "");
        };
        Cancel.prototype.__CANCEL__ = true;
        module3.exports = Cancel;
      },
      "../node_modules/axios/lib/cancel/CancelToken.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var Cancel = __webpack_require__("../node_modules/axios/lib/cancel/Cancel.js");
        function CancelToken(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
          }
          var resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });
          var token = this;
          executor(function cancel(message) {
            if (token.reason) {
              return;
            }
            token.reason = new Cancel(message);
            resolvePromise(token.reason);
          });
        }
        CancelToken.prototype.throwIfRequested = function throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        };
        CancelToken.source = function source() {
          var cancel;
          var token = new CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token,
            cancel
          };
        };
        module3.exports = CancelToken;
      },
      "../node_modules/axios/lib/cancel/isCancel.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        module3.exports = function isCancel(value) {
          return !!(value && value.__CANCEL__);
        };
      },
      "../node_modules/axios/lib/core/Axios.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        var buildURL = __webpack_require__("../node_modules/axios/lib/helpers/buildURL.js");
        var InterceptorManager = __webpack_require__("../node_modules/axios/lib/core/InterceptorManager.js");
        var dispatchRequest = __webpack_require__("../node_modules/axios/lib/core/dispatchRequest.js");
        var mergeConfig = __webpack_require__("../node_modules/axios/lib/core/mergeConfig.js");
        function Axios(instanceConfig) {
          this.defaults = instanceConfig;
          this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
          };
        }
        Axios.prototype.request = function request(config) {
          if (typeof config === "string") {
            config = arguments[1] || {};
            config.url = arguments[0];
          } else {
            config = config || {};
          }
          config = mergeConfig(this.defaults, config);
          if (config.method) {
            config.method = config.method.toLowerCase();
          } else if (this.defaults.method) {
            config.method = this.defaults.method.toLowerCase();
          } else {
            config.method = "get";
          }
          var chain = [dispatchRequest, void 0];
          var promise = Promise.resolve(config);
          this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
          });
          this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
          });
          while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
          }
          return promise;
        };
        Axios.prototype.getUri = function getUri(config) {
          config = mergeConfig(this.defaults, config);
          return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
        };
        utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
          Axios.prototype[method] = function(url, config) {
            return this.request(mergeConfig(config || {}, {
              method,
              url,
              data: (config || {}).data
            }));
          };
        });
        utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
          Axios.prototype[method] = function(url, data, config) {
            return this.request(mergeConfig(config || {}, {
              method,
              url,
              data
            }));
          };
        });
        module3.exports = Axios;
      },
      "../node_modules/axios/lib/core/InterceptorManager.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        function InterceptorManager() {
          this.handlers = [];
        }
        InterceptorManager.prototype.use = function use(fulfilled, rejected) {
          this.handlers.push({
            fulfilled,
            rejected
          });
          return this.handlers.length - 1;
        };
        InterceptorManager.prototype.eject = function eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        };
        InterceptorManager.prototype.forEach = function forEach(fn) {
          utils.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h);
            }
          });
        };
        module3.exports = InterceptorManager;
      },
      "../node_modules/axios/lib/core/buildFullPath.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var isAbsoluteURL = __webpack_require__("../node_modules/axios/lib/helpers/isAbsoluteURL.js");
        var combineURLs = __webpack_require__("../node_modules/axios/lib/helpers/combineURLs.js");
        module3.exports = function buildFullPath(baseURL, requestedURL) {
          if (baseURL && !isAbsoluteURL(requestedURL)) {
            return combineURLs(baseURL, requestedURL);
          }
          return requestedURL;
        };
      },
      "../node_modules/axios/lib/core/createError.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var enhanceError = __webpack_require__("../node_modules/axios/lib/core/enhanceError.js");
        module3.exports = function createError(message, config, code, request, response) {
          var error = new Error(message);
          return enhanceError(error, config, code, request, response);
        };
      },
      "../node_modules/axios/lib/core/dispatchRequest.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        var transformData = __webpack_require__("../node_modules/axios/lib/core/transformData.js");
        var isCancel = __webpack_require__("../node_modules/axios/lib/cancel/isCancel.js");
        var defaults = __webpack_require__("../node_modules/axios/lib/defaults.js");
        function throwIfCancellationRequested(config) {
          if (config.cancelToken) {
            config.cancelToken.throwIfRequested();
          }
        }
        module3.exports = function dispatchRequest(config) {
          throwIfCancellationRequested(config);
          config.headers = config.headers || {};
          config.data = transformData(config.data, config.headers, config.transformRequest);
          config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
          utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
            delete config.headers[method];
          });
          var adapter = config.adapter || defaults.adapter;
          return adapter(config).then(function onAdapterResolution(response) {
            throwIfCancellationRequested(config);
            response.data = transformData(response.data, response.headers, config.transformResponse);
            return response;
          }, function onAdapterRejection(reason) {
            if (!isCancel(reason)) {
              throwIfCancellationRequested(config);
              if (reason && reason.response) {
                reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
              }
            }
            return Promise.reject(reason);
          });
        };
      },
      "../node_modules/axios/lib/core/enhanceError.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        module3.exports = function enhanceError(error, config, code, request, response) {
          error.config = config;
          if (code) {
            error.code = code;
          }
          error.request = request;
          error.response = response;
          error.isAxiosError = true;
          error.toJSON = function toJSON() {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: this.config,
              code: this.code
            };
          };
          return error;
        };
      },
      "../node_modules/axios/lib/core/mergeConfig.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        module3.exports = function mergeConfig(config1, config2) {
          config2 = config2 || {};
          var config = {};
          var valueFromConfig2Keys = ["url", "method", "data"];
          var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
          var defaultToConfig2Keys = [
            "baseURL",
            "transformRequest",
            "transformResponse",
            "paramsSerializer",
            "timeout",
            "timeoutMessage",
            "withCredentials",
            "adapter",
            "responseType",
            "xsrfCookieName",
            "xsrfHeaderName",
            "onUploadProgress",
            "onDownloadProgress",
            "decompress",
            "maxContentLength",
            "maxBodyLength",
            "maxRedirects",
            "transport",
            "httpAgent",
            "httpsAgent",
            "cancelToken",
            "socketPath",
            "responseEncoding"
          ];
          var directMergeKeys = ["validateStatus"];
          function getMergedValue(target, source) {
            if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
              return utils.merge(target, source);
            } else if (utils.isPlainObject(source)) {
              return utils.merge({}, source);
            } else if (utils.isArray(source)) {
              return source.slice();
            }
            return source;
          }
          function mergeDeepProperties(prop) {
            if (!utils.isUndefined(config2[prop])) {
              config[prop] = getMergedValue(config1[prop], config2[prop]);
            } else if (!utils.isUndefined(config1[prop])) {
              config[prop] = getMergedValue(void 0, config1[prop]);
            }
          }
          utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
            if (!utils.isUndefined(config2[prop])) {
              config[prop] = getMergedValue(void 0, config2[prop]);
            }
          });
          utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
          utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
            if (!utils.isUndefined(config2[prop])) {
              config[prop] = getMergedValue(void 0, config2[prop]);
            } else if (!utils.isUndefined(config1[prop])) {
              config[prop] = getMergedValue(void 0, config1[prop]);
            }
          });
          utils.forEach(directMergeKeys, function merge(prop) {
            if (prop in config2) {
              config[prop] = getMergedValue(config1[prop], config2[prop]);
            } else if (prop in config1) {
              config[prop] = getMergedValue(void 0, config1[prop]);
            }
          });
          var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
          var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
            return axiosKeys.indexOf(key) === -1;
          });
          utils.forEach(otherKeys, mergeDeepProperties);
          return config;
        };
      },
      "../node_modules/axios/lib/core/settle.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var createError = __webpack_require__("../node_modules/axios/lib/core/createError.js");
        module3.exports = function settle(resolve, reject, response) {
          var validateStatus = response.config.validateStatus;
          if (!response.status || !validateStatus || validateStatus(response.status)) {
            resolve(response);
          } else {
            reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
          }
        };
      },
      "../node_modules/axios/lib/core/transformData.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        module3.exports = function transformData(data, headers, fns) {
          utils.forEach(fns, function transform(fn) {
            data = fn(data, headers);
          });
          return data;
        };
      },
      "../node_modules/axios/lib/defaults.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        var normalizeHeaderName = __webpack_require__("../node_modules/axios/lib/helpers/normalizeHeaderName.js");
        var DEFAULT_CONTENT_TYPE = {
          "Content-Type": "application/x-www-form-urlencoded"
        };
        function setContentTypeIfUnset(headers, value) {
          if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
            headers["Content-Type"] = value;
          }
        }
        function getDefaultAdapter() {
          var adapter;
          if (typeof XMLHttpRequest !== "undefined") {
            adapter = __webpack_require__("../node_modules/axios/lib/adapters/xhr.js");
          } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
            adapter = __webpack_require__("../node_modules/axios/lib/adapters/http.js");
          }
          return adapter;
        }
        var defaults = {
          adapter: getDefaultAdapter(),
          transformRequest: [function transformRequest(data, headers) {
            normalizeHeaderName(headers, "Accept");
            normalizeHeaderName(headers, "Content-Type");
            if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
              return data;
            }
            if (utils.isArrayBufferView(data)) {
              return data.buffer;
            }
            if (utils.isURLSearchParams(data)) {
              setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
              return data.toString();
            }
            if (utils.isObject(data)) {
              setContentTypeIfUnset(headers, "application/json;charset=utf-8");
              return JSON.stringify(data);
            }
            return data;
          }],
          transformResponse: [function transformResponse(data) {
            if (typeof data === "string") {
              try {
                data = JSON.parse(data);
              } catch (e) {
              }
            }
            return data;
          }],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          validateStatus: function validateStatus(status) {
            return status >= 200 && status < 300;
          }
        };
        defaults.headers = {
          common: {
            "Accept": "application/json, text/plain, */*"
          }
        };
        utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
          defaults.headers[method] = {};
        });
        utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
          defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
        });
        module3.exports = defaults;
      },
      "../node_modules/axios/lib/helpers/bind.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        module3.exports = function bind(fn, thisArg) {
          return function wrap() {
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i];
            }
            return fn.apply(thisArg, args);
          };
        };
      },
      "../node_modules/axios/lib/helpers/buildURL.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        function encode(val) {
          return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        module3.exports = function buildURL(url, params, paramsSerializer) {
          if (!params) {
            return url;
          }
          var serializedParams;
          if (paramsSerializer) {
            serializedParams = paramsSerializer(params);
          } else if (utils.isURLSearchParams(params)) {
            serializedParams = params.toString();
          } else {
            var parts = [];
            utils.forEach(params, function serialize(val, key) {
              if (val === null || typeof val === "undefined") {
                return;
              }
              if (utils.isArray(val)) {
                key = key + "[]";
              } else {
                val = [val];
              }
              utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                  v = v.toISOString();
                } else if (utils.isObject(v)) {
                  v = JSON.stringify(v);
                }
                parts.push(encode(key) + "=" + encode(v));
              });
            });
            serializedParams = parts.join("&");
          }
          if (serializedParams) {
            var hashmarkIndex = url.indexOf("#");
            if (hashmarkIndex !== -1) {
              url = url.slice(0, hashmarkIndex);
            }
            url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
          }
          return url;
        };
      },
      "../node_modules/axios/lib/helpers/combineURLs.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        module3.exports = function combineURLs(baseURL, relativeURL) {
          return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
        };
      },
      "../node_modules/axios/lib/helpers/cookies.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        module3.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
          return {
            write: function write(name, value, expires, path, domain, secure) {
              var cookie = [];
              cookie.push(name + "=" + encodeURIComponent(value));
              if (utils.isNumber(expires)) {
                cookie.push("expires=" + new Date(expires).toGMTString());
              }
              if (utils.isString(path)) {
                cookie.push("path=" + path);
              }
              if (utils.isString(domain)) {
                cookie.push("domain=" + domain);
              }
              if (secure === true) {
                cookie.push("secure");
              }
              document.cookie = cookie.join("; ");
            },
            read: function read(name) {
              var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
              return match ? decodeURIComponent(match[3]) : null;
            },
            remove: function remove(name) {
              this.write(name, "", Date.now() - 864e5);
            }
          };
        }() : function nonStandardBrowserEnv() {
          return {
            write: function write() {
            },
            read: function read() {
              return null;
            },
            remove: function remove() {
            }
          };
        }();
      },
      "../node_modules/axios/lib/helpers/isAbsoluteURL.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        module3.exports = function isAbsoluteURL(url) {
          return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
        };
      },
      "../node_modules/axios/lib/helpers/isAxiosError.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        module3.exports = function isAxiosError(payload) {
          return typeof payload === "object" && payload.isAxiosError === true;
        };
      },
      "../node_modules/axios/lib/helpers/isURLSameOrigin.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        module3.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
          var msie = /(msie|trident)/i.test(navigator.userAgent);
          var urlParsingNode = document.createElement("a");
          var originURL;
          function resolveURL(url) {
            var href = url;
            if (msie) {
              urlParsingNode.setAttribute("href", href);
              href = urlParsingNode.href;
            }
            urlParsingNode.setAttribute("href", href);
            return {
              href: urlParsingNode.href,
              protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
              host: urlParsingNode.host,
              search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
              hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
              hostname: urlParsingNode.hostname,
              port: urlParsingNode.port,
              pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
            };
          }
          originURL = resolveURL(window.location.href);
          return function isURLSameOrigin(requestURL) {
            var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
            return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
          };
        }() : function nonStandardBrowserEnv() {
          return function isURLSameOrigin() {
            return true;
          };
        }();
      },
      "../node_modules/axios/lib/helpers/normalizeHeaderName.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        module3.exports = function normalizeHeaderName(headers, normalizedName) {
          utils.forEach(headers, function processHeader(value, name) {
            if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
              headers[normalizedName] = value;
              delete headers[name];
            }
          });
        };
      },
      "../node_modules/axios/lib/helpers/parseHeaders.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
        var ignoreDuplicateOf = [
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent"
        ];
        module3.exports = function parseHeaders(headers) {
          var parsed = {};
          var key;
          var val;
          var i;
          if (!headers) {
            return parsed;
          }
          utils.forEach(headers.split("\n"), function parser(line) {
            i = line.indexOf(":");
            key = utils.trim(line.substr(0, i)).toLowerCase();
            val = utils.trim(line.substr(i + 1));
            if (key) {
              if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
              }
              if (key === "set-cookie") {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
              } else {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
              }
            }
          });
          return parsed;
        };
      },
      "../node_modules/axios/lib/helpers/spread.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        module3.exports = function spread(callback) {
          return function wrap(arr) {
            return callback.apply(null, arr);
          };
        };
      },
      "../node_modules/axios/lib/utils.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var bind = __webpack_require__("../node_modules/axios/lib/helpers/bind.js");
        var toString = Object.prototype.toString;
        function isArray(val) {
          return toString.call(val) === "[object Array]";
        }
        function isUndefined(val) {
          return typeof val === "undefined";
        }
        function isBuffer(val) {
          return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
        }
        function isArrayBuffer(val) {
          return toString.call(val) === "[object ArrayBuffer]";
        }
        function isFormData(val) {
          return typeof FormData !== "undefined" && val instanceof FormData;
        }
        function isArrayBufferView(val) {
          var result;
          if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
            result = ArrayBuffer.isView(val);
          } else {
            result = val && val.buffer && val.buffer instanceof ArrayBuffer;
          }
          return result;
        }
        function isString(val) {
          return typeof val === "string";
        }
        function isNumber(val) {
          return typeof val === "number";
        }
        function isObject(val) {
          return val !== null && typeof val === "object";
        }
        function isPlainObject(val) {
          if (toString.call(val) !== "[object Object]") {
            return false;
          }
          var prototype = Object.getPrototypeOf(val);
          return prototype === null || prototype === Object.prototype;
        }
        function isDate(val) {
          return toString.call(val) === "[object Date]";
        }
        function isFile(val) {
          return toString.call(val) === "[object File]";
        }
        function isBlob(val) {
          return toString.call(val) === "[object Blob]";
        }
        function isFunction(val) {
          return toString.call(val) === "[object Function]";
        }
        function isStream(val) {
          return isObject(val) && isFunction(val.pipe);
        }
        function isURLSearchParams(val) {
          return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
        }
        function trim(str) {
          return str.replace(/^\s*/, "").replace(/\s*$/, "");
        }
        function isStandardBrowserEnv() {
          if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
            return false;
          }
          return typeof window !== "undefined" && typeof document !== "undefined";
        }
        function forEach(obj, fn) {
          if (obj === null || typeof obj === "undefined") {
            return;
          }
          if (typeof obj !== "object") {
            obj = [obj];
          }
          if (isArray(obj)) {
            for (var i = 0, l = obj.length; i < l; i++) {
              fn.call(null, obj[i], i, obj);
            }
          } else {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
              }
            }
          }
        }
        function merge() {
          var result = {};
          function assignValue(val, key) {
            if (isPlainObject(result[key]) && isPlainObject(val)) {
              result[key] = merge(result[key], val);
            } else if (isPlainObject(val)) {
              result[key] = merge({}, val);
            } else if (isArray(val)) {
              result[key] = val.slice();
            } else {
              result[key] = val;
            }
          }
          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }
        function extend(a, b, thisArg) {
          forEach(b, function assignValue(val, key) {
            if (thisArg && typeof val === "function") {
              a[key] = bind(val, thisArg);
            } else {
              a[key] = val;
            }
          });
          return a;
        }
        function stripBOM(content) {
          if (content.charCodeAt(0) === 65279) {
            content = content.slice(1);
          }
          return content;
        }
        module3.exports = {
          isArray,
          isArrayBuffer,
          isBuffer,
          isFormData,
          isArrayBufferView,
          isString,
          isNumber,
          isObject,
          isPlainObject,
          isUndefined,
          isDate,
          isFile,
          isBlob,
          isFunction,
          isStream,
          isURLSearchParams,
          isStandardBrowserEnv,
          forEach,
          merge,
          extend,
          trim,
          stripBOM
        };
      },
      "../node_modules/axios/package.json": function(module3) {
        module3.exports = JSON.parse('{"_args":[["axios@0.21.1","/home/circleci/project"]],"_from":"axios@0.21.1","_id":"axios@0.21.1","_inBundle":false,"_integrity":"sha512-dKQiRHxGD9PPRIUNIWvZhPTPpl1rf/OxTYKsqKUDjBwYylTvV7SjSHJb9ratfyzM6wCdLCOYLzs73qpg5c4iGA==","_location":"/axios","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"axios@0.21.1","name":"axios","escapedName":"axios","rawSpec":"0.21.1","saveSpec":null,"fetchSpec":"0.21.1"},"_requiredBy":["/","/bundlesize","/github-build"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.21.1.tgz","_spec":"0.21.1","_where":"/home/circleci/project","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.10.0"},"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"bundlesize":"^0.17.0","coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.0.2","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^20.1.0","grunt-karma":"^2.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.2.0","karma-coverage":"^1.1.1","karma-firefox-launcher":"^1.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.2.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^5.2.0","sinon":"^4.5.0","typescript":"^2.8.1","url-search-params":"^0.10.0","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/axios/axios","jsdelivr":"dist/axios.min.js","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","fix":"eslint --fix lib/**/*.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test && bundlesize","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","unpkg":"dist/axios.min.js","version":"0.21.1"}');
      },
      "../node_modules/contentful-resolve-response/dist/esm/index.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/fast-copy/dist/fast-copy.esm.js");
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
          return typeof obj;
        } : function(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        function _toConsumableArray(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          } else {
            return Array.from(arr);
          }
        }
        var UNRESOLVED_LINK = {};
        var isLink = function isLink2(object) {
          return object && object.sys && object.sys.type === "Link";
        };
        var makeLookupKey = function makeLookupKey2(sys) {
          return sys.type + "!" + sys.id;
        };
        var getLink = function getLink2(entityMap, link) {
          var _link$sys = link.sys, type = _link$sys.linkType, id = _link$sys.id;
          var lookupKey = makeLookupKey({ type, id });
          return entityMap.get(lookupKey) || UNRESOLVED_LINK;
        };
        var cleanUpLinks = function cleanUpLinks2(input) {
          if (Array.isArray(input)) {
            return input.filter(function(val) {
              return val !== UNRESOLVED_LINK;
            });
          }
          for (var key in input) {
            if (input[key] === UNRESOLVED_LINK) {
              delete input[key];
            }
          }
          return input;
        };
        var walkMutate = function walkMutate2(input, predicate, mutator, removeUnresolved) {
          if (predicate(input)) {
            return mutator(input);
          }
          if (input && (typeof input === "undefined" ? "undefined" : _typeof(input)) === "object") {
            for (var key in input) {
              if (input.hasOwnProperty(key)) {
                input[key] = walkMutate2(input[key], predicate, mutator, removeUnresolved);
              }
            }
            if (removeUnresolved) {
              input = cleanUpLinks(input);
            }
          }
          return input;
        };
        var normalizeLink = function normalizeLink2(entityMap, link, removeUnresolved) {
          var resolvedLink = getLink(entityMap, link);
          if (resolvedLink === UNRESOLVED_LINK) {
            return removeUnresolved ? resolvedLink : link;
          }
          return resolvedLink;
        };
        var makeEntryObject = function makeEntryObject2(item, itemEntryPoints) {
          if (!Array.isArray(itemEntryPoints)) {
            return item;
          }
          var entryPoints = Object.keys(item).filter(function(ownKey) {
            return itemEntryPoints.indexOf(ownKey) !== -1;
          });
          return entryPoints.reduce(function(entryObj, entryPoint) {
            entryObj[entryPoint] = item[entryPoint];
            return entryObj;
          }, {});
        };
        var resolveResponse = function resolveResponse2(response, options) {
          options = options || {};
          if (!response.items) {
            return [];
          }
          var responseClone = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(response);
          var allIncludes = Object.keys(responseClone.includes || {}).reduce(function(all, type) {
            return [].concat(_toConsumableArray(all), _toConsumableArray(response.includes[type]));
          }, []);
          var allEntries = [].concat(_toConsumableArray(responseClone.items), _toConsumableArray(allIncludes));
          var entityMap = new Map(allEntries.map(function(entity) {
            return [makeLookupKey(entity.sys), entity];
          }));
          allEntries.forEach(function(item) {
            var entryObject = makeEntryObject(item, options.itemEntryPoints);
            Object.assign(item, walkMutate(entryObject, isLink, function(link) {
              return normalizeLink(entityMap, link, options.removeUnresolved);
            }, options.removeUnresolved));
          });
          return responseClone.items;
        };
        __webpack_exports__["default"] = resolveResponse;
      },
      "../node_modules/contentful-sdk-core/dist/index.es-modules.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "createHttpClient", function() {
          return createHttpClient;
        });
        __webpack_require__.d(__webpack_exports__, "createRequestConfig", function() {
          return createRequestConfig;
        });
        __webpack_require__.d(__webpack_exports__, "enforceObjPath", function() {
          return enforceObjPath;
        });
        __webpack_require__.d(__webpack_exports__, "freezeSys", function() {
          return freezeSys;
        });
        __webpack_require__.d(__webpack_exports__, "getUserAgentHeader", function() {
          return getUserAgentHeader;
        });
        __webpack_require__.d(__webpack_exports__, "toPlainObject", function() {
          return toPlainObject;
        });
        var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/fast-copy/dist/fast-copy.esm.js");
        var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/qs/lib/index.js");
        var qs__WEBPACK_IMPORTED_MODULE_1___default = /* @__PURE__ */ __webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
        var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("os");
        var os__WEBPACK_IMPORTED_MODULE_2___default = /* @__PURE__ */ __webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_2__);
        function _typeof(obj) {
          "@babel/helpers - typeof";
          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj2) {
              return typeof obj2;
            };
          } else {
            _typeof = function(obj2) {
              return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            };
          }
          return _typeof(obj);
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread2(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr))
            return arr;
        }
        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
            return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null)
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        function _unsupportedIterableToArray(o, minLen) {
          if (!o)
            return;
          if (typeof o === "string")
            return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor)
            n = o.constructor.name;
          if (n === "Map" || n === "Set")
            return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length)
            len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++)
            arr2[i] = arr[i];
          return arr2;
        }
        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
          var it;
          if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
            if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
              if (it)
                o = it;
              var i = 0;
              var F = function() {
              };
              return {
                s: F,
                n: function() {
                  if (i >= o.length)
                    return {
                      done: true
                    };
                  return {
                    done: false,
                    value: o[i++]
                  };
                },
                e: function(e) {
                  throw e;
                },
                f: F
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          var normalCompletion = true, didErr = false, err;
          return {
            s: function() {
              it = o[Symbol.iterator]();
            },
            n: function() {
              var step = it.next();
              normalCompletion = step.done;
              return step;
            },
            e: function(e) {
              didErr = true;
              err = e;
            },
            f: function() {
              try {
                if (!normalCompletion && it.return != null)
                  it.return();
              } finally {
                if (didErr)
                  throw err;
              }
            }
          };
        }
        var attempts = {};
        var networkErrorAttempts = 0;
        function noop() {
          return void 0;
        }
        var delay = function delay2(ms) {
          return new Promise(function(resolve) {
            setTimeout(resolve, ms);
          });
        };
        function rateLimit(instance) {
          var maxRetry = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
          var _instance$defaults = instance.defaults, _instance$defaults$re = _instance$defaults.responseLogger, responseLogger = _instance$defaults$re === void 0 ? noop : _instance$defaults$re, _instance$defaults$re2 = _instance$defaults.requestLogger, requestLogger = _instance$defaults$re2 === void 0 ? noop : _instance$defaults$re2;
          instance.interceptors.request.use(function(config) {
            requestLogger(config);
            return config;
          }, function(error) {
            requestLogger(error);
            return Promise.reject(error);
          });
          instance.interceptors.response.use(function(response) {
            responseLogger(response);
            return response;
          }, function(error) {
            var response = error.response;
            var config = error.config;
            responseLogger(error);
            if (!config || !instance.defaults.retryOnError) {
              return Promise.reject(error);
            }
            var retryErrorType = null;
            var wait = 0;
            if (!response) {
              retryErrorType = "Connection";
              networkErrorAttempts++;
              if (networkErrorAttempts > maxRetry) {
                error.attempts = networkErrorAttempts;
                return Promise.reject(error);
              }
              wait = Math.pow(Math.SQRT2, networkErrorAttempts);
              response = {};
            } else {
              networkErrorAttempts = 0;
            }
            if (response.status >= 500 && response.status < 600) {
              retryErrorType = "Server ".concat(response.status);
              var headers = response.headers || {};
              var requestId = headers["x-contentful-request-id"] || null;
              attempts[requestId] = attempts[requestId] || 0;
              attempts[requestId]++;
              if (attempts[requestId] > maxRetry || !requestId) {
                error.attempts = attempts[requestId];
                return Promise.reject(error);
              }
              wait = Math.pow(Math.SQRT2, attempts[requestId]);
            } else if (response.status === 429) {
              retryErrorType = "Rate limit";
              if (response.headers && error.response.headers["x-contentful-ratelimit-reset"]) {
                wait = response.headers["x-contentful-ratelimit-reset"];
              }
            }
            if (retryErrorType) {
              wait = Math.floor(wait * 1e3 + Math.random() * 200 + 500);
              instance.defaults.logHandler("warning", "".concat(retryErrorType, " error occurred. Waiting for ").concat(wait, " ms before retrying..."));
              delete config.httpAgent;
              delete config.httpsAgent;
              return delay(wait).then(function() {
                return instance(config);
              });
            }
            return Promise.reject(error);
          });
        }
        function asyncToken(instance, getToken) {
          instance.interceptors.request.use(function(config) {
            return getToken().then(function(accessToken) {
              config.headers = _objectSpread2(_objectSpread2({}, config.headers), {}, {
                Authorization: "Bearer ".concat(accessToken)
              });
              return config;
            });
          });
        }
        function isNode() {
          return typeof process !== "undefined" && !process.browser;
        }
        function isReactNative() {
          return typeof window !== "undefined" && "navigator" in window && "product" in window.navigator && window.navigator.product === "ReactNative";
        }
        function getNodeVersion() {
          return process.versions && process.versions.node ? "v".concat(process.versions.node) : process.version;
        }
        function getWindow() {
          return window;
        }
        var HOST_REGEX = /^(?!\w+:\/\/)([^\s:]+\.?[^\s:]+)(?::(\d+))?(?!:)$/;
        function createHttpClient(axios, options) {
          var defaultConfig = {
            insecure: false,
            retryOnError: true,
            logHandler: function logHandler(level, data) {
              if (level === "error" && data) {
                var title = [data.name, data.message].filter(function(a) {
                  return a;
                }).join(" - ");
                console.error("[error] ".concat(title));
                console.error(data);
                return;
              }
              console.log("[".concat(level, "] ").concat(data));
            },
            headers: {},
            httpAgent: false,
            httpsAgent: false,
            timeout: 3e4,
            proxy: false,
            basePath: "",
            adapter: void 0,
            maxContentLength: 1073741824
          };
          var config = _objectSpread2(_objectSpread2({}, defaultConfig), options);
          if (!config.accessToken) {
            var missingAccessTokenError = new TypeError("Expected parameter accessToken");
            config.logHandler("error", missingAccessTokenError);
            throw missingAccessTokenError;
          }
          var protocol = config.insecure ? "http" : "https";
          var space = config.space ? "".concat(config.space, "/") : "";
          var hostname = config.defaultHostname;
          var port = config.insecure ? 80 : 443;
          if (config.host && HOST_REGEX.test(config.host)) {
            var parsed = config.host.split(":");
            if (parsed.length === 2) {
              var _parsed = _slicedToArray(parsed, 2);
              hostname = _parsed[0];
              port = _parsed[1];
            } else {
              hostname = parsed[0];
            }
          }
          if (config.basePath) {
            config.basePath = "/".concat(config.basePath.split("/").filter(Boolean).join("/"));
          }
          var baseURL = options.baseURL || "".concat(protocol, "://").concat(hostname, ":").concat(port).concat(config.basePath, "/spaces/").concat(space);
          if (!config.headers.Authorization && typeof config.accessToken !== "function") {
            config.headers.Authorization = "Bearer " + config.accessToken;
          }
          if (isNode()) {
            config.headers["user-agent"] = "node.js/" + getNodeVersion();
            config.headers["Accept-Encoding"] = "gzip";
          }
          var axiosOptions = {
            baseURL,
            headers: config.headers,
            httpAgent: config.httpAgent,
            httpsAgent: config.httpsAgent,
            paramsSerializer: qs__WEBPACK_IMPORTED_MODULE_1___default.a.stringify,
            proxy: config.proxy,
            timeout: config.timeout,
            adapter: config.adapter,
            maxContentLength: config.maxContentLength,
            logHandler: config.logHandler,
            responseLogger: config.responseLogger,
            requestLogger: config.requestLogger,
            retryOnError: config.retryOnError
          };
          var instance = axios.create(axiosOptions);
          instance.httpClientParams = options;
          instance.cloneWithNewParams = function(newParams) {
            return createHttpClient(axios, _objectSpread2(_objectSpread2({}, Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(options)), newParams));
          };
          if (config.onBeforeRequest) {
            instance.interceptors.request.use(config.onBeforeRequest);
          }
          if (typeof config.accessToken === "function") {
            asyncToken(instance, config.accessToken);
          }
          rateLimit(instance, config.retryLimit);
          if (config.onError) {
            instance.interceptors.response.use(function(response) {
              return response;
            }, config.onError);
          }
          return instance;
        }
        function createRequestConfig(_ref) {
          var query = _ref.query;
          var config = {};
          delete query.resolveLinks;
          config.params = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(query);
          return config;
        }
        function enforceObjPath(obj, path) {
          if (!(path in obj)) {
            var err = new Error();
            err.name = "PropertyMissing";
            err.message = "Required property ".concat(path, " missing from:\n\n").concat(JSON.stringify(obj), "\n\n");
            throw err;
          }
          return true;
        }
        function deepFreeze(object) {
          var propNames = Object.getOwnPropertyNames(object);
          var _iterator = _createForOfIteratorHelper(propNames), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var name = _step.value;
              var value = object[name];
              if (value && _typeof(value) === "object") {
                deepFreeze(value);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return Object.freeze(object);
        }
        function freezeSys(obj) {
          deepFreeze(obj.sys || {});
          return obj;
        }
        function getBrowserOS() {
          var win = getWindow();
          if (!win) {
            return null;
          }
          var userAgent = win.navigator.userAgent;
          var platform = win.navigator.platform;
          var macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
          var windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
          var iosPlatforms = ["iPhone", "iPad", "iPod"];
          var os = null;
          if (macosPlatforms.indexOf(platform) !== -1) {
            os = "macOS";
          } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = "iOS";
          } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = "Windows";
          } else if (/Android/.test(userAgent)) {
            os = "Android";
          } else if (/Linux/.test(platform)) {
            os = "Linux";
          }
          return os;
        }
        function getNodeOS() {
          var os = Object(os__WEBPACK_IMPORTED_MODULE_2__["platform"])() || "linux";
          var version = Object(os__WEBPACK_IMPORTED_MODULE_2__["release"])() || "0.0.0";
          var osMap = {
            android: "Android",
            aix: "Linux",
            darwin: "macOS",
            freebsd: "Linux",
            linux: "Linux",
            openbsd: "Linux",
            sunos: "Linux",
            win32: "Windows"
          };
          if (os in osMap) {
            return "".concat(osMap[os] || "Linux", "/").concat(version);
          }
          return null;
        }
        function getUserAgentHeader(sdk, application, integration, feature) {
          var headerParts = [];
          if (application) {
            headerParts.push("app ".concat(application));
          }
          if (integration) {
            headerParts.push("integration ".concat(integration));
          }
          if (feature) {
            headerParts.push("feature " + feature);
          }
          headerParts.push("sdk ".concat(sdk));
          var os = null;
          try {
            if (isReactNative()) {
              os = getBrowserOS();
              headerParts.push("platform ReactNative");
            } else if (isNode()) {
              os = getNodeOS();
              headerParts.push("platform node.js/".concat(getNodeVersion()));
            } else {
              os = getBrowserOS();
              headerParts.push("platform browser");
            }
          } catch (e) {
            os = null;
          }
          if (os) {
            headerParts.push("os ".concat(os));
          }
          return "".concat(headerParts.filter(function(item) {
            return item !== "";
          }).join("; "), ";");
        }
        function toPlainObject(data) {
          return Object.defineProperty(data, "toPlainObject", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function value() {
              return Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(this);
            }
          });
        }
      },
      "../node_modules/debug/src/browser.js": function(module3, exports2, __webpack_require__) {
        exports2 = module3.exports = __webpack_require__("../node_modules/debug/src/debug.js");
        exports2.log = log;
        exports2.formatArgs = formatArgs;
        exports2.save = save;
        exports2.load = load;
        exports2.useColors = useColors;
        exports2.storage = typeof chrome != "undefined" && typeof chrome.storage != "undefined" ? chrome.storage.local : localstorage();
        exports2.colors = [
          "lightseagreen",
          "forestgreen",
          "goldenrod",
          "dodgerblue",
          "darkorchid",
          "crimson"
        ];
        function useColors() {
          if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
            return true;
          }
          return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }
        exports2.formatters.j = function(v) {
          try {
            return JSON.stringify(v);
          } catch (err) {
            return "[UnexpectedJSONParseError]: " + err.message;
          }
        };
        function formatArgs(args) {
          var useColors2 = this.useColors;
          args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports2.humanize(this.diff);
          if (!useColors2)
            return;
          var c = "color: " + this.color;
          args.splice(1, 0, c, "color: inherit");
          var index = 0;
          var lastC = 0;
          args[0].replace(/%[a-zA-Z%]/g, function(match) {
            if (match === "%%")
              return;
            index++;
            if (match === "%c") {
              lastC = index;
            }
          });
          args.splice(lastC, 0, c);
        }
        function log() {
          return typeof console === "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }
        function save(namespaces) {
          try {
            if (namespaces == null) {
              exports2.storage.removeItem("debug");
            } else {
              exports2.storage.debug = namespaces;
            }
          } catch (e) {
          }
        }
        function load() {
          var r;
          try {
            r = exports2.storage.debug;
          } catch (e) {
          }
          if (!r && typeof process !== "undefined" && "env" in process) {
            r = process.env.DEBUG;
          }
          return r;
        }
        exports2.enable(load());
        function localstorage() {
          try {
            return window.localStorage;
          } catch (e) {
          }
        }
      },
      "../node_modules/debug/src/debug.js": function(module3, exports2, __webpack_require__) {
        exports2 = module3.exports = createDebug.debug = createDebug["default"] = createDebug;
        exports2.coerce = coerce;
        exports2.disable = disable;
        exports2.enable = enable;
        exports2.enabled = enabled;
        exports2.humanize = __webpack_require__("../node_modules/ms/index.js");
        exports2.names = [];
        exports2.skips = [];
        exports2.formatters = {};
        var prevTime;
        function selectColor(namespace) {
          var hash = 0, i;
          for (i in namespace) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return exports2.colors[Math.abs(hash) % exports2.colors.length];
        }
        function createDebug(namespace) {
          function debug() {
            if (!debug.enabled)
              return;
            var self2 = debug;
            var curr = +new Date();
            var ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i];
            }
            args[0] = exports2.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            var index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
              if (match === "%%")
                return match;
              index++;
              var formatter = exports2.formatters[format];
              if (typeof formatter === "function") {
                var val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            exports2.formatArgs.call(self2, args);
            var logFn = debug.log || exports2.log || console.log.bind(console);
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.enabled = exports2.enabled(namespace);
          debug.useColors = exports2.useColors();
          debug.color = selectColor(namespace);
          if (typeof exports2.init === "function") {
            exports2.init(debug);
          }
          return debug;
        }
        function enable(namespaces) {
          exports2.save(namespaces);
          exports2.names = [];
          exports2.skips = [];
          var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          var len = split.length;
          for (var i = 0; i < len; i++) {
            if (!split[i])
              continue;
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              exports2.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
            } else {
              exports2.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          exports2.enable("");
        }
        function enabled(name) {
          var i, len;
          for (i = 0, len = exports2.skips.length; i < len; i++) {
            if (exports2.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = exports2.names.length; i < len; i++) {
            if (exports2.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }
        function coerce(val) {
          if (val instanceof Error)
            return val.stack || val.message;
          return val;
        }
      },
      "../node_modules/debug/src/index.js": function(module3, exports2, __webpack_require__) {
        if (typeof process !== "undefined" && process.type === "renderer") {
          module3.exports = __webpack_require__("../node_modules/debug/src/browser.js");
        } else {
          module3.exports = __webpack_require__("../node_modules/debug/src/node.js");
        }
      },
      "../node_modules/debug/src/node.js": function(module3, exports2, __webpack_require__) {
        var tty = __webpack_require__("tty");
        var util = __webpack_require__("util");
        exports2 = module3.exports = __webpack_require__("../node_modules/debug/src/debug.js");
        exports2.init = init;
        exports2.log = log;
        exports2.formatArgs = formatArgs;
        exports2.save = save;
        exports2.load = load;
        exports2.useColors = useColors;
        exports2.colors = [6, 2, 3, 4, 5, 1];
        exports2.inspectOpts = Object.keys(process.env).filter(function(key) {
          return /^debug_/i.test(key);
        }).reduce(function(obj, key) {
          var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
            return k.toUpperCase();
          });
          var val = process.env[key];
          if (/^(yes|on|true|enabled)$/i.test(val))
            val = true;
          else if (/^(no|off|false|disabled)$/i.test(val))
            val = false;
          else if (val === "null")
            val = null;
          else
            val = Number(val);
          obj[prop] = val;
          return obj;
        }, {});
        var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
        if (fd !== 1 && fd !== 2) {
          util.deprecate(function() {
          }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
        }
        var stream = fd === 1 ? process.stdout : fd === 2 ? process.stderr : createWritableStdioStream(fd);
        function useColors() {
          return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(fd);
        }
        exports2.formatters.o = function(v) {
          this.inspectOpts.colors = this.useColors;
          return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
            return str.trim();
          }).join(" ");
        };
        exports2.formatters.O = function(v) {
          this.inspectOpts.colors = this.useColors;
          return util.inspect(v, this.inspectOpts);
        };
        function formatArgs(args) {
          var name = this.namespace;
          var useColors2 = this.useColors;
          if (useColors2) {
            var c = this.color;
            var prefix = "  [3" + c + ";1m" + name + " [0m";
            args[0] = prefix + args[0].split("\n").join("\n" + prefix);
            args.push("[3" + c + "m+" + exports2.humanize(this.diff) + "[0m");
          } else {
            args[0] = new Date().toUTCString() + " " + name + " " + args[0];
          }
        }
        function log() {
          return stream.write(util.format.apply(util, arguments) + "\n");
        }
        function save(namespaces) {
          if (namespaces == null) {
            delete process.env.DEBUG;
          } else {
            process.env.DEBUG = namespaces;
          }
        }
        function load() {
          return process.env.DEBUG;
        }
        function createWritableStdioStream(fd2) {
          var stream2;
          var tty_wrap = process.binding("tty_wrap");
          switch (tty_wrap.guessHandleType(fd2)) {
            case "TTY":
              stream2 = new tty.WriteStream(fd2);
              stream2._type = "tty";
              if (stream2._handle && stream2._handle.unref) {
                stream2._handle.unref();
              }
              break;
            case "FILE":
              var fs = __webpack_require__("fs");
              stream2 = new fs.SyncWriteStream(fd2, { autoClose: false });
              stream2._type = "fs";
              break;
            case "PIPE":
            case "TCP":
              var net = __webpack_require__("net");
              stream2 = new net.Socket({
                fd: fd2,
                readable: false,
                writable: true
              });
              stream2.readable = false;
              stream2.read = null;
              stream2._type = "pipe";
              if (stream2._handle && stream2._handle.unref) {
                stream2._handle.unref();
              }
              break;
            default:
              throw new Error("Implement me. Unknown stream file type!");
          }
          stream2.fd = fd2;
          stream2._isStdio = true;
          return stream2;
        }
        function init(debug) {
          debug.inspectOpts = {};
          var keys = Object.keys(exports2.inspectOpts);
          for (var i = 0; i < keys.length; i++) {
            debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
          }
        }
        exports2.enable(load());
      },
      "../node_modules/fast-copy/dist/fast-copy.esm.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var toStringFunction = Function.prototype.toString;
        var create = Object.create, defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols, getPrototypeOf = Object.getPrototypeOf;
        var _a = Object.prototype, hasOwnProperty = _a.hasOwnProperty, propertyIsEnumerable = _a.propertyIsEnumerable;
        var SUPPORTS = {
          SYMBOL_PROPERTIES: typeof getOwnPropertySymbols === "function",
          WEAKMAP: typeof WeakMap === "function"
        };
        var createCache = function() {
          if (SUPPORTS.WEAKMAP) {
            return new WeakMap();
          }
          var object = create({
            has: function(key) {
              return !!~object._keys.indexOf(key);
            },
            set: function(key, value) {
              object._keys.push(key);
              object._values.push(value);
            },
            get: function(key) {
              return object._values[object._keys.indexOf(key)];
            }
          });
          object._keys = [];
          object._values = [];
          return object;
        };
        var getCleanClone = function(object, realm) {
          if (!object.constructor) {
            return create(null);
          }
          var Constructor = object.constructor;
          var prototype = object.__proto__ || getPrototypeOf(object);
          if (Constructor === realm.Object) {
            return prototype === realm.Object.prototype ? {} : create(prototype);
          }
          if (~toStringFunction.call(Constructor).indexOf("[native code]")) {
            try {
              return new Constructor();
            } catch (_a2) {
            }
          }
          return create(prototype);
        };
        var getObjectCloneLoose = function(object, realm, handleCopy, cache) {
          var clone = getCleanClone(object, realm);
          cache.set(object, clone);
          for (var key in object) {
            if (hasOwnProperty.call(object, key)) {
              clone[key] = handleCopy(object[key], cache);
            }
          }
          if (SUPPORTS.SYMBOL_PROPERTIES) {
            var symbols = getOwnPropertySymbols(object);
            var length_1 = symbols.length;
            if (length_1) {
              for (var index = 0, symbol = void 0; index < length_1; index++) {
                symbol = symbols[index];
                if (propertyIsEnumerable.call(object, symbol)) {
                  clone[symbol] = handleCopy(object[symbol], cache);
                }
              }
            }
          }
          return clone;
        };
        var getObjectCloneStrict = function(object, realm, handleCopy, cache) {
          var clone = getCleanClone(object, realm);
          cache.set(object, clone);
          var properties = SUPPORTS.SYMBOL_PROPERTIES ? getOwnPropertyNames(object).concat(getOwnPropertySymbols(object)) : getOwnPropertyNames(object);
          var length = properties.length;
          if (length) {
            for (var index = 0, property = void 0, descriptor = void 0; index < length; index++) {
              property = properties[index];
              if (property !== "callee" && property !== "caller") {
                descriptor = getOwnPropertyDescriptor(object, property);
                if (descriptor) {
                  if (!descriptor.get && !descriptor.set) {
                    descriptor.value = handleCopy(object[property], cache);
                  }
                  try {
                    defineProperty(clone, property, descriptor);
                  } catch (error) {
                    clone[property] = descriptor.value;
                  }
                } else {
                  clone[property] = handleCopy(object[property], cache);
                }
              }
            }
          }
          return clone;
        };
        var getRegExpFlags = function(regExp) {
          var flags = "";
          if (regExp.global) {
            flags += "g";
          }
          if (regExp.ignoreCase) {
            flags += "i";
          }
          if (regExp.multiline) {
            flags += "m";
          }
          if (regExp.unicode) {
            flags += "u";
          }
          if (regExp.sticky) {
            flags += "y";
          }
          return flags;
        };
        var isArray = Array.isArray;
        var GLOBAL_THIS = function() {
          if (typeof self !== "undefined") {
            return self;
          }
          if (typeof window !== "undefined") {
            return window;
          }
          if (typeof global !== "undefined") {
            return global;
          }
          if (console && console.error) {
            console.error('Unable to locate global object, returning "this".');
          }
        }();
        function copy(object, options) {
          var isStrict = !!(options && options.isStrict);
          var realm = options && options.realm || GLOBAL_THIS;
          var getObjectClone = isStrict ? getObjectCloneStrict : getObjectCloneLoose;
          var handleCopy = function(object2, cache) {
            if (!object2 || typeof object2 !== "object") {
              return object2;
            }
            if (cache.has(object2)) {
              return cache.get(object2);
            }
            var Constructor = object2.constructor;
            if (Constructor === realm.Object) {
              return getObjectClone(object2, realm, handleCopy, cache);
            }
            var clone;
            if (isArray(object2)) {
              if (isStrict) {
                return getObjectCloneStrict(object2, realm, handleCopy, cache);
              }
              var length_1 = object2.length;
              clone = new Constructor();
              cache.set(object2, clone);
              for (var index = 0; index < length_1; index++) {
                clone[index] = handleCopy(object2[index], cache);
              }
              return clone;
            }
            if (object2 instanceof realm.Date) {
              return new Constructor(object2.getTime());
            }
            if (object2 instanceof realm.RegExp) {
              clone = new Constructor(object2.source, object2.flags || getRegExpFlags(object2));
              clone.lastIndex = object2.lastIndex;
              return clone;
            }
            if (realm.Map && object2 instanceof realm.Map) {
              clone = new Constructor();
              cache.set(object2, clone);
              object2.forEach(function(value, key) {
                clone.set(key, handleCopy(value, cache));
              });
              return clone;
            }
            if (realm.Set && object2 instanceof realm.Set) {
              clone = new Constructor();
              cache.set(object2, clone);
              object2.forEach(function(value) {
                clone.add(handleCopy(value, cache));
              });
              return clone;
            }
            if (realm.Blob && object2 instanceof realm.Blob) {
              return object2.slice(0, object2.size, object2.type);
            }
            if (realm.Buffer && realm.Buffer.isBuffer(object2)) {
              clone = realm.Buffer.allocUnsafe ? realm.Buffer.allocUnsafe(object2.length) : new Constructor(object2.length);
              cache.set(object2, clone);
              object2.copy(clone);
              return clone;
            }
            if (realm.ArrayBuffer) {
              if (realm.ArrayBuffer.isView(object2)) {
                clone = new Constructor(object2.buffer.slice(0));
                cache.set(object2, clone);
                return clone;
              }
              if (object2 instanceof realm.ArrayBuffer) {
                clone = object2.slice(0);
                cache.set(object2, clone);
                return clone;
              }
            }
            if (typeof object2.then === "function" || object2 instanceof Error || realm.WeakMap && object2 instanceof realm.WeakMap || realm.WeakSet && object2 instanceof realm.WeakSet) {
              return object2;
            }
            return getObjectClone(object2, realm, handleCopy, cache);
          };
          return handleCopy(object, createCache());
        }
        copy.default = copy;
        copy.strict = function strictCopy(object, options) {
          return copy(object, {
            isStrict: true,
            realm: options ? options.realm : void 0
          });
        };
        __webpack_exports__["default"] = copy;
      },
      "../node_modules/follow-redirects/debug.js": function(module3, exports2, __webpack_require__) {
        var debug;
        try {
          debug = __webpack_require__("../node_modules/debug/src/index.js")("follow-redirects");
        } catch (error) {
          debug = function() {
          };
        }
        module3.exports = debug;
      },
      "../node_modules/follow-redirects/index.js": function(module3, exports2, __webpack_require__) {
        var url = __webpack_require__("url");
        var URL = url.URL;
        var http = __webpack_require__("http");
        var https = __webpack_require__("https");
        var Writable = __webpack_require__("stream").Writable;
        var assert = __webpack_require__("assert");
        var debug = __webpack_require__("../node_modules/follow-redirects/debug.js");
        var eventHandlers = Object.create(null);
        ["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function(event) {
          eventHandlers[event] = function(arg1, arg2, arg3) {
            this._redirectable.emit(event, arg1, arg2, arg3);
          };
        });
        var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "");
        var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
        var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
        var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
        function RedirectableRequest(options, responseCallback) {
          Writable.call(this);
          this._sanitizeOptions(options);
          this._options = options;
          this._ended = false;
          this._ending = false;
          this._redirectCount = 0;
          this._redirects = [];
          this._requestBodyLength = 0;
          this._requestBodyBuffers = [];
          if (responseCallback) {
            this.on("response", responseCallback);
          }
          var self2 = this;
          this._onNativeResponse = function(response) {
            self2._processResponse(response);
          };
          this._performRequest();
        }
        RedirectableRequest.prototype = Object.create(Writable.prototype);
        RedirectableRequest.prototype.write = function(data, encoding, callback) {
          if (this._ending) {
            throw new WriteAfterEndError();
          }
          if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
            throw new TypeError("data should be a string, Buffer or Uint8Array");
          }
          if (typeof encoding === "function") {
            callback = encoding;
            encoding = null;
          }
          if (data.length === 0) {
            if (callback) {
              callback();
            }
            return;
          }
          if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
            this._requestBodyLength += data.length;
            this._requestBodyBuffers.push({ data, encoding });
            this._currentRequest.write(data, encoding, callback);
          } else {
            this.emit("error", new MaxBodyLengthExceededError());
            this.abort();
          }
        };
        RedirectableRequest.prototype.end = function(data, encoding, callback) {
          if (typeof data === "function") {
            callback = data;
            data = encoding = null;
          } else if (typeof encoding === "function") {
            callback = encoding;
            encoding = null;
          }
          if (!data) {
            this._ended = this._ending = true;
            this._currentRequest.end(null, null, callback);
          } else {
            var self2 = this;
            var currentRequest = this._currentRequest;
            this.write(data, encoding, function() {
              self2._ended = true;
              currentRequest.end(null, null, callback);
            });
            this._ending = true;
          }
        };
        RedirectableRequest.prototype.setHeader = function(name, value) {
          this._options.headers[name] = value;
          this._currentRequest.setHeader(name, value);
        };
        RedirectableRequest.prototype.removeHeader = function(name) {
          delete this._options.headers[name];
          this._currentRequest.removeHeader(name);
        };
        RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
          if (callback) {
            this.once("timeout", callback);
          }
          if (this.socket) {
            startTimer(this, msecs);
          } else {
            var self2 = this;
            this._currentRequest.once("socket", function() {
              startTimer(self2, msecs);
            });
          }
          this.once("response", clearTimer);
          this.once("error", clearTimer);
          return this;
        };
        function startTimer(request, msecs) {
          clearTimeout(request._timeout);
          request._timeout = setTimeout(function() {
            request.emit("timeout");
          }, msecs);
        }
        function clearTimer() {
          clearTimeout(this._timeout);
        }
        [
          "abort",
          "flushHeaders",
          "getHeader",
          "setNoDelay",
          "setSocketKeepAlive"
        ].forEach(function(method) {
          RedirectableRequest.prototype[method] = function(a, b) {
            return this._currentRequest[method](a, b);
          };
        });
        ["aborted", "connection", "socket"].forEach(function(property) {
          Object.defineProperty(RedirectableRequest.prototype, property, {
            get: function() {
              return this._currentRequest[property];
            }
          });
        });
        RedirectableRequest.prototype._sanitizeOptions = function(options) {
          if (!options.headers) {
            options.headers = {};
          }
          if (options.host) {
            if (!options.hostname) {
              options.hostname = options.host;
            }
            delete options.host;
          }
          if (!options.pathname && options.path) {
            var searchPos = options.path.indexOf("?");
            if (searchPos < 0) {
              options.pathname = options.path;
            } else {
              options.pathname = options.path.substring(0, searchPos);
              options.search = options.path.substring(searchPos);
            }
          }
        };
        RedirectableRequest.prototype._performRequest = function() {
          var protocol = this._options.protocol;
          var nativeProtocol = this._options.nativeProtocols[protocol];
          if (!nativeProtocol) {
            this.emit("error", new TypeError("Unsupported protocol " + protocol));
            return;
          }
          if (this._options.agents) {
            var scheme = protocol.substr(0, protocol.length - 1);
            this._options.agent = this._options.agents[scheme];
          }
          var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
          this._currentUrl = url.format(this._options);
          request._redirectable = this;
          for (var event in eventHandlers) {
            if (event) {
              request.on(event, eventHandlers[event]);
            }
          }
          if (this._isRedirect) {
            var i = 0;
            var self2 = this;
            var buffers = this._requestBodyBuffers;
            (function writeNext(error) {
              if (request === self2._currentRequest) {
                if (error) {
                  self2.emit("error", error);
                } else if (i < buffers.length) {
                  var buffer = buffers[i++];
                  if (!request.finished) {
                    request.write(buffer.data, buffer.encoding, writeNext);
                  }
                } else if (self2._ended) {
                  request.end();
                }
              }
            })();
          }
        };
        RedirectableRequest.prototype._processResponse = function(response) {
          var statusCode = response.statusCode;
          if (this._options.trackRedirects) {
            this._redirects.push({
              url: this._currentUrl,
              headers: response.headers,
              statusCode
            });
          }
          var location = response.headers.location;
          if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
            this._currentRequest.removeAllListeners();
            this._currentRequest.on("error", noop);
            this._currentRequest.abort();
            response.destroy();
            if (++this._redirectCount > this._options.maxRedirects) {
              this.emit("error", new TooManyRedirectsError());
              return;
            }
            if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
              this._options.method = "GET";
              this._requestBodyBuffers = [];
              removeMatchingHeaders(/^content-/i, this._options.headers);
            }
            var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) || url.parse(this._currentUrl).hostname;
            var redirectUrl = url.resolve(this._currentUrl, location);
            debug("redirecting to", redirectUrl);
            this._isRedirect = true;
            var redirectUrlParts = url.parse(redirectUrl);
            Object.assign(this._options, redirectUrlParts);
            if (redirectUrlParts.hostname !== previousHostName) {
              removeMatchingHeaders(/^authorization$/i, this._options.headers);
            }
            if (typeof this._options.beforeRedirect === "function") {
              var responseDetails = { headers: response.headers };
              try {
                this._options.beforeRedirect.call(null, this._options, responseDetails);
              } catch (err) {
                this.emit("error", err);
                return;
              }
              this._sanitizeOptions(this._options);
            }
            try {
              this._performRequest();
            } catch (cause) {
              var error = new RedirectionError("Redirected request failed: " + cause.message);
              error.cause = cause;
              this.emit("error", error);
            }
          } else {
            response.responseUrl = this._currentUrl;
            response.redirects = this._redirects;
            this.emit("response", response);
            this._requestBodyBuffers = [];
          }
        };
        function wrap(protocols) {
          var exports3 = {
            maxRedirects: 21,
            maxBodyLength: 10 * 1024 * 1024
          };
          var nativeProtocols = {};
          Object.keys(protocols).forEach(function(scheme) {
            var protocol = scheme + ":";
            var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
            var wrappedProtocol = exports3[scheme] = Object.create(nativeProtocol);
            wrappedProtocol.request = function(input, options, callback) {
              if (typeof input === "string") {
                var urlStr = input;
                try {
                  input = urlToOptions(new URL(urlStr));
                } catch (err) {
                  input = url.parse(urlStr);
                }
              } else if (URL && input instanceof URL) {
                input = urlToOptions(input);
              } else {
                callback = options;
                options = input;
                input = { protocol };
              }
              if (typeof options === "function") {
                callback = options;
                options = null;
              }
              options = Object.assign({
                maxRedirects: exports3.maxRedirects,
                maxBodyLength: exports3.maxBodyLength
              }, input, options);
              options.nativeProtocols = nativeProtocols;
              assert.equal(options.protocol, protocol, "protocol mismatch");
              debug("options", options);
              return new RedirectableRequest(options, callback);
            };
            wrappedProtocol.get = function(input, options, callback) {
              var request = wrappedProtocol.request(input, options, callback);
              request.end();
              return request;
            };
          });
          return exports3;
        }
        function noop() {
        }
        function urlToOptions(urlObject) {
          var options = {
            protocol: urlObject.protocol,
            hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
            hash: urlObject.hash,
            search: urlObject.search,
            pathname: urlObject.pathname,
            path: urlObject.pathname + urlObject.search,
            href: urlObject.href
          };
          if (urlObject.port !== "") {
            options.port = Number(urlObject.port);
          }
          return options;
        }
        function removeMatchingHeaders(regex, headers) {
          var lastValue;
          for (var header in headers) {
            if (regex.test(header)) {
              lastValue = headers[header];
              delete headers[header];
            }
          }
          return lastValue;
        }
        function createErrorType(code, defaultMessage) {
          function CustomError(message) {
            Error.captureStackTrace(this, this.constructor);
            this.message = message || defaultMessage;
          }
          CustomError.prototype = new Error();
          CustomError.prototype.constructor = CustomError;
          CustomError.prototype.name = "Error [" + code + "]";
          CustomError.prototype.code = code;
          return CustomError;
        }
        module3.exports = wrap({ http, https });
        module3.exports.wrap = wrap;
      },
      "../node_modules/json-stringify-safe/stringify.js": function(module3, exports2) {
        exports2 = module3.exports = stringify;
        exports2.getSerialize = serializer;
        function stringify(obj, replacer, spaces, cycleReplacer) {
          return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
        }
        function serializer(replacer, cycleReplacer) {
          var stack = [], keys = [];
          if (cycleReplacer == null)
            cycleReplacer = function(key, value) {
              if (stack[0] === value)
                return "[Circular ~]";
              return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
            };
          return function(key, value) {
            if (stack.length > 0) {
              var thisPos = stack.indexOf(this);
              ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
              ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
              if (~stack.indexOf(value))
                value = cycleReplacer.call(this, key, value);
            } else
              stack.push(value);
            return replacer == null ? value : replacer.call(this, key, value);
          };
        }
      },
      "../node_modules/ms/index.js": function(module3, exports2) {
        var s = 1e3;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var y = d * 365.25;
        module3.exports = function(val, options) {
          options = options || {};
          var type = typeof val;
          if (type === "string" && val.length > 0) {
            return parse(val);
          } else if (type === "number" && isNaN(val) === false) {
            return options.long ? fmtLong(val) : fmtShort(val);
          }
          throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
        };
        function parse(str) {
          str = String(str);
          if (str.length > 100) {
            return;
          }
          var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
          if (!match) {
            return;
          }
          var n = parseFloat(match[1]);
          var type = (match[2] || "ms").toLowerCase();
          switch (type) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return n * y;
            case "days":
            case "day":
            case "d":
              return n * d;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return n * h;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return n * m;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return n * s;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return n;
            default:
              return void 0;
          }
        }
        function fmtShort(ms) {
          if (ms >= d) {
            return Math.round(ms / d) + "d";
          }
          if (ms >= h) {
            return Math.round(ms / h) + "h";
          }
          if (ms >= m) {
            return Math.round(ms / m) + "m";
          }
          if (ms >= s) {
            return Math.round(ms / s) + "s";
          }
          return ms + "ms";
        }
        function fmtLong(ms) {
          return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
        }
        function plural(ms, n, name) {
          if (ms < n) {
            return;
          }
          if (ms < n * 1.5) {
            return Math.floor(ms / n) + " " + name;
          }
          return Math.ceil(ms / n) + " " + name + "s";
        }
      },
      "../node_modules/qs/lib/formats.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var replace = String.prototype.replace;
        var percentTwenties = /%20/g;
        var util = __webpack_require__("../node_modules/qs/lib/utils.js");
        var Format = {
          RFC1738: "RFC1738",
          RFC3986: "RFC3986"
        };
        module3.exports = util.assign({
          "default": Format.RFC3986,
          formatters: {
            RFC1738: function(value) {
              return replace.call(value, percentTwenties, "+");
            },
            RFC3986: function(value) {
              return String(value);
            }
          }
        }, Format);
      },
      "../node_modules/qs/lib/index.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var stringify = __webpack_require__("../node_modules/qs/lib/stringify.js");
        var parse = __webpack_require__("../node_modules/qs/lib/parse.js");
        var formats = __webpack_require__("../node_modules/qs/lib/formats.js");
        module3.exports = {
          formats,
          parse,
          stringify
        };
      },
      "../node_modules/qs/lib/parse.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/qs/lib/utils.js");
        var has = Object.prototype.hasOwnProperty;
        var isArray = Array.isArray;
        var defaults = {
          allowDots: false,
          allowPrototypes: false,
          arrayLimit: 20,
          charset: "utf-8",
          charsetSentinel: false,
          comma: false,
          decoder: utils.decode,
          delimiter: "&",
          depth: 5,
          ignoreQueryPrefix: false,
          interpretNumericEntities: false,
          parameterLimit: 1e3,
          parseArrays: true,
          plainObjects: false,
          strictNullHandling: false
        };
        var interpretNumericEntities = function(str) {
          return str.replace(/&#(\d+);/g, function($0, numberStr) {
            return String.fromCharCode(parseInt(numberStr, 10));
          });
        };
        var parseArrayValue = function(val, options) {
          if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
            return val.split(",");
          }
          return val;
        };
        var isoSentinel = "utf8=%26%2310003%3B";
        var charsetSentinel = "utf8=%E2%9C%93";
        var parseValues = function parseQueryStringValues(str, options) {
          var obj = {};
          var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
          var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
          var parts = cleanStr.split(options.delimiter, limit);
          var skipIndex = -1;
          var i;
          var charset = options.charset;
          if (options.charsetSentinel) {
            for (i = 0; i < parts.length; ++i) {
              if (parts[i].indexOf("utf8=") === 0) {
                if (parts[i] === charsetSentinel) {
                  charset = "utf-8";
                } else if (parts[i] === isoSentinel) {
                  charset = "iso-8859-1";
                }
                skipIndex = i;
                i = parts.length;
              }
            }
          }
          for (i = 0; i < parts.length; ++i) {
            if (i === skipIndex) {
              continue;
            }
            var part = parts[i];
            var bracketEqualsPos = part.indexOf("]=");
            var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
            var key, val;
            if (pos === -1) {
              key = options.decoder(part, defaults.decoder, charset, "key");
              val = options.strictNullHandling ? null : "";
            } else {
              key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
              val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function(encodedVal) {
                return options.decoder(encodedVal, defaults.decoder, charset, "value");
              });
            }
            if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
              val = interpretNumericEntities(val);
            }
            if (part.indexOf("[]=") > -1) {
              val = isArray(val) ? [val] : val;
            }
            if (has.call(obj, key)) {
              obj[key] = utils.combine(obj[key], val);
            } else {
              obj[key] = val;
            }
          }
          return obj;
        };
        var parseObject = function(chain, val, options, valuesParsed) {
          var leaf = valuesParsed ? val : parseArrayValue(val, options);
          for (var i = chain.length - 1; i >= 0; --i) {
            var obj;
            var root = chain[i];
            if (root === "[]" && options.parseArrays) {
              obj = [].concat(leaf);
            } else {
              obj = options.plainObjects ? Object.create(null) : {};
              var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
              var index = parseInt(cleanRoot, 10);
              if (!options.parseArrays && cleanRoot === "") {
                obj = { 0: leaf };
              } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
                obj = [];
                obj[index] = leaf;
              } else {
                obj[cleanRoot] = leaf;
              }
            }
            leaf = obj;
          }
          return leaf;
        };
        var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
          if (!givenKey) {
            return;
          }
          var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
          var brackets = /(\[[^[\]]*])/;
          var child = /(\[[^[\]]*])/g;
          var segment = options.depth > 0 && brackets.exec(key);
          var parent = segment ? key.slice(0, segment.index) : key;
          var keys = [];
          if (parent) {
            if (!options.plainObjects && has.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                return;
              }
            }
            keys.push(parent);
          }
          var i = 0;
          while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
            i += 1;
            if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
              if (!options.allowPrototypes) {
                return;
              }
            }
            keys.push(segment[1]);
          }
          if (segment) {
            keys.push("[" + key.slice(segment.index) + "]");
          }
          return parseObject(keys, val, options, valuesParsed);
        };
        var normalizeParseOptions = function normalizeParseOptions2(opts) {
          if (!opts) {
            return defaults;
          }
          if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
            throw new TypeError("Decoder has to be a function.");
          }
          if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
            throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
          }
          var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
          return {
            allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
            allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
            arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
            charset,
            charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
            comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
            decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
            delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
            depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
            ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
            interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
            parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
            parseArrays: opts.parseArrays !== false,
            plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
            strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
          };
        };
        module3.exports = function(str, opts) {
          var options = normalizeParseOptions(opts);
          if (str === "" || str === null || typeof str === "undefined") {
            return options.plainObjects ? Object.create(null) : {};
          }
          var tempObj = typeof str === "string" ? parseValues(str, options) : str;
          var obj = options.plainObjects ? Object.create(null) : {};
          var keys = Object.keys(tempObj);
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
            obj = utils.merge(obj, newObj, options);
          }
          return utils.compact(obj);
        };
      },
      "../node_modules/qs/lib/stringify.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var utils = __webpack_require__("../node_modules/qs/lib/utils.js");
        var formats = __webpack_require__("../node_modules/qs/lib/formats.js");
        var has = Object.prototype.hasOwnProperty;
        var arrayPrefixGenerators = {
          brackets: function brackets(prefix) {
            return prefix + "[]";
          },
          comma: "comma",
          indices: function indices(prefix, key) {
            return prefix + "[" + key + "]";
          },
          repeat: function repeat(prefix) {
            return prefix;
          }
        };
        var isArray = Array.isArray;
        var push = Array.prototype.push;
        var pushToArray = function(arr, valueOrArray) {
          push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
        };
        var toISO = Date.prototype.toISOString;
        var defaultFormat = formats["default"];
        var defaults = {
          addQueryPrefix: false,
          allowDots: false,
          charset: "utf-8",
          charsetSentinel: false,
          delimiter: "&",
          encode: true,
          encoder: utils.encode,
          encodeValuesOnly: false,
          format: defaultFormat,
          formatter: formats.formatters[defaultFormat],
          indices: false,
          serializeDate: function serializeDate(date) {
            return toISO.call(date);
          },
          skipNulls: false,
          strictNullHandling: false
        };
        var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
          return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
        };
        var stringify = function stringify2(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
          var obj = object;
          if (typeof filter === "function") {
            obj = filter(prefix, obj);
          } else if (obj instanceof Date) {
            obj = serializeDate(obj);
          } else if (generateArrayPrefix === "comma" && isArray(obj)) {
            obj = utils.maybeMap(obj, function(value2) {
              if (value2 instanceof Date) {
                return serializeDate(value2);
              }
              return value2;
            }).join(",");
          }
          if (obj === null) {
            if (strictNullHandling) {
              return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key") : prefix;
            }
            obj = "";
          }
          if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
            if (encoder) {
              var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key");
              return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value"))];
            }
            return [formatter(prefix) + "=" + formatter(String(obj))];
          }
          var values = [];
          if (typeof obj === "undefined") {
            return values;
          }
          var objKeys;
          if (isArray(filter)) {
            objKeys = filter;
          } else {
            var keys = Object.keys(obj);
            objKeys = sort ? keys.sort(sort) : keys;
          }
          for (var i = 0; i < objKeys.length; ++i) {
            var key = objKeys[i];
            var value = obj[key];
            if (skipNulls && value === null) {
              continue;
            }
            var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? "." + key : "[" + key + "]");
            pushToArray(values, stringify2(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
          }
          return values;
        };
        var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
          if (!opts) {
            return defaults;
          }
          if (opts.encoder !== null && opts.encoder !== void 0 && typeof opts.encoder !== "function") {
            throw new TypeError("Encoder has to be a function.");
          }
          var charset = opts.charset || defaults.charset;
          if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
            throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
          }
          var format = formats["default"];
          if (typeof opts.format !== "undefined") {
            if (!has.call(formats.formatters, opts.format)) {
              throw new TypeError("Unknown format option provided.");
            }
            format = opts.format;
          }
          var formatter = formats.formatters[format];
          var filter = defaults.filter;
          if (typeof opts.filter === "function" || isArray(opts.filter)) {
            filter = opts.filter;
          }
          return {
            addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
            allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
            charset,
            charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
            delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
            encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
            encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
            encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
            filter,
            formatter,
            serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
            skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
            sort: typeof opts.sort === "function" ? opts.sort : null,
            strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
          };
        };
        module3.exports = function(object, opts) {
          var obj = object;
          var options = normalizeStringifyOptions(opts);
          var objKeys;
          var filter;
          if (typeof options.filter === "function") {
            filter = options.filter;
            obj = filter("", obj);
          } else if (isArray(options.filter)) {
            filter = options.filter;
            objKeys = filter;
          }
          var keys = [];
          if (typeof obj !== "object" || obj === null) {
            return "";
          }
          var arrayFormat;
          if (opts && opts.arrayFormat in arrayPrefixGenerators) {
            arrayFormat = opts.arrayFormat;
          } else if (opts && "indices" in opts) {
            arrayFormat = opts.indices ? "indices" : "repeat";
          } else {
            arrayFormat = "indices";
          }
          var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
          if (!objKeys) {
            objKeys = Object.keys(obj);
          }
          if (options.sort) {
            objKeys.sort(options.sort);
          }
          for (var i = 0; i < objKeys.length; ++i) {
            var key = objKeys[i];
            if (options.skipNulls && obj[key] === null) {
              continue;
            }
            pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
          }
          var joined = keys.join(options.delimiter);
          var prefix = options.addQueryPrefix === true ? "?" : "";
          if (options.charsetSentinel) {
            if (options.charset === "iso-8859-1") {
              prefix += "utf8=%26%2310003%3B&";
            } else {
              prefix += "utf8=%E2%9C%93&";
            }
          }
          return joined.length > 0 ? prefix + joined : "";
        };
      },
      "../node_modules/qs/lib/utils.js": function(module3, exports2, __webpack_require__) {
        "use strict";
        var has = Object.prototype.hasOwnProperty;
        var isArray = Array.isArray;
        var hexTable = function() {
          var array = [];
          for (var i = 0; i < 256; ++i) {
            array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
          }
          return array;
        }();
        var compactQueue = function compactQueue2(queue) {
          while (queue.length > 1) {
            var item = queue.pop();
            var obj = item.obj[item.prop];
            if (isArray(obj)) {
              var compacted = [];
              for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== "undefined") {
                  compacted.push(obj[j]);
                }
              }
              item.obj[item.prop] = compacted;
            }
          }
        };
        var arrayToObject = function arrayToObject2(source, options) {
          var obj = options && options.plainObjects ? Object.create(null) : {};
          for (var i = 0; i < source.length; ++i) {
            if (typeof source[i] !== "undefined") {
              obj[i] = source[i];
            }
          }
          return obj;
        };
        var merge = function merge2(target, source, options) {
          if (!source) {
            return target;
          }
          if (typeof source !== "object") {
            if (isArray(target)) {
              target.push(source);
            } else if (target && typeof target === "object") {
              if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
                target[source] = true;
              }
            } else {
              return [target, source];
            }
            return target;
          }
          if (!target || typeof target !== "object") {
            return [target].concat(source);
          }
          var mergeTarget = target;
          if (isArray(target) && !isArray(source)) {
            mergeTarget = arrayToObject(target, options);
          }
          if (isArray(target) && isArray(source)) {
            source.forEach(function(item, i) {
              if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
                  target[i] = merge2(targetItem, item, options);
                } else {
                  target.push(item);
                }
              } else {
                target[i] = item;
              }
            });
            return target;
          }
          return Object.keys(source).reduce(function(acc, key) {
            var value = source[key];
            if (has.call(acc, key)) {
              acc[key] = merge2(acc[key], value, options);
            } else {
              acc[key] = value;
            }
            return acc;
          }, mergeTarget);
        };
        var assign = function assignSingleSource(target, source) {
          return Object.keys(source).reduce(function(acc, key) {
            acc[key] = source[key];
            return acc;
          }, target);
        };
        var decode = function(str, decoder, charset) {
          var strWithoutPlus = str.replace(/\+/g, " ");
          if (charset === "iso-8859-1") {
            return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
          }
          try {
            return decodeURIComponent(strWithoutPlus);
          } catch (e) {
            return strWithoutPlus;
          }
        };
        var encode = function encode2(str, defaultEncoder, charset) {
          if (str.length === 0) {
            return str;
          }
          var string = str;
          if (typeof str === "symbol") {
            string = Symbol.prototype.toString.call(str);
          } else if (typeof str !== "string") {
            string = String(str);
          }
          if (charset === "iso-8859-1") {
            return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
              return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
            });
          }
          var out = "";
          for (var i = 0; i < string.length; ++i) {
            var c = string.charCodeAt(i);
            if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122) {
              out += string.charAt(i);
              continue;
            }
            if (c < 128) {
              out = out + hexTable[c];
              continue;
            }
            if (c < 2048) {
              out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
              continue;
            }
            if (c < 55296 || c >= 57344) {
              out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
              continue;
            }
            i += 1;
            c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
            out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          }
          return out;
        };
        var compact = function compact2(value) {
          var queue = [{ obj: { o: value }, prop: "o" }];
          var refs = [];
          for (var i = 0; i < queue.length; ++i) {
            var item = queue[i];
            var obj = item.obj[item.prop];
            var keys = Object.keys(obj);
            for (var j = 0; j < keys.length; ++j) {
              var key = keys[j];
              var val = obj[key];
              if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj, prop: key });
                refs.push(val);
              }
            }
          }
          compactQueue(queue);
          return value;
        };
        var isRegExp = function isRegExp2(obj) {
          return Object.prototype.toString.call(obj) === "[object RegExp]";
        };
        var isBuffer = function isBuffer2(obj) {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
        };
        var combine = function combine2(a, b) {
          return [].concat(a, b);
        };
        var maybeMap = function maybeMap2(val, fn) {
          if (isArray(val)) {
            var mapped = [];
            for (var i = 0; i < val.length; i += 1) {
              mapped.push(fn(val[i]));
            }
            return mapped;
          }
          return fn(val);
        };
        module3.exports = {
          arrayToObject,
          assign,
          combine,
          compact,
          decode,
          encode,
          isBuffer,
          isRegExp,
          maybeMap,
          merge
        };
      },
      "./contentful.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "createClient", function() {
          return createClient;
        });
        var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/axios/index.js");
        var axios__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        var _create_contentful_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./create-contentful-api.js");
        var _create_global_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./create-global-options.js");
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function createClient(params) {
          if (!params.accessToken) {
            throw new TypeError("Expected parameter accessToken");
          }
          if (!params.space) {
            throw new TypeError("Expected parameter space");
          }
          const defaultConfig = {
            resolveLinks: true,
            removeUnresolved: false,
            defaultHostname: "cdn.contentful.com",
            environment: "master"
          };
          const config = _objectSpread(_objectSpread({}, defaultConfig), params);
          const userAgentHeader = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["getUserAgentHeader"])(`contentful.js/${"8.2.0"}`, config.application, config.integration);
          config.headers = _objectSpread(_objectSpread({}, config.headers), {}, {
            "Content-Type": "application/vnd.contentful.delivery.v1+json",
            "X-Contentful-User-Agent": userAgentHeader
          });
          const http = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createHttpClient"])(axios__WEBPACK_IMPORTED_MODULE_0___default.a, config);
          const getGlobalOptions = Object(_create_global_options__WEBPACK_IMPORTED_MODULE_3__["default"])({
            resolveLinks: config.resolveLinks,
            environment: config.environment,
            removeUnresolved: config.removeUnresolved,
            spaceBaseUrl: http.defaults.baseURL,
            environmentBaseUrl: `${http.defaults.baseURL}environments/${config.environment}`
          });
          http.defaults.baseURL = getGlobalOptions().environmentBaseUrl;
          obscureAuthTokenInResponse(http);
          return Object(_create_contentful_api__WEBPACK_IMPORTED_MODULE_2__["default"])({
            http,
            getGlobalOptions
          });
        }
        function obscureAuthTokenInResponse(http) {
          http.interceptors.response.use((response) => {
            return response;
          }, (error) => {
            if (error.response && error.response.config.headers.Authorization) {
              const token = error.response.config.headers.Authorization;
              error.response.config.headers.Authorization = error.response.config.headers.Authorization.replace(token, `Bearer...${token.substr(-5)}`);
              if (error.response.request._headers && error.response.request._headers.authorization) {
                error.response.request._headers.authorization = error.response.request._headers.authorization.replace(token, `Bearer...${token.substr(-5)}`);
              }
              if (error.response.request._header) {
                error.response.request._header = error.response.request._header.replace(token, `Bearer...${token.substr(-5)}`);
              }
            }
            return Promise.reject(error);
          });
        }
      },
      "./create-contentful-api.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "default", function() {
          return createContentfulApi;
        });
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./entities/index.js");
        var _paged_sync__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./paged-sync.js");
        var _utils_normalize_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./utils/normalize-select.js");
        var _utils_validate_timestamp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./utils/validate-timestamp.js");
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        const ASSET_KEY_MAX_LIFETIME = 48 * 60 * 60;
        function createContentfulApi({
          http,
          getGlobalOptions
        }) {
          const {
            wrapSpace
          } = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].space;
          const {
            wrapContentType,
            wrapContentTypeCollection
          } = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].contentType;
          const {
            wrapEntry,
            wrapEntryCollection
          } = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].entry;
          const {
            wrapAsset,
            wrapAssetCollection
          } = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].asset;
          const {
            wrapAssetKey
          } = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].assetKey;
          const {
            wrapLocaleCollection
          } = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].locale;
          const notFoundError = (id) => {
            const error = new Error("The resource could not be found.");
            error.sys = {
              type: "Error",
              id: "NotFound"
            };
            error.details = {
              type: "Entry",
              id,
              environment: getGlobalOptions().environment,
              space: getGlobalOptions().space
            };
            return error;
          };
          function errorHandler(error) {
            if (error.data) {
              throw error.data;
            }
            if (error.response && error.response.data) {
              throw error.response.data;
            }
            throw error;
          }
          async function getSpace() {
            switchToSpace(http);
            try {
              const response = await http.get("");
              return wrapSpace(response.data);
            } catch (error) {
              errorHandler(error);
            }
          }
          async function getContentType(id) {
            switchToEnvironment(http);
            try {
              const response = await http.get(`content_types/${id}`);
              return wrapContentType(response.data);
            } catch (error) {
              errorHandler(error);
            }
          }
          async function getContentTypes(query = {}) {
            switchToEnvironment(http);
            try {
              const response = await http.get("content_types", Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
                query
              }));
              return wrapContentTypeCollection(response.data);
            } catch (error) {
              errorHandler(error);
            }
          }
          async function getEntry(id, query = {}) {
            if (!id) {
              throw notFoundError(id);
            }
            try {
              const response = await this.getEntries(_objectSpread({
                "sys.id": id
              }, query));
              if (response.items.length > 0) {
                return wrapEntry(response.items[0]);
              } else {
                throw notFoundError(id);
              }
            } catch (error) {
              errorHandler(error);
            }
          }
          async function getEntries(query = {}) {
            switchToEnvironment(http);
            const {
              resolveLinks,
              removeUnresolved
            } = getGlobalOptions(query);
            query = Object(_utils_normalize_select__WEBPACK_IMPORTED_MODULE_3__["default"])(query);
            try {
              const response = await http.get("entries", Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
                query
              }));
              return wrapEntryCollection(response.data, {
                resolveLinks,
                removeUnresolved
              });
            } catch (error) {
              errorHandler(error);
            }
          }
          async function getAsset(id, query = {}) {
            switchToEnvironment(http);
            query = Object(_utils_normalize_select__WEBPACK_IMPORTED_MODULE_3__["default"])(query);
            try {
              const response = await http.get(`assets/${id}`, Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
                query
              }));
              return wrapAsset(response.data);
            } catch (error) {
              errorHandler(error);
            }
          }
          async function getAssets(query = {}) {
            switchToEnvironment(http);
            query = Object(_utils_normalize_select__WEBPACK_IMPORTED_MODULE_3__["default"])(query);
            try {
              const response = await http.get("assets", Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
                query
              }));
              return wrapAssetCollection(response.data);
            } catch (error) {
              errorHandler(error);
            }
          }
          async function createAssetKey(expiresAt) {
            switchToEnvironment(http);
            try {
              const now = Math.floor(Date.now() / 1e3);
              const currentMaxLifetime = now + ASSET_KEY_MAX_LIFETIME;
              Object(_utils_validate_timestamp__WEBPACK_IMPORTED_MODULE_4__["default"])("expiresAt", expiresAt, {
                maximum: currentMaxLifetime,
                now
              });
              const params = {
                expiresAt
              };
              const response = await http.post("asset_keys", params);
              return wrapAssetKey(response.data);
            } catch (error) {
              errorHandler(error);
            }
          }
          async function getLocales(query = {}) {
            switchToEnvironment(http);
            try {
              const response = await http.get("locales", Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
                query
              }));
              return wrapLocaleCollection(response.data);
            } catch (error) {
              errorHandler(error);
            }
          }
          async function sync(query = {}, options = {
            paginate: true
          }) {
            const {
              resolveLinks,
              removeUnresolved
            } = getGlobalOptions(query);
            switchToEnvironment(http);
            return Object(_paged_sync__WEBPACK_IMPORTED_MODULE_2__["default"])(http, query, _objectSpread({
              resolveLinks,
              removeUnresolved
            }, options));
          }
          function parseEntries(data) {
            const {
              resolveLinks,
              removeUnresolved
            } = getGlobalOptions({});
            return wrapEntryCollection(data, {
              resolveLinks,
              removeUnresolved
            });
          }
          function switchToEnvironment(http2) {
            http2.defaults.baseURL = getGlobalOptions().environmentBaseUrl;
          }
          function switchToSpace(http2) {
            http2.defaults.baseURL = getGlobalOptions().spaceBaseUrl;
          }
          return {
            getSpace,
            getContentType,
            getContentTypes,
            getEntry,
            getEntries,
            getAsset,
            getAssets,
            createAssetKey,
            getLocales,
            parseEntries,
            sync
          };
        }
      },
      "./create-global-options.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "default", function() {
          return createGlobalOptions;
        });
        function createGlobalOptions(globalSettings) {
          return function getGlobalOptions(query) {
            return Object.assign({}, globalSettings, query);
          };
        }
      },
      "./entities/asset-key.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "wrapAssetKey", function() {
          return wrapAssetKey;
        });
        var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/fast-copy/dist/fast-copy.esm.js");
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        function wrapAssetKey(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
      },
      "./entities/asset.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "wrapAsset", function() {
          return wrapAsset;
        });
        __webpack_require__.d(__webpack_exports__, "wrapAssetCollection", function() {
          return wrapAssetCollection;
        });
        var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/fast-copy/dist/fast-copy.esm.js");
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        function wrapAsset(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
        function wrapAssetCollection(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
      },
      "./entities/content-type.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "wrapContentType", function() {
          return wrapContentType;
        });
        __webpack_require__.d(__webpack_exports__, "wrapContentTypeCollection", function() {
          return wrapContentTypeCollection;
        });
        var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/fast-copy/dist/fast-copy.esm.js");
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        function wrapContentType(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
        function wrapContentTypeCollection(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
      },
      "./entities/entry.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "wrapEntry", function() {
          return wrapEntry;
        });
        __webpack_require__.d(__webpack_exports__, "wrapEntryCollection", function() {
          return wrapEntryCollection;
        });
        var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/fast-copy/dist/fast-copy.esm.js");
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        var _mixins_stringify_safe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./mixins/stringify-safe.js");
        var contentful_resolve_response__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/contentful-resolve-response/dist/esm/index.js");
        function wrapEntry(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
        function wrapEntryCollection(data, {
          resolveLinks,
          removeUnresolved
        }) {
          const wrappedData = Object(_mixins_stringify_safe__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
          if (resolveLinks) {
            wrappedData.items = Object(contentful_resolve_response__WEBPACK_IMPORTED_MODULE_3__["default"])(wrappedData, {
              removeUnresolved,
              itemEntryPoints: ["fields"]
            });
          }
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(wrappedData);
        }
      },
      "./entities/index.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var _space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./entities/space.js");
        var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./entities/entry.js");
        var _asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./entities/asset.js");
        var _asset_key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./entities/asset-key.js");
        var _content_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./entities/content-type.js");
        var _locale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./entities/locale.js");
        __webpack_exports__["default"] = {
          space: _space__WEBPACK_IMPORTED_MODULE_0__,
          entry: _entry__WEBPACK_IMPORTED_MODULE_1__,
          asset: _asset__WEBPACK_IMPORTED_MODULE_2__,
          assetKey: _asset_key__WEBPACK_IMPORTED_MODULE_3__,
          contentType: _content_type__WEBPACK_IMPORTED_MODULE_4__,
          locale: _locale__WEBPACK_IMPORTED_MODULE_5__
        };
      },
      "./entities/locale.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "wrapLocale", function() {
          return wrapLocale;
        });
        __webpack_require__.d(__webpack_exports__, "wrapLocaleCollection", function() {
          return wrapLocaleCollection;
        });
        var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/fast-copy/dist/fast-copy.esm.js");
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        function wrapLocale(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
        function wrapLocaleCollection(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data)));
        }
      },
      "./entities/space.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "wrapSpace", function() {
          return wrapSpace;
        });
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        function wrapSpace(data) {
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(data));
        }
      },
      "./mixins/stringify-safe.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "default", function() {
          return mixinStringifySafe;
        });
        var json_stringify_safe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/json-stringify-safe/stringify.js");
        var json_stringify_safe__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__.n(json_stringify_safe__WEBPACK_IMPORTED_MODULE_0__);
        function mixinStringifySafe(data) {
          return Object.defineProperty(data, "stringifySafe", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function(serializer = null, indent = "") {
              return json_stringify_safe__WEBPACK_IMPORTED_MODULE_0___default()(this, serializer, indent, (key, value) => {
                return {
                  sys: {
                    type: "Link",
                    linkType: "Entry",
                    id: value.sys.id,
                    circular: true
                  }
                };
              });
            }
          });
        }
      },
      "./paged-sync.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "default", function() {
          return pagedSync;
        });
        var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/contentful-sdk-core/dist/index.es-modules.js");
        var contentful_resolve_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/contentful-resolve-response/dist/esm/index.js");
        var _mixins_stringify_safe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./mixins/stringify-safe.js");
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        async function pagedSync(http, query, options = {}) {
          if (!query || !query.initial && !query.nextSyncToken && !query.nextPageToken) {
            throw new Error("Please provide one of `initial`, `nextSyncToken` or `nextPageToken` parameters for syncing");
          }
          if (query && query.content_type && !query.type) {
            query.type = "Entry";
          } else if (query && query.content_type && query.type && query.type !== "Entry") {
            throw new Error("When using the `content_type` filter your `type` parameter cannot be different from `Entry`.");
          }
          const defaultOptions = {
            resolveLinks: true,
            removeUnresolved: false,
            paginate: true
          };
          const {
            resolveLinks,
            removeUnresolved,
            paginate
          } = _objectSpread(_objectSpread({}, defaultOptions), options);
          const syncOptions = {
            paginate
          };
          const response = await getSyncPage(http, [], query, syncOptions);
          if (resolveLinks) {
            response.items = Object(contentful_resolve_response__WEBPACK_IMPORTED_MODULE_1__["default"])(response, {
              removeUnresolved,
              itemEntryPoints: ["fields"]
            });
          }
          const mappedResponseItems = mapResponseItems(response.items);
          if (response.nextSyncToken) {
            mappedResponseItems.nextSyncToken = response.nextSyncToken;
          }
          if (response.nextPageToken) {
            mappedResponseItems.nextPageToken = response.nextPageToken;
          }
          return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(Object(_mixins_stringify_safe__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(mappedResponseItems)));
        }
        function mapResponseItems(items) {
          const reducer = (type) => {
            return (accumulated, item) => {
              if (item.sys.type === type) {
                accumulated.push(Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(item));
              }
              return accumulated;
            };
          };
          return {
            entries: items.reduce(reducer("Entry"), []),
            assets: items.reduce(reducer("Asset"), []),
            deletedEntries: items.reduce(reducer("DeletedEntry"), []),
            deletedAssets: items.reduce(reducer("DeletedAsset"), [])
          };
        }
        async function getSyncPage(http, items, query, {
          paginate
        }) {
          if (query.nextSyncToken) {
            query.sync_token = query.nextSyncToken;
            delete query.nextSyncToken;
          }
          if (query.nextPageToken) {
            query.sync_token = query.nextPageToken;
            delete query.nextPageToken;
          }
          if (query.sync_token) {
            delete query.initial;
            delete query.type;
            delete query.content_type;
            delete query.limit;
          }
          const response = await http.get("sync", Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }));
          const data = response.data || {};
          items = items.concat(data.items || []);
          if (data.nextPageUrl) {
            if (paginate) {
              delete query.initial;
              query.sync_token = getToken(data.nextPageUrl);
              return getSyncPage(http, items, query, {
                paginate
              });
            }
            return {
              items,
              nextPageToken: getToken(data.nextPageUrl)
            };
          } else if (data.nextSyncUrl) {
            return {
              items,
              nextSyncToken: getToken(data.nextSyncUrl)
            };
          } else {
            return {
              items: []
            };
          }
        }
        function getToken(url) {
          const urlParts = url.split("?");
          return urlParts.length > 0 ? urlParts[1].replace("sync_token=", "") : "";
        }
      },
      "./utils/normalize-select.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "default", function() {
          return normalizeSelect;
        });
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function normalizeSelect(query) {
          if (!query.select) {
            return query;
          }
          const allSelects = Array.isArray(query.select) ? query.select : query.select.split(",");
          const selectedSet = new Set(allSelects);
          if (selectedSet.has("sys")) {
            return query;
          }
          selectedSet.add("sys.id");
          selectedSet.add("sys.type");
          return _objectSpread(_objectSpread({}, query), {}, {
            select: [...selectedSet].join(",")
          });
        }
      },
      "./utils/validate-timestamp.js": function(module3, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "ValidationError", function() {
          return ValidationError;
        });
        __webpack_require__.d(__webpack_exports__, "default", function() {
          return validateTimestamp;
        });
        class ValidationError extends Error {
          constructor(name, message) {
            super(`Invalid "${name}" provided, ` + message);
            this.name = "ValidationError";
          }
        }
        function validateTimestamp(name, timestamp, options) {
          options = options || {};
          if (typeof timestamp !== "number") {
            throw new ValidationError(name, `only numeric values are allowed for timestamps, provided type was "${typeof timestamp}"`);
          }
          if (options.maximum && timestamp > options.maximum) {
            throw new ValidationError(name, `value (${timestamp}) cannot be further in the future than expected maximum (${options.maximum})`);
          }
          if (options.now && timestamp < options.now) {
            throw new ValidationError(name, `value (${timestamp}) cannot be in the past, current time was ${options.now}`);
          }
        }
      },
      0: function(module3, exports2, __webpack_require__) {
        module3.exports = __webpack_require__("./contentful.js");
      },
      "assert": function(module3, exports2) {
        module3.exports = require("assert");
      },
      "fs": function(module3, exports2) {
        module3.exports = require("fs");
      },
      "http": function(module3, exports2) {
        module3.exports = require("http");
      },
      "https": function(module3, exports2) {
        module3.exports = require("https");
      },
      "net": function(module3, exports2) {
        module3.exports = require("net");
      },
      "os": function(module3, exports2) {
        module3.exports = require("os");
      },
      "stream": function(module3, exports2) {
        module3.exports = require("stream");
      },
      "tty": function(module3, exports2) {
        module3.exports = require("tty");
      },
      "url": function(module3, exports2) {
        module3.exports = require("url");
      },
      "util": function(module3, exports2) {
        module3.exports = require("util");
      },
      "zlib": function(module3, exports2) {
        module3.exports = require("zlib");
      }
    });
  }
});

// plugins/contentful.js
var require_contentful = __commonJS({
  "plugins/contentful.js"(exports, module2) {
    var contentful = require_contentful_node();
    module2.exports = contentful.createClient({
      space: process.env.CONTENT_SPACE,
      accessToken: process.env.CONTENT_ACCESS_TOKEN,
      host: "preview.contentful.com"
    });
  }
});

// functions/banners.js
__export(exports, {
  handler: () => handler
});
var import_contentful = __toModule(require_contentful());
async function handler(event, context, callback) {
  if (event.httpMethod === "OPTIONS") {
    return callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  if (event.httpMethod !== "GET") {
    return callback(null, {
      statusCode: 400,
      errorMessage: "Method not found."
    });
  }
  try {
    const response = await import_contentful.default.getEntries({
      content_type: "banners"
    });
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    });
  } catch (error) {
    return callback(null, {
      statusCode: 500,
      body: error.body
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=banners.js.map
