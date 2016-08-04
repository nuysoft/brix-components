/* global define */
define(function() {
    return "<div class=\"areapicker\">\n" +
        "    <div class=\"areapicker-header dialog-header\">\n" +
        "        <h4 class=\"areapicker-header-title dialog-title\">选择地域</h4>\n" +
        "    </div>\n" +
        "    <div class=\"areapicker-body\">\n" +
        "        <table class=\"table table-bordered\">\n" +
        "            <thead>\n" +
        "                <tr>\n" +
        "                    <th>区域</th>\n" +
        "                    <th>\n" +
        "                        <span style=\"padding: 17px 0; display: inline-block;\">省份/城市</span>\n" +
        "                        <label class=\"areapicker-header-toggle\" style=\"vertical-align: bottom; margin-left: 10px;\">\n" +
        "                            <input type=\"checkbox\" data-linkage-name=\"<%= id %>\">\n" +
        "                            <%= name %>\n" +
        "                        </label>\n" +
        "                    </th>\n" +
        "                </tr>\n" +
        "            </thead>\n" +
        "            <tbody>\n" +
        "                <% for ( var i = 0; i < children.length; i++ ) { %>\n" +
        "                <tr>\n" +
        "                    <td width=\"100\">\n" +
        "                        <label>\n" +
        "                            <input type=\"checkbox\" \n" +
        "                                value=\"<%= children[i].id %>\"\n" +
        "                                data-linkage-name=\"<%= children[i].id %>\"\n" +
        "                                data-linkage-parent-name=\"<%= id %>\">\n" +
        "                            <%= children[i].name %>\n" +
        "                        </label>\n" +
        "                    </td>\n" +
        "                    <td>\n" +
        "                        <% for ( var ii = 0; ii < children[i].children.length; ii++ ) { %>\n" +
        "                        <label>\n" +
        "                            <input type=\"checkbox\" \n" +
        "                                value=\"<%= children[i].children[ii].id %>\"\n" +
        "                                data-linkage-name=\"<%= children[i].children[ii].id %>\" \n" +
        "                                data-linkage-parent-name=\"<%= children[i].id %>\">\n" +
        "                            <%= children[i].children[ii].name %>\n" +
        "                        </label>\n" +
        "                        <% } %>\n" +
        "                    </td>\n" +
        "                </tr>\n" +
        "                <% } %>\n" +
        "            </tbody>\n" +
        "        </table>\n" +
        "    </div>\n" +
        "</div>"
})