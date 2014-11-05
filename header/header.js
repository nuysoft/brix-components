/* global define */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        './header.tpl.js',
        'css!./header.css'
    ],
    function(
        $, _,
        Brix,
        template
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
        function Header() {}

        _.extend(Header.prototype, Brix.prototype, {
            options: {},
            render: function() {
                this.data = this.data || _.extend({}, this.options)
                var html = _.template(template, this.data)
                $(this.element).append(html)
            }
        })

        return Header
    }
)