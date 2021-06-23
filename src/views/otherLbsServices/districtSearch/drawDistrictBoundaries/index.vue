<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <label style='color:grey'>行政区边界查询</label>
      <div class="input-item">
        <span class="input-item-text">行政级别</span>
        <el-select size="mini" style="width: 200px;" v-model="level"  @change="drawBounds" placeholder="请选择">
          <el-option label="district" value="district"></el-option>
          <el-option label="city" value="city"></el-option>
          <el-option label="province" value="province"></el-option>
        </el-select>
      </div>
      <div class="input-item">
        <span class="input-item-text">名称/adcode</span>
        <el-input size="mini" v-model="district" style="width: 200px;" @keydown.enter.native="draw"
                  placeholder="请输入内容"></el-input>
      </div>
      <el-button round style="width: 100%;" size="mini" @click="drawBounds">查询</el-button>
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
        level: 'district',
        district: '朝阳区',
        polygons: []
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
        this.map = new AMap.Map("container", {
          center: [116.397428, 39.90923],//地图中心点
          zoom: 10 //地图显示的缩放级别
        });
        this.drawBounds();
      },

      draw(e) {
        if (e.keyCode === 13) {
          this.drawBounds();
          return false;
        }
        return true;
      },

      drawBounds() {
        let that = this;
        //清除上次结果
        //that.map.remove(that.polygons)
        let district = null;
        //加载行政区划插件
        if (!district) {
          //实例化DistrictSearch
          let opts = {
            subdistrict: 0,   //获取边界不需要返回下级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: 'district'  //查询行政级别为 市
          };
          district = new AMap.DistrictSearch(opts);
        }
        //行政区查询
        district.setLevel(that.level)
        district.search(that.district, function (status, result) {
          that.map.remove(that.polygons)//清除上次结果
          that.polygons = [];

          let bounds = result.districtList[0].boundaries;
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              let polygon = new AMap.Polygon({
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.4,
                fillColor: '#80d8ff',
                strokeColor: '#0091ea'
              });
              that.polygons.push(polygon);
            }
          }
          that.map.add(that.polygons)
          that.map.setFitView(that.polygons);//视口自适应
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
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    bottom: 30px;
    right: 30px;
    padding: 10px;
  }

  .input-card .input-item {
    margin: 10px;
  }

  .input-item .input-item-text {
    display: inline-block;
    width: 100px;
  }
</style>
