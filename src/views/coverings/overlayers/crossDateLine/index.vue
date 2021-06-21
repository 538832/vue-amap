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
        ellipseEditor: null
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
          zoom: 3,
          center: [180, 40],
          viewMode: '3D',
        });
        let arr = []; //经纬度坐标数组
        arr.push(new AMap.LngLat("116.39", "39.9", true));
        arr.push(new AMap.LngLat("238.25", "37.48", true));

        let polyline = new AMap.Polyline({
          path: arr,
          geodesic: true,
          lineJoin: 'round',
          showDir: true,
          dirColor: 'white',
          strokeColor: '#29b6f6',
          outlineColor: 'white',
          isOutline: true,
          strokeWeight: 6.0
        });
        let circle = new AMap.Circle({
          center: arr[0],
          fillColor: '#81d4fa',
          strokeColor: 'white',
          radius: 100000//m
        })
        var circleMarker = new AMap.CircleMarker({
          center: arr[1],
          fillColor: '#80d8ff',
          strokeColor: 'white',
          radius: 20//px
        })

        let arr2 = []; //经纬度坐标数组
        arr2.push(new AMap.LngLat("126.39", "27.48", true));
        arr2.push(new AMap.LngLat("238.25", "27.48", true));
        arr2.push(new AMap.LngLat("228.25", "37.48", true));
        arr2.push(new AMap.LngLat("116.39", "37.48", true));

        let polygon = new AMap.Polygon({
          path: arr2,
          fillColor: '#0277bd',
          zIndex: 80,
          strokeColor: 'white',
        });
        map.add([polyline, polygon, circle, circleMarker])
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
