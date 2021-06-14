<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-button round size="mini" @click="toggle">显示/隐藏实时路况</el-button>
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
        trafficLayer: null,
        isVisible: true
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
          center: [116.397428, 39.90923],
          zoom: 13
        });

        //实时路况图层
        this.trafficLayer = new AMap.TileLayer.Traffic({
          zIndex: 10,
          zooms: [7, 22],
        });
        this.trafficLayer.setMap(this.map);

        this.toggle();
      },

      toggle() {
        if (this.isVisible) {
          this.trafficLayer.hide();
          this.isVisible = false;
        } else {
          this.trafficLayer.show();
          this.isVisible = true;
        }
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
    padding: 20px;
    right: 30px;
    bottom: 30px;
  }
</style>
