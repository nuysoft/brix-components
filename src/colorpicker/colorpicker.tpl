<div class="colorpicker <%= placement %>"">
    <div class="colorpicker-header clearfix">
        <ul class="clearfix">
            <% for(var i = 0; i < shortcuts.length; i++) { %>
            <li value="<%=shortcuts[i]%>" style="background-color:<%=shortcuts[i]%>;" bx-click="_pickQuickColor(<%=shortcuts[i]%>)"></li>
            <% } %>
        </ul>
    </div>
    <div class="colorpicker-middle clearfix <%= min ? '' : 'open'%>">
        <i bx-click="_toggleBody" class="brixfont arrow arrow-up">&#xe634;</i>
        <i bx-click="_toggleBody" class="brixfont arrow arrow-down">&#xe635;</i>
    </div>
    <div class="colorpicker-body clearfix <%= min ? '' : 'open'%>">
        <div class="picker-wrapper">
            <div class="picker" bx-click="_pickPaletteColor()"></div>
            <i class="brixfont picker-indicator" bx-mousedown="_dragPickerIndicator()">&#xe636;</i>
        </div>
        <div class="slide-wrapper">
            <div class="slide" bx-click="pickSlideColor()"></div>
            <i class="brixfont slide-indicator" bx-mousedown="_dragSlideIndicator">&#xe637;</i>
        </div>
    </div>
    <div class="colorpicker-footer clearfix">
        <span class="bg" style="background-color: <%=color%>"></span>
        <input type="text" class="form-control" value="<%=color%>" bx-keyup="_inputColor" bx-blur="_finishInputColor">
        <a class="btn btn-default" bx-click="_submit">确定</a>
    </div>
</div>