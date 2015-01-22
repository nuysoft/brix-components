/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        '../dialog/position.js',
        './suggest.tpl.js',
        'less!./suggest.less'
    ],
    function(
        $, _,
        Brix,
        position,
        template
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

        _.extend(Suggest.prototype, Brix.prototype, {
            options: {
                data: []
            },
            init: function() {},
            render: function() {
                var that = this
                this.$element = $(this.element)

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)
                this._fix(this.options.data)._beautify()

                this.$element.off('keyup' + NAMESPACE)
                    .on('keyup' + NAMESPACE, function(event) {
                        console.log(event.type, event.namespace)
                            // enter up down
                        if (_.include([13, 37, 38, 39, 40], event.which)) {
                            that._handler(event)
                            event.preventDefault()
                            return
                        }
                        that.trigger('change' + NAMESPACE + NAMESPACE_INPUT, event.target.value)
                    })
                    .on('focus' + NAMESPACE, function(event) {
                        that.trigger('change' + NAMESPACE + NAMESPACE_INPUT, event.target.value)
                    })

                this.$relatedElement.on('click', '.dropdown-menu li', function(event) {
                    $(event.currentTarget).addClass('active')
                        .siblings().removeClass('active')
                    event.which = 13
                    that._handler(event)
                    that.focus()
                })

                var type = 'click' + NAMESPACE + '_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (that.$element[0] === event.target) return
                        if (that.$relatedElement.has(event.target).length) return
                        that.hide()
                    })
            },
            data: function(data) {
                if (!data) return this.options.data

                this.options.data = data
                this._fix(data)._beautify()
            },
            val: function(val) {
                if (val === undefined) return this.$element.val()

                this.$element.val(val)
                return this
            },
            show: function() {
                this.$relatedElement.show()
                return this
            },
            hide: function() {
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
            _handler: function(event) {
                var items = this.$menu.find('li')
                if (!items.length) return
                var active = items.filter('.active')
                var index = items.index(active)
                switch (event.which) {
                    case 13: // enter
                        var value = active.text()
                        this.$element.val(value)
                        event.target = this.element
                        event.type = 'change' + NAMESPACE + NAMESPACE_DONE
                        this.trigger(event, value)
                        this.hide()
                        break
                    case 38: // up
                        index--
                        break
                    case 40: // down
                        index++
                        break
                }
                index = (index + items.length) % items.length
                items.removeClass('active')
                    .eq(index).addClass('active')
            },
            _beautify: function() {
                var offset = position(this.$element, this.$relatedElement, 'bottom', 'left')
                this.$relatedElement.offset(offset)

                this.$relatedElement[
                    (this.options.data && this.options.data.length) ? 'show' : 'hide'
                ]()

                return this
            },
            _fix: function(data) {
                var menu = this.$relatedElement.find('.dropdown-menu')
                var html = _.template(template)({
                    data: this._highlight(data, this.val())
                })
                var newMenu = $(html).find('.dropdown-menu')
                newMenu.replaceAll(menu)

                this.$menu = newMenu
                this.$menu.find('li:first-child').addClass('active')

                return this
            },
            _highlight: function(data, value) {
                value = new RegExp(value, 'ig')
                return _.map(data, function(item, index) {
                    item += ''
                    return item.replace(value, function(matched) {
                        return '<span class="highlight">' + matched + '</span>'
                    })
                })
            }
        })

        return Suggest
    }
)