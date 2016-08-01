/* global define */
/*
    分页组件。

    TODO
        去掉边框。
 */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'components/base', 'brix/event',
        './state.js',
        './pagination.tpl.js'
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

        var PAGINATION_LIMITS = [10, 20, 30, 40, 50]

        function Pagination() {}

        _.extend(Pagination.prototype, Brix.prototype, {
            options: {
                statistics: true,
                simplify: false,
                step: 7,
                total: 0,
                cursor: 1,
                limit: 10,
                limits: undefined
            },
            init: function() {
                this.options.limits = this.options.limits && this.options.limits.length ?
                    _.unique(this.options.limits) :
                    [].concat(PAGINATION_LIMITS)

                this._state = new PurePagination(
                    this.options.total,
                    this.options.cursor,
                    this.options.limit
                )
            },
            render: function() {
                var that = this
                this.$manager = new EventManager('bx-')
                this.$element = $(this.element)

                this.data = this._fixData()
                var html = _.template(template)(this.data)
                $(this.element).empty().append(html)

                this.$manager.delegate(this.element, this)

                // 重新 render 之后的 ready 事件？再次触发？
                Loader.boot(this.element, function() { // 这里的目的并非执行 Loader.boot()，而是等待其他 Loader.boot() 完成
                    that.dropdown = Loader.query('components/dropdown', that.element)[0]

                    if (!that.dropdown) return

                    /* jshint unused:false */
                    that.dropdown.on('change.dropdown', function(event, data) {
                        event.stopPropagation()
                        that._state.setCursor(1)
                        that._state.setLimit(data.value)
                        that.trigger('change.pagination', that._state)
                        that._update()
                    })
                })
            },
            _update: function() {
                this.data = this._fixData()
                var html = _.template(template)(this.data)
                var $newPagination = $(html)

                this.$element.find('ul.pagination')
                    .replaceWith($newPagination.find('ul.pagination'))
                this.$element.find('span.start-end-total')
                    .replaceWith($newPagination.find('span.start-end-total'))

                // $(this.element).empty().append(html)
            },
            moveTo: function(event, extra) { // extraParameters
                // moveTo( cursor )
                if (arguments.length === 1) extra = event
                this._state.moveTo(extra)
                this.trigger('change.pagination', this._state)
                this._update()
            },
            total: function(total) {
                if (total === undefined || total === null) return this._state.total
                if (this._state.total !== total) {
                    this._state.setTotal(total)
                    this._update()
                }
                return this
            },
            cursor: function(cursor) {
                if (cursor === undefined || cursor === null) return this._state.cursor
                if (this._state.cursor !== cursor) {
                    this._state.setCursor(cursor)
                    this._update()
                }
                return this
            },
            limit: function(limit) {
                if (limit === undefined || limit === null) return this._state.limit
                if (this._state.limit !== limit) {
                    this._state.setLimit(limit)
                    this._update()

                    // PS: The dropdown can only be amended by manual!
                }
                return this
            },
            _fixData: function() {
                var barStart = Math.min(
                    this._state.pages,
                    Math.max(
                        1,
                        this._state.cursor - parseInt(this.options.step / 2, 10)
                    )
                )
                var limit = +this.options.limit
                var limits = [].concat(this.options.limits).sort(function(a, b) {
                    return a - b
                })
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
                                if (limit < limits[i]) {
                                    limits.splice(i, 0, limit)
                                    break
                                }
                            }
                    }
                }
                return _.extend({
                    barStart: barStart,
                    barEnd: Math.min(this._state.pages, barStart + this.options.step - 1),
                    limits: limits,
                    simplify: this.options.simplify
                }, this._state)
            },
            destroy: function() {
                this.$manager.undelegate(this.$element, this)
            }
        })

        return Pagination
            // return Brix.extend()
    }
)