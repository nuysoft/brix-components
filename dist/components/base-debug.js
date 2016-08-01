(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/loader"), require("brix/base"), require("brix/event"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/loader", "brix/base", "brix/event"], factory);
	else if(typeof exports === 'object')
		exports["components/base"] = factory(require("jquery"), require("underscore"), require("brix/loader"), require("brix/base"), require("brix/event"));
	else
		root["components/base"] = factory(root["jquery"], root["underscore"], root["brix/loader"], root["brix/base"], root["brix/event"]);
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Loader, Brix, EventManager
	    ) {
	        /*
	            ## ComponentBase

	            基于 Brix Base 的（组件）增强。
	        */
	        function ComponentBase() {}

	        _.extend(ComponentBase.prototype, Brix.prototype, {
	            query: function(moduleId) {
	                // TODO element, relatedElement, $relatedElement
	                return Loader.query(moduleId, this)
	            },
	            boot: function(callback, progress) {
	                // TODO √ element, ? relatedElement, ? $relatedElement
	                Loader.boot(this.element, callback, progress)
	                return this
	            },

	            _bak_trigger: Brix.prototype.trigger,
	            trigger: function(type, data) {
	                // 拦截 type namespace
	                var namespaces = type.namespace ? type.namespace.split('.') : []
	                var tmp = type.type || type
	                if (tmp.indexOf('.') >= 0) {
	                    namespaces = tmp.split('.')
	                    tmp = namespaces.shift()
	                }

	                // 正常触发
	                this._bak_trigger(type, data)

	                // 触发 brix/event 绑定的事件
	                var bxevent = $.Event(tmp + EventManager.NAMESPACE)
	                bxevent.originalNamespace = namespaces.join('.')
	                bxevent.component = this

	                // 同步事件状态 event => brix/event
	                if (type.type) {
	                    bxevent.isDefaultPrevented = type.isDefaultPrevented() ? type.isDefaultPrevented : bxevent.isDefaultPrevented
	                    bxevent.isPropagationStopped = type.isPropagationStopped() ? type.isPropagationStopped : bxevent.isPropagationStopped
	                    bxevent.isImmediatePropagationStopped = type.isImmediatePropagationStopped() ? type.isImmediatePropagationStopped : bxevent.isImmediatePropagationStopped
	                }

	                $(this.element).trigger(bxevent, data)

	                // 同步事件状态 brix/event => event
	                if (type.type) {
	                    type.isDefaultPrevented = bxevent.isDefaultPrevented() ? bxevent.isDefaultPrevented : type.isDefaultPrevented
	                    type.isPropagationStopped = bxevent.isPropagationStopped() ? bxevent.isPropagationStopped : type.isPropagationStopped
	                    type.isImmediatePropagationStopped = bxevent.isImmediatePropagationStopped() ? bxevent.isImmediatePropagationStopped : type.isImmediatePropagationStopped
	                }

	                return this
	            }

	            // , ajax: function() {
	            //     var jqXHR= $.ajax.apply($, arguments)
	            //     this.clientId
	            // }
	        })

	        ComponentBase.extend = Brix.extend

	        return ComponentBase
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

/***/ }
/******/ ])
});
;