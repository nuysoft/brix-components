/* global define */
define(function() {
    return "<div class=\"datepicker-container\">\n" +
        "    <!-- 年 -->\n" +
        "    <% var yearDisplay = typeMap.year && !typeMap.month && !typeMap.date ? '' : 'display: none;' %>\n" +
        "    <div class=\"yearpicker picker-group\" style=\"<%= yearDisplay %>\">\n" +
        "        <div class=\"picker-header\">\n" +
        "            <a href=\"javascript:;\" class=\"minus\" bx-click=\"_move('period', -1)\"><span class=\"brixfont\">&#xe601;</span></a>\n" +
        "            <!-- <button class=\"btn btn-default minus\" type=\"button\" bx-click=\"_move('period', -1)\"><span class=\"glyphicon glyphicon-chevron-left\"></span></button> -->\n" +
        "            <h4 >? - ?</h4>\n" +
        "            <a href=\"javascript:;\" class=\"plus\" type=\"button\" bx-click=\"_move('period', 1)\"><span class=\"brixfont\">&#xe600;</span></a>\n" +
        "            <!-- <button class=\"btn btn-default plus\" type=\"button\" bx-click=\"_move('period', 1)\"><span class=\"glyphicon glyphicon-chevron-right\"></span></button> -->\n" +
        "        </div>\n" +
        "        <div class=\"picker-body picker-selectable clearfix\">\n" +
        "            <!-- <span data-value=\"2014\" class=\"active\">2014</span> -->\n" +
        "            <!-- <span data-value=\"2014\">2014</span> -->\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <!-- 月 -->\n" +
        "    <% var monthDisplay = typeMap.month && !typeMap.date ? '' : 'display: none;' %>\n" +
        "    <div class=\"monthpicker picker-group\" style=\"<%= monthDisplay %>\">\n" +
        "        <div class=\"picker-header\">\n" +
        "            <a href=\"javascript:;\" class=\"minus\" type=\"button\" bx-click=\"_move('year', -1)\"><span class=\"brixfont\">&#xe601;</span></a>\n" +
        "            <!-- <button class=\"btn btn-default minus\" type=\"button\" bx-click=\"_move('year', -1)\"><span class=\"glyphicon glyphicon-chevron-left\"></span></button> -->\n" +
        "            <h4 bx-click=\"_slide('.monthpicker', '.yearpicker')\">?</h4>\n" +
        "            <a href=\"javascript:;\" class=\"plus\" type=\"button\" bx-click=\"_move('year', 1)\"><span class=\"brixfont\">&#xe600;</span></a>\n" +
        "            <!-- <button class=\"btn btn-default plus\" type=\"button\" bx-click=\"_move('year', 1)\"><span class=\"glyphicon glyphicon-chevron-right\"></span></button> -->\n" +
        "        </div>\n" +
        "        <div class=\"picker-body picker-selectable clearfix\">\n" +
        "            <!-- <span data-value=\"1\" class=\"active\">Jan</span -->\n" +
        "            <!-- <span data-value=\"1\">Jan</span -->\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <!-- 日 -->\n" +
        "    <% var dateDisplay = typeMap.date ? '' : 'display: none;' %>\n" +
        "    <div class=\"datepicker picker-group\" style=\"<%= dateDisplay %>\">\n" +
        "        <div class=\"picker-header\">\n" +
        "            <a href=\"javascript:;\" class=\"minus\" type=\"button\" bx-click=\"_move('month', -1)\"><span class=\"brixfont\">&#xe601;</span></a>\n" +
        "            <!-- <button class=\"btn btn-default minus\" type=\"button\" bx-click=\"_move('month', -1)\"><span class=\"glyphicon glyphicon-step-backward\"></span></button> -->\n" +
        "            <h4 bx-click=\"_slide('.datepicker', '.monthpicker')\">?</h4>\n" +
        "            <a href=\"javascript:;\" class=\"plus\" type=\"button\" bx-click=\"_move('month', 1)\"><span class=\"brixfont\">&#xe600;</span></a>\n" +
        "            <!-- <button class=\"btn btn-default plus\" type=\"button\" bx-click=\"_move('month', 1)\"><span class=\"glyphicon glyphicon-step-forward\"></span></button> -->\n" +
        "        </div>\n" +
        "        <div class=\"picker-body\">\n" +
        "            <div class=\"datepicker-body-description clearfix\">\n" +
        "                <span class=\"disabled\">日</span><span class=\"disabled\">一</span><span class=\"disabled\">二</span><span class=\"disabled\">三</span><span class=\"disabled\">四</span><span class=\"disabled\">五</span><span class=\"disabled\">六</span>\n" +
        "            </div>\n" +
        "            <div class=\"datepicker-body-value picker-selectable clearfix\">\n" +
        "                <!-- <span class=\"inactive\"></span> -->\n" +
        "                <!-- <span data-value=\"1\" class=\"active\">01</span> -->\n" +
        "                <!-- <span data-value=\"1\">01</span> -->\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <!-- 时分秒 -->\n" +
        "    <% var timeDisplay = typeMap.time || typeMap.second || typeMap.minute || typeMap.hour  ? '': 'display: none;' %>\n" +
        "    <div class=\"timepicker picker-group clearfix\" style=\"<%= timeDisplay %>\">\n" +
        "        <div class=\"timepicker-body clearfix\">\n" +
        "            <div class=\"timepicker-group\">\n" +
        "                <input class=\"form-control\" type=\"text\" tabindex=\"<%=options.clientId%>\" bx-keydown=\"_changeHour()\" bx-focusout=\"_changeHour()\">\n" +
        "                <button type=\"button\" class=\"btn btn-default time-minus\" bx-click=\"_changeHour(-1)\"><span class=\"glyphicon glyphicon-minus\"></span></button>\n" +
        "                <button type=\"button\" class=\"btn btn-default time-plus\" bx-click=\"_changeHour(1)\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
        "            </div>\n" +
        "            <span class=\"timepicker-spliter\">:</span>\n" +
        "            <div class=\"timepicker-group\">\n" +
        "                <% var minuteDisabled = typeMap.hour && !typeMap.minute  ? 'disabled': '' %>\n" +
        "                <input class=\"form-control\" type=\"text\" tabindex=\"<%=options.clientId%>\" bx-keydown=\"_changeMinute()\" bx-focusout=\"_changeMinute()\" <%= minuteDisabled %>>\n" +
        "                <button type=\"button\" class=\"btn btn-default time-minus\" bx-click=\"_changeMinute(-1)\" <%= minuteDisabled %>><span class=\"glyphicon glyphicon-minus\"></span></button>\n" +
        "                <button type=\"button\" class=\"btn btn-default time-plus\" bx-click=\"_changeMinute(1)\" <%= minuteDisabled %>><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
        "            </div>\n" +
        "            <span class=\"timepicker-spliter\">:</span>\n" +
        "            <div class=\"timepicker-group\">\n" +
        "                <% var secondDisabled = (typeMap.hour || typeMap.minute) && !typeMap.second  ? 'disabled': '' %>\n" +
        "                <input class=\"form-control\" type=\"text\" tabindex=\"<%=options.clientId%>\" bx-keydown=\"_changeSecond()\" bx-focusout=\"_changeSecond()\" <%= secondDisabled %>>\n" +
        "                <button type=\"button\" class=\"btn btn-default time-minus\" bx-click=\"_changeSecond(-1)\" <%= secondDisabled %>><span class=\"glyphicon glyphicon-minus\"></span></button>\n" +
        "                <button type=\"button\" class=\"btn btn-default time-plus\" bx-click=\"_changeSecond(1)\" <%= secondDisabled %>><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"timepicker-footer\">\n" +
        "            <div class=\"timepicker-handelr\">\n" +
        "                <button class=\"btn btn-default submit\" bx-click=\"_changeTime()\">确认</button>\n" +
        "                <a href=\"javascript: void(0);\" class=\"btn btn-default cancel ml5\">取消</a>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <!-- 不限 -->\n" +
        "    <div class=\"picker-footer picker-group\" style=\"<%= options.unlimit ? '' : 'display: none;' %>\">\n" +
        "        <a href=\"javascript:;\" bx-click=\"_unlimit()\">不限</a>\n" +
        "    </div>\n" +
        "</div>"
})