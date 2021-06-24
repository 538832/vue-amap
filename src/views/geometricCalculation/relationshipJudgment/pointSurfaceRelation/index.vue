<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      拖动Marker可调整位置
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
        marker: null,
        path: [
          [116.169465, 39.932670],
          [116.160260, 39.924492],
          [116.186138, 39.879817],
          [116.150625, 39.710019],
          [116.183198, 39.709920],
          [116.226950, 39.777616],
          [116.421078, 39.810771],
          [116.442621, 39.799892],
          [116.463478, 39.790066],
          [116.588276, 39.809551],
          [116.536091, 39.808859],
          [116.573856, 39.839643],
          [116.706380, 39.916740],
          [116.657285, 39.934545],
          [116.600293, 39.937770],
          [116.540039, 39.937968],
          [116.514805, 39.982375],
          [116.499935, 40.013710],
          [116.546520, 40.030443],
          [116.687668, 40.129961],
          [116.539697, 40.080659],
          [116.503390, 40.058474],
          [116.468800, 40.052578]
        ]
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
        //初始化地图对象，加载地图
        let map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 13
        });
        // 创建多边形
        let polygon = new AMap.Polygon({
          map: map,
          fillOpacity: 0.4,
          path: this.path
        });
        // 创建点
        this.marker = new AMap.Marker({
          map: map,
          draggable: true,
          position: [116.566298, 40.014179]
        });

        this.compute();
        // 为marker绑定拖拽事件
        this.marker.on('dragging', this.compute)
        map.setFitView();
      },

      compute() {
        let point = this.marker.getPosition();
        let isPointInRing = AMap.GeometryUtil.isPointInRing(point, this.path);
        this.marker.setLabel({
          content: isPointInRing ? '内部' : '外部',
          offset: new AMap.Pixel(20, 0)
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

  .info {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 30px;
    right: 30px;
    padding: 10px;
  }
</style>
