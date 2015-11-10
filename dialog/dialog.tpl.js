/* global define */
define(function() {
    return (function(){/*
<div class="dialog dialog-singleton dialog-<%= placement %>">
    <button bx-click="close" type="button" class="dialog-close <%= closable ? '' : 'hide' %>"><span class="brixfont">&#xe62d;</span><!-- &times; --></button>
    <div class="dialog-content">
        <%= content %>
        <!-- 
        <div class="dialog-header">
            <h4 class="dialog-title">Title</h4>
        </div>
        <div class="dialog-body">Body</div>
        <div class="dialog-footer">
            <button bx-click="close" type="button" class="btn btn-default">Close</button>
            <button bx-click="close" type="button" class="btn btn-primary">Save</button>
        </div>
         -->
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})