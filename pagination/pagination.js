/* global define */
/*
    分页组件。
 */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'brix/base', 'brix/event',
        './state.js',
        './pagination.tpl.js',
        'css!./pagination.css'
    ],
    function(
        $, _,
        Loader, Brix, EventManager,
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
                limit: 10,
                limits: [10, 20, 30, 40, 50]
            },
            init: function() {
                this._status = new PurePagination(
                    this.options.total,
                    this.options.cursor,
                    this.options.limit
                )
            },
            render: function() {
                var that = this
                var manager = new EventManager()

                this.data = this.fixData()
                var html = _.template(template)(this.data)
                $(this.element).empty().append(html)

                manager.delegate(this.element, this)

                // 重新 render 之后的 ready 事件？再次触发？
                Loader.boot(this.element, function() {
                    that.dropdown = Loader.query('components/dropdown', that.element)[0]
                        /* jshint unused:false */
                    that.dropdown.on('change.dropdown', function(event, data) {
                        that._status.setLimit(data.value)
                        that.trigger('change.pagination', that._status)
                        that.render()
                    })
                })
            },
            moveTo: function(event, extra) { // extraParameters
                // moveTo( cursor )
                if (arguments.length === 1) extra = event
                this._status.moveTo(extra)
                this.trigger('change.pagination', this._status)
                this.render()
            },
            fixData: function() {
                var barStart = Math.min(
                    this._status.pages,
                    Math.max(
                        1,
                        this._status.cursor - parseInt(this.options.step / 2, 10)
                    )
                )
                var limit = +this.options.limit
                var limits = [].concat(this.options.limits).sort()
                if (!_.contains(limits, limit)) {
                    switch (true) {
                        case limit < limits[0]:
                            limits.unshift(limit)
                            break
                        case limit > limits[limits.length - 1]:
                            limits.push(limit)
                            break
                        default:
                            for (var i = 0; i < limits.length; i++) {
                                if (limit > limits[i]) {
                                    limits.splice(i + 1, 0, limit)
                                    break
                                }
                            }
                    }
                }
                return _.extend({
                    barStart: barStart,
                    barEnd: Math.min(this._status.pages, barStart + this.options.step - 1),
                    limits: limits
                }, this._status)
            }
        })

        return Pagination
            // return Brix.extend()
    }
)