/* global define, clearTimeout, setTimeout */
define([
  'jquery', 'underscore', 'handlebars',
  'components/base',
  './errortips.tpl.js',
  'css!./errortips.css'
], function(
  $, _, Handlebars,
  Brix, tpl) {

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
      duration: 2000, //提示持续的时间,
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
    },

    _showTips: function(msg) {
      var self = this
      var el = $(this.element)
      var tipsWidth = this.options.width
      var duration = this.options.duration

      msg = msg || this.options.msg

      if (self.fadeOut) {
        self.fadeOut.stop()
      }

      //tips 6 秒后消失，或者点击页面其他地方也消失
      this.itv = setTimeout(function() {
        self.fadeOut = self._tips.fadeOut(250, 'swing', function() {
          self._tips.remove()
          self.trigger('complete.errortips', self)
        })
      }, duration)

      var offset = el.offset()

      //heredoc依赖模板引擎
      var tipsTmpl = tpl
      var _arrLeft = el.outerWidth() / 2 - 10

      var tipsHtml = Handlebars.compile(tipsTmpl)({
        width: tipsWidth,
        msg: msg,
        left: _arrLeft
      })

      this._tips = $(tipsHtml)
      $('body').append(this._tips)
      var tipsLeft = offset.left
      var tipsTop = offset.top - this._tips.outerHeight() - 20

      this._tips.css({
        left: tipsLeft,
        top: tipsTop + 25,
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

  return Errortips
})