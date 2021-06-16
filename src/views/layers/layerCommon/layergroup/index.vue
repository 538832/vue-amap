<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-button class="btn" size="mini" round @click="show">显示图层</el-button>
      <el-button class="btn" size="mini" round @click="hide">隐藏图层</el-button>
      <el-button class="btn" size="mini" round @click="setOptions">随机修改图层透明度</el-button>
      <el-button class="btn" size="mini" round @click="reload">重载图层</el-button>
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
        layerGroup: null
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
          zoom: 13
        });

        let trafficLayer = new AMap.TileLayer.Traffic({
          zIndex: 11
        });

        let roadNetLayer = new AMap.TileLayer.RoadNet({
          zIndex: 10
        });

        this.layerGroup = new AMap.LayerGroup([trafficLayer, roadNetLayer]);
        this.layerGroup.setMap(this.map);
      },

      //显示图层
      show() {
        this.layerGroup.show();
      },

      //隐藏图层
      hide() {
        this.layerGroup.hide();
      },

      //随机修改图层透明度
      setOptions() {
        this.layerGroup.setOptions({opacity: Math.random()});
      },

      //重载图层
      reload() {
        this.layerGroup.reload();
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

  .input-item .btn {
    display: block;
    margin: 10px 0;
  }

</style>
