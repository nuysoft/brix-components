# Imager

响应式图片组件，优先显示图片的『核心区域』。{ .lead }

> 灵感源自 <http://blog.cloudfour.com/a-framework-for-discussing-responsive-images-solutions/>。

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div>
            原图：
            <img src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg">
        </div>
        <hr>
        <div style="display: inline-block;">
            100px：
            <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 100px;"></div>
        </div>
        <div style="display: inline-block;">
            150px：
            <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 150px;"></div>
        </div>
        <div style="display: inline-block;">
            200px：
            <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 200px;"></div>
        </div>
        <div style="display: inline-block;">
            250px：
            <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 250px;"></div>
        </div>
        <div style="display: inline-block;">
            300px：
            <div bx-name="components/imager" data-src="http://3w7ov13ob0hk2kk1w147yffjlu5.wpengine.netdna-cdn.com/wp-content/uploads/2012/05/obama-500.jpg" data-left="185" data-top="65" data-width="100" data-height="100" style="width: 300px;"></div>
        </div>
    </div>
</div>

### 配置 <small>Options</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
src | string | `''` | 图片地址。
left | number | - | 图片核心区域距左坐标。
top | number | - | 图片核心区域距上坐标。
width | number | - | 图片核心区域的宽度。
height | number | - | 图片核心区域的高度。
