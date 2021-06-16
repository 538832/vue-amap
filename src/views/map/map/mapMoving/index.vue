<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>控制地图显示范围</h5>
      <el-button class="btn" size="mini" round @click="panBy">平移像素值：(50,100)</el-button>
      <el-button class="btn" size="mini" round @click="panTo">地图中心点平移至：(116.405467,39.907761)</el-button>
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
        northEast: [],
        southWest: []
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
          zoom: 13,
          center: [116.397428, 39.90923]
        });
      },
      panBy() {
        this.map.panBy(50, 100);
      },
      panTo() {
        this.map.panTo([116.405467, 39.907761]);
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

  .input-item .el-button {
    display: block;
    margin: 10px 0px;
    text-align: left;
  }
</style>
