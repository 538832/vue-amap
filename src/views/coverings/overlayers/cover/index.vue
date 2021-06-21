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
          resizeEnable: true,
          zoom: 8,
          center: [116.44923, 40.207714],
          layers: [
            new AMap.TileLayer.RoadNet({
              zIndex: 20
            }),
            new AMap.TileLayer({
              zIndex: 6,
              opacity: 1,
              getTileUrl: 'https://t{1,2,3,4}.tianditu.gov.cn/DataServer?T=ter_w&x=[x]&y=[y]&l=[z]'
            })]
        });
        new AMap.DistrictSearch({
          extensions: 'all',
          subdistrict: 0
        }).search('北京市', function (status, result) {
          // 外多边形坐标数组和内多边形坐标数组
          let outer = [
            new AMap.LngLat(-360, 90, true),
            new AMap.LngLat(-360, -90, true),
            new AMap.LngLat(360, -90, true),
            new AMap.LngLat(360, 90, true),
          ];
          let holes = result.districtList[0].boundaries

          let pathArray = [
            outer
          ];
          pathArray.push.apply(pathArray, holes)
          let polygon = new AMap.Polygon({
            pathL: pathArray,
            strokeColor: '#00eeff',
            strokeWeight: 1,
            fillColor: '#71B3ff',
            fillOpacity: 0.5
          });
          polygon.setPath(pathArray);
          map.add(polygon)
        })
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
