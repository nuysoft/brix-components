<div class="colorpicker">
    <div class="colorpicker-header clearfix">
        <ul class="clearfix">
            <% for(var i = 0; i < colors.length; i++) { %>
            <li value="<%=colors[i]%>" style="background-color:<%=colors[i]%>;" bx-click="pickQuickColor(<%=colors[i]%>)"></li>
            <% } %>
        </ul>
    </div>
    <div class="colorpicker-middle open clearfix">
        <i bx-click="toggleBody" class="uxicon arrow arrow-up">&#404</i>
        <i bx-click="toggleBody" class="uxicon arrow arrow-down">&#405</i>
    </div>
    <div class="colorpicker-body clearfix">
        <div class="picker-wrapper">
            <div class="picker" bx-click="pickPaletteColor()"></div>
            <i class="uxicon picker-indicator" bx-mousedown="dragPickerIndicator()">&#470</i>
        </div>
        <div class="slide-wrapper">
            <div class="slide" bx-click="pickSlideColor()"></div>
            <i class="uxicon slide-indicator" bx-mousedown="dragSlideIndicator">&#461</i>
        </div>
    </div>
    <div class="colorpicker-footer clearfix">
        <span class="bg" style="background-color: <%=color%>"></span>
        <input type="text" class="form-control" value="<%=color%>" bx-keyup="inputColor" bx-blur="finishInputColor">
        <a class="btn btn-default" bx-click="submit">确定</a>
    </div>
</div>