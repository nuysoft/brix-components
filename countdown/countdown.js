/* global define, setInterval, clearInterval */
/*
    https://github.com/hilios/jQuery.countdown/blob/master/dist/jquery.countdown.js
    https://github.com/hilios/jQuery.countdown/blob/gh-pages/documentation.md
 */
define(
    [
        'jquery', 'underscore', 'moment',
        'base/brix',
        'text!./countdown.tpl',
        'css!./countdown.css'
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
                expires
            ### 属性
                final
            ### 方法
                .start()
                .pause()
                .resume()
                .stop()
            ### 事件
                * update.countdown
                * finish.countdown
                * stop.countdown

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

        function Countdown() {}

        _.extend(Countdown.prototype, Brix.prototype, {
            options: {
                precision: 500,
                expires: new Date()
            },
            render: function() {
                this.options.expires = moment(this.options.expires).toDate()
                this.data = this.data || _.extend({}, this.options)

                var html = _.template(template, this.data)
                var $element = $(this.element)
                $element.append(html)
                this.start()
            },
            start: function() {
                var that = this
                this.trigger('start.countdown', this.offset())

                function task() {
                    var offset = that.update()
                    if (offset.total === 0) {
                        Timer.pop(that.task, that.options.precision)
                        that.trigger('complete.countdown', offset)
                    }
                    return task
                }

                this.task = task

                this.on('complete.countdown', function() {
                    $(that.element).addClass('is-complete')
                })

                Timer.push(task(), this.options.precision)

                return this
            },
            stop: function() {
                this.options.expires = new Date()
                Timer.pop(this.task(), this.options.precision)
                return this
            },
            pause: function() {
                this.trigger('pause.countdown', this.offset())
                Timer.pop(this.task, this.options.precision)
                return this
            },
            resume: function() {
                this.trigger('resume.countdown', this.offset())
                Timer.push(this.task(), this.options.precision)
                return this
            },
            update: function() {
                var offset = this.offset()
                $(this.element)
                    .find('.totalDays').text(fix(offset.totalDays)).end()
                    .find('.hours').text(fix(offset.hours)).end()
                    .find('.minutes').text(fix(offset.minutes)).end()
                    .find('.seconds').text(fix(offset.seconds)).end()

                this.trigger('update.countdown', offset)

                return offset

                function fix(number, length) {
                    length = length || 2
                    switch (length) {
                        case 2:
                            return number < 10 ? '0' + number : number
                        case 3:
                            return number < 10 ? '00' + number :
                                number < 100 ? '0' + number :
                                number
                    }
                }
            },
            offset: function() {
                var expires = this.options.expires
                var total = expires.getTime() - new Date().getTime()
                total = Math.ceil(total / 1e3)
                total = total < 0 ? 0 : total
                var offset = {
                    total: total,
                    seconds: total % 60,
                    minutes: Math.floor(total / 60) % 60,
                    hours: Math.floor(total / 60 / 60) % 24,
                    days: Math.floor(total / 60 / 60 / 24) % 7,
                    totalDays: Math.floor(total / 60 / 60 / 24),
                    weeks: Math.floor(total / 60 / 60 / 24 / 7),
                    months: Math.floor(total / 60 / 60 / 24 / 30),
                    years: Math.floor(total / 60 / 60 / 24 / 365)
                }
                return offset
            }
        })

        var Timer = {
            push: function(task, interval) {
                this.timers = this.timers || {}
                this.timers[interval] = this.timers[interval] || []
                this.timers[interval].push(task)
                this.run()
            },
            pop: function(task, interval) {
                var timers = this.timers
                if (!timers || !timers[interval]) return
                for (var i = 0; i < timers[interval].length; i++) {
                    if (timers[interval][i] === task) timers[interval].splice(i--, 1)
                }
            },
            run: function() {
                _.each(this.timers, function(item, interval) {
                    if (!item.length) {
                        clearInterval(item.timer)
                        return
                    }
                    if (!item.timer) {
                        item.timer = setInterval(function() {
                            _.each(item, function(fn /*, index*/ ) {
                                fn()
                            })
                        }, interval)
                    }
                })
            }
        }

        return Countdown
    }
)