## 示例 <small>Examples</small>

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
<div class="bs-example" id="popover">
    <div class="content">
        <div bx-name="components/popover" bx-options="{
            title: 'placement right + align top + width',
            placement: 'right',
            align: 'top',
            width: 500,
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement right + align top + width</div>
        <div bx-name="components/popover" bx-options="{
            title: 'placement right + align bottom + offset',
            placement: 'right',
            align: 'bottom',
            offset: {
                top: 50
            },
            content: 'Remember what is unbecoming to do is also unbecoming to speak of.'
        }"class="btn btn-default">placement right + align bottom + offset</div>
    </div>
</div>

<div class="bs-example" id="popover">
    <div class="content">
        <h4>如果浮层中的内容很复杂，例如多层嵌套的 HTML 代码，或者是含有 `<pre>`代码，建议预先在页面中渲染好浮层中的内容，并设置一个 `id` 属性，然后在组件上设置 `template: #id`。</h4>
        <div id="escaped" class="popover">
            <div class="arrow"></div>
            <div class="popover-content">
                <div>&lt;div&gt;</div>
                <pre><div></pre>
            </div>
        </div>
        <div bx-name="components/popover" bx-options="{
            placement: 'top',
            template: '#escaped',
            width: 200
        }" class="btn btn-default">Code</div>
    </div>
</div>
```html
<div id="escaped" class="popover">
    <div class="arrow"></div>
    <div class="popover-content">
        <div>&lt;div&gt;</div>
        <pre><div></pre>
    </div>
</div>
```
