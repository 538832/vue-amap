<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container">
      <json-viewer :value="result" copyable theme="my-awesome-json-theme"></json-viewer>
    </div>
  </div>
</template>

<script>
  import JsonViewer from 'vue-json-viewer'
  export default {
    name: "index",
    // 注册组件
    components: {
      JsonViewer
    },
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        result: {}
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
        let env = {
          '是否移动设备': AMap.Browser.mobile,
          '是否触摸设备': AMap.Browser.touch,
          '是否高清屏': AMap.Browser.retina,
          '是否安卓设备': AMap.Browser.android,
          '是否 iOS 设备': AMap.Browser.ios,
          '是否 Windows 系统': AMap.Browser.windows,
          '是否 iMac 系统': AMap.Browser.mac,
          '是否 IE678': AMap.Browser.ielt9,
          '是否支持 Canvas': AMap.Browser.isCanvas,
          '是否支持 WebGL': AMap.Browser.isWebGL,
          '是否支持 SVG': AMap.Browser.isSvg,
          '是否支持 WebWorker': AMap.Browser.isWorker,
          '是否支持 WebSocket': AMap.Browser.isWebsocket,
          'User-Agent': AMap.Browser.ua,
          '其他': '还有很多有用字段'
        }
        this.result = env;
      }
    }
  }
</script>

<style scoped>
  .app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
