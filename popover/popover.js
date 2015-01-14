/* global define       */
/* global setTimeout   */
/* global clearTimeout */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        '../dialog/position.js',
        './popover.tpl.js',
        'css!./popover.css'
    ],
    function(
        $, _,
        Brix,
        position,
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
        function Popover() {}

        _.extend(Popover.prototype, Brix.prototype, {
            options: {
                placement: 'right', // top bottom left right
                align: '', // left right top bottom
                offset: {},
                width: 'auto',

                title: '',
                content: '',

                delay: 100
            },
            init: function() {},
            render: function() {
                var that = this
                this.$element = $(this.element)

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)

                var timer
                $(this.element).hover(
                    function( /*event*/ ) {
                        clearTimeout(timer)
                        that.$relatedElement.show().css({
                            width: that.options.width,
                            'max-width': that.options.width
                        })
                        var offset = position(that.element, that.$relatedElement, that.options.placement, that.options.align)
                        var relatedMarginLeft = parseInt(that.$relatedElement.css('margin-left'), 10)
                        var relatedMarginTop = parseInt(that.$relatedElement.css('margin-top'), 10)
                        that.$relatedElement.offset({
                            left: offset.left + relatedMarginLeft + (that.options.offset.left || 0),
                            top: offset.top + relatedMarginTop + (that.options.offset.top || 0)
                        })
                        if (that.options.align) {
                            that.$relatedElement.find('.arrow').offset(
                                getArrowPosition(that.options.placement, that.$element, that.$relatedElement, that.options.align)
                            )
                        }
                    },
                    function( /*event*/ ) {
                        clearTimeout(timer)
                        timer = setTimeout(function() {
                            that.$relatedElement.hide()
                        }, that.options.delay)
                    }
                )
                that.$relatedElement.hover(function( /*event*/ ) {
                    clearTimeout(timer)
                }, function() {
                    clearTimeout(timer)
                    that.$relatedElement.hide()
                })
            }
        })

        var tb = /top|bottom/
        var lr = /left|right/

        function getArrowPosition(placement, target, related, align) {
            var $target = $(target)
            var targetOffset = $target.offset()
            var targetLeft = targetOffset.left
            var targetTop = targetOffset.top
            var targetWidth = $target.outerWidth()
            var targetHeight = $target.outerHeight()

            var $related = $(related).show()
            var relatedWidth = $related.outerWidth()
            var relatedHeight = $related.outerHeight()

            var $arrow = $(related).find('.arrow')
            var arrowWidth = $arrow.outerWidth()
            var arrowHeight = $arrow.outerHeight()

            var left, top

            if (
                tb.test(placement) !== tb.test(align) &&
                lr.test(placement) !== lr.test(align)
            ) {
                switch (align) {
                    case 'top':
                    case 'bottom':
                        if (relatedHeight > targetHeight) {
                            top = targetTop + targetHeight / 2 - arrowHeight / 2
                        }
                        break
                    case 'left':
                    case 'right':
                        if (relatedWidth > targetWidth) {
                            left = targetLeft + targetWidth / 2 - arrowWidth / 2
                        }
                        break
                }
            }

            return {
                left: left,
                top: top
            }
        }

        return Popover
    }
)