/* global define */
/*
    http://parsleyjs.org/
    Parsley, the ultimate JavaScript form validation library
    Validating forms frontend have never been so powerful and easy.

    http://thx.github.io/brix-site/readme.html?name=Validation
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/validation/
        Temporary
        
    # Validation

    表单验证组件。

    ```html
    <form bx-name="components/validation"></form>
    <div bx-name="components/validation"></div>
    ```

    ## 配置

    无。

    ## 属性

    属性名  | 类型    | 默认值 | 说明
    :------ | :------ | :----- | :----------
    parsley | Parsley | -      | <http://parsleyjs.org/>

    ## 方法

    *.validate()
        http://parsleyjs.org/doc/index.html#usage-form
    * .isValid()
        http://parsleyjs.org/doc/index.html#usage-form

    ## 事件

    无。

 */
define(
    [
        'jquery', 'underscore', 'parsley',
        'brix/base'
    ],
    function(
        $, _, Parsley,
        Brix
    ) {

        function Validation() {}

        _.extend(Validation.prototype, Brix.prototype, {
            options: {
                i18n: 'zh_cn'
            },
            init: function() {
                if (!Parsley) Parsley = window.Parsley
                window.require(['dependencies/parsleyjs/src/i18n/' + this.options.i18n])
            },
            render: function() {
                this.$element = $(this.element)

                // http://parsleyjs.org/doc/annotated-source/factory.html#section-6
                // A ParsleyForm instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
                // http://parsleyjs.org/doc/index.html#psly-usage-form
                // data-parsley-namespace = data-parsley-
                if (!this.$element.is('form')) {
                    var namespace = this.$element.attr('data-parsley-namespace') || Parsley.options.namespace
                    var gogogo = namespace + 'validate'
                    if (this.$element.attr(gogogo) === undefined) this.$element.attr(gogogo, '')
                }

                this.parsley = $(this.element).parsley()
                    // this.parsley = new Parsley(this.element)
            },
            validate: function(group, force) {
                this.parsley.validate(group, force)
                return this
            },
            isValid: function(group, force) {
                return this.parsley.isValid(group, force)
            },
            reset: function() {
                this.parsley.reset()
                return this
            },
            destroy: function() {
                this.parsley.destroy()
                return this
            }
        })

        return Validation
    }
)