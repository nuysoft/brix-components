/* global define */
/* global document */
/*
    https://github.com/RubaXa/Sortable
        http://rubaxa.github.io/Sortable/

    TODO
    功能需求列表
        保存状态
        恢复状态
    设计使用方式

 */
define(
    [
        'jquery', 'underscore', 'Sortable',
        'brix/event',
        '../dialog/position/position.js',
        './column-priority.tpl.js'
    ],
    function(
        $, _, Sortable,
        EventManager,
        position,
        template
    ) {

        var NAMESPACE = '.table_column_priority'

        function priority(tableComponentInstance, tableComponentOptions, Constant, callback) {

            var $trigger = $(tableComponentOptions[Constant.COLUMN.PRIORITY.TRIGGER])
            var placement = tableComponentOptions[Constant.COLUMN.PRIORITY.PLACEMENT] || 'bottom'
            var align = tableComponentOptions[Constant.COLUMN.PRIORITY.ALIGN] || 'right'

            var $table = $(tableComponentInstance.element)
            var $relatedElement = _render(Constant, $table)

            _toggle($trigger, $relatedElement, placement, align)

            _autoHide(tableComponentInstance, $trigger, $relatedElement)

            var $manager = _delegate(Constant, $table, $trigger, $relatedElement, callback)

            // drag drop
            var wrapper = $relatedElement.find('.queue .sortable-wrapper')
            if (wrapper.length) Sortable.create(wrapper[0], {
                handle: '.item-move',
                animation: 150,
                onEnd: function( /*event*/ ) {
                    // 同步顺序：解析新顺序，然后同步到表头 th 的标记 data-column-priority-index 
                    var cache = {}
                    var candidates = $relatedElement.find('.queue .sortable-wrapper .item')
                    _.each(candidates, function(item, index) {
                        var $item = $(item)
                        var id = $item.data(Constant.COLUMN.ID)
                        cache[id] = index
                        $item.attr('data-' + Constant.COLUMN.PRIORITY.INDEX, index)
                    })
                    var $ths = $table.find('> thead th')
                    _.each($ths, function(item /*, index*/ ) {
                        var $item = $(item)
                        var id = $item.data(Constant.COLUMN.ID)
                        if (id === undefined) return
                        $item.attr('data-' + Constant.COLUMN.PRIORITY.INDEX, cache[id])
                    })
                }
            })

            // 勾选左侧复选框，更新右侧排序区域
            $relatedElement.on('change' + NAMESPACE, 'input:checkbox', function(event) {
                var $target = $(event.target)
                var id = $target.data(Constant.COLUMN.ID)
                var checked = $target.prop('checked')

                $relatedElement.find('.queue .sortable-wrapper .item')
                    .filter('[data-' + Constant.COLUMN.ID + '="' + id + '"]')[
                        checked ? 'slideDown' : 'slideUp'
                    ]('fast')
            })

            return {
                $relatedElement: $relatedElement,
                $manager: $manager,
                toggle: function() {
                    $relatedElement.toggle()
                },
                show: function() {
                    $relatedElement.show()
                },
                hide: function() {
                    $relatedElement.hide()
                },
                fields: function(fields) {
                    if (fields) {
                        var candidates = $relatedElement.find('.candidates input:checkbox')
                        var queue = $relatedElement.find('.queue .sortable-wrapper .item')
                        var sortableItems = []
                        _.each(candidates, function(item /*, index*/ ) {
                            var $item = $(item)
                            var field = $item.data(Constant.COLUMN.FIELD)
                            var priorityIndex = _.indexOf(fields, field)
                            $item.prop('checked', priorityIndex !== -1).triggerHandler('change' + NAMESPACE)

                            var $sortableItem = queue.filter('[data-' + Constant.COLUMN.FIELD + '="' + field + '"]')
                            if (priorityIndex === -1) {
                                $sortableItem.hide()
                            } else {
                                $sortableItem.show()
                                sortableItems[priorityIndex] = $sortableItem
                            }
                        })

                        _.each(sortableItems, function(item, index) {
                            if (!item) return
                            if (index === 0) $(item).parent().prepend(item)
                            else sortableItems[index - 1].after(item)
                        })

                        _handler(Constant, $table, $relatedElement)
                        if (callback) callback(undefined, fields)

                        return this
                    }
                    return _get(Constant, $relatedElement)
                }
            }
        }

        priority.NAMESPACE = NAMESPACE

        function _render(Constant, $table) {
            var data = _data(Constant, $table)
            var html = _.template(template)(data)
            var $relatedElement = $(html).insertAfter($table)

            return $relatedElement
        }

        function _offset($trigger, $relatedElement, placement, align) {
            var offset = position($trigger, $relatedElement, placement, align)
            var relatedMarginLeft = parseInt($relatedElement.css('margin-left'), 10) || 0
            var relatedMarginTop = parseInt($relatedElement.css('margin-top'), 10) || 0
            return {
                left: offset.left + relatedMarginLeft,
                top: offset.top + relatedMarginTop
            }
        }

        // 同步标记 data-column-priority-state，并隐藏或显示
        function _handler(Constant, $table, $relatedElement) {
            var candidates = $relatedElement.find('.candidates input:checkbox')
            _.each(candidates, function(item /*, index*/ ) {
                var $item = $(item)
                var id = $item.data(Constant.COLUMN.ID)
                if (id === undefined) return

                var checked = $item.prop('checked')
                var method = checked ? 'show' : 'hide'
                var $th = $table.find('> thead th[data-' + Constant.COLUMN.ID + '="' + id + '"]')
                    .attr('data-' + Constant.COLUMN.PRIORITY.STATE, method)[method]()
                $table.find('> tbody td:nth-child(' + ($th.index() + 1) + ')')
                    .attr('data-' + Constant.COLUMN.PRIORITY.STATE, method)[method]()
            })

            return _get(Constant, $relatedElement)
        }

        function _get(Constant, $relatedElement) {
            var fields = []
            var candidates = $relatedElement.find('.queue .sortable-wrapper .item')
            _.each(candidates, function(item /*, index*/ ) {
                var $item = $(item)
                if ($item.css('display') === 'none') return
                fields.push(
                    $item.data(Constant.COLUMN.FIELD) || $item.data(Constant.COLUMN.NAME)
                )
            })
            return fields
        }

        function _toggle($trigger, $relatedElement, placement, align) {
            $trigger.on('click' + NAMESPACE, function( /*event*/ ) {
                if ($relatedElement.is(':visible')) {
                    $relatedElement.hide()
                    $(document.body).removeClass('modal-open')
                    return
                }

                $relatedElement.show().offset(
                    _offset($trigger, $relatedElement, placement, align)
                )

                // $(document.body).addClass('modal-open')
            })
        }

        function _delegate(Constant, $table, $trigger, $relatedElement, callback) {
            var $manager = new EventManager('bx-')
            var owner = {
                submit: function(event) {
                    var fields = _handler(Constant, $table, $relatedElement)
                    if (callback) callback(event, fields, event.currentTarget)
                    $relatedElement.hide()
                },
                cancel: function( /*event*/ ) {
                    $relatedElement.hide()
                },
                all: function( /*event*/ ) {
                    $relatedElement.find('.candidates input:checkbox').prop('checked', true)
                    $relatedElement.find('.queue .sortable-wrapper .item').show()
                },
                clear: function( /*event*/ ) {
                    $relatedElement.find('.candidates input:checkbox').prop('checked', false)
                    $relatedElement.find('.queue .sortable-wrapper .item').hide()
                }
            }
            $manager.delegate($relatedElement, owner)

            return $manager
        }

        /* jshint unused:vars */
        function _autoHide(tableComponentInstance, $trigger, $relatedElement) {
            var type = 'click' + NAMESPACE + '_' + tableComponentInstance.clientId
            $(document.body).off(type)
                .on(type, function(event) {
                    if (!$trigger[0] ||
                        event.target === $trigger[0] ||
                        $.contains($trigger[0], event.target) ||
                        event.target === $relatedElement[0] ||
                        $.contains($relatedElement[0], event.target)
                    ) return
                    $(document.body).removeClass('modal-open')
                    $relatedElement.hide()
                })
        }

        function _data(Constant, $table) {
            var ths = $table.find('> thead th')
            var found = false
            var leftImmovables = []
            var rightImmovables = []
            var candidates = _.map(ths, function(item, index) {
                var $item = $(item)
                var name = $item.data(Constant.COLUMN.NAME)

                if (!name) {
                    name = $.trim($item.text())
                    $item.attr('data-' + Constant.COLUMN.NAME, name)
                }
                if (!name) return

                if ($item.data(Constant.COLUMN.ID) === undefined) {
                    (found ? rightImmovables : leftImmovables).push({
                        index: index,
                        name: name
                    })
                    return
                }

                found = true

                return {
                    index: index,
                    id: $item.data(Constant.COLUMN.ID),
                    name: name,
                    field: $item.data(Constant.COLUMN.FIELD) || name
                }
            })
            candidates = _.filter(candidates, function(item /*, index*/ ) {
                return !!item
            })

            return {
                Constant: Constant,
                candidates: candidates,
                leftImmovables: leftImmovables,
                rightImmovables: rightImmovables
            }
        }

        return priority
    }
)