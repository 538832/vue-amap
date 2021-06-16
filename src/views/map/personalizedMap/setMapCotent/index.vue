<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>设置地图显示要素（Features）</h5>
      <el-checkbox-group v-model="MapContentList" @change="setMapFeatures">
        <el-checkbox class="checkbox" label="bg">区域面（bg）</el-checkbox>
        <el-checkbox class="checkbox" label="road">道路（road）</el-checkbox>
        <el-checkbox class="checkbox" label="building">建筑物（building）</el-checkbox>
        <el-checkbox class="checkbox" label="point">标注（point）</el-checkbox>
      </el-checkbox-group>
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
        MapContentList: ['bg', 'road', 'building', 'point']
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
          zoom: 17,
          viewMode: '3D',
          center: [116.408075, 39.950187],
          features: ['bg', 'road', 'building', 'point']
        });
      },
      //设置地图显示要素
      setMapFeatures() {
        this.map.setFeatures(this.MapContentList);
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
  .input-item .checkbox{
    display: block;
    padding: 5px 0;

  }
</style>
