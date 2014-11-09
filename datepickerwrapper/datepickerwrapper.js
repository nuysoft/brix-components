/* global define, require */
define(
    [
        'jquery', 'underscore', 'moment',
        'loader', 'base/brix',
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
         */
        return Brix.extend({
            options: {},
            init: function() {
                // 支持自定义 HTML 模板 template
                template = this.options.template || template
                // 支持自定义 CSS 样式
                if (this.options.css) require('css!' + this.options.css)
            },
            render: function() {
                var that = this
                var $element = $(this.element).css('position', 'relative')
                var html = _.template(template, this.options)
                var $relatedElement = $(html).insertAfter($element)
                this.relatedElement = $relatedElement[0]

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
                        item.on('change.date', function(event, extra) {
                            inputs.eq(index).val(extra.format('YYYY-MM-DD'))
                            pickers.eq(index).hide()
                        })
                    })
                })

                this.delegateBxTypeEvents(this.element)
                this.delegateBxTypeEvents(this.relatedElement)
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
                this.trigger('change', dates)
                this.toggle()
            }
        })
    }
)