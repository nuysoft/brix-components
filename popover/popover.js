/* global define       */
/* global setTimeout   */
/* global clearTimeout */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        'text!./popover.tpl',
        'less!./popover.less'
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
                placement: 'right',
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
                        getPosition(that.options.placement, that.element, that.relatedElement)
                    ).show()
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

        function getPosition(placement, target, related) {
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
            left = left + relatedMarginLeft
            top = top + relatedMarginTop
            return {
                left: left,
                top: top
            }
        }

        return Popover
    }
)