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
        markers: []
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
        // 创建地图实例
        let map = new AMap.Map('container', {
          zoom: 3,
          center: [180, 40],
          viewMode: '3D',
        });

        let arr = []; //经纬度坐标数组
        arr.push(new AMap.LngLat(116.39, 39.9, true));
        arr.push(new AMap.LngLat(238.25, 37.48, true));

        let polyline = new AMap.Polyline({
          path: arr,
          geodesic: true,
          lineJoin: 'round',
          showDir: true,
          dirColor: 'white',
          strokeColor: '#29b6f6',
          outlineColor: 'white',
          isOutline: true,
          strokeWeight: 6.0,
          zIndex: 2
        });

        let marker1 = new AMap.Marker({
          position: arr[0],
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          offset: new AMap.Pixel(-13, -30)
        });

        let marker2 = new AMap.Marker({
          position: arr[1],
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
          offset: new AMap.Pixel(-13, -30)
        });

        arr = []; //经纬度坐标数组
        arr.push(new AMap.LngLat(116.39, 27.48, true));
        arr.push(new AMap.LngLat(238.25, 27.48, true));
        arr.push(new AMap.LngLat(228.25, 37.48, true));
        arr.push(new AMap.LngLat(126.39, 37.48, true));

        let polygon = new AMap.Polygon({
          path: arr,
          fillColor: '#0277bd',
          zIndex: 80,
          strokeColor: 'white',
        });

        let primeMeridianArr = [];

        primeMeridianArr.push(new AMap.LngLat(180, 90, true));
        primeMeridianArr.push(new AMap.LngLat(180, -90, true));

        // 东经 180 度分割线
        let primeMeridian = new AMap.Polyline({
          path: primeMeridianArr,
          geodesic: true,
          lineJoin: 'round',
          strokeColor: 'red',
          strokeWeight: 1.0,
          zIndex: 1
        });

        map.add([primeMeridian, polyline, polygon, marker1, marker2])
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
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }
</style>
