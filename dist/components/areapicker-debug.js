(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/base"), require("components/dialog"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/base", "components/dialog"], factory);
	else if(typeof exports === 'object')
		exports["components/areapicker"] = factory(require("jquery"), require("underscore"), require("brix/base"), require("components/dialog"));
	else
		root["components/areapicker"] = factory(root["jquery"], root["underscore"], root["brix/base"], root["components/dialog"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5),
	        __webpack_require__(6),
	        __webpack_require__(7),
	        __webpack_require__(8)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix, linkage,
	        Area,
	        template
	    ) {

	        function AreaPicker() {}

	        _.extend(AreaPicker.prototype, Brix.prototype, {
	            options: {
	                type: 'TIER', // REGION TIER
	                data: undefined
	            },
	            init: function() {
	                // 尝试从 innerText 中解析数据
	                /* jshint evil:true */
	                if (!this.options.data) {
	                    var text = $.trim(this.element.innerText)
	                    this.options.data = eval(
	                        '(function(){ return Array.prototype.slice.call(arguments)[0] })(' + text + ')'
	                    )
	                    this.element.innerText = ''
	                }

	                this.options.data = {
	                    id: 'root',
	                    name: '全部选择',
	                    children: Area.tree(this.options.data || Area.REGION)
	                }
	            },
	            render: function() {
	                var that = this
	                this.$element = $(this.element)

	                var html = _.template(template)(this.options.data)
	                this.$element.append(html)

	                /* jshint unused:false */
	                linkage(this.$element, function(event, values, target) {
	                    that.trigger('toggle.areapicker', [values, target])
	                })
	            }
	        })

	        return AreaPicker
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	file:///Users/mo/Downloads/cities.txt
	钻展 http://zuanshi.taobao.com/code/all.json?csrfID=142175445941304037227370851158592
	淘宝 http://www.taobao.com/home/js/sys/districtselector.js?t=20140318.js
	DMP http://dmp.taobao.com/api/tag/4?csrfId=61a1eec37e1398aaf3c6d8&t=1421758479250
	国标 省（市）级行政区划码表

	华北   北京市 天津市 河北省 山西省 内蒙古自治区
	东北   辽宁省 吉林省 黑龙江省
	华东   上海市 江苏省 浙江省 安徽省 福建省 江西省 山东省
	华南   广东省 广西壮族自治区 海南省
	华中   河南省 湖北省 湖南省
	西南   重庆市 四川省 贵州省 云南省 西藏自治区
	西北   陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区
	港澳台 香港特别行政区 澳门特别行政区 台湾省

	如果后台输出树状结构，隐藏的问题会比较多，比如节点的数据结构不一致（遇到过）、存储子节点的属性要依赖后端、增加层级时后端也需要修改（遇到过）、前端阅读不方便（数据大时 Chrome Dev Tool 里不容易查找）
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(_) {

	    var TIER = [
	        { id: '一线', name: '一线' },
	        { id: '二线', name: '二线' },
	        { id: '三线', name: '三线' },

	        { id: 110000, pid: '一线', name: '北京市' },
	        { id: 120000, pid: '一线', name: '天津市' },

	        { id: 130000, pid: '二线', name: '河北省' },
	        { id: 140000, pid: '二线', name: '山西省' },

	        { id: 150000, pid: '三线', name: '内蒙古自治区' },
	        { id: 210000, pid: '三线', name: '辽宁省' },
	    ]

	    var REGION = [
	        { id: '华北', name: '华北' },
	        { id: '东北', name: '东北' },
	        { id: '华东', name: '华东' },
	        { id: '华南', name: '华南' },
	        { id: '华中', name: '华中' },
	        { id: '西南', name: '西南' },
	        { id: '西北', name: '西北' },
	        { id: '港澳台', name: '港澳台' },

	        { id: 110000, pid: '华北', name: '北京市' },
	        { id: 120000, pid: '华北', name: '天津市' },
	        { id: 130000, pid: '华北', name: '河北省' },
	        { id: 140000, pid: '华北', name: '山西省' },
	        { id: 150000, pid: '华北', name: '内蒙古自治区' },

	        { id: 210000, pid: '东北', name: '辽宁省' },
	        { id: 220000, pid: '东北', name: '吉林省' },
	        { id: 230000, pid: '东北', name: '黑龙江省' },

	        { id: 310000, pid: '华东', name: '上海市' },
	        { id: 320000, pid: '华东', name: '江苏省' },
	        { id: 330000, pid: '华东', name: '浙江省' },
	        { id: 340000, pid: '华东', name: '安徽省' },
	        { id: 350000, pid: '华东', name: '福建省' },
	        { id: 360000, pid: '华东', name: '江西省' },
	        { id: 370000, pid: '华东', name: '山东省' },

	        { id: 410000, pid: '华中', name: '河南省' },
	        { id: 420000, pid: '华中', name: '湖北省' },
	        { id: 430000, pid: '华中', name: '湖南省' },

	        { id: 440000, pid: '华南', name: '广东省' },
	        { id: 450000, pid: '华南', name: '广西壮族自治区' },
	        { id: 460000, pid: '华南', name: '海南省' },

	        { id: 500000, pid: '西南', name: '重庆市' },
	        { id: 510000, pid: '西南', name: '四川省' },
	        { id: 520000, pid: '西南', name: '贵州省' },
	        { id: 530000, pid: '西南', name: '云南省' },
	        { id: 540000, pid: '西南', name: '西藏自治区' },

	        { id: 610000, pid: '西北', name: '陕西省' },
	        { id: 620000, pid: '西北', name: '甘肃省' },
	        { id: 630000, pid: '西北', name: '青海省' },
	        { id: 640000, pid: '西北', name: '宁夏回族自治区' },
	        { id: 650000, pid: '西北', name: '新疆维吾尔自治区' },

	        { id: 710000, pid: '港澳台', name: '台湾省' },
	        { id: 810000, pid: '港澳台', name: '香港特别行政区' },
	        { id: 820000, pid: '港澳台', name: '澳门特别行政区'}
	    ]

	    var IPDATA = {}

	    function tree(list) {
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

	    return {
	        REGION: REGION,
	        TIER: TIER,
	        IPDATA: IPDATA,
	        tree: tree
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"areapicker\">\n" +
	        "    <div class=\"areapicker-header dialog-header\">\n" +
	        "        <h4 class=\"areapicker-header-title dialog-title\">选择地域</h4>\n" +
	        "    </div>\n" +
	        "    <div class=\"areapicker-body\">\n" +
	        "        <table class=\"table table-bordered\">\n" +
	        "            <thead>\n" +
	        "                <tr>\n" +
	        "                    <th>区域</th>\n" +
	        "                    <th>\n" +
	        "                        <span style=\"padding: 17px 0; display: inline-block;\">省份/城市</span>\n" +
	        "                        <label class=\"areapicker-header-toggle\" style=\"vertical-align: bottom; margin-left: 10px;\">\n" +
	        "                            <input type=\"checkbox\" data-linkage-name=\"<%= id %>\">\n" +
	        "                            <%= name %>\n" +
	        "                        </label>\n" +
	        "                    </th>\n" +
	        "                </tr>\n" +
	        "            </thead>\n" +
	        "            <tbody>\n" +
	        "                <% for ( var i = 0; i < children.length; i++ ) { %>\n" +
	        "                <tr>\n" +
	        "                    <td width=\"100\">\n" +
	        "                        <label>\n" +
	        "                            <input type=\"checkbox\" \n" +
	        "                                value=\"<%= children[i].id %>\"\n" +
	        "                                data-linkage-name=\"<%= children[i].id %>\"\n" +
	        "                                data-linkage-parent-name=\"<%= id %>\">\n" +
	        "                            <%= children[i].name %>\n" +
	        "                        </label>\n" +
	        "                    </td>\n" +
	        "                    <td>\n" +
	        "                        <% for ( var ii = 0; ii < children[i].children.length; ii++ ) { %>\n" +
	        "                        <label>\n" +
	        "                            <input type=\"checkbox\" \n" +
	        "                                value=\"<%= children[i].children[ii].id %>\"\n" +
	        "                                data-linkage-name=\"<%= children[i].children[ii].id %>\" \n" +
	        "                                data-linkage-parent-name=\"<%= children[i].id %>\">\n" +
	        "                            <%= children[i].children[ii].name %>\n" +
	        "                        </label>\n" +
	        "                        <% } %>\n" +
	        "                    </td>\n" +
	        "                </tr>\n" +
	        "                <% } %>\n" +
	        "            </tbody>\n" +
	        "        </table>\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});
;