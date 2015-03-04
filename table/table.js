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

    data-column-id

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
            UUID: 0,
            COLUMN: {
                ID: 'column-id',
                FIELD: 'column-field',
                NAME: 'column-name',
                RWD: {
                    RANGE: 'column-rwd-range',
                    LIMIT: 'column-rwd-limit'
                },
                PRIORITY: {
                    TRIGGER: 'column-priority-trigger',
                    STATE: 'column-priority-state',
                    INDEX: 'column-priority-index',
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
                    columnRWDHandler = ColumnRWD(this, this.options, Constant, function(event, state) {
                        that.trigger('change' + ColumnRWD.NAMESPACE, [state])
                    })
                }
                if (this.options[Constant.COLUMN.PRIORITY.TRIGGER]) {
                    columnPriorityHandler = ColumnPriority(this, this.options, Constant, function(event, fields) {
                        that.trigger('change' + ColumnPriority.NAMESPACE, [fields])
                        columnRWDHandler.flush()
                    })
                }

                this.columnRWDHandler = columnRWDHandler
                this.columnPriorityHandler = columnPriorityHandler
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