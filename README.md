



# 一、项目介绍

基于vue-admin-template为模板，开发的vue版本的高德地图JSAPI2.0。编写原因是因为我曾经开发时遇到很多的问题，还有就是开发时遇到的一些坑（当时使用的是百度地图，后期也用到高德地图）。因此，利用工作之余的时间写了一个vue版本的高德地图示例中心，由于本人是一名Java开发，前端水平有限，写的不好的地方，还望各位前端大佬口下留情。

项目参考高德地图JSAPI2.0示例中心开发，示例地址：[https://lbs.amap.com/demo/list/jsapi-v2](https://lbs.amap.com/demo/list/jsapi-v2)，如有侵权，请联系邮箱：538832@qq.com删除。

高德地图官网参考手册：[https://lbs.amap.com/api/jsapi-v2/documentation](https://lbs.amap.com/api/jsapi-v2/documentation)

# 二、vue-admin-template使用介绍

> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](http://panjiachen.github.io/vue-admin-template)

[国内访问](https://panjiachen.gitee.io/vue-admin-template)

目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0)，它不依赖 `vue-cli`。

## 2.1、Extra

如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

## 2.2、相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板,专门针对本项目的文章,算作是一篇文档)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)

## 2.3、Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 2.4、发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 2.5、其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

# 三、vue-amap使用就能介绍

## 3.1、  注册成为开发者

1、注册地址：[https://lbs.amap.com/dev/id/choose](https://lbs.amap.com/dev/id/choose)

2、选择开发者类型

- 个人开发者
- 企业开发者

3、完善开发者信息

## 3.2、进入控制台

1、控制台地址：[https://console.amap.com/dev/index](https://console.amap.com/dev/index)

2、选择应用管理--我的应用

3、创建新应用，输入应用名称选择应用类型

4、添加key，输入key名称，服务平台选择Web端(JS API）

## 3.3、在项目中使用

1、找到public/index.html文件，替换为自己的key

2、如果有用到自定义地图

- 自定义地图模板地址：[https://lbs.amap.com/dev/mapstyle/index](https://lbs.amap.com/dev/mapstyle/index)
- 自定义地图分为两种
  - 使用官方地图样式
  - 创建和使用自定义地图
  - 设置地图的显示内容

## 3.4、使用官方地图样式

设置地图样式的方式有两种：

- 在地图初始化时设置：

  [JavaScript](javascript:void(0);)

  ```javascript
  var map = new AMap.Map('container',{
      mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
  });
  ```

- 地图创建之后使用Map对象的setMapStyle方法来修改：

  [JavaScript](javascript:void(0);)

  ```javascript
  var map = new AMap.Map('container',{
      zoom: 10, //设置地图的缩放级别
  });
  map.setMapStyle('amap://styles/whitesmoke');
  ```

## 3.5、使用自定义地图

首先，[注册 ](https://lbs.amap.com/dev/id)成为高德地图开放平台的开发者。然后，在 [自定义地图平台](https://lbs.amap.com/dev/mapstyle/index) 进行创建、编辑、发布后，取得 **地图样式ID**。

设置自定义地图的方式有两种：

- 地图初始化时，设置自定义地图：

  [JavaScript](javascript:void(0);)

  ```javascript
  var map = new AMap.Map('container',{
      mapStyle: 'amap://styles/地图样式ID', //设置地图的显示样式
  });
  ```

- 地图创建之后使用`Map`对象的`setMapStyle`方法进行地图样式的变更：

  [JavaScript](javascript:void(0);)

  ```java
  var map = new AMap.Map('container',{
      zoom: 10, //设置地图的缩放级别
  });
  map.setMapStyle('amap://styles/地图样式ID');
  ```

## 3.6、设置地图的显示内容

通过`setFeatures`方法设置显示部分底图元素：

[JavaScript](javascript:void(0);)

```
map.setFeatures("road");  // 单一种类要素显示
map.setFeatures(['road','point']); // 多个种类要素显示
```

目前支持以下四种地图要素的选择性显示：

| **名称** | **说明**       |
| :------- | :------------- |
| bg       | 区域面         |
| point    | 兴趣点         |
| road     | 道路及道路标注 |
| building | 建筑物         |