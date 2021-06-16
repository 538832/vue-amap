<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
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
        trafficLayer: null,
        isVisible: true
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
          center: [116.397428, 39.90923],
          viewMode: '3D',
          pitch: 60,
          rotation: -35,
          // 隐藏默认楼块
          features: ['bg', 'road', 'point'],
          mapStyle: 'amap://styles/light',
          layers: [
            // 高德默认标准图层
            new AMap.TileLayer.Satellite(),
            // 楼块图层
            new AMap.Buildings({
              zooms: [16, 18],
              zIndex: 10,
              heightFactor: 2 //2倍于默认高度，3D下有效
            })
          ],
          zoom: 16.8
        });
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
</style>
