(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/textcount"] = factory(require("jquery"), require("underscore"), require("brix/base"));
	else
		root["components/textcount"] = factory(root["jquery"], root["underscore"], root["brix/base"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2),
	        __webpack_require__(3),
	        __webpack_require__(4)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function($, _, Brix) {

	        function TextCount() {}

	        _.extend(TextCount.prototype, Brix.prototype, {
	            init: function() {
	                var that = this
	                var $element = $(that.element)

	                if ($element) {
	                    var $input = $(that.options.input)
	                    $element.html(that._countResult($input.val()))

	                    $input.on('keyup', function() {
	                        $element.html(that._countResult($input.val()));
	                    });
	                }
	            },
	            count: function(str) {
	                var _str = str.replace(/[\u4e00-\u9fa5]/g, '*')
	                return _str.length
	            },
	            _countResult: function(str) {
	                var len = this.count(str)
	                var count = this.options.count
	                var pre = len
	                if (len > count) {
	                    pre = '<em class="textcount-error">' + len + '</em>'
	                }
	                return pre + '/' + count
	            }
	        })

	        return TextCount
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