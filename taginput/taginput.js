/* global define, document, console */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'brix/base', 'brix/event',
        './taginput.tpl.js',
        './taginput.item.tpl.js',
        'css!./taginput.css'
    ],
    function(
        $, _,
        Loader, Brix, EventManager,
        template,
        itemTemplate
    ) {
        var NAMESPACE = '.taginput'
        var CLASS_ITEM = '.taginput-item'
        var CLASS_ITEM_NAME = '.taginput-item-name'
        var INPUT_MIN_WIDTH = 20

        function TagInput() {}

        _.extend(TagInput.prototype, Brix.prototype, {
            options: {
                placeholder: '',
                data: [],
                limit: 0,
                same: true,
                suggest: true
            },
            init: function() {
                // this._focus = 'input'
            },
            render: function() {
                var that = this
                var defer = $.Deferred()
                var manager = new EventManager()
                this.$element = $(this.element).hide()

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)
                this.$input = this.$relatedElement.find('input')
                if (this.options.placeholder) this.$input.attr('placeholder', this.options.placeholder)
                if (!this.options.suggest) this.$input.hide()

                this.val(this.options.data, false)

                this._beautify(this.$element, this.$relatedElement)

                manager.delegate(this.$element, this)
                manager.delegate(this.$relatedElement, this)

                this.$input
                    .on('focus', function() {
                        that.triggerHandler('focus' + NAMESPACE)
                    })
                    .on('blur', function() {
                        that.triggerHandler('blur' + NAMESPACE)
                    })

                Loader.boot(this.$relatedElement, function() {
                    that.suggest = Loader.query('components/suggest', that.$relatedElement)[0]

                    /* jshint unused:false */
                    that.suggest.on('change.suggest.done', function(event, value) {
                        that.add(value)
                            // that.$input.focus()
                    })

                    defer.resolve()
                })

                var type = 'click' + NAMESPACE + '_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.target === that.element || // 点击组件节点
                            $.contains(that.element, event.target) || // 点击组件子节点
                            event.target === that.$relatedElement[0] || // 点击组件关联节点
                            $.contains(that.$relatedElement[0], event.target) || // 点击组件关联子节点
                            (
                                // 点击不存在节点
                                !$.contains(document.body, event.target) &&
                                $(event.target).closest('.taginput-item-delete').length &&
                                $(event.target).closest('.taginput-item-delete').attr('data-taginput-clientid') == that.clientId
                            )
                        ) {
                            that.trigger(
                                $.Event('active' + NAMESPACE, {
                                    target: event.target
                                })
                            )
                            return
                        }

                        that.trigger(
                            $.Event('inactive' + NAMESPACE, {
                                target: event.target
                            })
                        )
                    })

                // return defer.promise()
            },
            // trigger is for internal usage only
            add: function(value, trigger) {
                value += ''
                if (value.length === 0) return

                // 如果选项 same 为 false，则不允许插入重复的值
                if (!this.options.same && _.indexOf(this.options.data, value) !== -1) {
                    this.$input.val('')
                    return
                }

                this.options.data.push(value)
                this.$element.val(this.options.data.join(','))

                var itemHTML = _.template(itemTemplate)({
                    data: value,
                    clientId: this.clientId
                })
                $(itemHTML).insertBefore(this.$input)

                this.$input.val('')
                this._fixInput()

                if (trigger !== false) this.trigger('change' + NAMESPACE, [this.options.data])

                if (this.options.limit && this.options.data.length >= this.options.limit) this.$input.hide()

                return this
            },
            // trigger is for internal usage only
            delete: function(event, trigger) {
                var that = this

                // delete()
                if (event === undefined) {
                    this.options.data = []
                    this.$element.val(this.options.data.join(','))
                    this.$relatedElement.find(CLASS_ITEM).remove()

                } else {
                    // delete(event)
                    if (event.type) {
                        var item = $(event.target).closest(CLASS_ITEM)
                        this.options.data = _.without(this.options.data, $(item).find(CLASS_ITEM_NAME).text())
                        this.$element.val(this.options.data.join(','))
                        $(event.target).closest(CLASS_ITEM).remove()
                        event.preventDefault()

                    } else {
                        // delete( value )
                        event += ''
                        var items = this.$relatedElement.find(CLASS_ITEM)
                        var matched = _.filter(items, function(item /*, index*/ ) {
                            var text = $(item).find(CLASS_ITEM_NAME).text()
                            if (text === event) {
                                that.options.data = _.without(that.options.data, text)
                                that.$element.val(that.options.data.join(','))
                                return true
                            }
                            return false
                        })
                        $(matched).remove()
                    }
                }

                this._fixInput()

                if (trigger !== false) this.trigger('change' + NAMESPACE, [this.options.data])

                if (this.options.limit && this.options.data.length < this.options.limit) this.$input.show()

                // delete(event)
                if (event && event.type) {
                    this.$input.focus()
                }

                return this
            },
            // trigger is for internal usage only
            val: function(value, trigger) {
                // .val()
                if (value === undefined) return this.options.data

                // .val( value )
                var that = this

                this.delete(undefined, false)

                // this.add()
                _.each(value, function(item /*, index*/ ) {
                    that.add(item, false)
                })

                if (trigger === false) this.trigger('change' + NAMESPACE, [this.options.data])

                return this
            },
            _focus: function(event) {
                if (event.target === this.$relatedElement[0]) this.$input.focus()
                event.preventDefault()
                this._fixInput()
            },
            active: function(event) {
                $(event.currentTarget).toggleClass('active')
            },
            _selection: function(event) {
                var label = 'handler ' + event.which + ' ' + event.target.value
                console.group(label)
                console.log('selectionStart    ', event.target.selectionStart)
                console.log('selectionEnd      ', event.target.selectionEnd)
                console.log('selectionDirection', event.target.selectionDirection)
                console.groupEnd(label)
                return this
            },
            _beautify: function($element, $relatedElement) {
                $relatedElement
                    .addClass($element.attr('class'))
                    .css({
                        'line-height': $element.css('line-height'),
                        'min-height': $element.css('height'),
                        height: 'auto'
                    })
                this._fixInput()
                return this
            },
            _fixInput: function() {
                this.$input.width(INPUT_MIN_WIDTH) // 
                var width = this.$relatedElement.width() - this.$input.position().left
                this.$input.width(
                    width >= INPUT_MIN_WIDTH ? width : INPUT_MIN_WIDTH
                )
                return this
            }
        })

        return TagInput
    }
)