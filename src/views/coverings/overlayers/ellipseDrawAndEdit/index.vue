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
        ellipseEditor: null
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
        var map = new AMap.Map("container", {
          center: [ 116.433322, 39.900255 ],
          zoom: 14
        });

        var ellipse = new AMap.Ellipse({
          center: [116.433322, 39.900255],
          radius: [ 2000, 1000 ], //半径
          borderWeight: 3,
          strokeColor: "#FF33FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          // 线样式还支持 'dashed'
          strokeStyle: 'dashed',
          strokeDasharray: [10, 10],
          fillColor: '#1791fc',
          zIndex: 50,
        })

        map.add(ellipse);
        // 缩放地图到合适的视野级别
        map.setFitView([ ellipse ])

        that.ellipseEditor = new AMap.EllipseEditor(map, ellipse)

        that.ellipseEditor.on('move', function(event) {
          that.$message({
            message: '触发事件：move',
            type: 'warning'
          });
        })

        that.ellipseEditor.on('adjust', function(event) {
          that.$message({
            message: '触发事件：adjust',
            type: 'warning'
          });
        })

        that.ellipseEditor.on('end', function(event) {
          that.$message({
            message: '触发事件：end',
            type: 'warning'
          });
          // event.target 即为编辑后的圆形对象
        })
      },

      //开始编辑
      open() {
        this.ellipseEditor.open()
      },

      //结束编辑
      close() {
        this.ellipseEditor.close()
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
