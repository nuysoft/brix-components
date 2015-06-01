/* global define, clearTimeout, setTimeout */

/**
 * 给有滚动条出现的容器加上简单的阴影遮罩
 */
define([
  'jquery', 'underscore',
  'components/base',
  'css!./scrollmask.css'
], function(
  $, _,
  Brix) {

  function ScrollMask() {
    if (arguments.length) {
      this.element = $(arguments[0])
      this.options = _.extend(this.options, arguments[1])
    }
  }
  _.extend(ScrollMask.prototype, Brix.prototype, {

    options: {

    },
    render: function() {
      var current = $(this.element)

      function maskShowHide(c, m) {
        c = $(c)
          // var _this = current[0];
        if (c.scrollTop() === 0) {
          m.hide();
        } else {
          m.show();
        }
      }

      var mask = $('<div class="linear-mask"></div>');
      var container = $('<div class="scroll-mask-wrap"></div>');
      var t;
      var self = current;

      container.insertBefore(self);
      container.append(mask).append(self);

      maskShowHide(self, mask);

      $(self).on('scroll', function() {
        clearTimeout(t);
        t = setTimeout(function() {
          maskShowHide(self, mask);
        }, 10);
      });
    },

    destroy: function() {

    }
  })

  return ScrollMask
})