!function(t,s){"object"==typeof exports&&"object"==typeof module?module.exports=s():"function"==typeof define&&define.amd?define([],s):"object"==typeof exports?exports["components/pagination/state"]=s():t["components/pagination/state"]=s()}(this,function(){return function(t){function s(o){if(i[o])return i[o].exports;var h=i[o]={exports:{},id:o,loaded:!1};return t[o].call(h.exports,h,h.exports,s),h.loaded=!0,h.exports}var i={};return s.m=t,s.c=i,s.p="",s(0)}([function(t,s,i){t.exports=i(1)},function(t,s,i){var o;o=function(){return function(s){function i(t,s,i){this.data="number"==typeof t||"string"==typeof t?void 0:t,this.total=this.data?this.data.length:parseInt(t,10),this.cursor=parseInt(s,10),this.limit=parseInt(i,10),this.calc()}return i.prototype={calc:function(){return this.total&&parseInt(this.total,10)>0?(this.limit=this.limit<1?1:this.limit,this.pages=this.total%this.limit===0?this.total/this.limit:this.total/this.limit+1,this.pages=parseInt(this.pages,10),this.cursor=this.cursor>this.pages?this.pages:this.cursor,this.cursor=this.cursor<1?this.pages>0?1:0:this.cursor,this.start=(this.cursor-1)*this.limit,this.start=this.start<0?0:this.start,this.end=this.start+this.limit>this.total?this.total:this.start+this.limit,this.end=this.total<this.limit?this.total:this.end,this.hasPrev=this.cursor>1,this.hasNext=this.cursor<this.pages,this.hasFirst=this.hasPrev,this.hasLast=this.hasNext,this.prev=this.hasPrev?this.cursor-1:0,this.next=this.hasNext?this.cursor+1:0,this.first=this.hasFirst?1:0,this.last=this.hasLast?this.pages:0,this.focus=this.focus?this.focus:0,this.focus=this.focus%this.limit+this.start,this.focus=this.focus>this.end-1?this.end-1:this.focus):(this.pages=this.cursor=this.start=this.end=0,this.hasPrev=this.hasNext=this.hasFirst=this.hasLast=!1,this.prev=this.next=this.first=this.last=0,this.focus=0),this},moveTo:function(t){return this.cursor=parseInt(t,10),this.calc()},moveToPrev:function(){return this.moveTo(this.cursor-1)},moveToNext:function(){return this.moveTo(this.cursor+1)},moveToFirst:function(){return this.moveTo(1)},moveToLast:function(){return this.moveTo(this.pages)},fetch:function(t){return(t||this.data).slice(this.start,this.end)},setData:function(t){return this.data=t,this.total=t.length,this.calc()},setTotal:function(t){return this.total=parseInt(t,10),this.calc()},setCursor:function(t){return this.cursor=parseInt(t,10),this.calc()},setFocus:function(t){return this.focus=parseInt(t,10),this.focus<0&&(this.focus+=this.total),this.focus>=this.total&&(this.focus-=this.total),this.cursor=parseInt(this.focus/this.limit,10)+1,this.calc()},setLimit:function(t){return this.limit=parseInt(t,10),this.calc()},get:function(t){return void 0!==t?this.data[t%this.data.length]:this.data[this.focus]},toString:function(){return JSON.stringify(this,null,4)}},i.prototype.to=i.prototype.moveTo,i.prototype.toPrev=i.prototype.moveToPrev,i.prototype.toNext=i.prototype.moveToNext,i.prototype.toFirst=i.prototype.moveToFirst,i.prototype.toLast=i.prototype.moveToLast,"undefined"!=typeof t&&t.exports?t.exports=i:s.State=i,i}(this)}.call(s,i,s,t),!(void 0!==o&&(t.exports=o))}])});
//# sourceMappingURL=state.js.map