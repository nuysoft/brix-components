/* global define, console, FileReader, FormData, XMLHttpRequest */
/*
    http://jasny.github.io/bootstrap/javascript/#inputmask
 */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'components/base'
    ],
    function(
        $, _,
        Loader, Brix
    ) {
        var TEMPLATE = '<input name="<%= name %>" type="file" class="uploader-ghost">'
        var TOKEN = 'data-token'
        var TOKEN_SELECTOR = '[' + TOKEN + ']'
        var NAMESPACE = '.uploader'

        function tokon() {
            return ('token' + Math.random()).replace(/\D/g, '')
        }

        function Uploader() {}

        // [阅后即焚 Burn After Reading](http://movie.douban.com/subject/2054933/)
        Uploader.burn = function(input) {
            var $input = $(input)
            $input.replaceWith(
                $input.clone(true, true)
                .attr(TOKEN, tokon())
                .prop('clientId', $input.prop('clientId'))
            )
        }

        // 发送器
        Uploader.transports = {
            /* jshint unused:true */
            iframe: function(options, form, input) {
                var defer = $.Deferred()

                var IFRAME_ID = 'FILE_UPLOAD_IFRAME_'
                var IFRAME_HTML = '<iframe id="<%= id %>" name="<%= id %>" style="display: none;"></iframe>'

                form.target = IFRAME_ID + _.uniqueId()
                form.action = options.action
                form.method = 'POST'
                form.enctype = "multipart/form-data"

                var html = _.template(IFRAME_HTML)({
                    id: form.target
                })
                $(html).insertAfter(form)
                    .on('load', function(event) {
                        var iframe = event.target
                        var $iframeBody = $((iframe.contentWindow || iframe.contentDocument).document.body)
                        var $iframeResult = $iframeBody.find('#result')
                        var response = $.trim(
                            $iframeResult.length ? $iframeResult.text() : $iframeBody.text()
                        )
                        Uploader.parseJSONResponse(response, function(error, response) {
                            if (error) defer.reject(error)
                            else defer.resolve(response)
                        })
                        $(iframe).remove()
                    })
                    .on('error', function(event) {
                        defer.reject(event)
                    })

                form.submit()

                return defer.promise()
            },
            /* jshint unused:true */
            xhr: function(options, form, input) {
                var defer = $.Deferred()

                // http://caniuse.com/#search=FormData
                var data = new FormData()
                _.each(input.files, function(item /*, index*/ ) {
                    data.append(options.name, item)
                })

                var xhr = new XMLHttpRequest()
                xhr.overrideMimeType('application/json')
                xhr.open('post', options.action, true)
                xhr.upload.onprogress = function(event) {
                    event.percent = Math.round((event.loaded / event.total) * 100)
                    defer.notify(event)
                }
                xhr.onload = function(event) {
                    var response = xhr.responseText
                    Uploader.parseJSONResponse(response, function(error, response) {
                        if (error) defer.reject(error)
                        else defer.resolve(response)
                    })
                }
                xhr.onerror = function(event) {
                    defer.reject(event)
                }
                xhr.onabort = function( /*event*/ ) {
                    defer.reject('canceled')
                }
                xhr.ontimeout = function( /*event*/ ) {
                    defer.reject('timeout')
                }
                xhr.send(data)

                return defer.promise()
            }
        }

        // 解析响应内容为 JSON 对象
        Uploader.parseJSONResponse = function(response, callback) {
            try {
                callback(undefined, JSON.parse(response))
            } catch (parseError) {
                // 再次尝试解析返回的数据
                /* jshint evil:true */
                try {
                    callback(undefined, (new Function("return " + response))())
                } catch (parseErrorByFunction) {
                    console.log(response)
                    console.error(parseError.stack || parseError)
                    console.error(parseErrorByFunction.stack || parseErrorByFunction)
                    callback(parseErrorByFunction, response)
                }
            } finally {}
        }

        // 简单封装 [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
        Uploader.readFileAsDataURL = function(file, callback) {
            var reader = new FileReader()
            reader.onload = function(event) {
                callback(event.target.result)
            }
            reader.readAsDataURL(file)
        }

        _.extend(Uploader.prototype, Brix.prototype, {
            options: {
                action: '',
                name: 'file',
                transport: 'iframe',
                multiple: true,
                accept: ''
            },
            render: function() {
                this.$element = $(this.element)
                this.$element.parent().css('position', 'relative')

                // 用隐藏的文件域覆盖组件节点
                var $relatedElement = $(_.template(TEMPLATE)(this.options))
                    .attr(TOKEN, tokon())
                    .prop('clientId', this.options.clientId)
                    .prop('disabled', this.$element.prop('disabled'))
                    .insertAfter(this.$element)
                    .width(this.$element.outerWidth())
                    .height(this.$element.outerHeight())
                    .offset(this.$element.offset())

                if (this.options.multiple) $relatedElement.attr('multiple', 'multiple')
                if (this.options.accept) $relatedElement.prop('accept', this.options.accept)

                var that = this
                var form = $relatedElement[0].form
                $(form).off('change' + NAMESPACE)
                    .on('change' + NAMESPACE, 'input[type=file]' + TOKEN_SELECTOR, function(event) {
                        var input = event.currentTarget
                        var uploader = Loader.query(input)[0]

                        var validate = $.Event('start' + NAMESPACE)
                        uploader.trigger(validate, [input.files])
                        if (validate.isDefaultPrevented()) return

                        uploader.send(form, input).then(
                            function(response) {
                                uploader.trigger('success' + NAMESPACE, [input.files, response])
                            },
                            function(reason) {
                                uploader.trigger('error' + NAMESPACE, [input.files, reason])
                            },
                            function(event) {
                                uploader.trigger('progress' + NAMESPACE, [input.files, event])
                            }
                        ).always(function() {
                            try {
                                uploader.trigger('complete' + NAMESPACE, [input.files])
                            } finally {
                                // 先执行回调，再销毁文件域，否则事件不会触发！
                                Uploader.burn(input)
                            }
                        })
                    })
            },
            send: function(form, input) {
                return Uploader.transports[this.options.transport](this.options, form, input)
            }
        })

        return Uploader
    }
)