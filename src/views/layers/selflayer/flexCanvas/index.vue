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
        let map = new AMap.Map('container', {
          zoom: 14,
          zooms: [2, 20],
        });

        let layer = new AMap.TileLayer.Flexible({
          cacheSize: 30,
          zIndex: 200,
          createTile: function (x, y, z, success, fail) {
            let c = document.createElement('canvas');
            c.width = c.height = 256;

            let cxt = c.getContext("2d");
            cxt.font = "15px Verdana";
            cxt.fillStyle = "#ff0000";
            cxt.strokeStyle = "#FF0000";
            cxt.strokeRect(0, 0, 256, 256);
            cxt.fillText('(' + [x, y, z].join(',') + ')', 10, 30);

            // 通知API切片创建完成
            success(c);
          }
        });

        layer.setMap(map);
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
