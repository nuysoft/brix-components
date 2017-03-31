(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("handlebars"), require("components/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "handlebars", "components/base"], factory);
	else if(typeof exports === 'object')
		exports["components/errortips"] = factory(require("jquery"), require("underscore"), require("handlebars"), require("components/base"));
	else
		root["components/errortips"] = factory(root["jquery"], root["underscore"], root["handlebars"], root["components/base"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window, document, clearTimeout, setTimeout */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2), __webpack_require__(3), __webpack_require__(4),
	  __webpack_require__(5),
	  __webpack_require__(6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	  $, _, Handlebars,
	  Brix, tpl) {
	  // var $ = require('jquery')
	  // var _ = require('underscore')
	  // var Handlebars = require('handlebars')
	  // var Brix = require('components/base')
	  // var tpl = require('./errortips.tpl')

	  var ALL_EVENTS = {
	    EVENTS: {
	      //三级导航点击标题收缩扩展子菜单
	      '.errortips-icon': {
	        /* jshint unused:false */
	        click: function(e, self) {
	          self._tips.fadeOut({
	            duration: 250,
	            easing: 'swing',
	            complete: function() {
	              self._tips.remove()
	              self.trigger('complete.errortips')
	            }
	          })
	        }
	      }
	    }
	  }


	  //arguments: [el, options]
	  function Errortips() {
	    if (arguments.length) {
	      this.element = $(arguments[0])
	      this.options = _.extend(this.options, arguments[1])
	    }
	  }
	  _.extend(Errortips.prototype, Brix.prototype, {

	    options: {
	      width: 180, //提示框的宽度,
	      msg: '操作<span>不正确</span>，请重新操作', //提示文案，支持标签,
	      duration: null, //提示持续的时间,
	      shake: true //按钮是否抖动反馈,
	    },
	    render: function() {

	    },

	    destroy: function() {
	      if (this._tips) {
	        this._tips.remove()
	      }
	    },

	    showTips: function(msg) {
	      var el = $(this.element)

	      if (el.hasClass('btn-error')) {
	        return
	      }

	      // data-btn-error 避免同名样式冲突
	      if ($('.btn-error-tips[data-btn-error]').length) {
	        clearTimeout(this.itv)
	        $('.btn-error-tips[data-btn-error]').remove()
	      }

	      if (this.options.shake) {
	        this._shake()
	      }

	      this._showTips(msg)
	      this._bindUI()
	    },

	    /**
	     * 事件绑定
	     * @return {[type]} [description]
	     */
	    _bindUI: function() {
	      var el = this._tips
	      var self = this
	        //旧brix事件绑定转换
	      $.each(ALL_EVENTS, function(k, v) {
	        switch (k) {
	          case 'EVENTS':
	            $.each(v, function(_k, _v) {
	              $.each(_v, function(__k, __v) {
	                el.delegate(_k, __k, function(e) {
	                  __v(e, self)
	                })
	              })
	            })
	            break

	          case 'DOCEVENTS':
	            $.each(v, function(_k, _v) {
	              $.each(_v, function(__k, __v) {
	                $(document).delegate(_k, __k, function(e) {
	                  __v(e, self)
	                })
	              })
	            })
	            break

	          case 'WINEVENTS':
	            $.each(v, function(_k, _v) {
	              $(window).on(_k, function(e) {
	                _v(e, self)
	              })
	            })
	            break
	        }
	      })
	    },

	    _showTips: function(msg) {
	      var self = this
	      var el = $(this.element)
	      var tipsWidth = this.options.width
	      var duration = this.options.duration
	      var fixLeft = 30
	      var elWidth = el.outerWidth()

	      msg = msg || this.options.msg

	      if (self.fadeOut) {
	        self.fadeOut.stop()
	      }

	      //tips 6 秒后消失，或者点击页面其他地方也消失
	      if (duration) {
	        this.itv = setTimeout(function() {
	          self.fadeOut = self._tips.fadeOut({
	            duration: 250,
	            easing: 'swing',
	            complete: function() {
	              self._tips.remove()
	              self.trigger('complete.errortips', self)
	            }
	          })
	        }, duration)
	      }
	      var offset = el.offset()

	      //heredoc依赖模板引擎
	      var tipsTmpl = tpl
	      var _arrLeft = tipsWidth / 2 - 10

	      var tipsHtml = Handlebars.compile(tipsTmpl)({
	        width: tipsWidth,
	        msg: msg,
	        left: _arrLeft,
	        duration: duration
	      })

	      this._tips = $(tipsHtml)
	      $('body').append(this._tips)
	      var _tipsWidth = this._tips.outerWidth()
	      var _tipsHeight = this._tips.outerHeight()
	      var tipsTop = offset.top - _tipsHeight - 20
	      var tipsTopStart = 0

	      //浮层以触发节点为参考居中
	      var tipsLeft = offset.left - ((_tipsWidth - elWidth) / 2)

	      /**
	       * 超过边界调整
	       * @type {[type]}
	       */
	      var winWidth = $(window).width()
	      var winHeight = $(window).height()
	      var mm = tipsLeft + _tipsWidth - winWidth
	      if (mm > 0) { //右边界
	        tipsLeft -= mm
	        this._tips.find('.arrow').css({
	          'left': _arrLeft + mm
	        })
	      }
	      //左边界
	      if (tipsLeft < 0) {
	        this._tips.find('.arrow').css({
	          'left': _arrLeft + tipsLeft
	        })
	        tipsLeft = 0
	      }

	      if (tipsTop < 0) {
	        this._tips.find('.arrow').addClass('arrow-up')
	        tipsTop = offset.top + el.outerHeight() + 20
	        tipsTopStart = tipsTop - 25
	      } else {
	        tipsTopStart = tipsTop + 25
	      }

	      //如果节点被隐藏了，浮层直接居中
	      if (el.is(':hidden')) {
	        this._tips.find('.arrow').hide()
	        var centerLeft = (winWidth - _tipsWidth) / 2
	        var centerTop = (winHeight - _tipsHeight) / 2

	        this._tips.css({
	          left: centerLeft,
	          top: centerTop,
	          opacity: 0
	        })

	        this._tips.animate({
	          left: centerLeft,
	          top: centerTop,
	          opacity: 1
	        }, 250, 'swing')
	        return
	      }

	      //正常显示在按钮的上面
	      this._tips.css({
	        left: tipsLeft,
	        top: tipsTopStart,
	        opacity: 0
	      })

	      this._tips.animate({
	        left: tipsLeft,
	        top: tipsTop,
	        opacity: 1
	      }, 250, 'swing')
	    },

	    //抖动按钮
	    _shake: function() {
	      var el = $(this.element)

	      //错误反馈按钮动画
	      var _w = el.width()
	      var _html = el.html()

	      el.addClass('btn-error')
	      el.width(_w)
	      el.html('<i class="errortips-icon">&#xe600;</i>')

	      //错误抖动反馈1秒
	      setTimeout(function() {
	        el.html(_html)
	        el.removeClass('btn-error')
	      }, 1000)
	    }
	  })

	  // module.exports = Errortips
	  return Errortips
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
	    return " <div class=\"btn-error-tips\" data-btn-error=\"true\" style=\"width: {{width}}px\">\n" +
	        "  {{{msg}}}\n" +
	        "  <i class=\"arrow\" style=\"left: {{left}}px;\"></i>\n" +
	        "  {{^duration}}\n" +
	        "  <i class=\"errortips-icon\">&#xe601;</i>\n" +
	        "  {{/duration}}\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;