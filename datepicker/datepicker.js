/* global define */
/*
    Reference:
        [Bootstrap Component Sample](http://zombiej.github.io/bootstrap-components-3.0/)
    TODO
        multi types
        disable
        multi calendar
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
                type: 'all' // time date month year all
            },
            render: function() {
                var $element = $(this.element)

                this.data = this.data || _.extend({}, this.options)
                this.data.date = moment(this.data.date)
                // { time: bool, date: bool, month: bool, year: bool, all: bool }
                this.data.typeMap = function(type) {
                    var result = {}
                    _.each(type.split(' '), function(item /*, index*/ ) {
                        result[item] = true
                    })
                    return result
                }(this.data.type)

                var html = _.template(template, this.data)
                $element.append(html)

                this.delegateBxTypeEvents(this.element)

                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()
            },
            val: function(value) {
                if (value) {
                    this.data.date = moment(value)
                    this.trigger('change', this.data.date)
                    this._sync()
                    this._renderTimePicker()
                    return
                }
                return this.data.date
            },
            _slide: function(event, from, to) {
                // _slide(from, to)
                if (arguments.length == 2) {
                    to = from
                    from = event
                }
                $(this.element).find(from).slideUp('fast')
                $(this.element).find(to).slideDown('fast')
            },
            /* jshint unused:false */
            _move: function(event, unit, dir) {
                if (unit === 'year') {
                    this._renderYearPicker(dir)._renderDatePicker()
                    return
                }
                // month date
                this.data.date.add(dir, unit)
                this.trigger('change.' + unit, this.data.date)
                this._renderYearPicker()._renderMonthPicker()._renderDatePicker()
            },
            _active: function(event, unit) {
                var $target = $(event.target).toggleClass('active')
                $target.siblings().removeClass('active').end()
                this.data.date.set(unit, +$target.attr('data-value'))
                this.trigger('change.' + unit, this.data.date)
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
                this.data.date.add(extra, units)
                this.trigger('change.' + unit, this.data.date)
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
            _sync: function() {
                this._renderYearPicker()
                this._renderMonthPicker()
                this._renderDatePicker()
                return this
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
                        .addClass(date.date() === ii ? 'active' : '')
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