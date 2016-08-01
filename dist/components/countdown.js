!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery"),require("underscore"),require("moment"),require("brix/base")):"function"==typeof define&&define.amd?define(["jquery","underscore","moment","brix/base"],e):"object"==typeof exports?exports["components/countdown"]=e(require("jquery"),require("underscore"),require("moment"),require("brix/base")):t["components/countdown"]=e(t.jquery,t.underscore,t.moment,t["brix/base"])}(this,function(t,e,n,s){return function(t){function e(s){if(n[s])return n[s].exports;var o=n[s]={exports:{},id:s,loaded:!1};return t[s].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){var s,o;s=[n(2),n(3),n(4),n(5),n(6)],o=function(t,e,n,s,o){function i(){}e.extend(i.prototype,s.prototype,{options:{precision:500,expires:new Date},render:function(){this.options.expires=n(this.options.expires,e.isString(this.options.expires)&&"YYYY-MM-DD HH:mm:ss").toDate(),this.data=this.data||e.extend({},this.options);var s=e.template(o)(this.data),i=t(this.element);i.append(s),this.start()},start:function(){function e(){var t=n.update();return 0===t.total&&(r.pop(n.task,n.options.precision),n.trigger("complete.countdown",t)),e}var n=this;return this.trigger("start.countdown",this.offset()),this.task=e,this.on("complete.countdown",function(){t(n.element).addClass("is-complete")}),r.push(e(),this.options.precision),this},stop:function(){return this.options.expires=new Date,r.pop(this.task(),this.options.precision),this},pause:function(){return this.trigger("pause.countdown",this.offset()),r.pop(this.task,this.options.precision),this},resume:function(){return this.trigger("resume.countdown",this.offset()),r.push(this.task(),this.options.precision),this},update:function(){function e(t,e){switch(e=e||2){case 2:return t<10?"0"+t:t;case 3:return t<10?"00"+t:t<100?"0"+t:t}}var n=this.offset();return t(this.element).find(".totalDays").text(e(n.totalDays)).end().find(".hours").text(e(n.hours)).end().find(".minutes").text(e(n.minutes)).end().find(".seconds").text(e(n.seconds)).end(),this.trigger("update.countdown",n),n},offset:function(){var t=this.options.expires,e=t.getTime()-(new Date).getTime();e=Math.ceil(e/1e3),e=e<0?0:e;var n={total:e,seconds:e%60,minutes:Math.floor(e/60)%60,hours:Math.floor(e/60/60)%24,days:Math.floor(e/60/60/24)%7,totalDays:Math.floor(e/60/60/24),weeks:Math.floor(e/60/60/24/7),months:Math.floor(e/60/60/24/30),years:Math.floor(e/60/60/24/365)};return n}});var r={push:function(t,e){this.timers=this.timers||{},this.timers[e]=this.timers[e]||[],this.timers[e].push(t),this.run()},pop:function(t,e){var n=this.timers;if(n&&n[e])for(var s=0;s<n[e].length;s++)n[e][s]===t&&n[e].splice(s--,1)},run:function(){e.each(this.timers,function(t,n){return t.length?void(t.timer||(t.timer=setInterval(function(){e.each(t,function(t){t&&t()})},n))):void clearInterval(t.timer)})}};return i}.apply(e,s),!(void 0!==o&&(t.exports=o))},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e){t.exports=n},function(t,e){t.exports=s},function(t,e,n){var s;s=function(){return'<div class="countdown">\n    <span class="totalDays">00</span> 天\n    <span class="hours"    >00</span> 时\n    <span class="minutes"  >00</span> 分\n    <span class="seconds"  >00</span> 秒\n</div>'}.call(e,n,e,t),!(void 0!==s&&(t.exports=s))}])});
//# sourceMappingURL=countdown.js.map