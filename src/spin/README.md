# Spin

纯 CSS 加载动画。

```html
<div bx-name="components/spin"></div>
```

> 来自 [SpinKit](https://github.com/tobiasahlin/SpinKit)。

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项 | 类型 | 默认值 | 说明
:--- | :--- | :------ | :----------
type | string | `'three-bounce'` | 可选。指定加载动画的类型，可选值有：`rotating-plane`、`double-bounce`、`rectangle-bounce`、`wandering-cubes`、`pulse`、`chasing-dots`、`three-bounce`、`circle-spinner`。

## 示例

```html
<div bx-name="components/spin"></div>

<div bx-name="components/spin" data-type="rotating-plane"></div>
<div bx-name="components/spin" data-type="double-bounce"></div>
<div bx-name="components/spin" data-type="rectangle-bounce"></div>
<div bx-name="components/spin" data-type="wandering-cubes"></div>
<div bx-name="components/spin" data-type="pulse"></div>
<div bx-name="components/spin" data-type="chasing-dots"></div>
<div bx-name="components/spin" data-type="three-bounce"></div>
<div bx-name="components/spin" data-type="circle-spinner"></div>
```