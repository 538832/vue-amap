<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      给地图绑定自定义的count事件，实现新增marker点的计数<br>
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
        message: '总共添加了0个Marker',
        count: 0
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
          zoom: 10,
          center: [116.39, 39.9]
        });
        this.map.on("count", this.onCount); //绑定自定义事件
      },

      onClick(e) {
        new AMap.Marker({
          position: e.lnglat,
          map: this.map
        })
        this.map.emit('count', this.onCount);//触发自定义事件
      },

      onCount(e) {
        this.message = "总共添加了" + (++this.count) + "个Marker.";
      },

      //绑定地图事件
      bind() {
        this.remove();//防止重复绑定
        this.map.on("click", this.onClick);
      },

      //移除地图事件
      remove() {
        this.map.off('click', this.onClick);
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
    padding: 20px 20px;
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
