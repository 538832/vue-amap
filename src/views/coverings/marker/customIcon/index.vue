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
        let map = new AMap.Map('container', {
          zoom: 13,
          center: [116.4, 39.92],
          resizeEnable: true
        });


        // 以 icon URL 的形式创建一个途经点
        let viaMarker = new AMap.Marker({
          position: new AMap.LngLat(116.38, 39.92),
          // 将一张图片的地址设置为 icon
          //icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
          icon: new AMap.Icon({
            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
            size: new AMap.Size(25, 34),  //图标所处区域大小
            imageSize: new AMap.Size(25, 34)//图标大小
          }),
          // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-13, -30)
        });

        // 创建一个 Icon
        let startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 34),
          // 图标的取图地址
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
          // 图标所用图片大小
          imageSize: new AMap.Size(135, 40),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(-9, -3)
        });

        // 将 icon 传入 marker
        let startMarker = new AMap.Marker({
          position: new AMap.LngLat(116.35, 39.89),
          icon: startIcon,
          offset: new AMap.Pixel(-13, -30)
        });

        // 创建一个 icon
        let endIcon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
          imageSize: new AMap.Size(135, 40),
          imageOffset: new AMap.Pixel(-95, -3)
        });

        // 将 icon 传入 marker
        let endMarker = new AMap.Marker({
          position: new AMap.LngLat(116.45, 39.93),
          icon: endIcon,
          offset: new AMap.Pixel(-13, -30)
        });

        // 将 markers 添加到地图
        map.add([viaMarker, startMarker, endMarker]);
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
