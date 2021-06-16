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
        map: null
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
        // 高德栅格路网
        let road = new AMap.TileLayer({
          'getTileUrl': function (x, y, z) {
            return 'https://wprd01.is.autonavi.com/appmaptile?x=' + x + '&y=' + y + '&z=' + z + '&size=1&scl=1&style=8&ltype=11';
          },
          'zooms': [6, 20],
          'zIndex': 10
        });

        let map = new AMap.Map('container', {
          layers: [
            new AMap.TileLayer.Satellite(),
            road,
          ]
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

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 0;
    width: 140px;
    height: 200px;
    left: 30px;
    bottom: 80px;
  }
</style>
