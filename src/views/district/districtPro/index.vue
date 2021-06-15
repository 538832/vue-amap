<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <span class="labelTitle">选择省份</span>
      <el-select v-model="adCode" placeholder="选择省份" @change="changeAdcode">
        <el-option v-for="province in provinceList" :label="province.name" :value="province.adcode"></el-option>
      </el-select>

      <span class="labelTitle">选择层级</span>
      <el-select v-model="depth" placeholder="请选择" @change="changeDepth">
        <el-option label="0 - 显示省级" value="0"></el-option>
        <el-option label="1 - 显示市级" value="1"></el-option>
        <el-option label="2 - 显示区/县级" value="2"></el-option>
      </el-select>
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
        disCountry: null,
        soc: 'RUS',
        adcode: '',
        provinceList: [],
        zoom: null,
        adCode: 130000,
        depth: 2,
        disProvince: null,
        colors: {}

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
        let adcodes = [
          {
            "adcode": 100000,
            "name": "全国"
          }, {
            "adcode": 110000,
            "name": "北京市"
          },
          {
            "adcode": 120000,
            "name": "天津市"
          },
          {
            "adcode": 130000,
            "name": "河北省"
          }, {
            "adcode": 140000,
            "name": "山西省"
          },
          {
            "adcode": 150000,
            "name": "内蒙古自治区"
          },
          {
            "adcode": 210000,
            "name": "辽宁省"
          }, {
            "adcode": 220000,
            "name": "吉林省"
          },
          {
            "adcode": 230000,
            "name": "黑龙江省"
          },
          {
            "adcode": 310000,
            "name": "上海市"
          },
          {
            "adcode": 320000,
            "name": "江苏省"
          },
          {
            "adcode": 330000,
            "name": "浙江省"
          },
          {
            "adcode": 340000,
            "name": "安徽省"
          },
          {
            "adcode": 350000,
            "name": "福建省"
          },
          {
            "adcode": 360000,
            "name": "江西省"
          },
          {
            "adcode": 370000,
            "name": "山东省"
          },
          {
            "adcode": 410000,
            "name": "河南省"
          },
          {
            "adcode": 420000,
            "name": "湖北省"
          },
          {
            "adcode": 430000,
            "name": "湖南省"
          },
          {
            "adcode": 440000,
            "name": "广东省"
          },
          {
            "adcode": 450000,
            "name": "广西壮族自治区"
          },
          {
            "adcode": 460000,
            "name": "海南省"
          },
          {
            "adcode": 500000,
            "name": "重庆市"
          },
          {
            "adcode": 510000,
            "name": "四川省"
          },
          {
            "adcode": 520000,
            "name": "贵州省"
          },
          {
            "adcode": 530000,
            "name": "云南省"
          },
          {
            "adcode": 540000,
            "name": "西藏自治区"
          },
          {
            "adcode": 610000,
            "name": "陕西省"
          },
          {
            "adcode": 620000,
            "name": "甘肃省"
          }, {
            "adcode": 630000,
            "name": "青海省"
          },
          {
            "adcode": 640000,
            "name": "宁夏回族自治区"
          },
          {
            "adcode": 650000,
            "name": "新疆维吾尔自治区"
          },
          {
            "adcode": 710000,
            "name": "台湾省"
          },
          {
            "adcode": 810000,
            "name": "香港特别行政区"
          },
          {
            "adcode": 820000,
            "name": "澳门特别行政区"
          }
        ];
        let that = this;
        //创建地图
        this.map = new AMap.Map("container", {
          zoom: 4.5,
          center: [116.412427, 39.303573],
          pitch: 0,
          viewMode: '3D',
        });

        that.initPro(that.adCode, that.depth);
        let optArr = adcodes.map(function (item) {
          that.provinceList.push(item)
        });
      },

      // 创建省份图层
      initPro(code, dep) {
        let that = this
        that.disProvince && that.disProvince.setMap(null);
        that.disProvince = new AMap.DistrictLayer.Province({
          zIndex: 12,
          adcode: [that.adCode],
          depth: that.depth,
          styles: {
            'fill': function (properties) {
              // properties为可用于做样式映射的字段，包含
              // NAME_CHN:中文名称
              // adcode_pro
              // adcode_cit
              // adcode
              let adcode = properties.adcode;
              return that.getColorByAdcode(adcode);
            },
            'province-stroke': 'cornflowerblue',
            'city-stroke': 'white', // 中国地级市边界
            'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
          }
        });

        that.disProvince.setMap(that.map);
      },

      // 选择省份
      changeAdcode() {
        this.initPro(this.adCode, this.depth);
      },

      //选择层级
      changeDepth() {
        this.initPro(this.adCode, this.depth);
      },

      // 颜色辅助方法
      getColorByAdcode(adcode) {
        if (!this.colors[adcode]) {
          let gb = Math.random() * 155 + 50;
          this.colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
        }
        return this.colors[adcode];
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative
  }

  #container {
    width: 100%;
    height: 100%;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }

  .input-item .labelTitle {
    display: block;
    padding: 10px 0;
  }
</style>
