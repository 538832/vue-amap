<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        mouseTool: null
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
          center: [107.943579, 30.131735],
          zoom: 7
        });
        axios.get('https://a.amap.com/jsapi_demos/static/geojson/chongqing.json').then(response => {
          let geojson = new AMap.GeoJSON({
            geoJSON: response.data,
            // 还可以自定义getMarker和getPolyline
            getPolygon: function (geojson, lnglats) {
              // 计算面积
              let area = AMap.GeometryUtil.ringArea(lnglats[0])

              return new AMap.Polygon({
                path: lnglats,
                fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
                strokeColor: 'white',
                fillColor: 'red'
              });
            }
          });
          map.add(geojson);
          this.$message({
            message: 'GeoJSON 数据加载完成',
            type: 'success'
          })
        }).catch(function (error) { // 请求失败处理
          this.$message.error('GeoJSON 服务请求失败');
        });
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
