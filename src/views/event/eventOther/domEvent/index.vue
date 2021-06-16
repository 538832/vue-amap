<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <span v-text="message"></span>
    </div>
    <div class="input-item">
      <h5>DOM事件的绑定与解绑</h5>
      <el-button size="mini" round @click="bind">绑定事件</el-button>
      <el-button size="mini" round @click="remove">解绑事件</el-button>
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
        message: '给页面中的两个按钮绑定事件，绑定后单击地图可添加Marker！'
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
          center: [116.39, 39.9]
        });
      },
      clickListener(e) {
        new AMap.Marker({
          position: e.lnglat,
          map: this.map
        });
      },
      //bt1的click的绑定事件
      bind() {
        this.remove(); //防止重复绑定
        this.map.on("click", this.clickListener);
      },
      //bt2的click的绑定事件
      remove() {
        this.map.off('click', this.clickListener);  // 移除事件
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
