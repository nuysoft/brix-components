(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("components/base"), require("brix/event"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "components/base", "brix/event", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["components/colorpicker"] = factory(require("jquery"), require("components/base"), require("brix/event"), require("underscore"));
	else
		root["components/colorpicker"] = factory(root["jquery"], root["components/base"], root["brix/event"], root["underscore"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3), __webpack_require__(7),
	        __webpack_require__(4), __webpack_require__(5),
	        __webpack_require__(6),
	        __webpack_require__(2),
	        __webpack_require__(8), __webpack_require__(9),
	        __webpack_require__(10), __webpack_require__(9)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
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
	                    // .insertAfter(this.$element)
	                ).appendTo(document.body)

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

	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"colorpicker <%= placement %>\"\">\n" +
	        "    <div class=\"colorpicker-header clearfix\">\n" +
	        "        <ul class=\"clearfix\">\n" +
	        "            <% for(var i = 0; i < shortcuts.length; i++) { %>\n" +
	        "            <li value=\"<%=shortcuts[i]%>\" style=\"background-color:<%=shortcuts[i]%>;\" bx-click=\"_pickQuickColor(<%=shortcuts[i]%>)\"></li>\n" +
	        "            <% } %>\n" +
	        "        </ul>\n" +
	        "    </div>\n" +
	        "    <div class=\"colorpicker-middle clearfix <%= min ? '' : 'open'%>\">\n" +
	        "        <i bx-click=\"_toggleBody\" class=\"uxicon arrow arrow-up\">&#404</i>\n" +
	        "        <i bx-click=\"_toggleBody\" class=\"uxicon arrow arrow-down\">&#405</i>\n" +
	        "    </div>\n" +
	        "    <div class=\"colorpicker-body clearfix <%= min ? '' : 'open'%>\">\n" +
	        "        <div class=\"picker-wrapper\">\n" +
	        "            <div class=\"picker\" bx-click=\"_pickPaletteColor()\"></div>\n" +
	        "            <i class=\"uxicon picker-indicator\" bx-mousedown=\"_dragPickerIndicator()\">&#470</i>\n" +
	        "        </div>\n" +
	        "        <div class=\"slide-wrapper\">\n" +
	        "            <div class=\"slide\" bx-click=\"pickSlideColor()\"></div>\n" +
	        "            <i class=\"uxicon slide-indicator\" bx-mousedown=\"_dragSlideIndicator\">&#461</i>\n" +
	        "        </div>\n" +
	        "    </div>\n" +
	        "    <div class=\"colorpicker-footer clearfix\">\n" +
	        "        <span class=\"bg\" style=\"background-color: <%=color%>\"></span>\n" +
	        "        <input type=\"text\" class=\"form-control\" value=\"<%=color%>\" bx-keyup=\"_inputColor\" bx-blur=\"_finishInputColor\">\n" +
	        "        <a class=\"btn btn-default\" bx-click=\"_submit\">确定</a>\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
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
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"100%\" height=\"100%\">\n" +
	        "    <defs>\n" +
	        "        <linearGradient id=\"gradient-hsv\" x1=\"0%\" y1=\"100%\" x2=\"0%\" y2=\"0%\">\n" +
	        "            <stop offset=\"0%\" stop-color=\"#FF0000\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"13%\" stop-color=\"#FF00FF\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"25%\" stop-color=\"#8000FF\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"38%\" stop-color=\"#0040FF\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"50%\" stop-color=\"#00FFFF\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"63%\" stop-color=\"#00FF40\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"75%\" stop-color=\"#0BED00\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"88%\" stop-color=\"#FFFF00\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"100%\" stop-color=\"#FF0000\" stop-opacity=\"1\"></stop>\n" +
	        "        </linearGradient>\n" +
	        "    </defs>\n" +
	        "    <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#gradient-hsv)\"></rect>\n" +
	        "</svg>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"100%\" height=\"100%\">\n" +
	        "    <defs>\n" +
	        "        <lineargradient id=\"gradient-black\" x1=\"0%\" y1=\"100%\" x2=\"0%\" y2=\"0%\">\n" +
	        "            <stop offset=\"0%\" stop-color=\"#000000\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"100%\" stop-color=\"#CC9A81\" stop-opacity=\"0\"></stop>\n" +
	        "        </lineargradient>\n" +
	        "        <lineargradient id=\"gradient-white\" x1=\"0%\" y1=\"100%\" x2=\"100%\" y2=\"100%\">\n" +
	        "            <stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"1\"></stop>\n" +
	        "            <stop offset=\"100%\" stop-color=\"#CC9A81\" stop-opacity=\"0\"></stop>\n" +
	        "        </lineargradient>\n" +
	        "    </defs>\n" +
	        "    <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#gradient-white)\"></rect>\n" +
	        "    <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#gradient-black)\"></rect>\n" +
	        "</svg>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div style=\"position: relative; width: 100%; height: 100%\">\n" +
	        "    <v:rect style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%\" stroked=\"f\" filled=\"t\">\n" +
	        "        <v:fill type=\"gradient\" method=\"none\" angle=\"0\" color=\"red\" color2=\"red\" colors=\"8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow\"></v:fill>\n" +
	        "    </v:rect>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;