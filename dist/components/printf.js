!function(r,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports["components/printf"]=n():r["components/printf"]=n()}(this,function(){return function(r){function n(o){if(t[o])return t[o].exports;var e=t[o]={exports:{},id:o,loaded:!1};return r[o].call(e.exports,e,e.exports,n),e.loaded=!0,e.exports}var t={};return n.m=r,n.c=t,n.p="",n(0)}([function(r,n,t){r.exports=t(1)},function(r,n,t){var o;o=function(){function r(r,n){if("string"==typeof r&&r.match(f)){n=[].slice.call(arguments,1);var t=0;r.replace(f,function(r,o,e,u,f){var i=n[t++]+"",a="",c="";switch(f){case"s":break;case"d":var F=i.indexOf(".");u&&~F&&(i=i.slice(0,F+1+parseInt(u)));break;case"j":i=JSON.stringify(i)}for(var s=parseInt(e)-i.length,v=0;v<s;v++)"-"===o?c+=" ":a+=" ";return a+i+c})}}function n(r){var n=/[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;r=""+r;for(var t=0,o=0;o<r.length;o++)t+=r[o].match(n)?2:1;return t}function t(r){var t,o,e={};for(o in r)for(t in r[o])e[t]=n(t);var u=0;for(t in e)for(o in r)u=n(r[o][t]),e[t]=u>e[t]?u:e[t];return e}function o(r){var n="+";for(var t in r){for(var o=0;o<r[t]+2;o++)n+="-";n+="+"}return n}function e(r){var t="|";for(var o in r){t+=" ",t+=o;for(var e=0;e<r[o]+2-1-n(o);e++)t+=" ";t+="|"}return t}function u(r,t){var o,e=[];for(var u in r){o="|";for(var f in t){o+=" ",o+=r[u][f];for(var i=0;i<t[f]+2-1-n(r[u][f]);i++)o+=" ";o+="|"}e.push(o)}return e}var f=/%([-+]?)(\d+)?(?:\.?(\d+)?)(s|d)/gi;return r.re=function(r,n){for(var t="",o=0;o<n;o++)t+=r},r.table=function(r){if(r&&r.length){var n=t(r),f=(o(n),e(n),u(r,n));for(var i in f);}},r}.call(n,t,n,r),!(void 0!==o&&(r.exports=o))}])});
//# sourceMappingURL=printf.js.map