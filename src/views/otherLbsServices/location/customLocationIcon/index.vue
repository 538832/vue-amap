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
        status: '',
        result: ''
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
        let map = new AMap.Map('container', {
          resizeEnable: true
        });
        let options = {
          'showButton': true,//是否显示定位按钮
          'buttonPosition': 'LB',//定位按钮的位置
          /* LT LB RT RB */
          'buttonOffset': new AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
          'showMarker': true,//是否显示定位点
          'markerOptions': {//自定义定位点样式，同Marker的Options
            'offset': new AMap.Pixel(-18, -36),
            'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
          },
          'showCircle': true,//是否显示定位精度圈
          'circleOptions': {//定位精度圈的样式
            'strokeColor': '#0093FF',
            'noSelect': true,
            'strokeOpacity': 0.5,
            'strokeWeight': 1,
            'fillColor': '#02B0FF',
            'fillOpacity': 0.25
          }
        }

        //web定位不准确，属于正常现象
        let geolocation = new AMap.Geolocation(options);
        map.addControl(geolocation);
        geolocation.getCurrentPosition()
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
