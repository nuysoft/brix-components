/* global define, console */
/*
    http://zombiej.github.io/bootstrap-components-3.0/
 */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        'css!./editable.css'
    ],
    function(
        $, _,
        Brix
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
        function Editable() {}

        _.extend(Editable.prototype, Brix.prototype, {
            options: {
                type: 'text', // text html
                content: ''
            },
            render: function() {
                var that = this
                var $element = this.$element = $(this.element)
                var $related = this.$related = $element.is('pre') ? $('<textarea>') : $('<input type="text">')
                var type = this.options.type
                var content = $element[type]()

                if (!content) $element[type](content = this.options.content)

                $related
                    .addClass('form-control')
                    .val(content)
                    .insertAfter($element).hide()

                $element.on('click', function( /*event*/ ) {
                    var display = $element.css('display')
                    var outerWidth = $element.outerWidth(true)
                    var zIndex = $element.css('z-index')
                    $element.hide()
                    $related.css({
                        'display': display,
                        'font-size': $element.css('font-size'),
                        'font-family': $element.css('font-family'),
                        'font-weight': $element.css('font-weight'),
                        'line-height': $element.css('line-height'),
                        'color': $element.css('color'),
                        'z-index': zIndex === 'auto' ? 1001 : zIndex + 1
                    }).focus()
                    // TODO 样式太丑
                    // padding border margin

                    // var targetMarginLeft = parseInt($element.css('margin-left'), 10)
                    // var targetMarginTop = parseInt($element.css('margin-top'), 10)
                    // var targetMarginBottom = parseInt($element.css('margin-bottom'), 10)
                    // var targetMarginRight = parseInt($element.css('margin-right'), 10)

                    var targetPaddingLeft = parseInt($element.css('padding-left'), 10)
                        // var targetPaddingTop = parseInt($element.css('padding-top'), 10)
                        // var targetPaddingBottom = parseInt($element.css('padding-bottom'), 10)
                    var targetPaddingRight = parseInt($element.css('padding-right'), 10)

                    var targetBorderLeft = parseInt($element.css('border-left-width'), 10)
                        // var targetBorderTop = parseInt($element.css('border-top-width'), 10)
                        // var targetBorderBottom = parseInt($element.css('border-bottom-width'), 10)
                    var targetBorderRight = parseInt($element.css('border-right-width'), 10)

                    // var relatedMarginLeft = parseInt($related.css('margin-left'), 10)
                    // var relatedMarginTop = parseInt($related.css('margin-top'), 10)
                    // var relatedMarginBottom = parseInt($related.css('margin-bottom'), 10)
                    // var relatedMarginRight = parseInt($related.css('margin-right'), 10)

                    var relatedPaddingLeft = parseInt($related.css('padding-left'), 10)
                        // var relatedPaddingTop = parseInt($related.css('padding-top'), 10)
                        // var relatedPaddingBottom = parseInt($related.css('padding-bottom'), 10)
                    var relatedPaddingRight = parseInt($related.css('padding-right'), 10)

                    var relatedBorderLeft = parseInt($related.css('border-left-width'), 10)
                        // var relatedBorderTop = parseInt($related.css('border-top-width'), 10)
                        // var relatedBorderBottom = parseInt($related.css('border-bottom-width'), 10)
                    var relatedBorderRight = parseInt($related.css('border-right-width'), 10)

                    $related.css({
                        margin: $element.css('margin'),
                        width: /inline/.test(display) ?
                            outerWidth +
                            (relatedPaddingLeft - targetPaddingLeft) +
                            (relatedPaddingRight - targetPaddingRight) +
                            (relatedBorderLeft - targetBorderLeft) +
                            (relatedBorderRight - targetBorderRight) : outerWidth,
                        height: 'auto'
                    })

                })

                $related.on('keydown', function(event) {
                    if (event.which === 13) {
                        event.preventDefault()
                        $related.hide()
                        $element.show()
                        that.update()
                    }
                    if (event.which === 27) {
                        event.preventDefault()
                        $related.val(
                            $element[type]()
                        ).hide()
                        $element.show()
                    }
                }).on('blur', function() {
                    $related.hide()
                    $element.show()
                    that.update()
                })

                this.on('change', function(event, extra) {
                    console.log(event.type, extra)
                })
            },
            update: function() {
                var preContent = this.$element[this.options.type]() || this.options.content
                var content = this.$related.val()
                var type = this.options.type
                if (preContent !== content) this.trigger('change', content)
                this.$element[type](content)
            }
        })

        return Editable
    }
)

// 'width': $element.css('width'), // auto + 2?
// 'height': 'auto',
// 'min-width': $element.css('width'),
// 'margin': $element.css('margin'),
// 'padding': $element.css('padding'),
// 'line-height': $element.css('line-height')
// 坑爹的位置修正啊！无法满足所有场景！而事实上，解决了 inline 的场景就基本满足了所有场景。
// 'margin-left': targetMarginLeft -
//     (relatedPaddingLeft - targetPaddingLeft) -
//     (relatedBorderLeft - targetBorderLeft),
// 'margin-top': targetMarginTop -
//     (relatedPaddingTop - targetPaddingTop) -
//     (relatedBorderTop - targetBorderTop),
// 'margin-bottom': targetMarginBottom -
//     (relatedPaddingBottom - targetPaddingBottom) -
//     (relatedBorderBottom - targetBorderBottom),