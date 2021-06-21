<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <h5>利用mouseTool绘制覆盖物</h5>
      <el-button class="box" size="mini" round @click="drawPolyline">绘制线段</el-button>
      <el-button class="box" size="mini" round @click="drawPolygon">绘制多边形</el-button>
      <el-button class="box" size="mini" round @click="drawRectangle">绘制矩形</el-button>
      <el-button class="box" size="mini" round @click="drawCircle">绘制圆形</el-button>
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
        let map = new AMap.Map("container", {
          center: [116.434381, 39.898515],
          zoom: 14
        });

        this.mouseTool = new AMap.MouseTool(map)
      },

      //绘制线段
      drawPolyline() {
        this.mouseTool.polyline({
          strokeColor: "#3366FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          // 线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          // strokeDasharray: [10, 5],
        })
      },
      //绘制多边形
      drawPolygon() {
        this.mouseTool.polygon({
          strokeColor: "#FF33FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillColor: '#1791fc',
          fillOpacity: 0.4,
          // 线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          // strokeDasharray: [30,10],
        })
      },
      //绘制矩形
      drawRectangle() {
        this.mouseTool.rectangle({
          strokeColor: 'red',
          strokeOpacity: 0.5,
          strokeWeight: 6,
          fillColor: 'blue',
          fillOpacity: 0.5,
          // strokeStyle还支持 solid
          strokeStyle: 'solid',
          // strokeDasharray: [30,10],
        })
      },

      //绘制圆形
      drawCircle() {
        this.mouseTool.circle({
          strokeColor: "#FF33FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillColor: '#1791fc',
          fillOpacity: 0.4,
          strokeStyle: 'solid',
          // 线样式还支持 'dashed'
          // strokeDasharray: [30,10],
        })
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
    display: block;
    margin: 10px;
  }
</style>
