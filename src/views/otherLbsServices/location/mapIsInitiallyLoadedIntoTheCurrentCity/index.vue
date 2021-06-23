<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      在初始化地图时，如果center属性缺省，地图默认定位到用户所在城市的中心
      <hr>
      <div v-html="message"></div>
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
        map: null,
        message: null
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
        let that = this;
        let map = new AMap.Map('container', {
          zoom: 11,
        });

        /**
         * TODO：API中没有getAdcode()方法，用下面的方法可实现
         * API地址：https://lbs.amap.com/api/jsapi-v2/documentation#map
         * 示例地址：https://lbs.amap.com/demo/jsapi-v2/example/location/map-is-initially-loaded-into-the-current-city
         * 日期：2021/6/23
         */
          //console.log(map.getAdcode())

        let center = map.getCenter();
        let citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              let adCode = result.adcode
              that.message = '当前城市adcode：' + adCode + '<br>' + '当前中心点：' + center;
            }
          } else {
            that.message = result.info;
          }
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

  .info {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 30px;
    right: 30px;
    padding: 20px;
    width: 300px;
  }
</style>
