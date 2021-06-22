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

        let transferOption = {
          map: map,
          nightflag: true, // 是否计算夜班车
          city: '北京市',
          panel: 'panel',
          outlineColor: '#ffeeee',
          autoFitView: true,
          policy: AMap.TransferPolicy.LEAST_TIME // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
        }

        let transfer = new AMap.Transfer(transferOption)

        //根据起、终点坐标查询公交换乘路线
        transfer.search(new AMap.LngLat(116.291035, 39.907899), new AMap.LngLat(116.427281, 39.903719), function (status, result) {
          // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
          if (status === 'complete') {
            that.$message({
              message: '公交路线数据查询成功',
              type: 'success'
            });
          } else {
            that.$message.error('公交路线数据查询失败' + result);
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
