<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <div class="input-item">
        <label style='color:grey'>公交到达圈查询</label>
        <el-input placeholder="请输入线路名称" size="mini" v-model="lnglat">
          <template slot="prepend">出发位置</template>
        </el-input>
      </div>

      <div class="input-item">
        <label style='color:grey'>时长(分钟)</label>
        <el-slider style="margin: 0 auto" v-model="time" @change="getArriveRange" input-size="mini" :min="1"
                   :max="45"></el-slider>
      </div>

      <div class="input-item">
        <label style='color:grey'>出行方式</label>
        <el-select v-model="travelMode" style="width: 100%;display: block" size="mini" @change="getArriveRange"
                   placeholder="请选择出行方式">
          <el-option label="地铁+公交" value="SUBWAY,BUS"></el-option>
          <el-option label="地铁" value="SUBWAY"></el-option>
          <el-option label="公交" value="BUS"></el-option>
        </el-select>
      </div>

      <div class="btn">
        <el-button style="width: 100px;" round type="mini" @click="getArriveRange">查询</el-button>
        <el-button style="width: 100px;" round type="mini" @click="clear">清除</el-button>
      </div>
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
        lnglat: '116.397428, 39.90923',
        time: 30,
        travelMode: 'SUBWAY,BUS',
        arrivalRange: null,
        polygons: [],
        centerMarker: null
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
        this.map = new AMap.Map("container", {
          zoomEnable: true,
          center: [116.397428, 39.90923],
          zoom: 10
        });
        this.map.on('click', this.getLnglat);
        this.getArriveRange();
      },

      clear() {
        this.map.remove(this.polygons)
      },

      getLnglat(e) {
        let lnglat = e.lnglat;
        this.lnglat = e.lnglat.toString()
        this.getArriveRange();
      },

      addCenterMarker(position) {
        let that = this
        if (that.centerMarker == null) {
          that.centerMarker = new AMap.Marker({
            map: that.map,
            position: position
          });
        } else {
          that.centerMarker.setPosition(position)
        }
      },
      //添加多边形覆盖物
      getArriveRange() {
        let that = this;
        if (!that.arrivalRange) {
          that.arrivalRange = new AMap.ArrivalRange()
        }
        let lnglat = that.lnglat.split(',');
        let t = that.time;
        let v = that.travelMode;

        that.addCenterMarker(lnglat);

        that.arrivalRange.search(lnglat, t, function (status, result) {
          that.map.remove(that.polygons);
          that.polygons = [];
          if (result.bounds) {
            for (let i = 0; i < result.bounds.length; i++) {
              let polygon = new AMap.Polygon({
                fillColor: "#3366FF",
                fillOpacity: "0.4",
                strokeColor: "#00FF00",
                strokeOpacity: "0.5",
                strokeWeight: 1
              });
              polygon.setPath(result.bounds[i]);
              that.polygons.push(polygon);
            }
            that.map.add(that.polygons);
            that.map.setFitView();
          }
        }, {
          policy: v
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

  .input-card {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    bottom: 30px;
    right: 30px;
    padding: 10px;
    width: 300px;
  }

  .input-card .input-item {
    margin: 10px;
  }

  .input-card .input-item label {
    display: inline-block;
    margin-bottom: 5px;
  }

  .btn {
    margin-top: 20px;
    text-align: center;
  }
</style>
