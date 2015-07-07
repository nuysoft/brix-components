/* global define */
define(function() {
    return (function(){/*
 <div class="btn-error-tips" data-btn-error="true" style="width: {{width}}px">
  {{{msg}}}
  <i class="arrow" style="left: {{left}}px;"></i>
   {{^duration}}
  <i class="errortips-icon">&#xe601;</i>
  {{/duration}}
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})