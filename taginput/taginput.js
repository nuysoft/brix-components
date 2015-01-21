/* global define, console */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'brix/base',
        './taginput.tpl.js',
        'less!./taginput.less'
    ],
    function(
        $, _,
        Loader, Brix,
        template
    ) {
        /*
            ### 数据
                {}
            ### 选项
                TODO
            ### 属性
                TODO
            ### 方法
                TODO
            ### 事件
                TODO
            ===

            ### 公共选项
                data template css
            ### 公共属性
                element relatedElement 
                moduleId clientId parentClientId childClientIds 
                data template css
            ### 公共方法
                .render()
            ### 公共事件
                ready destroyed

        */

        var NAMESPACE = '.taginput'

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
                this.$element = $(this.element)

                var html = _.template(template)(this.options)
                this.$relatedElement = $(html)
                    .addClass(this.$element.attr('class'))
                    .css({
                        'line-height': this.$element.css('line-height'),
                        'min-height': this.$element.css('height'),
                        width: this.$element.width,
                        height: 'auto'
                    })
                this.$input = this.$relatedElement.find('input')
                $(this.element).after(this.$relatedElement)
                Loader.boot(this.$relatedElement, function() {
                    var suggest = Loader.query('components/suggest')
                    suggest.on('change.suggest', function(event, value) {
                        console.log(event)
                        suggest.data([value, value, value])
                    })
                })

                this.$relatedElement
                    .on('click' + NAMESPACE, function(event) {
                        if (event.target === that.$relatedElement[0]) that.$input.focus()
                        that._focus = 'input'
                    })
                    .on('click' + NAMESPACE, '.taginput-item', function(event) {
                        $(event.currentTarget).addClass('active')
                        that._focus = 'item'
                    })
                    .on('click' + NAMESPACE, '.taginput-item-close', function(event) {
                        $(event.target).closest('.taginput-item').remove()
                    })
                    .on('keyup' + NAMESPACE, function(event) {
                        console.log(event.which)
                        console.log(event.target.selectionStart, event.target.selectionEnd, event.target.selectionDirection)

                        // enter
                        if (event.which === 13) {
                            if (!event.target.value.length) return
                                
                            /*jshint multistr:true */
                            var itemTpl = ' <div class="taginput-item">\
                                                <span><%= name %></span>\
                                                <span class="taginput-item-close">x</span>\
                                            </div>'
                            var itemHTML = _.template(itemTpl)({
                                name: event.target.value
                            })
                            $(itemHTML).insertBefore(event.target)

                            event.target.value = ''

                            $(event.target).width(20)
                            var width = that.$relatedElement.width() - $(event.target).offset().left
                            console.log(width)
                            $(event.target).width(
                                width >= 20 ? width : 20
                            )
                            return
                        }
                        // delete
                        if (event.which === 8) {
                            if (event.target.selectionStart === 0) {
                                // $(event.target).blur().prev().addClass('active')
                            }
                            event.preventDefault()
                        }
                    })
            }
        })

        return TagInput
    }
)