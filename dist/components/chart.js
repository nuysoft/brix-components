!function(e,_){"object"==typeof exports&&"object"==typeof module?module.exports=_(require("jquery"),require("underscore"),require("Chart"),require("brix/base")):"function"==typeof define&&define.amd?define(["jquery","underscore","Chart","brix/base"],_):"object"==typeof exports?exports["components/chart"]=_(require("jquery"),require("underscore"),require("Chart"),require("brix/base")):e["components/chart"]=_(e.jquery,e.underscore,e.Chart,e["brix/base"])}(this,function(__WEBPACK_EXTERNAL_MODULE_2__,__WEBPACK_EXTERNAL_MODULE_3__,__WEBPACK_EXTERNAL_MODULE_4__,__WEBPACK_EXTERNAL_MODULE_5__){return function(e){function _(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,_),o.loaded=!0,o.exports}var t={};return _.m=e,_.c=t,_.p="",_(0)}([function(e,_,t){e.exports=t(1)},function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6)],__WEBPACK_AMD_DEFINE_RESULT__=function($,_,Chart,Brix,template){return Brix.extend({options:{TYPES:{line:"Line",bar:"Bar",radar:"Radar",polararea:"PolarArea",pie:"Pie",doughnut:"Doughnut"},type:"Line",width:void 0,height:400},render:function(){this.options.width||(this.options.width=$(this.element).width()),this.options.data||(this.options.data=eval("(function(){ return Array.prototype.slice.call(arguments)[0] })("+this.element.innerText+")"),this.element.innerText="");var html=_.template(template)(this.options),canvas=$(html).appendTo(this.element),context=canvas.get(0).getContext("2d"),type=this.options.TYPES[this.options.type.toLowerCase()];this.chart=new Chart(context)[type](this.options.data,{})}})}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),!(void 0!==__WEBPACK_AMD_DEFINE_RESULT__&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))},function(e,_){e.exports=__WEBPACK_EXTERNAL_MODULE_2__},function(e,_){e.exports=__WEBPACK_EXTERNAL_MODULE_3__},function(e,_){e.exports=__WEBPACK_EXTERNAL_MODULE_4__},function(e,_){e.exports=__WEBPACK_EXTERNAL_MODULE_5__},function(e,_,t){var r;r=function(){return'<canvas width="<%= width %>" height="<%= height %>"></canvas>'}.call(_,t,_,e),!(void 0!==r&&(e.exports=r))}])});
//# sourceMappingURL=chart.js.map