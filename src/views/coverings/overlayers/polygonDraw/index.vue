<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  import {shanghai, suzhou, wuxi} from '@/utils/amap/shanghai.js'
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        bezierCurveEditor: null
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
        var map = new AMap.Map("container", {
          center: [121.045332, 31.19884],
          zoom: 8.8
        });

        function addPolygon(data) {
          let polygon = new AMap.Polygon({
            path: data,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
          });
          polygon.on('mouseover', () => {
            polygon.setOptions({
              fillOpacity: 0.7,
              fillColor: '#7bccc4'
            })
          })
          polygon.on('mouseout', () => {
            polygon.setOptions({
              fillOpacity: 0.5,
              fillColor: '#ccebc5'

            })
          })
          map.add(polygon);
        }
        addPolygon(shanghai);
        addPolygon(suzhou);
        addPolygon(wuxi);
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
</style>
