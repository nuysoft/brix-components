(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("components/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "components/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/tree"] = factory(require("jquery"), require("underscore"), require("components/base"), require("brix/event"));
	else
		root["components/tree"] = factory(root["jquery"], root["underscore"], root["components/base"], root["brix/event"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	    http://thx.github.io/brix-site/readme.html?name=Tree
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/tree/
	        Temporary

	    # Tree

	    树组件。

	    ```html
	    <div bx-name="components/tree" class="tree-wrapper">
	    ```

	    ## 配置

	    配置项       | 类型   | 默认值     | 说明
	    :----------- | :----  | :--------     - | :----------
	    data         | array  | -          | 必须。描述树结构的扁平数据。示例见上面的示例。
	    nodeTemplate | array  | -          | 可选。自定义节点模板，属性值是一个 AMD moduleId，模板引擎采用 Underscore 的 <a href="http://underscorejs.org/#template">_.template()</a>。
	    state        | string | `'expand'` | 可选。指定树结构的初始状态。可选值有 `'expand'`、`'collapse'`，分别表示展开、收起。

	    ## 方法

	    * .expand( [ id ] )
	        展开节点。
	    * .collapse( [ id ] )
	        收起节点。
	    * .search( value )
	        查找与参数 value 匹配的节点。
	    * .current( element|id )
	        查找节点关联的数据，或查找数据唯一标识 `id` 关联的节点。
	    * .parent( element|id )
	        查找父节点。
	    * .children( element|id )
	        查找子节点。
	    * .siblings( element|id )
	        查找兄弟节点。
	    * .all()
	        查找所有节点。

	    ## 事件

	    事件类型        | 说明
	    :-------------- | :----------
	    click.tree      | 当点树击节点时被触发。监听函数接受 3 个参数：jQuery 事件对象 `event`、树节点关联的数据和树节点。
	    mouseenter.tree | 当鼠标移入树节点时被触发。监听函数接受 3 个参数：jQuery 事件对象 `event`、树节点关联的数据和树节点。
	    mouseleave.tree | 当鼠标移出树节点时被触发。监听函数接受 3 个参数：jQuery 事件对象 `event`、树节点关联的数据和树节点。
	    active.tree     | -
	    inactive.tree   | -
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5),
	        __webpack_require__(6),
	        __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix, EventManager,
	        template,
	        nodeTemplate
	    ) {

	        var NAMESPACE = '.tree'
	        var STATE = {
	            PENDING: 'pending',
	            ACTIVE: 'active',
	            INACTIVE: 'inactive'
	        }

	        function toTree(list) {
	            var mapped = {}
	            _.each(list, function(item /*, index*/ ) {
	                if (!item || !item.id) return
	                mapped[item.id] = item
	            })

	            var result = []
	            _.each(list, function(item /*, index*/ ) {
	                if (!item) return
	                    /* jshint -W041 */
	                if (item.pid == undefined && item.parentId == undefined) {
	                    result.push(item)
	                    return
	                }
	                var parent = mapped[item.pid] || mapped[item.parentId]
	                if (!parent) return
	                if (!parent.children) parent.children = []
	                parent.children.push(item)
	            })
	            return result
	        }

	        function Tree() {}

	        _.extend(Tree.prototype, Brix.prototype, {
	            options: {
	                data: undefined,
	                nodeTemplate: undefined,
	                state: 'expand' // expand, collapse
	            },
	            init: function() {
	                var that = this
	                var defer = $.Deferred()

	                // 支持自定义 HTML 模板 template
	                var deps = []
	                var customNodeTemplate = this.options.nodeTemplate || this.options['node-template']
	                if (customNodeTemplate) deps.push(customNodeTemplate)
	                window.require(deps, function() {
	                    if (customNodeTemplate) that.options.customNodeTemplate = arguments[0]
	                    defer.resolve()
	                })

	                if (!this.options.data) {
	                    // 解析数据时先移除 BiSheng 插入的 script 节点
	                    $(this.element).find('script').remove()

	                    var text = $.trim(this.element.innerHTML)
	                        /* jshint evil:true */
	                    this.options.data = eval(
	                        '(function(){ return Array.prototype.slice.call(arguments)[0] })(' + text + ')'
	                    )
	                    this.element.innerHTML = ''
	                }

	                var mapped = {}
	                _.each(this.options.data, function(item /*, index*/ ) {
	                    if (!item || !item.id) return

	                    /*jshint eqnull:true */
	                    if (item.pid != null && item.parentId == null) item.parentId = item.pid
	                    if (item.pid == null && item.parentId != null) item.pid = item.parentId

	                    mapped[item.id] = item
	                })
	                this.options.mapped = mapped

	                this.options.data = {
	                    id: 'root',
	                    name: 'root',
	                    children: toTree(this.options.data)
	                }

	                if (deps.length) return defer.promise()
	            },
	            render: function() {
	                var that = this
	                var manager = new EventManager()
	                this.$element = $(this.element)

	                fix(this.options.data, template, this.options.customNodeTemplate || nodeTemplate)
	                this.$element.append(
	                    _.template(template)(this.options.data)
	                )

	                manager.delegate(this.$element, this)

	                if (this.options.state === 'collapse') this.collapse()
	                if (this.options.state === 'expand') this.expand()

	                /*
	                    var Loader = require('brix/loader')
	                    var trees = Loader.query('components/taginput')
	                    trees.on('active.taginput inactive.taginput', function(e){ console.log(e.type, e.namespace, e.target) } )
	                 */
	                var type = 'click' + NAMESPACE + '_' + this.clientId
	                this._state = STATE.INACTIVE
	                $(document.body).off(type)
	                    .on(type, function(event) {
	                        if (event.target === that.element || // 点击组件节点
	                            $.contains(that.element, event.target) || // 点击组件子节点
	                            !event.target.parentNode // 点击不存在节点
	                        ) {
	                            if (that._state === STATE.ACTIVE) return
	                            that.trigger(
	                                $.Event('active' + NAMESPACE, {
	                                    target: event.target
	                                })
	                            )
	                            that._state = STATE.ACTIVE
	                            return
	                        }

	                        if (that._state === STATE.INACTIVE) return
	                        that.trigger(
	                            $.Event('inactive' + NAMESPACE, {
	                                target: event.target
	                            })
	                        )
	                        that._state = STATE.INACTIVE
	                    })
	            },
	            toggle: function(event, id) {
	                event.stopPropagation()

	                var selector
	                if (event === undefined) selector = 'li[data-node-id]' // toggle()
	                else if (!event.type) selector = 'li[data-node-id="' + event + '"]' // toggle( id )
	                else selector = 'li[data-node-id="' + id + '"]' // toggle( event, id )

	                $(selector, this.$element)
	                    .find('> .tree-node-control .brixfont').toggle().end()
	                    .find('> ul.tree').slideToggle('fast')
	            },
	            expand: function(id) {
	                var selector
	                if (id === undefined) selector = 'li[data-node-id]'
	                else selector = 'li[data-node-id="' + id + '"]'

	                // 先展开父节点和祖先节点
	                var mapped = this.options.mapped
	                if (id !== undefined && mapped[id] && mapped[id].parentId) this.expand(mapped[id].parentId)

	                // 再展开当前节点
	                var liNode = $(selector, this.$element).show()
	                    .find('> .tree-node-control .brixfont.plus-sign').hide().end()
	                    .find('> .tree-node-control .brixfont.minus-sign').show().end()
	                if (id === undefined) liNode.find('> ul.tree').show()
	                else liNode.find('> ul.tree').slideDown('fast')
	            },
	            collapse: function(id) {
	                var selector
	                if (id === undefined) selector = 'li[data-node-id]'
	                else selector = 'li[data-node-id="' + id + '"]'

	                var liNode = $(selector, this.$element).show()
	                    .find('> .tree-node-control .brixfont.plus-sign').show().end()
	                    .find('> .tree-node-control .brixfont.minus-sign').hide().end()
	                if (id === undefined) liNode.find('> ul.tree').hide()
	                else liNode.find('> ul.tree').slideUp('fast')
	            },
	            search: function(value) {
	                if (value === undefined) return

	                var that = this
	                $('li[data-node-id]', this.$element).hide()

	                var matched = []
	                _.each(this.options.mapped, function(item /*, id*/ ) {
	                    if (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
	                        matched.push(item)
	                        clan(item, matched)
	                    }
	                })
	                _.each(_.uniq(matched), function(item /*, index*/ ) {
	                    that.expand(item.id)
	                })

	                highlight(this.$element, value)

	                function clan(item, matched) {
	                    _.each(item.children, function(stranger) {
	                        matched.push(stranger)
	                        clan(stranger, matched)
	                    })
	                }

	                function highlight($container, value) {
	                    var value_re = new RegExp(value, 'ig')
	                    _.each($('.tree-node-content-name', $container), function(item /*, index*/ ) {
	                        var $item = $(item)
	                        $item.html(
	                            $item.text().replace(value_re, function(matched) {
	                                return '<span class="highlight">' + matched + '</span>'
	                            })
	                        )
	                    })
	                }

	            },
	            current: function(element) {
	                if (!element) return

	                var mapped = this.options.mapped
	                var result = {}

	                // .current( jQuery ) .current( element ) .current( id )
	                var id = element.jquery ? element.attr('data-node-id') :
	                    element.nodeType ? $(element).attr('data-node-id') :
	                    element
	                var selector

	                if (!id || !mapped[id]) return

	                selector = 'li[data-node-id="' + id + '"]'
	                result.data = mapped[id]
	                result.element = $(selector, this.$element).find('> .tree-node-control > .tree-node-content')[0]

	                return result
	            },
	            parent: function(element) {
	                if (!element) return

	                var mapped = this.options.mapped
	                var result = {}

	                // .parent( jQuery ) .parent( element ) .parent( id )
	                var id = element.jquery ? element.attr('data-node-id') :
	                    element.nodeType ? $(element).attr('data-node-id') :
	                    element
	                var parentId, selector

	                if (!id ||
	                    !mapped[id] ||
	                    !mapped[id].parentId ||
	                    !mapped[mapped[id].parentId]
	                ) return

	                parentId = mapped[id].parentId
	                selector = 'li[data-node-id="' + parentId + '"]'
	                result.data = mapped[parentId]
	                result.element = $(selector, this.$element).find('> .tree-node-control > .tree-node-content')[0]

	                return result
	            },
	            children: function(element) {
	                if (!element) return

	                var that = this
	                var mapped = this.options.mapped
	                var result = []

	                // .children( jQuery ) .children( element ) .children( id )
	                var id = element.jquery ? element.attr('data-node-id') :
	                    element.nodeType ? $(element).attr('data-node-id') :
	                    element
	                var selector

	                if (!id ||
	                    !mapped[id] ||
	                    !mapped[id].children ||
	                    !mapped[id].children.length
	                ) return result

	                _.each(mapped[id].children, function(item /*, index*/ ) {
	                    selector = 'li[data-node-id="' + item.id + '"]'
	                    result.push({
	                        data: mapped[item.id],
	                        element: $(selector, that.$element).find('> .tree-node-control > .tree-node-content')[0]
	                    })
	                })

	                return result
	            },
	            siblings: function(element) {
	                if (!element) return

	                var that = this
	                var mapped = this.options.mapped

	                // .siblings( jQuery ) .siblings( element ) .siblings( id )
	                var id = element.jquery ? element.attr('data-node-id') :
	                    element.nodeType ? $(element).attr('data-node-id') :
	                    element

	                var parent = this.parent(element)
	                var children = []

	                // 当前节点不是根节点
	                if (parent) {
	                    children = this.children(parent.element)

	                } else {
	                    // 当前节点是根节点
	                    if (!id || !mapped[id]) return []
	                    var parentId = mapped[id].parentId
	                    var selector
	                    _.each(mapped, function(item /*, index*/ ) {
	                        if (item.parentId !== parentId) return

	                        selector = 'li[data-node-id="' + item.id + '"]'
	                        children.push({
	                            data: item,
	                            element: $(selector, that.$element).find('> .tree-node-control > .tree-node-content')[0]
	                        })
	                    })
	                }

	                var result = []
	                _.each(children, function(item /*, index*/ ) {
	                    if (item.data.id !== id) result.push(item)
	                })

	                return result
	            },
	            all: function() {
	                var that = this
	                var mapped = this.options.mapped
	                var result = []
	                var selector

	                _.each(mapped, function(item /*, index*/ ) {
	                    selector = 'li[data-node-id="' + item.id + '"]'
	                    result.push({
	                        data: mapped[item.id],
	                        element: $(selector, that.$element).find('> .tree-node-control > .tree-node-content')[0]
	                    })
	                })

	                return result
	            },
	            forward: function(event, id) {
	                event.stopPropagation()
	                var forwardEvent = $.Event(event.type + NAMESPACE, {
	                    target: event.target,
	                    currentTarget: event.currentTarget
	                })
	                this.trigger(forwardEvent, [this.options.mapped[id], event.currentTarget])
	            },
	            destroy: function() {
	                var type = 'click' + NAMESPACE + '_' + this.clientId
	                $(document.body).off(type)
	            }
	        })

	        function fix(node, template, nodeTemplate) {
	            node.contentFn = function(item) {
	                return item.content || _.template(nodeTemplate)(item)
	            }
	            node.childrenFn = function() {
	                if (!this.children || !this.children.length) return ''
	                return _.template(template)(this)
	            }
	            _.each(node.children, function(item /*, index*/ ) {
	                fix(item, template, nodeTemplate)
	            })
	        }

	        return Tree
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

	/*
	    ## 数据结构
	    * Tree Root
	        * Node
	            * id
	            * pid
	            * name
	            * title
	            * url
	            * children
	 */

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<ul class=\"tree\">\n" +
	        "    <% for(var i = 0, item; item = children[i]; i++ ) { %>\n" +
	        "        <li data-node-id=\"<%= item.id %>\" class=\"tree-node <%= item.children && item.children.length ? '': 'tree-leaf' %>\">\n" +
	        "            <div class=\"tree-node-control clearfix\">\n" +
	        "                <div class=\"tree-node-toggle\" bx-click=\"toggle('<%= item.id %>')\">\n" +
	        "                    <span class=\"brixfont plus-sign\">&#xe61f;</span>\n" +
	        "                    <span class=\"brixfont minus-sign\">&#xe620;</span>\n" +
	        "                </div>\n" +
	        "                <div data-node-id=\"<%= item.id %>\" class=\"tree-node-content\" bx-click=\"forward('<%= item.id %>')\" bx-mouseenter=\"forward('<%= item.id %>')\" bx-mouseleave=\"forward('<%= item.id %>')\">\n" +
	        "                    <%= contentFn(item) %>\n" +
	        "                </div>\n" +
	        "            </div>\n" +
	        "            <%= item.childrenFn() %>\n" +
	        "        </li>\n" +
	        "    <% } %>\n" +
	        "</ul>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<span class=\"tree-node-content-name\"><%= name %></span>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ })
/******/ ])
});
;