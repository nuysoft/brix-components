/* global define */
define(function() {
    return (function(){/*
<div class="areapicker">
    <div class="areapicker-header">
        <h3 class="areapicker-header-title">地区选择</h3>
        <label class="areapicker-header-toggle">
            <input type="checkbox" data-linkage-name="<%= id %>">
            <%= name %>
        </label>
    </div>
    <div class="areapicker-body">
        <table class="table table-bordered">
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