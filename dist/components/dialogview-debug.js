(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("brix/base"), require("magix"), require("jquery"), require("components/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "brix/base", "magix", "jquery", "components/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/dialogview"] = factory(require("underscore"), require("brix/base"), require("magix"), require("jquery"), require("components/base"), require("brix/event"));
	else
		root["components/dialogview"] = factory(root["underscore"], root["brix/base"], root["magix"], root["jquery"], root["components/base"], root["brix/event"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
	        __webpack_require__(3), __webpack_require__(4),
	        __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        _,
	        Brix, Magix,
	        Dialog
	    ) {
	        /*
	            var DialogView = require('components/dialogview')
	            var dialogOptions = {
	                left: 100,
	                top: 100
	            }
	            var viewName = 'todo'
	            var viewOptions = {}
	            var dialog = new DialogView(dialogOptions, viewName, viewOptions)
	            dialog.open()
	         */

	        var DIALOG_VIEW_ID = 'vf-dialog';
	        var DIALOG_VIEW_CONTAINER = '<div class="dialog-body"><div id="' + DIALOG_VIEW_ID + '" mx-vframe="true"></div></div>'

	        function DialogView() {
	            // 支持构造函数
	            if (arguments.length > 1) {
	                this.options = _.extend({}, this.options, arguments[0])
	                this.options['view-name'] = arguments[1]
	                this.options['view-options'] = arguments[2]
	                this.init()
	                this.render()
	            }
	        }

	        _.extend(DialogView.prototype, Brix.prototype, {
	            options: {},
	            init: function() {
	                if (!this.options.content) this.options.content = DIALOG_VIEW_CONTAINER
	                if (!this.options.view) {
	                    this.options.view = {
	                        name: this.options['view-name'],
	                        options: this.options['view-options']
	                    }
	                }
	                if (this.dialog) this.dialog.destroy()
	                this.dialog = new Dialog(this.options)
	            },
	            render: function() {},
	            fill: function() {
	                if (this.options.hostView) {
	                    this.options.hostView.owner
	                        .mountVframe(
	                            DIALOG_VIEW_ID,
	                            this.options.view.name,
	                            this.options.view.options
	                        )
	                    return
	                }

	                var vframe = Magix.VOM.get(DIALOG_VIEW_ID) || new Magix.Vframe(DIALOG_VIEW_ID)
	                vframe.unmountVframe(DIALOG_VIEW_ID)
	                vframe.mountVframe(DIALOG_VIEW_ID, this.options.view.name, this.options.view.options)
	            },
	            open: function() {
	                this.dialog.open()
	                this.fill()
	            },
	            close: function() {
	                this.dialog.close()
	                var vframe = Magix.VOM.get(DIALOG_VIEW_ID)
	                if (vframe) {
	                    vframe.unmountVframe(DIALOG_VIEW_ID)
	                }
	            },
	            destroy: function() {
	                this.close()
	                this.dialog.destroy()
	            }
	        })

	        var DialogViewUtil = {
	            open: function(dialogOptions /* hostView */ , viewName, viewOptions) {
	                if (this.dialog) this.dialog.destroy()
	                this.dialog = new DialogView(dialogOptions, viewName, viewOptions)
	                this.dialog.open()
	                if (dialogOptions.hostView) {
	                    dialogOptions.hostView.manage(this.dialog)
	                }
	            },
	            close: function() {
	                if (this.dialog) this.dialog.destroy()
	            }
	        }

	        return DialogViewUtil
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	    http://jqueryui.com/dialog
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(6), __webpack_require__(2),
	        __webpack_require__(7), __webpack_require__(8),
	        __webpack_require__(9),
	        __webpack_require__(10)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix, EventManager,
	        position,
	        template
	    ) {
	        /*
	            var Dialog = require('components/dialog')
	            var content = '\
	                <div class="dialog-header">\
	                    <h4 class="dialog-title">abc</h4>\
	                </div>\
	            '
	            var dialog = new Dialog({
	                content: content,
	                modal: true,
	                left: 100,
	                top: 100
	            })
	            dialog.on('open.dialog',function(){
	                debugger
	            })
	            dialog.open()

	            // 多个浮层
	            var Dialog = require('components/dialog')
	            var _ = require('underscore')
	            var options = {
	                modal: true,
	                singleton: false,
	                top: 400
	            }

	            new Dialog(_.extend({
	                content: Math.random(),
	                left: 100
	            }, options)).open()

	            new Dialog(_.extend({
	                content: Math.random(),
	                left: 200
	            }, options)).open()

	            new Dialog(_.extend({
	                content: Math.random(),
	                left: 300
	            }, options)).open()
	         */

	        var TRANSITION_DURATION = 150
	        var EASING = 'swing'
	        var NAMESPACE = '.dialog'
	        var DIALOG_OPENED_CACHE = []
	        var DIALOG_ALL_CACHE = []
	        var STATE = {
	            PENDING: 'pending',
	            OPENED: 'opened',
	            CLOSED: 'closed'
	        }

	        function Dialog() {
	            // 支持构造函数
	            if (arguments.length) {
	                this.options = _.extend({}, this.options, arguments[0])
	                this.init()
	                this.render()
	            }

	            // 压入缓存 DIALOG_ALL_CACHE
	            DIALOG_ALL_CACHE.push(this)
	        }

	        _.extend(Dialog.prototype, Brix.prototype, {
	            options: {
	                placement: 'right', // top bottom left right
	                align: 'top', // left right top bottom

	                left: undefined,
	                top: undefined,
	                width: 'auto',
	                height: 'auto',
	                offset: {
	                    left: 0,
	                    top: 0
	                },

	                // { data-class | data-className | className: ''}
	                className: '',

	                content: '',

	                closable: true, // 是否可关闭
	                movable: false, // 是否可移动
	                modal: false, // 是否模态对话框 http://baike.baidu.com/view/3148035.htm
	                singleton: true // 是否单例模式
	            },
	            state: STATE.PENDING, // pending opened closed
	            init: function() {
	                this.$element = $(this.element || this.options.element)
	                this.$manager = new EventManager('bx-')

	                // 支持自定义外联 CSS 样式，data-css="dialog.css"
	                if (this.options.css && _.isString(this.options.css)) window.require(['css!' + this.options.css])

	                // data-class => data-className
	                if (this.options.class) this.options.className = this.options.class

	                // 为文本内容自动加上样式 dialog-body
	                if (('' + this.options.content).indexOf('<') === -1) {
	                    this.options.content =
	                        '<div class="dialog-body">' +
	                        this.options.content +
	                        '<div>'
	                }
	            },
	            render: function() {
	                this.fill()
	                this.$manager.delegate(this.$element, this)
	            },
	            destroy: function() {
	                // 先关闭，把当前实例从缓存 DIALOG_OPENED_CACHE 中移除
	                this.close()

	                // 从缓存 DIALOG_ALL_CACHE 中移除
	                DIALOG_ALL_CACHE = _.without(DIALOG_ALL_CACHE, this)

	                var type = 'keyup.dialog_autohide_' + this.clientId
	                if (!DIALOG_OPENED_CACHE.length) $(document.body).off(type) // 只有当窗口全部关闭后，才能移除

	                this.$manager.undelegate(this.$element)
	                this.$manager.undelegate(this.$relatedElement)

	                this.$relatedElement.remove()
	                this.$relatedElement = null
	                this.$backdropElement = null
	            },
	            fill: function() {
	                var html = _.template(template)(this.options)

	                // 初始化节点
	                if (!this.$relatedElement) {
	                    this.$relatedElement = $(html).appendTo(document.body).hide()
	                }

	                // 单例模式 data-singleton
	                // 不共用浮层 div.dialog.dialog-singleton，但是会关闭其他单例浮层
	                if (!this.options.singleton) {
	                    this.$relatedElement.removeClass('dialog-singleton')
	                }

	                // data-content
	                this.$relatedElement
	                    .find('.dialog-content')
	                    .html(this.options.content)

	                // 宽高 width height
	                this.$relatedElement.css({
	                    width: this.options.width,
	                    height: this.options.height
	                })

	                // 总是初始化遮罩层
	                this.$backdropElement = $('.dialog-backdrop')
	                if (!this.$backdropElement.length) {
	                    this.$backdropElement = $('<div class="dialog-backdrop"></div>').hide()
	                        .appendTo(document.body)
	                }

	                // 是否模态对话框 modal
	                if (this.options.modal) {}

	                // 类样式 data-className
	                if (this.options.className) {
	                    this.$relatedElement.addClass(this.options.className)
	                }

	                // 内联 CSS 样式，data-css="{ position: 'fixed' }"
	                if (this.options.css && _.isObject(this.options.css)) {
	                    this.$relatedElement.css(this.options.css)
	                }

	                this.$manager.delegate(this.$relatedElement, this)
	                return this
	            },
	            open: function() {
	                // 触发浮层的节点被修改
	                if (!this.element &&
	                    this.options.element &&
	                    (this.options.element !== this.$element[0])
	                ) this.$element = $(this.options.element)

	                // 单例模式：先关闭其他所有单例模式的浮层
	                if (this.options.singleton) {
	                    _.each(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
	                        if (item.options.singleton) item.close()
	                    })
	                }

	                this.fill()
	                this._zIndex('open')
	                this._topmost()
	                this._move()

	                // 模态模式：用户必须先操作模态对话框
	                if (this.options.modal) {
	                    $(document.body).addClass('modal-open')
	                    this.$backdropElement
	                        .show()
	                        .css(
	                            'z-index', +this.$relatedElement.css('z-index') - 1
	                        )
	                }

	                // 从右侧移入
	                var offset = this._offset()
	                this.$relatedElement.show()
	                    .stop()
	                    .css(
	                        position.start(this.$relatedElement, offset /*, this.options.placement*/ )
	                    )
	                    .animate(
	                        position.end(this.$relatedElement, offset),
	                        TRANSITION_DURATION,
	                        EASING
	                    )

	                this._autoHide()

	                // 记录打开的浮层
	                DIALOG_OPENED_CACHE.push(this)

	                this.trigger('open' + NAMESPACE)

	                this.state = STATE.OPENED

	                return this
	            },
	            close: function() {
	                if (!this.$relatedElement || !this.$relatedElement.length) return this

	                if (this.state === STATE.CLOSED) return this

	                var closeEvent = $.Event('close' + NAMESPACE)
	                this.trigger(closeEvent)
	                if (closeEvent.isDefaultPrevented()) return

	                var that = this
	                var offset = this._offset()
	                this.$relatedElement
	                    .stop()
	                    .animate(
	                        position.start(this.$relatedElement, offset),
	                        TRANSITION_DURATION,
	                        EASING,
	                        function() {
	                            if (that.$relatedElement) that.$relatedElement.hide()
	                        }
	                    )

	                // 从缓存中移除当前实例，包括多次打开的实例
	                DIALOG_OPENED_CACHE = _.without(DIALOG_OPENED_CACHE, this)

	                if (this.options.modal) {
	                    // 是否还有模态浮层：只有当前全部模态浮层都关闭后，才能关闭 .dialog-backdrop
	                    var isHasOpenedModal = _.filter(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
	                        if (item.options.modal) return item
	                    }).length
	                    if (!isHasOpenedModal) {
	                        $(document.body).removeClass('modal-open')
	                        this.$backdropElement.hide()
	                    }
	                }

	                this._zIndex('close')

	                this.state = STATE.CLOSED

	                return this
	            },
	            _offset: function() {
	                var offset = this.options.left !== undefined && this.options.top !== undefined ? {
	                    left: this.options.left,
	                    top: this.options.top
	                } : position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
	                offset = {
	                    left: offset.left + (this.options.offset.left || 0),
	                    top: offset.top + (this.options.offset.top || 0)
	                }
	                return offset
	            },
	            _autoHide: function() {
	                var type = 'keyup.dialog_autohide_' + this.clientId
	                $(document.body).off(type)
	                    .on(type, function(event) {
	                        if (event.keyCode === 27) {
	                            // 优先关闭最后打开的、可关闭的浮层
	                            // X DIALOG_OPENED_CACHE.pop() 不在这里移除，而是在 close() 中移除。
	                            var dialog = DIALOG_OPENED_CACHE[DIALOG_OPENED_CACHE.length - 1]
	                            if (dialog && dialog.options.closable) dialog.close()
	                        }
	                    })

	                return this
	            },
	            // 修正 z-index
	            _zIndex: function(when) {
	                if (!DIALOG_OPENED_CACHE.length) return

	                // 最顶层的浮层
	                var topmost = _.max(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
	                    return +item.$relatedElement.css('z-index')
	                })
	                var zIndex = +topmost.$relatedElement.css('z-index')
	                var target

	                switch (when) {
	                    case 'open':
	                        target = this
	                        if (target === topmost) return
	                        break
	                    case 'close':
	                        // 最后弹出的浮层
	                        target = DIALOG_OPENED_CACHE[DIALOG_OPENED_CACHE.length - 1]
	                        break
	                }

	                if (target.$backdropElement) {
	                    target.$backdropElement.css('z-index', zIndex + 1)
	                }
	                target.$relatedElement.css('z-index', zIndex + 2)

	                return this
	            },
	            _topmost: function() {
	                var that = this
	                var type = 'mousedown.dialog_topmost_' + this.clientId
	                this.$relatedElement.off(type)
	                    .on(type, function( /*event*/ ) {
	                        that._zIndex('open')
	                        DIALOG_OPENED_CACHE.push(that)
	                    })

	                return this
	            },
	            _move: function() {
	                if (!this.options.movable) return this

	                var that = this
	                var mousedown = 'mousedown.dialog_move_' + this.clientId
	                var mousemove = 'mousemove.dialog_move_' + this.clientId
	                var mouseup = 'mouseup.dialog_move_' + this.clientId
	                var $body = $(document.body)
	                var $dialogHeader = this.$relatedElement.find('.dialog-header')

	                $dialogHeader.addClass('cursor-move')

	                $dialogHeader.off(mousedown)
	                    .on(mousedown, function(event) {
	                        var offset = $dialogHeader.offset()
	                        var diff = {
	                            left: event.pageX - offset.left,
	                            top: event.pageY - offset.top
	                        }
	                        $body.on(mousemove, function(event) {
	                            that.$relatedElement.offset({
	                                left: event.pageX - diff.left,
	                                top: event.pageY - diff.top
	                            })
	                            return false
	                        })
	                        $body.on(mouseup, function( /*event*/ ) {
	                            $body.off(mousemove)
	                            $body.off(mouseup)
	                            return false
	                        })
	                    })

	                return this
	            }
	        })

	        // 便捷方法。新建一个浮层。
	        Dialog.open = function(options) {
	            return (new Dialog(options)).open()
	        }

	        // 便捷方法。关闭最近打开的浮层。
	        Dialog.close = function() {
	            var dialog = DIALOG_OPENED_CACHE.pop()
	            if (dialog) dialog.close()
	        }

	        // 便捷方法。关闭所有打开的浮层
	        Dialog.closeAll = function() {
	            _.each(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
	                item.close()
	            })
	            return this
	        }

	        // 便捷方法。销毁所有浮层。
	        Dialog.destroy = function() {
	            _.each(DIALOG_ALL_CACHE, function(item /*, index*/ ) {
	                item.destroy()
	            })
	            return this
	        }

	        return Dialog
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(6)
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"dialog dialog-singleton dialog-<%= placement %>\">\n" +
	        "    <button bx-click=\"close\" type=\"button\" class=\"dialog-close <%= closable ? '' : 'hide' %>\"><span class=\"brixfont\">&#xe62d;</span><!-- &times; --></button>\n" +
	        "    <div class=\"dialog-content\">\n" +
	        "        <%= content %>\n" +
	        "        <!-- \n" +
	        "        <div class=\"dialog-header\">\n" +
	        "            <h4 class=\"dialog-title\">Title</h4>\n" +
	        "        </div>\n" +
	        "        <div class=\"dialog-body\">Body</div>\n" +
	        "        <div class=\"dialog-footer\">\n" +
	        "            <button bx-click=\"close\" type=\"button\" class=\"btn btn-default\">Close</button>\n" +
	        "            <button bx-click=\"close\" type=\"button\" class=\"btn btn-primary\">Save</button>\n" +
	        "        </div>\n" +
	        "         -->\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;