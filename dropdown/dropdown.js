/* global define, window, document */
/*
    http://getbootstrap.com/components/#dropdowns
    http://silviomoreto.github.io/bootstrap-select/
 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        './dropdown.tpl.js'
    ],
    function(
        $, _,
        Brix, EventManager,
        template
    ) {
        /*
            # Dropdown

            下拉框组件。

            ### 数据
                [
                    {
                        label: '',
                        value: '',
                        selected: true|false
                    },
                    ...
                ]
                或者
                [
                    {
                        label: '',
                        children: [
                            [
                                {
                                    label: '',
                                    value: '',
                                    selected: true|false
                                },
                                ...
                            ]
                        ]
                    },
                    ...
                ]
            ### 选项
                公共选项：data template

            ### 属性
                公共属性：element moduleId clientId parentClientId childClientIds data template
                selectedIndex   当前选中的下标。
                label            选中条目的文本。
                value           选中条目的值。
                select          指向关联的 <select> 节点

            ### 方法
                select( label|value )
                toggle()
                focus()
                blue()

            ### 事件
                公共事件：ready destroyed
                change

            ### 示例

            <select>
                <option value ="volvo">Volvo</option>
                <option value ="saab">Saab</option>
                <option value ="mercedes">Mercedes</option>
                <option value ="audi">Audi</option>
            </select>
            <select>
                <optgroup label="Swedish Cars">
                    <option value ="volvo">Volvo</option>
                    <option value ="saab">Saab</option>
                </optgroup>
                <optgroup label="German Cars">
                    <option value ="mercedes">Mercedes</option>
                    <option value ="audi">Audi</option>
                </optgroup>
            </select>

            TODO
                multiple disabled
                responsive http://silviomoreto.github.io/bootstrap-select/
        */

        var NAMESPACE = '.dropdown'

        function Dropdown(options) {
            if (options && options.element) {
                if ('select' !== options.element.nodeName.toLowerCase()) {
                    return new CustomDropdown()
                }
            }
        }

        _.extend(Dropdown.prototype, Brix.prototype, {
            options: {
                value: '',
                data: []
            },
            init: function() {
                this.$element = $(this.element).hide()

                // 如果没有提供选项 data，则从子元素中收集数据
                // 如果提供了选项 data，则反过来修改子元素
                if (!this.options.data.length) this.options.data = this._parseData(this.$element)
                else this._fill()
            },
            render: function() {
                var that = this
                var manager = new EventManager()

                // { data, label value }
                var data = _.extend({
                    data: this.options.data,
                    disabled: this.options.disabled || this.$element.prop('disabled')
                }, function() {
                    // data-value
                    if (that.options.value) that.$element.val(that.options.value)

                    var selectedIndex = that.$element.prop('selectedIndex')
                    var selectedOption = $(that.element.options[selectedIndex !== -1 ? selectedIndex : 0])
                    return {
                        label: selectedOption.text(),
                        value: selectedOption.attr('value')
                    }
                }())

                this.$relatedElement = $(
                    _.template(template)(data)
                ).insertAfter(this.$element)

                manager.delegate(this.$element, this)
                manager.delegate(this.$relatedElement, this)

                // this._responsive()

                this._autoHide()
            },
            toggle: function( /*event*/ ) {
                this.$relatedElement.toggleClass('open')
                return this
            },
            show: function() {
                this.$relatedElement.addClass('open')
                return this
            },
            hide: function() {
                this.$relatedElement.removeClass('open')
                return this
            },
            /*
                .val( value )
                .val()
            */
            val: function(value) {
                var that = this
                var oldValue = function() {
                    var selectedIndex = that.$element.prop('selectedIndex')
                    return $(
                        that.element.options[
                            selectedIndex !== -1 ? selectedIndex : 0
                        ]
                    ).attr('value')
                }()

                // .val()
                if (value === undefined) return oldValue

                // .val( value )
                var data /* { label: '', value: '', selected: true|false } */
                if (_.isObject(value)) data = value
                else _.each(this.options.data, function(item /*, index*/ ) {
                    if (item.value == value) data = item
                    item.selected = item.value == value
                })
                data.name = this.$element.attr('name')

                if (data.value === oldValue) return this

                this.$relatedElement.find('button.dropdown-toggle > span.dropdown-toggle-label')
                    .text(data.label)

                this.$element
                    .val(data.value)

                this.$relatedElement
                    .find('ul.dropdown-menu li:has([value="' + oldValue + '"])').removeClass('active')
                this.$relatedElement
                    .find('ul.dropdown-menu li:has([value="' + data.value + '"])').addClass('active')

                this.trigger('change' + NAMESPACE, data)

                this.$element
                    .triggerHandler('change')

                return this
            },
            _select: function(event /*, trigger*/ ) {
                var $target = $(event.currentTarget)
                var data = {
                    label: $target.text(),
                    value: $target.attr('value') || $target.text()
                }
                this.val(data)
                this.toggle()

                $target.parent().addClass('active')
                    .siblings().removeClass('active')
            },
            _parseData: function($select) {
                var that = this
                var children = _.filter($select.children(), function(child /*, index*/ ) {
                    // <optgroup> <option>
                    return /optgroup|option/i.test(child.nodeName)
                })
                return _.map(children, function(child /*, index*/ ) {
                    var $child = $(child)
                    return /optgroup/i.test(child.nodeName) ? {
                        label: $child.attr('label'),
                        children: that._parseOptions($child.children())
                    } : that._parseOption(child)
                })
            },
            _parseOptions: function(options) {
                var that = this
                return _.map(options, function(option /*, index*/ ) {
                    return that._parseOption(option)
                })
            },
            _parseOption: function(option) {
                var $option = $(option)
                return $option.hasClass('divider') ? 'divider' : {
                    label: $option.text(),
                    value: $option.attr('value'),
                    selected: $option.prop('selected')
                }
            },
            _fill: function() {
                var that = this
                var $select = this.$element.hide().empty()
                _.each(this.options.data, function(item) {
                    if (item.children && item.children.length) {
                        var $optgroup = $('<optgroup>').attr('label', item.label)
                        _.each(item.children, function(item /*, index*/ ) {
                            that._genOption(item).appendTo($optgroup)
                        })
                        $optgroup.appendTo($select)

                    } else {
                        that._genOption(item).appendTo($select)
                    }
                })
            },
            _genOption: function(item) {
                // item { label: '', value: '', selected: true|false }
                return $('<option>')
                    .attr('value', item.value)
                    .prop('selected', item.selected)
                    .text(item.label)
            },
            _responsive: function() {
                var $window = $(window)
                var $relatedElement = this.$relatedElement
                var $menu = $relatedElement.find('ul.dropdown-menu')
                $(window).on('scroll', function() {
                    var offset = $relatedElement.offset()
                    var top = offset.top - $window.scrollTop()
                    var button = $window.scrollTop() + $window.height() - offset.top - $relatedElement.outerHeight()
                    var placement = button >= top ? 'button' : 'top'
                    switch (placement) {
                        case 'button':
                            $menu.css('max-height', top - 10)
                            break
                        case 'top':
                            $menu.css('max-height', button - 10)
                            break
                    }
                })
            },
            _autoHide: function() {
                var that = this
                var type = 'click.dropdown_autohide_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (that.$relatedElement.has(event.target).length) return
                        that.hide()
                    })
            },
            destroy: function() {
                var type = 'click.dropdown_autohide_' + this.clientId
                $(document.body).off(type)
            }
        })

        /*
            非 Select Dropdown
        */

        function CustomDropdown() {}

        _.extend(CustomDropdown.prototype, Dropdown.prototype, {
            init: function() {
                this.$element = $(this.element)
                this.$relatedElement = this.$element
            },
            render: function() {
                var that = this
                var manager = new EventManager('bx-')

                if (that.options.value) that.val(that.options.value)

                this.$element.on('click', 'ul.dropdown-menu > li > a', function(event) {
                    that._select(event)
                })

                manager.delegate(this.$element, this)

                this._autoHide()
            },
            val: function(value) {
                var that = this
                var oldValue = function() {
                    var $target = that.$element.find('ul.dropdown-menu > li.active > a')
                    return $target.attr('value') || $target.text()
                }()

                // .val()
                if (value === undefined) return oldValue

                // .val( value )
                var data /* { label: '', value: '', selected: true|false } */
                if (_.isObject(value)) data = value
                else {
                    var lis = that.$element.find('ul.dropdown-menu > li')
                    _.each(lis, function(item /*, index*/ ) {
                        var $item = $(item).removeClass('active')
                        var $target = $item.find('> a')
                        var targetValue = $target.attr('value')
                        var targetText = $target.text()
                        if ((targetValue || targetText) == value) {
                            data = {
                                label: targetText,
                                value: targetValue || targetText
                            }
                            $item.addClass('active')
                        }
                    })
                }
                data.name = this.$element.attr('name')

                if (data.value === oldValue) return this

                this.$element.find('button.dropdown-toggle > span.dropdown-toggle-label')
                    .text(data.label)

                this.trigger('change' + NAMESPACE, data)

                return this
            }
        })

        return Dropdown
    }
)