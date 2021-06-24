<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <el-radio-group v-model="func" @change="draw(this)">
        <el-radio class="radio" label="rule">距离测量</el-radio>
        <el-radio class="radio" label="measureArea">面积测量</el-radio>
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
        func: 'rule'
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
          zoom: 15
        });
        this.mouseTool = new AMap.MouseTool(map);
        this.draw()
      },
      draw() {
        switch (this.func) {
          case 'rule': {
            this.mouseTool.rule({
              startMarkerOptions: {//可缺省
                icon: new AMap.Icon({
                  size: new AMap.Size(19, 31),//图标大小
                  imageSize: new AMap.Size(19, 31),
                  image: "//webapi.amap.com/theme/v1.3/markers/b/start.png"
                }),
                offset: new AMap.Pixel(-9, -31)
              },
              endMarkerOptions: {//可缺省
                icon: new AMap.Icon({
                  size: new AMap.Size(19, 31),//图标大小
                  imageSize: new AMap.Size(19, 31),
                  image: "//webapi.amap.com/theme/v1.3/markers/b/end.png"
                }),
                offset: new AMap.Pixel(-9, -31)
              },
              midMarkerOptions: {//可缺省
                icon: new AMap.Icon({
                  size: new AMap.Size(19, 31),//图标大小
                  imageSize: new AMap.Size(19, 31),
                  image: "//webapi.amap.com/theme/v1.3/markers/b/mid.png"
                }),
                offset: new AMap.Pixel(-9, -31)
              },
              lineOptions: {//可缺省
                strokeStyle: "solid",
                strokeColor: "#FF33FF",
                strokeOpacity: 1,
                strokeWeight: 2
              }
              //同 RangingTool 的 自定义 设置，缺省为默认样式
            });
            break;
          }
          case 'measureArea': {
            this.mouseTool.measureArea({
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
