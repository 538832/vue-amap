<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          领取阿里云通用云产品1888优惠券
          <br/>
          <el-link
            href="https://www.aliyun.com/minisite/goods?userCode=r85k1yor"
            type="primary"
            target="_blank">
            https://www.aliyun.com/minisite/goods?userCode=brki8iof
          </el-link>
          <br/>
          新人福利会场
          <el-link href="https://www.aliyun.com/1111/new?userCode=r85k1yor" type="primary" target="_blank">
            ☛☛点我进入☚☚
          </el-link>
          <br/>
          <h4 class="text-danger">
            云产品通用红包，可叠加官网常规优惠使用。(仅限新用户)
          </h4>
        </blockquote>

        <hr/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>vue-amap</h2>
        <div class="info">
          基于vue-admin-template为模板，开发的vue版本的高德地图JSAPI2.0。编写原因是因为我曾经开发时遇到很多的问题，还有就是开发时遇到的一些坑（当时使用的是百度地图，后期也用到高德地图）。因此，利用工作之余的时间写了一个vue版本的高德地图示例中心，由于本人是一名Java开发，前端水平有限，写的不好的地方，还望各位前端大佬口下留情。
        </div>
        <div class="info">
          高德地图JSAPI2.0示例中心开发，示例地址：
          <el-link href="https://lbs.amap.com/demo/list/jsapi-v2" type="primary" target="_blank">
            https://lbs.amap.com/demo/list/jsapi-v2
          </el-link>
        </div>
        <div class="info">
          高德地图官网参考手册：
          <el-link href="https://lbs.amap.com/demo/list/jsapi-v2" type="primary" target="_blank">
            https://lbs.amap.com/api/jsapi-v2/documentation
          </el-link>
        </div>
        <div class="info">
          <el-tag type="danger">&yen;免费开源</el-tag>&nbsp;&nbsp;&nbsp;
          <el-tag type="warning">如有侵权，请联系邮箱：538832@qq.com删除</el-tag>
        </div>
        <div class="info">
          <el-button type="primary" size="mini" icon="el-icon-cloudy" plain
                     @click="goTarget('https://gitee.com/java5219/vue-amap.git')">
            访问码云
          </el-button>
          <el-button size="mini" icon="el-icon-s-home" plain @click="goTarget('https://amap.java521.com')">
            访问主页
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider/>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>联系信息</span>
          </div>
          <div class="body">
            <div class="info">
              <i class="el-icon-s-promotion"></i> 官网：
              <el-link href="https://amap.java521.com/" target="_blank">
                https://amap.java521.com/
              </el-link>
            </div>
            <div class="info">
              <i class="el-icon-s-comment"></i> 邮箱： <a href="javascript:;">5388832@qq.com</a>
            </div>
            <div class="info">
              <i class="el-icon-s-custom"></i> Q Q ：<a href="javascript:;">538832</a>
            </div>
            <div class="info">
              <i class="el-icon-chat-dot-round"></i> 微信：<a href="javascript:;">javautil</a>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="16">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>捐赠支持</span>
          </div>
          <div class="body" style="text-align: center">
            <el-image :src="wx" style="width: 324px;height: 360px;display: inline-block;margin-right: 50px" fit="contain"></el-image>
            <el-image :src="zfb" style="width: 324px;height: 360px;display: inline-block" fit="contain"></el-image>
            <span style="display: block; height: 30px; margin-top: 20px;">你可以请作者喝杯咖啡表示鼓励</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        // 版本号
        version: "3.5.0",
        wx: require("@/assets/my/wx.jpg"),
        zfb: require("@/assets/my/zfb.jpg")
      };
    },
    methods: {
      goTarget(href) {
        window.open(href, "_blank");
      },
    },
  };
</script>

<style scoped lang="scss">
  .info {
    margin: 10px;
  }

  .home {
    blockquote {
      padding: 10px 20px;
      margin: 0 0 20px;
      font-size: 17.5px;
      border-left: 5px solid #eee;
    }

    hr {
      margin-top: 20px;
      margin-bottom: 20px;
      border: 0;
      border-top: 1px solid #eee;
    }

    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: #676a6c;
    overflow-x: hidden;

    h2 {
      margin-top: 10px;
      font-size: 26px;
      font-weight: 100;
    }
  }
</style>

