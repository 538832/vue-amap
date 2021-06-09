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
        map: null,
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
          this.windowHeight = document.documentElement.clientHeight - 50;
        })()
      };
      //调用地图初始化方法
      this.initAMap()
    },
    methods: {
      initAMap() {
        let that = this

        function isLoaded() {
          try {
            var map = new AMap.Map('container', {
              zoom: that.zoom, //初始地图级别
              center: [that.center.lng, that.center.lat], //初始地图中心点
            });
            that.map = map
            //绑定地图移动事件
            AMap.event.addListener(that.map, 'moveend', function () { //添加点击事件,传入对象名，事件名，回调函数
              that.zoom = that.map.getZoom();
              that.center.lng = that.map.getCenter().lng;
              that.center.lat = that.map.getCenter().lat;
            })

            //绑定地图缩放事件
            AMap.event.addListener(that.map, 'zoomend', function () { //添加点击事件,传入对象名，事件名，回调函数
              that.zoom = that.map.getZoom();
              that.center.lng = that.map.getCenter().lng;
              that.center.lat = that.map.getCenter().lat;
            })
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()



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
