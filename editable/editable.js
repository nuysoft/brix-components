/* global define */
/*
    http://zombiej.github.io/bootstrap-components-3.0/
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        'css!./editable.css'
    ],
    function(
        $, _,
        Brix
    ) {

        var NAMESPACE = '.editable'
        var TPL = {
            pre: '<textarea>',
            _default: '<input type="text">'
        }

        function Editable() {}

        _.extend(Editable.prototype, Brix.prototype, {
            options: {
                type: 'text', // text html
                content: ''
            },
            init: function() {
                var type = this.options.type
                this.$element = $(this.element)
                if (!this.options.content) this.options.content = this.$element[type]()
                if (!this.$element[type]()) this.$element[type](this.options.content)
            },
            render: function() {
                var that = this
                var html = this.$element.is('pre') ? TPL.pre : TPL._default
                this.$relatedElement = $(html)
                    .val(this.options.content)
                    .insertAfter(this.$element)
                this._beautify()
                this.$relatedElement.hide()

                this.$element.on('click', function( /*event*/ ) {
                    that.show()
                })

                this.$relatedElement.on('keydown', function(event) {
                    if (!that._hooks[event.which]) return
                    that._hooks[event.which].call(that, event)

                }).on('blur', function() {
                    if (that.update() === false) return
                    that.hide()
                })
            },
            update: function() {
                var preContent = this.$element[this.options.type]() || this.options.content
                var content = this.$relatedElement.val()
                if (preContent === content) return

                var validate = $.Event('change' + NAMESPACE)
                this.trigger(validate, [content])
                if (validate.isDefaultPrevented()) return false

                this.$element[this.options.type](content)
            },
            show: function() {
                this._beautify()
                this.$element.hide()
                this.$relatedElement.show().focus()
            },
            hide: function() {
                this.$relatedElement.hide()
                this.$element.show()
            },
            _hooks: {
                // enter
                13: function(event) {
                    event.preventDefault()
                    if (this.update() === false) return
                    this.hide()
                },
                // esc
                27: function(event) {
                    event.preventDefault()
                    this.hide()
                    this.$relatedElement.val(
                        this.$element[this.options.type]()
                    )
                }
            },
            _bind: function() {

            },
            _beautify: function() {
                var $element = this.$element
                var $relatedElement = this.$relatedElement

                var display = $element.css('display')
                var zIndex = $element.css('z-index')
                var outerWidth = $element.outerWidth(true)
                var targetPaddingLeft = parseInt($element.css('padding-left'), 10)
                var targetPaddingRight = parseInt($element.css('padding-right'), 10)
                var targetBorderLeft = parseInt($element.css('border-left-width'), 10)
                var targetBorderRight = parseInt($element.css('border-right-width'), 10)
                var relatedPaddingLeft = parseInt($relatedElement.css('padding-left'), 10)
                var relatedPaddingRight = parseInt($relatedElement.css('padding-right'), 10)
                var relatedBorderLeft = parseInt($relatedElement.css('border-left-width'), 10)
                var relatedBorderRight = parseInt($relatedElement.css('border-right-width'), 10)

                this.$relatedElement
                    .addClass('form-control')
                    .css({
                        'display': display,
                        'font-size': $element.css('font-size'),
                        'font-family': $element.css('font-family'),
                        'font-weight': $element.css('font-weight'),
                        'line-height': $element.css('line-height'),
                        'color': $element.css('color'),
                        'z-index': zIndex === 'auto' ? 1001 : zIndex + 1,
                        'margin': $element.css('margin'),
                        'width': /inline/.test(display) ?
                            outerWidth +
                            (relatedPaddingLeft - targetPaddingLeft) +
                            (relatedPaddingRight - targetPaddingRight) +
                            (relatedBorderLeft - targetBorderLeft) +
                            (relatedBorderRight - targetBorderRight) : outerWidth,
                        'height': 'auto'
                    })
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