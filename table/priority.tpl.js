/* global define */
define(function() {
    return (function(){/*
<div class="dialog column-priority">
    <div class="dialog-content">
        <div class="dialog-header">
            <h4>请选择列</h4>
            <div class="pull-right">
                <a href="javascript: void(0);" bx-click="all">全选</a>
                <a href="javascript: void(0);" bx-click="clear">清空</a>
            </div>
        </div>
        <div class="dialog-body row">
            <div class="col-xs-8 candidates">
                <% for ( var i = 0; i < candidates.length; i++ ) { %>
                <label class="item">
                    <input type="checkbox" checked data-index="<%= candidates[i].index %>">
                    <span><%= candidates[i].name %></span>
                </label>
                <% } %>
            </div>
            <div class="col-xs-4 queue">
                <% for ( var i = 0; i < candidates.length; i++ ) { %>
                <label class="item">
                    <span><%= candidates[i].name %></span>
                </label>
                <% } %>
            </div>
        </div>
        <div class="dialog-footer">
            <button bx-click="submit" class="btn btn-default btn-sm">确定</button>
            <a bx-click="cancel" href="javascript: void(0);">取消</a>
        </div>
    </div>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})