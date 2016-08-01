(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/ellipsis"] = factory(require("jquery"), require("underscore"), require("brix/base"));
	else
		root["components/ellipsis"] = factory(root["jquery"], root["underscore"], root["brix/base"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window, setTimeout, clearTimeout */
	/*
	    http://caniuse.com/#search=ellipsis
	    https://github.com/jjenzz/jquery.ellipsis
	    支持中文
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix
	    ) {
	        var ellipClass = 'ellip'
	        var ellipLineClass = 'ellip' + '-line'

	        return Brix.extend({
	            options: {
	                lines: 'auto'
	            },
	            init: function() {
	                if (this.options.lines !== 'auto') this.options.lines = +this.options.lines

	                this.$element = $(this.element)
	                this._text = this.$element.text()
	                this._height = this.$element.height()

	                this.$relatedElement = $('<span class="' + ellipClass + '" />')
	                    .text(this._text)
	                this.$element.empty().append(this.$relatedElement)
	            },
	            render: function() {
	                if (this.options.lines === 1) {
	                    this.$relatedElement.addClass(ellipLineClass)
	                    return
	                }
	                if (this.options.lines === 'auto' && this.$relatedElement.prop('scrollHeight') <= this._height) {
	                    return
	                }

	                var words = this.parseWords(this._text)
	                var start = this.parseStart(this.options.lines, words)
	                this.update(words, start)

	                var that = this
	                var type = 'click.ellipsis_' + this.options.clientId
	                $(window)
	                    .off(type)
	                    .on(type, function() {
	                        that.render()
	                    })
	            },
	            update: function(words, start) {
	                words[start] = '<span class="' + ellipLineClass + '">' + words[start]
	                words.push('</span>')
	                this.$relatedElement.html(words.join(''))
	            },
	            parseStart: function(mode, words) {
	                var spans = _.map(words, function(item /*, index*/ ) {
	                    // if (!!item.match(/^\s+$/)) return ' '
	                    return '<span>' + item + '</span>'
	                })
	                this.$relatedElement.html(spans.join(''))

	                spans = this.$relatedElement.find('span')

	                return mode === 'auto' ? this.parseStartByHeight(spans) : this.parseStartByLines(spans)
	            },
	            parseStartByLines: function(spans) {
	                var start
	                var top, currentTop, currentLine = 0
	                for (var i = 0; i < spans.length; i++) {
	                    top = $(spans[i]).position().top
	                    if (top !== currentTop) {
	                        currentTop = top
	                        currentLine += 1
	                    }
	                    if (currentLine === this.options.lines) {
	                        start = i
	                        break
	                    }
	                }
	                return start
	            },
	            parseStartByHeight: function(spans) {
	                var start
	                var top, height, currentTop, currentLine = 0
	                var buffer = {}
	                for (var i = 0; i < spans.length; i++) {
	                    top = $(spans[i]).position().top
	                    height = height || $(spans[i]).height()
	                    if (top !== currentTop) {
	                        currentTop = top
	                        currentLine += 1
	                        buffer[currentLine] = [spans[i]]
	                    } else {
	                        buffer[currentLine].push([spans[i]])
	                    }
	                    if (top + height > this._height) {
	                        start = i - buffer[currentLine - 1].length
	                        break
	                    }
	                }
	                return start
	            },
	            parseWords: function parseWords(text) {
	                return $.trim(text).split('')
	            },
	            resize: function() {
	                var that = this
	                clearTimeout(this.resizeTimer)
	                this.resizeTimer = setTimeout(function() {
	                    that.render()
	                }, 100)
	            }

	            // JSON.stringify(parseWords('11一一22二二33三三44 11一一22二二33三三44'), null, 4)
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

/***/ }
/******/ ])
});
;