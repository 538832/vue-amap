<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>设置 anchor</h5>
      <el-radio-group v-model="radio" @change="coordinate">
        <el-radio class="input-card" size="mini" round label="top-left">top-left</el-radio>
        <el-radio class="input-card" size="mini" round label="top-center">top-center</el-radio>
        <el-radio class="input-card" size="mini" round label="top-right">top-right</el-radio>
        <el-radio class="input-card" size="mini" round label="middle-left">middle-left</el-radio>
        <el-radio class="input-card" size="mini" round label="center">center</el-radio>
        <el-radio class="input-card" size="mini" round label="middle-right">middle-right</el-radio>
        <el-radio class="input-card" size="mini" round label="bottom-left">bottom-left</el-radio>
        <el-radio class="input-card" size="mini" round label="bottom-center">bottom-center</el-radio>
        <el-radio class="input-card" size="mini" round label="bottom-right">bottom-right</el-radio>
      </el-radio-group>
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
        infoWindow: null,
        radio: 'top-left'
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
        let map = new AMap.Map("container", {
          center: [116.402023,39.906977],
          zoom: 13,
          viewMode: '3D',
        });

        var position = [116.401337,39.907886];

        //构建自定义信息窗体
        this.infoWindow = new AMap.InfoWindow({
          anchor: 'top-left',
          content: '这是信息窗体！这是信息窗体！',
        });

        this.infoWindow.open(map, position);


        new AMap.Marker({position: position, map});
      },

      setAnchor() {
        let anchor = this.id;
        this.infoWindow.setAnchor(anchor)
      },
      coordinate(){
        this.infoWindow.setAnchor(this.radio)
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

  .info {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    top: 30px;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }

  .input-item .input-card {
    display: block;
    margin: 10px;
  }

</style>
