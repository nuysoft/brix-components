(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("brix/loader"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "brix/loader", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/nav"] = factory(require("jquery"), require("underscore"), require("brix/loader"), require("brix/base"));
	else
		root["components/nav"] = factory(root["jquery"], root["underscore"], root["brix/loader"], root["brix/base"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3),
	        __webpack_require__(4), __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _,
	        Loader, Brix
	    ) {
	        /*
	            导航栏。        
	    
	            ### 数据
	                {}
	            ### 选项
	                TODO
	            ### 属性
	                TODO
	            ### 方法
	                TODO
	            ### 事件
	                TODO
	            ===

	            ### 公共选项
	                data template css
	            ### 公共属性
	                element relatedElement 
	                moduleId clientId parentClientId childClientIds 
	                data template css
	            ### 公共方法
	                .render()
	            ### 公共事件
	                ready destroyed

	        */
	        return Brix.extend({
	            options: {
	                'selector': ''
	            },
	            render: function() {
	                var that = this
	                var $element = $(this.element)
	                Loader.boot(function() {
	                    var h1s = $(that.options.selector)
	                    var anchors = $()
	                    init($element, h1s, anchors)
	                    $(window).on('scroll',
	                        // http://underscorejs.org/#throttle
	                        _.throttle(function( /*event*/ ) {
	                            scroller(h1s, anchors)
	                        }, 10)
	                    )
	                })
	            }
	        })

	        function init($element, h1s, anchors) {
	            _.each(h1s, function(h1, index) {
	                var name = $(h1).text()
	                $(''.anchor(name)).insertBefore(h1)
	                var className = (!window.location.hash && index === 0 ||
	                    window.location.hash.slice(1) === name) ? 'active' : ''
	                var anchor = $(name.link('#' + name))
	                anchor
	                    .addClass('list-group-item')
	                    .addClass(className)
	                    .appendTo($element)
	                    .on('click', function() {
	                        $(this).addClass('active')
	                            .siblings().removeClass('active')
	                    })
	                anchors.push(anchor[0])
	            })
	        }

	        function scroller(h1s, anchors) {
	            var $window = $(window)
	            var base = $window.scrollTop() + $window.height() / 2
	            var minDistance, minIndex
	            _.each(h1s, function(h1, index) {
	                h1 = $(h1)
	                var start = h1.offset().top
	                var end = start + h1.outerHeight()
	                var distance
	                if (start <= base && end >= base) distance = 0
	                else {
	                    if (start > base) distance = start - base
	                    if (end < base) distance = base - end
	                }
	                if (index === 0 || distance < minDistance) {
	                    minDistance = distance
	                    minIndex = index
	                }
	            })
	            anchors.eq(minIndex)
	                .addClass('active')
	                .siblings().removeClass('active')
	        }

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

/***/ }
/******/ ])
});
;