// jshint ignore: start
/*
    http://getbootstrap.com/components/#dropdowns
    http://silviomoreto.github.io/bootstrap-select/
 */
define(
  [
    'jquery', 'underscore', 'handlebars',
    'components/base', 'brix/event',
    // 'text!./sidebar.tpl',
    'css!./sidenav.css',
    'css!./header.css'
  ],
  function(
    $, _, Handlebars,
    Brix, EventManager
    // template
  ) {
    /*
        # Dropdown

        下拉框组件。

        ### 数据
            [
                {
                    label: '',
                    value: '',
                    selected: true|false
                },
                ...
            ]
            或者
            [
                {
                    label: '',
                    children: [
                        [
                            {
                                label: '',
                                value: '',
                                selected: true|false
                            },
                            ...
                        ]
                    ]
                },
                ...
            ]
        ### 选项
            公共选项：data template

        ### 属性
            公共属性：element moduleId clientId parentClientId childClientIds data template
            selectedIndex   当前选中的下标。
            label            选中条目的文本。
            value           选中条目的值。
            select          指向关联的 <select> 节点

        ### 方法
            select( label|value )
            toggle()
            focus()
            blue()

        ### 事件
            公共事件：ready destroyed
            change

        ### 示例

        <select>
            <option value ="volvo">Volvo</option>
            <option value ="saab">Saab</option>
            <option value ="mercedes">Mercedes</option>
            <option value ="audi">Audi</option>
        </select>
        <select>
            <optgroup label="Swedish Cars">
                <option value ="volvo">Volvo</option>
                <option value ="saab">Saab</option>
            </optgroup>
            <optgroup label="German Cars">
                <option value ="mercedes">Mercedes</option>
                <option value ="audi">Audi</option>
            </optgroup>
        </select>

        TODO
            multiple disabled
            responsive http://silviomoreto.github.io/bootstrap-select/
    */


    var EASING = 'swing' //动画缓函数
    var ALL_EVENTS = {
      EVENTS: {
        '.sub-nav': {
          mouseenter: function(e, self) {
            // if (self.__isNoMenuAnim) {
            //   self.__isNoMenuAnim = false
            //   return
            // }

            if (!$(self.element).find('.side-hold span').hasClass('on')) {
              // console.log('mouseenter')
              self._expandCollapseSubNav();
            }
          },
          mouseleave: function(e, self) {

            // if (self.__isNoMenuAnim) {
            //   self.__isNoMenuAnim = false
            //   return
            // }

            if (!$(self.element).find('.side-hold span').hasClass('on')) {
              // console.log('mouseleave')
              self._expandCollapseSubNav();
            }
          }
        },

        '.side-hold span': {
          click: function(e, self) {
            var el = $(e.currentTarget)
            el.toggleClass('on')
          }
        },

        //子导航收缩扩展的点击切换
        // ".subnav-handle": {
        //   //时间类型
        //   'click': function(e, self) {
        //     //子导航扩展收缩
        //     self.isHandleClick = true;
        //     self._expandCollapseSubNav();
        //   }
        // },

        //子导航的点击
        '.sub-nav .sub-link': {
          'click': function(e, self) {
            return
            //a标签里包含i标签时，点击i也会代理到事件。。貌似BUG
            //处理：如果是i则用closest往上取a标签
            var t = $(e.target).closest('a');
            // var self = this;
            var thisSubNav = t.closest('.sub-nav-ul');
            var dataSub = thisSubNav.attr('data-sub');

            self.isHandleClick = false;
            self.nowNav = self.nav.find('[data-sub=' + dataSub + ']');

            self.navclick(self.nowNav);
            // self.nowNav.fire('click');
            self.currentSubNav = t.closest('.sub');
            self._setSubNavOn(t);
            self.isNavClick = true;
            // S.all(window).scrollTop(0);
            // self._fixedStatic();
          }
        },

        //三级导航点击标题收缩扩展子菜单
        '.sub-nav .sub-title': {
          click: function(e, self) {
            return
            var _this = $(e.currentTarget);
            var _sub = _this.next('.sub-nav-third');
            var self = this;

            if (_sub.css('height') === '0px') {
              var h = _sub.css('height', 'auto').height();
              _sub.css('height', 0);
              _sub.animate({
                'height': h
              }, self.duration, EASING);

            } else {
              _sub.animate({
                'height': 0
              }, self.duration, EASING);
            }
          }
        },

        //子导航收缩时，鼠标经过显示全部菜单
        '.sub-nav .sub': {
          mouseenter: function(e, self) {
            // var self = this;
            if (self.isFullSubNav !== '0') return; //菜单不为收缩时，不处理
            var t = $(e.target).closest('.sub');
            var o = t.offset();
            self.currentLi = t;
            // self.subNavView.html(t.html());
            // self.subNavView.all('.sub-nav-third').css('height', 'auto');
            // self.subNavView.css(o);
          }
        }

      },
      DOCEVENTS: {
        '.sub-nav-view a': {
          //复制到body下的子导航的点击处理
          'click': function(e, self) {
            // var t = $(e.target).closest('a');
            // // var self = this;
            // self._setSubNavOn(t);
            // self.currentSubNav = self.currentLi;
            // self.isNavClick = true;
          }
        },
        //主导航的点击
        // '.top-nav a': {
        //   'click': function(e) {
        //     this.navclick(S.all(e.target));
        //   }
        // },
        '.sub-nav-view': {
          //子导航收缩时，鼠标离开隐藏菜单
          'mouseleave': function(e, self) {
            // var self = this;
            // self.subNavView.css('left', '-10000px');
            // self.subNavView.all('.sub-nav-third').css('height', 0);
            // self.currentLi.html(self.subNavView.html());
          }
        }
      },
      WINEVENTS: {
        scroll: function(e, self) {
          // var self = this;
          //滚动位置，滚动到126px的时候，sidebar变为fixed
          self._timer(function() {
            self._fixedStatic();
          }, 10);
        },

        resize: function(e, self) {
          //边栏高度根据window高度设置
          self.subNav.height($(window).height())
        },

        hashchange: function(e, self) {
          // if (!this.isNavClick) {
          // ie8下magix里获取query执行顺序有问题，暂时加上setTimeout解决
          // TODO 解决magix里ie8获取query先后问题
          // fixed: 用kissy的事件侦听hashchange即可，不用原生onhashchange
          self._pathname2sidebar();
          // }
          // this.isNavClick = false; //区别开是导航点击的，还是页面上链接跳转的
        }
      }
    }


    //arguments: [el, options]
    function Sidenav() {
      if (arguments.length) {
        this.element = $(arguments[0])
        this.options = _.extend(this.options, arguments[1])
        this.render()
      }
    }

    _.extend(Sidenav.prototype, Brix.prototype, {
      /**
       * 组件放置到dom后触发的方法调用
       */

      options: {
        //inmain selector
        //用来控制菜单收缩时，主体内容也随着收缩
        inmain: '.inmain',

        /**
         * 默认的首页地址
         * @cfg {String}
         */
        index: '/index',
        /**
         * 导航动画持续时间，可配置
         * @cfg {Number}
         */
        duration: 250,

        /**
         * 这里配置有的页面不是导航点击进来的，可以配置成相应的导航下面,
         * 左边是目标页面，右边是希望导航停在哪里的页面
         * 置空则不停在任何导航上
         * 格式：
         *  '#!/adzone/adzone_detail/': '#!/adzone/adzone/',
            '#!/plan/handle/': '#!/plan/list/',
            '#!/plan/price_handle/': '#!/plan/list/',
            '#!/messages/list/': '',
            '#!/messages/detail/': '',
            '#!/components/': ''
         * @cfg {Object}
         */
        pathMap: {}
      },
      render: function() {
        var self = this;
        var el = $(this.element);
        this.sidebar = el;
        this.main = $(this.options['inmain']);
        this.allLinks = el.find('.sidebar').find('a');
        this.nav = el.find('.top-nav');
        this.subNav = el.find('.sub-nav');
        this.subNavWrap = el.find('.sub-nav-wrap');
        this.subNavHandle = el.find('.subnav-handle');

        //这里配置有的页面不是导航点击进来的，
        //可以配置成相应的导航下面
        //置空则不停在任何导航上
        this.pathMap = this.options['pathMap'];


        this.sidebar.find('.sidebar').find('[data-sub]').hide()

        //收缩子菜单状态下，子菜单是复制附加到body根节点下的
        // this.subNavView = S.all('<div class="sub-nav-view"></div>').appendTo('body');

        //利用localStorage记录子菜单是否mini模式, 1：打开模式；0：收缩模式
        //不支持localStorage的浏览器用默认的值["1"]
        this.localStorage = window.localStorage;
        this.isFullSubNav = this.localStorage && this.localStorage.isFullSubNav || '1';
        this.isFullSubNav = '1' //没有打开状态记录了

        // if (this.isFullSubNav === '0') {
        //   this.subNavHandle.replaceClass('icon-expand', 'icon-collapse');
        // }

        //可配置的两个参数 duration index
        this.index = this.options['index']; //默认的首页地址
        this.duration = this.options['duration']; //导航动画持续时间，可配置
        this.isHandleClick = false; //标识是否点击了扩展收缩按钮
        self.navTop = el.find('.sidebar').offset().top; //导航的初始offset.top值
        //初始化
        // this._bindUI();
        this._pathname2sidebar();


        //边栏高度根据window高度设置
        this.subNav.height($(window).height())

        //事件绑定
        this._bindUI()
      },

      _bindUI: function() {
        var el = $(this.element)
        var self = this
          //旧brix事件绑定转换
        $.each(ALL_EVENTS, function(k, v) {
          switch (k) {
            case 'EVENTS':
              $.each(v, function(_k, _v) {
                $.each(_v, function(__k, __v) {
                  el.delegate(_k, __k, function(e) {
                    __v(e, self)
                  })
                })
              })
              break

            case 'DOCEVENTS':
              $.each(v, function(_k, _v) {
                $.each(_v, function(__k, __v) {
                  $(document).delegate(_k, __k, function(e) {
                    __v(e, self)
                  })
                })
              })
              break

            case 'WINEVENTS':
              $.each(v, function(_k, _v) {
                $(window).on(_k, function(e) {
                  _v(e, self)
                })
              })
              break
          }
        })
      },

      /**
       * 模拟queryModel对hash的pathname进行解析
       * @private
       */
      _getPathname: function(h) {
        var pathname;
        if (h.indexOf('#!') > -1) {
          var pathnameMatch = /^.*(#!\/[^\?]+)\??[^\/]*$/.exec(h); // #!/xxxx/yyyy 返回 /xxxx/yyyy
        } else {
          var pathnameMatch = /^(\/[^\?]+)\??[^\/]*$/.exec(h); // /xxxx/yyyy?id=1 直接返回/xxxx/yyyy
        }

        pathname = pathnameMatch && pathnameMatch[1] || '';

        pathname = pathname.replace('#!', '')

        return pathname;
      },

      //根据pathname来确定sidebar的状态
      _pathname2sidebar: function() {
        var self = this;
        var h = this._getPathname(location.hash) || this._getPathname(this.index);
        // var h = (location.hash) || this.index;

        //将map中的地址映射成相应的导航
        $.each(this.pathMap, function(k, v) {
          if (h === k) {
            h = v;
            return false;
          }
        });

        var _hasNav = false
        var slice = Array.prototype.slice
        var sidebarA = self.subNav.find('a')

        sidebarA = sidebarA.filter(function(i, item) {
          var cst = $(item).closest('[data-notmenu]')
          if (!cst || cst.length === 0) {
            return item
          }
        })

        var navA = self.nav.find('a')
        var allA = slice.call(navA).concat(slice.call(sidebarA))

        $.each(allA, function(i, n) {
          n = $(n)
          var origin_href = n.attr('href');
          origin_href = origin_href.replace(/^.*?#/g, '#'); //ie7以下a的href会获取完整地址，做下处理
          origin_href = self._getPathname(origin_href);
          if (h === '') {
            return false
          }

          if (origin_href === h) {
            self.navclick(n, h);
            _hasNav = true
            return false;
          }
        });

        //触发无导航状态
        if (!_hasNav || h === '') {
          self._setNoSelectedNav();
          return;
        }

        this.isNavClick = false;

        //顶部菜单的选中状态
        // var flag = true
        // $('.nav a').removeClass('on')
        // $('.nav a').each(function(i, item) {
        //   item = $(item)
        //   if (item.attr('href') === h) {
        //     item.addClass('on')
        //       // flag = false
        //     return false
        //   }
        // })
      },

      //触发无选中导航状态
      _setNoSelectedNav: function() {
        var self = this
          // self.__isNoMenuAnim = true
        this.sidebar.find('.sidebar').find('a').removeClass('on');
        this.nav.find('a').removeClass('on')

        this._collapseNav(null, function() {
          // self.__isNoMenuAnim = false
        });
      },

      //主导航的点击切换
      navclick: function(t, h, isRecover, isTopNavClick) {
        var self = this;
        h = h || this._getPathname(location.hash);
        // h = h || (location.hash);
        var isMainNav = false; //是否主菜单点击
        var _href;


        if (isTopNavClick) {
          this.nav.find('a').each(function(i, item) {
            item = $(item)
            _href = item.attr('href');
            _href = _href.slice(_href.indexOf('#'));
            _href = self._getPathname(_href);
            if (_href === h) {
              isMainNav = true;
              t = item
            }
          });
        } else {
          var _isSubNav = false
          var subNavA = this.subNav.find('a')

          subNavA = subNavA.filter(function(i, item) {
            var cst = $(item).closest('[data-notmenu]')
            if (!cst || cst.length === 0) {
              return item
            }
          })

          subNavA.each(function(i, item) {
            item = $(item)
            _href = item.attr('href');
            _href = _href.slice(_href.indexOf('#'));
            _href = self._getPathname(_href);
            if (_href === h) {
              _isSubNav = true;
              t = item
              return false
            }
          })

          if (!_isSubNav) {
            this.nav.find('a').each(function(i, item) {
              item = $(item)
              _href = item.attr('href');
              _href = _href.slice(_href.indexOf('#'));
              _href = self._getPathname(_href);
              if (_href === h) {
                isMainNav = true;
                t = item
              }
            });
          }
        }


        // if (isRecover) {
        //     isMainNav = false;
        // }
        if (isMainNav) {
          self._expandCollapseNav(t);
        } else {
          var p_sub = t.parents('[data-sub]');
          if (!p_sub) return;
          var _t = this.nav.find('[data-sub=' + p_sub.attr('data-sub') + ']');
          self._expandCollapseNav(_t);

          var __subNav = self.subNav.find('a').filter(function(i, item) {
            var cst = $(item).closest('[data-notmenu]')
            if (!cst || cst.length === 0) {
              return item
            }
          })

          __subNav.removeClass('on');

          // if (isRecover) {
          // self.subNav.all('a[href="#!/board/list/board.archivestatus=1"]').addClass('on');
          // } else {
          __subNav.each(function(i, item) {
            item = $(item)
            if (self._getPathname(item.attr('href').replace(/^.*?#/g, '#')) === h) {
              item.addClass('on');
              return false;
            }
          });
          // }
        }

        self.isHandleClick = false;
        self.nowNav = t;
        self.isNavClick = true;
        // S.all(window).scrollTop(0);
      },

      //sidebar 的 fixed与static切换
      _fixedStatic: function(attribute) {
        var self = this;
        var st = $(document).scrollTop(); //兼容ie
        var isFixed = st > self.navTop; //滚动超过nav的offset top值时，变为fixed
        if (isFixed) {
          self.sidebar.find('.sidebar').addClass('sidebar-fixed');

          //ie6处理fixed效果
          // if (S.UA.ie === 6) {
          //   self.sidebar.css({
          //     position: 'absolute',
          //     top: st + 10
          //   });
          // }
        } else {
          self.sidebar.find('.sidebar').removeClass('sidebar-fixed');
          //ie6处理fixed效果
          // if (S.UA.ie === 6) {
          //   self.sidebar.css({
          //     position: 'static'
          //   });
          // }
        }
      },

      //延迟器
      _timer: function(fn, t) {
        clearTimeout(this.itv);
        this.itv = setTimeout(fn, t);
      },

      //设置子菜单选中状态
      _setSubNavOn: function(node) {

        //导航的选中状态
        this.subNav.find('a, .icon-font').removeClass('on');

        if (!node) {
          return
        }
        var thirdNav = node.closest('.sub-nav-third');

        // this.subNavView.all('a, .icon-font').removeClass('on');
        node.addClass('on');

        //子导航收缩时icon高亮
        if (this.isFullSubNav === '0' && thirdNav) {
          thirdNav.prev().addClass('on');
        }
      },

      //传入当前的导航a节点，处理导航点击引起的子导航切换
      _expandCollapseNav: function(node) {
        var self = this;
        var dataSub = node.attr('data-sub'); //是否有子菜单
        var h = node.attr('href');
        var t;

        //ie 6, 7 在innerHTML的时候会自动 把 a的href全路径补全
        h = h.slice(h.indexOf('#'));

        //子导航的打开关闭
        if (dataSub) {
          // self.__isNoMenuAnim = false
          var __currentNav = self.currentNav
          if (self.currentNav) self.currentNav.hide(); //前一个子导航关闭
          self.currentNav = self.subNav.find('[data-sub="' + dataSub + '"]'); //找到主导航对应的子菜单
          //主导航对应的子菜单的某项选中，根据href匹配
          //var h = 'a[href="' + href + '"]';
          //h = h.replace(/([\!\/])/g, '\\$1');
          self.currentNav.find('a').each(function(i, n) {
            n = $(n)
            var href = n.attr('href');
            if (href.slice(href.indexOf('#')) === h) {
              t = n;
              return false;
            }
          });
          //t = self.currentNav.one(h);
          // if (!t) return;
          self.currentSubNav = t;
          self._setSubNavOn(t);
          if (self.sidebar.find('.sidebar .side-hold span').hasClass('on') || __currentNav.html() === self.currentNav.html()) {
            self.currentNav.show();
          }


          self._expandNav();
        } else {
          self._collapseNav();
        }

        //导航的选中状态
        self.nav.find('a').removeClass('on');
        node.addClass('on');
      },

      //收缩导航按钮的切换
      _switchTrigger: function() {
        if (this.isFullSubNav === '1') {
          this.subNavHandle.removeClass('icon-collapse').addClass('.icon-expand');
        } else if (this.isFullSubNav === '0') {
          this.subNavHandle.removeClass('icon-expand').addClass('.icon-collapse');
        }
      },

      //子导航的扩展收缩
      _expandCollapseSubNav: function() {
        var self = this;
        var curSubNav = self.currentSubNav;
        var closestUl = curSubNav && (curSubNav.prop('nodeName') === 'LI' ? //无奈之举
          curSubNav.find('ul') : curSubNav.closest('ul'));
        var isThirdNavSelected = closestUl && closestUl.hasClass('sub-nav-third');

        //是否mini模式的菜单切换

        function animCallBack() {
          var isF = (this.isFullSubNav === '1');
          this.isFullSubNav = isF ? '0' : '1';
          // if (this.localStorage) {
          //   this.localStorage.isFullSubNav = isF ? '0' : '1';
          // }
        }

        //菜单扩展
        if (self.isFullSubNav === '0') {
          animCallBack.call(self); //菜单扩张时直接设置isFullSubNav
          self._expandSubNav();
          self._switchTrigger();

          if (isThirdNavSelected && closestUl.prev()) {
            closestUl.prev().removeClass('on');
          }

          //隐藏icon，显示按钮
          $('.menu-icon').hide()
          $('.menu-btn').show()

        }

        //菜单收缩
        else if (self.isFullSubNav === '1') {
          self._collapseSubNav(function() {
            animCallBack.call(self); //菜单收缩时在动画结束时设置isFullSubNav
            self._switchTrigger();
          });

          if (isThirdNavSelected && closestUl.prev()) {
            closestUl.prev().addClass('on');
          }

          //显示icon, 隐藏按钮
          $('.menu-icon').show()
          $('.menu-btn').hide()
        }

      },

      //子菜单收缩
      _collapseSubNav: function(cb) {
        var self = this
        this.subNav.animate({
          'width': '40px'
            // 'padding-top': '42px'
        }, this.duration, EASING, cb);

        /**
         *main width setting
         */

        this.main.animate({
          'marginLeft': '40px'
        }, this.duration, EASING, function() {
          self.currentNav.hide()
        });

        //
        this._collapseThirdNav();
      },

      //子菜单打开
      _expandSubNav: function(cb) {
        var self = this
        this.subNav.animate({
          'width': '200px'
            // 'padding-top': '0px'
        }, this.duration, EASING, cb);

        /**
         *main width setting
         */

        self.currentNav.show()
        this.main.animate({
          'marginLeft': '200px'
        }, this.duration, EASING, function() {

        }); //main动画太快会导致main的maring-left太多引起抖动，故减少些
        //
        this._expandThirdNav();
        // this.subNavView.css('left', '-10000px');
      },

      //打开三级菜单
      _expandThirdNav: function(cb) {

        var self = this;

        if (!self.nowNav) return;

        var _dataSub = self.nowNav.attr('data-sub');
        if (!_dataSub || _dataSub === self.currentNav.attr('data-sub') && !self.isHandleClick) {
          self.sidebar.find('.sidebar').find('.sub-nav-third').css('height', 'auto');
        } else {
          //直接slideToggle在chrome下有问题，故换成animate
          self.sidebar.find('.sidebar').find('.sub-nav-third').each(function(i, n) {
            n = $(n)
            var h = n.css('height', 'auto').height();
            n.css('height', 0);
            n.animate({
              'height': h
            }, self.duration, EASING, cb);
          });
        }
      },

      //关闭三级菜单
      _collapseThirdNav: function(cb) {
        var self = this
          //直接slideToggle在chrome下有问题，故换成animate
        self.sidebar.find('.sidebar').find('.sub-nav-third').animate({
          'height': 0
        }, this.duration, EASING, cb);
      },

      //主导航切换控制的侧栏菜单打开
      _expandNav: function(dataSub, cb) {
        if (this.isFullSubNav !== '1') {
          this.currentNav.hide()
        }

        this.subNav.show();
        this.subNav.animate({
          "width": this.isFullSubNav === '1' ? '200px' : '40px'
            // "padding-top": this.isFullSubNav === '1' ? '0' : '42px'
        }, this.duration, EASING, cb);

        this.subNavWrap.animate({
          "marginLeft": '0'
        }, this.duration, EASING, cb);


        /**
         *main width setting
         */

        this.main.animate({
          'marginLeft': this.isFullSubNav === '1' ? '200px' : '40px'
        }, this.duration, EASING);

        //菜单有三级菜单时的动画，禁用了
        if (this.isFullSubNav === '1') {
          this._expandThirdNav();
        } else {
          this._collapseThirdNav();
        }

      },

      //主导航切换控制的侧栏菜单收缩
      _collapseNav: function(dataSub, cb) {
        var self = this;


        this.subNav.animate({
          "width": '1px'
        }, this.duration, EASING, function() {
          self.subNav.hide();
        });

        this.subNavWrap.animate({
          "marginLeft": this.isFullSubNav === '1' ? '-200px' : '-40px'
        }, this.duration, EASING, cb);

        /**
         *main width setting
         */
        this.main.animate({
          'marginLeft': '0'
        }, this.duration, EASING);
      }
    })



    return Sidenav
      // return Brix.extend()
  }
)