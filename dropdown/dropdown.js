define(
    [
        'jquery', 'underscore',
        'base/brix',
        'text!./dropdown.tpl',
        'less!./dropdown.less'
    ],
    function(
        $, _,
        Brix, template
    ) {
        /*

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
        function Dropdown(options) {

        }
        _.extend(Dropdown.prototype, Brix.prototype, {
            render: function() {
                var that = this
                var $select = $(this.element).hide()
                this.selectElement = $select.get(0)

                // 如果没有提供选项 data，则从子元素中收集数据
                if (!this.data) {
                    this.data = _.map($select.find('option'), function(option, index) {
                        option = $(option)
                        return {
                            label: option.text(),
                            value: option.attr('value'),
                            selected: option.prop('selected')
                        }
                    })
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
                this.label = this.data[this.selectedIndex].label
                this.value = this.data[this.selectedIndex].value

                if ($select.prev().is('div.btn-group:has(ul.dropdown-menu)')) $select.prev().remove()
                var html = _.template(template, this)
                var newElement = $(html).insertAfter($select)
                this.element = newElement

                this.delegateBxTypeEvents()
            },
            toggle: function() {
                $(this.element).toggleClass('open')
            },
            select: function(event, trigger) {
                var $target = $(event.currentTarget)
                var data = {
                    label: $target.text(),
                    value: $target.attr('value')
                }
                $(this.element).find('button.dropdown-toggle > span:first')
                    .attr('value', data.value)
                    .text(data.label)
                    .trigger('change', data)
                $(this.selectElement).val(data.value)
                this.toggle()
            }
        })
        return Dropdown
    }
)