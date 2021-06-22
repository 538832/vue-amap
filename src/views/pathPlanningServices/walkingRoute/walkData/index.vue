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
        let map = new AMap.Map("container", {
          center: [116.397559, 39.89621],
          zoom: 14
        });

        let walkOption = {
          map: map,
          panel: "panel",
          hideMarkers: false,
          isOutline: true,
          outlineColor: '#ffeeee',
          autoFitView: true
        }

        // 步行导航
        let walking = new AMap.Walking(walkOption)

        //根据起终点坐标规划步行路线
        walking.search([116.399028, 39.845042], [116.436281, 39.880719], function (status, result) {
          // result即是对应的不行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_RidingResult
          if (status === 'complete') {
            that.$message({
              message: '步行路线数据查询成功',
              type: 'success'
            });
          } else {
            that.$message.error('步行路线数据查询失败' + result);
          }
        });
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
