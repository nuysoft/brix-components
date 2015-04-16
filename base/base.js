/* global define */
define(
    [
        'jquery',
        'brix/base', 'brix/event'
    ],
    function(
        $,
        Brix, EventManager
    ) {
        /*
            ## ComponentBase

            基于 Brix Base 的增强。
        */
        function ComponentBase() {}

        _.extend(ComponentBase.prototype, Brix.prototype, {
            _bak_trigger: Brix.prototype.trigger,
            trigger: function(type, data) {
                this._bak_trigger(type, data)

                type = type.type || type
                if (type.indexOf('.') >= 0) {
                    type = type.split('.')[0]
                }

                var bxevent = jQuery.Event(type + EventManager.NAMESPACE)
                bxevent.component = this
                $(this.element).trigger(bxevent, data)

                return this
            }
        })

        return ComponentBase
    }
)