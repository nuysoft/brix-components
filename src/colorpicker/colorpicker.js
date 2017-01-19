/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=ColorPicker
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/colorpicker/
        Temporary

    # ColorPicker
    
    调色板。

    ```html
    <div bx-name="components/colorpicker" class="btn btn-default">ColorPicker</div>
    <input bx-name="components/colorpicker" placeholder="ColorPicker">
    ```

    ## 配置

    配置项    | 类型    | 默认值    | 说明
    :-------- | :------ | :-------- | :----------
    color     | string  | `#ffffff` | 调色板的初始值。
    min       | boolean | `false`   | 是否精简模式。在精简模式下，只显示快捷颜色。
    placement | string  | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
    align     | string  | `'top'`   | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
    offset    | object  | `{}`      | 指定浮层的偏移，可以含有两个属性：`left`、`top`。

    ## 方法

    * .hex( [ value ] )
        设置或获取颜色值。颜色值格式为 `#RRGGBB`。
    * .rgb( [ value ] )
        设置或获取颜色值。颜色值格式为 `{ r: <red>, g: <green>, b: <blue> }`。
    * .hsv( [ value ] )
        设置或获取颜色值。颜色值格式为 `{ h: <hue>, s: <saturation>, v: <value> }`。
    
    ## 事件
    
    事件类型            | 说明
    :----------------- | :----------
    change.colorpicker | 当值发生变化时被触发。

 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        '../dialog/position.js',
        './colorpicker.tpl.js',
        './colorpicker-svg-slide.tpl.js', './colorpicker-svg-picker.tpl.js',
        './colorpicker-vml-slide.tpl.js', './colorpicker-svg-picker.tpl.js'
    ],
    function(
        $, _,
        Brix, EventManager,
        position,
        template,
        svgSlideTpl, svgPickerTpl,
        vmlSlideTpl, vmlPickerTpl
    ) {
        var NAMESPACE = '.colorpicker'
        var SHORTCUTS = ['#d81e06', '#f4ea2a', '#1afa29', '#1296db', '#13227a', '#d4237a', '#ffffff', '#e6e6e6', '#dbdbdb', '#cdcdcd', '#bfbfbf', '#8a8a8a', '#707070', '#515151', '#2c2c2c', '#000000', '#ea986c', '#eeb174', '#f3ca7e', '#f9f28b', '#c8db8c', '#aad08f', '#87c38f', '#83c6c2', '#7dc5eb', '#87a7d6', '#8992c8', '#a686ba', '#bd8cbb', '#be8dbd', '#e89abe', '#e8989a', '#e16632', '#e98f36', '#efb336', '#f6ef37', '#afcd51', '#7cba59', '#36ab60', '#1baba8', '#17ace3', '#3f81c1', '#4f68b0', '#594d9c', '#82529d', '#a4579d', '#db649b', '#dd6572', '#d81e06', '#e0620d', '#ea9518', '#f4ea2a', '#8cbb1a', '#2ba515', '#0e932e', '#0c9890', '#1295db', '#0061b2', '#0061b0', '#004198', '#122179', '#88147f', '#d3227b', '#d6204b']
        var RE_INPUT = /^input|textarea$/i

        function ColorPicker() {}
        ColorPicker.SHORTCUTS = SHORTCUTS

        _.extend(ColorPicker.prototype, Brix.prototype, {
            options: {
                placement: 'bottom', // top bottom left right
                align: 'left', // left right top bottom
                offset: {},

                color: '#ffffff',
                shortcuts: SHORTCUTS,
                min: false
            },
            init: function() {
                this.$element = $(this.element)
                this.data = {
                    color: this.options.color
                }
            },
            render: function() {
                var that = this
                var $relatedElement = this.$relatedElement = $(
                    _.template(template)(this.options)
                    // .appendTo(document.body)
                ).insertAfter(this.$element)

                var $pickerNode = this.$pickerNode = $relatedElement.find('.picker')
                this.$pickerDragNode = $relatedElement.find('.picker-indicator')
                var $slideNode = this.$slideNode = $relatedElement.find('.slide')
                this.$slideDragNode = $relatedElement.find('.slide-indicator')

                var svgOrVml = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML")
                switch (svgOrVml) {
                    case 'SVG':
                        $slideNode.append(svgSlideTpl)
                        $pickerNode.append(svgPickerTpl)
                        break
                    default:
                        if (!document.namespaces.v) {
                            document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML')
                        }
                        $slideNode.html(vmlSlideTpl)
                        $pickerNode.html(vmlPickerTpl)
                }

                this.hex(this.data.color)

                var type = 'click.colorpicker_toggle_' + this.clientId
                this.$element.off(type)
                    .on(type, function(event) {
                        that.toggle(event)
                    })

                var $manager = this.$manager = new EventManager('bx-')
                $manager.delegate(this.$element, this)
                $manager.delegate(this.$relatedElement, this)

                // 阻止输入框的 change 事件，避免触发多次 change.colorpicker 事件
                this.$relatedElement.find('input').on('change', function(event) {
                    event.preventDefault()
                    event.stopPropagation()
                })

                this._autoHide()
            },
            show: function() {
                this.$element.addClass('colorpicker-open')
                this.$relatedElement.show()
                    .offset(this._offset())
            },
            hide: function() {
                this.$element.removeClass('colorpicker-open')
                this.$relatedElement.hide()
            },
            toggle: function() {
                this.$element.toggleClass('colorpicker-open')
                this.$relatedElement.toggle()
                    .offset(this._offset())
            },
            _offset: function() {
                var offset = position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                var relatedMarginLeft = parseInt(this.$relatedElement.css('margin-left'), 10) || 0
                var relatedMarginTop = parseInt(this.$relatedElement.css('margin-top'), 10) || 0
                return {
                    left: offset.left + relatedMarginLeft + (this.options.offset.left || 0),
                    top: offset.top + relatedMarginTop + (this.options.offset.top || 0)
                }
            },
            /**
             * Sets color of the picker in hsv/rgb/hex format.
             * @param {Object} hsv Object of the form: { h: <hue>, s: <saturation>, v: <value> }.
             * @param {Object} rgb Object of the form: { r: <red>, g: <green>, b: <blue> }.
             * @param {String} hex String of the form: #RRGGBB.
             */
            _setColor: function(hsv /*, rgb, hex*/ ) {
                var $relatedElement = this.$relatedElement
                this.data.h = hsv.h % 360
                this.data.s = hsv.s
                this.data.v = hsv.v
                var c = hsv2rgb(this.data.h, this.data.s, this.data.v)

                this.$slideDragNode.css({
                    top: Math.round(this.data.h * this.$slideNode.height() / 360 - 5)
                })
                var left = Math.round(this.data.s * this.$pickerNode.width() - 5)
                var top = Math.round((1 - this.data.v) * this.$pickerNode.height() - 5)
                this.$pickerDragNode.css({
                    left: left,
                    top: top,
                    color: top > 98 ? '#fff' : '#000'
                })
                this.$pickerNode.css({
                    "background-color": hsv2rgb(this.data.h, 1, 1).hex
                })
                $relatedElement.find('.colorpicker-footer span').css({
                    "background-color": c.hex
                })
                this.data.color = c.hex
                $relatedElement.find('li').removeClass('selected')

                var input = $relatedElement.find('input')
                if (input.val() !== c.hex) input.val(c.hex)
            },
            /**
             * 设置颜色
             * @param {Object} hsv hsv对象 { h: <hue>, s: <saturation>, v: <value> }
             */
            hsv: function(hsv) {
                if (!hsv) {
                    return this._extra().hsv
                }

                this._setColor(hsv)
                return this
            },
            /**
             * 设置颜色
             * @param {Object} rgb rgb对象 { r: <red>, g: <green>, b: <blue> }
             */
            rgb: function(rgb) {
                if (!rgb) {
                    return this._extra().rgb
                }

                this._setColor(rgb2hsv(rgb.r, rgb.g, rgb.b), rgb)
                return this
            },
            /**
             * 设置颜色
             * @param {String} hex 颜色值 #RRGGBB.
             */
            hex: function(hex) {
                if (!hex) {
                    return this._extra().hex
                }

                this._setColor(rgb2hsv(parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16)), undefined, hex)
                return this
            },
            /* Events */
            _pickQuickColor: function(event, extraParameters) {
                this.hex(extraParameters)
                $(event.target).addClass('selected')
            },
            _toggleBody: function( /*event*/ ) {
                this.$relatedElement.find('.colorpicker-middle').toggleClass('open')
                this.$relatedElement.find('.colorpicker-body').slideToggle()
            },
            _pickPaletteColor: function(event) {
                var offset = this.$pickerNode.offset()
                var left = event.pageX - offset.left
                var top = event.pageY - offset.top
                var width = this.$pickerNode.width()
                var height = this.$pickerNode.height()
                this.hsv({
                    h: this.data.h,
                    s: left / width,
                    v: (height - top) / height
                })
            },
            _dragPickerIndicator: function(event) {
                var that = this
                $(document.documentElement).css('cursor', 'pointer')
                event.preventDefault()
                $(document.body).on('mousemove.pickerDragNode', function(event) {
                    event.pageX -= 5
                    event.pageY -= 5
                    var offset = that.$pickerNode.offset(),
                        width = that.$pickerNode.width(),
                        height = that.$pickerNode.height(),
                        left = event.pageX - offset.left,
                        top = event.pageY - offset.top

                    if (left + 5 > width) left = width
                    else if (left < 0) left = 0
                    else left += 5

                    if (top + 5 > height) top = height
                    else if (top < 0) top = 0
                    else top += 5

                    that.hsv({
                        h: that.h,
                        s: left / width,
                        v: (height - top) / height
                    })
                }).on('mouseup', function() {
                    $(document.documentElement).css('cursor', 'auto')
                    $(document.body).off('mousemove.pickerDragNode')
                })
            },
            pickSlideColor: function(event) {
                var offset = this.$slideNode.offset(),
                    height = this.$slideNode.height(),
                    top = ((event.pageY - offset.top >= height) ? height - 1 : event.pageY - offset.top),
                    h = top / height * 360
                this.hsv({
                    h: h,
                    s: this.data.s,
                    v: this.data.v
                })
            },
            _dragSlideIndicator: function(event) {
                var that = this
                $(document.documentElement).css('cursor', 'pointer')
                event.preventDefault()
                $(document.body).on('mousemove.slideDragNode', function(event) {
                    event.pageX -= 5
                    event.pageY -= 5
                    var offset = that.$slideNode.offset()
                    var height = that.$slideNode.height(),
                        top = event.pageY - offset.top

                    if (top + 5 > height) top = height - 1
                    else if (top < 0) top = 0
                    else top += 5

                    that.hsv({
                        h: top / that.$slideNode.height() * 360,
                        s: that.s,
                        v: that.v
                    })
                }).on('mouseup', function() {
                    $(document.documentElement).css('cursor', 'auto')
                    $(document.body).off('mousemove.slideDragNode')
                })
            },
            _inputColor: function(event) {
                var val = $(event.target).val()
                if (val.length === 7 && this.data.color !== val) this.hex(val)
            },
            _finishInputColor: function(event) {
                var val = $(event.target).val()
                if (this.data.color != val) this.hex(val)
            },
            _extra: function() {
                var rgb = hsv2rgb(this.data.h, this.data.s, this.data.v)
                return {
                    hex: rgb.hex,
                    hsv: {
                        h: this.data.h,
                        s: this.data.s,
                        v: this.data.v
                    },
                    rgb: {
                        r: rgb.r,
                        g: rgb.g,
                        b: rgb.b
                    }
                }
            },
            _submit: function() {
                var extra = this._extra()

                var changeEvent = $.Event('change' + NAMESPACE)
                this.trigger(changeEvent, extra)
                if (changeEvent.isDefaultPrevented()) return

                if (RE_INPUT.test(this.element.nodeName)) {
                    this.$element.val(extra.hex)
                }

                this.$element.triggerHandler('change')
                this.hide()
            },
            _autoHide: function() {
                var that = this
                var type = 'click.colorpicker_autohide_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (that.element === event.target) return
                        if (that.$relatedElement.has(event.target).length) return
                        that.hide()
                    })
            },
            destroy: function() {
                this.$manager.undelegate(this.$element, this)
                this.$manager.undelegate(this.$relatedElement, this)

                this.$element.off('click.colorpicker_toggle_' + this.clientId)
                $(document.body).off('click.colorpicker_autohide_' + this.clientId)

                this.$relatedElement.remove()
            }
        })

        function hsv2rgb(h, s, v) {
            var R, G, B, X, C
            h = (h % 360) / 60
            C = v * s
            X = C * (1 - Math.abs(h % 2 - 1))
            R = G = B = v - C

            h = ~~h
            R += [C, X, 0, 0, X, C][h]
            G += [X, C, C, X, 0, 0][h]
            B += [0, 0, X, C, C, X][h]

            var r = R * 255,
                g = G * 255,
                b = B * 255
            return {
                r: r,
                g: g,
                b: b,
                hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
            }

        }

        /**
         * Convert RGB representation to HSV.
         * r, g, b can be either in <0,1> range or <0,255> range.
         * Credits to http://www.raphaeljs.com
         */
        function rgb2hsv(r, g, b) {
            if (r > 1 || g > 1 || b > 1) {
                r /= 255
                g /= 255
                b /= 255
            }
            var H, S, V, C
            V = Math.max(r, g, b)
            C = V - Math.min(r, g, b)
            H = (C === 0 ? null : V == r ? (g - b) / C + (g < b ? 6 : 0) : V == g ? (b - r) / C + 2 : (r - g) / C + 4)
            H = (H % 6) * 60
            S = C === 0 ? 0 : C / V
            return {
                h: H,
                s: S,
                v: V
            }
        }

        // http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
        function invert(hex) {
            hex = hex.substring(1) // remove #
            hex = parseInt(hex, 16) // convert to integer
            hex = 0xFFFFFF ^ hex // invert three bytes
            hex = hex.toString(16) // convert to hex
            hex = ("000000" + hex).slice(-6) // pad with leading zeros
            hex = "#" + hex // prepend #
            return hex
        }

        ColorPicker.hsv2rgb = hsv2rgb
        ColorPicker.rgb2hsv = rgb2hsv
        ColorPicker.invert = invert

        return ColorPicker

    }
)