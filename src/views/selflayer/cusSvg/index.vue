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
        path: null,
        starCenter: [116.306206, 39.975468]
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
        this.map = new AMap.Map('container', {
          center: this.starCenter,
          zoom: 3,
        });

        let size = this.map.getSize();
        let canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        canvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        canvas.setAttribute('width', size.width);
        canvas.setAttribute('height', size.height);

        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.onclick = function () {
          console.log('svg path clicked')
        }
        let styleText = [];
        styleText.push('stroke:red');
        styleText.push('fill:green');
        styleText.push('fill-opacity:0.3');
        this.path.style.cssText = styleText.join(';');

        canvas.appendChild(this.path)
        let customLayer = new AMap.CustomLayer(canvas, {
          // zooms: [3, 8],
          // alwaysRender:true,
          zIndex: 300
        });
        customLayer.render = this.onRender;
        customLayer.setMap(this.map);
      },

      buildPath() {
        let path = [];
        let center = this.map.lngLatToContainer(this.starCenter)

        for (let k = 0; k < 6; k += 1) {
          let ag = Math.PI * 60 / 180 * k
          let x = center.x + Math.cos(ag) * 50
          let y = center.y + Math.sin(ag) * 50
          path.push((k == 0 ? 'M' : 'L') + x + ' ' + y);
        }
        return path.join(' ') + ' Z';
      },

      //更新路径
      onRender() {
        let newPath = this.buildPath();
        this.path.setAttribute('d', newPath);
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
