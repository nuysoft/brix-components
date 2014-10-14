/* global define, window, hljs */
define(
    [
        'jquery', 'underscore', 'marked', 'marked-extra',
        'base/brix',
        'text!./readme.tpl',
        'less!./readme.less'
    ],
    function(
        $, _, marked, renderer,
        Brix,
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
                    window.trimHTML(that.element)
                    window.trimPredefined(that.element)
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
            }

        })

        return Readme
    }
)