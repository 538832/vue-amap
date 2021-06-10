<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>添加、删除图层（Layer）</h5>
      <div class="item">
        <span>卫星图层：</span>
        <el-button size="mini" round @click="addSatelliteLayer">添加卫星图层</el-button>
        <el-button size="mini" round @click="removeSatelliteLayer">删除卫星图层</el-button>
      </div>
      <div class="item">
        <span>红色标记：</span>
        <el-button size="mini" round @click="addRoadnetLayer">添加路网图层</el-button>
        <el-button size="mini" round @click="removeRoadnetLayer">删除路网图层</el-button>
      </div>

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
        // 官方卫星
        satelliteLayer: null,
        //路网图层
        roadNetLayer: null
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
        var that = this

        function isLoaded() {
          try {
            var map = new AMap.Map('container', {
              zoom: 11,
              center: [116.405285, 39.904989]
            });
            that.map = map;
            // 构造官方卫星、路网图层
            that.satelliteLayer = new AMap.TileLayer.Satellite();
            that.roadNetLayer = new AMap.TileLayer.RoadNet();

            //批量添加图层
            that.map.add([that.satelliteLayer, that.roadNetLayer]);
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()
      },

      //添加卫星图层
      addSatelliteLayer() {
        this.map.add(this.satelliteLayer);
      },

      //删除卫星图层
      removeSatelliteLayer() {
        this.map.remove(this.satelliteLayer);
      },

      //添加路网图层
      addRoadnetLayer() {
        this.map.add(this.roadNetLayer);
      },

      //删除路网图层
      removeRoadnetLayer() {
        this.map.remove(this.roadNetLayer);
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
  .input-item .item {
    margin: 10px 0px;
  }
</style>
