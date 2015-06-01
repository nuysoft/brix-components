/* global define */
define(function() {
    return (function(){/*
<div class="hourpicker">
    <div class="apply-dialog">
        <div class="apply-dialog-body">
            <% for ( var i = 0, days = '一二三四五六日', values="1234560"; i < days.length; i++ ) { %>
            <label data-value="<%= values[i] %>"><input type="checkbox" name="shortcut" value="<%= values[i] %>"> 周<%= days[i] %></label>
            <% } %>
        </div>
        <div class="apply-dialog-footer">
            <button class="btn btn-default submit" bx-click="apply('do')">确认</button>
            <a href="javascript: void(0);" bx-click="apply('close')" class="btn btn-default cancel ml5">取消</a>
        </div>
    </div>
    <div class="shortcuts">
        <label bx-click="shortcut('0123456')" class="mr50"><input type="radio" name="shortcut"> 全日程投放</label>
        <label bx-click="shortcut('12345')" class="mr50"><input type="radio" name="shortcut"> 工作日（周一至周五）投放</label>
        <label bx-click="shortcut('06')"><input type="radio" name="shortcut"> 休息日（周六、周日）投放</label>
        <div class="utc">当前排期时间：GMT <%= utcOffset %></div>
    </div>
    <table class="picker-days">
        <thead>
            <tr>
                <td width="160">时间段</td>
                <td class="picker-day-range">
                    <span class="item item-0">0:00</span>
                    <span class="item item-6">6:00</span>
                    <span class="item item-12">12:00</span>
                    <span class="item item-18">18:00</span>
                    <span class="item item-24">24:00</span>
                </td>
                <td width="160" align="center">操作</td>
            </tr>
        </thead>
        <tbody>
            <% for ( var i = 0, days = '一二三四五六日', values="1234560"; i < days.length; i++ ) { %>
            <tr class="picker-day" data-value="<%= values[i] %>">
                <td class="picker-label">
                    <span bx-click="toggle(<%= values[i] %>)">周<%= days[i] %></span>
                </td>
                <td class="">
                    <div class="picker-hours">
                        <% for ( var ii = 0; ii < 24; ii++ ) { %>
                        <div class="picker-hour <%= ii % 6 === 0 ? 'milestone' : ''%>" data-value=<%= ii %>>
                            <div class="picker-hour-line"></div>
                            <div class="picker-hour-duration"></div>
                            <div class="picker-hour-start bottom">
                                <div class="picker-hour-arrow arrow"></div>
                                <span><%= ii %>:00</span>
                            </div>
                            <div class="picker-hour-end top">
                                <div class="picker-hour-arrow arrow"></div>
                                <span><%= ii+1 %>:00</span>
                            </div>
                        </div>
                        <% } %>
                        <div class="picker-hour milestone">
                            <div class="picker-hour-line"></div>
                        </div>
                    </div>
                </td>
                <td align="center">
                    <div class="operation">
                        <a bx-click="apply('to', <%= values[i] %>)" href="javascript: void(0);">复制到</a>
                    </div>
                </td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})