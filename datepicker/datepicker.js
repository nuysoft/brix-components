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
        'base/brix',
        './datepicker.tpl.js',
        'css!./datepicker.css'
    ],
    function(
        $, _, moment,
        Brix,
        template
    ) {
        /*
            ### 数据
                {}
            ### 选项
                data template
            ### 属性
                element moduleId clientId parentClientId childClientIds data template
            ### 方法
                .render()
            ### 事件
                ready destroyed
        */
        return Brix.extend({
            options: {
                date: moment(), // date dateShadow
                type: 'all', // time date month year all
                range: []
            },
            init: function() {
                // 修正选项 range
                this.options.range = function(range) {
                    var result = []
                    _.each(range, function(item, index) {
                        if (_.isArray(item)) result = result.concat(item)
                        else result.push(item)
                    })
                    return result
                }(this.options.range)

                // 构造 this.data
                this.data = this.data || {}
                this.data.options = this.options
                this.data.moment = moment
                this.data.date = moment(this.data.date)
                // { time: bool, date: bool, month: bool, year: bool, all: bool }
                this.data.typeMap = function(type) {
                    var result = {}
                    _.each(type.split(' '), function(item /*, index*/ ) {
                        result[item] = true
                    })
                    return result
                }(this.options.type)
            },
            render: function() {
                var $element = $(this.element)
                var html = _.template(template, this.data)
                $element.append(html)

                this.delegateBxTypeEvents(this.element)

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()
            },
            // 获取或设置选中的日期。
            val: function(value) {
                var milliseconds = this.data.date.toDate().getTime()
                if (value) {
                    this.data.date = moment(value)
                    if (this.data.date.toDate().getTime() !== milliseconds) {
                        this.trigger('change.datepicker', moment(this.data.date))
                    }
                    this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()
                    return this
                }
                return moment(this.data.date)
            },
            // 在 .yearpicker .monthpicker .datepicker 之间切换（滑动效果）
            _slide: function(event, from, to) {
                // _slide(from, to)
                if (arguments.length == 2) {
                    to = from
                    from = event
                }
                $(this.element).find(from).slideUp('fast')
                $(this.element).find(to).slideDown('fast')
            },
            // 点击 minus plus
            /* jshint unused:false */
            _move: function(event, unit, dir) {
                var date = this.data.date
                var milliseconds = date.toDate().getTime()
                if (unit === 'year') {
                    this._renderYearPicker(dir)._renderDatePicker()
                    return
                }
                // month date
                date.add(dir, unit)
                if (date.toDate().getTime() !== milliseconds) {
                    this.trigger('change.datepicker', [moment(date), unit])
                }
                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            _active: function(event, unit) {
                var date = this.data.date
                var milliseconds = date.toDate().getTime()
                var $target = $(event.target).toggleClass('active')
                $target.siblings().removeClass('active').end()
                date.set(unit, +$target.attr('data-value'))
                if (date.toDate().getTime() !== milliseconds) this.trigger('change.datepicker', [moment(date), unit])
                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
                if (unit === 'year' && !this.data.typeMap.year) {
                    this._slide('.yearpicker', '.monthpicker')
                }
                if (unit === 'month' && !this.data.typeMap.month) {
                    this._slide('.monthpicker', '.datepicker')
                }
            },
            _hooks: {
                38: 1, // up
                40: -1 // down
            },
            _changeTime: function(event, extra, unit, units) {
                var date = this.data.date
                var milliseconds = date.toDate().getTime()
                if (event.type === 'keydown') {
                    if (!this._hooks[event.which]) return
                    extra = this._hooks[event.which] || 0
                }
                if (event.type === 'blur' || event.type === 'focusout') {
                    this.data.date.set(unit, event.target.value)
                    extra = 0
                }
                event.preventDefault()
                event.stopPropagation()
                date.add(extra, units)
                if (date.toDate().getTime() !== milliseconds) this.trigger('change.datepicker', [moment(date), unit])
                this._renderTimePicker()._renderYearPicker()._renderMonthPicker()._renderDatePicker()
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
            _renderYearPicker: function(dir) {
                dir = dir || 0
                var $title = $(this.element).find('.yearpicker .picker-header h4')
                var $body = $(this.element).find('.yearpicker .picker-body')

                var limit = 20
                var data = $body.data()
                var current = this.data.date.get('year')
                data.start = (data.start || (current - current % limit)) + dir * limit
                data.end = data.start + limit - 1

                $title.text(data.start + ' - ' + data.end)
                $body.empty()
                for (var i = data.start; i <= data.end; i++) {
                    $('<span>').text(i).attr('data-value', i)
                        .attr('bx-click', '_active("year")')
                        .addClass(current === i ? 'active' : '')
                        .appendTo($body)
                }

                return this
            },
            _renderMonthPicker: function() {
                var that = this
                var date = this.data.date

                var $title = $(this.element).find('.monthpicker .picker-header h4')
                var $body = $(this.element).find('.monthpicker .picker-body')
                $title.text(date.get('year'))
                $body.empty()
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
                    $('<span>').text(item).attr('data-value', index)
                        .addClass(date.get('month') === index ? 'active' : '')
                        .attr('bx-click', '_active("month")')
                        .appendTo($body)
                })

                return this
            },
            _renderDatePicker: function() {
                var date = this.data.date
                var days = date.daysInMonth()
                var startDay = moment(date).date(1).day()
                var range = this.options.range

                var $title = $(this.element).find('.datepicker .picker-header h4')
                var $body = $(this.element).find('.datepicker .picker-body .datepicker-body-value')

                $title.text(date.format('YYYY - MM'))
                $body.empty()
                for (var i = 0; i < startDay; i++) {
                    $('<span class="inactive">')
                        .appendTo($body)
                }
                for (var ii = 1; ii <= days; ii++) {
                    var disabled = function() {
                        if (!range.length) return false
                        var cur = moment(date).set('date', ii)
                        var min, max
                        for (var i = 0; i < range.length; i += 2) {
                            min = range[i] && moment(range[i])
                            max = range[i + 1] && moment(range[i + 1])
                            if (min && max && cur.diff(min) > 0 && cur.diff(max) < 0) return false
                            if (min && !max && cur.diff(min) > 0) return false
                            if (!min && max && cur.diff(max) < 0) return false
                            if (!min && !max) return false
                        }
                        return true
                    }()
                    $('<span>').text(ii).attr('data-value', ii)
                        .addClass(date.date() === ii ? 'active' : '')
                        .addClass(disabled ? 'disabled' : '')
                        .attr('bx-click', '_active("date")')
                        .appendTo($body)
                }
                return this
            },
            _renderTimePicker: function() {
                var date = moment(this.data.date)

                var inputs = $(this.element).find('.timepicker div.timepicker-group input')
                inputs.eq(0).val(date.format('HH'))
                inputs.eq(1).val(date.format('mm'))
                inputs.eq(2).val(date.format('ss'))

                return this
            }
        })
    }
)