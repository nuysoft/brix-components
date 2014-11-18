/* global define, require, document */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './position.js',
        './dialog.tpl.js',
        'css!./dialog.css'
    ],
    function(
        $, _,
        Brix,
        position,
        template
    ) {
        return Brix.extend({
            options: {
                placement: 'right', // top bottom left right
                align: 'top', // left right top bottom
                closable: true,
                content: '',
                width: 'auto',
                height: 'auto',
                offset: {
                    left: 0,
                    top: 0
                }
            },
            init: function() {
                this.$element = $(this.element)

                // 支持自定义 CSS 样式
                if (this.options.css) require('css!' + this.options.css)
            },
            render: function() {
                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).appendTo(document.body)
                this.$relatedElement.css({
                    width: this.options.width,
                    height: this.options.height
                })
                this.delegateBxTypeEvents(this.$element)
                this.delegateBxTypeEvents(this.$relatedElement)
            },
            show: function() {
                var offset = position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                this.$relatedElement.show()
                    .css(this._start(offset))
                    .animate(this._end(offset), 'fast')

                this.trigger('show.dialog')
            },
            hide: function() {
                var that = this
                var offset = position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                this.$relatedElement.show()
                    .animate(this._start(offset), 'fast', function() {
                        that.$relatedElement.hide()
                    })

                this.trigger('hide.dialog')
            },
            _start: function(offset) {
                var width = this.$relatedElement.outerWidth()
                return {
                    opacity: 0,
                    left: offset.left + width * 0.25 + (this.options.offset.left || 0),
                    top: offset.top + (this.options.offset.top || 0)
                }
            },
            _end: function(offset) {
                return {
                    opacity: 1,
                    left: offset.left + (this.options.offset.left || 0),
                    top: offset.top + (this.options.offset.top || 0)
                }
            }
        })
    }
)