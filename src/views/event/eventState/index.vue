<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <h4 v-text="status"></h4>
      <p>当前中心点：<span v-text="mapCenter"></span></p>
    </div>
    <div class="input-item">
      <h5>地图移动事件</h5>
      <el-button size="mini" round @click="moveOn">绑定事件</el-button>
      <el-button size="mini" round @click="moveOff">解绑事件</el-button>
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
        status: '',
        mapCenter: '121.498586,31.239637'
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
          zoom: 11,
        });
        this.mapCenter = this.map.getCenter()
      },

      // 事件绑定
      moveOn() {
        this.map.on('movestart', this.mapMovestart);
        this.map.on('mapmove', this.mapMove);
        this.map.on('moveend', this.mapMoveend);
        this.$message('绑定事件');
      },

      // 解绑事件
      moveOff() {
        this.map.off('movestart', this.mapMovestart);
        this.map.off('mapmove', this.mapMove);
        this.map.off('moveend', this.mapMoveend);
        this.$message('解除绑定事件');
      },

      mapMovestart() {
        this.status = '地图移动开始';
      },

      mapMove() {
        this.status = '地图正在移动';
        this.mapCenter = this.map.getCenter();
      },

      mapMoveend() {
        this.status = '地图移动结束';
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

  .info {
    position: absolute;
    background: white;
    padding: 0 20px;
    right: 30px;
    top: 30px;
    width: 300px;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }

</style>
