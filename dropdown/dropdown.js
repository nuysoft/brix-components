/* global define, window, document */
/*
    http://getbootstrap.com/components/#dropdowns
    http://silviomoreto.github.io/bootstrap-select/
 */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'components/base', 'brix/event',
        './dropdown.tpl.js'
    ],
    function(
        $, _,
        Loader, Brix, EventManager,
        template
    ) {
        /*
            # Dropdown

            下拉框组件。

            ### 数据
                [
                    value,
                    ...
                ]
                或者
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
                name: undefined,
                label: undefined,
                value: undefined,
                data: [],
                disabled: undefined,

                searchbox: false, // false | true | keyup | enter
                placeholder: '搜索关键词',
                _searchboxEvent: 'keyup', // keyup | enter

                popover: false, // true | width
                _popoverWidth: ''
            },
            init: function() {
                this.$element = $(this.element).hide()
                this.$manager = new EventManager('bx-')

                var options = this.options

                // 如果没有提供选项 data，则从节点 select 的 option 收集数据
                if (!options.data.length) {
                    options.data = this._parseDataFromSelect(this.$element)

                } else {
                    // 如果提供了选项 data，则逆向填充节点 select 的 option
                    this._fixFlattenData(this.options.data)
                    this._fillSelect()
                }

                // 节点是否被禁用
                options.disabled = this.$element.prop('disabled')

                // 初始化节点 select 的状态
                if (options.value !== undefined) this.$element.val(options.value + '')

                // 初始化选项 label、value
                var $selectedOption = this.$element.find('option:selected')
                options.label = $.trim($selectedOption.text())
                options.value = $selectedOption.attr('value')

                // 初始化选项 name
                options.name = this.$element.attr('name')

                // 解析选项 searchbox
                if (options.searchbox) {
                    if (options.searchbox === true) {
                        options._searchboxEvent = 'keyup'
                    } else {
                        options._searchboxEvent = options.searchbox
                        options.searchbox = true
                    }
                }

                // 解析选项 popover
                if (options.popover) {
                    if (options.popover !== true) {
                        options._popoverWidth = options.popover
                        options.popover = true
                    }
                }
            },
            render: function() {
                this.$relatedElement = $(
                    _.template(template)(this.options)
                ).insertBefore(this.$element)

                this.$manager.delegate(this.$element, this)
                this.$manager.delegate(this.$relatedElement, this)

                Loader.boot(this.$relatedElement)

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
                // this.$element.val()
                var that = this
                var oldValue = function() {
                    var $target = that.$relatedElement.find('ul.dropdown-menu > li.active > a')
                    var oldValue = $target.attr('value')
                    if (oldValue === undefined) oldValue = $.trim($target.text())
                    return oldValue
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

                // 未知值
                if (!data) return

                // 更新模拟下拉框的内容
                this.$relatedElement.find('button.dropdown-toggle > span.dropdown-toggle-label')
                    .text(data.label)

                // 更新原生下拉框的值
                this.$element
                    .val(data.value)

                // 更新模拟下拉框的选中状态
                this.$relatedElement.find('ul.dropdown-menu')
                    .find('li:has([value="' + oldValue + '"])')
                    .removeClass('active')
                    .end()
                    .find('li:has([value="' + data.value + '"])')
                    .addClass('active')

                // 将 data.value 转换为字符串，是为了避免检测 `1 === '1'` 失败（旧值 oldValue 总是字符串）
                if (('' + data.value) === oldValue) return this

                this.trigger('change' + NAMESPACE, data)

                this.$element
                    .triggerHandler('change')

                return this
            },
            data: function(data) {
                // .data()
                if (data === undefined) return this.options.data

                // .data(data)
                this.options.data = this._fixFlattenData(data)
                this._fillSelect()

                var $menu = this.$relatedElement.find('ul.dropdown-menu')
                var $newMenu = $(
                    _.template(template)(this.options)
                ).find('ul.dropdown-menu')

                $menu.replaceWith($newMenu)

                this.$manager.delegate(this.$relatedElement, this)

                Loader.boot(this.$relatedElement)

                return this
            },
            select: function(event /*, trigger*/ ) {
                var $target = $(event.currentTarget)
                var value = $target.attr('value')
                var label = $.trim($target.text())
                var data = {
                    name: this.options.name,
                    label: label,
                    value: value !== undefined ? value : label
                }
                this.val(data)
                this.toggle()

                $target.closest('li').addClass('active')
                    .siblings().removeClass('active')
            },
            search: function(event) {
                if (event.type === 'keyup') {
                    var key = event.keyCode

                    // 忽略不产生输入的辅助按键
                    //    command            modifiers                   arrows
                    if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) return

                    // 如果选项 searchbox 为 `'enter'`，则只响应 enter 键
                    if (this.options._searchboxEvent === 'enter' && key !== 13) return
                }

                var seed = $(event.target).val()
                this.trigger('search' + NAMESPACE, seed)
            },
            filter: function(seed, all) {
                // ( event, seed )
                if (seed.type) {
                    seed = all
                    all = false
                }
                var $lis = this.$relatedElement.find('ul.dropdown-menu li').hide()
                $lis.has('> a:contains("' + seed + '")').show() // 显示匹配 text 的选项
                if (all) $lis.has('> a[value*="' + seed + '"]').show() // 显示匹配 value 的选项
            },
            _parseDataFromSelect: function($select) {
                var children = _.filter($select.children(), function(child /*, index*/ ) {
                    // <optgroup> <option>
                    return /optgroup|option/i.test(child.nodeName)
                })
                return _.map(children, function(child /*, index*/ ) {
                    var $child = $(child)
                    return /optgroup/i.test(child.nodeName) ? {
                        label: $child.attr('label'),
                        children: _parseOptions($child.children())
                    } : _parseOption(child)
                })

                function _parseOptions(options) {
                    return _.map(options, function(option /*, index*/ ) {
                        return _parseOption(option)
                    })
                }

                function _parseOption(option) {
                    var $option = $(option)
                    return $option.hasClass('divider') ? 'divider' : {
                        label: $.trim($option.text()),
                        value: $option.attr('value'),
                        selected: $option.prop('selected')
                    }
                }
            },
            _fixFlattenData: function(data) {
                return _.map(data, function(item, index, context) {
                    return (context[index] = _.isObject(item) ? item : {
                        label: item,
                        value: item
                    })
                })
            },
            _fillSelect: function() {
                var $select = this.$element.empty()
                _.each(this.options.data, function(item) {
                    if (item.children && item.children.length) {
                        var $optgroup = $('<optgroup>').attr('label', item.label)
                        _.each(item.children, function(item /*, index*/ ) {
                            _genOption(item).appendTo($optgroup)
                        })
                        $optgroup.appendTo($select)

                    } else {
                        _genOption(item).appendTo($select)
                    }
                })

                function _genOption(item) {
                    // item { label: '', value: '', selected: true|false }
                    return $('<option>')
                        .attr('value', item.value)
                        .prop('selected', item.selected)
                        .text(item.label)
                }
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
                this.$manager.undelegate(this.$element, this)
                this.$manager.undelegate(this.$relatedElement, this)

                this.$relatedElement.remove()

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
                this.$manager = new EventManager('bx-')

                this._fixFlattenData(this.options.data)

                // 初始化选项 name
                this.options.name = this.$element.attr('name')
            },
            render: function() {
                if (this.options.value !== undefined) this.val(this.options.value)

                this.$manager.delegate(this.$relatedElement, this)

                // this._responsive()
                this._autoHide()
            },
            val: function(value) {
                var that = this
                var oldValue = function() {
                    var $target = that.$element.find('ul.dropdown-menu > li.active > a')
                    var oldValue = $target.attr('value')
                    if (oldValue === undefined) oldValue = $.trim($target.text())
                    return oldValue
                }()

                // .val()
                if (value === undefined) return oldValue

                // .val( value )
                var data /* { label: '', value: '', selected: true|false } */
                if (_.isObject(value)) data = value
                else _.each(that.$element.find('ul.dropdown-menu > li'), function(item /*, index*/ ) {
                    var $item = $(item)
                    var $target = $item.find('> a')
                    var targetValue = $target.attr('value')
                    var targetText = $.trim($target.text())
                    if (
                        (targetValue !== undefined && targetValue == value) ||
                        (targetValue === undefined && targetText == value)
                    ) {
                        data = {
                            name: that.options.name,
                            label: targetText,
                            value: targetValue !== undefined ? targetValue : targetText
                        }
                    }
                })

                // 未知值
                if (!data) return

                // 更新模拟下拉框的内容（先更新了再比较值是否有变化，因为此时渲染的内容可能是错误的！）
                this.$relatedElement.find('button.dropdown-toggle > span.dropdown-toggle-label')
                    .text(data.label)

                // 将 data.value 转换为字符串，是为了避免检测 `1 === '1'` 失败（旧值 oldValue 总是字符串）
                if (('' + data.value) === oldValue) return this

                // 更新模拟下拉框的选中状态
                this.$relatedElement.find('ul.dropdown-menu')
                    .find('li:has([value="' + oldValue + '"])')
                    .removeClass('active')
                    .end()
                    .find('li:has([value="' + data.value + '"])')
                    .addClass('active')

                this.trigger('change' + NAMESPACE, data)

                return this
            },
            data: function(data) {
                // .data()
                if (data === undefined) return this.options.data

                // .data(data)
                this.options.data = this._fixFlattenData(data)

                var $menu = this.$relatedElement.find('ul.dropdown-menu')
                var $newMenu = $(
                    _.template(template)(this.options)
                ).find('ul.dropdown-menu')

                $menu.replaceWith($newMenu)

                this.$manager.delegate(this.$relatedElement, this)

                return this
            }
        })

        return Dropdown
    }
)