/* global define, require, document */
define(
    [
        'jquery', 'underscore',
        'components/base',
        '../dialog/position.js',
        './suggest.tpl.js',
        './suggest.item.tpl.js',
        'css!./suggest.css'
    ],
    function(
        $, _,
        Brix,
        position,
        template,
        itemTemplate
    ) {
        /*
            input 自动适配宽度，避免意外这行
            rich input
                tag input
                suggest 绑定在 inpupt 上

         */
        function Suggest() {}

        var NAMESPACE = '.suggest'
        var NAMESPACE_INPUT = '.input'
        var NAMESPACE_DONE = '.done'
        var NAMESPACE_INTERNAL = '.internal'

        _.extend(Suggest.prototype, Brix.prototype, {
            options: {
                template: '',
                data: []
            },
            init: function() {
                var defer = $.Deferred()

                // 支持自定义 HTML 模板 template
                // 支持自定义 CSS 样式
                var deps = []
                var customItemTemplate = this.options.template
                var customCSS = this.options.css
                if (customItemTemplate) deps.push(customItemTemplate)
                if (customCSS) {
                    if (customCSS.indexOf('css!') !== 0) customCSS = 'css!' + customCSS
                    deps.push(customCSS)
                }
                require(deps, function() {
                    if (customItemTemplate) itemTemplate = arguments[0]
                    defer.resolve()
                })

                if (deps.length) return defer.promise()
            },
            render: function() {
                this.$element = $(this.element)

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)
                this.$menu = this.$relatedElement.find('.dropdown-menu')
                this._fill(this.options.data)._beautify()

                this._bindEvent()
            },
            data: function(data) {
                if (!data) return this.options.data

                this.options.data = data
                this._fill(data)._beautify()
            },
            val: function(val) {
                if (val === undefined) return this.$element.val()

                this.$element.val(val)
                return this
            },
            open: function() {
                this.$relatedElement.show()
                return this
            },
            close: function() {
                this.$relatedElement.hide()
                return this
            },
            focus: function() {
                this.$element.focus()
                return this
            },
            blur: function() {
                this.$element.blur()
                return this
            },
            _bindEvent: function() {
                var that = this
                this.$element
                    .off('keyup' + NAMESPACE + NAMESPACE_INTERNAL)
                    .on('keyup' + NAMESPACE + NAMESPACE_INTERNAL, function(event) {
                        // enter up down esc
                        if (that._handlerHooks[event.which]) {
                            that._handler(event)
                                // event.preventDefault()
                            return
                        }
                        that._sos(event.target.value)
                    })
                    .off('click' + NAMESPACE + NAMESPACE_INTERNAL)
                    .on('click' + NAMESPACE + NAMESPACE_INTERNAL, function(event) {
                        that._sos(event.target.value)
                    })
                this.$relatedElement
                    .off('click' + NAMESPACE + NAMESPACE_INTERNAL)
                    .on('click' + NAMESPACE + NAMESPACE_INTERNAL, '.dropdown-menu > li', function(event) {
                        that._moveTo($(event.currentTarget).index())
                        that._select()
                    })

                // 如果点击其他区域，自动提关闭示浮层。
                $(document.body)
                    .off('click' + NAMESPACE + '_' + this.clientId)
                    .on('click' + NAMESPACE + '_' + this.clientId, function(event) {
                        if (that.element === event.target) return
                        if (that.$relatedElement.has(event.target).length) return
                        that.close()
                    })
            },
            _sos: function(value) {
                this.trigger('change' + NAMESPACE + NAMESPACE_INPUT, value)
            },
            _handler: function(event) {
                var items = this._items()
                this._handlerHooks[event.which].call(this, event, items.all, items.active, items.index)
            },
            _items: function() {
                var items = this.$menu.find('> li')
                var active = items.filter('.active')
                var index = items.index(active)
                return {
                    all: items,
                    active: active,
                    index: index
                }
            },
            /* jshint unused:false */
            _handlerHooks: {
                // up
                38: function(event, items, active, index) {
                    this._moveTo(items, active, --index)
                },
                // down
                40: function(event, items, active, index) {
                    if (!this.$menu.is(':visible')) {
                        this._fill(this.options.data)._beautify()
                        return
                    }
                    this._moveTo(items, active, ++index)
                },
                // enter
                13: function(event, items, active, index) {
                    if(!this.$menu.is(':visible'))return
                    this._select(items, active, index)
                },
                // esc
                27: function(event, items, active, index) {
                    this.close()
                }
            },
            _select: function(items, active, index) {
                // _select()
                if (!items) {
                    var mapped = this._items()
                    items = mapped.items
                    active = mapped.active
                    index = mapped.index
                }

                var value = $.trim(active.text())
                this.$element.val(value)

                var type = 'change' + NAMESPACE + NAMESPACE_DONE
                var event = $.Event(type, {
                    target: this.element
                })
                this.trigger(event, value)

                // TODO 自动在组件原始节点上触发 change 事件
                // this.$element.trigger('change')

                this.close().focus()

                return this
            },
            _moveTo: function(items, active, index) {
                // _moveTo( index )
                if (!active && !index) {
                    index = items

                    var mapped = this._items()
                    items = mapped.all
                    active = mapped.active
                }

                index = (index + items.length) % items.length
                active.removeClass('active')
                items.eq(index).addClass('active')

                return this
            },
            _beautify: function() {
                this.$relatedElement[
                    (this.options.data && this.options.data.length) ? 'show' : 'hide'
                ]()

                var offset = position(this.$element, this.$relatedElement, 'bottom', 'left')
                this.$relatedElement.offset(offset)

                return this
            },
            _fill: function(data) {
                var that = this
                var value = this.val()

                var itemContent
                var compiled = _.template(itemTemplate)
                var html = _.map(data, function(item, index) {
                    itemContent = compiled({
                        data: that._highlight(item, value)
                    })
                    return '<li>' + itemContent + '</li>'
                }).join('')

                this.$menu
                    .empty()
                    .html(html)
                    .find('> li:first-child').addClass('active')

                return this
            },
            _highlight: function(item, value) {
                if (!value) return item

                var value_re = new RegExp(value, 'ig')
                return ('' + item).replace(value_re, function(matched) {
                    return '<span class="highlight">' + matched + '</span>'
                })
            }
        })

        return Suggest
    }
)