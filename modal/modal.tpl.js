/* global define */
define(function() {
    return (function(){/*
<div class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button bx-click="hide" type="button" class="close">&times;</button>
                <h4 class="modal-title"><%= title %></h4>
            </div>
            <div class="modal-body"><%= body %></div>
            <div class="modal-footer">
                <button bx-click="hide" type="button" class="btn btn-default">Close</button>
                <button bx-click="hide" type="button" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})