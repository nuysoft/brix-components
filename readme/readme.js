/* global define */
define(
    [
        'jquery', 'underscore', 'marked', 'marked-extra', 'highlightjs',
        'loader', 'base/brix',
        'text!./readme.tpl',
        'css!./readme.css'
    ],
    function(
        $, _, marked, renderer, hljs,
        Loader, Brix,
        template
    ) {
        /*
            ### 数据
                {}
            ### 选项
                TODO
            ### 属性
                TODO
            ### 方法
                TODO
            ### 事件
                TODO
            ===

            ### 公共选项
                data template css
            ### 公共属性
                element relatedElement 
                moduleId clientId parentClientId childClientIds 
                data template css
            ### 公共方法
                .render()
            ### 公共事件
                ready destroyed

        */
        function Readme() {}

        _.extend(Readme.prototype, Brix.prototype, {
            options: {
                url: ''
            },
            render: function() {
                var that = this
                $(this.element).append(template)
                var promise = this.load(function(response /*, status, xhr*/ ) {
                    $(that.element).html(
                        marked(response, {
                            renderer: renderer,
                            gfm: true
                        })
                    )
                    that.trimHTML(that.element)
                    that.trimPredefined(that.element)
                    var tables = $(that.element).find('table')
                    if (!tables.hasClass('table')) tables.addClass('table table-bordered')

                    /* jshint unused:false */
                    $(that.element).find('pre code').each(function(index, code) {
                        hljs.highlightBlock(code)
                    })
                })
                return promise
            },
            load: function(done) {
                return $.ajax(this.options.url)
                    .done(function(response, status, xhr) {
                        done(response, status, xhr)
                    })
            },
            // 提取 HTML 代码
            trimHTML: function(context) {
                var elements = $('[bx-name]', context)
                _.each(elements, function(element /*, index*/ ) {
                    var htmls = Loader.Util.trimHTML(element)
                    var parent = $(element).closest('.bs-example')
                    $('<pre>').append(
                        $('<code class="html">').text(htmls)
                    ).appendTo(parent)
                })
            },
            // 去掉 <pre><code></code></pre> 的缩进
            trimPredefined: function(context) {
                var pres = $('pre', context)
                _.each(pres, function(pre /*, index*/ ) {
                    pre = $(pre)
                    var code = pre.find('>code')
                    var trimed
                    if (code.length) {
                        trimed = Loader.Util.trimPredefined(code[0])
                        code.text(trimed)
                    } else {
                        trimed = Loader.Util.trimPredefined(pre[0])
                        pre.text(trimed)
                    }
                })
            }
        })

        return Readme
    }
)