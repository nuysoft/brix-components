/* global define */
/*
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/sidenav/
      Temporary

    # Footer

    将阿里妈妈的统一吊顶封装成 Brix 组件。

    ```html
    <div bx-name="component/sitenav" bx-options="{mode:'normal'}"></div>
    ```

    ## 配置

    配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

    配置项 | 类型   | 默认值 | 说明
    :----- | :----- | :----- | :----------
    mode   | string | 'normal' | 可选。指定页面内容：前台版本 `'normal'`，后台版本 `'simple'`。
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
        function Sitenav() {}

        _.extend(Sitenav.prototype, Brix.prototype, {
            options: {
                mode: 'normal' // simple
            },
            render: function() {
                var that = this
                var simple = this.options.mode === 'simple' ? true : false

                $.ajax({
                    url: '//mo.m.taobao.com/union/jsonp/sitenav',
                    dataType: 'jsonp',
                    success: function(resp) {
                        var sitenav = $(that.element)
                        sitenav.html(Handlebars.compile(resp.html)({
                            simple: simple
                        }))
                        sitenav = sitenav.find('.alimama-site-nav')
                        var scriptSrc = sitenav.attr('data-cdn')
                        that._insertScript(scriptSrc)
                    }
                })
            },
            _insertScript: function (src) {
                var headNode = document.getElementsByTagName('head')[0]
                var newScript = document.createElement('script')
                newScript.type = 'text/javascript'
                newScript.src = src
                headNode.appendChild(newScript)
            },
            destroy: function () {
                if (window.MMSiteNav) {
                    window.MMSiteNav.destroy()
                }
            }
        })

        return Sitenav
    }
)