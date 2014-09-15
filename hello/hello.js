define(
    [
        'jquery', 'underscore',
        'base/brix',
        'text!./hello.tpl',
        'less!./hello.less'
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

            ### 属性
            公共属性：element moduleId clientId parentClientId childClientIds data template

            ### 方法

            ### 事件
            公共事件：ready destroyed

        */
        function Hello(options) {

        }
        _.extend(Hello.prototype, Brix.prototype, {
            render: function() {
                // throw new Error('hello...')
                var that = this
                var $element = $(this.element)
                $element.append(template)
                this.delegateBxTypeEvents()
            },
            say:function(){
                console.log(this, 'Hello World!')
            }
        })
        return Hello
    }
)