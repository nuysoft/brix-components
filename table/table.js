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

        var tbodyCheckboxSelector = 'input:checkbox'

        return Brix.extend({
            options: {},
            init: function() {
                this.$element = $(this.element)
            },
            render: function() {
                var that = this
                linkage(this.element, function() {
                    that.triggerToggle()
                })
            },
            triggerToggle: function() {
                var that = this
                var values = function() {
                    var values = []
                    var tbodyCheckboxes = that.$element.find(tbodyCheckboxSelector)
                    var checked = tbodyCheckboxes.filter(':checked')
                    _.each(checked, function(item /*, index*/ ) {
                        var value = $(item).attr('value')
                        if (value !== undefined) values.push(value)
                    })
                    that.contextual(tbodyCheckboxes)
                    return values
                }()
                this.trigger('toggle.table', [values])
            },
            contextual: function(tbodyCheckboxes) {
                _.each(tbodyCheckboxes, function(item /*, index*/ ) {
                    var checked = $(item).prop('checked')
                    $(item).closest('tr')[
                        checked ? 'addClass' : 'removeClass'
                    ]('active')
                })
            }
        })
    }
)