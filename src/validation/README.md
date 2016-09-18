# Validation

表单验证组件。

> 引用了 <http://parsleyjs.org/>。

```html
<form bx-name="components/validation"></form>
<div bx-name="components/validation"></div>
```

## 配置

无。

## 属性

属性名  | 类型    | 默认值 | 说明
:------ | :------ | :----- | :----------
parsley | Parsley | -      | <http://parsleyjs.org/>

## 方法

### .validate()

<http://parsleyjs.org/doc/index.html#usage-form>

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/validation')
instances.validate()
```

### .isValid()

<http://parsleyjs.org/doc/index.html#usage-form>

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/validation')
instances.isValid()
```

## 事件

无。

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
