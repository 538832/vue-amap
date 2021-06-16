<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <span class="demonstration">图层透明度：<span v-text="opacity"></span></span>
      <el-slider v-model="opacity" :min="0" :max="1" :step="0.01" @change="setOpacity"></el-slider>
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
        opacity: 0.6
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
          opacity: this.opacity
        });

        this.setOpacity();
      },

      //设置透明度
      setOpacity() {
        this.satellite.setOpacity(this.opacity);
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
