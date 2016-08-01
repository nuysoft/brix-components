(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("components/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "components/base"], factory);
	else if(typeof exports === 'object')
		exports["components/suggest"] = factory(require("jquery"), require("underscore"), require("components/base"));
	else
		root["components/suggest"] = factory(root["jquery"], root["underscore"], root["components/base"]);
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
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4),
	        __webpack_require__(5),
	        __webpack_require__(6),
	        __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix,
	        position,
	        template,
	        itemTemplate
	    ) {
	        /*
	            input 自动适配宽度，避免意外这行
	            rich input
	                tag input
	                suggest 绑定在 inpupt 上

	         */
	        function Suggest() {}

	        var NAMESPACE = '.suggest'
	        var NAMESPACE_INPUT = '.input'
	        var NAMESPACE_DONE = '.done'
	        var NAMESPACE_INTERNAL = '.internal'

	        _.extend(Suggest.prototype, Brix.prototype, {
	            options: {
	                template: '',
	                data: []
	            },
	            init: function() {
	                var defer = $.Deferred()

	                // 支持自定义 HTML 模板 template
	                // 支持自定义 CSS 样式
	                var deps = []
	                var customItemTemplate = this.options.template
	                var customCSS = this.options.css
	                if (customItemTemplate) deps.push(customItemTemplate)
	                if (customCSS) {
	                    if (customCSS.indexOf('css!') !== 0) customCSS = 'css!' + customCSS
	                    deps.push(customCSS)
	                }
	                window.require(deps, function() {
	                    if (customItemTemplate) itemTemplate = arguments[0]
	                    defer.resolve()
	                })

	                if (deps.length) return defer.promise()
	            },
	            render: function() {
	                this.$element = $(this.element)

	                var html = _.template(template)(this.options)
	                this.$relatedElement = $(html).insertAfter(this.$element)
	                this.$menu = this.$relatedElement.find('.dropdown-menu')
	                this._fill(this.options.data)._beautify()

	                this._bindEvent()
	            },
	            data: function(data) {
	                if (!data) return this.options.data

	                this.options.data = data
	                this._fill(data)._beautify()
	            },
	            val: function(val) {
	                if (val === undefined) return this.$element.val()

	                this.$element.val(val)
	                return this
	            },
	            open: function() {
	                this.$relatedElement.show()
	                return this
	            },
	            close: function() {
	                this.$relatedElement.hide()
	                return this
	            },
	            focus: function() {
	                this.$element.focus()
	                return this
	            },
	            blur: function() {
	                this.$element.blur()
	                return this
	            },
	            _bindEvent: function() {
	                var that = this
	                this.$element
	                    .off('keyup' + NAMESPACE + NAMESPACE_INTERNAL)
	                    .on('keyup' + NAMESPACE + NAMESPACE_INTERNAL, function(event) {
	                        // enter up down esc
	                        if (that._handlerHooks[event.which]) {
	                            that._handler(event)
	                                // event.preventDefault()
	                            return
	                        }
	                        that._sos(event.target.value)
	                    })
	                    .off('click' + NAMESPACE + NAMESPACE_INTERNAL)
	                    .on('click' + NAMESPACE + NAMESPACE_INTERNAL, function(event) {
	                        that._sos(event.target.value)
	                    })
	                this.$relatedElement
	                    .off('click' + NAMESPACE + NAMESPACE_INTERNAL)
	                    .on('click' + NAMESPACE + NAMESPACE_INTERNAL, '.dropdown-menu > li', function(event) {
	                        that._moveTo($(event.currentTarget).index())
	                        that._select()
	                    })

	                // 如果点击其他区域，自动提关闭示浮层。
	                var type = 'click' + NAMESPACE + '_' + this.clientId
	                $(document.body).off(type)
	                    .on(type, function(event) {
	                        if (that.element === event.target) return
	                        if (that.$relatedElement.has(event.target).length) return
	                        that.close()
	                    })
	            },
	            _sos: function(value) {
	                this.trigger('change' + NAMESPACE + NAMESPACE_INPUT, value)
	            },
	            _handler: function(event) {
	                var items = this._items()
	                this._handlerHooks[event.which].call(this, event, items.all, items.active, items.index)
	            },
	            _items: function() {
	                var items = this.$menu.find('> li')
	                var active = items.filter('.active')
	                var index = items.index(active)
	                return {
	                    all: items,
	                    active: active,
	                    index: index
	                }
	            },
	            /* jshint unused:false */
	            _handlerHooks: {
	                // up
	                38: function(event, items, active, index) {
	                    this._moveTo(items, active, --index)
	                },
	                // down
	                40: function(event, items, active, index) {
	                    if (!this.$menu.is(':visible')) {
	                        this._fill(this.options.data)._beautify()
	                        return
	                    }
	                    this._moveTo(items, active, ++index)
	                },
	                // enter
	                13: function(event, items, active, index) {
	                    if (!this.$menu.is(':visible')) return
	                    this._select(items, active, index)
	                },
	                // esc
	                27: function(event, items, active, index) {
	                    this.close()
	                }
	            },
	            _select: function(items, active, index) {
	                // _select()
	                if (!items) {
	                    var mapped = this._items()
	                    items = mapped.items
	                    active = mapped.active
	                    index = mapped.index
	                }

	                var value = $.trim(active.text())
	                this.$element.val(value)

	                var type = 'change' + NAMESPACE + NAMESPACE_DONE
	                var event = $.Event(type, {
	                    target: this.element
	                })
	                this.trigger(event, value)

	                // TODO 自动在组件原始节点上触发 change 事件
	                // this.$element.trigger('change')

	                this.close().focus()

	                return this
	            },
	            _moveTo: function(items, active, index) {
	                // _moveTo( index )
	                if (!active && !index) {
	                    index = items

	                    var mapped = this._items()
	                    items = mapped.all
	                    active = mapped.active
	                }

	                index = (index + items.length) % items.length
	                active.removeClass('active')
	                items.eq(index).addClass('active')

	                return this
	            },
	            _beautify: function() {
	                this.$relatedElement[
	                    (this.options.data && this.options.data.length) ? 'show' : 'hide'
	                ]()

	                var offset = position(this.$element, this.$relatedElement, 'bottom', 'left')
	                this.$relatedElement.offset(offset)

	                return this
	            },
	            _fill: function(data) {
	                var that = this
	                var value = this.val()

	                var itemContent
	                var compiled = _.template(itemTemplate)
	                var html = _.map(data, function(item, index) {
	                    itemContent = compiled({
	                        data: that._highlight(item, value)
	                    })
	                    return '<li>' + itemContent + '</li>'
	                }).join('')

	                this.$menu
	                    .empty()
	                    .html(html)
	                    .find('> li:first-child').addClass('active')

	                return this
	            },
	            _highlight: function(item, value) {
	                if (!value) return item

	                var value_re = new RegExp(value, 'ig')
	                return ('' + item).replace(value_re, function(matched) {
	                    return '<span class="highlight">' + matched + '</span>'
	                })
	            },
	            destroy: function() {
	                this.$relatedElement.remove()

	                var type = 'click' + NAMESPACE + '_' + this.clientId
	                $(document.body).off(type)
	            }
	        })

	        return Suggest
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
	    return "<div class=\"suggest dropdown\">\n" +
	        "    <ul class=\"dropdown-menu\"></ul>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<a href=\"javascript:;\"><%= data %></a>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;