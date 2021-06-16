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
        meshes: []
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
        let map = new AMap.Map('container', {
          zoom: 14,
          zooms: [3, 20],
        });

        //该demo可模拟水印效果
        let layer = new AMap.TileLayer.Flexible({
          cacheSize: 30,
          opacity: 0.3,
          createTile: function (x, y, z, success, fail) {
            if ((x + y) % 3) {
              fail();
              return;
            }

            let img = document.createElement('img');
            img.onload = function () {
              success(img)
            };
            img.crossOrigin = "anonymous";// 必须添加，同时图片要有跨域头
            img.onerror = function () {
              fail()
            };

            //图片地址
            //img.src = 'https://a.amap.com/jsapi_demos/static/images/amap.png';
            //使用本地图片
            //使用本地图片
            img.src = require("@/assets/amap/mn1.jpg");
          }
        });

        map.addLayer(layer);
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
