<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <span v-text="message"></span>
    </div>
    <div class="input-item">
      <h5>地图拖拽相关事件</h5>
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
        message: '请用鼠标拖拽地图试试'
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
        this.map.on('dragstart', this.showInfoDragstart);
        this.map.on('dragging', this.showInfoDragging);
        this.map.on('dragend', this.showInfoDragend);

      },

      // 解绑事件
      clickOff() {
        this.map.off('dragstart', this.showInfoDragstart);
        this.map.off('dragging', this.showInfoDragging);
        this.map.off('dragend', this.showInfoDragend);
      },

      showInfoDragstart(e) {
        this.message = '开始拖拽地图！'
      },

      showInfoDragging(e) {
        this.message = '正在拖拽地图！'
      },

      showInfoDragend() {
        this.message = '拖拽地图结束！'
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
