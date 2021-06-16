<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>选择国家：</h5>
      <el-select v-model="soc" placeholder="请选择" @change="changeSOC">
        <el-option label="俄罗斯" value="RUS"></el-option>
        <el-option label="美国" value="USA"></el-option>
        <el-option label="日本" value="JPN"></el-option>
      </el-select>

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
        disCountry: null,
        soc: 'RUS'
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

        that.disCountry = new AMap.DistrictLayer.Country({
          zIndex: 10,
          SOC: 'RUS',
          depth: 1,
          styles: {
            'nation-stroke': '#22ffff',
            'coastline-stroke': [0.85, 0.63, 0.94, 1],
            'province-stroke': 'white',
            'fill': function (props) {
              return that.getColorByRandom()
            }
          }
        })

        that.map = new AMap.Map("container", {
          zooms: [2, 10],
          center: [93.729504, 68.718195],
          showIndoorMap: false,
          zoom: 3,
          isHotspot: false,
          defaultCursor: 'pointer',
          touchZoomCenter: 1,
          pitch: 0,
          layers: [
            that.disCountry,
            AMap.createDefaultLayer()
          ],
          viewMode: '3D',
        });

        that.map.addControl(new AMap.Scale());
        that.map.addControl(new AMap.ToolBar({offset: new AMap.Pixel(10, 180)}));
      },

      getColorByRandom() {
        let rg = Math.random() * 155 + 50;
        return 'rgb(' + rg + ',' + rg + ',255)';
      },

      changeSOC() {
        let centers = {
          'RUS': [93.729504, 68.718195],
          'USA': [-113.877655, 52.652266],
          'JPN': [136.824904, 38.00712]
        }
        this.disCountry.setSOC(this.soc);
        this.map.setCenter(centers[this.soc])
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
