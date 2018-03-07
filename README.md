# vue+pwa项目


## 目录
#### &sect; [技术栈](#features)
#### &sect; [快速开始](#getting-started)
  * [安装](#installation)
  * [启动](#start)

#### &sect; [功能](#feature)

****

## <a name="features">&sect; 技术栈</a>
> 详情可参阅 `package.json`

* vue
* vuex (处理组件交互)
* vue-router (提供路由功能)
* axios（提供ajax ...）
* Webpack
* ES6 + Babel
* vux (基于vue的UI框架)
* express (用于后台接口编写)
* mongoose (一个小型的数据库)
* socket
* sass
* PWA (渐进式应用)

***

## <a name="getting-started">&sect; 快速开始</a>


### <a name="installation">⊙ 安装</a>
> 推荐升级到 node 8+ 环境，**强烈推荐**使用 [`cnpm`](https://github.com/cnpm/cnpm) 安装依赖或手动   
> 切换到淘宝 npm 源：`npm set registry https://registry.npm.taobao.org/`  

### ⊙ 下载
在git界面：
> git clone git@github.com:yezi12138/PWA-APP.git

或者直接下载： [https://github.com/yezi12138/PWA-APP.git][1]

### <a name="start">⊙ 启动</a>
1. 本项目依赖mongodb，请先行安装mongodb 教程：[mongodb安装和使用][2]
先打开命令窗口下，敲下 `mongod –dbpath=D:\data\db`  (按照你设置的路径启动mongodb)
2. 然后在项目的根目录下进入cmd，敲下 `npm install` 安装依赖 (如果安装失败就用cnpm 敲下 `cnpm install`)
3. `npm run build` 之后 敲入 `npm run fix` 得到项目包
4. 最后 敲下 `npm server` 项目正式启动

### <a name="feature">⊙ 功能</a>
#### 一. 主页

功能： 
> 1. 商品展示
> 2. 下滑加载（支持自定义上拉动画）
> 3. 上拉加载（未开启，可在框架添加参数开启）
> 4. 索搜商品（未支持）
> 5. 返回顶部按钮
> 6. 侧边栏上传头像功能

截图：

![home](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/home.gif)


#### 二. 购物车

功能： 
> 1. 商品展示
> 2. 购物车编辑模式
> 3. 删除购物车商品
> 4. 购买购物车商品（支持批量购买）
> 5. 添加商品到购物车


截图：

![shopcart1](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/shopcart1.gif)
![shopcart2](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/shopcart2.gif)


#### 三. 我的商品

功能： 
> 1. 商品展示
> 2. 订单界面
> 3. 购买商品
> 4. 我的商品页面


截图：

![myGood](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/myGood.gif)
![buy](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/buy.gif)



#### 四. 登录限制

功能： 
> 1. 统一设定登录限制界面
> 2. 登录后页面跳转回登录前界面
> 3. 账号登录限制（不允许同时登录同一个账号）


截图：

![login1](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/login1.gif)
![login2](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/login2.gif)


#### 伍. PWA用户体验（需手机使用谷歌浏览器链接电脑测试）


> 1. 离线使用
> 2. 缓存
> 3. 消息通知
> 4. 添加桌面

#### 六. 其他功能


> 1. 页面切换动画
> 2. 消息推送
> 3. 免登录验证


