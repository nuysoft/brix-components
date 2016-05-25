define(["jquery","underscore","moment","components/base","brix/event","./datepicker.tpl.js"],function(t,e,i,a,r,n){function s(){}var d=".datepicker",o="second minute hour time date month year",h="YYYY-MM-DD",c="HH:mm:ss",u=h+" "+c;return s.NAMESPACE=d,s.TYPES=o,s.DATE_PATTERN=h,s.TIME_PATTERN=c,s.DATE_TIME_PATTERN=u,s.typeMap=function(t){-1!==e.indexOf(["all","",void 0],t)&&(t=o);var i={};return e.each(t.split(/\s+/),function(t){i[t]=!0}),i.time=i.time||i.hour||i.minute||i.second,i},e.extend(s.prototype,a.prototype,{options:{date:i(),type:"all",range:[],excluded:[],unlimit:!1},init:function(){this.options.range=e.flatten(this.options.range),this.options.excluded=e.flatten(this.options.excluded),this.options.unlimit&&(this.options.unlimit=i(this.options.unlimit,e.isString(this.options.unlimit)&&u)),this.data=this.data||{},this.data.options=this.options,this.data.moment=i,this.data.date=i(this.options.date,e.isString(this.options.date)&&u),this.options.unlimit&&this.options.unlimit.toDate().getTime()===this.data.date.toDate().getTime()&&(this.__unlimit=this.options.unlimit),this.data.typeMap=s.typeMap(this.options.type)},render:function(){this.$element=t(this.element).append(e.template(n)(this.data));var i=this.$manager=new r("bx-");i.delegate(this.$element,this),this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker()},val:function(a){var r=this.data.date.toDate().getTime();if(a){this.__unlimit=!1,this.data.date=i(a,e.isString(a)&&u);var n=this.data.date.toDate().getTime()===r,s=t.Event((n?"unchange":"change")+d);return this.trigger(s,i(this.data.date)),n||this._renderYearPicker()._renderMonthPicker()._renderDatePicker()._renderTimePicker(),this}return i(this.__unlimit||this.data.date)},range:function(t){return t?(this.options.range=e.flatten(t),this._renderDatePicker(),this):this.options.range},excluded:function(t){return t?(this.options.excluded=e.flatten(t),this._renderDatePicker(),this):this.options.excluded},_slide:function(t,e,i){2==arguments.length&&(i=e,e=t),this.$element.find(e).slideUp("fast"),this.$element.find(i).slideDown("fast")},_move:function(e,a,r){var n=this.__isUnlimitMode();n&&(this.data.date=i().startOf("day")),this.__unlimit=!1;var s=this.data.date,o=s.toDate().getTime();if("period"===a)return void this._renderYearPicker(r)._renderDatePicker();s.add(r,a);var h=s.toDate().getTime()===o,c=t.Event((h?"unchange":"change")+d);this.trigger(c,[i(s),a]),h||this._renderYearPicker()._renderMonthPicker()._renderDatePicker()},_active:function(e,a){var r=this.__isUnlimitMode();r&&(this.data.date=i().startOf("day")),this.__unlimit=!1;var n=this.data.date,s=n.toDate().getTime(),o=t(e.target);n.set(a,+o.attr("data-value"));var h=n.toDate().getTime()===s,c=t.Event((h?"unchange":"change")+d);switch(this.trigger(c,[i(n),a]),h||this._renderYearPicker()._renderMonthPicker()._renderDatePicker(),a){case"year":if(this.data.typeMap.year)break;this._slide(".yearpicker",".monthpicker");break;case"month":if(this.data.typeMap.month)break;this._slide(".monthpicker",".datepicker")}},_hooks:{38:1,40:-1},_changeTime:function(e,a,r,n){this.__unlimit=!1;var s=this.data.date;if(void 0===a&&void 0===r&&void 0===n){var o=t.Event("change"+d);return void this.trigger(o,[i(s),"time"])}var h=s.toDate().getTime();if("keydown"===e.type){if(!this._hooks[e.which])return;a=this._hooks[e.which]||0}("blur"===e.type||"focusout"===e.type)&&(this.data.date.set(r,e.target.value),a=0),s.add(a,n),e.preventDefault(),e.stopPropagation();var c=s.toDate().getTime()===h,u=t.Event((c?"unchange":"change")+d);this.trigger(u,[i(s),r]),c||this._renderTimePicker()._renderYearPicker()._renderMonthPicker()._renderDatePicker()},_changeHour:function(t,e){this._changeTime(t,e,"hour","hours")},_changeMinute:function(t,e){this._changeTime(t,e,"minute","minutes")},_changeSecond:function(t,e){this._changeTime(t,e,"second","seconds")},__isUnlimitMode:function(){return this.options.unlimit&&(this.__unlimit||this.options.unlimit.toDate().getTime()===this.data.date.toDate().getTime())&&!0||!1},_renderYearPicker:function(e){e=e||0;var a=this.data.date,r=this.__isUnlimitMode();r&&(a=i().startOf("day"));var n=this.$element.find(".yearpicker .picker-header h4"),s=this.$element.find(".yearpicker .picker-body"),d=20,o=s.data(),h=a.get("year");o.start=(o.start||h-h%d)+e*d,o.end=o.start+d-1,n.text(o.start+" - "+o.end),s.empty();for(var c=o.start;c<=o.end;c++)t("<span>").text(c).attr("data-value",c).attr("bx-click",'_active("year")').addClass(r||h!==c?"":"active").appendTo(s);return this},_renderMonthPicker:function(){var a=this.data.date,r=this.__isUnlimitMode();r&&(a=i().startOf("day"));var n=this.$element.find(".monthpicker .picker-header h4"),s=this.$element.find(".monthpicker .picker-body");n.text(a.get("year")),s.empty();var d=function(){for(var t=[],e=1;12>=e;e++)t.push(10>e?"0"+e:e);return t}();return e.each(d,function(e,i){t("<span>").text(e).attr("data-value",i).addClass(r||a.get("month")!==i?"":"active").attr("bx-click",'_active("month")').appendTo(s)}),this},_renderDatePicker:function(){function a(t){if(!h.length)return!0;for(var a,r,s=i(n).startOf("day").set("date",t),d=0;d<h.length;d+=2){if(a=h[d]&&i(h[d],e.isString(h[d])&&u).startOf("day"),r=h[d+1]&&i(h[d+1],e.isString(h[d+1])&&u).startOf("day"),a&&r){var o=i.min(a,r),c=i.max(a,r);a=o,r=c}if(a&&r&&s.diff(a,"days")>=0&&s.diff(r,"days")<=0)return!0;if(a&&!r&&s.diff(a,"days")>=0)return!0;if(!a&&r&&s.diff(r,"days")<=0)return!0;if(!a&&!r)return!0}return!1}function r(t){if(!c.length)return!1;for(var a,r,s=i(n).startOf("day").set("date",t),d=0;d<c.length;d+=2){if(a=c[d]&&i(c[d],e.isString(c[d])&&u).startOf("day"),r=c[d+1]&&i(c[d+1],e.isString(c[d+1])&&u).startOf("day"),a&&r){var o=i.min(a,r),h=i.max(a,r);a=o,r=h}if(a&&r&&s.diff(a,"days")>=0&&s.diff(r,"days")<=0)return!0;if(a&&!r&&s.diff(a,"days")>=0)return!0;if(!a&&r&&s.diff(r,"days")<=0)return!0;if(!a&&!r)return!0}return!1}var n=this.data.date,s=this.__isUnlimitMode();s&&(n=i().startOf("day"));var d=n.daysInMonth(),o=i(n).date(1).day(),h=this.options.range,c=this.options.excluded,m=this.$element.find(".datepicker .picker-header h4"),f=this.$element.find(".datepicker .picker-body .datepicker-body-value");m.text(n.format("YYYY - MM")),f.empty();for(var p=0;o>p;p++)t('<span class="inactive">').appendTo(f);for(var l=1;d>=l;l++)t("<span>").text(l).attr("data-value",l).addClass(s||n.date()!==l?"":"active").addClass(!a(l)||r(l)?"disabled":"").attr("bx-click",'_active("date")').appendTo(f);return this},_renderTimePicker:function(){var t=i(this.data.date),e=this.$element.find(".timepicker div.timepicker-group input");return e.eq(0).val(t.format("HH")),e.eq(1).val(t.format("mm")),e.eq(2).val(t.format("ss")),this},_unlimit:function(){var e=this.options.unlimit;this.__unlimit=e;var i=e.isSame(this.data.date),a=t.Event((i?"unchange":"change")+d);this.trigger(a,[e,"date"]),this._renderYearPicker()._renderMonthPicker()._renderDatePicker()},destroy:function(){this.$manager.undelegate(this.$element,this)}}),s});