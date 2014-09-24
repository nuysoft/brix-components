define(
    [
        'jquery', 'underscore',
        'base/brix',
        'text!./modal.tpl',
        'less!./modal.less'
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
                element relatedElement moduleId clientId parentClientId childClientIds data template
            ### 方法
                .render()
            ### 事件
                ready destroyed
        */
        function modal(options) {}

        _.extend(modal.prototype, Brix.prototype, {
            options: {
                title: Math.random(),
                body: Math.random()
            },
            render: function() {
                var that = this
                this.data = this.data || _.extend({}, this.options)
                var html = _.template(template, this.data)
                var relatedElement = $(html).insertAfter(this.element)
                this.relatedElement = relatedElement[0]
                    
                this.delegateBxTypeEvents(this.element)
                this.delegateBxTypeEvents(this.relatedElement)

                // $(this.element).on('click', function() {
                //     // that.toggle()
                // })

                var type = 'keyup.modal_' + this.clientId
                $(document.body)
                    .off(type)
                    .on(type, function(event) {
                        if (event.which == 27) that.hide()
                    })
            },
            toggle: function() {
                $(this.relatedElement).toggle().toggleClass('in')
                $(document.body).toggleClass('modal-open')
            },
            show: function() {
                $(this.relatedElement).show().addClass('in')
                $(document.body).addClass('modal-open')
            },
            hide: function() {
                $(this.relatedElement).hide().removeClass('in')
                $(document.body).removeClass('modal-open')
            }
        })

        return modal
    }
)