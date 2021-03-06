/* global define, document */
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
define(
    [
        'jquery', 'underscore', 'moment',
        'brix/loader', 'components/base', 'brix/event',
        'components/datepicker/ancient',
        '../dialog/position/position.js',
        './datepickerwrapper.tpl.js'
    ],
    function(
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
                shortcuts: undefined,
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
                this.options.__NEED_FIXED_RENDER = this.options.dates.length !== 0
                if (this.options.dates.length > 1) this.options.mode = 'multiple'
                if (!this.options.dates.length) this.options.dates = [moment().startOf('day').format(DATE_PATTERN)]

                if (this.options.shortcuts === undefined) this.options.shortcuts = DatePickerWrapper.SHORTCUTS
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
                if (this.options.__NEED_FIXED_RENDER) this._fixedRender()
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
                    pickerComponent.$element
                        .on('click', '.timepicker .timepicker-footer .cancel', function() { // components/datepicker
                            that.hide()
                        })
                        .on('click', '.hour-minute-second .hour-minute-second-footer .cancel', function() { // components/datepicker/ancient
                            that.hide()
                        })

                    if (defer) defer.resolve()
                })
            },
            _multiple: function(defer) {
                var that = this
                if (this.options.__NEED_FIXED_RENDER) this._fixedRender()
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
                                if(!date) return
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
                        item.$element
                            .on('click', '.timepicker .timepicker-footer .cancel', function() { // components/datepicker
                                pickers.eq(index).hide()
                            })
                            .on('click', '.hour-minute-second .hour-minute-second-footer .cancel', function() { // components/datepicker/ancient
                                pickers.eq(index).hide()
                            })
                    })

                    if (defer) defer.resolve()
                })
            },
            // 如果设置了初始值，则自动渲染到组件上。
            // TODO 单选和多选的更新也调用 _fixedRender()。
            _fixedRender: function() {
                var that = this
                var dates = that.options.dates
                var items = $('[data-index]', that.$element)
                if (items.length) {
                    _.each(items, function(item, index) {
                        var $item = $(item)
                        index = +$item.attr('data-index')
                        $item[RE_INPUT.test(item.nodeName) ? 'val' : 'html'](
                            that._unlimitFilter(
                                moment(dates[index], _.isString(dates[index]) && DATE_TIME_PATTERN),
                                that.options.unlimits[index]
                            )
                        )
                    })
                } else {
                    that.$element[RE_INPUT.test(that.element.nodeName) ? 'val' : 'html'](
                        _.map(dates, function(item, index) {
                            return that._unlimitFilter(
                                moment(item, _.isString(item) && DATE_TIME_PATTERN),
                                that.options.unlimits[index]
                            )
                        }).join(', ')
                    )
                }

                items = $('[data-hidden-index]', that.$element)
                _.each(items, function(item, index) {
                    var $item = $(item)
                    index = +$item.attr('data-hidden-index')
                    var value = that._unlimitFilter(
                        moment(dates[index], _.isString(dates[index]) && DATE_TIME_PATTERN),
                        undefined
                    )
                    $item.val(value)
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
                var align = this.options.aligns ? this.options.aligns[index] : this.options.align
                switch (align) {
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
    }
)