(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("components/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "components/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/wizard"] = factory(require("jquery"), require("underscore"), require("components/base"), require("brix/event"));
	else
		root["components/wizard"] = factory(root["jquery"], root["underscore"], root["components/base"], root["brix/event"]);
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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	    https://github.com/amoffat/bootstrap-application-wizard
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix, EventManager
	    ) {
	        var ANIMATIONEND = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

	        function Wizard() {}

	        _.extend(Wizard.prototype, Brix.prototype, {
	            options: {
	                cursor: 0,
	                total: 3,
	                horizontal: true, // 水平
	                vertical: false // 垂直
	            },
	            init: function() {
	                this.$element = $(this.element)
	                if (this.$element.hasClass('wizard-vertical')) {
	                    this.options.horizontal = false
	                    this.options.vertical = true
	                }
	            },
	            render: function() {
	                var manager = new EventManager()

	                this.data = this.data || _.extend({}, this.options)
	                    // var html = _.template(template)(this.data)
	                    // $(this.element).append(html)

	                manager.delegate(this.element, this)

	                this.move(undefined, 0)
	            },
	            move: function(event, dir) { /* jshint unused:false */
	                if (this.options.horizontal) { // 水平
	                    var cursor = this.options.cursor
	                    var total = this.options.total
	                    var newCursor = (cursor + dir) % this.options.total

	                    // wizard-nav
	                    var lis = $('ol.wizard-nav li.item', this.element)
	                    lis.removeClass('active').removeClass('bx-trans-steps-on')
	                        .eq(newCursor).addClass('active').addClass('bx-trans-steps-on')
	                    if (cursor < newCursor) lis.eq(cursor).addClass('resolved')

	                    // wizard-cards
	                    var cards = $('.wizard-cards .wizard-card', this.element).hide()
	                    var card = cards.eq(cursor).show()
	                    var newCard = cards.eq(newCursor).show()
	                    var cardClass = cursor == newCursor ? '' :
	                        cursor < newCursor ? 'out bx-anim-fade-out-left' :
	                        'out bx-anim-fade-out-right'
	                    var newCardClass = cursor == newCursor ? '' :
	                        cursor < newCursor ? 'bx-anim-fade-in-left' :
	                        'bx-anim-fade-in-right'

	                    card.addClass(cardClass)
	                    if (cursor != newCursor) {
	                        card.one(ANIMATIONEND, function(event) {
	                            $(event.target).removeClass(cardClass).hide()
	                        })
	                    }
	                    newCard.addClass(newCardClass)
	                        .one(ANIMATIONEND, function(event) {
	                            $(event.target).removeClass(newCardClass)
	                        })

	                    // wizard-footer
	                    var next = $('.wizard-next', this.element)
	                    var back = $('.wizard-back', this.element)
	                    next.html(newCursor === total - 2 ? '完成' : '下一步')
	                    next[(newCursor === total - 1) ? 'hide' : 'show']()
	                    back[(newCursor === 0 || newCursor === total - 1) ? 'hide' : 'show']()

	                    this.options.cursor = newCursor
	                }

	                return this
	            },
	            next: function(event) {
	                if (this.options.horizontal) { // 水平
	                    this.move(event, 1)
	                }

	                if (this.options.vertical) { // 垂直
	                    $(event.currentTarget)
	                        .parents('.wizard-card').removeClass('active').removeClass('bx-trans-steps-on').addClass('resolved')
	                        .next().addClass('active').addClass('bx-trans-steps-on')
	                }

	                return this
	            },
	            back: function(event) {
	                this.move(event, -1)
	            },
	            expand: function(event) {
	                if (this.options.vertical) {
	                    $(event.currentTarget)
	                        .parents('.wizard-card').addClass('active').addClass('bx-trans-steps-on')
	                        .siblings().removeClass('active').removeClass('bx-trans-steps-on')
	                }
	                return this
	            }
	        })

	        return Wizard
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ])
});
;