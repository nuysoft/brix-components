/* global define        */
/* global window        */
/* global document      */
/* jshint multistr:true */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        './colorpicker.tpl.js'
    ],
    function(
        $, _,
        Brix, EventManager,
        template,
        svgSlideTpl, svgPickerTpl,
        vmlSlideTpl, vmlPickerTpl
    ) {
        /*

            ### 数据
            {}

            ### 选项
            公共选项：data template
            color

            ### 属性
            公共属性：element moduleId clientId parentClientId childClientIds data template
            color

            ### 方法

            ### 事件
            公共事件：ready destroyed

        */

        svgSlideTpl = '\
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">\
                <defs>\
                    <linearGradient id="gradient-hsv" x1="0%" y1="100%" x2="0%" y2="0%">\
                        <stop offset="0%" stop-color="#FF0000" stop-opacity="1"></stop>\
                        <stop offset="13%" stop-color="#FF00FF" stop-opacity="1"></stop>\
                        <stop offset="25%" stop-color="#8000FF" stop-opacity="1"></stop>\
                        <stop offset="38%" stop-color="#0040FF" stop-opacity="1"></stop>\
                        <stop offset="50%" stop-color="#00FFFF" stop-opacity="1"></stop>\
                        <stop offset="63%" stop-color="#00FF40" stop-opacity="1"></stop>\
                        <stop offset="75%" stop-color="#0BED00" stop-opacity="1"></stop>\
                        <stop offset="88%" stop-color="#FFFF00" stop-opacity="1"></stop>\
                        <stop offset="100%" stop-color="#FF0000" stop-opacity="1"></stop>\
                    </linearGradient>\
                </defs>\
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-hsv)"></rect>\
            </svg>\
        '
        svgPickerTpl = '\
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">\
                <defs>\
                    <lineargradient id="gradient-black" x1="0%" y1="100%" x2="0%" y2="0%">\
                        <stop offset="0%" stop-color="#000000" stop-opacity="1"></stop>\
                        <stop offset="100%" stop-color="#CC9A81" stop-opacity="0"></stop>\
                    </lineargradient>\
                    <lineargradient id="gradient-white" x1="0%" y1="100%" x2="100%" y2="100%">\
                        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"></stop>\
                        <stop offset="100%" stop-color="#CC9A81" stop-opacity="0"></stop>\
                    </lineargradient>\
                </defs>\
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-white)"></rect>\
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-black)"></rect>\
            </svg>\
        '
        vmlSlideTpl = '\
            <div style="position: relative; width: 100%; height: 100%">\
                <v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">\
                    <v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>\
                </v:rect>\
            </div>\
        '
        vmlPickerTpl = '\
            <div style="position: relative; width: 100%; height: 100%">\
                <v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">\
                    <v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>\
                </v:rect>\
                <v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">\
                    <v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>\
                </v:rect>\
            </div>\
        '

        function ColorPicker() {}

        _.extend(ColorPicker.prototype, Brix.prototype, {
            options: {
                color: '#ffffff'
            },
            init: function() {},
            render: function() {
                var that = this
                this.$manager = new EventManager('bx-')

                this.color = this.options.color
                var html = _.template(template)({
                    colors: ['#d81e06', '#f4ea2a', '#1afa29', '#1296db', '#13227a', '#d4237a', '#ffffff', '#e6e6e6', '#dbdbdb', '#cdcdcd', '#bfbfbf', '#8a8a8a', '#707070', '#515151', '#2c2c2c', '#000000', '#ea986c', '#eeb174', '#f3ca7e', '#f9f28b', '#c8db8c', '#aad08f', '#87c38f', '#83c6c2', '#7dc5eb', '#87a7d6', '#8992c8', '#a686ba', '#bd8cbb', '#be8dbd', '#e89abe', '#e8989a', '#e16632', '#e98f36', '#efb336', '#f6ef37', '#afcd51', '#7cba59', '#36ab60', '#1baba8', '#17ace3', '#3f81c1', '#4f68b0', '#594d9c', '#82529d', '#a4579d', '#db649b', '#dd6572', '#d81e06', '#e0620d', '#ea9518', '#f4ea2a', '#8cbb1a', '#2ba515', '#0e932e', '#0c9890', '#1295db', '#0061b2', '#0061b0', '#004198', '#122179', '#88147f', '#d3227b', '#d6204b'],
                    min: false,
                    color: this.color
                })

                var $trigger = $(this.element)
                var relatedElement = $(html).css({
                    left: $trigger.offset().left,
                    top: $trigger.offset().top + $trigger.outerHeight() + 1
                }).insertAfter(this.element).hide()

                this.relatedElement = relatedElement[0]

                this.pickerDragNode = relatedElement.find('.picker-indicator')
                this.slideDragNode = relatedElement.find('.slide-indicator')

                var slideNode = this.slideNode = relatedElement.find('.slide')
                var pickerNode = this.pickerNode = relatedElement.find('.picker')
                var svgOrVml = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML")

                switch (svgOrVml) {
                    case 'SVG':
                        slideNode.append(svgSlideTpl)
                        pickerNode.append(svgPickerTpl)
                        break
                    default:
                        if (!document.namespaces.v) {
                            document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML')
                        }
                        slideNode.html(vmlSlideTpl)
                        pickerNode.html(vmlPickerTpl)
                }

                this.setHex(this.color)

                var type = 'click.colorpicker_' + this.clientId
                $(document.body)
                    .off(type)
                    .on(type, function(event) {
                        if (that.element === event.target) return
                        if (relatedElement.has(event.target).length) return
                        that.hide()
                    })

                this.$manager.delegate(this.element, this)
                this.$manager.delegate(this.relatedElement, this)

                // this.on('change selected', function(event, data) {
                //     console.log(event.type, data)
                // })
            },
            show: function() {
                $(this.relatedElement).show()
            },
            hide: function() {
                $(this.relatedElement).hide()
            },
            toggle: function() {
                var $element = $(this.element)
                $(this.relatedElement).toggle().offset({
                    left: $element.offset().left,
                    top: $element.offset().top + $element.outerHeight() + 1
                })
            },
            /**
             * Sets color of the picker in hsv/rgb/hex format.
             * @param {Object} hsv Object of the form: { h: <hue>, s: <saturation>, v: <value> }.
             * @param {Object} rgb Object of the form: { r: <red>, g: <green>, b: <blue> }.
             * @param {String} hex String of the form: #RRGGBB.
             */
            setColor: function(hsv /*, rgb, hex*/ ) {
                var $relatedElement = $(this.relatedElement)
                this.h = hsv.h % 360
                this.s = hsv.s
                this.v = hsv.v
                var c = hsv2rgb(this.h, this.s, this.v)

                this.slideDragNode.css({
                    top: Math.round(this.h * this.slideNode.height() / 360 - 5)
                })
                var left = Math.round(this.s * this.pickerNode.width() - 5)
                var top = Math.round((1 - this.v) * this.pickerNode.height() - 5)
                this.pickerDragNode.css({
                    left: left,
                    top: top,
                    color: top > 98 ? '#fff' : '#000'
                })
                this.pickerNode.css({
                    "background-color": hsv2rgb(this.h, 1, 1).hex
                })
                $relatedElement.find('.colorpicker-footer span').css({
                    "background-color": c.hex
                })
                this.color = c.hex
                $relatedElement.find('li').removeClass('selected')

                var input = $relatedElement.find('input')
                if (input.val() !== c.hex) input.val(c.hex)
            },
            /**
             * 设置颜色
             * @param {Object} hsv hsv对象 { h: <hue>, s: <saturation>, v: <value> }
             */
            setHsv: function(hsv) {
                this.setColor(hsv)
            },
            /**
             * 设置颜色
             * @param {Object} rgb rgb对象 { r: <red>, g: <green>, b: <blue> }
             */
            setRgb: function(rgb) {
                this.setColor(rgb2hsv(rgb.r, rgb.g, rgb.b), rgb)
            },
            /**
             * 设置颜色
             * @param {String} hex 颜色值 #RRGGBB.
             */
            setHex: function(hex) {
                this.setColor(rgb2hsv(parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16)), undefined, hex)
            },
            /* Events */
            pickQuickColor: function(event, extraParameters) {
                this.setHex(extraParameters)
                $(event.target).addClass('selected')
            },
            pickPaletteColor: function(event) {
                var offset = this.pickerNode.offset()
                var left = event.pageX - offset.left
                var top = event.pageY - offset.top
                var width = this.pickerNode.width()
                var height = this.pickerNode.height()
                this.setHsv({
                    h: this.h,
                    s: left / width,
                    v: (height - top) / height
                })
            },
            dragPickerIndicator: function(event) {
                var that = this
                $(document.documentElement).css('cursor', 'pointer')
                event.preventDefault()
                $(document.body).on('mousemove.pickerDragNode', function(event) {
                    event.pageX -= 5
                    event.pageY -= 5
                    var offset = that.pickerNode.offset(),
                        width = that.pickerNode.width(),
                        height = that.pickerNode.height(),
                        left = event.pageX - offset.left,
                        top = event.pageY - offset.top

                    if (left + 5 > width) left = width
                    else if (left < 0) left = 0
                    else left += 5

                    if (top + 5 > height) top = height
                    else if (top < 0) top = 0
                    else top += 5

                    that.setHsv({
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
                var offset = this.slideNode.offset(),
                    height = this.slideNode.height(),
                    top = ((event.pageY - offset.top >= height) ? height - 1 : event.pageY - offset.top),
                    h = top / height * 360
                this.setHsv({
                    h: h,
                    s: this.s,
                    v: this.v
                })
            },
            dragSlideIndicator: function(event) {
                var that = this
                $(document.documentElement).css('cursor', 'pointer')
                event.preventDefault()
                $(document.body).on('mousemove.slideDragNode', function(event) {
                    event.pageX -= 5
                    event.pageY -= 5
                    var offset = that.slideNode.offset()
                    var height = that.slideNode.height(),
                        top = event.pageY - offset.top

                    if (top + 5 > height) top = height - 1
                    else if (top < 0) top = 0
                    else top += 5

                    that.setHsv({
                        h: top / that.slideNode.height() * 360,
                        s: that.s,
                        v: that.v
                    })
                }).on('mouseup', function() {
                    $(document.documentElement).css('cursor', 'auto')
                    $(document.body).off('mousemove.slideDragNode')
                })
            },
            inputColor: function(event) {
                var val = $(event.target).val()
                if (val.length === 7 && this.color !== val) this.setHex(val)
            },
            finishInputColor: function(event) {
                var val = $(event.target).val()
                if (this.color != val) this.setHex(val)
            },
            submit: function() {
                var c = hsv2rgb(this.h, this.s, this.v)
                var extra = {
                    hex: c.hex,
                    hsv: {
                        h: this.h,
                        s: this.s,
                        v: this.v
                    },
                    rgb: {
                        r: c.r,
                        g: c.g,
                        b: c.b
                    }
                }
                this.trigger('change.colorpicker', extra)
                $(this.element).triggerHandler('change')
                this.hide()
            },
            destroy: function() {
                this.$manager.undelegate(this.element, this)
                this.$manager.undelegate(this.relatedElement, this)

                this.relatedElement.remove()

                var type = 'click.colorpicker_' + this.clientId
                $(document.body).off(type)
            }
        })
        return ColorPicker

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

    }
)