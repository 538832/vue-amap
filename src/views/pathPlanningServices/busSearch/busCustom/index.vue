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
        let transferOption = {
          city: '北京市',
          nightflag: true, // 是否计算夜班车
          policy: AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
        }

        let transfer = new AMap.Transfer(transferOption)

        //根据起、终点坐标查询公交换乘路线
        transfer.search(new AMap.LngLat(116.291035, 39.907899), new AMap.LngLat(116.427281, 39.903719), function (status, result) {
          // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
          if (status === 'complete') {
            if (result.plans && result.plans.length) {
              that.$message({
                message: '绘制公交路线完成',
                type: 'success'
              });
              that.drawRoute(result.plans[0])
            }

          } else {
            that.$message.error('公交路线数据查询失败' + result);
          }
        });
      },

      drawRoute(route) {
        let startMarker = new AMap.Marker({
          position: route.segments[0].transit.origin,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          map: this.map,
          anchor: 'bottom-center',
        })

        let endMarker = new AMap.Marker({
          position: route.segments[route.segments.length - 1].transit.destination,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          map: this.map,
          anchor: 'bottom-center',
        })

        let routeLines = []

        for (let i = 0, l = route.segments.length; i < l; i++) {
          let segment = route.segments[i]
          let line = null

          // 绘制步行路线
          if (segment.transit_mode === 'WALK') {
            line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: 'grey',
              strokeOpacity: 1.0,
              lineJoin: 'round',
              strokeStyle: 'dashed'
            })


            this.map.add(line);
            routeLines.push(line)
          } else if (segment.transit_mode === 'SUBWAY' || segment.transit_mode === 'BUS') {
            line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: '#0091ff',
              strokeOpacity: 1.0,
              lineJoin: 'round',
              strokeStyle: 'solid'
            })
            this.map.add(line);
            routeLines.push(line)
          } else {
            // 其它transit_mode的情况如RAILWAY、TAXI等，该示例中不做处理
          }
        }

        // 调整视野达到最佳显示区域
        this.map.setFitView([startMarker, endMarker].concat(routeLines))
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
