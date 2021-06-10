<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>左击获取经纬度</h5>
      <el-input size="mini" v-model="lnglat"></el-input>
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
        lnglat: ''
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
        var that = this

        function isLoaded() {
          try {
            var map = new AMap.Map('container', {
              zoom: 11,
            });
            that.map = map;
            //绑定地图移动事件
            AMap.event.addListener(that.map, 'click', function (e) {
              that.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            })
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()
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

  .input-item {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }
</style>
