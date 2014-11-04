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
        'text!./datepicker.tpl',
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
        function DatePicker() {}

        _.extend(DatePicker.prototype, Brix.prototype, {
            options: {
                date: moment(), // date dateShadow
                type: 'all' // time date month year dall
            },
            render: function() {
                var that = this
                var $element = $(this.element)
                this.data = this.data || _.extend({}, this.options)
                this.data.date = moment(this.data.date)
                this.data.typeMap = function(type) {
                    var result = {}
                    var typeMap = type.split(' ')
                    _.each(typeMap, function(item) {
                        result[item] = true
                    })
                    return result
                }(this.data.type)
                var html = _.template(template, this.data)
                $element.append(html)

                var YEAR_PICKER_HEADER_MINUS = '.yearpicker .picker-header .minus'
                var YEAR_PICKER_HEADER_PLUS = '.yearpicker .picker-header .plus'
                var YEAR_PICKER_BODY_SPAN = '.yearpicker .picker-body span'

                var MONTH_PICKER_HEADER_TITLE = '.monthpicker .picker-header h4'
                var MONTH_PICKER_HEADER_MINUS = '.monthpicker .picker-header .minus'
                var MONTH_PICKER_HEADER_PLUS = '.monthpicker .picker-header .plus'
                var MONTH_PICKER_BODY_SPAN = '.monthpicker .picker-body span'

                var DATE_PICKER_HEADER_TITLE = '.datepicker .picker-header h4'
                var DATE_PICKER_HEADER_MINUS = '.datepicker .picker-header .minus'
                var DATE_PICKER_HEADER_PLUS = '.datepicker .picker-header .plus'
                var DATE_PICKER_BODY_SPAN = '.datepicker .datepicker-body-value span'

                var TIME_PICKER_GROUP_HOURS_INPUT = '.timepicker div.timepicker-group:eq(0) input'
                var TIME_PICKER_GROUP_HOURS_MINUS = '.timepicker div.timepicker-group:eq(0) .time-minus'
                var TIME_PICKER_GROUP_HOURS_PLUS = '.timepicker div.timepicker-group:eq(0) .time-plus'
                var TIME_PICKER_GROUP_MINUTES_INPUT = '.timepicker div.timepicker-group:eq(1) input'
                var TIME_PICKER_GROUP_MINUTES_MINUS = '.timepicker div.timepicker-group:eq(1) .time-minus'
                var TIME_PICKER_GROUP_MINUTES_PLUS = '.timepicker div.timepicker-group:eq(1) .time-plus'
                var TIME_PICKER_GROUP_SECONDS_INPUT = '.timepicker div.timepicker-group:eq(2) input'
                var TIME_PICKER_GROUP_SECONDS_MINUS = '.timepicker div.timepicker-group:eq(2) .time-minus'
                var TIME_PICKER_GROUP_SECONDS_PLUS = '.timepicker div.timepicker-group:eq(2) .time-plus'


                var $container = $element.find('.datepicker-container')

                var $yearpicker = $container.find('.yearpicker')
                var $yearpicker_header = $yearpicker.find('.picker-header')
                    // var $yearpicker_header_year_minus = $yearpicker_header.find('.minus')
                var $yearpicker_header_title = $yearpicker_header.find('h4')
                    // var $yearpicker_header_year_plus = $yearpicker_header.find('.plus')
                var $yearpicker_body = $yearpicker.find('.picker-body')

                var $monthpicker = $container.find('.monthpicker')
                var $monthpicker_header = $monthpicker.find('.picker-header')
                    // var $monthpicker_header_year_minus = $monthpicker_header.find('.minus')
                var $monthpicker_header_title = $monthpicker_header.find('h4')
                    // var $monthpicker_header_year_plus = $monthpicker_header.find('.plus')
                var $monthpicker_body = $monthpicker.find('.picker-body')

                var $datepicker = $container.find('.datepicker')
                var $datepicker_header = $datepicker.find('.picker-header')
                    // var $datepicker_header_month_minus = $datepicker_header.find('.minus')
                var $datepicker_header_title = $datepicker_header.find('h4')
                    // var $datepicker_header_month_plus = $datepicker_header.find('.plus')
                var $datepicker_body = $datepicker.find('.picker-body')
                    // var $datepicker_body_description = $datepicker_body.find('.datepicker-body-description')
                var $datepicker_body_date = $datepicker_body.find('.datepicker-body-value')

                var $timepicker = $container.find('.timepicker')
                var $timepicker_group_hours = $timepicker.find('div.timepicker-group:eq(0)')
                var $timepicker_group_hours_input = $timepicker_group_hours.find('input')
                    // var $timepicker_group_hours_minus = $timepicker_group_hours.find('.minus')
                    // var $timepicker_group_hours_plus = $timepicker_group_hours.find('.plus')
                var $timepicker_group_minutes = $timepicker.find('div.timepicker-group:eq(1)')
                var $timepicker_group_minutes_input = $timepicker_group_minutes.find('input')
                    // var $timepicker_group_minutes_minus = $timepicker_group_minutes.find('.minus')
                    // var $timepicker_group_minutes_plus = $timepicker_group_minutes.find('.plus')
                var $timepicker_group_seconds = $timepicker.find('div.timepicker-group:eq(2)')
                var $timepicker_group_seconds_input = $timepicker_group_seconds.find('input')
                    // var $timepicker_group_seconds_minus = $timepicker_group_seconds.find('.minus')
                    // var $timepicker_group_seconds_plus = $timepicker_group_seconds.find('.plus')

                $container
                    .on('click', YEAR_PICKER_HEADER_MINUS, function( /*event*/ ) {
                        renderYearPicker(-1)
                        sync()
                    })
                    .on('click', YEAR_PICKER_HEADER_PLUS, function( /*event*/ ) {
                        renderYearPicker(1)
                        sync()
                    })
                    .on('click', YEAR_PICKER_BODY_SPAN, function(event) {
                        var $target = $(event.target)
                            .toggleClass('active')
                        $target.siblings().removeClass('active')
                        that.data.date.set('year', +$target.attr('data-value'))
                        sync()
                        if (!that.data.typeMap.year) {
                            $yearpicker.slideUp('fast')
                            $monthpicker.slideDown('fast')
                        }
                    })
                    .on('click', MONTH_PICKER_HEADER_TITLE, function( /*event*/ ) {
                        $monthpicker.slideUp('fast')
                        $yearpicker.slideDown('fast')
                    })
                    .on('click', MONTH_PICKER_HEADER_MINUS, function( /*event*/ ) {
                        renderMonthPicker(-1)
                        sync()
                    })
                    .on('click', MONTH_PICKER_HEADER_PLUS, function( /*event*/ ) {
                        renderMonthPicker(1)
                        sync()
                    })
                    .on('click', MONTH_PICKER_BODY_SPAN, function(event) {
                        var $target = $(event.target)
                            .toggleClass('active')
                        $target.siblings().removeClass('active')
                        that.data.date.set('month', +$target.attr('data-value'))
                        sync()
                        if (!that.data.typeMap.month) {
                            $datepicker.slideDown('fast')
                            $monthpicker.slideUp('fast')
                        }
                    })
                    .on('click', DATE_PICKER_HEADER_TITLE, function( /*event*/ ) {
                        $datepicker.slideUp('fast')
                        $monthpicker.slideDown('fast')
                    })
                    .on('click', DATE_PICKER_HEADER_MINUS, function( /*event*/ ) {
                        renderDatePicker(-1)
                        sync()
                    })
                    .on('click', DATE_PICKER_HEADER_PLUS, function( /*event*/ ) {
                        renderDatePicker(1)
                        sync()
                    })
                    .on('click', DATE_PICKER_BODY_SPAN, function(event) {
                        var $target = $(event.target)
                            .toggleClass('active')
                        $target.siblings().removeClass('active')
                        that.data.date.set('date', +$target.attr('data-value'))
                        sync()
                    })
                    .on('click', TIME_PICKER_GROUP_HOURS_MINUS, function( /*event*/ ) {
                        that.data.date.subtract(1, 'hours')
                        renderTimePicker()
                    })
                    .on('click', TIME_PICKER_GROUP_HOURS_PLUS, function( /*event*/ ) {
                        that.data.date.add(1, 'hours')
                        renderTimePicker()
                    })
                    .on('keydown', TIME_PICKER_GROUP_HOURS_INPUT, function(event) {
                        // up 38 down 40
                        switch (event.which) {
                            case 38: // up
                                that.data.date.add(1, 'hours')
                                break
                            case 40: // down
                                that.data.date.subtract(1, 'hours')
                                break
                            default:
                                return
                        }
                        renderTimePicker()
                    })
                    .on('click', TIME_PICKER_GROUP_MINUTES_MINUS, function( /*event*/ ) {
                        that.data.date.subtract(1, 'minutes')
                        renderTimePicker()
                    })
                    .on('click', TIME_PICKER_GROUP_MINUTES_PLUS, function( /*event*/ ) {
                        that.data.date.add(1, 'minutes')
                        renderTimePicker()
                    })
                    .on('keydown', TIME_PICKER_GROUP_MINUTES_INPUT, function(event) {
                        // up 38 down 40
                        switch (event.which) {
                            case 38: // up
                                that.data.date.add(1, 'minutes')
                                break
                            case 40: // down
                                that.data.date.subtract(1, 'minutes')
                                break
                            default:
                                return
                        }
                        renderTimePicker()
                    })
                    .on('click', TIME_PICKER_GROUP_SECONDS_MINUS, function( /*event*/ ) {
                        that.data.date.subtract(1, 'seconds')
                        renderTimePicker()
                    })
                    .on('click', TIME_PICKER_GROUP_SECONDS_PLUS, function( /*event*/ ) {
                        that.data.date.add(1, 'seconds')
                        renderTimePicker()
                    })
                    .on('keydown', TIME_PICKER_GROUP_SECONDS_INPUT, function(event) {
                        // up 38 down 40
                        switch (event.which) {
                            case 38: // up
                                that.data.date.add(1, 'seconds')
                                break
                            case 40: // down
                                that.data.date.subtract(1, 'seconds')
                                break
                            default:
                                return
                        }
                        renderTimePicker()
                    })

                function sync() {
                    renderYearPicker()
                    renderMonthPicker()
                    renderDatePicker()
                }
                sync()

                function renderYearPicker(dir) {
                    dir = dir || 0
                    var limit = 20
                    var data = $yearpicker_body.data()
                    var current = that.data.date.get('year')
                    data.start = (data.start || (current - current % limit)) + dir * limit
                    data.end = data.start + limit - 1

                    $yearpicker_header_title.text(data.start + ' - ' + data.end)

                    $yearpicker_body.empty()
                    for (var i = data.start; i <= data.end; i++) {
                        $('<span>')
                            .text(i)
                            .attr('data-value', i)
                            .addClass(current === i ? 'active' : '')
                            .appendTo($yearpicker_body)
                    }
                }

                function renderMonthPicker(dir) {
                    dir = dir || 0
                    var date = that.data.date.add(dir, 'year')
                    $monthpicker_header_title.text(date.get('year'))
                    $monthpicker_body.empty()
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
                        $('<span>')
                            .text(item)
                            .attr('data-value', index)
                            .addClass(date.get('month') === index ? 'active' : '')
                            .appendTo($monthpicker_body)
                    })
                }

                function renderDatePicker(dir) {
                    dir = dir || 0
                    var date = that.data.date.add(dir, 'month')
                    var days = date.daysInMonth()
                    var startDay = moment(date).date(1).day()
                    $datepicker_header_title.text(
                        date.format('YYYY - MM')
                    )
                    $datepicker_body_date.empty()
                    for (var i = 0; i < startDay; i++) {
                        $('<span class="inactive">')
                            .appendTo($datepicker_body_date)
                    }
                    for (var ii = 1; ii <= days; ii++) {
                        $('<span>')
                            .text(ii)
                            .attr('data-value', ii)
                            .addClass(date.date() === ii ? 'active' : '')
                            .appendTo($datepicker_body_date)
                    }
                }

                function renderTimePicker() {
                    var date = moment(that.data.date)
                    $timepicker_group_hours_input.val(date.format('HH'))
                    $timepicker_group_minutes_input.val(date.format('mm'))
                    $timepicker_group_seconds_input.val(date.format('ss'))
                    sync()
                }

                renderTimePicker()

                switch (true) {
                    case this.data.typeMap.time:
                        $yearpicker.hide()
                        $monthpicker.hide()
                        $datepicker.hide()
                        break
                    case this.data.typeMap.year:
                        $monthpicker.hide()
                        $datepicker.hide()
                        $timepicker.hide()
                        break
                    case this.data.typeMap.month:
                        $yearpicker.hide()
                        $datepicker.hide()
                        $timepicker.hide()
                        break
                    case this.data.typeMap.date:
                        $yearpicker.hide()
                        $monthpicker.hide()
                        $timepicker.hide()
                        break
                    default: // all
                        $yearpicker.hide()
                        $monthpicker.hide()
                }
            }
        })

        return DatePicker
    }
)