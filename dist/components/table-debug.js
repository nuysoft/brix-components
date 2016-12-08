(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("components/base"), require("Sortable"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "components/base", "Sortable", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/table"] = factory(require("jquery"), require("underscore"), require("components/base"), require("Sortable"), require("brix/event"));
	else
		root["components/table"] = factory(root["jquery"], root["underscore"], root["components/base"], root["Sortable"], root["brix/event"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window  */
	/*
	    http://thx.github.io/brix-site/readme.html?name=Table
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/table/
	        Temporary

	    Responsive tables
	        http://gergeo.se/RWD-Table-Patterns/#features
	    
	    data-column-rwd-range
	    data-column-rwd-limit
	    data-column-priority-trigger

	        data-column-priority
	        data-column-priority-state
	        data-column-priority-name

	    data-column-id

	    > RWD responsive web design
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4),
	        __webpack_require__(5),
	        __webpack_require__(6),
	        __webpack_require__(8)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix,
	        linkage,
	        ColumnRWD,
	        ColumnPriority
	    ) {
	        /*
	            不需要渲染，只是事件增强。
	        */

	        var NAMESPACE = '.table'
	        var Constant = {
	            UUID: 0,
	            COLUMN: {
	                ID: 'column-id',
	                FIELD: 'column-field',
	                NAME: 'column-name',
	                RWD: {
	                    RANGE: 'column-rwd-range',
	                    LIMIT: 'column-rwd-limit',
	                    FADE: 'column-rwd-fade',
	                    CURSOR: 'column-rwd-cursor'
	                },
	                PRIORITY: {
	                    FIELDS: 'column-priority-fields',
	                    TRIGGER: 'column-priority-trigger',
	                    STATE: 'column-priority-state',
	                    INDEX: 'column-priority-index',
	                    PLACEMENT: 'column-priority-placement',
	                    ALIGN: 'column-priority-align'
	                }
	            }
	        }

	        function Table() {}

	        _.extend(Table.prototype, Brix.prototype, {
	            options: {},
	            init: function() {
	                this.$element = $(this.element)
	            },
	            render: function() {
	                var that = this

	                /* jshint unused:false */
	                linkage(this.element, function(event, values, target) {
	                    that.trigger('toggle' + NAMESPACE, [values, target])
	                    that.contextual()
	                })

	                var columnRWDHandler, columnPriorityHandler
	                if (this.options[Constant.COLUMN.RWD.RANGE]) {
	                    columnRWDHandler = ColumnRWD(this, this.options, Constant, function(event, state) {
	                        that.trigger('change' + ColumnRWD.NAMESPACE, [state])
	                    })
	                    var type = 'resize.table_' + this.clientId
	                    $(window).on(type, _.throttle(function( /*event*/ ) {
	                        columnRWDHandler.beautify()
	                    }, 50))
	                }
	                if (this.options[Constant.COLUMN.PRIORITY.TRIGGER]) {
	                    columnPriorityHandler = ColumnPriority(this, this.options, Constant, function(event, fields) {
	                        that.trigger('change' + ColumnPriority.NAMESPACE, [fields])
	                        columnRWDHandler.flush()
	                    })

	                    // 初始值
	                    if (this.options[Constant.COLUMN.PRIORITY.FIELDS]) {
	                        columnPriorityHandler.fields(this.options[Constant.COLUMN.PRIORITY.FIELDS])
	                    }
	                }

	                this.columnRWDHandler = columnRWDHandler
	                this.columnPriorityHandler = columnPriorityHandler
	            },
	            contextual: function() {
	                _.each(this.$element.find('input:checkbox'), function(item /*, index*/ ) {
	                    var checked = $(item).prop('checked')
	                    $(item).closest('tr')[
	                        checked ? 'addClass' : 'removeClass'
	                    ]('active')
	                })
	            },
	            destroy: function() {
	                var type = 'resize.table_' + this.clientId
	                $(window).off(type)

	                type = 'click' + ColumnPriority.NAMESPACE + '_' + this.clientId
	                $(document.body).off(type)

	                if(this.columnPriorityHandler) {
	                    this.columnPriorityHandler.$manager.undelegate(this.columnPriorityHandler.$relatedElement)
	                }
	            }
	        })

	        Table.extend = Brix.extend

	        return Table

	        // return Brix.extend({})
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, console  */
	/*
	    TODO
	        
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _
	    ) {

	        var PREFIX = 'data-linkage-'
	        var ATTR_NAME = PREFIX + 'name'
	        var ATTR_PARENT_NAME = PREFIX + 'parent-name'
	        var ATTR_NAME_VALUE = '[' + ATTR_NAME + '="<%= name %>"]'
	        var ATTR_PARENT_NAME_VALUE = '[' + ATTR_PARENT_NAME + '="<%= name %>"]'

	        function linkage(container, callback) {
	            var $container = $(container)
	            var selector = '[' + ATTR_NAME + '],[' + ATTR_PARENT_NAME + ']'

	            _valid($container, selector)

	            $(container).on('change.linkage', selector, function(event) {
	                if (event.target !== event.currentTarget) return
	                var $currentTarget = $(event.currentTarget)
	                _parent($currentTarget, $container)
	                _children($currentTarget, $container)
	                _siblings($currentTarget, $container)

	                // _indeterminate($container)

	                if (callback) callback(event, linkage.val(container), event.currentTarget)
	            })

	            // _indeterminate($container)

	            return linkage
	        }

	        linkage.off = function(container) {
	            var $container = $(container)
	            var selector = '[' + ATTR_NAME + '],[' + ATTR_PARENT_NAME + ']'
	            $container.off('click.linkage', selector)

	            return linkage
	        }

	        linkage.val = function(container, values) {
	            var $container = $(container)

	            // linkage.val(container, values)
	            if (values) {
	                var checkboxs = $container.find('input:checkbox, input:radio')
	                    .not(':disabled')
	                    .prop('checked', false)
	                _.each(values, function(item /*, index*/ ) {
	                    var $target = checkboxs.filter('[value="' + item + '"]').prop('checked', true)
	                    _.each($target, function(item /*, index*/ ) {
	                        _parent($(item), $container)
	                        _children($(item), $container)
	                    })
	                })
	                return linkage
	            }

	            // linkage.val(container)
	            values = []
	            var checked = $container.find('input:checkbox:checked, input:radio:checked')
	            _.each(checked, function(item /*, index*/ ) {
	                var value = $(item).attr('value')
	                if (value !== undefined && value !== '') values.push(value)
	            })
	            return values
	        }

	        function _valid($container, selector) {
	            var $all = $container.find(selector)
	            _.each($all, function(item /*, index*/ ) {
	                var $item = $(item)
	                var name = $item.attr(ATTR_NAME)
	                var parentName = $item.attr(ATTR_PARENT_NAME)
	                if (name === parentName) {
	                    console.warn(
	                        new Error(
	                            _.template(
	                                '<%= a %> and <%= b %> have save value "<%= value %>", may cause the Linkage to recursive search. You should avoid this kind of code.'
	                            )({
	                                a: ATTR_NAME,
	                                b: ATTR_PARENT_NAME,
	                                value: name
	                            })
	                        ).stack
	                    )
	                    console.warn(item)
	                }
	            })
	        }

	        function _parent($target, $container) {
	            var name = $target.attr(ATTR_NAME)
	            var parentName = $target.attr(ATTR_PARENT_NAME)

	            if (!parentName) return
	            if (name === parentName) return

	            var $parent = $container.find(
	                _.template(ATTR_NAME_VALUE)({
	                    name: parentName
	                })
	            )
	            if (!$parent.length) return

	            var $siblings = $container.find(
	                _.template(ATTR_PARENT_NAME_VALUE)({
	                    name: parentName
	                })
	            )
	            if (!$siblings.length) return

	            // 复选框
	            var $checkboxSiblings = $siblings.filter(':checkbox')
	            var checkboxSiblingsStates = []
	            _.each($checkboxSiblings, function(item /*, index*/ ) {
	                checkboxSiblingsStates.push(
	                    item.indeterminate ? false : item.checked
	                )
	            })

	            // 复选框 半选
	            var $indeterminateSiblings = $(
	                _.filter($checkboxSiblings, function(item /*, index*/ ) {
	                    return item.indeterminate
	                })
	            )

	            // 单选框
	            var $radioSiblings = $siblings.filter(':radio')
	            var radioSiblingsNames = _.uniq(
	                _.map($radioSiblings, function(item /*, index*/ ) {
	                    return $(item).attr('name')
	                })
	            )
	            var radioSiblingsStates = []
	            _.each(radioSiblingsNames, function(name /*, index*/ ) {
	                if (!name) return
	                radioSiblingsStates.push(!!
	                    $radioSiblings.filter('[name="' + name + '"]:checked').length
	                )
	            })


	            var siblingsStates = _.uniq(
	                checkboxSiblingsStates.concat(radioSiblingsStates)
	            )
	            $parent
	                .prop(
	                    'indeterminate',
	                    $indeterminateSiblings.length ? true :
	                    siblingsStates.length === 2 // [ true, false ]
	                )
	                .prop(
	                    'checked',
	                    $indeterminateSiblings.length ? false :
	                    siblingsStates.length === 1 && siblingsStates[0]
	                )

	            _parent($parent, $container)
	        }

	        function _children($target, $container) {
	            var name = $target.attr(ATTR_NAME)
	            var parentName = $target.attr(ATTR_PARENT_NAME)
	            var checked = $target.prop('checked')

	            if (!name) return
	            if (name === parentName) return

	            var $children = $container.find(
	                _.template(ATTR_PARENT_NAME_VALUE)({
	                    name: name
	                })
	            )
	            if (!$children.length) return

	            var $enabledChildren = $children.not(':disabled')
	            if (!$enabledChildren.length) return

	            var $checkboxChildren = $enabledChildren.filter(':checkbox')
	            $checkboxChildren.prop('checked', checked)

	            var $radioChildren = $enabledChildren.filter(':radio')
	            if (!checked) $radioChildren.prop('checked', checked)

	            if (checked) {
	                var radioNames = _.uniq(
	                    _.map($radioChildren, function(item /*, index*/ ) {
	                        return $(item).attr('name')
	                    })
	                )
	                _.each(radioNames, function(name /*, index*/ ) {
	                    if (!name) return
	                    var $radioSameNameChildren = $radioChildren.filter('[name="' + name + '"]')
	                    if (!$radioSameNameChildren.length) return
	                    var radioSameNameChildrenStates = _.map($radioSameNameChildren, function(item /*, index*/ ) {
	                        return $(item).prop('checked')
	                    })
	                    if (_.indexOf(radioSameNameChildrenStates, checked) !== -1) return
	                    else $radioSameNameChildren.eq(0).prop('checked', checked)
	                })
	            }

	            // $children.not(':disabled').prop('checked', checked)

	            _.each($children, function(item /*, index*/ ) {
	                _children($(item), $container)
	            })
	        }

	        function _siblings($target, $container) {
	            if (!$target.is(':radio')) return

	            var name = $target.attr('name')
	            var siblings = $container.find('[name="' + name + '"]').not($target)
	            _.each(siblings, function(item /*, index*/ ) {
	                var $item = $(item)
	                _parent($item, $container)
	                _children($item, $container)
	            })
	        }

	        // function _indeterminate($container) {
	        //     var $all = $container.find(
	        //         '[' + ATTR_NAME + '],' +
	        //         '[' + ATTR_PARENT_NAME + ']'
	        //     )
	        //     var $dink = $(
	        //         _.filter($all, function(item /*, index*/ ) {
	        //             var $item = $(item)
	        //             var name = $item.attr(ATTR_NAME)
	        //             var $children = $container.find(
	        //                 _.template(ATTR_PARENT_NAME_VALUE)({
	        //                     name: name
	        //                 })
	        //             )
	        //             return !$children.length
	        //         })
	        //     )
	        //     _.each($dink, function(item /*, index*/ ) {
	        //         _parent($(item), $container)
	        //     })
	        // }

	        return linkage
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, setTimeout */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        State
	    ) {

	        var NAMESPACE = '.table_column_rwd'
	        var TEMPLATE_ARROW = '<div class="column-scroll-arrow"><%= text %></div>'
	        var SELECTOR_TH = '> thead > tr > th:nth-child(<%= nth %>)'
	        var SELECTOR_TD = '> tbody > tr > td:nth-child(<%= nth %>)'

	        function column(tableComponentInstance, tableComponentOptions, Constant, callback) {
	            var range = tableComponentOptions[Constant.COLUMN.RWD.RANGE] || [0, -1]
	            var cursor = tableComponentOptions[Constant.COLUMN.RWD.CURSOR] || 1
	            var limit = tableComponentOptions[Constant.COLUMN.RWD.LIMIT] || 5
	            var fade = tableComponentOptions[Constant.COLUMN.RWD.FADE] || false

	            var $table = $(tableComponentInstance.element)
	            var state = _flush(Constant, $table, range, cursor, limit)

	            var $leftArrow = _create($table, '<span class="brixfont chevron-left">&#xe62f;</span>')
	            var $rightArrow = _create($table, '<span class="brixfont chevron-right">&#xe630;</span>')

	            var spree = {
	                Constant: Constant,
	                $table: $table,
	                range: range,
	                cursor: cursor,
	                limit: limit,
	                fade: fade,
	                state: state,
	                $leftArrow: $leftArrow,
	                $rightArrow: $rightArrow,
	                callback: callback
	            }

	            _bind(spree)
	            setTimeout(function() {
	                _beautify(spree)
	            }, 100)

	            return {
	                state: state,
	                flush: function(moveto) {
	                    _flush(Constant, $table, range, moveto || cursor, limit, state)
	                    _beautify(spree)
	                    return this
	                },
	                beautify: function() {
	                    _beautify(spree)
	                    return this
	                }
	            }
	        }

	        column.NAMESPACE = NAMESPACE

	        function _create($table, text) {
	            var $thead = $table.find('> thead')
	            var html = _.template(TEMPLATE_ARROW)({
	                text: text,
	                height: $thead.height()
	            })
	            var $arrow = $(html).insertAfter($table)
	                .offset({
	                    top: $thead.offset().top
	                })

	            return $arrow
	        }

	        function _handler(event, spree) {
	            _flush(spree.Constant, spree.$table, spree.range, spree.state.cursor, spree.state.limit, spree.state)
	            _beautify(spree)
	            event.preventDefault()
	            event.stopPropagation()
	        }

	        function _bind(spree) {
	            spree.$leftArrow.on('click' + NAMESPACE, function(event) {
	                spree.state.moveToPrev()
	                _handler(event, spree)
	                if (spree.callback) spree.callback(event, spree.state, event.currentTarget)
	            })

	            spree.$rightArrow.on('click' + NAMESPACE, function(event) {
	                spree.state.moveToNext()
	                _handler(event, spree)
	                if (spree.callback) spree.callback(event, spree.state, event.currentTarget)
	            })

	            if (spree.fade) {
	                spree.$table.hover(function() {
	                    spree.$leftArrow.fadeIn('fast')
	                    spree.$rightArrow.fadeIn('fast')
	                    _beautify(spree)
	                }, function(event) {
	                    if (
	                        event.relatedTarget === spree.$leftArrow.get(0) || // 移出向左按钮
	                        $.contains(spree.$leftArrow.get(0), event.relatedTarget) || // 移出向左按钮子节点
	                        event.relatedTarget === spree.$rightArrow.get(0) || // 移出向右按钮
	                        $.contains(spree.$rightArrow.get(0), event.relatedTarget) // 移出向右按钮子节点
	                    ) return

	                    spree.$leftArrow.fadeOut('fast')
	                    spree.$rightArrow.fadeOut('fast')
	                })

	            } else {
	                spree.$leftArrow.show()
	                spree.$rightArrow.show()
	                _beautify(spree)
	            }
	        }

	        function _flush(Constant, $table, range, cursor, limit, state) {
	            var $thead = $table.find('> thead')
	            var $tbody = $table.find('> tbody')
	            var $ths = $thead.find('> tr > th')

	            // 修正滚动列所需的参数
	            range[0] = (+range[0] + $ths.length) % $ths.length
	            range[1] = (+range[1] + $ths.length) % $ths.length

	            // 自动应用 priority 插件：增加标识 data-column-id
	            _.each($ths, function(item, index) {
	                item = $(item)
	                if (index >= range[0] && index < range[1]) {
	                    if (item.data(Constant.COLUMN.ID) !== undefined) return
	                    item.attr('data-' + Constant.COLUMN.ID, Constant.UUID++)
	                }
	            })

	            // 过滤不参与分页的列
	            /* jshint unused:false */
	            $ths = _.filter($ths, function(item, index) {
	                return index >= range[0] && (range[1] === 0 || index < range[1])
	            })

	            // 调整被 priority 插件排序的列：按照标记 data-column-priority-index 排序，并调整 DOM 结构
	            var $firstPrev = $($ths[0]).prev()
	                // var $lastNext = $($ths[$ths.length - 1]).next()
	            $ths.sort(function(a, b) { // test
	                var $a = $(a)
	                var $b = $(b)
	                a = +$a.attr('data-' + Constant.COLUMN.PRIORITY.INDEX)
	                b = +$b.attr('data-' + Constant.COLUMN.PRIORITY.INDEX)
	                if (isNaN(a)) a = $a.index()
	                if (isNaN(b)) b = $b.index()
	                return a - b
	            })
	            _.each($ths, function(th, thIndex) {
	                var currentIndex = $(th).index() // index 从 0 开始，nth-child 从 1 开始

	                if (thIndex === 0) $firstPrev.after(th)
	                else $($ths[thIndex - 1]).after(th)

	                var newIndex = $(th).index()
	                var $tds = $tbody.find('> tr > td:nth-child(' + (currentIndex + 1) + ')')
	                _.each($tds, function(td, tdIndex) {
	                    $(td).siblings(':nth-child(' + newIndex + ')').after(td)
	                })
	            })

	            // 过滤被 priority 插件隐藏的列：它们不再参与分页
	            $ths = _.filter($ths, function(item /*, index*/ ) {
	                var $item = $(item)
	                var id = $item.data(Constant.COLUMN.ID)
	                var state = $item.attr('data-' + Constant.COLUMN.PRIORITY.STATE)
	                return id !== undefined && state !== 'hide'
	            })

	            $ths = $($ths)

	            // 初始化或更新分页状态
	            if (!state) {
	                state = new State(
	                    $ths.length,
	                    cursor,
	                    limit
	                )
	            } else {
	                state.setTotal($ths.length)
	                state.setCursor(cursor)
	            }

	            // 调整被 priority 插件隐藏或显示的列（内容列，非表头）
	            for (var i = 0, m, index; i < state.total; i++) {
	                m = (i >= state.start && i < state.end) ? 'show' : 'hide'
	                index = $ths.eq(i)[m]()
	                    .removeClass('start').removeClass('end')
	                    .addClass(i === state.start ? 'start' : '')
	                    .addClass(i === state.end - 1 ? 'end' : '')
	                    .index()
	                $table.find(
	                    _.template(SELECTOR_TD)({
	                        nth: index + 1
	                    })
	                )[m]()
	            }

	            return state
	        }

	        function _beautify(spree) {
	            if (!spree.fade) {
	                spree.$leftArrow.show()
	                spree.$rightArrow.show()
	            }

	            // var tableHeight = spree.$table.height()
	            // var tableTop = spree.$table.offset().top
	            var $thead = spree.$table.find('> thead')
	            var theadHeight = $thead.height()
	            var theadTop = $thead.offset().top

	            // var $tbody = spree.$table.find('> tbody')
	            // var tbodyHeight = $tbody.height()
	            // var tbodyTop = $tbody.offset().top

	            // var $leftTarget = spree.$table.find(_.template(SELECTOR_TH)({
	            //     nth: spree.range[0]
	            // }))

	            var $rightTarget = spree.$table.find(_.template(SELECTOR_TH)({
	                nth: spree.range[1] + 1
	            }))

	            spree.$leftArrow.css({
	                height: theadHeight,
	                'line-height': theadHeight + 'px'
	            }).offset({
	                top: theadTop,
	                left: $rightTarget.offset().left - spree.$rightArrow.width() - (spree.state.hasNext ? spree.$leftArrow.width() : 0)
	                    // left: $leftTarget.offset().left + $leftTarget.outerWidth() // - spree.$leftArrow.width() / 2
	            })
	            spree.$rightArrow.css({
	                height: theadHeight,
	                'line-height': theadHeight + 'px'
	            }).offset({
	                top: theadTop,
	                left: $rightTarget.offset().left - spree.$rightArrow.width() // / 2
	            })

	            if (!spree.state.total || !spree.state.hasPrev) spree.$leftArrow.hide()
	            if (!spree.state.total || !spree.state.hasNext) spree.$rightArrow.hide()
	        }

	        return column
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define  */
	/* global module  */
	/* 
	    Pagination

	    Pure paging implementation reference.
	    纯粹的分页参考实现。

	    属性
	        data        数据
	        total       总条数
	        cursor      当前页数，第几页，从 1 开始计算
	        limit       分页大小
	        pages       总页数
	        start       当前页的起始下标
	        end         当前页的结束下标
	        hasPrev     是否有前一页
	        hasNext     是否有下一页
	        hasFirst    是否有第一页
	        hasLast     是否有最后一页
	        prev        前一页
	        next        后一页
	        first       第一页
	        last        最后一页
	        focus       当前页的当前焦点下标
	    方法
	        calc()              计算分页状态，当属性值发生变化时，方法 calc() 被调用。
	        moveTo(cursor)      移动到指定页
	        moveToPrev()        移动到前一页
	        moveToNext()        移动到下一页
	        moveToFirst()       移动到第一页
	        moveToLast()        移动到最后一页
	        fetch(arr)          获取当前页的数据，或者用当前状态获取参数 arr 的子集
	        setData(data)       更新数据集合
	        setTotal(total)     更新总条数
	        setCursor(cursor)   更新当前页数
	        setFocus(focus)     设置当前焦点
	        setLimit(limit)     设置分页大小
	        get(focus)          获取一条数据
	        toString()          友好打印
	        toHTML(url)         生成分页栏

	*/
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function( /*require, exports*/ ) {

	    return (function(global) {
	        /*
	            new State( data, cursor, limit )
	            new State( total, cursor, limit )  
	        */
	        function State(data, cursor, limit) {
	            this.data = (typeof data === 'number' || typeof data === 'string') ? undefined : data
	            this.total = this.data ? this.data.length : parseInt(data, 10)
	            this.cursor = parseInt(cursor, 10)
	            this.limit = parseInt(limit, 10)
	            this.calc()
	        }
	        State.prototype = {
	            calc: function() {
	                if (this.total && parseInt(this.total, 10) > 0) {
	                    this.limit = this.limit < 1 ? 1 : this.limit

	                    this.pages = (this.total % this.limit === 0) ? this.total / this.limit : this.total / this.limit + 1;
	                    this.pages = parseInt(this.pages, 10)
	                    this.cursor = (this.cursor > this.pages) ? this.pages : this.cursor
	                    this.cursor = (this.cursor < 1) ? this.pages > 0 ? 1 : 0 : this.cursor

	                    this.start = (this.cursor - 1) * this.limit
	                    this.start = (this.start < 0) ? 0 : this.start // 从 0 开始计数
	                    this.end = (this.start + this.limit > this.total) ? this.total : this.start + this.limit
	                    this.end = (this.total < this.limit) ? this.total : this.end

	                    this.hasPrev = (this.cursor > 1) ? true : false
	                    this.hasNext = (this.cursor < this.pages) ? true : false
	                    this.hasFirst = this.hasPrev
	                    this.hasLast = this.hasNext

	                    this.prev = this.hasPrev ? this.cursor - 1 : 0
	                    this.next = this.hasNext ? this.cursor + 1 : 0
	                    this.first = this.hasFirst ? 1 : 0
	                    this.last = this.hasLast ? this.pages : 0

	                    this.focus = this.focus ? this.focus : 0
	                    this.focus = this.focus % this.limit + this.start
	                    this.focus = this.focus > this.end - 1 ? this.end - 1 : this.focus

	                } else {
	                    this.pages = this.cursor = this.start = this.end = 0
	                    this.hasPrev = this.hasNext = this.hasFirst = this.hasLast = false
	                    this.prev = this.next = this.first = this.last = 0
	                    this.focus = 0
	                }
	                
	                return this
	            },
	            moveTo: function(cursor) {
	                this.cursor = parseInt(cursor, 10);
	                return this.calc();
	            },
	            moveToPrev: function() {
	                return this.moveTo(this.cursor - 1);
	            },
	            moveToNext: function() {
	                return this.moveTo(this.cursor + 1);
	            },
	            moveToFirst: function() {
	                return this.moveTo(1);
	            },
	            moveToLast: function() {
	                return this.moveTo(this.pages);
	            },
	            fetch: function(arr) {
	                return (arr || this.data).slice(this.start, this.end);
	            },
	            setData: function(data) {
	                this.data = data;
	                this.total = data.length;
	                return this.calc();
	            },
	            setTotal: function(total) {
	                this.total = parseInt(total, 10);
	                return this.calc();
	            },
	            setCursor: function(cursor) {
	                this.cursor = parseInt(cursor, 10);
	                return this.calc();
	            },
	            setFocus: function(focus) {
	                this.focus = parseInt(focus, 10);
	                if (this.focus < 0) this.focus += this.total;
	                if (this.focus >= this.total) this.focus -= this.total;
	                this.cursor = parseInt(this.focus / this.limit, 10) + 1;
	                return this.calc();
	            },
	            setLimit: function(limit) {
	                this.limit = parseInt(limit, 10);
	                return this.calc();
	            },
	            get: function(focus) {
	                if (focus !== undefined) return this.data[focus % this.data.length];
	                else return this.data[this.focus];
	            },
	            toString: function() {
	                return JSON.stringify(this, null, 4);
	            }
	        }
	        State.prototype.to = State.prototype.moveTo;
	        State.prototype.toPrev = State.prototype.moveToPrev;
	        State.prototype.toNext = State.prototype.moveToNext;
	        State.prototype.toFirst = State.prototype.moveToFirst;
	        State.prototype.toLast = State.prototype.moveToLast;

	        if (typeof module !== 'undefined' && module.exports) {
	            module.exports = State;
	        } else {
	            global.State = State;
	        }
	        return State;
	    })(this)

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/* global document */
	/*
	    https://github.com/RubaXa/Sortable
	        http://rubaxa.github.io/Sortable/

	    TODO
	    功能需求列表
	        保存状态
	        恢复状态
	    设计使用方式

	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(9),
	        __webpack_require__(10),
	        __webpack_require__(11),
	        __webpack_require__(12)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, Sortable,
	        EventManager,
	        position,
	        template
	    ) {

	        var NAMESPACE = '.table_column_priority'

	        function priority(tableComponentInstance, tableComponentOptions, Constant, callback) {

	            var $trigger = $(tableComponentOptions[Constant.COLUMN.PRIORITY.TRIGGER])
	            var placement = tableComponentOptions[Constant.COLUMN.PRIORITY.PLACEMENT] || 'bottom'
	            var align = tableComponentOptions[Constant.COLUMN.PRIORITY.ALIGN] || 'right'

	            var $table = $(tableComponentInstance.element)
	            var $relatedElement = _render(Constant, $table)

	            _toggle($trigger, $relatedElement, placement, align)

	            _autoHide(tableComponentInstance, $trigger, $relatedElement)

	            var $manager = _delegate(Constant, $table, $trigger, $relatedElement, callback)

	            // drag drop
	            var wrapper = $relatedElement.find('.queue .sortable-wrapper')
	            if (wrapper.length) Sortable.create(wrapper[0], {
	                handle: '.item-move',
	                animation: 150,
	                onEnd: function( /*event*/ ) {
	                    // 同步顺序：解析新顺序，然后同步到表头 th 的标记 data-column-priority-index 
	                    var cache = {}
	                    var candidates = $relatedElement.find('.queue .sortable-wrapper .item')
	                    _.each(candidates, function(item, index) {
	                        var $item = $(item)
	                        var id = $item.data(Constant.COLUMN.ID)
	                        cache[id] = index
	                        $item.attr('data-' + Constant.COLUMN.PRIORITY.INDEX, index)
	                    })
	                    var $ths = $table.find('> thead th')
	                    _.each($ths, function(item /*, index*/ ) {
	                        var $item = $(item)
	                        var id = $item.data(Constant.COLUMN.ID)
	                        if (id === undefined) return
	                        $item.attr('data-' + Constant.COLUMN.PRIORITY.INDEX, cache[id])
	                    })
	                }
	            })

	            // 勾选左侧复选框，更新右侧排序区域
	            $relatedElement.on('change' + NAMESPACE, 'input:checkbox', function(event) {
	                var $target = $(event.target)
	                var id = $target.data(Constant.COLUMN.ID)
	                var checked = $target.prop('checked')

	                $relatedElement.find('.queue .sortable-wrapper .item')
	                    .filter('[data-' + Constant.COLUMN.ID + '="' + id + '"]')[
	                        checked ? 'slideDown' : 'slideUp'
	                    ]('fast')
	            })

	            return {
	                $relatedElement: $relatedElement,
	                $manager: $manager,
	                toggle: function() {
	                    $relatedElement.toggle()
	                },
	                show: function() {
	                    $relatedElement.show()
	                },
	                hide: function() {
	                    $relatedElement.hide()
	                },
	                fields: function(fields) {
	                    if (fields) {
	                        var candidates = $relatedElement.find('.candidates input:checkbox')
	                        var queue = $relatedElement.find('.queue .sortable-wrapper .item')
	                        var sortableItems = []
	                        _.each(candidates, function(item /*, index*/ ) {
	                            var $item = $(item)
	                            var field = $item.data(Constant.COLUMN.FIELD)
	                            var priorityIndex = _.indexOf(fields, field)
	                            $item.prop('checked', priorityIndex !== -1).triggerHandler('change' + NAMESPACE)

	                            var $sortableItem = queue.filter('[data-' + Constant.COLUMN.FIELD + '="' + field + '"]')
	                            if (priorityIndex === -1) {
	                                $sortableItem.hide()
	                            } else {
	                                $sortableItem.show()
	                                sortableItems[priorityIndex] = $sortableItem
	                            }
	                        })

	                        _.each(sortableItems, function(item, index) {
	                            if (!item) return
	                            if (index === 0) $(item).parent().prepend(item)
	                            else sortableItems[index - 1].after(item)
	                        })

	                        _handler(Constant, $table, $relatedElement)
	                        if (callback) callback(undefined, fields)

	                        return this
	                    }
	                    return _get(Constant, $relatedElement)
	                }
	            }
	        }

	        priority.NAMESPACE = NAMESPACE

	        function _render(Constant, $table) {
	            var data = _data(Constant, $table)
	            var html = _.template(template)(data)
	            var $relatedElement = $(html).insertAfter($table)

	            return $relatedElement
	        }

	        function _offset($trigger, $relatedElement, placement, align) {
	            var offset = position($trigger, $relatedElement, placement, align)
	            var relatedMarginLeft = parseInt($relatedElement.css('margin-left'), 10) || 0
	            var relatedMarginTop = parseInt($relatedElement.css('margin-top'), 10) || 0
	            return {
	                left: offset.left + relatedMarginLeft,
	                top: offset.top + relatedMarginTop
	            }
	        }

	        // 同步标记 data-column-priority-state，并隐藏或显示
	        function _handler(Constant, $table, $relatedElement) {
	            var candidates = $relatedElement.find('.candidates input:checkbox')
	            _.each(candidates, function(item /*, index*/ ) {
	                var $item = $(item)
	                var id = $item.data(Constant.COLUMN.ID)
	                if (id === undefined) return

	                var checked = $item.prop('checked')
	                var method = checked ? 'show' : 'hide'
	                var $th = $table.find('> thead th[data-' + Constant.COLUMN.ID + '="' + id + '"]')
	                    .attr('data-' + Constant.COLUMN.PRIORITY.STATE, method)[method]()
	                $table.find('> tbody td:nth-child(' + ($th.index() + 1) + ')')
	                    .attr('data-' + Constant.COLUMN.PRIORITY.STATE, method)[method]()
	            })

	            return _get(Constant, $relatedElement)
	        }

	        function _get(Constant, $relatedElement) {
	            var fields = []
	            var candidates = $relatedElement.find('.queue .sortable-wrapper .item')
	            _.each(candidates, function(item /*, index*/ ) {
	                var $item = $(item)
	                if ($item.css('display') === 'none') return
	                fields.push(
	                    $item.data(Constant.COLUMN.FIELD) || $item.data(Constant.COLUMN.NAME)
	                )
	            })
	            return fields
	        }

	        function _toggle($trigger, $relatedElement, placement, align) {
	            $trigger.on('click' + NAMESPACE, function( /*event*/ ) {
	                if ($relatedElement.is(':visible')) {
	                    $relatedElement.hide()
	                    $(document.body).removeClass('modal-open')
	                    return
	                }

	                $relatedElement.show().offset(
	                    _offset($trigger, $relatedElement, placement, align)
	                )

	                // $(document.body).addClass('modal-open')
	            })
	        }

	        function _delegate(Constant, $table, $trigger, $relatedElement, callback) {
	            var $manager = new EventManager('bx-')
	            var owner = {
	                submit: function(event) {
	                    var fields = _handler(Constant, $table, $relatedElement)
	                    if (callback) callback(event, fields, event.currentTarget)
	                    $relatedElement.hide()
	                },
	                cancel: function( /*event*/ ) {
	                    $relatedElement.hide()
	                },
	                all: function( /*event*/ ) {
	                    $relatedElement.find('.candidates input:checkbox').prop('checked', true)
	                    $relatedElement.find('.queue .sortable-wrapper .item').show()
	                },
	                clear: function( /*event*/ ) {
	                    $relatedElement.find('.candidates input:checkbox').prop('checked', false)
	                    $relatedElement.find('.queue .sortable-wrapper .item').hide()
	                }
	            }
	            $manager.delegate($relatedElement, owner)

	            return $manager
	        }

	        /* jshint unused:vars */
	        function _autoHide(tableComponentInstance, $trigger, $relatedElement) {
	            var type = 'click' + NAMESPACE + '_' + tableComponentInstance.clientId
	            $(document.body).off(type)
	                .on(type, function(event) {
	                    if (!$trigger[0] ||
	                        event.target === $trigger[0] ||
	                        $.contains($trigger[0], event.target) ||
	                        event.target === $relatedElement[0] ||
	                        $.contains($relatedElement[0], event.target)
	                    ) return
	                    $(document.body).removeClass('modal-open')
	                    $relatedElement.hide()
	                })
	        }

	        function _data(Constant, $table) {
	            var ths = $table.find('> thead th')
	            var found = false
	            var leftImmovables = []
	            var rightImmovables = []
	            var candidates = _.map(ths, function(item, index) {
	                var $item = $(item)
	                var name = $item.data(Constant.COLUMN.NAME)

	                if (!name) {
	                    name = $.trim($item.text())
	                    $item.attr('data-' + Constant.COLUMN.NAME, name)
	                }
	                if (!name) return

	                if ($item.data(Constant.COLUMN.ID) === undefined) {
	                    (found ? rightImmovables : leftImmovables).push({
	                        index: index,
	                        name: name
	                    })
	                    return
	                }

	                found = true

	                return {
	                    index: index,
	                    id: $item.data(Constant.COLUMN.ID),
	                    name: name,
	                    field: $item.data(Constant.COLUMN.FIELD) || name
	                }
	            })
	            candidates = _.filter(candidates, function(item /*, index*/ ) {
	                return !!item
	            })

	            return {
	                Constant: Constant,
	                candidates: candidates,
	                leftImmovables: leftImmovables,
	                rightImmovables: rightImmovables
	            }
	        }

	        return priority
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2)
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"dialog column-priority\">\n" +
	        "    <div class=\"dialog-content\">\n" +
	        "        <div class=\"dialog-header row\">\n" +
	        "            <div class=\"col-xs-8\">\n" +
	        "                <h4>\n" +
	        "                    <span>请选择列</span>\n" +
	        "                    <small>\n" +
	        "                        <a href=\"javascript: void(0);\" bx-click=\"all\">全选</a>\n" +
	        "                        <a href=\"javascript: void(0);\" bx-click=\"clear\">清空</a>\n" +
	        "                    </small>\n" +
	        "                </h4>\n" +
	        "            </div>\n" +
	        "            <div class=\"col-xs-4\">\n" +
	        "                <h4>自定义列顺序</h4>\n" +
	        "            </div>\n" +
	        "        </div>\n" +
	        "        <div class=\"dialog-body row\">\n" +
	        "            <div class=\"col-xs-8 candidates\">\n" +
	        "                <% for ( var i = 0; i < candidates.length; i++ ) { %>\n" +
	        "                <label class=\"item\">\n" +
	        "                    <input type=\"checkbox\" \n" +
	        "                        data-<%= Constant.COLUMN.ID %>=\"<%= candidates[i].id %>\" \n" +
	        "                        data-<%= Constant.COLUMN.NAME %>=\"<%= candidates[i].name %>\" \n" +
	        "                        data-<%= Constant.COLUMN.FIELD %>=\"<%= candidates[i].field %>\" \n" +
	        "                        data-<%= Constant.COLUMN.PRIORITY.INDEX %>=\"<%= candidates[i].index %>\" \n" +
	        "                        checked>\n" +
	        "                    <span title=\"<%= candidates[i].name %>\"><%= candidates[i].name %></span>\n" +
	        "                </label>\n" +
	        "                <% } %>\n" +
	        "            </div>\n" +
	        "            <div class=\"col-xs-4 queue\">\n" +
	        "                <!-- immovables -->\n" +
	        "                <div>\n" +
	        "                    <% for( var i = 0; i < leftImmovables.length; i++ ) { %>\n" +
	        "                    <div class=\"item item-not-allowed\">\n" +
	        "                        <span><%= leftImmovables[i].name %></span>\n" +
	        "                    </div>\n" +
	        "                    <% } %>\n" +
	        "                </div>\n" +
	        "                <div class=\"sortable-wrapper\">\n" +
	        "                    <% for ( var i = 0; i < candidates.length; i++ ) { %>\n" +
	        "                    <div class=\"item item-move\" \n" +
	        "                        data-<%= Constant.COLUMN.ID %>=\"<%= candidates[i].id %>\" \n" +
	        "                        data-<%= Constant.COLUMN.NAME %>=\"<%= candidates[i].name %>\" \n" +
	        "                        data-<%= Constant.COLUMN.FIELD %>=\"<%= candidates[i].field %>\" \n" +
	        "                        data-<%= Constant.COLUMN.PRIORITY.INDEX %>=\"<%= candidates[i].index %>\">\n" +
	        "                        <span class=\"item-name\" title=\"<%= candidates[i].name %>\"><%= candidates[i].name %></span>\n" +
	        "                    </div>\n" +
	        "                    <% } %>\n" +
	        "                </div>\n" +
	        "                <div>\n" +
	        "                    <% for( var i = 0; i < rightImmovables.length; i++ ) { %>\n" +
	        "                    <div class=\"item item-not-allowed\">\n" +
	        "                        <span><%= rightImmovables[i].name %></span>\n" +
	        "                    </div>\n" +
	        "                    <% } %>\n" +
	        "                </div>\n" +
	        "            </div>\n" +
	        "        </div>\n" +
	        "        <div class=\"dialog-footer\">\n" +
	        "            <button type=\"button\" bx-click=\"submit\" class=\"btn btn-default btn-sm\">确定</button>\n" +
	        "            <a bx-click=\"cancel\" href=\"javascript: void(0);\">取消</a>\n" +
	        "        </div>\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;