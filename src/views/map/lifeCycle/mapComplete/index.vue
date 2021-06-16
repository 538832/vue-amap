<template>
  <div id="container" :style="{ height: windowHeight - 50 + 'px' }"></div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight
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
        let map = new AMap.Map('container');
        map.on("complete", function () {
          that.$message({
            message: '地图加载完成',
            type: 'success'
          });
        });
      }
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
  }
</style>
