/* global define, require, document */
/*
    http://jqueryui.com/dialog
 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        './position.js',
        './dialog.tpl.js',
        'css!./dialog.css'
    ],
    function(
        $, _,
        Brix, EventManager,
        position,
        template
    ) {
        /*
            var Dialog = require('components/dialog')
            var content = '\
                <div class="dialog-header">\
                    <h4 class="dialog-title">abc</h4>\
                </div>\
            '
            var dialog = new Dialog({
                content: content,
                modal: true,
                left: 100,
                top: 100
            })
            dialog.on('open.dialog',function(){
                debugger
            })
            dialog.open()

            // 多个浮层
            var Dialog = require('components/dialog')
            var _ = require('underscore')
            var options = {
                modal: true,
                singleton: false,
                top: 400
            }

            new Dialog(_.extend({
                content: Math.random(),
                left: 100
            }, options)).open()

            new Dialog(_.extend({
                content: Math.random(),
                left: 200
            }, options)).open()

            new Dialog(_.extend({
                content: Math.random(),
                left: 300
            }, options)).open()
         */

        var TRANSITION_DURATION = 150
        var EASING = 'swing'
        var NAMESPACE = '.dialog'
        var DIALOG_OPENED_CACHE = []

        function Dialog() {
            // 支持构造函数
            if (arguments.length) {
                this.options = _.extend({}, this.options, arguments[0])
                this.init()
                this.render()
            }
        }

        _.extend(Dialog.prototype, Brix.prototype, {
            options: {
                placement: 'right', // top bottom left right
                align: 'top', // left right top bottom
                left: undefined,
                top: undefined,
                width: 'auto',
                height: 'auto',
                offset: {
                    left: 0,
                    top: 0
                },

                content: '',

                closable: true, // 是否可关闭
                modal: false, // 是否模块对话框
                singleton: true // 是否单例模式
            },
            init: function() {
                this.$element = $(this.element || this.options.element)
                this.$manager = new EventManager('bx-')

                // 支持自定义 CSS 样式
                if (this.options.css) require('css!' + this.options.css)

                // 为文本内容自动加上样式 dialog-body
                if (('' + this.options.content).indexOf('<') === -1) {
                    this.options.content =
                        '<div class="dialog-body">' +
                        this.options.content +
                        '<div>'
                }

                return this
            },
            render: function() {
                this.fill()
                this.$manager.delegate(this.$element, this)
            },
            destroy: function() {
                // 先关闭，把当前实例从缓存 DIALOG_OPENED_CACHE 中移除
                this.close()

                var type = 'keyup.dialog_autohide_' + this.clientId
                if (!DIALOG_OPENED_CACHE.length) $(document.body).off(type) // 只有当窗口全部关闭后，才能移除

                if (this.$manager) this.$manager.undelegate(this.$element)
                this.$relatedElement.remove()
            },
            fill: function() {
                var html = _.template(template)(this.options)

                // 单例模式：共用一个浮层 div.dialog.dialog-singleton
                if (this.options.singleton) {
                    this.$relatedElement = $('div.dialog.dialog-singleton')
                    if (!this.$relatedElement.length) {
                        this.$relatedElement = $(html).appendTo(document.body).hide()
                    }
                }

                // 非单例模式：初始化
                if (!this.options.singleton) {
                    if (!this.$relatedElement || !this.$relatedElement.length) {
                        this.$relatedElement = $(html).removeClass('dialog-singleton')
                            .appendTo(document.body).hide()
                    }
                }

                this.$relatedElement
                    .removeClass('dialog-top dialog-bottom dialog-left dialog-right')
                    .addClass('dialog-' + this.options.placement)
                    .find('.dialog-close')[
                        this.options.closable ? 'removeClass' : 'addClass'
                    ]('hide').end()
                    .find('.dialog-content').html(this.options.content)

                this.$relatedElement.css({
                    width: this.options.width,
                    height: this.options.height
                })

                if (this.options.modal) {
                    this.$backdropElement = $('.dialog-backdrop')
                    if (!this.$backdropElement.length) {
                        this.$backdropElement = $('<div class="dialog-backdrop"></div>').hide()
                            .appendTo(document.body)
                    }
                }

                this.$manager.delegate(this.$relatedElement, this)
                return this
            },
            open: function() {
                if (!this.element &&
                    this.options.element &&
                    (this.options.element !== this.$element[0])
                ) this.$element = $(this.options.element)

                this.fill()

                var offset = this._offset()
                this.$relatedElement.show()
                    .stop()
                    .css(
                        position.start(this.$relatedElement, offset)
                    )
                    .animate(
                        position.end(this.$relatedElement, offset),
                        TRANSITION_DURATION,
                        EASING
                    )

                if (this.options.modal) {
                    $(document.body).addClass('modal-open')
                    this.$backdropElement.show()
                }

                this._autoHide()

                // 记录打开的浮层
                DIALOG_OPENED_CACHE.push(this)

                this.trigger('open' + NAMESPACE)

                return this
            },
            close: function() {
                if (!this.$relatedElement || !this.$relatedElement.length) return this

                var that = this
                var offset = this._offset()
                this.$relatedElement
                    .stop()
                    .animate(
                        position.start(this.$relatedElement, offset),
                        TRANSITION_DURATION,
                        EASING,
                        function() {
                            that.$relatedElement.hide()
                        }
                    )

                // 从缓存中移除当前实例，包括多次打开的实例
                DIALOG_OPENED_CACHE = _.without(DIALOG_OPENED_CACHE, this)

                if (this.options.modal) {
                    // 是否还有模态浮层：只有当前全部模态浮层都关闭后，才能关闭 .dialog-backdrop
                    var isHasOpenedModal = _.filter(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
                        if (item.options.modal) return item
                    }).length
                    if (!isHasOpenedModal) {
                        $(document.body).removeClass('modal-open')
                        this.$backdropElement.hide()
                    }
                }

                this.trigger('close' + NAMESPACE)
                return this
            },
            _offset: function() {
                var offset = this.options.left !== undefined && this.options.top !== undefined ? {
                    left: this.options.left,
                    top: this.options.top
                } : position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                offset = {
                    left: offset.left + (this.options.offset.left || 0),
                    top: offset.top + (this.options.offset.top || 0)
                }
                return offset
            },
            _autoHide: function() {
                var that = this
                var type = 'keyup.dialog_autohide_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.keyCode === 27) {
                            // 优先关闭最后打开的浮层
                            var dialog = DIALOG_OPENED_CACHE.pop()
                            if (dialog) dialog.close()
                            else that.close()
                        }
                    })
            }
        })

        return Dialog
            // return Brix.extend({})
    }
)