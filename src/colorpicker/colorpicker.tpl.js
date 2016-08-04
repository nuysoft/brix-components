/* global define */
define(function() {
    return "<div class=\"colorpicker\">\n" +
        "    <div class=\"colorpicker-header clearfix\">\n" +
        "        <ul class=\"clearfix\">\n" +
        "            <% for(var i = 0; i < colors.length; i++) { %>\n" +
        "            <li value=\"<%=colors[i]%>\" style=\"background-color:<%=colors[i]%>;\" bx-click=\"pickQuickColor(<%=colors[i]%>)\"></li>\n" +
        "            <% } %>\n" +
        "        </ul>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-middle open clearfix\">\n" +
        "        <i bx-click=\"toggleBody\" class=\"uxicon arrow arrow-up\">&#404</i>\n" +
        "        <i bx-click=\"toggleBody\" class=\"uxicon arrow arrow-down\">&#405</i>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-body clearfix\">\n" +
        "        <div class=\"picker-wrapper\">\n" +
        "            <div class=\"picker\" bx-click=\"pickPaletteColor()\"></div>\n" +
        "            <i class=\"uxicon picker-indicator\" bx-mousedown=\"dragPickerIndicator()\">&#470</i>\n" +
        "        </div>\n" +
        "        <div class=\"slide-wrapper\">\n" +
        "            <div class=\"slide\" bx-click=\"pickSlideColor()\"></div>\n" +
        "            <i class=\"uxicon slide-indicator\" bx-mousedown=\"dragSlideIndicator\">&#461</i>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div class=\"colorpicker-footer clearfix\">\n" +
        "        <span class=\"bg\" style=\"background-color: <%=color%>\"></span>\n" +
        "        <input type=\"text\" class=\"form-control\" value=\"<%=color%>\" bx-keyup=\"inputColor\" bx-blur=\"finishInputColor\">\n" +
        "        <a class=\"btn btn-default\" bx-click=\"submit\">确定</a>\n" +
        "    </div>\n" +
        "</div>"
})