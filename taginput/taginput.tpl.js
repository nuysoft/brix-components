/* global define */
define(function() {
    return "<div class=\"taginput\" bx-click=\"_focus\">\n" +
        "	<div class=\"taginput-placeholder hide <%= data.length ? 'hide' : '' %>\"><%= placeholder %></div>\n" +
        "	<input bx-name=\"components/suggest\" class=\"taginput-input\" autocomplete=\"off\">\n" +
        "</div>"
})