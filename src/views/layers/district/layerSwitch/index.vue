<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-button size="mini" round @click="addLayer">添加图层</el-button>
      <el-button size="mini" round @click="rmLayer">移除图层</el-button>
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
        disWorld: null
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
        // 绘制世界地图国家轮廓
        this.disWorld = new AMap.DistrictLayer.World({
          zIndex: 10,
          styles: {
            // 颜色格式: #RRGGBB、rgba()、rgb()、[r, g, b, a]
            // 国境线
            'nation-stroke': 'rgba(20, 20, 233, 0.6)',
            // 海岸线
            'coastline-stroke': '',
            // 填充
            'fill': ''
          }
        });

        let defaultLayer = new AMap.createDefaultLayer();

        this.map = new AMap.Map('container', {
          zooms: [3, 15],
          center: [0, 20],
          showIndoorMap: false,
          zoom: 3,
          isHotspot: false,
          defaultCursor: 'pointer',
          touchZoomCenter: 1,
          pitch: 0,
//        mapStyle: 'amap://styles/midnight',
          layers: [
            defaultLayer,
            this.disWorld,
          ],
          viewMode: '3D',
        });
        document.getElementsByClassName('amap-mcode')[0].innerHTML = '- GS(2019)6379号、GS(2019)756号'
      },
      addLayer() {
        this.disWorld.setMap(this.map);
        document.getElementsByClassName('amap-mcode')[0].innerHTML = '- GS(2019)6379号、GS(2019)756号'

      },
      rmLayer() {
        this.disWorld.setMap(null);
        document.getElementsByClassName('amap-mcode')[0].innerHTML = '- GS(2019)6379号'
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
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }
</style>
