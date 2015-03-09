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
                this.$relatedElement = $(
                    _.template(template)(this.options)
                ).insertAfter(this.$element)

                this.$element.hover(function( /*event*/ ) {
                    that.show()
                }, function( /*event*/ ) {
                    that.hide()
                })

                that.$relatedElement.hover(function( /*event*/ ) {
                    clearTimeout(that._timer)
                }, function( /*event*/ ) {
                    clearTimeout(that._timer)
                    that.$relatedElement.hide()
                })
            },
            show: function() {
                clearTimeout(this._timer)
                this.$relatedElement.show().css({
                    width: this.options.width,
                    'max-width': this.options.width // 覆盖 bootstrap overlay 的 max-width
                })
                var offset = position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                var relatedMarginLeft = parseInt(this.$relatedElement.css('margin-left'), 10)
                var relatedMarginTop = parseInt(this.$relatedElement.css('margin-top'), 10)
                this.$relatedElement.offset({
                    left: offset.left + relatedMarginLeft + (this.options.offset.left || 0),
                    top: offset.top + relatedMarginTop + (this.options.offset.top || 0)
                })
                if (this.options.align) {
                    this.$relatedElement.find('.arrow').offset(
                        getArrowPosition(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                    )
                }
            },
            hide: function() {
                var that = this
                clearTimeout(this._timer)
                this._timer = setTimeout(function() {
                    that.$relatedElement.hide()
                }, this.options.delay)
            },
            title: function(title) {
                if (title === undefined || title === null) return this.options.title

                this.options.title = title
                this.$relatedElement.find('.popover-title').html(title)

                return this
            },
            content: function(content) {
                if (content === undefined || content === null) return this.options.content

                this.options.content = content
                this.$relatedElement.find('.popover-content').html(content)

                return this
            }
        })

        var tb = /top|bottom/
        var lr = /left|right/

        function getArrowPosition(trigger, overlay, placement, align) {
            var $trigger = $(trigger)
            var triggerOffset = $trigger.offset()
            var triggerLeft = triggerOffset.left
            var triggerTop = triggerOffset.top
            var triggerWidth = $trigger.outerWidth()
            var triggerHeight = $trigger.outerHeight()

            var $overlay = $(overlay).show()
            var overlayWidth = $overlay.outerWidth()
            var overlayHeight = $overlay.outerHeight()

            var $arrow = $(overlay).find('.arrow')
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
                        if (overlayHeight > triggerHeight) {
                            top = triggerTop + triggerHeight / 2 - arrowHeight / 2
                        }
                        break
                    case 'left':
                    case 'right':
                        if (overlayWidth > triggerWidth) {
                            left = triggerLeft + triggerWidth / 2 - arrowWidth / 2
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