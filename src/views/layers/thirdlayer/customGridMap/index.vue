<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-button size="mini" class="btn" round @click="addXYZTileLayer">叠加XYZ图层</el-button>
      <el-button size="mini" class="btn" round @click="removeXYZTileLayer">移除XYZ图层</el-button>
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
        xyzTileLayer: null
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
          layers: [new AMap.TileLayer.Satellite()]
        });

        this.xyzTileLayer = new AMap.TileLayer({
          // 图块取图地址
          getTileUrl: 'https://wprd0{1,2,3,4}.is.autonavi.com/appmaptile?x=[x]&y=[y]&z=[z]&size=1&scl=1&style=8&ltype=11',
          zIndex: 100
        });
      },

      // 添加图层
      addXYZTileLayer() {
        this.map.add(this.xyzTileLayer);
      },

      //移除图层
      removeXYZTileLayer() {
        this.map.remove(this.xyzTileLayer)
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
    padding: 10px;
    right: 30px;
    bottom: 30px;
  }

  .input-item .btn {
    display: block;
    margin: 10px 0;
  }
</style>
