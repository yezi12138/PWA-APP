# vue 示例项目 · 仿豆瓣


## 目录
#### &sect; [技术栈](#features)
#### &sect; [快速开始](#getting-started)
  * [安装](#installation)
  * [启动](#start)

#### &sect; [功能](#feature)
#### &sect; [待完善功能](#waitComeTrue)
#### &sect; [截图](#pic)

****

## <a name="features">&sect; 技术栈</a>
> 详情可参阅 `package.json`

* vue
* vuex (处理组件交互)
* vue-router (提供路由功能)
* axios（提供ajax ...）
* Webpack
* ES6 + Babel
* iview (基于vue的UI框架)
* express (用于后台接口编写)
* mongoose (一个小型的数据库)
* connect-mongo (在session中保存mongo信息)
* banner-swiper (我自己写的一个关于vue的轮播图)
* sass

***

## <a name="getting-started">&sect; 快速开始</a>


### <a name="installation">⊙ 安装</a>
> 推荐升级到 node 8+ 环境，**强烈推荐**使用 [`cnpm`](https://github.com/cnpm/cnpm) 安装依赖或手动   
> 切换到淘宝 npm 源：`npm set registry https://registry.npm.taobao.org/`  

### ⊙ 下载
在git界面：
> git clone git@github.com:yezi12138/douban.git

或者直接下载： [https://github.com/yezi12138/douban][1]

### <a name="start">⊙ 启动</a>
1. 本项目依赖mongodb，请先行安装mongodb 教程：[mongodb安装和使用][2]
先打开命令窗口下，敲下 `mongod –dbpath=D:\data\db`  (按照你设置的路径启动mongodb)
2. 然后在项目的根目录下进入cmd，敲下 `npm install` 安装依赖 (如果安装失败就用cnpm 敲下 `cnpm install`)
3. 最后 敲下 `npm start` 项目正式启动

### <a name="feature">⊙ 功能</a>
1. search 搜索（电影，图书，音乐）功能
2. 主页今日精选的展示
3. 广告轮播图展示
4. 电影，读书的内容展示
5. 详情页的展示
6. 上传头像功能
7. 登陆注册功能

### <a name="waitComeTrue">⊙ 待完善功能</a>
1. 评论区页面
2. 音乐界面
3. 搜索组件和提示功能
4.  // 。。慢慢我再完善

### <a name="pic">⊙ 截图</a>
![此处输入图片的描述][3] ![此处输入图片的描述][4] ![此处输入图片的描述][5] ![此处输入图片的描述][6]
![此处输入图片的描述][7] 

***


  [1]: http://wx1.sinaimg.cn/mw690/a359ab18gy1fidmedz5ryj20890eodhz.jpg
  [2]: http://wx1.sinaimg.cn/mw690/a359ab18gy1fidmedz5ryj20890eodhz.jpg
  [3]: http://wx1.sinaimg.cn/mw690/a359ab18gy1fidmedz5ryj20890eodhz.jpg
  [4]: http://wx1.sinaimg.cn/mw690/a359ab18gy1fidmee3fosj208a0eodjy.jpg
  [5]: http://wx4.sinaimg.cn/mw690/a359ab18gy1fidmee92v0j20880eoq5v.jpg
  [6]: http://wx3.sinaimg.cn/mw690/a359ab18gy1fidmee3vmqj20870eogm6.jpg
  [7]: http://wx1.sinaimg.cn/mw690/a359ab18gy1fidmee56v8j208b0em3z4.jpg