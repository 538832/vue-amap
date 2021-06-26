<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">双击多边形试试</div>
    <div class="input-card">
      <el-button class="box" size="mini" round @click="createPolygon">新建</el-button>
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
        let that = this;
        let map = new AMap.Map("container", {
          center: [116.471354, 39.994257],
          zoom: 16.8
        });

        let path1 = [[116.475334, 39.997534], [116.476627, 39.998315], [116.478603, 39.99879], [116.478529, 40.000296], [116.475082, 40.000151], [116.473421, 39.998717]]
        let path2 = [[116.474595, 40.001321], [116.473526, 39.999865], [116.476284, 40.000917]]

        let polygon1 = new AMap.Polygon({
          path: path1
        })

        let polygon2 = new AMap.Polygon({
          path: path2
        })

        map.add([polygon1, polygon2]);
        map.setFitView();
        that.polyEditor = new AMap.PolygonEditor(map);
        that.polyEditor.addAdsorbPolygons([polygon1, polygon2]);
        that.polyEditor.on('add', function (data) {
          let polygon = data.target;
          that.polyEditor.addAdsorbPolygons(polygon);
          polygon.on('dblclick', () => {
            that.polyEditor.setTarget(data.target);
            that.polyEditor.open();
          })
        })

        polygon1.on('dblclick', () => {
          that.polyEditor.setTarget(polygon1);
          that.polyEditor.open();
        })

        polygon2.on('dblclick', () => {
          that.polyEditor.setTarget(polygon2);
          that.polyEditor.open();
        })

        that.polyEditor.setTarget(polygon2);
        that.polyEditor.open();
      },

      createPolygon() {
        this.polyEditor.close();
        this.polyEditor.setTarget();
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

  .info {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    top: 30px;
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
