/* global define */
/*
    http://thx.github.io/brix-site/readme.html?name=Footer
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/footer/
        Temporary

    # Footer

    将阿里妈妈的统一页脚封装成 Brix 组件。

    ```html
    <div bx-name="component/footer" bx-options="{mode:'normal'}"></div>
    ```

    ## 配置

    配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

    配置项 | 类型   | 默认值 | 说明
    :----- | :----- | :----- | :----------
    mode   | string | 'normal' | 可选。指定页面内容：完全版本 `'normal'`，简约版本 `'simple'`。
 */
define(
    [
        'jquery',
        'underscore',
        'handlebars',
        'brix/base'
    ],
    function(
        $,
        _,
        Handlebars,
        Brix
    ) {
        function Footer() {}

        _.extend(Footer.prototype, Brix.prototype, {
            options: {
                mode: 'normal'
            },
            render: function() {
                var that = this

                // 兼容老的type参数
                if (this.options.type) {
                    this.options.mode = {
                        front: 'normal',
                        back: 'simple'
                    }[this.options.type]
                }

                var simple = this.options.mode === 'simple'
                var alimamaReg = /alimama\.(com|net)/i
                var tanxReg = /tanx\.(com|net)/i
                var taobaoReg = /taobao\.(com|net)/i
                var alimama, taobao, tanx

                if (alimamaReg.test(window.location.href)) {
                    alimama = true
                } else if (taobaoReg.test(window.location.href)) {
                    taobao = true
                } else if (tanxReg.test(window.location.href)) {
                    tanx = true
                } else {
                    alimama = true
                }

                $.ajax({
                    url: '//mos.m.taobao.com/union/jsonp/footer',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    cache:true,
                    jsonpCallback:'MM_Footer_Callback',
                    success: function(resp) {
                        $(that.element).html(Handlebars.compile(resp.html)({
                            simple: simple,
                            alimama: alimama,
                            taobao: taobao,
                            tanx: tanx
                        }))
                    }
                })
            }
        })

        return Footer
    }
)