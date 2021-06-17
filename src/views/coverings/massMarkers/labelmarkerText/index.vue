<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      全国累计确诊病例分布<span style="font-size: 14px;">（截止 3月30日）</span>
    </div>
  </div>
</template>

<script>
  import {citiesData} from '@/utils/amap/cities.js'
  import {yiqingCountryData, yiqingChinaData} from '@/utils/amap/yiqing-data.js'

  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        allowCollision: false,
        layer: null,
        disabled1: false,
        disabled2: true
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
        let icon = {
          type: 'image',
          image: 'https://a.amap.com/jsapi_demos/static/demo-center/marker/express2.png',
          size: [64, 30],
          anchor: 'center',
        };
        let textStyle = {
          fontSize: 12,
          fontWeight: 'normal',
          fillColor: '#fff',
          // fillColor: 'rgb(255, 215, 0)',
          // strokeColor: '#fff',
          // strokeWidth: 2,
          // fold: true,
          padding: '2, 5',
          backgroundColor: 'rgb(246,137,38)',
          borderColor: '#fff',
          borderWidth: 1,
        };
        let LabelsData = [
          {
            name: '自提点1',
            position: [116.461009, 39.991443],
            zooms: [10, 20],
            opacity: 1,
            zIndex: 10,
            icon,
            text: {
              content: '中邮速递易',
              direction: 'right',
              offset: [-20, -5],
              style: textStyle
            }
          },
        ];


        let map = new AMap.Map('container', {
          zoom: 4.5,
          center: [109.610747, 35.15261],
          viewMode: '3D',
          // pitch: 60,
          // mapStyle: 'amap://styles/whitesmoke',
          showIndoorMap: false,
          showLabel: false,
          // mapStyle: 'amap://styles/dark',
          mapStyle: 'amap://styles/fresh',
        });
        let bgImage = document.getElementById('bgImage');
        let bgCanvas;
        let bgCanvasCtx;

        let markers = [];
        let layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 1000,
          collision: false,
          allowCollision: false,
        });
        layer.add(markers);
        // 图层添加到地图
        map.add(layer);

        let provinces = yiqingChinaData.provinces || [];
        let cityNames = [];
        let specialCity = ['北京', '上海', '天津', '重庆'];


        // 初始化 labelMarker
        for (let provice of provinces) {
          let cities = provice.cities || [];

          if (specialCity.indexOf(provice.name) !== -1) {
            let totalNumber = 0;
            for (const city of cities) {
              totalNumber += city.confirmedNum;
            }
            cities = [{
              name: provice.name,
              confirmedNum: totalNumber,
            }];
          }
          for (let city of cities) {
            cityNames.push(city.name);
            let curCityData = this.findInCities(city.name);
            let number = city.confirmedNum;
            if (curCityData && number) {
              let color = this.getColorByNumber(number);
              textStyle.backgroundColor = color;
              let marker = new AMap.LabelMarker({
                name: city.name,
                position: [curCityData.x, curCityData.y],
                zIndex: number,
                text: {
                  content: city.name + ': ' + city.confirmedNum,
                  direction: 'center',
                  style: textStyle,
                }
              });
              markers.push(marker);
            }
          }
        }

        layer.add(markers);
      },

      findInCities(name) {
        for (const city of citiesData) {
          if (name === city.name) {
            return city;
          }
        }
      },

      getColorByNumber(number) {
        let colorLegend = {
          // 10: '#fde7a9',
          10: '#f9c02f',
          100: '#f5a54f',
          500: '#f18334',
          1000: '#cc5f42',
          5000: '#a94d36',
          100000: '#792a17',
        };
        let color;

        for (let key in colorLegend) {
          if (colorLegend.hasOwnProperty(key)) {
            if (number < parseInt(key)) {
              color = colorLegend[key];
              break;
            }
          }
        }
        return color;
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
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }

  .info {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    top: 30px;
    touch-action: none;
    color: rgb(255, 255, 255);
    background: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    transform: translate(0px, 10px);
  }
</style>
