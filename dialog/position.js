/* global define, window */
define(
    [
        'jquery'
    ],
    function(
        $
    ) {
        var RE_TOP_OR_BOTTOM = /top|bottom/
        var RE_LEFT_OR_RIGHT = /left|right/

        /**
         * 计算浮层位置的工具函数
         * @param  {[type]} trigger    参照节点
         * @param  {[type]} dialog     浮层节点
         * @param  {[type]} placement  浮层相对于参照的位置
         * @param  {[type]} align      浮层相对于参照的对齐方式
         * @return {[type]}            { left: left, top: top }
         */
        function position(trigger, overlay, placement, align) {
            var $trigger = $(trigger)

            if (!$trigger.length) return center(overlay)

            var triggerOffset = $trigger.offset()
            var triggerLeft = triggerOffset.left
            var triggerTop = triggerOffset.top
            var triggerWidth = $trigger.outerWidth()
            var triggerHeight = $trigger.outerHeight()

            var $overlay = $(overlay) // .show()
            var visible = $overlay.css('display') !== 'none'
            $overlay.show()
            var overlayWidth = $overlay.outerWidth()
            var overlayHeight = $overlay.outerHeight()
                // var overlayMarginLeft = parseInt($overlay.css('margin-left'), 10)
                // var overlayMarginTop = parseInt($overlay.css('margin-top'), 10)

            if (!visible) $overlay.hide()

            var left, top
            var leftDiff = triggerWidth / 2 - overlayWidth / 2
            var topDiff = triggerHeight / 2 - overlayHeight / 2
            switch (placement) {
                case 'top': // 上方，水平局中
                    left = triggerLeft + leftDiff
                    top = triggerTop - overlayHeight
                    break
                case 'bottom': // 下方，水平局中
                    left = triggerLeft + leftDiff
                    top = triggerTop + triggerHeight
                    break
                case 'left': // 左侧，垂直局中
                    left = triggerLeft - overlayWidth
                    top = triggerTop + topDiff
                    break
                case 'right': // 右侧，垂直局中
                    left = triggerLeft + triggerWidth
                    top = triggerTop + topDiff
                    break
            }

            // 浮层节点不能覆盖参照节点
            if (
                RE_TOP_OR_BOTTOM.test(placement) !== RE_TOP_OR_BOTTOM.test(align) &&
                RE_LEFT_OR_RIGHT.test(placement) !== RE_LEFT_OR_RIGHT.test(align)
            ) {
                switch (align) {
                    case 'top': // 上边框对齐
                        top = triggerTop
                        break
                    case 'bottom': // 下边框对齐
                        top = triggerTop + triggerHeight - overlayHeight
                        break
                    case 'left': // 做边框对齐
                        left = triggerLeft
                        break
                    case 'right': // 右边框对齐
                        left = triggerLeft + triggerWidth - overlayWidth
                        break
                }
            }

            return {
                left: left, //  + overlayMarginLeft
                top: top //  + overlayMarginTop
            }
        }

        function center(width, height) {
            var overlayWidth, overlayHeight

            // center(overlay) {
            if (!height) {
                var $overlay = $(width) // .show()
                var visible = $overlay.css('display') !== 'none'
                $overlay.show()
                overlayWidth = $overlay.outerWidth()
                overlayHeight = $overlay.outerHeight()

                if (!visible) $overlay.hide()

            } else {
                // center(width, height)
                overlayWidth = parseFloat(width, 12)
                overlayHeight = parseFloat(height, 12)
            }

            var $window = $(window)
            var windowWidth = $window.width()
            var windowHeight = $window.height()
            var scrollLeft = $window.scrollLeft()
            var scrollTop = $window.scrollTop()

            return {
                left: windowWidth / 2 - overlayWidth / 2 + scrollLeft,
                top: windowHeight / 2 - overlayHeight / 2 + scrollTop
            }
        }

        function start(overlay, offset, placement) {
            var $overlay = $(overlay) // .show()
            var visible = $overlay.css('display') !== 'none'
            $overlay.show()
            var width = $overlay.outerWidth()
            var height = $overlay.outerHeight()

            if (!visible) $overlay.hide()

            var result = {
                opacity: 0,
                left: offset.left,
                top: offset.top
            }
            switch (placement) {
                case 'top': // 上方
                    result.top = result.top - height * 0.5
                    break
                case 'bottom': // 下方
                    result.top = result.top + height * 0.5
                    break
                case 'left': // 左侧
                    result.left = result.left - width * 0.5
                    break
                case 'right': // 右侧
                    /* Expected a 'break' statement before 'default'. */
                    /* falls through */
                default:
                    result.left = result.left + width * 0.5
                    break
            }

            return result
        }

        /* exported overlay */
        function end(overlay, offset) {
            if (!overlay) { /* TODO */ }
            return {
                opacity: 1,
                left: offset.left,
                top: offset.top
            }
        }

        position.center = center
        position.start = start
        position.end = end

        return position
    }
)