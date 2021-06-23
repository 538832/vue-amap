<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <label style='color:grey'>下属行政区查询</label>
      <div class="input-item">
        <span class="input-item-text">省市区</span>
        <el-cascader size="mini" @change="handlePolygon" v-model="city"
                     :options="options"
                     placeholder="请选择省市区"
                     :props="{ checkStrictly: true }"
                     clearable></el-cascader>
      </div>
      <el-button round style="width: 100%;" size="mini" @click="handlePolygon">查询</el-button>
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
        city: [],
        options: []
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
        this.map = new AMap.Map('container', {
          center: [116.30946, 39.937629],
          zoom: 3
        });
        //行政区划查询
        this.district = new AMap.DistrictSearch({
          subdistrict: 3,   // 0：不返回下级行政区 1：返回下一级行政区 2：返回下两级行政区 3：返回下三级行政区
          showbiz: false  //最后一级返回街道信息
        });//注意：需要使用插件同步下发功能才能这样直接使用
        this.district.search('中国', function (status, result) {
          if (status == 'complete') {
            let subList = result.districtList[0].districtList;
            /*
                利用级联  subList 数组 -> json 进行替换 -> 数组
                因为citycode只到县区一级 描边又无法描出乡镇 又因最多只能返回下三级 所以这里我只用三级联动
                如果实在是想显示四级,可以把省份单独抽出来也可以实现
                这里太烧脑 陆陆续续写了一天 暂时就这样吧
             */
            that.options = JSON.parse(JSON.stringify(subList).replace(/adcode/g, "value").replace(/name/g, "label").replace(/districtList/g, "children"))
          }
        });
      },

      //绘制河南省边界线
      handlePolygon() {
        let that = this;
        that.map.clearMap()
        let keyword;
        if (this.city.length > 0) {
          keyword = this.city[this.city.length - 1]
        }
        // 创建行政区查询对象
        let district = new AMap.DistrictSearch({
          // 返回行政区边界坐标等具体信息
          extensions: 'all',
          // 设置查询行政区级别为 区
          level: 'district'
        })

        district.search(keyword, function (status, result) {
          // 获取朝阳区的边界信息
          let bounds = result.districtList[0].boundaries
          let polygons = []
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              let polygon = new AMap.Polygon({
                map: that.map,
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.7,
                fillColor: '#CCF3FF',
                strokeColor: '#CC66CC'
              })
              polygons.push(polygon)
            }
            // 地图自适应
            that.map.setFitView()
          }
        })
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
    top: 30px;
    left: 30px;
    padding: 10px;
    width: 300px;
  }

  .input-card .input-item {
    margin: 10px 0;
  }

  .input-item .input-item-text {
    display: inline-block;
    width: 60px;
  }
</style>
