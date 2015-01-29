/* global define  */
/*
    TODO
        
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './linkage.js',
        'css!./table.css'
    ],
    function(
        $, _,
        Brix,
        linkage
    ) {
        /*
            不需要渲染，只是事件增强。
        */
        return Brix.extend({
            options: {},
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