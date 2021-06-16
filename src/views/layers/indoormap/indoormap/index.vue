<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
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
        meshes: []
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
        let indoorMap = new AMap.IndoorMap();
        let map = new AMap.Map('container', {
          center:[116.518542, 39.924677],
          showIndoorMap:true, //显示地图自带的室内地图图层
          zoom:18
        });
        indoorMap.showIndoorMap('B000A9VHIG');
        map.on('indoor_create',function(){
          map.indoorMap.showIndoorMap('B000A856LJ',5);
        })
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
</style>
