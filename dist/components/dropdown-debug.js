(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/loader"), require("components/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/loader", "components/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/dropdown"] = factory(require("jquery"), require("underscore"), require("brix/loader"), require("components/base"), require("brix/event"));
	else
		root["components/dropdown"] = factory(root["jquery"], root["underscore"], root["brix/loader"], root["components/base"], root["brix/event"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window, document */
	/*
	    http://thx.github.io/brix-site/readme.html?name=Dropdonw
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/dropdown/
	        Temporary

	    # Dropdown

	    下拉框组件。

	    ```html
	    <select bx-name="components/dropdown">
	        <option value="1">Action</option>
	        <option value="2">Another action</option>
	        <option value="3">Something else here</option>
	    </select>
	    ```

	    ## 配置
	    
	    配置项    | 类型              | 默认值  | 说明
	    :-------- | :---------------- | :------ | :----------
	    data      | array             | -       | 可选。下拉框中的数据。默认从子节点 `<optgroup>` 和 `<option>` 读取。
	    value     | string            | -       | 可选。下拉框的值。
	    searchbox | boolean           | `false` | 可选。是否开启下拉框中的输入框。可选值有 `false`、`true`、`'enter'`。
	    popover   | boolean or number | `false` | 可选。是否为下拉框的条目配置 `bx-name="components/popover"`。可选值有 `false`、`true`、`width`。

	    ## 方法

	    * .val( [ value ] )
	        设置或读取下拉框的值。
	    * .data( [ data ] )
	        设置或读取下拉框中的数据。

	    ## 事件

	    事件类型        | 说明
	    :-------------- | :----------
	    change.dropdown | 当值发生变化时被触发。
	    search.dropdown | 见配置项 `searchbox`。
	    
	    ## 参考
	    * http://getbootstrap.com/components/#dropdowns
	    * http://silviomoreto.github.io/bootstrap-select/
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5), __webpack_require__(6),
	        __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Loader, Brix, EventManager,
	        template
	    ) {
	        var NAMESPACE = '.dropdown'
	        var compiledTemplate = _.template(template)

	        function Dropdown(options) {
	            if (options && options.element) {
	                if ('select' !== options.element.nodeName.toLowerCase()) {
	                    return new CustomDropdown(options)
	                }
	            }
	        }

	        _.extend(Dropdown.prototype, Brix.prototype, {
	            options: {
	                name: undefined,
	                label: undefined,
	                value: undefined,
	                data: [],
	                disabled: undefined,

	                width: undefined, // data-width="100" data-width="100px" data-width="100%"
	                className: undefined, // { data-class | data-className | className: ''}
	                justify: false, // 两端对齐 data-justify="true|false"

	                searchbox: false, // false | true | keyup | enter
	                placeholder: '搜索关键词',
	                _searchboxEvent: 'keyup', // keyup | enter

	                popover: false, // true | width
	                _popoverWidth: ''
	            },
	            init: function() {
	                this.$element = $(this.element).hide()
	                this.$manager = new EventManager('bx-')

	                var options = this.options

	                // 如果没有提供选项 data，则从节点 select 的 option 收集数据
	                if (!options.data.length) {
	                    options.data = this._parseDataFromSelect(this.$element)

	                } else {
	                    // 如果提供了选项 data，则逆向填充节点 select 的 option
	                    this._fixFlattenData(this.options.data)
	                    this._fillSelect()
	                }

	                // 节点是否被禁用
	                options.disabled = this.$element.prop('disabled')

	                // 初始化节点 select 的状态
	                if (options.value !== undefined) this.$element.val(options.value + '')

	                // 初始化选项 label、value
	                var $selectedOption = this.$element.find('option:selected')
	                options.label = $.trim($selectedOption.text())
	                options.value = $selectedOption.attr('value')

	                // 初始化选项 name
	                options.name = this.$element.attr('name')

	                // 解析选项 searchbox
	                if (options.searchbox) {
	                    if (options.searchbox === true) {
	                        options._searchboxEvent = 'keyup'
	                    } else {
	                        options._searchboxEvent = options.searchbox
	                        options.searchbox = true
	                    }
	                }

	                // 解析选项 popover
	                if (options.popover) {
	                    if (options.popover !== true) {
	                        options._popoverWidth = options.popover
	                        options.popover = true
	                    }
	                }

	                // data-class => data-className
	                if (this.options.class) this.options.className = this.options.class
	            },
	            render: function() {
	                this.$relatedElement = $(
	                    compiledTemplate(this.options)
	                ).insertBefore(this.$element)

	                var width = this.options.width
	                if (width) {
	                    if (parseInt(width) == width) width += 'px'
	                    this.$relatedElement.css({
	                        width: width,
	                        'min-width': width
	                    })
	                }

	                // 类样式 data-className
	                if (this.options.className) {
	                    this.$relatedElement.addClass(this.options.className)
	                }

	                // 两端对齐 data-justify
	                if (this.options.justify) {
	                    this.$relatedElement.addClass('dropdown-justify')
	                }

	                this.$manager.delegate(this.$element, this)
	                this.$manager.delegate(this.$relatedElement, this)

	                if (this.options.popover) Loader.boot(this.$relatedElement)

	                // this._responsive()
	                this._autoHide()
	            },
	            toggle: function( /*event*/ ) {
	                this.$relatedElement.toggleClass('open')
	                return this
	            },
	            show: function() {
	                this.$relatedElement.addClass('open')
	                return this
	            },
	            hide: function() {
	                this.$relatedElement.removeClass('open')
	                return this
	            },
	            /*
	                .val( value )
	                .val()
	            */
	            val: function(value) {
	                // this.$element.val()
	                var that = this
	                var oldValue = function() {
	                    var $target = that.$relatedElement.find('ul.dropdown-menu > li.active > a')
	                    var oldValue = $target.attr('value')
	                    if (oldValue === undefined) oldValue = $.trim($target.text())
	                    return oldValue
	                }()

	                // .val()
	                if (value === undefined) return oldValue

	                // .val( value )
	                var data /* { label: '', value: '', selected: true|false } */
	                if (_.isObject(value)) data = value
	                else _.each(this.options.data, function(item /*, index*/ ) {
	                    if (item.children) {
	                        _.each(item.children, function(childItem /*, index*/ ) {
	                            if (childItem.value == value) data = childItem
	                            childItem.selected = childItem.value == value
	                        })
	                    } else {
	                        if (item.value == value) data = item
	                        item.selected = item.value == value
	                    }
	                })

	                // 未知值
	                if (!data) return

	                // 更新模拟下拉框的内容
	                this.$relatedElement.find('button.dropdown-toggle > span.dropdown-toggle-label')
	                    .text(data.label)

	                // 更新原生下拉框的值
	                this.$element
	                    .val(data.value)

	                // 更新模拟下拉框的选中状态
	                this.$relatedElement.find('ul.dropdown-menu')
	                    .find('li:has([value="' + oldValue + '"])')
	                    .removeClass('active')
	                    .end()
	                    .find('li:has([value="' + data.value + '"])')
	                    .addClass('active')

	                // 将 data.value 转换为字符串，是为了避免检测 `1 === '1'` 失败（旧值 oldValue 总是字符串）
	                if (('' + data.value) === oldValue) return this

	                // TODO #19 支持 event.preventDefault()
	                // 应该先触发 change.dropdown 事件，然后检测事件的默认行为是否被阻止，然后才是改变样式！

	                var event = $.Event('change' + NAMESPACE)
	                this.trigger(event, {
	                    name: this.options.name,
	                    label: data.label,
	                    value: data.value
	                })

	                this.$element
	                    .triggerHandler('change')

	                return this
	            },
	            data: function(data) {
	                // .data()
	                if (data === undefined) return this.options.data

	                // .data(data)
	                this.options.data = this._fixFlattenData(data)
	                this._fillSelect()

	                var $menu = this.$relatedElement.find('ul.dropdown-menu')
	                var $newMenu = $(
	                    compiledTemplate(this.options)
	                ).find('ul.dropdown-menu')

	                $menu.replaceWith($newMenu)

	                this.$manager.delegate(this.$relatedElement, this)

	                if (this.options.popover) Loader.boot(this.$relatedElement)

	                return this
	            },
	            select: function(event /*, trigger*/ ) {
	                var $target = $(event.currentTarget)
	                var value = $target.attr('value')
	                var label = $.trim($target.text())
	                this.val(value !== undefined ? value : label)
	                this.toggle()

	                // #8 如果在 change.dropdown 中再次改变值，则会和下面的代码冲突
	                // $target.closest('li').addClass('active')
	                //     .siblings().removeClass('active')
	            },
	            search: function(event) {
	                if (event.type === 'keyup') {
	                    var key = event.keyCode

	                    // 忽略不产生输入的辅助按键
	                    //    command            modifiers                   arrows
	                    if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) return

	                    // 如果选项 searchbox 为 `'enter'`，则只响应 enter 键
	                    if (this.options._searchboxEvent === 'enter' && key !== 13) return
	                }

	                var seed = $(event.target).val()
	                this.trigger('search' + NAMESPACE, seed)
	            },
	            filter: function(seed, all) {
	                // ( event, seed )
	                if (seed.type) {
	                    seed = all
	                    all = false
	                }

	                // var $lis = this.$relatedElement.find('ul.dropdown-menu li').hide()
	                // $lis.has('> a:contains("' + seed + '")').show() // 显示匹配 text 的选项

	                // 性能优化 #10 https://jsfiddle.net/3z7qyzvv/3/
	                // 1. display > .hide/show()
	                // 2. .filter() > .has()
	                var $lis = this.$relatedElement.find('ul.dropdown-menu li')
	                if (!seed) {
	                    $lis.css('display', 'list-item')
	                } else {
	                    $lis.css('display', 'none')
	                    $lis.filter(':contains("' + seed + '")').show()
	                        .css('display', 'list-item')
	                }

	                if (all) $lis.has('> a[value*="' + seed + '"]').show() // 显示匹配 value 的选项
	            },
	            disabled: function(disabled) {
	                // .disabled()
	                if (disabled === undefined) return this.options.disabled

	                // .disabled( true | false )
	                this.options.disabled = disabled
	                this.$element.prop('disabled', disabled)
	                this.$relatedElement[disabled ? 'addClass' : 'removeClass']('disabled')
	                return this
	            },
	            _parseDataFromSelect: function($select) {
	                var children = _.filter($select.children(), function(child /*, index*/ ) {
	                    // <optgroup> <option>
	                    return /optgroup|option/i.test(child.nodeName)
	                })
	                return _.map(children, function(child /*, index*/ ) {
	                    var $child = $(child)
	                    return /optgroup/i.test(child.nodeName) ? {
	                        label: $child.attr('label'),
	                        children: _parseOptions($child.children())
	                    } : _parseOption(child)
	                })

	                function _parseOptions(options) {
	                    return _.map(options, function(option /*, index*/ ) {
	                        return _parseOption(option)
	                    })
	                }

	                function _parseOption(option) {
	                    var $option = $(option)
	                    return $option.hasClass('divider') ? 'divider' : {
	                        label: $.trim($option.text()),
	                        value: $option.attr('value'),
	                        selected: $option.prop('selected')
	                    }
	                }
	            },
	            _fixFlattenData: function(data) {
	                return _.map(data, function(item, index, context) {
	                    return (context[index] = _.isObject(item) ? item : {
	                        label: item,
	                        value: item
	                    })
	                })
	            },
	            _fillSelect: function() {
	                var $select = this.$element.empty()
	                _.each(this.options.data, function(item) {
	                    if (item.children && item.children.length) {
	                        var $optgroup = $('<optgroup>').attr('label', item.label)
	                        _.each(item.children, function(item /*, index*/ ) {
	                            _genOption(item).appendTo($optgroup)
	                        })
	                        $optgroup.appendTo($select)

	                    } else {
	                        _genOption(item).appendTo($select)
	                    }
	                })

	                function _genOption(item) {
	                    // item { label: '', value: '', selected: true|false }
	                    return $('<option>')
	                        .attr('value', item.value)
	                        .prop('selected', item.selected)
	                        .text(item.label)
	                }
	            },
	            _responsive: function() {
	                var $window = $(window)
	                var $relatedElement = this.$relatedElement
	                var $menu = $relatedElement.find('ul.dropdown-menu')
	                $(window).on('scroll', function() {
	                    var offset = $relatedElement.offset()
	                    var top = offset.top - $window.scrollTop()
	                    var button = $window.scrollTop() + $window.height() - offset.top - $relatedElement.outerHeight()
	                    var placement = button >= top ? 'button' : 'top'
	                    switch (placement) {
	                        case 'button':
	                            $menu.css('max-height', top - 10)
	                            break
	                        case 'top':
	                            $menu.css('max-height', button - 10)
	                            break
	                    }
	                })
	            },
	            _autoHide: function() {
	                var that = this
	                var type = 'click.dropdown_autohide_' + this.clientId
	                $(document.body).off(type)
	                    .on(type, function(event) {
	                        if (that.$relatedElement.has(event.target).length) return
	                        that.hide()
	                    })
	            },
	            destroy: function() {
	                this.$manager.undelegate(this.$element)
	                this.$manager.undelegate(this.$relatedElement)

	                this.$relatedElement.remove()

	                var type = 'click.dropdown_autohide_' + this.clientId
	                $(document.body).off(type)
	            }
	        })

	        /*
	            非 Select Dropdown
	        */

	        function CustomDropdown() {}

	        _.extend(CustomDropdown.prototype, Dropdown.prototype, {
	            init: function() {
	                this.$element = $(this.element)
	                this.$relatedElement = this.$element
	                this.$manager = new EventManager('bx-')

	                this._fixFlattenData(this.options.data)

	                // 初始化选项 name
	                this.options.name = this.$element.attr('name')
	            },
	            render: function() {
	                if (this.options.value !== undefined) this.val(this.options.value)

	                this.$manager.delegate(this.$relatedElement, this)

	                // this._responsive()
	                this._autoHide()
	            },
	            val: function(value) {
	                var that = this
	                var oldValue = function() {
	                    var $target = that.$element.find('ul.dropdown-menu > li.active > a')
	                    var oldValue = $target.attr('value')
	                    if (oldValue === undefined) oldValue = $.trim($target.text())
	                    return oldValue
	                }()

	                // .val()
	                if (value === undefined) return oldValue

	                // .val( value )
	                var data /* { label: '', value: '', selected: true|false } */
	                if (_.isObject(value)) data = value
	                else _.each(that.$element.find('ul.dropdown-menu > li'), function(item /*, index*/ ) {
	                    var $item = $(item)
	                    var $target = $item.find('> a')
	                    var targetValue = $target.attr('value')
	                    var targetText = $.trim($target.text())
	                    if (
	                        (targetValue !== undefined && targetValue == value) ||
	                        (targetValue === undefined && targetText == value)
	                    ) {
	                        data = {
	                            name: that.options.name,
	                            label: targetText,
	                            value: targetValue !== undefined ? targetValue : targetText
	                        }
	                    }
	                })

	                // 未知值
	                if (!data) return

	                // 更新模拟下拉框的内容（先更新了再比较值是否有变化，因为此时渲染的内容可能是错误的！）
	                this.$relatedElement.find('button.dropdown-toggle > span.dropdown-toggle-label')
	                    .text(data.label)

	                // 将 data.value 转换为字符串，是为了避免检测 `1 === '1'` 失败（旧值 oldValue 总是字符串）
	                if (('' + data.value) === oldValue) return this

	                // 更新模拟下拉框的选中状态
	                this.$relatedElement.find('ul.dropdown-menu')
	                    .find('li:has([value="' + oldValue + '"])')
	                    .removeClass('active')
	                    .end()
	                    .find('li:has([value="' + data.value + '"])')
	                    .addClass('active')

	                this.trigger('change' + NAMESPACE, data)

	                return this
	            },
	            data: function(data) {
	                // .data()
	                if (data === undefined) return this.options.data

	                // .data(data)
	                this.options.data = this._fixFlattenData(data)

	                var $menu = this.$relatedElement.find('ul.dropdown-menu')
	                var $newMenu = $(
	                    compiledTemplate(this.options)
	                ).find('ul.dropdown-menu')

	                $menu.replaceWith($newMenu)

	                this.$manager.delegate(this.$relatedElement, this)

	                return this
	            }
	        })

	        return Dropdown
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

	/*
	    TODO
	    multiple disabled
	    responsive http://silviomoreto.github.io/bootstrap-select/
	 */

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"dropdown <%= disabled ? 'disabled' : '' %> <%= searchbox ? 'dropdown-searchbox' : '' %> <%= popover ? 'dropdown-popover dropdown-ellipsis' : '' %>\">\n" +
	        "    <button class=\"btn btn-default dropdown-toggle\" type=\"button\" value=\"<%= value %>\" bx-click=\"toggle()\">\n" +
	        "        <span class=\"dropdown-toggle-label\"><%= label %></span>\n" +
	        "        <!-- <span class=\"caret\"> -->\n" +
	        "        <span class=\"caret_custom caret_brixfont\"><!-- 保留 caret_brixfont 是为了向后兼容，在下个版本中移除  -->\n" +
	        "            <span class=\"brixfont down\">&#xe623;</span><!-- 向下 &#xe623; -->\n" +
	        "            <span class=\"brixfont up\">&#xe62e;</span><!-- 向上 &#xe62e;-->\n" +
	        "        </span>\n" +
	        "    </button>\n" +
	        "    <div class=\"dropdown-menu-wrapper\">\n" +
	        "        <% if (searchbox) { %>\n" +
	        "        <div class=\"searchbox\">\n" +
	        "            <label>\n" +
	        "                <span class=\"brixfont\">&#xe61c;</span>\n" +
	        "                <input bx-keyup=\"search()\" type=\"text\" placeholder=\"<%= placeholder %>\">\n" +
	        "            </label>\n" +
	        "        </div>\n" +
	        "        <% } %>\n" +
	        "        <ul class=\"dropdown-menu\">\n" +
	        "            <% for(var i = 0, item; item = data[i]; i++ ) { %>\n" +
	        "                <% if(item.children) { %>\n" +
	        "                    <li class=\"dropdown-header\"><%=item.label%></li>\n" +
	        "                    <% for(var ii = 0; ii < item.children.length; ii++ ) { %>\n" +
	        "                        <li class=\"<%= item.children[ii].value == value ? 'active' : ''%>\">\n" +
	        "                            <% if (popover) { %>\n" +
	        "                            <a href=\"javascript:;\" value=\"<%= item.children[ii].value %>\" bx-click=\"select()\"\n" +
	        "                                bx-name=\"components/popover\"\n" +
	        "                                data-content=\"<%= item.children[ii].label %>\" \n" +
	        "                                data-width=\"<%= _popoverWidth %>\">\n" +
	        "                                <span><%= item.children[ii].label %></span>\n" +
	        "                            </a>\n" +
	        "                            <% } else { %>\n" +
	        "                            <a href=\"javascript:;\" value=\"<%= item.children[ii].value %>\" bx-click=\"select()\"\n" +
	        "                                title=\"<%= item.children[ii].label %>\">\n" +
	        "                                <span><%= item.children[ii].label %></span>\n" +
	        "                            </a>\n" +
	        "                            <% } %>    \n" +
	        "                        </li>\n" +
	        "                    <% } %>\n" +
	        "                <% } else { %>\n" +
	        "                    <% if (item === 'divider') { %>\n" +
	        "                        <li class=\"divider\"></li>\n" +
	        "                    <% } else { %>\n" +
	        "                        <li class=\"<%= item.value == value ? 'active' : ''%>\">\n" +
	        "                            <% if (popover) { %>\n" +
	        "                            <a href=\"javascript:;\" value=\"<%= item.value %>\" bx-click=\"select()\"\n" +
	        "                                bx-name=\"components/popover\"\n" +
	        "                                data-content=\"<%= item.label %>\" \n" +
	        "                                data-width=\"<%= _popoverWidth %>\">\n" +
	        "                                <span><%= item.label %></span>\n" +
	        "                            </a>\n" +
	        "                            <% } else { %>\n" +
	        "                            <a href=\"javascript:;\" value=\"<%= item.value %>\" bx-click=\"select()\"\n" +
	        "                                title=\"<%= item.label %>\">\n" +
	        "                                <span><%= item.label %></span>\n" +
	        "                            </a>\n" +
	        "                            <% } %>    \n" +
	        "                        </li>\n" +
	        "                    <% }  %>\n" +
	        "                <% } %>\n" +
	        "            <% } %>\n" +
	        "        </ul>\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;