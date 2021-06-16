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
        this.map = new AMap.Map('container', {
          center: [116.306206, 39.975468],
          zooms: [2, 10],
          zoom: 3
        });

        this.getData(this.addLayer);
      },

      getData(callback) {
        AMap.plugin('AMap.DistrictSearch', function () {
          let search = new AMap.DistrictSearch();
          search.search('中国', function (status, data) {
            if (status === 'complete') {
              let positions = []
              let provinces = data['districtList'][0]['districtList']
              for (let i = 0; i < provinces.length; i += 1) {
                positions.push({
                  center: provinces[i].center,
                  radius: Math.max(2, Math.floor(Math.random() * 10))
                })
              }
              callback(positions)
            }
          });
        });
      },

      addLayer(positions) {
        let canvas = document.createElement('canvas');
        let customLayer = new AMap.CustomLayer(canvas, {
          zooms: [3, 10],
          zIndex: 120
        });
        let onRender = function () {
          let retina = AMap.Browser.retina;
          let size = this.map.getSize();//resize
          let width = size.width;
          let height = size.height;
          canvas.style.width = width + 'px'
          canvas.style.height = height + 'px'
          if (retina) {//高清适配
            width *= 2;
            height *= 2;
          }
          canvas.width = width;
          canvas.height = height;//清除画布
          let ctx = canvas.getContext("2d");
          ctx.fillStyle = '#08f';
          ctx.strokeStyle = '#fff';
          ctx.beginPath();
          for (let i = 0; i < positions.length; i += 1) {
            let center = positions[i].center;
            let pos = this.map.lngLatToContainer(center);
            let r = positions[i].radius;
            if (retina) {
              pos = pos.multiplyBy(2);
              // pos.x *= 2;
              // pos.y *= 2;
              r *= 2
            }
            ctx.moveTo(pos.x + r, pos.y)
            ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
          }
          ctx.lineWidth = retina ? 6 : 3
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }
        customLayer.render = onRender;
        customLayer.setMap(this.map);
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
