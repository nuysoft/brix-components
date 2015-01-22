/* global define, console */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'brix/base', 'brix/event',
        './taginput.tpl.js',
        'less!./taginput.less'
    ],
    function(
        $, _,
        Loader, Brix, EventManager,
        template
    ) {
        var NAMESPACE = '.taginput'
        var INPUT_MIN_WIDTH = 20

        function TagInput() {}

        _.extend(TagInput.prototype, Brix.prototype, {
            options: {
                placeholder: 'placeholder',
                data: '一二三四五六七八九十'.split('')
            },
            init: function() {
                this._focus = 'input'
                this._selection = []
            },
            render: function() {
                var that = this
                var manager = new EventManager()
                this.$element = $(this.element)

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html).insertAfter(this.$element)
                this.$input = this.$relatedElement.find('input')
                this.beautify(this.$element, this.$relatedElement)

                manager.delegate(this.$element, this)
                manager.delegate(this.$relatedElement, this)

                Loader.boot(this.$relatedElement, function() {
                    // var suggest = Loader.query('components/suggest', that.$relatedElement)[0]
                    // suggest.on('change.suggest', function(event, value) {})
                    // suggest.data([value, value, value])
                    that.suggest = Loader.query('components/suggest', that.$relatedElement)[0]
                    that.suggest.on('change.suggest.done', function(event, value) {
                        that.handler(event, value)
                    })
                })

                // this.$relatedElement
                //     .on('click' + NAMESPACE, function(event) {
                //         console.log(event.target)
                //         if (event.target === that.$relatedElement[0]) that.$input.focus()
                //         that._focus = 'input'
                //     })
            },
            focus: function(evnet) {
                if (event.target === this.$relatedElement[0]) this.$input.focus()
                this.fixInput()
            },
            active: function(event) {
                $(event.currentTarget).addClass('active')
            },
            delete: function(event) {
                $(event.target).parent().remove()
                this.fixInput()
            },
            handler: function(event) {
                // var label = 'handler ' + event.which + ' ' + event.target.value
                // console.group(label)
                // console.log('selectionStart    ', event.target.selectionStart)
                // console.log('selectionEnd      ', event.target.selectionEnd)
                // console.log('selectionDirection', event.target.selectionDirection)
                // console.groupEnd(label)

                switch (event.which) {
                    case 13: // enter
                        this.add(event)
                        break
                }
            },
            add: function(event) {
                if (!event.target.value.length) return

                /*jshint multistr:true */
                var itemTpl = ' <div class="taginput-item">\
                                    <div class="taginput-item-name"><%= name %></div>\
                                    <div class="taginput-item-delete glyphicon glyphicon-remove" bx-click="delete"></div><!-- &times; -->\
                                </div>'
                var itemHTML = _.template(itemTpl)({
                    name: event.target.value
                })
                $(itemHTML).insertBefore(event.target)

                $(event.target).val('').blur().focus()

                this.fixInput()
            },
            beautify: function($element, $relatedElement) {
                $relatedElement
                    .addClass($element.attr('class'))
                    .css({
                        'line-height': $element.css('line-height'),
                        'min-height': $element.css('height'),
                        height: 'auto'
                    })
                this.fixInput()
            },
            fixInput: function() {
                this.$input.width(INPUT_MIN_WIDTH) // 
                var width = this.$relatedElement.width() - this.$input.position().left
                this.$input.width(
                    width >= INPUT_MIN_WIDTH ? width : INPUT_MIN_WIDTH
                )
            }
        })

        return TagInput
    }
)