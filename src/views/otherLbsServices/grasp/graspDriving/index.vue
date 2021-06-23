<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      纠偏前:
      <div class='color' style='background-color:red'></div>
      <br>
      纠偏后:
      <div class='color' style='background-color:#0091ea'></div>
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
        city: [],
        options: []
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
        let that = this;
        let map = new AMap.Map('container', {
          resizeEnable: true
        });
        let graspRoad;
        let pathParam = [
          {"x": 116.478928, "y": 39.997761, "sp": 19, "ag": 0, "tm": 1478031031},
          {"x": 116.478907, "y": 39.998422, "sp": 10, "ag": 0, "tm": 2},
          {"x": 116.479384, "y": 39.998546, "sp": 10, "ag": 110, "tm": 3},
          {"x": 116.481053, "y": 39.998204, "sp": 10, "ag": 120, "tm": 4},
          {"x": 116.481793, "y": 39.997868, "sp": 10, "ag": 120, "tm": 5},
          {"x": 116.482898, "y": 39.998217, "sp": 10, "ag": 30, "tm": 6},
          {"x": 116.483789, "y": 39.999063, "sp": 10, "ag": 30, "tm": 7},
          {"x": 116.484674, "y": 39.999844, "sp": 10, "ag": 30, "tm": 8}]

        let path1 = [];
        for (let i = 0; i < pathParam.length; i += 1) {
          path1.push([pathParam[i].x, pathParam[i].y])
        }
        let oldLine = new AMap.Polyline({
          path: path1,
          strokeWeight: 8,
          strokeOpacity: 1,
          strokeColor: 'red'
        })
        map.add(oldLine)
        if (!graspRoad) {
          graspRoad = new AMap.GraspRoad()
        }
        graspRoad.driving(pathParam, function (error, result) {
          if (!error) {
            let path2 = [];
            let newPath = result.data.points;
            for (let i = 0; i < newPath.length; i += 1) {
              path2.push([newPath[i].x, newPath[i].y])
            }
            let newLine = new AMap.Polyline({
              path: path2,
              strokeWeight: 8,
              strokeOpacity: 0.8,
              strokeColor: '#0091ea',
              showDir: true
            })
            map.add(newLine)
            map.setFitView()
          }
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

  .info {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 30px;
    right: 30px;
    padding: 10px;
  }

  .color {
    width: 5rem;
    height: 0.6rem;
    display: inline-block;
    margin: 0 1rem;
  }
</style>
