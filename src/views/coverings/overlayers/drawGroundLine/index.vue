<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
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
        mouseTool: null
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
          center: [116.397428, 39.90923],
          zoom: 3
        });
        let lineArr = [
          ['75.757904', '38.118117'],
          ['117.375719', '24.598057']
        ];
        let polyline = new AMap.Polyline({
          path: lineArr,            // 设置线覆盖物路径
          strokeColor: '#3366FF',   // 线颜色
          strokeOpacity: 1,         // 线透明度
          strokeWeight: 2,          // 线宽
          strokeStyle: 'solid',     // 线样式
          strokeDasharray: [10, 5], // 补充线样式
          geodesic: true            // 绘制大地线
        });
        map.add(polyline);
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
