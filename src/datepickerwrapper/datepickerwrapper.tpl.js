/* global define */
define(function() {
    return "<div class=\"datepickerwrapper <%= mode === 'multiple' ? 'multiple' : 'single' %>\">\n" +
        "    <!--  -->\n" +
        "    <% if (mode === 'signal') { %>\n" +
        "    <div bx-name=\"<%= calendar %>\" data-type=\"<%= type %>\" data-date=\"<%= dates[0] %>\" data-range=\"<%= _ranges %>\" data-excluded=\"<%= _excludeds %>\" data-unlimit=\"<%= unlimits[0] %>\" class=\"picker\"></div>\n" +
        "    <% } %>\n" +
        "    <!--  -->\n" +
        "    <% if (mode === 'multiple') { %>\n" +
        "    <% if( shortcuts ) { %>\n" +
        "    <div class=\"datepickerwrapper-shortcuts form-inline form-group\">\n" +
        "        <div class=\"datepickerwrapper-shortcuts-header\">\n" +
        "            <div class=\"datepickerwrapper-shortcuts-header-title\">快捷日期</div>\n" +
        "        </div>\n" +
        "        <div class=\"datepickerwrapper-shortcuts-body clearfix\">\n" +
        "            <% for (var title in shortcuts) { %>\n" +
        "                <span bx-click=\"_change('shortcut')\" data-value=\"<%= \n" +
        "                    _.map(shortcuts[title], function(item) {\n" +
        "                        return item.format('YYYY-MM-DD HH:mm:ss')\n" +
        "                    }).join(',')\n" +
        "                %>\" class=\"shortcut\"><%= title %></span>\n" +
        "            <% } %>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <% } %>\n" +
        "    <div class=\"datepickerwrapper-inputs form-inline form-group\">\n" +
        "        <div class=\"datepickerwrapper-inputs-header\">\n" +
        "            <div class=\"datepickerwrapper-inputs-header-title\">日期范围</div>\n" +
        "        </div>\n" +
        "        <div class=\"datepickerwrapper-inputs-body <%= typeMap.time ? 'time' : '' %>\">\n" +
        "            <% for (var i = 0; i < dates.length; i++ ) { %>\n" +
        "                <input bx-click=\"_inputToggleDatePicker(<%= i %>)\" bx-change=\"_change('date', <%= i %>)\" value=\"<%= dates[i] %>\" type=\"text\" class=\"form-control\">\n" +
        "                <%= i < dates.length -1 ? '-' : '' %>\n" +
        "            <% } %>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div class=\"datepickerwrapper-pickers\">\n" +
        "        <% for (var i = 0; i < dates.length; i++ ) { %>\n" +
        "            <div bx-name=\"<%= calendar %>\" data-date=\"<%= dates[i] %>\" data-range=\"<%= _ranges %>\" data-excluded=\"<%= _excludeds %>\" data-unlimit=\"<%= unlimits[i] %>\" data-type=\"<%= type %>\" class=\"picker\"></div>\n" +
        "        <% } %>\n" +
        "    </div>\n" +
        "    <div class=\"datepickerwrapper-footer\">\n" +
        "        <button class=\"btn btn-default submit\" bx-click=\"submit\">确认</button>\n" +
        "        <a href=\"javascript: void(0);\" bx-click=\"hide\" class=\"btn btn-default cancel ml5\">取消</a>\n" +
        "    </div>\n" +
        "    <% } %>\n" +
        "</div>"
})