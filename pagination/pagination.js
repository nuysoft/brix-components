/* global define  */
/*
    分页组件。
 */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        './pure-pagination',
        'text!./pagination.tpl',
        'css!./pagination.css'
    ],
    function(
        $, _,
        Brix,
        PurePagination,
        template
    ) {
        /*
            ### 数据
                无
            ### 选项
                公共选项：data template
                statistics
                simplify
                step
                total
                cursor
                limit
                
            ### 属性
                公共属性：element moduleId clientId parentClientId childClientIds data template
                status      修改或计算分页状态。
                dropdown    分页大小组件。

            ### 方法

            ### 事件
                公共事件：ready destroyed
                
        */
        function Pagination() {}

        _.extend(Pagination.prototype, Brix.prototype, {
            options: {
                statistics: true,
                simplify: false,
                step: 7,
                total: 0,
                cursor: 1,
                limit: 1
            },
            init: function() {
                this.status = new PurePagination(
                    this.options.total,
                    this.options.cursor,
                    this.options.limit
                )
            },
            render: function() {
                var that = this
                var barStart
                this.data = _.extend({}, this.options, {
                    barStart: barStart = Math.min(
                        this.status.pages,
                        Math.max(
                            1,
                            this.status.cursor - parseInt(this.options.step / 2, 10)
                        )
                    ),
                    barEnd: Math.min(this.status.pages, barStart + this.options.step - 1)
                }, this.status)
                var html = _.template(template, this.data)
                $(this.element).empty().append(html)

                // 重新 render 之后的 ready 事件？再次触发？
                /* jshint unused:true */
                this.off('change', 'select')
                    .on('change', 'select', function(event, data) {
                        that.status.setLimit(data.value)
                        that.render()
                    })
                // this.on('ready', function() {
                //     var Loader = require('loader')
                //     var dropdown = Loader.query('components/dropdown', that)[0]
                //     dropdown.on('change', function(event, data) {
                //         debugger
                //         /* data { label, value } */
                //         that.status.setLimit(data.value)
                //         that.render()
                //     })
                // })

                this.delegateBxTypeEvents()
            },
            moveTo: function(event, extra) { // extraParameters
                // moveTo( cursor )
                if (arguments.length === 1) extra = event
                this.status.moveTo(extra)
                this.render()
            }
        })
        return Pagination
    }
)