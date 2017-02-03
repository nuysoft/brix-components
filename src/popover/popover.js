/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=Popover
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/popover/
        Temporary

    # Popover

    浮层。

    ```html
    <div bx-name="components/popover" bx-options="{
        placement: 'top',
        title: 'Popover on top',
        content: 'Envy is the ulcer of the soul.'
    }" class="btn btn-default">Popover on top</div>
    ```

    ## 配置

    配置项    | 类型       | 默认值    | 说明
    :-------- | :--------- | :-------- | :----------
    placement | string     | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
    align     | string     | `''`      | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
    offset    | object     | `{}`      | 指定浮层的偏移，可以含有两个属性：`left`、`top`。
    width     | int        | `'auto'`  | 指定浮层的宽度。
    title     | string     | `''`      | 指定浮层的标题。
    content   | string     | `''`      | 指定浮层的内容。
    ~~delay~~ | ~~number~~ | ~~`100`~~ | ~~指定延迟关闭浮层的时间，单位为毫秒。~~

    ## 方法

    * .show()
        显示浮层。
    * .hide()
        关闭浮层。
    * .title( [ title ] )
        获取或设置浮层的标题。
    * .content( [ content ] )
        获取或设置浮层的内容。

    ## 事件

    无。

 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        '../dialog/position/position.js',
        './popover.tpl.js'
    ],
    function(
        $, _,
        Brix,
        position,
        template
    ) {
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
            init: function() {
                // 支持自定义 CSS 样式
                if (this.options.css) window.require(['css!' + this.options.css])
            },
            render: function() {
                var that = this
                this.$element = $(this.element)
                this.$relatedElement = $(
                    // 支持自定义 HTML 模板 template
                    _.template(this.options.template || template)(this.options)
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
                var relatedMarginLeft = parseInt(this.$relatedElement.css('margin-left'), 10) || 0
                var relatedMarginTop = parseInt(this.$relatedElement.css('margin-top'), 10) || 0
                this.$relatedElement.offset({
                    left: offset.left + relatedMarginLeft + (this.options.offset.left || 0),
                    top: offset.top + relatedMarginTop + (this.options.offset.top || 0)
                })
                if (this.options.align) {
                    var $arrow = this.$relatedElement.find('.arrow')
                    if ($arrow.is(':visible')) {
                        $arrow.offset(
                            getArrowPosition(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                        )
                    }
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
            },
            destroy: function() {
                this.$element
                    .off('mouseenter mouseleave') // hover
                this.$relatedElement
                    .off('mouseenter mouseleave') // hover
                    .remove()
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