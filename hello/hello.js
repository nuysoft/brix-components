/* global define */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        'text!./hello.tpl',
        'css!./hello.css'
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
            公共选项：data template
            message

            ### 属性
            公共属性：element moduleId clientId parentClientId childClientIds data template
            message

            ### 方法

            ### 事件
            公共事件：ready destroyed
            say

        */
        return Brix.extend({
            options: {
                message: 'World'
            },
            render: function() {
                this.data = this.data || _.extend({}, _.pick(this.options, 'message'))
                var html = _.template(template, this.data)
                $(this.element).append(html)

                this.delegateBxTypeEvents()
            },
            say: function(message) {
                if (message) this.data.message = message
                this.render()
                $(this.element).trigger('say', message)
            }
        })

    }
)