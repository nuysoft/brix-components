/* global define, window, document, FileReader, console */
/*
    http://mindmup.github.io/bootstrap-wysiwyg/
    http://fontawesome.io/

    TODO
        line number
        options bar
 */
define(
    [
        'jquery', 'underscore', 'mousetrap',
        'brix/base',
        './editor.tpl.js',
        'css!./editor.css',
        'css!./bower_components/fontawesome/css/font-awesome.css'
    ],
    function(
        $, _, Mousetrap,
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
        function Editor() {}

        _.extend(Editor.prototype, Brix.prototype, {
            options: {},
            render: function() {
                this.data = this.data || _.extend({}, this.options)

                var $element = this.$element = $(this.element)
                var html = _.template(template)(this.data)
                $element.append(html)

                var $toolbar = this.$toolbar = $element.find('.btn-toolbar')
                var $editor = this.$editor = $element.find('.editor')

                bindHotKeys($editor[0])
                bindToolbar($editor[0])
                initFileDrops()

                $editor.attr('contenteditable', true)
                    .on('mouseup keyup mouseout', function() {
                        saveSelection()
                        updateToolbar($toolbar)
                    })
                return this
            },
            clean: function() {
                var html = this.$editor.html()
                var rwhite = /(<br>|\s|<div><br><\/div>|&nbsp;)*$/
                this.$editor.html(
                    html && html.replace(rwhite, '')
                )
                return this
            }
        })

        var HOTKEYS = {
            'ctrl+b meta+b': 'bold',
            'ctrl+i meta+i': 'italic',
            'ctrl+u meta+u': 'underline',
            'ctrl+z meta+z': 'undo',
            'ctrl+y meta+y meta+shift+z': 'redo',
            'ctrl+l meta+l': 'justifyleft',
            'ctrl+r meta+r': 'justifyright',
            'ctrl+e meta+e': 'justifycenter',
            'ctrl+j meta+j': 'justifyfull',
            'shift+tab': 'outdent',
            'tab': 'indent'
        }

        var selectedRange

        function readFileAsDataUrl(file, callback) {
            var reader = new FileReader()
            reader.onload = function(event) {
                if (callback) callback(event.target.result)
            };
            reader.onerror = reader.onprogress = function() {
                console.log(arguments)
            }
            reader.readAsDataURL(file)
        }

        function updateToolbar($toolbar) {
            $toolbar = $('.toolbar')
            _.each($toolbar.find('[data-command]'), function(item /*, index*/ ) {
                var $item = $(item)
                var command = $item.data('command')
                if (document.queryCommandState(command)) {
                    $item.addClass('btn-primary')
                } else {
                    $item.removeClass('btn-primary')
                }
            })
        }

        function execCommand(commandWithArgs, valueArg) {
            var commandArr = commandWithArgs.split(' '),
                command = commandArr.shift(),
                args = commandArr.join(' ') + (valueArg || '');
            document.execCommand(command, 0, args);
            updateToolbar()
        }

        function bindHotKeys(editor) {
            _.each(HOTKEYS, function(command, hotKey) {
                Mousetrap.bind(
                    hotKey.split(' '),
                    function(event) {
                        if (event.target !== editor) return
                        event = new $.Event(event)
                        event.preventDefault()
                        event.stopPropagation()
                        execCommand(command)
                    }
                )
            })
        }

        function getCurrentRange() {
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        }

        function saveSelection() {
            selectedRange = getCurrentRange();
        }

        function restoreSelection() {
            var selection = window.getSelection();
            if (selectedRange) {
                try {
                    selection.removeAllRanges();
                } catch (ex) {
                    document.body.createTextRange().select();
                    document.selection.empty();
                }

                selection.addRange(selectedRange);
            }
        }

        function insertFiles(files) {
            var $editor = $('.editor')
            $editor.focus();
            _.each(files, function(file /*, index*/ ) {
                if (/^image\//.test(file.type)) {
                    readFileAsDataUrl(file, function(dataUrl) {
                        execCommand('insertimage', dataUrl)
                    })
                } else {
                    console.log('unsupported file type', file.type)
                }
            })
        }

        // function markSelection(input, color) {
        //     restoreSelection();
        //     if (document.queryCommandSupported('hiliteColor')) {
        //         document.execCommand('hiliteColor', 0, color || 'transparent');
        //     }
        //     saveSelection();
        //     input.data(options.selectionMarker, color);
        // }

        function bindToolbar($editor, $toolbar) {
            $editor = $('.editor')
            $toolbar = $('.toolbar')
            _.each($toolbar.find('[data-command]'), function(item /*, index*/ ) {
                $(item).on('click', function() {
                    restoreSelection()
                    $editor.focus()
                    execCommand($(this).data('command'))
                    saveSelection()
                })
            })
        }

        function initFileDrops() {
            var $editor = $('.editor')
            $editor.on('dragenter dragover', false)
                .on('drop', function(e) {
                    var dataTransfer = e.originalEvent.dataTransfer
                    e.stopPropagation()
                    e.preventDefault()
                    if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
                        insertFiles(dataTransfer.files);
                    }
                });
        }

        return Editor
    }
)