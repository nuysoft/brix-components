/* global define */
define(
    [
        'jquery',
        'underscore',
        'brix/base'
    ],
    function($, _, Brix) {

        function TextCount() {}

        _.extend(TextCount.prototype, Brix.prototype, {
            init: function() {
                var that = this
                var $element = $(that.element)

                if ($element) {
                    var $input = $(that.options.input)
                    $element.html(that._countResult($input.val()))

                    $input.on('keyup', function() {
                        $element.html(that._countResult($input.val()));
                    });
                }
            },
            count: function(str) {
                var _str = str.replace(/[\u4e00-\u9fa5]/g, '*')
                return _str.length
            },
            _countResult: function(str) {
                var len = this.count(str)
                var count = this.options.count
                var pre = len
                if (len > count) {
                    pre = '<em class="textcount-error">' + len + '</em>'
                }
                return pre + '/' + count
            }
        })

        return TextCount
    }
)