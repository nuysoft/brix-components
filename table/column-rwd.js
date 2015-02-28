/* global define, console */
define(
    [
        'jquery', 'underscore',
        '../pagination/state.js'
    ],
    function(
        $, _,
        State
    ) {

        var NAMESPACE = '.column'
        var TEMPLATE_ARROW = '<div class="column-scroll-arrow"><%= text %></div>'
        var SELECTOR_TH = '> thead > tr > th:nth-child(<%= nth %>)'
        var SELECTOR_TD = '> tbody > tr > td:nth-child(<%= nth %>)'

        function column(tableComponentInstance, tableComponentOptions, Constant, callback) {
            var range = tableComponentOptions[Constant.COLUMN.RWD.RANGE] || [0, -1]
            var limit = tableComponentOptions[Constant.COLUMN.RWD.LIMIT] || 5

            var $table = $(tableComponentInstance.element)
            var state = _flush(Constant, $table, range, limit)

            var $leftArrow = _create($table, '<span class="glyphicon glyphicon-chevron-left"></span>')
            var $rightArrow = _create($table, '<span class="glyphicon glyphicon-chevron-right"></span>')

            var spree = {
                Constant: Constant,
                $table: $table,
                range: range,
                limit: limit,
                state: state,
                $leftArrow: $leftArrow,
                $rightArrow: $rightArrow,
                callback: callback
            }

            _bind(spree)
            _beautify(spree)

            return {
                state: state,
                flush: function() {
                    _flush(Constant, $table, range, limit, state)
                    _beautify(spree)
                    return this
                }
            }
        }

        function _create($table, text) {
            var $tbody = $table.find('> tbody')
            var html = _.template(TEMPLATE_ARROW)({
                text: text,
                height: $tbody.height()
            })
            var $arrow = $(html).insertAfter($table)
                .offset({
                    top: $tbody.offset().top
                })
            return $arrow
        }

        function _handler(event, spree) {
            _flush(spree.Constant, spree.$table, spree.range, spree.limit, spree.state)
            _beautify(spree)
            event.preventDefault()
            event.stopPropagation()
        }

        function _bind(spree) {
            spree.$leftArrow.on('click' + NAMESPACE, function(event) {
                spree.state.moveToPrev()
                _handler(event, spree)
                if (spree.callback) spree.callback()
            })

            spree.$rightArrow.on('click' + NAMESPACE, function(event) {
                spree.state.moveToNext()
                _handler(event, spree)
                if (spree.callback) spree.callback()
            })

            spree.$table.hover(function() {
                spree.$leftArrow.fadeIn('fast')
                spree.$rightArrow.fadeIn('fast')
                _beautify(spree)
            }, function(event) {
                if (
                    event.relatedTarget === spree.$leftArrow.get(0) || // 移出向左按钮
                    $.contains(spree.$leftArrow.get(0), event.relatedTarget) || // 移出向左按钮子节点
                    event.relatedTarget === spree.$rightArrow.get(0) || // 移出向右按钮
                    $.contains(spree.$rightArrow.get(0), event.relatedTarget) // 移出向右按钮子节点
                ) return

                spree.$leftArrow.fadeOut('fast')
                spree.$rightArrow.fadeOut('fast')
            })
        }

        function _flush(Constant, $table, range, limit, state) {
            var $thead = $table.find('> thead')
            var $tbody = $table.find('> tbody')
            var $ths = $table.find('> thead > tr > th')

            // 修正滚动列所需的参数
            range[0] = (+range[0] + $ths.length) % $ths.length
            range[1] = (+range[1] + $ths.length) % $ths.length

            // 自动应用 priority 插件
            _.each($ths, function(item, index) {
                if (index >= range[0] && index < range[1]) {
                    $(item).attr('data-' + Constant.COLUMN.PRIORITY.TAG, '')
                }
            })

            // 过滤不参与分页的列
            $ths = _.filter($ths, function(item, index) {
                return index >= range[0] && index < range[1]
            })

            // 调整被 priority 插件排序的列
            _.each($ths, function(item, index) {
                // $(item).parent().prepend(item)
            })

            // 过滤被 priority 插件隐藏的列
            $ths = _.filter($ths, function(item, index) {
                var priorityTag = $(item).attr('data-' + Constant.COLUMN.PRIORITY.TAG)
                var priorityState = $(item).attr('data-' + Constant.COLUMN.PRIORITY.STATE)
                return priorityTag !== undefined && priorityState !== 'hide'
            })

            $ths = $($ths)

            // 初始化或更新分页状态
            if (!state) {
                state = new State(
                    $ths.length,
                    1,
                    limit
                )
            } else {
                state.setTotal($ths.length)
            }

            // 调整被 priority 插件隐藏或显示的列
            for (var i = 0, m, index; i < state.total; i++) {
                m = (i >= state.start && i < state.end) ? 'show' : 'hide'
                index = $ths.eq(i)[m]().index()
                $table.find(
                    _.template(SELECTOR_TD)({
                        nth: index + 1
                    })
                )[m]()
            }
            return state
        }

        function _beautify(spree) {
            var $tbody = spree.$table.find('> tbody')
            var tableHeight = spree.$table.height()
            var tableTop = spree.$table.offset().top
            var tbodyHeight = $tbody.height()
            var tbodyTop = $tbody.offset().top

            var $leftTarget = spree.$table.find(_.template(SELECTOR_TH)({
                nth: spree.range[0]
            }))
            spree.$leftArrow.css({
                height: tbodyHeight,
                'line-height': tbodyHeight + 'px'
            }).offset({
                top: tbodyTop,
                left: $leftTarget.offset().left + $leftTarget.outerWidth() - spree.$leftArrow.width() / 2
            })

            var $rightTarget = spree.$table.find(_.template(SELECTOR_TH)({
                nth: spree.range[1] + 1
            }))
            spree.$rightArrow.css({
                height: tbodyHeight,
                'line-height': tbodyHeight + 'px'
            }).offset({
                top: tbodyTop,
                left: $rightTarget.offset().left - spree.$rightArrow.width() / 2
            })

            if (!spree.state.total || !spree.state.hasPrev) spree.$leftArrow.hide()
            if (!spree.state.total || !spree.state.hasNext) spree.$rightArrow.hide()
        }

        return column
    }
)