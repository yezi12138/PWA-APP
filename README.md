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
3. 最后 敲下 `npm server` 项目正式启动

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
![gif](https://github.com/yezi12138/PWA-APP/blob/dev2/static/readmeImgs/GIF.gif)















2. 系统通知功能
3. PWA应用体验
4. 购物车展示
5. 购物车和我的商品联动
6. 我的商品展示
7. 上传头像功能
8. 登陆注册功能
9. 封装框架，支持移动端滑动，上拉下滑
10. 页面切换动画
