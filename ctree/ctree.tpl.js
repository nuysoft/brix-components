/* global define */
define(function() {
    return "<ul>\n" +
        "    <% for(var i = 0, item; item = children[i]; i++ ) { %>\n" +
        "        <li>\n" +
        "            <strong title=\"moduleId\"> <%= item.module.moduleId %></strong>\n" +
        "            -\n" +
        "            <small title=\"clientId\"><%= item.module.clientId %></small>\n" +
        "            <%= item.childrenFn() %>\n" +
        "        </li>\n" +
        "    <% } %>\n" +
        "</ul>"
})