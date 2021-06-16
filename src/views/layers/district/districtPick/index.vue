<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h4>国家/地区</h4>
      <p>中文名字：<span v-text="name">--</span></p>
      <p>英文名字：<span v-text="engName"></span></p>
      <p>SOC：<span v-text="soc"></span></p>
      <hr>
      <p>点击地图任意陆地区域</p>
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
        disWorld: null,
        name: '',
        engName: '',
        soc: ''
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
        let nationStroke = 'rgba(20, 20, 120, 0.6)';
        let nationFill = 'rgba(20, 120, 230, 0.3)';

        // 绘制世界地图国家轮廓
        let disWorld = new AMap.DistrictLayer.World({
          zIndex: 10,
          styles: {
            // 颜色格式: #RRGGBB、rgba()、rgb()、[r, g, b, a]
            // 国境线
            //'nation-stroke': nationStroke,
            // 海岸线
            //'coastline-stroke': '',
            // 填充
            'fill': function (props) {
              if (props.SOC == 'CHN') {
                that.updateInfo(props);
                return nationFill;
              } else {
                return 'white'
              }
            }
          }
        });

        that.map = new AMap.Map('container', {
          zooms: [3, 18],
          center: [110, 30],
          showIndoorMap: false,
          zoom: 3,
          isHotspot: false,
          defaultCursor: 'pointer',
          touchZoomCenter: 1,
          pitch: 0,
          layers: [
            disWorld
          ],
          viewMode: '3D',
        });

        that.map.on('click', function (ev) {
          var px = ev.pixel;
          // 拾取所在位置的行政区
          var props = disWorld.getDistrictByContainerPos(px);

          if (props) {
            var SOC = props.SOC;
            if (SOC) {
              // 重置行政区样式
              disWorld.setStyles({
                // 国境线
                //nation-stroke': nationStroke,
                // 海岸线
                //'coastline-stroke': '',
                'fill': function (props) {
                  return props.SOC == SOC ? nationFill : 'white';
                }
              });
              that.updateInfo(props);
            }


          }
        });
        document.getElementsByClassName('amap-mcode')[0].innerHTML = '-GS(2019)756号'

      },
      updateInfo(props) {
        this.name = props.NAME_CHN;
        this.engName = props.NAME_ENG;
        this.soc = props.SOC;
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
    width: 240px;
    right: 30px;
    top: 30px;
  }
</style>
