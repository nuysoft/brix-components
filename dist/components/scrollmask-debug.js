(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("components/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "components/base"], factory);
	else if(typeof exports === 'object')
		exports["components/scrollmask"] = factory(require("jquery"), require("underscore"), require("components/base"));
	else
		root["components/scrollmask"] = factory(root["jquery"], root["underscore"], root["components/base"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, clearTimeout, setTimeout */

	/**
	 * 给有滚动条出现的容器加上简单的阴影遮罩
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2), __webpack_require__(3),
	  __webpack_require__(4)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	  $, _,
	  Brix) {

	  function ScrollMask() {
	    if (arguments.length) {
	      this.element = $(arguments[0])
	      this.options = _.extend(this.options, arguments[1])
	    }
	  }
	  _.extend(ScrollMask.prototype, Brix.prototype, {

	    options: {

	    },
	    render: function() {
	      var current = $(this.element)

	      function maskShowHide(c, m) {
	        c = $(c)
	          // var _this = current[0];
	        if (c.scrollTop() === 0) {
	          m.hide();
	        } else {
	          m.show();
	        }
	      }

	      var mask = $('<div class="linear-mask"></div>');
	      var container = $('<div class="scroll-mask-wrap"></div>');
	      var t;
	      var self = current;

	      container.insertBefore(self);
	      container.append(mask).append(self);

	      maskShowHide(self, mask);

	      $(self).on('scroll', function() {
	        clearTimeout(t);
	        t = setTimeout(function() {
	          maskShowHide(self, mask);
	        }, 10);
	      });
	    },

	    destroy: function() {

	    }
	  })

	  return ScrollMask
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;