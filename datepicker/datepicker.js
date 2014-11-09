/* global define */
/*
    Reference:
        [Bootstrap Component Sample](http://zombiej.github.io/bootstrap-components-3.0/)
    TODO
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
                var that = this
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

                this._bindEvents()

                this._sync()
                this._renderTimePicker()

                switch (true) {
                    case this.data.typeMap.time:
                        this._$yearpicker.hide()
                        this._$monthpicker.hide()
                        this._$datepicker.hide()
                        break
                    case this.data.typeMap.year:
                        this._$monthpicker.hide()
                        this._$datepicker.hide()
                        this._$timepicker.hide()
                        break
                    case this.data.typeMap.month:
                        this._$yearpicker.hide()
                        this._$datepicker.hide()
                        this._$timepicker.hide()
                        break
                    case this.data.typeMap.date:
                        this._$yearpicker.hide()
                        this._$monthpicker.hide()
                        this._$timepicker.hide()
                        break
                    default: // all
                        this._$yearpicker.hide()
                        this._$monthpicker.hide()
                }

                that.on('change', function(event, data) {
                    console.log(event.type, event.namespace, event.target, data.format('YYYY-MM-DD HH:mm:ss.SSS'))
                })
            },
            val: function(value) {
                if (value) {
                    this.data.date = moment(value)
                    this._sync()
                    this._renderTimePicker()
                    return
                }
                return this.data.date
            },
            _bindEvents: function() {
                var that = this
                var $element = $(this.element)
                this._$container = $element.find('.datepicker-container')

                this._$yearpicker = this._$container.find('.yearpicker')
                this._$yearpicker_header = this._$yearpicker.find('.picker-header')
                this._$yearpicker_header_title = this._$yearpicker_header.find('h4')
                this._$yearpicker_body = this._$yearpicker.find('.picker-body')

                this._$monthpicker = this._$container.find('.monthpicker')
                this._$monthpicker_header = this._$monthpicker.find('.picker-header')
                this._$monthpicker_header_title = this._$monthpicker_header.find('h4')
                this._$monthpicker_body = this._$monthpicker.find('.picker-body')

                this._$datepicker = this._$container.find('.datepicker')
                this._$datepicker_header_title = this._$datepicker.find('.picker-header h4')
                this._$datepicker_body_date = this._$datepicker.find('.picker-body .datepicker-body-value')

                this._$timepicker = this._$container.find('.timepicker')
                this._$timepicker_group_hours_input = this._$timepicker.find('div.timepicker-group:eq(0) input')
                this._$timepicker_group_minutes_input = this._$timepicker.find('div.timepicker-group:eq(1) input')
                this._$timepicker_group_seconds_input = this._$timepicker.find('div.timepicker-group:eq(2) input')

                this._$container
                    .on('click', '.yearpicker .picker-header .minus', function( /*event*/ ) {
                        that._renderYearPicker(-1)
                        that._sync()
                    })
                    .on('click', '.yearpicker .picker-header .plus', function( /*event*/ ) {
                        that._renderYearPicker(1)
                        that._sync()
                    })
                    .on('click', '.yearpicker .picker-body span', function(event) {
                        var $target = $(event.target).toggleClass('active')
                        $target.siblings().removeClass('active')
                        // moment().set(unit, value) // same as moment()[unit](value)
                        that.data.date.set('year', +$target.attr('data-value'))
                        that.trigger('change.year', that.data.date)
                        that._sync()
                        if (!that.data.typeMap.year) {
                            this._$yearpicker.slideUp('fast')
                            this._$monthpicker.slideDown('fast')
                        }
                    })

                this._$container
                    .on('click', '.monthpicker .picker-header h4', function( /*event*/ ) {
                        this._$monthpicker.slideUp('fast')
                        this._$yearpicker.slideDown('fast')
                    })
                    .on('click', '.monthpicker .picker-header .minus', function( /*event*/ ) {
                        that.data.date.add(-1, 'year')
                        that.trigger('change.year', that.data.date)
                        renderMonthPicker(-1)
                        that.sync()
                    })
                    .on('click', '.monthpicker .picker-header .plus', function( /*event*/ ) {
                        that.data.date.add(1, 'year')
                        that.trigger('change.year', that.data.date)
                        renderMonthPicker(1)
                        that.sync()
                    })
                    .on('click', '.monthpicker .picker-body span', function(event) {
                        var $target = $(event.target).toggleClass('active')
                        $target.siblings().removeClass('active')
                        that.data.date.set('month', +$target.attr('data-value'))
                        that.trigger('change.month', that.data.date)
                        that.sync()
                        if (!that.data.typeMap.month) {
                            this._$datepicker.slideDown('fast')
                            this._$monthpicker.slideUp('fast')
                        }
                    })

                this._$container
                    .on('click', '.datepicker .picker-header h4', function( /*event*/ ) {
                        this._$datepicker.slideUp('fast')
                        this._$monthpicker.slideDown('fast')
                    })
                    .on('click', '.datepicker .picker-header .minus', function( /*event*/ ) {
                        that.data.date.add(-1, 'month')
                        that.trigger('change.month', that.data.date)
                        that._sync()
                    })
                    .on('click', '.datepicker .picker-header .plus', function( /*event*/ ) {
                        that.data.date.add(1, 'month')
                        that.trigger('change.month', that.data.date)
                        that._sync()
                    })
                    .on('click', '.datepicker .datepicker-body-value span', function(event) {
                        var $target = $(event.target).toggleClass('active')
                        $target.siblings().removeClass('active')
                        that.data.date.set('date', +$target.attr('data-value'))
                        that.trigger('change.date', that.data.date)
                        that._sync()
                    })

                this._$container
                    .on('click', '.timepicker div.timepicker-group:eq(0) .time-minus', function( /*event*/ ) {
                        // moment().subtract(Number, String)
                        that.data.date.subtract(1, 'hours')
                        that.trigger('change.hour', that.data.date)
                        that._renderTimePicker()
                    })
                    .on('click', '.timepicker div.timepicker-group:eq(0) .time-plus', function( /*event*/ ) {
                        // moment().add(Number, String)
                        that.data.date.add(1, 'hours')
                        that.trigger('change.hour', that.data.date)
                        that._renderTimePicker()
                    })
                    .on('keydown', '.timepicker div.timepicker-group:eq(0) input', function(event) {
                        switch (event.which) {
                            case 38: // up
                                // moment().add(Number, String)
                                that.data.date.add(1, 'hours')
                                that.trigger('change.hour', that.data.date)
                                break
                            case 40: // down
                                // moment().subtract(Number, String)
                                that.data.date.subtract(1, 'hours')
                                that.trigger('change.hour', that.data.date)
                                break
                            default:
                                return
                        }
                        that._renderTimePicker()
                    })
                    .on('click', '.timepicker div.timepicker-group:eq(1) .time-minus', function( /*event*/ ) {
                        that.data.date.subtract(1, 'minutes')
                        that.trigger('change.minute', that.data.date)
                        that._renderTimePicker()
                    })
                    .on('click', '.timepicker div.timepicker-group:eq(1) .time-plus', function( /*event*/ ) {
                        that.data.date.add(1, 'minutes')
                        that.trigger('change.minute', that.data.date)
                        that._renderTimePicker()
                    })
                    .on('keydown', '.timepicker div.timepicker-group:eq(1) input', function(event) {
                        switch (event.which) {
                            case 38: // up
                                that.data.date.add(1, 'minutes')
                                that.trigger('change.minute', that.data.date)
                                break
                            case 40: // down
                                that.data.date.subtract(1, 'minutes')
                                that.trigger('change.minute', that.data.date)
                                break
                            default:
                                return
                        }
                        that._renderTimePicker()
                    })
                    .on('click', '.timepicker div.timepicker-group:eq(2) .time-minus', function( /*event*/ ) {
                        that.data.date.subtract(1, 'seconds')
                        that.trigger('change.second', that.data.date)
                        that._renderTimePicker()
                    })
                    .on('click', '.timepicker div.timepicker-group:eq(2) .time-plus', function( /*event*/ ) {
                        that.data.date.add(1, 'seconds')
                        that.trigger('change.second', that.data.date)
                        that._renderTimePicker()
                    })
                    .on('keydown', '.timepicker div.timepicker-group:eq(2) input', function(event) {
                        switch (event.which) {
                            case 38: // up
                                that.data.date.add(1, 'seconds')
                                that.trigger('change.second', that.data.date)
                                break
                            case 40: // down
                                that.data.date.subtract(1, 'seconds')
                                that.trigger('change.second', that.data.date)
                                break
                            default:
                                return
                        }
                        that._renderTimePicker()
                    })

            },
            _sync: function() {
                this._renderYearPicker()
                this._renderMonthPicker()
                this._renderDatePicker()
            },
            _renderYearPicker: function(dir) {
                dir = dir || 0
                var limit = 20
                var data = this._$yearpicker_body.data()
                var current = this.data.date.get('year')
                data.start = (data.start || (current - current % limit)) + dir * limit
                data.end = data.start + limit - 1

                this._$yearpicker_header_title.text(data.start + ' - ' + data.end)

                this._$yearpicker_body.empty()
                for (var i = data.start; i <= data.end; i++) {
                    $('<span>').text(i).attr('data-value', i)
                        .addClass(current === i ? 'active' : '')
                        .appendTo(this._$yearpicker_body)
                }
            },
            _renderMonthPicker: function() {
                var date = this.data.date
                this._$monthpicker_header_title.text(date.get('year'))
                this._$monthpicker_body.empty()
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
                        .appendTo(this._$monthpicker_body)
                })
            },
            _renderDatePicker: function() {
                var date = this.data.date
                var days = date.daysInMonth()
                var startDay = moment(date).date(1).day()
                this._$datepicker_header_title.text(
                    date.format('YYYY - MM')
                )
                this._$datepicker_body_date.empty()
                for (var i = 0; i < startDay; i++) {
                    $('<span class="inactive">')
                        .appendTo(this._$datepicker_body_date)
                }
                for (var ii = 1; ii <= days; ii++) {
                    $('<span>').text(ii).attr('data-value', ii)
                        .addClass(date.date() === ii ? 'active' : '')
                        .appendTo(this._$datepicker_body_date)
                }
            },
            _renderTimePicker: function() {
                var date = moment(this.data.date)
                this._$timepicker_group_hours_input.val(date.format('HH'))
                this._$timepicker_group_minutes_input.val(date.format('mm'))
                this._$timepicker_group_seconds_input.val(date.format('ss'))
                this._sync()
            }
        })
    }
)