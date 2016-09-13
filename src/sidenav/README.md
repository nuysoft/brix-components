# SiteNav

将阿里妈妈的统一吊顶封装成 Brix 组件。

## 调用方式

```html
<div bx-name="component/sitenav" bx-options="{mode:'normal'}"></div>
```

## 默认值

```javascript
mode:'normal'
```

## 可选参数

前台版本：

```javascript
mode:'normal'
```

后台版本：

```javascript
mode:'simple'
```

## 生命周期内被调用的方法

组件在实例化过程中会被调用的方法，抛出来给外部用，可以用来给不同业务对组件的个性化定制

### afterMainNavRender

当组件html渲染到页面上的时候会被调用

## beforeProductListRender

当后台入口产品面板加载完了之后执行

> 由于这两个方法会在组件实例化过程中被调用，所有如果要对组件进行定制的话必须在组件加载之前先定义好这两个方法，定义的方式如下

```javascript
if (!window.MMSiteNav) {
  window.MMSiteNav = {}
}

window.MMSiteNav['afterMainNavRender'] = function () {
  ...
}

window.MMSiteNav['afterProductListRender'] = function () {
  ...
}
```


## 外部可调用方法

组件加载完成之后，会提供一个全局的对象 `MMSiteNav` 用来调用组件内部的方法。可供调用的方法有：

### showLoginPanel(scrolling, forward)

唤起吊顶登录框

参数：

scrolling：是否滚动到页头

forward：登录后的跳转目标地址，如果不传就用当前页面地址

## showH5LoginPanel(forward)

唤起无线登录框

参数：

forward：登录后的跳转目标地址，如果不传就用当前页面地址

## hideLoginPanel()

隐藏吊顶登录框

## hideH5LoginPanel()

隐藏无线登录框
