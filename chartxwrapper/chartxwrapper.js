/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        'chartx/index',
        './chartxwrapper.tpl.js',
        'css!./chartxwrapper.css'
    ],
    function(
        $, _,
        Brix,
        Chartx,
        template
    ) {

        function ChartxWrapper() {}

        _.extend(ChartxWrapper.prototype, Brix.prototype, {
            options: {},
            init: function() {},
            render: function() {
                var that = this
                require([
                    'jquery',
                    'chartx/index',
                    'chartx/chart/line/index'
                ], function($, Chart, Line) {
                    var line = new Line(that.element, that.options.data, that.options.options)
                    line.draw()
                })
            }
        })

        return ChartxWrapper
    }
)