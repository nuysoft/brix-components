/* global define */
/*
    https://github.com/hilios/jQuery.countdown/blob/master/dist/jquery.countdown.js
    https://github.com/hilios/jQuery.countdown/blob/gh-pages/documentation.md
 */
define(
    [
        'jquery', 'underscore', 'moment',
        'base/brix',
        'text!./countdown.tpl',
        'less!./countdown.less'
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
                precision: 100,
                expires: new Date()
            },
            render: function() {
                this.options.expires = moment(this.options.expires).toDate()
                this.data = this.data || _.extend({}, this.options)

                var html = _.template(template, this.data)
                var $element = $(this.element)
                $element.append(html)
                this.$spans = $element.find('span')
                this.start()
            },
            start: function() {
                var that = this

                function task() {
                    that.update()
                    return task
                }

                this.task = task
                Timer.push(task(), this.options.precision)

                return this
            },
            stop: function() {
                Timer.pop(this.task, this.options.precision)
                this.trigger('stop.countdown')
                return this
            },
            pause: function() {
                return this.stop()
            },
            resume: function() {
                return this.start()
            },
            update: function() {
                var offset = this.offset()
                this.$spans
                    .eq(0).text(fix(offset.totalDays)).end()
                    .eq(1).text(fix(offset.hours)).end()
                    .eq(2).text(fix(offset.minutes)).end()
                    .eq(3).text(fix(offset.seconds)).end()


                return this

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
                if (total === 0) {
                    this.stop()
                    this.trigger('finish.countdown', offset)
                } else {
                    this.trigger('update.countdown', offset)
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
                    if (timers[interval] === task) timers[interval].splice(i--, 1)
                }
            },
            run: function() {
                var timers = this.timers
                for (var interval in timers) {
                    if (!timers[interval].length) {
                        clearInterval(timers[interval].timer)
                        break
                    }
                    if (!timers[interval].timer) {
                        timers[interval].timer = setInterval(function() {
                            for (var i = 0; i < timers[interval].length; i++) {
                                timers[interval][i]()
                            }
                        }, interval)
                    }
                }
            }
        }

        return Countdown
    }
)