<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <div class="box">
        <el-button size="mini" round @click="open">开始编辑</el-button>
      </div>
      <div class="box">
        <el-button size="mini" round @click="close">结束编辑</el-button>
      </div>
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
        rectangleEditor: null
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
          center: [116.387175, 39.876405],
          zoom: 13
        });

        let southWest = new AMap.LngLat(116.356449, 39.859008)
        let northEast = new AMap.LngLat(116.417901, 39.893797)

        let bounds = new AMap.Bounds(southWest, northEast)

        let rectangle = new AMap.Rectangle({
          bounds: bounds,
          strokeColor: 'red',
          strokeWeight: 6,
          strokeOpacity: 0.5,
          strokeDasharray: [30, 10],
          // strokeStyle还支持 solid
          strokeStyle: 'dashed',
          fillColor: 'blue',
          fillOpacity: 0.5,
          cursor: 'pointer',
          zIndex: 50,
        })

        map.add(rectangle);
        // 缩放地图到合适的视野级别
        map.setFitView([rectangle])

        that.rectangleEditor = new AMap.RectangleEditor(map, rectangle)

        that.rectangleEditor.on('adjust', function (event) {
          that.$message({
            message: '触发事件：adjust',
            type: 'warning'
          });
        })

        that.rectangleEditor.on('end', function (event) {
          that.$message({
            message: '触发事件：end',
            type: 'warning'
          });
          // event.target 即为编辑后的矩形对象
        })
      },

      //开始编辑
      open() {
        this.rectangleEditor.open()
      },

      //结束编辑
      close() {
        this.rectangleEditor.close()
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
