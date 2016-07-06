/* global define */
define(function() {
    return "<div class=\"row paginationwrapper\">\n" +
        "    <% if(simplify) { %>\n" +
        "        <div class=\"col-md-12\" style=\"text-align: right;\">\n" +
        "            <ul class=\"pagination\" style=\"text-align: right;\">\n" +
        "                <li class=\"<%= hasPrev ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=prev%>)\"><span class=\"brixfont\">&#xe601;</span></a></li><!-- Previous -->\n" +
        "\n" +
        "                <li class=\"pagination-statistics-simplify\"><span><%= cursor %>/<%= pages %></span></li>\n" +
        "                \n" +
        "                <li class=\"<%= hasNext ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=next%>)\"><span class=\"brixfont\">&#xe600;</span></a></li><!-- Next -->\n" +
        "            </ul>\n" +
        "        </div>\n" +
        "    <% } else { %>\n" +
        "\n" +
        "    <div class=\"pagination-statistics col-md-6\">\n" +
        "        <span class=\"start-end-total\">当前第 <b><%= start + 1 %> - <%= end %></b> 条，共 <b><%= total %></b> 条</span><span>，每页展现</span>\n" +
        "        <select bx-name=\"components/dropdown\">\n" +
        "            <% for( var i = 0; i < limits.length; i++ ) { %>\n" +
        "            <option value=\"<%= limits[i] %>\" <%= limits[i] == limit ? 'selected' : '' %>><%=limits[i]%></option>\n" +
        "            <% } %>\n" +
        "        </select>\n" +
        "        <span>条</span>\n" +
        "    </div>\n" +
        "    <div class=\"col-md-6\" style=\"text-align: right;\">\n" +
        "        <ul class=\"pagination\">\n" +
        "\n" +
        "            <li class=\"<%= hasPrev ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=prev%>)\"><span class=\"brixfont\">&#xe601;</span></a></li><!-- Previous -->\n" +
        "\n" +
        "            <% if( barStart == 2 ) { %>\n" +
        "                <li><a class=\"page\" href=\"javascript: void(0);\" bx-click=\"moveTo(1)\">1</a></li>\n" +
        "            <% } %>\n" +
        "\n" +
        "            <% if( barStart >= 3 ) { %>\n" +
        "                <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(1)\">1</a></li>\n" +
        "                <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(2)\">2</a></li>\n" +
        "                <% if( barStart > 3 ) { %>\n" +
        "                    <li class=\"disabled\"><a href=\"javascript: void(0);\">...</a></li>\n" +
        "                <% } %>\n" +
        "            <% } %>\n" +
        "\n" +
        "            <% for( var i = barStart; i <= barEnd; i++ ) { %>\n" +
        "                <% if( i === cursor ) { %>\n" +
        "                    <li class=\"active\"><a href=\"javascript: void(0);\"><%= i %></a></li>\n" +
        "                <% } else { %>\n" +
        "                    <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=i%>)\"><%= i %></a></li>\n" +
        "                <% } %>\n" +
        "            <% } %>\n" +
        "\n" +
        "            <% if( barEnd < pages - 1) { %>\n" +
        "                <li class=\"disabled\"><a href=\"javascript: void(0);\">...</a></li>\n" +
        "            <% } %>\n" +
        "\n" +
        "            <% if( barEnd < pages) { %>\n" +
        "                <li><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=pages%>)\"><%= pages %></a></li>\n" +
        "            <% } %>\n" +
        "\n" +
        "            <li class=\"<%= hasNext ? '' : 'disabled' %>\"><a href=\"javascript: void(0);\" bx-click=\"moveTo(<%=next%>)\"><span class=\"brixfont\">&#xe600;</span></a></li><!-- Next -->\n" +
        "\n" +
        "            <!-- <li>\n" +
        "                <select bx-name=\"components/dropdown\">\n" +
        "                    <% for( var i = 1; i <= pages; i++ ) { %>\n" +
        "                        <option value=\"<%= i %>\" <%= i == cursor ? 'selected' : '' %>><%= i %></option>\n" +
        "                    <% } %>\n" +
        "                </select>\n" +
        "            </li> -->\n" +
        "        </ul>\n" +
        "    </div>\n" +
        "\n" +
        "    <% } %>\n" +
        "</div>"
})