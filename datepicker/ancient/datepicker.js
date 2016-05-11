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
        var MODES = 'multi range'
        var YYYY_PATTERN = 'YYYY'
        var YYYY_MM_PATTERN = 'YYYY-MM'
        var DATE_PATTERN = 'YYYY-MM-DD'
        var TIME_PATTERN = 'HH:mm:ss'
        var DATE_TIME_PATTERN = DATE_PATTERN + ' ' + TIME_PATTERN
        var ACTIVE_HANDLER_TPL = _.template('_active("<%= value %>", "<%= unit %>", "<%= pattern %>")')
        var YYYY_PERIOD_LIMIT = 20

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
                        this._renderMonthPicker(dir)
                        break
                    case 'month':
                        this._renderDatePicker(dir)
                            ._renderMonthPicker()
                        break
                }
            },
            _active: function(event, value, valueUnit, valuePattern) {
                event.preventDefault()

                // 当前日历页
                this.__cursor = $(event.currentTarget).parents('[data-group-page]').attr('data-group-page')

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
            _changeHour: function(event, extra) {
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
            _renderYearPicker: function(dir) {
                dir = dir || 0

                var date = this.data.date
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var pageCursor = this.__cursor || 0
                var $yearPickers = this.$element.find('.year')
                _.each($yearPickers, function(item, index) {
                    var renderDate = moment(date).add(index - pageCursor, 'months') // .add(YYYY_PERIOD_LIMIT * index, 'years')
                    __renderYearPicker($(item), date, renderDate, YYYY_PERIOD_LIMIT)
                })

                return this

                function __renderYearPicker($yearPicker, date, renderDate, limit) {
                    var $title = $yearPicker.find('.year-header .year-header-title')
                    var $body = $yearPicker.find('.year-body .year-body-content')
                    var data = $body.data()
                    var current = renderDate.get('year')
                    data.start = (data.start || (current - current % limit)) + dir * limit
                    data.end = data.start + limit - 1
                    $title.text(data.start + ' - ' + data.end)
                    $body.empty()
                    for (var i = data.start; i <= data.end; i++) {
                        renderDate.year(i)
                        $('<span>').text(i).attr('data-value', i)
                            .attr('bx-click', ACTIVE_HANDLER_TPL({
                                unit: 'year',
                                value: renderDate.format(YYYY_PATTERN),
                                pattern: YYYY_PATTERN
                            })) // '_active("year")'
                            .addClass(!unlimitMode &&
                                date.get('year') === renderDate.get('year') ?
                                'active' : ''
                            )
                            .appendTo($body)
                    }
                }
            },
            _renderMonthPicker: function( /* dir */ ) {
                var date = this.data.date // .add(dir || 0, 'year')
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var pageCursor = this.__cursor || 0
                var $monthPickers = this.$element.find('.month')
                _.each($monthPickers, function(item, index) {
                    var renderDate = moment(date).add(index - pageCursor, 'months' /* 'years' */ )
                    __renderMonthPicker($(item), date, renderDate)
                })

                return this

                function __renderMonthPicker($monthPicker, date, renderDate) {
                    var $title = $monthPicker.find('.month-header .month-header-title').text(renderDate.get('year'))
                    var $body = $monthPicker.find('.month-body .month-body-content').empty()

                    // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                    // ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月','十月', '十一', '十二']
                    var months = function() {
                        var result = []
                        for (var i = 1; i <= 12; i++) {
                            result.push(i < 10 ? '0' + i : i)
                        }
                        return result
                    }()
                    _.each(months, function(item, index) {
                        renderDate.month(index)
                        $('<span>').text(item)
                            .attr('data-value', renderDate.format(YYYY_MM_PATTERN))
                            .addClass(!unlimitMode &&
                                (renderDate.get('year') === date.get('year') && renderDate.get('month') === date.get('month')) ?
                                'active' : ''
                            )
                            .attr('bx-click', ACTIVE_HANDLER_TPL({
                                unit: 'month',
                                value: renderDate.format(YYYY_MM_PATTERN),
                                pattern: YYYY_MM_PATTERN
                            }))
                            .appendTo($body)
                    })
                }
            },
            _renderDatePicker: function(date, cursor) {
                date = date || this.data.date || moment() // moment(this.data.date).add(dir || 0, 'month')
                cursor = cursor || this.__cursor || 0

                var range = this.options.range
                var unlimitMode = this.__isUnlimitMode()
                if (unlimitMode) date = moment().startOf('day')

                var $datePickers = this.$element.find('.date') // 可能有多个日历面板
                _.each($datePickers, function(item, index) {
                    var renderDate = moment(date).add(index - cursor, 'months')
                    var $datepicker = $(item)
                    __renderDatePickerTitle($datepicker, date, renderDate, range)
                    __renderDatePickerContent($datepicker, date, renderDate, range)
                })

                return this

                function __renderDatePickerTitle($datepicker, date, renderDate) {
                    $datepicker.find('.date-header .date-header-title').text(renderDate.format('YYYY - MM'))
                }

                function __renderDatePickerContent($datepicker, date, renderDate, range) {
                    var $body = $datepicker.find('.date-body .date-body-content').empty()

                    var startDate = moment(renderDate).date(1).day()
                    for (var i = 0; i < startDate; i++) {
                        $body.append('<span class="inactive">')
                    }

                    var days = renderDate.daysInMonth()
                    for (var ii = 1; ii <= days; ii++) {
                        renderDate.date(ii)
                        $('<span>').text(ii)
                            .addClass(__now(renderDate) ? 'hover' : '')
                            .addClass(__active(unlimitMode, date, renderDate, ii) ? 'active' : '')
                            .addClass(__disabled(renderDate, range) ? 'disabled' : '')
                            .attr('bx-click', ACTIVE_HANDLER_TPL({
                                unit: 'date',
                                value: renderDate.format(DATE_PATTERN),
                                pattern: DATE_PATTERN
                            }))
                            .appendTo($body)
                    }
                }

                function __now(renderDate) {
                    return renderDate.isSame(moment(), 'day')
                }

                function __active(unlimitMode, date, renderDate) {
                    return !unlimitMode && renderDate.isSame(date, 'day')
                }

                function __disabled(renderDate, range) {
                    if (!range.length) return false
                    var cur = moment(renderDate).startOf('day')
                    var start, end
                    for (var i = 0; i < range.length; i += 2) {
                        start = range[i] && moment(range[i], _.isString(range[i]) && DATE_TIME_PATTERN)
                        end = range[i + 1] && moment(range[i + 1], _.isString(range[i + 1]) && DATE_TIME_PATTERN)
                        if (start && end) {
                            var temp = [start, end]
                            start = moment.min(temp[0], temp[1])
                            end = moment.max(temp[0], temp[1])
                        }
                        if (start && end && cur.diff(start, 'days') >= 0 && cur.diff(end, 'days') <= 0) return false
                        if (start && !end && cur.diff(start, 'days') >= 0) return false
                        if (!start && end && cur.diff(end, 'days') <= 0) return false
                        if (!start && !end) return false
                    }
                    return true
                }
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