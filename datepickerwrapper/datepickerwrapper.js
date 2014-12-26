/* global define, require, document */
define(
    [
        'jquery', 'underscore', 'moment',
        'brix/loader', 'brix/base',
        './datepickerwrapper.tpl.js',
        'css!./datepickerwrapper.css'
    ],
    function(
        $, _, moment,
        Loader, Brix,
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
        return Brix.extend({
            options: {
                mode: 'signal', // signal multiple
                shortcut: [],
                dates: []
            },
            init: function() {
                // 修正选项
                if (this.options.dates.length > 1) this.options.mode = 'multiple'
                if (!this.options.dates.length) this.options.dates = [moment().format('YYYY-MM-DD')]

                // 支持自定义 HTML 模板 template
                template = this.options.template || template

                // 支持自定义 CSS 样式
                if (this.options.css) require('css!' + this.options.css)
            },
            render: function() {
                var that = this
                var $element = $(this.element)
                var html = _.template(template)(this.options)
                var $relatedElement = $(html).insertAfter($element)
                this.relatedElement = $relatedElement[0]

                this['_' + this.options.mode]()

                this._bindEvents()
                this.delegateBxTypeEvents(this.element)
                this.delegateBxTypeEvents(this.relatedElement)

                var type = 'click.datepickerwrapper_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if ($(event.target).parents('.datepickerwrapper').length) return
                        that.hide()
                    })
            },
            _bindEvents: function() {
                var that = this
                $(this.element).on('click', function(event) {
                    that.toggle()
                    event.preventDefault()
                    event.stopPropagation()
                })
            },
            _signal: function() {
                var that = this
                Loader.boot(this.relatedElement, function() {
                    // var pickers = $('.datepickerwrapper-pickers .picker', that.relatedElement)
                    var pickerComponents = Loader.query('components/datepicker', that.relatedElement)
                    _.each(pickerComponents, function(item, index) {
                        /* jshint unused:false */
                        item.on('change.datepicker', function(event, date, type) {
                            if (type !== 'date') return
                            $(that.element)[
                                /^input|textarea$/i.test(that.element.nodeName) ? 'val' : 'html'
                            ](date.format('YYYY-MM-DD'))
                            $(that.relatedElement).hide()
                            that.trigger('change.datepickerwrapper', date, type)
                        })
                    })
                })
            },
            _multiple: function() {
                var that = this
                Loader.boot(this.relatedElement, function() {
                    var inputs = $('.datepickerwrapper-inputs input', that.relatedElement)
                    var pickers = $('.datepickerwrapper-pickers .picker', that.relatedElement)
                    var pickerComponents = Loader.query('components/datepicker', that.relatedElement)
                    that._pickerComponents = pickerComponents
                    _.each(inputs, function(item, index) {
                        $(item)
                            .val(moment(that.options.dates[index]).format('YYYY-MM-DD'))
                            .on('focus', function(event) {
                                pickers.eq(index).show()
                                    .offset({
                                        left: $(event.target).offset().left
                                    })
                                    .siblings().hide()
                            })
                    })
                    _.each(pickerComponents, function(item, index) {
                        /* jshint unused:false */
                        item.on('change.datepicker', function(event, date, type) {
                            if (type !== 'date') return
                            inputs.eq(index).val(date.format('YYYY-MM-DD'))
                            pickers.eq(index).hide()
                        })
                    })
                })
            },
            show: function( /*event*/ ) {
                var $element = $(this.element)
                var offset = $element.offset()
                $(this.relatedElement).show()
                    .offset({
                        left: offset.left,
                        top: offset.top + $element.outerHeight()
                    })
            },
            hide: function( /*event*/ ) {
                $(this.relatedElement).hide()
            },
            toggle: function( /*event*/ ) {
                var $element = $(this.element)
                var offset = $element.offset()
                $(this.relatedElement).toggle()
                    .offset({
                        left: offset.left,
                        top: offset.top + $element.outerHeight()
                    })
            },
            submit: function( /*event*/ ) {
                var dates = _.map(this._pickerComponents, function(item /*, index*/ ) {
                    return item.val()
                })
                $(this.element).text(
                    _.map(dates, function(item /*, index*/ ) {
                        return item.format('YYYY-MM-DD')
                    }).join(', ')
                )
                this.trigger('change.datepickerwrapper', [dates])
                this.toggle()
            }
        })
    }
)