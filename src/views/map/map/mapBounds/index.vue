<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="info">
      <h4>当前地图显示范围（Bounds）</h4>
      <p>NorthEast坐标：<span v-text="northEast"></span></p>
      <p>SouthWest坐标：<span v-text="southWest"></span></p>
    </div>
    <div class="input-item">
      <h5>控制地图显示范围</h5>
      <el-button round size="mini" @click="resetBbounds">指定地图显示范围</el-button>
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
        northEast: null,
        southWest: null
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
        this.map = new AMap.Map('container', {
          zoom: 10,
          center: [116.405285, 39.904989],
          showIndoorMap: false
        });
        //绑定地图移动与缩放事件
        this.map.on('moveend', this.logMapBounds)
        this.map.on('zoomend', this.logMapBounds)
        this.logMapBounds();
      },

      //显示当前地图边界范围坐标
      logMapBounds() {
        let bounds = this.map.getBounds();
        this.northEast = bounds.northEast;
        this.southWest = bounds.southWest;
      },
      resetBbounds() {
        //通过 new AMap.Bounds(southWest:LngLat, northEast:LngLat) 或者 map.getBounds() 获得地图Bounds信息
        let mybounds = new AMap.Bounds([116.319665, 39.855919], [116.468324, 39.9756]);
        this.map.setBounds(mybounds);
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
    width: 350px;
    padding: 0 20px;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }
</style>
