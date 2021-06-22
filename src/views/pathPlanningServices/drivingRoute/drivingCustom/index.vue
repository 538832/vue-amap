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
        let that = this;
        this.map = new AMap.Map("container", {
          center: [116.397559, 39.89621],
          zoom: 14
        });

        let drivingOption = {
          policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
          ferry: 1, // 是否可以使用轮渡
          province: '京', // 车牌省份的汉字缩写
        }

        // 构造路线导航类
        let driving = new AMap.Driving(drivingOption)

        // 根据起终点经纬度规划驾车导航路线
        driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function (status, result) {
          // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            if (result.routes && result.routes.length) {
              // 绘制第一条路线，也可以按需求绘制其它几条路线
              that.drawRoute(result.routes[0])
              that.$message({
                message: '绘制驾车路线完成',
                type: 'success'
              });
            }
          } else {
            that.$message.error('获取驾车数据失败' + result);
          }
        });
      },
      drawRoute(route) {
        let path = this.parseRouteToPath(route)

        let startMarker = new AMap.Marker({
          position: path[0],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          map: this.map
        })

        let endMarker = new AMap.Marker({
          position: path[path.length - 1],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          map: this.map
        })

        let routeLine = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeee',
          borderWeight: 2,
          strokeWeight: 5,
          strokeOpacity: 0.9,
          strokeColor: '#0091ff',
          lineJoin: 'round'
        })

        this.map.add(routeLine);

        // 调整视野达到最佳显示区域
        this.map.setFitView([startMarker, endMarker, routeLine])
      },

      // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
      // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
      parseRouteToPath(route) {
        let path = []
        for (let i = 0, l = route.steps.length; i < l; i++) {
          let step = route.steps[i]
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
