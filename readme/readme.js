/* global define */
define(
    [
        'jquery', 'underscore', 'marked', 'marked-extra', 'highlightjs',
        'loader', 'base/brix',
        './readme.tpl.js',
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
                this.load(function(response /*, status, xhr*/ ) {
                    Loader.boot(this.element, function() {
                        var spin = Loader.query('components/spin', that.element)
                        Loader.destroy(spin, function() {
                            $(that.element).html(
                                marked(response, {
                                    renderer: renderer,
                                    gfm: true
                                })
                            )
                            that.trimHTML(that.element)
                            that.trimPredefined(that.element)

                            // 为 table 元素增加类样式 .table .table-bordered
                            // 逐个检测和增加，以防其中某个 table 元素含有类样式 .table，导致其他 table 元素不会被添加。
                            var tables = $(that.element).find('table')
                            _.each(tables, function(item /*, index*/ ) {
                                item = $(item)
                                if (!item.hasClass('table')) item.addClass('table table-bordered')
                            })

                            /* jshint unused:false */
                            $(that.element).find('pre code').each(function(index, code) {
                                hljs.highlightBlock(code)
                            })
                            Loader.boot(this.element)
                        })
                    })

                })
                // var promise = this.load(function(response, status, xhr) {})
                // return promise
            },
            load: function(done) {
                // 模拟延时加载
                // var that = this
                // var deferred = $.Deferred()
                // setTimeout(function() {
                //     $.ajax(that.options.url)
                //         .done(function(response, status, xhr) {
                //             done(response, status, xhr)
                //             deferred.resolve()
                //         })
                // }, 3000)
                // return deferred.promise()

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