/* global define */
/*
    https://github.com/nnnick/Chart.js
 */
define(
    [
        'jquery', 'underscore', 'Chart',
        'brix/base',
        './chart.tpl.js',
        'css!./chart.css'
    ],
    function(
        $, _, Chart,
        Brix,
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
        return Brix.extend({
            options: {
                TYPES: {
                    line: 'Line',
                    bar: 'Bar',
                    radar: 'Radar',
                    polararea: 'PolarArea',
                    pie: 'Pie',
                    doughnut: 'Doughnut',
                },
                type: 'Line', // Line Bar Radar PolarArea Pie Doughnut
                width: undefined,
                height: 400
            },
            render: function() {
                // 适配宽度
                if (!this.options.width) this.options.width = $(this.element).width()

                // 尝试从 innerText 中解析数据
                /* jshint evil:true */
                if (!this.options.data) {
                    this.options.data = eval('(function(){ return Array.prototype.slice.call(arguments)[0] })(' + this.element.innerText + ')')
                    this.element.innerText = ''
                }

                var html = _.template(template)(this.options)
                var canvas = $(html).appendTo(this.element)
                var context = canvas.get(0).getContext("2d")
                var type = this.options.TYPES[this.options.type.toLowerCase()]
                this.chart = new Chart(context)[type](this.options.data, {})
            }
        })
    }
)