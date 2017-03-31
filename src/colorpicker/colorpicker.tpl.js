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
        "        <i bx-click=\"_toggleBody\" class=\"brixfont arrow arrow-up\">&#xe634;</i>\n" +
        "        <i bx-click=\"_toggleBody\" class=\"brixfont arrow arrow-down\">&#xe635;</i>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-body clearfix <%= min ? '' : 'open'%>\">\n" +
        "        <div class=\"picker-wrapper\">\n" +
        "            <div class=\"picker\" bx-click=\"_pickPaletteColor()\"></div>\n" +
        "            <i class=\"brixfont picker-indicator\" bx-mousedown=\"_dragPickerIndicator()\">&#xe636;</i>\n" +
        "        </div>\n" +
        "        <div class=\"slide-wrapper\">\n" +
        "            <div class=\"slide\" bx-click=\"pickSlideColor()\"></div>\n" +
        "            <i class=\"brixfont slide-indicator\" bx-mousedown=\"_dragSlideIndicator\">&#xe637;</i>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-footer clearfix\">\n" +
        "        <span class=\"bg\" style=\"background-color: <%=color%>\"></span>\n" +
        "        <input type=\"text\" class=\"form-control\" value=\"<%=color%>\" bx-keyup=\"_inputColor\" bx-blur=\"_finishInputColor\">\n" +
        "        <a class=\"btn btn-default\" bx-click=\"_submit\">确定</a>\n" +
        "    </div>\n" +
        "</div>"
})