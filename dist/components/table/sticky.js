!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery"),require("underscore")):"function"==typeof define&&define.amd?define(["jquery","underscore"],e):"object"==typeof exports?exports["components/table/sticky"]=e(require("jquery"),require("underscore")):t["components/table/sticky"]=e(t.jquery,t.underscore)}(this,function(t,e){return function(t){function e(i){if(o[i])return o[i].exports;var r=o[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(1)},function(t,e,o){var i,r;i=[o(2),o(3)],r=function(t,e){function o(o,d){function s(t){i(t,c,a,l,f),r(t,c,a,l,f)}var c=t(o),a=c.parent(),u=c.attr("data-sticky-id")||e.uniqueId("sticky_");t('[data-table-id="'+u+'"]',a).remove(),c.attr("data-sticky-id",u);var f=t("<div>").attr("data-table-id",u).insertBefore(c);a.off("scroll.sticky."+u).on("scroll.sticky."+u,e.throttle(function(t){f.scrollLeft(t.target.scrollLeft)},4));var l=t("<table><thead></thead></table>").addClass(c.attr("class")).appendTo(f);l.find("> thead").html(c.find("> thead").html()),s(),f.hide(),n(void 0,c,a,l,f),t(document).off("scroll.sticky."+u).on("scroll.sticky."+u,e.throttle(function(t){n(t,c,a,l,f),f.is(":visible")&&s(t)},100)),t(document).off("resize.sticky."+u).on("resize.sticky."+u,e.throttle(function(t){s(t)},1e3))}function i(t,e,o,i,r){r.width(e.outerWidth()),r.css({position:"fixed",left:e.offset().left,top:0,"z-index":1,overflow:"hidden"})}function r(o,i,r,n,d){if(!o||"scroll"!==o.type){n.width(i.outerWidth());var s=i.find("> thead > th"),c=n.find("> thead > th");e.each(s,function(e,o){e=t(e),t(c[o]).css({width:e.outerWidth(),height:e.outerHeight(),display:e.css("display"),"text-align":e.css("text-align")})})}}function n(t,e,o,i,r){var n=window.scrollY,d=e.outerHeight(),s=e.offset().top,c=r.outerHeight();return n<=s?void r.hide():s<n&&n<=s+d-c?void r.show():s<n&&n>s+d-c?void r.hide():n>s+d?void r.hide():void 0}return function(i){var r,n=t(i);r=n.is("table")?n:t(' table[data-sticky="true"]',n),e.each(r,function(t){o(t)})}}.apply(e,i),!(void 0!==r&&(t.exports=r))},function(e,o){e.exports=t},function(t,o){t.exports=e}])});
//# sourceMappingURL=sticky.js.map