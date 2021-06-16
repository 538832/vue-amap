<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
   //import * as GLTFLoader from '@/utils/amap/GLTFLoader.117.min.js'
   //import * as THREE from '@/utils/amap/three.117'

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
          resizeEnable: true,
          viewMode: '3D',
          center: [121.502325,31.238165],
          pitch: 90,
          rotation: -50,
          zoom: 16,
          mapStyle: 'amap://styles/darkblue', // 加载自定义样式
          features: ['bg', 'road']
        });

        // 创建 3DTilesLayer
        // TODO: 错误信息：THREE is not defined 暂时没有解决思路，后期解决
        /*let tiles = new AMap['3DTilesLayer']({
          map: map,
          url: 'https://a.amap.com/jsapi_demos/static/data3d/single.json', // 3d Tiles 入口文件
          style: {
            light: {
              color: 'rgb(44,59,75)', // 设置光照颜色
              intensity: 2, // 设置光照强度
            }
          }
        });*/
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
