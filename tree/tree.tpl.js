/* global define */
define(function() {
    return (function(){/*
<ul class="tree">
    <% for(var i = 0, item; item = children[i]; i++ ) { %>
        <li class="tree-node <%= item.children && item.children.length ? '': 'tree-leaf' %>">
            <div class="tree-node-control clearfix">
                <div class="tree-node-toggle">
                    <span class="brixfont brixfont-plus-sign">&#xe61d;</span>
                    <span class="brixfont brixfont-minus-sign">&#xe61e;</span>
                </div>
                <div class="tree-node-content">
                    <%= contentFn(item) %>
                </div>
            </div>
            <%= item.childrenFn() %>
        </li>
    <% } %>
</ul>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})