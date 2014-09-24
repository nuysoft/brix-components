/*
    分页组件。
 */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        './pure-pagination',
        'text!./pagination.tpl',
        'less!./pagination.less'
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
        function Pagination(options) {

        }
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
                $(this.element).append(html)

                this.delegateBxTypeEvents()
            },
            moveTo: function(event, extraParameters) {
                if (arguments.length === 1) extraParameters = event
                this.status.moveTo(extraParameters)
                $(this.element).empty()
                this.render()
            }
        })
        return Pagination
    }
)