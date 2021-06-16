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
        let imageLayer = new AMap.ImageLayer({
          url: 'https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg',
          bounds: new AMap.Bounds(
            [116.327911, 39.939229],
            [116.342659, 39.946275]
          ),
          zooms: [15, 20]
        });
        let map = new AMap.Map('container', {
          center: [116.33719, 39.942384],
          zoom: 15,
          layers: [
            AMap.createDefaultLayer(),
            imageLayer,
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
</style>
