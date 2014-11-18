# header

> Lorem ipsum

### 示例 <small>Examples</small>

<div bx-name="component/header" bx-options="{}"></div>

### 使用 Usage

1. 安装 Install

  ```sh
  $ bower install --save-dev brix-component-header
  ```

2. 配置组件 Package

  ```js
  require.config({
    paths: {
      'component/header': 'bower_components/brix-component-header/header'
    }
  })
  ```

3. 应用组件 Apply

  ```html
  <div bx-name="component/header" bx-options="{}"></div>
  ```

### 配置 <small>Options</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | any | {} | 渲染组件所需的数据对象。
template | string | '' | 渲染组件所需的 HTML 模板。

### 方法 <small>Methods</small>

#### .render()

渲染组件。

```js
var Loader = require('brix/loader')
var instance = Loader.query('component/header')
instance.render()
```

#### .method(args)

Lorem ipsum

```js
var Loader = require('brix/loader')
var instance = Loader.query('component/header')
instance.method()
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
ready | 当前组件完全渲染完成后触发，包括子组件的渲染。
destroyed | 当前组件销毁后触发，包括子组件的销毁。

