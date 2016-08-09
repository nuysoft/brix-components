/* global define */
define(function() {
    return "<div class=\"colorpicker <%= placement %>\"\">\n" +
        "    <div class=\"colorpicker-header clearfix\">\n" +
        "        <ul class=\"clearfix\">\n" +
        "            <% for(var i = 0; i < shortcuts.length; i++) { %>\n" +
        "            <li value=\"<%=shortcuts[i]%>\" style=\"background-color:<%=shortcuts[i]%>;\" bx-click=\"_pickQuickColor(<%=shortcuts[i]%>)\"></li>\n" +
        "            <% } %>\n" +
        "        </ul>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-middle clearfix <%= min ? '' : 'open'%>\">\n" +
        "        <i bx-click=\"_toggleBody\" class=\"uxicon arrow arrow-up\">&#404</i>\n" +
        "        <i bx-click=\"_toggleBody\" class=\"uxicon arrow arrow-down\">&#405</i>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-body clearfix <%= min ? '' : 'open'%>\">\n" +
        "        <div class=\"picker-wrapper\">\n" +
        "            <div class=\"picker\" bx-click=\"_pickPaletteColor()\"></div>\n" +
        "            <i class=\"uxicon picker-indicator\" bx-mousedown=\"_dragPickerIndicator()\">&#470</i>\n" +
        "        </div>\n" +
        "        <div class=\"slide-wrapper\">\n" +
        "            <div class=\"slide\" bx-click=\"pickSlideColor()\"></div>\n" +
        "            <i class=\"uxicon slide-indicator\" bx-mousedown=\"_dragSlideIndicator\">&#461</i>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-footer clearfix\">\n" +
        "        <span class=\"bg\" style=\"background-color: <%=color%>\"></span>\n" +
        "        <input type=\"text\" class=\"form-control\" value=\"<%=color%>\" bx-keyup=\"_inputColor\" bx-blur=\"_finishInputColor\">\n" +
        "        <a class=\"btn btn-default\" bx-click=\"_submit\">确定</a>\n" +
        "    </div>\n" +
        "</div>"
})