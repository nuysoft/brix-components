(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("moment"), require("brix/loader"), require("components/base"), require("brix/event"), require("components/datepicker/ancient"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "moment", "brix/loader", "components/base", "brix/event", "components/datepicker/ancient"], factory);
	else if(typeof exports === 'object')
		exports["components/datepickerwrapper"] = factory(require("jquery"), require("underscore"), require("moment"), require("brix/loader"), require("components/base"), require("brix/event"), require("components/datepicker/ancient"));
	else
		root["components/datepickerwrapper"] = factory(root["jquery"], root["underscore"], root["moment"], root["brix/loader"], root["components/base"], root["brix/event"], root["components/datepicker/ancient"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, document */
	/*
	    http://thx.github.io/brix-site/readme.html?name=DatePickerWrapper
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/datepickerwrapper/
	        Temporary

	    # DatePickerWrapper

	    日期选择器。

	    ```html
	    <input bx-name="components/datepickerwrapper" type="text" class="form-control w100">

	    <div bx-name="components/datepickerwrapper" 
	        data-dates="[ '2015-1-1', '2015-1-2']" 
	        class="form-control datepickerwrapper-trigger">
	        <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
	        <i class="brixfont pull-right ml5 down">&#xe623;<!--&#xe623;--></i>
	        <i class="brixfont pull-right ml5 up">&#xe62e;<!--&#xe62e;--></i>
	    </div>
	    ```

	    ## 配置

	    配置项    | 类型              | 默认值   | 说明
	    :-------- | :---------------- | :------- | :----------
	    shortcuts | boolean or object | `{}`     | 指示是否开启快捷日期和快捷日期的内容。
	    dates     | array             | `[]`     | 初始日期。
	    ranges    | array             | `[]`     | 设置可选日期的范围。
	    excludeds | array             | `[]`     | 设置禁选日期的范围。
	    align     | string            | `'left'` | 指定浮层的对齐方式，可选值有 `'left'`、`'right'`。

	    ## 方法

	    * .shortcutText( dates )
	        获取日期对应的快捷日期文本。
	    * .val( [ value ] )
	        获取或设置选中的日期。
	    * .range( [ value ] )
	        获取或设置可选日期的范围。
	    * .excluded( [ value ] )
	        获取或设置禁选日期的范围。
	    
	    ## 事件

	    事件类型                 | 说明
	    :----------------------- | :----------
	    change.datepickerwrapper | 当日期组件变化时被触发。事件监听函数接受 3 个参数：event、dates。

	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(4),
	        __webpack_require__(5), __webpack_require__(6), __webpack_require__(7),
	        __webpack_require__(8),
	        __webpack_require__(9),
	        __webpack_require__(10)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, moment,
	        Loader, Brix, EventManager,
	        DatePicker,
	        position,
	        template
	    ) {
	        var CALENDAR = 'components/datepicker/ancient'
	        var RE_INPUT = /^input|textarea$/i
	        var NAMESPACE = '.datepickerwrapper'
	            // var NAMESPACE_ORIGINAL = '.original'
	        var DATE_PATTERN = DatePicker.PATTERNS.DATE
	        var TIME_PATTERN = DatePicker.PATTERNS.TIME
	        var DATE_TIME_PATTERN = DatePicker.PATTERNS.DATE_TIME
	        var SHORTCUTS = function() {
	            var now = moment()
	            var nowDate = now.get('date')
	            var shortcuts = {
	                '今天': [
	                    moment().startOf('day'),
	                    moment().startOf('day')
	                ],
	                '昨天': [
	                    moment().startOf('day').subtract(1, 'days'),
	                    moment().startOf('day').subtract(1, 'days')
	                ],
	                '过去 7 天': [
	                    moment().startOf('day').subtract(7, 'days'),
	                    moment().startOf('day').subtract(1, 'days')
	                ],
	                '本月': [
	                    moment().startOf('day').subtract(nowDate - 1, 'days'),
	                    moment().startOf('day')
	                ],
	                '上月': [
	                    moment().startOf('day').startOf('month').subtract(1, 'month'),
	                    moment().startOf('day').startOf('month').subtract(1, 'days')
	                ],
	                '最近 15 天': [
	                    moment().startOf('day').subtract(15, 'days'),
	                    moment().startOf('day').subtract(1, 'days')
	                ]
	            }
	            return shortcuts
	        }()
	        var STATE = {
	            PENDING: 'pending',
	            ACTIVE: 'active',
	            INACTIVE: 'inactive'
	        }

	        function DatePickerWrapper() {}

	        DatePickerWrapper.DATE_PATTERN = DATE_PATTERN
	        DatePickerWrapper.TIME_PATTERN = TIME_PATTERN
	        DatePickerWrapper.DATE_TIME_PATTERN = DATE_TIME_PATTERN
	        DatePickerWrapper.SHORTCUTS = SHORTCUTS

	        _.extend(DatePickerWrapper.prototype, Brix.prototype, {
	            options: {
	                calendar: CALENDAR,

	                placement: 'bottom', // top bottom left right
	                align: 'left', // left right top bottom
	                offset: {},

	                mode: 'signal', // signal multiple
	                shortcuts: SHORTCUTS,
	                type: 'date', // all date year month time
	                dates: [],
	                ranges: [],
	                excludeds: [],
	                unlimits: [],
	                pages: 1
	            },
	            init: function() {
	                // 修正选项
	                this.options.typeMap = DatePicker.parseTypeAsMap(this.options.type)
	                if (this.options.dates.length > 1) this.options.mode = 'multiple'
	                if (!this.options.dates.length) this.options.dates = [moment().startOf('day').format(DATE_PATTERN)]
	                if (this.options.shortcuts) {
	                    _.each(this.options.shortcuts, function(dates /*, title*/ ) {
	                        _.each(dates, function(date, index) {
	                            dates[index] = moment(
	                                date,
	                                _.isString(date) && DATE_TIME_PATTERN
	                            )
	                        })
	                    })
	                }

	                // ranges
	                if (this.options.range && this.options.range.length) this.options.ranges = this.options.range
	                this.options.ranges = _.flatten(this.options.ranges || this.options.range)
	                _.each(this.options.ranges, function(date, index, ranges) {
	                    if (date) ranges[index] = moment(
	                        date,
	                        _.isString(date) && DATE_TIME_PATTERN
	                    )
	                })
	                this.options._ranges = _.map(this.options.ranges, function(date) {
	                    if (date) return date.format(DATE_PATTERN)
	                })
	                this.options._ranges = "['" + this.options._ranges.join("','") + "']"

	                // excludeds
	                if (this.options.excluded && this.options.excluded.length) this.options.excludeds = this.options.excluded
	                this.options.excludeds = _.flatten(this.options.excludeds || this.options.excluded)
	                _.each(this.options.excludeds, function(date, index, excludeds) {
	                    if (date) excludeds[index] = moment(
	                        date,
	                        _.isString(date) && DATE_TIME_PATTERN
	                    )
	                })
	                this.options._excludeds = _.map(this.options.excludeds, function(date) {
	                    if (date) return date.format(DATE_PATTERN)
	                })
	                this.options._excludeds = this.options._excludeds.length ?
	                    "['" + this.options._excludeds.join("','") + "']" :
	                    "[]"


	                // if (this.options.unlimits.length) {
	                //     _.each(this.options.unlimits, function(date, index, unlimits) {
	                //         if (date) unlimits[index] = moment(date)
	                //     })
	                // }

	                // 支持自定义 HTML 模板 template
	                template = this.options.template || template

	                // 支持自定义 CSS 样式
	                if (this.options.css) window.require('css!' + this.options.css)
	            },
	            render: function() {
	                var that = this
	                this.$element = $(this.element)
	                this.$relatedElement = $(
	                    _.template(template)(this.options)
	                ).insertAfter(this.$element)

	                var defer = $.Deferred()
	                this['_' + this.options.mode](defer)

	                var type = 'click.datepickerwrapper_toggle_' + this.clientId
	                this.$element.off(type)
	                    .on(type, function(event) {
	                        that.toggle(event)
	                    })

	                var $manager = this.$manager = new EventManager('bx-')
	                $manager.delegate(this.$element, this)
	                $manager.delegate(this.$relatedElement, this)

	                this._autoHide()

	                return defer.promise()
	            },
	            val: function(value) {
	                var pickerComponents = Loader.query(CALENDAR, this.$relatedElement)
	                if (value) {
	                    _.each(pickerComponents, function(item, index) {
	                        item.val(
	                            _.isArray(value) ? value[index] : value
	                        )
	                    })

	                    this.submit() // #44 #50
	                    return this
	                }
	                return _.map(pickerComponents, function(item /*, index*/ ) {
	                    return item.val()
	                })
	            },
	            range: function(value) {
	                var pickerComponents = Loader.query(CALENDAR, this.$relatedElement)
	                if (value) {
	                    this.options.ranges = value = _.flatten(value)
	                    _.each(pickerComponents, function(item /*, index*/ ) {
	                        item.range(value)
	                    })
	                    return this
	                }
	                return this.options.ranges
	            },
	            excluded: function(value) {
	                var pickerComponents = Loader.query(CALENDAR, this.$relatedElement)
	                if (value) {
	                    this.options.excludeds = value = _.flatten(value)
	                    _.each(pickerComponents, function(item /*, index*/ ) {
	                        item.excluded(value)
	                    })
	                    return this
	                }
	                return this.options.excludeds
	            },
	            _signal: function(defer) {
	                var that = this
	                Loader.boot(true, this.$relatedElement, function( /*records*/ ) {
	                    var pickerComponent = Loader.query(CALENDAR, that.$relatedElement)[0]
	                        /* jshint unused:false */
	                    pickerComponent.on('change.datepicker unchange.datepicker', function(event, date, type) {
	                        // 过滤 timepicker 中的 input 触发的原生 change 事件
	                        if (!date) {
	                            event.preventDefault()
	                            event.stopPropagation()
	                            return
	                        }
	                        if (type !== undefined && type !== 'date' && type !== 'time') return
	                        if (that.options.typeMap.time && type === 'date') return

	                        that.hide()

	                        var validate = $.Event('change' + NAMESPACE)
	                        that.trigger(validate, [
	                            [date], type
	                        ])
	                        if (!validate.isDefaultPrevented()) {
	                            var value = that._unlimitFilter(date, that.options.unlimits[0])
	                            var items = $('[data-index]', that.$element)
	                            if (items.length) {
	                                _.each(items, function(item, index) {
	                                    var $item = $(item)
	                                    $item[
	                                        RE_INPUT.test(item.nodeName) ? 'val' : 'html'
	                                    ](value)
	                                })
	                            } else {
	                                that.$element[
	                                    RE_INPUT.test(that.element.nodeName) ? 'val' : 'html'
	                                ](value)
	                            }

	                            // 单个日期选择器：自动触发 input 元素的 change 事件。</h4>
	                            // 单个日期选择器：自动同步至隐藏域，并触发隐藏域的 change 事件。</h4>
	                            that.$element.triggerHandler('change') //  + NAMESPACE + NAMESPACE_ORIGINAL, date
	                            if (!RE_INPUT.test(that.element.nodeName)) {
	                                $('[data-hidden-index]', that.$element)
	                                    .val(value)
	                                    .triggerHandler('change')
	                            }
	                        }
	                    })
	                    pickerComponent.$element.on('click', '.timepicker .timepicker-footer .cancel', function() {
	                        that.hide()
	                    })

	                    if (defer) defer.resolve()
	                })
	            },
	            _multiple: function(defer) {
	                var that = this
	                Loader.boot(true, this.$relatedElement, function() {
	                    var inputWrapper = $('.datepickerwrapper-inputs', that.$relatedElement)
	                    var inputs = $('input', inputWrapper)

	                    var pickerWrapper = $('.datepickerwrapper-pickers', that.$relatedElement)
	                    var pickers = $('.picker', pickerWrapper)

	                    var pickerComponents = Loader.query(CALENDAR, that.$relatedElement)

	                    var shortcutWrapper = $('.datepickerwrapper-shortcuts', that.$relatedElement)
	                    var shortcuts = $('.shortcut', shortcutWrapper)

	                    if (that.options.shortcuts) {
	                        _.each(_.values(that.options.shortcuts), function(dates, index) {
	                            var same = true
	                            _.each(dates, function(date, index) {
	                                var optionDate = moment(
	                                    that.options.dates[index],
	                                    _.isString(that.options.dates[index]) && DATE_TIME_PATTERN
	                                )
	                                if (!date.isSame(optionDate, 'days')) same = false
	                            })
	                            if (same) {
	                                shortcuts.eq(index).addClass('active')
	                                    .siblings().removeClass('active')
	                            }
	                        })
	                    }

	                    _.each(inputs, function(item, index) {
	                        $(item)
	                            .val(
	                                moment(
	                                    that.options.dates[index],
	                                    _.isString(that.options.dates[index]) && DATE_TIME_PATTERN
	                                )
	                                .format(DATE_PATTERN)
	                            ) // 初始值
	                    })

	                    _.each(pickerComponents, function(item, index) {
	                        /* jshint unused:false */
	                        item.val(that.options.dates[index])
	                            .on('change.datepicker unchange.datepicker ', function(event, date, type) {
	                                if (type !== undefined && type !== 'date' && type !== 'time') return
	                                if (that.options.typeMap.time && type === 'date') return

	                                var value = that._unlimitFilter(date, that.options.unlimits[index])
	                                inputs.eq(index).val(value)
	                                pickers.eq(index).hide()
	                            })
	                        var value = that._unlimitFilter(
	                            moment(
	                                that.options.dates[index],
	                                _.isString(that.options.dates[index]) && DATE_TIME_PATTERN
	                            ),
	                            that.options.unlimits[index]
	                        )
	                        inputs.eq(index).val(value)
	                        item.$element.on('click', '.timepicker .timepicker-footer .cancel', function() {
	                            pickers.eq(index).hide()
	                        })
	                    })

	                    if (defer) defer.resolve()
	                })
	            },
	            _unlimitFilter: function(date, unlimit) {
	                var typeMap = this.options.typeMap
	                var pattern = typeMap.date && typeMap.time && DATE_TIME_PATTERN ||
	                    typeMap.date && DATE_PATTERN ||
	                    typeMap.time && TIME_PATTERN
	                var text = date.format(pattern)
	                if (unlimit && text === moment(
	                        unlimit,
	                        _.isString(unlimit) && DATE_TIME_PATTERN
	                    ).format(pattern)) text = '不限'
	                return text
	            },
	            _inputToggleDatePicker: function(event, index, type) {
	                var inputWrapper = $('.datepickerwrapper-inputs', this.$relatedElement)
	                var pickerWrapper = $('.datepickerwrapper-pickers', this.$relatedElement)
	                var pickers = $('.picker', pickerWrapper)

	                var inputWrapperOffset = inputWrapper.offset()
	                pickerWrapper.offset({ // 修正日期组件容器的位置
	                    left: inputWrapperOffset.left,
	                    top: inputWrapperOffset.top + inputWrapper.outerHeight() + (
	                        parseInt(pickerWrapper.css('margin-top'), 10) ||
	                        0
	                    )
	                })

	                var $picker = pickers.eq(index)
	                var $target = $(event.target)
	                var targetOffset = $target.offset()
	                var pickerLeft
	                switch (this.options.align) {
	                    case 'left':
	                        pickerLeft = targetOffset.left
	                        break
	                    case 'right':
	                        pickerLeft = targetOffset.left - ($picker.outerWidth() - $target.outerWidth())
	                }
	                $picker[type ? type : 'toggle']()
	                    .offset({ // 修正单个日期组件的位置
	                        left: pickerLeft
	                    })
	                    .siblings().hide()
	            },
	            _hideDatePicker: function( /*event*/ ) {
	                var pickerWrapper = $('.datepickerwrapper-pickers', this.$relatedElement)
	                var pickers = $('.picker', pickerWrapper)
	                pickers.hide()
	            },
	            show: function( /*event*/ ) {
	                this.$element.addClass('datepickerwrapper-open')
	                this.$relatedElement.show()
	                    .offset(this._offset())
	                Loader.query(CALENDAR, this.$relatedElement).beautify()
	            },
	            hide: function( /*event*/ ) {
	                this.$element.removeClass('datepickerwrapper-open')
	                this._hideDatePicker()
	                this.$relatedElement.hide()
	            },
	            toggle: function( /*event*/ ) {
	                this.$element.toggleClass('datepickerwrapper-open')
	                this.$relatedElement.toggle()
	                    .offset(this._offset())
	                Loader.query(CALENDAR, this.$relatedElement).beautify()
	            },
	            _offset: function() {
	                var offset = position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
	                var relatedMarginLeft = parseInt(this.$relatedElement.css('margin-left'), 10) || 0
	                var relatedMarginTop = parseInt(this.$relatedElement.css('margin-top'), 10) || 0
	                return {
	                    left: offset.left + relatedMarginLeft + (this.options.offset.left || 0),
	                    top: offset.top + relatedMarginTop + (this.options.offset.top || 0)
	                }
	            },
	            submit: function(event /* jshint unused:false */ , from) {
	                var that = this

	                switch (from) {
	                    case 'shortcut':
	                        break
	                    default:
	                        var shortcutWrapper = $('.datepickerwrapper-shortcuts', that.$relatedElement)
	                        var shortcuts = $('.shortcut', shortcutWrapper)
	                        shortcuts.removeClass('active')
	                }

	                var pickerComponents = Loader.query(CALENDAR, this.$relatedElement)
	                var dates = _.map(pickerComponents, function(item /*, index*/ ) {
	                    return item.val()
	                })

	                this.hide()

	                var validate = $.Event('change' + NAMESPACE)
	                this.trigger(validate, [dates])

	                if (!validate.isDefaultPrevented()) {
	                    var items = $('[data-index]', this.$element)
	                    if (items.length) {
	                        _.each(items, function(item, index) {
	                            var $item = $(item)
	                            index = +$item.attr('data-index')
	                            $item[
	                                RE_INPUT.test(item.nodeName) ? 'val' : 'html'
	                            ](
	                                that._unlimitFilter(dates[index], that.options.unlimits[index])
	                            )

	                        })
	                    } else {
	                        this.$element[
	                            RE_INPUT.test(this.element.nodeName) ? 'val' : 'html'
	                        ](
	                            _.map(dates, function(item, index) {
	                                return that._unlimitFilter(item, that.options.unlimits[index])
	                            }).join(', ')
	                        )
	                    }

	                    // 多个日期选择器：自动同步至隐藏域，并触发隐藏域的 change 事件。
	                    items = $('[data-hidden-index]', this.$element)
	                    _.each(items, function(item, index) {
	                        var $item = $(item)
	                        index = +$item.attr('data-hidden-index')
	                        var value = that._unlimitFilter(dates[index], undefined)
	                        $item.val(value).trigger('change')
	                    })
	                }
	            },
	            shortcutText: function(dates) {
	                var shortcutText
	                _.each(this.options.shortcuts, function(shortcutDates, key) {
	                    if (shortcutText) return

	                    var same = true
	                    _.each(shortcutDates, function(shortcutDate, index) {
	                        if (!shortcutDate.isSame(dates[index], 'days')) same = false
	                    })
	                    if (same) shortcutText = key
	                })
	                return shortcutText
	            },
	            _change: function(event, type, index) {
	                var that = this
	                var $target = $(event.target)
	                var pickerComponents = Loader.query(CALENDAR, this.$relatedElement)

	                switch (type) {
	                    case 'shortcut':
	                        var dates = $target.attr('data-value').split(',')
	                        _.each(dates, function(item, index) {
	                            that.options.dates[index] = item
	                            pickerComponents[index].val(item)
	                        })

	                        $target.addClass('active')
	                            .siblings().removeClass('active')

	                        this.submit(event, type)
	                        break
	                    case 'date':
	                        var date = moment($target.val())
	                        if (!date.isValid()) break
	                        pickerComponents[index].val(date)
	                        break
	                }
	            },
	            _autoHide: function() {
	                var that = this
	                var type = 'click' + NAMESPACE + '_' + this.clientId
	                this._state = STATE.INACTIVE
	                $(document.body).off(type)
	                    .on(type, function(event) {
	                        // 点击不存在节点
	                        if (!$.contains(document.body, event.target)) return
	                        if (
	                            event.target === that.element || // 点击组件节点
	                            $.contains(that.element, event.target) || // 点击组件子节点
	                            event.target === that.$relatedElement[0] || // 点击关联节点
	                            $.contains(that.$relatedElement[0], event.target) // 点击组件关联子节点
	                        ) {
	                            if (that._state === STATE.ACTIVE) return
	                            that.trigger(
	                                $.Event('active' + NAMESPACE, {
	                                    target: event.target
	                                })
	                            )
	                            that._state = STATE.ACTIVE
	                            return
	                        }

	                        if (that._state === STATE.INACTIVE) return
	                        var inactiveEvent = $.Event('inactive' + NAMESPACE, {
	                            target: event.target
	                        })
	                        that.trigger(inactiveEvent)
	                        that._state = STATE.INACTIVE

	                        if (inactiveEvent.isDefaultPrevented()) return

	                        that.hide()
	                    })
	                    .on(type, function(event) {
	                        var inputWrapper = $('.datepickerwrapper-inputs-body', that.$relatedElement)
	                        var pickerWrapper = $('.datepickerwrapper-pickers', that.$relatedElement)
	                        if (
	                            ( // 点击关联节点，点击组件关联子节点
	                                event.target === that.$relatedElement[0] ||
	                                $.contains(that.$relatedElement[0], event.target)
	                            ) &&
	                            ( // 但不在 inputs 和 pickers 之内
	                                (inputWrapper.length && pickerWrapper.length) &&
	                                !$.contains(inputWrapper[0], event.target) &&
	                                !$.contains(pickerWrapper[0], event.target)
	                            )
	                        ) {
	                            that._hideDatePicker()
	                        }
	                    })
	            },
	            destroy: function() {
	                var type = 'click.datepickerwrapper_toggle_' + this.clientId
	                this.$element.off(type)

	                this.$manager.undelegate(this.$element, this)
	                this.$manager.undelegate(this.$relatedElement, this)

	                this.$relatedElement.remove()

	                type = 'click' + NAMESPACE + '_' + this.clientId
	                $(document.body).off(type)
	            }
	        })

	        return DatePickerWrapper
	            // return Brix.extend({})
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"datepickerwrapper <%= placement %> <%= mode === 'multiple' ? 'multiple' : 'single' %>\">\n" +
	        "    <!--  -->\n" +
	        "    <% if (mode === 'signal') { %>\n" +
	        "    <div bx-name=\"<%= calendar %>\" data-type=\"<%= type %>\" data-date=\"<%= dates[0] %>\" data-range=\"<%= _ranges %>\" data-excluded=\"<%= _excludeds %>\" data-unlimit=\"<%= unlimits[0] %>\" data-pages=\"<%= pages %>\" class=\"picker\"></div>\n" +
	        "    <% } %>\n" +
	        "    <!--  -->\n" +
	        "    <% if (mode === 'multiple') { %>\n" +
	        "    <% if( shortcuts ) { %>\n" +
	        "    <div class=\"datepickerwrapper-shortcuts form-inline form-group\">\n" +
	        "        <div class=\"datepickerwrapper-shortcuts-header\">\n" +
	        "            <div class=\"datepickerwrapper-shortcuts-header-title\">快捷日期</div>\n" +
	        "        </div>\n" +
	        "        <div class=\"datepickerwrapper-shortcuts-body clearfix\">\n" +
	        "            <% for (var title in shortcuts) { %>\n" +
	        "                <span bx-click=\"_change('shortcut')\" data-value=\"<%= \n" +
	        "                    _.map(shortcuts[title], function(item) {\n" +
	        "                        return item.format('YYYY-MM-DD HH:mm:ss')\n" +
	        "                    }).join(',')\n" +
	        "                %>\" class=\"shortcut\"><%= title %></span>\n" +
	        "            <% } %>\n" +
	        "        </div>\n" +
	        "    </div>\n" +
	        "    <% } %>\n" +
	        "    <div class=\"datepickerwrapper-inputs form-inline form-group\">\n" +
	        "        <div class=\"datepickerwrapper-inputs-header\">\n" +
	        "            <div class=\"datepickerwrapper-inputs-header-title\">日期范围</div>\n" +
	        "        </div>\n" +
	        "        <div class=\"datepickerwrapper-inputs-body <%= typeMap.time ? 'time' : '' %>\">\n" +
	        "            <% for (var i = 0; i < dates.length; i++ ) { %>\n" +
	        "                <input bx-click=\"_inputToggleDatePicker(<%= i %>)\" bx-change=\"_change('date', <%= i %>)\" value=\"<%= dates[i] %>\" type=\"text\" class=\"form-control\">\n" +
	        "                <%= i < dates.length -1 ? '-' : '' %>\n" +
	        "            <% } %>\n" +
	        "        </div>\n" +
	        "    </div>\n" +
	        "    <div class=\"datepickerwrapper-pickers\">\n" +
	        "        <% for (var i = 0; i < dates.length; i++ ) { %>\n" +
	        "            <div bx-name=\"<%= calendar %>\" data-type=\"<%= type %>\" data-date=\"<%= dates[i] %>\" data-range=\"<%= _ranges %>\" data-excluded=\"<%= _excludeds %>\" data-unlimit=\"<%= unlimits[i] %>\" data-pages=\"<%= pages %>\" class=\"picker\"></div>\n" +
	        "        <% } %>\n" +
	        "    </div>\n" +
	        "    <div class=\"datepickerwrapper-footer\">\n" +
	        "        <button class=\"btn btn-default submit\" bx-click=\"submit\">确认</button>\n" +
	        "        <a href=\"javascript: void(0);\" bx-click=\"hide\" class=\"btn btn-default cancel ml5\">取消</a>\n" +
	        "    </div>\n" +
	        "    <% } %>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;