<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <span v-text="message"></span>
    </div>
    <div class="input-item">
      <h5>信息窗体的打开与关闭</h5>
      <el-button size="mini" round @click="openInfo">打开信息窗体</el-button>
      <el-button size="mini" round @click="closeInfo">关闭信息窗体</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        message: '请打开或关闭信息窗体试试！',
        infoWindow: null
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight;
        })()
      };
      //调用地图初始化方法
      this.initAMap()
    },
    methods: {
      initAMap() {
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.473188, 39.993253],
          zoom: 13
        });
      },

      showInfoOpen() {
        this.message = '您打开了信息窗体！'
      },

      showInfoClose() {
        this.message = '您关闭了信息窗体！'
      },

      //在指定位置打开信息窗体
      openInfo() {
        //构建信息窗体中显示的内容
        let info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");
        this.infoWindow = new AMap.InfoWindow({
          content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        });
        this.infoWindow.on('open', this.showInfoOpen)
        this.infoWindow.on('close', this.showInfoClose)
        this.infoWindow.open(this.map, this.map.getCenter());
      },

      closeInfo() {
        //先判断 否则this.infoWindow可能为null
        if (this.infoWindow == null) {
          this.message = '信息窗体已经关闭了！'
        } else {
          this.infoWindow.close();
          this.message = '您关闭了信息窗体！'
        }
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative
  }

  #container {
    width: 100%;
    height: 100%;
  }

  .info {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    top: 30px;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }

</style>
