/* global define */
define(
    [
        'jquery'
    ],
    function(
        $
    ) {
        var tb = /top|bottom/
        var lr = /left|right/

        function position(target, related, placement, align) {
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

        return position
    }
)