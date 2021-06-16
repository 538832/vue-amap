<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  import * as createREGL from '@/utils/amap/regl'

  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        meshes: []

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
          center: [116.54, 39.79],
          zooms: [2, 20],
          zoom: 14,
          viewMode: '3D',
          pitch: 50,
        });

        let regl;
        let draw;
        // 数据转换工具
        let customCoords = map.customCoords;
        // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
        let data = customCoords.lngLatsToCoords([
          [116.52, 39.79],
          [116.54, 39.79],
          [116.56, 39.79],
        ]);

        // 创建 GL 图层
        let gllayer = new AMap.GLCustomLayer({
          // 图层的层级
          zIndex: 10,
          // 初始化的操作，创建图层过程中执行一次。
          init: (gl) => {
            regl = createREGL({
              gl,
            });
            draw = regl({
              frag: `
                    precision mediump float;
                    uniform vec4 color;
                    void main() {
                        gl_FragColor = color;
                    }`,
              vert: `
                    precision mediump float;
                    attribute vec2 position;
                    uniform mat4 mvp;
                    void main() {
                        gl_Position = mvp * vec4(position, 0, 1);
                        gl_PointSize = 100.;
                    }`,
              attributes: {
                position: regl.buffer(data),
              },
              primitive: 'points',
              uniforms: {
                color: [0.2, 0.4, 0.7, 1],
                mvp: regl.prop('mvp'),
              },
              count: 3,
            })
          },
          render: () => {
            // 这里必须执行！！重新设置 three 的 gl 上下文状态。
            regl._refresh();
            draw({
              mvp: customCoords.getMVPMatrix()
            });
          },
        });
        map.add(gllayer);
      },
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
