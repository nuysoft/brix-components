/* global define */
define(function() {
    return "<ul class=\"tree\">\n" +
        "    <% for(var i = 0, item; item = children[i]; i++ ) { %>\n" +
        "        <li data-node-id=\"<%= item.id %>\" class=\"tree-node <%= item.children && item.children.length ? '': 'tree-leaf' %>\">\n" +
        "            <div class=\"tree-node-control clearfix\">\n" +
        "                <div class=\"tree-node-toggle\" bx-click=\"toggle('<%= item.id %>')\">\n" +
        "                    <span class=\"brixfont plus-sign\">&#xe61f;</span>\n" +
        "                    <span class=\"brixfont minus-sign\">&#xe620;</span>\n" +
        "                </div>\n" +
        "                <div data-node-id=\"<%= item.id %>\" class=\"tree-node-content\" bx-click=\"forward('<%= item.id %>')\" bx-mouseenter=\"forward('<%= item.id %>')\" bx-mouseleave=\"forward('<%= item.id %>')\">\n" +
        "                    <%= contentFn(item) %>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <%= item.childrenFn() %>\n" +
        "        </li>\n" +
        "    <% } %>\n" +
        "</ul>"
})