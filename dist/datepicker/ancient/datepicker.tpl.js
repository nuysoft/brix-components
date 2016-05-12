/* global define */
define(function() {
    return (function(){/*
<div class="datepicker-ancient-container clearfix">
    <!-- 年月日 -->
    <div class="year-month-date-container clearfix">
        <% for( var page = 0, first, last; page < options.pages; page++ ) { %>
        <%     first = page === 0 %>
        <%     last = page === options.pages - 1 %>
        <!-- 年月日 <%= page %>/<%= options.pages %> -->
        <div class="year-month-date <%= first ? 'first' : '' %> <%= last ? 'last' : '' %>" data-page="<%= page %>">
            <!-- 年 YYYY -->
            <% var yearDisplay = typeMap.year && !typeMap.month && !typeMap.date ? '' : 'display: none;' %>
            <div class="year" style="<%= yearDisplay %>">
                <div class="year-header">
                    <a class="year-header-prev" href="javascript:;" bx-click="_moveYearPicker(-1)"><span class="brixfont">&#xe601;</span></a>
                    <span class="year-header-title">? - ?</span>
                    <a class="year-header-next" href="javascript:;" bx-click="_moveYearPicker(1)"><span class="brixfont">&#xe600;</span></a>
                </div>
                <div class="year-body">
                    <div class="year-body-content clearfix">
                        <!-- <span bx-click="_active(value, unit, pattern)" data-value="2014" class="active">2014</span> -->
                        <!-- <span bx-click="_active(value, unit, pattern)" data-value="2014">2014</span> -->
                    </div>
                </div>
            </div>
            <!-- 月 MM -->
            <% var monthDisplay = typeMap.month && !typeMap.date ? '' : 'display: none;' %>
            <div class="month" style="<%= monthDisplay %>">
                <div class="month-header">
                    <a class="month-header-prev" href="javascript:;" bx-click="_moveMonthPicker(-1)"><span class="brixfont">&#xe601;</span></a>
                    <span class="month-header-title" bx-click="_slide('.month', '.year')">?</span>
                    <a class="month-header-next" href="javascript:;" bx-click="_moveMonthPicker(1)"><span class="brixfont">&#xe600;</span></a>
                </div>
                <div class="month-body">
                    <div class="month-body-content clearfix">
                        <!-- <span bx-click="_active(value, unit, pattern)" data-value="1" class="active">Jan</span -->
                        <!-- <span bx-click="_active(value, unit, pattern)" data-value="1">Jan</span -->
                    </div>
                </div>
            </div>
            <!-- 日 DD -->
            <% var dateDisplay = typeMap.date ? '' : 'display: none;' %>
            <div class="date" style="<%= dateDisplay %>">
                <div class="date-header">
                    <a href="javascript:;" class="date-header-prev" bx-click="_moveDatePicker(-1)"><span class="brixfont">&#xe601;</span></a>
                    <span bx-click="_slide('.date', '.month')" class="date-header-title">?</span>
                    <a href="javascript:;" class="date-header-next" bx-click="_moveDatePicker(1)"><span class="brixfont">&#xe600;</span></a>
                </div>
                <div class="date-body">
                    <div class="date-body-desc clearfix">
                        <span class="disabled">日</span><span class="disabled">一</span><span class="disabled">二</span><span class="disabled">三</span><span class="disabled">四</span><span class="disabled">五</span><span class="disabled">六</span>
                    </div>
                    <div class="date-body-content clearfix">
                        <!-- <span class="inactive"></span> -->
                        <!-- <span bx-click="_active(value, unit, pattern)" data-value="1" class="active">01</span> -->
                        <!-- <span bx-click="_active(value, unit, pattern)" data-value="1">01</span> -->
                    </div>
                </div>
            </div>
        </div>
        <% } %>
    </div>
    <!-- 时分秒 -->
    <% var timeDisplay = typeMap.time || typeMap.second || typeMap.minute || typeMap.hour  ? '': 'display: none;' %>
    <div class="hour-minute-second-container clearfix" style="<%= timeDisplay %>">
        <div class="hour-minute-second clearfix">
            <div class="hour-minute-second-body">
                <!-- 时 HH -->
                <div class="hour clearfix">
                    <input class="form-control" type="text" tabindex="<%=options.clientId%>" bx-keydown="_changeHour()" bx-focusout="_changeHour()">
                    <button type="button" class="btn btn-default hour-minus" bx-click="_changeHour(-1)"><span class="glyphicon glyphicon-minus"></span></button>
                    <button type="button" class="btn btn-default hour-plus" bx-click="_changeHour(1)"><span class="glyphicon glyphicon-plus"></span></button>
                </div>
                <span class="spliter">:</span>
                <!-- 分 mm -->
                <div class="minute clearfix">
                    <% var minuteDisabled = typeMap.hour && !typeMap.minute  ? 'disabled': '' %>
                    <input class="form-control" type="text" tabindex="<%=options.clientId%>" bx-keydown="_changeMinute()" bx-focusout="_changeMinute()" <%= minuteDisabled %>>
                    <button type="button" class="btn btn-default minute-minus" bx-click="_changeMinute(-1)" <%= minuteDisabled %>><span class="glyphicon glyphicon-minus"></span></button>
                    <button type="button" class="btn btn-default minute-plus" bx-click="_changeMinute(1)" <%= minuteDisabled %>><span class="glyphicon glyphicon-plus"></span></button>
                </div>
                <span class="spliter">:</span>
                <!-- 秒 ss -->
                <div class="second clearfix">
                    <% var secondDisabled = (typeMap.hour || typeMap.minute) && !typeMap.second  ? 'disabled': '' %>
                    <input class="form-control" type="text" tabindex="<%=options.clientId%>" bx-keydown="_changeSecond()" bx-focusout="_changeSecond()" <%= secondDisabled %>>
                    <button type="button" class="btn btn-default second-minus" bx-click="_changeSecond(-1)" <%= secondDisabled %>><span class="glyphicon glyphicon-minus"></span></button>
                    <button type="button" class="btn btn-default second-plus" bx-click="_changeSecond(1)" <%= secondDisabled %>><span class="glyphicon glyphicon-plus"></span></button>
                </div>
            </div>
            <div class="hour-minute-second-footer">
                <button class="btn btn-default submit" bx-click="_changeTime()">确认</button>
                <a href="javascript: void(0);" class="btn btn-default cancel ml5">取消</a>
            </div>
        </div>
    </div>
    <!-- 不限 -->
    <div class="unlimit-container clearfix" style="<%= options.unlimit ? '' : 'display: none;' %>">
        <a href="javascript:;" bx-click="_unlimit()">不限</a>
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})