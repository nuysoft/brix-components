(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("moment"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "moment", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/countdown"] = factory(require("jquery"), require("underscore"), require("moment"), require("brix/base"));
	else
		root["components/countdown"] = factory(root["jquery"], root["underscore"], root["moment"], root["brix/base"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, setInterval, clearInterval */
	/*
	    https://github.com/hilios/jQuery.countdown/blob/master/dist/jquery.countdown.js
	    https://github.com/hilios/jQuery.countdown/blob/gh-pages/documentation.md
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(4),
	        __webpack_require__(5),
	        __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, moment,
	        Brix,
	        template
	    ) {
	        /*
	            ### 数据
	                {}
	            ### 选项
	                expires
	            ### 属性
	                final
	            ### 方法
	                .start()
	                .pause()
	                .resume()
	                .stop()
	            ### 事件
	                * update.countdown
	                * finish.countdown
	                * stop.countdown

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

	        function Countdown() {}

	        _.extend(Countdown.prototype, Brix.prototype, {
	            options: {
	                precision: 500,
	                expires: new Date()
	            },
	            render: function() {
	                this.options.expires = moment(
	                    this.options.expires,
	                    _.isString(this.options.expires) && 'YYYY-MM-DD HH:mm:ss'
	                ).toDate()
	                this.data = this.data || _.extend({}, this.options)

	                var html = _.template(template)(this.data)
	                var $element = $(this.element)
	                $element.append(html)
	                this.start()
	            },
	            start: function() {
	                var that = this
	                this.trigger('start.countdown', this.offset())

	                function task() {
	                    var offset = that.update()
	                    if (offset.total === 0) {
	                        Timer.pop(that.task, that.options.precision)
	                        that.trigger('complete.countdown', offset)
	                    }
	                    return task
	                }

	                this.task = task

	                this.on('complete.countdown', function() {
	                    $(that.element).addClass('is-complete')
	                })

	                Timer.push(task(), this.options.precision)

	                return this
	            },
	            stop: function() {
	                this.options.expires = new Date()
	                Timer.pop(this.task(), this.options.precision)
	                return this
	            },
	            pause: function() {
	                this.trigger('pause.countdown', this.offset())
	                Timer.pop(this.task, this.options.precision)
	                return this
	            },
	            resume: function() {
	                this.trigger('resume.countdown', this.offset())
	                Timer.push(this.task(), this.options.precision)
	                return this
	            },
	            update: function() {
	                var offset = this.offset()
	                $(this.element)
	                    .find('.totalDays').text(fix(offset.totalDays)).end()
	                    .find('.hours').text(fix(offset.hours)).end()
	                    .find('.minutes').text(fix(offset.minutes)).end()
	                    .find('.seconds').text(fix(offset.seconds)).end()

	                this.trigger('update.countdown', offset)

	                return offset

	                function fix(number, length) {
	                    length = length || 2
	                    switch (length) {
	                        case 2:
	                            return number < 10 ? '0' + number : number
	                        case 3:
	                            return number < 10 ? '00' + number :
	                                number < 100 ? '0' + number :
	                                number
	                    }
	                }
	            },
	            offset: function() {
	                var expires = this.options.expires
	                var total = expires.getTime() - new Date().getTime()
	                total = Math.ceil(total / 1e3)
	                total = total < 0 ? 0 : total
	                var offset = {
	                    total: total,
	                    seconds: total % 60,
	                    minutes: Math.floor(total / 60) % 60,
	                    hours: Math.floor(total / 60 / 60) % 24,
	                    days: Math.floor(total / 60 / 60 / 24) % 7,
	                    totalDays: Math.floor(total / 60 / 60 / 24),
	                    weeks: Math.floor(total / 60 / 60 / 24 / 7),
	                    months: Math.floor(total / 60 / 60 / 24 / 30),
	                    years: Math.floor(total / 60 / 60 / 24 / 365)
	                }
	                return offset
	            }
	        })

	        var Timer = {
	            push: function(task, interval) {
	                this.timers = this.timers || {}
	                this.timers[interval] = this.timers[interval] || []
	                this.timers[interval].push(task)
	                this.run()
	            },
	            pop: function(task, interval) {
	                var timers = this.timers
	                if (!timers || !timers[interval]) return
	                for (var i = 0; i < timers[interval].length; i++) {
	                    if (timers[interval][i] === task) timers[interval].splice(i--, 1)
	                }
	            },
	            run: function() {
	                _.each(this.timers, function(tasks, interval) {
	                    if (!tasks.length) {
	                        clearInterval(tasks.timer)
	                        return
	                    }
	                    if (!tasks.timer) {
	                        tasks.timer = setInterval(function() {
	                            _.each(tasks, function(task /*, index*/ ) {
	                                if (task) task()
	                            })
	                        }, interval)
	                    }
	                })
	            }
	        }

	        return Countdown
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
	    return "<div class=\"countdown\">\n" +
	        "    <span class=\"totalDays\">00</span> 天\n" +
	        "    <span class=\"hours\"    >00</span> 时\n" +
	        "    <span class=\"minutes\"  >00</span> 分\n" +
	        "    <span class=\"seconds\"  >00</span> 秒\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;