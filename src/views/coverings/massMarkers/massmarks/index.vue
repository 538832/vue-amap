<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>海量点效果切换</h5>
      <el-button size="mini" round @click="setStyle(0)">单一图标</el-button>
      <el-button size="mini" round @click="setStyle(1)">多个图标</el-button>
    </div>
  </div>
</template>

<script>
  import {citys} from '@/utils/amap/citys.js'

  export default {
    name: "index",

    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        style: [],
        mass: null
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
          zoom: 4,
          center: [102.342785, 35.312316],
          showIndoorMap: false,
          viewMode: '3D',
        });

        // JSAPI 2.0 支持显示设置 zIndex, zIndex 越大约靠前，默认按顺序排列
        this.style = [{
          url: 'https://webapi.amap.com/images/mass/mass0.png',
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(11, 11),
          zIndex: 3,
        }, {
          url: 'https://webapi.amap.com/images/mass/mass1.png',
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(7, 7),
          zIndex: 2,
        }, {
          url: 'https://webapi.amap.com/images/mass/mass2.png',
          anchor: new AMap.Pixel(3, 3),
          size: new AMap.Size(5, 5),
          zIndex: 1,
        }
        ];

        this.mass = new AMap.MassMarks(citys, {
          opacity: 0.8,
          zIndex: 111,
          cursor: 'pointer',
          style: this.style
        });

        let marker = new AMap.Marker({content: ' ', map: map});

        this.mass.on('mouseover', function (e) {

          marker.setPosition(e.data.lnglat);
          marker.setLabel({content: e.data.name})
        });

        this.mass.setMap(map);

      },
      setStyle(multiIcon) {
        if (multiIcon) {
          this.mass.setStyle(this.style);
        } else {
          this.mass.setStyle(this.style[2]);
        }
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
</style>
