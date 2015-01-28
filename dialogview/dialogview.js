/* global define, console */
define(
    [
        'jquery', 'underscore',
        'brix/base', 'magix',
        '../dialog/dialog.js',
        'css!./dialogview.css'
    ],
    function(
        $, _,
        Brix, Magix,
        Dialog
    ) {
        /*
            var DialogView = require('components/dialogview')
            var dialogOptions = {
                left: 100,
                top: 100
            }
            var viewName = 'todo'
            var viewOptions = {}
            var dialog = new DialogView(dialogOptions, viewName, viewOptions)
            dialog.open()
         */

        var DIALOG_VIEW_ID = 'vf-dialog';
        var DIALOG_VIEW_CONTAINER = '<div class="dialog-body"><vframe id="' + DIALOG_VIEW_ID + '"></vframe></div>'

        function DialogView() {
            // 支持构造函数
            if (arguments.length > 1) {
                this.options = _.extend({}, this.options, arguments[0])
                this.options['view-name'] = arguments[1]
                this.options['view-options'] = arguments[2]
                this.init()
                this.render()
            }
        }

        _.extend(DialogView.prototype, Brix.prototype, {
            options: {},
            init: function() {
                if (!this.options.content) this.options.content = DIALOG_VIEW_CONTAINER
                if (!this.options.view) {
                    this.options.view = {
                        name: this.options['view-name'],
                        options: this.options['view-options']
                    }
                }
                this.dialog = new Dialog(this.options)
            },
            render: function() {},
            fill: function() {
                var vframe = new Magix.Vframe(DIALOG_VIEW_ID)
                if (vframe && vframe.view) vframe.unmountView()
                vframe.mountView(this.options.view.name, this.options.view.options)
                    // console.log($('#' + DIALOG_VIEW_ID))
                    // $('#' + DIALOG_VIEW_ID).html(
                    //     this.options.view.name +
                    //     JSON.stringify(this.options.view.options)
                    // )
            },
            open: function() {
                this.dialog.open()
                this.fill()
            },
            close: function() {
                this.dialog.close()
            }
        })

        var DialogViewUtil = {
            open: function(dialogOptions, viewName, viewOptions) {
                this.dialog = new DialogView(dialogOptions, viewName, viewOptions)
                this.dialog.open()
            },
            close: function() {
                if (this.dialog) this.dialog.close()
            }
        }

        return DialogViewUtil
    }
)