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
            <br>
            <select disabled>
                <option value="1">disabled</option>
                <option value="2">Another action</option>
                <option value="3">Something else here</option>
            </select>
            <select bx-name="components/dropdown" disabled>
                <option value="1">disabled</option>
                <option value="2">Another action</option>
                <option value="3">Something else here</option>
            </select>
            <select bx-name="components/dropdown" data-disabled="true">
                <option value="1">data-disabled="true"</option>
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

<hr>

> [CSS Stats](http://cssstats.com/), [Apple](http://cssstats.com/stats?url=http%3A%2F%2Fapple.com&name=Apple)

<style type="text/css">
    .demo-bg {}
    .demo-bg .item {
        color: #FFF;
        height: 64px; 
        line-height: 64px;
        text-align: center;
        vertical-align: middle;
        border-radius: 5px;
    }
    .demo-bg .item .up,
    .demo-bg .item .down {
        height: 48px;
        line-height: 48px;
        vertical-align: middle;
        text-align: center;
    }
    .demo-bg .item .up {
        border-radius: 5px 5px 0 0;
    }
    .demo-bg .item .down {
        border-radius: 0 0 5px 5px;
    }
</style>

<h3>Colors</h3>
<div class="row">
    <div class="col-xs-3 mb10">
        <div style="font-size: 48px; color: #000000;">Aa</div>
        <div>#000000</div>
    </div>
    <div class="col-xs-3 mb10">
        <div style="font-size: 48px; color: #333333;">Aa</div>
        <div>#333333</div>
    </div>
    <div class="col-xs-3 mb10">
        <div style="font-size: 48px; color: #666666;">Aa</div>
        <div>#666666</div>
    </div>
    <div class="col-xs-3 mb10">
        <div style="font-size: 48px; color: #999999;">Aa</div>
        <div>#999999</div>
    </div>
</div>
<h3>Background Colors</h3>
<div class="row">
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #000000; ">#000000</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #333333;">#333333</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #666666;">#666666</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #999999;">#999999</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #4D7FFF;">#4D7FFF</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #9561F0;">#9561F0</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #68499E;">#68499E</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #339966;">#339966</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #56abe4;">#56abe4</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #428BCA;">#428BCA</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #ED4242;">#ED4242</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #16C98D;">#16C98D</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #2378FF;">#2378FF</div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item" style="background-color: #FF6600;">#FF6600</div>
    </div>
</div>
<div class="row">
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item">
            <div class="up" style="background-color: #1ABC9C;">#1ABC9C</div>
            <div class="down" style="background-color: #16A085;">#16A085</div>
        </div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item">
            <div class="up" style="background-color: #2ECC71;">#2ECC71</div>
            <div class="down" style="background-color: #21AE60;">#21AE60</div>
        </div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item">
            <div class="up" style="background-color: #3498DB;">#3498DB</div>
            <div class="down" style="background-color: #2980B9;">#2980B9</div>
        </div>
    </div>
    <div class="col-xs-3 mb10 demo-bg">
        <div class="item">
            <div class="up" style="background-color: #9B59B6;">#9B59B6</div>
            <div class="down" style="background-color: #8E44AD;">#8E44AD</div>
        </div>
    </div>
</div>
<h3>Font Sizes</h3>
<div class="">
    <div style="font-size: 20px;">Font Size 20px</div>
    <div style="font-size: 16px;">Font Size 16px</div>
    <div style="font-size: 14px;">Font Size 14px</div>
    <div style="font-size: 12px;">Font Size 12px</div>
</div>
<h3>Font Families</h3>
<div class="" style="font-size: 16px;">
    <div style="font-family: 'Microsoft YaHei';">"Microsoft YaHei"</div>
    <div style="font-family: '微软雅黑';">"微软雅黑</div>
    <div style="font-family: STXihe;">STXihe</div>
    <div style="font-family: '华文细黑';">"华文细黑</div>
    <div style="font-family: Georgi;">Georgi</div>
    <div style="font-family: 'Times New Roman';">"Times New Roman</div>
    <div style="font-family: Aria;">Aria</div>
    <div style="font-family: sans-serif;">sans-serif</div>
</div>

<hr>

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