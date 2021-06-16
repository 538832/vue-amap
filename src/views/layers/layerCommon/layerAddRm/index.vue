<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <div class="btn">
        <el-button size="mini" round @click="addLayer">添加图层</el-button>
        <el-button size="mini" round @click="rmLayer">移除图层</el-button>
      </div>
      <div class="btn">
        <el-button size="mini" round @click="showLayer">显示图层</el-button>
        <el-button size="mini" round @click="hideLayer">隐藏图层</el-button>
      </div>
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
        satellite: null
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

        this.satellite = new AMap.TileLayer.Satellite();
        this.map.addLayer(this.satellite);
      },

      //绑定按钮事件
      addLayer() {
        this.map.addLayer(this.satellite);
      },

      rmLayer() {
        this.map.removeLayer(this.satellite);
      },

      showLayer() {
        this.satellite.show();
      },

      hideLayer() {
        this.satellite.hide();
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
