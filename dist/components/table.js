!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery"),require("underscore"),require("components/base"),require("Sortable"),require("brix/event")):"function"==typeof define&&define.amd?define(["jquery","underscore","components/base","Sortable","brix/event"],e):"object"==typeof exports?exports["components/table"]=e(require("jquery"),require("underscore"),require("components/base"),require("Sortable"),require("brix/event")):t["components/table"]=e(t.jquery,t.underscore,t["components/base"],t.Sortable,t["brix/event"])}(this,function(t,e,i,n,r){return function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){var n,r;n=[i(2),i(3),i(4),i(5),i(6),i(8),i(13)],r=function(t,e,i,n,r,a,o){function s(){}var c=".table",h={UUID:0,COLUMN:{ID:"column-id",FIELD:"column-field",NAME:"column-name",RWD:{RANGE:"column-rwd-range",LIMIT:"column-rwd-limit",FADE:"column-rwd-fade",CURSOR:"column-rwd-cursor"},PRIORITY:{FIELDS:"column-priority-fields",TRIGGER:"column-priority-trigger",STATE:"column-priority-state",INDEX:"column-priority-index",PLACEMENT:"column-priority-placement",ALIGN:"column-priority-align"}}};return e.extend(s.prototype,i.prototype,{options:{},init:function(){this.$element=t(this.element)},render:function(){var i=this;n(this.element,function(t,e,n){i.trigger("toggle"+c,[e,n]),i.contextual()});var s,d;if(this.options[h.COLUMN.RWD.RANGE]){s=r(this,this.options,h,function(t,e){i.trigger("change"+r.NAMESPACE,[e])});var l="resize.table_"+this.clientId;t(window).on(l,e.throttle(function(){s.beautify()},50))}this.options[h.COLUMN.PRIORITY.TRIGGER]&&(d=a(this,this.options,h,function(t,e){i.trigger("change"+a.NAMESPACE,[e]),s.flush()}),this.options[h.COLUMN.PRIORITY.FIELDS]&&d.fields(this.options[h.COLUMN.PRIORITY.FIELDS])),this.columnRWDHandler=s,this.columnPriorityHandler=d,!this.options[h.COLUMN.RWD.RANGE]&&this.options[h.COLUMN.PRIORITY.TRIGGER]&&this.options.sticky&&o(this.element)},contextual:function(){e.each(this.$element.find("input:checkbox"),function(e){var i=t(e).prop("checked");t(e).closest("tr")[i?"addClass":"removeClass"]("active")})},destroy:function(){var e="resize.table_"+this.clientId;t(window).off(e),e="click"+a.NAMESPACE+"_"+this.clientId,t(document.body).off(e),this.columnPriorityHandler&&this.columnPriorityHandler.$manager.undelegate(this.columnPriorityHandler.$relatedElement)}}),s.extend=i.extend,s}.apply(e,n),!(void 0!==r&&(t.exports=r))},function(e,i){e.exports=t},function(t,i){t.exports=e},function(t,e){t.exports=i},function(t,e,i){var n,r;n=[i(2),i(3)],r=function(t,e){function i(e,s){var d=t(e),l="["+c+"],["+h+"]";return n(d,l),t(e).on("change.linkage",l,function(n){if(n.target===n.currentTarget){var c=t(n.currentTarget);r(c,d),a(c,d),o(c,d),s&&s(n,i.val(e),n.currentTarget)}}),i}function n(i,n){var r=i.find(n);e.each(r,function(e){var i=t(e);i.attr(c),i.attr(h)})}function r(i,n){var a=i.attr(c),o=i.attr(h);if(o&&a!==o){var s=n.find(e.template(d)({name:o}));if(s.length){var f=n.find(e.template(l)({name:o}));if(f.length){var u=f.filter(":checkbox"),p=[];e.each(u,function(t){p.push(!t.indeterminate&&t.checked)});var v=t(e.filter(u,function(t){return t.indeterminate})),m=f.filter(":radio"),g=e.uniq(e.map(m,function(e){return t(e).attr("name")})),b=[];e.each(g,function(t){t&&b.push(!!m.filter('[name="'+t+'"]:checked').length)});var I=e.uniq(p.concat(b));s.prop("indeterminate",!!v.length||2===I.length).prop("checked",!v.length&&(1===I.length&&I[0])),r(s,n)}}}}function a(i,n){var r=i.attr(c),o=i.attr(h),s=i.prop("checked");if(r&&r!==o){var d=n.find(e.template(l)({name:r}));if(d.length){var f=d.not(":disabled");if(f.length){var u=f.filter(":checkbox");u.prop("checked",s);var p=f.filter(":radio");if(s||p.prop("checked",s),s){var v=e.uniq(e.map(p,function(e){return t(e).attr("name")}));e.each(v,function(i){if(i){var n=p.filter('[name="'+i+'"]');if(n.length){var r=e.map(n,function(e){return t(e).prop("checked")});e.indexOf(r,s)===-1&&n.eq(0).prop("checked",s)}}})}e.each(d,function(e){a(t(e),n)})}}}}function o(i,n){if(i.is(":radio")){var o=i.attr("name"),s=n.find('[name="'+o+'"]').not(i);e.each(s,function(e){var i=t(e);r(i,n),a(i,n)})}}var s="data-linkage-",c=s+"name",h=s+"parent-name",d="["+c+'="<%= name %>"]',l="["+h+'="<%= name %>"]';return i.off=function(e){var n=t(e),r="["+c+"],["+h+"]";return n.off("click.linkage",r),i},i.val=function(n,o){var s=t(n);if(o){var c=s.find("input:checkbox, input:radio").not(":disabled").prop("checked",!1);return e.each(o,function(i){var n=c.filter('[value="'+i+'"]').prop("checked",!0);e.each(n,function(e){r(t(e),s),a(t(e),s)})}),i}o=[];var h=s.find("input:checkbox:checked, input:radio:checked");return e.each(h,function(e){var i=t(e).attr("value");void 0!==i&&""!==i&&o.push(i)}),o},i}.apply(e,n),!(void 0!==r&&(t.exports=r))},function(t,e,i){var n,r;n=[i(2),i(3),i(7)],r=function(t,e,i){function n(e,i,n,a){var h=i[n.COLUMN.RWD.RANGE]||[0,-1],d=i[n.COLUMN.RWD.CURSOR]||1,l=i[n.COLUMN.RWD.LIMIT]||5,f=i[n.COLUMN.RWD.FADE]||!1,u=t(e.element),p=s(n,u,h,d,l),v=r(u,'<span class="brixfont chevron-left">&#xe62f;</span>'),m=r(u,'<span class="brixfont chevron-right">&#xe630;</span>'),g={Constant:n,$table:u,range:h,cursor:d,limit:l,fade:f,state:p,$leftArrow:v,$rightArrow:m,callback:a};return o(g),setTimeout(function(){c(g)},100),{state:p,flush:function(t){return s(n,u,h,t||d,l,p),c(g),this},beautify:function(){return c(g),this}}}function r(i,n){var r=i.find("> thead"),a=e.template(d)({text:n,height:r.height()}),o=t(a).insertAfter(i).offset({top:r.offset().top});return o}function a(t,e){s(e.Constant,e.$table,e.range,e.state.cursor,e.state.limit,e.state),c(e),t.preventDefault(),t.stopPropagation()}function o(e){e.$leftArrow.on("click"+h,function(t){e.state.moveToPrev(),a(t,e),e.callback&&e.callback(t,e.state,t.currentTarget)}),e.$rightArrow.on("click"+h,function(t){e.state.moveToNext(),a(t,e),e.callback&&e.callback(t,e.state,t.currentTarget)}),e.fade?e.$table.hover(function(){e.$leftArrow.fadeIn("fast"),e.$rightArrow.fadeIn("fast"),c(e)},function(i){i.relatedTarget===e.$leftArrow.get(0)||t.contains(e.$leftArrow.get(0),i.relatedTarget)||i.relatedTarget===e.$rightArrow.get(0)||t.contains(e.$rightArrow.get(0),i.relatedTarget)||(e.$leftArrow.fadeOut("fast"),e.$rightArrow.fadeOut("fast"))}):(e.$leftArrow.show(),e.$rightArrow.show(),c(e))}function s(n,r,a,o,s,c){var h=r.find("> thead"),d=r.find("> tbody"),l=h.find("> tr > th");a[0]=(+a[0]+l.length)%l.length,a[1]=(+a[1]+l.length)%l.length,e.each(l,function(e,i){if(e=t(e),i>=a[0]&&i<a[1]){if(void 0!==e.data(n.COLUMN.ID))return;e.attr("data-"+n.COLUMN.ID,n.UUID++)}}),l=e.filter(l,function(t,e){return e>=a[0]&&(0===a[1]||e<a[1])});var u=t(l[0]).prev();l.sort(function(e,i){var r=t(e),a=t(i);return e=+r.attr("data-"+n.COLUMN.PRIORITY.INDEX),i=+a.attr("data-"+n.COLUMN.PRIORITY.INDEX),isNaN(e)&&(e=r.index()),isNaN(i)&&(i=a.index()),e-i}),e.each(l,function(i,n){var r=t(i).index();0===n?u.after(i):t(l[n-1]).after(i);var a=t(i).index(),o=d.find("> tr > td:nth-child("+(r+1)+")");e.each(o,function(e,i){t(e).siblings(":nth-child("+a+")").after(e)})}),l=e.filter(l,function(e){var i=t(e),r=i.data(n.COLUMN.ID),a=i.attr("data-"+n.COLUMN.PRIORITY.STATE);return void 0!==r&&"hide"!==a}),l=t(l),c?(c.setTotal(l.length),c.setCursor(o)):c=new i(l.length,o,s);for(var p,v,m=0;m<c.total;m++)p=m>=c.start&&m<c.end?"show":"hide",v=l.eq(m)[p]().removeClass("start").removeClass("end").addClass(m===c.start?"start":"").addClass(m===c.end-1?"end":"").index(),r.find(e.template(f)({nth:v+1}))[p]();return c}function c(t){t.fade||(t.$leftArrow.show(),t.$rightArrow.show());var i=t.$table.find("> thead"),n=i.height(),r=i.offset().top,a=t.$table.find(e.template(l)({nth:t.range[1]+1}));t.$leftArrow.css({height:n,"line-height":n+"px"}).offset({top:r,left:a.offset().left-t.$rightArrow.width()-(t.state.hasNext?t.$leftArrow.width():0)}),t.$rightArrow.css({height:n,"line-height":n+"px"}).offset({top:r,left:a.offset().left-t.$rightArrow.width()}),t.state.total&&t.state.hasPrev||t.$leftArrow.hide(),t.state.total&&t.state.hasNext||t.$rightArrow.hide()}var h=".table_column_rwd",d='<div class="column-scroll-arrow"><%= text %></div>',l="> thead > tr > th:nth-child(<%= nth %>)",f="> tbody > tr > td:nth-child(<%= nth %>)";return n.NAMESPACE=h,n}.apply(e,n),!(void 0!==r&&(t.exports=r))},function(t,e,i){var n;n=function(){return function(e){function i(t,e,i){this.data="number"==typeof t||"string"==typeof t?void 0:t,this.total=this.data?this.data.length:parseInt(t,10),this.cursor=parseInt(e,10),this.limit=parseInt(i,10),this.calc()}return i.prototype={calc:function(){return this.total&&parseInt(this.total,10)>0?(this.limit=this.limit<1?1:this.limit,this.pages=this.total%this.limit===0?this.total/this.limit:this.total/this.limit+1,this.pages=parseInt(this.pages,10),this.cursor=this.cursor>this.pages?this.pages:this.cursor,this.cursor=this.cursor<1?this.pages>0?1:0:this.cursor,this.start=(this.cursor-1)*this.limit,this.start=this.start<0?0:this.start,this.end=this.start+this.limit>this.total?this.total:this.start+this.limit,this.end=this.total<this.limit?this.total:this.end,this.hasPrev=this.cursor>1,this.hasNext=this.cursor<this.pages,this.hasFirst=this.hasPrev,this.hasLast=this.hasNext,this.prev=this.hasPrev?this.cursor-1:0,this.next=this.hasNext?this.cursor+1:0,this.first=this.hasFirst?1:0,this.last=this.hasLast?this.pages:0,this.focus=this.focus?this.focus:0,this.focus=this.focus%this.limit+this.start,this.focus=this.focus>this.end-1?this.end-1:this.focus):(this.pages=this.cursor=this.start=this.end=0,this.hasPrev=this.hasNext=this.hasFirst=this.hasLast=!1,this.prev=this.next=this.first=this.last=0,this.focus=0),this},moveTo:function(t){return this.cursor=parseInt(t,10),this.calc()},moveToPrev:function(){return this.moveTo(this.cursor-1)},moveToNext:function(){return this.moveTo(this.cursor+1)},moveToFirst:function(){return this.moveTo(1)},moveToLast:function(){return this.moveTo(this.pages)},fetch:function(t){return(t||this.data).slice(this.start,this.end)},setData:function(t){return this.data=t,this.total=t.length,this.calc()},setTotal:function(t){return this.total=parseInt(t,10),this.calc()},setCursor:function(t){return this.cursor=parseInt(t,10),this.calc()},setFocus:function(t){return this.focus=parseInt(t,10),this.focus<0&&(this.focus+=this.total),this.focus>=this.total&&(this.focus-=this.total),this.cursor=parseInt(this.focus/this.limit,10)+1,this.calc()},setLimit:function(t){return this.limit=parseInt(t,10),this.calc()},get:function(t){return void 0!==t?this.data[t%this.data.length]:this.data[this.focus]},toString:function(){return JSON.stringify(this,null,4)}},i.prototype.to=i.prototype.moveTo,i.prototype.toPrev=i.prototype.moveToPrev,i.prototype.toNext=i.prototype.moveToNext,i.prototype.toFirst=i.prototype.moveToFirst,i.prototype.toLast=i.prototype.moveToLast,"undefined"!=typeof t&&t.exports?t.exports=i:e.State=i,i}(this)}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n,r;n=[i(2),i(3),i(9),i(10),i(11),i(12)],r=function(t,e,i,n,r,a){function o(n,r,a,o){var c=t(r[a.COLUMN.PRIORITY.TRIGGER]),p=r[a.COLUMN.PRIORITY.PLACEMENT]||"bottom",m=r[a.COLUMN.PRIORITY.ALIGN]||"right",g=t(n.element),b=s(a,g);l(c,b,p,m),u(n,c,b);var I=f(a,g,c,b,o),x=b.find(".queue .sortable-wrapper");return x.length&&i.create(x[0],{handle:".item-move",animation:150,onEnd:function(){var i={},n=b.find(".queue .sortable-wrapper .item");e.each(n,function(e,n){var r=t(e),o=r.data(a.COLUMN.ID);i[o]=n,r.attr("data-"+a.COLUMN.PRIORITY.INDEX,n)});var r=g.find("> thead th");e.each(r,function(e){var n=t(e),r=n.data(a.COLUMN.ID);void 0!==r&&n.attr("data-"+a.COLUMN.PRIORITY.INDEX,i[r])})}}),b.on("change"+v,"input:checkbox",function(e){var i=t(e.target),n=i.data(a.COLUMN.ID),r=i.prop("checked");b.find(".queue .sortable-wrapper .item").filter("[data-"+a.COLUMN.ID+'="'+n+'"]')[r?"slideDown":"slideUp"]("fast")}),{$relatedElement:b,$manager:I,toggle:function(){b.toggle()},show:function(){b.show()},hide:function(){b.hide()},fields:function(i){if(i){var n=b.find(".candidates input:checkbox"),r=b.find(".queue .sortable-wrapper .item"),s=[];return e.each(n,function(n){var o=t(n),c=o.data(a.COLUMN.FIELD),h=e.indexOf(i,c);o.prop("checked",h!==-1).triggerHandler("change"+v);var d=r.filter("[data-"+a.COLUMN.FIELD+'="'+c+'"]');h===-1?d.hide():(d.show(),s[h]=d)}),e.each(s,function(e,i){e&&(0===i?t(e).parent().prepend(e):s[i-1].after(e))}),h(a,g,b),o&&o(void 0,i),this}return d(a,b)}}}function s(i,n){var r=p(i,n),o=e.template(a)(r),s=t(o).insertAfter(n);return s}function c(t,e,i,n){var a=r(t,e,i,n),o=parseInt(e.css("margin-left"),10)||0,s=parseInt(e.css("margin-top"),10)||0;return{left:a.left+o,top:a.top+s}}function h(i,n,r){var a=r.find(".candidates input:checkbox");return e.each(a,function(e){var r=t(e),a=r.data(i.COLUMN.ID);if(void 0!==a){var o=r.prop("checked"),s=o?"show":"hide",c=n.find("> thead th[data-"+i.COLUMN.ID+'="'+a+'"]').attr("data-"+i.COLUMN.PRIORITY.STATE,s)[s]();n.find("> tbody td:nth-child("+(c.index()+1)+")").attr("data-"+i.COLUMN.PRIORITY.STATE,s)[s]()}}),d(i,r)}function d(i,n){var r=[],a=n.find(".queue .sortable-wrapper .item");return e.each(a,function(e){var n=t(e);"none"!==n.css("display")&&r.push(n.data(i.COLUMN.FIELD)||n.data(i.COLUMN.NAME))}),r}function l(e,i,n,r){e.on("click"+v,function(){return i.is(":visible")?(i.hide(),void t(document.body).removeClass("modal-open")):void i.show().offset(c(e,i,n,r))})}function f(t,e,i,r,a){var o=new n("bx-"),s={submit:function(i){var n=h(t,e,r);a&&a(i,n,i.currentTarget),r.hide()},cancel:function(){r.hide()},all:function(){r.find(".candidates input:checkbox").prop("checked",!0),r.find(".queue .sortable-wrapper .item").show()},clear:function(){r.find(".candidates input:checkbox").prop("checked",!1),r.find(".queue .sortable-wrapper .item").hide()}};return o.delegate(r,s),o}function u(e,i,n){var r="click"+v+"_"+e.clientId;t(document.body).off(r).on(r,function(e){!i[0]||e.target===i[0]||t.contains(i[0],e.target)||e.target===n[0]||t.contains(n[0],e.target)||(t(document.body).removeClass("modal-open"),n.hide())})}function p(i,n){var r=n.find("> thead th"),a=!1,o=[],s=[],c=e.map(r,function(e,n){var r=t(e),c=r.data(i.COLUMN.NAME);if(c||(c=t.trim(r.text()),r.attr("data-"+i.COLUMN.NAME,c)),c)return void 0===r.data(i.COLUMN.ID)?void(a?s:o).push({index:n,name:c}):(a=!0,{index:n,id:r.data(i.COLUMN.ID),name:c,field:r.data(i.COLUMN.FIELD)||c})});return c=e.filter(c,function(t){return!!t}),{Constant:i,candidates:c,leftImmovables:o,rightImmovables:s}}var v=".table_column_priority";return o.NAMESPACE=v,o}.apply(e,n),!(void 0!==r&&(t.exports=r))},function(t,e){t.exports=n},function(t,e){t.exports=r},function(t,e,i){var n,r;n=[i(2)],r=function(t){function e(e,n,r,s){var c=t(e);if(!c.length)return i(n);var h=c.offset(),d=h.left,l=h.top,f=c.outerWidth(),u=c.outerHeight(),p=t(n),v="none"!==p.css("display");p.show();var m=p.outerWidth(),g=p.outerHeight();v||p.hide();var b,I,x=f/2-m/2,N=u/2-g/2;switch(r){case"top":b=d+x,I=l-g;break;case"bottom":b=d+x,I=l+u;break;case"left":b=d-m,I=l+N;break;case"right":b=d+f,I=l+N}if(a.test(r)!==a.test(s)&&o.test(r)!==o.test(s))switch(s){case"top":I=l;break;case"bottom":I=l+u-g;break;case"left":b=d;break;case"right":b=d+f-m}return{left:b,top:I}}function i(e,i){var n,r;if(i)n=parseFloat(e,12),r=parseFloat(i,12);else{var a=t(e),o="none"!==a.css("display");a.show(),n=a.outerWidth(),r=a.outerHeight(),o||a.hide()}var s=t(window),c=s.width(),h=s.height(),d=s.scrollLeft(),l=s.scrollTop();return{left:c/2-n/2+d,top:h/2-r/2+l}}function n(e,i,n){var r=t(e),a="none"!==r.css("display");r.show();var o=r.outerWidth(),s=r.outerHeight();a||r.hide();var c={opacity:0,left:i.left,top:i.top};switch(n){case"top":c.top=c.top-.5*s;break;case"bottom":c.top=c.top+.5*s;break;case"left":c.left=c.left-.5*o;break;case"right":default:c.left=c.left+.5*o}return c}function r(t,e){return{opacity:1,left:e.left,top:e.top}}var a=/top|bottom/,o=/left|right/;return e.center=i,e.start=n,e.end=r,e}.apply(e,n),!(void 0!==r&&(t.exports=r))},function(t,e,i){var n;n=function(){return'<div class="dialog column-priority">\n    <div class="dialog-content">\n        <div class="dialog-header row">\n            <div class="col-xs-8">\n                <h4>\n                    <span>请选择列</span>\n                    <small>\n                        <a href="javascript: void(0);" bx-click="all">全选</a>\n                        <a href="javascript: void(0);" bx-click="clear">清空</a>\n                    </small>\n                </h4>\n            </div>\n            <div class="col-xs-4">\n                <h4>自定义列顺序</h4>\n            </div>\n        </div>\n        <div class="dialog-body row">\n            <div class="col-xs-8 candidates">\n                <% for ( var i = 0; i < candidates.length; i++ ) { %>\n                <label class="item">\n                    <input type="checkbox" \n                        data-<%= Constant.COLUMN.ID %>="<%= candidates[i].id %>" \n                        data-<%= Constant.COLUMN.NAME %>="<%= candidates[i].name %>" \n                        data-<%= Constant.COLUMN.FIELD %>="<%= candidates[i].field %>" \n                        data-<%= Constant.COLUMN.PRIORITY.INDEX %>="<%= candidates[i].index %>" \n                        checked>\n                    <span title="<%= candidates[i].name %>"><%= candidates[i].name %></span>\n                </label>\n                <% } %>\n            </div>\n            <div class="col-xs-4 queue">\n                <!-- immovables -->\n                <div>\n                    <% for( var i = 0; i < leftImmovables.length; i++ ) { %>\n                    <div class="item item-not-allowed">\n                        <span><%= leftImmovables[i].name %></span>\n                    </div>\n                    <% } %>\n                </div>\n                <div class="sortable-wrapper">\n                    <% for ( var i = 0; i < candidates.length; i++ ) { %>\n                    <div class="item item-move" \n                        data-<%= Constant.COLUMN.ID %>="<%= candidates[i].id %>" \n                        data-<%= Constant.COLUMN.NAME %>="<%= candidates[i].name %>" \n                        data-<%= Constant.COLUMN.FIELD %>="<%= candidates[i].field %>" \n                        data-<%= Constant.COLUMN.PRIORITY.INDEX %>="<%= candidates[i].index %>">\n                        <span class="item-name" title="<%= candidates[i].name %>"><%= candidates[i].name %></span>\n                    </div>\n                    <% } %>\n                </div>\n                <div>\n                    <% for( var i = 0; i < rightImmovables.length; i++ ) { %>\n                    <div class="item item-not-allowed">\n                        <span><%= rightImmovables[i].name %></span>\n                    </div>\n                    <% } %>\n                </div>\n            </div>\n        </div>\n        <div class="dialog-footer">\n            <button type="button" bx-click="submit" class="btn btn-default btn-sm">确定</button>\n            <a bx-click="cancel" href="javascript: void(0);">取消</a>\n        </div>\n    </div>\n</div>'}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n,r;n=[i(2),i(3)],r=function(t,e){function i(i,o){function s(t){n(t,c,h,f,l),r(t,c,h,f,l)}var c=t(i),h=c.parent(),d=c.attr("data-sticky-id")||e.uniqueId("sticky_");t('[data-table-id="'+d+'"]',h).remove(),c.attr("data-sticky-id",d);var l=t("<div>").attr("data-table-id",d).insertBefore(c);h.off("scroll.sticky."+d).on("scroll.sticky."+d,e.throttle(function(t){l.scrollLeft(t.target.scrollLeft)},4));var f=t("<table><thead></thead></table>").addClass(c.attr("class")).appendTo(l);f.find("> thead").html(c.find("> thead").html()),s(),l.hide(),a(void 0,c,h,f,l),t(document).off("scroll.sticky."+d).on("scroll.sticky."+d,e.throttle(function(t){a(t,c,h,f,l),l.is(":visible")&&s(t)},100)),t(document).off("resize.sticky."+d).on("resize.sticky."+d,e.throttle(function(t){s(t)},1e3))}function n(t,e,i,n,r){r.width(e.outerWidth()),r.css({position:"fixed",left:e.offset().left,top:0,"z-index":1,overflow:"hidden"})}function r(i,n,r,a,o){if(!i||"scroll"!==i.type){a.width(n.outerWidth());var s=n.find("> thead > th"),c=a.find("> thead > th");e.each(s,function(e,i){e=t(e),t(c[i]).css({width:e.outerWidth(),height:e.outerHeight(),display:e.css("display"),"text-align":e.css("text-align")})})}}function a(t,e,i,n,r){var a=window.scrollY,o=e.outerHeight(),s=e.offset().top,c=r.outerHeight();return a<=s?void r.hide():s<a&&a<=s+o-c?void r.show():s<a&&a>s+o-c?void r.hide():a>s+o?void r.hide():void 0}return function(n){var r,a=t(n);r=a.is("table")?a:t(' table[data-sticky="true"]',a),e.each(r,function(t){i(t)})}}.apply(e,n),!(void 0!==r&&(t.exports=r))}])});
//# sourceMappingURL=table.js.map