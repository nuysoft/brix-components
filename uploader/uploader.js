/* global define, console, FileReader, FormData, XMLHttpRequest */
/*
    http://jasny.github.io/bootstrap/javascript/#inputmask
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './uploader.tpl.js',
        'css!./uploader.css'
    ],
    function(
        $, _,
        Brix,
        template
    ) {
        return Brix.extend({
            options: {
                action: '',
                name: 'file',
                transport: 'iframe'
            },
            render: function() {
                var that = this

                var $element = $(this.element)
                $element.parent().css('position', 'relative')

                var $relatedElement = $(_.template(template)(this.options))
                    .attr('data-token', this.tokon())
                    .insertAfter($element)
                    .width($element.outerWidth())
                    .height($element.outerHeight())
                    .offset($element.offset())

                var form = $relatedElement[0].form
                $(form).on('change', 'input[type=file]', function(event) {
                    var input = event.currentTarget

                    var isDefaultPrevented
                    that
                        .on('start.uploader.isDefaultPrevented', function(event) {
                            isDefaultPrevented = event.isDefaultPrevented()
                        })
                        .trigger('start.uploader', [input.files])
                        .off('start.uploader.isDefaultPrevented')
                    if (isDefaultPrevented) return

                    that.send(form, input, function(error, response) {
                        // console.log(response)
                        if (error) that.trigger('error.uploader', [input.files, error])
                        else that.trigger('success.uploader', [input.files, response])
                        that.trigger('complete.uploader', [input.files])
                    })
                })
            },
            send: function(form, input, callback) {
                var that = this
                _.each(input.files, function(file /*, index*/ ) {
                    that.transports[that.options.transport](
                        form, that.options.action,
                        input, that.options.name,
                        file,
                        function(response) {
                            that.burn(input)
                            if (callback) callback(response)
                            that.previewInConsole(file)
                        }
                    )
                })
            },
            // [阅后即焚 Burn After Reading](http://movie.douban.com/subject/2054933/)
            burn: function(input) {
                var $input = $(input)
                $input.replaceWith(
                    $input.clone(true, true).attr('data-token', this.tokon())
                )
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

                    var html = _.template(IFRAME_HTML)({
                        id: form.target
                    })
                    $(html).insertAfter(form)
                        .on('load', function(event) {
                            var iframe = event.target
                            var response = iframe.contentWindow.document.body.innerHTML
                            try { // console.log(this.contentWindow.document.body.innerHTML)
                                callback(
                                    undefined,
                                    JSON.parse(response)
                                )
                            } catch (error) {
                                console.error(error)
                                callback(error, response)
                            } finally {
                                $(event.target).remove()
                            }
                        })
                        .on('error', function(event) {
                            callback(event, undefined)
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
                    xhr.upload.onprogress = function( /*event*/ ) {
                        // var percent = Math.round((event.loaded / event.total) * 100)
                        // console.log('[uploader]', file.name, event.loaded, event.total, percent + '%')
                    };
                    xhr.onerror = function(err) {
                        console.error(err)
                    }
                    xhr.onload = function() {
                        // console.log('[uploader]', xhr.status, xhr.statusText, xhr.responseText)
                        if (callback) callback(xhr.responseText)
                    };
                    xhr.send(data)
                }
            },
            tokon: function() {
                return '.' + ('token' + Math.random()).replace(/\D/g, '')
            },
            previewInConsole: function(file) {
                var reader = new FileReader()
                reader.onload = function(event) {
                    var img = $('<img>')
                        .attr('src', event.target.result)
                        .attr('title', file.name)
                        .hide().appendTo('body')
                    var width = img.width()
                    var height = img.height()
                    var style = _.template(
                        'padding: <%=pt%>px <%=pr%>px <%=pb%>px <%=pl%>px; line-height: <%=height%>px; background:url("<%=result%>") no-repeat center center;'
                    )({
                        pt: height / 2,
                        pr: width / 2,
                        pb: height / 2,
                        pl: width / 2,
                        height: height + 10,
                        result: event.target.result
                    })
                    console.group(file.name)
                    console.log('%c', style)
                    console.log(file.size + ' byte')
                    console.groupEnd(file.name)
                    img.remove()
                }
                reader.readAsDataURL(file)
            },
            previewAsComponent: function(file, callback) {
                var reader = new FileReader()
                reader.onload = function(event) {
                    var img = $('<img>')
                        .addClass('uploader-preview')
                        .attr('src', event.target.result)
                        .attr('title', file.name)
                    if (callback) callback(undefined, img)

                    /*var img = $('<img>')
                        .attr('bx-name', 'components/popover')
                        .attr('data-content', '<img src="' + event.target.result + '">')
                        .attr('data-placement', 'bottom')
                        .attr('data-align', 'left')
                        .addClass('uploader-preview')
                        .attr('src', event.target.result)
                        .attr('title', file.name)
                    if (callback) callback(undefined, img)
                    require(['brix/loader'], function(Loader) {
                        Loader.boot(img)
                    })*/
                }
                reader.readAsDataURL(file)
            }
        })
    }
)