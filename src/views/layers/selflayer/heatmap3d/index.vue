<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <!--TODO: 热度 高度的曲线太复杂, 暂时不做-->
    <!--<div class="graph">
      <h2>heightBezier:</h2>
      <input type="text" id="bezierInp" readonly="readonly"/>
      <figure>
        <canvas id="curve" width="210" height="550"></canvas>
        <figcaption id="axisHeat">热度</figcaption>
        <figcaption id="axisHeight">高度</figcaption>
      </figure>
    </div>-->
  </div>
</template>

<script>
  import {heatmapData} from '@/utils/amap/heatmapData'
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        heatmap: null
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
        let map = new AMap.Map("container", {
          viewMode: '3D',
          pitch: 70,
          resizeEnable: true,
          center: [116.418261, 39.921984],
          zoom: 11.5
        });

        map.addControl(new AMap.ControlBar({}));

        let heatmapOpts = {
          //3d 相关的参数
          '3d': {
            //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
            heightBezier: [0.4, 0.2, 0.4, 0.8],
            //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
            gridSize: 2,
            heightScale: 1
          }
        };

        //初始化heatmap对象
        let heatmap = new AMap.HeatMap(map, heatmapOpts);

        heatmap.setDataSet({
          data: heatmapData,
          max: 100
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

  /* .graph {
     position: absolute;
     background: white;
     padding: 10px;
     right: 30px;
     bottom: 30px;
   }*/

  .graph {
    font-size: 13px;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px 10px 10px 25px;
    border: 1px solid #ccc;
    z-index: 99999;
    background: #fff;
  }

  h2 {
    margin: 3px 0;
  }

  canvas {
    display: block;
  }

  figure {
    display: block;
    position: relative;
    width: 200px;
    margin: 0;
  }

  figcaption {
    display: block;
    position: absolute;
  }

  #axisHeight {
    left: -23px;
    top: 210px;
    transform: rotate(-90deg);
  }

  #axisHeat {
    left: 100px;
    top: 335px;
  }

  #bezierInp {
    width: 200px;
    box-sizing: border-box;
    background: #eee;
    border: 1px solid #ccc;
    padding: 2px 3px;
    font-size: 14px;
  }


</style>
