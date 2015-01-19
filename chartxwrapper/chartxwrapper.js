/* global define */
/*
    不方便之处：
    1. 需要记忆 chartx/chart/line/index
        > 可以作为参数传入
    2. 通常不需要持有 line 实例
        > 
 */
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
            init: function() {
                // 尝试从 innerText 中解析数据
                /* jshint evil:true */
                if (!this.options.data) {
                    this.options.data = eval('(function(){ return [].splice.call(arguments, 0 )[0] })(' + this.element.innerText + ')')
                    this.element.innerText = ''
                }
            },
            render: function() {
                var that = this
                require(['chartx/chart/' + this.options.type + '/index'], function(Chart) {
                    var chart = new Chart(that.element, that.options.data, that.options.options)
                    chart.draw()
                })
            }
        })

        return ChartxWrapper
    }
)