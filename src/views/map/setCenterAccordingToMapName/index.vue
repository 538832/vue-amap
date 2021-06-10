<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="input-card">
      <h4>设置地图当前行政区</h4>
      <el-input size="mini" v-model="cityName" placeholder="北京市" style="width: 150px;margin-right: 10px"></el-input>
      <el-button size="mini" type="primary" round @click="gotoCity">去指定城市</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        map: null,
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        //地图级别
        zoom: 11,
        //地图中心点
        center: {
          lng: 116.407387,
          lat: 39.904179
        },
        cityName: ''
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
        let that = this

        function isLoaded() {
          try {
            var map = new AMap.Map('container', {
              zoom: that.zoom, //初始地图级别
              center: [that.center.lng, that.center.lat], //初始地图中心点
            });
            that.map = map
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()
      },

      // 随机改变地图层级
      gotoCity() {
        if (this.cityName == '') {
          this.cityName = "北京市";
        }
        console.log(this.cityName)
        this.map.setCity(this.cityName);
        //log.info(`已跳转至${val}`);
        this.$message('已跳转至: ' + this.cityName)
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative
  }

  #container {
    width: 100%;
    height: 100%;
  }

  #input-card {
    position: absolute;
    right: 30px;
    top: 30px;
    background: white;
    padding: 10px 20px 20px 10px;
  }
</style>
