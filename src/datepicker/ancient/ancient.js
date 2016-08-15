/* global define */
/*
    Reference:
        [Bootstrap Component Sample](http://zombiej.github.io/bootstrap-components-3.0/)
    TODO
        multi types
        disable year month date
        disable input
        multi calendar
    Event Test Case
        $('body').on('ch ch.a ch.b', function(event) {
            console.log(event.type, event.namespace)
        })
        $('body').trigger('ch.a.b')

    Brix2 http://etaoux.github.io/brix/demo/gallery/calendar/calendar.html
 */
define(
    [
        'jquery', 'underscore', 'moment',
        'components/base', 'brix/event',
        './ancient.tpl.js'
    ],
    function(
        $, _, moment,
        Brix, EventManager,
        template
    ) {

        // 事件命名空间
        var NAMESPACE = '.datepicker'

        // 日历类型
        var TYPES = 'date year month day time hour minute second'
        TYPES = _.object(
            _.map(TYPES.split(/\s+/), function(item) {
                return [item.toUpperCase(), item]
            })
        )

        // 日历模式
        var MODES = 'single multiple range'
        MODES = _.object(
            _.map(MODES.split(/\s+/), function(item) {
                return [item.toUpperCase(), item]
            })
        )

        // 日期单位
        var UNITS = 'year quarter month day hour minute second millisecond' // plural s
        UNITS = _.object(
            _.map(UNITS.split(/\s+/), function(item) {
                return [item.toUpperCase(), item]
            })
        )

        // 常用格式，参见 http://momentjs.com/docs/#/displaying/format/
        var PATTERNS = {
            YYYY: 'YYYY',
            YYYY_MM: 'YYYY-MM',
            YYYY_MM_DD: 'YYYY-MM-DD',
            DATE: 'YYYY-MM-DD',
            TIME: 'HH:mm:ss',
            DATE_TIME: 'YYYY-MM-DD HH:mm:ss'
        }

        // 点击监听函数
        var ACTIVE_HANDLER_TPL = _.template('_active("<%= value %>", "<%= unit %>", "<%= pattern %>")')

        // 年份分页大小
        var YYYY_PERIOD_LIMIT = 20

        // 日期相对值正则
        var RE_REL_NUM = /^([+-])=(\d+)(.*)/

        // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        // ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月','十月', '十一', '十二']
        var MONTHS = _.map(_.range(1, 13), function(item) {
            return (item < 10 ? '0' : '') + item
        })

        // 修正 日期格式
        function FixPattern(date) {
            return moment(date, _.isString(date) && PATTERNS.DATE_TIME)
        }

        // 修正 相对值
        function FixRelNumAndPattern(date, relNumUnit) {
            relNumUnit = relNumUnit || 'day'

            // FixRelNumAndPattern( [ date, ... ] )
            if (_.isArray(date)) {
                return _.map(date, function(item /*, index*/ ) {
                    return FixRelNumAndPattern(item, relNumUnit)
                })
            }

            // FixRelNumAndPattern( date )
            var ma
            var isString = _.isString(date)
            return date ? (
                isString && (ma = RE_REL_NUM.exec(date)) ?
                moment().add((ma[1] + 1) * ma[2], relNumUnit) :
                moment(date, isString && PATTERNS.DATE_TIME)
            ) : moment()
        }

        // 获取 相对值 的 单位，取决于选项 type 的值
        function ParseRelNumUnit(typeMap) {
            return typeMap.day && 'day' ||
                typeMap.month && 'month' ||
                typeMap.year && 'year' ||
                'day'
        }

        function DatePicker() {}

        DatePicker.NAMESPACE = NAMESPACE
        DatePicker.TYPES = TYPES
        DatePicker.MODES = MODES
        DatePicker.UNITS = UNITS
        DatePicker.PATTERNS = PATTERNS

        // type string => type map
        DatePicker.parseTypeAsMap = function(type) {
            if (_.indexOf(['all', '', undefined], type) !== -1) type = _.values(TYPES).join(' ')

            var result = _.object(
                _.map(type.split(/\s+/), function(item) {
                    return [item, true]
                })
            )

            result.year = result.date || result.year || result.month || result.day
            result.month = result.date || result.month || result.day
            result.day = result.date || result.day
            result.time = result.time || result.hour || result.minute || result.second
            return result
        }

        _.extend(DatePicker.prototype, Brix.prototype, {
            /*
                初始时要不要值？不要！因为不同 mode 下 date 的值的类型不同
                如何支持自定义函数？暂不支持！
                plugin: undefined // TODO 如何开启插件模式
             */
            options: {
                date: undefined, // 当前选中的日期
                type: 'date', // 指定日期选择器的日历类型
                range: [], // 设置可选日期的范围
                excluded: [], // 设置禁选日期的范围
                unlimit: false, // 指定表示不限的日期

                pages: 1, // 日历面板的个数
                mode: 'single', // 日历模式：单选 single 多选 multiple 范围选 range
                disabled: false // 是否禁用日历 TODO
            },
            init: function() {
                var options = this.options

                // 修正选项 range，转换成一维数组
                options.range = _.flatten(options.range)
                options.excluded = _.flatten(options.excluded)

                // 支持不限 moment(unlimit)
                if (options.unlimit) options.unlimit = FixPattern(options.unlimit)

                // 构造 this.data
                var data = this.data = this.data || {}
                data.options = options
                data.moment = moment

                // 初始值为不限
                if (options.unlimit && options.unlimit.isSame(data.date)) {
                    // options.unlimit.toDate().getTime() === data.date.toDate().getTime()
                    this.__unlimit = options.unlimit
                }

                // 模式 data.modeMap
                data.modeMap = {}
                data.modeMap[options.mode] = true

                // 类型 data.typeMap { time: bool, date: bool, month: bool, year: bool, all: bool }
                data.typeMap = DatePicker.parseTypeAsMap(options.type)

                // 修正 data.modeMap data.typeMap
                var modeMap = data.modeMap
                var typeMap = data.typeMap
                if (typeMap.time) {
                    options.mode = 'single'
                    modeMap.single = true
                    modeMap.multiple =
                        modeMap.range = false
                }
                if (modeMap.multiple || modeMap.range) {
                    typeMap.time =
                        typeMap.second =
                        typeMap.minute =
                        typeMap.hour = false
                }

                // 修正 options.pages
                if (!typeMap.day) {
                    options.pages = 1
                }

                // 当前选中时间 data.date
                this.data.date = this.__initDate(this.options.date, this.options.mode)
            },
            // 当前选中时间
            __initDate: function(date, mode) {
                if (!date) {
                    return {
                        single: moment(),
                        multiple: [moment()],
                        range: [moment(), moment()]
                    }[mode]
                    return
                }

                return {
                    single: FixPattern(date),
                    multiple: _.isArray(date) ? _.map(date, function(item) {
                        return FixPattern(item)
                    }) : [FixPattern(date)],
                    range: _.isArray(date) ? _.map(date, function(item) {
                        return FixPattern(item)
                    }) : [FixPattern(date), FixPattern(date)]
                }[mode]
            },
            render: function() {
                this.$element = $(this.element)
                    .append(
                        _.template(template)(this.data)
                    )

                var $manager = this.$manager = new EventManager('bx-')
                $manager.delegate(this.$element, this)

                this.__renderYearPicker()
                    .__renderMonthPicker()
                    .__renderDayPicker()
                    .__renderTimePicker()

                // 修正 年月日 容器的宽度，避免日历面板因为宽度不够导致错行
                var year_month_date_container = this.$element.find('.year-month-day-container')
                var computedWidth = _.reduce(year_month_date_container.find('.year-month-day'), function(memo, ymd) {
                    return memo + $(ymd).outerWidth()
                }, 0)
                if (computedWidth > year_month_date_container.width()) {
                    year_month_date_container.width(computedWidth)
                }
            },
            // 获取或设置选中的日期
            val: function(value) {
                var bakDate = this.data.date

                if (!value) {
                    // 不限
                    if (this.__unlimit) return moment(this.__unlimit)

                    return _.isArray(bakDate) ? _.map(bakDate, function(item /*, index*/ ) {
                        return moment(item)
                    }) : moment(bakDate)
                }

                var modeMap = this.data.modeMap
                if (modeMap.multiple || modeMap.range) {
                    if (!_.isArray(value)) {
                        value = [].slice.call(arguments, 0)
                    }
                }

                // 取消 unlimit 模式
                this.__unlimit = false

                var modeHook = this.__mode_hooks[this.options.mode]
                var newDate = FixRelNumAndPattern(value)
                var same = modeHook.same(bakDate, newDate)
                var changeEvent = $.Event(
                    (same ? 'unchange' : 'change') +
                    NAMESPACE
                )
                this.trigger(changeEvent, [modeHook.clone(newDate)])
                if (changeEvent.isDefaultPrevented()) return this

                if (!same) {
                    this.data.date = newDate
                    this.__renderYearPicker()
                        .__renderMonthPicker()
                        .__renderDayPicker()
                        .__renderTimePicker()
                }

                return this
            },
            // 获取或设置可选日期的范围
            range: function(value) {
                if (value) {
                    this.options.range = _.flatten(value)
                    this.__renderDayPicker()
                    return this
                }
                return this.options.range
            },
            excluded: function(value) {
                if (value) {
                    this.options.excluded = _.flatten(value)
                    this.__renderDayPicker()
                    return this
                }
                return this.options.excluded
            },
            // 在 .year .month .date 之间切换（滑动效果）
            _slide: function(event, from, to) {
                if (event.target) {
                    var $datepicker = $(event.target).parents('.year-month-day')
                    var $siblings = $datepicker.siblings()
                    $siblings.find('.year').slideUp('fast')
                    $siblings.find('.month').slideUp('fast')
                    $siblings.find('.day').slideDown('fast')
                }

                var $datepickers = event.target ?
                    $(event.target).parents('.year-month-day') :
                    this.$element.find('.year-month-day')

                // _slide(from, to)
                if (!event.target) {
                    to = from
                    from = event
                }

                $datepickers.find(from).slideUp('fast')
                $datepickers.find(to).slideDown('fast')
            },
            _moveYearPicker: function(event, dir) {
                var cursor = $(event.currentTarget).parents('[data-page]').data('page')
                var date = $(event.currentTarget).parents('.year-header').data('date')
                date = moment(date, PATTERNS.YYYY).add(dir * YYYY_PERIOD_LIMIT, 'years')
                this.__renderYearPicker(date, cursor)
            },
            _moveMonthPicker: function(event, dir) {
                var cursor = $(event.currentTarget).parents('[data-page]').data('page')
                var date = $(event.currentTarget).parents('.month-header').data('date')
                date = moment(date, PATTERNS.YYYY_MM).add(dir, 'years')
                this.__renderMonthPicker(date, cursor)
            },
            _moveDayPicker: function(event, dir) {
                var $datepicker = $(event.target).parents('.year-month-day')
                var $siblings = $datepicker.siblings()
                $siblings.find('.year').slideUp('fast')
                $siblings.find('.month').slideUp('fast')
                $siblings.find('.day').slideDown('fast')

                var cursor = $(event.currentTarget).parents('[data-page]').data('page')
                var date = $(event.currentTarget).parents('.day-header').data('date')
                date = moment(date, PATTERNS.YYYY_MM).add(dir, 'months')
                this.__renderDayPicker(date, cursor)
            },
            /*
                1. 触发事件 unchange change
                2. 更新当前值，依据 mode 的不同，更新方式也不同
                3. 滑动日历面板
                4. 更新日历面板
             */
            _active: function(event, value, valueUnit, valuePattern) {
                event.preventDefault() // 阻止默认行为
                this.__cursor = $(event.currentTarget).parents('[data-page]').data('page') // 当前日历页
                this.__unlimit = false // 取消 unlimit 模式

                // 计算新值
                var modeHook = this.__mode_hooks[this.options.mode]
                var activeDate = moment(value, valuePattern)
                var curDate = this.__isUnlimitMode() ? moment().startOf('day') : this.data.date
                var bakDate = _.isArray(curDate) ? _.map(curDate, function(item) {
                    return moment(item)
                }) : moment(curDate)
                var newDate = modeHook.update(curDate, activeDate, valueUnit)

                // 触发 change 或 unchange 事件
                var same = _.isArray(newDate) ? false : newDate.isSame(bakDate)
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)

                // 是否需要更新当前值
                var go = false
                var typeMap = this.data.typeMap
                switch (valueUnit) {
                    case 'year':
                        if (!typeMap.month) go = true
                        break
                    case 'month':
                        if (!typeMap.day) go = true
                        break
                    case 'date':
                    case 'day':
                        go = true
                        break
                }

                if (go && !(this.data.modeMap.range && newDate.length === 1)) {
                    this.trigger(changeEvent, [modeHook.clone(newDate), valueUnit])
                    if (changeEvent.isDefaultPrevented()) return
                }

                // 更新当前值
                if (go) this.data.date = newDate

                // 滑动日历面板
                switch (valueUnit) {
                    case 'month':
                        if (this.data.typeMap.day) this._slide(event, '.month', '.day')
                        break
                    case 'year':
                        if (this.data.typeMap.month) this._slide(event, '.year', '.month')
                        break
                }

                // 更新日历面板
                this.__renderDayPicker(activeDate)
                    .__renderMonthPicker(activeDate)
                    .__renderYearPicker(activeDate)
            },
            __mode_hooks: {
                'single': {
                    update: function(curDate, activeDate, unit) {
                        curDate = this.clone(curDate)
                        switch (unit) {
                            case 'date':
                                curDate.date(activeDate.date())
                                    /* falls through */
                            case 'month':
                                curDate.month(activeDate.month())
                                    /* falls through */
                            case 'year':
                                curDate.year(activeDate.year())
                                    /* falls through */
                        }
                        return curDate
                    },
                    same: function(bakDate, newDate) {
                        return newDate.isSame(bakDate)
                    },
                    val: function( /*value*/ ) {

                    },
                    clone: function(value) {
                        return moment(value)
                    }
                },
                'multiple': { // TODO
                    update: function(curDate, activeDate, unit) {
                        curDate = this.clone(curDate)
                        if (unit === 'date') unit = 'day'
                        var found
                        for (var i = 0; i < curDate.length; i++) {
                            if (moment(curDate[i]).isSame(activeDate, unit)) {
                                found = true
                                curDate.splice(i--, 1)
                            }
                        }
                        if (found) return curDate

                        curDate.push(activeDate)
                        return curDate
                    },
                    same: function(bakDate, newDate) {
                        if (newDate.length !== bakDate.length) return false
                        for (var i = 0; i < newDate.length; i++) {
                            if (!newDate[i].isSame(bakDate[i])) return false
                        }
                        return true
                    },
                    clone: function(value) {
                        return _.map(value, function(item /*, index*/ ) {
                            return moment(item)
                        }).sort(function(a, b) {
                            return a.diff(b)
                        })
                    }
                },
                'range': {
                    update: function(curDate, activeDate, unit) {
                        curDate = this.clone(curDate)
                        switch (curDate.length) {
                            case 0: // 未选
                            case 1: // 已选第一个日期
                                curDate.push(activeDate) // .endOf(unit)
                                break
                            case 2: // 已选两个日期，重置为第一个日期
                                curDate = [activeDate.startOf(unit)]
                        }
                        return curDate
                    },
                    same: function(bakDate, newDate) {
                        if (newDate.length !== bakDate.length) return false
                        for (var i = 0; i < newDate.length; i++) {
                            if (!newDate[i].isSame(bakDate[i])) return false
                        }
                        return true
                    },
                    clone: function(value) {
                        return _.map(value, function(item /*, index*/ ) {
                            return moment(item)
                        }).sort(function(a, b) {
                            return a.diff(b)
                        })
                    }
                }
            },
            __isUnlimitMode: function() {
                return (
                    this.options.unlimit && (
                        this.__unlimit ||
                        this.options.unlimit.isSame(this.data.date)
                        // this.options.unlimit.toDate().getTime() === this.data.date.toDate().getTime()
                    )
                ) && true || false
            },
            __renderYearPicker: function(date, cursor) {
                date = date !== undefined ? date : {
                    single: this.data.date,
                    multiple: this.data.date[this.data.date.length - 1],
                    range: this.data.date[this.data.date.length - 1]
                }[this.options.mode] || moment()
                cursor = cursor !== undefined ? cursor :
                    this.__cursor || 0

                var that = this
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $yearPickers = this.$element.find('.year')
                _.each($yearPickers, function(item, index) {
                    var renderDate = moment(_.isArray(date) ? date[0] : date)
                    var $yearPicker = $(item)
                    var $yearPickerData = $yearPicker.data()
                    $yearPickerData.start = renderDate.year() - renderDate.year() % YYYY_PERIOD_LIMIT
                    switch (that.options.type) {
                        case 'year':
                            $yearPickerData.start = $yearPickerData.start + (index - cursor) * YYYY_PERIOD_LIMIT
                            break
                        case 'month':
                            break
                        case 'day':
                            break
                    }
                    $yearPickerData.end = $yearPickerData.start + YYYY_PERIOD_LIMIT - 1
                    $yearPicker.attr('data-cache-start', $yearPickerData.start)
                    $yearPicker.attr('data-cache-end', $yearPickerData.end)

                    that.__renderYearPickerTitle($yearPicker, renderDate)
                    that.__renderYearPickerContent($yearPicker, renderDate)
                })

                return this
            },
            __renderYearPickerTitle: function($yearPicker, renderDate) {
                var $yearPickerData = $yearPicker.data()
                $yearPicker
                    .find('.year-header').data('date', renderDate.format(PATTERNS.YYYY))
                    .find('.year-header-title').text($yearPickerData.start + ' - ' + $yearPickerData.end)
            },
            __renderYearPickerContent: function($yearPicker, renderDate /* period */ ) {
                var $body = $yearPicker.find('.year-body .year-body-content').empty()
                var $yearPickerData = $yearPicker.data()
                var unit = 'year'
                for (var i = $yearPickerData.start; i <= $yearPickerData.end; i++) {
                    renderDate.year(i)
                    $('<span>').text(i).attr('data-value', i)
                        .addClass(renderDate.isSame(moment(), unit) ? 'hover' : '')
                        .addClass(this.__disabled(renderDate, unit) ? 'disabled' : '')
                        .addClass(this.__actived(renderDate, unit) ? 'active' : '')
                        .attr('bx-click', ACTIVE_HANDLER_TPL({
                            unit: unit,
                            value: renderDate.format(PATTERNS.YYYY),
                            pattern: PATTERNS.YYYY
                        }))
                        .appendTo($body)
                }
            },
            __renderMonthPicker: function(date, cursor) {
                date = date !== undefined ? date : {
                    single: this.data.date,
                    multiple: this.data.date[this.data.date.length - 1],
                    range: this.data.date[this.data.date.length - 1]
                }[this.options.mode] || moment()
                cursor = cursor !== undefined ? cursor :
                    this.__cursor || 0

                var that = this
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $monthPickers = this.$element.find('.month')
                _.each($monthPickers, function(item, index) {
                    var $monthPicker = $(item)
                    var renderDate = moment(_.isArray(date) ? date[0] : date).add(index - cursor, 'months')
                    that.__renderMonthPickerTitle($monthPicker, renderDate)
                    that.__renderMonthPickerContent($monthPicker, renderDate)
                })

                return this
            },
            __renderMonthPickerTitle: function($monthPicker, renderDate) {
                $monthPicker
                    .find('.month-header').data('date', renderDate.format(PATTERNS.YYYY))
                    .find('.month-header-title').text(renderDate.format(PATTERNS.YYYY))
            },
            __renderMonthPickerContent: function($monthPicker, renderDate /* year */ ) {
                var unit = 'month'
                var $body = $monthPicker.find('.month-body .month-body-content').empty()
                for (var i = 0; i < MONTHS.length; i++) {
                    renderDate.month(i)
                    $('<span>').text(MONTHS[i]).attr('data-value', renderDate.format(PATTERNS.YYYY_MM))
                        .addClass(renderDate.isSame(moment(), unit) ? 'hover' : '')
                        .addClass(this.__disabled(renderDate, unit) ? 'disabled' : '')
                        .addClass(this.__actived(renderDate, unit) ? 'active' : '')
                        .attr('bx-click', ACTIVE_HANDLER_TPL({
                            unit: unit,
                            value: renderDate.format(PATTERNS.YYYY_MM),
                            pattern: PATTERNS.YYYY_MM
                        }))
                        .appendTo($body)
                }
            },
            __renderDayPicker: function(date, cursor) {
                date = date !== undefined ? date : {
                    single: this.data.date,
                    multiple: this.data.date[this.data.date.length - 1],
                    range: this.data.date[this.data.date.length - 1]
                }[this.options.mode] || moment()
                cursor = cursor !== undefined ? cursor :
                    this.__cursor || 0

                var that = this
                if (this.__isUnlimitMode()) date = moment().startOf('day')

                var $datePickers = this.$element.find('.day') // 可能有多个日历面板
                _.each($datePickers, function(item, index) {
                    var $datepicker = $(item)
                    var renderDate = moment(_.isArray(date) ? date[0] : date).add(index - cursor, 'months')
                    that.__renderDayPickerTitle($datepicker, renderDate)
                    that.__renderDayPickerContent($datepicker, renderDate)
                })

                return this
            },
            __renderDayPickerTitle: function($datepicker, renderDate) {
                $datepicker
                    .find('.day-header').data('date', renderDate.format(PATTERNS.YYYY_MM))
                    .find('.day-header-title').text(renderDate.format('YYYY - MM'))
            },
            __renderDayPickerContent: function($datepicker, renderDate /* month */ ) {
                var startDate = moment(renderDate).date(1).day()
                var days = renderDate.daysInMonth()
                var unit = 'day'

                var $body = $datepicker.find('.day-body .day-body-content').empty()
                for (var i = 0; i < startDate; i++) {
                    $body.append('<span class="inactive">')
                }
                for (var ii = 1; ii <= days; ii++) {
                    renderDate.date(ii)
                    $('<span>').text(ii)
                        .addClass(renderDate.isSame(moment(), unit) ? 'hover' : '')
                        .addClass(this.__disabled(renderDate, unit) ? 'disabled' : '')
                        .addClass(this.__actived(renderDate, unit) ? 'active' : '')
                        .attr('bx-click', ACTIVE_HANDLER_TPL({
                            unit: 'date',
                            value: renderDate.format(PATTERNS.YYYY_MM_DD),
                            pattern: PATTERNS.YYYY_MM_DD
                        }))
                        .appendTo($body)
                }
            },
            __renderTimePicker: function() {
                var date = moment(this.data.date)

                var inputs = this.$element.find('.hour-minute-second input')
                inputs.eq(0).val(date.format('HH'))
                inputs.eq(1).val(date.format('mm'))
                inputs.eq(2).val(date.format('ss'))

                return this
            },
            _changeTime: function(event, extra, unit, units) {
                var KEYBOARD_HOOKS = {
                    38: 1, // up
                    40: -1 // down
                }

                // 取消 unlimit 模式
                this.__unlimit = false

                var date = this.data.date

                // submit
                if (extra === undefined && unit === undefined && units === undefined) {
                    var submitEvent = $.Event('change' + NAMESPACE)
                    this.trigger(submitEvent, [moment(date), 'time'])
                    return
                }

                var milliseconds = date.toDate().getTime()

                if (event.type === 'keydown') {
                    if (!KEYBOARD_HOOKS[event.which]) return
                    extra = KEYBOARD_HOOKS[event.which] || 0
                }
                if (event.type === 'blur' || event.type === 'focusout') {
                    this.data.date.set(unit, event.target.value)
                    extra = 0
                }
                date.add(extra, units)

                event.preventDefault()
                event.stopPropagation()

                var same = date.toDate().getTime() === milliseconds
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [moment(date), unit])

                if (changeEvent.isDefaultPrevented()) return

                if (!same) {
                    this.__renderTimePicker()

                    // 避免按住上下键不放导致的频繁渲染，进而出现卡顿现象
                    var that = this
                    clearTimeout(this.__timer)
                    this.__timer = setTimeout(function() {
                        that.__renderYearPicker().__renderMonthPicker().__renderDayPicker()
                    }, 100)
                }
            },
            __disabled: function(renderDate, unit /* year month day */ ) {
                var range = this.options.range
                var excluded = this.options.excluded
                return !this.__inRange(renderDate, range, unit) ||
                    this.__inExcluded(renderDate, excluded, unit)
            },
            __inRange: function(renderDate, range, unit) {
                return this.__in(renderDate, range, unit, true)
            },
            __inExcluded: function(renderDate, excluded, unit) {
                return this.__in(renderDate, excluded, unit, false)
            },
            __in: function(renderDate, range, unit, empty) {
                if (!range.length) return empty
                var start, end, ma
                var relNumUnit = ParseRelNumUnit(this.data.typeMap) // 相对值的单位取决于选项 type 的值
                for (var i = 0; i < range.length; i += 2) {
                    start = range[i] && (
                        _.isString(range[i]) && (ma = RE_REL_NUM.exec(range[i])) ?
                        moment().add((ma[1] + 1) * ma[2], relNumUnit) :
                        FixPattern(range[i])
                    )
                    end = range[i + 1] && (
                        _.isString(range[i + 1]) && (ma = RE_REL_NUM.exec(range[i + 1])) ?
                        moment().add((ma[1] + 1) * ma[2], relNumUnit) :
                        FixPattern(range[i + 1])
                    )
                    if (start && end) {
                        var temp = [moment.min(start, end), moment.max(start, end)]
                        start = temp[0]
                        end = temp[1]
                    }
                    if (
                        (!start || renderDate.isSame(start, unit) || renderDate.isAfter(start, unit)) &&
                        (!end || renderDate.isSame(end, unit) || renderDate.isBefore(end, unit))
                    ) {
                        return true
                    }
                }
                return false
            },
            __actived: function(renderDate, unit) {
                if (this.__isUnlimitMode()) return false

                var date = this.data.date
                switch (this.options.mode) {
                    case 'single':
                        return renderDate.isSame(date, unit)
                    case 'multiple':
                        return _.find(date, function(item /*, index*/ ) {
                            return renderDate.isSame(moment(item), unit)
                        })
                    case 'range':
                        return (
                            (
                                date.length === 1 &&
                                (renderDate.isSame(date[0], unit))
                            ) ||
                            (
                                date.length === 2 &&
                                (renderDate.isSame(moment.min(date[0], date[1]), unit) || renderDate.isAfter(moment.min(date[0], date[1]), unit)) &&
                                (renderDate.isSame(moment.max(date[0], date[1]), unit) || renderDate.isBefore(moment.max(date[0], date[1]), unit))
                            )
                        )
                }
                return false
            },
            _unlimit: function( /*event*/ ) {
                var unlimit = this.options.unlimit
                var same = this.__unlimit ? true : false
                this.__unlimit = unlimit

                same = same ? same : unlimit.isSame(this.data.date)
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [unlimit, 'date'])
                if (changeEvent.isDefaultPrevented()) return

                this.__renderYearPicker().__renderMonthPicker().__renderDayPicker()
            },
            destroy: function() {
                this.$manager.undelegate(this.$element, this)
            }
        })

        return DatePicker
            // return Brix.extend({})
    }
)