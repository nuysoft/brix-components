(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/loader"), require("components/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/loader", "components/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/pagination"] = factory(require("jquery"), require("underscore"), require("brix/loader"), require("components/base"), require("brix/event"));
	else
		root["components/pagination"] = factory(root["jquery"], root["underscore"], root["brix/loader"], root["components/base"], root["brix/event"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	    分页组件。

	    TODO
	        去掉边框。
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5), __webpack_require__(6),
	        __webpack_require__(7),
	        __webpack_require__(8)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Loader, Brix, EventManager,
	        PurePagination,
	        template
	    ) {
	        /*
	            ### 数据
	                无
	            ### 选项
	                公共选项：data template
	                statistics
	                simplify
	                step
	                total
	                cursor
	                limit
	                
	            ### 属性
	                公共属性：element moduleId clientId parentClientId childClientIds data template
	                status      修改或计算分页状态。
	                dropdown    分页大小组件。

	            ### 方法

	            ### 事件
	                公共事件：ready destroyed
	                
	        */

	        var PAGINATION_LIMITS = [10, 20, 30, 40, 50]

	        function Pagination() {}

	        _.extend(Pagination.prototype, Brix.prototype, {
	            options: {
	                statistics: true,
	                simplify: false,
	                step: 7,
	                total: 0,
	                cursor: 1,
	                limit: 10,
	                limits: undefined
	            },
	            init: function() {
	                this.options.limits = this.options.limits && this.options.limits.length ?
	                    _.unique(this.options.limits) :
	                    [].concat(PAGINATION_LIMITS)

	                this._state = new PurePagination(
	                    this.options.total,
	                    this.options.cursor,
	                    this.options.limit
	                )
	            },
	            render: function() {
	                var that = this
	                this.$manager = new EventManager('bx-')
	                this.$element = $(this.element)

	                this.data = this._fixData()
	                var html = _.template(template)(this.data)
	                $(this.element).empty().append(html)

	                this.$manager.delegate(this.element, this)

	                // 重新 render 之后的 ready 事件？再次触发？
	                Loader.boot(this.element, function() { // 这里的目的并非执行 Loader.boot()，而是等待其他 Loader.boot() 完成
	                    that.dropdown = Loader.query('components/dropdown', that.element)[0]

	                    if (!that.dropdown) return

	                    /* jshint unused:false */
	                    that.dropdown.on('change.dropdown', function(event, data) {
	                        event.stopPropagation()
	                        that._state.setCursor(1)
	                        that._state.setLimit(data.value)
	                        that.trigger('change.pagination', that._state)
	                        that._update()
	                    })
	                })
	            },
	            _update: function() {
	                this.data = this._fixData()
	                var html = _.template(template)(this.data)
	                var $newPagination = $(html)

	                this.$element.find('ul.pagination')
	                    .replaceWith($newPagination.find('ul.pagination'))
	                this.$element.find('span.start-end-total')
	                    .replaceWith($newPagination.find('span.start-end-total'))

	                // $(this.element).empty().append(html)
	            },
	            moveTo: function(event, extra) { // extraParameters
	                // moveTo( cursor )
	                if (arguments.length === 1) extra = event
	                this._state.moveTo(extra)
	                this.trigger('change.pagination', this._state)
	                this._update()
	            },
	            total: function(total) {
	                if (total === undefined || total === null) return this._state.total
	                if (this._state.total !== total) {
	                    this._state.setTotal(total)
	                    this._update()
	                }
	                return this
	            },
	            cursor: function(cursor) {
	                if (cursor === undefined || cursor === null) return this._state.cursor
	                if (this._state.cursor !== cursor) {
	                    this._state.setCursor(cursor)
	                    this._update()
	                }
	                return this
	            },
	            limit: function(limit) {
	                if (limit === undefined || limit === null) return this._state.limit
	                if (this._state.limit !== limit) {
	                    this._state.setLimit(limit)
	                    this._update()

	                    // PS: The dropdown can only be amended by manual!
	                }
	                return this
	            },
	            _fixData: function() {
	                var barStart = Math.min(
	                    this._state.pages,
	                    Math.max(
	                        1,
	                        this._state.cursor - parseInt(this.options.step / 2, 10)
	                    )
	                )
	                var limit = +this.options.limit
	                var limits = [].concat(this.options.limits).sort(function(a, b) {
	                    return a - b
	                })
	                if (!_.contains(limits, limit)) {
	                    switch (true) {
	                        case limit < limits[0]:
	                            limits.unshift(limit)
	                            break
	                        case limit > limits[limits.length - 1]:
	                            limits.push(limit)
	                            break
	                        default:
	                            for (var i = 0; i < limits.length; i++) {
	                                if (limit < limits[i]) {
	                                    limits.splice(i, 0, limit)
	                                    break
	                                }
	                            }
	                    }
	                }
	                return _.extend({
	                    barStart: barStart,
	                    barEnd: Math.min(this._state.pages, barStart + this.options.step - 1),
	                    limits: limits,
	                    simplify: this.options.simplify
	                }, this._state)
	            },
	            destroy: function() {
	                this.$manager.undelegate(this.$element, this)
	            }
	        })

	        return Pagination
	            // return Brix.extend()
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

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

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"row paginationwrapper\">\n" +
	        "    <% if(simplify) { %>\n" +
	        "        <div class=\"col-md-12\" style=\"text-align: right;\">\n" +
	        "            <ul class=\"pagination\" style=\"text-align: right;\">\n" +
	        "                <li class=\"<%= hasPrev ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=prev%>)\"><span class=\"brixfont\">&#xe601;</span></a></li><!-- Previous -->\n" +
	        "\n" +
	        "                <li class=\"pagination-statistics-simplify\"><span><%= cursor %>/<%= pages %></span></li>\n" +
	        "                \n" +
	        "                <li class=\"<%= hasNext ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=next%>)\"><span class=\"brixfont\">&#xe600;</span></a></li><!-- Next -->\n" +
	        "            </ul>\n" +
	        "        </div>\n" +
	        "    <% } else { %>\n" +
	        "\n" +
	        "    <div class=\"pagination-statistics col-md-6\">\n" +
	        "        <span class=\"start-end-total\">当前第 <b><%= start + 1 %> - <%= end %></b> 条，共 <b><%= total %></b> 条</span><span>，每页展现</span>\n" +
	        "        <select bx-name=\"components/dropdown\">\n" +
	        "            <% for( var i = 0; i < limits.length; i++ ) { %>\n" +
	        "            <option value=\"<%= limits[i] %>\" <%= limits[i] == limit ? 'selected' : '' %>><%=limits[i]%></option>\n" +
	        "            <% } %>\n" +
	        "        </select>\n" +
	        "        <span>条</span>\n" +
	        "    </div>\n" +
	        "    <div class=\"col-md-6\" style=\"text-align: right;\">\n" +
	        "        <ul class=\"pagination\">\n" +
	        "\n" +
	        "            <li class=\"<%= hasPrev ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=prev%>)\"><span class=\"brixfont\">&#xe601;</span></a></li><!-- Previous -->\n" +
	        "\n" +
	        "            <% if( barStart == 2 ) { %>\n" +
	        "                <li><a class=\"page\" href=\"javascript: void(0);\" bx-click=\"moveTo(1)\">1</a></li>\n" +
	        "            <% } %>\n" +
	        "\n" +
	        "            <% if( barStart >= 3 ) { %>\n" +
	        "                <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(1)\">1</a></li>\n" +
	        "                <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(2)\">2</a></li>\n" +
	        "                <% if( barStart > 3 ) { %>\n" +
	        "                    <li class=\"disabled\"><a href=\"javascript: void(0);\">...</a></li>\n" +
	        "                <% } %>\n" +
	        "            <% } %>\n" +
	        "\n" +
	        "            <% for( var i = barStart; i <= barEnd; i++ ) { %>\n" +
	        "                <% if( i === cursor ) { %>\n" +
	        "                    <li class=\"active\"><a href=\"javascript: void(0);\"><%= i %></a></li>\n" +
	        "                <% } else { %>\n" +
	        "                    <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=i%>)\"><%= i %></a></li>\n" +
	        "                <% } %>\n" +
	        "            <% } %>\n" +
	        "\n" +
	        "            <% if( barEnd < pages - 1) { %>\n" +
	        "                <li class=\"disabled\"><a href=\"javascript: void(0);\">...</a></li>\n" +
	        "            <% } %>\n" +
	        "\n" +
	        "            <% if( barEnd < pages) { %>\n" +
	        "                <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=pages%>)\"><%= pages %></a></li>\n" +
	        "            <% } %>\n" +
	        "\n" +
	        "            <li class=\"<%= hasNext ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=next%>)\"><span class=\"brixfont\">&#xe600;</span></a></li><!-- Next -->\n" +
	        "\n" +
	        "            <!-- <li>\n" +
	        "                <select bx-name=\"components/dropdown\">\n" +
	        "                    <% for( var i = 1; i <= pages; i++ ) { %>\n" +
	        "                        <option value=\"<%= i %>\" <%= i == cursor ? 'selected' : '' %>><%= i %></option>\n" +
	        "                    <% } %>\n" +
	        "                </select>\n" +
	        "            </li> -->\n" +
	        "        </ul>\n" +
	        "    </div>\n" +
	        "\n" +
	        "    <% } %>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;