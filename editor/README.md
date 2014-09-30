# editor

> Lorem ipsum

### 示例 Example

<div bx-id="component/editor" bx-options="{}"></div>

### 使用 Usage

1. 安装 Install

  ```sh
  $ bower install --save-dev brix-component-editor
  ```

2. 配置组件 Package

  ```js
  require.config({
    paths: {
      'component/editor': 'bower_components/brix-component-editor/editor'
    }
  })
  ```

3. 应用组件 Apply

  ```html
  <div bx-id="component/editor" bx-options="{}"></div>
  ```

### 配置 Options

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | any | {} | 渲染组件所需的数据对象。
template | string | '' | 渲染组件所需的 HTML 模板。

### 方法 Methods

#### .render()

渲染组件。

```js
var Loader = require('loader')
var instance = Loader.query('component/editor')
instance.render()
```

#### .method(args)

Lorem ipsum

```js
var Loader = require('loader')
var instance = Loader.query('component/editor')
instance.method()
```

### 事件 Events

Event Type | Description
:--------- | :----------
ready | 当前组件完全渲染完成后触发，包括子组件的渲染。
destroyed | 当前组件销毁后触发，包括子组件的销毁。

