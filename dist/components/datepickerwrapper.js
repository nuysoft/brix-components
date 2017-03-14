!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery"),require("underscore"),require("moment"),require("brix/loader"),require("components/base"),require("brix/event"),require("components/datepicker/ancient")):"function"==typeof define&&define.amd?define(["jquery","underscore","moment","brix/loader","components/base","brix/event","components/datepicker/ancient"],e):"object"==typeof exports?exports["components/datepickerwrapper"]=e(require("jquery"),require("underscore"),require("moment"),require("brix/loader"),require("components/base"),require("brix/event"),require("components/datepicker/ancient")):t["components/datepickerwrapper"]=e(t.jquery,t.underscore,t.moment,t["brix/loader"],t["components/base"],t["brix/event"],t["components/datepicker/ancient"])}(this,function(t,e,i,n,a,r,s){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){var n,a;n=[i(2),i(3),i(4),i(5),i(6),i(7),i(8),i(9),i(10)],a=function(t,e,i,n,a,r,s,o,c){function d(){}var l="components/datepicker/ancient",p=/^input|textarea$/i,u=".datepickerwrapper",h=s.PATTERNS.DATE,f=s.PATTERNS.TIME,m=s.PATTERNS.DATE_TIME,v=function(){var t=i(),e=t.get("date"),n={"今天":[i().startOf("day"),i().startOf("day")],"昨天":[i().startOf("day").subtract(1,"days"),i().startOf("day").subtract(1,"days")],"过去 7 天":[i().startOf("day").subtract(7,"days"),i().startOf("day").subtract(1,"days")],"本月":[i().startOf("day").subtract(e-1,"days"),i().startOf("day")],"上月":[i().startOf("day").startOf("month").subtract(1,"month"),i().startOf("day").startOf("month").subtract(1,"days")],"最近 15 天":[i().startOf("day").subtract(15,"days"),i().startOf("day").subtract(1,"days")]};return n}(),g={PENDING:"pending",ACTIVE:"active",INACTIVE:"inactive"};return d.DATE_PATTERN=h,d.TIME_PATTERN=f,d.DATE_TIME_PATTERN=m,d.SHORTCUTS=v,e.extend(d.prototype,a.prototype,{options:{calendar:l,placement:"bottom",align:"left",offset:{},mode:"signal",shortcuts:void 0,type:"date",dates:[],ranges:[],excludeds:[],unlimits:[],pages:1},init:function(){this.options.typeMap=s.parseTypeAsMap(this.options.type),this.options.__NEED_FIXED_RENDER=0!==this.options.dates.length,this.options.dates.length>1&&(this.options.mode="multiple"),this.options.dates.length||(this.options.dates=[i().startOf("day").format(h)]),void 0===this.options.shortcuts&&(this.options.shortcuts=d.SHORTCUTS),this.options.shortcuts&&e.each(this.options.shortcuts,function(t){e.each(t,function(n,a){t[a]=i(n,e.isString(n)&&m)})}),this.options.range&&this.options.range.length&&(this.options.ranges=this.options.range),this.options.ranges=e.flatten(this.options.ranges||this.options.range),e.each(this.options.ranges,function(t,n,a){t&&(a[n]=i(t,e.isString(t)&&m))}),this.options._ranges=e.map(this.options.ranges,function(t){if(t)return t.format(h)}),this.options._ranges="['"+this.options._ranges.join("','")+"']",this.options.excluded&&this.options.excluded.length&&(this.options.excludeds=this.options.excluded),this.options.excludeds=e.flatten(this.options.excludeds||this.options.excluded),e.each(this.options.excludeds,function(t,n,a){t&&(a[n]=i(t,e.isString(t)&&m))}),this.options._excludeds=e.map(this.options.excludeds,function(t){if(t)return t.format(h)}),this.options._excludeds=this.options._excludeds.length?"['"+this.options._excludeds.join("','")+"']":"[]",c=this.options.template||c,this.options.css&&window.require("css!"+this.options.css)},render:function(){var i=this;this.$element=t(this.element),this.$relatedElement=t(e.template(c)(this.options)).insertAfter(this.$element);var n=t.Deferred();this["_"+this.options.mode](n);var a="click.datepickerwrapper_toggle_"+this.clientId;this.$element.off(a).on(a,function(t){i.toggle(t)});var s=this.$manager=new r("bx-");return s.delegate(this.$element,this),s.delegate(this.$relatedElement,this),this._autoHide(),n.promise()},val:function(t){var i=n.query(l,this.$relatedElement);return t?(e.each(i,function(i,n){i.val(e.isArray(t)?t[n]:t)}),this.submit(),this):e.map(i,function(t){return t.val()})},range:function(t){var i=n.query(l,this.$relatedElement);return t?(this.options.ranges=t=e.flatten(t),e.each(i,function(e){e.range(t)}),this):this.options.ranges},excluded:function(t){var i=n.query(l,this.$relatedElement);return t?(this.options.excludeds=t=e.flatten(t),e.each(i,function(e){e.excluded(t)}),this):this.options.excludeds},_signal:function(i){var a=this;this.options.__NEED_FIXED_RENDER&&this._fixedRender(),n.boot(!0,this.$relatedElement,function(){var r=n.query(l,a.$relatedElement)[0];r.on("change.datepicker unchange.datepicker",function(i,n,r){if(!n)return i.preventDefault(),void i.stopPropagation();if(!(void 0!==r&&"date"!==r&&"time"!==r||a.options.typeMap.time&&"date"===r)){a.hide();var s=t.Event("change"+u);if(a.trigger(s,[[n],r]),!s.isDefaultPrevented()){var o=a._unlimitFilter(n,a.options.unlimits[0]),c=t("[data-index]",a.$element);c.length?e.each(c,function(e,i){var n=t(e);n[p.test(e.nodeName)?"val":"html"](o)}):a.$element[p.test(a.element.nodeName)?"val":"html"](o),a.$element.triggerHandler("change"),p.test(a.element.nodeName)||t("[data-hidden-index]",a.$element).val(o).triggerHandler("change")}}}),r.$element.on("click",".timepicker .timepicker-footer .cancel",function(){a.hide()}).on("click",".hour-minute-second .hour-minute-second-footer .cancel",function(){a.hide()}),i&&i.resolve()})},_multiple:function(a){var r=this;this.options.__NEED_FIXED_RENDER&&this._fixedRender(),n.boot(!0,this.$relatedElement,function(){var s=t(".datepickerwrapper-inputs",r.$relatedElement),o=t("input",s),c=t(".datepickerwrapper-pickers",r.$relatedElement),d=t(".picker",c),p=n.query(l,r.$relatedElement),u=t(".datepickerwrapper-shortcuts",r.$relatedElement),f=t(".shortcut",u);r.options.shortcuts&&e.each(e.values(r.options.shortcuts),function(t,n){var a=!0;e.each(t,function(t,n){var s=i(r.options.dates[n],e.isString(r.options.dates[n])&&m);t.isSame(s,"days")||(a=!1)}),a&&f.eq(n).addClass("active").siblings().removeClass("active")}),e.each(o,function(n,a){t(n).val(i(r.options.dates[a],e.isString(r.options.dates[a])&&m).format(h))}),e.each(p,function(t,n){t.val(r.options.dates[n]).on("change.datepicker unchange.datepicker ",function(t,e,i){if(!(void 0!==i&&"date"!==i&&"time"!==i||r.options.typeMap.time&&"date"===i)){var a=r._unlimitFilter(e,r.options.unlimits[n]);o.eq(n).val(a),d.eq(n).hide()}});var a=r._unlimitFilter(i(r.options.dates[n],e.isString(r.options.dates[n])&&m),r.options.unlimits[n]);o.eq(n).val(a),t.$element.on("click",".timepicker .timepicker-footer .cancel",function(){d.eq(n).hide()}).on("click",".hour-minute-second .hour-minute-second-footer .cancel",function(){d.eq(n).hide()})}),a&&a.resolve()})},_fixedRender:function(){var n=this,a=n.options.dates,r=t("[data-index]",n.$element);r.length?e.each(r,function(r,s){var o=t(r);s=+o.attr("data-index"),o[p.test(r.nodeName)?"val":"html"](n._unlimitFilter(i(a[s],e.isString(a[s])&&m),n.options.unlimits[s]))}):n.$element[p.test(n.element.nodeName)?"val":"html"](e.map(a,function(t,a){return n._unlimitFilter(i(t,e.isString(t)&&m),n.options.unlimits[a])}).join(", ")),r=t("[data-hidden-index]",n.$element),e.each(r,function(r,s){var o=t(r);s=+o.attr("data-hidden-index");var c=n._unlimitFilter(i(a[s],e.isString(a[s])&&m),void 0);o.val(c)})},_unlimitFilter:function(t,n){var a=this.options.typeMap,r=a.date&&a.time&&m||a.date&&h||a.time&&f,s=t.format(r);return n&&s===i(n,e.isString(n)&&m).format(r)&&(s="不限"),s},_inputToggleDatePicker:function(e,i,n){var a=t(".datepickerwrapper-inputs",this.$relatedElement),r=t(".datepickerwrapper-pickers",this.$relatedElement),s=t(".picker",r),o=a.offset();r.offset({left:o.left,top:o.top+a.outerHeight()+(parseInt(r.css("margin-top"),10)||0)});var c,d=s.eq(i),l=t(e.target),p=l.offset();switch(this.options.align){case"left":c=p.left;break;case"right":c=p.left-(d.outerWidth()-l.outerWidth())}d[n?n:"toggle"]().offset({left:c}).siblings().hide()},_hideDatePicker:function(){var e=t(".datepickerwrapper-pickers",this.$relatedElement),i=t(".picker",e);i.hide()},show:function(){this.$element.addClass("datepickerwrapper-open"),this.$relatedElement.show().offset(this._offset()),n.query(l,this.$relatedElement).beautify()},hide:function(){this.$element.removeClass("datepickerwrapper-open"),this._hideDatePicker(),this.$relatedElement.hide()},toggle:function(){this.$element.toggleClass("datepickerwrapper-open"),this.$relatedElement.toggle().offset(this._offset()),n.query(l,this.$relatedElement).beautify()},_offset:function(){var t=o(this.$element,this.$relatedElement,this.options.placement,this.options.align),e=parseInt(this.$relatedElement.css("margin-left"),10)||0,i=parseInt(this.$relatedElement.css("margin-top"),10)||0;return{left:t.left+e+(this.options.offset.left||0),top:t.top+i+(this.options.offset.top||0)}},submit:function(i,a){var r=this;switch(a){case"shortcut":break;default:var s=t(".datepickerwrapper-shortcuts",r.$relatedElement),o=t(".shortcut",s);o.removeClass("active")}var c=n.query(l,this.$relatedElement),d=e.map(c,function(t){return t.val()});this.hide();var h=t.Event("change"+u);if(this.trigger(h,[d]),!h.isDefaultPrevented()){var f=t("[data-index]",this.$element);f.length?e.each(f,function(e,i){var n=t(e);i=+n.attr("data-index"),n[p.test(e.nodeName)?"val":"html"](r._unlimitFilter(d[i],r.options.unlimits[i]))}):this.$element[p.test(this.element.nodeName)?"val":"html"](e.map(d,function(t,e){return r._unlimitFilter(t,r.options.unlimits[e])}).join(", ")),f=t("[data-hidden-index]",this.$element),e.each(f,function(e,i){var n=t(e);i=+n.attr("data-hidden-index");var a=r._unlimitFilter(d[i],void 0);n.val(a).trigger("change")})}},shortcutText:function(t){var i;return e.each(this.options.shortcuts,function(n,a){if(!i){var r=!0;e.each(n,function(e,i){e.isSame(t[i],"days")||(r=!1)}),r&&(i=a)}}),i},_change:function(a,r,s){var o=this,c=t(a.target),d=n.query(l,this.$relatedElement);switch(r){case"shortcut":var p=c.attr("data-value").split(",");e.each(p,function(t,e){o.options.dates[e]=t,d[e].val(t)}),c.addClass("active").siblings().removeClass("active"),this.submit(a,r);break;case"date":var u=i(c.val());if(!u.isValid())break;d[s].val(u)}},_autoHide:function(){var e=this,i="click"+u+"_"+this.clientId;this._state=g.INACTIVE,t(document.body).off(i).on(i,function(i){if(t.contains(document.body,i.target)){if(i.target===e.element||t.contains(e.element,i.target)||i.target===e.$relatedElement[0]||t.contains(e.$relatedElement[0],i.target)){if(e._state===g.ACTIVE)return;return e.trigger(t.Event("active"+u,{target:i.target})),void(e._state=g.ACTIVE)}if(e._state!==g.INACTIVE){var n=t.Event("inactive"+u,{target:i.target});e.trigger(n),e._state=g.INACTIVE,n.isDefaultPrevented()||e.hide()}}}).on(i,function(i){var n=t(".datepickerwrapper-inputs-body",e.$relatedElement),a=t(".datepickerwrapper-pickers",e.$relatedElement);i.target!==e.$relatedElement[0]&&!t.contains(e.$relatedElement[0],i.target)||!n.length||!a.length||t.contains(n[0],i.target)||t.contains(a[0],i.target)||e._hideDatePicker()})},destroy:function(){var e="click.datepickerwrapper_toggle_"+this.clientId;this.$element.off(e),this.$manager.undelegate(this.$element,this),this.$manager.undelegate(this.$relatedElement,this),this.$relatedElement.remove(),e="click"+u+"_"+this.clientId,t(document.body).off(e)}}),d}.apply(e,n),!(void 0!==a&&(t.exports=a))},function(e,i){e.exports=t},function(t,i){t.exports=e},function(t,e){t.exports=i},function(t,e){t.exports=n},function(t,e){t.exports=a},function(t,e){t.exports=r},function(t,e){t.exports=s},function(t,e,i){var n,a;n=[i(2)],a=function(t){function e(e,n,a,o){var c=t(e);if(!c.length)return i(n);var d=c.offset(),l=d.left,p=d.top,u=c.outerWidth(),h=c.outerHeight(),f=t(n),m="none"!==f.css("display");f.show();var v=f.outerWidth(),g=f.outerHeight();m||f.hide();var k,x,b=u/2-v/2,E=h/2-g/2;switch(a){case"top":k=l+b,x=p-g;break;case"bottom":k=l+b,x=p+h;break;case"left":k=l-v,x=p+E;break;case"right":k=l+u,x=p+E}if(r.test(a)!==r.test(o)&&s.test(a)!==s.test(o))switch(o){case"top":x=p;break;case"bottom":x=p+h-g;break;case"left":k=l;break;case"right":k=l+u-v}return{left:k,top:x}}function i(e,i){var n,a;if(i)n=parseFloat(e,12),a=parseFloat(i,12);else{var r=t(e),s="none"!==r.css("display");r.show(),n=r.outerWidth(),a=r.outerHeight(),s||r.hide()}var o=t(window),c=o.width(),d=o.height(),l=o.scrollLeft(),p=o.scrollTop();return{left:c/2-n/2+l,top:d/2-a/2+p}}function n(e,i,n){var a=t(e),r="none"!==a.css("display");a.show();var s=a.outerWidth(),o=a.outerHeight();r||a.hide();var c={opacity:0,left:i.left,top:i.top};switch(n){case"top":c.top=c.top-.5*o;break;case"bottom":c.top=c.top+.5*o;break;case"left":c.left=c.left-.5*s;break;case"right":default:c.left=c.left+.5*s}return c}function a(t,e){return{opacity:1,left:e.left,top:e.top}}var r=/top|bottom/,s=/left|right/;return e.center=i,e.start=n,e.end=a,e}.apply(e,n),!(void 0!==a&&(t.exports=a))},function(t,e,i){var n;n=function(){return"<div class=\"datepickerwrapper <%= placement %> <%= mode === 'multiple' ? 'multiple' : 'single' %>\">\n    <!--  -->\n    <% if (mode === 'signal') { %>\n"+'    <div bx-name="<%= calendar %>" data-type="<%= type %>" data-date="<%= dates[0] %>" data-range="<%= _ranges %>" data-excluded="<%= _excludeds %>" data-unlimit="<%= unlimits[0] %>" data-pages="<%= pages %>" class="picker"></div>\n    <% } %>\n    <!--  -->\n    <% if (mode === \'multiple\') { %>\n    <% if( shortcuts ) { %>\n    <div class="datepickerwrapper-shortcuts form-inline form-group">\n        <div class="datepickerwrapper-shortcuts-header">\n            <div class="datepickerwrapper-shortcuts-header-title">快捷日期</div>\n        </div>\n        <div class="datepickerwrapper-shortcuts-body clearfix">\n            <% for (var title in shortcuts) { %>\n                <span bx-click="_change(\'shortcut\')" data-value="<%= \n                    _.map(shortcuts[title], function(item) {\n                        return item.format(\'YYYY-MM-DD HH:mm:ss\')\n                    }).join(\',\')\n                %>" class="shortcut"><%= title %></span>\n            <% } %>\n        </div>\n    </div>\n    <% } %>\n    <div class="datepickerwrapper-inputs form-inline form-group">\n        <div class="datepickerwrapper-inputs-header">\n            <div class="datepickerwrapper-inputs-header-title">日期范围</div>\n        </div>\n        <div class="datepickerwrapper-inputs-body <%= typeMap.time ? \'time\' : \'\' %>">\n            <% for (var i = 0; i < dates.length; i++ ) { %>\n                <input bx-click="_inputToggleDatePicker(<%= i %>)" bx-change="_change(\'date\', <%= i %>)" value="<%= dates[i] %>" type="text" class="form-control">\n                <%= i < dates.length -1 ? \'-\' : \'\' %>\n            <% } %>\n        </div>\n    </div>\n    <div class="datepickerwrapper-pickers">\n        <% for (var i = 0; i < dates.length; i++ ) { %>\n            <div bx-name="<%= calendar %>" data-type="<%= type %>" data-date="<%= dates[i] %>" data-range="<%= _ranges %>" data-excluded="<%= _excludeds %>" data-unlimit="<%= unlimits[i] %>" data-pages="<%= pages %>" class="picker"></div>\n        <% } %>\n    </div>\n    <div class="datepickerwrapper-footer">\n        <button type="button" class="btn btn-default submit" bx-click="submit">确认</button>\n        <a href="javascript: void(0);" bx-click="hide" class="btn btn-default cancel ml5">取消</a>\n    </div>\n    <% } %>\n</div>'}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))}])});
//# sourceMappingURL=datepickerwrapper.js.map