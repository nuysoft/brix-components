(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/popover"] = factory(require("jquery"), require("underscore"), require("brix/base"));
	else
		root["components/popover"] = factory(root["jquery"], root["underscore"], root["brix/base"]);
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
	    http://thx.github.io/brix-site/readme.html?name=Popover
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/popover/
	        Temporary

	    # Popover

	    浮层。

	    ```html
	    <div bx-name="components/popover" bx-options="{
	        placement: 'top',
	        title: 'Popover on top',
	        content: 'Envy is the ulcer of the soul.'
	    }" class="btn btn-default">Popover on top</div>
	    ```

	    ## 配置

	    配置项    | 类型       | 默认值    | 说明
	    :-------- | :--------- | :-------- | :----------
	    placement | string     | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
	    align     | string     | `''`      | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
	    offset    | object     | `{}`      | 指定浮层的偏移，可以含有两个属性：`left`、`top`。
	    width     | int        | `'auto'`  | 指定浮层的宽度。
	    title     | string     | `''`      | 指定浮层的标题。
	    content   | string     | `''`      | 指定浮层的内容。
	    ~~delay~~ | ~~number~~ | ~~`100`~~ | ~~指定延迟关闭浮层的时间，单位为毫秒。~~

	    ## 方法

	    * .show()
	        显示浮层。
	    * .hide()
	        关闭浮层。
	    * .title( [ title ] )
	        获取或设置浮层的标题。
	    * .content( [ content ] )
	        获取或设置浮层的内容。

	    ## 事件

	    无。

	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4),
	        __webpack_require__(5),
	        __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix,
	        position,
	        template
	    ) {
	        function Popover() {}

	        _.extend(Popover.prototype, Brix.prototype, {
	            options: {
	                placement: 'right', // top bottom left right
	                align: '', // left right top bottom
	                offset: {},
	                width: 'auto',

	                title: '',
	                content: '',

	                delay: 100
	            },
	            init: function() {
	                // 支持自定义 CSS 样式
	                if (this.options.css) window.require(['css!' + this.options.css])
	            },
	            render: function() {
	                var that = this
	                this.$element = $(this.element)
	                this.$relatedElement = $(
	                    // 支持自定义 HTML 模板 template
	                    _.template(this.options.template || template)(this.options)
	                ).insertAfter(this.$element)

	                this.$element.hover(function( /*event*/ ) {
	                    that.show()
	                }, function( /*event*/ ) {
	                    that.hide()
	                })

	                that.$relatedElement.hover(function( /*event*/ ) {
	                    clearTimeout(that._timer)
	                }, function( /*event*/ ) {
	                    clearTimeout(that._timer)
	                    that.$relatedElement.hide()
	                })
	            },
	            show: function() {
	                clearTimeout(this._timer)
	                this.$relatedElement.show().css({
	                    width: this.options.width,
	                    'max-width': this.options.width // 覆盖 bootstrap overlay 的 max-width
	                })
	                var offset = position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
	                var relatedMarginLeft = parseInt(this.$relatedElement.css('margin-left'), 10) || 0
	                var relatedMarginTop = parseInt(this.$relatedElement.css('margin-top'), 10) || 0
	                this.$relatedElement.offset({
	                    left: offset.left + relatedMarginLeft + (this.options.offset.left || 0),
	                    top: offset.top + relatedMarginTop + (this.options.offset.top || 0)
	                })
	                if (this.options.align) {
	                    var $arrow = this.$relatedElement.find('.arrow')
	                    if ($arrow.is(':visible')) {
	                        $arrow.offset(
	                            getArrowPosition(this.$element, this.$relatedElement, this.options.placement, this.options.align)
	                        )
	                    }
	                }
	            },
	            hide: function() {
	                var that = this
	                clearTimeout(this._timer)
	                this._timer = setTimeout(function() {
	                    that.$relatedElement.hide()
	                }, this.options.delay)
	            },
	            title: function(title) {
	                if (title === undefined || title === null) return this.options.title

	                this.options.title = title
	                this.$relatedElement.find('.popover-title').html(title)

	                return this
	            },
	            content: function(content) {
	                if (content === undefined || content === null) return this.options.content

	                this.options.content = content
	                this.$relatedElement.find('.popover-content').html(content)

	                return this
	            },
	            destroy: function() {
	                this.$element
	                    .off('mouseenter mouseleave') // hover
	                this.$relatedElement
	                    .off('mouseenter mouseleave') // hover
	                    .remove()
	            }
	        })

	        var tb = /top|bottom/
	        var lr = /left|right/

	        function getArrowPosition(trigger, overlay, placement, align) {
	            var $trigger = $(trigger)
	            var triggerOffset = $trigger.offset()
	            var triggerLeft = triggerOffset.left
	            var triggerTop = triggerOffset.top
	            var triggerWidth = $trigger.outerWidth()
	            var triggerHeight = $trigger.outerHeight()

	            var $overlay = $(overlay).show()
	            var overlayWidth = $overlay.outerWidth()
	            var overlayHeight = $overlay.outerHeight()

	            var $arrow = $(overlay).find('.arrow')
	            var arrowWidth = $arrow.outerWidth()
	            var arrowHeight = $arrow.outerHeight()

	            var left, top

	            if (
	                tb.test(placement) !== tb.test(align) &&
	                lr.test(placement) !== lr.test(align)
	            ) {
	                switch (align) {
	                    case 'top':
	                    case 'bottom':
	                        if (overlayHeight > triggerHeight) {
	                            top = triggerTop + triggerHeight / 2 - arrowHeight / 2
	                        }
	                        break
	                    case 'left':
	                    case 'right':
	                        if (overlayWidth > triggerWidth) {
	                            left = triggerLeft + triggerWidth / 2 - arrowWidth / 2
	                        }
	                        break
	                }
	            }

	            return {
	                left: left,
	                top: top
	            }
	        }

	        return Popover
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $
	    ) {
	        var RE_TOP_OR_BOTTOM = /top|bottom/
	        var RE_LEFT_OR_RIGHT = /left|right/

	        /**
	         * 计算浮层位置的工具函数
	         * @param  {[type]} trigger    参照节点
	         * @param  {[type]} dialog     浮层节点
	         * @param  {[type]} placement  浮层相对于参照的位置
	         * @param  {[type]} align      浮层相对于参照的对齐方式
	         * @return {[type]}            { left: left, top: top }
	         */
	        function position(trigger, overlay, placement, align) {
	            var $trigger = $(trigger)

	            if (!$trigger.length) return center(overlay)

	            var triggerOffset = $trigger.offset()
	            var triggerLeft = triggerOffset.left
	            var triggerTop = triggerOffset.top
	            var triggerWidth = $trigger.outerWidth()
	            var triggerHeight = $trigger.outerHeight()

	            var $overlay = $(overlay) // .show()
	            var visible = $overlay.css('display') !== 'none'
	            $overlay.show()
	            var overlayWidth = $overlay.outerWidth()
	            var overlayHeight = $overlay.outerHeight()
	                // var overlayMarginLeft = parseInt($overlay.css('margin-left'), 10)
	                // var overlayMarginTop = parseInt($overlay.css('margin-top'), 10)

	            if (!visible) $overlay.hide()

	            var left, top
	            var leftDiff = triggerWidth / 2 - overlayWidth / 2
	            var topDiff = triggerHeight / 2 - overlayHeight / 2
	            switch (placement) {
	                case 'top': // 上方，水平局中
	                    left = triggerLeft + leftDiff
	                    top = triggerTop - overlayHeight
	                    break
	                case 'bottom': // 下方，水平局中
	                    left = triggerLeft + leftDiff
	                    top = triggerTop + triggerHeight
	                    break
	                case 'left': // 左侧，垂直局中
	                    left = triggerLeft - overlayWidth
	                    top = triggerTop + topDiff
	                    break
	                case 'right': // 右侧，垂直局中
	                    left = triggerLeft + triggerWidth
	                    top = triggerTop + topDiff
	                    break
	            }

	            // 浮层节点不能覆盖参照节点
	            if (
	                RE_TOP_OR_BOTTOM.test(placement) !== RE_TOP_OR_BOTTOM.test(align) &&
	                RE_LEFT_OR_RIGHT.test(placement) !== RE_LEFT_OR_RIGHT.test(align)
	            ) {
	                switch (align) {
	                    case 'top': // 上边框对齐
	                        top = triggerTop
	                        break
	                    case 'bottom': // 下边框对齐
	                        top = triggerTop + triggerHeight - overlayHeight
	                        break
	                    case 'left': // 做边框对齐
	                        left = triggerLeft
	                        break
	                    case 'right': // 右边框对齐
	                        left = triggerLeft + triggerWidth - overlayWidth
	                        break
	                }
	            }

	            return {
	                left: left, //  + overlayMarginLeft
	                top: top //  + overlayMarginTop
	            }
	        }

	        function center(width, height) {
	            var overlayWidth, overlayHeight

	            // center(overlay) {
	            if (!height) {
	                var $overlay = $(width) // .show()
	                var visible = $overlay.css('display') !== 'none'
	                $overlay.show()
	                overlayWidth = $overlay.outerWidth()
	                overlayHeight = $overlay.outerHeight()

	                if (!visible) $overlay.hide()

	            } else {
	                // center(width, height)
	                overlayWidth = parseFloat(width, 12)
	                overlayHeight = parseFloat(height, 12)
	            }

	            var $window = $(window)
	            var windowWidth = $window.width()
	            var windowHeight = $window.height()
	            var scrollLeft = $window.scrollLeft()
	            var scrollTop = $window.scrollTop()

	            return {
	                left: windowWidth / 2 - overlayWidth / 2 + scrollLeft,
	                top: windowHeight / 2 - overlayHeight / 2 + scrollTop
	            }
	        }

	        function start(overlay, offset, placement) {
	            var $overlay = $(overlay) // .show()
	            var visible = $overlay.css('display') !== 'none'
	            $overlay.show()
	            var width = $overlay.outerWidth()
	            var height = $overlay.outerHeight()

	            if (!visible) $overlay.hide()

	            var result = {
	                opacity: 0,
	                left: offset.left,
	                top: offset.top
	            }
	            switch (placement) {
	                case 'top': // 上方
	                    result.top = result.top - height * 0.5
	                    break
	                case 'bottom': // 下方
	                    result.top = result.top + height * 0.5
	                    break
	                case 'left': // 左侧
	                    result.left = result.left - width * 0.5
	                    break
	                case 'right': // 右侧
	                    /* Expected a 'break' statement before 'default'. */
	                    /* falls through */
	                default:
	                    result.left = result.left + width * 0.5
	                    break
	            }

	            return result
	        }

	        /* exported overlay */
	        function end(overlay, offset) {
	            if (!overlay) { /* TODO */ }
	            return {
	                opacity: 1,
	                left: offset.left,
	                top: offset.top
	            }
	        }

	        position.center = center
	        position.start = start
	        position.end = end

	        return position
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"popover <%= placement %>\">\n" +
	        "    <div class=\"arrow\"></div>\n" +
	        "    <div class=\"popover-title <%= title ? '' : 'hide' %>\"><%= title %></div>\n" +
	        "    <div class=\"popover-content\"><%= content %></div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;