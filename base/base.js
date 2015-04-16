/* global define */
define(
    [
        'jquery',
        'brix/base', 'brix/event'
    ],
    function(
        $,
        BrixBase, BrixEvent
    ) {
        /*
            ## ComponentBase

            基于 Brix Base 的增强。
        */
        function ComponentBase() {}

        _.extend(Base.prototype, BrixBase.prototype, {
            _bak_trigger: BrixBase.prototype.trigger,
            trigger: function(type, data) {
                this._bak_trigger(type, data)

                type = type.type || type
                if (type.indexOf('.') >= 0) {
                    type = type.split('.')[0]
                }

                var bxevent = jQuery.Event(type + EventManager.NAMESPACE)
                event.component = this
                $(this.element).trigger(bxevent, data)

                return this
            }
        })

        return ComponentBase
    }
)