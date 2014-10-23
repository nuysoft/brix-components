# Imager

响应式图片。{ .lead }

> 灵感源自 <http://blog.cloudfour.com/a-framework-for-discussing-responsive-images-solutions/>。

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div><img src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg"></div>
        <hr>
        <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 100px;"></div>
        <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 150px;"></div>
        <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 200px;"></div>
        <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 250px;"></div>
        <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 300px;"></div>
    </div>
</div>

### 配置 <small>Options</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | any | {} | 渲染组件所需的数据对象。
template | string | '' | 渲染组件所需的 HTML 模板。

### 方法 <small>Methods</small>

#### .render()

渲染组件。

```js
var Loader = require('loader')
var instance = Loader.query('component/imager')
instance.render()
```

#### .method(args)

Lorem ipsum

```js
var Loader = require('loader')
var instance = Loader.query('component/imager')
instance.method()
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
ready | 当前组件完全渲染完成后触发，包括子组件的渲染。
destroyed | 当前组件销毁后触发，包括子组件的销毁。

