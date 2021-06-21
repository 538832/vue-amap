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
        map: null
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
        let map = new AMap.Map('container');
        let path1 = [
          [75.757904, 38.118117],
          [97.375719, 24.598057],
          [117.375719, 38.118117]
        ];
        let path2 = [
          [75.757904, 41.118117],
          [97.375719, 27.598057],
          [117.375719, 41.118117]
        ];
        let path3 = [
          [75.757904, 44.118117],
          [97.375719, 30.598057],
          [117.375719, 44.118117]
        ];
        let path4 = [
          [75.757904, 47.118117],
          [97.375719, 33.598057],
          [117.375719, 47.118117]
        ];
        let polyline1 = new AMap.Polyline({
          path: path1,            // 设置线覆盖物路径
          showDir: true,
          strokeColor: '#3366bb',   // 线颜色
          strokeWeight: 10           // 线宽
        });
        let polyline2 = new AMap.Polyline({
          path: path2,            // 设置线覆盖物路径
          showDir: true,
          dirColor: 'pink',
          strokeColor: '#336688',   // 线颜色
          strokeWeight: 10           // 线宽
        });

        let canvasDir = document.createElement('canvas')
        let width = 24;
        canvasDir.width = width;
        canvasDir.height = width;
        let context = canvasDir.getContext('2d');
        context.strokeStyle = 'red';
        context.lineJoin = 'round';
        context.lineWidth = 8;
        context.moveTo(-4, width - 4);
        context.lineTo(width / 2, 6);
        context.lineTo(width + 4, width - 4);
        context.stroke();

        let polyline3 = new AMap.Polyline({
          path: path3,            // 设置线覆盖物路径
          showDir: true,
          dirImg: canvasDir,
          strokeColor: '#3366cc',   // 线颜色
          strokeWeight: 10           // 线宽
        });
        map.add([polyline1, polyline2, polyline3])
        map.setFitView()
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

  .input-card {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    bottom: 30px;
  }

  .input-card .box {
    margin: 10px 0;
  }
</style>
