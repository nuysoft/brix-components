/* global define */
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
                    url: 'http://mo.m.taobao.com/union/jsonp/footer',
                    dataType: 'jsonp',
                    jsonp: 'callback',
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