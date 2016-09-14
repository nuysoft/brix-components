# SideNav

阿里妈妈后台顶部和左侧导航组件。

## 示例

<div class="bs-example">
    <div class="content">
        <div class="header">
            <h1 style="display:none;">DMP</h1>
            <div class="bp-logo">
                <i class="bp-iconfont bp-logo1">&#13416;</i>
                <i class="bp-iconfont bp-logo2">&#xe62d;</i>
            </div>

            <!-- 菜单区域 - 包含了顶部的菜单跟侧边栏 START-->
            <div class="sidebar-wrap" bx-name="components/sidenav" bx-options="{
              index: '/index',
              pathMap: {
                '/examples/create': '/examples/second', //指定映射某个菜单
                '/examples/nomenu': '' //映射为空代表不对应任何菜单
              }}">

                <!-- 顶部菜单 -->
                <div class="top-nav">
                    <ul>
                        <li><a href="#!/index" hidefocus="true">首页</a></li>
                        <li><a href="#!/examples/custom" data-sub="自定义" hidefocus="true">包含自定义区域的菜单1</a></li>
                        <li><a href="#!/examples/second" data-sub="二级" hidefocus="true">二级</a></li>
                        <li><a href="#!/examples/third" data-sub="三级" hidefocus="true">三级</a></li>
                        <li><a href="#!/examples/custom2" data-sub="自定义2" hidefocus="true">包含自定义区域的菜单2</a></li>
                    </ul>
                </div>

                <!-- 侧边栏menus -->
                <div class="sidebar">
                    <div class="sub-nav">
                        <div class="sub-nav-wrap">
                            <div class="menu-icon">
                                <i class="bp-iconfont">&#xe649;</i>
                            </div>
                            <!-- 二级菜单区域 -->
                            <!-- data-sub需与上面的对应 -->
                            <ul data-sub="二级" class="sub-nav-ul">
                                <li class="li"><a href="#!/examples/second2">二级</a></li>
                                <li class="li"><a href="#!/examples/second">二级</a></li>
                            </ul>

                            <!-- 三级菜单区域 -->
                            <ul data-sub="三级" class="sub-nav-ul">
                                <li class="li sub">
                                    <div class="sub-title">三级</div>
                                    <ul class="sub-nav-third">
                                        <li><a href="#!/examples/third"><i class="bp-iconfont mr8">&#xe611;</i> 三级子菜单1</a></li>
                                        <li><a href="#!/examples/third2"><i class="bp-iconfont mr8">&#xe611;</i> 三级子菜单2</a></li>
                                    </ul>
                                </li>

                                <li class="li sub">
                                    <div class="sub-title">三级</div>
                                    <ul class="sub-nav-third">
                                        <li><a href="#!/examples/third3"><i class="bp-iconfont mr8">&#xe611;</i> 三级子菜单3</a></li>
                                        <li><a href="#!/examples/third4"><i class="bp-iconfont mr8">&#xe611;</i> 三级子菜单4</a></li>
                                    </ul>
                                </li>
                            </ul>

                            <!-- data-notmenu=true 标识这个自定义区域里的a链接不计入二级菜单计算 -->
                            <div data-notmenu="true" data-sub="自定义" style="padding:0 30px 30px;font-size:12px;">
                                <div mx-vframe="true" id="custom1"></div>

                                用户名：hello1234
                                <br>
                                <br>
                                <button mx-click="create">新建人群</button>
                                <br>
                                <br>
                                <a href="#!/examples/nomenu">无对应菜单页面</a>
                                <br>
                                <a href="#!/examples/second">有对应菜单页面</a>
                            </div>

                            <div data-notmenu="true" data-sub="自定义2" style="padding:0 30px 30px;font-size:12px;">
                                <div mx-vframe="true" id="custom2"></div>
                            </div>


                            <!-- hold按钮 -->
                            <div class="side-hold">
                                <span class="on" title="固定侧栏">锁定</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项  | 配置项 | 默认值     | 说明
:------ | :----- | :--------- | :----------
index   | string | `'/index'` | 默认首页view地址
pathMap | object | `{}`       | 指定path映射某个菜单，映射为空代表不对应任何菜单
