<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      拖动小多边形可调整位置
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
        polygon1: null,
        polygon2: null,
        textBox: null,
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
        let path1 = [
          [116.376907, 39.910967],
          [116.384911, 39.919505],
          [116.40109, 39.919728],
          [116.411132, 39.911408],
          [116.412076, 39.899135],
          [116.402292, 39.892353],
          [116.3874, 39.892518],
          [116.376971, 39.899267]
        ]
        this.polygon1 = new AMap.Polygon({
          map: map,
          fillColor: 'blue',
          fillOpacity: 0.3,
          path: path1,
        })
        let path2 = [
          [116.390233, 39.906602],
          [116.395254, 39.908668],
          [116.400661, 39.906667],
          [116.400962, 39.898589],
          [116.395769, 39.894855],
          [116.390147, 39.898049],
        ]
        this.polygon2 = new AMap.Polygon({
          map: map,
          fillColor: 'red',
          fillOpacity: 0.3,
          path: path2,
          draggable: true
        })

        this.textBox = new AMap.Text({
          map: map,
          position: new AMap.LngLat(116.398655, 39.918694),
          offset: new AMap.Pixel(-20, -40),
          style: {
            'background-color': 'yellow',
            'border': 'solid 1px #0088ff',
            'padding': '10px 20px',
          }
        })
        this.compute();
        this.polygon2.on('dragend', this.compute)
        map.setFitView();
      },

      compute() {
        let polygon1_path = this.polygon1.getPath();
        let polygon2_path = this.polygon2.getPath();
        // 小圈是否在大圈内
        let isRingInRing = AMap.GeometryUtil.isRingInRing(polygon2_path, polygon1_path);
        // 两圈是否交叉
        let doesRingRingIntersect = AMap.GeometryUtil.doesRingRingIntersect(polygon2_path, polygon1_path);
        let ringRingClip = AMap.GeometryUtil.ringRingClip(polygon2_path, polygon1_path);
        let ringArea = parseInt(AMap.GeometryUtil.ringArea(ringRingClip))

        let text = '两圈关系：在大圈外';
        if (isRingInRing) {
          text = '两圈关系：在大圈内';
        } else if (doesRingRingIntersect) {
          text = '两圈关系：两圈相交, 交叉区域面积为' + ringArea + '平方米';
        }
        this.textBox.setText(text)
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
