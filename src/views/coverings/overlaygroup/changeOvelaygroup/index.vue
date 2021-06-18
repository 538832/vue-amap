<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-button size="mini" round @click="changeAttribute">批量修改属性</el-button>
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
        overlayGroups: null,
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
        // 创建地图实例
        let map = new AMap.Map("container", {
          zoom: 14,
          center: [116.396959, 39.918288],
          resizeEnable: true
        });

        let paths = [
          [new AMap.LngLat(116.367519, 39.921711), new AMap.LngLat(116.414383, 39.929017)],
          [new AMap.LngLat(116.370953, 39.915918), new AMap.LngLat(116.429489, 39.907293)]
        ];

        let polylines = [];

        for (let i = 0; i < paths.length; i++) {
          let path = paths[i];
          // 创建线实例
          let polyline = new AMap.Polyline({
            path: path,
            strokeWeight: 6,
            strokeColor: '#3366FF',
            isOutline: true,
            borderWeight: 3,
            outlineColor: '#ffeeff'
          });

          polylines.push(polyline);
        }
        this.overlayGroups = new AMap.OverlayGroup(polylines);
        map.add(this.overlayGroups);
      },

      // 批量改变 overlaygroup 内覆盖物的属性
      changeAttribute() {
        this.overlayGroups.setOptions({
          strokeColor: '#ffeeff',
          outlineColor: '#3366FF'
        });
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

  .input-item {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    bottom: 30px;
  }
</style>
