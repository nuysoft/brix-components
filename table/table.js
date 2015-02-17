/* global define  */
/*
    Responsive tables
        http://gergeo.se/RWD-Table-Patterns/#features
        
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './linkage.js',
        './column.js',
        './priority.js',
        'css!./table.css',
        'css!../dialog/dialog.css'
    ],
    function(
        $, _,
        Brix,
        linkage,
        column,
        priority
    ) {
        /*
            不需要渲染，只是事件增强。
        */
        return Brix.extend({
            options: {
                column: '',
                range: [],
                limit: 0
            },
            init: function() {
                this.$element = $(this.element)
            },
            render: function() {
                var that = this

                /* jshint unused:false */
                linkage(this.element, function(event, values, target) {
                    that.trigger('toggle.table', [values, target])
                    that.contextual()
                })

                var columnHandler, priorityHandler
                if (this.options['column-range']) {
                    columnHandler = column(this, this.options, function() {})
                }
                if (this.options['priority-trigger']) {
                    priorityHandler = priority(this, this.options, function() {
                        if (!columnHandler) return
                        columnHandler.flush()
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
    }
)