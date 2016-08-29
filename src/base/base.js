/* global define */
/*
    ## Component Base

    http://thx.github.io/brix-site/readme.html?core=1&name=brix-base
        Deprecated
    https://nuysoft.gitbooks.io/brix-book/content/brix-components/base/
        Temporary

    基于 Brix Base 的（组件）增强。

    ```js
    var Base = require('components/base')
    module.exports = Base.extend({
        init: function(){},
        render: function(){}
    })
    ```
*/
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'brix/base', 'brix/event'
    ],
    function(
        $, _,
        Loader, Brix, EventManager
    ) {
        function ComponentBase() {}

        _.extend(ComponentBase.prototype, Brix.prototype, {
            query: function(moduleId) {
                // TODO element, relatedElement, $relatedElement
                return Loader.query(moduleId, this)
            },
            boot: function(callback, progress) {
                // TODO √ element, ? relatedElement, ? $relatedElement
                Loader.boot(this.element, callback, progress)
                return this
            },

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

                // 同步事件状态 event => brix/event
                if (type.type) {
                    bxevent.isDefaultPrevented = type.isDefaultPrevented() ? type.isDefaultPrevented : bxevent.isDefaultPrevented
                    bxevent.isPropagationStopped = type.isPropagationStopped() ? type.isPropagationStopped : bxevent.isPropagationStopped
                    bxevent.isImmediatePropagationStopped = type.isImmediatePropagationStopped() ? type.isImmediatePropagationStopped : bxevent.isImmediatePropagationStopped
                }

                $(this.element).trigger(bxevent, data)

                // 同步事件状态 brix/event => event
                if (type.type) {
                    type.isDefaultPrevented = bxevent.isDefaultPrevented() ? bxevent.isDefaultPrevented : type.isDefaultPrevented
                    type.isPropagationStopped = bxevent.isPropagationStopped() ? bxevent.isPropagationStopped : type.isPropagationStopped
                    type.isImmediatePropagationStopped = bxevent.isImmediatePropagationStopped() ? bxevent.isImmediatePropagationStopped : type.isImmediatePropagationStopped
                }

                return this
            }

            // , ajax: function() {
            //     var jqXHR= $.ajax.apply($, arguments)
            //     this.clientId
            // }
        })

        ComponentBase.extend = Brix.extend

        return ComponentBase
    }
)