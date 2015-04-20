/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base', 'brix/event'
    ],
    function(
        $, _,
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
                // 拦截 type namespace
                var namespaces = type.namespace ? type.namespace.split('.') : []
                var tmp = type.type || type
                if (tmp.indexOf('.') >= 0) {
                    namespaces = tmp.split('.')
                    tmp = namespaces.shift()
                }

                // 正常触发
                this._bak_trigger(type, data)

                // 触发 brix/event 绑定的事件
                var bxevent = $.Event(tmp + EventManager.NAMESPACE)
                bxevent.originalNamespace = namespaces.join('.')
                bxevent.component = this
                $(this.element).trigger(bxevent, data)

                return this
            }
        })

        ComponentBase.extend = Brix.extend

        return ComponentBase
    }
)