# Popover

浮层。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            placement: 'top',
            title: 'Popover on top',
            content: 'Envy is the ulcer of the soul.'
        }" class="btn btn-default">Popover on top</div>
        <div bx-name="components/popover" bx-options="{
            placement: 'right',
            title: 'Popover on right',
            content: 'Envy is the ulcer of the soul.'
        }" class="btn btn-default">Popover on right</div>
        <div bx-name="components/popover" bx-options="{
            placement: 'bottom',
            title: 'Popover on bottom',
            content: 'Envy is the ulcer of the soul.'
        }" class="btn btn-default">Popover on bottom</div>
        <div bx-name="components/popover" bx-options="{
            title: 'Popover on left',
            placement: 'left',
            content: 'Envy is the ulcer of the soul.'
        }" class="btn btn-default">Popover on left</div>
    </div>
</div>
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            title: '<h4>Table</h4>',
            content: '<table class=\'table table-striped\'>\
                          <thead>\
                              <tr>\
                                <th>#</th>\
                                <th>First</th>\
                                <th>Last</th>\
                                <th>Twitter</th>\
                              </tr>\
                          </thead>\
                          <tbody>\
                              <tr>\
                                  <td>1</td>\
                                  <td>Mark</td>\
                                  <td>Otto</td>\
                                  <td>@mdo</td>\
                              </tr>\
                              <tr>\
                                  <td>2</td>\
                                  <td>Jacob</td>\
                                  <td>Thornton</td>\
                                  <td>@fat</td>\
                              </tr>\
                              <tr>\
                                  <td>3</td>\
                                  <td>Larry</td>\
                                  <td>the Bird</td>\
                                  <td>@twitter</td>\
                              </tr>\
                          </tbody>\
                      </table>'
        }" class="btn btn-default">Popover with html</div>
    </div>
</div>
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            content: 'Having the fewest wants, I am nearest to the gods.'
        }" class="btn btn-default">Popover without title</div>
    </div>
</div>
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" data-placement="right" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">Popover with data-*</div>
    </div>
</div>
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            title: 'placement top + align left',
            placement: 'top',
            align: 'left',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement top + align left</div>
        <div bx-name="components/popover" bx-options="{
            title: 'placement top + align right',
            placement: 'top',
            align: 'right',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement top + align right</div>
    </div>
</div>
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            title: 'placement bottom + align left',
            placement: 'bottom',
            align: 'left',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement bottom + align left</div>
        <div bx-name="components/popover" bx-options="{
            title: 'placement bottom + align right',
            placement: 'bottom',
            align: 'right',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement bottom + align right</div>
    </div>
</div>
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            title: 'placement left + align top',
            placement: 'left',
            align: 'top',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement left + align top</div>
        <div bx-name="components/popover" bx-options="{
            title: 'placement left + align bottom',
            placement: 'left',
            align: 'bottom',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement left + align bottom</div>
    </div>
</div>
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            title: 'placement right + align top',
            placement: 'right',
            align: 'top',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement right + align top</div>
        <div bx-name="components/popover" bx-options="{
            title: 'placement right + align bottom',
            placement: 'right',
            align: 'bottom',
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement right + align bottom</div>
    </div>
</div>

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
placement | string | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
align | string | `''` | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
title | string | `''` | 指定浮层的标题。
content | string | `''` | 指定浮层的内容。
~~delay~~ | number | `100` | 指定延迟关闭浮层的时间，单位为毫秒。


### 方法 <small>Methods</small>

无。

### 事件 <small>Events</small>

无。
