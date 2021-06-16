<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>移除覆盖物</h5>
      <el-button size="mini" round @click="removeOneOverlay">移除一个覆盖物</el-button>
      <el-button size="mini" round @click="removeSeveralOverlay">移除多个覆盖物</el-button>
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
        marker: null,
        polyline: null,
        polygon: null
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
        // 创建地图实例
        this.map = new AMap.Map('container', {
          zoom: 13,
          center: [116.43, 39.92],
          resizeEnable: true
        });

        // 创建点覆盖物
        this.marker = new AMap.Marker({
          position: new AMap.LngLat(116.39, 39.92),
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          offset: new AMap.Pixel(-13, -30)
        });

        let polylinePath = [
          new AMap.LngLat(116.41, 39.93),
          new AMap.LngLat(116.43, 39.91)
        ];

        // 创建线覆盖物
        this.polyline = new AMap.Polyline({
          path: polylinePath
        });

        let polygonPath = [
          new AMap.LngLat(116.46, 39.93),
          new AMap.LngLat(116.44, 39.91),
          new AMap.LngLat(116.49, 39.91)
        ];

        // 创建面覆盖物
        this.polygon = new AMap.Polygon({
          path: polygonPath
        });

        this.map.add([this.marker, this.polyline, this.polygon]);
      },

      //移除一个覆盖物
      removeOneOverlay() {
        this.map.remove(this.marker);
      },

      //移除多个覆盖物
      removeSeveralOverlay() {
        this.map.remove([this.polyline, this.polygon]);
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

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }
</style>
