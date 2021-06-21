<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <el-button class="box" size="mini" round @click="editPolyline1">编辑Polyline1</el-button>
      <el-button class="box" size="mini" round @click="editPolyline2">编辑Polyline2</el-button>
      <el-button class="box" size="mini" round @click="createPolyline">新建Polyline</el-button>
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
        polyEditor: null,
        polyline1: null,
        polyline2: null
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
        this.map = new AMap.Map("container", {
          center: [116.400274, 39.905812],
          zoom: 14
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

        this.polyline1 = new AMap.Polyline({
          path: path,
          strokeColor: "#FF33FF",
          strokeWeight: 6,
          strokeOpacity: 0.9,
          zIndex: 50,
          bubble: true,
        })
        this.polyline2 = new AMap.Polyline({
          path: path1,
          strokeColor: "green",
          strokeWeight: 6,
          strokeOpacity: 0.9,
          zIndex: 50,
          bubble: true,

        })

        this.map.add([this.polyline1, this.polyline2])

        // 缩放地图到合适的视野级别
        this.map.setFitView()

        // let polyEditor = new AMap.PolyEditor(map, polygon)
        // polyEditor = new AMap.PolygonEditor(map)
        this.polyEditor = new AMap.PolylineEditor(this.map, this.polyline1);
      },

      //编辑Polyline1
      editPolyline1() {
        this.polyEditor.setTarget(this.polyline1);
        this.polyEditor.open();
      },

      //编辑Polyline2
      editPolyline2() {
        this.polyEditor.setTarget(this.polyline2);
        this.polyEditor.open();
      },

      //新建Polyline
      //TODO: 官方文档上的没反应,我觉得这样写更好
      createPolyline() {
        let path = [
          [116.417241, 39.892314],
          [116.428699, 39.892973],
          [116.436725, 39.900183],
          [116.426296, 39.922008]
        ]

        let polyline = new AMap.Polyline({
          path: path,
          strokeColor: "#383fff",
          strokeWeight: 6,
          strokeOpacity: 0.9,
          zIndex: 50,
          bubble: true,
        })
        this.map.add([polyline])
        this.polyEditor.setTarget(polyline);
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
