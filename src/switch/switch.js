/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=Switch
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/switch/
        Temporary

    # Switch

    滑动开关。

    ```html
    <input type="checkbox" bx-name="components/switch">
    ```

    ## 配置

    配置项   | 类型    | 默认值  | 说明
    :------- | :------ | :------ | :----------
    checked  | boolean | false   | 可选。是否选中。
    disabled | boolean | false   | 可选。是否禁用。
    size     | string  | ''      | 可选。设置滑动开关的尺寸，可选值有：`''`、`'small'`、`'large'`。

    ## 方法

    * .toggle()
        切换选中&不选状态。
    * .checked( [ checked ] )
        设置或获取选中状态。
    * .disabled( [ disabled ] ) 
        设置或获取禁用状态。
    * .val( [ value ] ) 
        设置或获取组件节点的值。

    ## 事件

    事件类型      | 说明
    :------------ | :----------
    change.switch | 当值发生变化时被触发。

    ## 参考
    * 样式赞 http://abpetkov.github.io/switchery/
    * 文档赞 http://www.bootstrap-switch.org/examples.html
 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        './switch.tpl.js'
    ],
    function(
        $, _,
        Brix, EventManager,
        template
    ) {
        var NAMESPACE = '.switch'
        var compiledTemplate = _.template(template)
        var CLASS_CHECKED = 'switch-checked'
        var CLASS_DISABLED = 'switch-disabled'

        function Switch() {}

        _.extend(Switch.prototype, Brix.prototype, {
            options: {
                checked: false,
                disabled: false,
                size: '' // TODO large small 
            },
            init: function() {
                this.$element = $(this.element).hide()
                this.$manager = new EventManager('bx-')

                this.options.checked = this.$element.prop('checked')
                this.options.disabled = this.$element.prop('disabled')
            },
            render: function() {
                var that = this

                this.$relatedElement = $(
                    compiledTemplate(this.options)
                ).insertBefore(this.$element)

                this.$element.on('change', function() {
                    that.checked(that.$element.prop('checked'))
                })

                this.$manager.delegate(this.$element, this)
                this.$manager.delegate(this.$relatedElement, this)
            },
            toggle: function(event) {
                // 非用户触发 || 非禁用状态
                if (!event || !this.options.disabled) this.checked(!this.options.checked)
                if (event) event.preventDefault()
                return this
            },
            checked: function(value) {
                if (value !== undefined) {
                    if (this.options.checked === value) return
                    this.options.checked = value
                    this.$relatedElement[
                        value ? 'addClass' : 'removeClass'
                    ](CLASS_CHECKED)
                    this.$element.prop('checked', value)

                    this.trigger('change' + NAMESPACE, {
                        name: this.$element.attr('name'),
                        value: this.$element.val(),
                        checked: this.options.checked,
                        disabled: this.options.disabled
                    })

                    this.$element.triggerHandler('change')

                    return this
                }
                return this.options.checked
            },
            disabled: function(value) {
                if (value !== undefined) {
                    this.options.disabled = value
                    this.$relatedElement[
                        value ? 'addClass' : 'removeClass'
                    ](CLASS_DISABLED)
                    this.$element.prop('disabled', value)

                    return this
                }
                return this.options.disabled
            },
            val: function(value) {
                if (value !== undefined) {
                    this.$element.val(value)
                    return this
                }
                return this.$element.val()
            }
        })

        return Switch
    }
)