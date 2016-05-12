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
 */
define(
    [
        'jquery', 'underscore', 'moment',
        'components/base', 'brix/event',
        './datepicker.tpl.js'
    ],
    function(
        $, _, moment,
        Brix, EventManager,
        template
    ) {

        var NAMESPACE = '.datepicker'
        var TYPES = 'second minute hour time date month year'
            // var MODES = 'multi range'
        var YYYY_PATTERN = 'YYYY'
        var YYYY_MM_PATTERN = 'YYYY-MM'
        var DATE_PATTERN = 'YYYY-MM-DD'
        var TIME_PATTERN = 'HH:mm:ss'
        var DATE_TIME_PATTERN = DATE_PATTERN + ' ' + TIME_PATTERN
        var ACTIVE_HANDLER_TPL = _.template('_active("<%= value %>", "<%= unit %>", "<%= pattern %>")')
        var YYYY_PERIOD_LIMIT = 20
        var RE_REL_NUM = /^([+-])=(.+)/ // 日期相对值

        // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        // ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月','十月', '十一', '十二']
        var MONTHS = _.map(_.range(1, 13), function(item) {
            return (item < 10 ? '0' : '') + item
        })

        function DatePicker() {}

        DatePicker.NAMESPACE = NAMESPACE
        DatePicker.TYPES = TYPES
        DatePicker.DATE_PATTERN = DATE_PATTERN
        DatePicker.TIME_PATTERN = TIME_PATTERN
        DatePicker.DATE_TIME_PATTERN = DATE_TIME_PATTERN

        // type string => type map
        DatePicker.typeMap = function(type) {
            if (_.indexOf(['all', '', undefined], type) !== -1) type = TYPES
            var result = {}
            _.each(type.split(/\s+/), function(item /*, index*/ ) {
                result[item] = true
            })

            result.time = result.time || result.hour || result.minute || result.second
            return result
        }

        _.extend(DatePicker.prototype, Brix.prototype, {
            options: {
                date: moment(), // date dateShadow
                type: 'all',
                range: [],
                unlimit: false,

                pages: 1,
                mode: '' // 
            },
            init: function() {
                // 修正选项 range，转换成一维数组
                this.options.range = _.flatten(this.options.range)

                // 支持不限 moment(unlimit)
                if (this.options.unlimit) this.options.unlimit = moment(
                    this.options.unlimit,
                    _.isString(this.options.unlimit) && DATE_TIME_PATTERN
                )

                // 构造 this.data
                this.data = this.data || {}
                this.data.options = this.options
                this.data.moment = moment

                // 当前选中时间 moment(date)
                this.data.date = moment(
                    this.options.date,
                    _.isString(this.options.date) && DATE_TIME_PATTERN
                )

                // 初始值为不限
                if (this.options.unlimit && this.options.unlimit.isSame(this.data.date)) {
                    // this.options.unlimit.toDate().getTime() === this.data.date.toDate().getTime()
                    this.__unlimit = this.options.unlimit
                }

                // { time: bool, date: bool, month: bool, year: bool, all: bool }
                this.data.typeMap = DatePicker.typeMap(this.options.type)
            },
            render: function() {
                this.$element = $(this.element)
                    .append(
                        _.template(template)(this.data)
                    )

                var $manager = this.$manager = new EventManager('bx-')
                $manager.delegate(this.$element, this)

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()
            },
            // 获取或设置选中的日期
            val: function(value) {
                if (value) {
                    // 取消 unlimit 模式
                    this.__unlimit = false

                    var newDate = moment(
                        value,
                        _.isString(value) && DATE_TIME_PATTERN
                    )
                    var same = newDate.isSame(this.data.date)
                    var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                    this.trigger(changeEvent, moment(this.data.date))
                    if (event.isDefaultPrevented()) return this

                    if (!same) {
                        this.data.date = newDate
                        this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()
                    }

                    return this
                }

                return moment(this.__unlimit || this.data.date)
            },
            // 获取或设置可选日期的范围
            range: function(value) {
                if (value) {
                    this.options.range = _.flatten(value)
                    this._renderDatePicker()
                    return this
                }
                return this.options.range
            },
            // 日期取反
            not: function() {

            },
            // 在 .year .month .date 之间切换（滑动效果）
            _slide: function(event, from, to) {
                if (event.target) {
                    var $datepicker = $(event.target).parents('.year-month-date')
                    var $siblings = $datepicker.siblings()
                    $siblings.find('.year').slideUp('fast')
                    $siblings.find('.month').slideUp('fast')
                    $siblings.find('.date').slideDown('fast')
                }

                var $datepickers = event.target ?
                    $(event.target).parents('.year-month-date') :
                    this.$element.find('.year-month-date')

                // _slide(from, to)
                if (!event.target) {
                    to = from
                    from = event
                }

                $datepickers.find(from).slideUp('fast')
                $datepickers.find(to).slideDown('fast')
            },
            // 点击 minus plus
            // unit: period, year, month
            // dir: -1, 1
            _move: function(event /* jshint unused:false */ , unit, dir) {
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) this.data.date = moment().startOf('day')

                // 取消 unlimit 模式
                this.__unlimit = false

                var oldDate = moment(this.data.date)
                var date = this.data.date

                if (unit === 'period') {
                    this._renderYearPicker(dir) // TODO 为什么还要 _renderDatePicker ？
                    return
                }

                date.add(dir, unit)

                var same = date.isSame(oldDate) // date.toDate().getTime() === milliseconds
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [moment(date), unit])
                if (changeEvent.isDefaultPrevented()) return this

                // if (!same) this._renderYearPicker()._renderMonthPicker()._renderDatePicker()

                if (!same) switch (unit) {
                    case 'period':
                        this._renderYearPicker(dir)
                        break
                    case 'year':
                        this._renderMonthPicker()
                        break
                    case 'month':
                        this._renderDatePicker()
                            ._renderMonthPicker()
                        break
                }
            },
            _moveYearPicker: function(event, dir) {
                var cursor = $(event.currentTarget).parents('[data-page]').data('page')
                var date = $(event.currentTarget).parents('.year-header').data('date')
                date = moment(date, YYYY_PATTERN).add(dir * YYYY_PERIOD_LIMIT, 'years')
                this._renderYearPicker(date, cursor, false /* renderActive */ )
            },
            _moveMonthPicker: function(event, dir) {
                var cursor = $(event.currentTarget).parents('[data-page]').data('page')
                var date = $(event.currentTarget).parents('.month-header').data('date')
                date = moment(date, YYYY_MM_PATTERN).add(dir, 'years')
                this._renderMonthPicker(date, cursor, false /* renderActive */ )
            },
            _moveDatePicker: function(event, dir) {
                var $datepicker = $(event.target).parents('.year-month-date')
                var $siblings = $datepicker.siblings()
                $siblings.find('.year').slideUp('fast')
                $siblings.find('.month').slideUp('fast')
                $siblings.find('.date').slideDown('fast')

                var cursor = $(event.currentTarget).parents('[data-page]').data('page')
                var date = $(event.currentTarget).parents('.date-header').data('date')
                date = moment(date, YYYY_MM_PATTERN).add(dir, 'months')
                this._renderDatePicker(date, cursor, false /* renderActive */ )
            },
            _active: function(event, value, valueUnit, valuePattern) {
                event.preventDefault()

                // 当前日历页
                this.__cursor = $(event.currentTarget).parents('[data-page]').data('page')

                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) this.data.date = moment().startOf('day')

                // 取消 unlimit 模式
                this.__unlimit = false

                var oldDate = moment(this.data.date)
                var date = this.data.date
                var activeDate = moment(value, valuePattern)
                switch (valueUnit) {
                    case 'date':
                        date.date(activeDate.date())
                            .month(activeDate.month())
                            .year(activeDate.year())
                        break
                    case 'month':
                        date.month(activeDate.month())
                            .year(activeDate.year())
                        break
                    case 'year':
                        date.year(activeDate.year())
                        break
                } // 这段代码可以 falls through 的方式简化，但是可读性会变很差。

                var same = date.isSame(oldDate) // date.toDate().getTime() === milliseconds
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [moment(date), valueUnit])
                if (changeEvent.isDefaultPrevented()) return

                this.$element.find(
                    _.template('.<%= obj %>-body-content span')(valueUnit)
                ).removeClass('active')
                $(event.currentTarget).addClass('active')

                switch (valueUnit) {
                    case 'date':
                        this._renderMonthPicker()._renderYearPicker()
                        break
                    case 'month':
                        if (this.data.typeMap.month) break
                        this._slide(event, '.month', '.date')
                        this._renderDatePicker()
                        break
                    case 'year':
                        if (this.data.typeMap.year) break
                        this._slide(event, '.year', '.month')
                        this._renderMonthPicker()._renderDatePicker()
                        break
                }

                // if (!same) this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            _hooks: {
                38: 1, // up
                40: -1 // down
            },
            _changeTime: function(event, extra, unit, units) {
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
                    if (!this._hooks[event.which]) return
                    extra = this._hooks[event.which] || 0
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

                if (!same) this._renderTimePicker()._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            _changeHour: function(event, extra /* 0, 1, -1 */ ) {
                this._changeTime(event, extra, 'hour', 'hours')
            },
            _changeMinute: function(event, extra) {
                this._changeTime(event, extra, 'minute', 'minutes')
            },
            _changeSecond: function(event, extra) {
                this._changeTime(event, extra, 'second', 'seconds')
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
            _renderYearPicker: function(date, cursor, renderActive) {
                date = date || this.data.date || moment() // .add(dir || 0, 'month')
                cursor = cursor || this.__cursor || 0

                var that = this
                var range = this.options.range
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $yearPickers = this.$element.find('.year')
                _.each($yearPickers, function(item, index) {
                    var $yearPicker = $(item)
                    var renderDate = moment(date).add(index - cursor, 'months')

                    var data = $yearPicker.data()
                    var year = renderDate.year()
                    data.start = year - year % YYYY_PERIOD_LIMIT
                    data.end = data.start + YYYY_PERIOD_LIMIT - 1

                    that.__renderYearPickerTitle($yearPicker, renderDate)
                    that.__renderYearPickerContent($yearPicker, date, renderDate, range, renderActive)
                })

                return this
            },
            __renderYearPickerTitle: function($yearPicker, renderDate) {
                var data = $yearPicker.data()
                $yearPicker
                    .find('.year-header').data('date', renderDate.format(YYYY_PATTERN))
                    .find('.year-header-title').text(data.start + ' - ' + data.end)
            },
            __renderYearPickerContent: function($yearPicker, date, renderDate /* period */ , range, renderActive) {
                var unlimitMode = this.__isUnlimitMode()
                var $body = $yearPicker.find('.year-body .year-body-content').empty()
                var data = $yearPicker.data()
                for (var i = data.start; i <= data.end; i++) {
                    renderDate.year(i)
                    $('<span>').text(i).attr('data-value', i)
                        .addClass(renderDate.isSame(moment(), 'year') ? 'hover' : '')
                        .addClass(renderActive !== false && !unlimitMode && renderDate.isSame(date, 'year') ? 'active' : '')
                        .addClass(this.__disabled(renderDate, range, 'year') ? 'disabled' : '')
                        .attr('bx-click', ACTIVE_HANDLER_TPL({
                            unit: 'year',
                            value: renderDate.format(YYYY_PATTERN),
                            pattern: YYYY_PATTERN
                        }))
                        .appendTo($body)
                }
            },
            _renderMonthPicker: function(date, cursor, renderActive) {
                date = date || this.data.date || moment() // .add(dir || 0, 'year')
                cursor = cursor || this.__cursor || 0

                var that = this
                var range = this.options.range
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $monthPickers = this.$element.find('.month')
                _.each($monthPickers, function(item, index) {
                    var $monthPicker = $(item)
                    var renderDate = moment(date).add(index - cursor, 'months')
                    that.__renderMonthPickerTitle($monthPicker, renderDate)
                    that.__renderMonthPickerContent($monthPicker, date, renderDate, range, renderActive)
                })

                return this
            },
            __renderMonthPickerTitle: function($monthPicker, renderDate) {
                $monthPicker
                    .find('.month-header').data('date', renderDate.format(YYYY_PATTERN))
                    .find('.month-header-title').text(renderDate.format(YYYY_PATTERN))
            },
            __renderMonthPickerContent: function($monthPicker, date, renderDate /* year */ , range, renderActive) {
                var that = this
                var unlimitMode = this.__isUnlimitMode()
                var $body = $monthPicker.find('.month-body .month-body-content').empty()
                _.each(MONTHS, function(item, index) {
                    renderDate.month(index)
                    $('<span>').text(item).attr('data-value', renderDate.format(YYYY_MM_PATTERN))
                        .addClass(renderDate.isSame(moment(), 'month') ? 'hover' : '')
                        .addClass(renderActive !== false && !unlimitMode && renderDate.isSame(date, 'month') ? 'active' : '')
                        .addClass(that.__disabled(renderDate, range, 'month') ? 'disabled' : '')
                        .attr('bx-click', ACTIVE_HANDLER_TPL({
                            unit: 'month',
                            value: renderDate.format(YYYY_MM_PATTERN),
                            pattern: YYYY_MM_PATTERN
                        }))
                        .appendTo($body)
                })
            },
            _renderDatePicker: function(date, cursor, renderActive) {
                date = date || this.data.date || moment() // .add(dir || 0, 'month')
                cursor = cursor || this.__cursor || 0

                var that = this
                var range = this.options.range
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $datePickers = this.$element.find('.date') // 可能有多个日历面板
                _.each($datePickers, function(item, index) {
                    var $datepicker = $(item)
                    var renderDate = moment(date).add(index - cursor, 'months')
                    that.__renderDatePickerTitle($datepicker, renderDate)
                    that.__renderDatePickerContent($datepicker, date, renderDate, range, renderActive)
                })

                return this
            },
            __renderDatePickerTitle: function($datepicker, renderDate) {
                $datepicker
                    .find('.date-header').data('date', renderDate.format(YYYY_MM_PATTERN))
                    .find('.date-header-title').text(renderDate.format('YYYY - MM'))
            },
            __renderDatePickerContent: function($datepicker, date, renderDate /* month */ , range, renderActive) {
                var unlimitMode = this.__isUnlimitMode()
                var $body = $datepicker.find('.date-body .date-body-content').empty()

                var startDate = moment(renderDate).date(1).day()
                for (var i = 0; i < startDate; i++) {
                    $body.append('<span class="inactive">')
                }

                var days = renderDate.daysInMonth()
                for (var ii = 1; ii <= days; ii++) {
                    renderDate.date(ii)
                    $('<span>').text(ii)
                        .addClass(renderDate.isSame(moment(), 'day') ? 'hover' : '')
                        .addClass(renderActive !== false && !unlimitMode && renderDate.isSame(date, 'day') ? 'active' : '')
                        .addClass(this.__disabled(renderDate, range, 'day') ? 'disabled' : '')
                        .attr('bx-click', ACTIVE_HANDLER_TPL({
                            unit: 'date',
                            value: renderDate.format(DATE_PATTERN),
                            pattern: DATE_PATTERN
                        }))
                        .appendTo($body)
                }
            },
            __disabled: function(renderDate, range, unit) {
                if (!range.length) return false
                var start, end, ma
                for (var i = 0; i < range.length; i += 2) {
                    // TODO 相对值的单位取决于选项 type 的值
                    start = range[i] && (
                        _.isString(range[i]) && (ma = RE_REL_NUM.exec(range[i])) ?
                        moment().add((ma[1] + 1) * ma[2], 'day') :
                        moment(range[i], _.isString(range[i]) && DATE_TIME_PATTERN)
                    )
                    end = range[i + 1] && (
                        _.isString(range[i + 1]) && (ma = RE_REL_NUM.exec(range[i + 1])) ?
                        moment().add((ma[1] + 1) * ma[2], 'day') :
                        moment(range[i + 1], _.isString(range[i + 1]) && DATE_TIME_PATTERN)
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
                        return false
                    }
                }
                return true
            },
            _renderTimePicker: function() {
                var date = moment(this.data.date)

                var inputs = this.$element.find('.hour-minute-second input')
                inputs.eq(0).val(date.format('HH'))
                inputs.eq(1).val(date.format('mm'))
                inputs.eq(2).val(date.format('ss'))

                return this
            },
            _unlimit: function( /*event*/ ) {
                var unlimit = this.options.unlimit
                this.__unlimit = unlimit

                var same = unlimit.isSame(this.data.date)
                var changeEvent = $.Event((same ? 'unchange' : 'change') + NAMESPACE)
                this.trigger(changeEvent, [unlimit, 'date'])

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            destroy: function() {
                this.$manager.undelegate(this.$element, this)
            }
        })

        return DatePicker
            // return Brix.extend({})
    }
)