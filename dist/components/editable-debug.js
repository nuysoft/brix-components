(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("components/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "components/base"], factory);
	else if(typeof exports === 'object')
		exports["components/editable"] = factory(require("jquery"), require("underscore"), require("components/base"));
	else
		root["components/editable"] = factory(root["jquery"], root["underscore"], root["components/base"]);
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
	    http://zombiej.github.io/bootstrap-components-3.0/
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix
	    ) {

	        /*
	            简单模式：
	            <h3 bx-name="components/editable">This is a editable title.</h3>

	            自定义模式：
	            <div bx-name="components/editable">
	                <div class="editable-content"></div>
	                <div class="editable-toggle"></div>
	                <input class="editable-input">
	            </div>
	         */

	        var NAMESPACE = '.editable'
	        var TPL = {
	            pre: '<textarea>',
	            _default: '<input type="text">'
	        }

	        function Editable(options) {
	            if ($(options.element).find('.editable-content').length) {
	                return new CustomEditable(options)
	            }
	        }

	        _.extend(Editable.prototype, Brix.prototype, {
	            options: {
	                type: 'text', // text html
	                content: ''
	            },
	            init: function() {
	                var type = this.options.type
	                this.$element = $(this.element)
	                if (!this.options.content) this.options.content = this.$element[type]()
	                if (!this.$element[type]()) this.$element[type](this.options.content)
	            },
	            render: function() {
	                var that = this
	                var html = this.$element.is('pre') ? TPL.pre : TPL._default
	                this.$relatedElement = $(html)
	                    .val(this.options.content)
	                    .insertAfter(this.$element)
	                this._beautify()
	                this.$relatedElement.hide()

	                this.$element.on('click', function( /*event*/ ) {
	                    that.show()
	                })

	                this.$relatedElement
	                    .on('keydown', function(event) {
	                        if (!that._hooks[event.which]) return
	                        that._hooks[event.which].call(that, event)
	                    })
	                    .on('blur', function() {
	                        if (that.update() === false) return
	                        that.hide()
	                    })
	                    .on('change', function(event) {
	                        // 阻止 input、textarea 的 change 事件，避免二次触发 change.editable 事件。
	                        event.preventDefault()
	                        event.stopImmediatePropagation()
	                        event.stopPropagation()
	                    })
	            },
	            update: function() {
	                var preContent = this.$element[this.options.type]() || this.options.content
	                var content = this.$relatedElement.val()
	                if (preContent === content) return

	                var validate = $.Event('change' + NAMESPACE)
	                this.trigger(validate, [content])
	                if (validate.isDefaultPrevented()) return false

	                this.$element[this.options.type](content)
	            },
	            show: function() {
	                this._beautify()
	                this.$element.hide()
	                this.$relatedElement.show().focus()
	            },
	            hide: function() {
	                this.$relatedElement.hide()
	                this.$element.show()
	            },
	            _hooks: {
	                // enter
	                13: function(event) {
	                    event.preventDefault()
	                    if (this.update() === false) return
	                    this.hide()
	                },
	                // esc
	                27: function(event) {
	                    event.preventDefault()
	                    this.hide()
	                    this.$relatedElement.val(
	                        this.$element[this.options.type]()
	                    )
	                }
	            },
	            _beautify: function() {
	                var $element = this.$element
	                var $relatedElement = this.$relatedElement

	                var display = $element.css('display')
	                var zIndex = $element.css('z-index')
	                var outerWidth = $element.outerWidth(true)
	                var targetPaddingLeft = parseInt($element.css('padding-left'), 10) || 0
	                var targetPaddingRight = parseInt($element.css('padding-right'), 10) || 0
	                var targetBorderLeft = parseInt($element.css('border-left-width'), 10) || 0
	                var targetBorderRight = parseInt($element.css('border-right-width'), 10) || 0
	                var relatedPaddingLeft = parseInt($relatedElement.css('padding-left'), 10) || 0
	                var relatedPaddingRight = parseInt($relatedElement.css('padding-right'), 10) || 0
	                var relatedBorderLeft = parseInt($relatedElement.css('border-left-width'), 10) || 0
	                var relatedBorderRight = parseInt($relatedElement.css('border-right-width'), 10) || 0

	                this.$relatedElement
	                    .addClass('form-control')
	                    .css({
	                        'display': display,
	                        'font-size': $element.css('font-size'),
	                        'font-family': $element.css('font-family'),
	                        'font-weight': $element.css('font-weight'),
	                        'line-height': $element.css('line-height'),
	                        'color': $element.css('color'),
	                        'z-index': zIndex === 'auto' ? 1001 : zIndex + 1,
	                        'margin': $element.css('margin'),
	                        'width': /inline/.test(display) ?
	                            outerWidth +
	                            (relatedPaddingLeft - targetPaddingLeft) +
	                            (relatedPaddingRight - targetPaddingRight) +
	                            (relatedBorderLeft - targetBorderLeft) +
	                            (relatedBorderRight - targetBorderRight) : outerWidth,
	                        'height': 'auto'
	                    })
	            }
	        })


	        function CustomEditable() {}

	        _.extend(CustomEditable.prototype, Editable.prototype, {
	            init: function() {
	                var type = this.options.type
	                this.$element = $(this.element)

	                this._$content = this.$element.find('.editable-content')
	                this._$toggle = this.$element.find('.editable-toggle')
	                this._$input = this.$element.find('.editable-input')

	                if (!this.options.content) this.options.content = this._$content[type]()
	                if (!this._$content[type]()) this._$content[type](this.options.content)
	            },
	            render: function() {
	                var that = this
	                this._$toggle.on('click', function( /*event*/ ) {
	                    that.show()
	                })
	                this._$input.on('keydown', function(event) {
	                    if (!that._hooks[event.which]) return
	                    that._hooks[event.which].call(that, event)
	                }).on('blur', function() {
	                    if (that.update() === false) return
	                    that.hide()
	                })
	            },
	            update: function() {
	                var preContent = this._$content[this.options.type]() || this.options.content
	                var content = this._$input.val()
	                if (preContent === content) return

	                var validate = $.Event('change' + NAMESPACE)
	                this.trigger(validate, [content])
	                if (validate.isDefaultPrevented()) return false

	                this._$content[this.options.type](content)
	            },
	            show: function() {
	                this._$content.hide()
	                this._$toggle.hide()
	                this._$input.show().focus()
	            },
	            hide: function() {
	                this._$content.show()
	                this._$toggle.css('display', '')
	                this._$input.hide()
	            },
	            _hooks: {
	                // enter
	                13: function(event) {
	                    event.preventDefault()
	                    if (this.update() === false) return
	                    this.hide()
	                },
	                // esc
	                27: function(event) {
	                    event.preventDefault()
	                    this.hide()
	                    this._$input.val(
	                        this._$content[this.options.type]()
	                    )
	                }
	            },
	        })


	        return Editable
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

	// 'width': $element.css('width'), // auto + 2?
	// 'height': 'auto',
	// 'min-width': $element.css('width'),
	// 'margin': $element.css('margin'),
	// 'padding': $element.css('padding'),
	// 'line-height': $element.css('line-height')
	// 坑爹的位置修正啊！无法满足所有场景！而事实上，解决了 inline 的场景就基本满足了所有场景。
	// 'margin-left': targetMarginLeft -
	//     (relatedPaddingLeft - targetPaddingLeft) -
	//     (relatedBorderLeft - targetBorderLeft),
	// 'margin-top': targetMarginTop -
	//     (relatedPaddingTop - targetPaddingTop) -
	//     (relatedBorderTop - targetBorderTop),
	// 'margin-bottom': targetMarginBottom -
	//     (relatedPaddingBottom - targetPaddingBottom) -
	//     (relatedBorderBottom - targetBorderBottom),

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