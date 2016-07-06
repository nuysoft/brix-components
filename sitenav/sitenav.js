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
        function Sitenav() {}

        _.extend(Sitenav.prototype, Brix.prototype, {
            options: {
                mode: 'normal' // simple
            },
            render: function() {
                var that = this
                var simple = this.options.mode === 'simple' ? true : false

                $.ajax({
                    url: 'http://mo.m.taobao.com/union/jsonp/sitenav',
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