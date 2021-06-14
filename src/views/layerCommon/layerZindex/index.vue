<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>拖动滑块调整图层 zIndex</h5>
      <!--卫星图层-->
      <div class="zoom">
        卫星图层：
        <span v-text="satelliteLayer"></span>
      </div>
      <el-slider v-model="satelliteLayer" @change="satelliteChange()" :min="10" :max="20"
                 vertical style="display: inline-block;width: 70px;" height="200px"></el-slider>

      <!--道路图层-->
      <div class="zoom">
        道路图层：
        <span v-text="roadLayer"></span>
      </div>
      <el-slider v-model="roadLayer" @change="roadNetLayerChange()" :min="10" :max="20"
                 vertical style="display: inline-block;width: 70px;" height="200px"></el-slider>
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
        satellite: null,
        roadNetLayer: null,
        satelliteLayer: 12,
        roadLayer: 18
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
        this.map = new AMap.Map("container", {
          center: [116.40, 39.91],
          features: ['road', 'bg'],
          zoom: 13
        });

        this.satellite = new AMap.TileLayer.Satellite({
          map: this.map,
          zIndex: 12,
          opacity: 0.8
        });

        this.roadNetLayer = new AMap.TileLayer.RoadNet({
          map: this.map,
          zIndex: 18,
          opacity: 0.8
        });
      },

      //设置卫星 zIndex 属性
      satelliteChange() {
        this.satellite.setzIndex(this.satelliteLayer);
      },

      //设置道路 zIndex 属性
      roadNetLayerChange(z) {
        this.roadNetLayer.setzIndex(this.roadLayer);
      },
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

  .zoom {
    display: inline-block;
    writing-mode: vertical-lr;
  }
</style>
