(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/base"), require("chartx/index"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/base", "chartx/index"], factory);
	else if(typeof exports === 'object')
		exports["components/chartxwrapper"] = factory(require("jquery"), require("underscore"), require("brix/base"), require("chartx/index"));
	else
		root["components/chartxwrapper"] = factory(root["jquery"], root["underscore"], root["brix/base"], root["chartx/index"]);
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
	/*
	    不方便之处：
	    1. 需要记忆 chartx/chart/line/index
	        > 可以作为参数传入
	    2. 通常不需要持有 line 实例
	        > 
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4),
	        __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix,
	        Chartx
	    ) {

	        function ChartxWrapper() {}

	        ChartxWrapper.Chartx = Chartx

	        _.extend(ChartxWrapper.prototype, Brix.prototype, {
	            options: {},
	            init: function() {
	                // 尝试从 innerText 中解析数据
	                /* jshint evil:true */
	                if (!this.options.data) {
	                    var text = $.trim(this.element.innerText)
	                    this.options.data = eval(
	                        '(function(){ return Array.prototype.slice.call(arguments)[0] })(' + text + ')'
	                    )
	                    this.element.innerText = ''
	                }
	            },
	            render: function() {
	                var that = this
	                window.require(['chartx/chart/' + this.options.type + '/index'], function(Chart) {
	                    var chart = new Chart(that.element, that.options.data, that.options.options)
	                    chart.draw()
	                        // chart.resize()
	                        // chart.reset()
	                        // window[that.options.type + 'chart'] = chart
	                        // $(window).on('resize', function() {
	                        //     chart.resize()
	                        // })

	                    that.chart = chart
	                })
	            }
	        })

	        return ChartxWrapper
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