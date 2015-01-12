/* global define, require, document */
define(
    [
        'jquery', 'underscore', 'moment',
        'brix/loader', 'brix/base', 'brix/event',
        './datepickerwrapper.tpl.js',
        'css!./datepickerwrapper.css'
    ],
    function(
        $, _, moment,
        Loader, Brix, EventManager,
        template
    ) {
        /*
            shortcut
            dates

            TODO
            一个日期
            多个日期
            input trigger
            输入回调，输出回调
         */

        var RE_INPUT = /^input|textarea$/i
        var NAMESPACES = '.datepickerwrapper'
        var DATE_PATTERN = 'YYYY-MM-DD'
        var SHORTCUTS = function() {
            var now = moment()
            var nowDate = now.get('date')
            var shortcuts = {
                '今天': [
                    moment().startOf('day'),
                    moment().startOf('day')
                ],
                '昨天': [
                    moment().startOf('day').subtract(1, 'days'),
                    moment().startOf('day').subtract(1, 'days')
                ],
                '过去 7 天': [
                    moment().startOf('day').subtract(7, 'days'),
                    moment().startOf('day').subtract(1, 'days')
                ],
                '本月': [
                    moment().startOf('day').subtract(nowDate - 1, 'days'),
                    moment().startOf('day')
                ],
                '上月': [
                    moment().startOf('day').subtract(1, 'month').subtract(nowDate - 1, 'days'),
                    moment().startOf('day').subtract(nowDate, 'days')
                ],
                '最近 15 天': [
                    moment().startOf('day').subtract(15, 'days'),
                    moment().startOf('day').subtract(1, 'days')
                ]
            }
            return shortcuts
        }()


        function DatePickerWrapper() {}

        DatePickerWrapper.DATE_PATTERN = DATE_PATTERN
        DatePickerWrapper.SHORTCUTS = SHORTCUTS

        _.extend(DatePickerWrapper.prototype, Brix.prototype, {
            options: {
                mode: 'signal', // signal multiple
                shortcuts: SHORTCUTS,
                dates: []
            },
            init: function() {
                // 修正选项
                if (this.options.dates.length > 1) this.options.mode = 'multiple'
                if (!this.options.dates.length) this.options.dates = [moment().startOf('day').format(DATE_PATTERN)]
                if (this.options.shortcuts) {
                    _.each(this.options.shortcuts, function(dates /*, title*/ ) {
                        _.each(dates, function(date, index) {
                            dates[index] = moment(date)
                        })
                    })
                }

                // 支持自定义 HTML 模板 template
                template = this.options.template || template

                // 支持自定义 CSS 样式
                if (this.options.css) require('css!' + this.options.css)
            },
            render: function() {
                var that = this
                this.$element = $(this.element)
                this.$relatedElement = $(
                    _.template(template)(this.options)
                ).insertAfter(this.$element)

                this['_' + this.options.mode]()

                var manager = new EventManager('bx-')
                manager.delegate(this.$element, this)
                manager.delegate(this.$relatedElement, this)

                var type = 'click' + NAMESPACES + '_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.target === that.element || // 点击组件节点
                            $.contains(that.element, event.target) ||
                            $(event.target).closest('.datepickerwrapper').length || // 点击关联节点
                            !event.target.parentNode // 点击不存在节点
                        ) return

                        that.hide()
                    })
            },
            _signal: function() {
                var that = this
                Loader.boot(this.$relatedElement, function( /*records*/ ) {
                    var pickerComponent = Loader.query('components/datepicker', that.$relatedElement)[0]
                        /* jshint unused:false */
                    pickerComponent.on('change.datepicker', function(event, date, type) {
                        if (type !== undefined && type !== 'date') return

                        that.$relatedElement.hide()

                        var validate = $.Event('change' + NAMESPACES)
                        that.trigger(validate, [
                            [date], type
                        ])
                        if (!validate.isDefaultPrevented()) {
                            that.$element[
                                RE_INPUT.test(that.element.nodeName) ? 'val' : 'html'
                            ](date.format(DATE_PATTERN))
                        }
                    })
                })
            },
            _multiple: function() {
                var that = this
                Loader.boot(this.$relatedElement, function() {
                    var inputWrapper = $('.datepickerwrapper-inputs', that.$relatedElement)
                    var inputs = $('input', inputWrapper)

                    var pickerWrapper = $('.datepickerwrapper-pickers', that.$relatedElement)
                    var pickers = $('.picker', pickerWrapper)

                    var pickerComponents = Loader.query('components/datepicker', that.$relatedElement)

                    var shortcutWrapper = $('.datepickerwrapper-shortcuts', that.$relatedElement)
                    var shortcuts = $('span', shortcutWrapper)

                    if (that.options.shortcuts) {
                        _.each(_.values(that.options.shortcuts), function(dates, index) {
                            var same = true
                            _.each(dates, function(date, index) {
                                if (!date.isSame(that.options.dates[index]), 'days') same = false
                            })
                            if (same) {
                                shortcuts.eq(index).addClass('active')
                                    .siblings().removeClass('active')
                            }
                        })
                    }

                    _.each(inputs, function(item, index) {
                        $(item).val(moment(that.options.dates[index]).format(DATE_PATTERN)) // 初始值
                    })

                    _.each(pickerComponents, function(item, index) {
                        /* jshint unused:false */
                        item.val(that.options.dates[index])
                            .on('change.datepicker', function(event, date, type) {
                                if (type !== undefined && type !== 'date') return
                                inputs.eq(index).val(date.format(DATE_PATTERN))
                                pickers.eq(index).hide()
                            })
                    })
                })
            },
            _inputToggleDatePicker: function(event, index, type) {
                var inputWrapper = $('.datepickerwrapper-inputs', this.$relatedElement)
                var pickerWrapper = $('.datepickerwrapper-pickers', this.$relatedElement)
                var pickers = $('.picker', pickerWrapper)

                var inputWrapperOffset = inputWrapper.offset()
                pickerWrapper.offset({ // 修正日期组件容器的位置
                    left: inputWrapperOffset.left,
                    top: inputWrapperOffset.top + inputWrapper.outerHeight() + parseInt(pickerWrapper.css('margin-top'), 10)
                })

                var $target = $(event.target)
                var targetOffset = $target.offset()
                pickers.eq(index)[type ? type : 'toggle']()
                    .offset({ // 修正单个日期组件的位置
                        left: targetOffset.left
                    })
                    .siblings().hide()
            },
            show: function( /*event*/ ) {
                this.$relatedElement.show()
                    .offset(this._offset())
            },
            hide: function( /*event*/ ) {
                this.$relatedElement.hide()
            },
            toggle: function( /*event*/ ) {
                $(this.$relatedElement).toggle()
                    .offset(this._offset())
            },
            _offset: function() {
                var offset = this.$element.offset()
                return {
                    left: offset.left,
                    top: offset.top + this.$element.outerHeight() + parseInt(this.$relatedElement.css('margin-top'), 10)
                }
            },
            submit: function( /*event*/ ) {
                var pickerComponents = Loader.query('components/datepicker', this.$relatedElement)
                var dates = _.map(pickerComponents, function(item /*, index*/ ) {
                    return item.val()
                })

                this.toggle()

                var validate = $.Event('change' + NAMESPACES)
                this.trigger(validate, [dates])

                if (!validate.isDefaultPrevented()) {
                    var items = $('[data-index]', this.$element)
                    if (items.length) {
                        _.each(items, function(item, index) {
                            var $item = $(item)
                            index = +$item.attr('data-index')
                            $item[
                                RE_INPUT.test(item.nodeName) ? 'val' : 'html'
                            ](dates[index].format(DATE_PATTERN))

                        })
                    } else {
                        this.$element.text(
                            _.map(dates, function(item /*, index*/ ) {
                                return item.format(DATE_PATTERN)
                            }).join(', ')
                        )
                    }
                }
            },
            _change: function(event, type, index) {
                var that = this
                var $target = $(event.target)
                var pickerComponents = Loader.query('components/datepicker', this.$relatedElement)

                switch (type) {
                    case 'shortcut':
                        var dates = $target.attr('data-value').split(',')
                        _.each(dates, function(item, index) {
                            that.options.dates[index] = item
                            pickerComponents[index].val(item)
                        })

                        $target.addClass('active')
                            .siblings().removeClass('active')

                        this.submit()
                        break
                    case 'date':
                        var date = moment($target.val())
                        if (!date.isValid()) break
                        pickerComponents[index].val(date)
                        break
                }
            }
        })

        return DatePickerWrapper
            // return Brix.extend({})
    }
)