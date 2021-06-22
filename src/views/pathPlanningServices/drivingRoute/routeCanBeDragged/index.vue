<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null
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
        let map, route, marker;
        //基本地图加载
        map = new AMap.Map("container", {
          resizeEnable: true
        });
        //绘制初始路径
        let path = [];
        path.push([116.303843, 39.983412]);
        path.push([116.321354, 39.896436]);
        path.push([116.407012, 39.992093]);
        map.plugin("AMap.DragRoute", function() {
          route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE); //构造拖拽导航类
          route.search(); //查询导航路径并开启拖拽导航
        });
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

  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 70px;
    right: 20px;
    width: 280px;
  }
</style>
