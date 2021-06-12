<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>官方默认自定义样式</h5>
      <el-radio-group v-model="mapStyle" @change="switchMapStyle">
        <el-radio label="normal">
          <span class="mapStyleName">标准</span>
          <span class="input-text">normal</span>
        </el-radio>
        <el-radio label="dark">
          <span class="mapStyleName">幻影黑</span>
          <span class="input-text">dark</span>
        </el-radio>
        <el-radio label="light">
          <span class="mapStyleName">月光银</span>
          <span class="input-text">light</span>
        </el-radio>
        <el-radio label="whitesmoke">
          <span class="mapStyleName">远山黛</span>
          <span class="input-text">whitesmoke</span>
        </el-radio>
        <el-radio label="fresh">
          <span class="mapStyleName">草色青</span>
          <span class="input-text">fresh</span>
        </el-radio>
        <el-radio label="grey">
          <span class="mapStyleName">雅士灰</span>
          <span class="input-text">grey</span>
        </el-radio>
        <el-radio label="graffiti">
          <span class="mapStyleName">涂鸦</span>
          <span class="input-text">graffiti</span>
        </el-radio>
        <el-radio label="macaron">
          <span class="mapStyleName">马卡龙</span>
          <span class="input-text">macaron</span>
        </el-radio>
        <el-radio label="blue">
          <span class="mapStyleName">靛青蓝</span>
          <span class="input-text">blue</span>
        </el-radio>
        <el-radio label="darkblue">
          <span class="mapStyleName">极夜蓝</span>
          <span class="input-text">darkblue</span>
        </el-radio>
        <el-radio label="wine">
          <span class="mapStyleName">酱籽</span>
          <span class="input-text">wine</span>
        </el-radio>
      </el-radio-group>
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
        mapStyle: 'normal'
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
          zoom: 11,
        });
        //使用CSS默认样式定义地图上的鼠标样式
        this.map.setDefaultCursor("pointer");
      },
      //自定义鼠标样式图标
      switchMapStyle() {
        let mapStyle = "amap://styles/" + this.mapStyle;
        this.map.setMapStyle(mapStyle);
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
    width: 220px;
  }

  .input-item .mapStyleName {
    display: inline-block;
    width: 80px;
    padding: 5px 20px 10px;
  }
</style>
