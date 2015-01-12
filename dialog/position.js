/* global define, window */
define(
    [
        'jquery'
    ],
    function(
        $
    ) {
        var tb = /top|bottom/
        var lr = /left|right/

        /**
         * 计算浮层位置的工具函数
         * @param  {[type]} trigger    参照节点
         * @param  {[type]} dialog     浮层节点
         * @param  {[type]} placement  浮层相对于参照的位置
         * @param  {[type]} align      浮层相对于参照的对齐方式
         * @return {[type]}            { left: left, top: top }
         */
        function position(trigger, dialog, placement, align) {
            var $trigger = $(trigger)

            if (!$trigger.length) return center(dialog)

            var triggerOffset = $trigger.offset()
            var triggerLeft = triggerOffset.left
            var triggerTop = triggerOffset.top
            var triggerWidth = $trigger.outerWidth()
            var triggerHeight = $trigger.outerHeight()

            var $dialog = $(dialog).show()
            var dialogWidth = $dialog.outerWidth()
            var dialogHeight = $dialog.outerHeight()
                // var dialogMarginLeft = parseInt($dialog.css('margin-left'), 10)
                // var dialogMarginTop = parseInt($dialog.css('margin-top'), 10)

            var left, top
            var leftDiff = triggerWidth / 2 - dialogWidth / 2
            var topDiff = triggerHeight / 2 - dialogHeight / 2
            switch (placement) {
                case 'top': // 上方，水平局中
                    left = triggerLeft + leftDiff
                    top = triggerTop - dialogHeight
                    break
                case 'bottom': // 下方，水平局中
                    left = triggerLeft + leftDiff
                    top = triggerTop + triggerHeight
                    break
                case 'left': // 左侧，垂直局中
                    left = triggerLeft - dialogWidth
                    top = triggerTop + topDiff
                    break
                case 'right': // 右侧，垂直局中
                    left = triggerLeft + triggerWidth
                    top = triggerTop + topDiff
                    break
            }

            // 浮层节点不能覆盖参照节点
            if (
                tb.test(placement) !== tb.test(align) &&
                lr.test(placement) !== lr.test(align)
            ) {
                switch (align) {
                    case 'top': // 上边框对齐
                        top = triggerTop
                        break
                    case 'bottom': // 下边框对齐
                        top = triggerTop + triggerHeight - dialogHeight
                        break
                    case 'left': // 做边框对齐
                        left = triggerLeft
                        break
                    case 'right': // 右边框对齐
                        left = triggerLeft + triggerWidth - dialogWidth
                        break
                }
            }

            return {
                left: left, //  + dialogMarginLeft
                top: top //  + dialogMarginTop
            }
        }

        function center(dialog) {
            var $dialog = $(dialog).show()
            var dialogWidth = $dialog.outerWidth()
            var dialogHeight = $dialog.outerHeight()

            var $window = $(window)
            var windowWidth = $window.width()
            var windowHeight = $window.height()

            return {
                left: windowWidth / 2 - dialogWidth / 2,
                top: windowHeight / 2 - dialogHeight / 2 + window.scrollY
            }
        }

        return position
    }
)