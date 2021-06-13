<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <span v-text="message"></span>
    </div>
    <div class="input-item">
      <h5>地图点击相关事件</h5>
      <el-button size="mini" round @click="clickOn">绑定事件</el-button>
      <el-button size="mini" round @click="clickOff">解绑事件</el-button>
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
        message: '请用鼠标在地图上操作试试'
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
      },

      // 事件绑定
      clickOn() {
        this.map.on('click', this.showInfoClick);
        this.map.on('dblclick', this.showInfoDbClick);
        this.map.on('mousemove', this.showInfoMove);

      },

      // 解绑事件
      clickOff() {
        this.map.off('click', this.showInfoClick);
        this.map.off('dblclick', this.showInfoDbClick);
        this.map.off('mousemove', this.showInfoMove);
      },

      showInfoClick(e) {
        this.message = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置单击了地图！'
      },

      showInfoDbClick(e) {
        this.message = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置双击了地图！'
      },

      showInfoMove() {
        this.message = '您移动了您的鼠标！'
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
    padding: 10px;
    right: 30px;
    top: 30px;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }

</style>
