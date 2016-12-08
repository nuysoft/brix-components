(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("moment"), require("brix/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "moment", "brix/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/hourpicker"] = factory(require("jquery"), require("underscore"), require("moment"), require("brix/base"), require("brix/event"));
	else
		root["components/hourpicker"] = factory(root["jquery"], root["underscore"], root["moment"], root["brix/base"], root["brix/event"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
	    http://thx.github.io/brix-site/readme.html?name=HourPicker
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/hourpicker/
	        Temporary

	    # HourPicker

	    时间选择器组件。

	    ```html
	    <div bx-name="components/hourpicker"></div>
	    ```

	    ## 配置

	    配置项   | 类型                      | 默认值  | 说明
	    :------- | :------------------------ | :------ | :----------
	    simplify | bolean                    | `false` | 可选。是否为精简模式。
	    value    | string or array or object | `''`    | 可选。指定选中的时间。

	    ## 方法

	    * .val()
	        读取时间选择器的值。
	    * .val( day, hours )
	        设置单天选中的时间。
	    * .val( { day: [ hours ] } )
	        同时设置多天选中的时间。

	    ## 事件

	    事件类型          | 说明
	    :---------------- | :----------
	    change.hourpicker | 当值发生变化时被触发。
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(4),
	        __webpack_require__(5), __webpack_require__(6),
	        __webpack_require__(7),
	        __webpack_require__(8)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, moment,
	        Brix, EventManager,
	        position,
	        template
	    ) {

	        var NAMESPACE = '.hourpicker'
	        var DICT = {
	            DEFAULT: [ // 为了保证遍历数序，采用数组
	                [1, '周一'],
	                [2, '周二'],
	                [3, '周三'],
	                [4, '周四'],
	                [5, '周五'],
	                [6, '周六'],
	                [0, '周日']
	            ],
	            GROUPED: [
	                ['12345', '工作日'],
	                ['60', '休息日']
	            ]
	        }
	        var HOURS = _.range(0, 24)

	        function HourPicker() {}

	        _.extend(HourPicker.prototype, Brix.prototype, {
	            options: {
	                simplify: false,
	                /*
	                    完整模式：
	                        data-value="135"
	                        data-value="1,3,5"
	                        data-value="[1,3,5]"
	                        data-value="{1:[0,2,4]}"
	                    精简模式：
	                        data-value="12345,60"
	                        data-value="[12345,60]"
	                        data-value="{12345:[0,2,4],60:[1,3,5]}"
	                 */
	                value: '',
	                utcOffset: function() {
	                    var utcOffset = moment().utcOffset() / 60
	                    var abs = Math.abs(utcOffset)
	                    var result = abs < 10 ? '0' + abs : abs
	                    result = utcOffset < 0 ? '-' + result : '+' + result
	                    result += ':00'
	                    return result
	                }()
	            },
	            init: function() {},
	            render: function() {
	                var that = this
	                this.$element = $(this.element)
	                this.$manager = new EventManager('bx-')

	                var html = _.template(template)({
	                    utcOffset: this.options.utcOffset,
	                    simplify: this.options.simplify,
	                    DICT: this.options.simplify ? DICT.GROUPED : DICT.DEFAULT,
	                    HOURS: HOURS
	                })
	                this.$element.append(html)

	                if (this.options.value) {
	                    var days
	                    var args = {}
	                    switch ($.type(this.options.value)) {
	                        case 'string': // data-value="135" data-value="1,3,5"
	                            days = this.options.value.split(
	                                this.options.value.indexOf(',') != -1 ? ',' : ''
	                            )
	                            _.each(days, function(item /*, index*/ ) {
	                                args[$.trim(item)] = HOURS
	                            })
	                            break
	                        case 'array': // data-value="[1,3,5]"
	                            days = this.options.value
	                            _.each(days, function(item /*, index*/ ) {
	                                args[item] = HOURS
	                            })
	                            break
	                        case 'object': // data-value="{1:[0,2,4]}"
	                            args = this.options.value
	                            break
	                    }
	                    this.val(args)
	                }

	                this.$manager.delegate(this.$element, this)

	                /* jshint unused:true */
	                $('.picker-hours', this.$element)
	                    .contents()
	                    .filter(function(index, element) {
	                        return element.nodeType === 3
	                    })
	                    .remove()

	                var hours = $('.picker-hour', this.$element)
	                hours.on('mousedown', function(event) {
	                    var $target = $(this)
	                    var has = !$target.hasClass('active')
	                    $target.toggleClass('active')
	                    that._merge()
	                    that._syncShortcut()

	                    var siblings = $(this).siblings()
	                    siblings.on('mouseenter.drag' + NAMESPACE, function(event) {
	                        var $target = $(this)
	                        $target[has ? 'addClass' : 'removeClass']('active')
	                        that._merge()
	                        that._syncShortcut()
	                        event.preventDefault()
	                    })
	                    $(document.body).off('mouseup.drag' + NAMESPACE)
	                        .on('mouseup.drag' + NAMESPACE, function( /*event*/ ) {
	                            siblings.off('mouseenter.drag' + NAMESPACE)
	                            $(document.body).off('mouseup.drag' + NAMESPACE)

	                            that.trigger('change' + NAMESPACE, that.val())
	                        })
	                    event.preventDefault()
	                })
	            },
	            // { day: [] }
	            // day, hours []
	            val: function() {
	                // val()
	                if (!arguments.length) return this._get()

	                // val( value )
	                // picker-day picker-hour
	                this._set.apply(this, arguments)
	                this.trigger('change' + NAMESPACE, this._get())
	                return this
	            },
	            /* jshint unused:true */
	            shortcut: function(event, days) {
	                if (days === undefined) {
	                    days = event
	                    event = undefined
	                }

	                // days += ''
	                if (!_.isArray(days)) days = [days]
	                var mapped = {}
	                _.each(days, function(day /*, index*/ ) {
	                    mapped[day] = HOURS
	                })
	                this.val(mapped)
	            },
	            toggle: function(event, day) {
	                if (day === undefined) {
	                    day = event
	                    event = undefined
	                }

	                var tmpDayHours = this.val()[day]
	                if (tmpDayHours.length === 24) this.val(day, [])
	                else this.val(day, HOURS)
	                if (event) event.preventDefault()
	            },
	            apply: function(event, todo /* to|do|close */ , day) {
	                var that = this
	                var $target = $(event.target)
	                var $relatedElement = $('.apply-dialog', this.$element)
	                switch (todo) {
	                    case 'to':
	                        this._tmp = this._tmp || {}
	                        this._tmp.from = day
	                        this._tmp.$target = $target.css('visibility', 'visible')
	                        var offset = position($target, $relatedElement, 'bottom', 'right')
	                        var marginTop = parseInt($relatedElement.css('margin-top'), 10) || 0
	                        $relatedElement.show().offset({
	                            left: offset.left,
	                            top: offset.top + marginTop
	                        })
	                        $relatedElement
	                            .find('label[data-value]').removeClass('disabled')
	                            .find('input[name="shortcut"]').prop({
	                                'checked': false,
	                                'disabled': false
	                            }).end().end()
	                            .find('label[data-value=' + day + ']').addClass('disabled')
	                            .find('input').prop('disabled', true)
	                        break
	                    case 'do':
	                        var days = _.map($relatedElement.find('input:checked'), function(item /*, index*/ ) {
	                            return item.value
	                        })
	                        var hours = this.val()[this._tmp.from]
	                        _.each(days, function(day /*, index*/ ) {
	                            that.val(day, hours)
	                        })
	                        $relatedElement.hide()
	                        this._tmp.$target.css('visibility', 'inherit')
	                        break
	                    case 'close':
	                        this._tmp.$target.css('visibility', 'inherit')
	                        $relatedElement.hide()
	                }
	            },
	            _get: function() {
	                var result = {}
	                var dayElements = this.$element.find('.picker-day')
	                var hourElements
	                var tmp
	                _.each(dayElements, function(item /*, index*/ ) {
	                    item = $(item)
	                    tmp = []
	                    hourElements = item.find('.picker-hour.active')
	                    _.each(hourElements, function(item /*, index*/ ) {
	                        tmp.push(+$(item).attr('data-value'))
	                    })
	                    result[item.attr('data-value')] = tmp
	                })
	                return result
	            },
	            // { day: [] }
	            // day, hours []
	            _set: function(mapped) {
	                var args = [].slice.call(arguments)
	                var dayElements = this.$element.find('.picker-day')

	                // 设置单日
	                if (arguments.length === 2) {
	                    mapped = {}
	                    mapped[args[0]] = args[1]

	                    // 先清除单日数据
	                    dayElements.filter('[data-value=' + args[0] + ']').find('.picker-hour').removeClass('active')
	                } else {
	                    // 设置整周，先清除整周数据
	                    dayElements.find('.picker-hour').removeClass('active')
	                }

	                var hourElements
	                _.each(mapped, function(hours, day) {
	                    hourElements = dayElements.filter('[data-value=' + day + ']').find('.picker-hour')
	                    _.each(hours, function(hour /*, index*/ ) {
	                        hourElements.filter('[data-value=' + hour + ']').addClass('active')
	                    })
	                })

	                this._merge()
	                this._syncShortcut()
	            },
	            _merge: function() {
	                var hours = $('.picker-hour', this.$element)
	                _.each(hours, function(item /*, index*/ ) {
	                    item = $(item)
	                    var start = item.find('.picker-hour-start')
	                    var end = item.find('.picker-hour-end')
	                    if (!item.hasClass('active')) {
	                        start.hide()
	                        end.hide()
	                    } else {
	                        // start.show()
	                        // end.show()
	                        start[
	                            item.prev().hasClass('active') ? 'hide' : 'show'
	                        ]()
	                        end[
	                            item.next().hasClass('active') ? 'hide' : 'show'
	                        ]()
	                    }
	                })
	            },
	            _syncShortcut: function() {
	                if (this.options.simplify) return

	                var value = this.val()

	                function is(days, other) {
	                    var day
	                    for (var i = 0; i < days.length; i++) {
	                        day = days[i]
	                        if (value[day].length < 24) return false
	                    }
	                    for (var j = 0; j < other.length; j++) {
	                        day = other[j]
	                        if (value[day].length !== 0) return false
	                    }

	                    return true
	                }

	                $('.shortcuts input[name=shortcut]:eq(0)', this.$element).prop('checked', is('0123456', ''))
	                $('.shortcuts input[name=shortcut]:eq(1)', this.$element).prop('checked', is('12345', '06'))
	                $('.shortcuts input[name=shortcut]:eq(2)', this.$element).prop('checked', is('06', '12345'))
	            },
	            destroy: function() {
	                this.$manager.undelegate(this.$element)

	                this.$element.empty()
	            }
	        })

	        return HourPicker
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"hourpicker\">\n" +
	        "    <div class=\"apply-dialog\">\n" +
	        "        <div class=\"apply-dialog-body\">\n" +
	        "            <% for ( var i = 0; i < DICT.length; i++ ) { %>\n" +
	        "            <label data-value=\"<%= DICT[i][0] %>\"><input type=\"checkbox\" name=\"shortcut\" value=\"<%= DICT[i][0] %>\"> <%= DICT[i][1] %></label>\n" +
	        "            <% } %>\n" +
	        "        </div>\n" +
	        "        <div class=\"apply-dialog-footer\">\n" +
	        "            <button type=\"button\" class=\"btn btn-default submit\" bx-click=\"apply('do')\">确认</button>\n" +
	        "            <a href=\"javascript: void(0);\" bx-click=\"apply('close')\" class=\"btn btn-default cancel ml5\">取消</a>\n" +
	        "        </div>\n" +
	        "    </div>\n" +
	        "    <div class=\"shortcuts <%= simplify ? 'hide' : '' %>\">\n" +
	        "        <label class=\"mr50\">\n" +
	        "            <input type=\"radio\" bx-change=\"shortcut([0,1,2,3,4,5,6])\" name=\"shortcut\">\n" +
	        "            全日程投放\n" +
	        "        </label>\n" +
	        "        <label class=\"mr50\">\n" +
	        "            <input type=\"radio\" bx-change=\"shortcut([1,2,3,4,5])\" name=\"shortcut\">\n" +
	        "            工作日（周一至周五）投放\n" +
	        "        </label>\n" +
	        "        <label>\n" +
	        "            <input type=\"radio\" bx-change=\"shortcut([0,6])\" name=\"shortcut\">\n" +
	        "            休息日（周六、周日）投放\n" +
	        "        </label>\n" +
	        "        <div class=\"utc\">当前排期时间：GMT <%= utcOffset %></div>\n" +
	        "    </div>\n" +
	        "    <table class=\"picker-days\">\n" +
	        "        <thead>\n" +
	        "            <tr>\n" +
	        "                <td width=\"160\">时间段</td>\n" +
	        "                <td class=\"picker-day-range\">\n" +
	        "                    <span class=\"item item-0\">0:00</span>\n" +
	        "                    <span class=\"item item-6\">6:00</span>\n" +
	        "                    <span class=\"item item-12\">12:00</span>\n" +
	        "                    <span class=\"item item-18\">18:00</span>\n" +
	        "                    <span class=\"item item-24\">24:00</span>\n" +
	        "                </td>\n" +
	        "                <td width=\"160\" align=\"center\">操作</td>\n" +
	        "            </tr>\n" +
	        "        </thead>\n" +
	        "        <tbody>\n" +
	        "            <% for ( var i = 0; i < DICT.length; i++ ) { %>\n" +
	        "            <tr class=\"picker-day\" data-value=\"<%= DICT[i][0] %>\">\n" +
	        "                <td class=\"picker-label\">\n" +
	        "                    <span bx-click=\"toggle(<%= DICT[i][0] %>)\"><%= DICT[i][1] %></span>\n" +
	        "                </td>\n" +
	        "                <td class=\"\">\n" +
	        "                    <div class=\"picker-hours\">\n" +
	        "                        <% for ( var ii = 0; ii < 24; ii++ ) { %>\n" +
	        "                        <div class=\"picker-hour <%= ii % 6 === 0 ? 'milestone' : ''%>\" data-value=<%= ii %>>\n" +
	        "                            <div class=\"picker-hour-line\"></div>\n" +
	        "                            <div class=\"picker-hour-duration\"></div>\n" +
	        "                            <div class=\"picker-hour-start bottom\">\n" +
	        "                                <div class=\"picker-hour-arrow arrow\"></div>\n" +
	        "                                <span><%= ii %>:00</span>\n" +
	        "                            </div>\n" +
	        "                            <div class=\"picker-hour-end top\">\n" +
	        "                                <div class=\"picker-hour-arrow arrow\"></div>\n" +
	        "                                <span><%= ii+1 %>:00</span>\n" +
	        "                            </div>\n" +
	        "                        </div>\n" +
	        "                        <% } %>\n" +
	        "                        <div class=\"picker-hour milestone\">\n" +
	        "                            <div class=\"picker-hour-line\"></div>\n" +
	        "                        </div>\n" +
	        "                    </div>\n" +
	        "                </td>\n" +
	        "                <td align=\"center\">\n" +
	        "                    <div class=\"operation\">\n" +
	        "                        <a bx-click=\"apply('to', <%= DICT[i][0] %>)\" href=\"javascript: void(0);\">复制到</a>\n" +
	        "                    </div>\n" +
	        "                </td>\n" +
	        "            </tr>\n" +
	        "            <% } %>\n" +
	        "        </tbody>\n" +
	        "    </table>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;