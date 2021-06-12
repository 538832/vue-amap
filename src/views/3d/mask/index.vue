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
        map: null,
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
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
          subdistrict: 0,
          extensions: 'all',
          level: 'city'
        };
        //利用行政区查询获取边界构建mask路径
        //也可以直接通过经纬度构建mask路径
        let district = new AMap.DistrictSearch(opts);
        district.search('北京市', function (status, result) {
          let bounds = result.districtList[0].boundaries;
          let mask = []
          for (let i = 0; i < bounds.length; i += 1) {
            mask.push([bounds[i]])
          }
          let map = new AMap.Map('container', {
            mask: mask,
            center: [116.472804, 39.995725],
            viewMode: '3D',
            showLabel: false,
            labelzIndex: 130,
            pitch: 40,
            zoom: 9,
            layers: [
              new AMap.TileLayer.RoadNet({
                //rejectMapMask:true
              }),
              new AMap.TileLayer.Satellite()
            ]
          });
          let maskerIn = new AMap.Marker({
            position: [116.501415, 39.926055],
            map: map
          })
          let maskerOut = new AMap.Marker({//区域外的不会显示
            position: [117.001415, 39.926055],
            map: map
          })
          //添加描边
          for (let i = 0; i < bounds.length; i += 1) {
            new AMap.Polyline({
              path: bounds[i],
              strokeColor: '#99ffff',
              strokeWeight: 4,
              map: map
            })
          }
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
</style>
