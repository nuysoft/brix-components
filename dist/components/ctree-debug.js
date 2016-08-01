(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/loader"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/loader", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/ctree"] = factory(require("jquery"), require("underscore"), require("brix/loader"), require("brix/base"));
	else
		root["components/ctree"] = factory(root["jquery"], root["underscore"], root["brix/loader"], root["brix/base"]);
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
	    var Loader = require('brix/loader')
	    var tree = Loader.query('components/ctree')
	    tree[0].render()
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5),
	        __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Loader, Brix,
	        template
	    ) {
	        /*
	            ### 数据
	                {}
	            ### 选项
	                data template
	            ### 属性
	                element moduleId clientId parentClientId childClientIds data template
	            ### 方法
	                .render()
	            ### 事件
	                ready destroyed
	        */
	        function Tree() {}

	        _.extend(Tree.prototype, Brix.prototype, {
	            options: {},
	            render: function() {
	                var that = this
	                Loader.boot(function() {
	                    that._renderTree()
	                })
	            },
	            _renderTree: function() {
	                var $element = $(this.element).empty()
	                var root = Loader.tree()
	                fix(root, template)
	                $element.append(
	                    // _.template 如果递归？
	                    _.template(template)(root)
	                )
	            }
	        })

	        function fix(node, template) {
	            node.childrenFn = function() {
	                if (!this.children || !this.children.length) return ''
	                return _.template(template)(this)
	            }
	            _.each(node.children, function(item /*, index*/ ) {
	                fix(item, template)
	            })
	        }

	        return Tree
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<ul>\n" +
	        "    <% for(var i = 0, item; item = children[i]; i++ ) { %>\n" +
	        "        <li>\n" +
	        "            <strong title=\"moduleId\"> <%= item.module.moduleId %></strong>\n" +
	        "            -\n" +
	        "            <small title=\"clientId\"><%= item.module.clientId %></small>\n" +
	        "            <%= item.childrenFn() %>\n" +
	        "        </li>\n" +
	        "    <% } %>\n" +
	        "</ul>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;