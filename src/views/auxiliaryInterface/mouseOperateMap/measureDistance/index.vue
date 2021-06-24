<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">

      <el-button round size="mini" @click="defaultStyle">默认样式测距</el-button>
      <el-button round size="mini" @click="customStyle">自定义样式测距</el-button>
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
        ruler1: null,
        ruler2: null
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
        //地图初始化
        let map = new AMap.Map('container');
        //默认样式
        this.ruler1 = new AMap.RangingTool(map);

        //自定义样式
        let startMarkerOptions = {
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31),//图标大小
            imageSize: new AMap.Size(19, 31),
            image: "//webapi.amap.com/theme/v1.3/markers/b/start.png"
          }),
          offset: new AMap.Pixel(-9, -31)
        };
        let endMarkerOptions = {
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31),//图标大小
            imageSize: new AMap.Size(19, 31),
            image: "//webapi.amap.com/theme/v1.3/markers/b/end.png"
          }),
          offset: new AMap.Pixel(-9, -31)
        };
        let midMarkerOptions = {
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31),//图标大小
            imageSize: new AMap.Size(19, 31),
            image: "//webapi.amap.com/theme/v1.3/markers/b/mid.png"
          }),
          offset: new AMap.Pixel(-9, -31)
        };
        let lineOptions = {
          strokeStyle: "solid",
          strokeColor: "#FF33FF",
          strokeOpacity: 1,
          strokeWeight: 2
        };
        let rulerOptions = {
          startMarkerOptions: startMarkerOptions,
          midMarkerOptions: midMarkerOptions,
          endMarkerOptions: endMarkerOptions,
          lineOptions: lineOptions
        };
        this.ruler2 = new AMap.RangingTool(map, rulerOptions);

      },

      //默认样式测距
      defaultStyle() {
        this.ruler2.turnOff();
        this.ruler1.turnOn();
      },

      //自定义样式测距
      customStyle() {
        this.ruler1.turnOff();
        this.ruler2.turnOn();
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }

  .input-card {
    position: absolute;
    bottom: 30px;
    right: 30px;
    padding: 10px;
  }
</style>
