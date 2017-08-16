(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["components/table/sticky"] = factory(require("jquery"), require("underscore"));
	else
		root["components/table/sticky"] = factory(root["jquery"], root["underscore"]);
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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _
	    ) {

	        function sticky(table /*, hooks TODO */ ) {
	            var $table = $(table)
	            var $wrapper = $table.parent()

	            // 
	            var stickyId = $table.attr('data-sticky-id') || _.uniqueId('sticky_')
	            $('[data-table-id="' + stickyId + '"]', $wrapper).remove()
	            $table.attr('data-sticky-id', stickyId)

	            // 
	            var $stickyWrapper = $('<div>')
	                .attr('data-table-id', stickyId)
	                .insertBefore($table)
	            $wrapper.off('scroll.sticky.' + stickyId).on('scroll.sticky.' + stickyId,
	                _.throttle(function(event) {
	                    $stickyWrapper.scrollLeft(event.target.scrollLeft)
	                }, 4)
	            )

	            // 
	            var $stickyTable = $('<table><thead></thead></table>')
	                .addClass($table.attr('class'))
	                .appendTo($stickyWrapper)
	            $stickyTable.find('> thead').html(
	                $table.find('> thead').html()
	            )

	            // 完美克隆
	            function fixStyle(event) {
	                fixStickyWrapperStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper)
	                fixStickyTableStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper)
	            }

	            fixStyle()
	            $stickyWrapper.hide()

	            // 
	            toggleStickyWrapper(undefined, $table, $wrapper, $stickyTable, $stickyWrapper)
	            $(document).off('scroll.sticky.' + stickyId).on('scroll.sticky.' + stickyId,
	                _.throttle(function(event) {
	                    toggleStickyWrapper(event, $table, $wrapper, $stickyTable, $stickyWrapper)
	                    if ($stickyWrapper.is(':visible')) fixStyle(event)
	                }, 100)
	            )

	            // 
	            $(document).off('resize.sticky.' + stickyId)
	                .on('resize.sticky.' + stickyId,
	                    _.throttle(function(event) {
	                        fixStyle(event)
	                    }, 1000)
	                )
	        }

	        function fixStickyWrapperStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper) { /* jshint unused:false */
	            $stickyWrapper.width($table.outerWidth())
	            $stickyWrapper.css({
	                position: 'fixed',
	                left: $table.offset().left,
	                top: 0,
	                'z-index': 1,
	                overflow: 'hidden'
	            })
	        }

	        function fixStickyTableStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper) { /* jshint unused:false */
	            if (event && event.type === 'scroll') return

	            $stickyTable.width($table.outerWidth())
	            var $ths = $table.find('> thead > th')
	            var $stickyThs = $stickyTable.find('> thead > th')
	            _.each($ths, function($th, index) {
	                $th = $($th)
	                $($stickyThs[index]).css({
	                    width: $th.outerWidth(),
	                    height: $th.outerHeight(),
	                    display: $th.css('display'),
	                    'text-align': $th.css('text-align')
	                })
	            })
	        }

	        function toggleStickyWrapper(event, $table, $wrapper, $stickyTable, $stickyWrapper) { /* jshint unused:false */
	            var scrollY = window.scrollY
	            var tableHeight = $table.outerHeight()
	            var tableTop = $table.offset().top
	            var stickyWrapperHeight = $stickyWrapper.outerHeight()

	            if (scrollY <= tableTop) {
	                $stickyWrapper.hide()
	                return
	            }
	            // tableTop < scrollY && scrollY <= tableTop + tableHeight
	            if (tableTop < scrollY && scrollY <= tableTop + tableHeight - stickyWrapperHeight) {
	                $stickyWrapper.show()
	                return
	            }
	            if (tableTop < scrollY && scrollY > tableTop + tableHeight - stickyWrapperHeight) {
	                $stickyWrapper.hide()
	                return
	            }
	            if (scrollY > tableTop + tableHeight) {
	                $stickyWrapper.hide()
	                return
	            }
	        }

	        return function(container) {
	            var $container = $(container)
	            var $tables
	            if ($container.is('table')) $tables = $container
	            else $tables = $(' table[data-sticky="true"]', $container)
	            _.each($tables, function(table) {
	                sticky(table)
	            })
	        }
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ])
});
;