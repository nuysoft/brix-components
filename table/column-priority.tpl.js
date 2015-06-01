/* global define */
define(function() {
    return (function(){/*
<div class="dialog column-priority">
    <div class="dialog-content">
        <div class="dialog-header row">
            <div class="col-xs-8">
                <h4>
                    <span>请选择列</span>
                    <small>
                        <a href="javascript: void(0);" bx-click="all">全选</a>
                        <a href="javascript: void(0);" bx-click="clear">清空</a>
                    </small>
                </h4>
            </div>
            <div class="col-xs-4">
                <h4>自定义列顺序</h4>
            </div>
        </div>
        <div class="dialog-body row">
            <div class="col-xs-8 candidates">
                <% for ( var i = 0; i < candidates.length; i++ ) { %>
                <label class="item">
                    <input type="checkbox" 
                        data-<%= Constant.COLUMN.ID %>="<%= candidates[i].id %>" 
                        data-<%= Constant.COLUMN.NAME %>="<%= candidates[i].name %>" 
                        data-<%= Constant.COLUMN.FIELD %>="<%= candidates[i].field %>" 
                        data-<%= Constant.COLUMN.PRIORITY.INDEX %>="<%= candidates[i].index %>" 
                        checked>
                    <span title="<%= candidates[i].name %>"><%= candidates[i].name %></span>
                </label>
                <% } %>
            </div>
            <div class="col-xs-4 queue">
                <!-- immovables -->
                <div>
                    <% for( var i = 0; i < leftImmovables.length; i++ ) { %>
                    <div class="item item-not-allowed">
                        <span><%= leftImmovables[i].name %></span>
                    </div>
                    <% } %>
                </div>
                <div class="sortable-wrapper">
                    <% for ( var i = 0; i < candidates.length; i++ ) { %>
                    <div class="item item-move" 
                        data-<%= Constant.COLUMN.ID %>="<%= candidates[i].id %>" 
                        data-<%= Constant.COLUMN.NAME %>="<%= candidates[i].name %>" 
                        data-<%= Constant.COLUMN.FIELD %>="<%= candidates[i].field %>" 
                        data-<%= Constant.COLUMN.PRIORITY.INDEX %>="<%= candidates[i].index %>">
                        <span class="item-name" title="<%= candidates[i].name %>"><%= candidates[i].name %></span>
                    </div>
                    <% } %>
                </div>
                <div>
                    <% for( var i = 0; i < rightImmovables.length; i++ ) { %>
                    <div class="item item-not-allowed">
                        <span><%= rightImmovables[i].name %></span>
                    </div>
                    <% } %>
                </div>
            </div>
        </div>
        <div class="dialog-footer">
            <button bx-click="submit" class="btn btn-default btn-sm">确定</button>
            <a bx-click="cancel" href="javascript: void(0);">取消</a>
        </div>
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})