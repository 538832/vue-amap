<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="legend input-item" id="legend">
      <ul>
        <li>
          <span class="colorBox" style="background: #ffffb2;"></span> > 100
        </li>
        <li>
          <span class="colorBox" style="background: #fed976;"></span> > 500
        </li>
        <li>
          <span class="colorBox" style="background: #feb24c;"></span> > 1000
        </li>
        <li>
          <span class="colorBox" style="background: #fd8d3c;"></span> > 5000
        </li>
        <li>
          <span class="colorBox" style="background: #f03b20;"></span> > 10000
        </li>
        <li>
          <span class="colorBox" style="background: #bd0026;"></span> > 30000
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {districtWorld} from '@/utils/con_virus'

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
        let counts = [30000, 10000, 5000, 1000, 500, 100];
        let color = ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'].reverse();

        let dis = new AMap.DistrictLayer.World({
          zIndex: 10,
          styles: {
            'stroke-width': 0.8,
            'fill': function (d) {
              //districtWorld是自定义js中的变量 存放的是各个国家
              let country = districtWorld.find(c => {
                return c.name == d.NAME_CHN;
              });

              if (!country) {
                return '#f0f0f0';
              }
              country = country.qz;
              if (country > counts[0]) {
                return color[0];
              } else if (country > counts[1]) {
                return color[1];
              } else if (country > counts[2]) {
                return color[2];
              } else if (country > counts[3]) {
                return color[3];
              } else if (country > counts[4]) {
                return color[4];
              } else {
                return color[5];
              }
            },
            'city-stroke': '#fff',
            'county-stroke': function (d) {
              if (d.type === 'Nation_Border_China') {
                return 'red';
              }
              return '#fff';
            },
            'province-stroke': '#fff',
            'coastline-stroke': function (d) {
              if (d.type === 'Coastline_China') {
                return 'rgb(189,0,38)';
              }
              return 'rgba(0,0,0,0)';
            },
            'nation-stroke': function (d) {
              if (d.type === 'Nation_Border_China') {
                return '#f768a1';
              }
              return '#fff';
            },
          }
        });

        let map = new AMap.Map('container', {
          layers: [
            dis,
          ],
          center: [170.451348, 43.792165],
          zoom: 2,
          viewMode: '3D',
          showLabel: false,
        });
        map.addControl(new AMap.Scale());
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
    padding: 10px 0;
    width: 140px;
    height: 200px;
    left: 30px;
    bottom: 80px;
  }

  .input-item ul li {
    margin: 10px 0;
    list-style-type: none;
  }

  .colorBox {
    display: inline-block;
    width: 15px;
    height: 15px;
  }
</style>
