<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>删除指定点</h5>
      <el-button size="mini" round @click="clearMarker">从多个点中删除指定点</el-button>
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
        let that = this;
        that.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13
        });

        var positions = [[116.405467, 39.907761], [116.415467, 39.907761], [116.415467, 39.917761], [116.425467, 39.907761],
          [116.385467, 39.907761]];

        for (var i = 0, marker; i < positions.length; i++) {
          marker = new AMap.Marker({
            map: that.map,
            position: positions[i],
            //icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            icon: new AMap.Icon({
              image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              size: new AMap.Size(25, 34),  //图标所处区域大小
              imageSize: new AMap.Size(25, 34)//图标大小
            }),
            offset: new AMap.Pixel(-13, -30)
          });
          that.markers.push(marker);
        }
      },

      // 清除指定点
      clearMarker() {
        this.markers[0].setMap(null);
        this.markers[2].setMap(null);
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
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }

  .info {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    top: 30px;
  }
</style>
