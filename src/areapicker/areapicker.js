/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base', '../table/linkage/linkage.js',
        './area.js',
        './areapicker.tpl.js',
        'components/dialog'
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
                type: 'TIER', // REGION TIER
                data: undefined
            },
            init: function() {
                // 尝试从 innerText 中解析数据
                /* jshint evil:true */
                if (!this.options.data) {
                    var text = $.trim(this.element.innerText)
                    this.options.data = eval(
                        '(function(){ return Array.prototype.slice.call(arguments)[0] })(' + text + ')'
                    )
                    this.element.innerText = ''
                }

                this.options.data = {
                    id: 'root',
                    name: '全部选择',
                    children: Area.tree(this.options.data || Area.REGION)
                }
            },
            render: function() {
                var that = this
                this.$element = $(this.element)

                var html = _.template(template)(this.options.data)
                this.$element.append(html)

                /* jshint unused:false */
                linkage(this.$element, function(event, values, target) {
                    that.trigger('toggle.areapicker', [values, target])
                })
            }
        })

        return AreaPicker
    }
)