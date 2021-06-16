<template>
  <div id="container" :style="{ height: windowHeight - 50 + 'px' }"></div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight
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
        let map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 4,
          center: [116.397428, 39.90923],
          mapStyle: 'amap://styles/62c814bcd2ddd69019be7c66be7605cf'
          //前往创建自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
        });
      }
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
  }
</style>
