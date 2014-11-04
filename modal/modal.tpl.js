/* global define */
define(function() {
    return (function(){/*
<div class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button bx-click="hide" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title"><%= title %></h4>
      </div>
      <div class="modal-body">
        <ul>
          <li>moduleId: <%= moduleId %></li>
          <li>clientId: <%= clientId %></li>
          <li>parentClientId: <%= parentClientId %></li>
          <li>childClientIds: <%= childClientIds %></li>
        </ul>
      </div>
      <div class="modal-footer">
      <button bx-click="hide" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button bx-click="hide" type="button" class="btn btn-primary">Save</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})