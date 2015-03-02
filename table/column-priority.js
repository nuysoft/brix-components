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
        '../dialog/position.js',
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

            _autoHide(tableComponentInstance, $table, $trigger, $relatedElement)

            _delegate(Constant, $table, $trigger, $relatedElement, callback)

            // drag drop
            var wrapper = $relatedElement.find('.queue .sortable-wrapper')
            if (wrapper.length) Sortable.create(wrapper[0], {
                handle: '.item-move',
                animation: 150,
                onEnd: function(event) {
                    // 同步顺序
                    var cache = {}
                    var candidates = $relatedElement.find('.queue .sortable-wrapper .item')
                    _.each(candidates, function(item, index) {
                        var $item = $(item)
                        var text = $.trim($item.text())
                        cache[text] = index
                        $item.attr('data-' + Constant.COLUMN.PRIORITY.INDEX, index)
                    })
                    var $ths = $table.find('> thead th')
                    _.each($ths, function(item /*, index*/ ) {
                        var $item = $(item)
                        if (!$item.is('[data-' + Constant.COLUMN.PRIORITY.TAG + ']')) return

                        var text = $item.attr('data-' + Constant.COLUMN.PRIORITY.NAME)
                        $item.attr('data-' + Constant.COLUMN.PRIORITY.INDEX, cache[text])
                    })

                    _handler(event, Constant, $table, $relatedElement)


                    if (callback) callback()
                }
            });

            // test
            $relatedElement.on('change' + NAMESPACE, 'input:checkbox', function( /*event*/ ) {
                // _handler(event,Constant, $table, $relatedElement)
                // if (callback) callback()
            })

            return {
                $relatedElement: $relatedElement,
                toggle: function() {
                    $relatedElement.toggle()
                },
                show: function() {
                    $relatedElement.show()
                },
                hide: function() {
                    $relatedElement.hide()
                }
            }
        }

        function _render(Constant, $table) {
            var data = _data(Constant, $table)
            var html = _.template(template)(data)
            var $relatedElement = $(html).insertAfter($table)

            return $relatedElement
        }

        function _offset($trigger, $relatedElement, placement, align) {
            var offset = position($trigger, $relatedElement, placement, align)
            var relatedMarginLeft = parseInt($relatedElement.css('margin-left'), 10)
            var relatedMarginTop = parseInt($relatedElement.css('margin-top'), 10)
            return {
                left: offset.left + relatedMarginLeft,
                top: offset.top + relatedMarginTop
            }
        }

        /* jshint unused:vars */
        function _handler(event, Constant, $table, $relatedElement) {
            var candidates = $relatedElement.find('.candidates input:checkbox')
            _.each(candidates, function(item /*, index*/ ) {
                var $item = $(item)
                var index = $item.attr('data-index')
                if (index === undefined) return

                var checked = $item.prop('checked')
                var method = checked ? 'show' : 'hide'
                $table
                    .find('> thead th:nth-child(' + (+index + 1) + ')')
                    .attr('data-' + Constant.COLUMN.PRIORITY.STATE, method)[method]()
                    .end()
                    .find('> tbody td:nth-child(' + (+index + 1) + ')')
                    .attr('data-' + Constant.COLUMN.PRIORITY.STATE, method)[method]()
                    .end()
            })

            var names = []
            candidates = $relatedElement.find('.queue .sortable-wrapper .item')
            _.each(candidates, function(item /*, index*/ ) {
                names.push($(item).find('.item-name').text())
            })
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
            var manager = new EventManager('bx-')
            var owner = {
                submit: function(event) {
                    _handler(event, Constant, $table, $relatedElement)
                    if (callback) callback()
                    $relatedElement.hide()
                },
                cancel: function( /*event*/ ) {
                    $relatedElement.hide()
                },
                all: function(event) {
                    $relatedElement.find('.candidates input:checkbox').prop('checked', true)
                    _handler(event, Constant, $table, $relatedElement)
                    if (callback) callback()
                },
                clear: function(event) {
                    $relatedElement.find('.candidates input:checkbox').prop('checked', false)
                    _handler(event, Constant, $table, $relatedElement)
                    if (callback) callback()
                }
            }
            manager.delegate($relatedElement, owner)
        }

        /* jshint unused:vars */
        function _autoHide(tableComponentInstance, $table, $trigger, $relatedElement) {
            var type = 'click' + NAMESPACE + '_' + tableComponentInstance.clientId
            $(document.body).off(type)
                .on(type, function(event) {
                    if (
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
                var text = $item.attr('data-' + Constant.COLUMN.PRIORITY.NAME)

                if (!text) {
                    text = $.trim($item.text())
                    $item.attr('data-' + Constant.COLUMN.PRIORITY.NAME, text)
                }
                if (!text) return

                if (!$item.is('[data-' + Constant.COLUMN.PRIORITY.TAG + ']')) {
                    (found ? rightImmovables : leftImmovables).push({
                        index: index,
                        name: text
                    })
                    return
                }

                found = true

                return {
                    index: index,
                    name: text
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