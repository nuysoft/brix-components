/* global define, require, console, FileReader, FormData, XMLHttpRequest */
/*
    http://jasny.github.io/bootstrap/javascript/#inputmask
 */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        './uploader.tpl.js',
        'css!./uploader.css'
    ],
    function(
        $, _,
        Brix,
        template
    ) {
        /*
            ### 数据
                {}
            ### 选项
                data template
            ### 属性
                element moduleId clientId parentClientId childClientIds data template
            ### 方法
                .render()
            ### 事件
                ready destroyed
        */
        function Uploader() {}

        _.extend(Uploader.prototype, Brix.prototype, {
            options: {
                action: '',
                name: 'file',
                transport: 'iframe'
            },
            render: function() {
                var that = this
                var $element = $(this.element)
                $element.parent().css('position', 'relative')
                var $relatedElement = $(_.template(template, this.options))
                    .insertAfter($element)
                    .css({
                        position: 'absolute',
                        width: $element.outerWidth(),
                        height: $element.outerHeight(),
                        opacity: 0,
                        direction: 'ltr',
                        cursor: 'pointer'
                    })
                    .offset($element.offset())

                var form = $relatedElement[0].form
                $(form).on('change', 'input[type=file]', function(event) {
                    var input = event.currentTarget
                    _.each(input.files, function(file /*, index*/ ) {
                        that.preview(file)
                        console.log('[uploader]', that.options.transport, file.name, file.size + 'b')
                        that.transports[that.options.transport](
                            form,
                            that.options.action,
                            input,
                            that.options.name,
                            file,
                            function( /*response*/ ) {
                                var $input = $(input)
                                $input.replaceWith(
                                    $input.clone(true, true).attr('data-random', Math.random())
                                )
                            }
                        )
                    })
                })

                this.relatedElement = $relatedElement[0]
                this.form = form
            },
            preview: function(file) {
                var that = this
                var reader = new FileReader()
                reader.onload = function(event) {
                    var img = $('<img>')
                        .attr('bx-name', 'components/popover')
                        .attr('data-content', '<img src="' + event.target.result + '">')
                        .attr('data-placement', 'bottom')
                        .attr('data-align', 'left')
                        .addClass('uploader-preview')
                        .attr('src', event.target.result)
                        .attr('title', file.name)
                        .insertAfter(that.form)
                    require(['loader'], function(Loader) {
                        Loader.boot(img)
                    })
                }
                reader.readAsDataURL(file)
            },
            transports: {
                /* jshint unused:true */
                iframe: function(form, action, input, name, file, callback) {
                    var IFRAME_ID = 'FILE_UPLOAD_IFRAME_'
                    var IFRAME_HTML = '<iframe id="<%= id %>" name="<%= id %>" style="display: none;"></iframe>'
                    form.target = IFRAME_ID + _.uniqueId()
                    form.action = action
                    form.method = 'POST'
                    form.enctype = "multipart/form-data"

                    var html = _.template(IFRAME_HTML, {
                        id: form.target
                    })
                    $(html)
                        .insertAfter(form)
                        .on('load', function() {
                            var target = this
                            try {
                                // console.log(this.contentWindow.document.body.innerHTML)
                                if (callback) callback(this.contentWindow.document.body.innerHTML)
                            } finally {
                                $(target).remove()
                            }
                        })
                    form.submit()
                },
                /* jshint unused:true */
                xhr: function(form, action, input, name, file, callback) {
                    var data = new FormData()
                    data.append(name, file)

                    var xhr = new XMLHttpRequest()
                    xhr.overrideMimeType('application/json')
                    xhr.open('post', action, true)
                    xhr.upload.onprogress = function(event) {
                        var percent = Math.round((event.loaded / event.total) * 100)
                        console.log('[uploader]', file.name, event.loaded, event.total, percent + '%')
                    };
                    xhr.onerror = function(err) {
                        console.error(err)
                    }
                    xhr.onload = function() {
                        console.log('[uploader]', xhr.status, xhr.statusText, xhr.responseText)
                        if (callback) callback(xhr.responseText)
                    };
                    xhr.send(data)
                }
            }
        })

        return Uploader
    }
)