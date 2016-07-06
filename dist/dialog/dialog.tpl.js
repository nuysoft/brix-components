define("components/dialog.tpl", [], function() { return /******/ (function(modules) { // webpackBootstrap
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

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"dialog dialog-singleton dialog-<%= placement %>\">\n" +
	        "    <button bx-click=\"close\" type=\"button\" class=\"dialog-close <%= closable ? '' : 'hide' %>\"><span class=\"brixfont\">&#xe62d;</span><!-- &times; --></button>\n" +
	        "    <div class=\"dialog-content\">\n" +
	        "        <%= content %>\n" +
	        "        <!-- \n" +
	        "        <div class=\"dialog-header\">\n" +
	        "            <h4 class=\"dialog-title\">Title</h4>\n" +
	        "        </div>\n" +
	        "        <div class=\"dialog-body\">Body</div>\n" +
	        "        <div class=\"dialog-footer\">\n" +
	        "            <button bx-click=\"close\" type=\"button\" class=\"btn btn-default\">Close</button>\n" +
	        "            <button bx-click=\"close\" type=\"button\" class=\"btn btn-primary\">Save</button>\n" +
	        "        </div>\n" +
	        "         -->\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])});;