# Spin

纯 CSS 加载动画。{ .lead }

> 来自 [SpinKit](https://github.com/tobiasahlin/SpinKit)。

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content clearfix">
        <div bx-name="components/spin"></div>
    </div>
</div>

<div class="bs-example">
    <div class="content clearfix">
        <div class="row">
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="rotating-plane"></div>
            </div>
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="double-bounce"></div>
            </div>
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="rectangle-bounce"></div>
            </div>
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="wandering-cubes"></div>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content clearfix">
        <div class="row">
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="pulse"></div>
            </div>
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="chasing-dots"></div>
            </div>
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="three-bounce"></div>
            </div>
            <div class="col-xs-3">
                <div bx-name="components/spin" data-type="circle-spinner"></div>
            </div>
        </div>
    </div>
</div>

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
type | string | `'three-bounce'` | 可选。指定加载动画的类型，可选值有：`rotating-plane`、`double-bounce`、`rectangle-bounce`、`wandering-cubes`、`pulse`、`chasing-dots`、`three-bounce`、`circle-spinner`。