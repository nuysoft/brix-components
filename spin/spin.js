/* global define */
/*
    Reference:
        [A collection of loading indicators animated with CSS](http://tobiasahlin.com/spinkit/)
        https://github.com/fgnass/spin.js
        http://css-spinners.com/#/spinners/
        http://pasqualevitiello.github.io/Tumblr-Style-Cog-Spinners/#
            
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './spin.tpl.js',
        'css!./spin.css'
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
        function Spin() {}

        _.extend(Spin.prototype, Brix.prototype, {
            options: {
                type: 'three-bounce'
            },
            render: function() {
                this.data = this.data || _.extend({}, this.options)
                var html = _.template(template)(this.data)
                $(this.element).addClass('spin').append(html)
            }
        })

        return Spin
    }
)