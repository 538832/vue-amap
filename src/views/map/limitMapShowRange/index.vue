<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="info">
      <h4>当前地图显示范围（Bounds）</h4>
      <p>NorthEast坐标：<span v-text="northEast.toString()"></span></p>
      <p>SouthWest坐标：<span v-text="southWest.toString()"></span></p>
    </div>
    <div class="input-item">
      <h5>控制地图显示范围</h5>
      <el-button class="btn" size="mini" round @click="lockMapBounds">限定地图显示范围</el-button>
      <el-button class="btn" size="mini" round @click="unlockMapBounds">取消地图显示限制</el-button>
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
        northEast: [],
        southWest: []
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight - 50;
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
              showIndoorMap: false
            });
            that.map = map
            //启用地图范围限定
            that.lockMapBounds();
            that.logMapInfo();
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()
      },

      logMapInfo() {
        var limitBounds = this.map.getLimitBounds();
        if (limitBounds) {
          this.northEast = limitBounds.northeast;
          this.southWest = limitBounds.southwest;
        } else {
          this.northEast = ['未定义'];
          this.southWest = ['未定义'];
        }
      },
      //限制地图显示范围
      lockMapBounds() {
        var bounds = this.map.getBounds();
        this.map.setLimitBounds(bounds);
        this.logMapInfo();
      },

      //取消地图显示限制
      unlockMapBounds() {
        this.map.clearLimitBounds();
        this.logMapInfo();
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

  #info {
    position: absolute;
    right: 30px;
    top: 30px;
    background: white;
    width: 350px;
    padding: 0 20px;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }

  .input-item .el-button {
    display: block;
    margin: 10px 10px;
    text-align: left;
  }
</style>
