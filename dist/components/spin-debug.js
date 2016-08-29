(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/spin"] = factory(require("jquery"), require("underscore"), require("brix/base"));
	else
		root["components/spin"] = factory(root["jquery"], root["underscore"], root["brix/base"]);
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
	/*
	    http://thx.github.io/brix-site/readme.html?name=Spin
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/spin/
	        Temporary

	    # Spin

	    纯 CSS 加载动画。

	    ```html
	    <div bx-name="components/spin"></div>
	    ```

	    ## 配置

	    配置项 | 类型   | 默认值           | 说明
	    :----  | :----- | :--------------- | :----------
	    type   | string | `'three-bounce'` | 可选。指定加载动画的类型，可选值有：`rotating-plane`、`double-bounce`、`rectangle-bounce`、`wandering-cubes`、`pulse`、`chasing-dots`、`three-bounce`、`circle-spinner`。

	    ## Reference:
	    * [A collection of loading indicators animated with CSS](http://tobiasahlin.com/spinkit/)
	    * https://github.com/fgnass/spin.js
	    * http://css-spinners.com/#/spinners/
	    * http://pasqualevitiello.github.io/Tumblr-Style-Cog-Spinners/#
	    * [SpinKit](https://github.com/tobiasahlin/SpinKit)
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4),
	        __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix,
	        template
	    ) {
	        function Spin() {}

	        _.extend(Spin.prototype, Brix.prototype, {
	            options: {
	                type: 'three-bounce'
	            },
	            render: function() {
	                this.data = this.data || _.extend({}, this.options)
	                var html = _.template(template)(this.data)
	                $(this.element).addClass('spin').append(html)
	            }
	        })

	        return Spin
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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"spinner\">\n" +
	        "    <% if( type === 'rotating-plane' ) { %>\n" +
	        "        <div class=\"rotating-plane\"></div>\n" +
	        "    <% } %>\n" +
	        "    <% if( type === 'double-bounce' ) { %>\n" +
	        "        <div class=\"double-bounce\">\n" +
	        "            <div class=\"double-bounce1\"></div>\n" +
	        "            <div class=\"double-bounce2\"></div>    \n" +
	        "        </div>\n" +
	        "    <% } %>\n" +
	        "    <% if( type === 'rectangle-bounce' ) { %>\n" +
	        "        <div class=\"rectangle-bounce\">\n" +
	        "            <div class=\"rect1\"></div><div class=\"rect2\"></div><div class=\"rect3\"></div><div class=\"rect4\"></div><div class=\"rect5\"></div>\n" +
	        "        </div>\n" +
	        "    <% } %>\n" +
	        "    <% if( type === 'wandering-cubes' ) { %>\n" +
	        "        <div class=\"wandering-cubes\">\n" +
	        "            <div class=\"cube1\"></div><div class=\"cube2\"></div>\n" +
	        "        </div>\n" +
	        "    <% } %>\n" +
	        "    <% if( type === 'pulse' ) { %>\n" +
	        "        <div class=\"pulse\"></div>\n" +
	        "    <% } %>\n" +
	        "    <% if( type === 'chasing-dots' ) { %>\n" +
	        "        <div class=\"chasing-dots\">\n" +
	        "            <div class=\"dot1\"></div>\n" +
	        "            <div class=\"dot2\"></div>\n" +
	        "        </div>\n" +
	        "    <% } %>\n" +
	        "    <% if( type === 'three-bounce' ) { %>\n" +
	        "        <div class=\"three-bounce\">\n" +
	        "            <div class=\"one\"></div><div class=\"two\"></div><div class=\"three\"></div>\n" +
	        "        </div>\n" +
	        "    <% } %>\n" +
	        "    <% if( type === 'circle-spinner' ) { %>\n" +
	        "        <div class=\"circle-spinner\">\n" +
	        "            <div class=\"spinner-container container1\">\n" +
	        "                <div class=\"circle1\"></div>\n" +
	        "                <div class=\"circle2\"></div>\n" +
	        "                <div class=\"circle3\"></div>\n" +
	        "                <div class=\"circle4\"></div>\n" +
	        "            </div>\n" +
	        "            <div class=\"spinner-container container2\">\n" +
	        "                <div class=\"circle1\"></div>\n" +
	        "                <div class=\"circle2\"></div>\n" +
	        "                <div class=\"circle3\"></div>\n" +
	        "                <div class=\"circle4\"></div>\n" +
	        "            </div>\n" +
	        "            <div class=\"spinner-container container3\">\n" +
	        "                <div class=\"circle1\"></div>\n" +
	        "                <div class=\"circle2\"></div>\n" +
	        "                <div class=\"circle3\"></div>\n" +
	        "                <div class=\"circle4\"></div>\n" +
	        "            </div>\n" +
	        "        </div>\n" +
	        "    <% } %>\n" +
	        "</div>\n" +
	        ""
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;