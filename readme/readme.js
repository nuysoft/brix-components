/* global define */
define(
    [
        'jquery', 'underscore', 'marked', 'marked-extra',
        'loader', 'base/brix'
    ],
    function(
        $, _, marked, renderer,
        Loader, Brix
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
                $.ajax(this.options.url)
                    .done(function(response, status, xhr) {
                        $(that.element).html(
                            marked(response, {
                                renderer: renderer,
                                gfm: true
                            })
                        )
                        Loader.boot(that.element)
                        window.trimHTML(that.element)
                        window.trimPredefined(that.element)

                        var tables = $(that.element).find('table')
                        if (!tables.hasClass('table')) tables.addClass('table table-bordered')
                        $(that.element).find('pre code').each(function(index, block) {
                            hljs.highlightBlock(block);
                        })
                    })
            }
        })

        return Readme
    }
)