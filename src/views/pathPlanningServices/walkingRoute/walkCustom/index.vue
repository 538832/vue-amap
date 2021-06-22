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

        // 当前示例的目标是展示如何根据规划结果绘制路线，因此walkOption为空对象
        let walkingOption = {}

        // 步行导航
        let walking = new AMap.Walking(walkingOption)

        //根据起终点坐标规划步行路线
        walking.search([116.399028, 39.845042], [116.436281, 39.880719], function (status, result) {
          // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
          if (status === 'complete') {
            if (result.routes && result.routes.length) {
              that.drawRoute(result.routes[0])
              that.$message({
                message: '绘制步行路线完成',
                type: 'success'
              });
            }
          } else {
            that.$message.error('步行路线数据查询失败' + result);
          }
        });
      },

      drawRoute(route) {
        let path = this.parseRouteToPath(route)

        let startMarker = new AMap.Marker({
          position: path[0],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          map: this.map,
          anchor: 'bottom-center',
        })

        let endMarker = new AMap.Marker({
          position: path[path.length - 1],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          map: this.map,
          anchor: 'bottom-center',
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

      // 解析WalkRoute对象，构造成AMap.Polyline的path参数需要的格式
      // WalkRoute对象的结构文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkRoute
      parseRouteToPath(route) {
        let path = [];

        for (let i = 0, l = route.steps.length; i < l; i++) {
          let step = route.steps[i]

          for (let j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j])
          }
        }
        return path;
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
