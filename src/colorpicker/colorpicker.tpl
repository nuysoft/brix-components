<div class="colorpicker <%= placement %>"">
    <div class="colorpicker-header clearfix">
        <ul class="clearfix">
            <% for(var i = 0; i < shortcuts.length; i++) { %>
            <li value="<%=shortcuts[i]%>" style="background-color:<%=shortcuts[i]%>;" bx-click="_pickQuickColor(<%=shortcuts[i]%>)"></li>
            <% } %>
        </ul>
    </div>
    <div class="colorpicker-middle clearfix <%= min ? '' : 'open'%>">
        <i bx-click="_toggleBody" class="uxicon arrow arrow-up">&#404</i>
        <i bx-click="_toggleBody" class="uxicon arrow arrow-down">&#405</i>
    </div>
    <div class="colorpicker-body clearfix <%= min ? '' : 'open'%>">
        <div class="picker-wrapper">
            <div class="picker" bx-click="_pickPaletteColor()"></div>
            <i class="uxicon picker-indicator" bx-mousedown="_dragPickerIndicator()">&#470</i>
        </div>
        <div class="slide-wrapper">
            <div class="slide" bx-click="pickSlideColor()"></div>
            <i class="uxicon slide-indicator" bx-mousedown="_dragSlideIndicator">&#461</i>
        </div>
    </div>
    <div class="colorpicker-footer clearfix">
        <span class="bg" style="background-color: <%=color%>"></span>
        <input type="text" class="form-control" value="<%=color%>" bx-keyup="_inputColor" bx-blur="_finishInputColor">
        <a class="btn btn-default" bx-click="_submit">确定</a>
    </div>
</div>