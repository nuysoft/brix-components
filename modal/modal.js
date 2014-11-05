/* global define, document, setTimeout */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        './modal.tpl.js',
        'css!./modal.css'
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

            http://zombiej.github.io/bootstrap-components-3.0/
        */
        function modal() {}

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

                var backdropElement = $('.modal-backdrop')
                if (!backdropElement.length) backdropElement = $('<div class="modal-backdrop fade"></div>').hide().appendTo(document.body)
                this.backdropElement = backdropElement[0]

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
                var target = $([this.relatedElement, this.backdropElement])
                target.toggle()
                setTimeout(function() {
                    target.toggleClass('in')
                }, 150)
                $(document.body).toggleClass('modal-open')
            },
            show: function() {
                var target = $([this.relatedElement, this.backdropElement])
                target.show()
                setTimeout(function() {
                    target.addClass('in')
                }, 150)
                $(document.body).addClass('modal-open')
            },
            hide: function() {
                var target = $([this.relatedElement, this.backdropElement])
                target.removeClass('in')
                setTimeout(function() {
                    target.hide()
                    $(document.body).removeClass('modal-open')
                }, 150)

            }
        })

        return modal
    }
)