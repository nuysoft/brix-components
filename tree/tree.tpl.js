/* global define */
define(function() {
    return (function(){/*
<ul class="tree">
    <% for(var i = 0, item; item = children[i]; i++ ) { %>
        <li data-node-id="<%= item.id %>" class="tree-node <%= item.children && item.children.length ? '': 'tree-leaf' %>">
            <div class="tree-node-control clearfix">
                <div class="tree-node-toggle" bx-click="toggle('<%= item.id %>')">
                    <span class="brixfont plus-sign">&#xe61f;</span>
                    <span class="brixfont minus-sign">&#xe620;</span>
                </div>
                <div data-node-id="<%= item.id %>" class="tree-node-content" bx-click="forward('<%= item.id %>')" bx-mouseenter="forward('<%= item.id %>')" bx-mouseleave="forward('<%= item.id %>')">
                    <%= contentFn(item) %>
                </div>
            </div>
            <%= item.childrenFn() %>
        </li>
    <% } %>
</ul>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})