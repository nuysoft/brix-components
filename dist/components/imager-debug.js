(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/imager"] = factory(require("jquery"), require("brix/base"));
	else
		root["components/imager"] = factory(root["jquery"], root["brix/base"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
	        __webpack_require__(2),
	        __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $,
	        Brix
	    ) {
	        /*
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
	                src: '',
	                left: 0,
	                top: 0,
	                width: '',
	                height: ''
	            },
	            init: function() {},
	            render: function() {
	                var that = this
	                var $wrapper = $(this.element).css({
	                    overflow: 'hidden'
	                }).addClass('imager')
	                var imgWidth, imgHeight
	                var $img = $('<img>')
	                    .attr('src', this.options.src)
	                    .on('load', function(event) {
	                        var maxWidth = $wrapper.width()
	                        var maxHeight = $wrapper.height()
	                        var img = event.target
	                        if (!imgWidth) {
	                            imgWidth = img.width
	                            imgHeight = img.height
	                            that.options.width = that.options.width || imgWidth
	                            that.options.height = that.options.height || imgHeight
	                        }
	                        var width, height, left, top, rate

	                        if (maxWidth >= imgWidth) return

	                        $wrapper.height(maxWidth / (imgWidth / imgHeight))
	                        // 小于核心区域
	                        if (maxWidth < that.options.width) {
	                            rate = maxWidth / that.options.width
	                            width = imgWidth * rate
	                            height = imgHeight * rate
	                            left = -that.options.left * rate
	                            top = -that.options.top * rate
	                        } else {
	                            // 大于核心区域
	                            if (maxWidth < imgWidth) {
	                                // 
	                                rate = imgWidth / imgHeight
	                                left = -that.options.left + (maxWidth - that.options.width) / 2
	                                maxHeight = maxWidth / rate
	                                top = -that.options.top + (maxHeight - that.options.height) / 2
	                            }
	                        }
	                        $(img).css({
	                            'margin-left': Math.min(0, left),
	                            'margin-top': Math.min(0, top),
	                            width: width,
	                            height: height
	                        })
	                    }).appendTo($wrapper)
	                $(window).on('resize', function() {
	                    $img.trigger('load')
	                })
	            }
	        })
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;