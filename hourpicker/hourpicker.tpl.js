/* global define */
define(function() {
    return (function(){/*
<div class="hourpicker">
    <div class="apply-dialog">
        <div class="apply-dialog-body">
            <% for ( var i = 0; i < DICT.length; i++ ) { %>
            <label data-value="<%= DICT[i][0] %>"><input type="checkbox" name="shortcut" value="<%= DICT[i][0] %>"> <%= DICT[i][1] %></label>
            <% } %>
        </div>
        <div class="apply-dialog-footer">
            <button class="btn btn-default submit" bx-click="apply('do')">确认</button>
            <a href="javascript: void(0);" bx-click="apply('close')" class="btn btn-default cancel ml5">取消</a>
        </div>
    </div>
    <div class="shortcuts <%= simplify ? 'hide' : '' %>">
        <label bx-click="shortcut([0,1,2,3,4,5,6])" class="mr50"><input type="radio" name="shortcut"> 全日程投放</label>
        <label bx-click="shortcut([1,2,3,4,5])" class="mr50"><input type="radio" name="shortcut"> 工作日（周一至周五）投放</label>
        <label bx-click="shortcut([0,6])"><input type="radio" name="shortcut"> 休息日（周六、周日）投放</label>
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
            <% for ( var i = 0; i < DICT.length; i++ ) { %>
            <tr class="picker-day" data-value="<%= DICT[i][0] %>">
                <td class="picker-label">
                    <span bx-click="toggle(<%= DICT[i][0] %>)"><%= DICT[i][1] %></span>
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
                        <a bx-click="apply('to', <%= DICT[i][0] %>)" href="javascript: void(0);">复制到</a>
                    </div>
                </td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})