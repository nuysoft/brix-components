(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/modal"] = factory(require("jquery"), require("underscore"), require("brix/base"), require("brix/event"));
	else
		root["components/modal"] = factory(root["jquery"], root["underscore"], root["brix/base"], root["brix/event"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, document, setTimeout */
	/*
	    http://zombiej.github.io/bootstrap-components-3.0/
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5),
	        __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix, EventManager,
	        template
	    ) {
	        var TRANSITION_DURATION = 150

	        return Brix.extend({
	            options: {
	                title: Math.random(),
	                body: Math.random()
	            },
	            init: function() {
	                this.$element = $(this.element)
	            },
	            render: function() {
	                var that = this
	                this.$manager = new EventManager('bx-')

	                var html = _.template(template)(this.options)
	                this.$relatedElement = $(html).insertAfter(this.$element)
	                this.$dialog = this.$relatedElement.find('.modal-dialog')

	                this.$backdropElement = $('.modal-backdrop')
	                if (!this.$backdropElement.length) {
	                    this.$backdropElement = $('<div class="modal-backdrop fade"></div>').hide()
	                        .appendTo(document.body)
	                }

	                this.$manager.delegate(this.$element, this)
	                this.$manager.delegate(this.$relatedElement, this)

	                // 显示对话框
	                this.$element.on('click', function() {
	                    that.show()
	                })

	                var type = 'keyup.modal_' + this.clientId
	                $(document.body).off(type)
	                    .on(type, function(event) {
	                        if (event.which === 27) that.hide()
	                    })
	            },
	            show: function() {
	                $(document.body).addClass('modal-open')

	                var that = this
	                this.$relatedElement.show()
	                this.$backdropElement.show()
	                setTimeout(function() {
	                    that.$relatedElement.addClass('in')
	                    that.$backdropElement.addClass('in')
	                }, TRANSITION_DURATION)
	            },
	            hide: function() {
	                $(document.body).removeClass('modal-open')

	                var that = this
	                this.$relatedElement.removeClass('in')
	                this.$backdropElement.removeClass('in')
	                setTimeout(function() {
	                    that.$relatedElement.hide()
	                    that.$backdropElement.hide()

	                }, TRANSITION_DURATION)
	            },
	            destroy: function() {
	                this.$manager.undelegate(this.$element)
	                this.$manager.undelegate(this.$relatedElement)

	                var type = 'keyup.modal_' + this.clientId
	                $(document.body).off(type)
	            }
	        })
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
	    return "<div class=\"modal fade\">\n" +
	        "    <div class=\"modal-dialog\">\n" +
	        "        <div class=\"modal-content\">\n" +
	        "            <div class=\"modal-header\">\n" +
	        "                <button bx-click=\"hide\" type=\"button\" class=\"close\">&times;</button>\n" +
	        "                <h4 class=\"modal-title\"><%= title %></h4>\n" +
	        "            </div>\n" +
	        "            <div class=\"modal-body\"><%= body %></div>\n" +
	        "            <div class=\"modal-footer\">\n" +
	        "                <button bx-click=\"hide\" type=\"button\" class=\"btn btn-default\">Close</button>\n" +
	        "                <button bx-click=\"hide\" type=\"button\" class=\"btn btn-primary\">Save</button>\n" +
	        "            </div>\n" +
	        "        </div>\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;