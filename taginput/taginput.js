/* global define, console */
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
                data: []
            },
            init: function() {
                // this._focus = 'input'
            },
            render: function() {
                var that = this
                var manager = new EventManager()
                this.$element = $(this.element) // .hide()

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)
                this.$input = this.$relatedElement.find('input')
                if (this.options.placeholder) this.$input.attr('placeholder', this.options.placeholder)

                this.val(this.options.data)

                this._beautify(this.$element, this.$relatedElement)

                manager.delegate(this.$element, this)
                manager.delegate(this.$relatedElement, this)

                Loader.boot(this.$relatedElement, function() {
                    that.suggest = Loader.query('components/suggest', that.$relatedElement)[0]
                    that.suggest.on('change.suggest.done', function(event, value) {
                        that.add(value)
                        that.$input.focus()
                    })
                })
            },
            add: function(value) {
                if (!('' + value)) return

                this.options.data.push(value)
                this.$element.val(this.options.data.join(','))

                var itemHTML = _.template(itemTemplate)({
                    data: value
                })
                $(itemHTML).insertBefore(this.$input)

                this.$input.val('')
                this._fixInput()

                return this
            },
            delete: function(event) {
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
                        this.$input.focus()

                    } else {
                        // delete( value )
                        event += ''
                        var items = this.$relatedElement.find(CLASS_ITEM)
                        var matched = _.filter(items, function(item, index) {
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

                return this
            },
            val: function(value) {
                // .val()
                if (value === undefined) return this.options.data

                // .val( value )
                var that = this
                this.delete()
                    // this.options.data = []
                    // this.$relatedElement.find(CLASS_ITEM).remove()
                _.each(value, function(item, index) {
                    that.add(item)
                })
                return this
            },
            _focus: function(evnet) {
                if (event.target === this.$relatedElement[0]) this.$input.focus()
                evnet.preventDefault()
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