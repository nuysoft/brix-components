/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './suggest.tpl.js',
        'less!./suggest.less'
    ],
    function(
        $, _,
        Brix,
        template
    ) {
        /*
            input 自动适配宽度，避免意外这行
            rich input
                tag input
                suggest 绑定在 inpupt 上

         */
        function Suggest() {}

        var NAMESPACE = '.suggest'

        _.extend(Suggest.prototype, Brix.prototype, {
            options: {
                data: [
                    'Action',
                    'Another action',
                    'Something else here',
                    'Separated link'
                ]
            },
            init: function() {},
            render: function() {
                var that = this
                this.$element = $(this.element)

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)

                this.$element.off('keyup' + NAMESPACE)
                    .on('keyup' + NAMESPACE, function(event) {
                        that.trigger('change.suggest', event.target.value)
                    })
            },
            fix: function() {
                var menu = this.$relatedElement.find('.dropdown-menu') // TODO
                var html = _.template(template)(this.options)
                $(html).find('.dropdown-menu').replaceAll(menu)
            },
            data: function(data) {
                this.options.data = data
                this.fix()
            }
        })

        return Suggest
    }
)