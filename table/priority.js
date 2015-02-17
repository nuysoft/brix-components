/* global define, console */
define(
    [
        'jquery', 'underscore',
        'brix/event',
        '../dialog/position.js',
        './priority.tpl.js'
    ],
    function(
        $, _,
        EventManager,
        position,
        template
    ) {

        var NAMESPACE = '.table_column_priority'

        function priority(tableComponentInstance, tableComponentOptions, callback) {

            var $trigger = $(tableComponentOptions['priority-trigger'])
            var placement = tableComponentOptions['priority-placement'] || 'bottom'
            var align = tableComponentOptions['priority-align'] || 'right'

            var $table = $(tableComponentInstance.element)
            var $relatedElement = _render($table)

            // $trigger.toggle(
            //     function(event) {
            //         $relatedElement.show().offset(
            //             _offset($trigger, $relatedElement, placement, align)
            //         )
            //         $(document.body).addClass('modal-open')
            //     },
            //     function(event) {
            //         $relatedElement.hide()
            //         $(document.body).removeClass('modal-open')
            //     }
            // )

            $trigger.on('click' + NAMESPACE, function(event) {
                $relatedElement
                    .toggle()
                    .offset(
                        _offset($trigger, $relatedElement, placement, align)
                    )
            })

            $relatedElement.on('change' + NAMESPACE, 'input:checkbox', function(event) {
                _handler(event, $table, $relatedElement)
                if (callback) callback()
            })

            _autoHide(tableComponentInstance, $table, $trigger, $relatedElement)

            var manager = new EventManager('bx-')
            var owner = {
                submit: function(event) {
                    _handler(event, $table, $relatedElement)
                    if (callback) callback()
                    $relatedElement.hide()
                },
                cancel: function(event) {
                    $relatedElement.hide()
                },
                all: function(event) {
                    $relatedElement.find('.candidates input:checkbox').prop('checked', true)
                    _handler(event, $table, $relatedElement)
                    if (callback) callback()
                },
                clear: function(event) {
                    $relatedElement.find('.candidates input:checkbox').prop('checked', false)
                    _handler(event, $table, $relatedElement)
                    if (callback) callback()
                }
            }
            manager.delegate($relatedElement, owner)

            // drag drop

            $relatedElement.on('mousedown', '.queue .item', function(mousedownEvent) {
                var $target = $(mousedownEvent.currentTarget)
                var position = $target.css('position')
                var targetOffset = $target.offset()
                var left = targetOffset.left
                $relatedElement.on('mousemove.priority_drag', function(mousemoveEvent) {
                    $target.offset({
                        left: left,
                        top: event.pageY
                    }).css({
                        opacity: 0.75
                    })
                    return false
                })
                $relatedElement.on('mouseup.priority_drag', function(mouseupEvent) {
                    var top = $target.offset().top
                    var $siblings = $target.siblings()
                    for (var index = 0; index < $siblings.length; index++) {
                        var siblingOffset = $siblings.eq(index).offset()
                        if (top < siblingOffset.top) {
                            $target.insertBefore($siblings.get(index))
                                .css('position', position)
                            break
                        }
                    }
                    $target.css('position', position)
                    $siblings.css('position', position)
                    $relatedElement
                        .off('mousemove.priority_drag')
                        .off('mouseup.priority_drag')
                })
                return false
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

        function _render($table) {
            var data = _data($table)
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

        function _handler(event, $table, $relatedElement) {
            var candidates = $relatedElement.find('.candidates input:checkbox')
            _.each(candidates, function(item, index) {
                var $item = $(item)
                var index = $item.attr('data-index')
                if (index === undefined) return

                var checked = $item.prop('checked')
                var method = checked ? 'show' : 'hide'
                $table
                    .find('> thead th:nth-child(' + (+index + 1) + ')')
                    .attr('data-priority', method)[method]()
                    .end()
                    .find('> tbody td:nth-child(' + (+index + 1) + ')')
                    .attr('data-priority', method)[method]()
                    .end()
            })

            return

            var index = $(event.target).attr('data-index')
            if (index === undefined) return

            var checked = $(event.target).prop('checked')
            var method = checked ? 'show' : 'hide'
            $table
                .find('> thead th:nth-child(' + (+index + 1) + ')')
                .attr('data-priority', method)[method]()
                .end()
                .find('> tbody td:nth-child(' + (+index + 1) + ')')
                .attr('data-priority', method)[method]()
                .end()
        }

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
                    $relatedElement.hide()
                })
        }

        function _data($table) {
            return {
                candidates: function() {
                    return _.filter(
                        _.map(
                            $table.find('> thead th'),
                            function(item, index) {
                                var $item = $(item)
                                if (!$item.is('[data-priority]')) return
                                var text = $.trim($item.text())
                                if (!text) return
                                return {
                                    index: index,
                                    name: text
                                }
                            }
                        ),
                        function(item, index) {
                            return !!item
                        }
                    )
                }()
            }
        }

        return priority
    }
)