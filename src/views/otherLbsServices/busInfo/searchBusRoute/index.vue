<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card" style='width:18rem;'>
      <label style='color:grey'>公交线路查询</label>
      <div class="input-item">
        <el-input placeholder="请输入线路名称" size="mini" v-model="busLineName">
          <template slot="prepend">线路名称</template>
        </el-input>
      </div>
      <el-button round type="mini" style="width: 100%;" @click="lineSearch">查询</el-button>
    </div>
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
        busLineName: '996'
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
      this.initAMap();
    },
    methods: {
      initAMap() {
        /*
         * 该示例主要流程分为三个步骤
         * 1. 首先调用公交路线查询服务(lineSearch)
         * 2. 根据返回结果解析，输出解析结果(lineSearch_Callback)
         * 3. 在地图上绘制公交线路()
         */
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],//地图中心点
          zoom: 13 //地图显示的缩放级别
        });
        this.lineSearch();
      },

      /*公交线路查询*/
      lineSearch() {
        let that = this;
        let linesearch;
        if (!that.busLineName) return;
        //实例化公交线路查询类，只取回一条路线
        if (!linesearch) {
          linesearch = new AMap.LineSearch({
            pageIndex: 1,
            city: '北京',
            pageSize: 1,
            extensions: 'all'
          });
        }

        //搜索“996”相关公交线路
        linesearch.search(that.busLineName, function (status, result) {
          that.map.clearMap()
          if (status === 'complete' && result.info === 'OK') {
            that.lineSearch_Callback(result);
          } else {
            this.$message.error('没有搜索到相关公交线路');
          }
        });
      },

      /*公交路线查询服务返回数据解析概况*/
      lineSearch_Callback(data) {
        let lineArr = data.lineInfo;
        let lineNum = data.lineInfo.length;
        if (lineNum == 0) {
        } else {
          for (let i = 0; i < lineNum; i++) {
            let pathArr = lineArr[i].path;
            let stops = lineArr[i].via_stops;
            let startPot = stops[0].location;
            let endPot = stops[stops.length - 1].location;
            if (i == 0) //作为示例，只绘制一条线路
              this.drawbusLine(startPot, endPot, pathArr);

          }
        }
      },

      /*绘制路线*/
      drawbusLine(startPot, endPot, BusArr) {
        let that = this
        //绘制起点，终点
        new AMap.Marker({
          map: that.map,
          position: startPot, //基点位置
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
          zIndex: 10,
          anchor: 'bottom-center',
        });
        new AMap.Marker({
          map: that.map,
          position: endPot, //基点位置
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
          zIndex: 10,
          anchor: 'bottom-center',
        });
        //绘制乘车的路线
        let busPolyline = new AMap.Polyline({
          map: that.map,
          path: BusArr,
          strokeColor: "#09f",//线颜色
          strokeOpacity: 0.8,//线透明度
          isOutline: true,
          outlineColor: 'white',
          strokeWeight: 6//线宽
        });
        // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
        // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
        that.map.setFitView(busPolyline, true, [60, 200, 60, 60]);
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

  .input-card {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    bottom: 30px;
    right: 30px;
    padding: 10px;
  }

  .input-card .input-item {
    margin: 10px 0;
  }
</style>
