/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=Dialog
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/dialog/
        Temporary

    # Dialog

    对话框。

    ```js
    new Dialog( options )
    ```

    ## 配置

    配置项    | 类型    | 默认值    | 说明
    :-------- | :------ | :-------- | :----------
    placement | string  | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
    align     | string  | `''`      | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
    left      | int     | -         | 指定浮层的距左坐标。
    top       | int     | -         | 指定浮层的距上坐标。
    width     | int     | `'auto'`  | 指定浮层的宽度。
    height    | string  | `''`      | 指定浮层的高度。
    offset    | object  | `{}`      | 指定浮层的偏移，可以含有两个属性：`left`、`top`。
    content   | string  | `''`      | 指定浮层的内容。
    closable  | boolean | `true`    | 指定浮层是否可关闭。
    modal     | boolean | `false`   | 指定浮层是否模态对话框。
    singleton | boolean | `true`    | 指定浮层是否单例模式。

    ## 方法

    * .open()
        打开窗口。
    * .close()
        关闭窗口。

    ## 事件

    事件类型     | 说明
    :----------- | :----------
    open.dialog  | 当窗口打开时被触发。
    close.dialog | 当窗口关闭时被触发。
 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        './position.js',
        './dialog.tpl.js'
    ],
    function(
        $, _,
        Brix, EventManager,
        position,
        template
    ) {
        var TRANSITION_DURATION = 150
        var EASING = 'swing'
        var NAMESPACE = '.dialog'
        var DIALOG_OPENED_CACHE = []
        var DIALOG_ALL_CACHE = []
        var STATE = {
            PENDING: 'pending',
            OPENED: 'opened',
            CLOSED: 'closed'
        }

        function Dialog() {
            // 支持构造函数
            if (arguments.length) {
                this.options = _.extend({}, this.options, arguments[0])
                this.init()
                this.render()
            }

            // 压入缓存 DIALOG_ALL_CACHE
            DIALOG_ALL_CACHE.push(this)
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

                // { data-class | data-className | className: ''}
                className: '',

                content: '',

                closable: true, // 是否可关闭
                movable: false, // 是否可移动
                modal: false, // 是否模态对话框 http://baike.baidu.com/view/3148035.htm
                singleton: true // 是否单例模式
            },
            state: STATE.PENDING, // pending opened closed
            init: function() {
                this.$element = $(this.element || this.options.element)
                this.$manager = new EventManager('bx-')

                // 支持自定义外联 CSS 样式，data-css="dialog.css"
                if (this.options.css && _.isString(this.options.css)) window.require(['css!' + this.options.css])

                // data-class => data-className
                if (this.options.class) this.options.className = this.options.class

                // 为文本内容自动加上样式 dialog-body
                if (('' + this.options.content).indexOf('<') === -1) {
                    this.options.content =
                        '<div class="dialog-body">' +
                        this.options.content +
                        '<div>'
                }
            },
            render: function() {
                this.fill()
                this.$manager.delegate(this.$element, this)
            },
            destroy: function() {
                // 先关闭，把当前实例从缓存 DIALOG_OPENED_CACHE 中移除
                this.close()

                // 从缓存 DIALOG_ALL_CACHE 中移除
                DIALOG_ALL_CACHE = _.without(DIALOG_ALL_CACHE, this)

                var type = 'keyup.dialog_autohide_' + this.clientId
                if (!DIALOG_OPENED_CACHE.length) $(document.body).off(type) // 只有当窗口全部关闭后，才能移除

                this.$manager.undelegate(this.$element)
                this.$manager.undelegate(this.$relatedElement)

                this.$relatedElement.remove()
                this.$relatedElement = null
                this.$backdropElement = null
            },
            fill: function() {
                var html = _.template(template)(this.options)

                // 初始化节点
                if (!this.$relatedElement) {
                    this.$relatedElement = $(html).appendTo(document.body).hide()
                }

                // 单例模式 data-singleton
                // 不共用浮层 div.dialog.dialog-singleton，但是会关闭其他单例浮层
                if (!this.options.singleton) {
                    this.$relatedElement.removeClass('dialog-singleton')
                }

                // data-content
                this.$relatedElement
                    .find('.dialog-content')
                    .html(this.options.content)

                // 宽高 width height
                this.$relatedElement.css({
                    width: this.options.width,
                    height: this.options.height
                })

                // 总是初始化遮罩层
                this.$backdropElement = $('.dialog-backdrop')
                if (!this.$backdropElement.length) {
                    this.$backdropElement = $('<div class="dialog-backdrop"></div>').hide()
                        .appendTo(document.body)
                }

                // 是否模态对话框 modal
                if (this.options.modal) {}

                // 类样式 data-className
                if (this.options.className) {
                    this.$relatedElement.addClass(this.options.className)
                }

                // 内联 CSS 样式，data-css="{ position: 'fixed' }"
                if (this.options.css && _.isObject(this.options.css)) {
                    this.$relatedElement.css(this.options.css)
                }

                this.$manager.delegate(this.$relatedElement, this)
                return this
            },
            open: function() {
                // 触发浮层的节点被修改
                if (!this.element &&
                    this.options.element &&
                    (this.options.element !== this.$element[0])
                ) this.$element = $(this.options.element)

                // 单例模式：先关闭其他所有单例模式的浮层
                if (this.options.singleton) {
                    _.each(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
                        if (item.options.singleton) item.close()
                    })
                }

                this.fill()
                this._zIndex('open')
                this._topmost()
                this._move()

                // 模态模式：用户必须先操作模态对话框
                if (this.options.modal) {
                    $(document.body).addClass('modal-open')
                    this.$backdropElement
                        .show()
                        .css(
                            'z-index', +this.$relatedElement.css('z-index') - 1
                        )
                }

                // 从右侧移入
                var offset = this._offset()
                this.$relatedElement.show()
                    .stop()
                    .css(
                        position.start(this.$relatedElement, offset /*, this.options.placement*/ )
                    )
                    .animate(
                        position.end(this.$relatedElement, offset),
                        TRANSITION_DURATION,
                        EASING
                    )

                this._autoHide()

                // 记录打开的浮层
                DIALOG_OPENED_CACHE.push(this)

                this.trigger('open' + NAMESPACE)

                this.state = STATE.OPENED

                return this
            },
            close: function() {
                if (!this.$relatedElement || !this.$relatedElement.length) return this

                if (this.state === STATE.CLOSED) return this

                var closeEvent = $.Event('close' + NAMESPACE)
                this.trigger(closeEvent)
                if (closeEvent.isDefaultPrevented()) return

                var that = this
                var offset = this._offset()
                this.$relatedElement
                    .stop()
                    .animate(
                        position.start(this.$relatedElement, offset),
                        TRANSITION_DURATION,
                        EASING,
                        function() {
                            if (that.$relatedElement) that.$relatedElement.hide()
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

                this._zIndex('close')

                this.state = STATE.CLOSED

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
                var type = 'keyup.dialog_autohide_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.keyCode === 27) {
                            // 优先关闭最后打开的、可关闭的浮层
                            // X DIALOG_OPENED_CACHE.pop() 不在这里移除，而是在 close() 中移除。
                            var dialog = DIALOG_OPENED_CACHE[DIALOG_OPENED_CACHE.length - 1]
                            if (dialog && dialog.options.closable) dialog.close()
                        }
                    })

                return this
            },
            // 修正 z-index
            _zIndex: function(when) {
                if (!DIALOG_OPENED_CACHE.length) return

                // 最顶层的浮层
                var topmost = _.max(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
                    return +item.$relatedElement.css('z-index')
                })
                var zIndex = +topmost.$relatedElement.css('z-index')
                var target

                switch (when) {
                    case 'open':
                        target = this
                        if (target === topmost) return
                        break
                    case 'close':
                        // 最后弹出的浮层
                        target = DIALOG_OPENED_CACHE[DIALOG_OPENED_CACHE.length - 1]
                        break
                }

                if (target.$backdropElement) {
                    target.$backdropElement.css('z-index', zIndex + 1)
                }
                target.$relatedElement.css('z-index', zIndex + 2)

                return this
            },
            _topmost: function() {
                var that = this
                var type = 'mousedown.dialog_topmost_' + this.clientId
                this.$relatedElement.off(type)
                    .on(type, function( /*event*/ ) {
                        that._zIndex('open')
                        DIALOG_OPENED_CACHE.push(that)
                    })

                return this
            },
            _move: function() {
                if (!this.options.movable) return this

                var that = this
                var mousedown = 'mousedown.dialog_move_' + this.clientId
                var mousemove = 'mousemove.dialog_move_' + this.clientId
                var mouseup = 'mouseup.dialog_move_' + this.clientId
                var $body = $(document.body)
                var $dialogHeader = this.$relatedElement.find('.dialog-header')

                $dialogHeader.addClass('cursor-move')

                $dialogHeader.off(mousedown)
                    .on(mousedown, function(event) {
                        var offset = $dialogHeader.offset()
                        var diff = {
                            left: event.pageX - offset.left,
                            top: event.pageY - offset.top
                        }
                        $body.on(mousemove, function(event) {
                            that.$relatedElement.offset({
                                left: event.pageX - diff.left,
                                top: event.pageY - diff.top
                            })
                            return false
                        })
                        $body.on(mouseup, function( /*event*/ ) {
                            $body.off(mousemove)
                            $body.off(mouseup)
                            return false
                        })
                    })

                return this
            }
        })

        // 便捷方法。新建一个浮层。
        Dialog.open = function(options) {
            return (new Dialog(options)).open()
        }

        // 便捷方法。关闭最近打开的浮层。
        Dialog.close = function() {
            var dialog = DIALOG_OPENED_CACHE.pop()
            if (dialog) dialog.close()
        }

        // 便捷方法。关闭所有打开的浮层
        Dialog.closeAll = function() {
            _.each(DIALOG_OPENED_CACHE, function(item /*, index*/ ) {
                item.close()
            })
            return this
        }

        // 便捷方法。销毁所有浮层。
        Dialog.destroy = function() {
            _.each(DIALOG_ALL_CACHE, function(item /*, index*/ ) {
                item.destroy()
            })
            return this
        }

        return Dialog
    }
)

/*
    http://jqueryui.com/dialog

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