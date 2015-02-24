/* global define  */
/*
    Responsive tables
        http://gergeo.se/RWD-Table-Patterns/#features
    
    data-column-rwd-range
    data-column-rwd-limit
    data-column-priority-trigger

        data-column-priority
        data-column-priority-state
        data-column-priority-name

    > RWD responsive web design
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './linkage.js',
        './column-rwd.js',
        './column-priority.js',
        'css!./table.css',
        'css!../dialog/dialog.css'
    ],
    function(
        $, _,
        Brix,
        linkage,
        ColumnRWD,
        ColumnPriority
    ) {
        /*
            不需要渲染，只是事件增强。
        */

        var NAMESPACE = '.table'
        var Constant = {
            COLUMN: {
                RWD: {
                    TAG: 'column-rwd',
                    RANGE: 'column-rwd-range',
                    LIMIT: 'column-rwd-limit'
                },
                PRIORITY: {
                    TAG: 'column-priority',
                    TRIGGER: 'column-priority-trigger',
                    STATE: 'column-priority-state',
                    NAME: 'column-priority-name',
                    PLACEMENT: 'column-priority-placement',
                    ALIGN: 'column-priority-align'
                }
            }
        }

        function Table() {}

        _.extend(Table.prototype, Brix.prototype, {
            options: {},
            init: function() {
                this.$element = $(this.element)
            },
            render: function() {
                var that = this

                /* jshint unused:false */
                linkage(this.element, function(event, values, target) {
                    that.trigger('toggle' + NAMESPACE, [values, target])
                    that.contextual()
                })

                var columnRWDHandler, columnPriorityHandler
                if (this.options[Constant.COLUMN.RWD.RANGE]) {
                    columnRWDHandler = ColumnRWD(this, this.options, Constant, function() {})
                }
                if (this.options[Constant.COLUMN.PRIORITY.TRIGGER]) {
                    columnPriorityHandler = ColumnPriority(this, this.options, Constant, function() {
                        if (!columnRWDHandler) return
                        columnRWDHandler.flush()
                    })
                }
            },
            contextual: function() {
                _.each(this.$element.find('input:checkbox'), function(item /*, index*/ ) {
                    var checked = $(item).prop('checked')
                    $(item).closest('tr')[
                        checked ? 'addClass' : 'removeClass'
                    ]('active')
                })
            }
        })

        return Table

        // return Brix.extend({})
    }
)