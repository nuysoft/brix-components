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

        _.extend(AreaPicker.prototype, Brix.prototype, {
            options: {
                data: []
            },
            init: function() {
                this.options.data = {
                    id: 'root',
                    name: '全选',
                    children: Area.tree(Area.REGION)
                }
            },
            render: function() {
                var html = _.template(template)(this.options.data)
                $(this.element).append(html)

                linkage(this.element, function() {
                    console.log(arguments)
                })
            }
        })

        return AreaPicker
    }
)