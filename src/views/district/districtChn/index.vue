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
        colors: {}
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
        let disCountry = new AMap.DistrictLayer.Country({
          zIndex: 10,
          SOC: 'CHN',
          depth: 2,
          styles: {
            'nation-stroke': '#22ffff',
            'coastline-stroke': [0.85, 0.63, 0.94, 1],
            'province-stroke': 'white',
            'city-stroke': 'rgba(255,255,255,0.15)',//中国特有字段
            'fill': function (props) {//中国特有字段
              return that.getColorByDGP(props.adcode_pro)
            }
          }
        })

        let map = new AMap.Map("container", {
          zooms: [3, 10],
          showIndoorMap: false,
          zoom: 3,
          isHotspot: false,
          defaultCursor: 'pointer',
          touchZoomCenter: 1,
          pitch: 0,
          layers: [
            disCountry,
            new AMap.TileLayer.Satellite()
          ],
          viewMode: '3D',
        })
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar({liteStyle: true}));
      },
      getColorByDGP(adcode) {
        let GDPSpeed = {
          '520000': 10,//贵州
          '540000': 10,//西藏
          '530000': 8.5,//云南
          '500000': 8.5,//重庆
          '360000': 8.5,//江西
          '340000': 8.0,//安徽
          '510000': 7.5,//四川
          '350000': 8.5,//福建
          '430000': 8.0,//湖南
          '420000': 7.5, //湖北
          '410000': 7.5,//河南
          '330000': 7.0,//浙江
          '640000': 7.5,//宁夏
          '650000': 7.0,//新疆
          '440000': 7.0,//广东
          '370000': 7.0,//山东
          '450000': 7.3,//广西
          '630000': 7.0,//青海
          '320000': 7.0,//江苏
          '140000': 6.5,//山西
          '460000': 7,// 海南
          '310000': 6.5,//上海
          '110000': 6.5, // 北京
          '130000': 6.5, // 河北
          '230000': 6, // 黑龙江
          '220000': 6,// 吉林
          '210000': 6.5, //辽宁
          '150000': 6.5,//内蒙古
          '120000': 5,// 天津
          '620000': 6,// 甘肃
          '610000': 8.5,// 甘肃
          '710000': 2.64, //台湾
          '810000': 3.0, //香港
          '820000': 4.7 //澳门

        }
        if (!this.colors[adcode]) {
          let gdp = GDPSpeed[adcode];
          if (!gdp) {
            this.colors[adcode] = 'rgb(227,227,227)'
          } else {
            let rg = 255 - Math.floor((gdp - 5) / 5 * 255);
            this.colors[adcode] = 'rgb(' + rg + ',' + rg + ',255)';
          }
        }
        return this.colors[adcode]
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
