<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="panel"></div>
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
        that.map = new AMap.Map("container", {
          center: [116.397559, 39.89621],
          zoom: 14
        });

        let ridingOption = {
          policy: 1
        }

        let riding = new AMap.Riding(ridingOption)

        //根据起终点坐标规划骑行路线
        riding.search([116.397933, 39.844818], [116.440655, 39.878694], function (status, result) {
          // result即是对应的骑行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_RidingResult
          if (status === 'complete') {
            if (result.routes && result.routes.length) {
              that.drawRoute(result.routes[0])
              that.$message({
                message: '绘制骑行路线完成',
                type: 'success'
              });
            }
          } else {
            that.$message.error('骑行路线数据查询失败' + result);
          }
        });
      },

      drawRoute(route) {
        let path = this.parseRouteToPath(route)

        let startMarker = new AMap.Marker({
          position: path[0],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          anchor: 'bottom-center',
          map: this.map
        })

        let endMarker = new AMap.Marker({
          position: path[path.length - 1],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          anchor: 'bottom-center',
          map: this.map
        })

        let routeLine = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeee',
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: '#0091ff',
          strokeOpacity: 0.9,
          lineJoin: 'round'
        })

        this.map.add(routeLine);
        // 调整视野达到最佳显示区域
        this.map.setFitView([startMarker, endMarker, routeLine])
      },

      // 解析RidingRoute对象，构造成AMap.Polyline的path参数需要的格式
      // RidingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_RideRoute
      parseRouteToPath(route) {
        let path = []

        for (let i = 0, l = route.rides.length; i < l; i++) {
          var step = route.rides[i]

          for (let j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j])
          }
        }
        return path
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }

  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 70px;
    right: 20px;
    width: 280px;
  }
</style>
