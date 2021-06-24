<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class='info'>操作说明：在地图上拖拽</div>
    <div class="input-card">
      <el-radio-group v-model="func" @change="draw(this)">
        <el-radio class="radio" label="zoomIn">拉框放大</el-radio>
        <el-radio class="radio" label="zoomOut">拉框缩小</el-radio>
      </el-radio-group>
      <div class="btn">
        <el-button round size="mini" @click="close">关闭</el-button>
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
        mouseTool: null,
        func: 'zoomIn'
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
          zoom: 3
        });
        this.mouseTool = new AMap.MouseTool(map);
        this.draw()
      },
      draw() {
        switch (this.func) {
          case 'zoomIn': {
            this.mouseTool.rectZoomIn({
              strokeColor: '#80d8ff',
              fillColor: '#80d8ff',
              fillOpacity: 0.3
              //同 Polygon 的 Option 设置
            });
            break;
          }
          case 'zoomOut': {
            this.mouseTool.rectZoomOut({
              strokeColor: '#80d8ff',
              fillColor: '#80d8ff',
              fillOpacity: 0.3
              //同 Polygon 的 Option 设置
            });
            break;
          }
        }
      },

      //关闭
      close() {
        this.mouseTool.close(true);
        this.func = '';
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

  .input-card {
    position: absolute;
    background-color: white;
    bottom: 30px;
    right: 30px;
    padding: 10px;
  }

  .input-card .input-item .radio {
    margin: 10px;
  }

  .input-card .btn {
    margin-top: 10px;
    text-align: center;
  }
</style>
