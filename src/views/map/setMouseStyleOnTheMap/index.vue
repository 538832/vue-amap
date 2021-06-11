<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-radio-group v-model="mouseStyle">
        <el-radio class="mouseStyle" label="default" @change="switchCursor">箭头</el-radio>
        <el-radio class="mouseStyle" label="pointer" @change="switchCursor">手型</el-radio>
        <el-radio class="mouseStyle" label="move" @change="switchCursor">交叉箭头</el-radio>
        <el-radio class="mouseStyle" label="crosshair" @change="switchCursor">十字线</el-radio>
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
        mouseStyle: 'pointer'
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
      switchCursor() {
        this.map.setDefaultCursor(this.mouseStyle);
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

  .input-item .mouseStyle {
    display: block;
    padding: 5px 20px 10px;
  }
</style>
