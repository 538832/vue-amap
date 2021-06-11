<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="info">
      <h4>获取地图级别与中心点坐标</h4>
      <p>当前级别：<span id="map-zoom" v-text="zoom"></span></p>
      <p>当前中心点：<span id="map-center" v-text="center.lng + ',' + center.lat"></span></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        //地图级别
        zoom: 11,
        //地图中心点
        center: {
          lng: 116.407387,
          lat: 39.904179
        }
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
        let that = this
        //初始化地图
        let map = new AMap.Map('container', {
          zoom: 11, //初始地图级别
          center: [121.498586, 31.239637], //初始地图中心点
        });

        //绑定地图移动事件
        map.on('moveend', function () {
          that.zoom = map.getZoom();
          that.center.lng = map.getCenter().lng;
          that.center.lat = map.getCenter().lat;
        })

        //绑定地图缩放事件
        map.on('zoomend', function () {
          that.zoom = map.getZoom();
          that.center.lng = map.getCenter().lng;
          that.center.lat = map.getCenter().lat;
        })


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

  #info {
    position: absolute;
    right: 30px;
    top: 30px;
    background: white;
    width: 300px;
    padding: 0 20px;
  }

  #map-zoom, #map-center {
    color: #0288d1;
  }
</style>
