/* global define */
/* global document */
/*
    http://getbootstrap.com/components/#dropdowns
 */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        'text!./dropdown.tpl',
        'css!./dropdown.css'
    ],
    function(
        $, _,
        Brix, template
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
        */
        function Dropdown() {}
        _.extend(Dropdown.prototype, Brix.prototype, {
            options: {},
            parseData: function(select) {
                var $select = $(select)
                return _.map($select.children(), function(child /*, index*/ ) {
                    var $child = $(child)

                    // <optgroup
                    if (/optgroup/i.test(child.nodeName)) {
                        return {
                            label: $child.attr('label'),
                            children: parseOptions($child.children())
                        }

                    } else {
                        // <option 
                        return parseOption(child)
                    }
                })

                function parseOptions(options) {
                    return _.map(options, function(option /*, index*/ ) {
                        return parseOption(option)
                    })
                }

                function parseOption(option) {
                    var $option = $(option)
                    return $option.hasClass('divider') ? 'divider' : {
                        label: $option.text(),
                        value: $option.attr('value'),
                        selected: $option.prop('selected')
                    }
                }
            },
            render: function() {
                var that = this
                var $select = $(this.element).hide()

                // 如果没有提供选项 data，则从子元素中收集数据
                if (!this.data) {
                    this.data = this.parseData(this.element)

                } else {
                    // 如果提供了选项 data，则反过来修改子元素
                    $select.empty()
                    _.each(this.data, function(item) {
                        $('<option>')
                            .attr('value', item.value)
                            .prop('selected', item.selected)
                            .text(item.label)
                            .appendTo($select)
                    })
                }

                this.selectedIndex = $select.prop('selectedIndex')
                this.selectedIndex = this.selectedIndex !== -1 ? this.selectedIndex : 0
                var selectedOption = $(this.element.options[this.selectedIndex])
                this.label = selectedOption.text()
                this.value = selectedOption.attr('value')

                // ？？？
                // if ($select.prev().is('div.btn-group:has(ul.dropdown-menu)')) $select.prev().remove()
                var html = _.template(template, this)
                var relatedElement = $(html).insertAfter($select)
                this.relatedElement = relatedElement[0]

                this.delegateBxTypeEvents()

                var type = 'click.dropdown_' + this.clientId
                $(document.body)
                    .off(type)
                    .on(type, function(event) {
                        if (relatedElement.has(event.target).length) return
                        that.hide()
                    })
            },
            toggle: function() {
                $(this.relatedElement).toggleClass('open')
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
                .val( { label: "", value: "" } )
                .val( value )
            */
            val: function(value) {
                var data = _.isObject(value) ? value :
                    _.each(this.data, function(item /*, index*/ ) {
                        // label value selected
                        if (item.value === value) {
                            item.selected = true
                            data = item
                        } else {
                            item.selected = false
                        }
                    })
                $(this.relatedElement).find('button.dropdown-toggle > span:first')
                    .attr('value', data.value)
                    .text(data.label)
                    .trigger('change', data)
                $(this.element).val(data.value)
                    .trigger('change', data)
                return this
            },
            // trigger?
            select: function(event /*, trigger*/ ) {
                var $target = $(event.currentTarget)
                var data = {
                    label: $target.text(),
                    value: $target.attr('value')
                }
                this.val(data)
                this.toggle()
            }
        })
        return Dropdown
    }
)