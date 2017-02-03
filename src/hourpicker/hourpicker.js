/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=HourPicker
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/hourpicker/
        Temporary

    # HourPicker

    时间选择器组件。

    ```html
    <div bx-name="components/hourpicker"></div>
    ```

    ## 配置

    配置项   | 类型                      | 默认值  | 说明
    :------- | :------------------------ | :------ | :----------
    simplify | bolean                    | `false` | 可选。是否为精简模式。
    value    | string or array or object | `''`    | 可选。指定选中的时间。

    ## 方法

    * .val()
        读取时间选择器的值。
    * .val( day, hours )
        设置单天选中的时间。
    * .val( { day: [ hours ] } )
        同时设置多天选中的时间。

    ## 事件

    事件类型          | 说明
    :---------------- | :----------
    change.hourpicker | 当值发生变化时被触发。
 */
define(
    [
        'jquery', 'underscore', 'moment',
        'brix/base', 'brix/event',
        '../dialog/position/position.js',
        './hourpicker.tpl.js'
    ],
    function(
        $, _, moment,
        Brix, EventManager,
        position,
        template
    ) {

        var NAMESPACE = '.hourpicker'
        var DICT = {
            DEFAULT: [ // 为了保证遍历数序，采用数组
                [1, '周一'],
                [2, '周二'],
                [3, '周三'],
                [4, '周四'],
                [5, '周五'],
                [6, '周六'],
                [0, '周日']
            ],
            GROUPED: [
                ['12345', '工作日'],
                ['60', '休息日']
            ]
        }
        var HOURS = _.range(0, 24)

        function HourPicker() {}

        _.extend(HourPicker.prototype, Brix.prototype, {
            options: {
                simplify: false,
                /*
                    完整模式：
                        data-value="135"
                        data-value="1,3,5"
                        data-value="[1,3,5]"
                        data-value="{1:[0,2,4]}"
                    精简模式：
                        data-value="12345,60"
                        data-value="[12345,60]"
                        data-value="{12345:[0,2,4],60:[1,3,5]}"
                 */
                value: '',
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
                this.$manager = new EventManager('bx-')

                var html = _.template(template)({
                    utcOffset: this.options.utcOffset,
                    simplify: this.options.simplify,
                    DICT: this.options.simplify ? DICT.GROUPED : DICT.DEFAULT,
                    HOURS: HOURS
                })
                this.$element.append(html)

                if (this.options.value) {
                    var days
                    var args = {}
                    switch ($.type(this.options.value)) {
                        case 'string': // data-value="135" data-value="1,3,5"
                            days = this.options.value.split(
                                this.options.value.indexOf(',') != -1 ? ',' : ''
                            )
                            _.each(days, function(item /*, index*/ ) {
                                args[$.trim(item)] = HOURS
                            })
                            break
                        case 'array': // data-value="[1,3,5]"
                            days = this.options.value
                            _.each(days, function(item /*, index*/ ) {
                                args[item] = HOURS
                            })
                            break
                        case 'object': // data-value="{1:[0,2,4]}"
                            args = this.options.value
                            break
                    }
                    this.val(args)
                }

                this.$manager.delegate(this.$element, this)

                /* jshint unused:true */
                $('.picker-hours', this.$element)
                    .contents()
                    .filter(function(index, element) {
                        return element.nodeType === 3
                    })
                    .remove()

                var hours = $('.picker-hour', this.$element)
                hours.on('mousedown', function(event) {
                    var $target = $(this)
                    var has = !$target.hasClass('active')
                    $target.toggleClass('active')
                    that._merge()
                    that._syncShortcut()

                    var siblings = $(this).siblings()
                    siblings.on('mouseenter.drag' + NAMESPACE, function(event) {
                        var $target = $(this)
                        $target[has ? 'addClass' : 'removeClass']('active')
                        that._merge()
                        that._syncShortcut()
                        event.preventDefault()
                    })
                    $(document.body).off('mouseup.drag' + NAMESPACE)
                        .on('mouseup.drag' + NAMESPACE, function( /*event*/ ) {
                            siblings.off('mouseenter.drag' + NAMESPACE)
                            $(document.body).off('mouseup.drag' + NAMESPACE)

                            that.trigger('change' + NAMESPACE, that.val())
                        })
                    event.preventDefault()
                })
            },
            // { day: [] }
            // day, hours []
            val: function() {
                // val()
                if (!arguments.length) return this._get()

                // val( value )
                // picker-day picker-hour
                this._set.apply(this, arguments)
                this.trigger('change' + NAMESPACE, this._get())
                return this
            },
            /* jshint unused:true */
            shortcut: function(event, days) {
                if (days === undefined) {
                    days = event
                    event = undefined
                }

                // days += ''
                if (!_.isArray(days)) days = [days]
                var mapped = {}
                _.each(days, function(day /*, index*/ ) {
                    mapped[day] = HOURS
                })
                this.val(mapped)
            },
            toggle: function(event, day) {
                if (day === undefined) {
                    day = event
                    event = undefined
                }

                var tmpDayHours = this.val()[day]
                if (tmpDayHours.length === 24) this.val(day, [])
                else this.val(day, HOURS)
                if (event) event.preventDefault()
            },
            apply: function(event, todo /* to|do|close */ , day) {
                var that = this
                var $target = $(event.target)
                var $relatedElement = $('.apply-dialog', this.$element)
                switch (todo) {
                    case 'to':
                        this._tmp = this._tmp || {}
                        this._tmp.from = day
                        this._tmp.$target = $target.css('visibility', 'visible')
                        var offset = position($target, $relatedElement, 'bottom', 'right')
                        var marginTop = parseInt($relatedElement.css('margin-top'), 10) || 0
                        $relatedElement.show().offset({
                            left: offset.left,
                            top: offset.top + marginTop
                        })
                        $relatedElement
                            .find('label[data-value]').removeClass('disabled')
                            .find('input[name="shortcut"]').prop({
                                'checked': false,
                                'disabled': false
                            }).end().end()
                            .find('label[data-value=' + day + ']').addClass('disabled')
                            .find('input').prop('disabled', true)
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
                        tmp.push(+$(item).attr('data-value'))
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
                this._syncShortcut()
            },
            _merge: function() {
                var hours = $('.picker-hour', this.$element)
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
            },
            _syncShortcut: function() {
                if (this.options.simplify) return

                var value = this.val()

                function is(days, other) {
                    var day
                    for (var i = 0; i < days.length; i++) {
                        day = days[i]
                        if (value[day].length < 24) return false
                    }
                    for (var j = 0; j < other.length; j++) {
                        day = other[j]
                        if (value[day].length !== 0) return false
                    }

                    return true
                }

                $('.shortcuts input[name=shortcut]:eq(0)', this.$element).prop('checked', is('0123456', ''))
                $('.shortcuts input[name=shortcut]:eq(1)', this.$element).prop('checked', is('12345', '06'))
                $('.shortcuts input[name=shortcut]:eq(2)', this.$element).prop('checked', is('06', '12345'))
            },
            destroy: function() {
                this.$manager.undelegate(this.$element)

                this.$element.empty()
            }
        })

        return HourPicker
    }
)