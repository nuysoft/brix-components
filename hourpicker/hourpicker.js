/* global define, document */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './hourpicker.tpl.js',
        'css!./hourpicker.css'
    ],
    function(
        $, _,
        Brix,
        template
    ) {
        /*
            ### 数据
                {}
            ### 选项
                TODO
            ### 属性
                TODO
            ### 方法
                TODO
            ### 事件
                TODO
            ===

            ### 公共选项
                data template css
            ### 公共属性
                element relatedElement 
                moduleId clientId parentClientId childClientIds 
                data template css
            ### 公共方法
                .render()
            ### 公共事件
                ready destroyed

        */
        function HourPicker() {}

        _.extend(HourPicker.prototype, Brix.prototype, {
            options: {},
            init: function() {},
            render: function() {
                var that = this
                this.$element = $(this.element)

                var html = _.template(template)(this.options)
                this.$element.append(html)

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
                            console.table(that.val())
                        })
                    event.preventDefault()
                })
            },
            val: function() {
                // picker-day picker-hour
                return arguments.length ?
                    this._set.apply(this, arguments) :
                    this._get()
            },
            _get: function() {
                var result = {}
                var dayElements = this.$element.find('.picker-day')
                var hourElements
                var tmp
                _.each(dayElements, function(item, index) {
                    item = $(item)
                    tmp = []
                    hourElements = item.find('.picker-hour.active')
                    _.each(hourElements, function(item, index) {
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
                    _.each(hours, function(hour, index) {
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