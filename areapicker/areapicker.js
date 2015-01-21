/* global define, console */
define(
    [
        'jquery', 'underscore',
        'brix/base', '../table/linkage.js',
        './area.js',
        './areapicker.tpl.js',
        'css!./areapicker.css'
    ],
    function(
        $, _,
        Brix, linkage,
        Area,
        template
    ) {

        function AreaPicker() {}

        // AreaPicker.data

        _.extend(AreaPicker.prototype, Brix.prototype, {
            options: {
                type: 'TIER', // REGION TIER
                data: []
            },
            init: function() {
                this.options.data = {
                    id: 'root',
                    name: '全选',
                    children: Area.tree(AreaPicker.data || Area.REGION)
                }
            },
            render: function() {
                var that = this
                this.$element = $(this.element)

                var html = _.template(template)(this.options.data)
                this.$element.append(html)

                linkage(this.$element, function() {
                    var values = function() {
                        var values = []
                        var checkboxes = that.$element.find('input:checkbox')
                        var checked = checkboxes.filter(':checked')
                        _.each(checked, function(item /*, index*/ ) {
                            var value = $(item).attr('value')
                            if (value !== undefined) values.push(value)
                        })
                        return values
                    }()
                    that.trigger('toggle.areapicker', [values])
                    console.log(values)
                })
            }
        })

        return AreaPicker
    }
)