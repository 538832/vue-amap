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
        text: null,
        polyline2: null,
        marker: null,
        marker2: null,
        path: null
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
        //初始化地图对象，加载地图
        var map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 10
        });
        var path = [
          [116.169465,39.932670],
          [116.160260,39.924492],
          [116.150625,39.710019],
          [116.183198,39.709920],
          [116.226950,39.777616],
          [116.442621,39.799892],
          [116.463478,39.790066],
          [116.588276,39.809551],
          [116.536091,39.808859],
          [116.573856,39.839643],
          [116.706380,39.916740],
          [116.600293,39.937770],
          [116.514805,39.982375],
          [116.499935,40.013710],
          [116.546520,40.030443],
          [116.687668,40.129961],
          [116.539697,40.080659],
          [116.503390,40.058474],
          [116.468800,40.052578]
        ];
        var polygon = new AMap.Polygon({
          map: map,
          fillOpacity:0.4,
          path: path
        });
        // 计算区域面积
        var area = Math.round(AMap.GeometryUtil.ringArea(path));
        var text = new AMap.Text({
          position: new AMap.LngLat(116.468800,40.052578),
          text: '区域面积' + area + '平方米',
          offset: new AMap.Pixel(-20, -20)
        })
        map.add(text);
        map.setFitView();
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
