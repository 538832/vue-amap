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
        map: null
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
        let opts = {
          subdistrict: 0,   //返回下一级行政区
          extensions: 'all',  //返回行政区边界坐标组等具体信息
        };
        //实例化DistrictSearch
        let district = new AMap.DistrictSearch(opts);
        district.search('中国', function (status, result) {
          let bounds = result.districtList[0].boundaries;
          let mask = []
          for (let i = 0; i < bounds.length; i += 1) {
            mask.push([bounds[i]])
          }
          let disCountry = new AMap.DistrictLayer.World({
            zIndex: 1,
            rejectMapMask: true
          })
          let map = new AMap.Map('container', {
            mask: mask,
            center: [116.472804, 39.995725],

            viewMode: '3D',
            labelzIndex: 130,
            zoom: 3,
            cursor: 'pointer',
            layers: [
              new AMap.TileLayer.RoadNet({
                zIndex: 7
              }),
              disCountry,
              new AMap.TileLayer.Satellite()
            ]
          });
        })
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
</style>
