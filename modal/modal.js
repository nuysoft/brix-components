/* global define, document, setTimeout */
/*
    http://zombiej.github.io/bootstrap-components-3.0/
 */
define(
    [
        'jquery', 'underscore',
        'brix/base', 'brix/event',
        './modal.tpl.js'
    ],
    function(
        $, _,
        Brix, EventManager,
        template
    ) {
        var TRANSITION_DURATION = 150

        return Brix.extend({
            options: {
                title: Math.random(),
                body: Math.random()
            },
            init: function() {
                this.$element = $(this.element)
            },
            render: function() {
                var that = this
                var manager = new EventManager('bx-')

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)
                this.$dialog = this.$relatedElement.find('.modal-dialog')

                this.$backdropElement = $('.modal-backdrop')
                if (!this.$backdropElement.length) {
                    this.$backdropElement = $('<div class="modal-backdrop fade"></div>').hide()
                        .appendTo(document.body)
                }

                manager.delegate(this.$element, this)
                manager.delegate(this.$relatedElement, this)

                // 显示对话框
                this.$element.on('click', function() {
                    that.show()
                })

                var type = 'keyup.modal_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.which === 27) that.hide()
                    })
            },
            show: function() {
                $(document.body).addClass('modal-open')

                var that = this
                this.$relatedElement.show()
                this.$backdropElement.show()
                setTimeout(function() {
                    that.$relatedElement.addClass('in')
                    that.$backdropElement.addClass('in')
                }, TRANSITION_DURATION)
            },
            hide: function() {
                $(document.body).removeClass('modal-open')

                var that = this
                this.$relatedElement.removeClass('in')
                this.$backdropElement.removeClass('in')
                setTimeout(function() {
                    that.$relatedElement.hide()
                    that.$backdropElement.hide()

                }, TRANSITION_DURATION)
            }
        })
    }
)