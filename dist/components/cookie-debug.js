(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore"], factory);
	else if(typeof exports === 'object')
		exports["components/cookie"] = factory(require("underscore"));
	else
		root["components/cookie"] = factory(root["underscore"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * api文档：http://docs.kissyui.com/1.4/docs/html/api/cookie/index.html
	 */
	/* global define */
	/* jshint browser: true */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(2)
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function(_) {
	    var MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000;

	    function Cookie() {}

	    _.extend(Cookie.prototype, {
	      isNotEmptyString: function(val) {
	        return typeof val === "string" && val !== "";
	      },
	      decode: function(a) {
	        return decodeURIComponent(a.replace(/\+/g, " "));
	      },
	      get: function(name) {
	        var ret, m;
	        if (this.isNotEmptyString(name)) {
	          m = String(document.cookie).match(new RegExp("(?:^| )" + name + "(?:(?:=([^;]*))|;|$)"));
	          if (m) {
	            ret = m[1] ? this.decode(m[1]) : "";
	          }
	        }
	        return ret;
	      },
	      set: function(name, val, expires, domain, path, secure) {
	        var text = String(encodeURIComponent(val)),
	          date = expires;
	        if (typeof date === "number") {
	          date = new Date();
	          date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
	        }
	        if (date instanceof Date) {
	          text += "; expires=" + date.toUTCString();
	        }
	        if (this.isNotEmptyString(domain)) {
	          text += "; domain=" + domain;
	        }
	        if (this.isNotEmptyString(path)) {
	          text += "; path=" + path;
	        }
	        if (secure) {
	          text += "; secure";
	        }
	        document.cookie = name + "=" + text;
	      },
	      remove: function(name, domain, path, secure) {
	        this.set(name, "", -1, domain, path, secure);
	      }
	    });

	    return Cookie;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;