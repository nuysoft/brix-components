/* global define, window, document */
/*
    http://getbootstrap.com/components/#dropdowns
    http://silviomoreto.github.io/bootstrap-select/
 */
define(
    [
        'jquery', 'underscore',
        'brix/base', 'brix/event',
        './dropdown.tpl.js',
        'css!./dropdown.css'
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

        function Dropdown() {}

        _.extend(Dropdown.prototype, Brix.prototype, {
            options: {
                data: []
            },
            render: function() {
                var that = this
                var $select = $(this.element).hide()
                var manager = new EventManager()

                // 如果没有提供选项 data，则从子元素中收集数据
                // 如果提供了选项 data，则反过来修改子元素
                if (!this.options.data.length) this.options.data = this._parseData(this.element)
                else this._fill()

                // data.label data.value
                var data = _.extend({
                    data: this.options.data
                }, function() {
                    var selectedIndex = $select.prop('selectedIndex')
                    var selectedOption = $(that.element.options[selectedIndex !== -1 ? selectedIndex : 0])
                    return {
                        label: selectedOption.text(),
                        value: selectedOption.attr('value')
                    }
                }())

                var html = _.template(template)(data)
                var $relatedElement = $(html).insertAfter($select)
                this.relatedElement = $relatedElement[0]

                // this.delegateBxTypeEvents(this.relatedElement)
                manager.delegate(this.element, this)
                manager.delegate(this.relatedElement, this)

                var type = 'click.dropdown_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if ($relatedElement.has(event.target).length) return
                        that.hide()
                    })

                // this._responsive()
            },
            toggle: function( /*event*/ ) {
                $(this.relatedElement).toggleClass('open')
                    // if (event) {
                    //     event.preventDefault()
                    //     event.stopPropagation()
                    // }
                return this
            },
            show: function() {
                $(this.relatedElement).addClass('open')
                return this
            },
            hide: function() {
                $(this.relatedElement).removeClass('open')
                return this
            },
            /*
                .val( value )
                .val()
            */
            val: function(value) {
                var that = this

                // .val()
                if (value === undefined) return function() {
                    var selectedIndex = $(that.element).prop('selectedIndex')
                    return $(that.element.options[
                        selectedIndex !== -1 ? selectedIndex : 0
                    ]).attr('value')
                }()

                // .val( value )
                var data /* { label: '', value: '', selected: true|false } */
                if (_.isObject(value)) data = value
                else _.each(this.options.data, function(item /*, index*/ ) {
                    if (item.value == value) data = item
                    item.selected = item.value == value
                })
                data.name = $(this.element).attr('name')

                $(this.relatedElement).find('button.dropdown-toggle > span:first')
                    .text(data.label)
                    .trigger('change.dropdown', data)

                $(this.element)
                    .val(data.value)
                    .trigger('change.dropdown.original', data)

                return this
            },
            _select: function(event /*, trigger*/ ) {
                var $target = $(event.currentTarget)
                var data = {
                    label: $target.text(),
                    value: $target.attr('value')
                }
                this.val(data)
                this.toggle()
                    // event.stopPropagation()
            },
            _parseData: function(select) {
                var that = this
                var $select = $(select)
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
                var $select = $(this.element).hide().empty()
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
                var $relatedElement = $(this.relatedElement)
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
            }
        })

        return Dropdown
            // return Brix.extend()
    }
)