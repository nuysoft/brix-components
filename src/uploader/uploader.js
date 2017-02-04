/* global define, console, FileReader, FormData, XMLHttpRequest */
/*
    http://thx.github.io/brix-site/readme.html?name=Uploader
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/uploader/
        Temporary

    # Uploader

    上传组件。

    ```html
    <button bx-name="components/uploader" 
        data-action="api/upload.json" 
        data-name="foo" 
        type="button" 
        class="btn btn-default">
        选择文件
    </button>
    ```

    ## 配置

    配置项    | 类型    | 默认值     | 说明
    :---      | :------ | :--------- | :----------
    action    | string  | `''`       | 指定接收文件的 URL。
    name      | string  | `'file'`   | 指定文件域的名称。
    transport | string  | `'iframe'` | 指定上传文件的方式，可选值有 `'iframe'`、`'xhr'`。
    multiple  | boolean | `true`     | 是否允许多选。
    accept    | stirng  | `''`       | 指定服务端可接受的文件类型，例如 `'.jpg,.png'`、`'image/*'`。详细的合法值请参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes)。

    ## 方法

    * Uploader.parseJSONResponse( response, callback )
        将响应内容解析成 JSON 对象。

    ## 事件

    事件类型          | 说明
    :---------------- | :----------
    start.uploader    | 开始上传，如果返回 false，则终止上传。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。
    progress.uploader | 上传进度。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和一个 [ProgressEvent] 事件对象 `state`。
    success.uploader  | 上传成功。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和响应内容 `response`。
    error.uploader    | 上传失败。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和错误描述 `reason`。
    complete.uploader | 上传完成。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。
    
    ## 参考
    * http://www.jasny.net/bootstrap/javascript/#fileinput
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
            iframe: function(options, form /*, input*/ ) {
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
                            if (error) defer.reject(error, iframe)
                            else defer.resolve(response, iframe)
                        })
                        $(iframe).remove()
                    })
                    .on('error', function(event) {
                        var iframe = event.target
                        defer.reject(event, iframe)
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
                    defer.notify(event, xhr)
                }
                xhr.onload = function( /*event*/ ) {
                    var response = xhr.responseText
                    Uploader.parseJSONResponse(response, function(error, response) {
                        if (error) defer.reject(error, xhr)
                        else defer.resolve(response, xhr)
                    })
                }
                xhr.onerror = function(event) {
                    defer.reject(event, xhr)
                }
                xhr.onabort = function( /*event*/ ) {
                    defer.reject('canceled', xhr)
                }
                xhr.ontimeout = function( /*event*/ ) {
                    defer.reject('timeout', xhr)
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

                var form = $relatedElement[0].form
                $(form).off('change' + NAMESPACE)
                    .on('change' + NAMESPACE, 'input[type=file]' + TOKEN_SELECTOR, function(event) {
                        var input = event.currentTarget
                        var uploader = Loader.query(input)[0]

                        var validate = $.Event('start' + NAMESPACE)
                        uploader.trigger(validate, [input.files])
                        if (validate.isDefaultPrevented()) {
                            // #72 阻止上传后再次选择同一文件不触发上传
                            Uploader.burn(input)
                            return
                        }

                        uploader.send(form, input).then(
                            function(response, transport) {
                                uploader.trigger('success' + NAMESPACE, [input.files, response, transport])
                            },
                            function(reason, transport) {
                                uploader.trigger('error' + NAMESPACE, [input.files, reason, transport])
                            },
                            function(event, transport) {
                                uploader.trigger('progress' + NAMESPACE, [input.files, event, transport])
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