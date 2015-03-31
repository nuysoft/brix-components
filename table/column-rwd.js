/* global define */
define(
    [
        'jquery', 'underscore',
        '../pagination/state.js'
    ],
    function(
        $, _,
        State
    ) {

        var NAMESPACE = '.table_column_rwd'
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

        column.NAMESPACE = NAMESPACE

        function _create($table, text) {
            var $thead = $table.find('> thead')
            var html = _.template(TEMPLATE_ARROW)({
                text: text,
                height: $thead.height()
            })
            var $arrow = $(html).insertAfter($table)
                .offset({
                    top: $thead.offset().top
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
                if (spree.callback) spree.callback(event, spree.state, event.currentTarget)
            })

            spree.$rightArrow.on('click' + NAMESPACE, function(event) {
                spree.state.moveToNext()
                _handler(event, spree)
                if (spree.callback) spree.callback(event, spree.state, event.currentTarget)
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
            var $ths = $thead.find('> tr > th')

            // 修正滚动列所需的参数
            range[0] = (+range[0] + $ths.length) % $ths.length
            range[1] = (+range[1] + $ths.length) % $ths.length

            // 自动应用 priority 插件：增加标识 data-column-id
            _.each($ths, function(item, index) {
                item = $(item)
                if (index >= range[0] && index < range[1]) {
                    if (item.data(Constant.COLUMN.ID) !== undefined) return
                    item.attr('data-' + Constant.COLUMN.ID, Constant.UUID++)
                }
            })

            // 过滤不参与分页的列
            /* jshint unused:false */
            $ths = _.filter($ths, function(item, index) {
                return index >= range[0] && index < range[1]
            })

            // 调整被 priority 插件排序的列：按照标记 data-column-priority-index 排序，并调整 DOM 结构
            var $firstPrev = $($ths[0]).prev()
                // var $lastNext = $($ths[$ths.length - 1]).next()
            $ths.sort(function(a, b) { // test
                var $a = $(a)
                var $b = $(b)
                a = +$a.data(Constant.COLUMN.PRIORITY.INDEX)
                b = +$b.data(Constant.COLUMN.PRIORITY.INDEX)
                if (isNaN(a)) a = $a.index()
                if (isNaN(b)) b = $b.index()
                return a - b
            })
            _.each($ths, function(th, thIndex) {
                var currentIndex = $(th).index()

                if (thIndex === 0) $firstPrev.after(th)
                else $($ths[thIndex - 1]).after(th)

                var newIndex = $(th).index()
                var $tds = $tbody.find('> tr > td:nth-child(' + (currentIndex + 1) + ')')
                _.each($tds, function(td, tdIndex) {
                    $(td).siblings(':nth-child(' + newIndex + ')').after(td)
                })
            })

            // 过滤被 priority 插件隐藏的列：它们不再参与分页
            $ths = _.filter($ths, function(item /*, index*/ ) {
                var $item = $(item)
                var id = $item.data(Constant.COLUMN.ID)
                var state = $item.data(Constant.COLUMN.PRIORITY.STATE)
                return id !== undefined && state !== 'hide'
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

            // 调整被 priority 插件隐藏或显示的列（内容列，非表头）
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
            // var tableHeight = spree.$table.height()
            // var tableTop = spree.$table.offset().top
            var $thead = spree.$table.find('> thead')
            var theadHeight = $thead.height()
            var theadTop = $thead.offset().top

            // var $tbody = spree.$table.find('> tbody')
            // var tbodyHeight = $tbody.height()
            // var tbodyTop = $tbody.offset().top

            var $leftTarget = spree.$table.find(_.template(SELECTOR_TH)({
                nth: spree.range[0]
            }))
            spree.$leftArrow.css({
                height: theadHeight,
                'line-height': theadHeight + 'px'
            }).offset({
                top: theadTop,
                left: $leftTarget.offset().left + $leftTarget.outerWidth() // - spree.$leftArrow.width() / 2
            })

            var $rightTarget = spree.$table.find(_.template(SELECTOR_TH)({
                nth: spree.range[1] + 1
            }))
            spree.$rightArrow.css({
                height: theadHeight,
                'line-height': theadHeight + 'px'
            }).offset({
                top: theadTop,
                left: $rightTarget.offset().left - spree.$rightArrow.width() // / 2
            })

            if (!spree.state.total || !spree.state.hasPrev) spree.$leftArrow.hide()
            if (!spree.state.total || !spree.state.hasNext) spree.$rightArrow.hide()
        }

        return column
    }
)