<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="info">
      <h4>当前地图状态（Status）</h4>
      <!--
          pre 元素可定义预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。
          <pre> 标签的一个常见应用就是用来表示计算机的源代码。
      -->
      <pre v-text="mapStatus"></pre>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        map: null,
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        //地图级别
        zoom: 11,
        //地图中心点
        center: {
          lng: 116.407387,
          lat: 39.904179
        },
        mapStatus: ''
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
        let that = this

        let map = new AMap.Map('container', {
          zoom: that.zoom, //初始地图级别
          center: [that.center.lng, that.center.lat], //初始地图中心点
        });

        //通过map.setStatus方法动态设置地图状态
        map.setStatus({
          dragEnable: true,
          keyboardEnable: true,
          doubleClickZoom: true,
          zoomEnable: true,
          rotateEnable: true
        });
        that.mapStatus = map.getStatus()
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

  #info {
    position: absolute;
    right: 30px;
    top: 30px;
    background: white;
    width: 300px;
    padding: 0 20px;
  }
</style>
