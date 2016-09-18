# Spin

纯 CSS 加载动画。

```html
<div bx-name="components/spin"></div>
```

> 来自 [SpinKit](https://github.com/tobiasahlin/SpinKit)。

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项 | 类型   | 默认值           | 说明
:----  | :----- | :--------------- | :----------
type   | string | `'three-bounce'` | 可选。指定加载动画的类型，可选值有：`rotating-plane`、`double-bounce`、`rectangle-bounce`、`wandering-cubes`、`pulse`、`chasing-dots`、`three-bounce`、`circle-spinner`。

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>