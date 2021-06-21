<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <el-button class="box" size="mini" round @click="open">开始编辑</el-button>
      <el-button class="box" size="mini" round @click="close">结束编辑</el-button>
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
        polyEditor: null
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
          center: [116.400274, 39.905812],
          zoom: 14,
          viewMode: '3D',
        });

        let path = [
          [116.403322, 39.920255],
          [116.410703, 39.897555],
          [116.402292, 39.892353],
          [116.389846, 39.891365]
        ]
        let path1 = [
          [116.453322, 39.920255],
          [116.460703, 39.897555],
          [116.452292, 39.892353],
          [116.439846, 39.891365]
        ]

        let polygon = new AMap.Polygon({
          path: path,
          strokeColor: "#FF33FF",
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          fillColor: '#1791fc',
          zIndex: 50,
          bubble: true,
        })
        let polygon1 = new AMap.Polygon({
          path: path1,
          strokeColor: "green",
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          fillColor: '#1791fc',
          zIndex: 50,
          bubble: true,
        })
        map.add([polygon, polygon1])

        // 缩放地图到合适的视野级别
        map.setFitView()

        // let polyEditor = new AMap.PolyEditor(map, polygon)
        // polyEditor = new AMap.PolygonEditor(map)
        this.polyEditor = new AMap.PolygonEditor(map, polygon);
        this.polyEditor.addAdsorbPolygons(polygon1)
        this.polyEditor.open();
      },

      //开始编辑
      open() {
        this.polyEditor.open();
      },

      //结束编辑
      close() {
        this.polyEditor.close();
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
