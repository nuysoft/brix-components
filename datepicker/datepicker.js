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
        'brix/base', 'brix/event',
        './datepicker.tpl.js',
        'css!./datepicker.css'
    ],
    function(
        $, _, moment,
        Brix, EventManager,
        template
    ) {
        function DatePicker() {}

        _.extend(DatePicker.prototype, Brix.prototype, {
            options: {
                date: moment(), // date dateShadow
                type: 'all', // time date month year all
                range: [],
                unlimit: false
            },
            init: function() {
                // 修正选项 range，转换成一维数组
                this.options.range = _.flatten(this.options.range)

                // 支持不限
                if (this.options.unlimit) {
                    this.options.unlimit = moment(this.options.unlimit)
                    this.options.date = moment().startOf('day')
                }

                // 构造 this.data
                this.data = this.data || {}
                this.data.options = this.options
                this.data.moment = moment
                this.data.date = moment(this.options.date)

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
                var manager = new EventManager()
                var $element = $(this.element)
                var html = _.template(template)(this.data)
                $element.append(html)

                manager.delegate(this.element, this)

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()
            },
            // 获取或设置选中的日期。
            val: function(value) {
                // var milliseconds = this.data.date.toDate().getTime()
                if (value) {
                    this.data.date = moment(value)
                    this.trigger('change.datepicker', moment(this.data.date))
                        // if (this.data.date.toDate().getTime() !== milliseconds) {}
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
                if (unit === 'period') {
                    this._renderYearPicker(dir)._renderDatePicker()
                        // date.add(dir, unit)
                        // this._renderYearPicker(dir)._renderMonthPicker()._renderDatePicker()
                    return
                }
                // year month date
                date.add(dir, unit)
                    // if (date.toDate().getTime() !== milliseconds) 
                this.trigger('change.datepicker', [moment(date), unit])

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            _active: function(event, unit) {
                var date = this.data.date
                var milliseconds = date.toDate().getTime()
                var $target = $(event.target).toggleClass('active')
                $target.siblings().removeClass('active').end()
                date.set(unit, +$target.attr('data-value'))
                    // if (date.toDate().getTime() !== milliseconds) 
                this.trigger('change.datepicker', [moment(date), unit])
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
                    // if (date.toDate().getTime() !== milliseconds) 
                this.trigger('change.datepicker', [moment(date), unit])
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

                var date = this.data.date
                var unlimitMode = false
                if (this.options.unlimit && this.options.unlimit.toDate().getTime() === date.toDate().getTime()) {
                    unlimitMode = true
                    date = moment().startOf('day')
                }

                var $title = $(this.element).find('.yearpicker .picker-header h4')
                var $body = $(this.element).find('.yearpicker .picker-body')

                var limit = 20
                var data = $body.data()
                var current = date.get('year')
                data.start = (data.start || (current - current % limit)) + dir * limit
                data.end = data.start + limit - 1

                $title.text(data.start + ' - ' + data.end)
                $body.empty()
                for (var i = data.start; i <= data.end; i++) {
                    $('<span>').text(i).attr('data-value', i)
                        .attr('bx-click', '_active("year")')
                        .addClass(!unlimitMode && current === i ? 'active' : '')
                        .appendTo($body)
                }

                return this
            },
            _renderMonthPicker: function() {
                var that = this
                var date = this.data.date
                var unlimitMode = false
                if (this.options.unlimit && this.options.unlimit.toDate().getTime() === date.toDate().getTime()) {
                    unlimitMode = true
                    date = moment().startOf('day')
                }

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
                        .addClass(!unlimitMode && date.get('month') === index ? 'active' : '')
                        .attr('bx-click', '_active("month")')
                        .appendTo($body)
                })

                return this
            },
            _renderDatePicker: function() {
                var date = this.data.date
                var unlimitMode = false
                if (this.options.unlimit && this.options.unlimit.toDate().getTime() === date.toDate().getTime()) {
                    unlimitMode = true
                    date = moment().startOf('day')
                }

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
                    $('<span>').text(ii).attr('data-value', ii)
                        .addClass(!unlimitMode && date.date() === ii ? 'active' : '')
                        .addClass(disabled(ii) ? 'disabled' : '')
                        .attr('bx-click', '_active("date")')
                        .appendTo($body)
                }
                return this

                function disabled(ii) {
                    if (!range.length) return false
                    var cur = moment(date).startOf('day').set('date', ii)
                    var min, max
                    for (var i = 0; i < range.length; i += 2) {
                        min = range[i] && moment(range[i]).startOf('day')
                        max = range[i + 1] && moment(range[i + 1]).startOf('day')
                        if (min && max && cur.diff(min, 'days') >= 0 && cur.diff(max, 'days') <= 0) return false
                        if (min && !max && cur.diff(min, 'days') >= 0) return false
                        if (!min && max && cur.diff(max, 'days') <= 0) return false
                        if (!min && !max) return false
                    }
                    return true
                }
            },
            _renderTimePicker: function() {
                var date = moment(this.data.date)

                var inputs = $(this.element).find('.timepicker div.timepicker-group input')
                inputs.eq(0).val(date.format('HH'))
                inputs.eq(1).val(date.format('mm'))
                inputs.eq(2).val(date.format('ss'))

                return this
            },
            _unlimit: function(event) {
                var date = this.data.date
                var unlimit = this.options.unlimit
                this.data.date = moment(unlimit)
                    // if (date.toDate().getTime() !== unlimit.toDate().getTime())
                this.trigger('change.datepicker', [unlimit, 'date'])
                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            }
        })

        return DatePicker
            // return Brix.extend({})
    }
)