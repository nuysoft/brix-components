/* global define */
define(
    [
        'underscore',
        'brix/base', 'magix',
        '../dialog/dialog.js'
    ],
    function(
        _,
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
        var DIALOG_VIEW_CONTAINER = '<div class="dialog-body"><div id="' + DIALOG_VIEW_ID + '" mx-vframe="true"></div></div>'

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
                if (this.dialog) this.dialog.destroy()
                this.dialog = new Dialog(this.options)
            },
            render: function() {},
            fill: function() {
                if (this.options.hostView) {
                    this.options.hostView.owner
                        .mountVframe(
                            DIALOG_VIEW_ID,
                            this.options.view.name,
                            this.options.view.options
                        )
                    return
                }

                var vframe = Magix.VOM.get(DIALOG_VIEW_ID) || new Magix.Vframe(DIALOG_VIEW_ID)
                vframe.unmountVframe(DIALOG_VIEW_ID)
                vframe.mountVframe(DIALOG_VIEW_ID, this.options.view.name, this.options.view.options)
            },
            open: function() {
                this.dialog.open()
                this.fill()
            },
            close: function() {
                this.dialog.close()
                var vframe = Magix.VOM.get(DIALOG_VIEW_ID)
                if (vframe) {
                    vframe.unmountVframe(DIALOG_VIEW_ID)
                }
            },
            destroy: function() {
                this.close()
            }
        })

        var DialogViewUtil = {
            open: function(dialogOptions /* hostView */ , viewName, viewOptions) {
                this.dialog = new DialogView(dialogOptions, viewName, viewOptions)
                this.dialog.open()
                if (dialogOptions.hostView) {
                    dialogOptions.hostView.manage(this.dialog)
                }
            },
            close: function() {
                if (this.dialog) this.dialog.close()
            }
        }

        return DialogViewUtil
    }
)