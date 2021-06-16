<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>根据覆盖物调整显示范围</h5>
      <el-button size="mini" round @click="fitblue">自适应蓝色标记</el-button>
      <el-button size="mini" round @click="fitall">自适应所有标记</el-button>
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
        m1: null,
        m2: null,
        m3: null
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
          center: [116.405285, 39.904989]
        });

        // 创建两个点标记
        this.m1 = new AMap.Marker({
          position: [116.49, 39.9]
        });
        this.m2 = new AMap.Marker({
          position: [116.29, 39.9]
        });
        this.m3 = new AMap.Marker({
          position: [116.69, 39.9],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
        });

        this.map.add(this.m1);
        this.map.add(this.m2);
        this.map.add(this.m3);
      },

      //自动适配到指定视野范围
      fitblue() {
        this.map.setFitView([this.m1, this.m2]);
      },

      //无参数时，自动自适应所有覆盖物
      fitall() {
        this.map.setFitView();
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
</style>
