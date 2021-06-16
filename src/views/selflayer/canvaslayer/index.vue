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
        canvas: null,
        context: null,
        canvasLayer: null
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
        var that = this;
        this.map = new AMap.Map('container', {
          viewMode: "3D",
          zoom: 15,
          center: [116.335183, 39.941735]
        });

        //添加地图组件
        let bar = new AMap.ControlBar();
        this.map.addControl(bar);

        //添加Canvas图层
        let canvas = document.createElement('canvas');
        canvas.width = canvas.height = 200;

        let context = canvas.getContext('2d')
        context.fillStyle = 'rgb(0,100,255)';
        context.strokeStyle = 'white';
        context.globalAlpha = 1;
        context.lineWidth = 2;

        let radious = 0;
        let draw = function () {
          context.clearRect(0, 0, 200, 200)
          context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
          radious = (radious + 1) % 100;

          context.beginPath();
          context.arc(100, 100, radious, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
          // 刷新渲染图层
          CanvasLayer.reFresh();
          AMap.Util.requestAnimFrame(draw);
        };

        let CanvasLayer = new AMap.CanvasLayer({
          canvas: canvas,
          bounds: new AMap.Bounds(
            [116.328911, 39.937229],
            [116.342659, 39.946275]
          ),
          zooms: [3, 18],
        });

        this.map.addLayer(CanvasLayer);
        draw();

        //添加Canvas图层 TODO: 拆分出来后无法控制其大小, 暂时使用示例方法, 后期研究
        /*this.canvas = document.createElement('canvas');
        this.canvas.width = 200;
        this.canvas.height = 200;

        this.context = this.canvas.getContext('2d')
        this.context.fillStyle = 'rgb(0,100,255)';
        this.context.strokeStyle = 'white';
        this.context.globalAlpha = 1;
        this.context.lineWidth = 2;

        this.canvasLayer = new AMap.CanvasLayer({
          canvas: this.canvas,
          bounds: new AMap.Bounds(
            [116.328911, 39.937229],
            [116.342659, 39.946275]
          ),
          zooms: [3, 18],
        });

        this.map.addLayer(this.canvasLayer);

        this.addCanvas();*/
      },


      //添加Canvas图层
      addCanvas() {
        let radious = 0;
        this.context.clearRect(0, 0, 200, 200)
        this.context.globalAlpha = (this.context.globalAlpha - 0.01 + 1) % 1;
        radious = (radious + 1) % 100;

        this.context.beginPath();
        this.context.arc(100, 100, radious, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();

        // 刷新渲染图层
        this.canvasLayer.reFresh();
        AMap.Util.requestAnimFrame(this.addCanvas);
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
