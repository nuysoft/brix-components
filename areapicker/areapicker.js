/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base', 'brix/event', '../table/linkage.js',
        './area.js',
        './areapicker.tpl.js',
        'css!./areapicker.css'
    ],
    function(
        $, _,
        Brix, EventManager, linkage,
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
                    children: tree(Area.REGION)
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

        function tree(list) {
            var mapped = {}
            _.each(list, function(item, index) {
                mapped[item.id] = item
            })

            var result = []
            _.each(list, function(item, index) {
                if (item.pid === undefined) {
                    result.push(item)
                    return
                }
                var parent = mapped[item.pid]
                if (!parent.children) parent.children = []
                parent.children.push(item)
            })
            return result
        }

        return AreaPicker
    }
)