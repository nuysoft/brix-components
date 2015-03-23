/* global define */
define(function() {
    return (function(){/*
<div class="areapicker">
    <div class="areapicker-header dialog-header">
        <h4 class="areapicker-header-title dialog-title">选择地域</h4>
    </div>
    <div class="areapicker-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>区域</th>
                    <th>
                        省份/城市
                        <label class="areapicker-header-toggle" style="vertical-align: bottom; margin-left: 10px;">
                            <input type="checkbox" data-linkage-name="<%= id %>">
                            <%= name %>
                        </label>
                    </th>
                </tr>
            </thead>
            <tbody>
                <% for ( var i = 0; i < children.length; i++ ) { %>
                <tr>
                    <td width="100">
                        <label>
                            <input type="checkbox" 
                                value="<%= children[i].id %>"
                                data-linkage-name="<%= children[i].id %>"
                                data-linkage-parent-name="<%= id %>">
                            <%= children[i].name %>
                        </label>
                    </td>
                    <td>
                        <% for ( var ii = 0; ii < children[i].children.length; ii++ ) { %>
                        <label>
                            <input type="checkbox" 
                                value="<%= children[i].children[ii].id %>"
                                data-linkage-name="<%= children[i].children[ii].id %>" 
                                data-linkage-parent-name="<%= children[i].id %>">
                            <%= children[i].children[ii].name %>
                        </label>
                        <% } %>
                    </td>
                </tr>
                <% } %>
            </tbody>
        </table>
    </div>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})