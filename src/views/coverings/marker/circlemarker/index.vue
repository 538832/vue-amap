<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  import {capitals} from '@/utils/amap/capitals'

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
        let map = new AMap.Map('container', {
          // viewMode: '3D',
          zoom: 4,
          center: [108, 34]
        });
        for (let i = 0; i < capitals.length; i += 1) {
          let center = capitals[i].center;
          let circleMarker = new AMap.CircleMarker({
            center: center,
            radius: 10 + Math.random() * 10,//3D视图下，CircleMarker半径不要超过64px
            strokeColor: 'white',
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: 'rgba(0,0,255,1)',
            fillOpacity: 0.5,
            zIndex: 10,
            bubble: true,
            cursor: 'pointer',
            clickable: true
          })
          circleMarker.setMap(map)
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

</style>
