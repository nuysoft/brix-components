/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=Spin
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/spin/
        Temporary

    # Spin

    纯 CSS 加载动画。

    ```html
    <div bx-name="components/spin"></div>
    ```

    ## 配置

    配置项 | 类型   | 默认值           | 说明
    :----  | :----- | :--------------- | :----------
    type   | string | `'three-bounce'` | 可选。指定加载动画的类型，可选值有：`rotating-plane`、`double-bounce`、`rectangle-bounce`、`wandering-cubes`、`pulse`、`chasing-dots`、`three-bounce`、`circle-spinner`。

    ## Reference:
    * [A collection of loading indicators animated with CSS](http://tobiasahlin.com/spinkit/)
    * https://github.com/fgnass/spin.js
    * http://css-spinners.com/#/spinners/
    * http://pasqualevitiello.github.io/Tumblr-Style-Cog-Spinners/#
    * [SpinKit](https://github.com/tobiasahlin/SpinKit)
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './spin.tpl.js'
    ],
    function(
        $, _,
        Brix,
        template
    ) {
        function Spin() {}

        _.extend(Spin.prototype, Brix.prototype, {
            options: {
                type: 'three-bounce'
            },
            render: function() {
                this.data = this.data || _.extend({}, this.options)
                var html = _.template(template)(this.data)
                $(this.element).addClass('spin').append(html)
            }
        })

        return Spin
    }
)