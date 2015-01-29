/* global define, document, location, console */
define(
    [
        'jquery', 'underscore', 'moment',
        'brix/base', 'brix/event',
        '../dialog/position.js',
        './hourpicker.tpl.js',
        'css!./hourpicker.css'
    ],
    function(
        $, _, moment,
        Brix, EventManager,
        position,
        template
    ) {

        var DEBUG = ~location.search.indexOf('debug')

        function HourPicker() {}

        _.extend(HourPicker.prototype, Brix.prototype, {
            options: {
                utcOffset: function() {
                    var utcOffset = moment().utcOffset() / 60
                    var abs = Math.abs(utcOffset)
                    var result = abs < 10 ? '0' + abs : abs
                    result = utcOffset < 0 ? '-' + result : '+' + result
                    result += ':00'
                    return result
                }()
            },
            init: function() {},
            render: function() {
                var that = this
                this.$element = $(this.element)
                this.manager = new EventManager('bx-')

                var html = _.template(template)(this.options)
                this.$element.append(html)

                this.manager.delegate(this.$element, this)

                /* jshint unused:true */
                $('.picker-hours').contents().filter(function(index, element) {
                    return element.nodeType === 3
                }).remove()

                var hours = $('.picker-hour')
                hours.on('mousedown', function(event) {
                    var $target = $(this)
                    var has = !$target.hasClass('active')
                    $target.toggleClass('active')
                    that._merge()

                    $('.shortcuts input[name=shortcut]', this.$element).prop('checked', false)

                    var siblings = $(this).siblings()
                    siblings.on('mouseenter.drag', function(event) {
                        var $target = $(this)
                        $target[has ? 'addClass' : 'removeClass']('active')
                        that._merge()
                        event.preventDefault()
                    })
                    $(document.body).off('mouseup.drag')
                        .on('mouseup.drag', function( /*event*/ ) {
                            siblings.off('mouseenter.drag')
                            $(document.body).off('mouseup.drag')
                            if (DEBUG) console.table(that.val())
                        })
                    event.preventDefault()
                })
            },
            // { day: [] }
            // day, hours []
            val: function() {
                // picker-day picker-hour
                return arguments.length ?
                    this._set.apply(this, arguments) :
                    this._get()
            },
            /* jshint unused:true */
            shortcut: function(event, days) {
                days += ''
                var hours = _.range(0, 24)

                if (days.length === 1) {
                    var tmpDayHours = this.val()[days]
                    if (tmpDayHours.length === 24) this.val(days, [])
                    else this.val(days, hours)
                    event.preventDefault()
                    return
                }

                var mapped = {}
                _.each(days, function(day /*, index*/ ) {
                    mapped[day] = hours
                })
                this.val(mapped)
            },
            apply: function(event, todo, day) {
                var that = this
                var $target = $(event.target)
                var $relatedElement = $('.apply-dialog', this.$element)
                switch (todo) {
                    case 'to':
                        this._tmp = this._tmp || {}
                        this._tmp.from = day
                        this._tmp.$target = $target.css('visibility', 'visible')
                        var offset = position($target, $relatedElement, 'bottom', 'right')
                        $relatedElement.show().offset(offset)
                        $relatedElement
                            .find('input').prop('checked', false).end()
                            .find('label[data-value] input').prop('disabled', false).end()
                            .find('label[data-value=' + day + '] input').prop('disabled', true)
                        break
                    case 'do':
                        var days = _.map($relatedElement.find('input:checked'), function(item /*, index*/ ) {
                            return item.value
                        })
                        var hours = this.val()[this._tmp.from]
                        _.each(days, function(day /*, index*/ ) {
                            that.val(day, hours)
                        })
                        $relatedElement.hide()
                        this._tmp.$target.css('visibility', 'inherit')
                        break
                    case 'close':
                        this._tmp.$target.css('visibility', 'inherit')
                        break
                    default:
                        $relatedElement.hide()
                }
            },
            _get: function() {
                var result = {}
                var dayElements = this.$element.find('.picker-day')
                var hourElements
                var tmp
                _.each(dayElements, function(item /*, index*/ ) {
                    item = $(item)
                    tmp = []
                    hourElements = item.find('.picker-hour.active')
                    _.each(hourElements, function(item /*, index*/ ) {
                        tmp.push($(item).attr('data-value'))
                    })
                    result[item.attr('data-value')] = tmp
                })
                return result
            },
            // { day: [] }
            // day, hours []
            _set: function(mapped) {
                var args = [].slice.call(arguments)
                var dayElements = this.$element.find('.picker-day')

                // 设置单日
                if (arguments.length === 2) {
                    mapped = {}
                    mapped[args[0]] = args[1]

                    // 先清除单日数据
                    dayElements.filter('[data-value=' + args[0] + ']').find('.picker-hour').removeClass('active')
                } else {
                    // 设置整周，先清除整周数据
                    dayElements.find('.picker-hour').removeClass('active')
                }

                var hourElements
                _.each(mapped, function(hours, day) {
                    hourElements = dayElements.filter('[data-value=' + day + ']').find('.picker-hour')
                    _.each(hours, function(hour /*, index*/ ) {
                        hourElements.filter('[data-value=' + hour + ']').addClass('active')
                    })
                })

                this._merge()
            },
            _merge: function() {
                var hours = $('.picker-hour')
                _.each(hours, function(item /*, index*/ ) {
                    item = $(item)
                    var start = item.find('.picker-hour-start')
                    var end = item.find('.picker-hour-end')
                    if (!item.hasClass('active')) {
                        start.hide()
                        end.hide()
                    } else {
                        // start.show()
                        // end.show()
                        start[
                            item.prev().hasClass('active') ? 'hide' : 'show'
                        ]()
                        end[
                            item.next().hasClass('active') ? 'hide' : 'show'
                        ]()
                    }
                })
            }
        })

        return HourPicker
    }
)