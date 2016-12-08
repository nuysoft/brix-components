/* global define */
define(function() {
    return "<div class=\"hourpicker\">\n" +
        "    <div class=\"apply-dialog\">\n" +
        "        <div class=\"apply-dialog-body\">\n" +
        "            <% for ( var i = 0; i < DICT.length; i++ ) { %>\n" +
        "            <label data-value=\"<%= DICT[i][0] %>\"><input type=\"checkbox\" name=\"shortcut\" value=\"<%= DICT[i][0] %>\"> <%= DICT[i][1] %></label>\n" +
        "            <% } %>\n" +
        "        </div>\n" +
        "        <div class=\"apply-dialog-footer\">\n" +
        "            <button type=\"button\" class=\"btn btn-default submit\" bx-click=\"apply('do')\">确认</button>\n" +
        "            <a href=\"javascript: void(0);\" bx-click=\"apply('close')\" class=\"btn btn-default cancel ml5\">取消</a>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div class=\"shortcuts <%= simplify ? 'hide' : '' %>\">\n" +
        "        <label class=\"mr50\">\n" +
        "            <input type=\"radio\" bx-change=\"shortcut([0,1,2,3,4,5,6])\" name=\"shortcut\">\n" +
        "            全日程投放\n" +
        "        </label>\n" +
        "        <label class=\"mr50\">\n" +
        "            <input type=\"radio\" bx-change=\"shortcut([1,2,3,4,5])\" name=\"shortcut\">\n" +
        "            工作日（周一至周五）投放\n" +
        "        </label>\n" +
        "        <label>\n" +
        "            <input type=\"radio\" bx-change=\"shortcut([0,6])\" name=\"shortcut\">\n" +
        "            休息日（周六、周日）投放\n" +
        "        </label>\n" +
        "        <div class=\"utc\">当前排期时间：GMT <%= utcOffset %></div>\n" +
        "    </div>\n" +
        "    <table class=\"picker-days\">\n" +
        "        <thead>\n" +
        "            <tr>\n" +
        "                <td width=\"160\">时间段</td>\n" +
        "                <td class=\"picker-day-range\">\n" +
        "                    <span class=\"item item-0\">0:00</span>\n" +
        "                    <span class=\"item item-6\">6:00</span>\n" +
        "                    <span class=\"item item-12\">12:00</span>\n" +
        "                    <span class=\"item item-18\">18:00</span>\n" +
        "                    <span class=\"item item-24\">24:00</span>\n" +
        "                </td>\n" +
        "                <td width=\"160\" align=\"center\">操作</td>\n" +
        "            </tr>\n" +
        "        </thead>\n" +
        "        <tbody>\n" +
        "            <% for ( var i = 0; i < DICT.length; i++ ) { %>\n" +
        "            <tr class=\"picker-day\" data-value=\"<%= DICT[i][0] %>\">\n" +
        "                <td class=\"picker-label\">\n" +
        "                    <span bx-click=\"toggle(<%= DICT[i][0] %>)\"><%= DICT[i][1] %></span>\n" +
        "                </td>\n" +
        "                <td class=\"\">\n" +
        "                    <div class=\"picker-hours\">\n" +
        "                        <% for ( var ii = 0; ii < 24; ii++ ) { %>\n" +
        "                        <div class=\"picker-hour <%= ii % 6 === 0 ? 'milestone' : ''%>\" data-value=<%= ii %>>\n" +
        "                            <div class=\"picker-hour-line\"></div>\n" +
        "                            <div class=\"picker-hour-duration\"></div>\n" +
        "                            <div class=\"picker-hour-start bottom\">\n" +
        "                                <div class=\"picker-hour-arrow arrow\"></div>\n" +
        "                                <span><%= ii %>:00</span>\n" +
        "                            </div>\n" +
        "                            <div class=\"picker-hour-end top\">\n" +
        "                                <div class=\"picker-hour-arrow arrow\"></div>\n" +
        "                                <span><%= ii+1 %>:00</span>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <% } %>\n" +
        "                        <div class=\"picker-hour milestone\">\n" +
        "                            <div class=\"picker-hour-line\"></div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </td>\n" +
        "                <td align=\"center\">\n" +
        "                    <div class=\"operation\">\n" +
        "                        <a bx-click=\"apply('to', <%= DICT[i][0] %>)\" href=\"javascript: void(0);\">复制到</a>\n" +
        "                    </div>\n" +
        "                </td>\n" +
        "            </tr>\n" +
        "            <% } %>\n" +
        "        </tbody>\n" +
        "    </table>\n" +
        "</div>"
})