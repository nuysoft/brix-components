/* global define       */
/* global setTimeout   */
/* global clearTimeout */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        './popover.tpl.js',
        'css!./popover.css'
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
                title: '',
                content: '',
                delay: 100
            },
            render: function() {
                var that = this
                this.data = this.data || _.extend({}, this.options)
                var html = _.template(template, this.data)
                var $relatedElement = $(html).insertAfter(this.element)
                this.relatedElement = $relatedElement[0]

                var timer
                $(this.element).hover(function( /*event*/ ) {
                    clearTimeout(timer)
                    $relatedElement.offset(
                        getPosition(that.options.placement, that.element, that.relatedElement, that.options.align)
                    ).show()
                    if (that.options.align) {
                        $relatedElement.find('.arrow').offset(
                            getArrowPosition(that.options.placement, that.element, that.relatedElement, that.options.align)
                        )
                    }

                }, function() {
                    clearTimeout(timer)
                    timer = setTimeout(function() {
                        $relatedElement.hide()
                    }, that.options.delay)

                })
                $relatedElement.hover(function( /*event*/ ) {
                    clearTimeout(timer)
                }, function() {
                    clearTimeout(timer)
                    $relatedElement.hide()
                })
            }
        })

        var tb = /top|bottom/
        var lr = /left|right/

        function getPosition(placement, target, related, align) {
            var $target = $(target)
            var targetOffset = $target.offset()
            var targetLeft = targetOffset.left
            var targetTop = targetOffset.top
            var targetWidth = $target.outerWidth()
            var targetHeight = $target.outerHeight()

            var $related = $(related).show()
            var relatedWidth = $related.outerWidth()
            var relatedHeight = $related.outerHeight()
            var relatedMarginLeft = parseInt($related.css('margin-left'), 10)
            var relatedMarginTop = parseInt($related.css('margin-top'), 10)

            var left, top
            switch (placement) {
                case 'top':
                    left = targetLeft + (targetWidth / 2 - relatedWidth / 2)
                    top = targetTop - relatedHeight
                    break
                case 'bottom':
                    left = targetLeft + (targetWidth / 2 - relatedWidth / 2)
                    top = targetTop + targetHeight
                    break
                case 'left':
                    left = targetLeft - relatedWidth
                    top = targetTop + targetHeight / 2 - relatedHeight / 2
                    break
                case 'right':
                    left = targetLeft + targetWidth
                    top = targetTop + targetHeight / 2 - relatedHeight / 2
                    break
            }

            if (
                tb.test(placement) !== tb.test(align) &&
                lr.test(placement) !== lr.test(align)
            ) {
                switch (align) {
                    case 'top':
                        top = targetTop
                        break
                    case 'bottom':
                        top = targetTop + targetHeight - relatedHeight
                        break
                    case 'left':
                        left = targetLeft
                        break
                    case 'right':
                        left = targetLeft + targetWidth - relatedWidth
                        break
                }
            }

            return {
                left: left + relatedMarginLeft,
                top: top + relatedMarginTop
            }
        }

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