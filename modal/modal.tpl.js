/* global define */
define(function() {
    return "<div class=\"modal fade\">\n" +
        "    <div class=\"modal-dialog\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <div class=\"modal-header\">\n" +
        "                <button bx-click=\"hide\" type=\"button\" class=\"close\">&times;</button>\n" +
        "                <h4 class=\"modal-title\"><%= title %></h4>\n" +
        "            </div>\n" +
        "            <div class=\"modal-body\"><%= body %></div>\n" +
        "            <div class=\"modal-footer\">\n" +
        "                <button bx-click=\"hide\" type=\"button\" class=\"btn btn-default\">Close</button>\n" +
        "                <button bx-click=\"hide\" type=\"button\" class=\"btn btn-primary\">Save</button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>"
})