(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("parsley"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "parsley", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/validation"] = factory(require("jquery"), require("underscore"), require("parsley"), require("brix/base"));
	else
		root["components/validation"] = factory(root["jquery"], root["underscore"], root["parsley"], root["brix/base"]);
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
	    http://parsleyjs.org/
	    Parsley, the ultimate JavaScript form validation library
	    Validating forms frontend have never been so powerful and easy.

	    http://thx.github.io/brix-site/readme.html?name=Validation
	        Deprecated
	    https://nuysoft.gitbooks.io/brix-book/content/brix-components/validation/
	        Temporary
	        
	    # Validation

	    表单验证组件。

	    ```html
	    <form bx-name="components/validation"></form>
	    <div bx-name="components/validation"></div>
	    ```

	    ## 配置

	    无。

	    ## 属性

	    属性名  | 类型    | 默认值 | 说明
	    :------ | :------ | :----- | :----------
	    parsley | Parsley | -      | <http://parsleyjs.org/>

	    ## 方法

	    *.validate()
	        http://parsleyjs.org/doc/index.html#usage-form
	    * .isValid()
	        http://parsleyjs.org/doc/index.html#usage-form

	    ## 事件

	    无。

	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(4),
	        __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, Parsley,
	        Brix
	    ) {

	        function Validation() {}

	        _.extend(Validation.prototype, Brix.prototype, {
	            options: {
	                i18n: 'zh_cn'
	            },
	            init: function() {
	                if (!Parsley) Parsley = window.Parsley
	                window.require(['dependencies/parsleyjs/src/i18n/' + this.options.i18n])
	            },
	            render: function() {
	                this.$element = $(this.element)

	                var namespace = this.$element.attr('data-parsley-namespace') || Parsley.options.namespace

	                // http://parsleyjs.org/doc/annotated-source/factory.html#section-6
	                // A ParsleyForm instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
	                // http://parsleyjs.org/doc/index.html#psly-usage-form
	                // data-parsley-namespace = data-parsley-
	                if (!this.$element.is('form')) {
	                    var gogogo = namespace + 'validate'
	                    if (this.$element.attr(gogogo) === undefined) this.$element.attr(gogogo, '')
	                }

	                this.parsley = $(this.element).parsley({
	                    namespace: namespace
	                })

	                // this.parsley = new Parsley(this.element)
	            },
	            validate: function(group, force) {
	                this.parsley.validate(group, force)
	                return this
	            },
	            isValid: function(group, force) {
	                return this.parsley.isValid(group, force)
	            },
	            reset: function() {
	                this.parsley.reset()
	                return this
	            },
	            destroy: function() {
	                this.parsley.destroy()
	                return this
	            }
	        })

	        return Validation
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

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

/***/ })
/******/ ])
});
;