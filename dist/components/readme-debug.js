(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("marked"), require("highlightjs"), require("brix/loader"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "marked", "highlightjs", "brix/loader", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/readme"] = factory(require("jquery"), require("underscore"), require("marked"), require("highlightjs"), require("brix/loader"), require("brix/base"));
	else
		root["components/readme"] = factory(root["jquery"], root["underscore"], root["marked"], root["highlightjs"], root["brix/loader"], root["brix/base"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6),
	        __webpack_require__(7), __webpack_require__(8),
	        __webpack_require__(9)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, marked, renderer, hljs,
	        Loader, Brix,
	        template
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
	        function Readme() {}

	        _.extend(Readme.prototype, Brix.prototype, {
	            options: {
	                url: ''
	            },
	            render: function() {
	                var that = this
	                $(this.element).append(template)

	                var defer = $.Deferred()
	                this.loadDoc(function(response /*, status, xhr*/ ) {
	                    Loader.boot(that.element, function() {
	                        var spin = Loader.query('components/spin', that.element)
	                        Loader.destroy(spin, function() {
	                            $(that.element).find('div.readme').html(
	                                // _.template(
	                                marked(response, {
	                                    renderer: renderer,
	                                    gfm: true
	                                })
	                                // )()
	                            )
	                            that.trimHTML(that.element)
	                            that.trimPredefined(that.element)

	                            // 为 table 元素增加类样式 .table .table-bordered
	                            // 逐个检测和增加，以防其中某个 table 元素含有类样式 .table，导致其他 table 元素不会被添加。
	                            var tables = $(that.element).find('table')
	                            _.each(tables, function(item /*, index*/ ) {
	                                item = $(item)
	                                if (!item.hasClass('table')) item.addClass('table table-bordered')
	                            })

	                            /* jshint unused:false */
	                            $(that.element).find('pre code').each(function(index, code) {
	                                hljs.highlightBlock(code)
	                            })

	                            Loader.boot(that.element, function() {
	                                defer.resolve()
	                            })
	                        })
	                    })
	                })

	                // return defer.promise()
	            },
	            loadDoc: function(done) {
	                // 模拟延时加载
	                // var that = this
	                // var deferred = $.Deferred()
	                // setTimeout(function() {
	                //     $.ajax(that.options.url)
	                //         .done(function(response, status, xhr) {
	                //             done(response, status, xhr)
	                //             deferred.resolve()
	                //         })
	                // }, 3000)
	                // return deferred.promise()

	                return $.ajax(this.options.url)
	                    .done(function(response, status, xhr) {
	                        done(response, status, xhr)
	                    })
	            },
	            // 提取 HTML 代码
	            trimHTML: function(context) {
	                var elements = $('[bx-name]', context)
	                _.each(elements, function(element /*, index*/ ) {
	                    var htmls = Loader.Util.trimHTML(element)
	                    var parent = $(element).closest('.bs-example')
	                    $('<pre>').append(
	                        $('<code class="html">').text(htmls)
	                    ).appendTo(parent)
	                })
	            },
	            // 去掉 <pre><code></code></pre> 的缩进
	            trimPredefined: function(context) {
	                var pres = $('pre', context)
	                _.each(pres, function(pre /*, index*/ ) {
	                    pre = $(pre)
	                    var code = pre.find('>code')
	                    var trimed
	                    if (code.length) {
	                        trimed = Loader.Util.trimPredefined(code[0])
	                        code.text(trimed)
	                    } else {
	                        trimed = Loader.Util.trimPredefined(pre[0])
	                        pre.text(trimed)
	                    }
	                })
	            }
	        })

	        return Readme
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
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	/*
	    https://github.com/chjj/marked
	        A markdown parser and compiler. Built for speed.
	    https://github.com/tanakahisateru/js-markdown-extra
	        PHP-Markdown-extra compatible Javascript markdown syntax parser
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(4)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        marked
	    ) {

	        var RE_ATTR = /\{\s*([#.].*)\s*\}$/
	        var renderer = new marked.Renderer()
	        renderer.paragraph = function(text) {
	            var ma = RE_ATTR.exec(text)
	            var attrs
	            var classes = ''
	            var result = '<p'
	            if (ma) {
	                attrs = ma[1].split(' ')
	                for (var i = 0; i < attrs.length; i++) {

	                    switch (attrs[i][0]) {
	                        case '#':
	                            result += ' id="' + attrs[i].slice(1) + '" '
	                            break
	                        case '.':
	                            classes += ' ' + attrs[i].slice(1)
	                            break
	                    }
	                }
	                if (classes) result += ' class="' + classes + '" '
	                text = text.replace(RE_ATTR, '')
	            }
	            return result + '>' + text + '</p>\n'
	        }

	        return renderer
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"readme\">\n" +
	        "    <div bx-name=\"components/spin\" data-type=\"three-bounce\" class=\"spin\"></div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ })
/******/ ])
});
;