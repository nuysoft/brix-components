(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("handlebars"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "handlebars", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/footer"] = factory(require("jquery"), require("underscore"), require("handlebars"), require("brix/base"));
	else
		root["components/footer"] = factory(root["jquery"], root["underscore"], root["handlebars"], root["brix/base"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
	        __webpack_require__(4),
	        __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, 
	        _,
	        Handlebars,
	        Brix
	    ) {
	        function Footer() {}

	        _.extend(Footer.prototype, Brix.prototype, {
	            options: {
	                mode: 'normal'
	            },
	            render: function() {
	                var that = this

	                // 兼容老的type参数
	                if (this.options.type) {
	                    this.options.mode = {
	                        front: 'normal',
	                        back: 'simple'
	                    }[this.options.type]
	                }

	                var simple = this.options.mode === 'simple'
	                var alimamaReg = /alimama\.(com|net)/i
	                var tanxReg = /tanx\.(com|net)/i
	                var taobaoReg = /taobao\.(com|net)/i
	                var alimama, taobao, tanx

	                if (alimamaReg.test(window.location.href)) {
	                    alimama = true
	                } else if (taobaoReg.test(window.location.href)) {
	                    taobao = true
	                } else if (tanxReg.test(window.location.href)) {
	                    tanx = true
	                } else {
	                    alimama = true
	                }

	                $.ajax({
	                    url: '//mo.m.taobao.com/union/jsonp/footer',
	                    dataType: 'jsonp',
	                    jsonp: 'callback',
	                    success: function(resp) {
	                        $(that.element).html(Handlebars.compile(resp.html)({
	                            simple: simple,
	                            alimama: alimama,
	                            taobao: taobao,
	                            tanx: tanx
	                        }))
	                    }
	                })
	            }
	        })

	        return Footer
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;