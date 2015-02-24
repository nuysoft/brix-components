/* global define */
define(function() {
    return (function(){/*
<div class="dialog column-priority">
    <div class="dialog-content">
        <div class="dialog-header row">
            <div class="col-xs-12">
                <h4>
                    <span>请选择列</span>
                    <!-- <small>
                        <a href="javascript: void(0);" bx-click="all">全选</a>
                        <a href="javascript: void(0);" bx-click="clear">清空</a>
                    </small> -->
                </h4>
            </div>
            <!-- <div class="col-xs-4">
                <h4>自定义列顺序</h4>
            </div> -->
        </div>
        <div class="dialog-body row">
            <div class="col-xs-12 candidates">
                <% for ( var i = 0; i < candidates.length; i++ ) { %>
                <label class="item">
                    <input type="checkbox" checked data-index="<%= candidates[i].index %>">
                    <span><%= candidates[i].name %></span>
                </label>
                <% } %>
            </div>
            <!-- <div class="col-xs-4 queue">
                <div>
                    <div class="item item-not-allowed">
                        <span>不动列</span>
                    </div>
                </div>
                <div class="sortable-wrapper">
                    <% for ( var i = 0; i < candidates.length; i++ ) { %>
                    <div class="item item-move">
                        <span class="item-name"><%= candidates[i].name %></span>
                    </div>
                    <% } %>
                </div>
                <div>
                    <div class="item item-not-allowed">
                        <span>不动列</span>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="dialog-footer">
            <button bx-click="submit" class="btn btn-default btn-sm">确定</button>
            <a bx-click="cancel" href="javascript: void(0);">取消</a>
        </div>
    </div>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})