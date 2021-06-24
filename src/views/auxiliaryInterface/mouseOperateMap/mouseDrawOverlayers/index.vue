<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <div class="input-item">
        <el-radio-group v-model="func" @change="draw(this)">
          <el-radio class="radio" label="marker">画点</el-radio>
          <el-radio class="radio" label="polyline">画折线</el-radio>
          <el-radio class="radio" label="polygon">画多边形</el-radio>
          <el-radio class="radio" label="rectangle">画矩形</el-radio>
          <el-radio class="radio" label="circle">画圆</el-radio>
        </el-radio-group>
      </div>

      <div class="item">
        <el-button class="btn" round size="mini" @click="clear">清除</el-button>
        <el-button class="btn" round size="mini" @click="close">关闭绘图</el-button>
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
        overlays: [],
        mouseTool: null,
        func: 'marker'
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
        that.map = new AMap.Map('container', {
          zoom: 14
        });

        that.mouseTool = new AMap.MouseTool(that.map);
        //监听draw事件可获取画好的覆盖物
        that.mouseTool.on('draw', function (e) {
          that.overlays.push(e.obj);
        })
        that.draw()
      },

      draw() {
        switch (this.func) {
          case 'marker': {
            this.mouseTool.marker({
              //同Marker的Option设置
            });
            break;
          }
          case 'polyline': {
            this.mouseTool.polyline({
              strokeColor: '#80d8ff'
              //同Polyline的Option设置
            });
            break;
          }
          case 'polygon': {
            this.mouseTool.polygon({
              fillColor: '#00b0ff',
              strokeColor: '#80d8ff'
              //同Polygon的Option设置
            });
            break;
          }
          case 'rectangle': {
            this.mouseTool.rectangle({
              fillColor: '#00b0ff',
              strokeColor: '#80d8ff'
              //同Polygon的Option设置
            });
            break;
          }
          case 'circle': {
            this.mouseTool.circle({
              fillColor: '#00b0ff',
              strokeColor: '#80d8ff'
              //同Circle的Option设置
            });
            break;
          }
        }
      },
      //清除覆盖物
      clear() {
        this.map.remove(this.overlays)
        this.overlays = [];
      },

      //关闭，并清除覆盖物
      close() {
        this.mouseTool.close(true)
        this.clear()
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
    bottom: 30px;
    right: 30px;
    padding: 10px;
    width: 320px;
  }

  .input-item{
    margin: 10px;
  }
  .input-item .radio{
    margin: 5px 10px;
  }

  .item{
    margin: 10px;
    text-align: center;
  }
  .item .btn{
    width: 100px;
  }
</style>
