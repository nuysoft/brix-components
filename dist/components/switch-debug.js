(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("components/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "components/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/switch"] = factory(require("jquery"), require("underscore"), require("components/base"), require("brix/event"));
	else
		root["components/switch"] = factory(root["jquery"], root["underscore"], root["components/base"], root["brix/event"]);
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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	    http://thx.github.io/brix-site/readme.html?name=Switch
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/switch/
	        Temporary

	    # Switch

	    滑动开关。

	    ```html
	    <input type="checkbox" bx-name="components/switch">
	    ```

	    ## 配置

	    配置项   | 类型    | 默认值  | 说明
	    :------- | :------ | :------ | :----------
	    checked  | boolean | false   | 可选。是否选中。
	    disabled | boolean | false   | 可选。是否禁用。
	    size     | string  | ''      | 可选。设置滑动开关的尺寸，可选值有：`''`、`'small'`、`'large'`。

	    ## 方法

	    * .toggle()
	        切换选中&不选状态。
	    * .checked( [ checked ] )
	        设置或获取选中状态。
	    * .disabled( [ disabled ] ) 
	        设置或获取禁用状态。
	    * .val( [ value ] ) 
	        设置或获取组件节点的值。

	    ## 事件

	    事件类型      | 说明
	    :------------ | :----------
	    change.switch | 当值发生变化时被触发。

	    ## 参考
	    * 样式赞 http://abpetkov.github.io/switchery/
	    * 文档赞 http://www.bootstrap-switch.org/examples.html
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5),
	        __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Brix, EventManager,
	        template
	    ) {
	        var NAMESPACE = '.switch'
	        var compiledTemplate = _.template(template)
	        var CLASS_CHECKED = 'switch-checked'
	        var CLASS_DISABLED = 'switch-disabled'

	        function Switch() {}

	        _.extend(Switch.prototype, Brix.prototype, {
	            options: {
	                checked: false,
	                disabled: false,
	                size: '' // TODO large small 
	            },
	            init: function() {
	                this.$element = $(this.element).hide()
	                this.$manager = new EventManager('bx-')

	                this.options.checked = this.$element.prop('checked')
	                this.options.disabled = this.$element.prop('disabled')
	            },
	            render: function() {
	                var that = this

	                this.$relatedElement = $(
	                    compiledTemplate(this.options)
	                ).insertBefore(this.$element)

	                this.$element.on('change', function() {
	                    that.checked(that.$element.prop('checked'))
	                })

	                this.$manager.delegate(this.$element, this)
	                this.$manager.delegate(this.$relatedElement, this)
	            },
	            toggle: function(event) {
	                // 非用户触发 || 非禁用状态
	                if (!event || !this.options.disabled) this.checked(!this.options.checked)
	                if (event) event.preventDefault()
	                return this
	            },
	            checked: function(value) {
	                if (value !== undefined) {
	                    if (this.options.checked === value) return
	                    this.options.checked = value
	                    this.$relatedElement[
	                        value ? 'addClass' : 'removeClass'
	                    ](CLASS_CHECKED)
	                    this.$element.prop('checked', value)

	                    this.trigger('change' + NAMESPACE, {
	                        name: this.$element.attr('name'),
	                        value: this.$element.val(),
	                        checked: this.options.checked,
	                        disabled: this.options.disabled
	                    })

	                    this.$element.triggerHandler('change')

	                    return this
	                }
	                return this.options.checked
	            },
	            disabled: function(value) {
	                if (value !== undefined) {
	                    this.options.disabled = value
	                    this.$relatedElement[
	                        value ? 'addClass' : 'removeClass'
	                    ](CLASS_DISABLED)
	                    this.$element.prop('disabled', value)

	                    return this
	                }
	                return this.options.disabled
	            },
	            val: function(value) {
	                if (value !== undefined) {
	                    this.$element.val(value)
	                    return this
	                }
	                return this.$element.val()
	            }
	        })

	        return Switch
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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<span class=\"switch \n" +
	        "	<%= checked ? 'switch-checked' : '' %> \n" +
	        "	<%= disabled ? 'switch-disabled' : '' %>\n" +
	        "	<%= size ? 'switch-' + size : '' %>\n" +
	        "	\" bx-click=\"toggle\">\n" +
	        "	<small></small>\n" +
	        "</span>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;