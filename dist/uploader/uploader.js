define(["jquery","underscore","brix/loader","components/base","css!./uploader.css"],function(e,t,n,r){function o(){return("token"+Math.random()).replace(/\D/g,"")}function i(e,t){try{t(void 0,JSON.parse(e))}catch(n){try{t(void 0,new Function("return "+e)())}catch(r){console.log(e),console.error(r),t(r,e)}}finally{}}function a(){}var s='<input name="<%= name %>" type="file" class="uploader-ghost">',l="data-token",p="["+l+"]",c=".uploader",d=".isDefaultPrevented";return t.extend(a.prototype,r.prototype,{options:{action:"",name:"file",transport:"iframe",multiple:!0},render:function(){this.$element=e(this.element),this.$element.parent().css("position","relative");var r=e(t.template(s)(this.options)).attr(l,o()).prop("clientId",this.options.clientId).prop("disabled",this.$element.prop("disabled")).insertAfter(this.$element).width(this.$element.outerWidth()).height(this.$element.outerHeight()).offset(this.$element.offset());this.options.multiple&&r.attr("multiple","multiple");var i=r[0].form;e(i).off("change"+c).on("change"+c,"input[type=file]"+p,function(e){var t,r=e.currentTarget,o=n.query(r);o.on("start"+c+d,function(e){t=e.isDefaultPrevented()}).trigger("start"+c,[r.files]).off("start"+c+d),t||o.send(i,r,function(e,t){e?o.trigger("error"+c,[r.files,e]):o.trigger("success"+c,[r.files,t]),o.trigger("complete"+c,[r.files])})})},send:function(t,n,r){var o=this;e(n).prop("disabled",!0),this.transports[this.options.transport](this.options,t,n,function(e,t){r(e,t),o.burn(n)})},burn:function(t){var n=e(t);n.replaceWith(n.clone(!0,!0).attr(l,o()).prop("clientId",this.options.clientId).prop("disabled",this.$element.prop("disabled")))},transports:{iframe:function(n,r,o,a){var s="FILE_UPLOAD_IFRAME_",l='<iframe id="<%= id %>" name="<%= id %>" style="display: none;"></iframe>';r.target=s+t.uniqueId(),r.action=n.action,r.method="POST",r.enctype="multipart/form-data";var p=t.template(l)({id:r.target});e(p).insertAfter(r).on("load",function(t){var n=t.target,r=e.trim(n.contentWindow.document.body.innerText);i(r,a),e(n).remove()}).on("error",function(e){a(e,void 0)}),r.submit()},xhr:function(e,n,r,o){var a=new FormData;t.each(r.files,function(t){a.append(e.name,t)});var s=new XMLHttpRequest;s.overrideMimeType("application/json"),s.open("post",e.action,!0),s.upload.onprogress=function(){},s.onerror=function(e){console.error(e)},s.onload=function(){var e=s.responseText;i(e,o)},s.send(a)}},previewInConsole:function(n){if(n.length){var r=this;return void t.each(n,function(e){r.previewInConsole(e)})}var o=new FileReader;o.onload=function(r){var o=e("<img>").attr("src",r.target.result).attr("title",n.name).hide().appendTo("body"),i=o.width(),a=o.height(),s=t.template('padding: <%=pt%>px <%=pr%>px <%=pb%>px <%=pl%>px; line-height: <%=height%>px; background:url("<%=result%>") no-repeat center center;')({pt:a/2,pr:i/2,pb:a/2,pl:i/2,height:a+10,result:r.target.result});console.group(n.name),console.log("%c",s),console.log(n.size+" byte"),console.groupEnd(n.name),o.remove()},o.readAsDataURL(n)},previewAsComponent:function(t,n){var r=new FileReader;r.onload=function(r){var o=e("<img>").addClass("uploader-preview-thumbnail").attr("src",r.target.result).attr("title",t.name);n&&n(void 0,o)},r.readAsDataURL(t)}}),a});