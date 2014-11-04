/* global define  */
/* global console */
/*
    TODO
        
 */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        'css!./table.css'
    ],
    function(
        $, _,
        Brix
    ) {
        /*
            ### 数据
                {}
            ### 选项
                data template
            ### 属性
                element moduleId clientId parentClientId childClientIds data template
            ### 方法
                .render()
            ### 事件
                ready destroyed
        */
        function table() {}

        var theadCheckboxSelector = 'thead th:first-child input:checkbox'
        var tbodyCheckboxSelector = 'tbody td:first-child input:checkbox'

        _.extend(table.prototype, Brix.prototype, {
            options: {},
            init: function() {
                this.$element = $(this.element)
            },
            render: function() {
                // 不需要渲染，只是事件增强
                // this.data = this.data || _.extend({}, this.options)
                // var html = _.template(template, this)
                // $(this.element).append(html)
                var that = this
                    // 全选，单选
                this.$element
                    .on('click', theadCheckboxSelector, function( /*event*/ ) {
                        that.toggleAll()
                    })
                    .on('click', tbodyCheckboxSelector, tbodyCheckboxSelector, function( /*event*/ ) {
                        that.toggleOne()
                    })

                // 测试事件
                this.on('toggle', function( /*event, values*/ ) {
                    console.log(arguments)
                })
            },
            triggerToggle: function() {
                var that = this
                var values = function() {
                    var values = []
                    var tbodyCheckboxes = that.$element.find(tbodyCheckboxSelector)
                    var checked = tbodyCheckboxes.filter(':checked')
                    _.each(checked, function(item /*, index*/ ) {
                        values.push(item.value)
                    })
                    return values
                }()
                this.trigger('toggle', values)
            },
            toggleAll: function() {
                var theadCheckbox = this.$element.find(theadCheckboxSelector)
                var tbodyCheckboxes = this.$element.find(tbodyCheckboxSelector)
                var checked = theadCheckbox.prop('checked')
                if (tbodyCheckboxes.length) tbodyCheckboxes.prop('checked', checked)
                else theadCheckbox.prop('checked', false)

                _.each(tbodyCheckboxes, function(item /*, index*/ ) {
                    var checked = $(item).prop('checked')
                    $(item).closest('tr')[checked ? 'addClass' : 'removeClass']('active')
                })

                this.triggerToggle()
            },
            toggleOne: function() {
                var theadCheckbox = this.$element.find(theadCheckboxSelector)
                var tbodyCheckboxes = this.$element.find(tbodyCheckboxSelector)
                var checked = tbodyCheckboxes.filter(':checked')
                theadCheckbox.prop('checked', tbodyCheckboxes.length === checked.length)

                _.each(tbodyCheckboxes, function(item /*, index*/ ) {
                    var checked = $(item).prop('checked')
                    $(item).closest('tr')[checked ? 'addClass' : 'removeClass']('active')
                })

                this.triggerToggle()
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

        return table
    }
)