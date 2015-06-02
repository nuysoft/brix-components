# Hello

Brix 组件实现示例。{ .lead }

### 示例 <small>Examples</small>

<style type="text/css">
    .browser .datepickerwrapper-trigger,
    .browser .dropdown .dropdown-toggle {
        /*background-color: white;*/
    }
</style>
<div class="browser">
    <div class="topbar">
        <div class="circles">
            <div class="circle shutup"></div>
            <div class="circle minimize"></div>
            <div class="circle maximize"></div>
        </div>
    </div>
    <div class="content">
        <div class="site-layout-example-top">
            <span class="flat-text-logo">Examples</span>
        </div>
        <div class="site-layout-example-right">
            <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" class="datepickerwrapper-trigger">
                <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                <span class="brixfont down">&#xe623;</span><!-- 向下 -->
                <span class="brixfont up">&#xe62e;</span><!-- 向上 -->
            </div>
            <select bx-name="components/dropdown">
                <option value="1">Action</option>
                <option value="2">Another action</option>
                <option value="3">Something else here</option>
            </select>
            <select bx-name="components/dropdown" data-value="2">
                <option value="1">Action</option>
                <option value="2">Another action</option>
                <option value="3">Something else here</option>
            </select>
            <input placeholder="input">
        </div>
    </div>
</div>

<div class="browser">
    <div class="topbar">
        <div class="circles">
            <div class="circle shutup"></div>
            <div class="circle minimize"></div>
            <div class="circle maximize"></div>
        </div>
    </div>
    <div class="content">
        <div class="site-layout-example-top">
            <span class="flat-text-logo">Hello</span>
        </div>
        <div class="site-layout-example-right">
            <p class="flat-text small"></p>
            <p class="flat-text full-width"></p>
            <p class="flat-text full-width"></p>
            <p class="flat-text full-width"></p>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6 mb10">
        <div style="display: inline-block;">
            <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" class="datepickerwrapper-trigger">
                <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                <span class="brixfont down">&#xe623;</span><!-- 向下 -->
                <span class="brixfont up">&#xe62e;</span><!-- 向上 -->
            </div>
        </div>
    </div>
    <div class="col-md-6 mb10">
        <select bx-name="components/dropdown">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3">Something else here</option>
        </select>
        <select bx-name="components/dropdown" data-value="2">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3">Something else here</option>
        </select>
    </div>
    <div class="col-md-12 mb10">
        <div bx-name="components/pagination" data-total="100" data-cursor="1" data-limit="9"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="4" data-limit="12" data-limits="[40, 30, 20]" data-simplify="true"></div>
    </div>
    <div class="col-md-12 mb10">
        <ul class="mm-tabs clearfix mb10">
            <li class="active"><a href="javascript:;">Home</a></li>
            <li><a href="javascript:;">Profile</a></li>
            <li><a href="javascript:;">Messages</a></li>
        </ul>
    </div>
    <div class="col-md-6 mb10">
        <div bx-name="components/popover" data-placement="right" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">Popover with data-*</div>
    </div>
    <div class="col-md-6 mb10">
        <a href="javascript:;">link</a>
        <a href="javascript:;" class="btn">.btn</a>
        <a href="javascript:;" class="btn btn-brand">.btn .btn-brand</a>
        <a href="javascript:;" class="btn btn-disabled">.btn .btn-disabled</a>
    </div>
    <div class="col-md-6 mb10">
        <input placeholder="input">
        <textarea placeholder="textarea"></textarea>
    </div>
    <div class="col-md-6 mb10">
        <input placeholder="input.error" class="error">
        <textarea placeholder="textarea.error" class="error"></textarea>
    </div>
    <div class="col-md-6 mb10">
        <input placeholder="input[disabled]" disabled>
        <textarea placeholder="textarea[disabled]" disabled></textarea>
    </div>
    <div class="col-md-12 mb10">
        <div class="searchbox pull-left">
            <span class="brixfont">&#xe61c;</span>
            <input placeholder="searchbox pull-left">
        </div>
        <div class="searchbox pull-right">
            <span class="brixfont">&#xe61c;</span>
            <input placeholder="searchbox pull-right">
        </div>
    </div>
</div>
<hr>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/hello" bx-options="{ 
            message: 'World' 
        }"></div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/hello" data-message="Brix"></div>
    </div>
</div>

### 配置 <small>Options</small>

Lorem ipsum.

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | any | `{}` | 渲染组件所需的数据。
template | string | `''` | 自定义的组件 HTML 模板文件。
css | string | `''` | 自定义的组件 CSS 样式文件。
message | string | `''` | 指定输出的文本。

### 方法 <small>Methods</small>

#### .say( message )

在页面上输出 `Hello <%= message %>!`

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/hello')
instance.say('Brix')
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
ready | 当前组件完全渲染完成后触发，包括子组件的渲染。
destroyed | 当前组件销毁后触发，包括子组件的销毁。


> 这里仅仅约束了文档的格式，关于 Hello 组件的任何说明都是胡言乱语。

<script type="text/javascript">
    require(['css!css-tool/mm.css'])
    require(['css!css-tool/browser.css'])
    $('ul.mm-tabs')
        .on('mouseleave', function(event) {
            $(event.currentTarget).find('li').removeClass('border-bottom-color-transparent')
        })
        .find('li')
        .on('mouseenter', function(event) {
            $(event.currentTarget).removeClass('border-bottom-color-transparent')
                .siblings().addClass('border-bottom-color-transparent')
        })
        .on('click', function(event){
            $(event.currentTarget).addClass('active')
                .siblings().removeClass('active')
        })
</script>